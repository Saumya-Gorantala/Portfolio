import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';
import './CircularGallery.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GalleryItem {
  image: string;
  text: string;
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

function autoBind(instance: object) {
  const proto = Object.getPrototypeOf(instance) as object;
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key === 'constructor') return;
    const val = (instance as Record<string, unknown>)[key];
    if (typeof val === 'function') {
      (instance as Record<string, unknown>)[key] = (val as (...a: unknown[]) => unknown).bind(instance);
    }
  });
}

function createTextTexture(
  gl: GL,
  text: string,
  font = 'bold 30px monospace',
  color = 'black'
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.font = font;
  const metrics = ctx.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

// ─── Title ────────────────────────────────────────────────────────────────────

interface TitleOpts {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor?: string;
  font?: string;
}

class Title {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor: string;
  font: string;
  mesh!: Mesh;

  constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif' }: TitleOpts) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.15;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
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
  textColor: string;
  borderRadius?: number;
  font?: string;
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
  textColor: string;
  borderRadius: number;
  font: string;
  program!: Program;
  plane!: Mesh;
  title!: Title;
  scale = 1;
  padding = 2;
  width = 0;
  widthTotal = 0;
  x = 0;
  speed = 0;
  isBefore = false;
  isAfter = false;

  constructor({
    geometry, gl, image, index, length, renderer, scene,
    screen, text, viewport, bend, textColor, borderRadius = 0, font,
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
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font ?? 'bold 30px sans-serif';
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
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
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap:          { value: texture },
        uPlaneSizes:   { value: [0, 0] },
        uImageSizes:   { value: [0, 0] },
        uSpeed:        { value: 0 },
        uTime:         { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    });
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
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset   = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter  = this.plane.position.x - planeOffset > viewportOffset;

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

    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width  * (700 * this.scale)) / this.screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];

    this.padding    = 2;
    this.width      = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x          = this.width * this.index;
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────

interface AppOptions {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
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
  mediasImages: GalleryItem[] = [];
  raf = 0;
  onItemClick?: (index: number) => void;
  originalLength = 0;

  // drag / click tracking
  isDown = false;
  start = 0;
  clickStartX = 0;
  clickEndX = 0;

  // bound handlers (stored for removal)
  boundOnResize!:    () => void;
  boundOnWheel!:     (e: WheelEvent) => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!:   (e: MouseEvent | TouchEvent) => void;

  constructor(container: HTMLElement, options: AppOptions = {}) {
    const {
      items,
      bend         = 3,
      textColor    = '#ffffff',
      borderRadius = 0,
      font         = 'bold 30px sans-serif',
      scrollSpeed  = 2,
      scrollEase   = 0.05,
      onItemClick,
    } = options;

    this.container    = container;
    this.scrollSpeed  = scrollSpeed;
    this.onItemClick  = onItemClick;
    this.scroll       = { ease: scrollEase, current: 0, target: 0, last: 0, position: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
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

  createMedias(
    items: GalleryItem[] | undefined,
    bend: number,
    textColor: string,
    borderRadius: number,
    font: string,
  ) {
    const galleryItems = items && items.length ? items : [
      { image: 'https://picsum.photos/seed/1/800/600', text: 'Sample 1' },
      { image: 'https://picsum.photos/seed/2/800/600', text: 'Sample 2' },
    ];

    this.originalLength = galleryItems.length;
    // Duplicate for seamless infinite scroll
    this.mediasImages = [...galleryItems, ...galleryItems];

    this.medias = this.mediasImages.map((data, index) =>
      new Media({
        geometry:     this.planeGeometry,
        gl:           this.gl,
        image:        data.image,
        index,
        length:       this.mediasImages.length,
        renderer:     this.renderer,
        scene:        this.scene,
        screen:       this.screen,
        text:         data.text,
        viewport:     this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
      })
    );
  }

  // ── Input ──────────────────────────────────────────────────────────────────

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    this.start      = x;
    this.clickStartX = x;
    this.clickEndX   = x;
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

    // Treat as click if pointer barely moved
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
    if (Math.abs(endX - this.clickStartX) < 5 && this.onItemClick) {
      // Find the media plane closest to the horizontal centre
      const nearest = this.medias.reduce((a, b) =>
        Math.abs(a.plane.position.x) < Math.abs(b.plane.position.x) ? a : b
      );
      const originalIndex = nearest.index % this.originalLength;
      this.onItemClick(originalIndex);
    }

    this.onCheck();
  }

  onWheel(e: WheelEvent) {
    const delta = e.deltaY || (e as unknown as { wheelDelta: number }).wheelDelta || (e as unknown as { detail: number }).detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width     = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item      = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  // ── Resize ────────────────────────────────────────────────────────────────

  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });

    const fov    = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width  = height * this.camera.aspect;
    this.viewport = { width, height };

    if (this.medias) {
      this.medias.forEach(m => m.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  // ── Loop ──────────────────────────────────────────────────────────────────

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction: 'right' | 'left' = this.scroll.current > this.scroll.last ? 'right' : 'left';

    if (this.medias) {
      this.medias.forEach(m => m.update(this.scroll, direction));
    }

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  addEventListeners() {
    this.boundOnResize    = this.onResize.bind(this);
    this.boundOnWheel     = this.onWheel.bind(this) as (e: WheelEvent) => void;
    this.boundOnTouchDown = this.onTouchDown.bind(this) as (e: MouseEvent | TouchEvent) => void;
    this.boundOnTouchMove = this.onTouchMove.bind(this) as (e: MouseEvent | TouchEvent) => void;
    this.boundOnTouchUp   = this.onTouchUp.bind(this) as (e: MouseEvent | TouchEvent) => void;

    window.addEventListener('resize',     this.boundOnResize);
    window.addEventListener('wheel',      this.boundOnWheel as EventListener);
    window.addEventListener('mousedown',  this.boundOnTouchDown as EventListener);
    window.addEventListener('mousemove',  this.boundOnTouchMove as EventListener);
    window.addEventListener('mouseup',    this.boundOnTouchUp as EventListener);
    window.addEventListener('touchstart', this.boundOnTouchDown as EventListener);
    window.addEventListener('touchmove',  this.boundOnTouchMove as EventListener);
    window.addEventListener('touchend',   this.boundOnTouchUp as EventListener);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize',     this.boundOnResize);
    window.removeEventListener('wheel',      this.boundOnWheel as EventListener);
    window.removeEventListener('mousedown',  this.boundOnTouchDown as EventListener);
    window.removeEventListener('mousemove',  this.boundOnTouchMove as EventListener);
    window.removeEventListener('mouseup',    this.boundOnTouchUp as EventListener);
    window.removeEventListener('touchstart', this.boundOnTouchDown as EventListener);
    window.removeEventListener('touchmove',  this.boundOnTouchMove as EventListener);
    window.removeEventListener('touchend',   this.boundOnTouchUp as EventListener);
    const canvas = this.renderer?.gl?.canvas;
    if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
  }
}

// ─── React component ──────────────────────────────────────────────────────────

interface CircularGalleryProps {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  onItemClick?: (index: number) => void;
}

export default function CircularGallery({
  items,
  bend         = 3,
  textColor    = '#ffffff',
  borderRadius = 0.05,
  font         = 'bold 30px sans-serif',
  scrollSpeed  = 2,
  scrollEase   = 0.05,
  onItemClick,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, {
      items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase, onItemClick,
    });
    return () => app.destroy();
    // onItemClick intentionally omitted — handled via closure in App constructor
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

  return <div className="circular-gallery" ref={containerRef} />;
}
