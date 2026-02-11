---
title: "Multi-Agent AI Systems for IT Operations and Incident Management"
slug: "multi-agent-ai-systems-for-it-operations-and-incident-management"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6911eefc584d08b3a1ab7876"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:26:24.295Z"
  createdOn: "2025-11-10T13:56:12.853Z"
llmopsTags:
  - "customer-support"
  - "classification"
  - "internet-of-things"
  - "data-analysis"
  - "poc"
  - "rag"
  - "prompt-engineering"
  - "few-shot"
  - "multi-agent-systems"
  - "agent-based"
  - "cost-optimization"
  - "embeddings"
  - "vector-search"
  - "error-handling"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "serverless"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "cicd"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "langchain"
  - "amazon-aws"
industryTags: "tech"
company: "Kolomolo / DeLaval / Arelion"
summary: "Kolomolo, an AWS advanced partner, implemented two distinct AI-powered solutions for their customers DeLaval (dairy farm equipment manufacturer) and Arelion (global internet infrastructure provider). For DeLaval, they built Unity Ops, a multi-agent system that automates incident response and root cause analysis across 3,000+ connected dairy farms, processing alerts from monitoring systems and generating enriched incident tickets automatically. For Arelion, they developed a hybrid ML/LLM solution to classify and extract critical information from thousands of maintenance notification emails from over 100 vendors, reducing manual classification workload by 80%. Both solutions achieved over 95% accuracy while maintaining cost efficiency through strategic use of classical ML techniques combined with selective LLM invocation, demonstrating significant operational efficiency improvements and enabling engineering teams to focus on higher-value tasks rather than reactive incident management."
link: "https://www.youtube.com/watch?v=o8kpPhCCijE"
year: 2025
seo:
  title: "Kolomolo / DeLaval / Arelion: Multi-Agent AI Systems for IT Operations and Incident Management - ZenML LLMOps Database"
  description: "Kolomolo, an AWS advanced partner, implemented two distinct AI-powered solutions for their customers DeLaval (dairy farm equipment manufacturer) and Arelion (global internet infrastructure provider). For DeLaval, they built Unity Ops, a multi-agent system that automates incident response and root cause analysis across 3,000+ connected dairy farms, processing alerts from monitoring systems and generating enriched incident tickets automatically. For Arelion, they developed a hybrid ML/LLM solution to classify and extract critical information from thousands of maintenance notification emails from over 100 vendors, reducing manual classification workload by 80%. Both solutions achieved over 95% accuracy while maintaining cost efficiency through strategic use of classical ML techniques combined with selective LLM invocation, demonstrating significant operational efficiency improvements and enabling engineering teams to focus on higher-value tasks rather than reactive incident management."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-ai-systems-for-it-operations-and-incident-management"
  ogTitle: "Kolomolo / DeLaval / Arelion: Multi-Agent AI Systems for IT Operations and Incident Management - ZenML LLMOps Database"
  ogDescription: "Kolomolo, an AWS advanced partner, implemented two distinct AI-powered solutions for their customers DeLaval (dairy farm equipment manufacturer) and Arelion (global internet infrastructure provider). For DeLaval, they built Unity Ops, a multi-agent system that automates incident response and root cause analysis across 3,000+ connected dairy farms, processing alerts from monitoring systems and generating enriched incident tickets automatically. For Arelion, they developed a hybrid ML/LLM solution to classify and extract critical information from thousands of maintenance notification emails from over 100 vendors, reducing manual classification workload by 80%. Both solutions achieved over 95% accuracy while maintaining cost efficiency through strategic use of classical ML techniques combined with selective LLM invocation, demonstrating significant operational efficiency improvements and enabling engineering teams to focus on higher-value tasks rather than reactive incident management."
---

## Overview

This case study presents two sophisticated LLMOps implementations by Kolomolo, an AWS advanced partner, for two distinct customers: DeLaval, a 150-year-old dairy farm equipment manufacturer undergoing digital transformation, and Arelion, one of the world's largest internet infrastructure providers. Both solutions showcase production-grade multi-agent and hybrid AI systems designed to address operational efficiency challenges at scale, with particular emphasis on cost optimization, observability, and maintaining high accuracy in production environments.

## DeLaval Use Case: Unity Ops for Incident Management

DeLaval manufactures dairy farm equipment including milking robots, cooling tanks, and air compressors, and has been building digital services on AWS to provide predictive analytics and monitoring for their customers' farms. Their edge infrastructure runs customized Linux distributions using the Yocto framework with AWS Greengrass for secure connectivity, collecting telemetry data from farm equipment and cow ear tags. With a microservices-based serverless architecture heavily utilizing Lambda, DynamoDB, and S3, they process data to deliver services like behavioral analysis for optimal cow insemination timing.

