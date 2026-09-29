export interface CampaignSummary { id: number; name: string; status: string; scheduledAt: string | null; htmlContent: string }
export const CAMPAIGN_PREFIX = "In Production #";
/** Brevo statuses that mean "went out or will go out". Verified against the live API in Task 8 step 1. */
// Verified against https://developers.brevo.com/reference/getemailcampaigns-1: the status enum is
// draft, sent, archive, queued, suspended, in_process, in_review, cancelling, cancelled.
// A scheduled campaign is `queued`; cancelled/suspended/draft ones are deliberately not counted.
// The docs never list a camelCase `inProcess`, so it is not accepted.
export const COUNTED_STATUSES: ReadonlySet<string> = new Set(["sent", "queued", "in_process", "archive"]);
const SCHEDULED_STATUSES = new Set(["queued"]);
const SLUG = /https:\/\/www\.zenml\.io\/llmops-database\/([a-z0-9-]+)/g;

const counted = (cs: readonly CampaignSummary[]) => cs.filter((c) => c.name.startsWith(CAMPAIGN_PREFIX) && COUNTED_STATUSES.has(c.status));

export const extractSlugs = (html: string) => [...new Set([...html.matchAll(SLUG)].map((m) => m[1]))];
export const sentSlugs = (cs: readonly CampaignSummary[]) => new Set(counted(cs).flatMap((c) => extractSlugs(c.htmlContent)));

export function nextIssueNumber(cs: readonly CampaignSummary[]): number {
  const numbers = counted(cs).map((c) => Number.parseInt(c.name.slice(CAMPAIGN_PREFIX.length), 10)).filter(Number.isFinite);
  return Math.max(0, ...numbers) + 1;
}

export const campaignForSlot = (cs: readonly CampaignSummary[], slot: Date) =>
  cs.find((c) => c.name.startsWith(CAMPAIGN_PREFIX) && SCHEDULED_STATUSES.has(c.status) && c.scheduledAt !== null
    && Math.abs(new Date(c.scheduledAt).getTime() - slot.getTime()) < 60_000);
