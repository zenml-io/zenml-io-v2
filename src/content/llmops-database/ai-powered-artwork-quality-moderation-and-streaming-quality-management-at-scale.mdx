---
title: "AI-Powered Artwork Quality Moderation and Streaming Quality Management at Scale"
slug: "ai-powered-artwork-quality-moderation-and-streaming-quality-management-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6931669856ee8242f07f11f6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:33:18.433Z"
  createdOn: "2025-12-04T10:46:48.768Z"
llmopsTags:
  - "content-moderation"
  - "classification"
  - "data-analysis"
  - "realtime-application"
  - "multi-modality"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "error-handling"
  - "mcp"
  - "evals"
  - "few-shot"
  - "langchain"
  - "monitoring"
  - "api-gateway"
  - "load-balancing"
  - "databases"
  - "serverless"
  - "orchestration"
  - "guardrails"
  - "fastapi"
  - "anthropic"
  - "amazon-aws"
industryTags: "media-entertainment"
company: "Amazon Prime Video"
summary: "Amazon Prime Video faced challenges in manually reviewing artwork from content partners and monitoring streaming quality for millions of concurrent viewers across 240+ countries. To address these issues, they developed two AI-powered solutions: (1) an automated artwork quality moderation system using multimodal LLMs to detect defects like safe zone violations, mature content, and text legibility issues, reducing manual review by 88% and evaluation time from days to under an hour; and (2) an agentic AI system for detecting, localizing, and mitigating streaming quality issues in real-time without manual intervention. Both solutions leveraged Amazon Bedrock, Strands agents framework, and iterative evaluation loops to achieve high precision while operating at massive scale."
link: "https://www.youtube.com/watch?v=2yK1IUC5bi0"
year: 2025
seo:
  title: "Amazon Prime Video: AI-Powered Artwork Quality Moderation and Streaming Quality Management at Scale - ZenML LLMOps Database"
  description: "Amazon Prime Video faced challenges in manually reviewing artwork from content partners and monitoring streaming quality for millions of concurrent viewers across 240+ countries. To address these issues, they developed two AI-powered solutions: (1) an automated artwork quality moderation system using multimodal LLMs to detect defects like safe zone violations, mature content, and text legibility issues, reducing manual review by 88% and evaluation time from days to under an hour; and (2) an agentic AI system for detecting, localizing, and mitigating streaming quality issues in real-time without manual intervention. Both solutions leveraged Amazon Bedrock, Strands agents framework, and iterative evaluation loops to achieve high precision while operating at massive scale."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-artwork-quality-moderation-and-streaming-quality-management-at-scale"
  ogTitle: "Amazon Prime Video: AI-Powered Artwork Quality Moderation and Streaming Quality Management at Scale - ZenML LLMOps Database"
  ogDescription: "Amazon Prime Video faced challenges in manually reviewing artwork from content partners and monitoring streaming quality for millions of concurrent viewers across 240+ countries. To address these issues, they developed two AI-powered solutions: (1) an automated artwork quality moderation system using multimodal LLMs to detect defects like safe zone violations, mature content, and text legibility issues, reducing manual review by 88% and evaluation time from days to under an hour; and (2) an agentic AI system for detecting, localizing, and mitigating streaming quality issues in real-time without manual intervention. Both solutions leveraged Amazon Bedrock, Strands agents framework, and iterative evaluation loops to achieve high precision while operating at massive scale."
---

## Overview

This case study presents two distinct but complementary production LLM implementations at Amazon Prime Video, presented by Brian Breck (Principal Engineer, Partner Experience Team) and Mona (Senior Manager, Data Engineering). Both use cases demonstrate how Prime Video operates AI systems at massive scale—serving over 200 million Prime members globally, streaming to 300+ million monthly viewers, and handling peak loads like 18 million concurrent viewers during Thursday Night Football games.

