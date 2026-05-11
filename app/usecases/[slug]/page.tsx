import Link from "next/link";
import Header from "@/components/sections/Header";
import { useCases } from "@/lib/data";

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const useCase = useCases.find((uc) => uc.slug === slug);

  if (!useCase) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white text-black">
        Not found
      </main>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white px-6 sm:px-10 py-20">
        <Link
          href="/usecases"
          className="mb-12 inline-flex items-center gap-2 text-lg text-black/50 hover:text-black transition-colors"
        >
          ← Back
        </Link>

        <div className="max-w-6xl">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            Use Case
          </p>

          <h1 className="mt-2 font-black leading-none tracking-tighter text-black uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            {useCase.title}
          </h1>

          <p className="mt-4 max-w-3xl text-lg md:text-xl leading-relaxed text-black/60">
            {useCase.overview}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {useCase.tools.map((tool) => (
              <span
                key={tool}
                className="text-xs border border-black px-3 py-1.5 uppercase tracking-wide font-bold"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-0 border border-black">
            <div className="border border-black p-8">
              <p className="text-sm uppercase tracking-wide text-black font-extrabold">
                Problems
              </p>
              <div className="mt-6 space-y-4">
                {useCase.painPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="mt-3 h-2 w-2 shrink-0 bg-black/50" />
                    <p className="text-lg leading-relaxed text-black/50">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black p-8">
              <p className="text-sm uppercase tracking-wide text-black font-extrabold">
                Results
              </p>
              <div className="mt-6 space-y-4">
                {useCase.results.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="mt-3 h-2 w-2 shrink-0 bg-black/50" />
                    <p className="text-lg leading-relaxed text-black/50">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 border-2 border-black p-8">
            <p className="text-sm uppercase tracking-wide text-black font-extrabold">
              How It Works
            </p>
            <div className="mt-6 space-y-0">
              {useCase.workflow.map((step, idx) => (
                <div
                  key={step}
                  className="flex items-start gap-6 border-b border-black/20 py-5 last:border-b-0"
                >
                  <span className="text-3xl font-black text-black/20 w-10 shrink-0 leading-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg leading-relaxed text-black/70 pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            className="mt-16 flex items-center justify-between border-2 border-black bg-black text-white px-8 py-10 transition-all duration-200 hover:bg-white hover:text-black"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Want this for your business?
            </h2>
            <span className="text-xl md:text-2xl font-bold">→</span>
          </Link>
        </div>
      </main>
    </>
  );
}
