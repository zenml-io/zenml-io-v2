---
title: "Building a Foundation Model Operations Platform"
slug: "building-a-foundation-model-operations-platform"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3d0a0726c5f6249ead85"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:37:44.053Z"
  createdOn: "2024-11-21T14:00:42.504Z"
llmopsTags:
  - "compliance"
  - "databases"
  - "devops"
  - "documentation"
  - "fine-tuning"
  - "high-stakes-application"
  - "human-in-the-loop"
  - "langchain"
  - "microsoft-azure"
  - "monitoring"
  - "openai"
  - "poc"
  - "prompt-engineering"
  - "rag"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
  - "semantic-search"
  - "system-prompts"
industryTags: "tech"
company: "Humanloop"
summary: "Humanloop pivoted from automated labeling to building a comprehensive LLMOps platform that helps engineers measure and optimize LLM applications through prompt engineering, management, and evaluation. The platform addresses the challenges of managing prompts as code artifacts, collecting user feedback, and running evaluations in production environments. Their solution has been adopted by major companies like Duolingo and Gusto for managing their LLM applications at scale."
link: "https://www.latent.space/p/humanloop"
year: 2023
seo:
  title: "Humanloop: Building a Foundation Model Operations Platform - ZenML LLMOps Database"
  description: "Humanloop pivoted from automated labeling to building a comprehensive LLMOps platform that helps engineers measure and optimize LLM applications through prompt engineering, management, and evaluation. The platform addresses the challenges of managing prompts as code artifacts, collecting user feedback, and running evaluations in production environments. Their solution has been adopted by major companies like Duolingo and Gusto for managing their LLM applications at scale."
  canonical: "https://www.zenml.io/llmops-database/building-a-foundation-model-operations-platform"
  ogTitle: "Humanloop: Building a Foundation Model Operations Platform - ZenML LLMOps Database"
  ogDescription: "Humanloop pivoted from automated labeling to building a comprehensive LLMOps platform that helps engineers measure and optimize LLM applications through prompt engineering, management, and evaluation. The platform addresses the challenges of managing prompts as code artifacts, collecting user feedback, and running evaluations in production environments. Their solution has been adopted by major companies like Duolingo and Gusto for managing their LLM applications at scale."
---

## Overview

Humanloop is a Foundation Model Ops (FM Ops) platform that helps engineers measure and optimize LLM applications in production. Founded by Raza Habib, Peter, and Jordan, the company went through Y Combinator's S20 batch and initially focused on automated labeling for NLP applications. After the release of InstructGPT (the precursor research to text-davinci and later models), the team recognized that the market for labeling would decline significantly as in-context learning reduced the need for annotated data. This led to a strategic pivot approximately a year before this podcast recording (around late 2022) to focus entirely on LLMOps tooling.

The pivot was notably risky—the company had paying customers, was growing reasonably, and had raised venture capital. At the time of the pivot, Raza estimated there were only about 300-400 companies in the world working with OpenAI's API, making the total addressable market appear very small. This turned out to be orders of magnitude too conservative, and the market expanded rapidly after ChatGPT's release.

## The LLMOps Problem Space

The core problem Humanloop addresses is the transition from playground to production for AI applications. Engineers building with LLMs typically start with quick demos in tools like the OpenAI Playground, but then face significant challenges as they need to:

- Share and version prompts across teams
- Run evaluations to measure prompt quality
- Monitor deployed prompts in production
- Store data and potentially fine-tune models
- Collaborate between engineers and non-technical stakeholders (product managers, domain experts, linguists)

Before dedicated tooling existed, teams would cobble together solutions using Excel spreadsheets, Grafana, Mixpanel, and the OpenAI Playground in what the podcast describes as "very kludgy pipelines."

## Target Customer Evolution

