---
title: "LLM-Powered Real Estate Search and Agent Matching"
slug: "llm-powered-real-estate-search-and-agent-matching"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6908a5bea1de6d222444f899"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:24:35.397Z"
  createdOn: "2025-11-03T12:53:18.255Z"
llmopsTags:
  - "customer-support"
  - "question-answering"
  - "summarization"
  - "chatbot"
  - "content-moderation"
  - "prompt-engineering"
  - "embeddings"
  - "few-shot"
  - "semantic-search"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "evals"
  - "monitoring"
  - "documentation"
  - "guardrails"
industryTags: "tech"
company: "Zillow"
summary: "Zillow's StreetEasy platform developed two LLM-powered features in 2024 to enhance the real estate experience for New York City users. The first feature, \"Instant Answers,\" uses pre-generated AI responses to address frequently asked property questions, reducing user frustration and improving efficiency on listing pages where shoppers spend less than 61 seconds. The second feature, \"Easy as PIE,\" creates personalized introductions between home buyers and agents by generating AI-powered bio summaries and highlighting relevant agent attributes based on deal history and user preferences. Both features were designed with cost-effectiveness, scalability, and ethical considerations in mind, leveraging techniques like BERTopic for topic modeling, chain-of-thought prompting to prevent hallucinations, and Fair Housing guardrails to ensure compliance. The implementation demonstrated the importance of data quality, human oversight, cross-functional collaboration, and iterative development in deploying production LLM systems."
link: "https://www.zillow.com/tech/revolutionizing-the-real-estate-experience-with-llms-streeteasys-ai-journey/"
year: 2025
seo:
  title: "Zillow: LLM-Powered Real Estate Search and Agent Matching - ZenML LLMOps Database"
  description: "Zillow's StreetEasy platform developed two LLM-powered features in 2024 to enhance the real estate experience for New York City users. The first feature, \"Instant Answers,\" uses pre-generated AI responses to address frequently asked property questions, reducing user frustration and improving efficiency on listing pages where shoppers spend less than 61 seconds. The second feature, \"Easy as PIE,\" creates personalized introductions between home buyers and agents by generating AI-powered bio summaries and highlighting relevant agent attributes based on deal history and user preferences. Both features were designed with cost-effectiveness, scalability, and ethical considerations in mind, leveraging techniques like BERTopic for topic modeling, chain-of-thought prompting to prevent hallucinations, and Fair Housing guardrails to ensure compliance. The implementation demonstrated the importance of data quality, human oversight, cross-functional collaboration, and iterative development in deploying production LLM systems."
  canonical: "https://www.zenml.io/llmops-database/llm-powered-real-estate-search-and-agent-matching"
  ogTitle: "Zillow: LLM-Powered Real Estate Search and Agent Matching - ZenML LLMOps Database"
  ogDescription: "Zillow's StreetEasy platform developed two LLM-powered features in 2024 to enhance the real estate experience for New York City users. The first feature, \"Instant Answers,\" uses pre-generated AI responses to address frequently asked property questions, reducing user frustration and improving efficiency on listing pages where shoppers spend less than 61 seconds. The second feature, \"Easy as PIE,\" creates personalized introductions between home buyers and agents by generating AI-powered bio summaries and highlighting relevant agent attributes based on deal history and user preferences. Both features were designed with cost-effectiveness, scalability, and ethical considerations in mind, leveraging techniques like BERTopic for topic modeling, chain-of-thought prompting to prevent hallucinations, and Fair Housing guardrails to ensure compliance. The implementation demonstrated the importance of data quality, human oversight, cross-functional collaboration, and iterative development in deploying production LLM systems."
---

## Overview

Zillow's StreetEasy platform, focused on the New York City real estate market, embarked on an LLM integration journey in 2024 to enhance user experience across property search, agent matching, and information discovery. While the company has a long history with traditional AI and machine learning (powering features like home value estimates and recommendation systems), this case study specifically addresses their transition to large language models for production use cases. The implementation focuses on two distinct features that address real pain points in the real estate shopping experience: answering property-related questions quickly and facilitating better connections between buyers and agents.

It's important to note that this case study, published on Zillow's tech blog, serves partly as a showcase of their technical capabilities and innovation culture. While the technical details provided are valuable, the narrative naturally emphasizes successes and learnings rather than potential failures or ongoing challenges. The features described appear to be in production, though specific performance metrics, user adoption rates, or quantified business impact are notably absent from the discussion.

