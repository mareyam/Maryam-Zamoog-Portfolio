// All copy for /zamoog lives here so the story reads in one place.
export const BRAND = "Zamoog";
export const EMAIL = "maryam@zamoog.com";

export const NAV_LINKS = [
  { label: "The problem", href: "#problem" },
  { label: "What we build", href: "#build" },
  { label: "How it works", href: "#journey" },
  { label: "Let’s talk", href: "#contact" },
];

export const SECTIONS = ["Hero", "The problem", "The shift", "What we build", "How it works", "The result", "Let’s talk"];

export const FRUSTRATIONS = [
  "Calls go unanswered while you’re busy with another customer.",
  "Enquiries arrive, and nobody follows up.",
  "Hours disappear into the same repetitive admin.",
  "Customer details are scattered across five different places.",
  "Your software doesn’t talk to each other.",
  "Opportunities slip away because nobody followed up.",
];

export const SERVICES = [
  {
    n: "01",
    title: "AI Voice Agents",
    tagline: "Every call deserves an answer.",
    body: "An intelligent phone assistant picks up when you can’t. It answers common questions, books appointments and captures the caller’s details, so a missed call becomes a booked job.",
    behind: null,
  },
  {
    n: "02",
    title: "Customer Management Systems",
    tagline: "Every customer. One clear picture.",
    body: "Every lead, conversation and sale in one organised place. You can see who needs a reply, who’s ready to buy and who’s gone quiet, and follow up before the moment passes.",
    behind: "Built with GoHighLevel",
  },
  {
    n: "03",
    title: "Business Automation",
    tagline: "Let repetitive work happen automatically.",
    body: "The everyday jobs nobody enjoys happen quietly in the background. Information moves where it needs to go without someone copying it from one place to another.",
    behind: null,
  },
  {
    n: "04",
    title: "Connected Technology",
    tagline: "Your tools should work together.",
    body: "We connect your website, payments, calendar, customer records and the other software you already use, so they share information instead of living in separate boxes.",
    behind: null,
  },
] as const;

export const JOURNEY = [
  {
    title: "A customer sends an enquiry",
    what: "They fill in a short form on your website, whenever suits them, even at midnight.",
    owner: "Nothing to do. You’re not even needed yet.",
  },
  {
    title: "Their details land in one place",
    what: "Their name, number and what they asked for are saved straight into your customer system.",
    owner: "No copying, no sticky notes, no lost messages.",
  },
  {
    title: "They get an instant reply",
    what: "A friendly message goes out straight away, so they know you’ve received their request.",
    owner: "Customers feel looked after within seconds.",
  },
  {
    title: "An assistant follows up",
    what: "If they don’t reply, a polite follow-up is sent. On the phone, a voice assistant can answer and ask the right questions.",
    owner: "Fewer enquiries going cold.",
  },
  {
    title: "They book an appointment",
    what: "They pick a time from your real calendar. No back and forth, no phone tag.",
    owner: "A confirmed slot instead of a conversation chain.",
  },
  {
    title: "You get a notification",
    what: "You see who it is, what they need and when they’re coming.",
    owner: "Everything you need to show up prepared.",
  },
];

export const OUTCOMES = [
  "Fewer missed opportunities.",
  "Faster customer responses.",
  "Less repetitive work.",
  "Better organised operations.",
  "More visibility into your business.",
  "More time to focus on growth.",
];

export const LINKEDIN = "https://www.linkedin.com/in/maryam-naveed-zamoog-n8n-ghl/";

export const AI_USES = [
  "customer queries",
  "receiving calls after work hours / taking orders",
  "handling admin tasks",
  "calculating estimates",
  "managing your CRM",
  "building SaaS products",
  "organizing data",
  "connecting apps and your team together",
  "business cold outreach, finding potential leads and booking appointments",
] as const;
