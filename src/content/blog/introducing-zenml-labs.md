---
title: "Introducing ZenML Labs: AI that keeps getting better"
slug: "introducing-zenml-labs"
draft: true
author: "hamza-tahir-adam-probst"
category: "zenml-updates"
tags:
  - "zenml"
  - "agents"
  - "evaluation"
  - "release"
date: "2026-11-10T00:00:00.000Z"
readingTime: "5 mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/introducing-zenml-labs/18e90558/introducing-zenml-labs-cover.avif"
  alt: "ZenML Labs logo centered on a soft green and peach background"
seo:
  title: "Introducing ZenML Labs: AI that keeps getting better - ZenML Blog"
  description: "ZenML is now ZenML Labs. ZenML Pro gives you a team of AI engineers that find what broke and test the fix, and soon train a cheaper model on your traces. ZenML and Kitaru stay open source."
  canonical: "https://www.zenml.io/blog/introducing-zenml-labs"
  ogImage: "https://assets.zenml.io/content/blog/introducing-zenml-labs/ee637eba/introducing-zenml-labs-cover.jpg"
---

We're unveiling a new name and a new look for ZenML.

If you've been around since August, you may have already noticed: a new logo, new colors, and a new home at [cloud.zenml.io](https://cloud.zenml.io).

**ZenML Labs** is now the company behind [**ZenML**](https://github.com/zenml-io/zenml), [**Kitaru**](https://github.com/zenml-io/kitaru) and [**ZenML Pro**](https://www.zenml.io/pro).

Why "Labs"? Because we keep building what's next for teams running AI in production.

*[Placeholder: ZenML Labs film]*

## From notebooks to agents

We started ZenML when getting a model into production meant a long, winding path from a Jupyter notebook to a deployed service.

We built the infrastructure to make that path short. For five years, teams like [JetBrains](https://www.zenml.io/case-study/jetbrains), [Safran](https://www.safran-group.com) and [Adeo](https://www.zenml.io/case-study/adeo-leroy-merlin) have used it to run AI in production.

Now we see the same pattern with agents. Building one takes hours. Keeping it safe, reliable and affordable is as hard as it ever was with ML. Maybe harder.

Agents break quietly. Customers ask something nobody planned for. A one-line prompt change breaks what worked yesterday. The model bill keeps climbing.

So we built [Kitaru](https://github.com/zenml-io/kitaru). It finds where your agent goes wrong, and it tests every change, from a prompt to a new model, on real production sessions before you ship.

This led us to talk with teams running agents in security, insurance, healthcare, banking and fintech.

Nobody asked for another dashboard. They wanted someone to do the work. That's a different kind of tool.

## Tools that do the work

Dev tools were built for people. A dashboard to click through. A CLI to type into.

That's changing. The first user of a dev tool is now often an agent. Coding agents read the repo and open the PR. Engineers review more and type less.

So the job of a tool changes too. It has to give an agent context, limits, and a way to prove its work. And keep humans in control where it matters.

Keeping AI good in production means reading traces, deciding which failures matter, writing the check, testing the fix, training a better model and getting it deployed. Agents can do that work, given the right context and limits.

That's why we built our own agent harness into ZenML Pro. It powers our new agent-first experience, and it comes with ZenML and Kitaru skills built in, tuned for the whole job of running AI in production: writing evals that hold up and fixing what breaks today, and soon fine-tuning models on your traces and deploying them. Agents or classic ML models.

Every bot it runs is an AI engineer on your team. Spin up one per agent, model or job. Each one does the work and shows you the evidence. You decide what ships. [More on Bots](https://www.zenml.io/blog/introducing-bots-zenml-pro).

![Your AI engineer at work on a claims agent: imports traces, reads the code, finds a gap in the evals, tests a fix against what runs today, and trains a cheaper model](https://assets.zenml.io/content/blog/introducing-zenml-labs/81520729/claims-feed.avif)

Our goal is simple. AI in production shouldn't need babysitting. It should keep getting better after it ships.

## First: what your evals miss

We start with agents because that's where things break fastest. In [our claims benchmark](https://www.zenml.io/benchmarks/claims-over-time), switching to a cheaper open model left about 1 in 10 appeals ending with no decision. A general coding agent, asked to improve things, reduced the damage but never fixed the cause. Our AI engineer agent did, and finished 3.3 points ahead over 800 real appeals. The test favored us on purpose, and the write-up says how.

Finding that took counting how every session ended, an eval nobody had written. Most teams find out what broke from a customer, probably when it's too late. That's why we start by improving your evals.

Your evals are probably right most of the time. Say 80%. The rest of your problems hides in thousands of traces, and that last 20% is where your customers get hurt. Nobody can read every trace. A sample can tell you something's wrong, but rarely why, or what else is hiding.

Your AI engineers read all of them, next to the evals you already run. They group the sessions that went wrong the same way and put the few worth your time at the top. You review what matters, not everything.

Picture an insurance claims agent. After a switch to a cheaper model, 31 of 214 appeals end without a decision. The `decision_format` eval passes every one, because each reply is well formed. Nothing checks that the agent actually decided.

Your AI engineers flag patterns like this and draft a `decision_made` check to catch the next one.

![Example: insights for a claims agent. Appeals end without a decision on the new model, and why appeals failed](https://assets.zenml.io/content/blog/introducing-zenml-labs/8f315e65/claims-insights.avif)

You don't write evals from scratch. Connect GitHub and they find your agent, your evals and your policies. They ask only what they can't work out alone. They read your repos and traces through keys you can revoke, and we store only metadata. Need nothing to leave your infrastructure? Run them in your own cloud, with your own LLM endpoint.

When they have a fix, they run it as an experiment on past appeals, side by side with what runs today. Say appeals decided go from 86% to 100%, agreement with your reviewers goes up, and none of the 40 good appeals change. You see all of that before anything ships.

![Example: an experiment on 214 past appeals. With the fix, appeals decided go from 86% to 100%, agreement with reviewers from 91.2% to 93.8%, and 0 of 40 good appeals change](https://assets.zenml.io/content/blog/introducing-zenml-labs/9d4c2bb8/claims-experiment.avif)

## Next: your own model, on your infrastructure

Your traces are also training data. And running training pipelines is what we've done for five years.

It's on our roadmap: your AI engineers fine-tune a cheaper open model on your traces, as a ZenML pipeline on your own infrastructure, and hold it to the same evals. You approve the switch. You get the weights. Want it sooner? [Tell us](https://www.zenml.io/book-your-demo).

## If you already run ZenML

ZenML is half of the plan. Agents end up needing everything ML needed: training data, fine-tuning runs, evaluation pipelines, models you can version and roll back. We've spent five years building exactly that. When your AI engineers fine-tune a model on your traces, that will run as a ZenML pipeline on your infrastructure. We keep shipping in the open-source core too, like [resource pools](https://github.com/zenml-io/zenml/releases/tag/0.97.0). See the [release notes](https://github.com/zenml-io/zenml/releases). Nothing you depend on goes away.

- **Your pipelines keep running.** Same SDK, same stacks, same integrations. No code changes.
- **The dashboard looks new.** Same runs, models and artifacts, in the new design.
- **The classic dashboard is one click away.** Switch back from your user menu any time.
- **Your plan doesn't change.**
- **Self-hosted and on-prem** deployments move to the new dashboard when you upgrade.

![A pipeline run in cloud.zenml.io in light mode and dark mode](https://assets.zenml.io/content/blog/introducing-zenml-labs/da9d852a/light-and-dark-dag.avif)

## Where this goes

We're betting the next user of AI infrastructure is an agent. People decide what better means. AI engineers do the work to get there.

We're also betting every serious team ends up running a model it trained. Teams start on a frontier model, move to an open one, then train their own. Their traces are the training data.

Today, your AI engineers find what broke, test the fix and show you the evidence. Next, they train a cheaper model on your traces and deploy it. Then you'll give them a goal, like fewer escalations or a lower cost per session, and they'll work toward it.

## A growing portfolio

When we started, we had one product. Today we have three.

- [**ZenML**](https://github.com/zenml-io/zenml): AI orchestration, on the infra you choose.
- [**Kitaru**](https://github.com/zenml-io/kitaru): find what your agent's evals miss, from production sessions.
- [**ZenML Pro**](https://www.zenml.io/pro): the managed platform across both, with a team of autonomous AI engineers on top.

ZenML and Kitaru stay open source under Apache 2.0, free to run on your own machines.

```bash
# ZenML
uv add zenml

# Kitaru
curl -fsSL https://zenml.io/install-kitaru | bash
```

ZenML Pro users have had the new UI since last week, and Kitaru's new UI ships today. The classic dashboard stays at [classic.cloud.zenml.io](https://classic.cloud.zenml.io).

![The new cloud.zenml.io home: what needs you, automations and this week's activity](https://assets.zenml.io/content/blog/introducing-zenml-labs/0f6bd4f4/cloud-home.avif)

Shipping was the easy part. Now let's make it better.

Welcome to ZenML Labs.

[Start free](https://cloud.zenml.io) | [Visit zenml.io](https://www.zenml.io)

Adam and Hamza, for everyone at ZenML Labs