The two use cases showcase different aspects of LLMOps maturity: (1) Brian's artwork quality moderation system, which uses multimodal LLMs to automatically validate content from partners, and (2) Mona's streaming quality management system, which uses a multi-agent architecture to detect, diagnose, and mitigate service issues autonomously. Both implementations heavily leverage AWS's Bedrock service and the open-source Strands agents framework, demonstrating practical approaches to rapid prototyping, evaluation, and production deployment of AI systems.

## Use Case 1: Artwork Quality Moderation (Brian Breck)

### Business Context and Problem Statement

Prime Video receives artwork from content partners including major studios, independent filmmakers, and networks like Peacock, PBS, NFL, MLB, and NBA. This artwork represents movies, TV shows, channels, and carousels across the streaming platform and marketing materials. The artwork must meet Prime Video's technical requirements across multiple dimensions including safe zones (areas that won't be cropped), logo and text placement, mature content detection, pixelation issues, localization requirements, and accessibility considerations like color blindness support.

The scale of the problem is substantial: Prime Video operates in 240+ countries and territories, supports 30+ languages, and must serve artwork to hundreds of different device types with varying form factors—from mobile phones to tablets, laptops, and TVs. Each form factor requires different cropping and overlay considerations. The traditional approach involved manual evaluators reviewing every piece of artwork submitted by partners, creating a bottleneck that could delay content publication by multiple days as feedback cycled between evaluators and partners through multiple iterations.

Prime Video tracks over 30 different defect types in artwork, and this number continues to grow. Building traditional ML models for each defect type was time-consuming and resource-intensive, requiring extensive data collection, model training, and ongoing maintenance. The traditional approach also struggled with data quality issues, as manual evaluators didn't always follow consistent standard operating procedures, leading to inconsistent ground truth data that leaked into training datasets.

### Solution Architecture and Technical Implementation

Brian's team started their journey with Q CLI (now folded into Amazon Q Hero), using it to rapidly generate initial algorithms and experiment with different foundation models. This allowed them to move quickly from concept to proof-of-concept, validating that multimodal LLMs could effectively detect certain artwork defects. While the initial results were promising anecdotally, the team needed a systematic approach to evaluate and improve performance.

The production solution centers on an evaluation framework built with Strands agents. The architecture includes several key components working in concert. At the core is an orchestrator built with Strands that delegates artwork evaluation tasks to specialized agents. The system takes as input datasets with ground truth annotations and initial configuration parameters like model selection and temperature settings. The API layer sits behind CloudFront and load balancers, accepting user requests and storing configuration in DynamoDB tables.

The evaluation subject agent performs the actual defect detection on individual pieces of artwork, processing each asset and writing results to S3 buckets. Once all artwork in a batch has been processed, a results calculator generates statistical benchmarks comparing the automated results against ground truth data and previous evaluation runs. This provides quantitative metrics on precision, recall, and other performance indicators.

A particularly innovative component is the "judge" agent, which provides qualitative analysis when pass/fail metrics alone are insufficient for improvement decisions. The judge examines evaluation results and provides contextual feedback on why specific artwork failed detection, what could be improved, and how the system might be tuned. While expensive to run, the judge has proven critical for establishing certain defect detection mechanisms. The team configures judges selectively through DynamoDB, only invoking them when the additional context justifies the cost.

The prompt improver agent represents the system's self-improvement capability. It analyzes both the defect detection results and the calculated statistics to determine next steps, which might include modifying prompts, suggesting different foundation models, or adjusting configuration parameters like temperature or context window size. These improved configurations are written back to DynamoDB and can automatically feed into subsequent evaluation runs, creating an autotuning mechanism that operates largely hands-off.

Strands provides several critical capabilities that simplified the implementation. First, it abstracts interaction with LLMs, providing a consistent interface regardless of which foundation model is being invoked. Second, it enables easy creation of relationships between agents, allowing them to call each other and pass data efficiently. Third, it offers out-of-the-box tools including an image reader for preparing artwork for multimodal LLMs, file read/write operations for intermediate image manipulation, and the ability to use agents themselves as tools that other agents can invoke.

