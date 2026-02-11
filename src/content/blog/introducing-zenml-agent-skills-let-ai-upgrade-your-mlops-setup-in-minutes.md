---
title: "Introducing ZenML Agent Skills: Let AI Upgrade Your MLOps Setup in Minutes"
slug: "introducing-zenml-agent-skills-let-ai-upgrade-your-mlops-setup-in-minutes"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "697764a420dea3a2f83a0be7"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-03T15:19:04.226Z"
  lastUpdated: "2026-02-03T10:53:57.000Z"
  createdOn: "2026-01-26T12:57:08.053Z"
author: "alex-strick-van-linschoten"
category: "zenml"
tags:
  - "skills"
  - "agents"
  - "genai"
  - "mlops"
date: "2026-01-26T00:00:00.000Z"
readingTime: 6 mins
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/4b8c7eac/6981d36ce92aa039b696b890_6981d2b0f0dd4ffc24e379d6_agent-skills-quick-wins_1_1.avif"
seo:
  title: "Introducing ZenML Agent Skills: Let AI Upgrade Your MLOps Setup in Minutes - ZenML Blog"
  description: "ZenML's new Quick Wins skill for Claude Code automatically audits your ML pipelines and implements 15 best-practice improvements (from metadata logging to Model Control Plane setup) based on what's actually missing in your codebase."
  canonical: "https://www.zenml.io/blog/introducing-zenml-agent-skills-let-ai-upgrade-your-mlops-setup-in-minutes"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/4b8c7eac/6981d36ce92aa039b696b890_6981d2b0f0dd4ffc24e379d6_agent-skills-quick-wins_1_1.avif"
  ogTitle: "Introducing ZenML Agent Skills: Let AI Upgrade Your MLOps Setup in Minutes - ZenML Blog"
  ogDescription: "ZenML's new Quick Wins skill for Claude Code automatically audits your ML pipelines and implements 15 best-practice improvements (from metadata logging to Model Control Plane setup) based on what's actually missing in your codebase."
---

We've been watching the rise of agent skills with growing excitement. Since Anthropic [launched the Agent Skills open standard](https://www.anthropic.com/news/skills) in December 2025 and subsequently [donated it to the Linux Foundation](https://techcrunch.com/2025/12/09/openai-anthropic-and-block-join-new-linux-foundation-effort-to-standardize-the-ai-agent-era/), these modular instruction packages have become a powerful way to extend agentic coding tools like [Claude Code](https://code.claude.com/docs/en/skills), Cursor, and Codex.

We know teams are already using these tools to write ZenML pipelines. So we thought: why not create skills that encode our best practices directly?

Today we're releasing our first official skill: **ZenML Quick Wins**. It scans your ZenML repository, identifies what's missing, and implements improvements for you. If you've ever suspected your pipelines aren't using all the features ZenML offers, this skill is a great place to start to figure out exactly what you're missing and fix it.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/2365d8c5/6977632e44bd6621d2625647_CleanShot_2026-01-26_at_11.54.38.png" alt="__wf_reserved_inherit" />
</figure>

## What This Skill Actually Does

