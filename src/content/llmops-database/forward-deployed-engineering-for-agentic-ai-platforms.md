---
title: "Forward Deployed Engineering for Agentic AI Platforms"
slug: "forward-deployed-engineering-for-agentic-ai-platforms"
draft: false
llmopsTags:
  - "poc"
  - "agent-based"
  - "anthropic"
industryTags: "tech"
company: "Anthropic"
summary: "Anthropic's Applied AI team member discusses how the forward deployed engineering model, originally pioneered at Palantir, is becoming increasingly relevant in 2026 as AI platforms become more agentic and customizable. The challenge is that companies are building sophisticated, technically complex AI platforms that need to be sold to non-technical enterprise buyers who lack the engineering resources to implement them effectively. The solution involves deploying customer-facing software engineers who build customized solutions on top of a shared platform with reusable primitives, rather than selling software alone. This approach has proven successful in enterprise contexts, with Palantir achieving $4 million average contract values compared to competitors at $1.2 million or less, demonstrating that combining product delivery with engineering services creates higher value outcomes than either approach alone."
link: "https://www.youtube.com/watch?v=KwhgfwOSToQ"
year: 2026
seo:
  title: "Anthropic: Forward Deployed Engineering for Agentic AI Platforms - ZenML LLMOps Database"
  description: "Anthropic's Applied AI team member discusses how the forward deployed engineering model, originally pioneered at Palantir, is becoming increasingly relevant in 2026 as AI platforms become more agentic and customizable. The challenge is that companies are building sophisticated, technically complex AI platforms that need to be sold to non-technical enterprise buyers who lack the engineering resources to implement them effectively. The solution involves deploying customer-facing software engineers who build customized solutions on top of a shared platform with reusable primitives, rather than selling software alone. This approach has proven successful in enterprise contexts, with Palantir achieving $4 million average contract values compared to competitors at $1.2 million or less, demonstrating that combining product delivery with engineering services creates higher value outcomes than either approach alone."
  canonical: "https://www.zenml.io/llmops-database/forward-deployed-engineering-for-agentic-ai-platforms"
  ogTitle: "Anthropic: Forward Deployed Engineering for Agentic AI Platforms - ZenML LLMOps Database"
  ogDescription: "Anthropic's Applied AI team member discusses how the forward deployed engineering model, originally pioneered at Palantir, is becoming increasingly relevant in 2026 as AI platforms become more agentic and customizable. The challenge is that companies are building sophisticated, technically complex AI platforms that need to be sold to non-technical enterprise buyers who lack the engineering resources to implement them effectively. The solution involves deploying customer-facing software engineers who build customized solutions on top of a shared platform with reusable primitives, rather than selling software alone. This approach has proven successful in enterprise contexts, with Palantir achieving $4 million average contract values compared to competitors at $1.2 million or less, demonstrating that combining product delivery with engineering services creates higher value outcomes than either approach alone."
notion:
  pageId: "3acf8dff-2538-80d2-816c-c3d1fb6de38a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-29T06:58:00.000Z"
  lastEditedTime: "2026-07-29T06:58:00.000Z"
  publishedAt: "2026-08-07T12:31:52Z"
---

## Overview

This presentation from Anthropic's Applied AI team provides insights into how the forward deployed engineering model is evolving to meet the challenges of deploying agentic AI systems in enterprise production environments in 2026. The speaker, a member of technical staff at Anthropic who previously helped build Rippling's FTE function and worked at Palantir, draws on extensive experience to explain why traditional software delivery models are insufficient for modern AI platforms and how organizations can successfully operationalize complex AI systems for non-technical enterprise customers.

The core thesis is that as AI platforms have become more agentic and customizable in 2026, they have created a fundamental go-to-market challenge: these platforms are technically sophisticated but need to be deployed to buyers who lack the technical depth to implement them independently. This creates a critical gap between platform capability and customer value realization that traditional sales and implementation models cannot bridge effectively.

## The Forward Deployed Engineering Model

The forward deployed engineering model addresses a specific market condition that the speaker frames using a two-by-two matrix based on product complexity and buyer technical sophistication. When selling technically complex products to technical buyers like CTOs or engineering teams, products like GitHub or Datadog can succeed through traditional developer-focused go-to-market motions. When selling simpler, configurable tools like Slack, Jira, or Rippling to non-technical buyers, traditional sales-led growth works well. However, when an organization must sell a highly technical, customizable platform to non-technical enterprise buyers, neither approach suffices.

