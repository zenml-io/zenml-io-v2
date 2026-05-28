---
title: "Building Production AI Customer Support Agents with Multi-Agent Architecture and Human-in-the-Loop Design"
slug: "building-production-ai-customer-support-agents-with-multi-agent-architecture-and-human-in-the-loop-design"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "agent-based"
  - "evals"
  - "system-prompts"
  - "error-handling"
  - "harness-engineering"
  - "langchain"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "guardrails"
  - "open-source"
  - "anthropic"
  - "openai"
  - "google-gcp"
industryTags: "tech"
company: "Lorikeet"
summary: "Lorikeet is an AI customer support startup that evolved from building basic automation tools to creating sophisticated multi-agent systems for handling customer support at scale. The company developed two primary agents: a customer-facing concierge agent that handles support tickets across email, live chat, and voice channels, and a coach agent that helps support teams configure, evaluate, and improve their AI systems. The solution addresses the challenge of drowning support teams by not only automating routine inquiries but also implementing resolution-in-the-loop patterns where AI can request human assistance for specific blockers while maintaining conversation ownership. Results include increased average handle time for human agents, indicating they now focus on complex issues rather than routine tickets, with the system processing customer interactions at significant scale across multiple regulated industries including fintech and healthcare."
link: "https://www.youtube.com/watch?v=eZj1xSiyd9U"
year: 2026
seo:
  title: "Lorikeet: Building Production AI Customer Support Agents with Multi-Agent Architecture and Human-in-the-Loop Design - ZenML LLMOps Database"
  description: "Lorikeet is an AI customer support startup that evolved from building basic automation tools to creating sophisticated multi-agent systems for handling customer support at scale. The company developed two primary agents: a customer-facing concierge agent that handles support tickets across email, live chat, and voice channels, and a coach agent that helps support teams configure, evaluate, and improve their AI systems. The solution addresses the challenge of drowning support teams by not only automating routine inquiries but also implementing resolution-in-the-loop patterns where AI can request human assistance for specific blockers while maintaining conversation ownership. Results include increased average handle time for human agents, indicating they now focus on complex issues rather than routine tickets, with the system processing customer interactions at significant scale across multiple regulated industries including fintech and healthcare."
  canonical: "https://www.zenml.io/llmops-database/building-production-ai-customer-support-agents-with-multi-agent-architecture-and-human-in-the-loop-design"
  ogTitle: "Lorikeet: Building Production AI Customer Support Agents with Multi-Agent Architecture and Human-in-the-Loop Design - ZenML LLMOps Database"
  ogDescription: "Lorikeet is an AI customer support startup that evolved from building basic automation tools to creating sophisticated multi-agent systems for handling customer support at scale. The company developed two primary agents: a customer-facing concierge agent that handles support tickets across email, live chat, and voice channels, and a coach agent that helps support teams configure, evaluate, and improve their AI systems. The solution addresses the challenge of drowning support teams by not only automating routine inquiries but also implementing resolution-in-the-loop patterns where AI can request human assistance for specific blockers while maintaining conversation ownership. Results include increased average handle time for human agents, indicating they now focus on complex issues rather than routine tickets, with the system processing customer interactions at significant scale across multiple regulated industries including fintech and healthcare."
notion:
  pageId: "36ef8dff-2538-806c-9583-eabc5350834a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-28T10:13:00.000Z"
  lastEditedTime: "2026-05-28T10:13:00.000Z"
  publishedAt: "2026-05-28T10:17:56Z"
---

## Company Overview and Evolution

Lorikeet is an AI customer support startup founded approximately two and a half years ago by co-founders including Jamie Hall, who previously worked as an AI research engineer at Google Brain. The company's journey represents a fascinating case study in finding product-market fit through iterative experimentation and customer discovery. The team started with a broad focus on operations and support teams, initially building productivity tools and coaching systems that ultimately failed to gain traction. Through embedded work with a healthcare startup's support team in Sydney, they discovered the most pressing need was simply helping teams clear their support ticket inbox.

