import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Figma } from 'lucide-react';

/** Hover-preview button that portals the thumbnail above everything */
function HoverPreviewButton({
  href,
  icon,
  label,
  previewWidth = 260,
  previewHeight = 146,
  getIcon,
  className = '',
}: {
  href: string;
  icon?: string;
  label: string;
  previewWidth?: number;
  previewHeight?: number;
  getIcon: (t?: string) => React.ReactNode;
  className?: string;
}) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPos({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
    setShow(true);
  }, []);

  const handleMouseLeave = useCallback(() => setShow(false), []);

  const previewUrl = `https://api.microlink.io/?url=${encodeURIComponent(href)}&screenshot=true&meta=false&embed=screenshot.url&colorScheme=light&viewport.isMobile=true&viewport.width=${previewWidth * 2}&viewport.height=${previewHeight * 2}`;

  const preview = show
    ? createPortal(
        <div
          style={{
            position: 'fixed',
            left: pos.x - previewWidth / 2,
            top: pos.y - previewHeight - 12,
            width: previewWidth,
            height: previewHeight,
            zIndex: 99999,
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            pointerEvents: 'none',
          }}
        >
          <img
            src={previewUrl}
            alt="Preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <motion.a
        ref={btnRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={className}
      >
        {getIcon(icon)}
        <span>{label}</span>
        <ExternalLink size={14} className="opacity-70" />
      </motion.a>
      {preview}
    </>
  );
}

interface ProjectLink {
  label: string;
  url: string;
  icon?: 'external' | 'github' | 'figma';
}

interface ProjectFlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  originRect?: DOMRect | null;
  project: {
    title: string;
    shortDescription: string;
    fullDescription: string;
    detailedDescription: string;
    tags: string[];
    image: string;
    link?: string;
    links: ProjectLink[];
  };
}

