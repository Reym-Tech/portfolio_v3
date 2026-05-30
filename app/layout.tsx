import type { Metadata, Viewport } from 'next';
import './layout.css';
import '@/styles/globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/shared/CustomCursor';
import { MotionProvider } from '@/components/shared/MotionProvider';

export const metadata: Metadata = {
  title: {
    default: 'John Remy C. Gonzales — Full Stack Developer',
    template: '%s — John Remy C. Gonzales',
  },
  description:
    'The portfolio of John Remy C. Gonzales, Full Stack Developer. Complete digital products, built with deliberate craft.',
  robots: 'index, follow',
  openGraph: {
    title: 'John Remy C. Gonzales — Full Stack Developer',
    description:
      'Complete digital products, built with deliberate craft.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MotionProvider>
          <CustomCursor />
          <Navigation />
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
