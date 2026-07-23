---
title: "Building a Model Factory for Rapid Foundation Model Development"
slug: "building-a-model-factory-for-rapid-foundation-model-development"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "reinforcement-learning"
  - "rlhf"
  - "fine-tuning"
  - "prompt-engineering"
  - "few-shot"
  - "model-optimization"
  - "knowledge-distillation"
  - "instruction-tuning"
  - "token-optimization"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "evals"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "cicd"
  - "scaling"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "pytorch"
  - "fastapi"
  - "wandb"
  - "vllm"
  - "anthropic"
  - "openai"
  - "meta"
  - "google-gcp"
  - "nvidia"
  - "hugging-face"
  - "databricks"
industryTags: "tech"
company: "Poolside"
summary: "Poolside AI, a foundation model company focused on code generation, developed a comprehensive \"Model Factory\" system that enables them to train and deploy models from scratch to production in 5-8 weeks with a team of fewer than 70 researchers. Their approach treats model building as 90% engineering, emphasizing automation, reproducibility, and rapid experimentation (10,000-20,000 experiments per month). The result is the Laguna S model (118B parameters, 8B active), which demonstrates that smaller models with better behaviors—persistence, verification, and backtracking—can compete with models 10x their size, suggesting a path toward commoditized, open-weight foundation models."
link: "https://www.latent.space/p/poolside?utm_source=post-email-title&publication_id=1084089&post_id=208082176"
year: 2026
seo:
  title: "Poolside: Building a Model Factory for Rapid Foundation Model Development - ZenML LLMOps Database"
  description: "Poolside AI, a foundation model company focused on code generation, developed a comprehensive \"Model Factory\" system that enables them to train and deploy models from scratch to production in 5-8 weeks with a team of fewer than 70 researchers. Their approach treats model building as 90% engineering, emphasizing automation, reproducibility, and rapid experimentation (10,000-20,000 experiments per month). The result is the Laguna S model (118B parameters, 8B active), which demonstrates that smaller models with better behaviors—persistence, verification, and backtracking—can compete with models 10x their size, suggesting a path toward commoditized, open-weight foundation models."
  canonical: "https://www.zenml.io/llmops-database/building-a-model-factory-for-rapid-foundation-model-development"
  ogTitle: "Poolside: Building a Model Factory for Rapid Foundation Model Development - ZenML LLMOps Database"
  ogDescription: "Poolside AI, a foundation model company focused on code generation, developed a comprehensive \"Model Factory\" system that enables them to train and deploy models from scratch to production in 5-8 weeks with a team of fewer than 70 researchers. Their approach treats model building as 90% engineering, emphasizing automation, reproducibility, and rapid experimentation (10,000-20,000 experiments per month). The result is the Laguna S model (118B parameters, 8B active), which demonstrates that smaller models with better behaviors—persistence, verification, and backtracking—can compete with models 10x their size, suggesting a path toward commoditized, open-weight foundation models."
notion:
  pageId: "3a6f8dff-2538-8017-996b-e2f75929f17b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-23T08:21:00.000Z"
  lastEditedTime: "2026-07-23T08:22:00.000Z"
  publishedAt: "2026-07-23T08:59:03Z"
---

## Overview

Poolside AI represents a compelling case study in production-scale LLMOps, demonstrating how engineering discipline and systematic infrastructure can enable a small team to compete in the foundation model space. Co-CEO Eiso Kant details their journey from spending $12 million on language models for code before ChatGPT to building what they call a "Model Factory"—an end-to-end production system that treats model development as an industrialized process rather than a series of one-off experiments.

The company's core thesis is that model building is fundamentally 90% engineering rather than pure research. This philosophy permeates their entire approach, from data pipelines to training infrastructure to deployment. With fewer than 70 researchers and 35 engineers (approximately 115 people total), they've achieved what many would consider frontier-level results, most notably with their Laguna S 2.1 model that outperforms models with nearly 10x more parameters.

## The Model Factory Architecture

The Model Factory concept is central to Poolside's LLMOps approach. Rather than treating each model training run as a bespoke project with bash scripts and Slurm configurations, they built a comprehensive production system with thousands of components. The factory metaphor is deliberate—Kant compares it to Foxconn or SpaceX's manufacturing approach, where the hard part isn't the individual product but the system that produces it reliably and repeatedly.

**Key architectural principles include:**

- **Streaming data directly into training**: Instead of materializing entire datasets, packaging them, copying to training clusters, and distributing across nodes, Poolside streams data just-in-time during training. This dramatically reduces the iteration time from idea to experimental result. Training jobs consume tokens per second at predictable rates, allowing them to start training while data is still being prepared. This approach eliminated what was previously a major bottleneck in experimentation velocity.

