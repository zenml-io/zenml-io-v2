---
title: "Red-Teaming an AI Agent: Security Testing of goose Through Operation Pale Fire"
slug: "red-teaming-an-ai-agent-security-testing-of-goose-through-operation-pale-fire"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "high-stakes-application"
  - "poc"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "mcp"
  - "evals"
  - "open-source"
  - "security"
  - "guardrails"
  - "monitoring"
  - "fastapi"
  - "crewai"
  - "anthropic"
  - "openai"
  - "google-gcp"
industryTags: "finance"
company: "Block"
summary: "Block conducted an internal red team engagement called \"Operation Pale Fire\" to proactively identify security vulnerabilities in goose, their open-source AI coding agent. The engagement successfully demonstrated multiple attack vectors, including prompt injection attacks hidden in invisible Unicode characters delivered through calendar invitations and poisoned shareable recipes, ultimately compromising a Block employee's laptop through social engineering combined with AI-specific vulnerabilities. The operation revealed critical weaknesses in how AI agents handle untrusted context and led to concrete improvements including calendar policy changes, enhanced recipe transparency, zero-width character stripping, and prompt injection detection capabilities integrated into the goose platform."
link: "https://engineering.block.xyz/blog/how-we-red-teamed-our-own-ai-agent-"
year: 2026
seo:
  title: "Block: Red-Teaming an AI Agent: Security Testing of goose Through Operation Pale Fire - ZenML LLMOps Database"
  description: "Block conducted an internal red team engagement called \"Operation Pale Fire\" to proactively identify security vulnerabilities in goose, their open-source AI coding agent. The engagement successfully demonstrated multiple attack vectors, including prompt injection attacks hidden in invisible Unicode characters delivered through calendar invitations and poisoned shareable recipes, ultimately compromising a Block employee's laptop through social engineering combined with AI-specific vulnerabilities. The operation revealed critical weaknesses in how AI agents handle untrusted context and led to concrete improvements including calendar policy changes, enhanced recipe transparency, zero-width character stripping, and prompt injection detection capabilities integrated into the goose platform."
  canonical: "https://www.zenml.io/llmops-database/red-teaming-an-ai-agent-security-testing-of-goose-through-operation-pale-fire"
  ogTitle: "Block: Red-Teaming an AI Agent: Security Testing of goose Through Operation Pale Fire - ZenML LLMOps Database"
  ogDescription: "Block conducted an internal red team engagement called \"Operation Pale Fire\" to proactively identify security vulnerabilities in goose, their open-source AI coding agent. The engagement successfully demonstrated multiple attack vectors, including prompt injection attacks hidden in invisible Unicode characters delivered through calendar invitations and poisoned shareable recipes, ultimately compromising a Block employee's laptop through social engineering combined with AI-specific vulnerabilities. The operation revealed critical weaknesses in how AI agents handle untrusted context and led to concrete improvements including calendar policy changes, enhanced recipe transparency, zero-width character stripping, and prompt injection detection capabilities integrated into the goose platform."
notion:
  pageId: "34ef8dff-2538-81ce-bafa-e2afe64c422b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:51:00.000Z"
  lastEditedTime: "2026-04-26T09:51:00.000Z"
  publishedAt: "2026-04-26T10:07:25Z"
---

## Overview

Block's "Operation Pale Fire" represents a comprehensive case study in securing AI agents deployed in production environments. The engagement focused on goose, an open-source AI agent developed by Block and now under the Agentic AI Foundation, designed to assist users with coding tasks, debugging, and workflow automation. The red team exercise demonstrates critical LLMOps considerations around security, monitoring, and the unique challenges of deploying agentic AI systems that can execute code and interact with external systems through the Model Context Protocol (MCP).

## The Production AI System: goose

