---
title: "Automating Research Outreach and Community Management with LLM Agents"
slug: "automating-research-outreach-and-community-management-with-llm-agents"
draft: false
llmopsTags:
  - "document-processing"
  - "customer-support"
  - "chatbot"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "evals"
  - "open-source"
  - "documentation"
  - "anthropic"
  - "hugging-face"
  - "meta"
  - "google-gcp"
  - "nvidia"
  - "microsoft-azure"
industryTags: "tech"
company: "Hugging Face"
summary: "A machine learning engineer at Hugging Face automated large-scale research outreach work by deploying LLM-powered agents to identify new machine learning papers, assess whether their artifacts should be migrated to Hugging Face, and automatically create GitHub issues and pull requests. The problem was that researchers frequently published model weights and datasets on fragmented platforms like Google Drive, GitHub releases, and Dropbox, hurting discoverability. The solution evolved from a deterministic workflow-based approach in 2024 to a more autonomous agent-based system, processing hundreds of papers nightly via cron jobs on GitHub Actions and Modal. Results include thousands of successfully opened GitHub issues with only two negative responses, migration of hundreds of research artifacts to Hugging Face, significant engagement from major research organizations including Apple and Google DeepMind, and a Twitter account with over 90,000 followers posting research updates autonomously."
link: "https://www.youtube.com/watch?v=FLUoowDJg4I"
year: 2024
seo:
  title: "Hugging Face: Automating Research Outreach and Community Management with LLM Agents - ZenML LLMOps Database"
  description: "A machine learning engineer at Hugging Face automated large-scale research outreach work by deploying LLM-powered agents to identify new machine learning papers, assess whether their artifacts should be migrated to Hugging Face, and automatically create GitHub issues and pull requests. The problem was that researchers frequently published model weights and datasets on fragmented platforms like Google Drive, GitHub releases, and Dropbox, hurting discoverability. The solution evolved from a deterministic workflow-based approach in 2024 to a more autonomous agent-based system, processing hundreds of papers nightly via cron jobs on GitHub Actions and Modal. Results include thousands of successfully opened GitHub issues with only two negative responses, migration of hundreds of research artifacts to Hugging Face, significant engagement from major research organizations including Apple and Google DeepMind, and a Twitter account with over 90,000 followers posting research updates autonomously."
  canonical: "https://www.zenml.io/llmops-database/automating-research-outreach-and-community-management-with-llm-agents"
  ogTitle: "Hugging Face: Automating Research Outreach and Community Management with LLM Agents - ZenML LLMOps Database"
  ogDescription: "A machine learning engineer at Hugging Face automated large-scale research outreach work by deploying LLM-powered agents to identify new machine learning papers, assess whether their artifacts should be migrated to Hugging Face, and automatically create GitHub issues and pull requests. The problem was that researchers frequently published model weights and datasets on fragmented platforms like Google Drive, GitHub releases, and Dropbox, hurting discoverability. The solution evolved from a deterministic workflow-based approach in 2024 to a more autonomous agent-based system, processing hundreds of papers nightly via cron jobs on GitHub Actions and Modal. Results include thousands of successfully opened GitHub issues with only two negative responses, migration of hundreds of research artifacts to Hugging Face, significant engagement from major research organizations including Apple and Google DeepMind, and a Twitter account with over 90,000 followers posting research updates autonomously."
notion:
  pageId: "3c6f8dff-2538-8059-af50-fb4cc8b1ac2d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-24T09:09:00.000Z"
  lastEditedTime: "2026-08-24T09:09:00.000Z"
  publishedAt: "2026-08-24T09:16:23Z"
---

## Overview

This case study describes how Niels, a machine learning engineer on the Community Science team at Hugging Face, systematically automated his job responsibilities using LLM-powered agents deployed in production. The core problem addressed was the fragmentation of machine learning research artifacts across various platforms, which hurt discoverability and reproducibility. Researchers were publishing model weights and datasets on Google Drive, GitHub releases, Dropbox, Zenodo, and other platforms rather than centralized repositories like Hugging Face, where metadata tagging, documentation, and tooling could improve accessibility.

