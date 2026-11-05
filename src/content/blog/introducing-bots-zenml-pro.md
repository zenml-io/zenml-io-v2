---
title: "Introducing Bots in ZenML Pro for ML pipelines and AI agents"
slug: "introducing-bots-zenml-pro"
draft: true
author: "alexej-penner"
category: "kitaru"
tags:
  - "kitaru"
  - "zenml"
  - "agents"
  - "mlops"
  - "llmops"
date: "2026-11-05T00:00:00.000Z"
readingTime: "5 mins"
seo:
  title: "Introducing Bots in ZenML Pro for ML pipelines and AI agents"
  description: "Meet Bots in ZenML Pro: coding agents that investigate ML pipelines and AI workflows in ZenML, review agent behavior in Kitaru, and propose changes you can review."
  canonical: "https://www.zenml.io/blog/introducing-bots-zenml-pro"
---

A failed training run, an unexpected AI workflow result, and an agent making the wrong tool call have something in common: understanding what happened takes context. You need the execution record, the relevant code, and a way to test your explanation.

Bots bring coding agents into ZenML Pro to help with that work. They can investigate ML pipelines and AI workflows in ZenML, work with recorded agent sessions in Kitaru, and propose changes you can review.

Give a bot a task, follow its progress, and guide it from investigation to a proposed fix.

## Investigate ML pipelines and AI workflows with ZenML

When a pipeline fails or a result changes unexpectedly, the evidence often spans several places: run metadata, artifacts, configuration, and repository code.

A bot can work across those sources. Start a chat with a reference to a ZenML resource and a concrete request:

> Compare this training run with the last successful run. Investigate what changed and propose a fix.

The same approach applies to AI workflows:

> Inspect these two runs of our document-processing pipeline. Explain where their outputs diverged and identify the relevant code.

Each chat gets its own sandbox: a remote computer prepared with the configured repositories, tools, and setup commands. The bot can inspect the ZenML resources its service account may access, examine code, and produce an explanation or proposed change.

## Investigate agent behavior with Kitaru

For agents, a completed execution can still contain behavior you want to improve. An agent might choose an unsuitable tool, repeat an unnecessary step, or produce an answer that misses the user's intent.

Bots can work with Kitaru resources—including recorded sessions, investigations, cohorts, evaluators, experiments, and comparisons—to help investigate those behaviors and test a change.

For example:

> Investigate why the agent repeated this tool call. Show me the relevant session evidence and propose a change.

Once you have reviewed the finding, a follow-up could be:

> Use this cohort and evaluator to compare the proposed change with the baseline. Summarize where it helped and where it regressed.

That supports a workflow from reviewing recorded behavior to evaluating a bounded change. The result can include session references, comparison artifacts, and a code diff or draft pull request for your review.

## Stay involved while the bot works

The bot's messages, commands, and tool calls appear in the chat as they happen. You can steer the investigation immediately:

> Focus on the retrieval step. Keep the model unchanged for this comparison.

You can also queue instructions for later or interrupt the current turn. When the bot needs a decision, it can ask a question and wait for your answer. Its instructions require it to seek approval before an unrequested rerun, replay, or promotion.

Results appear as artifacts: reports, code changes, charts, pull request links, and references to ZenML or Kitaru resources. This keeps the evidence and proposed action together for review.

After inactivity, the sandbox stops. Continuing the chat resumes it with its files intact, without repeating the repository checkout and setup.

## Configure bots around your workflows

A bot is a reusable configuration combining instructions, skills, an environment, and access to external services.

You might configure one bot for pipeline troubleshooting and another for agent investigations. Their instructions and skills can describe your team's procedures, repository conventions, and evaluation practices.

An environment defines the repositories, setup commands, and variables available in the sandbox. Connectors add tools from services such as GitHub, Notion, Context7, Firecrawl, and Tavily. Custom MCP servers are supported too.

Built-in skills help bots work with ZenML and Kitaru when they can reach a workspace of that type.

## Bring the work into Slack and GitHub

Bots are available through the ZenML Pro dashboard, Slack, GitHub, the SDK, and the API.

Once the apps are installed and your identity is linked, you can mention the ZenML Pro app in Slack or `@zenml-pro` on a GitHub issue or pull request. The bot posts questions and reports back to the associated thread, with a link to the full chat.

Automations can start chats on a schedule—for example, to investigate failed pipeline runs or prepare a recurring review of recorded agent sessions.

## Give bots the access they need

Each bot acts through a ZenML Pro service account. Its roles determine which ZenML and Kitaru workspaces and resources the bot can access. Separate permissions control who may use and manage the bot.

For supported integrations, a proxy adds credentials outside the sandbox, allowing the bot to use the service without receiving its underlying stored key. Environment secrets and custom MCP server keys are available inside the sandbox and should be configured accordingly.

Bots currently run as a shared ZenML-managed service. Workspace servers must be reachable from their sandboxes.

## Start with one investigation

Choose a task with clear evidence and a reviewable outcome: explain a failed ML pipeline, compare AI workflow runs, or investigate an agent session in Kitaru.

Bots give that investigation a prepared workspace, access to the relevant execution context, and a conversation where your team can guide the work and review the result.

[Explore the Bots documentation](https://docs.zenml.io/pro/bots/bots).
