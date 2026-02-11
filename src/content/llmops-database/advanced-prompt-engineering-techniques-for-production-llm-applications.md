---
title: "Advanced Prompt Engineering Techniques for Production LLM Applications"
slug: "advanced-prompt-engineering-techniques-for-production-llm-applications"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3cd4e5fb918779a36203"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:39:21.032Z"
  createdOn: "2024-11-21T13:59:48.600Z"
llmopsTags:
  - "chatbot"
  - "code-generation"
  - "code-interpretation"
  - "documentation"
  - "error-handling"
  - "few-shot"
  - "guardrails"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "reliability"
  - "scalability"
  - "security"
  - "structured-output"
  - "system-prompts"
  - "token-optimization"
industryTags: "e-commerce"
company: "Instacart"
summary: "Instacart shares their experience implementing various prompt engineering techniques to improve LLM performance in production applications. The article details both traditional and novel approaches including Chain of Thought, ReAct, Room for Thought, Monte Carlo brainstorming, Self Correction, Classifying with logit bias, and Puppetry. These techniques were developed and tested while building internal productivity tools like Ava and Ask Instacart, demonstrating practical ways to enhance LLM reliability and output quality in production environments."
link: "https://tech.instacart.com/monte-carlo-puppetry-and-laughter-the-unexpected-joys-of-prompt-engineering-4b9272e0c4eb"
year: 2023
seo:
  title: "Instacart: Advanced Prompt Engineering Techniques for Production LLM Applications - ZenML LLMOps Database"
  description: "Instacart shares their experience implementing various prompt engineering techniques to improve LLM performance in production applications. The article details both traditional and novel approaches including Chain of Thought, ReAct, Room for Thought, Monte Carlo brainstorming, Self Correction, Classifying with logit bias, and Puppetry. These techniques were developed and tested while building internal productivity tools like Ava and Ask Instacart, demonstrating practical ways to enhance LLM reliability and output quality in production environments."
  canonical: "https://www.zenml.io/llmops-database/advanced-prompt-engineering-techniques-for-production-llm-applications"
  ogTitle: "Instacart: Advanced Prompt Engineering Techniques for Production LLM Applications - ZenML LLMOps Database"
  ogDescription: "Instacart shares their experience implementing various prompt engineering techniques to improve LLM performance in production applications. The article details both traditional and novel approaches including Chain of Thought, ReAct, Room for Thought, Monte Carlo brainstorming, Self Correction, Classifying with logit bias, and Puppetry. These techniques were developed and tested while building internal productivity tools like Ava and Ask Instacart, demonstrating practical ways to enhance LLM reliability and output quality in production environments."
---

## Overview

Instacart, the grocery delivery e-commerce platform, has been rapidly adopting LLMs and GenAI across their organization. This case study focuses specifically on the prompt engineering techniques they developed for their internal productivity tooling, particularly the "Ava" family of products used for internal workflows. The article, published in December 2023, provides a practitioner's perspective on operationalizing LLMs effectively in production environments.

The company positions this work in the context of their broader AI adoption, which includes Ava (an internal AI assistant), Ask Instacart (AI-powered search), and enhanced ML platforms. The focus here is on the nuts and bolts of making LLM-powered features work reliably and produce consistent, useful outputs.

## Model Selection and Recommendations

The team explicitly recommends GPT-4 as the "best-in-class conversational model" and notes it is "far superior to GPT-3.5 and all other conversational models" at the time of writing. They acknowledge the economic considerations, advising teams to use GPT-4 "if it at all makes sense economically for your use case." This reflects the common LLMOps tension between model capability and cost/latency tradeoffs.

All techniques described were implemented and tested with GPT-4, with some also validated on GPT-3.5. The team emphasizes that results may vary and recommends testing techniques in specific evaluation environments with particular use cases—a nod to the importance of systematic evaluation in LLMOps.

## Core Prompt Engineering Techniques

### Chain of Thought (CoT)

The team uses established CoT techniques, adding phrases like "Let's take this step by step" to prompts. They note that seemingly anthropomorphic phrases like "Take a deep breath and come up with a plan for answering" can help, even though the model doesn't actually breathe or think deeply. The key insight is that these phrases "cue the model to think more and refine its position in the space of answers before committing to a direction."

### ReAct Pattern

They implement the ReAct pattern to give models the ability to take actions outside text generation—such as internal document lookups, web searches, or calculations. They structure prompts to define available actions (e.g., `INTERNAL_LOOKUP`, `GOOGLE_SEARCH`, `CALCULATION`) with syntax examples. The system intercepts these action requests, executes them, and returns results for the model to incorporate. This is similar to how ChatGPT's plugin system works but implemented internally.

