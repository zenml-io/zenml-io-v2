---
title: "AI Agents at Scale for Passenger Services and Conversational Intelligence"
slug: "ai-agents-at-scale-for-passenger-services-and-conversational-intelligence"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "document-processing"
  - "data-analysis"
  - "structured-output"
  - "multi-modality"
  - "unstructured-data"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "question-answering"
  - "multi-agent-systems"
  - "agent-based"
  - "cost-optimization"
  - "latency-optimization"
  - "prompt-engineering"
  - "semantic-search"
  - "token-optimization"
  - "langchain"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "cicd"
  - "documentation"
  - "google-gcp"
industryTags: "other"
company: "LATAM Airlines"
summary: "LATAM Airlines, the largest airline in Latin America transporting 87 million passengers annually, built production AI agents to handle customer interactions at massive scale while operating under extremely tight 3-5% profit margins. The company developed Concierge, a B2C conversational agent deployed in their mobile app that helps passengers plan trips, find flights, hotels, and experiences, handling thousands of daily interactions. Through extensive observability and analysis using LangSmith, they optimized their multi-agent architecture to reduce costs by 15% and reduced out-of-scope messages from 13% to near zero by adding specialized agents. They also built Compass, a proprietary system that processes unstructured conversational data at scale and transforms it into structured knowledge graphs, enabling the company to extract actionable intelligence across all agent interactions and turning conversations into a strategic data asset."
link: "https://www.youtube.com/watch?v=RnLCl3ilRgo"
year: 2026
seo:
  title: "LATAM Airlines: AI Agents at Scale for Passenger Services and Conversational Intelligence - ZenML LLMOps Database"
  description: "LATAM Airlines, the largest airline in Latin America transporting 87 million passengers annually, built production AI agents to handle customer interactions at massive scale while operating under extremely tight 3-5% profit margins. The company developed Concierge, a B2C conversational agent deployed in their mobile app that helps passengers plan trips, find flights, hotels, and experiences, handling thousands of daily interactions. Through extensive observability and analysis using LangSmith, they optimized their multi-agent architecture to reduce costs by 15% and reduced out-of-scope messages from 13% to near zero by adding specialized agents. They also built Compass, a proprietary system that processes unstructured conversational data at scale and transforms it into structured knowledge graphs, enabling the company to extract actionable intelligence across all agent interactions and turning conversations into a strategic data asset."
  canonical: "https://www.zenml.io/llmops-database/ai-agents-at-scale-for-passenger-services-and-conversational-intelligence"
  ogTitle: "LATAM Airlines: AI Agents at Scale for Passenger Services and Conversational Intelligence - ZenML LLMOps Database"
  ogDescription: "LATAM Airlines, the largest airline in Latin America transporting 87 million passengers annually, built production AI agents to handle customer interactions at massive scale while operating under extremely tight 3-5% profit margins. The company developed Concierge, a B2C conversational agent deployed in their mobile app that helps passengers plan trips, find flights, hotels, and experiences, handling thousands of daily interactions. Through extensive observability and analysis using LangSmith, they optimized their multi-agent architecture to reduce costs by 15% and reduced out-of-scope messages from 13% to near zero by adding specialized agents. They also built Compass, a proprietary system that processes unstructured conversational data at scale and transforms it into structured knowledge graphs, enabling the company to extract actionable intelligence across all agent interactions and turning conversations into a strategic data asset."
notion:
  pageId: "397f8dff-2538-80b8-8b10-d61814cdaf5a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T19:53:00.000Z"
  lastEditedTime: "2026-07-08T20:15:00.000Z"
  publishedAt: "2026-07-08T20:18:56Z"
---

## Overview

