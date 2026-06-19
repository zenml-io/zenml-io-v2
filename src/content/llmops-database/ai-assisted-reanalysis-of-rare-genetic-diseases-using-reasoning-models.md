---
title: "AI-Assisted Reanalysis of Rare Genetic Diseases Using Reasoning Models"
slug: "ai-assisted-reanalysis-of-rare-genetic-diseases-using-reasoning-models"
draft: false
llmopsTags:
  - "healthcare"
  - "high-stakes-application"
  - "prompt-engineering"
  - "few-shot"
  - "human-in-the-loop"
  - "documentation"
  - "openai"
industryTags: "healthcare"
company: "OpenAI"
summary: "Boston Children's Hospital's Manton Center for Orphan Disease Research, Harvard University, and OpenAI addressed the challenge of diagnosing rare genetic diseases in children, where roughly half of patients with genomic sequencing remain undiagnosed. They used the OpenAI o3 Deep Research reasoning model to reanalyze 376 previously unsolved cases by processing de-identified clinical and genomic information, surfacing evidence-linked candidate explanations for expert review. Following human expert adjudication, additional testing, and clinical confirmation, physicians established diagnoses in 18 cases (4.8% additional yield), demonstrating that AI-assisted workflows can help specialists generate leads when revisiting difficult cases as scientific knowledge evolves."
link: "https://openai.com/index/diagnose-rare-childhood-diseases/"
year: 2026
seo:
  title: "OpenAI: AI-Assisted Reanalysis of Rare Genetic Diseases Using Reasoning Models - ZenML LLMOps Database"
  description: "Boston Children's Hospital's Manton Center for Orphan Disease Research, Harvard University, and OpenAI addressed the challenge of diagnosing rare genetic diseases in children, where roughly half of patients with genomic sequencing remain undiagnosed. They used the OpenAI o3 Deep Research reasoning model to reanalyze 376 previously unsolved cases by processing de-identified clinical and genomic information, surfacing evidence-linked candidate explanations for expert review. Following human expert adjudication, additional testing, and clinical confirmation, physicians established diagnoses in 18 cases (4.8% additional yield), demonstrating that AI-assisted workflows can help specialists generate leads when revisiting difficult cases as scientific knowledge evolves."
  canonical: "https://www.zenml.io/llmops-database/ai-assisted-reanalysis-of-rare-genetic-diseases-using-reasoning-models"
  ogTitle: "OpenAI: AI-Assisted Reanalysis of Rare Genetic Diseases Using Reasoning Models - ZenML LLMOps Database"
  ogDescription: "Boston Children's Hospital's Manton Center for Orphan Disease Research, Harvard University, and OpenAI addressed the challenge of diagnosing rare genetic diseases in children, where roughly half of patients with genomic sequencing remain undiagnosed. They used the OpenAI o3 Deep Research reasoning model to reanalyze 376 previously unsolved cases by processing de-identified clinical and genomic information, surfacing evidence-linked candidate explanations for expert review. Following human expert adjudication, additional testing, and clinical confirmation, physicians established diagnoses in 18 cases (4.8% additional yield), demonstrating that AI-assisted workflows can help specialists generate leads when revisiting difficult cases as scientific knowledge evolves."
notion:
  pageId: "383f8dff-2538-806f-94d8-d8f66ddb46d9"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-18T15:43:00.000Z"
  lastEditedTime: "2026-06-18T15:43:00.000Z"
  publishedAt: "2026-06-19T09:22:06Z"
---

## Overview and Context

This case study, published in NEJM AI on June 18, 2026, describes a research collaboration between Boston Children's Hospital's Manton Center for Orphan Disease Research, Harvard University, and OpenAI to apply the OpenAI o3 Deep Research reasoning model to the clinical challenge of diagnosing rare genetic diseases in children. The study represents a sophisticated example of LLMs being used in a high-stakes healthcare research environment, though it's important to note that this was a research study and not a production clinical deployment. The text explicitly states this is "not evidence that patients, clinicians, or customers should use OpenAI models to diagnose disease or make medical decisions."

