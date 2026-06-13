---
title: "Pre-training and Deploying Small Language Models for Edge Devices"
slug: "pre-training-and-deploying-small-language-models-for-edge-devices"
draft: false
llmopsTags:
  - "healthcare"
  - "document-processing"
  - "code-generation"
  - "chatbot"
  - "summarization"
  - "internet-of-things"
  - "regulatory-compliance"
  - "realtime-application"
  - "multi-modality"
  - "fine-tuning"
  - "few-shot"
  - "model-optimization"
  - "knowledge-distillation"
  - "instruction-tuning"
  - "token-optimization"
  - "latency-optimization"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "rag"
  - "error-handling"
  - "pytorch"
  - "vllm"
  - "fastapi"
  - "open-source"
  - "scalability"
  - "hugging-face"
  - "google-gcp"
  - "meta"
  - "reinforcement-learning"
  - "rlhf"
industryTags: "tech"
company: "Liquid AI"
summary: "Liquid AI addresses the challenge of deploying language models on edge devices with limited memory and computational resources, such as smartphones and in-car systems. The company developed the LFM (Liquid Foundation Model) series, ranging from 350M to 24B parameters, optimized specifically for on-device deployment through novel architecture choices, extensive pre-training on 28 trillion tokens, and specialized post-training techniques. Key innovations include using gated short convolution blocks for reduced latency, focusing on task-specific capabilities like tool use and data extraction rather than general-purpose chat, and developing solutions to the \"doom looping\" problem through preference alignment and reinforcement learning. The resulting models demonstrate significantly better performance than scaled-down versions of larger models, with faster throughput, lower memory usage, and improved reliability for edge deployment scenarios."
link: "https://www.youtube.com/watch?v=fLUtUkqYHnQ"
year: 2026
seo:
  title: "Liquid AI: Pre-training and Deploying Small Language Models for Edge Devices - ZenML LLMOps Database"
  description: "Liquid AI addresses the challenge of deploying language models on edge devices with limited memory and computational resources, such as smartphones and in-car systems. The company developed the LFM (Liquid Foundation Model) series, ranging from 350M to 24B parameters, optimized specifically for on-device deployment through novel architecture choices, extensive pre-training on 28 trillion tokens, and specialized post-training techniques. Key innovations include using gated short convolution blocks for reduced latency, focusing on task-specific capabilities like tool use and data extraction rather than general-purpose chat, and developing solutions to the \"doom looping\" problem through preference alignment and reinforcement learning. The resulting models demonstrate significantly better performance than scaled-down versions of larger models, with faster throughput, lower memory usage, and improved reliability for edge deployment scenarios."
  canonical: "https://www.zenml.io/llmops-database/pre-training-and-deploying-small-language-models-for-edge-devices"
  ogTitle: "Liquid AI: Pre-training and Deploying Small Language Models for Edge Devices - ZenML LLMOps Database"
  ogDescription: "Liquid AI addresses the challenge of deploying language models on edge devices with limited memory and computational resources, such as smartphones and in-car systems. The company developed the LFM (Liquid Foundation Model) series, ranging from 350M to 24B parameters, optimized specifically for on-device deployment through novel architecture choices, extensive pre-training on 28 trillion tokens, and specialized post-training techniques. Key innovations include using gated short convolution blocks for reduced latency, focusing on task-specific capabilities like tool use and data extraction rather than general-purpose chat, and developing solutions to the \"doom looping\" problem through preference alignment and reinforcement learning. The resulting models demonstrate significantly better performance than scaled-down versions of larger models, with faster throughput, lower memory usage, and improved reliability for edge deployment scenarios."
notion:
  pageId: "351f8dff-2538-80d9-9d46-d9098ef43afe"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-29T13:42:00.000Z"
  lastEditedTime: "2026-04-29T13:42:00.000Z"
  publishedAt: "2026-04-29T14:06:11Z"
---

## Overview

Liquid AI specializes in developing small language models specifically designed for edge deployment scenarios, focusing on models that run on devices like smartphones, automotive systems, and other resource-constrained environments. The company's head of pre-training, Maxim Labon, presented comprehensive insights into the unique challenges and solutions for deploying small language models in production, with particular emphasis on their LFM (Liquid Foundation Model) series ranging from 350 million to 24 billion parameters. This work represents a fundamentally different approach to model development compared to simply scaling down larger models, as small edge models have distinct characteristics and requirements that demand specialized treatment throughout the entire development and deployment pipeline.

