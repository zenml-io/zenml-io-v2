---
title: "AI Agents for Automated Performance Engineering and Code Optimization"
slug: "ai-agents-for-automated-performance-engineering-and-code-optimization"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "agent-based"
  - "prompt-engineering"
  - "memory"
  - "harness-engineering"
  - "human-in-the-loop"
  - "cicd"
  - "monitoring"
  - "documentation"
  - "guardrails"
industryTags: "media-entertainment"
company: "Netflix"
summary: "Netflix's AI Platform organization developed a system using LLM-based coding agents to automate performance engineering, addressing the challenge that code generation by AI agents was outpacing performance optimization efforts and leading to increasing compute costs. The solution involves feeding profiling data from production services to AI agents that can identify performance bottlenecks, propose optimized code changes, and validate fixes through automated canary deployments, reducing the time to identify issues from 20+ minutes of manual analysis to under 5 minutes. The system achieved measurable results including 8.8% CPU reduction in one service and identified optimization opportunities of 0.5-4.6% CPU savings across seven different services sharing the same anti-pattern, while establishing a centralized pattern catalog to enable shift-left optimization throughout the software development lifecycle."
link: "https://www.youtube.com/watch?v=CgsWxRUY5Eo"
year: 2026
seo:
  title: "Netflix: AI Agents for Automated Performance Engineering and Code Optimization - ZenML LLMOps Database"
  description: "Netflix's AI Platform organization developed a system using LLM-based coding agents to automate performance engineering, addressing the challenge that code generation by AI agents was outpacing performance optimization efforts and leading to increasing compute costs. The solution involves feeding profiling data from production services to AI agents that can identify performance bottlenecks, propose optimized code changes, and validate fixes through automated canary deployments, reducing the time to identify issues from 20+ minutes of manual analysis to under 5 minutes. The system achieved measurable results including 8.8% CPU reduction in one service and identified optimization opportunities of 0.5-4.6% CPU savings across seven different services sharing the same anti-pattern, while establishing a centralized pattern catalog to enable shift-left optimization throughout the software development lifecycle."
  canonical: "https://www.zenml.io/llmops-database/ai-agents-for-automated-performance-engineering-and-code-optimization"
  ogTitle: "Netflix: AI Agents for Automated Performance Engineering and Code Optimization - ZenML LLMOps Database"
  ogDescription: "Netflix's AI Platform organization developed a system using LLM-based coding agents to automate performance engineering, addressing the challenge that code generation by AI agents was outpacing performance optimization efforts and leading to increasing compute costs. The solution involves feeding profiling data from production services to AI agents that can identify performance bottlenecks, propose optimized code changes, and validate fixes through automated canary deployments, reducing the time to identify issues from 20+ minutes of manual analysis to under 5 minutes. The system achieved measurable results including 8.8% CPU reduction in one service and identified optimization opportunities of 0.5-4.6% CPU savings across seven different services sharing the same anti-pattern, while establishing a centralized pattern catalog to enable shift-left optimization throughout the software development lifecycle."
notion:
  pageId: "3acf8dff-2538-8073-8473-f5c05531e8d3"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-29T06:58:00.000Z"
  lastEditedTime: "2026-07-29T06:58:00.000Z"
  publishedAt: "2026-08-06T11:48:35Z"
---

## Overview

Netflix's AI Platform organization presented a comprehensive approach to using LLM-based AI agents to automate performance engineering at scale. The initiative was driven by a fundamental challenge in modern software development: as coding agents become increasingly capable at generating code quickly, they're producing code at 10x faster speeds, but this code isn't always optimized for performance. The result is compute costs increasing at similar rates because these general-purpose coding agents lack specific knowledge about internal platforms, frameworks, and organizational code patterns.

The presentation by Rajat Shah, a staff software engineer working on large-scale distributed systems for machine learning model hosting, offers a practitioner's guide for implementing similar systems. The approach is designed to be replicable across organizations looking to reduce infrastructure costs and ship faster while maintaining performance standards.

## The Core Problem and Motivation

Traditional performance engineering doesn't scale in the modern AI-assisted development environment. The manual process is extremely time-intensive and follows a predictable but laborious pattern: human engineers trigger profiling on production instances, download raw profiling data (typically JSON-structured call stacks showing CPU time distribution), open this data in visualizers to make sense of it, spend many minutes identifying bottlenecks in what amounts to a "treasure hunt" through the call stack, search code repositories for the problematic code paths, and finally produce code reviews with fixes. This entire cycle can take 20+ minutes of focused engineer time just to identify issues, and the actual fixing takes even longer.

