import React from 'react';
import SectionTitle from './SectionTitle';
import { FadeIn } from './animations';
import MagicBento from './MagicBento';
import SectionStars from './SectionStars';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      category: "Languages / Databases",
      skills: ["Python", "Java", "SQL (MySQL, Oracle SQL)", "NoSQL (MongoDB)"]
    },
    {
      category: "Design and Tools",
      skills: ["UI/UX Design", "Figma", "Adobe XD", "Framer", "User Research", "Usability Testing", "Visual Design", "Interaction Design", "Wireframing", "Prototyping"]
    },
    {
      category: "Web Development",
      skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "NodeJS", "ReactJS", "Express", "Vite", "TypeScript"]
    },
    {
      category: "Tools and Frameworks",
      skills: ["Git", "GitHub", "Apache NetBeans", "VS Code", "MS Excel", "MS Word", "PowerPoint", "MS Office", "Azure Data Studio", "Linux"]
    },
    {
      category: "ERP & Reporting",
      skills: ["Oracle ERP Cloud", "FBDI", "BI Reporting Tools", "Tableau", "Data Analysis", "Data Visualization", "Business Process Analysis", "Dashboard Design"]
    }
  ];

  return (
    <section id="skills" className="relative section-padding bg-pastel-light-pink/50 dark:bg-pastel-charcoal/30 overflow-hidden">
      <SectionStars />
      <div className="relative z-10 container-custom">
        <FadeIn>
          <SectionTitle
            title="Technical Skills"
            subtitle="My Expertise"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <MagicBento
            skillCategories={skillCategories}
            textAutoHide={false}
            enableStars={true}
            particleCount={10}
            glowColor="172, 33, 42"
            clickEffect={true}
          />
        </FadeIn>
      </div>
    </section>
  );
};

export default Skills;
