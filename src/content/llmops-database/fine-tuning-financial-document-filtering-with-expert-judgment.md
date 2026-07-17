---
title: "Fine-Tuning Financial Document Filtering with Expert Judgment"
slug: "fine-tuning-financial-document-filtering-with-expert-judgment"
draft: false
llmopsTags:
  - "fraud-detection"
  - "document-processing"
  - "classification"
  - "fine-tuning"
  - "prompt-engineering"
  - "reinforcement-learning"
  - "few-shot"
  - "cost-optimization"
  - "human-in-the-loop"
  - "evals"
  - "pytorch"
  - "anthropic"
  - "openai"
  - "google-gcp"
industryTags: "finance"
company: "Bridgewater AIA Labs / Thinking Machines"
summary: "Bridgewater AIA Labs, in collaboration with Thinking Machines, developed a custom fine-tuned LLM to automate information triage tasks for investment professionals. The problem addressed was that frontier models performed poorly (around 50-78% accuracy) on financial document filtering tasks that required expert judgment, despite these tasks being trivial for experienced investors. By fine-tuning Qwen3-235B using high-quality annotations from expert investors and employing advanced training techniques including interleaved batching, CISPO loss with asymmetric clipping, and on-policy distillation, they achieved 84.7% accuracy—a 29.8% reduction in errors compared to the best frontier model tested. The custom model also proved 13.8x cheaper to run than frontier alternatives while exceeding their performance on six financial filtering tasks drawn from daily investor workflows."
link: "https://thinkingmachines.ai/news/learning-to-replicate-expert-judgment-in-financial-tasks/"
year: 2026
seo:
  title: "Bridgewater AIA Labs / Thinking Machines: Fine-Tuning Financial Document Filtering with Expert Judgment - ZenML LLMOps Database"
  description: "Bridgewater AIA Labs, in collaboration with Thinking Machines, developed a custom fine-tuned LLM to automate information triage tasks for investment professionals. The problem addressed was that frontier models performed poorly (around 50-78% accuracy) on financial document filtering tasks that required expert judgment, despite these tasks being trivial for experienced investors. By fine-tuning Qwen3-235B using high-quality annotations from expert investors and employing advanced training techniques including interleaved batching, CISPO loss with asymmetric clipping, and on-policy distillation, they achieved 84.7% accuracy—a 29.8% reduction in errors compared to the best frontier model tested. The custom model also proved 13.8x cheaper to run than frontier alternatives while exceeding their performance on six financial filtering tasks drawn from daily investor workflows."
  canonical: "https://www.zenml.io/llmops-database/fine-tuning-financial-document-filtering-with-expert-judgment"
  ogTitle: "Bridgewater AIA Labs / Thinking Machines: Fine-Tuning Financial Document Filtering with Expert Judgment - ZenML LLMOps Database"
  ogDescription: "Bridgewater AIA Labs, in collaboration with Thinking Machines, developed a custom fine-tuned LLM to automate information triage tasks for investment professionals. The problem addressed was that frontier models performed poorly (around 50-78% accuracy) on financial document filtering tasks that required expert judgment, despite these tasks being trivial for experienced investors. By fine-tuning Qwen3-235B using high-quality annotations from expert investors and employing advanced training techniques including interleaved batching, CISPO loss with asymmetric clipping, and on-policy distillation, they achieved 84.7% accuracy—a 29.8% reduction in errors compared to the best frontier model tested. The custom model also proved 13.8x cheaper to run than frontier alternatives while exceeding their performance on six financial filtering tasks drawn from daily investor workflows."
notion:
  pageId: "38ff8dff-2538-8056-b7c0-c71a360f322c"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-30T20:26:00.000Z"
  lastEditedTime: "2026-06-30T20:26:00.000Z"
  publishedAt: "2026-07-01T19:41:27Z"
---

## Overview

