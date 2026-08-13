---
title: "Risk Management and Production Deployment Practices for Generative AI Agents in Banking and Retail"
slug: "risk-management-and-production-deployment-practices-for-generative-ai-agents-in-banking-and-retail"
draft: false
llmopsTags:
  - "fraud-detection"
  - "customer-support"
  - "chatbot"
  - "question-answering"
  - "classification"
  - "summarization"
  - "rag"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "error-handling"
  - "fallback-strategies"
  - "human-in-the-loop"
  - "evals"
  - "few-shot"
  - "system-prompts"
  - "langchain"
  - "monitoring"
  - "guardrails"
  - "documentation"
  - "google-gcp"
  - "anthropic"
industryTags: "finance"
company: "Carrefour / Lloyds Banking"
summary: "This panel discussion brings together practitioners from Lloyds Banking, Yaya Finance, and Carrefour to discuss practical approaches to managing risk when deploying generative AI agents in production. The panelists share their experiences building customer-facing conversational AI systems, from low-risk internal documentation assistants to high-stakes financial services agents handling vulnerable customers and fraud detection. Key themes include the importance of starting with low-risk use cases and gradually expanding scope, the fundamental design shift from building up deterministic systems to constraining generative ones, the need for continuous testing pipelines, and formal risk assessment frameworks that evaluate both likelihood and financial impact. The discussion emphasizes that good risk management practices are ultimately good product development practices focused on serving user needs."
link: "https://www.youtube.com/watch?v=SmC6-LS7EtY"
year: 2026
seo:
  title: "Carrefour / Lloyds Banking: Risk Management and Production Deployment Practices for Generative AI Agents in Banking and Retail - ZenML LLMOps Database"
  description: "This panel discussion brings together practitioners from Lloyds Banking, Yaya Finance, and Carrefour to discuss practical approaches to managing risk when deploying generative AI agents in production. The panelists share their experiences building customer-facing conversational AI systems, from low-risk internal documentation assistants to high-stakes financial services agents handling vulnerable customers and fraud detection. Key themes include the importance of starting with low-risk use cases and gradually expanding scope, the fundamental design shift from building up deterministic systems to constraining generative ones, the need for continuous testing pipelines, and formal risk assessment frameworks that evaluate both likelihood and financial impact. The discussion emphasizes that good risk management practices are ultimately good product development practices focused on serving user needs."
  canonical: "https://www.zenml.io/llmops-database/risk-management-and-production-deployment-practices-for-generative-ai-agents-in-banking-and-retail"
  ogTitle: "Carrefour / Lloyds Banking: Risk Management and Production Deployment Practices for Generative AI Agents in Banking and Retail - ZenML LLMOps Database"
  ogDescription: "This panel discussion brings together practitioners from Lloyds Banking, Yaya Finance, and Carrefour to discuss practical approaches to managing risk when deploying generative AI agents in production. The panelists share their experiences building customer-facing conversational AI systems, from low-risk internal documentation assistants to high-stakes financial services agents handling vulnerable customers and fraud detection. Key themes include the importance of starting with low-risk use cases and gradually expanding scope, the fundamental design shift from building up deterministic systems to constraining generative ones, the need for continuous testing pipelines, and formal risk assessment frameworks that evaluate both likelihood and financial impact. The discussion emphasizes that good risk management practices are ultimately good product development practices focused on serving user needs."
notion:
  pageId: "3b8f8dff-2538-801b-ba17-dbbe68f815c4"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T15:17:00.000Z"
  lastEditedTime: "2026-08-10T15:17:00.000Z"
  publishedAt: "2026-08-10T15:24:19Z"
---

## Overview

This panel discussion provides a comprehensive look at how three organizations across banking and retail sectors are approaching the deployment of generative AI agents in production environments. The panelists include Adrian from Yaya Finance, Ruy from Lloyds Banking, and Gem from Carrefour, each bringing distinct perspectives on managing the risks associated with LLM-powered applications while delivering business value.

## Organizational Context and Use Cases

**Lloyds Banking** has been working with conversational AI for approximately eight to nine years, starting with deterministic chatbots and transitioning to generative AI over the past three years. Their approach has been deliberately conservative and incremental. They began by introducing an LLM as a secondary classifier in their deterministic chatbot, only triggering when the primary classifier failed to understand customer intent. This represented a zero-downside risk scenario since the worst outcome would be equivalent to the existing failure state. They subsequently added summarization features for support agents to reduce average handling time. Their most ambitious project is an agentic investment assistant designed specifically for customers new to investing, providing education and guidance while carefully avoiding regulated financial advice. This represents a particularly challenging use case because financial advice is a regulated activity in the UK, requiring the system to walk a tightrope between providing helpful guidance and crossing into prohibited territory.

