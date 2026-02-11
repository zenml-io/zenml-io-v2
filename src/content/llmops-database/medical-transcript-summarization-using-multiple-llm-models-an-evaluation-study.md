---
title: "Medical Transcript Summarization Using Multiple LLM Models: An Evaluation Study"
slug: "medical-transcript-summarization-using-multiple-llm-models-an-evaluation-study"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6778084db59692d07ae868b6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:51:24.186Z"
  createdOn: "2025-01-03T15:54:53.660Z"
llmopsTags:
  - "healthcare"
  - "document-processing"
  - "summarization"
  - "prompt-engineering"
  - "fine-tuning"
  - "model-optimization"
  - "human-in-the-loop"
  - "wandb"
  - "anthropic"
  - "openai"
  - "microsoft-azure"
industryTags: "healthcare"
company: "Oracle"
summary: "A comparative study evaluating different LLM models (Claude, GPT-4, LLaMA, and Pi 3.1) for medical transcript summarization aimed at reducing administrative burden in healthcare. The study processed over 5,000 medical transcripts, comparing model performance using ROUGE scores and cosine similarity metrics. GPT-4 emerged as the top performer, followed by Pi 3.1, with results showing potential to reduce care coordinator preparation time by over 50%."
link: "https://www.youtube.com/watch?v=v1jVFNp9Gu0"
seo:
  title: "Oracle: Medical Transcript Summarization Using Multiple LLM Models: An Evaluation Study - ZenML LLMOps Database"
  description: "A comparative study evaluating different LLM models (Claude, GPT-4, LLaMA, and Pi 3.1) for medical transcript summarization aimed at reducing administrative burden in healthcare. The study processed over 5,000 medical transcripts, comparing model performance using ROUGE scores and cosine similarity metrics. GPT-4 emerged as the top performer, followed by Pi 3.1, with results showing potential to reduce care coordinator preparation time by over 50%."
  canonical: "https://www.zenml.io/llmops-database/medical-transcript-summarization-using-multiple-llm-models-an-evaluation-study"
  ogTitle: "Oracle: Medical Transcript Summarization Using Multiple LLM Models: An Evaluation Study - ZenML LLMOps Database"
  ogDescription: "A comparative study evaluating different LLM models (Claude, GPT-4, LLaMA, and Pi 3.1) for medical transcript summarization aimed at reducing administrative burden in healthcare. The study processed over 5,000 medical transcripts, comparing model performance using ROUGE scores and cosine similarity metrics. GPT-4 emerged as the top performer, followed by Pi 3.1, with results showing potential to reduce care coordinator preparation time by over 50%."
---

## Overview

This case study presents research conducted by a senior principal data scientist at Oracle focused on evaluating different large language models for medical transcript summarization. The work addresses a significant operational challenge in healthcare: the administrative burden placed on care coordinators who must review and prepare patient information before check-ins. The research claims potential to reduce preparation time by over 50%, which would allow care coordinators to manage larger caseloads without compromising care quality.

The presenter, Arasu Narayan, brings two decades of industry experience with the last eight years focused specifically on natural language processing, including a PhD dissertation in NLP. This presentation was delivered at the NLP Summit, providing insights into practical LLM evaluation methodologies for production healthcare applications.

## Data Considerations and Privacy Constraints

One of the most significant challenges in healthcare AI is data access due to HIPAA privacy regulations. The research navigated this constraint by utilizing a publicly available dataset from MTsamples.com, a repository of sample medical transcripts. The dataset contains approximately 5,000 transcripts spanning various medical specialties, with structured columns including:

- Description: Brief overview encapsulating each transcript's essence
- Medical Specialty: Classification label for the relevant medical field
- Sample Name: Title or identifier for each transcript entry
- Transcription: The actual medical transcript text content
- Keywords: Key terms extracted providing medical context

This approach of using publicly available sample data rather than real patient data is a common and necessary practice in healthcare AI research, though it does introduce questions about how well models trained or evaluated on synthetic/sample data will generalize to real clinical notes with their inherent messiness and variation.

## Model Selection and Architecture Overview

The research evaluated four different LLM architectures, each with distinct characteristics relevant to production deployment:

**Claude (Anthropic)**: Based on transformer architecture similar to GPT but with optimizations aimed at enhancing interpretability and control. The presenter noted its strong focus on safe and aligned AI behavior, emphasizing transparency in decision-making. Claude was selected as the ground truth baseline for comparison, suggesting it was considered the highest-quality model for this task after manual evaluation of its outputs.

**OpenAI GPT-4**: The latest iteration of OpenAI's autoregressive transformer models, which predict the next word in a sequence to generate coherent text. The presenter noted GPT models' versatility across NLP tasks due to extensive training on diverse datasets leading to strong generalization capabilities.

**Llama 3.1 (Meta)**: Described as using an enhanced transformer model optimized for low-resource languages and efficient training. The model focuses on multilingual capabilities and is noted as being efficient for specialized and domain-specific tasks.

**Phi 3.1 (Microsoft)**: Built on a proprietary architecture enhancing transformers for faster processing and reduced latency. This model emphasizes efficiency and scalability, particularly for large-scale text summarization tasks, and is optimized for real-time applications. Notably, the presenter highlighted that Phi 3.1 is lightweight enough to be deployed on edge devices like iPads, which could be particularly valuable for healthcare settings where clinicians need mobile access.

## Evaluation Methodology

