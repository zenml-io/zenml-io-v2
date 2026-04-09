---
title: "Building a Platform for Agentic AI in Clinical Trial Operations"
slug: "building-a-platform-for-agentic-ai-in-clinical-trial-operations"
draft: false
llmopsTags:
  - "healthcare"
  - "regulatory-compliance"
  - "document-processing"
  - "data-analysis"
  - "classification"
  - "question-answering"
  - "high-stakes-application"
  - "structured-output"
  - "multi-modality"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "semantic-search"
  - "vector-search"
  - "mcp"
  - "evals"
  - "few-shot"
  - "system-prompts"
  - "chunking"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "langchain"
  - "postgresql"
  - "redis"
  - "cache"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "anthropic"
  - "openai"
  - "microsoft-azure"
industryTags: "healthcare"
company: "Medable"
summary: "Medable developed Agent Studio, a comprehensive platform for deploying AI agents in clinical trial operations to address the lengthy drug approval process that currently takes over 10 years. The platform enables both internal teams and customers to build configurable multi-agent systems that tackle problems like document classification in electronic trial master files and clinical research monitoring across multiple data systems. By taking a platform-first approach with support for model-agnostic agents, RAG knowledge integration, MCP connectors, workflow functionality, and robust evaluation frameworks, Medable has deployed multiple agentic applications that help clinical research associates process over 80,000 documents per year and monitor data across 13+ disparate systems, with the ambitious goal of reducing clinical trial timelines from 10 years to one year."
link: "https://www.youtube.com/watch?v=0DDCloT-hfk"
year: 2026
seo:
  title: "Medable: Building a Platform for Agentic AI in Clinical Trial Operations - ZenML LLMOps Database"
  description: "Medable developed Agent Studio, a comprehensive platform for deploying AI agents in clinical trial operations to address the lengthy drug approval process that currently takes over 10 years. The platform enables both internal teams and customers to build configurable multi-agent systems that tackle problems like document classification in electronic trial master files and clinical research monitoring across multiple data systems. By taking a platform-first approach with support for model-agnostic agents, RAG knowledge integration, MCP connectors, workflow functionality, and robust evaluation frameworks, Medable has deployed multiple agentic applications that help clinical research associates process over 80,000 documents per year and monitor data across 13+ disparate systems, with the ambitious goal of reducing clinical trial timelines from 10 years to one year."
  canonical: "https://www.zenml.io/llmops-database/building-a-platform-for-agentic-ai-in-clinical-trial-operations"
  ogTitle: "Medable: Building a Platform for Agentic AI in Clinical Trial Operations - ZenML LLMOps Database"
  ogDescription: "Medable developed Agent Studio, a comprehensive platform for deploying AI agents in clinical trial operations to address the lengthy drug approval process that currently takes over 10 years. The platform enables both internal teams and customers to build configurable multi-agent systems that tackle problems like document classification in electronic trial master files and clinical research monitoring across multiple data systems. By taking a platform-first approach with support for model-agnostic agents, RAG knowledge integration, MCP connectors, workflow functionality, and robust evaluation frameworks, Medable has deployed multiple agentic applications that help clinical research associates process over 80,000 documents per year and monitor data across 13+ disparate systems, with the ambitious goal of reducing clinical trial timelines from 10 years to one year."
notion:
  pageId: "32ef8dff-2538-8082-ac20-eec2791c729e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-03-25T19:18:00.000Z"
  lastEditedTime: "2026-03-25T19:18:00.000Z"
  publishedAt: "2026-04-09T17:56:50Z"
---

Medable is a healthcare technology company focused on accelerating clinical trials, which currently take over 10 years to bring drugs to market. The company has operated for over 10 years supporting clinical assessments and electronic consent processes, enabling patients who don't live near clinical sites to participate in trials. They support over 100 languages and clinical sites globally. The company has developed a comprehensive AI agent platform called Agent Studio that powers multiple agentic applications while also serving as a platform for customers to build their own agents.

## Platform Architecture and Approach

