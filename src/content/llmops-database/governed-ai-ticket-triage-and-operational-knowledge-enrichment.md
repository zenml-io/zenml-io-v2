---
title: "Governed AI Ticket Triage and Operational Knowledge Enrichment"
slug: "governed-ai-ticket-triage-and-operational-knowledge-enrichment"
draft: false
llmopsTags:
  - "customer-support"
  - "classification"
  - "data-integration"
  - "structured-output"
  - "rag"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "fallback-strategies"
  - "cost-optimization"
  - "evals"
  - "serverless"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "documentation"
  - "security"
  - "amazon-aws"
  - "microsoft-azure"
industryTags: "legal"
company: "Aderant"
summary: "Aderant built an Intelligent Ticket Analyzer to reduce the manual investigation required by its 38-person SierraOps team when triaging support tickets across 268 client environments. The serverless workflow uses Amazon Nova Lite through Amazon Bedrock to combine Jira tickets with operational metadata and internal knowledge from Amazon Athena, Confluence, SharePoint, and prior Jira resolutions, then recommend classifications, routing, and next steps. It can perform approved actions such as reassignment and notifications, while sending lower-confidence cases for human review. During the initial 2.5-week production period in 2026, it analyzed 109 tickets with approximately 96% routing accuracy, and Aderant estimated 8–14 engineering hours recovered per week at a total operating cost below $30 per month. These are early operational results rather than a long-term benchmark, and the case demonstrates a controlled automation pattern rather than fully autonomous incident resolution."
link: "https://aws.amazon.com/blogs/machine-learning/aderant-builds-intelligent-ticket-triage-with-amazon-nova/"
year: 2026
seo:
  title: "Aderant: Governed AI Ticket Triage and Operational Knowledge Enrichment - ZenML LLMOps Database"
  description: "Aderant built an Intelligent Ticket Analyzer to reduce the manual investigation required by its 38-person SierraOps team when triaging support tickets across 268 client environments. The serverless workflow uses Amazon Nova Lite through Amazon Bedrock to combine Jira tickets with operational metadata and internal knowledge from Amazon Athena, Confluence, SharePoint, and prior Jira resolutions, then recommend classifications, routing, and next steps. It can perform approved actions such as reassignment and notifications, while sending lower-confidence cases for human review. During the initial 2.5-week production period in 2026, it analyzed 109 tickets with approximately 96% routing accuracy, and Aderant estimated 8–14 engineering hours recovered per week at a total operating cost below $30 per month. These are early operational results rather than a long-term benchmark, and the case demonstrates a controlled automation pattern rather than fully autonomous incident resolution."
  canonical: "https://www.zenml.io/llmops-database/governed-ai-ticket-triage-and-operational-knowledge-enrichment"
  ogTitle: "Aderant: Governed AI Ticket Triage and Operational Knowledge Enrichment - ZenML LLMOps Database"
  ogDescription: "Aderant built an Intelligent Ticket Analyzer to reduce the manual investigation required by its 38-person SierraOps team when triaging support tickets across 268 client environments. The serverless workflow uses Amazon Nova Lite through Amazon Bedrock to combine Jira tickets with operational metadata and internal knowledge from Amazon Athena, Confluence, SharePoint, and prior Jira resolutions, then recommend classifications, routing, and next steps. It can perform approved actions such as reassignment and notifications, while sending lower-confidence cases for human review. During the initial 2.5-week production period in 2026, it analyzed 109 tickets with approximately 96% routing accuracy, and Aderant estimated 8–14 engineering hours recovered per week at a total operating cost below $30 per month. These are early operational results rather than a long-term benchmark, and the case demonstrates a controlled automation pattern rather than fully autonomous incident resolution."
notion:
  pageId: "3e9f8dff-2538-8001-bd73-d23ef5e35a92"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:20:00.000Z"
  lastEditedTime: "2026-09-28T08:21:00.000Z"
  publishedAt: "2026-09-28T08:23:33Z"
---

## Overview

Aderant, a provider of business-management software for the legal industry, deployed an Intelligent Ticket Analyzer for its SierraOps support operation. The team supports Expert Sierra across 268 client environments and processes roughly 34–40 tickets per week. Before the system was introduced, engineers spent approximately 15–25 minutes per ticket interpreting the request, locating client-environment information, identifying the responsible team, searching documentation and ticket history, and assigning or redirecting the work. Aderant’s objective was to automate this repeatable investigative work without removing engineering control over ambiguous or consequential decisions.