The company's philosophy, heavily influenced by practices from Google Brain and Stripe, emphasizes starting with user problems rather than leading with technology. A key principle articulated by the CTO is that there's no substitute for doing the actual work—reading hundreds of conversations, identifying what's good and bad, and iterating based on real data. This grounded approach to AI product development permeates the company's DNA and contrasts with approaches that start with novel architectures or model innovations.

## Multi-Agent Architecture

Lorikeet's production system consists of two primary AI agents that work in coordination but serve distinct purposes. The concierge agent is customer-facing and handles actual support interactions across multiple channels including email, live chat, and increasingly voice. The coach agent is internal-facing and helps support teams configure, evaluate, and continuously improve their AI systems.

The concierge agent operates as essentially another user within existing ticketing platforms like Zendesk and Intercom. This integration approach allows Lorikeet to focus on the conversational AI capabilities rather than rebuilding ticketing infrastructure. Customers connect their existing systems, and the concierge agent participates as if it were another team member. This design decision reduces the product footprint and allows the company to concentrate on solving the hard problems of conversational quality and action-taking.

The coach agent represents a significant architectural innovation, operating on a coding-agent paradigm similar to tools like Claude Code and Devon. Support teams interact with coach conversationally to configure how their concierge agent should behave, create evaluation scenarios, define guardrails, and diagnose issues. The coach can analyze traces, identify failure modes, propose solutions, and iteratively test improvements. This represents a fundamental shift from traditional configuration interfaces to a more collaborative, AI-assisted approach.

## Configuration and Prompt Engineering Evolution

The company's approach to configuration has evolved significantly through three distinct phases. Initially, they built a workflow-based interface where users could create flowcharts with boxes representing different steps, some using AI and others using deterministic code. Each AI box contained a large text prompt box where users would define behavior. This approach gave precise control but proved challenging for users to configure effectively.

The second phase introduced a hybrid model combining large prompt text boxes with traditional UI elements like toggles and dropdown lists. This made certain configurations easier but still required significant prompt engineering expertise from customers. A pivotal moment came when a customer asked what they should put in the prompt boxes, expecting Lorikeet to have the answers as the prompt experts.

The current third phase represents a more radical approach: reverting to conversational configuration through the coach agent, but with the backing of more capable models and sophisticated guardrails. Users can now describe what they want in natural language, and coach handles the underlying prompt engineering, workflow creation, and testing. Critically, the system maintains traditional UI elements for review and verification, recognizing that while conversational interfaces excel at expressing intent, humans still need structured interfaces to efficiently review AI outputs.

The team has also discovered an important pattern: users don't want to start from a blank chatbot interface. Instead, they prefer contextual entry points where coach can offer specific help on the task they're currently working on. For example, when on the simulations page, users can click a button to have coach help create evaluation scenarios for that specific flow rather than having to explain context from scratch in a general chat interface.

## Evaluation and Testing Strategy

Lorikeet has implemented a sophisticated evaluation strategy that inverts the typical approach to AI system development. Rather than starting with standard operating procedures and then creating tests, they encourage customers to start by defining test cases—specific scenarios of customer inquiries and the desired AI responses. This approach recognizes a fundamental reality: many companies have outdated or incomplete SOPs, or the procedures exist only in employees' heads.

The evaluation system includes several components. Simulations allow customers to define scenarios and repeatedly test how the concierge agent would respond. These can be run hundreds of times to measure consistency and reliability. The system can identify patterns in what's being escalated to humans and suggest areas where knowledge base articles or instructions need improvement.

Coach plays a central role in evaluation by analyzing tickets, identifying where the concierge agent struggles, and proposing improvements. When customers identify a specific ticket where the agent responded incorrectly, they can simply tell coach what should have happened instead. Coach then diagnoses why the failure occurred, proposes fixes, creates test cases, and iterates until those test cases pass. This tight feedback loop between real-world failures and systematic improvement is a hallmark of mature LLMOps practices.

