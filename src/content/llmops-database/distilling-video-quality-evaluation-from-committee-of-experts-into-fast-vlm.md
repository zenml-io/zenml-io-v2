---
title: "Distilling Video Quality Evaluation from Committee of Experts into Fast VLM"
slug: "distilling-video-quality-evaluation-from-committee-of-experts-into-fast-vlm"
draft: false
llmopsTags:
  - "content-moderation"
  - "caption-generation"
  - "agent-based"
  - "harness-engineering"
  - "human-in-the-loop"
  - "knowledge-distillation"
  - "few-shot"
  - "evals"
industryTags: "media-entertainment"
company: "Character AI"
summary: "Character AI faced the challenge of evaluating AI-generated video quality at scale, where traditional frame-based metrics and slow LLM-as-judge approaches failed to assess storytelling, physics consistency, character consistency, pacing, and audio-video synchronization. The company developed a solution involving a distilled small vision-language model (VLM) trained on comparative pairs rather than absolute scores, capable of evaluating 15-second videos in approximately 3 seconds. This fast evaluation model was integrated directly into the generation loop, enabling agentic workflows that could self-validate and correct issues early in the video creation process, significantly reducing the cost of producing high-quality long-form AI-generated videos."
link: "https://www.youtube.com/watch?v=b_PmGocP4rc"
year: 2026
seo:
  title: "Character AI: Distilling Video Quality Evaluation from Committee of Experts into Fast VLM - ZenML LLMOps Database"
  description: "Character AI faced the challenge of evaluating AI-generated video quality at scale, where traditional frame-based metrics and slow LLM-as-judge approaches failed to assess storytelling, physics consistency, character consistency, pacing, and audio-video synchronization. The company developed a solution involving a distilled small vision-language model (VLM) trained on comparative pairs rather than absolute scores, capable of evaluating 15-second videos in approximately 3 seconds. This fast evaluation model was integrated directly into the generation loop, enabling agentic workflows that could self-validate and correct issues early in the video creation process, significantly reducing the cost of producing high-quality long-form AI-generated videos."
  canonical: "https://www.zenml.io/llmops-database/distilling-video-quality-evaluation-from-committee-of-experts-into-fast-vlm"
  ogTitle: "Character AI: Distilling Video Quality Evaluation from Committee of Experts into Fast VLM - ZenML LLMOps Database"
  ogDescription: "Character AI faced the challenge of evaluating AI-generated video quality at scale, where traditional frame-based metrics and slow LLM-as-judge approaches failed to assess storytelling, physics consistency, character consistency, pacing, and audio-video synchronization. The company developed a solution involving a distilled small vision-language model (VLM) trained on comparative pairs rather than absolute scores, capable of evaluating 15-second videos in approximately 3 seconds. This fast evaluation model was integrated directly into the generation loop, enabling agentic workflows that could self-validate and correct issues early in the video creation process, significantly reducing the cost of producing high-quality long-form AI-generated videos."
notion:
  pageId: "3aaf8dff-2538-80d8-b2e1-f94e5df0041c"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T12:01:00.000Z"
  lastEditedTime: "2026-07-27T12:01:00.000Z"
  publishedAt: "2026-07-27T12:05:41Z"
---

## Overview

Character AI developed a comprehensive evaluation system for AI-generated video content that addresses one of the most significant challenges in the generative video space: determining video quality at scale. While video generation models like Kling, Sora, VEO, and others have achieved impressive generation capabilities, the evaluation of output quality has lagged behind. The company recognized that most AI-generated video content suffers from quality issues including hallucinations such as extra limbs, physics violations, inconsistent characters across shots, poor pacing, and audio-video synchronization problems. The central insight driving their work is that video is fundamentally a storytelling medium, and existing evaluation tools designed for text and image eras fail to capture whether a video successfully tells the intended story.

## The Problem Space

The company identified several critical gaps in existing video evaluation approaches. Traditional metrics like CLIP score work well for evaluating single frames, and metrics like LPIPS can detect drift between consecutive frames, but these tools fundamentally operate at the frame level. They can determine whether a specific frame matches the prompt that generated it and check consistency between adjacent frames, but they cannot assess higher-order qualities that matter for video as a medium. These include whether the video tells the intended story, whether physics makes sense across the sequence, whether characters remain consistent across multiple shots, whether pacing is appropriate, and whether audio synchronizes properly with visual events.

