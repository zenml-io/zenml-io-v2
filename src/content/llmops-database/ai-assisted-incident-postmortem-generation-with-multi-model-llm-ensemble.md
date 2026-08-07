---
title: "AI-Assisted Incident Postmortem Generation with Multi-Model LLM Ensemble"
slug: "ai-assisted-incident-postmortem-generation-with-multi-model-llm-ensemble"
draft: false
llmopsTags:
  - "document-processing"
  - "summarization"
  - "high-stakes-application"
  - "prompt-engineering"
  - "cost-optimization"
  - "human-in-the-loop"
  - "error-handling"
  - "latency-optimization"
  - "monitoring"
  - "security"
  - "openai"
industryTags: "tech"
company: "Datadog"
summary: "Datadog developed an LLM-based feature within their Bits AI product to assist engineers in writing incident postmortems by combining structured metadata from their Incident Management app with unstructured Slack discussions. The challenge was to reduce the burden of comprehensive documentation while preserving the essential learning process and human authorship. The solution employed an ensemble of LLM models (GPT-3.5, GPT-4) with custom instructions, parallel processing of postmortem sections, secret scanning for privacy, and extensive prompt engineering. Through over 100 hours of iteration, qualitative surveys, and both ROUGE/BLEU quantitative metrics, they achieved sub-one-minute generation times while maintaining accuracy and human control, though the system proved most effective for mid-to-lower severity incidents."
link: "https://www.datadoghq.com/blog/engineering/llms-for-postmortems/"
year: 2024
seo:
  title: "Datadog: AI-Assisted Incident Postmortem Generation with Multi-Model LLM Ensemble - ZenML LLMOps Database"
  description: "Datadog developed an LLM-based feature within their Bits AI product to assist engineers in writing incident postmortems by combining structured metadata from their Incident Management app with unstructured Slack discussions. The challenge was to reduce the burden of comprehensive documentation while preserving the essential learning process and human authorship. The solution employed an ensemble of LLM models (GPT-3.5, GPT-4) with custom instructions, parallel processing of postmortem sections, secret scanning for privacy, and extensive prompt engineering. Through over 100 hours of iteration, qualitative surveys, and both ROUGE/BLEU quantitative metrics, they achieved sub-one-minute generation times while maintaining accuracy and human control, though the system proved most effective for mid-to-lower severity incidents."
  canonical: "https://www.zenml.io/llmops-database/ai-assisted-incident-postmortem-generation-with-multi-model-llm-ensemble"
  ogTitle: "Datadog: AI-Assisted Incident Postmortem Generation with Multi-Model LLM Ensemble - ZenML LLMOps Database"
  ogDescription: "Datadog developed an LLM-based feature within their Bits AI product to assist engineers in writing incident postmortems by combining structured metadata from their Incident Management app with unstructured Slack discussions. The challenge was to reduce the burden of comprehensive documentation while preserving the essential learning process and human authorship. The solution employed an ensemble of LLM models (GPT-3.5, GPT-4) with custom instructions, parallel processing of postmortem sections, secret scanning for privacy, and extensive prompt engineering. Through over 100 hours of iteration, qualitative surveys, and both ROUGE/BLEU quantitative metrics, they achieved sub-one-minute generation times while maintaining accuracy and human control, though the system proved most effective for mid-to-lower severity incidents."
notion:
  pageId: "3b5f8dff-2538-8086-8022-d29b8fbf6720"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T13:18:00.000Z"
  lastEditedTime: "2026-08-07T13:18:00.000Z"
  publishedAt: "2026-08-07T13:22:55Z"
---

## Overview

Datadog built an AI-powered feature within their Bits AI product to assist engineers in drafting incident postmortems, addressing a common pain point in DevOps and SRE practices. The fundamental challenge was that while writing postmortems is essential for organizational learning after incidents, engineers often find the documentation process cumbersome, especially after they've already resolved the immediate crisis and moved on to other urgent work. The goal was to streamline this process without undermining the core learning value that comes from thoughtfully documenting what happened.

This case study is particularly valuable because Datadog candidly discusses both the successes and limitations of their approach, providing realistic insights into the complexities of deploying LLMs in production for knowledge work that requires accuracy, nuance, and human judgment. The project demonstrates sophisticated LLMOps practices around prompt engineering, model selection, evaluation, privacy protection, and user experience design.

## Production Context and Use Case

The postmortem generation feature targets incident responders and site reliability engineers who need to document incidents comprehensively. Unlike creative writing applications where minor inaccuracies might be acceptable, incident postmortems require factual precision since they represent crucial organizational learning and may be reviewed by stakeholders across the company or even shared with customers.

The system processes two types of input data: structured metadata from Datadog's Incident Management application (including alerts, incident severity levels, customer impact fields, timestamps, and shared graphs) and unstructured conversational data from related Slack channels where responders discuss the incident in real-time. This combination provides both the formal incident tracking information and the organic problem-solving discussions that reveal the actual investigative process.

