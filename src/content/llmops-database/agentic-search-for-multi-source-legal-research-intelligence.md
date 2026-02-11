---
title: "Agentic Search for Multi-Source Legal Research Intelligence"
slug: "agentic-search-for-multi-source-legal-research-intelligence"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694add2a62d4a3172e9f0442"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:49.583Z"
  createdOn: "2025-12-23T18:19:22.174Z"
llmopsTags:
  - "document-processing"
  - "question-answering"
  - "classification"
  - "summarization"
  - "high-stakes-application"
  - "rag"
  - "prompt-engineering"
  - "embeddings"
  - "agent-based"
  - "few-shot"
  - "error-handling"
  - "semantic-search"
  - "vector-search"
  - "evals"
  - "langchain"
  - "monitoring"
  - "databases"
  - "documentation"
  - "wandb"
  - "openai"
  - "microsoft-azure"
industryTags: "legal"
company: "Harvey"
summary: "Harvey, a legal AI platform, faced the challenge of enabling complex, multi-source legal research that mirrors how lawyers actually work—iteratively searching across case law, statutes, internal documents, and other sources. Traditional one-shot retrieval systems couldn't handle queries requiring reasoning about what information to gather, where to find it, and when sufficient context was obtained. Harvey implemented an agentic search system based on the ReAct paradigm that dynamically selects knowledge sources, performs iterative retrieval, evaluates completeness, and synthesizes citation-backed responses. Through a privacy-preserving evaluation process involving legal experts creating synthetic queries and systematic offline testing, they improved tool selection precision from near zero to 0.8-0.9 and enabled complex queries to scale from single tool calls to 3-10 retrieval operations as needed, raising baseline query quality across their Assistant product and powering their Deep Research feature."
link: "https://www.harvey.ai/blog/how-agentic-search-unlocks-legal-research-intelligence"
year: 2025
seo:
  title: "Harvey: Agentic Search for Multi-Source Legal Research Intelligence - ZenML LLMOps Database"
  description: "Harvey, a legal AI platform, faced the challenge of enabling complex, multi-source legal research that mirrors how lawyers actually work—iteratively searching across case law, statutes, internal documents, and other sources. Traditional one-shot retrieval systems couldn't handle queries requiring reasoning about what information to gather, where to find it, and when sufficient context was obtained. Harvey implemented an agentic search system based on the ReAct paradigm that dynamically selects knowledge sources, performs iterative retrieval, evaluates completeness, and synthesizes citation-backed responses. Through a privacy-preserving evaluation process involving legal experts creating synthetic queries and systematic offline testing, they improved tool selection precision from near zero to 0.8-0.9 and enabled complex queries to scale from single tool calls to 3-10 retrieval operations as needed, raising baseline query quality across their Assistant product and powering their Deep Research feature."
  canonical: "https://www.zenml.io/llmops-database/agentic-search-for-multi-source-legal-research-intelligence"
  ogTitle: "Harvey: Agentic Search for Multi-Source Legal Research Intelligence - ZenML LLMOps Database"
  ogDescription: "Harvey, a legal AI platform, faced the challenge of enabling complex, multi-source legal research that mirrors how lawyers actually work—iteratively searching across case law, statutes, internal documents, and other sources. Traditional one-shot retrieval systems couldn't handle queries requiring reasoning about what information to gather, where to find it, and when sufficient context was obtained. Harvey implemented an agentic search system based on the ReAct paradigm that dynamically selects knowledge sources, performs iterative retrieval, evaluates completeness, and synthesizes citation-backed responses. Through a privacy-preserving evaluation process involving legal experts creating synthetic queries and systematic offline testing, they improved tool selection precision from near zero to 0.8-0.9 and enabled complex queries to scale from single tool calls to 3-10 retrieval operations as needed, raising baseline query quality across their Assistant product and powering their Deep Research feature."
---

## Overview and Business Context

Harvey is a legal AI platform that provides domain-specific AI capabilities for legal professionals, including document analysis, legal research, workflow automation, and Microsoft integrations. The company operates in a highly sensitive environment where accuracy, privacy, and data security are paramount. This case study describes their implementation of "Agentic Search," a sophisticated retrieval-augmented generation (RAG) system designed to handle the complex, multi-source queries that define professional legal research.

