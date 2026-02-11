---
title: "AI-Powered Natural Language Search for Vehicle Marketplace"
slug: "ai-powered-natural-language-search-for-vehicle-marketplace"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694adb9991ce3499084e284c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:47.373Z"
  createdOn: "2025-12-23T18:12:41.681Z"
llmopsTags:
  - "question-answering"
  - "content-moderation"
  - "classification"
  - "prompt-engineering"
  - "few-shot"
  - "cost-optimization"
  - "latency-optimization"
  - "fastapi"
  - "anthropic"
  - "amazon-aws"
industryTags: "e-commerce"
company: "Coches.net"
summary: "Coches.net, Spain's leading vehicle marketplace, implemented an AI-powered natural language search system to replace traditional filter-based search. The team completed a 15-day sprint using Amazon Bedrock and Anthropic's Claude Haiku model to translate natural language queries like \"family-friendly SUV for mountain trips\" into structured search filters. The solution includes content moderation, few-shot prompting, and costs approximately €19 per day to operate. While user adoption remains limited, early results show that users utilizing the AI search generate more value compared to traditional search methods, demonstrating improved efficiency and user experience through automated filter application."
link: "https://medium.com/adevinta-tech-blog/from-filters-to-phrases-our-ai-revolution-in-car-search-2d7c73ca4886"
year: 2024
seo:
  title: "Coches.net: AI-Powered Natural Language Search for Vehicle Marketplace - ZenML LLMOps Database"
  description: "Coches.net, Spain's leading vehicle marketplace, implemented an AI-powered natural language search system to replace traditional filter-based search. The team completed a 15-day sprint using Amazon Bedrock and Anthropic's Claude Haiku model to translate natural language queries like \"family-friendly SUV for mountain trips\" into structured search filters. The solution includes content moderation, few-shot prompting, and costs approximately €19 per day to operate. While user adoption remains limited, early results show that users utilizing the AI search generate more value compared to traditional search methods, demonstrating improved efficiency and user experience through automated filter application."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-natural-language-search-for-vehicle-marketplace"
  ogTitle: "Coches.net: AI-Powered Natural Language Search for Vehicle Marketplace - ZenML LLMOps Database"
  ogDescription: "Coches.net, Spain's leading vehicle marketplace, implemented an AI-powered natural language search system to replace traditional filter-based search. The team completed a 15-day sprint using Amazon Bedrock and Anthropic's Claude Haiku model to translate natural language queries like \"family-friendly SUV for mountain trips\" into structured search filters. The solution includes content moderation, few-shot prompting, and costs approximately €19 per day to operate. While user adoption remains limited, early results show that users utilizing the AI search generate more value compared to traditional search methods, demonstrating improved efficiency and user experience through automated filter application."
---

## Case Study Overview

Coches.net, Spain's leading vehicle marketplace operated by Adevinta, undertook a rapid 15-day development sprint to revolutionize their car search functionality using generative AI. The team observed that users were struggling with the existing filter-based search system, requiring them to navigate multiple filters to find specific vehicles. This friction led the team to explore how natural language processing could simplify the search experience. The project was conducted somewhat covertly as a skunkworks initiative, with the team wanting to prove the concept before seeking formal approval.

The core problem was straightforward but impactful: users wanted to search using natural language phrases like "Audi A3 2020 in Barcelona" or "family-friendly SUV for mountain trips" but were forced to manually apply multiple filters. The existing system required domain knowledge about which filters to use and how to combine them effectively. This created unnecessary complexity and friction in the user journey.

## Technical Architecture and Approach

The solution architecture is elegantly simple yet effective. Rather than having the AI perform the search directly, the team designed the system to use AI as a translation layer between natural language and their existing structured search infrastructure. When a user enters a natural language query, the system follows a multi-step process that balances functionality with safety and cost considerations.

The flow begins with content moderation, a critical first step that ensures queries are appropriate and relevant to car searches. The team implemented this as a lightweight pre-filtering action that is computationally inexpensive and prevents inappropriate or irrelevant queries from consuming more expensive resources. The moderation step asks the AI model to classify queries into three categories: valid queries (code 0), unethical queries (code 1), and invalid queries (code 2). This prevents the system from processing queries about illegal activities or completely off-topic requests, protecting both the business and conserving computational resources.

Once a query passes moderation, the system sends it to the AI model along with comprehensive context about available search filters and examples of how queries should be translated. The AI then generates structured filter parameters that match the user's intent. These parameters are validated and then sent to the frontend, where the website's existing search infrastructure applies them to retrieve relevant vehicle listings. This approach cleverly leverages existing, proven search technology while adding an AI-powered interface layer.

## Model Selection and Infrastructure

The team selected Amazon Bedrock as their AI platform, aligning with their existing AWS infrastructure. This choice demonstrates practical LLMOps thinking - selecting tools that integrate well with existing systems rather than chasing the most cutting-edge options. Within Bedrock's offerings, they chose Anthropic's Claude model family, specifically opting for the Haiku variant.

