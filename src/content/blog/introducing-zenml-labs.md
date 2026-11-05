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
readingTime: "5 mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/introducing-zenml-labs/18e90558/introducing-zenml-labs-cover.avif"
  alt: "ZenML Labs logo centered on a soft green and peach background"
seo:
  title: "Introducing ZenML Labs: AI that gets better after it ships - ZenML Blog"
  description: "ZenML is now ZenML Labs. ZenML Pro gives you a team of AI engineers that find what broke, fix it, fine-tune a model on your traces and deploy it. ZenML and Kitaru stay open source."
  canonical: "https://www.zenml.io/blog/introducing-zenml-labs"
  ogImage: "https://assets.zenml.io/content/blog/introducing-zenml-labs/ee637eba/introducing-zenml-labs-cover.jpg"
---

We're unveiling a new name and a new look for ZenML.

If you've been around since August, you may have already noticed: a new logo, new colors, and a new home at [cloud.zenml.io](https://cloud.zenml.io).

**ZenML Labs** is now the company behind [**ZenML**](https://github.com/zenml-io/zenml), [**Kitaru**](https://github.com/zenml-io/kitaru) and [**ZenML Pro**](https://www.zenml.io/pro).

Why "Labs"? Because we keep building what teams running AI in production need next. The new name reflects where we are and where we're going.

*[Placeholder: ZenML Labs film]*

## From notebooks to agents

We started ZenML when getting a model into production meant a long, winding path from a Jupyter notebook to a deployed service.

We built the infrastructure to make that path short. For five years, teams like [JetBrains](https://www.zenml.io/case-study/jetbrains), [Safran](https://www.safran-group.com) and [Adeo](https://www.zenml.io/case-study/adeo-leroy-merlin) have used it to run AI in production.

Now we see the same pattern with agents. Building one takes hours. Keeping it safe, reliable and affordable is as hard as it ever was with ML. Maybe harder.

Agents break quietly. Customers ask something nobody planned for. A one-line prompt change breaks what worked yesterday. The model bill keeps climbing.

So we built Kitaru. It finds where your agent goes wrong, and it tests every change, from a prompt to a new model, on real production sessions before you ship.

This led us to talk with teams running agents in security, insurance, healthcare, banking and fintech.

Nobody asked for another dashboard. They wanted someone to do the work. This made us realize something more fundamental.

## Dev tools are becoming agent harnesses

Dev tools were built for people. A dashboard to click through. A CLI to type into.

That's changing. The first user of a dev tool is now often an agent. Coding agents read the repo and open the PR. Engineers review more and type less.

So the job of a tool changes too. It has to give an agent context, limits, and a way to prove its work. And it has to put a person where it matters.

Keeping AI good in production means reading traces, deciding which failures matter, writing the check, testing the fix, training a better model and getting it deployed. That's exactly the work agents are now good at.

That's why ZenML Pro now has its own harness: **Bots**. They come with ZenML and Kitaru skills built in, tuned for the whole job of running AI in production: writing evals that hold up, fixing what breaks, fine-tuning models on your traces and deploying them. Agents or classic ML models.

Think of each bot as an AI engineer on your team. Spin up one per agent, model or job. Each one does the work and shows you the evidence. You decide what ships. [More on Bots](https://www.zenml.io/blog/introducing-bots-zenml-pro).

![Your AI engineer at work on a claims agent: imports traces, reads the code, finds a gap in the evals, tests a fix against what runs today, and trains a cheaper model](https://assets.zenml.io/content/blog/introducing-zenml-labs/81520729/claims-feed.avif)

Our goal is simple. AI in production shouldn't need babysitting. It should keep getting better after it ships.

## It starts with your evals

Most teams find out what broke from a customer, not from their evals.

Your evals are probably right most of the time. Say 80%. The rest of your problems hides in thousands of traces, and that last 20% is where your customers get hurt. Nobody can read every trace. Reading a random sample misses the pattern.

Your AI engineers read all of them, next to the evals you already run. They group the sessions that went wrong the same way and put the few worth your time at the top. You review what matters, not everything.

Take an insurance claims agent. In one test we made, after a switch to a cheaper model, 31 of 214 appeals ended without a decision. The `decision_format` eval passed every one, because each reply was well formed. Nothing checked that the agent actually decided.

Your AI engineers flag patterns like this and draft a `decision_made` check to catch the next one.

![Insights for a claims agent: appeals end without a decision on the new model, and why appeals failed](https://assets.zenml.io/content/blog/introducing-zenml-labs/8f315e65/claims-insights.avif)

You don't write evals from scratch. Connect GitHub and they find your agent, your evals and your policies. They ask only what they can't work out alone.

When they have a fix, they run it as an experiment on past appeals, side by side with what runs today. Appeals decided go from 86% to 100%. Agreement with your reviewers goes up. None of the 40 good appeals change. That is the evidence you see before anything ships.

![An experiment on 214 past appeals: with the fix, appeals decided go from 86% to 100%, agreement with reviewers from 91.2% to 93.8%, and 0 of 40 good appeals change](https://assets.zenml.io/content/blog/introducing-zenml-labs/9d4c2bb8/claims-experiment.avif)

## Then it trains and deploys your model

Your traces are also training data.

Your AI engineers fine-tune a cheaper open model on them, hold it to the same evals, and deploy it in your own cloud. You approve the switch. You get the weights.

They read your repos and traces through keys you can revoke. Your data stays where it is.

## If you already run ZenML

ZenML isn't the old product. It's half of the plan. Agents end up needing everything ML needed: training data, fine-tuning runs, evaluation pipelines, models you can version and roll back. When your AI engineers fine-tune and deploy a model on your traces, that runs as a ZenML pipeline on your infrastructure. So we keep investing in the open-source core, and nothing you depend on goes away.

- **Your pipelines keep running.** Same SDK, same stacks, same integrations. No code changes.
- **The dashboard looks new.** Same runs, models and artifacts, in the new design.
- **The classic dashboard is one click away.** Switch back from your user menu any time.
- **Your plan doesn't change.**
- **Self-hosted and on-prem** deployments move to the new dashboard when you upgrade.

![A pipeline run in cloud.zenml.io in light mode and dark mode](https://assets.zenml.io/content/blog/introducing-zenml-labs/da9d852a/light-and-dark-dag.avif)

## Where this goes

We're betting the next user of AI infrastructure is an agent. People decide what better means. AI engineers do the work to get there.

We're also betting every serious team ends up running a model it trained. Teams start on a frontier model, move to an open one, then train their own. Their traces are the training data.

Today, your AI engineers find what broke, fix it, train a better model and deploy it, with you approving each step. Next, you'll give them a goal, like fewer escalations or a lower cost per session, and they'll work toward it. After that, they keep your AI improving between releases, without anyone having to ask.

## A growing portfolio

When we started, we had one product. Today we have three.

- [**ZenML**](https://github.com/zenml-io/zenml): AI orchestration, on the infra you choose.
- [**Kitaru**](https://github.com/zenml-io/kitaru): find what your agent's evals miss, from production sessions.
- [**ZenML Pro**](https://www.zenml.io/pro): the managed platform across both, with Bots on top.

ZenML and Kitaru stay open source under Apache 2.0, free to run on your own machines.

```bash
# ZenML
uv add zenml

# Kitaru
curl -fsSL https://zenml.io/install-kitaru | bash
```

For ZenML Pro users, we are rolling out the new UI starting today. The classic dashboard stays at [classic.cloud.zenml.io](https://classic.cloud.zenml.io).

![The new cloud.zenml.io home: what needs you, automations and this week's activity](https://assets.zenml.io/content/blog/introducing-zenml-labs/0f6bd4f4/cloud-home.avif)

Shipping was the easy part. Now let's make it better.

Welcome to ZenML Labs.

[Start free](https://cloud.zenml.io) | [Visit zenml.io](https://www.zenml.io)

Adam and Hamza, for everyone at ZenML Labs
