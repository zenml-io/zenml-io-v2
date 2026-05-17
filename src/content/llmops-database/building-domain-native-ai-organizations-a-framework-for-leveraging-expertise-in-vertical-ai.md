---
title: "Building Domain-Native AI Organizations: A Framework for Leveraging Expertise in Vertical AI"
slug: "building-domain-native-ai-organizations-a-framework-for-leveraging-expertise-in-vertical-ai"
draft: false
llmopsTags:
  - "healthcare"
  - "document-processing"
  - "prompt-engineering"
  - "evals"
  - "human-in-the-loop"
  - "documentation"
industryTags: "tech"
company: "Notius Labs"
summary: "This case study presents a comprehensive organizational framework for building successful vertical AI products by strategically incorporating domain expertise. The presenter, drawing from experience at multiple healthcare AI companies including Tandem and Anterior, argues that winning in vertical AI is fundamentally an organizational problem rather than a model sophistication issue. The solution involves three organizational models for domain experts: the Oracle (directly embedding expertise into applications), the Evaluator (defining and measuring quality metrics), and the Architect (designing self-improving systems). Case studies from Granola, Tandem, and Anterior demonstrate how these models can evolve as products scale, with concrete examples showing progression from manual prompt engineering to automated improvement systems that adapt dynamically to user needs."
link: "https://www.youtube.com/watch?v=kfSDc2eVLo4"
year: 2026
seo:
  title: "Notius Labs: Building Domain-Native AI Organizations: A Framework for Leveraging Expertise in Vertical AI - ZenML LLMOps Database"
  description: "This case study presents a comprehensive organizational framework for building successful vertical AI products by strategically incorporating domain expertise. The presenter, drawing from experience at multiple healthcare AI companies including Tandem and Anterior, argues that winning in vertical AI is fundamentally an organizational problem rather than a model sophistication issue. The solution involves three organizational models for domain experts: the Oracle (directly embedding expertise into applications), the Evaluator (defining and measuring quality metrics), and the Architect (designing self-improving systems). Case studies from Granola, Tandem, and Anterior demonstrate how these models can evolve as products scale, with concrete examples showing progression from manual prompt engineering to automated improvement systems that adapt dynamically to user needs."
  canonical: "https://www.zenml.io/llmops-database/building-domain-native-ai-organizations-a-framework-for-leveraging-expertise-in-vertical-ai"
  ogTitle: "Notius Labs: Building Domain-Native AI Organizations: A Framework for Leveraging Expertise in Vertical AI - ZenML LLMOps Database"
  ogDescription: "This case study presents a comprehensive organizational framework for building successful vertical AI products by strategically incorporating domain expertise. The presenter, drawing from experience at multiple healthcare AI companies including Tandem and Anterior, argues that winning in vertical AI is fundamentally an organizational problem rather than a model sophistication issue. The solution involves three organizational models for domain experts: the Oracle (directly embedding expertise into applications), the Evaluator (defining and measuring quality metrics), and the Architect (designing self-improving systems). Case studies from Granola, Tandem, and Anterior demonstrate how these models can evolve as products scale, with concrete examples showing progression from manual prompt engineering to automated improvement systems that adapt dynamically to user needs."
notion:
  pageId: "363f8dff-2538-80ca-98f6-d98cfc9df2d8"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-17T14:52:00.000Z"
  lastEditedTime: "2026-05-17T14:52:00.000Z"
  publishedAt: "2026-05-17T15:37:49Z"
---

## Overview

This presentation by Chris Lovejoy, delivered at an AI Engineer conference, addresses a critical gap in vertical AI product development: how to organizationally structure and leverage domain expertise to build differentiated AI products at scale. Lovejoy draws from his background as a medical doctor who transitioned into AI, having worked as the first employee at Anterior (a prior authorization startup) and with Tandem (the largest clinical AI product provider in the UK by adoption). His thesis challenges the common assumption that model sophistication drives success in vertical AI, arguing instead that the system for incorporating domain insights is more important than the technical capabilities of models and pipelines.

The framework addresses a real market problem: according to Gartner, approximately 50% of generative AI projects were abandoned in the previous year, with a core reason being the failure to deeply understand the workflows being automated and how domain experts perform these processes. While vertical AI represents a multi-trillion dollar opportunity (compared to the $50 billion vertical SaaS market), success at scale has remained elusive.

## The Three Organizational Models

The presentation introduces three distinct approaches to integrating domain expertise into AI product organizations, each suited to different scales and use cases:

**The Oracle Model** involves domain experts directly embedding their expertise into the application. In this approach, the domain expert both assesses AI quality by reviewing outputs and traces, and directly improves the product by tweaking prompts, adding documents, or incorporating tools. This creates a tight feedback loop where one individual or a small team handles both evaluation and improvement. The Oracle approach works best when there are no objective metrics for perfection (taste-driven quality), when the product output is amenable to direct human review even at scale, or when the organization is at an early stage with limited scale.

