---
title: "AWS"
slug: "aws"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "652652f61ae5210a7b5b50f0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-04T09:51:10.232Z"
  lastUpdated: "2024-10-04T09:51:10.232Z"
  createdOn: "2023-10-11T07:47:02.481Z"
integrationType: "cloud-infrastructure"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/53b7f1a7/66d869a2f43502df5f9278d8_aws.png"
shortDescription: "Effortlessly orchestrate your ML pipelines on AWS with ZenML"
docsUrl: "https://docs.zenml.io/how-to/auth-management/aws-service-connector"
githubUrl: "https://github.com/zenml-io/mlstacks/tree/main/aws-minimal"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/e92f8633/66f15354a9b8f9bf45423205_image__30_.png"
relatedBlogPosts:
  - "easy-mlops-pipelines-2-stack-wizard"
  - "easy-mlops-pipelines"
  - "aws-mlops-made-easy"
seo:
  title: "Integrate AWS with ZenML - Cloud Infrastructure Integrations"
  description: "Effortlessly orchestrate your ML pipelines on AWS with ZenML"
  canonical: "https://www.zenml.io/integrations/aws"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/e92f8633/66f15354a9b8f9bf45423205_image__30_.png"
  ogTitle: "Integrate AWS with ZenML - Cloud Infrastructure Integrations"
  ogDescription: "Effortlessly orchestrate your ML pipelines on AWS with ZenML"
---

<ul><li>Seamlessly orchestrate ZenML pipelines on AWS SageMaker for efficient training and deployment</li><li>Utilize AWS S3 for convenient storage and access to datasets and artifacts</li><li>Leverage AWS EC2 instances for scalable compute resources in your ML workflows (via AWS Skypilot integration)</li><li>Integrate with various AWS services, such as ECR for container registry</li><li>Simplify MLOps processes by combining the power of AWS with ZenML's pipeline management capabilities</li></ul>

## Available integrations

<ul><li><a href="https://docs.zenml.io/stack-components/artifact-stores/s3">Artifact Store: AWS S3</a></li><li><a href="https://docs.zenml.io/stack-components/orchestrators/sagemaker">Orchestrator: AWS Sagemaker</a></li><li><a href="https://docs.zenml.io/stack-components/orchestrators/kubernetes">Orchestrator: Kubernetes (using AWS EKS)</a></li><li><a href="https://docs.zenml.io/stack-components/orchestrators/skypilot-vm">Orchestrator: Skypilot-AWS (using AWS EC2)</a></li><li><a href="https://docs.zenml.io/stack-components/step-operators/sagemaker">Step Operator: AWS Sagemaker</a></li><li><a href="https://docs.zenml.io/stack-components/step-operators/kubernetes">Step Operator: Kubernetes (using AWS EKS)</a></li><li><a href="https://docs.zenml.io/stack-components/container-registries/aws">Container Registry: AWS ECR</a></li></ul>

<ul><li>Comprehensive suite of machine learning services, including SageMaker for model training and deployment</li><li>Highly scalable and reliable cloud infrastructure for running ML workloads</li><li>Secure and compliant environment for handling sensitive data and models</li><li>Extensive set of tools for monitoring, logging, and debugging ML workflows</li><li>Wide range of compute instances and accelerators to optimize performance and cost</li></ul>

```bash
# Register a ZenML stack using existing cloud components in AWS Cloud.
zenml stack register <STACK_NAME> -p aws

# Deploy needed ZenML stack components into your's AWS Cloud.
zenml stack deploy -p aws -n <STACK_NAME>
```
The code example demonstrates how to set up and use the AWS stacks with ZenML. It offers two options: register a stack using existing cloud resource or deploy a stack from scratch. User can choose the most valid one based on personal situation.