---
title: "Safe Deployment of Clinical Conversational AI Through Simulation-Based Testing"
slug: "safe-deployment-of-clinical-conversational-ai-through-simulation-based-testing"
draft: false
llmopsTags:
  - "healthcare"
  - "chatbot"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "prompt-engineering"
  - "few-shot"
  - "agent-based"
  - "human-in-the-loop"
  - "evals"
  - "google-gcp"
industryTags: "healthcare"
company: "Ufonia"
summary: "Ufonia developed a comprehensive LLMOps framework for deploying Dora, a clinical conversational AI agent that conducts real medical conversations with patients across UK and US healthcare settings. The company built a simulation-based testing framework called Matrix that uses LLM-based patient simulators and automated judges to validate safety before any real patient interaction, addressing the ethical constraints that prevent traditional AB testing and iterative deployment in healthcare. Through simulation of thousands of clinical scenarios, automated hazard detection achieving 0.96 F1 score, and prompt optimization using genetic algorithms, Ufonia has successfully completed over 200,000 clinical calls across 20 UK hospitals and is contracted to scale to one million patients."
link: "https://www.youtube.com/watch?v=McknwOzbmyg"
year: 2026
seo:
  title: "Ufonia: Safe Deployment of Clinical Conversational AI Through Simulation-Based Testing - ZenML LLMOps Database"
  description: "Ufonia developed a comprehensive LLMOps framework for deploying Dora, a clinical conversational AI agent that conducts real medical conversations with patients across UK and US healthcare settings. The company built a simulation-based testing framework called Matrix that uses LLM-based patient simulators and automated judges to validate safety before any real patient interaction, addressing the ethical constraints that prevent traditional AB testing and iterative deployment in healthcare. Through simulation of thousands of clinical scenarios, automated hazard detection achieving 0.96 F1 score, and prompt optimization using genetic algorithms, Ufonia has successfully completed over 200,000 clinical calls across 20 UK hospitals and is contracted to scale to one million patients."
  canonical: "https://www.zenml.io/llmops-database/safe-deployment-of-clinical-conversational-ai-through-simulation-based-testing"
  ogTitle: "Ufonia: Safe Deployment of Clinical Conversational AI Through Simulation-Based Testing - ZenML LLMOps Database"
  ogDescription: "Ufonia developed a comprehensive LLMOps framework for deploying Dora, a clinical conversational AI agent that conducts real medical conversations with patients across UK and US healthcare settings. The company built a simulation-based testing framework called Matrix that uses LLM-based patient simulators and automated judges to validate safety before any real patient interaction, addressing the ethical constraints that prevent traditional AB testing and iterative deployment in healthcare. Through simulation of thousands of clinical scenarios, automated hazard detection achieving 0.96 F1 score, and prompt optimization using genetic algorithms, Ufonia has successfully completed over 200,000 clinical calls across 20 UK hospitals and is contracted to scale to one million patients."
notion:
  pageId: "3c6f8dff-2538-8087-9d67-d9fabd1f5fe4"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-24T09:10:00.000Z"
  lastEditedTime: "2026-08-24T09:10:00.000Z"
  publishedAt: "2026-08-24T09:16:27Z"
---

## Overview

Ufonia is a UK-based healthcare company that has built Dora, a voice AI agent designed to conduct real clinical conversations with patients, such as post-operative follow-ups and pre-operative checks. Presented by Jared, a research engineer on the science team, this case study outlines how Ufonia addresses the unique LLMOps challenges of deploying conversational AI in regulated healthcare environments where traditional software deployment practices are unethical or illegal. The company has completed approximately 200,000 clinical calls across 20 UK hospitals and launched in the US with presence in two clinics and contracts for six more across four states, with plans to scale to one million patients over the next two years.

The fundamental challenge that drives Ufonia's LLMOps approach is that healthcare AI cannot follow standard software deployment playbooks. Three critical constraints shape their entire operational framework: they cannot AB test on patients because randomizing patients into worse variants is unethical and illegal; they cannot undo or roll back a call once Dora has spoken to a patient; and model vendor benchmarks provide no legal defense in post-incident reviews. These constraints eliminate the reactive deployment loop that most software relies on, where small percentages of users receive changes, dashboards are monitored, and problematic updates are rolled back. In healthcare, if dashboards turn red, it means a patient has already been harmed.

## Regulatory Context and Hazard Definition

