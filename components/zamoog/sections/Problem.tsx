import { FRUSTRATIONS } from "../content";
import Words from "../Words";

export default function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-title" className="zm-section">
      <div className="zm-pin zm-full flex items-center py-24">
        <div className="zm-wrap grid w-full gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <p className="zm-eyebrow mb-5" data-rv>The problem</p>
            <h2 id="problem-title" className="zm-head zm-h2" data-words>
              <Words text="Running a business shouldn’t feel this complicated." />
            </h2>
          </div>
          <ol className="space-y-3 md:col-span-6 md:space-y-5 md:pt-10">
            {FRUSTRATIONS.map((f, i) => (
              <li key={f} data-pin className="flex gap-4 border-t border-[var(--zm-line)] pt-3 md:gap-6 md:pt-5">
                <span className="zm-eyebrow pt-1 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[clamp(1.05rem,1.8vw,1.7rem)] leading-snug">{f}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
