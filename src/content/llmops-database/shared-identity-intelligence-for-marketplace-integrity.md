---
title: "Shared Identity Intelligence for Marketplace Integrity"
slug: "shared-identity-intelligence-for-marketplace-integrity"
draft: false
llmopsTags:
  - "fraud-detection"
  - "classification"
  - "realtime-application"
  - "unstructured-data"
  - "embeddings"
  - "latency-optimization"
industryTags: "e-commerce"
company: "DoorDash"
summary: "DoorDash built a horizontal identity-intelligence platform to provide reusable signals for fraud prevention, account security, promotions, support, checkout, and bot mitigation. The platform combines an entity-resolution graph with more than one billion edges, relationship intelligence, and use-case-specific supervised decisioning models. Signals are computed asynchronously and served through low-latency checkpoints, allowing downstream systems to reuse identity and behavioral evidence without rebuilding it independently. The article describes LLM and generative AI capabilities as a future extension for extracting features from text, images, conversations, and embeddings; it does not report that these LLM-based components are already deployed in production or provide outcome metrics such as fraud reduction."
link: "https://careersatdoordash.com/blog/one-signal-many-uses-identity-intelligence-for-doordash-integrity/"
year: 2026
seo:
  title: "DoorDash: Shared Identity Intelligence for Marketplace Integrity - ZenML LLMOps Database"
  description: "DoorDash built a horizontal identity-intelligence platform to provide reusable signals for fraud prevention, account security, promotions, support, checkout, and bot mitigation. The platform combines an entity-resolution graph with more than one billion edges, relationship intelligence, and use-case-specific supervised decisioning models. Signals are computed asynchronously and served through low-latency checkpoints, allowing downstream systems to reuse identity and behavioral evidence without rebuilding it independently. The article describes LLM and generative AI capabilities as a future extension for extracting features from text, images, conversations, and embeddings; it does not report that these LLM-based components are already deployed in production or provide outcome metrics such as fraud reduction."
  canonical: "https://www.zenml.io/llmops-database/shared-identity-intelligence-for-marketplace-integrity"
  ogTitle: "DoorDash: Shared Identity Intelligence for Marketplace Integrity - ZenML LLMOps Database"
  ogDescription: "DoorDash built a horizontal identity-intelligence platform to provide reusable signals for fraud prevention, account security, promotions, support, checkout, and bot mitigation. The platform combines an entity-resolution graph with more than one billion edges, relationship intelligence, and use-case-specific supervised decisioning models. Signals are computed asynchronously and served through low-latency checkpoints, allowing downstream systems to reuse identity and behavioral evidence without rebuilding it independently. The article describes LLM and generative AI capabilities as a future extension for extracting features from text, images, conversations, and embeddings; it does not report that these LLM-based components are already deployed in production or provide outcome metrics such as fraud reduction."
notion:
  pageId: "3f4f8dff-2538-80e1-8568-cf5da3fb6e6a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:43:00.000Z"
  lastEditedTime: "2026-10-09T08:43:00.000Z"
  publishedAt: "2026-10-09T08:52:43Z"
---

## Overview

DoorDash describes identity intelligence as shared infrastructure for answering two recurring integrity questions: who is behind an account or event, and how confident the company should be that the associated action is legitimate. Historically, order risk, account security, promotion eligibility, support decisions, and bot mitigation each developed their own identity signals and linkage logic. DoorDash's proposed platform centralizes the underlying evidence so that multiple decisioning systems can reuse it, while retaining separate models for the different actions being evaluated.

The system is an established machine-learning and data-platform architecture with a stated path toward GenAI adoption, rather than a demonstrated LLM-in-production deployment. Its current foundation consists of a shared signal store, an identity-resolution graph with more than one billion edges, a relationship-intelligence graph, and supervised decisioning models. The article says DoorDash may use LLMs and other generative models in the future to process unstructured text, images, and conversations or to produce embeddings. It does not identify a specific LLM provider, model, prompt workflow, production launch, quality evaluation, or measured business outcome for those GenAI components. The concrete operational evidence concerns the non-LLM platform, including asynchronous feature computation and a 10–15 millisecond checkpoint retrieval path.

## Problem and use case

A marketplace must make integrity decisions across many surfaces. A support agent may assess a refund request, a promotion service may determine whether an offer is genuinely available to a new customer, and an authentication or bot-mitigation system may evaluate a login. These decisions have different policies and thresholds, but they often depend on related evidence about accounts, devices, phone numbers, addresses, payment cards, actions, and behavior.

DoorDash argues that product-specific implementations create fragmented views of the same actor. Each team may define “the same person” differently, maintain separate device or account linkage, and pay the engineering and modeling cost of rediscovering shared patterns. The resulting signals are difficult to reuse and may not capture relationships that become visible only when data from several integrity surfaces is considered together. A horizontal identity capability is intended to address this duplication while separating shared evidence from the final decision made by each product.

## Architecture

The platform is organized into three conceptual layers over a common signal store. Identity resolution uses an entity-resolution graph to estimate whether accounts represent the same person. The graph has more than one billion edges and is built primarily with unsupervised clustering and link-prediction techniques. The system weighs signals according to their reliability and the likelihood that two unrelated people would share them. A rare shared attribute can be informative by itself, while common attributes are more useful in combination.

Relationship intelligence is deliberately different from identity resolution. Two accounts may be associated with the same device, address, payment instrument, or behavioral pattern without being proven to belong to the same human. The relationship layer therefore describes the strength, recency, density, and unusualness of connections among people, accounts, devices, and other assets. The article cites more than 100 derived signals per account, including how many accounts share an attribute, when those accounts appeared, and whether the pattern differs from ordinary customer behavior.

