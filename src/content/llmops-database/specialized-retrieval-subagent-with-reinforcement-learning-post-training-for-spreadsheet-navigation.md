---
title: "Specialized Retrieval Subagent with Reinforcement Learning Post-Training for Spreadsheet Navigation"
slug: "specialized-retrieval-subagent-with-reinforcement-learning-post-training-for-spreadsheet-navigation"
draft: false
llmopsTags:
  - "document-processing"
  - "data-analysis"
  - "reinforcement-learning"
  - "agent-based"
  - "multi-agent-systems"
  - "latency-optimization"
  - "cost-optimization"
  - "harness-engineering"
  - "evals"
  - "pytorch"
  - "fastapi"
  - "anthropic"
  - "hugging-face"
industryTags: "finance"
company: "Ramp"
summary: "Ramp built Fast Ask, a specialized retrieval subagent for their spreadsheet agent Ramp Sheets, to address the problem that their main agent spent 17.8% of tool calls on inefficient spreadsheet navigation and data retrieval. They post-trained an open-source Qwen 3.5-35B-A3B model (with approximately 3B active parameters) using reinforcement learning with Prime Intellect's training stack, creating a smaller, faster specialist model for retrieval tasks. The resulting model achieved 4 percentage points higher exact-match accuracy than Claude Opus 4.6 while running at Haiku 4.5 latency, demonstrating that a targeted RL-trained subagent can outperform frontier models on specific production tasks at lower cost and latency."
link: "https://x.com/RampLabs/status/2052447438795833506"
year: 2026
seo:
  title: "Ramp: Specialized Retrieval Subagent with Reinforcement Learning Post-Training for Spreadsheet Navigation - ZenML LLMOps Database"
  description: "Ramp built Fast Ask, a specialized retrieval subagent for their spreadsheet agent Ramp Sheets, to address the problem that their main agent spent 17.8% of tool calls on inefficient spreadsheet navigation and data retrieval. They post-trained an open-source Qwen 3.5-35B-A3B model (with approximately 3B active parameters) using reinforcement learning with Prime Intellect's training stack, creating a smaller, faster specialist model for retrieval tasks. The resulting model achieved 4 percentage points higher exact-match accuracy than Claude Opus 4.6 while running at Haiku 4.5 latency, demonstrating that a targeted RL-trained subagent can outperform frontier models on specific production tasks at lower cost and latency."
  canonical: "https://www.zenml.io/llmops-database/specialized-retrieval-subagent-with-reinforcement-learning-post-training-for-spreadsheet-navigation"
  ogTitle: "Ramp: Specialized Retrieval Subagent with Reinforcement Learning Post-Training for Spreadsheet Navigation - ZenML LLMOps Database"
  ogDescription: "Ramp built Fast Ask, a specialized retrieval subagent for their spreadsheet agent Ramp Sheets, to address the problem that their main agent spent 17.8% of tool calls on inefficient spreadsheet navigation and data retrieval. They post-trained an open-source Qwen 3.5-35B-A3B model (with approximately 3B active parameters) using reinforcement learning with Prime Intellect's training stack, creating a smaller, faster specialist model for retrieval tasks. The resulting model achieved 4 percentage points higher exact-match accuracy than Claude Opus 4.6 while running at Haiku 4.5 latency, demonstrating that a targeted RL-trained subagent can outperform frontier models on specific production tasks at lower cost and latency."
notion:
  pageId: "390f8dff-2538-8089-adf2-d719c75ffca7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-01T19:34:00.000Z"
  lastEditedTime: "2026-07-01T19:35:00.000Z"
  publishedAt: "2026-07-01T19:41:25Z"
---

## Overview

Ramp developed Fast Ask as a specialized retrieval subagent within their Ramp Sheets spreadsheet agent system to solve production performance issues. The case study provides detailed insights into the practical application of reinforcement learning post-training for a production LLM system, including environment design, reward engineering, training infrastructure, and deployment considerations. This represents an important LLMOps pattern: carving out narrow, verifiable subtasks from a general agent workflow and training specialized smaller models to handle them more efficiently.

## Production Problem and Motivation

The core production issue Ramp observed was substantial inefficiency in their agentic spreadsheet system. Through production trace analysis, they discovered that the main agent spent 17.8% of all tool calls on navigation and data retrieval activities—opening tabs, reading ranges, and filtering irrelevant sheets. Critically, about 75% of these retrieval calls were immediately followed by another read call, indicating that the agent frequently failed to retrieve the correct information on the first attempt. This represented both a latency problem (impacting user experience) and a cost problem (wasted API calls to expensive frontier models).

