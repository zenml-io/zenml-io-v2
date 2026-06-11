---
title: "Red Teaming an Internal AI Agent Through Prompt Injection and Social Engineering"
slug: "red-teaming-an-internal-ai-agent-through-prompt-injection-and-social-engineering"
draft: false
llmopsTags:
  - "code-generation"
  - "high-stakes-application"
  - "prompt-engineering"
  - "system-prompts"
  - "evals"
  - "agent-based"
  - "open-source"
  - "security"
  - "guardrails"
  - "monitoring"
  - "anthropic"
industryTags: "finance"
company: "Block"
summary: "Block's offensive security team conducted Operation Palefire, a red team operation targeting their internal AI agent called Goose to identify security vulnerabilities before open-sourcing the tool. The team successfully achieved code execution on employee laptops through two campaign approaches: first by embedding invisible Unicode prompt injections in malicious Google Calendar invites that interfaced with Goose's calendar integration, and second by distributing malicious \"recipes\" (shareable workflows) containing system-level prompt injections hidden in invisible text. While the calendar campaign faced challenges with context window limitations and model non-determinism, the recipe-based attack succeeded in compromising a developer machine, though the info-stealer payload was eventually detected by existing security controls. The operation led to important mitigations including Unicode character filtering, improved recipe transparency, prompt injection detection systems, and enhanced calendar security policies."
link: "https://www.youtube.com/watch?v=6sYpcbpsxrc"
year: 2024
seo:
  title: "Block: Red Teaming an Internal AI Agent Through Prompt Injection and Social Engineering - ZenML LLMOps Database"
  description: "Block's offensive security team conducted Operation Palefire, a red team operation targeting their internal AI agent called Goose to identify security vulnerabilities before open-sourcing the tool. The team successfully achieved code execution on employee laptops through two campaign approaches: first by embedding invisible Unicode prompt injections in malicious Google Calendar invites that interfaced with Goose's calendar integration, and second by distributing malicious \"recipes\" (shareable workflows) containing system-level prompt injections hidden in invisible text. While the calendar campaign faced challenges with context window limitations and model non-determinism, the recipe-based attack succeeded in compromising a developer machine, though the info-stealer payload was eventually detected by existing security controls. The operation led to important mitigations including Unicode character filtering, improved recipe transparency, prompt injection detection systems, and enhanced calendar security policies."
  canonical: "https://www.zenml.io/llmops-database/red-teaming-an-internal-ai-agent-through-prompt-injection-and-social-engineering"
  ogTitle: "Block: Red Teaming an Internal AI Agent Through Prompt Injection and Social Engineering - ZenML LLMOps Database"
  ogDescription: "Block's offensive security team conducted Operation Palefire, a red team operation targeting their internal AI agent called Goose to identify security vulnerabilities before open-sourcing the tool. The team successfully achieved code execution on employee laptops through two campaign approaches: first by embedding invisible Unicode prompt injections in malicious Google Calendar invites that interfaced with Goose's calendar integration, and second by distributing malicious \"recipes\" (shareable workflows) containing system-level prompt injections hidden in invisible text. While the calendar campaign faced challenges with context window limitations and model non-determinism, the recipe-based attack succeeded in compromising a developer machine, though the info-stealer payload was eventually detected by existing security controls. The operation led to important mitigations including Unicode character filtering, improved recipe transparency, prompt injection detection systems, and enhanced calendar security policies."
notion:
  pageId: "37cf8dff-2538-80cd-894d-dc6acf142bb4"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-11T11:42:00.000Z"
  lastEditedTime: "2026-06-11T11:42:00.000Z"
  publishedAt: "2026-06-11T12:14:43Z"
---

## Overview

Operation Palefire represents a sophisticated red team exercise conducted by Block's offensive security team targeting Goose, their internally developed AI agent. This case study provides exceptional insights into the security challenges of deploying LLM-based agents in production environments, particularly around prompt injection vulnerabilities, tool integration risks, and the intersection of traditional security threats with AI-specific attack vectors.

Block is a fintech company, making the security implications of AI agent deployment particularly critical. The operation was conducted in fall 2024, with Goose being one of the early AI agents in its category. The timing is significant because Block planned to open-source Goose, and the security team wanted to proactively identify vulnerabilities that external attackers might exploit once the codebase became public.

