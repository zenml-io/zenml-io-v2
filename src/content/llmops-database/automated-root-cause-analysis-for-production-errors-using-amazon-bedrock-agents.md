---
title: "Automated Root-Cause Analysis for Production Errors Using Amazon Bedrock Agents"
slug: "automated-root-cause-analysis-for-production-errors-using-amazon-bedrock-agents"
draft: false
llmopsTags:
  - "healthcare"
  - "code-interpretation"
  - "data-analysis"
  - "prompt-engineering"
  - "agent-based"
  - "error-handling"
  - "system-prompts"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "serverless"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "amazon-aws"
  - "anthropic"
industryTags: "research-academia"
company: "TReNDS"
summary: "The TReNDS Center at Georgia State University developed an automated root-cause analysis system to address the time-consuming process of investigating production errors in their research applications running on Amazon EKS. The team built a pipeline that combines Amazon CloudWatch subscription filters, AWS Lambda, the Strands Agents SDK, and Amazon Bedrock to detect errors in real-time, automatically enrich them with log context and source code from GitHub, and deliver AI-powered root-cause analyses to their engineering team. The solution reduced investigation time from 15-30 minutes down to under 60 seconds per error, while maintaining data residency requirements important for health-related research data. The agent autonomously decides which tools to call based on error patterns, fetches surrounding logs from the same container, retrieves relevant source code, and produces structured analyses including severity assessments, root cause explanations, suggested fixes, and related areas that may be affected."
link: "https://aws.amazon.com/blogs/machine-learning/how-trends-automates-root-cause-analysis-with-amazon-bedrock/"
year: 2026
seo:
  title: "TReNDS: Automated Root-Cause Analysis for Production Errors Using Amazon Bedrock Agents - ZenML LLMOps Database"
  description: "The TReNDS Center at Georgia State University developed an automated root-cause analysis system to address the time-consuming process of investigating production errors in their research applications running on Amazon EKS. The team built a pipeline that combines Amazon CloudWatch subscription filters, AWS Lambda, the Strands Agents SDK, and Amazon Bedrock to detect errors in real-time, automatically enrich them with log context and source code from GitHub, and deliver AI-powered root-cause analyses to their engineering team. The solution reduced investigation time from 15-30 minutes down to under 60 seconds per error, while maintaining data residency requirements important for health-related research data. The agent autonomously decides which tools to call based on error patterns, fetches surrounding logs from the same container, retrieves relevant source code, and produces structured analyses including severity assessments, root cause explanations, suggested fixes, and related areas that may be affected."
  canonical: "https://www.zenml.io/llmops-database/automated-root-cause-analysis-for-production-errors-using-amazon-bedrock-agents"
  ogTitle: "TReNDS: Automated Root-Cause Analysis for Production Errors Using Amazon Bedrock Agents - ZenML LLMOps Database"
  ogDescription: "The TReNDS Center at Georgia State University developed an automated root-cause analysis system to address the time-consuming process of investigating production errors in their research applications running on Amazon EKS. The team built a pipeline that combines Amazon CloudWatch subscription filters, AWS Lambda, the Strands Agents SDK, and Amazon Bedrock to detect errors in real-time, automatically enrich them with log context and source code from GitHub, and deliver AI-powered root-cause analyses to their engineering team. The solution reduced investigation time from 15-30 minutes down to under 60 seconds per error, while maintaining data residency requirements important for health-related research data. The agent autonomously decides which tools to call based on error patterns, fetches surrounding logs from the same container, retrieves relevant source code, and produces structured analyses including severity assessments, root cause explanations, suggested fixes, and related areas that may be affected."
notion:
  pageId: "3b5f8dff-2538-8081-9bbc-ca230769e6b3"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T20:04:00.000Z"
  lastEditedTime: "2026-08-07T20:04:00.000Z"
  publishedAt: "2026-08-07T20:07:58Z"
---

## Overview

The Center for Translational Research in Neuroimaging and Data Science (TReNDS), a joint center of Georgia State University, Georgia Institute of Technology, and Emory University, implemented a production LLMOps system to automate root-cause analysis of application errors. TReNDS develops advanced analytical methods and neuroinformatics tools for brain health research, running infrastructure on AWS since 2019. As their applications grew, so did error volumes requiring investigation. The team recognized that the investigation process—reading stack traces, examining source code, and tracing execution paths—was exactly the kind of reasoning work that foundation models with appropriate tools could handle autonomously.

The implementation represents a mature production use case of agentic AI for operations, moving beyond simple alerting to automated investigation and diagnosis. Rather than just knowing when things break, the system understands why they break, delivering structured analyses that engineers can act on immediately. This case study provides detailed technical implementation guidance while acknowledging that results come from TReNDS's specific environment and don't represent official guidance from the affiliated universities.

## Production Architecture and Infrastructure