### Humanizing Interactions with LLMs

An interesting operational insight is that treating LLMs like "a bright but sleep-deficient intern" helps in prompt design. This mental model encourages clearer, more unambiguous instructions. They found that being polite in few-shot examples actually improves performance—specifically, using "Thank you" between examples helps the model distinguish new examples from corrections to previous answers. The exact phrasing matters; "Thank you" performed better than other phrasings in their tests.

## Advanced Techniques Developed at Instacart

### Room for Thought

This technique explicitly encourages the model to make a plan before answering. The challenge is that ChatGPT has been trained via RLHF to answer directly, so prompts need to explicitly tell the model not to answer yet. For their pull request generation system, they prompt: "First let's create an outline for the pull request description. Do not generate a title and description, only write the outline."

They also bake static "thinking" into prompts to save generation time. For example, rather than asking the model to list what makes a good PR, they include that guidance directly: "A good pull request description is clear, concise, and fully lays out the complex parts of the change."

### Monte Carlo Technique

For creative tasks, the team asks the model to generate multiple radically different options, then synthesize a final answer combining the best aspects. This mirrors human brainstorming processes. They emphasize specifying that ideas should be "radically different" to prevent the model from generating five nearly identical options with slight wording variations.

This technique is particularly valuable for generating content with humor, where GPT-4 struggles. Generating many options increases the chances of finding something genuinely funny.

### Self Correction

This technique has the model critique its own outputs before finalizing. It works especially well combined with Monte Carlo—the model analyzes each generated option, offers critiques, and then produces a refined final answer. The prompt structure is: "Generate 5 possible radically different titles and then critique them. Finally generate a refined final title after the critique."

### Classifying with Logit Bias

This is a sophisticated technique for forcing the model to output valid categorical responses. The challenge is that LLMs tend to prefix answers with explanatory text ("The answer to your question is A") which complicates programmatic parsing.

Their solution leverages the observation that LLMs can reliably repeat tags from context. They structure options with three-digit numerical prefixes (000, 001, 002) which are single tokens in the tokenizer. Using the `logit_bias` parameter set to 100, they force the model to only output these specific tokens, combined with `max_tokens=1` to ensure exactly one selection.

For complex decisions requiring reasoning, they implement a "deep thought" mode with two rounds:
- First round: Normal response with full token access for CoT reasoning
- Second round: Forced single-token classification using logit_bias

They note that providing escape options like "Uncertain," "none," or "Nothing to do" is important depending on the use case. They also recommend lower temperature (even 0) when classifying to ensure the most likely token is selected.

### Puppetry

The team's favorite technique involves pre-filling the assistant's response to guide output format. Since LLM APIs require passing conversation state including what the assistant "said," you can fabricate responses the assistant never actually produced.

For JSON output, they end prompts with the beginning of the expected structure:
```
A: {
  "title": "
```

This tricks the model into "thinking in json" and continuing from that point. It decreases the burden on the model to start in the exact format needed.

Puppetry can also enforce prompting rules by having the assistant "say" things like: "First, I will think through the options, identifying the good pieces of each approach."

## Production Application: Pull Request Automation

The primary production example throughout the article is automated pull request title and description generation for internal code reviews. This showcases how multiple techniques combine:

- Room for Thought: Generate an outline first, categorizing types of changes from the diff
- Monte Carlo: Generate 5 radically different title options
- Self Correction: Critique each option before selecting
- Classifying: Force selection of exactly one option using logit_bias
- Puppetry: Ensure JSON output format for programmatic consumption

## Infrastructure Considerations

The team built an internal OpenAI/LLM proxy that includes an API endpoint guaranteeing valid output for classification tasks. This abstraction handles the logit_bias manipulation and multi-round prompting for deep thought mode, making these techniques accessible to internal teams without requiring them to understand the underlying mechanics.

## Key Operational Insights

The article emphasizes that small wording changes can cause large differences in output fidelity—for example, removing "Thank you" from a prompt caused noticeable performance degradation. This underscores the importance of systematic testing and evaluation when deploying LLM-powered features.

The techniques presented represent a combination of industry and academic research along with Instacart's own development efforts. The team explicitly recommends testing in specific evaluation environments, acknowledging that results may vary across use cases and model versions.

## Limitations and Honest Assessment

While the article provides valuable practical techniques, it should be noted that no quantitative metrics are provided for improvements. The claims about technique effectiveness are based on the team's observations rather than rigorous A/B testing results. Additionally, the techniques are specifically validated on GPT-4 and GPT-3.5—their applicability to other models would require separate validation. The article also doesn't address operational concerns like latency, cost, or failure handling in production, focusing instead on prompt design for output quality.