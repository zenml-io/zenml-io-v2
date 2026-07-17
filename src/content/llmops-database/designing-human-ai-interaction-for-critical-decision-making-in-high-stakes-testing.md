---
title: "Designing Human-AI Interaction for Critical Decision-Making in High-Stakes Testing"
slug: "designing-human-ai-interaction-for-critical-decision-making-in-high-stakes-testing"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "content-moderation"
  - "fraud-detection"
  - "chatbot"
  - "human-in-the-loop"
  - "prompt-engineering"
  - "evals"
  - "documentation"
  - "google-gcp"
industryTags: "education"
company: "Duolingo"
summary: "Duolingo's English Test team discovered that their highly trained human proctors were rubber-stamping AI cheating detection flags 50% of the time, even for false positives, demonstrating automation bias in a high-stakes testing environment. Through experimental research involving deliberately inserted false signals, they identified that the problem wasn't the AI model (which had only a 1% false positive rate) or the skilled reviewers, but rather the human-AI interaction design itself. By simply redesigning the proctoring guidelines to emphasize that AI signals were preliminary alerts requiring independent video evidence, they achieved a 21% increase in rejection rates of false flags, moving from 50% to 71% correct rejections. This case study demonstrates that optimizing the interaction layer between humans and AI systems can be more effective than improving models or adding oversight, especially in production systems where data quality and human discernment are critical."
link: "https://www.youtube.com/watch?v=CDqzWpwkSls&list=PLcfpQ4tk2k0V1LNigteMgExP1rb4Hy8wn&index=73"
year: 2026
seo:
  title: "Duolingo: Designing Human-AI Interaction for Critical Decision-Making in High-Stakes Testing - ZenML LLMOps Database"
  description: "Duolingo's English Test team discovered that their highly trained human proctors were rubber-stamping AI cheating detection flags 50% of the time, even for false positives, demonstrating automation bias in a high-stakes testing environment. Through experimental research involving deliberately inserted false signals, they identified that the problem wasn't the AI model (which had only a 1% false positive rate) or the skilled reviewers, but rather the human-AI interaction design itself. By simply redesigning the proctoring guidelines to emphasize that AI signals were preliminary alerts requiring independent video evidence, they achieved a 21% increase in rejection rates of false flags, moving from 50% to 71% correct rejections. This case study demonstrates that optimizing the interaction layer between humans and AI systems can be more effective than improving models or adding oversight, especially in production systems where data quality and human discernment are critical."
  canonical: "https://www.zenml.io/llmops-database/designing-human-ai-interaction-for-critical-decision-making-in-high-stakes-testing"
  ogTitle: "Duolingo: Designing Human-AI Interaction for Critical Decision-Making in High-Stakes Testing - ZenML LLMOps Database"
  ogDescription: "Duolingo's English Test team discovered that their highly trained human proctors were rubber-stamping AI cheating detection flags 50% of the time, even for false positives, demonstrating automation bias in a high-stakes testing environment. Through experimental research involving deliberately inserted false signals, they identified that the problem wasn't the AI model (which had only a 1% false positive rate) or the skilled reviewers, but rather the human-AI interaction design itself. By simply redesigning the proctoring guidelines to emphasize that AI signals were preliminary alerts requiring independent video evidence, they achieved a 21% increase in rejection rates of false flags, moving from 50% to 71% correct rejections. This case study demonstrates that optimizing the interaction layer between humans and AI systems can be more effective than improving models or adding oversight, especially in production systems where data quality and human discernment are critical."
notion:
  pageId: "38ef8dff-2538-809b-90f5-d5931908a9f7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-29T14:58:00.000Z"
  lastEditedTime: "2026-06-29T14:58:00.000Z"
  publishedAt: "2026-07-01T19:43:09Z"
---

## Overview

This case study from Duolingo provides a comprehensive examination of human-AI interaction design in production AI systems, with particular focus on the Duolingo English Test (DET), a high-stakes English proficiency exam taken by candidates worldwide for college admissions and visa applications. The presentation, delivered by Angel Ermanlee, a security software engineer at Duolingo, explores a critical but often overlooked aspect of LLMOps: how the design of human-AI interaction loops fundamentally determines system efficacy, data quality, and ultimately model improvement cycles.

The core insight centers on a phenomenon the team discovered through rigorous experimentation: even highly trained human reviewers were exhibiting automation bias, accepting AI-generated cheating detection flags at rates far exceeding what accuracy metrics would predict. In a production environment where 6,000 educational programs worldwide rely on test results that directly impact people's futures, this represented a critical failure mode that couldn't be addressed through traditional approaches of improving model accuracy or adding more human oversight.

## The Problem: Automation Bias in Production

Duolingo's research began by exploring what they termed "cognitive surrender," a concept drawn from Wharton research showing that humans increasingly forego deliberation and adopt AI outputs with minimal scrutiny. The Wharton study demonstrated that when AI was correct, human performance increased by 25 percentage points, but when AI was wrong, performance decreased by 15 percentage points. Most alarmingly, 80% of participants accepted AI answers even when they were incorrect.

