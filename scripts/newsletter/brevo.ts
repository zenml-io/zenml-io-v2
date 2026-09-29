import type { CampaignSummary } from "./history";

export const LIST_ID = 9;
// sendTest (https://developers.brevo.com/reference/send-test-email): `emailTo` addresses must already exist as
// contacts (Brevo's test list is built from contacts); max 50 test emails per day; empty `emailTo` = whole test list.
export const PREVIEW_RECIPIENTS = ["marketing@zenml.io", "alex.ext@zenml.io", "tanish.ext@zenml.io"] as const;
const SENDER = { name: "ZenML", email: "hello@zenml.io" };
const BASE = "https://api.brevo.com/v3";
// GET /emailCampaigns (https://developers.brevo.com/reference/getemailcampaigns-1): default limit 50, `offset`
// paging, and the response includes htmlContent unless `excludeHtmlContent=true`, so no per-campaign fetch is needed.
// The docs state no maximum limit; 100 is kept from the plan (unverified).
const PAGE_SIZE = 100;

export interface NewCampaign { name: string; subject: string; previewText: string; htmlContent: string; scheduledAt: Date | null }
export interface BrevoApi {
  listCampaigns(): Promise<CampaignSummary[]>;
  createCampaign(c: NewCampaign): Promise<number>;
  sendTest(id: number, emails: readonly string[]): Promise<void>;
  sendReport(subject: string, html: string, to: readonly string[]): Promise<void>;
}
// UNVERIFIED: the docs do not state the dashboard edit URL; kept from the plan. Check it opens the campaign.
export const campaignUrl = (id: number) => `https://app.brevo.com/email/template/edit/${id}`;

export function createBrevoApi(apiKey: string, fetchImpl: typeof fetch = fetch): BrevoApi {
  async function call<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
    const res = await fetchImpl(`${BASE}${path}`, {
      method: init.method ?? "GET",
      headers: { "api-key": apiKey, accept: "application/json", "content-type": "application/json" },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`Brevo ${init.method ?? "GET"} ${path} → ${res.status}: ${text}`);
    return (text ? JSON.parse(text) : {}) as T;
  }
  return {
    async listCampaigns() {
      const out: CampaignSummary[] = [];
      for (let offset = 0; ; offset += PAGE_SIZE) {
        const page = await call<{ campaigns?: CampaignSummary[] }>(`/emailCampaigns?type=classic&limit=${PAGE_SIZE}&offset=${offset}`);
        const campaigns = page.campaigns ?? [];
        out.push(...campaigns.map((c) => ({ id: c.id, name: c.name, status: c.status, scheduledAt: c.scheduledAt ?? null, htmlContent: c.htmlContent ?? "" })));
        if (campaigns.length < PAGE_SIZE) return out;
      }
    },
    async createCampaign(c) {
      // Docs: scheduledAt is UTC ISO (YYYY-MM-DDTHH:mm:ss.SSSZ) and requires recipients.listIds; created as draft otherwise.
      const body = { name: c.name, subject: c.subject, previewText: c.previewText, htmlContent: c.htmlContent,
        sender: SENDER, replyTo: SENDER.email, recipients: { listIds: [LIST_ID] },
        ...(c.scheduledAt ? { scheduledAt: c.scheduledAt.toISOString() } : {}) };
      return (await call<{ id: number }>("/emailCampaigns", { method: "POST", body })).id;
    },
    async sendTest(id, emails) { await call(`/emailCampaigns/${id}/sendTest`, { method: "POST", body: { emailTo: emails } }); },
    async sendReport(subject, html, to) {
      await call("/smtp/email", { method: "POST", body: { sender: SENDER, to: to.map((email) => ({ email })), subject, htmlContent: html } });
    },
  };
}
