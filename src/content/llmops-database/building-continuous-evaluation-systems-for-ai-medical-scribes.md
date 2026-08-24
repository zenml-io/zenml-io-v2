---
title: "Building Continuous Evaluation Systems for AI Medical Scribes"
slug: "building-continuous-evaluation-systems-for-ai-medical-scribes"
draft: false
llmopsTags:
  - "healthcare"
  - "high-stakes-application"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "error-handling"
  - "evals"
industryTags: "healthcare"
company: "Composo"
summary: "Composo addresses critical failures in AI-powered ambient medical scribes that were causing serious errors in approximately 1 in 20 clinical notes in production, including dangerous omissions like missed symptoms of giant cell arteritis. The company developed a continuous evaluation loop consisting of three phases: discovering failure modes from real production outputs, capturing expert clinician judgments on those failures, and calibrating each output against contextually relevant past cases and corrections. This approach, which retrieves case-specific context rather than relying on static rubrics or model retraining, demonstrated significantly better error detection compared to traditional evaluation systems using frontier models with predefined rubrics."
link: "https://www.youtube.com/watch?v=yqF6XhzbWBk"
year: 2026
seo:
  title: "Composo: Building Continuous Evaluation Systems for AI Medical Scribes - ZenML LLMOps Database"
  description: "Composo addresses critical failures in AI-powered ambient medical scribes that were causing serious errors in approximately 1 in 20 clinical notes in production, including dangerous omissions like missed symptoms of giant cell arteritis. The company developed a continuous evaluation loop consisting of three phases: discovering failure modes from real production outputs, capturing expert clinician judgments on those failures, and calibrating each output against contextually relevant past cases and corrections. This approach, which retrieves case-specific context rather than relying on static rubrics or model retraining, demonstrated significantly better error detection compared to traditional evaluation systems using frontier models with predefined rubrics."
  canonical: "https://www.zenml.io/llmops-database/building-continuous-evaluation-systems-for-ai-medical-scribes"
  ogTitle: "Composo: Building Continuous Evaluation Systems for AI Medical Scribes - ZenML LLMOps Database"
  ogDescription: "Composo addresses critical failures in AI-powered ambient medical scribes that were causing serious errors in approximately 1 in 20 clinical notes in production, including dangerous omissions like missed symptoms of giant cell arteritis. The company developed a continuous evaluation loop consisting of three phases: discovering failure modes from real production outputs, capturing expert clinician judgments on those failures, and calibrating each output against contextually relevant past cases and corrections. This approach, which retrieves case-specific context rather than relying on static rubrics or model retraining, demonstrated significantly better error detection compared to traditional evaluation systems using frontier models with predefined rubrics."
notion:
  pageId: "3c6f8dff-2538-800e-b47d-c3eba5309319"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-24T08:58:00.000Z"
  lastEditedTime: "2026-08-24T08:58:00.000Z"
  publishedAt: "2026-08-24T09:18:03Z"
---

## Overview

Composo is building AI evaluation systems for high-stakes domains, with a particular focus on healthcare. The speaker, Seb, is a medical doctor who now works on developing robust evaluation frameworks for AI applications where errors can have life-threatening consequences. The presentation focuses on the deployment of ambient AI scribes in clinical settings, which automatically generate medical notes from patient consultations. These systems are already deployed in approximately one-third of US medical practices, with physician AI use having doubled in the previous year.

The core problem Composo addresses is the prevalence of subtle but dangerous errors in AI-generated clinical notes that appear superficially correct but contain critical omissions or misrepresentations. In the largest real-world study of AI-generated medical notes, approximately 1 in 20 notes contained errors serious enough to cause significant harm to patients. When broadening the scope to all errors, nearly 1 in 5 had important omissions and more than 1 in 10 contained hallucinations. These systems operate largely without adverse event reporting, meaning errors persist undetected in patient records rather than being flagged as incidents.

## The Production Environment and Failure Analysis

The presentation analyzed real production outputs from three leading ambient medical scribe products. The analysis involved generating numerous notes and systematically categorizing every failure discovered. The failures were mapped along two dimensions: severity (from low to high stakes) and detectability (whether strong automated checks could catch them). The critical insight was that the vast majority of errors fell into the bottom-right quadrant: high-stakes errors that automated systems missed.

The ambient scribe systems operate in two phases: transcription of the consultation audio, then generation of the structured clinical note. While transcription errors do occur (such as sound-alike medications like Humalog being transcribed as Humulin, or hyperthyroidism becoming hypothyroidism), most errors occur in the generation phase even when transcription is perfect. The three primary categories of generation errors are additions (content never discussed), changes (modifications to what was said), and omissions (important content dropped from the note).

## The Nature of Contextual Judgment

The fundamental challenge in evaluating these systems is that determining what matters requires domain-specific judgment that cannot be fully codified. Composo identifies three critical properties of this judgment: it is tacit (experts possess it but cannot fully articulate it), contextual (the same detail is critical in one note but irrelevant in another), and moving (models change, guidelines evolve, experts disagree, and standards vary between institutions).

A compelling example illustrates the contextual nature: two patients both present with blood in their urine, and both notes drop a line about recent travel. One patient had been to France, the other to Lake Malawi. The omission in the France case is noise, while the Lake Malawi omission is diagnostic (freshwater exposure in sub-Saharan Africa suggests schistosomiasis). The same structural error has completely different clinical implications depending on context that cannot be specified in advance.

## Traditional Evaluation Approaches and Their Limitations

