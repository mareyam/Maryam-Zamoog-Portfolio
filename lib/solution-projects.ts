/** Real portfolio projects (from the portfolio doc), shown under "Solutions" on each industry page. */
export interface SolutionProject {
  title: string;
  point: string;
  href: string;
  /** what the link opens */
  kind: "Video" | "Doc" | "Live app" | "Files";
}

const L = (id: string) => `https://www.loom.com/share/${id}`;

const P = {
  clinicVoice: { title: "Voice AI & multi-channel nurture for a clinic", point: "A voice and chat AI answers calls and texts, and books appointments straight into the calendar. Leads from WhatsApp, landing pages and Meta forms are followed up automatically.", href: L("42eee2302a6e49039e74959739a9c63f"), kind: "Video" },
  a2p: { title: "A2P SMS registration & compliance", point: "SMS registration and opt-in set up for three accounts, so texts are delivered and compliant.", href: L("c7c87c159f3d49a9a8beba2e077ac657"), kind: "Video" },
  vapiQueue: { title: "Call queue, retries & live calendar booking", point: "Calls queue from CRM tags, failed calls retry automatically, and bookings are checked against live calendars.", href: L("141f2f6d4b124ebe849e3c23b82824f0"), kind: "Video" },
  summit: { title: "Speed-to-lead system for a home-services company", point: "A demo system: instant confirmation, AI qualification, then booking, escalation or nurture, with reminders and no-show follow-up.", href: "https://docs.google.com/document/d/1EAG47HLbixvgc5EAZr-GU6KSJ4BA6VUb019GWyfNcF0/edit", kind: "Doc" },
  webinarPay: { title: "Webinar payments & client onboarding", point: "Forms create contacts, payment links and reminders go out, and paid clients move into document collection and booking.", href: L("24809568f4d241039125e7ba44ee21d6"), kind: "Video" },
  proposal: { title: "AI proposal drafter", point: "A request triggers an AI-written proposal in a template, then a ready-to-send email draft.", href: "https://drive.google.com/file/d/1uarP1m0LQ7nIC5mYTq45ok9yAffEKTOg/view", kind: "Files" },
  inbound: { title: "Inbound voice agent that books, reschedules & cancels", point: "A live-call demo: the agent takes a job, books a slot, moves it and cancels it on request.", href: L("1e1178272202494ba7d97ec2ce5ac450"), kind: "Video" },
  k12: { title: "Print-shop voice agent", point: "A live-call demo of booking, updating and cancelling print jobs, with a message history to check each step.", href: L("a9492ffe9016404a8c0a942680ad38f2"), kind: "Video" },
  hype: { title: "Voice lead qualification for a club", point: "Voice agents qualify, follow up, call back and send reminders, and the CRM tracks every outcome.", href: "https://drive.google.com/drive/folders/1NNYgTsTSRdKatiLKunJOCkagAydY59bj", kind: "Files" },
  realtor: { title: "Complete real-estate agent system", point: "Agent registration, listing data, matching listings by email and alerts when a form is signed.", href: "https://drive.google.com/file/d/1J4eFAXDodW_Rnyq15XptR4gn3djN6UXx/view", kind: "Files" },
  gmailBot: { title: "Gmail AI assistant", point: "Classifies incoming mail and replies using attached images and PDFs for context.", href: "https://drive.google.com/file/d/1nUGkkCvkE5obFEziLcyqgTDcCU1n4hTq/view", kind: "Files" },
  swiss: { title: "Multilingual WhatsApp assistant", point: "Answers questions from your documents in the customer's language and logs every conversation.", href: L("445863931a2c4b87aee61805af02945f"), kind: "Video" },
  paw: { title: "WhatsApp product & support assistant", point: "Answers questions about opening hours, certificates and the product catalogue, checked against the source data.", href: L("da5c9a1ba1514821a4925ea1a902638f"), kind: "Video" },
  clay1: { title: "Clay outreach & LinkedIn sequences (part 1)", point: "Multi-step LinkedIn and email campaigns with leads imported from Apollo.", href: L("f4934767201149278eabe98e4979e671"), kind: "Video" },
  clay2: { title: "Lead validation & personalised cold email (part 2)", point: "Emails validated, competitors researched and tailored cold emails sent through Instantly.", href: L("6b54192117e9427ebaf6df5f46baf642"), kind: "Video" },
  smartlead: { title: "Email engagement to LinkedIn connections", point: "Leads who open emails are automatically added to LinkedIn connection campaigns.", href: L("622469d897f947768d8f48b7b7ca4d9b"), kind: "Video" },
  linkedin: { title: "LinkedIn outreach with human approval", point: "Profile visits, reactions and drafted comments, with nothing sent until you approve it.", href: L("81722e64bf494bbd8dfcd8f6c8307bdb"), kind: "Video" },
  clayJobs: { title: "Hiring-company & people search", point: "Finds companies that are hiring and the right decision-makers there, then runs connection campaigns.", href: L("dcba7ae9077b437cb0366df6ccebe5b6"), kind: "Video" },
  telegram: { title: "Lead-gen bot with approval-based outreach", point: "Find, verify and email leads from a Telegram chat; emails go out only once approved.", href: L("69accf9cc36c4f65935f473d6c9f029c"), kind: "Video" },
  heygen: { title: "AI video pipeline with approval", point: "Scripts become avatar videos with captions, saved as drafts and posted once approved.", href: L("f46e315cf85b4c02a9f46ea0eca250ce"), kind: "Video" },
  propertyScraper: { title: "Property scrapers into a database", point: "Weekly and daily scrapers collect new listings, photos and amenities, updating only what changed.", href: L("40d066724cdd4f728252eab0675180d7"), kind: "Video" },
  roomScrapers: { title: "Tenant & listing scrapers", point: "Scheduled scrapers across several sites, with translation, pagination and new-listing flags.", href: L("242be0ceb125472c97b4bc45924ac6d3"), kind: "Video" },
  buffer: { title: "Property posts to Facebook & Instagram", point: "Scrapes listings, writes captions with AI and schedules posts through Buffer automatically.", href: L("d08a08be68af43b1bec04c4320e0763c"), kind: "Video" },
  amazon: { title: "Amazon listing optimiser", point: "Upload your files and get optimised descriptions and keyword recommendations by email.", href: "https://amazon-listing-optimizer-ai.vercel.app/", kind: "Live app" },
  brand: { title: "Brand infringement detector", point: "Scans the web for copycats, scores the risk and sends alerts and reports.", href: "https://docs.google.com/document/d/1tEc304n4Qu6ttBPHjVs4-ELI33amtN6ReRPoHHLtVu8/edit", kind: "Doc" },
  pdf: { title: "PDF data extraction", point: "Pulls quantities, prices and names out of PDFs into clean documents.", href: L("b7664496fa2d4d2d9e48faed43e0b047"), kind: "Video" },
  airtableSlack: { title: "Two-way Airtable & Slack sync", point: "Comments flow both ways, so your team stays in sync without switching tools.", href: L("8949237682634370865b27d48e8eb725"), kind: "Video" },
  chatApp: { title: "Voice & text chat app", point: "A Next.js assistant that takes typed or spoken messages and replies, powered by automation workflows.", href: "https://m11-chatbot.vercel.app/", kind: "Live app" },
  videoApp: { title: "Video-to-text chatbot app", point: "Upload a video, get a transcript and summary, then chat about it.", href: L("b1d217e42b7e4fc2a770675dcad35891"), kind: "Video" },
  gym: { title: "Membership retention dashboard", point: "Sorts members by status and sends AI-written win-back and payment-reminder emails.", href: L("50da0565cd434863acd0321e06815365"), kind: "Video" },
  bootcamp: { title: "Webinar-to-course email funnel", point: "Registration, reminders, post-webinar sequences and payment follow-ups that stop once someone pays.", href: L("63402821bfa748d8a0b3c42d77a250fd"), kind: "Video" },
  tax: { title: "Client onboarding for a tax office", point: "Contracts, intake forms and webinar registration, with the right preparer notified automatically.", href: L("858bbb1628424da2bd97484a6cb9aebc"), kind: "Video" },
  fpv: { title: "Daily news digest to WhatsApp", point: "Collects news from several sources, summarises it and sends it as a daily message.", href: L("2b10623206bc48e8a097cdb2e56dfb66"), kind: "Video" },
  google: { title: "Google Workspace assistant", point: "Drafts and replies to email, organises files, and creates docs, forms and sheets on request.", href: L("e136f0c3a1764053bf4b86dc4c921cc2"), kind: "Video" },
} satisfies Record<string, SolutionProject>;