Medable took a deliberate platform-first approach to building their agentic AI capabilities, which aligns with their historical approach as a SaaS platform company. They began exploring agent capabilities approximately two years before February 2026, with the core Agent Studio platform taking shape about a year prior to that date. The platform was built to support both internal product development and customer-deployed solutions, creating a unified foundation for agent development across the organization.

The Agent Studio platform provides several key capabilities. It supports model-agnostic configurations, allowing users to bring their own models or use any flagship model available. The platform integrates RAG knowledge management with a breadth of MCP connectors to interface with different data systems. It implements workflow functionality and agent skills, following patterns developed by Anthropic to manage context windows more precisely. The platform supports multiple trigger mechanisms beyond just chat interfaces, including Microsoft Teams, Slack, and webhook-based triggers that don't require direct human initiation.

The platform is designed for configuration by common users, not just engineers, though the team acknowledges that many customers still require support through forward-deployed engineers or services teams. The deployment model creates isolated environments for each customer, where Medable acts as the data processor, maintaining the same security and isolation principles they've used throughout their existence as a platform company.

## Multi-Agent Applications

Medable has deployed multiple agentic applications built on the Agent Studio platform. The first major application is the Electronic Trial Master File system, which addresses document classification challenges. Clinical trials generate tens of thousands of documents per month per study, and users historically spent at least 5 minutes per document assigning classifications and metadata from over 350 possible classifications. The ETMF agentic application uses AI to automate classification and metadata assignment, starting with human-in-the-loop review to build trust and validate accuracy.

The second major application is the Clinical Research Associate agent, which helps CRAs monitor trial data. CRAs, numbering over 1,300 at large sponsors or contract research organizations, must navigate 13 or more different systems to understand trial progress, data quality, and patient safety risks. The CRA agent connects these disparate data sources, surfaces information in understandable formats, and provides recommended actions that legacy systems cannot offer. The agent can take actions on behalf of humans with appropriate human-in-the-loop oversight.

Both applications represent agentic-powered systems rather than single agents. They comprise ecosystems of orchestrating agents working together, combined with traditional frontend experiences and databases. The architecture breaks down complex problems into smaller, purpose-built agents that handle specific tasks efficiently.

## Agent Development and Configuration

The agent development process follows a versioned approach where each agent iteration goes through a draft process, evaluation development, and publishing workflow. When building agents, developers configure which model to use, define system prompts, attach relevant knowledge bases, and specify which skills and MCP connectors the agent needs. The platform tracks all versions, allowing teams to experiment with different configurations while maintaining production stability.

A key design challenge involves helping users decide how to structure agent capabilities. Users must determine what goes in system prompts versus skills versus knowledge bases. The team is actively working toward a future where users describe their problem and the platform recommends the right agent configuration, potentially even building the agent automatically using meta-agents.

The platform supports agent skills following the protocol Anthropic developed, and even includes a feature to generate skills on the platform itself. This standardization helps reduce onboarding friction for users familiar with these patterns and promotes interoperability. Before MCP and skills protocols existed, Medable had built similar systems for generic tooling integration, but they quickly adopted the MCP protocol when it became available because it accelerated their development and allowed external contributions.

## Knowledge Management and Data Architecture

Medable faces significant data retrieval challenges given the volume and complexity of clinical trial data. They are building an AI data layer that aligns multiple systems into a common ontology, making it easier for agents to work across disparate sources. This ontology mapping is crucial because the same concepts like "participant" appear across different systems with different terminology. The data layer uses AI to map data sources to pre-built ontologies, potentially with human-in-the-loop validation for uncertain mappings.

The platform supports multiple data access patterns rather than prescribing a single approach. For simple use cases, customers can create vector pools by uploading documents and connecting them to agents, instantly creating domain experts. For complex scenarios, the platform supports hierarchical data structures with layers of summarization, agentic RAG where agents navigate through markdown files to find information, and just-in-time data retrieval through MCP connectors.

