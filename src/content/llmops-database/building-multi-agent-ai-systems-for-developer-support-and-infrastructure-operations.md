---
title: "Building Multi-Agent AI Systems for Developer Support and Infrastructure Operations"
slug: "building-multi-agent-ai-systems-for-developer-support-and-infrastructure-operations"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6911f371323cb3d674403647"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:26:35.651Z"
  createdOn: "2025-11-10T14:15:13.775Z"
llmopsTags:
  - "customer-support"
  - "code-interpretation"
  - "data-analysis"
  - "poc"
  - "rag"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "semantic-search"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "monitoring"
  - "databases"
  - "cicd"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "langchain"
  - "crewai"
  - "serverless"
  - "cache"
  - "scalability"
  - "reliability"
  - "security"
  - "compliance"
  - "amazon-aws"
  - "anthropic"
industryTags: "tech"
company: "Electrolux"
summary: "Electrolux, a Swedish home appliances manufacturer with over 100 years of history, developed \"Infra Assistant,\" an AI-powered multi-agent system to support their internal development teams and reduce bottlenecks in their platform engineering organization. The company faced challenges with their small Site Reliability Engineering (SRE) team being overwhelmed with repetitive support requests via Slack channels. Using Amazon Bedrock agents with both retrieval-augmented generation (RAG) and multi-agent collaboration patterns, they built a sophisticated system that answers questions based on organizational documentation, executes operations via API integrations, and can even troubleshoot cloud infrastructure issues autonomously. The system has proven cost-efficient compared to manual effort, successfully handles repetitive tasks like access management, and provides context-aware responses by accessing multiple organizational knowledge sources, though challenges remain around response latency and achieving consistent accuracy across all interactions."
link: "https://www.youtube.com/watch?v=kHjsWSaOFS8"
year: 2025
seo:
  title: "Electrolux: Building Multi-Agent AI Systems for Developer Support and Infrastructure Operations - ZenML LLMOps Database"
  description: "Electrolux, a Swedish home appliances manufacturer with over 100 years of history, developed \"Infra Assistant,\" an AI-powered multi-agent system to support their internal development teams and reduce bottlenecks in their platform engineering organization. The company faced challenges with their small Site Reliability Engineering (SRE) team being overwhelmed with repetitive support requests via Slack channels. Using Amazon Bedrock agents with both retrieval-augmented generation (RAG) and multi-agent collaboration patterns, they built a sophisticated system that answers questions based on organizational documentation, executes operations via API integrations, and can even troubleshoot cloud infrastructure issues autonomously. The system has proven cost-efficient compared to manual effort, successfully handles repetitive tasks like access management, and provides context-aware responses by accessing multiple organizational knowledge sources, though challenges remain around response latency and achieving consistent accuracy across all interactions."
  canonical: "https://www.zenml.io/llmops-database/building-multi-agent-ai-systems-for-developer-support-and-infrastructure-operations"
  ogTitle: "Electrolux: Building Multi-Agent AI Systems for Developer Support and Infrastructure Operations - ZenML LLMOps Database"
  ogDescription: "Electrolux, a Swedish home appliances manufacturer with over 100 years of history, developed \"Infra Assistant,\" an AI-powered multi-agent system to support their internal development teams and reduce bottlenecks in their platform engineering organization. The company faced challenges with their small Site Reliability Engineering (SRE) team being overwhelmed with repetitive support requests via Slack channels. Using Amazon Bedrock agents with both retrieval-augmented generation (RAG) and multi-agent collaboration patterns, they built a sophisticated system that answers questions based on organizational documentation, executes operations via API integrations, and can even troubleshoot cloud infrastructure issues autonomously. The system has proven cost-efficient compared to manual effort, successfully handles repetitive tasks like access management, and provides context-aware responses by accessing multiple organizational knowledge sources, though challenges remain around response latency and achieving consistent accuracy across all interactions."
---

## Overview

Electrolux, the Swedish home appliances manufacturer that sells approximately 60 million connected smart appliances annually, embarked on building a sophisticated multi-agent AI system to address operational challenges within their Digital Experience organization. The case study was presented by Alina and Marcus, both Site Reliability Engineers working in Electrolux's platform team, alongside Talha from AWS who leads agent adoption across the EMEA region. This presents an interesting real-world example of how a manufacturing company with strong digital operations is leveraging LLM-based agents in production to improve internal developer support and platform operations.

