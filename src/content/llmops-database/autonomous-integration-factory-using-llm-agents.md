---
title: "Autonomous Integration Factory Using LLM Agents"
slug: "autonomous-integration-factory-using-llm-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "error-handling"
  - "harness-engineering"
  - "evals"
  - "api-gateway"
  - "monitoring"
  - "security"
  - "guardrails"
  - "fastapi"
  - "documentation"
industryTags: "finance"
company: "Ramp"
summary: "Ramp faced the classic engineering scaling problem where customer demand for integrations with third-party tools far exceeded their team's capacity to build and maintain them manually. To solve this, they built two complementary LLM-powered systems: a customer-facing agentic system that autonomously builds custom integrations on-demand within minutes based on natural language descriptions, and an internal \"integration factory\" that converts these custom integrations into production-grade first-party connectors. The solution has already shipped 75 integrations, reducing time-to-integration from weeks or months down to hours (for first-party) or minutes (for custom), while dramatically reducing cost and expanding coverage to nearly any integration customers need."
link: "https://builders.ramp.com/post/integrations-that-write-themselves"
year: 2026
seo:
  title: "Ramp: Autonomous Integration Factory Using LLM Agents - ZenML LLMOps Database"
  description: "Ramp faced the classic engineering scaling problem where customer demand for integrations with third-party tools far exceeded their team's capacity to build and maintain them manually. To solve this, they built two complementary LLM-powered systems: a customer-facing agentic system that autonomously builds custom integrations on-demand within minutes based on natural language descriptions, and an internal \"integration factory\" that converts these custom integrations into production-grade first-party connectors. The solution has already shipped 75 integrations, reducing time-to-integration from weeks or months down to hours (for first-party) or minutes (for custom), while dramatically reducing cost and expanding coverage to nearly any integration customers need."
  canonical: "https://www.zenml.io/llmops-database/autonomous-integration-factory-using-llm-agents"
  ogTitle: "Ramp: Autonomous Integration Factory Using LLM Agents - ZenML LLMOps Database"
  ogDescription: "Ramp faced the classic engineering scaling problem where customer demand for integrations with third-party tools far exceeded their team's capacity to build and maintain them manually. To solve this, they built two complementary LLM-powered systems: a customer-facing agentic system that autonomously builds custom integrations on-demand within minutes based on natural language descriptions, and an internal \"integration factory\" that converts these custom integrations into production-grade first-party connectors. The solution has already shipped 75 integrations, reducing time-to-integration from weeks or months down to hours (for first-party) or minutes (for custom), while dramatically reducing cost and expanding coverage to nearly any integration customers need."
notion:
  pageId: "3c1f8dff-2538-803f-abd1-c955097cea8d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T09:05:00.000Z"
  lastEditedTime: "2026-08-19T09:05:00.000Z"
  publishedAt: "2026-08-19T09:11:00Z"
---

## Overview

Ramp, a financial technology company, built a sophisticated LLM-powered system to address one of the most persistent challenges in enterprise software: the unbounded demand for third-party integrations. Their solution consists of two interconnected autonomous systems that leverage LLM agents to research, build, test, and deploy integrations without traditional engineering involvement. This case study is particularly noteworthy for its production-ready approach, emphasis on deterministic execution, and comprehensive security model.

## The Problem Context

The fundamental challenge Ramp faced is familiar to any B2B software company: customers need integrations with a long tail of third-party tools that exceeds any reasonable engineering roadmap. A concrete example they provide is a customer wanting to trigger a Checkr background check for contractor onboarding. If that specific integration doesn't exist, the workflow stops. While building the most popular integrations is feasible, there will always be another niche provider that some subset of customers desperately needs. Traditional engineering approaches can't scale to meet this demand, as each integration historically required weeks to months of developer time.

## System Architecture: Two Complementary Components

Ramp's solution consists of two distinct but connected systems that form a complete pipeline from customer need to production-ready integration.

### Customer-Facing Custom Integration System

