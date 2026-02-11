---
title: "AI-Powered Tour Guide for Financial Platform Navigation"
slug: "ai-powered-tour-guide-for-financial-platform-navigation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3eb70090cb4f17ce959f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:34:44.462Z"
  createdOn: "2024-11-21T14:07:51.772Z"
llmopsTags:
  - "customer-support"
  - "documentation"
  - "error-handling"
  - "guardrails"
  - "human-in-the-loop"
  - "openai"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
  - "security"
  - "system-prompts"
  - "unstructured-data"
industryTags: "finance"
company: "Ramp"
summary: "Ramp developed an AI-powered Tour Guide agent to help users navigate their financial operations platform more effectively. The solution guides users through complex tasks by taking control of cursor movements while providing step-by-step explanations. Using an iterative action-taking approach and optimized prompt engineering, the Tour Guide increases user productivity and platform accessibility while maintaining user trust through transparent human-agent collaboration."
link: "https://www.langchain.com/breakoutagents/ramp"
year: 2024
seo:
  title: "Ramp: AI-Powered Tour Guide for Financial Platform Navigation - ZenML LLMOps Database"
  description: "Ramp developed an AI-powered Tour Guide agent to help users navigate their financial operations platform more effectively. The solution guides users through complex tasks by taking control of cursor movements while providing step-by-step explanations. Using an iterative action-taking approach and optimized prompt engineering, the Tour Guide increases user productivity and platform accessibility while maintaining user trust through transparent human-agent collaboration."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-tour-guide-for-financial-platform-navigation"
  ogTitle: "Ramp: AI-Powered Tour Guide for Financial Platform Navigation - ZenML LLMOps Database"
  ogDescription: "Ramp developed an AI-powered Tour Guide agent to help users navigate their financial operations platform more effectively. The solution guides users through complex tasks by taking control of cursor movements while providing step-by-step explanations. Using an iterative action-taking approach and optimized prompt engineering, the Tour Guide increases user productivity and platform accessibility while maintaining user trust through transparent human-agent collaboration."
---

## Overview

Ramp, a financial operations platform that automates bill payments, credit card access, and expense management, built an AI-powered agent called "Tour Guide" to help users navigate their platform more effectively. The core problem they were solving was reducing the onboarding curve for new users and decreasing dependency on customer support calls for navigation and task completion questions. Rather than pursuing full automation—which they considered higher risk and potentially uncomfortable for users dealing with financial operations—they designed a human-agent collaborative system where the AI visibly performs actions step-by-step while users maintain the ability to intervene.

This case study is notable for its emphasis on user experience design in production AI systems, demonstrating that deploying LLMs effectively requires careful consideration of how users interact with and trust AI-driven features, particularly in sensitive domains like finance.

## Cognitive Architecture and Action Generation

The Ramp engineering team made a key architectural insight that simplified their agent design: every user interaction with their web application could be categorized into three atomic operations—scrolling, clicking a button, or filling in text. This constraint allowed them to design the Tour Guide agent to generate exactly one action at a time rather than attempting to plan entire multi-step workflows upfront.

The iterative action-taking approach works by taking the current state of the web application session as input and generating the next best action. Once the action is executed, the resulting altered session state is fed back to generate the subsequent action. According to the team, this approach proved more effective than designing entire tours from start to finish, which would require many sequential actions to fulfill a user request. This design choice reflects a common pattern in production LLM systems: breaking complex tasks into smaller, verifiable steps reduces error propagation and makes the system more predictable.

Initially, the team built a two-step agent architecture with separate LLM calls for planning (determining which objects to interact with) and grounding (executing the interaction). While this separation improved accuracy, it introduced unacceptable latency for the user experience. They consolidated the architecture into a single LLM call that combined planning and action generation. This trade-off between accuracy and latency is a recurring theme in production LLM deployments, and Ramp's decision to prioritize user experience demonstrates the importance of non-functional requirements in system design.

## Prompt Engineering and Input Optimization

The team developed sophisticated approaches to preparing inputs for the LLM, working with their proprietary component library and combining image and text data. They created an annotation script that tags interactive HTML elements with visible labels, similar to the functionality provided by the Vimium browser extension. They also incorporated accessibility tags from the DOM to provide clear, language-based descriptions of interface components.

A critical insight from the project was articulated by Alex Shevchenko, the engineer behind Tour Guide: "The most effective way to improve an agent's accuracy is by constraining the decision space. LLMs still struggle to pick the best option among many similar ones." This principle guided several optimization decisions.