The DET operates as a fully online, remotely proctored English proficiency exam that students can take from home. The security infrastructure includes identity verification, lockdown testing environments, and multiple AI-assisted monitoring systems that predict various types of cheating behavior. One specific system detects "copy typing," where candidates transcribe pre-written text rather than composing original responses. This custom model analyzes keystroke patterns and flags anomalies indicating transcription rather than composition behavior. Given the conservative nature of the model and prioritization of fairness, this flag appears infrequently, but when it does, trained human proctors review the video footage and AI signals to make final decisions.

## The Experiment: Measuring Human Discernment

To quantify automation bias in their production system, Duolingo designed a controlled experiment asking: "Would a skilled reviewer catch a false alarm or would they just rubber stamp it?" They selected exam sessions with absolutely no cheating indicators, deliberately inserted false AI signals suggesting copy typing behavior at specific moments, and presented these to proctors as part of their normal workflow. Critically, this used only historical sessions, so no actual test-takers were impacted.

The results were striking. Despite proctors consistently scoring above 90% on accuracy calibration metrics for genuine cheating detection, they accepted 50% of the deliberately false signals. This coin-flip acceptance rate strongly suggested automation bias: reviewers were deferring judgment to AI without seeking corroborating evidence in the video footage. In a high-stakes environment where results influence college admissions and visa decisions, this represented an unacceptable failure mode.

## The Solution: Interaction Design, Not Model Improvement

The critical insight was identifying where the problem actually resided. The team knew their model was performing well with only a 1% false positive rate. They knew their reviewers were highly skilled and experienced. The problem lay in the interaction design between humans and AI. Rather than retraining models or adding more oversight layers, they focused on redesigning the human-AI interaction loop itself.

The solution was elegantly simple: they updated proctoring guidelines to emphasize two key principles. First, AI signals are preliminary alerts only, with humans being the final decision-makers. Second, reviewers must find independent evidence in video footage before upholding any flag. This straightforward copy change achieved a 21% increase in rejection rates of false flags, moving from 50% correct rejections to 71%. No model changes, no UI overhauls, just clearer framing of the human's role in the decision-making process.

## LLMOps Principles: The Cyclical Interaction Loop

The presentation reframes how engineers should conceptualize human-in-the-loop AI systems. Rather than a linear model where AI output flows to human review and then to decision, the reality is cyclical: models provide outputs that flow into interactions that shape human behavior, which generates data for evaluations that feed back into model improvements. This cyclical view is fundamental to LLMOps because it recognizes that you cannot directly change human behavior, but you can engineer the interaction layer to elicit different behaviors, and that resulting data becomes the foundation for continuous improvement.

This creates either a virtuous or vicious cycle. In a vicious cycle, the model makes confident calls, the interface fails to elicit deliberation, humans rubber-stamp results, and those positive signals get logged as truth. Over time, the model becomes more confident, humans defer more, and AI effectively takes control. In a virtuous cycle, the interface forces independent judgment, humans think critically and surface real disagreements, true positive and negative labels get logged honestly, and model improvements target exactly where the model actually fails.

## Structured Interactions as Data Infrastructure

A crucial LLMOps insight is treating structured interactions as a system property that yields high-quality data. When interactions are designed intentionally, they generate labeled signals that become training data and evaluations for better models, creating a compounding flywheel effect. High-quality structured data unlocks meaningful insights and quicker development iterations, eliminating days of data cleaning and enabling direct impact on next iterations.

The presentation provides several comparative examples illustrating good versus bad interaction design. For headphone detection in test monitoring, the original interface asked a single yes/no question: "Headphones detected, flag for violation?" This conflated two distinct questions: first, did the model correctly identify pixels resembling headphones, and second, should this constitute a violation? This matters because a hearing aid would correctly trigger the detection model but shouldn't result in a violation flag. Selecting "no" to avoid false accusation actually sends a false negative signal to the model. Separating these into two questions yields more data of better quality, improving model training without harming test-takers.

## LLM Application Examples: Writing Tutors and Coding Agents

The presentation extends these principles to LLM applications more broadly. For an LLM-based writing tutor, a poorly designed interaction generates overwhelming, unfocused feedback: 400 lines of text including generic praise, unclear feedback not tied to specific passages, and complete unsolicited rewrites. This doesn't mirror natural human tutoring behavior and doesn't enable actionable improvement.

In contrast, Duolingo's production writing tutor uses direct markup with color-coded annotations (green for strengths, yellow for awkward phrasing, red for errors), with concise feedback appearing on hover and suggestions acceptible inline. This mimics how humans actually provide feedback, enables incremental improvement, and surfaces exactly the same AI analysis in a far more usable format. The interaction design makes all the difference in utility.

For coding agents, two common anti-patterns emerge: generating massive diffs touching many files that developers approve in bulk and debug later, or pinging for approval on every single file change, creating approval fatigue. Both reduce developers to rubber stamps. A better design treats the AI as a junior developer who plans work, asks clarifying questions, documents design decisions, and submits manageable, reviewable PRs. This enables developers to highlight assumptions early, review meaningful decision points before things go wrong, and maintain control.