The operational challenge DeLaval faced was managing incidents across a complex technology landscape. Each farm represents a "technical backpack" of interconnected industrial computers and systems that have been accumulated over decades. As they scaled their monitoring capabilities and defined SLIs (Service Level Indicators) and SLOs (Service Level Objectives), they generated increasing numbers of alerts from systems like Grafana and CloudWatch. The incident response process involved complex human coordination - depicted in the presentation as a web of people calling each other to dispute issues and route tickets appropriately across thousands of products deployed to farms.

### Unity Ops: Multi-Agent Architecture

Kolomolo developed Unity Ops (named after the hive-mind character from Rick and Morty) as a multi-agent system where each agent specializes in a specific domain. The architecture leverages multiple agents working collaboratively, including:

- **Obsini Agent**: Receives alerts from the monitoring platform (in this case Opsgenie/Obsini) and retrieves full alert details via API
- **Format Agent**: Ensures incidents conform to DeLaval's specific Jira ticket format requirements
- **Knowledge Base Agent**: Implements RAG (Retrieval-Augmented Generation) for two critical functions: retrieving troubleshooting playbooks for specific alert types, and searching historical Jira tickets for similar past incidents to enrich current tickets with resolution information and root cause analysis
- **Jira Agent**: Consolidates information from all other agents and creates the incident ticket
- **GitHub Code Agent**: Specialized in analyzing code repositories to identify potential code-level causes
- **Log Analysis Agent**: Examines system logs for diagnostic information
- **CMDB Agent**: Queries the Configuration Management Database for infrastructure state
- **Manager Agent**: Orchestrates conversation between agents to reach consensus

The system operates through two distinct conversational patterns. The static workflow follows a predefined sequence for standard incident processing, reflecting the known steps that support teams typically follow. However, Unity Ops also implements a dynamic group chat pattern where agents engage in open debate to perform root cause analysis - multiple agents discuss the incident, comparing it against historical tickets, evaluating device relationships, farm associations, and determining relevance and causation.

### Technical Implementation for DeLaval

The architecture is fully serverless and event-driven on AWS. Alerts from monitoring systems (Grafana, CloudWatch, Sentry, or Opsgenie) flow through SNS topics or API Gateway endpoints, triggering Lambda functions that host the multi-agent orchestration logic. Each agent connects to AWS Bedrock, with different agents configured to use different foundation models based on their specific tasks - a key optimization for balancing performance and cost.

All agent conversations, traces, and tokens are logged to DynamoDB using a single-table design pattern with clear access patterns defined from the beginning, enabling queries by workflow, agent, and timestamp. This comprehensive logging serves multiple purposes: audit trails, debugging, cost tracking, and most importantly, providing transparency into the agent decision-making process. Kolomolo built a custom observability and metrics frontend that displays the actual conversations between agents - this proved crucial for building trust with non-technical stakeholders who could see how agents communicate, debate, and reach consensus.

The RAG implementation is particularly sophisticated, serving dual purposes. One vector store contains troubleshooting playbooks indexed by alert type, enabling quick retrieval of standard operating procedures. The second vector store indexes historical Jira tickets, allowing the system to find similar past incidents and extract their resolutions, root causes, and remediation steps. This historical context significantly enriches automatically-generated tickets.

Infrastructure is deployed using AWS CDK, following infrastructure-as-code principles. The system currently monitors approximately 3,000 connected farms with plans to scale to 7,000 by the following year and 20,000-30,000 farms within five years. At this scale, the automation becomes essential - the speakers noted that while automated incident creation initially increases the total number of incidents (because everything is now captured), it dramatically reduces customer-initiated tickets by catching issues proactively.

### Future Roadmap and Automation

The presentation outlined an ambitious vision for full autonomy. The next phase involves agents not just analyzing and documenting issues but actually remediating them. The described scenario involves the AI system detecting an error in logs, analyzing GitHub code to identify missing exception handling (try-catch blocks), automatically implementing the fix, and submitting a merge request with appropriate CI/CD guardrails for senior engineer approval before deployment. This represents a progression from monitoring and alerting to autonomous self-healing infrastructure.

The operational efficiency gains were substantial - Kolomolo reported an 80% reduction in time their Site Reliability Engineering (SRE) staff spend on reactive ticket handling. This freed engineers from repetitive tasks like determining whether a farm machine offline was due to power cuts, OS failures, or network issues, allowing them to focus on higher-value engineering work.

