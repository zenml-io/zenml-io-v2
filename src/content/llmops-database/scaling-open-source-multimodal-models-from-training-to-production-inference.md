---
title: "Scaling Open-Source Multimodal Models: From Training to Production Inference"
slug: "scaling-open-source-multimodal-models-from-training-to-production-inference"
draft: false
llmopsTags:
  - "code-generation"
  - "multi-modality"
  - "reinforcement-learning"
  - "model-optimization"
  - "agent-based"
  - "latency-optimization"
  - "cost-optimization"
  - "token-optimization"
  - "instruction-tuning"
  - "evals"
  - "vllm"
  - "pytorch"
  - "open-source"
  - "monitoring"
  - "scaling"
  - "databases"
  - "cache"
industryTags: "tech"
company: "MiniMax"
summary: "MiniMax, a research organization focused on making AI accessible to everyone, partnered with Together AI to develop, optimize, and deploy their MiniMax M3 open-source multimodal model at scale. The model represents a significant advancement in open-source AI, featuring multimodal capabilities (text, image, and video understanding), 1 million token context length, and sparse attention mechanisms. Together AI handles the production inference infrastructure, implementing extensive GPU optimization and kernel development to serve the model efficiently. The collaboration demonstrates how open-source models can achieve frontier-level performance while being accessible to developers, with Together AI capturing the majority of M3 token usage through continuous optimization that improves model serving performance on a daily basis."
link: "https://www.youtube.com/watch?v=AVMr9PMINyo"
year: 2026
seo:
  title: "MiniMax: Scaling Open-Source Multimodal Models: From Training to Production Inference - ZenML LLMOps Database"
  description: "MiniMax, a research organization focused on making AI accessible to everyone, partnered with Together AI to develop, optimize, and deploy their MiniMax M3 open-source multimodal model at scale. The model represents a significant advancement in open-source AI, featuring multimodal capabilities (text, image, and video understanding), 1 million token context length, and sparse attention mechanisms. Together AI handles the production inference infrastructure, implementing extensive GPU optimization and kernel development to serve the model efficiently. The collaboration demonstrates how open-source models can achieve frontier-level performance while being accessible to developers, with Together AI capturing the majority of M3 token usage through continuous optimization that improves model serving performance on a daily basis."
  canonical: "https://www.zenml.io/llmops-database/scaling-open-source-multimodal-models-from-training-to-production-inference"
  ogTitle: "MiniMax: Scaling Open-Source Multimodal Models: From Training to Production Inference - ZenML LLMOps Database"
  ogDescription: "MiniMax, a research organization focused on making AI accessible to everyone, partnered with Together AI to develop, optimize, and deploy their MiniMax M3 open-source multimodal model at scale. The model represents a significant advancement in open-source AI, featuring multimodal capabilities (text, image, and video understanding), 1 million token context length, and sparse attention mechanisms. Together AI handles the production inference infrastructure, implementing extensive GPU optimization and kernel development to serve the model efficiently. The collaboration demonstrates how open-source models can achieve frontier-level performance while being accessible to developers, with Together AI capturing the majority of M3 token usage through continuous optimization that improves model serving performance on a daily basis."
notion:
  pageId: "3b4f8dff-2538-8004-8f78-ece12dd8bdfe"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:33:00.000Z"
  lastEditedTime: "2026-08-06T11:33:00.000Z"
  publishedAt: "2026-08-07T12:15:17Z"
---

## Overview

This case study explores the partnership between MiniMax, creators of the M3 open-source multimodal model, and Together AI, a company specializing in inference optimization and production deployment of large language models. The discussion features Olive, the research lead of reinforcement learning at MiniMax, and Dan, VP of Kernels at Together AI, providing unique insights from both the model training and production deployment perspectives.

MiniMax's mission centers on democratizing AI by open-sourcing their models to enable broad accessibility. Their M3 model represents a significant leap from previous versions, introducing native multimodal capabilities, extending context length to 1 million tokens, and implementing sparse attention mechanisms. Together AI serves as the primary inference provider, capturing the lion's share of M3 token usage through aggressive optimization of the inference stack.

## Partnership and Open Source Strategy

The collaboration emerged organically from the open-source ecosystem. Together AI had been tracking MiniMax's progress since earlier model versions (2.5 and 2.7), and the partnership was formalized after a car event in Las Vegas where MiniMax representatives discussed their upcoming M3 model. This relationship reflects a broader trend in the AI industry where model creators and inference specialists form symbiotic partnerships to maximize impact.

MiniMax's decision to open-source their frontier models stems from several strategic considerations. The open-source community provides valuable feedback, enables community contributions through pull requests, and creates opportunities for optimization specialists like Together AI to enhance model performance. This approach aligns with their stated mission of making intelligence accessible to everyone, rather than keeping capabilities locked behind proprietary APIs.

