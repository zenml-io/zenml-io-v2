---
title: "AI Data Analyst with Multi-Stage LLM Architecture for Enterprise Data Discovery"
slug: "ai-data-analyst-with-multi-stage-llm-architecture-for-enterprise-data-discovery"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ad90458519648e4ae4554"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:20.377Z"
  createdOn: "2025-12-23T18:01:40.523Z"
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "chatbot"
  - "classification"
  - "unstructured-data"
  - "structured-output"
  - "rag"
  - "prompt-engineering"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "few-shot"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "chunking"
  - "system-prompts"
  - "langchain"
  - "databases"
  - "documentation"
  - "postgresql"
  - "sqlite"
  - "redis"
  - "chromadb"
  - "pinecone"
industryTags: "e-commerce"
company: "Delivery Hero"
summary: "The BADA team at Woowa Brothers (part of Delivery Hero) developed QueryAnswerBird (QAB), an LLM-based agentic system to improve employee data literacy across the organization. The problem addressed was that employees with varying levels of data expertise struggled to discover, understand, and utilize the company's vast internal data resources, including structured tables and unstructured log data. The solution involved building a multi-layered architecture with question understanding (Router Supervisor) and information acquisition stages, implementing various features including query/table explanation, syntax verification, table/column guidance, and log data utilization. Through two rounds of beta testing with data analysts, engineers, and product managers, the team iteratively refined the system to handle diverse question types beyond simple Text-to-SQL, ultimately creating a comprehensive data discovery platform that integrates with existing tools like Data Catalog and Log Checker to provide contextualized answers and improve organizational productivity."
link: "https://tech.deliveryhero.com/blog/introducing-the-ai-data-analyst-queryanswerbird-part-2-data-discovery/"
year: 2024
seo:
  title: "Delivery Hero: AI Data Analyst with Multi-Stage LLM Architecture for Enterprise Data Discovery - ZenML LLMOps Database"
  description: "The BADA team at Woowa Brothers (part of Delivery Hero) developed QueryAnswerBird (QAB), an LLM-based agentic system to improve employee data literacy across the organization. The problem addressed was that employees with varying levels of data expertise struggled to discover, understand, and utilize the company's vast internal data resources, including structured tables and unstructured log data. The solution involved building a multi-layered architecture with question understanding (Router Supervisor) and information acquisition stages, implementing various features including query/table explanation, syntax verification, table/column guidance, and log data utilization. Through two rounds of beta testing with data analysts, engineers, and product managers, the team iteratively refined the system to handle diverse question types beyond simple Text-to-SQL, ultimately creating a comprehensive data discovery platform that integrates with existing tools like Data Catalog and Log Checker to provide contextualized answers and improve organizational productivity."
  canonical: "https://www.zenml.io/llmops-database/ai-data-analyst-with-multi-stage-llm-architecture-for-enterprise-data-discovery"
  ogTitle: "Delivery Hero: AI Data Analyst with Multi-Stage LLM Architecture for Enterprise Data Discovery - ZenML LLMOps Database"
  ogDescription: "The BADA team at Woowa Brothers (part of Delivery Hero) developed QueryAnswerBird (QAB), an LLM-based agentic system to improve employee data literacy across the organization. The problem addressed was that employees with varying levels of data expertise struggled to discover, understand, and utilize the company's vast internal data resources, including structured tables and unstructured log data. The solution involved building a multi-layered architecture with question understanding (Router Supervisor) and information acquisition stages, implementing various features including query/table explanation, syntax verification, table/column guidance, and log data utilization. Through two rounds of beta testing with data analysts, engineers, and product managers, the team iteratively refined the system to handle diverse question types beyond simple Text-to-SQL, ultimately creating a comprehensive data discovery platform that integrates with existing tools like Data Catalog and Log Checker to provide contextualized answers and improve organizational productivity."
---

## Overview

QueryAnswerBird (QAB) represents a sophisticated production LLM system developed by the BADA (Baemin Advanced Data Analytics) team at Woowa Brothers, a Delivery Hero subsidiary. This case study, documented in Part 2 of their series, focuses specifically on the Data Discovery capabilities that extend beyond the Text-to-SQL features covered in Part 1. The system addresses a critical challenge in modern data-driven organizations: enabling employees with diverse technical backgrounds to effectively discover, understand, and utilize complex internal data assets.