Bridgewater AIA Labs collaborated with Thinking Machines to address a critical production challenge: automating information triage for investment professionals who must filter through massive volumes of financial documents daily. The case study demonstrates how custom fine-tuned models can outperform frontier models on domain-specific tasks requiring expert judgment, offering valuable insights into when and how organizations should invest in custom model development for production use cases.

The core business problem centered on the fact that investors spend substantial time making small, repeated judgments about financial information—filtering news articles, research reports, company documents, and other materials to identify what's actually relevant and interesting. While reading itself is straightforward, the real value lies in the judgment exercised over this information. These judgment calls are difficult to articulate explicitly and come from experience, making them challenging to teach to AI systems through prompting alone.

## Initial Approach and Frontier Model Performance

The team began by evaluating frontier models on six specific financial filtering tasks drawn directly from investor workflows. These tasks included classifying financial article relevancy for C-suite professionals, determining whether central bank documents signal interest rate changes, matching research documents to investor questions, identifying ad hoc versus recurring content in research documents, and truncating boilerplate content from documents and emails. The team measured both accuracy and F1 scores for classification tasks.

Initial results with naive prompts were remarkably poor—frontier models including variants of Gemini, Claude, and GPT averaged only approximately 50% accuracy, essentially performing at coin-flip levels. This finding is particularly significant for LLMOps practitioners, as it demonstrates that even state-of-the-art models can struggle dramatically on domain-specific tasks that seem straightforward to domain experts.

The team invested considerable effort in prompt engineering, having domain experts write detailed instructions based on real task descriptions and reframing certain tasks to better align with how investors think. For example, rather than asking models to classify articles as simply "relevant" or "not relevant," they introduced a three-label system: relevant and interesting, relevant but uninteresting, and irrelevant. This distinction captures the nuance that while something might be technically financial (like a small IPO), it may lack the macroeconomic significance that matters to Bridgewater's investment approach.

These prompt engineering efforts improved accuracy from the mid-50s to the mid-70s. The team also tried automatic prompt optimization methods but saw no further gains. Even with their best prompts, frontier models plateaued below 80% accuracy—the threshold that investors required to trust a system in their daily workflow. Additionally, the team observed that newer model versions weren't delivering substantial improvements in accuracy, especially when considering cost. For instance, GPT 5.4 cost 43% more than GPT 5.2 but delivered only marginal accuracy gains, highlighting important cost-performance tradeoffs in production deployments.

## Training Data Strategy and Quality

Recognizing that explicit prompting couldn't capture the tacit knowledge and intuition that experts struggle to articulate, the team pivoted to fine-tuning. A critical insight emerged around training data quality: the team initially sourced labels from vendors providing non-expert labeling, but models trained on this dataset continued to perform poorly. After examining model reasoning traces, they discovered that many labels in the dataset were simply incorrect.

To address this while managing the cost of expert labeling, they devised an innovative verification scheme. They trained a model on the non-expert dataset, then evaluated it on the same data. Examples where the model's predictions differed from the original labels were flagged and routed to expert investors for reevaluation. The logic was elegant: if a model can't match an example from its own training set, either the example is genuinely difficult or the original label was wrong. This approach allowed them to efficiently focus expensive expert review on contested examples rather than relabeling everything from scratch. The final evaluation was conducted on a held-out test set to ensure valid performance assessment.

This data quality approach offers valuable lessons for LLMOps practitioners: domain-specific tasks often require domain-expert labeling, but hybrid approaches that combine cheaper labeling with strategic expert verification can provide a cost-effective middle ground. The case study demonstrates that data quality can be a make-or-break factor in fine-tuning success.

## Training Infrastructure and Technical Approach

For model training infrastructure, the team used Tinker from Thinking Machines Lab, which allowed rapid iteration without managing GPU infrastructure directly. They selected Qwen3-235B as their base model, citing its well-studied fine-tuning performance in academic literature. Starting with a 235B parameter model reflects an important decision point in LLMOps: while smaller models offer faster inference, this task apparently demanded the capacity of a large model to capture the nuanced judgments required.