Dora functions as a medical device under regulatory frameworks because it asks about symptoms, provides medical advice, and answers patient questions. Regulation fundamentally requires answering three questions: what does the software do, what could go wrong, and how do you ensure it doesn't happen? For an LLM speaking with real patients, the space of potential harms is vast. Ufonia has documented 20 to 40 specific hazards, including scenarios where Dora might miss red flag symptoms like sudden vision loss or severe pain, hallucinate answers to medical questions, or fail to acknowledge patient distress. The company's approach starts from harm definition, working backward from what could actually hurt a patient to build their entire safety and evaluation infrastructure.

## The Matrix Simulation Framework

Recognizing that they cannot iterate on real patients until safety is proven, Ufonia looked to other high-reliability industries, particularly autonomous vehicles, which simulated millions of miles before carrying passengers. For clinical AI, simulation became the only ethical option. Ufonia developed Matrix, a simulation framework that recreates real clinical conversations without involving real patients. The architecture uses an LLM-based patient simulator called PatBot that is conditioned on specific clinical scenarios defining exactly what the simulated patient should do during the conversation, such as asking whether they are speaking with a human or an AI.

PatBot engages in conversations with Dora under specific clinical use case contexts grounded in real clinical workflows rather than abstract situations. A critical validation step involved ensuring PatBot's realism. Beyond basic script adherence checks that filtered out weaker models unable to follow instructions properly, Ufonia conducted a Patient and Public Involvement study where real patients viewed conversations side-by-side: one between a real doctor and real patient, another between Dora and PatBot. When asked to identify which patient was real, the majority of participants identified the simulated patient as more realistic in three out of four conversations. This validation established that while no single "realistic patient" exists given the diversity of communication styles, PatBot was sufficiently realistic for safety testing purposes.

## Automated Evaluation with LLM Judges

Scaling evaluation required automation, as human review of thousands of simulated dialogues would be neither feasible nor appropriate given that the engineering team lacks clinical expertise. Ufonia developed BevJudge, an LLM-based judge that takes simulated dialogues, expected behaviors, and hazardous scenarios defined with clinicians to make pass/fail judgments with structured explanations identifying which hazards were triggered. This approach reflects a sophisticated understanding that engineers cannot judge clinical safety without clinical training.

BevJudge was validated against expert clinicians using a corpus of 240 examples with ground truth labels for hazard presence. Ten clinicians from different specialties labeled these examples, and BevJudge performance was compared against this expert consensus. The top-performing model, which was Gemini 2.5 Pro as of the paper's writing, achieved an F1 score of 0.96 and near-perfect sensitivity. The emphasis on sensitivity reflects healthcare priorities: it is better to overcall hazards that are not present than to miss hazards that are, as the former merely adds some patient inconvenience while the latter could cause harm. This expert-level automated judge is what makes the entire evaluation process scalable, enabling automated grading of thousands of conversations.

## Prompt Optimization and the Improvement Loop

While automated grading identifies where Dora fails and is unsafe, grading alone does not improve the product. Eight months before the presentation, Ufonia would have manually prompt-engineered fixes, but they recognized prompt brittleness as a fundamental problem. Research shows formatting changes alone can swing benchmarks by 76 percentage points, and reordering few-shot examples can flip models from near-random to near-state-of-the-art performance. Manual tuning is subjective, not reproducible, and extremely time-consuming.

Ufonia adopted prompt optimizers, particularly Jeppa, which stands for genetic pareto and comes from the DSPy team. The Jeppa workflow begins with defining a metric for what constitutes good performance. Data passes through Jeppa, which identifies failed examples. A strong LLM reflects on failures and updates prompts automatically in an iterative loop, maintaining a Pareto frontier of best prompts until the budget is exhausted. This process reduces prompt optimization time from hours or days to 30-60 minutes while being reproducible with clear audit trails. When issues arise, they become pure data science problems focused on data quality, feature engineering, and metric definition rather than subjective manual tuning.

The metric definition is sophisticated rather than flat accuracy. Ufonia uses cost matrices that encode clinical priorities. For red flag detection, correctly catching a red flag is rewarded, missing one is catastrophic, and overcalling in the absence of a real red flag is only mildly annoying. By weighting the reward structure appropriately, they can optimize for sensitivity or other clinician-specified metrics. The same framework can be recompiled with different metrics to produce differently optimized prompts for different clinical priorities.

## The Replacement for Reactive Deployment

Ufonia's production deployment loop replaces the traditional ship-watch-rollback cycle with a proactive simulation-based flywheel. Real calls provide real data. Synthetic edge cases supplement this with scenarios that may not frequently appear in real calls, such as rare symptoms or transcription errors. Prompt optimizers like Jeppa generate optimized prompts from this combined data. Matrix serves as a simulation safety gate, and only when simulations pass does the system proceed to gated deployment. Every deployment and new call produces more call data, creating a continuous improvement flywheel where the system becomes more robust over time.

