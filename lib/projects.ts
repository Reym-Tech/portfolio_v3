// John Remy: the gallery's content source. Sanity is the primary wall; when the CMS
// isn't configured yet (or a fetch fails), we fall back to these starter entries so the
// site never shows an empty room. Keep descriptions about the craft, never fake metrics.

import {
  allProjectsQuery,
  featuredProjectsQuery,
  isSanityConfigured,
  projectBySlugQuery,
  sanityFetch,
  urlForImage,
} from '@/lib/sanity';

import type { Project, SanityImage } from '@/lib/types';
import type { PortableTextBlock } from '@portabletext/react';

export type { Project } from '@/lib/types';

// The static seed mirrors the Sanity `project` schema, with prose as plain paragraphs.
interface StaticProject {
  slug: string;
  title: string;
  role: string;
  year: string;
  summary: string;
  description: string[];
  tags: string[];
  coverImage?: string;
  liveUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
}

interface SanityProjectRaw {
  slug: string;
  title: string;
  role: string;
  year: string;
  summary: string;
  tags?: string[];
  featured?: boolean;
  coverImage?: SanityImage | null;
  liveUrl?: string;
  sourceUrl?: string;
  body?: PortableTextBlock[];
}

const STATIC_PROJECTS: StaticProject[] = [
  {
    slug: 'AYO',
    title: 'AYO',
    role: 'Full Stack Developer',
    year: '2026',
    summary: 'Connecting homeowners with verified local handymen, on demand.',
    description: [
      'AYO is an on-demand home services mobile app built with Flutter and Supabase, connecting homeowners with verified local handymen for repair and maintenance needs. I designed and developed the application, implementing three role-based user flows — Customer, Professional, and Admin — with features including real-time Google Maps location tracking, GPS-based service area pinning, end-to-end service request and booking workflows, professional verification, avatar upload, and a clean architecture pattern separating domain, data, and presentation layers across the entire codebase.',
    ],
    tags: ['Flutter', 'Dart', 'TypeScript', 'Supabase', 'Google Maps API', 'REST API', 'Clean Architecture'],
    featured: true,
  },
  {
    slug: 'brewtrack',
    title: 'BrewTrack',
    role: 'Full Stack Developer',
    year: '2026',
    summary: 'Developed a web-based POS and inventory management platform for Hit Notes Café with integrated sales monitoring and analytics.',
    description: [
      'BrewTrack is a web-based Point-of-Sale (POS) and inventory management system developed to help Hit Notes Café efficiently manage their daily operations. The platform enables staff to process customer transactions, maintain accurate inventory records, and track product availability in real time. It also provides a centralized dashboard with sales reports and basic analytics, allowing café owners and managers to monitor business performance, identify sales trends, and make informed operational decisions. By integrating sales tracking and inventory management into a single system, BrewTrack improves workflow efficiency, reduces manual record-keeping, and supports better inventory control.',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Supabase', 'REST API', 'WebSocket'],
  },
  {
    slug: 'gonzales-portfolio',
    title: 'Gonzales Portfolio',
    role: 'Design & Development',
    year: '2026',
    summary: 'A personal digital space built on restraint — type, motion, and negative space doing the work.',
    description: [
      'A portfolio conceived as a single, deliberate statement rather than a list of features. Every token traces back to a design constitution; every transition shares one easing curve.',
      'Built with Next.js server components by default, a custom motion language, and an accessibility floor that treats reduced-motion and keyboard visitors as first-class.',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    liveUrl: '/',
    featured: true,
  },
  {
    slug: 'ancient-crafts',
    title: 'Ancient Crafts',
    role: 'Full Stack Developer',
    year: '2025',
    summary: 'Developed a full-stack e-commerce app that promotes indigenous craftsmanship by enabling online discovery and purchase of locally made products.',
    description: [
      'Developed a full-stack e-commerce mobile application featuring product catalog management, shopping cart functionality, user authentication, and checkout processing. The platform was designed as a marketplace for indigenous crafts from Davao del Sur, enabling artisans to showcase and sell their products through a mobile-first experience. The project involved both front-end and back-end development, focusing on creating a scalable, user-friendly, and efficient digital commerce solution.',
    ],
    tags: ['XML', 'Java', 'Firebase', 'PayMongo'],
    liveUrl: '/',
    featured: true,
  },
];

// Sanity rich text is Portable Text; the static seed stores prose as paragraph strings.
// Wrap each paragraph in a minimal block so the detail page renders both sources the same.
function paragraphsToBlocks(paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map((text, index) => ({
    _type: 'block',
    _key: `p${index}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `s${index}`, text, marks: [] }],
  })) as unknown as PortableTextBlock[];
}

function mapStaticProject(project: StaticProject): Project {
  const { description, ...rest } = project;
  return { ...rest, body: paragraphsToBlocks(description) };
}

function mapSanityProject(raw: SanityProjectRaw): Project {
  return {
    slug: raw.slug,
    title: raw.title,
    role: raw.role,
    year: raw.year,
    summary: raw.summary,
    tags: raw.tags ?? [],
    featured: raw.featured,
    liveUrl: raw.liveUrl,
    sourceUrl: raw.sourceUrl,
    coverImage: raw.coverImage ? urlForImage(raw.coverImage).width(1600).url() : undefined,
    body: raw.body ?? [],
  };
}

export async function getAllProjects(): Promise<Project[]> {
  if (isSanityConfigured) {
    try {
      const raw = await sanityFetch<SanityProjectRaw[]>({ query: allProjectsQuery });
      if (raw.length > 0) return raw.map(mapSanityProject);
    } catch (error) {
      console.error('Sanity unavailable, using static projects:', error);
    }
  }
  return STATIC_PROJECTS.map(mapStaticProject);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (isSanityConfigured) {
    try {
      const raw = await sanityFetch<SanityProjectRaw[]>({ query: featuredProjectsQuery });
      if (raw.length > 0) return raw.map(mapSanityProject);
    } catch (error) {
      console.error('Sanity unavailable, using static projects:', error);
    }
  }
  return STATIC_PROJECTS.filter((project) => project.featured).map(mapStaticProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (isSanityConfigured) {
    try {
      const raw = await sanityFetch<SanityProjectRaw | null>({
        query: projectBySlugQuery,
        params: { slug },
      });
      if (raw) return mapSanityProject(raw);
    } catch (error) {
      console.error('Sanity unavailable, using static projects:', error);
    }
  }
  const fallback = STATIC_PROJECTS.find((project) => project.slug === slug);
  return fallback ? mapStaticProject(fallback) : undefined;
}
