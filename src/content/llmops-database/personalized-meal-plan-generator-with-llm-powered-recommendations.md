---
title: "Personalized Meal Plan Generator with LLM-Powered Recommendations"
slug: "personalized-meal-plan-generator-with-llm-powered-recommendations"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ad7c04e470ee001a8c45b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:19.450Z"
  createdOn: "2025-12-23T17:56:16.216Z"
llmopsTags:
  - "customer-support"
  - "structured-output"
  - "poc"
  - "prompt-engineering"
  - "cost-optimization"
  - "error-handling"
  - "human-in-the-loop"
  - "evals"
  - "few-shot"
  - "token-optimization"
  - "documentation"
  - "openai"
industryTags: "e-commerce"
company: "Cherrypick"
summary: "Cherrypick, a meal planning service, launched an LLM-powered meal generator to create personalized meal plans with natural language explanations for recipe selections. The company faced challenges around cost management, interface design, and output reliability when moving from a traditional rule-based system to an LLM-based approach. By carefully constraining the problem space, avoiding chatbot interfaces in favor of structured interactions, implementing multi-layered evaluation frameworks, and working with rather than against model randomness, they achieved significant improvements: customers changed their plans 30% less and used plans in their baskets 14% more compared to the previous system."
link: "https://www.chrismdp.com/how-to-build-a-robust-llm-application/"
year: 2024
seo:
  title: "Cherrypick: Personalized Meal Plan Generator with LLM-Powered Recommendations - ZenML LLMOps Database"
  description: "Cherrypick, a meal planning service, launched an LLM-powered meal generator to create personalized meal plans with natural language explanations for recipe selections. The company faced challenges around cost management, interface design, and output reliability when moving from a traditional rule-based system to an LLM-based approach. By carefully constraining the problem space, avoiding chatbot interfaces in favor of structured interactions, implementing multi-layered evaluation frameworks, and working with rather than against model randomness, they achieved significant improvements: customers changed their plans 30% less and used plans in their baskets 14% more compared to the previous system."
  canonical: "https://www.zenml.io/llmops-database/personalized-meal-plan-generator-with-llm-powered-recommendations"
  ogTitle: "Cherrypick: Personalized Meal Plan Generator with LLM-Powered Recommendations - ZenML LLMOps Database"
  ogDescription: "Cherrypick, a meal planning service, launched an LLM-powered meal generator to create personalized meal plans with natural language explanations for recipe selections. The company faced challenges around cost management, interface design, and output reliability when moving from a traditional rule-based system to an LLM-based approach. By carefully constraining the problem space, avoiding chatbot interfaces in favor of structured interactions, implementing multi-layered evaluation frameworks, and working with rather than against model randomness, they achieved significant improvements: customers changed their plans 30% less and used plans in their baskets 14% more compared to the previous system."
---

## Overview and Business Context

Cherrypick is a meal planning and grocery service that launched a new LLM-powered meal generator in late 2024. The company had been operating a meal generator since early 2023 that allowed customers to select a number of meals for the week, with the ability to reject meals but no ability to specify preferences. The business need was to increase personalization and provide explanations for why specific recipes were selected for individual customers. The new LLM-based system delivered measurable improvements: customers changed their plans 30% less frequently and used their generated plans in their shopping baskets 14% more than with the previous system.

This case study is particularly valuable because it provides honest insights into the practical challenges of moving an LLM application from concept to production in a consumer-facing environment with tight margin constraints. The author explicitly discusses the tradeoffs between different approaches, the economic realities of LLM deployment at scale, and the technical decisions needed to make the system reliable enough for production use.

## Product Strategy and Problem Scoping

A critical element of Cherrypick's LLMOps approach was their disciplined product thinking about when LLMs are actually necessary. The team established four criteria for determining whether a problem genuinely benefits from LLM capabilities: the problem must uniquely benefit from an LLM's capabilities, have an interface that matches user expectations, be economically sustainable, and have mitigatable drawbacks. This framework prevented the team from falling into the trap of using LLMs simply because they are trendy technology.

For the meal planning use case, the team determined that LLMs were genuinely valuable because they needed complex natural language understanding to interpret dietary preferences, the ability to reason about recipe compatibility, and the capability to generate natural language explanations for why specific recipes were selected. These tasks would have been significantly more difficult to accomplish with traditional rule-based systems or simpler machine learning approaches. The team explicitly acknowledged that many other problems could be better solved with regular expressions for structured data extraction, traditional ML classifiers for categorization, template-based generation for repetitive content, or rule-based systems for binary decisions.

