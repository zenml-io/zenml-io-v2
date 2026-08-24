---
title: "Building Digital Twins at Population Scale: From Generative Agents to Behavioral Foundation Models"
slug: "building-digital-twins-at-population-scale-from-generative-agents-to-behavioral-foundation-models"
draft: false
llmopsTags:
  - "healthcare"
  - "question-answering"
  - "classification"
  - "summarization"
  - "chatbot"
  - "high-stakes-application"
  - "poc"
  - "prompt-engineering"
  - "few-shot"
  - "multi-agent-systems"
  - "agent-based"
  - "memory"
  - "reinforcement-learning"
  - "rlhf"
  - "evals"
  - "langchain"
  - "documentation"
  - "openai"
  - "anthropic"
  - "meta"
  - "google-gcp"
  - "microsoft-azure"
industryTags: "tech"
company: "Simile AI"
summary: "Simile AI, founded by researchers from Stanford who created the landmark 2023 \"Smallville\" generative agents paper, has evolved from academic research into a production system that creates digital twins of human populations to simulate behavior and decision-making. The company addresses the challenge of making high-stakes business and policy decisions by building behavioral foundation models trained on interviews, observational data, and randomized controlled trials rather than just web data. Their system achieves 85% accuracy in replicating human behavior compared to people replicating their own responses, significantly outperforming frontier LLMs which struggle at 20-60% accuracy. Simile now serves Fortune 100 clients like CVS, running tens of millions of simulations for concept testing, product development, and strategic decision-making, with the long-term vision of simulating all 8 billion people on Earth to tackle societal challenges like climate change and policy design."
link: "https://www.latent.space/p/simile"
year: 2026
seo:
  title: "Simile AI: Building Digital Twins at Population Scale: From Generative Agents to Behavioral Foundation Models - ZenML LLMOps Database"
  description: "Simile AI, founded by researchers from Stanford who created the landmark 2023 \"Smallville\" generative agents paper, has evolved from academic research into a production system that creates digital twins of human populations to simulate behavior and decision-making. The company addresses the challenge of making high-stakes business and policy decisions by building behavioral foundation models trained on interviews, observational data, and randomized controlled trials rather than just web data. Their system achieves 85% accuracy in replicating human behavior compared to people replicating their own responses, significantly outperforming frontier LLMs which struggle at 20-60% accuracy. Simile now serves Fortune 100 clients like CVS, running tens of millions of simulations for concept testing, product development, and strategic decision-making, with the long-term vision of simulating all 8 billion people on Earth to tackle societal challenges like climate change and policy design."
  canonical: "https://www.zenml.io/llmops-database/building-digital-twins-at-population-scale-from-generative-agents-to-behavioral-foundation-models"
  ogTitle: "Simile AI: Building Digital Twins at Population Scale: From Generative Agents to Behavioral Foundation Models - ZenML LLMOps Database"
  ogDescription: "Simile AI, founded by researchers from Stanford who created the landmark 2023 \"Smallville\" generative agents paper, has evolved from academic research into a production system that creates digital twins of human populations to simulate behavior and decision-making. The company addresses the challenge of making high-stakes business and policy decisions by building behavioral foundation models trained on interviews, observational data, and randomized controlled trials rather than just web data. Their system achieves 85% accuracy in replicating human behavior compared to people replicating their own responses, significantly outperforming frontier LLMs which struggle at 20-60% accuracy. Simile now serves Fortune 100 clients like CVS, running tens of millions of simulations for concept testing, product development, and strategic decision-making, with the long-term vision of simulating all 8 billion people on Earth to tackle societal challenges like climate change and policy design."
notion:
  pageId: "3c4f8dff-2538-8067-8a74-e8b69f33f3af"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-22T08:40:00.000Z"
  lastEditedTime: "2026-08-22T08:40:00.000Z"
  publishedAt: "2026-08-24T09:21:25Z"
---

## Overview

Simile AI represents a fascinating evolution from academic research to production LLMOps at scale. Founded by Joon Sung Park, Michael Bernstein, Percy Liang, and Lainie Yallen, the company emerged from the highly influential 2023 "Generative Agents" paper (commonly known as the Smallville paper, with over 7,200 citations). The company's core mission is to create accurate simulations of human behavior by building what they call "behavioral foundation models" - models specifically trained to replicate how real humans actually behave rather than how rational agents should behave.

