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
    { value: 5, suffix: "", label: "Certifications", delay: 0.3 },
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
                  Currently seeking full-time roles in Data Analysis, Business Analysis, or UX Design starting May 2026, based in Boston and open to hybrid or remote opportunities.
                </p>
              </div>
            </Tilt>
          </SlideIn>

          {/* RIGHT: stats 2×2 */}
          <SlideIn direction="right">
            <div ref={statsRef} className="grid grid-cols-2 gap-4 h-full" style={{ gridAutoRows: '1fr' }}>
              {stats.map((stat, i) => (
                <StatCard key={i} {...stat} trigger={statsVisible} />
              ))}
            </div>
          </SlideIn>

        </div>
      </div>
    </section>
  );
};

export default About;