## Feature 1: Instant Answers - AI-Powered FAQ System

The first production feature addresses a fundamental user behavior insight: shoppers spend an average of less than 61 seconds on property listing pages, yet these pages contain substantial information that users struggle to parse efficiently. Analysis of questions submitted to agents between December 2021 and April 2023 revealed that many queries were repetitive and could be addressed through structured data already available in Zillow's systems. The team recognized an opportunity to provide instant gratification rather than requiring users to search through complex information or wait for agent responses.

### Technical Architecture and Design Decisions

A critical architectural decision was to pre-generate answers rather than generate them in real-time. This approach reflects a pragmatic understanding of LLMOps constraints: the team explicitly aimed to build a system costing "less than a few hundred dollars" while scaling to support StreetEasy/Zillow traffic levels. This cost-consciousness influenced the entire technical design, prioritizing caching and pre-computation over on-demand generation.

The implementation pipeline involves several distinct stages. First, the team used BERTopic, a neural topic modeling technique, to analyze anonymized historical inquiries from home buyers. This approach leverages BERT embeddings to create dense representations of user questions, then applies clustering algorithms to identify latent topics and their most important keywords. Given that their dataset consisted of short messages containing single distinct questions, this technique proved effective for identifying frequently asked questions and their variations.

Once common topics were identified, the team prepared context data by aggregating and preprocessing information from active listings, past listings, and building pages. This comprehensive dataset serves as the foundation for answer generation, grounding LLM responses in verified property data rather than relying on the model's parametric knowledge.

### Prompt Engineering and Quality Control

The prompt engineering process focused on two primary objectives: determining which FAQs could be reliably answered using available data, and ensuring the system only responded to answerable questions. This reflects a mature understanding of LLM limitations and the importance of knowing when not to answer.

To evaluate generated answers, the team employed both LLM-based and traditional metrics. They measured Faithfulness (factual consistency with provided information) and Response Relevancy (how well the answer addresses the prompt), drawing on established frameworks like RAGAS for retrieval-augmented generation evaluation. Additionally, they incorporated non-LLM-based metrics to ensure compliance with design requirements.

A significant challenge was preventing hallucinations and avoiding answers to unanswerable questions. The team addressed this through chain-of-thought prompting, instructing the LLM to first draft answers to all questions, then validate these answers against the context data before returning final responses. This multi-step approach represents a deliberate strategy to improve reliability and accuracy, though the case study doesn't provide specific metrics on how much this reduced hallucination rates compared to single-step prompting.

The pre-generation strategy, while cost-effective, inherently limits the system to anticipated questions and available data. This represents a tradeoff between coverage and reliability—the system won't handle novel or unexpected queries but can provide high-confidence answers to common questions.

## Feature 2: Easy as PIE - Personalized Agent Introductions

The second production feature addresses a different challenge in the real estate journey: establishing trust between home buyers and real estate agents. Based on Zillow's research, 90% of successful buyers hire an agent, and factors like agent expertise in specific areas (46% of shoppers), personal connection (37%), and past deal-making experience (32%) significantly influence agent selection. The feature won the "Best of AI" award at Zillow Hackweek 2024, indicating internal recognition of its innovation.

### Data-Driven Personalization

The feature computes several key attributes to demonstrate agent suitability, including ability to work within the buyer's price range, knowledge of specific areas or neighborhoods, experience with particular listings or buildings, expertise with property types, and total years of experience. These attributes are computed based on three data sources: the agent's deal history from their StreetEasy profile, the user's home preferences inferred from search activity, and data about the specific property being browsed.

This approach exemplifies how LLM applications in production often combine traditional data processing and computation with generative capabilities. The structured attributes are calculated through deterministic methods, while the LLM is specifically employed for the bio summarization task where its generative strengths are most valuable.

### Summarization with Constraints

Unlike the Instant Answers feature, the summarization task had different requirements: creating short, concise bio summaries that fit within carousel card designs while remaining informative and unique to each agent. The longer biographical profiles written by agents themselves served as source material.

The team collaborated with UX Content Strategy partners to identify specific requirements and draft instructions for effective messages. When testing different prompting techniques, they used a combination of LLM-based evaluation to score requirement compliance and human-in-the-loop review to rate informativeness and creativity. This dual evaluation approach acknowledges that automated metrics alone cannot capture all aspects of quality, particularly subjective elements like creativity and engagement.