The team has learned that no single retrieval approach works for all use cases. Embeddings and vector databases work well in some situations, while keyword search, markdown file navigation, or structured queries work better in others. They're working toward codifying rules about which retrieval mechanisms work best for different data characteristics, enabling better automatic recommendations for customers.

## MCP Implementation and Context Management

Medable builds most of their own MCP servers rather than relying on third-party implementations. They've wrapped MCP with their own authentication layer so that all MCP invocations pass through their security mechanisms. When users access third-party systems through MCP servers, they authenticate with their own credentials rather than super-user access, maintaining security boundaries appropriate for clinical trial data.

They create MCP servers as reusable components that customers can configure with their own security credentials. Once an MCP server is created for a system, any customer can instantiate their own version with their specific client IDs, secrets, and credential mechanisms. This pattern allows Medable to build integrations once while enabling customer-specific deployments.

Context window management is a critical challenge when working with multiple MCP servers containing many tools. Medable employs several strategies to address this. First, when configuring agents with MCP servers, users can manually filter which tools from a server appear in the agent's context, selecting only the three tools they need from a server offering 20.

Second, the platform automatically employs a subagent filter when the tool count exceeds certain thresholds. This smaller model examines the user's request and the available tools, then passes only the relevant tools to the main agent for decision-making. This prefiltering reduces context bloat while maintaining access to necessary capabilities.

Third, the team strongly advises against attaching all 13 data system connectors to a single agent. Instead, they recommend subagent structures where task-specific agents maintain smaller, focused context windows and coordinate to accomplish larger objectives.

Fourth, when building MCP servers for external tools, they've learned they're at the mercy of vendor API quality. If a vendor lacks robust querying mechanisms, the agent will struggle and waste context window space iterating to find the right query. To address this, they augment MCPs with agent skills that prime the agent with knowledge about how to effectively navigate specific systems, providing query structure guidance that improves efficiency.

## Evaluation and Quality Assurance

Medable has built evaluation mechanisms directly into the Agent Studio platform, treating evaluation as a core platform capability rather than an afterthought. Their evaluation framework goes beyond assessing response relevance and accuracy to also validate that agents call the correct tools in the proper sequence. This comprehensive approach supports their benchmarking mechanisms that compare different agent configurations.

The evaluation system enables teams to create test suites that compare performance across model choices, system prompt variations, knowledge base configurations, and other parameters. This experimentation framework is essential for landing on configurations that meet customer requirements and regulatory standards.

Evaluations exist at multiple levels. At the platform level, they provide out-of-the-box evaluations that represent global expectations for agent behavior. At the customer level, evaluations can be specific to particular business rules, such as triggering notifications when 10 records meet certain criteria. The team is actively developing capabilities to automatically generate customer-specific evaluations based on the rules encoded in their agents.

For the ETMF application, they leveraged a golden dataset of over 2,000 documents with known correct classifications. Running the agent against this dataset before launch allowed them to monitor accuracy and build customer trust. Once deployed with human-in-the-loop review, they continuously monitor which recommendations humans accept or reject.

A sophisticated challenge they face is that humans aren't always correct. In the document classification scenario, users sometimes assign wrong classifications, which only becomes apparent years later during audits. Rather than treating human corrections as automatic ground truth, they analyze deltas between agent recommendations and human choices, working closely with customers to determine which is actually correct based on documented rules. This analysis feeds back into agent improvements through system prompt refinements or knowledge base enhancements.

Evaluations serve as critical stage gates in the agent deployment process, ensuring agents are validatable and GXP-compliant before reaching end users. The platform runs evaluations on regular frequencies even after deployment to detect if responses drift over time, creating an ongoing quality monitoring system.

## Regulatory Compliance and Validation

Operating in the clinical trial space requires adherence to Good Clinical Practice and related GXP standards that regulatory bodies like the FDA use to assess systems. This has been core to Medable's operations throughout their existence, though historically it created significant friction in their development process, sometimes requiring an entire quarter to release new features due to documentation requirements.

