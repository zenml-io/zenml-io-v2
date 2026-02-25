---
title: "Newsletter Edition #1 - Welcome to the ZenML newsletter!"
slug: "welcome-to-the-zenml-newsletter"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6630ab7d96f380cd57921588"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-05-03T07:38:19.804Z"
  lastUpdated: "2024-04-30T08:27:54.820Z"
  createdOn: "2024-04-30T08:27:41.630Z"
author: "hamza-tahir"
category: "newsletters"
tags:
  - "newsletter"
  - "llm"
date: "2024-03-26T00:00:00.000Z"
readingTime: 5 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/dbf8d0cb/65fbf4b2d292e9741e3d0da4_LLMs-min.png"
seo:
  title: "Newsletter Edition #1 - Welcome to the ZenML newsletter! - ZenML Blog"
  canonical: "https://www.zenml.io/blog/welcome-to-the-zenml-newsletter"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/95efd684/65fbf4b2d292e9741e3d0da4_LLMs-min.png"
  ogTitle: "Newsletter Edition #1 - Welcome to the ZenML newsletter! - ZenML Blog"
---

## Welcome to the ZenML newsletter!

Hello there! This is [Hamza](https://linkedin.com/in/hamzatahirofficial), co-founder of ZenML. The fact that you are receiving this newsletter is either because you signed up directly or created an account on [ZenML Cloud](https://zenml.io/cloud). Either way, I'm happy to see you, and hope you're having a lovely day!

We started this newsletter because the MLOps & LLMOps world is crazy right now, and we wanted a place to share with the ZenML community our thoughts as we navigate it. Personally, I really enjoy how [Tristan Handy (founder of dbt Labs)](https://substack.com/@analyticsengineeringroundup) approaches newsletters. They are more like essays on his team's current thought process, and I find them fascinating reads. We'll try to keep these equally personal, and shed some light on the ZenML perspective in the space.

I took a look at the people who've signed up for the newsletter so far, and it's a very diverse mix - From students to ZenML customers to ML practitioners who I'm sure are just curious. I hope we can strike a balance between high-level strategic topics vs hands-on tutorials and guides that might help people who want to get their hand's dirty.

If you have any feedback at any time, please us me know by hitting the reply button. As this is the first ever newsletter, I expect there is a lot of learnings to be had over the next months. 

## The evolution of RAG in Production

For a long time, I was not sure what a good entrypoint story for ZenML into LLMOps would be. However, the more I look into production LLM use-cases,  specifically Retrieval-Augmented Generation systems, the more it dawned on me that these dynamic systems are not dissimilar to the typical MLOps projects where ZenML fits in rather smoothly. 

In fact, there seems to an even greater need for automation and putting together disparate infrastructure components. Starting from a basic RAG use-case, you can add reranking, finetune embeddings (this is getting [easier](https://twitter.com/tomaarsen/status/1771200896862499326)), and even finetune the LLM. This[ recent paper](https://arxiv.org/abs/2401.08406) showcases the journey well. Here is my take:

<ul start="1"><li>The set-up of an LLMOps system involves four steps. The first step is stablishing an indexing pipeline to automate data updating from proprietary sources is the crucial first step to creating an effective LLMOps system.</li><li>Increasing the sophistication of the setup, a reranking model is added to the system. This model helps score and reorganize documents according to their relevance to a given query. Training this model over time can lead to improved accuracy.</li><li>Fine-tuning embeddings on the system can significantly improve retrieval rates, further enhancing the overall effectiveness of the setup. This process, however, is more complex and requires the generation of synthetic data.</li><li>The final step involves further fine-tuning or pretraining the large language model. This step is technically complex but can yield results that are specific to your domain or data, enhancing the quality and relevance of the system's output.</li></ul>

ZenML is well positioned to be the tool that connects the disparate LLMOps components together, and automates these pipeline end to end, regardless of which tool you are using. I'm super excited to see how ZenML can condense this journey and make it easier for people to get started putting to together. More details in the accompanying blog.

[Read the full RAG evolution blog here](https://gmlnk.com/api/v1/track/link/click/631203231d1fa7664007b69b/1711033381932/?link=https%3A%2F%2FdjZ6V304.eu1.hubspotlinksstarter.com%2FCtc%2FDQ%2B113%2FdjZ6V304%2FVVBFqw1z3CWGW18BQnw1dfhjQVXkGBG5bY80YMSn_px3m2ndW8wLKSR6lZ3kDW4l1KwH4x12YSW7RZSyj4FRF9NW50M8wh5KwHglN2pDm9B6KqM5W6Trgn44VS7r5N89jxNp17BcNW1fGHwH12zfxyW90ZvNk8q0-pHW3z7Tgm357mQdN8WqJ4SmrqMmW2cC5NZ3cmVF2W7b2hc83mynk-W96R_3C200NhFVvMmgm3-NSFVW6lxpVS6WyPb3W5VPtjj1FKY4NW9ftKcq2Y2n-SN2cJg4tFRTkrVJQvWD3_T3qqN7yMflz2VH9tW9c_CW61LSHW3W8gwrjx8LLF83W99HK2Y6-MvBXN2DxS_NF5Nh5W5sC57B75mWm8N6cCTnxL4KVDW1kN0bH59SQsTW7BfgDq1nL-Dcf4Sr7l004)

## Join the conversation

### Finetuning opensource LLMs using MLOps pipelines

Refine your ML strategies with our latest insights into fine-tuning open-source LLMs using MLOps pipelines.Join the LinkedIn conversation [here](https://gmlnk.com/api/v1/track/link/click/631203231d1fa7664007b69b/1711033381932/?link=https%3A%2F%2FdjZ6V304.eu1.hubspotlinksstarter.com%2FCtc%2FDQ%2B113%2FdjZ6V304%2FVVBFqw1z3CWGW18BQnw1dfhjQVXkGBG5bY80YMSn_pd3m2ndW7Y8-PT6lZ3nWW3Msz0P6QHpzlM6hJKY2qbvsW6CT78w8kWZ7jW6ZwhMQ4gxFDdW73H42v3NdstTW5t30DY6h_VxzW7G-1Bh8yRH_bW3J8f771FTsRWW8B75Hz6KVtjrVYgmj453rChPW2S5WTT6Db6B8W2NB1l83NXWQdW356MKq7FwWwHW8t1ZCl5c4cdQV9TRK01SjGW7V-g_1c24PmCSW5QpBXh85mJ4bW6QWzWr5LjWhDW3WY9Wd3JWQcwW7jc7T78r1fzvW4DPlQL7m-44yW8W2MN67nWDC2W2tL8XN3Wx1NdW7Pn3Yp87ynXRW5NsfcG5ZtTgjW8K4qXK34dJb0f7rTPyv04).

### 12 Key Pain Points in RAG Implementation & Their Solutions

The complexities and solutions for deploying Retrieval-Augmented Generation (RAG) systems in production

Discover more in the detailed discussion and join the conversation [here](https://www.linkedin.com/feed/update/urn:li:activity:7174344744129413120/).

## ZenML Product Corner

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/5912d61a/6630ab081fee98c0ffd216db_services_snippet.png" alt="" />
</figure>

### HuggingFace Deployer + Services Update

With [0.56.2](https://github.com/zenml-io/zenml/releases/tag/0.56.0), we released amazing features including a community-contributed HuggingFace Deployer and a more robust way of dealing with Services (e.g. model deployments)

[Learn More](https://gmlnk.com/api/v1/track/link/click/631203231d1fa7664007b69b/1711033381932/?link=https%3A%2F%2FdjZ6V304.eu1.hubspotlinksstarter.com%2FCtc%2FDQ%2B113%2FdjZ6V304%2FVVBFqw1z3CWGW18BQnw1dfhjQVXkGBG5bY80YMSn_nY3m2ndW7lCdLW6lZ3l_N7KJJLqxgch_W3Tn5Xb3FDnBFM5jfCZ2nq7yW5Nf8l33ybjDtW9cN-Ls91WlLPW7mYlkZ892M4nW5SKYT726KLjkW6RS2rK3b7BXlW2Wt1hw3y-xmpW26MZMf13KfYRW4vy0yT9b73GFW72Kw-R3GbqyYW4dSLLL7l1DrwVq-ts14SQx92W8SG2p91VBFf3W5G_YYv5Szm2YW7BLYb144f77XW4DDSpx5pNxw2W8VwgFl6SgjQyMGjJ50HrrXXVKnQRC46r2wQW6fbZDv7NlwgWN8tTYwTvlvHwW639t858874wkf6MqzcK04)

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/c5182639/6630ab086e7ac3170e11fae5_llm_finetuning_zoomed_2x.png" alt="" />
</figure>

### A brand-new LLM finetuning template

The new LLM finetuning template contains a collection of ZenML steps, pipelines and other artifacts and useful resources that can serve as a solid starting point for finetuning open-source LLMs using ZenML.

[Check it out](https://github.com/zenml-io/zenml/tree/main/examples/llm_finetuning)

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/00b31aa7/6630ab08b5ddd719bf47fd75_zenml-new02.gif" alt="" />
</figure>

### New cloud onboarding for a faster start!

When you deploy your tenant you now get a simple onboarding flow that gets you started in no time.

[Learn More](https://gmlnk.com/api/v1/track/link/click/631203231d1fa7664007b69b/1711033381932/?link=https%3A%2F%2FdjZ6V304.eu1.hubspotlinksstarter.com%2FCtc%2FDQ%2B113%2FdjZ6V304%2FVVBFqw1z3CWGW18BQnw1dfhjQVXkGBG5bY80YMSn_pd3m2ndW7Y8-PT6lZ3nlW9c2-jy3Jr03XW7-Bv0D4Sj7nJN20cxWSQhn7HW2pmqN6337tG1MRTFSLTY4xCW6cm0_58t59F5W95R4lj8wZj_JW4DZ1vH6sJQ16W52GlZd35zmh7N1fJG7DGb1bbW2jyt2R4SVZgzW7G_6tF49Ys72N2Lmq76c2-jrW7DRVk57HH79tW1Y8FNb7h3v3cW7VCM8Z5HtXHzW1KBw4X7BGj7MW1L6x1S6w2bPbVZnpjS53RhmxW367K7l7xVgQqW6jHdVb52pwfkW1szBh834svHwW7vyC031gvzhRW8498pQ3v-0xmW7CGDGL8TsdKWW1BJX2472_zLqf33bBHd04)

## Fresh from the community

### New #generative-ai channel

Get ready to learn and discuss generative AI use cases (from LLMs to video and image generation and beyond).

[Join our Slack](https://zenml.io/slack)

### Contributors Spotlight

 We had three awesome contributions by [@dudeperf3ct](https://github.com/dudeperf3ct), [@moesio-f](https://github.com/moesio-f),and [@christianversloot](https://github.com/christianversloot) in the 0.56.0 release!

[Check release notes](https://github.com/zenml-io/zenml/releases/tag/0.56.2)

If you have any questions or need assistance, feel free to [join our Slack community.](https://zenml.io/slack)

Happy Developing!

**Hamza Tahir**