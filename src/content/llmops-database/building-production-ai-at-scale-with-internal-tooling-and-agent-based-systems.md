---
title: "Building Production AI at Scale with Internal Tooling and Agent-Based Systems"
slug: "building-production-ai-at-scale-with-internal-tooling-and-agent-based-systems"
draft: false
llmopsTags:
  - "code-generation"
  - "customer-support"
  - "chatbot"
  - "data-analysis"
  - "classification"
  - "summarization"
  - "poc"
  - "realtime-application"
  - "structured-output"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "model-optimization"
  - "knowledge-distillation"
  - "few-shot"
  - "semantic-search"
  - "reranking"
  - "latency-optimization"
  - "cost-optimization"
  - "token-optimization"
  - "human-in-the-loop"
  - "error-handling"
  - "evals"
  - "kubernetes"
  - "docker"
  - "cicd"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "continuous-integration"
  - "continuous-deployment"
  - "open-source"
  - "documentation"
  - "scalability"
  - "reliability"
  - "fastapi"
  - "postgresql"
  - "sqlite"
  - "redis"
  - "cache"
  - "langchain"
  - "pytorch"
  - "vllm"
  - "triton"
  - "anthropic"
  - "openai"
  - "google-gcp"
  - "microsoft-azure"
  - "nvidia"
  - "hugging-face"
  - "meta"
industryTags: "e-commerce"
company: "Shopify"
summary: "Shopify's CTO discusses how the company has achieved near-universal AI adoption internally, with nearly 100% of employees using AI tools daily as of December 2025. The company has developed sophisticated internal platforms including Tangle (an ML experimentation framework), Tangent (an auto-research loop for automatic optimization), and SimGym (a customer simulation platform using historical data). These systems have enabled dramatic productivity improvements including 30% month-over-month PR merge growth, significant code quality improvements through critique loops, and the ability to run hundreds of automated experiments. The company provides unlimited token budgets to employees and emphasizes quality token usage over quantity, focusing on efficient agent architectures with critique loops rather than many parallel agents. They've also implemented Liquid AI models for low-latency applications, achieving 30-millisecond response times for search queries."
link: "https://www.youtube.com/watch?v=RrkGoX3Cw7o"
year: 2026
seo:
  title: "Shopify: Building Production AI at Scale with Internal Tooling and Agent-Based Systems - ZenML LLMOps Database"
  description: "Shopify's CTO discusses how the company has achieved near-universal AI adoption internally, with nearly 100% of employees using AI tools daily as of December 2025. The company has developed sophisticated internal platforms including Tangle (an ML experimentation framework), Tangent (an auto-research loop for automatic optimization), and SimGym (a customer simulation platform using historical data). These systems have enabled dramatic productivity improvements including 30% month-over-month PR merge growth, significant code quality improvements through critique loops, and the ability to run hundreds of automated experiments. The company provides unlimited token budgets to employees and emphasizes quality token usage over quantity, focusing on efficient agent architectures with critique loops rather than many parallel agents. They've also implemented Liquid AI models for low-latency applications, achieving 30-millisecond response times for search queries."
  canonical: "https://www.zenml.io/llmops-database/building-production-ai-at-scale-with-internal-tooling-and-agent-based-systems"
  ogTitle: "Shopify: Building Production AI at Scale with Internal Tooling and Agent-Based Systems - ZenML LLMOps Database"
  ogDescription: "Shopify's CTO discusses how the company has achieved near-universal AI adoption internally, with nearly 100% of employees using AI tools daily as of December 2025. The company has developed sophisticated internal platforms including Tangle (an ML experimentation framework), Tangent (an auto-research loop for automatic optimization), and SimGym (a customer simulation platform using historical data). These systems have enabled dramatic productivity improvements including 30% month-over-month PR merge growth, significant code quality improvements through critique loops, and the ability to run hundreds of automated experiments. The company provides unlimited token budgets to employees and emphasizes quality token usage over quantity, focusing on efficient agent architectures with critique loops rather than many parallel agents. They've also implemented Liquid AI models for low-latency applications, achieving 30-millisecond response times for search queries."
notion:
  pageId: "34bf8dff-2538-8098-b141-d13a19994cf2"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-23T11:59:00.000Z"
  lastEditedTime: "2026-04-23T11:59:00.000Z"
  publishedAt: "2026-04-26T09:56:27Z"
