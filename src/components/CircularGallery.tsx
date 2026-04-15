import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef, useCallback } from 'react';
import './CircularGallery.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GalleryItem {
  image: string;
  text: string;
  shortDescription?: string;
  tags?: string[];
}

type GL = InstanceType<typeof Renderer>['gl'];

interface ScrollState {
  ease: number;
  current: number;
  target: number;
  last: number;
  position: number;
}

interface Screen {
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function debounce<T extends (...args: unknown[]) => void>(fn: T, wait: number): T {
  let t: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  } as T;
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

/** Draw a rounded rectangle path on a 2-D canvas context. */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/** Wrap text onto multiple lines, returns the y position after the last line. */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number, y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const words = text.split(' ');
  let line = '';
  let curY = y;
  for (const word of words) {
    const test = line + word + ' ';
    if (ctx.measureText(test).width > maxWidth && line !== '') {
      ctx.fillText(line.trimEnd(), x, curY);
      line = word + ' ';
      curY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line.trimEnd()) ctx.fillText(line.trimEnd(), x, curY);
  return curY;
}

// ─── Canvas card renderer ─────────────────────────────────────────────────────

const CW = 700;   // canvas width  (px)
const CH = 900;   // canvas height (px)
const IMG_H = 390; // image area height
const CORNER = 20; // border radius
const PAD = 36;    // horizontal padding

/**
 * Render a full project card onto a <canvas> that exactly mirrors the
 * original ProjectCard layout: image → title → short-desc → tag pills → footer.
 */
function buildCardCanvas(
  item: GalleryItem,
  img?: HTMLImageElement,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width  = CW;
  canvas.height = CH;
  const ctx = canvas.getContext('2d')!;

  // ── 1. Clip to rounded card shape ─────────────────────────────────────────
  roundRect(ctx, 0, 0, CW, CH, CORNER);
  ctx.save();
  ctx.clip();

  // ── 2. Card background (dark glass) ───────────────────────────────────────
  ctx.fillStyle = 'rgba(14, 10, 20, 0.91)';
  ctx.fillRect(0, 0, CW, CH);

  // ── 3. Image (cover-fit) ──────────────────────────────────────────────────
  if (img && img.naturalWidth) {
    const scale = Math.max(CW / img.naturalWidth, IMG_H / img.naturalHeight);
    const sw = CW / scale;
    const sh = IMG_H / scale;
    const sx = (img.naturalWidth  - sw) / 2;
    const sy = (img.naturalHeight - sh) / 2;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, CW, IMG_H);
  } else {
    // Fallback gradient while image loads
    const g = ctx.createLinearGradient(0, 0, CW, IMG_H);
    g.addColorStop(0, '#6b1219');
    g.addColorStop(1, '#1a0a10');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, CW, IMG_H);
    // Placeholder initial letter
    ctx.font = 'bold 120px system-ui';
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(item.text.charAt(0), CW / 2, IMG_H / 2);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  }

  // Image → card fade
  const fade = ctx.createLinearGradient(0, IMG_H - 90, 0, IMG_H);
  fade.addColorStop(0, 'rgba(14,10,20,0)');
  fade.addColorStop(1, 'rgba(14,10,20,0.91)');
  ctx.fillStyle = fade;
  ctx.fillRect(0, IMG_H - 90, CW, 90);

  // ── 4. Title ──────────────────────────────────────────────────────────────
  const titleY = IMG_H + 58;
  ctx.font = 'bold 44px "DM Sans", system-ui, sans-serif';
  ctx.fillStyle = '#f0ecf5';
  ctx.fillText(item.text, PAD, titleY, CW - PAD * 2);

  // ── 5. Short description ──────────────────────────────────────────────────
  const descY = titleY + 60;
  ctx.font = '600 26px "DM Sans", system-ui, sans-serif';
  ctx.fillStyle = '#ff8fa3';   // pastel-pink (matches dark-mode accent)
  const descEndY = wrapText(ctx, item.shortDescription ?? '', PAD, descY, CW - PAD * 2, 36);

  // ── 6. Tag pills ──────────────────────────────────────────────────────────
  const tags = item.tags ?? [];
  const tagFont = '20px "DM Sans", system-ui, sans-serif';
  ctx.font = tagFont;
  const pillH   = 40;
  const pillR   = pillH / 2;
  const pillGap = 10;
  const lineGap = 12;

  let tagX = PAD;
  let tagY = descEndY + 36;

  for (const tag of tags) {
    const tw = ctx.measureText(tag).width + 32;
    if (tagX + tw > CW - PAD && tagX > PAD) {
      tagX = PAD;
      tagY += pillH + lineGap;
    }
    // Pill bg
    roundRect(ctx, tagX, tagY, tw, pillH, pillR);
    ctx.fillStyle = 'rgba(172,33,42,0.28)';
    ctx.fill();
    // Pill border
    roundRect(ctx, tagX, tagY, tw, pillH, pillR);
    ctx.strokeStyle = 'rgba(172,33,42,0.55)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    // Pill text
    ctx.font = tagFont;
    ctx.fillStyle = '#dbc8e8';
    ctx.textBaseline = 'middle';
    ctx.fillText(tag, tagX + 16, tagY + pillH / 2);
    ctx.textBaseline = 'alphabetic';
    tagX += tw + pillGap;
  }

  // ── 7. Footer divider ─────────────────────────────────────────────────────
  const footerY = CH - 58;
  ctx.strokeStyle = 'rgba(255,255,255,0.07)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PAD, footerY);
  ctx.lineTo(CW - PAD, footerY);
  ctx.stroke();

  // Tech count
  ctx.font = '17px "DM Sans", system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.38)';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${tags.length} technologies`, PAD, footerY + 24);

  // External link arrow (top-right corner of footer)
  const ax = CW - PAD - 4;
  const ay = footerY + 16;
  ctx.strokeStyle = 'rgba(255,143,163,0.65)';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  // Arrow body
  ctx.beginPath();
  ctx.moveTo(ax - 14, ay + 14);
  ctx.lineTo(ax, ay);
  ctx.stroke();
  // Arrow head
  ctx.beginPath();
  ctx.moveTo(ax - 12, ay);
  ctx.lineTo(ax, ay);
  ctx.lineTo(ax, ay + 12);
  ctx.stroke();

  ctx.textBaseline = 'alphabetic';
  ctx.restore();

  // ── 8. Card border ────────────────────────────────────────────────────────
  roundRect(ctx, 0.75, 0.75, CW - 1.5, CH - 1.5, CORNER);
  ctx.strokeStyle = 'rgba(255,255,255,0.09)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  return canvas;
}

// ─── Media ────────────────────────────────────────────────────────────────────

interface MediaOpts {
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: Screen;
  text: string;
  viewport: Viewport;
  bend: number;
  shortDescription?: string;
  tags?: string[];
}

class Media {
  extra = 0;
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: Screen;
  text: string;
  viewport: Viewport;
  bend: number;
  shortDescription: string;
  tags: string[];
  program!: Program;
  plane!: Mesh;
  padding = 2;
  width = 0;
  widthTotal = 0;
  x = 0;
  speed = 0;
  isBefore = false;
  isAfter  = false;
  cardTexture!: Texture;

  constructor({
    geometry, gl, image, index, length, renderer, scene,
    screen, text, viewport, bend, shortDescription = '', tags = [],
  }: MediaOpts) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.shortDescription = shortDescription;
    this.tags = tags;
    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    // Draw initial canvas (no image yet)
    const canvas = buildCardCanvas({ image: this.image, text: this.text, shortDescription: this.shortDescription, tags: this.tags });
    this.cardTexture = new Texture(this.gl, { image: canvas, generateMipmaps: false });

    this.program = new Program(this.gl, {
      depthTest:  false,
      depthWrite: false,
      vertex: /* glsl */ `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5)
                * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: /* glsl */ `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 col = texture2D(tMap, vUv);
          if (col.a < 0.01) discard;
          gl_FragColor = col;
        }
      `,
      uniforms: {
        tMap:   { value: this.cardTexture },
        uSpeed: { value: 0 },
        uTime:  { value: 100 * Math.random() },
      },
      transparent: true,
    });

    // Load image and redraw canvas with actual image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      const updated = buildCardCanvas(
        { image: this.image, text: this.text, shortDescription: this.shortDescription, tags: this.tags },
        img,
      );
      this.cardTexture.image = updated;
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  update(scroll: ScrollState, direction: 'right' | 'left') {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B = Math.abs(this.bend);
      const R = (H * H + B * B) / (2 * B);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(Math.max(0, R * R - effectiveX * effectiveX));
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(Math.min(effectiveX / R, 1));
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(Math.min(effectiveX / R, 1));
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value  += 0.04;
    this.program.uniforms.uSpeed.value  = this.speed;

    const planeOffset    = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width  / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter  = this.plane.position.x - planeOffset >  viewportOffset;

    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: { screen?: Screen; viewport?: Viewport } = {}) {
    if (screen)   this.screen   = screen;
    if (viewport) this.viewport = viewport;

    // Cards: 84 % of viewport height, width = canvas aspect ratio (CW / CH)
    this.plane.scale.y = this.viewport.height * 0.84;
    this.plane.scale.x = this.plane.scale.y * (CW / CH);

    this.padding    = this.plane.scale.x * 0.14; // gap between cards
    this.width      = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x          = this.width * this.index;
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────

interface AppOptions {
  items?: GalleryItem[];
  bend?: number;
  scrollSpeed?: number;
  scrollEase?: number;
  onItemClick?: (index: number) => void;
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
  scroll: ScrollState;
  onCheckDebounce: () => void;
  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: Transform;
  screen!: Screen;
  viewport!: Viewport;
  planeGeometry!: Plane;
  medias: Media[] = [];
  originalLength = 0;
  raf = 0;
  onItemClick?: (index: number) => void;

  isDown      = false;
  start       = 0;
  clickStartX = 0;
  clickEndX   = 0;

  boundOnResize!:    () => void;
  boundOnWheel!:     (e: WheelEvent) => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!:   (e: MouseEvent | TouchEvent) => void;

  constructor(container: HTMLElement, options: AppOptions = {}) {
    const {
      items,
      bend        = 3,
      scrollSpeed = 2,
      scrollEase  = 0.05,
      onItemClick,
    } = options;

    this.container   = container;
    this.scrollSpeed = scrollSpeed;
    this.onItemClick = onItemClick;
    this.scroll      = { ease: scrollEase, current: 0, target: 0, last: 0, position: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
  }

  createMedias(items: GalleryItem[] | undefined, bend: number) {
    const galleryItems: GalleryItem[] = items && items.length ? items : [
      { image: 'https://picsum.photos/seed/1/800/600', text: 'Sample' },
    ];

    this.originalLength = galleryItems.length;
    const doubled = [...galleryItems, ...galleryItems]; // infinite scroll

    this.medias = doubled.map((data, index) =>
      new Media({
        geometry:         this.planeGeometry,
        gl:               this.gl,
        image:            data.image,
        index,
        length:           doubled.length,
        renderer:         this.renderer,
        scene:            this.scene,
        screen:           this.screen,
        text:             data.text,
        viewport:         this.viewport,
        bend,
        shortDescription: data.shortDescription,
        tags:             data.tags,
      })
    );
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    this.start = this.clickStartX = this.clickEndX = x;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    this.clickEndX = x;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp(e: MouseEvent | TouchEvent) {
    this.isDown = false;
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
    const wasDrag = Math.abs(endX - this.clickStartX) >= 5;
    if (!wasDrag && this.onItemClick) {
      // Convert the click's screen X to viewport X, then pick the closest card
      const rect = this.container.getBoundingClientRect();
      const localX = this.clickStartX - rect.left;
      const viewportX = ((localX / this.screen.width) - 0.5) * this.viewport.width;
      const clicked = this.medias.reduce((a, b) =>
        Math.abs(a.plane.position.x - viewportX) < Math.abs(b.plane.position.x - viewportX) ? a : b
      );
      this.onItemClick(clicked.index % this.originalLength);
    } else if (wasDrag) {
      // Only snap after a drag, not after a click
      this.onCheck();
    }
  }

  onWheel(e: WheelEvent) {
    const delta = e.deltaY ?? (e as unknown as { wheelDelta: number }).wheelDelta;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias?.[0]) return;
    const { width } = this.medias[0];
    const idx  = Math.round(Math.abs(this.scroll.target) / width);
    const snap = width * idx;
    this.scroll.target = this.scroll.target < 0 ? -snap : snap;
  }

  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });

    const fov    = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width  = height * this.camera.aspect;
    this.viewport = { width, height };

    this.medias?.forEach(m => m.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction: 'right' | 'left' = this.scroll.current > this.scroll.last ? 'right' : 'left';
    this.medias?.forEach(m => m.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize    = this.onResize.bind(this);
    this.boundOnWheel     = this.onWheel.bind(this) as (e: WheelEvent) => void;
    this.boundOnTouchDown = this.onTouchDown.bind(this) as (e: MouseEvent | TouchEvent) => void;
    this.boundOnTouchMove = this.onTouchMove.bind(this) as (e: MouseEvent | TouchEvent) => void;
    this.boundOnTouchUp   = this.onTouchUp.bind(this)   as (e: MouseEvent | TouchEvent) => void;

    // "down" and "wheel" on the container only — prevents outside interactions triggering the gallery
    this.container.addEventListener('mousedown',  this.boundOnTouchDown as EventListener);
    this.container.addEventListener('touchstart', this.boundOnTouchDown as EventListener);
    this.container.addEventListener('wheel',      this.boundOnWheel     as EventListener);
    // "move" and "up" on window so dragging still works when the cursor leaves the gallery
    window.addEventListener('resize',     this.boundOnResize);
    window.addEventListener('mousemove',  this.boundOnTouchMove as EventListener);
    window.addEventListener('mouseup',    this.boundOnTouchUp   as EventListener);
    window.addEventListener('touchmove',  this.boundOnTouchMove as EventListener);
    window.addEventListener('touchend',   this.boundOnTouchUp   as EventListener);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    this.container.removeEventListener('mousedown',  this.boundOnTouchDown as EventListener);
    this.container.removeEventListener('touchstart', this.boundOnTouchDown as EventListener);
    this.container.removeEventListener('wheel',      this.boundOnWheel     as EventListener);
    window.removeEventListener('resize',     this.boundOnResize);
    window.removeEventListener('mousemove',  this.boundOnTouchMove as EventListener);
    window.removeEventListener('mouseup',    this.boundOnTouchUp   as EventListener);
    window.removeEventListener('touchmove',  this.boundOnTouchMove as EventListener);
    window.removeEventListener('touchend',   this.boundOnTouchUp   as EventListener);
    const canvas = this.renderer?.gl?.canvas;
    if (canvas?.parentNode) canvas.parentNode.removeChild(canvas);
  }
}

// ─── React component ──────────────────────────────────────────────────────────

interface CircularGalleryProps {
  items?: GalleryItem[];
  bend?: number;
  scrollSpeed?: number;
  scrollEase?: number;
  onItemClick?: (index: number) => void;
}

export default function CircularGallery({
  items,
  bend        = 3,
  scrollSpeed = 2,
  scrollEase  = 0.05,
  onItemClick,
}: CircularGalleryProps) {
  const containerRef   = useRef<HTMLDivElement>(null);
  // Keep a stable ref to the latest callback so the App is never recreated
  // just because the parent re-renders and produces a new function reference.
  const onItemClickRef = useRef(onItemClick);
  onItemClickRef.current = onItemClick;

  const stableOnItemClick = useCallback((index: number) => {
    onItemClickRef.current?.(index);
  }, []); // empty deps — this function reference never changes

  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, {
      items,
      bend,
      scrollSpeed,
      scrollEase,
      onItemClick: stableOnItemClick,
    });
    return () => app.destroy();
    // items/bend/scrollSpeed/scrollEase are the only things that should
    // cause a full rebuild. onItemClick is routed through stableOnItemClick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, bend, scrollSpeed, scrollEase]);

  return <div className="circular-gallery" ref={containerRef} />;
}
