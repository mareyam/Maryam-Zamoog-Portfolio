"use client";
import { useState } from "react";
import { email, socials } from "@/lib/data";
import { PROFILE } from "@/lib/maryam-content";
import { EMPTY_FORM, submitContact, validate, type ContactForm, type FormErrors } from "@/lib/desktop/contact";
import { sfx } from "@/lib/desktop/sound";
import { AppShell, Heading, RetroButton, Section, ViewSwitch } from "./ui";

type Status = "idle" | "sending" | "sent" | "error";

const FIELDS: { name: keyof ContactForm; label: string; placeholder: string; area?: boolean; type?: string }[] = [
  { name: "name", label: "Your name", placeholder: "John Doe" },
  { name: "email", label: "Email", placeholder: "john@company.com", type: "email" },
  { name: "business", label: "Your business", placeholder: "Real estate, dental clinic, agency..." },
  { name: "timeTaking", label: "What takes up your time?", placeholder: "Replying to customers, follow-ups, reporting...", area: true },
  { name: "frustrations", label: "What frustrates you?", placeholder: "Missed leads, repetitive work, too many tools...", area: true },
  { name: "additionalInfo", label: "Anything else?", placeholder: "Describe your business in your own words.", area: true },
];

export default function ContactApp({ prefill = "" }: { prefill?: string }) {
  const [form, setForm] = useState<ContactForm>({ ...EMPTY_FORM, additionalInfo: prefill });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const set = (k: keyof ContactForm, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      sfx.error();
      const first = Object.keys(errs)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submitContact(form);
      setStatus("sent");
      sfx.success();
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
      sfx.error();
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const input = "mt-1 w-full border border-[#ffb648]/60 bg-transparent px-2 py-1 pointer-coarse:py-2 pointer-coarse:text-base placeholder:text-[#ffb648]/35 focus:border-[#ffb648] focus:outline-none aria-[invalid=true]:border-dashed";

  return (
    <AppShell>
      <ViewSwitch id={status === "sent" ? "sent" : "form"}>
        {status === "sent" ? (
          <div className="p-6 text-center" role="status">
            <Heading size="text-4xl">Message sent</Heading>
            <p className="mt-3">Thanks. I&apos;ll read it and reply by email.</p>
            <div className="mt-5"><RetroButton onClick={() => setStatus("idle")}>Send another</RetroButton></div>
          </div>
        ) : (
          <div className="p-4">
            <Heading>Contact</Heading>
            <p className="mt-2 opacity-80">{PROFILE.availability}. {PROFILE.location}.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <RetroButton active href={`mailto:${email}`}>Email {email}</RetroButton>
              <RetroButton onClick={copy}>{copied ? "Copied!" : "Copy email"}</RetroButton>
            </div>
            <Section title="Elsewhere">
              <ul className="flex flex-wrap gap-2">
                {socials.map((s) => <li key={s.href}><RetroButton href={s.href}>{s.label} &#8599;</RetroButton></li>)}
              </ul>
            </Section>
            <Section title="Send a message">
              <form onSubmit={submit} noValidate className="space-y-3">
                {FIELDS.map((f) => (
                  <div key={f.name}>
                    <label htmlFor={`cf-${f.name}`} className="block text-xs uppercase tracking-widest opacity-80">{f.label}</label>
                    {f.area ? (
                      <textarea id={`cf-${f.name}`} rows={2} value={form[f.name]} placeholder={f.placeholder} onChange={(e) => set(f.name, e.target.value)} aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `cf-${f.name}-err` : undefined} className={`${input} resize-none`} />
                    ) : (
                      <input id={`cf-${f.name}`} type={f.type ?? "text"} value={form[f.name]} placeholder={f.placeholder} onChange={(e) => set(f.name, e.target.value)} aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `cf-${f.name}-err` : undefined} className={input} />
                    )}
                    {errors[f.name] && <p id={`cf-${f.name}-err`} role="alert" className="mt-1 bg-[#ffb648] px-1 text-xs text-[#020b14]">ERR: {errors[f.name]}</p>}
                  </div>
                ))}
                {status === "error" && (
                  <p role="alert" className="bg-[#ffb648] px-2 py-1 text-[#020b14]">ERR: Could not send. Try again, or email {email} directly.</p>
                )}
                <RetroButton type="submit" active disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send message"}</RetroButton>
              </form>
            </Section>
          </div>
        )}
      </ViewSwitch>
    </AppShell>
  );
}
