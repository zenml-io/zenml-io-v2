---
title: "Auto-Generated Codebase Documentation and Intelligence at Scale"
slug: "auto-generated-codebase-documentation-and-intelligence-at-scale"
draft: false
llmopsTags:
  - "code-generation"
  - "document-processing"
  - "question-answering"
  - "rag"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "semantic-search"
  - "few-shot"
  - "cost-optimization"
  - "latency-optimization"
  - "harness-engineering"
  - "evals"
  - "langchain"
  - "cache"
  - "anthropic"
industryTags: "tech"
company: "Cognition"
summary: "Cognition developed DeepWiki, a system that automatically generates comprehensive documentation for code repositories, initially built to help their AI coding agent Devin understand codebases better. The system addresses the challenge of creating high-quality, scalable documentation for repositories ranging from small projects to enterprise codebases with millions of lines of code across thousands of repositories. By combining heuristic-based file scoring, graph clustering, and agentic LLM orchestration, DeepWiki has indexed 1.4 million repositories and served over 20 million queries. The system evolved from a highly orchestrated approach (v1) to a more agent-driven architecture (v2) that improved quality while reducing costs, demonstrating how improved model capabilities can shift the balance between rigid orchestration and flexible agent autonomy in production LLM systems."
link: "https://www.youtube.com/watch?v=u8Im0l_vwqM"
year: 2026
seo:
  title: "Cognition: Auto-Generated Codebase Documentation and Intelligence at Scale - ZenML LLMOps Database"
  description: "Cognition developed DeepWiki, a system that automatically generates comprehensive documentation for code repositories, initially built to help their AI coding agent Devin understand codebases better. The system addresses the challenge of creating high-quality, scalable documentation for repositories ranging from small projects to enterprise codebases with millions of lines of code across thousands of repositories. By combining heuristic-based file scoring, graph clustering, and agentic LLM orchestration, DeepWiki has indexed 1.4 million repositories and served over 20 million queries. The system evolved from a highly orchestrated approach (v1) to a more agent-driven architecture (v2) that improved quality while reducing costs, demonstrating how improved model capabilities can shift the balance between rigid orchestration and flexible agent autonomy in production LLM systems."
  canonical: "https://www.zenml.io/llmops-database/auto-generated-codebase-documentation-and-intelligence-at-scale"
  ogTitle: "Cognition: Auto-Generated Codebase Documentation and Intelligence at Scale - ZenML LLMOps Database"
  ogDescription: "Cognition developed DeepWiki, a system that automatically generates comprehensive documentation for code repositories, initially built to help their AI coding agent Devin understand codebases better. The system addresses the challenge of creating high-quality, scalable documentation for repositories ranging from small projects to enterprise codebases with millions of lines of code across thousands of repositories. By combining heuristic-based file scoring, graph clustering, and agentic LLM orchestration, DeepWiki has indexed 1.4 million repositories and served over 20 million queries. The system evolved from a highly orchestrated approach (v1) to a more agent-driven architecture (v2) that improved quality while reducing costs, demonstrating how improved model capabilities can shift the balance between rigid orchestration and flexible agent autonomy in production LLM systems."
notion:
  pageId: "3c6f8dff-2538-803d-8e95-ecfbd02a0ae6"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-24T09:09:00.000Z"
  lastEditedTime: "2026-08-24T09:09:00.000Z"
  publishedAt: "2026-08-24T09:16:10Z"
---

## Overview

Cognition built DeepWiki as a production system for automatically generating comprehensive documentation for code repositories. The system was originally created to help their main product, Devin, an AI coding agent, achieve better macro understanding of codebases. However, the team discovered that the generated documentation was also highly valuable for human developers during onboarding and exploration of unfamiliar codebases. This dual-purpose nature drove them to release it as a standalone product at DeepWiki.com, where users can simply replace "github" with "deepwiki" in any repository URL to access auto-generated documentation. The system now serves production traffic at significant scale, having indexed 1.4 million repositories and served over 20 million queries.

## The Core Production Challenge

The fundamental LLMOps challenge that Cognition addresses is how to generate high-quality, structured documentation at scale while managing real-world constraints around cost, latency, and quality. While the straightforward approach of simply prompting a coding agent to "write me a wiki for this codebase" works reasonably well for small to medium repositories, it breaks down when facing enterprise-scale requirements. Cognition works with large enterprises that have codebases reaching 20 gigabytes in size with tens of millions of lines of code, or organizations with 100,000 repositories where individual projects may need to touch a thousand repositories simultaneously. At this scale, running agent swarms becomes impractical from both cost and latency perspectives.

The quality challenge is equally complex. Defining what makes "good" documentation is inherently ill-defined, but generally involves having appropriate focus, avoiding bloat, and achieving correctness relative to what's most useful for the intended audience. The team highlights an important distinction between wikis designed for agent consumption versus those designed for human readers, though both serve important roles in their system.

