---
title: "Multi-Agent System for Interview Analysis and Report Generation at Scale"
slug: "multi-agent-system-for-interview-analysis-and-report-generation-at-scale"
draft: false
llmopsTags:
  - "customer-support"
  - "data-analysis"
  - "summarization"
  - "classification"
  - "multi-modality"
  - "unstructured-data"
  - "speech-recognition"
  - "question-answering"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "evals"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "few-shot"
  - "chunking"
  - "system-prompts"
  - "human-in-the-loop"
  - "agent-based"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "postgresql"
  - "fastapi"
  - "langchain"
  - "open-source"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "devops"
  - "anthropic"
  - "openai"
  - "memory"
  - "harness-engineering"
industryTags: "tech"
company: "ListenLabs"
summary: "ListenLabs, a platform for analyzing user research at scale, built a sophisticated multi-agent system that processes hundreds to thousands of user interviews, surveys, and focus group feedback. The company evolved from basic retrieval-augmented generation to a complex architecture featuring three primary agents: a study creation agent (Composer) that collaboratively builds discussion guides with users through an artifact-based interface, an interview agent that conducts voice-based multimodal conversations with participants, and a research agent that analyzes large volumes of qualitative data to generate insights, charts, video clips, and PowerPoint presentations. Their system demonstrates advanced LLMOps practices including parallelized sub-agent execution for processing hundreds of interviews simultaneously, custom evaluation agents for quality control, contextual prompt engineering, code execution in sandboxes, and sophisticated trace analysis for continuous improvement. The platform handles the complete lifecycle from study design through data collection to automated analysis and reporting."
link: "https://www.youtube.com/watch?v=YTTH-0XXEBE"
year: 2026
seo:
  title: "ListenLabs: Multi-Agent System for Interview Analysis and Report Generation at Scale - ZenML LLMOps Database"
  description: "ListenLabs, a platform for analyzing user research at scale, built a sophisticated multi-agent system that processes hundreds to thousands of user interviews, surveys, and focus group feedback. The company evolved from basic retrieval-augmented generation to a complex architecture featuring three primary agents: a study creation agent (Composer) that collaboratively builds discussion guides with users through an artifact-based interface, an interview agent that conducts voice-based multimodal conversations with participants, and a research agent that analyzes large volumes of qualitative data to generate insights, charts, video clips, and PowerPoint presentations. Their system demonstrates advanced LLMOps practices including parallelized sub-agent execution for processing hundreds of interviews simultaneously, custom evaluation agents for quality control, contextual prompt engineering, code execution in sandboxes, and sophisticated trace analysis for continuous improvement. The platform handles the complete lifecycle from study design through data collection to automated analysis and reporting."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-system-for-interview-analysis-and-report-generation-at-scale"
  ogTitle: "ListenLabs: Multi-Agent System for Interview Analysis and Report Generation at Scale - ZenML LLMOps Database"
  ogDescription: "ListenLabs, a platform for analyzing user research at scale, built a sophisticated multi-agent system that processes hundreds to thousands of user interviews, surveys, and focus group feedback. The company evolved from basic retrieval-augmented generation to a complex architecture featuring three primary agents: a study creation agent (Composer) that collaboratively builds discussion guides with users through an artifact-based interface, an interview agent that conducts voice-based multimodal conversations with participants, and a research agent that analyzes large volumes of qualitative data to generate insights, charts, video clips, and PowerPoint presentations. Their system demonstrates advanced LLMOps practices including parallelized sub-agent execution for processing hundreds of interviews simultaneously, custom evaluation agents for quality control, contextual prompt engineering, code execution in sandboxes, and sophisticated trace analysis for continuous improvement. The platform handles the complete lifecycle from study design through data collection to automated analysis and reporting."
notion:
  pageId: "34df8dff-2538-80d2-8a35-eabffa103cbd"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-25T14:50:00.000Z"
  lastEditedTime: "2026-04-25T14:50:00.000Z"
  publishedAt: "2026-04-26T09:58:36Z"
---

## Overview