The shift from traditional ML to LLMs fundamentally changed Humanloop's target customer profile. Previously, they built for machine learning engineers with research backgrounds who understood the intricacies of model training and evaluation. Post-pivot, their customers are more product-focused engineers—what the podcast terms "AI Engineers"—who are outcome-oriented and relatively agnostic about the specific means used to achieve their goals.

This customer profile shift proved beneficial for a tooling provider because these engineers don't fight to build everything themselves. They want good tools and are willing to pay for them because they're focused on reaching good outcomes quickly. Humanloop can also bake in best practices and knowledge, making the platform more valuable since users don't need deep ML expertise to benefit.

The buying persona varies by company stage. For early-stage startups (even Series A companies), it was typically founders or CTOs reaching out. As Humanloop moved upmarket to serve larger enterprises, the contact points diversified to include senior staff engineers who sign up first, explore the product, then book demos to discuss data privacy and rollout strategies.

## The Three Stages of Prompt Evaluation

A key conceptual framework discussed is the three distinct stages where evaluation matters in LLM applications:

**Development-time evaluation:** Before something is in production, engineers need feedback as they iterate on prompts, contexts, and model choices. The challenge is knowing whether changes are actually improvements without real user data.

**Production monitoring:** Once deployed, the system receives diverse customer inputs. Monitoring ensures the application continues to perform as expected under real-world conditions with data distributions that may differ from development.

**Regression testing:** Analogous to integration tests, this ensures that new changes don't break previously working functionality. Every prompt modification could potentially degrade performance on existing use cases.

Each stage requires somewhat different evaluation approaches. The crucial insight is that for subjective tasks (which many LLM applications involve), the only real ground truth is what customers say is correct. Development-time evaluations are necessarily proxies for actual user satisfaction.

## The Three Types of Human Feedback

Humanloop supports three distinct types of user feedback, each serving different purposes:

**Votes:** Traditional thumbs up/thumbs down feedback. While useful when received, engagement rates are typically low—users rarely take explicit action to rate outputs.

**Actions:** Implicit signals derived from user behavior. The podcast gives Sudowrite (a fiction writing assistant) as an example. They tracked whether users accepted suggestions, how often they regenerated, how much they edited suggestions before including them, and whether content was shared. These behavioral signals correlate strongly with quality and don't require explicit user action.

**Corrections:** When users edit generated text before using it, capturing the correction creates valuable training data. For example, sales email generation tools can log the difference between draft and sent versions. This data is particularly valuable for future fine-tuning efforts.

The framework around implicit feedback is especially important for production systems where explicit feedback is sparse. Companies like Sudowrite that tracked these implicit signals and ran experiments to optimize for them saw direct improvements in user traction.

## Dealing with Model Drift: Did GPT-4 Get Dumber?

A significant production concern discussed is the volatility of closed-source LLM APIs. The podcast addresses the viral question of whether GPT-4 degraded over time. Raza's nuanced take is that GPT-4 definitely changed (it's not static), and likely improved in some areas while getting worse in others. The Stanford paper providing evidence of changes was credible, but the key insight for practitioners is different from the headline question.

The important question isn't whether GPT-4 got dumber overall, but whether it got worse for your specific use case. OpenAI only allows pinning a model version for approximately 6 months, meaning applications built on their APIs are inherently built on "shifting sand." This reality drives the need for comprehensive evaluation infrastructure.

Humanloop's approach is to help customers build evaluation frameworks that can detect regressions specific to their applications. Without this capability, teams struggle to disentangle whether issues stem from prompt changes, retrieval system degradation, shifts in user input distribution, or model changes from the provider.

## Enterprise Deployment Considerations

As Humanloop moved upmarket to serve larger enterprises (including Duolingo and Gusto), they faced typical enterprise requirements: SOC 2 compliance (they completed Part 1 and were being audited for Part 2 at the time of recording), regular penetration testing, extensive InfoSec questionnaires, and trust reports via Vanta.

