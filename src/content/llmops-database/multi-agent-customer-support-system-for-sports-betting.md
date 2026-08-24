---
title: "Multi-Agent Customer Support System for Sports Betting"
slug: "multi-agent-customer-support-system-for-sports-betting"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "classification"
  - "regulatory-compliance"
  - "multi-agent-systems"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "evals"
  - "kubernetes"
  - "databases"
  - "orchestration"
  - "guardrails"
  - "scalability"
  - "microservices"
  - "monitoring"
  - "api-gateway"
  - "compliance"
  - "security"
  - "anthropic"
  - "amazon-aws"
industryTags: "media-entertainment"
company: "Fanatics Betting"
summary: "Fanatics Betting and Gaming built a multi-agent AI customer support system on AWS to handle the complexity of sports betting customer service, where state-specific regulations, high-traffic events, and responsible gaming requirements create unique challenges. The system uses specialized agents orchestrated through Amazon EKS and Amazon Bedrock, with capabilities including custom RAG for knowledge retrieval, responsible gaming classification, and MCP-based tool integration for account and transaction queries. Within two months of deployment, the system achieved approximately 56% improvement in containment rates and 53% improvement in resolution rates, handling thousands of cases autonomously while maintaining customer satisfaction during peak sporting events."
link: "https://aws.amazon.com/blogs/machine-learning/how-fanatics-betting-and-gaming-built-a-multi-agent-customer-support-system/"
year: 2026
seo:
  title: "Fanatics Betting: Multi-Agent Customer Support System for Sports Betting - ZenML LLMOps Database"
  description: "Fanatics Betting and Gaming built a multi-agent AI customer support system on AWS to handle the complexity of sports betting customer service, where state-specific regulations, high-traffic events, and responsible gaming requirements create unique challenges. The system uses specialized agents orchestrated through Amazon EKS and Amazon Bedrock, with capabilities including custom RAG for knowledge retrieval, responsible gaming classification, and MCP-based tool integration for account and transaction queries. Within two months of deployment, the system achieved approximately 56% improvement in containment rates and 53% improvement in resolution rates, handling thousands of cases autonomously while maintaining customer satisfaction during peak sporting events."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-customer-support-system-for-sports-betting"
  ogTitle: "Fanatics Betting: Multi-Agent Customer Support System for Sports Betting - ZenML LLMOps Database"
  ogDescription: "Fanatics Betting and Gaming built a multi-agent AI customer support system on AWS to handle the complexity of sports betting customer service, where state-specific regulations, high-traffic events, and responsible gaming requirements create unique challenges. The system uses specialized agents orchestrated through Amazon EKS and Amazon Bedrock, with capabilities including custom RAG for knowledge retrieval, responsible gaming classification, and MCP-based tool integration for account and transaction queries. Within two months of deployment, the system achieved approximately 56% improvement in containment rates and 53% improvement in resolution rates, handling thousands of cases autonomously while maintaining customer satisfaction during peak sporting events."
notion:
  pageId: "3c6f8dff-2538-805a-bc57-c98d94ac77c9"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-24T09:00:00.000Z"
  lastEditedTime: "2026-08-24T09:00:00.000Z"
  publishedAt: "2026-08-24T09:16:23Z"
---

## Overview

Fanatics Betting and Gaming (FBG) developed and deployed a sophisticated multi-agent customer support system to address the unique complexities of operating a sports betting platform across multiple U.S. states. The case study, published in August 2026, provides detailed insights into how the company leveraged AWS services to build a production-grade LLM system that handles diverse customer queries while maintaining strict compliance with state-specific regulations and responsible gaming requirements.

The business challenge was multifaceted: exponential growth in support volume, especially during major sporting events; jurisdiction-specific regulatory complexity where every state has different rules for payment methods, deposit limits, and responsible gaming; the need to identify and respond to signs of problem gambling in real-time; and the requirement to scale instantly during traffic surges (over 40 inquiries every two minutes during peak events). Traditional decision-tree chatbots proved inadequate for this level of complexity.

## Architectural Approach

The solution employs an orchestrator pattern with specialized agents rather than a monolithic chatbot. The architecture runs on Amazon EKS, leveraging FBG's existing container expertise to deploy, scale, and iterate on each agent independently. This modular design allows the team to add new capabilities—new tools, knowledge domains, or business units—without rewriting the core system.

The request flow begins when a customer message enters through the FBG mobile app, routes through Salesforce Einstein as the chat interface layer, and passes via REST calls to the Spring AI service running on Amazon EKS. The service validates customer tokens and invokes the AI agent system. Critically, every request flows through Amazon Bedrock Guardrails for prompt injection detection before reaching the AI layer.

A key architectural component is the Responsible Gaming classification agent, powered by Amazon Nova 2 Lite, which evaluates every message against a compliance-approved classification framework. High-severity classifications trigger immediate transfer to human agents with full conversation context. This isn't just feature functionality—it's a regulatory and ethical requirement that the team built as a first-class architectural concern.

