---
title: "AI-Driven Enzyme Design for Advanced Plastic Recycling"
slug: "ai-driven-enzyme-design-for-advanced-plastic-recycling"
draft: false
llmopsTags:
  - "data-analysis"
  - "classification"
  - "poc"
  - "structured-output"
  - "embeddings"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "cost-optimization"
  - "latency-optimization"
  - "guardrails"
  - "open-source"
  - "pytorch"
  - "tensorflow"
industryTags: "energy"
company: "Rhea’s Factory"
summary: "Rhea's Factory is developing enzymatic plastic recycling technology that uses AI and protein language models to design novel enzymes capable of breaking down polymers to their original monomer building blocks. The traditional plastic recycling process only allows materials to be recycled two to three times before quality degradation makes them unusable, limiting recycling rates to approximately 10% globally. Rhea's Factory uses a multi-stage AI platform combining protein language models, structural prediction tools, and custom predictive models to design enzymes that can operate at low temperatures and atmospheric pressure while achieving high selectivity for different plastic types. The AI platform has dramatically accelerated their enzyme discovery timeline compared to traditional trial-and-error laboratory methods, enabling them to explore design spaces beyond what nature has evolved and reducing the number of wet lab experiments needed while increasing hit rates for successful enzyme candidates."
link: "https://www.youtube.com/watch?v=huFaei-6Z4g"
year: 2026
seo:
  title: "Rhea’s Factory: AI-Driven Enzyme Design for Advanced Plastic Recycling - ZenML LLMOps Database"
  description: "Rhea's Factory is developing enzymatic plastic recycling technology that uses AI and protein language models to design novel enzymes capable of breaking down polymers to their original monomer building blocks. The traditional plastic recycling process only allows materials to be recycled two to three times before quality degradation makes them unusable, limiting recycling rates to approximately 10% globally. Rhea's Factory uses a multi-stage AI platform combining protein language models, structural prediction tools, and custom predictive models to design enzymes that can operate at low temperatures and atmospheric pressure while achieving high selectivity for different plastic types. The AI platform has dramatically accelerated their enzyme discovery timeline compared to traditional trial-and-error laboratory methods, enabling them to explore design spaces beyond what nature has evolved and reducing the number of wet lab experiments needed while increasing hit rates for successful enzyme candidates."
  canonical: "https://www.zenml.io/llmops-database/ai-driven-enzyme-design-for-advanced-plastic-recycling"
  ogTitle: "Rhea’s Factory: AI-Driven Enzyme Design for Advanced Plastic Recycling - ZenML LLMOps Database"
  ogDescription: "Rhea's Factory is developing enzymatic plastic recycling technology that uses AI and protein language models to design novel enzymes capable of breaking down polymers to their original monomer building blocks. The traditional plastic recycling process only allows materials to be recycled two to three times before quality degradation makes them unusable, limiting recycling rates to approximately 10% globally. Rhea's Factory uses a multi-stage AI platform combining protein language models, structural prediction tools, and custom predictive models to design enzymes that can operate at low temperatures and atmospheric pressure while achieving high selectivity for different plastic types. The AI platform has dramatically accelerated their enzyme discovery timeline compared to traditional trial-and-error laboratory methods, enabling them to explore design spaces beyond what nature has evolved and reducing the number of wet lab experiments needed while increasing hit rates for successful enzyme candidates."
notion:
  pageId: "360f8dff-2538-8077-b4bd-c19295d3a713"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-14T09:41:00.000Z"
  lastEditedTime: "2026-05-14T09:41:00.000Z"
  publishedAt: "2026-05-17T15:39:13Z"
---

## Overview

Rhea's Factory represents a compelling case study in the application of LLMs and AI agents to production synthetic biology problems. Founded by Arzu (molecular biologist and biochemist) and Mert (former Google product manager with 20 years in technology), the company is developing enzymatic recycling technologies for plastics. The core problem they address is that traditional mechanical and chemical recycling methods degrade plastic quality with each cycle, limiting materials to only two or three recycling iterations. This results in only 10% of manufactured plastic actually being recycled globally.

The company's approach uses enzymes to break down plastic polymers all the way back to their original monomer building blocks, essentially resetting the material to its initial state. This allows for infinite recycling cycles at the same quality level as virgin plastic made from oil. However, discovering and engineering enzymes that can perform this function efficiently under industrial conditions presents enormous scientific challenges. This is where their AI platform becomes central to their production operations.

## AI Architecture and Production System

Rhea's Factory has evolved from a manual, human-orchestrated enzyme design process to an increasingly autonomous agentic system. Their AI platform serves what they describe as an internal customer: their wet lab team. The platform's goal is to minimize the number of physical lab experiments required while maximizing the performance metrics of enzyme candidates tested.

