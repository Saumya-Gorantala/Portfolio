
import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import SectionTitle from './SectionTitle';
import { FadeIn, StaggerItem, Stagger } from './animations';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      category: "Languages / Databases",
      skills: ["Python", "Java", "SQL (MySQL, Oracle SQL)", "NoSQL (MongoDB)"]
    },
    {
      category: "Web Development",
      skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "NodeJS", "ReactJS", "Express", "Vite", "TypeScript"]
    },
    {
      category: "Design and Tools",
      skills: ["UI/UX Design", "Figma", "Adobe XD", "User Research", "Usability Testing", "Visual Design", "Interaction Design", "Wireframing", "Prototyping"]
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
    <section id="skills" className="section-padding bg-pastel-light-pink/50 dark:bg-pastel-charcoal/30">
      <div className="container-custom">
        <FadeIn>
          <SectionTitle
            title="Technical Skills"
            subtitle="My Expertise"
          />
        </FadeIn>

        <Stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <StaggerItem key={index}>
                <Tilt
                  tiltMaxAngleX={6}
                  tiltMaxAngleY={6}
                  scale={1.02}
                  transitionSpeed={500}
                  glareEnable={false}
                  className="h-full"
                >
                  <div className="glass-card hover-card p-8 h-full cursor-default">
                    <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          whileHover={{ scale: 1.08, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                          className="px-3 py-1 bg-pastel-pink/20 text-primary-foreground/90 rounded-full text-sm
                            dark:bg-pastel-burgundy/30 dark:text-pastel-light-gray cursor-default
                            hover:bg-pastel-pink/35 dark:hover:bg-pastel-burgundy/50 transition-colors"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
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

export default Skills;
