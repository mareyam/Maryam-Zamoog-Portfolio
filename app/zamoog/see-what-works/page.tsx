import type { Metadata } from "next";
import Link from "next/link";
import { industries, toSlug } from "@/lib/data";
import Nav from "@/components/zamoog/Nav";

export const metadata: Metadata = {
  title: "See what works for you — Zamoog",
  description: "Select your business type and see how Zamoog's AI and automation can help.",
  alternates: { canonical: "/see-what-works" },
};

export default function SeeWhatWorks() {
  return (
    <>
      <Nav />
      <main id="main" className="zm-section zm-wrap min-h-screen pb-24 pt-32">
        <p className="zm-eyebrow mb-5">See what works for you</p>
        <h1 className="zm-head zm-h2 mb-12 max-w-[16ch]">
          <span className="zm-hl">Select your business type</span>
        </h1>
        <ul className="grid border-l border-t border-[var(--zm-ink)] sm:grid-cols-2">
          {industries.map((industry) => (
            <li key={industry.title}>
              <Link
                href={`/industries/${toSlug(industry.title)}`}
                className="block h-full border-b border-r border-[var(--zm-ink)] px-5 py-7 text-xl font-medium transition-colors hover:bg-[var(--zm-ink)] hover:text-[var(--zm-bg)]"
              >
                {industry.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/#contact" className="zm-btn zm-btn-ghost mt-12">Not sure? Let&rsquo;s talk <span aria-hidden>→</span></Link>
      </main>
    </>
  );
}
