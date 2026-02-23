---
title: "Synthetic Consumer Survey Generation Using LLMs with Semantic Similarity Response Mapping"
slug: "synthetic-consumer-survey-generation-using-llms-with-semantic-similarity-response-mapping"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "699c0ed9ac9c01c4e5e46f10"
  exportedAt: "2026-02-23T10:04:49.317Z"
  source: "live"
  lastPublished: "2026-02-23T08:26:26.546Z"
  lastUpdated: "2026-02-23T08:26:26.546Z"
  createdOn: "2026-02-23T08:24:57.815Z"
llmopsTags:
  - "customer-support"
  - "classification"
  - "poc"
  - "prompt-engineering"
  - "embeddings"
  - "semantic-search"
  - "few-shot"
  - "evals"
  - "open-source"
  - "openai"
  - "google-gcp"
industryTags: "other"
company: "Colgate"
summary: "PyMC Labs partnered with Colgate to address the limitations of traditional consumer surveys for product testing by developing a novel synthetic consumer methodology using large language models. The challenge was that standard approaches of asking LLMs to provide numerical ratings (1-5) resulted in biased, middle-of-the-road responses that didn't reflect real consumer behavior. The solution involved allowing LLMs to provide natural text responses which were then mapped to quantitative scales using embedding similarity to reference responses. This approach achieved 90% of the maximum achievable correlation with real survey data, accurately reproduced demographic effects including age and income patterns, eliminated positivity bias present in human surveys, and provided richer qualitative feedback while being faster and cheaper than traditional surveys."
link: "https://www.youtube.com/watch?v=D2_nBIsgmhQ"
year: 2025
---

## Overview

PyMC Labs, a Bayesian AI research company, collaborated with Colgate to develop an innovative approach to generating synthetic consumer survey responses using large language models. This case study represents a significant advancement in the application of LLMs to production market research scenarios, moving from theoretical synthetic consumers to a validated methodology that reproduces real human behavior patterns with high fidelity.

The work was conducted on a dataset from the personal care market containing 57 products, with each product having survey responses from 150 to 400 human participants along with demographic information. The primary goal was to evaluate purchase intent for product concepts that included both artwork and descriptive text, asking consumers how likely they would be to purchase on a scale from 1 (would never buy) to 5 (definitely going to buy).

## The Core Problem

The fundamental challenge that PyMC Labs addressed was the failure of naive LLM approaches to synthetic consumer generation. When researchers simply prompted LLMs with product concepts and asked them to provide a numerical rating from 1 to 5, the models exhibited severe limitations. Most critically, the LLMs demonstrated a strong tendency to hedge their responses by consistently choosing the middle value of 3, regardless of the product being evaluated. This behavior rendered the synthetic responses essentially useless for product evaluation purposes.

This hedging behavior appears to stem from the constrained output space and the models' training to avoid conflict. The correlation coefficients were poor, and the reproduction factor was only 82% of the noise ceiling, which represents the theoretical maximum achievable given the inherent variability in human survey responses. The distribution matching was particularly problematic, with synthetic responses failing to capture the variance and shape of real consumer opinion distributions.

## The Solution: Semantic Similarity Response Mapping

The breakthrough innovation came from Ben Meyer, the first author on the research paper, who developed what they termed the Semantic Similarity Response (SSR) method. Rather than forcing the LLM to output a constrained numerical value, the approach allows the model to provide a natural text response. For example, instead of forcing a "3," the LLM might respond with something like "I'm somewhat interested. If it works well and it isn't too expensive, I might give it a try."

The key technical innovation lies in how these textual responses are mapped back to quantitative scales. The methodology involves creating embeddings of both the LLM's response and a set of reference responses that correspond to each point on the rating scale. These reference responses are pre-defined textual descriptions that clearly correspond to ratings like "not likely at all to buy" through to "definitely will purchase."

