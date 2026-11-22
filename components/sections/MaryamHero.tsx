"use client";

export default function MaryamHero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f7f3ec]">
      {/* Breathing ambient glow, pink -> blue/purple, from the jellyfish-bottle palette.
          Both layers are centered on the exact same point via absolute + inset-0 + margin:auto,
          so they only scale/fade in place and never drift. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 m-auto h-[700px] w-[700px] animate-breathe rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, #f4c9ce 0%, #c9a9c9 45%, #8a92c4 75%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 m-auto h-[420px] w-[420px] animate-breathe-delayed rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle at center, #f4c9ce 0%, #8a92c4 60%, transparent 75%)",
        }}
      />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div
          className="mb-8 h-14 w-14 rounded-full shadow-lg"
          style={{
            background: "linear-gradient(145deg, #e07a5f, #b5533d)",
          }}
        />

        <h1 className="font-serif text-6xl italic text-[#1c1917] sm:text-7xl md:text-8xl">
          Maryam
        </h1>

        <p className="mt-6 max-w-md text-base text-[#57534e] sm:text-lg">
          A friendly AI helper for everyday things.
          <br />
          Just ask —{" "}
          <span className="italic text-[#1c1917]">no tech skills needed.</span>
        </p>

        <div className="mt-10 flex w-full max-w-md items-center gap-3 rounded-full border border-[#e7e2d8] bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
          <input
            type="text"
            placeholder="Ask anything, in your own words..."
            className="flex-1 bg-transparent text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none"
          />
          <button
            type="button"
            aria-label="Submit"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1c1917] text-white transition hover:bg-[#3a3532]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>

        <p className="mt-4 text-xs text-[#a8a29e]">
          Free to start · No card needed · Private
        </p>
      </main>

      <style jsx global>{`
        @keyframes breathe {
          0%,
          100% {
            opacity: 0.55;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.08);
          }
        }
        .animate-breathe {
          animation: breathe 6s ease-in-out infinite;
        }
        .animate-breathe-delayed {
          animation: breathe 6s ease-in-out infinite;
          animation-delay: -3s;
        }
      `}</style>
    </div>
  );
}