The company secured a $2B Series B in 2026 backed by GreenOaks and Index Ventures, with notable individual backers including Fei-Fei Li and Andrej Karpathy. They are currently serving Fortune 100 clients including CVS, running tens of millions of simulations with reported 85-99% accuracy compared to human focus groups. This represents a significant production deployment of LLM technology for behavioral simulation at enterprise scale.

## The Problem Space and Technical Philosophy

Simile's approach addresses a fundamental limitation in current foundation models: while models like GPT-4 and Claude are trained primarily on web data (social media, Wikipedia, online text), this data represents what people *say* they do rather than what they *actually do*. The company argues that web data captures "self-exposed attitudinal data" but misses the deeper behavioral patterns and decision-making mechanisms that drive real human action. Joon Sung Park describes this as the difference between learning the "social physics" of humanity versus learning to be a rational agent.

The technical insight is that frontier models are optimized to be "super rational, objective machines" through training on high-quality reasoning data from expert programmers and scientists via platforms like Mercor and Scale. However, for accurate human simulation, models need to replicate human biases, mistakes, and irrational behavior. As Park puts it: "Simile doesn't care about any of this. The models that we're trying to create are models that are as dumb as I am, right? So if I make some mistakes, the model has to make the same mistake." This represents a fundamentally different training objective from standard LLM development.

## Data Collection and Training Methodology

Simile's production system relies on three distinct categories of training data, each serving a specific purpose in the behavioral modeling pipeline:

**Interview Data**: The company conducts long-form qualitative interviews with participants, asking them to tell "the story of your life" in depth. These interviews go beyond surface-level information to capture childhood memories, trauma, formative experiences, and life trajectories. The rationale is that this rich qualitative data provides texture and long-tail information about individuals that proves surprisingly informative for behavior prediction. This represents a departure from typical LLM training which focuses on broad corpus data rather than deep individual narratives.

**Observational and Transactional Behavioral Data**: This includes transaction logs, purchase history, and other observable behaviors that can be collected through partnerships or web scraping. This data provides base statistics of actual human behavior in various contexts. The company partners with enterprise clients to access behavioral data about their users, giving them insights into how people actually act in real-world platforms and environments.

**Randomized Controlled Trial (RCT) Data**: This is described as potentially the most important category. RCTs describe causal mechanisms - the "why" behind human decisions. By running controlled experiments where only specific variables are changed, Simile can capture how humans respond to interventions and counterfactuals. This is particularly valuable because real-world data only happens once - controlled experimental setups are rare and expensive. The company runs extensive virtual lab experiments where they invite participants to make real behavioral decisions with real stakes (for example, purchasing items in an online store that actually get delivered).

For model training, Simile performs post-training on their behavioral foundation models using this specialized data. One key paper they published demonstrated post-training on tens of thousands of RCTs from the Open Science Framework, a platform where researchers register studies and hypotheses to address replication concerns in social science. This represents a novel approach to acquiring high-quality behavioral training data at scale.

## Architecture and Memory Systems

The original Generative Agents paper introduced memory architecture concepts that have influenced the broader field. The team experimented with various approaches including knowledge graphs and bespoke models but ultimately decided to store agent memories in simple text/Markdown files. The insight was that language models are already excellent at processing and reasoning about text, so complex memory structures were unnecessary. This approach has been adopted by more recent systems like OpenAI's personal agents.

However, Park acknowledges limitations to pure prompting approaches. He articulates a clear philosophy on when to prompt versus when to modify model weights: "If the model has to learn the underlying physics of the world that it's operating in... it has to learn new social physics," then training or post-training is necessary. When models already have the correct physics and just need to react to an environment, prompting suffices. This represents practical guidance for LLMOps practitioners on the prompt engineering versus fine-tuning decision.

The current Simile architecture supports both population-level and individual-level models. Both take similar inputs (description of a subpopulation or individual plus a stimulus) but are optimized for different granularities of simulation. The individual-level models are described as the harder task and represent the focus of their evaluation work.

## Evaluation and Validation Methodology

Simile's approach to evaluation represents one of the most rigorous validation frameworks in production LLM systems. Their landmark paper "Generative Agent Simulations of 1000 People" (late 2024) established their evaluation methodology:

The company recruited 1,000 people representatively sampled from the US population to a virtual lab. They spent two hours collecting wide-ranging data including structured interviews based on the American Voices Project script plus behavioral data. Participants were then sent away for two weeks while Simile created their digital twins using the collected data.

After two weeks, participants returned to complete a comprehensive battery of surveys and behavioral studies including:
- Behavioral economics games
- Big Five personality tests  
- General Social Survey questions
- Replications of RCTs published in PNAS (Proceedings of the National Academy of Sciences)

The digital twins predicted how source individuals would act in these studies and surveys. The key finding: Simile's models replicated people's behaviors and attitudes 85% as accurately as people replicated their own responses. This 85% accuracy benchmark became their headline figure and represents a substantial improvement over baseline methods.

Critically, the company found that frontier models like ChatGPT and Claude perform significantly worse on these behavioral prediction tasks, achieving only 20-30% accuracy on niche populations and 50-60% on general population topics. This represents a 2-3x performance gap that justifies Simile's specialized approach. The company emphasizes that frontier models fail because they lack the true "attitudinal and behavioral aspect of people" - they're optimized for rationality rather than realistic human behavior including biases and mistakes.

This evaluation framework addresses a key concern about "stacking LLM hallucinations" - each digital twin is grounded in real human data and validated against actual human behavior in controlled experiments. The validation is not based on subjective assessment but quantitative accuracy against ground truth human responses.

## Production Deployment and Enterprise Use Cases

Simile currently operates at significant scale, running tens of millions of simulations for Fortune 100 clients. The company processes queries weekly on tens of thousands of people's data and has panel partnerships providing access to tens of millions of people globally. The team has grown to approximately 60 people, with 15-20% being former lab mates from Microsoft Research, plus talent from OpenAI, Google Gemini, and other leading AI organizations.

The production workflow follows this pattern:

**Population Definition**: Clients work with Simile to define the population of interest. This might be the general US population for a CPG company, or more specific segments like "people in their 20s and 30s living in California." The specificity of population definition is a key part of the value proposition.

**Data Collection and Model Creation**: Simile recruits individuals matching the target population with informed consent and incentives. They collect data across their three categories (interviews, behavioral observation, RCTs) and create models of these individuals.

**Query and Simulation Interface**: The product allows clients to query synthetic populations by providing:
- A filter describing the population segment of interest
- An environment (survey questions, behavioral experiments, A/B tests, etc.)

Clients can run various types of studies including concept testing, focus groups, product testing with multimodal inputs (images, Figma mockups, websites), and even simulations of earnings calls for public companies.

**Key Use Cases in Production**:

- **Concept Testing**: Evaluating different product ideas, messaging, or strategic directions before committing resources
- **Product Development**: Testing UIs, features, and user experiences (Wealthfront was an early customer using multimodal testing)
- **Market Research Replacement**: Replacing traditional human panels with synthetic populations that can be queried unlimited times
- **Policy Analysis**: Strategic partnership with Gallup for policy-related simulation (though they're being careful about political applications)
- **Enterprise Decision-Making**: Enabling organizations to "consult users" continuously rather than running expensive, time-consuming studies

The company positions simulation differently from prediction. The goal is not to forecast what will happen, but to understand how to shape desired outcomes. As Park explains: "Most decision-makers, what they want to know is, how can we shape the future? It doesn't really help you to hear that your sales are going to tank in two quarters... What they want to know is, well, what do we need to do now to avoid that future?" This represents a causal inference orientation rather than pure prediction.

## Multi-Agent Simulation and Scaling

Beyond individual-level simulation, Simile is building toward multi-agent simulations where digital twins interact with each other. This builds on the original Smallville/Generative Agents work which demonstrated emergent social behaviors when AI agents with memory, planning, and social capabilities inhabited a shared environment.

The vision is ambitious: create simulations at society scale to understand emergent behavior. Park references Thomas Schelling's pioneering agent-based modeling work from the 1970s-80s, particularly the Model of Segregation which showed how minute individual preferences could lead to complete societal segregation over time. This work influenced housing policy and earned Schelling the Nobel Prize in Economics.

The opportunity Park sees is that agent-based models had impact in the 1980s-90s but faded because "red dots and blue dots is not really a rich description of people." With generative AI enabling high-fidelity individual agents, agent-based modeling could return with much greater predictive and explanatory power for complex societal phenomena.

The long-term vision is explicitly to "simulate all 8 billion people on Earth" to tackle grand challenges like climate change (described as a "wicked problem" of coordination with many actors and competing incentives), understanding signals of democratic collapse, and testing policies like Universal Basic Income. Park suggests that in 5-10 years with sufficient compute scaling, creating "an entire data center worth of simulations" may be justified, potentially costing as much as training a foundation model but solving problems like climate change.

## Scaling Laws and Model Performance

Simile is observing early evidence of scaling laws for simulation - predictable gains in model performance as more human behavioral data and compute are invested. This represents an important finding for the field, suggesting that simulation accuracy may scale predictably similar to how language modeling capabilities scaled with the original neural scaling laws.

The company operates their own post-trained models rather than relying solely on frontier model APIs. While they don't over-optimize efficiency too early, they think carefully about computational costs given they're processing significant query volumes for enterprise clients. The tradeoff between simulation fidelity and cost is an ongoing consideration, particularly for multi-agent simulations which have combinatorial complexity when thousands of agents interact.

## Technical Challenges and Limitations

The transcript reveals several important challenges and limitations in production LLMOps for simulation:

**Data Acquisition**: Obtaining high-quality behavioral data, especially causal RCT data, remains difficult and expensive. Real-world RCTs are rare because "the world happens once" - creating controlled experimental conditions at scale is inherently challenging.

**Model Weight Modification vs. Prompting**: While simple prompting works for many applications, capturing genuine human behavioral patterns requires post-training to embed "social physics" in model parameters. This represents additional complexity and cost compared to pure prompt engineering approaches.

**Cost and Scale**: Running population-scale simulations is computationally expensive. While cost-effective compared to traditional human studies, scaling to millions or billions of simulated individuals requires careful consideration of economics and infrastructure.

**Validation and Trust**: Overcoming skepticism about "stacking LLM hallucinations" requires rigorous validation methodology. The 85% accuracy figure helps establish credibility, but continuous validation against real human behavior is necessary.

**Population Specificity**: Performance varies significantly between general population and niche segments. Frontier models might achieve 50-60% on general populations but drop to 20-30% on specialized groups, highlighting the importance of representative training data.

**Ethical Considerations**: The company is deliberately cautious about certain applications like political polling, recognizing that simulation technology has potential for misuse and requires careful deployment guardrails.

## Market Position and Business Model

Simile positions itself at the intersection of research lab and product company, maintaining both identities. The company sees a $100 billion market research industry as a starting point but argues their true TAM is "all human decision-making" - every decision made about humans for humans. This positioning reflects their ambition but also the challenge of defining market boundaries for a general-purpose simulation capability.

The value proposition centers on enabling decisions that were previously too expensive or impossible to inform with human data. Organizations can "consult users" continuously rather than running expensive, time-consuming studies. The digital twins can be queried unlimited times across different contexts, with data reuse being a key efficiency: once a person's digital twin is created, it can be used for multiple subsequent studies without additional data collection from that individual.

The company emphasizes impact over valuation, with Park noting that as a researcher-founder, "valuation only tells one very superficial aspect of the story." The focus is on whether simulations "have a real impact in people's decision-making in ways that progresses our society forward."

## State of the Industry and Future Direction

Park characterizes the current state of simulation technology as analogous to where GPT-3.5/GPT-4 was for AGI: "powerful enough to do real damage on the verticals that we are tackling" but with "a lot of progress that is yet to come." He expects continued breakthroughs in data, algorithms, and aggressive scaling over the next few years.

The company sees simulation and AGI as "twin pillar technologies" of advanced civilizations, arguing that any advanced civilization depicted in science fiction has both. The reference to Isaac Asimov's Foundation series and psychohistory is explicit - the vision is to create simulations that can show not just outcomes but the path of interventions needed to achieve desired futures, even when those interventions are counterintuitive.

This represents one of the most ambitious production LLMOps deployments, moving beyond traditional language modeling applications into complex behavioral modeling with significant real-world impact. The combination of rigorous evaluation methodology, novel training data collection, specialized model post-training, and enterprise-scale deployment makes this a notable case study in how LLMs can be productionized for domain-specific applications requiring accuracy beyond what general-purpose models provide.
