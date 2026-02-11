---
title: "Improving AI Code Review Bot Comment Quality Through Vector Embeddings"
slug: "improving-ai-code-review-bot-comment-quality-through-vector-embeddings"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6777fc56a6ea3cc053fbcd20"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:52:15.783Z"
  createdOn: "2025-01-03T15:03:50.872Z"
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "embeddings"
  - "prompt-engineering"
  - "fine-tuning"
  - "semantic-search"
  - "vector-search"
  - "chromadb"
  - "cloudflare"
industryTags: "tech"
company: "Greptile"
summary: "Greptile faced a challenge with their AI code review bot generating too many low-value \"nit\" comments, leading to user frustration and ignored feedback. After unsuccessful attempts with prompt engineering and LLM-based severity rating, they implemented a successful solution using vector embeddings to cluster and filter comments based on user feedback. This approach improved the percentage of addressed comments from 19% to 55+% within two weeks of deployment."
link: "https://www.greptile.com/blog/make-llms-shut-up"
year: 2024
seo:
  title: "Greptile: Improving AI Code Review Bot Comment Quality Through Vector Embeddings - ZenML LLMOps Database"
  description: "Greptile faced a challenge with their AI code review bot generating too many low-value \"nit\" comments, leading to user frustration and ignored feedback. After unsuccessful attempts with prompt engineering and LLM-based severity rating, they implemented a successful solution using vector embeddings to cluster and filter comments based on user feedback. This approach improved the percentage of addressed comments from 19% to 55+% within two weeks of deployment."
  canonical: "https://www.zenml.io/llmops-database/improving-ai-code-review-bot-comment-quality-through-vector-embeddings"
  ogTitle: "Greptile: Improving AI Code Review Bot Comment Quality Through Vector Embeddings - ZenML LLMOps Database"
  ogDescription: "Greptile faced a challenge with their AI code review bot generating too many low-value \"nit\" comments, leading to user frustration and ignored feedback. After unsuccessful attempts with prompt engineering and LLM-based severity rating, they implemented a successful solution using vector embeddings to cluster and filter comments based on user feedback. This approach improved the percentage of addressed comments from 19% to 55+% within two weeks of deployment."
---

## Overview

Greptile is a company building AI tools that understand large codebases, with their flagship product being an AI-powered code review tool. This case study, presented at a Sourcegraph Dev Tools meetup in December 2024, describes a common but critical LLMOps challenge: how to reduce the volume of low-quality outputs from an LLM in a production application without sacrificing the high-quality outputs that users actually want.

The core problem Greptile faced was that their code review bot was generating too many comments per pull request. In a PR with 20 changes, the bot might leave up to 10 comments, causing developers to simply ignore all of them—defeating the purpose of the tool entirely. Through analysis, they found that only approximately 19% of generated comments were "good" (meaning developers actually addressed them), 2% were factually incorrect, and a striking 79% were "nits"—comments that were technically correct but not actionable or valuable to the developer.

## Establishing Metrics and Evaluation

A significant aspect of this case study is how Greptile approached the evaluation problem. They considered two potential signals for comment quality: GitHub's thumbs up/down reaction feature and tracking whether developers actually addressed comments in subsequent commits by scanning diffs. They chose the latter approach, which provided a more objective and actionable metric: the "address rate" (percentage of generated comments that developers address before merging).

This decision reflects an important LLMOps principle—finding ground truth signals that correlate with actual user value rather than relying solely on subjective ratings. The address rate became their north star metric for measuring improvements.

## Failed Approach 1: Prompt Engineering

Greptile's first instinct was to use prompt engineering to reduce nit generation. This is often the first approach teams try when adjusting LLM behavior, as it requires no architectural changes. However, despite trying various prompting techniques, they could not get the LLM to produce fewer nits without also reducing the number of critical, valuable comments.

They also attempted few-shot learning by including examples of good and bad comments in the prompt, hoping the model would generalize the patterns. This approach actually made performance worse—the LLM inferred superficial characteristics from the examples rather than learning the deeper patterns that distinguish valuable comments from nits. This finding aligns with known limitations of in-context learning, where LLMs may pick up on surface-level features rather than underlying principles.

## Failed Approach 2: LLM-as-a-Judge

