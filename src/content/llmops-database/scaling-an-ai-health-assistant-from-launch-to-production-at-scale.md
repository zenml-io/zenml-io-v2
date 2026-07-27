---
title: "Scaling an AI Health Assistant from Launch to Production at Scale"
slug: "scaling-an-ai-health-assistant-from-launch-to-production-at-scale"
draft: false
llmopsTags:
  - "healthcare"
  - "rag"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "evals"
  - "latency-optimization"
  - "error-handling"
  - "human-in-the-loop"
  - "few-shot"
  - "monitoring"
  - "guardrails"
  - "openai"
  - "google-gcp"
industryTags: "healthcare"
company: "Maven Clinic"
summary: "Maven Clinic deployed an AI agent called Maven Assistant to help users navigate women's and family health services, including finding providers, scheduling appointments, and answering health questions. Initially launched to 20% of active users in March 2026, the assistant has since scaled to 100% of users with 10x conversation volume growth over four months. The team addressed critical challenges including overly strict guardrails, model selection and upgrades from Gemini to GPT models, building robust evaluation systems with LLM-as-judge calibrated against human reviewers, and managing the complex interplay between administrative tools and health question answering. Key success metrics include less than 10% escalation rates and 90%+ agreement between automated judges and human evaluators, demonstrating that rapid iteration informed by production data is essential for building reliable customer-facing AI agents."
link: "https://www.youtube.com/watch?v=XnyzhRsig9I"
year: 2026
seo:
  title: "Maven Clinic: Scaling an AI Health Assistant from Launch to Production at Scale - ZenML LLMOps Database"
  description: "Maven Clinic deployed an AI agent called Maven Assistant to help users navigate women's and family health services, including finding providers, scheduling appointments, and answering health questions. Initially launched to 20% of active users in March 2026, the assistant has since scaled to 100% of users with 10x conversation volume growth over four months. The team addressed critical challenges including overly strict guardrails, model selection and upgrades from Gemini to GPT models, building robust evaluation systems with LLM-as-judge calibrated against human reviewers, and managing the complex interplay between administrative tools and health question answering. Key success metrics include less than 10% escalation rates and 90%+ agreement between automated judges and human evaluators, demonstrating that rapid iteration informed by production data is essential for building reliable customer-facing AI agents."
  canonical: "https://www.zenml.io/llmops-database/scaling-an-ai-health-assistant-from-launch-to-production-at-scale"
  ogTitle: "Maven Clinic: Scaling an AI Health Assistant from Launch to Production at Scale - ZenML LLMOps Database"
  ogDescription: "Maven Clinic deployed an AI agent called Maven Assistant to help users navigate women's and family health services, including finding providers, scheduling appointments, and answering health questions. Initially launched to 20% of active users in March 2026, the assistant has since scaled to 100% of users with 10x conversation volume growth over four months. The team addressed critical challenges including overly strict guardrails, model selection and upgrades from Gemini to GPT models, building robust evaluation systems with LLM-as-judge calibrated against human reviewers, and managing the complex interplay between administrative tools and health question answering. Key success metrics include less than 10% escalation rates and 90%+ agreement between automated judges and human evaluators, demonstrating that rapid iteration informed by production data is essential for building reliable customer-facing AI agents."
notion:
  pageId: "3a8f8dff-2538-809e-950f-d985ddb99e70"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-25T07:53:00.000Z"
  lastEditedTime: "2026-07-25T07:54:00.000Z"
  publishedAt: "2026-07-27T12:09:39Z"
---

Maven Clinic developed and deployed Maven Assistant, an AI agent embedded within their application to help users navigate women's and family health services. The company provides employee benefits focused on women's and family health, including services like pregnancy support, fertility guidance, and benefits administration through their Maven Wallet product. This case study follows the four-month journey from initial external launch in March 2026 through scaling to full production deployment.

## Initial Launch and Product Scope

Maven Assistant launched with a multi-agent architecture consisting of a lead agent that routes to specialized sub-agents handling different use cases including appointment scheduling, provider search, health questions, and Maven help. The initial deployment reached approximately 20% of active users as part of a phased rollout strategy. The team deliberately excluded benefits and reimbursement questions from the first launch because prior efforts had not reached the required accuracy bar, demonstrating a cautious approach to expanding scope in a regulated healthcare environment.

