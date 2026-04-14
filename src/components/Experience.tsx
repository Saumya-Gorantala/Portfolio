
import React from 'react';
import Tilt from 'react-parallax-tilt';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { FadeIn, SlideIn } from './animations';

const Experience: React.FC = () => {
  const bullets = [
    "Led end-to-end data migration across multiple Oracle Fusion Cloud modules, including WMS, Sales Orders, and BPA, using File-Based Data Import (FBDI), ensuring high accuracy through structured analysis, validation, and reconciliation of source and target records.",
    "Automated BI Publisher reports using SQL queries and ERP dashboards to streamline reporting workflows, significantly reducing manual reconciliation effort and improving reporting turnaround time across the project team.",
    "Resolved data discrepancies across cross-functional teams using root cause analysis, implementing corrective measures that improved overall ERP integration reliability and reduced recurring data quality issues.",
    "Designed and validated transformation logic and mapping documentation across large-scale migration scripts, identifying and bridging data structure gaps between Oracle Fusion and legacy systems to consistently produce clean and accurate outputs.",
    "Monitored and validated post-migration data integrity using SQL, Excel, and ERP dashboards, performing comprehensive checks to support on-time project delivery and ensure a clean, fully reconciled handoff to the client.",
  ];

  const tags = ["SQL", "Oracle Fusion Cloud", "FBDI", "BI Publisher", "Tableau", "Excel"];

  return (
    <section id="experience" className="section-padding bg-pastel-off-white/60 dark:bg-pastel-darker-gray/30">
      <div className="container-custom">
        <FadeIn>
          <SectionTitle
            title="Professional Experience"
            subtitle="Work History"
          />
        </FadeIn>

        <SlideIn>
          <Tilt
            tiltMaxAngleX={4}
            tiltMaxAngleY={4}
            scale={1.01}
            transitionSpeed={600}
            glareEnable={false}
          >
            <div className="glass-card hover-card p-6 sm:p-8 lg:p-12 cursor-default max-w-4xl mx-auto">

              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                {/* Left: type badge + title + company */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={15} className="text-pastel-burgundy dark:text-pastel-burgundy flex-shrink-0" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-pastel-burgundy dark:text-pastel-burgundy">
                      Full-Time
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground dark:text-pastel-light-gray mb-1">
                    Data Consulting Analyst
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="h-7 flex items-center justify-center">
                      <img
                        src="https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/Deloitte(Light).jpg"
                        alt="Deloitte"
                        className="h-full w-auto object-contain block dark:hidden"
                      />
                      <img
                        src="https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/Deloitte(dark).jpg"
                        alt="Deloitte"
                        className="h-full w-auto object-contain hidden dark:block"
                      />
                    </div>
                    <span className="text-sm text-foreground/70 dark:text-pastel-light-gray/70 font-medium">
                      Deloitte
                    </span>
                  </div>
                </div>

                {/* Right: date + location */}
                <div className="flex flex-col gap-2 sm:text-right flex-shrink-0">
                  <div className="flex items-center gap-2 sm:justify-end text-sm text-foreground/60 dark:text-pastel-light-gray/60">
                    <Calendar size={14} className="flex-shrink-0" />
                    <span>Oct 2023 – June 2024</span>
                  </div>
                  <div className="flex items-center gap-2 sm:justify-end text-sm text-foreground/60 dark:text-pastel-light-gray/60">
                    <MapPin size={14} className="flex-shrink-0" />
                    <span>Hyderabad, IN</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-black/10 dark:bg-white/10 w-full mb-8" />

              {/* Bullet points */}
              <ul className="space-y-4 mb-8">
                {bullets.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-pastel-burgundy dark:bg-pastel-burgundy flex-shrink-0" />
                    <span className="text-sm text-foreground/80 dark:text-pastel-light-gray/80 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-full border border-black/10 dark:border-white/10 text-foreground/70 dark:text-pastel-light-gray/70 bg-black/3 dark:bg-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Tilt>
        </SlideIn>
      </div>
    </section>
  );
};

export default Experience;
