---
title: "AI-Powered Supply Chain Root Cause Analysis and Investigation"
slug: "ai-powered-supply-chain-root-cause-analysis-and-investigation"
draft: false
llmopsTags:
  - "data-analysis"
  - "chatbot"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "error-handling"
  - "fastapi"
  - "amazon-aws"
industryTags: "automotive"
company: "Continental"
summary: "Continental, a global tire manufacturer operating 19 production sites across 16 countries, faced the challenge of investigating supply chain issues across a complex network of 90,000 items, 800 locations, and over 1 million intersections. To address questions like \"Why can't I get my tires?\", they partnered with AWS's Generative AI Innovation Center to develop a multi-agent AI system using Amazon Bedrock. The solution evolved from a single-agent to a multi-agent architecture with specialized agents for different supply chain nodes, reducing investigation time from 1 hour to 5 minutes (90% reduction) while improving accuracy and reducing manual effort. The system traverses the supply chain network, gathers data from various nodes, and performs intelligent root cause analysis using deep reasoning agents designed to avoid hallucinations."
link: "https://www.youtube.com/watch?v=gMeQsAIRUjY"
year: 2026
seo:
  title: "Continental: AI-Powered Supply Chain Root Cause Analysis and Investigation - ZenML LLMOps Database"
  description: "Continental, a global tire manufacturer operating 19 production sites across 16 countries, faced the challenge of investigating supply chain issues across a complex network of 90,000 items, 800 locations, and over 1 million intersections. To address questions like \"Why can't I get my tires?\", they partnered with AWS's Generative AI Innovation Center to develop a multi-agent AI system using Amazon Bedrock. The solution evolved from a single-agent to a multi-agent architecture with specialized agents for different supply chain nodes, reducing investigation time from 1 hour to 5 minutes (90% reduction) while improving accuracy and reducing manual effort. The system traverses the supply chain network, gathers data from various nodes, and performs intelligent root cause analysis using deep reasoning agents designed to avoid hallucinations."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-supply-chain-root-cause-analysis-and-investigation"
  ogTitle: "Continental: AI-Powered Supply Chain Root Cause Analysis and Investigation - ZenML LLMOps Database"
  ogDescription: "Continental, a global tire manufacturer operating 19 production sites across 16 countries, faced the challenge of investigating supply chain issues across a complex network of 90,000 items, 800 locations, and over 1 million intersections. To address questions like \"Why can't I get my tires?\", they partnered with AWS's Generative AI Innovation Center to develop a multi-agent AI system using Amazon Bedrock. The solution evolved from a single-agent to a multi-agent architecture with specialized agents for different supply chain nodes, reducing investigation time from 1 hour to 5 minutes (90% reduction) while improving accuracy and reducing manual effort. The system traverses the supply chain network, gathers data from various nodes, and performs intelligent root cause analysis using deep reasoning agents designed to avoid hallucinations."
notion:
  pageId: "384f8dff-2538-8022-b312-cedefde01571"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-19T11:04:00.000Z"
  lastEditedTime: "2026-06-19T11:04:00.000Z"
  publishedAt: "2026-06-19T11:07:37Z"
---

## Overview

Continental, a tire manufacturer with over 150 years of history, operates a highly complex global supply chain spanning 19 production sites in 16 countries across five regions. This case study describes their journey to transform supply chain planning using agentic AI in partnership with AWS. The core business problem was deceptively simple: answering questions like "Why can't I get my tires?" However, the scale and complexity of the operation—with 90,000 items, 800 locations, a planning horizon exceeding one year, and over 1 million network intersections—made this a computationally and organizationally challenging problem requiring significant manual effort and expertise.

Continental had already begun their digital transformation journey by migrating from on-premises infrastructure to AWS, establishing intelligent forecasting and smart target stock calculations. This data foundation proved critical for their AI initiatives, as the presenters emphasized that proper data infrastructure is essential for any agentic AI application. The partnership brought together Continental's deep supply chain domain expertise and data foundation with AWS's Generative AI Innovation Center, which provided AI scientists, engineers, and access to foundational services including Amazon Bedrock, Amazon Bedrock Agent Core, and AWS's agents SDK.