The Community Science team's mission became migrating these artifacts to Hugging Face by reaching out to researchers through GitHub issues and pull requests, encouraging them to publish on the platform. Initially, this outreach was performed manually, but the explosive growth in AI research publications, particularly from major conferences like NeurIPS, made manual outreach completely unscalable. The solution involved building and deploying LLM-based automation systems that could handle hundreds of papers daily, opening GitHub issues, creating pull requests, following up with researchers, and even posting results to internal Slack channels.

## Initial Workflow and Architecture Decisions

The presenter describes a critical architectural decision point that many LLMOps practitioners face: whether to build a deterministic workflow or a fully autonomous agent. In 2024, when the initial system was built, Anthropic had published their influential blog post "Building Effective Agents," which advocated for starting simple and avoiding agent frameworks when possible. Following this guidance, the initial implementation used a deterministic workflow approach that replicated the manual process step-by-step.

The workflow consisted of several discrete steps. First, the system would identify a research paper and attempt to find its associated GitHub repository URL. Next, it would read the repository's README file to understand the project. Then, it would assess whether interesting new artifacts existed that should be shared on Hugging Face. This assessment included checking if artifacts were already on Hugging Face, and if so, whether model cards or dataset cards were properly formatted with appropriate metadata tags. Based on this assessment, the system would either open a pull request to improve existing documentation or create a GitHub issue requesting artifact migration. Finally, it would follow up with authors as needed.

This workflow was implemented as a simple Python script using LLM API calls at each decision point, without any agent framework. The deterministic nature provided significant control and predictability, which was valuable for a system that would be opening hundreds of GitHub issues daily. The architecture visualization was created using the Excalidraw MCP server in Cursor, demonstrating integration with modern development tools.

## Deployment Infrastructure and Observability

The deployment strategy employed standard DevOps practices adapted for LLM workloads. The core system runs as a cron job scheduled to execute nightly using GitHub Actions. This approach was inspired by a blog post about free cron jobs with GitHub Actions, which offers a generous free tier suitable for such automation tasks. Running the workflow overnight meant that when the engineer woke up, hundreds of GitHub issues would already be created and ready for potential follow-up.

For observability and monitoring, the system integrates with LangFuse, an LLMOps platform for tracing and observability. LangFuse provides visibility into what the LLM is doing at each step, including inputs, outputs, prompts, cost tracking, and latency measurements. This observability layer is critical for understanding system behavior, debugging issues, and optimizing performance and costs in production. The presenter explicitly recommends LangFuse for its tracing capabilities, highlighting the importance of monitoring in production LLM systems.

The initial workflow-based system successfully automated the creation of GitHub issues, but this created a new bottleneck: responding to the hundreds of notifications and replies that researchers posted on those issues. Initially, the engineer continued to manually handle follow-up responses, but this too became unsustainable, leading to the second phase of automation.

## Evolution to Autonomous Agents

Several months after deploying the initial workflow-based system, the presenter built a second system to automate follow-up responses to GitHub issues. This time, the architectural approach shifted toward a fully autonomous agent design. This decision was influenced by changing industry perspectives on agents. By November of the previous year, at the AI Engineer conference in New York, Anthropic presented a workshop on their Claude Agent SDK where they suggested that language models had improved sufficiently to make autonomous agents more viable than they had previously recommended.

Additionally, a presentation by Cursor at the European AI Engineer conference in London described how they replaced 12,000 lines of sophisticated custom workflow code with just 200 lines of agent code using skills and tools. This resonated with the presenter's experience, where thousands of lines of custom code could now be replaced with a simple agent equipped with a CLI tool and a skill definition.