The product design emphasizes rapid issue resolution over extended conversational engagement. Unlike many consumer applications that optimize for stickiness and long conversations, Maven Assistant aims to answer questions efficiently with minimal turns. This product philosophy influenced architectural decisions around memory and context management, with the team initially avoiding cross-conversation memory entirely since most interactions should be self-contained and resolved quickly.

## Early Production Learnings and Guardrail Refinement

Within the first week of production deployment, the team discovered that their input guardrails were significantly too strict, a pattern that would recur with their LLM-as-judge evaluation systems. The emergency guardrail provides an illustrative example of this challenge. Initially designed to detect medical emergencies and provide appropriate emergency contact information, the guardrail triggered too broadly on phrases like "I'm bleeding" without considering context. Through iteration, the team developed a three-part classifier that evaluates whether a situation represents a medical emergency, whether the user is describing present-tense events, and whether they have already sought emergency care. This refinement prevented absurd interactions where the agent would tell someone already in an emergency room to go to the emergency room.

The guardrails are implemented using LLM-based classifiers rather than traditional machine learning models or rule-based systems. While the team acknowledges that simpler approaches could offer lower latency, they found that LLM-based classification dramatically accelerated the journey from zero to one. Text classification tasks that would have required substantial data collection and model training six years ago can now be implemented with prompts. The team primarily uses GPT-4o Mini for guardrail classification, accepting latency costs of approximately one second per call with tail latencies reaching two to three seconds. This represents a deliberate trade-off prioritizing development velocity and ease of iteration over maximum performance optimization.

## Unexpected Usage Patterns and Product Adaptation

One of the most significant surprises in production was the distribution of use cases. The team expected most interactions would involve administrative tasks like scheduling appointments and searching for providers, given the substantial engineering investment in building tools that integrate with internal APIs for these functions. Instead, 50-60% of conversations involved general health questions like "Can I eat tuna when I'm pregnant?" The health question agent is architecturally simpler, primarily accessing internal content through retrieval augmented generation rather than orchestrating complex tool calls.

This usage pattern revealed an important user need for reassurance and quick answers to common pregnancy and fertility questions. It also highlighted how production data fundamentally reshapes product priorities. The team could not have predicted this distribution through pre-launch planning alone, reinforcing the philosophy that most development work should be informed by real user behavior rather than assumptions about what users might want.

## Model Selection and Migration Strategy

Maven Assistant initially launched using Gemini Flash 1.5 across all components. The team encountered the common challenge of models asserting their identity inappropriately, requiring extensive prompt engineering to prevent responses like "I don't have a birthday because I'm Gemini, powered by Google." Frustration with Google's slow release cadence for newer models led to a migration toward OpenAI's GPT family, particularly as GPT-4o Mini and subsequent models became available.

The transition illustrates several critical aspects of model management in production. First, latency concerns constrain model choices significantly. Because Maven Assistant operates as a real-time chat interface, the team typically uses smaller model variants and avoids high reasoning effort settings. They skipped GPT-4.5 entirely because no mini version was available, and they use either none or low reasoning effort settings rather than high or extended reasoning to maintain acceptable response times.

Second, swapping models revealed how prompts and system instructions become entangled with specific model behaviors. When upgrading the provider search agent to GPT-4o Mini, the team simplified prompts by removing instructions that were model-specific workarounds. However, identifying which instructions are load-bearing versus redundant presents a significant challenge, described as similar to removing blocks from a Jenga tower. Robust evaluation harnesses become essential for confident model changes, though the team acknowledges that truly comprehensive automated evaluation remains aspirational rather than fully realized.

Third, newer models introduce unexpected behavioral changes that require adaptation. The GPT-4 family models exhibit a strong tendency to ask follow-up questions, which can be inappropriate in contexts like benefits coverage. When a user asks if IVF is covered and the answer is definitively no based on their plan, offering to look up more specific IVF subtypes creates false hope and demonstrates a misunderstanding of how the benefits ontology works. The team must prompt against these helpful-seeming behaviors that don't align with domain constraints.

