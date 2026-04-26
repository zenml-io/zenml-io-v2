---
title: "Multi-Agent Orchestration for Enterprise Conversational AI"
slug: "multi-agent-orchestration-for-enterprise-conversational-ai"
draft: false
llmopsTags:
  - "question-answering"
  - "chatbot"
  - "document-processing"
  - "classification"
  - "multi-agent-systems"
  - "agent-based"
  - "rag"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "latency-optimization"
  - "error-handling"
  - "system-prompts"
  - "evals"
  - "llama-index"
  - "langchain"
  - "monitoring"
  - "anthropic"
industryTags: "tech"
company: "Atlassian"
summary: "Atlassian evolved Rovo Chat, their conversational AI assistant for enterprise knowledge retrieval and workflow automation, from a single-agent RAG architecture to a hierarchical multi-agent orchestration system. The problem was that a single agent struggled to reliably handle diverse tasks and tools across different domains (Jira, Confluence, search, etc.) while maintaining quality and latency. Their solution involved decomposing complex queries into subtasks handled by domain-specialized subagents (like a Jira Agent with custom JQL capabilities), implementing dynamic reasoning modes (brainstorming, tool QnA, multi-step reasoning), and using a hybrid orchestrator that leverages parallel tool calling. Results showed a 3.49% quality improvement over their baseline, with significant latency reductions particularly at the P10 (75.96% faster) and P50 (29.5% faster) percentiles for time to first token."
link: "https://www.atlassian.com/blog/atlassian-engineering/how-rovo-embraces-multi-agent-orchestration"
year: 2025
seo:
  title: "Atlassian: Multi-Agent Orchestration for Enterprise Conversational AI - ZenML LLMOps Database"
  description: "Atlassian evolved Rovo Chat, their conversational AI assistant for enterprise knowledge retrieval and workflow automation, from a single-agent RAG architecture to a hierarchical multi-agent orchestration system. The problem was that a single agent struggled to reliably handle diverse tasks and tools across different domains (Jira, Confluence, search, etc.) while maintaining quality and latency. Their solution involved decomposing complex queries into subtasks handled by domain-specialized subagents (like a Jira Agent with custom JQL capabilities), implementing dynamic reasoning modes (brainstorming, tool QnA, multi-step reasoning), and using a hybrid orchestrator that leverages parallel tool calling. Results showed a 3.49% quality improvement over their baseline, with significant latency reductions particularly at the P10 (75.96% faster) and P50 (29.5% faster) percentiles for time to first token."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-orchestration-for-enterprise-conversational-ai"
  ogTitle: "Atlassian: Multi-Agent Orchestration for Enterprise Conversational AI - ZenML LLMOps Database"
  ogDescription: "Atlassian evolved Rovo Chat, their conversational AI assistant for enterprise knowledge retrieval and workflow automation, from a single-agent RAG architecture to a hierarchical multi-agent orchestration system. The problem was that a single agent struggled to reliably handle diverse tasks and tools across different domains (Jira, Confluence, search, etc.) while maintaining quality and latency. Their solution involved decomposing complex queries into subtasks handled by domain-specialized subagents (like a Jira Agent with custom JQL capabilities), implementing dynamic reasoning modes (brainstorming, tool QnA, multi-step reasoning), and using a hybrid orchestrator that leverages parallel tool calling. Results showed a 3.49% quality improvement over their baseline, with significant latency reductions particularly at the P10 (75.96% faster) and P50 (29.5% faster) percentiles for time to first token."
notion:
  pageId: "34ef8dff-2538-8185-959a-c5da15f6e1a5"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:04:31Z"
---

## Overview

Atlassian's case study describes the evolution of Rovo Chat, their enterprise conversational AI product designed to help users retrieve information from knowledge bases and perform actions across Atlassian's product suite (Jira, Confluence, etc.). This is a production LLM system serving enterprise customers with the goal of streamlining workflows through instant access to knowledge and automated actions like updating pages or analyzing Jira boards. The technical narrative covers their architectural journey from single-agent RAG to hierarchical multi-agent orchestration, revealing important lessons about scaling LLM systems to handle diverse tasks while maintaining quality and performance.

The core challenge Atlassian faced is familiar to organizations deploying LLMs in production: as they added more tools and capabilities to Rovo Chat, a single-agent architecture became increasingly confused and error-prone. When an agent must juggle dozens or hundreds of tools across different domains (Jira query language, Confluence search, people lookups, URL reading, etc.), the cognitive load on the LLM leads to tool misclassification and degraded performance. Their solution centers on decomposing this complexity through specialized subagents organized hierarchically, with an orchestrator that routes queries to appropriate "experts."

