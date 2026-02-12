---
title: "ZenNews: Generate summarized news on a schedule"
slug: "zennews-generate-summarized-news-on-a-schedule"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6531de28596909d5d08c54b0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-08-21T12:32:08.204Z"
  lastUpdated: "2024-08-21T12:27:03.067Z"
  createdOn: "2023-10-20T01:55:52.296Z"
author: "baris-can-durak"
category: "zenml"
tags:
  - "evergreen"
  - "news"
  - "nlp"
  - "summarization"
  - "tooling"
  - "zenml"
  - "zenml-project"
date: "2023-02-24T00:00:00.000Z"
readingTime: 6 Mins Read
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/8c793841/6531dcf001620e4a22550afe_zennews.jpeg"
seo:
  title: "ZenNews: Generate summarized news on a schedule - ZenML Blog"
  description: "ZenNews is a tool powered by ZenML that can automate the summarization of news sources and save you time and effort while providing you with the information you need."
  canonical: "https://www.zenml.io/blog/zennews-generate-summarized-news-on-a-schedule"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/cb182325/6531dcf001620e4a22550afe_zennews.jpeg"
  ogTitle: "ZenNews: Generate summarized news on a schedule - ZenML Blog"
  ogDescription: "ZenNews is a tool powered by ZenML that can automate the summarization of news sources and save you time and effort while providing you with the information you need."
---

**Last updated:** February 24, 2023

In today’s information age, we are bombarded with a constant stream of news and media from a variety of sources. Summarizing tasks, particularly when it comes to news sources, can be a powerful tool for the efficient consumption of information. They distill complex or lengthy content into easily digestible chunks that can be scanned and absorbed quickly, allowing us to keep up with the news without being overwhelmed. They can also help us separate the signal from the noise, highlighting the most important details and helping us identify what’s worth further investigation.

## What we built: ZenNews

