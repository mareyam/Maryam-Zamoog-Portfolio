import Link from "next/link";
import { AI_USES } from "../content";
import Words from "../Words";

export default function UseCases() {
  return (
    <section id="use-cases" aria-labelledby="use-cases-title" className="zm-section">
      <div className="zm-wrap py-[14svh]">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="zm-eyebrow mb-5" data-rv>What AI can do for you</p>
            <h2 id="use-cases-title" className="zm-head zm-h2" data-words>
              <Words text="AI, without the technical knowledge." />
            </h2>
            <p className="zm-lead mt-7" data-rv>We help founders use AI products without technical knowledge.</p>
          </div>
          <div className="md:col-span-5 md:col-start-8" data-rv>
            <p className="zm-eyebrow mb-4">AI can be used for handling</p>
            <ol className="border-t border-[var(--zm-line)]">
              {AI_USES.map((u, i) => (
                <li key={u} className="flex gap-4 border-b border-[var(--zm-line)] py-3.5">
                  <span className="zm-eyebrow pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg">{u}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-lg">Is your usecase not mentioned above?</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a className="zm-btn zm-btn-solid" href="#contact">Give us a text <span className="zm-arrow" aria-hidden>→</span></a>
              <Link className="zm-btn zm-btn-ghost" href="/see-what-works">See what works for you</Link>
            </div>
            <p className="mt-8 text-[var(--zm-grey)]">Simple ideas become real products &mdash; without the usual tech headaches.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