The presentation covers the full lifecycle of small model development, from architecture design and pre-training through post-training and deployment optimization. Liquid AI recently released their new vision-language model at 450M parameters and a new version of their 350M text model, with models available across text, vision, and audio modalities on Hugging Face. The focus is on creating models that can perform specific tasks exceptionally well rather than attempting to be general-purpose assistants, which is a critical distinction for production deployment on edge devices.

## Unique Characteristics of Small Edge Models

Small language models for edge deployment are fundamentally different from their larger counterparts in three critical ways that directly impact production deployment strategies. First, they are memory-bound due to hardware limitations on phones, cars, and similar devices, which constrains model size and necessitates efficient parameter usage. This constraint directly affects knowledge capacity, as smaller models simply cannot store as much information in their parameters as larger models. Second, these models are designed to be task-specific rather than general-purpose, which actually becomes an advantage when combined with the memory constraints. By focusing on particular capabilities like summarization, data extraction, or tool use, small models can excel at targeted tasks rather than performing poorly across a broad range of capabilities. Third, edge deployments are extremely latency-sensitive, requiring very fast throughput since inference happens on device without the benefit of powerful server-side GPUs.

These characteristics create a unique optimization landscape where traditional approaches from large model development may not apply or may even be counterproductive. The key insight presented is that small models should not be treated as simply scaled-down versions of larger models, as they require their own specialized development approaches, architectures, and training methodologies to be effective in production settings.

## Architecture Optimization for Edge Deployment

Liquid AI conducted extensive analysis of competing small models to understand common architectural patterns and identify opportunities for improvement. Looking at models like Gemma 3 270M and Qwen 3.5 0.8B, they discovered that these models suffer from inefficient parameter allocation. Specifically, Gemma 3 270M dedicates approximately 63% of its total parameters to the embedding layer, while Qwen 3.5 0.8B uses about 29% for embeddings. This is inefficient because embedding parameters don't contribute to reasoning or knowledge capacity in the same way as other parameters. The effective size of these models is therefore significantly smaller than their total parameter count, meaning they don't fully utilize their memory footprint for computational capabilities.

This inefficiency stems from these models being distilled from much larger teacher models with huge vocabulary sizes, which forces the student models to maintain similarly large embedding layers. In contrast, Liquid AI's LFM2 architecture allocates only about 10% of parameters to embeddings, leaving approximately 90% as effective parameters that contribute directly to reasoning and knowledge capacity.

The LFM2 architecture employs a hybrid design combining gated short convolution blocks with grouped query attention. The key innovation is the use of short convolutions, which were identified through comprehensive on-device profiling rather than purely theoretical analysis. Liquid AI implemented and tested various architectural components on actual target hardware, including specific CPUs and mobile devices like the Samsung Galaxy S25 Ultra. This empirical approach revealed that gated short convolutions are significantly faster than alternatives like sliding window attention, gated delta mechanisms, gated linear attention, and even standard grouped query attention when measured by cost ratio in production environments.

Real-world profiling demonstrates the practical impact of these architectural choices. Testing on the AMD Ryzen Max Plus 395 CPU and Samsung Galaxy S25 Ultra shows that LFM2 models achieve substantially higher throughput and lower memory usage compared to comparable models. These performance improvements extend beyond CPU environments to GPU deployments as well, where the architecture maintains high throughput even under high concurrency levels, which is crucial for production scenarios serving multiple requests.

## Pre-training at Scale for Small Models

Liquid AI's approach to pre-training challenges conventional wisdom about compute-optimal training. The LFM 2.5 350M model was pre-trained on 28 trillion tokens, which seems dramatically over-trained according to the Chinchilla scaling laws that would suggest compute-optimality at perhaps around one trillion tokens or less for a model of this size. However, empirical results show that performance continues to improve with additional pre-training tokens even at this small scale, validating the decision to train far beyond traditional compute-optimal points.

This finding aligns with recent research on test-time scaling laws, which suggests that models can benefit from more extensive pre-training than Chinchilla scaling would predict. Liquid AI's analysis shows that LFM 2.5 350M actually hasn't been trained on enough tokens according to these newer scaling laws, suggesting potential for even further improvement with additional pre-training. This is particularly advantageous for small models since they are substantially cheaper to train than larger models, making extended pre-training economically feasible.

