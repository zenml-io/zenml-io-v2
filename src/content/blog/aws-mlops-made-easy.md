---
title: "AWS MLOps Made Easy: Integrating ZenML for Seamless Workflows"
slug: "aws-mlops-made-easy"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66db83523bc9d6004dd29730"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-18T11:24:22.291Z"
  lastUpdated: "2024-10-18T11:24:22.291Z"
  createdOn: "2024-09-06T22:33:54.025Z"
author: "jayesh-sharma"
category: "mlops"
tags:
  - "aws"
  - "sagemaker"
  - "mlops"
  - "stacks"
  - "zenml"
date: "2024-09-11T00:00:00.000Z"
readingTime: 17 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/6cde7c69/66e05de05064adddc53313ef_zenml-aws.png"
seo:
  title: "AWS MLOps Made Easy: Integrating ZenML for Seamless Workflows - ZenML Blog"
  description: "Machine Learning Operations (MLOps) is crucial in today's tech landscape, even with the rise of Large Language Models (LLMs). Implementing MLOps on AWS, leveraging services like SageMaker, ECR, S3, EC2, and EKS, can enhance productivity and streamline workflows. ZenML, an open-source MLOps framework, simplifies the integration and management of these services, enabling seamless transitions between AWS components. MLOps pipelines consist of Orchestrators, Artifact Stores, Container Registry, Model Deployers, and Step Operators. AWS offers a suite of managed services, such as ECR, S3, and EC2, but careful planning and configuration are required for a cohesive MLOps workflow."
  canonical: "https://www.zenml.io/blog/aws-mlops-made-easy"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/6cde7c69/66e05de05064adddc53313ef_zenml-aws.png"
  ogTitle: "AWS MLOps Made Easy: Integrating ZenML for Seamless Workflows - ZenML Blog"
  ogDescription: "Machine Learning Operations (MLOps) is crucial in today's tech landscape, even with the rise of Large Language Models (LLMs). Implementing MLOps on AWS, leveraging services like SageMaker, ECR, S3, EC2, and EKS, can enhance productivity and streamline workflows. ZenML, an open-source MLOps framework, simplifies the integration and management of these services, enabling seamless transitions between AWS components. MLOps pipelines consist of Orchestrators, Artifact Stores, Container Registry, Model Deployers, and Step Operators. AWS offers a suite of managed services, such as ECR, S3, and EC2, but careful planning and configuration are required for a cohesive MLOps workflow."
---

In today’s rapidly evolving tech landscape, Machine Learning Operations (MLOps) remains crucial, even with the rise of Large Language Models (LLMs). Following MLOps best-practices helps in tasks like fine-tuning models and ensuring reproducible machine learning workflows. This blog delves into the intricacies of implementing MLOps on AWS, leveraging services like SageMaker**,** ECR, S3, EC2, and EKS. We’ll explore how ZenML, an open-source MLOps framework, simplifies the integration and management of these services, enabling seamless transitions between different AWS components and enhancing productivity. Whether you’re a seasoned data scientist or new to MLOps, this guide will provide valuable insights and practical steps to optimize your ML workflows on AWS.

## What is MLOps?

Similar to DevOps, and how it benefits software development, MLOps is a concept developed to benefit the development of ML systems. MLOps considers every stage of the ML lifecycle, from building, deploying, and serving to monitoring ML models, helping businesses get models to production faster and with higher success rates through the right platform, processes and people.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/522663b7/66db834f3bc9d6004dd29442_66db7858520084f5ca5e47a7_MLOps_cycle_20_1_.webp" alt="A diagram explaning what MLOps is" />
  <figcaption>from Neptune AI</figcaption>
</figure>

Executed well, these capabilities combine to manage the additional complexity introduced when managing ML systems and reduce model performance degradation. This decreases overhead and operating costs for the business, while enabling the use of advanced analytics, ML-powered decisioning, and unlocking new revenue streams.

## Components of an MLOps pipeline

If you are new to the world of MLOps, it is often daunting to be immediately faced with a sea of tools that seemingly all promise and do the same things. It is useful in this case to try to categorize tools in various groups in order to understand their value in your toolchain in a more precise manner.

The most important tool categories are the following:

<ul><li><a href="https://docs.zenml.io/stack-components/orchestrators">Orchestrator</a>: runs your pipeline code.</li><li><a href="https://docs.zenml.io/stack-components/artifact-stores">Artifact Store</a>: stores your artifacts like training data and models.</li><li><a href="https://docs.zenml.io/stack-components/container-registries">Container Registry</a>: stores Docker images that you might build to containerize your ML pipeline.</li><li><a href="https://docs.zenml.io/stack-components/model-deployers">Model Deployer</a>: helps in the deployment of your trained models</li><li><a href="https://docs.zenml.io/stack-components/step-operators">Step Operator</a>: allows you to run certain steps in your pipeline on specialized compute like GPUs.</li></ul>

and many more.

ZenML defines the concept of [Stacks and Stack Components](https://docs.zenml.io/user-guide/production-guide/understand-stacks) which represent these categories, each of which has a particular function in your MLOps pipeline.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/3f767303/66db83503bc9d6004dd294b2_66db7989885a34873e7e357a_image.png" alt="ZenML has Stack Components to represent the tools used in an MLOps pipeline." />
</figure>

## MLOps on AWS

AWS offers a comprehensive suite of managed services that can be directly utilized to build your MLOps solution without the need for manual deployment. These services cover various aspects of the MLOps pipeline, providing ready-to-use components. However, it's important to note that while AWS provides these individual services, integrating them into a cohesive MLOps workflow still requires careful planning and configuration on your part.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/c727caf9/66db834f3bc9d6004dd29456_66db79f2fe514e19e48c128d_mlops-workload-orchestrator_reference-architecture.bcce31ccd7a387eb5f8b748d7607eeba222a1834.png" alt="an example pipeline in AWS to train and deploy ML models." />
  <figcaption>an example pipeline in AWS to train and deploy ML models.</figcaption>
</figure>

### ECR (Elastic Container Registry)

[ECR](https://aws.amazon.com/ecr/) is AWS's fully-managed Docker container registry. In an MLOps pipeline, ECR can be used to store, manage, and deploy Docker images containing your pipeline code and associated dependencies. This ensures consistency across development, testing, and production environments. Read more about ECR on the official [User Guide](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html).

ECR is one of the options you can choose for the [container registry stack component](https://docs.zenml.io/stack-components/container-registries/aws) of your stack.

### S3 (Simple Storage Service):

[S3](https://aws.amazon.com/s3/) is AWS's object storage service. In MLOps, S3 can serve as a central repository for storing training data, model artifacts, and other large datasets. It provides durability, scalability, and easy integration with other AWS services, making it an essential component for data management in ML workflows. Read more about S3 on the official [User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html).

S3 buckets fit into the [artifact store stack component](https://docs.zenml.io/stack-components/artifact-stores/s3) bracket.

### EC2 (Elastic Compute Cloud):

[EC2](https://aws.amazon.com/ec2/) offers resizable compute capacity in the cloud. In MLOps, EC2 instances can be used for various tasks such as data preprocessing, model training, and inference. Its flexibility allows you to choose the right instance type based on your computational needs, from CPU-optimized to GPU-accelerated instances. Read more about EC2 on the official [User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).

An EC2 instance can serve as an [orchestrator stack component](https://docs.zenml.io/stack-components/orchestrators/skypilot-vm), which is where you’d run your pipelines and its steps. You can also host other services on the VM but that would involve a fair bit of setup on your end.

### EKS (Elastic Kubernetes Service):

[EKS](https://aws.amazon.com/eks/) is a managed Kubernetes service that simplifies the deployment, management, and scaling of containerized applications. In MLOps, EKS can be used to orchestrate your pipelines, deployment of ML models, manage scaling based on demand, and ensure high availability of your ML services. A cluster can also be used to host many other services, like an [image builder](https://docs.zenml.io/stack-components/image-builders/kaniko) that you might want to use in your workflow. Read more about EKS on the official [User Guide](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html).

A cluster can be:

<ul><li>an <a href="https://docs.zenml.io/stack-components/orchestrators/kubernetes">orchestrator</a> stack component when it is used to run your pipelines</li><li>a <a href="https://docs.zenml.io/stack-components/step-operators/kubernetes">step operator</a> when you want to only run specific steps in your pipelines on some cluster nodes (for example, running GPU-intensive steps on a GPU node) and the rest of the pipeline elsewhere, even locally.</li><li>a platform to host other stack components like the <a href="https://docs.zenml.io/stack-components/image-builders/kaniko">kaniko image builder</a>, an <a href="https://docs.zenml.io/stack-components/experiment-trackers/mlflow">MLflow experiment tracker</a> or a <a href="https://docs.zenml.io/stack-components/model-deployers">model deployer</a>.</li></ul>

### Amazon SageMaker:

[Amazon SageMaker](https://aws.amazon.com/sagemaker/) is AWS's fully-managed machine learning platform. It covers the entire ML lifecycle, from data preparation and model training to deployment and monitoring. In MLOps, SageMaker can be used for collaborative notebook environments, automated model training, easy deployment, and continuous monitoring of model performance. Learn how you can implement MLOps on the [official guide](https://docs.aws.amazon.com/sagemaker/latest/dg/mlops.html).

You can use Sagemaker as:

<ul><li>an <a href="https://docs.zenml.io/stack-components/orchestrators/sagemaker">orchestrator</a> to run your pipelines</li><li>a <a href="https://docs.zenml.io/stack-components/step-operators/sagemaker">step operator</a> when you would only want to run specific steps on its compute and run the rest of the pipeline elsewhere, even locally.</li></ul>

### MLOps on AWS: Real-life use-cases

There are many companies that use AWS extensively for their ML solutions. Here are a few that we liked:

**Coca-Cola**

[Coca-Cola Andina leveraged AWS](https://aws.amazon.com/solutions/case-studies/coca-cola-andina-analytics-case-study/?did=cr_card&trk=cr_card) to enhance its data analytics and machine learning capabilities significantly. They built a data lake on **Amazon S3** to store vast amounts of data from various sources, ensuring scalability and accessibility. **AWS Lambda** was used for serverless computing to process data in real-time, while **Amazon RDS** managed relational databases efficiently. For machine learning, **Amazon SageMaker** played a crucial role by enabling the development, training, and deployment of ML models.

The integration of these AWS services facilitated a robust MLOps pipeline, ensuring continuous improvement and deployment of machine learning models to meet business needs. But that said, ensuring seamless collaboration between data scientists, engineers, and business stakeholders was essential. They needed to establish robust workflows and communication channels to align their efforts and achieve the desired outcomes.

**Cisco**

[Cisco leverages AWS](https://aws.amazon.com/solutions/case-studies/cisco-case-study/?did=cr_card&trk=cr_card) for its MLOps by migrating its large language models (LLMs) to **Amazon SageMaker** and using **NVIDIA Triton Inference Server**. This migration allows Cisco to separate ML models from applications, which are hosted on **Amazon EKS**, enhancing efficiency and reducing costs. By using SageMaker endpoints, Cisco can scale models independently, improving development and deployment cycles. Additionally, Cisco employs asynchronous inference to save costs by scaling resources based on demand. This setup enables faster application startup, quicker experiments, and better resource management, ultimately optimizing inference costs and improving operational efficiency.

**Fox**

[FOX Corporation leverages AWS](https://aws.amazon.com/solutions/case-studies/fox-corporation-case-study/) to enhance its media and advertising insights by building a unified data solution. This solution processes up to 30 million data points per second. Key AWS services used include **Amazon S3** for data storage, **AWS Lambda** for serverless computing, **Amazon Data Firehose** for real-time data streaming, and **Amazon Rekognition** for image and video analysis. FOX’s use cases include enriching media insights, providing real-time forecasts for NFL games, and developing ATLAS, an AI-driven solution for contextual ad opportunities.

## How to decide between EC2, EKS, or Sagemaker pipelines

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/9f57d091/66db83503bc9d6004dd29471_66db7a4a943531b3a99c526a_giphy.webp" alt="A GIF of cookie monster choosing between options" />
</figure>

You must have noticed from the discussion above that you have multiple options for the orchestrator stack component. This section aims to help you choose from them, based on your needs and the strengths and weaknesses of the three services.

It's important to stress that as your ML project evolves, you may need to move between these services to accommodate changing requirements or to experiment with different approaches. This transition can come at a significant cost, including rewriting your MLOps pipelines, reconfiguring credentials and access permissions, and adapting to an entirely new interface.

<table border="1"><tbody><tr><th>EC2</th><th></th><th>EKS</th><th></th><th>SageMaker</th><th></th></tr><tr><th>Pros</th><th>Cons</th><th>Pros</th><th>Cons</th><th>Pros</th><th>Cons</th></tr><tr><td>Flexibility to customize ML environments with specific libraries and tools</td><td>Lack of built-in MLOps features, requiring manual implementation</td><td>Excellent for orchestrating distributed ML training and serving</td><td>Steeper learning curve, especially for those new to Kubernetes</td><td><a href="https://aws.amazon.com/sagemaker/">Fully managed ML platform</a> with integrated MLOps capabilities</td><td>Can be more expensive than managing your own infrastructure</td></tr><tr><td><a href="https://www.notion.so/AWS-MLOps-Made-Easy-Integrating-ZenML-for-Seamless-Workflows-6b05aea7de4d4ad697bf50b4b6ad4bec?pvs=21">Cost-effective</a> for long-running, resource-intensive ML training jobs</td><td>Scaling ML workloads can be complex and time-consuming</td><td>Automatic scaling and <a href="https://aws.github.io/aws-eks-best-practices/networking/loadbalancing/loadbalancing/">load balancing</a></td><td>Can be overkill for small ML projects</td><td>Simplified model development, training, and deployment</td><td>Less flexibility compared to custom solutions on EC2 or EKS</td></tr><tr><td>Suitable for ML workflows requiring <a href="https://docs.aws.amazon.com/dlami/latest/devguide/gpu.html">specialized hardware</a> (e.g., specific GPUs)</td><td>More effort required for reproducibility and version control of ML environments</td><td>Enables consistent ML environments across development and production</td><td>Potential for higher costs due to cluster management overhead</td><td>Built-in support for popular <a href="https://docs.aws.amazon.com/sagemaker/latest/dg/debugger-supported-frameworks.html">ML frameworks and algorithms</a></td><td>Potential vendor lock-in to AWS ecosystem</td></tr><tr><td></td><td>Security and updates need to be managed manually</td><td>Portable across different cloud providers or on-premises</td><td></td><td><a href="https://aws.amazon.com/blogs/machine-learning/scale-training-and-inference-of-thousands-of-ml-models-with-amazon-sagemaker/">Automatic scaling</a> for training and inference</td><td>May have limitations for highly customized ML workflows</td></tr><tr><td></td><td></td><td></td><td></td><td>Integrated <a href="https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html">monitoring</a> and model performance tracking</td><td></td></tr></tbody></table>

** You can avoid vendor lock-ins if you use a flexible framework like ZenML that allows you to write your pipelines once and run anywhere.

To summarize,

<ul><li>EC2 is best suited for teams that require maximum flexibility in their ML environments or have specific hardware needs. It's ideal for organizations with the resources to manage infrastructure and implement custom MLOps solutions, particularly for resource-intensive or long-running ML training jobs.</li><li>EKS is optimal for teams embracing containerization and microservices architecture in their ML workflows. It excels in orchestrating distributed ML training and serving, making it suitable for complex, scalable ML pipelines. However, it requires expertise in Kubernetes and may introduce unnecessary complexity for smaller projects.</li><li>SageMaker is the go-to choice for teams seeking a fully managed ML platform with integrated MLOps features. It simplifies model development, training, and deployment, making it ideal for organizations wanting to rapidly implement ML pipelines without managing infrastructure. However, it may be less flexible for highly customized workflows and could lead to higher costs for large-scale operations.</li></ul>

## Challenges in Adopting MLOps with AWS

<ul><li><strong>Adoption within data science department<br /></strong>Some training might be needed to bring your data science department up-to-speed with how AWS works, what the different terms mean and how to manage the myriad of services it offers.</li></ul>

<ul><li><strong>Credentials management<br /></strong>To allow data scientists to run pipelines on AWS, you would have to configure their machines with the right credentials and update them whenever new services are added or when permissions need to change (say when you are moving from one AWS account to another). This process eats up a significant chunk of your time that could have gone into ML development instead.</li></ul>

<ul><li><strong>Hard to integrate the different services<br /></strong>Connecting multiple AWS services into a cohesive MLOps pipeline can be challenging. While writing your ML pipelines, you also have to design modules that deal with tasks like storing/retrieving artifacts from S3, building/pushing images to ECR among other things; tasks that shouldn’t need to be done by data scientists.</li></ul>

<ul><li><strong>Hard to write pipelines<br /></strong>Writing pipeline code that adapts to your usage is challenging. For instance, if you want to make full use of your orchestration environments, you might have to add additional configurations like special instance types, memory and CPU requirements and more.</li></ul>

<ul><li><strong>Pipelines are not portable<br /></strong>The pipelines you write for an EC2 instance won’t work directly on SageMaker and you will have to refactor the code to respect SageMaker’s SDK like defining a <code>ProcessingStep</code> &nbsp;and a <code>Pipeline</code> to begin with. In addition to being a tedious job in itself, it also requires you to study the SDK and learn what options would be best for your use case before you get to running the pipeline.</li></ul>

<ul><li><strong>Cross-account, cross-team, cross-region collaboration<br /></strong>Collaborating with people across teams and accounts is challenging as it involves<ul><li>careful delegation of permissions to the right people. Different accounts will have their own set of IAM roles and policies and need to be configured separately on the user machine.</li><li>sharing of information about the services being used. Questions like what bucket do I use for the model artifacts, what configuration should be set for the SageMaker instances, or what nodes to use in the EKS cluster need to be answered through a central control plane or something similar.</li></ul></li></ul>

<ul><li><strong>It is expensive and not very flexible<br /></strong>Running workloads on the cloud comes at a cost. If you have pipelines that only have some steps that might need specialized compute, you will want to run all other steps locally to save costs. Building such a solution would bring more complexity to an already complex pipeline and it would also mean that all user machines that want to run pipelines locally need to be configured with the right permissions and the right dependencies.</li></ul>

### Real-life examples

In the real-life use cases section above, we noticed that although teams worldwide have made great progress by implementing AWS on MLOps, they also had to overcome many barriers similar to the ones we’ve discussed in this section.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/7690f9d2/66db83503bc9d6004dd294af_66db7b428d653c73c6ab1843_giphy_20_1_.webp" alt="A GIF of a guy walking into a room on fire, holding a pizza" />
</figure>

Some concrete examples from the internet worth looking at:

<ul><li><strong>“It is so hard to understand how to do something from their docs. Their blogs are good and are the only thing helping me implement at least something. “</strong> from <a href="https://www.reddit.com/r/mlops/comments/17u5a05/aws_for_mlops_your_experience/">this post</a>, signifying how it can be confusing at times to adopt new tools and switch your stacks.</li><li><strong>“The company migrated its two pipelines over to Amazon SageMaker within 8 months.”</strong> from this study on a company, EagleView, from AWS Customer Stories, reiterating how most pipelines you write are not portable and you need to learn new tooling in order to migrate to another tool.</li><li><strong>“SageMaker hides a lot of stuff from you in an attempt to be ‘easy’, but can end up being a pain to figure out if anything goes wrong.”</strong> and more from <a href="https://www.reddit.com/r/datascience/comments/12cupkq/why_not_sagemaker/">this post on Reddit</a>.</li><li><strong>“Bloody expensive… Hobby-scale instances are $1000/mo. Which, is crazy”</strong> from <a href="https://www.reddit.com/r/datascience/comments/12cupkq/why_not_sagemaker/">this post</a> telling how it is expensive to experiment with your projects on managed services from AWS, underlining the need for reliable local testing.</li><li><strong>"Mistakes that eat AWS credits aren’t able to be granted concessions (read as: refunds), so my $260 in credits are now forever lost to me."</strong> from <a href="https://www.lastweekinaws.com/blog/sagemaker_is_responsible_for_my_surprise_bill/">this blog</a> talking about complex pricing for resources that you manage yourself, on AWS.</li></ul>

## Step-by-step Tutorial: Using an open-source framework to optimize your MLOps on AWS

### What is ZenML?

ZenML is an open-source MLOps framework designed for creating portable, production-ready machine learning pipelines. It decouples infrastructure from code, enabling seamless collaboration among developers and supports various cloud providers and orchestration tools.

**Key features include:**

<ul><li><strong>Infrastructure Agnostic</strong>: Run pipelines on AWS, GCP, Azure, Kubernetes, and more without changing code.</li><li><strong>Automatic Logging</strong>: Track code, data, and model metadata automatically.</li><li><strong>Version Control</strong>: Ensure reproducibility with built-in version control for ML workflows.</li><li><strong>Flexibility</strong>: Switch between different backends and adapt your stack as needs evolve.</li><li><strong>Security</strong>: SOC2 compliant, ensuring data security and confidentiality.</li><li><strong>Seamless Transition</strong>: Move from local to cloud and from Jupyter notebooks to production pipelines effortlessly.</li><li><strong>Rapid Iteration</strong>: Smart caching accelerates iterations, allowing for quick experimentation with ML and GenAI models.</li><li><strong>Scalability</strong>: Easily scale to major clouds or Kubernetes, supporting both small models and large language models.</li></ul>

ZenML simplifies the MLOps process, allowing data scientists and ML engineers to focus on innovation rather than infrastructure management.

### How ZenML uses various AWS services

Let’s see how ZenML can help alleviate most of the challenges that we have listed above.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/c410da6c/66db83503bc9d6004dd29474_66db7b81ddd2db4cb1f1458e_giphy_20_2_.webp" alt="ZenML helps you do MLOps with AWS" />
</figure>

### Service Integration

ZenML brings together all of the AWS services we have discussed so far, as stack components that you can compose into ZenML Stacks. You can build a stack by choosing at least these three stack components, among many others: an orchestrator (EC2, EKS or Sagemaker), an artifact store (S3) and a container registry (ECR).

The graphic below shows how the pipeline code is separate from the stack that it runs on, making it very simple to switch stacks, and consequently services, without having to change your code at all. For example, you may realize at some point in your MLOps journey that running workloads on SageMaker might work better than running them on EC2. Switching this environment is literally a single command away!

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/ea612e1e/66db83503bc9d6004dd294cd_66db7bab66d3e7c9e1ba15c9_Untitled.png" alt="ZenML integrates all AWS services that you need for MLOps into a ZenML Stack, that you can use in a pipeline." />
</figure>

### Managing Credentials

Here’s a situation: you have developed a great MLOps pipeline that can train your model by reading data from an S3 bucket, loading the model, training it and storing it in the bucket. Now, you want others in your team to also be able to make changes to this pipeline and run it themselves. A common impediment to speedy execution here, is the local setup of credentials. In order to run this pipeline successfully, all team members would need to setup their `aws` config locally with the right role assumptions and secret keys. In addition to being very time-consuming, this also exposes your secrets to a greater attack surface.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/fe3c878d/66db834f3bc9d6004dd29459_66db7bde185f32d46e42b9b6_Untitled_20_1_.png" alt="Using your cloud infrastructure with ZenML as a Stack" />
</figure>

With ZenML, you can leave credential management to your ZenML Server. ZenML has a concept of [Service Connectors](https://docs.zenml.io/how-to/auth-management/service-connectors-guide) which are a powerful way to store and manage credentials centrally. Users wanting to run a pipeline on some stack don’t need any credentials locally or even any additional libraries installed. ZenML knows how to connect to any stack components they might need, for example, the container registry through the service connectors you configure once on your server.

### Use Case: Managing different AWS accounts using ZenML

The number of AWS accounts you use can be from anywhere from 1 to 100s, depending on your use case. As such, the following becomes important

<ul><li>Distributing access of the right accounts to the right people:If managing one set of credentials is not hard enough, you need to set up the local environment for all of your team members to include the various accounts and the corresponding roles that you want them to use.</li><li>Knowing which resources to use for a specific project or environment:</li><li>Once the setup is done, users need to be aware of what AWS profiles to use when running certain pipelines. For example, you want to make sure that staging pipelines only run on the development account and don’t use resources from the production account.</li></ul>

Doing this work manually leaves room for errors, both during setup and also each time someone runs a pipeline. ZenML takes care of this intrinsically, through the use of ZenML Stacks, configured with the right service connectors.

Here’s how the workflow for using multiple accounts with ZenML would look like:

<ul><li>You create a role in the development account that ZenML would use to talk to your services. This role might have access to S3, ECR, EKS and any other services you need.</li><li>Then, you register a service connector, let’s call it the <code>aws_dev_connector</code> using this IAM role as an authentication method.</li><li>You can now register your stack components on the ZenML Server using this connector. This ensures that these stack component objects are now firmly linked to your development account.</li><li>Any stack that you create with these components would now use resources only in the development account and any user that wants to use them doesn’t need to know the details of the IAM role that you configured in the first step.</li><li>You can repeat the process for the production account.</li></ul>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/84b76f69/66db83513bc9d6004dd295e7_66db7c17adae877cbcbbf3e3_aws_account.png" alt="Using multiple AWS accounts for MLOps with ZenML" />
</figure>

You can also restrict access to stacks based on the users. For example, some users might only need access to the stacks that utilize the development account. You can accomplish this using ZenML’s RBAC features. Note that this is only available on [ZenML Pro](https://www.zenml.io/pro).

<aside>

📝 Note that this example uses the IAM role method while talking about service connectors. You can choose any other method too, including STS tokens, or a secret key directly. Learn more [here](https://docs.zenml.io/how-to/auth-management/aws-service-connector#authentication-methods).

</aside>

### Connect your AWS to ZenML in one-click

ZenML makes deploying your first cloud stack as easy as pressing a few buttons. This feature lets you deploy all the necessary pieces of infrastructure (like the Sagemaker, S3 and ECR) and sets up your remote stack that you can instantly use with your pipelines. You don’t have to worry about what permissions to set, what rules to configure; ZenML does it all in the background for you!

**Steps to get your deployed AWS stack**

<ul><li>You would first need to have a deployed ZenML Server. If you don’t have one, follow the guide <a href="https://docs.zenml.io/getting-started/deploying-zenml">here</a>.</li><li>Go to “Stacks” and click “New Stack” and you’re greeted with the following screen that lets you choose between provisioning new components or reusing your existing resources (Scan your Cloud is one of my favorite features as it gives you an overview of what resources already exist in your account and can be used as ZenML stack components)</li></ul>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/8b0b553f/66db834f3bc9d6004dd29453_66db7c6b85b747dfed3c33d6_Untitled_20_2_.png" alt="ZenML helps you set up infrastructure to run your ML pipelines" />
</figure>

If you choose the in-browser experience, you only have to provide a Location and a name for your stack. You can also review what resources are created and what service connector permissions are used before proceeding. You also get a cost estimate based on AWS pricing for the components being provisioned.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/2c12c62f/66db83503bc9d6004dd29480_66db7c9ef87a945d0603f6e1_Untitled_20_3_.png" alt="ZenML Stack Infrastructure spin up page that shows components and how much they would cost." />
</figure>

<ul><li>This would ultimately take you to a CloudFormation page on your AWS account where you can review the script and then deploy your resources.</li></ul>

### Running Workloads on AWS

Now that you understand, at least in writing, how ZenML fast-tracks your MLOps adoption on AWS, it’s time we run some pipelines! I will use an LLM finetuning example, that is available on our [zenml-projects](https://github.com/zenml-io/zenml-projects/tree/main/llm-lora-finetuning) repo, to demonstrate account switching and quick development with ease.Here’s what we will do:

<ul><li>We first run this project on an EC2 instance on our development AWS account. This uses the <code>skypilot-aws-dev</code> stack, where all components are configured with a development service connector providing access to the dev account.</li></ul>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/13283a48/66db834f3bc9d6004dd2945f_66db7cff0c45d4a7e79a78a0_Untitled_20_4_.png" alt="Looking at a stack description in the ZenML Dashboard" />
</figure>

<ul><li>We then run the same example on our production SageMaker, without having to make any changes to our existing code. All you need to do is switch your ZenML stack: <code>zenml stack set sagemaker-prod</code>.</li></ul>

<aside>

📝 Note that you might have to change some orchestrator settings like what region or accelerator to use, since those are service-specific. However, this doesn’t require a change in code; just the configuration changes.

</aside>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/61c59927/66db834f3bc9d6004dd2945c_66db7d47044a89416a04665b_Untitled_20_5_.png" alt="Looking at a stack description in the ZenML Dashboard" />
</figure>

**What is a pipeline?**

A pipeline in ZenML consists of a series of **steps**, organized in any order that makes sense for your use case. You can write your pipeline and step code using Python decorators over your functions and this doesn’t require learning any additional syntax.

```
# This is how a simple pipeline might look like.
@pipeline
def my_pipeline():
    output_step_one = step_1()
    step_2(input_one="hello", input_two=output_step_one)
    
```

Executing the Pipeline is as easy as calling the function that you decorated with the @pipeline decorator.

```
if __name__ == "__main__":
    my_pipeline()
    
```

**Running our LLM finetuning pipeline**

Follow these steps to run the `llm-lora-finetuning` project:

<ul><li>Clone the <a href="https://github.com/zenml-io/zenml-projects">zenml-projects</a> repo and go into the <code>llm-lora-finetuning</code> directory.</li><li>Connect to your ZenML server. You need a remote deployment of ZenML to be able to use remote stack components. If you need one quickly, you can spin up a ZenML Pro tenant for free: <a href="https://www.zenml.io/pro">https://www.zenml.io/pro</a></li><li>Set the stack to your preferred stack. In our case, we choose the skypilot stack on our dev AWS account.</li></ul>

```
zenml stack set skypilot-aws-dev
```

We also edit the config file to include some skypilot specific settings. You can create a new one based on the ones that exist or you can also modify the existing orchestrator_finetune.yaml file. Include the following for SkyPilot, details of which you can find in our [SkyPIlot orchestrator docs](https://docs.zenml.io/stack-components/orchestrators/skypilot-vm#additional-configuration).

```
settings:
  docker:
    ...
  orchestrator.vm_aws:
    cpus: "2"
    memory: "16"
    accelerators: "V100:2"
    accelerator_args: {"tpu_vm": "true", "runtime_version": "tpu-vm-base"}
    use_spot: true
    region: eu-central-1
    zone: eu-central-1a
...
```

You are now all set. Run the following command to execute your pipeline. The [run.py](http://run.py/) file takes your command line arguments and then calls the pipeline function with the right config YAML file.

```
python run.py --config orchestrator_finetune.yaml
```

You will now see logs that indicate that your pipeline has started. ZenML does the job of building a Docker image for your code, including all dependencies and then submits a job to the right SkyPilot cluster based on your settings.

**Observing the run on the ZenML Dashboard**

Once a run has started, you can head to your ZenML Dashboard to now track it visually.

<ul><li>There’s a directed acyclic graph (DAG) of the pipeline that ZenML constructs based on the order of execution of steps.</li></ul>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/fd037c70/66db834f3bc9d6004dd29462_66db7f10f87a945d06064554_Untitled_20_6_.png" alt="The pipeline run view on the ZenML Dashboard showing the DAG and relevant details." />
</figure>

You can click on any step to learn more about it. The step code, logs, metadata all show up in a side panel.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/2653be34/66db83503bc9d6004dd2947a_66db7f4be59afb925a2027d7_Untitled_20_7_.png" alt="Step description on the ZenML Dashboard showing details like the start and end times." />
</figure>

You can also click any output of a step to know information like what artifact store path it is stored at and other metadata about it.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/c8ac34ed/66db83503bc9d6004dd29477_66db7f872d24625a20ed0853_Untitled_20_8_.png" alt="The artifact view on the pipeline run page that shows you what step produced it and when, among other things." />
</figure>

**Model Control Plane**

This is a really powerful feature that [lets you bring together different pipelines, artifacts and models](https://docs.zenml.io/how-to/use-the-model-control-plane) that pertain to a single project. You can find all the versions that your pipeline executions produce and can promote/demote them to production/staging based on the information that you see.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/5a1ad6e1/66db83503bc9d6004dd2947d_66db7fbf5cc8cd035fb0d526_Untitled_20_9_.png" alt="The Model page on the Model Control Plane showing how easy it is to promote model versions." />
</figure>

You can also log additional metadata essential to your application like metrics to a model version for easy comparisons.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/994a8a2f/66db83503bc9d6004dd294d0_66db7fe943c3d4df2373dfae_Untitled_20_10_.png" alt="You can log metadata like evaluation metrics on for each Model version and it shows up on the Model Control Plane." />
</figure>

## Conclusion

In conclusion, while AWS offers a robust suite of services for MLOps, the complexity and integration challenges can be daunting. ZenML simplifies this process by providing a seamless, infrastructure-agnostic framework that integrates effortlessly with AWS services like SageMaker, ECR, S3, EC2, and EKS.

By decoupling infrastructure from code, ZenML reduces the overhead of managing credentials, configuring services, and writing adaptable pipelines. This not only accelerates the development and deployment of ML models but also ensures reproducibility and scalability. For teams looking to leverage AWS for their MLOps needs, ZenML offers a streamlined, efficient, and flexible solution, making it the ideal choice for optimizing ML workflows on AWS.