The system is built on multiple foundational models and custom layers. At the base are protein language models, which are the biological equivalent of large language models but trained specifically on protein sequence data. These PLMs are trained on vast amounts of structural protein data from decades of scientific research, as well as synthetically generated protein data. Rhea's Factory doesn't build these foundational models themselves but rather leverages them similarly to how application developers use OpenAI's API.

On top of these foundational models, they've constructed what they describe as an application-specific abstraction layer focused on their particular use case: designing enzymes for plastic polymer degradation. The production system consists of multiple interconnected components that work together in an orchestrated workflow.

## Multi-Stage Pipeline and Orchestration

The enzyme design pipeline involves several distinct stages, each potentially involving different AI models and tools. The first stage is generation, where new enzyme sequences are proposed. This generation phase itself can involve multiple steps and different models. For instance, the system might first use protein language models to ensure a proposed protein is stable, then use either the models directly or their embeddings to verify the sequence is close to known enzyme families with relevant characteristics.

Following generation comes structural prediction. While AlphaFold-like tools can predict how a linear amino acid sequence will fold into a three-dimensional structure, this alone isn't sufficient. Just because an enzyme folds into a particular shape doesn't guarantee it will perform the desired catalytic function. Therefore, a secondary prediction layer assesses whether the folded structure will actually have the required activity.

A critical third component is the prediction model that estimates how a designed enzyme will perform in actual wet lab conditions. This model is trained on proprietary data from Rhea's Factory's own laboratory experiments. While they've only collected hundreds of data points rather than thousands or millions, this specific domain data proves valuable because it's precisely targeted at their application: polymer degradation under their specific process conditions.

The entire system was initially orchestrated by humans, with Arzu or Mert manually coordinating the workflow between different modules. They are now transitioning to an AI-orchestrated system where an intelligent agent manages the flow between different specialized agents, each handling specific aspects of the enzyme design problem. This orchestrator understands the full context of the design problem but provides only the necessary context to each specialized agent, such as a folding agent that only needs to know about structural constraints and guard rails.

## Context Management and Guard Rails

Context management emerges as a critical concern in their LLMOps implementation. The system employs guard rails at multiple stages to keep the design process on track. Guard rails can be defined as inputs based on either prior research or domain expertise. For example, if designing for a specific polymer target, they might specify that sequences must remain within certain enzyme families or that folded structures must meet particular shape criteria.

Each stage of the pipeline can have output guard rails as well. Since they work with potentially millions of sequences computationally, they filter at each step to ensure only sequences meeting specified criteria move forward. This layered guard rail approach allows them to guide the exploration while still maintaining creative freedom within defined boundaries.

The orchestrator agent can coordinate non-linear workflows where agents might need to backtrack. If the folding agent encounters a constraint violation, it can signal back to the generation agent to try different sequences. Similarly, if the prediction model indicates a design won't work in lab conditions, the system can loop back to earlier stages rather than proceeding linearly.

## Handling Hallucination and Creative Exploration

Interestingly, Rhea's Factory identifies LLM hallucination not as a bug but sometimes as a feature in their system. Unlike many production LLM applications where hallucination is strictly undesirable, they actually want certain modules to hallucinate or operate at high temperature settings. The reasoning is that if they constrain the models too tightly to existing research and known protein sequences, they limit exploration to the design space nature has already evolved. Their goal is to explore the vastly larger space of possible enzymes that have never existed in nature.

This represents a sophisticated understanding of LLM behavior in production settings. They tune different agents to different temperature settings depending on whether they want adherence to known patterns or creative exploration. Some modules focus on ensuring basic protein stability using well-established patterns, while others are encouraged to propose novel sequences that venture beyond natural evolution.

## Data Strategy and Feedback Loops

The system implements tight feedback loops between computational predictions and physical experimentation. Every wet lab experiment generates proprietary training data that feeds back into their prediction models. While hundreds of data points might seem limited compared to typical machine learning datasets, the specificity of this data to their exact application makes it highly valuable.

They distinguish between different types of characteristics they're trying to predict. Some properties, like basic catalytic activity, might benefit from training data across adjacent enzyme families where patterns generalize well. Other properties, particularly those related to how enzymes perform in their specific industrial process conditions, require more targeted data collection. For instance, understanding how enzymes interact with downstream separation processes in their reactor system represents a novel design consideration not well-represented in existing training data.

The initial research phase involves comprehensive literature review to understand what's known about relevant enzymes, polymer targets, enzyme families, and performance metrics from published research. This knowledge base establishment is now being automated as part of their agentic workflow, whereas it was previously a manual step conducted by domain experts.

## Performance Metrics and Business Constraints

A particularly sophisticated aspect of their LLMOps implementation is the incorporation of business and process constraints directly into the AI design criteria. They're not simply optimizing for enzyme performance in isolation, but rather for performance within the context of an economically viable industrial process.