## Technical Architecture and Model Selection

Datadog employed an ensemble approach using multiple LLM models rather than relying on a single model throughout. This architectural decision reflects a sophisticated understanding of the cost-quality-speed tradeoffs inherent in different LLM offerings. They primarily experimented with GPT-3.5 and GPT-4, which exhibited performance differences of up to 50x in terms of cost and speed.

The hybrid model approach allowed them to assign simpler postmortem sections to less expensive models (like GPT-3.5 Turbo with its 16,385-token context window) while reserving more complex sections requiring deeper reasoning for GPT-4 (which initially offered 8,192 tokens but later expanded to 128,000 tokens, with GPT-4 Turbo providing a 4,096-token output limit). This strategy optimized overall system economics without sacrificing quality where it mattered most.

They also experimented with various model parameters, particularly lowering the temperature setting to reduce non-determinism and adjusting the frequency penalty to minimize verbatim repetition. These parameter tuning efforts were critical for addressing the inherent unpredictability of LLM outputs in a production context where consistency matters.

## Prompt Engineering and Instruction Design

Perhaps the most resource-intensive aspect of the project was prompt engineering. Datadog invested over 100 hours iterating on the structure and instructions for individual postmortem sections. This is a crucial insight for organizations considering similar LLM deployments: the engineering effort required to create reliable, production-quality prompts is substantial and requires skills that blend software engineering, product management, data science, and technical writing.

The team developed a multi-step instruction approach, breaking the postmortem generation task into discrete sections that could be processed in parallel. Each section had specialized model configurations and instructions optimized for that particular content type. For instance, sections requiring factual recall of specific events (like timeline reconstruction) might use different instructions and model settings than sections requiring analytical synthesis (like root cause analysis).

This parallelization strategy reduced generation time from over 12 minutes to under one minute, a critical improvement for user experience. However, it introduced a new challenge: the concurrently generated sections sometimes contained overlapping or duplicate information. To address this, they implemented additional LLM queries specifically for refinement—removing redundant statements, converting free text to structured bullet points, and generally improving coherence across sections.

The prompt engineering process involved creating detailed system instructions that told the LLM which information sources to prioritize based on context. The team learned to explicitly guide the model to distinguish between outdated earlier statements in Slack discussions and more recent, corrected information. For example, an early statement that "the incident affected all regions" might later be superseded by "only customers connected to US West experienced data loss," and the LLM needed instruction design sophisticated enough to recognize and privilege the more recent, accurate information.

## Data Engineering and Privacy Controls

A custom API formed the foundation of the data pipeline, extracting required information from Datadog's incident management product and Slack, structuring it for LLM consumption, and implementing crucial privacy safeguards. This ingestion layer was designed to enable rapid experimentation with different datasets, incident types, and model architectures.

Privacy protection was implemented through programmatic secret scanning and filtering mechanisms. Before any data reached the LLM, the system identified suspected secrets (API keys, passwords, tokens, etc.) and replaced them with placeholders. After the AI-generated content was retrieved, these placeholders were filled back in with the actual sensitive content. This approach ensured that confidential information never left the organization's control while still allowing the LLM to process the incident narrative coherently.

The team also experimented with enriching the incident context by incorporating internal documentation from sources like Confluence, adding descriptions of systems and services that provided valuable context. This supplementary information helped the LLM generate more accurate and comprehensive drafts without requiring the human author to manually locate and reference internal resources.

## Evaluation Methodology and Quality Assessment

Datadog implemented a multi-faceted evaluation approach combining both qualitative and quantitative methods. For qualitative assessment, they conducted surveys with authors of previous postmortems, showing them AI-generated drafts for the same incidents their human-written versions had covered. The evaluation criteria included:

- **Accuracy**: Whether the information was factually correct
- **Conciseness**: Absence of unnecessary details or repetition
- **Organization and coherence**: Logical arrangement consistent with the template and good content flow
- **Coverage**: Inclusion of all key events throughout the incident
- **Objectivity**: Absence of bias, personal opinions, blaming, or subjective interpretations

This qualitative feedback proved invaluable for iterating on templates and instructions. They compared performance across template versions and combined the strongest-performing instructions from each section into the final production version. The case study includes an example showing average evaluation scores improving across postmortem draft versions.

The qualitative comparisons revealed interesting patterns about LLM strengths and weaknesses. LLM-generated drafts excelled at recalling exact events backed by concrete resources like Datadog logs, providing accurate timelines and factual reconstructions. However, human-written postmortems outperformed in areas requiring deeper contextual understanding of technical infrastructure and in formulating thoughtful next steps to prevent recurrence—both of which require organizational and architectural knowledge beyond the immediate incident data.

