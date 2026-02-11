---
title: "Scaling LLM Applications in Telecommunications: Learnings from Verizon and Industry Partners"
slug: "scaling-llm-applications-in-telecommunications-learnings-from-verizon-and-industry-partners"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f405d7d54a83699d6e1c3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:45:34.651Z"
  createdOn: "2024-11-21T14:14:53.503Z"
llmopsTags:
  - "anthropic"
  - "chunking"
  - "code-generation"
  - "compliance"
  - "databases"
  - "document-processing"
  - "documentation"
  - "elasticsearch"
  - "embeddings"
  - "legacy-system-integration"
  - "monitoring"
  - "poc"
  - "prompt-engineering"
  - "rag"
  - "regulatory-compliance"
  - "reliability"
  - "reranking"
  - "scalability"
  - "security"
  - "semantic-search"
industryTags: "telecommunications"
company: "Various"
summary: "A panel discussion featuring Verizon, Anthropic, and Infosys executives sharing their experiences implementing LLM applications in telecommunications. The discussion covers multiple use cases including content generation, software development lifecycle enhancement, and customer service automation. Key challenges discussed include accuracy requirements, ROI justification, user adoption, and the need for proper evaluation frameworks when moving from proof of concept to production."
link: "https://www.youtube.com/watch?v=eDT-ZYO66Cg"
year: 2023
seo:
  title: "Various: Scaling LLM Applications in Telecommunications: Learnings from Verizon and Industry Partners - ZenML LLMOps Database"
  description: "A panel discussion featuring Verizon, Anthropic, and Infosys executives sharing their experiences implementing LLM applications in telecommunications. The discussion covers multiple use cases including content generation, software development lifecycle enhancement, and customer service automation. Key challenges discussed include accuracy requirements, ROI justification, user adoption, and the need for proper evaluation frameworks when moving from proof of concept to production."
  canonical: "https://www.zenml.io/llmops-database/scaling-llm-applications-in-telecommunications-learnings-from-verizon-and-industry-partners"
  ogTitle: "Various: Scaling LLM Applications in Telecommunications: Learnings from Verizon and Industry Partners - ZenML LLMOps Database"
  ogDescription: "A panel discussion featuring Verizon, Anthropic, and Infosys executives sharing their experiences implementing LLM applications in telecommunications. The discussion covers multiple use cases including content generation, software development lifecycle enhancement, and customer service automation. Key challenges discussed include accuracy requirements, ROI justification, user adoption, and the need for proper evaluation frameworks when moving from proof of concept to production."
---

## Overview

This case study is derived from a panel discussion at an industry event focused on moving generative AI implementations from proof of concept (POC) to production in the telecommunications sector. The panel featured three distinct perspectives: Sumit from Verizon representing the end-user and network systems operator with 24 years of experience, Julian Williams from Anthropic representing the foundation model provider, and a representative from Infosys bringing 30 years of experience as a technology integrator helping customers scale AI implementations.

The discussion provides valuable insights into the real-world challenges of deploying LLMs in production environments within large telecommunications organizations, with particular emphasis on governance, ROI justification, accuracy requirements, and the organizational changes needed to successfully operationalize generative AI.

## Use Cases in Production at Verizon

Verizon's network systems team has identified and is actively deploying three primary use cases for generative AI:

**Content Generation and Knowledge Management**: The first production use case involves processing vendor documentation and lease agreements. Verizon manages over 40,000 landlords with complex lease arrangements, some still requiring paper documentation for regulatory compliance. Previously, they used traditional OCR and pattern matching to extract information from these documents. With LLMs, they can now extract comprehensive information and drive automation from it. The shift from semantic matching and traditional OCR to LLM-based understanding has dramatically improved their ability to process these documents at scale—enabling them to process all landlords simultaneously rather than gradually over multiple years.

**Software Development Lifecycle Enhancement**: Beyond simple code generation tools like Copilot or Codium, Verizon has implemented a comprehensive approach that extends "all the way to the left" in the development process. Their requirements are now effectively prompts, and they've built a knowledge graph that takes requirements and automatically breaks them down into features and user stories. While human oversight remains for certifications and review, this represents a significant shift in how software specifications are generated and managed.

**Co-pilot for Productivity Enhancement**: Verizon is deploying various co-pilot implementations focused on reducing cognitive overload for employees rather than replacing them. The challenge acknowledged is overcoming employee resistance—the fear of job displacement—which requires careful framing of these tools as productivity enhancers rather than replacements.

## ROI Framework and Business Case Justification

The Infosys representative provided a detailed framework for evaluating AI investments that serves as a practical guide for organizations considering generative AI deployments. The key calculation presented was:

A typical AI product requires 5-6 months to build with dedicated team pods, plus hardware infrastructure, compute GPUs, and software—totaling approximately $6 million in development costs. To justify this capital expenditure, organizations need to demonstrate a 3-4x rate of return over 3 years, meaning approximately $20 million in savings through productivity and efficiency gains. Assuming AI can deliver about 50% impact in a problem area, this means organizations need to identify problem areas costing approximately $40-50 million to justify the investment.

This "Goldilocks Zone" concept—finding problems large enough to justify AI investment but not so complex they're infeasible—was presented as critical for avoiding the trap of applying AI everywhere without sufficient returns. The approach uses a desirability-feasibility-viability lens, acknowledging that while AI can theoretically be applied to any area, not all applications will generate sufficient business value.

## Governance and Architecture Decisions

Verizon has implemented several key architectural and organizational patterns for their generative AI deployments:

**Center of Excellence with Tollgate Approach**: Before any use case moves to implementation, it passes through a formal review process that evaluates ROI, technical feasibility, and appropriate technology choices (whether the use case needs prompt engineering, RAG, knowledge graphs, etc.). This centralized governance ensures consistent decision-making while still allowing distributed development teams to own their implementations.

**Model-Agnostic Wrapper Architecture**: To avoid vendor lock-in and maintain flexibility as the foundation model landscape evolves rapidly, Verizon has implemented a wrapper layer on top of all foundation models. Individual implementations call this wrapper rather than specific models directly, allowing the organization to switch between models, route between on-premises and cloud deployments, and adapt to new model releases without changing downstream applications. This architecture was highlighted as particularly important given the pace of change in foundation models.

## Evaluation and Accuracy Requirements

A recurring theme throughout the discussion was the critical importance of accuracy in production deployments. The AT&T keynote referenced in the discussion established that 50% accuracy is a failure—organizations should target 95%+ accuracy for production systems.

Julian from Anthropic emphasized the need for robust evaluation frameworks that include:

- Clear accuracy benchmarks and criteria for production readiness
- Latency requirements
- ROI modeling
- Red teaming tests, especially for external-facing applications
- Jailbreak resistance evaluation

The rapid pace of model improvement creates additional evaluation challenges. Anthropic released Opus in March (presumably 2024), which was the smartest model at the time. Three months later, they released Claude 3.5 Sonnet, which was smarter, twice as fast, and one-fifth the cost. This velocity means organizations cannot afford lengthy evaluation processes that lock them into older models when newer, more capable options become available.

To address this, the panel discussed the shift from relying solely on subject matter experts providing 1-5 scale ratings to automated evaluations where more capable models (like Claude 3.5 Sonnet) evaluate the outputs of smaller, faster models (like Haiku). This model-based evaluation approach enables faster iteration and model switching.

## RAG and Retrieval Improvements

Julian discussed Anthropic's recent paper on contextual retrieval as an important advancement for improving accuracy in RAG implementations. Traditional RAG approaches break documents into chunks and encode them into embedding models, but this process can destroy important context from the original documents, degrading retrieval accuracy.

Contextual retrieval addresses this by having a smaller model (like Haiku) write a description of what each chunk contains before prepending it and creating the embedding. Combined with ranking techniques that select the best examples, this approach can significantly improve retrieval success rates.

The discussion also noted the rapid expansion of context windows—from sub-50k tokens to 100k, then 200k, with 500k being discussed for Claude for Enterprise. Larger context windows combined with improved retrieval techniques are expected to make natural language queries against backend data increasingly effective.

## User Adoption Challenges

The Infosys representative shared a candid example of implementing a "Proposal GPT" internally to help salespeople respond to RFPs/RFQs. The tool was intended to leverage previous proposal responses to automate new RFQ responses, potentially saving effort equivalent to 250 people out of 500-600 who work on proposals.

The implementation revealed several practical challenges:

**Data Quality and Currency**: Previous proposals go out of date after about a year as factual information changes, requiring ongoing maintenance of the corpus.

**Accuracy Plateau**: The system reached 40-50% accuracy relatively quickly but then plateaued, struggling to improve beyond that level.

**User Adoption Dynamics**: The most surprising challenge was user adoption. Despite the assumption that people would eagerly adopt a tool that writes proposals for them, users who encountered incorrect outputs in their first interaction wouldn't return to the tool for 40-50 days. This meant driving adoption at 40-50% accuracy was essentially impossible—the system needed near-100% accuracy on first use to build trust.

**Business Value Realization**: Even with successful implementation, the projected savings didn't materialize as expected. Despite theoretically saving 250 person-equivalents of effort, the need for human-in-the-loop verification meant the actual headcount savings were much lower. The realized value was more about redeploying time to higher-value activities (like crafting better competitive responses) rather than direct cost reduction.

## Industry Collaboration Opportunities

The panel discussed potential industry collaboration opportunities, particularly around network troubleshooting use cases where operators don't directly compete. A Telco Alliance was mentioned as already operating in Asia and Europe, with Sky, Salad, Doha Telecom, and Singtel joining together to share information and build common models for network operations and troubleshooting.

The discussion suggested that catalyst programs or similar industry initiatives could be valuable for addressing common problems with shared technologies, particularly in areas that don't involve direct competition.

## Future Directions: Domain-Specific Models

A key question raised during Q&A concerned whether current foundation models are too generic for telecommunications use cases. The discussion acknowledged that for network troubleshooting and other domain-specific applications, organizations will likely need to create their own knowledge graphs specific to telecom (understanding how cell sites are constructed with radios, antennas, backhaul, and core network components) and may need to develop Small Language Models (SLMs) rather than relying solely on generic Large Language Models.

The panel noted that network-related use cases often involve numerical rather than textual data, requiring different approaches than typical LLM applications. Agentic frameworks and knowledge graph approaches were mentioned as potential solutions, though these remain in experimental phases.

## Key Takeaways for LLMOps Practitioners

The panel emphasized several overarching themes for practitioners moving from POC to production:

- The technology is still nascent—anyone claiming to have fully figured out how to scale is likely not being fully transparent about their journey
- Best practices are still evolving, and practitioners must become deeply expert in techniques like RAG, knowledge graphs, and agentic frameworks
- Center of excellence models with distributed ownership appear to be effective governance patterns
- Model-agnostic architectures are essential given the rapid pace of foundation model improvement
- Accuracy requirements are demanding—50% is a failure, 95%+ is the target
- User adoption may be the harder challenge than technical implementation
- ROI calculations must account for the reality that human-in-the-loop requirements often limit achievable cost savings