The first component is an agentic system that allows customers to build their own integrations through natural language description. When a customer describes a task like "run a background check in Checkr before this contractor is approved," the agent recognizes that no Checkr integration exists and autonomously builds it. The customer never leaves the product interface—the integration is built and deployed where a feature request would have traditionally been filed.

The system's architecture revolves around two key abstractions: **recipes** and **recipe books**. A recipe represents the exact configuration for a single authenticated API call, including the endpoint, authentication method, and input/output schemas. A recipe book is an ordered collection of recipes plus the orchestration logic for how they work together to accomplish a complete integration task.

The agent's workflow proceeds through several distinct phases. First, it researches the target provider's API documentation to understand the available endpoints and their semantics. In the Checkr example, it learns that creating a background check requires first creating a candidate record and then sending an invitation, understanding the dependencies between these API calls. Second, it requests credentials from the customer through a secure widget interface that keeps sensitive data out of the LLM context entirely. Third, it writes individual recipes and tests each in isolation. Fourth, it threads these recipes together, passing outputs from one call as inputs to the next, and generates a deterministic script that executes the integration logic. Finally, it tests the complete integration end-to-end, auto-fixing 4xx and 5xx errors and verifying that successful responses actually represent successful operations (since a 200 OK doesn't always mean the operation did what was intended).

A critical design decision is that generation happens once. After the agent builds and tests the integration, what executes in production is a deterministic script, not repeated LLM inference. This architectural choice addresses reliability concerns and keeps inference costs bounded. The script continues to be monitored during production use, with background checks that can diagnose failures when providers change their APIs and autonomously repair the integration rather than waiting for bug reports.

These custom integrations don't remain isolated to the user who created them. They become first-class integrations available across the customer's organization, usable as steps in procurement workflows or as tools that Ramp's other AI agents can invoke.

### Internal Integration Factory

The second component is Ramp's internal "integration factory" that converts the signal from custom integrations (and direct requests) into production-grade first-party connectors. An engineer hands the factory a provider name, and a custom agent built on their Inspect framework researches the APIs, implements the connector, tests it with test credentials, and opens a pull request—all autonomously.

The factory's workflow mirrors the custom integration system but targets production code quality. It researches the provider's API documentation, implements the connector following Ramp's internal patterns, requests test credentials through a secure link (again keeping secrets out of LLM context), executes comprehensive testing, and submits a pull request with extensive evidence artifacts.

The evidence package is crucial to the factory's ability to ship code with minimal human review. Each PR includes every endpoint touched, the actual requests made, the responses returned by the real provider, and screen recordings of the new connector being tested in the product. Reviewers don't need to trust the generated code directly; they can verify the artifacts demonstrate correct behavior. The factory also structures code to minimize risk: each new provider lives in its own isolated module within a separate connectors service rather than the monolith, and simply adds a new tool for that provider without touching shared code paths.

Ramp reports that the factory shipped its first integration end-to-end for Pangram (an AI detection and sanitization service) while being observed. The entire process—research, implementation, testing, and PR creation—cost less than $15 in compute, with the human's only contribution being providing test credentials. The integration was merged and deployed to production within hours.

## Production LLMOps Considerations

### Reliability Through Deterministic Execution

A foundational principle of Ramp's approach is "put the model at build time, not runtime." The LLM is used for the genuinely difficult cognitive tasks—reading documentation, understanding domain semantics, inferring API dependencies—but the artifact it produces is a deterministic script. This design choice directly addresses the reliability concerns that plague many LLM applications. By keeping the model out of the execution path, Ramp ensures that integrations behave predictably in production. The only runtime LLM involvement comes through the self-healing system that monitors for failures and can regenerate fixes, but even this operates asynchronously from the main execution path.

The architectural philosophy extends to giving the model only the parts that truly require intelligence. Authentication patterns, schemas, endpoints, retry logic, and validation can all be defined once and enforced through deterministic code. What genuinely needs an LLM is interpreting provider documentation and mapping it to executable API calls—a task that's difficult to automate with traditional programming but well-suited to language models.

### Testing and Validation

Testing operates at multiple levels throughout the system. Individual recipes are tested in isolation before being composed. Complete integrations are tested end-to-end before being made available. The system auto-fixes common failure modes like 4xx and 5xx errors, but also validates semantic correctness—ensuring that a successful HTTP response actually indicates the intended operation succeeded.

Continuous background monitoring provides ongoing validation in production. When a provider changes their API (a common occurrence with third-party services), the monitoring system detects the failure, diagnoses the root cause, and can autonomously regenerate and redeploy a fixed version. This self-healing capability is essential for maintaining a large portfolio of integrations without proportional growth in maintenance burden.

For the integration factory, testing uses test credentials and synthetic data rather than customer data, maintaining data isolation while still exercising real provider APIs. The factory produces comprehensive test evidence that accompanies each PR, allowing reviewers to verify correct behavior without needing to understand every line of generated code.

### Security Model

Ramp implements multiple layers of security controls to safely execute customer-specified integrations, treating each custom integration as potentially hostile. URL validation ensures that recipe destinations are HTTPS and match an allowlist recorded when the recipe was created—supporting exact matches or proper subdomains but rejecting typosquatting attempts like `evil-checkr.com` impersonating `checkr.com`. DNS resolution checks prevent requests from being redirected to private or internal address space.

The execution environment is heavily isolated. Customer integration scripts run in sandboxes with no network route to Ramp's internal infrastructure. All outbound requests flow through a dedicated egress path that is stateless, holds no database or credentials, and caps response sizes and execution time. Only data matching the recipe's declared input schema reaches the provider, preventing exfiltration of unapproved data.

Credential handling receives special attention. Neither the custom integration system nor the integration factory ever places credentials in LLM context. Customer credentials are collected through secure widgets, test credentials are provided via secure links, and both land directly in encrypted storage where they're embedded at runtime but remain inaccessible to the model. This design prevents the most obvious credential leakage risk with LLM-powered systems.

All resources are scoped to the business that created them. Recipes are immutable and versioned per business, and sandbox execution inherits that business's permissions and isolation boundaries.

### Cost and Performance

The economic model is striking compared to traditional integration development. Ramp reports that custom integrations complete in minutes for end users, allowing them to get immediately unblocked. Factory-generated first-party integrations complete in hours and cost approximately $15-25 in compute plus a short human review. Traditional integration development required weeks to months of engineering time. This represents a cost reduction of at least two orders of magnitude while dramatically improving time-to-value.

The cost structure becomes more favorable as the system matures. LLM inference occurs once during integration creation, with subsequent executions running deterministic scripts. The main ongoing costs are monitoring and occasional regeneration when providers change their APIs, but these are amortized across all uses of each integration.

## Business Impact and Learnings

Ramp has already shipped 75 integrations through these systems, dramatically expanding their integration coverage beyond what a traditional roadmap could support. The time-to-integration metric shows the most dramatic improvement: weeks to months reduced to hours for first-party integrations and minutes for customers needing immediate unblocking.

Perhaps more importantly, the custom integration system provides a superior demand signal compared to traditional feature requests. When a customer builds their own integration, they've provided a complete specification with a working example attached. This "workaround as spec" philosophy surfaces precise requirements in executable form, making it trivially easy to convert high-demand custom integrations into first-party features.

The team emphasizes several key learnings from building and operating these systems in production:

The importance of verification over code generation quality is a central theme. The ability to ship factory-generated code safely doesn't depend on the code being perfect, but on the evidence package being comprehensive. Reviewers can trust the system because they can quickly verify it behaves correctly against real providers, not because they trust every line of generated code.

Autonomy is bounded by the quality and speed of verification mechanisms, not by the agent's capabilities. An agent can only be safely deployed to the extent its work can be checked cheaply and reliably. Ramp's emphasis on test artifacts, screen recordings, and evidence packages enables human reviewers to verify correctness much faster than reviewing code line-by-line.

The architectural decision to use models at build time rather than runtime proves critical for reliability. Deterministic execution paths eliminate the unpredictability that makes LLM-powered systems difficult to trust in production contexts.

## Critical Assessment and Tradeoffs

While Ramp presents impressive results, several aspects warrant careful consideration:

The security model assumes threat actors won't find sophisticated bypasses. The URL validation and DNS resolution checks are strong controls, but determined attackers might discover edge cases. The isolated execution environment and stateless egress path provide defense in depth, though any sandbox can potentially be escaped. That said, the security architecture appears thoughtfully designed with multiple overlapping controls.

The reliability of self-healing when providers change APIs is presented as a solved problem, but the text doesn't detail failure modes. How does the system handle partial failures? What happens when a provider makes a breaking change that can't be automatically fixed? How are customers notified when their integrations break and repairs fail? These operational details matter for production systems but aren't thoroughly explored.

Code quality in factory-generated integrations is acknowledged as "an extremely important engineering pillar" but then receives minimal discussion. The emphasis on verifying behavior through test artifacts rather than code review is pragmatic, but technical debt can accumulate in generated code even when it functions correctly. Maintenance burden, readability for future engineers, and architectural consistency all matter for long-term system health.

The cost figures ($15-25 per integration) likely represent the compute costs for the initial generation but may not fully account for ongoing monitoring, self-healing operations, storage for recipes and credentials, and the human review time that's described as "short" but still exists. The economics are almost certainly favorable compared to traditional development, but a complete cost model would be more informative.

The system's coverage claims are ambitious—supporting "almost every integration any customer needs"—but must have practical limitations. Providers with complex authentication schemes, poor documentation, or non-REST APIs might prove challenging. Providers that require extensive domain knowledge beyond what's in their API docs could be difficult for the agent to handle correctly. The text doesn't explore where the system's capabilities end.

The approach of giving customers the ability to create authenticated integrations to arbitrary external services, even with robust security controls, represents significant attack surface. While the controls described seem comprehensive, this is inherently riskier than a curated set of manually-built integrations.

## Broader Implications

Ramp positions this work as part of a broader vision of "software factories"—systems that close the loop between deciding what to build and building it. Their framing that successful teams will be distinguished by their ability to verify agent outputs as fast as agents produce them is particularly insightful. This shifts the engineering bottleneck from implementation to quality assurance and verification, with profound implications for how software teams structure their work.

The "workaround as spec" insight generalizes beyond integrations. Observing how customers work around product limitations provides more precise requirements than feature requests, especially when those workarounds are captured in executable form. LLM systems that can operationalize customer workarounds into first-class features represent a new product development paradigm.

The architectural pattern of using LLMs at build time to generate deterministic runtime artifacts addresses one of the most significant barriers to LLM adoption in production systems. By separating the intelligent but unpredictable generation phase from the deterministic execution phase, Ramp achieves both the flexibility of LLM-powered systems and the reliability requirements of production services.

## Technical Context

The case study mentions using Ramp's custom Inspect framework, which they've written about in other blog posts, for building the integration factory agents. The reference to "Inspect" suggests they've invested in internal tooling for agent development with specialized capabilities for research, testing, and code generation workflows.

The architecture of recipes, recipe books, and generated deterministic scripts suggests a form of meta-programming where LLMs generate executable artifacts that are then interpreted by a runtime system. This is conceptually similar to systems that compile LLM outputs into verifiable formal specifications before execution.

The credential handling approach—secure widgets and secure links that bypass LLM context entirely—represents a best practice for LLM systems that need access to secrets. By keeping credentials completely out of the model's context, Ramp eliminates several classes of security vulnerabilities around prompt injection and credential leakage.

The self-healing capability that monitors production integrations and autonomously fixes issues when providers change their APIs represents a form of continuous integration/continuous deployment (CI/CD) for AI-generated code. This operational model may become increasingly important as organizations scale up AI-powered code generation.

Overall, this case study represents a sophisticated production deployment of LLM agents with thoughtful attention to reliability, security, and operational concerns. While some claims would benefit from more detailed substantiation, the architectural decisions demonstrate mature thinking about how to safely deploy agentic systems at scale.
