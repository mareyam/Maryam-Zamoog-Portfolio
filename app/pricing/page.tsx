import Header from "@/components/sections/Header";
import { pricing } from "@/lib/data";

export default function PricingPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white px-6 sm:px-10 py-20 text-black">
        <div className="max-w-7xl">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            Pricing
          </p>

          <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter uppercase">
            Estimated Pricing
          </h1>

          <p className="mt-4 max-w-3xl text-lg md:text-xl leading-relaxed text-black/60">
            Every business has different workflows, goals, and complexity. Final
            pricing is decided after a quick meeting based on the systems
            required, integrations, AI usage, and overall project scope.
          </p>

          <div className="mt-4 border-2 border-black">
            <div className="grid grid-cols-12 border-b-2 border-black bg-black text-white">
              <div className="col-span-3 p-5 text-sm md:text-base font-extrabold uppercase tracking-wide">
                Automation Type
              </div>

              <div className="col-span-3 p-5 text-sm md:text-base font-extrabold uppercase tracking-wide border-l-2 border-white">
                Pricing
              </div>

              <div className="col-span-3 p-5 text-sm md:text-base font-extrabold uppercase tracking-wide border-l-2 border-white">
                Description
              </div>

              <div className="col-span-3 p-5 text-sm md:text-base font-extrabold uppercase tracking-wide border-l-2 border-white">
                Advantage
              </div>
            </div>

            {pricing.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-12 border-b border-black last:border-b-0"
              >
                <div className="col-span-3 p-5 text-lg md:text-lg font-black uppercase leading-tight">
                  {item.title}
                </div>

                <div className="col-span-3 p-5 border-l border-black text-lg md:text-lg leading-relaxed text-black/50">
                  {item.price}
                </div>

                <div className="col-span-3 p-5 border-l border-black text-base md:text-lg leading-relaxed text-black/50">
                  {item.desc}
                </div>

                <div className="col-span-3 p-5 border-l border-black text-base md:text-lg leading-relaxed text-black font-bold">
                  {item.advantage}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 border-2 border-black bg-black text-white p-8 md:p-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-none">
              Don&apos;t see your use case? Send us a message
            </h2>

            <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-white/70">
              Tell me about your business and I’ll give you a realistic estimate
              based on your workflows, goals and systems.
            </p>

            <a
              href="/contact"
              className="mt-10 inline-flex items-center gap-3 border border-white px-6 py-4 text-lg font-bold uppercase tracking-wide transition-all duration-200 hover:bg-white hover:text-black"
            >
              Contact Us →
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
