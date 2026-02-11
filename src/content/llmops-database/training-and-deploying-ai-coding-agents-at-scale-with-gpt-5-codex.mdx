---
title: "Training and Deploying AI Coding Agents at Scale with GPT-5 Codex"
slug: "training-and-deploying-ai-coding-agents-at-scale-with-gpt-5-codex"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69510967fa62c0d991c8aeef"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-28T10:51:50.705Z"
  createdOn: "2025-12-28T10:41:43.043Z"
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "poc"
  - "code-interpretation"
  - "prompt-engineering"
  - "few-shot"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "evals"
  - "token-optimization"
  - "latency-optimization"
  - "error-handling"
  - "system-prompts"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "cicd"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "openai"
industryTags: "tech"
company: "OpenAI"
summary: "OpenAI's Bill and Brian discuss their work on GPT-5 Codex and Codex Max, AI coding agents designed for production use. The team focused on training models with specific \"personalities\" optimized for pair programming, including traits like communication, planning, and self-checking behaviors. They trained separate model lines: Codex models optimized specifically for their agent harness with strong opinions about tool use (particularly terminal tools), and mainline GPT-5 models that are more general and steerable across different tooling environments. The result is a coding agent that OpenAI employees trust for production work, with approximately 50% of OpenAI staff using it daily, and some engineers like Brian claiming they haven't written code by hand in months. The team emphasizes the shift toward shipping complete agents rather than just models, with abstractions moving upward to enable developers to build on top of pre-configured agentic systems."
link: "https://www.youtube.com/watch?v=-cSSYnko63E"
year: 2025
seo:
  title: "OpenAI: Training and Deploying AI Coding Agents at Scale with GPT-5 Codex - ZenML LLMOps Database"
  description: "OpenAI's Bill and Brian discuss their work on GPT-5 Codex and Codex Max, AI coding agents designed for production use. The team focused on training models with specific \"personalities\" optimized for pair programming, including traits like communication, planning, and self-checking behaviors. They trained separate model lines: Codex models optimized specifically for their agent harness with strong opinions about tool use (particularly terminal tools), and mainline GPT-5 models that are more general and steerable across different tooling environments. The result is a coding agent that OpenAI employees trust for production work, with approximately 50% of OpenAI staff using it daily, and some engineers like Brian claiming they haven't written code by hand in months. The team emphasizes the shift toward shipping complete agents rather than just models, with abstractions moving upward to enable developers to build on top of pre-configured agentic systems."
  canonical: "https://www.zenml.io/llmops-database/training-and-deploying-ai-coding-agents-at-scale-with-gpt-5-codex"
  ogTitle: "OpenAI: Training and Deploying AI Coding Agents at Scale with GPT-5 Codex - ZenML LLMOps Database"
  ogDescription: "OpenAI's Bill and Brian discuss their work on GPT-5 Codex and Codex Max, AI coding agents designed for production use. The team focused on training models with specific \"personalities\" optimized for pair programming, including traits like communication, planning, and self-checking behaviors. They trained separate model lines: Codex models optimized specifically for their agent harness with strong opinions about tool use (particularly terminal tools), and mainline GPT-5 models that are more general and steerable across different tooling environments. The result is a coding agent that OpenAI employees trust for production work, with approximately 50% of OpenAI staff using it daily, and some engineers like Brian claiming they haven't written code by hand in months. The team emphasizes the shift toward shipping complete agents rather than just models, with abstractions moving upward to enable developers to build on top of pre-configured agentic systems."
---

## Overview

This case study presents insights from OpenAI team members Bill and Brian discussing their production deployment of GPT-5 Codex and Codex Max, AI coding agents designed for real-world software development workflows. The interview, conducted at an AI engineering conference, reveals substantial technical details about training methodology, production deployment challenges, and emerging patterns in LLMOps for agentic systems. The speakers represent OpenAI's Codex team and provide a practitioner's perspective on deploying large language models as coding assistants that handle increasingly complex, long-running tasks in production environments.