The initial training approach used Group Relative Policy Optimization (GRPO) with importance-sampling loss as a critic-free starting point. This baseline immediately delivered substantial improvements, jumping from 44.8% to 73.48% average accuracy—demonstrating the power of fine-tuning even with standard methods. However, this still fell short of the 80% threshold, prompting further optimization.

## Advanced Training Recipe

The team developed three key modifications to push performance beyond the baseline, each addressing specific challenges in multi-task reinforcement learning:

**Interleaved Batching for Multi-Task Training**: The team compared three batching strategies for their multi-task scenario: sequential task training (one task at a time), fully mixed batches (all tasks randomly mixed), and interleaved batching (one batch per task in round-robin order). Interleaved batching proved most effective, improving accuracy by 12.1% over fully mixed batches. This finding is particularly relevant for LLMOps practitioners building multi-task systems, as batching strategy is often overlooked but can have substantial performance impacts. The interleaved approach likely helps the model maintain task-specific learning signals while still benefiting from multi-task training.

**CISPO Loss with Asymmetric Clipping**: The team replaced standard importance-sampling loss with Clipped Importance Sampling Policy Optimization (CISPO) using asymmetric clipping parameters. Among the various loss functions and clipping schemes tested, this combination performed best, improving accuracy by 10.1% over the importance-sampling baseline. While the case study doesn't detail the specific clipping parameters used, this highlights how algorithmic choices in reinforcement learning can significantly impact production model performance.

**On-Policy Distillation with Progressive Teachers**: Perhaps the most sophisticated component of their approach was on-policy distillation (OPD), where the advantage calculation incorporates a penalty when the student model drifts from a teacher model's distribution. The team constructed the reward as: reward minus beta times the average difference between student and teacher log probabilities, then computed advantages relative to the mean reward. Importantly, they implemented a progressive teaching strategy: every 20 training steps, they promoted the current checkpoint to become the new teacher, but only if validation accuracy had reached a new high. This ensured they never distilled toward a weaker model. This approach provided a further 3.1% gain over using a frozen base-model teacher.

The on-policy distillation approach is particularly interesting from an LLMOps perspective as it combines ideas from reinforcement learning and knowledge distillation, using the model's own improving versions as teachers. This self-bootstrapping approach helps regularize the policy while it learns the task, preventing catastrophic forgetting or distribution drift—common challenges in production fine-tuning.

## Results and Production Performance

The final trained model achieved 84.7% average accuracy across the six tasks, compared to 78.2% for the best frontier model (GPT 5.5). While a 6.5 percentage point improvement might seem modest, it represents a 29.8% reduction in error rate—a substantial improvement for a production system. More importantly, this accuracy crossed the 80% threshold that investors required to trust the system in their daily workflow, representing the difference between a model that can't be deployed and one that provides genuine business value.

Beyond accuracy, the custom model delivered dramatic cost advantages due to its smaller size compared to frontier models. The team reported a 13.8x reduction in inference costs per task. Given that they plan to scale AI across the organization and rely on multiple specialized models for different tasks, this cost efficiency is crucial for sustainable production deployment. The case study notes that as of 2026, cost remains an important consideration for scaling AI systems organizationally—a reminder that raw performance isn't the only production metric that matters.

The team provided ablation studies showing how each component contributed to final performance. Removing interleaved batching dropped accuracy by 12.5 percentage points, removing CISPO dropped it by 10.1 points, and removing the best-validation-accuracy teacher selection dropped it by 3.1 points. These ablations validate the incremental value of each technique and provide guidance for practitioners considering which optimizations to prioritize.

## LLMOps Lessons and Considerations

This case study offers several important insights for LLMOps practitioners. First, it demonstrates clear conditions under which custom fine-tuning can outperform frontier models: domain-specific tasks requiring expert judgment that's difficult to articulate in prompts, where high-quality labeled data can be obtained, and where the performance gap justifies the training investment. The team's results suggest this pattern holds beyond the six tasks discussed, implying broader applicability.

