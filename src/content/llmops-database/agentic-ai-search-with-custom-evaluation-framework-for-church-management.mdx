---
title: "Agentic AI Search with Custom Evaluation Framework for Church Management"
slug: "agentic-ai-search-with-custom-evaluation-framework-for-church-management"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69806f69f8c420ca7fae2534"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-03T15:19:04.226Z"
  lastUpdated: "2026-02-02T10:00:13.669Z"
  createdOn: "2026-02-02T09:33:29.774Z"
llmopsTags:
  - "customer-support"
  - "question-answering"
  - "data-analysis"
  - "high-stakes-application"
  - "structured-output"
  - "prompt-engineering"
  - "semantic-search"
  - "agent-based"
  - "few-shot"
  - "latency-optimization"
  - "cost-optimization"
  - "evals"
  - "monitoring"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "databases"
  - "cache"
  - "anthropic"
  - "amazon-aws"
industryTags: "tech"
company: "Pushpay"
summary: "Pushpay, a digital giving and engagement platform for churches and faith-based organizations, developed an agentic AI search feature to help ministry leaders query community data using natural language. The initial solution achieved only 60-70% accuracy and faced challenges in systematic evaluation and improvement. To address these limitations, Pushpay built a comprehensive generative AI evaluation framework on Amazon Bedrock, incorporating a curated golden dataset of over 300 queries, an LLM-as-judge evaluator, domain-based categorization, and performance dashboards. This framework enabled rapid iteration, strategic domain-level feature rollout, and implementation of dynamic prompt construction with semantic search. The solution ultimately achieved 95% accuracy in high-priority domains, reduced time-to-insight from 120 seconds to under 4 seconds, and provided the confidence needed for production deployment."
link: "https://aws.amazon.com/blogs/machine-learning/build-reliable-agentic-ai-solution-with-amazon-bedrock-learn-from-pushpays-journey-on-genai-evaluation?tag=soumet-20"
year: 2026
seo:
  title: "Pushpay: Agentic AI Search with Custom Evaluation Framework for Church Management - ZenML LLMOps Database"
  description: "Pushpay, a digital giving and engagement platform for churches and faith-based organizations, developed an agentic AI search feature to help ministry leaders query community data using natural language. The initial solution achieved only 60-70% accuracy and faced challenges in systematic evaluation and improvement. To address these limitations, Pushpay built a comprehensive generative AI evaluation framework on Amazon Bedrock, incorporating a curated golden dataset of over 300 queries, an LLM-as-judge evaluator, domain-based categorization, and performance dashboards. This framework enabled rapid iteration, strategic domain-level feature rollout, and implementation of dynamic prompt construction with semantic search. The solution ultimately achieved 95% accuracy in high-priority domains, reduced time-to-insight from 120 seconds to under 4 seconds, and provided the confidence needed for production deployment."
  canonical: "https://www.zenml.io/llmops-database/agentic-ai-search-with-custom-evaluation-framework-for-church-management"
  ogTitle: "Pushpay: Agentic AI Search with Custom Evaluation Framework for Church Management - ZenML LLMOps Database"
  ogDescription: "Pushpay, a digital giving and engagement platform for churches and faith-based organizations, developed an agentic AI search feature to help ministry leaders query community data using natural language. The initial solution achieved only 60-70% accuracy and faced challenges in systematic evaluation and improvement. To address these limitations, Pushpay built a comprehensive generative AI evaluation framework on Amazon Bedrock, incorporating a curated golden dataset of over 300 queries, an LLM-as-judge evaluator, domain-based categorization, and performance dashboards. This framework enabled rapid iteration, strategic domain-level feature rollout, and implementation of dynamic prompt construction with semantic search. The solution ultimately achieved 95% accuracy in high-priority domains, reduced time-to-insight from 120 seconds to under 4 seconds, and provided the confidence needed for production deployment."
---

## Overview

Pushpay is a digital giving and engagement platform serving churches and faith-based organizations with community management, donation tracking, and engagement tools. The company developed an innovative agentic AI search capability that allows ministry leaders—who typically lack technical backgrounds and face significant time constraints—to query their community data using natural language. Questions like "show me people who are members in a group, but haven't given this year" can now be answered in seconds rather than minutes, democratizing access to data insights without requiring technical expertise or navigation through complex user interfaces.

The case study presents a comprehensive LLMOps journey from initial prototype to production-ready system, with particular emphasis on the critical role of systematic evaluation infrastructure. While the source material is promotional content from AWS highlighting their services, it provides substantive technical detail about real-world challenges in operationalizing agentic AI systems and the engineering practices required to achieve production-grade reliability.

