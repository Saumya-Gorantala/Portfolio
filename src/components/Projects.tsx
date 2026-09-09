import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import SectionTitle from './SectionTitle';
import ProjectFlipModal from './ProjectFlipModal';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

interface ProjectLink {
  label: string;
  url: string;
  icon?: 'external' | 'github' | 'figma';
}

type Project = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  detailedDescription: string;
  tags: string[];
  link?: string;
  image?: string;
  links: ProjectLink[];
};

const projects: Project[] = [
  {
    title: 'Property Management System',
    shortDescription: 'Full-stack property & payment management',
    fullDescription:
      'Implemented a normalized SQL Server database with stored procedures, triggers, and user-defined functions (UDFs) to manage properties, tenants, leases, maintenance, requests, and payments, eliminating data redundancy through structured ER design.',
    detailedDescription:
      'A comprehensive property management system developed with SQL Server and Node.js. Implemented a normalized SQL Server database with stored procedures, triggers, and UDFs to manage properties, tenants, leases, maintenance, requests, and payments, eliminating data redundancy through structured ER design. Developed RESTful APIs using Node.js and Express to support complex CRUD operations, automate workflows, and enable real-time analytics across a fully integrated full-stack system, reducing manual data handling and improving overall system responsiveness.',
    tags: ['SQL Server', 'Azure Data Studio', 'Node.js', 'React', 'Express.js', 'Database Design'],
    link: 'https://github.com/Saumya-Gorantala/property-tenant-management-system',
    image: 'https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/Property_Management_System.jpg',
    links: [
      { label: 'View Project', url: 'https://github.com/Saumya-Gorantala/property-tenant-management-system', icon: 'github' },
    ],
  },
  {
    title: 'Job Tracker',
    shortDescription: 'Application management with workflows',
    fullDescription:
      'Built a full-cycle job application tracking app using React and TypeScript, featuring Kanban workflows and analytics dashboards, to centralize and streamline the entire job search process in one interface, improving organization and visibility across multiple applications.',
    detailedDescription:
      'Built a full-cycle job application tracking app using React and TypeScript, featuring Kanban workflows and analytics dashboards, to centralize and streamline the entire job search process in one interface, improving organization and visibility across multiple applications. Integrated robust reminder systems and calendar features to track job application deadlines, interview schedules, and post-interview follow-ups, ensuring timely action at every stage of the job search process, and preventing any critical steps from being missed.',
    tags: ['React', 'TypeScript', 'Vite', 'Analytics', 'Redux', 'Chart.js'],
    link: 'https://saumya-gorantala.github.io/Job-Tracker/',
    image: 'https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/JobTracker.jpg',
    links: [
      { label: 'View Project', url: 'https://saumya-gorantala.github.io/Job-Tracker/', icon: 'external' },
      { label: 'GitHub Repository', url: 'https://github.com/Saumya-Gorantala/Job-Tracker', icon: 'github' },
    ],
  },
  {
    title: 'LingoQuest',
    shortDescription: 'Gamified scenario-based language practice',
    fullDescription:
      'Designed a scenario-based language learning app in Figma using interactive storytelling and gamification mechanics to improve practical communication skills through real-world context, resulting in a more intuitive and motivating learning experience.',
    detailedDescription:
      'Designed a scenario-based language learning app in Figma using interactive storytelling and gamification mechanics to improve practical communication skills through real-world context, resulting in a more intuitive and motivating learning experience. Conducted end-to-end UX research, including usability testing, JTBD framework analysis, and SUS scoring, iterating on high-fidelity prototypes to refine navigation, clarify key user flows, feedback loops, and enhance progress tracking.',
    tags: ['Figma', 'UX Research', 'Usability Testing', 'Prototyping', 'User Interviews', 'Interaction Design'],
    link: 'https://www.figma.com/proto/LTgKvSJoccEZV5QGa9tPUF/LanguageLearningApp_SaumyaG?node-id=1-2&t=093xczAFn5jGGhkB-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1',
    image: 'https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/LingoQuest.jpg',
    links: [
      { label: 'View High-Fidelity Prototype', url: 'https://www.figma.com/proto/LTgKvSJoccEZV5QGa9tPUF/LanguageLearningApp_SaumyaG?node-id=1-2&t=093xczAFn5jGGhkB-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1', icon: 'figma' },
      { label: 'View on Behance', url: 'https://www.behance.net/saumyagorantala6', icon: 'external' },
    ],
  },
  {
    title: 'AptEase',
    shortDescription: 'Rental and roommate-matching platform',
    fullDescription:
      'Created a comprehensive rental and roommate-matching app in Figma, leveraging user personas, empathy maps, and end-to-end journey flows, simplifying the apartment search process and improving compatibility matching between potential roommates.',
    detailedDescription:
      'Created a comprehensive rental and roommate-matching app in Figma, leveraging user personas, empathy maps, and end-to-end journey flows, simplifying the apartment search process and improving compatibility matching between potential roommates. Delivered high-fidelity interactive wireframes and clickable prototypes, resulting in improved design coherence and a more intuitive, seamless experience across the full user journey from onboarding to final roommate selection.',
    tags: ['Figma', 'Behance', 'UX Strategy', 'Wireframing', 'Personas', 'Journey Mapping'],
    link: 'https://www.behance.net/saumyagorantala6',
    image: 'https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/AptEase.png',
    links: [
      { label: 'View on Behance', url: 'https://www.behance.net/saumyagorantala6', icon: 'external' },
      { label: 'View Design System', url: 'https://www.behance.net/saumyagorantala6', icon: 'figma' },
    ],
  },
  {
    title: 'Bakle',
    shortDescription: 'Mobile ordering interface design',
    fullDescription:
      'Mobile ordering interface designed for streamlined product browsing and optimized checkout experience. Prioritized navigation efficiency and visual design coherence to create a seamless user flow from product discovery to transaction completion.',
    detailedDescription:
      'Bakle is a meticulously designed mobile ordering platform that simplifies the bakery product purchase journey. The interface prioritizes intuitive product discovery through category navigation and search functionality, with high-quality product imagery and detailed descriptions. The checkout experience is optimized for mobile usage with one-touch payments, address autofill, and delivery scheduling. Special attention was paid to visual hierarchy and brand consistency throughout the user flow. The design system ensures scalability for future feature expansion while maintaining design coherence across all screens.',
    tags: ['Figma', 'Behance', 'UI Design', 'Prototyping', 'Mobile Design', 'Visual Design'],
    link: 'https://www.behance.net/saumyagorantala6',
    image: 'https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/Bakle.png',
    links: [
      { label: 'View on Behance', url: 'https://www.behance.net/saumyagorantala6', icon: 'external' },
      { label: 'View Design Prototype', url: 'https://www.behance.net/saumyagorantala6', icon: 'figma' },
    ],
  },
];