The Quick Wins skill is based on [our documentation page of the same name](https://docs.zenml.io/user-guides/best-practices/quick-wins). That page has always been something of a sleeper hit: 15 improvements you can make in about 5 minutes each, covering everything from metadata logging to Model Control Plane setup.

The problem? Knowing what to implement is only half the battle. You still need to audit your codebase, figure out what's already in place, and adapt the examples to your specific setup.

The skill handles all of this. Here's the workflow:

<ol><li><strong>Investigate</strong> your current ZenML stack and codebase</li><li><strong>Confirm</strong> its understanding with you (catches misconfigurations early)</li><li><strong>Gather context</strong> about your development environment and team patterns</li><li><strong>Recommend</strong> prioritized quick wins based on what's actually missing</li><li><strong>Implement</strong> the ones you choose</li></ol>

The whole process is conversational. The skill asks questions, checks assumptions, and makes sure it understands your setup before changing anything.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/1dd198e4/6977633b2dd3beb0c4d3c5d4_CleanShot_2026-01-26_at_11.57.08.png" alt="__wf_reserved_inherit" />
</figure>

## The 15 Quick Wins

Here's what the skill can implement for you:

<table class="qw-table"> <thead> <tr> <th>#</th> <th>Quick Win</th> <th>What It Adds</th> </tr> </thead> <tbody> <tr><td>1</td><td>Metadata Logging</td><td>Foundation for reproducibility and experiment comparison</td></tr> <tr><td>2</td><td>Experiment Comparison</td><td>Visual comparison of runs with parallel coordinate plots (ZenML Pro)</td></tr> <tr><td>3</td><td>Autologging</td><td>Automatic metric/artifact tracking via MLflow, W&amp;B, etc.</td></tr> <tr><td>4</td><td>Slack/Discord Alerts</td><td>Instant notifications when pipelines complete or fail</td></tr> <tr><td>5</td><td>Cron Scheduling</td><td>Automated recurring pipeline runs</td></tr> <tr><td>6</td><td>Warm Pools</td><td>Eliminate cold-start delays on SageMaker/Vertex</td></tr> <tr><td>7</td><td>Secrets Management</td><td>Keep credentials out of your code</td></tr> <tr><td>8</td><td>Local Smoke Tests</td><td>Fast iteration with Docker before cloud deployment</td></tr> <tr><td>9</td><td>Tags</td><td>Organize and filter your ML assets</td></tr> <tr><td>10</td><td>Git Repository Hooks</td><td>Automatic code versioning and faster Docker builds</td></tr> <tr><td>11</td><td>HTML Reports</td><td>Beautiful visualizations in your ZenML dashboard</td></tr> <tr><td>12</td><td>Model Control Plane</td><td>Central hub for model lineage and governance</td></tr> <tr><td>13</td><td>Parent Docker Images</td><td>Faster builds by pre-installing heavy dependencies</td></tr> <tr><td>14</td><td>ZenML Docs MCP Server</td><td>IDE AI assistance grounded in live documentation</td></tr> <tr><td>15</td><td>CLI Export Formats</td><td>Machine-readable output for scripting and automation</td></tr> </tbody></table>

The skill prioritizes these based on your specific setup. No experiment tracker? It'll suggest that before autologging. Already using metadata logging? It'll skip to the next high-impact improvement.

## Technical Design: Subagents and Parallel Investigation

We wanted to share some of the design decisions behind this skill, since they illustrate idiomatic patterns that work well with agentic coding tools.

The investigation phase uses [subagents](https://code.claude.com/docs/en/sub-agents) that run in parallel:

<ul><li><strong><code>zenml-stack-investigator</code></strong>: Runs ZenML CLI commands to understand your stack configuration, components, and recent pipeline activity</li><li><strong><code>zenml-codebase-analyzer</code></strong>: Searches your Python code for ZenML patterns, identifying what features you're using and what's missing</li></ul>

These subagents return structured summaries rather than raw output. This keeps the main conversation focused on recommendations rather than getting buried in JSON.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/dfaaa5db/6977634a83a18609b9a3a092_CleanShot_2026-01-26_at_11.57.29.png" alt="__wf_reserved_inherit" />
</figure>

Why subagents? The investigation needs to run multiple CLI commands and search across your codebase. Doing this in the main conversation would create a wall of output. Subagents handle the grunt work and return only what matters.

Note that some agentic tools (like Codex) don't support subagents yet. The skill still works in those environments; it just runs the investigation commands directly. Claude Code with Opus 4.5 gives the best experience since it supports parallel subagent execution, but the skill adapts to what's available.

## For Platform Engineers: Help Your Team Write Better ZenML Code

If you're running ZenML as a platform for your organization, this skill gives your data scientists and ML engineers a way to level up their pipeline code without needing to memorize best practices.

Instead of writing documentation that nobody reads, point your team to the skill. They can run it against their repositories and get personalized recommendations based on what they're actually doing. The skill knows about your team's stack configuration, so it won't suggest features that require components you haven't set up.

This is particularly valuable for teams where:

<ul><li>Data scientists are writing pipelines but might not know all of ZenML's features</li><li>You want consistent patterns across repositories without being prescriptive</li><li>New team members need to get up to speed on your MLOps practices</li></ul>

The skill teaches by doing. Rather than reading about metadata logging, your team sees it implemented in their actual code with their actual data structures.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/22c4672d/6977635959608dba153e8cc2_CleanShot_2026-01-26_at_11.57.53.png" alt="__wf_reserved_inherit" />
</figure>

## Getting Started

If you're using Claude Code:

```
# Add the ZenML skills marketplace
/plugin marketplace add zenml-io/skills

# Install the quick-wins skill
/plugin install zenml-quick-wins@zenml

# Navigate to your ZenML project and run it
/zenml-quick-wins
```

For other tools, check the [skills repository README](https://github.com/zenml-io/skills) for installation instructions.

The skill works best when you're in a repository that already has ZenML pipelines. It needs something to analyze. If you're starting from scratch, stay tuned for our upcoming **Greenfield** skill, which will help you scaffold new pipelines from templates.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/af53cb86/697763637ec62629b1d27696_CleanShot_2026-01-26_at_11.58.18.png" alt="__wf_reserved_inherit" />
</figure>

## What's Next

This is the first skill we're releasing, but we have more planned:

<ul><li><strong>Greenfield</strong>: Start from an idea ("I need a pipeline that does X") and get a working ZenML pipeline with best practices</li><li><strong>Debugging</strong>: Investigate pipeline failures and get targeted fixes</li><li><strong>Infrastructure Setup</strong>: Configure stacks and components for your cloud environment</li></ul>

Skills are one part of [our broader AI tooling strategy](https://docs.zenml.io/reference/llms-txt), which also includes MCP servers and llms.txt files for grounding your IDE assistant in ZenML's documentation. We recommend combining all three for the best experience.

We're curious about what skills would be most useful for your workflows. If you have ideas, let us know on [Slack](https://zenml.io/slack) or open an issue in the [skills repository](https://github.com/zenml-io/skills).