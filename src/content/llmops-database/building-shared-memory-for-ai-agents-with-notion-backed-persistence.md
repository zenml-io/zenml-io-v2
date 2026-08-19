---
title: "Building Shared Memory for AI Agents with Notion-Backed Persistence"
slug: "building-shared-memory-for-ai-agents-with-notion-backed-persistence"
draft: false
llmopsTags:
  - "code-generation"
  - "document-processing"
  - "memory"
  - "multi-agent-systems"
  - "agent-based"
  - "rag"
  - "semantic-search"
  - "evals"
  - "open-source"
  - "documentation"
  - "anthropic"
industryTags: "tech"
company: "Notion"
summary: "Notion developed Lore, an open-source system for shared, persistent memory for AI agents, to address the problem of tribal knowledge and experiential learning being lost across agent sessions. The solution uses Notion as a backing store with five interconnected databases (Projects, Topics, Memories, Entities, Facts) that agents access through the Model Context Protocol (MCP), enabling both humans and agents to read and write organizational knowledge. Evaluation results showed 84% success in retrieval tasks using the SkillRet dataset, and a statistically significant performance lift in model-hard evaluations, with memory-enabled agents recovering approximately 46% of failures that no-memory agents couldn't solve, though the team emphasizes that memory quality and maintenance are critical to realizing these benefits."
link: "https://www.notion.com/blog/building-shared-memory-for-ai-agents-in-notion"
year: 2026
seo:
  title: "Notion: Building Shared Memory for AI Agents with Notion-Backed Persistence - ZenML LLMOps Database"
  description: "Notion developed Lore, an open-source system for shared, persistent memory for AI agents, to address the problem of tribal knowledge and experiential learning being lost across agent sessions. The solution uses Notion as a backing store with five interconnected databases (Projects, Topics, Memories, Entities, Facts) that agents access through the Model Context Protocol (MCP), enabling both humans and agents to read and write organizational knowledge. Evaluation results showed 84% success in retrieval tasks using the SkillRet dataset, and a statistically significant performance lift in model-hard evaluations, with memory-enabled agents recovering approximately 46% of failures that no-memory agents couldn't solve, though the team emphasizes that memory quality and maintenance are critical to realizing these benefits."
  canonical: "https://www.zenml.io/llmops-database/building-shared-memory-for-ai-agents-with-notion-backed-persistence"
  ogTitle: "Notion: Building Shared Memory for AI Agents with Notion-Backed Persistence - ZenML LLMOps Database"
  ogDescription: "Notion developed Lore, an open-source system for shared, persistent memory for AI agents, to address the problem of tribal knowledge and experiential learning being lost across agent sessions. The solution uses Notion as a backing store with five interconnected databases (Projects, Topics, Memories, Entities, Facts) that agents access through the Model Context Protocol (MCP), enabling both humans and agents to read and write organizational knowledge. Evaluation results showed 84% success in retrieval tasks using the SkillRet dataset, and a statistically significant performance lift in model-hard evaluations, with memory-enabled agents recovering approximately 46% of failures that no-memory agents couldn't solve, though the team emphasizes that memory quality and maintenance are critical to realizing these benefits."
notion:
  pageId: "3c1f8dff-2538-8010-b551-e9c147f0706a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T09:06:00.000Z"
  lastEditedTime: "2026-08-19T09:06:00.000Z"
  publishedAt: "2026-08-19T09:11:04Z"
---

## Overview

Notion published this case study on August 18, 2026, describing their development of Lore, an open-source shared memory system for AI agents. The problem Notion identified was that as software engineering increasingly relies on AI agents, critical tribal knowledge becomes concentrated not just in individual human minds but within single agent sessions. This experiential learning—distinct from user preferences or information that can be inferred from source code—was being manually extracted and documented in repositories, a process that doesn't scale. Additionally, agents would discover tangential but valuable information during sessions that would be lost if not actively monitored by human operators. Notion realized this was a universal organizational problem and decided to build a solution using their own platform as the backing store.

The solution, called Lore, is an MIT-licensed open-source tool (available at github.com/makenotion/lore) that provides shared, persistent memory for agents backed by Notion. The design philosophy centers on making agent experiences durable concepts stored in Notion and accessible by both humans and agents, effectively creating a multiplayer knowledge system rather than a single-player solution.

## Technical Architecture and Data Model

Lore implements a structured approach to agent memory through a Notion page containing five interconnected databases. This opinionated structuring provides agents with a predictable search interface while maintaining human readability. The five core databases are:

