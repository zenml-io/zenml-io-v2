---
title: "Structured Data Extraction from E-commerce Storefronts Using Specialized Agentic Architecture"
slug: "structured-data-extraction-from-e-commerce-storefronts-using-specialized-agentic-architecture"
draft: false
llmopsTags:
  - "fraud-detection"
  - "classification"
  - "structured-output"
  - "unstructured-data"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "cost-optimization"
  - "latency-optimization"
  - "evals"
  - "kubernetes"
  - "open-source"
  - "documentation"
  - "openai"
  - "hugging-face"
industryTags: "e-commerce"
company: "Shopify"
summary: "Shopify faced a critical challenge in extracting structured information from millions of highly customized merchant storefronts, where the lack of standardization made it nearly impossible to answer basic questions about products, brands, policies, or fraud indicators. The company evolved from a monolithic single-shot GPT-4/5 approach to a specialized multi-agent architecture built with DSPy, featuring three independent React agents handling fraud detection, merchant profiling, and tax categorization. This transition, combined with a switch from GPT-5 to self-hosted Qwen-3-9B models, resulted in approximately 2x improvement in quality metrics while reducing costs by 75x, enabling full coverage of all Shopify merchants rather than just 13% and cutting annual costs from an estimated $5 million to a fraction of that amount."
link: "https://www.youtube.com/watch?v=bxToahwOVpY"
year: 2025
seo:
  title: "Shopify: Structured Data Extraction from E-commerce Storefronts Using Specialized Agentic Architecture - ZenML LLMOps Database"
  description: "Shopify faced a critical challenge in extracting structured information from millions of highly customized merchant storefronts, where the lack of standardization made it nearly impossible to answer basic questions about products, brands, policies, or fraud indicators. The company evolved from a monolithic single-shot GPT-4/5 approach to a specialized multi-agent architecture built with DSPy, featuring three independent React agents handling fraud detection, merchant profiling, and tax categorization. This transition, combined with a switch from GPT-5 to self-hosted Qwen-3-9B models, resulted in approximately 2x improvement in quality metrics while reducing costs by 75x, enabling full coverage of all Shopify merchants rather than just 13% and cutting annual costs from an estimated $5 million to a fraction of that amount."
  canonical: "https://www.zenml.io/llmops-database/structured-data-extraction-from-e-commerce-storefronts-using-specialized-agentic-architecture"
  ogTitle: "Shopify: Structured Data Extraction from E-commerce Storefronts Using Specialized Agentic Architecture - ZenML LLMOps Database"
  ogDescription: "Shopify faced a critical challenge in extracting structured information from millions of highly customized merchant storefronts, where the lack of standardization made it nearly impossible to answer basic questions about products, brands, policies, or fraud indicators. The company evolved from a monolithic single-shot GPT-4/5 approach to a specialized multi-agent architecture built with DSPy, featuring three independent React agents handling fraud detection, merchant profiling, and tax categorization. This transition, combined with a switch from GPT-5 to self-hosted Qwen-3-9B models, resulted in approximately 2x improvement in quality metrics while reducing costs by 75x, enabling full coverage of all Shopify merchants rather than just 13% and cutting annual costs from an estimated $5 million to a fraction of that amount."
notion:
  pageId: "334f8dff-2538-8030-a348-fb7560ae7633"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-03-31T05:16:00.000Z"
  lastEditedTime: "2026-04-09T18:23:00.000Z"
  publishedAt: "2026-04-09T18:27:29Z"
---

## Overview and Business Context

Shopify's engineering team tackled a fundamental challenge that emerged from the platform's core design philosophy: providing merchants with unlimited flexibility in how they set up and customize their online stores. While this flexibility enabled merchants to create highly diverse and customized storefronts, it created a significant problem for Shopify's internal systems. The lack of standardization meant that even simple questions like identifying all cell phone products across the platform or determining a merchant's return policy were extremely difficult to answer programmatically.

The ML team at Shopify had spent approximately five years progressively addressing different aspects of this unstructured data challenge. They initially focused on product-level understanding, using ML to extract categories and attributes such as identifying an iPhone as a cell phone with specific RAM and color specifications. They then moved to image understanding, extracting structured data about brands, content classification, and other visual attributes. However, by early 2025, the team realized they had neglected a crucial layer: understanding the merchants themselves at the shop level. Questions about return policies, accepted payment methods, primary brands sold, target communities, and fraud indicators remained difficult to answer without manually browsing individual merchant websites.

