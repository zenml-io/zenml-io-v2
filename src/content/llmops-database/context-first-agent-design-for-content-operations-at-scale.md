---
title: "Context-First Agent Design for Content Operations at Scale"
slug: "context-first-agent-design-for-content-operations-at-scale"
draft: false
llmopsTags:
  - "content-moderation"
  - "document-processing"
  - "data-analysis"
  - "structured-output"
  - "prompt-engineering"
  - "agent-based"
  - "cost-optimization"
  - "latency-optimization"
  - "chunking"
  - "system-prompts"
  - "error-handling"
  - "open-source"
  - "anthropic"
industryTags: "tech"
company: "Sanity"
summary: "Sanity developed a Content Agent to help users audit, generate, edit, and update content at scale across their content operating system. The team initially struggled with tool proliferation and context management, leading to inconsistent agent behavior. Their solution centered on a paradigm shift from \"adding more tools\" to \"shaping context intelligently\" through compressed schema representations, a novel \"sets\" primitive for handling large query results, and a three-level architecture: shape (blurry overview), detail on demand (targeted inspection), and execution (processing only after verification). This approach enabled the agent to work effectively with hundreds of thousands of documents while maintaining lower costs, better reliability, and user trust."
link: "https://www.youtube.com/watch?v=EEXI_0Jo_bQ"
year: 2026
seo:
  title: "Sanity: Context-First Agent Design for Content Operations at Scale - ZenML LLMOps Database"
  description: "Sanity developed a Content Agent to help users audit, generate, edit, and update content at scale across their content operating system. The team initially struggled with tool proliferation and context management, leading to inconsistent agent behavior. Their solution centered on a paradigm shift from \"adding more tools\" to \"shaping context intelligently\" through compressed schema representations, a novel \"sets\" primitive for handling large query results, and a three-level architecture: shape (blurry overview), detail on demand (targeted inspection), and execution (processing only after verification). This approach enabled the agent to work effectively with hundreds of thousands of documents while maintaining lower costs, better reliability, and user trust."
  canonical: "https://www.zenml.io/llmops-database/context-first-agent-design-for-content-operations-at-scale"
  ogTitle: "Sanity: Context-First Agent Design for Content Operations at Scale - ZenML LLMOps Database"
  ogDescription: "Sanity developed a Content Agent to help users audit, generate, edit, and update content at scale across their content operating system. The team initially struggled with tool proliferation and context management, leading to inconsistent agent behavior. Their solution centered on a paradigm shift from \"adding more tools\" to \"shaping context intelligently\" through compressed schema representations, a novel \"sets\" primitive for handling large query results, and a three-level architecture: shape (blurry overview), detail on demand (targeted inspection), and execution (processing only after verification). This approach enabled the agent to work effectively with hundreds of thousands of documents while maintaining lower costs, better reliability, and user trust."
notion:
  pageId: "373f8dff-2538-80a8-b661-f986c41c6918"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:22:00.000Z"
  lastEditedTime: "2026-06-02T07:22:00.000Z"
  publishedAt: "2026-06-02T07:36:50Z"
---

## Overview

Sanity, a content operating system used by companies like Anthropic, Figma, Linear, and Mastra, developed a production agent system called the Content Agent to help users work with content at massive scale. The system enables users to audit, generate, edit, and update content in bulk across potentially hundreds of content types and tens of thousands of documents. The speaker, Rosti from Oslo, presents this case as a deep exploration of production agent architecture, with a central thesis that context shape matters far more than tool proliferation for agent reliability.

This case study is particularly valuable because Sanity operates in an unusual environment where the underlying system was built in public for nearly a decade, meaning LLMs already have significant exposure to their schemas, documentation, examples, and especially their query language GROQ. This gave them a significant advantage but also revealed architectural lessons that apply more broadly to any production agent system.

## The Context Problem Over the Tool Problem

