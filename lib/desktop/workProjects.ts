// Project write-ups shown in the Work app. Text is taken from the portfolio notes; `note`
// carries the caveats from those notes (shared videos, "based on description only", etc.).
export interface SummaryProject {
  id: string;
  group: string;
  /** Original numbering within its group, when it has one. */
  number?: string;
  title: string;
  bullets: string[];
  note?: string;
}

export const FDE_GROUP = "Claude / Forward Deployed Business Solutions";

export const WORK_GROUPS = [
  "GoHighLevel",
  FDE_GROUP,
  "WhatsApp Agents & Voice AI",
  "Clay / Outreach / Cold Email / LinkedIn",
  "Content Creation",
  "Custom Scraping",
] as const;

export const SUMMARY_PROJECTS: SummaryProject[] = [
  // ---------------------------------------------------------- GoHighLevel
  {
    id: "ghl-01", group: "GoHighLevel", number: "01",
    title: "GoHighLevel Voice AI and Multi-Channel Nurture for a Clinic and a Loan Company",
    bullets: [
      "A voice AI agent for a clinic handles inbound and outbound calls, shows call outcomes (one example is marked 98% positive), and books appointments into the GoHighLevel calendar with the caller’s name and the treatment they are interested in.",
      "A Conversation AI agent does the same kind of work over text, including summaries of the chat and appointment booking saved in the same calendar format.",
      "New leads can arrive from a WhatsApp booking link, a consultation landing page, or a Meta form; each source is tagged in GoHighLevel so the team can see how the person booked.",
      "When a lead comes in, the system can message them, wait about a minute, then place a Vapi call; if they do not book, they enter a slower long-term nurture that can run for about two months, and they are removed if a “booked” tag is applied.",
      "A second setup for Allstate Fund Pros (a loan offer) uses a tag to trigger a webhook/Vapi call, logs outcomes such as booked, not interested, or callback, can delete contacts who are not interested, and then sends a survey/document whose signed or reviewed status is tracked with reminders until it is done.",
    ],
  },
  {
    id: "ghl-a2p", group: "GoHighLevel", number: "A2P",
    title: "A2P Registration and SMS Compliance Setup for Three GoHighLevel Accounts",
    bullets: [
      "A2P (application-to-person SMS) registration was completed as a setup for three GoHighLevel accounts; the walkthrough shows each account’s Trust Center and phone-number status.",
      "In the accounts shown, Trust Center setup is completed; some phone numbers are already verified, while others are still in progress or pending.",
      "The process includes adding policies and terms-and-conditions pages, plus use-case and message-case descriptions required for registration.",
      "The opt-in phone-number form is removed from regular forms so that number collection is not handled in a separate form.",
      "A chatbot is used for opt-in instead, so compliance opt-in happens in the chat rather than through an extra phone-number form.",
    ],
  },
  {
    id: "ghl-02", group: "GoHighLevel", number: "02",
    title: "Vapi + GoHighLevel Voice System: n8n Booking and Callback Flows, Call Queue, Retries, and Live Calendar Booking",
    bullets: [
      "This is the n8n side of a voice-calling system (Loom description: “for zabeel”) that works with GoHighLevel tags and calendars.",
      "After a consultation is booked, a booking flow waits three minutes, then sends a confirmation message (the delay was added because calendar fields were not updating during earlier tests).",
      "A “book meeting” tool checks three calendars in real time — including Dubai, Shahjahan, and an online calendar — and either books the slot or tells the caller it is not available.",
      "If the caller asks for WhatsApp, the contact is tagged “WhatsApp requested” and the linked n8n/GoHighLevel workflow runs.",
      "A separate callback path takes a date and schedules a callback.",
      "A standing queue flow watches GoHighLevel for tags such as first call, callback, and follow-up, then places the Vapi call for those contacts.",
      "When Vapi returns a 503 error, the older system left the contact on “no action” and never called again; the new flow emails a log of failed contacts and re-applies the first-call tag so they are queued again.",
      "Failed 503 calls are retried because the call never reached the person, so the retry is not treated as spam (this was tested).",
      "If a call lasts less than 9 seconds, the contact goes to follow-up; if it lasts longer, the conversation is processed and the contact is routed using existing tags.",
    ],
  },
  {
    id: "ghl-05", group: "GoHighLevel", number: "05",
    title: "Summit Home Services: HVAC Speed-to-Lead Marketing and AI Qualification System",
    bullets: [
      "Built for a fictional client, Summit Home Services (HVAC, plumbing, and electrical within a 35-mile area), the system is designed around speed-to-lead: leads already come in, but slow follow-up loses jobs to competitors.",
      "The offer is a free same-day estimate (“Request My Free Estimate”); an automated SMS/email confirmation goes out immediately, while human follow-up and booking happen during Monday–Saturday, 8 AM–6 PM.",
      "After the landing-page form, GoHighLevel creates the contact and opportunity, tags the source, and an AI qualifier checks urgency, service type, ZIP, homeowner status, and timing, then routes the lead to book directly, escalate to a human, or enter nurture.",
      "Booked leads get confirmation plus two reminders, no-shows get a reactivation sequence, and people who do not book get a 1-day / 3-day nurture that stops once they book; emergencies skip the booking link and go to immediate human follow-up.",
      "After-hours, a Vapi AI agent can handle qualification; during 9 AM–5 PM, calls are meant to go to a human. The doc also includes brand direction, three social posts, testing notes (Vapi free-plan concurrency is a limitation), and a weekly maintenance handoff.",
    ],
  },
  {
    id: "ghl-06", group: "GoHighLevel", number: "06",
    title: "GoHighLevel Webinar Payments and Client Intake / Onboarding Automation",
    bullets: [
      "Two webinar forms (tier 1/3 and tier 2/4) create GoHighLevel contacts, email a purchase link, apply a partner-tier discount code (one example is a 250 discount for a tier 4 partner), and keep unpaid contacts in a follow-up sequence (for example after 48 hours) until they pay, then remove them from that sequence.",
      "Stripe is intended to complete the purchase step; in the walkthrough the payment provider was not yet configured, so a live successful-payment test could not be shown, but a successful payment is meant to move the contact into onboarding.",
      "A client intake form emails the team that a submission is under review and emails the client a client-portal folder link to upload documents; uploads are flagged, and missing uploads are marked “document pending.”",
      "A reviewer marks documents complete or incomplete on the contact record; incomplete files trigger a “missing items” email (with details entered on the contact) and further reminders, while complete files trigger a booking-link email.",
      "If the client does not book, a reminder goes out after about 24 hours and continues until they schedule; once they book on the onboarding calendar, the contact is marked scheduled, the appointment appears in the GoHighLevel client onboarding calendar, and a confirmation email is sent. In the demo that calendar was still disabled and needed to be turned on to finish testing.",
    ],
  },
  {
    id: "ghl-07", group: "GoHighLevel", number: "07",
    title: "Make.com GoHighLevel Pipeline for Outreach, Calls, Onboarding, and Payments",
    bullets: [
      "Email and SMS sequences start when pipeline stages or tags change, and progress is tracked in GoHighLevel.",
      "After a contract is signed, an onboarding sequence runs and the team is notified; signing itself is tracked as part of that process.",
      "The system covers outbound cold email, onboarding email, and WhatsApp handoff after a call.",
      "Inbound calls are handled so leads are saved, and call outcomes are logged on the contact record; leads can also be pushed into GoHighLevel from CSV, Clay, or Instantly.",
      "Stripe payments are part of the same pipeline, according to the portfolio description.",
    ],
    note: "Based on the portfolio description only. The five Google Drive files were private and could not be opened.",
  },
  {
    id: "ghl-08", group: "GoHighLevel", number: "08",
    title: "After-Proposal Follow-Up: Gmail to GoHighLevel Contact Match and SMS",
    bullets: [
      "The public file is an n8n workflow screenshot named “after proposal sent.”",
      "It starts by watching Gmail for emails.",
      "It then searches contacts in GoHighLevel.",
      "It posts to a webhook node labeled “send sms to ghl node,” so an SMS is sent through GoHighLevel.",
      "The workflow is shown as Inactive. The portfolio line “tracks lead engagement” is not visible as a separate step in this screenshot.",
    ],
  },
  {
    id: "ghl-10", group: "GoHighLevel", number: "10",
    title: "AI Proposal Drafter: Claude, Google Docs Template, and Gmail Delivery",
    bullets: [
      "This n8n workflow is named “send proposal draft email” and matches the AI Proposal Drafter heading.",
      "A custom webhook starts the run (for example when another system requests a proposal).",
      "Anthropic Claude generates the proposal content from a prompt.",
      "Google Docs creates the proposal from a document template.",
      "Gmail then creates a draft and sends the email. The workflow is shown as Inactive.",
    ],
  },
  {
    id: "ghl-11", group: "GoHighLevel", number: "11",
    title: "PDS Lead-Capture Workflow: Form Submit to Tags, Opportunities, SMS, and Email",
    bullets: [
      "The public folder is named “PDS Complete Lifecycle System,” but the only public file is a GoHighLevel workflow screenshot for lead capture, and the bottom of the screenshot is cropped.",
      "The workflow starts when a form is submitted and the form is any of “PDS.”",
      "The next visible steps are Add Tag, then Create or Update Opportunity.",
      "It then sends an SMS and an email, then creates or updates the opportunity again.",
      "After a Wait step it sends another SMS, then at least one further step (an Add Tag step is partly visible at the bottom). This screenshot alone does not document a full lifecycle beyond lead capture.",
    ],
  },
  {
    id: "ghl-ext-01", group: "GoHighLevel",
    title: "Webinar-to-Bootcamp Email Funnel with Payment Reminders (GoHighLevel)",
    bullets: [
      "A landing page form starts a workflow that sends an internal alert and a first confirmation email.",
      "Reminder emails go out 10, 3, 2 and 1 days before the webinar, plus on the morning it happens.",
      "After the webinar, a tag moves attendees into a bootcamp email sequence that links to a separate bootcamp landing page.",
      "People who sign up get payment-link reminders for 9 to 10 days and are removed from that sequence as soon as they pay.",
      "Buyers get a payment alert, a welcome email, the session link, workbook reminders, and emails up to and on the start date (October 14).",
    ],
  },
  {
    id: "ghl-ext-02", group: "GoHighLevel",
    title: "Client Onboarding System for a Tax Office: Contracts, Webinars and Intake Forms (GoHighLevel)",
    bullets: [
      "Workflow email sequences are set up for the client to review the wording.",
      "Contracts, policies, terms and the partner agreement now live in GoHighLevel and can be edited there by unpublishing and republishing, with no need for Google Drive.",
      "Registration pages for the Monday and Friday webinars send confirmation emails and add-to-calendar links.",
      "A client intake form has required fields and a selfie upload. It sends a notification to whichever tax preparer the client picks (Jessica or Tamaria) and to the in-office staff.",
      "Welcome emails are updated, past contacts are imported, and there's an NDA form and a Cognito form.",
    ],
  },
  // ---------------------------------------------------------- Claude / Forward Deployed Business Solutions
  {
    id: "fde-01", group: FDE_GROUP, number: "01",
    title: "Google Workspace MCP Assistant for Gmail, Drive, Docs, Forms, and Sheets",
    bullets: [
      "Two Looms titled “Google MCP p1” and “Google MCP p2” walk through an assistant that can work across Google Workspace apps, including drafts, Drive files, Docs, Forms, and Sheets.",
      "In Gmail, it can create and update drafts (for example changing “first draft” to “second draft” text), add a signature automatically, fetch recent emails, reply to a message, and forward an email.",
      "In Google Drive, it can move a file to another folder (the demo uses a file named ResultMedSpa.png) and can delete a folder, covering delete and trash behavior.",
      "It can create a shared drive and a Google Doc inside it; the presenter notes that shared drives work only with Google Workspace, and in the demo the shared-drive list did not always refresh immediately.",
      "It can create a Google Form, then follow up by adding a prefix to the form options, and it also covers Google Sheets.",
    ],
  },
  {
    id: "fde-02", group: FDE_GROUP, number: "02",
    title: "HVAC Lead Scraper with Website Scoring and AI Call Screening (GoHighLevel)",
    bullets: [
      "A Python Selenium scraper pulls HVAC companies from HVACInformed by product area: names, profile links, phone numbers, addresses and websites.",
      "Serper looks up each company to check its opening hours, whether it's still in business, and how good or outdated its website is, then writes a short summary.",
      "The results go into Google Sheets, with a new sheet for each product area, and then into GoHighLevel as contacts.",
      "A voice AI agent calls each contact to find out whether a human, an AI receptionist or voicemail picks up, and tags them to match. Calls are tested both during and after 9-to-5 hours.",
      "Companies already using AI are dropped as non-ICP. The rest go to a pipeline where human sales reps push them to book an appointment.",
    ],
  },
  {
    id: "fde-03", group: FDE_GROUP, number: "03",
    title: "Gym Membership Retention Dashboard with AI Email Campaigns (Spark Membership)",
    bullets: [
      "A dashboard sorts members by status: leads not yet contacted, active memberships, cancellations, past-due payments, and at-risk or trial members based on attendance.",
      "AI writes win-back or payment-reminder emails that can go to one person or the whole group, and they're sent through a queue.",
      "A marketing section lets you create email templates from a rough idea, such as “20% off the first month”.",
      "A campaign builder that works like GoHighLevel chains emails with wait steps and targets people by membership status.",
      "Spark Membership has no API, so Google Sheets acts as the database. Grok's computer-use agent logs in with the email and password to pull the data, since Claude blocks that login.",
    ],
  },
  {
    id: "fde-04", group: FDE_GROUP, number: "04",
    title: "Brand Infringement Detector with AI Risk Scoring, Alerts, and Enforcement",
    bullets: [
      "A scheduled job reads protected brands or copyrights from Google Sheets, then searches the web (SERP) for possible name, company, product, or reference matches and skips anything already stored.",
      "Text results are analyzed by GPT (the doc names GPT-5-mini) for trademark infringement. Images are found with Google Lens, downloaded, and compared with GPT-4o against reference images.",
      "Each finding gets a 0–100 risk score (70–100 high, 40–69 medium, 0–39 low). Text detection only continues with scores of 40 or more, and evidence (URL, text, images, brand, product, score, reasoning, authenticity, and verdict) is saved to Google Sheets.",
      "Findings at 40 or above trigger a Gmail alert. The process document describes marking items for review and sending a Cease & Desist email; a later section also describes routing by action taken (C&D, DMCA, Monitor, or Dismiss), while an earlier “current limitation” note says that version did not yet include DMCA, Monitor/Dismiss routing, or report generation.",
      "Report workflows include a weekly low/medium email report and immediate simple, detailed, and high-risk reports that update a document and send it by email.",
    ],
  },
  {
    id: "fde-05", group: FDE_GROUP, number: "05",
    title: "Amazon Listing Optimizer with Python, n8n, and a File-Upload Web App",
    bullets: [
      "Users submit three files — a scrape document (CSV), a keyword document (CSV), and an Amazon document — plus product URLs and an email, through the live app at amazon-listing-optimizer-ai.vercel.app. A Gmail address is requested so outputs can be shared as editable Google files.",
      "An n8n webhook receives the upload, creates Google Drive copies of the three documents, preprocesses each file, and appends data to Google Sheets before a Python script runs the main optimization.",
      "The script matches field names from the scrape doc with values from the Amazon doc, uses the keyword doc for open fields, and uses scrape.do to read the live Amazon page for things such as brand name, target audience, size, and color, including values found on the page but missing from the uploaded docs.",
      "AI then writes descriptions and scores keywords by how often they appear, to recommend the best backend keywords.",
      "Results are emailed as clickable links to the optimized keyword and open-fields sheets, logged in an email sheet, and followed up at 24 and 48 hours only if that user has not already received the first results email.",
    ],
  },
  // ---------------------------------------------------------- WhatsApp Agents & Voice AI
  {
    id: "wa-01", group: "WhatsApp Agents & Voice AI", number: "01",
    title: "Daily FPV Drone News Scraper that Posts Summaries to WhatsApp",
    bullets: [
      "News is gathered from several sources (the walkthrough names Rens plus YouTube, Reddit, and Twitter, each with its own prompt) and uploaded to a Google Sheet for parsing.",
      "Source-specific prompts can be edited, and a day’s sources are skipped when there is no new data (the demo shows no YouTube or “WordScreen” items that day).",
      "An AI agent merges and parses the collected news, extracts the required fields, and produces a summary with the text and the source it came from.",
      "Because WhatsApp limits a message to 4,000 characters (the transcript says “vectors”), longer output is split into smaller messages before it is sent.",
      "A public output spreadsheet lists daily news Google Docs (for example entries dated 11/6/2025–11/13/2025).",
    ],
  },
  {
    id: "wa-02", group: "WhatsApp Agents & Voice AI", number: "02",
    title: "Multilingual RAG WhatsApp Assistant for the Swiss Canine Federation",
    bullets: [
      "The system answers federation questions from documents, including topics such as agility timing (about 10–20 seconds, depending on obstacles and difficulty) and why distance matters in training.",
      "It first identifies the user’s language and can reply in that language; the demo tests English, Italian, and German and logs the language used.",
      "Answers are routed by department (for example agility vs. training). Source PDFs live in Google Drive and are stored in a Pinecone vector store, which only needs to be loaded at the start.",
      "Each turn is logged with identifiers such as conversation ID or phone number, the user message, the department, and the answer, and existing records are updated rather than always creating a new one.",
      "The Loom title is “RAG Whatsapp for Swiff Canine Federation.” The presenter also mentions testing a Gmail trigger next; the video ends while describing create-vs-update record logic.",
    ],
  },
  {
    id: "wa-03", group: "WhatsApp Agents & Voice AI", number: "03",
    title: "PAW Superchat WhatsApp RAG Agent for Product and Support Questions",
    bullets: [
      "When a user greets the bot (for example “hi” or “good morning”), it asks for their name, because the workflow does not otherwise know when a conversation with a given user starts or ends.",
      "In testing, it answered questions about headquarters location, opening hours, and a telephone number for reaching the team.",
      "It also handled certificate questions (including whether a named certificate exists and a download link), social-media links taken from the homepage, the product catalog, flyers, and where to find a product serial number.",
      "Product answers were checked against an article-data page, including a side-by-side comparison that matched (one example is “three fetch”), and missing fields were flagged.",
      "The presenter says none of the tested questions crashed the bot or returned the wrong information.",
    ],
  },
  {
    id: "wa-04", group: "WhatsApp Agents & Voice AI", number: "04",
    title: "SwiftUI and Python Video-to-Text Chatbot with n8n and OpenRouter",
    bullets: [
      "This is a SwiftUI and Python app, integrated with n8n, whose main feature is uploading a video, transcribing it, summarizing it, and chatting about that video.",
      "The Python backend uploads the file to CloudConvert, converts it to MP3, then runs transcription and summarization; job status is polled until those steps finish.",
      "A chat panel already knows which video is in context, so the user can ask for the transcript or summary without copying it over, and PDFs can also be uploaded and questioned.",
      "Chat uses OpenRouter rather than a single GPT model, so the user can switch among multiple models.",
      "The Loom also mentions n8n-based extras such as email and calendar. A public GitHub path is given in the Loom title: Video-to-Text FastAPI for SwiftUI (videototext.py).",
    ],
  },
  {
    id: "wa-05", group: "WhatsApp Agents & Voice AI", number: "05",
    title: "Inbound Voice Agent that Books, Reschedules, and Deletes Appointments",
    bullets: [
      "The Loom titled “Inbound calling” is a live call demo, not a system-architecture walkthrough, and the transcript is very short.",
      "In the demo, the caller asks to have 20 business cards printed and books the job for 9 AM the next day, giving a name, email, and phone number.",
      "The booking is then changed to 12 PM.",
      "The caller asks to delete the appointment, and the agent confirms that it has been deleted.",
      "The portfolio heading also mentions inbound booking CRUD and GoHighLevel integration, but GHL is not described in this short spoken demo, so that part is not confirmed here.",
    ],
  },
  {
    id: "wa-06", group: "WhatsApp Agents & Voice AI", number: "06",
    title: "Next.js Voice and Text Chat App Connected to n8n Cloud",
    bullets: [
      "The live app at m11-chatbot.vercel.app is a Next.js page titled “AI Voice Assistant,” with a text box, a send button, a microphone button, and a Clear Chat control.",
      "The interface tells the user to start a conversation by typing or using voice input.",
      "The public frontend sends text and recorded audio (WebM, including a base64 audio path) to n8n Cloud webhooks, then shows the text reply and can play audio back.",
      "The portfolio heading calls this a Google Search / Apify chatbot (n8n + Next.js). Google Search and Apify are not visible in the public frontend, so those backend tools are not confirmed from the live page alone.",
      "The page still uses the default “Create Next App” metadata title.",
    ],
  },
  {
    id: "wa-07", group: "WhatsApp Agents & Voice AI", number: "07",
    title: "K12 Prints Inbound Voice Agent for Print-Job Booking and Cancellation",
    bullets: [
      "The Loom titled “Inbound calling K12 Prints” is another live inbound-call demo for a print shop.",
      "The caller asks to have 20 notebooks printed, confirms that the content is ready, and books the job for 10 AM the next day.",
      "The existing 10 AM booking is then updated to 11 AM, using a name and email.",
      "The caller asks to delete the appointment (and a second appointment); the system shows the booking as cancelled and the last time as 11 AM.",
      "A message-history view is shown so the create, update, and cancel steps can be checked.",
    ],
  },
  {
    id: "wa-08", group: "WhatsApp Agents & Voice AI", number: "08",
    title: "HYPE Club Voice Lead-Qualification System with Vapi, n8n, and GoHighLevel",
    bullets: [
      "The public Drive folder is titled “n8n ghl retell vapi.” Visible sources are Vapi, an n8n webhook workflow, a ConvoFlow (GoHighLevel-style) CRM, and a long “Maya v8.7.3” follow-up agent prompt. No Retell-branded screen was in the public screenshots; a Demo.mp4 in the folder was not transcribed.",
      "In Vapi, under a Hype Club workspace, assistants include Lead Qualification (Ron and other variants), a Follow up agent, a Callback agent, Meeting Reminder, and Meeting Missed. One published assistant opens with “Hi is this {{name}}?” and includes a rule not to end the call on an engaged question.",
      "The Maya document is a follow-up calling script for HYPE Club (Abu Dhabi in the prompt; a ConvoFlow sub-account is labeled HypeClub Dubai). It uses variables for name, summary, and current time, has only an end-call tool, persists for WhatsApp capture, and includes FAQ and objection handlers.",
      "An n8n workflow named “IB Webhook” is shown as Active and, after a webhook, searches or creates contacts, applies tags, and handles outcomes such as WhatsApp requested and appointments.",
      "ConvoFlow opportunity stages include pending calls, appointment booked, WhatsApp requested, callback, interested / no meeting, not interested, no action, follow-up, unreachable, wrong number, and first call. A “March Dashboard” for another ConvoFlow location shows figures such as 198 leads, 23 meetings scheduled, 20 meetings attended, and AED 32.6K won revenue in the last 30 days.",
    ],
  },
  {
    id: "wa-09", group: "WhatsApp Agents & Voice AI", number: "09",
    title: "n8n Real Estate Agent Workflow (linked as a Telegram chatbot)",
    bullets: [
      "The tinyurl for “telegram-real-estate-chatbot” opens a screenshot of an n8n workflow board, not a Telegram-bot chat screen.",
      "Visible left-hand flows include registering a real-estate agent, getting property-manager listing data, emailing new listings, searching and sending matching listings, and alerting an agent when a form is signed.",
      "A central AI/voice agent flow handles messages and delegates work to downstream tools, with additional scenes for appointments, WhatsApp, and related operations.",
      "This screenshot is very similar to the “Complete Realtor System” image (Custom Scraping 04), which is clearly labeled “Real Estate Agent V2.”",
      "Because a distinct Telegram interface is not visible in this file, a Telegram-only description cannot be confirmed from the linked screenshot.",
    ],
  },
  {
    id: "wa-10", group: "WhatsApp Agents & Voice AI", number: "10",
    title: "Gmail AI Chatbot that Classifies Mail and Replies with File Context",
    bullets: [
      "The linked screenshot is an n8n workflow that starts with a Gmail Trigger, then Wait, Limit, and an OpenAI email-classification step.",
      "After classification, the workflow retrieves the Gmail message and branches by type of content.",
      "One branch pulls a file from Google Drive, analyzes an image with OpenAI, generates a response, and sends a Gmail reply.",
      "A second branch pulls a Drive file, extracts text from a PDF, generates a response, and sends a Gmail reply.",
      "A third branch generates a text-only response and sends a Gmail reply.",
    ],
  },
  // ---------------------------------------------------------- Clay / Outreach / Cold Email / LinkedIn
  {
    id: "clay-01", group: "Clay / Outreach / Cold Email / LinkedIn", number: "01",
    title: "Clay Outreach Intro, Part 1: Campaigns, LinkedIn Sequence, and Lead Import",
    bullets: [
      "The Loom is titled “Intro P1” and is the first half of a two-part intro (project 02 is “Intro P2”).",
      "It includes a client campaign for London hotels with a three-step sequence.",
      "A LinkedIn automation ran over three days: visit the person’s profile and mark it as visited, then react and comment on their latest post, then send a connection request with a custom message based on their name and headline.",
      "Recent work also used Clay-style lead generation, including a list imported from Apollo and aimed at HR and director titles.",
      "The video ends as the presenter starts that Apollo import and says a second video will continue.",
    ],
  },
  {
    id: "clay-02", group: "Clay / Outreach / Cold Email / LinkedIn", number: "02",
    title: "Clay Outreach Intro, Part 2: Email Validation, Competitor Research, and Instantly",
    bullets: [
      "This “Intro P2” Loom continues the same intro rather than being only a LinkedIn-automation video (LinkedIn approval automation is project 04).",
      "Apollo emails were validated with Debounce; addresses that were not found were run again through a second finder (the transcript sounds like “ICPS”).",
      "A custom waterfall looks up job openings on company websites and LinkedIn (with a fallback when none are found) and keeps titles such as HR, manager, director, and software engineer.",
      "SEMrush is used to find competitors from a company domain; those names and role counts are then used to draft a customized cold email, including a subject line.",
      "The resulting contacts were added to another campaign running in Instantly. The video also mentions property-manager website scraping into Airtable, plus custom Python/Apify scrapers, which overlap the Custom Scraping section.",
    ],
  },
  {
    id: "clay-03", group: "Clay / Outreach / Cold Email / LinkedIn", number: "03",
    title: "Make.com: Smartlead Engagement Filter to HeyReach Connection Campaigns",
    bullets: [
      "In Make.com, campaign 24181 (described as a healthcare campaign) returns leads with a sequence number and an open count.",
      "A filter keeps only leads whose sequence number is at least 3 and whose open count is greater than 0, then an HTTP request pulls more details, including the LinkedIn profile, and the results are logged in Google Sheets.",
      "Those engaged leads are added to a HeyReach campaign so a LinkedIn connection request can be sent (tested first on the presenter’s own account, with three test leads).",
      "A second flow takes leads from HeyReach campaign 758 whose connection request was sent but not accepted, and adds them to another HeyReach campaign (446).",
      "The Loom title is “Make.com/Smartlead/Heyreach,” which matches this email-engagement-to-LinkedIn-connection handoff.",
    ],
  },
  {
    id: "clay-04", group: "Clay / Outreach / Cold Email / LinkedIn", number: "04",
    title: "LinkedIn Outreach with Human Approval for Comments and Connection Requests",
    bullets: [
      "The workflow fetches profile data such as headlines and how old the latest post is, then works from a lead database on a day-by-day schedule.",
      "On day 0, it marks the profile as visited.",
      "On day 1, it sends a reaction, fetches the latest post, drafts a comment, and sets the status to comment-review pending; the comment is sent only after the presenter marks it “approved by me.”",
      "If the comment is still pending, that send step does not run.",
      "On day 3, it drafts a personalized connection-request message, holds it for the same approval, and only sends the connection request after it is approved.",
    ],
  },
  {
    id: "clay-05", group: "Clay / Outreach / Cold Email / LinkedIn", number: "05",
    title: "Clay Job and People Search Exported to HeyReach Connection Campaigns",
    bullets: [
      "In Clay, a free “find jobs” search is run with filters to collect roles and company details, including LinkedIn URLs.",
      "People at those hiring companies are then found, filtered to titles such as managers, marketing, or software engineers (the demo mentions tens of companies and hundreds of people).",
      "Because a paid Clay–HeyReach connection was not available, the list was exported as a CSV and imported into HeyReach.",
      "A HeyReach campaign was run with on the order of 321 leads (some dropped because of missing information), sending connection requests and follow-up messages, with first name and company in the message.",
      "The presenter was on a Sales Navigator trial, so connection requests and messages were possible, but InMail to people who did not accept would have required a paid Sales Navigator plan.",
    ],
  },
  {
    id: "clay-06", group: "Clay / Outreach / Cold Email / LinkedIn", number: "06",
    title: "Telegram Lead-Gen Bot with Hunter Email Verification and Approval-Based Outreach",
    bullets: [
      "Two Looms (“m22 outreach crm telegram node setup” and “m22 Telegram Hunter Outreach”) belong to this heading.",
      "A Telegram bot is limited to an authorized chat ID so other people cannot use it; any message returns the commands it understands, such as find leads, verify leads, generate outreach, and check outreach in the CRM.",
      "“Find leads” (the demo uses Microsoft as an example) writes new, de-duplicated contacts to Google Sheets and enriches them; new rows are marked in a “lead-found” style status.",
      "“Verify leads” sends addresses to Hunter.io to verify emails, then the bot reports that verification is done.",
      "“Generate outreach” drafts a message for the new leads (generic by default, but customizable) and leaves items pending; clicking Approved sends the email and records that it was sent. The first Loom also shows this approval step triggering an n8n workflow.",
    ],
  },
  // ---------------------------------------------------------- Content Creation
  {
    id: "content-01", group: "Content Creation", number: "01",
    title: "AI Image and Video Generation with LinkedIn Auto-Posting",
    bullets: [
      "The Loom title is “m06 AI Image/Video generation and posting to Linkedin.”",
      "Loom’s own transcription for this video failed (captions_url is null; status is “failed”), so no spoken transcript is available.",
      "The portfolio heading is “LinkedIn Content Generation & Auto-Posting.”",
      "Together, the title and heading indicate a system that generates AI images and/or video and posts to LinkedIn, but the steps, tools, and approval flow are not described in any available transcript or file.",
      "This write-up is based on the Loom title and the portfolio heading only; details should not be treated as verified until a transcript or replacement video is available.",
    ],
  },
  {
    id: "content-02", group: "Content Creation", number: "02",
    title: "HeyGen and Submagic Video Pipeline with GHL Drafts and TikTok Approval",
    bullets: [
      "A prompt is sent in, and the workflow produces a summary and captions, then cleans that text.",
      "The flow then splits into HeyGen “avatar” or “talking photos/video,” creates the video, polls for status, and sends the result to Submagic; both the HeyGen and Submagic files are saved, including to Google Drive.",
      "The video is uploaded as file media in GoHighLevel, and a social-media post is created there as a draft, with a stored record of IDs (request, voice, avatar, prompt, both videos, caption, and summary).",
      "Rows start as pending; when a row is approved, the workflow finds approved draft posts and unique videos.",
      "Those approved videos are then uploaded to TikTok (the demo uses the presenter’s own account). One finished example is about 30–45 seconds, with a speed control applied. The Loom description also mentions calendar sync and human approval for TikTok posting.",
    ],
  },
  // ---------------------------------------------------------- Custom Scraping
  {
    id: "scrape-01", group: "Custom Scraping", number: "01",
    title: "Apify and Python Property Scrapers with Airtable and Google Maps",
    bullets: [
      "Built in Python and Apify for a property-rental site, this is a set of scrapers rather than a single job.",
      "A weekly scraper opens listing pages, extracts details, follows through to the gallery, and collects images plus video and 3D links, then writes the data to Airtable. It only scrapes items that are new, so it does not redo the whole site every week. Selenium is used for the page interaction.",
      "An amenities scraper takes details already stored in Airtable and uses Google Maps to fill or update amenity values, then writes them back to Airtable.",
      "A daily unit scraper visits each property’s unit links, checks whether anything has changed, and updates the matching Airtable records instead of deleting and re-scraping everything.",
      "The presenter no longer had Airtable access at the time of the recording, but the fields that used to land there are shown in the walkthrough.",
    ],
  },
  {
    id: "scrape-02", group: "Custom Scraping", number: "02",
    title: "SpareRoom Tenant and Zip-Code Scraper into Airtable",
    bullets: [
      "The workflow searches SpareRoom for a location, clicks “rooms wanted,” and collects people looking for a room in that area.",
      "It is scheduled for 3 PM and 12 AM and is driven by a list of zip codes. Because the site URL keeps changing, scrape.do (browser automation) is used instead of hitting the site directly.",
      "Listings are parsed into fields such as name, title, and price, and non-empty results are written to Airtable.",
      "A second step looks up a location name from each zip code (the listing itself may only show the zip) and updates that Airtable record.",
      "A third step opens each listing URL to pull extra HTML details that are not in the short preview, then updates the same record.",
    ],
  },
  {
    id: "scrape-03", group: "Custom Scraping", number: "03",
    title: "Roomster and Roomies Tenant Scrapers with Translation and Pagination",
    bullets: [
      "A Roomster (the transcript sometimes says “Loomster”) scraper builds a zip-code search URL and uses scrape.do, because the site is originally in Dutch and some fields, including price or description, can arrive in Dutch or German.",
      "The browser steps first set the language to English, then scrape the HTML and parse out people/listings.",
      "Pagination is handled by discovering how many pages a search has and requesting each page URL in turn, then creating Airtable records.",
      "New ads are flagged with a “new” label when they were not seen before.",
      "A Roomies scraper is described as simpler because the URLs are already structured (including a filter for people who want both). It also uses scrape.do and regex parsing, then writes tenants into Airtable.",
    ],
  },
  {
    id: "scrape-04", group: "Custom Scraping", number: "04",
    title: "Complete Realtor System — n8n Real Estate Agent V2",
    bullets: [
      "The tinyurl opens a public screenshot of an n8n workflow named “Real Estate Agent V2,” shown as Published, with a button to execute it from an “RE Agent Registration” form.",
      "Left-hand flows include registering a real-estate agent in the system, getting property-manager listing data, emailing new listings, searching and sending matching listings, and alerting an agent when a form is signed.",
      "A central AI/voice agent handles messages and delegates tools to downstream flows.",
      "Additional scenes on the right cover appointments, WhatsApp, listings, and related operations.",
      "This is a screenshot only (no transcript). It closely matches the image linked as the Telegram real-estate chatbot (WhatsApp section 09).",
    ],
  },
  {
    id: "scrape-05", group: "Custom Scraping", number: "05",
    title: "Property Scraper that Writes Captions and Posts to Facebook and Instagram via Buffer",
    bullets: [
      "A daily 9 PM job scrapes properties, limited to three listings, downloads media, and stores files in Google Drive.",
      "Listing fields such as reference ID, title, description, and bedrooms are sent to AI to generate a caption, image links are prepared for posting, and everything is written to a Google Sheet, including a posted/not-posted status.",
      "A second workflow runs at 11 PM, 7 AM, and 3 PM so posts can go out on a staggered schedule (the walkthrough mentions scheduling about an hour later).",
      "Buffer posts include the caption, a “contact us” email, a WhatsApp link, a telephone link, and images — four images for Facebook and one image for Instagram.",
      "The Facebook preview shown includes price, bedrooms, a deals link, and a WhatsApp link; Instagram uses the same caption with a single image and a custom scheduled time.",
    ],
  },
  {
    id: "scrape-06", group: "Custom Scraping", number: "06",
    title: "Two-Way Airtable and Slack Comment Sync",
    bullets: [
      "A Slack message can trigger the workflow and be written into Airtable as a comment (the demo posts a note on issue 11, and it appears in Airtable).",
      "The other direction sends Airtable comments back to Slack. In the demo this ran on a two-minute delay, which the presenter says may need to be lengthened (for example to five minutes) because of API rate limits.",
      "Messages coming from Slack show under the user’s profile in Airtable.",
      "Messages coming from Airtable appear in Slack and can be labeled as an Airtable bot or similar, rather than as the user’s own profile.",
      "The Loom title is “Airtable to Slack and viseversa.”",
    ],
  },
  {
    id: "scrape-07", group: "Custom Scraping", number: "07",
    title: "PDF-to-Document Extraction Iteration for Quantities, Prices, and Names",
    bullets: [
      "The linked Loom is titled “Iteration: 25th November” and is an update to prompting and outputs, not a first-build walkthrough.",
      "Earlier results were shown in a PDF; newer results are shown in two documents, and mistaken quantities and prices are described as largely fixed after more testing.",
      "The presenter sent sample text to Claude to refine prompts, then compared Claude’s extraction with the system’s own results.",
      "The tool is a PDF/text-to-Word style extraction and cannot read images inside a PDF unless that is separately set up; if a customer name exists only as an image, it may be missed or misread (one test picked a clerk’s name or a date-like “12th” instead).",
      "This summary is from the iteration Loom and the file name; a full Sheets-automation walkthrough would require transcribing the longer .mov.",
    ],
  },
];
