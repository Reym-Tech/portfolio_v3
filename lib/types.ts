import type { PortableTextBlock } from '@portabletext/react';

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
}

// The unified project shape every component consumes, regardless of whether the
// content came from Sanity or the static fallback in lib/projects.ts.
export interface Project {
  slug: string;
  title: string;
  role: string;
  year: string;
  /** One restrained line shown on the card. */
  summary: string;
  /** Rich case-study content shown on the detail page. */
  body: PortableTextBlock[];
  tags: string[];
  /** Resolved URL (Sanity image or public path). Omit to render the typographic cover. */
  coverImage?: string;
  liveUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
}
