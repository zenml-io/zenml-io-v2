---
title: "AI-Powered Medical Content Review and Generation at Scale"
slug: "ai-powered-medical-content-review-and-generation-at-scale"
draft: false
llmopsTags:
  - "healthcare"
  - "content-moderation"
  - "structured-output"
  - "rag"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "human-in-the-loop"
  - "multi-agent-systems"
  - "evals"
  - "cost-optimization"
  - "chunking"
  - "api-gateway"
  - "serverless"
  - "orchestration"
  - "monitoring"
  - "databases"
  - "anthropic"
  - "amazon-aws"
industryTags: "healthcare"
company: "Flo Health"
summary: "Flo Health faced a critical bottleneck in medical content review, with experts spending an average of seven working days per article to verify medical accuracy against rigorous guidelines. Traditional scaling through hiring was unsustainable due to the scarcity and cost of qualified medical professionals. The company transformed an AWS proof-of-concept into a production-grade AI system built on Amazon Bedrock, implementing specialized AI Judges for different review dimensions (medical accuracy, legal compliance, brand style) and a RAG-based content generation pipeline. This approach reduced review time by 60 percent, tripled content throughput without expanding the medical team, and reduced routine compliance corrections by 80 percent while maintaining rigorous medical accuracy standards through human-in-the-loop validation."
link: "https://aws.amazon.com/blogs/machine-learning/scaling-medical-content-review-at-flo-health-with-amazon-bedrock-part-2/"
year: 2026
seo:
  title: "Flo Health: AI-Powered Medical Content Review and Generation at Scale - ZenML LLMOps Database"
  description: "Flo Health faced a critical bottleneck in medical content review, with experts spending an average of seven working days per article to verify medical accuracy against rigorous guidelines. Traditional scaling through hiring was unsustainable due to the scarcity and cost of qualified medical professionals. The company transformed an AWS proof-of-concept into a production-grade AI system built on Amazon Bedrock, implementing specialized AI Judges for different review dimensions (medical accuracy, legal compliance, brand style) and a RAG-based content generation pipeline. This approach reduced review time by 60 percent, tripled content throughput without expanding the medical team, and reduced routine compliance corrections by 80 percent while maintaining rigorous medical accuracy standards through human-in-the-loop validation."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-medical-content-review-and-generation-at-scale"
  ogTitle: "Flo Health: AI-Powered Medical Content Review and Generation at Scale - ZenML LLMOps Database"
  ogDescription: "Flo Health faced a critical bottleneck in medical content review, with experts spending an average of seven working days per article to verify medical accuracy against rigorous guidelines. Traditional scaling through hiring was unsustainable due to the scarcity and cost of qualified medical professionals. The company transformed an AWS proof-of-concept into a production-grade AI system built on Amazon Bedrock, implementing specialized AI Judges for different review dimensions (medical accuracy, legal compliance, brand style) and a RAG-based content generation pipeline. This approach reduced review time by 60 percent, tripled content throughput without expanding the medical team, and reduced routine compliance corrections by 80 percent while maintaining rigorous medical accuracy standards through human-in-the-loop validation."
notion:
  pageId: "3aaf8dff-2538-8035-8569-d98c01acb7d8"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T12:07:00.000Z"
  lastEditedTime: "2026-07-27T12:07:00.000Z"
  publishedAt: "2026-07-27T12:12:22Z"
---

## Overview

Flo Health, a women's health platform serving over 70 million users worldwide, developed a production-grade AI-powered medical content review and generation system to address a critical bottleneck in their content creation pipeline. The company produces diverse content including in-app stories, articles, onboarding flows, and marketing materials, all of which must meet rigorous medical accuracy standards. Medical experts were spending an average of seven working days per article meticulously verifying facts, checking references against trusted sources, and ensuring compliance with a 10-point medical accuracy checklist. This thorough process, while essential for maintaining trust and safety in the healthcare domain, severely limited the company's ability to scale content production.

The challenge extended beyond time constraints. Scaling a medical review team presented unique difficulties: qualified medical professionals with content expertise are scarce, recruitment is time-consuming and expensive, and the cost of expanding such specialized teams is substantial. The traditional approach of hiring more reviewers proved unsustainable and economically unviable. Flo Health needed a solution that would amplify the impact of existing medical experts by making their time more efficient and their expertise more scalable, while maintaining the high standards necessary for medical content where accuracy and trust are paramount.