The core challenge Harvey addressed stems from the fundamental nature of legal research itself. Legal professionals don't conduct research in a linear, single-query fashion. Instead, they engage in iterative exploration: searching case law, discovering new angles, refining queries, checking different jurisdictions, cross-referencing statutes, and repeating the process. Traditional retrieval systems reduce this nuanced, reasoning-intensive process to a simple query-and-retrieve operation, which fails to capture the sophistication required for professional legal work.

Harvey's solution needed to work across their extensive knowledge infrastructure, which includes over 150 legal knowledge sources, internal Vault documents, iManage integrations, and proprietary databases like case law from LexisNexis. The system needed to support both quick Assistant queries and comprehensive Deep Research reports, all while maintaining strict privacy guarantees that prevent any human from accessing or reviewing actual customer queries.

## The Technical Problem: Why One-Shot Retrieval Fails

The case study provides a concrete example of the complexity involved. Consider a due diligence query: "Review all employment agreements in the data room and identify any non-compete provisions that may be unenforceable under California law. For each provision, cite the relevant California statute or case law."

This seemingly straightforward request actually requires multiple sophisticated operations. The system must analyze employment agreements stored in a Vault data room to extract non-compete clauses, research California statutes like Business and Professions Code Section 16600, find relevant California case law on non-compete enforceability and exceptions, cross-reference each identified provision against those legal standards, and synthesize findings with specific citations to both internal documents and legal authorities. Critically, the agent must move fluidly between document analysis and legal research, understanding how initial findings trigger additional statutory or case law research needs, then applying those legal standards back to analyze the specific provisions discovered.

Traditional naive RAG follows a straightforward pattern: embed the query, retrieve relevant chunks, and generate an answer. This works adequately for simple queries but fundamentally breaks down when research requires multiple rounds of information gathering, synthesis across disparate sources, or reasoning about what information is still missing. The system can't adapt its strategy as it discovers information, can't intelligently decide which knowledge sources are relevant, and can't determine when it has gathered sufficient context to provide a complete answer.

## The Agentic Search Architecture

Harvey's solution transforms retrieval from a one-shot operation into an iterative reasoning process. The system plans its approach, decides which sources to query, evaluates whether it has sufficient information, and refines its strategy based on discoveries. This represents a paradigm shift from naive RAG to what they term "agentic search."

The implementation follows a reasoning-driven retrieval loop inspired by the ReAct (Reasoning and Acting) paradigm, where the agent interleaves reasoning traces with tool calls. The workflow consists of five key phases:

In the query understanding and planning phase, the agent analyzes what information is needed and develops a search strategy, identifying which knowledge sources will be relevant for complex queries. During dynamic tool selection and retrieval, the agent decides which sources to query and formulates specific search queries for each, then executes searches and retrieves relevant information. The reasoning and synthesis phase involves the agent reasoning about how retrieved information connects and applying legal standards to specific facts or provisions. A completeness check evaluates whether sufficient information has been gathered to fully address the query—if gaps remain, the system returns to retrieval for additional rounds with refined queries. Finally, once satisfied with gathered context, the agent synthesizes findings into a comprehensive response with specific citations to source documents.

This architecture enables the system to provide improved accuracy and reduced hallucinations through responses based on verified, current data from multiple sources that can be traced back to specific documents. The agent can check answer relevancy and rewrite queries, iterating until achieving the best response—critical for legal work where accuracy is non-negotiable. Real-time relevance comes from access to the latest case law, regulatory updates, and client documents, ensuring the agent operates with up-to-date knowledge across both foundational precedent and recent developments.

## Key Implementation Challenges

Harvey's engineering team encountered three fundamental challenges that extended beyond standard RAG implementation, revealing the complexity of deploying agentic systems in production.

The source selection challenge emerged when their initial prototype worked well on carefully constructed test queries but struggled with real user queries. Lawyers phrase queries with implicit context—a question like "What's our exposure on the termination provisions?" might require searching internal deal documents, checking market standards, and consulting case law, but doesn't explicitly enumerate these sources. The model would often query only one or two sources when broader coverage was actually needed.

