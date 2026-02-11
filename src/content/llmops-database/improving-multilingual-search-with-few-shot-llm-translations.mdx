---
title: "Improving Multilingual Search with Few-Shot LLM Translations"
slug: "improving-multilingual-search-with-few-shot-llm-translations"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694adcac042ce598d81c9f2f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:47.370Z"
  createdOn: "2025-12-23T18:17:16.654Z"
llmopsTags:
  - "translation"
  - "question-answering"
  - "few-shot"
  - "prompt-engineering"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "error-handling"
  - "a2a"
  - "elasticsearch"
  - "google-gcp"
industryTags: "e-commerce"
company: "Delivery Hero"
summary: "Delivery Hero operates across 68 countries and faced significant challenges with multilingual search due to dialectal variations, transliterations, spelling errors, and multiple languages within single markets. Traditional machine translation systems struggled with user intent and contextual nuances, leading to poor search results. The company implemented a solution using Large Language Models (LLMs), specifically Gemini, with few-shot learning to provide context-aware translations that handle regional dialects, correct spelling mistakes, and understand transliterations. By combining LLM-generated translations with Elastic Search and Vector Search in a hybrid approach, they achieved over 90% translation accuracy for restaurant queries and demonstrated positive improvements in user engagement through A/B testing, with the solution being rolled out to their Talabat and Hungerstation brands."
link: "https://tech.deliveryhero.com/blog/how-we-improved-multilingual-search-with-few-shot-llm-translations/"
year: 2024
seo:
  title: "Delivery Hero: Improving Multilingual Search with Few-Shot LLM Translations - ZenML LLMOps Database"
  description: "Delivery Hero operates across 68 countries and faced significant challenges with multilingual search due to dialectal variations, transliterations, spelling errors, and multiple languages within single markets. Traditional machine translation systems struggled with user intent and contextual nuances, leading to poor search results. The company implemented a solution using Large Language Models (LLMs), specifically Gemini, with few-shot learning to provide context-aware translations that handle regional dialects, correct spelling mistakes, and understand transliterations. By combining LLM-generated translations with Elastic Search and Vector Search in a hybrid approach, they achieved over 90% translation accuracy for restaurant queries and demonstrated positive improvements in user engagement through A/B testing, with the solution being rolled out to their Talabat and Hungerstation brands."
  canonical: "https://www.zenml.io/llmops-database/improving-multilingual-search-with-few-shot-llm-translations"
  ogTitle: "Delivery Hero: Improving Multilingual Search with Few-Shot LLM Translations - ZenML LLMOps Database"
  ogDescription: "Delivery Hero operates across 68 countries and faced significant challenges with multilingual search due to dialectal variations, transliterations, spelling errors, and multiple languages within single markets. Traditional machine translation systems struggled with user intent and contextual nuances, leading to poor search results. The company implemented a solution using Large Language Models (LLMs), specifically Gemini, with few-shot learning to provide context-aware translations that handle regional dialects, correct spelling mistakes, and understand transliterations. By combining LLM-generated translations with Elastic Search and Vector Search in a hybrid approach, they achieved over 90% translation accuracy for restaurant queries and demonstrated positive improvements in user engagement through A/B testing, with the solution being rolled out to their Talabat and Hungerstation brands."
---

## Overview

Delivery Hero, a global food and grocery delivery platform operating in over 68 countries across four continents, faced substantial challenges in providing effective multilingual search capabilities. Their search solution, served centrally from Berlin to all markets, needed to handle diverse languages including English, Spanish, Arabic, Turkish, Greek, Chinese, Thai, and many others. The company implemented a production LLM system using few-shot learning to improve translation quality for search queries, ultimately enhancing search relevance and user engagement across their global operations.

## Business Problem and Context

The multilingual nature of Delivery Hero's operations created several complex challenges that traditional machine translation systems struggled to address effectively. The company identified four primary categories of linguistic challenges that directly impacted search quality:

