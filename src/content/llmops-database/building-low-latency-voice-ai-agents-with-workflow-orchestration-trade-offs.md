---
title: "Building Low-Latency Voice AI Agents with Workflow Orchestration Trade-offs"
slug: "building-low-latency-voice-ai-agents-with-workflow-orchestration-trade-offs"
draft: false
llmopsTags:
  - "customer-support"
  - "realtime-application"
  - "latency-optimization"
  - "prompt-engineering"
  - "agent-based"
  - "harness-engineering"
  - "cost-optimization"
  - "system-prompts"
  - "langchain"
  - "postgresql"
  - "redis"
  - "fastapi"
  - "monitoring"
  - "openai"
  - "meta"
  - "microsoft-azure"
industryTags: "finance"
company: "Gradient Labs"
summary: "Gradient Labs built an AI-powered customer support agent for financial services, initially supporting text-based interactions through chat, email, and WhatsApp using Temporal for workflow orchestration. When expanding to voice support, the team faced significant latency challenges as customers would hang up after waiting just a few seconds for responses. The solution involved multiple optimizations: switching to faster LLM providers like Grok and Cerebras, implementing aggressive caching and compression, running redundant concurrent inference requests to minimize variance, and developing a custom \"fast exec\" approach that detached child workflows from the parent to avoid sequential execution bottlenecks. While this achieved acceptable response times for production voice calls, it required deliberately trading some of Temporal's resilience guarantees for speed, acknowledging that the approach leaves 100-200 milliseconds of latency on the table compared to removing the orchestration layer entirely."
link: "https://www.youtube.com/watch?v=8oNZ_vtoTb0"
year: 2026
seo:
  title: "Gradient Labs: Building Low-Latency Voice AI Agents with Workflow Orchestration Trade-offs - ZenML LLMOps Database"
  description: "Gradient Labs built an AI-powered customer support agent for financial services, initially supporting text-based interactions through chat, email, and WhatsApp using Temporal for workflow orchestration. When expanding to voice support, the team faced significant latency challenges as customers would hang up after waiting just a few seconds for responses. The solution involved multiple optimizations: switching to faster LLM providers like Grok and Cerebras, implementing aggressive caching and compression, running redundant concurrent inference requests to minimize variance, and developing a custom \"fast exec\" approach that detached child workflows from the parent to avoid sequential execution bottlenecks. While this achieved acceptable response times for production voice calls, it required deliberately trading some of Temporal's resilience guarantees for speed, acknowledging that the approach leaves 100-200 milliseconds of latency on the table compared to removing the orchestration layer entirely."
  canonical: "https://www.zenml.io/llmops-database/building-low-latency-voice-ai-agents-with-workflow-orchestration-trade-offs"
  ogTitle: "Gradient Labs: Building Low-Latency Voice AI Agents with Workflow Orchestration Trade-offs - ZenML LLMOps Database"
  ogDescription: "Gradient Labs built an AI-powered customer support agent for financial services, initially supporting text-based interactions through chat, email, and WhatsApp using Temporal for workflow orchestration. When expanding to voice support, the team faced significant latency challenges as customers would hang up after waiting just a few seconds for responses. The solution involved multiple optimizations: switching to faster LLM providers like Grok and Cerebras, implementing aggressive caching and compression, running redundant concurrent inference requests to minimize variance, and developing a custom \"fast exec\" approach that detached child workflows from the parent to avoid sequential execution bottlenecks. While this achieved acceptable response times for production voice calls, it required deliberately trading some of Temporal's resilience guarantees for speed, acknowledging that the approach leaves 100-200 milliseconds of latency on the table compared to removing the orchestration layer entirely."
notion:
  pageId: "373f8dff-2538-80bc-8a7e-f425536bdb05"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:21:00.000Z"
  lastEditedTime: "2026-06-02T07:21:00.000Z"
  publishedAt: "2026-06-04T08:04:10Z"
---

## Overview

Gradient Labs developed an AI-powered customer support agent specifically designed for highly regulated financial services industries including banking, lending, fintech, and insurance. The company's journey from text-based to voice-based support illustrates the complex trade-offs involved in deploying LLMs in production environments with strict latency requirements.