## Initial Architecture and Its Limitations

The first iteration of Pushpay's AI search agent implemented a relatively straightforward architecture built around Amazon Bedrock. The core component was a single agent configured with a carefully engineered system prompt that defined the LLM's role, provided detailed instructions, and explained how the user interface worked. Critically, this system prompt included comprehensive descriptions of each filter tool and their sub-settings—a necessary but verbose component given that the application supported over 100 distinct configurable filters that users could apply to their community data.

To optimize for cost and latency, Pushpay leveraged Amazon Bedrock's prompt caching feature, which caches frequently used portions of the system prompt to avoid reprocessing the same tokens repeatedly. This is a production-oriented optimization that demonstrates awareness of operational costs in LLM deployments. The agent would process user queries through the cached system prompt using Amazon Bedrock's LLM (specifically Claude Sonnet 4.5) and generate JSON output that the application would parse to apply the appropriate filters and present query results to users.

However, this initial solution quickly revealed fundamental limitations that are characteristic of early-stage LLM applications. The accuracy plateaued at approximately 60-70% for basic business queries—a success rate that might seem acceptable during development but falls short of production requirements where errors directly impact user trust and adoption. More problematically, the team lacked a systematic way to measure and improve performance beyond this threshold. Evaluation was manual and tedious, making it difficult to understand where failures occurred and whether changes actually improved the system. The diversity of user queries combined with the complexity of over 100 configurable filters created a vast solution space that proved challenging to optimize through manual prompt tuning alone.

This experience highlights a common LLMOps challenge: building a working prototype is relatively straightforward with modern foundation models, but scaling to production-grade reliability requires infrastructure that many teams initially overlook. The gap between 70% and 95% accuracy represents not just incremental prompt improvements but fundamental changes in how the system is developed, evaluated, and optimized.

## The Generative AI Evaluation Framework

To address the evaluation and improvement challenges, Pushpay implemented a comprehensive generative AI evaluation framework that became the cornerstone of their LLMOps practice. This framework consists of four integrated components that work together to provide systematic performance measurement and enable data-driven iteration.

The foundation is a curated golden dataset containing over 300 representative queries, each paired with its corresponding expected output. This dataset was carefully developed through collaboration between product and data science teams to achieve comprehensive coverage of real-world use cases and edge cases. Importantly, the golden dataset is not static—there is a continuous curation process where representative actual user queries are added along with validated results. This approach ensures that the evaluation dataset evolves with actual usage patterns rather than remaining frozen based on initial assumptions about how users would interact with the system.

The evaluator component implements the LLM-as-judge pattern, a technique where an LLM is used to assess the quality of outputs from another LLM. The evaluator processes user input queries and compares the agent-generated output against the expected output from the golden dataset. This generates core accuracy metrics while also capturing detailed logs and performance data such as latency for further analysis and debugging. The LLM-as-judge approach is particularly valuable for complex generative tasks where exact string matching is insufficient but human evaluation is too slow and expensive for rapid iteration. However, it's worth noting that this approach has its own limitations—the judge LLM may have biases or blind spots, and there's an implicit assumption that the judge can reliably distinguish correct from incorrect outputs.

A particularly innovative aspect of Pushpay's framework is the domain category system. Rather than treating all queries uniformly, the system categorizes queries into semantic domains using a combination of generative AI domain summarization and human-defined regular expressions. This hybrid approach leverages the pattern recognition capabilities of LLMs while maintaining some rule-based control for predictable categorization. The evaluator determines the domain category for each query, enabling nuanced, category-based evaluation as an additional dimension beyond simple aggregate accuracy.

The fourth component is a generative AI evaluation dashboard that serves as mission control for Pushpay's product and engineering teams. This dashboard displays domain category-level metrics to assess performance and latency, shifting the team from single aggregate scores to nuanced, domain-based performance insights. The dashboard incorporates statistical confidence visualization using 95% Wilson score intervals, which is a more sophisticated approach than simple accuracy percentages. This statistical rigor is important when dealing with limited test data per category—it provides honest uncertainty bounds rather than falsely precise point estimates.

## Domain-Level Insights and Strategic Rollout

The domain-based evaluation approach revealed varying performance levels across semantic domains, providing crucial insights that would have been hidden by aggregate metrics. For example, the dashboard could pinpoint that the "activity" domain showed significantly lower accuracy than other categories, while also exhibiting notably higher latency than others. This granular visibility enabled strategic decisions about feature rollout rather than forcing an all-or-nothing deployment.

