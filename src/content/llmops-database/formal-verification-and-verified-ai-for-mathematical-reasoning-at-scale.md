---
title: "Formal Verification and Verified AI for Mathematical Reasoning at Scale"
slug: "formal-verification-and-verified-ai-for-mathematical-reasoning-at-scale"
draft: false
llmopsTags:
  - "code-generation"
  - "high-stakes-application"
  - "structured-output"
  - "regulatory-compliance"
  - "fine-tuning"
  - "few-shot"
  - "instruction-tuning"
  - "model-optimization"
  - "human-in-the-loop"
  - "evals"
  - "latency-optimization"
  - "open-source"
  - "documentation"
  - "openai"
  - "anthropic"
  - "meta"
  - "google-gcp"
  - "microsoft-azure"
industryTags: "research-academia"
company: "Axiom Math"
summary: "Axiom Math is building AI systems for superhuman mathematical reasoning by combining formal verification with large language models. Their approach uses Lean, a formal proof verification language, to ground AI-generated mathematical proofs and code, achieving verified generation that offers better sample efficiency than informal approaches. The company achieved a perfect score on the Putnam exam in December 2025, scoring 120/120 points compared to the best human's 110 and the best informal LLM's 103. Their system, Axiom Prover, uses post-trained foundation models with reinforcement learning on Lean data, enabling recursive decomposition of proof goals and learning to backtrack. Beyond mathematics, they view formal verification as foundational infrastructure for verified reasoning across software and hardware domains, positioning it as critical for AI collaboration and super intelligence rather than merely a compliance mechanism."
link: "https://www.youtube.com/watch?v=abYcV5LHMG4"
year: 2025
seo:
  title: "Axiom Math: Formal Verification and Verified AI for Mathematical Reasoning at Scale - ZenML LLMOps Database"
  description: "Axiom Math is building AI systems for superhuman mathematical reasoning by combining formal verification with large language models. Their approach uses Lean, a formal proof verification language, to ground AI-generated mathematical proofs and code, achieving verified generation that offers better sample efficiency than informal approaches. The company achieved a perfect score on the Putnam exam in December 2025, scoring 120/120 points compared to the best human's 110 and the best informal LLM's 103. Their system, Axiom Prover, uses post-trained foundation models with reinforcement learning on Lean data, enabling recursive decomposition of proof goals and learning to backtrack. Beyond mathematics, they view formal verification as foundational infrastructure for verified reasoning across software and hardware domains, positioning it as critical for AI collaboration and super intelligence rather than merely a compliance mechanism."
  canonical: "https://www.zenml.io/llmops-database/formal-verification-and-verified-ai-for-mathematical-reasoning-at-scale"
  ogTitle: "Axiom Math: Formal Verification and Verified AI for Mathematical Reasoning at Scale - ZenML LLMOps Database"
  ogDescription: "Axiom Math is building AI systems for superhuman mathematical reasoning by combining formal verification with large language models. Their approach uses Lean, a formal proof verification language, to ground AI-generated mathematical proofs and code, achieving verified generation that offers better sample efficiency than informal approaches. The company achieved a perfect score on the Putnam exam in December 2025, scoring 120/120 points compared to the best human's 110 and the best informal LLM's 103. Their system, Axiom Prover, uses post-trained foundation models with reinforcement learning on Lean data, enabling recursive decomposition of proof goals and learning to backtrack. Beyond mathematics, they view formal verification as foundational infrastructure for verified reasoning across software and hardware domains, positioning it as critical for AI collaboration and super intelligence rather than merely a compliance mechanism."
notion:
  pageId: "377f8dff-2538-80f6-b035-f0acda0a6248"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-06T05:30:00.000Z"
  lastEditedTime: "2026-06-06T05:30:00.000Z"
  publishedAt: "2026-06-06T05:52:32Z"
---

## Overview

Axiom Math represents a distinctive approach to productionizing LLMs for mathematical reasoning and formal verification. Founded in early 2025, the seven-to-eight-month-old company raised a $200 million Series A at a $1.6 billion valuation, reflecting strong investor conviction in formal verification as critical infrastructure for AI systems. The company's core thesis is that verified AI generation—combining informal reasoning with formal proof verification—provides superior performance characteristics and sample efficiency compared to purely informal approaches, making it feasible for a startup with limited compute resources to match or exceed frontier lab capabilities on superhuman tasks.

The company views verification not as a tax or compliance burden for closed industries, but rather as a mechanism for scaling and compounding intelligence. This perspective draws on historical mathematical practice where formalization helped brilliant mathematicians like Ramanujan extend their capabilities. Axiom positions formal verification as enablement for human-AI and future AI-AI collaboration, moving from a defensive posture about hallucinations to an offensive strategy about performance gains.

