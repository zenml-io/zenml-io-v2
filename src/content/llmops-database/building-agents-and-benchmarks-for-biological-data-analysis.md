---
title: "Building Agents and Benchmarks for Biological Data Analysis"
slug: "building-agents-and-benchmarks-for-biological-data-analysis"
draft: false
llmopsTags:
  - "healthcare"
  - "data-analysis"
  - "classification"
  - "chatbot"
  - "agent-based"
  - "prompt-engineering"
  - "evals"
  - "human-in-the-loop"
  - "fine-tuning"
  - "open-source"
  - "documentation"
  - "anthropic"
industryTags: "research-academia"
company: "Latch Bio"
summary: "Latch Bio, a vertical AI lab for benchmark and agent engineering in biology, developed specialized LLM-based agents to help scientists analyze complex experimental data from spatial biology, single-cell sequencing, and proteomics. The company recognized that frontier coding models lacked the necessary domain-specific post-training to reliably perform scientific data analysis tasks, so they created SpatialBench and subsequent benchmarks to measure agent capabilities in biological contexts. Starting with agent prototypes in summer 2025, they built production systems that process terabyte-scale datasets, interact with scientists through chat interfaces, and execute complex analysis workflows spanning days or weeks. Their benchmark-driven approach revealed critical issues with model performance including problem ambiguity, verification challenges, and the need for human evaluation, leading to improvements in both their own products and broader adoption by frontier labs like Anthropic."
link: "https://www.youtube.com/watch?v=3ZMUiFaQ3qg"
year: 2026
seo:
  title: "Latch Bio: Building Agents and Benchmarks for Biological Data Analysis - ZenML LLMOps Database"
  description: "Latch Bio, a vertical AI lab for benchmark and agent engineering in biology, developed specialized LLM-based agents to help scientists analyze complex experimental data from spatial biology, single-cell sequencing, and proteomics. The company recognized that frontier coding models lacked the necessary domain-specific post-training to reliably perform scientific data analysis tasks, so they created SpatialBench and subsequent benchmarks to measure agent capabilities in biological contexts. Starting with agent prototypes in summer 2025, they built production systems that process terabyte-scale datasets, interact with scientists through chat interfaces, and execute complex analysis workflows spanning days or weeks. Their benchmark-driven approach revealed critical issues with model performance including problem ambiguity, verification challenges, and the need for human evaluation, leading to improvements in both their own products and broader adoption by frontier labs like Anthropic."
  canonical: "https://www.zenml.io/llmops-database/building-agents-and-benchmarks-for-biological-data-analysis"
  ogTitle: "Latch Bio: Building Agents and Benchmarks for Biological Data Analysis - ZenML LLMOps Database"
  ogDescription: "Latch Bio, a vertical AI lab for benchmark and agent engineering in biology, developed specialized LLM-based agents to help scientists analyze complex experimental data from spatial biology, single-cell sequencing, and proteomics. The company recognized that frontier coding models lacked the necessary domain-specific post-training to reliably perform scientific data analysis tasks, so they created SpatialBench and subsequent benchmarks to measure agent capabilities in biological contexts. Starting with agent prototypes in summer 2025, they built production systems that process terabyte-scale datasets, interact with scientists through chat interfaces, and execute complex analysis workflows spanning days or weeks. Their benchmark-driven approach revealed critical issues with model performance including problem ambiguity, verification challenges, and the need for human evaluation, leading to improvements in both their own products and broader adoption by frontier labs like Anthropic."
notion:
  pageId: "3b4f8dff-2538-8046-aa62-eea701252345"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:33:00.000Z"
  lastEditedTime: "2026-08-06T11:33:00.000Z"
  publishedAt: "2026-08-06T11:45:00Z"
---

## Overview

Latch Bio represents a compelling case study in deploying LLM-based agents for highly specialized scientific workflows. Founded five years ago out of Berkeley, the company evolved from a data infrastructure vendor serving biotech and pharma companies to becoming what they describe as a "vertical AI lab for benchmark and agent engineering" focused on biology. The central thesis driving their work is that biological data analysis can provide an executable, verifiable substrate for training AI agents similar to how code benchmarks have driven progress in software engineering capabilities.

The company works in a domain characterized by extreme data volumes and complexity. Modern biological experiments in single-cell biology, spatial biology, and proteomics generate massive datasets ranging from hundreds of gigabytes to multiple terabytes per experimental run. This scale exceeds what individual scientists can manage on consumer hardware, and the throughput continues to grow rapidly due to advances in molecular capture techniques. The company recognized that this data analysis workflow, which involves choosing biological models, generating data, processing it, contextualizing results against prior literature, and making scientific claims, represents a natural application area for agentic systems.

