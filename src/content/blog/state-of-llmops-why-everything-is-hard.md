---
title: "The State of LLM Operations or LLMOps: Why Everything is Hard (And That's OK)"
slug: "state-of-llmops-why-everything-is-hard"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "672890ae5ca736b64f4f0b29"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-11-04T09:28:09.217Z"
  lastUpdated: "2024-11-04T09:27:46.279Z"
  createdOn: "2024-11-04T09:15:26.866Z"
author: "alex-strick-van-linschoten"
category: "llms"
tags:
  - "thought-leadership"
  - "llm"
  - "mlops"
  - "llmops"
date: "2024-11-04T00:00:00.000Z"
readingTime: 4 mins
featured: true
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/995dddff/67288f8f1c16455593c10f45_CleanShot_2024-11-04_at_09.54.34__1_.png"
seo:
  title: "The State of LLM Operations or LLMOps: Why Everything is Hard (And That's OK) - ZenML Blog"
  description: "Machine Learning (ML) adoption is gaining momentum, but challenges include robust pipelines, quality issues, and scale monitoring. Recognizing and overcoming these challenges is crucial."
  canonical: "https://www.zenml.io/blog/state-of-llmops-why-everything-is-hard"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/995dddff/67288f8f1c16455593c10f45_CleanShot_2024-11-04_at_09.54.34__1_.png"
  ogTitle: "The State of LLM Operations or LLMOps: Why Everything is Hard (And That's OK) - ZenML Blog"
  ogDescription: "Machine Learning (ML) adoption is gaining momentum, but challenges include robust pipelines, quality issues, and scale monitoring. Recognizing and overcoming these challenges is crucial."
---

We're now a few years in to a more widespread adoption of LLMs across a variety of domains. Research continues, new models get released, but while everyone's talking about what LLMs can do, practitioners are grappling with how to make them work reliably. I took a look at the kinds of challenges people mention when it comes to the use of LLMs in production and it seems that these span the entire ML lifecycle, suggesting we're in early days of enterprise LLM adoption.

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/f80a7841/672890ae5ca736b64f4f0ac2_67288eb2c46c88a8f0bcce86_CleanShot_202024-11-01_20at_2013.17.00.png" alt="The &#039;everything is fine&#039; meme repurposed to refer to LLMOps." />
</figure>

It's unfortunate that these challenges tend to be relatively less talked about than new SOTA benchmarks or incremental improvements in model architectures. While understandable, this can give a false sense of confidence (read: hype) around the realities of adopting LLM technologies into enterprise and other business use cases. Turns out it's hard to operationalise LLMs!

Drawing from both practitioner experiences and industry expert discussions, what follows is a snapshot survey of the real challenges of implementation.

## The Promise vs. The Reality

