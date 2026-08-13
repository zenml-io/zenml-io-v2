---
title: "Building an Agentic Financial Guidance Chatbot from Deterministic Foundations"
slug: "building-an-agentic-financial-guidance-chatbot-from-deterministic-foundations"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "healthcare"
  - "prompt-engineering"
  - "rag"
  - "agent-based"
  - "few-shot"
  - "error-handling"
  - "human-in-the-loop"
  - "guardrails"
  - "monitoring"
  - "google-gcp"
  - "anthropic"
  - "openai"
industryTags: "finance"
company: "Lloyds Banking"
summary: "Lloyds Banking Group's Conversational Banking Lab developed a fully agentic financial guidance chatbot to help beginner investors understand investment concepts, representing a major shift from their mature deterministic Watson Assistant chatbot that had been in production since 2015. The team encountered significant challenges transitioning from deterministic to generative AI approaches, including underestimating the complexity of safety requirements, the need for manual knowledge curation despite using foundation models, and the dramatic differences in conversation design patterns. The solution involved building comprehensive safety layers throughout the entire stack, creating manually curated knowledge bases to prevent hallucinations, and establishing rigorous testing frameworks beyond simple \"vibe testing\" to ensure the agentic system performed reliably within acceptable boundaries while maintaining some of the magic and unpredictability that makes generative AI valuable."
link: "https://www.youtube.com/watch?v=mO-4TDElwwg"
year: 2026
seo:
  title: "Lloyds Banking: Building an Agentic Financial Guidance Chatbot from Deterministic Foundations - ZenML LLMOps Database"
  description: "Lloyds Banking Group's Conversational Banking Lab developed a fully agentic financial guidance chatbot to help beginner investors understand investment concepts, representing a major shift from their mature deterministic Watson Assistant chatbot that had been in production since 2015. The team encountered significant challenges transitioning from deterministic to generative AI approaches, including underestimating the complexity of safety requirements, the need for manual knowledge curation despite using foundation models, and the dramatic differences in conversation design patterns. The solution involved building comprehensive safety layers throughout the entire stack, creating manually curated knowledge bases to prevent hallucinations, and establishing rigorous testing frameworks beyond simple \"vibe testing\" to ensure the agentic system performed reliably within acceptable boundaries while maintaining some of the magic and unpredictability that makes generative AI valuable."
  canonical: "https://www.zenml.io/llmops-database/building-an-agentic-financial-guidance-chatbot-from-deterministic-foundations"
  ogTitle: "Lloyds Banking: Building an Agentic Financial Guidance Chatbot from Deterministic Foundations - ZenML LLMOps Database"
  ogDescription: "Lloyds Banking Group's Conversational Banking Lab developed a fully agentic financial guidance chatbot to help beginner investors understand investment concepts, representing a major shift from their mature deterministic Watson Assistant chatbot that had been in production since 2015. The team encountered significant challenges transitioning from deterministic to generative AI approaches, including underestimating the complexity of safety requirements, the need for manual knowledge curation despite using foundation models, and the dramatic differences in conversation design patterns. The solution involved building comprehensive safety layers throughout the entire stack, creating manually curated knowledge bases to prevent hallucinations, and establishing rigorous testing frameworks beyond simple \"vibe testing\" to ensure the agentic system performed reliably within acceptable boundaries while maintaining some of the magic and unpredictability that makes generative AI valuable."
notion:
  pageId: "3b8f8dff-2538-8011-b359-d482ebf6cd8b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T15:19:00.000Z"
  lastEditedTime: "2026-08-10T15:19:00.000Z"
  publishedAt: "2026-08-10T15:22:57Z"
---

## Overview

Lloyds Banking Group's Conversational Banking Lab embarked on building a fully agentic financial guidance chatbot as part of the bank's major AI transformation initiative. The organization committed to delivering £100 million in benefits from generative AI and agents in the year covered by this presentation, building on £50 million delivered the previous year. This represents one of the largest transformations in UK financial services.

The specific use case focuses on providing beginner-level investment education through a conversational interface that will live in Lloyds' mobile banking app. The chatbot is designed to explain fundamental investment concepts like what investment is, different types of investment products, and risk in investment. Importantly, it is deliberately scoped NOT to handle complex portfolio advice or provide regulated financial advice, which requires specific licensing in the UK and must be paid for.