The production architecture integrates multiple AWS services into a cohesive error detection and analysis pipeline. Applications running on Amazon EKS send logs to Amazon CloudWatch using FluentBit as the logging agent. CloudWatch subscription filters monitor for error-level patterns including "ERROR", "Exception", "FATAL", and "CRITICAL" strings. When a match occurs, the subscription filter invokes an AWS Lambda function with the compressed log data. The Lambda function runs a Strands Agent powered by Amazon Bedrock that investigates the error autonomously, then publishes the completed analysis to an Amazon SNS topic for delivery to the engineering team via email and Slack.

The architecture is deliberately cloud-native and serverless for the analysis components, avoiding the need to manage additional infrastructure. While the pattern described uses EKS and FluentBit specifically, the team notes it works with any application sending logs to CloudWatch, including ECS, Lambda, EC2, or on-premises workloads using the CloudWatch Agent. This flexibility makes the pattern broadly applicable beyond their specific Kubernetes environment.

Data residency and compliance considerations were important design factors. TReNDS works with health-related research data that may fall under HIPAA requirements. Amazon Bedrock processes all requests within their AWS account, meaning log data and source code stay within the same environment as the rest of their application without requiring data transmission to external endpoints. This alignment with existing security boundaries was a key enabler for production deployment in a research environment handling sensitive data.

## Foundation Model Selection and Evaluation

The team conducted systematic evaluation of multiple Amazon Bedrock models to identify the best fit for their error analysis use case. They evaluated models across four dimensions: reasoning quality (understanding code and errors), tool use reliability (successfully calling their GitHub and CloudWatch tools), latency, and cost per analysis. Their evaluation included Anthropic's Claude family (Haiku, Sonnet, Opus) and Amazon's Nova family (Lite, Pro).

After testing, they selected Claude Sonnet as their primary production model. In their testing, Sonnet consistently produced the most accurate root-cause analyses, successfully tracing through multi-file call chains, identifying subtle issues like missing null checks, and reasoning about concurrency problems. The team notes that for simpler error patterns, other models like Claude Haiku or Amazon Nova Pro could serve as cost-effective alternatives, and the Strands SDK makes model switching a one-line code change, facilitating straightforward experimentation.

The team provides a comparative assessment across models. Claude Sonnet excels at complex multi-file reasoning and subtle code issues with reliable tool use, fast latency, and medium relative cost. Claude Haiku targets straightforward errors and high-volume triage with good tool use, fastest latency, and low cost. Claude Opus handles deep cross-service investigations with reliable tool use, moderate latency, and high cost. Amazon Nova Pro provides general-purpose analysis as a cost-effective option with good tool use, fast latency, and low cost. Amazon Nova Lite focuses on simple error classification for budget workloads with good tool use, fastest latency, and lowest cost. This evaluation framework demonstrates a mature approach to model selection based on production requirements rather than simply choosing the most capable or newest model.

## Agentic Architecture with Tool Use

The core innovation in this implementation is the agentic approach to error investigation. Rather than following hardcoded decision trees or rule-based logic, the agent receives an error and autonomously decides what to investigate. The agent interprets error messages, identifies file paths and class names in stack traces, and determines which source files to retrieve. If initial code review reveals an error originates in a dependency or shared utility, the agent follows that chain without additional prompting.

The team built three custom tools using the Strands Agents SDK, each decorated with the `@tool` decorator. The SDK uses function docstrings and type hints to generate tool descriptions for the foundation model, which then decides when and how to call each tool based on what it discovers in the error.

The first and most critical tool is source code retrieval from GitHub. Stack traces reference file paths and line numbers, but without access to actual implementation code, the agent would be limited to log pattern matching. The tool accepts a file path and repository name in 'owner/repo' format, uses the GitHub API with authentication via AWS Secrets Manager, and returns decoded source code content. This enables the agent to trace execution paths and identify specific code that caused failures, moving from surface-level pattern matching to deep code understanding.

The second tool fetches extended log context from CloudWatch. Subscription filters deliver only the matching log line, which is rarely sufficient for diagnosis. The tool accepts log group name, log stream identifier, timestamp, and a time window (defaulting to 30 seconds). Critically, it scopes to the specific log stream, which identifies the individual container that produced the error. This provides a clean, chronological sequence of events from the same container, including the request that triggered the error, preceding warnings, and the full exception trace, without noise from concurrent requests in other containers.

The third tool mentioned in passing is code search across GitHub repositories, allowing the agent to search for error message strings or related patterns when stack traces are unclear or incomplete.

This tool-based architecture embodies the agentic paradigm. The team doesn't prescribe investigation strategies; they provide capabilities and let the model reason about which to use. A stack trace with clear file paths triggers source code fetches. An error without a stack trace might trigger code base searches for the error message. This flexibility means the team didn't need to anticipate every error type their applications could produce—a critical advantage for real-world production systems that encounter novel failure modes.