The platform team at Electrolux operates as a DevOps/SRE function that builds an internal developer platform providing self-service infrastructure provisioning, access management, and third-party tool integration. By nature of this role, they became the primary interface for their organization to cloud services and various tools. Developers would reach out via a Slack channel called "#SRE" whenever they needed help with infrastructure issues, policy questions, or access requests. On normal days, the team managed the volume adequately, but during peak periods, the small team risked becoming a significant bottleneck. Rather than expanding headcount through traditional hiring, they explored whether AI agents could augment their capacity.

## Problem Statement and Initial Requirements

The team identified several key requirements for what they called "Infra Assistant," their digital team member. First, they needed the system to answer questions not based on generic knowledge but tailored specifically to their organizational setup and terminology. Second, they wanted the agent to execute actual operations beyond just conversation—performing actions like provisioning resources or managing access. Third, they required trustworthiness where they wouldn't need to constantly verify every answer the agent provided. Finally, they wanted the agent to maintain appropriate tone and be helpful rather than appearing arrogant or rude, recognizing that developer experience matters in internal tooling.

## Technical Architecture Evolution

### Phase 1: RAG-Based Knowledge Agent (MVP)

For their initial proof of concept, Electrolux focused on the first two requirements: question answering on a custom knowledge base. They implemented this using Amazon Bedrock's knowledge-based agent capabilities, which enabled them to build a retrieval-augmented generation (RAG) pattern. The architecture involved several key components where Electrolux was responsible for the consumer-facing service interface and managing the knowledge base data (including cleaning and preprocessing), while AWS Bedrock handled the heavy lifting of hosting embedding models, large language models, and storing vectors.

An important feature they highlighted was that responses included references to source documentation or previous Slack conversations, providing users with an additional evaluation mechanism to verify that answers weren't hallucinated but grounded in actual organizational documentation. This reference system became crucial for building trust with developers using the system. The team noted that their "spiritual animal" was a bird (shown in their architecture diagrams), which added personality to the system.

When developers asked questions like "how to provision a new instance of DynamoDB," Infra Assistant would provide answers mentioning their specific internal developer platform (IDP) and include documentation references. This demonstrated that the RAG implementation successfully incorporated organizational context rather than providing generic cloud advice.

### Phase 2: Multi-Agent Collaboration

After Infra Assistant "passed its probation period," the team decided to expand its capabilities using multi-agent collaboration patterns. This architectural evolution allowed them to implement a "chain of thought" approach where instead of explicitly instructing the LLM on what to do, they could fire requests and let the LLM reason about which tools and agents to employ.

Their multi-agent system architecture featured a main supervisor agent that performs the primary reasoning and maintains a list of all accessible tools (which are actually other specialized agents). These specialized agents could be standalone (like log search or knowledge base agents) or act as supervisors themselves, creating a flexible hierarchical structure. This design allowed them to build a sophisticated system where they could control behavior through agent composition and role assignment.

The current production system includes three distinct types of agents:

**Knowledge-Based Agents**: These are essentially scaled versions of their initial RAG application. Through iteration, they determined that having three different agents per data source, with a knowledge-based supervisor to route between them, produced the best results. This multi-agent approach to RAG appears to have been more effective than a monolithic knowledge base.

**API Agents**: These became Alina's favorite because they enabled incredibly fast integration with external resources. The only requirements were uploading an OpenAPI specification and creating a Lambda function to make the actual API calls. The agent itself handles parsing the specification and selecting the appropriate API endpoints. Notably, if a request lacks necessary information, the agent can interactively request additional details from users—for example, asking for a group name when listing group members.

**Classic Agents with Action Groups**: These agents execute custom Lambda code written by the team. They include sophisticated features like user confirmation workflows for potentially sensitive operations. When enabled, these confirmations present the full execution plan to users who can approve or reject before the action proceeds, providing an important safety mechanism when giving agents the ability to make changes to production systems.

