---
title: "Privacy-Aware Infrastructure Using LLMs for Asset Classification at Scale"
slug: "privacy-aware-infrastructure-using-llms-for-asset-classification-at-scale"
draft: false
llmopsTags:
  - "data-analysis"
  - "classification"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "prompt-engineering"
  - "embeddings"
  - "model-optimization"
  - "knowledge-distillation"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "evals"
  - "monitoring"
  - "databases"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "documentation"
industryTags: "tech"
company: "Meta"
summary: "Meta built an AI-native infrastructure system to classify millions of data assets for privacy compliance at scale. The system addresses the challenge of understanding and protecting data across massive data flow graphs with hundreds of thousands of nodes, where manual review cannot keep pace with rapid product iteration. The solution combines LLMs for complex decisions with automatically distilled deterministic rules for common patterns, using structured evidence briefs to filter noisy signals, multi-judge evaluation panels to handle drift, and a distillation loop that progressively converts stable LLM decisions into fast, replayable rules. This approach dramatically reduced the problem surface area while achieving millisecond latency for most cases and maintaining full auditability for compliance."
link: "https://www.youtube.com/watch?v=q9RSv2ltZtU"
year: 2025
seo:
  title: "Meta: Privacy-Aware Infrastructure Using LLMs for Asset Classification at Scale - ZenML LLMOps Database"
  description: "Meta built an AI-native infrastructure system to classify millions of data assets for privacy compliance at scale. The system addresses the challenge of understanding and protecting data across massive data flow graphs with hundreds of thousands of nodes, where manual review cannot keep pace with rapid product iteration. The solution combines LLMs for complex decisions with automatically distilled deterministic rules for common patterns, using structured evidence briefs to filter noisy signals, multi-judge evaluation panels to handle drift, and a distillation loop that progressively converts stable LLM decisions into fast, replayable rules. This approach dramatically reduced the problem surface area while achieving millisecond latency for most cases and maintaining full auditability for compliance."
  canonical: "https://www.zenml.io/llmops-database/privacy-aware-infrastructure-using-llms-for-asset-classification-at-scale"
  ogTitle: "Meta: Privacy-Aware Infrastructure Using LLMs for Asset Classification at Scale - ZenML LLMOps Database"
  ogDescription: "Meta built an AI-native infrastructure system to classify millions of data assets for privacy compliance at scale. The system addresses the challenge of understanding and protecting data across massive data flow graphs with hundreds of thousands of nodes, where manual review cannot keep pace with rapid product iteration. The solution combines LLMs for complex decisions with automatically distilled deterministic rules for common patterns, using structured evidence briefs to filter noisy signals, multi-judge evaluation panels to handle drift, and a distillation loop that progressively converts stable LLM decisions into fast, replayable rules. This approach dramatically reduced the problem surface area while achieving millisecond latency for most cases and maintaining full auditability for compliance."
notion:
  pageId: "397f8dff-2538-8089-b772-ce56e5e49305"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T19:57:00.000Z"
  lastEditedTime: "2026-07-08T19:57:00.000Z"
  publishedAt: "2026-07-08T20:11:55Z"
---

## Overview

Meta's privacy engineering team developed a sophisticated AI-native infrastructure system to handle asset classification at an unprecedented scale. This case study represents an evolution in their approach from using GenAI to assist human reviewers in 2025, to building fully automated systems capable of making robust privacy decisions independently. The specific use case focuses on classifying data assets across Meta's infrastructure to enable proper privacy enforcement and compliance demonstration.

The scale of the problem is striking. A single Hive table column can have downstream data flow graphs containing 100,000 nodes, where each node represents a table column, log field, ML feature, or pipeline stage carrying derived data. This visualization pushes the limits of human comprehension, and represents only a small subset of the total problem space. Assets requiring classification span traditional database columns and log fields, but also extend to AI-native modalities including audio, vision data, embeddings, sensor data, and feedback loops that ship faster than manual review processes can possibly follow.

The stakes for accurate classification are substantial. Incorrect labels lead to incorrect enforcement, potentially blocking legitimate product features or permitting flows that violate privacy requirements. Missing categories means missing privacy requirements entirely. Without proper tracing, there is no auditability to demonstrate compliance. Classification sits at the foundation of Meta's privacy workflows, and errors cascade downstream to break everything that depends on it.

## Technical Architecture

The end-to-end classification pipeline begins with triggers from schema changes, code changes, or configuration changes that kick off classification runs. The system fetches context from multiple sources including lineage graphs, ownership metadata, annotations, ML features, and code search results. Before any context reaches the classifier, the system applies masking and sanitization, particularly to remove information that could cause circular reasoning where the label being predicted might be present in the input data.