The case study centers on a back-end engineer's experience building and optimizing a voice AI agent while using Temporal as the primary workflow orchestration system. What makes this particularly interesting from an LLMOps perspective is the tension between leveraging existing infrastructure built for asynchronous text interactions and adapting it for synchronous, real-time voice conversations where customers expect responses within seconds rather than minutes.

## Initial Text-Based Agent Architecture

The foundation of Gradient Labs' system was a text-based agent that handled customer interactions through various channels including Intercom, Salesforce, Zendesk, and a proprietary API. The architecture leveraged Temporal extensively, using a long-running conversation workflow that could persist for up to several weeks depending on the complexity of customer issues and response times.

The conversation workflow acted as the central coordination point, receiving customer messages as signals and maintaining the entire conversation state. This design provided significant benefits: durability was critical for multi-day conversations, and the mental model of having one place to view the entire conversation state rather than distributed state across multiple systems proved valuable for debugging and understanding agent behavior.

Underneath this conversation layer, the team built an "agent" deployment written in Go that handled the actual intelligence of the system. Rather than relying on agentic frameworks, they found that plain Go code with Temporal layering provided their AI engineering team with maximum flexibility to customize agent behavior while avoiding concerns about partial failures or durability issues.

The core intelligence resided in what they called the "turn workflow," a short-lived workflow invoked many times throughout a conversation's lifetime. The turn workflow took the full conversation state and generated the next response, whether a message to the customer, a tool call, an escalation, or a conversation closure. Internally, the turn workflow composed multiple skills that the AI engineering team had built over time: classification, answer generation, multiple guardrails for regulatory compliance, translation, and other capabilities. Each skill was registered as a child workflow, and these in turn used various building blocks defined as activities, including LLM completions, API calls, and tool invocations.

For the text-based agent, this architecture worked well. While the team wanted to avoid slowness, they were not highly latency-sensitive. If a system component crashed and recovery took a couple of minutes, Temporal could simply pick up where it left off and send the reply to the customer without significant issues.

## The Voice Challenge

When Gradient Labs decided to build a voice version of their support agent, the latency requirements changed dramatically. If a customer calls and has to wait even two to five seconds for an agent response, they will hang up. Recovery after a couple of minutes becomes meaningless because the customer is already gone.

The team explored several approaches before settling on their final architecture. Speech-to-speech models were initially attractive due to their expressiveness, low latency, and engaging conversational quality. However, for the regulated industries Gradient Labs serves, these models proved insufficiently reliable. The state-of-the-art models remained vulnerable to prompt injection and prone to hallucination, making them unsuitable for financial services use cases where accuracy and compliance are paramount.

Various agent builder products were also evaluated. While many of these platforms offered excellent user experiences and simplified the process of adding speech-to-text and text-to-speech capabilities, they did not provide the AI engineering team with sufficient flexibility to customize the agent's underlying behavior to meet their specific requirements.

The team ultimately settled on a traditional architecture: speech-to-text input, a text-based LLM agent in the middle, and text-to-speech output. This approach allowed them to reuse much of their existing text-based agent infrastructure. They replaced their chat integrations with LiveKit for telephony and long-lived rooms, Deepgram for low-latency speech-to-text models, and Cartesia and ElevenLabs for expressive text-to-speech voices.

## The Temporal Latency Question

A critical question emerged: why use Temporal for voice interactions when latency sensitivity was so much higher and resilience mattered less? If the system fails and recovers even shortly afterward, the customer has already disconnected, making the durability guarantees less valuable.

The team had several reasons for continuing to use Temporal. First, they wanted consistency and code sharing with their text agent. The team had invested significant effort in building skills for the text agent, and they wanted to reuse these directly for the voice MVP while developing new voice-specific skills over time using the same internal libraries and abstractions.

Second, Temporal proved invaluable for debugging. The team spent considerable time in the workflow UI understanding what happened in given turns and why the agent responded in particular ways. This debugging capability extended beyond human use; they had built a debug workflow skill that could traverse child workflows and, when given access to source code, had a high success rate in diagnosing problems.

Third, their platform was built around Temporal in ways that would be difficult to unwind quickly. Their testing environments automatically spun up workers listening on task queues named after pull request numbers, allowing AI engineers to test agent versions outside production. Additionally, activities were only accessible to the agent via Temporal, which would have required significant work to refactor.