The fundamental problem being addressed is that even with genomic sequencing, approximately half of patients with rare diseases never receive a clear genetic diagnosis after extensive testing and specialist review. The challenge is compounded by the fact that medical data may contain clues distributed across thousands to millions of possible genetic variants, fragmented clinical records, and rapidly changing scientific literature. Additionally, a child's genome may be sequenced before relevant genes or variants have been linked to disease in the scientific literature, meaning that previously inconclusive cases can become solvable as knowledge advances.

## LLMOps Architecture and Workflow Design

The researchers designed what they describe as an "explanation-first reasoning layer" on top of existing genomic pipelines. This is a notable architectural choice from an LLMOps perspective—rather than attempting to replace existing clinical infrastructure, the model acts as an augmentation layer that produces human-reviewable hypotheses. The workflow was explicitly designed so that the model never makes a diagnosis or clinical decision; instead, it produces evidence-linked hypotheses for specialists to review and investigate through additional testing and clinical confirmation.

For each case, the team assembled a structured de-identified data packet containing several components: standardized Human Phenotype Ontology (HPO) terms describing the patient's clinical presentation, occasional clinician notes and descriptive clinical diagnoses, metadata such as age and gender, and a filtered variant table. The variant table captured each variant's rarity, predicted effect on encoded proteins, ClinVar classification, and signal quality across available family members. Most cases included data from the child and both biological parents, providing trio sequencing information.

The prompt design asked the model to propose the most plausible molecular explanation and to "show its work"—essentially requiring the model to justify its reasoning by connecting clinical features, inheritance patterns, variant evidence, and scientific literature into a coherent explanation. This is a critical LLMOps practice for high-stakes applications: requiring interpretable outputs that can be scrutinized by domain experts rather than accepting black-box predictions.

## Evaluation and Validation Strategy

Before deploying the workflow on unsolved cases, the team followed a rigorous evaluation strategy using cases with established diagnoses as a validation set. This is excellent LLMOps practice—testing on known-good cases before applying to production scenarios. The evaluation included three separate cohorts:

In a set of 51 diverse rare condition cases with established diagnoses, the workflow recovered the correct gene and variant in duplicate runs for 48 cases. In 57 neuromuscular cases, it returned the correct diagnosis in duplicate runs for 45 cases. In a 15-case long-read genome set, it named the correct gene in every case and identified both disease-causing alleles in 12 cases. These evaluations served dual purposes: refining the prompt design and establishing baseline performance metrics that helped identify where expert review remained essential.

The researchers also examined the model's self-reported confidence scores and found they correlated with diagnostic accuracy in the validation sets. The mean minimum confidence score was 85.6 for consistently correct calls versus 42.1 for incorrect or unknown calls. Importantly, the team notes these were "not calibrated probabilities" and were never used as substitutes for evidence or clinical adjudication. However, they proved useful for prioritizing expert reviewer attention—a pragmatic LLMOps approach to managing human review workload. The lack of proper calibration is noted as a limitation, and the team acknowledges that future work should include "calibrated uncertainty" for reproducibility and safety.

## Production Results and Performance

The validated workflow was then applied to 376 previously unsolved cases across four cohorts: neurodevelopmental conditions (100 cases), rare neuromuscular disease (61 cases), sudden unexpected death in pediatrics (200 cases), and early psychosis (15 cases). These were notably difficult cases—many had already been examined by multiple commercial or institutional pipelines and discussed by multidisciplinary teams.

After the model surfaced candidates and experts completed review and clinical confirmation, physicians established diagnoses in 18 cases, yielding an additional 4.8% diagnostic rate. The yield varied by cohort: 10.0% for neurodevelopmental, 6.6% for neuromuscular disease, 1.0% for sudden unexpected death, and 13.3% for early psychosis (though this last percentage comes from a small sample with wide confidence intervals). The authors appropriately contextualize this modest yield by noting that it represents gains in a heavily pre-screened population where previous expert reviews had failed, and that similar reanalysis studies typically report single-digit gains in such populations.