The second challenge involved scaling tool calls to query complexity. Simple questions like "What's the notice period in section 8.2?" should resolve quickly with minimal retrieval, while complex questions should trigger extensive research. Initially, the agent treated nearly every query the same way—making one or two tool calls and moving on. The agent lacked a calibrated sense of when "good enough" was sufficient and when a query demanded exhaustive coverage.

The multi-source citations challenge arose because Harvey's citation system had historically been built and benchmarked on single-source queries. Supporting multi-source queries required ensuring the system built upon foundational improvements made for each source's citation quality while remaining flexible enough to adapt to context from multiple sources. This also required investment in citation benchmarking sets that captured the full spectrum of multi-source queries, from those specifying exactly which sources were preferred to those that were far more open-ended.

## Privacy-Preserving Evaluation Strategy

Perhaps the most interesting aspect of this case study from an LLMOps perspective is how Harvey addressed these challenges given their strict privacy constraints. Since Harvey's privacy guarantees mean no human has access to or reviews actual customer queries, they faced a fundamental question: How do you improve a system when you can't directly observe its real-world performance?

Their solution was building a systematic evaluation process powered by Harvey's in-house legal experts—Applied Legal Researchers (ALRs) and Strategic Business Development Leads (SBDLs) who are former practicing lawyers collaborating closely with engineering on product development. They developed what they describe as a "data flywheel" that continuously improves the system through six interconnected steps.

Query pattern mining begins after receiving aggregated feedback and support tickets describing issues, with the legal team analyzing these patterns to understand common failure modes. Expert query generation involves ALRs and SBDLs creating evaluation queries that capture real usage patterns, spanning from straightforward searches to multi-jurisdictional analysis. Rapid prototyping and testing means building initial prototypes quickly then aggressively testing with the legal team, creating a tight feedback loop that surfaces issues fast. Systematic evaluation leverages centralized evaluation infrastructure built using the OpenAI Agent SDK's OpenTelemetry traces, enabling offline evaluations in LangSmith while tracking metrics like hallucination, tool recall, retrieval recall, formatting, and answer quality. Targeted improvements follow, with iterative refinement of tool design, system prompts, tool bundles and preambles, and tool docstrings. Finally, continuous feedback ensures that as improvements deploy, the legal team continues testing with new query patterns and customer feedback informs the next round of evaluation development.

This approach is particularly noteworthy from an LLMOps perspective because it demonstrates how to maintain quality improvement cycles without direct access to production data—a challenge many organizations face when deploying LLMs in privacy-sensitive environments. The use of domain experts to generate synthetic evaluation queries that match real usage patterns provides a privacy-preserving proxy for actual user behavior.

## Technical Infrastructure and Tooling

The case study reveals several specific technical choices in Harvey's implementation. They built centralized evaluation infrastructure using the OpenAI Agent SDK's OpenTelemetry traces, which enables comprehensive observability into agent behavior. This infrastructure supports offline evaluations run in LangSmith, a platform for testing and monitoring LLM applications.

Their evaluation framework tracks multiple quality dimensions beyond simple accuracy. Hallucination detection ensures responses are grounded in retrieved sources. Tool recall measures whether the agent selects appropriate tools for given queries. Retrieval recall assesses whether relevant information is actually retrieved. Formatting evaluation ensures responses meet professional standards expected in legal work. Answer quality provides an overall assessment of response usefulness and completeness.

The system's tool design appears central to its effectiveness. The case study mentions iterative refinement of "tool bundles and preambles" and "tool docstrings," suggesting they've invested significantly in how tools are described to the language model. This aligns with emerging best practices in agentic systems where clear, well-structured tool descriptions significantly impact tool selection accuracy.

## Quantified Results and Impact

Harvey provides specific quantitative improvements from their agentic search implementation. The source selection challenge was addressed by giving the agent clearer signals about when to use each knowledge source, improving tool selection precision from near zero to 0.8-0.9. For the tool-calling intelligence challenge, evaluation data helped calibrate the agent's effort level, with complex queries that initially resolved in a single tool call now appropriately scaling to 3-10 retrieval operations based on query demands.