The fundamental bottleneck is the learning curve and time required to analyze profiling data effectively. As a result, this work is done rarely and reactively, typically only when something goes wrong in production at critical moments. This reactive approach is insufficient in an environment where code is being generated and shipped at unprecedented speeds.

## Foundational Assumptions and Initial Experiment

Netflix's approach was built on two key assumptions. First, profiling tools across different languages and runtimes essentially speak the same language. Whether services are written in Java, Python, Go, or other languages, profilers capture similar structured data: call stacks, self CPU time, and inclusive CPU time spent on each method, sampled at high frequency. This uniformity makes profiling output well-suited for LLM consumption regardless of the underlying technology stack.

Second, common performance anti-patterns are well-represented in the training data of modern coding agents. Patterns like O(n²) loops, loop invariants computed repeatedly instead of once, excessive object allocation, and contention issues are all documented extensively in publicly available code. Well-trained coding agents on high-quality software code already understand which patterns are problematic, making this fundamentally a pattern recognition task rather than requiring novel reasoning.

The experimental validation began with a simple question: can an LLM read profiling data and identify hot paths faster than the 20 minutes a human engineer typically requires? The team tested this hypothesis on live production services. They found that when fed structured profiling data showing call paths and CPU consumption percentages, LLM agents could indeed identify problematic patterns. For example, when seeing an immutable map copy operation consuming significant CPU in a tensor merge method, the agent recognized this as implementing a quadratic algorithm rather than a linear one, purely by analyzing the call stack without even looking at the source code initially.

## The Agent Workflow and Technical Implementation

Once the agent identifies a potential issue from profiling data, it follows a systematic workflow. First, it performs a code search to locate the repository where the problematic method is defined. It then identifies the exact commit currently running in production, which is readily available from deployment metadata. The agent clones the Git repository at that specific commit to ensure it's working with the exact code version in production. It then locates the exact code path, skipping internal library details to focus on application code, and traces the entire call path of the problematic method.

With this structured information, the agent becomes quite powerful. In Netflix's experiments, given proper instructions in the form of skills or prompts, the agent could complete all these steps in under 5 minutes, even in very large codebases. This includes not just identifying the issue but actually producing a complete code review with proposed fixes.

## Concrete Results and Cross-Service Pattern Detection

The first proof of concept involved an O(n²) implementation that the agent identified as consuming 8.8% of CPU time during profiling. The agent not only found the problem but produced a fix that, when deployed, resulted in measurable CPU and latency savings in production. This validated that the approach could go beyond identification to actually producing mergeable code improvements.

A particularly powerful discovery was the agent's ability to generalize patterns across services. In one case, the agent identified a counter object allocation pattern that was being created on every iteration of a hot path. This pattern was problematic for spectator metrics implementation. The agent didn't stop at fixing one service; it performed cross-repository code searches and discovered the same anti-pattern replicated across seven different services. When fixed across all these services, the optimization delivered between 0.5% and 4.6% CPU savings per service. This cross-service pattern detection represents significant leverage, where one profiling session can identify optimization opportunities across an entire service fleet.

## Building Long-Term Memory Through Pattern Catalogs

A critical challenge in making this system production-ready is that LLMs, even with some memory capabilities, cannot retain all the institutional knowledge a performance engineer accumulates over time. Netflix's solution is to build a centralized pattern catalog that serves as long-term memory for otherwise stateless LLM agents. This catalog is intentionally simple: markdown files in a centralized Git repository.

The catalog structure is designed to be both human and machine readable. Each entry includes symbols that help LLMs query the catalog, lists of services where the pattern was confirmed, and confidence levels that increase as more services validate the pattern. Higher confidence levels help agents determine when to confidently send code reviews for human approval. The catalog also includes both anti-patterns to avoid and good patterns to follow, providing balanced guidance.

The beauty of this approach is its growth mechanism. Even if one service discovers a pattern through profiling, all future services that run profiling can benefit from that catalog entry. The agent working on a different service can reference the catalog to identify patterns more optimally without redoing the discovery work. This creates a compounding knowledge effect across the organization.

The catalog doesn't need to start empty. Netflix bootstraps it from several sources: Jeff Dean's blog posts on C++ optimization opportunities, PyTorch's torch.fix repository documenting kernel and model graph anti-patterns, and existing internal performance playbooks that organizations naturally develop as their software matures. These provide a strong foundation that grows continuously through production findings.

