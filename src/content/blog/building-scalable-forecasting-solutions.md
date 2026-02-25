---
title: "Building Scalable Forecasting Solutions: A Comprehensive MLOps Workflow on Google Cloud Platform"
slug: "building-scalable-forecasting-solutions"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66cedbb77dd2f2d70b173103"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-08-30T08:59:23.076Z"
  lastUpdated: "2024-08-30T08:59:23.076Z"
  createdOn: "2024-08-28T08:11:35.434Z"
author: "rishabh-sharma"
category: "mlops"
tags:
  - "mlops"
  - "gcp"
date: "2024-08-28T00:00:00.000Z"
readingTime: 15 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/b8186894/66cedb6c1322da49f5c24b1e_mlops-zenml-gcp.png"
seo:
  title: "Building Scalable Forecasting Solutions: A Comprehensive MLOps Workflow on Google Cloud Platform - ZenML Blog"
  description: "MLOps on Google Cloud Platform streamlines machine learning workflows using Vertex AI and ZenML."
  canonical: "https://www.zenml.io/blog/building-scalable-forecasting-solutions"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/b8186894/66cedb6c1322da49f5c24b1e_mlops-zenml-gcp.png"
  ogTitle: "Building Scalable Forecasting Solutions: A Comprehensive MLOps Workflow on Google Cloud Platform - ZenML Blog"
  ogDescription: "MLOps on Google Cloud Platform streamlines machine learning workflows using Vertex AI and ZenML."
---

Imagine a world where machine learning (ML) models seamlessly transition from concept to production, effortlessly scaling to meet real-world demands. Welcome to the realm of Machine Learning Operations or MLOps – the game-changer in the AI landscape. As businesses increasingly harness the power of ML, the need for streamlined workflows has never been more critical. Enter Google Cloud Vertex AI, a powerhouse platform that's revolutionizing how we approach MLOps. From turbocharging data preparation to simplifying model deployment, Vertex AI is the secret weapon for organizations looking to unlock the full potential of their ML initiatives. In this blog, we'll dive into the MLOps revolution and explore how Vertex AI's arsenal of tools – including pre-trained models, automated pipelines, and real-time monitoring – can transform your ML journey. Whether you're an MLOps novice or a seasoned pro, discover how Google Cloud's robust ecosystem, featuring Cloud Connected services and Cloud Armor security, can elevate your ML game to new heights. Get ready to reimagine your approach to machine learning – the future of MLOps awaits!

## What is MLOps?