Rather than attempting to solve this through better prompting techniques, which would still leave a large, slower general-purpose model responsible for navigation, Ramp chose to architect the solution differently by creating a specialized retrieval subagent. This architectural decision reflects sophisticated LLMOps thinking about decomposing complex agent workflows into specialized components with different performance characteristics.

## Why Retrieval Warranted a Specialized Subagent

The case study articulates three key properties that made retrieval a strong candidate for specialization. First, isolating retrieval protects the main agent's context window from pollution by irrelevant data—if the main model reads every tab, it burns tokens on irrelevant rows and can anchor on decoys, whereas a retrieval subagent can return only the answer-relevant cells or computed values. Second, retrieval is latency-sensitive; the user experience degrades substantially if the main agent spends many turns exploring the workbook rather than getting needed facts quickly. Third, and most importantly for the training approach, retrieval is verifiable—many spreadsheet questions resolve to exact values (dates, invoice IDs, amounts, yes/no answers, row references) rather than requiring subjective evaluation. This verifiability makes the task a natural fit for reinforcement learning since trajectories can be scored deterministically without requiring human labelers or LLM-as-judge approaches.

These design considerations reflect mature LLMOps thinking about where to invest in model specialization versus using general-purpose models. The deterministic reward signal in particular enabled a training approach that would be much harder for more subjective tasks.

## Technical Architecture and Model Selection

Ramp selected Qwen/Qwen3.5-35B-A3B as the base model, a mixture-of-experts architecture with approximately 3 billion active parameters despite the larger total parameter count. This choice balances capability with latency requirements—the model needed to be sophisticated enough to handle complex spreadsheet navigation but fast enough to meet production latency targets. The resulting trained model runs at approximately Haiku 4.5 latency, making it suitable for synchronous user-facing interactions.

The training was conducted on Prime Intellect's Lab platform using their Hosted Training infrastructure and verifiers framework. Importantly, the training environment mirrors the production deployment harness directly, which reduces the risk of train-serve skew—a common LLMOps challenge where models perform differently in training versus production environments. This direct mirroring is a best practice that likely contributed to the successful deployment.

## Training Infrastructure and Configuration

The training run used 100 training steps with a batch size of 256 and 8 rollouts per example, representing substantial computational investment. Evaluation ran every 20 steps on 128 held-out examples, with the base model evaluated alongside the trained checkpoint to track improvement. Critically, they disabled "thinking mode" during evaluation to match the low-latency production setting they cared about—another example of ensuring that evaluation conditions match production requirements.

The training took approximately 26 hours to complete, which represents a reasonable investment for a production system but also demonstrates that specialized RL training is not trivial to execute. The case study notes that reward climbed from roughly 0.2 to 0.8 over the first 40 steps before plateauing, with most gains coming from the model learning to produce correctly parsed and formatted answers and planning tighter trajectories that waste fewer turns.

## Synthetic Dataset Design

Rather than collecting human demonstrations or real production data, Ramp generated a synthetic dataset of business workbooks with natural language questions and ground truth answers. The workbooks were designed to reflect real finance workflows including revenue rollups, invoice reconciliation, spend analysis, time-filtered lookups, and multi-join aggregations. This synthetic approach offers several LLMOps advantages: it enables scaling the task distribution while keeping it reliable, allows generation of many variations of the same retrieval problem with exact control over answers, and permits varying surface phrasing without changing underlying skills being trained.

The dataset includes 14 task types across three families, with each task having three differently phrased variants (such as investor memo requests, collections follow-ups, and fundraise model questions) to prevent overfitting to single prompt templates. Reconciliation tasks add additional variation through invoice descriptors, payment clues, and customer/date/amount signatures. Training batches use balanced round-robin sampling where every pass through the dataset shuffles and emits all 14 task types before repeating, ensuring uniform coverage across the skill distribution.

The synthetic world maintains internal consistency with customers, vendors, SKUs, contract tiers, payment methods, adjustment reasons, and entry sources sampled from fixed vocabularies, giving the model realistic entity structure across thousands of generated workbooks. This attention to maintaining realistic structure while enabling synthetic scale represents sophisticated dataset engineering for agent training.

## Adversarial Workbook Design for Robustness

A particularly interesting aspect of the training data is the use of difficulty levels to control navigation pressure and train robustness. Easy tasks usually provide a direct path to the answer, while medium and hard tasks use three strategies to increase difficulty: distractors, unreliable shortcuts, and ambiguous identifiers.