The selection of Claude Haiku over larger models like Sonnet or Opus reflects mature cost-benefit analysis. Haiku provides a strong balance between speed, quality, and cost-effectiveness. In production LLM systems, this type of optimization is crucial - using the smallest model that can reliably perform the task well enough. The team's willingness to use a smaller, faster model rather than defaulting to the largest available option shows production maturity.

## Prompt Engineering Strategy

The team employed few-shot prompting as their core technique, a well-established approach in production LLM systems. Few-shot prompting involves providing the model with context about the task along with several examples of inputs and expected outputs. This technique helps the model understand the specific format and style of responses required without requiring fine-tuning or extensive training.

For Coches.net's use case, the prompt includes information about all available search filters and multiple examples of how natural language queries should map to filter combinations. For instance, a query mentioning "environmental stickers needed in Madrid" would need to be translated into specific filter parameters that account for Madrid's environmental regulations. The few-shot examples teach the model these domain-specific requirements.

This approach has several advantages in a production context. It requires no model training or fine-tuning, which simplifies deployment and maintenance. It allows for rapid iteration - the team can adjust the prompt and examples without redeploying models or managing training pipelines. It also provides transparency, as the team can inspect exactly what context and examples are being provided to the model.

## Cost Analysis and Economics

The team provides unusually transparent cost analysis, which is valuable for understanding the economics of production LLM systems. Each query generates approximately 6,000 input tokens and 500 output tokens. Input tokens represent the prompt, context, and user query that the model reads, while output tokens are the model's response containing the structured filter parameters.

Using Claude Haiku's pricing of $0.00025 per 1,000 input tokens and $0.00125 per 1,000 output tokens, and with approximately 20,000 model invocations per day based on current traffic patterns, the system costs around €19 daily to operate. This translates to roughly €570 per month or €6,935 annually at current usage levels.

The team characterizes this as "reasonable value for the improved user experience," which reflects a pragmatic approach to ROI assessment. However, it's worth noting that the cost-benefit analysis becomes more complex when considering the limited adoption discussed later. With only a small portion of users currently utilizing the AI search, the per-active-user cost is higher than the raw numbers suggest. As adoption grows, the economics would become more favorable if the per-query value holds or improves.

The token counts also reveal interesting technical details. The 6,000 input tokens indicate a substantial amount of context being provided to the model, likely including comprehensive filter documentation and multiple examples. The 500 output tokens for structured filter parameters seem appropriate for the task. This ratio of about 12:1 input to output tokens is typical for tasks that require significant context but produce concise, structured outputs.

## Content Moderation Implementation

The moderation layer demonstrates production-ready thinking about system safety and resource efficiency. By implementing moderation as a separate, lightweight step before the main AI processing, the team achieves multiple benefits. The moderation call is described as "quite cheap (in processing terms)" and prevents inappropriate queries from consuming the full context of the main search translation task.

This two-stage approach - cheap moderation followed by more expensive main processing - is a pattern often seen in production LLM systems. It's more cost-effective than including all moderation logic in a single, complex prompt, and it provides cleaner separation of concerns. The moderation step can be tuned independently of the search translation logic.

The three-category classification system (valid, unethical, invalid) is simple but effective. It catches both safety issues (unethical queries) and relevance issues (invalid queries) in a single pass. This prevents the system from attempting to translate queries about illegal activities into car search filters, and it avoids wasting resources on queries that have nothing to do with vehicles.

## Validation and Quality Control

The architecture includes a validation step after the AI generates filter parameters but before they're sent to the frontend. While the article doesn't detail the specific validation logic, this step is crucial for production reliability. Validation likely checks that the AI's output conforms to expected schemas, that filter values are within acceptable ranges, and that the combination of filters makes sense.

This validation layer serves as a safeguard against AI errors or hallucinations. Even with well-designed prompts, LLMs can occasionally produce malformed or nonsensical outputs. The validation step ensures that only properly structured, reasonable filter combinations reach the search system. This defensive programming approach is essential for production AI systems where direct user-facing errors could damage trust and experience.

## Results and Impact Assessment

The team reports that users utilizing the AI search generate more value compared to traditional methods, and that the system automatically applies necessary filters including domain-specific requirements. However, they also candidly acknowledge that adoption remains limited, with only a small portion of their traffic using filters at all, and even fewer leveraging the new AI-powered search.

This honest assessment of limited adoption is refreshing and provides important context for evaluating the case study. Many AI product launches focus exclusively on positive metrics while glossing over adoption challenges. The Coches.net team's transparency about this issue suggests mature product thinking and realistic expectations.

The limited adoption could stem from multiple factors: users may not be aware of the new feature, the interface may not prominently surface the natural language search option, users may be habituated to traditional search methods, or the value proposition may not be immediately clear. The team acknowledges they are "working to improve the user experience and encourage more users to try this feature," indicating ongoing iteration.

