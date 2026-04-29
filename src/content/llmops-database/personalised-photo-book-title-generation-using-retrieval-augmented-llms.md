---
title: "Personalised Photo Book Title Generation Using Retrieval-Augmented LLMs"
slug: "personalised-photo-book-title-generation-using-retrieval-augmented-llms"
draft: false
llmopsTags:
  - "content-moderation"
  - "classification"
  - "multi-modality"
  - "poc"
  - "prompt-engineering"
  - "rag"
  - "few-shot"
  - "latency-optimization"
  - "cost-optimization"
  - "embeddings"
  - "semantic-search"
  - "evals"
  - "fastapi"
  - "monitoring"
  - "anthropic"
  - "amazon-aws"
industryTags: "tech"
company: "Popsa"
summary: "Popsa, a photo book technology company serving over 50 countries, evolved their Title Suggestion feature from a rule-based graph algorithm to a generative AI system using Amazon Bedrock. The problem was that customers struggled to create compelling titles for their photo books, often settling for generic options like \"France 2024\" or simply \"Photos.\" The solution involved retrieval-augmented few-shot prompting with Claude 3 Haiku, later migrated to Amazon Nova models, combining metadata extraction, computer vision, and reverse geocoding to generate creative, brand-aligned titles and subtitles in 12 languages. Results showed a 13% increase in positive user feedback (from 58% to 71%), further improvement to 73% with Nova Pro, cost reductions of approximately 72% when using Nova Lite versus Claude Haiku, and 35% faster time-to-first-suggestion through streaming APIs, generating over 5.5 million personalised titles in 2025."
link: "https://aws.amazon.com/blogs/machine-learning/how-popsa-used-amazon-nova-to-inspire-customers-with-personalised-title-suggestions/"
year: 2026
seo:
  title: "Popsa: Personalised Photo Book Title Generation Using Retrieval-Augmented LLMs - ZenML LLMOps Database"
  description: "Popsa, a photo book technology company serving over 50 countries, evolved their Title Suggestion feature from a rule-based graph algorithm to a generative AI system using Amazon Bedrock. The problem was that customers struggled to create compelling titles for their photo books, often settling for generic options like \"France 2024\" or simply \"Photos.\" The solution involved retrieval-augmented few-shot prompting with Claude 3 Haiku, later migrated to Amazon Nova models, combining metadata extraction, computer vision, and reverse geocoding to generate creative, brand-aligned titles and subtitles in 12 languages. Results showed a 13% increase in positive user feedback (from 58% to 71%), further improvement to 73% with Nova Pro, cost reductions of approximately 72% when using Nova Lite versus Claude Haiku, and 35% faster time-to-first-suggestion through streaming APIs, generating over 5.5 million personalised titles in 2025."
  canonical: "https://www.zenml.io/llmops-database/personalised-photo-book-title-generation-using-retrieval-augmented-llms"
  ogTitle: "Popsa: Personalised Photo Book Title Generation Using Retrieval-Augmented LLMs - ZenML LLMOps Database"
  ogDescription: "Popsa, a photo book technology company serving over 50 countries, evolved their Title Suggestion feature from a rule-based graph algorithm to a generative AI system using Amazon Bedrock. The problem was that customers struggled to create compelling titles for their photo books, often settling for generic options like \"France 2024\" or simply \"Photos.\" The solution involved retrieval-augmented few-shot prompting with Claude 3 Haiku, later migrated to Amazon Nova models, combining metadata extraction, computer vision, and reverse geocoding to generate creative, brand-aligned titles and subtitles in 12 languages. Results showed a 13% increase in positive user feedback (from 58% to 71%), further improvement to 73% with Nova Pro, cost reductions of approximately 72% when using Nova Lite versus Claude Haiku, and 35% faster time-to-first-suggestion through streaming APIs, generating over 5.5 million personalised titles in 2025."
notion:
  pageId: "351f8dff-2538-804a-9dff-d6bf1e8e62d7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-29T07:00:00.000Z"
  lastEditedTime: "2026-04-29T07:00:00.000Z"
  publishedAt: "2026-04-29T13:46:14Z"
---

## Overview

Popsa is a technology company operating in the personalized photo product space, helping users transform their photo libraries into physical products like photo books across more than 50 countries and 12 languages. The company has a long history of automation, having launched PrintAI in 2016 to automatically design photo books. This case study focuses on their evolution of the Title Suggestion feature from a traditional rule-based system to a production generative AI system using Amazon Bedrock, demonstrating mature LLMOps practices including systematic evaluation, A/B testing, model comparison, and continuous optimization.

