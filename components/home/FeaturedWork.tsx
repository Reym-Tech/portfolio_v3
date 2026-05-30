import Link from 'next/link';

import { ProjectGrid } from '@/components/work/ProjectGrid';
import { getFeaturedProjects } from '@/lib/projects';

// John Remy: the visitor meets the work moments after meeting the name — a curated
// few, then a quiet door to the rest. Show, don't tell.
export async function FeaturedWork() {
  const projects = await getFeaturedProjects();
  if (projects.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-32 md:px-8">
      <div className="mb-16 flex items-end justify-between gap-8">
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
          Selected Works
        </h2>
        <Link
          href="/work"
          className="shrink-0 font-body text-sm text-ink/60 transition-colors duration-300 hover:text-primary"
        >
          View all
        </Link>
      </div>

      <ProjectGrid projects={projects} />
    </section>
  );
}