The final layer is decisioning. Typically implemented with supervised models such as gradient-boosted classifiers, it consumes identity and relationship features together with known outcomes for a specific use case. It converts graph evidence into a decision about a particular event, such as whether a refund claim, promotion request, login, or checkout action appears legitimate. This separation is important: a graph fact—for example, that an address is associated with many recently created accounts—is evidence, not an automatic verdict. The appropriate model and policy determine how much that evidence should matter for a given workflow.

## Data and serving design

DoorDash separates signal computation from online scoring. Features are aggregated asynchronously and become available within minutes of an underlying change. A checkpoint can retrieve the already-computed data in approximately 10–15 milliseconds, avoiding the need for a decision request to wait for the aggregation work itself. Depending on the latency budget, scoring can happen inline or be triggered when features arrive, with the resulting score stored for later retrieval.

This design is an LLMOps-relevant pattern even though the current described models are not LLMs. Expensive or continuously changing feature computation is decoupled from request-time inference, and downstream systems access a stable interface rather than understanding the graph implementation. The same pattern could support future model-generated features, but it would also require managing feature freshness, versioning, lineage, backfills, monitoring, and consistency between offline training data and online values.

The architecture also supports different consumers. A system may use a graph output directly when relationship evidence is sufficient, or it may request a use-case-specific score. Support, promotion, account-security, checkout, and bot-mitigation systems can therefore share the substrate without sharing exactly the same decision policy. This limits the risk that one global identity score becomes an inappropriate universal enforcement rule.

## Current integrity applications

Consumer identity clustering attempts to recognize accounts that appear separate but are controlled by the same person. The service runs continuously against the identity graph instead of only in periodic batches, so it can be consulted during events such as login, checkout, or a refund request. In support, clustering may help identify repeated or coordinated claims across accounts. In promotions, it may distinguish a genuinely new customer from someone who has already redeemed an offer under another account. In account security, identity and behavioral evidence can help flag a login that has the correct password but does not resemble the account owner.

Relationship intelligence extends the approach to coordinated activity. A set of accounts that look innocuous individually may reveal a common operation when their shared devices, addresses, timing, actions, or other links are examined together. The same broad evidence can support bot mitigation by helping distinguish a human encountering friction from automated activity operating at scale. These are claims about intended use and platform capability; the source does not provide precision, recall, prevented-loss, false-positive, customer-friction, or operational-cost measurements.

## Behavioral identity and planned GenAI extensions

Direct identifiers such as device IDs, phone numbers, email addresses, and cards can be strong evidence, but they can also be replaced by determined adversaries. DoorDash therefore treats behavior as a complementary identity signal. Action timing, browsing patterns, checkout behavior, and support interactions may remain informative even when direct identifiers change. The article suggests that behavioral similarity could connect accounts that appear unrelated through conventional identifiers, although it does not specify the exact behavioral model or report validation results.

The GenAI discussion is prospective. DoorDash says LLM and generative AI models could reduce the cost of extracting features from unstructured text, images, and free-form conversations. Possible examples include sentiment or issue-description analysis from support appeals, duplicate-image checks, and embeddings derived from pretrained models. Text embeddings could become additional edges or attributes in the identity graph, while transformer-based architectures could be explored for identity embeddings and clustering.

A production implementation would need more than an API call to an LLM. It would require defining schemas for model-generated features, controlling model and prompt versions, recording provenance, handling asynchronous enrichment, and measuring extraction quality against labeled data. It would also need safeguards for prompt injection or adversarial content in user-submitted text, privacy and retention controls for sensitive identity data, and fallback behavior when a model is unavailable or returns low-confidence output. Embeddings would require decisions about normalization, similarity thresholds, index refreshes, drift, and whether a similarity is being used for investigation, ranking, or an enforcement action.

## LLMOps assessment and tradeoffs

The platform's strongest LLMOps lesson is architectural: shared, centrally governed signals can prevent every downstream team from independently integrating and operating a new model. A common feature and graph layer could make it easier to deploy a text or image model once and expose its outputs to multiple integrity workflows. The asynchronous computation pattern is also compatible with higher-latency GenAI enrichment, provided decisions tolerate stale or missing features and the system clearly indicates feature freshness.

There are significant tradeoffs. Centralizing identity signals increases reuse and may improve consistency, but it also concentrates privacy, security, and governance risk. An erroneous linkage can propagate across promotions, support, authentication, and fraud decisions. Behavioral or embedding-based similarity can be difficult to explain and may encode demographic or household-related correlations that are legitimate in one context but misleading in another. Shared addresses, devices, or payment instruments can represent families, workplaces, public networks, or other benign relationships, so relationship evidence should not automatically be treated as proof of common identity.

Generative models introduce additional uncertainty. LLM outputs can vary across versions, hallucinate or misinterpret free-form appeals, and be sensitive to adversarial phrasing. Image and text-derived signals can increase coverage but may also increase false positives and make decisions harder to audit. The source does not describe evaluation sets, human review, threshold calibration, fairness analysis, explainability mechanisms, or rollback procedures. Those omissions mean the proposed GenAI direction should be understood as an opportunity and an operational challenge, not as evidence of measured production impact.

Overall, DoorDash presents a credible machine-learning platform strategy: compute reusable evidence centrally, keep identity resolution distinct from relationship analysis, and let use-case-specific models make the final decision. The reported latency and graph scale indicate substantial production infrastructure, while the LLM portion remains a stated future extension. Any eventual LLMOps rollout would benefit from treating model-generated attributes as versioned, observable, confidence-bearing features rather than as unexamined identity truth.
