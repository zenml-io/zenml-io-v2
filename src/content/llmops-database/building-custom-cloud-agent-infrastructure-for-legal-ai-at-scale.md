---
title: "Building Custom Cloud Agent Infrastructure for Legal AI at Scale"
slug: "building-custom-cloud-agent-infrastructure-for-legal-ai-at-scale"
draft: false
llmopsTags:
  - "healthcare"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "document-processing"
  - "agent-based"
  - "multi-agent-systems"
  - "cost-optimization"
  - "harness-engineering"
  - "latency-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "open-source"
  - "security"
  - "compliance"
  - "guardrails"
  - "orchestration"
  - "anthropic"
  - "openai"
  - "amazon-aws"
  - "microsoft-azure"
  - "google-gcp"
industryTags: "legal"
company: "Harvey"
summary: "Harvey, a legal AI company, built their own custom cloud agent infrastructure to support complex legal tasks that require processing hundreds of thousands of documents. The company identified three critical requirements that existing managed agent runtimes from frontier labs and cloud providers couldn't meet: multi-model flexibility (to handle client conflicts and optimize for different tasks), zero data retention (a hard legal requirement for privileged client data), and aggressive cost optimization (achieving 3-5x cost reductions). By owning the runtime, Harvey created an abstraction layer that normalizes different model providers' APIs, ensures client data never persists to storage, and enables intelligent routing to the most cost-effective model for each task, making large-scale legal agent workflows economically viable while meeting stringent regulatory requirements."
link: "https://x.com/gabepereyra/status/2061449144074444925"
year: 2026
seo:
  title: "Harvey: Building Custom Cloud Agent Infrastructure for Legal AI at Scale - ZenML LLMOps Database"
  description: "Harvey, a legal AI company, built their own custom cloud agent infrastructure to support complex legal tasks that require processing hundreds of thousands of documents. The company identified three critical requirements that existing managed agent runtimes from frontier labs and cloud providers couldn't meet: multi-model flexibility (to handle client conflicts and optimize for different tasks), zero data retention (a hard legal requirement for privileged client data), and aggressive cost optimization (achieving 3-5x cost reductions). By owning the runtime, Harvey created an abstraction layer that normalizes different model providers' APIs, ensures client data never persists to storage, and enables intelligent routing to the most cost-effective model for each task, making large-scale legal agent workflows economically viable while meeting stringent regulatory requirements."
  canonical: "https://www.zenml.io/llmops-database/building-custom-cloud-agent-infrastructure-for-legal-ai-at-scale"
  ogTitle: "Harvey: Building Custom Cloud Agent Infrastructure for Legal AI at Scale - ZenML LLMOps Database"
  ogDescription: "Harvey, a legal AI company, built their own custom cloud agent infrastructure to support complex legal tasks that require processing hundreds of thousands of documents. The company identified three critical requirements that existing managed agent runtimes from frontier labs and cloud providers couldn't meet: multi-model flexibility (to handle client conflicts and optimize for different tasks), zero data retention (a hard legal requirement for privileged client data), and aggressive cost optimization (achieving 3-5x cost reductions). By owning the runtime, Harvey created an abstraction layer that normalizes different model providers' APIs, ensures client data never persists to storage, and enables intelligent routing to the most cost-effective model for each task, making large-scale legal agent workflows economically viable while meeting stringent regulatory requirements."
notion:
  pageId: "373f8dff-2538-8055-99ed-d8684974b06f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T06:58:00.000Z"
  lastEditedTime: "2026-06-02T07:00:00.000Z"
  publishedAt: "2026-06-02T07:03:07Z"
---

## Overview

Harvey is a legal AI company that has evolved from a chat-based product to a full cloud agent platform capable of completing complex legal tasks end-to-end, such as reviewing entire data rooms and producing issues lists across hundreds of thousands of documents. This case study describes why Harvey built their own cloud agent infrastructure rather than relying on managed agent runtimes from frontier labs like Anthropic's Claude Managed Agents and OpenAI's offerings, or from cloud providers like AWS, Microsoft Foundry, and Google. The decision was driven by three critical requirements specific to serving law firms and regulated enterprises: multi-model flexibility, zero data retention, and cost optimization. While the company acknowledges that managed runtimes are impressive and expects gaps to close over time, these requirements remain hard blockers that necessitate owning the runtime infrastructure.