Once both the synthetic response and the reference responses are converted into embedding vectors, the system computes cosine similarity between the synthetic response vector and each reference response vector. This produces a distribution of similarities across all reference points, which becomes the response likelihood distribution. This approach leverages the semantic understanding already present in the pre-trained language models without requiring any fine-tuning or additional training.

## Technical Implementation Details

The implementation used GPT-4 and Gemini 2.0 Flash as the primary models, though the team experimented with various other LLMs. At the time the research was conducted, these represented frontier models, and they consistently produced the best results. Other models tested did not perform as well, suggesting that a certain level of model capability is necessary for this approach to work effectively.

The prompting strategy involves providing the LLM with demographic information about the synthetic consumer persona, formatted as something like "You are a middle-aged housewife from the Midwest" along with relevant demographic details such as income level. The model is then shown an image of the product concept along with accompanying text and asked how likely they would be to purchase it.

Remarkably, the team reported that prompt engineering required relatively minimal iteration, with only 8 to 10 iterations needed to arrive at effective prompts. This stands in stark contrast to some production LLM applications that may require hundreds or even thousands of prompt iterations. The reference prompts used for the similarity mapping are straightforward and don't appear to involve carefully fine-tuned language, suggesting the approach is relatively robust.

The system is implemented without any fine-tuning of the base models, using them in a vanilla state. This is particularly noteworthy because it means the ability to reproduce human consumer behavior patterns must come from the pre-training data and the models' general understanding of human preferences and decision-making.

## Evaluation Methodology and Results

The evaluation framework employed multiple metrics to assess the quality of synthetic consumer responses. The team measured success along two primary dimensions: overall distribution matching and per-item average purchase intent correlation.

For distribution matching, they used the Kolmogorov-Smirnov (KS) distance to measure similarity between the synthetic and real response distributions. This metric captures whether the synthetic consumers show the same spread and shape of opinions as real consumers.

For per-item correlation, they computed the mean purchase intent for each product from both real surveys and synthetic responses, then calculated the correlation coefficient. To account for the inherent noise in survey measurements, they also computed a noise ceiling by repeatedly resampling real survey cohorts and measuring the maximum achievable correlation given measurement variability. The primary metric reported is what percentage of this noise ceiling the synthetic approach achieves.

The results were remarkably strong. The SSR method achieved approximately 90% of the noise ceiling for both GPT-4 and Gemini 2.0 Flash. This represents a significant improvement over the naive numerical rating approach, which achieved only about 82% of the noise ceiling. The distribution matching also improved dramatically, with synthetic responses now showing variance across the full rating scale rather than clustering around the middle value.

## Demographic Reproduction and Validation

Perhaps the most compelling validation of the approach comes from its ability to reproduce demographic effects without explicit training on these patterns. The models accurately reproduced the relationship between income and purchase intent, showing that lower-income synthetic consumers are less likely to purchase premium personal care products, with willingness to pay increasing with income level. Not only was the directional relationship correct, but the shape of the curve closely matched real consumer data.

Even more striking was the reproduction of age effects, which showed a distinctive inverted U-shape pattern where purchase intent varies with age in a non-monotonic way. The fact that the models reproduced this relatively complex demographic pattern without any explicit training on consumer behavior strengthens the case that the approach is capturing genuine behavioral patterns rather than artifacts.

The models also showed appropriate variation in response to product novelty, with younger synthetic consumers being more willing to try unconventional product concepts like mango-flavored toothpaste, while older consumers showed more conservative preferences. These demographic effects emerged naturally from the models' understanding of human behavior encoded during pre-training.

## Advantages Over Traditional Surveys

Beyond simply matching real survey performance, the synthetic consumer approach demonstrated several advantages over traditional human surveys. One surprising finding was that LLM responses are actually more informative and detailed than typical human survey responses. While human participants often provide lazy or minimal text responses despite being compensated for their time, LLMs consistently generate thoughtful, detailed explanations of their preferences, providing richer qualitative feedback for product developers.

The approach also eliminates the positivity bias commonly observed in human surveys. Human participants tend to rate products more favorably in survey contexts than their actual purchase behavior would suggest, likely due to social desirability effects or a desire to please researchers. The LLMs showed more neutral, realistic assessments without this systematic bias.

