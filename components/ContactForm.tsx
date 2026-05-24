"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactFormState } from "@/lib/contact-action";
import { cn } from "@/lib/cn";

const initial: ContactFormState = { ok: false };

const inputClass = cn(
  "bg-bg/60 text-text placeholder:text-muted/70",
  "w-full rounded-3xl px-5 py-2.5 text-sm leading-normal",
  "outline-none transition-colors",
  "ring-1 ring-inset ring-white/5 focus:ring-2 focus:ring-accent",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

const labelClass = cn(
  "text-muted mb-1.5 block text-xs font-semibold uppercase tracking-widest",
);

const errorClass = "text-xs text-rose-300 mt-1";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, initial);

  if (state.ok) {
    return (
      <div className="py-6 text-center" role="status" aria-live="polite">
        <p className="text-text text-base font-medium">Thanks — your message is on the way.</p>
        <p className="text-muted mt-2 text-sm">I&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form action={action} className="mt-6 space-y-4" noValidate>
      {/* Honeypot — visually hidden, kept in tab order to avoid screen-reader oddities */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            disabled={pending}
            autoComplete="name"
            aria-invalid={state.errors?.name ? "true" : undefined}
            aria-describedby={state.errors?.name ? "contact-name-err" : undefined}
            className={inputClass}
          />
          {state.errors?.name && (
            <p id="contact-name-err" className={errorClass}>
              {state.errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            disabled={pending}
            autoComplete="email"
            aria-invalid={state.errors?.email ? "true" : undefined}
            aria-describedby={state.errors?.email ? "contact-email-err" : undefined}
            className={inputClass}
          />
          {state.errors?.email && (
            <p id="contact-email-err" className={errorClass}>
              {state.errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          disabled={pending}
          aria-invalid={state.errors?.subject ? "true" : undefined}
          aria-describedby={state.errors?.subject ? "contact-subject-err" : undefined}
          className={inputClass}
        />
        {state.errors?.subject && (
          <p id="contact-subject-err" className={errorClass}>
            {state.errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          disabled={pending}
          aria-invalid={state.errors?.message ? "true" : undefined}
          aria-describedby={state.errors?.message ? "contact-message-err" : undefined}
          className={cn(inputClass, "resize-y")}
        />
        {state.errors?.message && (
          <p id="contact-message-err" className={errorClass}>
            {state.errors.message}
          </p>
        )}
      </div>

      {state.errors?.form && (
        <p role="alert" className="text-sm text-rose-300">
          {state.errors.form}
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "bg-accent text-bg inline-flex items-center justify-center rounded-full px-5 py-2.5",
            "text-sm font-semibold transition-opacity",
            "hover:opacity-90 focus-visible:opacity-90",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
