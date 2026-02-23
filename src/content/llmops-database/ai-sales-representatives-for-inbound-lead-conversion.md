---
title: "AI Sales Representatives for Inbound Lead Conversion"
slug: "ai-sales-representatives-for-inbound-lead-conversion"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6999c037b5cf761a467948e6"
  exportedAt: "2026-02-23T10:04:49.317Z"
  source: "live"
  lastPublished: "2026-02-23T08:20:32.797Z"
  lastUpdated: "2026-02-23T08:20:32.797Z"
  createdOn: "2026-02-21T14:24:55.042Z"
llmopsTags:
  - "chatbot"
  - "customer-support"
  - "realtime-application"
  - "multi-modality"
  - "poc"
  - "high-stakes-application"
  - "question-answering"
  - "prompt-engineering"
  - "rag"
  - "embeddings"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "latency-optimization"
  - "few-shot"
  - "error-handling"
  - "evals"
  - "semantic-search"
  - "langchain"
  - "crewai"
  - "fastapi"
  - "chromadb"
  - "pinecone"
  - "guardrails"
  - "orchestration"
  - "monitoring"
  - "openai"
  - "anthropic"
industryTags: "tech"
company: "ShowMe"
summary: "ShowMe builds AI sales representatives that function as digital teammates for companies selling primarily through inbound channels. The company was founded in April 2025 after the co-founders identified a critical problem at their previous company: website visitors weren't converting to customers unless engaged directly by human sales representatives, but scaling human engagement was too expensive for unqualified leads. ShowMe's solution involves multi-agent voice and video systems that can conduct sales calls, share screens, demo products, qualify leads, and orchestrate follow-up actions across multiple channels. The AI agents use sophisticated prompt engineering, RAG-based knowledge bases, and workflow orchestration to guide prospects through the sales funnel, ultimately creating qualified meetings or closing contracts directly while reducing the need for human sales intervention by approximately 70%."
link: "https://www.youtube.com/watch?v=5jMleOuL7So"
year: 2025
---

## Overview

ShowMe represents a comprehensive LLMOps case study in building production-ready AI sales representatives that function as digital teammates within customer sales organizations. Founded in April 2025, the company emerged from direct experience with a critical business problem: inbound website visitors require personalized human engagement to convert, but the cost of human sales representatives makes it economically unfeasible to engage with all leads, especially those who are early in their journey or unqualified. ShowMe's solution involves deploying sophisticated multi-agent AI systems that can conduct voice and video sales conversations, demonstrate products, qualify leads, and orchestrate multi-channel follow-up campaigns over extended timeframes.

## Initial Product Development and MVP Approach

The founding team took a pragmatic approach to product development, following a "fake it till you make it" methodology where they initially built heavily manual processes before progressively automating components. Their first MVP was developed in just two weeks and featured basic video selection capabilities paired with a voice agent that could explain product features and answer questions. This early version already incorporated both video and voice modalities, which was notably surprising to early customers in early 2025 when real-time voice AI was less common than today.

The initial technical stack was intentionally simple: customers would provide product credentials, ShowMe would manually record videos and break them into segments, build a basic RAG-based knowledge base by scraping documentation and help center content, and deploy a conversational agent on top. This manual-heavy approach allowed them to validate product-market fit with their first customer before investing in automation infrastructure.

## Multi-Agent Architecture Evolution

As the product matured, ShowMe evolved from a single conversational agent to a sophisticated multi-agent architecture with three primary agent types: conversational agents, creator agents, and evaluator agents. This decomposition was driven by practical limitations in current LLM capabilities, particularly around context management and latency constraints for real-time voice interactions.

The conversational agents themselves are further decomposed into specialized sub-agents, each handling specific phases of the sales conversation: greetings and initial discovery, qualification, pitching and product demonstration, and next steps coordination. This decomposition was necessary because heavier models with longer context windows introduced unacceptable latency for voice conversations, while lighter models would exhibit context-loss behaviors like forgetting information gathered early in conversations and repeating qualification questions. By dividing the conversation into specialized agents with focused prompts and smaller context windows, they achieved both acceptable latency and conversation coherence.