The autonomous agent architecture for follow-up handling uses the Claude Agent SDK, though the model itself was recently switched from Claude to GLM 5.2. This model change highlights an important trend in LLMOps: the rapid improvement and commoditization of open-source models. GLM 5.2 demonstrated strong performance on benchmarks like Cursor Bench and Post-Training Bench, actually exceeding Claude Opus 4.8 performance in some cases while being cheaper. For an organization like Hugging Face, which champions open-source AI, using GLM 5.2 aligned with both technical and philosophical priorities.

The agent accesses GLM 5.2 through Hugging Face's inference providers service, which wraps multiple inference providers including Together AI, Fireworks, and Cerebras in a unified interface that's compatible with both OpenAI and Anthropic APIs. This abstraction layer simplifies model switching and vendor management, both critical concerns in production LLMOps.

## Tools, Skills, and Deployment Platform

The autonomous agent's tool set is intentionally minimal. The primary tool is Bash, giving the agent terminal access to execute Hugging Face CLI commands. This design demonstrates an important principle in agent design: rather than building numerous specialized tools, providing access to a comprehensive CLI can enable a wide range of capabilities. The agent combines the CLI tool with a "Hugging Face CLI skill," which apparently provides context about how to use the CLI effectively for common tasks.

Beyond interacting with Hugging Face, the agent can also post comments on GitHub for follow-up communication and post messages to the team's Slack channel to report results. This multi-platform capability enables end-to-end automation of the entire workflow from paper identification through follow-up communication and internal reporting.

For deployment, the system uses Modal, a platform for running Python applications in the cloud. Modal was chosen specifically for its batch processing capabilities, which allow spinning up numerous containers in parallel. Each container runs one agent loop processing a single GitHub issue. This parallel processing architecture is essential for handling the volume of interactions efficiently. Modal's fast startup times and ease of use made it particularly suitable for deploying agents that run in the background or overnight.

The invocation method for the follow-up agent is interesting from an LLMOps perspective. While it could be deployed as a cron job like the initial workflow, the presenter typically triggers it manually using a custom skill created in Cursor called "process unread Modal." This skill invokes Composer 2.5, the primary agent in Cursor, which then invokes the follow-up agents deployed on Modal. This creates a meta-agent pattern where agents invoke other agents, representing the kind of sophisticated automation that practitioners are increasingly discussing.

## Evaluation and Quality Control

A critical concern with any automated outreach system is avoiding "slop" or low-quality automated content that spams the internet. The presenter addresses this concern by referencing Hamel Husain's "LLM Evals FAQ" blog post. Hamel is described as a leading expert in LLM evaluation, and his guidance is explicitly recommended for anyone building agent systems that interact publicly.

The evaluation approach appears to balance automated assessment with human oversight. The presenter mentions that out of thousands of GitHub issues created, only two negative responses have been received, with one researcher calling it "slop" and closing the issue. This extremely low negative response rate suggests effective quality control, though the specific evaluation techniques aren't detailed in the presentation.

Interestingly, the presenter doesn't disclose that the GitHub issues are created by agents, reasoning that if people knew it was a bot, they might quickly dismiss the issues. This raises ethical questions about automation disclosure, though the presenter justifies it by noting that the agent posts exactly the same content they previously posted manually, and the outcomes are generally positive for both researchers and the broader community.

The quality of agent outputs is demonstrated through several examples. Agents complete model card templates appropriately, including relevant paper information, GitHub readme content, and PDF details. In one amusing case, an agent added the presenter to the model card authors section, noting "Niels part of the Hugging Face community science team," despite never being explicitly prompted to do so. This demonstrates both the capability of modern LLMs to infer appropriate context and the occasional unpredictability that characterizes agent systems.

## Results and Impact

The quantitative and qualitative results demonstrate significant production impact. The system processes hundreds of research papers nightly, automatically creating GitHub issues and pull requests. The follow-up agent processes batches of GitHub notifications, handling responses from researchers without human intervention. Results are posted to the team's Slack channel multiple times as artifacts are successfully migrated.