ListenLabs has developed a comprehensive multi-agent platform for conducting and analyzing user research at scale. The company, co-founded by CTO Florian Yungman, specializes in processing hundreds to thousands of interviews, surveys, and focus group conversations to extract meaningful insights from qualitative data. The platform represents a sophisticated example of production LLM deployment with multiple interconnected agents handling different stages of the research workflow.

The system has undergone multiple architectural iterations over approximately two years, evolving from basic retrieval-augmented generation implementations to a complex multi-agent architecture. This evolution reflects the broader maturation of LLM capabilities and the team's learnings about what works in production environments.

## Agent Architecture

ListenLabs operates three primary agents that handle distinct phases of the research process, along with numerous specialized sub-agents.

The first agent is called Composer, which serves as an interactive study creation tool. This agent works collaboratively with users to build discussion guides through what they describe as an artifact-based interface. The artifact in this case is the discussion guide containing the questions that will be asked during interviews. The interface presents the document on one side while allowing natural language interaction with the agent on the other. Users can both chat with the AI to make modifications and directly edit the document themselves. The system maintains a unified edit history where both human and AI changes are tracked as edit operations, allowing for undo functionality and change tracking. This approach evolved from earlier versions where the AI would completely rewrite documents, which proved problematic for longer documents where users often want targeted changes rather than complete regeneration.

The second agent conducts the actual interviews. This is a voice-based multimodal agent that can handle screen sharing, image input, and audio/video conversations. While described as less complex from an agent-building perspective because it has fewer tools, it handles sophisticated real-time conversation management. The platform emphasizes listening rather than interrupting, deliberately avoiding jumping in during natural pauses in conversation, as their use case prioritizes letting participants express themselves fully even when they might be rambling or going slightly off-topic.

The third and most complex agent is the research agent, which analyzes the collected data. This is where the team reports spending most of their development time. The research agent can process hundreds to thousands of completed interviews, creating charts, summarizing findings, cutting video clips, and even generating PowerPoint presentations in custom company templates. This agent operates in two modes: a long-running asynchronous analysis that can take around 30 minutes for comprehensive reports, and a live interactive mode where users can chat with the agent to explore the data in real-time.

## Data Representation and Processing

The research agent conceptualizes interview data as a virtual table structure rather than a file system. Each row represents an individual response or interview, and columns represent questions or extracted features. The agent can dynamically create new columns through classification or extraction operations. When a user asks the agent to extract sentiment about a specific topic, for example, the agent adds a new column and populates it by running classification operations across all interviews.

This table representation exists only conceptually for the LLM. The underlying data is stored in PostgreSQL in a different format, but the system synthesizes a table-like view for the agent. When the agent needs to execute Python code, it receives this data as a pandas DataFrame, but it's never actually stored as a CSV or similar table format.

The interviews themselves are semi-structured, with different sections covering different topics or concepts. This structure allows the system to filter to relevant sections when processing queries, reducing the amount of text that needs to be analyzed for specific questions. This filtering capability is exposed through tool parameters, so the main agent can request analysis of only specific sections rather than entire interviews.

## Parallelization and Sub-Agent Execution

One of the most interesting technical aspects of ListenLabs' system is how it handles massive parallelization. When the main agent needs to run an operation across hundreds or thousands of interviews, it doesn't actually make hundreds of individual tool calls. Instead, the agent calls a tool once, and the system's hardcoded workflow spawns hundreds of sub-agents behind the scenes, aggregates the results in a specific way, and returns the synthesized output.

These sub-agents are highly constrained and don't have decision-making flexibility. They essentially perform map-reduce style operations for classification or extraction tasks. The system can pass filter criteria to these operations, allowing the agent to request analysis of subsets of interviews matching specific conditions. This filtering capability was added after observing that the agent would often run operations on all interviews and then write Python code to filter the results afterward, which was inefficient.

## Code Execution and Sandboxing

The research agent has access to Python code execution for handling long-tail use cases that aren't covered by specialized tools. The platform uses E2B for sandboxed code execution. The code runs separately from the main agent process, with the agent maintaining a virtual table representation while only creating actual DataFrames when Python execution is needed.