This is where **ZenNews** comes into play. It offers a tool that uses [ZenML](https://zenml.io/home) to automate the summarization process and save users time and effort while providing them with the information they need. This can be particularly valuable for busy professionals or anyone who wants to keep up with the news but doesn’t have the time to read every article in full.

## Why did we build it?

Apart from the advantages of solving a summarization task itself, this project aims to showcase some key benefits of using ZenML.

<ol><li><strong><em>ZenML features a simple and clean Python SDK.</em></strong> In this project, we leverage it to define our <a href="https://github.com/zenml-io/zenml-projects/tree/main/zen-news-summarization/src/zennews/steps">steps</a> and <a href="https://github.com/zenml-io/zenml-projects/blob/main/zen-news-summarization/src/zennews/pipelines/zen_news_pipeline.py">pipelines</a> and to access/manage the resources and artifacts that we interact with along the way. This project shows how this such a design can significantly simplify the process of building robust applications.</li><li><strong><em>ZenML is an extensible framework.</em></strong> We realize that ML projects often require custom-tailored solutions that deviate from off-the-shelf offerings. This is why we employed base abstractions that empower users to craft their solutions without needlessly reinventing the wheel. Take a look, for instance, at <a href="https://github.com/zenml-io/zenml-projects/blob/main/zen-news-summarization/src/zennews/materializers/article_materializer.py">the custom materializer</a> and <a href="https://github.com/zenml-io/zenml-projects/blob/main/zen-news-summarization/src/zennews/alerter/discord_alerter.py">the custom stack component</a> showcased in this project to see how effortlessly one can implement custom solutions.</li><li><strong><em>ZenML separates your code from your stack.</em></strong> In other words, it offers a distinct separation between the code and the underlying infrastructure. As you explore this example, you’ll notice how this separation can allow you to switch effortlessly between <a href="https://github.com/zenml-io/zenml-projects/tree/main/zen-news-summarization#-switching-to-scheduled-pipelines-with-vertex">a local default stack and a remote deployment with scheduled pipelines</a>, all with the simple flip of a flag.</li><li><strong><em>ZenML can help you to scale up.</em></strong> While this PoC-like example serves as evidence of ZenML’s potential to streamline workflows and hasten the development process, it merely scratches the surface of its capabilities. To delve deeper into the extensive possibilities that ZenML has to offer, we encourage you to check out our <a href="https://docs.zenml.io/getting-started/introduction">docs</a>.</li></ol>

## How does it work?

The **ZenNews** project is published as a [PyPI package](https://pypi.org/project/zennews/) that you can install through pip:

```bash
pip install zennews
```

It includes a main pipeline called zen_news_pipeline with three steps: collect, summarize, and report. In this version, the only collect step implementation is the bbc_news_source that collects articles from the BBC news feed, whereas the only summarize step implementation uses the bart_large_cnn_samsum model to generate summaries, and the only report step creates a report and share the results using an alerter. Additionally, the package includes a custom stack component called DiscordAlerter.

Lastly, the package also includes a CLI application named zennews, which serves as the primary interface for interacting with the pipeline and its steps.

```bash
zennews --help
```

## How do I use it?

Once you have installed the zennews package, you can immediately test it locally. By running the following command, you will retrieve the top five articles from the BBC news feed, summarize them, and display the results:

```bash
zennews bbc
```

As an output, you should see:

```bash
                ______          _   _                   
                |___  /         | \ | |                  
                   / / ___ _ __ |  \| | _____      _____ 
                  / / / _ \ '_ \| . ` |/ _ \ \ /\ / / __|
                 / /_|  __/ | | | |\  |  __/\ V  V /\__ \
                /_____\___|_| |_|_| \_|\___| \_/\_/ |___/
                                                                               
                      This is where you get the news.
         
This will change your active ZenML stack to the default stack and run the 
pipeline locally. This also means that the pipeline will download and utilize 
the model locally.
Would you like to continue? [y/N]: y

 ----- BUILDING AND RUNNING THE PIPELINE ----- 

Initializing the ZenML global configuration version to 0.32.1
Creating default project 'default' ...
Creating default user 'default' ...
Creating default stack for user 'default' in project default...
Setting the global active project to 'default'.
Setting the global active stack to default.
Using the default store for the global config.
Registered new pipeline with name zen_news_pipeline.
Running pipeline zen_news_pipeline on stack default (caching disabled)
Step collect has started.
Step collect has finished in 1.048s.
Step summarize has started.
Step summarize has finished in 48.476s.
Step report has started.
Step report has finished in 0.056s.
Pipeline run test_bbc02_24_2023_10_17_36 has finished in 50.220s.
Pipeline visualization can be seen in the ZenML Dashboard. Run zenml up to 
see your pipeline!

 ----- PIPELINE RESULTS ----- 

╔═════════════════════════════════════════════════════════════════════════════╗
║                  From BBC generated at 02/24/2023 10:18:52                  ║
╚═════════════════════════════════════════════════════════════════════════════╝

[top_stories] Vuhledar, in eastern Ukraine, was once a prosperous mining town. 
But now it's a wasteland -  one of many on Ukraine's 1,300 kilometer front line. 
Some of the fiercest fighting of recent months has been here. The town sits on 
high ground in the heavily contested Donbas region. Link                       

[top_stories] Harvey Weinstein was sentenced to 16 years in prison for rape. 
He was convicted of attacking an actress in a hotel room during a film festival. 
The 70-year-old is already serving a 23-year prison sentence for a separate 
conviction in New York. Link                                                       

[top_stories] Moldova has warned for weeks that Russia is plotting to seize 
power. Officials rejected Russia's claims as "psy-ops" as part of the war. 
President Maia Sandu spoke of unprecedented security challenges ahead. Link                                                                                     

[top_stories] Thomas H Lee, 78, found dead at his Manhattan office on Thursday 
morning. His family say they are "extremely saddened" by his death. Mr Lee 
helped pioneer the debt-fuelled corporate acquisition known as a 
leveraged buyout. Link                                                                                

[top_stories] The capsule is scheduled to dock at the ISS on Sunday. It is 
not expected to bring home the three astronauts until September. The 
original return vehicle was damaged by a tiny meteoroid. Link  
```

You can also parameterize this process. In order to see the possible parameters, please use:

```bash
zennews bbc --help
```

To fully utilize the potential of an application like zennews, it’s recommended to schedule the summarization pipelines instead of manually triggering them. This is possible by using --schedule if you have a ZenML stack which features an orchestrator that supports scheduling.

```bash
zennews bbc --schedule daily
```

If you would like to see how you can set up such a stack, you can visit [the GitHub page](https://github.com/zenml-io/zenml-projects/tree/main/zen-news-summarization) which contains a much more substantial technical summary around implementation and how you can reproduce it on your local setup/system.

## Where to go from here?

If you have any questions or feedback about this implementation of a news summarization tool and pipeline, let us know [on Slack](https://zenml.io/slack-invite/) or join [our weekly community meeting](https://www.eventbrite.com/e/zenml-meet-the-community-tickets-354426688767). If you want to know more about ZenML or see more examples, check out our [docs](https://docs.zenml.io/), [examples](https://github.com/zenml-io/zenml/tree/main/examples) or [our other projects](https://zenml.io/projects).