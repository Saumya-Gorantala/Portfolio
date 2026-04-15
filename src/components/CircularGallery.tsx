import { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Plane, Mesh, Program, Texture } from "ogl";
import "./CircularGallery.css";

export interface GalleryItem {
  image: string;
  text: string;
}

interface CircularGalleryProps {
  items: GalleryItem[];
  /** Cylinder curvature — higher = more curved. 0.8–1.5 works well for 5 items. */
  bend?: number;
  textColor?: string;
  font?: string;
  onItemClick?: (index: number) => void;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Vertex shader — bends all planes onto a shared cylinder
const VERT = /* glsl */ `
  attribute vec3 position;
  attribute vec2 uv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uBend;
  uniform float uOffset;
  varying vec2 vUv;
  varying float vBrightness;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Shift this vertex to its world-space X position
    pos.x += uOffset;

    // Wrap around a cylinder of radius 1/bend
    float theta = pos.x * uBend;
    float invBend = 1.0 / max(abs(uBend), 0.0001);
    pos.x = sin(theta) * invBend;
    pos.z = (cos(theta) - 1.0) * invBend;

    // Brightness: full at centre (theta=0), fades toward edges
    vBrightness = max(0.25, (cos(theta) + 1.0) * 0.5);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D tMap;
  varying vec2 vUv;
  varying float vBrightness;

  void main() {
    vec4 tex = texture2D(tMap, vUv);
    gl_FragColor = vec4(tex.rgb * vBrightness, tex.a);
  }
`;

export default function CircularGallery({
  items,
  bend = 1.0,
  textColor = "#ffffff",
  font = "bold 28px DM Sans",
  onItemClick,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Keep callback ref stable so useEffect doesn't re-run when it changes
  const onClickRef = useRef(onItemClick);
  onClickRef.current = onItemClick;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) return;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new Renderer({
      width: container.offsetWidth,
      height: container.offsetHeight,
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    // ── Camera ────────────────────────────────────────────────────────────
    const camera = new Camera(gl, { fov: 35, near: 0.01, far: 100 });
    camera.position.set(0, 0, 5);

    // ── Scene ─────────────────────────────────────────────────────────────
    const scene = new Transform();

    // ── Layout constants ──────────────────────────────────────────────────
    const PLANE_W = 1.5;
    const PLANE_H = 2.0;
    const SPACING = PLANE_W + 0.25; // gap between planes

    // World-space X position for each item when scrollX = 0
    const centerOffset = ((items.length - 1) / 2) * SPACING;
    const basePositions = items.map((_, i) => i * SPACING - centerOffset);
    const halfRange = centerOffset; // max scrollX in either direction

    // Shared geometry (same plane for all items, shader handles positioning)
    const geo = new Plane(gl, {
      width: PLANE_W,
      height: PLANE_H,
      widthSegments: 20,
      heightSegments: 1,
    });

    // ── Per-item programs + canvas textures ───────────────────────────────
    type Entry = { program: Program; index: number };
    const entries: Entry[] = [];
    let disposed = false;

    function buildCanvasTexture(
      item: GalleryItem,
      cb: (canvas: HTMLCanvasElement) => void
    ) {
      const canvas = document.createElement("canvas");
      // 3:4 ratio matches the plane (1.5 : 2.0)
      canvas.width = 512;
      canvas.height = 682;
      const ctx = canvas.getContext("2d")!;

      function finish(img?: HTMLImageElement) {
        if (img) {
          ctx.drawImage(img, 0, 0, 512, 540);
        } else {
          // Fallback gradient
          const g = ctx.createLinearGradient(0, 0, 512, 540);
          g.addColorStop(0, "#ac212a");
          g.addColorStop(1, "#1a1a1a");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, 512, 540);
        }

        // Semi-transparent text bar
        ctx.fillStyle = "rgba(0,0,0,0.58)";
        ctx.fillRect(0, 540, 512, 142);

        // Title text
        ctx.fillStyle = textColor;
        ctx.font = font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.text, 256, 611);

        cb(canvas);
      }

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => finish(img);
      img.onerror = () => finish();
      img.src = item.image;
    }

    items.forEach((item, i) => {
      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          tMap: { value: new Texture(gl) },
          uBend: { value: bend },
          uOffset: { value: basePositions[i] },
        },
        transparent: true,
        depthTest: false,
      });

      const mesh = new Mesh(gl, { geometry: geo, program });
      mesh.setParent(scene);
      entries.push({ program, index: i });

      buildCanvasTexture(item, (canvas) => {
        if (disposed) return;
        const tex = new Texture(gl, { image: canvas, generateMipmaps: false });
        program.uniforms.tMap.value = tex;
      });
    });

    // ── Interaction state ─────────────────────────────────────────────────
    let scrollX = 0;
    let targetX = 0;
    let dragging = false;
    let dragX0 = 0;
    let dragTarget0 = 0;
    let dragDelta = 0;

    const clamp = (v: number) => Math.max(-halfRange, Math.min(halfRange, v));
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetX = clamp(targetX + (e.deltaX + e.deltaY) * 0.003);
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragX0 = e.clientX;
      dragTarget0 = targetX;
      dragDelta = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      dragDelta = e.clientX - dragX0;
      targetX = clamp(dragTarget0 - dragDelta * 0.005);
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      canvas.style.cursor = "grab";

      // Treat as a click only if the pointer barely moved
      if (Math.abs(dragDelta) < 6) {
        // Find which item is currently closest to the camera centre (uOffset ≈ 0)
        const nearestIdx = Math.round(scrollX / SPACING + (items.length - 1) / 2);
        const clamped = Math.max(0, Math.min(items.length - 1, nearestIdx));
        onClickRef.current?.(clamped);
      }
    };

    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      camera.perspective({ aspect: w / h });
    };
    window.addEventListener("resize", onResize);
    onResize();

    // ── Animation loop ────────────────────────────────────────────────────
    let rafId = 0;

    const tick = () => {
      if (disposed) return;
      rafId = requestAnimationFrame(tick);

      scrollX = lerp(scrollX, targetX, 0.08);

      // Push each plane's current world-space X into the shader
      entries.forEach(({ program, index }) => {
        program.uniforms.uOffset.value = basePositions[index] - scrollX;
      });

      renderer.render({ scene, camera });
    };
    tick();

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("resize", onResize);
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, [items, bend, textColor, font]); // onItemClick intentionally excluded — handled via ref

  return (
    <div className="circular-gallery-wrapper">
      <div ref={containerRef} className="circular-gallery" />
      <p className="circular-gallery-hint">drag to explore &nbsp;·&nbsp; click to open</p>
    </div>
  );
}