The positive feedback quoted from users suggests that those who do discover and use the feature find significant value. The example of a user typing "eco-friendly family car for city living" and receiving appropriate results considering Madrid's environmental requirements demonstrates the system working as intended. This suggests the technical implementation is sound, and the challenge lies more in product discovery and user education.

## Operational Considerations

The case study reveals several operational aspects of running an LLM-powered feature in production. The team monitors traffic patterns and usage metrics, tracking approximately 20,000 model invocations per day. This monitoring is essential for cost management and for understanding user behavior patterns.

The choice to use a managed service like Amazon Bedrock rather than self-hosting models reflects practical operational considerations. Bedrock handles model serving, scaling, and infrastructure management, allowing the team to focus on prompt engineering and product integration rather than infrastructure operations. This is often the right choice for teams without extensive ML infrastructure expertise or resources.

The system's integration with existing search infrastructure demonstrates good architectural practices. Rather than rebuilding search from scratch around AI, the team augmented their existing, proven search system with an AI-powered input layer. This approach minimizes risk - if the AI translation fails or produces unexpected results, the underlying search system continues to work reliably. It also meant the team could deliver the feature in just 15 days rather than undertaking a more extensive rewrite.

## Development Process and Timeline

The 15-day sprint timeline is remarkable and speaks to both the team's efficiency and the relative maturity of LLM tooling. The team characterized their approach as somewhat unconventional, working on the feature "in secret" without formal approval initially. They wanted to avoid "spending too much time on an unapproved initiative" and aimed to prove the concept quickly before seeking broader organizational buy-in.

This skunkworks approach has both advantages and risks. It allowed the team to move quickly without bureaucratic overhead and to validate technical feasibility before committing significant resources. However, it also meant working without formal product management oversight or user research that might have identified the adoption challenges earlier. The team's ability to deliver a production-ready feature in this timeframe suggests strong technical capabilities and effective collaboration.

The article mentions the team worked "diligently, refining the system and testing its capabilities" throughout the sprint, indicating an iterative development process. The collaborative and focused approach kept the team aligned on objectives despite the compressed timeline.

## Lessons Learned and Future Directions

The team shares three key lessons from their experience. First, they emphasize the importance of data quality and quantity for AI performance. While they don't elaborate extensively on this point, it likely refers to the examples and context provided in the few-shot prompts. Better examples lead to better AI performance in this paradigm.

Second, they highlight team collaboration as crucial for achieving meaningful results in a short time. The cross-functional team included UX designers, frontend developers, backend engineers, data specialists, mobile developers, and product managers. This diverse skill set was necessary to deliver an end-to-end feature touching multiple parts of the technology stack.

Third, they emphasize continuous improvement and iteration based on user feedback and evolving requirements. This reflects product maturity - recognizing that the initial launch is just the beginning of the product lifecycle. The acknowledgment that filters are evolving and the system needs to improve to increase adoption shows ongoing commitment to refinement.

Looking forward, the team plans to continue enhancing the AI search function, making it more intuitive and accessible. Their focus on improving usability to increase adoption reflects the right priorities - the technical implementation appears sound, so the challenge now is product and UX rather than additional AI capabilities.

## Balanced Assessment

While the case study presents an interesting and technically sound implementation, several considerations warrant a balanced perspective. The claimed 15-day development timeline is impressive, but it's worth noting that this likely didn't include extensive user research, A/B testing, or the kind of rigorous evaluation that larger product launches typically require. The team's skunkworks approach prioritized speed over comprehensive validation.

The cost analysis, while transparent, doesn't account for development time, ongoing maintenance, or the infrastructure costs of running the surrounding systems. The €19 daily operational cost is just one component of total cost of ownership. Additionally, with limited adoption, the cost per active user is higher than raw numbers suggest.

The results section, while honest about adoption challenges, lacks specific quantitative metrics. What does "more value" mean precisely? What percentage of users have tried the feature? What are conversion rates? How does search quality compare to traditional methods in A/B tests? These metrics would provide more rigorous evaluation of impact.

The technical approach, while sound, is relatively straightforward application of existing techniques rather than particularly novel LLMOps innovation. Few-shot prompting with content moderation using managed AI services represents good engineering practice but not cutting-edge techniques. This isn't a criticism - production systems should prioritize reliability over novelty - but it's important context for understanding the contribution.

The case study would benefit from more discussion of failure modes and error handling. What happens when the AI misinterprets a query? How do users recover? Are there fallback mechanisms? How is the system monitored for quality degradation over time? These operational concerns are crucial for production LLM systems.

Despite these considerations, the case study demonstrates several valuable practices: transparent cost analysis, honest assessment of adoption challenges, pragmatic technology choices aligned with existing infrastructure, and architectural patterns that separate concerns effectively. The team's willingness to share both successes and ongoing challenges makes this a useful learning resource for others implementing similar features.