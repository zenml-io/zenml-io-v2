---
title: "Building Enterprise AI Agents with Code-First Approach for Trust and Auditability"
slug: "building-enterprise-ai-agents-with-code-first-approach-for-trust-and-auditability"
draft: false
llmopsTags:
  - "customer-support"
  - "document-processing"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "classification"
  - "summarization"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "prompt-engineering"
  - "evals"
  - "error-handling"
  - "langchain"
  - "monitoring"
  - "cicd"
  - "orchestration"
  - "devops"
  - "documentation"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "amazon-aws"
industryTags: "finance"
company: "Coinbase"
summary: "Coinbase's Enterprise Applications and Architecture team established an Agentic AI Tiger Team over six weeks to standardize the development and deployment of enterprise AI agents for internal process automation. The team deliberately chose a code-first, high-code approach using LangGraph and LangChain over low-code tools to ensure reproducibility, testability, and auditability—critical requirements for regulatory compliance in financial services. Within the six-week sprint, they deployed two production automations saving 25+ hours per week, completed two more end-to-end agents in development, and created reusable infrastructure patterns and best practices that reduced future agent development time from quarters to days while enabling engineer self-service."
link: "https://www.coinbase.com/en-nl/blog/building-enterprise-AI-agents-at-Coinbase"
year: 2025
seo:
  title: "Coinbase: Building Enterprise AI Agents with Code-First Approach for Trust and Auditability - ZenML LLMOps Database"
  description: "Coinbase's Enterprise Applications and Architecture team established an Agentic AI Tiger Team over six weeks to standardize the development and deployment of enterprise AI agents for internal process automation. The team deliberately chose a code-first, high-code approach using LangGraph and LangChain over low-code tools to ensure reproducibility, testability, and auditability—critical requirements for regulatory compliance in financial services. Within the six-week sprint, they deployed two production automations saving 25+ hours per week, completed two more end-to-end agents in development, and created reusable infrastructure patterns and best practices that reduced future agent development time from quarters to days while enabling engineer self-service."
  canonical: "https://www.zenml.io/llmops-database/building-enterprise-ai-agents-with-code-first-approach-for-trust-and-auditability"
  ogTitle: "Coinbase: Building Enterprise AI Agents with Code-First Approach for Trust and Auditability - ZenML LLMOps Database"
  ogDescription: "Coinbase's Enterprise Applications and Architecture team established an Agentic AI Tiger Team over six weeks to standardize the development and deployment of enterprise AI agents for internal process automation. The team deliberately chose a code-first, high-code approach using LangGraph and LangChain over low-code tools to ensure reproducibility, testability, and auditability—critical requirements for regulatory compliance in financial services. Within the six-week sprint, they deployed two production automations saving 25+ hours per week, completed two more end-to-end agents in development, and created reusable infrastructure patterns and best practices that reduced future agent development time from quarters to days while enabling engineer self-service."
notion:
  pageId: "34ef8dff-2538-811e-a996-c2ac7646a5f2"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:00:57Z"
---

## Overview

Coinbase's enterprise AI agent initiative represents a systematic approach to productionizing LLM-based automation within a highly regulated financial services environment. The company formed a dedicated "Agentic AI Tiger Team" within their Enterprise Applications and Architecture division with a dual mandate: deliver tangible automation value and establish repeatable patterns for enterprise-wide adoption. Over a six-week period, the team focused on three distinct internal use cases—Institutional support, Onramp onboarding, and Listing legal review—deliberately chosen for domain diversity and to stress-test their emerging standards.

The fundamental insight driving Coinbase's approach is treating enterprise AI agents not as experimental chatbots but as production software services with additional requirements for interpretability and auditability. This framing directly shaped their architectural choices, development practices, and operational standards. The team recognizes that while consumer-facing AI products can tolerate some drift and rapid UI iteration, enterprise agents interact with sensitive business data and automate workflows previously handled exclusively by humans, demanding infrastructure-grade rigor.

