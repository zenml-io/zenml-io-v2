---
title: "Human-augmented generative reward models for legal AI evaluation"
slug: "human-augmented-generative-reward-models-for-legal-ai-evaluation"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "reinforcement-learning"
  - "rlhf"
  - "human-in-the-loop"
  - "agent-based"
  - "evals"
  - "anthropic"
  - "openai"
  - "google-gcp"
industryTags: "legal"
company: "Harvey"
summary: "Harvey uses lawyer preference judgments to evaluate and improve legal AI systems, but finds that expert agreement is limited because legal quality involves difficult tradeoffs among accuracy, reasoning, grounding, style, tone, and task alignment. To scale scarce legal expertise, Harvey developed lawyer-tuned generative reward models (GRMs): agentic LLM judges that compare two outputs, generate and apply an explicit rubric, verify claims against source materials or the web, and produce an overall recommendation with axis-level reasoning. GRMs recovered human model rankings, increased evaluation-panel agreement, and helped identify that the Tenet model improved substantially over its Kimi K3 base model on accuracy and reasoning, while regressing on tone and style. The results support using GRMs as an expert-assistance and post-training data-generation layer rather than as an autonomous replacement for lawyers, particularly because GRMs sometimes overvalued secondary qualities, selected a winner when both outputs were poor, and exhibited model-family bias."
link: "https://x.com/itsjuliopereyra/status/2100631185064173953?s=43"
year: 2026
seo:
  title: "Harvey: Human-augmented generative reward models for legal AI evaluation - ZenML LLMOps Database"
  description: "Harvey uses lawyer preference judgments to evaluate and improve legal AI systems, but finds that expert agreement is limited because legal quality involves difficult tradeoffs among accuracy, reasoning, grounding, style, tone, and task alignment. To scale scarce legal expertise, Harvey developed lawyer-tuned generative reward models (GRMs): agentic LLM judges that compare two outputs, generate and apply an explicit rubric, verify claims against source materials or the web, and produce an overall recommendation with axis-level reasoning. GRMs recovered human model rankings, increased evaluation-panel agreement, and helped identify that the Tenet model improved substantially over its Kimi K3 base model on accuracy and reasoning, while regressing on tone and style. The results support using GRMs as an expert-assistance and post-training data-generation layer rather than as an autonomous replacement for lawyers, particularly because GRMs sometimes overvalued secondary qualities, selected a winner when both outputs were poor, and exhibited model-family bias."
  canonical: "https://www.zenml.io/llmops-database/human-augmented-generative-reward-models-for-legal-ai-evaluation"
  ogTitle: "Harvey: Human-augmented generative reward models for legal AI evaluation - ZenML LLMOps Database"
  ogDescription: "Harvey uses lawyer preference judgments to evaluate and improve legal AI systems, but finds that expert agreement is limited because legal quality involves difficult tradeoffs among accuracy, reasoning, grounding, style, tone, and task alignment. To scale scarce legal expertise, Harvey developed lawyer-tuned generative reward models (GRMs): agentic LLM judges that compare two outputs, generate and apply an explicit rubric, verify claims against source materials or the web, and produce an overall recommendation with axis-level reasoning. GRMs recovered human model rankings, increased evaluation-panel agreement, and helped identify that the Tenet model improved substantially over its Kimi K3 base model on accuracy and reasoning, while regressing on tone and style. The results support using GRMs as an expert-assistance and post-training data-generation layer rather than as an autonomous replacement for lawyers, particularly because GRMs sometimes overvalued secondary qualities, selected a winner when both outputs were poor, and exhibited model-family bias."
notion:
  pageId: "3e9f8dff-2538-80c8-a4ac-c30f099f59c4"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:11:00.000Z"
  lastEditedTime: "2026-09-28T08:11:00.000Z"
  publishedAt: "2026-09-28T08:25:56Z"
---

## Overview

