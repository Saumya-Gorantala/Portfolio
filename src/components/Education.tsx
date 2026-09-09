import React from 'react';
import Tilt from 'react-parallax-tilt';
import { CalendarDays, GraduationCap, MapPin } from 'lucide-react';
import { FadeIn, SlideIn, Stagger, StaggerItem } from './animations';

const Education: React.FC = () => {
  const educationData = [
    {
      degreeType: 'Master of Science',
      school: 'Northeastern University',
      field: 'Information Systems',
      location: 'Boston, MA',
      period: 'Sep 2024 – Apr 2026',
      description:
        'Focusing on advanced data analytics, system design, and information architecture.',
      coursework: ['Data Analytics', 'Database Management', 'System Design', 'Information Architecture'],
      summary:
        'Focused on data, systems, product thinking, and applied technology through hands-on academic and project work.',
      iconType: 'northeastern' as const,
    },
    {
      degreeType: 'Bachelor of Technology',
      school: 'G. Narayanamma Institute of Technology and Science',
      field: 'Information Technology',
      location: 'Hyderabad, IN',
      period: 'Aug 2019 – May 2023',
      description:
        'Foundational engineering studies with a focus on information systems and software development.',
      coursework: ['Data Structures', 'Software Engineering', 'Web Technologies', 'Computer Networks'],
      summary:
        'Foundational engineering studies with a focus on information systems and software development.',
      iconType: 'undergrad' as const,
    },
  ];

  return (
    <section id="education" className="relative overflow-hidden section-padding section-surface">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6 xl:gap-8">
          <div className="lg:col-span-4">
            <SlideIn direction="left">
              <FadeIn>
                <div className="flex h-full flex-col">
                  <p className="label-caps mb-3">05 / EDUCATION</p>
                  <h2 className="heading-display text-[clamp(38px,4vw,52px)] font-medium leading-[1.05]">
                    Education
                  </h2>
                  <span className="section-header-line" />
                  <p className="mt-5 max-w-[360px] text-[15px] leading-[1.55] text-cream-muted">
                    My academic background blends information systems, technology, and problem solving,
                    giving me a strong foundation in both analytical thinking and practical execution.
                  </p>
                </div>
              </FadeIn>
            </SlideIn>
          </div>

          <div className="lg:col-span-8">
            <Stagger>
              <div className="flex flex-col gap-3.5 md:gap-4">
              {educationData.map((edu) => (
                <StaggerItem key={`${edu.school}-${edu.degreeType}`}>
                  <Tilt
                    tiltMaxAngleX={4}
                    tiltMaxAngleY={4}
                    scale={1.01}
                    transitionSpeed={500}
                    glareEnable={false}
                  >
                    <article className="glass-card interactive-card rounded-2xl p-4 sm:p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <div className="flex-shrink-0">
                          <div className="flex h-[78px] w-[78px] items-center justify-center rounded-full border border-[rgba(197,31,70,0.38)] bg-[rgba(128,0,32,0.10)] text-[#C51F46]">
                            {edu.iconType === 'northeastern' ? (
                              <span className="heading-display text-[48px] leading-none text-[#C51F46]">N</span>
                            ) : (
                              <GraduationCap size={34} strokeWidth={1.6} />
                            )}
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="heading-display text-[clamp(19px,1.7vw,24px)] leading-[1.1] text-cream">
                            {edu.school}
                          </h3>
                          <p className="mt-1 text-[15px] leading-[1.35] text-cream-muted">{edu.degreeType} in {edu.field}</p>

                          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] text-cream-muted">
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin size={14} className="text-[#C51F46]" />
                              {edu.location}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays size={14} className="text-[#C51F46]" />
                              {edu.period}
                            </span>
                          </div>

                          <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-cream-muted">
                            {edu.summary}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {edu.coursework.map((course) => (
                              <span
                                key={course}
                                className="rounded-full border border-[rgba(197,31,70,0.35)] bg-[rgba(128,0,32,0.14)] px-2.5 py-0.5 text-[11px] font-medium text-[#d68da0]"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Tilt>
                </StaggerItem>
              ))}
              </div>
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