The development journey is particularly noteworthy for its emphasis on user-driven iteration. The team conducted two rounds of beta testing—first with data analysts and engineers, then with product managers—to identify gaps between their initial Text-to-SQL implementation and real-world needs. This iterative approach revealed that users required not just query generation but comprehensive data discovery capabilities including query explanation, table exploration, and log data navigation. The case study provides valuable insights into how production LLM systems evolve based on actual usage patterns rather than assumed requirements.

## System Architecture and Design Philosophy

The Data Discovery feature employs a layered architecture built around two primary stages: question understanding and information acquisition. This separation of concerns is architecturally sound from an LLMOps perspective, as it allows for independent optimization of each component while minimizing hallucination risks through staged processing. The question understanding stage filters and routes queries appropriately before expensive information retrieval operations occur, improving both efficiency and accuracy.

The Router Supervisor chain represents the core of the question understanding stage, inspired by the Agent Supervisor concept from LangGraph. This design pattern addresses a fundamental challenge in production LLM systems: handling diverse query types with varying levels of specificity and quality. Rather than attempting to process all questions through a single chain—which would be prone to errors and difficult to maintain—the Router Supervisor intelligently classifies questions and routes them to appropriate processing chains.

The team implemented a scoring system to evaluate question quality across multiple dimensions, including data relevance and specificity of problem-solving clues. Questions are augmented with internal terminology from a vector store during this evaluation process, converting abstract or specialized questions into more interpretable forms. This preprocessing step is critical for production systems dealing with domain-specific terminology, as it bridges the gap between how users naturally phrase questions and how the system can most effectively process them. Questions failing to meet quality thresholds receive automated prompts for refinement with examples, creating a guided experience that improves over time as users learn to formulate better queries.

## Conversation Management Strategies

The system implements three distinct conversation patterns, each optimized for different use cases. Single-turn conversations provide fast, context-independent responses suitable for the question understanding stage where speed is critical. The team found that over 10 percent of questions were unrelated to data entirely—a significant finding that justified implementing automatic classification to filter out weather inquiries, greetings, and other general conversations before they reach expensive Text-to-SQL processing. This classification, previously handled by machine learning models, is now performed through LLM-based prompt engineering, demonstrating how modern LLMs can simplify previously complex classification tasks.

Guided single-turn conversations represent an interesting hybrid approach. When questions are too vague, QAB provides guidance for question formulation rather than attempting to answer directly. This creates an experience similar to multi-turn interaction without maintaining conversational state, reducing complexity while still providing responsive user guidance. The team's decision to delay full multi-turn implementation until thorough testing can address hallucination risks demonstrates a measured approach to production deployment—prioritizing reliability over feature completeness.

Multi-turn conversations, still under development at the time of documentation, represent the team's vision for more sophisticated interactions that maintain context across exchanges. The acknowledged risk of hallucination when connecting various functions highlights a key LLMOps challenge: feature integration complexity grows non-linearly as capabilities are combined. The team's cautious approach to this capability, requiring extensive testing before production deployment, reflects mature production thinking.

## User Experience and Onboarding

The team developed an intuitive tutorial-style guide provided to users upon Slack registration, addressing the common problem of users not reading documentation before asking questions. This proactive onboarding includes examples of available features with representative questions and sample answers for each. The integration with Slack—a platform already embedded in workplace workflows—reduces adoption friction compared to requiring users to learn a new interface. This decision reflects sound product thinking: meeting users where they already work rather than requiring behavioral change.

The user guide evolution from static documentation to interactive tutorial demonstrates learning from actual usage patterns. When beta testing revealed that users frequently asked questions without reading guides, the team adapted their approach rather than simply blaming users for not following instructions. This user-centered design philosophy is essential for successful production LLM deployments, where system success depends on actual adoption rather than theoretical capability.

## Information Acquisition: Query and Table Explanation

The information acquisition stage implements four composite functions spanning seven detailed capabilities. The Query and Table Explanation function addresses a practical problem: as services become more sophisticated, queries grow increasingly complex and difficult to understand at a glance. This creates challenges for employees unfamiliar with queries, for knowledge transfer during personnel transitions, and for understanding legacy analytical work. The function provides information about key business conditions, essential columns, extracted data meaning, and utilization guidance.

The implementation uses SQLGlot, a Python library for SQL parsing, combined with regular expressions to extract table names from queries. Retrieved table information comes from a DDL (Data Definition Language) vector store. The system includes graceful degradation: when queries reference user-created tables or privacy-restricted tables not in the vector store, responses include disclaimers about potential inaccuracy. This transparency about system limitations is good production practice, managing user expectations appropriately.