## Technical Architecture Evolution

### Single-Agent Baseline

Atlassian's initial implementation followed a standard RAG pattern with all tools exposed at the top level of a single agent. To mitigate tool selection errors, they trained intent classifiers on internal and synthetic data to reduce the tool search space. However, this approach proved static and struggled with generalizability, particularly for complex multi-step queries. This baseline serves as their evaluation reference point.

### Graph-Based Multi-Agent Orchestration (Intermediate Approach)

Their first multi-agent experiment involved a planning phase that decomposed user queries into directed acyclic graphs (DAGs) of subtasks. The system would generate a plan upfront, assign subtasks to specialized subagents, and execute them according to topological ordering. This design included special "Think" and "Answer" control subagents to manage orchestration states, plus a "Direct Answer" path for queries requiring no tools.

The graph approach enabled natural subtask decomposition—simple queries generated shallow DAGs while complex queries created deeper execution paths. Atlassian theorized that this long-horizon planning would provide fine-grained control and maximize information flow between agents. However, they encountered a critical operational challenge: when subagents failed or provided incomplete information, reconfiguring the pre-planned graph proved extremely difficult. Without complete information from just the user query, single-shot planning couldn't reliably predict which subagent outputs would be relevant for downstream tasks in the topological order. The authors note this approach would be better suited for reinforcement learning scenarios with historical tool success rates as rewards and latency as penalties—essentially an POMDP formulation requiring post-training optimization.

### Hybrid Orchestrator (Current Production System)

Learning from the graph orchestration challenges, Atlassian settled on what they call a "hybrid orchestrator" that combines tool calling with hierarchical subagents. Rather than pre-planning an entire execution graph, the system leverages modern LLMs' parallel tool-calling capabilities to generate subtasks one step at a time given current context. This approach balances the benefits of specialized agents with the flexibility needed when agent outputs are uncertain.

The orchestrator explicitly tunes the LLM to break complex queries into digestible subtasks through prompt engineering. At each orchestration step, it can invoke multiple tools or subagents in parallel, allowing it to adapt based on what information is actually retrieved rather than committing to a fixed plan upfront.

## Domain-Specialized Subagents

A key architectural principle is organizing tools into "domain" subagents that act as experts for specific problem categories. This reduces the blast radius of introducing new tools—changes only impact the relevant expert subagent rather than the entire system.

### Jira Agent Deep Dive

The Jira Agent exemplifies their domain specialization approach. Jira search relies on Jira Query Language (JQL), which supports numerous filtering capabilities (assignee, project key, resolution status, etc.). While base LLMs have some JQL knowledge from pre-training, specialized instructions significantly improve performance for Jira-related queries. The Jira Agent has access to three tools:

- **JQL Documentation Search**: Retrieves documentation on JQL syntax
- **JQL Execution**: Generates and executes JQL queries
- **Entity Linking**: Maps natural language entity names to user IDs for JQL generation

An interesting capability unlocked by this specialization is handling massive Jira issue volumes. Users commonly ask analytical questions about boards containing thousands of tickets (e.g., "what issues should I prioritize on this board?"). Since all issues cannot fit in the LLM context window, Atlassian gave the JQL Execution Tool specialized metadata allowing it to decide whether to loop over batches of results. The tool can iteratively refine outputs across many issues, enabling analysis of entire boards with 1000+ tickets.

By isolating these Jira-specific instructions and tools within a subagent, they prevent confusion at the top-level orchestrator, which must handle hundreds of tools across all domains.

### System Tools

Not every task requires domain expertise or complex agentic reasoning. For simpler operations, Atlassian exposes "system tools" directly at the orchestrator level, bypassing full agent invocations to reduce latency and complexity. Examples include:

- **Search**: Natural language search across enterprise and web data
- **UrlRead**: Extracts content from URLs found in text
- **People**: Entity linking for people lookups

This design recognizes that orchestration overhead should match query complexity—simple tasks shouldn't incur unnecessary latency from agent invocations.

## Dynamic Reasoning Modes

The hybrid orchestrator routes queries to different reasoning modes based on complexity, allowing the LLM to select the appropriate level of processing:

**Brainstorming Scenario**: Pure LLM generation with no tool calls, optimized for low latency when users want ideation or discussion without needing external data.

**Tool QnA Scenario**: Single layer of parallel tool calls for straightforward information retrieval. Users expect some latency for operations like search.

**Reasoning Scenario**: Multi-step reasoning requiring sequential tool calls with dependencies. The system explicitly generates a natural language research plan to guide subsequent tool invocations, particularly important for complex queries requiring multiple tasks. Higher latency is acceptable here given the complexity.

