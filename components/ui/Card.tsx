import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface-muted/80 backdrop-blur-md border border-ink/10 rounded-md',
        'transition-all duration-300 ease-out',
        'hover:shadow-elevate hover:scale-[1.01]',
        className,
      )}
    >
      {children}
    </div>
  );
}