For data privacy, most customers accept Humanloop's cloud deployment with appropriate security certifications. VPC deployments are offered where needed, particularly for financially regulated companies like MXGBT (a global business travel company). The team's approach is to first understand what specific concerns drive VPC requests and see if they can be addressed contractually or through their security practices before resorting to more complex deployment models.

## Evaluation Feature Development

At the time of recording, Humanloop had approximately 10 companies in closed beta for their new evaluations feature. The implementation allows evaluators to be defined in Python and can optionally call language models themselves (for LLM-as-judge patterns). Execution can happen either on Humanloop's protected servers (which required significant engineering for safe code execution in multi-tenant environments) or on customer infrastructure with results logged back to Humanloop.

The bidirectional workflow between production data and interactive evaluation is emphasized as a key differentiator. Users can take logged production data, open it in an interactive environment, and run counterfactuals: Would the model have succeeded with correct context retrieval? What happens with GPT-4 instead of GPT-3.5? This capability helps teams build intuition about failure modes.

## Fine-tuning Workflows

Humanloop observed distinct patterns in fine-tuning usage. Before GPT-3.5 and GPT-4 (when only GPT-3 was available), fine-tuning was common. After the newer models launched without fine-tuning options, usage "fell off a cliff"—partly because the models were better, partly because it simply wasn't an option.

With GPT-3.5 fine-tuning returning, Humanloop supports a workflow where teams generate outputs with GPT-4, filter based on evaluation or feedback criteria, and then fine-tune smaller, faster models (GPT-3.5) on the curated data. This distillation pattern—using a capable model to generate training data for a smaller model—is natively supported within the platform.

## Competitive Landscape and Differentiation

The podcast discusses the "Foundation Model Ops" market as typically having three competing approaches: prompt management tools, LLM API logging tools, and open-source framework startups (like LangChain and LlamaIndex) that build their own tooling to serve and monetize users.

LangChain's LangSmith is specifically addressed as an emerging competitor that overlaps with Humanloop's features. Raza acknowledges the overlap but notes that LangSmith is tightly integrated with LangChain, creating friction for teams not using that framework as their production choice. Humanloop positions as more framework-agnostic.

On differentiation more broadly, Raza emphasizes the importance of having strong opinions to avoid building "very undifferentiated products that they're for everybody, so they're not for anyone." Humanloop incorporates learnings from their diverse customer base into sensible defaults—like the three types of feedback collection—that nudge users toward best practices without requiring explicit awareness.

## Addressing Graduation Risk

On the concern that logging at scale becomes commoditized, Raza argues the opposite occurs in practice: larger deployments become stickier. While the marginal value of individual log entries decreases, the value of the workflow tooling around improvement increases. Customers accumulate evaluations, add team members, involve product managers and domain experts, and create tighter integrations with human-in-the-loop processes.

The comparison to passive monitoring tools like Datadog or Amplitude is rejected. AI applications are different because interventions can be quick and powerful—updating retrieval systems or changing prompts can have immediate impact. Coupling the ability to act on insights directly with the analytics data creates value that pure logging tools don't capture.

## Technical Infrastructure Notes

The podcast touches briefly on several technical implementation details. For multimodal support (anticipating GPT-4 Vision), basic requirements include rendering and reading images in the interactive playground environment—described as "follow your nose" engineering work that was becoming a priority item on the roadmap.

For code execution in evaluations, Humanloop explored options including edge compute providers (Deno, Cloudflare Workers, Modal) for safe execution environments before building their own protected environment.

## Prompt Injection and Security

Surprisingly, almost none of Humanloop's customers were asking about prompt injection at the time of recording. Raza attributes this to the current stage of LLM adoption—most customers are using read-only models without action-taking capabilities. When models only generate text without write access to data sources, prompt injection is less critical than preventing hallucinations or implementing behavioral guardrails.

The expectation is that as more companies deploy agents with read-write access to data sources, prompt injection will become as important as any other form of code injection. Humanloop's position as a layer between raw models and applications positions them to potentially offer security features when this need materializes.