## Production System Architecture

Axiom Prover is an ensemble system composed of multiple models that undergo post-training. The architecture starts with off-the-shelf foundation models, with a preference for open-source base models that have coding and natural language capabilities. These base models are then subjected to continued pre-training or fine-tuning, followed by reinforcement learning specifically for formal mathematics.

The system heavily relies on Lean data—formal mathematical proofs written in the Lean programming language. Lean serves as both a functional programming language and a formal verification system based on the Curry-Howard correspondence, which establishes an equivalence between proofs and programs. This dual nature is critical: mathematicians can use Lean purely for coding (one candidate reportedly implemented autograd in Lean during an interview), purely for formal mathematics, or for the integrated approach Axiom employs.

The production pipeline involves standard techniques from the RL for formal math community, but with significant innovations. The team found that scaling inference has almost no wall—they can recursively decompose proof goals into many sub-goals and learn to backtrack effectively. This recursive decomposition is central to handling complex mathematical problems at scale.

## Verification Infrastructure and Tooling

Axiom recently released Axiom Lean Engine (AXL), a suite of 14 proof validation and manipulation tools built in Lean's meta-programming language. These tools are provided free to the community and have been rapidly adopted. Key capabilities include:

- **Verify Proof**: Ensures Lean code contains no cheating mechanisms, doesn't assume weird axioms, and produces logically valid proofs. This tool is reportedly 100x faster than existing comparators for verification tasks.
- **Repair Tools**: Enable different repair attempts to transform broken Lean code into valid code, offering a cheaper and more straightforward alternative to LLM-based repair methods.
- **Auto-formalization Support**: While auto-formalization (converting informal mathematical statements to formal Lean specifications) remains challenging due to lack of grounding signals, the tooling supports test-case-driven development where input-output pairs ground the formalization process.

The infrastructure handles massive proof trees, with Axiom Prover demonstrated to scale from 40 nodes to 4,000 nodes in tree complexity. On the Code Murina benchmark—designed to evaluate code generation with formal proof—Axiom achieved 99% accuracy (187 of 189 problems solved with both code and proof), compared to their competitor's 96% on proof-only tasks and 11-12% for other formal math systems on the combined task.

## Performance Characteristics and Results

The production system achieved several notable benchmarks demonstrating superhuman performance:

- **Putnam Exam 2025**: Perfect score of 120/120 points, compared to the best human student's 110 and DeepSeek's 103 (the best informal LLM). This marked the first time a formal math system exceeded informal LLM performance on a major benchmark.
- **IMO Performance Context**: While AlphaProof's 28/42 score in 2024 was transformative, Axiom notes that across 2024-2025, AI models could solve all non-combinatorics problems. The differential came from combinatorics questions, where creative construction steps remain challenging for formal systems.
- **Research Conjectures**: The system has proven open research problems across number theory, commutative algebra, algebraic geometry, discrete math, and probability—domains where MathLib (Lean's undergraduate mathematics library) has sufficient definitional infrastructure.

These results validate the core LLMOps hypothesis that verified generation offers performance gains through better sample efficiency. With orders of magnitude less data than informal systems, the formal approach achieved superior results on superhuman tasks.

## Data Strategy and Synthetic Data Generation

Axiom maintains what they describe as a "really massive database" of Lean proofs, much of it synthetically generated. This represents a time-based competitive moat rather than a permanent advantage—the company executes rapidly to maintain a buffer, but acknowledges that proprietary data accumulation is fundamentally about execution speed rather than exclusive access.

The data strategy includes:

- **MathLib Foundation**: Leveraging the community-built Lean mathematics library, which contains formalized undergraduate mathematics. The ease of codifying different mathematical domains varies significantly—algebra formalizes more easily than analysis due to complexities around convergence and limits.
- **Domain Coverage Limitations**: The system performs poorly on domains lacking definitional infrastructure in MathLib, such as differential topology and differential geometry. Performance depends critically on existing formalized definitions to build upon.
- **Mathematical Discovery Integration**: Beyond proving, Axiom invests in mathematical discovery tools for generating constructions (graphs, sequences, mathematical objects) that help formulate conjectures before proof attempts. They're open-sourcing entire code bases for these discovery tools, targeting mathematicians and theoretical physicists who need construction-finding capabilities.

The interplay between informal and formal approaches is evident in the data generation strategy. While some advocate for pure self-play approaches (like AlphaZero for math), Axiom pursues a hybrid path where informal reasoning and formal verification work together, with ongoing work on recursive self-improvement where Axiom Prover's daily mathematical work feeds back into model improvement.

## Deployment Model and API Strategy

Axiom released a verification API that developers can integrate into their workflows. Early adopters report using Claude combined with Axiom's tools as their standard setup for Lean development. This represents a strategic positioning: rather than compete directly with frontier labs on general coding capabilities, Axiom offers specialized verification as an API service that complements coding-focused LLMs.

The deployment philosophy treats verification capability as infrastructure that other AI systems can call, similar to how frontier labs partner with search startups like Exa and Perplexity for specialized search capabilities. The value proposition for frontier labs is to "call Axiom API for verification" rather than spinning up dedicated formal verification teams—especially given the specialized talent requirements (meta-programming expertise in Lean is particularly rare) and strategic focus needed.

For enterprise applications, the vision extends to verified code generation where AI generates both programs and formal proofs that the programs satisfy specifications. This decomposition approach envisions:

- High-level sketching and planning (potentially by general-purpose LLMs)
- Recursive decomposition into finer-grained subtasks
- Verified component generation at appropriate granularity
- Composition with verifiability conditions and proofs

## Challenges and Limitations in Production

Several significant challenges emerged from deploying formal verification systems:

**Specification Problem**: Even with perfect verification capability, specifying what needs to be proven remains fundamentally difficult. Humans struggle to fully specify requirements, and anything unspecified cannot be proven. The company views this as an interactive process where informal reasoning helps generate specification proposals, with AI suggesting test cases and edge cases ("have you thought about this case?") to refine specifications.

**Auto-formalization Grounding**: Converting informal problem statements (like competition problems written in English) to formal Lean specifications lacks grounding signals when the problem hasn't been solved yet. Test cases and input-output pairs provide some grounding, but formalizing statements remains harder than formalizing proofs.

**Proof Size Overhead**: Current systems require approximately 20 lines of Lean proof code for each line of program code. The scaling relationship between program complexity and proof complexity remains unclear—it's an open question whether proof length grows linearly, super-linearly, or hits fundamental bounds based on base model capabilities.

**Computational Complexity Concerns**: Rice's theorem establishes that non-trivial properties of programs cannot be verified for all programs. While theoretical limits exist, the practical stance is that formally verifying the majority of useful programs provides substantial value even if universal verification is impossible.

**Context Window and Summarization**: For very large systems with massive Lean code bases, fitting everything into context windows becomes challenging. The company addresses this through auto-informalization—converting Lean proofs back to informal natural language summaries, which can be verified for correctness through round-trip formalization and equivalence checking.

**Distribution Shift**: Systems trained on number theory may not perform well on topology if the domain lacks definitional infrastructure. However, across domains with adequate MathLib coverage (algebra, number theory, commutative algebra, algebraic geometry, discrete math, probability), the system shows reasonable generalization.

## Model Training and Post-Training Approach

The post-training pipeline reflects standard practices with domain-specific innovations:

- **Base Model Selection**: Preference for open-source foundation models with coding and natural language capabilities
- **Continued Pre-training/Fine-tuning**: Adaptation to mathematical and Lean-specific contexts
- **Reinforcement Learning**: Using Lean compilation and verification as reward signals, with formal verification tooling potentially serving as sophisticated reward shaping mechanisms
- **Mid-training Considerations**: The team acknowledges that significant capability gains may require mid-training interventions, drawing an analogy that RL on an untalented person produces worse results than an untrained Ramanujan—suggesting base model quality matters significantly

The system learns to navigate between high-level intuition spaces and low-level rigorous deduction. Lean's tactics (like the grind tactic for low-level proofs) handle mechanical aspects, freeing the AI to operate at higher abstraction levels. This mirrors how human mathematicians use proof assistants to manage low-level details while maintaining focus on high-level insights.

## Knowledge Management and Retrieval

Knowledge graphs and knowledge bases represent critical but under-discussed components. Axiom faced challenges with literature search and problem provenance:

- **Erdős Problem Incident**: Early on, Axiom relied on competitor literature reviews claiming certain Erdős problems were unsolved, only to discover they had been solved previously. This highlighted the difficulty of mathematical search and retrieval—many problems are solved indirectly through equivalent formulations or trivial extensions of other results.
- **Stack Overflow Discovery**: In one case, a 1936 result solving a problem was only identified through a Stack Overflow post, demonstrating that mathematical knowledge exists in distributed, hard-to-search locations.

The knowledge infrastructure challenge extends beyond simple retrieval to understanding equivalences, extensions, and indirect solutions—problems that affect both human mathematicians and AI systems.

## Business Model and Market Positioning

Axiom's market thesis challenges conventional thinking about formal verification:

- **TAM Definition**: The total addressable market is "all code" with "right of first refusal on all AI-generated code." Rather than targeting niche safety-critical industries, the vision encompasses universal verification capability for any generated code.
- **Transfer Learning Hypothesis**: Following the coding-to-reasoning transfer that established companies like Anthropic's Claude, Axiom believes math and formal methods transfer horizontally across domains more broadly than the specific vertical might suggest.
- **Verification as Performance Gain**: Unlike traditional verification-as-compliance narratives, Axiom frames verified generation as offering superior sample efficiency, accuracy, and latency—making it a performance optimization rather than a regulatory burden.

The $200 million raise (approaching the annual US math research budget of $250 million) reflects investor belief that formal verification becomes critical infrastructure as AI systems become more capable and autonomous. The vision includes scenarios where autonomous AI agents handling regulated operations require verifiable behavior—not as mandatory compliance, but as a choice enabled by sufficiently good verification performance.

## Future Directions and Technical Roadmap

Several technical frontiers emerged from the discussion:

**Elegance and Taste as Alignment**: Training models to generate elegant proofs—conceptually orthogonal approaches to the same theorem—represents an alignment problem. Human mathematical taste guides which proofs deserve attention and compute resources, suggesting a role for human judgment even in automated systems.

**Blueprint Autogeneration**: Large formalization projects currently rely on human-written blueprints that decompose problems and assign subtasks. Automating blueprint generation for complex theorems represents a significant technical bottleneck that multiple teams are pursuing.

**Self-Improvement Design**: The recursive self-improvement vision suggests that Axiom Prover's daily mathematical work should feed back into model improvement, creating a virtuous cycle. The company is exploring how proof systems can learn from their own verified outputs.

**Hardware Verification**: Extending to GPU and chip verification represents a domain where partial credit doesn't exist—verification must be perfect. This "hardcore verification" market has hundreds of humans and thousands of software licenses dedicated to single verification problems, with design-to-verification ratios of 1:3 or 1:4 in team size and duration.

**Multi-domain Expansion**: Beyond mathematics, the roadmap includes software verification, hardware verification, and potentially AI for science applications. The key question is whether to pursue breadth (transfer learning across domains) versus depth (recursive self-improvement toward AGI).

## Organizational and Execution Philosophy

At approximately 30 people, Axiom emphasizes execution speed and singular focus as competitive advantages against frontier labs where direction changes frequently due to organizational dynamics. The observation that formal math teams at Google DeepMind (AlphaProof) and other frontier labs dissolved or shifted focus due to non-technical reasons suggests that startup structures enable sustained focus on long-horizon problems.

The team composition is deliberately interdisciplinary: expert mathematicians who are users of the systems they build, MathLib contributors and Lean language experts, applied ML practitioners from organizations like Meta and specific compiler and code generation expertise. This mix enables rapid iteration between mathematical insights and engineering implementation.

The company views fragmentation as a major bottleneck for the broader AI landscape, though AI for math specifically has avoided this through team consolidation. The ability to attract talents like contributors to Frontier Math benchmarks and AI for mathematical discovery pioneers onto a single team creates combinatorial advantages—proving and construction capabilities working together synergistically.

## Lessons for LLMOps Practitioners

Several principles emerge from Axiom's production deployment:

**Verification as Performance Tool**: Rather than viewing formal methods as overhead, the system demonstrates that constraints can improve generation through better reward signals and sample efficiency.

**Hybrid Formal-Informal Approaches**: Pure formal or pure informal approaches have limitations; the production system bridges between high-level informal reasoning and low-level formal verification.

**Infrastructure as Competitive Moat**: Building robust verification infrastructure (like AXL tools) that handles edge cases, achieves high performance, and integrates smoothly creates value beyond model weights alone.

**Domain Knowledge Integration**: Having domain experts (mathematicians) as builders and users accelerates iteration and ensures the system solves real problems rather than proxy benchmarks.

**API-First Deployment**: Rather than building monolithic systems, offering verification as a composable service enables integration with existing LLM workflows and creates partnership opportunities with frontier labs.

The case study illustrates how specialized AI capabilities can achieve superhuman performance through domain-specific architectures and training approaches, offering an alternative to scaling general-purpose models. The verified generation paradigm may represent a blueprint for other domains where correctness and reliability are paramount, from legal reasoning to scientific computation to autonomous systems.