The business context is particularly interesting: when customers receive their photo books, the title and subtitle on the front cover significantly impact the perceived quality of the product, yet most customers aren't professional copywriters. The original problem was that users would settle for uninspiring titles like "France 2024," "Photos from Spain," or simply "Photos." While Popsa had launched a Title Suggestion feature in 2021 using a rule-based algorithm, they identified an opportunity in June 2024 to apply generative AI to inspire users with more creative, personalized titles.

## Production System Architecture and Data Pipeline

The production architecture demonstrates a sophisticated multi-stage pipeline that combines traditional ML with generative AI. When the Title Suggestion Service receives a request, it processes the user's design through several stages. First, it decrypts and processes the design to extract timestamps from the selected photos. Then it performs reverse geocoding operations on any latitude/longitude coordinates embedded in the image metadata. The system also runs on-device convolutional neural networks to extract visual features and classify the subject matter of the design—detecting whether images contain beaches, barbecues, pets, or other relevant objects.

This preprocessing stage produces a structured description of the photo book, something like "A skiing photobook with 21 photos taken in the Alps between 21st January 2025 and 23rd January 2025." This description serves as the foundation for the generative AI component, demonstrating how traditional computer vision and metadata extraction complement LLM-based generation rather than being replaced by it.

The system then passes this enriched description to a retrieval-augmented few-shot prompting component. Popsa created a database of example photo books with acceptable title suggestions. For each new request, the system retrieves similar photo book designs from this database along with a selection of their suggested titles. These examples are structured as user-assistant message pairs in the conversation history before appending the current user's design document as the final user message. This retrieval-based approach allows the LLM to emulate prior successful responses while naturally following the defined constraints and brand guidelines.

## Evaluation Framework and Metrics

One of the most impressive aspects of this case study from an LLMOps perspective is the rigorous evaluation framework Popsa established before implementing their solution. They defined strict technical requirements that could be programmatically validated, creating a dataset of over 100 example photo books and building an evaluation pipeline. The strict requirements included character limits (both title and subtitle must not exceed 36 characters due to layout constraints), valid title categories (each suggestion must include a category that determines which icon displays alongside it, and invalid categories would prevent rendering), and JSON format (all outputs must be valid JSON with specific keys: title, subtitle, and category).

These requirements enabled quantitative metrics including percentage of title/subtitle suggestions within character limits, percentage of valid title categories, and percentage of responses in correct JSON format. However, Popsa recognized that technical correctness alone wouldn't ensure quality, so they also defined broader qualitative guidelines including theme consistency (categories matching content), brand style alignment (reflecting Popsa's tone and identity), title-subtitle cohesion (complementary pairs without repetition), and multilingual quality across all 12 supported languages.

To evaluate performance against these qualitative guidelines, Popsa employed an "LLM-as-a-judge" approach. This is a mature LLMOps practice where one LLM evaluates the outputs of another, enabling rapid iteration on different models, prompts, and methods. After narrowing to two or three top-performing options through this automated evaluation, they conducted extensive internal testing before rolling out to users. This multi-stage evaluation approach—automated technical validation, LLM-based quality assessment, internal testing, and ultimately user feedback—demonstrates production-grade rigor.

## Model Selection and Comparison

The case study provides valuable transparency around model selection and performance comparison. Initially, Popsa implemented their solution using Anthropic's Claude 3 Haiku through Amazon Bedrock. The unified API of Amazon Bedrock proved crucial to their iterative approach, allowing them to compare and test new models by simply changing model IDs rather than rewriting integration code. This enabled them to ship experiments in hours instead of weeks, a significant operational advantage.

When the Amazon Nova model family (Micro, Lite, and Pro) launched in early 2025, Popsa ran multivariate A/B tests comparing these models against Claude 3 Haiku. They tracked both guardrail metrics (ensuring technical requirements were met) and gathered direct user preferences through an in-app feedback feature. The results showed interesting trade-offs: while Claude 3 Haiku achieved 71% positive feedback, Amazon Nova Pro reached the highest user satisfaction at 73% positive with the lowest negative feedback at 12%. Nova Micro, while outperforming the legacy graph-based method, lagged behind the other LLMs in user satisfaction and was set aside.

