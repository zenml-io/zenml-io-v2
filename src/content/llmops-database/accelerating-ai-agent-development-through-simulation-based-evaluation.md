---
title: "Accelerating AI Agent Development Through Simulation-Based Evaluation"
slug: "accelerating-ai-agent-development-through-simulation-based-evaluation"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "agent-based"
  - "prompt-engineering"
  - "evals"
  - "harness-engineering"
  - "human-in-the-loop"
  - "open-source"
industryTags: "finance"
company: "Nubank / Snowglobe"
summary: "Nubank, Latin America's leading digital bank with 135 million customers, partnered with Snow Globe to dramatically accelerate their AI agent development cycle from weeks to hours by using simulation-based evaluation instead of relying solely on production data. The approach involved generating synthetic multi-turn conversation data with mocked tools and personas to test agents offline, enabling rapid iteration and experimentation without exposing customers to untested changes. The results included a 2x improvement in customer satisfaction scores (TNPS) for some agents, a 4% improvement in self-service rates, prevention of production regressions, and the ability to run 10+ experiments per quarter instead of waiting weeks for each A/B test to complete, with many agents now approaching or exceeding human-level quality."
link: "https://www.youtube.com/watch?v=KMR_RBoCa4M"
year: 2026
seo:
  title: "Nubank / Snowglobe: Accelerating AI Agent Development Through Simulation-Based Evaluation - ZenML LLMOps Database"
  description: "Nubank, Latin America's leading digital bank with 135 million customers, partnered with Snow Globe to dramatically accelerate their AI agent development cycle from weeks to hours by using simulation-based evaluation instead of relying solely on production data. The approach involved generating synthetic multi-turn conversation data with mocked tools and personas to test agents offline, enabling rapid iteration and experimentation without exposing customers to untested changes. The results included a 2x improvement in customer satisfaction scores (TNPS) for some agents, a 4% improvement in self-service rates, prevention of production regressions, and the ability to run 10+ experiments per quarter instead of waiting weeks for each A/B test to complete, with many agents now approaching or exceeding human-level quality."
  canonical: "https://www.zenml.io/llmops-database/accelerating-ai-agent-development-through-simulation-based-evaluation"
  ogTitle: "Nubank / Snowglobe: Accelerating AI Agent Development Through Simulation-Based Evaluation - ZenML LLMOps Database"
  ogDescription: "Nubank, Latin America's leading digital bank with 135 million customers, partnered with Snow Globe to dramatically accelerate their AI agent development cycle from weeks to hours by using simulation-based evaluation instead of relying solely on production data. The approach involved generating synthetic multi-turn conversation data with mocked tools and personas to test agents offline, enabling rapid iteration and experimentation without exposing customers to untested changes. The results included a 2x improvement in customer satisfaction scores (TNPS) for some agents, a 4% improvement in self-service rates, prevention of production regressions, and the ability to run 10+ experiments per quarter instead of waiting weeks for each A/B test to complete, with many agents now approaching or exceeding human-level quality."
notion:
  pageId: "3b4f8dff-2538-80ad-8986-f6364bfc4f52"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:31:00.000Z"
  lastEditedTime: "2026-08-06T11:31:00.000Z"
  publishedAt: "2026-08-07T12:41:34Z"
---

## Overview

Nubank is Latin America's leading digital bank, operating in Brazil, Mexico, and Colombia with plans to launch in the United States. With 135 million customers and quarterly revenue exceeding 5 billion dollars as of Q1 2026, Nubank represents a massive-scale deployment of AI agents for customer support. The company uses a hybrid approach where AI agents handle routine customer interactions end-to-end while human experts focus on the hardest and long-tail cases. This case study, presented in collaboration with Snow Globe and documented in a paper to be presented at a conference in Korea in August 2026, details how Nubank uses simulation-based evaluation to achieve what they claim is a 20x faster shipping cycle for AI agents.

The core problem Nubank faced was common to organizations deploying complex AI agents in production: the evaluation bottleneck. While building and modifying agent architectures could be done in hours, validating those changes through traditional methods took weeks. This created a fundamental constraint on the pace of innovation and improvement for their customer-facing AI systems.

## The Evaluation Bottleneck

Nubank's experience highlights a critical challenge in LLMOps that extends beyond the general difficulty of evaluation. While metrics for agent evaluation have become more tractable through techniques like LLM-as-a-judge classifiers aligned with human judgment and automated prompt optimization, the real bottleneck lies in generating the evaluation data itself. For multi-turn agent systems, each data point is not a simple input-output pair but rather a complete trajectory involving multiple turns, internal tool calls, and state management across the conversation.

Traditional approaches to obtaining evaluation data fell into two categories, each with significant drawbacks. Manual authoring of evaluation data is extraordinarily time-consuming for agent systems. Creating a single multi-turn conversation requires hand-planning state updates, manually designing the trajectory the agent should follow, and ensuring that the state remains consistent across all tool calls. The complexity increases exponentially compared to earlier generations of machine learning data or even simple single-turn question-answering datasets.