Forward deployed engineering emerged from Palantir's experience selling Foundry, an application-building platform, to Fortune 500 companies outside the tech sector. Companies in industries like oil and gas, consumer packaged goods, and other traditional sectors need sophisticated data platforms and custom applications but lack the engineering talent to build on top of complex platforms themselves. Rather than expecting these customers to both purchase the platform and develop the expertise to use it effectively, the FDE model embeds engineers directly with customers to understand their business problems and build solutions on their behalf.

The speaker emphasizes that this is not simply consulting or a dev shop model. The critical distinction is that forward deployed engineers never build from scratch. Instead, they assemble solutions from a library of shared primitives and reusable components built on top of a common platform. This approach scales the design partnership concept from startup product development into enterprise operations, allowing for customization without the maintenance nightmare of entirely bespoke codebases.

## Application to Agentic AI in 2026

The presentation's most significant insight for LLMOps practitioners is the assertion that what changed in 2026 is not that companies suddenly recognized the value of forward deployed engineering, but rather that the nature of AI platforms themselves has fundamentally shifted. The speaker observes that nearly every AI platform is now agentic, which inherently makes them customizable and sophisticated. This means that most organizations building AI platforms will face the same challenge Palantir confronted: how to deliver complex, customizable technology to customers who cannot implement it independently.

The rise of agentic AI systems has created a proliferation of "agent for X" products across industries including insurance, legal, healthcare, and others. These agentic platforms are inherently more complex than traditional SaaS applications because they require configuration, customization, and domain-specific tuning to deliver value. Simply handing over an agentic platform to a customer and expecting them to successfully deploy it in production is, according to the speaker, an unrealistic expectation that will lead to poor customer outcomes and failed implementations.

This observation has profound implications for LLMOps. As organizations move from building general-purpose AI capabilities to deploying production AI systems in specific enterprise contexts, the gap between platform capability and successful deployment widens. An insurance company may need an AI agent for claims processing, but lacks the AI engineering expertise to properly configure, tune, and maintain such a system. A legal firm may need document analysis agents but cannot build the necessary integrations and workflows themselves. The forward deployed model provides a framework for bridging this implementation gap.

## Platform Architecture and Shared Primitives

A critical technical requirement for successful forward deployed engineering is a robust platform architecture built on shared primitives. The speaker repeatedly emphasizes that without this foundation, organizations will end up with an unmaintainable collection of custom code rather than a scalable FDE function. The challenge is determining the appropriate level of abstraction for these primitives.

When asked about how atomic shared primitives should be, the speaker acknowledges this depends heavily on the specific use case and industry. Some contexts allow for primitives that represent 60% of a complete application, with forward deployed engineers customizing the remaining 40%. Other situations require more granular, low-level primitives that provide greater flexibility. The speaker uses AWS as an example of a platform with well-designed shared primitives like DynamoDB, which abstracts away the complexity of building databases from scratch while serving an extremely broad customer base.

For AI platforms in 2026, this suggests that organizations need to thoughtfully architect their systems with reusable components rather than building monolithic, custom solutions for each deployment. This might include shared components for data ingestion, embedding generation, vector storage, retrieval mechanisms, prompt templates, guardrails, evaluation frameworks, and monitoring infrastructure. The platform should provide enough flexibility for customization while preventing engineers from reinventing fundamental capabilities for each customer.

The speaker also notes that the division between platform development and forward deployed work should be dynamic. Customer-specific, bespoke functionality belongs in the forward deployed layer, but anything that proves generalizable should be abstracted back into the shared platform over time. This creates a feedback loop where forward deployed engineers scout ahead, discovering new requirements and patterns that inform platform development. This is particularly valuable for AI systems, where production deployments often reveal edge cases, failure modes, and requirements that are difficult to anticipate in advance.

## Organizational Considerations

The presentation addresses several organizational and operational questions relevant to deploying LLMOps teams using the forward deployed model. When asked about collaboration between forward deployed engineers, the speaker encourages having multiple engineers work on projects to avoid single points of failure, particularly for custom customer implementations where knowledge concentration creates risk. This has important implications for LLMOps, where understanding a customer's specific AI deployment, its quirks, failure modes, and operational characteristics represents significant tacit knowledge that should be distributed across team members.

The question of when engineering changes should be made to the shared platform versus the customer-specific layer is critical for maintaining the FDE model's scalability. The speaker's guidance is clear: anything unique to a particular customer stays in the customer layer, while anything generalizable should eventually be promoted to the platform. For AI systems, this might mean that a specific prompt engineering approach developed for one customer's domain gets generalized into a configurable template system, or that a custom evaluation metric becomes part of the platform's standard evaluation toolkit.