Based on these evaluations, the team adopted a "chain of prompts" approach, iterating through drafting and revision tasks before producing finalized summaries. This multi-stage process mirrors the chain-of-thought approach used in Instant Answers but focuses on iterative refinement rather than validation.

The case study mentions future potential for further personalization by incorporating user preferences to highlight relevant agent skills, featuring personal interests, and tailoring tone to match communication styles. This acknowledgment of future directions suggests the current implementation, while functional, represents an initial version with room for enhancement.

## LLMOps Lessons and Practices

### Data Quality and Trust

The team emphasizes that LLM application performance depends fundamentally on the accuracy and relevance of provided information. Their strategy involved understanding data strengths and gaps, then designing solutions that leveraged their comprehensive listing and property data. This reflects a mature approach to LLM deployment: playing to organizational data strengths rather than attempting to compensate for data weaknesses through model capabilities.

The iterative refinement of prompting techniques and rigorous testing to ensure reliable, contextually relevant responses represents core LLMOps practice. However, the case study lacks specific details about testing frameworks, evaluation datasets, or performance benchmarks that would provide deeper insights into their quality assurance processes.

### Ethical Considerations and Bias Mitigation

Given the real estate industry's history with fair housing issues and discrimination, ethical considerations receive appropriate attention. The team acknowledges that LLMs trained on vast datasets can perpetuate and amplify existing societal biases, leading to unfair or discriminatory outcomes. StreetEasy collaborates closely with Zillow's Ethical AI team to ensure practices are aligned and peer-reviewed by legal and broader AI teams.

Specifically, they leverage Fair Housing guardrails and create clear instructions and examples in prompts to set content boundaries and guide the LLM toward generating compliant responses. This proactive approach to bias mitigation and regulatory compliance represents responsible LLMOps practice, though the case study doesn't detail specific guardrail implementations or how they test for potential violations.

The emphasis on ethical considerations is commendable, though it's worth noting that external validation of these practices isn't provided. The reliance on internal review processes and legal team oversight suggests a governance structure, but without specific examples of bias incidents caught and corrected, or third-party audits, it's difficult to assess the effectiveness of these measures fully.

### Cross-Functional Collaboration

The team strongly emphasizes that building successful AI applications requires iterative, cross-functional processes involving Product, Engineering, Marketing, and Design (PEMD) teams. They argue that while LLM implementations are highly technical, strong design and marketing partnerships enable clear focus and build a "development flywheel" for continuous monitoring, evaluation, and refinement.

This organizational insight reflects a mature understanding that LLMOps extends beyond technical implementation to encompass user experience, business alignment, and ongoing improvement. The collective knowledge approach to building holistic user journeys represents best practice, though the case study doesn't detail specific collaboration tools, processes, or how they resolved potential conflicts between technical capabilities and user needs.

### Human Oversight and Monitoring

The team maintains that while LLMs can automate many tasks, human oversight remains vital, especially for sensitive areas like personalized communications. They use both automated evaluation and human feedback to maintain quality and prevent errors. Post-deployment, they conduct A/B tests and monitor key metrics and LLM responses to ensure continuous improvement.

This combination of automated and human evaluation represents sound LLMOps practice, though specific details about monitoring infrastructure, alert systems, or intervention protocols are absent. The mention of A/B testing suggests experimental rigor, but no results or insights from these tests are shared, making it difficult to assess the actual impact of the features or what specific improvements were identified through monitoring.

## Production Deployment Considerations

### Cost Management

The explicit goal of building a system costing "less than a few hundred dollars" while scaling to support significant traffic represents a pragmatic constraint that shaped architectural decisions. The pre-generation strategy for Instant Answers directly addresses this requirement, avoiding per-query LLM invocation costs. However, the case study doesn't detail the actual costs incurred, what infrastructure is used (cloud providers, specific models), or how costs scale with traffic increases.

For Easy as PIE, the summarization task presumably also uses pre-generation since agent bios don't change frequently, though this isn't explicitly stated. The cost-effectiveness focus suggests these are relatively lightweight applications using efficient caching strategies rather than complex, real-time generation systems.

### Scalability and Performance

