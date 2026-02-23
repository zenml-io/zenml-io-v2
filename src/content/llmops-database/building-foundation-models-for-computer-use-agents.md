---
title: "Building Foundation Models for Computer Use Agents"
slug: "building-foundation-models-for-computer-use-agents"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "698de4ead60bc999dd678d5e"
  exportedAt: "2026-02-23T10:04:49.317Z"
  source: "live"
  lastPublished: "2026-02-12T18:34:34.752Z"
  lastUpdated: "2026-02-12T18:34:34.752Z"
  createdOn: "2026-02-12T14:34:18.818Z"
llmopsTags:
  - "poc"
  - "code-interpretation"
  - "data-analysis"
  - "fine-tuning"
  - "few-shot"
  - "prompt-engineering"
  - "model-optimization"
  - "multi-agent-systems"
  - "agent-based"
  - "instruction-tuning"
  - "evals"
  - "pytorch"
  - "open-source"
  - "documentation"
  - "anthropic"
  - "meta"
  - "google-gcp"
  - "hugging-face"
industryTags: "tech"
company: "Tzafon"
summary: "Tzafon, a research lab focused on training foundation models for computer use agents, tackled the challenge of enabling LLMs to autonomously interact with computers through visual understanding and action execution. The company identified fundamental limitations in existing models' ability to ground visual information and coordinate actions, leading them to develop custom infrastructure (Waypoint) for data generation at scale, fine-tune vision encoders on screenshot data, and ultimately pre-train models from scratch with specialized computer interaction capabilities. While initial approaches using supervised fine-tuning and reinforcement learning on successful trajectories showed limited generalization, their focus on solving the grounding problem through improved vision-language integration and domain-specific pre-training has positioned them to release models and desktop applications for autonomous computer use, though performance on benchmarks like OS World remains a challenge across the industry."
link: "https://www.youtube.com/watch?v=Hw7V7waQc0o"
year: 2026
seo:
  title: "Tzafon: Building Foundation Models for Computer Use Agents - ZenML LLMOps Database"
  description: "Tzafon, a research lab focused on training foundation models for computer use agents, tackled the challenge of enabling LLMs to autonomously interact with computers through visual understanding and action execution. The company identified fundamental limitations in existing models' ability to ground visual information and coordinate actions, leading them to develop custom infrastructure (Waypoint) for data generation at scale, fine-tune vision encoders on screenshot data, and ultimately pre-train models from scratch with specialized computer interaction capabilities. While initial approaches using supervised fine-tuning and reinforcement learning on successful trajectories showed limited generalization, their focus on solving the grounding problem through improved vision-language integration and domain-specific pre-training has positioned them to release models and desktop applications for autonomous computer use, though performance on benchmarks like OS World remains a challenge across the industry."
  canonical: "https://www.zenml.io/llmops-database/building-foundation-models-for-computer-use-agents"
  ogTitle: "Tzafon: Building Foundation Models for Computer Use Agents - ZenML LLMOps Database"
  ogDescription: "Tzafon, a research lab focused on training foundation models for computer use agents, tackled the challenge of enabling LLMs to autonomously interact with computers through visual understanding and action execution. The company identified fundamental limitations in existing models' ability to ground visual information and coordinate actions, leading them to develop custom infrastructure (Waypoint) for data generation at scale, fine-tune vision encoders on screenshot data, and ultimately pre-train models from scratch with specialized computer interaction capabilities. While initial approaches using supervised fine-tuning and reinforcement learning on successful trajectories showed limited generalization, their focus on solving the grounding problem through improved vision-language integration and domain-specific pre-training has positioned them to release models and desktop applications for autonomous computer use, though performance on benchmarks like OS World remains a challenge across the industry."
---

## Overview

Tzafon is a research lab specializing in training foundation models for computer use agents - systems where language models interact with computers by taking screenshots and issuing actions like clicks and keystrokes. The speaker, Nikita Kich, describes their journey over approximately one year of development, starting from first principles to understand how to build effective computer use agents. The company views computer use as an underappreciated but increasingly important area, with major economic implications for automating workflows and white-collar work.

The fundamental challenge they address is that current state-of-the-art models perform poorly on computer use tasks. Using the OS World benchmark as an example, even the best models struggle with relatively simple tasks like restoring a file from trash. Despite this poor performance, the economic upside for even simple workflow automation remains high, motivating continued investment in the space.

## Initial Approach and Data Infrastructure

Tzafon began with what seemed like a straightforward approach: fine-tuning models on successful trajectories of computer interactions. However, they quickly realized that regardless of the training approach, they needed infrastructure to generate interaction data at scale. This led to the creation of Waypoint, their first major technical contribution.

Waypoint is an SDK and infrastructure system for interacting with computers programmatically. It initially focused on browser automation but has expanded to support full operating system interaction. Key features include maintaining a warm pool of browsers for fast data collection, providing a clean Python SDK for scripting interactions, and supporting both browser and OS-level automation. Waypoint represents a critical piece of LLMOps infrastructure, enabling the data generation pipelines necessary for training computer use agents. The system allows researchers to script computer interactions, capture screenshots, and generate the trajectories needed for supervised learning or reinforcement learning.

