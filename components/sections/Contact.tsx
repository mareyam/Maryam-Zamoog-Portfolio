import { email } from "@/lib/data";

export default function Contact() {
  return (
    <section className="bg-black px-6 py-32 sm:px-10">
      {/* Large fading headline */}
      <h2
        className="font-bold leading-tight tracking-tighter"
        style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
      >
        <span className="text-white">Curious about what </span>
        <span className="text-white/40">we can </span>
        <span className="text-white/25">create together?</span>
        <br />
        <span className="text-white/15">Let&apos;s bring something </span>
        <span className="text-white/10">extraordinary to life!</span>
      </h2>

      {/* CTA row */}
      <div className="mt-16 flex flex-col gap-5 sm:flex-row sm:items-center">
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center justify-center rounded-none border-2 border-white bg-white px-10 py-4 text-sm font-semibold text-black transition-all hover:bg-transparent hover:text-white"
        >
          Get in Touch
        </a>
        <div className="flex items-center gap-2 text-sm text-white/60">
          <span className="h-2 w-2 rounded-full bg-white" />
          Available For Work
        </div>
      </div>
    </section>
  );
}