The company partnered with the AWS Generative AI Innovation Center to transform a proof-of-concept into a production system built on Amazon Bedrock. The implementation followed a gradual adoption strategy focused on augmenting rather than replacing human expertise, with a three-layer validation approach: checking content against internal medical guidelines, validating against trusted external medical sources, and having medical experts review AI-annotated content in a streamlined interface with highlighted issues and direct links to relevant sources.

## Production Architecture and System Design

Flo Health's production implementation adapted the MACROS (Multi-Agent Content Review and Optimization System) architecture identified during the proof-of-concept phase to their specific content model and pipeline. The system integrates directly with Contentful CMS, which serves as the content management backbone for all content creation workflows.

The architecture leverages a microservices approach with several key AWS components working in concert. Content requests are routed through Amazon API Gateway, which maintains real-time communication with the user interface so creators see progress instantly. AWS Lambda functions orchestrate the workflow, with AWS Step Functions managing the end-to-end multi-stage pipeline. The knowledge base, including medical reference documents, content templates, and visual assets, resides in Amazon S3, with Amazon DynamoDB managing state and metadata across the pipeline.

A critical architectural decision was the implementation of specialized AI Judges rather than a monolithic review system. Each Judge focuses on a specific review dimension such as medical accuracy, legal compliance, brand style, and other quality criteria. Each Judge has its own prompt and a dedicated set of examples for training and testing. This modular approach allows the team to improve each Judge independently by adding more examples, customizing prompts, and improving accuracy while keeping other Judges unchanged, thereby avoiding regression issues.

The multi-Judge architecture also enables sophisticated model selection strategies. The team tests each Judge with different foundation models and chooses the best fit based on required quality thresholds, risk level, latency requirements, and operating costs. For medical safety or other high-risk checks, accuracy and reliability take priority regardless of cost or latency. For simpler or lower-risk checks, lighter models are deployed if they meet the required performance threshold. This tiered model selection strategy optimizes the balance between quality, speed, and cost across the entire content review pipeline.

## Content Processing Pipeline

The content processing pipeline in production embraces the MACROS patterns while adapting them to Flo Health's existing content structure. The company's content, particularly interactive graphs used in surveys and chats, is already stored in a pre-chunked format where each step is a separate content entry. This alignment made integration more straightforward than it might have been with monolithic content structures.

Before assessment, each content step is further split into smaller pieces such as button text, title, description, and other content elements. Every piece of content then undergoes a series of AI Judge evaluations rather than one monolithic review. This means the system runs specialized LLM prompts for each review dimension, producing detailed comments for each piece of content.

After receiving Judges' feedback, the system uses these evaluations as input for generative AI revisions, following the MACROS flow. Using Amazon Bedrock, the system generates proposals for improved text that addresses the concerns identified. These suggestions are presented directly in the Contentful app UI with changes highlighted, enabling content editors and medical experts to review, select, edit, or reject the proposed changes within their familiar workflow. The human reviewer remains in control while using AI as an expert assistant. Once decisions are made for each content element, the application updates the content entry in Contentful with the final approved content.

Results for each pipeline step are loaded asynchronously when ready, preventing users from experiencing delays and enabling a progressive disclosure approach where intermediate results become available for review before the entire pipeline completes.

## AI Content Generation System

Beyond content review, Flo Health implemented an AI content generation system to automate routine operations and reduce cognitive load, allowing requests to be quickly drafted without manually creating content graphs from scratch. The generation pipeline employs a multi-stage chain-of-thought prompting approach that breaks down complex content creation into manageable reasoning steps.

A key optimization in the generation system was using different Claude models from Anthropic via Amazon Bedrock for different tasks based on complexity and requirements. For lightweight classification and routine analysis tasks, such as determining how many steps a user wants to generate, the system uses the faster, lower-cost Claude Haiku model. For high-fidelity content generation or complex reasoning tasks, such as drafting nuanced medical explanations or rewriting paragraphs in specific empathetic tones, the system invokes the more powerful Claude Sonnet models. This differentiated model selection strategy optimizes the cost-performance tradeoff across the generation pipeline.

The content generation system heavily relies on Retrieval Augmented Generation (RAG) to ground generated content in verified medical knowledge and company guidelines. Building generative AI tools in the women's health domain required incorporating substantial context that lives outside the foundation models. At inference time, the system gathers only relevant information from the knowledge base and feeds it into the model's context window. When drafting content, the system retrieves relevant medical guidelines, rules, medical knowledge, existing templates, and visual asset references for the topic at hand.

