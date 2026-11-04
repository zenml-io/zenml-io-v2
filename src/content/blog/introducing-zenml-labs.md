---
title: "Introducing ZenML Labs: AI that gets better after it ships"
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
readingTime: "6 mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/introducing-zenml-labs/18e90558/introducing-zenml-labs-cover.avif"
  alt: "ZenML Labs logo centered on a soft green and peach background"
seo:
  title: "Introducing ZenML Labs: AI that gets better after it ships - ZenML Blog"
  description: "ZenML is now ZenML Labs. We're building an AI engineer that keeps your agents and models getting better after they ship, starting with what your evals miss. ZenML and Kitaru stay open source."
  canonical: "https://www.zenml.io/blog/introducing-zenml-labs"
  ogImage: "https://assets.zenml.io/content/blog/introducing-zenml-labs/ee637eba/introducing-zenml-labs-cover.jpg"
---

We're unveiling a new name and a new look for ZenML.

If you've been around since August, you may have already noticed: a new logo, new colors, and a new home at [cloud.zenml.io](https://cloud.zenml.io).

ZenML Labs is now the company behind [**ZenML**](https://github.com/zenml-io/zenml), [**Kitaru**](https://github.com/zenml-io/kitaru) and [**ZenML Pro**](https://www.zenml.io/pro).

Why "Labs"? Because we keep building what teams running AI in production need next. The new name reflects where we are and where we're going.

*[Placeholder: ZenML Labs film]*

## From notebooks to agents

We started ZenML when getting a model into production meant a long, winding path from a Jupyter notebook to a deployed service.

We built the infrastructure to make that path short. For five years, teams like [JetBrains](https://www.zenml.io/case-study/jetbrains), [Safran](https://www.safran-group.com) and [Adeo](https://www.zenml.io/case-study/adeo-leroy-merlin) have used it to run AI in production.

Now we see the same pattern with agents. Building one takes hours. Keeping it safe, reliable and affordable is as hard as it ever was with ML. Maybe harder.

An agent's behavior lives in thousands of sessions. Its evals go stale the week customers ask something new. A one-line prompt change can break what worked yesterday.

So we built Kitaru. It reads your agent's sessions next to its evals and shows you what they miss. When you change something, it tests the change on real production sessions before you ship it.

## Dev tools are becoming agent harnesses

Building Kitaru taught us something.

Keeping an agent good means reading traces, deciding which failures matter, writing the check and testing the fix. The kind of work agents have become good at.

So the next tool we're building is an agent itself: an AI engineer, built on ZenML and Kitaru. It does the work and shows you the evidence. You decide what ships.

![Your AI engineer at work on a claims agent: imports traces, reads the code, finds a gap in the evals, tests a fix against what runs today, and trains a cheaper model](https://assets.zenml.io/content/blog/introducing-zenml-labs/81520729/claims-feed.avif)

Our goal is simple. AI in production shouldn't need babysitting. It should keep getting better after it ships.

## What we heard

This fall we talked with teams running agents in security, insurance, healthcare, banking and fintech. Three problems came up in almost every call:

- Evals that can't keep up with production.
- Data that can't leave their own infrastructure.
- Model bills that keep growing.

The tooling records everything. Someone still has to dig through it. Nobody asked for another dashboard. They wanted someone to do the work.

## It starts with your evals

Most teams find out what broke from a customer, not from their evals.

Your evals are probably right most of the time. Say 80%. The rest hides in thousands of traces, and that last 20% is where your customers get hurt. Nobody can read every trace. Reading a random sample misses the pattern.

The AI engineer reads all of them, next to the evals you already run. It groups the sessions that went wrong the same way and puts the few worth your time at the top. You review what matters, not everything.

Take a claims agent. After a switch to a cheaper model, 31 of 214 appeals ended without a decision. The `decision_format` eval passed every one, because each reply was well formed. Nothing checked that the agent actually decided.

Our AI engineer flags the pattern and drafts a `decision_made` check to catch the next one.

![Insights for a claims agent: appeals end without a decision on the new model, and why appeals failed](https://assets.zenml.io/content/blog/introducing-zenml-labs/8f315e65/claims-insights.avif)

You don't write evals from scratch. Connect GitHub and it finds your agent, your evals and your policies. It asks only what it can't work out alone.

When it has a fix, it runs it as an experiment on past appeals, side by side with what runs today. Appeals decided go from 86% to 100%. Agreement with your reviewers goes up. None of the 40 good appeals change. That is the evidence you see before anything ships.

![An experiment on 214 past appeals: with the fix, appeals decided go from 86% to 100%, agreement with reviewers from 91.2% to 93.8%, and 0 of 40 good appeals change](https://assets.zenml.io/content/blog/introducing-zenml-labs/9d4c2bb8/claims-experiment.avif)

## Then the model bill

Your traces are also training data.

The AI engineer can fine-tune a cheaper open model on them and hold it to the same evals. You get the weights. Run them in your own cloud.

It reads your repos and traces through keys you can revoke. Your data stays where it is.

## Where this goes

We're betting the next user of AI infrastructure is an AI. People decide what better means. AI engineers do the work to get there.

We're also betting every serious team ends up running a model it trained. Teams start on a frontier model, move to an open one, then train their own. Their traces are the training data.

Today, the AI engineer finds what your evals miss and helps you fix it. Next, you'll give it a goal, like fewer escalations or a lower cost per session, and it will work toward it. After that, it keeps improving your agents between releases.

## A growing portfolio

When we started, we had one product. Today we have three.

- [**ZenML**](https://github.com/zenml-io/zenml): AI orchestration, on the infra you choose.
- [**Kitaru**](https://github.com/zenml-io/kitaru): find what your agent's evals miss, from production sessions.
- [**ZenML Pro**](https://www.zenml.io/pro): the managed platform across both, with the AI engineer on top.

ZenML and Kitaru stay open source under Apache 2.0, free to run on your own machines.

```bash
# ZenML
uv add zenml

# Kitaru
curl -fsSL https://zenml.io/install-kitaru | bash
```

Both now share one sign-in at [cloud.zenml.io](https://cloud.zenml.io). Every account moved over last week. The classic dashboard stays at [classic.cloud.zenml.io](https://classic.cloud.zenml.io).

![The new cloud.zenml.io home: what needs you, automations and this week's activity](https://assets.zenml.io/content/blog/introducing-zenml-labs/0f6bd4f4/cloud-home.avif)

## Our new brand

The new symbol is two stacked layers: our platform on top, your infrastructure underneath. Your data stays in the bottom layer. Green replaces purple, with warm neutrals and orange alongside.

![The ZenML Labs symbol](https://assets.zenml.io/content/blog/introducing-zenml-labs/1c92e2c9/zenml-labs-symbol.avif)

![The new palette: a green scale, warm neutrals and orange](https://assets.zenml.io/content/blog/introducing-zenml-labs/924469db/brand-palette.avif)

![Brand textures: orange and green glass blocks, pale green hexagonal glass, orange glass](https://assets.zenml.io/content/blog/introducing-zenml-labs/8a2c61e2/brand-textures.avif)

## If you already run ZenML

ZenML isn't the old product. It's half of the plan. Agents end up needing everything ML needed: training data, fine-tuning runs, evaluation pipelines, models you can version and roll back. When the AI engineer fine-tunes a cheaper model on your traces, it runs as a ZenML pipeline on your infrastructure. So we keep investing in the open-source core, and nothing you depend on goes away.

- **Your pipelines keep running.** Same SDK, same stacks, same integrations. No code changes.
- **The dashboard looks new.** Same runs, models and artifacts, in the new design.
- **The classic dashboard is one click away.** Switch back from your user menu any time.
- **Your plan doesn't change.**
- **Self-hosted and on-prem** deployments move to the new dashboard when you upgrade.

![A pipeline run in cloud.zenml.io in light mode and dark mode](https://assets.zenml.io/content/blog/introducing-zenml-labs/da9d852a/light-and-dark-dag.avif)

Shipping was the easy part. Now let's make it better.

Welcome to ZenML Labs.

[Start free](https://cloud.zenml.io) | [Visit zenml.io](https://www.zenml.io)

Adam and Hamza, for everyone at ZenML Labs