## Technical Architecture Evolution

The solution underwent a significant architectural evolution from an initial single-agent design to a more sophisticated multi-agent system. Understanding this progression provides important insights into the practical considerations of deploying agentic AI in production environments.

### Version 1: Single Agent Architecture

The initial implementation featured a single supply chain agent that operated in three distinct phases. First, the investigation phase began when a user posed a question, with the analysis starting at the point of customer demand, typically a regional distribution center. Second, the expansion phase involved traversing upstream through the supply chain network, moving from the regional distribution center to various affected nodes and gathering supply chain information at each point. The agent had access to a limited set of tools to query and retrieve data from different nodes. Third, the contraction phase aggregated all collected information and performed root cause analysis.

While this initial version provided a solid proof of concept, the team identified several critical limitations. The agent's access to only a limited set of tools meant it could retrieve only a subset of available information at each node, potentially missing important signals. Scalability concerns emerged around how the system would handle the addition of 20-30 new tools over time, with risks of the agent becoming overwhelmed or losing context. Additionally, the contraction phase was fairly deterministic and hard-coded, following predefined logic paths rather than exercising intelligent reasoning about trade-offs and evidence.

### Version 2: Multi-Agent Architecture

The final production-oriented version addressed these limitations through a fundamental architectural shift to a multi-agent system. This design introduced an orchestration agent responsible for delegating work to specialized agents, each focused on specific nodes or aspects of the supply chain network. This approach provided inherent scalability—new specialized agents could be added independently, and existing agents could be enhanced with additional tools without overwhelming any single agent or risking context loss.

The core workflow maintained similarity to the initial version, starting with investigation at the point of demand and traversing the supply chain network. However, the multi-agent architecture enabled access to a much larger set of tools and data sources, significantly expanding the breadth of use cases and scenarios the system could handle. The contraction phase received particular attention, being redesigned around a deep reasoning agent that could weigh different pieces of evidence, consider various trade-offs, and generate conclusive root cause analyses rather than following deterministic logic.

## LLMOps Considerations and Production Deployment

Several aspects of this case study illuminate important LLMOps practices and considerations for production deployment of agentic AI systems.

### Hallucination Prevention

A critical focus area was preventing agent hallucinations, reflecting a mature understanding that agent reliability matters more than coverage in production systems. The team explicitly designed their system with the principle that agents should provide no answer rather than an incorrect answer. This design philosophy, while potentially limiting system responsiveness in some cases, prioritizes trust and reliability—essential characteristics for supply chain planning systems where incorrect decisions can have significant operational and financial consequences.

### Explainability and User Acceptance

The solution emphasized explainability through multiple mechanisms. First, outputs were presented in non-technical, business-appropriate language, making complex supply chain outcomes accessible to business analysts and planners without deep technical expertise. Second, the system generated supply chain graphs visualizing the nodes traversed during investigation, providing transparency into the agent's reasoning process and helping users validate that the analysis made logical sense. This focus on explainability reflects an understanding that user acceptance depends not just on getting correct answers but on building trust through transparency.

### Integration Strategy

The current implementation exposes functionality through a chatbot interface, representing a pragmatic initial deployment strategy. However, the presenters explicitly noted they are exploring various integration approaches to embed the capability into Continental's existing planning landscape. This staged integration approach—starting with a standalone interface before deeper system integration—represents a common and prudent pattern for production AI deployments, allowing teams to validate functionality and gather user feedback before committing to deeper architectural integration.

### Hybrid Approach: Deterministic + AI

