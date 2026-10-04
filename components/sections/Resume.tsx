import Image from "next/image";

const skills = ["N8N", "Make.com", "UiPath", "Python FastAPI", "JavaScript/SwiftUI/NextJS"];
const languages = ["English (Bilingual)", "Urdu/Hindi (Bilingual)"];
const tools = [
  "Clay",
  "GHL",
  "HubSpot",
  "Salesforce",
  "LGM",
  "Coinbase",
  "Apify",
  "PhantomBuster",
  "Instantly",
  "LemList",
  "Saleshandy",
  "SmartLead",
  "Hunter",
  "Perplexity",
  "iScraper",
  "Zapier",
  "Make",
  "n8n",
  "Airtable",
  "Notion",
  "Slack",
  "Twilio",
  "Vapi",
  "Retell",
  "ElevenLabs",
  "OpenAI API",
  "Pinecone",
  "Supabase",
  "Firebase",
  "PostgreSQL",
  "MongoDB",
  "Stripe",
  "Google API",
  "Postman",
  "Docker",
  "Vercel",
  "Framer",
  "Next.js",
  "Python",
  "Apollo",
  "Unipile",
  "Render",
  "Railway",
  "RapidAPI",
  "REST API",
  "LinkedIn Sales Navigator",
  "Zoho CRM",
  "and related tools",
];

const experience = [
  {
    role: "Freelance",
    title: "n8n Automation Developer and Software Engineer",
    period: "2024 - PRESENT",
    bullets: [
      "Portfolio at: zamoog.com",
      "Claude Code Application for managing multiple Google Workspace accounts",
      "Lead Generation, Enrichment, Qualification, Nurture & Cold Emailing",
      "GoHighLevel CRM Setup, Funnels, Pipelines & Workflow Automation",
      "AI Voice & Chat Agents using Vapi, Retell, OpenAI & Twilio",
      "AI SDR Systems for Lead Qualification, Follow ups & Appointment Booking",
      "RAG Based WhatsApp Assistants & Telegram Bots",
      "Social Media Automation & Content Creation",
      "Property Rental Scraping using n8n, Apify & Python",
      "Web Scraping & Data Enrichment",
      "CRM Integrations with HubSpot, Salesforce & GoHighLevel",
      "LinkedIn Lead Generation & Automation",
      "SEO Content Generation & Automation",
      "HR Recruiting & Candidate Shortlisting",
      "Amazon Listing Optimization",
      "Transcript & Call Analysis",
      "Invoice & Payment Automation with Stripe",
      "Client Onboarding & GHL Automation Systems",
      "A2P/10DLC, SMS & Email Infrastructure",
      "API, Webhook & Third Party Integrations",
      "Custom AI Workflows & LLM Automation",
      "SaaS based products like WorkAmbitions and Quick Photos",
    ],
  },
  {
    role: "Moshpit Studios",
    title: "Fullstack Developer",
    period: "2023 - 2024",
    bullets: ["UI development and API integrations for their MetaVerse based product"],
  },
];

function SectionIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#2b3344] text-white">
      {children}
    </div>
  );
}

export default function Resume() {
  return (
    <section className="mx-auto max-w-4xl bg-white text-[#1d1d1d] shadow-lg">
      {/* Header */}
      <div className="flex flex-col gap-6 bg-[#2b3344] px-10 py-10 text-white sm:flex-row sm:items-center">
        <div className="h-28 w-28 flex-none overflow-hidden rounded-full border-4 border-white/20">
          <Image
            src="/profile.png"
            alt="Maryam Naveed"
            width={112}
            height={112}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-wide">MARYAM NAVEED</h1>
          <p className="mt-1 text-sm tracking-[0.2em] text-white/70">SOFTWARE ENGINEER</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 px-10 py-10 sm:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-8 text-sm">
          <div>
            <h2 className="mb-2 border-b border-gray-300 pb-1 text-xs font-bold tracking-widest text-gray-700">
              CONTACT
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>maryam@zamoog.com</li>
              <li>Lahore, Pakistan</li>
              <li>
                <a href="https://tinyurl.com/maryamlooms" className="underline">
                  portfolio
                </a>
              </li>
              <li>
                <a href="https://zamoog.com/" className="underline">
                  zamoog.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 border-b border-gray-300 pb-1 text-xs font-bold tracking-widest text-gray-700">
              SKILLS
            </h2>
            <ul className="space-y-1 text-gray-700">
              {skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-2 border-b border-gray-300 pb-1 text-xs font-bold tracking-widest text-gray-700">
              LANGUAGES
            </h2>
            <ul className="space-y-1 text-gray-700">
              {languages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-2 border-b border-gray-300 pb-1 text-xs font-bold tracking-widest text-gray-700">
              TOOLS
            </h2>
            <p className="text-gray-700">{tools.join(", ")}</p>
          </div>
        </aside>

        {/* Main */}
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-3">
              <SectionIcon>👤</SectionIcon>
              <h2 className="text-sm font-bold tracking-widest text-gray-800">PROFILE</h2>
            </div>
            <div className="ml-11 mt-2 space-y-2 border-t border-gray-200 pt-3 text-sm leading-relaxed text-gray-700">
              <p>
                An AI Automation Engineer with 3 years of industry experience with JavaScript
                and 1.5 years experience working with GoHighLevel, n8n, AI Agents, APIs, and
                CRM automation.
              </p>
              <p>
                Experienced in building end-to-end automation systems for lead generation,
                sales, customer support, and business operations.
              </p>
              <p>
                Skilled in integrating platforms like OpenAI, Vapi, Retell, Twilio, HubSpot,
                Salesforce, Stripe, and third-party APIs.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <SectionIcon>💼</SectionIcon>
              <h2 className="text-sm font-bold tracking-widest text-gray-800">
                WORK EXPERIENCE
              </h2>
            </div>
            <div className="ml-11 mt-2 space-y-6 border-t border-gray-200 pt-4">
              {experience.map((job) => (
                <div key={job.title} className="relative pl-5">
                  <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-[#2b3344]" />
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-semibold text-gray-900">{job.role}</h3>
                    <span className="whitespace-nowrap text-xs text-gray-500">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm italic text-gray-600">{job.title}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <SectionIcon>🎓</SectionIcon>
              <h2 className="text-sm font-bold tracking-widest text-gray-800">EDUCATION</h2>
            </div>
            <div className="ml-11 mt-2 border-t border-gray-200 pt-4 text-sm text-gray-700">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-semibold text-gray-900">COMSATS University Islamabad</h3>
                <span className="whitespace-nowrap text-xs text-gray-500">2019 - 2023</span>
              </div>
              <p>Software Engineering</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
