---
title: "Admirer: Open-Ended VQA Requiring Outside Knowledge"
slug: "admirer-open-ended-vqa-requiring-outside-knowledge"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "652fb79483596c531c43c554"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-01-26T09:51:35.445Z"
  createdOn: "2023-10-18T10:46:44.721Z"
author: "andrew-hinh-and-aleks-hiidenhovi"
category: "zenml"
tags:
  - "month-of-mlops"
  - "zenml-project"
date: "2022-12-23T00:00:00.000Z"
readingTime: 4 Mins Read
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/44c2b325/652fb770a8476387ffe5715d_demo.png"
---

**Last updated:** December 23, 2022.

For the ZenML Month of MLOps Competition, we created [Admirer](http://admire.herokuapp.com/), a full-stack ML-powered website that utilizes users’ webcam feeds to answer open-ended questions requiring outside knowledge. Andrew built the MVP of the website as a [top-25 final project](https://bit.ly/3h8CqlX) for the [FSDL 2022 course](https://bit.ly/3NYNf6v), writing only the deployment code. We continued the project for the [ZenML Month of MLOps Competition](https://bit.ly/3EmoCxv) and won the Most Promising Entry prize in the [closing ceremony](https://bit.ly/3VCZqsl). During the competition, we wrote the data management, model development, testing, and continuous deployment scripts.

Here is a video summary of our submission.

<figure class="w-richtext-figure-type-video w-richtext-align-fullwidth" style="padding-bottom:56.25%" data-rt-type="video" data-rt-align="fullwidth" data-rt-max-width="" data-rt-max-height="56.25%" data-rt-dimensions="0:0" data-page-url=""><iframe src="https://www.youtube-nocookie.com/embed/WYb3xBIOYvg" frameBorder="0" allowfullscreen=""></iframe></figure>

## How does it work?

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/242dd3bd/652fb7539888d48729bd5318_inference_pipeline.png" alt="inference_pipeline" />
</figure>

The visual question-answering pipeline is inspired by [this paper](https://github.com/microsoft/PICa) from Microsoft. In short, we prompt GPT-3 with a generated image caption and object tag list, the question-answer pair, and context examples that demonstrate the task at hand in a few-shot learning method as shown in the diagram above. As a result, we achieve a [BERTScore](http://bit.ly/3tM1mmc) computed F1 score of around .989 on a test set we selected at random.

## How to use it?

As a direct consequence of not feeding the image data directly to GPT-3, the best queries involve asking descriptive, counting, or similar questions about one or more objects visible in the background. For example, if there are two people in the image, one wearing a hat and the other wearing glasses, questions that would work well could include the following:

<ul><li>“How many people are in the room?”</li><li>“What color is the hat in the picture?”</li><li>“How many people are wearing glasses?”</li></ul>

## What did we do?

Since we finished a MVP of the project using a model deployed on AWS Lambda and served with Gradio for the Full Stack Deep Learning course, the main features that we decided to focus on building for the competition were the surrounding infrastructure. However, it’s important to note that as a result how the inference pipeline is structured and the limited time for the competition, we had to focus on building the infrastructure solely around one of the models used in the pipeline. We decided to focus on the caption model, the model that seemed to fail the most often amongst the other models. As a result, the features that we built support for during the competition are the following:

<ul><li>Data storage using AWS S3</li><li>Data labeling using Label Studio (although in the end we used Scale AI for ~90% of the annotations)</li><li>Data preprocessing to prepare the annotated data for loading into a Pytorch dataset</li><li>Data validation using ZenML, S3, and Great Expectations</li><li>Hyperparameter tuning, model training, and experiment tracking using Pytorch Lightning and Weights &amp; Biases</li><li>Model evaluation using torchmetrics</li><li>Load testing using Locust</li><li>Model monitoring using Gradio’s built-in flagging system</li><li>Continuous deployment to update the AWS Lambda backend whenever the pipeline’s performance improves</li><li>Model and pipeline testing to ensure that everything is working as expected</li></ul>

## Future Work

As a result of the limited time and money we had during the competition, there are two major points of improvements. The first is improving the performance of the separate models used in the inference pipeline. Since we are using pre-trained HuggingFace models, we could collect more data from sources such as the [GI4E project](http://www.unavarra.es/gi4e/databases?languageId=1) to fine-tune the models on. However, this is extremely costly, and something we are unlikely to do. Another option could be to train an end-to-end model such as a ViT + GPT-2 encoder decoder model from scratch as inspired by [Sachin Abeywardana](https://sachinruk.github.io/blog/pytorch/huggingface/2021/12/28/vit-to-gpt2-encoder-decoder-model.html). Although costly, this is probably the best and cheapest option for improving the inference pipeline’s performance, since the image data itself is incorporated into GPT’s answers.

The second is creating data, training, and testing pipelines with both Makefiles and ZenML pipelines. This allows us to more easily iterate through ideas to improve the pipeline’s performance and add features such as continual training, a feature of MLOps projects that ZenML goes into detail [here](https://blog.zenml.io/ci-ct-cd-with-zenml/). In addition, it allows others to more easily reproduce and test our work.

## 💭 Conclusion

Having recently built a MVP of the project for the [Full Stack Deep Learning course](https://fullstackdeeplearning.com/), we were excited to build out the data management and training pipelines for this competition. We were not disappointed: we got a chance to get our hands dirty building out the pipelines, showcase our work to numerous experts in the field and receive their feedback, and win the “Most Promising Entry” award! We’d like to thank the ZenML team for organizing this competition and the judges for their invaluable feedback.

## 📚 Learn More

Below are some of the resources to learn more about the project:

<ul><li><a href="https://github.com/andrewhinh/admirer">GitHub Repository</a></li><li><a href="http://admire.herokuapp.com/">Project Demo</a></li><li><a href="https://bit.ly/3tsDi7V">Month of MLOps Closing Ceremony Presentation</a></li></ul>