goose is positioned as a general-purpose AI agent capable of taking "meaningful real-world action" by interacting with external entities through MCP extensions to perform complex multi-step operations. This production deployment scenario immediately raises significant LLMOps concerns that traditional software deployments don't face. The agent operates in a unique security paradigm where it has access to user calendars, development environments, shell access, and various other integrations that can execute arbitrary actions on behalf of users.

An important LLMOps consideration highlighted in this case study is that Block allows internal users to select from a large list of available models from multiple vendors. This multi-model support creates operational complexity, as the red team discovered that "a payload developed and tuned with a particular model might not work with another, even those by the same vendor." This heterogeneity in model selection represents a real-world LLMOps challenge where organizations must maintain security and reliability across different foundational models with varying capabilities and behaviors.

## Initial Attack Vector: MCP Extensions and Context Window Poisoning

The red team's approach began by surveying commonly used MCP extensions to identify those that would "pull in untrusted content into the context window." This represents a fundamental LLMOps security principle: any data source that feeds into an AI agent's context represents a potential attack surface. The team identified a Google Calendar MCP that enabled users to ask goose questions like "What's on my calendar today?" as a promising vector.

The attack methodology involved leveraging the Google Calendar API to send calendar invitations from external domains that would appear on users' primary work calendars, specifically opting out of sending invitation emails so the invites would "stealthily pop up" on victims' calendars. The prompt injection was embedded in the description of calendar events, so when users asked goose about their calendar, the agent would ingest the malicious payload. The injection encouraged goose to invoke its built-in developer shell tool to check for "updates" to the Calendar MCP, which actually contacted the red team's command and control server.

## Advanced Evasion: Unicode Smuggling

A critical technical innovation in the attack was the use of zero-width Unicode characters to hide the prompt injection. The team leveraged recent research from Embrace The Red on how LLMs could decode zero-width unicode characters, making the attack "invisible to the end user." At the time, goose had no protections against zero-width characters and would interpret them when processing calendar invites. This allowed the red team to encode a "massive prompt injection within zero-width characters" in the description of invites, completely hidden from visual inspection.

This represents a significant LLMOps challenge: traditional security controls designed for human-readable text may not be effective against AI systems that can interpret hidden or encoded content. The fact that the prompt injection needed to be "lengthy" due to improved task alignment in current models speaks to an ongoing tension in LLMOps between model capabilities and security requirements.

## Operational Challenges and the Non-Deterministic Nature of LLMs

The first campaign encountered multiple operational challenges that highlight key LLMOps considerations. After sending approximately 50 calendar invitations per day for five days, the red team saw no successful requests to their server. Several factors contributed to this failure, all of which are instructive for understanding production AI systems:

The development of underlying models and the goose agent itself was "moving at a rapid pace," creating a moving target for both attackers and defenders. The Google Calendar MCP received a full update during the campaign that "severely hampered the efficacy of the attack," frequently grabbing invalid date ranges and missing the injection. This rapid evolution of components is characteristic of the LLMOps landscape where dependencies can change frequently.

Perhaps most importantly, the "non-deterministic nature of LLMs" meant there was always a chance that the special "update" instructions might not execute. Users could also have "wildly varying content in their context windows based both on what tools/MCPs they have enabled along with how dense their calendar itself is." This variability in context and non-deterministic behavior represents a fundamental challenge in securing AI agents in production—the same input may not always produce the same output, making traditional security testing approaches less reliable.

## Pivot to System Prompt Injection via Shareable Recipes

After recognizing that injection through tool-call responses wasn't consistent, the red team pivoted to targeting the system prompt directly through goose's "shareable recipes" feature. Recipes are described as "reusable workflows that package extensions, prompts, and settings together" designed to share proven workflows and reproduce successful results consistently.

The red team identified that goose would decode base64 blobs and load JSON from URLs to automatically populate agent instructions and prompts in the UI "without much transparency," making it trivial to poison a recipe. Critically, the recipe content was appended to the system prompt of the goose session, meaning the malicious prompt would have "significantly more control over the underlying LLM." This highlights an important LLMOps principle: system prompts represent a privileged position in the AI's instruction hierarchy, and any mechanism that allows untrusted content to influence system prompts creates significant security risks.

