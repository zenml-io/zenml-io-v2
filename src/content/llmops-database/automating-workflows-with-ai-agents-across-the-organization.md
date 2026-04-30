---
title: "Automating Workflows with AI Agents Across the Organization"
slug: "automating-workflows-with-ai-agents-across-the-organization"
draft: false
llmopsTags:
  - "customer-support"
  - "question-answering"
  - "chatbot"
  - "content-moderation"
  - "classification"
  - "rag"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "semantic-search"
  - "langchain"
  - "documentation"
  - "security"
  - "crewai"
industryTags: "tech"
company: "Notion"
summary: "Notion implemented Custom Agents across their organization to automate repetitive workflows and reduce manual busywork. The company faced challenges with knowledge accessibility, manual triage of product feedback, and time-consuming repetitive tasks across multiple teams. By deploying domain-specific AI agents that integrate with Slack, their knowledge bases, and project management systems, they automated question-answering, feedback routing, and various team-specific workflows. Results included faster response times for customer support, automatic task creation and routing, and widespread adoption across engineering, marketing, security, and other teams, fundamentally shifting the organizational mindset from manual execution to automation-first thinking."
link: "https://www.notion.com/blog/how-notion-uses-custom-agents"
year: 2026
seo:
  title: "Notion: Automating Workflows with AI Agents Across the Organization - ZenML LLMOps Database"
  description: "Notion implemented Custom Agents across their organization to automate repetitive workflows and reduce manual busywork. The company faced challenges with knowledge accessibility, manual triage of product feedback, and time-consuming repetitive tasks across multiple teams. By deploying domain-specific AI agents that integrate with Slack, their knowledge bases, and project management systems, they automated question-answering, feedback routing, and various team-specific workflows. Results included faster response times for customer support, automatic task creation and routing, and widespread adoption across engineering, marketing, security, and other teams, fundamentally shifting the organizational mindset from manual execution to automation-first thinking."
  canonical: "https://www.zenml.io/llmops-database/automating-workflows-with-ai-agents-across-the-organization"
  ogTitle: "Notion: Automating Workflows with AI Agents Across the Organization - ZenML LLMOps Database"
  ogDescription: "Notion implemented Custom Agents across their organization to automate repetitive workflows and reduce manual busywork. The company faced challenges with knowledge accessibility, manual triage of product feedback, and time-consuming repetitive tasks across multiple teams. By deploying domain-specific AI agents that integrate with Slack, their knowledge bases, and project management systems, they automated question-answering, feedback routing, and various team-specific workflows. Results included faster response times for customer support, automatic task creation and routing, and widespread adoption across engineering, marketing, security, and other teams, fundamentally shifting the organizational mindset from manual execution to automation-first thinking."
notion:
  pageId: "352f8dff-2538-80fb-b40f-ceeb2ac55d30"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-30T13:32:00.000Z"
  lastEditedTime: "2026-04-30T13:32:00.000Z"
  publishedAt: "2026-04-30T13:35:51Z"
---

## Overview

Notion's Custom Agents case study represents an internal deployment of LLM-based autonomous agents across their entire organization to automate repetitive workflows and reduce manual busywork. Published in February 2026, this case study demonstrates how a productivity software company used their own platform to build and deploy multiple specialized AI agents that work continuously across different teams and functions. The implementation showcases a decentralized approach to LLMOps where non-technical employees across various departments can build and deploy production AI agents to solve domain-specific problems.

The case study is particularly notable for demonstrating how AI agents can proliferate organically within an organization when the barriers to creation are lowered. What started with individual team members solving specific pain points evolved into a company-wide culture of automation, with agents being shared, adapted, and repurposed across teams. This represents an interesting model for LLMOps at scale where the operational burden is distributed and agents are maintained by their respective domain experts rather than a centralized AI team.

## Technical Architecture and Integration Points

