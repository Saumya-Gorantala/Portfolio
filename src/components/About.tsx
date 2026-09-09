import React from 'react';
import { BarChart3, Code2, Lightbulb, PenTool } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { FadeIn, SlideIn } from './animations';

const About: React.FC = () => {
  const capabilityCards = [
    {
      title: 'Data Analysis',
      description: 'Turning data into insights to drive better decisions.',
      icon: BarChart3,
    },
    {
      title: 'Full Stack Dev',
      description: 'Building scalable web applications end-to-end.',
      icon: Code2,
    },
    {
      title: 'UX Design',
      description: 'Designing intuitive experiences that users love.',
      icon: PenTool,
    },
    {
      title: 'Problem Solving',
      description: 'Curious mind who loves solving real-world problems.',
      icon: Lightbulb,
    },
  ];

  return (
    <section id="about-section" className="relative overflow-hidden section-padding section-surface">
      <div className="container-custom relative z-10">
        <div className="about-layout">
          <SlideIn direction="left">
            <FadeIn>
              <div className="about-left-column">
                <div>
                  <p className="label-caps mb-3">01 / ABOUT</p>
                  <h2 className="about-title heading-display xl:whitespace-nowrap">
                    A little about me
                  </h2>
                  <span className="section-header-line" />
                  <p className="about-copy mt-6 text-cream-muted">
                    I&apos;m passionate about the intersection of data, design, and technology. With a background in Computer Science and hands-on experience in data analytics, full-stack development, and UX design, I love turning ideas into impactful solutions.
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/in/saumya-gorantala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-semibold text-[#C51F46] transition-colors hover:text-[#E14A64]"
                >
                  Read more about me <span aria-hidden="true">→</span>
                </a>
              </div>
            </FadeIn>
          </SlideIn>

          <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 xl:contents">
            {capabilityCards.map((card) => {
              const Icon = card.icon;
              const displayTitle = card.title === 'Problem Solving' ? 'Problem Solver' : card.title;
              return (
                <SlideIn direction="right" key={card.title}>
                  <Tilt
                    tiltMaxAngleX={4}
                    tiltMaxAngleY={4}
                    scale={1.01}
                    transitionSpeed={500}
                    glareEnable={false}
                    className="h-full"
                  >
                    <article className="glass-card interactive-card about-card h-full">
                      <div className="about-card-icon flex items-center justify-center border border-[rgba(197,31,70,0.3)] bg-[rgba(128,0,32,0.1)] text-[#E14A64]">
                        <Icon size={32} />
                      </div>
                      <h3 className="about-card-title">{displayTitle}</h3>
                      <p className="about-card-description">{card.description}</p>
                    </article>
                  </Tilt>
                </SlideIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