Of course, the synthetic approach is also dramatically faster and cheaper than recruiting and surveying hundreds of real consumers, enabling rapid iteration on product concepts and the ability to test many more variations than would be practical with traditional methods.

## Production Deployment Considerations

PyMC Labs has moved this research into production deployment, with the code available on GitHub for validation and replication. They are expanding the methodology beyond product concept testing to advertisement evaluation, where users can upload ad creative and receive synthetic consumer responses.

An important consideration for production deployment is the risk of overfitting during prompt development. While there are relatively few hyperparameters in the approach, the reference prompts used for similarity mapping represent one area where iteration could potentially lead to overfitting to specific test cases. The team addressed this through holdout validation, ensuring that reported results come from products not used during prompt development. However, they note that given the straightforward nature of the prompts and minimal iteration required, overfitting risk appears to be relatively low even on in-sample data.

The methodology has been validated specifically on consumer products in the personal care market with primarily US consumers. Questions remain about generalization to other consumer populations and cultural contexts. While the models are trained on diverse international data and prompting for specific demographics could theoretically work for non-US populations, this hasn't been explicitly validated in the presented research.

For higher-risk domains beyond consumer product research, such as pharmaceutical or medical applications, significantly more validation and trust-building would be required. The evaluation framework approach remains applicable, but organizations would need much more extensive testing, potentially including statistical significance testing and careful consideration of risk tolerance thresholds before deploying synthetic data generation in high-stakes scenarios.

## Critical Assessment

While the results are impressive, it's important to maintain appropriate skepticism about claims of synthetic consumers perfectly replicating human behavior. The 90% noise ceiling achievement is excellent but still represents a 10% gap from the theoretical maximum. The approach has been validated on a specific domain (personal care products) with specific models (GPT-4 and Gemini 2.0 Flash) and may not generalize uniformly across all consumer categories or model types.

The mechanism by which pre-trained models learned to reproduce complex demographic patterns remains somewhat mysterious. While the hypothesis that models learn human-like reasoning from training data is plausible, the extent to which this represents genuine behavioral modeling versus sophisticated pattern matching from training data containing survey responses or market research is unclear.

The approach also inherits whatever biases exist in the training data of the foundation models. If certain demographic groups or preference patterns are underrepresented in training data, synthetic consumers might not accurately reflect those populations. Ongoing validation against real survey data for specific use cases remains important.

That said, the methodology represents a significant advancement in making LLMs useful for practical business applications in market research. The insight that allowing natural language responses and using semantic similarity for quantification unlocks much better performance is valuable and likely applicable to other domains where LLMs are used to simulate human judgment or preferences. The minimal prompt engineering required and the strong results from vanilla models without fine-tuning suggest the approach is relatively robust and accessible for practitioners.

## LLMOps Implications

From an LLMOps perspective, this case study demonstrates several important principles. First, it shows the value of allowing models to work in their natural modality (text generation) rather than forcing constrained outputs, then using post-processing (embedding similarity) to convert back to the required format. This pattern of letting models express themselves naturally and then mapping outputs may be applicable to many other production LLM scenarios.

Second, it illustrates the importance of robust evaluation frameworks that account for inherent variability and establish meaningful baselines like noise ceilings. The evaluation approach goes beyond simple accuracy metrics to consider whether the synthetic data reproduces the statistical properties and patterns of real data across multiple dimensions.

Third, the case study shows that significant value can be extracted from pre-trained models without fine-tuning, provided the right prompting strategy and post-processing approach are used. This has important implications for production systems where maintaining and updating fine-tuned models adds operational complexity.

Finally, the work exemplifies the importance of domain expertise in deploying LLMs effectively. The solution came from deeply understanding both the problem domain (consumer research and survey methodology) and the technical capabilities and limitations of LLMs, then engineering a creative solution that plays to the models' strengths while compensating for their weaknesses.