The company's initial approach involved using large foundational LLMs as judges, throwing videos at these models for evaluation. However, this approach revealed multiple limitations. The LLM-as-judge approach was slow, highly dependent on prompt engineering with different prompts yielding very different results from the same model, and often addressed the wrong question. While prompts might ask whether something is consistent or matches a prompt, the fundamental question creators care about is whether the video is good, and responses to this question varied considerably.

## Initial Architecture: Committee of Experts

Character AI's first production iteration combined traditional metrics with LLM-as-judge approaches into a repeatable benchmark system. This "committee of experts" included frame-level metrics that could run on both CPU and GPU, as well as frontier LLM models for higher-level assessment. Critically, they incorporated human annotation to calibrate the LLM-as-judge component, allowing humans to annotate generated reports and feeding that feedback back into the LLM prompts to align the judge with human quality assessments.

While this approach worked and could produce better results than individual components, it suffered from being very slow and expensive. More fundamentally, the evaluation happened too late in the process. The company recognized that mistakes caught earlier in the video creation pipeline are dramatically cheaper to correct. For example, checking whether character appearance drifts between starting frames of different shots before generating full videos from those frames is much more cost-effective than detecting the drift after full generation. Similarly, detecting issues in individual six-second generations before combining them into longer three-to-five-minute videos reduces waste and improves final output quality.

## The Distillation Strategy

To bring evaluation closer to the generation loop and make it fast enough for real-time use, Character AI distilled the committee of experts into a single small vision-language model. The choice of VLM architecture was deliberate: the model needed to see images and video frames, but speed was paramount since the goal was integration into the online generation process. The resulting model can score a 15-second video in approximately 3 seconds.

The team tested larger models that produced better results but were significantly slower, ultimately deciding that the incremental improvement did not justify the reduced speed. This represents a classic LLMOps tradeoff between model capability and operational requirements for production deployment.

## Training Methodology: Comparative Rather Than Absolute

One of the most important innovations in their approach was shifting from absolute scoring to comparative evaluation. The insight here is rooted in human psychology and annotation reliability. If asked to rate a video's storytelling quality on a scale of 1 to 10, different annotators will produce wildly different scores, with what one person rates as a 6 appearing as a 4, 5, or 8 to others. However, when shown two videos and asked which tells a better story, most people will agree on the relative ranking.

By training the model on pairs of videos (A versus B) rather than on absolute 1-through-10 scores, the company achieved more consistent and reliable evaluation. Through enough pairwise comparisons, the model learns to generalize what constitutes better quality across various dimensions without the noise introduced by attempting to learn arbitrary numerical scales.

## Data Generation and the V1 Failure

Creating training data involved "manufacturing badness," which proved easier than expected since the internet provides abundant high-quality video while generating bad video through corruption or random generation is straightforward. However, the first version of the model failed in an instructive way: it was wrong with high confidence. For example, it scored a video at 9.2 for camera work when the camera never moved for four seconds, essentially a static image. It praised physics in videos showing ghosts hovering and people flying.

The root cause was that the data generation approach led the model to learn to detect "vibe" rather than specific quality axes. The model became good at detecting coherent videos and identifying artificial artifacts but failed to assess whether videos actually told their intended stories or adhered to physics and other important criteria.

## Data Set Refinement: Real vs AI Footage

The solution required fixing the data set by pairing real footage against AI-generated footage. This approach carried significant risk: training on real-as-good and AI-as-bad could easily produce an AI detector rather than a video quality detector. The model might overfit to detecting whether something was AI-generated rather than assessing actual quality dimensions.

Character AI implemented two strategies to mitigate this risk. First, they ensured encoding consistency across both sides of the pairs, eliminating artificial artifacts that might differ between real and AI video. Second, they used identical annotation methods for both real and AI videos, ensuring all quality axes were annotated the same way regardless of source. This careful data curation proved successful, with the refined model performing substantially better.

## Integration Into Generation: From Pipelines to Agents

The evaluation model enabled a fundamental architectural shift from complex pipelines to agentic workflows. Traditional pipelines work well for narrowly defined use cases, but once exposed to users who want to tell diverse stories with their own characters, images, and voices, rigid pipelines struggle to adapt. By providing agents with tools to validate the quality of their own outputs, the system can adapt to changes more effectively. Agents can verify their own work and fix issues during the generation process rather than requiring expensive post-hoc correction.

This represents a mature LLMOps pattern: moving evaluation from a separate post-processing step into the core generation loop. The fast evaluation model serves as a guardrail and self-correction mechanism for the generation process itself.

## Continuous Improvement Through Human Feedback

