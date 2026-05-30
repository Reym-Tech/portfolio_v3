import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 3600,
}: {
  query: string;
  params?: Record<string, unknown>;
  revalidate?: number;
}): Promise<T> {
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate },
    });
  } catch (error) {
    console.error('Sanity fetch error:', error);
    throw error;
  }
}