## The Target: Goose AI Agent Architecture

Goose was designed as an AI agent accessible to both technical engineers and non-technical users. The architecture included several components relevant to understanding the LLMOps security surface:

The agent integrated with multiple underlying language models, primarily Claude Sonnet 3.5 and 3.7 at the time of the operation, though GPT models were also supported. This multi-model support created challenges for developing universal prompt injections since different models exhibited varying levels of resistance to manipulation.

A critical architectural decision was including a developer shell tool call that automatically ships with Goose. This tool enables the agent to execute bash commands directly, which while powerful for legitimate use cases, represented a significant attack surface. The builder-focused mindset that led to this design choice exemplifies the tension between agent capability and security in production LLM systems.

Block implemented an internal MCP (Model Context Protocol) marketplace allowing Goose to integrate with various services. Examples included Google Drive integration and Jira ticket management. This extension architecture, while enabling rich functionality, created multiple potential injection points where untrusted data could enter the model's context.

## Campaign One: Calendar-Based User Prompt Injection

The first attack campaign exploited the Google Calendar MCP integration. The security team identified this as promising because external parties could send calendar invites to Block employees that would appear on company calendars, and importantly, the Google Calendar API allowed disabling email notifications for invites. This meant malicious invites could appear without corresponding phishing emails that security teams typically monitor.

The attack flow worked as follows: when users asked Goose questions like "What's on my calendar today?", the agent would invoke the Google Calendar MCP, retrieve calendar data including the malicious invite, and ingest that content into the model's context. The calendar invite description contained a prompt injection designed to convince the model to execute malicious commands.

A key innovation was the use of invisible Unicode characters to hide the prompt injection. The initial injection was substantial and obvious to human readers, designed to convince Claude Sonnet 3.5 to execute a curl command piping to bash under the pretense of "updating the calendar MCP for security." By encoding this injection using zero-width Unicode characters, the team made it invisible to human inspection while remaining interpretable by the LLM. This technique allowed prompt injections to hide in plain sight within calendar invite descriptions.

The calendar invite design included several social engineering elements: attacker accounts could be removed from the attendee list, custom calendar names could impersonate legitimate internal calendars, and the actual external email address only appeared in small italicized text at the bottom of invites. The team correctly assessed that users don't typically expect malicious calendar invites, unlike phishing emails.

However, Campaign One failed to achieve its objectives. Post-mortem analysis revealed several critical issues that provide important lessons for testing LLM agents in production contexts:

The Google Calendar MCP received a major update during the operation that added significantly more context to the context window, causing it to fill rapidly. This made it less likely the model would execute subsequent tool calls after processing calendar data. This highlights the challenge of maintaining effective prompt injections as system components evolve.

The prompt injection was specifically tuned for Claude Sonnet 3.5 and proved non-universal. Employees using Sonnet 3.7 or GPT-4 were largely unaffected. Even on Sonnet 3.5, the inherent randomness in model outputs meant the injection didn't work reliably.

The team acknowledged they tested in unrealistic conditions using attacker calendars with only two or three invites, while real employee calendars typically contained eight to ten invites. This meant the malicious prompt injection had less influence in actual production contexts with fuller context windows. This represents a critical testing lesson: evaluation environments must reflect production realism including typical context window contents.

The models at that time had more limited context windows compared to later versions, exacerbating the issue of context window saturation. While the team notes this specific concern may not apply to more recent models with larger windows, it illustrates how LLM capability evolution affects attack viability.

The team identified they should have built an automated testing harness to measure prompt injection efficacy across all models and versions. The assumption that prompt injection would be straightforward proved incorrect, underscoring the difficulty of reliable prompt manipulation despite extensive public discussion of the vulnerability class.

Finally, the team recognized that user prompt injection, injecting into the user context rather than system context, inherently has less influence over model behavior. This insight led them to pivot to Campaign Two targeting system-level injection.

## Campaign Two: Recipe-Based System Prompt Injection

Recipes in Goose are reusable workflow templates that users can share with colleagues. Critically, recipes allow customization of both user and system prompts, making them targets for system-level prompt injection which the team assessed would work more reliably than user-level injection.

Recipes are distributed via Goose URL handlers containing base64-encoded JSON specifying the recipe configuration including instructions and prompts. The team successfully embedded prompt injections within recipe instructions, initially creating a proof-of-concept that opened Google Chrome to play a Rick Roll video.