The resulting production workflow uses Amazon Nova Lite through Amazon Bedrock to assemble ticket context, classify and enrich support requests, recommend routing and resolution starting points, and carry out selected operational actions. It runs on a schedule rather than responding to every event immediately: Amazon EventBridge triggers an AWS Lambda function hourly on business days, and the function processes newly submitted, unassigned tickets in the Jira CloudOps queue. The initial 2.5-week production period, from June 30 through July 17, 2026, covered 109 tickets, produced approximately 96% routing accuracy, and was associated with an estimated 8–14 engineering hours of recovered capacity per week. The stated cost was less than $30 per month, including less than $1 per month in Bedrock inference cost. Because the measurement window was short and the claims are reported in an AWS customer-story context, these results should be treated as encouraging early evidence rather than a definitive long-term performance or return-on-investment benchmark.

## Problem and operational context

Manual triage created both direct labor and coordination costs. Engineers had to determine what a ticket meant, understand the affected client environment, find relevant runbooks or previous fixes, and select the appropriate queue. Misrouted requests could remain in the wrong queue until someone noticed, while less-experienced engineers often needed additional time or advice from senior staff. This delayed resolution work and diverted experienced people from complex troubleshooting, platform improvements, and proactive operations.

Aderant’s desired automation boundary was narrower than “let an agent solve support.” The Analyzer focuses on gathering context and making repeatable recommendations. It can autonomously reassign or communicate about a ticket when its confidence meets a configured threshold, but lower-confidence classifications are directed to human review. The source states that the system does not access, process, or store client matter data or client application business data; its data boundary is internal operational ticket data, operational metadata, and internal knowledge sources.

## Production architecture and workflow

The implementation is a serverless application deployed through a single AWS Serverless Application Model and AWS CloudFormation template. A single Lambda function orchestrates the workflow, while EventBridge supplies weekday hourly scheduling. Credentials are retrieved from AWS Secrets Manager. The principal processing stages are:

- **Identify:** Retrieve unassigned tickets from Jira.
- **Enrich:** Query client and environment metadata through Amazon Athena; retrieve relevant material from Confluence and Microsoft SharePoint; and find comparable resolved tickets in Jira.
- **Classify:** Send the ticket and assembled context to Amazon Nova Lite using the Amazon Bedrock Converse API. The model returns structured classification output, including a recommended team and next steps.
- **Act:** Post analysis and acknowledgments, update Jira assignment fields when appropriate, notify the relevant Microsoft Teams channel, and apply predefined actions for scenarios that support can resolve.
- **Observe and improve:** Publish operational metrics to Amazon CloudWatch, route lower-confidence cases for review, and use observed corrections to refine prompts and routing logic.

Amazon DynamoDB supports cross-ticket pattern tracking. Jira, Teams, and Confluence receive resulting updates, actions, or knowledge records. This design keeps the model inside an orchestrated application rather than giving it unconstrained access to operational systems. The Lambda workflow, IAM permissions, API integrations, predefined actions, and confidence gates form the control plane around model inference.

The use of multiple internal sources resembles retrieval-augmented generation in operational form, although the source does not describe a formal vector database or embedding pipeline. Context is assembled through service queries and API calls, then supplied to the model for structured reasoning. Aderant is considering Amazon Bedrock Knowledge Bases for future semantic matching when ticket and documentation terminology differ, but that capability is described as a future direction, not as part of the measured deployment.

## Model selection and LLMOps process

Aderant evaluated multiple foundation models through Amazon Bedrock using real ticket content, environment information, runbooks, and resolution history. It selected Amazon Nova Lite based on three reported considerations: the model appeared to extract more specific resolution steps and correlate past issues more effectively in the team’s comparisons; it integrated with the existing AWS environment, Bedrock Converse API, IAM, and AWS SDK; and its cost profile made routine ticket analysis economically practical. These are vendor- and customer-reported selection criteria, and the source does not provide a detailed test set, scoring methodology, statistical confidence intervals, latency distribution, or comparison results for the other models.