## Architectural Philosophy: Code-First Agent Graphs

A central technical decision was the choice between high-code and low-code development paradigms. The team experimented with both approaches and found distinct tradeoffs. Low-code tools proved valuable for discovery and rapid prototyping—they enable quick tool assembly and fast learning cycles. However, as automations grew in complexity, the team observed that loading multiple tools and instructions into prompts created "context noise" that degraded reproducibility and made individual steps difficult to unit test or integrate into continuous integration pipelines.

For production-grade automations intended to scale across the organization, Coinbase adopted a code-first approach using LangGraph and LangChain patterns. This architectural choice provides several critical advantages for LLMOps. Code-first graphs enable typed interfaces that catch errors at development time rather than runtime. Version control becomes straightforward, allowing teams to track changes, roll back problematic updates, and coordinate across developers. The separation of deterministic "data" nodes from probabilistic "LLM" nodes creates clear boundaries for testing—data transformation steps can be unit tested with conventional software engineering practices, while LLM-powered nodes are evaluated using specialized techniques.

This separation also enables sophisticated observability, evaluation frameworks, and human-in-the-loop controls to be implemented as first-class system components rather than afterthoughts. The resulting architecture treats agent graphs as services, not conversations, aligning with Coinbase's existing Golang-based service infrastructure and DevOps practices.

## Observability and Tracing Infrastructure

Coinbase built their agent platform with "observability-first" as a core principle. Every component of an agent execution—tool calls, retrieval operations, decision points, and final outputs—is traced and recorded. This comprehensive instrumentation serves multiple purposes in production LLM operations.

For deterministic data-fetch and transformation steps, observability enables traditional debugging and performance optimization. These steps are unit-tested and their behavior is predictable, but tracing still provides visibility into actual execution patterns and data flows. For LLM-powered steps, observability becomes even more critical since the outputs are probabilistic. The team runs these nodes with evaluation harnesses against curated datasets, allowing them to detect degradation over time or unexpected behavior changes when models or prompts are updated.

Coinbase invested significantly in LangSmith as their observability platform, going so far as to build out a hosted LangSmith implementation that was subsequently adopted company-wide by Coinbase's AI team. This created a consistent, organization-approved observability standard for all agents, reducing fragmentation and enabling cross-team learning. The platform allows engineers to trace individual executions, diff runs across different versions of an agent, and store artifacts alongside execution records for post-hoc analysis.

The team also implements a "second LLM as judge" pattern for spot-checks and confidence scoring. This technique uses one LLM to evaluate the outputs of another, providing an automated quality signal that can flag potentially problematic outputs for human review without requiring humans to inspect every execution.

## Evaluation and Testing Strategies

Evaluation in Coinbase's agent platform operates at multiple levels, reflecting the hybrid deterministic-probabilistic nature of agent graphs. Deterministic nodes—data retrieval, schema validation, business rule application—are covered by conventional unit tests that assert expected outputs for given inputs. This provides a stable foundation and ensures that the "plumbing" of the agent behaves correctly.

For LLM-powered nodes, the team employs evaluation harnesses that run prompts against curated datasets. These datasets capture representative inputs and desired outputs, allowing the team to measure performance metrics like accuracy, completeness, and adherence to instructions. When prompts or models are updated, regression testing against these evaluation sets helps detect unintended changes in behavior.

The use of LLM-as-judge for evaluation adds another layer. While not perfect—LLM judges can have their own biases and failure modes—this approach scales better than pure human evaluation while providing richer signals than simple keyword matching or rule-based checks. The team appears to use judge-based evaluation for confidence scoring, which can be particularly valuable for routing decisions (e.g., automatically approving high-confidence outputs while flagging low-confidence cases for human review).

Importantly, Coinbase treats evaluation as an ongoing operational concern, not just a pre-deployment activity. By integrating evaluation into their observability stack, they can continuously monitor agent performance in production and detect drift or degradation over time.