const Projects: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const dragStartX = useRef<number | null>(null);
  const didDrag = useRef(false);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeProject = openModalIndex !== null ? projects[openModalIndex] : null;

  const openProject = (index: number) => {
    if (didDrag.current) return;
    const rect = cardRefs.current[index]?.getBoundingClientRect() ?? null;
    setOriginRect(rect);
    setOpenModalIndex(index);
  };

  return (
    <section id="projects" className="relative overflow-hidden section-padding section-surface">
      <div
        className="pointer-events-none absolute left-1/2 top-[46%] z-[1] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(128,0,32,0.14) 0%, transparent 72%)' }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          title="Selected Work"
          subtitle="03 / PROJECTS"
          alignment="left"
          action={(
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous projects"
                onClick={() => api?.scrollPrev()}
                className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/10 bg-[rgba(17,18,24,0.85)] text-[#C51F46] transition-all duration-200 hover:border-[rgba(197,31,70,0.45)] hover:bg-[#800020] hover:text-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next projects"
                onClick={() => api?.scrollNext()}
                className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/10 bg-[rgba(17,18,24,0.85)] text-[#C51F46] transition-all duration-200 hover:border-[rgba(197,31,70,0.45)] hover:bg-[#800020] hover:text-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        />

        <Carousel setApi={setApi} opts={{ align: 'start', loop: true }} className="w-full">
          <CarouselContent className="-ml-5">
            {projects.map((project, index) => (
              <CarouselItem key={project.title} className="basis-full pl-5 md:basis-1/2 lg:basis-1/3">
                <article className="group relative h-full">
                  <Tilt
                    tiltMaxAngleX={4}
                    tiltMaxAngleY={4}
                    scale={1.01}
                    transitionSpeed={500}
                    glareEnable={false}
                    className="h-full"
                  >
                    <button
                      ref={(el) => { cardRefs.current[index] = el; }}
                      type="button"
                      className="glass-card interactive-card relative flex h-full min-h-[430px] w-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] text-left"
                      onPointerDown={(event) => {
                        dragStartX.current = event.clientX;
                        didDrag.current = false;
                      }}
                      onPointerMove={(event) => {
                        if (dragStartX.current === null) return;
                        if (Math.abs(event.clientX - dragStartX.current) > 8) didDrag.current = true;
                      }}
                      onPointerUp={() => {
                        dragStartX.current = null;
                      }}
                      onClick={() => openProject(index)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          openProject(index);
                        }
                      }}
                    >
                      <div className="relative h-[220px] w-full overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="absolute inset-x-0 bottom-4 text-center text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          Click to explore
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <div className="mb-3 flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-[rgba(197,31,70,0.38)] bg-[rgba(128,0,32,0.16)] px-2.5 py-1 text-[11px] font-medium tracking-wide text-[#d68da0]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="mb-2 text-[21px] font-semibold leading-tight text-white">{project.title}</h3>
                        <p className="line-clamp-2 text-sm leading-relaxed text-cream-muted">
                          {project.shortDescription}
                        </p>
                        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                          <span className="text-xs text-cream-dim">{project.tags.length} technologies</span>
                          <ExternalLink size={16} className="text-[#C51F46]" />
                        </div>
                      </div>
                    </button>
                  </Tilt>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

      </div>

      {activeProject && (
        <ProjectFlipModal
          isOpen={openModalIndex !== null}
          onClose={() => setOpenModalIndex(null)}
          originRect={originRect}
          project={{
            title: activeProject.title,
            shortDescription: activeProject.shortDescription,
            fullDescription: activeProject.fullDescription,
            detailedDescription: activeProject.detailedDescription,
            tags: activeProject.tags,
            link: activeProject.link ?? '#',
            image: activeProject.image ?? '',
            links: activeProject.links,
          }}
        />
      )}
    </section>
  );
};

export default Projects;
