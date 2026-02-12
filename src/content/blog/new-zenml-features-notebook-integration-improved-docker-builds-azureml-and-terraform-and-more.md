---
title: "New Features: Notebook Integration, Improved Docker builds, AzureML and Terraform and More!"
slug: "new-zenml-features-notebook-integration-improved-docker-builds-azureml-and-terraform-and-more"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66b60e1c74ca012dd9dec189"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-08-19T10:24:13.072Z"
  lastUpdated: "2024-08-09T12:52:17.223Z"
  createdOn: "2024-08-09T12:39:56.661Z"
author: "zenml-team"
category: "zenml-updates"
tags:
  - "azure"
  - "azureml"
  - "terraform"
  - "release"
date: "2024-08-09T00:00:00.000Z"
readingTime: 3 mins
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/6b5845df/66b60f9cbf5d65778d831660_image-2.png"
seo:
  title: "New Features: Notebook Integration, Improved Docker builds, AzureML and Terraform and More! - ZenML Blog"
  description: "ZenML's latest release 0.64.0 streamlines MLOps workflows with notebook integration for remote pipelines, optimized Docker builds, AzureML orchestrator support, and Terraform modules for cloud stack provisioning. These updates aim to speed up development, ease cloud deployments, and improve efficiency for data science teams."
  canonical: "https://www.zenml.io/blog/new-zenml-features-notebook-integration-improved-docker-builds-azureml-and-terraform-and-more"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/7518aed8/66b60f9cbf5d65778d831660_image-2.png"
  ogTitle: "New Features: Notebook Integration, Improved Docker builds, AzureML and Terraform and More! - ZenML Blog"
  ogDescription: "ZenML's latest release 0.64.0 streamlines MLOps workflows with notebook integration for remote pipelines, optimized Docker builds, AzureML orchestrator support, and Terraform modules for cloud stack provisioning. These updates aim to speed up development, ease cloud deployments, and improve efficiency for data science teams."
---

We're excited to announce a new release of ZenML, 0.64.0, bringing significant improvements to streamline your MLOps workflows and expand cloud integration capabilities. Let's dive into the key features of this update:

## 1. Notebook Integration for Remote Pipelines

ZenML now supports [running steps defined in notebook cells](https://docs.zenml.io/v/docs/how-to/run-remote-pipelines-from-notebooks) with remote orchestrators and step operators. This feature bridges the gap between experimentation and production, allowing data scientists to seamlessly transition their work from local notebooks to remote environments. Whether you're prototyping or deploying, ZenML adapts to your workflow.

## 2. Optimized Docker Builds with Code Uploads

We've introduced a game-changing option to [upload code directly to the artifact store, enabling Docker build reuse](https://docs.zenml.io/how-to/customize-docker-builds/which-files-are-built-into-the-image). This feature is enabled by default and can significantly accelerate your development cycles, especially when working with remote stacks.

Key benefits include:

<ul><li>Faster iteration and development</li><li>No need to register a code repository for build reuse</li><li>Builds only occur when requirements or <code>DockerSettings</code> change</li></ul>

To disable this feature, set `DockerSettings.allow_download_from_artifact_store=False` for steps or pipelines. For more details on which files are built into the image, check our updated documentation.

## 3. AzureML Orchestrator Support

Expanding our cloud platform support, ZenML now integrates with AzureML as an orchestrator. This addition caters to teams leveraging Microsoft Azure for their machine learning infrastructure. For a comprehensive guide on setting up an Azure stack, refer to [our full Azure guide in the documentation]().

## 4. Terraform Modules for MLOps Stacks

We're thrilled to announce the release of new Terraform modules on the Hashicorp registry. These modules enable the provisioning of complete MLOps stacks across major cloud providers, offering:

<ul><li>Automated infrastructure setup for ZenML stack deployment</li><li>Streamlined registration of configurations to the ZenML server</li></ul>

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/312b9016/66b610d9b8f45969a09f7c1a_66b610bd95e16fb50b966633_zenml_terraform.png" alt="__wf_reserved_inherit" />
</figure>

For an in-depth look at how these Terraform modules can revolutionize your MLOps infrastructure, check out our recent blog post: ["Infrastructure as Code (IaC) for MLOps with Terraform & ZenML"](https://www.zenml.io/blog/mlops-terraform-zenml).

## Conclusion

This release represents a significant step forward in our mission to simplify and enhance MLOps workflows. By introducing notebook integration for remote pipelines, optimizing Docker builds, expanding cloud support, and providing Terraform modules, we're empowering data science teams to work more efficiently and effectively.

We encourage you to update to the latest version of ZenML and explore these new features. As always, we welcome your feedback and look forward to seeing how these improvements accelerate your ML projects.

Happy coding!