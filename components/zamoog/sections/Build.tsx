import { SERVICES } from "../content";
import ServiceMoment from "../moments/ServiceMoment";
import Words from "../Words";

export default function Build() {
  return (
    <section id="build" aria-labelledby="build-title" className="zm-section">
      <div className="zm-wrap pb-[6svh] pt-[16svh]">
        <p className="zm-eyebrow mb-5" data-rv>What we build</p>
        <h2 id="build-title" className="zm-head zm-h2 max-w-[14ch]" data-words>
          <Words text="Less managing. More moving forward." />
        </h2>
      </div>
      {SERVICES.map((s, i) => (
        <article key={s.n} data-service={i} aria-labelledby={`svc-${i}`} className="zm-full flex items-center py-16">
          <div className="zm-wrap grid w-full items-center gap-10 md:grid-cols-12">
            <div className={`md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
              <p className="zm-eyebrow mb-4" data-rv>
                {s.n} &mdash; {s.title}
              </p>
              <h3 id={`svc-${i}`} className="zm-head zm-h3" data-words>
                <Words text={s.tagline} />
              </h3>
              <p className="zm-body mt-6" data-rv>{s.body}</p>
              {s.behind && (
                <p className="mt-5 text-sm text-[var(--zm-grey)]" data-rv>
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--zm-accent)] align-middle" aria-hidden />
                  {s.behind}
                </p>
              )}
            </div>
            <div className={`md:col-span-6 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-7"}`} data-rv>
              <ServiceMoment index={i} />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