An orchestrator agent sits above these conversational sub-agents, managing transitions between conversation phases and routing to the appropriate specialized agent based on conversation state. Each agent type has access to a tailored set of tools relevant to its phase: the pitching agent can pull up specific slides or product demonstrations, the next steps agent can access calendar systems and payment processing tools, and all agents have access to a RAG-based knowledge base.

## Workflow Orchestration and State Management

Beyond individual conversations, ShowMe implements a workflow layer that manages multi-day, multi-channel sales processes. This workflow system maintains state about each prospect across multiple interaction touchpoints, tracking conversation history, qualification status, expressed pain points, and next actions. The current workflow implementation is primarily deterministic, with predefined paths based on conversation outcomes: if a website visitor completes certain qualification steps, trigger a follow-up email; if they don't respond within a day, initiate a phone call; and so on.

However, the team is actively working on an "orchestrator agent" that would sit above the deterministic workflow layer, enabling more flexible, context-aware decision-making. The current limitation is illustrated by an example where a prospect asks to be called back in two hours, but the deterministic workflow can only schedule a call for the next day. The orchestrator agent would be able to break from predefined workflows and create custom actions based on the specific context of each interaction.

This workflow architecture is conceptually similar to state machine patterns seen in other production LLM systems, where individual turns may be agentic but the overall flow maintains explicit state across potentially days or weeks of interactions. This approach provides guard rails against hallucination in critical areas like contact frequency while still enabling sophisticated personalization within each interaction.

## Knowledge Management and RAG Implementation

ShowMe uses a RAG-based approach for knowledge management, but emphasizes that the key to success is data cleanliness rather than architectural complexity. The creator agents are responsible for ingesting customer-provided materials including product documentation, help center articles, sales enablement documents, pitch decks, and call transcripts and transforming them into clean, structured knowledge that can be effectively retrieved.

The team explicitly chose to keep their RAG implementation simple, using standard embedding-based retrieval mechanisms. They found that investing in data cleaning and curation delivered better results than architectural complexity, particularly given the latency requirements for real-time voice conversations. The knowledge base is segmented so that different conversational agents can access relevant subsets: the pitching agent needs product demonstration context, while the qualification agent needs ICP definitions and discovery questions.

An important insight was the value of actual sales call transcripts over static documentation. By analyzing transcripts from multiple sales representatives including both high performers and average performers, they could extract authentic language patterns, common value propositions, objection handling approaches, and discovery question flows. This transcript analysis feeds into what they call "sales skills" or "sales guidance" documents that capture not just product knowledge but the specific way a company's sales team approaches conversations.

## Sales Skills and Company-Specific Customization

A critical challenge in building AI sales agents is balancing generic sales methodology with company-specific approaches. ShowMe addresses this through a combination of generic sales skills embedded in prompts and company-specific training derived from customer materials. The generic components include fundamental sales principles like discovery-before-pitching, active listening, and qualification frameworks.

The company-specific components are more extensive and come from multiple sources. Sales call transcripts are analyzed to extract aha moments, primary value propositions, common customer pain points, and typical conversation flows. Sales enablement materials like ICP matrices, competitive positioning documents, and objection handling guides are codified into agent tools and prompts. The goal is to replicate the onboarding experience a new human sales representative would receive: give the AI agent the same training materials, documentation, and example conversations used for human onboarding.

The system also implements dynamic guidance: based on the detected ICP of the current prospect, different product demonstrations, value propositions, and conversation flows are selected. This is implemented as a tool that the conversational agent can query: given this prospect's role, company size, and expressed pain points, what should I emphasize and demonstrate? The system optimizes for the 90% use case rather than attempting to handle every edge case, recognizing that some conversations will still require human handoff.

## Avatar and Voice Implementation

ShowMe's use of realistic avatars generated by HeyGen was initially controversial within the founding team, with one co-founder skeptical about mimicking humans when users know they're interacting with AI. However, user testing revealed that the realistic avatar serves as a critical affordance that communicates the system's capabilities. When prospects see a realistic avatar in a video call interface similar to Google Meet or Zoom, they intuitively understand that this agent has access to comprehensive knowledge and can handle complex questions, rather than dismissing it as a basic chatbot.