The main supervisor orchestrates across all these specialized agents, managing the workflow and ensuring tasks are delegated appropriately.

## Real-World Example: Onboarding Automation

The presenters demonstrated a compelling example where they asked Infra Assistant to onboard Marcus as a new team member without access to any tools. The system's reasoning chain showed how it:

- Received the initial request and determined the onboarding supervisor should handle it
- Prepared instructions for the onboarding supervisor 
- Delegated the specific task to the Atlassian agent (since they use Atlassian tools)
- Selected the appropriate API from the Atlassian agent's available endpoints
- Successfully completed the onboarding

This traced execution demonstrates the multi-step planning and delegation that occurs transparently within the agent system, showing how complex workflows can be automated through agent collaboration.

## Deployment Architecture and Infrastructure as Code

From an LLMOps perspective, the deployment approach evolved significantly. Initially, the team defined their entire agentic structure in code and deployed it through a CI/CD pipeline. When changes were needed—whether to prompts, links, or adding new tools—they would push code that triggered a deployment pipeline. This pipeline would deploy each agent and create the complete agentic tree in Bedrock, which would then provide an endpoint for sending questions.

However, as Infra Assistant grew more complex, this deployment approach became a pain point. The deployments took considerable time, and the iterative nature of prompt engineering and agent refinement made this stateful approach cumbersome. The team then discovered and adopted Amazon Bedrock's inline agents feature, which fundamentally changed their deployment model.

With inline agents, they no longer worry about state in the cloud. Instead of deploying the agentic tree as infrastructure, they generate the entire tree structure dynamically within their service and send it as JSON alongside each question to Bedrock. Bedrock compiles this structure with minimal delay and executes the request. This approach offers several significant advantages:

- Much faster iteration on prompts and agent configurations since no deployment is required
- No concerns about state drift between what's defined in code and what's deployed in the cloud
- The ability to dynamically generate agent structures at runtime, enabling arbitrarily nested agents
- More convenient extensibility, particularly when integrating with Model Context Protocol (MCP) servers

## Model Context Protocol Integration

The team highlighted their adoption of the Model Context Protocol (MCP), an open standard developed by Anthropic that standardizes how large language models retrieve context and use tools. This represents a forward-thinking LLMOps practice that reduces integration friction. If Infra Assistant supports MCP, then adding new capabilities becomes as simple as running an MCP server—the standardized interface means it "just works out of the box."

They specifically mentioned using GitHub's official MCP server, which allowed them to interact with GitHub's API without writing custom tools. As the ecosystem of official and open-source MCP servers grows, this standardization will significantly reduce the engineering effort required to expand agent capabilities. For Electrolux's platform team, this also creates an opportunity for other teams in the organization to expose their own endpoints or data by packaging them as MCP servers, making integration straightforward.

With their inline agent framework, they can convert MCP servers into action groups and plug them anywhere in their agentic tree, providing architectural flexibility that would be much harder to achieve with static, deployed agent configurations.

## Advanced Troubleshooting Agent

One of the most sophisticated agents they've developed is the cloud troubleshooting agent, which addresses one of the core responsibilities of their SRE team. Troubleshooting cloud issues requires both knowing where to look and what to look for within a complex environment. Their troubleshooting sub-agent includes:

- A supervisor that orchestrates the entire troubleshooting operation
- Access to their log management system for querying real-time data
- Code search capabilities to identify potential issues in their codebase
- Access to the knowledge base for finding similar historical issues
- An AWS CLI agent that can run arbitrary AWS CLI commands in their accounts

The AWS CLI agent is particularly notable from both capability and security perspectives. It operates in an isolated environment with a restricted read-only IAM role. The presenters acknowledged that enabling an agent to run AWS commands requires being "very careful, or carefree at least." The granular IAM permissions ensure that even if the agent attempted destructive operations like deprovisioning clusters, it would lack the necessary permissions.

Marcus demonstrated the troubleshooting agent's effectiveness with a practical example involving their transit gateway configuration used for inter-account communication. He first asked about potential issues when there were none, and the agent correctly identified that everything was configured properly. Then he deliberately broke the connection by taking down the dev environment and asked the same question again. The agent successfully identified the exact issue: security groups lacked rules allowing traffic from the other environment's CIDR range. Remarkably, Marcus noted this wasn't cherry-picked—it was the first thing he tried, suggesting the troubleshooting agent has genuine diagnostic capabilities.

