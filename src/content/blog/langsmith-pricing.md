---
title: "LangSmith Pricing Guide: How Much Does It Cost?"
slug: "langsmith-pricing"
draft: false
author: "hamza-tahir"
category: "kitaru"
tags:
  - "kitaru"
  - "agents"
  - "evaluation"
  - "discovery"
date: "2026-09-23T08:47:19.264Z"
readingTime: "14 mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/langsmith-pricing/7946e52f/langsmith-pricing-cover.avif"
  alt: "LangSmith Pricing Guide: How Much Does It Cost? cover showing the Kitaru logo next to the LangSmith logo"
featuredImage:
  url: "https://assets.zenml.io/content/blog/langsmith-pricing/7946e52f/langsmith-pricing-cover.avif"
  alt: "LangSmith Pricing Guide: How Much Does It Cost? cover showing the Kitaru logo next to the LangSmith logo"
seo:
  title: "LangSmith Pricing Guide: How Much Does It Cost? - ZenML Blog"
  description: "LangSmith pricing explained: Developer, Plus, and Enterprise plans, trace and retention costs, LCU-metered services, and worked monthly bill examples."
  canonical: "https://www.zenml.io/blog/langsmith-pricing"
  ogImage: "https://assets.zenml.io/content/blog/langsmith-pricing/d5e2d220/langsmith-pricing-cover.jpg"
---

LangSmith is LangChain's platform for tracing, evaluating, and deploying agents. It bundles six services under one bill. At first glance, the price seems predictable and affordable. But that’s not the case. Start metering in traces or add two other services from the bundle, and you’ve an entirely different, usually bigger, number on the table.

In this LangSmith pricing guide, we break down every plan, the three cost factors that decide your invoice, and what LangSmith’s usage calculator does and doesn't tell you.

At the end, we also look at Kitaru by ZenML, our open-source tool for replay-based agent evals. Kitaru can sit beside LangSmith if you want to keep LangSmith for tracing; its flat plan can handle selected replay and regression workloads; savings depend on which LangSmith charges you actually avoid.

## LangSmith Pricing Plans Overview

LangSmith has three main plans: Developer, Plus, and Enterprise. The Developer plan is free; Plus combines a per-seat fee of $39 with usage billed in two units; and Enterprise offers negotiated pricing and additional hosting, security, and support options.

Other overage charges are billed separately, like a LangChain Compute Unit (LCU) costs $1.50 and covers work done by Engine, Fleet, deployments, and sandboxes. A LangChain Storage Unit (LSU) costs $1.00 and covers data stored as traces, in deployment databases, and in sandbox storage.

Here’s a quick look at what each plan offers:

| Plan | Pricing | Key features |
|------|---------|--------------|
| **Developer** | $0 per seat per month, then pay as you go | • 1 seat maximum<br>• 5k base traces per month included<br>• Tracing, evals, datasets, annotation queues, Prompt Hub and Playground<br>• Community forum and support portal |
| **Plus** | $39 per seat per month, then pay as you go | • Unlimited seats<br>• 10k base traces per month included, shared by the whole organization<br>• 1 free Serverless (Small) deployment<br>• Insights, Engine, and Tuned Evaluators<br>• Google and GitHub SSO, User and Admin roles |
| **Enterprise** | Custom pricing, then pay as you go | • Custom seats, workspaces, and trace volume<br>• Cloud, hybrid, or self-hosted<br>• Custom SSO, ABAC, and RBAC<br>• Bulk data export<br>• Support SLA, Slack, deployed engineers<br>• Annual invoice, custom terms |

## LangSmith Pricing Factors to Consider

Before you compare plans, separate the bill into three buckets: seats, traces, and product usage.

### 1. Trace Volume is the Main Observability Meter

LangSmith defines a trace as one execution of your application. That can be an agent, evaluator, or playground session. One trace can contain multiple runs, including model calls and tool calls.

A 40-step agent run is still billed as one trace. You are not paying by span or by gigabyte. That definition is friendly to agents.

Now the rate. For trace usage, LangChain uses LSUs, LangChain Storage Units. One additional base trace costs 0.005 LSU per trace, or $5 per 1,000 traces. Plus $2.50 per 1,000 for traces upgraded to extended retention.

So if you have, let’s say, one Plus seat and 100,000 traces in a month, the rough calculation is:

- **Plus seat:** $39
- **Included traces:** 10,000
- **Additional traces:** 90,000 × $0.005 = $450
- **Total:** $450 + $39 per month

$489 per month is the estimated cost you’d pay on the Plus plan for that trace volume. The $39 headline is only the entry point.

