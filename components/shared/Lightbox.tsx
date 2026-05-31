'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

/**
 * Lightbox — a minimal Elegant modal for viewing a single image full size.
 *
 * White surface, one close button, Esc to dismiss, backdrop click to dismiss. Focus
 * moves to the close button on open and returns to the trigger on close; Tab is trapped
 * to the close control (the only focusable element). Presence is instant, so nothing
 * animates against `prefers-reduced-motion`.
 */
interface LightboxProps {
  /** Whether the lightbox is visible. */
  isOpen: boolean;
  /** Called when the user dismisses via Esc, backdrop, or the close button. */
  onClose: () => void;
  /** Image source to display. */
  src: string;
  /** Accessible description of the image. */
  alt: string;
}

export function Lightbox({ isOpen, onClose, src, alt }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      // Single focusable control — keep focus trapped on it.
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface/95 p-6"
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-sm text-ink transition duration-200 ease-out hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
        </svg>
      </button>

      <div
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-4xl"
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1200}
          className="h-auto max-h-[85vh] w-full rounded-md object-contain"
        />
      </div>
    </div>
  );
}
