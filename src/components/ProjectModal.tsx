import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    shortDescription: string;
    fullDescription: string;
    tags: string[];
    image: string;
    link: string;
  };
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="pointer-events-auto relative w-[90%] md:w-[85%] lg:w-[75%] max-w-4xl max-h-[90vh] overflow-y-auto">
              <motion.div
                className="glass-card rounded-2xl overflow-hidden shadow-2xl"
                layoutId={`project-${project.title}`}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
                >
                  <X size={24} className="text-white dark:text-pastel-light-gray" />
                </button>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
                  {/* Image Section */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center justify-center"
                  >
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-pastel-pink/20 to-pastel-red/20 dark:from-pastel-burgundy/20 dark:to-pastel-burgundy/10 border border-white/20 dark:border-pastel-burgundy/30">
                      {project.image && project.image !== '/assets/default-project.jpg' ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23FFB6C1" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="24" font-family="system-ui"%3E' + project.title + '%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pastel-pink to-pastel-red dark:from-pastel-burgundy dark:to-pastel-burgundy/70">
                          <span className="text-white text-4xl font-bold">{project.title.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Text Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col justify-between"
                  >
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-4 dark:text-pastel-light-gray">
                        {project.title}
                      </h2>
                      <p className="text-sm font-medium text-pastel-burgundy dark:text-pastel-pink mb-6">
                        {project.shortDescription}
                      </p>
                      <p className="text-foreground/80 dark:text-pastel-light-gray/80 text-lg leading-relaxed mb-8">
                        {project.fullDescription}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h3 className="text-sm font-semibold text-foreground/60 dark:text-pastel-light-gray/60 mb-3 uppercase tracking-wider">
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            className="px-3 py-1.5 bg-pastel-pink/20 dark:bg-pastel-burgundy/30 text-foreground/70 dark:text-pastel-light-gray text-sm rounded-full border border-pastel-pink/30 dark:border-pastel-burgundy/40"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      {/* CTA Button */}
                      {project.link && project.link !== '#' && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pastel-pink to-pastel-red text-white rounded-lg font-semibold hover:opacity-90 transition-opacity dark:from-pastel-burgundy dark:to-pastel-burgundy/80"
                        >
                          View Full Project
                          <ExternalLink size={18} />
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