This is part of a broader pattern around affordances: by making the AI interaction closely resemble familiar human sales interactions including video call interfaces, screen sharing capabilities, and natural voice conversations, ShowMe reduces the cognitive load of learning how to interact with the system. Users bring their existing mental models of sales conversations and apply them successfully to the AI agent.

The voice system prioritizes low latency to maintain conversation naturalness. This latency constraint drove many architectural decisions, including the decomposition into specialized sub-agents with smaller context windows and the preference for lighter, faster models over heavier, more capable ones. The team reports that voice latency is "very good" and feels like a real-time conversation, with video calls having only slightly higher latency due to avatar generation.

Importantly, the video demonstration capability is not real-time video generation of the product interface. Instead, ShowMe maintains a library of pre-recorded product demonstration videos covering specific features and workflows. The conversational agent selects and plays relevant clips while providing live voice narration tailored to the prospect's context. This hybrid approach balances demonstration fidelity with system complexity and latency constraints.

## Evaluation and Quality Assurance

Given that ShowMe's agents handle revenue-critical tasks, evaluation and quality assurance are paramount. The team implements a two-phase evaluation approach that evolves as each customer relationship matures. Phase one, typically lasting about one month, requires heavy customer involvement. Customers review nearly every conversation initially, providing feedback on both factual accuracy and sales guidance. This feedback directly generates test cases: when a customer identifies an issue with how a conversation was handled, that conversation becomes a test that the agent must pass in future iterations.

This creates a growing battery of regression tests that ensure prompt improvements don't break previously working behaviors. The approach brings deterministic testing methodologies from software engineering into the probabilistic world of LLM-based agents. Each test captures a specific conversational context and the expected agent behavior, and the agent must successfully handle that scenario before deployment.

Phase two begins after the initial month and aims to reduce customer effort. The evaluator agent assigns confidence scores to every conversation based on multiple dimensions: answer accuracy, appropriate use of sales guidance, qualification completeness, and user sentiment/frustration detection. Low confidence scores automatically flag conversations for customer review, while high confidence conversations are assumed correct. This reduces review burden from nearly 100% of conversations to approximately 5% over time, similar to spot-checking patterns common in customer success operations.

The evaluator agent also extracts structured information from each conversation into custom fields: prospect role, company details, expressed pain points, next steps, qualification status, and more. Customers can define additional custom fields based on their specific qualification criteria. This structured extraction serves multiple purposes: it populates CRM records, informs follow-up actions in the workflow, and provides data for aggregate quality metrics.

The team distinguishes between two types of quality issues: sales guidance problems and knowledge problems. Guidance issues, like failing to route a prospect to the appropriate product demonstration or skipping discovery steps, are typically resolved during phase one through prompt refinement and workflow adjustments. Knowledge issues, where the agent provides incorrect or incomplete product information, are ongoing and never fully resolved, similar to the challenge of keeping human sales representatives updated as products evolve.

## Deployment and Rollout Strategy

ShowMe takes a cautious, graduated approach to customer rollout, recognizing the revenue criticality of sales conversations. New customers begin with proof-of-concept deployments on low-risk traffic: lowest-quality leads, specific product lines, or limited geographic regions. This allows the customer to build confidence in agent performance before expanding scope.

Rollout to full production typically takes one to two months, during which the customer is heavily involved in evaluation and the ShowMe team is actively refining prompts and workflows. This extended onboarding is analogous to hiring and training a human sales representative, and customers generally accept the timeline because they're familiar with sales rep ramp periods.

A critical insight was that conversation quality alone is insufficient; customers need visibility into that quality to build trust. ShowMe addresses this through multiple transparency mechanisms: all conversations are logged to the customer's CRM with full transcripts, a Slack integration provides real-time notifications of important events like qualified meetings or hand-off requests, dashboards surface aggregate metrics on conversion rates and conversation quality, and the agents themselves "report" on their performance similar to how human sales reps provide updates to managers.