The fundamental insight driving Sanity's approach is that poor agent performance typically stems not from inadequate tool calling capabilities, but from poorly shaped context. The team initially followed the common pattern of adding more tools to solve agent reliability issues, but found this approach counterproductive. More tools led to less consistency, worse decision-making, and increased likelihood of the agent selecting "nearly the right tool" rather than the correct one. When tools sound similar to each other, the model wastes reasoning capacity on tool selection rather than solving the user's actual problem.

The team's pivot was to stop slicing capabilities into smaller tools and instead make tools broader with clearer boundaries and no overlap, while investing heavily in better instructions. This "do more with less tools" philosophy became central to their architecture. The deeper lesson was about context management: dumping too much raw data into the main context window makes agents slower, more expensive, and worse at their tasks—not because of model limitations, but because they're being forced to look at the wrong information at the wrong resolution.

## The Three-Level Architecture

Sanity developed a three-level architecture that governs how information flows to the agent:

**Level One: Shape** provides a blurry overview with just enough information for orientation. This includes schema summaries, set metadata, counts, ranges, type breakdowns, and relationship hints. The agent doesn't see full detail initially, just the structure and shape of what's available.

**Level Two: Detail on Demand** means fetching exact structure only when needed. The agent can drill into one schema path, inspect one field deeply, read one relevant document, or expand one rich field when necessary. This selective expansion prevents context bloat while ensuring the agent has access to precision when required.

**Level Three: Execution** happens only after the agent is confident about what needs to be done. This is when expensive or risky work occurs: processing entire sets, mutating many documents, running code, or exporting files. By deferring execution until after verification, the system maintains reliability and user trust while controlling costs.

This architecture keeps the main agent simpler, the context cleaner, and the system easier for end users to trust, since they can verify intent before committing to expensive operations.

## Schema Compression and Overview-First Design

One of the most impactful optimizations was how Sanity presents schema information to the agent. Real schemas in production Sanity instances can be massive, with many document types, nested objects, arrays, references, validations, and reusable object types. Dumping the full schema into context provides detail but destroys clarity.

Instead, Sanity compresses schemas by giving the model a schema overview first—not every detail, just the shape. This overview communicates what document types exist, what the important top-level fields are, what each reference type points to, and what types reference back to it. Rather than a huge blob of JSON, the agent receives something closer to a graph or "blurry map" of the content model.

This compression proved particularly valuable for relationship-oriented problems. For example, in Sanity's own studio, there are blog post, author, and person document types. A human familiar with the system knows that authors are used in blog posts, but to a model both might seem plausible. When a user asks "How many blog posts has Sam written?", a weak agent might search in the person document type rather than author, yielding no matches and a wrong answer. With the compressed view showing that blog posts reference author (with 843 incoming references from blog posts) rather than person, the agent can make the correct choice immediately.

When the model needs exact structure, it can zoom in progressively. First it might see that a company has a contacts array—enough to know where interesting structure lives. If that matters, it zooms in further to see the array contains contacts with certain keys. If it needs to go deeper still, it zooms in again to see the person profile and relevant keys attached to that object. This progressive disclosure pattern maintains clarity while providing precision when needed.

## Sets as a Working Primitive

If there's one breakthrough concept from Sanity's architecture, it's the "sets" primitive for working with large content collections. A set is a compressed working memory representation—not the full payload, but a reusable handle to a query result with useful metadata attached. When a set is created, the system captures document count, type breakdown, min and max values for numbers and dates, the underlying query itself, and generates a useful title and description for the set.

This gives the agent a blurry but real view of the result before deciding to go deeper. It can determine how big the result is, what kinds of documents are included, whether the range looks right, and whether to proceed or stop. This was transformative because many real content operations aren't about single documents—they're about finding all documents affected by a rebrand, identifying all documents still using an old API, analyzing large sets of articles for patterns, updating hundreds of documents safely, or creating CSVs for sales or support. These are fundamentally set problems.

Sets provide value in three directions simultaneously. First, they help the agent by preventing the main agent from carrying thousands of documents in its context—it only needs to know the shape of the result and what the next action should be. Second, they help the workflow by becoming a first-class object that the agent works on in subsequent steps: query into the set, inspect the set, process the set, export or mutate from the set. Third, they help the user by being visible in the UI, allowing users to browse documents and verify the agent is working on the correct slice of content before expensive operations proceed.