**Yaya Finance** has moved more aggressively into customer-facing generative AI, currently running seven agents in production that can execute actions on customer accounts. Their journey took approximately 12 to 18 months to reach this level of capability. They started with a RAG model functioning as an enhanced FAQ system, then progressively added more sophisticated capabilities. Their agents now handle inquiries about payment due dates, account balances, account closures, and even interact with customers flagged for potential fraudulent activity. Their most recent agent assists customers in precarious debt situations, requiring sophisticated understanding of customer vulnerability. Importantly, these agents don't aim for complete end-to-end automation but rather handle specific percentages of cases, currently capping at around 55% autonomous resolution with human escalation for the remainder.

**Carrefour** has taken a more cautious internal-first approach, building a data platform assistant to help employees understand how to interact with the company's data infrastructure. This represents a low-risk starting point since it's internal-facing and focused on documentation. More recently, they've deployed customer-facing agents for e-commerce shopping assistance, but with careful audience restrictions limited to customers who have ordered at least once in the past three months, ensuring they're working with loyal customers and can gather feedback from an engaged user base.

## Fundamental Design Challenges

A critical insight emerged around the fundamental difference between designing deterministic versus generative conversational systems. Ruy articulated this particularly well: deterministic chatbots start with zero capability and you progressively build up functionality by adding intents, training data, and dialogue flows. On day one, a deterministic bot can't even say hello. In contrast, a generative bot built on a foundation model starts with immense capability out of the box and will attempt to answer virtually any question. The design challenge is therefore inverted—instead of building up capabilities, you must constrain and limit what the system can do. This represents a completely backward approach compared to traditional conversational AI design, and even experienced teams have found this transition surprisingly difficult.

This design inversion creates particular challenges around scoping and boundaries. Because foundation models have such broad knowledge, there's a temptation to rely on the model's inherent understanding rather than explicitly defining behavior. However, this leads to gaps in the specification where the LLM effectively makes judgments about business processes that haven't been properly defined. The areas where nothing has been specified aren't opportunities for creative AI responses—they're risks where the system may behave unpredictably or inappropriately.

## Testing and Validation Approaches

The non-deterministic nature of generative AI fundamentally changes testing requirements. Multiple panelists emphasized that traditional test-once approaches are insufficient. Adrian noted that even adding to a prompt can completely change an agent's "charisma," "attitude," or "vibe," requiring continuous testing pipelines that validate not just new functionality but consistency of existing behavior. Model switches, infrastructure changes, or even platform upgrades can alter behavior even when no deliberate changes have been made to prompts or knowledge bases.

Ruy proposed an interesting test-driven development approach specifically adapted for agentic systems. The workflow would be: first define scope and requirements upfront, then write comprehensive tests that evidence those requirements have been met before doing any prompting or knowledge base construction. Only after establishing the test suite should developers begin crafting prompts and building knowledge bases, with tests gradually passing as the system matures. This approach provides clear objective criteria for when development is "done" and when the system is ready for production—something that's notoriously difficult to determine with generative systems where there's always subjective room for improvement.

The panelists discussed using AI itself to support the testing process. Ruy mentioned experimenting with tools that take a scope document, knowledge base, and prompt set, then analyze them against each other to identify gaps—for example, flagging when the scope says the system should know about topic X but nothing about that topic exists in the knowledge base, or when the scope prohibits topic Y but there's no prompt constraint addressing it. This kind of automated analysis can help ensure comprehensive coverage and identify blind spots.

Adrian emphasized the need for continuous testing infrastructure that constantly validates consistency even in previously working functionality. This represents a shift toward what might be called "test ops"—ongoing augmentation of test datasets and continuous monitoring of outputs to ensure they maintain appropriate characteristics even as inputs remain constant. The goal is to verify not just correctness but consistency of tone, style, and business appropriateness.

Gem highlighted the challenge of reproducibility in testing—the difficulty of ensuring that a new version is definitively better than the previous one when outputs are non-deterministic. This requires establishing clear success criteria and testing frameworks that can account for variation while still measuring meaningful improvement.

## Risk Assessment and Management Frameworks

Lloyds Banking employs a formal, systematic risk assessment framework that has been used across the organization for potentially hundreds of years but has been adapted for AI risks. They use a two-dimensional risk matrix with likelihood on one axis (from definitely happening in the next six months to unlikely in the next five years) and potential damage on the other (from under one million pounds to over 100 million pounds). Each specific risk is evaluated individually by a group and positioned within this matrix.

