import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { FadeIn } from './animations';
import CircularGallery from './CircularGallery';
import ProjectFlipModal from './ProjectFlipModal';
import SectionStars from './SectionStars';

interface ProjectLink {
  label: string;
  url: string;
  icon?: 'external' | 'github' | 'figma';
}

interface Project {
  title: string;
  shortDescription: string;
  fullDescription: string;
  detailedDescription: string;
  tags: string[];
  link?: string;
  image?: string;
  links: ProjectLink[];
}

const Projects: React.FC = () => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const projects: Project[] = [
    {
      title: "Property Management System",
      shortDescription: "Full-stack property & payment management",
      fullDescription: "Implemented a normalized SQL Server database with stored procedures, triggers, and user-defined functions (UDFs) to manage properties, tenants, leases, maintenance, requests, and payments, eliminating data redundancy through structured ER design.",
      detailedDescription: "A comprehensive property management system developed with SQL Server and Node.js. Implemented a normalized SQL Server database with stored procedures, triggers, and UDFs to manage properties, tenants, leases, maintenance, requests, and payments, eliminating data redundancy through structured ER design. Developed RESTful APIs using Node.js and Express to support complex CRUD operations, automate workflows, and enable real-time analytics across a fully integrated full-stack system, reducing manual data handling and improving overall system responsiveness.",
      tags: ["SQL Server", "Azure Data Studio", "Node.js", "React", "Express.js", "Database Design"],
      link: "https://github.com/Saumya-Gorantala/property-tenant-management-system",
      image: "https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/Property_Management_System.jpg",
      links: [
        { label: "View Project", url: "https://github.com/Saumya-Gorantala/property-tenant-management-system", icon: "github" },
      ]
    },
    {
      title: "Job Tracker",
      shortDescription: "Application management with workflows",
      fullDescription: "Built a full-cycle job application tracking app using React and TypeScript, featuring Kanban workflows and analytics dashboards, to centralize and streamline the entire job search process in one interface, improving organization and visibility across multiple applications.",
      detailedDescription: "Built a full-cycle job application tracking app using React and TypeScript, featuring Kanban workflows and analytics dashboards, to centralize and streamline the entire job search process in one interface, improving organization and visibility across multiple applications. Integrated robust reminder systems and calendar features to track job application deadlines, interview schedules, and post-interview follow-ups, ensuring timely action at every stage of the job search process, and preventing any critical steps from being missed.",
      tags: ["React", "TypeScript", "Vite", "Analytics", "Redux", "Chart.js"],
      link: "https://saumya-gorantala.github.io/Job-Tracker/",
      image: "https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/JobTracker.jpg",
      links: [
        { label: "View Project", url: "https://saumya-gorantala.github.io/Job-Tracker/", icon: "external" },
        { label: "GitHub Repository", url: "https://github.com/Saumya-Gorantala/Job-Tracker", icon: "github" }
      ]
    },
    {
      title: "LingoQuest",
      shortDescription: "Gamified scenario-based language practice",
      fullDescription: "Designed a scenario-based language learning app in Figma using interactive storytelling and gamification mechanics to improve practical communication skills through real-world context, resulting in a more intuitive and motivating learning experience.",
      detailedDescription: "Designed a scenario-based language learning app in Figma using interactive storytelling and gamification mechanics to improve practical communication skills through real-world context, resulting in a more intuitive and motivating learning experience. Conducted end-to-end UX research, including usability testing, JTBD framework analysis, and SUS scoring, iterating on high-fidelity prototypes to refine navigation, clarify key user flows, feedback loops, and enhance progress tracking.",
      tags: ["Figma", "UX Research", "Usability Testing", "Prototyping", "User Interviews", "Interaction Design"],
      link: "https://www.figma.com/proto/LTgKvSJoccEZV5QGa9tPUF/LanguageLearningApp_SaumyaG?node-id=1-2&t=093xczAFn5jGGhkB-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1",
      image: "https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/LingoQuest.jpg",
      links: [
        { label: "View High-Fidelity Prototype", url: "https://www.figma.com/proto/LTgKvSJoccEZV5QGa9tPUF/LanguageLearningApp_SaumyaG?node-id=1-2&t=093xczAFn5jGGhkB-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1", icon: "figma" },
        { label: "View on Behance", url: "https://www.behance.net/saumyagorantala6", icon: "external" }
      ]
    },
    {
      title: "AptEase",
      shortDescription: "Rental and roommate-matching platform",
      fullDescription: "Created a comprehensive rental and roommate-matching app in Figma, leveraging user personas, empathy maps, and end-to-end journey flows, simplifying the apartment search process and improving compatibility matching between potential roommates.",
      detailedDescription: "Created a comprehensive rental and roommate-matching app in Figma, leveraging user personas, empathy maps, and end-to-end journey flows, simplifying the apartment search process and improving compatibility matching between potential roommates. Delivered high-fidelity interactive wireframes and clickable prototypes, resulting in improved design coherence and a more intuitive, seamless experience across the full user journey from onboarding to final roommate selection.",
      tags: ["Figma", "Behance", "UX Strategy", "Wireframing", "Personas", "Journey Mapping"],
      link: "https://www.behance.net/saumyagorantala6",
      image: "https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/AptEase.png",
      links: [
        { label: "View on Behance", url: "https://www.behance.net/saumyagorantala6", icon: "external" },
        { label: "View Design System", url: "https://www.behance.net/saumyagorantala6", icon: "figma" }
      ]
    },
    {
      title: "Bakle",
      shortDescription: "Mobile ordering interface design",
      fullDescription: "Mobile ordering interface designed for streamlined product browsing and optimized checkout experience. Prioritized navigation efficiency and visual design coherence to create a seamless user flow from product discovery to transaction completion.",
      detailedDescription: "Bakle is a meticulously designed mobile ordering platform that simplifies the bakery product purchase journey. The interface prioritizes intuitive product discovery through category navigation and search functionality, with high-quality product imagery and detailed descriptions. The checkout experience is optimized for mobile usage with one-touch payments, address autofill, and delivery scheduling. Special attention was paid to visual hierarchy and brand consistency throughout the user flow. The design system ensures scalability for future feature expansion while maintaining design coherence across all screens.",
      tags: ["Figma", "Behance", "UI Design", "Prototyping", "Mobile Design", "Visual Design"],
      link: "https://www.behance.net/saumyagorantala6",
      image: "https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Images/Bakle.png",
      links: [
        { label: "View on Behance", url: "https://www.behance.net/saumyagorantala6", icon: "external" },
        { label: "View Design Prototype", url: "https://www.behance.net/saumyagorantala6", icon: "figma" }
      ]
    }
  ];

  const galleryItems = projects.map(p => ({
    image: p.image ?? '',
    text: p.title,
  }));

  const openProject = projects[openModalIndex!] ?? null;

  return (
    <section id="projects" className="relative overflow-hidden section-padding bg-pastel-off-white/60 dark:bg-pastel-darker-gray/30">
      <SectionStars />
      <div className="relative z-10 container-custom">
        <FadeIn>
          <SectionTitle
            title="Projects"
            subtitle="My Work"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <CircularGallery
            items={galleryItems}
            bend={0.5}
            textColor="#ffffff"
            font="bold 26px DM Sans"
            onItemClick={(index) => setOpenModalIndex(index)}
          />
        </FadeIn>
      </div>

      {/* Modal rendered outside container so fixed positioning is viewport-relative */}
      {openProject && (
        <ProjectFlipModal
          isOpen={openModalIndex !== null}
          onClose={() => setOpenModalIndex(null)}
          project={{
            title: openProject.title,
            shortDescription: openProject.shortDescription,
            fullDescription: openProject.fullDescription,
            detailedDescription: openProject.detailedDescription,
            tags: openProject.tags,
            link: openProject.link ?? '#',
            image: openProject.image ?? '',
            links: openProject.links,
          }}
        />
      )}
    </section>
  );
};

export default Projects;
