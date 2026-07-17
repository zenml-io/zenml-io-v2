---
title: "Second-Order Automation: Multi-Agent System for Finance Workflow Generation"
slug: "second-order-automation-multi-agent-system-for-finance-workflow-generation"
draft: false
llmopsTags:
  - "document-processing"
  - "multi-modality"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "system-prompts"
  - "error-handling"
  - "fastapi"
  - "google-gcp"
  - "anthropic"
industryTags: "finance"
company: "Ramp"
summary: "Ramp built a two-agent system to automate finance and accounting workflows, addressing the challenge that their original finance agent required extensive manual prompt engineering for each use. The solution consists of an \"Architect\" agent that watches screen recordings of accountants performing tasks and automatically generates detailed prompts and process specifications, which are then executed by a \"Doer\" agent. This approach reduced workflow setup from 30-45 minutes of prompt crafting to a simple five-minute screen recording, achieving 6-12x speedups on tasks that previously took 1-2 hours, while transforming automation from an engineering bottleneck into a self-service capability."
link: "https://x.com/RampLabs/status/1973768224253632953"
year: 2026
seo:
  title: "Ramp: Second-Order Automation: Multi-Agent System for Finance Workflow Generation - ZenML LLMOps Database"
  description: "Ramp built a two-agent system to automate finance and accounting workflows, addressing the challenge that their original finance agent required extensive manual prompt engineering for each use. The solution consists of an \"Architect\" agent that watches screen recordings of accountants performing tasks and automatically generates detailed prompts and process specifications, which are then executed by a \"Doer\" agent. This approach reduced workflow setup from 30-45 minutes of prompt crafting to a simple five-minute screen recording, achieving 6-12x speedups on tasks that previously took 1-2 hours, while transforming automation from an engineering bottleneck into a self-service capability."
  canonical: "https://www.zenml.io/llmops-database/second-order-automation-multi-agent-system-for-finance-workflow-generation"
  ogTitle: "Ramp: Second-Order Automation: Multi-Agent System for Finance Workflow Generation - ZenML LLMOps Database"
  ogDescription: "Ramp built a two-agent system to automate finance and accounting workflows, addressing the challenge that their original finance agent required extensive manual prompt engineering for each use. The solution consists of an \"Architect\" agent that watches screen recordings of accountants performing tasks and automatically generates detailed prompts and process specifications, which are then executed by a \"Doer\" agent. This approach reduced workflow setup from 30-45 minutes of prompt crafting to a simple five-minute screen recording, achieving 6-12x speedups on tasks that previously took 1-2 hours, while transforming automation from an engineering bottleneck into a self-service capability."
notion:
  pageId: "390f8dff-2538-8085-81ad-df7a2c1c833a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-01T19:28:00.000Z"
  lastEditedTime: "2026-07-01T19:29:00.000Z"
  publishedAt: "2026-07-01T19:40:44Z"
---

## Overview

Ramp Labs developed a sophisticated multi-agent system to address a fundamental challenge in LLM deployment: the paradox where AI agents can execute tasks efficiently but require significant human effort to set up properly. Their internal finance agent could automate complex accounting workflows like monthly revenue reconciliation and inter-company fund transfer bookings, but each use required 30-45 minutes of careful prompt engineering, file preparation, and error resolution. This created a barrier to adoption where the setup time often negated the execution time savings. Their solution represents what they term "second-order automation"—automation that creates automation—through a two-agent architecture where one agent (the Architect) watches human workflows and generates instructions for another agent (the Doer) to execute.

## The Production Challenge

The case study illustrates a common LLMOps challenge: the gap between an agent's technical capabilities and its practical usability. Ramp's initial finance agent could handle complex tasks such as consolidating invoice and data warehouse data into Excel, preparing journal entries for ERP systems, and booking month-end inter-company fund transfers. However, the agent's sophistication created a usability burden. Accountants needed to become proficient at prompt engineering, describe their processes with precision, upload the correct context files, and resolve errors when the agent didn't understand the task. Moreover, if they wanted to run the same process the following month, they had to manually rewrite the prompt from scratch. This represented a fundamental scalability problem: adding new workflows scaled linearly with human prompt-writing capacity, creating an engineering bottleneck where only those with technical skills could effectively leverage the automation.

