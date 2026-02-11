---
title: "Variable Aggression Code Autocomplete with Fine-Tuned LLMs"
slug: "variable-aggression-code-autocomplete-with-fine-tuned-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "698adfbd68e973f85a495380"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-10T11:06:51.158Z"
  lastUpdated: "2026-02-10T07:51:57.685Z"
  createdOn: "2026-02-10T07:35:25.479Z"
llmopsTags:
  - "code-generation"
  - "prompt-engineering"
  - "model-optimization"
  - "few-shot"
  - "token-optimization"
  - "latency-optimization"
  - "human-in-the-loop"
  - "evals"
  - "pytorch"
  - "monitoring"
industryTags: "tech"
company: "Windsurf"
summary: "Windsurf developed Tab v2, an AI-powered code autocomplete system that addresses the challenge of balancing prediction frequency, accuracy, and code length in developer tooling. The team reimagined their LLM-based autocomplete by focusing on total keystrokes saved rather than just acceptance rate, implementing extensive context engineering to reduce prompt length by 76%, and using reinforcement learning to train models with different \"aggression\" levels. The result was a 54% average increase in characters per prediction and 25-75% more accepted code, with user-selectable aggression parameters allowing developers to customize behavior based on personal preferences."
link: "https://windsurf.com/blog/windsurf-tab-2"
year: 2026
---

## Overview

Windsurf's Tab v2 represents a comprehensive LLMOps case study in deploying and optimizing code autocomplete systems powered by large language models. The original Tab feature, launched one year prior to this update, provided four predictive capabilities triggered on every keypress: standard autocomplete, multi-line supercomplete, tab-to-jump navigation, and automatic import statements. After analyzing billions of predictions in production, the Windsurf team rebuilt the system from the ground up, achieving significant performance improvements while introducing a novel concept of user-configurable "aggression" levels.

The case study is particularly valuable because it demonstrates the complete LLMOps lifecycle, from context engineering and prompt optimization to reinforcement learning, evaluation design, A/B testing, and production deployment. It also highlights an important lesson about production ML systems: different users have fundamentally different preferences, and a one-size-fits-all approach may not optimize for actual user value.

## Core Problem and Metric Redefinition

The fundamental challenge Windsurf faced was not simply improving their existing autocomplete model, but reconceptualizing what "good" meant for an autocomplete system. The industry standard metric had been acceptance rate—the percentage of predictions that users accept. However, the team identified a critical flaw in this metric: acceptance rate can be artificially inflated by only making predictions when confidence is extremely high, resulting in a "Captain Obvious" system that rarely provides value.

Through analysis of production usage data, Windsurf reframed the optimization goal as maximizing total keystrokes saved for developers. This composite metric accounts for both acceptance rate and the amount of code predicted per suggestion. The insight here is subtle but important for LLMOps practitioners: the true business value comes from helping developers write more code faster, not from achieving high acceptance rates on trivial predictions. This required balancing the "risk" of predicting more code (which could increase rejection rates) against the potential reward of collapsing multiple keystrokes into a single tab press.

The concept of "aggression" emerged naturally from this reframing. A more aggressive model predicts more code per suggestion, taking greater risks but potentially saving more keystrokes when correct. A less aggressive model makes safer, shorter predictions with higher acceptance rates but lower total keystroke savings. The team discovered through user interviews that when the system was "too aggressive," users complained about it trying too hard to restore code to a clean working state—such as completing a simple "def" in Python into a full function to make the file runnable, which may not align with the developer's intent while actively coding.

## Context Engineering and Prompt Optimization

One of the most impactful LLMOps interventions was comprehensive context engineering. The team inherited a system prompt that had been copied from their Cascade product, which was completely unoptimized for the autocomplete use case. Through systematic prompt engineering, they achieved a 76% reduction in system prompt prefix length. This seemingly simple change had cascading benefits: reduced API costs, faster time-to-first-token, and improved model performance.