Between the remaining competitive models, Popsa analyzed not just quality but also cost, latency, and throughput. The comparison revealed that Nova Lite offered near-identical quality to Claude Haiku (both around 71% positive feedback) but at substantially lower cost and faster response times. Specifically, Nova Lite cost $0.000069 per 1,000 input tokens versus $0.00025 for Claude Haiku (about 72% cheaper on input) and $0.000276 per 1,000 output tokens versus $0.00125 for Claude Haiku (about 78% cheaper on output). Response time to output 500 tokens improved from 6.8 seconds with Claude Haiku to 2.4 seconds with Nova Lite, a meaningful latency reduction.

This cost-quality-latency analysis demonstrates mature production thinking. The case acknowledges that Nova Pro achieved the highest quality but at higher cost ($0.00092 input / $0.00368 output per 1,000 tokens), setting up their future strategy of using larger models for a portion of users while operating smaller models cost-effectively at scale.

## Prompt Engineering and Retrieval-Augmented Generation

The prompt engineering strategy Popsa settled on—retrieval-based few-shot prompting—represents a sophisticated approach to production LLM systems. Rather than relying solely on zero-shot prompting with detailed instructions, or maintaining a static set of few-shot examples, they dynamically retrieve relevant examples based on similarity to the current request. This approach combines the benefits of in-context learning (few-shot examples help the model understand the task and style) with personalization (retrieved examples are similar to the current use case).

The system retrieves "a few similar Photo Book designs and a random selection of their suggested titles" from a database of examples. The randomization of title selection among valid options likely helps introduce appropriate variety while the similarity-based photo book retrieval ensures relevance. These examples are structured in the conversation history as user-assistant pairs, a technique that leverages the conversational fine-tuning of models like Claude and Nova to naturally elicit responses in the desired format and style.

This RAG-like approach (though focused on retrieving examples rather than factual knowledge) addresses several production challenges simultaneously. It helps ensure outputs conform to brand guidelines through exemplars, naturally constrains outputs to valid formats and categories seen in examples, supports multilingual generation by retrieving examples in the target language, and allows non-technical team members to improve the system by curating the example database rather than modifying prompts.

## Production Deployment and Rollout Strategy

Popsa's deployment strategy demonstrates production maturity through gradual, data-driven rollout. After identifying improvements through their evaluation framework, they relied on a feedback loop where customers rated suggestions as positive, neutral, or negative. They conducted multivariate testing with hundreds of thousands of users, comparing the new generative AI approach against their previous graph-based method. The feedback strongly favored generative AI titles, and key business metrics including "Design Created" and "Purchase" improved measurably.

Only after several months of gathering this evidence did they roll the feature out to 100% of users. The measured approach—from initial testing to broad deployment—reflects appropriate caution for a production system directly impacting customer experience and business outcomes. The case reports that moving from the graph algorithm to Claude 3 Haiku increased positive user feedback by 13% (from 58% to 71%), a substantial improvement validated through real user behavior.

When they subsequently tested Amazon Nova models in early 2025, they again employed multivariate A/B testing rather than simply switching all traffic. This discipline of continuous testing and validation, even after achieving initial success, characterizes mature LLMOps practice.

## Latency Optimization Through Streaming

A particularly interesting technical evolution described in the case study is Popsa's migration from the InvokeModel API to the ConverseStream API of Amazon Bedrock to improve perceived responsiveness. They identified "Time to First Suggestion" (TTFS) as a key latency metric—measuring how quickly the first valid suggestion appears after a user request. The insight is that even if the system is generating multiple options in the background, lowering TTFS makes the feature feel more responsive, allowing users to see suggestions before they might otherwise move on.

The implementation required extending their FastAPI-based service to parse streams in real time, validating suggestions as tokens arrive and returning the first valid title-subtitle-category triplet immediately upon validation. Additional suggestions continue streaming in the background, but the client already has something ready to display. This architectural choice prioritizes user experience, trading some code complexity for dramatically improved perceived latency.

The results were significant: average time to first suggestion decreased from 1.41 seconds to 0.92 seconds, a 35% improvement. This demonstrates how LLMOps in production extends beyond model selection and prompt engineering to include API design choices, streaming protocols, client-server coordination, and careful attention to user-perceived performance metrics.

## Scale and Business Impact