The pipeline follows a two-tier approach. Deterministic rules get the first pass at classification, and whatever these rules cannot handle falls through to LLM processing. Both paths produce consistent output containing a category, confidence score, and the decision path used to arrive at the conclusion. All outputs are stored as versioned evidence for replay and audit purposes.

The core problem the system addresses is transforming noisy signals on the left side into crisp, robust decisions on the right. Names are ambiguous, lineage is often partial, ownership changes over time, and scanners produce false positives. Yet the system must combine these individually weak signals into robust decisions while tracking which signals are reliably informative across iterations, separating stable indicators from noise.

## Challenge 1: Signal Noise and Context Management

The first major challenge involves managing incredibly noisy signals. The system fetches dozens of different types of context including lineage, code references, schema definitions, names, and data samples. Simply dumping all this raw context into the model creates multiple problems. Token usage balloons, attention dilutes across noise, and decision boundaries get blurred. Misleading or circular fields slip in alongside useful ones, and the model cannot distinguish them without assistance.

Meta's solution involves producing structured evidence briefs rather than raw context dumps. Every context source including lineage, ownership, annotations, ML features, code usage, and embeddings gets evaluated through a policy framework. Each field is classified as useful, conditionally useful, circular and requiring masking, or harmful for misprediction and requiring blocking. Circular information is masked before reaching the decision engine.

The evidence brief surfaces top supporting signals and top contradicting signals rather than overwhelming the model with raw data. This focused, high-quality input means the decision engine no longer has to rediscover what matters on every call. The system explicitly tells it which signals are important, dramatically improving both efficiency and accuracy.

## Challenge 2: Drift and Variability

The second major challenge involves severe drift and variability in how data changes day-to-day and batch-to-batch. Iteration metrics rely on labels that are noisy and shift over time. Each batch being classified can have significant variation, and the overall system evolves continuously. When optimization happens against shifting ground truth, the system ends up tracking drift rather than real progress. The optimizer believes it is improving while actually chasing a moving target, with the worst case being regressions shipping to production because evaluation sites no longer reflect reality.

Meta's approach involves setting up a multi-judge evaluation system that runs on samples from every batch. The system employs three LLM judges that evaluate each asset using different framings: classify directly, critique then classify, and metadata only. Three represents the smallest odd number panel that can produce a real majority vote without extra tiebreaking logic. All three judges share a judge model that is deliberately different from the original classifier model, providing diversity through prompt framing rather than relying on different model architectures.

The system tracks agreement between judges using Cohen's kappa per batch. When judges disagree, the asset goes to a human review gate where humans break ties and their decisions update the ground truth reference set. When all judges agree, the asset is marked for potential promotion to the reference set, which stays frozen until the next cycle. This approach has an honest limitation: if all three judges agree but are wrong on a particular asset, the error may not be caught at the asset level, though it can be detected at the batch level through kappa drift. Critically, only reviewed outcomes are ever used to update the reference set.

## Challenge 3: Scale and Performance

The third challenge involves the sheer scale of operations. With millions of assets to classify, and LLM calls taking seconds per invocation while consuming significant tokens and producing probabilistic outputs that are hard to reproduce exactly, classifying everything with LLMs would result in hours of wall clock time, massive compute bills, and audit teams questioning why the system behaves differently across test runs. The system requires millisecond latency and deterministic decisions for common cases, reserving LLMs only for genuinely challenging edge cases.

Meta's scaling solution involves what they describe as using LLMs to put LLMs out of business through a distillation process. The distillation loop operates in five steps. First, the system looks for stable patterns in confident LLM decisions, recognizing that consistent classification behavior likely indicates some underlying structural rule. Second, it proposes exact deterministic rules in the form of regular expressions, heuristics, or field value matches. Third, these proposed rules are validated against holdout sets, and rules that fail to meet precision and support thresholds are blocklisted from future consideration.

Fourth, successful candidate rules enter shadow mode where they run in production in logging-only mode, with outputs compared against LLM predictions. Fifth, if shadow mode confirms the rule is stable, it graduates to the production rules file. Every promoted rule shrinks the LLM surface area. The end state has LLMs handling only genuinely ambiguous cases while common patterns run at millisecond latency with zero LLM dependency, fully deterministic and replayable for audit purposes.

The results are dramatic. After applying boundary classification using distilled rules and LLM fallback, the number of nodes requiring analysis drops dramatically for the same source asset, representing a massive reduction in problem surface area that makes privacy enforcement practical even for the most complex privacy requirements.

## Key Learnings and Failures

