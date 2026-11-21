// Contact form logic shared by the Contact app. Same payload shape as the existing /contact page.
export const CONTACT_WEBHOOK =
  process.env.NEXT_PUBLIC_CONTACT_WEBHOOK ??
  "https://n8n.softxlogic.com/webhook/5b287c7b-5cb0-4608-9f3e-63b4d4daf922";

export interface ContactForm {
  name: string;
  email: string;
  business: string;
  timeTaking: string;
  frustrations: string;
  additionalInfo: string;
}

export const EMPTY_FORM: ContactForm = { name: "", email: "", business: "", timeTaking: "", frustrations: "", additionalInfo: "" };

export type FormErrors = Partial<Record<keyof ContactForm, string>>;

export function validate(f: ContactForm): FormErrors {
  const e: FormErrors = {};
  if (f.name.trim().length < 2) e.name = "Enter your name (2+ characters).";
  if (!f.email.trim()) e.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "That email address looks invalid.";
  if (f.business.trim().length < 2) e.business = "Tell me what kind of business you run.";
  const body = [f.timeTaking, f.frustrations, f.additionalInfo].join(" ").trim();
  if (body.length < 10) e.additionalInfo = "Add a few words about what you need (10+ characters in any box below).";
  return e;
}

export async function submitContact(f: ContactForm): Promise<void> {
  const res = await fetch(CONTACT_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(f),
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
}
