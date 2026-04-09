---
title: "Generating 1.4 Billion Personalized Music Narratives for Wrapped Archive"
slug: "generating-14-billion-personalized-music-narratives-for-wrapped-archive"
draft: false
llmopsTags:
  - "content-moderation"
  - "summarization"
  - "high-stakes-application"
  - "data-analysis"
  - "prompt-engineering"
  - "fine-tuning"
  - "knowledge-distillation"
  - "system-prompts"
  - "evals"
  - "human-in-the-loop"
  - "cost-optimization"
  - "latency-optimization"
  - "error-handling"
  - "kubernetes"
  - "monitoring"
  - "databases"
  - "microservices"
  - "scaling"
  - "orchestration"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "anthropic"
industryTags: "media-entertainment"
company: "Spotify"
summary: "Spotify's 2025 Wrapped Archive feature needed to generate personalized, creative narratives about remarkable listening moments for hundreds of millions of users. The engineering team built a comprehensive LLMOps pipeline that used heuristics to identify up to five \"remarkable days\" per user from their listening history, then generated approximately 1.4 billion LLM-powered reports. The solution combined prompt engineering, model distillation (fine-tuning a smaller model from a frontier model using curated outputs), Direct Preference Optimization based on A/B testing, distributed data pipelines, careful database schema design for concurrent writes, pre-scaling infrastructure for launch, and automated evaluation frameworks using LLM-as-a-judge on 165,000 sample reports. The system successfully delivered personalized narratives to 350 million users at a single global launch moment."
link: "https://engineering.atspotify.com/2026/3/inside-the-archive-2025-wrapped"
year: 2025
seo:
  title: "Spotify: Generating 1.4 Billion Personalized Music Narratives for Wrapped Archive - ZenML LLMOps Database"
  description: "Spotify's 2025 Wrapped Archive feature needed to generate personalized, creative narratives about remarkable listening moments for hundreds of millions of users. The engineering team built a comprehensive LLMOps pipeline that used heuristics to identify up to five \"remarkable days\" per user from their listening history, then generated approximately 1.4 billion LLM-powered reports. The solution combined prompt engineering, model distillation (fine-tuning a smaller model from a frontier model using curated outputs), Direct Preference Optimization based on A/B testing, distributed data pipelines, careful database schema design for concurrent writes, pre-scaling infrastructure for launch, and automated evaluation frameworks using LLM-as-a-judge on 165,000 sample reports. The system successfully delivered personalized narratives to 350 million users at a single global launch moment."
  canonical: "https://www.zenml.io/llmops-database/generating-14-billion-personalized-music-narratives-for-wrapped-archive"
  ogTitle: "Spotify: Generating 1.4 Billion Personalized Music Narratives for Wrapped Archive - ZenML LLMOps Database"
  ogDescription: "Spotify's 2025 Wrapped Archive feature needed to generate personalized, creative narratives about remarkable listening moments for hundreds of millions of users. The engineering team built a comprehensive LLMOps pipeline that used heuristics to identify up to five \"remarkable days\" per user from their listening history, then generated approximately 1.4 billion LLM-powered reports. The solution combined prompt engineering, model distillation (fine-tuning a smaller model from a frontier model using curated outputs), Direct Preference Optimization based on A/B testing, distributed data pipelines, careful database schema design for concurrent writes, pre-scaling infrastructure for launch, and automated evaluation frameworks using LLM-as-a-judge on 165,000 sample reports. The system successfully delivered personalized narratives to 350 million users at a single global launch moment."
notion:
  pageId: "325f8dff-2538-80af-93ff-c84136674450"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-03-16T08:40:00.000Z"
  lastEditedTime: "2026-04-09T17:37:00.000Z"
  publishedAt: "2026-04-09T17:57:10Z"
---

## Overview