This project represents a significant departure for a team that had been operating a mature deterministic Watson Assistant chatbot since 2015, with approximately 100 people working on it. The team had been gradually adding assistive AI features to their deterministic bot but decided to build a completely agentic chatbot in parallel, which the presenter acknowledged was "completely ignoring my own advice" from previous guidance about cautiously letting GenAI encroach on deterministic systems.

## Development Timeline and Deployment Strategy

The team started working on the agentic chatbot in early 2025, working on it for nearly a year. They deployed an MVP to colleague users through a beta version of the Lloyds app that is only available to Lloyds Banking Group employees. This beta environment represents a sophisticated deployment strategy where the app is fully live and colleagues conduct real banking through it, but it allows the team to test features with a limited, controlled user base before customer launch.

After releasing version one of the MVP to colleagues, the team immediately began work on version two, which was still in development at the time of the presentation. The team evolved their communication about launch timelines, moving from specific deadlines that kept slipping to the right, to simply stating the product will launch "when it's ready" with a customer launch expected later in 2026.

## Technical Architecture and Foundation

The agentic chatbot is built on Google's Gemini foundation model. The architectural approach uses Gemini to manage the conversation flow, keeping interactions natural and fluid, while implementing multiple layers of safety and control mechanisms throughout the stack. This represents a hybrid approach that attempts to leverage the conversational capabilities of large language models while maintaining the control and safety necessary for a regulated financial services environment.

## Scope Definition and Benchmarking Challenges

One of the most significant challenges the team faced was properly defining scope and setting realistic expectations. Early in the project, the brief was articulated as "better investment guidance than ChatGPT," which the presenter acknowledged was problematic for several reasons.

While it is possible to enrich foundation models like ChatGPT, Gemini, or Claude with proprietary data to provide enhanced experiences, the constraints in a regulated financial services environment are fundamentally different from general-purpose chatbots. Lloyds' chatbot cannot recommend competitors' products, cannot answer general knowledge questions outside its scope, and cannot provide regulated financial advice. These restrictions mean that in many dimensions, the chatbot is necessarily more limited than ChatGPT, even if it provides better information within its specific domain.

The presenter also highlighted the unrealistic nature of comparing against a system with a $7 billion annual budget without committing proportional resources. More fundamentally, the team learned that benchmarking against 100% human performance is unrealistic, since humans themselves don't perform at 100% efficiency and effectiveness. In human operations, controls, checks, and processes exist to handle errors. The same thinking needs to apply to agentic systems, or teams will never reach production if they target 100% performance.

## Requirements for Production-Ready Agentic Systems

The team identified that moving beyond vague aspirations required returning to fundamental chatbot design principles but applying them in new ways. They needed really specific, clear, and granular scope definition including exactly what questions would be answered and what questions would not. For Lloyds, this meant mapping out a user journey from knowing nothing about investing to having enough information to make confident first investment choices.

This journey mapping proved essential for enabling proper testing. Early in the project, the team was conducting what they called "vibe testing" where they would ask questions and evaluate whether answers "felt all right." This approach lacked the structure necessary for rigorous evaluation. By defining the journey and specific outcomes, the team could implement structured testing frameworks that could actually validate whether the system was working as intended.

## Research and Development Versus Delivery

A critical lesson learned was properly accounting for the difference between R&D work and delivery work. The presenter, with extensive transformation experience dating back to taking offices from typewriters to computers, emphasized that R&D does not respect carefully worked out project plans. 

For components where the team understood how they worked, traditional sprint planning was appropriate and effective. However, for unknowns like "in two sprints, we will define the best RAG pattern for our chatbot," deadlines proved impossible to maintain. The team had to separate known delivery work from genuine research questions and adjust planning and stakeholder expectations accordingly.

The presenter also cautioned about vendor promises, noting that vendors sometimes claim capabilities are complete and will "just work" when that is not actually the case. Teams need to validate vendor claims and account for integration and adaptation work.

## Cross-Functional Collaboration Requirements

The team found that the early stages of building an agentic system require much tighter cross-functional collaboration than typical software development. Data scientists, engineers, designers, product owners, and business analysts all bring different perspectives, and in the early stages, every decision made by one function heavily impacts what other functions can do.

While it is common in large organizations to silo functions with designers working separately from data scientists, coming together only for brief standups and periodic planning sessions, this proved insufficient for agentic AI development. Hour-to-hour and minute-to-minute decisions required real-time collaboration. The presenter strongly advocated for getting people physically in the same room during the early phases, acknowledging the challenges in a hybrid work environment but emphasizing the value for working through problems together and reaching better results faster.