An interesting discovery during model evaluation involved appointments. When testing GPT-4.6 Terra on the appointments sub-agent, tool calling evaluations began failing. Investigation revealed that the test harness had mocked appointment dates in the past relative to the current mocked time. Previous models accepted and displayed these past appointments when asked for upcoming appointments, but the newer model correctly identified that appointments on December 1st, 2025 are not upcoming when the current date is December 3rd, 2025. The smarter model exposed a flaw in the evaluation setup rather than introducing a regression.

## Tool Architecture and Sub-Agent Design

Maven Assistant currently uses 32 tools, roughly double the 15-20 tools present at initial launch but still far fewer than some approaches that might expose hundreds of functions through protocols like Model Context Protocol. The team maintains a conservative stance on tool proliferation, carefully considering whether each addition serves common user needs revealed through production data.

Sub-agents are implemented as tools from the lead agent's perspective. When the lead agent determines that a user request should be handled by the appointments sub-agent, it makes a tool call to delegate to that sub-agent. This architectural pattern provides clean separation of concerns while maintaining flexibility. Each sub-agent can have its own specialized tools, prompts, and behavior patterns.

One architectural refinement the team would make in retrospect is combining the provider search and appointments sub-agents. Initially designed as separate agents because they use different APIs and tools, production usage revealed that users rarely search for providers without intending to schedule an appointment. The separation created awkward routing decisions where the lead agent needed complex instructions to determine whether "make an appointment with an OB-GYN" should route to search first or directly to appointments, and whether "make an appointment with William the OB-GYN" should skip search because a specific provider is already identified. Ultimately, the team added search capabilities to the appointments agent to handle these cases, reducing the clean separation they had originally designed.

## Context Engineering and System Prompt Management

The system prompt contains tens of thousands of tokens, a substantial but not extreme amount of context. The team takes a balanced approach to what context gets injected automatically versus retrieved through tool calls. Information useful in most conversations, such as the user's name, pregnancy status, current month of pregnancy, and which Maven program they participate in, gets automatically injected before the conversation begins. This automatic injection can be conceptualized as a tool call that happens before any user interaction.

Less frequently needed information remains behind tool calls to avoid wasting context window space. For example, a user's benefits document link is only retrieved when specifically requested, which might occur in one out of ten conversations. First name personalization and pregnancy status, by contrast, enhance nearly every interaction in the target demographic.

One particularly challenging aspect of context engineering involves helping models understand Maven's internal organization and terminology. LLMs trained on broad web data understand general medical concepts and common healthcare workflows reasonably well, but they lack knowledge of company-specific jargon and organizational structure. Questions like "Am I Maven Green or Maven Gold?" or "Do I have Maven Wallet?" require explicit context about what these internal product designations mean. The team continuously refines the context provided to handle these Maven-specific questions that occur frequently in production.

## Giving Agents Situational Awareness

A persistent challenge involves making the agent understand the context in which it operates. Users interacting with Maven Assistant are already logged into the application, already registered members, and already viewing the chat interface within the Maven app. Yet the agent sometimes tells users to go sign up, open the app, or perform other actions that don't make sense given the interaction context. Even explicit prompting like "You are in the app" doesn't fully resolve this confusion because the model's training didn't emphasize this type of situational awareness.

This challenge manifested acutely with retrieval augmented generation from Zendesk support articles. Articles written for humans searching a knowledge base externally include instructions like "go to the app and message support" or "email this address." These instructions make perfect sense for someone reading an article on a different website, but they're nonsensical for someone already chatting with the agent inside the app. The agent should simply offer to transfer the conversation to human support rather than directing users to initiate a separate contact.

The team created evaluation cases specifically for this issue, mocking the Zendesk retrieval tool to return confusing articles and checking whether the agent appropriately handles the context. Despite explicit system prompts stating that the agent has the ability to transfer to support and shouldn't direct users to external contact methods, the agent sometimes trusted the retrieved article content more than the system instructions. This suggests that retrieval augmented generation can override prompt instructions in the model's reasoning, a subtle but important consideration for production systems.

The long-term solution involves creating a separate derived index of articles specifically for agent consumption. Rather than using human-facing Zendesk content directly, the team plans to maintain parallel content that removes human-specific navigation instructions and focuses on information the agent needs to answer questions. This acknowledges that content optimized for human reading differs from content optimized for agent retrieval, an important design principle for RAG systems in production.

## Evaluation Systems and Quality Assurance

