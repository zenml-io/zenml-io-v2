---
title: "Agentic Search and Context Engineering for Production LLM Systems"
slug: "agentic-search-and-context-engineering-for-production-llm-systems"
draft: false
llmopsTags:
  - "question-answering"
  - "code-generation"
  - "chatbot"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "multi-agent-systems"
  - "error-handling"
  - "few-shot"
  - "system-prompts"
  - "langchain"
  - "elasticsearch"
  - "docker"
  - "documentation"
  - "open-source"
  - "openai"
  - "anthropic"
  - "meta"
  - "google-gcp"
industryTags: "tech"
company: "Elastic"
summary: "This case study presents Elastic's approach to implementing agentic search systems for production LLM applications, focusing on context engineering challenges. The presentation addresses the limitations of fixed RAG pipelines and demonstrates how agentic search tools can dynamically retrieve and filter information from multiple context sources including databases, local file systems, and web sources. Through practical demonstrations using conference session data, the presenter shows how different search tool architectures—from simple semantic search to general-purpose query execution and shell-based tools—can be combined to create robust production systems. The solution emphasizes the importance of tool description design, error handling, agent skills for complex queries, and logging agent behavior to optimize the balance between specialized and general-purpose search tools."
link: "https://www.youtube.com/watch?v=ynJyIKwjonM"
year: 2026
seo:
  title: "Elastic: Agentic Search and Context Engineering for Production LLM Systems - ZenML LLMOps Database"
  description: "This case study presents Elastic's approach to implementing agentic search systems for production LLM applications, focusing on context engineering challenges. The presentation addresses the limitations of fixed RAG pipelines and demonstrates how agentic search tools can dynamically retrieve and filter information from multiple context sources including databases, local file systems, and web sources. Through practical demonstrations using conference session data, the presenter shows how different search tool architectures—from simple semantic search to general-purpose query execution and shell-based tools—can be combined to create robust production systems. The solution emphasizes the importance of tool description design, error handling, agent skills for complex queries, and logging agent behavior to optimize the balance between specialized and general-purpose search tools."
  canonical: "https://www.zenml.io/llmops-database/agentic-search-and-context-engineering-for-production-llm-systems"
  ogTitle: "Elastic: Agentic Search and Context Engineering for Production LLM Systems - ZenML LLMOps Database"
  ogDescription: "This case study presents Elastic's approach to implementing agentic search systems for production LLM applications, focusing on context engineering challenges. The presentation addresses the limitations of fixed RAG pipelines and demonstrates how agentic search tools can dynamically retrieve and filter information from multiple context sources including databases, local file systems, and web sources. Through practical demonstrations using conference session data, the presenter shows how different search tool architectures—from simple semantic search to general-purpose query execution and shell-based tools—can be combined to create robust production systems. The solution emphasizes the importance of tool description design, error handling, agent skills for complex queries, and logging agent behavior to optimize the balance between specialized and general-purpose search tools."
notion:
  pageId: "35bf8dff-2538-80df-b804-d45d5f9f3396"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-09T13:14:00.000Z"
  lastEditedTime: "2026-05-09T13:14:00.000Z"
  publishedAt: "2026-05-10T06:02:14Z"
---

## Overview

This case study from Elastic explores production patterns for implementing agentic search systems that handle context engineering for LLM applications. The presenter, Leonei from Elastic, argues that context engineering is approximately 80% agentic search, focusing on the critical pathway between context sources and the LLM's context window. The presentation demonstrates practical implementations using Elasticsearch as the primary database, conference session data as the use case, and LangChain as the orchestration framework.

## Evolution from RAG to Agentic Search

The presentation traces the evolution from fixed RAG pipelines to agentic search architectures. Traditional RAG systems had a deterministic retrieval pipeline where user messages were directly converted to search queries, typically using vector search to retrieve chunks from a database. This approach had several limitations: it retrieved context regardless of whether it was needed, potentially confusing the LLM with irrelevant information, and it only retrieved once, making multi-hop retrieval impossible when initial chunks revealed the need for additional searches.