This makes sets not just a technical primitive but a trust primitive. Before doing expensive work, the agent can inspect the shape of the set. If it looks wrong, the system bails out early. If it looks right, the system can still start small since the set remains representable as a query—it can be paginated, and work can begin on a small subset before scaling up after user confirmation. The system can estimate costs before commitment, leading to a flow of: verify the set, verify the action, then scale up.

Sets support many kinds of work once created: summarization, sampling, processing in chunks, processing every document if needed, CSV generation, bulk changes, and more. For Sanity, a set isn't just a result—it's a reusable working object that enables sophisticated content operations.

## Inference Over Large Sets

Some tasks cannot be expressed as queries. While you can query for types, dates, references, field values, and structural conditions, you cannot query for documents with typos, documents that feel outdated, product descriptions that feel off-brand, or articles using old language. This is where inference comes in, and inference work over large sets can be expensive.

Sanity's approach varies by task: sometimes processing every document, sometimes processing in chunks, sometimes sampling, and sometimes writing code. This leads to an important operational insight: the agent shouldn't always solve analysis with more prompting. Sometimes code is the best tool for the job. If a task is statistical or the user wants a report or CSV, code over prepared data can be much more efficient and reliable than trying to reason over everything inside one giant prompt.

The flow becomes: query the set, understand the shape of the result, decide how to work on it, and only then perform deep analysis, fan out the work, or export. This is substantially leaner than attempting to reason over everything in a single massive prompt.

## Code as Validation and Repair Layer

Across the entire system, one reliability pattern consistently pays dividends: the model proposes, but code enforces. GROQ queries provide an excellent example. Models are fairly familiar with GROQ due to its public exposure, and they're often good at producing a first useful query that maps intent quickly and gets surprisingly close to what's needed. But close isn't sufficient for production systems.

For instance, most flows require ID and type fields to always be present so the system knows exactly what document is being referenced and can link users to the correct location. The model might forget these fields. Instead of hoping the model got everything right, Sanity parses the GROQ query with normal code, validates it, inspects the AST, and adds required fields. Then it serializes and executes the corrected version—all within the same tool. If the query still fails and code can't fix it, a meaningful error message returns to the model so it can self-correct.

The pattern isn't "the model wrote a query, ship it." It's "let the model do the first draft, let code validate and repair what it can, let the model self-correct when needed." This is easy to forget in the AI era where there's pressure to solve everything with prompting, but substantial quality still comes from traditional code. Code is how you make these systems reliable and achieve better behavior than adding ten extra tools or extensive additional instructions could provide.

## Multi-Agent Architecture and Context Loss

Sanity experimented with complex multi-agent systems but found that many systems overuse sub-agents. Multi-agent architectures work great in diagrams and demos and sound advanced, but Sanity kept encountering a painful issue: context loss. After spending significant time building up useful context in the main agent—nuance, decisions, shared working memory from the conversation—the main agent spawns a sub-agent and typically passes only a short instruction. All that accumulated context disappears.

This is especially problematic for content work. After spending time getting the exact tone, structure, and intent right for a new blog post, the sub-agent receives only "write a blog post about this new product" and loses the best part of the work. Today, Sanity's architecture is biased toward one strong main agent with a very small number of strong tools and specialized sub-agents only where the gain is clearly justified.

Mutation provides a good example where sub-agents still help. Mutating Sanity documents is complex because the structure can be deeply nested and is machine-shaped to support live collaboration. For mutation, a specialized sub-agent provides value. But even there, Sanity improved things by constructing a very focused instruction at spawn time, including the relevant schema type, field path to edit, studio context, and document context. The sub-agent starts with the exact local shape it needs. The goal isn't giving all context—it's giving the right context.

From a safety perspective, Sanity uses a primitive called "bundles" that creates versioned documents, allowing large-scale work within bundles that can be merged back into draft or published versions once the user is satisfied. This provides rollback capability and verification before commitment.

## The Power of Better Instructions