Harvey applies large language models to complex legal work, where determining whether an answer is useful requires more than checking whether it is fluent or superficially correct. The company uses lawyer judgment as the reference standard for evaluating its systems and for deciding whether models such as Tenet are improving. Its central LLMOps problem is that high-skill lawyers are expensive and their judgments are not perfectly consistent: reviewers may identify the same strengths and weaknesses in two answers but disagree about how to weigh hallucinations, reasoning, coverage, style, tone, and other competing qualities.

To address this bottleneck, Harvey uses generative reward models (GRMs), described as agentic LLM judges that compare two candidate outputs in a manner similar to a human side-by-side evaluation. The GRMs create or apply structured rubrics, can use sub-agents to verify claims against the original task environment or the web, score each rubric criterion, and provide a recommendation and rationale. Harvey’s lawyers tune the evaluation approach and remain involved in reviewing the GRM’s criteria, decision, and reasoning. In the reported experiments, GRMs broadly reproduced human preference rankings and improved agreement when added to human panels, while also exposing important limitations such as judge-model family bias and disagreements over the severity of legal errors.

## Problem: Scaling expert evaluation

Harvey’s evaluation workflow presents lawyers with two outputs for the same task and asks them to select the preferred result and explain the choice. Aggregated preferences can be converted into metrics for comparing systems and can potentially be used for reinforcement learning from human feedback (RLHF). In the conventional RLHF framing, human preferences train a reward model, and that reward signal is then used to move a target model toward outputs that are more likely to be preferred.

The legal setting makes this approach difficult. Preferences are not homogeneous, even among highly qualified reviewers, because legal work contains subjective and context-dependent judgments. The source describes a preference study conducted with Snorkel while assessing Kimi K3 as a base model for Tenet. The study compared Kimi K3 with four other leading models on 24 LAB tasks, with each task rated by three lawyers from the relevant practice area. Lawyers separated models into meaningful performance tiers when results were aggregated, but agreement on individual matchups was weak. Reviewers were unanimous in only 25% of matchups, and Fleiss’ kappa was 0.129. Among the three strongest models, unanimity fell to 11% and Fleiss’ kappa became negative.

The disagreement did not primarily come from reviewers overlooking completely different facts. Harvey reports that only 24.3% of disagreements involved reviewers considering different evidence, such as one lawyer noticing a hallucination that another missed. More commonly, lawyers saw similar virtues and defects but reached different conclusions about their relative importance. This distinction matters operationally: simply improving reviewer instructions may not eliminate the need for expert judgment, because the hard part is often the weighting of competing defects rather than identifying them.

## GRM evaluation architecture

Harvey’s GRMs extend a pairwise, agentic judging protocol. The general process is to read the two candidate outcomes, generate a rubric describing the important comparison dimensions, score both candidates against that rubric, and record the analysis in a scratchpad before producing the comparison. Harvey adds two significant capabilities.

First, GRMs can call verification sub-agents. These sub-agents check factual claims against the original environment, including input documents and MCP-connected resources, or against the web. This allows the evaluator to treat factual accuracy, hallucination, and misrepresentation as explicit quality dimensions instead of relying only on the judge model’s ungrounded impression. The source does not describe a complete production deployment architecture for these tools, so the evidence supports their role in the evaluation protocol but not assumptions about latency, infrastructure, access control, or operating cost.

Second, Harvey requires rubric criteria to be associated with defined axes. The reported axes are accuracy, coverage, grounding, reasoning, alignment, style, and tone. Accuracy covers correctness and the absence of hallucinations; coverage concerns whether relevant points are addressed; grounding concerns whether important facts can be verified through citations or other references; reasoning assesses analysis and judgment; alignment measures compliance with the original task and user instructions; and style and tone capture presentation, readability, and prose quality.

For each criterion, the GRM assigns a comparative score from -1 to 1. A value of -1 maximally favors response A, while 1 maximally favors response B. This representation allows the system to produce both a discrete winner and a more granular estimate of the magnitude of the advantage. Harvey reports that the mean of rubric-level score differences aligned better with the apparent size of a victory than a binary choice alone. In an LLMOps setting, this is useful because a post-training pipeline can distinguish a narrow preference from a strong preference, although the source does not claim that these scores are calibrated probabilities or that they are directly used as the sole training reward.

