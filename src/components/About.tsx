import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import SectionTitle from './SectionTitle';
import { FadeIn, SlideIn } from './animations';

const useCountUp = (target: number, duration: number = 1800, trigger: boolean = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [trigger, target, duration]);
  return count;
};

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  trigger: boolean;
  static?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ value, suffix, label, delay, trigger, static: isStatic }) => {
  const count = useCountUp(value, 1800, isStatic ? false : trigger);
  const display = isStatic ? value : count;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.04} transitionSpeed={400} glareEnable={false} className="h-full">
        <div className="glass-card hover-card p-4 flex flex-col items-center justify-center text-center rounded-2xl cursor-default h-full">
          <span className="text-4xl font-bold text-pastel-burgundy dark:text-pastel-light-gray leading-none mb-1">
            {display}{suffix}
          </span>
          <span className="text-sm font-semibold text-foreground dark:text-pastel-light-gray">{label}</span>
        </div>
      </Tilt>
    </motion.div>
  );
};

const journeyPhases = [
  {
    phase: "Learned",
    heading: "BTech in Information Technology - GNITS",
    summary: "Built a foundation in systems, software, and engineering at G. Narayanamma Institute of Technology and Science.",
    image: "https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/UndergradCollege.jpg",
    imageDark: null,
    imageAlt: "G. Narayanamma Institute",
  },
  {
    phase: "Worked",
    heading: "Data Consulting Analyst - Deloitte",
    summary: "Led enterprise data migrations on Oracle Fusion Cloud and developed a deep intuition for how data moves at scale.",
    image: "https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/D.jpg",
    imageDark: null,
    imageAlt: "Deloitte",
  },
  {
    phase: "Building",
    heading: "MS Information Systems - Northeastern",
    summary: "Bridging data and design through graduate coursework, full-stack projects, and UX research — graduating May 2026.",
    image: "https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/Northeastern-University-Logo.jpg",
    imageDark: null,
    imageAlt: "Northeastern University",
  },
];

const About: React.FC = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 1, suffix: "+", label: "Year Industry Experience", delay: 0, static: true },
    { value: 5, suffix: "+", label: "Projects Completed", delay: 0.1 },
    { value: 10, suffix: "+", label: "Technologies Mastered", delay: 0.2 },
    { value: 3, suffix: "", label: "Certifications", delay: 0.3 },
  ];

  return (
    <section id="about-section" className="section-padding bg-pastel-light-pink/50 dark:bg-pastel-charcoal/30">
      <div className="container-custom">
        <FadeIn>
          <SectionTitle title="About Me" subtitle="Who I Am" />
        </FadeIn>

        {/* Two columns — stretch so both reach the same height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* LEFT: description */}
          <SlideIn direction="left">
            <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01} transitionSpeed={500} glareEnable={false} className="h-full">
              <div className="glass-card hover-card p-8 space-y-5 cursor-default h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-pastel-burgundy dark:text-pastel-burgundy">The Person Behind the Work</h3>
                <p className="text-base text-foreground/80 dark:text-pastel-light-gray/80 leading-relaxed">
                  I am a graduate student in Information Systems at Northeastern University, graduating May 2026, with a background that does not fit neatly into one box. I work with data, I design experiences, and I build systems that connect the two.
                </p>
                <p className="text-base text-foreground/80 dark:text-pastel-light-gray/80 leading-relaxed">
                  At Deloitte, I worked as a Data Consulting Analyst on Oracle Fusion Cloud implementations, leading data migration across enterprise systems, building automated reports, and making sure large-scale data transitions actually landed cleanly. That experience gave me a strong foundation in how data moves, where it breaks, and how to fix it. Outside of data work, I have designed end-to-end digital products in Figma, from the first user interview to the final prototype, building apps for language learning, rental matching, and job tracking along the way.
                </p>
                <p className="text-base text-foreground/80 dark:text-pastel-light-gray/80 leading-relaxed">
                  I am drawn to problems where understanding the data and understanding the user both matter equally. The most interesting challenges are never purely technical or purely human, and I like being the person in the room who can speak both languages.
                </p>
                <p className="text-base text-foreground/80 dark:text-pastel-light-gray/80 leading-relaxed">
                  Currently seeking full-time roles in Data Analysis, Business Analysis, or UX Design starting May 2026, based in Boston and open to hybrid or remote opportunities.
                </p>
              </div>
            </Tilt>
          </SlideIn>

          {/* RIGHT: stats + My Journey stacked to fill same height as left */}
          <SlideIn direction="right">
            <div className="flex flex-col gap-4 h-full">

              {/* Stats 2×2 — fixed size, not stretching */}
              <div ref={statsRef} className="grid grid-cols-2 gap-4 flex-shrink-0" style={{ gridAutoRows: '1fr' }}>
                {stats.map((stat, i) => (
                  <StatCard key={i} {...stat} trigger={statsVisible} />
                ))}
              </div>

              {/* My Journey — fills remaining height */}
              <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.01} transitionSpeed={500} glareEnable={false} className="flex-1">
                <div className="glass-card hover-card p-8 cursor-default h-full">
                  <h3 className="text-xl font-bold mb-6 dark:text-pastel-light-gray">My Journey</h3>
                  <div className="relative">
                    {/* Vertical red line */}
                    <div className="absolute left-[18px] top-2 bottom-2 w-px bg-pastel-burgundy/30 dark:bg-pastel-burgundy/40" />
                    <div className="space-y-6">
                      {journeyPhases.map((phase, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.12 }}
                          className="flex items-start gap-4 pl-1"
                        >
                          {/* Logo dot */}
                          <div className="relative z-10 mt-1 w-9 h-9 rounded-full bg-white dark:bg-pastel-charcoal border-2 border-pastel-burgundy flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                            {phase.imageDark ? (
                              <>
                                <img src={phase.image} alt={phase.imageAlt} className="w-full h-full object-cover block dark:hidden" />
                                <img src={phase.imageDark} alt={phase.imageAlt} className="w-full h-full object-cover hidden dark:block" />
                              </>
                            ) : (
                              <img src={phase.image} alt={phase.imageAlt} className="w-full h-full object-cover" />
                            )}
                          </div>
                          {/* Text */}
                          <div className="flex-1 pt-0.5">
                            <span className="text-xs font-bold uppercase tracking-widest text-pastel-burgundy dark:text-pastel-burgundy">
                              {phase.phase}
                            </span>
                            <p className="text-sm font-semibold text-foreground dark:text-pastel-light-gray leading-snug mb-1">
                              {phase.heading}
                            </p>
                            <p className="text-xs text-foreground/60 dark:text-pastel-light-gray/60 leading-relaxed">
                              {phase.summary}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </Tilt>

            </div>
          </SlideIn>

        </div>
      </div>
    </section>
  );
};

export default About;
