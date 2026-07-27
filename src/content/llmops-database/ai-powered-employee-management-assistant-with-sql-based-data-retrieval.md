---
title: "AI-Powered Employee Management Assistant with SQL-Based Data Retrieval"
slug: "ai-powered-employee-management-assistant-with-sql-based-data-retrieval"
draft: false
llmopsTags:
  - "customer-support"
  - "question-answering"
  - "data-analysis"
  - "prompt-engineering"
  - "agent-based"
  - "few-shot"
  - "error-handling"
  - "evals"
  - "langchain"
  - "postgresql"
  - "cache"
  - "anthropic"
industryTags: "hr"
company: "Rippling"
summary: "Rippling, a comprehensive HR and workforce management platform, built an AI assistant to help HR leaders and employees query complex employee data across payroll, benefits, devices, and access controls. The problem they addressed was that HR professionals needed to answer questions quickly but data was scattered across multiple systems and spreadsheets, making retrieval tedious and time-consuming. Their solution leveraged their existing \"employee graph\" data architecture, building a flat agent system using LangGraph with generic composable tools and SQL-based data retrieval instead of numerous specialized tools. The launch was described as one of Rippling's most successful, with the system handling individual employee queries and complex aggregated reports while maintaining accuracy through SQL execution rather than direct LLM data interpretation."
link: "https://www.youtube.com/watch?v=3lb_4OEOykc"
year: 2026
seo:
  title: "Rippling: AI-Powered Employee Management Assistant with SQL-Based Data Retrieval - ZenML LLMOps Database"
  description: "Rippling, a comprehensive HR and workforce management platform, built an AI assistant to help HR leaders and employees query complex employee data across payroll, benefits, devices, and access controls. The problem they addressed was that HR professionals needed to answer questions quickly but data was scattered across multiple systems and spreadsheets, making retrieval tedious and time-consuming. Their solution leveraged their existing \"employee graph\" data architecture, building a flat agent system using LangGraph with generic composable tools and SQL-based data retrieval instead of numerous specialized tools. The launch was described as one of Rippling's most successful, with the system handling individual employee queries and complex aggregated reports while maintaining accuracy through SQL execution rather than direct LLM data interpretation."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-employee-management-assistant-with-sql-based-data-retrieval"
  ogTitle: "Rippling: AI-Powered Employee Management Assistant with SQL-Based Data Retrieval - ZenML LLMOps Database"
  ogDescription: "Rippling, a comprehensive HR and workforce management platform, built an AI assistant to help HR leaders and employees query complex employee data across payroll, benefits, devices, and access controls. The problem they addressed was that HR professionals needed to answer questions quickly but data was scattered across multiple systems and spreadsheets, making retrieval tedious and time-consuming. Their solution leveraged their existing \"employee graph\" data architecture, building a flat agent system using LangGraph with generic composable tools and SQL-based data retrieval instead of numerous specialized tools. The launch was described as one of Rippling's most successful, with the system handling individual employee queries and complex aggregated reports while maintaining accuracy through SQL execution rather than direct LLM data interpretation."
notion:
  pageId: "3aaf8dff-2538-8003-824d-c91196adb982"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T12:07:00.000Z"
  lastEditedTime: "2026-07-27T12:07:00.000Z"
  publishedAt: "2026-07-27T12:12:36Z"
---

## Overview and Business Context

Rippling built an AI assistant called Rippling AI to solve a fundamental problem in workforce management: HR leaders and employees need quick, accurate answers to questions about payroll, benefits, devices, access controls, and other employee-related data, but this information is typically scattered across multiple systems and spreadsheets. The company's engineers describe a scenario where an HR leader on Monday morning faces a deluge of requests ranging from CEO spend reports to employee payroll discrepancy questions. While the answers exist somewhere in their systems, retrieving them quickly and accurately is tedious work.

Rippling's advantage in building this AI assistant stems from their foundational architecture decision made from day one: organizing their entire platform around what they call the "employee graph." Instead of having multiple disconnected systems, they placed employee data at the center and built all products around it. This means when anything changes about an employee, it's reflected everywhere automatically. This pre-existing data organization made it natural to add an AI layer on top, creating what the team describes as a "magic" experience. The launch occurred a few weeks before this presentation was given, and the team notes it was one of their most successful launches in the company's history, with one presenter having been with Rippling for six and a half years.

## Initial Architecture and Evolution

The initial architecture centers around LangGraph as the agent orchestration framework. The system has the Rippling Backend API at its foundation, which encompasses the employee graph, all applications, and associated data. On top of this sits the agent layer with several key components. At the top level is what they call a "top agent" that handles overall orchestration. The system includes three main functional blocks: entity resolution, tool selection with domain context, and generic tools for execution.

