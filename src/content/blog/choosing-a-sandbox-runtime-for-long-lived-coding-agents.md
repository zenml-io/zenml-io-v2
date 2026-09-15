---
title: "Choosing a sandbox runtime for long-lived coding agents"
slug: "choosing-a-sandbox-runtime-for-long-lived-coding-agents"
draft: false
author: "hamza-tahir"
category: "kitaru"
tags:
  - "kitaru"
  - "sandbox"
  - "agents"
  - "tooling"
  - "bigger-picture"
  - "thought-leadership"
  - "evergreen"
date: "2026-09-15T00:00:00.000Z"
readingTime: "7 mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/choosing-a-sandbox-runtime-for-long-lived-coding-agents/890175c1/choosing-a-sandbox-runtime-for-long-lived-coding-agents-cover.avif"
  alt: "Kitaru blog cover: Choosing a sandbox runtime for long-lived coding agents"
seo:
  ogImage: "https://assets.zenml.io/content/blog/choosing-a-sandbox-runtime-for-long-lived-coding-agents/4569fb69/choosing-a-sandbox-runtime-for-long-lived-coding-agents-cover.jpg"
  title: "Choosing a sandbox runtime for long-lived coding agents - ZenML Blog"
  description: "How we evaluated sandbox providers for coding agents, what we chose for now, and the trade-offs behind that decision."
  canonical: "https://www.zenml.io/blog/choosing-a-sandbox-runtime-for-long-lived-coding-agents"
---

A coding agent needs somewhere to run commands, install dependencies, start a browser, and test the application it is changing. When that work spans multiple interactions, the execution environment becomes part of the product.

We evaluated sandbox providers for this workload. Daytona is our current choice. We have abstracted the provider integration so we can revisit that decision as our requirements and the available platforms change.

This article explains the requirements behind the choice and the trade-offs that remain. The comparisons reflect vendor documentation reviewed in September 2026. They are not performance measurements.

## The workload

Our unit of execution is one interactive coding agent per sandbox. The environment needs to support:

| Requirement | Why it matters |
|---|---|
| Headless Chromium inside the sandbox | The agent must test the application it is building, including services available only inside that environment. |
| Real SSH access | A developer must be able to inspect the workspace and debug through standard tools. |
| Snapshot and restore | We need recoverable workspace state and a way to return to a known point. |
| Idle lifecycle controls | Waiting for the next interaction should not require continuous compute billing. |
| Dev server exposure | A human needs to open and inspect the running application. |
| Egress restrictions | Executed code should reach only the destinations the workload requires. |

These requirements describe a development environment with a lifecycle. Starting a container and executing a command covers only part of it.

## Persistence has several meanings

The most consequential distinction in this comparison is what survives when compute stops.

**Filesystem persistence** preserves source files, installed dependencies, and artifacts. Processes must restart.

**Memory persistence** preserves running processes and their in-memory state. That can include the agent, Chromium, and a development server.

**Application session persistence** preserves enough information for the agent to continue after its process restarts: conversation state, task progress, and references to its workspace.

These mechanisms solve different problems. A filesystem snapshot does not preserve a live browser session. A memory snapshot does not guarantee that remote connections remain usable. An agent’s session record should not depend entirely on a process surviving.

Provider terminology makes this easy to miss. “Stop,” “pause,” “sleep,” and “snapshot” do not have consistent semantics across platforms.

## Our current choice

