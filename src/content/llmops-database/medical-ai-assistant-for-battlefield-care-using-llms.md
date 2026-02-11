---
title: "Medical AI Assistant for Battlefield Care Using LLMs"
slug: "medical-ai-assistant-for-battlefield-care-using-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3d04630fa77c4716ba41"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:34:22.784Z"
  createdOn: "2024-11-21T14:00:36.249Z"
llmopsTags:
  - "chatbot"
  - "compliance"
  - "documentation"
  - "error-handling"
  - "guardrails"
  - "healthcare"
  - "high-stakes-application"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "rag"
  - "reliability"
  - "security"
  - "semantic-search"
  - "system-prompts"
industryTags: "healthcare"
company: "Johns Hopkins"
summary: "Johns Hopkins Applied Physics Laboratory (APL) is developing CPG-AI, a conversational AI system using Large Language Models to provide medical guidance to untrained soldiers in battlefield situations. The system interprets clinical practice guidelines and tactical combat casualty care protocols into plain English guidance, leveraging APL's RALF framework for LLM application development. The prototype successfully demonstrates capabilities in condition inference, natural dialogue, and algorithmic care guidance for common battlefield injuries."
link: "https://www.jhuapl.edu/news/news-releases/230817a-cpg-ai-battlefield-medical-assistance"
year: 2023
seo:
  title: "Johns Hopkins: Medical AI Assistant for Battlefield Care Using LLMs - ZenML LLMOps Database"
  description: "Johns Hopkins Applied Physics Laboratory (APL) is developing CPG-AI, a conversational AI system using Large Language Models to provide medical guidance to untrained soldiers in battlefield situations. The system interprets clinical practice guidelines and tactical combat casualty care protocols into plain English guidance, leveraging APL's RALF framework for LLM application development. The prototype successfully demonstrates capabilities in condition inference, natural dialogue, and algorithmic care guidance for common battlefield injuries."
  canonical: "https://www.zenml.io/llmops-database/medical-ai-assistant-for-battlefield-care-using-llms"
  ogTitle: "Johns Hopkins: Medical AI Assistant for Battlefield Care Using LLMs - ZenML LLMOps Database"
  ogDescription: "Johns Hopkins Applied Physics Laboratory (APL) is developing CPG-AI, a conversational AI system using Large Language Models to provide medical guidance to untrained soldiers in battlefield situations. The system interprets clinical practice guidelines and tactical combat casualty care protocols into plain English guidance, leveraging APL's RALF framework for LLM application development. The prototype successfully demonstrates capabilities in condition inference, natural dialogue, and algorithmic care guidance for common battlefield injuries."
---

## Overview

Johns Hopkins Applied Physics Laboratory (APL), a not-for-profit division of Johns Hopkins University, is developing CPG-AI (Clinical Practice Guideline-driven AI), a proof-of-concept conversational AI system designed to assist soldiers with no specialized medical training in providing care to injured comrades on the battlefield. This project represents a compelling application of large language models (LLMs) to a high-stakes, operationally constrained environment where traditional AI approaches would be impractical.

The fundamental problem being addressed is that in battlefield conditions, soldiers frequently need to provide medical care to injured colleagues for extended periods, often without any formal medical training. Traditional clinical decision support systems are typically designed for trained medical professionals in controlled environments, relying on structured interfaces, precise inputs, and rule-based systems that require extensive labeling of training data and careful calibration. These approaches are poorly suited to chaotic battlefield conditions where untrained individuals need guidance in natural, conversational language.

## Technical Architecture and LLMOps Approach

### RALF Framework

A significant aspect of this case study from an LLMOps perspective is the development of RALF (Reconfigurable APL Language model Framework), an internal software ecosystem developed by APL's Intelligent Systems Center (ISC). RALF was created as part of a strategic initiative centered on LLMs and comprises two primary toolsets:

- A set of tools for building applications that leverage LLMs
- A set of tools for building conversational agents that can utilize those applications

CPG-AI integrates both of these components, suggesting a modular, reusable architecture that can potentially be applied to other LLM-based projects. This represents a mature approach to LLMOps, where the organization has invested in building reusable infrastructure rather than one-off solutions.

### From Traditional AI to LLM-Based Systems

The case study highlights a significant architectural shift from traditional AI approaches to LLM-based systems. Previously, building a conversational agent for this use case would have required training "20 or 30 individual components running behind the scenes," including search components, relevance determination systems, and dialogue management modules. Each of these would have required bespoke neural network training on specific tasks with labeled data.

LLMs offer a fundamentally different paradigm: a single model trained on vast amounts of unlabeled text that can adapt to different tasks through text prompts providing situational context and relevant information. This represents a substantial reduction in the complexity of the ML pipeline and training infrastructure required, though it introduces new challenges around prompt engineering and information retrieval.

