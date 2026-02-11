---
title: "Transforming Agent and Customer Experience with Generative AI in Health Insurance"
slug: "transforming-agent-and-customer-experience-with-generative-ai-in-health-insurance"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6915cd23fbf6b3a0a1d630e0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:27:26.212Z"
  createdOn: "2025-11-13T12:20:51.545Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "document-processing"
  - "summarization"
  - "question-answering"
  - "healthcare"
  - "rag"
  - "prompt-engineering"
  - "cost-optimization"
  - "agent-based"
  - "latency-optimization"
  - "embeddings"
  - "semantic-search"
  - "monitoring"
  - "devops"
  - "orchestration"
  - "microservices"
  - "cicd"
  - "scaling"
  - "documentation"
  - "guardrails"
  - "amazon-aws"
industryTags: "insurance"
company: "nib"
summary: "nib, an Australian health insurance provider covering approximately 2 million people, transformed both customer and agent experiences using AWS generative AI capabilities. The company faced challenges around contact center efficiency, agent onboarding time, and customer service scalability. Their solution involved deploying a conversational AI chatbot called \"Nibby\" built on Amazon Lex, implementing call summarization using large language models to reduce after-call work, creating an internal knowledge-based GPT application for agents, and developing intelligent document processing for claims. These initiatives resulted in approximately 60% chat deflection, $22 million in savings from Nibby alone, and a reported 50% reduction in after-call work time through automated call summaries, while significantly improving agent onboarding and overall customer experience."
link: "https://www.youtube.com/watch?v=EGs4Dm7XBiU"
year: 2025
seo:
  title: "nib: Transforming Agent and Customer Experience with Generative AI in Health Insurance - ZenML LLMOps Database"
  description: "nib, an Australian health insurance provider covering approximately 2 million people, transformed both customer and agent experiences using AWS generative AI capabilities. The company faced challenges around contact center efficiency, agent onboarding time, and customer service scalability. Their solution involved deploying a conversational AI chatbot called \"Nibby\" built on Amazon Lex, implementing call summarization using large language models to reduce after-call work, creating an internal knowledge-based GPT application for agents, and developing intelligent document processing for claims. These initiatives resulted in approximately 60% chat deflection, $22 million in savings from Nibby alone, and a reported 50% reduction in after-call work time through automated call summaries, while significantly improving agent onboarding and overall customer experience."
  canonical: "https://www.zenml.io/llmops-database/transforming-agent-and-customer-experience-with-generative-ai-in-health-insurance"
  ogTitle: "nib: Transforming Agent and Customer Experience with Generative AI in Health Insurance - ZenML LLMOps Database"
  ogDescription: "nib, an Australian health insurance provider covering approximately 2 million people, transformed both customer and agent experiences using AWS generative AI capabilities. The company faced challenges around contact center efficiency, agent onboarding time, and customer service scalability. Their solution involved deploying a conversational AI chatbot called \"Nibby\" built on Amazon Lex, implementing call summarization using large language models to reduce after-call work, creating an internal knowledge-based GPT application for agents, and developing intelligent document processing for claims. These initiatives resulted in approximately 60% chat deflection, $22 million in savings from Nibby alone, and a reported 50% reduction in after-call work time through automated call summaries, while significantly improving agent onboarding and overall customer experience."
---

## Overview

nib is an Australian health insurance provider that has been on a comprehensive cloud and AI transformation journey with AWS over the past decade. The company, which covers approximately 2 million people across multiple brands including white-labeled services for Qantas and Suncorp, has systematically evolved from traditional data center operations to a fully cloud-native infrastructure, culminating in sophisticated generative AI implementations. Matthew Finch, the Head of Data and AI at nib, presented this case study at the AWS Summit Sydney, detailing how the organization has leveraged various AWS AI services to transform both agent and customer experiences in the insurance industry.

The company's journey is particularly notable for being early adopters of conversational AI, beginning in 2018, and subsequently expanding into modern large language model applications. Their approach demonstrates a pragmatic, business-value-driven methodology to implementing AI in production environments, with particular attention to governance, responsible AI practices, and continuous improvement.

## Cloud Foundation and Migration Journey

nib's AI transformation was built on a solid cloud foundation. Starting in late 2015, the company set an ambitious goal to completely exit physical data centers within five years. While this actually took ten years to accomplish, the migration laid critical groundwork for AI initiatives. By early 2023, nib successfully closed their last data center, achieving a completely cloud-native infrastructure with no physical footprint. This foundation proved essential for the rapid prototyping and deployment of AI models that would come later.

The first three years of the cloud journey focused primarily on asset migration and establishing infrastructure. The middle years enabled innovation projects like Nibby, their conversational AI assistant, and the migration to Amazon Connect for contact center operations around 2021. The final years saw an acceleration of digital automation and AI initiatives across the entire technology stack.

