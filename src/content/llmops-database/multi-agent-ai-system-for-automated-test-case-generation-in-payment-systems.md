---
title: "Multi-Agent AI System for Automated Test Case Generation in Payment Systems"
slug: "multi-agent-ai-system-for-automated-test-case-generation-in-payment-systems"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "696a63f045d9e61ec0d28214"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-03T15:19:04.226Z"
  lastUpdated: "2026-01-16T16:16:30.271Z"
  createdOn: "2026-01-16T16:14:40.778Z"
llmopsTags:
  - "high-stakes-application"
  - "question-answering"
  - "data-analysis"
  - "structured-output"
  - "regulatory-compliance"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "semantic-search"
  - "documentation"
  - "orchestration"
  - "monitoring"
  - "open-source"
  - "fastapi"
  - "anthropic"
  - "amazon-aws"
industryTags: "finance"
company: "Amazon AMET Payments"
summary: "Amazon AMET Payments team developed SAARAM, a multi-agent AI solution using Amazon Bedrock with Claude Sonnet and Strands Agents SDK to automate test case generation for payment features across five Middle Eastern and North African countries. The manual process previously required one week of QA engineer effort per feature, consuming approximately one full-time employee annually. By implementing a human-centric approach that mirrors how experienced testers analyze requirements through specialized agents, the team reduced test case generation time from one week to hours while improving test coverage by 40% and reducing QA effort from 1.0 FTE to 0.2 FTE for validation activities."
link: "https://aws.amazon.com/blogs/machine-learning/how-the-amazon-amet-payments-team-accelerates-test-case-generation-with-strands-agents?tag=soumet-20"
year: 2026
seo:
  title: "Amazon AMET Payments: Multi-Agent AI System for Automated Test Case Generation in Payment Systems - ZenML LLMOps Database"
  description: "Amazon AMET Payments team developed SAARAM, a multi-agent AI solution using Amazon Bedrock with Claude Sonnet and Strands Agents SDK to automate test case generation for payment features across five Middle Eastern and North African countries. The manual process previously required one week of QA engineer effort per feature, consuming approximately one full-time employee annually. By implementing a human-centric approach that mirrors how experienced testers analyze requirements through specialized agents, the team reduced test case generation time from one week to hours while improving test coverage by 40% and reducing QA effort from 1.0 FTE to 0.2 FTE for validation activities."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-ai-system-for-automated-test-case-generation-in-payment-systems"
  ogTitle: "Amazon AMET Payments: Multi-Agent AI System for Automated Test Case Generation in Payment Systems - ZenML LLMOps Database"
  ogDescription: "Amazon AMET Payments team developed SAARAM, a multi-agent AI solution using Amazon Bedrock with Claude Sonnet and Strands Agents SDK to automate test case generation for payment features across five Middle Eastern and North African countries. The manual process previously required one week of QA engineer effort per feature, consuming approximately one full-time employee annually. By implementing a human-centric approach that mirrors how experienced testers analyze requirements through specialized agents, the team reduced test case generation time from one week to hours while improving test coverage by 40% and reducing QA effort from 1.0 FTE to 0.2 FTE for validation activities."
---

## Overview

Amazon AMET Payments team serves approximately 10 million customers monthly across five countries in the Middle East and North Africa region—UAE, Saudi Arabia, Egypt, Turkey, and South Africa. The team manages payment selections, transactions, experiences, and affordability features across these diverse regulatory environments, publishing an average of five new features monthly. Each feature traditionally required comprehensive test case generation consuming one week of manual effort per project, with QA engineers analyzing business requirement documents, design documents, UI mocks, and historical test preparations. This manual process required one full-time engineer annually merely for test case creation, representing a significant bottleneck in the product development cycle.

The team developed SAARAM (QA Lifecycle App), a multi-agent AI solution built on Amazon Bedrock with Claude Sonnet by Anthropic and the Strands Agents SDK. This system reduced test case generation time from one week to hours while improving test coverage quality by 40%. The solution demonstrates how studying human cognitive patterns rather than optimizing AI algorithms alone can create production-ready systems that enhance rather than replace human expertise.

## Problem Definition and Initial Challenges