## Evolution to Production Agent Systems

Latch Bio's journey to production LLM deployment followed an interesting trajectory. The company initially built data tools for storing, transforming, and filing large experimental datasets. Over time, they shifted toward working with kit manufacturers who produce the equipment and software that scientists use to analyze their data, packaging their capabilities as white-labeled solutions. This positioned them well to understand the entire workflow from data capture through analysis.

Around summer 2025, the company began deploying agent prototypes that showed early signs of working despite significant limitations. These production systems featured chat interfaces that allowed scientists to ask questions, build dashboards, and dispatch operations to external compute resources. A typical use case involved taking large spatial measurement files from tissue biopsies and enabling scientists to iteratively explore questions like identifying genes that are overexpressed between malignant and non-malignant regions of tissue.

Critically, the company recognized that while these early agents were "pretty bad," they demonstrated sufficient capability to justify continued investment. The agents needed to orchestrate work involving tools that could take days or weeks to execute, a dramatically different operational profile than typical software development agents.

## The Post-Training Gap

A central challenge Latch Bio identified was that frontier coding models, even without specific post-training on biological tasks, could not be trusted for real scientific work. The models exhibited a capability gap between knowing biology and writing code on one hand, and extracting scientific insight from real-world data on the other. Unlike pure coding tasks, biological data analysis requires integrating domain reasoning, scientific reasoning, and data analysis capabilities in ways that existing models were not trained to handle.

This observation led the company to focus on spatial biology as their initial target domain for focused post-training and benchmark development. Spatial biology represents a technical greenfield with diverse capture technologies spanning advances in chemistry, optics, semiconductors, and physics. The data analysis workflows are highly variable across technology types, tissue contexts, and disease states, with limited consensus in the field about optimal approaches for many analysis steps.

## Building SpatialBench and the Benchmarking Philosophy

Recognizing that existing benchmarks did not measure tasks relevant to biological data analysis, Latch Bio developed SpatialBench in December 2024. The benchmark contained 146 problems spanning different spatial biology kit types and analysis tasks. The design philosophy borrowed heavily from SWE-bench but adapted it for the biological domain.

A key insight driving their benchmark design was that grading end outcomes in biology is too sparse because models perform poorly. This necessitated breaking workflows into manageable chunks to achieve verifiable outcomes. Their approach focused on getting data to states where scientists or theoreticians could begin interpretive work, then defining deterministic graders as Python functions to evaluate success.

Each evaluation in SpatialBench consists of one or more data nodes, task prompts carefully describing scientific goals, grader configurations, and deterministic grading functions. The company identified three critical properties for good biological tests. First, verifiability requires checking success conditions with functions. Second, durability is particularly important because science lacks clear ground truth—lazy ground truth construction can incorrectly fail valid alternative analysis paths, so tasks must reason about properties invariant across different valid approaches. Third, tasks must require interaction with actual data rather than allowing models to answer from memorized knowledge.

## Human Verification and Benchmark Evolution

After observing trajectory data from multiple model releases between January and March 2026, Latch Bio realized many of their initial assumptions were incorrect. The absence of canonical answers in science made human verification essential. They implemented a system where multiple scientists graded each other's work as the best proxy for ground truth.

This human verification process revealed critical issues with their initial benchmark design. Problem ambiguity emerged as a major concern—tasks that seemed well-specified actually created numerous open choices. For example, a task asking agents to split gene lists into activation categories, score cells, find neighboring cells using an "appropriate radius," and compute correlations left multiple interpretation points unclear: how to split lists, define inflammatory genes, normalize data, determine appropriate radii, and aggregate counts.

Another issue involved the prevalence of arbitrary numerical thresholds traditionally used in bioinformatics for quality control. The process of teaching machines to perform these tasks forced more rigorous reasoning about whether these thresholds represented meaningful biological structure or just historical conventions. After two rounds of human verification attempts, the company produced and published a verified subset of their benchmark.

## Long-Horizon Extensions and Rubric Development

Recognizing that frontier capabilities were beginning to catch up with their initial benchmarks, Latch Bio developed longer-horizon tasks to stay ahead and better simulate real scientific work. These tasks use multiple experiment types, span entire workflows rather than isolated chunks, and require interpreting each step against experimental designs, prior literature, and original research goals.

Creating these long-horizon tasks proved resource-intensive, with each task requiring approximately a week of work from three-person teams. An example task asks whether an agent can reconstruct a metastatic niche in a tumor by analyzing genetic and mRNA data from primary tumor biopsies and metastatic lesions to identify which parts of the original tumor seeded metastatic growth. This capability would enable identifying genetically fit tumor regions that cause progression and constructing targeted medicines accordingly. The company notes that current models cannot solve these problems correctly, though progress is occurring.

