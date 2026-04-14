---
title: "Large-Scale OCR Processing of Academic Papers Using AI Coding Agents and Serverless GPU Infrastructure"
slug: "large-scale-ocr-processing-of-academic-papers-using-ai-coding-agents-and-serverless-gpu-infrastructure"
draft: false
llmopsTags:
  - "document-processing"
  - "chatbot"
  - "question-answering"
  - "prompt-engineering"
  - "cost-optimization"
  - "latency-optimization"
  - "model-optimization"
  - "evals"
  - "vllm"
  - "serverless"
  - "pytorch"
  - "langchain"
  - "open-source"
  - "documentation"
  - "scaling"
  - "hugging-face"
  - "openai"
  - "nvidia"
  - "google-gcp"
industryTags: "tech"
company: "Huggingface"
summary: "Hugging Face needed to convert approximately 27,000 academic papers to Markdown format to enable their \"chat with paper\" feature powered by HuggingChat, but these papers lacked HTML versions on arXiv. The team used OpenAI's Codex coding agent to orchestrate the entire workflow, which involved selecting the best open-source OCR model (Chandra-OCR 2) from leaderboards, deploying it on Hugging Face Jobs serverless GPU infrastructure using vLLM, and processing all papers across 16 parallel L40S GPU instances. The solution successfully processed 30,000 papers in approximately 29-30 hours at an estimated cost of $850, significantly cheaper than using proprietary APIs, and enabled chat functionality for all papers on the platform."
link: "https://huggingface.co/blog/nielsr/ocr-papers-jobs"
year: 2026
seo:
  title: "Huggingface: Large-Scale OCR Processing of Academic Papers Using AI Coding Agents and Serverless GPU Infrastructure - ZenML LLMOps Database"
  description: "Hugging Face needed to convert approximately 27,000 academic papers to Markdown format to enable their \"chat with paper\" feature powered by HuggingChat, but these papers lacked HTML versions on arXiv. The team used OpenAI's Codex coding agent to orchestrate the entire workflow, which involved selecting the best open-source OCR model (Chandra-OCR 2) from leaderboards, deploying it on Hugging Face Jobs serverless GPU infrastructure using vLLM, and processing all papers across 16 parallel L40S GPU instances. The solution successfully processed 30,000 papers in approximately 29-30 hours at an estimated cost of $850, significantly cheaper than using proprietary APIs, and enabled chat functionality for all papers on the platform."
  canonical: "https://www.zenml.io/llmops-database/large-scale-ocr-processing-of-academic-papers-using-ai-coding-agents-and-serverless-gpu-infrastructure"
  ogTitle: "Huggingface: Large-Scale OCR Processing of Academic Papers Using AI Coding Agents and Serverless GPU Infrastructure - ZenML LLMOps Database"
  ogDescription: "Hugging Face needed to convert approximately 27,000 academic papers to Markdown format to enable their \"chat with paper\" feature powered by HuggingChat, but these papers lacked HTML versions on arXiv. The team used OpenAI's Codex coding agent to orchestrate the entire workflow, which involved selecting the best open-source OCR model (Chandra-OCR 2) from leaderboards, deploying it on Hugging Face Jobs serverless GPU infrastructure using vLLM, and processing all papers across 16 parallel L40S GPU instances. The solution successfully processed 30,000 papers in approximately 29-30 hours at an estimated cost of $850, significantly cheaper than using proprietary APIs, and enabled chat functionality for all papers on the platform."
notion:
  pageId: "342f8dff-2538-80ca-b385-c8ca59187285"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-14T08:45:00.000Z"
  lastEditedTime: "2026-04-14T08:45:00.000Z"
  publishedAt: "2026-04-14T08:49:59Z"
---

## Overview

This case study from Hugging Face demonstrates a sophisticated LLMOps workflow that combines AI coding agents, open-source model selection, serverless GPU infrastructure, and storage optimization to solve a large-scale document processing challenge. The company maintains a platform that indexes arXiv papers, allowing researchers to claim papers, link resources, and engage with content. They introduced a "chat with paper" feature powered by HuggingChat that enables users to interact with research papers conversationally. However, this feature relied on HTML versions of papers from arXiv, which were unavailable for approximately 27,000 indexed papers, creating a significant gap in functionality.

