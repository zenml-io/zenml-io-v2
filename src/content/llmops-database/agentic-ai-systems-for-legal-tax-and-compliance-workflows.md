---
title: "Agentic AI Systems for Legal, Tax, and Compliance Workflows"
slug: "agentic-ai-systems-for-legal-tax-and-compliance-workflows"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68811aeee48cf9ef26ddc989"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:16:53.534Z"
  createdOn: "2025-07-23T17:25:02.530Z"
llmopsTags:
  - "document-processing"
  - "fraud-detection"
  - "classification"
  - "question-answering"
  - "regulatory-compliance"
  - "legacy-system-integration"
  - "rag"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "evals"
  - "error-handling"
  - "fallback-strategies"
  - "guardrails"
  - "compliance"
  - "security"
  - "documentation"
  - "databases"
  - "api-gateway"
  - "monitoring"
industryTags: "legal"
company: "Thomson Reuters"
summary: "Thomson Reuters evolved their AI assistant strategy from helpfulness-focused tools to productive agentic systems that make judgments and produce output in high-stakes legal, tax, and compliance environments. They developed a framework treating agency as adjustable dials (autonomy, context, memory, coordination) rather than binary states, enabling them to decompose legacy applications into tools that AI agents can leverage. Their solutions include end-to-end tax return generation from source documents and comprehensive legal research systems that utilize their 1.5+ terabytes of proprietary content, with rigorous evaluation processes to handle the inherent variability in expert human judgment."
link: "https://www.youtube.com/watch?v=kDEvo2__Ijg"
year: 2025
seo:
  title: "Thomson Reuters: Agentic AI Systems for Legal, Tax, and Compliance Workflows - ZenML LLMOps Database"
  description: "Thomson Reuters evolved their AI assistant strategy from helpfulness-focused tools to productive agentic systems that make judgments and produce output in high-stakes legal, tax, and compliance environments. They developed a framework treating agency as adjustable dials (autonomy, context, memory, coordination) rather than binary states, enabling them to decompose legacy applications into tools that AI agents can leverage. Their solutions include end-to-end tax return generation from source documents and comprehensive legal research systems that utilize their 1.5+ terabytes of proprietary content, with rigorous evaluation processes to handle the inherent variability in expert human judgment."
  canonical: "https://www.zenml.io/llmops-database/agentic-ai-systems-for-legal-tax-and-compliance-workflows"
  ogTitle: "Thomson Reuters: Agentic AI Systems for Legal, Tax, and Compliance Workflows - ZenML LLMOps Database"
  ogDescription: "Thomson Reuters evolved their AI assistant strategy from helpfulness-focused tools to productive agentic systems that make judgments and produce output in high-stakes legal, tax, and compliance environments. They developed a framework treating agency as adjustable dials (autonomy, context, memory, coordination) rather than binary states, enabling them to decompose legacy applications into tools that AI agents can leverage. Their solutions include end-to-end tax return generation from source documents and comprehensive legal research systems that utilize their 1.5+ terabytes of proprietary content, with rigorous evaluation processes to handle the inherent variability in expert human judgment."
---

## Thomson Reuters: Building Production-Ready Agentic AI for Legal and Tax Workflows

Thomson Reuters represents a compelling case study in enterprise LLMOps, showcasing how a century-old company with deep domain expertise successfully evolved their AI strategy from simple assistants to sophisticated agentic systems. As a company serving 97% of top 100 US law firms and 99% of Fortune 100 companies, Thomson Reuters operates in environments where accuracy and reliability are paramount, making their approach to production LLM deployment particularly instructive.

### Strategic Evolution: From Helpfulness to Productivity

The company's journey began approximately 2.5 years ago with the development of AI assistants focused on being "helpful" - providing accurate information with proper citations. However, they identified a fundamental shift in user expectations and business requirements, moving from assistants that merely help to systems that actively produce output and make decisions on behalf of users. This evolution is particularly significant in legal, tax, and compliance domains where the cost of errors can be substantial.

This strategic pivot reflects a broader industry trend toward what they term "agentic AI" - systems that don't just respond to queries but actively execute complex workflows, make judgments, and produce actionable outputs. The Y Combinator quote they reference - "don't build agentic tools for law firms, build law firms of agents" - encapsulates this transformation from tool-assisted work to agent-performed work.

### Framework for Agency: The Dial Approach

One of Thomson Reuters' most significant contributions to the LLMOps discourse is their conceptualization of agency not as a binary characteristic but as a spectrum of adjustable parameters. They identify four key "dials" that can be tuned based on use case requirements and risk tolerance:

**Autonomy Dial**: Ranges from simple discrete tasks like document summarization to complex self-evolving workflows where AI systems plan, execute, and replan their own work based on observations and learning. This flexibility allows them to match the level of AI independence to the specific requirements and risk profile of different use cases.

**Context Dial**: Progresses from basic parametric knowledge utilization through RAG implementations with single knowledge sources, to sophisticated multi-source reasoning that can rationalize between controlled knowledge bases and web content. At the most advanced level, their systems can even modify data sources and schemas to improve future performance.

**Memory Dial**: Evolves from stateless RAG systems that retrieve context at query time to sophisticated memory architectures that maintain state throughout workflows, across execution steps, and persist across user sessions. This persistent memory capability is crucial for complex legal and tax workflows that may span multiple sessions and require continuity of context.

**Coordination Dial**: Spans from atomic task execution to full multi-agent collaboration systems. This includes delegation to tools and coordination between multiple AI agents working together on complex problems.

This framework provides a practical approach to managing the complexity and risk associated with agentic systems, allowing operators to dial up agency in low-risk, exploratory scenarios while maintaining tighter control in high-precision, high-stakes situations.