**Projects database** stores the project, person, team, or agent scope, providing organizational context for memory storage and retrieval. **Topics database** captures subject areas within those scopes, enabling categorical organization of knowledge. **Memories database** holds narrative context, notes, procedures, and tasks—this is where experiential knowledge lives. **Entities database** maintains named things that the memory graph can reference, creating structured linkages across the knowledge base. **Facts database** stores structured subject-predicate-object assertions with expiration mechanisms built in.

These databases have relational links across tables to facilitate information surfacing and fuzzy searching. For example, facts can have relations to both topics and memories, creating a knowledge graph that helps agents navigate information more effectively. This structured approach distinguishes Lore from simple file-backed or transcript-based memory systems.

## Access Patterns and Integration

Agents access Lore through the Model Context Protocol (MCP) using various `lore-*` MCP tools. This MCP-compatible design means any agent harness supporting the protocol can integrate with Lore, making it relatively framework-agnostic. Humans access the same information through two channels: directly through Notion's interface (since all data lives as Notion pages), or via a Lore command-line interface (CLI).

The system design emphasizes a hands-off workflow through hooks. In the standard path, agent sessions start with relevant context automatically loaded, are prompted to store or fetch information as needed during their work, and quietly save new information in the background without requiring explicit human intervention. This automation is critical for scaling memory capture across multiple agent sessions and team members.

## Memory Quality and Maintenance

Notion emphasizes strongly that memory systems must avoid becoming "a junk drawer with an API." They identify three failure modes that would negate the value of agent memory: stale information harming otherwise successful agents, irrelevant information being surfaced, and the right information becoming impossible to find.

To address these concerns, Lore implements several quality mechanisms. Facts expire by default, requiring continual reinforcement or they degrade into irrelevance. This is a deliberate design choice to prevent information rot. Addendums to existing information are handled through known relational values including `supersedes`, `scoped`, and `conflicts_with`, making the relationship between new and old information explicit.

The CLI provides tooling for finding orphaned facts, duplicated information, and other forms of memory debt. Notion explicitly states that memory must be periodically maintained, either manually or through use of a specialized agent. Their benchmark results indicated that memory helps primarily when it's available, specific, and retrieved at the right time, but can actively harm agent performance if it's vague, redundant, stale, or irrelevant to the task at hand. This effect was particularly pronounced on smaller models.

## Evaluation Methodology and Results

Notion conducted two types of evaluations to quantify Lore's effectiveness, taking a rigorous approach to avoid the trap where something "feels" like it works while silently causing harm.

### Retrieval Evaluation

For retrieval testing, Notion used the open SkillRet dataset containing 4,997 queries, 6,660 skills, and 8,347 relevance judgments. They imported the skills into a Lore evaluation vault as procedure memories, then gave a Codex agent read-only Lore instructions plus search and expand tools. To pass a test, the agent had to use Lore, surface the expected memory, expand it, select the right SkillRet target, and apply that target in the answer.

From 500 randomly selected queries, they achieved 420 passes and 80 failures, yielding an 84.00% success rate with a 95% Wilson confidence interval of 80.53-86.95%. Lore tool use occurred in 100% of queries. The target memory was surfaced in tool results 91.80% of the time, expanded 91.60% of the time, and selected/applied in the answer 84.00% of the time. Notably, there were zero write attempts (as expected for read-only evaluation), and Recall@10 was 0.4157.

This retrieval evaluation established a ceiling for situations where Lore could potentially assist—if the system cannot surface the right data, memory cannot help, and if it surfaces bad data, the tool could actively hurt performance.

### Model-Hard Evaluation

The second evaluation addressed whether memory actually improves agent work when the right information is available. Notion designed tests using several large open-source repositories pinned at specific SHAs with their histories condensed into single commits. They devised feature requests, bug fixes, and performance improvements that models could not reliably deliver without Lore assistance.

In paired scenarios (149 total), the no-memory baseline passed 82 times while the seeded-lore configuration passed 102 times, showing a net lift of 27 successes offset by 7 harms. The McNemar test yielded p=0.0008, indicating statistical significance. When filtered to only the hardest tasks (those the no-memory agent never succeeded at), the seeded memory agent recovered approximately 45.76% of failures.

Notion carefully notes that memory doesn't "magically fix agents" but rather that available, relevant memory changes outcomes, with effectiveness ultimately stemming from a well-kept and managed vault.

## Real-World Usage Patterns

One of Notion's internal teams piloted Lore for an extended period and built up a large vault. With minimal upkeep, the vault's composition was approximately:

- 55-60% conversations/note memories were experiential and worth keeping
- 15-20% were likely duplicates or near-duplicates  
- 8-12% were information the agent could infer on its own
- 3-5% were session notes
- ~13% had no valuable information whatsoever