These metrics demonstrate substantial improvement in the system's ability to match retrieval effort to query complexity—a key requirement for production deployment where both over-retrieval (wasting resources and time) and under-retrieval (missing critical information) create problems. The improvement in tool selection precision from effectively random to 0.8-0.9 represents a transition from a system that couldn't reliably choose appropriate sources to one that makes correct choices the vast majority of the time.

The case study notes that this capability "helps raise the baseline quality of queries in Harvey Assistant" while also serving as the technical foundation for Deep Research, their most comprehensive mode for multi-source legal analysis. This suggests the agentic search system has become a core platform capability enabling multiple product features.

## Critical Assessment and Limitations

While Harvey's implementation represents sophisticated LLMOps practice, the case study leaves several questions unanswered that would be valuable for a complete assessment. The evaluation approach relies entirely on synthetic queries generated by legal experts rather than real user queries. While this addresses privacy constraints, it's unclear how well these synthetic queries actually match real usage patterns. There's an inherent risk that expert-generated queries reflect how experts think users should search rather than how users actually search, potentially creating a gap between evaluation performance and production performance.

The case study doesn't provide information about latency or cost implications of the agentic approach. Moving from one-shot retrieval to potentially 3-10 retrieval operations necessarily increases both response time and computational cost. For production deployment, understanding the tradeoffs between quality improvement and resource consumption would be important. Similarly, there's no discussion of failure modes or error rates in production, beyond the general statement that initial prototypes struggled with real queries.

The quantified results, while impressive, are limited in scope. Tool selection precision and scaling of tool calls are important metrics, but the case study doesn't provide end-to-end quality metrics like user satisfaction, task completion rates, or comparative accuracy against traditional search approaches. The claim that agentic search "raises the baseline quality" is supported by the improved tool selection, but direct measurement of output quality would strengthen the assessment.

## Future Directions and Ongoing Work

Harvey outlines three key areas for continued development. They're focused on improving AI quality through continued iteration on tool design, reasoning patterns, and evaluation metrics that capture the nuances of legal research quality. Expanding knowledge coverage involves integrating additional legal knowledge sources and databases to ensure agents can access the full breadth of information lawyers need. Perhaps most interestingly from an LLMOps perspective, they're exploring reinforcement fine-tuning on tool use to improve tool recall and routing decisions while reducing reliance on complex prompt engineering.

This last direction is particularly noteworthy. Many agentic systems today rely heavily on prompt engineering to guide tool selection and usage. Reinforcement fine-tuning specifically for tool use could enable more reliable, efficient agent behavior with simpler prompts. This represents a potential shift from primarily prompt-based agent control to learned agent behavior, which could improve consistency and reduce the brittleness often associated with complex prompt engineering.

## Broader LLMOps Implications

This case study illustrates several important patterns for LLMOps in production environments. The privacy-preserving evaluation approach using domain experts to generate synthetic queries provides a template for organizations operating under strict data constraints. The systematic evaluation infrastructure built on OpenTelemetry traces and LangSmith demonstrates how to instrument agentic systems for observability and continuous improvement.

The emphasis on tool design—including tool bundles, preambles, and docstrings—highlights that effective agentic systems require careful attention to how capabilities are presented to the language model, not just what capabilities exist. The multi-dimensional evaluation framework tracking hallucination, tool recall, retrieval recall, formatting, and answer quality shows the complexity of assessing agent performance beyond simple accuracy metrics.

The case study also demonstrates the importance of rapid iteration cycles with domain experts. Harvey's approach of quickly building prototypes then aggressively testing with their legal team creates fast feedback loops that accelerate improvement. This partnership between engineering and domain experts appears central to their success in building systems that meet professional quality standards.

Finally, the case study shows how agentic RAG can serve as platform infrastructure enabling multiple product features. Harvey's agentic search powers both quick Assistant queries and comprehensive Deep Research reports, suggesting that investing in sophisticated retrieval infrastructure can provide leverage across product lines rather than requiring separate solutions for different use cases.