The framework distinguishes between inherent risk (the risk if no controls are applied) and residual risk (the risk remaining after mitigations). For AI systems, inherent risks tend to score quite high because the likelihood of something going wrong is typically elevated. The organization then identifies controls and mitigations—guardrails that prevent issues, post-deployment monitoring that catches problems, audience limitations that reduce potential impact, or cleanup processes that minimize damage. The residual risk score after accounting for these controls determines whether to proceed.

Critically, risks below a certain threshold are acceptable with appropriate monitoring. Risks above a certain threshold are simply not pursued regardless of potential benefits. The middle ground requires careful analysis of controls and mitigations to bring residual risk to acceptable levels. One particularly effective control is limiting initial audience size—piloting with a small customer group fundamentally limits potential damage and provides data to better assess actual likelihood before broader rollout.

At Lloyds, risk ownership is deeply embedded in organizational accountability. Every AI initiative has a named senior individual who takes personal responsibility for that risk. These individuals may not know every implementation detail but receive summarized reporting about the system's operation and performance. This personal accountability creates strong incentives for appropriate caution and thorough risk management.

Yaya Finance takes a more pragmatic, iterative approach starting with clear business goals rather than technology-first thinking. Adrian emphasized that adoption decisions should always start with "what's best for the user?" rather than excitement about tools or technology. Their strategy has been to isolate the least sensitive data first, deploy agents with limited scope, gain confidence, then progressively expand to more sensitive operations. They didn't aim for complete end-to-end automation but rather set realistic targets of handling 5%, then 10%, then 20% of cases, eventually stabilizing around 55% autonomous resolution with human escalation for the remainder.

Their fraud detection and vulnerable customer handling agents demonstrate sophisticated scoping. For customers flagged as potentially fraudulent, the agent must gather information and guide the conversation carefully without explicitly stating that an investigation is underway, while still maintaining a positive customer experience since the suspicion may be cleared. For customers in precarious debt situations, the agent must detect vulnerability and route to human agents who can provide appropriate empathy, while still automating simpler cases like one-time payment challenges due to unexpected expenses.

Carrefour takes an even more conservative approach, starting entirely with internal use cases for data platform documentation where business risk is minimal. Even their customer-facing e-commerce shopping agents are restricted to customers who have ordered recently, ensuring engagement with a loyal, invested user base while gathering real-world feedback and performance data before broader expansion.

## Determinism vs. Generative Trade-offs

A significant discussion emerged around where to draw boundaries between generative AI capabilities and more deterministic, controlled processes. This spectrum runs from pure content generation (relatively low risk if occasionally wrong) through process automation affecting many customers (medium risk, potentially large financial impact) to high-stakes individual decisions (high risk requiring maximum control).

Adrian introduced the crucial concept of accountability and legal liability. Software systems cannot be held legally accountable for bad outcomes—responsibility ultimately rests with the teams that develop and deploy them. Until there are clear answers to the philosophical and legal question of who is accountable when AI makes mistakes, human validation remains essential. This doesn't necessarily mean real-time human-in-the-loop for every decision, but it does mean output validation with appropriate frequency—perhaps starting daily, then moving to every other day, weekly, monthly as confidence builds.

The panelists generally agreed that fully autonomous multi-agent systems remain aspirational for production deployment in high-stakes environments. The current generation of autonomous agent frameworks that trigger tasks, check their own work, iterate on failures, and complete complex workflows without human intervention are powerful but not yet suitable for unsupervised production use in finance or retail contexts. The technology may reach that point within two to three years, but output validation will remain necessary for the foreseeable future.

Gem introduced an interesting analogy comparing AI agents to employees: you wouldn't let a new employee immediately execute sensitive database operations unsupervised. They need to demonstrate competence over time before earning trust. Similarly, AI agents should start with data retrieval and analysis capabilities but require human review before executing actions that create, update, or delete data. Only after sustained reliable performance should they potentially be granted more autonomous authority for specific, well-bounded tasks.

## Infrastructure and Operational Concerns

Adrian raised important points about infrastructure that he hoped would receive more attention over the coming 12 months. Running LLMs requires substantial infrastructure, and production systems face challenges around capacity planning, usage prediction, and handling failure scenarios. He emphasized the importance of model fallback strategies—having backup models ready to take over if the primary model fails—as well as robust error handling and multi-tiered grading systems that can degrade gracefully rather than failing catastrophically.

Gem recounted a concerning production incident from October where an agent that had been working reliably for three months suddenly began generating URLs and links that didn't exist in the documentation, despite no deliberate changes to the system. This kind of unexplained behavior shift highlights the challenges of production LLM operations and the need for continuous monitoring. The root cause was never clearly identified, but the incident reinforced the need for constant vigilance even with seemingly stable systems.

