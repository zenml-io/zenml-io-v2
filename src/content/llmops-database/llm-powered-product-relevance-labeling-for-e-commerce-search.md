---
title: "LLM-Powered Product Relevance Labeling for E-commerce Search"
slug: "llm-powered-product-relevance-labeling-for-e-commerce-search"
draft: false
llmopsTags:
  - "classification"
  - "question-answering"
  - "fine-tuning"
  - "prompt-engineering"
  - "reinforcement-learning"
  - "instruction-tuning"
  - "knowledge-distillation"
industryTags: "e-commerce"
company: "Flipkart"
summary: "Flipkart replaced a manual, human-driven product relevance labeling process with an LLM-based system called Product Analyser (PA) to address bottlenecks in their search quality evaluation pipeline. The manual process was slow, expensive, and produced inconsistent judgments across annotators, limiting their ability to generate the high-quality training data needed for semantic retrievers and ranking models. The solution employed a two-stage training approach: first, supervised fine-tuning (SFT) to teach the model what good relevance judgments look like using millions of query-product pairs with reasoning traces, then Grouped Relative Policy Optimization (GRPO) to align the model's reasoning process for consistency and reliability. The system achieved human-level performance with +2.3% improvement on 3-level accuracy and +2.9% on binary accuracy over human annotators, while operating at a fraction of the cost and enabling continuous, scalable evaluation of millions of query-product pairs that was previously rate-limited by human bandwidth."
link: "https://blog.flipkart.tech/llms-for-relevance-automating-high-quality-product-relevance-labeling-in-flipkart-search-ddd5ca50b584"
year: 2026
seo:
  title: "Flipkart: LLM-Powered Product Relevance Labeling for E-commerce Search - ZenML LLMOps Database"
  description: "Flipkart replaced a manual, human-driven product relevance labeling process with an LLM-based system called Product Analyser (PA) to address bottlenecks in their search quality evaluation pipeline. The manual process was slow, expensive, and produced inconsistent judgments across annotators, limiting their ability to generate the high-quality training data needed for semantic retrievers and ranking models. The solution employed a two-stage training approach: first, supervised fine-tuning (SFT) to teach the model what good relevance judgments look like using millions of query-product pairs with reasoning traces, then Grouped Relative Policy Optimization (GRPO) to align the model's reasoning process for consistency and reliability. The system achieved human-level performance with +2.3% improvement on 3-level accuracy and +2.9% on binary accuracy over human annotators, while operating at a fraction of the cost and enabling continuous, scalable evaluation of millions of query-product pairs that was previously rate-limited by human bandwidth."
  canonical: "https://www.zenml.io/llmops-database/llm-powered-product-relevance-labeling-for-e-commerce-search"
  ogTitle: "Flipkart: LLM-Powered Product Relevance Labeling for E-commerce Search - ZenML LLMOps Database"
  ogDescription: "Flipkart replaced a manual, human-driven product relevance labeling process with an LLM-based system called Product Analyser (PA) to address bottlenecks in their search quality evaluation pipeline. The manual process was slow, expensive, and produced inconsistent judgments across annotators, limiting their ability to generate the high-quality training data needed for semantic retrievers and ranking models. The solution employed a two-stage training approach: first, supervised fine-tuning (SFT) to teach the model what good relevance judgments look like using millions of query-product pairs with reasoning traces, then Grouped Relative Policy Optimization (GRPO) to align the model's reasoning process for consistency and reliability. The system achieved human-level performance with +2.3% improvement on 3-level accuracy and +2.9% on binary accuracy over human annotators, while operating at a fraction of the cost and enabling continuous, scalable evaluation of millions of query-product pairs that was previously rate-limited by human bandwidth."
notion:
  pageId: "3b8f8dff-2538-80ed-afdb-c4e1842105a7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T09:45:00.000Z"
  lastEditedTime: "2026-08-10T09:45:00.000Z"
  publishedAt: "2026-08-10T12:23:13Z"
---

## Overview

Flipkart's Product Analyser case study represents a sophisticated production deployment of LLMs to solve a critical search infrastructure problem: generating high-quality relevance labels for query-product pairs at scale. This is fundamentally an LLMOps story about replacing human judgment with an automated system that had to match human-level quality while dramatically improving throughput, consistency, and cost-effectiveness.

The core business problem was query-to-product (Q<>P) relevance labeling, which serves as the foundation for training semantic retrievers and ranking models that power Flipkart's search experience. Every product shown in search results is there because systems judged it relevant, and those judgments depend on training data that tells the models what "good" looks like. For years, human annotators performed this labeling, creating three production bottlenecks: limited bandwidth and high cost that prevented scaling to needed volumes, inconsistent judgments across annotators that introduced noise into training data, and coarse binary or tertiary labels that provided no diagnostic information about why a product was relevant or not.

