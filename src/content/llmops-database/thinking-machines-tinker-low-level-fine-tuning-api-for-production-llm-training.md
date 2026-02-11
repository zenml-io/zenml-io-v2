---
title: "Thinking Machines' Tinker: Low-Level Fine-Tuning API for Production LLM Training"
slug: "thinking-machines-tinker-low-level-fine-tuning-api-for-production-llm-training"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694af59651309288611ab263"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:50.198Z"
  createdOn: "2025-12-23T20:03:34.517Z"
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "question-answering"
  - "poc"
  - "data-analysis"
  - "fine-tuning"
  - "rag"
  - "prompt-engineering"
  - "few-shot"
  - "instruction-tuning"
  - "model-optimization"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "evals"
  - "error-handling"
  - "pytorch"
  - "tensorflow"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "scaling"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "langchain"
  - "vllm"
  - "triton"
  - "fastapi"
  - "cache"
  - "openai"
  - "anthropic"
  - "google-gcp"
  - "meta"
  - "microsoft-azure"
  - "nvidia"
  - "hugging-face"
industryTags: "tech"
company: "Thinking Machines"
summary: "Thinking Machines, a new AI company founded by former OpenAI researcher John Schulman, has developed Tinker, a low-level fine-tuning API designed to enable sophisticated post-training of language models without requiring teams to manage GPU infrastructure or distributed systems complexity. The product aims to abstract away infrastructure concerns while providing low-level primitives for expressing nearly all post-training algorithms, allowing researchers and companies to build custom models without developing their own training infrastructure. The company plans to release their own models and expand Tinker's capabilities to include multimodal functionality and larger-scale training jobs, while making the platform more accessible to non-experts through higher-level tooling."
link: "https://www.youtube.com/watch?v=29BYxvvF1iM"
year: 2025
seo:
  title: "Thinking Machines: Thinking Machines' Tinker: Low-Level Fine-Tuning API for Production LLM Training - ZenML LLMOps Database"
  description: "Thinking Machines, a new AI company founded by former OpenAI researcher John Schulman, has developed Tinker, a low-level fine-tuning API designed to enable sophisticated post-training of language models without requiring teams to manage GPU infrastructure or distributed systems complexity. The product aims to abstract away infrastructure concerns while providing low-level primitives for expressing nearly all post-training algorithms, allowing researchers and companies to build custom models without developing their own training infrastructure. The company plans to release their own models and expand Tinker's capabilities to include multimodal functionality and larger-scale training jobs, while making the platform more accessible to non-experts through higher-level tooling."
  canonical: "https://www.zenml.io/llmops-database/thinking-machines-tinker-low-level-fine-tuning-api-for-production-llm-training"
  ogTitle: "Thinking Machines: Thinking Machines' Tinker: Low-Level Fine-Tuning API for Production LLM Training - ZenML LLMOps Database"
  ogDescription: "Thinking Machines, a new AI company founded by former OpenAI researcher John Schulman, has developed Tinker, a low-level fine-tuning API designed to enable sophisticated post-training of language models without requiring teams to manage GPU infrastructure or distributed systems complexity. The product aims to abstract away infrastructure concerns while providing low-level primitives for expressing nearly all post-training algorithms, allowing researchers and companies to build custom models without developing their own training infrastructure. The company plans to release their own models and expand Tinker's capabilities to include multimodal functionality and larger-scale training jobs, while making the platform more accessible to non-experts through higher-level tooling."
---

This case study captures insights from an interview with John Schulman, a former OpenAI researcher who co-founded Thinking Machines, a new AI company focused on democratizing access to advanced LLM training capabilities. The conversation provides both historical context about early AI research lab operations and forward-looking insights into production LLM systems through the lens of Thinking Machines' product, Tinker.

## Company Context and Vision

Thinking Machines was founded by John Schulman and represents a new generation of AI companies emerging in the post-foundation model era. Schulman draws parallels between early OpenAI (2015-2017) and the current state of Thinking Machines, noting both organizations featured multiple parallel research projects while still shaping their overall vision. However, a critical difference exists: early OpenAI operated in what Schulman describes as "peace time" with exploratory work dominating, whereas companies starting in 2025 face pressure to catch up to state-of-the-art systems while simultaneously building exploratory research muscle. Schulman emphasizes the importance of avoiding pure "catch-up mode" to maintain the capacity for innovative, exploratory research that differentiates companies from simply replicating existing approaches.

