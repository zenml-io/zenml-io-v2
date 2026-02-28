---
title: "ZenML + Kubernetes + Kubeflow: Leveraging your MLOps infrastructure"
slug: "zenml-kubernetes-kubeflow"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "668e90986967f54b75e59bc1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-08-20T08:51:42.833Z"
  lastUpdated: "2024-08-20T08:51:10.450Z"
  createdOn: "2024-07-10T13:46:00.323Z"
author: "rishabh-sharma"
category: "tutorials"
tags:
  - "kubernetes"
  - "kubeflow"
  - "zenml"
  - "infrastructure"
date: "2024-07-12T00:00:00.000Z"
readingTime: 15 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/8c1b1eb9/668ea9a1c8c67436ee659924_zenml-kubernetes-kubeflow-cover.webp"
seo:
  title: "ZenML + Kubernetes + Kubeflow: Leveraging your MLOps infrastructure - ZenML Blog"
  canonical: "https://www.zenml.io/blog/zenml-kubernetes-kubeflow"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/46c2a567/668ea9a1c8c67436ee659924_zenml-kubernetes-kubeflow-cover.webp"
  ogTitle: "ZenML + Kubernetes + Kubeflow: Leveraging your MLOps infrastructure - ZenML Blog"
---

## Introduction to ZenML

The journey from model conception to deployment in machine learning is fraught with infrastructure management challenges. Machine learning engineers often struggle to ensure models function correctly in production without constant supervision. In this blog, we explore how ZenML simplifies these challenges by abstracting the complexities of MLOps, providing reliable deployment environments for machine learning engineers.

**What is ZenML?**

ZenML is an open-source MLOps framework that creates portable, production-ready machine learning pipelines. It offers extensive integration options, decoupling infrastructure from code to enable seamless development and deployment. This simplification allows machine learning engineers to focus on strategic growth rather than infrastructure headaches. Coupled with Kubeflow, ZenML enhances project adaptability and scalability, providing a streamlined pathway for rapid ML model deployment to production.

In this post, we will learn how to integrate ZenML with Kubeflow to streamline your MLOps pipeline. This integration reduces infrastructure complexity, enabling efficient development, continuous monitoring, and deployment of Machine Learning projects, enhancing business outcomes. ZenML simplifies workflow setup and orchestration, improving productivity and teamwork for machine learning engineers. We will review practical use cases, showing how this integration provides a seamless interface for managing complex ML pipelines ensuring effective business outcomes.

**Key Features:**

<ul><li><strong>Pipeline Versioning:</strong> ZenML offers robust version control features that guarantee ML processes that are reliable and consistent.</li><li><strong>Integration Flexibility:</strong> It supports popular ML frameworks and preferred tools, enabling customized pipeline integration and modification.</li><li><strong>Scalability: </strong>Designed to scale smoothly from local environments to extensive cloud deployments like Amazon Web Services (AWS) and Google Cloud, ZenML facilitates resource management across different stages of ML project growth, ensuring seamless integrations and reliable deployment on Google Cloud and AWS Batch.</li></ul>

**Role-Specific Benefits:**

<ul><li><strong>MLOps Platform Engineers:</strong> ZenML helps configure and manage scalable ML systems, establishing standardized environments for reliable development and deployment on any cloud provider.</li><li><strong>Data Scientists:</strong> This technology streamlines the experimentation cycle by allowing data scientists, machine learning engineers, and engineering teams to invent and experiment with models without worrying about managing infrastructure.</li><li><strong>ML Engineers: </strong>Enable the smooth management of dependencies and efficiently integrate trustworthy, high-performing models into production environments, ensuring optimal performance and seamless integrations for machine learning engineers supported by robust model architectures.</li></ul>

### Run your ML pipelines locally with ZenML

This part will teach you how to quickly set up and use ZenML to run machine learning pipelines locally. We'll cover all the ground, from installing Python to launching your first pipeline, so that you can maximize machine learning operations. Setting up ZenML helps improve the development pace and refine models for larger-scale deployments. Let's begin by utilizing ZenML to set up your local ML pipeline.

**Install Python**

<ul><li>Download and install the correct Python version if you don’t have it.</li><li>Ensure it's between versions <strong>3.8 and 3.11</strong> for compatibility.</li></ul>

**Ensure you have Python installed**

```plaintext
python --version
```

**Set up a Virtual Environment**

<ul><li>Creating a virtual environment for your project is good practice to avoid conflicts with other Python software packages.</li></ul>

**Creating a Virtual Environment:**

```plaintext
python -m venv myenv
```

