'use client';

import { useState } from 'react';
import type { Dictionary, Locale } from '@/content';

type Status = 'idle' | 'sending' | 'success' | 'error';

interface ContactFormProps {
  lang: Locale;
  labels: Dictionary['contact']['form'];
}

const fieldClass =
  'w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm placeholder:text-muted/70';

export function ContactForm({ lang, labels }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus('sending');
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lang }),
      });

      if (response.ok) {
        form.reset();
        setStatus('success');
        setFeedback(labels.success);
        return;
      }

      setStatus('error');
      setFeedback(
        response.status === 400
          ? labels.errorValidation
          : response.status === 429
            ? labels.errorRate
            : labels.errorGeneric,
      );
    } catch {
      setStatus('error');
      setFeedback(labels.errorGeneric);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex min-w-0 flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium">
          {labels.name}
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder={labels.namePlaceholder}
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          {labels.email}
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder={labels.emailPlaceholder}
            className={fieldClass}
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-medium">
        {labels.subject}
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          maxLength={150}
          placeholder={labels.subjectPlaceholder}
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium">
        {labels.message}
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={6}
          placeholder={labels.messagePlaceholder}
          className={fieldClass}
        />
      </label>

      {/* Isca para robôs: pessoas não veem nem preenchem. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-fg hover:opacity-90 disabled:opacity-60"
      >
        {status === 'sending' ? labels.sending : labels.send}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`flex min-h-6 items-start gap-2 text-sm ${
          status === 'error'
            ? 'text-danger'
            : status === 'success'
              ? 'text-success'
              : 'text-muted'
        }`}
      >
        {feedback && status === 'success' ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="mt-0.5 h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12 5 5L20 7" />
          </svg>
        ) : null}
        {feedback && status === 'error' ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="mt-0.5 h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 8v5m0 3.5v.01M10.3 3.9 2.4 17.6A2 2 0 0 0 4.1 20.6h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
          </svg>
        ) : null}
        <span>{feedback}</span>
      </p>
    </form>
  );
}