## Tinker: Production LLM Training as a Service

The centerpiece of Thinking Machines' LLMOps offering is Tinker, which represents a novel approach to productionizing LLM training. Tinker is described as a low-level fine-tuning API that provides a small set of low-level primitives for training and sampling operations. The key innovation lies in its abstraction level: it's lower-level than existing ML training services but higher-level than managing raw GPU infrastructure.

The design philosophy behind Tinker addresses a fundamental gap in the ML infrastructure landscape. Traditional cloud ML services tend to be very high-level, abstracting away too much control for sophisticated users who want to implement custom training algorithms. Conversely, building from scratch requires managing GPU infrastructure, distributed systems complexity, and numerous operational concerns. Tinker occupies a middle ground by handling accelerator management and distributed systems issues while exposing primitives that can express "almost all post-training algorithms" researchers might want to implement.

The closest analogy Schulman provides is to inference APIs from OpenAI, Anthropic, and similar providers: just as developers can call sampling APIs without spinning up GPU infrastructure, Tinker allows users to write training code in Python scripts that "just work" without installing GPU-specific software or managing infrastructure. This represents a significant operational simplification for teams wanting to build sophisticated custom models.

## Target Users and Evolution

Currently, Tinker targets sophisticated ML practitioners who understand the underlying algorithms and want access to low-level primitives. The company ships open-source code alongside Tinker so users don't need to implement training algorithms from scratch, but the expectation is that users will examine and potentially modify these implementations. However, Schulman articulates a clear evolution path: over time, Thinking Machines plans to build higher-level components and tooling on top of Tinker, making it accessible to users who can specify business problems or model requirements without deep ML expertise—essentially moving toward a full-stack solution.

Schulman's ambition is that future AI companies founded by researchers would build directly on top of Tinker rather than developing their own infrastructure, significantly lowering the barrier to entry for sophisticated model development. This represents a maturation of the LLMOps ecosystem where infrastructure becomes commoditized, allowing teams to focus on their unique model development and application needs.

## Post-Training Techniques and Current State

The interview provides valuable context on the current state of post-training techniques in production LLM systems. Schulman discusses reinforcement learning from human feedback (RLHF) and notes that current approaches work well on tasks with verifiable rewards and relatively contained time horizons (though he notes that tens of thousands of tokens represents a "pretty long time horizon"). Interestingly, he observes that value functions—traditionally important in RL for variance reduction—don't seem to help much in current LLM post-training settings, though he expects them to make a comeback as the field evolves.

On the question of continual learning for deployed systems, Schulman outlines a multi-tier approach. He distinguishes between different types of learning analogous to psychological categories: motor learning, episodic memory, and procedural memory for knowledge acquisition. His view is that in-context learning and improved context management will continue to advance and handle short-horizon learning tasks effectively. Parameter fine-tuning (including approaches like LoRA) would stack on top of this, particularly for tasks requiring significant capacity and knowledge absorption. He suggests parameter fine-tuning wins over longer time horizons where in-context learning becomes insufficient.

Regarding the path to more general AI systems, Schulman acknowledges uncertainty around whether continual learning can be solved purely through better context management plus fine-tuning, or whether fundamentally new ideas are needed. He notes that scaling models continues to improve metrics regardless of methodology changes, but new ideas might offer better scaling laws or multiplicative improvements in effective compute. He expects models to improve at longer time horizons, which currently represent a relative weakness compared to humans who have been optimized for 80-year lifespans with various self-correction mechanisms.

## Co-Training and Multi-Agent Approaches

Looking forward, Schulman expresses enthusiasm for co-training generators and verifiers together, seeing potential for self-improvement as better reasoning and instruction-following in the model improves its verification capabilities, creating a virtuous cycle. He's particularly fond of multi-agent training and game-theoretic approaches, noting that games provide automatic curricula (as opponents improve alongside you) and citing theoretical computer science results about zero-sum games with polynomial-time judges that can incentivize solving very hard problems at equilibrium.

He references the debate game concept from alignment literature as particularly compelling, though noting it hasn't yet seen extensive implementation. This suggests Thinking Machines may explore these directions in their own model development work.

## Practical AI Use in Research

