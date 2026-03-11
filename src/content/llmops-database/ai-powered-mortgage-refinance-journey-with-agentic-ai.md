---
title: "AI-Powered Home Loan Guardian for Mortgage Refinancing"
slug: "ai-powered-mortgage-refinance-journey-with-agentic-ai"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "question-answering"
  - "high-stakes-application"
  - "structured-output"
  - "regulatory-compliance"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "cost-optimization"
  - "system-prompts"
  - "mcp"
  - "evals"
  - "kubernetes"
  - "api-gateway"
  - "monitoring"
  - "databases"
  - "microservices"
  - "scaling"
  - "orchestration"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "langchain"
  - "amazon-aws"
  - "anthropic"
  - "openai"
  - "meta"
  - "google-gcp"
industryTags: "finance"
company: "Lendi"
summary: "Lendi, an Australian FinTech company, developed Guardian, an agentic AI application to transform the home loan refinancing experience. The company identified that homeowners lacked visibility into their mortgage positions and faced cumbersome refinancing processes, while brokers spent excessive time on administrative tasks. Using Amazon Bedrock's foundation models, Lendi built a multi-agent system deployed on Amazon EKS that monitors loan competitiveness, tracks equity positions in real-time, and streamlines refinancing through conversational AI. The solution was developed in 16 weeks and has already settled millions in home loans with significantly reduced refinance cycle times, enabling customers to complete refinancing in as little as 10 minutes through the Rate Radar feature."
link: "https://aws.amazon.com/blogs/machine-learning/how-lendi-revamped-the-refinance-journey-for-its-customers-using-agentic-ai-in-12-weeks-using-amazon-bedrock?tag=soumet-20"
year: 2026
seo:
  title: "Lendi: AI-Powered Home Loan Guardian for Mortgage Refinancing - ZenML LLMOps Database"
  description: "Lendi, an Australian FinTech company, developed Guardian, an agentic AI application to transform the home loan refinancing experience. The company identified that homeowners lacked visibility into their mortgage positions and faced cumbersome refinancing processes, while brokers spent excessive time on administrative tasks. Using Amazon Bedrock's foundation models, Lendi built a multi-agent system deployed on Amazon EKS that monitors loan competitiveness, tracks equity positions in real-time, and streamlines refinancing through conversational AI. The solution was developed in 16 weeks and has already settled millions in home loans with significantly reduced refinance cycle times, enabling customers to complete refinancing in as little as 10 minutes through the Rate Radar feature."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-mortgage-refinance-journey-with-agentic-ai"
  ogTitle: "Lendi: AI-Powered Home Loan Guardian for Mortgage Refinancing - ZenML LLMOps Database"
  ogDescription: "Lendi, an Australian FinTech company, developed Guardian, an agentic AI application to transform the home loan refinancing experience. The company identified that homeowners lacked visibility into their mortgage positions and faced cumbersome refinancing processes, while brokers spent excessive time on administrative tasks. Using Amazon Bedrock's foundation models, Lendi built a multi-agent system deployed on Amazon EKS that monitors loan competitiveness, tracks equity positions in real-time, and streamlines refinancing through conversational AI. The solution was developed in 16 weeks and has already settled millions in home loans with significantly reduced refinance cycle times, enabling customers to complete refinancing in as little as 10 minutes through the Rate Radar feature."
notion:
  pageId: "320f8dff-2538-8078-bc7f-ca1198205fe0"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-03-11T13:58:00.000Z"
  lastEditedTime: "2026-03-11T14:10:00.000Z"
  publishedAt: "2026-03-11T14:15:03Z"
---

## Overview

Lendi Group, one of Australia's fastest-growing FinTech companies, embarked on an ambitious project to transform the home loan experience through agentic AI, developing their Guardian application in just 16 weeks. The case study represents a substantial production deployment of LLM-based agents in a highly regulated financial services environment, addressing the challenge that most Australian homeowners lack visibility into whether their home loans remain competitive and face significant friction when attempting to refinance.