The team simplified the DOM through preprocessing to prune out irrelevant objects, creating cleaner, more efficient inputs. Rather than presenting the model with a lengthy list of interactable elements, they labeled a fixed set of options in the prompt with letters (A to Z), making it explicit what choices were available. This approach reportedly led to significant improvements in output accuracy.

Managing prompt length was identified as the biggest hurdle, since longer prompts resulted in increased latency. The team experimented with context stuffing—adding extra context alongside user screenshots—but found that focusing on well-enriched interactions without overloading the prompt was more effective. This reflects a common production challenge: balancing the desire to provide comprehensive context against the practical constraints of token limits and latency requirements.

## Classification and Routing

The system includes an intelligent routing mechanism that determines when to invoke the Tour Guide capabilities. Rather than requiring users to manually activate the feature, the team developed a classifier that identifies relevant queries and automatically routes them to Tour Guide when appropriate. This design choice helps avoid putting users in flows where they don't actually need guided assistance, as noted by Rahul Sengottuvelu, Head of Applied AI at Ramp.

This routing layer is an important production consideration often overlooked in LLM system design. Having an upstream classifier that determines which queries should invoke resource-intensive agent workflows helps manage costs and ensures the feature is applied where it provides genuine value.

## User Experience and Human-in-the-Loop Design

What distinguishes Ramp's approach is the strong emphasis on human-agent collaboration. The Tour Guide takes control of the user's cursor to perform actions a human would take (clicking buttons, navigating dropdowns, filling out forms), but does so visibly with step-by-step explanations. A small banner appears next to each relevant element, providing context and rationale for each action.

Users can see all agent actions and can interrupt or take control at any point. The team implemented a "springing cursor" animation that keeps users engaged and feeling like active participants rather than passive observers. This design philosophy—treating AI as an assistant that users supervise rather than a fully autonomous system—is particularly appropriate for financial operations where errors could have significant consequences.

## Evaluation and Guardrails

The evaluation approach relied heavily on manual testing to identify patterns of failure and success. Once these patterns were understood, the team implemented guardrails to manage risk. They hardcoded restrictions preventing the agent from interacting with particularly challenging pages, including those containing complex workflows like large canvas interfaces or tables with numerous elements.

This pragmatic approach to reliability—limiting the agent's scope to tasks it can handle smoothly rather than attempting to solve all edge cases—is a common pattern in production AI systems. It acknowledges that current LLM capabilities have limitations and that system reliability can be improved by identifying and avoiding high-failure scenarios.

The case study does not mention automated evaluation pipelines, test datasets, or quantitative metrics, which suggests the team relied primarily on qualitative assessment and iterative refinement. For a production system handling financial operations, this approach has both advantages (human judgment on complex UX scenarios) and potential risks (scalability of testing, consistency of evaluation criteria).

## Production Considerations and Trade-offs

Several production-oriented decisions are evident throughout the case study. The consolidation from two LLM calls to one prioritized latency over the potential accuracy gains of a multi-step approach. The DOM simplification and constrained decision space improved reliability while reducing the agent's flexibility. The guardrails limiting which pages the agent can interact with traded coverage for reliability.

These trade-offs reflect mature thinking about production AI systems: the best technical approach in isolation may not be the best approach when user experience, reliability, and operational constraints are considered. The team appears to have taken an iterative approach, starting with a more complex architecture and simplifying based on real-world performance requirements.

## Future Directions

Ramp plans to expand Tour Guide into a broader "Ramp Copilot" serving as a single entry point for all user queries and actions within the platform. This suggests the current implementation is viewed as a successful foundation for broader AI integration into their product. The case study emphasizes their commitment to keeping the user at the forefront, suggesting future developments will continue the human-in-the-loop philosophy.

## Balanced Assessment

The case study, published by LangChain (a vendor whose products Ramp may use), presents an optimistic view of the implementation. While the technical approaches described are sound and the design philosophy is thoughtful, the text lacks quantitative results on accuracy, user adoption, reduction in support calls, or other measurable outcomes. Claims about "significant improvement in output accuracy" and the effectiveness of various optimizations would benefit from supporting data.

The emphasis on manual testing rather than automated evaluation pipelines may present challenges as the system scales or as the underlying models are updated. Similarly, while the guardrails approach is pragmatic, it may limit the utility of the feature if users frequently encounter pages where Tour Guide cannot operate.

Overall, the case study provides valuable insights into the practical considerations of deploying an LLM-powered agent in a production financial application, particularly around user experience design, latency optimization, and reliability engineering through scope limitation.