The Supervisor Agent, running Anthropic Claude on Amazon Bedrock, serves as the orchestrator, determining which tools to invoke based on customer intent. The system employs multiple specialized tools: a custom RAG pipeline for FAQ-style questions, Account Tools accessed via MCP that query internal account services, Transaction Tools via MCP for deposit/withdrawal/betting history, and a Transfer-to-Agent Tool for human escalation.

## Production Infrastructure on Amazon EKS

The team runs their entire AI stack on Amazon EKS, hosting both their MCP server and Spring AI service as Kubernetes services. The MCP server exposes tools that make REST calls to external services like account and transaction-history services, while local tools (RAG and Transfer-to-Human) live directly in the Spring AI service alongside the Claude LLM.

This Kubernetes-based approach provides several LLMOps advantages. The MCP server and Spring AI service scale independently based on demand, with autoscaling ensuring consistent performance whether it's a quiet Tuesday or the Super Bowl. When new business domains or features are needed, adding a new MCP server is just another Kubernetes deployment. Individual tools can be updated without redeploying the entire system, and new MCP tools can be added to existing servers without requiring new pod deployments.

FBG chose Spring AI as their application framework due to their team's deep Java expertise, which accelerated development. Spring AI provides native MCP support, allowing the MCP server to define tools that the supervisor agent can discover and invoke dynamically. The case study notes that teams working in Python might consider Strands Agents, an open-source SDK from AWS with similar agent orchestration and MCP support.

## Custom RAG Pipeline Implementation

The RAG pipeline represents the most frequently used tool in the system. Rather than using a managed knowledge base, FBG built a custom implementation for precise control over ingestion, chunking, and retrieval processes—a decision driven by their complex state-specific requirements.

The pipeline works as follows: support documentation is collected from upstream sources including state-specific payment guides, FAQ articles, responsible gaming resources, and account management guides. Documents undergo token-based chunking, where content is divided into segments of fixed token counts rather than by sentences or paragraphs, giving fine-grained control over chunk boundaries. Chunks are embedded using Amazon Titan V2, generating vector representations stored in MongoDB Atlas.

For query processing, the system converts customer questions into vector search-optimized forms using an LLM, then performs similarity searches against the document store. Critically, for jurisdiction-specific questions, the system performs both a state-specific search and a general search, combining results before passing them to the supervisor agent. This dual-search strategy addresses the core complexity of multi-state operations where customers in Indiana receive different answers than those in New Jersey.

The knowledge base is continuously expanding with hundreds of new documents added monthly as the team identifies gaps through conversation analysis. The custom approach proved particularly valuable for combining state-specific and general documents in single responses—a requirement that would be difficult to achieve with off-the-shelf managed solutions.

## Multi-Model Strategy

FBG implements a deliberate multi-model architecture on Amazon Bedrock, taking a bottom-up approach to model selection. For classification tasks like responsible gaming detection, they use Amazon Nova 2 Lite—fast, cost-effective, and sufficient for well-defined classification with clear examples. For supervisor and orchestration tasks requiring complex reasoning, tool orchestration, and natural conversation, they use Anthropic Claude Sonnet on Amazon Bedrock. For embeddings in the RAG pipeline, they use Amazon Titan V2 for high-quality vector representations.

The team employs a round-robin strategy across model Regions for the supervisor agent, ensuring they never hit throughput limits during peak events. Because every model is accessed through the same Amazon Bedrock API, routing different workloads to different models requires no infrastructure changes—a key operational advantage for production systems.

The case study emphasizes an important LLMOps principle: use the smallest model that meets accuracy requirements for each task, and reserve larger models for open-ended reasoning. The responsible gaming classifier demonstrates this well—the task is well-defined with clear examples and limited outcomes, so a larger, more expensive model would add latency without improving accuracy.

## Responsible Gaming as a First-Class Architectural Concern

The responsible gaming classification system deserves special attention as an example of domain-specific compliance requirements shaping LLMOps architecture. FBG worked directly with their compliance department to build the classification system, which evaluates customer interactions to ensure responsible gaming standards are met and connects customers with appropriate resources when needed.

Amazon Nova 2 Lite was deliberately chosen for this task despite more powerful models being available. The model receives both the current message and full conversation history, enabling detection of escalating patterns rather than single-message keyword matching. High-severity concerns trigger immediate human transfer with full conversation context, while lower-severity flags are recorded for compliance review while allowing conversations to continue.

This represents a broader pattern in production LLM systems: domain-specific compliance and safety requirements often necessitate specialized classification agents that operate alongside general-purpose conversational agents. The architecture must support these as first-class concerns, not afterthoughts.

## Guardrails and Safety

Amazon Bedrock Guardrails provides security protection, particularly against prompt injection. The team tuned their guardrail configuration to balance security with customer service realities, recognizing that overly restrictive filters create false positives that frustrate customers. This tuning process represents an often-overlooked aspect of production LLMOps: default security configurations must be customized for specific use cases to avoid degrading user experience while maintaining necessary protections.

## Evaluation and Continuous Improvement