The pre-training recipe for LFM 2.5 involves 28 trillion tokens followed by supervised fine-tuning, preference alignment, and reinforcement learning stages. The extensive pre-training provides a strong foundation for subsequent post-training stages and contributes to the model's ultimate performance in production deployment.

## Task-Specific Post-Training Strategy

The post-training pipeline for small edge models follows similar stages to larger models but with fundamentally different emphasis and execution. Liquid AI's approach recognizes that small models should not attempt to be mediocre at everything but should instead excel at specific targeted capabilities that align with their intended production use cases.

For supervised fine-tuning, the strategy emphasizes narrowness and specificity. Rather than training on a broad mixture of capabilities, the focus is on particular tasks like data extraction and tool use where the model is expected to perform in production. This applies both to Liquid AI's own base models and to practitioners who might fine-tune these models for their specific applications. The more narrow and focused the fine-tuning task, the better the results, which is ideal for production scenarios where models are typically deployed for specific purposes rather than general conversation.

The preference alignment stage uses a proprietary on-policy length-normalized direct preference optimization algorithm. Unlike supervised fine-tuning which improves specific task performance, preference alignment provides general improvements across the board. After preference alignment, models simply perform better overall and produce higher quality outputs, which benefits production deployments across various use cases. This stage is critical for ensuring that model outputs meet quality standards expected in production environments.

Reinforcement learning proves extremely efficient even at very small scale and represents a crucial component of the post-training pipeline. The key to effective reinforcement learning for small models is maintaining narrow focus through multiple specific environments and tasks while ensuring good generalization across those tasks. This allows the model to develop robust capabilities in its target domain without attempting to master capabilities irrelevant to its production use case.

An important practical insight is that small models are particularly sensitive to cold start problems in reinforcement learning. If a particular task doesn't train well during reinforcement learning, it's typically because similar examples weren't present in the supervised fine-tuning data, or the task complexity exceeds what the model can learn at that stage. The solution is to iterate back to supervised fine-tuning, add relevant data for that task, and then retry the reinforcement learning stage. This feedback loop between stages is essential for achieving production-ready performance on targeted capabilities.

## Addressing the Doom Looping Problem

A critical production challenge unique to small models, especially when performing complex tasks or reasoning, is the doom looping problem where the model gets stuck repeating a sequence of words indefinitely. This problem is particularly acute when all three factors converge: small model size, reasoning requirements, and complex tasks. For example, a tiny reasoning model attempting difficult mathematical problems represents the perfect conditions for widespread doom looping. This becomes an especially serious issue for Qwen 3.5 0.8B in reasoning mode, which exhibits doom looping in over 50% of cases, demonstrating that simply scaling down larger models without addressing small-model-specific challenges creates unreliable production systems.

Liquid AI developed a two-pronged approach to mitigate doom looping in production models. The first solution operates during the preference alignment data generation phase through a carefully designed pipeline. Starting with approximately one million prompt samples, the policy model generates five rollouts using temperature sampling, which produces diverse outputs where not all will exhibit doom looping. Simultaneously, one additional rollout is generated with temperature zero, which is more likely to doom loop. All six rollouts are then evaluated by an LLM jury that scores each response, with the highest-scoring response designated as the chosen answer and the lowest-scoring as the rejected answer. When doom loops occur, they typically receive low scores and become rejected examples, which trains the model during preference alignment to avoid this behavior.

The second solution leverages reinforcement learning with verifiable rewards combined with n-gram repetition penalties. For tasks with verifiable correct answers, such as mathematics problems, the reward structure naturally penalizes doom looping since a model stuck in repetition typically fails to produce a valid final answer and therefore receives no positive reward. Adding explicit n-gram repetition penalties further discourages repetitive generation patterns. Temperature sampling during reinforcement learning rollout generation also helps by creating diversity that reduces the likelihood of doom looping.

The effectiveness of this combined approach is demonstrated through measured doom loop ratios across different training stages. After mid-training, LFM 2.5 1.2B thinking model exhibited approximately 15-16% doom looping on challenging benchmarks. This ratio barely changed after supervised fine-tuning, confirming that SFT alone is insufficient to address this problem even when doom loop examples aren't present in the training data. After applying direct preference optimization, the doom loop ratio decreased substantially, and after reinforcement learning, the problem became nearly non-existent. This progression demonstrates that doom looping is not adequately addressed by distillation-based approaches and requires specific interventions designed for small model deployment.