This mode selection is dynamic—the LLM decides routing based on query characteristics rather than hard-coded rules, allowing graceful handling of the spectrum from simple to complex queries.

## LLMOps: Evaluation and Production Metrics

Atlassian demonstrates mature LLMOps practices through their evaluation methodology, though the details reveal both strengths and limitations worth noting critically.

### Quality Evaluation

They maintain a curated offline evaluation set combining internal production data and synthetic examples. Each test case includes a reference answer. Quality assessment uses LLM-as-a-judge to evaluate whether Rovo Chat's response aligns with the reference, assigning binary true/false labels for correctness. Their metric is simply: (number of correct responses / total responses).

Results show progressive improvement:
- **Single Agent RAG**: Baseline
- **Multi-Agent DAG Orchestrator**: +2.52%
- **Hybrid Orchestrator**: +3.49%

While a 3.5% improvement may seem modest, it's important to recognize that these absolute percentage gains likely represent meaningful quality improvements for enterprise users. However, the binary scoring and reliance on LLM-as-judge introduces potential issues. Binary evaluation can miss nuanced improvements in helpfulness, and LLM judges can exhibit biases or inconsistencies. The case study doesn't discuss inter-rater reliability, calibration against human judgments, or how they handle edge cases where the judge might be uncertain. For production systems, more sophisticated evaluation rubrics considering dimensions like accuracy, completeness, relevance, and harmfulness would provide richer insights.

The use of both internal and synthetic data is pragmatic—synthetic data can help cover edge cases underrepresented in production logs—but the ratio and generation methodology aren't disclosed. Over-reliance on synthetic data could lead to gaming the evaluation without improving real-world performance.

### Latency Metrics

Atlassian tracks time-to-first-token latency, which reflects when users first see a response. This is the right metric for conversational AI where perceived responsiveness matters enormously. Their results across percentiles show interesting patterns:

| Metric | Single Agent | DAG Orchestrator | Hybrid Orchestrator |
|--------|--------------|------------------|---------------------|
| P10 latency | Baseline | -71.7% | -75.96% |
| P50 latency | Baseline | -1.16% | -29.5% |
| P90 latency | Baseline | +2.24% | -19.97% |

The dramatic P10 improvements (75.96% reduction for hybrid orchestrator) stem from "direct answer" pathways that skip tool calls for simple queries. The DAG orchestrator's slight P90 regression (+2.24%) compared to single-agent reveals the planning overhead cost for complex queries, which the hybrid orchestrator addresses with its adaptive approach.

Critical assessment: while these latency improvements are impressive, absolute latency values aren't provided. A 75% reduction sounds great but matters differently if baseline P10 is 100ms versus 5 seconds. Additionally, latency is measured during offline evaluation, which may not reflect production conditions with concurrent users, varying LLM API response times, cold starts, and network variability.

### Production Considerations Not Discussed

Several important LLMOps dimensions receive limited or no coverage:

- **Cost**: Operating multi-agent systems likely increases LLM API costs significantly through multiple sequential and parallel calls. No cost analysis or cost-quality tradeoffs are mentioned.
- **Monitoring and Observability**: How do they track agent decision-making, tool selection errors, and failure modes in production? What dashboards or alerts exist?
- **Error Handling**: Beyond mentioning that graph orchestration struggled with subagent failures, there's no discussion of retry logic, fallback strategies, or graceful degradation.
- **Safety and Guardrails**: For enterprise deployment, content filtering, PII handling, and preventing harmful actions are critical—none are discussed.
- **Versioning and Deployment**: How do they deploy orchestrator changes? Can they A/B test different agent configurations? How do they roll back if a new subagent degrades quality?

These omissions are understandable in a blog post focused on architectural decisions, but they represent significant operational considerations for anyone implementing similar systems.

## Lessons and Tradeoffs

Atlassian's journey reveals several important insights about productionizing multi-agent LLM systems:

**Hierarchical specialization works**: Isolating domain expertise in subagents improved both quality and maintainability compared to monolithic agents. This aligns with software engineering principles around separation of concerns and modularity.

**Upfront planning has limits**: The DAG orchestrator's failure highlights that LLMs cannot reliably plan complete execution paths without seeing intermediate results. This suggests reinforcement learning or iterative planning approaches are more suitable for complex agentic workflows than one-shot planning.

**Flexibility-complexity tradeoff**: The hybrid orchestrator's adaptive tool calling adds complexity but provides necessary flexibility. The authors chose to "simplify" by removing the graph structure, but the system still requires sophisticated prompt engineering to achieve appropriate subtask decomposition and routing.