From Together AI's perspective, the partnership supports their goal of making "intelligence abundant" by getting more tokens to more people for useful applications. They closely follow all open-source model releases and prioritize serving models that demonstrate strong capabilities and user interest.

## Model Architecture and Training Innovations

MiniMax M3 introduces several architectural innovations that distinguish it from predecessor models and create unique challenges for production deployment. The most significant change is native multimodality trained from scratch. Unlike many multimodal models that bolt vision capabilities onto existing text models, M3 was trained with both text and image data from step zero of pre-training. This approach, while technically challenging and prone to training collapse, resulted in models where text tokens naturally attend to visual tokens, creating deeper integration between modalities.

The model also implements a custom sparse attention mechanism distinct from those used by other labs like DeepSeek or other frontier models. Sparse attention reduces computational complexity for long-context scenarios but requires specialized kernel implementations for efficient inference. The 1 million token context window further amplifies the importance of efficient attention mechanisms and KV cache management.

The model demonstrates strong performance across multiple specialized benchmarks including SVG bench for scalable vector graphics understanding, kernel bench for code optimization tasks, and OS World for computer use and agentic capabilities. These specialized capabilities emerged from carefully designed post-training processes.

## Post-Training and Reinforcement Learning

MiniMax employs a sophisticated post-training approach centered on what they call "self-evolution," where the model improves itself through reinforcement learning in carefully constructed environments. The research team emphasizes that successful post-training depends critically on three factors: high-quality data, thoughtful problem formulation, and appropriate environment design.

For tasks like kernel optimization, they design complex environments where the model can iteratively improve performance through reinforcement learning. The model learns to optimize kernels themselves, testing different approaches and receiving rewards based on actual performance improvements. This approach has enabled the model to achieve impressive results on long-horizon tasks, including the ability to replicate an ICLR research paper over a 12-hour run.

Training for such long-horizon tasks presents unique challenges. These tasks require GPU resources, have hardware constraints, and demand careful reward formulation to guide the model toward useful behaviors rather than reward hacking. The team addresses these challenges through iterative evaluation, where they assess intermediate submissions throughout the task rather than only evaluating final outputs. They also maintain separate validation and test sets to detect when models discover shortcuts rather than genuinely improving.

MiniMax actively uses their own models internally to accelerate development, creating a virtuous cycle where the model helps build better evaluations and training data for the next version. This self-evolution approach appears to be a key differentiator in how they achieve frontier-level performance with relatively open development processes.

## Production Inference Optimization

Together AI's approach to serving MiniMax M3 exemplifies the complex engineering required to deploy state-of-the-art models in production. When partnering with a model creator, Together AI receives early access to architectural details before launch. For M3, this included information about the custom sparse attention mechanism and other architectural choices that differ from existing models in the open-source ecosystem.

The inference optimization process begins immediately upon receiving model specifications. The team starts writing custom kernels, benchmarking existing implementations, and determining whether they can adapt existing code or need to write new kernels from scratch. By day zero of launch, the priority is quality assurance, ensuring the model delivers the expected user experience and output quality.

Following launch, Together AI maintains an extensive optimization roadmap targeting different components of the inference stack. They continuously work on KV cache management, attention kernels, quantization strategies, and other performance-critical components. Notably, optimizations continue at an aggressive pace, with performance improvements shipped daily rather than weekly or monthly. This rapid iteration means that models served through Together AI literally get faster between day zero, day seven, and day fourteen of deployment.

The optimization philosophy embraces comprehensive coverage rather than selective focus. When asked about prioritizing among thousands of potential optimizations, the response was simply to pursue all of them and "try harder" when faced with challenges. This intensive approach reflects the competitive dynamics of the inference market and the importance of performance for user experience.

## Kernel Development and Hardware Utilization

Kernel development represents a critical bottleneck in model serving performance. Together AI has been working on GPU optimization and kernel development for years, with expertise dating back to academic research. They released Parallel Kernel Bench, a benchmark containing intentionally unsolved kernel optimization problems identified through surveying different model serving approaches.

The benchmark design reflects an interesting philosophy toward benchmark optimization. Rather than worrying about models overfitting to the benchmark, the team welcomes such behavior because they can then use the optimized kernels to accelerate real production workloads. This approach makes sense when benchmarks genuinely reflect important real-world use cases rather than artificial test scenarios.

Different models in the open-source ecosystem require different kernel implementations due to variations in attention mechanisms, mixture-of-experts architectures, quantization approaches, and other architectural choices. However, lessons learned from optimizing one model often transfer to others. For example, experience with sparse attention in one model provides valuable insights for implementing the MiniMax sparse attention, even though the specific mechanisms differ.

The discussion also touched on current hardware utilization rates, noting that many organizations achieve only around 10% FLOP utilization. There's strong conviction that this represents a massive opportunity for improvement, and expectations that looking back in three years, current utilization rates will seem embarrassingly low.

