import CtaRing from "@/components/zamoog/CtaRing";
import Nav from "@/components/zamoog/Nav";
import Story from "@/components/zamoog/Story";
import Build from "@/components/zamoog/sections/Build";
import Contact from "@/components/zamoog/sections/Contact";
import Hero from "@/components/zamoog/sections/Hero";
import Journey from "@/components/zamoog/sections/Journey";
import Problem from "@/components/zamoog/sections/Problem";
import Result from "@/components/zamoog/sections/Result";
import UseCases from "@/components/zamoog/sections/UseCases";
import Shift from "@/components/zamoog/sections/Shift";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Zamoog",
  url: "https://zamoog.com/",
  description:
    "AI voice agents, customer management systems, business automation and software integrations for small and medium businesses.",
  serviceType: ["AI voice agents", "Customer management systems", "Business automation", "Software integrations"],
};

export default function ZamoogPage() {
  return (
    <>
      <noscript>
        <style>{`.zm-wi,[data-rv],[data-pin]{transform:none!important;opacity:1!important}`}</style>
      </noscript>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-[#151515] focus:px-4 focus:py-2 focus:text-[#F8F8F5]">
        Skip to content
      </a>
      <Nav />
      <div className="zm-grid" aria-hidden>
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      <Story />
      <CtaRing />
      <main id="main">
        <Hero />
        <Problem />
        <Shift />
        <Build />
        <Journey />
        <Result />
        <UseCases />
        <Contact />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
    </>
  );
}