This shop-level understanding became particularly critical in the context of what Shopify calls "agentic commerce," where structured data about merchants is essential for enabling automated commerce experiences. The engineer presenting this case study had been working in ML for approximately 14-15 years and viewed this problem as an opportunity to apply emerging LLM capabilities to a long-standing structural challenge.

## Initial Single-Shot Approach with GPT-4/5

The team's first approach leveraged the LLM capabilities available in mid-2024 to early 2025. They developed a relatively straightforward pipeline that collected the top pages from a merchant's shop, stripped and cleaned the HTML content, and sent the entire corpus to GPT-4 (later upgraded to GPT-5) in a single-shot prompt. The prompt asked the model to extract a predefined schema containing all the structured information Shopify cared about, including merchant attributes, policies, brands, and other relevant fields.

This initial approach worked reasonably well for the task at hand. Given appropriate context, GPT-4 and GPT-5 demonstrated sufficient capability to extract the requested information from the provided HTML content. The solution was quick to implement and provided immediate value, allowing the team to begin extracting structured data where none had existed before.

However, as the system moved into production and scaled, several significant limitations emerged. First, the single-shot approach meant the team could only send a limited subset of pages to the LLM due to context window constraints and cost considerations. Large merchants with hundreds or thousands of pages could not have their entire site analyzed. This led to critical information gaps—if a merchant's return policy page wasn't among the top pages selected for analysis, the LLM simply couldn't answer questions about return policies.

Second, the monolithic prompt approach became increasingly fragile as more teams within Shopify discovered the solution and wanted to add their own requirements. The fraud team requested specific fields for detecting deceptive stores, the merchandising team needed different attributes, and tax-related teams required merchant category codes. Each new field added to the schema increased the complexity of the single prompt, and modifying the definition of one field risked affecting the extraction quality of other fields. The team found themselves having to re-run comprehensive evaluations every time they made any change, slowing development velocity significantly.

Third, GPT-5 proved expensive to operate at Shopify's scale. With millions of merchants on the platform and the need to regularly recompute structured data as shops evolved, the cost of making millions of API calls to a large commercial model became prohibitive. Ironically, the shops that some use cases cared most about—such as new or smaller shops for fraud detection—were often excluded from analysis due to cost constraints.

## Evolution to Agentic Architecture

Recognizing these limitations, the team fundamentally rethought their approach by moving to an agentic architecture. Rather than having Shopify's systems decide which pages to send to the LLM, they gave an LLM-powered agent the tools and autonomy to decide what information to seek out and where to find it. The insight was that if a merchant store has a thousand pages, the agent should be able to navigate the site, examine metadata, browse available pages, and investigate specific pages with targeted focus based on what information it was seeking.

The team was deliberate about building this agentic system properly from the start, having learned from previous experiences with manual prompt tuning. They chose DSPy as their framework specifically because it encouraged—indeed, essentially required—thinking about metrics and evaluations from the beginning. Even before having comprehensive labeled data, DSPy's architecture forced them to consider how they would evaluate and optimize the system once that data became available.

The initial agentic implementation used a React (Reasoning and Acting) agent pattern built with DSPy. The agent was provided with the merchant's homepage URL, a schema definition of the information to extract, and a basic set of tools. These tools included the ability to list all available pages on the site, investigate specific pages with a particular topic or focus in mind, find contact information, and validate certain information. The agent would then autonomously navigate the merchant's site, deciding which pages to examine and what information to extract from each.

Critically, the team also made an infrastructure decision at this point: they switched from using GPT-5 to a much smaller self-hosted model, specifically Qwen-3-9B. This decision was driven partly by cost considerations but also by control requirements—Shopify wanted specific control over which hardware was used for different processing steps and how the system was optimized. Surprisingly, the smaller Qwen model with agentic architecture actually performed better than the larger GPT-5 model with single-shot prompting, while being dramatically cheaper to operate.

## Specialized Multi-Agent Architecture

While the initial move to an agentic architecture showed promise, the team felt they were taking only a "half step" rather than fully committing to the approach. The monolithic agent still suffered from the second major problem they had identified: trying to accomplish multiple different objectives with a single agent and prompt. Different use cases—fraud detection, merchant profiling, tax categorization—had fundamentally different requirements and would benefit from specialized tools and isolated context.

This insight led to the development of a specialized multi-agent architecture. Instead of one agent doing everything, the system was split into three distinct specialized agents, each focused on a specific task domain:

- A fraud detection agent specifically looking for fraud signals and deceptive store indicators
- A merchant profiling agent focused on extracting attributes like brands sold, return policies, shipping policies, and general merchant characteristics  
- A merchant category code (MCC) agent handling tax-related categorization requirements

Each specialized agent was implemented as an independent React loop with its own optimized prompts and instructions. Crucially, different agents could be given different specialized tools. For example, the fraud agent was given the ability to search for reviews and information on external platforms like the Better Business Bureau, gathering off-platform context that might indicate fraudulent behavior. The profiling agent, by contrast, was deliberately restricted to examining only information within the Shopify storefront itself, ensuring that its assessments were based solely on what the merchant presented on their site.

This separation of concerns provided several key advantages. Each agent could be optimized independently using DSPy's optimization capabilities without affecting the others. An engineer could modify the fraud detection agent, run evaluations specific to fraud detection, and deploy changes without any risk of degrading the performance of the profiling or MCC agents. This architectural separation dramatically improved development velocity—when a new team requested the addition of the MCC agent just a week before a major release, a single engineer was able to implement, test, and integrate it in less than half a day.

While the agents were specialized and independent in terms of their objectives and optimization, they did share some common infrastructure. If one agent crawled and cached a particular page, other agents running in parallel could reuse that cached content rather than fetching it again, providing efficiency benefits without compromising the isolation of their reasoning and decision-making.

## Evaluation Infrastructure and ShopSnap

A fundamental challenge in evaluating this system was the dynamic nature of the data source. The agents were crawling live merchant websites, which could change at any time. If the team built a labeled evaluation dataset today based on current merchant sites, those labels could become invalid tomorrow if the merchants updated their stores. A merchant might change their return policy, add new products, or modify their about page, rendering the evaluation labels incorrect.

To solve this problem, the team built a custom snapshotting service they called ShopSnap. This service could capture a complete snapshot of a merchant's storefront at a specific point in time, preserving exactly what the site looked like when human annotators created labels. The system was engineered to replay these snapshots to the agents during evaluation, allowing the agents to navigate and investigate the historical version of the site rather than the live current version.

Building ShopSnap required some careful engineering. The team needed to ensure they didn't trigger fake tracking events or analytics calls when replaying snapshots, which could pollute Shopify's ecosystem data. With these considerations addressed, they had a reliable frozen evaluation environment where the shop's state matched exactly what human labelers had seen.

The team then invested in building a substantial labeled dataset. They worked with their fraud team, annotation teams, and operational tagging teams to label thousands of merchant shops across all the fields the agents were extracting. This dataset was split using standard ML practices: one portion was used for DSPy's prompt optimization (specifically the MIPROv2 optimizer, though the presentation referred to it as "Jepp"), while another portion was held out for final evaluation.

Because of the specialized multi-agent architecture, optimization could be performed independently for each agent. The fraud agent was optimized using only fraud-related labels and metrics, the profiling agent using profiling metrics, and the MCC agent using tax categorization metrics. This independent optimization meant that improving one agent's performance couldn't accidentally degrade another agent's capabilities—a key advantage over the monolithic approach.

## Optimization Results and Performance Improvements

The team emphasized that their journey involved multiple compounding improvements rather than a single breakthrough. When they first moved from the single-shot GPT-5 approach to the initial agentic architecture with Qwen, they saw modest quality improvements of around 10% relative improvement. At that stage, the primary narrative was about achieving moderate gains while realizing massive cost reductions by switching to the smaller self-hosted model.

However, when they implemented the specialized multi-agent architecture and applied DSPy's optimization capabilities, the improvements became much more dramatic. The team reported approximately 80% improvement across certain metrics, representing roughly a doubling of performance compared to the original single-shot approach. Precision metrics improved substantially, and quality increased across all dimensions they measured.

Critically, these quality improvements came while maintaining the order-of-magnitude cost reduction achieved by switching from GPT-5 to Qwen. The final system was approximately 75 times cheaper than the original GPT-5 approach while delivering twice the quality. This cost-performance combination enabled a complete transformation in coverage: instead of analyzing only 13% of Shopify merchants due to cost constraints, the new system could run on 100% of merchants, and could do so more frequently to capture changes as shops evolved.

The presenter was careful to note that while exact numbers couldn't be shared due to the sensitive nature of fraud detection metrics, these relative improvements were substantial and transformative for Shopify's operations. The estimated annual cost dropped from approximately $5 million per year for partial coverage to a small fraction of that amount for full coverage.

## Production Architecture and Infrastructure