---

Shopify has emerged as a leader in production AI deployment at scale, with their CTO Muhammed Parkin providing detailed insights into their comprehensive LLMOps strategy. The company has reached a remarkable milestone where nearly 100% of employees use AI tools daily as part of their regular workflow, with a significant phase transition occurring around December 2025 when models became good enough to drive widespread adoption.

## AI Tool Adoption and Token Usage Strategy

Shopify takes an omnivorous approach to AI tooling, allowing employees to choose whatever tools work best for them while providing unlimited token budgets. The company tracks daily active users across various AI tools including Claude Code, Codex, GitHub Copilot, Cursor, and their internal development tool called River. Interestingly, they've observed that CLI-based tools and tools that don't require looking at code are growing faster than IDE-based tools like Copilot and Cursor. This suggests a shift toward more autonomous agent-based workflows rather than traditional copilot-style assistance.

The token consumption data reveals fascinating patterns. The distribution of token usage has become increasingly skewed, with top percentiles growing much faster than median users. While this creates some concern about whether everyone is fully utilizing the available AI capabilities, it also demonstrates that power users are finding substantial value. The CTO emphasizes that the metric to track isn't just raw token consumption but the ratio of budget spent on code generation versus expensive models used for PR review and quality assurance.

On the controversial topic of token budgets popularized by Jensen Huang's comments about engineers spending significant amounts on tokens, Shopify's position is that Jensen is directionally correct despite receiving criticism. However, the key insight is that token consumption alone is not the right metric. Running too many agents in parallel that don't communicate with each other is an anti-pattern that wastes tokens without producing quality results. Instead, Shopify focuses on efficient token burning through carefully structured critique loops.

## Critique Loops and Code Quality

One of Shopify's most important architectural decisions is implementing critique loops where one agent does work and another agent, ideally using a different model, critiques it and suggests improvements. The first agent then iterates based on this critique. While this approach increases latency significantly since users must wait for the debate to complete, it produces substantially higher quality code. This represents a critical trade-off in production AI systems: optimizing for quality over speed at certain stages of the development process.

The company strongly enforces rigorous PR reviews, both automated and human, because AI-generated code tends to be more verbose and the sheer volume means more bugs will make it into production even if the per-line bug rate is lower than human-written code. The real metric of interest is the ratio of expensive tokens spent on high-quality models like GPT-5.4 Pro or Gemini Deep Think during PR review versus tokens spent on code generation. This reflects a sophisticated understanding that preventing bugs is more cost-effective than dealing with failed tests and deployment rollbacks.

Shopify has found that spending more time with larger models thinking during PR review saves total time in the aggregate system, even if individual PRs take longer. Failed tests during deployment, finding offending PRs, evicting them, and retesting creates substantial delays that dwarf the time spent on thorough automated review.

## Tangle: Third-Generation ML Experimentation Platform

Tangle represents Shopify's third-generation system for running data processing and ML experiments at scale, building on lessons from earlier systems like Ether at Microsoft and Nirvana at Yandex. The platform addresses the common pain points of data scientists and ML practitioners who struggle with managing Jupyter notebooks, tracking experiments, reproducing results, and transitioning work to production.

The key innovation in Tangle is content-based hashing rather than version-based tracking. If multiple people start experiments requiring the same data preprocessing, Tangle automatically detects this and runs the preprocessing only once. Even if a version changes but the output remains the same, nothing downstream gets rerun. This creates powerful network effects where team members unknowingly help each other, with experiments suddenly jumping forward because someone else already computed intermediate results.

Tangle is designed as a platform from the beginning rather than an individual developer tool. It provides full versioning, reproducibility guarantees, easy composability across any programming language, visual editing capabilities, and most importantly, seamless development-to-production transition. The same experiment that runs during development can be deployed to production with one click, eliminating the typical porting effort that introduces bugs and delays.

The system is language-agnostic and CLI-based, with everything built on YAML configuration files. This makes it easy for agents to both analyze existing pipelines and create new components, enabling a level of automated experimentation that would be impractical with more opaque systems.

## Tangent: Auto-Research Loop for Automated Optimization