Over time, they've refined their validation processes to move faster while maintaining compliance. The agent platform follows the same validation patterns as their other software products. Regulatory bodies require traceability from intent through design specification to test evidence. Every feature and capability in Agent Studio follows this pattern, creating a validated foundation.

When customers build agents on the validated platform, those agents also require validation. The agents must be built to a specific intent with design specifications and proof that they perform as expected. The evaluation framework becomes crucial here, serving as evidence that agents do what they're designed to do.

The team emphasizes that proper AI solutions involve much more than just sprinkling AI magic dust on problems. The overall solution architecture includes many purpose-built, deterministic components, with the probabilistic AI serving as connective tissue that translates between systems and provides a better human interface. This hybrid approach makes outputs more consistent and systems more validatable.

Rather than comparing agents to perfect deterministic systems, they compare them to human performance. Humans make errors too, so the goal is achieving less variance in errors than humans while accelerating accuracy and throughput. This framing helps navigate regulatory discussions and customer expectations.

## User Experience and Adoption

Medable faces the challenge of enabling non-technical users to configure agents while the technology itself is still rapidly evolving. They've experimented with providing an agent within the agent-building interface that users can consult about the agent they're building, offering contextual guidance for harder decisions.

For customers lacking the expertise to make technical decisions about tool selection or configuration, Medable provides forward-deployed engineers who act as sherpas guiding customers through adoption and cultural change. They've had success with users who have some familiarity with agentic concepts from tools like n8n or Cursor. In one case, a business-side user with basic agent awareness received a 40-minute onboarding, went away for a month, then returned and built his own ecosystem of agents in a 70-minute session without encountering bugs. He envisioned integrating agents with Microsoft Teams differently than Medable had shown him, demonstrating the platform's flexibility.

The team acknowledges there are two deployment mechanisms: providing direct Agent Studio access to sophisticated customers who want to build their own agents, and providing fully hosted agentic applications maintained by Medable for customers who want out-of-the-box solutions. This flexibility accommodates different customer sizes and technical capabilities.

Looking toward the future, they envision an AI admin role that can accept recommended improvements from agents with human-in-the-loop approval, enabling continuous refinement of agentic applications based on operational learnings.

## Technical Learning and Adaptation

The team working on Agent Studio comes from diverse backgrounds without deep machine learning specialization. They've learned through reading latest papers, watching YouTube videos, and rapid experimentation. The team lead Luke has a background in biomedical engineering and life sciences with some machine learning exposure in research, but working with modern agentic AI required extensive self-learning. Principal architect Faker similarly adopted a researcher mindset that made him an early adopter of advancing AI capabilities within Medable.

The environment at Medable strongly encourages experimentation to understand limits and possibilities. The team couldn't rely on books because the technology advances too quickly, requiring staying current with releases and research papers published recently. This rapid learning environment reflects the broader industry moment where teams are figuring out LLMOps practices in real-time.

For the design team, tools like agentic AI and Claude Code have become central to their process, enabling faster learning and prototyping despite being a small, nimble team. The rapid evolution of tools and techniques requires continuous adaptation.

## Future Direction

Medable's CEO released a paper on "full self-driving" for clinical trials, articulating their ambitious vision. Rather than having masses of humans manually monitoring single data points, they envision an end-to-end clinical trial process augmented by agent workers. With 10,000 uncured illnesses that would take 200 years to address at current pace, the goal isn't reducing human involvement but enabling humans to support more clinical operations simultaneously.

They're starting with specific use cases where problems are obviously suited to their agent platform, but plan to evolve toward comprehensive agentic-powered applications with full end-to-end workflows for each relevant persona in clinical trials. The ultimate goal is reducing the clinical trial timeline from 10 years to one year, which would dramatically accelerate therapy development for patients.

The platform approach positions them well for this evolution. Each new solution builds on platform capabilities, making subsequent solutions easier to deliver. As they codify learnings about data retrieval patterns, agent configurations, and evaluation strategies into the platform itself, they enable faster development of new applications while maintaining the quality and compliance standards required in healthcare.