The inconsistency problem was particularly acute. Two annotators looking at a query like "Wakefit metal bed" paired with a "wooden bed frame, Wakefit collection" might disagree—one focusing on the brand match (relevant), another on the material mismatch (partially relevant). Both judgments are defensible, but this subjectivity multiplied across millions of pairs creates a noisy foundation that weakens downstream models. Because high-quality labels were scarce and expensive, teams were forced to fall back on heuristic or semi-supervised data sources that were less reliable and slow to adapt to new product domains.

## Production Architecture and Training Pipeline

The Product Analyser system was built on Flipkart's in-house foundational LLM, chosen because it already had domain knowledge of e-commerce query-product relationships. The training approach comprised two distinct stages that represent sophisticated LLMOps practices for aligning models to subjective, expert-level tasks.

**Stage I: Supervised Fine-Tuning for Reasoning Capability**

The first stage focused on building a large, trustworthy dataset and teaching the model to think step-by-step before producing labels. Flipkart started with their highest-quality data: query-product pairs each labeled independently by three human annotators with majority vote taken as the gold standard. Critically, they structured each training example as an instruction with not just the final label (Relevant, Partially Relevant, or Irrelevant), but also the reasoning trace that led to it.

The reasoning component is key to the production system's value. An example worked solution might look like: Query "Wakefit metal bed" paired with "Wakefit metal queen bed frame, black" produces reasoning "Brand/collection match: Yes (Wakefit). Product type match: Yes (bed). Material match: Yes (metal)" followed by the label "Relevant." This chain-of-thought approach makes the model's decisions interpretable and debuggable in production—a significant advantage over black-box labeling.

A particularly clever LLMOps technique was their approach to scaling the reasoning dataset. Rather than having humans manually write reasoning for every example (expensive and slow), they used the LLM itself to generate candidate reasoning traces, then kept only those that demonstrably led to the correct gold label. For a given query-product pair, the model might generate multiple reasoning paths—some leading to the right answer, some to wrong answers. They filtered to keep only the reasoning that matched the gold label, creating a self-correcting feedback loop. For instance, with "Wakefit metal bed" vs. "Wakefit wooden bed," the model might generate reasoning R1: "Wakefit matches, bed matches → Relevant" and R2: "Wakefit matches, bed matches, but material is wood not metal → Partially Relevant." If the gold label says Partially Relevant, they keep R2 and discard R1, teaching the model that material differences matter.

Another critical production-oriented decision was balanced sampling across relevance categories. Real search data is heavily skewed toward relevant products (those ranked highest), so random sampling would produce a dataset where the model rarely sees what "Irrelevant" looks like. Instead, for each query they deliberately pulled at least one product from each relevance bucket where possible. For "Wakefit metal bed" they'd include the perfect match ("Wakefit metal bed frame"—Relevant), a near-miss ("Wakefit wooden bed"—Partially Relevant), and a clear mismatch ("metal bedside lamp"—Irrelevant). This balanced diet of examples proved crucial for the model's later ability to reject bad matches—a production requirement where high precision is needed.

Through this generate-filter-drop workflow, Flipkart scaled the dataset from thousands to millions of examples, ensuring the model would generalize to unseen queries in production.

**Stage II: GRPO Alignment for Robust Reasoning**

After Stage I, the model could usually produce correct labels with plausible explanations, but supervised fine-tuning alone tends to produce brittle reasoning that falls apart on ambiguous or unusual inputs. Stage II used Grouped Relative Policy Optimization (GRPO), a reinforcement learning technique, to make the reasoning robust and consistent—critical for a production system that must handle the long tail of real user queries.

GRPO's key innovation for LLMOps is that it doesn't require training and maintaining a separate critic model, which would add complexity and latency to the production pipeline. Instead, for each query the model generates a group of answers, scores them, and judges each answer relative to its own group's average. Answers that score above the group average are reinforced; those below are discouraged. The group itself becomes the yardstick. For example, for "Wakefit metal bed" the model produces five answers for the same product. Three correctly reason about brand + type + material and land on the right label; two cut corners and get it wrong. The three good ones score above the group average, so the model is steered toward that thorough reasoning style without hand-labeling which was "best."

The scoring function for GRPO combined three components to reward not just correct answers but correct reasoning processes:

- **Label Accuracy Reward**: Did the model produce the correct relevance label (Relevant/Partially Relevant/Irrelevant)?
- **Reasoning Reward**: Was the reasoning trace logical, complete, and consistent? This came from a separately trained Reasoning Reward Model.
- **KL Divergence Penalty**: A regularization term that gently discouraged the model from drifting too far from its Stage I behavior, maintaining stability during alignment.

The Reasoning Reward Model itself (an ~8 billion parameter model) represents a sophisticated production component. It was trained to prefer good explanations over weak ones by studying pairs of answers. When two candidate answers had different labels, the one with the correct label was obviously preferred. More interestingly, when both labels were correct, they used a larger open-source teacher model (~32 billion parameters) to judge which explanation was more logical, complete, and consistent, using that judgment to form preferred/rejected pairs. For instance, if two answers both correctly label "Wakefit wooden bed" as Partially Relevant, but one says only "not a perfect match" while the other says "Brand matches and it is a bed, but the user asked for metal and this is wood—so partial," the Reasoning Reward Model learns to score the more detailed explanation higher. This pushes the production model toward generating answers that are both correct and well-reasoned, which is essential for the system's interpretability and trustworthiness in production use.