## Architectural Design

The two-agent system represents a novel approach to solving the instruction bottleneck in production LLM systems. The Architect agent serves as a meta-layer that observes human work and translates it into machine-executable instructions, while the Doer agent handles the actual task execution. This separation of concerns addresses different aspects of the automation challenge.

The Architect agent processes screen recordings of users completing tasks using Gemini 2.5 Pro with its 1 million token context window. This large context capability is critical for capturing the full detail of complex workflows that might span many steps and require substantial visual context. The agent performs several key functions: extracting step-by-step workflows from the video, identifying when users paste external data or reference other files, generating detailed structured prompts for the Doer agent, and compiling everything into a reusable "Process" artifact. Importantly, the Architect also understands temporal dependencies, such as recognizing when a workflow requires "current month data" rather than hardcoded values. This compiled Process becomes a blueprint that can be reused for future executions without requiring human intervention to recreate the instructions.

The Doer agent uses Claude Sonnet 4.5 and employs specialized tools to navigate and manipulate spreadsheets. It receives the process specifications along with uploaded files, executes each instruction with validation checks, and returns the completed spreadsheet. The choice of Claude for the execution phase appears driven by its reported precision and efficiency for structured task completion.

## Model Selection and LLMOps Trade-offs

The case study demonstrates a pragmatic approach to model selection based on complementary strengths—a common pattern in production LLM systems. Gemini 2.5 Pro was chosen for the Architect agent specifically for its 1 million token context window and multimodal capabilities, which enable processing entire screen recordings without losing critical details. The large context window is particularly valuable for complex workflows that might involve dozens of steps and multiple file references. Claude Sonnet 4.5 was selected for the Doer agent based on its reported speed, precision, and cost-effectiveness for structured execution tasks.

This multi-model approach reflects an important LLMOps principle: different models excel at different tasks, and production systems often benefit from using the right model for each component rather than forcing a single model to handle all responsibilities. However, this also introduces operational complexity—managing multiple model APIs, handling different rate limits and pricing structures, maintaining separate prompt templates and tool integrations, and ensuring consistent behavior across model updates. The text doesn't discuss these operational challenges in detail, though they likely exist in practice.

## Performance Evaluation

The case study provides limited but specific performance data. For the Doer agent, they conducted testing against SpreadsheetBench using approximately 50 randomly selected tasks with 3 test cases each. The results showed 49.5% accuracy on soft-restriction tasks (compared to OpenAI's reported 45.5%) and 32.5% accuracy on hard-restriction tasks (compared to GPT-4o's 13.38%). These benchmark results suggest moderate performance that, while better than some alternatives, still indicates significant room for improvement—the agent fails more than half the time on certain task categories.

The more compelling performance metric comes from real-world usage: tasks that previously took 1-2 hours now complete in under 10 minutes, representing a 6-12x speedup. Importantly, the text acknowledges that in cases of partial completion, human intervention is still needed, though the agent still provides value by saving time before handoff. This honest assessment of limitations is valuable from an LLMOps perspective—the system doesn't claim perfect automation but rather significant acceleration with graceful degradation.

For the Architect agent, the text admits they haven't developed a formal benchmark yet. The primary metric is qualitative: accountants can upload a screen recording and receive a ready-to-use process, reducing workflow setup from 30-45 minutes to essentially the time it takes to record their screen (approximately five minutes). The lack of quantitative evaluation for the Architect agent represents a gap in their testing methodology, though this is understandable for a novel capability without established benchmarks.

## Production Engineering Challenges

The case study provides an important reality check on LLM deployment: "Building production agents is still hard. Despite powerful models, we spent weeks iterating on system prompts, tool designs, and error handling. There's no shortcut for testing, debugging, and refinement. The engineering matters as much as the models." This candid acknowledgment highlights that sophisticated model capabilities don't eliminate the need for careful engineering work.

The text mentions several areas of iteration that are critical for production LLM systems. System prompts required extensive refinement—likely to ensure the Architect agent correctly identifies workflow steps, external data references, and temporal dependencies, while the Doer agent reliably executes instructions without deviating from the specified process. Tool design was another area of focus, which for this use case means the specialized spreadsheet manipulation and validation tools that the Doer agent uses. Error handling represents a particularly challenging aspect of production LLM systems, as models can fail in unpredictable ways and graceful degradation requires careful engineering.