Like DevOps and its benefits for software development, [MLOps is a concept](https://www.zenml.io/blog/mlops-what-why-how) developed to enhance the development of machine learning systems. MLOps encompasses every stage of the machine learning lifecycle, from building and deploying to serving and monitoring ML models. Using the right platform, processes, and people helps businesses bring models into production faster and with higher success rates. Utilizing a **unified platform** such as [Google Cloud Vertex AI](https://cloud.google.com/vertex-ai?hl=en), which encompasses **Google Cloud AI** services and **Google Vertex AI**, can greatly enhance this process. By making [Google Cloud](https://cloud.google.com/?hl=en) a central service, you can ensure the strength and seamless integration of your cloud services, particularly when working with [Cloud Storage Object](https://cloud.google.com/storage/docs/json_api/v1/objects) files.

Together, these features can reduce the loss in model performance and manage the growing complexity of operating machine learning systems when used correctly. With the help of multimodal models and an extensive application performance suite, this lowers overhead and operational expenses for the company while also opening up new income streams and the use of sophisticated analytics and ML-driven decision-making.

## GCP Basics: Raw Services for MLOps

In machine learning operations (MLOps), deploying and maintaining ML models requires the right infrastructure and tools. The Google Cloud Platform (GCP) offers services to support the entire ML lifecycle. This blog will focus on core GCP services essential for successful MLOps, including [Google Artifact Registry](https://cloud.google.com/artifact-registry), [Google Cloud Storage](https://cloud.google.com/storage?hl=en), [Google Cloud Build](https://cloud.google.com/build?hl=en), [Compute Engine](https://cloud.google.com/products/compute?hl=en), and [Google Kubernetes](https://cloud.google.com/kubernetes-engine?hl=en). Understanding how to deploy application platforms and manage application logs is crucial for maintaining application health and identifying errors.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/8b74427e/66cedbb67dd2f2d70b172fa1_66ced46609e7a21a3e1e2cb4_mlops-on-gcp-min.png" alt="MLOps on GCP: Raw Services including Google Artifact Registry, Google Kubernetes Engine (GKE), Compute Engine, Google Cloud Build, and Google Cloud Storage" />
</figure>

### Google Artifact Registry

In MLOps, it's crucial for you to version and manage artifacts like trained models, data pipelines, and containers. [Google Artifact Registry](https://cloud.google.com/artifact-registry) provides you with a secure solution for storing your ML models and related artifacts. By integrating Artifact Registry with your CI/CD pipelines, you can automate the deployment of ML models to production environments. Additionally, leveraging assistants for application development can further streamline your workflow.

### Google Cloud Storage

Your MLOps pipeline depends on [Google Cloud Storage](https://cloud.google.com/storage?hl=en), and data is essential for your machine learning activities. It acts as a centralized location for storing model binaries, training data, and other crucial resources. Its seamless connection with other GCP services, such as AI Platform and BigQuery, allows you to handle and process your data effectively. Furthermore, versioning is supported by Cloud Storage, guaranteeing the preservation of every version of your dataset—a crucial component for model repeatability and compliance. Your Model Garden implementations and other cloud computing needs, such as Cloud Storage Object storage, will benefit from this service.

### Google Cloud Build

In order to guarantee continuous and dependable ML model deployment in your MLOps pipeline, automation is crucial. You may link [Google Cloud Build](https://cloud.google.com/build?hl=en) with other GCP services to build automated CI/CD pipelines for your machine-learning operations. This enables the creation of Docker images, testing, and model deployment to cloud run or Google Kubernetes Engine production settings. You may cut down on mistakes and accelerate the time to market for your machine learning products by automating these stages. Furthermore, you may use application platform tools, database services, and workflow orchestration services to efficiently handle large-scale deployments.

### Compute Engine

In order to perform large ML workloads in MLOps, [compute engines](https://cloud.google.com/products/compute?hl=en) are essential. It offers the adaptability and strength required for conducting inference, training models, and preparing data. To build a strong MLOps pipeline, you can also combine Compute Engine with other GCP services like Cloud Storage and Cloud Build. Compute Engine improves training performance when used in conjunction with pre-trained models, guaranteeing smooth interaction with AI-powered applications and console tool features.

### Google Kubernetes Engine (GKE)

For MLOps on GCP, [GKE](https://cloud.google.com/kubernetes-engine?hl=en) is a crucial service, particularly for installing and scaling ML models in production. You may take advantage of Kubernetes' automatic scaling, rolling updates, and self-healing features by containerizing your machine learning models and deploying them on GKE. In order to provide a streamlined process for deploying and managing ML models in a scalable and dependable way, GKE also connects with other GCP services, such as Cloud Build for CI/CD and Artifact Registry for managing model containers. The deployment process is further strengthened by the freedom to employ bespoke containers, which also simplifies the management of prebuilt containers.

## MLOps on GCP: Vertex AI Suite of Tools

For nearly a decade, Google Cloud has been at the forefront of developing cutting-edge MLOps tools and solutions, and now, with [Google Cloud Vertex AI](https://cloud.google.com/vertex-ai?hl=en), you're equipped with a powerful platform to build, deploy, and scale ML models faster than ever. Vertex AI abstracts the complexities of raw services into a unified platform, allowing you and your Data Science team to focus on what really matters—your work—without getting bogged down by the underlying infrastructure.

However, this convenience does come with a price, so it's important to evaluate your organization's needs carefully. Whether you're focused on Infrastructure-as-Code, CI/CD pipelines, continuous training pipelines, or prediction services—whether batch or online—Vertex AI has something to offer. You'll also find powerful tools for task automation with schedulers and analytics to drive insights. Your specific approach will depend on your organization's goals and the demands of your ML use case, but with Vertex AI, you're well-equipped to tackle it all.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/7e5a1e78/66cedbb67dd2f2d70b172fd4_66ced4e19e7fe6e2806a6bbb_zenml-gcp-flow-min.png" alt="ZenML Vertex AI pipeline workflow: Vertex AI to GCS Bucket Datasets (Working and Final), Save Pipeline Spec as JSON, Triggering Vertex AI Pipelines with Python, and Vertex AI Pipeline execution" />
</figure>

### Vertex AI Pipelines

Implementing a robust MLOps solution can be challenging, but tools like Google Cloud Vertex AI offer you a streamlined approach. With [Vertex AI Pipelines](https://cloud.google.com/vertex-ai/docs/pipelines/introduction), you can simplify the process, making it easier for you and your team of data scientists and ML engineers to accelerate your machine learning initiatives using a cohesive platform. The availability of pre-trained models and multimodal model integration further enhances your capabilities, while the GCP application performance suite ensures that all components work together seamlessly.

### Vertex AI Custom Jobs

In addition to its powerful automation tools, Google Cloud Vertex AI also supports custom jobs, giving you the ability to run specialized tasks that go beyond the capabilities of pre-built models and AutoML. With custom jobs, you have the flexibility to train models using your own code and environments, making them perfect for complex ML tasks that require high customization. This flexibility is further enhanced by automated tools and database services, streamlining your entire MLOps process.

### Vertex AI’s Role in Specialized ML Tasks

<ul><li><strong>Custom Training Environments:</strong> With <a href="https://cloud.google.com/vertex-ai/docs/training/create-custom-job"><strong>Vertex AI Custom Jobs</strong></a>, you can define your own training environments, including specific frameworks, libraries, and dependencies. This is particularly valuable for specialized ML tasks that need custom configurations.</li><li><strong>Scalable Resources:</strong> You can execute custom jobs across multiple GPUs or TPUs, speeding up the training of large models.</li><li><strong>Job Orchestration:</strong> Integrate these custom jobs into Vertex AI Pipelines for smooth orchestration within your broader ML workflows, ensuring everything runs together seamlessly.</li><li><strong>Flexibility:</strong> Vertex AI provides the flexibility to customize your ML models, whether you're working with complex neural networks, unique datasets, or cutting-edge research. By utilizing app platforms and cloud-native wide-column databases, you can push the boundaries of what these custom tasks can achieve.</li></ul>

## Challenges in Adopting MLOps with GCP

When it comes to scaling machine learning processes, many companies like yours turn to GCP for their MLOps solutions due to its robust infrastructure and extensive toolkit. However, using GCP isn't without its challenges. In this blog, we'll walk you through potential roadblocks such as gaining departmental buy-in, establishing robust pipelines, integrating with external services, fostering cross-team collaboration, and managing expenses effectively.

We'll also discuss the importance of cloud security and how [Cloud Armor Security](https://cloud.google.com/armor/docs/security-policy-overview) can protect your business in a [multi-cloud environment](https://www.notion.so/e2d9693d4f90445ab2b2f0f6b26a9da6?pvs=21), helping you secure operations and ensure long-term success.

### Adoption Within the Data Science Department

**Challenge:**

Due to unfamiliar tools and processes, data scientists may need to learn about adopting MLOps.

**Solutions:**

<ul><li><strong>Training:</strong> Invest in upskilling on GCP tools and MLOps best practices, focusing on <strong>Generative AI Studio</strong> and <strong>analysis tools</strong>.</li><li><strong>Gradual Adoption:</strong> Implement MLOps incrementally, starting with <strong>quickstarts and labs</strong> to familiarize teams with new workflows.</li><li><strong>Cross-Functional Teams:</strong> Encourage collaboration between data scientists, ML engineers, and DevOps.</li></ul>

### Hard to Write Pipelines

**Challenge:**

Developing and managing ML pipelines on GCP can be complex, especially for teams new to cloud-based MLOps.

**Solutions:**

<ul><li><strong>Pre-Built Templates:</strong> Use GCP’s templates to simplify pipeline development.</li><li><strong>GCP Experts:</strong> Collaborate with GCP professionals for pipeline design, mainly focusing on <strong>video analysis</strong> and <strong>real-time analytics</strong>.</li><li><strong>Tooling:</strong> Leverage GCP’s monitoring and debugging tools, including <strong>application logs management</strong> and <strong>application error identification</strong>.</li></ul>

### Hard to Integrate External Services

**Challenge:**

Integrating external services with GCP can be complex and costly.

**Solutions:**

<ul><li><strong>GCP Marketplace:</strong> Use pre-configured integrations.</li><li><strong>API Gateways:</strong> Secure and manage external interactions, focusing on <strong>predictive analytics</strong> and <strong>Secure video meetings</strong> for enhanced collaboration.</li><li><strong>Optimize Data Transfer:</strong> Reduce egress costs by optimizing data transfers, mainly when dealing with <strong>cloud-native relational databases</strong> and <strong>document database</strong> services.</li></ul>

### Cross-Project, Cross-Team, Cross-Region Collaboration

**Challenge:**

Collaboration across projects, teams, and regions can be complex due to differences in configurations and availability.

**Solutions:**

<ul><li><strong>Centralized Management:</strong> Use GCP’s resource management tools for consistency, ensuring seamless collaboration through <strong>collaboration for teams</strong> and <strong>modern collaboration</strong> practices.</li><li><strong>Standardized Practices:</strong> Implement uniform MLOps guidelines, including <strong>workflow orchestration service</strong> for consistency.</li><li><strong>Regional Optimization:</strong> Minimize latency and ensure data compliance, mainly when dealing with <strong>warehouses for business agility</strong> and <strong>agnostic edge solution</strong> deployments.</li></ul>

### Expensive

**Challenge:**

MLOps on GCP can be costly, especially for large-scale workloads.

**Solutions:**

<ul><li><strong>Cost Monitoring:</strong> Use GCP’s budgeting tools to control expenses.</li><li><strong>Workload Optimization:</strong> Choose efficient machine types and minimize unnecessary pipeline runs, mainly when using <strong>minimal downtime migrations</strong> and the <strong>cycle of APIs</strong> for optimization.</li><li><strong>Data Management:</strong> Implement policies to manage storage costs, especially when dealing with <strong>Cloud-native document databases</strong> and <strong>Cloud-native wide-column database</strong> storage options.</li></ul>

While GCP offers solid tools for MLOps, you'll need to address certain challenges to unlock their full potential. By adopting the right strategies, you can build scalable and efficient MLOps processes that drive innovation and boost operational efficiency. Leveraging features like automatic cloud resource optimization and Cloud Armor Security will help protect your operations.

## Choosing the Right Services on GCP

When deciding which services to use for coordinating your ML workloads on the Google Cloud Platform (GCP), understanding the importance of orchestration is key. Orchestration ensures that your machine learning workflows are managed and executed efficiently, making it easier to streamline complex processes and automate repetitive tasks. As your workflows grow more intricate and your need for customization and automation increases, effective orchestration becomes even more crucial.

It allows you to manage dependencies, dynamically scale resources, and seamlessly integrate different parts of your ML pipeline. By comparing Compute Engine, Google Kubernetes Engine (GKE), and Vertex AI Pipelines, you'll gain insights into how each service supports orchestration and how to choose the one that best fits your needs. Whether you're focused on app migration, development, or performance, understanding these options will help you make the right decision for your projects.

### Deciding Between Compute Engine, GKE, and Vertex AI Pipelines

When choosing a Google Cloud Platform (GCP) service to orchestrate your ML workloads, consider key factors like the availability of pre-trained models, the power of AI-driven apps, and the flexibility to use custom containers. These elements will guide you in selecting the right service to meet your specific needs efficiently.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/bed76176/66cedbb67dd2f2d70b172fb6_66ced54e3fb9902143a11921_zenml-gcp-pros-cons-min.png" alt="ZenML comparison table: Pros and Cons of Compute Engine, GKE, and Vertex AI Pipelines for ML workloads on Google Cloud Platform" />
</figure>

## Step-by-step Tutorial: Using an open source framework to optimize your MLOps on GCP

Optimizing your Machine Learning Operations (MLOps) is crucial for managing and scaling complex processes in today's fast-paced ML environment. While Google Cloud Platform (GCP) provides a strong foundation, handling these processes can be challenging. By incorporating an open-source framework like ZenML, you can simplify and streamline your MLOps on GCP, allowing you to focus on what truly matters—developing, deploying, and managing high-performance ML models.

In this section, you'll discover how to set up and refine your MLOps pipeline on GCP using ZenML, making your machine learning deployments more efficient and scalable. We'll also dive into leveraging Generative AI workflows, Model Registry services, and the integration of sample prompts to further enhance your model development and deployment process. Whether you're aiming to boost efficiency or scale your operations, ZenML has the tools to help you succeed.

### What is ZenML?

**ZenML** is an open-source MLOps framework that creates portable, production-ready machine learning pipelines. It offers extensive integration options, decoupling infrastructure from code to enable seamless development and deployment. This simplification allows machine learning engineers to focus on strategic growth rather than infrastructure headaches. Coupled with **Kubeflow**, **ZenML** enhances project adaptability and scalability, providing a streamlined pathway for rapid ML model deployment to production, utilizing **Google Cloud's AI** and **Google AI Studio** capabilities.

### How ZenML Integrates with GCP Services

The diagram below illustrates how ZenML, an open-source MLOps framework, seamlessly integrates with key Google Cloud Platform (GCP) services to streamline your machine learning workflows. By connecting with GCP components like Vertex AI Pipelines, Kubernetes Engine, and Cloud Storage, ZenML automates the orchestration, deployment, and management of your ML models, allowing you to scale and manage your ML operations with greater efficiency. Additionally, automated tools, a code development platform, and analytics functionalities further enhance this powerful integration, making it easier for you to focus on innovation.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/56441ef3/66cedbb77dd2f2d70b173034_66ced5c4c1cbec3649bc54dd_zenml-with-gcp-min.png" alt="ZenML ML pipeline workflow integrating with Google Cloud services: Load, Train, Evaluate, and Deploy steps connected to Google Artifact Registry, GKE, Cloud Storage, Cloud Build, and Compute Engine" />
</figure>

### Starting with a basic Google Cloud stack

The easiest cloud orchestrator is **Google Cloud Vertex AI**, which runs on a public cloud. **ZenML** also offers the flexibility to work with **Kubernetes** or raw virtual machines (VMs), but for this example, we'll focus on using **Vertex AI Studio**. This approach benefits from **cloud-native automation** and **cloud migration** strategies.

When using Vertex AI, we require a method to package and transfer your code to the cloud so that ZenML can function correctly. ZenML uses [Docker](https://www.docker.com/) to accomplish this. Whenever you initiate a pipeline with a remote orchestrator, [ZenML creates an image](https://docs.zenml.io/how-to/setting-up-a-project-repository/connect-your-git-repository) for the entire pipeline (and optionally for each pipeline step based on your [configuration](https://docs.zenml.io/how-to/setting-up-a-project-repository/connect-your-git-repository)). This image contains all the code, requirements, and other necessary components to execute the pipeline steps in any environment. ZenML then uploads this image to the container registry specified in your setup, and the orchestrator pulls the image when it's ready to run a step.

To summarize, here is the broad sequence of events that happen when you run a pipeline with such a cloud stack:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/7cc194b4/66cedbb67dd2f2d70b172fa4_66ced6beabf2d7d65a1de84e_zenml-gcp-diagram-min.png" alt="ZenML MLOps workflow diagram: Pipeline execution from ZenML Client to Orchestrator, integrating with Container Registry and Artifact Store, showcasing data flow and metadata communication" />
</figure>

<ol><li><strong>Firstly, the user runs a pipeline</strong> on the <strong>client's machine</strong>. This executes the <a href="http://run.py"><strong>run.py</strong></a> script where ZenML reads the <strong>@pipeline</strong> function and understands what steps must be executed.</li><li>The client asks the server for the stack info, which returns it with the configuration of the cloud stack.</li><li>Based on the stack info and pipeline specification, the client builds and pushes an image to the <a href="https://docs.zenml.io/stack-components/container-registries"><strong>container registry</strong></a>. The image contains the environment for executing the pipeline and the steps' code.</li><li>The client creates a run in the <a href="https://docs.zenml.io/user-guide/production-guide/cloud-orchestration"><strong>orchestrator</strong></a>. For example, the Vertex AI orchestrator creates a virtual machine in the cloud with commands to pull and run a Docker image from the specified container registry.</li><li>The <strong>orchestrator</strong> pulls the appropriate image from the <strong>container registry</strong> as it executes the pipeline (each step has an image).</li><li>As each pipeline runs, it stores artifacts physically in the <strong>artifact store</strong>. Of course, this artifact store must be some form of <strong>Cloud Storage Object</strong> storage.</li><li>As each pipeline runs, it reports status to the ZenML server and optionally queries the server for metadata.</li></ol>

**Connect your GCP to ZenML in one-click**ZenML simplifies the process of incorporating GCP services into your ML workflows. Here's astep-by-step guide to setting up GCP within ZenML:**Install Python**

<ul><li>Download and install the correct Python version if you don’t have it.</li><li>Ensure it's between versions 3.8 and 3.11 for compatibility.</li></ul>

**Ensure you have Python installed**

```
python --version
```

**Set up a Virtual Environment**

<ul><li>Creating a virtual environment for your project is good practice to avoid conflicts with other Python software packages.</li></ul>

**Creating a Virtual Environment:**

```
python -m venv .venv && source .venv/bin/activate
```

To learn more about how to activate [Python virtual environments](https://python.land/virtual-environments/virtualenv#Python_venv_activation).

**Connect to ZenML**

```
pip install "zenml==0.64.0"
```

**Login to your ZenML Pro tenant**

```
zenml connect --url #Access your URL through ZenML Pro
```

<ul><li>Do the required authorization.</li></ul>

The example below will walk you through training a model and creating a pipeline using the breast cancer dataset. It's meant to be simple and quick, providing a practical introduction to the process. In real-world situations, you will probably work with larger datasets and more complex models, but this is a good place to start.

```
git clone --depth 1 https://github.com/zenml-io/zenml.git && cd zenml/examples/quickstart
```

**Register a remote stack:**

A stack configures how a pipeline is executed. [Learn more](https://docs.zenml.io/user-guide/production-guide/understand-stacks). Connect your Cloud to deploy your ZenML pipelines in a remote stack.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/2001944f/66cedbb67dd2f2d70b172faa_66ced7fa848b979d7060012d_zenml-stack-registration-min.png" alt="ZenML Production Setup interface: 10-minute guide to register a remote stack for cloud deployment of ML pipelines, with options to learn more and access documentation" />
</figure>

In ZenML, the [stack](https://docs.zenml.io/user-guide/production-guide/understand-stacks) is a fundamental concept that represents the configuration of your infrastructure. In a typical workflow, creating a stack requires you first to deploy the necessary pieces of infrastructure and then define them as stack components in ZenML with proper authentication.

Especially in a remote setting, this process can be challenging and time-consuming, and it may create multi-faceted problems. This is why we implemented the stack wizard feature, which allows you to **browse your existing infrastructure and use it to register a ZenML cloud stack**.

**How to use the Stack Wizard?**

Check out our quick [2-minute tutorial video](https://www.youtube.com/watch?v=diyt-Y7GLwY&t=20s) and detailed [documentation](https://docs.zenml.io/how-to/stack-deployment/register-a-cloud-stack) on the Stack Wizard. Discover how easy it is to get started!

**Run the pipeline in the new stack**

```
zenml stack set [Name Of your stack]
```

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/f8e8a89c/66cedbb67dd2f2d70b172fb3_66ced84f26107a046567ba57_zenml-stacks-cli.png" alt="ZenML stack configuration table showing three stacks: GCP_Remote_stack (active), default, and local_with_remote_storage, with details on stack ID, owner, orchestrator, container registry, artifact store, and image builder" />
</figure>

**Install the integrations**

<ul><li><strong>Install the required integrations to run pipelines in your stack</strong></li></ul>

```
zenml integration install gcp
```

**Run the training pipeline:**

```
python run.py --training-pipeline
```

**Go to your ZenML Pro account and view the pipeline status:**

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/e55b123a/66cedbb77dd2f2d70b173031_66ced8c1475014e1d5a3bbd5_zenml-pipeline-example.png" alt="ZenML machine learning pipeline diagram showing data flow from data_loader through data_splitter, data_preprocessor, model_trainer, model_evaluator, and model_promoter stages, with pandas DataFrames and scikit-learn components" />
</figure>

Detailed Breakdown of a Machine Learning Pipeline:

<ul><li><strong>data_loader:</strong> Loads the initial dataset (<code>DataFrame</code>). This step involves fetching the raw data that will be used for training and testing the model.</li><li><strong>data_splitter:</strong> Splits the dataset into training and test subsets (<code>my_data_subset</code>, <code>raw_dataset_tst</code>, <code>raw_dataset_trn</code>). This step ensures the data is divided appropriately to accurately evaluate the model's performance.</li><li><strong>data_preprocessor:</strong> Processes raw datasets into training and test sets (<code>dataset_trn</code>, <code>dataset_tst</code>) and defines the preprocessing pipeline. This step includes cleaning, transforming, and normalizing the data to make it suitable for model training.</li><li><strong>model_trainer:</strong> Trains a <code>RandomForestClassifier</code> model using the processed training dataset, focusing on model accuracy and robustness. This step involves using the prepared data to train the machine learning model and optimizing it for the best performance.</li><li><strong>model_evaluator:</strong> Evaluates the trained model using the test dataset, providing an evaluation metric (float). This step assesses the model's performance on unseen data to ensure it generalizes well and performs accurately.</li><li><strong>model_promoter:</strong> Decides on model promotion based on the evaluation result (boolean).</li></ul>

This pipeline loads, splits, preprocesses data, trains, evaluates, and potentially promotes a machine learning model. It focuses on efficient model training, ensures model robustness, and includes sentiment analysis to enhance the model's performance and applicability.

[ZenML](https://www.zenml.io/) provides a robust framework for optimizing MLOps on GCP. It offers seamless integration with GCP services, structured project management, and easy configuration. Following this tutorial, you can quickly set up and manage ML pipelines on GCP, leveraging **ZenML**’s capabilities to streamline your machine learning operations. Whether you’re a data scientist or ML engineer, **ZenML** makes it easier to focus on building and deploying models without getting bogged down in infrastructure complexities.

## Case Study: ADEO Leroy Merlin + Bravo - Accelerating MLOps with ZenML on GCP

**“ZenML has proven to be a critical asset in our machine learning toolbox, and we are excited to continue leveraging its capabilities to drive ADEO's machine learning initiatives to new heights.”**

— François Serra, ML Engineer / ML Ops / ML Solution Architect at ADEO Services

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/455e86c1/66cedbb67dd2f2d70b172fa7_66ced9150ad503341ca0ea49_zenml-adeo.png" alt="ADEO Leroy Merlin case study with ZenML: 300% increase in models in production, 76.5% decrease in time-to-market (from 8 weeks to 2 weeks), and a quote from François Serra on improved data scientist autonomy" />
</figure>

ADEO, a prominent name in the global retail sector, has embarked on a data-driven transformation to enhance its competitive edge. Recognizing the need for a scalable and efficient machine learning (ML) pipeline, ADEO leveraged **ZenML** to transition from manual, fragmented processes to an agile, automated MLOps setup on the **Google Cloud Platform (GCP)**. This shift significantly reduced their time-to-market and improved deployment efficiency, particularly by integrating **prebuilt containers** and **Automated tools**.

In a separate case study, Brevo partnered with ADEO to further streamline their MLOps framework. Brevo's expertise was crucial in optimizing the ML pipeline, contributing to a more efficient and scalable solution that aligns with ADEO's broader **digital transformation** goals.

#### ZenML and GCP Integration

ADEO encountered the challenge of standardizing its machine learning operations across different data science teams, each with its preferred tools and platforms. Some teams favored Google Kubernetes Engine (GKE) for containerized workloads, while others relied on raw virtual machines (VMs), and some were drawn to the managed services of Google Cloud Vertex AI. This variety made it difficult to streamline ML workflows across the board.

Enter ZenML—the flexible, framework-agnostic solution ADEO needed. By implementing ZenML on the Google Cloud Platform (GCP), ADEO could unify its ML pipelines across all three environments—GKE, raw VMs, and Vertex AI Studio. This allowed each team to continue working in their preferred environments while ensuring consistency and reproducibility across the organization. With ZenML, ADEO could automate the construction, versioning, and deployment of ML models, keeping the ML lifecycle seamless and efficient, no matter what infrastructure their teams chose.

#### Structuring Projects in ZenML

In ADEO's journey to streamline and standardize their machine learning operations using **ZenML** on **Google Cloud Platform (GCP)**, **ZenML Pro** has been a game-changer. As your teams transitioned from fragmented processes to a unified MLOps setup across **GKE**, raw **VMs**, and **Vertex AI**, **ZenML Pro** provided the infrastructure needed to centralize and manage operations across multiple teams.

Whether focusing on Fraud Detection, Recommendation Systems, or Large Language Models (LLM), each team operates independently across various GCP projects and regions while maintaining a consistent and scalable MLOps framework. **ZenML Pro** empowers you to efficiently manage and orchestrate ML workflows, using distinct "stacks" tailored to different GCP projects and regions. This flexibility allows teams to choose the best infrastructure for their needs while you maintain centralized control over the entire MLOps lifecycle, ensuring consistency, reproducibility, and scalability.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/ba4c91a0/66cedbb67dd2f2d70b172fb0_66ced9601dcd61525ab812d7_zenml-architecture.png" alt="ZenML Pro multi-tenant architecture diagram: Three tenants (Fraud Detection, Recommendation, LLM) with pipelines connecting to GCP stacks across different regions, and models deployment flow" />
</figure>

## Conclusion

Using ZenML and other tools to implement MLOps on the Google Cloud Platform may completely change the way you handle machine learning operations. Through the use of GCP's powerful infrastructure and technologies, like Google Cloud Vertex AI, Google Kubernetes Engine, and ZenML, you can improve collaboration, automate pipelines, and simplify intricate machine learning procedures. This connection gives you a competitive edge by streamlining your operations and speeding up your time to market.

Adopting a thorough MLOps framework on GCP will put your organization in a position to develop more quickly and effectively. Additionally, you can improve your operations even further while cutting expenses and budgeting more efficiently by using code samples and pre-trained models from Google Cloud AI services.

Now, it's your turn to take action. Start integrating these powerful tools into your projects to accelerate development and stay ahead of the competition. Take the next step in your MLOps journey by deploying your first stack today. Follow our GCP quickstart guide to get started: [Deploy a Cloud Stack](https://docs.zenml.io/how-to/stack-deployment/deploy-a-cloud-stack).

## ❓FAQ

**1. How do you build an ML pipeline in GCP?**

To set up a machine learning (ML) pipeline in **Google Cloud Platform (GCP),** store your datasets in **Google Cloud Storage,** preprocess the data using **Dataflow** or **Dataprep**, train your model using **Vertex AI Studio**, and finally deploy it to make predictions. Automate the process using **Cloud Composer** (Airflow) or **Kubeflow Pipelines** for a scalable and consistent workflow. Check out the **ZenML** docs for an easy GCP implementation.

**2. Which GCP service can perform machine learning tasks such as training and prediction in the cloud?**

**Vertex AI Studio** is the GCP service that performs machine learning tasks such as training and prediction in the cloud. It offers a comprehensive set of tools and APIs for building, deploying, and managing machine learning models. It supports **custom model** training, hyperparameter tuning, and prediction deployment, making it an ideal choice for end-to-end machine learning workflows on **Google Cloud**. Additionally, **Generative AI Studio** provides advanced features for AI-driven solutions and **5G. AI-driven solutions** that integrate seamlessly into your workflow.

**3. Which cloud platform is best for MLOps?**

The best cloud platform for MLOps depends on your specific needs. **Google Cloud Platform (GCP)** is often considered a top choice due to its comprehensive set of tools for machine learning and MLOps. GCP's **Vertex AI** offers integrated model training, deployment, and management capabilities and supports pipelines and CI/CD for ML workflows. GCP's **Kubernetes Engine (GKE)** and **Kubeflow** also provide robust solutions for scalable MLOps practices. Strong contenders include **Amazon Web Services (AWS)** with its **SageMaker** suite and **Microsoft Azure** with **Azure Machine Learning**, offering extensive MLOps capabilities. Integrating **agnostic edge solutions** and **analytics solutions** further enhances the platform's capabilities.

**4. What is MLOps Google Cloud?**

MLOps on Google Cloud refers to managing the machine learning lifecycle efficiently using DevOps principles and automation. Vertex AI Studio in GCP supports MLOps with tools for building, deploying, and managing machine learning models at scale. It ensures robust, scalable, and maintainable models and provides additional support for 360-degree patient view, 3D visualization, and advanced reasoning capabilities.