A particularly noteworthy design decision was the hybrid approach combining deterministic graph traversal with AI-powered reasoning. The system uses classic deterministic methods to traverse the supply chain graph systematically, ensuring comprehensive data collection, while applying agent reasoning capabilities to interpret the gathered information and generate insights. This architecture leverages the strengths of both approaches: deterministic methods provide reliability and completeness in data gathering, while AI agents bring flexibility and sophisticated reasoning to interpretation and root cause analysis. This hybrid pattern offers an interesting model for other domains where structured processes can be enhanced with AI reasoning without abandoning the reliability of proven methods.

## Performance and Business Impact

The quantified results provide concrete evidence of the system's value, though these should be interpreted with appropriate context. The team reported up to 90% reduction in investigation time for specific use cases, with one example showing investigation time dropping from 1 hour to 5 minutes. These metrics represent significant operational improvements, particularly when multiplied across the numerous investigations supply chain planners conduct. The combination of faster investigation, higher accuracy, and reduced manual effort enables deeper planning insights and better understanding of planning results for business colleagues.

However, it's worth noting that these results represent pilot phase performance for specific use cases. The presenters acknowledged that even their second version does not yet have the full functional scope required for full productive integration. This transparency about the solution's current limitations and the work remaining for production deployment represents a realistic and honest assessment.

## Technology Stack and AWS Services

The solution builds on Amazon Bedrock as the foundational service for accessing large language models, with Amazon Bedrock Agent Core providing agent orchestration capabilities. The AWS agents SDK enables rapid development and deployment of AI agents. This represents a fairly standard AWS-native approach to agentic AI, leveraging managed services to reduce operational complexity. The choice to build on AWS's managed AI services aligns with Continental's earlier infrastructure modernization journey, which established AWS as their cloud platform of choice.

## Lessons Learned and Future Directions

The presenters shared several valuable lessons from their experience. They confirmed that agentic AI can effectively make complex supply chain outcomes explainable in business-appropriate language, validating one of their core hypotheses. The ability to move quickly from concept to working solution with the right partner underscored the value of their collaboration model. From a technical perspective, the finding that traversing supply chain graphs deterministically while enhancing with agent reasoning capabilities works well provides a reusable pattern for similar applications.

Looking forward, Continental's next steps involve extending the agent functional scope to achieve the full capabilities needed for productive integration into planning processes. This honest acknowledgment that the current solution, while impressive, requires further development before full production deployment reflects mature expectations about AI development timelines and the iterative nature of building production-ready AI systems.

## Critical Assessment

While this case study demonstrates genuine technical achievement and business value, several aspects warrant balanced consideration. The results presented come from a pilot phase with specific use cases, and the presenters acknowledged the solution isn't yet ready for full production deployment. The actual breadth of supply chain scenarios the system can handle versus those requiring human intervention remains unclear. The 90% time reduction metric, while impressive, comes from specific use cases that may not be representative of all investigation types.

The presentation, being from Continental and AWS, naturally emphasizes successes. Questions that remain unaddressed include: What percentage of investigations can the system handle end-to-end versus requiring human intervention? How does the system perform on edge cases or novel scenarios not seen during development? What are the operational costs of running this multi-agent system at scale? How often do the agents provide no answer rather than potentially incorrect answers, and how do users respond to that experience?

The hybrid approach of deterministic traversal plus AI reasoning, while technically sound, suggests the AI agents may be playing a more limited role than initial impressions suggest—primarily reasoning over deterministically collected data rather than autonomously navigating the full problem space. This isn't necessarily a weakness; indeed, it may represent a more reliable approach. However, it's worth noting that this architectural choice places significant constraints on how "agentic" the system truly is in the sense of autonomous decision-making.

Despite these considerations, the case study represents a substantive example of agentic AI being deployed for real business value in a complex operational environment. The architectural evolution from single to multi-agent systems, the focus on explainability and hallucination prevention, and the hybrid deterministic-AI approach all offer valuable lessons for practitioners building similar systems. The transparency about limitations and remaining work also adds credibility to the overall narrative.
