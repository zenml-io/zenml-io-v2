---
title: "Security Review System for AI Skills in Developer Workflows"
slug: "security-review-system-for-ai-skills-in-developer-workflows"
draft: false
llmopsTags:
  - "fraud-detection"
  - "code-generation"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "cicd"
  - "security"
  - "guardrails"
industryTags: "finance"
company: "Nubank"
summary: "Nubank, a digital bank operating in a regulated financial environment, developed a comprehensive security review system to vet AI skills and plugins before they reach developers. The problem addressed was that AI skills, which extend the capabilities of AI coding assistants and agents, function like supply chain dependencies and can introduce security risks including credential leaks, dangerous shell commands, and excessive permissions. Nubank created a tool called Skill Vector that employs a hybrid approach combining deterministic scanning and LLM-based review to assess AI skills before they are shared via an internal marketplace. This system scanned over 2,000 AI skills, identified more than 1,500 security risks, and remediated approximately 1,000 of them, successfully blocking several high-risk skills from reaching production while providing developers with immediate feedback through pull request comments."
link: "https://www.youtube.com/watch?v=iKQ78wyJEXU"
year: 2026
seo:
  title: "Nubank: Security Review System for AI Skills in Developer Workflows - ZenML LLMOps Database"
  description: "Nubank, a digital bank operating in a regulated financial environment, developed a comprehensive security review system to vet AI skills and plugins before they reach developers. The problem addressed was that AI skills, which extend the capabilities of AI coding assistants and agents, function like supply chain dependencies and can introduce security risks including credential leaks, dangerous shell commands, and excessive permissions. Nubank created a tool called Skill Vector that employs a hybrid approach combining deterministic scanning and LLM-based review to assess AI skills before they are shared via an internal marketplace. This system scanned over 2,000 AI skills, identified more than 1,500 security risks, and remediated approximately 1,000 of them, successfully blocking several high-risk skills from reaching production while providing developers with immediate feedback through pull request comments."
  canonical: "https://www.zenml.io/llmops-database/security-review-system-for-ai-skills-in-developer-workflows"
  ogTitle: "Nubank: Security Review System for AI Skills in Developer Workflows - ZenML LLMOps Database"
  ogDescription: "Nubank, a digital bank operating in a regulated financial environment, developed a comprehensive security review system to vet AI skills and plugins before they reach developers. The problem addressed was that AI skills, which extend the capabilities of AI coding assistants and agents, function like supply chain dependencies and can introduce security risks including credential leaks, dangerous shell commands, and excessive permissions. Nubank created a tool called Skill Vector that employs a hybrid approach combining deterministic scanning and LLM-based review to assess AI skills before they are shared via an internal marketplace. This system scanned over 2,000 AI skills, identified more than 1,500 security risks, and remediated approximately 1,000 of them, successfully blocking several high-risk skills from reaching production while providing developers with immediate feedback through pull request comments."
notion:
  pageId: "3b4f8dff-2538-80a2-a0f9-c93ba4d4b624"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:31:00.000Z"
  lastEditedTime: "2026-08-06T11:31:00.000Z"
  publishedAt: "2026-08-06T11:46:19Z"
---

## Overview

Nubank, a digital banking institution, developed a production security system to address the emerging risks associated with AI skills in developer workflows. Lucas Palma, the Product Security Manager at Nubank, presented this case study focusing on how the organization built and deployed a security review system that vetted over 2,000 AI skills before they reached developers. The core insight driving this work is that AI skills, while appearing as simple configuration, actually behave like supply chain dependencies similar to libraries and packages, and therefore require systematic security review.

The context for this work is important: Nubank operates in a regulated financial environment where security, auditability, and safety by default are critical requirements. The organization needed to balance developer productivity desires for faster coding, better context, and reduced repetitive work against regulatory requirements and security imperatives. This tension between developer velocity and security compliance is a common challenge in production AI systems, particularly in regulated industries.

## Problem Definition and Scope

AI skills represent a new type of supply chain component in the AI era. These skills bundle instructions and context that guide AI models or agents in generating code or performing actions. When developers share AI skills, the creator of the skill effectively guides the code generation of anyone who uses that skill. This creates a security challenge because malicious or poorly designed skills can introduce vulnerabilities without developers realizing it.

