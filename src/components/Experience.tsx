import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Briefcase, Calendar, MapPin } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { FadeIn, SlideIn } from './animations';
import { RESUME_PDF_URL } from '../lib/resume';

type ExperienceItem = {
  company: string;
  role: string;
  logo: string;
  dates: string;
  location?: string;
  employmentType: string;
  achievements: string[];
  tools: string[];
};

const experiences: ExperienceItem[] = [
  {
    company: 'Deloitte',
    role: 'Data Consulting Analyst',
    logo: 'https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/Deloitte(dark).jpg',
    dates: 'Oct 2023 - Jun 2024',
    location: 'Hyderabad, IN',
    employmentType: 'Full-time',
    achievements: [
      'Led end-to-end legacy-to-Oracle Fusion Cloud data migrations across WMS, Sales Orders, and BPA using FBDI, validating and reconciling source and target records for accurate migration.',
      'Automated BI Publisher reports and ERP reporting workflows using SQL, reducing manual reconciliation effort and improving reporting turnaround.',
      'Designed and validated data transformation logic and mapping documentation, bridging structural gaps between legacy systems and Oracle Fusion.',
      'Investigated and resolved data discrepancies through root-cause analysis, while performing post-migration validation using SQL, Excel, and ERP dashboards to ensure clean, reconciled client handoffs.',
    ],
    tools: ['SQL', 'Oracle', 'BI Publisher', 'FBDI', 'Tableau', 'Data Analytics'],
  },
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative overflow-hidden section-padding section-canvas">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 items-start gap-[18px] xl:grid-cols-[minmax(320px,1.45fr)_repeat(4,minmax(0,1fr))]">
          <div>
            <SlideIn direction="left">
              <FadeIn>
                <p className="label-caps mb-3">02 / EXPERIENCE</p>
                <h2 className="heading-display text-[clamp(38px,4vw,52px)] font-medium leading-[1.05]">
                  Experience
                </h2>
                <span className="section-header-line" />
                <a
                  href={RESUME_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium tracking-wide text-cream-muted transition-colors hover:text-[#C51F46]"
                >
                  View full resume <ArrowUpRight size={14} />
                </a>
              </FadeIn>
            </SlideIn>
          </div>

          <div className="min-w-0 xl:col-span-4">
            {experiences.map((experience) => (
              <motion.div
                key={experience.company + experience.role}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <Tilt
                  tiltMaxAngleX={3}
                  tiltMaxAngleY={3}
                  scale={1.005}
                  transitionSpeed={500}
                  glareEnable={false}
                  className="w-full"
                >
                  <article className="glass-card interactive-card w-full rounded-2xl p-5 sm:p-6 md:p-8">
                    <div className="flex items-start gap-4 sm:gap-5 md:gap-6">
                      <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-[#15161D] p-2 sm:h-[88px] sm:w-[88px]">
                        <img
                          src={experience.logo}
                          alt={experience.company}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h3 className="heading-display text-[28px] font-medium leading-none text-cream sm:text-[34px] md:text-[40px]">
                            {experience.company}
                          </h3>
                          <p className="mt-2 text-[14px] font-medium tracking-wide text-[#C51F46] sm:text-[15px]">
                            {experience.role}
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-cream-muted sm:text-[13px]">
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar size={13} className="text-[#C51F46]" />
                              {experience.dates}
                            </span>
                            {experience.location && (
                              <>
                                <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden="true" />
                                <span className="inline-flex items-center gap-1.5">
                                  <MapPin size={13} className="text-[#C51F46]" />
                                  {experience.location}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[rgba(197,31,70,0.45)] px-3 py-1 text-[11px] font-medium tracking-wide text-cream">
                          <Briefcase size={12} className="text-[#C51F46]" />
                          {experience.employmentType}
                        </span>
                      </div>
                    </div>

                    <div className="my-5 h-px w-full bg-[rgba(255,255,255,0.08)] sm:my-6" />

                    <ul className="mb-5 space-y-3 sm:mb-6">
                      {experience.achievements.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-[14px] leading-relaxed text-cream sm:text-[15px]">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C51F46]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {experience.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-[rgba(197,31,70,0.4)] px-3 py-1 text-[12px] font-medium tracking-wide text-cream"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </article>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
