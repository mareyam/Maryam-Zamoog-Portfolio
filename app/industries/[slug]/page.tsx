import Link from "next/link";
import Header from "@/components/sections/Header";
import { industries, toSlug } from "@/lib/data";

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const industry = industries.find((i) => toSlug(i.title) === slug);

  if (!industry) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white text-black">
        Not found
      </main>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white px-6 sm:px-10 py-20 ">
        <Link
          href="/#about"
          className="mb-12 inline-flex items-center gap-2 text-lg text-black/50 hover:text-black transition-colors"
        >
          ← Back
        </Link>

        <div className="max-w-6xl">
          <h1 className="font-black leading-none tracking-tighter text-black uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            {industry.title}
          </h1>
          <div className="mt-4 flex flex-wrap border border-black">
            {industry.subNiches.map((niche, idx) => (
              <div
                key={niche}
                className={`text-black flex-1 min-w-max px-4 py-3 text-sm text-center border-black ${
                  idx < industry.subNiches.length - 1 ? "border-r" : ""
                }`}
              >
                {niche}
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-0 border border-black">
            <div className="border border-black p-8">
              <p className="text-sm uppercase tracking-wide text-black font-extrabold">
                Problems
              </p>

              <div className="mt-6 space-y-4">
                {industry.painPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="mt-3 h-2 w-2 shrink-0 bg-black/50" />

                    <p className="text-lg md:text-lg leading-relaxed text-black/50">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black p-8">
              <p className="text-sm uppercase tracking-wide text-black font-extrabold">
                Solutions
              </p>
              <div className="mt-6 space-y-4">
                {industry.solutions.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="mt-3 h-2 w-2 shrink-0 bg-black/50" />

                    <p className="text-lg md:text-lg leading-relaxed text-black/50">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 border-2 border-black p-8">
            <p className="text-sm uppercase tracking-wide text-black font-extrabold">
              Automations
            </p>
            <div className="mt-6 space-y-4">
              {industry.automations.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="mt-3 h-2 w-2 shrink-0 bg-black/50" />

                  <p className="text-lg md:text-lg leading-relaxed text-black/50">
                    {point}
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
              Something else?
            </h2>

            <span className="text-xl md:text-2xl font-bold">→</span>
          </Link>
        </div>
      </main>
    </>
  );
}
