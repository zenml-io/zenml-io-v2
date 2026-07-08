---
title: "Engineering Human-AI Interaction for High-Stakes Exam Proctoring"
slug: "engineering-human-ai-interaction-for-high-stakes-exam-proctoring"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "classification"
  - "content-moderation"
  - "human-in-the-loop"
  - "evals"
  - "documentation"
  - "google-gcp"
industryTags: "education"
company: "Duolingo"
summary: "Duolingo's English Test team discovered that their highly trained human proctors were accepting 50% of intentionally false AI cheating detection signals, demonstrating severe automation bias despite 90% accuracy on calibration metrics. This occurred in their AI-assisted monitoring system for copy typing detection in their remotely proctored English proficiency exam. By redesigning the human-AI interaction interface and updating proctoring guidelines to emphasize that AI signals were preliminary alerts requiring independent video evidence, they achieved a 21% increase in rejection rates of false positives, moving from 50% to 71% correct rejections. This intervention required no model retraining or UI changes, only modifications to the interaction design and guidelines."
link: "https://www.youtube.com/watch?v=CDqzWpwkSls"
year: 2026
seo:
  title: "Duolingo: Engineering Human-AI Interaction for High-Stakes Exam Proctoring - ZenML LLMOps Database"
  description: "Duolingo's English Test team discovered that their highly trained human proctors were accepting 50% of intentionally false AI cheating detection signals, demonstrating severe automation bias despite 90% accuracy on calibration metrics. This occurred in their AI-assisted monitoring system for copy typing detection in their remotely proctored English proficiency exam. By redesigning the human-AI interaction interface and updating proctoring guidelines to emphasize that AI signals were preliminary alerts requiring independent video evidence, they achieved a 21% increase in rejection rates of false positives, moving from 50% to 71% correct rejections. This intervention required no model retraining or UI changes, only modifications to the interaction design and guidelines."
  canonical: "https://www.zenml.io/llmops-database/engineering-human-ai-interaction-for-high-stakes-exam-proctoring"
  ogTitle: "Duolingo: Engineering Human-AI Interaction for High-Stakes Exam Proctoring - ZenML LLMOps Database"
  ogDescription: "Duolingo's English Test team discovered that their highly trained human proctors were accepting 50% of intentionally false AI cheating detection signals, demonstrating severe automation bias despite 90% accuracy on calibration metrics. This occurred in their AI-assisted monitoring system for copy typing detection in their remotely proctored English proficiency exam. By redesigning the human-AI interaction interface and updating proctoring guidelines to emphasize that AI signals were preliminary alerts requiring independent video evidence, they achieved a 21% increase in rejection rates of false positives, moving from 50% to 71% correct rejections. This intervention required no model retraining or UI changes, only modifications to the interaction design and guidelines."
notion:
  pageId: "397f8dff-2538-800f-afc4-d87a4ce90f74"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T20:02:00.000Z"
  lastEditedTime: "2026-07-08T20:02:00.000Z"
  publishedAt: "2026-07-08T20:10:08Z"
---

## Overview

Duolingo operates the Duolingo English Test, a high-stakes English proficiency exam that is fully online and remotely proctored, trusted by 6,000 programs worldwide for college admissions and visa decisions. The company runs a sophisticated AI-assisted monitoring system to detect various forms of cheating, including identity verification, lockdown testing environments, and multiple AI models predicting different cheating behaviors. All sessions undergo a final round of scrutiny where human proctors review video footage alongside AI predictions. This case study examines how Duolingo discovered and addressed severe automation bias in their human-in-the-loop AI system, ultimately revealing fundamental insights about designing production AI systems where human oversight is critical.

## The Problem: Automation Bias in High-Stakes Decision Making

The case study centers on a research initiative published as "When Machines Mislead," investigating AI-human interaction in the context of exam proctoring. Duolingo's team was specifically concerned about a phenomenon called cognitive surrender, where humans forego deliberation and adopt AI output as their own with minimal scrutiny. Research from Wharton had shown that AI can either supplement or supplant human thinking, with participants accepting AI answers 80% of the time even when wrong. When AI was correct, human performance increased by 25 percentage points, but when AI was wrong, performance decreased by 15 percentage points, demonstrating that humans were incorporating AI cognition without critical evaluation.

Duolingo wanted to test whether this phenomenon was occurring in their own production system. They focused on their copy typing detection model, which identifies anomalous keystroke patterns that suggest someone is transcribing rather than composing original text. The model is highly conservative, prioritizing fairness for test-takers, resulting in a 1% false positive rate. Human proctors were well-trained to examine flagged segments and determine whether cheating had occurred.

## The Experiment: Testing Human Discernment

To answer the question "Would a skilled reviewer catch a false alarm or would they just rubber stamp it?", Duolingo designed a controlled experiment. They selected historical test sessions that had no cheating whatsoever and were completely legitimate. They then artificially added fake AI signals indicating potential copy typing behavior at specific moments, making it appear as though the AI model had flagged these sessions. These manipulated sessions were presented to proctors as part of their normal workflow, with proctors unaware they were part of an experiment. Critically, since these were historical sessions, there was no impact on actual test-takers.

