---
title: "Building Production AI Agents for Lead Response and Business Automation"
slug: "building-production-ai-agents-for-lead-response-and-business-automation"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "prompt-engineering"
  - "agent-based"
  - "few-shot"
  - "human-in-the-loop"
  - "evals"
  - "harness-engineering"
  - "langchain"
  - "monitoring"
  - "openai"
industryTags: "tech"
company: "Podium"
summary: "Podium, a communications platform company serving local businesses, built production AI agents to solve the critical \"speed to lead\" problem where the first business to respond to customer inquiries typically wins the sale. Starting in 2023 with early GPT-3 access from 2020, they developed Jerry, an AI agent that responds to inbound leads for car dealerships, home services, and medical companies by accessing inventory data and scheduling appointments. The agent became so effective that customers reported closing more leads and occasionally arrived at dealerships asking to meet \"Jerry\" in person to thank them. Podium has since expanded to multiple agents handling different business roles, generating over $100 million in AI revenue while developing sophisticated evaluation systems, observability practices, and agent engineering workflows using LangSmith as their core LLMOps platform."
link: "https://www.youtube.com/watch?v=J77ro1AJGa0"
year: 2023
seo:
  title: "Podium: Building Production AI Agents for Lead Response and Business Automation - ZenML LLMOps Database"
  description: "Podium, a communications platform company serving local businesses, built production AI agents to solve the critical \"speed to lead\" problem where the first business to respond to customer inquiries typically wins the sale. Starting in 2023 with early GPT-3 access from 2020, they developed Jerry, an AI agent that responds to inbound leads for car dealerships, home services, and medical companies by accessing inventory data and scheduling appointments. The agent became so effective that customers reported closing more leads and occasionally arrived at dealerships asking to meet \"Jerry\" in person to thank them. Podium has since expanded to multiple agents handling different business roles, generating over $100 million in AI revenue while developing sophisticated evaluation systems, observability practices, and agent engineering workflows using LangSmith as their core LLMOps platform."
  canonical: "https://www.zenml.io/llmops-database/building-production-ai-agents-for-lead-response-and-business-automation"
  ogTitle: "Podium: Building Production AI Agents for Lead Response and Business Automation - ZenML LLMOps Database"
  ogDescription: "Podium, a communications platform company serving local businesses, built production AI agents to solve the critical \"speed to lead\" problem where the first business to respond to customer inquiries typically wins the sale. Starting in 2023 with early GPT-3 access from 2020, they developed Jerry, an AI agent that responds to inbound leads for car dealerships, home services, and medical companies by accessing inventory data and scheduling appointments. The agent became so effective that customers reported closing more leads and occasionally arrived at dealerships asking to meet \"Jerry\" in person to thank them. Podium has since expanded to multiple agents handling different business roles, generating over $100 million in AI revenue while developing sophisticated evaluation systems, observability practices, and agent engineering workflows using LangSmith as their core LLMOps platform."
notion:
  pageId: "3aaf8dff-2538-802e-9cd5-f5ea9f7b70e5"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T12:07:00.000Z"
  lastEditedTime: "2026-07-27T12:07:00.000Z"
  publishedAt: "2026-07-27T12:12:32Z"
---

## Overview and Business Context

Podium is a communications platform company with over 10 years of operating history, serving local businesses across automotive dealerships, home services companies, and medical practices. The company's AI journey began unusually early when their founders, Eric Gray and Dennis Steele, participated in Y Combinator's 2016 batch where they connected with Sam Altman, which led to early GPT-3 access in 2020. However, their serious production deployment of LLM-based agents began in 2023, capitalizing on this early experience and the improved capabilities of newer language models.

The core business problem Podium addressed was "speed to lead," a critical metric in local business success where the first company to respond to an inbound customer inquiry almost always wins that customer's business. Initially, Podium used LLMs for various applications including review responses and reply suggestions within their platform, but the lead response use case emerged as the most impactful opportunity. The company has since scaled to over $100 million in AI revenue, representing a dramatic transformation of their business model over the past two to three years.

## Initial Agent Development and Architecture

Podium's first production agent, branded as Jerry, was designed to handle lead responses for automotive dealerships. The agent's core functionality combined two key elements: accessing real-time inventory data about what vehicles actually existed on the lot, and applying business-specific playbooks that defined how each dealership wanted to respond to leads. The agent's primary job was to provide genuinely useful information to potential customers and schedule test drives on behalf of the dealership.

The early development phase was characterized by what they describe as "brittle" systems and extremely challenging prompt engineering work. The team recalls that in the beginning, prompt engineering often meant simply trying to prevent the model from replying with gibberish. This reflects the state of LLM technology in the 2023 timeframe when model reliability and instruction-following were less mature than they are today. The significant improvements in models' ability to take directives and instructions over this period played a crucial role in making production agents viable.

## Quality Assurance and Evaluation Evolution