The knowledge base materials are developed and maintained through an iterative process involving product, editorial, and medical review teams, with the medical team owning the safety scope. The system also integrates trusted third-party medical sources including evidence-based clinical decision tools, peer-reviewed journals, and regulatory body publications. Critically, the system persists the list of sources used alongside each piece of generated content, enabling medical reviewers to validate references directly without manual searching.

The RAG implementation uses semantic search capabilities through Amazon Bedrock to retrieve relevant context from the knowledge base stored in Amazon S3. This ensures that generated content is grounded in verified medical knowledge rather than relying solely on the foundation model's parametric knowledge, which is essential for mitigating hallucination risks in medical content generation.

## User Experience and Interface Design

Flo Health focused extensively on user experience to drive adoption and build trust in the AI-assisted workflow. The team aimed to clearly illustrate and explain every stage of AI generation so users can identify inconsistencies early in the process. To mitigate idle waiting times, the system progressively displays intermediate results as each stage completes, allowing users to begin reviewing output before the entire pipeline finishes.

The interface visualizes all design elements and connections between content pieces (screens), alleviating the need for users to repeatedly export and test content on their phones during the creation process. This visualization capability significantly streamlines the iterative content development workflow.

For the review workflow, medical experts receive AI-annotated content with highlighted concerns, suggested revisions, and relevant pre-researched source materials. This transforms their starting point from a blank page or unstructured content to a pre-annotated document with clear focus areas, allowing them to concentrate on validating AI insights and addressing complex medical nuances that require human judgment.

## Prompt Engineering and Output Format Optimization

Through production deployment, Flo Health's engineering team gained valuable insights into practical prompt engineering challenges and solutions. One significant finding was that YAML proved far more robust than JSON as an output format for LLM responses. The indentation-based structure of YAML is more forgiving, leading to fewer invalid outputs and easier debugging. The team noted that since their initial implementation, Amazon Bedrock has introduced structured outputs capabilities that enforce schema-aligned JSON responses directly at the API level, which could serve as a viable alternative for teams facing similar format consistency challenges.

Another critical insight involved the balance between rules and examples in prompt engineering. As the project grew, the rule set became massive and sometimes contained conflicting instructions, making it harder for models to prioritize correctly. The team found that enriching rules with concrete examples showing the model what they actually wanted, rather than simply stating what to avoid, led to significant error reduction. Few-shot examples consistently improved output adherence to guidelines.

The team also emphasized the importance of specificity over generalization in prompt design. Building prompts specifically around their medical guidelines, source hierarchy, and content standards, and measuring each Judge against predefined test sets combining synthetic and real anonymized cases, delivered consistent improvements in first-pass accuracy and reduced the need for full re-verification of AI output.

## Evaluation and Validation Approach

Flo Health implemented a comprehensive evaluation strategy to ensure the AI system maintained the high quality standards required for medical content. Each AI Judge is tested against predefined test sets that combine synthetic cases and real anonymized content from previous review cycles. This dual approach provides both controlled test scenarios and realistic examples that reflect actual edge cases encountered in production.

The evaluation framework captures every expert correction as reusable rules and examples rather than treating them as one-off edits. This structured feedback loop approach allowed the system to grow smarter with each review cycle, reducing repeated errors by over 70 percent. The continuous learning design was built in from day one rather than retrofitted later, which proved essential for the system's improvement trajectory.

The team measures both efficiency and quality metrics. Primary success metrics focus on two areas: reducing review time and minimizing the number of corrections required by experts. The system achieved a 60 percent reduction in average review time per content piece, reduced routine compliance corrections by 80 percent, and tripled content throughput without expanding the medical team.

## Human-in-the-Loop Strategy

Flo Health's production strategy centered fundamentally on augmenting rather than replacing human expertise. The implementation spans three critical workflow stages, each designed to enhance human capabilities while maintaining rigorous oversight.

First, the system provides intelligent pre-screening where AI flags potential medical claims requiring validation, identifies sections requiring expert attention, and runs preliminary compliance checks against medical guidelines. This transforms the expert's starting point from a blank page to a pre-annotated document with clear focus areas.

Second, the system offers real-time content assistance where writers receive immediate feedback on medical accuracy, style compliance, and citation requirements as they draft, catching issues before they reach the medical expert review stage. This reduces the feedback loop between content creators and medical reviewers, improving the quality of content that reaches the human review stage and decreasing the number of required iterations.

