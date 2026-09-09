import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { FadeIn } from './animations';
import SectionTitle from './SectionTitle';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative overflow-hidden section-padding section-canvas">
      <div className="container-custom relative z-10">
        <SectionTitle title="Let's Work Together" subtitle="06 / CONTACT" alignment="left" />
        <FadeIn>
          <div className="relative overflow-hidden rounded-[22px] border border-[rgba(197,31,70,0.28)] bg-[linear-gradient(135deg,#5C0018_0%,#800020_100%)] px-6 py-8 md:px-8 md:py-9 lg:px-10 lg:py-10">
            <div
              className="pointer-events-none absolute right-[-90px] top-[20%] h-56 w-56 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(229,43,80,0.26) 0%, transparent 70%)' }}
              aria-hidden="true"
            />
            <svg
              viewBox="0 0 1200 520"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.2]"
              aria-hidden="true"
            >
              <path d="M50 390C230 230 430 220 590 290C760 366 960 362 1140 220" fill="none" stroke="rgba(247,243,240,0.16)" strokeWidth="1.1" />
              <path d="M80 438C280 268 468 268 636 338C804 408 992 404 1168 300" fill="none" stroke="rgba(247,243,240,0.1)" strokeWidth="0.9" />
            </svg>
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <span className="absolute left-[16%] top-[24%] h-[2px] w-[2px] rounded-full bg-[#F7F3F0]/40" />
              <span className="absolute left-[24%] top-[68%] h-[1.5px] w-[1.5px] rounded-full bg-[#F7F3F0]/30" />
              <span className="absolute right-[26%] top-[30%] h-[2px] w-[2px] rounded-full bg-[#F7F3F0]/34" />
              <span className="absolute right-[14%] top-[66%] h-[1.5px] w-[1.5px] rounded-full bg-[#F7F3F0]/28" />
            </div>

            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#f3c8d3]">
                    LET&apos;S WORK TOGETHER
                  </p>
                  <h2 className="heading-display mb-3 max-w-[560px] text-[30px] leading-[1.08] text-[#F7F3F0] md:text-[36px] lg:text-[42px]">
                    Let&apos;s build something great together.
                  </h2>
                  <p className="max-w-[560px] text-[14px] leading-relaxed text-[#f5d7df]">
                    I&apos;m always open to discussing new projects, opportunities, collaborations, or interesting ideas.
                  </p>
                </div>
              </div>

              <a
                href="mailto:saumya.gg6@gmail.com"
                className="group inline-flex items-center justify-center gap-2 self-start rounded-[14px] border border-white/50 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-[#800020] lg:self-center"
              >
                Get in Touch
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Contact;
