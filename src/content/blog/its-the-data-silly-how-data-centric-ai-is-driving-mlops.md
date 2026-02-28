---
title: "It's the data, silly!' How data-centric AI is driving MLOps"
slug: "its-the-data-silly-how-data-centric-ai-is-driving-mlops"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6530aafc1a0a3a90b43badd1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-01-26T14:58:56.785Z"
  lastUpdated: "2024-01-26T14:58:56.785Z"
  createdOn: "2023-10-19T04:05:16.315Z"
author: "hamza-tahir"
category: "mlops"
tags:
  - "mlops"
  - "bigger-picture"
  - "education"
  - "evergreen"
  - "machine-learning"
  - "pipeline"
date: "2022-04-07T00:00:00.000Z"
readingTime: 9 Mins Read
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/5d798921/6530aa4537a36ef8301da0ef_data-centric.png"
seo:
  title: "It's the data, silly!' How data-centric AI is driving MLOps - ZenML Blog"
  description: "ML practitioners today are embracing data-centric machine learning, because of its substantive effect on MLOps practices. In this article, we take a brief excursion into how data-centric machine learning is fuelling MLOps best practices, and why you should care about this change."
  canonical: "https://www.zenml.io/blog/its-the-data-silly-how-data-centric-ai-is-driving-mlops"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/172a94ce/6530aa4537a36ef8301da0ef_data-centric.png"
  ogTitle: "It's the data, silly!' How data-centric AI is driving MLOps - ZenML Blog"
  ogDescription: "ML practitioners today are embracing data-centric machine learning, because of its substantive effect on MLOps practices. In this article, we take a brief excursion into how data-centric machine learning is fuelling MLOps best practices, and why you should care about this change."
---

**Last updated:** April 7, 2022.

You start your day with jupyter lab, and look at the latest state of affairs from yesterday. The notebook springs up on port 8888 and you see your matplotlib graph from yesterday, annoyingly stuck at 80% accuracy. After a few hours of hard work, you finally find a hyperparameter that works. You set it, go through the cells, and suddenly you’re at 95% accuracy. You re-check it over and over, and after making sure you did everything right, you export your model into a file and hand over the code and model to engineering, a smile on your face, and with the assurance that **you** did your job well. Now you can sit back and see the bottom line growing. Right?

Wrong. Your engineer glares back at you and asks for your requirements.txt file. He cannot reproduce your results — there is an error on their machine. They ask what data you trained on, which operating system you developed on, and just generally about following “MLOps” principles. You go back and try to answer these questions but now you’re in a painful debugging loop.

Does any of this sound familiar? As classically-trained data scientists, we have been tuned to stay within a notebook environment and iterate on the code and model. Doing this can lead to unintended consequences and optimizing for the wrong result. Perhaps you would have faired better if you would have taken a slightly different approach to your model development, rooting yourself from the start in these MLOps principles engineers keep talking about.

There is an ever-increasing plethora of resources around MLOps (see the end of this article) and an increasing amount regarding the shift from model-centric to data-centric machine learning. However, few speak about the link between data-centric machine learning and how it is driving MLOps practices today. In this article, I go deeper into how a data-centric, pipeline-based approach to machine learning is one of the best ways to follow MLOps principles, and how you as a data scientist would benefit greatly from understanding why that is the case.

## MLOps is not just about deploying models

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/3e6d4ff9/6530aa7926471fecd5f5b0f3_mlops_tweet.png" alt="" />
</figure>

When speaking about MLOps, developers often confuse it with the simple act of deployment. However, conversations such as the above do not simply refer to deploying models. Machine learning engineering tackles a broader set of challenges that span more than merely wrapping up a model in a server application and deploying it.

ML development may be broken down into the following (relatively) simple processes.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/e79a93da/6530aa79519766d64955755e_mlops_process_0.png" alt="" />
</figure>

Taken as silos, these processes don’t sound too hard:

<ul><li>Feature engineering is getting easier with feature stores such as <a href="https://feast.dev/">Feast</a>.</li><li>The training loop is made easier by thousands of tools that help in the iterative process, from experiment tracking tools like <a href="https://mlflow.org/">MLflow</a> and <a href="https://wandb.ai/site">Weights &amp; Biases</a> to advanced training frameworks like <a href="https://www.pytorchlightning.ai/">PyTorch Lightning</a>.</li><li>Deploying models are also getting easier with the advent of advanced tooling such as <a href="https://github.com/SeldonIO/seldon-core">Seldon Core</a>, or managed services offered by all the major cloud providers.</li></ul>

However, the reality is that the process looks more like this:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/84600c76/6530aa798d403fea68594d82_mlops_process_1.png" alt="" />
</figure>

More than code, in machine learning **data** affects the output of the system directly. There are feedback loops that happen implicitly and often explicitly within the lifetime of a model that is deployed in production. While in classical software development one could simply test and vet code as it passes through various stages to production, it is more complex and difficult to this in a system affected by data.

It is in these feedback loops where MLOps ultimately lives. It is not enough to do this process once: A successful ML team needs to execute this process over and over again, and in a manner such that the system can be trusted.

Simply stated, MLOps is a set of practices that aims to deploy and maintain machine learning models in production reliably and efficiently. This is including and beyond getting these models deployed into production.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/db1fda8d/6530aa798d403fea68594da6_mlops_process_2.png" alt="" />
</figure>

## Post-deployment Woes

When looked at from this perspective, it is more intuitive to understand that the trouble starts after the first deployment. Here are just a few examples:

### Latency problems:

If latency is not accounted for whilst developing ML models, it can have a huge impact on a business. You could lose [half your traffic](https://www.thinkwithgoogle.com/consumer-insights/consumer-trends/mobile-site-load-time-statistics/) with a slow load-up of your application. This means that when employing models in production, one needs to be cognizant of latency requirements in production.

### Maintaining fairness and avoiding bias

If left unchecked, bias can creep into a ML system very easily. [Microsoft’s rogue racist Twitter bot](https://www.nytimes.com/2016/03/25/technology/microsoft-created-a-twitter-bot-to-learn-from-users-it-quickly-became-a-racist-jerk.html) is an example of not setting up systems to maintain fairness in ML development. If a model is not inspected closely (e.g. in terms of slicing metrics), then a practitioner risks that they might unintentionally model bias into the system. This is where examining data closely is critical to ensure a robust and fair system.

### Lack of explainability and auditability

If fairness is not maintained in a system, then legislators will be in their full right to come after ML practitioners. The [European Commission](https://ec.europa.eu/commission/presscorner/detail/en/IP_21_1682) is already rolling out new laws and checks, and we can only expect this to grow over time. Practitioners should be able to answer questions such as why a certain prediction was made, how a certain model was trained, and on which slice of data. These audit trails are all parts of the MLOps workflow.

### Painfully slow development cycles

Getting a model into production can take [up to a year for many companies](https://algorithmia.com/state-of-ml). That means going through the above process only once can cost hundreds of thousands of dollars, let alone having to do it again and again. Teams need to automate most of the tedious stuff away if they are to have any sort of argument for a legitimate return-on-investment for machine learning being applied in a business.

### Model, concepts, and data drifts

The real world is not static. Training models on data that do not change are willingly ignoring the fact that this does not happen in the real world. The recent [disaster at Zillow](https://www.geekwire.com/2021/zillow-shutter-home-buying-business-lay-off-2k-employees-big-real-estate-bet-falters/) is illustrative of how drift can cost a business dearly. As the world changes, MLOps systems need to be robust to these changes and deal with them as they arise.

## Model-centric vs Data-centric Machine Learning

Andrew Ng recently popularized the term data-centric machine learning with his excellent talk in 2020. Watch the full video below:

<figure class="w-richtext-figure-type-video w-richtext-align-fullwidth" style="padding-bottom:56.25%" data-rt-type="video" data-rt-align="fullwidth" data-rt-max-width="" data-rt-max-height="56.25%" data-rt-dimensions="0:0" data-page-url=""><iframe src="https://www.youtube.com/embed/06-AZXmwHjo" frameBorder="0" allowfullscreen=""></iframe></figure>

The essence of the talk is as follows: You can get a lot of bang for your buck from your data by being data-centric rather than model-centric. This means that rather than iterating on the model/code and holding the data static in ML development, it would pay more dividends if you were to hold the code/model static (or even start with a simple model) and try to simulate real-world behavior with the data. This of course is in stark contrast to how ML is taught in crash courses and universities, where the process usually starts in a notebook with reading a static, well-prepared dataset, and training a model on it.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/9e04e9d2/6530aa7a56fb9f228213cf5a_model_vs_data_centric.png" alt="" />
</figure>

When taking a look at the challenges facing ML in production today, it is clear that a shift towards being data-centric is simply the natural mindset shift that is required. Latency problems can be solved by exposing data scientists to real-world data ingestion patterns. Fairness and bias can be avoided by inspecting the data at the moment of model training. Auditability trails can be kept if data is versioned and tracked as models are developed. The development cycle can also be accelerated vastly by creating data-centric workflows that can adapt to changing data. Finally, drift and data quality can be accounted for early on in the development process.

Here is an example of a model-centric decision vs a data-centric decision, that also showcases its link with MLOps. Let’s say a data scientist has a dataset for the last year and is tasked with developing a model. The model-centric way of approaching such a task would be to use the entire data to train the model with a little bit leftover as a test set to verify the model metrics. Perhaps hyperparameter tuning is applied to squeeze out the maximum accuracy from the model and data.

On the other hand, a data-centric decision, and a decision that would help ultimately in production, would be to partition the data in a way that a portion of it (let’s say the first three quarters of the year) is used for the training process, and the last quarter is used as a separate dataset to see how the model drifts over time. This would perhaps incur a slight loss in accuracy for the model, but give key information about the behavior of the model by simulating it being deployed out in the real world.

In the end, while being model-centric has its benefits, adding data-centric decisions into the mix is ultimately what is the best path forward when applying ML in the real world. With that, there is a natural synergy between this and the adoption of MLOps.

## Towards data-centric ML(Ops): From scripting to pipelines

A concrete shift to data-centric machine learning often involves an ML team shifting focus from script-based development to pipeline-based development. Machine learning lends itself very nicely to developing in terms of pipelines because most development does consist of a sequence of steps carried out in order.

Here it is important to make a distinction between data-driven pipelines vs task-driven pipelines. This means that serious teams develop ML code as chunks of steps, using some form of tooling to isolate the orchestration of execution of steps from each other. This has the following benefits:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/cd6f3e45/6530aa7ad25c27f91f94e55c_pipeline_advantages.png" alt="" />
</figure>

Often this means stepping out of a notebook environment or finding some way of transporting notebook code to such a paradigm.

## Takeaways

So, in short, here is the link between MLOps and data-centric machine learning:

<ul><li>ML in production is different from ML in research and has a different set of challenges.</li><li>These challenges are growing in relevance as the adoption of ML increases.</li><li>MLOps helps solve these problems.</li><li>MLOps is rooted in being more data-centric than model-centric.</li><li>Developing pipelines help in being more data-centric.</li></ul>

I hope that helps to clarify the link between these two popular terms and gives beginner MLOps practitioners an indication of where to take their efforts as they develop internal ML tooling for their organizations.

Shameless plug: If you’d like to start the shift towards data-centric machine learning by developing ML pipelines, then you might want to take a look at [ZenML](https://github.com/zenml-io/zenml). It is designed with the following goals:

<ul><li>Be simple and intuitive to give a simple path toward data-centric machine learning.</li><li>Be infrastructure and tooling agnostic across the MLOps stack.</li><li>Start writing your pipeline in a notebook and carry it easily into the cloud with minimum effort.</li></ul>

## Resources

If you’d like to get more into MLOPs, I would recommend the following excellent resources to get started:

<ul><li>MLOps Course <a href="https://madewithml.com/">MadeWithML</a></li><li><a href="https://mlsys.stanford.edu/">CS 329S: Machine Learning Systems Design</a></li><li><a href="https://fullstackdeeplearning.com/">Full Stack Deep Learning</a></li><li><a href="https://github.com/zenml-io/zenbytes">ZenBytes - learn MLOps through ZenML</a></li></ul>

## References

Some images inspired by Andrew Ng’s talk “From Model-centric to Data-centric AI” [on YouTube](https://www.youtube.com/watch?v=06-AZXmwHjo)