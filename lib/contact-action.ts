"use server";

import { Resend } from "resend";
import { bio } from "@/data/bio";

export interface ContactFormState {
  ok: boolean;
  errors?: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    form?: string;
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ContactFormState["errors"] | undefined {
  const errors: NonNullable<ContactFormState["errors"]> = {};
  if (!input.name.trim()) errors.name = "Please enter your name.";
  else if (input.name.length > 100) errors.name = "Name is too long.";
  if (!input.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(input.email)) errors.email = "That doesn't look like a valid email.";
  if (!input.subject.trim()) errors.subject = "Please enter a subject.";
  else if (input.subject.length > 200) errors.subject = "Subject is too long.";
  if (!input.message.trim()) errors.message = "Please enter a message.";
  else if (input.message.length > 5000) errors.message = "Message is too long (max 5000 chars).";
  return Object.keys(errors).length ? errors : undefined;
}

export async function sendContactMessage(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot — bots fill hidden fields; real users leave them empty.
  // Silently "succeed" so spammers don't retry.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { ok: true };
  }

  const input = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    subject: String(formData.get("subject") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors = validate(input);
  if (errors) return { ok: false, errors };

  if (!process.env.RESEND_API_KEY) {
    return {
      ok: false,
      errors: {
        form: "Email service isn't configured yet. Please reach me at " + bio.email + " directly.",
      },
    };
  }

  const fromAddress = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const result = await resend.emails.send({
      from: fromAddress,
      to: bio.email,
      subject: `[Portfolio] ${input.subject}`,
      replyTo: input.email,
      text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return {
        ok: false,
        errors: {
          form: "Couldn't send your message. Please try again or email me directly at " + bio.email + ".",
        },
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("Contact form error:", err);
    return {
      ok: false,
      errors: {
        form: "Something went wrong on our end. Please try again, or email me directly at " + bio.email + ".",
      },
    };
  }
}
