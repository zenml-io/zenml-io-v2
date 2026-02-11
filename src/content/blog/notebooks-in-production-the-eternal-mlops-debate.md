---
title: "Newsletter Edition #7 - Notebooks in Production: The eternal MLOps debate"
slug: "notebooks-in-production-the-eternal-mlops-debate"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66d5c0c131a6d789e246c1f3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-09-02T13:43:17.478Z"
  lastUpdated: "2024-09-02T13:43:17.478Z"
  createdOn: "2024-09-02T13:42:25.754Z"
author: "hamza-tahir"
category: "newsletters"
tags:
  - "newsletter"
  - "zenml"
  - "mlops"
date: "2024-08-30T00:00:00.000Z"
readingTime: 3 mins
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/7db419ad/66d5c0a9cf6d8e57c18e905f_zenml_news07.png"
seo:
  title: "Newsletter Edition #7 - Notebooks in Production: The eternal MLOps debate - ZenML Blog"
  description: "A new ZenML newsletter featuring Istanbul cooking adventures, faster docker builds, and more"
  canonical: "https://www.zenml.io/blog/notebooks-in-production-the-eternal-mlops-debate"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/7db419ad/66d5c0a9cf6d8e57c18e905f_zenml_news07.png"
  ogTitle: "Newsletter Edition #7 - Notebooks in Production: The eternal MLOps debate - ZenML Blog"
  ogDescription: "A new ZenML newsletter featuring Istanbul cooking adventures, faster docker builds, and more"
---

Hi everyone!

August turned out to be an unexpectedly busy month, far from the slow summer pace I anticipated. Let me catch you up on what's been happening!

First, thank you to everyone who responded to my question about ZenML's core value proposition. Your diverse and nuanced replies were incredibly helpful in understanding how our community perceives the framework. Internally, we've spent considerable time this month revisiting our fundamentals and examining current MLOps practices, especially on hyperscalers. 

Does this resonate with you? We've heard countless stories like:

<ul><li>"We set up Kubeflow in-house, but data scientists aren't using it."</li><li>"Infrastructure mandates AWS, but our ML teams dislike Sagemaker."</li><li>"GCP Vertex AI is overly complex with long spin-up times - we've reverted to hosted notebooks."</li><li>"Our internal K8s cluster is great, but data scientists struggle with kubectl."</li><li>"AzureML and Databricks are too costly and restrictive in coding approach."</li></ul>