## Architectural Approach: The Table of Contents Problem

A key insight driving Cognition's approach is that the hardest part of creating quality documentation is generating the table of contents. This might seem counterintuitive, but the table of contents fundamentally determines the structure of everything that follows—what gets written, how different pieces connect, and which parts of the codebase receive emphasis. Early iterations of their wiki algorithm revealed that generating the wrong content page structure leads to poor documentation regardless of how well individual pages are written.

The table of contents must address several critical questions: What are the key systems in the codebase? What do developers actually care about? How should coverage be prioritized when it's impossible to cover everything? What canonical terminology and glossary terms need to be established? This last point is significant enough that every DeepWiki includes a glossary section, useful for both agents and humans to maintain consistent terminology across the documentation.

Once the table of contents is established, the system can efficiently fan out to write individual wiki pages in parallel. This approach enables proper contextualization within the larger artifact, allowing for effective cross-page linking and citations to the underlying source code.

## Technical Implementation: From Heuristics to Graphs to Agents

The DeepWiki system combines multiple technical approaches in production. The process begins with heuristic-based scoring of files and file connections. These heuristics incorporate diverse features including directory structure, symbol graphs, git history, and runtime data when available. Rather than letting an LLM navigate through code exploration on its own, this quantification step provides a structured first pass that can operate at scale.

The scored file information feeds into the creation of codebase graphs, which undergo clustering to identify the different systems that will be tracked in the wiki. This quantification serves as an initial pass to identify important systems based on actual usage and connection patterns rather than just file structure. The codebase graphs can become quite complex—the example shown from the LangChain repository demonstrates a substantial interconnected structure that provides agents with a structured starting point for understanding repository organization.

With the graph structure established, the system writes the table of contents and then scales up to write individual pages. This hierarchical approach addresses the fundamental challenge of operating within model context limits while maintaining coherent structure across the entire documentation artifact.

## Evolution from v1 to v2: Shifting Toward Agentic Cores

One of the most instructive aspects of this case study is how the system architecture evolved over approximately one year of production operation. The constraints facing the system—model context limits, budget considerations, and user attention spans—remained largely constant. However, the underlying model capabilities improved significantly, enabling a fundamental architectural shift.

DeepWiki v1 was heavily orchestration-led. With weaker models, the team invested significant effort in orchestrating individual model calls and carefully constructing context for each invocation. The system maintained tight control over every model call, essentially micromanaging the LLM's behavior through careful prompt engineering and context management.

DeepWiki v2 pivoted to pass much of this orchestration responsibility to the agent itself, creating what they describe as an "agentic core." The system still uses the same scored and clustered graph as a first pass, but now the agent has the autonomy to adapt to codebase-specific patterns and abnormalities. Features like pulling extra clusters or scoring additional files became tools that the agent can call when needed, rather than orchestrated steps dictated by the system.

Remarkably, this architectural shift delivered significant improvements while using essentially the same set of models—just upgrading to newer versions within the same model families. The more agentic approach proved more adaptive to new repositories and actually delivered cost savings through improved cache performance. This represents a critical LLMOps lesson: as model capabilities improve, production systems should reduce micro-level orchestration and focus instead on providing the right context and tools for agent autonomy.

## Production Evaluation and Quality Metrics

Measuring documentation quality in production presents its own challenges. Cognition employs multiple quantitative measures for assessing wiki health and quality. They track coverage of the most active files based on their scoring system, examine the depth and quality of citations to source code, and importantly, measure the correlation between wiki size and repository size. This last metric addresses a problem observed in initial versions where documentation size would plateau regardless of repository growth, indicating incomplete coverage of large codebases.

An important constraint is that average wiki size remains stable—the system aims to generate appropriately-sized documentation that matches repository complexity without unlimited growth. The v2 architecture achieved substantial quality improvements while maintaining this size consistency, demonstrating that better agent autonomy can improve relevance and focus rather than simply producing more content.

Beyond quantitative metrics, the team emphasizes that ultimate value depends on user utility. Their evaluation process involves working directly with end users, particularly senior engineers at large enterprise customers who are familiar with their own codebases and can assess whether the generated documentation captures what matters. This user-driven evaluation approach helped them iteratively refine the algorithm to produce the structural patterns developers actually need.

## Context Engineering Principles for Production LLM Systems

The presentation articulates several valuable principles for context engineering in production LLM systems, particularly around the RAG versus agentic search debate. The speaker positions themselves as a believer in indexing and precomputation while acknowledging that this isn't a binary choice. As models improve and can intelligently use more context, systems can incorporate user-defined knowledge, precomputed wikis, and live data accessed through protocols like MCP. All of these fall under "agent search"—augmenting the agent rather than replacing its work.

