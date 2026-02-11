---
title: "Using Evaluation Systems and Inference-Time Scaling for Beautiful, Scannable QR Code Generation"
slug: "using-evaluation-systems-and-inference-time-scaling-for-beautiful-scannable-qr-code-generation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68762afc4e314907699d8d00"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:14:06.062Z"
  createdOn: "2025-07-15T10:18:36.075Z"
llmopsTags:
  - "content-moderation"
  - "poc"
  - "caption-generation"
  - "prompt-engineering"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "human-in-the-loop"
  - "monitoring"
  - "scaling"
  - "serverless"
  - "pytorch"
  - "wandb"
  - "anthropic"
  - "hugging-face"
  - "nvidia"
industryTags: "tech"
company: "Modal"
summary: "Modal's engineering team tackled the challenge of generating aesthetically pleasing QR codes that consistently scan by implementing comprehensive evaluation systems and inference-time compute scaling. The team developed automated evaluation pipelines that measured both scan rate and aesthetic quality, using human judgment alignment to validate their metrics. They applied inference-time compute scaling by generating multiple QR codes in parallel and selecting the best candidates, achieving a 95% scan rate service-level objective while maintaining aesthetic quality and returning results in under 20 seconds."
link: "https://modal.com/blog/qart-codes-evals"
year: 2025
seo:
  title: "Modal: Using Evaluation Systems and Inference-Time Scaling for Beautiful, Scannable QR Code Generation - ZenML LLMOps Database"
  description: "Modal's engineering team tackled the challenge of generating aesthetically pleasing QR codes that consistently scan by implementing comprehensive evaluation systems and inference-time compute scaling. The team developed automated evaluation pipelines that measured both scan rate and aesthetic quality, using human judgment alignment to validate their metrics. They applied inference-time compute scaling by generating multiple QR codes in parallel and selecting the best candidates, achieving a 95% scan rate service-level objective while maintaining aesthetic quality and returning results in under 20 seconds."
  canonical: "https://www.zenml.io/llmops-database/using-evaluation-systems-and-inference-time-scaling-for-beautiful-scannable-qr-code-generation"
  ogTitle: "Modal: Using Evaluation Systems and Inference-Time Scaling for Beautiful, Scannable QR Code Generation - ZenML LLMOps Database"
  ogDescription: "Modal's engineering team tackled the challenge of generating aesthetically pleasing QR codes that consistently scan by implementing comprehensive evaluation systems and inference-time compute scaling. The team developed automated evaluation pipelines that measured both scan rate and aesthetic quality, using human judgment alignment to validate their metrics. They applied inference-time compute scaling by generating multiple QR codes in parallel and selecting the best candidates, achieving a 95% scan rate service-level objective while maintaining aesthetic quality and returning results in under 20 seconds."
---

Modal's QR code generation case study presents a compelling example of how to move from a proof-of-concept generative AI application to a production-ready system through rigorous evaluation engineering and inference-time compute scaling. The company built upon the viral 2023 concept of "QArt codes" - using ControlNet with Stable Diffusion to generate images that function as scannable QR codes while maintaining aesthetic appeal.

The initial challenge that Modal faced mirrors a common problem in generative AI applications: the gap between impressive demos and consistent production performance. While the original QArt codes concept worked well for certain prompts and styles, it failed to reliably produce scannable codes across diverse prompts and complex scenes. This inconsistency represents a fundamental barrier to production deployment that many AI applications encounter.

Modal's approach to solving this problem demonstrates sophisticated LLMOps engineering principles. The team recognized that their system had two competing objectives: producing scannable QR codes and maintaining aesthetic quality. Rather than trying to optimize both simultaneously without clear priorities, they made a strategic decision to focus primarily on scan rate as their key performance indicator, treating aesthetic quality as a secondary constraint that should not regress.

The evaluation system development process illustrates best practices for LLMOps evaluation engineering. Modal started with manual human evaluation processes, having team members physically scan thousands of QR codes with iPhones while recording results and aesthetic judgments. This labor-intensive approach provided ground truth data that could be used to validate automated evaluation systems. The team then developed automated processes using the QReader library for scan detection and an aesthetic rating predictor from the Stable Diffusion community.