The case study is particularly valuable because it comes directly from the team responsible for training and deploying these models, offering candid insights into both successes and ongoing challenges. Brian's claim that he hasn't written a single line of code by hand in months provides an interesting data point, though this should be interpreted with appropriate context about his specific role and use cases. The discussion reveals a broader trend at OpenAI where approximately 50% of employees have adopted Codex, with particularly high engagement among those who use it daily.

## Model Training Philosophy and Behavioral Characteristics

The training approach for GPT-5 Codex represents a significant evolution in how OpenAI thinks about optimizing models for specific production workflows. Brian was closely involved with the GPT-5 training team and emphasizes that they focused heavily on what they call "personality" - though this term means something quite different in the context of coding agents compared to conversational AI. For coding models, personality refers to behavioral characteristics that build trust with developers and align with software engineering best practices.

The team identified several key behavioral traits they wanted to optimize for through reinforcement learning: communication (keeping users informed about ongoing work), planning (developing strategies before diving into implementation), context gathering (searching and understanding the codebase before making changes), and self-checking (validating work before presenting it). These behaviors mirror what you would expect from a skilled pair programmer or senior engineer, and the team developed evaluation frameworks to measure and grade the model's performance on these specific behaviors.

This approach represents a practical application of RLHF (Reinforcement Learning from Human Feedback) techniques, but with a domain-specific twist. Rather than optimizing for general helpfulness or safety, the team focused on characteristics that specifically matter for coding workflows. The training data and evaluation metrics were developed in close collaboration with bleeding-edge coding partners who provided real-world requirements and edge cases that informed the training process.

## Model Architecture: Codex vs. Mainline GPT-5

OpenAI maintains two distinct model lines for coding applications, and understanding the distinction is crucial for practitioners considering deployment. The Codex models are specifically optimized for the Codex agent harness and come with strong opinions about tool use and workflow. These models have been trained with particular tools in mind, especially terminal tools, and have developed specific "habits" around how they use those tools.

