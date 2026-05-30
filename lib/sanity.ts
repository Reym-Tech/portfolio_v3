import { createImageUrlBuilder } from '@sanity/image-url';
import { createClient, groq } from 'next-sanity';

import type { SanityImage } from '@/lib/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

// A real Sanity project id is lowercase alphanumerics and dashes. The starter
// .env.local ships an invalid placeholder ("your_project_id") that would crash
// createClient, so we detect a usable id and otherwise fall back to static content.
export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId);

export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false })
  : null;

const builder = client ? createImageUrlBuilder(client) : null;

export function urlForImage(source: SanityImage) {
  if (!builder) {
    throw new Error('urlForImage requires a configured Sanity client');
  }
  return builder.image(source).auto('format').fit('max');
}

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 3600,
}: {
  query: string;
  params?: Record<string, unknown>;
  revalidate?: number;
}): Promise<T> {
  if (!client) {
    throw new Error('sanityFetch requires a configured Sanity client');
  }
  return client.fetch<T>(query, params, { next: { revalidate } });
}

const projectCardFields = groq`
  "slug": slug.current,
  title,
  role,
  year,
  summary,
  tags,
  featured,
  coverImage,
  liveUrl,
  sourceUrl,
  order
`;

const projectOrdering = groq`order(coalesce(order, 9999) asc, year desc)`;

export const allProjectsQuery = groq`
  *[_type == "project"] | ${projectOrdering} {
    ${projectCardFields}
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | ${projectOrdering} {
    ${projectCardFields}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectCardFields},
    body
  }
`;