Maven Clinic has developed a multi-layered evaluation approach combining deterministic checks, LLM-as-judge systems, and human review. The first layer consists of tool calling evaluations with mocked tool responses. These deterministic tests verify that the agent calls the correct tools with appropriate parameters. For example, after mocking a provider search tool to return specific providers, the evaluation checks whether a follow-up request to "book me with William" correctly passes William's provider ID rather than Hugo's ID to the appointment scheduling tool. The team now maintains over 1,000 tool calling evaluation cases, and this layer has become sufficiently robust that they can sometimes ask Claude Code or similar coding assistants to fix failing cases automatically.

The second layer uses LLM-as-judge systems to evaluate qualitative aspects of agent behavior. The team currently employs five distinct judges evaluating completeness of answers, appropriate empathy, clinical scope adherence, clinical accuracy, and what they call Maven accuracy (correctly representing Maven's services and policies). A sixth judge was added to detect non-user-facing text, addressing a class of errors where internal system information like XML debugging output or sub-agent summaries would leak into user-visible responses.

Calibrating these judges against human judgment emerged as a critical challenge. Initially, the judges were far too strict compared to human evaluators. For completeness, the judge would flag interactions where the agent offered to help further and the user simply didn't respond, interpreting this as incomplete when it actually represented a natural conversation ending. Human reviewers understood that an unanswered offer for additional help doesn't constitute incompleteness, but the LLM judge required explicit tuning to understand this conversational dynamic.

The calibration process involves weekly sampling of conversations for human quality assurance review. Human reviewers label conversations according to the same criteria used by automated judges, generating ground truth data for comparison. The team tracks multiple agreement metrics including human-to-human agreement between different reviewers, human-to-AI agreement for each judge, and the performance characteristics of each judge. When human-to-human agreement is low on particular criteria, it signals that the evaluation rubric itself needs refinement before expecting AI judges to perform well.

Through iterative tuning, the team improved judge agreement with human evaluators from approximately 70% to over 90%, reaching the threshold where automated judgments become reliable enough to inform decision-making. However, the team remains cautious about relying solely on automated evaluation, particularly when changing models or making significant architectural modifications.

One challenge with LLM-as-judge approaches involves class imbalance. For some criteria like appropriate empathy, the agent performs well in over 90% of conversations, making true negatives very sparse in production data. Standard accuracy metrics can be misleading when a judge could achieve high accuracy by simply passing everything. The team examines confusion matrices carefully and sometimes resorts to synthetic negative examples. For empathy evaluation, they created synthetic negatives by taking conversations where the agent appropriately expressed empathy and deleting the empathetic opening, creating clear examples of failures to meet the criteria.

The third evaluation layer involves human clinical review. Conversations flagged by automated systems or the initial human QA layer for potential clinical accuracy issues get escalated to actual clinicians for expert review. Recently, this escalation queue has sometimes been empty, so the team proactively samples five to ten conversations even when nothing was flagged, ensuring continuous clinical oversight and catching subtle issues that might slip through other evaluation layers.

## Monitoring Production Conversations and Failure Recovery

The team monitors conversations through multiple channels beyond the formal evaluation pipeline. Exception-based alerting catches outright errors like API failures or malformed responses. These technical failures receive immediate attention and feed into tool calling evaluations to prevent regression.

For more subtle quality issues, the team reviews conversation traces manually, a practice that continues from pre-launch internal testing. This qualitative review often reveals edge cases and unexpected user intents that wouldn't trigger automated alerts but indicate areas for improvement. When such issues are identified, they inform prompt refinements, new evaluation cases, and sometimes architectural changes.

User feedback mechanisms include thumbs up/down buttons on individual messages, but the team learned that explicit user feedback is sparse, occurring in less than 5% of conversations. Relying primarily on thumbs-up/thumbs-down ratings would leave the team blind to quality issues in the vast majority of interactions. Instead, they track behavioral metrics like escalation rate as a proxy for user satisfaction. The current escalation rate remains below 10%, which the team considers quite good compared to previous chatbot implementations.

An important insight around user sentiment is that negative feedback often reflects dissatisfaction with the answer's content rather than the agent's performance. When a user asks if IVF is covered and learns that their employer's plan doesn't include this coverage, they may express frustration or escalate to human support even though the agent provided an accurate answer. The chatbot cannot fix plan limitations, so negative sentiment in these cases doesn't translate to actionable agent improvements. This highlights the complexity of interpreting user feedback in domains where agents deliver information that users may not want to hear, regardless of how well the information is communicated.

## Benefits Question Answering and Scope Expansion

The most significant product expansion since initial launch involved adding a sub-agent for benefits and reimbursement questions. This capability had been explicitly excluded from the first launch because earlier attempts hadn't reached acceptable accuracy levels. Benefits questions proved particularly challenging because they require accurate retrieval and interpretation of plan-specific coverage information, with potentially serious consequences if users receive incorrect information about what services they can access or how much they'll be reimbursed.

The benefits sub-agent enabled Maven to launch to the final wave of users, specifically those using Maven Wallet where the company administers benefits and reimbursements. Companies using Maven Wallet typically allocate specific amounts like $15,000 for fertility services, and Maven handles claim acceptance, approval, and reimbursement. Adding reliable benefits question answering was essential for serving this user population effectively.

This expansion reinforces the team's philosophy of staged rollouts based on confidence in specific capabilities. Rather than launching with every planned feature, they identified a minimum viable product that served core use cases well, gathered production data to understand usage patterns and quality issues, and then expanded scope once the foundation proved solid. The benefits sub-agent could only be added confidently after building robust evaluation systems and understanding how users interact with the broader assistant.

## Clinical Safety and Regulatory Considerations

Operating in healthcare requires particular attention to safety and regulatory concerns. Maven Assistant must navigate questions about medical conditions, symptoms, and treatments without crossing the line into providing medical advice or diagnoses. The clinical scope judge evaluates whether the agent stays within appropriate boundaries, avoiding definitive diagnostic statements or specific medical recommendations that should come from licensed providers.

The agent handles this by providing general information while explicitly not giving personalized medical advice. For example, when asked about eating tuna during pregnancy, the agent might say "Tuna is generally considered something to avoid during pregnancy" rather than "Do not eat tuna" or "You should not eat tuna." This framing provides helpful information while making clear that the agent isn't offering personalized medical guidance.

Emergency situations require special handling with the three-part classifier described earlier. The system must distinguish between genuine present-tense emergencies requiring immediate medical attention, past emergencies being discussed for context, and situations that sound concerning but don't rise to emergency levels. When a true emergency is detected, the agent provides emergency contact information and appropriate guidance rather than attempting to answer medical questions through chat.

The clinical accuracy evaluation and clinician review process provide additional safety layers. All health-related information should be accurate according to current medical understanding, and any deviations get caught through the evaluation pipeline. The team maintains an internal content repository of articles about pregnancy, fertility, and related topics that serves as a grounded source for health question answering, reducing the risk of hallucinated medical information.

## Latency Optimization and Infrastructure Considerations

Latency remains a significant constraint on model and architecture choices. As a real-time chat application, Maven Assistant must feel responsive to users. This prevents using the largest, most capable models or extended reasoning modes that might improve accuracy but create unacceptable wait times. The team typically uses models one size smaller than the flagship offerings, gravitating toward mini variants like GPT-4o Mini.

Guardrail classifiers running on GPT-4o Mini typically complete in about one second with tail latencies reaching two to three seconds. These add to overall response time, creating pressure to minimize the number of sequential guardrail checks. The team has discussed whether to train simpler, faster classifiers for some guardrails, which could potentially reduce latency to hundreds of milliseconds. However, the development and maintenance overhead of custom models hasn't justified the latency gains given current traffic levels.

The team has had some conversations with NVIDIA about self-hosting models on GPUs, particularly in the context of their Maven Intelligence announcement at GTC. However, practical considerations around cost and infrastructure maintenance have kept them on API-based model access. Keeping even a single GPU running continuously to serve their traffic would represent substantial ongoing cost, and the engineering effort to manage self-hosted infrastructure competes with feature development and product improvements. This calculation might change as traffic grows or as self-hosted deployment becomes easier, but the current cost-benefit analysis favors API access.

## Cross-Conversation Memory and State Management

Unlike many conversational AI systems that maintain extensive cross-conversation memory to create persistent user relationships, Maven Assistant initially implemented no memory beyond individual conversations. Each new conversation starts fresh without reference to previous interactions. This design choice aligns with the product's focus on efficient issue resolution rather than extended relationship-building.

However, the team recognizes a distinction between agent memory and company data. While conversations don't carry over, the agent accesses authoritative sources of truth about users through APIs. Due dates, pregnancy status, program enrollment, and other facts aren't stored as agent memory but retrieved from existing systems of record. This provides consistency across conversations without implementing memory systems.

The team has begun exploring cross-conversation memory for preferences and abstract information that doesn't naturally fit into existing data models. For example, a user's preference about conversational tone or incidental comments that might be relevant to future interactions could be stored as agent memory. This represents a new area of work that wasn't part of the initial launch.

An interesting architectural question arises around when to write information back to the company's source of truth systems versus treating it as agent memory. If a user mentions something in conversation that would be useful for their healthcare providers to know at their next appointment, that arguably belongs in the medical record or user profile rather than in agent-specific memory. The team added the ability to update due dates through conversation because this became a high-volume use case, writing updates back to the authoritative system rather than maintaining it as conversational context.

## Adoption Metrics and Growth Trajectory

Conversation volume has increased approximately 10x from the first week after launch to four months later. While some of this growth came from phased rollout to additional user cohorts, the wave one users who had access from day one have increased their usage by roughly 75%. This suggests growing adoption even among users who have had access continuously, potentially indicating that word-of-mouth, improved functionality, or simply learning about the feature over time has driven increased engagement.

Escalation rates remaining below 10% demonstrate that the assistant successfully resolves most user needs without requiring human support intervention. This metric is particularly important because it directly affects support team workload and user experience. High escalation rates would indicate that the agent isn't actually solving problems, just creating an additional step before users reach human help.

The team doesn't report absolute conversation volumes, but the scale has reached the point where they have sufficient data for statistically meaningful evaluation and continuous improvement. The weekly human QA sampling process provides enough labeled data to calibrate judges and identify trends without requiring massive labeling efforts.

## Key Takeaways and Philosophy

The Maven Clinic case study emphasizes several principles for building production AI agents in regulated, high-stakes domains. First, ship early with a truly minimum viable product rather than waiting until every planned feature is ready. The majority of valuable learning comes from real user interactions, and no amount of pre-launch planning can substitute for production data. The team's initial launch excluded benefits questions entirely despite them being a known use case, prioritizing accuracy and safety over feature completeness.

Second, expect to spend substantial effort on problems that only become visible in production. Overly strict guardrails, model understanding of company-specific context, situational awareness within the user interface, and the need for derived content optimized for agent consumption rather than human reading all emerged from real-world deployment. The team spent the first week adjusting guardrails and has continuously refined prompts and context based on observed behavior.

Third, evaluation systems require as much attention as the agent itself. Moving from 70% to 90%+ agreement between automated judges and human evaluators took sustained effort and careful examination of confusion matrices and disagreement cases. Calibrating judges against weekly human QA samples provides ongoing validation that automated metrics track what the team actually cares about. The multi-layered approach combining deterministic tool calling tests, LLM-as-judge evaluation, and clinical expert review creates defense in depth for quality assurance.

Fourth, model selection and migration must balance capability, latency, cost, and development velocity. The team migrated from Gemini to GPT models primarily due to release cadence frustration, accepts latency costs for LLM-based classification to accelerate development, avoids the largest models due to latency constraints, and acknowledges that confidently swapping models requires robust evaluation infrastructure that remains partially aspirational. Each model change requires careful validation because prompts and system designs become entangled with specific model behaviors.

Finally, understanding actual usage patterns fundamentally reshapes priorities. The discovery that health questions dominate conversations while administrative tasks represent a minority contradicted expectations based on where engineering effort had been invested. Features that answer common user questions provide more value than architecturally impressive but rarely-needed capabilities. This can only be learned from production deployment, reinforcing the importance of getting an initial version in users' hands quickly and iterating based on observed needs rather than assumptions about desired functionality.

The Maven Assistant case demonstrates that building reliable, safe AI agents in healthcare requires rigorous engineering discipline, comprehensive evaluation systems, cautious scope expansion, and willingness to iterate rapidly based on production learnings. The four-month journey from initial launch to full deployment at 10x scale illustrates both the challenges and the possibilities of deploying LLM-based agents in regulated industries where accuracy and safety cannot be compromised.
