'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import type { Project } from '@/lib/projects';
import { ProjectCard } from './ProjectCard';

// John Remy: the gallery wall. Paintings settle in one after another as you arrive
// at them — never all at once (DESIGN.md §5). Card gaps are exactly gap-8 (§3).
export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 gap-8 md:grid-cols-2"
    >
      {projects.map((project) => (
        <motion.div key={project.slug} variants={fadeInUp}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