From a data perspective, the poorly designed coding agent captures only binary accept/reject signals skewed toward acceptance, providing minimal insight. The well-designed agent captures structured data across development cycle stages: bad assumptions, trade-offs made, stylistic preferences, and approach decisions. This rich, structured feedback continuously improves the system.

## Design Principles for Production AI Systems

The presentation crystallizes several design principles for LLMOps practitioners:

**Engineer the reasoning:** Consider what reasoning pattern you want from humans and how your interface challenges that. Reframe humans as investigators rather than validators. Instead of asking "Does this look good?" create interfaces requiring thoughtful engagement. Surface assumptions proactively for sign-off to prevent downstream corrections. Present trade-offs and reasoning explicitly so users maintain control and can provide input early.

**Match friction to stakes:** In high-stakes scenarios like the English test, deliberately add friction through review gates and structured checkpoints to force slow, deliberate thinking. You want clarity over speed, high quality over throughput. In low-stakes scenarios like casual AI chat, optimize for seamlessness and delight with minimal friction.

**Every interaction is already a label:** Rather than separately sampling data for human annotation, recognize that each interaction already provides labels and signals for the next iteration. Approved plans and accepted suggestions indicate alignment between output and user intent. Modified outputs or overridden recommendations signal model shortcomings, but only if you capture that diff. Many systems capture only the final accept/reject, missing the modifications users make afterward, which pollutes training data with false positives. Explicitly track these differences.

**Proactively define success metrics:** Rather than building the system and then wondering what data to capture, start by defining what success means, what concrete metrics will measure it, and what data you'll need to improve the system. These decisions should inform interaction design from the start, ensuring you have the evidence needed for continuous improvement.

**Engineer the interaction layer explicitly:** Use structured inputs and outputs rather than unstructured text or vibes. This might mean forms, tables, markup UIs, or targeted highlighting. Surface assumptions proactively rather than letting them remain implicit. Build in friction and review gates where deliberate thinking matters. Collect explicit feedback at correct touchpoints with appropriate nuance, not just thumbs up/down.

## Production Considerations and Balanced Assessment

This case study deserves critical examination despite its compelling narrative. The 21% improvement in false flag rejection, while significant, still leaves the system at 71% accuracy for rejecting false positives deliberately inserted by the team. This means 29% of false flags are still being accepted, which in a high-stakes environment remains concerning. The presentation doesn't discuss what additional measures were taken to reach acceptable performance levels or what the target accuracy should be.

The solution's simplicity—changing proctoring guidelines—is both a strength and a limitation. It's a strength because it demonstrates that thoughtful interaction design can unlock improvements without expensive model retraining or infrastructure changes. It's a limitation because it relies entirely on human compliance with updated guidelines, which may degrade over time without reinforcement, monitoring, or additional structural changes to the interface itself.

The presentation also doesn't address computational costs, latency, or scalability considerations for the various AI systems in production. For a globally administered test that must provide reliable results quickly, these operational concerns are material. Similarly, the discussion of writing tutors and coding agents, while illustrative, doesn't provide concrete metrics or A/B test results demonstrating superiority of the recommended approaches.

The broader argument about cognitive surrender and automation bias is well-supported by external research and Duolingo's own experiments, but the presentation advocacy for specific interaction patterns should be validated in each specific production context. What works for high-stakes test proctoring may not generalize to lower-stakes consumer applications, and vice versa.

## Strategic LLMOps Insights

From an LLMOps perspective, this case study highlights several underappreciated aspects of operating AI systems in production:

The interaction layer is first-class infrastructure, not an afterthought. Just as teams invest heavily in model architecture, training pipelines, and deployment infrastructure, the interaction design deserves equivalent investment and rigor. It directly determines data quality, which determines model improvement velocity and ultimate system efficacy.

Human-in-the-loop systems require careful consideration of cognitive biases and human factors engineering, not just machine learning expertise. Automation bias, cognitive surrender, and approval fatigue are real phenomena that will degrade production systems unless explicitly designed against.

The flywheel effect of structured interactions compounds over time. Early investment in interaction design that yields high-quality labeled data pays dividends across multiple model generations and product iterations. Conversely, poor interaction design that generates noisy or misleading labels creates technical debt that becomes harder to overcome as models learn from polluted data.

The most effective intervention isn't always model improvement. This case study demonstrates that when models are already performing well technically but the system isn't achieving desired outcomes, looking at the interaction layer and data quality can unlock step-function improvements more efficiently than additional model development.

For organizations building production AI systems, particularly in high-stakes domains like education, healthcare, finance, or legal applications, this case study provides a valuable framework for diagnosing and addressing automation bias. The experimental methodology—deliberately inserting known false signals to measure human response—offers a rigorous approach to quantifying these effects in production environments.

The presentation ultimately argues for a paradigm shift in how engineers approach human-AI systems: not as human verification of AI decisions, but as carefully engineered interactions that elicit appropriate human reasoning while generating the structured data needed for continuous improvement. In this view, the interaction design is simultaneously the user interface, the data collection infrastructure, and the steering mechanism for model improvement—a perspective that deserves wider adoption in LLMOps practice.