Plastics represent a commodity market where cost competitiveness is paramount. Their recycled plastic must compete with virgin plastic made from oil, which is manufactured at enormous scale and very low cost. Therefore, enzyme design must account for factors like enzyme stability and longevity in the reactor, reaction rates that impact throughput, and compatibility with downstream processing steps that affect overall economics.

The AI platform is being extended beyond pure enzyme design to incorporate process optimization. They're introducing a process agent that understands their reactor operations and can propose not just enzyme modifications but also process parameter adjustments. This might include optimizing for enzyme characteristics that reduce downstream separation challenges or improve yield in ways that impact the overall cost structure.

## Evolution Toward Full Autonomy

The company's roadmap shows clear progression toward greater autonomy in their AI systems. Their version one platform required human orchestration at each step, with scientists making decisions about which data to collect, which models to apply, and how to interpret results. The current development focuses on removing human orchestrators from everything except the wet lab experimentation itself.

Looking further ahead, they aim to significantly reduce or potentially eliminate wet lab testing entirely if their prediction models become sufficiently accurate. This would represent full production deployment of AI for enzyme discovery, where computational predictions alone could identify viable enzyme candidates for industrial deployment.

They're also expanding the scope of problems the AI can tackle. Currently, they start with known enzymes that have some activity toward their target polymers and use AI to improve performance metrics like stability and yield. The next phase will involve starting from problem statements rather than existing enzyme templates. For example, they might specify a desire to break a particular chemical bond that enzymes are not currently known to catalyze efficiently, and have the AI system design novel enzymes from scratch to accomplish this function.

## Technical Architecture Details

The system employs embeddings extensively, using protein language model embeddings as inputs to downstream generation models. This allows them to create vector representations of enzyme sequences that capture relevant biochemical properties and can guide the search through design space toward regions with desired characteristics.

Multiple model architectures are employed beyond just protein language models. They use specialized architectures for different problem domains within the overall workflow. For instance, the folding problem might use different model architectures than the activity prediction problem.

The platform processes at scale, evaluating millions of potential sequences computationally before selecting small subsets for physical synthesis and testing. This massive computational screening represents a fundamental advantage over traditional approaches where every candidate requires time-consuming and expensive laboratory validation.

## Domain-Specific Challenges

Several aspects of their production environment are unique to the synthetic biology domain. Enzymes are proteins composed of amino acid sequences, where the sequence determines the three-dimensional folded structure, which in turn determines function. Predicting structure from sequence was a historically difficult computational problem that required PhD-level effort per protein, but has been revolutionized by AI approaches like AlphaFold.

However, knowing the structure still doesn't fully determine function. An enzyme might fold into the right shape but still lack the desired catalytic activity or selectivity. This creates a multi-stage prediction problem where each stage has uncertainty, and the pipeline must account for these compounding uncertainties.

Their target enzymes must function under specific industrial conditions: moderate temperatures around 60-65 Celsius, atmospheric pressure, in the presence of mixed plastic waste streams, and in aqueous reactors with specific chemical compositions. These constraints are quite different from the highly controlled laboratory conditions where much protein research occurs. The AI system must learn to predict performance in these specific industrial contexts.

## Business Model and Scaling

Rhea's Factory is currently scaling their process to a 5,000 ton per year demonstration plant in California in partnership with a bottling company. This represents the transition from laboratory-scale enzyme testing to industrial-scale process validation. The AI platform must scale accordingly to optimize not just enzyme performance but entire process economics at industrial scale.

They envision eventually offering enzyme solutions for multiple plastic types, potentially including custom enzyme design for specific customer applications. A bottling company with particular plastic formulations could receive bespoke enzymes optimized for their specific materials and integration into their existing operations.

## Impact and Results

The AI platform has dramatically impacted their development timelines and design space exploration compared to traditional enzyme engineering approaches. The traditional method involves iterative cycles of identifying important amino acid positions, making modifications, and testing each variant in the lab. This process is slow and typically generates incremental improvements within a narrow design space.

Their AI approach bypasses these limitations by computationally exploring vast design spaces and proposing diverse enzyme candidates that span regions natural evolution never visited. They report being able to access design spaces orders of magnitude larger than what nature has evolved, which represents only a tiny fraction of theoretically possible protein sequences.

The reduction in wet lab experiments required, combined with higher hit rates for successful candidates, represents significant resource savings and faster iteration cycles. Rather than requiring a PhD student's lifetime to characterize a single enzyme variant, they can now computationally evaluate thousands of candidates and select only the most promising for physical validation.

The platform serves as a critical competitive advantage, enabling them to tackle multiple plastic types and continually improve enzyme performance to meet the stringent cost requirements of commodity plastics markets. Their ability to rapidly design and validate new enzymes positions them to disrupt the plastic recycling industry with a fundamentally new technological approach that traditional chemical companies have struggled to develop using conventional methods.