Podium's approach to quality assurance evolved significantly from crude manual processes to more sophisticated evaluation systems. In the earliest stages, they used what they generously call "evals" but which were essentially manual review processes. The team would write scripts that printed inputs and outputs for approximately 50 test cases, often referred to as golden evaluations, and then manually review each individual case to understand what effect their prompt changes had produced. This manual review process was acknowledged as the worst part of early development but was considered essential for understanding model behavior.

The challenge extended beyond pre-production testing to understanding the long tail of edge cases encountered in production. The team emphasizes that there is no substitute for getting agents into the wild and observing real-world behavior. Users behaving in unexpected ways, asking questions from different angles, or having unique requirements created scenarios that were impossible to fully anticipate in controlled testing environments. This led to significant investment in building iteration loops that could continuously improve agent quality based on production observations.

The evaluation infrastructure evolved to become more robust over time, progressing from simple Google documents with 50 input-output pairs to integrated evaluation systems within LangSmith. A key practice that emerged was the ability to take specific production traces that exhibited problems and convert them directly into evaluation cases, creating a continuous feedback loop between production issues and regression testing.

## Production Deployment and Real-World Results

The production deployment yielded remarkably strong business results. Customers reported closing more leads and generating more revenue as a result of faster, higher-quality responses. In some cases, the quality of the AI agent's responses exceeded what human staff members were providing. The anecdotal evidence of success became almost legendary within the company, with stories of customers arriving at dealerships asking to speak with "Jerry" personally to thank them for excellent service, or even bringing cookies to give to Jerry. While these stories might sound improbable, they speak to the genuine quality of the interactions the agent was providing and the value customers perceived in receiving useful, timely responses that helped them make purchasing decisions faster.

The business impact was quantifiable beyond anecdotes. The fact that customers were willing to pay for the agent service and reported measurable improvements to their bottom line through increased lead conversion provided strong validation of the approach. This commercial success became a key signal that encouraged Podium to invest more heavily in expanding their agent capabilities.

## Scaling to Multiple Agents and Platform Development

Podium has expanded from a single agent to approximately half a dozen agents handling different roles within customer businesses, including sales departments, warranty departments, and other functions across automotive, HVAC contracting, and other industries. A critical lesson from this scaling process was the need for a unified platform to build agents on top of, rather than treating each agent as a bespoke development effort.

The team discovered substantial commonality in underlying agent architecture across different roles, even when those roles existed in quite different industries. For example, the role of someone working in the sales department of an automotive dealership shares architectural patterns with someone in the warranty department of an HVAC contractor. The key to scaling was building the right primitives and abstractions that could be exposed to users, allowing them to define specific behaviors for their business while leveraging shared underlying infrastructure.

Each agent deployment includes unique playbooks and tools based on the specific integrations available to that business, and customer preferences can influence how those tools are used. The challenge was building a mental model that matched how business owners think about their operations while maintaining consistency in the underlying platform. This approach enabled them to scale a pattern into an entire fleet of agents rather than hand-rolling each new agent from scratch.

## Observability and Debugging with LangSmith

LangSmith became a critical component of Podium's LLMOps infrastructure, initially adopted to understand agent chain of thought and the series of model requests that led to specific outcomes. A key insight they developed was that agent behavior that seems irrational or incorrect at surface level often becomes obviously rational when you examine the full context the agent was provided. The agent was behaving rationally given its instructions, reasoning, and context, even when the outcome wasn't what was desired.

This recognition led to a focus on the details of context and instruction quality as the primary source of potential improvements. While LLMs can seem like black boxes, the behavior is not entirely opaque when you have tooling that shows the complete chain of thought and behavioral reasoning from beginning to end. LangSmith provided this visibility across the entire decision-making process.

The observability layer extended beyond just LangSmith traces. Podium built additional state machine tracking that captured state transitions programmatically, providing another layer of insight beyond model inputs and outputs. This combination of LLM-specific observability through LangSmith and programmatic state tracking created a comprehensive picture of what happened during any given interaction, which proved essential for debugging edge cases and optimizing behavior.

## Runtime Evolution and Build vs. Buy Decisions

An important strategic decision in Podium's LLMOps journey involved their agent runtime infrastructure. Initially, when they launched their agents in 2023, there wasn't a mature product offering that could serve as the runtime for their agents. This led them to hand-roll their own runtime, which they then spent considerable time refactoring and rebuilding to better represent the patterns emerging in their agents.

However, they eventually recognized that building and maintaining a custom runtime was not where they delivered unique value or where they should invest their innovation capital. This realization came particularly as they discovered LangSmith deployments as an alternative. The number of edge cases and bugs they encountered when building their own runtime made it clear that even if they could engineer solutions to all these problems, doing so would represent an opportunity cost against other investments that would actually differentiate their product.

