# Priced per agent, not per seat

Canonical HTML URL: https://www.zenml.io/pricing

Priced per agent, not per seat. Your AI engineer starts at $39 a month for one agent, with your whole team included. Open source is free; on-prem is priced with you.

Note: this is a repo-owned Markdown mirror for agents and readers. It omits visual-only UI, decorative media, navigation, analytics, and other browser chrome.

## Summary

Your whole team, one agent, $39 a month. Add agents as you ship them. On-prem for regulated teams, priced with you.

## Main CTAs

- [Book a demo](https://www.zenml.io/book-your-demo)
- [Read Docs](https://www.zenml.io/docs)
- [Apply Now](https://www.zenml.io/startups-and-academics)

## Plans

### Open Source

For individuals and small teams

- Price: Free
- Limits: Unlimited executions · Unlimited projects

- Includes:
  - Pipeline & flow orchestration
  - Artifact management
  - Basic model registry
  - Community support

- CTA: [Get Started](https://www.zenml.io/get-started)

### Scale

For teams running ML in production

- Price: $999/month

- Monthly executions, per workspace:

| Executions | Monthly price | Projects | Snapshots |
| --- | --- | --- | --- |
| 500 | $399 | 1 | 1 |
| 2,000 | $999 | 3 | 5 |
| 5,000 | $2,499 | 10 | 20 |

- Everything in Open Source, plus:
  - Model Control Plane
  - Artifact Control Plane
  - Snapshots
  - Codespaces (remote IDE)

- CTA: [Book a demo](https://www.zenml.io/book-your-demo)

### Enterprise

For organizations at scale

- Price: Custom
- Limits: Unlimited executions · Unlimited projects

- Everything in Scale, plus:
  - SSO (SAML / OIDC)
  - RBAC (custom roles)
  - Audit logs
  - Air-gapped deployment

- CTA: [Talk to an engineer](https://www.zenml.io/book-your-demo)

## Compare every plan

Open Source and Pro, with Scale and Enterprise feature tiers.

### Core platform

| Feature | Open Source | Scale | Enterprise |
| --- | --- | --- | --- |
| Pipeline & flow orchestration | Yes | Yes | Yes |
| Artifact management | Yes | Yes | Yes |
| Model registry (basic) | Yes | Yes | Yes |

### Pro control plane

| Feature | Open Source | Scale | Enterprise |
| --- | --- | --- | --- |
| [Model Control Plane](https://docs.zenml.io/concepts/models) | No | Yes | Yes |
| [Artifact Control Plane](https://docs.zenml.io/concepts/dashboard-features) | No | Yes | Yes |
| [Snapshots](https://docs.zenml.io/concepts/snapshots) | No | Yes | Yes |
| Codespaces (remote IDE) | No | Yes | Yes |

### Agent replay

| Feature | Open Source | Scale | Enterprise |
| --- | --- | --- | --- |
| Replay-based evals (Python & TypeScript) | Yes | Yes | Yes |
| Unlimited imports, scoring and seats | Yes | Yes | Yes |
| Hosted dashboard and control plane | No | Yes | Yes |
| Remote worker pools | No | No | Yes |

### Enterprise & governance

| Feature | Open Source | Scale | Enterprise |
| --- | --- | --- | --- |
| SSO (SAML / OIDC) | No | No | Yes |
| [RBAC (custom roles)](https://docs.zenml.io/pro/access-management/roles) | No | No | Yes |
| Advanced native scheduling | No | No | Yes |
| Audit logs | No | No | Yes |
| Air-gapped deployment | No | No | Yes |

### Support

| Feature | Open Source | Scale | Enterprise |
| --- | --- | --- | --- |
| Support level | Community | Priority | Dedicated + SLA |

## Agent pricing, answered

### What counts as an agent?

An agent is anything you want your AI engineer to watch: its code, in one repo or several, and the traces it sends. A LangGraph app with three sub-agents that ships as one product is one agent. Starter covers one, Team covers 5, and each one after that is $39 a month. Three teams with one agent each fit in Team at $199 a month.

### Why per agent and not per seat?

Because everyone who knows what good looks like should be in it: engineers, product, and the domain experts who review sessions. A team of fifteen pays the same as a team of two.

### Does the AI engineer cost extra?

No. It's included on every hosted plan, up to the sessions it reads each month (1,000 on Starter, 10,000 on Team). Replays run with your own model keys, so those model costs stay on your bill, not ours.

### What if we go over the sessions it reads?

Nothing stops. Your AI engineer keeps reading a sample, and we'll tell you when the next plan makes sense.

### What happens after the 14-day trial?

The trial is full access and needs no credit card. When it ends, add a card and pick a plan. Nothing in your workspace changes except the billing. The open-source version stays free, forever.

### Can we run it on-prem?

Yes, on Enterprise. Your AI engineer runs inside your own cloud or on-prem, air-gapped if you need it, and can call your own LLM endpoint. It's priced with you, based on agents and deployment.

### Do you see my traces?

On hosted plans, your AI engineer runs in our cloud and reads traces from your tracing tool through keys you can revoke. Replays run on your own workers with your own keys. Self-hosted or on Enterprise on-prem, nothing leaves your infrastructure.

### How is this different from Langfuse, Braintrust or LangSmith?

They show you what happened. Our AI engineer reads those traces next to your evals and shows you which evals are wrong or missing, then Kitaru replays your agent to test the fix against real sessions. Kitaru imports from Langfuse, LangSmith, Braintrust, Logfire or Phoenix, so your tracing tool stays your system of record.

### Do I need a separate subscription for ZenML?

No. One account and one bill cover both. ZenML is priced by pipeline runs and agents per agent, so you only pay for the side you use.

## ZenML pricing, answered

### Can I self-host ZenML?

Yes. ZenML is open source and free to self-host; that's the Open Source plan. If you want the Pro control plane on your own infrastructure, Enterprise covers self-hosted and air-gapped deployment. Either way, ZenML stores only metadata: your data, artifacts and compute stay in your VPC end-to-end.

### How is the Scale plan billed?

By monthly pipeline executions per workspace. The slider on the Scale card above sets your tier, and projects and snapshots scale with it. Pick the tier that matches your run volume and move between tiers as you grow; there's no per-seat pricing.

### What happens if I exceed my plan's executions?

We don't cut you off mid-month. Going over occasionally is fine; if it becomes the pattern, we'll reach out about moving you up a tier.

### What's the difference between Open Source and the Pro plans?

Open Source is the full framework, managed by you. Scale and Enterprise add the managed control plane (automatic updates, guaranteed uptime) plus the Model Control Plane, Artifact Control Plane, snapshots and Codespaces. Enterprise adds SSO, custom-role RBAC, audit logs and air-gapped deployment on top.

### Is there a startup or academic discount?

Yes. Early-stage companies building ML-powered products, universities, research institutions and educational use cases can apply for special pricing on ZenML Pro. Apply here (/startups-and-academics).

### How is my data handled?

ZenML is a metadata layer on top of your existing infrastructure: your data, artifacts and compute stay in your VPC, and only metadata reaches the control plane. ZenML holds a SOC 2 Type II report and ISO/IEC 27001 certification.

### Do I need a separate subscription for Kitaru?

No. One account and one bill cover both. ZenML is priced by pipeline runs and agents per agent, from $39 a month, so you only pay for the side you use.

### What kind of support is included in each plan?

Open Source: our public Slack and community forums. Scale: priority support with faster response times. Enterprise: a dedicated account manager, SLAs, and implementation assistance.

Still not clear? [Still not clear? Ask us on Slack](https://www.zenml.io/slack)

## Two products, one account

ZenML orchestrates your AI workflows. Your AI engineer and Kitaru keep your agents' evals honest. Same control plane underneath.

### Pipelines & artifacts

Training, batch inference, evals, agent workflows. One DAG, versioned artifacts, every orchestrator.

- Pipeline DAGs, artifact store, model registry: Version every step, every dataset, every model.
- Run on Kubernetes, Vertex, SageMaker, AzureML: One pipeline, any orchestrator, no rewrites.
- Reproducible by default, replayable on demand: Re-run any historical pipeline with one command.

- Learn more: [Learn about ZenML](https://www.zenml.io/product/zenml)

- CTA: [Sign up free](https://cloud.zenml.io/signup?product=zenml)

### Your AI engineer

Finds the evals you got wrong or never wrote, then replays your agent to test the fix. Priced per agent.

- Sessions, cohorts, evaluators, experiments: The whole replay loop, imports and scoring included.
- From $39 a month, per agent: Your AI engineer, replays and experiments included.
- Seats for your domain experts: The people who know what good looks like are not a line item.

- Learn more: [Learn about Kitaru](https://www.zenml.io/product/kitaru)

- CTA: [Sign up free](https://cloud.zenml.io/signup?product=kitaru)

One account and one bill. ZenML is priced by pipeline runs, agents per agent.

## Are you startup or academic?

Apply for a special price to access ZenML Pro features for early-stage companies building ML-powered products, universities, research institutions, and educational use cases.

[Apply Now](https://www.zenml.io/startups-and-academics)

## Your VPC, your data

ZenML is a metadata layer on top of your existing infrastructure, meaning all data and compute stays on your side.

### We Take Security Seriously

ZenML holds a SOC 2 Type II report and ISO 27001 certification, independently audited for security, availability and confidentiality.

Security badges: SOC 2 Type II Badge, ISO/IEC 27001:2022 certification badge.

## Trusted by 1,000s of members of top companies

Join the ZenML Community and start improving your AI workflows

- 1,000,000 pipelines run in ZenML
- 100,000 pipelines run last month
- 21,000 stacks registered last 12 months
- 200,000 models trained last 12 months

## Start deploying reproducible AI workflows today

Enterprise-grade AI orchestration platform trusted by thousands of companies in production.

### CTAs

- [Book a demo](https://www.zenml.io/book-your-demo)
- [Read Docs](https://www.zenml.io/docs)
