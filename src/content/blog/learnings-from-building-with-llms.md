---
title: "Newsletter Edition #4 - Learnings from Building with LLMs"
slug: "learnings-from-building-with-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6667fc47cdb1a4a96d0d20b0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-06-17T14:42:50.559Z"
  lastUpdated: "2024-06-11T08:29:53.092Z"
  createdOn: "2024-06-11T07:27:03.531Z"
author: "hamza-tahir"
category: "newsletters"
tags:
  - "llm"
  - "zenml"
  - "mlops"
date: "2024-06-07T00:00:00.000Z"
readingTime: 5 min
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/fcd9fb01/6667fc0970502b90364b350f_llm_newsletter.webp"
seo:
  title: "Newsletter Edition #4 - Learnings from Building with LLMs - ZenML Blog"
  description: "Today, we're back to LLM land (Not too far from Lalaland). Not only do we have a new LoRA + Accelerate-powered finetuning pipeline for you, we're also hosting a RAG themed webinar."
  canonical: "https://www.zenml.io/blog/learnings-from-building-with-llms"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/c5820888/6667fc0970502b90364b350f_llm_newsletter.webp"
  ogTitle: "Newsletter Edition #4 - Learnings from Building with LLMs - ZenML Blog"
  ogDescription: "Today, we're back to LLM land (Not too far from Lalaland). Not only do we have a new LoRA + Accelerate-powered finetuning pipeline for you, we're also hosting a RAG themed webinar."
---

Hello there! Today, we're back to LLM land (Not too far from Lalaland). Not only do we have a new LoRA + Accelerate-powered finetuning pipeline for you, we're also hosting a RAG themed webinar. Enough content to fill the entire month and satisfy your LLMOps curiosities. Let's dive in..

## Learnings from Building with LLMs

Back to LLMs for this edition: Over the past year, significant insights have emerged from building with large language models (LLMs) in production, and I wanted to synthesize my thoughts here:

[Understanding fundamental prompting techniques is crucial](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifaim3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrlfyqd4peypbqxvn4qwfww2ug3unlauzo5nawo24s2jvwg4htm7knj3nuyijosfdqtjxjptvb7vbtjykyhxamxkocym6mdxyvhecoriazaoxotfwstiobwlyhoz), including n-shot prompts and in-context learning, which require a sufficient number of detailed examples to guide the LLMs effectively. Chain-of-Thought (CoT) prompting has shown to reduce hallucinations by helping models outline their reasoning before generating the final response. Structuring inputs and outputs to match the model’s training data format, such as [using XML for Claude](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifamm3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrlaz4nmdcknae4az6ilf7zlcgj6wvkzf33rvsv5rjuf2sjvozkztfuvwt3xlmrcply) and JSON for GPT, also significantly improves performance. Additionally, decomposing complex prompts into multiple, simpler parts allows for more precise and manageable workflows.

When moving from development to production, regularly reviewing LLM inputs and outputs is essential to understand data distribution and detect anomalies or drift. As elsewhere in MLOps, it’s necessary to manage the differences between development and production data to maintain model accuracy. Structured outputs, such as JSON or YAML, ensure smoother downstream integration. Despite the allure of sophisticated models, exploring smaller, less resource-intensive models can often yield [comparable or better results](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifaqm3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrlazid5veyvjy4qv5swehqkwvjcq3uvhpnw4hwlkmy) while optimizing for latency and cost. Design involvement early in the product development process is vital to ensure intuitive user experiences, particularly when incorporating Human-in-the-Loop (HITL) systems, which facilitate continuous improvement through user feedback.

Here are five good practices to consider when building with LLMs:

<ul start="1"><li><strong>Regular Data Review</strong>: Periodically check LLM inputs and outputs to maintain accuracy.</li><li><strong>Structured Outputs:</strong> Use machine-readable formats to ease integration with downstream systems. Use tools like <a href="https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifaum3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrlayeg4zfsna47qz6imekwlcfj7wii2vec4okpfytirxa" target="_blank">Instructor</a> or <a href="https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifaym3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrlayqannfqkbyzqxpa5ex2pmhlzgcecygvdri7oqildvqwhza73y3xa" target="_blank">Outlines</a> to coerce outputs into these formats.</li><li><strong>Model Pinning</strong>: Pin specific model versions to avoid unpredictable changes.</li><li><strong>Design Involvement</strong>: Engage design teams early for better user experience.</li><li><strong>Human-in-the-Loop Systems</strong>: Integrate feedback mechanisms to enhance data quality and model refinement.</li></ul>