export const solutionProjects: Record<string, SolutionProject[]> = {
  "digital-marketing-agencies": [P.clay1, P.clay2, P.smartlead, P.linkedin, P.clayJobs, P.heygen],
  "real-estate-home-services": [P.summit, P.realtor, P.propertyScraper, P.buffer, P.roomScrapers],
  "e-commerce": [P.amazon, P.brand, P.pdf, P.heygen],
  saas: [P.chatApp, P.videoApp, P.airtableSlack, P.google, P.proposal],
  "professional-services": [P.proposal, P.webinarPay, P.tax, P.gmailBot, P.google],
  "healthcare-dental": [P.clinicVoice, P.a2p, P.vapiQueue, P.inbound],
  "beauty-fitness": [P.gym, P.clinicVoice, P.inbound, P.a2p],
  "accounting-law-insurance": [P.tax, P.webinarPay, P.pdf, P.proposal],
  "hospitality-food": [P.inbound, P.hype, P.paw, P.vapiQueue],
  "education-coaching": [P.bootcamp, P.webinarPay, P.swiss, P.heygen],
  "recruitment-staffing": [P.clayJobs, P.clay1, P.clay2, P.linkedin, P.telegram],
  "manufacturing-logistics": [P.k12, P.pdf, P.airtableSlack, P.vapiQueue],
  "automotive-dealerships": [P.hype, P.vapiQueue, P.inbound, P.clinicVoice],
  others: [P.google, P.gmailBot, P.fpv, P.paw, P.swiss],
};