For these long-horizon evaluations, verifiable rewards at completion are uninformative for understanding model capabilities or guiding improvement. This led to experimentation with rubrics based on identifying "choke points"—nodes in the tree of possible analysis paths that are invariant across different valid approaches. While these rubric-based evaluations show association with verifiable outcomes, they exhibit only loose numerical correlation, making the company hesitant to fully trust them for reinforcement learning or definitive benchmarking. They continue to believe verifiable outcome structures will be more important for driving intelligence progress.

## Production Deployment Considerations

The production deployment of these agents involves several distinctive LLMOps challenges. The tools that agents orchestrate can take days or weeks to execute, requiring robust handling of long-running processes and state management. The systems process terabyte-scale datasets that exceed typical storage capabilities. Scientists interact with these systems iteratively over extended periods, exploring complex questions that evolve as preliminary results emerge.

The company maintains a customer base primarily among kit manufacturers who integrate these agent capabilities into their own offerings. This creates an interesting deployment model where Latch Bio's technology gets white-labeled and distributed through partners' existing customer relationships with end-user scientists.

## Benchmark Expansion and Ecosystem Impact

Building on the SpatialBench foundation, Latch Bio has systematically expanded to other experimental modalities. They published benchmarks covering single-cell biology, epigenomics focusing on RNA and chromatin structure, and long-horizon extensions of these domains. The company is now indexing the complex landscape of drug discovery, starting with a benchmark on preclinical pharmacology for small molecules and systematically addressing pieces of the program landscape from discovery through development to translation, stratified by therapeutic and experiment types.

An interesting aspect of their LLMOps practice is the organic adoption of their benchmarks by frontier labs. Anthropic has incorporated SpatialBench and related benchmarks into their model cards without coordinating with Latch Bio in advance. This creates a virtuous flywheel where benchmark development informs their product capabilities, frontier labs compete on these benchmarks improving base model performance, and these improvements enhance Latch Bio's production systems.

## Biosecurity and Red-Teaming

Latch Bio recently acquired a company focused on biosecurity and established a dedicated biosecurity team. In collaboration with American Wetware and Aquid, they released work addressing how refusals function in biological contexts. Current frontier models exhibit problematic behavior, frequently refusing routine scientific questions about basic topics like mitochondria while less frequently refusing red-team tasks designed to appear innocuous but involve dangerous capabilities like cloning toxin genes into bacteria while claiming they're benign fluorescent proteins, or bootstrapping viruses.

This work represents an important dimension of production LLMOps for biological agents—ensuring safety guardrails function appropriately without over-restricting legitimate scientific inquiry. The finding that routine tasks trigger refusals drastically more often than red-team tasks suggests current safety mechanisms are poorly calibrated for scientific domains.

## LLMOps Lessons and Tradeoffs

Several broader LLMOps insights emerge from Latch Bio's experience. First, domain-specific benchmarking is essential when deploying agents in specialized fields. Generic coding benchmarks or academic QA tasks do not transfer well to measuring capabilities required for real scientific work. Second, the verification problem looks fundamentally different in domains lacking ground truth. While software engineering can verify correctness through test execution, scientific analysis admits multiple valid approaches requiring human judgment and carefully constructed invariant properties.

Third, the timeline considerations differ substantially from typical software agents. When tools take days or weeks to execute, the operational requirements around state management, error recovery, and user interaction patterns change significantly. Fourth, the relationship between benchmarking and product development can be mutually reinforcing when benchmarks are adopted by frontier labs, creating feedback loops that improve base model capabilities in ways that directly benefit production systems.

The company's approach also illustrates important tradeoffs. Their benchmark-driven methodology requires substantial investment—individual long-horizon tasks taking person-weeks to develop. The move toward human verification and rubrics introduces subjectivity and scaling challenges compared to deterministic evaluation. The focus on verifiable outcomes over rubric scores reflects uncertainty about which evaluation approaches will prove most useful for capability development.

Additionally, while Latch Bio describes impressive progress, the presentation acknowledges that models remain far from reliably solving real scientific problems. The long-horizon tasks remain unsolved, and even spatial analysis tasks that seem tractable reveal issues with problem ambiguity and verification when examined carefully. This suggests that despite progress in LLMOps practices, fundamental model capabilities remain a significant bottleneck for scientific agent deployment.

The case study ultimately presents a balanced view of early-stage production deployment of LLM agents in a highly specialized domain. The company has built working systems serving real customers, developed influential benchmarks adopted by frontier labs, and established patterns for verification and evaluation in domains lacking ground truth. However, they remain candid about limitations, ongoing challenges with model reliability, and the substantial gap between current capabilities and the full scope of scientific work these systems aspire to automate.
