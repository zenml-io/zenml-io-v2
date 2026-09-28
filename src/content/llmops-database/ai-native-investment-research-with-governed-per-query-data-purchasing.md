---
title: "AI-Native Investment Research with Governed Per-Query Data Purchasing"
slug: "ai-native-investment-research-with-governed-per-query-data-purchasing"
draft: false
llmopsTags:
  - "data-analysis"
  - "visualization"
  - "question-answering"
  - "chatbot"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "agent-based"
  - "memory"
  - "error-handling"
  - "cost-optimization"
  - "databases"
  - "postgresql"
  - "monitoring"
  - "guardrails"
  - "security"
  - "compliance"
  - "amazon-aws"
  - "anthropic"
industryTags: "finance"
company: "Heurist Finance"
summary: "Heurist Finance built a production investment-research workbench for retail investors that combines portfolio-aware analysis, premium market data, financial research, scenario analysis, and monitoring in a conversational interface. Its agents are orchestrated with Strands and Anthropic Claude on Amazon Bedrock, while Amazon Bedrock AgentCore provides identity, cross-session memory, isolated code execution, observability, and per-query payments for premium data accessed through the x402 protocol. The architecture links user identity, spending limits, payment credentials, data access, analysis artifacts, and traces into an auditable workflow. AWS and Heurist report that managed infrastructure reduced the estimated agent-system engineering effort by roughly 80% and saved months of platform development, although the source does not provide independent validation of these claims or detailed production quality, cost, latency, or investment-outcome metrics."
link: "https://aws.amazon.com/blogs/machine-learning/how-heurist-finance-built-an-ai-native-investment-workbench-on-amazon-bedrock-agentcore/"
year: 2026
seo:
  title: "Heurist Finance: AI-Native Investment Research with Governed Per-Query Data Purchasing - ZenML LLMOps Database"
  description: "Heurist Finance built a production investment-research workbench for retail investors that combines portfolio-aware analysis, premium market data, financial research, scenario analysis, and monitoring in a conversational interface. Its agents are orchestrated with Strands and Anthropic Claude on Amazon Bedrock, while Amazon Bedrock AgentCore provides identity, cross-session memory, isolated code execution, observability, and per-query payments for premium data accessed through the x402 protocol. The architecture links user identity, spending limits, payment credentials, data access, analysis artifacts, and traces into an auditable workflow. AWS and Heurist report that managed infrastructure reduced the estimated agent-system engineering effort by roughly 80% and saved months of platform development, although the source does not provide independent validation of these claims or detailed production quality, cost, latency, or investment-outcome metrics."
  canonical: "https://www.zenml.io/llmops-database/ai-native-investment-research-with-governed-per-query-data-purchasing"
  ogTitle: "Heurist Finance: AI-Native Investment Research with Governed Per-Query Data Purchasing - ZenML LLMOps Database"
  ogDescription: "Heurist Finance built a production investment-research workbench for retail investors that combines portfolio-aware analysis, premium market data, financial research, scenario analysis, and monitoring in a conversational interface. Its agents are orchestrated with Strands and Anthropic Claude on Amazon Bedrock, while Amazon Bedrock AgentCore provides identity, cross-session memory, isolated code execution, observability, and per-query payments for premium data accessed through the x402 protocol. The architecture links user identity, spending limits, payment credentials, data access, analysis artifacts, and traces into an auditable workflow. AWS and Heurist report that managed infrastructure reduced the estimated agent-system engineering effort by roughly 80% and saved months of platform development, although the source does not provide independent validation of these claims or detailed production quality, cost, latency, or investment-outcome metrics."
notion:
  pageId: "3e9f8dff-2538-8007-9480-d39a006237a4"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:15:00.000Z"
  lastEditedTime: "2026-09-28T08:15:00.000Z"
  publishedAt: "2026-09-28T08:25:19Z"
---

## Overview

Heurist Finance is a production-oriented financial intelligence product for retail investors. It attempts to make institutional-style workflows—such as combining market, macroeconomic, fundamental, alternative, filing, and news data; constructing portfolios; stress-testing positions; and monitoring investments—available through one conversational workbench. The central operating challenge is that useful financial data is fragmented across premium providers and bespoke APIs, while the product needs to personalize every response to a user’s holdings, watchlist, time horizon, and risk preferences.