Agentic RAG replaced the fixed pipeline with a search tool that allows the agent to decide whether to retrieve information, assess relevance, and potentially retrieve multiple times with refined queries. However, even agentic RAG with a single database as a context source proved insufficient for real-world context engineering needs.

## Context Sources and Search Tool Landscape

Modern production systems must handle multiple context sources, each requiring different search approaches. The presentation identifies several key context sources: local files for coding projects and documentation, working memory such as planning documents or scratch pads, agent skills stored in local folders, traditional databases containing enterprise data, web sources, and long-term memory systems. The debate about whether long-term memory should reside in local file systems or databases remains an active discussion in the field.

For each context source, different native search tools are appropriate. Local files benefit from file search tools, skills require skill loading tools, databases need semantic search or query execution tools supporting languages like SQL or ESQL, web sources require web search tools, and memory systems need dedicated memory tools. Additionally, shell tools provide a versatile general-purpose interface that can interact with multiple context sources through command-line interfaces, CLIs, file system navigation, and HTTP requests.

## Fundamental Challenges in Agentic Search

The presentation identifies three primary failure modes in production agentic search systems. First, the agent may not call any tool, relying instead on parametric knowledge when retrieval is actually needed. Second, the agent may call the wrong tool—a colleague reported significant difficulty getting an agent to consistently choose a database search tool over a web search tool. Third, the agent may generate incorrect parameters for the search tools, particularly when parameter complexity is high.

Tool description quality emerges as the most important factor for correct tool selection, yet it often receives minimal effort in implementation. While many developers use single-sentence descriptions, production systems benefit from comprehensive descriptions including core purpose, trigger conditions specifying when the tool should and should not be used, and relationships with other tools indicating sequencing and dependencies. When tool descriptions alone prove insufficient, reinforcing instructions in the agent system prompt becomes necessary.

Parameter complexity also significantly impacts success rates. Simple parameters like customer IDs or semantic search query strings rarely cause issues. However, as parameter lists grow longer with options for filters, top-K values, and other settings, generation difficulty increases. The most complex scenario involves general-purpose tools where agents must generate complete search queries in languages like ESQL or SQL from scratch.

## Implementation Architecture: Semantic Search

The initial demonstration implemented a basic semantic search tool using Elasticsearch with conference session data. The data structure included a text field combining session titles and descriptions that were embedded as vector embeddings for semantic search, plus metadata fields for day, time, room, and speaker names that supported filtering but not semantic search. The implementation used OpenAI's GPT-4o-nano model with a simple system prompt explaining the agent's purpose and data structure.

The semantic search tool used Nomic's embed-text-v1.5 embeddings model to embed queries at runtime. LangChain's tool decorator converted a Python function into an agent tool, automatically using the function name as the tool name and the docstring as the tool description. The implementation set a fixed top-K limit of three results. For a query about regulatory constraints in AI systems, the agent successfully called the semantic search tool multiple times with different query formulations until it found satisfactory results.

However, this approach proved brittle. When searching for sessions about GDPA, the semantic search tool failed completely, returning talks about Gemma models and other unrelated topics instead of the actual GDPA session that existed in the dataset. The fixed semantic search approach could not handle keyword-based queries, exact matches, or filtering operations effectively.

## General-Purpose Query Execution

To address semantic search limitations, the presentation demonstrated replacing the semantic search tool with a general-purpose query execution tool that allowed agents to write complete ESQL queries. This required upgrading from GPT-4o-nano to GPT-4o-mini due to the increased complexity of generating valid query syntax. The system prompt remained largely the same but now explained data structure in terms relevant to query generation.

The execute query tool accepted an entire ESQL query as a parameter rather than just a topic string. Critically, this implementation included comprehensive error handling with try-except blocks that returned error messages to the agent rather than crashing the system. This enabled self-correction when the agent generated invalid queries, which proved essential given the complexity of query generation.

