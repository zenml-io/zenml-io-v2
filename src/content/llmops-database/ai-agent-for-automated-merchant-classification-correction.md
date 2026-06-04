---
title: "AI Agent for Automated Merchant Classification Correction"
slug: "ai-agent-for-automated-merchant-classification-correction"
draft: false
llmopsTags:
  - "classification"
  - "data-cleaning"
  - "customer-support"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "agent-based"
  - "error-handling"
  - "evals"
  - "guardrails"
industryTags: "finance"
company: "Ramp"
summary: "Ramp, a corporate card and expense management platform, faced a scaling challenge with incorrect merchant classifications that frustrated customers and required hours of manual intervention from support and engineering teams. The company built an AI agent using LLMs combined with RAG, embeddings, OLAP queries, and carefully designed guardrails to automatically fix merchant classification requests submitted by users. The system processes requests in under 10 seconds (compared to hours previously), handles nearly 100% of requests (up from 1.5-3% manually), and achieves a 99% improvement rate according to LLM-based evaluation, while costing only cents per request versus hundreds of dollars for manual handling."
link: "https://builders.ramp.com/post/fixing-merchant-classifications-with-ai"
year: 2025
seo:
  title: "Ramp: AI Agent for Automated Merchant Classification Correction - ZenML LLMOps Database"
  description: "Ramp, a corporate card and expense management platform, faced a scaling challenge with incorrect merchant classifications that frustrated customers and required hours of manual intervention from support and engineering teams. The company built an AI agent using LLMs combined with RAG, embeddings, OLAP queries, and carefully designed guardrails to automatically fix merchant classification requests submitted by users. The system processes requests in under 10 seconds (compared to hours previously), handles nearly 100% of requests (up from 1.5-3% manually), and achieves a 99% improvement rate according to LLM-based evaluation, while costing only cents per request versus hundreds of dollars for manual handling."
  canonical: "https://www.zenml.io/llmops-database/ai-agent-for-automated-merchant-classification-correction"
  ogTitle: "Ramp: AI Agent for Automated Merchant Classification Correction - ZenML LLMOps Database"
  ogDescription: "Ramp, a corporate card and expense management platform, faced a scaling challenge with incorrect merchant classifications that frustrated customers and required hours of manual intervention from support and engineering teams. The company built an AI agent using LLMs combined with RAG, embeddings, OLAP queries, and carefully designed guardrails to automatically fix merchant classification requests submitted by users. The system processes requests in under 10 seconds (compared to hours previously), handles nearly 100% of requests (up from 1.5-3% manually), and achieves a 99% improvement rate according to LLM-based evaluation, while costing only cents per request versus hundreds of dollars for manual handling."
notion:
  pageId: "375f8dff-2538-80ce-a17c-db16e1b9e2d7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-04T08:05:00.000Z"
  lastEditedTime: "2026-06-04T08:05:00.000Z"
  publishedAt: "2026-06-04T08:37:30Z"
---

## Overview and Business Context

Ramp operates a corporate card and expense management platform where accurately matching transactions to merchants is critical for functionality like spending analysis and policy enforcement through restricted funds. The article describes how Ramp deployed an LLM-based AI agent to automatically handle user requests to fix incorrect merchant classifications, a problem that previously required manual intervention from customer support, finance, and engineering teams taking hours per request.

The business problem is clear and well-motivated: as Ramp scales, manual handling of merchant classification corrections doesn't scale. In 2023, teams could only service 3% of requests; by 2024 this dropped to 1.5%. The company needed an automated solution that could handle near 100% of requests while maintaining quality. The stakes are meaningful—incorrect classifications can trigger false policy violations (like a hotel being categorized as entertainment when someone used a travel fund meant for lodging), creating friction for users and generating support tickets.

## Technical Problem Definition

The core technical challenge stems from the limited and ambiguous data available in card acceptor information provided by payment processors like Stripe. Card acceptor names are often cryptic (e.g., "PTI*BRYANTPARKWV" for Bryant Park, or just "SERVICE FEE" for government transactions), and supplementary data like Merchant Category Codes (MCCs) and location information can be misleading. For instance, a hotel might offer lodging, food, and entertainment services but have a single MCC, or an Amtrak booking between Boston and NYC might show a Washington D.C. location.

When users submit correction requests providing a new merchant name, website, and category, the LLM must decide between multiple actions: creating a new Ramp merchant record, updating an existing merchant, or reassigning the transaction to a different existing merchant. This decision requires context beyond what the user provides—the system needs to know if a merchant record already exists, whether the proposed changes are reasonable, and whether this represents a legitimate correction versus a user error or misuse of the tool.

