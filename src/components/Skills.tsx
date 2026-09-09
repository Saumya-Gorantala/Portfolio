import React, { useMemo } from 'react';
import { Code2, Database, Wrench } from 'lucide-react';
import { FadeIn, SlideIn } from './animations';
import LogoLoop, { type LogoItem } from './LogoLoop';
import { skillIconMap } from './skillIconMap';

type SkillCategory = {
  title: string;
  icon: React.ReactNode;
  items: string[];
  direction: 'left' | 'right';
  speed: number;
};

const categories: SkillCategory[] = [
  {
    title: 'Development',
    icon: <Code2 size={20} />,
    direction: 'left',
    speed: 52,
    items: [
      'Python',
      'Java',
      'SQL',
      'HTML',
      'CSS',
      'JavaScript',
      'NodeJS',
      'ReactJS',
      'Express',
      'Vite',
      'TypeScript',
    ],
  },
  {
    title: 'Data & Analytics',
    icon: <Database size={20} />,
    direction: 'right',
    speed: 44,
    items: [
      'Oracle ERP Cloud',
      'File-Based Data Import (FBDI)',
      'BI Reporting Tools',
      'Tableau',
      'MS Excel',
      'Azure Data Studio',
    ],
  },
  {
    title: 'Design & Tools',
    icon: <Wrench size={20} />,
    direction: 'left',
    speed: 48,
    items: ['Figma', 'Adobe XD', 'Canva', 'Google Stitch', 'Git', 'Docker', 'Kubernetes'],
  },
];

const toLogos = (items: string[]): LogoItem[] =>
  items.map((name) => {
    const Icon = skillIconMap[name];
    return {
      node: (
        <span className="skill-logo-chip">
          {Icon ? (
            <span className="skill-logo-chip__icon">
              <Icon size={22} aria-hidden="true" />
            </span>
          ) : null}
          <span>{name}</span>
        </span>
      ),
      title: name,
      ariaLabel: name,
    };
  });

const Skills: React.FC = () => {
  const categoryLogos = useMemo(
    () => categories.map((category) => ({ ...category, logos: toLogos(category.items) })),
    [],
  );

  const missingIcons = categories.flatMap((category) => category.items).filter((skill) => !skillIconMap[skill]);

  if (import.meta.env.DEV && missingIcons.length) {
    console.warn('Missing skill icons:', missingIcons);
  }

  return (
    <section id="skills" className="relative overflow-hidden section-padding section-canvas">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(128,0,32,0.07),transparent_55%)]" />
      <div className="relative z-10 container-custom">
        <div className="mb-10 max-w-2xl">
          <SlideIn direction="left">
            <p className="label-caps mb-3">04 / SKILLS</p>
            <h2 className="heading-display text-[clamp(44px,4vw,62px)] leading-[1.0]">Tech Stack</h2>
            <span className="section-header-line" />
          </SlideIn>
        </div>

        <FadeIn delay={0.05}>
          <div className="space-y-8">
            {categoryLogos.map((category) => (
              <div key={category.title}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(197,31,70,0.32)] bg-[rgba(128,0,32,0.12)] text-[#C51F46]">
                    {category.icon}
                  </div>
                  <p className="label-caps">{category.title}</p>
                </div>
                <div className="relative overflow-hidden">
                  <LogoLoop
                    logos={category.logos}
                    speed={category.speed}
                    direction={category.direction}
                    logoHeight={42}
                    gap={16}
                    hoverSpeed={0}
                    fadeOut
                    fadeOutColor="rgba(8, 9, 13, 0.28)"
                    ariaLabel={`${category.title} skills`}
                  />
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Skills;