### 2. Retention Upgrades Happen Automatically

Base traces have 14-day retention. For new SaaS traces from September 14, 2026, extended retention has a maximum of 180 days; existing traces are unaffected.

Extended traces can sometimes cost more because you don't always choose the upgrade. New online evaluators and automation rules enable retention extension by default. API or SDK feedback extends retention only when explicitly requested. Upgrade triggers include:

- An online evaluator scores it with its retention setting enabled
- An automation rule with retention extension enabled matches any run in the trace
- Feedback arrives through the API or SDK with `extend_trace_retention=true`

Feedback and notes added in the UI, and manual additions to annotation queues, leave retention unchanged.

You can opt out when configuring those features, so it’s another task before you even start with the platform.

At the current trace rates, a base trace costs $5 per 1,000 and an extended trace costs $7.50 per 1,000 once the upgrade is included.

### 3. Other LangSmith Services are Metered in LCUs

LangSmith is no longer only a tracing product, and each added service has its own meter.

- **Deployment** meters runtime compute at 0.045 LCU/vCPU-hour and memory at 0.006 LCU/GiB-hour, plus database compute at 0.177 LSU/vCPU-hour and memory at 0.025 LSU/GiB-hour where applicable.
- **Perceived Error (Tuned)** costs 0.01 LCU per billed evaluation. Attempts that attach no feedback are not billed; evaluated traces receive extended retention.
- **Engine** also uses LCUs. LangChain estimates about 5 to 30 LCUs per Engine run.

Existing deployment customers remain on previous pricing until October 1, 2026.

Engine is scheduled to run every six hours. If it runs 120 times in a 30-day month, the published 5-to-30-LCU estimate works out to 600 to 3,600 LCUs. At $1.50 per LCU, that is about **$900 to $5,400 per month**.

Again, these are estimates based on our calculations.

LangSmith does give you some relief on the trace side. LangSmith converts workspace tracing budgets into trace-count limits. Enforcement can overshoot slightly, and these controls should not be treated as a cap on the entire platform bill.

## All Pricing Plans that LangSmith Offers

Let's break down each plan and what it adds:

![LangSmith feature comparison table for the Developer ($0 per seat), Plus ($39 per seat), and Enterprise (custom pricing) plans, showing that Insights, Unlimited agents, and Tuned Evaluators start at Plus and Bulk data export is Enterprise-only](https://assets.zenml.io/content/blog/langsmith-pricing/857633c6/01-plans-overview.avif)

### Developer: $0 per Seat

![LangSmith Developer plan card: $0 per seat per month, then pay as you go, with up to 5k base traces per month, community support, and 1 seat](https://assets.zenml.io/content/blog/langsmith-pricing/b5309f94/02-developer.avif)

Developer is a 1-seat, free starting point with up to 5,000 base traces per month.

The plan includes tracing, monitoring, online and offline evals, datasets, annotation queues, and the Prompt Hub and Playground.

The limits are mostly about scale. You are limited to 5,000 traces per month until you add a payment method. Add a card and the cap lifts, and extra traces bill at the rates above. Developer has no managed deployments, Engine, or Insights.

**Sign up if:** You are a solo engineer who wants to instrument one agent and inspect real traces before paying.

**Skip if:** You need another user and team collaboration features.

### Plus: $39 per Seat per Month

![LangSmith Plus plan card: $39 per seat per month, then pay as you go, with up to 10k base traces per month, access to Deployment and Engine, and unlimited seats](https://assets.zenml.io/content/blog/langsmith-pricing/125a653b/03-plus.avif)

Plus is the self-serve team plan. It adds unlimited seats (every seat costs you $39, though) and 10k base traces per month shared by the organization.

You also get one free Serverless Small deployment and access to services such as Engine, Fleet, Sandboxes, and Tuned Evaluators. It also includes Google and GitHub SSO and User and Admin organization roles. Some services, such as Tuned Evaluators, have their own availability limits.

LangSmith bills seats monthly on the first day of the month; seats added mid-month are prorated, while removing a seat does not create a credit.

LangChain hosts the plan in the US or EU. Custom SSO, RBAC, bulk export, and self-hosted or hybrid hosting still stay gated to Enterprise.

**Sign up if:** You are a small team, your volume is in the tens of thousands of traces, and Google or GitHub login is enough.

**Skip if:** You need self-hosting, RBAC, bulk export, or enterprise controls. The Plus plan solves none of those.

### Enterprise: Custom Pricing

![LangSmith Enterprise plan card: custom pricing with self-hosted and hybrid deployment options, custom SSO, ABAC, and RBAC, a support SLA, and custom seats and workspaces](https://assets.zenml.io/content/blog/langsmith-pricing/c26c4730/04-enterprise.avif)

Enterprise opens up deployment and governance choices. It adds:

- Cloud, hybrid, or self-hosted deployment options
- Custom SSO, ABAC, and RBAC
- Custom seats and workspaces
- Bulk data export
- A support SLA, Slack, team trainings, and deployed engineers

Enterprise customers can customize extended retention per workspace, subject to the current 180-day SaaS maximum for new traces.

**Contact sales if:** Your security review asks where the traces sit, or you need the data plane in your own infrastructure.

**Skip if:** None of that is being asked of you yet.

## Is LangSmith Expensive?

That answer depends on your workload.

The easiest way to estimate a bill is to separate the fixed seat cost from usage. For Plus, the starting point is $39 per seat. Then add trace overage and any product usage.

Here are four trace-only examples using the current $5-per-1,000 additional base-trace charge:

- 1 seat + 10,000 traces: $39 per month
- 1 seat + 100,000 traces: $489 per month
- 5 seats + 100,000 traces: $645 per month
- 1 seat + 1,000,000 traces: $4,989 per month

However, there’s a blind spot. The calculator prices every additional trace at the base rate, so it leaves out the $2.50 per 1,000 for extended upgrades.

At 1 million traces a month, the trace line alone is close to $5,000 before seats or other LangSmith products. Evaluation adds another variable. Online evaluators and automation rules can extend retention, and experiment runs use extended retention by default.

So overall, LangSmith is reasonably priced if your team is small, your volume is under 100,000 traces a month, and 14 days of retention covers most of your debugging.

LangSmith gets expensive if you trace every production request at high volume, evaluate most of it online, leave Engine on its six-hour schedule, or need a seat for every reviewer and stakeholder.

If you want to replay a recorded production run with exactly one thing changed, and compare it against the original run, add Kitaru as a layer to LangSmith.

## Kitaru by ZenML: Replay-Based Evals Alongside LangSmith

![Kitaru homepage with the headline "Better, faster, cheaper agents, tested on production data" and a code panel showing an agent being wrapped, its traces imported, a failure cohort found, and an experiment comparing runs](https://assets.zenml.io/content/blog/langsmith-pricing/fbf5db06/05-kitaru.avif)

[Kitaru](/product/kitaru), a ZenML product, runs replay-based evals. It imports the runs your agent already made, re-executes your agent's real code against them with one thing changed, and scores both sides.

Our model keeps the existing observability system in place. LangSmith, Langfuse, Braintrust, Logfire, Arize Phoenix, or another tracing system can remain the system of record, while Kitaru can take over the evaluation and regression work. Moving selected regression workloads can avoid the LangSmith usage they would otherwise generate. Production tracing and retained LangSmith seats remain billable.

### Kitaru Pricing

Kitaru is open-source and free to self-host under Apache 2.0. The self-hosted edition includes imports, recording, cohorts, evaluators, experiments, and replay. Capacity and operating costs depend on your infrastructure.

You can also choose from hosted tiers:

- **Cloud:** $39 per month; 3 agents, 2 seats, 90-day session retention
- **Enterprise:** Custom; unlimited agents, custom seats and retention

**Note:** All cloud plans offer 14 days with full access and no credit card.

![Kitaru pricing page with three tiers: Open Source (free, self-hosted), Cloud ($39 per month for 3 agents, 2 seats, and 90-day session retention, with a 14-day free trial), and Enterprise (custom pricing with SSO, audit logs, and remote worker pools)](https://assets.zenml.io/content/blog/langsmith-pricing/2552a17a/06-kitaru-pricing.avif)

Fair comparison on pricing:

- Keeping two LangSmith Plus seats and adding Kitaru Cloud brings fixed subscriptions to $117/month before usage and external costs. Savings require avoided LangSmith charges to exceed the added costs.
- Self-hosting LangSmith requires the Enterprise plan, and self-hosting Kitaru is free.

The flat platform fee excludes your replay worker infrastructure and external provider charges, including model calls and optional hosted judges or analyzers.

### Features Kitaru Offers

#### Feature 1. Import LangSmith Traces from the Dashboard, Then Prepare Them for Replay

![Kitaru New agent dialog on the Import traces tab with LangSmith selected as the trace provider and fields for the LangSmith API key, endpoint, and project](https://assets.zenml.io/content/blog/langsmith-pricing/af3ec507/07-import-traces.avif)

Import existing LangSmith traces directly from Kitaru’s dashboard, or use the CLI/API. Provider credentials are stored encrypted in a reusable server connection, and a worker fetches and parses the traces.

To replay imported sessions with model or prompt overrides and recorded tool results, register runnable agent code through an adapter that supports those controls. Importer-backed adapters support passthrough reruns only. First verify an unchanged replay, then test one change.

Suppose the original run called `refund_payment(order=4821)`. Kitaru can return the recorded result for that call with a `history` tool policy. Configure that tool to use recorded history with `on_miss="fail"`, and verify adapter support. Omitting a tool policy permits live calls.

Tool policies include `history`, `static`, and `passthrough`. For a history lookup with no matching recording, `on_miss` can be `fail`, `error_result`, or `passthrough`. A `static` policy supplies a configured result; it is not an `on_miss` value.

**Where Kitaru fits:** Selected offline regression experiments that rerun supported agent code against recorded production cases.

#### Feature 2. Run Versioned Regression Experiments

![Kitaru experiment view for refund-authority-guardrail-v2 showing a completed baseline-v1 run where 4 of 5 sessions passed the escalated-without-email-lookup check and 5 of 5 passed refund-without-policy-authority](https://assets.zenml.io/content/blog/langsmith-pricing/0fafc679/08-experiments.avif)

In LangSmith, experiment runs are created at extended retention, so a regression suite is added to the trace meter every time it runs.

In Kitaru, we use cohorts, a collection of recorded sessions, to define production cases. Kitaru’s experiments replay a fixed cohort version. Configure baseline and candidate scoring with the same pinned evaluators for a paired comparison.

That means a regression run can point to a fixed population of cases. If you add a new incident later, you create another cohort version.

Evaluators return metrics and optional verdicts. Your CI job defines the acceptance criteria and how to handle failed replays or unset verdicts. Validate evaluators against human judgments before using them as release gates.

For evaluation, Kitaru provides deterministic checks and an optional integration with TypeSafe’s hosted jev judge. The judge accepts typed yes/no, choice, and score questions; thresholded verdicts can remain held when confidence is insufficient. It requires separate installation and a TypeSafe API key, sends selected session content to TypeSafe, and incurs provider charges.

**What Kitaru can replace:** Metered offline evaluation, for teams that want to run the suite on every pull request.

#### Feature 3. Find Cases to Investigate with Post-Import Insights

![Kitaru session review screen showing an agent thread of LLM and tool calls, with an issue_refund call selected and a reviewer note flagging a $280 refund issued without the human approval the return policy required above $200](https://assets.zenml.io/content/blog/langsmith-pricing/a83a41bb/09-insights.avif)

Kitaru’s dashboard imports can produce insight cards showing patterns such as recorded tool errors and failed sessions. Each card includes supporting evidence and a prompt you can pass to your coding assistant to investigate the finding.

The deterministic analyzer needs no model key. An optional OpenAI-backed analyzer selects findings and writes explanatory copy while counts and charts remain deterministic. CLI and API imports run only the analyzers you explicitly select.

These findings start an investigation; they do not establish its cause. A coding assistant can prepare a review worklist, and a human marks sessions acceptable, problematic, or uncertain. Reviewed cases can then form a regression cohort.

## Try Kitaru for Replay-Based Agent Evals

LangSmith is worth paying for if you need tracing, monitoring, evals, and annotation queues in one place. Three things to model before you commit:

- **Trace volume:** Plus includes 10,000 base traces per organization, then bills additional traces.
- **Retention:** Base traces cost less than extended traces, and online evaluators, automation rules, and experiments can move traces into the extended tier.
- **Product usage:** Budget for the services you enable. For LLM Gateway calls, bring-your-own-key usage is billed by your provider; Gateway Credits put model usage on your LangSmith account.

So, as practical buying advice:

- Choose LangSmith if you want one platform to watch what your agents are doing and score it, especially on LangChain or LangGraph.
- Choose Kitaru alongside it if you have an agent in production, a model swap or prompt rewrite you are nervous about shipping, and traces you are using only as a log.

Import available LangSmith runs, connect supported runnable agent code, verify an unchanged replay, and then test a model swap on one cohort.

[**Try Kitaru with the free hosted version**](https://cloud.kitaru.ai/).

**Related reading:**

- [Here are the 9 Best LangSmith Alternatives for LLM Observability](/blog/langsmith-alternatives)
- [Langfuse vs LangSmith: Which Observability Platform Fits Your LLM Stack?](/blog/langfuse-vs-langsmith)
- [LangGraph Pricing Guide: How Much Does It Cost?](/blog/langgraph-pricing)