Building on top of Tangle, Shopify developed Tangent, an auto-research agent that can automatically run multiple experiments, analyze results, and keep modifying code to maximize some goal or loss function. This represents an implementation of the auto-research paradigm that Andre Karpathy popularized, but applied at enterprise scale with the benefit of Tangle's infrastructure.

The results from auto-research have been dramatic across wildly different domains. Shopify achieved improvements in UX templating and HTML rendering speed, reduced latency for Liquid themes, increased search throughput from 800 QPS to 4200 QPS on the same hardware, improved gisting (prompt compression) quality while reducing latency, and even found storage optimizations by identifying redundant data. In one particularly embarrassing discovery, auto-research found that one of their largest database tables was simply hashing random IDs into other random IDs with no actual value.

The CTO's personal experiment with auto-research is illuminating. He set it to run on a problem that had been optimized for many years, expecting to prove that auto-research couldn't find improvements in already well-optimized systems. After running over 400 experiments over several weeks, only one was successful, but that one improvement was something his team had missed. This 0.25% success rate would be completely impractical for human researchers but is economically viable when the cost is merely electricity and compute time.

Tangent has proven highly democratizing within Shopify. While initially used primarily by ML and AI engineers, product managers have become heavy users because they can bring domain knowledge and product intuition without needing to manually write code. The top user by token consumption is a PM who uses auto-research to rapidly iterate on ideas. This represents a fundamental shift in how organizations can leverage AI, with cloud-like tools for AI development enabling non-technical domain experts to drive technical optimization.

However, auto-research has clear limitations. It excels at obvious optimizations that teams lack bandwidth to implement or at applying standard practices they weren't aware of. It struggles with completely out-of-distribution innovations that require days of deep thinking. It's best viewed as a tireless optimizer that explores the space of incremental improvements at scale rather than a replacement for creative technical work.

## SimGym: Customer Simulation Platform

SimGym represents one of Shopify's most innovative LLMOps applications, using AI agents to simulate customer behavior for evaluating changes to merchant stores. The key insight that makes this work is that Shopify has decades of historical data showing how changes to stores correlated with changes in sales, add-to-cart events, and conversions. This historical data is used to calibrate and optimize the agents, allowing them to predict with approximately 0.7 correlation how changes will affect actual customer behavior.

Without this historical data, customer simulation would simply reflect whatever was prompted, making it essentially useless. But with proper calibration using real-world outcomes across thousands of merchants and millions of customers, the simulated agents develop predictive power. Shopify takes this further by creating agent distributions that match the specific customer base of individual merchants when historical customer data is available, dramatically improving prediction accuracy for those specific stores.

The technical implementation is complex and expensive. SimGym requires multimodal models that can process visual information since factors like image size significantly affect conversion rates in ways that aren't apparent from HTML alone. The system runs in simulated browser environments at scale, using expensive models like GPT-4 and operating on visual renders of actual pages. This violates almost every assumption that standard LLM serving is designed for, with orders of magnitude differences in latency requirements, context lengths, and throughput patterns compared to typical inference workloads.

Shopify worked extensively with infrastructure partners including Fireworks, Sentl (acquired by NVIDIA), and BrowserBase to optimize the system. They had to solve problems like getting MIG (multi-instance GPU) to work efficiently despite it being suboptimal for this workload, because the cost would otherwise be prohibitive. The result is a system that can run in two modes: maximum throughput for offline batch jobs like product categorization, or ultra-low latency for interactive applications like search.

The original vision for SimGym focused on A/B testing where merchants would provide two variants and the system would predict which performs better. However, Shopify discovered that most merchants don't have A and B, they just have their current store and need suggestions. The product evolved to analyze a single theme and provide specific recommendations for increasing conversions, which proved much more valuable.

The system is proven in production by daily increasing usage. If the predictions didn't correlate with reality, adoption would decline, but instead Shopify sees more usage every day. The current challenge is optimizing costs through distillation and infrastructure improvements to accommodate growing demand.

## Liquid AI and Non-Transformer Architectures

Shopify has become a significant production user of Liquid AI, a non-transformer architecture based on advanced state space models. State space models like Mamba have long promised benefits over transformers, including faster inference, lower memory footprint, and linear rather than quadratic scaling with context length. However, SSMs have historically struggled with expressiveness and never quite achieved production parity with transformers.