The solution architecture is particularly notable for its use of an AI coding agent (OpenAI's Codex) to orchestrate the entire pipeline rather than manually writing infrastructure code. This represents an emerging pattern in LLMOps where AI assists not just in the application layer but also in the operational deployment and management of AI workloads themselves. The project successfully processed all 27,000+ papers using open-source models on serverless infrastructure, demonstrating both technical feasibility and cost efficiency compared to proprietary alternatives.

## Model Selection and Evaluation

The team needed to select an appropriate open-source OCR model capable of converting PDF documents into Markdown format with interleaved HTML for images and tables. Rather than relying on anecdotal evidence or manual testing, they leveraged Hugging Face's native leaderboard feature called "Evaluation results." This feature transforms Hugging Face datasets into standardized benchmarks where models can submit their performance metrics via pull requests.

For OCR tasks, they identified OlmOCRBench by AllenAI as the authoritative benchmark for evaluating OCR models' ability to convert documents into structured Markdown. By consulting this leaderboard, they selected Chandra-OCR 2 by Datalab, which was the top-performing model at the time. The model is released under an OpenRAIL license, making it suitable for commercial use. This demonstrates a mature approach to model selection based on standardized evaluation rather than trial-and-error or vendor claims.

The use of evaluation leaderboards represents an important LLMOps practice: making model selection decisions based on reproducible benchmarks rather than subjective assessments. This approach provides transparency and defensibility for production model choices while reducing the time and resources needed for internal evaluation.

## AI-Assisted Development with Coding Agents

A distinctive aspect of this case study is the extensive use of OpenAI's Codex coding agent (accessed through the Codex Desktop app) to implement the entire processing pipeline. Rather than manually writing scripts to deploy the Chandra-OCR-2 model on serverless infrastructure, the team prompted Codex with relevant documentation and let it generate the necessary code.

The workflow involved pointing Codex to multiple information sources including the Chandra-OCR-2 model card (to understand how to run it with vLLM), the Hugging Face CLI documentation (to understand how to use serverless GPU infrastructure), and the list of 27,000 arXiv IDs requiring processing. The coding agent then autonomously implemented scripts to orchestrate the entire job submission and monitoring workflow.

This represents an emerging pattern in LLMOps where large language models assist in deploying and managing other AI workloads. The case study explicitly notes "as it's 2026, nowadays we can simply point a coding agent such as Claude Code, Cursor or Codex to a set of URLs and it will figure it out by itself." This suggests a shift in development practices where coding agents handle infrastructure orchestration that would traditionally require significant manual engineering effort.

The team iteratively refined their approach through conversational prompting with Codex. They conducted cost and performance experiments on different GPU types, adjusted storage mechanisms, and monitored job progress—all through natural language interactions with the coding agent rather than manual scripting.

## Infrastructure and Deployment Strategy

The deployment leveraged Hugging Face Jobs, a serverless compute platform supporting both CPUs and GPUs ranging from Nvidia T4s to 8x Nvidia H200s with pay-as-you-go pricing charged by the second. This serverless approach eliminates the need to provision and manage persistent infrastructure, which is particularly suitable for batch processing workloads with variable demand.

To determine the optimal GPU configuration, the team (via Codex) conducted experiments on a subset of 120 papers using different GPU types. They compared Nvidia A10G-large and Nvidia L40S GPUs by launching parallel jobs and measuring throughput. The L40S processed approximately 60 papers per hour (with a maximum of 30 pages per paper) compared to 32 papers per hour on the A10G. While the A10G-large was cheaper per hour, the slower processing speed meant longer total runtime and ultimately higher costs.

Based on these experiments, they selected the L40S and determined that running 16 parallel jobs would complete the entire workload in approximately 29-30 hours at an estimated cost of $850. This compares favorably to using Chandra's proprietary API, which would have cost $1,841.07 in "fast/balanced" mode or $2,761.60 in "high-accuracy" mode. The comparison with 16x A10G-large instances (estimated at $1,350) demonstrates the importance of considering total cost of ownership rather than just hourly rates.

The inference deployment used vLLM, a high-performance inference framework optimized for large language models and vision-language models. vLLM provides features like continuous batching, PagedAttention for efficient memory management, and optimized CUDA kernels that significantly improve throughput compared to naive implementations. Using vLLM with the Transformers-compatible Chandra-OCR-2 model allowed the team to maximize GPU utilization and processing speed.

## Storage Architecture and Optimization

Initially, the pipeline was designed to write results to a Hugging Face dataset. However, the team recognized that this approach was suboptimal for their use case. Since new papers are added daily, storing results in a git-versioned dataset would create an enormous number of commits and poor performance for mutable data.

Instead, they pivoted to using Hugging Face Buckets, which are powered by Xet for fast, cheap, and mutable storage without git versioning. This is more appropriate for frequently updated data where version history is less important than performance and cost efficiency.

The team further optimized the workflow by leveraging hf-mount, a newly launched tool that mounts Hugging Face Buckets (and other repository types) as local filesystems. This abstraction eliminated the need to implement custom download/upload logic in the processing scripts. The OCR jobs could simply write to what appeared to be a local directory, with hf-mount handling the synchronization to remote storage transparently.

This approach significantly simplified the code that Codex needed to generate and reduced potential points of failure related to network operations, retry logic, and error handling. Each of the 16 parallel jobs wrote to its own bucket, and after completion, these were merged into a single bucket for integration into the Paper Pages feature.

## Orchestration and Monitoring

The orchestration workflow managed 16 parallel jobs running simultaneously on separate L40S GPUs. Each job processed a subset of the 27,000 papers, with some jobs completing faster than others depending on the page counts of their assigned papers. The team monitored progress by repeatedly asking Codex to "check the progress," and the coding agent would report how many of the 16 jobs had completed.

Remarkably, all 16 jobs succeeded on the first attempt without requiring restarts or debugging, which the case study attributes to the robustness of the generated code and the reliability of the underlying infrastructure. After approximately one day (29-30 hours), all jobs completed successfully.

The final integration step involved merging the 16 separate buckets into a single consolidated bucket, which was then integrated by team member Mishig into the Paper Pages feature. This enabled the "chat with paper" functionality for all indexed papers, not just those with HTML versions on arXiv.

## Production Integration and User-Facing Features

The OCR processing pipeline serves as infrastructure for Hugging Face's Paper Pages feature, which allows researchers to promote their work, claim papers, link related resources (models, datasets, Spaces, GitHub repositories, project pages), and tag papers with organizational affiliations. The platform supports Reddit-style upvoting and commenting, creating a social layer around academic research.

The "chat with paper" functionality powered by HuggingChat operates by converting paper content into Markdown and using it as context for an LLM. For papers with HTML versions on arXiv, the system converts the HTML to Markdown. For the 27,000 papers without HTML versions, the newly OCR'd Markdown serves the same purpose. This demonstrates a classic RAG (Retrieval-Augmented Generation) pattern where document content is ingested, processed, and provided as context to enable conversational interaction.

The case study notes that one commenter raised concerns about output quality after the OCR integration, asking "How are you planning to check the quality of outputs in this 'Chat with paper' feature after OCR integration? I tried it, not good results." This highlights an important consideration in production LLMOps: the quality of the OCR output directly impacts the quality of the downstream chat functionality. The team's reliance on the OlmOCRBench leaderboard for model selection was intended to mitigate quality issues, but real-world performance may vary depending on the specific characteristics of academic papers compared to the benchmark dataset.

## Cost Analysis and Economic Considerations

The cost comparison provides valuable insights into the economics of different deployment approaches for large-scale AI workloads. Processing 27,000 papers cost approximately $850 using self-managed infrastructure (16x L40S GPUs on Hugging Face Jobs for ~30 hours), compared to $1,841.07 using Chandra's "fast/balanced" API mode or $2,761.60 for "high-accuracy" mode.

This represents a cost reduction of approximately 54-69% compared to using the proprietary API. The savings come from several factors: direct access to GPU compute at wholesale rates, use of open-source models without per-request pricing, and optimization of GPU selection based on throughput rather than just hourly cost.

However, the comparison should be considered carefully. The case study doesn't address the engineering time required for implementation, though the use of Codex presumably reduced this significantly. Additionally, API-based solutions typically include built-in reliability, monitoring, and support, whereas self-managed infrastructure requires more operational overhead. The case study's success on the first attempt may not be typical, and production deployments generally need error handling, retry logic, and monitoring that aren't explicitly discussed.

The serverless pay-as-you-go pricing model is particularly well-suited to this batch processing workload. The team only paid for the approximately 30 hours of actual compute time rather than provisioning infrastructure that would sit idle between processing runs. This represents a significant advantage over maintaining dedicated GPU servers.

## Challenges and Limitations

While the case study presents a successful implementation, several considerations merit attention. First, as noted by a commenter, there are concerns about OCR quality that could affect the downstream chat experience. The team selected the top-performing model from OlmOCRBench, but benchmark performance doesn't always translate perfectly to specific use cases like academic papers with complex mathematical notation, tables, and figures.

Second, the case study mentions processing "at most 30 pages for each paper," suggesting some papers were truncated. This may be a cost-optimization measure, but it means the chat functionality may not have access to the complete content of longer papers, potentially limiting its usefulness for comprehensive papers.

Third, while the use of Codex for orchestration is impressive, it introduces dependencies on proprietary AI services for infrastructure management. If Codex's API becomes unavailable or significantly more expensive, or if the quality of generated code degrades with model updates, this could impact operational capabilities. The case study doesn't discuss version pinning, validation of generated code, or fallback strategies.

Fourth, there's limited discussion of quality assurance and validation. The case study doesn't mention sampling outputs to verify OCR accuracy, comparing results against ground truth for a subset of papers, or establishing quality metrics beyond the benchmark scores. In production LLMOps, validation and monitoring are critical, especially when processing thousands of documents that will directly impact user experience.

## LLMOps Maturity and Best Practices

This case study demonstrates several mature LLMOps practices. The use of standardized benchmarks and leaderboards for model selection shows a data-driven approach to decision-making. The experimentation with different GPU types and parallel job configurations demonstrates performance optimization based on empirical measurements rather than assumptions.

The storage architecture evolution from datasets to mounted buckets shows responsiveness to operational requirements and willingness to optimize based on actual usage patterns. The successful execution of 16 parallel jobs without failures suggests robust error handling and infrastructure reliability, though the case study doesn't detail the specific mechanisms ensuring this reliability.

However, some traditional LLMOps concerns receive limited attention. There's no discussion of model versioning or reproducibility—if Chandra-OCR-2 is updated, how would this affect consistency of the paper corpus? There's limited discussion of monitoring and observability during the processing runs beyond asking Codex for progress updates. Quality metrics, error rates, and validation procedures aren't explicitly covered.

The reliance on AI coding agents for infrastructure orchestration is both a strength and a potential concern. While it dramatically reduces implementation time and lowers barriers to deployment, it may also reduce visibility into the actual implementation details and make debugging more challenging when issues arise. The case study suggests this is becoming standard practice in 2026, but organizations should consider the tradeoffs carefully.

## Broader Implications

This case study illustrates several important trends in LLMOps and AI engineering. First, the combination of open-source models, serverless infrastructure, and AI-assisted development enables relatively small teams to execute large-scale AI deployments that would have required significant engineering resources in earlier years.

Second, the economics of self-managed GPU infrastructure versus proprietary APIs are shifting in favor of direct compute access for large-scale batch workloads, particularly when suitable open-source models are available. Organizations processing substantial volumes should conduct similar cost analyses rather than defaulting to API-based solutions.

Third, the emergence of AI coding agents as infrastructure orchestration tools represents a significant shift in how AI workloads are deployed and managed. The ability to describe requirements in natural language and have code generated automatically reduces the specialized knowledge required for deployment while potentially increasing the pace of iteration.

Finally, the integration of multiple Hugging Face platform capabilities—leaderboards for model selection, Jobs for serverless compute, Buckets for storage, and hf-mount for filesystem abstraction—demonstrates the value of cohesive platform ecosystems that reduce integration overhead and enable teams to focus on application logic rather than infrastructure plumbing.