The Guardian application serves as an around-the-clock AI companion for homeowners, continuously monitoring loans, providing personalized insights, and dramatically simplifying the mortgage refinance process. This case study is particularly noteworthy for its multi-agent orchestration approach, comprehensive observability implementation, and the integration of regulatory guardrails required for financial services compliance. While the post is published on AWS's blog and clearly promotes their services, it provides substantive technical details about architecture, agent design, and operational considerations that make it valuable for understanding production LLMOps at scale.

## Business Problem and Context

The home loan market presented several interconnected challenges that Lendi sought to address through AI. Customers struggled with limited visibility into their mortgage positions—most homeowners had no real-time insight into whether their current rates remained competitive, how property value fluctuations affected their equity position, or how their overall financial health impacted mortgage options. This information asymmetry led to customers missing opportunities to save money or effectively utilize their home equity.

Beyond visibility issues, the refinancing process itself created significant friction. Even when customers identified better rates, the paperwork and administrative burden of refinancing deterred action. Brokers, meanwhile, spent substantial time on post-call documentation, routine inquiries, and after-hours support rather than focusing on complex client needs requiring human expertise and empathy. For Lendi as a business, scaling personalized service across their extensive customer base while maintaining the human touch that builds trust in financial relationships proved particularly challenging outside business hours.

Rather than viewing AI merely as an efficiency tool, Lendi envisioned a fundamental reinvention of the home loan journey where technology could anticipate customer needs, provide continuous personalized guidance, and free human experts to focus on relationship building and complex decision-making.

## Technical Architecture and Infrastructure

The production architecture demonstrates a well-thought-out layered approach to deploying agentic AI at scale. At the foundation lies Amazon Bedrock for foundation model access and Amazon Bedrock Guardrails for compliance enforcement—critical in financial services where regulatory adherence is non-negotiable. The choice of Amazon EKS (Elastic Kubernetes Service) for deploying AI agents reflects a deliberate decision to leverage container orchestration for scalability, allowing the infrastructure to handle varying customer demand through auto-scaling while maintaining consistent performance and availability.

The architecture comprises six distinct layers, each serving specific operational needs. The UI layer provides customers with an intuitive chat-led interface integrated directly into their Lendi dashboard, ensuring seamless access to AI-powered insights. The API layer uses Amazon API Gateway as a RESTful communication bridge between frontend applications and backend agents, handling critical cross-cutting concerns like request routing, authentication, and rate limiting to maintain secure and reliable interactions.

The compute layer, built on Amazon EKS, hosts and orchestrates the AI agents with the scalability characteristics essential for consumer-facing financial services. The intelligence layer represents the core AI capabilities, powered by multiple specialized agents built on Amazon Bedrock foundation models. Notably, Lendi utilized Agno, an open-source agentic framework, to develop these agents, with Model Context Protocol (MCP) servers providing integrations to internal systems, external data sources, and third-party services. The deliberate use of Amazon Bedrock Guardrails at this layer helps enforce compliance boundaries, verifying that customer interactions adhere to communication guidelines and remain focused on relevant mortgage-related topics.

For observability—a critical but often underemphasized aspect of LLMOps—Lendi implemented Langfuse to capture comprehensive agent traces including inputs, outputs, reasoning chains, and performance metrics. This provides full visibility into agent behavior and enables continuous optimization and debugging. The system also leverages Amazon CloudWatch for system-level logs, creating a multi-layered observability strategy. The storage layer uses MongoDB for persistent data including user context, conversation history, and session state, enabling customers to resume conversations across sessions while providing agents with the customer-specific context necessary for personalized recommendations. Amazon S3 stores documents and files provided by customers.

This architecture pattern demonstrates several LLMOps best practices: separation of concerns across layers, dedicated infrastructure for scaling and reliability, comprehensive observability built into the system from the start, and careful attention to compliance and guardrails as first-class architectural components rather than afterthoughts.

## Multi-Agent Orchestration and Workflow Design