## Performance Results and Production Capabilities

The combination of architectural optimization and specialized training produces measurable improvements across production-relevant metrics. LFM 2.5 350M demonstrates significant performance gains over its predecessor LFM2 350M across multiple benchmarks relevant to its target deployment scenarios. On knowledge tasks measured by GPQA Diamond, the model shows improved capability despite its limited parameter count. Instruction following ability measured on IFEval benchmark improves substantially, which is critical for production reliability. Data extraction performance on case report benchmarks increases significantly, directly supporting one of the model's primary intended use cases. Tool use capabilities measured on BFCL and T2 bench show strong performance, which is essential for the agentic deployment patterns that Liquid AI advocates for small models.

These results reflect the strategic decision to optimize for specific capabilities rather than attempting to achieve average performance across all possible tasks. The model isn't designed to be the best at coding or mathematics in general, but rather to excel at data extraction and tool use where it will actually be deployed in production. This focused approach allows the 350M parameter model to be production-ready for specific use cases despite its extremely small size compared to typical language models.

## Agentic Deployment Strategy for Small Models

Liquid AI's vision for production deployment of small models centers on agentic architectures that compensate for inherent limitations while leveraging unique advantages. The memory-bound nature of edge devices results in low knowledge capacity, which inevitably leads to hallucinations when models are asked about facts beyond their training data. However, this limitation becomes manageable when models are equipped with tool use capabilities, particularly web search. A tiny model that can effectively search for and utilize external information can substantially outperform relying solely on memorized knowledge, effectively augmenting its knowledge capacity through external resources.

The presentation emphasizes that small models are actually very effective at agentic tasks, which represents an under-explored deployment pattern in production environments. Most discussion of agentic workflows focuses on large models, but small models may actually be better suited for many agentic applications. Their strong reasoning capabilities, optimized for reliability through targeted training, make them effective at tool orchestration and decision-making even when they lack the knowledge capacity of larger models.

Small models also struggle with long context capabilities compared to larger models, but this can be addressed through architectural patterns in the deployment environment. Using recursive language model patterns with Python integration allows systems to work around context limitations by breaking down tasks and managing state externally. Most challenges inherent to small language models can be addressed through creative deployment patterns and environmental design rather than requiring the models themselves to overcome all limitations through parameter scaling.

This agentic approach is particularly well-suited to the production scenarios where edge models are most valuable: offline or intermittent connectivity environments like in-car systems, latency-sensitive applications where local inference is faster than API calls to remote large models, and privacy-regulated domains like finance and healthcare where data cannot be sent to external services. In these contexts, a smaller model with well-designed tool access can provide production-ready performance that larger remote models cannot match due to deployment constraints.

## Production Deployment Considerations

The practical deployment of these models involves careful consideration of target hardware and real-world constraints. Liquid AI's approach of profiling directly on target devices like specific CPUs and mobile phones ensures that architectural decisions translate to actual performance improvements in production rather than just theoretical benefits. The models are distributed through Hugging Face, making them accessible for practitioners to experiment with and deploy in their own environments.

The development process acknowledges the iterative nature of achieving production readiness for small models. The feedback loop between reinforcement learning and supervised fine-tuning, where difficulties in RL training signal the need for additional SFT data, reflects a practical approach to addressing real-world deployment challenges. This iterative refinement is essential because the narrow focus required for effective small model deployment means that any gaps in capabilities become immediately apparent during evaluation and must be systematically addressed.

Looking forward, Liquid AI is working on LFM3 with numerous experiments and ideas to continue advancing the state of small model deployment. The overall message is that edge models represent both scientific and production-relevant challenges that require specialized approaches distinct from large model development, and that combining these optimized small models with agentic deployment patterns can enable effective production systems in scenarios where large models are impractical or impossible to deploy.

The case study demonstrates a comprehensive LLMOps approach that spans from fundamental architecture research through training at scale to post-training optimization and deployment strategy. The emphasis throughout is on practical production considerations: latency, memory usage, reliability, task-specific performance, and deployment environment constraints. This represents a mature approach to operationalizing small language models for real-world edge deployment scenarios where traditional large model deployment patterns don't apply.
