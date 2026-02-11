---
title: "AI-Powered Onboarding Agent for Small Business CRM"
slug: "ai-powered-onboarding-agent-for-small-business-crm"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "693be1c25724a3e32c26fba6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:35:54.149Z"
  createdOn: "2025-12-12T09:34:58.084Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "document-processing"
  - "content-moderation"
  - "summarization"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "chunking"
  - "system-prompts"
  - "semantic-search"
  - "vector-search"
  - "langchain"
  - "llama-index"
  - "fastapi"
  - "postgresql"
  - "databases"
  - "orchestration"
  - "monitoring"
  - "documentation"
  - "openai"
  - "anthropic"
industryTags: "tech"
company: "HoneyBook"
summary: "HoneyBook, a CRM platform for small businesses and freelancers in the United States, implemented an AI agent to transform their user onboarding experience from a generic static flow into a personalized, conversational process. The onboarding agent uses RAG for knowledge retrieval, can generate real contracts and invoices tailored to user business types, and actively guides conversations toward three specific goals while managing conversation flow to prevent endless back-and-forth. The implementation on Temporal infrastructure with custom tool orchestration resulted in a 36% increase in trial-to-subscription conversion rates compared to the control group that experienced the traditional onboarding quiz."
link: "https://www.youtube.com/watch?v=M-kyQ-FmESc"
year: 2025
seo:
  title: "HoneyBook: AI-Powered Onboarding Agent for Small Business CRM - ZenML LLMOps Database"
  description: "HoneyBook, a CRM platform for small businesses and freelancers in the United States, implemented an AI agent to transform their user onboarding experience from a generic static flow into a personalized, conversational process. The onboarding agent uses RAG for knowledge retrieval, can generate real contracts and invoices tailored to user business types, and actively guides conversations toward three specific goals while managing conversation flow to prevent endless back-and-forth. The implementation on Temporal infrastructure with custom tool orchestration resulted in a 36% increase in trial-to-subscription conversion rates compared to the control group that experienced the traditional onboarding quiz."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-onboarding-agent-for-small-business-crm"
  ogTitle: "HoneyBook: AI-Powered Onboarding Agent for Small Business CRM - ZenML LLMOps Database"
  ogDescription: "HoneyBook, a CRM platform for small businesses and freelancers in the United States, implemented an AI agent to transform their user onboarding experience from a generic static flow into a personalized, conversational process. The onboarding agent uses RAG for knowledge retrieval, can generate real contracts and invoices tailored to user business types, and actively guides conversations toward three specific goals while managing conversation flow to prevent endless back-and-forth. The implementation on Temporal infrastructure with custom tool orchestration resulted in a 36% increase in trial-to-subscription conversion rates compared to the control group that experienced the traditional onboarding quiz."
---

## Overview

HoneyBook is a CRM system designed for small businesses and freelancers in the United States, serving photographers, doulas, consultants, and similar professionals. The platform helps users manage their business operations from contract signing through invoicing and general operational management. The case study, presented by Noa, a data scientist at HoneyBook, describes how the company transformed its user onboarding experience by replacing a static questionnaire with an intelligent conversational AI agent that runs in production.

The core problem HoneyBook identified was that new users arriving at the platform after completing a basic onboarding flow were left somewhat confused about what to do next. The system offered many capabilities, but these were not clearly explained through the initial flow. Additionally, users had a limited trial period to evaluate whether the platform was worth paying for, and HoneyBook wanted to optimize the conversion of these trial users to paid subscribers. The existing onboarding process was generic, provided no opportunity for users to ask questions, and failed to highlight relevant integrations that might be crucial for specific business types (such as a photographer needing to know if HoneyBook integrates with their photo management system).

## The Agent Architecture

HoneyBook's solution was to create a guided and personalized onboarding experience through an AI agent that serves as the first team member a user meets when entering the system. The agent is designed with several key capabilities that align with standard agentic frameworks: observation (ability to read conversation text and receive external data), reasoning (drawing conclusions from observed data), planning (strategizing to achieve goals based on what was observed and understood), decision-making, and action execution (performing actual operations in the system).

The onboarding agent architecture consists of four main components that work together:

**Conversation Goals**: The agent operates with clearly defined objectives for each conversation. In the onboarding context, these goals are very explicit, and the agent is always aware that it needs to achieve three specific goals throughout the interaction. Once these goals are met, the conversation naturally converges toward completion.