Second, the case study illustrates the importance of systematic evaluation in production contexts. The team defined clear accuracy thresholds based on user trust requirements (80% in this case) and measured performance against both frontier baselines and their own ablations. This evaluation rigor is essential for making informed build-versus-buy decisions in production environments.

Third, the emphasis on training data quality—and the hybrid approach to obtaining it—provides a practical template for organizations facing similar challenges. The insight that models trained on non-expert labels perform poorly, combined with the verification scheme to efficiently leverage expert knowledge, addresses a common LLMOps challenge: how to obtain high-quality training data at reasonable cost.

Fourth, the use of specialized training infrastructure (Tinker) that abstracts away GPU management details enabled rapid experimentation. The team explicitly notes that Tinker's accessibility allowed them to run fast experiments and refine their approach through multiple iterations. This highlights how training infrastructure choices impact iteration speed and, ultimately, the quality of production models.

## Critical Perspective and Limitations

While the case study presents impressive results, several considerations warrant attention. The evaluation is conducted on six tasks using data "cleared for public release," which suggests the full production deployment involves additional tasks and data that remain proprietary. The generalizability of these specific results to other financial tasks or organizations remains unclear.

The case study comes from Bridgewater AIA Labs in collaboration with Thinking Machines, with Thinking Machines providing the training infrastructure (Tinker). This creates potential conflicts of interest in how results are presented, particularly regarding infrastructure capabilities and ease of use. Independent practitioners should validate whether similar results can be achieved with other training platforms.

The comparison focuses on frontier models as of early-to-mid 2026 (models released between February and May 2026). The frontier model landscape evolves rapidly, and it's possible that subsequent models or better prompting approaches might narrow or eliminate the performance gap. The case study's observation that newer models aren't improving rapidly at these tasks is based on a relatively short window (February to May 2026).

Cost comparisons are presented as 13.8x cheaper per task, but this doesn't account for the upfront costs of fine-tuning, including data labeling, expert time, compute for training, and infrastructure. For organizations without existing expert labeling or training infrastructure, the total cost equation might differ substantially.

The 84.7% accuracy, while exceeding the 80% trust threshold, still represents approximately 15% error rate. For high-stakes financial decisions, this error rate may require human oversight, potentially limiting the automation benefits. The case study doesn't discuss error analysis, failure modes, or how the system handles uncertain cases in production.

## Broader Implications

The case study concludes by articulating a vision of "differentiated intelligence"—a future where custom models tuned to specific organizational needs outperform general-purpose frontier models. This vision has significant implications for LLMOps strategy. If organizations can reliably fine-tune models to exceed frontier performance on their specific tasks while dramatically reducing costs, this shifts the strategic calculus from "how do we best use frontier models" to "which tasks justify custom development."

The timing is notable: published in June 2026, this represents a relatively mature perspective on the fine-tuning versus frontier model question. The results suggest that by mid-2026, the tools and techniques for custom model development have advanced to the point where organizations with domain expertise and quality data can achieve superior results for specialized tasks.

For LLMOps practitioners, this case study provides a roadmap: start with frontier models and invest in prompt engineering, establish clear performance thresholds based on user requirements, evaluate whether frontier models meet those thresholds, and if not, consider fine-tuning with careful attention to data quality, training infrastructure, and algorithmic choices. The systematic progression from naive prompts through expert prompting to fine-tuning, with clear metrics at each stage, exemplifies best practices in production LLM development.

The emphasis on multi-task learning also reflects production realities: organizations rarely have just one AI task to solve. The interleaved batching approach and the team's note that they have "many others internally that show similar patterns" suggest they're building toward a more comprehensive AI-augmented workflow rather than solving isolated problems.

Overall, this case study represents a sophisticated example of LLMOps in practice for a major financial institution, demonstrating how organizations can move beyond generic frontier models to develop specialized capabilities that provide competitive advantage through superior performance and economics.