## Conversational AI: The Nibby Implementation

nib's flagship AI initiative is "Nibby," a conversational AI assistant that represents one of their earliest and most successful production AI deployments. Launched in 2018 as a chatbot built on Amazon Lex, Nibby has evolved substantially over the years and now operates across both chat and voice channels. This multi-channel approach demonstrates the maturity of their LLMOps practices and their ability to scale AI solutions across different interaction modalities.

The production performance of Nibby is particularly impressive. To date, the system has handled over four million customer interactions across both channels. In the chat channel specifically, Nibby achieves approximately 60% deflection, meaning that two-thirds of all chat interactions are handled completely by the AI without requiring human agent intervention. The voice channel shows lower but still meaningful deflection at around 10%, which nib views as an area for continued improvement, particularly with emerging technologies like Amazon's Nova Sonic speech-to-speech models.

From a business value perspective, nib has quantified that Nibby has generated approximately $22 million in savings, with this figure continuing to grow year over year as the system handles increasing volumes. This represents a clear return on investment that has validated their early bet on conversational AI technology. The company views recent advancements in large language models as vindication of their strategic direction and an opportunity to enhance Nibby's capabilities further.

## Call Summarization and After-Call Work Reduction

One of nib's most impactful recent generative AI implementations involves automatic call summarization using large language models. This capability was mentioned in an AWS keynote and represents a significant operational improvement for contact center operations. The system automatically summarizes customer calls and takes notes, eliminating the manual after-call work that agents previously had to perform.

Initial results showed a 20% reduction in after-call work time, but by the time of the presentation, this had improved to approximately 50% reduction. This dramatic improvement not only increases agent productivity but also enhances the overall agent experience by removing tedious administrative tasks and allowing agents to focus on customer service. The agents themselves have responded very positively to this capability, which is an important indicator of successful production deployment beyond just quantitative metrics.

From an LLMOps perspective, this implementation demonstrates the practical application of summarization models in a high-volume production environment where accuracy and consistency are critical. The fact that nib achieved rapid improvement from 20% to 50% time savings suggests active monitoring, evaluation, and iterative improvement of the models in production.

## Knowledge-Based GPT Application for Agents

nib developed an internal application they call "GPT" that serves as a knowledge-based tool integrated into the agent experience. This represents a classic retrieval-augmented generation (RAG) implementation tailored specifically for contact center agents. The application allows agents to search for information using natural language queries, which then interrogate nib's internal knowledge base, retrieve relevant articles, and present summarized information to the agent in a concise format.

The production impact of this tool has been significant in several dimensions. First, it substantially reduces the time agents spend searching for information during customer interactions, leading to faster resolution times and improved customer satisfaction. Perhaps even more impressively, the tool has dramatically reduced onboarding time for new agents. New hires can now get up to speed much more quickly because they can access and understand nib's knowledge base more efficiently through natural language interaction rather than manual navigation and reading.

This implementation showcases thoughtful LLMOps design where the AI augments rather than replaces human expertise. The agents remain in control of customer interactions while leveraging AI to access information more efficiently. The integration into the existing agent workflow, as evidenced by the screenshot mentioned in the presentation, suggests careful attention to user experience and production deployment considerations.

## Intelligent Document Processing for Claims

nib has implemented intelligent document processing capabilities for handling claims and invoices, representing another key production AI application. The foundation of this system utilizes Amazon Textract for document extraction, a service nib has been using for some time. However, they've recently enhanced this capability by layering large language models on top of the extracted text.

This hybrid approach demonstrates mature LLMOps thinking: leveraging specialized services like Textract for structured extraction while applying LLMs for more complex information retrieval and understanding tasks. The combination allows nib to process insurance claims and invoices more efficiently while extracting nuanced information that might be difficult to capture with traditional rule-based extraction alone.

While specific performance metrics weren't provided for this application, the fact that it's mentioned alongside other major initiatives suggests it's delivering meaningful business value in production. Claims processing is a critical insurance workflow where automation can significantly impact operational efficiency and customer satisfaction through faster processing times.

## Agent Experience Design Thinking

A notable aspect of nib's LLMOps approach is their systematic application of design thinking to the agent experience. Having successfully applied user experience principles to external-facing assets like their mobile app (which maintains nearly five-star ratings in app stores), they deliberately chose to bring the same methodology to internal agent-facing systems starting around 12-18 months before the presentation.

