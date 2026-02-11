---
title: "AI-Powered Merchant Classification Correction Agent"
slug: "ai-powered-merchant-classification-correction-agent"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "690a0ea94c2d28172b57174e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:25:34.562Z"
  createdOn: "2025-11-04T14:33:13.419Z"
llmopsTags:
  - "customer-support"
  - "fraud-detection"
  - "classification"
  - "data-cleaning"
  - "data-integration"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "agent-based"
  - "error-handling"
  - "semantic-search"
  - "vector-search"
  - "monitoring"
industryTags: "finance"
company: "Ramp"
summary: "Ramp built an AI agent to automatically fix incorrect merchant classifications that were previously causing customer frustration and requiring hours of manual intervention from support, finance, and engineering teams. The solution uses a large language model backed by embeddings and OLAP queries, multimodal retrieval augmented generation (RAG) with receipt image analysis, and carefully constructed guardrails to validate and process user-submitted correction requests. The agent now handles nearly 100% of requests (compared to less than 3% previously handled manually) in under 10 seconds with a 99% improvement rate according to LLM-based evaluation, saving both customer time and substantial operational costs."
link: "https://engineering.ramp.com/post/fixing-merchant-classifications-with-ai"
year: 2025
seo:
  title: "Ramp: AI-Powered Merchant Classification Correction Agent - ZenML LLMOps Database"
  description: "Ramp built an AI agent to automatically fix incorrect merchant classifications that were previously causing customer frustration and requiring hours of manual intervention from support, finance, and engineering teams. The solution uses a large language model backed by embeddings and OLAP queries, multimodal retrieval augmented generation (RAG) with receipt image analysis, and carefully constructed guardrails to validate and process user-submitted correction requests. The agent now handles nearly 100% of requests (compared to less than 3% previously handled manually) in under 10 seconds with a 99% improvement rate according to LLM-based evaluation, saving both customer time and substantial operational costs."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-merchant-classification-correction-agent"
  ogTitle: "Ramp: AI-Powered Merchant Classification Correction Agent - ZenML LLMOps Database"
  ogDescription: "Ramp built an AI agent to automatically fix incorrect merchant classifications that were previously causing customer frustration and requiring hours of manual intervention from support, finance, and engineering teams. The solution uses a large language model backed by embeddings and OLAP queries, multimodal retrieval augmented generation (RAG) with receipt image analysis, and carefully constructed guardrails to validate and process user-submitted correction requests. The agent now handles nearly 100% of requests (compared to less than 3% previously handled manually) in under 10 seconds with a 99% improvement rate according to LLM-based evaluation, saving both customer time and substantial operational costs."
---

## Overview and Business Context

Ramp, a financial technology company providing corporate cards and expense management, faced a scaling challenge with their merchant classification system. The company's merchant matching system automatically maps credit card transactions to enriched merchant records that include user-friendly names, websites, categories, and logos. While this automatic matching worked well in most cases, incorrect classifications created significant customer friction and operational overhead.

The business problem manifested when customers would use restricted funds (like a travel fund) but transactions would be misclassified into wrong categories (like entertainment instead of lodging), causing policy violations and requiring manual intervention. Prior to implementing their AI solution, correction requests were handled by a combination of customer support, finance, and engineering teams, taking hours per request. As the company stated, the manual approach was fundamentally unsustainable given that the problem scaled proportionally with transaction volume—a manual process could not support 100X growth in transactions without 100Xing support staff.

The underlying technical challenge stems from the limited and often ambiguous information received from payment processors in the "card acceptor" data. Card acceptor names are frequently cryptic (like "PTI*BRYANTPARKWV" instead of "Bryant Park"), and supporting metadata like Merchant Category Codes (MCCs) and location information can be misleading or unreliable, particularly for businesses offering multiple services or for online transactions. In many cases, user context is the only way to disambiguate transactions definitively.

## Solution Architecture

Ramp's solution centers on an LLM-based agent that processes user-submitted correction requests containing a new merchant name, website, and category. The architecture has three core pillars: intelligent context building, multimodal RAG retrieval, and comprehensive guardrails.

### Context Building and Multimodal RAG

The agent doesn't operate on user input alone—it assembles rich context to inform the LLM's decision-making. This context includes the original transaction's card acceptor name and MCC code, along with critically important multimodal data: extracted merchant names, addresses, and line items from related receipt images, plus user-provided memos for related transactions. This multimodal approach enables the LLM to validate whether user requests align with actual transaction evidence. For example, when validating a request to change a "Four Points by Sheraton" hotel to "Four Points Service Station" gas station, the LLM examined the MCC code (5541, indicating fuel/gas), receipt line items showing ice, regular fuel, and snacks, and the prevalent merchant name from receipts ("FOUR POINTS STOP"), all confirming the correction was legitimate.