A critical insight from Modal's approach is the concept of "evals for evals" - the recognition that automated evaluation systems themselves need to be validated against human judgment. The team ran alignment experiments on approximately 2,000 prompt-URL pairs to ensure their automated metrics correlated with human assessments. This validation step is often overlooked in production AI systems but is essential for maintaining confidence in evaluation results.

The team's use of Weights & Biases' Weave for experiment management and data visualization demonstrates the importance of proper tooling in LLMOps workflows. By logging raw experimental data and creating structured charts and analyses, they could track system performance across different configurations and share insights across the team. This tooling enabled them to move from ad hoc evaluation to systematic parameter optimization.

Modal's parameter optimization approach shows how to scale evaluation systems effectively. Once they had established trusted automated evaluations, they could sweep over configuration parameters by generating tens of thousands of images and calculating performance metrics in minutes rather than requiring human evaluation for each iteration. This scalability is crucial for production AI systems where manual evaluation becomes a bottleneck.

The "toast plot" visualization technique that Modal developed provides an interesting example of domain-specific evaluation visualization. By plotting ControlNet guidance duration against strength and visualizing results similar to bread toasting progression, they created an intuitive way to understand the parameter space and select optimal configurations. This kind of creative visualization can be valuable for understanding complex AI system behavior.

Perhaps most importantly, Modal's implementation of inference-time compute scaling demonstrates a practical approach to improving AI system reliability in production. By generating eight QR codes in parallel for each request and using their evaluation system to rank and select the best candidates, they achieved exponential improvement in scan probability with only sublinear latency cost. This approach leverages the parallel processing capabilities of GPUs effectively while maintaining acceptable response times.

The production deployment architecture shows how evaluation systems can be integrated into live systems. Rather than running evaluations only offline, Modal moved their evaluation pipeline into production, allowing them to rank generated QR codes in real-time based on scan probability and aesthetic scores. This online evaluation capability enabled them to consistently deliver high-quality results to users.

Modal's achievement of a 95% scan rate service-level objective while maintaining sub-20-second response times demonstrates that rigorous LLMOps engineering can bridge the gap between research demos and production systems. The key insights from their approach include: prioritizing clear, measurable objectives; developing comprehensive evaluation systems validated against human judgment; using proper tooling for experiment management; and leveraging inference-time compute scaling to improve system reliability.

The case study also highlights the importance of understanding the underlying technology stack. Modal's recognition that their evaluation neural networks were much lighter weight than the generator itself allowed them to run evaluations in production without significantly impacting latency. This kind of system-level thinking is essential for effective LLMOps implementation.

From a broader perspective, Modal's approach represents a mature view of generative AI application development that goes beyond the initial hype cycle. Their emphasis on "building hills for engineers and their machines to climb" through automated evaluation systems points toward a more sustainable approach to AI application development focused on measurable improvement rather than just impressive demos.

The technical implementation details reveal sophisticated engineering practices adapted to the unique challenges of generative AI systems. Unlike traditional software where correctness can often be determined logically, generative AI systems require empirical evaluation approaches that account for the probabilistic nature of neural network outputs. Modal's systematic approach to this challenge provides a template for other organizations looking to deploy generative AI systems in production environments.

The case study also demonstrates the value of serverless computing platforms like Modal's own product for LLMOps workflows. The ability to scale evaluation and inference workloads dynamically without infrastructure management overhead enables teams to focus on the core AI engineering challenges rather than operational complexity. This infrastructure approach aligns well with the iterative, experiment-heavy nature of AI system development.

Overall, Modal's QR code generation system represents a successful example of taking a viral AI concept and engineering it into a robust production system through careful evaluation design, systematic optimization, and thoughtful application of compute scaling techniques. The principles and practices demonstrated in this case study provide valuable insights for any organization looking to deploy generative AI systems that need to meet consistent quality and performance standards in production environments.