While the case study is light on deep technical implementation details (as is typical for marketing content), it reveals several important architectural patterns. The Custom Agents operate within Notion's ecosystem but integrate with external systems including Slack, email (Notion Mail), and calendar systems. This multi-platform integration is critical for LLMOps in production environments where AI systems need to operate across the tools employees actually use rather than requiring context-switching to a dedicated AI interface.

The agents appear to operate on two primary trigger mechanisms: event-driven triggers (such as monitoring Slack channels for new messages) and scheduled executions (like weekly status reports). This dual-trigger architecture is standard for production automation systems but represents an important LLMOps consideration—agents need to support both reactive and proactive workflows depending on the use case.

The integration with Notion's existing knowledge infrastructure is particularly significant from an LLMOps perspective. The agents leverage Notion databases, wikis, documentation, and knowledge bases as their context sources. This represents a retrieval-augmented generation (RAG) architecture where agents search internal documentation to ground their responses in organizational knowledge rather than relying solely on the base LLM's training data. This approach addresses the fundamental LLMOps challenges of accuracy, hallucination prevention, and keeping information current without requiring model retraining.

## Knowledge Accessibility Use Case

The customer experience (CX) team's implementation provides concrete details about production deployment. Dianmarie De Jesus from the CX team identified that support agents were repeatedly asking the same questions about pricing, SSO configuration, and billing policies—all information already documented in their knowledge base. The manual workflow involved tracking down team members who would search for documentation and paste links into Slack, sometimes taking hours for responses.

The solution was a Custom Agent deployed in the #cx-ask Slack channel that queries the CX Knowledge Base and enablement documentation to provide immediate answers with source links. From an LLMOps perspective, this implementation addresses several critical production concerns. First, the agent provides source attribution by linking back to the original documentation, which is essential for trust and verification in production systems. Second, it operates continuously without human intervention, representing true production automation rather than a human-in-the-loop system. Third, the measurable impact was response time reduction from hours to minutes, demonstrating quantifiable business value.

The pattern proved successful enough that other teams replicated it for their own domains. Engineering built agents to handle service-ownership questions, Product created domain-specific agents for technical areas that could answer questions at any time (specifically mentioning 2 AM scenarios, highlighting the always-on nature of production deployments), and the Workplace team built an agent for office logistics. This horizontal scaling across departments represents an important LLMOps success pattern—once the infrastructure and patterns are established, deployment becomes more about configuration than development.

## Automated Triage and Workflow Routing

The Feedback Router agent demonstrates another production pattern: automated classification and routing. Product feedback flows into Notion from multiple sources (support tickets, Slack messages, sales conversations) and gets aggregated in a #all-feedback Slack channel. The manual process of routing this feedback to appropriate teams, creating tasks, and ensuring nothing was lost required constant human attention.

The Feedback Router monitors the Slack channel continuously, identifies which product area each piece of feedback relates to, creates tasks for appropriate teams, and cross-posts to relevant Slack channels. Richard Kang from Product Operations noted that this "freed us up to actually work on getting things implemented" rather than spending time on manual transcription and routing.

From an LLMOps perspective, this represents a classification and orchestration workflow running continuously in production. The agent must perform several operations: classify feedback by product area (a multi-class classification task), create structured data in Notion's project management system (API integration), and post to multiple Slack channels (multi-channel messaging). The complexity of this workflow highlights important production considerations around error handling, idempotency (ensuring feedback isn't duplicated if the agent runs multiple times), and audit trails (tracking what actions the agent took).

The Web team's "Wilbur" agent adapted this pattern for their specific needs, monitoring the #web-team channel for issues like broken links or translation errors. Wilbur replies in Slack, files tasks, and tags appropriate team members. This adaptation pattern—where teams observe successful agents and build similar ones for their domains—represents an organic approach to LLMOps scaling that differs from centralized deployment models.

## Diversity of Agent Applications

The case study lists numerous other agents deployed across the organization, each representing different production patterns:

**Vera the Voice Coach** operates in two modes: reviewing marketing copy for adherence to style guidelines and answering style guide questions in Slack. This dual-mode operation (document analysis and question-answering) suggests the agent can handle both asynchronous batch processing and synchronous conversational interactions. From an LLMOps perspective, this requires different performance characteristics—document review might tolerate higher latency while Slack questions need near-immediate responses.

**Work-in-flight** generates weekly reports for team leads by tracking projects, tasks, and recent documents to identify what's progressing, what's blocked, and what's upcoming. This represents a scheduled aggregation and summarization workflow, pulling data from multiple Notion databases and synthesizing it into actionable insights. The LLMOps challenge here involves maintaining consistent output format, handling incomplete or changing data, and potentially dealing with large context windows when reviewing numerous documents and tasks.

**Smilers** handles office logistics questions for the Environment team, answering questions about lunch ordering, printer locations, and office updates. This is another knowledge base query agent similar to the CX team's implementation, demonstrating the reusability of this pattern across different domains.

**Mr. Nice Guy** performs tone adjustment, rewriting harsh drafts into polite, constructive messages while preserving intent. Originally built for one person and now used across teams, this represents a text transformation workflow. The LLMOps considerations include maintaining semantic meaning while adjusting tone, handling subjective judgments about what constitutes "harsh" versus "polite," and operating on potentially sensitive communications. The case study notes it keeps communications "honest," suggesting there's a balance between politeness and directness that the agent must maintain.

**Scruff** assists the Security team with investigating and triaging security alerts, reducing manual research to distinguish real threats from false positives. This is perhaps the most critical production application mentioned, as security operations typically demand high accuracy and reliability. The fact that Scruff helps the team "more quickly make important decisions" suggests it's positioned as a decision-support tool rather than an autonomous decision-maker, which is appropriate given the high-stakes nature of security work.

## Organizational and Cultural Aspects

CTO Fuzzy Khosrowshahi's comment that "We have an immense amount of talent here and want everyone to experiment with AI" reveals an important organizational philosophy. The democratization of agent building—enabling people from Marketing, Sales, IT, and other non-engineering functions to create production AI systems—represents a significant LLMOps model. Traditional LLMOps often centralizes AI development and deployment within specialized teams, but Notion's approach distributes this capability broadly.

This raises important questions about governance, quality control, and technical debt that the case study doesn't address. When many individuals across an organization can deploy production AI agents, how are standards maintained? How is testing and validation performed? What happens when an agent's creator leaves the company? The case study presents this democratization as purely positive, but from an LLMOps engineering perspective, these are critical operational concerns.

The viral adoption pattern described—"someone builds an agent for their workflow, others discover they can use it, and suddenly multiple teams benefit"—suggests agents are discoverable and shareable within the organization. This implies some form of agent registry or catalog where employees can find existing agents before building their own. The reuse and adaptation of agents (like Mr. Nice Guy spreading from one person to multiple teams) represents an important efficiency in LLMOps at scale.

## Production Deployment Characteristics

Several production characteristics emerge from the case study:

**Continuous Operation**: The agents run "continuously with no hand-holding" and work "whether you're online or not." This indicates true production automation with appropriate monitoring, error handling, and recovery mechanisms. For LLMOps, this means the infrastructure must support long-running processes, handle failures gracefully, and likely include alerting when agents encounter errors they can't resolve.

**Context Integration**: Agents "use your existing knowledge for context," confirming the RAG architecture where organizational knowledge grounds agent responses. This requires production systems for embedding generation, vector search, document retrieval, and context window management—all standard LLMOps components but each with operational complexity.

**Multi-Channel Integration**: Agents work "across Slack, Mail, Calendar, and other tools," indicating robust integration architecture. From an LLMOps perspective, this means maintaining API connections to multiple external services, handling authentication and authorization, managing rate limits, and dealing with the operational complexity of third-party service dependencies.

