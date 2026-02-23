---
title: "Building Production-Ready Healthcare AI That Scales With Model Progress"
slug: "building-production-ready-healthcare-ai-that-scales-with-model-progress"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "698c5385cd0965fae765c3cf"
  exportedAt: "2026-02-23T10:04:49.317Z"
  source: "live"
  lastPublished: "2026-02-12T18:34:12.602Z"
  lastUpdated: "2026-02-12T18:34:12.602Z"
  createdOn: "2026-02-11T10:01:41.497Z"
llmopsTags:
  - "healthcare"
  - "high-stakes-application"
  - "document-processing"
  - "prompt-engineering"
  - "fine-tuning"
  - "few-shot"
  - "human-in-the-loop"
  - "error-handling"
  - "model-optimization"
  - "instruction-tuning"
  - "agent-based"
  - "monitoring"
  - "documentation"
  - "devops"
  - "openai"
  - "anthropic"
industryTags: "healthcare"
company: "Anterior"
summary: "This case study examines Anterior's experience building LLM-powered products for healthcare prior authorization over three years. The company faced the challenge of building production systems around rapidly evolving AI capabilities, where approaches designed around current model limitations could quickly become obsolete. Through experimentation with techniques like hierarchical query reasoning, finetuning, domain knowledge injection, and expert review systems, they learned which approaches compound with model progress versus those that compete with it. The result was a framework for \"Sour Lesson-pilled\" product development that emphasizes building systems that benefit from model improvements rather than being made redundant by them, with key surviving techniques including dynamic domain knowledge injection and scalable expert review infrastructure."
link: "https://chrislovejoy.me/sour-lesson"
year: 2026
seo:
  title: "Anterior: Building Production-Ready Healthcare AI That Scales With Model Progress - ZenML LLMOps Database"
  description: "This case study examines Anterior's experience building LLM-powered products for healthcare prior authorization over three years. The company faced the challenge of building production systems around rapidly evolving AI capabilities, where approaches designed around current model limitations could quickly become obsolete. Through experimentation with techniques like hierarchical query reasoning, finetuning, domain knowledge injection, and expert review systems, they learned which approaches compound with model progress versus those that compete with it. The result was a framework for \"Sour Lesson-pilled\" product development that emphasizes building systems that benefit from model improvements rather than being made redundant by them, with key surviving techniques including dynamic domain knowledge injection and scalable expert review infrastructure."
  canonical: "https://www.zenml.io/llmops-database/building-production-ready-healthcare-ai-that-scales-with-model-progress"
  ogTitle: "Anterior: Building Production-Ready Healthcare AI That Scales With Model Progress - ZenML LLMOps Database"
  ogDescription: "This case study examines Anterior's experience building LLM-powered products for healthcare prior authorization over three years. The company faced the challenge of building production systems around rapidly evolving AI capabilities, where approaches designed around current model limitations could quickly become obsolete. Through experimentation with techniques like hierarchical query reasoning, finetuning, domain knowledge injection, and expert review systems, they learned which approaches compound with model progress versus those that compete with it. The result was a framework for \"Sour Lesson-pilled\" product development that emphasizes building systems that benefit from model improvements rather than being made redundant by them, with key surviving techniques including dynamic domain knowledge injection and scalable expert review infrastructure."
---

## Overview

This case study provides a detailed examination of Anterior's three-year journey building production LLM systems for healthcare prior authorization, written by Chris Lovejoy, a medical doctor and former team member. Anterior automates healthcare administrative workflows for payors, requiring the processing of complex clinical guidelines, patient medical records, and policy documents. The case study is particularly valuable for its honest retrospective on which technical approaches survived the rapid evolution of foundation models and which became obsolete, offering practical lessons for building durable LLM products in specialized domains.