A critical optimization technique employed is DDL reduction logic. Rather than including complete table definitions in prompts, the system extracts only columns referenced in queries along with essential metadata like keys and partition information. This addresses two production LLM challenges: first, longer prompts increase hallucination likelihood; second, tables with many columns can exceed token limits. The reduced DDL approach balances information completeness with practical constraints. The prompting strategy uses Plan and Solve Prompting, developed to overcome limitations of chain-of-thought methodology, for query and table interpretation.

The provision of Data Catalog links at the end of responses demonstrates effective integration between AI and traditional tools. Rather than attempting to replace existing systems, QAB acts as an intelligent entry point that connects users to authoritative sources for deeper exploration. This hybrid approach leverages LLM strengths for natural language understanding and summarization while deferring to specialized systems for comprehensive data management.

## Query Syntax Verification and Data Technical Support

The Query Syntax Verification function implements a two-stage pipeline that separates concerns for better performance and reduced hallucination. The first stage focuses exclusively on column name correction: extracting column and table names from queries, checking against DDL, and correcting errors. The corrected query then undergoes DDL shortening based on the adjusted column usage. The second stage handles syntax verification and optimization, checking for errors in syntax and column values while suggesting optimization strategies.

This staged approach exemplifies good LLMOps practice: assigning specific, bounded tasks to LLM calls rather than expecting a single prompt to handle multiple complex operations. Each stage processes less information with more focused objectives, reducing cognitive load on the model and improving reliability. The team explicitly notes this design reduces hallucination possibility while enhancing performance—a clear articulation of architectural rationale often missing from case studies.

The acknowledged limitations are instructive. The function does not propose modifications to business logic because meta-information about business significance is currently built using few-shot SQL examples, making it difficult to retrieve detailed business logic information from the vector store. Additionally, users typically don't specify which logic they want modified, creating ambiguity the LLM struggles to resolve. The planned remediation—storing business logic meta-information in the vector store and improving user guidance for more specific questions—demonstrates how production systems evolve through documented limitations and planned enhancements.

The Data Technical Support function provides assistance with query functions and data science or database expertise when no query is present in user questions. This catch-all capability ensures the system remains helpful even for questions outside the primary query verification use case, improving overall utility.

## Table and Column Utilization Guidance

The Table and Column Utilization Guidance function assists users in finding tables and columns containing specific information. This differentiates from traditional keyword search by providing summarized comprehensive information rather than raw search results. Users asking "Show me the table that contains information about the Baemin Club membership subscription" receive relevant table names, key columns, usage examples, and Data Catalog links.

Implementation relies on LLM-enhanced table metadata generated through a process detailed in Part 1. Enhanced metadata includes table purpose, characteristics, and main keywords, proving useful for question-based table search. However, the team candidly acknowledges hallucination issues during metadata generation for numerous tables, resulting in incorrect information for some entries. The planned remediation involves refining metadata generation prompts and introducing correction logic—an honest assessment of a common challenge in using LLMs for data augmentation tasks.

The question refinement chain utilizes a business term dictionary and topic modeling to better understand user questions. The business term dictionary allows the LLM to expand questions based on service structure and terminology. Topic modeling performed on DDL words identifies topics and keywords input into refinement prompts, enabling the LLM to identify keywords most relevant to user questions. This enrichment supports table searches with a richer keyword set than users might naturally provide.

The hybrid retrieval chain combining table metadata and DDL-based retrievers represents sophisticated information retrieval architecture. The three-stage search process progressively narrows from numerous tables to one or two candidates before providing detailed information. This funnel approach balances recall (finding all potentially relevant tables) with precision (surfacing only the most relevant), while managing computational costs through progressive filtering.

## Log Data Utilization Guidance

The Log Data Utilization Guidance function represents perhaps the most innovative aspect of the Data Discovery implementation, addressing the challenge of navigating vast, semi-structured log data from the Log Checker system. Unlike structured table data with DDL documentation, logs present unique discovery challenges. The function helps users unfamiliar with log data, those working in unfamiliar domains, or developers creating new logs to quickly locate and understand necessary log information.

The preprocessing approach is particularly noteworthy. Log Checker data includes Screen Name (page), Group (sub-area), Event (triggered event), and Type (log type) but lacks detailed descriptions comparable to DDL column comments. The team created log descriptions based on unique combinations of these fields, but first had to solve several problems. English terms in the Log Checker needed Korean translation for understanding Korean user questions. The team built a Log Terminology Dictionary by separating log names into detailed words and translating each.

