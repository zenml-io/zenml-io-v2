---
title: "We Tested and Reviewed the 7 Best Trigger.dev Alternatives to Deploy Fully Managed AI Agents and Workflows"
slug: "trigger-dev-alternatives"
draft: false
author: "hamza-tahir"
category: "kitaru"
tags:
  - "kitaru"
  - "agents"
  - "orchestrators"
  - "discovery"
date: "2026-08-12T11:34:17.628Z"
readingTime: "19 mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/trigger-dev-alternatives/c691b3f9/cover.avif"
  alt: "ZenML blog cover for a review of the 7 best Trigger.dev alternatives for AI agents, showing the Kitaru, Inngest, Hatchet, Temporal, Restate, LangGraph and Cloudflare logos"
seo:
  title: "7 Best Trigger.dev Alternatives for AI Agents - ZenML Blog"
  description: "We tested the 7 best Trigger.dev alternatives for Python AI agents, comparing failure recovery, replay depth, language support, hosting, and pricing."
  canonical: "https://www.zenml.io/blog/trigger-dev-alternatives"
  ogImage: "https://assets.zenml.io/content/blog/trigger-dev-alternatives/99506257/cover.jpg"
  ogTitle: "We Tested and Reviewed the 7 Best Trigger.dev Alternatives to Deploy Fully Managed AI Agents and Workflows"
  ogDescription: "We tested the 7 best Trigger.dev alternatives for Python AI agents, comparing failure recovery, replay depth, language support, hosting, and pricing."
---

Most teams do not go looking for a Trigger.dev alternative because Trigger.dev is bad. They go looking because their agent is written in Python and their orchestrator is not. Trigger.dev was built for background jobs in a TypeScript codebase. So the moment your reasoning loop is PydanticAI or the OpenAI Agents SDK, you are wrapping Python in a Node.js task. The orchestration layer stops speaking the same language as the thing it orchestrates.

For this article, we reviewed the best alternatives to Trigger.dev that AI engineering teams actually shortlist when that mismatch shows up, and tested each against the failure modes that matter for agents rather than for cron jobs.

## A Quick Overview of the Best Trigger.dev Alternatives

- **Why look for alternatives:** Trigger.dev is TypeScript-first. Parent task retries can repeat inline work, while standard replay starts a new run from the original payload.
- **Who should care:** AI engineers, agent developers, and platform teams that run Python workflows with costly model calls or side effects that should happen only once.
- **What to expect:** Seven Trigger.dev alternatives compared across language support, failure recovery, replay depth, hosting, and price.

## The Need for a Trigger.dev Alternative?

Trigger.dev is a good background jobs platform. So many of the problems below are consequences of a product designed for TypeScript background work being used for Python agent work.

### Reason 1. Python runs behind a TypeScript task

Trigger.dev tasks are defined through its JavaScript and TypeScript SDK. Python and dependencies can be installed in the task image and executed as a subprocess, but it is not first-class Python task authoring.

For a Python-heavy agent stack, this creates a permanent boundary between the orchestration and the agent code. You must pass data across processes, debug two runtimes, and keep task boundaries in TypeScript even when the reasoning loop lives in LangGraph, PydanticAI, CrewAI, or another Python framework.

On top of that, Trigger.dev cannot place native retries, queues, and task boundaries inside the Python code itself.

### Reason 2. A failed task retry can restart parent logic from the beginning

Trigger.dev’s checkpointing is strongest around explicit waits and child tasks. Plus, waits longer than five seconds do not count toward compute.

However, retries or failed parent tasks behave differently. When a parent task fails, the retry starts the parent from the beginning. Inline operations before the failure may therefore run again. Trigger.dev can reuse completed child-task results when those subtasks are protected with idempotency keys, which is the pattern its durable-execution documentation recommends. That means Trigger.dev may run inline operations, like model or external tool calls, a second time.

Trigger.dev supports idempotency keys for these cases, but deliberately leaves it to you to decide which calls become child tasks and where duplicate protection belongs. If your team wants every model call, tool call, and agent step persisted by default, you may prefer a runtime built specifically for agents.