However, these were not the real reasons they used Temporal for voice. The honest reason was that they had already built the voice agent using Temporal before realizing it would create significant latency problems. This mistake stemmed from two incorrect assumptions.

## Incorrect Assumption One: LLM Parts Would Be Slow

The team assumed that LLM operations would dominate latency, making Temporal overhead negligible in comparison. Their text agent turns took mid-tens of seconds to generate, far from what they needed for voice. They expected to have their work cut out for them optimizing LLM performance and assumed Temporal latency would be a drop in the ocean.

The AI engineering team, however, achieved dramatic speed improvements through several approaches:

They onboarded Grok and Cerebras for fast inference, providers capable of serving tokens much faster than their previous APIs. They implemented compression and caching of conversations and restructured prompts to maximize use of cached input tokens. They used small, fast, open-source models from these providers, giving them very narrow, constrained tasks to maintain quality while improving speed.

An example of this task constraint was holding responses. When the agent needed slightly more time to generate a main response, it would send a holding message to the customer. Rather than asking the agent to generate a natural human-like response, they broke this down into strict tags: a phatic component to empathize with the customer and acknowledge them, and a pragmatic component indicating what the agent would do next. By constraining models to this structured format, they could use smaller, cheaper, faster models effectively.

They also embraced redundant work. For their text agent, a typical turn flow involved first classifying the customer's question to determine what they were asking about, then generating an answer based on the relevant standard operating procedure, and finally running guardrails over the answer for quality and compliance. For voice, they ran all of these steps concurrently rather than sequentially. Instead of waiting for classification to complete, they would answer all possible questions the customer could have asked, then throw away the irrelevant results once classification returned. While wasteful, this approach proved cost-effective given the use of cheap cached input tokens with small models and their pre-launch status.

This helped, but they still saw high variance in latency. On good runs, they achieved just over 300 milliseconds, but on bad runs latency could double, triple, or worse. Their solution was to throw more resources at the problem: instead of answering each question once, they sent three requests to the LLMs for each possible question. Sometimes these were identical requests; sometimes they sent requests to different providers or models. They simply took whichever response came back first. While hacky, this approach successfully brought average latency for agent replies way down.

## Incorrect Assumption Two: Temporal Would Be Fast Enough

The team's internal definition of "fast enough" was not scientifically rigorous but broadly meant that the latency incurred by using Temporal would be worth the simplicity and faster time-to-market for their V1 release. They scheduled child workflows concurrently and ran them concurrently, so based on production latencies and some napkin math, they believed they could understand and accept the latency Temporal would introduce.

They also thought they had optimization tricks available. Team members had seen blog posts and community discussions about using Temporal for real-time, customer-in-the-loop scenarios, including one excellent post about optimizing for use cases where customers actively wait for payment processing. They did not think they were going too far off the beaten path.

They expected their workflow execution to show all work kicking off simultaneously, running in parallel, and then taking the fastest answer. What they actually saw was the mess shown at the beginning of the presentation: child workflows taking seconds to start, not just to finish. The light green bars representing scheduled-to-start latency showed delays of three to five seconds on a scale that had been cropped.

Their first hypothesis was worker scaling: perhaps their machines were underpowered or they did not have enough pollers working the task queues. They initially observed this in testing environments, which tend to be less powerful than production, so they expected the problem might not persist. However, they saw the exact same behavior in production.

To diagnose further, they ran a test where they kicked off the same child workflows but not from the same parent workflow, instead using a standalone Temporal client. When started this way, all workflows began nearly simultaneously and the full flow completed much faster. This revealed that the problem was specific to children of the same parent workflow.

## Understanding the Root Cause

Their first thought was to rip Temporal out of the turn workflow entirely and convert it into a turn activity. While this would sacrifice the ability to pick up where they left off, they had already established this was less important for voice. However, this proved more difficult than expected because they had tied themselves in a knot architecturally.

At the bottom of their stack were activities that were only easily accessible as activities and could not be called directly. Since activities could only be invoked from workflows, everything that existed as child workflows had to remain as workflows to invoke those activities. They were stuck.