The AMET Payments QA team validates code deployments affecting payment functionality for millions of customers across diverse regulatory environments and payment methods. The manual test case generation process added significant turnaround time in the product cycle, consuming valuable engineering resources on repetitive test preparation and documentation tasks rather than strategic testing initiatives. The team needed an automated solution that could maintain quality standards while reducing time investment.

Specific objectives included reducing test case creation time from one week to under a few hours, capturing institutional knowledge from experienced testers, standardizing testing approaches across teams, and minimizing hallucination issues common in AI systems. The solution needed to handle complex business requirements spanning multiple payment methods, regional regulations, and customer segments while generating specific, actionable test cases aligned with existing test management systems.

Initial attempts using conventional AI approaches failed to meet requirements. The team tried feeding entire business requirement documents to a single AI agent for test case generation, but this method frequently produced generic outputs like "verify payment works correctly" instead of specific, actionable test cases. The team needed test cases as specific as "verify that when a UAE customer selects cash on delivery for an order above 1,000 AED with a saved credit card, the system displays the COD fee of 11 AED and processes the payment through the COD gateway with order state transitioning to 'pending delivery.'"

The single-agent approach presented several critical limitations. Context length restrictions prevented processing large documents effectively, the lack of specialized processing phases meant the AI couldn't understand testing priorities or risk-based approaches, and hallucination issues created irrelevant test scenarios that could mislead QA efforts. The root cause was clear: AI attempted to compress complex business logic without the iterative thinking process that experienced testers employ when analyzing requirements.

## Human-Centric Breakthrough and Design Philosophy

The breakthrough came from a fundamental shift in approach. Instead of asking "How should AI think about testing?", the team asked "How do experienced humans think about testing?" This philosophy change led to research interviews with senior QA professionals, studying their cognitive workflows in detail.

The team discovered that experienced testers don't process documents holistically—they work through specialized mental phases. First, they analyze documents by extracting acceptance criteria, identifying customer journeys, understanding UX requirements, mapping product requirements, analyzing user data, and assessing workstream capabilities. Then they develop tests through a systematic process: journey analysis, scenario identification, data flow mapping, test case development, and finally organization and prioritization.

The team decomposed the original agent into sequential thinking actions that served as individual steps, building and testing each step using Amazon Q Developer for CLI to ensure basic ideas were sound and incorporated both primary and secondary inputs. This insight led to designing SAARAM with specialized agents that mirror expert testing approaches, with each agent focusing on a specific aspect of the testing process.

## Multi-Agent Architecture Evolution

The team initially attempted to build agents from scratch, creating custom looping, serial, or parallel execution logic, as well as their own orchestration and workflow graphs, which demanded considerable manual effort. To address these challenges, they migrated to Strands Agents SDK, which provided multi-agent orchestration capabilities essential for coordinating complex, interdependent tasks while maintaining clear execution paths, improving performance and reducing development time.

### Workflow Iteration 1: End-to-End Test Generation

The first iteration of SAARAM consisted of a single input and created specialized agents. It involved processing a work document through five specialized agents to generate comprehensive test coverage.

Agent 1, the Customer Segment Creator, focused on customer segmentation analysis using four subagents: Customer Segment Discovery identified product user segments, Decision Matrix Generator created parameter-based matrices, E2E Scenario Creation developed end-to-end scenarios per segment, and Test Steps Generation created detailed test case development.

Agent 2, the User Journey Mapper, employed four subagents to map product journeys comprehensively: Flow Diagram and Sequence Diagram creators using Mermaid syntax, E2E Scenarios generator building upon these diagrams, and Test Steps Generator for detailed test documentation.

Agent 3, Customer Segment x Journey Coverage, combined inputs from agents 1 and 2 to create detailed segment-specific analyses using four subagents: Mermaid-based flow diagrams, user journeys, sequence diagrams for each customer segment, and corresponding test steps.

Agent 4, the State Transition Agent, analyzed various product state points in customer journey flows. Its subagents created Mermaid state diagrams representing different journey states, segment-specific state scenario diagrams, and generated related test scenarios and steps.

The workflow concluded with a basic extract, transform, and load process that consolidated and deduplicated data from the agents, saving the final output as a text file. This systematic approach facilitated comprehensive coverage of customer journeys, segments, and various diagram types, enabling thorough test coverage generation through iterative processing by agents and subagents.

### Limitations of Iteration 1