### Production Challenges and Solutions

**Evaluation Complexity**: Thomson Reuters identifies evaluation as perhaps their most challenging aspect of LLMOps. The fundamental tension between user expectations of deterministic behavior and the inherently non-deterministic nature of LLM systems creates significant trust and adoption barriers. Their evaluation challenges are compounded by the fact that even highly trained domain experts (lawyers, tax professionals) show 10+ percent variability in their own judgments when evaluating the same questions a week apart.

This human variability insight is particularly valuable for the LLMOps community, as it highlights that the challenge isn't just technical inconsistency in AI systems, but fundamental variability in human expert judgment. Their approach involves developing rigorous evaluation rubrics while ultimately relying on preference-based evaluation as a north star for determining system improvement.

The evaluation process is also expensive, requiring highly trained professionals (lawyers, tax experts) who command significant compensation. This creates a practical constraint on iteration speed and evaluation frequency, forcing them to be strategic about when and how they conduct evaluations.

**Agentic System Evaluation Challenges**: As systems become more agentic, evaluation becomes significantly more complex. Key challenges include:
- Difficulty in maintaining proper source citations as agents perform more complex reasoning
- Agent drift detection and diagnosis along multi-step trajectories  
- Building effective guardrail systems that require deep domain expertise
- Balancing automation with explainability and auditability requirements

### Legacy System Integration Strategy

Rather than viewing their extensive legacy infrastructure as a constraint, Thomson Reuters has transformed it into a competitive advantage through decomposition and tool integration. With over 100 years of software development, they possess highly tuned domain logic and business rules that users expect and depend upon.

Their key insight was that agentic systems could decompose these legacy applications into discrete tools that AI agents can leverage. Instead of rebuilding everything from scratch, they're finding new ways to utilize existing infrastructure, turning what might be considered technical debt into unique assets.

This approach is exemplified in their tax automation system, which uses existing tax engines and validation systems as tools that AI agents can call upon. The AI handles document processing, data extraction, and field mapping, while leveraging the proven calculation and validation logic embedded in their legacy systems.

### Production Use Cases

**Tax Workflow Automation**: Their tax use case demonstrates end-to-end automation of tax return generation from source documents. The system uses AI for document data extraction (W2s, 1099s, etc.), intelligent field mapping to tax engines, application of tax law rules and conditions, and generation of complete tax returns. The integration with existing tax engines and validation systems allows the AI to inspect errors, seek additional information from source documents, and iteratively resolve issues to complete workflows.

**Legal Research System**: Their legal research implementation showcases sophisticated multi-source reasoning across their 1.5+ terabytes of proprietary content. The system uses existing litigation research tools as building blocks, including document search, retrieval, citation comparison, and validation capabilities. The AI agent navigates across case law, statutes, regulations, and legal commentary to construct comprehensive research reports with proper citations and risk flagging.

Both systems demonstrate the practical application of their agency dial framework, with the tax system operating at higher autonomy levels due to more structured workflows, while the legal research system maintains more human oversight due to the interpretive nature of legal analysis.

### Technical Architecture Insights

While specific technical details aren't extensively covered in the presentation, several architectural insights emerge:

**Multi-Source RAG**: Their systems integrate multiple content sources with different characteristics - proprietary databases, licensed content, and public information - requiring sophisticated reasoning about source authority and relevance.

**Tool Integration**: Rather than monolithic AI systems, they've built architectures where AI agents coordinate with existing software tools and engines, maintaining the reliability of proven business logic while adding AI capabilities for reasoning and orchestration.

**Citation and Traceability**: Maintaining proper citations and source traceability is a core requirement, with their systems providing "hard citations" linking back to original cases, statutes, and other authoritative sources.

**Risk Flagging**: Their systems incorporate risk assessment capabilities, flagging potential issues or uncertainty levels in their outputs, which is crucial for professional service environments.

### Organizational and Resource Commitments

Thomson Reuters' LLMOps success is supported by significant organizational investment:
- 4,500 domain experts (described as the world's largest employer of lawyers)
- Applied research lab with 200+ scientists and engineers
- $200+ million annual capital investment in AI product development
- Over $3 billion in recent acquisitions to expand capabilities

This scale of investment underscores that successful enterprise LLMOps, particularly in regulated industries, requires substantial organizational commitment and resources.

### Key Lessons for LLMOps Practitioners

**Rethink MVP Approach**: Thomson Reuters found that their traditional focus on "minimal" in MVP led them down optimization rabbit holes. They discovered that building complete systems first, then optimizing, was more effective than trying to perfect individual components in isolation. This insight challenges conventional product development wisdom in the context of agentic AI systems.

**Leverage Unique Assets**: Their success stems from identifying and leveraging assets that competitors cannot easily replicate - domain expertise, proprietary content, and established user relationships. This suggests that successful LLMOps strategies should be built around unique organizational assets rather than generic AI capabilities.

**Human-in-the-Loop Evaluation**: Given the inherent variability in expert human judgment, they emphasize the critical importance of developing robust evaluation frameworks that account for this variability while still providing meaningful signals for system improvement.

**Agency as Risk Management**: Their dial framework provides a practical approach to managing the risk-capability tradeoff in agentic systems, allowing organizations to be aggressive with automation in low-risk scenarios while maintaining control in high-stakes situations.

The Thomson Reuters case study demonstrates that successful enterprise LLMOps requires more than just technical implementation - it demands strategic thinking about agency levels, systematic approaches to evaluation, creative integration with existing systems, and substantial organizational commitment to both technology and domain expertise.