## Arelion Use Case: Email Classification and Entity Extraction

Arelion operates one of the world's largest internet backbone networks spanning from Mexico to Singapore, with approximately 70% of global internet traffic touching their infrastructure in some capacity. They serve hyperscalers, carriers, and enterprises, relying on hundreds of different equipment suppliers and subcontractors for their global network.

The operational challenge stemmed from the constant stream of maintenance notifications from over 100 different vendors. These suppliers send emails about planned maintenance windows, link downtimes, and network changes in various formats (HTML, Excel spreadsheets, plain text), different languages, and with no standardized structure. Human operators manually classified these emails, identified maintenance notifications versus other communication types (inquiries, contractual questions, general correspondence), extracted critical information (affected services, locations, maintenance windows, expected impact), and entered this data into their CCMT (Change Management Tool) to notify affected customers.

This manual process was resource-intensive, didn't scale with increasing email volume, and created delays in customer notification. Moreover, if vendors changed their email formats or structure, the process broke down entirely. Traditional rule-based approaches were deemed impractical because they would require thousands of brittle rules that would constantly break with minor format changes (even something as simple as an extra space character could break pattern matching).

### Hybrid ML and LLM Solution

Kolomolo designed a hybrid solution combining classical machine learning for classification with generative AI for entity extraction. This architectural decision was driven by cost optimization - using frontier LLMs for high-volume email classification would be economically unsustainable, but pure ML approaches lacked the flexibility needed for the varied email formats.

**Classification Layer (Classical ML):** The first stage vectorizes incoming emails and compares them against a trained model that maintains a hypersphere representation of maintenance notification characteristics in vector space. The system uses XGBoost, a gradient boosting classification algorithm, which provides not just binary classification but confidence scores. Emails are classified as maintenance notifications or other types, with a probability score indicating certainty. Low-confidence classifications are routed to a manual review queue where human operators make final determinations. This approach achieved approximately 95% accuracy for classification with sub-second processing time.

**Entity Extraction Layer (Generative AI):** Once an email is classified as a maintenance notification, it proceeds to the LLM-based entity extraction phase. This uses AWS Bedrock with a dual-layer approach - heavy, complex extraction tasks are routed to more capable frontier models, while simpler extraction tasks use smaller, more cost-efficient models. This selective routing based on task complexity optimizes the cost-performance tradeoff.

### Advanced Prompt Engineering: MyPro Algorithm

A particularly interesting technical detail is the use of the MyPro (Mathematical Prompt Optimization) algorithm, research from Stanford University that's implemented in tools like DSPy. Rather than relying solely on human prompt engineering, MyPro uses mathematical optimization to automatically find the best-performing prompts for specific tasks. The algorithm:

- Performs iterative refinement through pattern search over prompt variations
- Evaluates different prompt variants against ground truth data
- Balances exploration of new prompt structures with exploitation of known good patterns
- Continuously updates prompts as requirements or email patterns change
- Dynamically selects examples for few-shot prompting based on the specific email being processed

This automated prompt optimization ensures prompts remain optimal even as vendor email formats evolve, reducing maintenance burden and improving accuracy. The system achieved approximately 97% accuracy in entity extraction with confidence scores, and automatically handled the dynamic adaptation to different email formats without requiring code changes.

### Architecture and Integration

The solution integrates with Arelion's existing email infrastructure, processing incoming emails through the classification pipeline, then the entity extraction pipeline, before automatically inserting extracted information (affected services, maintenance windows, locations, expected durations) directly into their CCMT system. The CCMT then automatically notifies affected customers, dramatically reducing the time between receiving a vendor notification and alerting customers who might be impacted.

The cost optimization achieved through the hybrid approach was remarkable - the presentation claims a 10,000% reduction in classification costs compared to using pure LLM approaches for all emails. This cost efficiency was critical to making the solution economically viable at Arelion's email volumes. The model can also be rapidly retrained as new vendor email formats emerge or existing formats change.

### Business Impact

The solution reduced manual classification workload by approximately 80%, freeing operations staff from repetitive email processing to focus on more strategic tasks. The system's ability to adapt to format changes without code modifications addressed the core scalability challenge - as Arelion's vendor count grows or vendors modify their communication patterns, the solution continues functioning without expensive maintenance or development cycles.

## LLMOps Considerations and Lessons

### Multi-Agent System Design