**Workflow Description Interface**: The case study mentions users "describe a workflow once, set a trigger or schedule," suggesting a natural language interface for agent configuration. This is significant from an LLMOps perspective—rather than requiring structured configuration or code, users can describe workflows in natural language, which the system presumably converts into executable agent logic. This likely involves another layer of LLM processing to interpret user intent and generate agent configurations.

## Critical Assessment and Limitations

As this is marketing content from Notion promoting their own product, the case study presents Custom Agents in an entirely positive light without acknowledging limitations, challenges, or failures. Several important LLMOps considerations are notably absent:

**Accuracy and Error Rates**: No mention of agent error rates, hallucinations, or incorrect responses. In production LLM systems, measuring and monitoring accuracy is critical. The CX knowledge base agent, for example, could provide incorrect information to support agents who then relay it to customers, creating downstream problems.

**Human Oversight**: While some agents like Scruff are positioned as decision-support tools, others appear fully autonomous. The case study doesn't discuss oversight mechanisms, human review processes, or escalation paths when agents are uncertain.

**Cost Considerations**: Running multiple agents continuously across an organization involves substantial LLM API costs or inference infrastructure costs. The case study doesn't mention cost optimization, token usage monitoring, or ROI calculations beyond qualitative time savings.

**Security and Privacy**: Agents accessing sensitive information (customer data in CX knowledge bases, security alerts in Scruff, potentially confidential communications in Mr. Nice Guy) raise data governance questions. How is access controlled? How is sensitive information protected in agent processing? Are conversations logged, and if so, who can access them?

**Testing and Validation**: No mention of how agents are tested before deployment, how updates are rolled out, or how agent performance is validated over time. In production LLMOps, testing frameworks, evaluation metrics, and continuous monitoring are essential.

**Version Control and Reproducibility**: With many individuals building agents, how are agent configurations versioned? Can agent behavior be reproduced for debugging? What happens when underlying models are updated?

The case study's claim that "anyone can build a Custom Agent" and the diversity of builders (from individual contributors to team leads across various functions) is impressive but raises the question of technical guardrails. Production LLM systems require careful prompt engineering, appropriate temperature settings, context window management, and other technical considerations. The case study doesn't explain how these complexities are abstracted away or whether some degradation in sophistication is accepted as a tradeoff for accessibility.

## LLMOps Patterns and Takeaways

Despite the marketing framing, several valuable LLMOps patterns emerge:

**Domain-Specific Agents Over General-Purpose**: Rather than building one large agent to handle everything, Notion deployed specialized agents for specific workflows and domains. This pattern reduces complexity, improves accuracy through focused context, and allows domain experts to maintain their relevant agents.

**Knowledge Grounding Through RAG**: Agents consistently query organizational knowledge bases rather than relying on parametric knowledge, addressing the freshness and accuracy challenges inherent in LLM deployment.

**Integration-First Architecture**: Agents live where work happens (Slack, email, project management) rather than requiring users to adopt new tools. This reduces adoption friction and increases actual usage.

**Gradual Expansion Through Demonstration**: Starting with clear wins (CX knowledge base, feedback routing) and letting success drive organic adoption across teams is a lower-risk approach than mandating enterprise-wide AI deployment.

**Democratized Building with Reusable Patterns**: Enabling many people to build agents while providing successful templates to adapt reduces the burden on central AI teams and accelerates deployment.

The shift in organizational mindset from "How do I find time for this?" to "Can a Custom Agent do this?" represents a cultural change that's valuable for LLMOps adoption, though it requires supporting infrastructure, education, and governance to sustain successfully.

This case study ultimately demonstrates LLMs in production across a real organization with measurable impact on workflow efficiency, but the lack of technical depth, absence of challenges or limitations, and marketing-focused narrative means it should be viewed as a directional example of what's possible rather than a technical blueprint for implementation.