While the team mentions building for StreetEasy/Zillow traffic scale, specific performance metrics are notably absent. We don't know the latency of pre-generated answer retrieval, how many unique FAQ/property combinations are cached, cache hit rates, or how they handle cache invalidation when property data changes. Similarly, for agent matching, there's no information about how many agents are in the system, how frequently bios are regenerated, or what triggers re-summarization.

The pre-generation strategy inherently provides predictable performance since no generation occurs at serving time, but it limits flexibility and freshness. The tradeoffs between real-time generation and pre-computation represent a fundamental LLMOps decision that the team navigated pragmatically based on their constraints.

### Model Selection and Evaluation Frameworks

Interestingly, the case study never explicitly mentions which LLM(s) are used for these features. This omission may be intentional (avoiding vendor lock-in perception or competitive disclosure) but makes it difficult to assess whether model selection was a significant consideration or challenge. The references to chain-of-thought prompting and multi-stage generation suggest they're using reasonably capable models, but whether these are proprietary (OpenAI, Anthropic) or open-source models isn't disclosed.

The evaluation frameworks mentioned (Faithfulness, Response Relevancy from RAGAS) are established practices in LLM evaluation, but the case study doesn't provide specific scores, thresholds, or how these metrics translated to deployment decisions. The combination of LLM-based and non-LLM-based metrics represents sound practice, acknowledging that automated LLM evaluation itself can be unreliable.

## Strategic Implications and Organizational Change

The conclusion of the case study addresses broader organizational implications of AI adoption, revealing strategic thinking about how LLM capabilities affect software development practices and team skills. The leadership acknowledges both excitement about opportunities (scaling personalized experiences, autonomous task handling) and apprehension about challenges (resource investment decisions, potential skill obsolescence, maintaining innovation leadership).

Two strategic focus areas emerge: cultivating AI expertise through talent acquisition and training, and enabling data-driven development through data literacy, robust datasets, and analytical tools. The recommendation that teams should ask "how can we build it with AI?" whenever developing new features suggests a significant cultural shift toward AI-first thinking.

This organizational perspective provides valuable context for understanding the LLMOps challenges that extend beyond technical implementation. The acknowledgment of uncertainty and the need for "strategic adaptation" reflects honest assessment of the transformative nature of LLM technology, though specific programs, training initiatives, or organizational restructuring aren't detailed.

## Critical Assessment

While this case study provides valuable insights into production LLM deployment at a major tech company, several limitations affect our ability to fully assess the implementation:

**Limited Quantitative Results**: The case study lacks specific metrics on user adoption, satisfaction improvements, business impact (conversion rates, engagement metrics), or technical performance (latency, cost per query, accuracy rates). This makes it difficult to evaluate the actual success of these features beyond the qualitative assertion that they enhance user experience.

**Incomplete Technical Details**: Key infrastructure decisions, model selection, deployment architecture, monitoring systems, and failure handling mechanisms aren't described in detail. While the high-level approach is clear, practitioners seeking to replicate these implementations would need substantially more information.

**Self-Reported Success**: As a company blog post, the narrative naturally emphasizes positive outcomes and learnings rather than failures, challenges, or ongoing problems. The absence of any significant obstacles overcome or features that didn't work suggests a selective presentation.

**Limited Scope**: Both features represent relatively constrained applications of LLMs—pre-generated FAQs and bio summarization—rather than more complex use cases like conversational agents or complex reasoning systems. While these constrained applications may be appropriate for the use cases, they represent conservative, low-risk deployments rather than pushing the boundaries of LLM capabilities.

That said, the case study demonstrates several LLMOps best practices: cost-conscious architecture decisions, emphasis on data quality and grounding, proactive bias mitigation, multi-stage prompting for reliability, combination of automated and human evaluation, and cross-functional collaboration. The honest acknowledgment of challenges around hallucination prevention and the need for human oversight reflects mature understanding of LLM limitations.

The strategic focus on leveraging existing data strengths (comprehensive property data) rather than attempting to compensate for weaknesses represents sound engineering judgment. Similarly, the decision to pre-generate answers rather than pursue real-time generation reflects appropriate prioritization of reliability and cost-effectiveness over flexibility for these specific use cases.

Overall, this case study illustrates pragmatic, production-focused LLM deployment in a domain with significant regulatory and ethical considerations. While the limited quantitative detail constrains our ability to assess impact fully, the technical approaches and organizational learnings provide valuable insights for teams navigating similar LLMOps challenges.