The RAG component addresses a critical scaling challenge: determining which existing merchants to present to the LLM for consideration. Providing all Ramp merchants would overwhelm the context window and doesn't scale. Instead, Ramp employs a dual-strategy RAG approach. They use vector embedding similarity to find merchants whose transaction patterns (based on card acceptor names) are similar to the current transaction, and they also pull merchants whose names roughly match the user's requested merchant name. This dual approach is essential because card acceptor names can be completely different from actual merchant names—some being as vague as "SERVICE FEE"—so relying solely on embeddings derived from acceptor names would miss legitimate matches based on the actual merchant name.

The embeddings themselves are transaction-level: transaction embeddings come from card acceptor names, while merchant embeddings come from the acceptor names of transactions previously mapped to those merchants. This enables semantic similarity search that goes beyond simple string matching.

### LLM Decision Making and Actions

Given the assembled context and retrieved candidate merchants, the LLM must map the user's correction request to one of three actions: create a new Ramp merchant, update an existing merchant's information, or reassign the transaction to a different existing merchant. The system explicitly constrains the LLM to select one of these predefined actions rather than allowing free-form responses.

The LLM's reasoning demonstrates sophisticated use of multiple signals. In one example involving a rebranding case (HarperGray to Clarity), the LLM leveraged knowledge distilled during training to recognize that the corporate rebrand occurred in April 2023, maintaining the same entity while changing the website domain from harpergray.com to clarity.com. This shows the system exploiting both the retrieval-augmented context and the LLM's parametric knowledge.

### Guardrails and Validation

Recognizing that modifying merchant records incorrectly could have significant downstream consequences, Ramp implemented multiple layers of guardrails. The system carefully distinguishes between low-impact actions (which the LLM can take on nearly all requests) and high-impact actions (which are restricted to specific circumstances). For example, the agent would never be allowed to modify the Amazon merchant record to have the website "www.google.com."

The guardrails include post-processing validation to catch LLM hallucinations. The team observed two primary hallucination patterns: the LLM choosing actions not in the provided set, and the LLM selecting merchants not in the supplied candidate list when reassigning transactions. To address this, the system validates that the LLM's chosen action is always one of the explicitly provided options, and if the LLM chooses to reassign a transaction, the target merchant must be in the supplied list. When hallucinations are detected, the system informs the LLM of its error and requests a retry until receiving a valid response.

## Production Deployment and User Experience

The agent operates in production with sub-10-second response times, representing a dramatic improvement from the hours previously required for manual processing. When the LLM takes an action that modifies the merchant classification, users observe the change on the frontend in seconds. This real-time feedback creates a seamless self-service experience.

An interesting UX consideration emerged around rejections. Initially, when the LLM rejected a request, users saw no explanation, creating confusion about whether the request was rejected or simply failed. Ramp addressed this by implementing a two-LLM approach: the primary LLM's rejection reasoning is passed to a second LLM that rewrites it in plain language suitable for user consumption. This explanation is returned to the frontend, providing users with clear, timely feedback about why their requests couldn't be processed.

## Evaluation Strategy and Evolution

Ramp's evaluation approach evolved through four distinct phases as the system matured and scaled, demonstrating pragmatic MLOps practices that balance rigor with development velocity.

### Phase 1: Manual Review

Initial evaluation involved manually reviewing LLM responses on select users and transactions. The team advocates for this as the best first evaluation strategy for several reasons: it validates whether an LLM can solve the problem at all, human evaluation is necessary given the problem's complexity and requirement for Ramp-specific domain knowledge, it allows focus on improving the LLM's usage (prompt engineering, context assembly, guardrails) rather than building evaluation infrastructure, and it's feasible at the initial scale of tens of requests per day.

### Phase 2: Proxy Metrics via User Behavior

As rollout expanded beyond manual review capacity, the team employed a clever proxy metric: the absence of follow-up correction requests. The reasoning is intuitive—similar to how people typically only leave online reviews after bad experiences, users are unlikely to submit another correction if the agent acted properly the first time. This signal enabled lightweight monitoring and helped identify requests worth manual review without requiring explicit evaluation of every transaction.

### Phase 3: Rejection Rate Monitoring

Concurrently, the team tracked rejection rates under the assumption that users generally use the tool appropriately, expecting a low rejection rate in practice. This simple metric enabled focused manual review of potential issues without extensive infrastructure.

### Phase 4: LLM-as-Judge

As the system scaled to 100+ requests daily, Ramp needed evaluation that could handle volume while providing stronger signals than proxy metrics. Inspired by research demonstrating that state-of-the-art LLMs are reliable evaluators, they implemented an LLM judge. For changes, the judge determines whether the agent's action resulted in an improvement according to the user's request. For rejections, the judge assesses whether the rejection was reasonable. This approach scales to high request volumes while providing stronger correctness signals than behavioral proxies.

