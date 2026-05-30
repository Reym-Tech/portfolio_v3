import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'font-medium rounded-md transition-all duration-300 ease-out',
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        variant === 'primary' &&
          'bg-primary text-neutral hover:shadow-elevate hover:scale-105',
        variant === 'secondary' &&
          'border border-primary text-primary hover:bg-primary/10',
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3 text-base',
        size === 'lg' && 'px-8 py-4 text-lg',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
