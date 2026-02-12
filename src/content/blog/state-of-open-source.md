---
title: "Newsletter Edition #3 - State of Open Source"
slug: "state-of-open-source"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66436e73577dde718289ff1a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-05-14T14:06:43.322Z"
  lastUpdated: "2024-05-14T14:06:43.322Z"
  createdOn: "2024-05-14T14:00:19.567Z"
author: "hamza-tahir"
category: "newsletters"
tags:
  - "newsletter"
  - "zenml"
  - "open-source"
date: "2024-05-13T00:00:00.000Z"
readingTime: 3 mins
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/5d7d5c42/66436e40d511269b872dcc76_newsletter03.webp"
seo:
  title: "Newsletter Edition #3 - State of Open Source - ZenML Blog"
  canonical: "https://www.zenml.io/blog/state-of-open-source"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/d4d85558/66436e40d511269b872dcc76_newsletter03.webp"
  ogTitle: "Newsletter Edition #3 - State of Open Source - ZenML Blog"
---

Hello lovely people! We're back with another banger! Lots to get through, including musings on open source, more LLMOps stuff, and how hard creating a professional YouTube video can be! Let's dive in.

## State of Open Source

According to Synopsys, [96% of all codebases contain open-source software](https://www.synopsys.com/software-integrity/resources/analyst-reports/open-source-security-risk-analysis.html?intcmp=sig-blog-ossra22). Despite being so prevalent, it's no secret that the open source world is in turmoil, trying to reconcile its open roots with the ever-increasing demands for commercialization. The last few years have seen major OSS players switch tactics, and lean in towards more restrictive licensing. Here are some examples:

<ul start="1"><li><a target="_blank" href="https://www.hashicorp.com/">Hashicorp</a> switches to the <a target="_blank" href="https://en.wikipedia.org/wiki/Business_Source_License">BSL Licence</a> and promptly <a target="_blank" href="https://www.hashicorp.com/blog/hashicorp-joins-ibm">gets acquired by IBM</a></li><li><a target="_blank" href="https://redis.io/">Redis</a> switches to "<a target="_blank" href="https://arstechnica.com/information-technology/2024/04/redis-license-change-and-forking-are-a-mess-that-everybody-can-feel-bad-about/">Dual Source-Available</a>" licensing</li><li>In the MLOps community, model deployment tool <a target="_blank" href="https://www.seldon.io/strengthening-our-commitment-to-open-core">Seldon switched to BSL</a></li></ul>

While “classical” OSS companies choose to go closed, in the world of GenAI and LLMs, we see the battle raging differently. Every week, a new OSS model comes out that competes with the likes of OpenAI, evidenced most dramatically by [Llama 3 by Meta](https://llama.meta.com/llama3/) and IBM’s [Granite Family](https://research.ibm.com/blog/granite-code-models-open-source). These models are basically all hosted on HuggingFace, a company which is unabashedly open source. However, proprietary models still lead the pack, with [GPT-4o](https://openai.com/index/hello-gpt-4o/) launched just yesterday bringing realtime, omnichannel LLM capabilities to the world. 

It’s hard to predict how all this will play out. What I can say with confidence is that ZenML is open source and freely available under Apache 2.0, and we plan to keep it this way. We're putting our energy more into innovating on that tenuous line between the OSS and [Cloud offering](https://zenml.io/cloud). Reaffirming our commitment to OSS, we recently [open sourced our new dashboard. ](https://www.zenml.io/blog/oss-dashboard-release)We hope that taking such actions gives assurances to the community that we will stick by our open source roots.

## Computer Vision Webinar

Last week, we conducted our first webinar, talking about building the data flywheel for computer vision.  It went really well, with lots of crowd participation. Can't wait to host the next one!

[Watch the recording now](https://streamyard.com/watch/w3kGSHmWqDiS)

## ZenML Product Corner

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/9e952583/66436dd985e8f00d1c1a8715_dashboard.png" alt="" />
</figure>

### Open sourcing our new dashboard

Last week brought the HUGE news that we finally unfiied the cloud and open source dashboards! The new OSS dashboard brings a fresh new modern design, and is way easier to use than the old one. Upgrade ZenML today, you won't want to miss out on this one!

[Learn More](https://www.zenml.io/blog/oss-dashboard-release)

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/5f25f9c7/66436dd9045a6babe2fcc84e_lora.png" alt="" />
</figure>

### Multi-GPU LLM finetuning with PEFT

We have a brand new ZenML project by [Andrei](https://www.linkedin.com/in/andrei-vishniakov/), which features a pipeline that fine-tunes Mistral using PEFT. The cool thing about this is that this works in a multi-gpu, distributed setting. Check it out!

[See code](https://docs.zenml.io/user-guide/cloud-guide)

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/802deec2/66436dd903cc4a8095deaadc_reranking.webp" alt="" />
</figure>

### Reranking for better retrieval with LLMs

Rerankers are a crucial component of retrieval systems that use LLMs. In the latest chapter of the LLMOps guide, [Alex](https://www.linkedin.com/in/strickvl/) walks us through implementing rerankers from scratch.

[Read more](https://docs.zenml.io/user-guide/llmops-guide/reranking)

## Fresh from the community

### Churn prediction MLOps project

Community member [jitxs](https://github.com/yo-harsh) is working on a churn prediciton project using ZenML. It has some nice work and Streamlit to demo the app. Nice work Harsh!

[See code](https://github.com/yo-harsh/MLOps)

### Amazing user interviews

We had an absolute blast talking many new users about onboarding on ZenML, and we learned a lot! Hopefully, these learnings go right back into the product and make it better for everyone. Thank you to the participants, and please note we are still looking for more people who are willing to do a 30-minute user interview with us - register now!

[Register for a user interview](https://forms.gle/ZHqpHvqmPQnqGHD8A)

## We're on YouTube!

### Featuring a brand-new MLOps tutorial in 11 minutes!

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/e7a14f05/66436dd96e9e5eae8ed3501b_maxresdefault.jpeg" alt="" />
</figure>

<ul start="1"><li>Working with <a target="_blank" href="https://www.linkedin.com/in/gabitov/">Renat Gabitov</a> and the team at <a target="_blank" href="https://www.linkedin.com/company/represent-studio/">Represent</a>, we recorded a "<strong>Zero to Hero</strong>" video tutorial using ZenML.</li><li>The video is professionally edited and shot, and features yours truly. It took me two hours to shoot, and made me appreciate how tough being a full-time YouTuber can be!</li><li>Like and subscribe on YouTube to show the love!</li></ul>

[Watch Tutorial](https://www.youtube.com/watch?v=wEVwIkDvUPs)

---

If you have any questions or need assistance, feel free to [join our Slack community.](https://zenml.io/slack)

Happy Developing!

 

**Hamza Tahir**