## Multi-Model Requirements and Flexibility

Harvey's first major requirement is multi-model support, which the company argues is becoming table stakes rather than an edge case feature. This requirement stems from two primary drivers: client conflicts and quality optimization.

The conflicts issue is particularly important in the legal industry. Law firms face commercial pressure when representing model providers—they are expected to use their client's technology. More critically, clients who build their own models will not permit their outside counsel to send sensitive legal matters through a competitor's model. As more companies train proprietary models and as frontier labs expand into more industries, the number of firms caught by these conflicts grows rapidly. Harvey argues that within a few years, any firm wanting to serve a broad client base will need to run on essentially any model because important clients will inevitably object to specific providers.

Beyond conflicts, multi-model support enables quality and cost optimization. Harvey's LAB (Legal AI Benchmark) shows clear separation in model performance by practice area and task type, and this spread is widening as open-source models improve. The industry is shifting from asking "Which model is best?" to "Which model is most efficient for this specific task?" Answering this question requires access to multiple models.

Platform risk represents another critical concern that agents make more acute than chat applications. If a company commits to a single provider's managed runtime and that provider's models fall behind, runs out of capacity, deprioritizes the vertical, changes pricing, or drops critical features, the customer is stranded. With agents, the lock-in extends beyond just the model to the entire agent workforce—the agents that teams have built, tuned, and rely on live inside that provider's runtime using its formats and orchestration. This creates company-level risk for firms betting their operations on agents.

Harvey distinguishes between two types of managed runtimes: frontier labs' runtimes tie customers to that lab's models (maximum lock-in), while cloud providers' runtimes are model-flexible but tend to lag on newest models and face redundancy and uptime limits. Neither is sufficient alone, which is why Harvey works with all of them and routes across them.

To enable this routing, Harvey built an abstraction layer that normalizes the different agent harnesses, sandboxes, and behavioral differences across providers. Each provider exposes different tool-call formats, stop conditions, streaming behavior, failure modes, and execution sandboxes, and the same task tuned for one model will underperform on another. The abstraction layer presents a single interface above which the choice of model becomes just a routing decision.

## Zero Data Retention Architecture

Every law firm and enterprise contract Harvey signs requires zero data retention (ZDR), which is not negotiable because the data in question is privileged and confidential and cannot sit on third-party servers. Frontier labs' managed runtimes don't offer ZDR, which means running client matters through them would leave client data retained on the lab's infrastructure—a complete nonstarter for Harvey's customers.

The case study emphasizes that ZDR cannot be bolted on after the fact. There is a tempting shortcut of storing data during a run and calling a deletion endpoint afterward, but this constitutes retention followed by deletion, not zero retention. True ZDR means data is never written to persistent storage in the first place, which is an architectural property of the runtime rather than a toggle setting.

Agents make ZDR harder to achieve than chat applications because agents are stateful. A long-running agent accumulates working memory, intermediate files, tool results, and checkpoints used to recover from interruptions. A managed runtime earns its value precisely by persisting all of this state in its cloud, but that persisted state represents customer data at rest in someone else's environment. Automatic state persistence and zero retention are mutually exclusive—you cannot have both.

By owning the runtime, Harvey ensures the agent's entire lifecycle runs inside their security boundary. State is scoped to the session and purged afterward, so the zero-retention guarantee covers the whole workflow rather than just the final model call. This architectural decision is foundational to meeting legal industry requirements and cannot be achieved by layering on top of existing managed platforms.

## Cost Optimization and Intelligent Routing

Cost optimization is described as perhaps the most important consideration and the one growing fastest. Harvey's usage is climbing steeply, and serving capable models as agents at scale is extraordinarily expensive. A single agent run can involve hundreds of model and tool calls over a large corpus, making the naive approach of routing everything to the best frontier model economically unsustainable. The firms Harvey works with are increasingly asking not just for agents that work, but for agents that are economical.

The key insight Harvey leverages is that for most tasks, the largest model is no longer necessary. As models have improved, a growing share of legal work has become "intelligence-saturated"—the task sits well within reach of a small or open-source model, and using a top frontier model simply overspends capability the task doesn't require. Harvey's LAB benchmark demonstrates that across many task types, open-source models match frontier quality at a fraction of the cost. The goal has shifted from finding the best model to finding the one that's good enough, cheapest, and fastest for the specific task.

