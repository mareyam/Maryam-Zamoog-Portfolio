"use client";

import Header from "@/components/sections/Header";

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white px-6 sm:px-10 py-20 text-black">
        <div className="max-w-6xl">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            Contact
          </p>
          <h1 className="mt-4 text-6xl sm:text-2xl md:text-4xl lg:text-6xl font-black leading-none tracking-tighter uppercase">
            Let’s Solve
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-black/60">
            Tell me about your business, the niche, the problems you&apos;re facing,
            anything you think could save your time? or just leave it to us.
            Fill in whatever detail you think could help me understand. Will
            reach out to you within 4 hours.
          </p>

          <form className="mt-16 border-2 border-black">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="border-b  md:border-r border-black p-6">
                <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-transparent outline-none text-lg placeholder:text-black/30"
                />
              </div>

              <div className="border-b border-black p-6">
                <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="john@company.com"
                  className="w-full bg-transparent outline-none text-lg placeholder:text-black/30"
                />
              </div>
            </div>

            <div className="border-b border-black p-6">
              <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
                What does your business do?
              </label>

              <input
                type="text"
                placeholder="Real Estate, Dental Clinic, Gym, Agency..."
                className="w-full bg-transparent outline-none text-lg placeholder:text-black/30"
              />
            </div>

            <div className="border-b border-black p-6">
              <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
                What&apos;s taking too much time?
              </label>

              <textarea
                rows={4}
                placeholder="Replying to customers, follow-ups, scheduling, reporting, admin work..."
                className="w-full resize-none bg-transparent outline-none text-lg leading-relaxed placeholder:text-black/30"
              />
            </div>

            <div className="border-b border-black p-6">
              <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
                Anything frustrating in your business?
              </label>

              <textarea
                rows={4}
                placeholder="Missed leads, no-shows, repetitive work, slow processes, too many tools..."
                className="w-full resize-none bg-transparent outline-none text-lg leading-relaxed placeholder:text-black/30"
              />
            </div>

            <div className="border-b border-black p-6">
              <label className="block text-xs uppercase tracking-wide font-extrabold mb-3">
                Anything else you&apos;d like me to know?
              </label>

              <textarea
                rows={4}
                placeholder="You can keep this simple. Just explain your business in your own words."
                className="w-full resize-none bg-transparent outline-none text-lg leading-relaxed placeholder:text-black/30"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white px-6 py-7 text-2xl md:text-3xl font-black tracking-tight uppercase transition-all duration-200 hover:bg-white hover:text-black"
            >
              Send Inquiry →
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