Meta's presentation emphasizes several critical learnings from things that did not work as expected. The first learning involved treating masking as a prompt concern. While circular fields were masked from the LLM to prevent self-referential reasoning, the deterministic rules were processing unmasked fields. This meant rules and LLM decisions were evaluating different contexts, causing rule coverage to plateau. The fix involved recognizing masking as a system-wide invariant where both rules and LLMs evaluate the same masked context. This change caused rule coverage to jump and LLM usage to drop.

The second learning was particularly surprising and involved prompt optimization without adequate context. The team ran a dedicated optimization pipeline using state-of-the-art prompt optimizer algorithms. After many hours and iterations, they could not improve accuracy beyond a ceiling. Investigation revealed the root cause: the data going into the LLM was not good enough or structured enough for better reasoning decisions. Investing in improving the quality of context and providing more specific code resolution helped break through the barrier. Using the same model and starting with the same prompt, classification accuracy improved significantly simply from better context. The lesson is clear: if a classifier stalls, invest in better context before touching the prompt.

The third learning involved oscillation detection. The optimization loop bounced between two candidate prompts for dozens of iterations without converging, burning through significant compute before anyone noticed the problem. The fix involved implementing a kappa-based tuning controller that detects oscillation, making it an architectural feature rather than a bolt-on addition.

## Principles Derived from Experience

From these learnings, Meta extracted three core principles. First, context is greater than prompts. This was proven the hard way through hours of optimization yielding marginal gains, while structuring context with evidence briefs produced significant accuracy improvements. The key takeaway is to invest in what goes into the model before optimizing how you ask.

Second, decouple evaluation from optimization. The evaluation setup and panel should be independent of the classifier, using different models, different prompts, and frozen reference sets. If evaluation and optimization share the same loop, you measure drift rather than progress. This represents necessary hygiene for production LLM systems.

Third, embrace the principle of distilled or deterministic processing. LLMs excel at learning but perform poorly at scale. Every stable pattern should become a versioned, auditable rule that runs without LLM involvement. The system should progressively shrink its own LLM surface area over time.

## Broader Implications and Future Directions

Meta outlined several future directions for this work. First, they plan to migrate legacy classifiers into this system, replacing brittle hand-coded logic with a context-first, distillation-based approach. Second, they intend to expand beyond classification to other privacy workflows including lineage improvement, safe enforcement rollout, and evidence generation.

The third direction is what the presenter expressed most excitement about: recognizing that these techniques apply far beyond privacy. Agent observability and oversight face the same fundamental challenges of noisy signals, need for deterministic enforcement, and requirement for replayable auditability. The architecture and principles developed for privacy-aware infrastructure transfer directly to these emerging problem spaces.

The presenter frames privacy-aware infrastructure not as a tax on engineering but as a driving force for better architecture overall. The discipline required for privacy enforcement drives clearer data contracts, richer context, rigorous evaluation, and disciplined change management. The AI-native era enables rapid learning with LLMs while enforcing with deterministic, replayable logic wherever possible. The system Meta built successfully handles noisy signals, iterates safely despite variation, and distills stable patterns into efficient rules.

## Critical Assessment

While this case study demonstrates sophisticated LLMOps practices, several areas warrant balanced assessment. The presentation emphasizes dramatic improvements and efficiency gains, but does not quantify the compute investment required to reach the current state, including the failed prompt optimization efforts and oscillation issues. The actual accuracy metrics, precision-recall tradeoffs, and error rates are not disclosed, making it difficult to assess performance objectively.

The multi-judge evaluation approach is elegant but adds computational overhead. The system requires running three separate evaluations per asset in the evaluation set, and the limitation that unanimous incorrect judgments may slip through represents a real risk in production systems where errors can have compliance implications.

The distillation approach is compelling but requires ongoing maintenance. Rules must be continuously validated as the underlying data distribution shifts, and there is likely significant engineering overhead in managing the rule generation, validation, shadow deployment, and promotion pipeline. The presentation does not address how rule conflicts are resolved or how rule coverage is maintained as systems evolve.

The claim that privacy infrastructure drives better architecture overall is somewhat aspirational. While the technical practices described are sound, the resource investment required to build and maintain such systems may not be feasible for organizations without Meta's scale and engineering capacity. The case study represents an example of sophisticated LLMOps at a well-resourced technology company rather than a broadly accessible pattern.

Nevertheless, the core insights about context quality trumping prompt optimization, the importance of decoupling evaluation from optimization, and the value of progressively distilling LLM decisions into deterministic rules represent genuine contributions to LLMOps practice that can inform work across different scales and domains.