Looking under the hood at what was happening, when their agent worker ran the turn workflow code, the Temporal SDK would batch up child workflow commands locally and not send them to the server until the first time the turn workflow code yielded, which occurred when waiting for the result of a child workflow. At that point, the batch was sent to the server, which wrote the commands into the parent workflow history and into transfer tasks in a single transaction. This provided strong guarantees that all child workflows would start without any going missing, with automatic recovery in case of server failure.

Each transfer task ended up on a queue worked by a pool of goroutines that picked them up to start child workflows. The smoking gun was that the first action each goroutine took was to acquire a lock on the parent workflow. After acquiring the lock, it created the child workflow, wrote the new run ID into the parent workflow history, and only then released the lock before proceeding to schedule the child workflow's first task.

While one goroutine held the lock, all others waited to acquire it. This was why they saw the staggered pattern of child workflows starting sequentially rather than concurrently. They were scheduling work concurrently, it was sent to Temporal in one batch, and once started it ran concurrently, but the work started sequentially due to the parent workflow lock.

## The Solution: Detached Workflows

Temporal provides strong guarantees that all child workflows will start. However, given that many things can go wrong in distributed systems and that for voice any failure to complete in time is equivalent to complete failure, the team questioned whether they truly needed this guarantee. If they could tolerate partial failure cases anyway, was it really different if they failed to start a child workflow? Not really—it would just be one more reason a child workflow might not finish in time.

If they could forego that guarantee, could they make things faster? They developed an approach using side effects to run non-deterministic code from the main workflow without compromising determinism.

Their first step was to go into a side effect in the main workflow and use a normal Temporal client unrelated to the parent to start what would have been the child workflow. However, this still showed hundreds of milliseconds to start everything because the main workflow waited for the round trip to Temporal server for each detached workflow. Additionally, the main workflow finished before the detached workflows completed, leaving them running with no way to retrieve results.

To solve the latency problem, they started a goroutine to make the Temporal client call to start each detached workflow. This let the main turn workflow proceed quickly through all the starts while the goroutines made requests to Temporal. The scale now showed the parent workflow proceeding very quickly.

To retrieve results, they had each detached child workflow run inside a wrapper workflow that, upon completion, signaled back to the main turn workflow. While they could have done this coordination locally on the machine where they started the goroutine, that would introduce a large window of non-determinism where failures could occur. By wrapping this in a wrapper workflow, they stepped back into determinism as soon as they kicked off the detached workflow, minimizing the failure window.

The code became quite ugly, even in toy examples. They had to consume results on channels and check whether classification or answer results came back first, which was particularly nasty in their real code for AI engineers to work with. The workflow UI also became unhelpful, showing side effect after side effect and signal after signal without clarity on what was happening. Even Claude, their AI assistant, could not understand these workflows.

## The Fast Exec Library

In an ideal world, their code would use the existing future interface from the Temporal SDK that is used for real child workflows. With run async, you get a future that can be passed around, returned, and manipulated until you are ready to block and wait for its result by calling get or adding it to a selector to race multiple futures.

To achieve this, they used high-cardinality signal names rather than low-cardinality signals like "new customer message." They generated a unique ID for each detached workflow, started a wrapper workflow with knowledge of that ID, and implemented the future interface on their own struct containing that signal name. When calling get, they simply listened to that signal channel.

They wrapped this in a library called "fast exec," allowing their turn workflow code to look basically how it looked before, which was excellent for the AI engineering team's experience.

The workflow UI remained somewhat ugly with signal IDs not providing much clarity. A colleague contributed to the Go SDK to add summaries to side effects, which could then show up in the Temporal UI in a named way for easier browsing. They applied the same trick to signals and added additional conveniences like links to wrapper workflow URLs, allowing traversal even though they were not real child workflows.

## Performance Results and Trade-offs

The team achieved their goals of consistent and shared code with their text agent and debuggability in the Temporal UI. But was it fast enough?

There are two schools of thought. The generous view is yes, they were able to optimize the system sufficiently. They revisited optimization blog posts, with eager workflow start saving additional time. The pressure they felt while thinking they were stuck on Temporal latency motivated significant optimizations elsewhere in the stack, particularly in text-to-speech and speech-to-text components. The system now works in production: customers get responses in a reasonable amount of time and can have successful conversations rather than hanging up.