What distinguishes this case study is the emphasis on continuous improvement infrastructure. FBG treats their multi-agent system as a living product, not a one-time implementation. The team reviews conversation logs, tracks resolution accuracy, and uses real customer interactions to refine prompts, adjust tool behavior, and identify knowledge base gaps.

At the core of their evaluation strategy is an LLM-as-a-Judge system that automatically reviews every completed conversation, classifying whether the AI successfully resolved the case. An operations team reviews these evaluations daily, identifying patterns where the agent struggles and filing improvement tickets. This creates a feedback loop where the agent measurably improves over time.

The engineering side monitors system health through real-time observability metrics including hallucination detection, latency, and cost tracking. When developing new features or testing changes, the team pulls actual customer conversations from production and replays them against updated architecture to surface edge cases before customer exposure.

The prompt engineering discipline is particularly noteworthy. Rather than immediately upgrading to more powerful (and expensive) models when performance dips, the team first examines whether system prompts can be improved or whether instruction contradictions exist. This keeps costs low while driving continuous quality improvements, with model upgrades reserved for situations where prompts have been fully optimized. The case study mentions that teams can use advanced prompt optimization in Amazon Bedrock, which refines prompts against evaluation criteria and compares results across multiple models before committing to migrations.

## Production Results and Scale

Within the first two months of deployment, based on FBG's internal metrics, the system delivered measurable improvements: containment rates improved by approximately 56% (more issues resolved without human involvement), resolution rates improved by approximately 53% (customers getting problems actually solved rather than deflected), thousands of cases resolved autonomously representing significant cost savings, and customer satisfaction trending upward with conversation quality improved to the point where customers frequently don't realize they're interacting with AI.

During peak sporting events, the system handles high request volumes while maintaining consistent performance and response quality. Amazon EKS autoscaling ensures that MCP servers and Spring AI services add capacity automatically as traffic spikes without manual intervention.

## LLMOps Lessons and Patterns

The case study offers several actionable LLMOps patterns. First, define scope narrowly—FBG launched with just 4 of their over 20 case types, proving value quickly before expanding. Starting narrow enables building evaluation infrastructure and learning what works before broader rollout.

Second, use specialized agents with clear responsibilities rather than monolithic systems. This modularity enables independent improvement of each component and easier addition of new capabilities.

Third, choose the smallest model meeting accuracy requirements for each task. Classification tasks don't need frontier models, while orchestration benefits from stronger reasoning capabilities.

Fourth, invest in evaluation infrastructure from day one, not as an afterthought. Build evaluation pipelines alongside agents, tracking containment rates, resolution rates, and customer satisfaction from the start. Use LLM-as-a-Judge patterns to automate conversation review at scale.

Fifth, consider building custom RAG when retrieval requirements are complex. While managed solutions like Amazon Bedrock Knowledge Bases work for many use cases, FBG's need to combine state-specific and general documents in single responses justified the custom implementation.

Sixth, tune guardrails to your specific use case rather than applying maximum restrictions by default. For customer support, prompt injection protection is critical, but overly aggressive content filtering creates false positives that frustrate customers.

## Balanced Assessment

While the case study presents impressive results, several considerations warrant attention. The results are based on FBG's internal metrics over a two-month period—longer-term evaluation would provide more confidence in sustained performance. The 56% improvement in containment rates and 53% improvement in resolution rates are relative to their previous support experience, but the baseline isn't fully described, making absolute performance difficult to assess.

The case study doesn't detail failure modes or limitations. All production LLM systems have cases they handle poorly, and understanding these boundaries would provide a more complete picture. The cost analysis mentions "significant cost savings" and notes AI-powered interactions cost a fraction of human agent interactions, but specific cost figures or ROI calculations aren't provided.

The customer satisfaction claim that customers "frequently don't realize they're interacting with AI" could be viewed positively (seamless experience) or raise transparency questions depending on regulatory and ethical perspectives on AI disclosure in customer service contexts.

The system's reliance on Amazon EKS requires container orchestration expertise. While FBG had existing Kubernetes skills, teams without this expertise might face a steeper learning curve. The case study mentions Amazon Bedrock AgentCore as a managed alternative, but doesn't provide comparison of tradeoffs between the EKS-based approach and managed options.

## Technical Stack Summary

The production stack comprises: Amazon EKS for container orchestration and agent hosting; Spring AI as the application framework with native MCP support; Amazon Bedrock for model access (Anthropic Claude Sonnet for orchestration, Amazon Nova 2 Lite for classification); Amazon Titan V2 for embeddings in the RAG pipeline; MongoDB Atlas for vector storage; MCP (Model Context Protocol) for tool communication between agents; Amazon Bedrock Guardrails for prompt injection protection; and Salesforce Einstein as the chat interface layer.

This case study represents a mature production implementation of multi-agent LLM systems, demonstrating how specialized agents, thoughtful infrastructure choices, and continuous evaluation can address complex domain requirements while delivering measurable business value. The emphasis on evaluation infrastructure, prompt optimization before model upgrades, and domain-specific compliance integration provides valuable patterns for teams building similar systems.