### Reason 3. Standard replay starts a new run

Trigger.dev’s Replay feature creates a new task run using the previous run’s inputs. You can keep the original payload through the API or edit it in the dashboard, but the replay normally uses the current task version in the selected environment.

Trigger.dev also provides checkpoint-resume, through which a running task or session can resume after a wait or interruption. Still, they are not exposed as user-selectable historical checkpoints for experimentation.

Also, Trigger.dev cannot natively replay from an arbitrary step while keeping earlier outputs fixed. You can build branching yourself, but that requires your own conversation history, database state, actions, and frontend logic.

## Evaluation criteria

We evaluated each alternative against three criteria that matter more for agent workloads than ordinary background jobs.

### Failure recovery and durability

Agent runs often include costly model calls and activities that should not repeat after a failure. We compared how much workflow restructuring and idempotency logic each alternative demands before it is safe for agent work. Whether execution continues from the last completed step, restarts the parent task, or rebuilds state from recorded history.

### Native language and runtime support

Language support affects how much orchestration code sits outside the agent itself. Trigger.dev’s Python extension setup works, but if your agent logic, evaluation code, and model SDKs are already Python, you are in for a permanent cross-language tax.

A Python team gets the cleanest setup when workflows, retries, queues, and durable steps live in the same runtime as the model and tool code. So we gave preference to tools that support first-class Python workflows.

### Replay and debugging depth

Trigger.dev’s built-in Replay creates a fresh run from the previous payload rather than re-entering a historical run at an arbitrary model or tool step. That’s a problem when there are alternatives to Trigger.dev that let you re-enter a finished run at a specific model or tool call, hold everything upstream fixed, change exactly one variable, and continue from there.

## What are the Top Alternatives to Trigger.dev

Before the individual reviews, here is the shortlist side by side:

| Trigger.dev Alternative | Best For | Key Features | Pricing |
|---|---|---|---|
| **[Kitaru](https://www.zenml.io/product/kitaru)** | Python agent runtimes | Checkpoint-level replay with overrides<br>Native Python flows and checkpoints<br>Pause and resume without active compute<br>Wraps your existing agent SDK | Free (open source, Apache 2.0)<br>Paid plans start at $399/month |
| **[Inngest](https://www.inngest.com/)** | Event-driven durable functions | Memoized step output across retries<br>First-party Python, TypeScript, and Go SDKs<br>Event triggers, sleeps, and waits | Free tier available<br>Paid plans start at $99/month |
| **[Hatchet](https://hatchet.run/)** | Queues, workers, and task control | Replay a run from the failed step<br>Editable step input before replay<br>Fine-grained concurrency controls | Free tier available<br>Paid plans start at $500/month |
| **[Temporal](https://temporal.io/)** | Polyglot durable execution | Event-history-based deterministic replay<br>Workflow reset to a specific event ID<br>Per-activity retry policies | Free (self-hosted)<br>Temporal Cloud starts at $100/month |
| **[Restate](https://www.restate.dev/)** | Durable services and backends | Journal-based step recovery<br>Durable state beside the service<br>Six official SDK languages | Free tier available<br>Paid plans start at $75/month |
| **[LangGraph](https://www.langchain.com/langgraph)** | Stateful agent graphs | Checkpointed graph state per thread<br>Time travel and forked branches<br>Human-in-the-loop interrupts | Free tier available<br>Paid plans start at $39/seat/month |
| **[Cloudflare Workflows](https://developers.cloudflare.com/workflows/)** | Edge-native durable steps | Durable multi-step execution on Workers<br>Automatic step retries and state persistence<br>Sleep and wait-for-event primitives | Free tier available<br>Paid plans start at $20/month |

## 1. Kitaru by ZenML

![Kitaru by ZenML landing page with the headline "Traces you can run, not just read" beside a replay CLI panel showing import, evaluate, replay and fork commands](https://assets.zenml.io/content/blog/trigger-dev-alternatives/758eb8a1/01-kitaru-hero.avif)

[Kitaru](https://www.zenml.io/product/kitaru), from the team behind ZenML, is an open-source runtime for durable Python agents.

You add `@flow` and `@checkpoint` to ordinary Python functions, then run the agent through the framework you already use, including PydanticAI, the OpenAI Agents SDK, the Claude Agent SDK, Google ADK, or even raw Python. Kitaru records checkpoint inputs and outputs as the flow progresses.

If you’ve hit the TypeScript boundary in Trigger.dev, that is the structural change Kitaru adds. There is no TypeScript or Node.js layer to cross. Your agent loop, tool calls, and durable boundaries all stay in Python.

Some features that make Kitaru a reliable alternative to Trigger.dev:

### Feature 1. Replay from a Specific Checkpoint, with Overrides

Kitaru replays an execution from a named checkpoint and lets you change exactly one thing about it. Checkpoints before that point reuse their recorded outputs, so those Python functions do not run again.

In practice, the CLI command looks like this:

```python
kitaru executions replay kr-a8f3c2 \
  --at lookup_policy_tool \
  --invocation-overrides '{"lookup_policy_tool":{"model":"openai:gpt-5-nano"}}'
```

In the image, checkpoints before `at` reuse their recorded outputs. Their Python functions do not run again.

So a replay from step 48 does not re-pay for steps 1 through 47. You can also swap a model, replace a recorded value, or change a checkpoint input without paying for the earlier calls again. That is how you test whether a bad retrieval result caused a bad answer.

### Feature 2. A Baseline You Can Compare Against

![Three-panel Kitaru replay flow: start from execution IDs, swap in a cheaper model or flaky tool, then diff the candidates, reporting 61 percent lower median cost and 196 of 200 outputs identical](https://assets.zenml.io/content/blog/trigger-dev-alternatives/2604c094/02-kitaru-replay-overrides.avif)

A replay without changes can reproduce the original run from recorded checkpoints. Once that baseline exists, you can change one checkpoint and keep everything upstream fixed, so any difference in the trajectory comes from that change.

This is the part that Trigger.dev’s whole-run replay cannot do. It creates a fresh run and may produce different model outputs before it reaches the step under investigation.

In Kitaru, we keep earlier checkpoint values fixed, so the test starts from the same recorded state. Production is untouched either way, because the replay runs against recorded state.

### Feature 3. Pause and Resume without Burning Compute

![Diagram of kitaru.wait() suspending a run after checkpoint c2 and releasing compute while the server holds durable state, then resuming at c3 when input arrives from a human, agent, webhook, CLI, MCP or UI](https://assets.zenml.io/content/blog/trigger-dev-alternatives/c6081d90/03-kitaru-wait-resume.avif)

`kitaru.wait()` suspends a run when it needs a human decision, another agent, or a webhook, then releases the worker so nothing is billed while it waits. When the input arrives, Kitaru resumes the same execution and continues.

Trigger.dev can also pause and release workers while they are idle. But it doesn’t let you restore the execution exactly as it was before that step.

Say an agent completes 50 steps, but step 48 calls the wrong tool. In Trigger.dev, replay starts a new run from the original payload, so the earlier model and tool calls run again unless you build them as separate durable tasks. Kitaru can replay from step 48, reuse the recorded outputs from steps 1 through 47, and let you change only the prompt, model, or tool result at that checkpoint.

### Pricing

Kitaru is free and open source under the Apache 2.0 license, and you self-host the server with artifacts in your own S3, GCS, or Azure Blob storage.

ZenML’s paid plans cover both ZenML pipelines and Kitaru agent runs. The [Scale plan](https://www.zenml.io/pricing) is priced by monthly executions:

- **500 monthly executions:** $399 per month, with 1 project and 1 snapshot.
- **2,000 monthly executions:** $999 per month, with 3 projects and 5 snapshots.
- **5,000 monthly executions:** $2,499 per month, with 10 projects and 20 snapshots.

![ZenML pricing page showing the free open source tier, the recommended Scale plan at 999 dollars per month for 2,000 monthly executions, and a custom Enterprise tier](https://assets.zenml.io/content/blog/trigger-dev-alternatives/85b827b7/04-kitaru-pricing.avif)

**👀 Note:** We are soon going to launch Kitaru v2 with new features and pricing. Get in touch with our founder via [LinkedIn](https://www.linkedin.com/in/hamzatahirofficial/) for early access + 3 months of free Kitaru!

### Pros and Cons

Kitaru is the best fit here when the workload is a Python agent and the debugging problem sits in the middle of a long trajectory. Its replay model is built for testing one changed model call, tool result, or checkpoint input.

On the flip side, Kitaru is Python-only and focused on agent-shaped execution. It is also younger than Temporal or Inngest, with a smaller ecosystem. If what you need is a managed queue for TypeScript webhooks, Trigger.dev is a better tool.

**Related read:** [Kitaru vs Temporal](https://www.zenml.io/compare/kitaru-vs-temporal)

## 2. Inngest

![Inngest homepage with the headline "Unbreakable agents, invisible infra" beside sample code using step.run, step.waitForEvent and inngest.score](https://assets.zenml.io/content/blog/trigger-dev-alternatives/5ce6054d/05-inngest-hero.avif)

[Inngest](https://www.inngest.com/) is an event-driven durable functions platform and the closest match to Trigger.dev, structurally. It supports first-party SDKs for Python, TypeScript, and Go, which makes it the easiest move when language support is what repels you from Trigger.dev.

### Features

- Record each `step.run()` output so Inngest can reuse it when a later step fails. Completed model calls, API requests, and tool actions do not need to run again, which keeps retries cheaper and avoids duplicate work.
- Pause a function with sleeps, signals, and event waits until a user replies, a webhook arrives, or a delay elapses. It resumes from the waiting point once the condition is met, which fits approval flows, webhook callbacks, and human-in-the-loop processes.
- Trigger functions from webhooks, schedules, queues, or app events. Each workflow can also emit new events as it progresses, making it easier to connect agent runs with existing product actions and backend processes.
- Replay failed functions by creating new runs from the original events. You can filter those runs by status and time range, which is useful after an outage or bad deployment.

### Pricing

Inngest is source-available and can be self-hosted. It also offers a free hobby plan alongside two paid plans:

- **Pro:** $99 per month
- **Enterprise:** Custom pricing

![Inngest pricing page showing the free Hobby plan, the Pro plan at 99 dollars per month with 1M executions included, and a custom-priced Enterprise plan](https://assets.zenml.io/content/blog/trigger-dev-alternatives/529c4f81/06-inngest-pricing.avif)

### Pros and Cons

Inngest solves Trigger.dev’s Python limitation without forcing you into a tool sprawl. Its memoized steps also make repeated inline work less likely, as long as you place model and tool calls inside step boundaries.

Where it stops short is replay fineness. Inngest Replay is a bulk recovery tool. It is good for rerunning broken functions after a fix, but it does not provide a built-in checkpoint fork for testing one changed prompt or tool result.

**Related read:** [Kitaru vs Inngest](https://www.zenml.io/compare/kitaru-vs-inngest)

## 3. Hatchet

![Hatchet homepage with the headline "The orchestration engine for teams who ship", describing a platform for orchestrating AI agents, scheduling background tasks and running mission-critical workflows](https://assets.zenml.io/content/blog/trigger-dev-alternatives/bffbfacc/07-hatchet-hero.avif)

[Hatchet](https://hatchet.run/) is an open-source task and workflow platform built around workers and queues. It supports Python, TypeScript, Go, and Ruby, and it gives operators detailed control over concurrency, rate limits, and worker placement.

### Features

- Write tasks and workers in Python, TypeScript, or Go, within the same app. Polyglot support is built-in and not a workaround, which gives you freedom to keep agent code and backend services in their existing runtimes.
- Replay a run from the step that failed and let Hatchet create a new workflow instance starting from that step, with the same input data. In the run details view, you can select a step and use the replay control. You can also edit the JSON input for that step before replaying.
- Control how many workers, queues, and tasks run at once. This matters when your models or internal services are rate-limited, because an agent fleet can exceed those limits without much traffic.
- Configure retries, backoff rules, and non-retryable errors beside each task definition. Temporary model or API failures can retry automatically while known business errors stop immediately. You get precise failure handling without wrapping every task in custom retry logic.

### Pricing

Hatchet is free and open source, and Hatchet Cloud has a free developer tier, plus usage-based tiers:

- **Team:** $500 per month
- **Scale:** $1,000 per month
- **Enterprise:** Custom pricing

![Hatchet pricing page showing the free Developer tier with the first 100,000 runs included, the Team plan at 500 dollars per month, and the Scale plan at 1,000 dollars per month](https://assets.zenml.io/content/blog/trigger-dev-alternatives/83407092/08-hatchet-pricing.avif)

### Pros and Cons

Hatchet has the most precise replay story of the general-purpose engines here. Restarting from the failed step with an editable input is closer to agent debugging than a whole-run rerun. Also, the queue controls are better than what Trigger.dev exposes.

In contrast, Hatchet does not document a side-by-side replay flow, which keeps an entire earlier trajectory fixed while one recorded checkpoint changes. Pricing also steps up sharply. The jump from the Developer tier to Team is $500 per month, a lot for a small team that has outgrown the free tier but not much else.

**Related read:** [Kitaru vs Hatchet](https://www.zenml.io/compare/kitaru-vs-hatchet)

## 4. Temporal

![Temporal homepage with the headline "Build AI apps and agents on an open foundation" beside a Python workflow example using workflow.defn and workflow.execute_activity](https://assets.zenml.io/content/blog/trigger-dev-alternatives/bf30081f/09-temporal-hero.avif)

[Temporal](https://temporal.io/) is the most established durable execution platform on this list. If Trigger.dev feels too light for what you are building and your agent durability covers many services, Temporal is a good pick.

### Features

- Define workflows in Go, Java, TypeScript, or Python, among other SDKs. The orchestration logic stays in an ordinary function in your editor that you can test and version with the rest of the app code.
- Recover workflow state through deterministic replay of event history. It starts the Workflow code from the beginning, replays the Event History step by step, and uses that history to guide the code back to the exact state as before.
- Reset a workflow execution to a chosen event ID and create a new execution from that point. Temporal copies the event history up to that reset point and lets you control which events are reapplied afterward with `All`, `Signal`, or `None`.
- Configure retry policies per activity, setting backoff behavior and which failures count as retryable, so an unreliable API call can retry without restarting unrelated work. This gives you better control over external activities.

### Pricing

Temporal is free to self-host. Temporal Cloud has three tiers:

- **Essentials:** Starting at $100 per month
- **Business:** Starting at $500 per month
- **Enterprise:** Custom pricing

![Temporal Cloud pricing showing Essentials starting at 100 dollars per month, Business starting at 500 dollars per month, and a contact-sales Enterprise tier](https://assets.zenml.io/content/blog/trigger-dev-alternatives/96388d63/10-temporal-pricing.avif)

### Pros and Cons

Choose Temporal when you need durable execution across several languages and services. Its event history and workflow reset features provide deep recovery controls, while activity boundaries isolate side effects.

That depth comes with rules. Workflow code must stay deterministic, side effects belong in activities, and versioning long-lived workflows becomes a real engineering discipline. Reset is also built for operational recovery and not purpose-built for a side-by-side comparison of agent paths. For a team whose entire problem is one Python agent, that is a lot of platform to absorb.

**Related reads:**

- [Kitaru vs Temporal](https://www.zenml.io/compare/kitaru-vs-temporal)
- [Temporal alternatives](https://www.zenml.io/blog/temporal-alternatives)
- [Temporal pricing](https://www.zenml.io/blog/temporal-pricing)

## 5. Restate

![Restate homepage with the headline "Build innately resilient backends and agents", describing a lightweight runtime that turns AI agents, workflows and backend services into durable processes](https://assets.zenml.io/content/blog/trigger-dev-alternatives/e57dc033/11-restate-hero.avif)

[Restate](https://www.restate.dev/) is a lightweight runtime for durable services, workflows, and AI agents. It records completed operations in a journal, then uses that journal to skip work that has already finished after a crash.

### Features

- Build durable services with official SDKs for TypeScript, Java, Kotlin, Python, Go, and Rust. That is the widest language coverage on this list, and Python is a first-class runtime rather than an extension.
- Recover through a journal of completed steps. Code automatically stores completed steps and resumes from where it left off when recovering from failures. This allows execution to continue from saved progress after a worker restarts.
- Keep durable state next to the service or virtual object that owns it. Agent session state, task progress, and tool outputs live with the execution path and let you create a natural boundary around each customer, session, or job.

### Pricing

Restate is open source and free to self-host. Restate Cloud offers a diverse pricing model, starting with a free plan with 50K actions, and four paid plans:

- **Starter:** $75 per month
- **Business:** $300 per month
- **Premium:** $1,000 per month
- **Enterprise:** Custom pricing

![Restate Cloud pricing showing the Free plan with 100k actions, Starter at 75 dollars per month, Business at 300 dollars per month, Premium at 1,000 dollars per month, and a custom Enterprise tier](https://assets.zenml.io/content/blog/trigger-dev-alternatives/b659644d/12-restate-pricing.avif)

### Pros and Cons

Restate gives you durability without adopting a large platform, and the action-based pricing is unusually legible. The six-language SDK range suits agent backends that run Python agents and Java services in the same building.

The service and virtual-object model still requires a new way of structuring backend code. That is a real mental shift if you arrived wanting a task queue with better retries. History retention is also short on the lower tiers, at one to three days on Free and Starter. That constrains you if your debugging loop is slower than your retention window.

**Related read:** [Kitaru vs Restate](https://www.zenml.io/compare/kitaru-vs-restate)

## 6. LangGraph

![LangGraph homepage with the headline "Balance agent control with agency", describing an agent runtime and low-level orchestration framework](https://assets.zenml.io/content/blog/trigger-dev-alternatives/cee37217/13-langgraph-hero.avif)

[LangGraph](https://www.langchain.com/langgraph), from LangChain, is an open-source framework for stateful agents. It models agents as graphs of nodes and edges, while LangSmith Deployment provides managed hosting, traces, and operational controls.

### Features

- Model agent behavior as a stateful graph of nodes and edges that represent tools, routers, decisions, and handoffs. Loops and branches become explicit structures and are easy to inspect and debug.
- Persist graph state with checkpoints per thread. An agent can pause, resume, and retain context across multiple turns or sessions. You can use this for conversational agents and workflows that need a long-lived state.
- Use time travel to inspect and branch past runs. You call `get_state_history()` to list the checkpoints in a thread, then `update_state()` on a chosen checkpoint to create a fork. This gives engineers a practical way to test another prompt, tool result, or routing decision.
- Pause the graph before risky actions for human review. The same state continues after a reviewer approves or edits the proposed action, which gives oversight before sending messages, changing records, or calling sensitive tools.

### Pricing

LangGraph is open source and free. LangSmith, the deployment layer, has a free developer plan, and then seat-based pricing:

- **Plus:** $39 per seat per month
- **Enterprise:** Custom pricing

![LangSmith pricing showing the free Developer plan for a single seat, the Plus plan at 39 dollars per seat per month, and custom Enterprise pricing](https://assets.zenml.io/content/blog/trigger-dev-alternatives/5194630b/14-langgraph-pricing.avif)

### Pros and Cons

If you’re already using LangChain, this is the least disruptive move off Trigger.dev. Its checkpoint history and branching API match the way agent developers think about state.

The catch is the cost after the fork. LangGraph re-executes every downstream node, so later model calls and API calls happen again. That is fine for a short graph and expensive for a long one. Durability also depends on the selected checkpointer and deployment setup. It does not make every step durable by default.

**Related reads:**

- [LangGraph alternatives](https://www.zenml.io/blog/langgraph-alternatives)
- [LangGraph pricing](https://www.zenml.io/blog/langgraph-pricing)
- [Kitaru vs LangGraph Deep Agents](https://www.zenml.io/compare/kitaru-vs-langgraph-deep-agents)

## 7. Cloudflare Workflows

![Cloudflare Workflows product page with the headline "Build durable workflows and multi-step applications", describing an execution engine built on Cloudflare Workers](https://assets.zenml.io/content/blog/trigger-dev-alternatives/f06c8539/15-cloudflare-hero.avif)

[Cloudflare Workflows](https://www.cloudflare.com/products/workflows/) builds durable multi-step code on Cloudflare Workers that automatically retry and persist state. It’s a natural choice for teams that already use Workers, R2, D1, and other Cloudflare services.

### Features

- Break work into durable units with `step.do()`, where each step’s state persists and retries independently. Execution survives across minutes to weeks without managing infrastructure.
- Pause with `step.sleep()`, `step.sleepUntil()`, or `step.waitForEvent()`. The flow can wait for a timer, webhook, or human input and resume when the input arrives. You can build approval and callback flows without maintaining their own polling layer.
- Pay nothing for idle time. Cloudflare bills for active CPU time; a Workflow that is waiting on a response to an API call, sleeping, or otherwise idle does not incur CPU time.
- Use the Workers runtime and Cloudflare bindings, including R2, D1, and other bindings, without running a separate orchestration service. This helps you keep durable execution close to your existing data and edge services.

### Pricing

Workflows are billed on four dimensions: CPU time, requests, storage, and steps. The Free plan includes 3,000 workflow steps per day, then you can continue with any of the paid plans:

- **Pro:** $20 per month
- **Business:** $200
- **Contract:** Custom pricing

**👀Note:** Cloudflare has announced that billing for steps and storage begins no earlier than August 10, 2026, so the step and storage lines are not yet charged on Workers Paid.

![Cloudflare pricing page showing the Free plan, Pro at 20 dollars per month, Business at 200 dollars per month, and custom Contract pricing](https://assets.zenml.io/content/blog/trigger-dev-alternatives/96a318fb/16-cloudflare-pricing.avif)

### Pros and Cons

If your stack is already on Cloudflare, Workflows is the cheapest durable execution you will find. Cloudflare now offers a Python Workflows SDK in beta, so the platform is no longer limited to JavaScript and TypeScript. The Python support is still new, which matters for teams that want a mature agent runtime today.

The problem is that the Python agent stack is as awkward as it is on Trigger.dev, and arguably more so given the Workers CPU-time limits. Replay is also not part of the model in the sense agent teams mean.

## Wrapping Up

The right choice depends on what pushed you away from Trigger.dev:

- Choose Kitaru when you run Python agents and need to replay a chosen checkpoint with one changed input, model, or tool result.
- If the blocker is language, Inngest is the shortest move. First-party Python, memoized steps, and an event-driven model that will feel familiar coming from Trigger.dev.
- Suppose durability extends across services, choose Temporal or Restate. Temporal for depth and reset-to-event-ID, Restate for six SDK languages and pricing you can actually forecast.
- If you are already in LangChain, LangGraph with LangSmith Deployment. Just price in that a fork re-executes every node downstream of it.

Every option on this list, except Kitaru, treats replay as a recovery mechanism. That design works for background jobs, but agent debugging requires holding a recorded trajectory fixed, changing one model or one retrieved value, and comparing.

That is the gap [Kitaru](https://www.zenml.io/product/kitaru) was built for, and it is why its replay reads recorded checkpoints instead of re-executing them.

Star the project on [GitHub](https://github.com/zenml-io/kitaru), read the [docs](https://docs.zenml.io/kitaru), or [book a demo](https://www.zenml.io/book-your-demo/kitaru) if your team needs a managed control plane through ZenML Pro.