LATAM Airlines presents a compelling case study of operating generative AI agents at massive scale within an industry facing severe economic constraints. As Latin America's largest airline, LATAM transported over 87 million passengers in the previous year while operating under razor-thin profit margins of 3-5%, compared to the 20% margins typical of SaaS companies. This economic reality is further strained by jet fuel costs, which represent 31% of operating expenses and doubled year-over-year, reaching $184 per barrel. In this environment, every customer interaction represents either value created or value lost, making operational efficiency critical.

The presentation covers two main technical achievements: the deployment of LATAM Concierge, a production conversational agent serving thousands of users daily, and Compass, a system for extracting structured intelligence from unstructured conversational data at scale. The case study emphasizes that while building AI has become cheaper, operating it at scale in a highly regulated industry with real consequences requires sophisticated infrastructure and continuous optimization.

## Platform Foundation: Cosmos

Before deploying agents at scale, LATAM built Cosmos, their proprietary AI and data platform that has been in development for over five years. Cosmos provides the foundational infrastructure necessary for production AI systems, including CI/CD pipelines, access to model templates, observability, monitoring, and other essential components. This platform approach allows teams to focus on solving actual business problems rather than rebuilding foundations for each new project.

Currently, Cosmos hosts approximately 120 generative AI products in production across 20 different business domains at LATAM. This represents a significant investment in AI infrastructure that enables rapid deployment and iteration of AI-powered solutions while maintaining consistency and reliability across the organization.

## LATAM Concierge: Multi-Agent Architecture

LATAM Concierge is a B2C conversational agent embedded in the LATAM mobile application that helps passengers plan their trips. Users can find flights, search for hotels, and discover experiences at their destinations simply by conversing with the agent. The deployment made LATAM the first airline in Latin America to launch such a system at this scale, with 52,000 users in the first month of beta launch alone. The system currently handles approximately 4,000 daily active users and generates thousands of conversations daily.

The architecture is built on LangGraph and implements a super agent pattern, also referred to as a supervisor pattern. Rather than a single monolithic agent, the system uses a supervisor that maintains control at all times and delegates tasks to specialized agents. These specialists include agents for flights, booking, destinations, activities, insurance, and customer care. Each specialist handles its specific domain and returns results to the supervisor, which synthesizes everything into the final response to the user.

The presentation emphasizes that the current architecture is not how the system started. The design has evolved significantly based on operational learnings, made possible by implementing LangSmith as the observability layer from day one. This observability proved critical for understanding system behavior and identifying optimization opportunities.

## Architectural Evolution and Optimization

The initial architecture used a triage agent that classified user queries and handed off control directly to the appropriate specialist agent. Each specialist was responsible for generating the final structured response. While this approach worked well functionally, analysis through LangSmith revealed a significant inefficiency: the system was structuring data at every step of the conversation flow.

When measured, this redundant structuring created roughly 15% overhead in both latency and token consumption. To address this, the team redesigned the architecture to use a tool-per-agent pattern with a supervisor that maintains control throughout the interaction. In this revised design, only the supervisor is responsible for formatting the final response. This change maintained the same output quality while reducing costs by 15%, a significant achievement given the company's tight margin constraints.

This optimization exemplifies a critical LLMOps principle: production systems require continuous monitoring and refinement based on actual usage patterns. The 15% cost reduction may seem modest in isolation, but at LATAM's scale with thousands of daily interactions and millions of annual passengers, this translates to substantial savings in an industry where every dollar competes with jet fuel costs.

## Learning from Out-of-Scope Interactions

Another significant insight came from analyzing conversations classified as out-of-context. Initially, 13% of messages to Concierge fell into this category. The team's first assumption was that users were testing the system, going off-topic, or attempting to bypass guardrails with questions like asking the agent to solve Python problems. However, 13% represented a substantial portion of interactions that deserved deeper investigation.

Using LangSmith to dig into these conversations, the team discovered that 95% of the out-of-scope questions were actually legitimate passenger needs. Users were asking about check-in procedures, baggage policies, LATAM Pass loyalty program benefits, and special services. These were genuine use cases that passengers needed help with, not attempts to break the system.