Code execution represents roughly 20 percent of operations in the default long-running reports, but it's critical for the dynamic exploration use case where users ask specific questions that the built-in tools don't support. Even though it's not the majority case, having this capability allows users to drill down into specific analyses that require custom statistical operations or chart types.

The team has developed pre-warming strategies for the sandbox environment to reduce latency, especially important for the live interactive mode. The sandboxing approach also introduced interesting challenges, particularly when they tried running Anthropic's Claude Code Agent SDK inside the E2B sandbox. The SDK wasn't designed for cloud environments and had assumptions about local execution, including API key handling. They had to build a proxy system where fake API keys are used in the sandbox, requests are proxied through their server for verification, and then the real API key is substituted. This proved more complex than anticipated, with infrastructure providers like Render flagging the code-containing HTTP requests as potentially malicious behavior.

## Tool Design and Evolution

The research agent has approximately 15 different tools. These fall into several categories: tools that run operations across the entire table (like the parallelized classification operations), retrieval tools for finding specific content, output generation tools for creating charts and other artifacts, and processing tools for computing new data.

The tool design has evolved based on observed usage patterns. The team regularly examines traces to see how the agent uses available tools and identifies opportunities for optimization. For example, they added filtering parameters to aggregation tools after noticing the agent would frequently run operations on all data and then write Python code to filter the results. This type of targeted filtering works for about 90 percent of filter cases, with more complex multi-column filters still requiring Python.

The agent can create various artifacts beyond simple text responses. Charts are generated through JSON tool calls that specify columns and visualization parameters, which the system then renders. The agent can create written memos that combine charts and other elements, and can even cut video clips from interviews by using retrieval to find relevant quotes and then generating video reels. All these artifacts can be referenced in the agent's output and are rendered appropriately in the interface.

## PowerPoint Generation

One of the more recent and complex capabilities is automated PowerPoint generation. The customer base often needs final deliverables in editable PowerPoint format rather than HTML or PDF, which presents unique challenges. The team initially built a hardcoded pipeline with templates and text/image replacement logic, but completely rethought this as a sub-agent problem.

The PowerPoint generation sub-agent runs using Claude's Code Agent SDK in a sandbox environment and iteratively writes Python code to modify PowerPoint files. The main research agent decides when to create a slide deck and passes the necessary content and data to this specialized sub-agent, which then iterates on the code level to construct the presentation and returns the finished PowerPoint file. This sub-agent approach proved more flexible than the previous template-based system, though it introduced the sandboxing challenges mentioned earlier.

## Quality Control and Evaluation

ListenLabs has implemented a sophisticated evaluation system using what they call a reviewer agent. This is a specialized sub-agent that has clear context about what constitutes a good report and maintains a list of quality criteria. For example, it checks that claims are backed up by citations or data. This reviewer agent examines generated reports and provides feedback.

In the long-running asynchronous workflow, this reviewer agent operates in a feedback loop where it can review the report, provide feedback, and the main agent can make improvements. This iterative review process significantly improves output quality. In the live interactive mode, the same reviewer agent is repurposed as an evaluation system. After each response, the evaluation agent assesses it asynchronously without blocking the user interaction. This provides real-time quality metrics for production usage.

The team tracks evaluation metrics both on a benchmark set of around 20 different products and on live production data. The evaluation agent runs after each analysis in an asynchronous process, providing internal metrics about quality without adding latency to the user experience. While there are opportunities for cost optimization through batch inference, the cost hasn't been prohibitive enough to prioritize this optimization, as the focus remains on product quality improvement.

The evaluation system helps identify when changes to prompts, models, or architecture cause regressions. However, the team acknowledges that comparing nuanced multi-page outputs is inherently difficult, and different people might reasonably prefer different versions. The evaluation at least catches clear breakages and provides directional signals about quality changes.

## Model Selection and Parameter Tuning

The system uses different models and parameters depending on the use case. For live interactive chat, they prioritize latency and use faster, smaller models. They also tune thinking parameters, using minimal thinking for live responses but medium or high thinking for the long-running comprehensive analysis.