## Solution Architecture

Ramp's solution centers on an LLM-backed agent with three key architectural components: intelligent context building through RAG, a constrained action space with guardrails, and multi-phase evaluation strategies.

**Context Building via RAG**: The system cannot simply provide the LLM with all existing Ramp merchants (this would overflow context windows and not scale), so it uses a RAG approach to retrieve the K most relevant merchants. This retrieval combines two strategies. First, it uses vector embeddings based on transaction card acceptor names to find similar merchants—both transaction and merchant embeddings are derived from card acceptor names of mapped transactions. Second, it performs name-based matching using the user's requested merchant name. This dual approach is necessary because card acceptor names can be extremely different from actual merchant names (the "SERVICE FEE" example). The article notes that Ramp has prior experience with transaction embeddings from other work, and references similar recent work from Stripe.

Beyond merchant retrieval, the LLM receives additional context including: the original transaction's card acceptor name and MCC; extracted merchant names, addresses, and line items from related receipt images (making this multimodal RAG); and user-provided memos for related transactions. The receipt processing appears particularly powerful—in one example, the LLM used receipt line items showing "ice, regular fuel, and snacks" to validate that a "Four Points Service Station" correction made more sense than "Four Points by Sheraton" hotel despite the ambiguous acceptor name "FOUR POINTS".