Nubank identified several specific risk categories associated with AI skills. These include credentials being requested and hardcoded into generated code, leading to potential data leaks when credentials end up in logs or version control. Shell commands generated by skills can be destructive if the skill instructs the AI to use dangerous operations. File modification permissions can be overly broad, granting more access than necessary. Even simple typos in skill definitions can lead to dangerous behaviors depending on usage context.

The organization recognized that the traditional supply chain, which includes packages, containers, and models, now extends to AI skills, plugins, MCP servers, agent rules, and similar components. This expanded attack surface required new security controls.

## Solution Architecture: Skill Vector

Nubank developed a tool called Skill Vector as the centerpiece of their security review system. The tool integrates into the development workflow at multiple checkpoints, providing both local scanning capabilities for developers and automated checks in the continuous integration pipeline.

The workflow operates as follows: when a developer creates or modifies an AI skill, they can run Skill Vector locally to iterate on the skill until it passes security checks. This local scanning capability is important because it provides fast feedback during development. When the developer is ready to share the skill, they open a pull request to add it to Nubank's internal marketplace. At this point, Skill Vector runs again in the CI pipeline to ensure the developer actually ran the latest version locally and that no changes were introduced.

The architecture deliberately places security checks before marketplace distribution. Skills cannot reach the canonical internal marketplace without passing through Skill Vector review. This boundary is critical because it provides a chokepoint where security policy can be enforced consistently.

## Hybrid Scanning Approach

A key technical decision in Skill Vector's design is the hybrid approach combining deterministic scanning with LLM-based review. This architecture reflects a sophisticated understanding of the strengths and limitations of different analysis techniques.

Deterministic scanners use regular expressions and pattern matching to identify straightforward security risks. These checks are fast, reliable, and produce consistent results. They work well for detecting known anti-patterns like hardcoded credentials, specific dangerous commands, or overly permissive file access patterns.

However, deterministic approaches struggle with contextual understanding. This is where LLM-based review becomes valuable. The LLM component analyzes behavior in context, understanding whether a particular instruction or command is risky given how the skill is likely to be used. The presentation acknowledges a critical limitation of LLMs in this context: depending on temperature settings, the same skill might be flagged as risky in one scan but not in another. This non-determinism is exactly why both approaches are needed rather than relying solely on LLMs.

The hybrid approach allows Skill Vector to cover a broad range of security checks. The non-exhaustive list of scanned risks includes unsafe instructions, behavioral drift where an agent's actual behavior diverges from intended behavior, destructive shell commands, inappropriate file modifications, credential request patterns, unintentional data exposure, overly broad permissions, and risky MCP usage patterns.

## Integration and Developer Experience

Skill Vector is designed to integrate seamlessly into existing developer workflows. When scans complete, findings are reported directly in pull requests, providing developers with actionable feedback in context. This usability consideration is important because it reduces friction and helps developers understand what needs to change without requiring them to switch contexts or consult separate security dashboards.

The system also generates SARIF output, a standardized format for static analysis results. This SARIF output feeds into Nubank's broader security tooling ecosystem and vulnerability management program. By integrating with existing security infrastructure, Skill Vector ensures that AI skill security is tracked and managed with the same rigor as other security vulnerabilities.

The decision logic in Skill Vector operates on a policy-driven basis. Depending on severity and organizational policy, a skill might be allowed as-is, allowed but flagged for remediation, or blocked entirely from the marketplace. This graduated response allows the organization to balance security with developer productivity, blocking only the most dangerous skills immediately while allowing lower-severity issues to be addressed over time.

## Production Results and Impact

The quantitative results provide insight into the scale of the security challenge. Scanning over 2,000 AI skills revealed more than 1,500 individual security risks. The presentation clarifies that this doesn't mean 1,500 skills had problems, since a single skill can contain multiple risks. Approximately 1,000 of these risks were promptly remediated after identification. Critically, some truly risky skills were blocked before reaching the marketplace, preventing potential security incidents.

