---
title: "Voice Assistant Design for Industrial Workers: Architecture Over Prompts"
slug: "voice-assistant-design-for-industrial-workers-architecture-over-prompts"
draft: false
llmopsTags:
  - "customer-support"
  - "classification"
  - "prompt-engineering"
  - "error-handling"
  - "multi-agent-systems"
industryTags: "other"
company: "Spix Industry"
summary: "This case study addresses the challenge of designing voice AI systems for industrial workers in physically demanding environments where hands and eyes are occupied. The speaker, a conversational system designer, argues that most organizations build voice assistants incorrectly by focusing on LLM prompts first rather than robust system architecture. The solution involves prioritizing state management, permission logic, escalation paths, and error handling before any prompt engineering, treating LLMs as just one component within a larger decision engine rather than the entire system. The approach emphasizes that voice succeeds when it makes users feel capable rather than when it sounds smart, requiring concise responses, multimodal context awareness, and user-centric design that accounts for real-world conditions like noise, interruptions, and cognitive load."
link: "https://www.youtube.com/watch?v=QJBfY5JaTRY"
year: 2026
seo:
  title: "Spix Industry: Voice Assistant Design for Industrial Workers: Architecture Over Prompts - ZenML LLMOps Database"
  description: "This case study addresses the challenge of designing voice AI systems for industrial workers in physically demanding environments where hands and eyes are occupied. The speaker, a conversational system designer, argues that most organizations build voice assistants incorrectly by focusing on LLM prompts first rather than robust system architecture. The solution involves prioritizing state management, permission logic, escalation paths, and error handling before any prompt engineering, treating LLMs as just one component within a larger decision engine rather than the entire system. The approach emphasizes that voice succeeds when it makes users feel capable rather than when it sounds smart, requiring concise responses, multimodal context awareness, and user-centric design that accounts for real-world conditions like noise, interruptions, and cognitive load."
  canonical: "https://www.zenml.io/llmops-database/voice-assistant-design-for-industrial-workers-architecture-over-prompts"
  ogTitle: "Spix Industry: Voice Assistant Design for Industrial Workers: Architecture Over Prompts - ZenML LLMOps Database"
  ogDescription: "This case study addresses the challenge of designing voice AI systems for industrial workers in physically demanding environments where hands and eyes are occupied. The speaker, a conversational system designer, argues that most organizations build voice assistants incorrectly by focusing on LLM prompts first rather than robust system architecture. The solution involves prioritizing state management, permission logic, escalation paths, and error handling before any prompt engineering, treating LLMs as just one component within a larger decision engine rather than the entire system. The approach emphasizes that voice succeeds when it makes users feel capable rather than when it sounds smart, requiring concise responses, multimodal context awareness, and user-centric design that accounts for real-world conditions like noise, interruptions, and cognitive load."
notion:
  pageId: "3b8f8dff-2538-8067-b3a2-f07c85b6b181"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T15:16:00.000Z"
  lastEditedTime: "2026-08-10T15:16:00.000Z"
  publishedAt: "2026-08-10T15:22:17Z"
---

## Overview

This presentation by Masha, a conversational system designer, provides a critical examination of how organizations should approach building voice AI systems for production environments, specifically focusing on industrial workers like Bob, a blue-collar worker operating in challenging physical conditions with machines, noise, dust, and personal protection equipment. The core thesis challenges the conventional approach of LLM-first design and instead advocates for architecture-first systems where LLMs serve as one component rather than the foundation.

The case study is particularly valuable because it addresses the gap between technology-driven AI deployments and user-centered design in production environments. The speaker draws on survey data from 2026 showing that 79% of Americans strongly prefer interacting with humans over AI agents, and 81% believe AI is used primarily to save money rather than improve service. This sets the stage for a critical evaluation of how voice AI should be deployed in production.

## The Core Problem with Current Voice AI Deployment

The fundamental issue identified is that organizations approach voice AI as a feature to be added rather than understanding it as a working condition. Voice assistants are often deployed based on analyst reports or competitive pressure rather than solving genuine user problems. The speaker emphasizes that voice makes sense only in specific contexts where eyes are busy, hands are busy, screens are inconvenient, or speed and safety matter. This represents a crucial LLMOps consideration: deployment decisions should be driven by actual user needs and physical constraints rather than technology availability.