[Daytona](https://www.daytona.io/) brings several capabilities we need into one provider integration.

It documents managed OpenSSH access, including VS Code Remote-SSH. This gives a human a standard way into the environment without us building an SSH gateway. [SSH documentation](https://www.daytona.io/docs/en/ssh-access/)

Its VM offering documents memory-preserving pause/resume and forks. Its container offering has different semantics: stopping preserves the filesystem but clears memory, and containers do not support pause/resume. **The [sandbox class](https://www.daytona.io/docs/en/persistence/) is therefore part of the decision, not an interchangeable configuration detail.**

Daytona also documents dev server previews, outbound network restrictions, and server-side credential substitution. Together, these reduce the amount of access and lifecycle infrastructure we need to assemble ourselves.

The defaults still need attention:

- **Network policy depends on billing tier.** Higher tiers have internet access by default; restrictive policies must be configured explicitly. [Network limits](https://www.daytona.io/docs/en/network-limits/)
- **Preview credentials have different scopes.** Standard preview tokens grant sandbox-wide access. Signed preview URLs provide expiring, revocable access to a specific port. [Preview authentication](https://www.daytona.io/docs/en/preview/)
- **Secret substitution has protocol limits.** Daytona substitutes placeholders in outbound HTTPS headers. It does not provide general substitution in request bodies or query strings. Destination restrictions must also be configured. [Secrets documentation](https://www.daytona.io/docs/en/secrets/)

Browser support needs precise wording too. Our requirement is to run and control Chromium inside the environment. A platform’s computer-use features do not, by themselves, establish that it provides the CDP endpoint or Playwright integration our application needs.

Our reason for starting with Daytona is the combination of these capabilities. We still need to configure them correctly and handle recovery in the application.

## Where the alternatives fit

Several alternatives remain credible choices.

| Provider | What makes it relevant | Trade-off for this workload |
|---|---|---|
| [**E2B**](https://e2b.dev/) | Filesystem-and-memory pause/resume, automatic pause on timeout, and agent examples | Its documented SSH approach requires additional setup. Timeout-based pause is not activity-based idle detection. |
| [**Runloop**](https://runloop.ai/) | Agent Gateways keep provider credentials outside the devbox; an official guide covers browser control inside it | Snapshot and suspend semantics need to match the state the application expects to recover. |
| [**Vercel Sandbox**](https://vercel.com/docs/sandbox) | Network restrictions, server-side credential injection, and automatic filesystem snapshots on stop | Its interactive CLI shell does not establish OpenSSH or Remote-SSH compatibility. Filesystem recovery also requires restarting processes. |
| [**Cloudflare Sandboxes**](https://developers.cloudflare.com/sandbox/) | Workers integration, outbound request interception, dev server exposure, and directory backup/restore through R2 | Idle sleep stops the container. Recovery requires restoring persisted files and restarting processes. Browser terminals do not satisfy our OpenSSH requirement. |
| [**Modal**](https://modal.com/docs/guide/sandboxes) | Programmable sandbox infrastructure with explicit lifecycle controls | The documented 24-hour sandbox limit requires lifecycle management for longer work; idle timeout terminates rather than pauses. |

E2B is relevant when memory-preserving recovery matters. Its [persistence documentation](https://docs.e2b.dev/sandbox/persistence) describes automatic pause on timeout and optional automatic resume. Its [SSH guide](https://e2b.dev/docs/sandbox/ssh-access) describes the additional components needed for human access.

Runloop deserves consideration for both credentials and browser execution. Its [Agent Gateways](https://docs.runloop.ai/docs/devboxes/agent-gateways) keep the underlying API key outside the devbox, and its [browser guide](https://docs.runloop.ai/docs/devboxes/capabilities/browser) covers a browser running inside the environment.

Vercel and Cloudflare are relevant when their surrounding platforms fit the application. The access and recovery details still matter: Vercel documents an [interactive shell and filesystem persistence](https://vercel.com/docs/sandbox/cli-reference), while Cloudflare documents [container shutdown on inactivity](https://developers.cloudflare.com/sandbox/concepts/sandboxes/) and [directory backup and restore](https://developers.cloudflare.com/sandbox/guides/backup-restore/).

Modal’s [sandbox lifecycle documentation](https://modal.com/docs/guide/sandboxes) makes its timeout behaviour explicit. A workload that already reconstructs processes from persisted state may be comfortable with those constraints.

We do not assign an aggregate score to these providers. A missing hard requirement cannot be compensated for by cheaper compute, and “not verified” should not be scored as “unsupported.”

## What the abstraction buys us

We have abstracted the provider integration because we expect this infrastructure to change.

That abstraction should isolate provider-specific operations without pretending their semantics are identical. An adapter can translate command execution or file transfer calls. It cannot make a filesystem-only restore behave like a memory-preserving resume.

The capabilities that need to remain explicit include:

- Whether a checkpoint contains disk, memory, or both.
- Whether inactivity causes pause, termination, or eventual loss of memory.
- Whether human access uses OpenSSH or a proprietary shell.
- How preview access is scoped and revoked.
- Where credentials are stored and which requests can use them.

Keeping these differences visible makes replacement practical. Hiding them behind a generic `pause()` method would move provider assumptions into application code, where they become harder to identify.

The abstraction reduces migration work. It does not make migration free.

## Cost depends on the lifecycle

Published CPU rates are insufficient for this comparison.

An interactive coding agent spends time compiling and running tests, but also waiting for model responses or human input. Providers can bill these periods differently. Memory may remain billable while CPU usage falls, and stopped environments may still incur storage charges.

Plan fees matter too. For example, [E2B’s Pro plan](https://e2b.dev/pricing) adds a monthly subscription to usage charges. [Vercel meters active CPU separately from provisioned memory](https://vercel.com/docs/sandbox/pricing), so its CPU rate cannot be compared directly with a rate charged for the entire time a sandbox is running.

A useful cost comparison needs the same workload on each provider: resource allocation, active execution, waiting time, idle retention, snapshots, and network transfer. It also needs to account for the engineering work required to manage that lifecycle.

## What would change the decision

We will revisit the provider choice if another implementation meets the same requirements with lower operational cost, better recovery behaviour, or less integration work.

The operational checks are concrete:

- Can a human reconnect through the tools they already use?
- Can the agent recover after the environment has been inactive overnight?
- Does Chromium resume correctly, or does the application need to restart it?
- Can we restore a checkpoint without losing the state needed to continue the task?
- Do preview credentials and network restrictions enforce the intended access?

Daytona is our starting point. The durable decision is to keep the application’s requirements explicit and the provider integration replaceable.
