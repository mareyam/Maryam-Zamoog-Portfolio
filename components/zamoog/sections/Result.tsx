import { OUTCOMES } from "../content";
import Words from "../Words";

export default function Result() {
  return (
    <section id="result" aria-labelledby="result-title" className="zm-section">
      <div className="zm-wrap zm-full py-[14svh]">
        <p className="zm-eyebrow mb-5" data-rv>The result</p>
        <h2 id="result-title" className="zm-head zm-h2 max-w-[16ch]" data-words>
          <Words text="Technology should make business simpler. Not harder." />
        </h2>
        <ul className="mt-[9svh]">
          {OUTCOMES.map((o, i) => (
            <li key={o} data-rv className="flex items-baseline gap-5 border-t border-[var(--zm-line)] py-4 md:gap-10 md:py-6">
              <span className="zm-eyebrow w-8 shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="zm-head text-[clamp(1.6rem,4.6vw,4.4rem)]">{o}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