## Production Performance and Validation

The production validation approach demonstrates mature LLMOps practices. Flipkart evaluated the Product Analyser against their gold evaluation set (query-product pairs with three-annotator consensus labels) and achieved +2.3% improvement on 3-level accuracy and +2.9% on binary accuracy over the human annotator benchmark. The model also showed +12% improvement over best-in-class proprietary LLMs used off-the-shelf, at only 30% of the cost. Importantly, the model achieved high rejection recall—reliably catching ambiguous, low-confidence products that shouldn't be shown for a query, the direct payoff from balanced sampling during training.

A particularly strong production validation was recreating the manual NDCG (Normalized Discounted Cumulative Gain) ranking-quality report that search teams actually use to make business decisions. They ran the automated system across 22 weeks of data comprising millions of query-product pairs and found the automated report differed from the manual one by less than 1%. This level of agreement means teams can trust the automated metrics to make the same decisions they made before, but now continuously and at full scale rather than in expensive, slow batches.

## Production Impact and Operational Value

Beyond model accuracy metrics, the LLMOps value of this system comes from several operational improvements:

**Throughput and Latency**: Relevance evaluation transformed from a bottleneck rate-limited by annotator bandwidth and measured in weeks to an on-demand capability scaling to millions of pairs. Search teams can now evaluate experiments far faster and iterate more quickly on model improvements.

**Cost Structure**: The per-pair human cost is removed for bulk labeling, dramatically reducing operational expenses while freeing expert annotators to focus on genuinely hard frontier cases and guideline development rather than routine labeling.

**Data Quality**: Consistent, low-noise labels mean semantic retrievers and ranking models train on stronger signals. This quality improvement compounds into better search experiences for end users. Teams are no longer forced to lean on less-reliable heuristic or semi-supervised data and can generate high-fidelity labels at the volumes modern models need.

**Observability and Debugging**: Because every judgment comes with a reasoning trace, teams can now diagnose why a result was off—whether it's a catalog data gap, a retrieval miss, or a model limitation—and fix root causes. For example, if the model flags many results for "Wakefit metal bed" as Partially Relevant, each noting "material mismatch: wood vs. metal," that pattern immediately tells the catalog team the material attribute is unreliable for this category—a concrete, actionable fix. Coarse human labels never offered this level of diagnostic information.

**System Reusability**: This is deployed as a long-term production asset, not a one-off experiment, and extends naturally to new product areas like hyperlocal and conversational search.

## Production Challenges and Future Roadmap

The case study acknowledges current production limitations and outlines concrete next steps. The current ~8 billion parameter model is well-suited for offline batch labeling but too slow for real-time serving contexts (>100ms latency). The team plans to explore distilling the model into smaller 0.5-1 billion parameter variants and using advanced inference optimization techniques to cut latency for potential online use cases.

They also plan to add multimodality, incorporating product images alongside text since images carry significant relevance signals. Additionally, they want to strengthen the model's few-shot learning capabilities so it can adapt quickly to new domains (jobs, news) and unfamiliar guideline sets without requiring full retraining—building toward a truly versatile relevance engine.

## Critical LLMOps Assessment

While the results are impressive, it's worth noting that this case study comes from Flipkart's own engineering blog and naturally presents their system in a favorable light. The claimed performance improvements (+2.3%/+2.9% over human baseline) are meaningful but relatively modest in absolute terms, suggesting the human baseline was already quite strong. The real production value appears to be in throughput, consistency, and cost rather than raw accuracy gains.

The comparison claiming +12% improvement over proprietary LLMs at 30% cost is presented without details about which specific models were tested, how they were prompted, or whether they received any domain-specific tuning. This makes it difficult to assess the fairness of that comparison—off-the-shelf general-purpose models would naturally underperform a domain-specialized, fine-tuned model.

The GRPO training approach is technically sophisticated and well-suited to this problem, but the case study doesn't discuss training costs, iteration time, or how much expert effort went into designing the reward structure and reasoning reward model. These are real LLMOps costs that would factor into a complete ROI calculation.

The validation showing <1% difference from manual NDCG reports over 22 weeks is strong evidence of production reliability, though it's worth noting this measures consistency with human judgments rather than ground-truth quality—if the human judgments themselves were systematically biased or missed important relevance dimensions, the automated system would perpetuate those limitations.

Overall, this represents a mature, well-executed LLMOps deployment that solved real production constraints around data quality, throughput, and cost for a mission-critical search infrastructure component. The two-stage training methodology, balanced sampling strategy, reasoning-based approach, and production validation practices offer valuable patterns for other organizations tackling similar subjective expert-judgment tasks at scale. The system's interpretability through reasoning traces is particularly valuable for production operations, enabling debugging and continuous improvement in ways that black-box labeling systems cannot provide.