## Prompt Engineering and Output Structure

The system prompt shapes how the agent approaches investigation and formats results. The team's prompt establishes the agent's role as "a senior Site Reliability Engineer analyzing production errors" and defines a structured analysis format including severity level (CRITICAL/HIGH/MEDIUM/LOW), root cause explanation, relevant source code context, suggested fix, and related areas that may be affected.

Importantly, the prompt defines output structure but leaves investigation strategy to the model. It doesn't say "first check the stack trace, then fetch file X, then look for null checks." Instead, it establishes what a complete analysis looks like and trusts the model to determine how to get there. This is a sophisticated approach to prompt engineering that leverages the model's reasoning capabilities rather than constraining them with overly prescriptive instructions.

The Lambda handler creates an Agent instance with the chosen Bedrock model, the system prompt, and the list of available tools, then passes the error message along with log group name to the agent. This triggers the autonomous investigation loop where the model iteratively calls tools, reviews results, and decides next steps until it has sufficient information to produce the structured analysis.

## Production Operations and Cost Management

In production, the system demonstrates strong operational characteristics. Investigation time dropped from 15-30 minutes of engineer time down to under 60 seconds for the automated analysis. Because analyses include suggested fixes, engineers often receive ready solutions and can proceed directly to implementation rather than spending time on diagnosis. The team reports that developer feedback has been consistently positive, with analyses providing clear starting points for resolution even for errors engineers haven't encountered before.

Cost management is achieved through multiple mechanisms. Each analysis incurs only minimal Amazon Bedrock inference charges, typically involving two to three tool-use rounds per error. For their workload, this represents a fraction of what equivalent engineer time would cost, making the ROI straightforward.

The team implemented deduplication using Amazon DynamoDB to handle repeated errors from the same code path, especially common after releases. Only the first occurrence of an error triggers an analysis; subsequent identical errors are silently filtered. This keeps inboxes clean, reduces noise for the team, and controls Amazon Bedrock costs by avoiding redundant analyses of known issues.

The serverless Lambda-based architecture means the team pays only for actual error analysis execution, with no infrastructure running idle. This aligns cost directly with value delivered.

## Data Handling and Compliance Considerations

The case study acknowledges important considerations around data handling for health-related research. TReNDS handles data that may fall under HIPAA requirements, making data residency and compliance critical. The team emphasizes that Amazon Bedrock processes requests within their AWS account, keeping log data and source code within the same environment as their applications. This is presented as an advantage over solutions requiring data transmission to external endpoints.

However, it's worth noting that while the architecture keeps data within AWS, it still involves sending potentially sensitive error logs and source code to Amazon Bedrock's foundation models. Organizations should evaluate whether their specific compliance requirements permit this, as interpretations of HIPAA and similar regulations vary. The case study mentions AWS HIPAA Eligible Services but doesn't claim HIPAA compliance for this specific implementation. Teams implementing similar systems should conduct their own compliance assessments and potentially implement additional controls like log sanitization, PII detection, or restricted tool access based on data sensitivity.

## Deployment and Implementation Details

The implementation uses the official Strands Agents Lambda layer for deployment, avoiding the need to manually bundle the SDK. The team stores GitHub authentication tokens in AWS Secrets Manager, retrieving them at runtime. The Lambda function requires IAM permissions for Amazon Bedrock, CloudWatch Logs, AWS Secrets Manager, and SNS.

CloudWatch subscription filters are configured at the log group level with patterns matching error indicators. The team doesn't specify exact filter patterns but implies they match common error strings across their application logs. The subscription filter immediately invokes Lambda when patterns match, providing near-real-time error analysis.

The SNS topic enables fan-out to multiple notification channels. The team currently uses email and Slack, but the architecture easily extends to other channels like PagerDuty, Jira, or internal ticketing systems.

## Limitations and Balanced Assessment

While the case study presents strong results, several limitations and considerations warrant mention. The quality of agent analysis depends entirely on tool quality and availability. If source code isn't accessible (private repositories without proper credentials, deleted branches, proprietary dependencies), the agent's analysis degrades to log interpretation only. The team doesn't discuss error handling for tool failures or how the agent behaves when GitHub API rate limits are hit or repositories are unavailable.

The deduplication mechanism prevents repeated analysis of the same error but requires careful implementation. Overly aggressive deduplication might suppress genuinely different errors that happen to match the same pattern. The team doesn't detail their deduplication logic, making it unclear how they distinguish between truly identical errors and similar-but-distinct issues.

Cost claims of "negligible" and "a fraction of engineer time" aren't quantified with specific numbers. While the direction is certainly positive, actual cost-benefit analysis would depend on error volumes, model choice, and tool call patterns. High-traffic applications with diverse error patterns might see higher costs than the TReNDS environment, especially if using more expensive models like Claude Opus.