**Context Engineering**: This involves careful management of the context that the agent holds throughout the conversation. Every piece of information added to the agent's context—whether it's the system prompt, tool descriptions, or tool responses—becomes part of the prompt and significantly influences how the conversation unfolds. The team emphasized the "garbage in, garbage out" principle, making context management a critical engineering concern.

**Agent Handoffs**: The system supports the ability to transfer conversations to specialized agents. This allows different agents to develop expertise in specific domains rather than overwhelming a single agent with too many responsibilities, which could lead to what the presenter called "spaghetti prompts."

**Tools**: The agent uses tools to observe and modify the real world. HoneyBook implemented tools through a contract between the agent and each tool, where the agent knows exactly what each tool does based on its name and description, when to call it, what inputs to provide, and what the tool will return.

## Tool Implementation: Three Categories

HoneyBook developed three types of tools to enable the full range of agent capabilities:

### RAG-Based Tools

The first major challenge was addressing a knowledge gap—the agent needed to represent HoneyBook authentically as a real team member. To achieve this, they implemented a help center information tool using Retrieval-Augmented Generation (RAG). The help center consists of public articles explaining the system's features and capabilities.

The RAG implementation was built using Snowflake's Cortex context, chosen for two key reasons: their data was already stored in Snowflake (eliminating the need for an external data source to maintain), and Cortex provides automatic RAG updating without requiring a separate update process. The implementation query was remarkably simple, defining the field for search (article chunk text), attributes for filtering data before retrieval (such as filtering articles to show only beginner-level content during onboarding rather than advanced features), update frequency, and the embedding model to use.

However, initial implementation received complaints that the agent was "digging too deep" into information, providing overly detailed and verbose responses. To address this, HoneyBook implemented dynamic retrieval modes. The agent can now choose between two retrieval strategies: "exploration mode" (where the agent receives approximately 15 relevant chunks that are more diverse and high-level) and "deep dive mode" (where the agent retrieves only the 5 most relevant chunks but then fetches the complete articles for those chunks, providing much more detailed information). The agent autonomously decides which mode to use based on the conversation context.

The presenter emphasized that despite discussions about whether RAG is still necessary in the age of advanced language models, the answer is definitively yes. By leveraging the agent's ability to formulate its own search queries dynamically and choose between retrieval modes, RAG enables much more sophisticated and context-appropriate access to external knowledge.

### Action-Execution Tools

Knowledge alone was insufficient for a sales-oriented onboarding process—the agent needed to provide immediate value during the conversation. HoneyBook created configuration tools that can generate real assets in the system, specifically contracts and invoices.

The invoice generation tool exemplifies how personalization works in practice. An invoice is essentially a payment agreement between a business owner and their client, detailing the services offered. A wedding photographer might offer services like day-of shooting, album creation, and photo editing, while a doula would have completely different services. During onboarding, users input their website, which HoneyBook scrapes to extract the services they offer. If the website doesn't provide detailed service information, the system uses a business summary to infer likely services.

When the agent calls the invoice generation tool, it retrieves the user's services, along with a schema that the tool must adhere to and any existing invoices (to support editing rather than just creation). This information feeds into a prompt generation process that creates the invoice, followed by validation and system integration. The presenter noted that while this validation step might sound trivial, ensuring that an LLM-generated invoice works properly with the system's automation and meets all validation requirements is actually quite significant.

Critically, the agent is always updated about what was executed by the tool. The tool returns a text response that informs the agent exactly what was performed behind the scenes. This response is saved in the conversation history as a tool message, making it part of the ongoing prompt and ensuring the agent maintains awareness of all actions taken.

### Conversation Management Tools

Because the onboarding context is fundamentally a sales process, the conversation needs to converge toward a conclusion. Language models, if left unmanaged, tend to always ask another question or make another suggestion, never naturally concluding. HoneyBook implemented several tools to manage this:

**Help Me Answer**: A button users can press at any time to receive suggested responses from the agent, helping to move conversations forward when users are unsure how to proceed.

**Notes Tool**: Allows the agent to take notes on things it learns about the user, similar to how a salesperson would record observations during a sales process. The agent can record information like pain points in the user's business or business goals they mention.