High-profile successes include outreach to researchers from Apple, Google DeepMind, and the migration of all OCR models from Paddle OCR, a Chinese company. One particularly notable GitHub issue for the "Tiny Recursive Models" paper received over 60 upvotes from community members requesting the model be released on Hugging Face. This demonstrates how the automation enables not just researcher outreach but community-driven pressure for artifact sharing.

The presenter also describes building a Twitter account called Daily Papers that uses the same underlying workflow to post interesting research papers and artifacts. This account has grown to over 90,000 followers without manual involvement, posting updates every four hours or whenever cool releases appear on Hugging Face. The account uses Gemini to determine the best visual to include in tweets, with some tweets receiving over 2,000 likes. This represents a secondary production deployment of the same core LLMOps infrastructure.

## Technical Lessons and Best Practices

Several important LLMOps lessons emerge from this case study. First, the evolution from deterministic workflows to autonomous agents reflects the rapid improvement in language model capabilities. What required careful orchestration and control in 2024 became feasible with more autonomous approaches just months later. This suggests that LLMOps practitioners should regularly reassess architectural decisions as models improve.

Second, the importance of observability and tracing cannot be overstated. Integrating LangFuse from the beginning provided critical visibility into system behavior, costs, and performance. For any production LLM system, especially one interacting publicly at scale, comprehensive monitoring is essential.

Third, the minimalist approach to tools and frameworks proved effective. Rather than building complex tool ecosystems or relying on heavy agent frameworks, using a single CLI with appropriate skills enabled broad capabilities while maintaining simplicity and control. This aligns with the general principle of starting simple and adding complexity only as needed.

Fourth, the batch processing architecture on Modal demonstrates how modern cloud platforms can support agent workloads efficiently. The ability to spin up parallel containers, each running an independent agent loop, enables scalable processing of high-volume tasks. This is particularly valuable for overnight or background processing where latency isn't critical but throughput is essential.

Fifth, evaluation and quality control remain crucial challenges. While the low negative response rate suggests success, the lack of detailed evaluation methodology leaves questions about how quality is actually measured and maintained. The reference to Hamel Husain's work suggests that rigorous evaluation practices are employed, but practitioners would benefit from more specifics about evaluation pipelines, metrics, and feedback loops.

## Broader Context and Future Directions

The case study situates itself within broader trends in open-source AI and research infrastructure. The presenter mentions ongoing work to revive Papers With Code, a website that was acquired by Meta and subsequently discontinued. The revival effort aims to make research and state-of-the-art results more accessible, including benchmark leaderboards for various tasks and educational resources explaining technical terms. This represents an expansion of the agent-driven approach to broader knowledge management and curation.

The shift from closed-source models like Claude to open-source alternatives like GLM 5.2 reflects increasing confidence in open model capabilities. The presenter explicitly states that open models are now good enough to replace closed-source alternatives for many use cases, with better performance and lower costs. This has significant implications for LLMOps economics and vendor lock-in concerns.

The meta-agent pattern, where Cursor's Composer agent invokes the Modal-deployed agents, hints at emerging patterns in agentic workflows. As agents become more capable, orchestrating multiple specialized agents for different tasks may become a common architectural pattern. This raises interesting questions about agent coordination, failure handling, and overall system design.

The ethical dimensions of undisclosed automation deserve consideration. While the presenter argues that outcomes are positive and content is identical to what they previously created manually, the broader question of when and how to disclose AI-generated content remains contentious. As agent-driven interactions become more common, community norms and expectations around transparency may need to evolve.

## Conclusion

This case study demonstrates sophisticated LLMOps in production, showing how LLM-powered agents can automate knowledge work at scale. The evolution from deterministic workflows to autonomous agents, the careful selection of deployment infrastructure, the emphasis on observability, and the demonstrated results all provide valuable lessons for practitioners. The system successfully processes hundreds of papers daily, manages thousands of GitHub interactions, and has driven significant artifact migration to Hugging Face, all with minimal ongoing human intervention. While questions remain about evaluation methodology and disclosure ethics, the technical implementation and production impact represent a compelling example of LLMOps done well.