Applying the invisible Unicode technique from Campaign One, the team used tools like the ASCII smuggler to encode prompt injections within recipes so they were invisible to human inspection but fully interpretable by Goose. One subtle detection opportunity existed: the base64-encoded recipe data contained cascading repetitive characters representing zero-width characters, though this would only be noticeable to someone who knew the expected data length.

The revised calendar invite for Campaign Two was labeled "Rescheduled" and included social engineering encouraging employees to use "this really cool tool or feature we made." The Goose recipe URL was embedded as a hyperlink in the event description, actually redirecting through an attacker-controlled website before loading the malicious recipe, though the redirect was fast enough to go unnoticed.

An unexpected element emerged when the team included a Google Meet link in calendar invites and employees actually joined the meetings. The first occurrence caught the red team unprepared, but in a subsequent iteration they prepared a presentation deck about recipes to walk attendees through execution. This highlights a fascinating dimension where traditional social engineering intersects with technical prompt injection attacks.

The team noted that Google Meet at the time poorly notified users they were joining external meetings, only showing a yellow box that required hovering to reveal external participants. This made the social engineering aspect particularly effective.

Despite refined techniques, Campaign Two initially failed to achieve reliable code execution due to a typo in the payload script. Interestingly, during testing Goose had automatically corrected the typo, masking the error, but in production the correction didn't occur reliably. This demonstrates another dimension of non-determinism in agent behavior affecting attack reliability.

The team also noted that Goose versions changed rapidly, and recipe behavior varied across versions affecting execution reliability. They were additionally hampered by Google Calendar rate limits allowing only about 50 invites per day, which would have made achieving success through volume difficult.

## Final Success Vector

The operation ultimately succeeded when the team contacted the Goose development team through public channels under the guise of reporting a UI bug related to right-to-left text in recipes. One team operator familiar with RTL text crafted a legitimate-looking bug report. As developers worked to assist and investigate the reported issue, they executed the malicious recipe as part of their workflow, triggering the payload.

The payload was an info-stealer modeled after real-world examples. The development of this payload was informed by Block's threat intelligence team, which had observed significant info-stealer activity in the wild and wanted to validate their detection capabilities. The info-stealer performed typical data exfiltration activities after being downloaded and executed via the curl-to-bash command in the prompt injection.

The operation was eventually detected when the info-stealer triggered alerts based on suspicious behavior. The blue team reached out through red team deconfliction workflows and the offensive security team acknowledged their activity. This validated that Block's existing controls for info-stealer detection were functioning effectively, though it also demonstrated that the initial compromise through prompt injection had succeeded.

## Mitigations and Detection Strategies

Following Operation Palefire, Block implemented several mitigations addressing different aspects of the attack chain:

Unicode character filtering was implemented to strip non-standard Unicode characters from Goose input and recipes. While this technique wasn't universally adopted across AI agents at the time of the operation, it has since become more common. This represents a straightforward but effective control against invisible text-based prompt injections.

Recipe transparency was significantly enhanced so recipe content is thoroughly displayed to users before execution, including visualization of hidden text. Previously users would have needed to manually base64-decode recipes to inspect contents, creating friction that discouraged security review.

Prompt injection detection systems were deployed, including experimentation with various detection models. The team found that custom-built classifiers produced better results than open-source solutions, which generated excessive false positives creating alert fatigue. They implemented a hybrid approach using a binary classifier followed by LLM-based evaluation for deeper analysis of potential injections.

A bad bash command detector using n-gram classification was developed to identify malicious shell commands, with LLM evaluation providing additional analysis. This represents a defense-in-depth approach recognizing that preventing prompt injection entirely may be infeasible, so detecting malicious actions becomes critical.

Command allow-listing was implemented recognizing that not all users need access to the full range of bash commands. This principle of least privilege reduces the potential damage from successful prompt injections.

Google Calendar security policies were modified so external parties must send an email first before calendar invites appear on employee calendars. Employees must accept the email invitation before the event appears. This enables email scanning using traditional phishing detection techniques to identify prompt injections or Unicode attacks in invite content before they reach calendars and potentially Goose's context.

## Detection Challenges and Insights