The evaluation of model performance is qualitative ("consistently produced the most accurate") rather than quantitative. The team doesn't provide metrics like accuracy rates, false positive/negative rates, or systematic comparison of model outputs against human expert analysis. This makes it difficult to assess absolute performance levels or reproduce their evaluation.

The case study focuses on happy path scenarios where the agent successfully investigates and identifies root causes. It doesn't discuss failure modes, ambiguous cases, or situations where the agent produces incorrect or misleading analyses. In production, such cases inevitably occur, and handling them gracefully is critical for maintaining engineer trust in the system.

## Future Roadmap and Extensions

The team outlines several planned extensions that demonstrate thoughtful evolution of the system. The first priority is integrating Retrieval Augmented Generation with internal runbooks through Amazon Bedrock Knowledge Bases. This would enable the agent to reference TReNDS-specific procedures and past incident reports in its analysis, moving from generic code analysis to organization-specific contextual recommendations.

They plan to implement a tiered model strategy where simple, known error patterns route to Claude Haiku for fast, low-cost triage, while complex or novel errors escalate to Claude Sonnet for deep analysis. This optimization would balance cost and response time across their error volume, representing a mature approach to production LLMOps where different workloads match to appropriate model capabilities.

The most ambitious extension is automated GitHub issue and pull request creation. When the agent identifies a potential fix, it would automatically create a GitHub issue with the analysis and open a pull request with suggested code changes. This would close the loop from error detection to proposed remediation without manual intervention. However, this raises important questions about code review processes, testing, and human oversight before merging AI-generated code changes.

Finally, the team mentions exploring Amazon Bedrock AgentCore for managed agent runtime, observability, and identity management as they scale the system further. This suggests awareness that their current custom implementation may benefit from managed services as complexity grows.

## LLMOps Maturity and Production Readiness

This case study represents a relatively mature production LLMOps implementation. The team didn't just prototype an interesting idea; they deployed a system that handles real production errors, delivers value daily, and has been refined based on operational experience. Several indicators point to this maturity level.

The system integrates with existing infrastructure (EKS, CloudWatch, GitHub) rather than requiring parallel systems. Engineers receive analyses through existing channels (email, Slack) rather than needing to adopt new tools. This integration with existing workflows is critical for adoption.

The architectural choices reflect production concerns: serverless for cost efficiency, IAM and Secrets Manager for security, SNS for reliable delivery, DynamoDB for deduplication state. These aren't research prototype choices; they're selections made by a team operating a production system.

The model evaluation process, while not quantitative, shows systematic comparison of multiple options rather than simply choosing the latest or most marketed model. The recognition that different models suit different use cases, and the architectural flexibility to switch between them, demonstrates sophisticated thinking about LLMOps tradeoffs.

The roadmap items focus on operational concerns like cost optimization (tiered models), organizational context (runbook integration), and reducing manual work (automated PR creation). These are the concerns of a team that has moved past "does it work?" to "how do we make it work better?"

However, the case study also shows areas where further maturity would be valuable. Observability of agent behavior (which tools were called, why, what reasoning occurred) isn't discussed. Systematic evaluation of analysis quality against human expert judgment isn't mentioned. Mechanisms for handling incorrect analyses or incorporating human feedback to improve future performance aren't described. These represent opportunities for further refinement as the system scales.

## Broader Implications for LLMOps

This case study illustrates several broader trends and lessons in production LLMOps. First, it demonstrates the power of agentic architectures that reason and act rather than simply generating text. By giving the model tools to fetch logs and source code, the team created a system that investigates rather than just summarizes. This represents a qualitatively different capability from earlier generations of LLM applications.

Second, it shows the value of foundation model flexibility. The ability to switch between models with minimal code changes, evaluate multiple options empirically, and match model capabilities to workload requirements is a key enabler of production LLMOps. Teams need frameworks and architectures that treat the model as a component rather than the entire solution.

Third, the case study highlights the importance of integration with existing systems. The most sophisticated AI capabilities deliver limited value if they exist in isolation. By connecting to CloudWatch, GitHub, SNS, and existing notification channels, the team created a system that fits naturally into existing workflows rather than demanding process changes.

Fourth, the focus on specific, high-value use cases demonstrates pragmatic LLMOps strategy. The team didn't try to "AI-ify everything." They identified a specific, time-consuming task that foundation models with appropriate tools could handle well, and built a focused solution for that task. This targeted approach is more likely to succeed than broad, unfocused AI initiatives.

Finally, the data residency and compliance considerations remind us that LLMOps in regulated or sensitive environments requires careful thought about where data flows and how models process it. The team's choice of Amazon Bedrock was explicitly influenced by data residency requirements, illustrating that technical capabilities alone don't determine production suitability—operational context matters enormously.
