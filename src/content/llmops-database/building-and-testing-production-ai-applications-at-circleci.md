---
title: "Building and Testing Production AI Applications at CircleCI"
slug: "building-and-testing-production-ai-applications-at-circleci"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3abbaa32ecff24effb60"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:45:32.492Z"
  createdOn: "2024-11-21T13:50:51.740Z"
llmopsTags:
  - "cicd"
  - "circleci"
  - "code-generation"
  - "code-interpretation"
  - "continuous-deployment"
  - "continuous-integration"
  - "cost-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "guardrails"
  - "human-in-the-loop"
  - "model-optimization"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
  - "token-optimization"
industryTags: "tech"
company: "CircleCI"
summary: "CircleCI shares their experience building AI-enabled applications like their error summarizer tool, focusing on the challenges of testing and evaluating LLM-powered applications in production. They discuss implementing model-graded evals, handling non-deterministic outputs, managing costs, and building robust testing strategies that balance thoroughness with practicality. The case study provides insights into applying traditional software development practices to AI applications while addressing unique challenges around evaluation, cost management, and scaling."
link: "https://www.youtube.com/watch?v=WnVEhQ5iBms"
year: 2023
seo:
  title: "CircleCI: Building and Testing Production AI Applications at CircleCI - ZenML LLMOps Database"
  description: "CircleCI shares their experience building AI-enabled applications like their error summarizer tool, focusing on the challenges of testing and evaluating LLM-powered applications in production. They discuss implementing model-graded evals, handling non-deterministic outputs, managing costs, and building robust testing strategies that balance thoroughness with practicality. The case study provides insights into applying traditional software development practices to AI applications while addressing unique challenges around evaluation, cost management, and scaling."
  canonical: "https://www.zenml.io/llmops-database/building-and-testing-production-ai-applications-at-circleci"
  ogTitle: "CircleCI: Building and Testing Production AI Applications at CircleCI - ZenML LLMOps Database"
  ogDescription: "CircleCI shares their experience building AI-enabled applications like their error summarizer tool, focusing on the challenges of testing and evaluating LLM-powered applications in production. They discuss implementing model-graded evals, handling non-deterministic outputs, managing costs, and building robust testing strategies that balance thoroughness with practicality. The case study provides insights into applying traditional software development practices to AI applications while addressing unique challenges around evaluation, cost management, and scaling."
---

## Overview

This case study comes from a podcast conversation between Rob Zuber (CTO of CircleCI) and Michael Webster (Principal Engineer at CircleCI), discussing their hands-on experience building AI-powered features for their CI/CD platform. CircleCI, a leader in continuous integration and continuous delivery, has been exploring how to integrate LLM capabilities into their developer tooling while maintaining the reliability standards expected of production software.

The discussion is notable for its practitioner perspective—these are engineers who have actually built and deployed LLM-powered features and encountered the real-world challenges that come with operationalizing AI systems. The conversation covers two main areas: using AI to help developers (such as error summarization), and the meta-challenge of how to build, test, and maintain AI-powered applications in production.

## The Error Summarizer: A Concrete LLMOps Use Case

Webster describes their error summarizer feature, which takes long stack traces from CI/CD pipeline failures and uses LLMs to quickly provide recommendations about what the problem might be. Instead of developers having to manually parse through verbose Java stack traces, for example, the LLM can identify the likely root cause and suggest fixes.

They've also been experimenting with taking this further—if the system understands errors and can explain them, and if given context about what the developer was actually doing (their diff), can it automatically fix bugs? This remains experimental, highlighting that even experienced teams are still learning the boundaries of what's practical with current LLM technology.

## The Core Challenge: Non-Determinism and Subjectivity

The podcast emphasizes that the biggest challenge with LLM-powered applications is the probabilistic and non-deterministic nature of the outputs. Unlike traditional software where you define business logic and can trust that a database query will return data exactly as it was written, LLM outputs can vary significantly across runs even with identical inputs.

Webster draws an interesting analogy to UI/UX work: evaluating LLM outputs often requires subjective judgment similar to looking at a design and asking "does it seem right?" This goes beyond pure correctness—there are considerations like tone, helpfulness, and whether the response matches the intended style. For example, a chatbot might need to be friendly rather than just factual, depending on the product requirements.

## Model-Graded Evaluations: The Core Testing Strategy

A significant portion of the discussion focuses on "evals" (evaluations), particularly model-graded evaluations where LLMs are used to assess the quality of LLM outputs. The theory is that since these models were trained on vast amounts of human-produced text, they have some understanding of what "good" looks like and can grade outputs accordingly.