The first workflow faced five crucial limitations. Context and hallucination challenges arose from segregated agent operations where individual agents independently collected data and created visual representations, leading to limited contextual understanding and increased hallucinations. Data generation inefficiencies resulted from limited context causing excessive irrelevant data generation. Restricted parsing capabilities limited the system to only customer segments, journey mapping, and basic requirements. Single-source input constraint meant the workflow could only process Word documents, creating a significant bottleneck. Finally, rigid architecture problems from tightly coupled systems with rigid orchestration made it difficult to modify, extend, or reuse components.

### Workflow Iteration 2: Comprehensive Analysis Workflow

The second iteration represents a complete reimagining of the agentic workflow architecture with modularity, context-awareness, and extensibility as core principles.

Agent 1, the intelligent gateway File Type Decision agent, serves as the system's entry point and router. Processing documentation files, Figma designs, and code repositories, it categorizes and directs data to appropriate downstream agents. This intelligent routing is essential for maintaining both efficiency and accuracy throughout the workflow.

Agent 2, the Data Extractor agent, employs six specialized subagents focused on specific extraction domains. This parallel processing approach facilitates thorough coverage while maintaining practical speed. Each subagent operates with domain-specific knowledge, extracting nuanced information that generalized approaches might overlook.

Agent 3, the Visualizer agent, transforms extracted data into six distinct Mermaid diagram types, each serving specific analytical purposes: entity relation diagrams mapping data relationships and structures, flow diagrams visualizing processes and workflows, requirement diagrams clarifying product specifications, UX requirement visualizations illustrating user experience flows, process flow diagrams detailing system operations, and mind maps revealing feature relationships and hierarchies. These visualizations provide multiple perspectives on the same information, helping both human reviewers and downstream agents understand patterns and connections within complex datasets.

Agent 4, the Data Condenser agent, performs crucial synthesis through intelligent context distillation, ensuring each downstream agent receives exactly the information needed for its specialized task. This agent, powered by its condensed information generator, merges outputs from both the Data Extractor and Visualizer agents while performing sophisticated analysis. The agent extracts critical elements from the full text context—acceptance criteria, business rules, customer segments, and edge cases—creating structured summaries that preserve essential details while reducing token usage. It compares each text file with its corresponding Mermaid diagram, capturing information that might be missed in visual representations alone. This careful processing maintains information integrity across agent handoffs, ensuring important data is not lost as it flows through the system. The result is a set of condensed addendums that enrich the Mermaid diagrams with comprehensive context.

Agent 5, the Test Generator agent, brings together the collected, visualized, and condensed information to produce comprehensive test suites. Working with six Mermaid diagrams plus condensed information from Agent 4, this agent employs a pipeline of five subagents. The Journey Analysis Mapper, Scenario Identification Agent, and Data Flow Mapping subagents generate comprehensive test cases based on their interpretation of the input data flowing from Agent 4. With test cases generated across three critical perspectives, the Test Cases Generator evaluates them, reformatting according to internal guidelines for consistency. Finally, the Test Suite Organizer performs deduplication and optimization, delivering a final test suite that balances comprehensiveness with efficiency.

The system now handles far more than the basic requirements and journey mapping of Workflow 1—it processes product requirements, UX specifications, acceptance criteria, and workstream extraction while accepting inputs from Figma designs, code repositories, and multiple document types. Most importantly, the shift to modular architecture fundamentally changed how the system operates and evolves, allowing for reusing outputs from earlier agents, integrating new testing type agents, and intelligently selecting test case generators based on user requirements.

## Critical LLMOps Features and Implementation

### Structured Outputs with Pydantic

The structured output feature of Strands Agents uses Pydantic models to transform traditionally unpredictable LLM outputs into reliable, type-safe responses. This approach addresses a fundamental challenge in generative AI: although LLMs excel at producing human-like text, they can struggle with consistently formatted outputs needed for production systems. By enforcing schemas through Pydantic validation, the team ensures that responses conform to predefined structures, enabling seamless integration with existing test management systems.

The implementation demonstrates how structured outputs work in practice. The team defines structured output schemas using Pydantic BaseModel classes with fields describing test case names, priorities (P0, P1, or P2), and categories. Agent tools with validation parse and validate Claude's JSON output, automatically validating LLM responses against defined schemas to facilitate type correctness and required field presence. When responses don't match the expected structure, validation errors provide clear feedback about what needs correction, helping prevent malformed data from propagating through the system.