For the interview agent, they primarily use a speech-to-text, text-to-speech pipeline rather than real-time APIs because they prioritize using the smartest available models. When evaluated, real-time services were one or two tiers faster but less capable than top-tier models like Claude Opus and GPT-4. Given how important it is to ask good follow-up questions during interviews, they chose to compromise slightly on real-time performance rather than on intelligence.

The transcription models are generally good but not perfect, particularly for new product names or domain-specific terminology. The team addresses this by using an LLM with context about the interview and relevant terminology to correct the transcription on the fly, adding an intelligence layer on top of the base transcription model.

## Retrieval and Embeddings

The platform's use of retrieval has evolved significantly. The first version built two years ago was purely a RAG system with semantic search. They then added robust metadata filtering as a second layer. In a subsequent architectural revision, they moved away from retrieval entirely, relying only on small models that could look at all interviews directly.

However, they eventually reincorporated retrieval for certain use cases, particularly when scaling to larger sample sizes or when users ask questions like "did anyone mention something like this" or when finding video clips on specific topics. While retrieval is less critical than it was initially, it remains useful and cost-effective. The team embeds all interviews and maintains this capability particularly for future features around searching through findings across multiple projects over time, where the corpus becomes much larger.

Unlike coding-focused applications that have moved toward keyword search or graph-based approaches, ListenLabs maintains semantic search because natural conversation doesn't have strongly-typed symbols. Searching for "all cases where people were frustrated" can't easily be reduced to keyword matching on specific adjectives, making semantic retrieval more suitable for their use case.

They also employ hierarchical summarization for certain extraction tasks. When doing summarizations on thousands of individual interviews, even 200 tokens per summary creates a very large aggregate, so they add additional summarization layers to make the data more manageable.

## Incremental Analysis and Real-Time Updates

The platform implements sophisticated logic for incremental analysis updates. Long-running analyses take about 30 minutes, so they can't rerun the complete analysis after every new response. At the same time, they want to show early results quickly—getting the first 10 responses might happen just 30 minutes after launching a study, which is described as a magical moment.

The system runs full analyses at certain thresholds of interview completion. When the interview count grows from 10 to 20 or from 20 to 100, they completely rerun the analysis to potentially identify new hypotheses and patterns. However, between these thresholds, they need a different approach for responses 101, 102, etc.

The solution involves separating dynamic elements from static narrative. The LLM never outputs actual numbers, percentages, or chart values directly in the report. Instead, it outputs placeholders. The system can then rerun all classifications and Python computations while keeping the core narrative the same, updating just the numbers and charts. This makes all quantitative elements verifiable and up-to-date—users can click on them to see the underlying data.

There's a limit to this approach, though. If the text says "this is definitely the best idea because 80% of people liked it" and later data brings that down to 20%, the qualitative conclusions need to change as well. The system handles this by running full re-analyses occasionally, particularly when users indicate they're done collecting data or when no new responses have arrived for a couple of days.

## Prompt Engineering and Contextual Adaptation

The team relies heavily on what they call contextual prompt engineering. Rather than having a single static system prompt for all studies, they adapt the prompt based on the specific study's characteristics. For example, if a study doesn't include video and audio, they remove all instructions related to emotional understanding from video and audio, reducing confusion and making the prompt more focused.

The challenge with this approach is that it doesn't help in the worst case where all features are being used, so you don't save any tokens. But it often helps significantly by cutting out large irrelevant sections when certain data modalities or features aren't present.

Organizations can also provide instructions at their account level that apply to all their projects, such as formatting preferences or background information about what kinds of insights are considered interesting versus obvious. This is particularly important because the agent can't inherently judge what's new and interesting to a specific organization—something might seem novel from the outside but be common knowledge to someone who's worked at the company for 10 years.

The concept of skills as reusable capabilities is less prominent in their current implementation compared to sub-agents and contextual prompting. When they need specialized behavior, they typically create sub-agents that come pre-loaded with relevant context. For example, the PowerPoint generation sub-agent has all the PowerPoint-specific instructions built in rather than having the main agent load a "PowerPoint skill."

