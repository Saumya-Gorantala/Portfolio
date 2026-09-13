import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { scrollToSection } from '../lib/scrollToSection';

const HERO_ID = 'about';

const NAV_ITEMS = [
  { id: 'about-section', href: '#about-section', label: '01 / ABOUT' },
  { id: 'experience', href: '#experience', label: '02 / EXPERIENCE' },
  { id: 'projects', href: '#projects', label: '03 / PROJECTS' },
  { id: 'skills', href: '#skills', label: '04 / SKILLS' },
  { id: 'education', href: '#education', label: '05 / EDUCATION' },
  { id: 'contact', href: '#contact', label: '06 / CONTACT ME' },
];

const SECTION_ORDER = [HERO_ID, ...NAV_ITEMS.map((item) => item.id)];

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState(HERO_ID);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [highlightStyle, setHighlightStyle] = useState({ x: 0, width: 0 });
  const [navReady, setNavReady] = useState(false);
  const navItemsRef = useRef<Record<string, HTMLAnchorElement | null>>({});
  const navContainerRef = useRef<HTMLUListElement>(null);
  const visibleSectionsRef = useRef(new Set<string>([HERO_ID]));
  const isHeroActive = activeSection === HERO_ID;

  useEffect(() => {
    const syncActiveSection = () => {
      const visible = visibleSectionsRef.current;
      const current = [...SECTION_ORDER].reverse().find((id) => visible.has(id));
      setActiveSection(current ?? HERO_ID);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSectionsRef.current.add(entry.target.id);
          else visibleSectionsRef.current.delete(entry.target.id);
        });
        syncActiveSection();
      },
      { root: null, rootMargin: '-15% 0px -65% 0px', threshold: 0 },
    );

    SECTION_ORDER.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const calculateHighlightPosition = () => {
      const activeElement = navItemsRef.current[activeSection];
      const container = navContainerRef.current;
      if (!activeElement || !container) {
        setHighlightStyle({ x: 0, width: 0 });
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeElement.getBoundingClientRect();
      setHighlightStyle({
        x: elementRect.left - containerRect.left,
        width: elementRect.width,
      });
    };

    if (navReady) requestAnimationFrame(calculateHighlightPosition);
    window.addEventListener('resize', calculateHighlightPosition);
    return () => window.removeEventListener('resize', calculateHighlightPosition);
  }, [activeSection, navReady]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleSectionClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    closeMobileMenu();
    scrollToSection(id);
  };

  return (
    <>
      <motion.header
        id="site-nav"
        className="fixed left-1/2 top-6 z-50 w-[94%] max-w-6xl -translate-x-1/2 md:top-7"
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={() => setNavReady(true)}
      >
        <nav
          className={`relative flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 md:px-6 ${
            isScrolled
              ? 'border-white/[0.12] bg-[#0d0e13]/78 shadow-soft backdrop-blur-xl'
              : 'border-white/[0.08] bg-[#0d0e13]/35 backdrop-blur-md'
          }`}
        >
          <a
            href="#about"
            onClick={(event) => handleSectionClick(event, 'about')}
            className="z-20 ml-1 flex items-center group"
            aria-current={isHeroActive ? 'page' : undefined}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 ${
                isHeroActive
                  ? 'border-[rgba(197,31,70,0.7)] bg-[rgba(128,0,32,0.28)] shadow-[0_6px_16px_rgba(128,0,32,0.32)]'
                  : 'border-[rgba(197,31,70,0.4)] bg-[#15161D] group-hover:scale-105'
              }`}
            >
              <img
                src={`${import.meta.env.BASE_URL}sg_logo.png`}
                alt="SG Logo"
                className="h-6 w-6 object-contain"
              />
            </div>
          </a>

          <ul
            ref={navContainerRef}
            className="relative hidden items-center gap-1 rounded-full bg-[#15161D]/70 px-1 py-1 md:flex"
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="relative">
                <a
                  ref={(el) => {
                    navItemsRef.current[item.id] = el;
                  }}
                  href={item.href}
                  onClick={(event) => handleSectionClick(event, item.id)}
                  className={`relative z-10 block rounded-full px-3 py-1.5 text-[11px] font-medium tracking-[0.14em] transition-colors duration-300 lg:px-4 lg:text-[12px] ${
                    activeSection === item.id
                      ? 'text-cream'
                      : 'text-cream-muted hover:text-cream'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            {highlightStyle.width > 0 && (
              <motion.div
                className="absolute inset-y-1 left-0 rounded-full border border-[rgba(197,31,70,0.45)] bg-[rgba(128,0,32,0.26)] shadow-[0_6px_16px_rgba(128,0,32,0.3)]"
                animate={{ x: highlightStyle.x, width: highlightStyle.width }}
                initial={{ x: highlightStyle.x, width: highlightStyle.width }}
                transition={{ type: 'spring', stiffness: 480, damping: 22, mass: 0.8 }}
              />
            )}
          </ul>

          <div className="z-20 mr-1 flex items-center gap-2">
            <a
              href="#contact"
              onClick={(event) => handleSectionClick(event, 'contact')}
              className="hidden items-center gap-1 rounded-full border border-white/[0.16] bg-white/[0.03] px-4 py-2 text-[12px] font-medium tracking-[0.1em] text-cream transition-colors hover:border-[rgba(197,31,70,0.4)] hover:bg-[rgba(197,31,70,0.1)] md:inline-flex"
            >
              Let&apos;s Connect
              <ArrowUpRight size={14} />
            </a>
            <button
              className="rounded-full p-2 text-cream-muted transition-colors hover:bg-white/5 hover:text-cream md:hidden"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 md:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 right-0 top-28 z-40 px-5 md:hidden"
            >
              <div className="rounded-3xl border border-white/[0.08] bg-[#111218]/95 p-3 shadow-soft backdrop-blur-xl">
                <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.25 }}
                    >
                      <a
                        href={item.href}
                        onClick={(event) => handleSectionClick(event, item.id)}
                        className={`flex items-center rounded-2xl px-5 py-2.5 text-base font-medium transition-colors ${
                          activeSection === item.id
                            ? 'bg-brand/20 text-cream'
                            : 'text-cream-muted hover:bg-white/5 hover:text-cream'
                        }`}
                      >
                        <span
                          className={`mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-bright transition-opacity ${
                            activeSection === item.id ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  onClick={(event) => handleSectionClick(event, 'contact')}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.12] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-cream"
                >
                  Let&apos;s Connect
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
