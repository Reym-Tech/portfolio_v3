import { PortableText } from '@portabletext/react';
import Image from 'next/image';

import { urlForImage } from '@/lib/sanity';

import type { SanityImage } from '@/lib/types';
import type { PortableTextBlock, PortableTextComponents } from '@portabletext/react';

interface PortableContentProps {
  value: PortableTextBlock[];
}

// John Remy: the case study reads like an essay, not a feature list. Type, leading, and
// negative space carry it; the accent appears only on links and a single quote rule.
const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => (
      <figure className="my-12 overflow-hidden rounded-md border border-ink/10">
        <Image
          src={urlForImage(value).width(1600).url()}
          alt={value.alt ?? ''}
          width={1600}
          height={1000}
          sizes="(min-width: 768px) 768px, 100vw"
          className="h-auto w-full object-cover [filter:contrast(1.02)_brightness(0.98)]"
        />
      </figure>
    ),
  },
  block: {
    normal: ({ children }) => (
      <p className="mb-6 font-body text-lg leading-relaxed text-ink/70">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-12 font-display text-2xl font-medium tracking-tight text-ink">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-display text-xl font-medium tracking-tight text-ink">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-primary pl-6 font-display text-xl font-light italic text-ink/70">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4 transition-colors duration-300 hover:text-primary/80"
      >
        {children}
      </a>
    ),
  },
};

export function PortableContent({ value }: PortableContentProps) {
  return <PortableText value={value} components={components} />;
}