Entity resolution is critical because users might ask about employees using just first names, which must be resolved to specific employee records with unique employee IDs in the system. Tool selection works in conjunction with domain context injection, pulling in what Rippling calls "skills and SOP" (standard operating procedures). Once the agent has the resolved entity, appropriate tools, and domain context, it uses generic tools to connect to the employee graph, retrieve data, provide answers, and operate workflows.

However, this wasn't the original design. Given that Rippling is a several-hundred-member engineering company with vastly different products, they initially started with a hierarchical agent architecture. They had one top-level AI assistant agent with numerous sub-agents underneath, allowing each team to build their own specialized sub-agent for their domain. This approach failed in practice due to fundamental problems around context sharing, handoff management between agents, unclear boundaries about whether the top agent should fully understand sub-agent context, interrupt handling, and most problematically, queries that spanned multiple sub-agents. The complexity became unmanageable.

The solution was radical simplification: they eliminated the entire hierarchical structure and moved to a completely flat agent architecture. Today, Rippling uses one flat agent, and all domain context from different products is injected solely through declarative skills and SOPs that product team engineers write and test. This architectural change meant removing significant amounts of abstraction and code. A key insight they gained was that flattening the architecture such that the message history the user sees is exactly what the LLM sees dramatically improved performance. This alignment between user-visible state and LLM state simplified reasoning and debugging.

## Tool Design Philosophy: From Proliferation to Generic Composability

Rippling's journey with tool design illustrates a critical learning in LLMOps: more tools aren't always better. Initially, each team built numerous specialized tools, resulting in a very large tool catalog. This abundance created severe problems with tool selection sensitivity. If the system selected the wrong tools or missed relevant tools during selection, it would fail to generate correct answers. The brittleness of tool selection became a major limiting factor.

Their solution was counterintuitive: move toward fewer, more generic tools. Rather than having multiple specialized get-data methods for different domains, they created one generic get-data method where the entity type becomes a parameter. For example, instead of separate tools for getting employee data, device data, and tax data, a single tool takes "employee," "device," or "taxes" as parameters. The team explicitly invokes the Unix philosophy here: do simple things well, and let the agent compose these atomic operations to achieve complex outcomes.

This design philosophy has profound implications. The Rippling AI Assistant can perform numerous operations including running payroll and hiring employees, but the primary use case is question-answering and data retrieval. Users range from individual employees asking about their own payroll or benefits data to company admins and HR professionals requesting aggregated reports across the organization. The critical constraint is that this data cannot be wrong—accuracy is non-negotiable.

## SQL as a Powerful Abstraction Layer

One of Rippling's most innovative LLMOps decisions was using SQL as the primary data access mechanism rather than stuffing raw data into the LLM context. Their reasoning is instructive: simply providing raw data along with a query and asking the LLM to answer directly can lead to hallucinations, which they cannot afford.

Instead, their approach involves providing the LLM with the schema of the data along with the query, and asking it to generate SQL to solve the problem. The SQL is then executed against the actual data, and results are returned. Crucially, the raw data itself never enters the context window—only the schema does. The LLM reasons about the shape of the data rather than the data itself, producing executable SQL that retrieves the correct answer.

This approach yielded an unexpected powerful side effect: SQL proved far more powerful than building numerous bespoke tools. The team provides a compelling example: consider the query "why weren't the benefits deductions withheld for a given employee?" This seemingly simple question actually requires orchestrating information across multiple domains—employee information including location and entitlements from HRIS, benefits data, and payroll data. With multiple specialized tools, you'd need to orchestrate calls across all these systems and compose the results. With their SQL approach, one generic tool can pull all relevant data, and the LLM writes SQL that joins and filters across domains in a single query.

This capability dramatically reduced the number of tools needed, which in turn eliminated tool selection risks. LLMs have proven remarkably capable at writing SQL, and by exposing schemas in context, they can generate appropriate SQL queries in one shot to retrieve exactly the information they need. This is a case where leveraging the LLM's existing capabilities (SQL generation) proved more powerful than building domain-specific abstractions.

## Data Caching and Iterative Exploration

While the SQL approach is powerful, it still faces practical challenges: fetching data by querying the core data lake is expensive both in terms of cost and latency. Rippling's solution is to implement intelligent caching. Once data is fetched, it's placed in a cache. Then the LLM receives the schema, the cached data, and the query, and can explore the data iteratively to produce the answer.

This pattern should be familiar to users of agentic systems like Claude Code or similar tools. The agent writes a query, examines results, identifies issues, refines the query, and iterates until arriving at the final answer. This iterative exploration is particularly powerful for follow-up questions where the user wants to examine the same underlying data from different angles or test different hypotheses. Rather than re-fetching expensive data for each follow-up, the cached data enables rapid iteration. The team reports this caching strategy made the user experience "much, much better."

## Eval-Driven Development as Core Methodology

