---
title: "Solving Tool Confusion and Design Slop in Open Model Coding Agents"
slug: "solving-tool-confusion-and-design-slop-in-open-model-coding-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "prompt-engineering"
  - "error-handling"
  - "token-optimization"
  - "agent-based"
  - "harness-engineering"
  - "system-prompts"
  - "fastapi"
  - "postgresql"
  - "open-source"
  - "documentation"
  - "openai"
  - "anthropic"
  - "google-gcp"
industryTags: "tech"
company: "CommandCode"
summary: "CommandCode, an AI-powered coding agent platform, discovered and solved a critical problem called \"tool confusion\" that was causing open models like DeepSeek V3 to perform poorly in production coding scenarios. By implementing deterministic repair logic that intercepts and fixes malformed tool calls before they cause errors, the team reduced average tool call failures from 50+ per session to near zero. This approach transformed previously unusable models like DeepSeek V3 Flash into production-viable alternatives that could compete with premium models like Claude Opus. The company processes hundreds of billions of tokens monthly and has extended their repair logic approach to other domains including fixing \"design slop\" in AI-generated UIs. The platform also implements an automated skill-learning system called \"Taste\" that captures developer preferences and coding patterns automatically across repositories."
link: "https://www.youtube.com/watch?v=-rIAVuaRjOg"
year: 2026
seo:
  title: "CommandCode: Solving Tool Confusion and Design Slop in Open Model Coding Agents - ZenML LLMOps Database"
  description: "CommandCode, an AI-powered coding agent platform, discovered and solved a critical problem called \"tool confusion\" that was causing open models like DeepSeek V3 to perform poorly in production coding scenarios. By implementing deterministic repair logic that intercepts and fixes malformed tool calls before they cause errors, the team reduced average tool call failures from 50+ per session to near zero. This approach transformed previously unusable models like DeepSeek V3 Flash into production-viable alternatives that could compete with premium models like Claude Opus. The company processes hundreds of billions of tokens monthly and has extended their repair logic approach to other domains including fixing \"design slop\" in AI-generated UIs. The platform also implements an automated skill-learning system called \"Taste\" that captures developer preferences and coding patterns automatically across repositories."
  canonical: "https://www.zenml.io/llmops-database/solving-tool-confusion-and-design-slop-in-open-model-coding-agents"
  ogTitle: "CommandCode: Solving Tool Confusion and Design Slop in Open Model Coding Agents - ZenML LLMOps Database"
  ogDescription: "CommandCode, an AI-powered coding agent platform, discovered and solved a critical problem called \"tool confusion\" that was causing open models like DeepSeek V3 to perform poorly in production coding scenarios. By implementing deterministic repair logic that intercepts and fixes malformed tool calls before they cause errors, the team reduced average tool call failures from 50+ per session to near zero. This approach transformed previously unusable models like DeepSeek V3 Flash into production-viable alternatives that could compete with premium models like Claude Opus. The company processes hundreds of billions of tokens monthly and has extended their repair logic approach to other domains including fixing \"design slop\" in AI-generated UIs. The platform also implements an automated skill-learning system called \"Taste\" that captures developer preferences and coding patterns automatically across repositories."
notion:
  pageId: "377f8dff-2538-809e-a811-d8bcd39c14cc"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-06T05:29:00.000Z"
  lastEditedTime: "2026-06-06T05:29:00.000Z"
  publishedAt: "2026-06-06T05:37:24Z"
---

## Overview

CommandCode is an AI-powered coding agent platform that has evolved from a six-year-old CLI project started in 2020. The founder, Amadou Wace, began building the original CLAI tool after receiving early access to GPT-3 from OpenAI in July 2020, predating GitHub Copilot by over a year. The platform originally operated as LangBase, an AI cloud processing 1.2 billion agent runs monthly, before pivoting to focus exclusively on coding agents. As of the time of this discussion, CommandCode processes hundreds of billions of tokens monthly and has become one of the most-used coding agent platforms for open models, particularly DeepSeek.