The prompts used in model-graded evaluations often use a student-teacher analogy, asking the evaluating model to grade the quality, correctness, or appropriateness of a response. However, Webster emphasizes caution: research from Hugging Face and others has shown that models can exhibit biases, including preferring their own outputs. GPT-4, for instance, shows a slight bias toward preferring GPT-4-generated content over outputs from other models.

Beyond model-specific biases, there are also positional biases—if you ask a model to compare two options presented as "left" and "right," there may be a tendency to prefer the left option regardless of content.

## Strategies for Robust Evaluation

To mitigate these biases and build confidence in evaluations, Webster recommends several approaches borrowed from traditional software testing:

Table-driven testing is valuable here—instead of testing a single example, you test multiple scenarios with varying inputs, weight them appropriately, and aggregate results. This builds statistical confidence rather than relying on any single evaluation.

Mutation testing concepts can also apply: take the output, perhaps use a cheaper model to rephrase or rework the question, then evaluate again. If you consistently get similar quality assessments across different phrasings and conditions, you can proceed with higher confidence.

The key insight is that no single evaluation will be perfect, so the strategy must be to understand tool behavior and build systems that offset known biases and limitations.

## User Journey-Focused Testing

Rather than attempting exhaustive testing (which would be prohibitively expensive and time-consuming given LLM response latencies and costs), Webster advocates focusing on critical user journeys. This mirrors traditional software testing philosophy: identify what matters most to users, what are the invariant requirements, and what failure modes are most concerning.

For applications with free-form chat interfaces, adversarial prompt testing becomes important—users will inevitably try to make the LLM say inappropriate things. For more constrained internal applications (like classifying survey responses), those concerns may be less relevant.

The team emphasizes having fallback strategies for when LLMs produce mediocre or incorrect answers. For example, when using OpenAI's function calling feature (often used for structured JSON output), the responses aren't always valid JSON. You need error handling strategies: retry logic, fallback paths, or graceful degradation.

## The Data Flywheel: Building Evaluation Datasets Over Time

A crucial operational pattern discussed is building a "data flywheel" where user feedback continuously improves the evaluation process. This can be as simple as thumbs up/thumbs down buttons, or more subtle behavioral signals like detecting when users regenerate a response or reprompt in a way that suggests dissatisfaction.

This signal is incredibly valuable—it represents real-world evaluation data specific to your use case, unlike generic benchmarks. Rob Zuber notes that this is different from traditional software metrics (response times, error rates, click patterns) because every user interaction contains implicit feedback about model performance.

## Cost Management and Scaling Considerations

The discussion addresses the economic realities of LLM operations. Token-based pricing from providers like OpenAI means costs scale directly with usage volume and prompt/response length. As applications scale, cost management becomes critical.

Several strategies are mentioned for cost optimization:

Fine-tuning can reduce prompt lengths by encoding domain knowledge into the model itself, reducing the tokens needed per request. OpenAI's cost reporting now breaks down usage by model type, helping teams understand where costs are going.

Routing strategies can direct simpler queries to cheaper models while reserving expensive models like GPT-4 for harder queries. The tradeoff is increased system complexity and more testing surface area.

Webster notes that choosing between shared API access and dedicated capacity (like Azure's hosted GPT-4 deployments) is another scaling decision teams will face.

The podcast acknowledges this is an emerging area—many teams haven't hit scale problems yet, but as AI adoption grows, cost optimization will become a significant operational concern. The speakers even joke that LLM cost optimization tools represent a clear business opportunity.

## Integration with CI/CD Philosophy

Throughout the discussion, there's an emphasis on integrating LLM testing into existing CI/CD practices. The goal is to have automated evaluation running in pipelines so that as teams iterate on prompts or model configurations, they get signal about quality before deploying to production.

However, the speakers acknowledge that human review remains important. Unlike deterministic software where comprehensive automated tests can provide high confidence, LLM applications benefit from ongoing human evaluation of edge cases and subjective quality assessments.

## Lessons and Takeaways

The conversation surfaces several practical lessons for teams building LLM-powered applications:

The easy part is getting started—foundation models let you prototype interesting features quickly without training your own models. The hard part is ensuring reliability, managing costs, and maintaining quality over time.

You need to adapt testing strategies for non-determinism rather than expecting traditional unit test-style certainty. Build confidence through multiple evaluations, diverse test cases, and statistical aggregation.

User feedback is invaluable signal—instrument your application to capture it and feed it back into your evaluation process.

Cost will become a concern at scale, but don't over-optimize prematurely. Understand that you're signing up for this operational challenge if your product succeeds.

Finally, treat LLM components with the same rigor as any critical software dependency—have fallback strategies, monitor behavior in production, and maintain the ability to iterate quickly when problems arise.