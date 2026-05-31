import Image from "next/image";

type Tool = {
  name: string;
  img?: string;
  svg?: React.ReactNode;
};

function Badge({
  bg,
  text,
  textColor = "white",
}: {
  bg: string;
  text: string;
  textColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9"
    >
      <rect width="48" height="48" rx="8" fill={bg} />
      <text
        x="50%"
        y="54%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={textColor}
        fontSize="9"
        fontWeight="bold"
        fontFamily="system-ui,sans-serif"
      >
        {text}
      </text>
    </svg>
  );
}

function Icon({ tool }: { tool: Tool }) {
  if (tool.img) {
    return (
      <Image
        src={tool.img}
        alt={tool.name}
        width={36}
        height={36}
        className="w-9 h-9 object-contain"
        unoptimized
      />
    );
  }
  return <>{tool.svg}</>;
}

const categories: { heading: string; tools: Tool[] }[] = [
  {
    heading: "Automation",
    tools: [
      { name: "n8n", img: "https://cdn.simpleicons.org/n8n/EA4B71" },
      { name: "Make", img: "https://cdn.simpleicons.org/make/6D00CC" },
      { name: "Zapier", img: "https://cdn.simpleicons.org/zapier/FF4A00" },
      { name: "UiPath", img: "https://cdn.simpleicons.org/uipath/FA4616" },
    ],
  },
  {
    heading: "CRM & Sales",
    tools: [
      { name: "GoHighLevel", svg: <Badge bg="#00BF63" text="GHL" /> },
      { name: "HubSpot", img: "https://cdn.simpleicons.org/hubspot/FF7A59" },
      {
        name: "Salesforce",
        img: "https://cdn.simpleicons.org/salesforce/00A1E0",
      },
      { name: "Zoho CRM", img: "https://cdn.simpleicons.org/zoho/C8202B" },
      {
        name: "Monday CRM",
        img: "https://cdn.simpleicons.org/mondaydotcom/FF3750",
      },
    ],
  },
  {
    heading: "Lead Generation",
    tools: [
      { name: "Clay", svg: <Badge bg="#1A1A1A" text="Clay" /> },
      { name: "Apollo", svg: <Badge bg="#1F2937" text="Apollo" /> },
      { name: "Instantly", svg: <Badge bg="#6366F1" text="Instantly" /> },
      { name: "Smartlead", svg: <Badge bg="#7C3AED" text="SmartLead" /> },
      { name: "Lemlist", svg: <Badge bg="#FF6B6B" text="lemlist" /> },
      { name: "Saleshandy", svg: <Badge bg="#0062FF" text="Saleshandy" /> },
      { name: "Hunter", img: "https://cdn.simpleicons.org/hunterio/F26B22" },
      { name: "Snov.io", svg: <Badge bg="#F97316" text="Snov.io" /> },
      { name: "PhantomBuster", svg: <Badge bg="#7C3AED" text="Phantom" /> },
      {
        name: "Linkedin Sales Navigator",
        svg: <Badge bg="#0077B5" text="LinkedHelper" />,
      },
    ],
  },
  {
    heading: "Data & Scraping",
    tools: [
      { name: "Apify", img: "https://cdn.simpleicons.org/apify/1BB44F" },
      { name: "iScrape", svg: <Badge bg="#0EA5E9" text="iScrape" /> },
      { name: "SerpAPI", svg: <Badge bg="#22C55E" text="SerpAPI" /> },
    ],
  },
  {
    heading: "AI & LLMs",
    tools: [
      { name: "OpenAI", img: "https://cdn.simpleicons.org/openai/000000" },
      { name: "Claude", svg: <Badge bg="#D97757" text="Claude" /> },
      {
        name: "Gemini",
        img: "https://cdn.simpleicons.org/googlegemini/8E75B2",
      },
      {
        name: "Perplexity",
        img: "https://cdn.simpleicons.org/perplexity/1FB8CD",
      },
      { name: "Groq", svg: <Badge bg="#F55036" text="Groq" /> },
      { name: "Mistral", img: "https://cdn.simpleicons.org/mistral/FF7000" },
      { name: "LangChain", svg: <Badge bg="#1C3C3C" text="LangChain" /> },
      { name: "LangGraph", svg: <Badge bg="#1C3C3C" text="LangGraph" /> },
    ],
  },
  {
    heading: "AI Voice",
    tools: [
      { name: "VAPI", svg: <Badge bg="#5B21B6" text="VAPI" /> },
      { name: "Retell AI", svg: <Badge bg="#0EA5E9" text="Retell" /> },
      {
        name: "ElevenLabs",
        img: "https://cdn.simpleicons.org/elevenlabs/000000",
      },
      {
        name: "Twilio Voice",
        img: "https://cdn.simpleicons.org/twilio/F22F46",
      },
    ],
  },
  {
    heading: "Communication",
    tools: [
      { name: "WhatsApp", img: "https://cdn.simpleicons.org/whatsapp/25D366" },
      { name: "Telegram", img: "https://cdn.simpleicons.org/telegram/26A5E4" },
      { name: "Slack", img: "https://cdn.simpleicons.org/slack/4A154B" },
      { name: "Discord", img: "https://cdn.simpleicons.org/discord/5865F2" },
    ],
  },
  {
    heading: "Databases",
    tools: [
      { name: "Supabase", img: "https://cdn.simpleicons.org/supabase/3ECF8E" },
      {
        name: "PostgreSQL",
        img: "https://cdn.simpleicons.org/postgresql/4169E1",
      },
      { name: "MongoDB", img: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Firebase", img: "https://cdn.simpleicons.org/firebase/FFCA28" },
      { name: "Airtable", img: "https://cdn.simpleicons.org/airtable/18BFFF" },
    ],
  },
  {
    heading: "Web Development",
    tools: [
      { name: "Next.js", img: "https://cdn.simpleicons.org/nextdotjs/000000" },
      { name: "Python", img: "https://cdn.simpleicons.org/python/3776AB" },
    ],
  },
  {
    heading: "Payments",
    tools: [
      { name: "Stripe", img: "https://cdn.simpleicons.org/stripe/635BFF" },
      { name: "PayPal", img: "https://cdn.simpleicons.org/paypal/00457C" },
    ],
  },
  {
    heading: "Project Management",
    tools: [
      { name: "Notion", img: "https://cdn.simpleicons.org/notion/000000" },
      { name: "ClickUp", img: "https://cdn.simpleicons.org/clickup/7B68EE" },
      { name: "Asana", img: "https://cdn.simpleicons.org/asana/F06A6A" },
      { name: "Trello", img: "https://cdn.simpleicons.org/trello/0052CC" },
      {
        name: "Monday.com",
        img: "https://cdn.simpleicons.org/mondaydotcom/FF3750",
      },
    ],
  },
  {
    heading: "Marketing",
    tools: [
      { name: "Meta Ads", img: "https://cdn.simpleicons.org/meta/0081FB" },
      {
        name: "Google Ads",
        img: "https://cdn.simpleicons.org/googleads/4285F4",
      },
      {
        name: "Google Analytics",
        img: "https://cdn.simpleicons.org/googleanalytics/E37400",
      },
      {
        name: "GTM",
        img: "https://cdn.simpleicons.org/googletagmanager/246FDB",
      },
      {
        name: "LinkedIn Ads",
        img: "https://cdn.simpleicons.org/linkedin/0A66C2",
      },
    ],
  },
];

export default function Tools() {
  return (
    <section className="px-4 sm:px-10 py-16 bg-white border-t border-black">
      <h2 className="text-md sm:text-md uppercase tracking-widest text-black mb-12 font-medium">
        Tools we work with
      </h2>
      <div className="flex flex-col gap-12">
        {categories.map((cat) => (
          <div key={cat.heading}>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-black/40 mb-5 font-medium border-b border-black/10 pb-2">
              {cat.heading}
            </p>
            <div className="grid grid-cols-10 gap-x-2 gap-y-4 items-start justify-items-center">
              {cat.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-9 h-9 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Icon tool={tool} />
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-black/40 tracking-wide text-center leading-tight max-w-[56px]">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
