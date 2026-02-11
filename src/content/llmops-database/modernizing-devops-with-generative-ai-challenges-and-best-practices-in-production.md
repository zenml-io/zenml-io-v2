---
title: "Modernizing DevOps with Generative AI: Challenges and Best Practices in Production"
slug: "modernizing-devops-with-generative-ai-challenges-and-best-practices-in-production"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67bc3764573f50e4afb1c93c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:01:50.406Z"
  createdOn: "2025-02-24T09:09:56.494Z"
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "error-handling"
  - "system-prompts"
  - "semantic-search"
  - "latency-optimization"
  - "cost-optimization"
  - "cicd"
  - "monitoring"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "kubernetes"
  - "docker"
  - "openai"
  - "anthropic"
  - "microsoft-azure"
  - "amazon-aws"
  - "google-gcp"
industryTags: "tech"
company: "Various (Bundesliga, Harness, Trice)"
summary: "A panel of experts from various organizations discusses the current state and challenges of integrating generative AI into DevOps workflows and production environments. The discussion covers how companies are balancing productivity gains with security concerns, the importance of having proper testing and evaluation frameworks, and strategies for successful adoption of AI tools in production DevOps processes while maintaining code quality and security."
link: "https://www.infoq.com/presentations/generative-ai-2025/?topicPageSponsorship=88befbbd-30f0-4d18-9d43-0bf2cb3e751d"
year: 2025
seo:
  title: "Various (Bundesliga, Harness, Trice): Modernizing DevOps with Generative AI: Challenges and Best Practices in Production - ZenML LLMOps Database"
  description: "A panel of experts from various organizations discusses the current state and challenges of integrating generative AI into DevOps workflows and production environments. The discussion covers how companies are balancing productivity gains with security concerns, the importance of having proper testing and evaluation frameworks, and strategies for successful adoption of AI tools in production DevOps processes while maintaining code quality and security."
  canonical: "https://www.zenml.io/llmops-database/modernizing-devops-with-generative-ai-challenges-and-best-practices-in-production"
  ogTitle: "Various (Bundesliga, Harness, Trice): Modernizing DevOps with Generative AI: Challenges and Best Practices in Production - ZenML LLMOps Database"
  ogDescription: "A panel of experts from various organizations discusses the current state and challenges of integrating generative AI into DevOps workflows and production environments. The discussion covers how companies are balancing productivity gains with security concerns, the importance of having proper testing and evaluation frameworks, and strategies for successful adoption of AI tools in production DevOps processes while maintaining code quality and security."
---

## Overview

This InfoQ Live roundtable brings together practitioners from diverse backgrounds to discuss the practical realities of integrating generative AI into DevOps workflows. The panelists include Christian Bonzelet (AWS Solutions Architect at Bundesliga), Jessica Andersson (Cloud Architect at Trice and CNCF Ambassador), Garima Bajpai (DevOps leader and author), and Shobhit Verma (Engineering Manager at Harness, leading AI agent development). The discussion provides a balanced, practitioner-focused perspective on where generative AI currently delivers value in production environments and where significant challenges remain.

## Current State of GenAI in DevOps

The panelists emphasize that generative AI has evolved beyond simple code generation chatbots to become more deeply integrated into the software development lifecycle. Bonzelet observes that the transformation extends beyond code generation to areas where individual developers may lack expertise, such as documentation, unit tests, and architectural scaffolding. Andersson highlights that the integration of GenAI tools directly into IDEs has been a critical inflection point for adoption, enabling a more seamless back-and-forth workflow rather than context-switching to external tools.

From a production perspective, Verma notes that Harness is actively building AI agents that compete with GitHub Copilot, designed to help developers write higher-quality code faster within their preferred IDE. This represents a concrete example of LLMOps in practice, where the challenge is not just building AI capabilities but integrating them into existing developer workflows in a way that adds measurable value.

## Practical Use Cases in Production

The discussion identifies several concrete use cases where generative AI is being deployed in production DevOps contexts:

- **Automated code generation and boilerplate creation**: Andersson emphasizes that getting past the "blank page" problem is one of the most immediately valuable applications. Developers can use AI to generate initial scaffolding that they then refine, rather than starting from scratch.

- **Test generation and coverage expansion**: Verma notes that AI enables teams to write more tests and achieve coverage in areas that previously went untested, which in turn creates confidence for further experimentation and faster iteration.

- **Infrastructure as code generation**: Bajpai highlights that generating templates for application infrastructure (Terraform, CloudFormation, etc.) represents a low-risk entry point for organizations exploring GenAI adoption.

- **Log analysis and troubleshooting**: Several panelists mention log analysis as a non-mission-critical area where organizations can experiment with AI-assisted operations.