This decision reflects a broader theme in modern AI engineering that the team emphasizes: with the proliferation of AI code editors and development tools that make it feel like you can build anything quickly, there is a real temptation to hand-roll custom solutions for every problem. The team's advice is to focus on finding the lane where you deliver unique value, because coding agents have indeed made it possible to build almost anything, but that doesn't mean you should build everything yourself. Agent runtime infrastructure represents the kind of general-purpose abstraction that is not worth reinventing when mature solutions exist.

## Agent Engineering Workflow and Best Practices

Podium's agent engineering workflow centers on rapid iteration and customer feedback. They emphasize that the easiest part of building an agent is creating something that does something magical in a controlled environment—the demo is always the easiest thing to build. The real challenge is maintaining quality and handling edge cases in production.

Their development lifecycle prioritizes speed to customer feedback. They build a proof of concept as quickly as possible and get it in front of customers to pressure test and iterate against. There is no substitute for real-world usage in discovering where the edges and problems exist. The iteration loop involves several key activities:

User feedback collection is integrated into both Podium's own systems and the LangSmith platform, enabling them to identify specific traces that require review. This direct connection between user dissatisfaction and the specific model interactions that caused it is crucial for efficient debugging.

Customer conversations provide essential context because the team's understanding of how an agent should behave may not match the decade of experience that business owners have in doing their jobs well. These conversations help identify gaps between expected and actual behavior that might not be obvious from trace analysis alone.

The learnings from trace review and customer conversations get codified into evaluation datasets that represent the bar they want to maintain and optimize against. The problem is described as a game of whack-a-mole where fixing one specific issue often reveals related problems that require special handling. Converting these into formal evaluation cases prevents regression and builds up a comprehensive test suite over time.

LangSmith serves as the centralized platform for storing all decision-making traces, making it convenient to translate production traces into evaluation cases. This tight integration between production observability and evaluation infrastructure creates an efficient feedback loop.

## Organizational Scaling and Platform Adoption

LangSmith functions as Podium's sanctioned agent engineering platform across the organization, providing benefits beyond just technical capabilities. Having a shared platform that teams working on different products can use creates consistency in patterns and practices. Teams that are new to building agents may not initially understand the importance of observability, but by using LangSmith they can instrument their agents relatively trivially and follow deployment patterns that are known to scale well.

This approach provides room for organizational growth as the company expands agent development beyond the initial expert teams. Best practices developed by experienced teams can be extended to new teams because they are all using the same platform and can follow the same patterns. This has been described as a huge tailwind that not only accelerates initial development but also helps teams grow beyond what they originally anticipated for an agent's use case or the type of iteration they would need to do.

As teams are onboarded to build agents, they may not initially understand concepts like online evaluation systems, but the platform ensures these capabilities are available when needed. This is particularly valuable in a rapidly evolving field where best practices are still emerging and teams need to scale their sophistication over time.

## Technical Challenges and Lessons Learned

Several key technical challenges and lessons emerge from Podium's experience. The importance of context and communication is repeatedly emphasized as the hardest part of agent engineering. Getting the right context to the agent and ensuring clear communication of instructions is where most of the optimization work happens.

Red teaming and pressure testing at scale was essential for building agents that could work across a wide range of different dealerships and companies in different industries. Early crude evaluation methods evolved into more sophisticated systems, but the fundamental need to test extensively across diverse scenarios remained constant.

The long tail of edge cases represents an ongoing challenge. No amount of pre-production testing can fully anticipate the variety of ways users will interact with agents in the wild. This requires not just good testing before launch, but robust systems for identifying, analyzing, and addressing issues that emerge in production.

The evolution of LLM capabilities themselves played a significant role. The journey from models that sometimes produced gibberish to models that reliably follow instructions and directives enabled many of the advanced agent capabilities that Podium has deployed. This suggests that agent capabilities are partially constrained by underlying model quality, and improvements in base models can unlock new possibilities for production applications.

## Future Direction and Strategic Advice

Podium's future direction involves expanding from perfecting relatively simple interactions to enabling business owners and employees to automate more of how their businesses run. This includes not just customer-facing applications but allowing users to build bespoke agents for running business operations. They see this as requiring continued investment in the models and abstractions that represent how people think about their jobs, with particular focus on perfecting the domains, entities, and mental models they curate for customers.

For practitioners just starting their agent engineering journey today, Podium's advice emphasizes focusing on what makes your agents differentiated. The ecosystem has matured significantly since 2023, with established patterns, best practices, and platforms like LangSmith available as go-to solutions. Building a new agent today involves fewer unknowns than in the early days, which should allow teams to focus innovation on what will make their agent disruptive rather than reinventing foundational infrastructure.

This represents a balanced view that acknowledges both the opportunities and constraints in the current LLMOps landscape. While building custom solutions for everything is tempting and technically feasible, the real competitive advantage comes from identifying where unique value can be delivered and leveraging mature platforms for commoditized capabilities like runtime infrastructure, observability, and evaluation systems.
