import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';
import { SiBehance, SiMedium } from 'react-icons/si';
import profilePicture from '../assets/profile_picture.png';
import { downloadResume, RESUME_FILENAME, RESUME_PDF_URL } from '../lib/resume';

const Hero: React.FC = () => {
  const whiteStars = [
    { x: '4%', y: '18%', size: '2px', delay: '0s', duration: '18s' },
    { x: '11%', y: '33%', size: '1.5px', delay: '2s', duration: '22s' },
    { x: '22%', y: '12%', size: '2px', delay: '1.2s', duration: '20s' },
    { x: '32%', y: '25%', size: '1.5px', delay: '0.8s', duration: '24s' },
    { x: '42%', y: '10%', size: '2px', delay: '3s', duration: '19s' },
    { x: '56%', y: '16%', size: '1.5px', delay: '2.4s', duration: '23s' },
    { x: '67%', y: '29%', size: '2px', delay: '1.1s', duration: '21s' },
    { x: '79%', y: '12%', size: '1.5px', delay: '2.9s', duration: '26s' },
    { x: '90%', y: '23%', size: '2px', delay: '0.6s', duration: '25s' },
    { x: '13%', y: '72%', size: '2px', delay: '1.4s', duration: '20s' },
    { x: '37%', y: '83%', size: '1.5px', delay: '0.3s', duration: '24s' },
    { x: '71%', y: '78%', size: '2px', delay: '3.2s', duration: '22s' },
  ];

  const burgundyStars = [
    { x: '8%', y: '54%', size: '2px', delay: '0.4s', duration: '27s' },
    { x: '26%', y: '44%', size: '1.5px', delay: '2.2s', duration: '28s' },
    { x: '61%', y: '52%', size: '2px', delay: '1.8s', duration: '26s' },
    { x: '84%', y: '58%', size: '1.5px', delay: '2.6s', duration: '30s' },
    { x: '93%', y: '74%', size: '2px', delay: '0.9s', duration: '29s' },
  ];

  const sparkles = [
    { x: '18%', y: '22%', size: '10px', delay: '1.2s', duration: '20s' },
    { x: '74%', y: '18%', size: '9px', delay: '3.2s', duration: '24s' },
    { x: '88%', y: '64%', size: '11px', delay: '2.1s', duration: '22s' },
  ];

  return (
    <section id="about" className="relative flex min-h-svh items-center overflow-hidden section-canvas pb-10 pt-28 md:pb-12 md:pt-32">
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
        {whiteStars.map((star, idx) => (
          <span
            key={`w-${idx}`}
            className={idx > 7 ? 'absolute hidden md:block' : 'absolute'}
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              borderRadius: '9999px',
              background: '#F7F3F0',
              opacity: 0.35,
              animation: `starTwinkle ${star.duration} ease-in-out ${star.delay} infinite`,
            }}
          />
        ))}
        {burgundyStars.map((star, idx) => (
          <span
            key={`r-${idx}`}
            className={idx > 2 ? 'absolute hidden md:block' : 'absolute'}
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              borderRadius: '9999px',
              background: '#C51F46',
              opacity: 0.2,
              animation: `starTwinkle ${star.duration} ease-in-out ${star.delay} infinite`,
            }}
          />
        ))}
        {sparkles.map((sparkle, idx) => (
          <span
            key={`s-${idx}`}
            className={idx > 1 ? 'absolute hidden md:block' : 'absolute'}
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
              opacity: 0.2,
              animation: `sparklePulse ${sparkle.duration} ease-in-out ${sparkle.delay} infinite`,
            }}
          >
            <span
              className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-[#F7F3F0]/80"
            />
            <span
              className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-[#F7F3F0]/80"
            />
          </span>
        ))}
      </div>
      <div className="container-custom relative">
        <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 z-10 flex flex-col items-start text-left lg:col-span-6"
          >
            <p className="label-caps mb-5">DATA. DESIGN. TECHNOLOGY.</p>
            <h1 className="heading-display mb-6 text-[48px] font-medium leading-[0.95] sm:text-[56px] md:text-[62px] lg:text-[78px]">
              <span className="block">Saumya</span>
              <span className="block">Gorantala</span>
            </h1>

            <p className="mb-9 max-w-[500px] text-[16px] leading-relaxed text-cream-muted md:text-[17px]">
              I build data-driven solutions and intuitive digital experiences that solve real problems and create meaningful impact.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            >
              <a href="#projects" className="btn-primary">
                View My Work ↗
              </a>
              <a
                href={RESUME_PDF_URL}
                download={RESUME_FILENAME}
                className="btn-secondary"
                onClick={(event) => {
                  event.preventDefault();
                  void downloadResume();
                }}
              >
                Download Resume ↓
              </a>
            </motion.div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-cream-muted">Let&apos;s connect</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/saumya-gorantala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link !h-9 !w-9"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
                <a
                  href="https://github.com/Saumya-Gorantala?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link !h-9 !w-9"
                  aria-label="GitHub"
                >
                  <Github size={15} />
                </a>
                <a
                  href="mailto:saumya.gg6@gmail.com"
                  className="footer-social-link !h-9 !w-9"
                  aria-label="Email"
                >
                  <Mail size={15} />
                </a>
                <a
                  href="https://medium.com/@saumyagorantala6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link !h-9 !w-9"
                  aria-label="Medium"
                >
                  <SiMedium size={14} />
                </a>
                <a
                  href="https://www.behance.net/saumyagorantala6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link !h-9 !w-9"
                  aria-label="Behance"
                >
                  <SiBehance size={15} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 z-10 flex justify-center lg:col-span-6 lg:justify-end"
          >
            <div className="relative h-80 w-80 md:h-96 md:w-96 lg:h-[480px] lg:w-[480px]">
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C51F46]/25 to-[#800020]/20"
              />
              <motion.div
                animate={{ scale: [1.04, 1, 1.04] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#800020]/35 to-[#5C0018]/25"
              />
              <div className="absolute inset-8 overflow-hidden rounded-full border-[10px] border-[#5C0018] shadow-[inset_0_8px_24px_rgba(0,0,0,0.35),0_12px_40px_rgba(128,0,32,0.28)]">
                <img
                  src={profilePicture}
                  alt="Saumya Gorantala"
                  className="h-full w-full object-cover object-[center_18%]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