In initial testing, the agent successfully constructed ESQL queries with proper structure but made syntax errors, such as using the SQL percentage sign as a wildcard character instead of ESQL's asterisk. When this returned zero results, the system faced an important design question: should zero results be considered a valid response or a failure mode requiring intervention?

## Agent Skills for Progressive Disclosure

Rather than cramming increasingly detailed syntax rules into tool descriptions or system prompts, the implementation adopted agent skills using a progressive disclosure pattern. Skills have both a name and description injected into the system prompt (typically from markdown frontmatter) and full documentation loaded into the context window only when needed. This balances discoverability with context window efficiency.

The custom ESQL agent skill included basic query structure templates, syntax rules such as ESQL using double quotes for string literals, and specific guidance on wildcard patterns using asterisks instead of percentage signs. LangChain provides boilerplate code for skill loading tools and skill middleware that handles the progressive disclosure mechanism.

The tool description was updated to explicitly reference the skill, stating "always use the Elasticsearch ESQL skill to generate the ESQL query before using this tool." This relationship was reinforced in the system prompt to ensure the agent followed the correct sequence. With this architecture, the agent successfully loaded the skill when needed, generated valid ESQL queries with correct wildcard syntax, and found the target GDPA session.

An important benefit of general-purpose query tools is their ability to perform calculations and aggregations within the database rather than in the LLM. When asked how many sessions occurred on a specific date, the agent wrote an ESQL query with filtering and counting operations, returning a single number rather than filling the context window with 27 session records and attempting to count them. This is particularly valuable given that LLMs are notoriously poor at counting and because it significantly reduces context window consumption.

## Shell Tools and File System Search

The presentation explored shell-based search as an alternative architecture, responding to the emerging discussion that "all an agent needs is a shell tool and a file system." The conference session data was restructured into a local file system with folders for session types and individual files per session containing title, metadata, and description.

Using LangChain's built-in shell tool required careful consideration of safety, as terminal access enables file deletion and other potentially destructive operations. LangChain provides no safeguards by default, making sandboxed environments essential for production use. The shell tool accepts a commands parameter that executes arbitrary terminal commands.

The system prompt was adapted to explain file system structure rather than database structure. Using GPT-4o-nano proved sufficient since LLMs generally excel at navigating file systems and writing shell commands. When queried about GDPA sessions, the agent explored the folder structure and executed grep commands searching the first 50 entries, found one result, expanded the search to all session data, and read the complete file content before responding.

Interestingly, the agent demonstrated creative workarounds for semantic search limitations in grep by chaining together extensive synonym lists. When searching for sessions about regulatory constraints, the agent's grep command searched for "regulate", "regulation", "regulatory", "compliance", "constraints", "GDPR", "governance", and numerous other related terms. While this approach ultimately succeeded in finding relevant sessions, its efficiency is questionable compared to true semantic search, particularly for broader queries like "movies with animal superheroes" where exhaustive synonym enumeration becomes impractical.

## Semantic Search for File Systems

To address grep's limitations while maintaining file system architecture, the demonstration integrated Jina's jina-reranker-v1-turbo-en model through its CLI. After installing the Jina CLI, the system prompt was updated to explain that semantic search capabilities were available through the jina grep command, with examples of usage syntax and guidance on when to use traditional grep versus jina grep—exact matches for the former, semantic or fuzzy queries for the latter.

With this hybrid approach, the agent successfully used jina grep for the regulatory constraints query, correctly identifying relevant sessions on the first attempt with a top-K of 10 results. This demonstrated significantly improved efficiency compared to the synonym-chaining approach while maintaining the file system architecture.

## Practical Recommendations for Production Systems

The presentation concludes with practical guidance for production LLMOps implementations. Rather than seeking a single "silver bullet" tool, production systems should curate a balanced set of search tools combining specialized and general-purpose capabilities. This concept draws from user experience design principles of "low floor, high ceiling."