## Observability and Trace Analysis

The team stores traces for every single interaction and agent run, though they only examine a tiny fraction in detail. The philosophy mirrors traditional logging—you want comprehensive data available so you can deep-dive into specific cases when needed, but you analyze depth over breadth.

Trace analysis is primarily performed by the engineers who built the systems, maintaining end-to-end ownership. When something seems wrong, they go very deep on one or two traces, examining nearly every tool call. For a 30-minute trace, this analysis itself takes considerable time, but it's how they learn whether the system is working as intended and identify opportunities for improvement.

They've experimented with having Claude analyze patterns across all traces to identify common paths and behaviors, which provides some high-level insights. But the most valuable learning comes from detailed manual examination of specific traces both during development and when debugging production issues.

The team also uses observability during development on local or cloud dev setups, not just for production debugging. This allows them to understand agent behavior before deployment and refine the architecture based on observed patterns.

## Interface Design and User Experience

For the Composer agent, the interface evolved through several iterations. The initial version simply prompted an LLM to write a discussion guide, which never quite worked perfectly with minimal input. The second version added chat-based interaction for iterative refinement. This surfaced the fundamental tension between having the AI rewrite entire documents (which works for short documents or tone changes but not for targeted modifications) and making specific edits through string replacement or ID-based element updates.

They settled on ID-based edit operations that work well for their longer documents, allowing targeted changes. However, they recognized that chatting isn't always the fastest modification method—sometimes users just want to delete question three or rephrase something themselves without describing the change to an AI. This led to supporting both manual editing and AI-driven changes within the same edit history framework, where both types of modifications are formatted as edit operations that the agent understands. This prevents the AI from immediately undoing user changes and provides a complete change log with comparison functionality.

For the voice-based interview agent, the interface challenges remain partially unsolved industry-wide. They note that even OpenAI has iterated significantly on voice interface design, moving from the blue bubble visualization to showing text transcription alongside voice. ListenLabs uses text display because users can read faster than listening, and it allows review of previous content. However, there are tradeoffs around speed preferences and the ability to revisit content.

For the research agent in live mode, they show an abstracted version of the agent's work rather than raw technical details. Customers don't care about implementation specifics but do want to know something is happening, so they show loading states and high-level descriptions like "looking at all responses again, this might take a while."

Python code execution presents a particular interface challenge. Normally, all findings are traceable—users can click numbers to see breakdowns and drill down to individual interview classifications. Python-generated results don't have this traceability. Additionally, customers likely wouldn't understand raw Python code. The current solution summarizes the assumptions made during Python execution in an expandable section, providing some confidence about the analysis without showing the actual code. This is acknowledged as a middle-ground solution that isn't perfect.

## Architectural Evolution and Decision Making

The platform has undergone multiple complete rearchitectures over its two-year development period. The first iteration was a simple RAG chatbot before agents really worked well. The evolution has been driven by several factors: smaller models becoming capable enough to classify all data in real-time, larger models becoming smart enough to orchestrate complex operations, and the team's own learning about what works in their specific domain.

They've actively explored but chosen not to adopt file system-based agent architectures that have become popular in the coding agent space. While they experimented with this approach, they found their virtual table representation more powerful for their use case. There's some concern about fighting against the grain if model companies start post-training on specific harnesses or file systems, but the table structure better serves their needs.

The coding agent harnesses they've evaluated are generally poor at programmatically calling sub-agents in bulk—they can call agents one at a time but don't handle the pattern of "call this 500 times in parallel and aggregate" that's central to ListenLabs' architecture. This limitation, reminiscent of patterns from recursive language model papers, makes these harnesses less suitable for their needs despite interest in incorporating some of those ideas.

Decisions about when to rearchitect versus when to iterate incrementally involve considering whether they're optimizing a local minimum or whether fundamental architectural changes are needed. While hill-climbing through continuous improvement based on evaluation metrics is important—since you can't anticipate all customer use cases—sometimes you need to step back and change the approach entirely, potentially even changing the evaluation criteria themselves.

## Team Structure and Engineering Practices