Pushpay made the pragmatic decision to temporarily suppress underperforming categories—such as activity queries—while those domains underwent optimization. By limiting the production system to only handle queries in well-performing domains, the overall system achieved 95% accuracy for users. This approach represents mature LLMOps thinking: users experienced only the highest-performing features while the team continued to refine underperforming domains to production standards in parallel. This is significantly more sophisticated than the common pattern of rushing a system into production and then dealing with user complaints about accuracy issues.

To prioritize improvements systematically, Pushpay employed a 2×2 matrix framework plotting domains against business priority and current performance/feasibility. Topics with both high business value and strong existing performance occupied the top-right quadrant and became the focus of optimization efforts. This made strategic sense—these areas required relatively less engineering effort to move from good performance to exceptional performance, delivering maximum business value for the investment. The implementation followed an iterative cycle where after each round of enhancements, the team would re-analyze results to identify the next set of high-potential topics. This systematic, cyclical approach enabled continuous optimization while maintaining focus on business-critical areas.

This prioritization framework represents a mature approach to LLMOps resource allocation. Rather than attempting to optimize everything simultaneously or focusing solely on the lowest-performing areas, the team balanced business value against technical feasibility to maximize impact. This is particularly important in production systems where engineering resources are always constrained and business stakeholders need to see tangible progress.

## Dynamic Prompt Construction

The insights gained from the evaluation framework led to an important architectural enhancement: the introduction of a dynamic prompt constructor (DPC). Rather than using a single static system prompt for all queries, the DPC automatically constructs customized system prompts based on user-specific information, including church context, sample queries, and application filter inventory. Critically, the system uses semantic search to select only relevant filters among the hundreds of available application filters based on the query content, user persona, and tenant-specific requirements.

This represents a significant evolution in the system's sophistication. The original approach of embedding all filter descriptions in a static system prompt created several problems: it consumed substantial token budget (impacting both cost and latency), introduced noise by including irrelevant information, and lacked the flexibility needed for continuous optimization across different domains. The dynamic approach addresses all these issues by tailoring the prompt to each specific query context.

From an LLMOps perspective, this architectural change also provided operational benefits. It enabled fine-grained control over which domain categories the agent could address, supporting the phased rollout strategy. The structured field inventory became a dynamic element that could be adjusted based on evaluation results rather than requiring changes to a monolithic system prompt. This separation of concerns—between the core agent logic and the contextual information it operates on—is good engineering practice that facilitates rapid iteration.

However, it's worth noting that dynamic prompt construction introduces its own complexity. The system now requires semantic search infrastructure to identify relevant filters, which adds latency and potential failure modes. The quality of the semantic search directly impacts the agent's ability to access the right tools, creating a dependency on embeddings quality and retrieval accuracy. While the case study presents this as unambiguously positive, production teams should be aware that it represents a tradeoff between flexibility and complexity.

## Production Infrastructure and AWS Services

Throughout the solution, Pushpay leveraged several Amazon Bedrock features that are particularly relevant for production LLM deployments. The use of prompt caching is highlighted as significantly reducing token costs and latency by caching frequently used system prompt components. For agents with large, stable system prompts—which describes many enterprise applications—this feature can provide substantial operational savings. The cost reduction comes from avoiding re-processing the same tokens on every request, while latency improvement comes from the cached results being available immediately.

The system uses Claude Sonnet 4.5 as the foundation model, which was state-of-the-art at the time of implementation. The choice of model represents important tradeoffs in LLMOps: more capable models generally provide better accuracy but at higher cost and latency. The case study doesn't discuss model selection criteria or whether alternative models were evaluated, which would have provided useful context for readers making similar decisions.

The evaluation system implements what they describe as a "closed-loop improvement solution" where user interactions are instrumented, captured, and evaluated offline. The evaluation results feed into the dashboard for product and engineering teams to analyze and drive iterative improvements. This observability infrastructure is essential for production LLM systems but often underdeveloped in early deployments. The ability to capture actual user interactions, evaluate them against expected behavior, and feed results back into improvement cycles represents mature operational practice.

## Data Security and Responsible AI Considerations

The case study appropriately emphasizes data security and responsible AI considerations, which are particularly critical given Pushpay's customer base of churches and faith-based organizations handling sensitive information including pastoral care conversations, financial giving patterns, family struggles, and prayer requests. Pushpay established clear standards for incorporating AI within their product ecosystem, maintaining strict security to ensure church data and personally identifiable information remains within their secure partnership ecosystem with appropriate data protections applied.