The scale of the production system is notable: the case study reports that in 2025, the Title Suggestion feature generated over 5.5 million titles. This substantial volume validates that the system successfully moved beyond experimentation to become a core production feature handling real user traffic across 50+ countries and 12 languages. The multivariate testing showed not just improvements in user feedback sentiment but also measurable uplifts in engagement metrics (Design Created) and conversion metrics (Purchase), demonstrating business value beyond just feature satisfaction.

The feedback loop created by this scale provides valuable data about what resonates with users, what doesn't, and how people interact with suggestions. Popsa explicitly notes this feedback will continue to drive evolution of the feature, illustrating how production ML systems ideally create virtuous cycles where deployment generates data that enables improvement.

## Future Directions and Model Fine-Tuning Strategy

The case study concludes with forward-looking plans that reflect sophisticated thinking about operating LLMs in production. Popsa plans to use larger models like Nova Pro for a portion of their user base to capture creativity and nuance while still operating cost-effectively at scale overall. This mirrors a common pattern in production systems: using more expensive, capable models for a subset of requests where quality matters most or to gather training data.

More interestingly, they plan to use data gathered from these experiments with larger models to fine-tune smaller models, enabling them to "inherit the strengths of their larger counterparts without compromising latency or affordability." This represents a mature understanding of the model development lifecycle in production: use large models to establish quality targets and generate training data, then distill that knowledge into smaller models that can serve the majority of traffic more efficiently.

They also mention future work on tool integrations that would give the LLM richer context about each photo book, including event details and seasonal cues, aiming for more personalized, thematic, and brand-aligned titles. This suggests moving from their current metadata-rich but still relatively structured inputs toward more dynamic, contextual information retrieval.

## Critical Assessment and Limitations

While this case study presents an impressive production LLM system, it's important to note several considerations. First, the case is co-authored by AWS employees and published on an AWS blog, so it naturally emphasizes the benefits of AWS services (Amazon Bedrock, Amazon Nova) and may not fully explore challenges encountered or alternative approaches considered. The comparison heavily favors Amazon Nova models, which is understandable given the venue but means readers should consider that other models or providers weren't tested or reported.

The case doesn't discuss failure modes in detail—what happens when the system generates inappropriate titles, how often guardrails are violated in production, or how they handle edge cases. The character limit constraint is mentioned as strict, but there's no discussion of how often models violate this constraint or what fallback mechanisms exist. The multilingual capability across 12 languages is mentioned but not deeply explored—whether quality is truly consistent across languages or if some require special handling isn't clear.

The retrieval component of their RAG approach (retrieving similar photo books and example titles) is described conceptually but without technical detail about similarity metrics, embedding models, retrieval algorithms, or how they ensure diversity in retrieved examples. The "LLM-as-a-judge" evaluation approach is mentioned but not detailed—which model served as judge, how prompts were structured for evaluation, how well LLM judgments correlated with human preferences.

The business metrics mentioned (Design Created, Purchase) showed improvement but specific numbers aren't provided beyond the user feedback percentages. The cost savings are substantial (72%+ reduction moving to Nova Lite) but absolute costs aren't disclosed, so it's unclear whether this represents thousands or millions in annual savings.

## Conclusion on LLMOps Maturity

Despite these limitations inherent in a vendor case study, Popsa's Title Suggestion system demonstrates many hallmarks of mature LLMOps practice. They established clear requirements and evaluation metrics before implementation, created systematic evaluation pipelines combining automated and human judgment, employed retrieval-augmented generation to improve relevance and consistency, conducted rigorous A/B testing with large user populations before full rollout, continuously compared models based on quality, cost, and latency trade-offs, optimized for user-perceived performance through streaming APIs, operated at meaningful scale across multiple languages and countries, and planned for continuous improvement through feedback loops and model fine-tuning.

The system successfully transitioned from experimentation to production, handling millions of requests and demonstrably improving both user satisfaction and business outcomes. The technical architecture appropriately combines traditional ML (computer vision, metadata extraction) with generative AI rather than treating LLMs as a complete replacement. The operational approach prioritizes gradual, measured rollout with continuous monitoring and optimization rather than rapid deployment and hoping for the best.

For organizations building production LLM systems, this case study offers valuable lessons in evaluation framework design, the importance of retrieval-augmented approaches for consistency and brand alignment, the value of Amazon Bedrock's unified API for rapid model comparison, strategies for optimizing latency through streaming, and the importance of aligning technical metrics with business outcomes through A/B testing. While readers should maintain appropriate skepticism about vendor-published case studies, the fundamental practices described represent solid LLMOps methodology applicable beyond this specific AWS-based implementation.
