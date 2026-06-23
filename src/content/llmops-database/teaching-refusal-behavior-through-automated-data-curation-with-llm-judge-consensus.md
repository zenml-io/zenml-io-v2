---
title: "Teaching Refusal Behavior Through Automated Data Curation with LLM Judge Consensus"
slug: "teaching-refusal-behavior-through-automated-data-curation-with-llm-judge-consensus"
draft: false
llmopsTags:
  - "customer-support"
  - "classification"
  - "fine-tuning"
  - "few-shot"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "evals"
industryTags: "e-commerce"
company: "Shopify"
summary: "Shopify's Sidekick AI assistant faced a critical challenge: its customer segmentation skill model, trained exclusively on successful production queries, couldn't recognize when to refuse impossible requests, leading to hallucinated responses and zero-result queries. To solve this, Shopify built an automated data curation pipeline using an ensemble of four frontier LLMs as judges, calibrated on a small seed dataset of 600+ human-annotated refusal examples. Through strict consensus requirements and a mutually exclusive taxonomy, they curated training data that resolved label conflicts between production logs and refusal annotations. The resulting model improved segmentation evaluation scores from 0.619 to 0.798 (28.9% relative gain), achieved 86.3% refusal accuracy with only 4.6% false positives, and established a continuous data flywheel where each production deployment generates new training signal for the next iteration."
link: "https://shopify.engineering/sidekick-curation"
year: 2026
seo:
  title: "Shopify: Teaching Refusal Behavior Through Automated Data Curation with LLM Judge Consensus - ZenML LLMOps Database"
  description: "Shopify's Sidekick AI assistant faced a critical challenge: its customer segmentation skill model, trained exclusively on successful production queries, couldn't recognize when to refuse impossible requests, leading to hallucinated responses and zero-result queries. To solve this, Shopify built an automated data curation pipeline using an ensemble of four frontier LLMs as judges, calibrated on a small seed dataset of 600+ human-annotated refusal examples. Through strict consensus requirements and a mutually exclusive taxonomy, they curated training data that resolved label conflicts between production logs and refusal annotations. The resulting model improved segmentation evaluation scores from 0.619 to 0.798 (28.9% relative gain), achieved 86.3% refusal accuracy with only 4.6% false positives, and established a continuous data flywheel where each production deployment generates new training signal for the next iteration."
  canonical: "https://www.zenml.io/llmops-database/teaching-refusal-behavior-through-automated-data-curation-with-llm-judge-consensus"
  ogTitle: "Shopify: Teaching Refusal Behavior Through Automated Data Curation with LLM Judge Consensus - ZenML LLMOps Database"
  ogDescription: "Shopify's Sidekick AI assistant faced a critical challenge: its customer segmentation skill model, trained exclusively on successful production queries, couldn't recognize when to refuse impossible requests, leading to hallucinated responses and zero-result queries. To solve this, Shopify built an automated data curation pipeline using an ensemble of four frontier LLMs as judges, calibrated on a small seed dataset of 600+ human-annotated refusal examples. Through strict consensus requirements and a mutually exclusive taxonomy, they curated training data that resolved label conflicts between production logs and refusal annotations. The resulting model improved segmentation evaluation scores from 0.619 to 0.798 (28.9% relative gain), achieved 86.3% refusal accuracy with only 4.6% false positives, and established a continuous data flywheel where each production deployment generates new training signal for the next iteration."
notion:
  pageId: "387f8dff-2538-8095-8d99-fb84e6a47790"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-22T08:36:00.000Z"
  lastEditedTime: "2026-06-22T08:36:00.000Z"
  publishedAt: "2026-06-22T14:46:20Z"
---

## Overview

Shopify's engineering team tackled a fundamental LLMOps challenge in their Sidekick AI assistant: teaching specialized skill models when to refuse requests rather than hallucinating responses. This case study illuminates a critical blind spot in production ML systems—training data derived exclusively from successful queries cannot teach models appropriate refusal behavior. The solution involved building an automated data curation pipeline using multiple frontier LLMs as consensus judges, establishing a continuous improvement flywheel that turns production traffic into progressively better training data.

## Business Context and Problem Definition

Sidekick operates as Shopify's merchant-facing AI assistant with a two-layer architecture: an outer planner that interprets merchant intent and specialized skill models handling specific capabilities like customer segmentation and analytics. The customer segmentation skill translates plain English merchant requests into Shopify's domain-specific query syntax, enabling merchants who lack technical expertise to create targeted customer lists for campaigns, discounts, and purchasing analysis.

The core problem emerged from the nature of production training data itself. Shopify's training corpus consisted of tens of thousands of de-identified production queries—all successful examples that had passed evaluation and shipped. This created a fundamental blind spot: the model had never encountered examples of appropriate refusals. When merchants requested impossible queries (such as finding customers by occupation when Shopify doesn't store that data), the model attempted to be helpful by generating syntactically valid queries that returned zero results. This behavior confused merchants, who couldn't distinguish between "no customers match your criteria" and "this request is impossible given our data schema." The result was poor targeting decisions and degraded user experience, none of which surfaced in standard training metrics.

