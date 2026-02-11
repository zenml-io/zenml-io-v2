---
title: "Building and Deploying Large Language Models for Skills Extraction at Scale"
slug: "building-and-deploying-large-language-models-for-skills-extraction-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3d0b6a98870aaf4a5108"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:36:31.366Z"
  createdOn: "2024-11-21T14:00:43.270Z"
llmopsTags:
  - "cache"
  - "data-analysis"
  - "embeddings"
  - "fine-tuning"
  - "knowledge-distillation"
  - "microsoft-azure"
  - "model-optimization"
  - "monitoring"
  - "orchestration"
  - "realtime-application"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "structured-output"
industryTags: "tech"
company: "LinkedIn"
summary: "LinkedIn developed a comprehensive LLM-based system for extracting and mapping skills from various content sources across their platform to power their Skills Graph. The system uses a multi-step AI pipeline including BERT-based models for semantic understanding, with knowledge distillation techniques for production deployment. They successfully implemented this at scale with strict latency requirements, achieving significant improvements in job recommendations and skills matching while maintaining performance with 80% model size reduction."
link: "https://www.linkedin.com/blog/engineering/skills-graph/extracting-skills-from-content"
year: 2023
seo:
  title: "LinkedIn: Building and Deploying Large Language Models for Skills Extraction at Scale - ZenML LLMOps Database"
  description: "LinkedIn developed a comprehensive LLM-based system for extracting and mapping skills from various content sources across their platform to power their Skills Graph. The system uses a multi-step AI pipeline including BERT-based models for semantic understanding, with knowledge distillation techniques for production deployment. They successfully implemented this at scale with strict latency requirements, achieving significant improvements in job recommendations and skills matching while maintaining performance with 80% model size reduction."
  canonical: "https://www.zenml.io/llmops-database/building-and-deploying-large-language-models-for-skills-extraction-at-scale"
  ogTitle: "LinkedIn: Building and Deploying Large Language Models for Skills Extraction at Scale - ZenML LLMOps Database"
  ogDescription: "LinkedIn developed a comprehensive LLM-based system for extracting and mapping skills from various content sources across their platform to power their Skills Graph. The system uses a multi-step AI pipeline including BERT-based models for semantic understanding, with knowledge distillation techniques for production deployment. They successfully implemented this at scale with strict latency requirements, achieving significant improvements in job recommendations and skills matching while maintaining performance with 80% model size reduction."
---

## Overview

LinkedIn has built a sophisticated AI-powered skill extraction and mapping system to fuel their Skills Graph, which serves as foundational technology for member-job matching, learning recommendations, and skills-first hiring initiatives across the platform. The case study provides a comprehensive look at how large-scale language models and NLP systems are operationalized in production at LinkedIn, addressing challenges around latency, scale, model complexity, and continuous improvement.

The core problem LinkedIn faced was that skills are mentioned throughout diverse content types—member profiles, job postings, resumes, LinkedIn Learning courses, and feed posts—but not always in structured, easily extractable formats. Skills may be listed explicitly in dedicated sections, embedded in free-text descriptions, or only implied through context. LinkedIn needed a robust system to identify, extract, normalize, and map these skills to their canonical Skills Graph (containing over 41,000 skills) while operating at massive scale with strict latency requirements.

## Architecture and Model Stack

The skill extraction pipeline consists of several interconnected stages, each addressing a specific aspect of the extraction and mapping challenge.

### Skill Segmentation

Before any skill extraction occurs, the system parses raw input content into well-formed structures. For job postings, this means identifying sections like "company description," "responsibilities," "benefits," and "qualifications." For resumes, it identifies skills sections and past experiences. This segmentation is crucial because the location of a skill mention provides important signal about its relevance—a skill mentioned in qualifications is typically more important than one mentioned in company descriptions.

### Skill Tagging: Hybrid Approach

LinkedIn employs a dual approach to skill tagging that balances speed and semantic understanding:

**Trie-Based Token Matching**: This approach encodes skill names from the taxonomy into a trie structure and performs token-based lookups on raw text input. The advantage is exceptional speed and scalability for high-volume text processing. The limitation is dependency on the skills taxonomy to capture every variation of how skills are expressed in natural language.

**Semantic Two-Tower Model**: To complement the token-based approach, LinkedIn developed a semantic tagger using a two-tower architecture based on Multilingual BERT as the text encoder. This model builds contextual embeddings for both source text and skill names, with the two-tower structure decoupling the generation of sentence and skill embeddings while keeping them comparable via a similarity function. This enables the system to infer skills from contextual descriptions like "experience with design of iOS application" mapping to "Mobile Development" even when the skill isn't explicitly mentioned.

### Skill Expansion

