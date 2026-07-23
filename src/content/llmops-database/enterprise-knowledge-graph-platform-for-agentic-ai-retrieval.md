---
title: "Enterprise Knowledge Graph Platform for Agentic AI Retrieval"
slug: "enterprise-knowledge-graph-platform-for-agentic-ai-retrieval"
draft: false
llmopsTags:
  - "data-analysis"
  - "data-integration"
  - "structured-output"
  - "unstructured-data"
  - "high-stakes-application"
  - "agent-based"
  - "semantic-search"
  - "mcp"
  - "evals"
  - "prompt-engineering"
  - "langchain"
  - "fastapi"
  - "postgresql"
  - "documentation"
  - "anthropic"
  - "openai"
industryTags: "other"
company: "Gates Foundation"
summary: "The Gates Foundation developed the Strategic Intelligence Platform (SIP), an enterprise-wide knowledge graph system designed to enable agentic AI retrieval across 25+ years of organizational data spanning over $7 billion in annual grant disbursements. The platform addresses the challenge of extracting data-driven insights from complex, siloed systems of record by creating a unified semantic graph layer that connects structured and unstructured data from across 2,000+ annual grants, 4,000 employees, and 100+ countries. The solution combines Neo4j graph database technology with Model Context Protocol (MCP) integration to enable AI agents to dynamically discover and reason across organizational structures at query time, serving users through existing interfaces like Claude and ChatGPT while maintaining the foundation's competitive advantage through deep modeling of internal processes and tacit knowledge."
link: "https://www.youtube.com/watch?v=jt1Pbr_n6oU"
year: 2026
seo:
  title: "Gates Foundation: Enterprise Knowledge Graph Platform for Agentic AI Retrieval - ZenML LLMOps Database"
  description: "The Gates Foundation developed the Strategic Intelligence Platform (SIP), an enterprise-wide knowledge graph system designed to enable agentic AI retrieval across 25+ years of organizational data spanning over $7 billion in annual grant disbursements. The platform addresses the challenge of extracting data-driven insights from complex, siloed systems of record by creating a unified semantic graph layer that connects structured and unstructured data from across 2,000+ annual grants, 4,000 employees, and 100+ countries. The solution combines Neo4j graph database technology with Model Context Protocol (MCP) integration to enable AI agents to dynamically discover and reason across organizational structures at query time, serving users through existing interfaces like Claude and ChatGPT while maintaining the foundation's competitive advantage through deep modeling of internal processes and tacit knowledge."
  canonical: "https://www.zenml.io/llmops-database/enterprise-knowledge-graph-platform-for-agentic-ai-retrieval"
  ogTitle: "Gates Foundation: Enterprise Knowledge Graph Platform for Agentic AI Retrieval - ZenML LLMOps Database"
  ogDescription: "The Gates Foundation developed the Strategic Intelligence Platform (SIP), an enterprise-wide knowledge graph system designed to enable agentic AI retrieval across 25+ years of organizational data spanning over $7 billion in annual grant disbursements. The platform addresses the challenge of extracting data-driven insights from complex, siloed systems of record by creating a unified semantic graph layer that connects structured and unstructured data from across 2,000+ annual grants, 4,000 employees, and 100+ countries. The solution combines Neo4j graph database technology with Model Context Protocol (MCP) integration to enable AI agents to dynamically discover and reason across organizational structures at query time, serving users through existing interfaces like Claude and ChatGPT while maintaining the foundation's competitive advantage through deep modeling of internal processes and tacit knowledge."
notion:
  pageId: "3a6f8dff-2538-806a-9c51-cda8c4813cc9"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-23T08:32:00.000Z"
  lastEditedTime: "2026-07-23T08:32:00.000Z"
  publishedAt: "2026-07-23T08:57:55Z"
---

## Overview and Strategic Context

The Gates Foundation developed and deployed the Strategic Intelligence Platform (SIP) as an enterprise-wide solution for enabling AI agents to access and reason over the foundation's complex operational data. Rolled out in production during 2026 for approximately 4,000 employees, this platform represents a sophisticated approach to LLMOps that prioritizes data modeling and organizational knowledge over proprietary UI development. The foundation operates at significant scale, disbursing over $7 billion annually across more than 2,000 grants, spanning 100+ countries and multiple strategic divisions including global development, global health, gender equality, and US programs.