Decoy sheets are included at medium and hard difficulty—for example, revenue workbooks include finance-adjacent but answer-irrelevant tabs like HiringPlan and CapTable with realistic but unhelpful data. Models that read indiscriminately waste their turn budget on these distractors. Partial helper summaries provide realistic but incomplete shortcuts—summary sheets like RegionalPnL or SpendSummary that look useful but omit computed columns needed to answer questions directly, requiring the model to verify or aggregate from source data. At hard difficulty, helper summaries are removed entirely. Identifier obfuscation appears in roughly 15-20% of reconciliation tasks, where questions reference invoices not by their ID but by payment clues or customer signatures, requiring the model to resolve references before answering.

This adversarial design approach addresses a critical LLMOps challenge: ensuring models are robust to the messy, ambiguous conditions they'll face in production rather than overfitting to clean, well-structured evaluation scenarios. The difficulty knobs allow training on the kinds of navigation failures the model would face outside the synthetic environment.

## Tool Interface Design

The model operates with a minimal tool interface consisting of only three tools and a 15-turn budget. The get_workbook_metadata tool returns sheet names, tab colors, and approximate used ranges. The read_ranges tool returns cell data with a hard cap of 1,000 cells per call (oversized requests are rejected). The run_python tool executes sandboxed Python with only the standard library available, with state persisting across calls within a rollout.

Keeping the tool space this small is intentional for LLMOps reasons—with only three tools, efficient versus wasteful trajectories are easier to distinguish in the reward signal. This simplicity also reduces the action space the model must learn to navigate, making training more tractable. The hard caps (15 turns, 1,000 cells) provide clear boundaries that mirror production constraints and prevent runaway execution.

## Reward Function Engineering

The reward function is carefully designed around the production needs of Fast Ask, combining correctness with efficiency incentives:

R(y_i) = 1.0 · correct(y_i) + 0.1 · efficiency(y_i) + 0.05 · concise(y_i)

Correctness dominates with a 1.0 weight, firing only when the final "ANSWER:" line parses into the expected type and exact-matches ground truth. The efficiency and concision terms are small shaping rewards that cannot rescue a wrong answer but distinguish between correct trajectories—a correct answer in five turns should score slightly higher than the same answer after wandering through irrelevant sheets.

This reward design reflects sophisticated understanding of multi-objective optimization in production systems. The dominant correctness term ensures the model never sacrifices accuracy for speed, while the shaping rewards nudge behavior toward production requirements (low latency, compact context consumption) when multiple correct paths exist. The deterministic nature of this reward function is a significant advantage over subjective tasks requiring LLM-as-judge evaluation, eliminating a source of noise and potential bias in the training signal.

## Reinforcement Learning Approach: GRPO

Ramp used Group Relative Policy Optimization (GRPO), a policy gradient method that estimates advantages from groups of rollouts sampled for the same prompt. For each spreadsheet question, the model samples eight trajectories, each representing the full interaction trace: tool calls, spreadsheet reads, Python execution, and final answer. The verifier scores each trajectory with the deterministic reward function.

Rather than fitting a separate value model (as in PPO), GRPO normalizes each rollout's reward relative to the other rollouts in its group. The advantage for rollout i is computed as the deviation from the group mean: A_i = R(y_i) - (1/G) Σ R(y_k). This relative reward difference becomes the learning signal—if one trajectory answers correctly in five turns while another spends its budget on decoy tabs and fails, that difference drives learning.

The case study emphasizes that this approach is a natural fit for tool-using agents because they never need to label the correct next tool call—they only score the final trajectory. The math pushes probability mass toward behaviors that made the final answer correct: reading metadata first, avoiding decoy sheets, using helper summaries when valid, falling back to raw rows when needed, and emitting a parseable "ANSWER:" line. This eliminates the need for expensive human annotation of correct tool-use sequences while still providing effective learning signal.

## Asynchronous Off-Policy Training for Practical Execution

A critical LLMOps detail is that rollout generation is much slower than ordinary supervised fine-tuning data loading because rollouts consist of multi-turn trajectories where the agent inspects workbook metadata, reads ranges, runs Python, and emits answers. Prime Intellect's prime-rl stack addresses this with asynchronous off-policy training, which enables learning from trajectories generated by slightly older versions of the model rather than requiring every rollout to come from the latest weights.

This architecture allows rollout workers to keep generating trajectories while the trainer updates the model concurrently. Some trajectories come from a slightly older policy, but the objective corrects for this bounded staleness with importance weighting: ρ_t(θ) = π_θ(y_t | x, y<t) / π_gen(y_t | x, y<t). This ratio asks how much more or less likely the current model is to produce this token than the model that originally generated it.