Spotify's 2025 Wrapped Archive represents one of the most ambitious large-scale LLM deployment efforts documented publicly, involving the generation of approximately 1.4 billion personalized narrative reports for around 350 million users. The feature aimed to transform raw listening data into emotionally resonant stories about remarkable moments from users' year in music—such as their biggest discovery day, most nostalgic listening session, or the day they played nothing but "yearning" music for hours. This case study demonstrates sophisticated LLMOps practices across the entire lifecycle: from prompt engineering and model optimization to massive-scale deployment, quality assurance, and remediation.

The core technical challenge was not simply generating text at scale, but doing so in a way that was consistently on-brand, factually grounded in user data, safe, creative, and economically viable. Spotify's approach reveals important trade-offs between model performance and cost, the critical role of evaluation infrastructure when shipping billions of outputs, and the architectural decisions necessary to handle extreme concurrency and a single high-stakes global launch moment.

## Data Pipeline and Candidate Selection

Before any text generation could occur, Spotify needed to identify which days from a user's year were "remarkable" enough to warrant a narrative. The team designed a priority-ordered set of heuristics that balanced statistical strength with narrative potential. Some heuristics were straightforward quantitative measures: Biggest Music Listening Day and Biggest Podcast Listening Day simply captured the days with the highest total minutes listened. Biggest Discovery Day highlighted when a user listened to the most first-time artists, while Biggest Top Artist Day surfaced the day a listener spent the most time with a single favorite artist.

More sophisticated heuristics attempted to capture qualitative aspects of listening behavior. Most Nostalgic Day surfaced spikes in older catalog or throwback-heavy sessions, while Most Unusual Listening Day identified when a user strayed furthest from their typical taste profile. Contextual anchors like the user's birthday or New Year's Day rounded out the set. By ranking these candidates and narrowing hundreds of millions of listening events down to up to five standout days per user, Spotify created a manageable but meaningful dataset for narrative generation.

The team used a distributed data pipeline to compute and aggregate these candidate days at the user level. For each user, remarkable days and relevant listening history data were stored to object storage. When it was time to pre-generate reports, these data points were published onto a messaging queue, enabling asynchronous consumption by the next stage of the system. This decoupled architecture allowed the data computation and report generation phases to scale independently.

## Prompt Engineering at Scale

Prompt engineering became a daily practice for more than three months, representing a significant investment in what might seem like a straightforward task. However, the challenge was to create prompts that could reliably generate creative, emotionally resonant stories across an enormous diversity of listening patterns, while never hallucinating facts, stereotyping users, or drifting from Spotify's brand voice.

The team split prompts into two layers. The system prompt defined the creative contract: every insight had to be traceable to actual listening behavior, the tone needed to be witty, sincere, and quietly playful, and trust and safety considerations were built in by default (avoiding references to drugs, alcohol, sex, violence, or offensive language). The user prompt removed ambiguity by providing detailed listening logs for the day, a pre-computed stats block (recognizing that LLMs are poor at arithmetic), the listener's overall Wrapped data, the category of the interesting day, previously generated reports to avoid repetition, and the user's country for appropriate spelling and vocabulary.

Importantly, prompting was not a linear process but an iterative loop. The team built prototypes to compare outputs across prompt versions and edge cases, ran LLM-as-a-judge evaluations on sampled outputs, and layered in human review. Creative, technical, and safety feedback all fed into the next iteration. This reflects a mature understanding that prompt engineering at scale requires systematic evaluation infrastructure—you cannot simply iterate on prompts by eyeballing a few examples.

One key lesson the team highlighted is that "less is more"—the more instructions they piled on, the less creative the output became. This suggests that overly constrained prompts can stifle the generative capacity of the model, and finding the right balance between guidance and creative freedom is an essential part of the prompt engineering process.

## Model Distillation and Optimization

While high-performance frontier models were excellent for prototyping, running them to generate over a billion reports was economically infeasible. This is a critical real-world constraint that many LLMOps deployments face: the models that produce the best results in development may be too expensive or too slow for production use at scale.

Spotify addressed this through a distillation pipeline. They used a frontier model to produce high-quality reference outputs, then curated a tightly reviewed "gold" dataset that captured the voice, constraints, and stylistic nuances they wanted to preserve. They fine-tuned a smaller, faster production model on this dataset, effectively transferring the quality of the larger model into a more efficient form.

