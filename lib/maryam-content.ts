export const PROFILE = {
  name: "Maryam Naveed",
  shortName: "Maryam",
  role: "AI Automation Developer & Software Engineer",
  eyebrow: "Building systems that work while you sleep",
  location: "Lahore, Pakistan",
  availability: "Available for select projects",
  email: "maryam@zamoog.com",
  site: "zamoog.com",
};

export const STORY = [
  {
    year: "The start",
    title: "Learning by building",
    text: "No formal map — just a habit of taking things apart to see how they work, then rebuilding them better. Software became the obvious place to point that instinct.",
  },
  {
    year: "2023",
    title: "Moshpit Studios",
    text: "Fullstack developer on a metaverse-based product — UI development and API integrations under real production constraints, for a team shipping at speed.",
  },
  {
    year: "2024",
    title: "Going independent",
    text: "Left to build Zamoog — a practice focused on AI automation and software engineering for clients who needed systems, not one-off scripts.",
  },
  {
    year: "2024 — present",
    title: "Agents, pipelines, products",
    text: "AI voice and chat agents, lead-gen engines, CRM builds on GoHighLevel, and two solo-built SaaS products: WorkAmbitions and Quick Photos.",
  },
];

export const APPROACH = [
  {
    number: "01",
    title: "Strategy",
    text: "Before a line of code, I map the actual system — where leads leak, where support repeats itself, where a human is doing a machine's job. The plan comes from the bottleneck, not a template.",
  },
  {
    number: "02",
    title: "Creation",
    text: "Agents, pipelines and integrations get built around that plan — voice and chat agents, scraping and enrichment flows, CRM automations — each piece built to be understood, not just to work.",
  },
  {
    number: "03",
    title: "Execution",
    text: "Shipped, monitored, and handed off with documentation that holds up without me in the room. Systems get iterated against real usage, not left to rot after launch.",
  },
];

export const DEMO_STAGES = [
  {
    key: "person",
    label: "The Person",
    headline: "Who you're actually talking to",
    before: "Hi, are you interested in our services? We help businesses grow.",
    after:
      "Hi Sarah — saw Lumen Outbound is scaling its SDR team. We helped a similar agency book 40% more demos without adding headcount.",
    explain:
      "A generic opener talks to everyone and persuades no one. The effective version names the person, their company, and a context they'll recognize immediately.",
  },
  {
    key: "words",
    label: "The Words",
    headline: "How it's actually said",
    before: "Our platform offers industry-leading automation solutions for your business needs.",
    after:
      "You're probably replying to the same five questions all day. This takes that off your plate by Thursday.",
    explain:
      "Corporate language signals a template. Specific, conversational language signals a person who actually read the brief — and names the exact pain, not a category of pain.",
  },
  {
    key: "next",
    label: "The Next Step",
    headline: "What happens after they read it",
    before: "Let me know if you're interested and we can discuss further.",
    after: "Grab 15 minutes this week → calendly.com/zamoog/intro",
    explain:
      "An open-ended sign-off asks the reader to do the work of deciding. One clear, low-friction action — a single link, a single ask — is what actually gets a reply.",
  },
];

export type Venture = {
  id: string;
  name: string;
  category: string;
  role: string;
  period?: string;
  tagline: string;
  intro: string;
  challenge: string;
  approach: string;
  contribution: string;
  results?: string;
  tech: string[];
  link?: { label: string; href: string };
  size: "lg" | "md" | "sm";
};

export const VENTURES: Venture[] = [
  {
    id: "automations",
    name: "AI Voice & Chat Agent Systems",
    category: "AI & Automation",
    role: "Builder & Systems Architect",
    tagline: "Agents that answer, qualify and book — 24/7.",
    intro:
      "A suite of AI voice and chat agents built for clients losing leads to slow response times. Callers and website visitors get answered instantly, qualified, and routed — no human needed for the first touch.",
    challenge:
      "Missed calls and slow replies were costing clients real pipeline, and support teams were repeating the same qualifying questions all day with no consistent handoff to a human when it mattered.",
    approach:
      "Inbound and outbound voice agents built on Vapi and Retell, WhatsApp and web chat agents backed by OpenAI with RAG over client documentation, and Twilio-powered call routing with human handoff on qualified leads.",
    contribution:
      "Designed and built the full agent logic, call-routing rules, and the handoff criteria — end to end, from first ring to CRM entry.",
    results:
      "Real-time call transcription and summary to CRM, lead-qualification scoring before handoff, multi-language chat support.",
    tech: ["Vapi", "Retell", "OpenAI API", "Twilio", "n8n", "Pinecone"],
    size: "lg",
  },
  {
    id: "leadgen",
    name: "Lead Research & Cold Outreach Engine",
    category: "AI & Automation",
    role: "Builder & Systems Architect",
    tagline: "From scraped list to booked call, automatically.",
    intro:
      "An end-to-end pipeline that finds prospects, enriches their data, and runs personalized outreach across email and LinkedIn — built for agencies that needed pipeline without hiring an SDR team.",
    challenge:
      "Manual prospecting ate hours with little to show for it, outreach felt generic and got ignored, and there was no visibility into what was actually working.",
    approach:
      "Scraping and enrichment pipelines using n8n, Apify and Python, personalized cold-email sequencing with dynamic variables, and LinkedIn automation for connection and follow-up sequences.",
    contribution:
      "Built the enrichment logic, sequencing rules, and reporting layer that let non-technical teams run the whole engine themselves.",
    results:
      "Auto-enriched lead scoring before a message is sent, reply detection that pauses sequences automatically, weekly performance reporting with no manual pulls.",
    tech: ["n8n", "Apify", "Python", "Instantly", "PhantomBuster", "Clay"],
    size: "md",
  },
  {
    id: "products",
    name: "WorkAmbitions & Quick Photos",
    category: "Platforms",
    role: "Solo Founder & Engineer",
    tagline: "Two SaaS products, built end to end.",
    intro:
      "A pair of small SaaS products built solo — from idea to shipped product — alongside a Claude Code application for managing multiple Google Workspace accounts from one place.",
    challenge:
      "Existing tools in the space were bloated or overpriced for what they did, and managing several Google Workspace accounts meant constant context-switching.",
    approach:
      "Scoped each product to a single job done well, built the full stack solo, and shipped fast rather than chasing feature parity with larger competitors.",
    contribution: "Product, design, and engineering — every part of both products, start to finish.",
    tech: ["Next.js", "Supabase", "Stripe", "Python", "Google API"],
    size: "md",
  },
];

export const JOURNAL = [
  {
    number: "01",
    title: "On building agents that don't feel robotic",
    excerpt:
      "The difference between an AI agent people tolerate and one they actually trust usually isn't the model — it's the three seconds before it speaks.",
    href: "https://zamoog.com",
  },
  {
    number: "02",
    title: "Why most cold outreach fails before it's sent",
    excerpt:
      "Most sequences are optimized for volume. The ones that convert are optimized for the five seconds a reader spends deciding whether to keep reading.",
    href: "https://zamoog.com",
  },
  {
    number: "03",
    title: "Shipping solo: lessons from two SaaS products",
    excerpt:
      "Building alone forces a kind of editing you don't get on a team — every feature has to justify its own existence to the one person maintaining it.",
    href: "https://zamoog.com",
  },
];

export const NAV_LINKS = [
  { label: "The Story", href: "#story" },
  { label: "The Work", href: "#work" },
  { label: "The Notes", href: "#notes" },
  { label: "Let's Talk", href: "#contact" },
];
