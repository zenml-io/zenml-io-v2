---
title: "Automating Merchant Onboarding with Reinforcement Learning"
slug: "automating-merchant-onboarding-with-reinforcement-learning"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69958964c48a9656dd3b2031"
  exportedAt: "2026-02-23T10:04:49.317Z"
  source: "live"
  lastPublished: "2026-02-19T10:00:02.226Z"
  lastUpdated: "2026-02-18T09:49:20.917Z"
  createdOn: "2026-02-18T09:41:56.649Z"
llmopsTags:
  - "document-processing"
  - "structured-output"
  - "data-cleaning"
  - "high-stakes-application"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "agent-based"
  - "few-shot"
  - "evals"
  - "monitoring"
  - "cicd"
  - "continuous-deployment"
  - "fastapi"
  - "documentation"
industryTags: "e-commerce"
company: "Doordash"
summary: "DoorDash faced challenges with menu accuracy during merchant onboarding, where their existing AI system struggled with diverse and messy real-world menu formats. Working with Applied Compute, they developed an automated grading system calibrated to internal expert standards, then used reinforcement learning to train a menu error correction model against this grader as a reward function. The solution achieved a 30% relative reduction in low-quality menus and was rolled out to all USA menu traffic, demonstrating how institutional knowledge can be encoded into automated training signals for production LLM systems."
link: "https://appliedcompute.com/case-studies/doordash-menu-creation"
year: 2026
seo:
  title: "Doordash: Automating Merchant Onboarding with Reinforcement Learning - ZenML LLMOps Database"
  description: "DoorDash faced challenges with menu accuracy during merchant onboarding, where their existing AI system struggled with diverse and messy real-world menu formats. Working with Applied Compute, they developed an automated grading system calibrated to internal expert standards, then used reinforcement learning to train a menu error correction model against this grader as a reward function. The solution achieved a 30% relative reduction in low-quality menus and was rolled out to all USA menu traffic, demonstrating how institutional knowledge can be encoded into automated training signals for production LLM systems."
  canonical: "https://www.zenml.io/llmops-database/automating-merchant-onboarding-with-reinforcement-learning"
  ogTitle: "Doordash: Automating Merchant Onboarding with Reinforcement Learning - ZenML LLMOps Database"
  ogDescription: "DoorDash faced challenges with menu accuracy during merchant onboarding, where their existing AI system struggled with diverse and messy real-world menu formats. Working with Applied Compute, they developed an automated grading system calibrated to internal expert standards, then used reinforcement learning to train a menu error correction model against this grader as a reward function. The solution achieved a 30% relative reduction in low-quality menus and was rolled out to all USA menu traffic, demonstrating how institutional knowledge can be encoded into automated training signals for production LLM systems."
---

## Overview

DoorDash, a leading food delivery platform, partnered with Applied Compute to enhance their AI-powered merchant onboarding process. The case study focuses on improving menu generation accuracy—a critical business function that impacts order fulfillment, restaurant operations, and customer satisfaction. The project is particularly interesting from an LLMOps perspective because it demonstrates a sophisticated approach to encoding domain expertise into production AI systems through reinforcement learning, moving beyond simple prompt engineering or fine-tuning approaches.

The work was conducted by a cross-functional team including George Ignatius (DoorDash ML Engineer), Ying Yang (DoorDash Head of Merchant ML), and Applied Compute's team, who worked onsite at DoorDash's Sunnyvale office. This case represents a mature LLMOps deployment that went from initial development through rigorous validation to full production rollout across all USA traffic. The case study is presented by Applied Compute, which naturally positions their tooling favorably, so readers should consider this promotional context when evaluating claims about tooling effectiveness.

## The Business Problem and Technical Challenge

DoorDash's merchant onboarding system needed to convert diverse menu inputs—photos, PDFs, and text documents—into structured digital listings that enable restaurants to start receiving orders within a single day. The existing AI automation handled the majority of menus adequately, but faced significant challenges with what the team describes as "a long tail of messy menus with hard-to-summarize styles." Despite having internal human experts available for quality control, the team found that incremental improvement efforts were yielding diminishing returns.

The core technical insight that shaped the solution approach was recognizing an asymmetry in task difficulty: while creating a unified standard operating procedure for menu generation proved extremely difficult (with even human experts disagreeing on optimal outputs), verification and grading of menu outputs against ground truth was much more tractable and achieved higher inter-rater agreement among experts. This observation led to reframing the problem from "how do we build better generation rules" to "how do we build an automated grader that captures expert judgment, then train a model against it."

## The Grader-First Approach

The centerpiece of the technical approach was developing what they call an "automated grader"—essentially a sophisticated evaluation system that could assess menu quality in ways that aligned with human expert judgment. This grader became the foundation for the entire reinforcement learning training process, serving as the reward function that shaped model behavior.

The importance of grader quality in reinforcement learning cannot be overstated, and the team explicitly acknowledges two critical properties their grader needed to exhibit:

- **Alignment with ground truth**: The grader needed to score outputs consistently with how human experts would evaluate them, ensuring that optimizing against the grader actually moved toward the desired outcomes rather than exploiting arbitrary scoring quirks.
- **Self-consistency**: The grader needed to provide stable, reproducible scores to avoid introducing noise into the training process that would reduce training efficiency and potentially lead to unstable model behavior.

DoorDash's existing quality assurance infrastructure—including established QA processes, documented requirements, and trained human reviewers—provided crucial starting materials for grader development. The human experts' judgment, particularly around edge cases and judgment-heavy scenarios, needed to be encoded into the automated system. According to George Ignatius, the resulting grader "encoded the same rules our reviewers use, including the judgment-heavy edge cases," providing what they characterize as a reliable foundation for the reward function.

Applied Compute's tooling stack supported this grader development process through several capabilities mentioned in the case study: experiment tracking (to manage iterations on grader design), automated failure detection (to identify cases where the grader diverged from expected behavior), and grader calibration tools (to progressively improve alignment and consistency). The case study describes a "ladder-climbing" approach where the grader setup progressively improved, though specific metrics on grader accuracy or calibration curves are not provided.

From an LLMOps perspective, this emphasis on grader development before model training represents a mature approach to building reliable AI systems. Rather than immediately jumping to model optimization, the team invested in building high-quality evaluation infrastructure—a pattern increasingly recognized as essential for production LLM systems. However, readers should note that details about grader architecture, whether it used rule-based systems, learned models, or hybrid approaches, and specific calibration metrics are not disclosed.

## Reinforcement Learning Training Process

Once the automated grader was validated as sufficiently reliable, it became the reward function for training a menu error correction model. The training approach used reinforcement learning to optimize model outputs against DoorDash's quality standards as encoded in the grader. The system took DoorDash's existing structured menu output and improved upon it through iterative training.

The training process incorporated several production constraints beyond pure accuracy:

- **Latency requirements**: The model needed to operate within acceptable inference time limits for the onboarding workflow
- **Cost constraints**: Inference costs needed to be economically viable at DoorDash's scale
- **Reliability requirements**: The system needed to operate robustly in production conditions

During training, the automated grading system evaluated the model's structured output, identified different types of errors based on DoorDash's menu style guidelines, and converted these error assessments into a single reward signal. This feedback loop drove what the case study characterizes as "reliable improvements" over training iterations.

The case study provides one illustrative example of the model's chain-of-thought reasoning as it learned to handle menu hierarchies more effectively. The example shows the model distinguishing between "Taco Dinner" (which includes sides like rice, beans, and salad) and "Tacos" (without sides), recognizing that these should be categorized separately. While this is a relatively simple example, it demonstrates that the model developed some interpretable reasoning capabilities beyond pure pattern matching.

The teams tested multiple base models and training recipes to identify configurations meeting production requirements. The case study mentions monitoring model performance across different menu error types during training, suggesting they tracked granular performance metrics rather than just overall accuracy. However, specific details about which base models were evaluated, training duration, computational resources required, or hyperparameter optimization strategies are not disclosed.

From an LLMOps perspective, several aspects of this training approach are noteworthy:

- **Domain-specific reward functions**: Rather than using generic evaluation metrics, the reward function encoded DoorDash's specific quality standards and business requirements
- **Multi-objective optimization**: The training process balanced accuracy against latency, cost, and reliability constraints—a realistic representation of production requirements
- **Interpretability considerations**: The chain-of-thought outputs provided some visibility into model reasoning, which likely aided debugging and trust-building

The case study does not detail the reinforcement learning algorithm used (PPO, DPO, RLHF variants, etc.), the scale of training data, or how they handled exploration-exploitation tradeoffs during training. These technical details would be valuable for practitioners attempting similar implementations.

## Validation and Testing Strategy

DoorDash employed a multi-stage validation approach before production deployment, demonstrating mature LLMOps practices for de-risking AI system rollouts. The validation progression moved from automated evaluation to human evaluation to live production testing:

**Automated Evaluation**: Initial validation relied on the automated grader itself, with the team tracking what they describe as "strong RL training performance" and "consistent offline results." The case study notes they tracked "online metrics" as well, though it's unclear whether this refers to online learning metrics during training or actual production metrics.

**Human Grading with Offline Data**: After automated results looked promising, the team moved to "stricter offline validation with human graders reflecting production conditions." This involved having human reviewers evaluate model outputs on held-out data, providing a reality check on whether automated grader alignment with human judgment held up on new examples. The alignment between automated and human validation gave the team confidence to proceed to production testing.

**A/B Testing in Production**: DoorDash ran a live A/B test comparing the new menu error correction model against their baseline system on "a large sample of production menus." Importantly, they had human reviewers grade outputs from both systems, providing ground truth evaluation on real production data. The test showed that the share of low-quality menus fell by approximately 30% relative to the baseline—the key result highlighted throughout the case study.

This validation strategy demonstrates several LLMOps best practices:

- **Progressive risk reduction**: Moving from automated to human to live testing reduced the risk of production issues
- **Ground truth validation**: Using human graders even during A/B testing ensured results weren't artifacts of automated evaluation
- **Real production conditions**: Testing on actual production menus rather than synthetic datasets provided realistic performance assessment

However, some important details are missing from the case study. The "30% relative reduction" is described as a reduction in "low-quality menus" or "critical menu errors" in different parts of the text, but the absolute error rates, sample sizes, statistical significance, and confidence intervals are not provided. Additionally, we don't know whether the test measured any potential negative impacts (latency increases, cost increases, edge case failures) or how long the A/B test ran before making a rollout decision.

## Production Deployment and Integration

Applied Compute delivered what they describe as a "production-ready library" that integrated directly into DoorDash's codebase while meeting their operational requirements around latency, robustness, and security. The case study states that DoorDash has rolled out the error correction model to all menu traffic in the USA, indicating a full production deployment rather than a limited pilot.

The integration approach—delivering a library that plugs into existing systems rather than requiring infrastructure overhaul—represents a pragmatic deployment strategy that likely reduced implementation friction. The mention of security constraints suggests appropriate attention to data protection and system security, though no specific details about security measures are provided.

The case study positions the deployment as part of an ongoing improvement cycle rather than a one-time project. They describe a potential "continuous performance monitoring" system that could "feed production corrections back into training, establishing a repeatable flywheel" where DoorDash continuously improves systems by converting judgment into automated training signals. This represents a mature vision for production ML systems where deployment is the beginning of a continuous learning cycle rather than the end of development.

## LLMOps Considerations and Critical Assessment

This case study illustrates several important LLMOps patterns and considerations:

**Evaluation Infrastructure as Foundation**: The project invested heavily in building robust evaluation infrastructure before optimizing the model itself. This grader-first approach represents a mature perspective on AI development where reliable evaluation is recognized as prerequisite to reliable optimization. However, the case study doesn't discuss the ongoing maintenance burden of the grader—as menu formats and business requirements evolve, the grader presumably needs updates to remain aligned with current standards.

**Domain Expertise Encoding**: The project successfully translated institutional knowledge from human experts into automated systems, first through the grader and then through the trained model. This demonstrates a viable path for scaling expertise beyond human capacity. However, there's an inherent risk in codifying judgment: if the original human experts had systematic biases or blind spots, these could be amplified in the automated system.

**Multi-Stage Validation**: The progression from automated to human to live testing demonstrates appropriate risk management for production AI deployments. However, the case study doesn't discuss ongoing monitoring post-deployment or how DoorDash detects performance degradation as menu patterns shift over time.

**Production Constraints Integration**: Training explicitly considered latency, cost, and reliability constraints rather than optimizing accuracy alone. This realistic multi-objective optimization is essential for viable production systems, though the specific tradeoffs made aren't disclosed.

**Vendor Partnership Model**: The case study describes Applied Compute working onsite at DoorDash, suggesting close collaboration rather than arms-length tool provision. This intensive partnership model may have contributed to success but raises questions about ongoing dependency and knowledge transfer to internal teams.

**Claims and Evidence**: While the 30% reduction in low-quality menus is compelling, the case study is promotional material from Applied Compute and lacks the detailed methodology, statistical analysis, and potential negative results that would appear in a rigorous technical publication. The selective presentation of results and lack of quantitative baselines means readers should view claims with appropriate skepticism.

**Scalability and Generalization**: The case study focuses on USA deployment. Whether the approach generalizes to international markets with different menu formats, languages, and cuisine conventions remains unclear. The reinforcement learning approach presumably requires retraining or fine-tuning for different market contexts.

**Model Architecture**: The case study mentions chain-of-thought capabilities and structured output generation but doesn't specify the underlying model architecture, whether they used proprietary or open-source base models, or model size considerations. These details would be valuable for practitioners assessing applicability to their own use cases.

**Cost-Benefit Analysis**: While the improvement in menu quality is clear, the case study doesn't discuss the total cost of development, ongoing inference costs, or quantified business impact (e.g., reduced customer complaints, improved order accuracy, merchant satisfaction). These economic considerations are crucial for evaluating ROI in production AI systems.

## Broader Implications

This case study represents an interesting example of production LLM deployment that goes beyond simple prompt engineering or RAG patterns. The use of reinforcement learning with custom reward functions demonstrates how organizations can shape LLM behavior toward specific business objectives and quality standards. The emphasis on grader development highlights that evaluation infrastructure is often the critical bottleneck in improving production AI systems.

The "flywheel" concept mentioned at the end—using production data to continuously improve training—represents an important pattern for production ML systems, though implementation details and results from continuous learning are not yet demonstrated in this case study. If successfully implemented, such a system would provide ongoing value from the initial infrastructure investment.

For organizations considering similar approaches, key takeaways include the importance of robust evaluation infrastructure, the value of encoding domain expertise systematically rather than relying solely on few-shot prompting, and the need for multi-stage validation before production deployment. However, the significant engineering investment required (including partnership with specialized vendors) suggests this approach may be most viable for high-value use cases where accuracy improvements have clear business impact.