## Initial Approach and Its Limitations

Recognizing the need for refusal training examples, Shopify partnered with Toloka to produce a balanced dataset of approximately 600 standard queries and 602 refusal annotations. The initial strategy was straightforward: merge this curated refusal dataset with the existing production corpus and fine-tune. This naive merging approach failed to deliver meaningful improvements.

The fundamental issue was label conflict. The same query (or semantically similar variants) appeared in both datasets with contradictory labels—flagged as successful in production logs but annotated as requiring refusal in the Toloka data. The model received contradictory training signals with no mechanism to reconcile them at scale. This degraded both stability and generation quality, demonstrating that simply adding refusal examples without addressing conflicts in the existing corpus was insufficient.

## The LLM Judge Consensus Architecture

Rather than scaling manual annotation, Shopify transformed the small Toloka dataset into a seed for an automated curation engine. The core innovation was treating multiple frontier LLMs (identified in the text as Frontier LLM A, B, C, and D) as automated data judges that could evaluate and reconcile label conflicts across the entire training corpus.

### Calibration Strategy

Before deploying the judges on production data, each was calibrated using few-shot examples from the Toloka seed dataset. These examples paired representative queries with ground-truth human annotations, anchoring each judge's decisions to what human annotators actually flagged as impossible rather than what the models might assume about Shopify's data schema. This calibration step proved critical for ensuring judges operated with consistent criteria aligned to business requirements rather than generic refusal patterns.

### Strict Consensus Requirements

Shopify prioritized precision over recall through a strict consensus gate: all four judges had to agree on both the decision (refusal vs. acceptable) and the reasoning before any label was accepted. This filtering approach deliberately excluded edge cases where even frontier models disagreed, operating on the principle that ambiguous examples should be reviewed by humans rather than risk training instability from inconsistent labels. The consensus requirement trades coverage for quality—better to miss valid refusals than to mislabel legitimate merchant requests and degrade the model's ability to handle common cases.

### Mutually Exclusive Taxonomy Design

The judges worked with four carefully designed, mutually exclusive categories:

- **Solvable with more context**: The query is valid but requires the outer planner to fetch additional information first
- **Missing capability**: The request asks for segmentation features that don't exist in Shopify's current platform
- **Wrong skill**: Not a segmentation task; should be routed to analytics or another skill
- **Ambiguous**: Requires clarification from the merchant before proceeding

The mutual exclusivity of these categories was non-negotiable. Overlapping or ambiguous category definitions lead to judge disagreements that compound downstream, creating inconsistent labels that propagate through fine-tuning. The upfront investment in clean taxonomy design paid dividends in faster calibration, more consistent labels, and more stable fine-tuning runs.

## The Annotation Pipeline and Decision Flow

The complete pipeline implements a decision flow that determines whether to keep a production label, replace it with an annotated label, request merchant clarification, or filter out the example entirely. Ambiguous requests are separated first as they require human intervention. Unsolvable requests become refusal training examples. Solvable requests are validated against the original production label—if judges unanimously agree the query should succeed and it's labeled as successful in production, the label is confirmed. If there's disagreement between production logs and judge consensus, the judges' verdict takes precedence given their calibration to human ground truth.

This pipeline acts as a conflict resolver rather than just a labeler. When production data and manual annotations disagree, the calibrated judge ensemble provides a mechanism for principled reconciliation at scale, something manual review processes cannot achieve across tens of thousands of examples.

## The Data Flywheel: Continuous Improvement Loop

The true LLMOps value emerges not from a one-time data cleaning effort but from establishing a continuous improvement flywheel. Once the improved model deploys to production, its traffic becomes the sampling pool for the next training iteration. Merchants continuously find new ways to phrase requests, and edge cases that the model now handles correctly expose patterns that weren't present in the original training set.

The judge ensemble evaluates these new patterns using the same consensus mechanism, filtering out examples where judges disagree and adding accepted examples back to the training corpus. Each fine-tuning cycle starts with more data and cleaner labels than the previous iteration. Crucially, each production deployment funds the next improvement—the system becomes self-improving as long as the pipeline infrastructure remains operational.

This represents a shift from viewing training data as a static asset to treating it as a living resource that grows with production usage. The infrastructure investment in the judge consensus pipeline becomes an ongoing capability rather than a project deliverable.

## Results and Validation

The quantitative results demonstrate substantial improvements across multiple metrics. The segmentation skill evaluation score improved from 0.619 to 0.798, representing a 28.9% relative gain. However, Shopify provides important context: the production model had zero refusal training examples, so part of this gain simply reflects adding any refusal capability at all. A cleaner comparison appears when evaluating naive merging versus automated curation from the same baseline—curation pushed the segmentation pass rate from 0.762 to 0.798, isolating the value of the consensus-based approach versus simply adding refusal data.