The results were alarming. Despite the fact that human reviewers consistently scored above 90% on their accuracy calibration metrics in normal operations, they accepted 50% of these intentionally false signals. This coin-flip rate strongly suggested automation bias, with reviewers deferring their judgment to the AI without seeking corroborating evidence in the video footage. In a high-stakes exam context where results influence college admissions and visa decisions, this level of false accusation was completely unacceptable to the team.

## The Solution: Redesigning Human-AI Interaction

The team recognized that the problem was neither the model, which had a very low false positive rate and was producing accurate predictions in production, nor the people, who were highly skilled and experienced. Instead, they identified the interface and interaction design as the core issue. They reframed the human-in-the-loop AI framework from a linear process where model output leads directly to human decision, to a cyclical process where models provide output that flows through an interaction layer to human behavior, which yields data for evaluations and feeds back into model improvements.

The intervention was remarkably simple: they updated the proctoring guidelines to emphasize two key points. First, that the AI signal is merely a preliminary alert and that the human proctor is the final decision-maker. Second, that when making their decision, proctors must find independent evidence in the video footage before upholding a flag. This straightforward copy change led to a 21% increase in rejection rates, moving from 50% false accusation acceptance to 71% correct rejections. This meant that the majority of sessions were now being correctly identified as legitimate, much more closely matching production session quality. From an engineering perspective, this was particularly notable because it required no model retraining and no UI changes, only modifications to the interaction guidelines.

## Core LLMOps Insights: The Interaction Loop

The case study introduces a critical framework for production AI systems. Rather than viewing human-in-the-loop as linear, Duolingo emphasizes that it is fundamentally cyclical. Models produce output that enters an interaction layer, which elicits human behavior, which generates data for evaluations, which then feeds back into model improvements. While you cannot directly change how humans behave, you can engineer the interaction to elicit different behavioral responses, and this data is invaluable for improving the entire system.

The team identifies two potential cycles. A vicious cycle occurs when the model makes confident calls, the interface does not elicit deliberation, humans rubber stamp decisions, and these false positive signals get logged as truth. Over time, the model becomes more confident in incorrect predictions, humans are not encouraged to think critically, they defer increasingly to the AI, and the AI effectively becomes the decision-maker. In contrast, a virtuous cycle occurs when the interface forces independent judgment, humans think critically and surface real disagreements, true positive and negative labels get logged honestly, and model improvements target exactly where the model goes wrong.

## Design Principles for Production AI Systems

Duolingo distills several design principles from their experience that are broadly applicable to LLMOps:

**Engineer the Reasoning**: Think deliberately about what reasoning pattern you want to elicit from humans and how your interface challenges that. Reframe humans as investigators rather than validators. Don't just ask "is this looking good" but instead create more thoughtful, engaged interactions. Surface assumptions early so users can sign off before miscommunication occurs. Present trade-offs explicitly so users understand the reasoning behind model decisions and can maintain control over outputs.

**Match Friction to Stakes**: In high-stakes scenarios like Duolingo's exam proctoring, you want deliberate slowness and thoughtful decision-making. Adding friction through review gates and structured workflows forces people to slow down and prevents rubber stamping. The output should remain high quality with clarity rather than noise. In low-stakes scenarios like casual chatting with an AI, optimize for frictionless, seamless experiences where users feel happy and engaged without unnecessary stopping points.

**Every Interaction is Already a Label**: Rather than separately collecting labeled data through human annotation, recognize that every interaction in your production system is already generating labels. If an agent plan is approved or a suggestion accepted, the output matched user intent. If output is modified or a recommendation overridden, something went wrong. Many systems fail to capture this diff, logging false positive signals when users click yes and then manually change the output. Questions that humans ask, like explanations or follow-ups, can indicate low trust or AI failures. Capturing these signals provides rich training data.

**Stop Asking How to Evaluate the Model**: Rather than building a system and then figuring out evaluation metrics, proactively define what success means for your AI system from the start. Determine concrete metrics and what data you will need to improve the system. These decisions inform how you design the interaction layer to ensure you capture the evidence needed for iteration.

**Engineer the Interaction**: Specific techniques include using structured inputs and outputs rather than free-form text, such as forms, tables, or markup UIs. Highlight assumptions proactively so users can validate them early, saving tokens and preventing downstream corrections. Build in friction and review gates deliberately where you want careful decision-making. Collect explicit feedback at the correct touch points with appropriate nuance, not just thumbs up or down.

## Additional Examples and Patterns

The presentation provides several additional examples illustrating these principles beyond the core exam proctoring case:

**Headphone Detection**: An earlier flawed pattern asked proctors a simple yes/no question about whether headphones were detected, but this actually conflated two distinct questions. First, did the model correctly predict that pixels resembling headphones appeared in the video? Second, should this person be flagged for a violation? This distinction matters significantly because someone wearing a hearing aid would result in a correct model prediction but should not be penalized for cheating. Previously, to avoid false accusations, proctors would select no, but this sent false negative signals to the model, degrading it over time. Breaking this into two separate questions yields higher quality data and prevents model degradation.

**Writing Tutor**: A comparison between generic LLM behavior and Duolingo's writing tutor illustrates interface design principles. When asked to act as a writing tutor for a brief paragraph with mistakes, a generic LLM produced 400 lines of overwhelming text including praise, feedback, and a complete rewrite that was never requested. The feedback was not directly tied to specific input portions and was too large to be actionable. This does not mimic natural human behavior like asking a friend or classmate for feedback. In contrast, Duolingo's writing tutor provides inline markup with green for good elements, yellow for awkward sections, and red for mistakes. Hovering over markup reveals concise, actionable feedback directly tied to specific text portions. Users can accept suggestions inline. This more closely mimics academic peer review and enables incremental improvement over time.

**Coding Agents**: Many out-of-the-box coding agents fall into problematic patterns. Some touch numerous files and produce giant diffs all at once, leading developers to approve changes and debug later. Others ping notifications for every single function or file change, forcing developers to repeatedly click yes just to see results. In both cases, developers become rubber stamps who review everything later and are solely responsible for identifying and fixing problems. A better approach models the agent as a junior developer who plans work, asks good questions, documents design decisions, provides reviewable specs, and breaks up pull requests into meaningful chunks. This enables developers to review assumptions, see plans before things go wrong, and manage steps without excessive interruptions. From a data perspective, binary accept/reject signals on code blocks provide minimal information. But if the agent acts as a partner with structured interactions around different development cycle phases, you capture rich structured data about bad assumptions, trade-offs, stylistic preferences, and developer approaches, which continuously improves the system.

## Broader Context and Societal Implications

The case study situates these technical insights within broader societal trends around AI trust. As AI becomes increasingly integrated into daily life through tasks like smartphone contact lists replacing memorized phone numbers, GPS navigation removing the need to think about routes, and AI summaries in search engines like Gemini potentially replacing direct consultation of authoritative sources like CDC or WHO websites, human trust in AI systems increases while caution decreases. This occurs across society as these atomic integrations accumulate in everyday interactions.

The Wharton research on cognitive surrender indicates that humans may not even realize when AI is supplanting rather than supplementing their thinking. This makes it critical for organizations deploying production AI systems, particularly in high-stakes domains, to intentionally design interactions that maintain human agency and critical thinking.

## Production System Architecture

While the case study focuses primarily on interaction design rather than technical infrastructure, it reveals several architectural elements of Duolingo's production system. The Duolingo English Test employs multiple AI models for different cheating detection tasks, including identity verification, lockdown environment monitoring, and behavioral analysis like copy typing detection. The copy typing model analyzes keystroke patterns to distinguish transcribing from composing, looking for anomalies that suggest content is being read rather than generated in the moment. The model is intentionally highly conservative to prioritize fairness for test-takers.

All sessions undergo multi-stage review. AI models generate preliminary predictions, human proctors review video footage alongside these predictions, and final decisions incorporate both model outputs and human judgment. The system logs these decisions, creating training data for future model iterations. This architecture exemplifies human-in-the-loop AI in production, where the interaction layer between model predictions and human decisions becomes a critical system component that directly impacts both operational outcomes and the quality of data available for model improvement.

## Key Takeaways for LLMOps Practitioners

This case study provides several crucial lessons for practitioners deploying AI systems in production. First, automation bias is real and severe even among highly trained professionals with demonstrated high accuracy. Human oversight alone does not guarantee quality decisions when AI is involved. Second, interaction design is as important as model performance for overall system efficacy. A model with a 1% false positive rate still led to 50% false accusations when the interaction layer failed to elicit independent judgment. Third, simple interventions in how humans interface with AI can dramatically improve outcomes without requiring model retraining or complex technical changes. A guideline update achieved a 21% improvement in decision quality.

Fourth, the data generated through human-AI interactions is critical for model improvement, but only if the interaction is designed to capture honest signals rather than rubber stamp approvals. Poorly designed interactions create vicious cycles where models become confident in wrong predictions. Fifth, production AI systems should be viewed as cyclical rather than linear, with the interaction layer serving as a key leverage point for system improvement. Finally, matching interface friction to the stakes of the decision is essential, with high-stakes scenarios requiring deliberately slower, more thoughtful interfaces and low-stakes scenarios prioritizing seamless, frictionless experiences.

The fundamental insight is that sometimes the fix for a production AI system is not a better model or more oversight, but simply engineering the interaction itself. This represents a critical but often overlooked dimension of LLMOps that can have dramatic impacts on both operational outcomes and the quality of data available for continuous improvement.