Schulman provides insight into how AI assists his own research and development work, which informs Thinking Machines' approach. He extensively uses AI for coding through tools like Cursor and Claude Code, and keeps multiple chat windows open with different models throughout the day. For research specifically, he uses models for literature searches (finding both papers and open-source libraries), fleshing out vague ideas by writing initial paragraphs and having models elaborate, and getting feedback on writing. He emphasizes that models serve as a "first round of feedback" while he still does most of the thinking himself.

Notably, he qualifies advice on AI-assisted coding for research contexts: while having models write large amounts of unread code may work well for conventional software engineering, research benefits from understanding every line of code. The researchers who have done the best work maintain deep understanding "all the way down to the nuts and bolts," suggesting a more hands-on approach to AI assistance in research settings.

## Infrastructure and Engineering Evolution

The interview provides historical context on OpenAI's engineering evolution that informs current LLMOps thinking. Early OpenAI projects like Dota represented combinations of environment infrastructure (hooking into game software, building training environments) and training systems for large-scale rollouts and parallel/asynchronous RL. These weren't completely decoupled, reflecting the integrated nature of ML systems development.

Schulman observes that engineering skill has become increasingly important relative to pure research taste as the field has matured. Since practitioners now build on existing codebases and infrastructure rather than writing code from scratch in Jupyter notebooks, software engineering backgrounds confer more advantage than in earlier eras. This shift reflects the professionalization and productionization of LLM development.

## Research Culture and Internal Coordination

Drawing from his OpenAI experience, Schulman provides insights on research organization relevant to LLMOps. He notes that internal research at major labs tends to have higher accuracy in drawing conclusions (particularly for pre-training improvements) because experiments are driven by real consequences rather than just publication. However, external academic papers tend to be more thorough and detailed, with better baseline comparisons in the best work. Internal research typically lacks the thoroughness and detail of academic publications, though it may be more accurate within its scope.

He expresses interest in improving research writing culture at AI companies to produce more detailed technical reports that deeply explore the science rather than just finding minimally shippable recipe improvements. This tension between thorough documentation and rapid iteration represents an ongoing challenge in production LLM development.

## Organizational Models and Management

Schulman discusses different management approaches for research teams, noting both hands-on (manager writing code, reviewing all reports' code, giving detailed technical feedback) and hands-off (acting as sounding board, providing career advice, letting experienced people explore) models can succeed. The choice depends on context: hands-off management suits exploratory research with experienced contributors, while hands-on management better serves goal-oriented work or teams with less experience. This flexibility in organizational approach likely influences how Thinking Machines structures its own research and development teams.

## Future Directions

Looking ahead, Thinking Machines plans to release their own models in the coming year while continuing to expand Tinker's capabilities. Specific technical expansions mentioned include multimodal functionality (various types of multimodal input and output) and scaling up the size of training jobs Tinker can handle. The roadmap suggests moving from current focus on sophisticated ML practitioners toward broader accessibility through higher-level abstractions.

On offline RL and sim-to-real approaches, Schulman sees parallels between LLM post-training and robotics sim-to-real transfer, where training occurs at scale in simulated/synthetic environments with sufficient diversity to generalize to real deployment. He expects learning from real-world deployment to eventually become more important in the LLM context as well, suggesting future iterations of Tinker and similar systems will need to support online learning from production deployment.

## Critical Assessment

While the interview provides valuable insights, it's worth noting that as a founder discussing his own company's product, Schulman's perspective on Tinker should be evaluated carefully. The claim that Tinker can express "almost all post-training algorithms" through its primitives is significant but not demonstrated with specific examples or customer evidence in this interview. The vision of replacing custom infrastructure development across the industry is ambitious but remains to be proven in practice.

The comparison to OpenAI and Anthropic's inference APIs is instructive but may understate the complexity differences between serving inference and managing training infrastructure at scale. Training involves significantly more complex state management, distributed coordination, and resource optimization challenges than inference serving.

That said, the general thesis—that there's room for a training API that abstracts infrastructure while maintaining low-level control—is compelling and addresses a real gap in the LLMOps ecosystem. The execution risk lies in finding the right abstraction level that's actually reusable across diverse post-training algorithms while remaining truly simpler than managing infrastructure directly.

The interview also reveals the ongoing nature of research at Thinking Machines into fundamental questions about LLM capabilities (value functions, continual learning, multi-agent training) which will presumably inform both their own models and the evolution of Tinker's capabilities. This represents a bet that the API surface needs to evolve alongside research progress rather than being fully defined upfront.