**Guardrails and Constrained Actions**: The system implements both pre-processing and post-processing guardrails. The LLM can only select from a predefined set of low-impact actions on nearly all requests, with high-impact actions allowed only in specific circumstances. For example, the system prevents the LLM from changing well-established merchant records (the article mentions they don't want the Amazon merchant record changed to have website www.google.com).

Post-processing guardrails catch LLM hallucinations through validation. The system requires that the LLM always choose one of the provided actions (ensuring guardrails work properly), and if the LLM chooses to reassign a transaction, the target must be from the supplied merchant list. When hallucinations are detected, the system informs the LLM of its error and has it retry until receiving a valid response. This retry mechanism is a practical LLMOps pattern for handling edge cases in production.

**Multi-LLM Architecture**: The system actually uses multiple LLMs for different purposes. The primary LLM makes classification decisions, but when requests are rejected, a second LLM rewrites the rejection reasoning in plain language for users. This separation of concerns—one LLM for the core task, another for user communication—is a thoughtful production design that balances technical accuracy with user experience.

## LLM Capabilities Leveraged

The solution demonstrates sophisticated use of LLM capabilities beyond simple text generation. The primary LLM exhibits reasoning ability when evaluating requests—for example, identifying that "HarperGray officially rebranded to Clarity in April 2023" using knowledge distilled during training to handle rebranding scenarios. This shows reliance on the LLM's parametric knowledge, though it raises the typical concern about knowledge cutoff dates and hallucination risks (which the guardrails help mitigate).

The multimodal aspect is significant: the system processes receipt images to extract structured information (merchant names, addresses, line items) that feeds into the LLM's decision-making. While the article doesn't detail the receipt extraction pipeline, this represents a practical production implementation of multimodal RAG where visual information supplements textual signals.

## Evaluation Strategy Evolution

The article provides an unusually detailed and honest account of evaluation strategy evolution, which is valuable for understanding real-world LLMOps practices. Ramp employed four evaluation phases, each suited to different development stages and scales:

**Phase 1 - Manual Review**: Initial evaluation involved manually reviewing LLM responses on select users and transactions. The rationale is sound: determine if an LLM can solve the problem at all, focus on improving prompt and context rather than building evaluation infrastructure, and leverage necessary human judgment for this complex domain requiring Ramp-specific knowledge. This is feasible at tens of requests per day.

**Phase 2 - Negative Signal Tracking**: Once rolled out more broadly, Ramp used absence of followup correction requests as a proxy metric. The reasoning is that satisfied users won't re-report issues, similar to how people typically only leave reviews when they have bad experiences. This is easy to implement and identifies candidates for manual review, though it's an indirect signal.

**Phase 3 - Rejection Rate Monitoring**: Simultaneously, the team tracked rejection rates, assuming legitimate users should have low rejection rates. Again, this is easy to set up and enables focused review but remains an indirect metric.

**Phase 4 - LLM as Judge**: At scale (100+ requests per day), Ramp implemented an LLM judge inspired by cited academic work demonstrating that state-of-the-art LLMs are reliable evaluators. The judge LLM evaluates whether agent actions resulted in improvements (for accepted requests) or whether rejections were reasonable (for rejected requests). This provides stronger signal than previous metrics while scaling effectively.

Critically, the LLM judge enables shadow mode evaluation—the agent can indicate what it would do without taking action, allowing Ramp to assess behavior on customer transactions before actual rollout. This is excellent LLMOps practice for de-risking production deployments.

The article acknowledges that the stronger LLM judge metrics validate the weaker proxy signals (followup rates and rejection rates), providing some triangulation confidence. However, there's an important caveat around the "nearly two thirds of rejections are reasonable" metric—this means about one third of rejections may not be reasonable, which the article attributes to users not filling forms perfectly or interpreting the tool differently than intended. This honest acknowledgment of imperfection is valuable; perfect systems don't exist, and understanding failure modes matters.

## Production Results and Impact

The quantitative results demonstrate substantial business impact across three dimensions:

**Coverage**: From 3% of requests handled in 2023 and 1.5% in 2024 under manual processing, the agent now handles close to 100% of requests. This represents not just incremental improvement but a fundamental change in capability.

**Speed**: Request resolution time dropped from hours to under 10 seconds, a reduction of multiple orders of magnitude. This directly translates to customer satisfaction—users are unblocked nearly instantly rather than waiting for support escalation.

**Cost**: Per-request cost dropped from hundreds of dollars (human labor hours) to cents (LLM API calls and compute). While the article doesn't provide precise figures, this likely represents 100-1000x cost reduction.

**Quality**: The LLM judge reports that the agent improves nearly 99% of transaction classifications, with nearly two thirds of rejections being reasonable. Fewer than 10% of transactions receive a second correction request, and only 1 in 4 requests are rejected by the agent.

These metrics paint a compelling picture, though as critical readers we should note that "nearly 99%" and "nearly two thirds" are somewhat vague quantifiers. More precise figures with confidence intervals would strengthen confidence, though for a blog post promoting their work, this level of detail is reasonable.

## Practical LLMOps Patterns Demonstrated

Several production LLMOps patterns emerge from this case study:

**Iterative Evaluation Development**: Rather than building comprehensive evaluation infrastructure upfront, Ramp started with manual review and progressively added automated evaluation as scale demanded. This pragmatic approach prioritizes learning and iteration over premature optimization.

**Shadow Mode Testing**: Testing the agent's behavior on real customer data without actually taking actions provides crucial validation before full rollout. This is a critical de-risking pattern for high-stakes production systems.

**Guardrails as Safety Nets**: The multi-layer guardrail approach (constrained action spaces, validation of LLM outputs, retry mechanisms for hallucinations) acknowledges that LLMs are probabilistic and require defensive programming. This represents mature thinking about production LLM deployment.

**Hybrid Human-AI Design**: The system doesn't try to automate everything—it focuses on the high-volume, automatable cases while presumably escalating edge cases. The rejection mechanism with user-friendly explanations maintains human agency in the loop.

**Context Engineering Over Model Training**: Rather than fine-tuning models, Ramp achieved results through sophisticated context construction (RAG, embeddings, receipt extraction, memos). This is often more maintainable and faster to iterate than custom model training, though it does increase inference costs and latency.

**Multi-LLM Specialization**: Using different LLMs for core decision-making versus user communication shows thoughtful system design that matches model capabilities to specific subtasks.

## Extensions and Broader Applications

The article describes two extensions of the core RAG-plus-LLM flow that demonstrate the composability of well-designed LLM systems:

**Extension 1**: An internal batch version that takes an existing Ramp merchant with potentially miscategorized transactions and uses an LLM to map those transactions to more appropriate merchants. This is essentially the same core capability applied in batch mode for data cleanup rather than real-time user requests.

**Extension 2**: Mapping transaction information from credit card statements to existing Ramp merchants during customer onboarding. This provides value both internally (customer spend behavior insights) and externally (helping new customers see if their existing merchants are already in Ramp, accelerating onboarding and spend migration).

These extensions illustrate how solving one LLM-based problem well can unlock additional applications with relatively low incremental development cost, a key advantage of modular LLMOps architectures.

## Critical Assessment and Limitations

While the case study presents impressive results, several considerations warrant attention:

**Evaluation Validity**: The LLM-as-judge approach relies on another LLM to evaluate the primary LLM's performance. This introduces potential bias if both models share similar failure modes or biases. While the article cites academic work supporting this approach, independent human evaluation on a sample would strengthen confidence. The validation that weaker proxy metrics align with the LLM judge provides some triangulation, but isn't fully independent.

**Cost Transparency**: The article mentions costs dropped to "cents" per request but doesn't provide specifics. Understanding the full cost (LLM API calls for primary agent, judge LLM, embedding generation, OLAP queries, receipt processing) would help assess true economics. At 100+ requests per day, even small per-request costs accumulate, and the comparison to "hundreds of dollars" in human labor may not account for the engineering investment in building and maintaining this system.

**Latency Components**: "Under 10 seconds" is impressive compared to hours, but still represents noticeable latency for a user waiting. The article doesn't break down where this latency comes from (OLAP queries, embedding retrieval, receipt processing, LLM inference, potential retries). Understanding bottlenecks would inform optimization opportunities.

**Failure Mode Transparency**: The "nearly 99%" improvement rate is excellent, but what happens with the ~1% that don't improve? Similarly, the ~33% of "unreasonable" rejections (inverse of "nearly two thirds reasonable") represents a meaningful failure mode. The article attributes this to user error or different tool interpretation, but this could also indicate UX issues or edge cases the system doesn't handle well.

**Embedding and RAG Details**: The article references prior work on transaction embeddings but doesn't detail the embedding model used (e.g., sentence transformers, custom trained, which specific model) or the vector database infrastructure. Similarly, the "K" in "K most relevant merchants" isn't specified, nor are the relative weights between embedding-based retrieval and name-matching retrieval.

**Multimodal Processing**: Receipt extraction is mentioned but not detailed. This is likely a significant component of the system—OCR quality, structured extraction, error handling—but remains a black box. Whether this uses a vision-language model, traditional OCR plus extraction, or other approaches is unclear.

**Model Selection and Prompting**: The article doesn't specify which LLM(s) are used (GPT-4, Claude, etc.), prompt engineering approaches, temperature settings, or whether different models are used for different subtasks (primary agent vs. judge vs. user communication). These details would be valuable for practitioners implementing similar systems.

**Monitoring and Maintenance**: While evaluation strategies are well-covered, ongoing production monitoring isn't detailed. How does Ramp detect model drift, handle changing merchant patterns, update embeddings, or maintain the system as the merchant database grows?

## Business and Scaling Implications

The case study emphasizes scaling concerns: "The problem of fixing merchant classifications scales proportionally with the number of Ramp card transactions. A manual approach to handling these requests simply is not sustainable as we grow." This framing positions the AI agent as enabling business growth rather than just optimizing existing processes—the agent "unlocks our potential to more easily 100X our transactions without worrying about 100Xing our customer support staff."

This scaling narrative is compelling but raises questions about whether the automated system's costs scale linearly with transactions. If embedding generation, OLAP queries, and LLM inference all scale with transaction volume, costs may increase proportionally even if not requiring linear headcount growth. The advantage is likely that marginal costs (cents per request) are far lower than marginal human labor costs (hundreds of dollars), providing favorable economics even if not constant-cost scaling.

## Technical Debt and Complexity Tradeoffs

The system as described is quite complex, involving multiple LLMs, embedding models, RAG infrastructure, receipt processing, OLAP databases, guardrail logic, and evaluation pipelines. This complexity brings maintenance burden and potential failure points. The tradeoff appears justified given the business impact, but organizations considering similar approaches should carefully consider whether simpler solutions (better heuristics, traditional ML, human-in-the-loop workflows) might suffice for their scale and constraints.

The article's honest discussion of evaluation evolution suggests Ramp thoughtfully managed this complexity, starting simple and adding sophistication as needed rather than over-engineering upfront. This pragmatic approach to complexity management is a valuable lesson for LLMOps practitioners.

## Conclusion and Broader Implications

This case study represents a sophisticated production LLM deployment addressing a clear business problem with measurable impact. The combination of RAG, embeddings, multimodal processing, and careful guardrails demonstrates mature LLMOps thinking. The detailed evaluation strategy discussion is particularly valuable, showing how evaluation approaches should evolve with system maturity and scale.

The extensions to other merchant matching problems suggest this is not just a one-off solution but a reusable pattern within Ramp's infrastructure, indicating successful abstraction and generalization. The emphasis on context engineering over model training, multiple specialized LLMs over one do-everything model, and progressive evaluation sophistication over upfront perfection all represent pragmatic production patterns worth emulating.

However, the case study is ultimately a success story from the team that built the system, so healthy skepticism about claimed metrics and unreported challenges is warranted. The ~1% non-improvement rate and ~33% unreasonable rejection rate, while small, likely represent ongoing areas of work. The true test will be whether these metrics hold as the system scales further and as user expectations evolve.