The attack combined this recipe poisoning with a more sophisticated social engineering approach. The red team noticed that Google Meet links in calendar invitations were "fairly hard to distinguish" as external to the company, and that joining external meetings didn't trigger the same warnings as hosting them. They created a slide deck explaining the poisoned recipe and conducted what appeared to be an internal learning session, walking attendees through running the compromised recipe.

During this second campaign, the red team saw "multiple requests come through" their server, indicating successful phishing, but a "small typo in the prompt injection stopped the infostealer itself from being pulled down and run." This incident demonstrates both the brittleness of prompt-based attacks (where a single typo can break the entire chain) and the challenges of debugging AI agent behaviors in production.

## The Successful Third Campaign: Targeted Social Engineering

The final successful campaign involved direct outreach to the goose development team through public channels under the guise of reporting a bug in the recipe system. Working under the pretext of encountering an RTL (right-to-left text) bug when using Arabic text, the red team made the bug report "look very legitimate." When a developer clicked and executed the recipe as part of debugging, it triggered the infostealer payload.

This successful attack demonstrates that even with technical security controls, the human element remains critical in AI agent security. The social engineering aspect exploited trust relationships and legitimate development workflows rather than purely technical vulnerabilities.

## Detection and Response: LLMOps Monitoring Challenges

The Detection and Response Team (DART) quickly identified and contained the simulated threat, providing valuable insights into how "AI-driven attacks manifest across existing security controls." The monitoring systems surfaced behavior that warranted investigation "shortly after the red team initiated their final campaign." The collaboration between red and blue teams allowed them to "trace the complete sequence—from the agent's prompt interaction to the resulting local activity."

Importantly, the findings confirmed that "current controls can effectively identify atypical activity but also highlighted opportunities to expand visibility into how AI agents interact with host systems and developer workflows." This speaks to a key LLMOps challenge: existing security monitoring may detect suspicious outcomes, but understanding the full causal chain from prompt to action requires new observability approaches specifically designed for AI systems.

## Mitigations and Production Improvements

The operation resulted in concrete improvements to the production goose system, demonstrating effective LLMOps practices for responding to identified vulnerabilities:

**Google Calendar Policy Changes**: Block changed the Google Calendar policy to only show invites from known external senders that users have previously interacted with, requiring acknowledgment before appearing on primary calendars. This represents a defense-in-depth approach that reduces the attack surface for context window poisoning.

**Transparent Recipes**: The goose development team implemented enhanced transparency for recipes by visualizing the instructions being loaded, making it harder to hide malicious content. Zero-width character attacks were mitigated by stripping these characters when loaded into the app. These changes directly address the evasion techniques that proved effective during the red team exercise.

**Prompt Injection Detection**: The team developed "new ways to detect prompt injection, with our initial version of that work being merged into goose already." This represents a proactive security measure integrated directly into the AI agent platform.

**Enhanced Detection and Response**: The operation helped refine monitoring and response approaches for AI-borne threats, strengthening telemetry, improving correlation between agent behavior and system events, and updating response runbooks to include "AI-specific investigation paths."

## Critical LLMOps Principles Illustrated

The case study reinforces several fundamental LLMOps principles that differ from traditional software operations:

**Mixed Instructions and Data**: AI agents fundamentally "mix instructions and data in unpredictable ways," breaking traditional security models that assume clear separation between code and data. Any untrusted data that enters the context window can potentially influence the AI's behavior through prompt injection.

**Opaque Decision-Making**: AI agents operate as "mystery boxes with opaque decision-making processes," making it difficult to predict or test their behavior comprehensively. This opacity creates challenges for both security testing and production monitoring.