## Auditability and Compliance Requirements

Operating in the cryptocurrency and financial services space, Coinbase faces stringent regulatory requirements around decision transparency and record-keeping. The team designed auditability into their agent platform from the start rather than retrofitting it later—a decision that proved essential for legal and compliance workflows.

Every agent execution creates an immutable audit record capturing which data was accessed, how it was used, the reasoning path the agent followed, and which human (if any) approved the final output. This level of detail satisfies current regulatory requirements while providing the documentation needed to gradually reduce human oversight as confidence in agent reliability grows.

The auditability infrastructure built for one agent became reusable across all subsequent agents, demonstrating the value of treating auditability as a platform concern rather than a per-agent feature. Each claim or recommendation generated by an agent is traceable back to specific source documents and reasoning steps, enabling both compliance reviews and debugging when outputs are questioned.

This approach to auditability aligns with broader industry best practices for responsible AI deployment in regulated industries. By maintaining detailed provenance and reasoning traces, Coinbase can demonstrate to regulators and internal stakeholders that agent decisions are grounded in appropriate data and follow documented logic, even when the core reasoning involves probabilistic LLM calls.

## Human-in-the-Loop Design

Rather than viewing human oversight as a temporary scaffold to be removed, Coinbase designed human-in-the-loop as an intentional, permanent component of their agent systems. The team explicitly designs handoff points and feedback loops into the user experience, recognizing that real-world edge cases and long-tail scenarios will continue to require human judgment.

This design philosophy serves multiple purposes. First, it manages risk by ensuring that consequential decisions receive human review, particularly important in financial and legal contexts. Second, it creates a feedback mechanism for continuous improvement—when humans correct or override agent outputs, those interventions can inform prompt refinement, additional training data, or updated business rules. Third, it maintains user trust by giving domain experts visibility and control rather than creating black-box automation.

The team's approach to human-in-the-loop appears thoughtful about minimizing friction. Rather than requiring humans to review every step, agents are designed to handle routine cases autonomously and escalate to humans when confidence is low, novel situations are encountered, or decisions cross certain thresholds. This selective escalation keeps the system efficient while preserving human oversight where it matters most.

Capturing feedback "where work happens"—integrated into the actual workflow rather than requiring separate review sessions—accelerates the improvement cycle. Domain experts can correct issues in context, and those corrections become valuable signals for tuning prompts, adjusting confidence thresholds, or identifying gaps in the agent's capabilities.

## Standardized Development Playbook

One of the Tiger Team's key outputs was a standardized playbook that codifies their learnings into repeatable practices other teams can adopt. This standardization proved crucial for scaling agent development across Coinbase—it reduced new agent development time from over 12 weeks to under one week and enabled engineer self-service rather than requiring specialized expertise.

The playbook begins with "building the job description before the agent." Teams are required to write a detailed standard operating procedure (SOP) describing what "good" looks like, which data sources the agent can use, and where it must defer to humans. This SOP serves as both a design document and an evaluation criterion—if a human new hire couldn't succeed with the SOP, the team shouldn't expect an agent to succeed either. This practice forces teams to clarify their requirements and success criteria before writing code.

The playbook emphasizes engineering agent graphs rather than chat interfaces, reinforcing the code-first approach. By separating deterministic and probabilistic components, teams create systems where failures are diagnosable and executions are reproducible—essential properties for production systems.

Treating observability as a requirement from day one is another key principle. The playbook directs teams to trace everything, enable version comparison, and store artifacts with execution records. This "you can't tune what you can't see" philosophy ensures teams have the visibility needed for debugging and optimization.

The standardized approach to human-in-the-loop design, mentioned earlier, ensures consistent user experience across different agents while preserving the flexibility to adjust review requirements based on risk and domain.