Critically, they state that data is never used to train external models, addressing a common concern about LLM deployments where customer data might inadvertently be used to improve foundation models. This represents an important LLMOps consideration: understanding the data flow and model training practices of your cloud provider. Amazon Bedrock provides options for preventing customer data from being used in model training, but teams must explicitly configure and validate these settings.

The case study references the AWS Shared Responsibility Model, acknowledging that security in cloud-based AI systems requires coordination between the cloud provider and the customer. This is particularly important for LLM systems where the boundaries of responsibility may be less clear than traditional infrastructure—who is responsible for preventing prompt injection attacks, ensuring outputs don't contain PII, or validating that the model doesn't generate harmful content?

## Business Impact and Results

The evaluation framework delivered measurable value across multiple dimensions. From a user experience perspective, the AI search feature reduced time-to-insight from approximately 120 seconds (for experienced users manually navigating complex UX) to under 4 seconds—a 15-fold acceleration. This is a compelling metric that directly translates to productivity gains for ministry leaders. The feature also democratized data insights, enabling users of different technical levels to access meaningful intelligence without specialized expertise.

Development velocity improved significantly through what they describe as a scientific evaluation approach. Rather than debating prompt modifications subjectively, the team could validate changes and measure domain-specific impacts within minutes. This transformation from prolonged deliberations to data-driven iteration represents a fundamental shift in how AI features are developed. However, it's worth noting that this requires investment in evaluation infrastructure upfront—teams must build the golden dataset, evaluator, and dashboard before they can reap these velocity benefits.

The improvement from 60-70% accuracy to more than 95% accuracy in high-performance domains provided the quantitative confidence required for customer-facing deployment. This is an honest acknowledgment that 60-70% accuracy is insufficient for production deployment in many contexts. The framework's architecture enables continuous refinement across other domain categories, suggesting an ongoing commitment to improvement rather than declaring victory at 95%.

## Critical Assessment and Limitations

While the case study provides valuable insights into production LLMOps practices, it has several limitations worth noting. As promotional content for AWS services, it naturally emphasizes successes while downplaying challenges or limitations. The costs of implementing and operating this evaluation infrastructure are not discussed—building golden datasets, running continuous evaluations, and maintaining dashboards all require significant engineering investment.

The case study doesn't discuss failure modes or ongoing challenges. What happens when the agent encounters queries outside the supported domains? How are users notified when their query cannot be handled? What mechanisms exist to prevent the system from confidently generating incorrect results? These are critical questions for production systems that the material doesn't address.

The evaluation approach relies heavily on the LLM-as-judge pattern, but the case study doesn't discuss validation of the judge itself. How do they ensure the evaluator LLM is providing accurate assessments? What happens when the judge disagrees with human evaluation? There's an implicit assumption that LLM-based evaluation is sufficient, but production systems typically require some level of human validation to calibrate and validate automated evaluation.

The dynamic prompt construction with semantic search introduces dependencies that could impact reliability. What happens if the semantic search fails to retrieve relevant filters? Is there fallback behavior? The added complexity of this architecture component isn't fully explored, though it likely required significant engineering effort to implement reliably.

## Key Takeaways for LLMOps Practice

Despite these limitations, the case study offers several valuable lessons for teams building production LLM systems. The emphasis on building with production in mind from day one is particularly important—many teams discover too late that their prototype architecture doesn't scale to production requirements. Implementing robust tracing and evaluation frameworks during the proof-of-concept phase provides a clear pathway from experimentation to production.

The domain-based evaluation approach is a genuinely useful technique that extends beyond simple aggregate metrics. Many LLM systems serve diverse use cases that have different accuracy requirements and characteristics. Evaluating performance at a granular level enables strategic rollout decisions and targeted optimization rather than treating the entire system as monolithic.

The iterative improvement cycle enabled by the evaluation framework—make change, measure impact, prioritize next improvements—represents mature software engineering practice applied to LLM systems. This is more systematic than the ad-hoc prompt tuning that characterizes many early LLM deployments.

The case study also demonstrates the value of cloud-managed LLM services like Amazon Bedrock for production deployments. Features like prompt caching, which would be complex to implement from scratch, are available as managed capabilities. However, teams should be aware that managed services create vendor dependencies and may limit flexibility compared to self-hosted alternatives.

Finally, the emphasis on data security and responsible AI considerations from the outset is crucial. These requirements fundamentally impact architectural design and cannot easily be retrofitted. Teams working with sensitive data must establish clear standards for AI incorporation before deployment, not after discovering problems in production.