<ul><li>To learn more about how to activate <a href="https://python.land/virtual-environments/virtualenv#Python_venv_activation">Python virtual environments</a>.</li></ul>

**Connect to ZenML**

```plaintext
pip install zenml
```

**Start the ZenML server locally**

```plaintext
zenml up
```

<ul><li>If you use a Windows device, you must run “zenml --blocking” to start the server in blocking mode, which ensures robust retry mechanisms.</li><li>To connect to your ZenML local, use 'default' as a username and an empty password.</li></ul>

**Run your first pipeline**

<ul><li>Clone the quickstart example to your local machine and experience smooth integration with your existing technology stack.</li></ul>

```plaintext
git clone --depth 1 https://github.com/zenml-io/zenml.git && cd zenml/examples/quickstart
```

<ul><li>Initialize ZenML in the current directory</li></ul>

```plaintext
zenml init
```

<ul><li>Install the remaining requirements apart from ZenML</li></ul>

```plaintext
pip install -r requirements.txt
```

<ul><li>Run the model training pipeline.</li></ul>

```plaintext
python run.py --training-pipeline
```

Once it is running, your dashboard will show all the details of the associated run, models, and artifacts.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/725677cd/6690e0a666e88ea5cb3dfaea_AD_4nXd_F4m_awfbMzU_sYVLtnQK9eLW-g1SAJ5yeJwttht3PGaR1YuPkxecL_SVLVG36Y6T0rMsIq9vRpdy2uuvgFbAd8ENEwv8DoR8SQnJljXsbtFodVXdOffH8vbd_lVk0HFcTl-cCNni1zaAw5bdjToqgNY.png" alt="" />
</figure>

### Transitioning to the cloud - deploying ZenML with ZenML Pro

ZenML Pro is a managed version of the open-source ZenML framework designed for team scalability, role-based access control, and collaboration on platforms like Google Cloud, offering model versions management and enhanced model training for an efficient ML lifecycle. It features a managed control plane, advanced roles and permissions, enhanced observability, advanced monitoring, CI/CD integrations, and a model performance dashboard for efficient ML pipeline management. ZenML Pro provides top-notch security, automatic backups, robust infrastructure, and compliance tools, meeting compliance requirements for a seamless MLOps experience. An alternative to the Pro version is the OSS version, which can be deployed manually.

**STEP 1:**

