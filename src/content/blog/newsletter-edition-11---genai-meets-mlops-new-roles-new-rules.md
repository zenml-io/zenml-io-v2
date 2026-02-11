---
title: "Newsletter Edition #11 - GenAI Meets MLOps: New Roles, New Rules"
slug: "newsletter-edition-11---genai-meets-mlops-new-roles-new-rules"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6790e45b842cdc8a2f6d19b9"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-04-27T13:29:10.304Z"
  lastUpdated: "2025-04-27T13:29:10.304Z"
  createdOn: "2025-01-22T12:28:11.119Z"
author: "hamza-tahir"
category: "zenml-updates"
tags:
  - "newsletter"
  - "news"
  - "zenml"
  - "llmops"
date: "2025-01-22T00:00:00.000Z"
readingTime: 6 mins
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/efd3d7a9/6790e2de9fe4afcb90333e4c_New_Newsletter_Design.png"
seo:
  title: "Newsletter Edition #11 - GenAI Meets MLOps: New Roles, New Rules - ZenML Blog"
  description: "Our monthly roundup: AI Infrastructure Summit insights, new experiment comparison tools, and a deep dive into AI Engineering roles"
  canonical: "https://www.zenml.io/blog/newsletter-edition-11---genai-meets-mlops-new-roles-new-rules"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/efd3d7a9/6790e2de9fe4afcb90333e4c_New_Newsletter_Design.png"
  ogTitle: "Newsletter Edition #11 - GenAI Meets MLOps: New Roles, New Rules - ZenML Blog"
  ogDescription: "Our monthly roundup: AI Infrastructure Summit insights, new experiment comparison tools, and a deep dive into AI Engineering roles"
---

Hi everyone, Hamza here! I've just returned from [the AI Infrastructure Summit](https://www.linkedin.com/posts/hamzatahirofficial_super-stoked-to-be-part-of-the-opening-panel-activity-7284936649724059648-Z6gO?utm_source=share&utm_medium=member_desktop), and I have to say – the energy was incredible. What struck me most was how GenAI has become the common thread connecting everyone, whether they're from MLOps, SWE, or traditional infrastructure backgrounds. The halls were buzzing with conversations about RAG, AgentOps, and an ever-growing collection of exciting new approaches to solving AI challenges.

This convergence of different technical communities mirrors what we're seeing in the open-source world, where innovation continues at a breakneck pace. DeepSeek's recent release of their R1 family of models, backed by impressive research papers, is just the latest example of how quickly the field is evolving.

At ZenML, we've been fascinated by the diverse paths people are taking into the world of generative AI. Whether you're coming from a traditional MLOps background or you're a backend engineer exploring this space, we'd love to hear about your journey and how you're incorporating ZenML into your workflows.

## ⚡ Major Product Updates

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/3f776b46/678525ed4a16785150e7f741_678524f9be42385bc570eedf_Metadata_20Comparison_20Tool_20Jan_2013_202025.png" alt="The new ZenML experiment comparison feature on our dashboard, allowing you to visualise cross-experiment changes in the dashboard" />
</figure>

We've been busy building on the product side.