The team also developed custom tools specific to their use cases. For safe zone detection, they created a crop image tool that simulates different device form factors. They built a transparency check tool for readability and accessibility analysis. These custom tools integrate seamlessly with Strands' built-in capabilities, and the toolkit has grown significantly as new defect types have been addressed.

### Evaluation and Iterative Improvement

The evaluation loop represents a sophisticated approach to LLMOps that goes beyond simple accuracy metrics. The team maintains datasets of approximately 2,000 manually annotated images representing ground truth for various defect types. However, they discovered that their initial ground truth data was inconsistent because different manual evaluators applied different criteria—some would pass artwork that others would fail.

This discovery led to an important intervention: the team established formal standard operating procedures (SOPs) for manual evaluators that would be shared with both human reviewers and automated systems. This ensured consistent evaluation criteria, which in turn produced higher quality ground truth datasets. The improved data quality was essential for breaking through local maximums in precision that the team had been encountering, where fixing one false positive would create another false negative.

The evaluation framework provides multiple views of results beyond just pass/fail statistics. Engineers can view artwork in different contexts—for example, seeing how a movie poster appears in mobile view versus web view. The system generates comparative benchmarks showing how each evaluation run performs against both ground truth and previous iterations. For problematic cases, the system enables drill-down to individual artwork level, where engineers can examine the specific reasons for failures and the judge's qualitative feedback.

The team learned that attempting to evaluate multiple defect types simultaneously was counterproductive, even as context windows have grown larger. Instead, they broke the problem down into individual defect types, ranked them by frequency of occurrence and manual effort required, and tackled them one at a time. This focused approach allowed for more targeted prompt engineering and model selection per defect type.

An interesting application of generative AI throughout the development lifecycle emerged: the team used Claude to improve prompts specifically for Claude itself, finding that LLMs were effective at identifying weaknesses in prompts and suggesting model-specific improvements. This meta-application of AI to improve AI systems proved highly valuable.

### Production Runtime Architecture

The production system uses a simplified architecture compared to the evaluation framework, taking the refined configurations and deploying them for real-time partner use. Configuration parameters determined through the evaluation loop are loaded into AWS AppConfig, providing centralized configuration management. When partners upload artwork through Prime Video's portal, the request flows through API Gateway and is delegated to parallel processing modules, each representing a specific defect detection mechanism.

Each defect detection module reads its configuration from AppConfig, combines it with the artwork being evaluated, and invokes Amazon Bedrock to generate results. The parallel architecture enables simultaneous evaluation across all defect types, significantly reducing overall processing time. Results are returned to partners in near real-time—typically within a minute compared to the multi-day delays of manual review.

The system isn't positioned as infallible. When partners receive results they disagree with, they can override the automated decision, which routes the artwork to a manual evaluator's queue using the traditional process. This human-in-the-loop fallback provides a safety mechanism while also generating additional training data. However, the impact has been dramatic: the system reduced the proportion of artwork requiring manual review from 100% to approximately 10-12%, an 88% reduction in manual effort.

### Technical Tools and Infrastructure

The solution leverages several AWS services in concert. Amazon Bedrock provides the foundation model access and model management capabilities. The team experiments with multiple models including Claude and other multimodal LLMs available through Bedrock. CloudFront and Application Load Balancers handle request distribution and provide global reach. DynamoDB stores configuration data, ground truth annotations, and evaluation metadata. S3 serves as the repository for artwork assets and evaluation results. API Gateway provides the external interface for partner integrations.

Strands agents framework proved central to the rapid development and iteration cycles. The team estimates that generative AI—including code generation, system design assistance, development support, and evaluation tooling—accounted for approximately 85% of both the evaluation framework and production system development, saving months of engineering effort.

### Results and Outcomes

The quantitative improvements are substantial. Starting from 37% precision with the initial Q CLI-generated proof of concept, the team achieved 78% precision for safe zone detection through iterative refinement. False positives and negatives decreased by 70%. Response time dropped from several days to under an hour in many cases, with most evaluations completing within minutes. The 88% reduction in manual review effort freed evaluators to focus on edge cases and complex scenarios requiring human judgment.

