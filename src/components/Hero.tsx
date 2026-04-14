import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, FileText, Github } from "lucide-react";
import { HoverGlow } from "./HoverInteractions";
import { TypeAnimation } from 'react-type-animation';
import Lanyard from './Lanyard';

const Hero: React.FC = () => {

  const roles = ["Data Analyst", "UI/UX Designer", "Developer"];

  return (
    <div id="about" className="min-h-screen flex items-center pt-20 pb-16 bg-pastel-off-white/60 dark:bg-pastel-darker-gray/60">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start text-left order-2 lg:order-1"
          >
            {/* Typing Animation for Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 min-h-[5rem] sm:min-h-[6.5rem] lg:min-h-[8rem] flex items-start">
              <TypeAnimation
                sequence={["Saumya Gorantala", 3000]}
                wrapper="span"
                cursor={false}
                style={{ fontSize: "inherit", fontWeight: "inherit", display: "inline-block" }}
              />
            </h1>

            {/* Role — typing effect, bigger, red */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10"
            >
              <TypeAnimation
                sequence={[
                  "Data Analyst",
                  2000,
                  "Business Analyst",
                  2000,
                  "UI/UX Designer",
                  2000,
                  "Developer",
                  2000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ fontSize: "clamp(1.35rem, 5vw, 2rem)", fontWeight: "700", color: "#ac212a", letterSpacing: "0.02em" }}
              />
            </motion.div>

            {/* Description */}
            <p
              className="text-xl text-foreground/80 mb-10 max-w-2xl dark:text-pastel-light-gray/80 leading-relaxed word-spacing-wide"
              style={{ wordSpacing: "0.15em" }}
            >
              Building data-driven solutions and user-centered digital experiences.
            </p>

            {/* CTA Buttons with Stagger Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="flex flex-wrap gap-3 w-full"
            >
              <HoverGlow className="rounded-full w-full sm:w-auto">
                <motion.a
                  href="#contact"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                  whileHover={{ scale: 1.08, y: 0 }}
                  whileTap={{ scale: 0.95, y: 0 }}
                  className="w-full sm:w-44 flex items-center justify-center gap-2 px-6 py-3 bg-pastel-pink text-primary-foreground rounded-full hover:bg-pastel-dark-pink transition-colors duration-300 dark:bg-pastel-burgundy dark:text-white dark:hover:bg-pastel-burgundy/80 shadow-soft font-medium"
                >
                  <Mail size={18} />
                  <span>Contact Me</span>
                </motion.a>
              </HoverGlow>
              <HoverGlow className="rounded-full w-full sm:w-auto">
                <motion.a
                  href="https://www.linkedin.com/in/saumya-gorantala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  whileHover={{ scale: 1.08, y: 0 }}
                  whileTap={{ scale: 0.95, y: 0 }}
                  className="w-full sm:w-44 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-pastel-pink text-foreground rounded-full hover:bg-pastel-light-pink transition-colors duration-300 dark:bg-pastel-dark-gray dark:border-pastel-burgundy dark:text-pastel-light-gray dark:hover:bg-pastel-charcoal shadow-soft font-medium"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </motion.a>
              </HoverGlow>
              <HoverGlow className="rounded-full w-full sm:w-auto">
                <motion.a
                  href="https://github.com/Saumya-Gorantala?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  whileHover={{ scale: 1.08, y: 0 }}
                  whileTap={{ scale: 0.95, y: 0 }}
                  className="w-full sm:w-44 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-pastel-pink text-foreground rounded-full hover:bg-pastel-light-pink transition-colors duration-300 dark:bg-pastel-dark-gray dark:border-pastel-burgundy dark:text-pastel-light-gray dark:hover:bg-pastel-charcoal shadow-soft font-medium"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </motion.a>
              </HoverGlow>
              <HoverGlow className="rounded-full w-full sm:w-auto">
                <motion.a
                  href="#resume-links"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  whileHover={{ scale: 1.08, y: 0 }}
                  whileTap={{ scale: 0.95, y: 0 }}
                  className="w-full sm:w-44 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-pastel-pink text-foreground rounded-full hover:bg-pastel-light-pink transition-colors duration-300 dark:bg-pastel-dark-gray dark:border-pastel-burgundy dark:text-pastel-light-gray dark:hover:bg-pastel-charcoal shadow-soft font-medium"
                >
                  <FileText size={18} />
                  <span>Resume</span>
                </motion.a>
              </HoverGlow>
            </motion.div>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex justify-center order-1 lg:order-2"
          >
            <motion.div
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px]"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-br from-pastel-pink to-pastel-red rounded-full opacity-20 dark:from-pastel-burgundy dark:to-pastel-burgundy/70"
              />
              <motion.div
                animate={{ scale: [1.05, 1, 1.05] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute inset-4 bg-gradient-to-tr from-pastel-red to-pastel-pink rounded-full opacity-30 dark:from-pastel-burgundy dark:to-pastel-burgundy/70"
              />
              <div className="absolute inset-8 glass-card rounded-full overflow-hidden border-2 border-white/50 dark:border-pastel-burgundy/30">
                <Lanyard position={[0, 0, 24]} gravity={[0, -40, 0]} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