## Validation and Safety Through Canary Deployments

A crucial aspect of the Netflix approach is maintaining human oversight while automating as much as possible. The system is designed to send code reviews for human approval, not to push changes directly to production. This is intentional and risk-based reasoning: modifying code that's already running fine in production to optimize it is inherently risky. Without sufficient business context and test coverage, optimization changes could introduce bugs.

To reduce noise and only surface high-quality suggestions to humans, the system implements multiple validation layers before requesting human attention. First, the agent must run all integration tests, unit tests, and functional tests that exist for the system. This ensures the proposed changes don't break any known business logic. However, code coverage is rarely perfect, so Netflix adds another critical layer: automated canary deployments.

The canary process runs before code review. The agent deploys the optimized code to a canary instance while keeping the old code on another instance, then sends the same traffic to both over a period like 10 minutes. The observability report from this canary includes standard infrastructure metrics: CPU reduction, latency changes, and critically, any increase in error rates. If error rates increase, the agent recognizes this as a red flag indicating it may have inadvertently broken business logic while optimizing, and it does not proceed with the code review.

This creates a useful mental model: profilers provide estimates of potential improvements, while canaries provide ground truth validation. The engineer then makes the final decision based on verified data rather than speculation. Importantly, Netflix emphasizes that canary automation, observability, and testing infrastructure are not AI problems themselves. These are foundational capabilities that need to be rock-solid before introducing AI agents. The AI agent simply needs to know how to invoke canaries, where to download reports, and how to interpret the results.

## Shifting Left: From Reactive to Proactive Optimization

While the reactive path of profiling production services and fixing issues is valuable, Netflix's vision extends to shifting this optimization earlier in the development lifecycle. The reactive path serves as the initial approach for building the pattern catalog, but as the catalog grows, it enables more proactive interventions.

At the code review stage, a reviewer agent can examine code changes against the pattern catalog. Understanding the proposed code and comparing it to known anti-patterns, the reviewer agent can provide inline comments suggesting optimizations before the code reaches production. This is valuable, but still relatively late in the process.

The ultimate shift-left goal is integration at the code authoring phase itself. When developers use coding agents to write new code, those agents can reference the pattern catalog during code generation. Before generating tokens that would produce inefficient code, the agent consults the catalog and writes optimized code from the start. This approach may consume more tokens and slow down initial code generation slightly, which is why the pattern catalog must be well-structured and indexed for efficient navigation. Agents should traverse it hierarchically rather than loading the entire catalog into context.

By catching anti-patterns at authoring time, organizations avoid the overhead of code review feedback cycles and prevent inefficient code from ever reaching production. The earlier in the lifecycle the optimization occurs, the lower the overall cost and friction.

## Foundation-First Philosophy

Netflix strongly emphasizes that effective AI agent integration requires excellent foundations. Test coverage must be rock-solid with business logic thoroughly encoded in tests. Canary automation must be mature and reliable. The pattern catalog, while simple in implementation, must be well-maintained and structured. These are explicitly not AI problems but rather infrastructure and process investments that must be made first.

The AI agent needs clear integration points: how to automatically trigger profiling on instances, how to download profiling data, how to validate fixes through production canaries with shadow or real traffic. Without these foundations, introducing AI agents creates more friction and potential for production bugs rather than solving problems.

## Automation Maturity Levels

Netflix presents a maturity model for automation that helps organizations understand their progression path. Level one is the current state for many organizations: spending hours manually finding problems with no LLM involvement. Level two introduces LLMs for identification of potential fixes, though humans may still manually trigger profilers and run canaries. This already provides significant value by eliminating the tedious work of staring at flame graphs.

Level two also encompasses the orchestration described in this talk: providing agents with tools, integrations, and hooks to fully automate the workflow from profiling through canary validation to code review generation. Critically, this workflow is static and predefined. The agent doesn't need to reason about or plan the workflow itself; it simply follows the defined steps: trigger profile, download results, analyze, run canary, provide suggested fix.

Once level two is established, organizations can run this workflow on a scheduled basis, perhaps weekly, to continuously identify new problems introduced in recent code changes. This keeps optimization efforts close to when problematic code was written, when context is freshest.