The delivery process used progressive validation. A Jira automation rule first established the routing concept, but rules alone could not incorporate AWS context, ticket history, or model-generated reasoning. An earlier Amazon Quick CloudOps Helper agent then demonstrated that operational data could support useful recommendations. The team built the production workflow with Lambda and Nova Lite, with Kiro supporting integration scaffolding, architecture validation, and test generation. Before enabling actions, the Analyzer ran in monitoring-only mode against live tickets for approximately two weeks. Its classifications were compared with manual decisions, and prompts and routing logic were refined before the June 30 launch, five weeks after the initial concept.

This progression is an important LLMOps characteristic: the model was first evaluated in a realistic operational setting, then observed alongside existing decisions, and only afterward allowed to perform bounded changes. It also provides a basis for ongoing quality management. The team monitors confidence, misroutes, and processing latency, reviews routing corrections weekly, and adjusts prompts and routing rules based on those findings. The workflow therefore treats prompts, thresholds, integrations, and action policies as production configuration that requires iteration rather than assuming a one-time model choice is sufficient.

## Evaluation and reported results

Routing accuracy was measured by comparing the Analyzer’s assigned team with the team that ultimately resolved each ticket. Over the initial 109-ticket period, the reported result was approximately 96% accuracy, or four misroutes. Efficiency estimates were derived from a four-week pre-deployment baseline of 15–25 minutes of manual triage per ticket. On that basis, Aderant estimated 8–14 engineering hours recovered per week, equivalent to 32–56 hours per month, while reporting total system costs below $30 per month and Bedrock inference costs below $1 per month.

The examples illustrate the intended value but are not controlled experiments. In one case, a 404 request concerning an Azure DevOps site arrived in the CloudOps AWS queue; the Analyzer classified it as an Azure-related CloudOps issue, updated the team field, and notified the requester. In another, it combined client-environment data with a relevant Confluence article to provide an after-hours remote-access procedure, enabling an engineer to complete the work in under 30 minutes the next morning without additional research. For a deployment request requiring PowerShell and service verification, it supplied commands, expected outputs, troubleshooting guidance, and references, helping a newer engineer resolve the request without senior escalation.

The reported cost and time figures are particularly sensitive to assumptions. The source does not establish whether all recovered time translates into measurable throughput, whether ticket complexity changed between the baseline and production period, or how much human review remained necessary for the 109 tickets. It also does not report false-positive and false-negative rates beyond the four misroutes, model latency, prompt-token volume, failed API calls, or the proportion of tickets receiving autonomous actions. Those gaps limit direct comparison with other systems and make continued monitoring important.

## Knowledge loop and human safeguards

Beyond one-ticket routing, the Analyzer detects recurring issue patterns across clients running the same software version. When a configured threshold is reached, it records the pattern, updates a dedicated Confluence tracking page, watches resolved tickets for a confirmed fix, and links future matching tickets to the documented resolution. This creates an operational knowledge loop: recurring signals are identified, documented, validated through resolution activity, and reused in later triage. It can reduce repeated discovery work, although the source does not quantify the number of patterns detected or the accuracy of confirmed-fix matching.

The system also improves access to expertise by placing environment context, matched articles, and recommended actions in the ticket before an engineer begins work. This is positioned as an onboarding and productivity aid rather than a replacement for engineering judgment. Confidence thresholds, human review for uncertain cases, weekly correction review, and explicit action policies provide safeguards against blindly applying model output. The design is best understood as human-governed automation: the LLM proposes structured decisions and contextual guidance, while the surrounding workflow determines what may happen automatically.

## Tradeoffs and future work

The architecture benefits from low apparent operating cost, straightforward AWS integration, and a relatively small serverless footprint. It also reduces the operational burden of maintaining a separate model provider. Conversely, tight dependence on AWS services and the selected model may increase platform coupling, and a single Lambda-centered orchestration approach may require further decomposition if ticket volume, workflow complexity, or reliability requirements grow. API failures, stale documentation, incomplete environment metadata, and confident but incorrect classifications remain possible failure modes.

Aderant plans deeper analysis of related client tickets over time and improved knowledge matching through possible use of Amazon Bedrock Knowledge Bases. It also intends to maintain layered support: the scheduled Analyzer handles routine triage, while the CloudOps Helper bot remains available for deeper, on-demand investigation and follow-up questions. Overall, the case shows a practical path from search assistance to governed LLM automation, with the strongest evidence currently being the early routing result, observed workflow behavior, and reported cost estimates—not proof that the model can independently resolve support work at scale.