Third, the system enhances the expert review experience by providing medical experts with AI-annotated content featuring highlighted concerns, suggested revisions, and relevant pre-researched source materials. This allows experts to focus their limited time on validating AI insights and addressing complex medical nuances that genuinely require human judgment rather than spending time on routine checks and source searching.

This human-in-the-loop approach acknowledges that in high-stakes domains like medical content, AI serves as an intelligent assistant rather than a replacement for qualified medical professionals. The system maintains human decision-making authority while dramatically increasing the efficiency and throughput of each expert.

## Deployment and Operational Considerations

Flo Health took a gradual rollout approach, recognizing that trust builds through demonstrated success rather than through mandate. The team invested significantly in user experience design to ensure that both content creators and medical reviewers would find the AI-assisted workflow intuitive and valuable rather than cumbersome or threatening.

The modular architecture enables the team to extend the system to new content types or validation requirements as they emerge without requiring wholesale system redesign. The separation of concerns between different AI Judges means that improvements to medical accuracy checks, for example, don't require changes to legal compliance or brand style validation components.

The team is exploring several future directions for the system. One area of investigation is confidence scoring, defined collaboratively with medical experts based on factors like compliance history, guideline priority, and content complexity. Content above certain confidence thresholds would receive expedited review, while higher-risk content would receive additional scrutiny. This risk-based approach would further optimize the allocation of limited expert time.

Another future direction involves extending the approach to visual content review, ensuring that infographics, illustrations, and other visual materials meet the same rigorous medical accuracy standards as textual content. This represents a natural extension of the current system's capabilities.

## Critical Success Factors and Lessons Learned

Several critical success factors emerged from Flo Health's experience deploying LLMs in production for medical content review and generation. First, starting with clear, documented standards proved essential. The company's existing 10-point medical accuracy checklist and comprehensive content guidelines provided the foundation upon which AI Judges could be built and evaluated.

Second, designing for continuous learning from day one rather than treating the system as a static deployment enabled the sustained improvement trajectory that made the business case compelling. By capturing every expert correction as reusable rules and examples, the system continuously improved rather than plateauing after initial deployment.

Third, measuring both efficiency and quality metrics prevented the common pitfall of optimizing for speed at the expense of accuracy. The dual focus on reducing review time while also tracking correction rates and first-pass accuracy ensured that the system delivered genuine value rather than simply shifting work elsewhere in the pipeline.

Fourth, investing in user experience paid dividends in adoption and trust-building. By designing interfaces that clearly illustrated AI reasoning, provided progressive disclosure of results, and integrated seamlessly into existing Contentful workflows, the team minimized friction and resistance to the new workflow.

Fifth, the tiered model selection strategy that matched model capabilities and costs to task requirements proved more effective than using a single powerful model for all tasks. This optimization delivered better cost-performance tradeoffs and enabled faster iteration on individual components.

## Balanced Assessment

While Flo Health reports impressive results including 60 percent reduction in review time and tripling of content throughput, several considerations warrant balanced assessment. The case study originates from AWS promotional materials and naturally emphasizes successes while providing limited detail on challenges, failures, or limitations encountered during implementation.

The reported metrics, while substantial, lack some contextual detail that would enable full assessment. For example, the 60 percent reduction in review time doesn't specify whether this applies to all content types equally or whether certain categories saw more dramatic improvements. Similarly, the claim of tripling content throughput doesn't clarify whether this represents sustained production capacity or peak capability.

The human-in-the-loop approach, while appropriate for the high-stakes medical content domain, means that the system still requires substantial expert involvement. The efficiency gains come from making experts more productive rather than eliminating the need for expert review, which is the right approach but means that scaling constraints haven't been entirely removed.

The system's reliance on comprehensive, well-documented guidelines and extensive knowledge bases means that this approach may be most applicable to organizations that already have mature content standards and substantial existing content libraries. Organizations starting from scratch would need to invest significantly in building these foundational assets before realizing similar benefits.

The modular AI Judge architecture, while enabling independent optimization of different review dimensions, also introduces complexity in system orchestration, monitoring, and debugging. Managing multiple models, prompts, and evaluation datasets across multiple Judges requires sophisticated MLOps practices and tooling.

Despite these considerations, Flo Health's implementation represents a sophisticated production deployment of LLMs in a high-stakes domain where accuracy and safety are paramount. The emphasis on human-in-the-loop validation, structured feedback loops, continuous learning, and tiered model selection reflects mature thinking about LLMOps challenges. The reported outcomes, if sustained over time, represent meaningful business value in a domain where traditional scaling approaches face significant constraints.