const ProjectFlipModal: React.FC<ProjectFlipModalProps> = ({
  isOpen,
  onClose,
  originRect,
  project,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Reset and auto-flip after expansion settles
  useEffect(() => {
    if (!isOpen) {
      setIsFlipped(false);
      setIsClosing(false);
      return;
    }
    const t = setTimeout(() => setIsFlipped(true), 820);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = () => {
    if (isFlipped) {
      setIsClosing(true);
      setIsFlipped(false);
      setTimeout(() => { setIsClosing(false); onClose(); }, 700);
    } else {
      onClose();
    }
  };

  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'github': return <Github size={16} />;
      case 'figma':  return <Figma  size={16} />;
      default:       return <ExternalLink size={16} />;
    }
  };

  // ── Modal target size & position (centered, not full-screen) ──────────────
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isMobileLayout = vw < 640;
  const targetW = Math.min(vw * 0.92, 920);
  const targetH = isMobileLayout ? Math.min(vh * 0.88, 600) : Math.min(vh * 0.84, 700);
  const targetLeft = (vw - targetW) / 2;
  const targetTop  = (vh - targetH) / 2;

  // ── FLIP: transforms so modal appears to start at the card's position ──────
  // The fixed element sits at its final centre (vw/2, vh/2).
  // We offset it so its centre aligns with the clicked card's centre, then
  // scale it down to the card's apparent size. Animating back to 0/0/1
  // makes it expand to the screen centre.
  const cardCx = originRect ? originRect.left + originRect.width  / 2 : vw / 2;
  const cardCy = originRect ? originRect.top  + originRect.height / 2 : vh / 2;
  const initX  = cardCx - vw / 2;
  const initY  = cardCy - vh / 2;
  const initScale = originRect
    ? Math.min(originRect.width / targetW, originRect.height / targetH)
    : 0.3;

  const primaryLink = project.links?.[0] ?? {
    label: 'View Project',
    url: project.link ?? '#',
    icon: 'external' as const,
  };

  // Image helper (shared by both faces)
  const ProjectImage = ({ className = '' }: { className?: string }) =>
    project.image && project.image !== '/assets/default-project.jpg' ? (
      <img
        src={project.image}
        alt={project.title}
        className={`w-full h-full object-cover object-center ${className}`}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pastel-pink to-pastel-red dark:from-pastel-burgundy dark:to-pastel-burgundy/70">
        <span className="text-9xl font-bold text-white opacity-10">
          {project.title.charAt(0)}
        </span>
      </div>
    );

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            style={{ position: 'fixed', inset: 0, zIndex: 9998,
              background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
          />

          {/* ── Expanding card (FLIP transform) ── */}
          <motion.div
            key="modal"
            initial={{ x: initX, y: initY, scale: initScale, opacity: originRect ? 0.9 : 0 }}
            animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            exit={{    x: initX, y: initY, scale: initScale, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 1 }}
            style={{
              position: 'fixed',
              top:    targetTop,
              left:   targetLeft,
              width:  targetW,
              height: targetH,
              zIndex: 9999,
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            {/* perspective wrapper */}
            <div style={{ width: '100%', height: '100%', perspective: '1400px' }}>

              {/* 3D flip container */}
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transformStyle: 'preserve-3d',
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                }}
              >

                {/* ══ FRONT FACE ══════════════════════════════════════════ */}
                <div
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                    position: 'absolute', inset: 0 }}
                  className="glass-card rounded-2xl overflow-hidden"
                >
                  <div className="flex flex-col h-full">
                    {/* Image fills top */}
                    <div className="relative overflow-hidden" style={{ flex: '1 1 0' }}>
                      <ProjectImage />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {/* Spinner pill */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full"
                          />
                          <span className="text-white text-xs font-medium tracking-wide">
                            Loading details…
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Info strip */}
                    <div className="p-5 bg-white/5 dark:bg-black/20 border-t border-white/10 flex-shrink-0">
                      <h2 className="text-xl font-bold dark:text-pastel-light-gray text-foreground mb-1">
                        {project.title}
                      </h2>
                      <p className="text-pastel-burgundy dark:text-pastel-pink text-sm font-medium mb-3">
                        {project.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 5).map((tag, i) => (
                          <span key={i}
                            className="px-2.5 py-0.5 bg-pastel-pink/20 dark:bg-pastel-burgundy/30 text-foreground/70 dark:text-pastel-light-gray text-xs rounded-full border border-pastel-pink/30 dark:border-pastel-burgundy/40">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 5 && (
                          <span className="px-2.5 py-0.5 bg-white/10 text-foreground/50 dark:text-pastel-light-gray/50 text-xs rounded-full">
                            +{project.tags.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ══ BACK FACE ═══════════════════════════════════════════ */}
                <div
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }}
                  className="glass-card rounded-2xl overflow-hidden"
                >
                  {isMobileLayout ? (
                    /* ── Mobile: vertical scrollable layout ── */
                    <div className="flex flex-col h-full">
                      {/* Image strip with title overlay */}
                      <div className="relative overflow-hidden flex-shrink-0" style={{ height: '40%' }}>
                        <ProjectImage />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-10">
                          <h2 className="text-base font-bold text-white leading-tight">{project.title}</h2>
                          <p className="text-pastel-pink text-xs font-medium mt-0.5">{project.shortDescription}</p>
                        </div>
                        <motion.button
                          onClick={handleClose}
                          disabled={isClosing}
                          whileTap={{ scale: 0.9 }}
                          className="absolute top-3 right-3 w-7 h-7 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center disabled:opacity-50 transition-colors"
                        >
                          <X size={13} />
                        </motion.button>
                      </div>

                      {/* Scrollable content */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 dark:text-pastel-light-gray/40 mb-1.5">
                            Overview
                          </p>
                          <p className="text-foreground/80 dark:text-pastel-light-gray/80 leading-relaxed text-xs">
                            {project.detailedDescription}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 dark:text-pastel-light-gray/40 mb-1.5">
                            Technologies
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.tags.map((tag, i) => (
                              <span key={i}
                                className="px-2 py-0.5 bg-pastel-pink/20 dark:bg-pastel-burgundy/30 text-foreground/70 dark:text-pastel-light-gray text-[10px] rounded-full border border-pastel-pink/30 dark:border-pastel-burgundy/40">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* View project button */}
                      <div className="flex-shrink-0 p-3 border-t border-white/10">
                        <HoverPreviewButton
                          href={primaryLink.url}
                          icon={primaryLink.icon}
                          label="View Project"
                          previewWidth={220}
                          previewHeight={124}
                          getIcon={getIcon}
                          className="w-full px-4 py-2.5 bg-gradient-to-r from-pastel-pink to-pastel-red dark:from-pastel-burgundy dark:to-pastel-burgundy/80 hover:opacity-90 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-opacity text-sm"
                        />
                      </div>
                    </div>
                  ) : (
                    /* ── Desktop: side-by-side layout ── */
                    <div className="flex h-full">

                      {/* Left: image (fixed aspect ratio) + tags */}
                      <div className="flex flex-col border-r border-white/10 flex-shrink-0"
                        style={{ width: '38%' }}>
                        <div className="relative overflow-hidden flex-shrink-0"
                          style={{ aspectRatio: '4/3', width: '100%' }}>
                          <ProjectImage />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>

                        {/* Tags */}
                        <div className="p-4 overflow-y-auto flex-1 bg-white/3 dark:bg-black/10">
                          <p className="text-xs font-bold uppercase tracking-widest
                            text-foreground/40 dark:text-pastel-light-gray/40 mb-2.5">
                            Technologies
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag, i) => (
                              <span key={i}
                                className="px-2 py-0.5 bg-pastel-pink/20 dark:bg-pastel-burgundy/30 text-foreground/70 dark:text-pastel-light-gray text-xs rounded-full border border-pastel-pink/30 dark:border-pastel-burgundy/40">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: details + buttons */}
                      <div className="flex flex-col p-7 overflow-y-auto flex-1">
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold mb-1 dark:text-pastel-light-gray text-foreground">
                            {project.title}
                          </h2>
                          <p className="text-pastel-burgundy dark:text-pastel-pink font-semibold mb-5">
                            {project.shortDescription}
                          </p>
                          <h3 className="text-xs font-bold uppercase tracking-widest
                            text-foreground/40 dark:text-pastel-light-gray/40 mb-2">
                            Project Overview
                          </h3>
                          <p className="text-foreground/80 dark:text-pastel-light-gray/80
                            leading-relaxed text-sm">
                            {project.detailedDescription}
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 space-y-3 flex-shrink-0">
                          <motion.button
                            onClick={handleClose}
                            disabled={isClosing}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white
                              rounded-xl font-semibold border border-white/20
                              flex items-center justify-center gap-2 disabled:opacity-50
                              transition-colors"
                          >
                            <X size={16} />
                            <span>Close</span>
                          </motion.button>

                          <HoverPreviewButton
                            href={primaryLink.url}
                            icon={primaryLink.icon}
                            label="View Project"
                            previewWidth={260}
                            previewHeight={146}
                            getIcon={getIcon}
                            className="w-full px-6 py-3 bg-gradient-to-r from-pastel-pink to-pastel-red dark:from-pastel-burgundy dark:to-pastel-burgundy/80 hover:opacity-90 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-opacity"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </motion.div>
            </div>
          </motion.div>

        </>
      )}
    </AnimatePresence>
  );

  // Render into document.body so position:fixed is relative to the viewport,
  // not the Tilt component's transform stacking context.
  return createPortal(modalContent, document.body);
};

export default ProjectFlipModal;