## Evaluation and Performance Measurement

The team openly discussed the challenges of evaluating their multi-agent system, demonstrating mature thinking about LLMOps practices. They implemented a simple user feedback mechanism with a popup allowing developers to rate interactions from one to five, along with optional written feedback. General feedback indicated that while Infra Assistant provides a convenient way to access institutional knowledge, it can be somewhat slow for complex operations.

They also manually rate the accuracy of answers in the SRE channel using a five-point scale:

- 1: Hallucinated or provided wrong information (obviously problematic but does occur)
- 2-3: Partial information or somewhat helpful
- 4: Correct information but lacked the appropriate tool to fully resolve the issue
- 5: Completely resolved the question like a senior team member would, requiring no human intervention

These "five" ratings are particularly valuable as they represent genuine capacity augmentation. The team is actively working to increase the frequency of these top-rated interactions. They acknowledged that Infra Assistant isn't 100% accurate across all questions and operations, but they still see clear benefits.

From an evaluation perspective, they identified a key improvement area: moving from end-to-end performance measurement to evaluating each agent separately. This would enable them to identify specific weak points in their system, potentially fix individual agents, or remove agents that aren't being used at all. This represents a sophisticated understanding of observability needs for multi-agent systems.

## Observability and Tracing

Amazon Bedrock agents provide built-in tracing, debugging, and observability mechanisms, which the Electrolux team leverages extensively. When they execute complex workflows, they can examine detailed traces showing how tasks are decomposed and delegated across agents. For example, in their marketing strategy example (used in the broader AWS presentation), traces showed:

- Initial task assignment to the startup advisor (supervisor)
- Decomposition into step 1.1 for a specialized sub-agent
- Further subdivision into granular subtasks
- Execution of each subtask
- Aggregation of results back up the hierarchy

This trace visibility allows the team to understand exactly how their multi-agent system reasons and operates, which is crucial for debugging issues, optimizing performance, and improving their prompts and agent designs through iterative refinement.

## Business Value and Cost-Efficiency

The team reported that Infra Assistant provides tangible benefits despite not being perfect. It saves time on repetitive tasks like access management and answering frequently asked questions. Even when Infra Assistant doesn't answer perfectly and the team needs to intervene, having the agent's initial response helps them understand context more quickly. Since the agent has access to the three main information sources in their organization, the team can more rapidly diagnose issues without manually searching through documentation, wikis, and previous conversations.

From a cost perspective, they found the system to be "quite cost efficient" when comparing the monthly operational costs of running Infra Assistant against the time they would spend manually handling all those tasks. They were emphatic that the agent isn't replacing human team members but rather augmenting capacity and handling routine work.

The scalability advantage is significant: if they suddenly received 50 times more support requests, Infra Assistant would handle the load without degradation, whereas human team members would be completely overwhelmed. This elastic capacity is a fundamental advantage of AI agents in operations roles.

## Challenges and Limitations

The team was refreshingly honest about limitations and challenges, demonstrating mature expectations around AI capabilities:

**Latency**: Depending on task complexity, Infra Assistant can take up to several minutes to complete operations. This response time makes it unsuitable for urgent issues where developers need immediate help, limiting its applicability to certain types of requests.

**Accuracy Variability**: While they've achieved good results, the system isn't 100% accurate, and hallucinations do occur (rating 1 on their scale). This necessitates ongoing monitoring and improvement efforts.

**Limited Agent-Specific Evaluation**: Currently they measure end-to-end performance, but lack granular evaluation of individual agents within their system. This makes it harder to identify which specific components need improvement.

**Agent Confusion**: As mentioned in the broader AWS presentation context, agents can become confused when multiple tools serve similar purposes or when they cannot disambiguate between concepts like "vacation" versus "leave of absence" that might have different organizational definitions.

## Future Roadmap

The team outlined several improvements they're pursuing:

**Reducing Latency**: Finding ways to speed up complex multi-agent workflows to make the system more responsive for a broader range of use cases.