Specialized tools provide a low floor—agents can use them immediately without errors, with simple parameters that don't require powerful models. Examples include semantic search for common query patterns or customer lookup by ID. These tools deliver efficient, single-call solutions for expected query types. General-purpose tools provide a high ceiling—they handle unexpected or complex queries that specialized tools cannot address. Shell tools and query execution tools fall into this category, enabling agents to solve novel problems through iteration rather than failing outright. The trade-off is that general-purpose tools may require multiple attempts to reach correct solutions.

When agent behavior patterns are unknown initially, the recommended approach is to start with general-purpose tools while implementing comprehensive logging of agent behavior. If logs reveal agents consistently requiring four or five tool calls per question, the tools may be too complex for the model being used. Query pattern analysis can identify opportunities for specialized tools that handle frequent operations more efficiently. The presenter shared a personal example of using Claude with the exec tool to analyze three days of logged behavior, after which the agent recommended implementing specific database search tools to improve efficiency.

Model selection significantly impacts tool usage patterns. Internal testing at Elastic found that more powerful models substantially reduce parameter generation error rates, though even strong models cannot eliminate errors entirely. The GPT-4o-nano model proved sufficient for simple semantic search and shell tool usage, while GPT-4o-mini was necessary for ESQL query generation, illustrating the model-tool complexity relationship.

Error handling proves critical for general-purpose tools where agents may generate invalid parameters. Rather than system crashes, production implementations should return error messages to agents, enabling self-correction through iterative refinement. This pattern appeared repeatedly in the query execution demonstrations where syntax errors triggered retry loops.

The presentation also addressed the relationship between threshold configuration and agent reasoning. While traditional semantic search systems use conservative thresholds to avoid irrelevant results, agentic systems demonstrate improved ability to reason about result relevance. Agents can effectively filter out irrelevant results from top-K returns based on the query context. However, in longer conversations, accumulating marginal results in the context window may eventually confuse agents, suggesting that threshold strategy depends on specific use case characteristics.

## Hybrid Tool Architectures

An interesting finding from external research mentioned in the Q&A involved Vercel's experiments with hybrid agent architectures. Their testing compared agents with only bash tools, only file search tools, only database tools, and combinations thereof. For analytical queries specifically, database tools proved most effective, while file search tools excelled at quick lookups. The hybrid agent combining bash and database tools achieved the highest accuracy by using the database tool for queries and then verifying results with the shell tool, demonstrating that tool combination can exceed individual tool performance.

Sub-agents for specialized search tasks were briefly discussed, with Anthropic's Claude Code using sub-agents to handle niche questions about the Claude Code product itself. This pattern of delegating expertise to specialized sub-agents represents another architectural option for production systems, though the presenter had limited direct experience with this approach.

Context window management for progressive skill disclosure was addressed in the Q&A. The implementation pattern involves loading skills on demand when needed and then offloading them as conversation progresses, preventing context window bloat. The file store itself can be searched for previous tool results, making it a persistent reference that supports context compaction strategies.

## Production Considerations and Trade-offs

Throughout the presentation, the speaker emphasized balanced assessment rather than accepting tool capabilities at face value. The synonym-chaining grep approach "works" but may not represent the most efficient solution. The shell tool provides versatility but introduces security risks requiring sandboxing. General-purpose query tools offer flexibility but demand stronger models and more sophisticated error handling than specialized alternatives.

The evolution from fixed RAG to agentic search to multi-tool context engineering reflects increasing production complexity that requires careful architectural decisions. Tool description quality, often treated as an afterthought, emerges as perhaps the most critical factor for correct agent behavior. The relationship between tool complexity, model capability, and error rates creates a design space that must be navigated based on specific use case requirements rather than universal best practices.

The presentation's use of conference session data as a consistent dataset across different architectural approaches effectively demonstrated how the same retrieval problem can be solved through semantic search, query execution, grep-based file search, and semantic file search, each with distinct trade-offs in terms of accuracy, efficiency, robustness, and operational complexity. This practical comparison provides valuable guidance for teams designing production LLM systems that must reliably retrieve relevant context from diverse sources under real-world constraints.