The less generous school of thought is that this is fundamentally the wrong technology for the job. They should remove Temporal from the turn workflow to save the 100-200 milliseconds they are leaving on the table. The speaker acknowledges this perspective has merit. At the high-level conversation coordination layer, Temporal remains a no-brainer. But down in the turn workflow, which executes every time a customer needs a reply, the latency is harder to justify.

The team acknowledges that a refactor removing Temporal from the turn workflow may be in their future. However, Temporal continues to launch new features, including AI-specific capabilities and improvements to streaming and standalone activities that might enable more idiomatic low-latency implementations within Temporal.

## Specific Latency Numbers

The team's rough estimate was approximately 30 milliseconds of latency per nested level in Temporal. From the main conversation workflow through to the turn, they accounted for about 30 milliseconds, and they tried to un-nest the turn as much as possible since nesting compounds. In the final implementation with wrapper workflows, Temporal added between 100 and 200 milliseconds.

They were able to mitigate some of this by overlapping operations. For example, since they always needed to perform text-to-speech, they kicked that off early within activities rather than waiting for results to bubble all the way back up the Temporal chain. The more they overlapped Temporal operations with necessary work, the less they actually incurred the latency cost.

For comparison, text-to-speech with ElevenLabs added anywhere from 150 to 300 milliseconds. Speech-to-text with self-hosted Deepgram added approximately 200 milliseconds. Deepgram's models, particularly their new Flux model with built-in turn-taking capabilities, proved valuable for the implementation.

The team uses Temporal Cloud rather than self-hosting, having read that Temporal Cloud provides the lowest latency and most performant option. They have not explored self-hosting optimizations.

## LLMOps Insights and Lessons

This case study provides several important insights for LLMOps practitioners working with production LLM systems:

The tension between reusing existing infrastructure and optimizing for new requirements is real and consequential. Gradient Labs' text-based agent architecture served that use case well, but voice requirements fundamentally changed the trade-offs. The team's decision to initially reuse their existing architecture was reasonable for rapid prototyping but required significant re-engineering once latency became critical.

Orchestration overhead matters in real-time systems. While workflow orchestration systems like Temporal provide immense value for durability, observability, and developer experience, they introduce latency that may be acceptable for asynchronous workflows but becomes problematic for synchronous, real-time interactions. The 100-200 milliseconds that Temporal added represented a significant percentage of their total response time budget.

Resilience and latency trade-offs must be deliberate. The team explicitly chose to trade Temporal's strong guarantees about child workflow execution for reduced latency. This was appropriate for their voice use case where failure to respond quickly is equivalent to complete failure, but it represents a meaningful degradation in system resilience that would be unacceptable for other use cases.

LLM inference optimization can yield dramatic improvements. The team's work to reduce LLM latency through provider selection, caching, prompt restructuring, and redundant concurrent requests proved more impactful than they initially expected. This shifted the bottleneck to orchestration overhead and forced them to address that component.

Observability and debugging remain critical even in latency-sensitive systems. Despite the latency costs, the team retained Temporal in part because of the debugging and observability benefits it provided. The ability to understand what happened in a given interaction and why the agent behaved in a particular way has value that extends beyond the engineering team to automated debugging workflows.

Architectural decisions have compounding effects. The team's decision to make activities only accessible via Temporal created technical debt that made it harder to optimize later. This illustrates the importance of considering future requirements and maintaining flexibility in foundational architectural choices.

Testing environments should reflect production constraints. The team initially observed latency problems in underpowered testing environments and hoped these would not persist in production. This delayed their recognition of the fundamental architectural issue and cost development time.

The case study also highlights the specific challenges of building AI agents for highly regulated industries. The team could not use speech-to-speech models despite their performance advantages because reliability and resistance to prompt injection were paramount. They needed guardrails, compliance checks, and structured outputs that constrained their architectural choices. These requirements shape LLMOps practices in ways that differ from less regulated domains.

Finally, the presentation demonstrates the value of transparency about limitations and trade-offs. The speaker acknowledged that their solution is "somewhat hacky" and that removing Temporal from the turn workflow might be the right long-term decision. This honest assessment of trade-offs, rather than claiming they found the perfect solution, provides more value to practitioners facing similar challenges.