One of the most sophisticated aspects of Lendi's implementation is their multi-agent orchestration system where specialized agents collaborate to complete the mortgage refinance journey. This modular approach delivers several operational advantages: clear separation of concerns between agents simplifies development and maintenance, task-specific optimization enables faster response times, and troubleshooting becomes more straightforward when issues arise since problems can be isolated to specific agents.

The mortgage refinance process flows through five specialized agents, with seamless handovers that preserve full context at each transition. The Mortgage Broker Associate Agent serves as the initial engagement point, embodying a friendly, professional persona similar to a human mortgage broker. Its primary goal involves understanding the customer's current situation and assessing their interest in refinancing. When a customer expresses interest, the Customer Information Collection Agent systematically gathers essential details including current loan information, employment status, income, and refinancing preferences. The agent uses conversational techniques to make data collection feel natural rather than interrogative and is context-aware, asking only for information not already provided.

With complete customer information, the Product Recommendation Agent analyzes the customer's profile against Lendi's extensive lender and product database, presenting suitable options with clear explanations of benefits and potential savings. After product selection, the Product-Specific Information Collection Agent gathers additional information required by the specific lender, adapting its questions since different lenders have varying requirements.

The fifth agent, Linda (the Communication Agent), represents an innovative approach to off-system engagement and re-engagement. While the specialized agents manage in-system tasks from initial engagement through application preparation, Linda operates across channels including SMS, email, WhatsApp, and push notifications to bring customers back at the right moment. She detects when progress has stalled, surfaces timely reminders or new opportunities, and reinvites customers to continue where they left off. Drawing on live data from what Lendi calls the "Aurora Digital Twin," Linda tailors messages to the customer's specific context, tone, and goal, whether encouraging them to reconnect their loan, review matched products, or complete their submission. Linda essentially serves as the voice of Guardian beyond the app, keeping customers informed, motivated, and moving forward throughout the refinance journey.

This multi-agent design reflects sophisticated thinking about task decomposition and specialization in LLM systems. Rather than attempting to build a monolithic agent handling all tasks, Lendi created specialized agents optimized for specific portions of the workflow, which likely improves both performance and maintainability. The seamless context preservation across agent handovers represents a significant technical achievement, as maintaining conversational context across multiple systems and agents is notoriously challenging in production LLM deployments.

## Model Selection and Prompt Engineering

The case study emphasizes that Lendi leveraged the diverse range of foundation models available through Amazon Bedrock, enabling them to select task-appropriate models optimized for specific use cases. This multi-model approach represents an important LLMOps insight: the most sophisticated or largest model isn't always the most effective solution for specific use cases. Different agents in the workflow may have different requirements in terms of reasoning capability, response latency, cost, and context window size.

The post highlights that Lendi incorporated domain knowledge from human experts into their prompts, recognizing that contextual expertise often determines success more than model selection alone. This emphasis on prompt engineering as a critical success factor, combined with the use of Amazon Bedrock's prompt management for versioning prompts, demonstrates operational maturity in managing LLM systems in production. Prompt versioning is essential for tracking changes, rolling back when issues arise, and maintaining consistency across deployments.

Lendi also takes advantage of Amazon Bedrock batch inference for tasks that don't require immediate results, which represents cost-conscious LLMOps practice. Batch inference typically offers significant cost savings compared to synchronous inference, and identifying which tasks can tolerate latency for cost benefits demonstrates thoughtful system design.

## Guardrails and Responsible AI

Operating in the highly regulated financial services sector, Lendi placed significant emphasis on responsible AI governance. The implementation of Amazon Bedrock Guardrails serves multiple critical functions: enforcing content policies, filtering inappropriate responses, and maintaining alignment with compliance requirements throughout the AI lifecycle. In financial services, where regulatory penalties for non-compliance can be severe and customer trust is paramount, these guardrails represent more than nice-to-have features—they're essential operational requirements.