A subsequent purple team exercise with the blue team revealed detection opportunities. Most interesting was that invisible Unicode characters, while not rendered properly by models or to human viewers, appeared as unusual characters in logs. This provided a detection signal, though it required specific monitoring rules to identify these anomalous characters.

However, the team acknowledged that hunting for prompt injections remains challenging with no universal solution. The problem is inherently difficult because distinguishing malicious instructions from legitimate user intent within natural language is complex, particularly at scale where false positives become prohibitive.

When questioned about prompt injection detectors, the presenter acknowledged struggling with acceptable false positive and true positive rates, consistent with industry-wide challenges. The custom classifier approach combined with LLM-based evaluation showed the most promise but remains an active area of development.

From a detection perspective, the presentation discussed the "lethal trifecta" of untrusted content, data, and an exfiltration method. The team's bias is toward detecting exfiltration as potentially the most tractable element, though they acknowledged difficulty determining malicious intent from agent behavior alone.

The team also performed internal audits of MCPs in their marketplace to identify exfiltration risks within the integrations themselves. An example was finding a Google Docs MCP that allowed sharing documents with external parties from within Goose, creating a legitimate exfiltration channel that would bypass many security controls. This highlights that in agent architectures, the tools and integrations themselves represent significant security surfaces beyond the LLM.

## Testing and Evaluation Challenges

Operation Palefire exposed significant challenges in testing LLM agents for security vulnerabilities, with implications for LLMOps more broadly:

Non-determinism in model outputs creates fundamental challenges for testing attack reliability. Even when prompt injections worked during testing, they might fail during execution, and vice versa. When asked about accounting for non-determinism in efficacy measurements, the presenter acknowledged lacking a definitive answer, suggesting repeated testing at large scale but recognizing the inherent limitations.

Model versioning and updates can break attacks between testing and execution. The team experienced cases where techniques worked during pre-execution testing but failed the next day due to model changes. They suggested testing and execution should occur on the same day to minimize this risk, though acknowledged this isn't always feasible operationally.

The rapid evolution of agent platforms like Goose means that recipe behaviors and other features change across versions, affecting attack reliability and requiring continuous testing to maintain effectiveness.

Context window realism is critical for effective testing. The team's initial failure stemmed partly from testing with minimal context (few calendar items) when production environments contained substantially more, changing how the model prioritized and processed their injection. Evaluation environments must reflect production context patterns.

Model-specific tuning requirements mean that prompt injections aren't universal across different LLMs. The team's focus on Claude Sonnet 3.5 meant their techniques were less effective against Sonnet 3.7 or GPT models. This creates challenges for both attackers and defenders in multi-model environments.

The team emphasized they should have built automated testing harnesses to systematically evaluate prompt injection efficacy across models, versions, and contexts. The assumption that prompt injection would be straightforward proved incorrect, highlighting the sophistication required to exploit these vulnerabilities reliably in production systems.

## Broader LLMOps Implications

This case study illustrates several critical considerations for deploying AI agents in production:

The integration of LLMs with tool-calling capabilities, particularly powerful tools like shell command execution, creates significant security surfaces. While necessary for agent functionality, these capabilities require careful security design and monitoring.

The context window becomes a security boundary. Any mechanism that allows untrusted content into the context window, whether through calendar integrations, email, document processing, or other MCPs, represents a potential injection point. This requires security review of all integration points.

System-level prompt access through features like recipes or configuration templates represents higher risk than user-level interactions because system prompts have greater influence over model behavior and may be less scrutinized by users.

Social engineering remains effective even in technical contexts. The successful recruitment of developers into running malicious recipes through bug reports demonstrates that traditional social engineering complements technical exploits in AI agent attacks.

Model diversity in agent deployments creates both security and reliability challenges since different models exhibit different behaviors and vulnerabilities requiring different defensive approaches.

The rapid evolution of both LLM capabilities and agent platforms means security postures require continuous reevaluation. Controls that work today may become ineffective as models gain larger context windows, better instruction-following capabilities, or other improvements.

Detection strategies must focus on multiple points in the attack chain including input sanitization, prompt injection detection, command monitoring, and exfiltration detection. No single control is likely sufficient given the difficulty of reliably detecting prompt injections.

This case study represents one of the most detailed public accounts of red teaming an AI agent in a production enterprise environment, providing valuable lessons for organizations deploying similar systems. The transparency around both successes and failures offers practical insights for building more secure LLM-based agents.