Rippling's philosophy around evaluation represents mature LLMOps thinking. They practice what they call "eval-driven development" or EDD, explicitly comparing it to test-driven development but acknowledging it's harder. Their mantra is "evals first, build next," though they clarify this doesn't mean writing evals before you have any agent running. Rather, once you have an agent running in production or some version of it, any meaningful change—whether to system prompts, tools, tool descriptions, skills, or anything else—requires evaluation because you cannot predict LLM behavior from code inspection alone.

The team emphasizes that while intuition has value, evals ultimately tell the truth. You can reason about what should happen, but only running evals reveals what actually happens. This is necessary because of the inherent stochasticity of LLMs. If you run an eval once and it passes, that doesn't mean the success rate is 100%. If you run it three times and all pass, is it really 100%? The answer is no—you need statistical rigor.

Rippling employs scientific methods to determine confidence levels. They reference Wilson's confidence interval as one approach. If one out of one eval passes, at a 95% confidence interval, your lower bound could be as low as 20%. With three out of three passes, your lower bound might still only be 44%. As you increase repetitions, the confidence interval converges toward the true pass rate. The fundamental insight is that repetitions reduce uncertainty in your evals.

The number of repetitions needed depends on three factors. First, your baseline: if your eval already performs at 95%, the repetition requirements differ vastly from a 75% baseline. Second, the size of regression you're trying to detect: catching a drop from 95% to 94% requires far more repetitions than detecting a drop from 95% to 70%. Third, your tolerance for false positives: how willing are you to flag a change as regressive when it actually isn't?

These considerations lead to what the team calls the "tradeoff triangle" with three vertices: cost, uncertainty, and lag. Cost refers to money spent on LLM calls as repetitions increase. Uncertainty decreases with more repetitions—you become more confident in results. Lag measures how quickly you can detect a regression after making a change. The fundamental constraint is that you can only optimize for two of these three dimensions simultaneously.

Rippling's practical approach implements two evaluation tiers. "Smoke evals" are a small set of evaluations run with fewer repetitions on every commit. This provides some confidence that nothing is majorly broken, though issues could still exist. These fall into the low-cost, low-lag category but accept higher uncertainty. Before anything reaches production, they run "health evals" in a pre-production stage twice daily. Health evals include many more tests run for many more repetitions, but they wait for a batch of commits rather than running on each one individually. This accepts higher lag but reduces both uncertainty and cost by batching. Only after health evals pass does code move to production.

## Production Operations and Data Handling

Operating LLM systems in production requires custom tooling regardless of how generic your agent architecture is. Every domain and agent has unique characteristics, and you need visibility into your data to understand system behavior. Rippling emphasizes the necessity of building custom tooling to explore data and diagnose issues.

They also carefully handle PII and sensitive production data. All production data lives in what they call a "vault workspace." They don't work directly with customer data for development and testing. Instead, they carefully synthesize representative test data based on real customer data patterns, creating synthetic datasets that maintain the characteristics of production workloads without exposing sensitive information. This synthetic test environment allows them to improve their eval suite over time based on learnings from production without compromising data privacy.

## Key Principles and Forward-Looking Perspective

The team concludes with three core principles. First, keep your agents flat. They acknowledge this guidance will evolve as models improve. What worked last year differs from last month, which differs from today, which will differ from six months in the future. As models become more powerful, the critical principle is to remove glue code from agents and let the LLM do its job—get out of its way.

Second, build generic, composable tools. If you have data that can be queried via SQL, let the model do that rather than building specialized tools. LLMs are powerful at SQL generation. When you break functionality down to fundamental atomic pieces, LLMs can accomplish far more through composition than through pre-built complex tools.

Third, evals first. Always ensure you practice eval-driven development and test each change. No matter how good your intuition, evals tell the truth. And you must choose two of three dimensions from the cost-uncertainty-lag triangle. You cannot optimize all three simultaneously, so make conscious choices about which tradeoffs matter most for your use case.

## Critical Assessment

While the presentation showcases impressive engineering, it's worth noting several aspects require balanced consideration. The success of Rippling's approach depends heavily on their pre-existing employee graph architecture. Organizations without such clean, centralized data models would face substantially more complexity implementing similar approaches. The flat agent architecture works well for their use case but may not generalize to all domains—hierarchical agents might still be appropriate for more loosely coupled domains.

The SQL approach is powerful but assumes structured, relational data. Unstructured data use cases would require different approaches. The team also doesn't detail failure modes in production, how they handle SQL injection risks from LLM-generated queries, or what percentage of queries successfully resolve without human intervention. The characterization of the launch as "one of the most successful" is presented without supporting metrics around adoption, accuracy, or user satisfaction.

The eval-driven development methodology is sound but resource-intensive. Smaller organizations might struggle with the infrastructure and cost required to run extensive repeated evaluations. The presentation also doesn't address how they handle edge cases, rare queries, or adversarial inputs. Overall, however, the case study demonstrates sophisticated LLMOps practices including architectural simplification, principled tool design, rigorous evaluation methodology, and careful production operations that provide valuable lessons for the field.