The company maintains a continuous improvement loop through regular human annotation sessions. Every report generated by the system can be annotated by humans, and Character AI conducts periodic sessions where team members spend 10 to 15 minutes annotating videos across multiple quality axes. Rather than having everyone annotate the same video on all dimensions, annotations are distributed randomly to gather diverse feedback efficiently.

This human feedback serves two purposes. First, it calibrates the AI judges (the LLM-based components of the committee of experts) by adjusting prompts based on alignment with human judgment. Second, it provides training data for the next version of the distilled VLM. The speaker acknowledged that this process takes time and that taste evolves, requiring ongoing calibration rather than one-time training.

## Specific Evaluation Dimensions

The system evaluates videos across multiple specific axes that matter for the storytelling medium. These include storytelling quality (whether the video tells the intended narrative), physics consistency (whether motion and object behavior follows physical laws), character consistency (whether characters maintain the same appearance across shots), pacing (whether time progression makes sense for the depicted actions), and audio-video synchronization.

For audio evaluation specifically, the company uses a combination of tools including Atmos for ensuring sound quality and intelligibility. The VLM learns to identify key frames in the video, and when provided with the generation prompt (for example, "door slammed"), it looks for the visual event of a door slamming and checks for a corresponding spike in the audio waveform at that timestamp. The model doesn't need to recognize the specific sound, but rather correlates visual events with audio events at matching timestamps.

Lip syncing remains an acknowledged unsolved problem, particularly challenging given that Character AI works with both realistic human characters and animated characters. For animated characters that don't have realistic mouth-to-speech correlations, traditional lip sync detection techniques don't apply.

## Technical Choices and Open Questions

The company selected Qwen as their base VLM, driven partly by prior positive experiences with post-training Qwen for other use cases. While other small VLMs were tested, Qwen proved sufficient for their needs. The choice reflects pragmatic LLMOps decision-making: selecting models based on operational experience and specific requirements rather than chasing maximum capability.

When asked about scale considerations for organizations not producing videos at Character AI's volume, the speaker clarified that scale manifests in two ways: speed requirements and capacity requirements. The distilled model can be served as a single instance on one GPU or scaled to hundreds of instances based on throughput needs. For organizations producing hundreds or low thousands of videos, the committee of experts approach using metrics and frontier models might be sufficient and more cost-effective than the engineering investment required to build and maintain a distilled model. The decision point depends on unit economics: whether the cost of using slower frontier models multiplied by volume exceeds the development and serving cost of a custom distilled model.

## Productization and Openness

Character AI has released a version of their evaluation harness as an open repository. The harness is designed to be modular, allowing users to connect any agents or LLMs they prefer. The company maintains a separate internal version running as a service with their full suite of proprietary metrics and agentic orchestration. During the Q&A, a feature request was made for adding OpenTelemetry tracing to the harness to enable integration with other observability platforms, which the presenter acknowledged and accepted.

## Key Principles and Lessons

The presentation concluded with four key principles for building video evaluation systems in production. First, "go relative, not absolute" - comparing video A versus video B produces more reliable and consistent evaluation than attempting to assign absolute numerical scores. Second, "score the real axes you care about" - explicitly define and evaluate dimensions like storytelling, pacing, and physics rather than expecting them to emerge from general quality metrics. Third, "put eval inside the generation loop" - integrating evaluation as close to generation as possible enables early error detection and correction at lower cost. Fourth, "evaluate it as a story" - remember that video is a storytelling medium and evaluation frameworks must assess narrative and temporal coherence, not just per-frame quality.

## Production Considerations

This case study exemplifies several mature LLMOps patterns. The distillation from an ensemble of larger models to a single fast model represents a common optimization strategy for production deployment. The use of human feedback for continuous calibration and training data generation shows sophisticated approaches to maintaining model quality over time. The shift from pipelines to agentic workflows reflects evolving architectural patterns in generative AI systems. The explicit consideration of unit economics and the tradeoff between model quality and inference speed demonstrates production-grade thinking about operational costs.

The choice to train on comparative pairs rather than absolute scores shows deep understanding of both annotation quality issues and how to design training objectives that align with reliable human judgments. The careful data curation to avoid creating an AI detector instead of a quality detector demonstrates awareness of overfitting risks when working with synthetic data.

Perhaps most significantly, the entire architecture is driven by the insight that errors caught early are cheaper to fix, leading to the strategic decision to bring evaluation into the generation loop rather than treating it as a separate post-processing step. This represents a fundamental shift in how quality assurance integrates with generative AI production systems.
