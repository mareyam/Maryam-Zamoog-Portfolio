"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { EMAIL } from "../content";

/** Same form and webhook as the main /contact page, styled for /zamoog. */
const WEBHOOK = "https://n8n.softxlogic.com/webhook/3ed996bd-857e-40b6-8520-22354521f319";
const WEBHOOK_LEGACY = "https://n8n.softxlogic.com/webhook/5b287c7b-5cb0-4608-9f3e-63b4d4daf922";
const MEETING = "https://calendly.com/maryamnaveed/new-meeting";

const EMPTY = { name: "", email: "", business: "", timeTaking: "", frustrations: "", additionalInfo: "" };

const FIELDS = [
  { name: "name", label: "Name", type: "text", placeholder: "John Doe", required: true },
  { name: "email", label: "Email", type: "email", placeholder: "john@company.com", required: true },
  { name: "business", label: "What does your business do?", type: "text", placeholder: "Real Estate, Dental Clinic, Gym, Agency...", required: true },
  { name: "timeTaking", label: "What’s taking too much time?", type: "area", placeholder: "Replying to customers, follow-ups, scheduling, reporting, admin work...", required: false },
  { name: "frustrations", label: "Anything frustrating in your business?", type: "area", placeholder: "Missed leads, no-shows, repetitive work, slow processes, too many tools...", required: false },
  { name: "additionalInfo", label: "Anything else you’d like me to know?", type: "area", placeholder: "You can keep this simple. Just explain your business in your own words.", required: false },
] as const;

export default function ContactForm() {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [error, setError] = useState(false);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    // older webhook: fire-and-forget, never blocks or fails the submission
    fetch(WEBHOOK_LEGACY, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), keepalive: true }).catch(() => {});
    try {
      const res = await fetch(WEBHOOK, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) {
        setThanks(true);
        setData(EMPTY);
      } else setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const input = "w-full border-0 border-b border-[var(--zm-ink)] bg-transparent py-2.5 text-lg outline-none placeholder:text-[#555555]/60 focus:border-b-2";
  return (
    <>
      <form onSubmit={submit} className="zm-formcard space-y-6 border border-[var(--zm-ink)] bg-white p-6 md:p-8" aria-describedby="zm-form-note">
        {FIELDS.map((f) => (
          <div key={f.name}>
            <label htmlFor={`zm-${f.name}`} className="zm-eyebrow">{f.label}</label>
            {f.type === "area" ? (
              <textarea id={`zm-${f.name}`} name={f.name} rows={3} value={data[f.name]} onChange={change} placeholder={f.placeholder} className={`${input} resize-none`} />
            ) : (
              <input id={`zm-${f.name}`} name={f.name} type={f.type} value={data[f.name]} onChange={change} placeholder={f.placeholder} required={f.required} className={input} />
            )}
          </div>
        ))}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button type="submit" disabled={loading} className="zm-btn zm-btn-solid disabled:opacity-50">
            {loading ? "Sending..." : "Send Inquiry"} <span className="zm-arrow" aria-hidden>→</span>
          </button>
          <a className="zm-btn zm-btn-ghost" href={`mailto:${EMAIL}`}>Or reach out via email</a>
          <a className="zm-btn zm-btn-ghost" href={MEETING} target="_blank" rel="noopener noreferrer">Or book a meeting</a>
        </div>
        <p id="zm-form-note" role="status" className="min-h-[1.5rem] text-sm text-[var(--zm-grey)]">
          {error ? `Something went wrong. Please email ${EMAIL} instead.` : "We’ll reach out to you within 4 hours."}
        </p>
      </form>

      {thanks &&
        createPortal(
          <div role="dialog" aria-modal="true" aria-labelledby="zm-thanks" className="fixed inset-0 z-[90] flex items-center justify-center bg-[#151515]/60 px-6">
            <div className="w-full max-w-md border-2 border-[#151515] bg-white p-10 text-center text-[#151515]">
              <h3 id="zm-thanks" style={{ fontFamily: "var(--font-zm-head), system-ui, sans-serif", letterSpacing: "-0.03em" }} className="text-4xl font-semibold">Thank you!</h3>
              <p className="mt-4 text-lg text-[#555555]">We’ll reach out to you within 4 hours.</p>
              <button type="button" autoFocus onClick={() => setThanks(false)} className="mt-8 w-full rounded-full border border-[#151515] bg-[#151515] px-6 py-3.5 text-base font-medium text-white hover:bg-[#333]">
                Close
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