To push performance further, they introduced Direct Preference Optimization (DPO), powered by A/B-tested human evaluations. Although the preference dataset was relatively small, it was highly curated and intentionally constructed. The signal proved strong enough that the fine-tuned production model achieved strong preference parity with the original baseline. This demonstrates that thoughtful curation and targeted optimization techniques can close the gap between large and small models for specific use cases, making large-scale deployment economically viable.

The distillation approach represents a sophisticated understanding of the cost-quality trade-off inherent in production LLM systems. Rather than accepting either unaffordable costs or unacceptable quality degradation, the team engineered a solution that preserved what mattered while dramatically reducing computational requirements.

## Batch Generation Engine and Infrastructure

The scale of the generation task was genuinely intimidating: approximately 350 million eligible users, each receiving up to five reports, totaling roughly 1.4 billion reports. All of these needed to be pre-generated before the Wrapped launch day. Each report required a call to the fine-tuned model, meaning the system needed to sustain thousands of requests per second for days under strict latency constraints.

Based on available capacity, the team decided to process all reports in a single initial batch. Once each user's remarkable days were computed, the system published their listening snapshot to a pubsub message queue. From there, each remarkable day was processed sequentially per user, generating one report at a time, so earlier reports could inform later ones to avoid repetition. This design choice—processing days sequentially within a user but processing users in parallel—balanced the need for contextual awareness (avoiding repetitive language across a user's reports) with the need for massive throughput.

The generation engine ran continuously for four days straight. During that time, the team carefully monitored throughput to take advantage of available capacity without running into timeouts or errors. Real-time dashboards provided visibility into report generation progress, system reliability, and projected completion time. Monitoring became critical to ensuring the system stayed on track to complete before launch.

Once the initial pass completed, the team carefully combed through the output to detect missing reports, data inconsistencies, and other issues, then re-generated problematic reports through a structured remediation process. This iterative approach—generate in bulk, evaluate systematically, remediate targeted failures—represents a mature LLMOps workflow for handling production-scale generative tasks.

## Database Design for Concurrency

By the end of pre-generation, over a billion reports needed to be stored and ready to serve. Getting them there safely under heavy parallelism required careful storage design, which the team identified as one of the most elegant solutions in the entire architecture.

They used a distributed, column-oriented key-value database designed for high-throughput writes. Each user's data lived in a single row keyed by user identifier. Within that row, they tracked which remarkable days had completed reports. Since each user could have up to five reports generated independently and potentially written concurrently, multiple writes for the same user could land at nearly the same time.

A naive read-modify-write approach to tracking completed days would have been vulnerable to race conditions and lost updates. Instead, the team designed the schema to make concurrent writes naturally safe. Rather than storing a serialized list of completed days, they gave each day its own column qualifier within a dedicated column family, using the date in YYYYMMDD format as the qualifier (for example, March 15 becomes 20250315). Concurrent writes for different days therefore touched completely different cells within the same row, eliminating the need for coordination, locks, or read-modify-write cycles.

The full report content lived in a separate table keyed by user and date. Writes followed a deliberate order: first the report content, then a lightweight metadata entry marking the day as complete. This ensured users would never see a reference to a report that hadn't been successfully written, while still allowing fully parallel, high-throughput storage.

The team's insight that "concurrency problems are often data modeling problems" reflects a deep understanding of distributed systems. Rather than adding complex application logic to handle concurrent writes, they designed the data model to make conflicts impossible at the schema level. This is a powerful example of how thoughtful infrastructure choices can eliminate entire classes of bugs and operational complexity.

## Launch Preparation and Pre-Scaling

Wrapped launches globally at a single moment—there's no gradual rollout. One second the service is idle; the next, millions of users are hitting it. This extreme spike in traffic presents challenges that standard auto-scaling approaches cannot handle, since reactive scaling simply doesn't move fast enough.