In the production environment, this approach delivered consistent, predictable outputs across agents regardless of prompt variations or model updates, minimizing an entire class of data formatting errors. The development team worked more efficiently with full IDE support for type-checking and autocomplete functionality.

### Workflow Orchestration

The Strands Agents workflow architecture provided sophisticated coordination capabilities the multi-agent system required. The framework enabled structured coordination with explicit task definitions, automatic parallel execution for independent tasks, and sequential processing for dependent operations. This meant the team could build complex agent-to-agent communication patterns that would have been difficult to implement manually.

The workflow system delivered three critical capabilities. First, parallel processing optimization allowed journey analysis, scenario identification, and coverage analysis to run simultaneously, with independent agents processing different aspects without blocking each other. The system automatically allocated resources based on availability, maximizing throughput.

Second, intelligent dependency management ensured that test development waited for scenario identification to be completed, and organization tasks depended on test cases being generated. Context was preserved and passed efficiently between dependent stages, maintaining information integrity throughout the workflow.

Finally, built-in reliability features provided the resilience the system required. Automatic retry mechanisms handled transient failures gracefully, state persistence enabled pause and resume capabilities for long-running workflows, and comprehensive audit logging supported both debugging and performance optimization efforts.

The workflow implementation shows a comprehensive example with structured output tasks organized into phases. Phase 1 includes parallel execution with no dependencies for journey analysis, scenario identification, and data flow mapping. Phase 2 waits for the first three tasks to complete before proceeding to test case development. Phase 3 waits for test case development to complete before organizing the final test suite. Each task specifies model settings including temperature parameters, system prompts, structured output models, priorities, and timeouts.

### Integration with Amazon Bedrock

Amazon Bedrock served as the foundation for AI capabilities, providing seamless access to Claude Sonnet by Anthropic through the Strands Agents built-in AWS service integration. The team selected Claude Sonnet by Anthropic for its exceptional reasoning capabilities and ability to understand complex payment domain requirements. The Strands Agents flexible LLM API integration made this implementation straightforward.

The managed service architecture of Amazon Bedrock reduced infrastructure complexity from deployment. The service provided automatic scaling that adjusted to workload demands, facilitating consistent performance across agents regardless of traffic patterns. Built-in retry logic and error handling improved system reliability significantly, reducing the operational overhead typically associated with managing AI infrastructure at scale.

## Results and Business Impact

The implementation of SAARAM improved QA processes with measurable improvements across multiple dimensions. Test case generation time was potentially reduced from one week to hours. Resource optimization decreased QA effort from 1.0 FTE to 0.2 FTE for validation. Coverage improvement identified 40% more edge cases compared to the manual process. Consistency achieved 100% adherence to test case standards and formats.

The accelerated test case generation drove improvements in core business metrics. Payment success rate increased through comprehensive edge case testing and risk-based test prioritization. Payment experience showed enhanced customer satisfaction because teams can now iterate on test coverage during the design phase. Developer velocity improved as product and development teams generate preliminary test cases during design, enabling early quality feedback.

SAARAM captures and preserves institutional knowledge that was previously dependent on individual QA engineers. Testing patterns from experienced professionals are now codified. Historical test case learnings are automatically applied to new features. Consistent testing approaches exist across different payment methods and industries. Reduced onboarding time for new QA team members means iterative improvement and the system becoming more valuable over time.

## Key Lessons Learned

The breakthrough came from studying how domain experts think rather than optimizing how AI processes information. Understanding the cognitive patterns of testers and QA professionals led to an architecture that naturally aligns with human reasoning. This approach produced better results compared to purely technical optimizations. Organizations building similar systems should invest time observing and interviewing domain experts before designing AI architecture—the insights gained directly translate to more effective agent design.

Breaking complex tasks into specialized agents dramatically improved both accuracy and reliability. The multi-agent architecture, enabled by the orchestration capabilities of Strands Agents, handles nuances that monolithic approaches consistently miss. Each agent's focused responsibility enables deeper domain expertise while providing better error isolation and debugging capabilities.

