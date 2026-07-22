---
title: "Autonomous Agent System for Scientific Machine Learning Model Optimization"
slug: "autonomous-agent-system-for-scientific-machine-learning-model-optimization"
draft: false
llmopsTags:
  - "healthcare"
  - "code-generation"
  - "high-stakes-application"
  - "multi-modality"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "model-optimization"
  - "harness-engineering"
  - "documentation"
  - "openai"
  - "google-gcp"
industryTags: "healthcare"
company: "Radicait"
summary: "Radicait developed an autonomous agent system to address the challenge of improving scientific machine learning models, specifically for generating synthetic PET scans from CT images for cancer detection. The core problem was that traditional coding agents would saturate after implementing initial optimizations, lacking the ability to generate novel research hypotheses needed for continued improvement. The solution involved creating a hierarchical decomposition framework that breaks down complex scientific problems into components (data, architecture, training, metrics), enabling LLMs to generate more radical and comprehensive hypotheses for model improvement. The system uses multiple specialized models in collaborative and adversarial loops, with reasoning models like GPT-4.5 for hypothesis generation and multimodal models for qualitative review of results, allowing the research loop to continue beyond the typical saturation point."
link: "https://www.youtube.com/watch?v=XLEYtv3cMlw"
year: 2026
seo:
  title: "Radicait: Autonomous Agent System for Scientific Machine Learning Model Optimization - ZenML LLMOps Database"
  description: "Radicait developed an autonomous agent system to address the challenge of improving scientific machine learning models, specifically for generating synthetic PET scans from CT images for cancer detection. The core problem was that traditional coding agents would saturate after implementing initial optimizations, lacking the ability to generate novel research hypotheses needed for continued improvement. The solution involved creating a hierarchical decomposition framework that breaks down complex scientific problems into components (data, architecture, training, metrics), enabling LLMs to generate more radical and comprehensive hypotheses for model improvement. The system uses multiple specialized models in collaborative and adversarial loops, with reasoning models like GPT-4.5 for hypothesis generation and multimodal models for qualitative review of results, allowing the research loop to continue beyond the typical saturation point."
  canonical: "https://www.zenml.io/llmops-database/autonomous-agent-system-for-scientific-machine-learning-model-optimization"
  ogTitle: "Radicait: Autonomous Agent System for Scientific Machine Learning Model Optimization - ZenML LLMOps Database"
  ogDescription: "Radicait developed an autonomous agent system to address the challenge of improving scientific machine learning models, specifically for generating synthetic PET scans from CT images for cancer detection. The core problem was that traditional coding agents would saturate after implementing initial optimizations, lacking the ability to generate novel research hypotheses needed for continued improvement. The solution involved creating a hierarchical decomposition framework that breaks down complex scientific problems into components (data, architecture, training, metrics), enabling LLMs to generate more radical and comprehensive hypotheses for model improvement. The system uses multiple specialized models in collaborative and adversarial loops, with reasoning models like GPT-4.5 for hypothesis generation and multimodal models for qualitative review of results, allowing the research loop to continue beyond the typical saturation point."
notion:
  pageId: "3a5f8dff-2538-8071-b191-cd90a1a0568d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-22T07:24:00.000Z"
  lastEditedTime: "2026-07-22T07:24:00.000Z"
  publishedAt: "2026-07-22T07:40:18Z"
---

## Overview

Radicait is working on a challenging medical imaging problem: generating synthetic PET scans from CT scans to help identify cancerous nodules in the lung. The speaker, Sina Shahande, presents a sophisticated approach to using autonomous AI agents for scientific machine learning tasks that goes significantly beyond simple coding assistants. The fundamental insight driving this work is that while coding agents excel at implementation and running experiments, they typically saturate at a certain performance level because they lack the ability to generate novel research hypotheses and what the speaker calls "research taste."

The case study is particularly valuable because it addresses a real limitation in current LLMOps practice: most autonomous coding systems can optimize within a known solution space but struggle with the open-ended, long-horizon problems typical of scientific research. The medical imaging application provides a concrete example where continuous innovation is required, not just iterative refinement.

## The Core Problem: Hypothesis Generation Bottleneck

The presentation begins by referencing the concept of auto-researcher or auto-research, drawing on work that involves having ML models and coding agents optimize code to minimize errors through hill climbing. While this approach works well for bounded coding tasks, it fails for open-ended scientific problems. The speaker illustrates this with a conceptual graph showing that AI agents saturate at a certain performance level, while good human researchers continue improving and top researchers improve even more dramatically over time.

The key differentiator is the ability to generate good hypotheses about how models could be improved or problems could be solved. In the scientific method cycle of observation, questioning, hypothesis generation, experimentation, and learning, the speaker identifies hypothesis generation as the most difficult bottleneck for autonomous coding agents. The learning and implementation components can be addressed through better memory organization and patterns, but generating truly novel and effective hypotheses remains challenging.

## The Medical Imaging Application

