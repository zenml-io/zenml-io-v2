---
title: "Scaling Reinforcement Learning for Long-Horizon Agent Tasks"
slug: "scaling-reinforcement-learning-for-long-horizon-agent-tasks"
draft: false
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "question-answering"
  - "summarization"
  - "reinforcement-learning"
  - "rlhf"
  - "prompt-engineering"
  - "few-shot"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "memory"
  - "pytorch"
  - "monitoring"
  - "open-source"
  - "meta"
  - "openai"
  - "google-gcp"
industryTags: "research-academia"
company: "General Reasoning"
summary: "General Reasoning, a London-based reinforcement learning company founded by former Meta AI researchers, is tackling the challenge of enabling AI agents to solve long-horizon tasks that require extended reasoning over potentially billions of tokens. The problem they address is that current LLMs, even frontier models, fail at complex real-world tasks requiring sustained reasoning, open-ended exploration, and multi-agent interactions—as demonstrated by their Kelly Bench benchmark where all major models lost money on sports betting prediction tasks. Their solution involves combining several techniques: context window compaction with RL optimization, value models (critics) to handle sparse rewards and credit assignment in long trajectories, specialized tools like file systems and self-search capabilities, and pipelined RL training to optimize GPU utilization. The work builds on historical lessons from Meta's Llama post-training and earlier reasoning experiments, showing that while RLHF and PPO with verifiable rewards can improve performance, the emergent self-reflective reasoning behaviors require better base models, larger context windows, and more compute—a finding validated by the later success of models like DeepSeek R1 and OpenAI's O1."
link: "https://www.youtube.com/watch?v=2bvtay8wGYI"
year: 2026
seo:
  title: "General Reasoning: Scaling Reinforcement Learning for Long-Horizon Agent Tasks - ZenML LLMOps Database"
  description: "General Reasoning, a London-based reinforcement learning company founded by former Meta AI researchers, is tackling the challenge of enabling AI agents to solve long-horizon tasks that require extended reasoning over potentially billions of tokens. The problem they address is that current LLMs, even frontier models, fail at complex real-world tasks requiring sustained reasoning, open-ended exploration, and multi-agent interactions—as demonstrated by their Kelly Bench benchmark where all major models lost money on sports betting prediction tasks. Their solution involves combining several techniques: context window compaction with RL optimization, value models (critics) to handle sparse rewards and credit assignment in long trajectories, specialized tools like file systems and self-search capabilities, and pipelined RL training to optimize GPU utilization. The work builds on historical lessons from Meta's Llama post-training and earlier reasoning experiments, showing that while RLHF and PPO with verifiable rewards can improve performance, the emergent self-reflective reasoning behaviors require better base models, larger context windows, and more compute—a finding validated by the later success of models like DeepSeek R1 and OpenAI's O1."
  canonical: "https://www.zenml.io/llmops-database/scaling-reinforcement-learning-for-long-horizon-agent-tasks"
  ogTitle: "General Reasoning: Scaling Reinforcement Learning for Long-Horizon Agent Tasks - ZenML LLMOps Database"
  ogDescription: "General Reasoning, a London-based reinforcement learning company founded by former Meta AI researchers, is tackling the challenge of enabling AI agents to solve long-horizon tasks that require extended reasoning over potentially billions of tokens. The problem they address is that current LLMs, even frontier models, fail at complex real-world tasks requiring sustained reasoning, open-ended exploration, and multi-agent interactions—as demonstrated by their Kelly Bench benchmark where all major models lost money on sports betting prediction tasks. Their solution involves combining several techniques: context window compaction with RL optimization, value models (critics) to handle sparse rewards and credit assignment in long trajectories, specialized tools like file systems and self-search capabilities, and pipelined RL training to optimize GPU utilization. The work builds on historical lessons from Meta's Llama post-training and earlier reasoning experiments, showing that while RLHF and PPO with verifiable rewards can improve performance, the emergent self-reflective reasoning behaviors require better base models, larger context windows, and more compute—a finding validated by the later success of models like DeepSeek R1 and OpenAI's O1."
notion:
  pageId: "3b4f8dff-2538-8065-be7e-dcef47c728b1"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:32:00.000Z"
  lastEditedTime: "2026-08-06T11:32:00.000Z"
  publishedAt: "2026-08-06T11:45:27Z"
---

## Overview