The second approach was to add a post-processing filtering step using an LLM-as-a-judge pattern. In this architecture, after generating comments, a second LLM call would rate the severity of each comment-plus-diff pair on a 1-10 scale, filtering out anything below a threshold of 7.

This approach failed for two reasons. First, the LLM's judgment of comment severity was described as "nearly random," suggesting that LLMs struggle to evaluate the quality of their own outputs in this domain. Second, this approach introduced significant latency by adding another inference call to the workflow, making the user experience noticeably slower.

This finding is noteworthy for LLMOps practitioners considering LLM-as-a-judge evaluation patterns. While this technique can work well in some contexts, it appears to struggle when the evaluation criteria are subjective or context-dependent—as "nittiness" turned out to be.

## Key Insight: Subjectivity of Quality

Through their experimentation, Greptile arrived at three important learnings: prompting doesn't solve this problem, LLMs are poor evaluators of comment severity, and—critically—the definition of a "nit" is subjective and varies from team to team. What one team considers important, another might dismiss as noise.

This insight pointed toward a learning-based approach where the system would need to adapt to each team's standards rather than applying a universal filter. This represents a shift from trying to encode quality criteria in prompts or models to instead learning those criteria from user behavior.

## Successful Approach: Embedding-Based Clustering

The solution that ultimately worked was an embedding-based filtering system that learned from user feedback at the team level. The architecture works as follows:

When developers upvote or downvote comments, or when comments are addressed versus ignored, Greptile generates embedding vectors for those comments and stores them in a vector database, partitioned by team. Over time, this builds up a semantic map of what each team considers valuable versus noisy.

When Greptile generates a new comment, it computes the embedding vector for that comment and applies a filtering rule based on cosine similarity:

- If the new comment has high cosine similarity (exceeding a threshold) with at least 3 unique downvoted comments, it gets blocked
- If it has high similarity with at least 3 upvoted comments, it passes
- If neither condition is met, or both are met, the comment passes through

This approach leverages the insight that most nit comments cluster into a relatively small number of semantic categories. Once a team has downvoted enough comments of a particular type (e.g., "consider adding more descriptive variable names"), the system can automatically filter out future comments that are semantically similar.

## Results and Limitations

The embedding-based filtering approach achieved significant results. Within two weeks of deployment, the address rate improved from 19% to over 55%—nearly a threefold improvement. While the team acknowledges this is "far from perfect," it represented the most impactful technique they found for reducing LLM output noise.

It's worth noting that this case study comes from a company selling an AI code review product, so there may be some promotional intent in how results are presented. However, the technical details are transparent about what didn't work, and the 55% address rate is presented honestly as imperfect rather than as a complete solution.

## LLMOps Implications

This case study offers several valuable lessons for LLMOps practitioners:

**Prompt engineering has limits**: Despite being the most common first approach to modifying LLM behavior, prompt engineering failed to solve this problem. This suggests that for nuanced, subjective quality dimensions, structural solutions may be necessary.

**LLM-as-a-judge isn't universal**: While LLM-based evaluation is popular for certain tasks, this case demonstrates it doesn't work well when evaluation criteria are subjective and context-dependent. The added latency is also a practical consideration.

**User feedback loops are valuable**: By building a system that learns from actual user behavior (upvotes, downvotes, addressed comments), Greptile created a self-improving system that adapts to each team's standards. This is a powerful pattern for production LLM applications.

**Embeddings enable semantic clustering**: Rather than trying to encode rules about what makes a good comment, the embedding approach lets the system discover semantic patterns organically. This is more robust than rule-based filtering.

**Personalization at the team level**: By maintaining separate embedding stores per team, the system can learn different standards for different contexts. This acknowledges that quality is not a universal constant but depends on the audience.

**Iterative improvement**: The team's willingness to try multiple approaches, measure results, and iterate is a hallmark of mature LLMOps practice. They also acknowledge the problem is ongoing and anticipate future improvements.

The case study also implicitly touches on the challenges of model-agnosticism—they ruled out fine-tuning partly because it would tie them to a specific model. The embedding-based approach maintains flexibility across underlying LLM providers.

Overall, this case study demonstrates a practical, production-tested approach to a common LLMOps challenge: when LLMs are too verbose, sometimes the best solution is not to change the LLM itself but to build intelligent filtering layers that learn from user behavior.