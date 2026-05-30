import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PortableContent } from '@/components/shared/PortableContent';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Not Found' };

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <article className="mx-auto w-full max-w-4xl px-6 pt-32 pb-24 md:px-8">
      <Link
        href="/work"
        className="font-body text-sm text-ink/60 transition-colors duration-300 hover:text-primary"
      >
        ← Selected Works
      </Link>

      <header className="mt-10">
        <p className="font-mono text-sm tracking-[0.15em] text-ink/60">
          {project.role.toUpperCase()} · {project.year}
        </p>
        <h1 className="mt-4 font-display text-3xl font-light tracking-tight text-ink">
          {project.title}
        </h1>
      </header>

      <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-md border border-ink/10 bg-surface-muted">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={`${project.title} cover`}
            fill
            priority
            sizes="(min-width: 896px) 896px, 100vw"
            className="object-cover [filter:contrast(1.02)_brightness(0.98)]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,theme(colors.surface),theme(colors.surface-muted))]">
            <span
              aria-hidden
              className="font-display text-3xl font-light text-ink/15"
            >
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-12 max-w-2xl">
        <PortableContent value={project.body} />
      </div>

      <ul className="mt-10 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-sm bg-surface-muted px-2.5 py-1 font-mono text-sm text-ink/60"
          >
            {tag}
          </li>
        ))}
      </ul>

      {(project.liveUrl || project.sourceUrl) && (
        <div className="mt-12 flex flex-wrap items-center gap-8">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="group inline-flex items-center gap-3 font-body text-base text-primary transition-colors duration-300 hover:text-primary/80"
            >
              Visit
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              className="font-body text-base text-ink/70 transition-colors duration-300 hover:text-ink"
            >
              Source
            </a>
          )}
        </div>
      )}
    </article>
  );
}