The evaluation framework employed both quantitative and qualitative assessment approaches. For the quantitative evaluation, the primary metrics used were:

**ROUGE Scores**: The research utilized ROUGE-1 (unigram overlap), ROUGE-2 (bigram overlap), and ROUGE-L (longest common subsequence) to measure how well generated summaries retained content from reference summaries. These metrics quantify n-gram overlaps essential for ensuring generated summaries retain critical information from original text.

**Cosine Similarity**: This metric measures the cosine of the angle between two vector representations of the generated versus reference summaries, capturing semantic similarity beyond surface-level word matching. This provides insights into how closely the meanings of summaries align.

A notable methodological choice was using Claude's outputs as the ground truth against which other models were compared. This approach is somewhat unusual since typically human-generated summaries would serve as ground truth. The presenter justified this by stating Claude "performed very well" based on manual evaluation, but this does introduce potential bias and circularity into the evaluation process.

## Quantitative Results

The evaluation across approximately 500+ medical transcripts yielded the following results:

**OpenAI GPT-4**:
- ROUGE-1: 0.821
- ROUGE-2: 0.70
- ROUGE-L: 0.76
- Cosine Similarity: 0.879

**Llama 3.1**:
- Metrics were lower than OpenAI GPT-4
- Described as slightly less effective in maintaining content overlap and semantic alignment

**Phi 3.1**:
- Performed better than Llama 3.1
- Cosine Similarity: 0.819
- Metrics fell just behind GPT-4 but ahead of Llama 3.1

The GPT-4 model consistently led across all metrics, with Phi 3.1 emerging as a strong alternative when deployment constraints (edge devices, latency requirements) are important considerations.

## Prompt Engineering and Output Structure

The research employed structured prompts to extract information from unstructured transcripts. The model outputs were designed to capture comprehensive patient information in a structured format including:

- Patient information and medical specialty
- Current symptoms
- Past medical history
- Family medical history
- Social history
- Allergies
- Current medications (name, dosage, frequency)
- Surgical histories
- Physical examination findings
- Diagnosis reports (blood work, radiology, pathology, urinalysis)
- Assessment and treatment plans
- Follow-up instructions
- Consultation summary

The Claude model provided additional details like immunization records and viral signatures, with more descriptive progress status information, which contributed to its selection as the ground truth baseline.

## Production Deployment Considerations

The presenter highlighted several factors relevant to production deployment of these summarization systems:

**Edge Deployment**: Phi 3.1's lightweight architecture makes it a candidate for deployment on devices like iPads that healthcare workers carry, enabling point-of-care summarization without requiring constant network connectivity.

**Accuracy vs. Conciseness Trade-offs**: While GPT-4 excels in accuracy, it may generate longer summaries that are less concise. Phi 3.1 offers better balance between accuracy and consciousness, making it more suitable when summary length is a critical factor.

**Model Specialization by Content Type**: Different models showed varying effectiveness based on content structure. Llama 3.1 performed less effectively with complex or detailed medical notes, while Phi 3.1 appeared better suited for structured notes like procedural summaries and diagnosis reports. GPT-4 showed strength with narrative-driven notes requiring comprehensive coverage.

## Challenges and Limitations

The research identified several critical challenges that would need to be addressed in production deployments:

**Medical Language Complexity**: Medical language is inherently complex with jargon, specialty terminology, and abbreviations varying across specialties and regions. This poses significant challenges for summarization models that must accurately parse and contextualize text while preserving meaning.

**Retaining Critical Information**: The delicate balance between conciseness and completeness is particularly high-stakes in medical settings. Any omission of key details about diagnoses, treatment plans, or medical histories could have serious clinical consequences.

**Hallucination Risks**: Some models generated information not present in the original context. The presenter specifically noted hallucinations in Llama outputs, such as fabricating doctor names in follow-up instructions. In medical domains where accuracy is paramount, this presents a significant safety concern.

**Context Understanding Limitations**: Models struggled with understanding the broader context of medical notes, sometimes missing crucial nuances or misinterpreting the significance of clinical findings.

## Future Work and Recommendations

The research outlined several directions for future development:

**Fine-tuning on Medical Data**: Leveraging larger and more diverse medical datasets could help models better understand nuances of medical language. This domain-specific fine-tuning is particularly important for production medical applications.

**Domain-Specific Knowledge Integration**: Integrating medical ontologies and structured knowledge bases could enhance model understanding of complex medical concepts and their relationships.

**Human-in-the-Loop Approaches**: Adopting human-in-the-loop methodologies where clinicians validate and guide model outputs was suggested as a potential game-changer for ensuring accuracy and safety. This collaborative approach could help mitigate risks while still achieving efficiency gains.

## Critical Assessment

While the research presents promising results, several aspects warrant careful consideration:

The use of Claude as ground truth rather than human-generated summaries introduces methodological concerns about circular evaluation. The actual ground truth should ideally come from clinician-validated summaries.

The claimed 50% reduction in preparation time is stated as potential but not empirically validated in actual clinical settings. Real-world deployment would need to account for verification time, error correction, and integration with existing workflows.

The dataset from MTsamples.com, while valuable for research, may not represent the full complexity and variability of real clinical notes, potentially leading to optimistic performance estimates.

Despite these caveats, the research provides valuable insights into LLM performance characteristics for medical summarization and offers practical guidance for model selection based on specific deployment requirements and constraints.