ZenML Pro users can now leverage a powerful new [Experiment Comparison Tool](https://www.zenml.io/blog/new-dashboard-feature-compare-your-experiments) in the dashboard, enabling side-by-side analysis of up to 20 pipeline runs. The tool offers two main views: a structured tabular analysis for comparing run metadata and metrics, and an interactive parallel coordinates visualization for exploring multi-dimensional relationships in your data. Any numerical metadata from your pipelines can be tracked and visualized, from model performance metrics to system telemetry. The tool particularly shines for operational insights, letting teams analyze everything from processing times to resource utilization directly in the dashboard. All visualization configurations are preserved in shareable URLs, making it easy to collaborate with team members.

Another exciting development is that [ZenML Pro can now be fully self-hosted](https://docs.zenml.io/pro/deployments/self-hosted) in your own Kubernetes cluster, giving you complete control over your MLOps infrastructure. This new deployment option lets you run both the ZenML Pro Control Plane and Tenant servers on your own infrastructure while maintaining all the powerful features of ZenML Pro. Whether you need to meet strict security requirements, operate in air-gapped environments, or prefer to manage your own infrastructure, you can now deploy ZenML Pro and integrate it seamlessly with your existing security setup.

Finally, we're excited to highlight a significant community contribution from [Nail Khusainov](https://github.com/nkhusainov): a [Vertex AI Experiment Tracker integration](https://github.com/zenml-io/zenml/pull/3260). This powerful addition enables comprehensive experiment tracking through Vertex AI, allowing you to monitor and analyze different model architectures, hyperparameters, and training environments. The tracker captures every aspect of your experiment runs - from inputs and outputs to detailed performance metrics - helping you evaluate model performance across test datasets and during training. This granular tracking makes it easier to select the optimal model for your specific use case, and we're grateful to Nail for bringing this capability to the ZenML ecosystem.

Of course there's a few dozen other smaller bug fixes, quality of life improvements and docs updates but no need to get into the details of those. In case you're interested, do check out [our release notes](https://github.com/zenml-io/zenml/releases).

## 📈 Technical Deep Dives

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/689ed4b3/6790e45a842cdc8a2f6d18d0_6790e3d9b8fd1f283ec594e6_CleanShot_20Jan_2020_202025_20Newsletter_20_5_.gif" alt="A gif showing someone scrolling through the LLMOps Database summary blog post with all the different use cases" />
</figure>

We've also been busy writing technical content around how people are working with GenAI and LLMs in production.

We wrote about [how different companies do evaluation](https://www.zenml.io/blog/the-evaluation-playbook-making-llms-production-ready). It's a much discussed area and I'm not sure that anyone has all the answers yet, but certainly people are trying things out. Alex's conclusion: "effective LLM evaluation requires a multifaceted, iterative approach grounded in clear metrics, diverse assessment strategies, and a commitment to continuous improvement. By combining automated techniques like LLM-based scoring and heuristic evaluation with human judgment from experts, crowd-workers, and end-users, organizations can create robust evaluation frameworks that ensure the quality and reliability of their LLM applications."

Two other areas we covered that are close to enterprise needs were [the optimisation of cost and performance](https://www.zenml.io/blog/optimizing-llm-performance-and-cost-squeezing-every-drop-of-value) as well as [security for LLM-based applications](https://www.zenml.io/blog/production-llm-security-real-world-strategies-from-industry-leaders). It seems that there's a great amount of low-hanging fruit when it comes to cost and performance optimization, particularly early on in your journey. For security it's maybe not as rosy a picture, but there are certainly things to be done.

If you prefer audio or video as your medium of choice, Alex was on [Hugo Bowne-Anderson’s Vanishing Gradients podcast](https://vanishinggradients.fireside.fm/43) talking about the lessons from the LLMOps Database with a focus on exactly how agents are being deployed in the enterprise. He took the position that structured workflows are probably the way forward in the short term, even if some of the elements of those workflows might be increasingly ‘agentic’ in 2025.

Finally, we closed up our ten-part series of topical summaries of the current state of play (as seen in the entries of our [LLMOps Database](https://www.zenml.io/llmops-database)) with [a 17,000-word banger of a summary blogpost](https://www.zenml.io/blog/llmops-in-production-457-case-studies-of-what-actually-works) in which you can scroll through summaries of the use cases to your heart's content! Think of this as a way to dip into all the variety and ingenuity that's in the database but without the sense of FOMO overwhelm. This one's a keeper; do check it out!

## 💡 Community Showcase

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/4d442ca3/6790e45a842cdc8a2f6d18b2_6790e2de9fe4afcb90333e4c_New_20Newsletter_20Design.png" alt="Screenshots of all the community posts listed in the newsletter" />
</figure>

Since our last newsletter there's been a flurry of community content of various kinds. In no particular order, here are some of the ones that stood out for us!

<ul><li>Ankur Tyagi wrote a post for the MLOps Community blog in which he tackled the comparison between <a href="https://home.mlops.community/public/blogs/zenml-vs-flyte-vs-metaflow">ZenML vs Flyte vs Metaflow</a></li><li>Sam Ozturk wrote about <a href="https://themeansquare.medium.com/getting-started-with-zenml-building-production-ready-ml-pipelines-17dff6500957">getting started with ZenML</a> on his Medium blog</li><li>Over on the Londogard blog we read another comparison piece, this time <a href="https://blog.londogard.com/posts/2024-05-05-zenml-vs-clearml/">ZenML vs ClearML</a> with the conclusion that "If you prefer to keep your stack as simple as possible: ClearML. If you prefer to keep your stack customized having the best tool for each part: ZenML."</li><li>Jordan Brown wrote about a ZenML-driven <a href="https://www.33rdsquare.com/mlops-employee-attrition-rate-prediction-using-zenml-and-streamlit/">employee attrition pipeline</a> that used Streamlit to create a web application on top of the prediction model that gets trained.</li><li>Finally we had <a href="https://www.youtube.com/watch?v=XMwHrhIjYrU">a very neat video demo of an end-to-end LLM finetuning pipeline</a> from Kushwanth K which leverages Unsloth, MLflow and DagsHub.</li></ul>

We LOVE reading and watching these community-driven blogs and videos whenever we come across them. Please do feel free to post them in the community Slack as I'm sure others would also enjoy all these different use cases.

## 🔮 AI Engineering Trends

A lot has been happening (as usual!) in the world of foundation models and cutting-edge techniques. Some of the important developments we're tracking include, the new reasoning model wave, Google's release of Gemini 2.0 Flash and Phi-4 and [Answer.ai](http://answer.ai/)'s long-awaited ModernBERT.

The last month has seen significant breakthroughs in model architectures and capabilities. [ModernBERT](https://huggingface.co/blog/modernbert) from [Answer.AI](http://answer.ai/) represents the first major BERT replacement since 2018, offering 8,192 token context length and dramatically improved efficiency - using just one-fifth of DeBERTa's memory while being 2-4x faster. Meanwhile, Google's experimental [Gemini 2.0 Flash](https://developers.googleblog.com/en/the-next-chapter-of-the-gemini-era-for-developers/) delivers impressive multimodal capabilities including real-time audio and video streaming, native image generation, and multilingual text-to-speech, all while being twice as fast as its predecessor.

On the reasoning and mathematics front, both [Microsoft's Phi-4](https://techcommunity.microsoft.com/blog/aiplatformblog/introducing-phi-4-microsoft%E2%80%99s-newest-small-language-model-specializing-in-comple/4357090) and [DeepSeek's R1](https://huggingface.co/deepseek-ai/DeepSeek-R1) are pushing boundaries in different ways. Phi-4, a relatively compact 14B parameter model, has shown remarkable performance on complex mathematical reasoning tasks, even outperforming larger models on certain benchmarks. DeepSeek's R1 represents the first major open replication of advanced reasoning capabilities, achieved through [an innovative four-stage training process](https://www.interconnects.ai/p/deepseek-r1-recipe-for-o1) heavily focused on reinforcement learning. Their aggressive pricing strategy - offering similar capabilities at a fraction of the cost of competitors - suggests we may see significant market disruption in the coming months.

## 📚 What we've been reading

We're lucky to be working in a field that not only has lots of practitioners who are pushing the limits of what's possible but there are also lots of smart people stopping and reflecting back and trying to draw together some best practices. This past month we learned a lot from:

<ul><li>Anthropic's '<a href="https://www.anthropic.com/research/building-effective-agents">Building effective agents</a>' gave us lots of food for thought around when to use agents as well as some vocabulary around the architectures that make sense.</li><li>Chip Huyen published <a href="https://huyenchip.com//2025/01/07/agents.html">her own take on agents</a> which is in turn an excerpt from <a href="https://www.amazon.com/AI-Engineering-Building-Applications-Foundation/dp/1098166302?language=en_US&amp;ref_=as_li_ss_tl&amp;linkCode=sl1&amp;tag=soumet-20&amp;linkId=01816c7d3ddfbc9515349562c9b55eae">her new book 'AI Engineering'</a>. Chip also released a blog around some <a href="https://huyenchip.com/2025/01/16/ai-engineering-pitfalls.html">common pitfalls when building GenAI applications</a>, of which the first probably needs saying the most often: "[Don't] use generative AI when you don't need generative AI."</li><li>Over at Hugging Face, Margaret Mitchell and a few others published <a href="https://huggingface.co/blog/ethics-soc-7">their perspective on the ethical tradeoffs</a> and risks around the deployment of agents. TLDR: "risks to people increase with a system’s level of autonomy: the more control a user cedes, the more risks arise from the system".</li></ul>

## 🎭 Rants Corner

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/3d76562b/6790e45a842cdc8a2f6d18bd_6790e42a669eda42c252fb73_CleanShot_20Jan_2022_202025_20from_20Newsletter.png" alt="Screenshot of Hamza&#039;s AI Engineering vs ML Engineering blog on the zenml website" />
</figure>

In "[AI Engineering vs ML Engineering: Evolving Roles in the GenAI Era](https://www.zenml.io/blog/ai-engineering-vs-ml-engineering-evolving-roles-genai)", I tackle a growing misconception in our industry: the idea that traditional software engineers can seamlessly transition into AI engineering roles. While the "everyone's an AI engineer" narrative is appealing, the reality is more complex. What often starts as simple API calls to GPT-4 quickly evolves into sophisticated ML engineering challenges, especially in enterprise environments.

Drawing from our experience with ZenML, I propose a clear separation between application and ML layers. AI Engineers should focus on user experience and business logic, while ML Engineers handle the complex data processing, evaluation frameworks, and MLOps infrastructure. This separation isn't about creating silos, but rather about acknowledging the distinct skill sets required for building robust AI systems at scale. Ultimately, though, the titles matter less than the architectural boundaries we draw - good system design reflects the reality of skills and responsibilities, not organizational charts or job descriptions.

## 📅 Upcoming Events

Finally, we have some events coming up in the not so distant future!

On January 29th, [Alexej will be presenting in Munich](https://www.linkedin.com/feed/update/urn:li:activity:7282745953369882626/) at the AI Developers Meetup around '7 Hard Truths About Production RAG: Beyond the Demo'. Some others in the team might also be there!

A little further away, [Alex will be presenting in Berlin](https://aws.amazon.com/startups/events/genai-loft-berlin-day-6-vertical-velocity-%E2%80%93-accelerating-genai-in-specific-industries?tag=soumet-20) at the AWS GenAI Loft. Provisional title is 'Practical LLMOps: Lessons from 400+ Real-World Use Cases with ZenML'.

Please do let us know if you're coming to either of these events. We'd love to meet up!

That's all for this month! From the AI Infrastructure Summit to our latest product updates and the ongoing discussions about AI/ML engineering roles, it's been an exciting start to 2025. As always, we're grateful for our growing community and the thoughtful discussions you bring to the table.

If you're using ZenML in interesting ways or have thoughts about the AI/ML engineering divide, we'd love to hear from you. Drop by our [Community Slack](https://www.zenml.io/slack) or reach out on social media.

Until next time, Hamza