**The Evaluator Model** separates assessment from improvement. Here, domain experts define meaningful metrics for quantifying performance and build systems to collect that data. This might involve capturing user metrics as north star indicators, hiring domain experts to review subsets of AI outputs, or implementing LLM-as-judge approaches. The evaluator then collaborates with engineers who make the actual improvements based on the quality data. This approach requires the ability to measure performance objectively and works when manual iteration by engineers is fast enough to meet customer needs.

**The Architect Model** represents the most sophisticated approach, where domain experts design systems that automatically improve themselves without significant human-in-the-loop intervention. The architect creates mechanisms that learn from user interactions and adapt dynamically at the edge. This becomes necessary when manual iteration is too slow to handle variations in customer needs, when there's large-scale deployment with diverse use cases, or when the product must adapt to many different interpretations of rules or policies.

## Case Study: Granola

Granola, an AI meeting notes company that recently surpassed a billion-dollar valuation, exemplifies the Oracle model. Joe, who joined as the first employee with a background as a writer and journalist, wrote all the initial prompts and served as the primary gatekeeper of AI quality. She conducted extensive research, spending many hours reading papers and talking to hundreds or thousands of users to understand what constitutes good meeting notes.

The Oracle approach works for Granola because meeting notes have no objectively perfect format—quality depends significantly on human taste and subjective preferences. Additionally, since meeting notes are the core product output, they remain amenable to direct human review even at scale. Joe continues to play this centralized oracle role as the company has grown, though they have built internal tooling to help others contribute to prompts. This case demonstrates how an Oracle can remain effective at scale for certain product types.

## Case Study: Tandem Medical AI Scribe

Tandem's medical AI scribe product, which listens to doctor consultations and generates medical notes, demonstrates the evolution from a centralized Oracle to a decentralized Oracle model. Their first domain expert, Roy, a medical doctor with McKinsey experience, initially reviewed medical notes and updated prompts following the Oracle approach.

However, as Tandem scaled, this centralized approach became impossible for one person to manage. The company serves many different medical specialties, countries, note types, and use cases, creating a long tail of customization needs. Tandem's solution was to hire multiple doctors representing different specialties and geographical regions, each owning particular customer relationships or subsets of use cases. They updated their platform to support thousands of prompt variations, with different domain experts able to make tweaks for their specific contexts.

This decentralized Oracle model works because medical expertise is essential, there remains subjectivity in what constitutes a perfect medical note, and the variations across specialties and geographies necessitate multiple domain experts. Each can leverage their specific expertise to customize the product for their segment while maintaining the direct assessment-improvement loop characteristic of the Oracle role.

## Case Study: Anterior Prior Authorization

Anterior's evolution from Oracle through Evaluator to Architect provides the most comprehensive example of organizational progression. The company performs prior authorization in the US healthcare system, where insurance companies use nurses and doctors to determine whether requested treatments like MRI scans should be approved based on medical appropriateness.

Lovejoy, as Anterior's first technical employee, initially built the product including prompts and code, then reviewed outputs with his clinical expertise to assess appropriateness of authorization decisions, and updated prompts and code accordingly—a classic Oracle approach. As the company acquired more customers and faced more variation in use cases, this didn't scale.

The evolution to Evaluator involved Lovejoy defining specific metrics and failure modes, building a review dashboard for clinicians, and hiring clinical reviewers to perform systematic assessments. This created structured performance data that enabled collaboration with engineering teams to make improvements. However, even this approach proved insufficient as the company continued to scale.

The necessity for an Architect model emerged because different insurance organizations interpret their policies and rules in varying ways. Manual engineering iteration couldn't keep pace with learning these nuances at the edge of deployment. Lovejoy designed methods for automated improvement that could adapt dynamically based on usage patterns and specific organizational interpretations. The prior authorization use case was particularly suitable for this progression because AI quality is clearly measurable (decisions are either correct or incorrect based on medical evidence), clinical reasoning is required for evaluation, and the large variation in rule interpretation necessitates systems that learn from usage rather than centralized updates.

Importantly, Lovejoy emphasizes that the deep understanding gained from serving as an Oracle—understanding failure modes and how AI performs in practice—proved invaluable when designing the evaluation metrics and automated improvement systems. This suggests that organizational evolution through these stages, rather than jumping directly to an Architect model, may provide advantages.

## Skills and Hiring Considerations

The presentation provides detailed guidance on what skills domain experts need for each organizational model, going beyond simply "hire a domain expert":

For **Oracle roles**, the most critical skill is relevant domain expertise with direct experience of the specific use case being automated. Generic domain knowledge (being a doctor, lawyer, etc.) is insufficient if the expert hasn't actually performed the specific workflow the AI is automating (medical coding, contract review, etc.). Adjacent valuable skills include prompting and content engineering experience, attention to detail, and customer communication abilities to understand user needs. However, these are more learnable than the core domain expertise.

**Evaluator roles** require domain expertise plus strong data science intuition. The evaluator is fundamentally doing data science work: defining metrics, building systems to collect those metrics, and making data usable for decision-making. Statistical skills become important at scale for analyzing metric data. Industry connections help when building teams for internal reviews. Leadership experience is valuable for managing review teams. Product management experience enables effective collaboration with engineers who will implement improvements based on the evaluator's findings.

