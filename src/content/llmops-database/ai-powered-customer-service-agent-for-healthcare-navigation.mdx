---
title: "AI-Powered Customer Service Agent for Healthcare Navigation"
slug: "ai-powered-customer-service-agent-for-healthcare-navigation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "693be2e0967d3a09724fd676"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:36:00.832Z"
  createdOn: "2025-12-12T09:39:44.630Z"
llmopsTags:
  - "healthcare"
  - "customer-support"
  - "fraud-detection"
  - "classification"
  - "chatbot"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "few-shot"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "system-prompts"
  - "evals"
  - "monitoring"
  - "cicd"
  - "orchestration"
  - "documentation"
  - "langchain"
  - "openai"
industryTags: "healthcare"
company: "Alan"
summary: "Alan, a healthcare company supporting 1 million members, built AI agents to help members navigate complex healthcare questions and processes. The company transitioned from traditional workflows to playbook-based agent architectures, implementing a multi-agent system with classification and specialized agents (particularly for claims handling) that uses a ReAct loop for tool calling. The solution achieved 30-35% automation of customer service questions with quality comparable to human care experts, with 60% of reimbursements processed in under 5 minutes. Critical to their success was building custom orchestration frameworks and extensive internal tooling that empowered domain experts (customer service operators) to configure, debug, and maintain agents without engineering bottlenecks."
link: "https://www.youtube.com/watch?v=uwOXkeaYf0k"
year: 2025
seo:
  title: "Alan: AI-Powered Customer Service Agent for Healthcare Navigation - ZenML LLMOps Database"
  description: "Alan, a healthcare company supporting 1 million members, built AI agents to help members navigate complex healthcare questions and processes. The company transitioned from traditional workflows to playbook-based agent architectures, implementing a multi-agent system with classification and specialized agents (particularly for claims handling) that uses a ReAct loop for tool calling. The solution achieved 30-35% automation of customer service questions with quality comparable to human care experts, with 60% of reimbursements processed in under 5 minutes. Critical to their success was building custom orchestration frameworks and extensive internal tooling that empowered domain experts (customer service operators) to configure, debug, and maintain agents without engineering bottlenecks."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-customer-service-agent-for-healthcare-navigation"
  ogTitle: "Alan: AI-Powered Customer Service Agent for Healthcare Navigation - ZenML LLMOps Database"
  ogDescription: "Alan, a healthcare company supporting 1 million members, built AI agents to help members navigate complex healthcare questions and processes. The company transitioned from traditional workflows to playbook-based agent architectures, implementing a multi-agent system with classification and specialized agents (particularly for claims handling) that uses a ReAct loop for tool calling. The solution achieved 30-35% automation of customer service questions with quality comparable to human care experts, with 60% of reimbursements processed in under 5 minutes. Critical to their success was building custom orchestration frameworks and extensive internal tooling that empowered domain experts (customer service operators) to configure, debug, and maintain agents without engineering bottlenecks."
---

## Overview

Alan is a European healthcare company that started its generative AI journey in 2023 when large language models emerged. The company supports approximately 1 million members and aims to reach 10 million by 2030. Alan's mission centers on leveraging cutting-edge technology to help members navigate the often complex healthcare system. When GenAI emerged in 2023, it represented a turning point for the company—they made the strategic decision to "go all in" and fundamentally reexamine every decision process and product through the lens of what AI could enable. The presentation, delivered by multiple speakers including Gab and Alex (leading engineering), represents learnings from a three-year GenAI journey as of 2025.

The core use case presented focuses on customer service automation through AI agents. Healthcare questions are inherently complex—not simple password resets but nuanced queries covering personal topics like reimbursements, coverage details, and care navigation that demand accurate, empathetic responses. Members need instant, reliable guidance at scale, which traditional approaches couldn't deliver efficiently. The solution they built now handles 30-35% of member questions with quality comparable to human care experts.

## Architectural Evolution: Workflows to Playbooks

One of the most significant technical learnings Alan shared was their architectural shift from workflows to playbooks. Initially, they started with highly deterministic workflow-based approaches where every agent followed strict rules. This seemed like a solid starting point when beginning with AI and worked reasonably well with older models. However, as models evolved tremendously over their journey, they found that playbooks offered a real advantage to harness the full power of AI. 

They explicitly noted the ongoing industry debate between workflows and playbooks, mentioning that OpenAI's Agent Builder is based entirely on workflows. Alan's position is that playbooks represent the best approach, though they still include deterministic incursions (deterministic controls) blended within playbooks where appropriate. This hybrid approach allows for flexibility while maintaining necessary guardrails. The team reconsiders this architectural decision periodically as they learn and as the AI landscape evolves.

## Custom Orchestration vs. Off-the-Shelf Frameworks