A hands-on take on a lot of these core principles is explored in our [LLMOps guide](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifa4m3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrlaz4nmdckndizrn7avn3v3ovlf5u5bbuudv2hou7ugakwi2ha3xmef4pfaxu2q), which is nearly complete! Check it out today and reply to this email to share feedback!

## Finetuning LLM Project

We have a new LLM template + project for the community! Andrei created this from scratch and finetuned Mistral in a distributed setting to make sure it works. All you need to do is follow the README instructions to finetune it on your data!

[Checkout the code](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifbam3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrlazqonneqwaj4bx7qun74l2fd5dpnezug3hthmzdnhaaiaxzzjgrq3qzkwjdzzbtkkwbdmccsi2f3qxf5qwa6vfskduwkdpg4blqyv2oa)

## ZenML Product Corner

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/fd877c37/6667fb72cdb1a4a96d0c57de_new_docs_1.png" alt="" />
</figure>

### Fresh new docs

We've heard many times that old docs indexed by search engines and hard-to-search docs make the ZenML experience slightly tougher. We've taken your feedback into account and made the docs easier to understand and search through. 

[Check out the new docs](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifbem3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrlaz4nmdckndizrn7avn3v3o)

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/ee09b4ea/6667fb727eed753cf80f0d15_integrations_linkedin_20_281_29.png" alt="" />
</figure>

### +3 New Annotator Integrations

Following the computer vision webinar, we realized we missed a few integrations in that space. The 0.58.0 release brings in three new integrations for the annotator stack component: [Prodigy ,](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifbim3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrla3md43hqkjyyqdpq) [Argilla,](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifbmm3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrlazqonneqwaj4bx7qun7r2uhlzmiskzctpbpuwlp7er6o55ki) and [Pigeon.](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifbqm3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrlazqonneqwaj4bx7qun7r36h3cc3w7s3tevytne3xnh4ltr2a) Check it out by updating your ZenML!

[See notes](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifbum3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrlazqonneqwaj4bx7qun74l2fd5dpnezug3hthmzdnhaijbzzbggcq2bvi)

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/723bb2da/6667fb72810174fe1cf9fac4_retry.png" alt="" />
</figure>

### Retry configuration for Steps

The 0.58.0 release also includes new `retry` configuration for the steps. The following parameters can be set: `StepRetryConfig(max_retries=3, delay=10, backoff=2)`

[See notes](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifbym3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrlazqonneqwaj4bx7qun74l2fd5dpnezug3hthmzdnhaijbzzbggcq2bvi)

## Fresh from the community

### Reusing pipelines across projects

New community member [John W Oliver](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifcam3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrla2eimzfypjysrj4a2fowlwfl5mwp6qqqurrljszxf2uqbl6jorpwa) started a fantastic thread on how to share a data loading step in a pipeline between different projects. Michael replied with a clever solution using the log_artifact_metadata method.

[See Slack thread](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifcem3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrla2eimzfypjysrj4a2fowlwfl5mwfp6qarzj24yix4y4twt2rlt4iaweb46aaww3j62cdtjxrnkpb6iat4toir65i)

### The advantage of adopting ZenML

[Julien Beaulieu](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifcim3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrla2eimzfypjysrj4a2fowlwfl5mwp6qqqurrljszph2msrtzrurvdq) started an insightful discussion on how a team who has a mature software engineer setup can leverage ZenML to adopt better MLOps practices and still keep the benefits of their legacy infrastructure

[See Slack thread](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifcmm3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrla2eimzfypjysrj4a2fowlwfl5mwfp6qarzj24yix4y4twt2rlt4iaweb46aaww3j62cdtjwjlklg447atufwyfha)

## Register free for the LLM Webinar

### An hour of a practical hands-on session about RAG pipelines

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/c046c195/6667fb7276bdd11f17f113af_webinar_news.webp" alt="" />
</figure>

<ul start="1"><li>The process of ingesting and preprocessing data for your RAG pipeline </li><li>The critical role of embeddings in an RAG retrieval workflow</li><li>How ZenML simplifies the tracking and management of RAG-associated artifacts</li><li>Strategies for assessing the performance of your RAG pipelines</li><li>The use of rerankers to enhance the overall retrieval process in your RAG pipeline</li></ul>

[Register now](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifcqm3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrlay4aizfycj42qt7axegylsqy)

---

If you have any questions or need assistance, feel free to [join our Slack community.](https://cloudortto.zenml.io/r?p=abs73iraamgtd6ouq4abaztc2nzzcy7ytureeqifcum3xobjfgdusmettykqu6aiobdtfwqrha6syxkgrfbhpxodg23tvrla2eimzfypjy7rppqkftr3wei)

Happy Developing!

**Hamza Tahir**