import React from 'react';
import Navbar from './Navbar';
import PremiumBackground from './PremiumBackground';
import { StarsBackground } from './animate-ui/components/backgrounds/stars';
import { Linkedin, Github, Mail } from 'lucide-react';
import { useLenisScroll } from '../hooks/useLenisScroll';
import { useTheme } from 'next-themes';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useLenisScroll();
  const { resolvedTheme } = useTheme();

  return (
    <div className="relative min-h-screen">
      <PremiumBackground />
      <div className="relative z-0 min-h-screen bg-gradient-to-br
        from-pastel-white/50 via-pastel-off-white/50 to-pastel-light-pink/50
        dark:from-pastel-darker-gray/80 dark:via-pastel-dark-gray/75 dark:to-pastel-charcoal/70
        transition-colors duration-300">
        {/* Coloured stars — burgundy in light, white in dark */}
        <StarsBackground
          starColor={resolvedTheme === 'dark' ? '#ffffff' : '#ac212a'}
          speed={60}
          factor={0.03}
          className="absolute inset-0 bg-transparent"
          style={{ zIndex: 0, pointerEvents: 'none' }}
        />
        {/* White star overlay — always white, slower, subtler */}
        <StarsBackground
          starColor="rgba(255,255,255,0.75)"
          speed={100}
          factor={0.02}
          className="absolute inset-0 bg-transparent"
          style={{ zIndex: 0, pointerEvents: 'none' }}
        />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <footer className="py-8 bg-pastel-light-pink/50 backdrop-blur-md border-t border-white/20 dark:bg-pastel-charcoal/30 dark:border-pastel-charcoal/30">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-left">
                <h2 className="text-lg font-bold text-foreground dark:text-pastel-light-gray">Saumya Gorantala</h2>
                <p className="text-xs text-foreground/60 dark:text-pastel-light-gray/60">
                  Data Analyst | Business Analyst | UI/UX Designer | Developer
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://www.linkedin.com/in/saumya-gorantala/" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="LinkedIn"><Linkedin size={18} /></a>
                <a href="https://github.com/Saumya-Gorantala?tab=repositories" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="GitHub"><Github size={18} /></a>
                <a href="https://medium.com/@saumyagorantala6" target="_blank" rel="noopener noreferrer" className="footer-social-link group" title="Medium">
                  <img src="https://www.vectorlogo.zone/logos/medium/medium-icon.svg" alt="Medium" className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity dark:invert" />
                </a>
                <a href="https://www.behance.net/saumyagorantala6" target="_blank" rel="noopener noreferrer" className="footer-social-link group" title="Behance">
                  <img src="https://www.vectorlogo.zone/logos/behance/behance-icon.svg" alt="Behance" className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity dark:invert" />
                </a>
                <a href="mailto:saumya.gg6@gmail.com" className="footer-social-link" title="Email"><Mail size={18} /></a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/5 text-center text-[10px] text-foreground/40 dark:text-pastel-light-gray/40">
              <p>© {new Date().getFullYear()} Saumya Gorantala. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