The prompt optimization went beyond just shortening the prompt. The team removed unused tool call prompts and examples that were poisoning the context—a phenomenon now recognized in the industry as "context poisoning." When an LLM is given irrelevant information in its context window, it can degrade performance even if that information doesn't directly contradict the task at hand.

At production scale, the team had to make every token count. They brought Cognition's internal tooling to analyze their data pipeline and identify smaller optimizations. Specific improvements included fixing how they expressed the cursor position to the model and adding related file context to improve code suggestion quality. This attention to detail in context construction is characteristic of mature LLMOps practices—minor optimizations compound when operating at the scale of billions of predictions.

The case study highlights an important reality of production LLM systems: what works for one use case (Cascade) may not transfer directly to another (Tab autocomplete), even within the same domain. Context engineering must be tailored to the specific task, and this requires both systematic experimentation and careful analysis of production data.

## Data Engineering and Training Pipeline

With the context pipeline optimized, the team rebuilt their data pipeline for training Tab v2. The improved understanding of what context the model actually needed in production directly informed how they structured training data. This bidirectional flow—using production insights to improve training, and training improvements to enhance production performance—is a hallmark of mature LLMOps practices.

The team then applied reinforcement learning (RL) to train the new Tab model. Interestingly, this represented the first real production usage of the RL infrastructure they would later use for SWE 1.5, another product. This reveals a strategic approach to LLMOps: building reusable infrastructure that can be applied across multiple products, with each application providing lessons that improve the infrastructure.

However, the RL training process exposed fundamental challenges in defining reward functions for autocomplete behavior. The team encountered what they describe as "reward hacks"—situations where the model optimized for the reward function in ways that didn't align with actual user value. A canonical example they mention is the model learning to predict "def" when a user types "def" in Python, simply to restore the file to a runnable state. This behavior emerges from standard post-training approaches for code LLMs, which assume that "code needs to actually run." But for autocomplete, this assumption is locally false—developers are constantly in intermediate states where code doesn't run, and restoring to a runnable state may not reflect their intent.

Addressing these reward hacks required iterating on both the reward function and training loops. The team had to "better capture the concept of high quality aggression" by inventing new evaluations across their training data. This process involved translating "high-taste developer intuition" about Tab output into measurable metrics—a challenge that many production ML teams face when dealing with subjective quality criteria.

## Evaluation and A/B Testing

The evaluation strategy combined automated metrics with extensive A/B testing on real users. The team tracked multiple dimensions of performance: prediction frequency, acceptance rate, characters per prediction, and ultimately total accepted characters (the product of the previous metrics). They explicitly held prediction frequency constant during optimization to avoid gaming the acceptance rate metric.

Through A/B testing, they validated that Tab v2 represented a Pareto improvement over v1—meaning it was better across all meaningful dimensions, not just trading off one metric for another. The headline result was an average 54% increase in characters per prediction while maintaining comparable acceptance rates.

However, the A/B testing also revealed a critical insight that purely quantitative metrics would have missed. When conducting qualitative user interviews, the team found that the exact same model was described as "too aggressive" by some users and "not bold enough" by others. This variance in user preferences couldn't be captured by aggregate metrics and suggested that optimizing for the median user would leave significant value on the table.

This discovery highlights an important limitation of standard A/B testing in LLMOps: aggregate metrics can mask heterogeneous preferences within your user base. While A/B testing is essential for validating overall improvements, qualitative research is necessary to understand the full user experience and identify opportunities for personalization.

## Personalization Through Aggression Levels

Rather than choosing a single aggression level that optimizes for the average user, Windsurf made the strategic decision to parameterize aggression and let users choose their preferred level. This approach leverages all the evaluation data and infrastructure they built during model development to create a spectrum of experiences.

The implementation details aren't fully specified in the case study, but the implications are significant for LLMOps. Offering multiple model configurations in production adds operational complexity—potentially multiple model versions, different serving requirements, and more complex monitoring. However, it also provides a mechanism for capturing more user value by accommodating diverse preferences.

