import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About John Remy C. Gonzales — Full Stack Developer.',
};

export default function AboutPage() {
  return (
    <section className="flex min-h-screen items-center px-6 pt-32 pb-20 md:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="font-display text-3xl font-light tracking-tight text-ink">
          About
        </h1>
        <div className="mt-8 space-y-6 font-body text-lg leading-relaxed text-ink/70">
          <p>
            I am John Remy C. Gonzales, a Full Stack Developer. I build complete
            digital products and care for every layer of them — the surface a
            person touches and the structure that holds it up.
          </p>
          <p>
            My standard is simple: nothing ships until it feels inevitable.
          </p>
        </div>
      </div>
    </section>
  );
}