An important benefit of LLM-based evaluation is the ability to assess agent performance in "shadow mode"—where the agent indicates what it would do without actually taking action. By mimicking what would appear to users and passing that to the LLM judge, Ramp could evaluate how the agent would behave on customers' transactions before actually rolling it out to those customers, significantly de-risking deployments.

## Results and Performance Metrics

The agent demonstrates strong production performance across multiple evaluation dimensions. According to the LLM judge evaluation, the agent improves nearly 99% of transaction classifications. Regarding rejections, approximately 1 in 4 requests are rejected by the agent, and nearly two-thirds of these rejections are deemed reasonable by the judge. The team notes that reasonable rejections often occur because users don't always complete the form perfectly (using placeholder or unrelated data) or interpret the tool differently than intended (such as using it to add transaction comments).

The proxy behavioral metrics support these findings: fewer than 10% of transactions receive a second correction request, indicating high success rates on first attempts. From an operational perspective, the transformation is dramatic—in 2023 only 3% of requests were serviced by manual teams, dropping to 1.5% in 2024 as volume increased. The agent now handles close to 100% of requests in under 10 seconds at a cost of cents per request, compared to the previous hours-long process costing hundreds of dollars in employee time.

## System Extensions and Generalization

The success of the RAG-plus-LLM architecture led Ramp to extend the approach to two additional merchant mapping problems, demonstrating the generalizability of their LLMOps patterns.

The first extension is an internal batch processing version that addresses existing Ramp merchants with miscategorized transactions. Given a merchant that may have incorrect transaction mappings, the system uses an LLM with appropriate context to map those transactions to more appropriate merchants, essentially performing retroactive cleanup at scale.

The second extension tackles matching transaction information from credit card statements to existing Ramp merchants. This provides value both internally (granular insights into customer spending behavior) and externally (helps customers onboarding to Ramp see which merchants they transact with already exist in the system, organizing the onboarding flow and accelerating spend migration to Ramp).

## LLMOps Considerations and Tradeoffs

This case study demonstrates several important LLMOps principles and tradeoffs. The team's phased evaluation approach reflects a pragmatic understanding that evaluation strategies should match system maturity and scale—starting with manual review when learning the problem space, transitioning to lightweight proxy metrics during initial scaling, and implementing more sophisticated LLM-based evaluation only when volume demands it. This contrasts with premature investment in evaluation infrastructure before understanding what needs to be measured.

The dual-strategy RAG approach (combining embedding similarity and name matching) addresses a fundamental challenge in production RAG systems: retrieval based solely on embeddings can fail when the embedded representation (card acceptor names) differs significantly from the query representation (actual merchant names). This highlights the importance of understanding what embeddings actually represent and supplementing them with complementary retrieval strategies.

The guardrail architecture demonstrates a mature approach to constraining LLM behavior in production. Rather than hoping the LLM will behave appropriately through prompt engineering alone, the system enforces hard constraints (actions must be from a predefined set, reassignment targets must be in the candidate list) and implements validation loops that catch and retry on hallucinations. This defense-in-depth approach is critical for applications where incorrect actions have meaningful business consequences.

The use of a second LLM to rewrite rejection explanations for user consumption is an elegant solution to the challenge of making LLM reasoning accessible to end users. Rather than exposing potentially technical or jargon-heavy reasoning directly, the system uses the LLM's natural language capabilities to translate into user-friendly explanations.

However, the case study should be evaluated with appropriate context. While the reported metrics are impressive (99% improvement rate, near-zero follow-up requests), these are based largely on proxy metrics and LLM-based evaluation rather than comprehensive human evaluation at scale. The LLM judge approach, while well-supported by research, still represents an automated evaluation of an automated system. The team's acknowledgment that nearly two-thirds of rejections are "reasonable" (implying one-third may not be) suggests there remain edge cases and user experience challenges to address.

The shadow mode evaluation capability is particularly noteworthy from an LLMOps perspective, enabling safe validation before production deployment. This de-risks rollouts significantly and should be considered a best practice for high-stakes LLM applications. The ability to test the complete system behavior (including what users would see) without actually modifying production data provides confidence that manual rollback procedures might not.

The multimodal aspect of the solution—incorporating receipt image analysis alongside textual transaction data—represents the kind of rich context assembly that characterizes sophisticated production LLM systems. Many LLM applications operate on text alone, but Ramp recognized that visual information from receipts provides critical evidence for validation. This integration of multiple data modalities into the LLM's context demonstrates mature thinking about how to maximize the signal available for decision-making.

Overall, this case study illustrates a production LLM system that progressed from manual operations through multiple scaling phases with evolving evaluation strategies, demonstrating careful attention to guardrails, user experience, and operational metrics. The extensions to additional use cases suggest the architectural patterns are robust and generalizable within the merchant matching domain.