Domain-specific terminology required special handling through a Log Terminology Correction Dictionary. The example provided—distinguishing between "Shop" (가게) and "Store" (Baemin Store) as distinct concepts within Woowa Brothers context—illustrates how enterprise LLM systems must handle organizational vocabulary that differs from general language usage. This kind of terminology management is rarely discussed in academic LLM research but proves critical for production deployments.

Abbreviation handling presented another challenge: connecting "ShopDet" to "Shop Detail" required linking words from the Log Terminology Dictionary to unique combination values based on similarity. This preprocessing creates log descriptions used as mapping data for user questions. The system updates weekly for newly registered logs, demonstrating ongoing maintenance requirements for production LLM systems tied to evolving data sources.

The implementation consists of two main chains. The log term chain connects user questions with specialized log system terminology by calculating similarity between questions and the Log Terminology Dictionary, selecting highly similar terms, then using the LLM to choose final terms most relevant to the question. The log retrieval chain filters logs based on selected terms, searching the vector store and using the LLM to select most relevant logs. To reduce hallucination, the LLM outputs only unique key values differentiating logs, which are then used to retrieve final logs from the vector store. This indirection—having the LLM identify keys rather than generate content directly—is a clever technique for maintaining accuracy while leveraging LLM reasoning capabilities.

The team explicitly notes this LLM-based search method is more flexible and easier to implement than traditional algorithm-based searches. Rather than developing complex search logic, they leverage natural language understanding to identify user intent and find relevant logs. This observation highlights a key value proposition of LLM-based systems: replacing brittle rule-based logic with more adaptable learned representations. However, it's worth noting that this flexibility comes with the tradeoff of less deterministic behavior and the need for careful prompt engineering and testing.

## Production Considerations and Limitations

Throughout the case study, the team demonstrates awareness of production LLM challenges. Token limits are explicitly considered in DDL reduction logic. Hallucination risks are acknowledged for metadata generation, multi-turn conversations, and query explanation of non-standard tables. Response speed is identified as crucial for the question understanding stage, justifying the use of faster single-turn interactions. The disclaimer system for queries involving unknown tables shows attention to managing user expectations when system knowledge is incomplete.

The documented limitations section for Query Syntax Verification is particularly valuable, as it explicitly states what the system does not do (business logic modification) and explains why (insufficient meta-information about business logic significance, ambiguous user questions). The planned improvements (storing business logic meta-information, improving user guidance) show how production teams track known gaps and plan incremental enhancements.

The beta testing approach—first with technical users (data analysts and engineers), then with less technical users (product managers)—reflects sound rollout strategy. Starting with forgiving, technically sophisticated users allows teams to address fundamental issues before expanding to broader audiences with higher expectations for polish and reliability. The finding that question types differed significantly between these groups (PMs asking about query interpretation, table explanations, and exploration versus analysts focusing on query generation accuracy) validates the staged rollout approach and informed the Data Discovery feature roadmap.

## Integration and Ecosystem Approach

QAB demonstrates thoughtful integration with existing enterprise data tools rather than attempting to replace them. The system works alongside the Data Catalog (containing detailed table and column information) and Log Checker (managing user behavior and event data), providing intelligent natural language interfaces to these systems while directing users to them for comprehensive information. Response formats consistently include links to Data Catalog entries, enabling seamless transition from AI-assisted discovery to traditional data exploration tools.

This ecosystem approach reflects mature thinking about LLM deployment. Rather than positioning QAB as a complete replacement for existing tools, it serves as an intelligent layer that makes those tools more accessible. Users unfamiliar with data structures can ask natural language questions to orient themselves, then follow provided links to authoritative systems for detailed work. This division of labor plays to the strengths of each component: LLMs for natural language understanding and summarization, specialized data systems for comprehensive metadata management and governance.

The Slack integration is similarly pragmatic. By embedding the system in a communication platform employees already use daily, adoption friction is minimized. Users don't need to learn a new interface or remember to check another application; QAB becomes available wherever they're already working. This integration strategy is often underestimated in LLM deployments, where impressive technical capabilities can fail to gain adoption due to poor integration with existing workflows.

## Future Roadmap and Vision

