import React from 'react';
import Navbar from './Navbar';
import PremiumBackground from './PremiumBackground';
import StarField from './StarField';
import OrbitDecorations from './OrbitDecorations';
import { ArrowUp } from 'lucide-react';
import { useLenisScroll } from '../hooks/useLenisScroll';
import { scrollToSection } from '../lib/scrollToSection';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useLenisScroll();

  return (
    <div className="relative min-h-screen bg-canvas text-cream">
      <PremiumBackground />
      <StarField />
      <OrbitDecorations />
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <main>{children}</main>
        <footer className="relative overflow-hidden border-t border-[rgba(255,255,255,0.06)] bg-[rgba(8,9,13,0.9)] py-2.5 backdrop-blur-[1px] md:py-3">
          <div className="container-custom relative">
            <div className="flex min-h-[44px] flex-col justify-center gap-2 md:min-h-[52px] md:flex-row md:items-center md:justify-between">
              <p className="text-center text-xs tracking-wide text-cream-dim md:text-left">
                © 2026 Saumya Gorantala. All rights reserved.
              </p>

              <div className="flex items-center justify-center gap-4 md:justify-end">
                <a
                  href="https://www.linkedin.com/in/saumya-gorantala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cream-muted transition-colors hover:text-cream"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Saumya-Gorantala?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cream-muted transition-colors hover:text-cream"
                >
                  GitHub
                </a>
                <a
                  href="mailto:saumya.gg6@gmail.com"
                  className="text-xs text-cream-muted transition-colors hover:text-cream"
                >
                  Email
                </a>
                <a
                  href="#about"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection('about');
                  }}
                  aria-label="Back to top"
                  className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(197,31,70,0.45)] bg-[#0d0e13]/70 text-[#C51F46] transition-all hover:bg-[#800020] hover:text-white"
                >
                  <ArrowUp size={13} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