A key discovery was that the Strands Agents workflow and graph-based orchestration patterns significantly outperformed traditional supervisor agent approaches. Although supervisor agents make dynamic routing decisions that can introduce variability, workflows provide "agents on rails"—a structured path facilitating consistent, reproducible results. Strands Agents offers multiple patterns including supervisor-based routing, workflow orchestration for sequential processing with dependencies, and graph-based coordination for complex scenarios. For test generation where consistency is paramount, the workflow pattern with its explicit task dependencies and parallel execution capabilities delivered the optimal balance of flexibility and control.

Implementing Pydantic models through the Strands Agents structured output feature effectively reduced type-related hallucinations in the system. By enforcing AI responses to conform to strict schemas, the team facilitates reliable, programmatically usable outputs. This approach has proven essential when consistency and reliability are nonnegotiable. The type-safe responses and automatic validation have become foundational to the system's reliability.

The condensed information generator pattern demonstrates how intelligent context management maintains quality throughout multistage processing. This approach of knowing what to preserve, condense, and pass between agents helps prevent the context degradation that typically occurs in token-limited environments. The pattern is broadly applicable to multistage AI systems facing similar constraints.

## Future Directions

The modular architecture built with Strands Agents enables straightforward adaptation to other domains within Amazon. The same patterns that generate payment test cases can be applied to retail systems testing, customer service scenario generation for support workflows, and mobile application UI and UX test case generation. Each adaptation requires only domain-specific prompts and schemas while reusing the core orchestration logic.

One critical gap remains: the system hasn't yet been provided with examples of what high-quality test cases actually look like in practice. To bridge this gap, integrating Amazon Bedrock Knowledge Bases with a curated repository of historical test cases would provide SAARAM with concrete, real-world examples during the generation process. By using the integration capabilities of Strands Agents with Amazon Bedrock Knowledge Bases, the system could search through past successful test cases to find similar scenarios before generating new ones. When processing a business requirement document for a new payment feature, SAARAM would first query the knowledge base for comparable test cases—whether for similar payment methods, customer segments, or transaction flows—and use these as contextual examples to guide its output.

Future deployment will use Amazon Bedrock AgentCore for comprehensive agent lifecycle management. Amazon Bedrock AgentCore Runtime provides the production execution environment with ephemeral, session-specific state management that maintains conversational context during active sessions while facilitating isolation between different user interactions. The observability capabilities of Bedrock AgentCore help deliver detailed visualizations of each step in SAARAM's multi-agent workflow, which the team can use to trace execution paths through the five agents, audit intermediate outputs from the Data Condenser and Test Generator agents, and identify performance bottlenecks through real-time dashboards powered by Amazon CloudWatch with standardized OpenTelemetry-compatible telemetry.

The service enables several advanced capabilities essential for production deployment: centralized agent management and versioning through the Amazon Bedrock AgentCore control plane, A/B testing of different workflow strategies and prompt variations across the five subagents within the Test Generator, performance monitoring with metrics tracking token usage and latency across the parallel execution phases, automated agent updates without disrupting active test generation workflows, and session persistence for maintaining context when QA engineers iteratively refine test suite outputs. This integration positions SAARAM for enterprise-scale deployment while providing the operational visibility and reliability controls that transform it from a proof of concept into a production system capable of handling the AMET team's ambitious goal of expanding beyond Payments QA to serve the broader organization.

## Critical Analysis

While the case study presents impressive results, several aspects warrant careful consideration. The claim of reducing test case generation from one week to hours is significant, but the document doesn't provide detailed metrics on the quality comparison beyond the 40% increase in edge case identification. The validation effort of 0.2 FTE suggests human oversight remains essential, indicating the system augments rather than replaces human expertise—a balanced and appropriate approach.

The evolution from Iteration 1 to Iteration 2 demonstrates genuine learning and problem-solving, with the team transparently documenting limitations and how they addressed them. The emphasis on structured outputs using Pydantic models represents a practical solution to hallucination problems, though the degree of hallucination reduction isn't quantified beyond describing it as "effective."

The human-centric design philosophy of studying how experienced testers think represents a sophisticated approach to AI system design, moving beyond purely technical optimization. However, the generalizability of this approach to other domains remains to be proven through actual deployments beyond the Payments QA team.

The planned integration with Amazon Bedrock Knowledge Bases and AgentCore suggests the system is still evolving toward a more complete production solution, with important capabilities like example-based generation and comprehensive observability still in development stages. The case study represents a thoughtful, iterative approach to building production LLM systems with clear acknowledgment of both achievements and remaining challenges.