Once the system reaches a "baby level" with established architecture and structure, people can begin to specialize and work more independently, but not before.

## Organizational Alignment

Beyond the core development team, numerous organizational functions need different types of engagement and support. Leadership may need encouragement to adopt agentic and generative AI, or alternatively may need realistic expectations injected to counter vendor marketing hype they are exposed to.

The ethics function deserves particular attention. For organizations with dedicated ethics departments, they provide valuable support. For those without, teams need to explicitly consider ethical dimensions that may not have been central to traditional software development, including bias, data usage, and the ethical implications of what the AI is being designed to do. The presenter noted it is possible to build things that seem like good ideas but are actually illegal or unethical in practice.

## People and Skills Development

The team learned not to overlook the training and development needs of team members working in this new space. Beyond formal training on how the technology works, people need space and time to experiment, play, and importantly, to get things wrong before getting things right. Rushing the team proved counterproductive.

Particularly striking was the experience of the conversation designers. Lloyds had brilliant, experienced conversation designers skilled in deterministic chatbot design. However, moving from deterministic to generative conversation design was described as "going to the upside down in Stranger Things" where many landmarks were familiar but the interactions and ways of thinking were fundamentally different. The team experienced significant pain before developing new processes and approaches that worked for generative systems.

This underscores that even highly skilled professionals in adjacent domains need time, support, and space to adapt. Regular check-ins on team member comfort, happiness, and needs are essential.

## Safety Architecture: Beyond Simple Guardrails

One of the most significant findings was that safety for agentic chatbots is vastly more complex than initially anticipated. The team's initial mental model involved input guardrails to prevent prompt injection attacks and filter profanity, plus output guardrails to check for hate speech, abuse, profanity, bias, toxicity, and compliance issues. This proved dramatically insufficient.

The production safety architecture involves multiple layers:

**Input Processing:** Input guardrails do protect against prompt injection and filtering problematic content reduces the risk of problematic outputs. However, the team also implemented input rewriting to maintain context, which provides an additional layer of protection against malicious inputs.

**Scope Management:** The team identified three categories rather than simple in-scope versus out-of-scope. There are topics they want to discuss, topics they absolutely won't discuss, but also an intermediate category of topics they don't necessarily want to address directly but can't simply reject with "I'm not going to talk about that." Without handling this middle ground, conversations become disjointed with the chatbot repeatedly saying "that's not my core topic" every few turns, creating a poor user experience. The team developed treatments for these intermediate topics that keep conversations flowing without directly addressing out-of-scope issues.

**Prompt Engineering for Safety:** Prompt design must actively build in safety considerations, not just getting the system to do desired things but also preventing it from doing undesired things. The stochastic nature of LLMs means they will attempt actions they haven't been explicitly prohibited from doing.

**Output Transformation:** Before applying guardrails, the team implemented an output transformer to rewrite the raw reasoning output into the appropriate style and tone of voice. This transformation step provides another opportunity to inject safety considerations.

**Post-Conversation Monitoring:** After conversations occur, the team reviews what the agent has said to users. They monitor for patterns like sudden surges in prompt injection attacks that might indicate the system is under attack. This requires systems for monitoring live data and alerting on concerning patterns.

**Remediation Protocols:** The team accepts that things will go wrong and the agent may say things to customers that shouldn't be said. Having protocols to spot when this happens, respond when customers report issues, and remediate problems is essential.

The presenter emphasized that safety is not just a set of guardrails but rather a state of mind that should operate throughout the entire stack.

## Knowledge Management and Hallucination Prevention

Perhaps the most counterintuitive finding was about knowledge management. The team's initial approach assumed they could lean heavily on the knowledge already embedded in foundation models. For general knowledge questions like "what does an interest rate mean," they assumed Gemini already knew the answer and they didn't need to provide that information. This was partially driven by time pressure and the appealing prospect of not having to curate extensive knowledge bases.

This approach proved to be a huge mistake for two critical reasons:

**Hallucination Detection:** Hallucination guardrails work by checking whether the model's response aligns with source information. If the system is relying on knowledge embedded in the model without explicit source documents, there is no context to check responses against. This causes a large portion of outputs to flag as hallucinations, even when they may be accurate.

