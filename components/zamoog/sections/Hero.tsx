import Link from "next/link";
import Words from "../Words";

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="zm-section zm-full flex items-end pb-[11svh] pt-28">
      <div className="zm-wrap w-full">
        <p className="zm-eyebrow zm-eyebrow-hl mb-6" data-rv>
          Zamoog - for non-tech people
        </p>
        <h1 id="hero-title" className="zm-head zm-h1 max-w-[13ch]" data-words>
          <Words text="You have better things to do." />
        </h1>
        <div className="mt-9 md:mt-12">
          <div className="flex flex-wrap gap-3" data-rv>
            <a className="zm-btn zm-btn-solid" href="#build">
              Discover What We Do <span className="zm-arrow" aria-hidden>→</span>
            </a>
            <Link className="zm-btn zm-btn-ghost" href="/see-what-works">
              See what works for you
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