Four key context principles guide their production approach:

**Primary Sources**: This refers to whatever the system considers trustworthy ground truth. In codebases, this means actual code files, commits, and other artifacts known to be correct. Anything processed through summarization or rephrasing, including the generated wikis themselves, is no longer a primary source and introduces potential for error. Multiple levels of summarization lead to meaning loss and error accumulation. This principle informs when agents should reference the generated documentation versus going directly to source code.

**Context Poisoning**: Incorrect or misleading information actively harms agent performance. When designing wikis for agent consumption, it's often better to omit questionable information rather than risk pointing the agent in the wrong direction. This represents a conservative approach to context provision that prioritizes precision over recall.

**Path Compression**: This represents context that helps agents reach conclusions they could have found independently, but more efficiently. For example, providing summary information that would have required several grep searches saves context, tokens, and cost while potentially improving performance. However, this is also where context poisoning risk is highest—pointing the agent in the wrong direction actively harms performance compared to letting it explore independently.

**Unknown Unknowns**: This represents the highest-value category—information the agent would not have discovered on its own. Small pieces of knowledge hidden in codebases that even humans might not know exist present the biggest unsolved problem in context engineering. This is why not everything can be purely agent-driven; some level of orchestration and structured precomputation remains necessary to surface information that wouldn't emerge from tool use alone.

## Integration with Devin and Production Usage

DeepWiki serves as the context layer behind Devin, Cognition's cloud coding agent. This integration demonstrates how precomputed codebase intelligence feeds into real-time agent workflows. The system supports Devin in understanding repository structure, patterns, and conventions before making code changes.

However, the team is candid that agents like Devin can already complete most coding tasks functionally correctly, but still fall short of being "good software engineers" in the holistic sense. Their FrontierCode evaluation measures not just functional correctness but whether code would be accepted by an open-source maintainer in a pull request. Even advanced systems achieve only around 50% on this evaluation, indicating substantial room for improvement.

The information needed for these improvements often exists in the codebase for agents to discover—they can infer patterns and conventions—but they're not consistently doing so yet. The team believes precomputed solutions like DeepWiki can unlock these capabilities by providing structured knowledge about codebase patterns, conventions, and architectural decisions.

## Cost and Performance Optimization

The production system demonstrates several practical optimizations. The shift to the v2 architecture improved cache performance, presumably by making agent behavior more predictable and reusing computed graph structures across similar repository patterns. The quantification and scoring approach enables the system to make decisions about resource allocation—which files to analyze deeply, which clusters to prioritize—without requiring expensive LLM calls for every decision.

The system operates at substantial scale with 1.4 million indexed repositories, indicating successful management of the infrastructure challenges around storage, indexing, and serving. The ability to serve over 20 million queries suggests they've built robust systems for retrieval and question-answering on top of the generated documentation.

## Critical Assessment and Open Challenges

The team is notably candid about unsolved problems. Context engineering and codebase intelligence remain far from solved despite the system's production success. The unknown unknowns problem—surfacing relevant information that agents wouldn't discover through exploration—represents a fundamental limitation of purely tool-based agent approaches.

The evaluation challenge also remains partially unsolved. While they've developed useful quantitative metrics and involve users in qualitative assessment, defining and measuring documentation quality objectively remains difficult. The tension between human-readable and agent-consumable documentation introduces additional complexity since these audiences may have different requirements.

The reliance on heuristics in the initial scoring and clustering phase represents both a strength and potential limitation. While it enables scale, it also means the system's view of "important" code may not always align with what matters for specific use cases. The team's approach of making these heuristics into agent-accessible tools partially addresses this, allowing agents to pull additional information when the initial clustering misses something relevant.

## Broader LLMOps Lessons

This case study illustrates several important lessons for production LLM systems. The evolution from highly orchestrated to more agentic architecture demonstrates that system design should adapt as underlying model capabilities improve. What requires careful orchestration with weaker models may become counterproductive micromanagement with stronger models.

The emphasis on evaluation and metrics, even for subjective qualities like documentation usefulness, shows the importance of developing measurable proxies for system quality. The combination of quantitative metrics with qualitative user feedback provides a more complete picture than either approach alone.

The acknowledgment that precomputation and indexing complement rather than compete with agent autonomy offers a balanced perspective on the RAG versus agentic search debate. Production systems benefit from multiple context sources and approaches, orchestrated appropriately for the task at hand.

Finally, the candid discussion of unsolved problems and ongoing challenges provides valuable context for the state of production LLM systems in the code intelligence domain. While impressive scale and capabilities have been achieved, fundamental challenges around context engineering, quality evaluation, and surfacing unknown information remain active areas of work.