Most advanced teams employ sophisticated evaluation systems consisting of gold-standard expert review (which works offline but cannot scale to every production note) and automated judges. The best versions of these automated systems combine the transcript, generated note, and context with detailed rubrics for faithfulness, pass/fail examples, potentially auto-optimized rubrics using techniques like DSPy, and deterministic NLP to count differing medical concepts between transcript and note.

Despite this sophisticated engineering, the speaker demonstrated that such systems still allow serious errors through. When testing production notes through a state-of-the-art judge system, it scored most notes as fine and signed off on them, yet approximately 1 in 5 of those clean passes contained serious errors, particularly omissions. The system was neither unintelligent (using frontier models with serious engineering) nor blind (capable of reading entire encounters), but it lacked the ability to determine what counted as important in each specific context.

## The Verifier's Challenge

The presentation draws on the concept of the asymmetry of verification: verification should be easier than generation, which is why AI has advanced rapidly in domains like mathematics and code where compilers and unit tests provide free verification. However, for clinical notes asking whether they are safe and complete, no such automatic verifier exists. While spot-the-difference between transcription and note is straightforward, determining which differences matter is actually harder than generating a plausibly good note in the first place, because the standard of good was never written down anywhere accessible to the judge.

Pre-specified rubrics can only capture the taste that can be explicitly written down, but the taste that matters most is the tacit knowledge that cannot be articulated. This is why even carefully engineered evaluation systems create a second silent failure mode: a judge that confidently approves dangerous outputs rather than providing a genuine safety net.

## The Composo Solution: Continuous Discovery and Calibration

Rather than attempting to specify evaluation criteria upfront or baking them into model weights through fine-tuning, Composo keeps the evaluation standard as the examples themselves: past judgments, expert corrections, and reference materials. For each output being evaluated, the system retrieves the most relevant examples into the judge's context. This approach enables live updates (new examples are available on the next call), explainability (you can point to exactly what influenced the score), and adaptability (the standard evolves without retraining).

The system operates as a repeating three-step loop:

**Discovery:** Rather than writing rubrics in advance, the system is deployed in production and real outputs are analyzed. Failures are clustered and categorized, surfacing the actual failure modes from data rather than anticipated ones. This creates a failure mode ontology discovered from production rather than guessed during design. This is essential because the ways real systems fail are effectively unbounded, and synthetic test cases only cover failures already imagined. The most damaging failures are often those not anticipated.

**Capture:** Real outputs are reviewed by domain experts (in this case, clinicians) in focused sessions. These need not be month-long labeling projects; even a few hours of expert review provides valuable signal. Experts leave not just scores but reasoning and corrections. Over time, this builds a comprehensive record of how experts actually judge outputs in practice, capturing the tacit knowledge that cannot be written into rubrics.

**Calibrate:** For each output being judged, the system assembles a case-specific standard on the fly through context engineering. It retrieves similar outputs previously judged and their scores, applicable expert corrections, and relevant reference documents and guidelines. This is not a single pre-specified rubric applied uniformly, nor a model retrained weekly, but rather a full case-specific standard assembled for each individual output. Every output judged and every correction captured sharpens subsequent judgments, and when new failure modes surface through discovery, they flow back into the system immediately.

## Technical Implementation and Results

The example of the headache case that was actually a possible blindness emergency illustrates the retrieval approach. The system would pull in the nearest cases experts have judged with similar characteristics (such as red flags filed as routine), applicable corrections (like new headache over 50 requiring red flag checks), and relevant clinical criteria and guidelines. With this context, a capable model can identify the dropped red flag; the information was never intrinsically hard to catch, the model simply lacked knowledge of what mattered.

Testing on the same dataset of generated notes across three judging systems demonstrated clear performance differences. An off-the-shelf judge with a rubric and frontier model performed better than random but missed most of what mattered. A sophisticated system with deeper rubrics and potentially deterministic checks performed better but still missed significant errors. The judge running the discovery-capture-calibrate loop performed substantially better on the same notes. The improvement came not from more compute or better prompts, but from showing the judge what actually mattered based on expert judgments and contextually relevant cases.

## Generalization Beyond Healthcare

While the presentation focuses on medical scribes, the speaker emphasizes that the same principles apply to any high-stakes AI application. Contract review that misses clauses changing deal terms, support agents promising unavailable refunds, or any application where being confidently wrong carries costs face the same challenge: they are evaluated by judges with no taste for what matters in that specific domain.

## Practical Starting Point

The most accessible entry point for organizations is having domain experts leave free-form comments on real production outputs. This raw material forms the foundation for everything else in the system. Rather than attempting to write down all evaluation criteria in advance (which is impossible for tacit knowledge), organizations should capture judgment case by case and evolve it over time.

## The Core Philosophy

The fundamental insight is that evaluation cannot be built once and frozen. The standard being checked against does not exist on paper; it must be discovered from real outputs, captured from the experts who hold tacit knowledge, and kept alive as it evolves. Evaluation is not something you have, but something you do continuously. This represents a shift from specification-driven evaluation (attempting to write perfect rubrics) to example-driven evaluation (learning from how experts judge real cases).

The approach explicitly avoids both prompt engineering alone (which cannot capture tacit knowledge) and fine-tuning (which goes stale, lacks explainability, and requires retraining when standards shift). Instead, it treats evaluation as an ongoing process of learning from experts through examples, retrieving relevant context for each judgment, and continuously updating the system as new failure modes emerge and standards evolve. This continuous learning approach is particularly well-suited to the moving target of domain-specific quality standards in production LLM applications.