The issue wasn't model failure or architectural problems; rather, Concierge had simply never been built to handle these domains. This led to the integration of a customer care agent as a new specialist. The results were dramatic: out-of-scope messages dropped from 13%, the return rate improved by 6.6 percentage points, and 12% of conversations now flow through the customer care agent.

This finding highlights a common challenge in LLMOps: understanding the gap between designed functionality and actual user needs. Without proper observability and analysis of production conversations, the team would have either missed this opportunity or incorrectly attributed the problem to model or architectural issues. The case demonstrates that deeply understanding what flows through your application is essential for identifying and solving the right problems.

## Conversational Intelligence: The Compass System

While LangSmith enabled understanding individual agent conversations, LATAM recognized that true value lay in extracting insights across all conversational interactions throughout the organization. This led to the development of Compass, a system designed to transform unstructured conversational data into structured signals at scale.

The core insight driving Compass is that conversations are inherently valuable but only if structured information can be extracted from them at scale. When a passenger asks Concierge about Italian restaurants near their hotel, they're not just seeking an answer but revealing preferences, needs, and intentions. These signals, aggregated across millions of interactions, represent a significant strategic asset.

Compass processes various types of unstructured data including UX research interviews, contact center call transcriptions, agent conversations, and legal documents. The system transforms this diverse input into a structured knowledge graph stored in BigQuery Graph, using ontologies to guide the extraction process.

## Compass Technical Architecture

The Compass pipeline consists of several key components working together. First, the parser transforms data from any input format into a multimodal representation that can be processed by LLMs. The mapper then uses Gemini Flash by default, or Gemini Pro for more complex ontologies, to identify concepts and relationships based on the defined ontology. The modeler deposits all structured information into the knowledge graph in BigQuery Graph. Additionally, the system includes an ontology registry and evaluator, recognizing that measuring semantic extraction quality is non-trivial.

The ontology-based approach is central to Compass's effectiveness. An ontology defines the specific concepts and relationships that help the LLM parse data appropriately for each use case. For example, UX research interviews use an ontology with concepts like pain points, feature requests, and user segments, while legal contracts use party, clause, obligation, and expiration. The same pipeline and infrastructure support different use cases simply by applying different ontologies.

## Compass in Production: Real-World Impact

The UX research team provides a compelling validation of Compass's value. They had been manually processing UX research interviews using ChatGPT prompting and organizing results in Google Sheets, a process that took weeks. When they applied Compass to thousands of interviews, the work collapsed from weeks to days while achieving nearly 98% coverage with their ontology. This represents a dramatic improvement in both speed and completeness.

Even more striking is the legal contracts example. A team that had already parsed their legal documents using their existing process and validated results with business stakeholders used Compass for comparison. Compass actually performed better than their existing validated process. Investigation revealed that Compass's ontology-based approach identified issues with how the business had defined certain concepts, demonstrating that the system can not only automate but improve upon human processes.

## Technical Challenges and Infrastructure Decisions

The primary bottleneck for Compass is access to LLM APIs. The team is working with Google to explore whether allocating dedicated AI infrastructure specifically for this processing pipeline could improve performance and throughput. This reflects a common challenge in production LLMOps: balancing cost, latency, and throughput when processing large volumes of data through LLMs.

An interesting architectural decision involved the choice of graph database. The team initially started with Spanner, which is technically excellent and fast. However, the reality of LATAM's data ecosystem is that thousands of people across the company make queries daily in Google BigQuery. When BigQuery launched BigQuery Graph, the team migrated to that platform for practical reasons: it's where their users already work and where they have existing expertise and workflows. This decision exemplifies the LLMOps principle that technical excellence must be balanced against organizational realities and adoption patterns.

## The Flywheel: Closing the Loop

