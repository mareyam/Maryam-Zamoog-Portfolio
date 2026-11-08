import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white px-6 sm:px-10 py-20 text-black">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            Legal
          </p>
          <h1 className="mt-4 text-6xl sm:text-2xl md:text-4xl lg:text-6xl font-black leading-none tracking-tighter uppercase">
            Terms of Service
          </h1>
          <p className="mt-6 text-sm text-black/40">
            Last updated: November 8, 2026
          </p>

          <div className="mt-12 space-y-10 text-lg leading-relaxed text-black/70">
            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Acceptance of Terms
              </h2>
              <p className="mt-3">
                By accessing this website or engaging Zamoog&apos;s services,
                you agree to these terms. If you do not agree, please do not
                use this site or our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Services
              </h2>
              <p className="mt-3">
                Zamoog provides freelance AI automation and software
                development services. The scope, deliverables, timeline, and
                pricing of any engagement are agreed upon separately with
                each client before work begins.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Website Content
              </h2>
              <p className="mt-3">
                All content on this site, including text, graphics, and
                branding, is the property of Zamoog unless otherwise noted,
                and may not be copied or reproduced without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                No Guarantee of Results
              </h2>
              <p className="mt-3">
                While we aim to deliver reliable, high-quality automation
                and software solutions, outcomes depend on factors specific
                to each client&apos;s business and are not guaranteed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Limitation of Liability
              </h2>
              <p className="mt-3">
                Zamoog is not liable for any indirect, incidental, or
                consequential damages arising from use of this website or
                our services, to the fullest extent permitted by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Changes to These Terms
              </h2>
              <p className="mt-3">
                We may update these terms from time to time. Continued use
                of the site after changes constitutes acceptance of the
                revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Contact
              </h2>
              <p className="mt-3">
                Questions about these terms can be sent to{" "}
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