Of particular interest from an LLMOps evaluation perspective is that 7 of the 18 diagnoses were "rediscoveries"—diagnoses that had been established outside the local research workflow but were absent from the record the team reviewed. Several of these variants were already listed as pathogenic or likely pathogenic in public databases. While this might seem like a failure, it actually highlights an important operational challenge: the difficulty of synthesizing information across fragmented data sources. This suggests that part of the model's value lies not just in scientific reasoning but in its ability to integrate disparate information sources.

## Advanced Capabilities Demonstrated

The study revealed several sophisticated capabilities that extend beyond simple pattern matching. In one early-psychosis case, the model inferred a structural genomic event that wasn't explicitly listed in the input data. It connected a run of low-quality sequencing calls on chromosome 22 with the child's cardiac, immune, neurodevelopmental, and psychiatric features, then hypothesized a 22q11.2 deletion associated with DiGeorge syndrome. This hypothesized variant was subsequently confirmed with follow-up genome sequencing. This demonstrates the model's ability to reason about data quality patterns and their biological implications—a form of meta-reasoning about the evidence itself.

Although the prompt design asked for a single monogenic cause, the model sometimes surfaced two genes when that better explained a complex presentation. Variants in LAMA2 and FOXP1 together helped account for muscle and neurodevelopmental features in one case, while another had a digenic explanation involving TTN and SRPK3. This adaptive behavior—deviating from prompt instructions when the data warrants it—is both powerful and concerning from an LLMOps perspective, suggesting the need for careful prompt design and output validation.

Perhaps most intriguing from a scientific standpoint was the model's identification of a possible novel mechanistic explanation for vitiligo. In one neurodevelopmental case, it highlighted an 11-amino-acid deletion in S1PR1 in a person with vitiligo and integrated evidence suggesting the deletion could alter receptor structure and signaling in ways affecting pigment production and immune cell persistence. While this proposed S1PR1-vitiligo relationship requires experimental validation, it demonstrates the model's capacity to synthesize evidence from structural biology, immunology, and clinical genetics into testable hypotheses—moving beyond diagnosis to hypothesis generation for scientific discovery.

## Human-in-the-Loop Design and Clinical Governance

The study exemplifies rigorous human-in-the-loop design appropriate for high-stakes healthcare applications. Researchers reviewed outputs using the same ACMG/AMP framework that clinical laboratories use to classify genetic variants. At least two team members reviewed each candidate, disagreements were resolved by consensus, and a model output was never treated as a diagnosis. A finding counted as a diagnosis only after qualified experts reviewed the evidence, the variant was classified as pathogenic or likely pathogenic, a CLIA-certified laboratory confirmed it, and the clinical team returned the result to the family.

This multi-stage validation process represents best practices in medical AI deployment, though the authors acknowledge they did not measure several important operational metrics: time saved, cost, clinician effort, false-positive workload, or changes in care. These unmeasured factors are critical for understanding real-world deployment feasibility. The false-positive workload in particular could be significant—for every true diagnosis surfaced, how many dead-end leads did clinicians need to investigate?

## Privacy and Data Handling

The study used de-identified information with no protected health information utilized or transmitted outside approved environments. The authors explicitly note that broader clinical deployment would require attention to privacy, security, auditability, and local regulation. The use of standardized HPO terms rather than free-text clinical notes represents a privacy-conscious design choice, though it may also limit the richness of clinical information available to the model.

## Limitations and Balanced Assessment

