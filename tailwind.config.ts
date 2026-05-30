import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Elegant palette — ELEGANT_DESIGN.md
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
        surface: '#FFFFFF',
        // Derived neutral: ELEGANT defines only surface/neutral (#FFFFFF); cards and
        // chips need one quiet step of elevation against the white page.
        'surface-muted': '#F3F4F6',
        ink: '#111827', // ELEGANT "text" token
        neutral: '#FFFFFF',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Elegant scale — 14 / 16 / 18 / 24 / 32 / 40
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
      },
      spacing: {
        '128': '32rem',
      },
      maxWidth: {
        '7xl': '80rem',
      },
      borderRadius: {
        // Elegant radii — sm 4px, md 8px
        sm: '4px',
        md: '8px',
      },
      backdropBlur: {
        md: '12px',
        lg: '16px',
      },
      boxShadow: {
        elevate:
          '0 1px 2px rgba(17, 24, 39, 0.04), 0 12px 32px rgba(17, 24, 39, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