The strategic framing of this LLMOps implementation is particularly noteworthy. Rather than competing on the frontier of AI model development or user interface innovation, the team explicitly identified their competitive advantage as their understanding of internal processes and tacit knowledge. This philosophy shaped every technical decision, with the recognition that even as AI models improve and new products launch, the defensible and durable component is the carefully modeled representation of organizational structure, business rules, and domain knowledge. The team deliberately chose to meet users where they already were, serving the platform through existing chat interfaces like Claude and ChatGPT via MCP rather than building yet another proprietary chat application.

## Architecture and Data Pipeline

The end-to-end architecture follows a layered approach starting from systems of record through to agentic consumption. At the base layer sit various siloed structured and unstructured data sources that historically existed in isolation. The foundation created a data lakehouse to consolidate enterprise-wide data under one roof, combining both internal operational data and programmatic data outputs from various investments. This consolidation layer proved critical for enabling the cross-system semantic reasoning required for complex queries.

Above the data lakehouse sits a data curation layer responsible for significant preprocessing and enrichment. The team emphasized the importance of deep engagement with data owners to understand the full meaning and context of data fields, join patterns, limitations, systematics, safeguards, security requirements, and reporting conventions. This engagement process captures tacit knowledge that cannot be derived from schema alone, such as understanding that questions must be answered not just correctly but in accordance with established organizational reporting standards.

The data curation pipeline handles multiple concerns across three primary buckets. First, preprocessing involves filtering, deduplication, handling document ordering, and resolving inconsistencies across documents. Second, extraction operations include structured field extraction from documents, semantic chunking for unstructured content, and conversion of figures to text representations to enable retrieval. Various forms of tagging create connections in the graph structure, and metadata generated during processing becomes properties in the graph model. Third, governance considerations address PII masking, sensitive data classification, and ensuring proper entitlements for each user accessing the system. The team noted that AI makes data access more acute as a risk consideration, expanding the risk sphere for previously less-accessible information.

## Knowledge Graph Data Model

The core innovation lies in the sophisticated knowledge graph data model built in Neo4j. The graph represents a cross-system semantic layer that agents can traverse at query time, integrating four different source systems into a single unified representation. The model is conceptual and flat when visualized, but the actual instantiated graph contains significantly more complexity with proper cardinality relationships and multiple node instances.

The data model incorporates multiple hierarchical structures, each with different semantic properties. The first hierarchy type is an additive directed acyclic graph (DAG) with five levels where all levels matter together and must be considered in aggregation. This hierarchy represents the funding structure, connecting funds to budget allocations for different funding teams. These teams manage portfolios that in turn fund investments, with the complication that multiple funding teams can fund individual investments, creating many-to-many relationships. The model includes path shortcuts that connect funding paths directly to relevant nodes, and relationships can be examined at the transaction level or through annual aggregations.

The second hierarchy type represents the investment management organizational structure where each level matters independently rather than additively. This enables precomputation of certain shortcuts and derived edges. The model distinguishes between direct team management, where a specific team level directly manages an investment, and indirect management, where child teams below that level should still be attributed to the parent team for rollup purposes. The team created derived edges like "rollup manages" that are computed after establishing the base "contains" and "manages" relationships.

The third hierarchy models people, organizations, and organizational charts. People have various roles as owners, meeting attendees, directors, and other positions. The model captures reporting structures and team hierarchies, data that traditionally existed only in HR systems but proves relevant for understanding the full context of grants and investments.

The document layer integrates unstructured content with the structured graph. Meetings have associated documents, which are broken down into semantic sections or chunks. The team applies full text indexes across these chunks to support different search and retrieval approaches for agents, including both traditional search and pure graph traversal strategies. All document nodes connect back to the main organizational structure, enabling agents to understand relationships between meeting discussions and formal organizational entities.

A critical aspect of the data model is the concept of entity resolution and stitching across source systems. The team identified common entities that appear in multiple traditionally siloed systems and created connections that enable agents to traverse the full organizational structure. This cross-system stitching transforms isolated data islands into a coherent semantic representation that agents can reason across.

## Agent Integration and Deployment Strategy

The platform exposes the knowledge graph to AI agents through the Model Context Protocol. Rather than building proprietary agent experiences from scratch, the foundation adopted a strategy of serving the platform where users already are. Users already had access to Claude, ChatGPT, and other chat interfaces, so the team built MCP integrations that allow these existing tools to query the knowledge graph.