The final results show the impact of this approach: 25-75% more accepted code depending on the chosen aggression level. This wide range suggests that users' preferences vary substantially, and that the personalization significantly impacts the value delivered. The chart shown in the case study demonstrates how different aggression levels trade off acceptance rate against characters per prediction, with the total accepted characters (the product) increasing across the range.

From an LLMOps perspective, this parameterization approach offers several benefits beyond user satisfaction. It provides built-in A/B testing infrastructure for future model improvements—new models can be tested across all aggression levels to ensure Pareto improvements across the preference spectrum. It also generates valuable data about user preferences that could inform future personalization efforts, potentially even leading to learned personalization models that automatically adjust aggression based on user behavior or coding context.

## Critical Assessment and Limitations

While the case study presents impressive results, several aspects warrant critical examination. First, the text is clearly marketing material for Windsurf's product, and the claims should be evaluated with appropriate skepticism. The headline numbers—54% increase in characters per prediction and 25-75% more accepted code—are presented without details about baseline performance, statistical significance, or the time periods compared. The wide range (25-75%) for accepted code improvements suggests high variance, which could indicate that the benefits are concentrated among certain user segments or use cases.

Second, the case study doesn't discuss failure modes or limitations of the new system. What happens when the aggressive prediction is wrong? How does this impact developer flow and concentration? There's research suggesting that incorrect autocomplete suggestions can be more disruptive than no suggestion at all, and this isn't addressed.

Third, the emphasis on "keystrokes saved" as the primary metric deserves scrutiny. While it's an improvement over raw acceptance rate, it still doesn't capture the full developer experience. Keystrokes saved only matters if the suggested code is actually what the developer wanted to write. If developers frequently need to read and evaluate aggressive predictions before rejecting them, the cognitive overhead might outweigh the keystroke savings. The case study acknowledges this implicitly with the "aggression" terminology—which came from users describing when things go wrong—but doesn't provide quantitative data on how often negative experiences occur.

Fourth, the personalization approach, while innovative, places a burden on users to understand and configure their preferences. The case study doesn't discuss whether they've implemented smart defaults, progressive disclosure of the feature, or guidance to help users find their optimal aggression level. In practice, many users may never adjust settings from defaults, potentially limiting the impact of this feature.

Finally, the reinforcement learning approach raises questions about ongoing model maintenance. The team describes discovering and fixing "reward hacks" during training, but reward hacking is an ongoing challenge in production RL systems. As users adapt to the system's behavior and as coding practices evolve, new failure modes may emerge that weren't present in training data. The case study doesn't discuss their strategy for monitoring and addressing these issues in production.

## Production LLMOps Practices Demonstrated

Despite these caveats, the case study demonstrates several valuable LLMOps practices. The systematic approach to context engineering—analyzing exactly what information the model needs and eliminating everything else—is applicable to any production LLM system. The emphasis on measuring what actually matters to users (keystrokes saved) rather than proxy metrics (acceptance rate) shows mature product thinking.

The integration of quantitative metrics with qualitative user research exemplifies best practices for evaluating subjective quality. The willingness to build reusable infrastructure (the RL training pipeline used for both Tab v2 and SWE 1.5) demonstrates strategic thinking about LLMOps at organizational scale.

The discovery and parameterization of user preference heterogeneity is particularly valuable. Many production ML teams optimize for average behavior and never investigate whether different user segments would benefit from different model configurations. Windsurf's approach of making aggression configurable acknowledges that one-size-fits-all may be suboptimal for complex, preference-driven tasks like code autocomplete.

The case study also implicitly demonstrates the importance of having sufficient production scale to make data-driven decisions. The "billions of predictions" mentioned provided the statistical power to identify issues, validate improvements, and discover user preference patterns that wouldn't be apparent at smaller scale.

Overall, while some claims should be viewed with appropriate skepticism given the marketing context, the technical approach described represents sophisticated LLMOps practices and offers valuable lessons for teams building and deploying production LLM systems, particularly in domains where user preferences are heterogeneous and traditional metrics may not capture actual user value.