The system has expanded beyond the initial safe zone use case to cover logo and text placement, offensive and mature content detection, text legibility, localization issues, and accessibility concerns. Many of these capabilities are already in production serving partners, with the remainder scheduled for deployment by year end. The success of the approach has extended beyond artwork to other content types—the team now uses the same evaluation framework for validating text content like synopses and metadata, applying the same iterative improvement methodology to detect defects in written content.

## Use Case 2: Streaming Quality Management (Mona)

### Business Context and Problem Statement

Mona's use case addresses a different but equally critical operational challenge: ensuring streaming quality for live events and on-demand content at massive scale. When millions of customers are simultaneously watching high-profile live events like Thursday Night Football or global sports competitions, even brief interruptions can impact thousands or millions of viewing experiences. Traditional operational approaches—manual monitoring of metrics and reactive troubleshooting—simply don't scale to Prime Video's operational demands.

The challenge requires not just monitoring but active understanding of metrics, learning from operational patterns, and autonomous action-taking capability. The system must work with multimodal data including time series metrics, infrastructure logs, player logs, operational graphs, and other telemetry. The solution needed to be accessible to engineering teams without requiring specialized domain expertise, democratizing the ability to investigate and resolve issues.

### Multi-Agent Architecture

Mona's team built an agentic AI system with multiple specialized agents orchestrated using Strands. The architecture is AWS-native and AI-native, using Lambda for authentication and cross-agent orchestration, Athena for querying operational data, and DynamoDB for global state management. The system provides a foundational backend that supports multiple frontend interfaces—it can operate as a chatbot responding to natural language queries from engineers, or it can be autonomously triggered by upstream monitoring systems when issues are detected.

The request handler agent serves as the front gate, authenticating incoming requests, validating their format, and decomposing complex questions into simpler sub-tasks. For example, a question like "What was the rebuffering rate on iPhone devices in Germany over the past week?" gets broken down into: (1) a metric retrieval task, (2) a trend analysis task, and (3) a cohort-specific filtering task covering devices, geography, and time periods. A guardrail agent validates that requests comply with supported capabilities and data access policies.

The routing agent functions as an intelligent orchestrator or traffic controller. After receiving the decomposed request from the handler, it uses chain-of-thought reasoning to determine which capabilities, sub-agents, tools, and data sources need to be invoked to service the request. This routing logic represents the "brain of the operation," mapping abstract operational questions to concrete data access and analysis patterns.

The integrator sub-agent acts as a data access layer, connecting to diverse tools and data sources through Model Context Protocol (MCP). It handles different access patterns, APIs, and data formats, abstracting away the complexity of heterogeneous data sources. The integrator also performs data quality checks, ensuring only validated data enters the analysis pipeline. It understands how to join data from multiple sources using appropriate conditions, combining infrastructure metrics with player logs and other telemetry as needed.

The analysis sub-agent represents a "data scientist in a box." It maintains an ensemble of both large language models and small language models accessible through Bedrock, selecting the appropriate model based on the specific analytical task. Different analysis types might require different model capabilities—time series anomaly detection might use one model while log parsing uses another. This ensemble approach optimizes for both quality and cost, using the minimum model capability necessary for each sub-task.

The reasoning agent takes analysis results and applies business context to validate whether the findings are pertinent and relevant. It uses an LLM-as-a-judge pattern, where an independent LLM evaluates the outputs from the analysis agent. If the reasoning agent determines the analysis is insufficient or inconsistent with business context, it can iteratively invoke different capabilities or request additional data sources. This self-correction loop prevents the system from providing incomplete or misleading answers.

The response handler packages all outputs from the various agents into the expected format—whether that's answering a natural language question, generating complex SQL queries, or triggering autonomous mitigation actions. It interacts with the guardrail agent again to ensure responses comply with data sharing policies and other requirements. The response handler also logs all decisions made by the system, creating an audit trail that supports reflective analysis and continuous improvement.

### Evaluation and Learning Mechanisms