Achieving this optimization at scale requires fine-grained control over both model routing and the execution sandbox, which managed platforms don't currently expose sufficiently. Owning the runtime allows Harvey to route each task to the most efficient model that meets the quality threshold, including open-source models they host themselves. It also enables optimization of the sandbox—how files are loaded, how work is parallelized, how compute is sized—around legal workloads specifically.

The company reports empirically seeing 3-5x cost reductions versus a frontier-only approach, depending on model and workload. This level of optimization is structurally unavailable to anyone building on top of someone else's runtime and represents the difference that makes serving agents over a firm's full document set (hundreds of thousands or millions of files) economically viable rather than a spiraling cost center.

## LLMOps Technical Implementation

From an LLMOps perspective, Harvey has built a sophisticated multi-layer architecture that addresses the full production lifecycle of legal AI agents. The abstraction layer they built sits between the application layer and multiple model providers, normalizing interfaces and enabling dynamic routing decisions. This is a critical LLMOps pattern for production systems that need to avoid vendor lock-in while optimizing for different dimensions (cost, quality, latency).

The stateful nature of agents presents unique operational challenges compared to stateless chat applications. Harvey manages working memory, intermediate files, tool results, and checkpoints while ensuring nothing persists beyond the session scope. This requires careful orchestration of the agent lifecycle and likely involves custom session management, garbage collection, and failure recovery mechanisms that respect the zero-retention constraint.

The benchmark-driven approach to model selection, using their LAB benchmark, represents a mature LLMOps practice. They evaluate models across practice areas and task types with rubrics graded by GPT-5.4 (mentioned in the figure caption), enabling data-driven routing decisions. This suggests a continuous evaluation pipeline that feeds into their routing logic, allowing them to update routing strategies as model capabilities evolve.

The company's usage growth chart indicates they are operating at significant scale, making infrastructure efficiency and reliability critical. Managing hundreds of model and tool calls per agent run, potentially across hundreds of thousands of documents, requires sophisticated orchestration, parallel execution, and resource management capabilities.

## Legal-Specific Requirements and Future Direction

Beyond the three main requirements, Harvey mentions additional legal-specific needs that reinforce the value of owning the runtime: multi-cloud resilience, data residency requirements (including keeping matters within specific jurisdictions), sovereign deployments where largest customers can self-host the infrastructure within their own boundary, conflict-aware governance that encodes which models a matter is allowed to use, and complete inspectable records of agent actions for work-product and privilege purposes.

Harvey explicitly states they don't expect to run their own infrastructure forever in its current form and believe cloud providers in particular will eventually meet these requirements. They've built their runtime to absorb improvements as they arrive rather than route around the ecosystem indefinitely. When a provider can handle a piece better, they want to use it. However, the legal-specific layer—sovereign deployments, conflict-aware governance, jurisdiction-specific data residency—represents capabilities that general-purpose runtimes won't solve for the legal industry, making this layer durable rather than temporary.

## Critical Assessment

While Harvey presents compelling technical and business reasons for building their own infrastructure, several claims warrant balanced consideration. The 3-5x cost reduction is impressive but presented without detailed methodology—it's unclear what baseline they're comparing against and whether this accounts for the engineering costs of building and maintaining custom infrastructure. The claim that managed runtimes "won't for a while" meet these requirements may be overstated given the rapid evolution of the space, though the legal-specific requirements are genuinely unique.

The zero data retention requirement is presented as binary and non-negotiable, which is likely accurate for the legal industry, but the technical implementation details are sparse. How exactly do they handle checkpoint recovery for long-running agents without persistence? What happens during infrastructure failures? The case study doesn't address the operational complexity trade-offs of their approach.

The multi-model conflict issue is real and well-articulated, but the prediction that it will become universal may be somewhat overstated depending on how the industry evolves. That said, for Harvey's specific market (serving major law firms representing technology companies), the reasoning is sound.

Overall, this represents a sophisticated LLMOps implementation driven by legitimate industry-specific requirements. Harvey has made an informed build-versus-buy decision and invested in infrastructure that provides genuine competitive advantages in their market, while maintaining flexibility to adopt managed solutions as they mature. The case study provides valuable insights into the operational requirements of running agents in regulated, high-stakes production environments where off-the-shelf solutions fall short.
