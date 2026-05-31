'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { fadeInUp, staggerContainer } from '@/lib/motion';
import { cn } from '@/lib/utils';

// Web3Forms accepts the access key client-side by design — it is not a secret.
// Missing key means the form was never configured; we surface that plainly rather
// than fail a submission silently.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? '';
const ENDPOINT = 'https://api.web3forms.com/submit';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const FIELD_CLASSES = cn(
  'mt-3 w-full rounded-sm border border-ink/15 bg-surface-muted px-4 py-3',
  'font-body text-base text-ink placeholder:text-ink/30',
  'transition-colors duration-300',
  'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
);

const LABEL_CLASSES = 'font-mono text-sm tracking-[0.15em] text-ink/60';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!ACCESS_KEY) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: 'New message from your portfolio',
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        event.currentTarget.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const isSubmitting = status === 'submitting';

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mt-16"
    >
      <motion.form
        variants={fadeInUp}
        onSubmit={handleSubmit}
        className="space-y-8"
        noValidate
      >
        <div>
          <label htmlFor="name" className={LABEL_CLASSES}>
            NAME
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            disabled={isSubmitting}
            className={FIELD_CLASSES}
          />
        </div>

        <div>
          <label htmlFor="email" className={LABEL_CLASSES}>
            EMAIL
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={isSubmitting}
            className={FIELD_CLASSES}
          />
        </div>

        <div>
          <label htmlFor="message" className={LABEL_CLASSES}>
            MESSAGE
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            disabled={isSubmitting}
            className={cn(FIELD_CLASSES, 'resize-y')}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'rounded-md bg-primary px-8 py-4 font-medium text-neutral',
            'transition-all duration-300 ease-out',
            'hover:shadow-elevate hover:scale-105',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none',
          )}
        >
          {isSubmitting ? 'Sending…' : 'Send message'}
        </button>
      </motion.form>

      <p aria-live="polite" className="mt-6 font-body text-base">
        {status === 'success' && (
          <span className="text-ink/70">
            Thank you — your message is on its way. I&apos;ll reply soon.
          </span>
        )}
        {status === 'error' && (
          <span className="text-ink/70">
            {ACCESS_KEY
              ? 'Something went wrong sending that. Please try again, or email me directly.'
              : 'The form isn’t configured yet. Please email me directly for now.'}
          </span>
        )}
      </p>
    </motion.div>
  );
}
