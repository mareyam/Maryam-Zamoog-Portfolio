import { BRAND, EMAIL, LINKEDIN } from "../content";
import Words from "../Words";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="zm-section">
      <div className="zm-wrap zm-full flex flex-col justify-between pb-8 pt-[16svh]">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="zm-eyebrow mb-5" data-rv>Let&rsquo;s talk</p>
            <h2 id="contact-title" className="zm-head zm-h2" data-words>
              <Words text="Let’s make your business work better." />
            </h2>
            <p className="zm-lead mt-7" data-rv>
              Tell us about your business, the problems you&rsquo;re facing, or anything you think could save you time. Or just leave it to us. We&rsquo;ll reach out within 4 hours.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-10" data-rv>
            <ContactForm />
          </div>
        </div>
        <footer className="mt-[14svh] flex font-bold flex-wrap items-center justify-between gap-4 border-t border-[var(--zm-line)] pt-6 text-sm text-[var(--zm-grey)]">
          <span className="zm-head text-lg font-bold text-[var(--zm-ink)] md:pl-48">{BRAND}</span>
          <a href={`mailto:${EMAIL}`} className="inline-block py-3 hover:text-[var(--zm-ink)]">{EMAIL}</a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-block py-3 hover:text-[var(--zm-ink)]">LinkedIn</a>
          <span>&copy; {new Date().getFullYear()} {BRAND}</span>
        </footer>
      </div>
    </section>
  );
}