**Latency optimization through routing**: Different query types have different complexity-latency tradeoffs. Systems that route appropriately—bypassing orchestration for simple queries while enabling multi-step reasoning for complex ones—can optimize both quality and user experience.

**Evaluation methodology matters**: The 3.5% quality improvement is presented positively, but without error bars, statistical significance testing, or discussion of evaluation set size and coverage, it's difficult to assess whether this represents a robust improvement or measurement noise. The LLM-as-judge approach is pragmatic and scalable but inherits the biases and limitations of the judge LLM itself.

## Critical Perspective

As a vendor blog post, this case study naturally emphasizes successes while downplaying challenges. Several claims deserve skepticism:

The quality improvement of 3.49% is positive but modest, especially considering the architectural complexity added. Enterprise customers should weigh whether this improvement justifies the operational overhead of managing multi-agent systems. The evaluation may also favor the newer system if the eval set was constructed during its development.

The latency improvements are more compelling but incomplete without absolute values and production variance data. Offline evaluation latency often underestimates production latency where LLM APIs may be slower, tools may time out, and concurrent load impacts performance.

The case study doesn't discuss failure modes that likely occurred during development. How often do agents route to incorrect subagents? What happens when tools return malformed data? How do they handle infinite loops in multi-step reasoning? These operational realities would help practitioners understand the full complexity.

The emphasis on "unlocking additional capabilities" through multi-agent frameworks is somewhat vague. Concrete examples of tasks impossible in the single-agent system but possible in multi-agent would strengthen the case. The Jira batch processing capability is mentioned but not thoroughly evaluated.

## Broader Context

This case study sits within broader trends in LLMOps and production AI systems. Multi-agent orchestration has gained significant attention in the AI engineering community, with frameworks like LangGraph, AutoGen, and CrewAI promoting similar hierarchical and graph-based approaches. Atlassian's experience validates some promises (specialization improves quality) while highlighting challenges (upfront planning is brittle).

The evolution from RAG to agentic RAG to multi-agent systems reflects the field's maturation. Early LLM applications focused on retrieval augmentation, but production requirements quickly revealed needs for actions, tool use, and complex reasoning. Atlassian's journey shows this isn't just about adding tools—it requires rethinking orchestration architecture to maintain quality and performance at scale.

Their hybrid approach of combining static tool schemas with dynamic execution represents a pragmatic middle ground between fully scripted workflows and unconstrained agent autonomy. This may be the right balance for enterprise applications where reliability matters more than theoretical agent capabilities.

## Technical Implementation Details

While the case study provides architectural overview, several implementation details would benefit practitioners:

**Prompt Engineering**: The article mentions "explicit tuning" of the orchestrator and "custom instructions" for subagents but doesn't share actual prompts or engineering techniques. How do they balance instruction specificity with maintaining LLM flexibility? How much few-shot examples do they provide?

**Model Selection**: No information on which LLMs power different components. Do they use the same model for orchestration and subagents? Smaller models for simple tools and larger models for complex reasoning? This has significant implications for cost and latency.

**Context Management**: With hierarchical agents and multiple tool calls, context window management becomes critical. How do they decide what information to pass between agents? How do they summarize or truncate long tool outputs? The Jira batch processing hint at iterative refinement but details are sparse.

**Tool Schema Design**: Parallel tool calling effectiveness depends heavily on well-designed function schemas. How do they structure schemas to make tool selection clear? How do they handle overlapping tool capabilities?

## Conclusion

Atlassian's Rovo Chat case study demonstrates a mature approach to evolving production LLM systems based on real-world performance needs. Their journey from single-agent to multi-agent orchestration illustrates both the benefits of hierarchical specialization and the challenges of managing increased system complexity. The hybrid orchestrator represents a pragmatic resolution to the tension between upfront planning and adaptive execution.

From an LLMOps perspective, the case study shows good practices in iterative architecture improvement and quantitative evaluation, though deeper discussion of cost, reliability, and operational monitoring would provide a more complete picture. The modest quality improvement alongside significant latency gains suggests their architectural choices prioritized user experience (faster responses) while maintaining acceptable accuracy.

For practitioners considering similar multi-agent architectures, Atlassian's experience suggests this approach is viable for enterprise applications with diverse tool ecosystems, but requires investment in evaluation infrastructure, prompt engineering across multiple agents, and careful orchestration design. The critique of graph-based planning highlights important limitations of current LLMs for long-horizon task decomposition, suggesting simpler iterative approaches may be more robust in production despite being less theoretically elegant.