The presentation challenges the metrics typically used to measure voice AI success. Companies measure deflection rates, call volumes, and cost savings, but rarely measure user frustration or preference. The speaker uses a provocative example: if you remove all humans from a contact center and force users to interact with machines, high usage numbers don't indicate preference but rather lack of choice. This critique highlights a common failure in LLMOps evaluation frameworks where technical metrics are prioritized over user experience metrics.

## LLMs and System Architecture: The Critical Distinction

A central theme is that LLMs do not manage architecture and cannot replace thoughtful system design. The speaker argues that teams often immediately start designing prompts when they get access to LLMs, which is described as completely backwards. This represents a fundamental misunderstanding of how LLMs should fit into production systems.

The presentation explains that LLMs don't actually have context in the way most people assume. Instead, they re-inject previous prompts with new prompts to simulate context by referencing previous conversation parts. This creates the humorous but concerning examples that appear online, such as the Chevrolet dealership bot advocating for customers to buy Tesla Model 3s instead. This failure mode illustrates what happens when LLMs are deployed without proper architectural constraints and guardrails.

The proper approach described involves multiple layers of design that must precede prompt engineering. These include state models that track where the user is in a process, permission logic that determines what actions are allowed, escalation paths for when things go wrong, failure policies that define recovery strategies, and memory boundaries that determine what information should be retained or discarded. Only after these foundational elements are in place should teams write prompts.

## Architecture-First System Design

The speaker provides a concrete example to illustrate why architecture must come first. When Bob says "abandon that," the meaning is ambiguous: abandon the task, procedure, entire process, hope, or something else entirely. An LLM-first system will guess what Bob means and respond with confidence, potentially creating silent disasters where the wrong action is taken without the user realizing it.

In contrast, an architecture-first system processes this through multiple stages. It maintains state awareness of what task Bob is currently performing, checks permissions to ensure abandonment is allowed, applies policy rules about what can be abandoned at this stage, uses the LLM specifically for intent extraction to understand the user's goal, invokes appropriate tool code to execute the action, runs verification to confirm the action matches intent, and then generates a response that could be deterministic or generative depending on the situation.

This layered approach treats the LLM as a component within a larger system rather than the system itself. The same LLM produces completely different reliability outcomes depending on the architecture surrounding it. This is a crucial LLMOps insight: the robustness of production AI systems depends more on system design than on model selection or prompt optimization.

## Error Handling as Core LLMOps Practice

The presentation dedicates significant attention to error handling, which is positioned as a defining characteristic of production-ready voice AI. The speaker categorizes errors into two types: system errors and human errors.

System errors include no input when the user doesn't say anything, no match when the system can't understand the input, misrecognition when the system hears wrong, latency when responses are too slow, technical failures in the infrastructure, and tool failures when backend systems don't respond. These are described as manageable and predictable because they can be anticipated during system design.

Human errors are more challenging because humans are chaotic. Users will mumble, change their minds mid-sentence, ask two things at once, use vague language, use incorrect terminology, and forget what they came for. The example given is a user saying "Do that thing that you did last time, from last year," which isn't really a request but must still be handled gracefully.

The three rules for error handling are clarify, confirm, and guide. When requests are unclear, the system should ask clarifying questions rather than guessing. When actions are critical, the system must confirm before executing to prevent mistakes. When something fails, the system must explain what happened and guide the user on what to do next. The speaker emphasizes that error messages like "Sorry, something went wrong" are insufficient because they leave users frustrated and stuck. Users get frustrated not because errors occur but because they don't know what to do next or because the system does something they didn't ask for.

This error handling philosophy reflects mature LLMOps thinking where the focus is on graceful degradation and user guidance rather than optimizing for the happy path alone.

## Response Design and Cognitive Load

A major critique is that voice assistants talk too much, which the speaker bluntly states means they're wrong. The example compares Bob's natural speech pattern of saying "Record same noises last March. Required action, call maintenance" with a typical verbose voice assistant response offering to let the user listen to the observation, edit it, or inexplicably order vanilla latte with marshmallows.