General Reasoning is a London-based AI research company founded by former Meta AI researchers who worked on the Llama series and other foundational models. The company focuses specifically on scaling reinforcement learning techniques to enable AI agents to tackle long-horizon tasks—problems that may require the equivalent of billions of tokens of reasoning, far beyond current context window limitations. The founders bring deep production experience from Meta's post-training efforts on Llama 2 and Llama 3, as well as earlier work on models like Galactica. Their work represents a continuation and evolution of ideas around reasoning, reinforcement learning from human feedback, and agent-based systems that emerged during the 2020-2023 period of rapid LLM advancement.

The central thesis of General Reasoning's work is that long-horizon tasks represent not just an engineering challenge but a fundamental shift in mindset for how we approach AI systems. If humanity's biggest challenges—curing cancer, solving millennium prize problems, or enabling Mars colonization—require sustained effort over extended periods, then AI systems must be designed to think and operate over correspondingly long horizons. This requires rethinking algorithms, environments, and compute allocation in ways that current short-horizon benchmarks and training paradigms do not address.

## Historical Context and Production Lessons

The founders' journey through production LLM development at Meta provides crucial context for understanding their current approach. The team was part of the Papers With Code startup acquired by Meta in 2019, which then transitioned into research work on models like Galactica and the Llama series. A particularly instructive episode was the November 2022 launch of Galactica, which occurred just two weeks before ChatGPT's release. Galactica was a strong base model for scientific domains, outperforming models like PaLM, Chinchilla, and GPT-3.5 on scientific benchmarks with significantly less compute. On mathematical reasoning tasks, it achieved 36% accuracy compared to PaLM's 19% despite being 30 billion parameters versus 540 billion—demonstrating an order of magnitude improvement in efficiency.

However, Galactica launched as a base model without reinforcement learning post-training, and the public demo exposed typical base model behaviors like hallucination and producing nonsensical outputs when given adversarial prompts. This created a media firestorm and the demo was pulled. Meanwhile, ChatGPT launched with RLHF and became a massive success, providing what the speaker describes as a natural experiment demonstrating that good base models alone are insufficient for production deployment. The lesson was clear: RLHF and post-training with reinforcement learning are essential for making LLMs into usable products rather than research artifacts.

This lesson was actually visible even before ChatGPT in OpenAI's InstructGPT paper from early 2022, which showed that a 1.3 billion parameter model with RLHF could outperform 175 billion parameter models without it—two orders of magnitude fewer parameters achieving better results through alignment. Galactica did introduce several important innovations that became relevant later, including high-quality curated datasets rather than just scaling token count, multi-epoch training on repeated data, and the concept of "thinking tokens"—special tags that delineate internal reasoning steps, essentially an internal working memory for the model to spend inference compute before producing an answer.

After Galactica, the team at Meta worked on post-training for Llama 2 and Llama 3, but also pursued unpublished research on reasoning. They attempted to apply reinforcement learning specifically to optimize what happens inside those thinking tokens—essentially RL pressure on the reasoning process itself. Their recipe involved continued pre-training of Llama 2 on mathematics and science data to fix the weak math corpus, then PPO with verifiable rewards initialized from a strong outcome reward model and value model. This achieved state-of-the-art results on math and reasoning internally at Meta, but notably did not produce the kind of inference-time scaling and reflective, self-correcting behavior that later characterized OpenAI's O1 and DeepSeek's R1 models.

The speaker reflects that when DeepSeek R1 emerged in early 2024 using similar techniques but achieving those emergent behaviors, it became clear that better base models, larger context windows, and more RL compute were the key differences—a pure manifestation of the "bitter lesson" in AI. The fact that OpenAI had GPT-4-level models earlier allowed them to see further and discover these behaviors before others could replicate the experiments. This sociological aspect of research—that having better computational resources and models lets you observe emergent phenomena earlier—is a significant insight for LLMOps practitioners.

## The Long-Horizon Challenge

Current LLMs operate with context windows around 1 million tokens, but truly long-horizon tasks could require tens to hundreds of billions of tokens. Consider the analogy to Andrew Wiles proving Fermat's Last Theorem over more than 10 years—reading papers, writing in notebooks, taking walks to generate creative ideas. If translated to tokens, this process would vastly exceed any current context window. This mismatch between task requirements and model capabilities represents a fundamental barrier.

General Reasoning identifies three core technical challenges specific to long-horizon RL:

The first is that gradient variance scales with trajectory length. Longer episodes mean noisier gradients, making training unstable and sample-inefficient. Second, rewards become increasingly sparse—feedback comes only after very long sequences of actions, making it difficult for the model to learn which specific decisions contributed to eventual success or failure. This connects to the third challenge: credit assignment, determining which actions in a long sequence deserve credit for the eventual outcome. Additionally, variable-length trajectories complicate batch training and optimization.

To address these challenges, General Reasoning emphasizes the use of value models (critics) alongside policy models. While simpler approaches like GRPO have gained popularity for their ease of implementation, value models provide specific advantages for long-horizon tasks. They reduce gradient variance through baseline subtraction, operate at the trajectory level which fits well with compaction approaches, encourage batch diversity, and enable bootstrapping—getting learning signal before the end of an episode, which is crucial when episodes might take weeks to complete.

## Technical Approach: Compaction, Tools, and Pipeline RL

One of General Reasoning's core techniques is compaction. When the context window fills up, the system generates a summary of what has happened so far, then continues generating from that compressed representation. This allows reasoning chains to extend beyond the hard limit of the context window. Critically, they apply RL optimization both to the compaction process itself and to the task—essentially learning how to summarize effectively for continued reasoning. This "kills two birds with one stone" by treating summarization as part of the reinforcement learning objective rather than a separate engineering concern.

The system also provides tools to help agents manage long contexts:

File system tools act as external scratchpads where the agent can write reasoning thoughts and intermediate results, essentially extending working memory beyond the context window. Self-search tools allow agents to search over their previous trajectory, retrieving relevant past reasoning without maintaining everything in context. Archive tools enable building upon previous results, particularly valuable in scenarios like autonomous research where each experiment can inform the next. However, the team notes the need for careful design to prevent agents from "cheating" by simply retrieving previous answers without genuine reasoning.

GPU utilization presents unique challenges for long-horizon RL. General Reasoning discusses the trade-offs between training compute and inference compute when dealing with trajectories that might take days or weeks to complete. Pipeline RL is their approach to optimizing this balance. Traditionally, RL training waits for inference to fully complete before training begins. Pipeline RL instead begins training on completed sequences while inference continues on others, trading off some degree of off-policy learning for much better GPU utilization. From their experience, going up to eight steps off-policy is acceptable—the bias introduced is outweighed by the efficiency gains.

However, for truly long-horizon tasks where inference takes weeks, even this approach hits limits. Trajectories will inevitably extend beyond the eight-step off-policy constraint, leaving GPUs idle waiting for episodes to complete. This is where value model bootstrapping becomes essential. By generating value estimates before episode completion—analogous to dopamine in human brains providing anticipatory reward signals—the system can continue training without waiting for final outcomes. This fully utilizes GPU resources but introduces value model bias as a trade-off. The speaker emphasizes that there is no perfect solution; practitioners must navigate these fundamental trade-offs based on their specific constraints.

## Evaluation and Infrastructure: Kelly Bench

General Reasoning developed Kelly Bench as a benchmark specifically designed to test long-horizon reasoning capabilities. The benchmark drew mainstream attention, being featured on the front page of the Financial Times. In Kelly Bench, agents are given machine learning tools and tasked with building models to predict and bet on football match outcomes over a full year horizon, specifically Premier League matches. Each model starts with 100,000 currency units, and success is measured by profit and loss over the season.

The results were sobering: all frontier models tested lost money. Every major LLM available at the time failed to successfully navigate this long-horizon, real-world scenario. The benchmark resonated publicly precisely because it connects to real-world outcomes—sports betting is a multi-billion dollar industry where actual money is at stake, unlike artificial kaggle-style competitions. This failure captured public imagination and highlighted that despite impressive performance on standard benchmarks, current models struggle with sustained, open-ended reasoning in complex domains.

The speaker attributes these failures to several biases in current AI development. The industry is overly focused on coding and procedural tasks that are typically formulated as "do this, fix that" with one or two clear solutions, leaving little room for creativity. There is insufficient focus on truly open-ended tasks that reflect real-world complexity and uncertainty. Current benchmarks also fail to adequately simulate multi-agent environments where other actors have different goals and strategies, a fundamental aspect of real-world scenarios like markets, negotiations, or competitive domains.

General Reasoning has also launched Open Review, a platform hosted at openreview.ai that provides over 350 environments accessible through a single API endpoint. They use this infrastructure internally for their RL research, and it is also being adopted by frontier labs and newer AI companies. This represents an attempt to standardize and democratize access to diverse evaluation environments suitable for agent training, addressing the infrastructure gap for long-horizon research.