Nubank also conducted a historical scan of skills created before Skill Vector was implemented. This retroactive analysis identified previously unknown risks that were then entered into the vulnerability management program for tracking and remediation. This demonstrates a mature approach to security that addresses not just new development but also legacy components.

## Lessons Learned and Technical Insights

The presentation provides valuable lessons about what worked well and what needed improvement, offering insight into the practical realities of deploying LLM-based security tooling in production.

Successful elements included the hybrid deterministic and LLM scanning approach, with deterministic scanners handling clear anti-patterns and LLM review providing behavioral context. The SARIF output integration and pull request commenting both proved valuable for usability and integration into existing workflows.

Several areas needed improvement. Not all shell commands carry equal risk, but early versions of the system treated them uniformly. The team learned to differentiate based on context and impact. Some security signals were weak and provided more noise than value, suggesting the importance of tuning detection rules based on real-world results. Prompt-level "ask for confirmation" instructions revealed a subtle but important issue: if a skill instructs the AI to ask for confirmation, the AI might interpret its own prompting as confirmation rather than requiring true human approval. This highlights the challenge of implementing genuine human-in-the-loop controls in AI systems.

Another lesson involved context-dependent risk. Some warnings seemed harmless if a skill ran locally on a developer's machine but could be impactful if the skill were used in production environments. This suggests the need for environment-aware risk assessment.

Findings without clear remediation guidance proved troublesome for developers. This underscores the importance of actionable security feedback rather than simply flagging issues without explaining how to fix them.

## Scalability and Future Direction

Looking forward, Nubank identified several challenges and next steps. One concern is the potential proliferation of marketplaces. If developers create alternative marketplaces outside the canonical one, Skill Vector needs to proactively detect and scan those as well to maintain security coverage.

The organization recognized that the lessons from AI skills apply to a broader range of AI components. The same security review approach is being extended to plugins, MCP servers, agent rules, and hooks. Nubank has developed related tools like MCP Vector and rules checks that apply similar hybrid scanning approaches to these other component types.

The system is being enhanced with different security gates depending on policies and marketplace contexts. Tool-level enforcement is being implemented to ensure audit logs, trusted gateways, and other security controls are in place. The organization emphasizes the importance of a trusted AI marketplace as a canonical way to scan and share AI components safely.

An important point about third-party components: the system doesn't only scan internally developed skills. When developers want to use third-party skills or plugins, they are encouraged to upload them to the internal marketplace so they can be scanned and vetted before use. This provides a consistent security posture across both internal and external AI components.

## Critical Assessment and Broader Implications

This case study represents a mature approach to a genuinely novel security challenge. The recognition that AI skills function as supply chain dependencies is insightful and has broad applicability beyond Nubank. The hybrid scanning approach acknowledges the limitations of both deterministic and LLM-based analysis rather than over-relying on either approach alone.

However, several questions remain about this approach. The non-determinism of LLM-based scanning is acknowledged but not fully resolved. Running scans multiple times might catch inconsistent results, but this introduces latency and complexity. The balance between security and developer velocity is claimed but not quantified. It would be valuable to understand how often legitimate skills are blocked or delayed by false positives.

The reliance on an internal marketplace as the security boundary is effective only if developer adoption is high. If developers can easily bypass the marketplace and share skills through other channels, the security model breaks down. The concern about multiple marketplaces emerging suggests this is a real risk.

The approach of scanning third-party skills by requiring them to be uploaded to the internal marketplace is pragmatic but creates friction. Developers may be tempted to use third-party skills directly without this vetting step, especially if the upload and review process is slow.

Despite these considerations, the case study demonstrates thoughtful application of LLMs in a production security context. The system provides real value by identifying over 1,500 risks and blocking dangerous skills from production. The integration with existing developer workflows and security infrastructure shows maturity in deployment approach. The lessons learned section demonstrates honest reflection on what worked and what didn't, which is valuable for others implementing similar systems.

This work also highlights an emerging category of LLMOps challenges around securing the AI development supply chain itself, not just the outputs of AI systems. As AI coding assistants become ubiquitous, the ecosystem of skills, plugins, and extensions around these tools represents a new attack surface that requires systematic security controls. Nubank's approach provides a model for how organizations can address this challenge, though the space will continue to evolve as AI development tools mature.