The text doesn't provide detailed information about their testing and debugging infrastructure, monitoring and observability for the agents in production, version control for prompts and processes, or how they handle model updates and regressions. These are all critical LLMOps concerns for a system in production use, but the case study focuses primarily on the conceptual architecture and performance results rather than operational details.

## Reusability and Scaling Paradigm

A key innovation in this system is the creation of reusable Process artifacts. Once the Architect agent has watched a workflow and generated a Process, that Process can be executed repeatedly without requiring human intervention to recreate the instructions. This transforms the scaling equation: instead of adding workflows linearly with human prompt-writing capacity (first-order automation), adding workflows costs near-zero human time once the Architect agent exists (second-order automation).

This has significant implications for organizational adoption of AI agents. The barrier to automation collapsed from weeks of engineering work to simply recording your screen, making automation accessible to non-technical users. Accountants don't need to learn prompt engineering or understand the agent's technical implementation—they just perform their task normally while recording, and the system handles the rest. This democratization of automation is a compelling value proposition, though it also raises questions about governance, quality control, and validation that the text doesn't address in detail.

## Critical Assessment and Limitations

While the case study presents an innovative approach, several aspects warrant critical examination. The benchmark performance shows the Doer agent failing more than half the time on some task categories, which suggests this system requires careful change management and user expectations setting. Organizations deploying this would need clear communication about when human review and intervention are necessary.

The case study originates from Ramp Labs, described as "the home for AI experiments from @tryramp," which suggests this may be experimental or early-stage technology rather than a mature, widely-deployed production system. The text describes building this for internal use, but doesn't provide information about how extensively it's been deployed within Ramp, how many users actively rely on it, what failure modes have been encountered in practice, or how they handle version control and updates to Processes as business requirements change.

The lack of formal benchmarking for the Architect agent is a significant gap. While the user experience improvement is clear (five-minute recording vs. 30-45 minutes of prompt engineering), there's no data on how accurately the Architect captures workflows, how often it misidentifies external data requirements, whether it handles edge cases reliably, or how its performance varies across different types of finance workflows. This makes it difficult to assess the true production-readiness of this component.

The text also doesn't address several operational concerns that would be critical for LLMOps practitioners: how they handle failures when the Architect misunderstands a workflow and generates incorrect instructions, what their rollback and versioning strategy is for Processes, how they manage costs given they're using two different premium model APIs for each workflow execution, or how they ensure security and compliance when processing screen recordings that may contain sensitive financial data.

## Tool Integration and Specialized Capabilities

The case study mentions that the Doer agent uses "specialized tools to search, manipulate, and validate spreadsheet operations," but doesn't provide detailed information about these tools. This is a critical component of the system—LLMs alone cannot reliably perform precise spreadsheet operations, so the quality and design of these tools significantly impacts overall system performance. The tools likely provide structured interfaces for operations like cell selection, formula manipulation, data validation, and file I/O, reducing the agent's task to high-level orchestration rather than low-level implementation. The iterative refinement of tool design that the text mentions suggests this was a significant engineering challenge.

## Broader Implications for LLMOps

This case study illustrates several important principles for LLMOps practitioners. The separation of instruction generation from execution represents a useful pattern for making AI agents more accessible to non-technical users. The use of complementary models based on their specific strengths shows the value of multi-model architectures over forcing a single model to handle all tasks. The honest acknowledgment of performance limitations and the significant engineering effort required provides a realistic picture of what production LLM deployment entails.

The "second-order automation" concept—automation that creates automation—represents an interesting direction for LLM systems. Rather than requiring engineers to build each automation manually, the system enables end users to generate automations through demonstration. This could significantly accelerate AI adoption in domains where workflows are complex and varied, though it also raises important questions about quality assurance, governance, and maintenance that would need to be addressed in a mature production deployment.

The transformation of automation "from an engineering bottleneck into a self-service capability" is a compelling vision, though the case study's performance data suggests this vision is partially rather than fully realized. With success rates around 50% on some task categories and acknowledged need for human intervention in partial completion cases, this system appears to be an acceleration tool rather than a full replacement for human oversight, which is likely the appropriate positioning for current LLM capabilities.
