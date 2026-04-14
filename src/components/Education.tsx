
import React from 'react';
import Tilt from 'react-parallax-tilt';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { FadeIn, StaggerItem, Stagger } from './animations';

const Education: React.FC = () => {
  const educationData = [
    {
      degreeType: "Master of Science",
      school: "Northeastern University",
      field: "Information Systems",
      location: "Boston, MA",
      period: "Sep 2024 – April 2026",
      description: "Focusing on advanced data analytics, system design, and information architecture.",
    },
    {
      degreeType: "Bachelor of Technology",
      school: "G. Narayanamma Institute of Technology and Science",
      field: "Information Technology",
      location: "Hyderabad, IN",
      period: "Aug 2019 – May 2023",
      description: "Foundational engineering studies with a focus on information systems and software development.",
    }
  ];

  return (
    <section id="education" className="section-padding bg-pastel-light-pink/50 dark:bg-pastel-charcoal/30">
      <div className="container-custom">
        <FadeIn>
          <SectionTitle
            title="Education"
            subtitle="Academic Background"
          />
        </FadeIn>

        <Stagger>
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {educationData.map((edu, index) => (
              <StaggerItem key={index}>
                <Tilt
                  tiltMaxAngleX={4}
                  tiltMaxAngleY={4}
                  scale={1.01}
                  transitionSpeed={500}
                  glareEnable={false}
                >
                  <div className="glass-card hover-card p-6 sm:p-8 lg:p-12 cursor-default">
                    {/* Top row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      {/* Left: degree info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4">
                          <GraduationCap size={16} className="text-pastel-burgundy dark:text-pastel-burgundy flex-shrink-0" />
                          <span className="text-xs font-semibold tracking-widest uppercase text-pastel-burgundy dark:text-pastel-burgundy">
                            {edu.degreeType}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground dark:text-pastel-light-gray mb-2">
                          {edu.school}
                        </h3>
                        <p className="text-sm text-foreground/60 dark:text-pastel-light-gray/60">
                          {edu.field}
                        </p>
                      </div>

                      {/* Right: date + location */}
                      <div className="flex flex-col gap-2.5 sm:text-right flex-shrink-0">
                        <div className="flex items-center gap-2 sm:justify-end text-sm text-foreground/60 dark:text-pastel-light-gray/60">
                          <Calendar size={14} className="flex-shrink-0" />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:justify-end text-sm text-foreground/60 dark:text-pastel-light-gray/60">
                          <MapPin size={14} className="flex-shrink-0" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="my-7">
                      <div className="h-px bg-black/10 dark:bg-white/10 w-full" />
                    </div>

                    {/* Description */}
                    <p className="text-sm italic text-foreground/55 dark:text-pastel-light-gray/55 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </Tilt>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  );
};

export default Education;