The team's solution was proactive pre-scaling. They pre-scaled compute pods and database node capacity hours before launch and coordinated with their model provider to ensure throughput aligned with expected demand. Then, critically, they ran synthetic load tests across all geographic regions where the service is hosted. These tests were timed to start after pre-scaling completed but before real user traffic arrived.

The synthetic load tests served multiple purposes: they warmed connection pools and caches on the compute side and ensured database nodes had distributed tablet assignments and warmed their block caches on the storage side. The tests ran long enough to cover the critical launch window. When real traffic arrived, nothing was cold.

At Wrapped's scale, even a brief period of elevated latency can impact millions of users. Pre-scaling and synthetic load didn't just protect performance; they protected the experience people wait all year for. This demonstrates an understanding that for high-stakes, time-bound launches, proactive capacity planning and realistic load testing are essential components of LLMOps deployment.

## Automated Evaluation Framework

When generating over a billion reports, even a 0.1% failure rate would translate to millions of broken stories. Human review at this scale is impossible, making automated evaluation infrastructure absolutely critical.

Production reports were generated by the fine-tuned model. To support large-scale quality assurance and evaluation, the team stored generated reports into an evaluation data warehouse optimized for ad-hoc querying and corpus-wide analysis. Evaluation was performed by larger models acting as judges—the LLM-as-a-judge paradigm. Each report was graded across four dimensions: accuracy, safety, tone, and formatting.

To preserve the efficiency gains from distillation, the team evaluated a large random sample of approximately 165,000 reports rather than the full corpus. This represents about 0.01% of the total reports, which may seem small but is statistically meaningful given the scale and provides a practical balance between evaluation coverage and computational cost.

Instead of using one massive evaluation prompt, they employed multiple smaller rule-based queries per report. This design choice reduced non-deterministic results and allowed parallel grading. Requiring the judge to produce reasoning before a final score improved evaluation consistency—a technique that aligns with chain-of-thought prompting practices that have been shown to improve LLM performance on complex tasks.

The team also built internal tooling for side-by-side prompt comparisons and structured logging, allowing brand and design partners to participate directly in tuning decisions. This democratization of the evaluation process ensured that creative and brand considerations were integrated throughout the development cycle, not just bolted on at the end.

## Remediation Loop and Error Handling

Evaluation fed directly into a structured remediation loop, demonstrating that evaluation is only valuable if it drives action. The team identified problematic reports through model-based evaluators and targeted human review, then used SQL queries and regex-based pattern matching to surface structurally similar failures across the corpus. Remediation followed through batch deletion of affected reports and guardrail updates to prevent recurrence.

One illuminating example involved Biggest Discovery Day reports that were confidently celebrating the wrong number of artists discovered. The underlying heuristic was correct, but a subtle timezone bug in the upstream data pipeline occasionally surfaced the wrong top discovery day. The model, doing exactly what it was designed to do, faithfully wrote a compelling story about the incorrect data.

This highlights a critical insight for LLMOps: when you have a data-grounded generation task, bugs in the data pipeline can manifest as seemingly model-related quality issues. Because the team was running structured evaluations and logging report IDs with full metadata, they could trace the problem back to the source, quantify its prevalence across the corpus, fix the pipeline, delete the affected reports in bulk, and replay them safely.

This incident underscores the importance of end-to-end observability in LLM systems. The ability to trace from a problematic output back through the generation process to the underlying data, then identify and remediate similar issues at scale, is a hallmark of mature LLMOps practice.

## Architectural Isolation and Fault Containment

While not extensively detailed in the case study, the team noted that real fault isolation starts at the architecture level. By designing their systems as an isolated storage and serving path, they minimized the impact surface while shipping an AI-powered feature. This suggests that the Wrapped Archive infrastructure was deliberately separated from core Spotify services, ensuring that any failures in the generative system would not cascade to affect other features.

This architectural choice reflects a conservative and responsible approach to deploying experimental or high-risk features. When introducing novel capabilities like large-scale LLM generation, isolating the infrastructure reduces operational risk and makes it easier to reason about system behavior under load.