Rather than pre-purchasing broad data licenses or building an agent platform internally, Heurist deployed its agents on Amazon Bedrock AgentCore. The system uses Strands for orchestration and Anthropic Claude through Amazon Bedrock, with AgentCore capabilities handling identity, persistent memory, isolated analysis, payments, and observability. A notable production feature is governed, per-query payment for premium data: the agent can purchase only the information needed for a particular request using USDC on the Base blockchain, subject to a session spending cap and an auditable payment flow. The source presents this as an AWS customer success story, so reported benefits—especially the estimated 80% reduction in agent-system engineering—should be treated as vendor- and customer-reported rather than independently benchmarked results.

## Problem and operating constraints

Heurist’s use case requires more than a simple question-answering chatbot. A user may ask how a macroeconomic release affects their portfolio, requiring the system to retrieve the user’s positions, purchase a current consensus or market dataset, perform calculations, generate a chart, and explain the result in the context of the user’s investment horizon and risk tolerance. A broader research question may combine prices, economic indicators, company filings, fundamentals, and news, followed by correlations, scenario analysis, or backtesting.

The data sources may be behind paywalls and may expose different APIs and pricing models. Buying every source in advance would create a difficult economic model for a product serving retail users. Purchasing data only when a question requires it is potentially more efficient, but introduces financial and security controls that are unusual for a conventional LLM application. An autonomous workflow must not spend without authorization, exceed a user or request budget, confuse one user’s credentials with another’s, or leave an incomplete audit trail.

The application also handles sensitive information, including positions, investment beliefs, risk tolerance, and time horizon. Consequently, production requirements include persistent user identity, access-controlled memory, secure secret handling, isolated computation, prompt-injection defenses, request tracing, and the ability to connect a final answer to the tools and payments that produced it.

## Architecture and orchestration

The central orchestrator is implemented with Strands and calls Anthropic Claude models available through Amazon Bedrock. Amazon Aurora PostgreSQL stores portfolio data, while Amazon S3 stores analysis artifacts such as charts. AgentCore services surround the model and tool workflow:

- **AgentCore Identity** propagates the authenticated user and provides scoped credentials across service calls.
- **AgentCore Memory** stores conversation history, user preferences, and evolving investment-thesis state across sessions.
- **AgentCore Code Interpreter** executes portfolio calculations, correlations, scenarios, charts, and backtests in an isolated cloud sandbox.
- **AgentCore payments** coordinates paid data access, payment sessions, payment instruments, and payment connectors.
- **AgentCore Observability** records traces intended to make agent decisions and downstream actions diagnosable and auditable.
- **Amazon Bedrock Guardrails** filters inputs and outputs, including defenses against prompt-injection attempts aimed at payment and data tools and a stated policy against recommending an unhedged single stock.
- **AWS Secrets Manager** holds payment credentials, which are retrieved at runtime rather than embedded in application code or prompts.

This division places model reasoning and product-specific research logic in Heurist’s application while delegating several cross-cutting LLMOps concerns to managed infrastructure. The source does not describe model fine-tuning, a formal evaluation dataset, retrieval-ranking experiments, or a model fallback strategy. Its production emphasis is instead on tool coordination, identity, authorization, payment governance, isolation, and traceability.

## Per-query paid data workflow

Heurist uses the x402 protocol to obtain paid data when a research request requires it. The merchant first responds to a request with HTTP 402 and payment terms specifying the amount, recipient, asset, and network. AgentCore payments checks those terms against the current Payment Session’s `maxSpendAmount`. If the requested charge exceeds the cap, the workflow does not silently proceed; it informs the user and suggests alternatives. If it is within the cap, the Payment Manager invokes a `CoinbaseCDP` Payment Connector, which signs the payment through a Payment Instrument scoped to the Base network.

Payment credentials are obtained at runtime from AWS Secrets Manager. After payment, Heurist retries the data request with proof in the `X-PAYMENT` header, and the merchant returns the dataset. Conceptually, the control point can be represented as:

```text
if requested_amount <= payment_session.maxSpendAmount:
    payment = process_payment(scoped_instrument, requested_amount)
    data = retry_request(x_payment=payment.proof)
else:
    ask_user_or_offer_alternative()
```

The actual implementation is described through AgentCore’s Payment Manager, connector, APIs, and SDK integration; the snippet is a conceptual representation rather than source code from the case study. The arrangement gives Heurist a mechanism for usage-based acquisition of premium information without a vendor contract or prepayment for every source. It also introduces dependencies and risks: data availability depends on merchants and APIs, blockchain settlement adds operational complexity, and a secure spending policy must cover not only individual charges but also repeated or adversarial tool calls within a session.

## Personalization and memory

