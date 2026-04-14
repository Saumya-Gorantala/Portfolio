import { useEffect, useRef, useState } from 'react';

interface PixelImageProps {
  src: string;
  alt?: string;
  className?: string;
  /** Grid dimensions for the pixel reveal */
  customGrid?: { rows: number; cols: number };
  /** Play a grayscale → colour animation on hover */
  grayscaleAnimation?: boolean;
}

/**
 * PixelImage – renders an image with a pixelated tile-reveal entrance,
 * and an optional grayscale ↔ colour toggle on hover.
 */
export function PixelImage({
  src,
  alt = 'image',
  className = '',
  customGrid = { rows: 8, cols: 8 },
  grayscaleAnimation = false,
}: PixelImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [revealed, setRevealed] = useState<boolean[]>([]);
  const [loaded, setLoaded] = useState(false);
  const rafRef = useRef<number | null>(null);

  const { rows, cols } = customGrid;
  const total = rows * cols;

  // Load image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      imgRef.current = img;
      setLoaded(true);
    };
  }, [src]);

  // Pixel-reveal entrance animation
  useEffect(() => {
    if (!loaded) return;

    // Randomise reveal order
    const order = Array.from({ length: total }, (_, i) => i)
      .sort(() => Math.random() - 0.5);

    let step = 0;
    // Reveal ~8 tiles per frame for a quick but visible effect
    const BATCH = Math.max(1, Math.floor(total / 20));

    const animate = () => {
      if (step >= total) return;
      setRevealed(prev => {
        const next = [...prev];
        for (let b = 0; b < BATCH && step < total; b++, step++) {
          next[order[step]] = true;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    // Small delay so the card has rendered
    const t = setTimeout(() => { rafRef.current = requestAnimationFrame(animate); }, 300);
    return () => {
      clearTimeout(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, total]);

  // Draw on canvas whenever revealed mask or hover changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || revealed.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const tileW = W / cols;
    const tileH = H / rows;

    ctx.clearRect(0, 0, W, H);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        if (!revealed[idx]) continue;

        const dx = c * tileW;
        const dy = r * tileH;

        // Source rect in the image (cover-fit)
        const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
        const scaledW = img.naturalWidth * scale;
        const scaledH = img.naturalHeight * scale;
        const offsetX = (scaledW - W) / 2;
        const offsetY = (scaledH - H) / 2;

        const sx = (dx + offsetX) / scale;
        const sy = (dy + offsetY) / scale;
        const sw = tileW / scale;
        const sh = tileH / scale;

        ctx.drawImage(img, sx, sy, sw, sh, dx, dy, tileW, tileH);

        // Grayscale filter on non-hover tiles
        if (grayscaleAnimation && !isHovered) {
          const imageData = ctx.getImageData(dx, dy, tileW, tileH);
          const d = imageData.data;
          for (let i = 0; i < d.length; i += 4) {
            const avg = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
            d[i] = d[i + 1] = d[i + 2] = avg;
          }
          ctx.putImageData(imageData, dx, dy);
        }
      }
    }
  }, [revealed, isHovered, rows, cols, grayscaleAnimation]);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={480}
      aria-label={alt}
      role="img"
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'filter 0.4s ease',
        cursor: 'default',
      }}
    />
  );
}