Designing for auditability on day one, also discussed above, is codified as a standard practice. Every agent must reference claims to sources and tie outputs to exact inputs, tools, and reasoning paths—the shortest path to both regulatory compliance and organizational trust.

Finally, the playbook recommends preferring the simplest viable runtime. In practice, this means Python-only builds for most agents, only adding complexity like sidecars when specific use cases demand it. This pragmatic approach balances developer productivity with operational needs.

## Runtime and Deployment Infrastructure

Coinbase's production agent infrastructure integrates with their existing service hosting capabilities, which are primarily Golang-based. The team's current implementation uses Python for agent logic, reflecting the LangChain/LangGraph ecosystem's language choice, but deploys these agents through infrastructure that provides the same reliability and operational characteristics as other production services.

Looking forward, the team plans to leverage AWS Bedrock AgentCore for hosting Python agents. This suggests a managed service approach that reduces operational overhead while maintaining the control and observability Coinbase requires. Bedrock integration would also provide access to Amazon's model catalog and potentially simpler credential management for accessing foundation models.

The deployment pipeline incorporates the same versioning, testing, and release practices Coinbase applies to traditional software services. Agent graphs flow through CI/CD pipelines where deterministic components are unit tested, evaluation harnesses run against LLM nodes, and the complete system undergoes integration testing before production release.

The infrastructure supports rapid iteration—once the platform was established, the time to deploy a new agent dropped from quarters (12+ weeks) to days (under one week). This acceleration comes from reusable components, standardized patterns, and self-service tooling that reduces dependencies on specialized teams.

## Knowledge Management and RAG Infrastructure

The roadmap includes plans to build internal tooling that integrates content management platforms and document repositories with external data sources to construct a knowledge graph supporting various use cases. This suggests Coinbase is moving toward more sophisticated retrieval-augmented generation (RAG) architectures where agents can ground their responses in curated, up-to-date organizational knowledge.

Knowledge graphs provide several advantages over simpler vector database approaches. They can encode relationships between entities, support more sophisticated reasoning about connections, and enable more precise retrieval when queries require specific relational information. However, they also introduce complexity in construction and maintenance.

The mention of combining internal repositories with external data indicates agents will need to synthesize information across organizational boundaries, a common requirement in enterprise settings where decisions depend on both proprietary business data and public market information or regulatory guidance.

## Results and Business Impact

Within the six-week sprint, Coinbase achieved measurable outcomes across multiple dimensions. Two automations reached production and are delivering over 25 hours of time savings per week—a meaningful impact that frees human workers from repetitive tasks to focus on higher-value activities. Two additional agents were completed end-to-end in development, providing a near-term pipeline of additional automation.

Beyond individual automation wins, the team created the infrastructure and standards that enable organization-wide scaling. The published reference implementations and onboarding materials allow teams across Coinbase to build agents following proven patterns rather than reinventing solutions. The reduction in development time from 12+ weeks to under one week represents a roughly 12x acceleration, dramatically lowering the barrier to agent adoption.

The upskilling of more than half a dozen engineers to self-serve on agent development creates organizational capacity for sustained growth in automation. Rather than creating a bottleneck where all agent development must flow through a specialized team, Coinbase distributed the knowledge and tools needed for teams to build their own agents.

The company-wide adoption of their LangSmith implementation by Coinbase's central AI team demonstrates that the Tiger Team's infrastructure choices aligned with broader organizational standards, avoiding the fragmentation that often occurs when multiple teams independently build similar capabilities.

## Integration with Broader AI Strategy

The article positions this work as complementary to other AI initiatives at Coinbase rather than overlapping. The company has separate efforts in multi-agent decision support systems that augment internal decision documents with explainable analysis, and testing agents that autonomously execute scenarios and self-evaluate findings for quality engineering.

The Tiger Team's focus on "reliable, observable internal automations that interact with business systems" occupies a distinct niche—process automation that reduces manual toil in operational workflows. This suggests Coinbase is pursuing a portfolio approach to AI, with different teams tackling different problem spaces (decisioning, quality engineering, process automation) while presumably sharing underlying infrastructure and standards.