**Advanced Evaluation**: Implementing per-agent evaluation rather than only end-to-end metrics, enabling more targeted optimization and the ability to identify and remove underutilized agents.

**Self-Healing Capabilities**: A particularly ambitious goal where Infra Assistant could fix itself based on feedback. If it receives feedback that an answer was wrong, it could potentially troubleshoot its own prompts, check vector database quality, or validate knowledge sources. They noted the interesting philosophical question: if the agent can help troubleshoot their infrastructure, why couldn't it troubleshoot itself?

## Broader Context: AWS Bedrock Agent Patterns

The AWS presenter (Talha) provided important framing around agent architecture patterns that informed Electrolux's implementation:

**Router Pattern**: A simpler multi-agent pattern where a main agent acts as a router to specialized agents. Users interact with one unified interface, and the router determines which specialized agent should handle each query based on intent classification. This pattern uses simpler LLMs for the routing logic since it's primarily doing intent classification rather than complex reasoning.

**Supervisor Pattern**: The more sophisticated pattern that Electrolux ultimately adopted, where a supervisor agent creates multi-step plans and orchestrates execution across sub-agents. This enables complex workflow automation where the supervisor decomposes tasks, delegates to appropriate specialists, potentially creates loops for refinement, and aggregates results.

The evolution from monolithic agents to specialized multi-agent systems addresses several key challenges: reducing complexity in individual agents, avoiding tool confusion, improving performance (smaller prompts for specialized agents), and reducing costs. The AWS guidance emphasizes starting small and focused, then iteratively expanding capabilities—exactly the path Electrolux followed.

## Technical Stack

While the presentation focused primarily on Amazon Bedrock agents, the Electrolux system integrates with several components:

- **Amazon Bedrock**: Core LLM and agent orchestration platform
- **Amazon DynamoDB**: Used as working memory for agents to store intermediate results and drafts
- **AWS Lambda**: Executes API calls and custom action group logic
- **Slack**: Primary user interface where developers interact with Infra Assistant
- **Various APIs**: Atlassian, GitHub, AWS CLI, log management systems, and others exposed through API agents and MCP
- **OpenAPI Specifications**: Define API contracts for API agents
- **IAM Roles**: Provide security boundaries for agent actions, particularly for the AWS CLI agent

## Open Source Contributions

The team mentioned that Electrolux actively shares open-source projects, encouraging interested parties to check their open-source page for tools they've developed. This suggests a commitment to giving back to the community and potentially sharing some of their learnings around building production agent systems, though specific projects weren't detailed in the presentation.

## Reflection on LLMOps Maturity

This case study represents a relatively mature approach to LLMOps with several noteworthy practices:

- **Infrastructure as Code**: All agent definitions are code-managed with deployment pipelines
- **Iterative Development**: Clear progression from MVP to increasingly sophisticated capabilities
- **Security Consciousness**: Careful IAM permissions and user confirmation workflows for sensitive operations
- **Observability**: Leveraging built-in tracing and implementing custom evaluation mechanisms
- **Cost Awareness**: Explicitly tracking and comparing operational costs against value delivered
- **Honest Assessment**: Transparent about limitations, accuracy issues, and areas needing improvement
- **User-Centric Design**: Feedback mechanisms and attention to developer experience
- **Architectural Evolution**: Willingness to change deployment approaches (from stateful to inline agents) when better options emerged

The transition to inline agents represents sophisticated LLMOps thinking—recognizing that the deployment model itself can be a limiting factor and adapting accordingly. The adoption of Model Context Protocol shows forward-thinking about standardization and ecosystem development.

The team's acknowledgment that "Infra Assistant is not going to replace us" reflects realistic expectations about AI augmentation versus replacement. Their focus on handling repetitive tasks and providing context rather than complete automation aligns with practical use cases where AI agents deliver clear value today.

Overall, Electrolux's implementation demonstrates how a non-tech-core company (they manufacture appliances, not software) can successfully deploy sophisticated multi-agent AI systems in production to solve real operational challenges, while maintaining appropriate caution, implementing proper safeguards, and honestly assessing both capabilities and limitations.