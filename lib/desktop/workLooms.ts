// Loom video for each Work item, reusing the links already kept in lib/solution-projects.ts.
// Items with no Loom (docs, Drive files, live apps, or no video yet) are simply not listed.
import { P } from "../solution-projects";

export const LOOM_BY_ID: Record<string, string> = {
  "ghl-01": P.clinicVoice.href,
  "ghl-a2p": P.a2p.href,
  "ghl-02": P.vapiQueue.href,
  "ghl-06": P.webinarPay.href,
  "ghl-ext-01": P.bootcamp.href,
  "ghl-ext-02": P.tax.href,
  "fde-01": P.google.href,
  "fde-03": P.gym.href,
  "wa-01": P.fpv.href,
  "wa-02": P.swiss.href,
  "wa-03": P.paw.href,
  "wa-04": P.videoApp.href,
  "wa-05": P.inbound.href,
  "wa-07": P.k12.href,
  "clay-01": P.clay1.href,
  "clay-02": P.clay2.href,
  "clay-03": P.smartlead.href,
  "clay-04": P.linkedin.href,
  "clay-05": P.clayJobs.href,
  "clay-06": P.telegram.href,
  "content-02": P.heygen.href,
  "scrape-01": P.propertyScraper.href,
  "scrape-03": P.roomScrapers.href,
  "scrape-05": P.buffer.href,
  "scrape-06": P.airtableSlack.href,
  "scrape-07": P.pdf.href,
};