This emphasis on transparency and treating the AI agent as a teammate rather than just a tool extends throughout the product. The onboarding process happens through Slack conversations where customers interact with creator agents to provide training materials and configuration preferences, mimicking how they might onboard a human employee. The goal is to minimize the cognitive overhead of "learning a new tool" and instead leverage existing mental models of team collaboration.

## Technical Stack and Tooling

While the transcript doesn't exhaustively detail every technology choice, several components are mentioned. HeyGen provides realistic avatar generation for video calls. The knowledge base uses standard RAG patterns with embedding-based retrieval. Multiple LLM models are used, with careful selection based on latency requirements: lighter, faster models for conversational agents that need sub-second response times, and potentially heavier models for creator and evaluator agents where latency is less critical. The system integrates with customer CRMs like HubSpot and Salesforce, calendar systems for meeting scheduling, Stripe for payment processing, communication channels including website widgets, phone systems, WhatsApp, and email, and Slack for customer collaboration and agent reporting.

## Challenges and Future Direction

The team is transparent about several ongoing challenges. The deterministic workflow layer, while providing necessary guard rails, limits flexibility in responding to prospect-specific contexts. The orchestrator agent being developed aims to address this but introduces risks around hallucination in critical areas like contact timing and frequency. Onboarding new customers remains labor-intensive despite progressive automation, with forward-deployed engineers still manually involved in prompt refinement and workflow configuration. Knowledge base maintenance is an ongoing challenge as customer products evolve. The planned self-service, product-led-growth motion is particularly difficult because agent configuration requires deep understanding of both LLM capabilities and sales methodology.

Looking forward, ShowMe is working on the intelligent orchestrator agent to replace deterministic workflows, increased automation of the customer onboarding process to reduce time-to-value, self-service tooling that would allow customers to configure and deploy agents without ShowMe engineering involvement, and expansion beyond sales to other digital worker roles like customer success and support, leveraging the product knowledge already ingested for sales agents.

The team notes an optimistic perspective on technical challenges given the rapid pace of improvement in foundation models and adjacent technologies. Problems that seemed intractable six months ago have been solved by new model releases or new tooling, suggesting that current limitations around context windows, latency, reasoning capabilities, and hallucination may be substantially mitigated in the near future. This informs their strategy of focusing on deep customer understanding and sales domain expertise as differentiators rather than any particular technical implementation, which will inevitably evolve.

## LLMOps Insights and Patterns

Several broader LLMOps patterns emerge from ShowMe's experience. Agent decomposition is valuable not just for engineering reasons but for managing cognitive load; specialized agents with focused responsibilities are easier to prompt, test, and improve than monolithic general-purpose agents. State management across extended timeframes is critical for any multi-turn agentic system and benefits from explicit, deterministic state tracking even when individual turns involve agentic reasoning. Regression testing with conversation-based test cases brings software engineering discipline to LLM development and is essential for production deployments in critical domains. Latency constraints significantly impact architecture and model selection, particularly for real-time interactive applications like voice. Data quality trumps architectural complexity in RAG systems, with investment in cleaning and curating knowledge bases delivering better results than sophisticated retrieval algorithms. Human-in-the-loop evaluation is necessary initially but must be systematically reduced to make operations sustainable at scale. Confidence scoring and automated flagging enables effective spot-checking patterns. Affordances and UI choices significantly impact how users interact with AI systems; making the AI feel familiar and human-like can reduce friction and increase engagement even when users know they're interacting with AI. Progressive automation from manual to automated processes is a practical path to production, allowing fast initial validation while building toward scalable operations. Domain expertise in sales methodology is as important as technical AI capabilities for building effective sales agents. Customer transparency and trust-building are critical for adoption in revenue-critical applications, requiring extensive logging, reporting, and explainability.

ShowMe's journey illustrates the complexity of deploying LLMs in production for critical business functions. Success requires not just technical sophistication in areas like multi-agent orchestration, RAG implementation, and real-time inference, but also careful attention to user experience, systematic quality assurance, graduated rollout strategies, and domain-specific customization. The case study demonstrates that current LLM technology is capable of handling sophisticated, multi-turn, multi-day sales processes, but requires thoughtful engineering and operational practices to deploy reliably and safely in production environments.