**Model Heterogeneity**: Supporting multiple models from different vendors creates operational complexity, as behaviors and vulnerabilities may vary across models. This requires testing security controls across all supported models rather than assuming uniform behavior.

**Rapid Evolution**: The "rapid pace" of development for both models and agent platforms means that security assumptions can quickly become outdated as components are updated. LLMOps practices must account for this velocity of change.

**Context Window Management**: The case study demonstrates that effective security requires treating the context window as a privileged resource that must be protected from untrusted content. Any mechanism that allows external content into the context represents a potential attack vector.

## Defense in Depth for AI Agents

The case study emphasizes that "no single control would have prevented this attack, but multiple layers of defense can significantly reduce risk." The recommended defensive layers include:

- Input sanitization to catch obvious attacks before they reach the AI
- User confirmation to add human touchpoints for sensitive actions
- Behavioral monitoring to detect successful compromises through anomalous behavior
- Rapid response capabilities to limit damage when compromises occur

The operational guidance includes treating "AI output like user input" and applying the same validation and sanitization to any untrusted data, never relying on the AI for access control decisions, sanitizing all input sources including documents, emails, and calendar entries, implementing behavioral monitoring beyond signature-based detection, planning for compromise with AI-specific incident response procedures, and conducting regular red team exercises with AI-specific attack scenarios.

## Production Deployment Considerations

This case study provides several important lessons for organizations deploying AI agents in production:

**Tool Access Control**: AI agents with access to developer shells, file systems, and external APIs represent significantly expanded attack surfaces compared to traditional applications. Each tool or MCP extension that an AI agent can invoke must be carefully evaluated for security implications.

**System Prompt Integrity**: Any mechanism that allows untrusted content to influence system prompts creates high-severity vulnerabilities. Recipe sharing, configuration imports, and similar features must be designed with strong transparency and validation.

**Multi-Tenant Model Selection**: Allowing users to select different models creates operational complexity for security testing and monitoring. Organizations must decide whether the benefits of model choice outweigh the security and operational challenges.

**Monitoring and Observability**: Traditional application monitoring may not provide adequate visibility into AI agent behavior. Organizations need telemetry that can correlate prompts, tool invocations, and outcomes to understand the full execution chain.

**Rapid Iteration vs. Security**: The tension between rapid development of AI capabilities and maintaining security controls requires careful balance. The case study shows how MCP updates during the red team exercise inadvertently disrupted attacks, but also how this rapid change creates unpredictability.

## Broader Implications for the LLMOps Field

Block's decision to publicly share this security research through transparent documentation represents an important contribution to the emerging LLMOps field. The statement that "by being transparent about both our vulnerabilities and our defensive successes, we hope to help the entire industry build more secure AI systems" demonstrates a maturity in approaching AI security as a collective challenge rather than a competitive advantage.

The case study validates that prompt injection remains a significant threat vector for production AI agents, particularly when combined with social engineering and evasion techniques like Unicode smuggling. The findings suggest that "AI security's future lies in hardening the systems around our models as much as improving the models themselves," indicating that LLMOps must focus on architectural controls, monitoring, and response capabilities rather than relying solely on model improvements to address security concerns.

The successful attacks against an organization with sophisticated security capabilities (Block's Offensive Security team and DART) suggests that AI agent security represents a systemic challenge facing the industry. The fact that existing controls could detect the compromise but required enhancement to fully address AI-specific behaviors indicates that organizations deploying AI agents need to invest in new security capabilities rather than assuming existing controls are sufficient.

Overall, Operation Pale Fire demonstrates that operating AI agents in production requires new security paradigms, enhanced observability, defense-in-depth approaches specifically designed for AI systems, and ongoing collaboration between offensive and defensive teams to stay ahead of evolving threats. The case study provides concrete evidence that LLMOps is a distinct discipline requiring specialized knowledge beyond traditional MLOps or DevSecOps practices.
