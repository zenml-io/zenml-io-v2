---
title: "Build ML Models Faster with ZenML Project Templates"
slug: "build-ml-models-faster-with-zenml-project-templates"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "652fbf875ff6e051ba30b403"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-03-18T10:03:39.645Z"
  lastUpdated: "2024-03-18T10:03:39.645Z"
  createdOn: "2023-10-18T11:20:39.091Z"
author: "alex-strick-van-linschoten"
category: "zenml"
tags:
  - "evergreen"
  - "tooling"
  - "zenml"
date: "2023-02-10T00:00:00.000Z"
readingTime: 5 Mins Read
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/e6e6b205/652fbf1265e3a9973fd2e0b0_project-thumb.png"
seo:
  title: "Build ML Models Faster with ZenML Project Templates - ZenML Blog"
  description: "Getting started with your ML project work is easier than ever with Project Templates, a new way to generate scaffolding and a skeleton project structure based on best practices."
  canonical: "https://www.zenml.io/blog/build-ml-models-faster-with-zenml-project-templates"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/ab284649/652fbf1265e3a9973fd2e0b0_project-thumb.png"
  ogTitle: "Build ML Models Faster with ZenML Project Templates - ZenML Blog"
  ogDescription: "Getting started with your ML project work is easier than ever with Project Templates, a new way to generate scaffolding and a skeleton project structure based on best practices."
---

**Last updated:** February 10, 2023

Machine learning projects can be time-consuming and complex, with many tasks that must be completed before model training can begin. From data preprocessing and feature engineering to model selection and deployment, there are many steps involved in a typical ML project. Not only do you have to keep the problem domain in your head, but industry best practices suggest you do certain things — versioning, modularization, linting, and so on — that can be fiddly to set up. All of this can make it difficult to quickly get started with a new project and can lead to frustration and wasted time. The good news is that there are tools available that can help streamline the process, and one of these is [ZenML Project Templates](https://github.com/zenml-io/zenml-project-templates#readme). These templates provide a starting point for new projects, with a well-structured codebase, commonly-used libraries, and example code to help you hit the ground running.

## Machine Learning Projects: Best Practices

Our documentation includes [a page listing best practices](https://docs.zenml.io/user-guide/starter-guide/follow-best-practices) when using ZenML, but it can be non-trivial to juggle all those recommendations alongside the actual project you’re trying to work on. If you’re new to ZenML, you also have a new set of concepts and syntax to get your head round. It’s no surprise that the domain of MLOps exists. After all, setting up and managing machine learning projects can quickly become overwhelming. That’s why the [ZenML Project Templates](https://github.com/zenml-io/zenml-project-templates) are such a valuable resource. They provide a starting point that takes into account industry best practices and provides a foundation for your project that is already set up to follow these guidelines, freeing you up to focus on the actual problem you’re trying to solve. Additionally, the templates are designed to be user-friendly and accessible, even for those new to ZenML. Whether you’re an experienced machine learning engineer or just starting out, these templates can help streamline your workflow and simplify your ML projects.

## What we built: ZenML Project Templates

At a very high level, you can use the ZenML CLI to generate the starter structure for an ML project. Using the starter template, the CLI will use your responses to generate the relevant modules and code.

To get started, you can pass in the --template flag when initializing a ZenML repository:

```bash
zenml init --template
```

You’ll be asked a number of questions about your specific needs for the project, including whether you’d like some sample code illustrating how the template works with a small dataset.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/5f975fbc/652fbf01c966b2f46835e0b7_cli-questions.png" alt="CLI questions" />
</figure>

The tool generates a number of files and explains how you can explore what was generated:

```bash
Congratulations, your project has been generated in the `path/to/my_ml_project` directory.
You can now run the following commands to get started:

    cd path/to/my_ml_project
    pip install -r requirements.txt
    # Start the ZenML UI (optional; you'll also need the zenml[server] Python package installed
    zenml up
    python run.py

Next, you should take a look at the `path/to/my_ml_project/README.md` file in the generated project.
Happy coding!

⠋ Initializing ZenML repository at path/to/my_ml_project.
Setting the repo active workspace to 'default'.
ZenML repository initialized at path/to/my_ml_project.
The local active stack was initialized to 'default'. This local configuration will only take effect when you're running ZenML from the initialized
repository root, or from a subdirectory. For more information on repositories and configurations, please visit
https://docs.zenml.io/starter-guide/stacks/managing-stacks.
```

As it states, the project skeleton structure is actually a functioning, runnable ZenML project that trains a model based on whatever dataset you selected. Simply start the server and execute the run.py file.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/cb32dc26/652fbf0115d81ca9e7179bab_sample-run.png" alt="Template starter project run" />
</figure>

Check out the run.py file along with the pipelines and steps modules to see the basic building blocks from which your starter project was created. Once you’re familiar with those, it’s easy to get started with your own work, adapting and building upon the basic code that ZenML Project Templates has helped with.

## When should I use it?

Project Templates are designed to help you get started quickly when working on a new machine learning project. They are ideal for those who frequently start multiple projects, such as consultants working with different clients or data scientists implementing various models. With the templates, you can jumpstart your project with a well-structured codebase, commonly-used libraries, and example code, saving you time and reducing frustration.

For those who are new to ZenML, project templates can serve as a valuable learning tool. They provide a starting point to understand the framework and its concepts, as well as best practices for ML projects. Whether you’re looking to build simple pipelines or dive deep into a more complex project, the templates are a great way to quickly get up and running with ZenML and gain confidence in your work.

## Share Your Knowledge, Help Others: Submit Your ML Project Templates

While the current project templates provide a solid foundation for starting a new machine learning project, we know that there is a diverse range of ML use cases and requirements. That’s why we’re always looking for contributions from our community. If you have experience with a specific ML domain or use case and have developed a project template that you’d like to share, we’d love to hear from you! Your contribution can help others get started on their own projects and benefit from your expertise. By submitting your own project templates, you can also help shape the future of ZenML and make it more accessible and relevant to a wider range of ML practitioners. So if you’re looking to give back and share your knowledge, consider contributing to the ZenML Project Templates.

🔥 If you are interested in sharing all or parts of your project with us in the form of a ZenML project template, please [join our Slack](https://zenml.io/slack-invite) and leave us a message!

If you have any questions or feedback regarding ZenML Project Templates, we encourage you to join our [weekly community hour](https://www.eventbrite.com/e/zenml-meet-the-community-tickets-354426688767). If you want to know more about ZenML or see more examples, check out our [docs](https://docs.zenml.io/) and [examples](https://github.com/zenml-io/zenml/tree/main/examples).