- **Immutable data layer with versioning**: All data is treated as immutable underneath, with experiments defined as code. This means every experiment can be traced down to the single token level—which cursor position, which version of code, which data sources. They can still reproduce training runs from two years ago perfectly. This immutability wasn't initially about scientific rigor but became crucial for it as the team matured.

- **APIs designed for agents**: While not originally planned, the well-engineered systems with clean APIs became perfect substrates for AI agents. Researchers now routinely have agents writing code, launching jobs, evaluating results from model runs, and modifying pipelines. This represents early signs of recursive self-improvement in their development process.

- **Zero on-call incidents**: The system has achieved remarkable reliability, with zero call-out incidents during training runs (after the initial 6-hour configuration stabilization period). The last meaningful on-call event they recall was earlier in 2026, demonstrating production-grade stability.

## Experiment Velocity and Scale

The Model Factory enables extraordinary experiment throughput. With fewer than 70 researchers, Poolside runs 10,000-20,000 experiments per month. This scale would be impossible without systematic automation and excellent tooling. The team has compressed model development cycles from six months down to five to eight weeks from initial training to production release.

For their Laguna S model specifically: it went from start of training to public launch in exactly eight weeks. Their previous XS.2 model was completed in just five weeks. This rapid cadence means any experimental improvement from the previous day can be incorporated into new runs, rather than having cutoff dates 90 days before training begins.

The cadence also serves a scientific purpose beyond speed. When model training cycles were six months apart, too many changes would compound, creating what Kant calls "soup" where individual contributions couldn't be understood. Frequent training runs enable proper ablation studies and causal understanding of what drives improvements.

## Training Infrastructure and Techniques

Poolside operates a 10,000 H200 GPU cluster currently, with plans to scale significantly. Their training approach incorporates several production-oriented techniques:

**Low-precision training**: Laguna S was trained in FP8 (except for the all-to-all communication in their latest run, where they weren't yet comfortable with FP8). They're actively working toward FP4 training capabilities and are excited about ternary weight approaches emerging in the research community. The trade-off between model size and precision is seen as fundamental—bigger models at lower precision should theoretically equal smaller models at higher precision, and finding the optimal point on this curve is crucial work.

**Streaming data architecture**: Their internal service called "Blender" allows researchers to specify data mixing configurations—20% from this source, 10% from that source, specific epoch repetition, shuffling strategies—all as simple configs. Training can begin while the rest of the data materializes in the background.

**Distributed systems focus**: From day one, Poolside integrated world-class distributed systems engineers into the research process, not as an afterthought but as core to the model development workflow. This treats the large-scale distributed training challenge as a first-class engineering problem requiring the same rigor as any production distributed system.

**Networking and hardware bottlenecks**: Kant emphasizes that at scale, networking often becomes a bigger bottleneck than raw compute. The difference between what you can train on Hopper GPUs versus GB300 systems isn't just about FLOPS—it's about the architectural improvements that enable training trillion-parameter models versus five or six trillion parameters.

## Post-Training and Reinforcement Learning

While pre-training gets much attention, Poolside's most interesting LLMOps insights may be in post-training and reinforcement learning:

**RL as the original thesis**: The company was founded on the belief that reinforcement learning would be the biggest driver of LLM capabilities—an opinion not widely held three years ago when they started. This conviction drove their infrastructure decisions and research priorities from day one.

**Wall-clock time as the bottleneck**: RL training is batch-size constrained because you have a finite number of tasks to train on, unlike pre-training where you can draw from the entire web. This means you can't simply scale RL by adding more GPUs beyond a certain point. Kant identifies RL wall-clock time as one of their biggest current bottlenecks and is excited about potential solutions like hardware disaggregation (separating prefill and decode to different chips, similar to inference optimizations) and lower-precision RL training.

**Multi-harness training (polishing)**: While models are primarily trained on Poolside's own minimal harness (roughly six tools: shell, shell kill, shell wait, write, fetch web, bash), they do "polishing" phases where models are exposed to other harnesses to ensure capabilities transfer. This is described as relatively light-weight and not the primary driver of capabilities, but important for user experience.

**Behavior over intelligence**: A key insight from Laguna S is that much of its capability comes not from raw intelligence but from behaviors like persistence, verification, not declaring victory early, and being willing to backtrack. Head of Applied Research Peng Ming noted these behavioral qualities are "more predictive than raw intelligence for success in humans also." This has profound implications—if knowledge work can be served by smaller models with better behaviors rather than requiring massive intelligence, it suggests a path to commoditized, cost-effective AI.

## Model Architecture and Scale

Laguna S is a 118 billion total parameter Mixture-of-Experts (MoE) model with 8 billion parameters active per token. It supports up to 1 million token context windows and offers both thinking and no-thinking modes. The model fits on a single DGX Spark and runs at 30-40 tokens per second, making it practical for actual deployment.

The architecture uses a 3:1 ratio of sliding window attention to global attention, which has become a standard pattern. It's described as a "scale-up of the XS architecture," suggesting an evolutionary rather than revolutionary approach to model design.

Poolside is actively training larger models. Their new "Laguna M" (medium) started training the day before this interview, with a 39-day planned training run. The naming scheme (XS, S, M, L, XL) will continue, though Kant acknowledges that "small" at 118B parameters is somewhat humorous given industry standards have shifted dramatically.

## Data Strategy and Curriculum Learning

Data strategy represents a nuanced area where Poolside balances openness with competitive advantage:

**Limited external data purchases**: Unlike some competitors, Poolside has purchased relatively little external training data. This constraint forced them to become excellent at data quality, filtering, and curriculum design—potentially a blessing in disguise.

**Web data extraction**: Kant believes the industry is still "barely squeezing out of the web what we should be getting out of the web" and that "next token prediction during training is not enough." This suggests significant research into better objectives and data processing pipelines.

**Mid-training as curriculum design**: What the industry calls "mid-training" or "continued training" is really just early-stage curriculum design—taking a second phase of training with domain-specific data. Kant believes this will evolve toward truly continuous curriculum learning from token zero through 30-40 trillion tokens as compute becomes cheaper and experimentation more sophisticated.

**RL moving earlier into pre-training**: A non-consensus view is that reinforcement learning will move earlier and earlier into the training process, potentially even inducing reasoning capabilities very early once models are capable of using language. Kant references the DeepSeek-R1-Zero paper as public evidence of this direction.

**Auto data mixing**: Their technical report mentions an "auto mixer" that trains eight small models and uses their performance to determine optimal data mixing ratios for the final training run, requiring minimal human intervention.

## Evaluation and Benchmarking

Poolside takes evaluation rigor seriously, with several production practices:

**Internal evals**: They maintain extensive internal evaluation suites beyond public benchmarks. Researchers can often assess a new checkpoint's quality within the first 30 minutes of evaluation, giving rapid feedback on training progress.

**Public benchmark discipline**: When they publish results on public benchmarks, they check them extensively and run them many times. If they haven't spent enough time validating a benchmark, they simply won't publish those results, even if used internally. This commitment to honesty in reporting is notable.

**Third-party validation**: Kant expresses strong support for third-party evaluation services like Artificial Analysis and Vals, seeing them as crucial for keeping the industry honest. He'd like to see more evaluation companies emerge.

**Task-specific performance**: On certain benchmarks like τ-bench, they claim state-of-the-art performance within their weight class and even compared to models twice as large. The model can solve complex mathematical problems (Erdős 397) and handle sophisticated programming tasks.

**Vibe checking**: Kant personally spent 8-10 hours per day for ten days with Laguna S, including ten hours on an eleven-hour flight reading model trajectories and traces. This hands-on evaluation complements automated metrics.

## Harness Design and Tool Philosophy

Poolside has strong, somewhat contrarian opinions on harness design:

**Minimal harness philosophy**: Their production harness is deliberately minimal—approximately six tools (shell, shell kill, shell wait, write, fetch web, bash). This isn't a harness designed to do well on specific benchmarks or loaded with domain-specific prompts.

**"MCP and tools are stupid"**: Kant provocatively argues that tool calls and systems like Model Context Protocol (MCP) are fundamentally the wrong abstraction. Instead of stuffing 50 tools into a system prompt and having models select from them, he believes models should write code—scripts with if statements, for loops, and conditional logic—to interact with their environment.

**Container-based freedom**: The preferred approach is giving models a minimal harness, a container with access to necessary APIs and data sources, a code base they can modify, and letting them "run free at the task." This mirrors how the models naturally want to work during RL training.

**Model freedom during RL**: When training models with RL, Kant observes they inherently want to be free to solve problems in the most efficient way possible, which is rarely calling one of 50 predefined tools but rather writing custom code for the specific task.

**Prediction about tool calls**: Kant predicts that within 12 months (by mid-2027), no system prompts will be stuffed with 20-30-40 tools anymore. The industry will have moved to code-based interaction patterns.

## Open Source Strategy and Philosophy

Poolside's commitment to open weights represents a significant LLMOps case study in how to build a business around openly available models:

**Evolution of philosophy**: When they started, Poolside didn't plan to be open source. The decision came early in 2026 after soul-searching about what kind of future they wanted. Kant realized he'd rather live in a world with 100 foundation model companies than 5, even if Poolside were one of the 5.

**Open weights vs open research**: Kant distinguishes between releasing weights (important but limited) and releasing genuinely open research. Weights are binaries that can be modified but don't enable others to recreate your work. Open research—detailed technical reports, ablation studies, system architecture—enables others to catch up and compete.

**Business model uncertainty**: They're transparent that they don't fully know how to build a sustainable business model around open foundation models. But they decided it was important enough to commit before it became impossible (when they reach the frontier and have too much capital and expectations at stake).

**Technical reports**: Their technical reports are praised for unusual detail and honesty. The Laguna XS.2/M.1 report doesn't just list benchmarks but explains their Model Factory, data pipelines, experiment infrastructure, and ablations.

**Timing window**: Kant believes there's a limited window before recursive self-improvement makes catching up unfeasible. During this window, lowering barriers to entry for new foundation model companies is crucial.

**Competitive open source**: He actively encourages capable researchers to leave their current positions and become Poolside's competitors by starting new foundation model companies. This isn't just rhetoric—he sees it as necessary for a healthy ecosystem.

## Production Reliability and Operations

The operational maturity of Poolside's systems is evident in several ways:

**Zero-incident releases**: Laguna S training had zero call-out incidents requiring engineers to wake up, demonstrating production-grade reliability in a research context.

**Model as artifact**: Training runs are anticlimactic events—just a Slack message with links to follow eval progress. All the work happens before, in building the systems and preparing the data and experiments.

**Rapid model starts**: They started training their new Laguna M the day after completing post-training for Laguna S, immediately redirecting compute. This fluidity is only possible with excellent automation and orchestration.

**Configuration stabilization**: They've learned to expect about six hours of instability at the start of new runs (configuration errors, small mistakes) but after that, runs proceed hands-off.

**Monitoring and observability**: While not detailed in the interview, the ability to assess checkpoint quality in 30 minutes and the links shared in Slack for following eval progress suggest sophisticated monitoring infrastructure.

## Challenges and Limitations

Despite their achievements, Poolside is transparent about limitations and challenges:

**Not yet frontier**: They're clear they haven't reached state-of-the-art yet. Claude Sonnet and other frontier models are still superior for general tasks. Laguna S is competitive in specific domains (coding) and weight classes but isn't the world's best model.

**Missing modalities**: Vision understanding is their next priority but not yet implemented. Audio is not planned for the foreseeable future as it doesn't align with their path to AGI through code. These focus decisions are deliberate but represent capability gaps.

**RL bottlenecks**: The batch-size constraint in RL training creates wall-clock time bottlenecks that can't be solved by simply adding more GPUs, representing a fundamental scaling challenge.

**Harness transfer**: While they do multi-harness polishing, models still perform slightly better on Poolside's own harness than others. This is natural given where RL compute is invested but represents a tension with the goal of broadly useful models.

**Team scaling**: With ~115 people total, they're small compared to frontier labs with thousands of employees. While this enables high per-person impact, it also limits breadth of work that can be pursued simultaneously.

## Lessons for LLMOps Practitioners

Several generalizable lessons emerge for those building production LLM systems:

**Engineering discipline in research**: Treating model development as 90% engineering with proper version control, immutability, reproducibility, and automation yields compounding returns over time.

**Streaming and just-in-time data**: Don't materialize entire datasets before training. Stream data as needed to dramatically reduce iteration time.

**Rapid iteration over perfection**: Training models every 5-8 weeks instead of every 6 months enables better science and faster learning, even if individual runs might be slightly sub-optimal.

**Agents as force multipliers**: Well-designed APIs and automation naturally enable AI agents to contribute to development, creating recursive productivity improvements.

**Behavior engineering**: At smaller scales, engineering behaviors (persistence, verification, backtracking) may matter more than raw intelligence for knowledge work applications.

**Focus and constraints**: Saying no to entire modalities (audio) or approaches (heavy distillation from larger models) can focus efforts and drive innovation in chosen areas.

**Open research benefits**: Publishing detailed technical reports helps the ecosystem, establishes credibility, and doesn't necessarily hurt competitive position since execution matters more than knowledge.

**Reliability as a feature**: Production-grade reliability in training infrastructure (zero incidents) isn't just operational—it enables researchers to focus on research rather than firefighting.

This case study demonstrates that smaller teams with excellent engineering discipline, systematic infrastructure, and clear focus can compete in foundation model development. The Model Factory approach—treating model development as an industrialized, reproducible process rather than artisanal research—represents a mature LLMOps philosophy that balances research velocity with production reliability.
