import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
  FileText,
  Linkedin,
  Github,
  Palette,
  ExternalLink,
  Download,
  Eye
} from 'lucide-react';
import SectionTitle from './SectionTitle';
import { FadeIn, StaggerItem, Stagger } from './animations';
import {
  PreviewLinkCard,
  PreviewLinkCardTrigger,
  PreviewLinkCardContent,
  PreviewLinkCardImage,
} from '@/components/animate-ui/components/radix/preview-link-card';

const ResumeLinks: React.FC = () => {
  const professionalLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="text-[#0077b5]" size={24} />,
      description: "Professional experience and career profile",
      url: "https://www.linkedin.com/in/saumya-gorantala/",
      buttonText: "View Profile",
      color: "bg-[#0077b5]/10 hover:bg-[#0077b5]/20"
    },
    {
      name: "GitHub",
      icon: <Github className="text-foreground dark:text-white" size={24} />,
      description: "Code repositories and development work",
      url: "https://github.com/Saumya-Gorantala?tab=repositories",
      buttonText: "View Projects",
      color: "bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10"
    },
    {
      name: "Behance",
      icon: <img src="https://www.vectorlogo.zone/logos/behance/behance-icon.svg" alt="Behance" className="w-6 h-6 dark:invert" />,
      description: "UX design and portfolio case studies",
      url: "https://www.behance.net/saumyagorantala6",
      buttonText: "View Designs",
      color: "bg-[#1769ff]/10 hover:bg-[#1769ff]/20"
    },
    {
      name: "Medium",
      icon: <img src="https://www.vectorlogo.zone/logos/medium/medium-icon.svg" alt="Medium" className="w-6 h-6 dark:invert" />,
      description: "Technical writing and insights",
      url: "https://medium.com/@saumyagorantala6",
      buttonText: "Read Articles",
      color: "bg-[#ffc017]/10 hover:bg-[#ffc017]/20"
    }
  ];

  return (
    <section id="resume-links" className="section-padding bg-pastel-off-white/60 dark:bg-pastel-darker-gray/30">
      <div className="container-custom">
        <FadeIn>
          <SectionTitle
            title="Resume & Professional Links"
            subtitle="Connect With Me"
          />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Side: Resume Card */}
          <motion.div
            className="lg:col-span-4 lg:row-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} scale={1.02} transitionSpeed={400} glareEnable={false} className="h-full">
              <div className="glass-card hover-card h-full p-8 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-pastel-pink/20 rounded-full flex items-center justify-center mb-6 dark:bg-pastel-burgundy/20">
                  <FileText size={40} className="text-primary-foreground dark:text-pastel-burgundy" />
                </div>
                <h3 className="text-2xl font-bold mb-4 dark:text-pastel-light-gray">Resume</h3>
                <p className="text-foreground/70 dark:text-pastel-light-gray/70 mb-8 max-w-xs">
                  Download my resume to view my experience, technical skills, and project work.
                </p>
                <div className="flex flex-col gap-4 w-full px-4">
                  <motion.a
                    href="https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Resume/SaumyaGorantala_Resume.pdf"
                    download
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-pastel-pink text-primary-foreground rounded-full hover:bg-pastel-dark-pink transition-colors duration-300 dark:bg-pastel-burgundy dark:text-white dark:hover:bg-pastel-burgundy/80 shadow-soft"
                  >
                    <Download size={18} />
                    <span className="font-semibold">Download Resume</span>
                  </motion.a>
                  <motion.a
                    href="https://github.com/Saumya-Gorantala/Portfolio/blob/main/Resume/SaumyaGorantala_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-pastel-pink text-foreground rounded-full hover:bg-pastel-light-pink transition-colors duration-300 dark:bg-pastel-dark-gray dark:border-pastel-burgundy dark:text-pastel-light-gray dark:hover:bg-pastel-charcoal shadow-soft"
                  >
                    <Eye size={18} />
                    <span className="font-semibold">View Resume</span>
                  </motion.a>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Right Side: Professional Links Grid */}
          <motion.div
            className="lg:col-span-8 h-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card h-full p-8">
              <h3 className="text-2xl font-bold mb-8 dark:text-pastel-light-gray">Professional Profiles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {professionalLinks.map((link, index) => (
                  <Tilt key={index} tiltMaxAngleX={6} tiltMaxAngleY={6} scale={1.03} transitionSpeed={400} glareEnable={false}>
                    <div className={`p-6 rounded-2xl ${link.color} transition-all duration-300 flex flex-col justify-between group`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm dark:bg-pastel-charcoal">
                          {link.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold dark:text-pastel-light-gray">{link.name}</h4>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/70 dark:text-pastel-light-gray/70 mb-6">
                        {link.description}
                      </p>
                      <PreviewLinkCard href={link.url} width={200} height={113}>
                        <PreviewLinkCardTrigger asChild>
                          <motion.a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/60 dark:bg-white/5 rounded-lg text-sm font-semibold hover:bg-white dark:hover:bg-white/10 transition-colors duration-300"
                          >
                            <span>{link.buttonText}</span>
                            <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                          </motion.a>
                        </PreviewLinkCardTrigger>
                        <PreviewLinkCardContent side="top" sideOffset={8}>
                          <PreviewLinkCardImage alt={link.name} />
                        </PreviewLinkCardContent>
                      </PreviewLinkCard>
                    </div>
                  </Tilt>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResumeLinks;