## Training Challenges and Limited Generalization

With data generation infrastructure in place, Tzafon attempted the seemingly straightforward approach of generating trajectories for high-level goals (like "buy me a ticket"), taking successful trajectories, and either using supervised fine-tuning or reinforcement learning. This approach encountered several significant problems that reveal important LLMOps challenges for computer use agents.

First, the trajectory trees generated were low-entropy, meaning the model would often just follow a single path rather than exploring diverse solutions. This limits the richness of the training data and makes it difficult to learn robust policies. Second, automatic verification proved extremely challenging because language models don't understand computers well enough to reliably verify task completion from screenshots. Rewards were sparse, making reinforcement learning difficult. The only domains where they achieved success were those with verifiable rewards - specifically terminal tasks where command execution can be verified, and HTML-based tasks where ground truth answers are known.

This limited success in verifiable domains led to a critical insight: models trained on specific domains like terminal tasks or file system browsing did not generalize well to other computer use tasks. This poor generalization represents a major challenge for deploying computer use agents in production, as it would require domain-specific training for each application area rather than a general-purpose solution.

## The Grounding Problem

Through detailed examination of model failures on benchmarks, Tzafon identified what they consider the fundamental bottleneck: the grounding problem. When examining error distributions, they found that models either clicked exactly the right coordinates or were off by a large margin - there was a bimodal distribution rather than small errors around the target. This suggested the model didn't understand which visual element corresponded to the desired action target.

The root cause lies in how vision-language models are typically constructed. Most open-source multimodal models use transformers that process images by patching them into grids, flattening the patches, and treating them as tokens. Critically, the common approach is to take a pre-trained text-to-text model and attach a vision encoder after the text capabilities are already established. Because the text-to-text component is so powerful, much of the variance in multimodal tasks can be explained by the text alone, resulting in weak signal for learning visual grounding. The vision encoder doesn't develop strong spatial understanding or the ability to precisely locate elements on screen.

This diagnosis represents an important contribution to understanding LLMOps challenges for visual agents. It's not simply a matter of collecting more data or tuning hyperparameters - there's a fundamental architectural and training limitation in how existing models process spatial visual information for computer interaction tasks.

## Foundation Model Development from Scratch

Recognizing the grounding problem as fundamental, Tzafon concluded they needed either to process enormous amounts of data in pre-training to overcome the weak vision signal, or to fine-tune existing vision encoders on large volumes of screenshot data. They chose the more ambitious path of building a foundation model from scratch specifically designed for computer use.

Their pre-training process followed standard practices including data filtering, ablations, mid-training, and reinforcement learning. However, they still found attaching the vision encoder challenging. Their solution was to take the Qwen vision encoder (described as the best available open-source option) and fine-tune it extensively on screenshot-specific data. They collected data from tutorials where human instructors explain what's happening on screen, transcribed the explanations, and used this to teach the model to ground language to visual elements in computer interfaces. The speaker notes this remains ongoing research, indicating that even with their focused approach, the grounding problem is not fully solved.

An interesting operational detail is that they conducted a large portion of pre-training in a partitioned approach, which is uncommon but allowed them to make it work effectively. They also worked with mixture of experts architectures and achieved impressive throughput of 40,000 tokens per second per GPU, which was state-of-the-art at the time with modifications to PyTorch Titan.

## Infrastructure Evolution and LLMOps Maturity

Tzafon's journey reflects the broader maturation of LLMOps infrastructure over a relatively short period. When they started about a year ago, infrastructure for both pre-training and post-training was described as "really poor" - nothing worked reliably, checkpointing was problematic, and teams had to build much of their own tooling. Within six months, the situation improved dramatically. They specifically highlight PyTorch Titan and PyTorch Forge from Meta as tools that "really work" and eliminated the need to build custom infrastructure for many tasks.

This infrastructure maturation is critical for LLMOps in the computer use domain. The ability to rapidly iterate on model training, reliably checkpoint during long training runs, and achieve efficient utilization of compute resources determines what kinds of research and product development are feasible. The improvement in tooling over such a short period suggests the LLMOps ecosystem is developing rapidly to support increasingly specialized model development.

## Multi-Agent Architecture Experiments

Before settling on their foundation model approach, Tzafon experimented with a hierarchical multi-agent architecture. They attempted to use a larger "supervisor" model to break down high-level tasks into subtasks and guide a smaller model executing the actual computer interactions. They used Gemma as the supervisor and Qwen as the executor. This approach seemed promising because task decomposition is a more natural NLP task that might be more amenable to reinforcement learning than low-level computer control.