## Evolving Workload Patterns

The nature of production workloads has evolved significantly from simple chat interactions to complex agentic workflows. Traditional chat patterns involve a system prompt of a few thousand tokens followed by conversational exchanges. Modern agentic workflows, by contrast, might upload an entire codebase to the model and execute hundreds of multi-turn tool calls with extensive context.

These shifting patterns fundamentally change optimization priorities. Agentic workflows with code-based contexts create different performance profiles than chat-based interactions, requiring different approaches to KV cache management, prompt handling, and routing. The multimodal capabilities add another dimension of complexity, as developers increasingly combine code generation, visual understanding, and iterative feedback loops in single workflows.

One example workflow involves using a coding agent to optimize a web application, then having the model visually inspect the result and provide feedback for further improvements. This type of multimodal agentic loop represents a significant departure from earlier use cases and drives new requirements for the inference infrastructure.

## KV Cache Management at Scale

For long-context workloads extending to hundreds of thousands or even a million tokens, KV cache management becomes a distributed systems problem rather than a simple caching challenge. Together AI describes this as essentially rebuilding a distributed file system or large-scale database, which ironically represents foundational computer science that many practitioners skipped in undergraduate education but now must rediscover in industry contexts.

The key challenges involve deciding where to store cached data, determining whether previously computed cache exists for a given request, efficiently fetching cached data when available, and transferring cache between different parts of the infrastructure. While conceptually straightforward, implementing these systems correctly at scale requires careful engineering to maintain performance and reliability.

The approach to KV cache becomes even more critical with concurrent requests that maintain long contexts. Managing cache for hundreds or thousands of simultaneous sessions, each potentially carrying massive context windows, requires sophisticated resource management and allocation strategies.

## Evaluation and Quality Assurance

Evaluation for complex, long-horizon tasks demands more sophisticated approaches than simple output comparison. For tasks that run for hours and involve iterative improvement, the team evaluates intermediate submissions throughout the process rather than only final outputs. This provides visibility into whether the model is genuinely improving or discovering shortcuts.

The team distinguishes between validation and testing to detect reward hacking, where models find ways to achieve high scores without actually solving the intended problem. They also build internal evaluations closely tied to their own development workflows, ensuring that benchmarks reflect real-world use cases that matter to their organization.

MiniMax's approach to evaluation includes testing specialized capabilities like computer use, where the model navigates through computer interfaces to accomplish tasks. They also evaluate game development capabilities, which they consider a hidden gem that many users haven't fully explored. The model can help develop functional games, demonstrating understanding of both code and user interaction patterns.

## Open Source Convergence and Future Outlook

Both participants expressed strong conviction that open-source models are converging with closed frontier models in capability. They point to the M3 release, alongside models like GLM and others, as evidence that the open ecosystem can achieve competitive performance. The recurring narrative that companies like Anthropic and OpenAI maintain insurmountable leads gets challenged every few months by new open-source releases.

Looking forward three years, expectations include significantly better hardware utilization across the industry, proliferation of diverse models serving different use cases, and continued closing of gaps between open and closed models. The pace of improvement in both training and inference optimization appears to be accelerating, with models increasingly used to improve their own development processes.

The self-evolution approach, where models help build better training environments and evaluation frameworks for the next generation, creates a compounding advantage. This acceleration mechanism helps explain how open-source efforts can keep pace with well-funded closed labs despite resource disparities.

## Technical Considerations and Balanced Assessment

While the discussion provides valuable technical insights into production LLM deployment, it's important to note that both participants have strong commercial and research incentives to present their work positively. Together AI benefits from showcasing their optimization capabilities and the models they serve, while MiniMax benefits from highlighting their model's capabilities and adoption.

Some claimed performance improvements, particularly the daily optimization cycle, should be understood as goals and practices rather than guaranteed outcomes for every model. The actual impact of continuous optimization likely varies based on the specific architectural challenges and available low-hanging fruit in the optimization landscape.

The emphasis on open-source models catching up to frontier labs reflects a genuine trend but may oversimplify the landscape. Different models excel at different tasks, and benchmark performance doesn't always translate to real-world utility across all use cases. Organizations choosing between open and closed models should evaluate specific requirements rather than relying solely on general capability claims.

The discussion of 10% FLOP utilization, while highlighting real inefficiencies, comes without detailed context about what utilization rates are theoretically achievable given current software stacks and workload characteristics. Some overhead is inevitable in production systems balancing multiple objectives beyond raw throughput.

Nevertheless, the case study provides genuine insight into the sophisticated engineering required to serve modern LLMs in production, the evolving nature of workloads from chat to agentic applications, and the symbiotic relationship between model creators and inference specialists in the open-source ecosystem.
