---
title: "Introducing the new Kitaru: from production traces to repeatable evals"
slug: "introducing-the-new-kitaru"
draft: false
author: "hamza-tahir"
category: "kitaru"
tags:
  - "kitaru"
  - "agents"
  - "evaluation"
  - "production"
  - "release"
date: "2026-08-18T09:34:52.617Z"
readingTime: "10 mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/introducing-the-new-kitaru/3af3b81f/introducing-the-new-kitaru-hero.avif"
  alt: "Introducing the all new Kitaru: turn real traces into replayable evals and test changes against what your agent has actually seen"
seo:
  title: "Introducing the New Kitaru: Production Traces to Repeatable Evals - ZenML Blog"
  description: "The new Kitaru turns production traces you already collect into replayable test scenarios, expert-reviewed cohorts, and evaluators you can run on every change."
  canonical: "https://www.zenml.io/blog/introducing-the-new-kitaru"
  ogImage: "https://assets.zenml.io/content/blog/introducing-the-new-kitaru/7f4e66c3/introducing-the-new-kitaru-cover.jpg"
---

If you run agents in production, you probably already have some kind of eval process.

A bad session shows up. Someone saves the trace. You inspect what happened, ask a domain expert what should have happened, maybe add it to a spreadsheet or write a small regression test. Then the next time you change the model or prompt, you rerun some of those cases and compare.

Most teams we spoke to were doing some version of this already.

The problem is that it tends to stay ad hoc.

- Traces live in one tool and expert judgments live somewhere else.
- Regression cases get collected manually.
- Replays are custom scripts.
- Evaluators are written one at a time.

And there is rarely a standard path from:

**this went wrong in production**

to

**this is now a repeatable test we can run against every future change.**

That is what we rebuilt Kitaru around.

The new Kitaru gives you a structured way to turn the traces you already collect into replayable test scenarios, organize them around real failure modes, attach expert judgment, turn that judgment into evaluators, and run the same cases again when you change your agent.

The idea is simple:

**Production is already generating your best test cases. Kitaru helps you turn them into a test suite.**