For quantitative evaluation, they experimented with ROUGE and BLEU metrics, commonly used in natural language generation tasks to measure similarity between machine-generated and reference texts through n-gram overlap. However, these metrics provided limited value in this context. High similarity scores didn't necessarily correlate with factual accuracy or completeness, and the team recognized a fundamental evaluation challenge: uncertainty about whether a given human-authored postmortem was actually the gold standard for accuracy. The metrics couldn't account for context, relationships, and meaning that might be present in human postmortems but expressed differently.

This evaluation challenge highlights a broader LLMOps insight: traditional NLP metrics designed for tasks like machine translation may not transfer well to knowledge work applications where there isn't a single "correct" output and where the process of creation has intrinsic value beyond the artifact produced.

## Hallucination Mitigation and Factual Grounding

Ensuring factual accuracy was critical since postmortems document organizational learning and must be trustworthy. The team implemented several strategies to limit hallucinations:

- **Structured data prioritization**: By integrating structured incident metadata from Datadog with unstructured Slack discussions, they could instruct the LLM to anchor its outputs in verified facts
- **Temperature reduction**: Lowering the model temperature parameter reduced randomness and creative interpolation that could lead to hallucinations
- **Citation backing**: Important insights were backed by citations to specific Slack messages, allowing users to verify AI-generated statements against source material
- **Incremental disclosure**: Rather than generating the entire postmortem at once, the system produced content section-by-section, providing opportunities for human review and correction at each stage

Despite these safeguards, the team acknowledged that LLMs sometimes produced overly general statements that didn't accurately reflect investigative progress, particularly when they failed to recognize temporal relationships in Slack conversations. This limitation led them to conclude that the first implementation was most effective for mid-to-lower severity incidents (SEV5 to SEV2) rather than the highest-impact events where precision and depth of analysis are most critical.

## User Experience and Human-in-the-Loop Design

A sophisticated understanding of the user experience pervades this implementation. The team recognized that the goal wasn't to automate postmortem writing entirely but to assist authors while preserving their agency and the learning process inherent in documentation. Several UX decisions reflect this philosophy:

- **Clear labeling**: AI-generated drafts were explicitly marked as such with disclaimers, examples, and instructions
- **Visual differentiation**: AI-generated text was visually distinguished from human-written content so authors could easily identify machine contributions
- **Template customization**: Users could customize the postmortem template with granular control, including editing the instructions provided to the LLM for each section
- **Transparency in instructions**: The main prompts used by the AI were displayed in clear text within the template, allowing users to understand how the content was generated and adjust it for future incidents
- **Incremental generation**: Content was produced step-by-step rather than all at once, positioning the AI as a collaborative assistant rather than an autonomous author

The team also implemented a feedback mechanism allowing users to flag issues like content being "too long," "too short," or "inaccurate." This feedback loop served immediate quality purposes and could potentially be transformed into an automated, continuous training cycle for the underlying models.

## Operational Lessons and Limitations

Datadog candidly acknowledges several limitations and lessons learned. They found that the LLM sometimes over-indexed on earlier statements in Slack threads without recognizing they had been superseded by later corrections. The model also struggled when it lacked infrastructure context—understanding the relationships between services, architectural dependencies, and systemic patterns that would inform root cause analysis and prevention recommendations.

The team describes engineering LLM instructions for static production use cases as "a new sub-function of software engineering" requiring many iterations to align outputs with user expectations. The fundamental challenge was maximizing time savings and building trust while ensuring the essential learning process of writing wasn't circumvented.

Their experimentation framework proved crucial: the custom API that extracted data, structured it for experimentation, and enabled rapid iteration with different parameters, model architectures, and input settings accelerated the development cycle significantly. Having a parallel project generating LLM-based incident summaries for Slack channels provided a testing ground for rapid iterations that fed back into the postmortem work.

## Future Directions

Looking ahead, Datadog plans to explore additional customization options, real-time assistance while postmortems are being edited, and expanded data sources. They specifically anticipate major improvements from giving the LLM access to more infrastructure information through internal wikis, RFCs, and system information, particularly in conjunction with Datadog's broader Bits AI capabilities.

They're also considering leveraging LLMs' text transformation capabilities to generate alternative versions of postmortems for different audiences—custom versions for individual clients or public-facing postmortems—taking advantage of their developed methods for filtering confidential information.

## Broader LLMOps Implications

This case study illustrates several broader principles for production LLM deployment. First, successful implementation requires substantial investment in prompt engineering and instruction design—often more than organizations anticipate. Second, evaluation of LLM outputs for knowledge work is nuanced and may not be well-served by standard NLP metrics. Third, ensemble approaches using different models for different subtasks can optimize the cost-quality-speed tradeoff. Fourth, privacy and security require proactive architectural decisions, not just policy. Finally, and perhaps most importantly, the user experience must preserve human agency and the intrinsic value of the process, not just optimize for the final artifact.

Datadog's approach demonstrates mature LLMOps practices: systematic experimentation, multi-dimensional evaluation, architectural flexibility, strong privacy controls, and most notably, a nuanced understanding that AI assistance should augment human capabilities while respecting the cognitive and organizational value of human work processes.