## Production Considerations and Trade-offs

The talk reveals several important considerations for practitioners working with RL-enhanced LLMs in production settings:

The choice between simple approaches like GRPO versus more complex value model architectures depends heavily on the task horizon. For short-horizon tasks, the simplicity of GRPO may outweigh the benefits of critics. For long-horizon scenarios, the variance reduction, trajectory-level optimization, and bootstrapping capabilities of value models become essential despite the added complexity of training a second model alongside the policy.

Infrastructure and compute allocation require careful thought. The team emphasizes that long-horizon tasks shift the balance between inference compute and training compute. Traditional RL setups may assume quick episode completion, but production systems for complex reasoning must handle episodes that take hours, days, or longer. Pipeline approaches that maximize GPU utilization through controlled off-policy learning become crucial for economic viability.

The evolution of base models fundamentally changes what is possible with RL. The speaker's experience showing that the same RL techniques applied to Llama 2 versus later, better base models yielded qualitatively different behaviors illustrates that infrastructure and algorithms alone are insufficient. The base model quality, context window size, and available compute interact in complex ways to enable emergent capabilities. This suggests that production RL systems must be designed for continuous improvement as base models evolve, rather than being static implementations.

The emphasis on verifiable rewards in their early Llama work is noteworthy. For domains like mathematics where ground truth is available, reward models can be grounded in actual correctness rather than human preference alone. This enables more reliable optimization and reduces the risk of reward hacking. However, extending this to more open-ended domains remains an active challenge.

## Critical Assessment

While General Reasoning's work represents sophisticated thinking about long-horizon RL, several aspects warrant careful consideration for practitioners evaluating these approaches:

The Kelly Bench results showing universal failure of frontier models on sports betting is striking but also expected given the domain's complexity and fundamental unpredictability. Sports outcomes involve enormous uncertainty and it is not clear that even optimal prediction models can consistently profit over long horizons in efficient betting markets. The benchmark's value lies in testing sustained reasoning and multi-step planning rather than necessarily expecting profitability. Practitioners should be cautious about interpreting negative results as purely capability failures versus inherent task difficulty.

The trade-offs between different RL approaches are presented honestly, which is valuable. The acknowledgment that value models introduce bias, that off-policy learning has limits, and that there are no perfect solutions reflects production realities. However, the talk is primarily conceptual and does not provide detailed empirical comparisons of these trade-offs across different task types or horizons. Practitioners implementing these systems will need to run their own experiments to calibrate these decisions for their specific use cases.

The infrastructure emphasis through Open Review is interesting but raises questions about standardization and reproducibility. Having 350+ environments available is valuable for diversity, but without careful curation and standardization of evaluation protocols, results across environments may not be directly comparable. The degree of adoption by other labs and the quality of the environments would be important to assess before committing to this as a primary evaluation platform.

The historical narrative about Galactica and early reasoning work at Meta provides useful context but should not be taken as definitive history. The speaker's perspective is naturally shaped by their direct involvement and subsequent founding of a competing company. Other researchers may emphasize different factors in the development of reasoning capabilities and RLHF. The claim that their team at Meta discovered similar approaches to DeepSeek R1 two years earlier but lacked the base model quality to see emergent behaviors is plausible but also convenient for establishing thought leadership. Independent verification of these claims would strengthen confidence in the historical account.

The emphasis on long-horizon tasks as a mindset rather than just an engineering problem is philosophically interesting but risks being somewhat unfalsifiable. While it is true that many important problems require sustained effort, it is less clear that the specific bottlenecks for AI systems are fundamentally about reasoning horizon versus other factors like knowledge integration, abstraction, generalization, or simply base capability. The framing may underestimate the role of architectural innovations, training data quality, or other factors in favor of RL scaling.

Overall, General Reasoning is working on genuinely important problems at the frontier of LLMOps—specifically how to deploy RL-enhanced agents on tasks that require sustained reasoning beyond current context limits. Their technical approaches around compaction, value models, pipeline RL, and specialized tools represent thoughtful engineering addressing real constraints. The Kelly Bench benchmark contributes a valuable evaluation target that connects to real-world complexity. However, practitioners should view this as early-stage research into difficult problems rather than mature production solutions, and should carefully validate claims about technique effectiveness on their own domains before adoption.