The case study emphasizes designing AI systems that augment rather than replace human judgment, maintaining a customer-centric approach where human oversight remains central to critical decisions. This philosophy manifests in the system design where AI handles routine monitoring, data collection, and initial recommendation generation, while human brokers focus their expertise on complex scenarios, relationship building, negotiation, and providing strategic financial advice requiring human judgment and empathy.

The guardrails implementation addresses a fundamental tension in LLMOps for regulated industries: how to leverage the flexibility and conversational capabilities of LLMs while ensuring outputs remain within acceptable boundaries defined by regulatory requirements and company policies. The fact that Lendi prioritized this from the beginning rather than retrofitting compliance capabilities suggests organizational maturity in approaching AI deployment.

## Observability, Monitoring, and Evaluation

The integration of Langfuse for comprehensive agent traces represents a sophisticated approach to observability in agentic systems. Capturing inputs, outputs, reasoning chains, and performance metrics provides the visibility necessary for understanding agent behavior in production, debugging issues when they arise, and continuously optimizing performance. The multi-layered observability strategy combining Langfuse for agent-level traces and Amazon CloudWatch for system-level logs creates comprehensive coverage across different abstraction levels.

The case study emphasizes prioritizing early, iterative evaluation metrics to guide AI development systematically and relying on data-driven metrics to make key decisions such as model choice. This evaluation-first approach represents LLMOps best practice: establishing clear metrics before deployment and using those metrics to drive continuous improvement rather than relying on intuition or anecdotal feedback.

The emphasis on evaluation metrics as a lesson learned suggests Lendi invested significant effort in defining what success looks like for their AI agents. In customer-facing financial services applications, evaluation likely encompasses multiple dimensions: task completion rates, accuracy of information provided, customer satisfaction, compliance with regulatory requirements, and operational efficiency gains. The challenge in agentic systems is that evaluation becomes more complex than simple input-output testing—agents make sequences of decisions, interact with external systems, and adapt to customer responses in ways that require sophisticated evaluation frameworks.

## Deployment Timeline and Development Velocity

The 16-week development timeline from conception to production deployment is remarkably aggressive for a regulated financial services application, particularly one involving multiple specialized agents and comprehensive compliance requirements. The case study describes this as a "30,000-hour cross-functional sprint," suggesting significant resource investment and parallel workstreams. This timeline demonstrates how AI-first architectures combined with managed services like Amazon Bedrock can accelerate development velocity compared to building foundation models from scratch or managing ML infrastructure.

However, it's worth noting that this timeline should be evaluated with some caution. The case study is published on AWS's blog as promotional content, and the timeline may reflect ideal conditions with strong executive support, dedicated resources, and possibly some existing infrastructure or capabilities not fully detailed in the post. Organizations planning similar initiatives should account for their specific constraints, existing infrastructure, and organizational readiness for AI adoption.

The deployment on Amazon EKS suggests Lendi likely had existing Kubernetes expertise and infrastructure, which would significantly reduce the time required to stand up the compute layer. Similarly, the choice of MongoDB for persistence suggests this may have been an existing data store rather than a greenfield selection, further accelerating deployment.

## Business Outcomes and Impact

The case study reports that Guardian has already settled millions in home loans with refinance cycle times "considerably faster" than Lendi Group's baseline. The Rate Radar feature enables refinancing in 10 minutes with no paperwork and no phone calls, representing a dramatic improvement over traditional mortgage refinancing processes that typically span weeks or months. By automating routine monitoring and alerting customers to better rates in real-time, brokers can focus on negotiation, empathy, and complex structuring—the high-value, relationship-driven work that builds loyalty.

While these outcomes sound impressive, the case study lacks specific quantitative metrics that would enable more rigorous assessment. Terms like "considerably faster" and "millions in home loans" are imprecise, and we don't have baseline metrics for comparison. This reflects a common pattern in vendor case studies where specific performance metrics may be considered commercially sensitive or competitive information. Organizations evaluating similar initiatives should seek to establish clearer baseline metrics and success criteria upfront.