The company also surfaces trace information and error analysis directly to customers. Rather than keeping this technical information hidden, they've built interfaces that make it easy for non-technical support team members to understand what the AI did and why. This transparency enables customers to be effective partners in improving the system.

## Guardrails and Safety Architecture

Lorikeet has developed a sophisticated guardrail system that operates as cross-cutting safety checks before responses are sent to customers. The architecture involves isolated LLM-based checks that run against proposed responses, evaluating whether they violate any defined rules. This separation provides a way to guarantee certain behaviors won't occur, which is particularly important for regulated industries.

The guardrail system is highly configurable because different customers face different regulatory requirements and risk profiles. Some guardrails are system-wide defaults that apply to all customer support scenarios, but most are customizable to each business. An illustrative example involved a healthcare company in the medical cannabis space where a hardcoded hostility detection guardrail incorrectly flagged legitimate customer questions about their product. This led to making guardrails context-aware, incorporating knowledge about the specific business domain.

Guardrails can be configured to either steer the conversation in a different direction or immediately escalate to a human agent. The creation process has evolved to be more intuitive: rather than asking customers to define abstract rules, the system encourages defining specific test cases of problematic scenarios. Coach can then recommend creating guardrails when it determines that instruction-based approaches won't reliably prevent certain behaviors.

The guardrail architecture provides a way to prove negatives, which is otherwise difficult with probabilistic systems. Compliance teams can receive practical guarantees that certain regulated behaviors will be caught and prevented, even if the underlying language model might be inclined toward them. This has proven essential for operating in highly regulated industries like financial services and healthcare.

## Human-in-the-Loop Patterns

One of Lorikeet's most sophisticated LLMOps innovations is their implementation of resolution-in-the-loop, a pattern that sits between full automation and full human handling. The concept addresses what they identify as a soft ceiling—situations where the AI is just shy of being able to resolve an issue but is blocked on a specific piece of information or decision.

In traditional systems, when an AI agent encounters something it can't handle, it escalates the entire ticket to a human. In resolution-in-the-loop, the concierge agent maintains ownership of the conversation but requests specific help from a human team member. For example, it might need clarification on how a particular regulation applies or require someone to check the status of a logistics order. Once unblocked, the agent continues handling the interaction without forcing the customer to wait for full human engagement.

This pattern mirrors how the coach agent interacts with support teams. Coach frequently needs to confirm understanding or validate assumptions before making configuration changes. Rather than making everything fully autonomous, the system designs for efficient collaboration where the AI handles the bulk of the work but pulls in humans at critical decision points.

The company has invested significant effort into understanding what information humans need to efficiently review and correct AI outputs. This stems from team member experience at a previous company where simply changing the UX for reviewing machine learning outputs made users four times more efficient, without touching the underlying models. The focus on interface design for human-AI collaboration represents a mature understanding that AI capabilities are only part of the production system—how humans interact with those capabilities is equally critical.

## Voice and Multi-Channel Support

While many customer support AI systems focus on text-based channels, Lorikeet has scaled into voice interactions, which the podcast host identified as particularly sophisticated. Voice presents additional challenges including latency requirements, more natural conversation patterns, and the need for real-time decision making. The company handles email, live chat, and voice through the same underlying agent architecture, though specific implementation details about voice were not extensively covered in the conversation.

The company started with email support because of its more forgiving latency requirements—responses within an hour were considered excellent. This provided time to handle complex workflows involving multiple browser windows, cross-referencing internal documentation, checking admin pages, and coordinating with other teams. Building these capabilities first in the lower-latency-pressure environment allowed them to develop robust action-taking abilities before moving to real-time channels.

## AI Humility and Confidence Calibration

A core principle in Lorikeet's approach is what they call AI humility—the recognition that many support tickets are genuinely hard, involve complex human emotions, or require nuanced judgment that shouldn't be delegated to AI. From the beginning, they designed their system to default to human escalation when uncertain.