A fascinating technical detail revealed in the discussion is that Codex performs significantly better when tools are named in specific ways that match its training data. For example, Codex "loves ripgrep" (a fast search tool), and partners discovered that naming a tool "rg" (ripgrep's command-line invocation) produces substantially better performance than naming it "grep" or other alternatives. This demonstrates that the models develop tool-use habits during training that are remarkably specific, similar to how human developers become proficient with particular tools and slower with unfamiliar ones.

The mainline GPT-5 models, by contrast, are more general and steerable across different tooling environments. They maintain coding capabilities that mirror Codex but are designed to work with a broader range of tools and environments. These models are more communicative by default, providing preambles before tool calls and explaining their reasoning, which some users prefer for transparency but which can consume unnecessary tokens in long-running autonomous tasks. Importantly, the mainline models can be prompted to adjust this behavior, offering flexibility that the more opinionated Codex models don't provide.

## Tool Use and Integration Patterns

The discussion reveals sophisticated thinking about tool integration in production coding agents. OpenAI's partners have discovered creative ways to adapt the Codex models to work with their custom tooling by understanding the model's training biases. One pattern that emerged is that partners can maintain most of their custom tools by simply naming them the same way as the terminal tools Codex was trained with, and ensuring the input/output formats match. This "bending" of the model's capabilities demonstrates that production deployment often requires understanding the model's training patterns and working with them rather than against them.

The team's recommendation for practitioners is to choose based on their specific needs: bleeding-edge coding-focused applications should consider the Codex line and SDK, accepting that they'll need to study how OpenAI implements tools within Codex to maximize capabilities. Developers will need to pay attention to tool naming, interfaces, and expected interaction patterns to avoid "bogging down" the model with unfamiliar patterns. On the other hand, applications requiring more flexibility or broader capabilities beyond pure coding should leverage the mainline GPT-5 models.

This represents an important LLMOps consideration: the abstraction layer is moving upward from just the model to the complete agent, including its harness and expected tooling environment. OpenAI is increasingly shipping complete agents rather than just model APIs, and this packaging reflects a practical understanding that production deployment requires more than raw model capabilities.

## Codex Max: Long-Running Agentic Workflows

Codex Max represents an evolution designed specifically for long-running, autonomous workflows. Bill notes that Codex Max can run for 24 hours or more, with his personal testing extending across multiple days including closing and reopening his laptop. The name "Max" was chosen to convey both speed and maximization - the model can run for extended periods but also solves problems faster than previous versions for the same types of tasks.

The key technical innovation enabling these long-running workflows is built-in context management and compaction. Codex Max manages its own context window, allowing it to run essentially forever without manual intervention for context overflow issues. This autonomous context management is crucial for production deployment because it removes a major operational burden from developers who would otherwise need to monitor and manage context limits.

The design also enables more sophisticated multi-agent patterns. Codex Max can spawn sub-agents and hand off context to them, enabling parallel work and task decomposition. This represents an emerging pattern in production LLMOps: moving from simple single-agent workflows to hierarchical systems where agents can create and manage other agents as needed. Brian and Bill are seeing early indications of what this enables, and they view it as the future direction for the technology.

## Evaluation and Trust-Building in Production

A major theme throughout the discussion is the critical role of evaluation in building production-ready agentic systems. Bill emphasizes that in order to develop trust and build products that can do more than designed, you must become "really good at eval." This includes figuring out how to build guardrails and evaluations around agent behavior, determining what the agent is doing and what it should be allowed to do, and checking its work in production.

OpenAI has developed extensive platform tooling around agent traces and rollout traces, along with frameworks for creating evaluations and graders. This evaluation infrastructure enables them to "maximize the pipeline" so they can let agents run autonomously while maintaining confidence in the results. The team uses LLM-as-a-judge patterns to evaluate entire agent trajectories, examining the full sequence of actions rather than just individual outputs.

Bill describes an eval methodology he calls a "job interview eval" for coding agents: you give the agent an underspecified problem (similar to interviewing a human developer), grade how it asks for clarification and handles constraints, watch it implement the solution, provide modifications, and evaluate the entire interaction. This multi-turn evaluation approach is more complex than single-shot evals but more accurately reflects real-world usage patterns.

The team's approach to evaluation also includes working closely with applied partners who provide real-world use cases. Bill from the Applied Eval team notes that while academic benchmarks like SWE-bench exist, there's often a gap between academic evaluations and what users actually care about in practice. OpenAI is actively trying to capture real-world use cases and build evaluations around them, creating a feedback loop where customer needs inform model training priorities.

## Production Adoption Patterns at OpenAI

The internal adoption numbers provide interesting validation of the technology's production readiness. Initially, around 50% of OpenAI employees started using Codex when it first launched, but among those who began using it, the engagement became daily and intensive. Bill notes that the most devoted users at OpenAI use Codex for their hardest work, representing a significant trust threshold.

Brian's personal experience is particularly notable: he hasn't written a single line of code by hand in months and has shipped production code (including an open-source Codex upgrade pack for migrating from completions to responses API) that was entirely written by Codex. This represents a significant milestone in LLMOps - moving from AI-assisted development to AI-led development with human oversight and direction.

However, the speakers are careful to note that this trust level required extensive work on evaluation, guardrails, and understanding the model's capabilities and limitations. They describe the current state as "in between" where models don't yet have the full trust of senior engineers for very important work, which is why the communicative behavior of GPT-5 matters - engineers want to follow along and be able to interject or stop the agent if needed.

## Emerging Patterns: Abstraction Layers and Agent Composition

A central theme in Bill and Brian's talk (which they were preparing to deliver at the conference) is that the abstraction layer in LLMOps is moving upward from the model layer to the agent layer. Models are becoming more opinionated, especially models like Codex that are optimized for specific harnesses and tool shapes. OpenAI is increasingly packaging and shipping entire agents rather than just models, allowing developers to plug complete agents like Codex into their platforms.

This pattern is already being adopted by major developer tools: Zed, GitHub, and VS Code all support packaging complete agents to work within their environments. For developers building coding tools, this means they can choose to build one layer above rather than maintaining deep integration with every model release, API change, and harness update. This abstraction shift has significant implications for the LLMOps ecosystem, potentially standardizing around agent interfaces rather than model APIs.

The speakers also describe an emerging pattern of layered capabilities: starting with chatbots, adding tool use to create simple agents, and then giving agents access to coding agents (like Codex) so they can create custom tools when needed. This enables systems where if an agent doesn't have the right tool for a problem, it can write one. Brian gives the example of software that could spin up a Codex instance to write a custom plugin for a specific customer's API, making the software "self-customizable" and solving the integration engineering problem that typically requires dedicated human resources.

## Practical Applications Beyond Coding

An interesting dimension of the discussion is how coding agents are "breaking out of coding" into general personal automation. Bill describes how he uses Codex for tasks that aren't traditionally considered coding but were historically done through terminal commands and scripts: organizing messy directories, renaming files systematically, sorting through email using command-line tools like Elm, and generating video clips from YouTube for later viewing.

Brian frames this more broadly: before graphical user interfaces, people interacted with computers through terminals and code, so coding agents are actually "computer use agents but for the terminal." This perspective suggests that coding agents are more general-purpose than they initially appear, capable of automating many knowledge work tasks that can be expressed as terminal operations or scripts.

The team notes that current coding agents are "not vision-native enough" and would benefit from better integration with visual understanding, which would expand their capabilities even further. This represents an ongoing area of development and suggests future directions for the technology.

## Challenges and Limitations

Despite the enthusiasm, the speakers are candid about ongoing challenges. The model's tool-use habits, while sometimes useful, can also be limiting - the fact that Codex performs worse with tools named differently than its training data demonstrates a lack of true generalization. Bill acknowledges that while this human-like behavior is interesting, it's not necessarily desirable since models are supposed to generalize.

Multi-turn evaluation remains challenging, and the infrastructure for it is still developing. Brian notes that batch API currently doesn't support multi-turn requests, which is problematic for evaluating agentic workflows where cost optimization through batching would be valuable. The team took this feedback seriously, but it represents an ongoing operational challenge.

The trust threshold is another key limitation. Senior engineers working on critical systems don't yet fully trust these agents for their most important work, which is why transparency and communication features matter even if they seem inefficient for token usage. Building that trust requires extensive evaluation infrastructure, guardrails, and the ability for developers to understand and intervene in the agent's decision-making process.

## Future Directions and 2026 Predictions

Looking forward, the speakers identify several key priorities. Brian emphasizes computer use capabilities, noting that many applications don't have APIs or SDKs, only user interfaces. The ability to interact with legacy systems or applications that don't provide programmatic access would substantially expand what agents can accomplish. Bill confirms that computer use capabilities will likely arrive in 2026.

Bill also wants to see coding agents become capable of even more general tasks, building on the foundation they've established. The vision includes more extensible ways to build with sub-agents and hierarchical agent systems that can decompose complex tasks.

Brian's aspiration is perhaps the most ambitious: he wants every company, from small dev shops to major firms, to have access to capabilities comparable to the most amazing developers at top-tier organizations like OpenAI. The goal is democratizing access to elite-level technical capabilities through AI agents that are trusted, smart, and capable of handling complex refactors, technology implementations, and architectural decisions that would typically require senior engineering talent.

This vision reflects a broader theme in the conversation: these aren't just tools for automating simple tasks, but systems designed to elevate the capabilities of entire engineering organizations and solve problems that would previously have required specialized human expertise.