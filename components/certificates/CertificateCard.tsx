'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Lightbox } from '@/components/shared/Lightbox';

// Neutral 1x1 blur seed — required by next/image when src is a string path. Kept as a
// shared constant so no card ships a hardcoded color of its own.
const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

/**
 * CertificateCard — a single credential rendered as an Elegant surface card.
 *
 * White card defined by a 1px neutral border (no resting shadow), a 4:3 cover image that
 * opens a {@link Lightbox} on click or Enter, the title underlined by a 2px primary rule,
 * and the issuer + date as quiet neutral-500 meta. Hover adds one shadow step; the scale
 * lift is suppressed under `prefers-reduced-motion` via the `motion-safe` variant.
 */
interface CertificateCardProps {
  /** Public path to the certificate image, e.g. `/images/certificates/placeholder-01.jpg`. */
  image: string;
  /** Certificate name, e.g. "Responsive Web Design". */
  title: string;
  /** Issuing organization, e.g. "freeCodeCamp". */
  issuer: string;
  /** Human-readable award date, e.g. "2024". */
  date: string;
}

export function CertificateCard({ image, title, issuer, date }: CertificateCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const alt = `${title} — certificate issued by ${issuer}`;

  return (
    <article className="overflow-hidden rounded-md border border-neutral-200 bg-surface transition duration-200 ease-out hover:shadow-md motion-safe:hover:scale-[1.01]">
      <button
        type="button"
        onClick={() => setIsLightboxOpen(true)}
        aria-label={`View ${title} certificate full size`}
        className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="rounded-t-md object-cover"
          />
        </div>
      </button>

      <div className="space-y-3 p-6">
        <div>
          <h3 className="font-display text-lg font-medium tracking-tight text-ink">
            {title}
          </h3>
          <span className="mt-2 block h-0.5 w-8 bg-primary" aria-hidden="true" />
        </div>
        <div className="space-y-1 font-body text-sm text-neutral-500">
          <p>{issuer}</p>
          <p>{date}</p>
        </div>
      </div>

      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={image}
        alt={alt}
      />
    </article>
  );
}
