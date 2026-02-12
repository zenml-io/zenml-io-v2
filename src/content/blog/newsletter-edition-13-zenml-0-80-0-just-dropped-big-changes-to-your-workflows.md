---
title: "Newsletter Edition #13 - ZenML 0.80.0 just dropped"
slug: "newsletter-edition-13-zenml-0-80-0-just-dropped-big-changes-to-your-workflows"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67e5a8f2ddba9400892cdb11"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-04-27T13:51:20.827Z"
  lastUpdated: "2025-04-27T13:51:20.827Z"
  createdOn: "2025-03-27T19:37:22.867Z"
author: "alex-strick-van-linschoten"
category: "zenml-updates"
tags:
  - "newsletter"
  - "news"
  - "zenml"
  - "llmops"
date: "2025-03-27T00:00:00.000Z"
readingTime: 7 mins
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/0365e48f/67e5a7eaac078ed541114b34_Image_from_Notion__2_.png"
seo:
  title: "Newsletter Edition #13 - ZenML 0.80.0 just dropped - ZenML Blog"
  description: "Our monthly roundup: new features with 0.80.0 release, more new models, and an MCP server for ZenML"
  canonical: "https://www.zenml.io/blog/newsletter-edition-13-zenml-0-80-0-just-dropped-big-changes-to-your-workflows"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/0365e48f/67e5a7eaac078ed541114b34_Image_from_Notion__2_.png"
  ogTitle: "Newsletter Edition #13 - ZenML 0.80.0 just dropped - ZenML Blog"
  ogDescription: "Our monthly roundup: new features with 0.80.0 release, more new models, and an MCP server for ZenML"
---

Hey ZenML community,

While AI models continue to reach impressive new performance benchmarks in 2025, the gap between capability and production-ready implementation remains significant. Despite this being heralded as "the year of agents," the reality is that only a small cohort of companies have managed to deploy these systems effectively in production environments.

Those success stories come with a backstory of considerable investment – both in expertise and infrastructure. Our conversations with teams reveal consistent challenges: agents getting stuck in loops, evaluation methodologies falling short, and reliability issues that persist despite promising benchmarks. The path from demo to deployment still requires substantial engineering discipline.

At ZenML, we're focusing on enabling robust GenAI workflow patterns while continuing to strengthen our core MLOps foundation. Our work is driven by a simple question: how can we help more teams bridge the gap between AI potential and production reality?

Here's what we've been building toward that vision:

### 🚀 Product Update: ZenML 0.80.0 Brings Workspace Hierarchy & Performance Gains

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/d0126f36/67e5a7dce5ca0d074eb4f213_Image_from_Notion__1_.png" alt="__wf_reserved_inherit" />
</figure>

