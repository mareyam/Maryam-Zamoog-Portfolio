import Link from "next/link";
import Header from "@/components/sections/Header";
import { useCases } from "@/lib/data";

export default function UseCasesPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white px-6 sm:px-10 py-20 text-black">
        <div className="max-w-6xl">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            Use Cases
          </p>

          <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter uppercase">
            What I Automate
          </h1>

          <p className="mt-4 max-w-3xl text-lg md:text-xl leading-relaxed text-black/60">
            Every business has repetitive processes eating hours. These are the
            systems I build to eliminate that — so you can focus on the work
            that actually moves the needle.
          </p>

          <div className="mt-12 border-t-2 border-black">
            {useCases.map((uc, idx) => (
              <Link
                key={uc.slug}
                href={`/usecases/${uc.slug}`}
                className="group flex items-center justify-between border-b border-black py-6 hover:bg-black hover:text-white transition-colors duration-150 px-0 hover:px-4"
              >
                <div className="flex items-start gap-6">
                  <span className="text-sm text-black/30 group-hover:text-white/40 w-8 shrink-0 pt-1">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-none">
                      {uc.title}
                    </h2>
                    <p className="mt-1 text-sm text-black/50 group-hover:text-white/60">
                      {uc.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0 ml-6">
                  <div className="hidden md:flex gap-2 flex-wrap justify-end max-w-xs">
                    {uc.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs border border-current px-2 py-1 uppercase tracking-wide"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <span className="text-xl font-bold">→</span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="mt-16 flex items-center justify-between border-2 border-black bg-black text-white px-8 py-10 transition-all duration-200 hover:bg-white hover:text-black"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Don&apos;t see yours? Let&apos;s talk.
            </h2>
            <span className="text-xl md:text-2xl font-bold">→</span>
          </Link>
        </div>
      </main>
    </>
  );
}