The speaker also addresses the profile of an ideal forward deployed engineer, describing them as "customer-facing software engineers" who could be hired as strong individual contributors on an engineering team but can also be trusted in customer interactions. This is a challenging hiring profile, particularly for AI/ML engineers who often have deep technical skills but may lack customer engagement experience. Organizations pursuing this model for LLMOps will need to carefully consider their hiring and training approaches.

## Business Model and Economic Outcomes

The economic validation for the forward deployed engineering model comes from Palantir's market performance. The speaker notes that among public SaaS companies in the Fortune 500, Palantir achieves an average contract value of $4 million per customer, compared to ServiceNow at $1.2 million and Workday at $600,000, with no other public SaaS company exceeding $500,000 ACV. This suggests that the combined product-plus-services approach commands significantly higher value than software-only or services-only models.

For organizations building AI platforms, this has important implications for business model design. Rather than selling AI platform licenses and hoping customers can implement successfully, or selling pure consulting services without platform leverage, the forward deployed model bundles both into an outcome-based offering. Customers are neither buying software nor buying engineering time; they are buying working AI solutions that deliver business value.

This approach aligns incentives more effectively than traditional models. If a customer struggles to implement an AI platform they purchased, the vendor may still recognize revenue while the customer fails to achieve value, leading to churn and poor long-term outcomes. In the forward deployed model, success is measured by whether the deployed AI system actually works in production and delivers business value, which requires the vendor's engineers to deeply understand the customer's context and build appropriately.

## Critical Success Factors

The speaker emphasizes two critical questions organizations should ask before pursuing a forward deployed engineering approach for their AI platforms. First, do they actually need FDE, or are they simply attracted to the model because it seems sophisticated? The model only makes sense when there is a genuine mismatch between product complexity and buyer technical sophistication. If selling to technical teams who can implement independently, or if building simple enough products that non-technical users can self-serve, FDE adds unnecessary overhead.

Second, does the organization have or is it willing to invest in building a robust platform with shared primitives? The speaker stresses that attempting forward deployed engineering without this foundation will result in a maintenance catastrophe. For AI platforms, this means investing in the infrastructure, tooling, and abstractions that allow engineers to assemble solutions rather than building from scratch each time.

## Limitations and Balanced Assessment

While the presentation makes a compelling case for forward deployed engineering in the context of agentic AI platforms, it is important to note several limitations and considerations. The speaker is presenting from the perspective of having worked at Palantir and now at Anthropic, both organizations with specific characteristics that may not generalize to all companies. Palantir achieved exceptional outcomes, but as a well-funded company with access to top engineering talent, some of its success factors may be difficult for smaller organizations to replicate.

The model also requires significant upfront investment in platform development before it can scale effectively. Organizations need to build robust shared primitives, which takes time and resources, before they can deploy engineers efficiently. This may create a chicken-and-egg problem for startups or smaller companies trying to adopt the approach.

Additionally, the presentation does not deeply address the challenges of managing distributed teams of customer-facing engineers, maintaining code quality across many customer deployments, or handling the organizational complexity of coordinating between platform development teams and forward deployed teams. These operational challenges can be significant.

The claim that "nearly every platform is agentic" in 2026 may also be somewhat promotional or exaggerated. While agentic AI has certainly grown, many successful AI products are not fully agentic systems but rather more constrained, specialized tools. The applicability of forward deployed engineering may be narrower than suggested.

## Relevance to LLMOps Practice

For LLMOps practitioners, this presentation offers a valuable framework for thinking about how to successfully deploy complex AI systems in production enterprise environments. The key insights include:

The recognition that agentic AI systems are inherently complex and customizable, creating an implementation gap that traditional delivery models struggle to bridge. Organizations building production LLM systems need to think carefully about how customers will actually succeed in deploying and operating these systems.

The importance of platform thinking and shared primitives for scaling AI deployments. Rather than treating each customer implementation as a completely custom project, organizations should invest in reusable components and abstractions that make customization efficient while maintaining consistency and reducing maintenance burden.

The value of embedding technical talent directly with customers to understand context and build appropriate solutions. LLM systems are often highly context-dependent, and remote or arms-length implementation often misses critical domain knowledge that affects system design and performance.

The business model insight that outcome-based selling may command higher value than pure software or pure services approaches. As AI systems become more critical to enterprise operations, customers may be willing to pay significantly more for solutions that actually work in their specific context rather than generic platforms they must implement themselves.

Overall, this presentation provides a thoughtful framework for thinking about LLMOps organizational models and go-to-market strategies in an era of increasingly sophisticated and customizable AI systems. While the forward deployed engineering model is not appropriate for all situations, it offers a proven approach for organizations facing the challenge of deploying complex AI platforms to customers who lack the technical resources to implement them independently.
