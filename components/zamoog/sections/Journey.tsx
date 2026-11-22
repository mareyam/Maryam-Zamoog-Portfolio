"use client";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { JOURNEY } from "../content";
import { getJourneyStep, journeyControl, setJourneyStep, subscribeJourney } from "../story-state";
import Words from "../Words";

/**
 * Section 5: follow one customer from first click to booked appointment.
 * On screens tall enough, the section pins and scrolling steps through the journey (Story drives
 * the step). Clicking a step scrolls to it. Otherwise the steps are click-driven.
 */
export default function Journey() {
  const active = useSyncExternalStore(subscribeJourney, getJourneyStep, () => 0);
  const playing = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const playBtn = useRef<HTMLButtonElement>(null);
  const step = JOURNEY[active];

  const go = (i: number) => {
    if (journeyControl.pinned) journeyControl.scrollTo(i, Math.abs(i - getJourneyStep()) === 1);
    else setJourneyStep(i);
  };

  const stop = () => {
    playing.current = false;
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    if (playBtn.current) playBtn.current.textContent = "Play the journey";
  };
  useEffect(() => stop, []);

  const togglePlay = () => {
    if (playing.current) return stop();
    playing.current = true;
    if (playBtn.current) playBtn.current.textContent = "Pause";
    if (getJourneyStep() >= JOURNEY.length - 1) go(0);
    timer.current = setInterval(() => {
      const next = getJourneyStep() + 1;
      if (next >= JOURNEY.length) return stop();
      go(next);
    }, 3200);
  };

  const pick = (i: number) => {
    stop();
    go(i);
  };
  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (active + d + JOURNEY.length) % JOURNEY.length;
    pick(n);
    tabs.current[n]?.focus();
  };

  return (
    <section id="journey" aria-labelledby="journey-title" className="zm-section">
      <div className="zm-jpin">
        <div className="zm-wrap grid w-full gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="zm-eyebrow mb-3 md:mb-4" data-rv>How it works</p>
            <h2 id="journey-title" className="zm-head max-w-[16ch] text-[clamp(1.9rem,3.7vw,3.8rem)]" data-words>
              <Words text="Here’s what that actually looks like." />
            </h2>
            <p className="zm-lead zm-jlead mt-4" data-rv>
              Follow one customer from first click to booked appointment. Just keep scrolling.
            </p>

            <div className="mt-5 md:mt-7" data-rv>
              <div role="tablist" aria-label="The customer journey" aria-orientation="vertical" className="zm-jlist relative" onKeyDown={onKey}>
                <span aria-hidden className="zm-jrail absolute left-[0.65rem] top-0 w-px bg-[var(--zm-line)]" style={{ height: `calc(${JOURNEY.length} * var(--zm-jrow))` }} />
                <span
                  aria-hidden
                  className="zm-jdot absolute left-[0.65rem] h-3 w-3 -translate-x-1/2 rounded-full border border-[var(--zm-ink)] bg-[var(--zm-accent)]"
                  style={{ top: `calc(${active} * var(--zm-jrow) + var(--zm-jrow) / 2 - 0.375rem)`, transition: "top .6s cubic-bezier(.7,0,.2,1)" }}
                />
                {JOURNEY.map((s, i) => (
                  <button
                    key={s.title}
                    ref={(el) => { tabs.current[i] = el; }}
                    role="tab"
                    id={`jt-${i}`}
                    aria-label={`Step ${i + 1}: ${s.title}`}
                    aria-selected={i === active}
                    aria-controls="journey-panel"
                    tabIndex={i === active ? 0 : -1}
                    onClick={() => pick(i)}
                    className="zm-tab zm-jtab flex w-full items-center gap-5 pl-9 text-left"
                  >
                    <span className="zm-eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="zm-head zm-jtitle text-[clamp(1.05rem,1.6vw,1.5rem)]" style={{ fontWeight: i === active ? 600 : 500 }}>
                      {s.title}
                    </span>
                  </button>
                ))}
              </div>
              <button ref={playBtn} type="button" className="zm-moment-btn mt-5 md:mt-6" onClick={togglePlay}>
                Play the journey
              </button>
            </div>
          </div>

          <div id="journey-panel" role="tabpanel" aria-labelledby={`jt-${active}`} className="flex items-center md:col-span-7 md:pl-10" aria-live="polite">
            <div key={active} className="zm-fade w-full">
              <p className="zm-head zm-jnum select-none text-[clamp(4rem,9vw,8.5rem)] leading-[0.8] text-transparent" style={{ WebkitTextStroke: "1px var(--zm-purple)" }} aria-hidden>
                {String(active + 1).padStart(2, "0")}
              </p>
              <h3 className="zm-head mt-4 max-w-[20ch] text-[clamp(1.6rem,3.4vw,3.2rem)]">
                <span className="zm-hl">{step.title}</span>
              </h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-8">
                <div>
                  <p className="zm-eyebrow mb-2">What happens</p>
                  <p className="zm-body">{step.what}</p>
                </div>
                <div>
                  <p className="zm-eyebrow mb-2">What you see</p>
                  <p className="zm-body !text-[var(--zm-ink)]">{step.owner}</p>
                </div>
              </div>
              <p className="mt-6 text-sm text-[var(--zm-grey)]">Step {active + 1} of {JOURNEY.length}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