If you look at job postings for GenAI positions (as Ben Lorica [recently did](https://thedataexchange.media/tim-persons-2024-07/)), you see some commonality in the kinds of tasks that business are seeking to develop:

<ul><li>Customer experience transformation (chatbots and other interactive experiences)</li><li>Support enhancement (allow for more personalised support)</li><li>Process optimization (usually internal-facing)</li><li>Data analysis &amp; insights (also internal-facing, but especially relevant for massive enterprises)</li></ul>

On the face of it, this is where the industry is converging for now and there is considerable enthusiasm for it. Not only can LLMs help in these use cases just listed, but there's potential for a good deal of cross-team and cross-hierarchy collaboration within companies given how democratised the technology seems to be.

In reality, the challenges experienced by practitioners span every aspect of development through to deployment and beyond.

## The Universal Challenge: Everything is Hard

We recently ran [a competition giveaway](https://www.linkedin.com/feed/update/urn:li:activity:7257310606314119169/) for [a great new book](https://www.amazon.com/LLM-Engineers-Handbook-engineering-production-ebook/dp/B0D1WR77BZ/) on LLMs in production settings by Paul Iusztin and Maxime Labonne. We asked respondents what they thought the biggest challenges putting LLMs in production was and we got dozens of replies.

What emerged from the responses was striking not for any single overwhelming challenge, but rather for how the difficulties span the entire MLOps lifecycle. Let's break down these challenges and understand why they matter for organizations attempting to operationalize LLMs.

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/86ba5963/672890ae5ca736b64f4f0abc_67288ee3bedf0013e1554f0b_CleanShot_202024-11-01_20at_2013.36.45.png" alt="Diagram showing the main challenges faced by people with LLMOps: input, quality, integration and data security." />
</figure>

### Input & Pipeline Challenges

At the foundation of any LLM system lies the challenge of building robust pipelines. Siavash Sakhavi, an AI lead in Singapore, highlighted how even seemingly straightforward tasks like processing non-standard PDF files require sophisticated vision-language model pipelines. The variety of input formats and the need to extract structured information reliably remains a significant challenge.

This complexity is compounded by the rapid evolution of available tools and frameworks. As one senior data scientist noted, simply selecting the right tools for your specific use case has become a challenge in itself. [Intel's experience is particularly instructive](https://overcast.fm/+AAtrK2w434U) here – their production environments require varied systems handling different scenarios, highlighting how one-size-fits-all approaches rarely work in practice.

These pipeline challenges matter because they form the foundation of everything else. Get this wrong, and no amount of sophisticated modeling or optimization will save your application.

### The Quality Conundrum

Perhaps the most pervasive challenge revolves around output quality and consistency. The fundamental probabilistic nature of LLMs means that outputs can vary significantly between iterations, even with identical inputs. This creates particular headaches when building applications that require deterministic responses.

Monitoring these systems at scale introduces another layer of complexity. As Prajwal Srinivas noted, "Monitoring quality of responses from the LLM is challenging, especially as the data, prompts and underlying models change gradually." Intel's approach here is notable – they [regularly test](https://overcast.fm/+AAtrK2w434U) against huge tranches of data, processed through Spark, but quite regularly throw away custom models trained for a particular version of a chip when new realities have caused their models to drift.

The balance between automation and reliability becomes critical at this stage. While automation is necessary for scale, it must be balanced against the need for consistent, reliable outputs.

### The Integration Challenge

The challenge of actually integrating LLMs into production systems is often understated. Daniel Klitzke captures this well, pointing out the need for "proper integration into the app (or UI) to provide a seamless experience for the users." This isn't just about making things look pretty – it's about creating interfaces that make sense for how people actually use these systems.

The performance versus accuracy tradeoff appears repeatedly in practitioners' concerns. Engineers find themselves trying to balance response time against answer quality, particularly in RAG applications where retrieval time can significantly impact the user experience. These tradeoffs are constrained by real-world system limitations, from compute resources to latency requirements.

### The Data Security Tightrope

Security and data privacy concerns add another layer of complexity to LLM operations. Many organizations require on-premises deployments to protect sensitive customer data, which introduces its own set of challenges around infrastructure management and scaling.

Vector maintenance (through standard databases or the new batch of custom AI-focused vector stores) becomes a critical concern here, as noted in several responses about keeping embeddings and responses up-to-date while maintaining data security. As one practitioner put it, "some sort of automation is required to keep the vectors up to date," but this automation must be balanced against security requirements.

The resulting challenge is finding ways to allow teams to experiment with and improve LLM systems while ensuring customer data remains protected. This often requires sophisticated access controls and data governance frameworks.

## Why This Matters: The Scale Effect

While these challenges might seem daunting, they become even more significant when we consider the scale at which LLMs can drive business value. When implemented successfully, LLMs can drive huge improvements in efficiency and capability – but the challenges multiply alongside these benefits.

[Intel's approach](https://overcast.fm/+AAtrK2w434U) of regular model recycling and automated testing shows how systematic you need to be at scale. This isn't just about making things work; it's about making them work reliably and repeatedly across potentially millions of interactions.

We're seeing a pendulum swing in the industry from pure capability excitement toward a focus on business value. This is healthy and necessary, but it also means confronting these operational challenges head-on. The path from proof-of-concept to production is often longer and more complex than anticipated, but the potential benefits make it worth the journey.

## The Path Forward

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/68e62e25/672890ae5ca736b64f4f0ac5_67288efcc71fc0e3d64914c7_CleanShot_202024-11-01_20at_2013.19.02.png" alt="Diagram showing the state of llmops solutions, from ones that are currently working and then the ones that still need work." />
</figure>

Despite the challenges, we're seeing some clear patterns emerge in what's working for teams deploying LLMs in production. RAG (Retrieval Augmented Generation) has emerged as a key architectural pattern, even with its inherent complexities. It's not perfect – as several practitioners noted, getting the retrieval part right remains non-trivial – but it's providing a solid foundation for building more reliable and controllable LLM applications.

On the infrastructure front, we're seeing some consolidation around particular solutions. [Text Generation Inference (TGI)](https://github.com/huggingface/text-generation-inference) from Hugging Face appears to be winning the inference game for many teams, offering a good balance of performance and ease of use. This kind of standardization is healthy for the ecosystem, allowing teams to focus more on their specific use cases rather than solving infrastructure problems from scratch.

Automated testing, where possible, is becoming increasingly sophisticated. Teams are learning to automate not just basic input-output testing, but also more nuanced aspects like semantic similarity and factual consistency. The key here seems to be starting simple and gradually building up the complexity of your testing suite as you better understand your failure modes.

Perhaps most importantly, we're seeing a shift toward focusing on business value over pure capability. Teams are getting better at asking not just "can we do this with LLMs?" but "should we do this with LLMs, and if so, how do we make it reliably valuable?" Also: "how does this drive our business value?"

### What Still Needs Work

That said, there are several areas where we need significant improvement. Tools for automated quality monitoring of LLM applications remain primitive compared to what we have for traditional software systems. We need better ways to track not just obvious failures, but also the subtle degradation in quality that can occur over time. For non-LLM machine learning use cases, this is a core value proposition driving MLOps adoption, but even there the tooling landscape probably has a ways to go before it could be considered mature.

The frameworks for managing model updates are still immature. As Stefano Fiorucci pointed out, replacing models with newer versions without introducing regressions remains a significant challenge. We need better tools and patterns for managing this kind of evolution in production systems.

Getting consistent outputs from inherently probabilistic models remains an open problem. While there are various techniques for improving consistency, we don't yet have robust, general-purpose solutions that work across different use cases and requirements.

Perhaps surprisingly, we're still in early days when it comes to UI/UX patterns for LLM applications. Daniel Klitzke's observations about the challenges of integrating LLM outputs with existing interfaces point to a broader need for better design patterns in this space.

## Embracing the Complexity

It might seem overwhelming that there are so many fundamental challenges in operationalizing LLMs. But I'd argue this is actually a good sign – it means we're moving past the hype and starting to grapple with the real complexities of making these systems work in practice. This is what maturation looks like.

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/7bbdd12a/672890ae5ca736b64f4f0abf_67288f36402975f8de0e671e_Life_20Finds_20a_20Way.gif" alt="GIF of the &#039;life finds a way&#039; meme from Jurassic Park." />
</figure>

The democratization potential of LLM technology remains strong. Yes, there are challenges, but the barriers to entry are primarily about solving well-defined (if difficult) engineering problems rather than requiring deep expertise in model architecture or training. This means teams can focus on their specific use cases and gradually build up their operational capabilities.

What's particularly encouraging is how openly teams are sharing their experiences and solutions. From Intel's approach to testing and validation to individual practitioners sharing their challenges with UI integration or pipeline design, there's a growing body of knowledge about what works and what doesn't.

Looking ahead, it's clear we need continued innovation across all these areas. But that's exactly what makes this field exciting right now – there's room for meaningful contribution everywhere, from pipeline design to monitoring tools to UI patterns. The challenges are significant, but they're the kind of challenges that engineers are good at solving: concrete, technical, and amenable to systematic improvement.

The key is to approach these challenges with appropriate respect for their complexity while maintaining optimism about our ability to solve them. After all, the fact that everything is hard right now just means there's plenty of opportunity to make things better.

