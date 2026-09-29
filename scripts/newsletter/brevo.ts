import type { CampaignSummary } from "./history";

// sendTest (https://developers.brevo.com/reference/send-test-email): `emailTo` addresses must already exist as
// contacts (Brevo's test list is built from contacts); max 50 test emails per day; empty `emailTo` = whole test list.
export const PREVIEW_RECIPIENTS = ["marketing@zenml.io", "alex.ext@zenml.io", "tanish.ext@zenml.io"] as const;
const SENDER = { name: "ZenML", email: "hello@zenml.io" };
const BASE = "https://api.brevo.com/v3";
// GET /emailCampaigns (https://developers.brevo.com/reference/getemailcampaigns-1): default limit 50, `offset`
// paging, and the response includes htmlContent unless `excludeHtmlContent=true`, so no per-campaign fetch is needed.
// The docs state no maximum limit; 100 is our own choice (unverified).
const PAGE_SIZE = 100;

export interface NewCampaign { name: string; subject: string; previewText: string; htmlContent: string }
export interface BrevoApi {
  listCampaigns(): Promise<CampaignSummary[]>;
  createCampaign(c: NewCampaign): Promise<number>;
  sendTest(id: number, emails: readonly string[]): Promise<void>;
  scheduleCampaign(id: number, at: Date): Promise<void>;
  sendReport(subject: string, html: string, to: readonly string[]): Promise<void>;
}
// UNVERIFIED: the docs don't state the dashboard edit URL; check it opens the campaign.
export const campaignUrl = (id: number) => `https://app.brevo.com/email/template/edit/${id}`;

export function createBrevoApi(apiKey: string, listId: number, fetchImpl: typeof fetch = fetch): BrevoApi {
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
      // Brevo may cap `limit` below PAGE_SIZE, so a short page does not mean the last page. Advance by what
      // actually arrived; stop on an empty page or once the response's `count` total is reached.
      const out: CampaignSummary[] = [];
      for (;;) {
        const page = await call<{ campaigns?: CampaignSummary[]; count?: number }>(`/emailCampaigns?type=classic&limit=${PAGE_SIZE}&offset=${out.length}`);
        const campaigns = page.campaigns ?? [];
        if (campaigns.length === 0) return out;
        out.push(...campaigns.map((c) => ({ id: c.id, name: c.name, status: c.status, scheduledAt: c.scheduledAt ?? null, htmlContent: c.htmlContent ?? "" })));
        if (typeof page.count === "number" && out.length >= page.count) return out;
      }
    },
    async createCampaign(c) {
      // Without scheduledAt, Brevo creates the campaign as a draft; scheduleCampaign queues it later.
      const body = { name: c.name, subject: c.subject, previewText: c.previewText, htmlContent: c.htmlContent,
        sender: SENDER, replyTo: SENDER.email, recipients: { listIds: [listId] } };
      return (await call<{ id: number }>("/emailCampaigns", { method: "POST", body })).id;
    },
    async sendTest(id, emails) { await call(`/emailCampaigns/${id}/sendTest`, { method: "POST", body: { emailTo: emails } }); },
    async scheduleCampaign(id, at) {
      // Update an email campaign (https://developers.brevo.com/reference/updateemailcampaign): PUT with scheduledAt as
      // UTC ISO (YYYY-MM-DDTHH:mm:ss.SSSZ), 204 on success. Checked against the docs, not the live API.
      await call(`/emailCampaigns/${id}`, { method: "PUT", body: { scheduledAt: at.toISOString() } });
    },
    async sendReport(subject, html, to) {
      await call("/smtp/email", { method: "POST", body: { sender: SENDER, to: to.map((email) => ({ email })), subject, htmlContent: html } });
    },
  };
}
