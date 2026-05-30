import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';
import { ProjectGrid } from '@/components/work/ProjectGrid';

export const metadata: Metadata = {
  title: 'Selected Works',
  description: 'Selected works and projects by John Remy C. Gonzales.',
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pt-32 pb-24 md:px-8">
      <header className="max-w-xl">
        <h1 className="font-display text-3xl font-light tracking-tight text-ink">
          Selected Works
        </h1>
        <p className="mt-6 font-body text-lg text-ink/70">
          A considered few — each hung with the same care a gallerist gives a
          painting.
        </p>
      </header>

      <div className="mt-16">
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