First, dialectal variations presented significant difficulties even within single languages. Arabic exemplified this challenge particularly well, where the same word could have completely different meanings across regions. The word "عيش" means bread in Egyptian Arabic but rice in Gulf Arabic, requiring the search system to understand regional context to deliver appropriate results. This was not merely an academic concern but a practical issue affecting user experience and search relevance.

Second, multiple languages within single countries added complexity. In Spain, for instance, users might search in either Spanish or Catalan, using different words for the same items. The word for "egg" is "huevo" in Spanish but "ou" in Catalan, and the search system needed to recognize these as equivalent concepts to serve relevant results regardless of the user's language choice.

Third, transliteration patterns complicated search, particularly in markets using non-Latin alphabets. Users would often write brand names or food items based on phonetic sounds rather than official spellings. Arabic speakers might search for McDonald's as "ماكدونالدز" (makdunaldiz) or use local abbreviations like "ماك" (mac), requiring the system to recognize multiple transliteration variants of the same entity.

Fourth, spelling mistakes and morphological variations (plural/singular forms) needed to be handled gracefully. A user typing "تودلز" (tudlz) instead of the correct "نودلز" (noodles) in Arabic should still receive relevant noodle-related results.

While traditional search engines and machine translation tools could handle basic translation tasks, they frequently failed to capture user intent, understand dialectal nuances, or correct errors within the specific domain of food delivery search.

## LLM Selection and Evaluation

Delivery Hero conducted a systematic evaluation of multiple LLM and translation options to determine the optimal solution for their use case. They compared four different systems: Google Translate, DeepL, ChatGPT-Turbo, and Gemini. The evaluation used 100 popular grocery-related search queries with correct translations validated by local Arabic-speaking people.

The results revealed meaningful differences in performance. ChatGPT-Turbo achieved the highest accuracy at 86%, demonstrating strong capability in capturing user intent and understanding context. However, cost considerations made it less attractive for production deployment at scale. Gemini achieved approximately 82% accuracy, representing a solid performance level with better cost-efficiency characteristics. Traditional commercial translation tools (Google Translate and DeepL) generally performed below 80% accuracy, struggling particularly with contextual understanding and domain-specific intent.

The evaluation revealed specific examples where LLM-based approaches outperformed traditional translation. For instance, with the Arabic word "لبن," traditional tools provided inconsistent translations (milk, yogurt), while LLMs better understood the contextual meaning. The company ultimately selected Gemini for production deployment based on its favorable balance of accuracy, cost, and performance characteristics.

## Few-Shot Learning Approach

Rather than pursuing fine-tuning approaches that would require large labeled datasets and significant computational resources, Delivery Hero implemented a few-shot learning strategy. This approach provided the LLM with a small number of example queries and translations to guide its behavior without requiring full model retraining.

The few-shot learning approach needed to handle multiple translation strategies simultaneously, including direct translation, transliteration, and regional dialect handling. The model also needed to correct spelling variations and disambiguate meanings based on context. This multi-faceted requirement made prompt engineering particularly critical to the solution's success.

A key challenge in implementing few-shot learning was determining the optimal number of examples to provide. The team discovered through experimentation that too many examples caused the model to hallucinate (generate irrelevant or inaccurate responses) while also unnecessarily increasing token counts and associated costs. By carefully curating a small set of edge cases covering transliterations and dialectal variations, they maintained translation quality while avoiding these issues.

## Prompt Engineering Process

The team invested significant effort in crafting effective prompts for the translation task. They recognized that LLMs are designed to generate creative responses, meaning that even small changes in prompt structure could lead to substantially different outputs. This required an iterative optimization process to develop prompts that reliably produced accurate, consistent translations.

For Arabic-to-English translation specifically, the team optimized several model parameters to ensure deterministic, high-confidence translations. Temperature was set to 0 to produce non-random, consistent responses. Top-k and top-p values were set to 1 and 0 respectively to narrow the model's choices to the most probable answers. Max output tokens were limited to 100 to avoid unnecessarily verbose or convoluted responses that would increase costs and processing time.

