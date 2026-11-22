export default function ContactFooter() {
  return (
    <section
      className="flex min-h-screen w-full flex-col items-center justify-center px-6 text-center transition-colors duration-700"
      style={{ backgroundColor: "var(--theme-bg)", color: "var(--theme-text)" }}
    >
      <p
        className="font-mono text-xs uppercase tracking-widest transition-colors duration-700"
        style={{ color: "var(--theme-accent)" }}
      >
        05 / Let&apos;s talk
      </p>
      <h2 className="mt-4 text-4xl font-black italic sm:text-6xl">
        Got something to build?
      </h2>
      <p className="mt-4 max-w-md text-sm opacity-70 sm:text-base">
        AI agents, automations, or a custom system — if it saves you time,
        I&apos;m in.
      </p>

      <a
        href="mailto:maryam@zamoog.com"
        className="mt-10 rounded-full px-8 py-4 text-sm font-semibold transition-all hover:scale-105"
        style={{ backgroundColor: "var(--theme-accent)", color: "var(--theme-accent-text)" }}
      >
        maryam@zamoog.com
      </a>

      <a
        href="https://www.linkedin.com/in/maryam-naveed-zamoog-n8n"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-sm underline opacity-60 hover:opacity-100"
      >
        Connect on LinkedIn
      </a>

      <p className="mt-16 text-xs opacity-40">
        © {new Date().getFullYear()} Maryam Naveed — Zamoog
      </p>
    </section>
  );
}
