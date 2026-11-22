export type Project = {
  id: string;
  fileTitle: string;
  title: string;
  category: string;
  period?: string;
  tagline: string;
  overview: string;
  problems: string[];
  built: string[];
  tech: string[];
  features: string[];
  link?: { label: string; href: string };
  screenshots: { label: string }[];
};

export const PROJECTS: Project[] = [
  {
    id: "automations",
    fileTitle: "automations.log",
    title: "AI Voice & Chat Agent Systems",
    category: "AI & Automation",
    tagline: "Agents that answer, qualify and book — 24/7.",
    overview:
      "A suite of AI voice and chat agents built for clients who were losing leads to slow response times. Callers and website visitors get answered instantly, qualified, and routed — no human needed for the first touch.",
    problems: [
      "Missed calls and slow replies were costing clients real leads",
      "Support teams were repeating the same qualifying questions all day",
      "No consistent handoff between bot and human when it mattered",
    ],
    built: [
      "Inbound/outbound voice agents using Vapi and Retell",
      "WhatsApp and web chat agents backed by OpenAI + RAG over client docs",
      "Twilio-powered call routing with human handoff on qualified leads",
    ],
    tech: ["Vapi", "Retell", "OpenAI API", "Twilio", "n8n", "Pinecone"],
    features: [
      "Real-time call transcription & summary to CRM",
      "Lead qualification scoring before handoff",
      "Multi-language support for chat agents",
    ],
    screenshots: [{ label: "call-flow.png" }, { label: "agent-dashboard.png" }],
  },
  {
    id: "leadgen",
    fileTitle: "leadgen.log",
    title: "Lead Research & Cold Outreach Engine",
    category: "AI & Automation",
    tagline: "From scraped list to booked call, automatically.",
    overview:
      "An end-to-end pipeline that finds prospects, enriches their data, and runs personalized outreach across email and LinkedIn — built for agencies who needed pipeline without hiring an SDR team.",
    problems: [
      "Manual prospecting ate hours with little to show for it",
      "Outreach felt generic and got ignored",
      "No visibility into what was actually working",
    ],
    built: [
      "Scraping & enrichment pipelines using n8n, Apify and Python",
      "Personalized cold email sequencing with dynamic variables",
      "LinkedIn automation for connection + follow-up sequences",
    ],
    tech: ["n8n", "Apify", "Python", "Instantly", "PhantomBuster", "Clay"],
    features: [
      "Auto-enriched lead scoring before a message is ever sent",
      "Reply detection that pauses sequences automatically",
      "Weekly performance reporting, no manual pulls",
    ],
    screenshots: [{ label: "pipeline-map.png" }, { label: "reply-rates.png" }],
  },
  {
    id: "products",
    fileTitle: "products.log",
    title: "WorkAmbitions & Quick Photos",
    category: "Platforms",
    tagline: "Two SaaS products, built end to end.",
    overview:
      "A pair of small SaaS products built solo — from idea to shipped product — alongside a Claude Code application for managing multiple Google Workspace accounts from one place.",
    problems: [
      "Existing tools in the space were bloated or overpriced for what they did",
      "Managing several Google Workspace accounts meant constant context-switching",
    ],
    built: [
      "WorkAmbitions — a focused SaaS product solving a specific workflow gap",
      "Quick Photos — a lightweight photo-handling SaaS tool",
      "A Claude Code app to manage multiple Google Workspace accounts in one session",
    ],
    tech: ["Next.js", "Supabase", "Stripe", "Vercel", "PostgreSQL"],
    features: [
      "Stripe-based billing wired in from day one",
      "Multi-account session switching without re-auth",
      "Deployed and iterated on live, not just a prototype",
    ],
    screenshots: [{ label: "workambitions-ui.png" }, { label: "quickphotos-ui.png" }],
  },
  {
    id: "experience-freelance",
    fileTitle: "experience.log",
    title: "Freelance — Automation & Software Engineer",
    category: "Experience",
    period: "2024 — Present",
    tagline: "Running automation systems for agencies, SaaS and real estate clients.",
    overview:
      "Since 2024, working directly with clients across industries to design and ship the automation and AI systems covered throughout this page — from GoHighLevel CRM builds to voice agents to lead-gen pipelines.",
    problems: [
      "Clients needed systems, not just advice — someone to actually build and ship",
      "Every client's stack and workflow was different, so nothing could be one-size-fits-all",
    ],
    built: [
      "GoHighLevel CRM setups, funnels, pipelines and workflow automation",
      "RAG-based WhatsApp assistants and Telegram bots",
      "CRM integrations across HubSpot, Salesforce and GoHighLevel",
      "Invoice & payment automation with Stripe",
    ],
    tech: ["n8n", "GoHighLevel", "OpenAI API", "Stripe", "Twilio", "Python"],
    features: [
      "Full client onboarding → automation systems, not one-off scripts",
      "A2P/10DLC, SMS and email infrastructure set up correctly from the start",
    ],
    screenshots: [{ label: "ghl-pipeline.png" }],
  },
  {
    id: "experience-moshpit",
    fileTitle: "experience-2.log",
    title: "Moshpit Studios — Fullstack Developer",
    category: "Experience",
    period: "2023 — 2024",
    tagline: "Building UI and APIs for a metaverse product.",
    overview:
      "Fullstack development on a MetaVerse-based product — handling UI development and API integrations before moving into freelance automation work.",
    problems: [
      "A fast-moving product needed UI and backend integrations built in parallel",
    ],
    built: [
      "UI development for the core product experience",
      "API integrations connecting the frontend to backend services",
    ],
    tech: ["JavaScript", "React", "REST API", "Node.js"],
    features: ["Shipped features into an actively evolving product"],
    screenshots: [{ label: "moshpit-ui.png" }],
  },
];