- **Cross-language development**: Verma shares an interesting observation that developers are becoming more confident in undertaking projects in languages they're less experienced with, using AI as a bridge to translate their programming knowledge into unfamiliar syntaxes.

## Challenges and Limitations

The panelists provide a refreshingly honest assessment of current limitations. Bonzelet identifies two primary challenges: organizational concerns around compliance and source code protection, and the fundamental tension between engineering's preference for deterministic behavior and AI's inherently non-deterministic outputs. The same prompt can yield different results on different days as model context and weights evolve.

Andersson raises the often-overlooked issue of confidentiality concerns—organizations remain hesitant about how much of their proprietary code they're willing to send to external AI services. This creates friction in adoption, particularly for enterprises with strict data governance requirements.

The 2023 DORA report finding that AI indulgence can actually hurt developer productivity and performance is cited by Bajpai as evidence that systematic thinking about onboarding is essential. This serves as an important counterweight to vendor marketing claims, highlighting that careless or unstructured AI adoption can be counterproductive.

## The "Human in the Lead" Principle

A recurring theme is the importance of maintaining human oversight and judgment. Bonzelet describes his organization's framing as "human in the lead" rather than "human in the loop," emphasizing that developers should be making decisions rather than simply reviewing AI outputs. This distinction has practical implications for how AI tools are integrated into workflows.

Verma offers a memorable analogy comparing AI management to startup hiring: "You don't hire if you cannot manage." The same applies to AI—developers should only delegate tasks to AI that they can effectively evaluate and verify. If you're asking AI to generate code, you need the expertise to test and validate that code.

## Adoption Strategies and Best Practices

The panelists offer practical guidance for teams looking to adopt generative AI in their DevOps workflows:

**Start with IDE-integrated tools**: Andersson recommends beginning with chat and code assistants integrated into development environments. This represents the most mature category of tools and offers the clearest path to productivity gains.

**Experiment with foundation models directly**: Verma suggests that developers should spend time working directly with foundation models (OpenAI, Anthropic, etc.) rather than only through product interfaces. This builds intuition about what's genuinely possible versus what's marketing, making it easier to evaluate tools.

**Accept the learning curve**: Bonzelet emphasizes that organizations need to protect engineers during the initial adoption period, recognizing that productivity may decrease before it increases as teams learn effective prompting and workflow integration.

**Focus on specific problems**: Rather than broad adoption, pick specific challenges where AI can add value and iterate from there. Document both successes and failures to build organizational knowledge.

**Create safe paths for experimentation**: Organizations need to acknowledge that developers will use AI tools regardless of policy, so creating secure, sanctioned paths is preferable to prohibition.

## Metrics and Measurement Challenges

The panelists express frustration with the current state of metrics around AI-assisted development. Bonzelet specifically calls for moving beyond "X% of companies use generative AI" statistics to understanding actual impact on metrics like lead time, mean time to repair, and deployment frequency.

Verma notes that traditional metrics may become misleading in an AI-augmented world. If developers complete coding tasks faster but the proportion of time spent on "toil" activities appears to increase, that may simply reflect accelerated feature delivery rather than increased burden. New frameworks for understanding productivity in AI-augmented environments are needed.

## Future Considerations

The discussion touches on emerging considerations for LLMOps in the medium term. Verma speculates that organizations may eventually need to optimize for "AI readability" and "AI maintainability" alongside human-readable code, creating scaffolding that helps AI understand and work with codebases effectively.

Bajpai notes that the space remains dominated by a few tech giants, creating competitive dynamics that organizations must navigate. The role of open source in AI development remains unsettled, with ongoing debates about open-source AI definitions and concepts like "fair source" and "ethical source."

New roles are emerging to address AI governance, including AI moderators, machine learning engineers focused on developer tools, and compliance engineers specializing in AI systems. These roles represent organizational infrastructure needed for sustainable AI adoption.

## Platform Engineering Implications

Andersson brings a platform engineering perspective to the discussion, noting that organizations should apply the same principles to AI enablement that they apply to other developer tools: make it easy to do the right thing. Rules and policies alone are insufficient; organizations need to build guardrails and enablement that guide developers toward secure, compliant AI usage without friction.

The discussion acknowledges that the platform engineering approach to generative AI is not yet a solved problem, representing an area of active innovation that will likely see significant development in the coming years.

## Balanced Assessment

While the panelists are generally optimistic about generative AI's potential, they maintain appropriate skepticism about vendor claims and acknowledge that adoption requires careful thought rather than wholesale embrace. The consensus is that generative AI tools are production-ready when used with appropriate human oversight and integrated into mature CI/CD practices, but that organizations still have significant work to do in understanding how to measure value and structure workflows around these new capabilities.