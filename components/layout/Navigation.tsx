'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const SCROLL_THRESHOLD = 80;

const LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
] as const;

// John Remy: the bar stays invisible until the page moves beneath it, then settles
// into frosted white (DESIGN.md §7). Restraint — two links, one signature.
export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-out',
        isScrolled
          ? 'bg-surface/80 backdrop-blur-lg'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">
        <Link
          href="/"
          className="font-display text-xl font-medium tracking-tight text-ink transition-colors hover:text-ink"
          aria-label="John Remy C. Gonzales — home"
        >
          John Remy<span className="text-primary">.</span>
        </Link>

        <ul className="flex items-center gap-8">
          {LINKS.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'font-body text-sm tracking-wide transition-colors duration-300',
                    'border-b-2 pb-1',
                    isActive
                      ? 'border-primary text-ink'
                      : 'border-transparent text-ink/60 hover:text-primary',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
