import type { Metadata } from 'next';

import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with John Remy C. Gonzales — Full Stack Developer.',
};

const EMAIL = 'johnremygonzales20@gmail.com';

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pt-40 pb-32 md:px-8">
      <p className="font-mono text-sm tracking-[0.2em] text-ink/60">CONTACT</p>

      <h1 className="mt-6 font-display text-3xl font-light leading-[1.15] tracking-tight text-ink">
        Have something worth building well? Let&apos;s talk.
      </h1>

      <p className="mt-10 font-body text-lg leading-relaxed text-ink/70">
        Tell me about what you&apos;re making and I&apos;ll get back to you. Prefer
        email? Reach me at{' '}
        <a
          href={`mailto:${EMAIL}`}
          className="text-primary transition-colors duration-300 hover:text-primary/80"
        >
          {EMAIL}
        </a>
        .
      </p>

      <ContactForm />
    </section>
  );
}