The engineering team is relatively small, with engineers owning end-to-end responsibility for the agents they build. The hiring philosophy has evolved—initially they believed very smart people without AI experience would be fine, but now they expect candidates to have some AI experience given it's been over three years since transformative AI capabilities became widely available. Even if someone's current job doesn't involve AI, they should have intellectual curiosity about how it works and have built something on the side or understand how systems like Claude work under the hood.

The team looks for two types of engineers: those excellent at building large-scale systems who have good product taste (which current AI can't easily replicate), and product engineers who deeply understand customers and iterate rapidly. It's difficult to whiteboard agent architectures in advance—you need some directional vision but must try things out, evaluate reliability, and adapt based on reality.

Critical to this approach is engineers themselves performing evaluation, examining logs and traces, and talking to customers. The person who built a system should be the one debugging it and understanding whether the model is behaving as intended. They don't believe in separating prompt engineering from system building because it's too nuanced—changing a prompt often requires changing tools and infrastructure, and understanding these interdependencies requires end-to-end ownership.

Non-engineers don't directly contribute to agent prompts or configuration. While it's relatively easy for anyone to add a sentence to a prompt, this creates problems around validation, accountability, and fixes when things break. The number of pull requests has exploded as code generation makes it easy for everyone to write code, but they want engineers to be the ones consolidating requirements, implementing changes, and owning outcomes rather than just reviewing others' changes and fixing issues later. Customer-facing team members provide feedback, but engineers consolidate that with other requirements to make improvements.

## Production Challenges and Edge Cases

Users quickly test the limits of the system in ways engineers don't anticipate, attempting tasks like cluster analysis or running classification models in Python. The Python image the team provides is intentionally limited in available packages, which sometimes leads to the agent trying to implement algorithms from scratch rather than using libraries. This feedback loop has led to expanding the available tools to prevent the agent from reinventing solutions.

Multimodality introduces infrastructure challenges beyond AI capabilities. With interviews running on millions of devices globally, compatibility issues around microphone access and audio/video functionality create the kinds of problems everyone experiences with Zoom calls, but at scale. The AI models handle multimodality reasonably well, but the device and browser compatibility challenges are significant.

Transcription, while generally good, still struggles with new product names and domain-specific terminology. The LLM-based correction layer that uses interview context helps address this, adding intelligence that pure transcription models lack.

For cost management in the long-running analysis, they run analyses at specific response thresholds rather than after every new response. A single comprehensive analysis might be expensive, though not prohibitively so for their higher-priced offering. The challenge is balancing cost with the need to show results quickly and update them as new data arrives. The incremental update approach with placeholder-based number updates represents their solution to this tension.

## Memory and Cross-Project Learning

The platform implements a relatively explicit form of memory through organization-level instructions that humans configure. These instructions inform both new project setup and analysis approaches. The key challenge is determining what's interesting versus obvious—the agent can't judge this externally, as information that seems novel might be common knowledge within the organization.

Over time, the vision involves using reports generated for previous projects as input for new studies, though this introduces complexity. Knowledge from one report might not be known to a different business unit, so determining what constitutes common knowledge isn't straightforward. They're using some cross-project information for formatting preferences and background context, but acknowledge much work remains in this area.

## Reflections on the State of LLMOps

The ListenLabs case represents a mature LLMOps implementation that has evolved through multiple architectural generations as both LLM capabilities and the team's understanding have advanced. The system demonstrates sophisticated patterns around parallelization, evaluation, incremental updates, and multi-agent orchestration that go well beyond basic LLM integration.

The team's emphasis on end-to-end ownership, detailed trace analysis, and production-based learning reflects practices that appear critical for complex agent systems. Their evolution from retrieval-focused to classification-focused and then to a hybrid approach mirrors broader industry learning about when different techniques are appropriate.

The challenges they face around sandboxing, cost management, evaluation of nuanced outputs, and interface design for agentic behaviors represent areas where the industry is still developing best practices. Their pragmatic approach of starting with simpler solutions and adding complexity only when justified by production usage provides a model for sustainable agent development.