The case study centers on two major LLMOps innovations: solving "tool confusion" in open models through deterministic repair logic, and implementing an automated skill-learning system called "Taste" that captures and applies developer preferences without manual configuration.

## The Tool Confusion Problem

CommandCode discovered a critical production issue while scaling to billions of tokens per day with open models, particularly DeepSeek V3 Pro. The team identified a pattern they termed "tool confusion" where open models would repeatedly fail at tool calling in ways that significantly degraded performance and user experience.

The specific manifestation of this problem was that when DeepSeek models made malformed tool calls with incorrect schemas, they would ignore error feedback and repeat the same malformed call an average of 56 times across a billion tokens. For example, when a model would send an optional parameter with an empty object or null value where it didn't belong, the validation library Zod would return a schema error. However, rather than correcting the error, the model would simply repeat the identical malformed call dozens of times.

The founder described this behavior as having "alpha male energy" where the model believes whatever it sends is correct and refuses to be corrected by error messages. The hypothesis is that because these open models are trained on high-quality data from better models, their training reinforces a pattern of "whatever I'm being told is right" which translates into "whatever I'm telling you is also correct, so don't try to correct me."

This problem manifested in several specific ways. Models would send markdown-formatted file paths when plain strings were expected. When attempting to read files, they would fail to specify offset parameters indicating whether to read from the top or bottom of a file. They would emit JSON string types when arrays were expected. These failures would compound, with users experiencing 50+ tool call failures per session, making interactions painfully slow and models appear far less capable than they actually were.

## The Deterministic Repair Logic Solution

Rather than simply returning error messages to the model, CommandCode implemented what they call "repair logic" that deterministically fixes malformed tool calls before execution and provides both the correct result and a repair hint explaining what should have been sent.

The repair logic works like database migrations, with individual repair files for each type of common error pattern. When a malformed tool call is detected, the system automatically repairs it, executes the intended action, and returns both the result and an explanatory note about what the correct format should have been. The analogy used is teaching someone to drive: rather than just explaining what to do correctly, you first prevent the crash, then explain why you intervened.

The results were dramatic. After implementing repair logic, the third tool call after a repair would typically be correct, with models quickly learning the proper patterns. What had been 50+ tool call failures per session dropped to near-zero, and models that were "practically completely not useful" like DeepSeek V3 Flash became production-viable and could compete with premium models.

The repair logic started with 3,200 lines covering four specific repairs but has grown to encompass 16,000 different repair variations across hundreds of billions of tokens. The system now handles not just DeepSeek but also Kimi and MiniMax models. CommandCode processes approximately 600 billion tokens and has generalized the approach across multiple open model families.

One particularly interesting production insight is that models perform better when run without permission prompts. The slowness and interruption caused by permission blocks appears to steer models in the wrong direction, possibly because this isn't how they were trained. One user reportedly ran 12+ hour sessions consuming 70 billion tokens on DeepSeek using CommandCode, which broke the platform's usage tracking page.

## Production Scale and Economics

CommandCode's production scale provides important context for the validity of their findings. The platform processes hundreds of billions of tokens monthly, with individual users consuming tens of billions of tokens. This scale allowed them to identify deterministic patterns across enough data to build comprehensive repair systems.

To prove the effectiveness of their approach and demonstrate that open models could be production-viable, CommandCode launched a "Go Plan" at $1 per month offering 600 million tokens of DeepSeek V3 Pro. This pricing strategy served both as a proof point for the viability of open models and as a way to attract sufficient users to validate their approach at scale. The company believes this may have influenced DeepSeek's own pricing decisions to discount their models and demonstrate their capabilities.