Ruy predicted that manual conversation review, which currently dominates quality assurance processes, would largely be replaced by LLM-as-judge evaluation within 12 months. Human bandwidth for conversation analysis is severely limited—perhaps a couple hundred conversations per day for complex analysis. This is fundamentally insufficient for continuous regression testing across large conversation datasets. While humans will always need to provide some oversight, he expects 99% of routine analysis to shift to automated LLM evaluation, with humans focusing on the cases that automated systems flag for attention.

## Integration and Deployment Challenges

Gem provided a particularly interesting observation that building and deploying agents is relatively straightforward with modern frameworks and models, but integration with existing systems represents the primary challenge. In Carrefour's case, they wanted to embed agents directly into Google Chat where users already collaborate with data platform teams, but found Google Chat APIs surprisingly difficult to work with. The AI and agentic components were not the bottleneck—legacy IT integration was.

This reflects a broader pattern where the generative AI technology itself has become relatively accessible and capable, but production deployment requires navigating organizational systems, approval processes, integration points, and operational concerns that have nothing to do with the AI itself. The technology is advancing faster than many organizations' ability to integrate it into existing workflows and infrastructure.

## Evolution of Practices

Looking forward, the panelists identified several practices they expect to become obsolete or significantly enhanced. Gem expects that current manual oversight and trust issues will diminish as models become more reliable and stable, though he acknowledges that complete reliability remains elusive. The October incident with spontaneous hallucinations despite no system changes demonstrates that even stable systems can exhibit unexpected behavior.

Ruy anticipates dramatic reduction in manual conversation review as LLM-as-judge evaluation becomes standard, shifting human effort from routine analysis to oversight of automated systems and investigation of flagged edge cases. Adrian hopes for much greater attention to infrastructure, fallback strategies, error handling, and multi-tier grading systems that provide production resilience. He also emphasized that output validation through human review will remain essential until accountability and liability questions are resolved, even as validation frequency may decrease as confidence builds.

Several panelists noted that testing approaches will continue evolving toward continuous testing pipelines that validate not just new functionality but consistency of existing behavior, with test datasets constantly expanding and validation running regularly rather than as one-time checkpoints.

## Key Takeaways for LLMOps Practitioners

The discussion yields several critical insights for organizations deploying generative AI in production. Starting with low-risk use cases and expanding gradually is essential. Both Lloyds and Carrefour began with internal or behind-the-scenes applications where mistakes have limited impact. Yaya Finance deliberately started with the least sensitive data before progressively moving to more sensitive operations. This de-risks initial deployment and builds organizational confidence.

The design paradigm is fundamentally inverted for generative systems. Unlike traditional systems where you build up capabilities, generative systems require constraining immense out-of-box capability. This requires different design thinking focused on boundaries, limitations, and explicit scoping of what the system should not do, not just what it should do.

Testing must be continuous, not one-time. Changes to any component can affect behavior across the system, and even stable systems can exhibit unexpected changes. Continuous testing pipelines that validate consistency of existing behavior are as important as testing new functionality. Test-driven development adapted for LLMs provides clear success criteria—defining requirements and comprehensive tests before building prompts and knowledge bases creates objective measures of when development is complete and the system is ready for production.

Formal risk assessment frameworks are essential for regulated industries. Lloyds' likelihood-impact matrix approach with clear thresholds, control identification, and residual risk calculation provides systematic decision-making about what to deploy and what controls are necessary. Personal accountability drives appropriate caution, with named individuals taking responsibility for specific AI systems creating strong incentives for thorough risk management.

Scoping systems realistically rather than ambitiously is critical. Yaya Finance's approach of targeting 55% autonomous resolution with human escalation for the remainder is more practical than pursuing 100% automation. Well-defined boundaries between autonomous and human-handled cases reduce risk while delivering value.

Good risk management is fundamentally good product development. Adrian's principle of always asking "what's best for the user?" naturally leads to appropriate risk management, quality assurance, and design practices. Risk mitigation and user-focused design are aligned, not opposed.

Infrastructure and operational resilience deserve more attention. Model fallbacks, error handling, graceful degradation, and capacity planning are critical for production LLM systems but often receive insufficient focus. Integration with existing systems often poses bigger challenges than the AI itself—modern frameworks make building agents relatively straightforward, but connecting them to organizational systems, channels, and workflows requires substantial effort.

The panel ultimately concluded that many practices labeled as risk management are simply good practices for building effective and reliable agents. Making systems more robust, testable, and well-scoped benefits both risk reduction and user experience—similar to how accessibility improvements benefit all users, not just those requiring accessibility features.