The system incorporates both online and offline evaluation mechanisms. The online evaluation uses the LLM-as-a-judge pattern within the reasoning agent to validate responses in real-time. The offline evaluation analyzes logged decision-making data to identify patterns, failure modes, and improvement opportunities. Building feedback loops early and often was identified as critical to both development efficiency and achieving target accuracy and reliability levels.

The team emphasized that data quality beats data quantity when developing such systems. While there's temptation to include everything—infrastructure logs, metrics, past incidents, tickets, and more—judicious selection of data is essential for efficient context window utilization. Including only the data that actually contributes to correct outcomes improves both performance and cost efficiency.

### Operational Deployment and Safety

The system is designed with explicit failure modes and human escalation paths. While the goal is autonomous operation, the team recognized that novel situations will arise where human evaluation is necessary. Safe failure mechanisms ensure that when the system encounters situations outside its training or capabilities, it appropriately escalates rather than making potentially harmful autonomous decisions.

The architecture supports multiple use cases beyond reactive troubleshooting. Engineers can pose natural language questions about system behavior and receive contextual answers. The system can be triggered automatically by upstream alerting systems to investigate and potentially mitigate detected issues. Future plans include expanding the portfolio of autonomous mitigation levers the system can pull, gradually increasing autonomy as confidence in the system grows.

### Technical Infrastructure and Tools

Like Brian's use case, Mona's implementation heavily leverages Strands for agent orchestration and Amazon Bedrock for foundation model access. AWS Lambda provides serverless compute for coordination tasks. Athena serves both as a query engine and data store for operational telemetry. DynamoDB manages global state across the distributed agent system. The Model Context Protocol (MCP) enables standardized integration with diverse tools and data sources.

The team emphasized using AI throughout the software development lifecycle—not just in the production system but also for accelerating development, building quick prototypes with SageMaker and Strands, and supporting deployment and maintenance activities. This comprehensive adoption of AI tooling enabled rapid iteration and reduced development timelines.

### Results and Lessons Learned

While specific quantitative metrics weren't provided for the streaming quality system, the qualitative outcomes are significant: autonomous detection, localization, and root-causing of streaming issues without manual intervention, dramatically reduced mean-time-to-detection and mean-time-to-resolution, and democratized access to operational insights across engineering teams without requiring specialized expertise.

The lessons learned complement those from Brian's use case. Planning for failure modes ensures safe operation even when autonomous systems encounter novel situations. Continuing to use AI to amplify human expertise—rather than replace it—throughout the SDLC leads to better outcomes. Building more safety mechanisms maintains trust in the system as it takes on more autonomous responsibilities.

## Cross-Cutting LLMOps Themes

Both use cases demonstrate sophisticated approaches to LLMOps that go beyond simply calling foundation models. Several common themes emerge that represent best practices for production LLM deployments:

**Iterative evaluation loops are foundational.** Both teams built comprehensive evaluation frameworks that enabled rapid iteration. Rather than deploying once and hoping for the best, they established continuous evaluation processes that fed improvements back into the systems. This approach treats LLM systems as living artifacts that evolve based on real-world performance.

**Breaking problems into smaller pieces enables progress.** Both teams emphasized decomposing complex tasks into simpler sub-problems. Brian's team ranked defect types and tackled them individually rather than attempting comprehensive coverage immediately. Mona's request handler decomposes complex operational questions into atomic tasks. This decomposition strategy makes problems tractable and enables incremental improvement.

**Agents and orchestration unlock sophisticated behaviors.** Both solutions use multi-agent architectures rather than single LLM calls. Specialized agents focus on specific capabilities—authentication, routing, data integration, analysis, reasoning—and Strands provides lightweight orchestration. This compositional approach is more maintainable and extensible than monolithic prompts attempting to handle all scenarios.

**Evaluation isn't just accuracy metrics.** Both teams go beyond simple precision/recall calculations. Brian's judge agent provides qualitative context on failures. Mona's LLM-as-a-judge validates responses against business context. The evaluation frameworks provide visual inspection tools, comparative benchmarking across runs, and drill-down capabilities for investigating specific failures.