The scale also revealed important competitive intelligence. Claude models are "lenient with tool calls" and can self-correct even when the harness makes mistakes, which obscures harness quality issues. Many developers use Claude Code by simply changing the base API endpoint and key, unaware they're experiencing 50+ tool call failures per session that Claude is silently recovering from. This means comparative benchmarks between models may actually be measuring harness quality rather than model capability.

## The Taste System: Automated Skill Learning

Beyond tool confusion, CommandCode developed a system called "Taste" that automatically learns and codifies developer preferences and coding patterns. This represents a sophisticated approach to the common problem of keeping context and instructions up-to-date for coding agents.

Taste is described as a "meta neuro-symbolic model" that encodes developer behavior based on actual usage patterns rather than upfront configuration. The system monitors developer interactions across repositories, identifying repeated preferences and patterns. For example, if a developer consistently uses pnpm for package management but npm for local CLI linking, Taste captures this nuanced preference automatically.

The learning happens on a per-repository basis, creating skill files that document project-specific preferences. When code is merged to the main branch, the system analyzes accepts, edits, and rejects to identify what patterns to capture. Critically, Taste employs KL divergence analysis to avoid capturing information that LLMs already know well, keeping the skill files focused on truly differentiating preferences rather than bloating them with common knowledge.

The Taste files are stored as markdown in the Git repository itself, making them transparent, reviewable in pull requests, and portable across different tools. They're designed to be human-readable and human-editable, with confidence scores for automatically learned patterns. After building just 70 CLI projects, the founder's entire taste file for CLI development fit in a small markdown file covering preferences like using pnpm only for build dependencies, starting version numbers at 0.0.1, and using clack for interactive prompts.

An important operational insight is that CommandCode initially tried to hide the learning process to create "wow moments" but found they couldn't automatically merge taste files across branches. With 15 engineers working on thousands of branches, the merging of different taste files became a fundamentally human endeavor requiring human judgment about what to keep. This forced them to make the system transparent.

The system has proven particularly effective for enabling junior developers or those learning new technologies. A common pattern observed is developers building one Android app with CommandCode and then finding they can build subsequent Android apps much more quickly because the skill files capture the patterns from the first project. Similarly, developers report using high-quality expensive models like Claude Opus or GPT-4 to build an initial project and establish a high-quality taste file, then using cheaper models to continue development with that taste file guiding them.

## Extending Repair Logic to Design Slop

CommandCode has extended their repair logic approach beyond tool calling to address "design slop," the tendency of LLMs to generate visually similar designs with characteristic patterns like indigo-purple gradients and repetitive layouts.

Through analysis of hundreds of billions of tokens and consultation with professional designers, the team identified that design slop is also a finite set of deterministically fixable patterns. They developed a compositional framework captured in approximately 24 reference documents, 10 design smells, and 7 surface pattern types that designers naturally think through but LLMs skip.

The seven surface patterns represent different design intentions: monitoring surfaces, workflow surfaces, input surfaces, showcase surfaces, narrative surfaces, and others. When asked to design a dashboard, LLMs typically jump directly to implementation without considering the intent behind the design. By forcing them to first identify which surface pattern applies, the quality improves dramatically.

The framework also includes specific technical guidance, such as forcing LLMs to use OKLCH color space instead of HSL. Designers report that LLMs struggle to control lightness in HSL in ways that are obvious to human perception, but perform much better with OKLCH's perceptually uniform color space. The team found that this single change significantly reduced color-related design slop.

When designers reviewed landing pages built with and without the design skill framework, they could identify AI-generated designs within 1.5 seconds when the framework wasn't used. With the framework applied, the differences became much less obvious, and designers estimated the approach could fix 90% of design slop issues.

The design skill system is now bundled as a slash-design command in CommandCode, allowing developers to automatically apply professional design thinking frameworks without needing design expertise. The founder notes that as AI enables more people to build complete applications, design quality has become a key differentiator between good and bad work, making designer-quality output accessible to all builders particularly important.

## Technical Architecture and Philosophy

