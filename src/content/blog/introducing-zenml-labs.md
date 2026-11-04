---
title: "AI systems should get better after they ship"
slug: "introducing-zenml-labs"
draft: true
author: "hamza-tahir-adam-probst"
category: "zenml-updates"
tags:
  - "zenml"
  - "agents"
  - "evaluation"
  - "release"
date: "2026-11-04T00:00:00.000Z"
readingTime: "5 mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/introducing-zenml-labs/18e90558/introducing-zenml-labs-cover.avif"
  alt: "ZenML Labs logo centered on a soft green and peach background"
seo:
  title: "AI systems should get better after they ship - ZenML Blog"
  description: "Today we're officially introducing ZenML Labs. We're starting with an AI engineer that finds what your agent's evals miss, and one home for ZenML and Kitaru."
  canonical: "https://www.zenml.io/blog/introducing-zenml-labs"
  ogImage: "https://assets.zenml.io/content/blog/introducing-zenml-labs/ee637eba/introducing-zenml-labs-cover.jpg"
---

Most teams can ship an agent now. Keeping it good is where they stall. A prompt change nobody tested breaks refunds, evals written in spring miss what customers ask in fall, and the model bill grows every month. The fixes pile up faster than anyone can get to them.

We've spent five years building infrastructure for AI in production, and this is where we see it break. ZenML is now ZenML Labs. You may have spotted the name and a few new colors since August. Today we're introducing them properly, along with what we're building toward: AI systems that keep getting better after they ship.

*[Placeholder: ZenML Labs film]*

## What we heard

This fall we talked with teams running agents in security, insurance, healthcare, banking and fintech. Three problems came up in almost every call: evals that can't keep up with production, data that can't leave their own infrastructure, and model spend that keeps growing.

The tooling records everything, but someone still has to dig through it, find the failure and ship the fix. None of them asked for another dashboard. They wanted someone to do the work.

## Starting with your evals

Most teams running agents in production find out what broke from a customer, not from their evals. Our first product is an AI engineer that finds what your agent's evals miss. It reads your production traces next to the evals you already run and shows you what they let through.

Take a support agent. A customer asks to return shoes bought seven weeks ago, and the agent promises a full refund within 90 days. The team's `reply_quality` eval passes the reply. The refund policy allows 30 days. Forty-one replies like that passed in one week, so the AI engineer drafts a `refund_within_policy` check to catch the next one.

![Insights for a support agent: why sessions failed, tool calls per session, how sessions ended](https://assets.zenml.io/content/blog/introducing-zenml-labs/250d8f37/agent-insights.avif)

You don't write evals from scratch. Connect GitHub and it finds your agent, your evals and your policies. It asks only what it can't work out alone, and your answers become checks you can trust. Then it keeps reading new traces and comes back to you when a session needs your call.

When it proposes a fix, it replays the sessions that failed and shows you what passes now, before you merge.

![A fix replayed on 48 sessions before merge: 7 of 8 failed sessions fixed, 40 of 40 past good sessions unchanged](https://assets.zenml.io/content/blog/introducing-zenml-labs/0cd69bbc/fix-replayed.avif)

It goes after the model bill too. It can fine-tune a cheaper open model on your traces, hold it to the same evals, and give you the weights to run in your own cloud. Throughout, it reads your repos and traces through keys you can revoke, so your data stays where it is.

## One home for ZenML and Kitaru

- **ZenML:** AI orchestration, on the infra you choose.
- **Kitaru:** Replay your agents on production data.

Both now sit behind one sign-in at cloud.zenml.io. [Confirm] ZenML Pro is the managed control plane across them, so ZenML and Kitaru workspaces share one sidebar. It also gets an agentic layer: the AI engineer, on top of ZenML and Kitaru.

![The new cloud.zenml.io home: what needs you, automations and this week's activity](https://assets.zenml.io/content/blog/introducing-zenml-labs/0f6bd4f4/cloud-home.avif)

Every account moved over last week. [Confirm] The previous dashboard stays at legacy.cloud.zenml.io until [date]. [Confirm]

Both products stay open source under Apache 2.0, free to run on your own machines.

```bash
# ZenML
uv add zenml

# Kitaru
curl -fsSL https://zenml.io/install-kitaru | bash
```

## Why we rebuilt the brand

For years, "ZenML" meant the company, the orchestration product and the paid platform at once. That stopped working once there was more than one product. So the company became ZenML Labs, and we rebuilt the brand alongside the product. New name, same team, same open-source core.

The new symbol is two stacked layers: a control plane on top of a data plane.

![The ZenML Labs symbol](https://assets.zenml.io/content/blog/introducing-zenml-labs/1c92e2c9/zenml-labs-symbol.avif)

Green replaces purple, set against warm neutrals, with orange as the second color. Headlines are set in Borna, body text in Rethink Sans, and labels in Nudica Mono. Our imagery is soft, layered glass in the same colors.

![The new palette: a green scale, warm neutrals and orange](https://assets.zenml.io/content/blog/introducing-zenml-labs/924469db/brand-palette.avif)

![Brand textures: orange and green glass blocks, pale green hexagonal glass, orange glass](https://assets.zenml.io/content/blog/introducing-zenml-labs/8a2c61e2/brand-textures.avif)

![A pipeline run in cloud.zenml.io in light mode and dark mode](https://assets.zenml.io/content/blog/introducing-zenml-labs/da9d852a/light-and-dark-dag.avif)

## Where this goes

We're betting the next user of AI infrastructure is an AI. Today, people operate pipelines, read traces and write evals. More and more, AI engineers will do that work for them, on the company's own infrastructure, while people decide what better means and approve what ships.

We're also betting that every serious team ends up running a model it trained. Teams start on a frontier model, move to an open one, then post-train their own. The traces their agents produce every day are the training data.

That's the path we're building. Today the AI engineer finds what your evals miss and helps you fix it. Next, you'll give it an objective, like fewer escalations or a lower cost per session, and it will work toward it, checking with you before anything ships. After that, it keeps improving your agents between releases, without waiting for someone to schedule the work.

Start with the evals you already run.

[Start free](https://cloud.zenml.io) | [Visit zenml.io](https://zenml.io)

[Name] and [Name], for everyone at ZenML Labs

[Credits]