**Prompt engineering remains important but can be partially automated.** Both teams do significant prompt engineering, but they also use LLMs to improve their own prompts. The autotuning capabilities in Brian's system demonstrate how meta-applications of AI can reduce manual tuning burden.

**Human-in-the-loop fallbacks provide safety and training data.** Brian's system allows partner overrides that route to manual review. Mona's system has explicit escalation paths for novel situations. These mechanisms provide safety while also generating additional training data from production use.

**Generative AI accelerates development across the entire lifecycle.** Both teams estimated that AI tooling contributed to 80-85% of development work, from initial proof-of-concept code generation through system design, implementation, evaluation, and monitoring. This comprehensive adoption of AI development tools dramatically compressed timelines.

**AWS Bedrock provides a practical foundation model platform.** Both implementations use Bedrock as their primary model access layer, leveraging its managed service benefits, model variety, guardrails capabilities, and integration with other AWS services. The case studies provide real-world validation of Bedrock's value proposition for production LLM deployments.

**Open-source frameworks like Strands lower adoption barriers.** Strands enabled both teams to prototype quickly, experiment with different agent architectures, and move from concept to production rapidly. Its lightweight design and intuitive development model reduced the engineering investment required compared to building custom orchestration logic.

## Critical Assessment and Limitations

While both case studies present impressive results, several caveats warrant consideration. The presentation context—an AWS conference session with Prime Video as a customer showcase—naturally emphasizes successes over challenges. Some important questions remain underspecified:

**Cost economics are largely unaddressed.** Neither presenter discussed the operational costs of running these LLM-based systems at scale. Token consumption for multimodal artwork analysis across thousands of images daily, or continuous operational monitoring with ensemble LLM models, likely represents significant expenditure. The business case depends on these costs being justified by the efficiency gains, but no comparative economics were provided.

**Model performance edge cases receive limited discussion.** Both presenters acknowledge imperfect systems—Brian mentions 78% precision on safe zones, not 100%—but the characteristics of failures aren't deeply explored. Understanding when and why these systems fail is critical for setting appropriate expectations and ensuring safe deployment.

**Latency and throughput characteristics are understated.** Brian mentions "within a minute" for artwork evaluation and Mona describes "real-time" detection, but detailed latency distributions, p99 performance, and throughput limits aren't specified. For operational systems serving millions of users, these characteristics matter significantly.

**The generalizability to other contexts is uncertain.** Prime Video has substantial engineering resources, deep AWS partnerships, and scale that justifies significant AI investment. Smaller organizations might struggle to replicate these approaches without comparable resources. The presenters don't address what components are reusable versus custom-built for Prime Video's specific needs.

**Human oversight requirements remain significant despite automation.** While manual review dropped 88% for artwork, that still represents hundreds or thousands of daily human reviews at Prime Video's scale. The operational model still requires maintaining human evaluation pipelines, training evaluators, and managing escalations.

**Data quality improvements may provide much of the benefit.** Brian's team established formal SOPs for evaluators and cleaned their ground truth data, discovering significant inconsistencies. It's plausible that improved process rigor and data quality contribute as much to the outcomes as the AI systems themselves, though the presentation attributes success primarily to the AI implementation.

**The Strands framework's maturity and production-readiness are unclear.** While presented as lightweight and enabling rapid development, Strands is relatively new open-source software. The case studies don't address operational challenges like debugging agent interactions, handling framework bugs, or managing version upgrades in production systems.

**Security and compliance considerations receive minimal attention.** Both systems process content and operational data with business sensitivity, but discussion of security controls, data access governance, or compliance requirements is absent. In production environments, these concerns often dominate architecture decisions.

Despite these limitations, the case studies provide valuable insights into practical LLMOps at substantial scale. The emphasis on evaluation frameworks, iterative improvement, and compositional agent architectures represents solid engineering practice. The transparency about imperfect precision and the need for human fallbacks demonstrates appropriate caution. And the quantifiable improvements in efficiency and response times validate that these approaches deliver real business value, even if the complete picture includes complexities not fully addressed in a conference presentation.