**Conversation Completion**: The agent constantly tracks its three conversation goals. Once these goals are achieved, the conversation is ready to conclude. At this point, the main onboarding agent can hand off to a wrap-up agent that specializes in closing conversations and technically ending the session.

## Infrastructure and Production Deployment

HoneyBook built their agent infrastructure on Temporal, an open-source system that enables reliable and secure workflow orchestration. Temporal provides several critical capabilities: state management, retry and failure handling, visibility into what's happening in the system, and the ability to run different programming languages on the same worker. This last feature was particularly valuable for HoneyBook, as their agent code is written in Python while their product code is written in Ruby, and they needed both to run together on the same worker for close integration.

The Temporal UI provides comprehensive visibility into agent operations. The team can see the execution times for each action, observe handoffs between agents (such as the onboarding agent handing off to the files agent), examine the agent's internal reasoning process, see decisions to call specific tools, and view how the agent responds to tool failures. This transparency provides a complete picture of system behavior in a convenient format.

Importantly, HoneyBook chose to implement their own agent framework on top of Temporal rather than using an existing framework. While OpenAI had recently released their own implementation on Temporal, it didn't support capabilities HoneyBook required, particularly streaming—a critical feature for managing real-time conversations.

### Tool Strategies: Managing Determinism in a Stochastic World

One of the more sophisticated features HoneyBook implemented is "tool strategies," which allows them to model dependencies and rules between tools and decide intelligently how to execute them. The presenter highlighted a common frustration: writing prompts with emphatic instructions like "you must must must must do something," trying to force deterministic behavior from inherently stochastic models.

Tool strategies provide a more deterministic approach. For example, a support agent that answers user questions should always be aware of what's currently available and relevant. The help center tool should always be consulted. Rather than leaving this decision to the model, HoneyBook can run Python code that checks whether the help center tool was called in the current agent iteration, and if not, automatically creates a call to that tool (with the agent still deciding what parameters to send).

The code structure is straightforward: check if the help center tool was called in this iteration; if not, call it; if it was already called, continue with the normal flow. The presenter noted that this is a simple example, but many other dependencies and rules can be modeled using this approach, bringing more reliability to agent behavior.

## Evaluation and Results

To measure the impact of their onboarding agent, HoneyBook conducted a controlled experiment with their trial user population. They held out 10% of users as a control group who received the old experience (the original quiz-based onboarding), while 90% received the new AI-powered conversational experience.

The results were significant: users who received the AI onboarding experience showed a 36% increase in conversion to paid subscriptions compared to the control group. This represents a substantial impact on business metrics, demonstrating that more trial users decided to subscribe after experiencing the personalized agent-guided onboarding versus the generic static flow.

## Key Lessons and Production Considerations

The presenter shared several insights from bringing this agent to production:

**Conversation Engineering**: Since agents fundamentally manage conversations, these conversations need to be well-engineered. This means defining clear goals, splitting agent capabilities to avoid overwhelming a single agent with too many responsibilities, and actively designing the conversation flow rather than hoping the model will figure it out.

**Product Integration**: Conversation alone isn't enough to create real impact. The agent needs the ability to actually do things that change the system state. Being able to generate real contracts and invoices that integrate with the platform was crucial to providing immediate value during onboarding.

**Context Management Discipline**: Everything added to the agent becomes part of its context and influences behavior—the system prompt, tool descriptions explaining when to call tools, and tool responses. The engineering team needs to be deliberate about all these elements because, as the presenter emphasized, "garbage in, garbage out."

**Balanced Perspective on Claims**: While the presentation showcased impressive results, it's important to note that this is a first-party account from HoneyBook promoting their own implementation. The 36% conversion improvement is substantial, but we don't have details about the size of the control group, confidence intervals, or whether other factors might have influenced results. The implementation clearly required significant engineering effort—custom framework development, careful prompt engineering, dynamic retrieval modes, and sophisticated tool orchestration—suggesting this isn't a simple drop-in solution. Organizations considering similar implementations should expect to invest in substantial engineering resources and iterative refinement based on real user interactions.

The case study represents a comprehensive production deployment of an LLM-based agent system with careful attention to the practical concerns of reliability, observability, and business impact measurement. The use of established infrastructure like Temporal and Snowflake Cortex, combined with custom engineering for agent-specific requirements, demonstrates a pragmatic approach to bringing generative AI capabilities into a production business application.