Once initial skills are tagged, the system leverages the Skills Graph's structure to expand the skill set. This includes querying for related skills in the same skill group and skills with structural relationships such as parent skills, children skills, and sibling skills. This expansion increases the chances of relevant skill matches.

### Multitask Cross-Domain Skill Scoring

The final scoring stage uses a multitask model architecture with shared and domain-specific components:

**Shared Module**: Contains a Contextual Text Encoder (using Transformer architecture) that incorporates text information from skill mentions, surrounding context, job titles, and member profiles. A Contextual Entity Encoder utilizes pre-calculated embeddings for skills, titles, industries, and geographic entities, plus manual features like co-occurrence rates between entities.

**Domain-Specific Module**: Multiple dedicated model towers for each vertical (job postings, member profiles, feeds, etc.) that share the contextual information from the shared module but are developed independently. This architecture allows each vertical to maintain flexibility for their specific nuances while benefiting from shared representations.

## Production Serving and LLMOps Challenges

The case study reveals significant LLMOps challenges around serving BERT-based models at scale. LinkedIn processes approximately 200 global profile edits per second, with each message needing to be processed in under 100 milliseconds. Serving a full 12-layer BERT model while maintaining these latency standards is described as "a daunting task even for industry leaders" due to BERT's large parameter count and computational demands.

### Knowledge Distillation for Model Compression

LinkedIn's key innovation for production serving was applying Knowledge Distillation to transfer knowledge from the larger "teacher" BERT network to a smaller "student" network. This approach reduced model size by 80% without compromising performance, enabling deployment within the existing Samza-BEAM CPU serving constraints.

The team developed a balance between performance and model complexity that acknowledges the research finding that large models often underutilize their capacity, making compression possible without significant performance degradation.

### Hybrid Offline/Nearline Architecture

For the full data reprocessing challenge, LinkedIn developed a hybrid solution combining offline and nearline processing:

- **Offline Processing**: Collaboration with internal platform teams (Waterloo and Samza-Beam) to develop Spark-based offline scoring capabilities for batch reprocessing of historical data
- **Nearline Processing**: Real-time processing for new profile updates and content changes

This hybrid approach optimized cost-to-serve while meeting the stringent requirements for both online and offline/nearline scenarios within inference time SLAs.

## Continuous Improvement Through Feedback Loops

A critical aspect of the LLMOps implementation is the integration of product-driven feedback loops for model improvement:

**Recruiter Skill Feedback**: When recruiters manually post jobs, they're shown AI-generated skill suggestions that they can edit. This provides direct feedback on skill extraction quality from the hiring perspective.

**Job Seeker Skill Feedback**: Job seekers see how many of their skills overlap with job requirements and can flag irrelevant skills. This captures the candidate's perspective on skill-job relevance for model training.

**Skill Assessments**: LinkedIn Skill Assessments allow members to validate their skills through adaptive quizzes. Members scoring at 70th percentile or higher earn verified skill badges. This provides ground-truth validation of skills that can inform model improvement.

## Measured Results

The multitask learning approach for identifying skill relationships (required, core, mentioned/valid) produced measurable improvements across LinkedIn products:

- **Job Recommendations**: +0.14% member job applicants and offsite apply clickers; +0.46% predicted confirmed hires
- **Job Search**: +0.15% job sessions; +0.76% PPC revenue; +0.23% engagements  
- **Job-Member Skills Matching**: +0.87% qualified applications; +0.40% qualified application rate; +0.24% predicted confirmed hires; +0.48% applicants and apply clicks

While these percentage improvements may appear modest, at LinkedIn's scale they represent significant business impact.

## Future Directions

LinkedIn outlines several forward-looking investments in their skill understanding capabilities:

- Leveraging LLMs to generate rich descriptions for every skill in the Skills Graph
- Fine-tuning LLMs to improve skill extraction model performance and generate high-quality proxy labels at scale
- Moving toward embedding-based skill representation rather than exact text/ID matching to enable more semantically relevant matches in downstream models

## Assessment and Considerations

This case study demonstrates a mature, production-grade approach to deploying NLP/LLM-based systems at scale. The hybrid architecture combining efficient token-based matching with semantic understanding shows practical engineering trade-offs. The 80% model compression via Knowledge Distillation addresses a common challenge in deploying large language models in latency-sensitive applications.

The feedback loop integration is particularly noteworthy as it demonstrates how product features can be designed to simultaneously deliver member value and generate training signal for model improvement. The multitask learning architecture also shows thoughtful consideration of how to share representations across domains while preserving domain-specific flexibility.

One potential limitation is that the case study comes from LinkedIn's engineering blog, so results are presented favorably. The reported A/B test improvements, while statistically meaningful at scale, are relatively small percentages, suggesting the system's value lies in aggregate improvement across many interactions rather than dramatic transformation of individual experiences.