The authors provide an appropriately cautious interpretation of their results, noting multiple limitations. The study was retrospective and cohorts were heterogeneous, limiting the generalizability of findings. Reviewers were not blinded to model confidence scores, introducing potential bias. The researchers did not systematically evaluate other forms of genetic variation such as structural variants (beyond the serendipitous DiGeorge case), repeat expansions, deep-intronic changes, or mosaicism—all of which are clinically relevant.

Critically, the text emphasizes that "large language models can misread context or produce plausible explanations that fail upon closer inspection," which is why every result passed through human adjudication and clinical confirmation. The model's role was to widen the search and focus subsequent human-led analysis, not to make decisions about what information should be returned to families.

The authors also note that this research "does not describe or endorse an intended customer use of OpenAI o3 Deep Research, ChatGPT, or any other OpenAI product for diagnosis." This disclaimer is important context—the study represents controlled research use with extensive expert oversight, not a deployment pattern that should be directly replicated in clinical practice without proper validation and regulatory approval.

## Future Directions and Broader Implications

The study points toward several important future research directions from an LLMOps perspective. The authors call for prospective, multi-center studies comparing LLM-assisted reanalysis with standard practice on diagnostic yield, time to candidate, clinician effort, false-positive burden, cost, and effects on care. They emphasize the need for versioned prompts, reference checks, audit logs, and calibrated uncertainty for reproducibility and safety—all critical LLMOps capabilities for medical applications.

The text mentions that the study used o3 Deep Research, while newer general-purpose models and purpose-built systems like GPT-Rosalind (designed for deeper life-sciences work including variant effects on protein structure and function) were not tested and will require their own evaluations and access controls. This acknowledgment of the need for specialized evaluation of different model capabilities is good practice.

Looking forward, the Manton Center will lead the next stage of work through a grant from the OpenAI Foundation, aiming to develop a "platform-agnostic, low-cost genetics AI copilot" that helps clinical teams analyze rare disease cases more quickly and consistently. The platform-agnostic goal is notable—suggesting an intention to avoid vendor lock-in and potentially create a more generalizable framework that could work with multiple underlying models.

## Critical Assessment

While this case study demonstrates impressive capabilities, several factors warrant critical consideration. First, the 4.8% yield, while meaningful in this context, represents a relatively modest improvement, and 7 of 18 diagnoses were rediscoveries rather than truly new findings. This suggests that better data integration and information retrieval systems might achieve some of these gains without requiring sophisticated reasoning models.

Second, the study provides no quantification of false positives—how many plausible-sounding but ultimately incorrect hypotheses did the model generate that consumed expert time to investigate and rule out? This false-positive burden is a critical operational consideration for scalability.

Third, the lack of cost analysis is significant. The study doesn't report on computational costs, expert review time requirements, or overall cost-effectiveness compared to alternative approaches like periodic manual reanalysis or improved database integration.

Fourth, while the model's ability to infer the DiGeorge deletion from data quality patterns is impressive, it also raises questions about what patterns the model might miss or misinterpret. The opaque nature of how the model reasons about such subtle signals makes it difficult to systematically validate this capability.

Finally, the study represents a best-case scenario with extensive expert oversight, careful prompt engineering, and multiple validation stages. The transferability of these results to resource-constrained clinical settings with less expert availability is uncertain.

## Conclusion

This case study represents a sophisticated example of LLMs being applied to a high-stakes healthcare research problem with appropriate guardrails, validation strategies, and human oversight. The workflow design—treating the model as an explanation-first reasoning layer rather than a decision-maker—is exemplary for medical applications. The evaluation strategy using known-positive cases before production deployment, the multi-stage expert review process, and the transparent acknowledgment of limitations all represent LLMOps best practices.

However, the modest yields, unknown false-positive burden, lack of cost analysis, and restrictions to retrospective research use mean this should be viewed as an early proof-of-concept rather than evidence of production-ready clinical deployment. The real value may ultimately lie not in the direct diagnostic yield but in the model's ability to generate novel scientific hypotheses and integrate fragmented information sources—capabilities that extend beyond simple classification to support scientific discovery.