Notion did not benchmark against this messier real-world vault but hypothesized that performance would degrade compared to the clean evaluation vaults. However, they argue this actually represents a more interesting problem: optimizing for memory quality on a system with demonstrated potential to improve agent performance is more valuable than the original problem of having no shared memory at all.

## LLMOps Considerations and Tradeoffs

From an LLMOps perspective, this case study illustrates several important production considerations for agent systems. First, the choice of Notion as a backing store represents an interesting tradeoff. While it provides built-in version control, version history, familiarity for teams already using Notion, and a human-friendly interface, it also creates a dependency on Notion's infrastructure and API availability. The team-focused, multiplayer design aligns well with organizational knowledge management needs but requires thoughtful access control and governance.

The MCP integration approach provides framework flexibility but also means the system's effectiveness depends on proper MCP implementation across different agent harnesses. The hooks-based automation reduces friction for knowledge capture but requires careful prompt engineering and tool use patterns to ensure agents actually utilize memory appropriately without over-relying on potentially stale information.

The expiration mechanism for facts addresses information staleness but introduces maintenance overhead. Organizations adopting Lore would need to establish processes for memory hygiene, whether through dedicated agents, periodic human review, or some combination. The CLI tooling for finding orphaned facts and duplicates helps, but ultimately someone or something needs to execute that maintenance work.

The evaluation results, while promising, come with important caveats. The 84% retrieval success rate means roughly one in six queries fails to properly retrieve relevant information. The model-hard evaluation showed net positive lift but also some harm (7 cases where memory made performance worse), highlighting that memory quality truly matters and that simply having more information doesn't guarantee better outcomes.

## Practical Implementation Guidance

For teams considering adopting Lore, Notion provides straightforward integration instructions: add it as a development dependency, create a Notion Personal Access Token, point a `.lore.yaml` configuration file at a vault page, and wire it into the assistant. The MIT license removes licensing barriers for commercial use or modification.

However, the case study makes clear that successful implementation requires more than technical integration. Organizations need to think carefully about vault organization, memory maintenance processes, what types of information should be captured, and how to prevent the system from degrading into a "junk drawer with an API." The finding that 13% of memories in the pilot vault had no valuable information whatsoever suggests that garbage-in-garbage-out remains a real concern.

The team's emphasis on experiential knowledge, follow-up tasks, decision records, and procedures as the four key memory types provides a useful framework for thinking about what should be captured. These represent information that either cannot be easily inferred, would be lost without explicit capture, or provides valuable shortcuts for future work.

## Open Questions and Future Directions

While the case study demonstrates statistical significance in controlled evaluations, several questions remain about real-world production use. How does performance scale as vaults grow to thousands or tens of thousands of memories? What are the latency implications of retrieval operations during agent execution? How do teams balance comprehensiveness versus selectivity in what gets stored? How often does memory maintenance need to occur to maintain the quality levels seen in evaluation?

The case study also raises interesting questions about multi-team and cross-organizational learning. Notion expresses interest in agents learning from other people's agents across organizational boundaries, but this introduces complex questions about knowledge ownership, privacy, competitive information, and relevance across different contexts.

The project being described as a "20% project" and "pointed exploration" into an "off-label use of Notion" suggests this may be more experimental than production-hardened, though Notion's willingness to open-source it and the reasonably rigorous evaluation methodology indicate serious engineering effort. The invitation for community contributions ("If you build on Lore, fork it, or take it somewhere we did not expect, we want to see it") positions this as the beginning of exploration rather than a finished product.

## Critical Assessment

Taking a balanced view, Lore represents a thoughtful approach to a real problem in agent-based systems: the ephemeral nature of agent knowledge and the difficulty of accumulating organizational learning across sessions. The use of Notion as a backing store is clever product synergy but also means this solution primarily targets organizations already using Notion or willing to adopt it for this purpose.

The evaluation methodology is more rigorous than many vendor blog posts, with statistical testing, explicit confidence intervals, and acknowledgment of failure modes. However, the gap between the clean SkillRet evaluation and the messier real-world pilot vault (where 35-40% of memories were duplicates, inferrable, or valueless) raises questions about how well the promising benchmark results transfer to production use.

The fundamental insight—that relevant, high-quality memory improves agent performance on tasks near the edge of model capability—seems sound and aligns with broader research on retrieval-augmented generation and context utilization. However, the operational overhead of maintaining memory quality may be substantial, and organizations considering this approach should budget for that maintenance work rather than expecting a fully automated solution.

Overall, this represents a solid LLMOps case study of building production infrastructure for agent systems, with honest discussion of both capabilities and limitations, though real-world production metrics over extended time periods would strengthen confidence in the approach.