Manual validation showed refusal accuracy of 86.3% with a false positive rate of only 4.6%. The low false positive rate is particularly important in this context—incorrectly refusing valid merchant requests directly impacts business outcomes by blocking legitimate use cases. The judge ensemble itself demonstrated strong agreement with ground truth seed data: approximately 90% prediction accuracy with Cohen's kappa above 0.75 across all four models. A kappa above 0.75 indicates substantial agreement, validating that the judges were operating consistently with human annotators.

## Critical LLMOps Lessons

### Small High-Quality Seeds Over Large Noisy Datasets

The Toloka dataset of approximately 1,200 examples proved sufficient to anchor an automated curation pipeline that processed tens of thousands of production examples. The value came from quality rather than volume—garbage in, garbage out applies with amplified force when seed data is used to calibrate automated judges. Any biases or errors in the seed dataset propagate through the entire curation process.

### Taxonomy Design as Infrastructure

Investing in mutually exclusive, clearly defined categories proved to be infrastructure work rather than a one-time modeling decision. Clean categories enabled faster calibration, more consistent labels, and more stable fine-tuning. Ambiguous taxonomies create compounding problems that are difficult to debug once models are deployed.

### Consensus Over Confidence in Early Stages

When the shape of the problem is still being understood, unanimous agreement from multiple independent judges provides more reliable signal than individual confidence scores. This approach sacrifices recall (filtering out all disagreements) to maintain precision, which is appropriate when the cost of mislabeling is high and the pipeline can iterate over time to capture filtered examples through human review.

### Refusals as Product Features

The case study emphasizes that truthful refusals, ideally with suggestions about alternatives, are product features rather than failures. A hallucinated answer that generates zero results is the worst possible outcome—it wastes merchant time and erodes trust in the system. Teaching models when to say no proves as important as teaching them when to say yes, but production data by construction cannot provide this training signal.

## Broader LLMOps Implications

This case study illustrates several patterns relevant beyond Shopify's specific use case. The blind spot in production training data—the inability to capture appropriate refusals—applies to any system where successful queries dominate logging and evaluation. The LLM judge consensus approach offers a scalable alternative to manual annotation for resolving label conflicts and extending training data, though it requires careful calibration and quality validation.

The data flywheel concept represents mature LLMOps thinking: building infrastructure that converts production traffic into training signal creates compounding value over time. This requires investment in pipelines, evaluation frameworks, and deployment processes that can close the loop from production to training to deployment repeatedly. Organizations that view this as ongoing infrastructure rather than discrete projects gain sustainable competitive advantages.

The architecture choice to use multiple frontier LLMs as judges rather than a single model reflects risk management in production systems. Single-model evaluation introduces brittle dependencies on one provider's capabilities and potential biases. Requiring consensus from multiple independent models provides redundancy and reduces the risk that idiosyncrasies of any single model propagate into training data.

## Future Directions

Shopify indicates they're extending this framework to other skill models within Sidekick, applying the same judge consensus process to different data quality problems. The details vary by domain (different models, thresholds, taxonomies) but the pattern remains consistent: small high-quality seed, judges calibrated against it, unanimous consensus gate, feedback loop to production. This suggests the approach has proven general enough to serve as reusable LLMOps infrastructure rather than a one-off solution.

The team notes that the hardest part wasn't the ML itself but building infrastructure around the model that enables continuous improvement. This observation captures a central tension in production LLM systems: model capabilities often exceed the infrastructure maturity required to deploy, monitor, and improve them systematically. The data flywheel only generates value when all components—sampling, evaluation, curation, training, deployment, and monitoring—work together reliably over many iterations.

## Critical Assessment

While the results are impressive, several caveats warrant attention. The case study doesn't detail the computational cost of running four frontier LLMs as judges across tens of thousands of examples, though this could be substantial. The approach assumes access to multiple high-quality commercial LLMs, which may not be feasible for all organizations or use cases. The reliance on unanimous consensus necessarily filters out genuinely ambiguous cases that might benefit from more sophisticated aggregation methods like weighted voting based on judge-specific calibration scores.

The evaluation metrics focus on accuracy and agreement but don't directly measure merchant satisfaction or business outcomes like campaign effectiveness or time-to-task completion. The connection between evaluation scores and actual merchant experience remains somewhat indirect. Additionally, the case study doesn't discuss how the system handles distribution shift—as merchant requests evolve, the Toloka seed dataset from a specific point in time may become less representative, potentially requiring periodic recalibration.

The judge consensus approach also inherits biases present in the frontier LLMs themselves, which may reflect training data skews or design choices made by their creators. While using multiple models provides some protection against individual model biases, systematic biases shared across multiple frontier models could still propagate into the curated dataset.

Despite these limitations, the case study demonstrates mature LLMOps practices: systematic evaluation, infrastructure investment in continuous improvement, careful balance between precision and recall, and clear articulation of tradeoffs. The emphasis on building reusable infrastructure rather than one-off solutions reflects production-oriented thinking that many organizations struggle to implement.