The core thesis, termed the "Sour Lesson" (a corollary to Richard Sutton's Bitter Lesson), argues that product approaches which compound with model progress rather than compete with it are the ones that endure in production. While Sutton's original lesson addressed model training, this application-layer perspective focuses on building products on top of rapidly improving AI systems.

## Production Context and Constraints

Anterior's prior authorization use case involves processing substantial amounts of medical documentation within strict accuracy requirements. A typical case requires analyzing clinical guidelines spanning 20-50 pages, patient medical records exceeding 100 pages, and specific policy documents—all while making clinically sound determinations that affect patient care and payor operations. The product must meet enterprise customer expectations for accuracy, explainability, and reliability while operating in a regulated healthcare environment.

The author emphasizes the fundamental tension in building LLM products: the need to ship functional products with current capabilities while knowing those capabilities will dramatically change. Building too specifically around current limitations creates technical debt, while building too abstractly for future capabilities prevents shipping anything useful today.

## Approaches That Became Obsolete

### Hierarchical Query Reasoning

In summer 2023, working with GPT-3.5-Turbo-16k, the team faced a critical constraint: 16K tokens was insufficient to reason over entire prior authorization cases simultaneously. The author developed a technique called "hierarchical query reasoning" that decomposed policy documents into tree-structured questions. High-level policy requirements were broken down into specific sub-questions, each answerable within the token limit.

The system architecture involved parsing guidelines into a tree of dependent questions, answering each question separately against the medical record starting with leaf nodes, then propagating answers up through parent nodes to reach a final determination. This allowed the system to handle complex cases within the context window constraints while maintaining logical dependencies between different parts of the clinical decision.

However, when GPT-4 Turbo launched in November 2023 with a 128K context window, this elaborate architecture became unnecessary almost overnight. The ability to reason over entire cases at once was not only simpler but actually faster and often more accurate through parallel reasoning. The author invested 1-2 months building this system, and while it successfully acquired the first two enterprise customers, it was replaced in production within six months. This illustrates the risk of building complex workarounds for temporary model limitations.

### Finetuning for Clinical Reasoning

In 2023, conventional wisdom suggested that specialized domains like healthcare required finetuned models to achieve strong reasoning performance. The team hired clinicians to build clinical reasoning datasets and invested in finetuning models to improve medical reasoning quality and control output formatting.

Within 12-18 months, this approach also became obsolete. General frontier models (GPT-4, Claude 3, and successors) became sufficiently capable at clinical reasoning that specialized models offered no meaningful advantage. The foundation models had been trained on enough medical literature, research, and clinical data that medical reasoning capabilities were strong and no longer the limiting factor on product performance.

The author notes that prompting techniques should now be the first approach for improving performance, even in specialized verticals, though this wasn't obvious at the time. This represents a significant shift in LLMOps best practices for vertical AI applications—from assuming domain-specific model training is necessary to recognizing that context engineering and prompting often suffice.

## Approaches That Remained Valuable

### Domain Knowledge Injection ("Clinical Tips")

The team observed that their product often missed context-specific nuance—for example, "conservative therapy" has different meanings in surgical versus medical contexts. In response, they built a scalable library of clinical knowledge that is dynamically injected at inference time based on the operational context.

This approach has remained in production for over two years and serves as a key mechanism for solving the "last mile problem" on a customer-specific basis. Its durability stems from being independent of specific model capabilities while actually scaling with model improvements. As context windows increase, more clinical domain knowledge can be injected. As performance data accumulates, better selection of relevant knowledge for different contexts becomes possible, allowing the knowledge base to scale practically infinitely.

This represents a form of advanced context engineering that doesn't compete with model improvements but rather leverages them. The technique addresses limitations in applying LLMs that aren't inherent to the LLMs themselves—specifically, the lack of customer-specific and context-specific domain knowledge that wouldn't be present in general training data.

### Expert Review System Infrastructure

As the product matured, manual review by the author (a qualified medical doctor) couldn't scale. The team needed a systematic way to capture domain expert insight as data and use it to continuously improve the product. They built a dashboard enabling clinicians to perform structured reviews of AI outputs.

The system was designed to generate multiple forms of valuable data from these reviews:

- Performance metrics to prioritize improvement work
- Identification and classification of failure modes (the specific ways the AI makes mistakes)
- Generation of suggested domain knowledge injections
- Creation of example input-output pairs for in-context learning

This infrastructure remains a core component of Anterior's product, serving three critical functions: reporting performance to customers, accelerating AI iteration cycles, and improving model performance through targeted interventions. The author emphasizes that the data generated by these reviews constitutes a core technical moat for the company—performing more clinician reviews directly translates into a better and more differentiated product.

This approach exemplifies an LLMOps pattern that compounds with model progress. Better models can more effectively utilize the insights captured through expert reviews, whether as in-context examples, performance benchmarks, or sources for domain knowledge. The review infrastructure creates a data flywheel that becomes more valuable as both the AI systems and the dataset mature.

## Framework for Future-Proof LLMOps Decision Making

The author proposes a systematic framework for evaluating whether technical approaches will age well as models improve:

The methodology involves listing all current model limitations and assumptions, brainstorming potential future capabilities and alternative approaches, then creating a matrix mapping each potential product approach against each model evolution scenario. For each combination, teams should assess whether that change makes the approach more relevant, less relevant, or has no impact, with explicit reasoning.

When this framework is applied retrospectively to Anterior's approaches, the pattern becomes clear. Hierarchical query reasoning became less relevant with context window expansion and improved domain reasoning. Finetuning became less relevant as general models improved at clinical reasoning. In contrast, domain knowledge injection became more relevant across multiple dimensions: larger context windows allow more tips, better models use tips more effectively, multimodal capabilities enable richer domain knowledge, and improved reasoning enables better workflow-specific nuance. The expert review system similarly became more relevant as it generates training data that compounds with better models and can capture increasingly sophisticated feedback.

The author emphasizes that predicted obsolescence doesn't necessarily mean avoiding an approach. If a technique serves customers better for the next six months and meaningfully impacts company trajectory (as hierarchical query reasoning did for Anterior), it may still be worth building. The value lies in making hypotheses explicit to enable informed trade-offs about resource allocation.

## Organizational Approaches to LLMOps Resilience

Beyond individual technical decisions, the case study outlines organization-level practices that promote resilience to model evolution:

### Resource Allocation

The author advocated for an explicit 70/30 split at Anterior: 70% of resources optimizing the current product, 30% testing new approaches. The optimal split depends on product nature and risk tolerance. Critically, this experimentation should occur at the workflow level rather than the engineer level—all engineers should do some experimentation rather than having dedicated "experimental" engineers, to prevent anchoring bias in the current approach.

### Culture of Experimentation

Anterior established monthly internal hackathons called "Anterior Labs" with an explicit mandate to disrupt the current approach. Teams would list new models, capabilities, and tools from the past month, then experiment with them. The author reports this was highly successful, with nearly every session yielding ideas that made it into the main product—from new PDF ingestion approaches to the first long-context model implementation of reasoning.

This represents a formalized process for staying current with the rapidly evolving LLM landscape and preventing organizational lock-in to outdated approaches. The regular cadence ensures the team maintains awareness of new capabilities that might supersede current solutions.

### Modular Architecture

The case study emphasizes building codebases that make experimentation cheap through modular architectures where components can be swapped easily. This enables testing whether new approaches actually improve outcomes before committing substantial resources. Low coupling allows replacing entire subsystems when better capabilities emerge.

Critically, the organization must be willing to delete code despite prior investment. The author frames the real sunk cost as maintaining an approach that's been superseded, not the time spent building it initially. This represents a mature perspective on technical debt in rapidly evolving LLM systems.

## Technical Lessons for Production LLM Systems

The most prominent pattern across surviving versus obsolete approaches is that durable techniques focus on overcoming limitations of applying LLMs that aren't inherent to the LLMs themselves. Both domain knowledge injection and expert review systems can be categorized as "context engineering"—getting more relevant and detailed context to the LLM, rather than trying to improve how the LLM leverages that context.

However, the author acknowledges uncertainty about whether even these techniques will remain relevant as AI systems become more agentic. Perhaps future models will autonomously acquire the context they need without requiring engineered context management. This honest acknowledgment of uncertainty reinforces the core thesis: we can't predict the future with certainty, so we must build systems that benefit from multiple possible futures rather than betting on a single trajectory.

## LLMOps Maturity and Production Considerations

The case study implicitly demonstrates several markers of LLMOps maturity. The evolution from manual review by the author to structured expert review infrastructure shows the progression from prototype to production-scale evaluation systems. The shift from finetuning to prompting reflects growing understanding of when different techniques provide actual value versus following industry trends.

The emphasis on performance metrics, failure mode classification, and systematic improvement cycles indicates a mature approach to production ML operations. The integration of customer-specific "last mile" customization through domain knowledge injection demonstrates awareness that vertical AI products require mechanisms for specialized adaptation beyond general model capabilities.

The candid discussion of technical debt—building hierarchical query reasoning that became obsolete—provides valuable transparency about the costs of shipping products with rapidly improving foundation models. The author's framing that this investment was still worthwhile because it acquired early customers shows sophisticated thinking about the interplay between technical optimization and business needs.

## Critical Assessment

While the case study provides valuable insights, it represents a single company's experience in one vertical (healthcare) with specific use cases (prior authorization). The patterns observed may not generalize equally to all domains or applications. The author works in a highly regulated industry with strong accuracy requirements and access to domain experts, which may not apply to all LLM product contexts.

The emphasis on techniques that "compound with model progress" assumes continued improvement in foundation model capabilities at rates similar to 2023-2026. If model progress plateaus or takes different trajectories (for example, toward specialized rather than general capabilities), some recommendations might require revision.

The case study acknowledges but doesn't deeply explore the costs of the approaches that did survive. Building and maintaining domain knowledge libraries and expert review infrastructure represents ongoing operational overhead. The trade-offs between these costs and their benefits would benefit from more quantitative analysis.

Nevertheless, the framework for evaluating technical approaches against multiple future scenarios provides a useful mental model for teams building production LLM systems in any domain. The organizational practices around experimentation, modular architecture, and explicit resource allocation between optimization and exploration represent broadly applicable LLMOps best practices.

## Conclusion

This case study offers a rare, honest retrospective on production LLM system development over a meaningful time horizon. The distinction between approaches that compound with versus compete against model progress provides a valuable lens for technical decision-making in rapidly evolving AI capabilities. The specific examples—from obsolete hierarchical query reasoning and finetuning to durable domain knowledge injection and expert review infrastructure—ground abstract principles in concrete engineering decisions.

For LLMOps practitioners, the key takeaway is the importance of building systems that leverage rather than work around model capabilities, investing in infrastructure that generates compounding data advantages, and maintaining organizational practices that enable rapid adaptation as the foundation model landscape evolves. The framework for explicitly mapping technical approaches against possible future capabilities offers a practical tool for navigating the inherent uncertainty in building on rapidly improving AI systems.