Another critical decision point was whether to use off-the-shelf agent orchestrators like LangGraph or Pydantic AI versus building their own framework. Alan ultimately decided to build custom orchestration to move faster, fill their specific needs, and learn as quickly as possible. This wasn't a permanent decision—they reconsider it every six months to evaluate whether the evolution of off-the-shelf frameworks might allow them to move faster or if they should continue iterating on their own framework. This reveals a pragmatic approach to LLMOps: making decisions based on current needs and team velocity while remaining open to switching as the ecosystem matures.

## Multi-Agent Architecture

The production system uses a multi-agent architecture with two primary layers:

**Classification Agent**: The first agent receives member questions and has a clear objective—determine if there's enough detail to hand off to a specialized agent. This acts as a routing mechanism, analyzing the conversation history and classifying the intent.

**Specialized Expert Agents**: Once classified, questions route to specialized agents with dedicated playbooks and tool sets. The demonstration focused on their "claims agent" which handles reimbursement-related questions. Each expert agent is scoped to a particular domain of knowledge, allowing for focused optimization and clearer ownership.

This architecture started small with just one agent and grew incrementally. The modular design made it easy to communicate with stakeholders about which portion of customer contacts they were automating. Once they achieved satisfactory results on one topic area, they moved to another, progressively expanding coverage to reach their 30-35% automation rate.

## ReAct Loop Implementation

The specialized agents employ a ReAct (Reason and Act) loop architecture. For each expert agent, the flow follows this pattern:

- **Analyze**: Examine the conversation state—where are we in the dialogue? What information is already available?
- **Plan/Call Tools**: Determine what tools need to be called to personalize the answer (e.g., what are the member's current reimbursements? what's the state of their claims?). The agent can make multiple tool calls to gather necessary data.
- **Observe**: Once results return from tools, inject them back into the prompt
- **Iterate**: Analyze the conversation again with the new data and decide whether to exit the loop and generate a final response or continue gathering information

In the demo scenario shown, a member asked about reimbursement for multiple visits including one for their child. The claims agent performed approximately 10 successive tool calls, querying backend systems for care events related to the member and their child, then synthesized this raw data (JSONs, lists, rough structured data) into a clear, understandable natural language response. The agent also provided smart redirection—sending members directly to the appropriate part of the application to complete their request, such as uploading documents.

## Tool Calling Evolution and Best Practices

Alan shared important learnings about tool calling as they scaled the number of tools available to agents:

- **Parameter Minimization**: As they added more tools, agents began to struggle with making the right calls with correct arguments. A key best practice was removing as many parameters as possible from function calls. The example given was the challenge of providing UUIDs correctly—simplifying parameter requirements improved reliability.

- **Tool Combination**: When tools were frequently used together, they combined them to reduce the decision complexity for the agent.

- **Specification and Error Handling**: They specify parameters as precisely as possible and provide robust error handling so agents can learn when they've called a tool with incorrect arguments.

- **Model Improvements**: Comparing their current system to six months prior (around mid-2024 to early 2025), they observed that models have become significantly more efficient and reliable at tool calling. This improvement aligns with the industry trend toward MCPs (Model Context Protocol) and giving agents access to more tools.

## Domain Expert Empowerment Through Internal Tooling

A critical success factor that Alan emphasized repeatedly was building internal tooling that enabled domain experts—specifically customer service operators—to configure, debug, and maintain agents without creating engineering bottlenecks. This represents a mature LLMOps perspective: AI systems in production require continuous maintenance and iteration, and the people with domain knowledge must be able to contribute directly.

**Debug Tool**: The first tool demonstrated allows customer service operators to answer "What is wrong with my agent? Why did it answer this way?" The interface shows:

- **Trace View**: Latency of each API call the agent makes, primarily useful for engineers optimizing performance
- **Step-by-Step Execution**: All steps the AI agent takes to answer the member, including the qualification agent's prompt input, conversation history, chain of thought, and classification output
- **Tool Call Details**: For the ReAct loop, showing approximately 10 successive tool calls with their inputs and outputs
- **Raw Data Visibility**: The actual input the LLM receives before generating the final response—allowing operators to see how rough JSONs and lists get transformed into polished answers
- **Redirection Logic**: Visibility into when and why the agent redirects members to specific application flows

This transparency is essential for debugging, understanding agent behavior, and identifying opportunities for improvement. Customer service operators can examine 100-200 conversations, understand strengths and weaknesses, and then move to improvement.

**Agent Configuration Tool**: This is described as a "CI-like system" that allows tracing different changes made to agents and enables customer service operators to test changes in a safe environment before pushing to production. Features include:

- **Branch-Based Development**: Each operator can work on their own branch for safe experimentation
- **Multi-Agent Management**: Selection of which agent to modify (claims agent, etc.)
- **Configuration Elements**: Ability to modify prompts, member attributes, redirections, and tools
- **Evaluation Integration**: Before pushing to production, operators can run offline evaluations by selecting a dataset, specifying the agent, and choosing the number of conversations to test
- **Direct Production Deployment**: For high-confidence changes, operators can ship directly to production

The team explicitly noted that all this internal tooling was built entirely by engineers without designer involvement—a humorous acknowledgment that prioritized functionality over polished UX, though they were open to feedback.

## Evaluation Strategy

While not exhaustively detailed, evaluation appears deeply integrated into their workflow:

- **Offline Evaluation**: The configuration tool includes dataset-based evaluation before production deployment
- **Quality Benchmarking**: They measure agent responses against human care expert quality, claiming comparable performance
- **Continuous Monitoring**: The debug tool suggests they actively monitor production conversations for quality assessment
- **Iterative Learning**: The "garbage in, garbage out" principle guides their focus on continuously improving what goes into agents—primarily insurance knowledge maintained by domain experts

## Experimentation and Trade-offs

Alan was refreshingly transparent about experiments that didn't yet make it to production. They explored a more complex orchestrator-manager design to handle multi-topic questions (where a member asks about multiple unrelated topics in one conversation). Their current classification-then-specialist approach doesn't handle this scenario well. The experimentation with a manager-orchestrator architecture that could call different agents solved the technical challenge successfully, but introduced significant complexity in tooling management and evaluation. When they analyzed the impact, they found this scenario only represented 4-5% of conversations. The team decided the added complexity wasn't justified for that small percentage—a pragmatic example of choosing not to deploy a technically working solution because the operational overhead outweighed the benefit.

## Business Impact

Beyond customer service automation (30-35% of questions), Alan shared broader AI impacts:

- **Reimbursement Speed**: 60% of reimbursements processed in under 5 minutes (they corrected themselves during the presentation from "every single care in five minutes")
- **Fraud Detection**: High precision fraud detection with most fraud prevented before it happens
- **Internal Productivity**: AI coding assistants and AI embedded in functions across sales, HR, and other departments
- **Medical Chatbots**: Patient-facing chatbots for health advice (always supervised by doctors) providing accessible healthcare guidance anytime, anywhere

The company emphasized that AI is now a "natural extension" for their teams, embedded in every layer of decision-making, daily operations, and services.

## Key Takeaways and LLMOps Philosophy

Alan's presentation concluded with three main takeaways that encapsulate their LLMOps philosophy:

**Problem-First Approach**: Focus on what problem you're solving with AI agents. There's significant discussion about using AI for various applications, but without a real problem, the solution doesn't matter. This critique of "AI for AI's sake" shows maturity in their deployment strategy.

**Team Effort**: Success requires combining AI experts, domain experts, and robust evaluation working together. They invested heavily in internal tooling specifically to ensure engineers and data scientists wouldn't become bottlenecks or spend all their time on prompt engineering. Domain experts must be empowered to directly debug and configure agents for the solution to scale.

**Investment in Tooling**: Both third-party solutions and custom-built internal tools are essential. Building their own tooling allowed them to learn as fast as possible, though they remain open to mature external solutions as the ecosystem develops.

## Critical Assessment

Several aspects of Alan's case study deserve balanced consideration:

**Strengths**: The case demonstrates mature LLMOps thinking—pragmatic architectural decisions, empowerment of non-technical domain experts, iterative experimentation with willingness to not deploy complex solutions, and continuous reevaluation of technical choices. The transparency about their three-year journey including mistakes and architectural pivots is valuable.

**Limitations and Unknowns**: The presentation doesn't deeply detail their evaluation methodologies beyond mentioning offline evaluation capabilities. The claim of "quality comparable to care experts" for 30-35% of questions needs more context—what quality metrics, how measured, what types of questions does the 30-35% represent (likely simpler queries)? The privacy/security implications of LLMs accessing sensitive health data are mentioned only in passing. The custom orchestration decision, while justified, creates maintenance burden and potential technical debt that may not pay off long-term as frameworks like LangGraph mature. The "always supervised by doctors" note for medical chatbots suggests human-in-the-loop requirements that may limit the scalability claims.

**Vendor Positioning**: While Alan states they "didn't start as an AI company" and "are not selling AI," this presentation serves recruiting purposes ("we're hiring a lot") and positions the company as an AI leader in healthcare. The achievements are presented somewhat selectively—emphasizing successes while treating challenges as learning experiences.

Overall, this represents a substantive case study of production AI agent deployment in a regulated, high-stakes industry with genuine complexity in the problem domain and thoughtful approaches to LLMOps challenges around tooling, evaluation, and scaling.