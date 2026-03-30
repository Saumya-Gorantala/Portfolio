
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import ProjectFlipModal from './ProjectFlipModal';

interface ProjectLink {
  label: string;
  url: string;
  icon?: 'external' | 'github' | 'figma';
}

interface ProjectCardProps {
  title: string;
  shortDescription: string;
  fullDescription: string;
  detailedDescription: string;
  tags: string[];
  link?: string;
  image?: string;
  links: ProjectLink[];
  onCardClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  shortDescription,
  fullDescription,
  detailedDescription,
  tags,
  link,
  image,
  links,
  onCardClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
    onCardClick?.();
  };

  return (
    <>
      {/* Project Card */}
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={400} glareEnable={false} className="h-full">
      <motion.div
        layoutId={`project-${title}`}
        className="relative overflow-hidden rounded-xl h-full glass-card cursor-pointer group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleCardClick}
        whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(255, 182, 193, 0.15)' }}
        transition={{ duration: 0.3 }}
        style={{ minHeight: '400px' }}
      >
        {/* Image Section */}
        <div className="relative h-56 w-full overflow-hidden bg-white/10 dark:bg-black/10">
          {image && image !== '/assets/default-project.jpg' ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : null}
          {!image || image === '/assets/default-project.jpg' ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pastel-pink to-pastel-red dark:from-pastel-burgundy dark:to-pastel-burgundy/70 text-white text-4xl font-bold">
              {title.charAt(0)}
            </div>
          ) : null}

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="text-white font-semibold text-center px-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              Click to explore
            </motion.span>
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div className="p-6 h-full flex flex-col justify-between">
          <div>
            {/* Title */}
            <h3 className="text-2xl font-bold mb-3 dark:text-pastel-light-gray text-foreground">
              {title}
            </h3>

            {/* Short Description (5-6 words) */}
            <p className="text-sm font-medium text-pastel-burgundy dark:text-pastel-pink mb-4 leading-relaxed">
              {shortDescription}
            </p>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-2.5 py-1 bg-pastel-pink/20 hover:bg-pastel-pink/30 dark:bg-pastel-burgundy/30 dark:hover:bg-pastel-burgundy/40 text-foreground/70 dark:text-pastel-light-gray text-xs rounded-full border border-pastel-pink/30 dark:border-pastel-burgundy/40 transition-colors"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <motion.div
            className="mt-6 pt-4 border-t border-white/10 dark:border-pastel-burgundy/20 flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-xs text-foreground/50 dark:text-pastel-light-gray/50 font-medium">
              {tags.length} technologies
            </span>
            <ExternalLink
              size={18}
              className="text-pastel-pink dark:text-pastel-burgundy group-hover:translate-x-1 transition-transform"
            />
          </motion.div>
        </motion.div>
      </motion.div>
      </Tilt>

      {/* Modal */}
      <ProjectFlipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={{
          title,
          shortDescription,
          fullDescription,
          detailedDescription,
          tags,
          link: link || '#',
          image: image || '',
          links,
        }}
      />
    </>
  );
};

export default ProjectCard;