This presents a significant technical challenge because large language models are fine-tuned to be helpful and enthusiastic, creating a strong bias toward promising things or offering help even when uncertain. This bias is amplified when the model believes it's acting as a customer support agent, as it tries to embody what good customer support looks like. Getting models to appropriately acknowledge limitations requires explicit prompting, confidence evaluation, and the guardrail system.

The company uses multiple techniques to achieve appropriate confidence calibration. They explicitly ask models to evaluate their own confidence levels. They employ LLM-as-judge patterns where separate models evaluate proposed responses. The guardrail system provides cross-cutting checks that can catch overconfident responses before they reach customers. Importantly, these calibration mechanisms are tunable per customer based on their specific risk tolerance and regulatory environment.

An interesting outcome of their AI humility principle is that at mature deployments, the average handle time for human agents has actually increased. This counterintuitive result indicates success: human agents now spend more time on genuinely complex issues that warrant careful attention, rather than rushing through a mix of routine and complex tickets. The AI handles the volume while humans provide quality on hard problems.

## Data and Observability

The company's approach to data and observability reflects their product engineering philosophy. Early prototypes literally involved processing customer emails through command-line interfaces and returning results via spreadsheet, with feedback exchanged over email and Slack. This manual process created their first evaluation dataset using real customer data and established patterns for iteration.

As they scaled, they invested heavily in tracing and diagnostics. The system can map out execution traces showing which steps were taken, what information was retrieved, and what decisions were made. Critically, they've made these traces accessible to customers through carefully designed interfaces that highlight the most important information for review.

A particularly innovative capability is using the coach agent to automatically analyze traces and diagnose failure modes. When a customer identifies that the concierge agent responded incorrectly but doesn't know why, coach can investigate the trace, identify the root cause, and propose fixes. This automation of error analysis represents sophisticated LLMOps maturity, moving beyond manual trace inspection toward AI-assisted debugging and improvement.

The team emphasizes that looking at data is the work of building AI products. One team member recounted learning from Hamel Husain's AI evaluation course the mantra of looking at your data repeatedly. The CTO's experience at Google Brain reinforced this lesson: the actual daily work isn't tinkering with model architectures but rather reading conversations 50 times, 100 times, identifying patterns, and iterating based on observed behavior.

## RAG and Knowledge Management

While Lorikeet uses retrieval-augmented generation, they've intentionally focused beyond simple question-answering applications. Their observation was that most customer support work isn't about summarizing FAQs or reading documentation back to people. Instead, support agents spend time with five browser windows open, cross-referencing multiple systems, texting colleagues, checking logistics, and pasting information between platforms.

This insight shaped their approach to knowledge integration. Rather than requiring pristine knowledge base articles before deployment, they allow incremental improvement. The concierge agent defaults to escalating when unsure, making it safe to deploy with imperfect knowledge bases. The evaluation system then identifies patterns in what's being escalated—for example, if 50% of escalations relate to a particular question, that signals a knowledge gap to address.

The knowledge retrieval system is context-aware, understanding the specific business domain to avoid false positives like the medical cannabis example. Customers provide business context as part of configuration, and this context informs both the retrieval process and the interpretation of retrieved information.

## Integration Patterns and Tool Use

The concierge agent's ability to take actions distinguishes Lorikeet from simpler chatbots. Customers configure what external systems the agent can access, what operations it can perform, and under what conditions. This might include looking up account information, processing refunds, checking order statuses, or updating customer records.

The integration model treats the agent as another team member with appropriate access levels. Rather than building custom integrations for every possible system, they focus on making it easy for customers to connect their existing tools and define how the agent should use them. This approach scales more effectively than trying to pre-integrate with every possible platform.

The tool-use capability combines with the resolution-in-the-loop pattern effectively. When the agent needs information from a system it can't access directly, it can request that a human team member check and provide the information. This allows gradual expansion of automation as customers become comfortable providing more access.

## Product Engineering Culture

