import Image from "next/image";

export default function DesignerHero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#9A50E0]">
      <Image
        src="/images/maryam-hero-v2.jpg"
        alt="Maryam"
        fill
        priority
        className="object-contain"
      />

      {/* Rotating ZAMOOG badge, top right — links to zamoog.com */}
      <a
        href="https://zamoog.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-6 top-6 z-20 sm:right-10 sm:top-10"
      >
        <div
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105 sm:h-24 sm:w-24"
          style={{ boxShadow: "0 0 0 3px var(--theme-accent)" }}
        >
          <Image
            src="/images/zamoog-logo-v2.png"
            alt="Zamoog"
            fill
            className="rounded-full object-cover p-2"
          />
          <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] animate-[spin_10s_linear_infinite]"
          >
            <defs>
              <path id="zamoogTopArc" d="M 10,50 A 40,40 0 0 1 90,50" />
              <path id="zamoogBottomArc" d="M 90,50 A 40,40 0 0 1 10,50" />
            </defs>
            <text fill="#2d1b69" fontSize="9.5" fontWeight="700" letterSpacing="1">
              <textPath href="#zamoogTopArc" startOffset="50%" textAnchor="middle">
                ZAMOOG
              </textPath>
            </text>
            <text fill="#2d1b69" fontSize="9.5" fontWeight="700" letterSpacing="1">
              <textPath href="#zamoogBottomArc" startOffset="50%" textAnchor="middle">
                ZAMOOG
              </textPath>
            </text>
          </svg>
        </div>
      </a>
    </div>
  );
}