### Knowledge Integration and RAG-Like Architecture

A critical aspect of the system is how domain knowledge is integrated into the LLM's responses. The team has applied care algorithms from Tactical Combat Casualty Care (TCCC), a set of guidelines developed by the U.S. Department of Defense Joint Trauma System specifically designed to help relative novices provide trauma care on the battlefield.

The researchers note that TCCC care algorithms exist as flowcharts that can be translated into machine-readable form. Additionally, they converted more than 30 clinical practice guidelines from the Department of Defense Joint Trauma System into text that could be ingested by the model, covering conditions such as burns, blunt trauma, and other common battlefield injuries.

This approach has characteristics of retrieval-augmented generation (RAG), where external authoritative knowledge sources are integrated to ground the model's responses in verified medical protocols rather than relying solely on the model's pre-training knowledge. This is particularly important in a medical context where accuracy is critical and hallucinations could be life-threatening.

### Prompt Engineering Challenges

The case study provides candid insights into the challenges of working with LLMs in production scenarios. Sam Barham, the project lead, offers a memorable characterization: "An LLM is like a precocious 2-year-old that's very good at some things and extremely bad at others, and you don't know in advance which is which."

Two major work areas are identified for transforming a base LLM into a production-ready tool:

- Careful, precise engineering of text prompts
- Injection of "ground truth" in the form of care algorithms

This highlights that while LLMs reduce certain training burdens, they introduce new engineering challenges around prompt design and knowledge grounding. The team plans to continue improving CPG-AI by crafting more effective prompts and improving the model's ability to correctly categorize and retrieve information from practice guidelines.

## System Capabilities and Current State

The prototype model developed in the first phase demonstrates several capabilities:

- Inferring patient conditions based on conversational input
- Answering questions accurately and without medical jargon
- Guiding users through care algorithms for tactical field care
- Switching smoothly between stepping through care procedures and answering ad-hoc questions

The tactical field care category addressed encompasses the most common battlefield injuries including breathing issues, burns, and bleeding.

## Production Readiness and Future Development

It is important to note that the project is explicitly described as a "proof of concept" and the lead researcher acknowledges it is "not battle-ready by any means, but it's a step in the right direction." This honest assessment is valuable context, as many case studies tend to overstate production readiness.

The next phase of development includes:

- Expanding the range of medical conditions the system can address
- Improving prompt engineering for more effective responses
- Enhancing the model's ability to correctly categorize and retrieve information from clinical practice guidelines

## Operational Constraints and Considerations

The case study briefly touches on an important operational constraint: until recently, LLMs were "far too slow and computing-power-intensive to be of any practical use in this operational context." Recent advances in both computing power and LLM efficiency have made deployment more realistic.

For battlefield deployment, there are likely significant additional considerations not fully addressed in the case study, including:

- Connectivity constraints (whether the system can run locally on edge devices or requires network access)
- Latency requirements for real-time medical guidance
- Power and hardware constraints for field deployment
- Reliability and fallback mechanisms when the system fails or is uncertain

## Broader Strategic Context

The project is part of APL's Intelligent Systems Center strategic initiative focused on LLMs. Bart Paulhamus, the ISC Chief, emphasizes the transformative impact of LLMs on the AI community and the need for APL to "become experts at creating, training and using them." This suggests organizational investment in building LLM expertise and infrastructure across multiple applications, not just this specific project.

Amanda Galante, who oversees the Assured Care research portfolio, raises important questions about the challenges of deploying LLMs in high-stakes contexts: "How can we harness these powerful tools, while also ensuring accuracy, as well as transparency — both in terms of the reasoning underlying the AI's responses, and the uncertainty of those responses?" These concerns around explainability, uncertainty quantification, and reliability are central to responsible LLMOps in safety-critical applications.

## Critical Assessment

While this case study demonstrates thoughtful application of LLMs to a genuinely challenging problem, several aspects warrant careful consideration:

The project is still in proof-of-concept stage, so claims about operational effectiveness remain to be validated through rigorous testing in realistic conditions. The challenges of deploying AI in life-critical, chaotic environments are substantial, and the gap between prototype and battlefield-ready system is likely significant.

The emphasis on RALF as an internal framework suggests good engineering practices, but limited details are provided about how the framework handles important production concerns like monitoring, version control, testing, or safety guardrails.

The reliance on DoD clinical practice guidelines as ground truth is sensible, but the mechanisms for keeping this knowledge base current as guidelines evolve are not discussed.

Overall, this represents a promising early-stage application of LLMs to a legitimate operational need, with appropriately measured expectations about current capabilities and clear acknowledgment of work remaining to achieve production readiness.