The MCP implementation builds on Neo4j's off-the-shelf MCP servers but with significant modifications. The team forked the base implementation and made various updates to the schema and added capabilities for passing state back to their systems, including conversation IDs and message numbers for tracking and analytics purposes.

Beyond general chat experiences, the team is actively building more constrained workflow experiences that can be offered through platforms like Claude chat. These workflows use MCP apps as standard entry points with different sandbox-based agents running specific workflows. This approach provides more constrained and guided experiences compared to open-ended chat while still pulling from the same knowledge graph backend. The dual approach allows the platform to serve both exploratory discovery use cases and structured workflow requirements.

The deployment strategy reflects a pragmatic assessment of what components provide sustainable competitive advantage. The chat interface and even some general chat agent capabilities were deemed not defensible as users already have access to frontier models through commercial services. The defensible component is the carefully constructed knowledge graph that models organizational tacit knowledge, business rules, and data relationships that no external provider could replicate.

## Evaluation Strategy and Continuous Improvement

The evaluation approach directly supports data model refinement through a feedback loop architecture. The team works with data owners to build targeted evaluation questions that match established reporting standards. These questions are separated into different complexity tiers to enable nuanced assessment of system capabilities.

A significant challenge identified is that structured data constantly changes, requiring dynamic evaluation approaches. Rather than comparing agent outputs against static ground truth answers, the system generates the ground truth at evaluation runtime by executing graph queries against the live database. The evaluation then compares what the agent delivers for each question against this dynamically generated expected result.

The evaluation pipeline employs LLM-as-judge approaches for assessment, measuring metrics like pass-at-one accuracy and stability. Stability measures whether asking the same question multiple times yields consistent answers, an important property for enterprise deployment where users expect deterministic behavior. The feedback loop allows evaluation results to drive updates to the data model, domain rules, and schema descriptions, continuously filling gaps discovered during testing.

The team reports achieving very strong pass-at-one and stability scores. Questions that the system fails to answer correctly tend to involve some form of ambiguity where the response may be technically correct but not what the user intended based on organizational context. This residual ambiguity represents an ongoing area of work, highlighting the challenge of capturing and encoding tacit knowledge even with sophisticated data modeling.

The evaluation process itself serves as a discovery mechanism for gaps in the data model. As users ask questions and evaluations run, the team identifies areas where their understanding of organizational structures or data relationships is incomplete, or where additional datasets need to be incorporated. This process of continuous discovery and refinement treats the data model as a living artifact that evolves with organizational understanding.

## Production Considerations and Lessons Learned

Several practical lessons emerge from this production deployment. First, the importance of data owner engagement cannot be overstated. Technical teams cannot independently determine the full semantic meaning and business rules surrounding organizational data. Deep collaboration with domain experts is essential to capture reporting conventions, understand data limitations, and ensure that AI responses align with established organizational standards.

Second, the choice of what to own versus what to leverage is strategic. By recognizing that their competitive advantage lay in organizational knowledge rather than chat interfaces or frontier model capabilities, the team avoided overbuilding and focused resources on the defensible components. This approach also reduced maintenance burden and kept the team aligned with their core expertise.

Third, the knowledge graph serves as a valuable tool for exposing gaps in understanding. The process of explicitly modeling organizational structures and relationships makes visible what the team doesn't fully understand about the organization, creating opportunities to address these gaps systematically.

Fourth, governance and security considerations become more acute with AI deployment. Data that was technically accessible but rarely used becomes much more discoverable through natural language interfaces, expanding the effective risk surface. This requires revisiting classifications, entitlements, and PII handling even for data that has been in systems for years.

## Future Directions

The roadmap for the platform focuses on several areas of expansion. First, continuing to fill out existing data from current systems of record within the established data model framework. Second, expanding the primary graph to incorporate additional enterprise-wide datasets beyond the initial scope. Third, developing a federated graph experience where specific teams can link their own specialized data to the main enterprise system, enabling both centralized and decentralized data management patterns. Fourth, continuing to develop different agentic experiences beyond general chat, including more constrained workflow tools that guide users through specific processes while leveraging the underlying knowledge graph.

The platform represents a mature approach to enterprise LLMOps that prioritizes sustainable competitive advantage through deep data modeling, pragmatic technology choices that leverage existing user-facing tools, and continuous improvement through evaluation-driven feedback loops. The emphasis on organizational tacit knowledge as the core asset, rather than proprietary AI technology or interfaces, provides a framework for other enterprises considering similar deployments.