## Lessons and Broader Implications

The Spotify team's reflection on their experience surfaces several important lessons for LLMOps practitioners:

**Prompting doesn't scale without evaluation.** Generating over a billion reports means failures are inevitable. Prompt and evaluation design have to evolve together. This challenges the notion that prompt engineering is a standalone activity—at scale, it must be coupled with rigorous, automated evaluation.

**Concurrency problems are often data modeling problems.** By leaning into a column-oriented schema, the team eliminated the need for coordination altogether. This architectural insight can save enormous complexity in application logic.

**At this scale, the LLM call is the easy part.** The real work is in capacity planning, replay and recovery, cost discipline, safety loops, and preparing for a single high-stakes launch moment where everything has to work seamlessly. This is perhaps the most important takeaway: mature LLMOps is less about prompting and more about infrastructure, monitoring, evaluation, and operational discipline.

The team also noted that engineering expertise drives the work, while AI coding assistants amplify it. They used AI tools extensively throughout development to prototype faster, generate test scaffolding, reason about edge cases, and refactor complex flows. This meta-observation—that AI tools helped build an AI-powered feature—reflects the evolving reality of software development.

## Critical Assessment

While Spotify's case study is impressive in scope and technical sophistication, it's important to approach the claims with appropriate skepticism, particularly given that this is a public-facing engineering blog post meant to showcase the company's capabilities.

The case study presents the deployment as a complete success, with all 1.4 billion reports successfully generated and delivered. However, there's limited discussion of failure modes, error rates, or user feedback on the quality of the narratives. The 0.1% failure rate mentioned is presented as a hypothetical concern rather than an actual measured outcome, and we don't learn what the real failure rate was after remediation.

The claim that the fine-tuned production model achieved "strong preference parity" with the frontier model baseline is not quantified. We don't know what percentage of A/B test participants preferred the distilled model, or how much quality degradation was actually accepted in exchange for cost savings. "Strong preference parity" could mean anything from 98% equivalence to 60% equivalence depending on how it's measured and what threshold the team considered acceptable.

The evaluation approach, while sophisticated, sampled only about 0.01% of reports. While this may be statistically sound, it means that rare failure modes affecting even 0.1% of the corpus might not appear in the evaluation sample. The remediation examples provided (like the timezone bug) were discovered through this evaluation process, but we don't know how many similar issues might have slipped through.

The economic calculus is not disclosed. We don't know the actual cost per report, the total cost of the system, or the specific cost savings achieved through distillation. For practitioners evaluating whether to undertake similar projects, these numbers would be invaluable context that is conspicuously absent.

That said, the technical approaches described—model distillation, DPO, thoughtful data modeling, pre-scaling, and LLM-as-a-judge evaluation—are all sound and well-established practices in the LLMOps community. The scale of execution is genuinely impressive, and the willingness to share architectural details and lessons learned is valuable to the broader community.

## Conclusion

Spotify's Wrapped Archive represents a landmark deployment of LLM technology at unprecedented scale. The 1.4 billion personalized narratives generated for 350 million users demonstrate that with careful engineering, it's possible to deliver creative, personalized AI-generated content to a massive global audience in a single synchronized launch.

The case study's value lies less in introducing novel techniques and more in demonstrating how to orchestrate known LLMOps practices into a cohesive, production-grade system. The combination of prompt engineering discipline, cost-conscious model optimization, thoughtful infrastructure design, comprehensive evaluation, and proactive capacity planning offers a blueprint for deploying generative AI at scale.

For organizations considering similar deployments, the key takeaways are clear: invest heavily in evaluation infrastructure from the start, design your data models to eliminate rather than manage concurrency, prepare for peak load through proactive scaling rather than reactive auto-scaling, and remember that the LLM call itself is often the simplest part of a complex production system. The real challenge in LLMOps is everything else—the data pipelines, the evaluation frameworks, the remediation loops, and the operational discipline required to ship billions of outputs with confidence.