## Human-in-the-loop evaluation

The GRMs were tuned by members of Harvey’s Applied Legal Research team to reflect what lawyers care about across the seven axes. The reported results suggest that the models largely recovered the human preference rankings from the LAB study and were more decisive than human reviewers, separating models in broadly similar directions. When the GRM was added to the three-human panel, Fleiss’ kappa increased from 0.128 to 0.216. When it replaced a randomly selected human reviewer, raw panel agreement increased from 44.7% to 59.2%.

Harvey also tested a collaborative review interface in which lawyers saw the full candidate outputs alongside GRM annotations, rubric criteria, the proposed vote, and the rationale. The evaluation separated agreement with the GRM’s criteria, its overall choice, and its detailed explanation. Lawyers and GRMs generally aligned on the major facts, relevant criteria, and preferred answer. Agreement was weaker on the explanation of why one output should win, at approximately 64% according to the source.

This pattern supports an assistive operating model. The GRM performs the repetitive work of examining long outputs, identifying comparison points, checking relevant claims, and offering an initial recommendation. A lawyer then reviews the evidence and applies professional judgment to the final tradeoff. Those last-mile corrections could subsequently be used as additional preference data for tuning or training the GRM, creating a feedback loop in which expert time is concentrated on ambiguous or high-impact cases rather than every routine comparison.

## Bias controls and model development

Harvey used GRMs to scale pairwise comparisons across a dozen leading models on LAB tasks. The experiments found model-family bias: Anthropic and OpenAI judge models systematically favored models from their own labs in close comparisons. This creates a substantial risk for automated benchmarking because a judge’s apparent ranking may reflect evaluator affiliation rather than candidate quality.

The reported mitigation is a disinterested-judge protocol. Matchups are evaluated by a model from another lab; for Anthropic–OpenAI comparisons, Harvey uses Google’s Gemini-3.8 Flash, and it selects randomly when both primary judges are considered disinterested. The source reports that the two judges agreed on the winner in 78% of non-Anthropic, non-OpenAI matchups and in 89% of matchups decided by more than 0.05 rubric points. These figures are evidence for improved consistency under the stated protocol, but they do not establish that the judges are unbiased in general. Independent human audits and continued slice-based testing would still be needed.

Using the disinterested-judge approach, Harvey reports that Tenet improved over the Kimi K3 base model by approximately 130 ELO points on held-out LAB tasks and was preferred in more than two out of three responses. Axis-level analysis attributed the gains primarily to substance, particularly accuracy and reasoning. Tenet’s tone and style scores were lower than Kimi K3’s, indicating that the post-training strategy improved legal analysis while sometimes producing denser and less easily parsed work product. This is an important production tradeoff: a model that is stronger on legal substance may not be the best choice for every user workflow if readability and straightforward communication are equally important.

## Results and tradeoffs

The case demonstrates a practical evaluation architecture for LLMs in a high-stakes domain: expert-designed rubrics, agentic model-based comparison, grounded verification, human review, and axis-level analysis. It also illustrates why model-based evaluation should not be treated as a single authoritative score. GRMs were more decisive than lawyers, which can be valuable for scaling but can also hide uncertainty. They sometimes traded critical hallucinations or mistakes against less important qualities in ways lawyers rejected. They also sometimes selected a winner when both candidate answers were unsatisfactory, a failure mode that should be represented explicitly in evaluation interfaces and downstream training data.

The strongest conclusion is therefore not that GRMs replace lawyers. Rather, they provide leverage for lawyers by making relevant evidence and tradeoffs easier to inspect and by producing scalable preference annotations. Human experts remain the final reference for overall usefulness, especially in cases where legal risk, usability, or the acceptability of a serious error dominates other criteria. For production LLMOps, Harvey’s approach suggests maintaining separate metrics for accuracy, grounding, reasoning, style, tone, and alignment instead of collapsing all quality dimensions into one reward. It also suggests monitoring judge-family bias, preserving human review for ambiguous cases, and checking whether improvements in aggregate ELO translate into safer and more useful legal work products in the intended workflows.