**Unpredictability:** The team found that asking the same question three times could produce three different results: the right answer, a wrong answer, and "I can't answer that." This unpredictability is unacceptable in a production financial services environment.

The solution was to have Gemini manage the conversation to keep things natural and fluid, but to manually write, curate, and review every single piece of knowledge that Gemini imparts to customers through a structured knowledge base. The principle is stark: the model knows everything, but you still have to tell it everything it needs to know.

## Testing and Evaluation Evolution

The evolution from "vibe testing" to structured evaluation frameworks represents a critical maturation in the team's approach. Early testing involved asking questions and evaluating whether answers felt right, which provided no systematic way to validate system performance or track improvements.

By defining the specific user journey, mapping out the knowledge users need at each stage, and establishing clear success criteria, the team could implement rigorous testing. This required the granular scope definition and clear understanding of what the system should and shouldn't do, which then enabled systematic test case development and evaluation metrics.

## The Control Versus Magic Framework

The presenter concluded with a framework for thinking about agentic system design using two axes. One axis runs from complete control (input A always produces output B, completely dependable) to magic unpredictability (the system does things it wasn't explicitly programmed to do). The other axis runs from danger (harming users and customers) to complete safety.

This creates four quadrants:

**Complete Control + Complete Safety:** This is essentially a deterministic chatbot. The team would have used several years of AI development to create something they could have built ten years ago on Watson. This probably won't meet user expectations for modern conversational AI.

**Complete Control + Danger:** The presenter humorously noted this makes you a James Bond villain.

**Magic/Unpredictability + Danger:** Things will be exciting until something serious goes wrong.

**Magic/Unpredictability + Safety (The Sweet Spot):** This is the target state where the system has some of the magic and unpredictability that makes generative AI valuable, but that unpredictability happens within safety boundaries the organization is prepared to accept.

This framework helps teams think about the inevitable tradeoffs in agentic system design. Pure safety without any unpredictability eliminates the value of the technology, while pure unpredictability without safety creates unacceptable risks. Production systems must find the balance that preserves the benefits while maintaining acceptable safety levels.

## Broader AI Initiatives at Lloyds

While the presentation focused on the agentic financial guidance chatbot, it's worth noting the broader context of AI deployment at Lloyds. The organization is using AI in two main ways: enhancing customer experience through direct customer channels and empowering colleagues who work with customers.

Customer experience initiatives include LLM classifiers supporting the Watson Assistant chatbot with classification tasks. Colleague empowerment includes dramatically enhanced search capabilities so that colleagues on phones and messaging can find information more quickly for customers. The organization is also deploying copilots and tools widely, but critically, investing heavily in training and skills development, recognizing that simply providing copilot access doesn't ensure effective use.

One highlighted use case is the Athena knowledge management system, which gives colleagues much better access to information when customers phone in or use messaging channels. This addresses the challenge of colleagues needing to navigate large volumes of information to find what they need.

## Critical Lessons for LLMOps Practitioners

This case study reveals several insights particularly relevant for teams moving from traditional software or deterministic AI to agentic LLM systems:

The transition is harder than it appears, even for mature teams with deep expertise in adjacent domains. Lloyds had nearly ten years of experience running a large-scale production chatbot with approximately 100 people working on it, yet still encountered significant surprises in the transition to generative AI.

Scope definition is more critical than ever, but the nature of scope has changed. Beyond defining what topics to cover, teams must define the user journey, handle the ambiguous middle ground between in-scope and out-of-scope, and establish clear success criteria that enable systematic testing.

Safety cannot be an afterthought or a layer bolted on at the end. It must be embedded throughout the architecture from input processing through conversation management to output transformation, monitoring, and remediation.

Foundation model capabilities do not eliminate the need for knowledge management. Even though models like Gemini have vast embedded knowledge, production systems in regulated industries require explicit, curated knowledge bases to enable hallucination detection and ensure consistent, accurate responses.

The human elements—collaboration patterns, skills development, time for experimentation—are as critical as the technical architecture. Organizations must invest in helping teams adapt to fundamentally different ways of working.

R&D work must be explicitly identified and managed differently from delivery work. Mixing the two without acknowledging the difference leads to failed timelines and frustrated stakeholders.

Perfect performance is an unrealistic target. Just as human operations include checks and error handling, agentic systems need similar approaches rather than pursuing impossible perfection that prevents production deployment.