The speaker argues that unless you're in a companionship scenario, users don't want to listen to what a voice bot has to say. What they need is for the bot to listen, remember, structure information, and shut up. Being user-friendly doesn't mean being good at small talk or displaying personality; it means performing requested actions without verbal or functional clutter.

The guideline provided is that if an answer doesn't fit in one breath, it's too long, and if it does fit in one breath, it's probably still too long. The recommendation is to remove greetings, small talk, filler phrases, and personality, then remove 20% more. This represents a significant departure from chatbot design patterns where conversational rapport is often prioritized.

The presentation also addresses the common mistake of transforming chatbots into voicebots without accounting for modality differences. A chatbot can present a list of options like booking a flight, making a reservation, renting a car, purchasing a vacation package, and finding travel deals because users can read, skim, skip, and scroll. In voice interactions, users blink and it's gone, so the cognitive capacity required to process auditory information is much higher.

The rules for transforming chat to voice include never giving more than three options by voice, allowing interruptions so users can respond as soon as they hear the right option, supporting natural language synonyms so users can say "option three," "this one," "first one," or "the last one," and not giving all options at once. Instead of listing everything, a better pattern is "I can help you book a flight or make a hotel reservation. Do you want to know more?"

## Context as a First-Class Design Consideration

The speaker emphasizes that companies constantly underestimate the power of context. Bob's voice assistant doesn't live in a lab; it exists in a world with machine noise, dust, dirt, echoes, reverberations, and three-second attention spans before something else requires attention. The environment is part of the system.

The example of trying to use Alexa while three toddlers run around screaming illustrates how context determines system performance. While LLM vendors talk about context windows measured in tokens like 32K or 128K, the real context is where the information sits and what conditions surround the interaction.

The recommendation is to make context part of the system design by assuming noise, personal protection equipment, bad connections, interruptions, and fatigue. Multimodality should also be considered because voice shouldn't operate alone but in combination with screens, haptic feedback, notifications, and gestures. This holistic view of context represents mature LLMOps thinking where deployment environment is treated as a critical system parameter rather than an afterthought.

## Production Deployment Philosophy

The underlying philosophy presented is that voice AI is not really about AI but about anthropology and humility. It's about building technology that fits into the messy and unpredictable world of human work rather than forcing humans to adapt to technology. The speaker argues that voice succeeds not when it sounds smart but when it makes people feel capable.

This user-centric approach to LLMOps stands in contrast to technology-driven deployments where the focus is on showcasing AI capabilities. The presentation suggests that many voice AI projects are pilot programs that will never see production because they're built to check competitive boxes or spend innovation budgets rather than solve genuine user problems.

The critique of metrics is particularly relevant to LLMOps practices. Companies proudly announce that they reduced human support by 40% or handled 200,000 calls with their bot, but these metrics don't indicate success if users had no choice but to use the system. The real question is whether users prefer the automated system or were simply left with no alternative.

## Lessons for LLMOps Practitioners

This case study offers several critical lessons for deploying LLMs in production. First, system architecture must precede prompt engineering. The robustness of LLM-based systems depends on state management, permission logic, escalation paths, failure policies, and memory boundaries, not on prompt quality alone. Second, error handling is not an edge case but a core design requirement. Production systems must gracefully handle both predictable system errors and unpredictable human behavior. Third, modality matters significantly. Design patterns that work for text-based chatbots often fail catastrophically when applied to voice interactions due to differences in cognitive load and interaction patterns.

Fourth, deployment decisions should be driven by genuine user needs rather than technology availability or competitive pressure. Voice AI makes sense only in contexts where it solves real physical or cognitive problems. Fifth, evaluation metrics must include user experience and preference, not just technical performance or cost savings. High usage numbers don't indicate success if users have no alternative.

Finally, context is a first-class design consideration. Production LLM systems must account for the physical environment, noise conditions, attention constraints, and multimodal interaction possibilities rather than optimizing for laboratory conditions. The goal is not to build technology that sounds intelligent but to build systems that make users feel capable in their actual working conditions.