CommandCode is built on a six-year-old codebase that began in 2020 with early GPT-3 access. It evolved through several phases: starting as CLAI, becoming LangBase with memory infrastructure, and finally pivoting to focus exclusively on coding agents based on the insight that coding agents are the most capable type of agent.

The platform supports both commercial models like Claude and GPT as well as open models, but found product-market fit primarily in the open models space. The architecture is CLI-based, offering a full-fledged coding agent with all expected capabilities including file operations, shell commands, and multi-step workflows.

The team is preparing to open source CommandCode, with an announcement planned for an AI Engineering conference. The founder's background includes 13 years working on WordPress core, and WordPress founder Matt Mullenweg became an angel investor after hearing about the open source plans. The philosophy is to make CommandCode "completely hackable" regardless of where the business model goes.

The product strategy is explicitly modeled on Apple rather than Windows or Linux. Rather than supporting every model like a Windows system where every game works, or requiring users to build their own drivers like Linux, CommandCode will curate the best open and closed models while remaining hackable enough that users can add local models if desired. This represents a middle ground between the comprehensive but complex approach of some competitors and the locked-down approach of others.

## LLMOps Insights and Best Practices

Several important LLMOps insights emerge from CommandCode's production experience:

The concept of "capability gap versus contract gap" is central to understanding LLM performance in production. Many apparent model limitations are actually harness issues. The deterministic repairability of tool confusion demonstrates that what appears to be a model capability problem is often a contract problem between what the harness expects and what the user intends.

Error handling strategy matters enormously at scale. Rather than simply surfacing errors to models and hoping they self-correct, production systems should consider intercepting and repairing errors while providing explanatory context. The "save them then explain" approach proves more effective than "explain then hope they don't crash."

Context management requires automatic systems that prevent staleness. Manual skill files and instruction documents become stale quickly, with humans tending to write grandiose rules during initial setup rather than capturing the micro-decisions that actually matter. Automated learning systems that capture actual usage patterns and remain synchronized with the codebase solve this problem.

Model selection and pricing strategies should account for harness quality. A cheap open model with good tool calling repair logic can outperform an expensive model with poor harness support. The total cost should include both token costs and the engineering effort required to achieve acceptable performance.

Production observability requires tracking tool call failures as a first-class metric. Many developers are unaware they're experiencing dozens of tool call failures per session because their tools hide these failures. Making failures visible enables optimization.

Transparency in automated systems builds trust and enables collaboration. While hiding the learning process created impressive demos, making taste files visible and editable in Git repositories proved essential for team workflows and handling complex merge scenarios.

The repair logic approach represents a form of runtime adaptation that sits between prompt engineering and fine-tuning. It's more dynamic than static prompts but more lightweight than model training, making it practical for rapid iteration in production environments.

## Broader Implications

CommandCode's experience suggests that the gap between open and closed models may be narrower than commonly believed, with much of the perceived difference attributable to harness quality and operational practices. The fact that deterministic repairs can make a "practically completely not useful" model competitive with premium options suggests significant untapped potential in open models.

The scale at which patterns remain deterministic is noteworthy. Even across hundreds of billions of tokens and thousands of users, the repair patterns remain finite and manageable, suggesting that tool calling issues are more systematic than stochastic.

The extension from tool calling repair to design slop repair suggests the approach may generalize broadly. The team is currently exploring security applications, where similar logic could automatically fix common security vulnerabilities. This points toward a general framework for encoding domain expertise as repair logic rather than upfront constraints.

The success of the taste system in capturing developer preferences automatically suggests that explicit configuration of coding agents may eventually become unnecessary, with systems learning preferences implicitly from behavior. This could significantly reduce the friction of adopting AI coding tools.

Finally, the observation that permission systems make models "dumber" has implications for human-in-the-loop system design. The interruption and slowness of permission prompts appears to degrade model performance, suggesting that permission systems should be designed to minimize context disruption rather than simply maximizing human oversight.