The team outlines an ambitious future vision centered on a "Knowledge Generation" stage that goes beyond data discovery to explore, visualize, and propose actionable business strategies. This progression from reactive query answering to proactive insight generation represents a natural evolution for enterprise LLM systems. However, the team correctly identifies that this requires performance improvements in information acquisition and integration between various functions. The planned transition from single functions to AI agents capable of combining multiple functionalities reflects growing sophistication in how LLM systems are architected.

The five-stage utilization model provides a thoughtful framework for thinking about human-AI collaboration evolution. Stage 1 has QAB supporting tasks by understanding and extracting data while employee expertise remains crucial. Stage 2 delegates some tasks to QAB for data generation and verification. Stage 3 envisions true collaboration where employees and QAB jointly explore and analyze data. Stage 4 has QAB proposing data-driven decisions with actionable insights. Stage 5 represents full automation with QAB autonomously making optimal decisions. This progression acknowledges that AI augmentation evolves gradually rather than immediately replacing human judgment, and that different tasks may appropriately sit at different stages even as overall capabilities advance.

The planned BI Portal integration, suggesting dashboards linked to questions, demonstrates continued thinking about ecosystem connections. Rather than making QAB the sole interface for all data needs, the team envisions it as an intelligent router that connects users to the most appropriate tools and resources for their specific needs.

## Critical Assessment

While this case study provides valuable technical detail and demonstrates thoughtful production engineering, several aspects warrant critical consideration. First, the effectiveness claims around LLM-based approaches replacing traditional search algorithms and classification models are stated but not quantitatively validated in the documentation. Comparative metrics between the LLM-based approach and baseline methods would strengthen confidence in the design choices. The team mentions improved classification performance but doesn't provide specific accuracy figures or error rate comparisons.

The hallucination issues acknowledged for metadata generation raise questions about data quality governance. If incorrect information exists in some table metadata, how is this detected and corrected at scale? What processes ensure metadata accuracy over time as the system scales? The mention of planned improvements suggests this is a known issue, but the interim state where some metadata contains errors could undermine user trust if incorrect information leads to poor decisions.

The cost considerations for running this system are not discussed. Vector store operations, multiple LLM calls per query (Router Supervisor, various chains, retrieval steps), and the need for continuous updates all have associated costs. For organizations considering similar implementations, understanding the cost-benefit tradeoff would be valuable. How does QAB's operational cost compare to the productivity gains from improved data literacy?

The reliance on few-shot SQL examples for business logic understanding, acknowledged as limiting Query Syntax Verification capabilities, suggests the system may struggle with complex business rules that aren't well-represented in training examples. How this limitation affects user experience in practice—and how often users encounter it—would be worth understanding.

The weekly update cycle for log data represents a tradeoff between freshness and operational overhead. In rapidly evolving systems, week-old log definitions might be stale. The case study doesn't discuss how the team handles this latency or communicates to users when log information might be outdated.

Finally, while the multi-turn conversation capability is described as under development due to hallucination concerns, many modern LLM applications successfully implement conversational interactions. The specific challenges QAB faces in this area—perhaps related to maintaining context across diverse data sources and function types—aren't fully elaborated. Understanding these challenges would help other teams facing similar integration complexity.

## LLMOps Maturity and Best Practices

Despite these questions, the case study demonstrates several LLMOps best practices worth emulating. The staged architecture separating question understanding from information acquisition provides clear separation of concerns and enables independent optimization. The use of scoring systems and quality checks before expensive operations improves efficiency and user experience. The hybrid retrieval approach combining multiple information sources shows sophisticated information retrieval engineering. The emphasis on user testing and iteration based on actual usage demonstrates product-minded development rather than technology-driven feature building.

The documentation itself is a positive example of knowledge sharing in the LLM engineering community. The team provides specific implementation details, acknowledges limitations candidly, and explains architectural rationale. This transparency helps advance the field's collective understanding of production LLM system engineering.

The team's roadmap thinking, with planned enhancements and a phased vision for human-AI collaboration, shows strategic product development rather than opportunistic feature addition. The recognition that performance improvements and function integration are prerequisites for more advanced capabilities demonstrates understanding of technical debt and dependency management in complex systems.

Overall, QueryAnswerBird represents a sophisticated production LLM system addressing real enterprise needs through thoughtful architecture, iterative development based on user feedback, and pragmatic integration with existing data tools. While questions remain about quantitative performance validation and operational considerations, the case study provides valuable insights for teams building similar enterprise data discovery capabilities.