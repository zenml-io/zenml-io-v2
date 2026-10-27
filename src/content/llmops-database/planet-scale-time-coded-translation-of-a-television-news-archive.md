---
title: "Planet-Scale Time-Coded Translation of a Television News Archive"
slug: "planet-scale-time-coded-translation-of-a-television-news-archive"
draft: false
llmopsTags:
  - "translation"
  - "speech-recognition"
  - "caption-generation"
  - "unstructured-data"
  - "prompt-engineering"
  - "evals"
  - "cost-optimization"
  - "token-optimization"
  - "google-gcp"
industryTags: "media-entertainment"
company: "GDELT"
summary: "GDELT collaborated with the Internet Archive Television News Archive to translate more than 2.4 million non-English television broadcasts spanning approximately 1.2 million hours, over 150 languages and dialects, and 25 years of programming. Existing original-language transcripts were produced with Google Cloud's Chirp ASR, then translated with Gemini 2.5 Flash Non-Thinking through the enterprise Vertex AI Gemini API. The reported processing cost was $53,866 for 79 billion input and output tokens, compared with an estimated Google Translate cost of more than $760,000. The system also aligned translations to their source broadcasts at two-second resolution and was reported to reduce hallucination to below measurable levels for this narrow task, although the source does not provide independent quality scores, sampling methodology, latency, or operational error rates."
link: "https://blog.gdeltproject.org/a-transformative-new-chapter-translating-the-entire-quarter-century-tv-news-archive-through-gemini-for-just-54k-all-channels-now-translated/"
year: 2026
seo:
  title: "GDELT: Planet-Scale Time-Coded Translation of a Television News Archive - ZenML LLMOps Database"
  description: "GDELT collaborated with the Internet Archive Television News Archive to translate more than 2.4 million non-English television broadcasts spanning approximately 1.2 million hours, over 150 languages and dialects, and 25 years of programming. Existing original-language transcripts were produced with Google Cloud's Chirp ASR, then translated with Gemini 2.5 Flash Non-Thinking through the enterprise Vertex AI Gemini API. The reported processing cost was $53,866 for 79 billion input and output tokens, compared with an estimated Google Translate cost of more than $760,000. The system also aligned translations to their source broadcasts at two-second resolution and was reported to reduce hallucination to below measurable levels for this narrow task, although the source does not provide independent quality scores, sampling methodology, latency, or operational error rates."
  canonical: "https://www.zenml.io/llmops-database/planet-scale-time-coded-translation-of-a-television-news-archive"
  ogTitle: "GDELT: Planet-Scale Time-Coded Translation of a Television News Archive - ZenML LLMOps Database"
  ogDescription: "GDELT collaborated with the Internet Archive Television News Archive to translate more than 2.4 million non-English television broadcasts spanning approximately 1.2 million hours, over 150 languages and dialects, and 25 years of programming. Existing original-language transcripts were produced with Google Cloud's Chirp ASR, then translated with Gemini 2.5 Flash Non-Thinking through the enterprise Vertex AI Gemini API. The reported processing cost was $53,866 for 79 billion input and output tokens, compared with an estimated Google Translate cost of more than $760,000. The system also aligned translations to their source broadcasts at two-second resolution and was reported to reduce hallucination to below measurable levels for this narrow task, although the source does not provide independent quality scores, sampling methodology, latency, or operational error rates."
notion:
  pageId: "3fff8dff-2538-81d8-bc0d-c6a9e037d045"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-20T18:33:00.000Z"
  lastEditedTime: "2026-10-20T18:33:00.000Z"
  publishedAt: "2026-10-22T13:36:01Z"
---

## Overview

GDELT used a production-oriented translation pipeline to make the Internet Archive's Television News Archive accessible across language barriers. The use case was unusually large: more than 2.4 million previously transcribed non-English broadcasts, representing roughly 4.5 billion seconds of airtime, or 1.2 million hours, across more than 150 languages and dialects. The translated material is intended for journalists, researchers, historians, policymakers, and the public, with English captions that can be searched and viewed alongside the original broadcasts.

The reported solution used Gemini 2.5 Flash Non-Thinking through the enterprise Vertex AI Gemini API. According to the source, translating the corpus consumed 79 billion input and output tokens and cost $53,866. The source compares this with an estimated cost of more than $760,000 using Google Translate, but that comparison should be treated as a claim about the particular pricing and implementation assumptions used by GDELT rather than as a universally reproducible benchmark. The announcement also states that no data was used to train or tune a model.

## Problem and Data Pipeline

The starting point was an archive of non-English television broadcasts that had already been transcribed into their original languages using Google Cloud's Chirp automatic speech recognition system. The corpus contains approximately 46 GB of text, 6.8 billion words, and broadcasts from 300 channels in 50 countries on five continents over more than 25 years. The translation step therefore had to operate on existing ASR transcripts rather than on clean, manually edited written documents.

That distinction creates several production challenges. ASR output can contain mistranscriptions, missing punctuation, uncertain segmentation, and phrases that only become interpretable when their timing and surrounding context are considered. Broadcasts may also switch between languages, dialects, or registers. The source specifically says that the Gemini-based system was able to handle highly multilingual and code-switching broadcasts as well as “sounds like” ASR mistranscriptions. It does not describe a separate language-identification service, transcript-cleaning component, queueing system, storage layer, or retry policy, so those implementation details cannot be inferred from the announcement.