An interesting historical note is that Cherrypick had been using LLMs for completion tasks since 2022 for a recipe uploader feature, giving them prior experience with the technology before embarking on this more complex meal planning application.

## Interface Design Decisions

Cherrypick made a deliberate decision to avoid building a chatbot interface, despite chatbots being the default choice for most LLM applications. Their reasoning was multi-faceted and reveals sophisticated thinking about user experience and operational costs. They recognized that while chatbots work well for open-ended discussions like customer support, they feel forced and cumbersome for more structured interactions. The constant need to type messages creates user fatigue and friction that decreases engagement over time.

Instead, they designed a structured interaction model where customers could reject meals using pre-defined options that were generated by the LLM alongside the meal plan itself. This approach feels customized and natural while avoiding the need for constant typing. The back-and-forth process of generating a plan and refining it maps naturally to this interaction model without requiring a full conversational interface.

The interface decision was also driven by cost considerations. The team had experimented with chat-based grocery tools in 2023, including a proof of concept that allowed customers to add groceries via WhatsApp. While it worked well and was fun to use, they realized it would require hundreds of LLM calls per shopping session, which would have entirely eroded their profit margin. In contrast, the meal generator requires only a few LLM calls per meal plan generation, making it financially viable given that customers generate a limited number of meal plans each week.

## Cost Management and Economic Viability

Cost management emerged as a critical LLMOps consideration for Cherrypick, particularly given their consumer application business model with a large number of users paying small amounts per user. The team emphasized the importance of calculating costs ahead of time and budgeting for LLM calls as part of initial investigation. They recommended understanding the number of tokens needed per user interaction and how many interactions would occur per billing cycle.

The author notes that as of December 2024, the cost of running a powerful LLM remained around a few dollars per million tokens with results returning in tens of seconds, which is too slow and expensive for many consumer applications. This economic reality drove many of their technical decisions, including the choice to avoid chatbot interfaces and to carefully manage the amount of context sent in each prompt.

The team chose to send recipe details directly in the prompt rather than using tools (previously called function calling) to retrieve recipes dynamically. While tools would have been more flexible, the single LLM call approach was quicker and cheaper for their use case. This decision accepted the tradeoff of larger prompts with more tokens in exchange for avoiding multiple round-trips to the model. To keep token counts manageable, they could only send a subset of recipes with each request, currently a random set that they acknowledged needed improvement.

## Context Management and Risk Mitigation

A sophisticated aspect of Cherrypick's LLMOps approach was how they worked with model randomness rather than fighting against it. Many developers try to force LLMs into producing deterministic output, but Cherrypick recognized that LLMs are inherently fallible and instead focused on providing the right context to guide the model toward acceptable outputs.

Their key strategy was carefully curating what information was sent to the LLM. Rather than giving the model a full list of all available recipes and asking it to select the best ones based on customer preferences, they pre-filtered the recipe list to only include recipes the customer could actually eat based on dietary restrictions and goals. This approach served multiple purposes: it avoided wasting tokens on recipes that should never be selected, it prevented the model from making potentially harmful selections (such as suggesting recipes containing allergens), and it reduced the risk of obviously wrong choices.

This pre-filtering strategy demonstrates an important LLMOps principle: using traditional programmatic logic to constrain the problem space before invoking the LLM, rather than expecting the LLM to handle all logic including safety-critical filtering. This hybrid approach leverages the strengths of both traditional programming (deterministic, reliable filtering) and LLMs (natural language reasoning and explanation generation).

## Evaluation Framework and Quality Assurance

Cherrypick built a multi-layered evaluation system to ensure consistent quality despite the inherent randomness of LLM outputs. The first layer was automated validation that verified perfect JSON structure in all responses and checked that recipe IDs matched the provided context, ensuring the LLM had not hallucinated recipe identifiers. When generations failed these checks, the system automatically retried the plan. They were experiencing a 25% failure rate, meaning one or two retries were typically needed for each meal plan generated. Given that only one LLM call was required per plan or change, they determined this retry rate was acceptable in terms of speed and cost.

The second evaluation layer involved expert human review. Sophie, their Head of Food, assessed samples of generated plans for quality and nutritional balance, examining flavor combinations and ensuring meals would work well together over the week. This human oversight maintained standards that automated checks alone could not guarantee, particularly for subjective quality dimensions like taste and variety.

All evaluations were stored to build training data for future improvements. The team maintained versions of their templates for A/B testing and tracked success metrics for each variation. Regular prompt refinement based on accumulated feedback helped continuously enhance system performance.

To facilitate experimentation without waiting for large amounts of production data, they used Liquid templates for their prompts. This templating approach made it straightforward to re-run meal generations with new prompts and models while ensuring the same data was included in each prompt run, only varying the prompt text itself. This produced a verifiable set of results for comparison, though it required significant human involvement initially.