One of the least flashy but most important components is instruction quality. Better instructions beat more tools surprisingly often. While this isn't as exciting as announcing a multi-agent system, it cannot be overstated. If instructions are vague, overlapping, or conflicting, tools will feel broken even when technically fine.

Good instructions need to be crisp, concrete, non-overlapping, and behavior-driven. They should make the model feel capable in its domain. There's a real difference between saying "you're an agent that can call these tools" and "you understand content systems, large content sets, schema relationships, and structured analysis." The second framing leads to better planning and better tool use—the model behaves more like it has a real job to do rather than guessing what the framework wants.

The advice is: if you want better tool use, don't only redesign the tools—redesign the mental model you're giving your agent.

## Production Advantages from Building in Public

Sanity benefits from an unusual advantage: nearly a decade of public development. Their documentation, examples, schemas, and code using Sanity are public, and virtually all GROQ queries are public. This means models have had extensive exposure to Sanity and GROQ, providing a significant head start. The team isn't teaching models a completely unknown system from scratch—they're keeping them on course.

This isn't perfect; when writing GROQ, models sometimes forget to include fields, write wrong filters, or hallucinate functions. But overall this public history is a gift that shaped many design decisions. For teams without this advantage, the lesson is that public documentation, examples, and patterns can significantly improve model performance with your systems over time.

## Practical Design Questions

Sanity distills their approach into key questions that should precede tool design:

- What should the agent see first?
- What can stay out of the context?
- What can be summarized into a shape instead of raw data?
- Where do we need exact detail and where don't we?
- Which capabilities should be tools and which should be instructions?

For Sanity, the best ideas weren't about adding more tools. They were: leveraging familiarity from building in public, using GROQ as a strong base primitive, compressed schema understanding, sets as a working primitive, overview-first with detail on demand, fewer broader tools, and one strong main agent.

## User Experience and ROI

The Q&A reveals interesting production considerations. One questioner noted the agent is "the most perfect use for an agent"—users who previously manually edited content now go straight to the agent. This raises ROI questions around model costs versus productivity gains when the agent accomplishes tasks users could already do manually but faster.

Sanity's approach to ROI focuses on visibility and enabling users to model their business in structured code, pushing more content into Sanity. The agent accelerates this process and can be accessed from existing platforms like Slack, Linear, Microsoft Teams, Telegram, or email, expanding the surface area for user interaction with their content systems.

## Technical Considerations for Shape

When asked about the best shape of data to give agents, the response emphasizes tailoring to your specific data while using patterns familiar to models. Sanity writes markdown for model consumption and uses patterns like TypeScript-style brackets to symbolize types, which models pick up quickly. For components with dynamic return shapes that vary by success or error conditions, the key is conforming to consistent patterns to avoid confusing the model—repeat the same patterns across your stack.

## Relationship to Graph Databases

An interesting question emerged about whether Sanity could replace knowledge graphs and graph databases like Neo4j in agent systems. The questioner noted they're building data labeling pipelines to populate knowledge graphs for agent context, but this introduces infrastructure complexity. If Sanity served as the central source for both humans and agents, changes would immediately propagate without requiring new data ingestion flows.

The response acknowledges Sanity is in some ways a graph database given its extensive use of references back and forth. Traditional databases can still be used with references in Sanity, but there's a strong push to move content into Sanity for the benefits it provides, including the ability to run functions on data mutations and model entire businesses. The example of Love Holidays running an entire travel agency from Sanity illustrates the platform's scope. The distinction drawn is that while traditional relational databases may still be needed in some cases, Sanity's reference-based structure provides graph-like relationship modeling sufficient for most content operations.

## Conclusion

This case study represents sophisticated production LLMOps practices focused on context management, intelligent information architecture, and the integration of traditional software engineering practices with LLM capabilities. Rather than pursuing architectural complexity through tool proliferation or elaborate multi-agent systems, Sanity achieved reliability through thoughtful context shaping, progressive disclosure of information, reusable working primitives, code-based validation layers, and high-quality instructions. The result is a production agent system that operates effectively at scale across hundreds of thousands of documents while maintaining cost efficiency, reliability, and user trust.
