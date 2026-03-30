
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { id: "about", href: "#about", label: "Home" },
  { id: "about-section", href: "#about-section", label: "About" },
  { id: "education", href: "#education", label: "Education" },
  { id: "skills", href: "#skills", label: "Skills" },
  { id: "experience", href: "#experience", label: "Experience" },
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "resume-links", href: "#resume-links", label: "Links" },
  { id: "contact", href: "#contact", label: "Contact" }
];

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [highlightStyle, setHighlightStyle] = useState({ x: 0, width: 0 });
  const [navReady, setNavReady] = useState(false);
  const navItemsRef = useRef<Record<string, HTMLElement | null>>({});
  const navContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Recalculate highlight whenever active section changes or nav becomes ready
  useEffect(() => {
    const calculateHighlightPosition = () => {
      const activeElement = navItemsRef.current[activeSection];
      const container = navContainerRef.current;
      if (activeElement && container) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = activeElement.getBoundingClientRect();
        setHighlightStyle({
          x: elementRect.left - containerRect.left,
          width: elementRect.width
        });
      }
    };

    if (navReady) {
      requestAnimationFrame(calculateHighlightPosition);
    }

    window.addEventListener('resize', calculateHighlightPosition);
    return () => window.removeEventListener('resize', calculateHighlightPosition);
  }, [activeSection, navReady]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <motion.header 
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-3/4 max-w-5xl"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={() => setNavReady(true)}
      >
        <nav className="relative flex items-center justify-between px-4 py-2 bg-white/70 backdrop-blur-xl border border-white/40 shadow-soft rounded-full dark:bg-pastel-darker-gray/70 dark:border-pastel-charcoal/40 dark:shadow-dark-soft">
          {/* Logo */}
          <a href="#" className="flex items-center z-20 ml-2 group">
            <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center border border-pastel-pink bg-white/50 group-hover:scale-110 transition-transform dark:border-pastel-burgundy dark:bg-pastel-charcoal/50">
              <img 
                src={`${import.meta.env.BASE_URL}sg_logo.png`}
                alt="SG Logo" 
                className="w-7 h-7 object-contain"
              />
            </div>
          </a>
          
          {/* Desktop Nav Items */}
          <ul 
            ref={navContainerRef}
            className="hidden md:flex items-center bg-pastel-light-gray/30 dark:bg-pastel-charcoal/30 rounded-full px-1 py-1 relative"
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="relative">
                <a 
                  ref={(el) => {
                    if (el) navItemsRef.current[item.id] = el;
                  }}
                  href={item.href} 
                  className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300 block rounded-full ${
                    activeSection === item.id 
                      ? 'text-pastel-burgundy dark:text-white' 
                      : 'text-foreground/70 hover:text-foreground dark:text-pastel-light-gray/70 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            {/* Gliding Highlight Background */}
            {highlightStyle.width > 0 && (
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-white via-white to-white shadow-[0_2px_12px_rgba(255,182,193,0.4)] border border-pastel-pink/40 rounded-full z-0 dark:from-pastel-burgundy dark:via-pastel-burgundy dark:to-pastel-burgundy dark:shadow-[0_2px_12px_rgba(131,24,67,0.5)] dark:border-pastel-burgundy/60"
                animate={{
                  x: highlightStyle.x,
                  width: highlightStyle.width
                }}
                initial={{
                  x: highlightStyle.x,
                  width: highlightStyle.width
                }}
                transition={{
                  type: "spring",
                  stiffness: 480,
                  damping: 22,
                  mass: 0.8
                }}
              />
            )}
          </ul>
          
          {/* Actions */}
          <div className="flex items-center gap-2 z-20 mr-1">
            <ThemeToggle />
            <button 
              className="md:hidden p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors" 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-24 z-40 px-6 md:hidden pointer-events-none"
          >
            <div className="bg-white/95 dark:bg-pastel-darker-gray/95 backdrop-blur-xl border border-white/40 dark:border-pastel-charcoal/40 p-8 rounded-[2rem] shadow-hover dark:shadow-dark-hover pointer-events-auto">
              <ul className="flex flex-col items-center space-y-6">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id} className="w-full text-center">
                    <a 
                      href={item.href} 
                      className={`text-xl font-semibold transition-colors block py-2 ${
                        activeSection === item.id 
                          ? 'text-pastel-burgundy' 
                          : 'text-foreground/70 dark:text-pastel-light-gray/70'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