The prompt development process itself presented challenges. Initially, the team lacked sufficient labeled data for Arabic search queries. To address this, they leveraged ChatGPT to generate potential query examples that included standard dialects, misspellings, and transliterations related to food. This bootstrapping approach created a small but valuable dataset for testing and prompt refinement.

An interesting technique the team employed was using the LLM itself to improve prompt design. By prompting the model to clarify its understanding of the original instructions, they could iteratively refine the prompt structure. This meta-prompting approach helped them converge on more effective prompt formulations more quickly than manual trial and error alone.

The article indicates they developed a finalized Arabic-to-English translation prompt through this iterative process, though the specific prompt text is referenced but not fully detailed in the published article. This is a common pattern in production LLMOps where companies are reluctant to share complete prompt details that represent proprietary intellectual property.

## Production Reliability: Majority Voting

To address the inherent variability in LLM outputs, Delivery Hero implemented a majority voting system as a reliability mechanism. Given that LLMs can occasionally produce creative but unreliable responses, the system runs each query through the model three times and selects the most frequent response as the final translation.

This approach represents a practical production strategy for improving confidence in LLM outputs. While it triples the computational cost per query, it provides a mechanism to filter out outliers and anomalous responses that might occur due to the probabilistic nature of LLM generation. The majority voting approach assumes that accurate translations will be more consistent across multiple generation attempts, while hallucinations or errors will be less reproducible.

This technique represents a trade-off between cost and reliability that is characteristic of production LLMOps decisions. The team determined that the improved accuracy and reduced risk of serving incorrect translations to users justified the additional computational expense.

## Integration with Search Architecture

The LLM translation system was integrated into a broader hybrid search architecture that combines multiple retrieval mechanisms. Delivery Hero's search infrastructure continues to use Elastic Search (ES) as a core component while transitioning to a hybrid approach where results are retrieved from both ES and Vector Search databases, then combined.

In the Elastic Search implementation, the system enhances retrieval by considering both the original query and LLM-generated translations when available. This multi-faceted approach improves recall by capturing a wider range of relevant results. If a user searches using a dialectal variant or misspelling, the translated version helps retrieve items that might not match the original query text.

For the Vector Search component, LLM-generated translations play a different but complementary role. The team enriches their vector training data by adding LLM-generated translations, enabling the system to handle different spellings, local dialects, and synonyms more effectively. When vectors are properly fine-tuned with this enriched data, queries using regional variations or different phrasings can retrieve similar sets of relevant products. This helps ensure that semantically equivalent queries receive similar results despite surface-level differences in wording.

This integration pattern demonstrates mature LLMOps thinking, where LLM capabilities are leveraged as part of a larger system rather than as a complete replacement for existing infrastructure. The translations enhance both traditional keyword-based search (via Elastic Search) and semantic search (via Vector Search), creating multiple pathways for users to find relevant results.

## Evaluation and Results

The team translated the top 1,000 most popular queries from nine Arabic-speaking countries using their few-shot learning approach. These translations were then evaluated for accuracy by local users who could assess whether the translations captured the intended meaning and user intent.

The results showed over 90% accuracy for restaurant-related translations, representing a substantial improvement over the baseline performance of traditional translation tools. This accuracy level was deemed sufficient for production deployment given the business context and the cost-performance trade-offs involved.

Beyond offline accuracy metrics, the team conducted A/B testing at the search query level to measure the impact on actual user behavior and engagement. These tests revealed positive improvements in user engagement metrics, though specific quantitative details are not provided in the article. The positive A/B test results provided business justification for broader rollout of the translation system.

Based on these results, the LLM translation system was deployed to production for Delivery Hero's Talabat and Hungerstation brands, which operate in Arabic-speaking markets. This deployment represents the culmination of the LLMOps process, moving from experimentation and evaluation to serving real user traffic.

