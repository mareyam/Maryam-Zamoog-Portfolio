import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white px-6 sm:px-10 py-20 text-black">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            Legal
          </p>
          <h1 className="mt-4 text-6xl sm:text-2xl md:text-4xl lg:text-6xl font-black leading-none tracking-tighter uppercase">
            Privacy Policy
          </h1>
          <p className="mt-6 text-sm text-black/40">
            Last updated: November 8, 2026
          </p>

          <div className="mt-12 space-y-10 text-lg leading-relaxed text-black/70">
            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Who We Are
              </h2>
              <p className="mt-3">
                Zamoog (&quot;we&quot;, &quot;us&quot;) provides AI automation
                and software development services. This policy explains how
                we collect, use, and protect information submitted through
                this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Information We Collect
              </h2>
              <p className="mt-3">
                When you submit our contact form, we collect your name,
                email address, business details, and any other information
                you choose to provide. We do not collect this information
                through any other means on this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                How We Use Your Information
              </h2>
              <p className="mt-3">
                We use the information you submit solely to respond to your
                inquiry, discuss potential projects, and provide our
                services. We do not sell or rent your information to third
                parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Third-Party Services
              </h2>
              <p className="mt-3">
                Contact form submissions are processed through a third-party
                automation service to route inquiries to us. We also use
                Calendly for scheduling meetings, which has its own privacy
                practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Data Retention
              </h2>
              <p className="mt-3">
                We retain your information only as long as necessary to
                respond to your inquiry or fulfill a contracted service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Your Rights
              </h2>
              <p className="mt-3">
                You may request access to, correction of, or deletion of
                your personal information at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Contact
              </h2>
              <p className="mt-3">
                Questions about this policy can be sent to{" "}
                <a
                  href="mailto:maryam@zamoog.com"
                  className="underline hover:text-black"
                >
                  maryam@zamoog.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