Despite having to implement their own RL infrastructure (before good solutions existed), they were able to make this approach work to some degree. However, it suffered from the same generalization problems as their other early approaches - models trained on specific domains didn't transfer to others. This multi-agent experiment is noteworthy from an LLMOps perspective because it represents an architectural pattern that's increasingly common: using different models with different capabilities and scales for different parts of a complex task. While it didn't solve Tzafon's specific problems, such hierarchical approaches remain relevant for production LLM systems dealing with complex multi-step tasks.

## Evaluation and Benchmarking Challenges

Throughout their work, Tzafon dealt with significant evaluation challenges that are instructive for LLMOps practitioners. The speaker notes there aren't many good benchmarks for computer use, with OS World being the primary one people focus on. Even simple tasks like restoring a file from trash show poor performance across all models, with even the best systems achieving relatively low success rates.

The benchmark challenge goes deeper than just having limited evaluation options. As mentioned earlier, automatic verification of task completion is fundamentally difficult for computer use agents because it requires understanding whether a computer is in the correct state after a sequence of actions. This is unlike traditional NLP tasks where outputs can be compared to ground truth or evaluated by other language models. For computer use, you need either manual evaluation (expensive and slow) or domain-specific verification logic (limiting generalization).

This evaluation challenge has significant implications for LLMOps. Without reliable automated evaluation, it's difficult to run the rapid iteration cycles needed for model improvement. It's hard to know whether a model change is actually an improvement without expensive human evaluation. The fact that Tzafon could only make progress in domains with verifiable rewards (terminal commands, HTML tasks with known answers) illustrates how the evaluation problem constrains what's possible in production.

## Production Deployment Considerations

While much of the presentation focuses on research and model development, Tzafon is working toward production deployment with a desktop application currently in beta. The application would allow the agent to act autonomously on a user's computer, representing a significant deployment challenge from an LLMOps perspective.

Deploying computer use agents in production raises concerns around reliability, safety, and user trust that go beyond typical LLM deployment challenges. The agent has direct access to a user's computer, potentially handling sensitive information and performing irreversible actions. The poor performance on benchmarks even for state-of-the-art models suggests that production deployments will need extensive safety mechanisms, human oversight options, and carefully scoped use cases where the risk of errors is acceptable.

The speaker's emphasis on domains with verifiable rewards suggests a pragmatic deployment strategy: focus initially on use cases where task completion can be automatically verified, reducing the risk of the agent making errors that go undetected. This represents a sound LLMOps principle of matching deployment scope to model capabilities and verification infrastructure.

## Open Source Infrastructure and Tools

Tzafon's Waypoint SDK represents a contribution to the open-source LLMOps ecosystem for computer use agents. The tool is positioned as useful for anyone needing to collect data at scale or maintain fleets of browsers or lightweight Linux environments. This reflects a common pattern in the LLMOps space where companies developing specialized AI capabilities also release infrastructure tools that benefit the broader community while potentially creating adoption pathways for their own models and products.

The technical details provided about Waypoint - maintaining warm pools for fast interaction, providing clean SDK interfaces, supporting both browser and OS-level automation - reflect important considerations for production LLM infrastructure. Latency matters when generating training data at scale or when deploying agents that users interact with. Having a warm pool of ready-to-use environments rather than spinning up new instances for each interaction can dramatically improve throughput.

## Critical Assessment and Balanced Perspective

While the presentation showcases Tzafon's technical progress, several aspects warrant critical examination from an LLMOps perspective. First, the fundamental performance problem remains largely unsolved - even with their specialized approaches, computer use agents perform poorly on standard benchmarks. The speaker is transparent about this, acknowledging that their grounding problem solution is "ongoing research" rather than a completed achievement.

Second, the lack of generalization across domains is a significant limitation for production deployment. If models need domain-specific training for each new application area, the operational overhead of maintaining and deploying computer use agents becomes substantial. This challenges the economic value proposition unless agents can be deployed in high-value, specific domains where custom training is justified.

Third, the evaluation and verification challenges remain largely unaddressed. While Tzafon found success in domains with verifiable rewards, this doesn't solve the broader problem of how to reliably evaluate agent performance across diverse computer use tasks. Without better evaluation infrastructure, it's difficult to see how the field can make rapid progress or how production deployments can maintain quality assurance.

Finally, the infrastructure dependency revealed in their journey - needing tools like PyTorch Titan to mature before certain training approaches became feasible - highlights how LLMOps for computer use agents is still in an early stage. Teams need cutting-edge infrastructure and significant research investment just to achieve basic capabilities, suggesting production-ready computer use agents are still some distance away for most organizations.

That said, Tzafon's systematic approach to identifying bottlenecks, building necessary infrastructure, diagnosing fundamental problems like grounding, and working toward foundation model solutions represents solid LLMOps practice. Their transparency about what didn't work and ongoing challenges provides valuable lessons for others working in this space. The progression from naive fine-tuning attempts through infrastructure building to fundamental model development reflects the kind of deep technical investment likely necessary for advancing computer use agents from research to production-grade systems.