Level three would involve more autonomous agents capable of planning and reasoning about the workflow itself, adapting their approach based on context. However, Netflix cautions that this requires substantially more investment in evaluation frameworks and security sandboxing. Issues like prompt injection and other security attacks are not yet fully solved in current agent infrastructures. Organizations should start with level one, move to level two where maximum benefits are realized, and only consider level three if additional automation is genuinely needed.

## Critical Assessment and Balanced Perspective

While Netflix presents compelling results, several important considerations should be noted for a balanced assessment. The approach relies heavily on having excellent existing infrastructure: comprehensive test suites, mature canary deployment systems, and robust observability. Organizations without these foundations would need significant investment before AI agents could be safely deployed in this role.

The reliance on human approval for all changes is both a strength and a limitation. It ensures safety and maintains accountability, but also means the system doesn't achieve full autonomy. The value proposition is primarily about engineering efficiency and reducing toil rather than eliminating human involvement entirely.

The pattern catalog approach, while elegant in its simplicity, requires ongoing maintenance and curation. As catalogs grow, ensuring they remain well-structured and don't become unwieldy will require discipline and potentially tooling investments. The claim that catalogs can become ubiquitous across languages and frameworks is promising but remains to be fully validated at scale.

The reported savings, while concrete, are presented for specific cases. The 8.8% CPU reduction and 0.5-4.6% range across multiple services are meaningful, but organizations should expect variability in results based on their code quality, existing optimization efforts, and service characteristics. The approach is most valuable when code generation is happening rapidly and performance optimization hasn't kept pace.

The shift-left vision of integrating pattern catalogs into code authoring agents is compelling but introduces tradeoffs. Consuming more tokens and potentially slowing code generation may not be acceptable in all contexts. The hierarchical navigation and structured indexing of patterns becomes increasingly critical as catalogs grow, and this is an area where implementation details will matter significantly.

Finally, while Netflix emphasizes that level three autonomy with planning and reasoning is optional, the security and evaluation challenges they mention are real. Organizations considering deeper automation should carefully assess whether their security posture and sandboxing capabilities are adequate for more autonomous agents.

## Operational Considerations and Production Readiness

From an LLMOps perspective, this case study demonstrates several important operational patterns. The system integrates AI agents into existing development workflows rather than replacing them entirely. The agent workflow touches multiple systems: profiling infrastructure, Git repositories, CI/CD pipelines, canary deployment systems, and observability platforms. Each integration point represents an opportunity for failure and requires robust error handling.

The feedback loop from canary deployments back to agents is particularly noteworthy as an evaluation mechanism. Rather than relying solely on offline evaluation or human judgment, the system uses production-like conditions to validate changes before human review. This represents a practical approach to evaluating agent-generated code changes in domain-specific contexts where generic code quality metrics may be insufficient.

The choice of markdown files in Git for the pattern catalog is pragmatic and aligns with existing developer workflows. It provides version control, code review processes for catalog updates, and familiar tooling. However, as the catalog scales, questions about searchability, indexing, and how agents efficiently navigate large catalogs will become increasingly important. The mention of hierarchical navigation suggests Netflix is thinking about these scaling challenges, but the specific implementation details are not fully elaborated.

The scheduled weekly runs of the profiling and optimization workflow represent a shift toward continuous performance optimization rather than reactive firefighting. This is analogous to continuous integration and deployment but applied to performance characteristics. However, it also raises questions about alert fatigue, prioritization of findings, and how to manage potentially large volumes of optimization suggestions across many services.

## Conclusion and Broader Implications

Netflix's approach to AI-assisted performance engineering represents a thoughtful integration of LLM capabilities with solid engineering foundations. The system achieves measurable infrastructure cost savings while reducing engineering toil in performance optimization. The pattern catalog concept provides a scalable way to build and share organizational knowledge, with AI agents serving as both consumers and contributors to this knowledge base.

The emphasis on starting with reactive optimization to build the catalog, then shifting left toward proactive optimization, provides a clear adoption path for other organizations. The maturity model from level one through three helps set realistic expectations about what's achievable and what foundations are required at each stage.

This case study exemplifies production LLMOps by demonstrating how to safely integrate AI agents into critical paths of software development, how to validate their outputs rigorously, how to build organizational memory that compounds over time, and how to maintain human oversight while automating substantial portions of tedious work. The results show that AI agents can be effective for specialized tasks like performance engineering when given appropriate tools, validation mechanisms, and knowledge bases, even if they're not yet ready for fully autonomous operation in production environments.