The team's future roadmap includes using LLMs to automate both the evaluation process and prompt improvement. With thousands of generated plans stored alongside automatic and expert evaluations, they now have sufficient examples to prompt an LLM to learn both how to evaluate plans and how to improve prompts, suggesting a move toward LLM-based evaluation and prompt optimization.

## Operational Reliability and Production Readiness

The case study reveals important details about the operational challenges of running LLMs in production. The 25% failure rate requiring retries indicates that even with careful prompt engineering and context management, LLM outputs cannot be relied upon to always meet structural requirements on the first attempt. Building retry logic into the system was essential for production readiness.

The JSON validation and recipe ID checking represent critical guardrails that prevent invalid outputs from reaching customers. These automated checks catch errors that would otherwise result in application failures or poor user experiences. The combination of automated validation and expert human review creates a defense-in-depth approach appropriate for customer-facing applications.

The team's use of versioned templates and A/B testing indicates a mature approach to managing prompt evolution. Rather than simply updating prompts in place and hoping for improvements, they treated prompt changes as experiments with measurable outcomes. This disciplined approach to prompt management is essential for maintaining and improving LLM-based systems over time.

## Technical Architecture Considerations

While the case study does not provide extensive architectural details, several technical choices emerge. The system appears to be designed around single-shot generation with retries rather than multi-turn conversations, aligning with their decision to avoid chat interfaces. The use of Liquid templates for prompt management suggests a separation between prompt structure/logic and the actual text, enabling experimentation and version control.

The pre-filtering of recipes before sending context to the LLM implies a traditional backend system that maintains customer preferences and dietary restrictions, performs filtering logic, and then constructs the prompt with the filtered results. This represents a hybrid architecture where traditional programmatic logic handles deterministic operations and the LLM handles the more nuanced tasks of selection and explanation generation.

The decision to include pre-defined rejection options that are generated by the LLM alongside the meal plan itself is particularly clever. This ensures the rejection options feel personalized and contextual (because they come from the same generation call that created the plan) while maintaining the structured interaction model that avoids chatbot-style free text input.

## Lessons and Tradeoffs

The case study is refreshingly honest about tradeoffs and challenges. The author explicitly acknowledges that their current approach of sending a random subset of recipes to keep token counts manageable is not ideal and needs improvement. This acknowledgment that production systems often ship with known limitations while planning for future enhancements is realistic and valuable for others building similar systems.

The comparison between their failed WhatsApp grocery chatbot experiment and the successful meal generator illustrates how the same technology can be economically viable for one use case but not another, even within the same company and domain. The difference came down to the frequency and intensity of LLM usage: hundreds of calls per shopping session versus a few calls per weekly meal plan.

The emphasis on measuring business outcomes (30% reduction in plan changes, 14% increase in basket usage) rather than just technical metrics demonstrates mature product thinking. These metrics directly tie the LLM implementation to business value, justifying the investment and complexity.

The case study also reveals the significant ongoing investment required beyond initial deployment. The expert review process, the continuous evaluation data collection, the prompt refinement based on feedback, and the planned automation of evaluation and prompt improvement all represent substantial ongoing operational work that is often underestimated when teams initially decide to adopt LLM-based solutions.

## Broader LLMOps Insights

This case study exemplifies several important LLMOps principles. First, the importance of carefully scoping problems to ensure LLMs are genuinely the right solution rather than using them because they are fashionable. Second, the need to design interfaces and interaction models that fit both user needs and operational constraints rather than defaulting to chatbots. Third, the criticality of cost management and economic viability for consumer applications with tight margins.

Fourth, the value of hybrid approaches that combine traditional programmatic logic for deterministic operations with LLM capabilities for tasks requiring natural language understanding and generation. Fifth, the necessity of multi-layered evaluation combining automated validation, expert review, and continuous monitoring. Sixth, the reality that production LLM systems require retry logic, validation guardrails, and defensive programming to handle the inherent unreliability of model outputs.

The author's observation that too many LLM applications are poorly thought through and end up as cool demos rather than production systems is particularly apt. This case study stands out precisely because it details the practical work required to move beyond a demo: managing costs, designing appropriate interfaces, building evaluation frameworks, implementing validation and retry logic, and continuously monitoring and improving the system based on real-world performance.

The case study also serves as a valuable reminder that LLMs are tools to be used judiciously where they provide unique value, not universal solutions to be applied everywhere. The discipline to recognize when simpler approaches suffice and when LLM capabilities are genuinely necessary is a hallmark of mature LLMOps practice.