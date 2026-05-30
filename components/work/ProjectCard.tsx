import Image from 'next/image';
import Link from 'next/link';

import type { Project } from '@/lib/projects';

// John Remy: one painting, framed. The cover holds a 4:3 image when you have one, and
// an elegant typographic plate when you don't — never a broken frame (DESIGN.md §6, §7).
// The accent appears in exactly one place per card: the underline that grows under the title.
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block"
      aria-label={`${project.title} — ${project.role}, ${project.year}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-ink/10 bg-surface-muted">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={`${project.title} cover`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover [filter:contrast(1.02)_brightness(0.98)] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,theme(colors.surface),theme(colors.surface-muted))]">
            <span
              aria-hidden
              className="font-display text-3xl font-light text-ink/15 transition-transform duration-700 ease-out group-hover:scale-105"
            >
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-5">
        <h3 className="font-display text-xl font-medium tracking-tight text-ink">
          <span className="relative inline-block">
            {project.title}
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full"
            />
          </span>
        </h3>

        <p className="mt-2 font-body text-base text-ink/70">
          {project.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-sm bg-surface-muted px-2.5 py-1 font-mono text-sm text-ink/60"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