**Architect roles** demand domain expertise combined with experience working on LLM-powered products to understand what levers can improve performance. All the skills valuable for Evaluators remain relevant. Engineering skills become increasingly helpful as architects may need to implement or directly steer development of automated improvement mechanisms.

The presentation emphasizes hiring for breadth: finding someone with domain expertise as the baseline, then as many adjacent skills as possible. Where gaps exist, the domain expert can be paired with complementary specialists (statisticians, engineers, etc.). The failure mode to avoid is hiring someone with only domain expertise and no adjacent skills, as this limits their ability to evolve from Oracle to Evaluator to Architect if the organization's needs progress.

## Organizational Best Practices

Three key organizational principles emerge for effectively leveraging domain experts:

**Define a principal domain expert**: Designate a single individual ultimately accountable for AI quality who can make decisions. This avoids consensus-by-committee dynamics where everyone is responsible so nobody is truly responsible, which slows progress. This accountability gives the individual time and space to deeply understand AI performance, leading to better decision-making.

**Give them ownership**: Domain experts should not be treated as consultants brought in for advice. They must be in the room when decisions are made to build truly differentiated products. Going beyond simply having them review AI outputs, they should build systems around their expertise that enable the organization to measure and improve accurately. One failure mode described involved a company with two senior clinicians in an advisory capacity without clear principal ownership. Progress was slow, and both individuals left after 12-18 months, likely due to lack of ownership, resulting in significant context loss.

**Hire for breadth and enable evolution**: Start domain experts as Oracles early in the organizational journey, then enable their role to evolve as the product and organization scale. Evolution might move toward decentralized Oracle models, through Evaluator to Architect, or along other paths depending on the specific context. The experience gained in earlier stages (particularly as an Oracle understanding failure modes) provides invaluable context for later stages.

## Production AI Considerations and LLMOps Insights

The framework addresses several critical LLMOps challenges:

**Quality assessment in production** requires domain judgment. Organizations must develop internal capabilities to assess what good AI quality looks like, which requires either formal domain expertise (doctors, lawyers) or informal domain expertise specific to the product's workflow and use case.

**The last mile problem** refers to getting products to understand specific nuances of workflows and customer use cases. Generic models, even highly sophisticated ones, fail without this tailored understanding. The organizational models presented provide different mechanisms for closing this gap depending on scale and use case characteristics.

**Evaluation approaches** vary by model. Oracle approaches rely on direct human review with qualitative assessment. Evaluator approaches implement structured metrics, potentially using LLM-as-judge techniques, user behavior metrics, or dedicated review teams. Architect approaches build automated evaluation into the improvement loop itself.

**Prompt engineering** emerges as a critical production skill, particularly for Oracle and Evaluator roles. The Granola case study emphasizes that extensive research and user feedback directly informed prompt development, suggesting that effective prompting requires deep understanding of use cases rather than just technical prompt engineering skills.

**Scaling considerations** drive organizational evolution. What works at small scale (one Oracle reviewing all outputs) breaks as volume increases or use case variation expands. The framework provides decision criteria: can performance be measured objectively? Is manual iteration fast enough? Is one person sufficient? These questions guide the appropriate organizational approach.

**Automated improvement systems** represent the frontier of production AI operations. The Architect model designs mechanisms that learn from deployment without constant human intervention, critical for products facing high variation in customer interpretations or deployment contexts. This addresses a fundamental challenge in vertical AI: customization needs often exceed what centralized manual improvement can deliver.

The presentation acknowledges that playbooks for building AI-powered products with domain expertise are still being figured out, as the industry remains early in this journey. The failure rate of generative AI projects (50% abandoned according to Gartner) suggests that organizational approaches to operationalizing expert judgment around foundation models represent a genuine competitive advantage and operational challenge.

## Critical Assessment

While the framework provides valuable organizational guidance, several considerations warrant attention. The presentation draws heavily from healthcare examples, which may have specific characteristics (clear correctness criteria, regulatory requirements, safety criticality) that don't generalize to all vertical AI domains. The claim that model sophistication matters less than organizational structure for incorporating domain insights, while provocative, may oversimplify—both likely matter significantly in different contexts.

The case studies presented are somewhat selective, focusing on successful implementations. Understanding failure modes beyond the brief mentions would provide more balanced guidance. The evolution from Oracle to Evaluator to Architect is presented somewhat linearly, but organizations might need to move between these models for different product components or customer segments simultaneously.

The emphasis on hiring a single principal domain expert early, while organizationally efficient, could create key person dependencies that introduce risk. The skills matrix for each role is quite extensive—finding individuals with domain expertise plus data science intuition plus product management experience plus engineering skills (for Architects) may be extremely difficult in practice, potentially limiting applicability.

Nevertheless, the framework addresses a genuine gap in how organizations think about building vertical AI products. The distinction between different organizational models provides actionable guidance beyond generic advice to "hire domain experts," and the decision criteria offer practical ways to assess which approach fits specific circumstances. The case studies, despite drawing from a particular industry, illustrate principles that likely transfer to other domains facing similar challenges around quality assessment, scaling expertise, and adapting to customer-specific needs.