![Kitaru Sessions view for the returns-resolver agent, listing imported and replayed sessions with status, origin, version, cost, and refund-policy-gates verdicts](https://assets.zenml.io/content/blog/introducing-the-new-kitaru/cf101fe0/image1.avif)

## Why this gets messy so quickly

The obvious approaches all work to some extent. That is why teams use them.

They just become painful as the agent gets more important.

You can write eval cases by hand, but good ones need input from the people who actually understand the domain. Those are usually your most time-constrained experts, and a static set starts drifting away from production as the product changes.

You can save traces and rerun them manually, but agent sessions are not ordinary unit tests. Tool calls can issue refunds, mutate a CRM, send an email, or touch some other real system. Replaying them live is often not an option.

Another approach is to use canary releases, but many agent products do not have enough traffic for small regressions to become statistically obvious before users feel them.

So teams build their own glue around all of this.

That works for a while.

What we wanted was a standard workflow that starts with what already happened in production and ends with something you can run again safely.

## Start with the traces you already have

The best place to find useful test cases is usually not a blank document.

It is your trace store.

That is where the real edge cases are: the weird tool loops, the session that ran for sixteen hours, the policy violation nobody caught at the time, the user requests your hand-written test set never anticipated.

Kitaru imports those traces and turns them into sessions it can work with.

It pulls history from Langfuse, LangSmith, Braintrust, Logfire, plain JSONL, or anything OpenTelemetry-shaped.

You do not need to replace your observability stack. Keep whatever you already use in production. Kitaru reads from it.

```bash
pip install kitaru

kitaru agent register support-agent --command "python support.py"

kitaru session import langfuse-export.jsonl \
  --importer kitaru/langfuse@latest \
  --agent support-agent@latest --wait
```

If you would rather record new runs directly, adapters can wrap your existing agent across Pydantic AI, LangGraph, the OpenAI Agents SDK, Mastra, and the Vercel AI SDK.

Once a session is in Kitaru, it does not matter whether it came from an existing trace store or was recorded directly. It becomes something you can investigate, evaluate, and replay.

## Find the failure modes worth testing

Importing a thousand traces is not the same as having a useful eval set.

You still need to know which behavior matters.

And in practice, most teams cannot sit down and list every failure mode their agent has. They usually discover them by looking at what has actually happened.

So Kitaru starts there.

Deterministic and LLM-powered checks sweep through your imported sessions and surface patterns worth investigating.

Maybe it finds:

- sessions that ran for sixteen hours
- agents stuck in repeated tool calls
- unusually expensive sessions
- strange outliers nobody flagged at the time
- groups of sessions that appear to fail in the same way

![A Kitaru cohort holding three reviewed sessions, each graded compliant or violation by the refund-policy-gates evaluator](https://assets.zenml.io/content/blog/introducing-the-new-kitaru/b8b41783/image2.avif)

These are starting points, not ground truth.

Kitaru then pulls together related sessions and counterexamples so you can decide whether the pattern actually matters.

## Bring in expert judgment where it matters

This part is important.

An LLM can propose that two sessions look similar. It should not get to decide what your business considers correct.

That is where your domain experts come in.

Instead of asking someone to invent eval criteria from scratch, Kitaru puts real production cases in front of them and asks concrete questions tied to what happened.

For example: **Given this recorded policy result and this accepted refund, should the agent have escalated?**

![A Kitaru session timeline showing each LLM and tool call, with an annotation panel asking a reviewer whether a $280 refund should have required human approval](https://assets.zenml.io/content/blog/introducing-the-new-kitaru/ea6d66be/image3.avif)

The answer is stored against the relevant part of the trace, so the judgment stays connected to the evidence that produced it.

Sessions can then be marked acceptable, problematic, or uncertain.

Over time, those decisions become cohorts: pinned, versioned groups of sessions that represent a particular behavior or failure mode you care about.

Instead of maintaining one giant hand-written benchmark, you end up with sets like:

- `refund_escalation`
- `tool_call_loops`
- `incorrect_routing`
- `long_running_sessions`

## Turn those judgments into evaluators

Once your experts have established what good and bad look like, you want to stop asking them the same question forever.

That is where evaluators come in.

In Kitaru, an evaluator is a small Python function that reads a session and returns a typed verdict.

```python
def evaluate(session: SessionView, **params) -> EvaluationResult:
    return EvaluationResult(
        name="escalation_required",
        passed=False,
        explanation="Refund exceeded policy limit with no escalation node.",
    )
```

Your evaluators live in code and are versioned alongside your agent.

![The Kitaru evaluator page for refund-policy-gates version 1.0, showing its definition, registration details, and Python source code](https://assets.zenml.io/content/blog/introducing-the-new-kitaru/8fb397e2/image4.avif)

But creating an evaluator is not enough.

Before it gates anything, you need to know whether it actually agrees with the people whose judgment you are trying to reproduce.

Kitaru lets you run the evaluator over sessions your experts have already reviewed and compare the results.

If an evaluator disagrees with your domain expert half the time, it has no business blocking a deploy.

Once it is calibrated, that expert judgment becomes something you can apply repeatedly without asking the expert to review every future session by hand.

## Replay what really happened

Now comes the useful part.

You have a production session where something happened and you want to know what would happen if you changed the agent.

Maybe you switched from one model to another or edited the system prompt or changed how much context the agent gets or changed a tool policy.

You want to run that exact situation again, but you do not want the agent touching the real systems it touched the first time.

Kitaru lets the recording stand in for the world the agent originally saw.

Set the tool policy to `history`, and calls are answered from the recorded session instead of hitting the live tool.

```json
{"default": {"type": "history", "scope": "baseline", "on_miss": "fail"}}
```

So a replay can execute your actual agent code without issuing another refund or modifying another CRM record.

![The Kitaru Jobs tab listing replay jobs with status and duration, including one replay that failed when the agent process exited](https://assets.zenml.io/content/blog/introducing-the-new-kitaru/e5828a23/image5.avif)

There is one important rule here:

**Replay the session unchanged first.** Before testing a new model or prompt, make sure Kitaru can reproduce the original behavior. That gives you a baseline you can trust. Then change one thing and replay it again.

Now you are no longer asking whether the new configuration feels better.

You can ask:

**What would this agent have done differently on the same production case?**

## Test a change across a whole cohort

![A Kitaru experiment run comparing a stricter refund-gate instruction against a reviewed cohort, showing three of three sessions passed](https://assets.zenml.io/content/blog/introducing-the-new-kitaru/33e3aea2/image6.avif)

One replay is useful for debugging.

A cohort is useful for making a decision.

An experiment in Kitaru represents the change you want to test. An experiment run applies it across a particular cohort and scores the results with the same evaluators.

```bash
kitaru experiment run start cheaper-model \
  --cohort-version <version-id> \
  --agent support-agent@1 \
  --evaluate-baselines \
  --wait
```

The baseline gets scored too, so the old and new behavior sit next to each other.

Now you can see things like:

**12 of 14 sessions improved.**

Or:

**The cheaper model performed the same everywhere except the refund escalation cohort.**

Or:

**The new prompt fixed tool loops but made routing worse.**

That is much more useful than "we tried the new model and it looked good."

Cohort versions are immutable, so the result remains reproducible. You know exactly which sessions were tested, which version of the agent ran them, and which evaluator judged the result.

## Then keep using the same cases

This should not end as a one-off experiment.

Once a failure mode matters enough to become a cohort, you can keep testing against it. New production sessions can be sorted into the cohorts you already defined. The same cohorts can run when the model changes, when the prompt changes, or as part of CI.

So instead of maintaining a benchmark that slowly becomes less representative of your product, the benchmark can keep absorbing what production teaches you.

The flow becomes:

**Production trace → investigate → expert judgment → cohort → evaluator → replay → experiment → CI**

And when production finds a new failure mode, the loop starts again.

## Where Kitaru sits next to Langfuse, Braintrust, and LangSmith

Langfuse, Braintrust, LangSmith, and other platforms already have strong evaluation products. Kitaru is not asking you to replace the observability stack you already use.

In fact, we expect many teams to keep those systems exactly where they are and import traces from them.

The distinction we care about is what happens after you have the trace.

Kitaru is deliberately framework and platform agnostic. A production trace should remain useful regardless of which framework produced it or where it was stored.

More importantly, Kitaru has a relationship with your codebase, not just your traces. Your evaluators are Python functions that can live in your repo. Replays run your actual agent code in your environment. Experiments compare specific agent versions against specific cohort versions. The code that produced the behavior is a first-class part of the test.

## If you already use Kitaru

If you used an earlier version of Kitaru, there are some changes to how the new system is organized.

The most important one is that **Workers replace the old Stack concept**.

Workers are now the execution layer that runs your agent code for replays and experiments.

If your current Kitaru setup is built around Stacks, follow the new documentation when moving over rather than trying to translate the old setup one to one.

The new docs are here: [docs.zenml.io/kitaru](https://docs.zenml.io/kitaru)

The basic principle is still the same: your code runs in your environment. We changed how that execution layer is configured and represented.

## Try it

Kitaru is open source and free to use.

The Worker that runs your replays sits next to your code, in your environment, with your dependencies and credentials.

If your traces cannot leave your infrastructure, the whole setup can be self-hosted.

```bash
uv add "kitaru[cli,worker]"
```

Managed workspaces are at [cloud.kitaru.ai](https://cloud.kitaru.ai/).

The docs are at [docs.zenml.io/kitaru](https://docs.zenml.io/kitaru).

The code is on [GitHub](https://github.com/zenml-io/kitaru).

If you are already doing some version of this with scripts, saved traces, spreadsheets, custom evals, or your own replay setup, I would especially like to hear from you.

That is exactly the workflow we are trying to make less ad hoc.