Liquid neural networks represent what the CTO describes as state space models squared, a more sophisticated architecture that is difficult to code but much more expressive than traditional SSMs. Shopify finds Liquid models particularly competitive for small models with low latency requirements or applications needing long context. They've achieved remarkable results including 30-millisecond end-to-end latency for search query understanding using a 300-million parameter Liquid model.

This involved extensive optimization work with Sentl, Liquid AI, and NVIDIA, as almost all CUDA optimizations are designed for large transformer models. Small details that don't matter for large models become critical bottlenecks at small scales and ultra-low latencies. The resulting system can process user queries, generate a full tree of possible interpretations including synonyms and personalization based on query history, and format everything for the search backend in under 30 milliseconds.

At the other extreme, Shopify uses larger Liquid models in the 7-8 billion parameter range for maximum throughput batch jobs like offline product categorization, attribute extraction, and clustering. These jobs are essentially unbounded in compute requirements, dealing with billions of products and quadratic complexity problems. Liquid models excel here as distillation targets, where Shopify takes the largest available frontier models, distills them into Liquid for specific tasks, and runs at massive scale.

The CTO believes that if Liquid AI had compute resources comparable to Anthropic, Google, or OpenAI, they would be highly competitive with frontier models, especially in hybrid architectures combining Liquid and transformer components. While Shopify remains omnivorous and constantly tests all available models, Liquid has been taking increasing share of internal workloads over time on pure merit.

## Infrastructure Challenges and Future Directions

The massive increase in code generation velocity has exposed CI/CD infrastructure as the primary bottleneck. With 30% month-over-month growth in PR merges and increasing estimated complexity per change, the probability of at least some tests failing has increased substantially. This creates a cascading problem where failed tests require finding offending PRs, evicting them, retesting without those PRs, and extending the overall deployment cycle.

Shopify uses tools like Graphite for stacked PRs but acknowledges that the entire CI/CD paradigm and interaction with code repositories needs reimagining for an agentic world. The current systems were designed for humans working at human speeds. Once code gets written at machine speeds, fundamental concepts like merge conflicts become global mutexes that create bottlenecks.

The CTO speculates, somewhat surprisingly given his long-standing opposition, that microservices architectures might make a comeback in an AI-native world. The ability to ship independently in small units and manage complexity automatically could address the merge conflict problem. The company is also exploring alternatives inspired by chaos engineering concepts from Netflix, including service discovery and independent microservices with built-in redundancy and robustness.

Shopify has also developed sophisticated infrastructure for causal modeling and counterfactual analysis using hierarchical state space models. This allows them to model entire companies and their possible paths, performing interventions at specific points in the customer or merchant journey and rolling forward to see potential outcomes. This powers features like Shopify Pulse, which notifies merchants of potential issues and recommended actions, and buyer-level optimizations for discounts and cashback offers.

The ability to model complex systems like human behavior or company trajectories and perform counterfactual optimization of intervention timing and type represents capabilities that were theoretically understood but practically impossible before LLMs and modern agent architectures.

## Lessons and Philosophy

Several key philosophical principles emerge from Shopify's LLMOps practice. First, they emphasize quality over quantity in token usage, with efficient critique loops outperforming parallel agent swarms. Second, they invest heavily in automated PR review with expensive models, understanding that preventing bugs is cheaper than dealing with failed deployments. Third, they democratize AI capabilities through platforms like Tangle and Tangent rather than restricting them to specialists.

Fourth, they remain agnostic about tools and models, constantly testing everything and letting results drive decisions. Fifth, they recognize that historical data is what separates useful AI applications from prompt-driven toys, particularly in applications like customer simulation. Sixth, they understand that different parts of the stack have different optimization targets, from 30-millisecond latency for search to maximum throughput for batch jobs, requiring diverse model architectures and serving strategies.

The company has also learned important lessons about what auto-research can and cannot do. It excels at scale-intensive optimization within known paradigms but struggles with truly novel approaches. The democratization it enables comes with the requirement for proper infrastructure, calibration data, and careful architecture decisions about agent communication patterns.

Looking forward, Shopify continues to invest heavily in LLMOps infrastructure, particularly around distillation to manage costs as token usage explodes, CI/CD reimagining for AI-scale code generation, and extending causal modeling capabilities across more domains. Their openness about both successes and challenges provides valuable insights for other organizations navigating production AI deployment at scale.