Prime Intellect uses an AIPO-style clipped importance weighted objective to keep updates stable: J(θ) = Σ min(ρ_i,t(θ)A_i, clip(ρ_i,t(θ), 1-ε, 1+ε)A_i). This matters for tool-use tasks because if training had to stop and wait for perfectly fresh trajectories after every update, GPU utilization would suffer significantly. Off-policy RL enables continuous rollout generation while the trainer keeps learning from recently generated traces, making the economics of RL training more practical.

This infrastructure detail represents an important LLMOps consideration—the practical feasibility of training approaches depends not just on algorithmic properties but on efficient use of computational resources. The asynchronous architecture likely made the 26-hour training time feasible where a synchronous approach might have taken much longer.

## Evaluation Results and Production Performance

The evaluation compared the base model, trained model, and Claude family models on a held-out task set measuring exact-match accuracy and wall-clock time per rollout. The base Qwen3.5-35B-A3B model achieved 56% accuracy, while the trained Fast Ask model achieved 66% accuracy—a 10 percentage point improvement. Notably, training also reduced average completion time rather than increasing it, suggesting the model learned more efficient navigation patterns.

The trained model beat Claude Opus 4.6 (62% accuracy) by 4 percentage points while running at Haiku 4.5 latency. This represents the core LLMOps value proposition: a small specialized model trained for a specific production task can outperform much larger frontier models on that task while being substantially faster and cheaper to run. Claude Haiku 4.5 achieved 56% accuracy, the same as the base model but likely at different latency/cost profiles.

An interesting training dynamic observation: total cells read per rollout stayed roughly flat during training. This suggests the model did not learn to read less overall but instead learned to allocate its reads better—focusing on relevant sheets rather than reducing information consumption. This nuance is important for understanding what the model actually learned versus what might have been expected.

## LLMOps Patterns and Broader Implications

The case study explicitly frames Fast Ask as an example of a pattern they expect to use more broadly: train small, verifiable subagents for narrow bottlenecks, and let frontier models spend their tokens on judgment instead of retrieval. This architectural pattern addresses several LLMOps challenges simultaneously. It allows optimization of different parts of an agent system for different objectives (accuracy vs. latency vs. cost), reduces the burden on expensive frontier models, and enables specialization where it provides value while maintaining generality where it's needed.

The authors emphasize that the important work was not in model architecture or scale but in environment design: the right tasks, a minimal tool interface, and a reward function grounded in how the product actually works in production. This perspective reflects mature understanding that LLMOps success often depends more on engineering practices—careful task decomposition, production-aligned evaluation, and reward engineering—than on access to the largest models or most compute.

## Critical Assessment and Limitations

While the case study presents impressive results, several aspects deserve balanced consideration. First, the 4 percentage point improvement over Claude Opus 4.6, while meaningful, represents approximately 6% relative improvement on a base accuracy of 62%. This is significant but not transformational, and the business value depends on whether the cost and latency improvements justify the engineering investment in training and maintaining a custom model.

Second, the synthetic dataset approach, while elegant, creates uncertainty about real-world generalization. The case study doesn't report performance on actual production queries from real users, which may contain distributions of difficulty, ambiguity, and edge cases not captured in the synthetic data. The 14 task types may not cover the full diversity of retrieval patterns users actually need.

Third, the evaluation is purely on exact-match accuracy, which is appropriate for the deterministic nature of the task but doesn't capture whether "near miss" answers might still be useful to the main agent, or whether errors are equally costly across different types of mistakes. A more nuanced evaluation might consider partial credit or error severity.

Fourth, the case study doesn't discuss the operational complexity of maintaining a custom RL training pipeline and specialized model deployment compared to simply using API-based frontier models. The 26-hour training time, infrastructure requirements, and ongoing monitoring represent operational overhead that may be justified by the performance gains but should be considered in the total cost of ownership.

Fifth, while the asynchronous off-policy training is presented as enabling practical training, the case study doesn't quantify what fraction of trajectories were off-policy or how stale the generating policy became. High degrees of staleness could potentially impact training stability or final performance, though the clipped importance weighting is designed to mitigate this.

Finally, the comparison to Claude models establishes a performance benchmark but doesn't explore whether other approaches (retrieval-augmented generation architectures, different prompting strategies, ensemble methods) might have achieved similar improvements without custom model training. The decision to pursue RL post-training appears sound given the properties of the task, but alternative approaches are not thoroughly explored.

Despite these considerations, the case study represents a sophisticated application of LLMOps principles to a real production problem, with transparent reporting of both methods and results that enables the community to learn from the approach.