## Translation Architecture

The production flow described in the source can be summarized as:

- Chirp ASR produces source-language transcripts from television audio.
- A Gemini-based translation architecture consumes those transcripts through the enterprise Vertex AI Gemini API.
- The model produces English translations while preserving the relationship between translated text and the original broadcast timeline.
- The resulting captions are made available for archive search and playback, and newly monitored non-English broadcasts are translated on an ongoing daily basis.

A central design requirement was temporal alignment. GDELT reports that it taught Gemini to understand time in ASR broadcast transcripts so that translations could be positioned at two-second resolution. This is more demanding than ordinary document translation because word order can differ substantially between languages. The source gives ending negation as an example: a translation may need to wait for information that appears later in the source before producing a natural English sentence. The system therefore had to align sentences whose source and target word order do not correspond directly, rather than simply translating each transcript segment independently.

The announcement refers to a “unique prompting and architecture,” but does not disclose the prompt, context-window strategy, segmentation algorithm, model-call topology, concurrency settings, or post-processing rules. Consequently, the available evidence supports describing this as a specialized prompting and orchestration design, not as a fully reproducible architecture. The use of Gemini 2.5 Flash Non-Thinking suggests a cost-sensitive choice for high-volume inference, but the text does not provide comparisons with other Gemini variants, open models, conventional machine-translation systems, or human translation.

## LLMOps and Production Operations

This is an LLMOps case because the model is used repeatedly in a real archive workflow rather than demonstrated on an isolated sample. The system processed a historical backlog at planetary scale and was then extended to translate new non-English broadcasts from all monitored channels each day. That combination of backfill and continuing ingestion implies an operational pipeline with recurring model inference, output storage, synchronization with media and transcript metadata, and publication to an end-user archive, although the source does not document those components in detail.

Cost management was a major operational consideration. The reported Gemini spend of $53,866 for 79 billion combined input and output tokens is approximately $0.68 per million tokens when calculated from the figures in the announcement. This is a useful indication of the economics claimed for the workload, but it should not be interpreted as a general price guarantee: actual cost would depend on tokenization, billing definitions, retries, prompt size, output length, API pricing, and whether the stated token total includes all operational calls. The comparison with more than $760,000 for Google Translate also may reflect different interfaces or pricing assumptions, and the source does not provide the underlying calculation.

Using an enterprise API rather than training or fine-tuning a model reduces the need to manage model infrastructure and avoids the data-training pathway described in the announcement. It also creates dependencies on provider availability, API quotas, pricing changes, regional processing and data-governance terms. No information is supplied about request batching, rate limits, failure recovery, observability, access controls, retention settings, or service-level objectives. Those omissions matter when assessing whether another archive could reproduce the same production economics and reliability.

## Evaluation and Quality Controls

GDELT reports that its prompting and architecture “effectively eliminate” hallucination for the narrow task of time-coded translation, with hallucination below measurable levels in extensive testing over several months. The announcement also characterizes the resulting translations as human-like in fluency across more than 150 languages. These are important reported outcomes, but the text does not define hallucination, disclose the test set, report sample sizes, identify language-by-language results, or provide human evaluation scores. It also does not state how accuracy was measured for low-resource languages, code-switching, ASR-corrupted input, named entities, numbers, quotations, or politically sensitive content.

The claimed quality boundary is narrow. A time-coded translation can be well aligned and fluent while still mistranslating a name, negation, number, attribution, or culturally specific expression. ASR errors can also propagate into translation, and fluent output may make those errors harder for users to notice. For research and journalistic use, provenance, source-audio access, confidence indicators, correction workflows, and clear labeling as machine translation would be valuable safeguards, but none is described in the source. The system's reported testing should therefore be understood as encouraging evidence for the stated task, not proof of universal translation accuracy.

## Results and Tradeoffs

The primary result is expanded access: English captions are reported to be available for the archive's non-English broadcasts, including historical programming and ongoing daily coverage. The scope—2.4 million broadcasts, 1.2 million hours, more than 150 languages and dialects, 300 channels, and 50 countries—is substantial. The reported cost also suggests that large archives may be able to consider translation projects that would previously have been financially impractical. Searchability and cross-language comparison could improve discovery of events, narratives, and voices that were previously difficult for English-speaking users to examine.

The principal tradeoffs are between scale, cost, quality assurance, and transparency. Automated Gemini translation makes the corpus economically tractable, but it does not replace editorial review across such a broad and heterogeneous collection. The archive may contain errors inherited from ASR, translation mistakes, uneven performance across languages, and ambiguity that cannot be resolved from transcript text alone. The source provides no information about throughput, processing time, uptime, correction rates, or per-language quality, so operational success beyond cost and coverage remains only partially documented.

Overall, the case demonstrates how a carefully prompted hosted LLM can be integrated into a high-volume media-archive workflow, especially when the task includes structured temporal output and noisy multilingual input. Its strongest evidence is the reported scale, cost, and deployment coverage. Its main limitations as a case study are the lack of reproducible architectural details and independent evaluation data. Organizations considering a similar deployment should validate quality by language and content type, monitor token and retry costs, preserve alignment and provenance metadata, and retain human or expert review paths for high-consequence uses.