Radicait's specific use case involves translating CT scans to PET scans through machine learning. When a patient has a nodule in the lung, determining whether it's cancerous requires a PET scan, which is time-consuming and difficult to perform. The company uses ML-based image translation to learn the structure of the body and infer what would appear in a PET scan by modeling how different tissues absorb radioactive tracers. Tumors typically show high metabolic activity and shine brightly in PET scans.

The model architecture uses an encoder-decoder structure typical of GAN models, with the CT scan encoded and then decoded into a synthetic PET image. The speaker notes that like most ML projects, 80% of the work involves data preparation and establishing appropriate metrics for measuring image fidelity between synthetic and real PET scans. However, the challenge becomes how to continuously improve the model beyond the initial baseline.

The speaker presents examples from real iterations in their codebase, showing a range of attempted improvements where some become dead ends, some don't improve performance, and the system eventually saturates. At this saturation point, fundamentally new ideas are needed. The initial model used 2.5D convolutions, treating each CT slice with 2D convolutions stacked over channels. A typical ML coding agent would explore hyperparameters and known optimization techniques but wouldn't spontaneously propose radical architectural changes like moving to full 3D convolutions, which requires restructuring the entire problem.

## The Hierarchical Decomposition Solution

The core innovation presented is a technique for inducing better hypothesis generation by explicitly decomposing problems into hierarchical components. This approach is explicitly inspired by chain-of-thought prompting but applied at a structural, architectural level rather than just at reasoning time.

The process begins by having the LLM analyze the codebase and create a hierarchy of documents representing different components of the problem. For the medical imaging task, this includes domains such as data preparation, core architecture, training loss, operational aspects of ML modeling, metrics and evidence, peripheral scripts, and data preparation workflows. Each of these components can be further decomposed into sub-components, creating a multi-level hierarchy.

The speaker demonstrates this using Obsidian to visualize the generated documentation structure. At the top level is a README with the problem statement. Level two documents break down into major domains, and level three documents detail specific implementations. For example, the model architecture document describes the 2.5D generator and links to the actual code. This hierarchy is not manually created but induced through prompting, with the coding agent analyzing the codebase and generating structured documentation.

## Hypothesis Generation at Scale

Once the hierarchical decomposition exists, the system can use it as a scaffold for comprehensive hypothesis generation. Instead of simply asking the LLM to optimize the codebase given an objective, which leads to saturation, the system can now systematically explore improvements across all components of the hierarchy.

The speaker describes asking the system to generate 100 different solution hypotheses by considering modifications to each component in the hierarchy. This structured approach enables much more comprehensive search through the solution space. Critically, it allows the system to propose radical changes like moving from 2.5D to 3D convolutions, ideas that would otherwise be missed.

The generated hypotheses can then be reviewed through adversarial or collaborative processes involving multiple agents or models. This review step helps filter and refine hypotheses before implementation. The overall loop follows a cycle: start with codebase and metrics, check if goals are achieved, hypothesize required changes using the hierarchical decomposition, implement changes, and repeat.

## Multi-Agent Collaboration and Tool Integration

Beyond the hierarchical decomposition for hypothesis generation, the speaker describes using multiple specialized models for different aspects of the scientific loop. This represents a sophisticated multi-agent architecture where different models contribute their specific strengths.

For qualitative evaluation tasks, the system employs multimodal models like Gemini to review generated images. In medical imaging registration, where two scans must be aligned, many metrics are qualitative rather than purely quantitative. A human scientist would visually inspect alignments to assess quality. The system replicates this by having a multimodal model review images and provide opinions on whether scans are correctly aligned, whether lung masks are properly applied, and whether images are correctly cropped or truncated.

For hypothesis generation and critique, the system uses more powerful reasoning models like GPT-4.5 Pro. These models have greater test-time compute and inference-time compute capabilities, making them better suited for generating novel hypotheses and providing detailed critiques of implemented changes. The speaker specifically mentions using Peter Spinberger's Oracle CLI tool, which packages code and data to send to the GPT-4.5 Pro API, facilitating this integration.

This multi-model approach enables both adversarial and collaborative processes within the optimization loop. After each implementation, the system asks the reasoning model to assess whether the implementation was effective given the outcomes, and what should be done next. This creates a more robust feedback cycle than relying on a single model for all tasks.

## Image Registration Case Study

The speaker provides a detailed example of the image registration problem to illustrate the quality control aspects of the system. Image registration involves aligning CT and PET scans that were taken at different times. Initially, these scans are misaligned because of patient movement, respiration, and different positioning across scanning sessions or with different scanners.

The registration process is itself an optimization loop with its own goal of achieving good alignment. However, it has multiple metrics that are difficult to quantify. The human scientist approach would involve manually reviewing images one by one to assess quality. The speaker shows examples where a lung mask needs to be correctly applied, and the system needs to determine if scans are properly cropped or truncated.

By equipping the coding agent with multimodal review skills, the system can perform this quality control autonomously. The multimodal model is invoked as part of the metrics evaluation to provide qualitative assessment of the images. This allows the registration optimization loop to proceed without constant human intervention for quality checks.

## LLMOps Architecture and Implementation Considerations

From an LLMOps perspective, this case study demonstrates several important principles for production AI systems tackling complex scientific problems:

**Explicit Scaffolding**: Rather than relying on models to implicitly reason about problem structure, the system explicitly generates hierarchical documentation that serves as a reasoning scaffold. This is automatically generated through prompting but provides a persistent structure that guides hypothesis generation.

**Test-Time Compute Scaling**: The hierarchical decomposition provides a principled way to scale test-time compute. By systematically considering changes to each component, the system can generate large numbers of tokens exploring different solution paths in a structured rather than random manner.

**Heterogeneous Model Orchestration**: Different models are used for different tasks based on their strengths. Multimodal models handle visual quality assessment, while more capable reasoning models handle hypothesis generation and critique. This requires careful orchestration and API integration.

**Loop Closure with Human-Like Processes**: The system attempts to replicate the scientific method's complete loop, including qualitative assessment that scientists would perform. This is critical for domains where not all metrics can be easily quantified.

**Adversarial and Collaborative Multi-Agent Patterns**: The use of multiple agents reviewing and critiquing each other's outputs helps improve hypothesis quality before expensive implementation and testing.

**Skills as Composable Components**: The speaker describes building skills like image review that can be invoked as needed within the optimization loop. This suggests a modular architecture where capabilities can be composed.

## Limitations and Future Directions

The speaker is refreshingly candid about current limitations. A major bottleneck is that current multimodal models lack deep understanding of scientific images. For example, identifying tiny cancerous nodules in CT scans requires training that current general-purpose models don't have. This limits the ability to fully close the loop with autonomous observation as a trained scientist would perform.

The speaker suggests that the hierarchical decomposition and explicit problem breakdown techniques are somewhat analogous to how chain-of-thought prompting extended the capabilities of base models like GPT-4. These are architectural patterns or "tricks" that compensate for limitations in current models. As models improve with better post-training for problem decomposition and compartmentalization, some of these explicit techniques may become less necessary. However, in the current state of the technology, explicit hierarchical decomposition provides significant value.

Another implicit limitation is that the system still requires significant human involvement to set up the initial problem structure and validate that the hierarchical decomposition is meaningful. The speaker mentions manually introducing ideas during the coding loop when the system saturates, suggesting that full autonomy hasn't been achieved.

## Production Considerations

While the presentation is focused on scientific research rather than production deployment, several LLMOps considerations emerge:

**Cost Management**: Generating 100 hypotheses and using powerful reasoning models like GPT-4.5 Pro with large context windows for code and data represents significant API costs. Production systems would need careful cost monitoring and potentially batching strategies.

**Iteration Time**: Scientific optimization loops can be very long-horizon. Each iteration may require training large models, which takes substantial time. The system needs to manage these long-running processes and maintain state across iterations.

**Reproducibility**: Scientific research requires reproducibility, so the system would need careful versioning of prompts, model checkpoints, random seeds, and the entire experimental pipeline.

**Evaluation Infrastructure**: While the speaker discusses metrics for the specific imaging task, a production system would need comprehensive evaluation infrastructure to track hypothesis generation quality, implementation success rates, and overall research productivity gains.

**Human Oversight**: Despite the "autonomous" framing, these systems likely still require significant human oversight, particularly for validating that proposed radical changes are scientifically sound before investing resources in testing them.

## Assessment and Balanced View

This case study presents genuinely innovative approaches to using LLMs for scientific research, particularly the hierarchical decomposition technique for improving hypothesis generation. The medical imaging application is compelling and the limitations of current approaches are clearly articulated.

However, several caveats should be noted. First, the presentation doesn't provide quantitative results on how much the hierarchical decomposition approach actually improves model performance or research velocity compared to baselines. The speaker shows it enables radical ideas like 3D convolutions that wouldn't otherwise emerge, but doesn't demonstrate that these ideas actually worked or quantify the overall improvement in the research process.

Second, the system still appears to require significant human involvement. The speaker mentions introducing ideas manually when the system saturates, which suggests the autonomous loop doesn't fully eliminate the original problem of saturation, but rather extends the point at which it occurs.

Third, the generalizability of this approach beyond the specific medical imaging domain is unclear. The technique seems most applicable to complex scientific ML problems with clear optimization objectives, but may be less relevant for other types of scientific research or for production ML systems that aren't continuously optimizing.

The multi-agent architecture with specialized models for different tasks is well-conceived but also introduces complexity. Orchestrating multiple models, managing their interactions, and ensuring the overall system remains coherent and cost-effective are non-trivial LLMOps challenges that aren't deeply addressed.

The reliance on external tools like Oracle CLI for GPT-4.5 Pro integration and Obsidian for visualization suggests a relatively bespoke implementation rather than a productionized platform. This is appropriate for a research setting but would need significant engineering to become a robust production system.

Despite these limitations, the work represents meaningful progress on an important problem. The explicit hierarchical decomposition is a clever technique that could be adapted to other domains, and the multi-agent architecture with specialized models is a pattern likely to become more common as the model ecosystem matures. The focus on replicating human scientific reasoning processes provides a useful framework for thinking about autonomous research systems.