The organizational approach to building these systems is noteworthy from an LLMOps perspective. At 70 employees, Lorikeet maintains a strong product engineering culture where engineers are expected to engage with customers, conduct UX research, validate hypotheses, and think about product decisions. Every week in engineering meetings, the CTO asks what each engineer learned from customers that week.

This culture reflects the understanding that in the age of AI where building is faster than ever, the risk of creating unused features has increased dramatically. The team uses a staged launch process from alpha to beta to full launch, being intentional at each step about validation. The goal is avoiding AI-generated code pollution in the codebase—features built quickly but providing no value.

The team composition includes mostly engineers with some product managers and designers. They specifically hire product-focused, user-focused engineers rather than those primarily interested in model architecture or novel AI techniques. This reflects their philosophy that the moat isn't secret AI formulas but rather the hard work of understanding user problems and building solutions that genuinely help.

## Challenges with Process Maturity

A recurring theme is the challenge of automating processes that aren't well-defined. Some customers have comprehensive standard operating procedure binders while others have everything in employee heads. The AI can handle some ambiguity better than deterministic systems, but it still requires reasonable process clarity to perform reliably.

Complicating this further, some processes are fundamentally outside customer control. The example of US health insurance complexity illustrates how external dependencies can limit what even sophisticated AI can accomplish. Support teams dealing with byzantine third-party systems face challenges that no amount of internal process improvement can fully address.

Lorikeet's approach has been helping customers incrementally mature their processes through the act of deploying AI. By showing what gets escalated and why, the system surfaces gaps and ambiguities in existing procedures. This creates a virtuous cycle where deploying AI drives process improvement, which enables better AI performance, which enables handling more scenarios.

## Conversational Interface Design

The shift to conversational configuration through coach represents significant UX innovation but also creates challenges. Users faced with empty chatbots often don't know where to start. The team experimented with suggestion pills similar to ChatGPT but found them ineffective because users already using ChatGPT understand it's not particularly helpful for specialized tasks without context.

The CTO delivered what he calls a rant about these message suggestion interfaces, noting they often map to internal organizational structures rather than user mental models. Support chatbots asking whether users want to report a bug, ask a question, or file a complaint reflect internal team divisions, not how users conceptualize their problems. Users shouldn't have to understand a company's org chart to get help.

The solution involves hybrid interfaces that combine conversational and traditional UI elements. The conversational interface handles intent expression and complex configuration, while structured UI provides efficient review and verification. Contextual entry points allow users to invoke coach's help on specific tasks without needing to explain full context, taking advantage of the system's knowledge about what the user is currently doing.

This represents broader learning about building with LLMs in production: conversational interfaces excel at certain tasks but aren't universal solutions. Production systems need to thoughtfully combine conversational and structured elements based on the specific workflow and user needs.

## Lessons for LLMOps Practitioners

Lorikeet's journey offers several valuable lessons for LLMOps practitioners. First, the importance of starting with customer problems rather than capabilities cannot be overstated. Their failed prototypes all had positive feedback but didn't solve burning problems. Success came from embedding with customers and finding pain points urgent enough that customers would tolerate command-line interfaces and spreadsheets.

Second, looking at data is the work. Not building novel architectures, not fine-tuning models, not collecting the latest tools, but reading hundreds of conversations and identifying patterns. This requires different hiring and cultural emphasis than typical AI companies.

Third, human-AI collaboration patterns deserve as much attention as AI capabilities. How humans review outputs, how the system asks for help, how feedback flows back to improvements—these interaction patterns determine production value as much as model performance.

Fourth, evaluation should start with defining good outcomes rather than implementing processes and hoping they work. The inversion of starting with test cases and working backward to configuration proved more effective than the traditional approach.

Fifth, configurability and customer control are essential for systems operating across diverse domains and regulatory environments. One-size-fits-all approaches fail in production because the definition of good customer support varies enormously across industries, companies, and specific use cases.

Finally, agent orchestration with specialized agents for different purposes scales better than trying to build one super-agent. The separation between customer-facing concierge and internal coach agents allows each to be optimized for its specific context with appropriate controls and capabilities.