Production traces, on the other hand, are nearly free from a data collection perspective since they emerge naturally from live traffic. However, this approach comes with a critical cost: every experiment runs on real users. This makes parallel experimentation extremely difficult and introduces substantial risk. When you want to test whether a change improves agent performance, you must expose actual customers to potentially degraded experiences. Furthermore, customer feedback through feedback forms is sparse and noisy, and achieving statistical significance for A/B tests can take an extended period, sometimes weeks or longer.

This bottleneck meant that Nubank's typical development cycle involved a few hours to change the agent harness, several days to run offline evaluations on hand-curated data, and potentially weeks to run production A/B tests and monitor for regressions while waiting for statistically significant customer feedback. This timeline severely constrained the team's ability to iterate quickly and respond to quality issues.

## The Simulation-Based Solution

Snow Globe's simulation framework addresses this bottleneck by generating evaluation data synthetically rather than waiting for production data. The simulation approach works through several key components working together to create realistic multi-turn agent evaluations.

The system begins by wrapping the agent being tested using the Snow Globe SDK, which requires minimal to no code changes. A critical aspect of the setup involves identifying which tools need to be mocked for the simulation to function effectively. This allows the agent to execute in a controlled environment where external dependencies are simulated rather than calling actual production systems.

The second input to the simulation system defines how to drive and steer the simulation itself. This includes defining personas, use cases, and specific data points that should be simulated. The persona generation is notably sophisticated. For example, a simulated persona might be "Maria Souza," a 34-year-old designer who is a first-time credit card customer. The simulation generates not just basic demographic information but also essential grounding data such as a synthetic address, credit card details, and even behavioral characteristics like tone and voice. Importantly, this generated data remains consistent throughout the agent execution, allowing the agent to be properly evaluated against coherent state.

When the simulation runs, it produces multi-turn conversations between the simulated user and the real agent. The simulated user responds in ways consistent with their defined persona. For instance, if Maria Souza is characterized as communicating in curt one-line messages, the simulation maintains that pattern. When the agent executes tool calls, the simulator provides mocked outputs that are valid and consistent with the simulated user's state. For example, if an agent tries to verify an address, it receives back information consistent with the synthetic address that was generated for that persona.

The output of the simulation is not just conversational data but also rich metadata. Each turn can be evaluated using judge models, providing per-turn information about how the agent is performing. This data pipes directly into Nubank's evaluation pipeline, enabling data generation on demand rather than waiting for production traffic.

## Production Integration and the Self-Improvement Loop

Nubank has integrated simulation into what they describe as a self-improvement loop for their agents. The cycle begins with shipping an agent to production and observing its performance. The team then invests significant effort in creating robust evaluation metrics using automated prompt optimization techniques, specifically mentioning algorithms like "Japa" for this optimization process.

Once robust evaluation metrics are established, the team runs simulations to generate evaluation data. Both simulated data and real production data are then passed through the same evaluation pipeline. This provides rich signal for optimizing the agent architecture, prompts, tools, and other components. Crucially, before shipping any changes to production, the team verifies the optimization using simulation results.

This approach has enabled Nubank to run many A/B tests for each agent, and they deploy multiple such agents across the company. The traditional approach might involve launching an A/B test, waiting weeks for results, then launching the next experiment. With simulations, the team can run numerous experiments through simulation and only launch production A/B tests for the most promising candidates. In practice, this means they might run ten different ideas through simulation and launch just one production A/B test, short-circuiting the first five or six experiments that would have otherwise needed production validation.

## Validation and Results

A critical question for any simulation-based approach is whether the simulated data actually corresponds to production performance. Nubank reports high correlation between evaluation metrics computed on simulated data versus real production data. They conducted human review by domain experts who confirmed that 80% of simulation-generated data was usable. Importantly, this held true not just for mature agents but also for greenfield agents being developed from scratch, suggesting the approach is valuable across the agent lifecycle.

The quantitative results Nubank reports are substantial, though as with any vendor-presented case study, these should be considered as claimed outcomes rather than independently verified facts. The company reports that average Transactional Net Promoter Score (TNPS), a measure of customer satisfaction, improved dramatically across five AI agents over several months of effort. Many agents are reportedly approaching human-level quality, and in some cases exceeding it, though the data presented was noted to be somewhat dated, suggesting even further improvements since measurement.

More specifically, one agent achieved a 2x improvement in TNPS attributed to the combination of simulation, robust evaluations, and principled investment in agent quality. Another agent saw a 4% improvement in self-service rate (SSR), meaning customers were able to resolve their issues without escalation to human agents. This is particularly notable because in customer service contexts, there is often a perceived tradeoff between customer satisfaction and self-service rates, but Nubank claims to be improving both simultaneously.