Both solutions demonstrate sophisticated multi-agent architectures moving beyond monolithic single-agent designs that were standard in late 2023/early 2024. The presentation explicitly references the AutoGen framework from Microsoft (which they refer to as "A2") as inspiration for conversational patterns. They identify several multi-agent patterns:

- **Debate Pattern**: Two agents (e.g., code writer and code reviewer) iterate until consensus
- **Task Router Pattern**: A manager agent assigns tasks to specialized expert agents
- **Dynamic Group Chat**: Multiple agents simultaneously discuss a problem without predefined workflow

The dynamic group chat pattern proved particularly valuable for root cause analysis where the solution path isn't predetermined. Allowing agents to openly debate brings emergent problem-solving capabilities that rigid workflows lack.

### Observability and Trust

A recurring theme was the criticality of observability in production LLM systems. The DeLaval implementation logs every agent interaction, conversation, token usage, and decision point to DynamoDB. The custom-built metrics dashboard doesn't just show outcomes but displays the actual agent conversations. The presenters noted this conversational transparency was the "aha moment" for non-technical stakeholders - seeing agents debate and reach consensus builds trust in AI decision-making in ways that black-box outputs cannot.

This level of observability serves multiple functions:
- **Debugging**: Understand why agents made specific decisions or reached certain conclusions
- **Cost Management**: Track token usage across agents and workflows to identify optimization opportunities
- **Audit**: Maintain records of automated decisions for compliance and review
- **Improvement**: Identify conversation patterns that lead to errors or inefficiencies

### Cost Optimization Strategies

Both implementations prioritize cost efficiency through architectural decisions rather than accepting default LLM pricing:

- **Hybrid Approaches**: Combining classical ML with selective LLM use (Arelion classification)
- **Model Selection**: Using different foundation models for different agent tasks based on complexity
- **Intelligent Routing**: Directing complex tasks to frontier models while handling simpler tasks with smaller models
- **Pre-filtering**: Using cheap classification before expensive entity extraction

The 10,000% cost reduction claim for email classification versus pure LLM approaches illustrates how thoughtful architecture dramatically impacts production economics at scale.

### Continuous Improvement and Adaptation

Both solutions emphasize adaptability. The Arelion system's automated prompt optimization ensures it evolves with changing email formats without manual intervention. The DeLaval system's RAG approach continuously learns from new incidents and resolutions, enriching its knowledge base organically. The speakers noted fast retraining capabilities and dynamic adaptation as key production requirements.

### Production Deployment Patterns

The implementations follow modern LLMOps best practices:
- **Serverless Architecture**: Lambda-based for automatic scaling and cost efficiency
- **Event-Driven**: Using SNS, API Gateway, and event buses for loose coupling
- **Infrastructure as Code**: CDK for reproducible deployments
- **Confidence Scoring**: Human-in-the-loop review for low-confidence predictions
- **Guardrails**: CI/CD controls for automated code changes (future DeLaval capability)

### Critical Assessment

While the presentation demonstrates impressive technical implementations, several considerations warrant balanced evaluation:

**Claimed Metrics**: The 10,000% cost reduction and 80% operational efficiency improvements are presented without detailed methodology or baseline comparisons. These figures come from a vendor presentation to potential customers, so independent verification would strengthen credibility.

**Accuracy Figures**: The 95-97% accuracy claims for classification and extraction are strong, but the presentation doesn't discuss error types, edge cases, or failure modes. Understanding what happens in the 3-5% of cases where the system fails would provide a more complete picture.

**Scaling Evidence**: While DeLaval plans to scale from 3,000 to 30,000 farms, the current deployment represents the lower end of that range. How the system performs at 10x scale remains to be demonstrated.

**Human-in-the-Loop Dependencies**: Both solutions retain human review queues for low-confidence cases. The proportion of cases requiring human intervention and whether this creates bottlenecks isn't fully detailed.

**Vendor Perspective**: Kolomolo is presenting their own solutions to attract customers, so claims should be evaluated with appropriate skepticism. However, the presence of actual customer representatives (DeLaval's Eva and Arelion's Yokim) who corroborate the implementations lends credibility.

**Future Autonomy Risks**: The vision of AI automatically committing code changes to production infrastructure, even with human approval gates, introduces significant risk. The presentation acknowledges this requires building confidence over time, but the potential for autonomous systems to introduce critical bugs or security vulnerabilities deserves careful consideration.

Despite these considerations, the case studies represent sophisticated production LLM deployments addressing real operational challenges with thoughtful architectural approaches to cost, accuracy, and scalability. The emphasis on observability, hybrid approaches, and continuous adaptation reflects mature LLMOps thinking beyond simple proof-of-concept demonstrations.