This involved mapping out the standard journey that agents take customers through and then systematically identifying where AI capabilities could support different stages of that journey. Rather than deploying AI opportunistically, this approach ensures that AI implementations align with actual workflow needs and pain points. The team regularly has technical staff sit with call center agents to observe their work, understand challenges, and identify opportunities for AI-assisted improvements.

This human-centered approach to deploying AI in production environments represents a best practice in LLMOps. It ensures that technical capabilities are matched to genuine business needs and that adoption is driven by actual value creation rather than technology push. The emphasis on agent feedback and continuous iteration based on real-world usage demonstrates mature production operations.

## Cost Management and Model Economics

Matthew Finch identified cost management as one of the key lessons learned throughout their AI journey. This is particularly relevant with generative AI, where token-based pricing models require different thinking than traditional infrastructure costs. The team has focused on understanding and managing the economics of running large language models in production, which includes considerations around token usage, model selection, and optimization of prompts and context.

This attention to cost management reflects the reality of operating AI at scale in production. While proof-of-concept implementations might not surface cost issues, production deployments serving millions of customers require careful economic modeling and ongoing optimization. nib's experience suggests they've developed processes and capabilities around monitoring AI costs and optimizing implementations accordingly.

## Managing Expectations Around AI Accuracy

Another significant lesson learned involves managing expectations around AI accuracy and reliability. Finch noted that unlike traditional software development where you can specify exactly what you want (like a green button in a specific location) and reliably get that outcome, AI initiatives often deliver 80% of what you're looking for rather than 100%. This fundamental difference required both technical teams and business stakeholders to adjust their mindset.

The team had to help the organization understand that conversational AI like Nibby might occasionally make mistakes or say things incorrectly, similar to how human agents occasionally make mistakes. This required establishing appropriate error handling, fallback mechanisms, and escalation paths in production systems. It also required building organizational tolerance for imperfect but valuable AI outputs rather than expecting deterministic behavior.

This represents an important LLMOps maturity indicator: recognizing that production AI systems require different evaluation criteria and success metrics than traditional software, and building organizational understanding around this reality. The focus then shifts to continuous improvement and ongoing training of models rather than expecting perfect initial deployment.

## AI Governance Framework

nib established an AI governance board in late 2024 to provide structured oversight of their expanding AI initiatives. This governance framework is built around three core pillars that reflect comprehensive thinking about responsible AI deployment in a regulated industry.

The first pillar focuses on AI literacy, culture, and education. This includes educational sessions for the board of directors to ensure senior leadership understands AI capabilities, risks, and opportunities. It extends to learning and training modules deployed across the organization, including frontline teams. This democratization of AI knowledge helps demystify the technology, reduces fear and resistance, and builds organizational capability to identify appropriate AI use cases.

The second pillar addresses ethics, safety, and responsible AI. This is particularly critical for nib given their operation in the heavily regulated financial services sector. The governance framework ensures that AI initiatives consider privacy implications, bias risks, and responsible use principles. The company published an internal AI policy earlier in 2025 that addresses high-impact AI usage and establishes processes for impact assessment before deploying significant AI capabilities.

The third pillar covers delivery and benefits realization. This ensures that AI initiatives are properly governed from a project execution perspective while also tracking whether promised benefits are actually being realized in production. This benefits tracking is essential for maintaining organizational support for AI investments and ensuring that LLMOps efforts translate into genuine business value.

The governance board itself demonstrates senior commitment, with representation from the managing director and group CIO alongside representatives from across the business. This cross-functional composition ensures that technical, business, ethical, and regulatory perspectives are all considered in AI deployment decisions.

## Production Architecture and Integration Patterns

While specific architectural details weren't extensively covered, several integration patterns are evident from the described implementations. The knowledge-based GPT application clearly demonstrates a RAG architecture where user queries trigger retrieval from a knowledge base followed by LLM-powered summarization. The integration into the agent workspace suggests API-based integration with contact center systems.

The call summarization capability indicates integration with Amazon Connect, likely capturing conversation transcripts or audio that are then processed by summarization models. The fact that summaries are automatically captured and presumably stored for record-keeping suggests integration with CRM or case management systems.

The Nibby conversational AI, built on Amazon Lex, represents a multi-channel deployment pattern with both chat and voice implementations. The evolution from basic Lex to incorporating large language models suggests an architecture that has adapted over time to incorporate newer capabilities while maintaining production stability.

## Approach to Agentic AI and Future Architecture

nib is actively exploring agentic AI frameworks while maintaining a pragmatic, use-case-driven approach. Finch explicitly warned against "having a hammer looking for a nail" and characterized much of the current agentic AI discussion as "buzzword bingo." However, they are building foundational capabilities around Model Context Protocol (MCP) and agent-to-agent frameworks to prepare for more sophisticated agentic workflows.