Our latest release, [ZenML 0.80.0](https://www.zenml.io/blog/v0-80-0-a-new-era-reimagined-workspaces-enhanced-performance), completely changes how you'll organize your ML projects while making everything run faster.

The biggest change? We've renamed "tenants" to "workspaces" and added a new layer called "projects" for Pro users. This means you can now organize your ML resources in a way that actually makes sense for teams. Pro users get fine-grained access controls too, so the right people can access exactly what they need.

Everyone benefits from the speed improvements - especially the much faster CLI. We've also fixed and enhanced several integrations: better GitLab support, environment variables in Kubernetes settings, and faster Vertex orchestrator start-up times.

Pro users will notice the dashboard looks completely different - we've ditched the cramped sidebar for a cleaner, tab-based design that loads faster and feels more responsive. Our docs site got a similar refresh with better navigation and a dedicated Pro section. We think you’ll find it easier to find things with the new changes.

Ready to upgrade? Just run `pip install -U zenml` and [check the changelog](https://github.com/zenml-io/zenml/releases/tag/0.80.0) for all the details.

### 👥 Community Spotlight: Munich Meetup on Agents in Production

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/0365e48f/67e5a7eaac078ed541114b34_Image_from_Notion__2_.png" alt="__wf_reserved_inherit" />
</figure>

Our first "Agents in Production" meetup in Munich brought together practitioners tackling real implementation challenges head-on. The event featured talks from [Felix Altenberger](https://www.linkedin.com/in/felix-altenberger/) on latency-critical video applications, [Denys Lazarenko](https://www.linkedin.com/in/denys-lazarenko/) demonstrating multi-agent systems, and [Sebastian Schuon](https://www.linkedin.com/in/schuon/) exploring medical workflows enhanced by agents.

The room buzzed with practical questions everyone is struggling with: How do you properly evaluate these systems? What's the best approach to memory management? How do you scale while hitting those tough latency targets? Nobody had all the answers, but that's exactly why sharing experiences was so valuable. As we've seen firsthand, effective LLMOps is fundamentally about people working together to solve real problems.

Thanks to [Maltego Technologies](https://www.linkedin.com/company/maltego/) for the great venue! Given how well this went, we're already planning the next Munich meetup—[stay tuned](https://lu.ma/agents-in-production)!

### 🤖 Chat With Your ML Pipelines Using ZenML MCP Server

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/55a7e67a/67ce92f01cb444c9c5bf805d_CleanShot_Mar_9_from_ZenML_Chat.gif" alt="__wf_reserved_inherit" />
  <figcaption>An example of the kinds of reports you can generate with Claude Desktop connected to your ZenML server using MCP</figcaption>
</figure>

We've just [released the ZenML MCP Server](https://www.zenml.io/blog/chat-with-your-ml-pipelines-introducing-the-zenml-mcp-server), letting you talk to your ML pipelines using natural language instead of CLI commands or dashboards. The timing couldn't be better, as the Machine Learning community is buzzing with excitement around the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/).

The server integrates with MCP clients like Claude Desktop, Cursor, and WindSurf, giving you read-only access to most of your ZenML data - users, stacks, pipelines, runs, steps, artifacts, and more. You can even trigger new pipeline runs through existing templates. This means you can query your ZenML server, generate analytics, create reports, and investigate failing pipelines - all through conversation.

Setting up is straightforward if you have a ZenML Cloud server. You'll need `uv` installed locally and a clone of the repository. [Our GitHub repo](https://github.com/zenml-io/mcp-zenml) has step-by-step instructions to get you up and running quickly. Try prompts like "Write a report about my pipeline runs" or "Compare performance across my different stacks" to see what it can do.

What's next? We're keeping an eye on how the MCP landscape evolves to potentially offer hosted versions and safe write operations. Give it a try and let us know what you think [in our Slack](https://www.zenml.io/slack) - we're especially interested in what write actions you'd find useful and how you're using it in your workflows.

### ✍️ Latest MLOps & LLMOps Insights From Our Blog

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/bc8ed30d/67e5a87ea6ad758c892fc81c_CleanShot_Mar_26_2025.png" alt="__wf_reserved_inherit" />
</figure>

Our team recently published several deep dives into the practical challenges of deploying AI systems in production environments. Here's what we've been writing about:

I explored the critical human factors in [LLMOps is About People Too](https://www.zenml.io/blog/llmops-is-about-people-too-the-human-element-in-ai-engineering), examining how misaligned expectations and organizational dynamics often present bigger hurdles than technical challenges. The piece offers practical team structures like hub-and-spoke models that organizations can implement to bridge silos and integrate subject-matter experts effectively.

Jayesh tackled evaluation pipelines in [Query Rewriting in RAG Isn't Enough](https://www.zenml.io/blog/query-rewriting-evaluation), using real examples to demonstrate how seemingly effective query rewrites can subtly distort meaning without proper assessment. Meanwhile, Marwan compared classification approaches in [his case study pipeline article](https://www.zenml.io/blog/building-a-pipeline-for-automating-case-study-classification), revealing that a fine-tuned small model dramatically outperformed larger models (Claude Haiku, for this test) in both accuracy and efficiency, delivering results 69× faster and 225× cheaper.

Hamza explored streamlining LLM fine-tuning workflows through [our integration with OpenPipe](https://www.zenml.io/blog/streamlining-llm-fine-tuning-in-production-zenml-openpipe-integration), addressing key challenges around data preparation and automated model redeployment. His guide provides a reproducible pipeline approach that helps teams maintain continuously improving models as their data evolves. We’ve seen quite a few companies using finetuning-as-a-service together with ZenML so we’re really happy to have a code example for this use case to share with you.

Dive into these articles for the technical details and implementation strategies that go beyond the theory—they're packed with real-world lessons from our journey building and implementing these systems ourselves.

### 💼 Case Studies: LLMOps in Action Across Industries

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/1c0b1d6d/67e5a860cc54d5ddb34d6ea0_CleanShot_Mar_26_2025__1_.png" alt="__wf_reserved_inherit" />
</figure>

[Our LLMOps Database](https://www.zenml.io/llmops-database) continues to showcase innovative applications across industries. [Love Without Sound's modular NLP pipeline](https://explosion.ai/blog/love-without-sound-nlp-music-industry) standardizes music metadata and processes legal correspondence, helping recover millions in lost royalties with components achieving up to 99% accuracy at impressive speeds.

Microsoft shared valuable insights on [LLMOps in restricted networks](https://devblogs.microsoft.com/ise/llmops-in-restricted-networks-and-continuous-evaluation-long-run-constraints/), implementing PR-label-based evaluation triggers to intelligently manage resource-intensive testing while maintaining quality standards for their 6-hour evaluation runs.

Organizations demonstrated practical implementation strategies: Microsoft [cautioned against "unearned complexity"](https://devblogs.microsoft.com/ise/earning-agentic-complexity/) in LangChain deployments, while [DoorDash built](https://careersatdoordash.com/blog/building-doordashs-product-knowledge-graph-with-large-language-models/) a product knowledge graph using LLMs to extract attributes from unstructured SKU data, delivering business value within weeks.

[Duolingo's implementation](https://blog.duolingo.com/scaling-duoradio/) stands out for scale—expanding DuoRadio from 300 to 15,000+ episodes across 25+ language courses with a curriculum-driven approach, growing daily active users from 100K to 5.5M in six months while reducing costs by 99%.

If you'd like to contribute your implementation story to our database, please [submit your use case here](https://docs.google.com/forms/d/e/1FAIpQLSfrRC0_k3LrrHRBCjtxULmER1-RJgtt1lveyezMY98Li_5lWw/viewform).

### 💡 Pro Tip: Speed Up Pipeline Startup with Persistent Resources

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/f301527e/67e5a894c268a62919185e78_CleanShot_Mar_26_2025__2_.png" alt="__wf_reserved_inherit" />
</figure>

Tired of waiting for cloud resources to spin up during ML development? Both Vertex AI and SageMaker integrations in ZenML offer features that dramatically reduce this waiting time by keeping compute resources warm between runs.

[Vertex AI's Persistent Resources](https://docs.zenml.io/stacks/stack-components/orchestrators/vertex#using-persistent-resources-for-faster-development) maintain pre-provisioned compute environments ready for immediate use. Simply create a persistent resource through the GCP Cloud UI, configure your ZenML Vertex orchestrator to use it, and ensure your service account has the necessary permissions. Similarly, [SageMaker's Warm Pools](https://docs.zenml.io/stacks/stack-components/orchestrators/sagemaker#using-warm-pools-for-your-pipelines) keep instances ready to execute your code with minimal delay.

These features deliver the greatest value during active development cycles where responsiveness matters. Give them a try and overhaul your iterative development experience from frustrating waits to rapid feedback loops.

### 📰 Industry Pulse: AI News Roundup for March 2025

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/55a63805/67e5a8a60708d80ec8796d3c_AI_World_Roundup_Mar_2025.png" alt="__wf_reserved_inherit" />
</figure>

March brought the usual flood of AI announcements. [Google's Gemini 2.5 Pro](https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/) boasts a massive 1-2 million token context window, while [DeepSeek's V3](https://api-docs.deepseek.com/news/news1226) claims better reasoning scores on benchmarks like MMLU-Pro. Google also dropped [Gemma 3](https://blog.google/technology/developers/gemma-3/), their open-source model family with 140-language support and 128k context windows. Let's be real though—these are mostly incremental upgrades to the same architectures we've been seeing since 2022.

The image generation race heats up with both [OpenAI's 4o](https://openai.com/index/introducing-4o-image-generation/) and [Google's Gemini 2.0 Flash](https://developers.googleblog.com/en/experiment-with-gemini-20-flash-native-image-generation/) now offering built-in editing features. Anthropic finally gave Claude [web search capabilities](https://www.anthropic.com/news/web-search)—something their competitors have had for ages. On the development side, OpenAI rolled out yet another framework with their [Responses API](https://platform.openai.com/docs/api-reference/responses) and [Agents SDK](https://openai.github.io/openai-agents-python/), adding to the tool overload developers already face. Meanwhile, China's [Manus](https://manus.im/) is generating buzz with its multi-agent approach, though we're still waiting for solid third-party verification of what it can actually do.

The compute demands behind these systems are getting ridiculous. A recent [Metr study](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) shows AI's task-handling abilities double every seven months, but at what cost? Nvidia's Jensen Huang claims agents need ["100x more compute"](https://x.com/morqon/status/1902048183154254013?s=61) than previously thought (shocker: the GPU seller wants you to buy more GPUs). Even more eyebrow-raising, Manus reportedly burns through [1500x more tokens](https://x.com/peakji/status/1901794685385068575) than regular chatbots. The industry needs to have a serious conversation about whether these resource requirements are sustainable or sensible.

Looking ahead, AI faces a crossroads between flashy demos and practical value. The next breakthroughs might not come from throwing more compute at problems, but from smarter approaches that do more with less. The companies that figure out how to deliver genuinely useful capabilities without requiring a data center's worth of GPUs will likely be the ones that matter in the long run—not just the ones with the most impressive benchmark scores.

🔍 **Reality Check: Bridging the Gap Between AI Demos and Production**

This month's developments reflect our ongoing response to what we're seeing in the field. Technical challenges persist: agents getting trapped in reasoning loops, systems breaking down with edge cases, and evaluation methods that don't always capture real-world performance. These aren't just implementation details – they're fundamental engineering questions that require deliberate solutions.

The organizations making tangible progress aren't necessarily those with access to the most advanced models, but those bringing engineering rigor to the messy reality of production deployment. As we continue developing ZenML, we remain committed to addressing these practical challenges that stand between promising AI capabilities and reliable production systems.

Until next time,

Alex