The simulation approach has also proven valuable for risk mitigation. The team caught a regression through simulation that would have otherwise made it to production, potentially degrading customer experience. In another case, simulation identified an issue that would have lowered the self-service rate, reducing operational efficiency.

## Model Evaluation and Open Source Exploration

One particularly interesting application of the simulation framework has been in evaluating different language models for use in Nubank's agent systems. With the proliferation of open source models, Nubank has been exploring whether these models can match or exceed the performance of frontier proprietary models. The simulation framework provides an ideal testbed for this exploration, allowing the team to quickly swap different models into their agent architecture and evaluate performance without exposing customers to potentially lower-quality experiences.

The team reports that this simulation-based model evaluation has saved multiple weeks of effort, though they acknowledge they may be underestimating the actual time savings. At the time of the presentation, they had production A/B tests running to validate whether open source models perform as well as frontier models, with the simulation results having already narrowed down which models were worth testing in production.

## Technical Approach and Infrastructure

While the presentation does not dive deeply into the technical implementation details of the simulation infrastructure itself, several key aspects emerge from the discussion. The Snow Globe SDK integrates with existing agent architectures with minimal code changes, suggesting a relatively non-invasive instrumentation approach. The system must handle sophisticated state management to ensure consistency across multi-turn interactions and tool calls.

The evaluation infrastructure uses LLM-as-a-judge techniques, with significant investment in aligning these judge models with human judgment. Automated prompt optimization is employed both for improving the agents themselves and for tuning the evaluation metrics. The specific mention of "Japa" as an algorithm for automated prompt optimization provides some insight into the technical sophistication, though without more context it's difficult to assess this specific technique.

The team's approach to closing the simulation-to-reality gap involves multiple feedback mechanisms: offline evaluation on both simulated and real data, online production metrics, and human review to validate simulation quality. This multi-pronged validation approach is essential for building confidence in simulation-derived insights.

## Critical Assessment and Considerations

While the results presented are impressive, several considerations are worth noting for teams evaluating this approach. First, the case study comes from a joint presentation between Nubank and Snow Globe, with Snow Globe being a vendor providing the simulation platform. This creates natural incentives to emphasize positive results, and the specific metrics and improvements should be understood in that context.

Second, the success of simulation-based evaluation likely depends heavily on how well the simulated scenarios cover the actual distribution of production use cases. The 80% human-verified usability rate for simulation data suggests that 20% of simulated scenarios may not be representative or useful, which could mask edge cases or distribution shift issues. The high correlation between simulated and real evaluation metrics is encouraging but doesn't guarantee that all aspects of production performance are captured.

Third, Nubank operates at massive scale with 135 million customers and substantial resources. Implementing a sophisticated simulation infrastructure, creating robust evaluation metrics, and running continuous improvement loops requires significant engineering investment. Smaller organizations might find the upfront investment challenging, though the 20x speedup claim, if accurate, would provide substantial return on that investment.

Fourth, the case study focuses primarily on customer support agents, which have relatively well-defined success criteria (customer satisfaction, self-service rate, correctness) and operate in a somewhat constrained domain. Generalizing this approach to other types of agents operating in more open-ended domains may present additional challenges.

That said, the fundamental insight appears sound: generating evaluation data through simulation allows for rapid iteration without the risks and delays of production testing, as long as the simulation quality is high enough to predict production performance. The emphasis on validating simulation quality through multiple methods demonstrates appropriate rigor in the approach.

## Broader LLMOps Implications

This case study illustrates several important principles for LLMOps at scale. First, evaluation infrastructure is not just about metrics but equally about data generation. Teams that can generate high-quality evaluation data on demand gain significant competitive advantages in iteration speed. Second, the combination of offline simulation-based evaluation and online production validation creates a much more efficient development cycle than relying solely on production feedback.

Third, the self-improvement loop described by Nubank represents a mature approach to agent development: invest in robust metrics, generate data through multiple methods including simulation, use that data to drive systematic improvements, and validate changes before production deployment. This stands in contrast to more ad-hoc approaches of "throwing things at the wall and seeing what sticks," as they explicitly note.

Finally, the use of simulation for model evaluation highlights an important emerging use case as the landscape of available language models continues to expand. Organizations need efficient methods to evaluate whether new models are worth adopting, and simulation-based evaluation provides a lower-risk approach than immediate production deployment.

The presentation concludes with three key takeaways that summarize the core insights: generating evaluation data in simulation rather than waiting for production data can dramatically accelerate release cycles; closing the simulation-to-reality gap through careful validation is essential for trusting simulation results; and in enterprise settings, building self-improving agents fundamentally requires both aligned metrics and reliable data generation methods. With these components in place, creating continuous improvement loops becomes tractable, which represents the future direction for production agent systems.
