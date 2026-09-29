export interface CampaignSummary { id: number; name: string; status: string; scheduledAt: string | null; htmlContent: string }
export const CAMPAIGN_PREFIX = "In Production #";
/** Brevo statuses that mean "went out or will go out". Verified against the live API in Task 8 step 1. */
export const COUNTED_STATUSES: ReadonlySet<string> = new Set(["sent", "queued", "in_process", "inProcess", "archive"]);
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