The claim that the solution enables refinancing "in only 10 minutes, with no paperwork, no phone calls, only a single tap" requires scrutiny. While the AI agents certainly streamline data collection and form population, mortgage refinancing involves lender approval processes, credit checks, property valuations, and legal documentation that extend beyond Lendi's control. The 10-minute timeframe likely refers to the customer's active time investment in initiating the refinance rather than the end-to-end cycle time from application to settlement.

## Strategic Vision and Future Direction

Lendi's stated ambition to become a "fully AI-based organization by June 2026" represents an aggressive strategic vision. The case study mentions exploring Amazon Bedrock AgentCore for deploying agents in a scalable and secure manner without infrastructure management overhead, which would represent a shift from their current EKS-based approach to a more fully managed service model. This evolution reflects a common trajectory in LLMOps where organizations initially deploy on general-purpose infrastructure they understand (like Kubernetes) and later migrate to specialized managed services as those services mature.

The CTO quote emphasizes that "refinancing happens at the speed of life, not at the speed of paperwork" and attributes this to "intelligent automation, real-time decisioning APIs and a micro-services architecture that coordinates everything from document verification through to settlement, without manual handoffs." This suggests the AI agents are integrated into a broader platform architecture encompassing document verification systems, decisioning engines, and settlement processes—important context that the case study doesn't fully explore.

## Critical Assessment and Limitations

While this case study provides valuable insights into production LLMOps for agentic AI, several limitations warrant consideration. First, as AWS-published promotional content, the post naturally emphasizes successes while likely downplaying challenges, setbacks, or limitations encountered during development and deployment. The 16-week timeline and business outcomes are presented without the nuance of difficulties overcome or capabilities that didn't work as initially envisioned.

Second, the technical architecture description, while more detailed than many case studies, still operates at a relatively high level. Questions remain about prompt engineering specifics, how context is preserved across agent handovers, how the system handles edge cases or customer queries outside expected patterns, error recovery mechanisms when agents fail or provide incorrect information, and specific evaluation frameworks used to validate agent performance before and after deployment.

Third, the multi-agent orchestration approach, while architecturally sophisticated, introduces complexity that may not be necessary for all organizations. The handoff between specialized agents creates potential failure points and requires careful context management. Simpler applications might achieve similar outcomes with fewer specialized agents, and the optimal level of agent specialization likely depends on factors like expected conversation complexity, regulatory requirements, and organizational capabilities.

Fourth, the case study doesn't deeply explore the human-in-the-loop aspects of the system. While it mentions that brokers focus on complex scenarios requiring human judgment, the specifics of when and how the system escalates to human brokers, how brokers interact with the AI-generated insights and recommendations, and how the system learns from broker interventions remain unclear.

Finally, operating costs aren't discussed, which is a common omission in vendor case studies but represents a critical consideration for production LLMOps. Running multiple specialized agents on Amazon Bedrock models, maintaining Kubernetes infrastructure, and storing conversation history and documents all incur ongoing costs that should be weighed against business value delivered.

## Key Takeaways for LLMOps Practitioners

Despite these limitations, the Lendi case study offers several valuable insights for LLMOps practitioners. The multi-agent orchestration approach demonstrates the value of task decomposition and specialization rather than monolithic agent design. The emphasis on comprehensive observability from day one, using tools like Langfuse for agent-level traces and CloudWatch for system-level logs, reflects operational maturity. The integration of guardrails as a first-class architectural component rather than an afterthought shows appropriate consideration for regulated industry requirements.

The strategic use of multiple foundation models for different tasks rather than a one-size-fits-all approach demonstrates cost-conscious and performance-aware system design. The emphasis on evaluation metrics to guide development and model selection represents best practice in LLMOps. The use of prompt versioning and management shows attention to operational practices necessary for maintaining systems over time.

Perhaps most importantly, the case study demonstrates that ambitious LLM-based applications can be deployed in regulated industries within reasonable timeframes when approached with appropriate architecture, tooling, and organizational commitment. The balance Lendi strikes between AI automation and human expertise provides a model for augmentation rather than replacement that may be applicable across many domains.