Click on the **“**[Try ZenML](https://cloud.zenml.io/login)**”** button.

<ul><li>After configuring your account, establish your organization and initiate a Tenant.&nbsp;</li></ul>

**STEP 2:**

Click **“Add Tenant”.**Enter the name of the Tenant and create the tenant.

<ul><li>In ZenML Pro, a <strong>tenant</strong> is an isolated workspace on a server. It allows teams to manage their projects and resources separately.</li></ul>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/eb0ac8bd/668e8ef794da32d392605b06_AD_4nXf8XPLiKQLzhaqKmngbmCoBN_UCs5FDp8e_xLZb2oTNJlbSdCUg4epvbNi5b7NhQ2_XZ30PenJnxr-POnDWrL2K12rskndgxQLluYR_Lwoh-wEoW1YniT0nbMDZIUvg7BpKChgWHRndxEs_jtQ8p0tteAnF.png" alt="" />
</figure>

**STEP 3:**

Login to your ZenML Pro tenant.

```plaintext
zenml connect --url #Access your URL through ZenML Pro
```

	- Do the required authorization.

This example illustrates model training and pipeline creation using the [breast cancer dataset](https://archive.ics.uci.edu/dataset/17/breast+cancer+wisconsin+diagnostic), providing insights into practical model training. It is a simple example designed to run quickly for demonstration purposes. In a real-world scenario, you would likely work with a larger dataset and more complex code.

**STEP 4:**

Run the model training pipeline.

Execute the necessary pipelines via the command line:

<ul><li><strong>Run the model training pipeline</strong></li></ul>

```
python run.py --training-pipeline
```

<ul><li><strong>Run the inference pipeline</strong></li></ul>

```
python run.py --inference-pipeline
```

Once it runs, your dashboard will show all the details of the associated run, models, artifacts, and visualization of model health.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/d92c3cbb/668e8ef7b223a03907e8c9ea_AD_4nXfy0LCU__DtSEvduHswQ0TArQfUrAX8BCGzmSa9taMm5Q83C_EvhXLZI65OGU_lZ26W2bEcJk8VctIsq3ouJ_nu6J_kEcVKHSJdgQCPSjHrIw0Di2JdtGM3l9-6CtWE0yswCL8MyxAu_Xr38QXQy9vzk2E.png" alt="" />
</figure>

**Go to your ZenML Pro account and view the pipeline status.**

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/b46677d2/668e8ef7ed5ad53597ceec15_AD_4nXeh8LSJuPUl0JrOagEbTE0LHVF7q9N0klzMMq3bJUP01J43TJrlqDcvrhdHK5BhVJ2OZFFauoymdHhBBpLYb729jGq7u_ldrShpOk0rZv2Kik8KQU_ZTKrvSq7nrfXZuNgUOsONXz0YvLDIGXzu1fwOoVOG.png" alt="" />
</figure>

**Detailed Breakdown of a Machine Learning Pipeline:**

<ol><li><strong>data_loader</strong>: Loads the initial dataset (DataFrame). This step involves fetching the raw data that will be used for training and testing the model.</li><li><strong>data_splitter</strong>: Splits the dataset into training and test subsets (my_data_subset, raw_dataset_tst, raw_dataset_trn). This step ensures the data is divided appropriately to evaluate the model's performance accurately.</li><li><strong>data_preprocessor</strong>: Processes raw datasets into training and test sets (dataset_trn, dataset_tst) and defines the preprocessing pipeline. This step includes cleaning, transforming, and normalizing the data to make it suitable for model training.</li><li><strong>model_trainer</strong>: Trains a RandomForestClassifier model using the processed training dataset, focusing on model accuracy and model robustness. This step involves using the prepared data to train the machine learning model and optimizing it for the best performance.</li><li><strong>model_evaluator</strong>: Evaluates the trained model using the test dataset, providing an evaluation metric (float). This step assesses the model's performance on unseen data to ensure it generalizes well and performs accurately.</li><li><strong>model_promoter</strong>: Decides on model promotion based on the evaluation result (boolean).</li></ol>

This pipeline loads splits, preprocesses data, trains, evaluates, and potentially promotes a machine learning model. It focuses on efficient model training, ensures model robustness, and includes sentiment analysis to enhance the model's performance and applicability.

## Introduction to Kubeflow

Kubeflow is an open-source framework that orchestrates machine-learning processes on Kubernetes, providing seamless integrations and reducing infrastructure requirements. It offers an extensive toolbox for managing complex, scalable machine learning systems. Kubeflow is the ideal choice for enterprises looking to apply machine learning procedures on a big scale since its components address every stage of the ML lifecycle, from data intake to model deployment and servicing.

### Why Use Kubeflow - Use Cases and Complexity:

Kubeflow is especially beneficial in high computing cases, complicated pipelines, and multi-tenant setups, enabling efficient collaboration

<ul><li><strong>Automating large-scale ML pipelines</strong> across various infrastructure environments.</li><li><strong>Experimentation and model tuning</strong>, where it is essential to manage several experiments simultaneously.</li><li><strong>Multi-user collaboration, </strong>providing isolated environments for different users or teams, ensuring effective teamwork, and building a solid community of users.</li></ul>

However, with such great powers comes a level of complication. Kubeflow requires a firm understanding of Kubernetes, which may mean a longer learning curve. Pipeline maintenance, scalability, and deployment management may be easier to achieve with Kubernetes expertise.

### ZenML vs. Kubeflow - What Makes ZenML Unique

<table border="0" cellpadding="0"><tbody><tr><th><strong>Aspect</strong></th><th><strong>Kubeflow</strong></th><th><strong>Kubeflow with ZenML</strong></th></tr><tr><td><strong>Ease of Use</strong></td><td>Requires a good understanding of Kubernetes. Kubeflow can be a barrier for ML-focused developers as you have to focus on k8s management, kubeflow, and instio.</td><td>ZenML abstracts Kubernetes complexity, focusing on ML and providing an intuitive interface, reducing the learning curve.</td></tr><tr><td><strong>Integration Flexibility</strong></td><td>Limited to Kubernetes-native tools and extensions. Restricts to compatible tools and methodologies.</td><td>ZenML integrates various MLOps tools with Kubeflow, adding different components based on needs and enhancing business outcomes through efficient management.</td></tr><tr><td><strong>Workflow Customization</strong></td><td>Powerful but complex Kubernetes-native orchestration. Customization requires deep Kubernetes knowledge.</td><td>ZenML provides a flexible and user-friendly layer on top of Kubeflow with easy pipeline customization.</td></tr><tr><td><strong>Orchestration</strong></td><td>Kubeflow provides strong capabilities, but they are Kubernetes-native and complex.</td><td>With ZenML, you can simplify workflow management, avoiding the need for direct manipulation of Kubernetes, which can be complex and time-consuming.</td></tr> </tbody></table>

## Getting started with ZenML stacks and Kubernetes architecture

	**Prerequisites:**

**Basic Kubernetes Knowledge:**

<ul><li>Kubernetes is an open-source platform for automating the deployment, scaling, and management of containerized applications.</li></ul>

**Basic Knowledge of how pipelines work:**

<ul><li><strong>The Exact Code</strong>:<ul><li>This includes all the steps of a pipeline, from data ingestion to deployment. Every step should be codified to ensure reproducibility and clarity.</li></ul></li><li><strong>Parameter Values:</strong><ul><li>The values of the parameters at each step must be clearly defined. These parameters can significantly influence the pipeline's outcome and performance, ensuring reproducible workflows.</li></ul></li><li><strong>Infrastructure Configuration</strong>:<ul><li>The environment where the pipeline runs should be specified. This includes the hardware, software, and any dependencies required to run the pipeline.</li></ul></li></ul>

### Practical understanding of ZenML stacks concept

A** ZenML stack** configures various tools and infrastructure components on which your ML pipelines run. It lets you separate your code from the underlying infrastructure, making your workflows more modular and adaptable. When you run ZenML code without configuring a specific stack, it runs on the default stack.

**Components of a Stack**

A stack in ZenML consists of multiple components, each serving a specific role:

<ul><li><strong>Orchestrator</strong>: It is responsible for executing the pipeline code.</li><li><strong>Artifact Store</strong>: Persists the outputs of each step in the pipeline.</li><li><strong>Additional Components</strong>: Experiment trackers, model deployers, and container registries can also be part of a stack.</li></ul>

**Default Stack**

The default stack typically includes a local orchestrator and a local artifact store. When you followed the previous steps, you were already using the default stack, even though it wasn't explicitly mentioned then. While running your ML pipelines locally, ZenML manages the orchestration and artifact storage seamlessly behind the scenes using the **default stack**, adhering to regulatory requirements. 

<ul><li>You can view details of your active stack using the following command:</li></ul>

```
zenml stack describe
```

The above command provides information about the components of the active stack, including the orchestrator and artifact store you have been using. This will help you understand the setup better as you work with Kubeflow, where you'll see how ZenML's abstraction simplifies the transition to more complex infrastructure, including automated testing.

**Benefits of ZenML Stacks**

<ul><li><strong>Modularity:</strong> ZenML allows you to create modular stacks, combining different orchestrators, artifact stores, and other components to fit your needs. This supports complex ML workflows and ensures model effectiveness.</li><li><strong>Reusability:</strong> Consistent stacks across projects. Define a stack once and reuse it across multiple projects, ensuring continuous training.</li><li><strong>Simplicity:</strong> ZenML abstracts the complexity of tool integration. It handles the integration of various tools, making it easier to manage your ML pipelines without delving into the intricate details.</li><li><strong>Flexibility:</strong> ZenML enables you to seamlessly switch between different stacks, such as from local to cloud-based setups, without modifying your pipeline code, ensuring consistent deployment environments.</li><li><strong>Code Consistency:</strong> ZenML’s abstraction layer ensures that your pipeline code remains the same, regardless of the underlying infrastructure stack<strong>.</strong></li></ul>

**What is an orchestrator?**

<ul><li>The orchestrator is an essential component in any MLOps stack, as it is responsible for running your machine learning pipelines. To do so, the orchestrator provides an environment set up to execute the steps of your pipeline, facilitating root cause analysis when issues arise. It also ensures that the steps of your pipeline only get executed once all their inputs (outputs of previous steps of your pipeline) are available.</li></ul>

**When to use it**

<ul><li>The orchestrator is a mandatory component in the ZenML stack. It stores all artifacts produced by pipeline runs, ensuring reliable deployment and seamless integrations for machine learning engineers.</li></ul>

**How to use it**

<ul><li>Data scientists don't need to interact directly with any ZenML orchestrator in your code. As long as the orchestrator that you want to use is part of your active<a href="https://docs.zenml.io/user-guide/production-guide/understand-stacks"> ZenML stack</a>, using the orchestrator is as simple as executing a Python file that <a href="https://docs.zenml.io/user-guide/starter-guide">runs a ZenML pipeline</a>:</li></ul>

`python file_that_runs_a_zenml_pipeline.py` to streamline model training.

**Orchestrators and ZenML Abstraction**

Orchestrators are a crucial part of ZenML's modular architecture. They define how and where your pipelines are executed. ZenML abstracts your existing infrastructure, enabling you to switch between different orchestrators with minimal changes to your pipeline code.

ZenML simplifies the orchestration process, allowing you to focus on building and optimizing your machine-learning models rather than managing the underlying infrastructure, ensuring alignment with key performance indicators. For instance, with the Kubeflow orchestrator, ZenML handles creating and managing multiple pods, services, and Kubernetes resources, which can be complex and time-consuming.

### Kubernetes vs. Kubeflow: When to Use Each Orchestrator

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/bfa6fda8/66b1ce28961d94d55b44ae18_668ea65d28feb091c2943b6f_zenml-kubernetes-kubeflow.webp" alt="ZenML vs Kubernetes vs Kubeflow" />
</figure>

**Steps to Run Pipelines with Kubernetes Orchestrator**

Running Pipelines with **Kubernetes-Native** Orchestration

<ul><li>If you prefer not to use <strong>Kubeflow</strong>, <strong>ZenML allows you to run pipelines using the Kubernetes orchestrator</strong>, providing a reliable deployment environment and reducing additional infrastructure management complexity.</li></ul>

To use the Kubernetes orchestrator, we need:

**STEP 1: **Integration

```
zenml integration install kubernetes
```

**STEP 2: **Prerequisites

<ul><li><a href="https://www.docker.com/">Docker</a> installed and running</li><li><a href="https://kubernetes.io/docs/tasks/tools/#kubectl">kubectl</a> installed.</li><li><a href="https://dev.to/neeraj1997dev/kubernetes-cluster-step-by-step-5940">Kubernetes Cluster</a> cluster is up and running.</li></ul>

**STEP 3: **Set Up Kubernetes Context

<ul><li>Configure your Kubernetes context to point to the target cluster:</li></ul>

```
kubectl config get-contexts  # To see available contexts
kubectl config use-context <YOUR_CONTEXT> 
```

**STEP 4: **Artifact Stores

<ul><li>The <strong>Artifact Store</strong> is a central component in any MLOps stack. As the name suggests, it acts as a data persistence layer where artifacts (e.g., datasets, models) ingested or generated by the machine learning pipelines are stored.</li><li>Register a new artifact store</li></ul>

```
zenml artifact-store register ARTIFACT_STORE_NAME --flavor=ARTIFACT_STORE_FLAVOR [--ARTIFACT_STORE_OPTIONS]
```

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/19555ca7/668e8ef74adde8432c273412_AD_4nXdMwSCYCJ67fBMzkYMkNqdG020AGBlSzoNGMP_9km5L45QgjzK6TZEg5PNjfV4swQr22FNV7hQQz3lLwDLSVrrYgmbYqmT_ByaRb_VxUIGt8KOArMZSBmYxawhJlIMDOevhq2U9hP5FHpLNw6l5t0nv1h0Y.png" alt="" />
</figure>

<ul><li>If you would like to see the available flavors of Artifact Stores, you can use the command:</li></ul>

```
zenml artifact-store flavor list
```

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/dd0f22cb/668e8ef7cdefc03fe3cfa030_AD_4nXeQX5soU60IrcqK_-V8Y9ZN6IOfTkWXedA21BAgKOMNBtzl2w6Ys2yegmy__Z7oLxtEHtxFEmOZJpFhJCd1Vk5KRJkTElNT1rRVx0nPxu7Rukovqwk9Su9sOhayaEnz6qJnwZ_RYtmpnRBafmUXhfLLewXE.png" alt="" />
</figure>

**STEP 5: **Container Registries

<ul><li>The <strong>container registry</strong> is an essential part of most remote MLOps stacks. It stores container images built to run machine-learning pipelines in remote environments. Containerizing the pipeline code creates a portable environment that allows code to run isolatedly.</li><li>Register a new container registry.</li></ul>

```
zenml container-registry register CONTAINER_REGISTRY_NAME --flavor=CONTAINER_REGISTRY_FLAVOR [--CONTAINER_REGISTRY_OPTIONS]
```

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/17773b84/668e8ef7c03b6c0352f961d7_AD_4nXcEWmZ63a6UJA9ADO3IsTEuqvzAFh8kthEP6jVSjtzbm4N-W4wzwdI1X8MerPgwEe15-joRrYqx6s48vW6aATyEcGYSLWyPQFe9EgxSslIBogggjMrDwsoNWyFLjkfekjjjNq2wlbGNnToZ4UKX7lLZpwok.png" alt="" />
</figure>

<ul><li>If you would like to see the available flavors of container registries, you can use the command:</li></ul>

```
zenml container-registry flavor list
```

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/57e5670a/668e8ef72d49736c2213d7fd_AD_4nXfUH2YDHS2IpK8aCI0qICN84SSRwq8G2qdj8fveKCeBNjj7hIC_FryHs0pSU_W4JObdOcTj3hapDON695YXIxRgTPMTz_ARR3vePtTyH2YKpZT2ci8Oy_CCB3Dz5HwVxUDc3pNBDaE5HztosZ-MgBOeGyWP.png" alt="" />
</figure>

**STEP 6: **Orchestrator

```
zenml orchestrator register ORCHESTRATOR_NAME --flavor=ORCHESTRATOR_FLAVOR [--ORCHESTRATOR_OPTIONS]
```

<ul><li><a href="https://kubernetes.io/docs/tasks/tools/#kubectl">kubectl</a> installed and the name of the Kubernetes configuration context that points to the target cluster (i.e., run kubectl config get-contexts to see a list of available contexts).</li></ul>

**Note:** It is recommended that you set up[ a Service Connector](https://docs.zenml.io/how-to/auth-management/service-connectors-guide) to connect ZenML Stack Components to the remote Kubernetes cluster, especially if you are using a Kubernetes cluster managed by a cloud provider like AWS, GCP, or Azure. This guarantees that your Stack is fully portable to other environments and that your pipelines are reproducible.

**STEP 7:** Stack

<ul><li>A <strong>stack</strong> configures the tools and infrastructure on which your pipelines can run. The pipeline will run on the default stack when you run ZenML code without configuring a stack.</li><li>To register a new stack, you must already have registered its components using the below commands.</li></ul>

```
zenml stack register a_new_local_stack -o default -a my_artifact_store -r my_cont_reg
```

<ul><li>Administering the stack</li></ul>

```
zenml stack set gcp_kubernetes_stack
```

<ul><li>ZenML will build a Docker image called <code>&lt;CONTAINER_REGISTRY_URI&gt;/zenml:&lt;PIPELINE_NAME&gt;</code>, which includes your code, to run your pipeline steps in Kubernetes. Check out<a href="https://docs.zenml.io/how-to/customize-docker-builds"> this page</a> to learn more about how ZenML builds these images and how you can customize them.</li></ul>

**You can now run any ZenML pipeline using the Kubernetes orchestrator:**

```
python file_that_runs_a_zenml_pipeline.py
```

<ul><li>If all went well, you should now see the logs of all Kubernetes pods in your terminal. When running kubectl get pods -n zenml, you should also see a pod created in your cluster for each pipeline step.</li></ul>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/3076b4d4/668e8ef7e51918445e9651a4_AD_4nXcaEQnxfde3YDcf2BO2sA01xAyP13KOOzaGexL5nkmQw23x_bgbiv4R8YCrCR7bLr-NaE6fm9DKP1Rx_WnUha7LAj9-H0AJ3WzaAi30gzIb-KXSc7lyTPwxa11eb81vmrXPnLc_uutIFFE2PPNlgNjFifoD.png" alt="" />
</figure>

**Note: **Ensure that the Kubernetes namespace `&lt;zenml>` does exist in your cluster. If not

<ul><li>You can create the namespace using the <code>kubectl</code> command-line tool:</li></ul>

```
kubectl create namespace zenml
```

<ul><li>Ensure the namespace has been created successfully:</li></ul>

```
kubectl get namespaces
```

**Cleanup**

<ul><li>If you just want to delete the pods created by the example run, execute the following command:</li></ul>

```
kubectl delete pods -n zenml -l pipeline=kubernetes_example_pipeline
```

## Transitioning to the Kubeflow orchestrator

By transitioning your ZenML pipelines to use the Kubeflow orchestrator, you can significantly enhance your machine learning workflows by leveraging Kubeflow's powerful orchestration capabilities. The setup process is straightforward and builds upon your existing Kubernetes infrastructure. The setup is quite similar if you prefer to run ZenML on Kubeflow instead of directly on Kubernetes. Below are the detailed steps to get you started.

### Run Pipeline using the Kubeflow orchestrator.

To use the Kubeflow orchestrator, we need:

[Kubeflow Deployment](https://docs.zenml.io/stack-components/orchestrators/kubeflow#how-to-deploy-it): Kubeflow needs to be deployed on your Kubernetes cluster. This involves installing Kubeflow components and ensuring your cluster is configured to support Kubeflow.

**STEP 1: **Integration

```
zenml integration install kubeflow
```

**STEP 2: **Prerequisites

<ul><li><strong>Kubernetes Cluster</strong>: Ensure you have a running Kubernetes cluster (e.g., GKE, EKS, AKS).<ul><li>Running <strong><code>kubectl config get-contexts</code></strong> to see a list of available contexts will reveal the name of your Kubernetes configuration context, which points to your remote cluster.</li></ul></li></ul>

<ul><li><strong>NOTE:</strong> This is no longer required if you use<a href="https://docs.zenml.io/how-to/auth-management/service-connectors-guide"> a Service Connector</a> to connect your Kubeflow Orchestrator Stack Component to the remote Kubernetes cluster.</li></ul>

**STEP 3:** Artifact store

<ul><li>A<a href="https://docs.zenml.io/stack-components/artifact-stores"> remote artifact store</a> as part of your stack</li><li>Register a new artifact store</li></ul>

```
zenml artifact-store register ARTIFACT_STORE_NAME --flavor=ARTIFACT_STORE_FLAVOR [--ARTIFACT_STORE_OPTIONS]
```

<ul><li>List of all the <code>artifact-store</code></li></ul>

```
zenml artifact-store list
```

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/61eeed92/668e8ef770a8bb6474d0f14d_AD_4nXc6M7dG--WGUXZPa2kEa9Le3xnrw38gohzPIcvgTE4_p83mZjg8v9_bsWLecIqS7kebN_vLkAXYhL7gnTV7H9sd6K0_a6uEN16DQhAXS4mh4AAxcGCnpNan3RE-9RxyBxHS1bRFIrT-z5WHqlN2xQ-FTDg.png" alt="" />
</figure>

**STEP 4: **Remote container registry

<ul><li>A<a href="https://docs.zenml.io/stack-components/container-registries"> remote container registry</a> as part of your stack.</li><li>Register a new container registry.</li></ul>

```
zenml container-registry register CONTAINER_REGISTRY_NAME --flavor=CONTAINER_REGISTRY_FLAVOR [--CONTAINER_REGISTRY_OPTIONS]
```

<ul><li>List of all the container registry</li></ul>

```
zenml container-registry list
```

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/2e23a503/668e8ef7006391692c5bc175_AD_4nXcNmczIau6wDQPygFV7Hf2Ar0TXGsoC3hAmOudaj2Qpq4dpEeodIP00A_ZtVS15-pSnbjFExP8oxEyRFw6_GUX8MVdkQ61MAf2Yn4cJlmxWs_1GEo0jbE0r1XsWO5btrFRhROmamZgC9dHeo6GpW8-LcSk.png" alt="" />
</figure>

**STEP 5: **Kubeflow Orchestrator

```
zenml orchestrator register <ORCHESTRATOR_NAME> --flavor kubeflow
```

<ul><li>List of all the orchestrators</li></ul>

```
zenml orchestrator list
```

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/1210599e/668e8ef7fe55e32cbadd2810_AD_4nXeq39twZzWOnGiuIo9Q-c2p5KOEfDsJLYIkE1Xlbe4_8-lSqDtd7RtOIkqlRSLSWqkOl3gokJHoyU8NbKSi-FF0twuA7Qa2rcMjJdvVX5inHaeM7UYD5NrSaPeRMn7VHhHhhYNt8x3nSaZHI93IRPkJ1uSQ.png" alt="" />
</figure>

**STEP 6(Optional):** Remote Image Builders

<ul><li>The image builder is an essential part of most remote MLOps stacks. It builds container images so that your machine-learning pipelines and steps can be executed in remote environments.</li><li>A <a href="https://docs.zenml.io/stack-components/image-builders">remote Image builder</a> as part of your stack.</li></ul>

```
zenml image-builder register <NAME> --flavor=<provider>
```

<ul><li>List of all image builders</li></ul>

```
zenml image-builder list
```

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/0cfaa772/668e8ef7ab7376bcfc6e4894_AD_4nXfGKboSF2XwgVDEWMQPTdvhYMuZl8dq8OV5ZYID9uHD68YLA1bXSZtZ8W5WPwbQtndC3xdj9YisatdONpw_RMzqgTpS-nIhOsp7J6RHOPymYVgEacKICf-XAfQx9dS3iPVbK1tBESyUa9NN_5rkP5Y-TNI.png" alt="" />
</figure>

**STEP 7:** Stack	

```
zenml stack register a_new_local_stack -o default -a my_artifact_store -r my_cont_reg -i img
```

<ul><li>Administering the stack</li></ul>

```
zenml stack set <stack_name>
```

<ul><li>List of all the stacks</li></ul>

```
zenml stack list
```

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/af064fef/668e8ef758414b072a8bcdc1_AD_4nXd1c2zzNBZnCl42P2zYz3zSDwxJfshXhr5gEdvatx4pWGzxJk5SSKqSRPuBz_Zt0IaemmBflTtU9VRATBoPC-ulz_KCZZ0T56EvwcC5unm6EgfNE18pRjoMP1Q4QffzpqrZY4UBbDzTeiMasAuMZf45bEo.png" alt="" />
</figure>

**You can now run any ZenML pipeline using the Kubeflow orchestrator:**

```
python file_that_runs_a_zenml_pipeline.py
```

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/9c595aca/668e8ef7b9b60625607a28d0_AD_4nXdKGIlLai2iGhvwSdcE9bo4mWlaRO6mzhPMd4EdkrjLIDrnEM3fPlyJy9TfA2wzF9Ii6-F78p1lvieGT8gPVbTCUf4D-HZ_hH5PWjJYDE0x3K4oR1YzrY5kbZ7mSRkTA8I65GwK2yc3T37Z3owrU2jHevU.png" alt="" />
</figure>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/fc5fcdda/668e8ef7110b7454d505b1b2_AD_4nXdaD_BVIcy3g9-t066dd218po2ke0HVrncBbqrn1pvvZeaROohclvn__ZSmDMxbhmCMehvqnf01pJJ2fwUl_b2WTbeNkfv1Vexg5zqcY4Rt8z9gHzH5OyCvO793XBBhKfX1HZsZ6IIvhz0_wwWslq4ihj7G.png" alt="" />
</figure>

<ul><li><strong>Access Kubeflow UI</strong></li><li>You can access the Kubeflow UI to monitor your pipeline runs. Retrieve the URL in Python if needed:</li></ul>

**Python Code:**

```python
from zenml.client import Client
pipeline_run = Client().get_pipeline_run("<PIPELINE_RUN_NAME>")
orchestrator_url = pipeline_run.run_metadata["orchestrator_url"].value
print(f"Kubeflow UI URL: {orchestrator_url}")
```

### How Monitoring Pipelines in ZenML Pro is Better Than Kubeflow

**ZenML Pro** offers a streamlined, user-friendly experience for managing and monitoring ML pipelines, with advanced metrics tracking, visualization, and alert features. It simplifies the process of orchestrating ML workflows on Kubernetes and provides a powerful alternative to Kubeflow, particularly for teams looking for ease of use and integrated monitoring capabilities.

**Kubeflow**, on the other hand, is a robust and mature solution for complex, large-scale ML workflows, but it comes with added complexity and setup overhead. Depending on your specific needs and expertise, either ZenML Pro or Kubeflow can be the right choice for orchestrating your ML pipelines.

## Conclusion

In this tutorial, we explored setting up ZenML with Kubernetes and Kubeflow to streamline machine learning operations. ZenML, an open-source MLOps framework, simplifies the complexities of MLOps by providing robust, production-ready pipelines with extensive integration options.

We discussed its critical features, such as pipeline versioning, integration flexibility, and scalability, catering to various roles within a machine learning team. We provided steps to run pipelines locally and in the cloud with ZenML Pro, highlighting the advantages of modularity, reusability, and flexibility. These enable us to run arbitrary ML pipelines in a scalable cloud environment without changing a single line of our ML code.

Additionally, we covered the integration with Kubeflow, demonstrating how ZenML abstracts Kubernetes complexities, making it accessible and efficient for rapid ML model deployment and enhanced business outcomes.

If you want to know more about ZenML or see more examples, check out our [docs](https://docs.zenml.io/) and [examples](https://github.com/zenml-io/zenml/tree/main/examples) or join our [Slack](https://app.slack.com/client/T01F3D8MGET/C01FWQ5D0TT).

### ❓FAQ

<ul><li>Find answers to the most frequently asked questions about ZenML.</li></ul>

**Is ZenML Free?**

Yes, ZenML is free! The open-source version is available under the Apache License 2.0 and includes all core functionalities for building and managing ML pipelines. ZenML Pro is a paid option with advanced features like a managed control plane, role-based access control, and enhanced observability.

**How to Use ZenML?**

Register your staging and production environments as ZenML stacks to seamlessly manage and run ML workflows. This also provides a user interface to browse, explore, and manage your ML pipelines efficiently.

**How Does Kubeflow Work with Kubernetes?**

Kubeflow acts as an orchestrator that ZenML can seamlessly integrate. ZenML abstracts the complexities of Kubernetes and Kubeflow, allowing you to focus on building and optimizing ML pipelines. This integration leverages Kubeflow's capabilities while simplifying orchestration and management for scalable and efficient ML workflows.

**What is Kubernetes Infrastructure?**

Kubernetes infrastructure manages containerized applications at scale. ZenML enables the orchestration and scaling of ML pipelines on Kubernetes clusters, providing a reliable and scalable environment for deploying and managing ML models.