The company has been mapping core business workflows to understand where agentic approaches might add value. This methodical approach—identifying genuine business problems first, then evaluating whether agentic AI provides the right solution—represents mature LLMOps thinking. Rather than rushing to implement the latest capabilities because they exist, nib is ensuring they have proper foundations in place and clear use cases before deployment.

This measured approach to emerging technologies while actively building enabling infrastructure represents a balanced strategy for production AI environments. It allows nib to move quickly when clear use cases emerge while avoiding the technical debt that can result from premature adoption of immature technologies.

## Rapid Prototyping and Business Partnership

A key element of nib's LLMOps success is their emphasis on rapid prototyping to make AI real for business stakeholders. The team regularly sits with call center agents and other business users, observes their work, and can quickly create prototype solutions using large language models to demonstrate potential value. For example, if they observe an agent struggling to help a customer understand a document, they might immediately prototype a solution that uses an LLM to summarize that document type.

This rapid feedback loop helps overcome the abstraction and "magic" that can surround AI technology. By making capabilities tangible and demonstrating them in the context of actual work, the technical team builds business buy-in and identifies high-value use cases. This approach has been critical to driving organizational change and maintaining strong partnerships between technical and business teams.

The emphasis on partnership and team building is also notable. Finch mentioned having many team members in the audience learning and staying current, highlighting the importance of continuous learning and team development in the fast-moving AI landscape.

## Developer Productivity and Internal Tools

Beyond customer-facing applications, nib has deployed a developer co-pilot to drive efficiencies in software development teams. While details weren't extensive, this indicates that their AI strategy extends beyond customer and agent experience into internal productivity tools. This represents a comprehensive approach to AI adoption that recognizes value creation opportunities across multiple organizational functions.

## Monitoring, Evaluation, and Continuous Improvement

While specific monitoring tools and practices weren't detailed, the improvement in call summarization from 20% to 50% time savings suggests active monitoring and iterative improvement of production models. The emphasis on continuous training of AI systems and ongoing evaluation indicates established LLMOps practices around model performance tracking and improvement.

The team's approach to handling AI mistakes—building in appropriate error handling and continuously improving models rather than expecting perfection—suggests they have feedback mechanisms to identify issues in production and processes to address them through model retraining or prompt refinement.

## Future Roadmap and Strategic Direction

Looking forward, nib is particularly focused on advancing their voice capabilities, especially exploring speech-to-speech models like Amazon's Nova Sonic to create more natural voice interactions. They envision a "Nibby voice 2.0" that could significantly improve their voice channel deflection rates and customer experience.

The company is also working to bring together various AI pieces they've deployed into more cohesive agentic workflows, potentially connecting capabilities across claims processing, contact center operations, and other business functions. The development of agent frameworks will enable more sophisticated orchestration of these capabilities.

Finch emphasized that they view themselves as being at the "iPhone 1" stage of AI, with expectations that capabilities will become much faster, cheaper, and higher quality over the coming decade. This perspective drives their focus on building proper foundations—in terms of architecture, governance, data quality, and organizational capability—rather than trying to build end-state solutions with current technology.

## Lessons for LLMOps Practitioners

Several key lessons emerge from nib's experience that are relevant for LLMOps practitioners:

**Start early and iterate**: Rather than waiting for perfect solutions or complete understanding, nib's approach has been to start with manageable initiatives, learn from production deployment, and continuously improve. This has allowed them to build organizational capability and understanding over time.

**Focus on genuine business problems**: The consistent emphasis on identifying real business needs before selecting technology solutions has kept their AI initiatives grounded and ensured they deliver actual value rather than being technology demonstrations.

**Build strong foundations**: The decade-long cloud journey and focus on data platforms provided the infrastructure necessary to deploy AI at scale. Similarly, their current work on governance, agent frameworks, and architectural foundations positions them for future capabilities.

**Manage expectations appropriately**: Helping the organization understand that AI systems behave differently than traditional software, including occasional errors and probabilistic rather than deterministic outputs, has been critical to successful adoption.

**Invest in governance early**: Rather than treating governance as an afterthought, nib established comprehensive governance structures that address education, ethics, and delivery management. This is particularly important in regulated industries but relevant across sectors.

**Maintain cost discipline**: Actively managing the economics of production AI deployments ensures sustainability as usage scales.

**Partner with business stakeholders**: Regular engagement with end users, rapid prototyping to demonstrate value, and genuine partnership between technical and business teams has driven successful adoption and identification of high-value use cases.

The case study demonstrates that successful production AI deployment requires attention to technology, process, governance, economics, and organizational change management in combination. nib's methodical approach, building on solid foundations while maintaining pragmatic focus on business value, provides a model for enterprise AI transformation in regulated industries.