The production deployment of this system reflects sophisticated MLOps practices appropriate for Shopify's scale. The architecture consists of three distinct layers, each optimized for its specific computational requirements:

The batch processing layer uses Apache Flink to orchestrate the analysis of approximately 150,000 shops daily. Flink handles the scheduling, distribution, and management of this large-scale batch workload.

The agent execution layer runs on Shopify's standard Kubernetes-based production platform, which they refer to as the "LLM API." This layer executes the actual agent logic—navigating sites, deciding which pages to examine, stripping HTML, cleaning content, and orchestrating the overall extraction workflow. These tasks are CPU-intensive but don't require GPU acceleration, making Kubernetes an appropriate and cost-effective platform.

The LLM inference layer runs on a separate GPU cluster that hosts the Qwen models. The agent layer makes inference calls to this service whenever it needs to generate reasoning steps, make decisions, or extract information from content it has gathered.

This three-layer separation reflects careful consideration of resource utilization and cost optimization. By keeping the agent orchestration on CPU-based Kubernetes and only calling out to expensive GPU resources for actual model inference, Shopify minimizes their GPU footprint and associated costs. The architecture also provides flexibility in scaling different components independently based on their specific computational characteristics and bottlenecks.

## Key Lessons and Architectural Principles

The presenter distilled several important lessons from this journey that reflect mature LLMOps thinking. First, they emphasized that the single-shot approach was the right decision at the time, despite its limitations. It provided immediate value and got something working quickly. However, it had a clear quality ceiling and cost ceiling, and recognizing when to evolve beyond it was crucial.

Second, for this particular use case, specialized agents substantially outperformed monolithic agents. The presenter was careful to note that this might not be universally true across all tasks—there may be scenarios where monolithic agents are more appropriate. However, the principle of separation of concerns proved valuable here, both for quality and for development velocity.

Third, investing in evaluation infrastructure early proved essential. The team credited DSPy with forcing them to think about evaluation from the beginning, even before they had comprehensive labeled data. Building ShopSnap and establishing robust evaluation practices enabled all subsequent optimization work. Without reliable evaluation, optimization becomes "shooting in the dark."

Fourth, the importance of getting architecture right before optimizing cannot be overstated. The presenter noted their tendency to mentally "draw boxes" around system components when evaluating any ML project. Optimizing a poorly architected system rarely ends well, while a well-architected system becomes straightforward to optimize and extend. The fact that adding the third specialized agent took less than half a day of engineering time demonstrates the power of good architectural decisions.

Finally, for most tasks, teams don't need the largest available models. The presenter noted seeing this pattern repeatedly at Shopify: teams using GPT, Claude, or Gemini for tasks that don't actually require models of that size. With proper architecture and optimization frameworks like DSPy, smaller self-hosted models can outperform much larger commercial models while being far more cost-effective. This challenges the assumption that bigger models are always better and suggests that thoughtful system design and optimization often matter more than raw model scale.

## Broader Implications for LLMOps Practice

This case study illustrates several important principles for deploying LLMs in production at scale. The evolution from single-shot prompting to agentic architectures to specialized multi-agent systems represents a maturation path that other organizations might follow as their LLM applications grow in complexity and scale.

The emphasis on evaluation infrastructure as a prerequisite for optimization reflects a fundamental LLMOps principle: you cannot improve what you cannot measure reliably. The creative solution of building ShopSnap to handle the challenge of evaluating agents that interact with dynamic web content demonstrates the kind of domain-specific evaluation infrastructure that production LLM systems often require.

The multi-layer deployment architecture, with clear separation between batch orchestration, agent execution, and model inference, provides a template for how to structure LLM applications for cost efficiency and scalability. The decision to separate CPU-intensive orchestration from GPU-intensive inference allows independent scaling and optimization of each component.

Perhaps most importantly, the case study demonstrates the value of moving beyond manual prompt engineering to systematic optimization approaches. By using DSPy and investing in the infrastructure to support automated optimization, Shopify was able to achieve performance improvements that would be extremely difficult to reach through manual iteration alone, while simultaneously making the system more maintainable and extensible.

The successful replacement of GPT-5 with Qwen-3-9B also challenges conventional wisdom about model selection. It demonstrates that for many production use cases, the combination of smaller open-source models with good architecture and optimization can outperform much larger proprietary models, while providing better cost economics and operational control. This has significant implications for organizations considering their LLM deployment strategies, particularly those operating at scale where API costs can become prohibitive.