For questions such as whether a stock is overvalued, the system uses the user’s portfolio, watchlist, time horizon, risk preferences, prior conversations, and investment thesis. AgentCore Memory maintains relevant context between sessions so that research can become more specific rather than restarting from a blank conversation. AgentCore Identity scopes that stored context to the authenticated user.

This is an important LLMOps boundary. Persistent memory is not merely a convenience feature: it changes the data-retention, isolation, correction, and authorization requirements of the application. The described architecture associates memory operations with user and request context, but the source does not specify retention periods, user-facing memory controls, deletion workflows, memory quality evaluation, or procedures for detecting stale or incorrect preferences. Those remain areas that would need additional operational design in a mature deployment.

## Isolated analysis and request flow

For the example question, “How does today’s PCE release impact my portfolio?”, the orchestrator first obtains the relevant portfolio from Aurora PostgreSQL, with identity scoping the read to the requesting user. It then calls a paid consensus-forecast endpoint. If the endpoint returns HTTP 402, the payment capability validates the charge against the session cap, signs the transaction through the scoped payment instrument, and retries with payment proof.

The resulting data and portfolio are passed to AgentCore Code Interpreter, which performs the impact calculations and writes a chart to Amazon S3 from inside its isolated sandbox. The sandbox has no arbitrary network egress and is torn down when analysis finishes. Anthropic Claude on Amazon Bedrock then synthesizes the response using the portfolio, time horizon, and risk preferences, and the answer streams back with the chart attached.

The flow demonstrates how a production LLM request can span model inference, structured data access, paid external tools, code execution, artifact storage, and response generation. Shared user, request, and trace context ties those actions together. This is more operationally significant than a standalone prompt because each intermediate action can affect money, privacy, or an investment decision.

## Security, governance, and observability

The architecture treats identity and audit as properties of the complete request rather than only of the model call. The described records include user ID, workload identity, request ID, and trace ID for tool calls, payments, and memory operations. AgentCore Observability traces are intended to support reproducibility of agent decisions, compliance inquiries, troubleshooting, and investigation of the relationship between a paid data purchase and the resulting portfolio analysis.

Defense in depth is distributed across services. Identity accepts OAuth and issues scoped credentials. Payment sessions and instruments are scoped per user. Memory is bound to the relevant user. Code execution is isolated. Secrets are kept outside the model context and fetched at runtime. Bedrock Guardrails filter model inputs and outputs. These controls reduce the blast radius of a compromised prompt or incorrectly selected tool, but they do not by themselves guarantee safe financial advice. The source does not report false-positive or false-negative rates for guardrails, payment-abuse testing, red-team results, service-level objectives, or an independent compliance assessment.

The stated policy against recommending an unhedged single stock illustrates a product-level safety constraint implemented alongside general content filtering. In practice, such a policy would require testing across indirect wording, multi-step reasoning, tool outputs, and generated charts, but the case study does not describe those tests. Similarly, trace availability improves investigation, but reproducibility can still depend on changing market data, model versions, merchant responses, and prompt or policy configuration.

## Results and tradeoffs

Heurist estimates that AgentCore reduced the amount of agent-system engineering by approximately 80% compared with building an in-house LLM orchestration stack, and says the managed infrastructure saved months. The architecture is also presented as supporting predictable per-user marginal costs, which is important for a retail pricing model. These claims are plausible benefits of using managed identity, memory, sandboxing, payments, and observability, but the article provides no baseline definition, implementation timeline, workload volume, cost table, latency measurements, or independent comparison. The claims should therefore be interpreted as reported deployment experience rather than a general performance guarantee.

The main tradeoff is reduced platform-building effort in exchange for dependence on AWS AgentCore capabilities, AWS operational boundaries, supported regions, and the payment ecosystem. Per-query purchasing can align data costs with usage, but introduces transaction fees, settlement and wallet risks, merchant reliability concerns, and the possibility that an autonomous workflow becomes expensive through repeated calls. Persistent memory improves personalization but expands privacy and data-governance responsibilities. Sandboxed computation limits network risk, yet the application still needs validation of imported data, calculations, generated charts, and financial explanations.

The case study’s next planned directions are event-driven research tied to earnings calendars, portfolio-aware analysis of market events, and recommendations based on what traders with similar horizons are researching. Those extensions will increase the importance of event processing, freshness guarantees, recommendation evaluation, privacy controls around aggregated user behavior, and monitoring for unsuitable or overconfident financial outputs. Overall, Heurist Finance illustrates a managed-agent approach to production LLMOps in which the differentiating application logic is financial research and personalization, while the surrounding platform supplies identity, memory, secure execution, payment governance, and observability.