This specialization makes organizational sense—different AI use cases have different requirements, risk profiles, and success metrics. Decision support systems need to be explainable and provide evidence, but can tolerate human override. Testing agents need high coverage and recall but can accept some false positives if they make human review more efficient. Process automation agents need reliability and auditability to replace human execution of repetitive tasks.

## Critical Assessment and Tradeoffs

While the article presents Coinbase's approach positively, and the results appear genuine, it's worth considering tradeoffs and potential limitations. The code-first approach trades rapid prototyping velocity for production rigor. Teams that might have quickly validated an idea with low-code tools now face a steeper learning curve and longer time-to-first-prototype. For exploratory work where value is uncertain, this could slow innovation.

The heavy emphasis on observability, evaluation, and auditability creates operational overhead. Every trace, evaluation run, and audit record consumes storage and compute resources. The team clearly judged these costs worthwhile for regulatory compliance and operational confidence, but organizations in less regulated industries might find the investment disproportionate.

The six-week sprint timeline, while impressive, raises questions about sustainability. Sprints can mobilize focused effort but often depend on temporarily setting aside other responsibilities. Whether this pace is maintainable for ongoing agent development, or whether the six weeks represented a one-time investment to build infrastructure that now enables sustainable velocity, isn't entirely clear.

The claim that development time dropped from "quarters to days" is dramatic and would benefit from more specificity. What exactly constitutes a "complete" agent? Are we measuring time-to-first-deployment or time-to-production-ready-with-full-observability? The difference matters for assessing how replicable these results might be.

The article mentions using LLM-as-judge for evaluation but doesn't discuss potential pitfalls. Judge models can hallucinate, show bias toward outputs that match their own training distribution, or fail to catch subtle errors. Relying too heavily on automated evaluation without ongoing human spot-checking could create blind spots.

The roadmap mention of knowledge graphs suggests the current RAG infrastructure may be relatively simple. Knowledge graph construction is notoriously challenging, requiring significant effort in schema design, entity resolution, and ongoing maintenance. The timeline and resource requirements for this roadmap item are uncertain.

Finally, the article is authored by Coinbase and published on their blog, creating an inherent bias toward presenting their approach favorably. The standardized playbook and infrastructure are undoubtedly valuable, but we don't hear about failed experiments, agents that were retired, or ongoing challenges. A more balanced view would acknowledge what didn't work or areas where the team is still iterating.

## LLMOps Maturity and Lessons

Despite these caveats, Coinbase's approach demonstrates significant LLMOps maturity. The team has moved beyond treating LLMs as novel experiments and integrated them into production operations with appropriate engineering discipline. The emphasis on observability, evaluation, and auditability reflects lessons learned from traditional MLOps and software engineering, adapted to the specific challenges of large language models.

The standardization effort—creating reusable patterns, shared infrastructure, and self-service tooling—represents a key milestone in LLMOps maturity. Organizations often struggle to move from bespoke, one-off AI projects to systematic, scalable AI engineering. Coinbase's playbook and infrastructure investment directly address this challenge.

The choice of LangGraph and LangChain positions them within a major ecosystem with active development and community support, reducing the risk of being locked into a dead-end technology. The planned integration with AWS Bedrock similarly leverages managed services rather than building everything in-house, a pragmatic approach that balances control and operational overhead.

For other organizations considering enterprise AI agent development, Coinbase's experience suggests several lessons: invest in observability and evaluation infrastructure early, treat auditability as a first-class requirement in regulated environments, design human-in-the-loop as intentional and permanent rather than temporary, standardize patterns to enable scaling, and separate deterministic from probabilistic components to improve testability. The code-first versus low-code tradeoff will depend on organizational context, but for production operations at scale, the investment in engineering rigor appears justified.