LATAM's vision extends beyond deploying individual systems to creating a flywheel of continuous improvement. Agents generate millions of interactions with passengers. LangSmith reveals what works and what doesn't within each agent. Compass processes this information across all agents to generate structured signals. These signals feed into analytical capabilities where over 100 data scientists can extract insights and intelligence. These insights then improve the agents, completing the cycle.

Currently, this flywheel operates primarily in the pre-trip and travel day phases of the passenger journey. LATAM's vision is to extend this across post-trip experiences and future trip planning, creating a comprehensive understanding of passenger needs and behaviors throughout the entire customer lifecycle. The knowledge graphs from different agents, such as Concierge and contact center agents, can be combined to create increasingly sophisticated representations of passenger journeys and preferences.

## Key Lessons and Industry Implications

The presentation concludes with three significant takeaways that extend beyond LATAM's specific implementation. First, while AI has become cheap to build, operating it at scale in highly regulated industries where mistakes have real consequences is where the real value and challenge lies. The cost of building a prototype is minimal, but the cost and complexity of operating production systems reliably at scale remains substantial.

Second, the next analytical bottleneck is not compute capacity but rather access to and processing of unstructured data. LATAM can handle the computational requirements, but extracting value from conversational data at scale requires sophisticated pipelines like Compass. This represents a shift from traditional data challenges focused on structured data warehouses to new challenges around making sense of natural language interactions.

Third, constraints are not disadvantages but drivers of innovation. LATAM's tight margins and operational pressures forced them to build systems that are remarkably efficient, processing documents for approximately one cent each. These constraints drove architectural optimizations like the 15% cost reduction in Concierge and the automation achieved through Compass.

The final insight is perhaps the most strategic: when you have millions of interactions with customers, the chatbot or agent itself is not the product anymore. The product is the intelligence and opportunities that emerge from analyzing all those interactions collectively. This reframing positions conversational AI not as a cost center for customer service but as a strategic data platform generating unique insights impossible to obtain through traditional means.

## Critical Assessment and Balanced Perspective

While the case study presents impressive achievements, several aspects warrant careful consideration. The presentation is clearly promotional in nature, being delivered at what appears to be a conference or industry event. Claims about being "the first airline in Latin America" to deploy at this scale and the specific performance improvements should be understood in this context.

The 15% cost reduction from architectural optimization is well-documented with specific technical details about what changed and why, making it credible. However, the presentation doesn't discuss challenges encountered during this optimization or whether there were tradeoffs in other dimensions like complexity or maintainability.

The claim that Compass performed better than a validated human process on legal contracts is striking but lacks detail about what "better" means specifically. Did it find more entities, identify relationships humans missed, or something else? The explanation that ontologies helped identify issues with business definitions is interesting but remains somewhat vague about the specific improvements.

The bottleneck of LLM API access for Compass is honestly acknowledged, which adds credibility. The fact that they're exploring dedicated infrastructure suggests this is a real constraint rather than a solved problem. Similarly, the pragmatic decision to move from Spanner to BigQuery Graph based on organizational reality rather than pure technical merit demonstrates thoughtful engineering tradeoffs.

The 52,000 users in the first month of beta and 4,000 daily active users for Concierge provide concrete scale metrics. However, the presentation doesn't discuss adoption rates, user satisfaction, containment rates, or comparison with previous non-AI solutions, which would provide important context for evaluating success.

The emphasis on LangSmith for observability is notable and specific enough to be credible, with concrete examples of insights gained. However, the presentation doesn't discuss limitations of their observability approach or challenges in implementing it at scale. The integration with LangGraph is also heavily featured, suggesting possible vendor relationships, though the technical details provided about the supervisor pattern are substantive.

Overall, LATAM Airlines presents a legitimate case study of operating generative AI at significant scale with real production challenges and measurable optimizations. The economic constraints they operate under are real and well-documented characteristics of the airline industry. While some claims should be understood as promotional, the technical details about architecture, optimization processes, and the challenges of extracting value from conversational data at scale provide valuable insights for organizations implementing production LLM systems.