## LLMOps Considerations and Trade-offs

The case study illustrates several important LLMOps principles and trade-offs that are relevant beyond this specific use case. First, the selection of LLM provider involved explicit consideration of accuracy, cost, and performance characteristics. The decision to use Gemini over ChatGPT-Turbo, despite the latter's superior accuracy, demonstrates the importance of holistic evaluation criteria in production systems where cost and latency matter alongside pure accuracy.

Second, the choice of few-shot learning over fine-tuning represents a pragmatic approach to limited labeled data and resource constraints. While fine-tuning might have yielded even better performance, the few-shot approach achieved acceptable accuracy with significantly less data labeling effort and computational expense. This demonstrates that production LLMOps often involves finding "good enough" solutions rather than pursuing theoretical optimality.

Third, the iterative prompt engineering process highlights the craft and experimentation required to achieve reliable LLM behavior. There is no automated process described for prompt optimization; rather, it involved human judgment, testing with sample data, and progressive refinement. The use of the LLM itself to clarify prompt understanding represents an interesting meta-technique, but ultimately human expertise was required to guide the process.

Fourth, the majority voting reliability mechanism represents a production pattern for managing LLM variability. This approach increases costs but reduces risk, a trade-off that makes sense for a customer-facing search application where poor translations directly impact user experience and potentially business metrics.

Fifth, the integration with existing search infrastructure (Elastic Search and Vector Search) demonstrates architectural maturity. Rather than replacing existing systems wholesale, the LLM capabilities are integrated as enhancements to multiple components of the search stack. This incremental approach reduces risk and allows for gradual validation of the new capabilities.

Sixth, the evaluation approach combined offline accuracy metrics (validated by human reviewers) with online A/B testing of actual user engagement. This dual evaluation strategy is characteristic of mature production ML/LLM systems, where offline metrics provide development feedback but online metrics determine production readiness.

## Limitations and Balanced Assessment

While the article presents a success story, there are several aspects that warrant critical consideration. The article is written by the company implementing the solution and naturally emphasizes positive results. The lack of specific quantitative details about A/B test improvements (e.g., percentage increase in engagement metrics, click-through rates, conversion rates) makes it difficult to assess the magnitude of the business impact.

The 90% accuracy figure for restaurant translations is impressive but leaves 10% of queries with potentially incorrect translations. The article does not discuss strategies for handling edge cases where translations fail, monitoring for translation quality degradation over time, or user feedback mechanisms for reporting poor translations.

The majority voting approach, while improving reliability, does not eliminate the possibility of consistent errors. If the model consistently misinterprets a particular query pattern, running it three times will simply return the same incorrect result three times. The article does not discuss additional safeguards or monitoring for detecting systematic translation errors.

The cost implications of the approach are mentioned but not quantified. Running each query through an LLM three times represents significant API costs at scale, especially across millions of search queries daily in 68 countries. The business case presumably justifies these costs through improved engagement and conversion, but the economic analysis is not presented.

The article focuses specifically on Arabic language challenges and restaurant/grocery queries. The generalizability of the approach to other languages and domains is implied but not explicitly validated. Different languages may present different challenges (e.g., tonal languages like Chinese, agglutinative languages like Turkish) that would require different prompt engineering approaches.

Finally, the article does not discuss operational aspects such as latency impacts of LLM calls in the search path, fallback strategies when LLM APIs are unavailable, or monitoring and alerting infrastructure for detecting translation quality issues in production.

Despite these considerations, the case study represents a solid example of practical LLMOps implementation. The team made reasonable engineering decisions given their constraints, conducted appropriate evaluation, and achieved measurable improvements in their production search system. The few-shot learning approach with careful prompt engineering demonstrates that meaningful value can be extracted from LLMs without requiring extensive fine-tuning infrastructure, making this a relevant pattern for other organizations facing similar multilingual challenges.