If these scenarios sound familiar, ZenML might be just what you need. Give our [new quickstart](https://colab.research.google.com/github/zenml-io/zenml/blob/main/examples/quickstart/quickstart.ipynb) a try to see how we can help!

Now, let's dive into this month's updates...

**🥂Dishing out new features, together in Istanbul**

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/5fe0ff23/66d5be3e80e90e9b559f051a_team.jpeg" alt="" />
</figure>

This month the entire ZenML team got together at a central meeting point in the beautiful and historical city of Istanbul. As a remote team, this was a moment where a lot of us met for the first time in the real world! We got to share many laughs, memories, and brainstormings about the future of MLOps, LLMOps, and the place ZenML takes in it!

I know this is a newsletter about MLOps, but I couldn't help but share this moment with everyone here. At least, you can now put some faces to the people behind the product!

**📓ZenML and Notebooks: A love-hate relationship (or is it?)**

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/6208c2df/66d5be3ed36a985d71824bd2_zenml_notebooks.png" alt="" />
</figure>

ZenML has historically been used outside of notebooks - as it is usually in the phase of development where things need to be put into a pipeline, therefore after that fast, iterative notebook phase is over. There have been endless debates of how to bridge that gap between these two phases, and while I don't think ZenML will ever advocate for deploying notebooks in production, we now have something that is a great compromise for this eternal discussion.

From 0.64.0 onwards, you are now [able to run pipelines](https://docs.zenml.io/how-to/run-remote-steps-and-pipelines-from-notebooks) (and even single steps) directly from a notebook on to your production orchestrator. This is really a big change for ZenML, and I believe will spur a new usage pattern we have not quite seen before. I expect many users to iterate and deploy their ZenML workloads directly from Jupyter now. Will this put the eternal notebook debate to rest? We'll have to wait and see!

[Run an example](https://colab.research.google.com/github/zenml-io/zenml/blob/main/examples/quickstart/quickstart.ipynb)

**💻 A New Onboarding Experience for ZenML**

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/005b56c0/66cc3c8edfe4b28ff5b31f25_66cc3b3af8af09132b41d864_ZenML_20Onboarding_20_3_.gif" alt="" />
</figure>

So, remember how I mentioned trying out our new quickstart? Well, there's a bit more to that story. Our great OSS contributer team (shoutout to [Tess ](https://www.linkedin.com/in/tesslockey/)and [Jonathan](https://www.linkedin.com/in/jonathan-hurd-006b4414/)!) have cooked up this nifty VSCode extension that basically gives you a guided tour of ZenML right in your IDE. No more jumping between docs and your code editor - it's all right there in one place.

Curious to try it out? Just head over to our GitHub repo, hit that 'Code' button, and spin up a new Codespace. Easy!

[Try it Out!](https://github.com/zenml-io/vscode-quickstart)

**🫱🏾🫲🏼 Meet me (Hamza) at AI Tinkerers Paris!**

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/01e2836b/66d5be3e9a631450c143d816_aitinkerers_paris.jpeg" alt="" />
</figure>

I'll be giving a talk next week at the [AI Tinkerers event in Paris](https://paris.aitinkerers.org/), featuring Mistral. It's on Tuesday, September 3rd, 2024. The talk is about scaling GenAI systems - specifically, how to build and manage a system that can handle thousands of personalized AI models. I'll be using a demo that showcases mass AI personalization using Flux.1 model finetunings with DreamBooth.If you're in Paris next week, come check it out and hit me up! If not, I'll share some key takeaways in the next newsletter.

[Hit me up!](https://www.linkedin.com/feed/update/urn:li:activity:7234118563932815361/)

**😎 The rest...**

<ul><li>MLOps, why it matters, and how to implement ot [<a target="_blank" href="https://www.zenml.io/blog/mlops-what-why-how">Blog</a>]</li><li>We have a brand-new quickstart. Experienced users should also try [<a target="_blank" href="https://colab.research.google.com/github/zenml-io/zenml/blob/main/examples/quickstart/quickstart.ipynb">Colab</a>]</li><li>Bridge the gap between Composer and Vertex AI pipelines on GCP [<a target="_blank" href="https://www.zenml.io/blog/cloud-composer-airflow-vs-vertex-ai-kubeflow">Tutorial</a>] </li><li>ZenML now has an AzureML Pipelines orchestrator [<a target="_blank" href="https://docs.zenml.io/stack-components/orchestrators/azureml">Docs</a>]</li><li>🤗Accelerate + ZenML: Multi-node, multi-gpu training [<a target="_blank" href="https://docs.zenml.io/how-to/training-with-gpus/accelerate-distributed-training">Docs</a>]</li><li>Latest versions of ZenML have a smarter way of reusing docker builds [<a target="_blank" href="https://www.zenml.io/blog/new-zenml-features-notebook-integration-improved-docker-builds-azureml-and-terraform-and-more">Notes</a>]</li><li>Intricacies of implementing DAG visualizations in VS Code [<a target="_blank" href="https://www.zenml.io/blog/dag-visualization-vscode-extension">Blog]</a></li><li>ZenML vs. Apache Airflow: A Comparative Analysis for MLOps [<a target="_blank" href="https://www.zenml.io/blog/zenml-vs-apache-airflow-a-comparative-analysis-for-mlops">Tutorial</a>]<br /><br /></li></ul>

Cheers,

Hamza

Co-founder, [ZenML](https://zenml.io/)