Critically, Ufonia acknowledges that simulation, however realistic, is not sufficient proof of real-world safety. Simulated patients are not real patients, and real-world scenarios may arise that simulations do not capture. Simulation earns the right to test carefully on real people, but it does not prove the system works in practice. Simulation is the fast, free inner loop enabling thousands of runs without patient exposure. Real patients form the outer loop where actual proof emerges. The transition from simulation to real deployment crosses in stages, each earning the right to the next: simulation success leads to user testing, then supervised clinical evaluation with real patients and voice actors, then monitored deployments where system autonomy scales with accumulated evidence. Clinicians are present at every step, and every call, dataset, pinned prompt, and judge verdict traces back to specific hazards. The deliverable for regulation is not the model itself but the evidence of safety.

## Extension to New Modalities

When Ufonia moved into voice modalities, new hazards emerged that did not exist in text-based interactions. Voice introduces phenomena like back-channeling and interruptions that break many text-based agents. For example, Dora might be mid-sentence providing safety advice like "you must avoid bright lights" when a patient interrupts with an out-of-scope question. Weaker models often forget the safety advice and simply answer the new question. Similarly, back-channeling can cause agents to stop mid-safety-advice and wait for patient response rather than completing critical information.

Matrix captures these voice-specific failure modes. The framework treats voice as a new module within the same safety case rather than requiring a complete restart. The approach remains consistent: black-box the system, document new hazards specific to the modality, and simulate and judge them using the established framework. This modularity means that whatever modality Ufonia moves into, the same approach finds hazards before real users encounter them.

## LLMOps Takeaways and Critical Assessment

Ufonia's approach offers several transferable LLMOps principles beyond healthcare. First, precisely define what constitutes harm for the specific product and use case. Second, manufacture rare but dangerous cases rather than waiting for them to occur naturally in production. Third, make evaluation metrics reflect real cost functions rather than simple accuracy measures. Fourth, pin prompt versions and maintain complete traceability. The work is never finished as new modalities and contexts introduce new hazards, but frameworks like Matrix provide consistent approaches across these expansions.

From a critical perspective, several aspects deserve consideration. The validation of PatBot, while involving real patients, was limited to four conversations with subjective judgments about realism. While the finding that no single realistic patient exists is important, the diversity of patient personas in the actual simulation set is not quantified. The BevJudge validation against clinicians is more robust with 240 examples and 10 specialty clinicians, but the F1 score of 0.96 still means approximately 4% error rate, and in high-stakes healthcare contexts, the impact of those errors matters. The emphasis on sensitivity helps mitigate this by preferring false positives over false negatives.

The prompt optimization approach using Jeppa is pragmatically sound given prompt brittleness, but the 30-60 minute optimization time still represents a potential iteration bottleneck compared to sub-second deployments in traditional software. The genetic algorithm approach and Pareto frontier maintenance are elegant, but the paper provides limited detail on how well optimized prompts generalize beyond the specific data they were optimized on, which is a common challenge in machine learning.

The staged deployment approach with clinicians at every step is ethically appropriate but likely expensive and slow compared to traditional deployment cycles. The traceability from every call and prompt to specific hazards is exemplary for regulated environments but represents significant overhead. The scale of 200,000 calls across 20 hospitals with plans for one million patients demonstrates real-world viability, though the presentation does not discuss failure rates, patient satisfaction, or comparative outcomes against traditional clinician-led calls.

The acknowledgment that simulation is necessary but not sufficient is intellectually honest and important. Many AI safety discussions overemphasize either simulation or real-world testing exclusively, while Ufonia correctly positions simulation as earning the right to careful real-world testing. The flywheel concept where each deployment generates more data for improvement is standard in machine learning operations, but its implementation in a highly regulated, high-stakes environment with gated releases and clinical oversight at every stage represents a meaningful adaptation.

Overall, Ufonia's LLMOps framework represents a thoughtful response to constraints that genuinely prohibit standard deployment practices. The combination of simulation-based testing, LLM-based judges validated against clinical experts, automated prompt optimization, and staged deployment with clinical oversight creates a coherent system for deploying conversational AI in regulated healthcare. The approach trades deployment speed and iteration velocity for safety assurance in a domain where patient harm is unacceptable. Whether this represents the optimal tradeoff depends on one's perspective on acceptable risk, but it clearly represents one of the more rigorous publicly documented approaches to clinical AI deployment.
