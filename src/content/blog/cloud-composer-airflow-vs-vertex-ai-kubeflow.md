---
title: "MLOps on GCP: Cloud Composer (Airflow) vs Vertex AI (Kubeflow)"
slug: "cloud-composer-airflow-vs-vertex-ai-kubeflow"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66b0f47e42b5b042b46045a7"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-08-20T11:55:19.126Z"
  lastUpdated: "2024-08-20T11:55:13.518Z"
  createdOn: "2024-08-05T15:49:18.315Z"
author: "zenml-team"
category: "tutorials"
tags:
  - "airflow"
  - "mlops-pipeline"
date: "2024-08-09T00:00:00.000Z"
readingTime: 12 mins
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/cb48f11f/66b231af4e5e9fcc902e48a7_zenml-airflow-kubeflow-vertex-cloudcomposer-min.png"
seo:
  title: "MLOps on GCP: Cloud Composer (Airflow) vs Vertex AI (Kubeflow) - ZenML Blog"
  description: "Cloud Composer (Airflow) vs Vertex AI (Kubeflow): How to choose the right orchestration service on GCP based on your requirements and internal resources."
  canonical: "https://www.zenml.io/blog/cloud-composer-airflow-vs-vertex-ai-kubeflow"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/84525d93/66b231af4e5e9fcc902e48a7_zenml-airflow-kubeflow-vertex-cloudcomposer-min.png"
  ogTitle: "MLOps on GCP: Cloud Composer (Airflow) vs Vertex AI (Kubeflow) - ZenML Blog"
  ogDescription: "Cloud Composer (Airflow) vs Vertex AI (Kubeflow): How to choose the right orchestration service on GCP based on your requirements and internal resources."
---

# MLOps on GCP: Different tools for different personas

As an ML engineer venturing into the world of [MLOps](https://www.zenml.io/blog/mlops-what-why-how), you've likely noticed the rapid evolution of Google Cloud's machine learning operations offerings. The array of services targeting various aspects of the ML lifecycle can be daunting, especially if you're working within the constraints of existing organizational infrastructure.

This article aims to demystify two of the most popular orchestration mechanisms in Google Cloud Platform (GCP) for MLOps: Cloud Composer and Vertex AI Pipelines. Orchestration serves as the backbone of MLOps activities, coordinating the complex interplay of data processing, model training, evaluation, and deployment.

We'll focus on:

<ol><li><a href="https://cloud.google.com/composer?hl=en">Cloud Composer</a>: Google's managed version of Apache Airflow, a powerful and flexible workflow orchestration tool widely used in data engineering and MLOps.</li><li><a href="https://cloud.google.com/vertex-ai">Vertex AI</a>: A component of Google's unified ML platform, Vertex AI, designed specifically for building and managing machine learning workflows. Based on the open source <a href="https://www.kubeflow.org/">Kubeflow project.</a></li></ol>

Both services offer robust orchestration capabilities, but choosing between them can be challenging. Let's delve into the specifics of each to help you make an informed decision for your MLOps setup.

## Vertex AI (Kubeflow)

Vertex AI is tailored specifically for machine learning workflows. The most popular component is  [Vertex AI Pipelines](https://cloud.google.com/vertex-ai/docs/pipelines/introduction), which leverages the Kubeflow Pipelines SDK, providing ML engineers with a familiar interface for constructing end-to-end ML pipelines. Vertex AI offers a comprehensive suite of services beyond pipelines, including the ability to schedule custom training jobs with GPUs. One of Vertex’s primary strengths lies in its native integration with other GCP AI services, offering built-in capabilities for model training, evaluation, and deployment. This tight integration can significantly streamline the MLOps process.

## Cloud Composer (Airflow)

Cloud Composer, Google's managed version of Apache Airflow, builds upon the most widely adopted open-source tool for data pipeline orchestration. Originally designed with data engineers in mind, Airflow has evolved to accommodate a wide range of use cases, including machine learning workflows. Its popularity translates to a vast [ecosystem](https://airflow.apache.org/ecosystem/) of plugins, operators, and community support, making it a versatile choice for various pipeline needs.

## Side-by-side comparison (Cloud Composer vs Vertex AI)

Here is a side-by-side comparison of using Cloud Composer vs Vertex AI

<table border="1" style="font-size: 1rem;"><thead><tr><th>Service</th><th>Pros</th><th>Cons</th></tr></thead><tbody><tr><td style="font-weight: bold; font-size: 1rem;">Vertex AI Pipelines</td><td> <ul> <li>Built specifically for ML workflows</li> <li>Serverless, so less infrastructure complexity</li> <li>Native integration with Vertex AI services</li> <li>More support for ML-specific workloads including GPU-intense jobs</li> </ul> </td><td> <ul> <li>Can be complex to manage with numerous components</li> <li>Requires learning an additional orchestration tool if already using Airflow</li> <li>More abstraction so can lead to longer debugging cycles</li> </ul> </td></tr><tr><td style="font-weight: bold; font-size: 1rem;">Cloud Composer (Airflow)</td><td> <ul> <li>Vast ecosystem of plugins and operators</li> <li>Flexible and adaptable to various use cases, including ML</li> <li>Can serve as a unified tool for both data and ML pipelines</li> <li>Strong community support and extensive documentation</li> <li>Stable and robust scheduling, monitoring, and alerting capabilities</li> </ul> </td><td> <ul> <li>Requires a constantly running cluster so is generally more expensive</li> <li>Needs additional setup for ML-specific tasks (Cloud Composer 2 no longer supports GPUs!)</li> <li>Learning curve for ML engineers not familiar with data engineering concepts</li> </ul> </td></tr></tbody></table>

### Cost Comparison

Perhaps one of the most significant differences from the table above is the fact that with Cloud Composer, organizations have a [consistent cost for the cluster](https://cloud.google.com/composer/pricing), while with Kubeflow you only pay for the workloads you run.

To see how this plays out, let's imagine a real-world concrete example that compares the two services purely in costs. A machine learning team needs to train and deploy computer vision models. They run GPU-intensive training jobs daily, along with data preprocessing and model evaluation steps. Let's compare the costs over a month.

**Monthly Workflow:**

<ol><li>Daily data preprocessing (CPU-only, 1 hour)</li><li>Model training (GPU-intensive, 4 hours)</li><li>Model evaluation (CPU-only, 1 hour)</li></ol>

This is how the cost breakdown per month:

*Disclaimer: This is a rough calculation based on the online pricing for *[Cloud Composer 2](https://cloud.google.com/composer/pricing#composer-2)* and *[Vertex AI](https://cloud.google.com/vertex-ai/pricing)* as of August 6, 2024. For most up-to-date information, please refer to the *[Google Cloud Price calculator](https://cloud.google.com/products/calculator?hl=en)

<table border="1" style="font-size: 1rem;"><tbody><tr><th style="font-weight: bold; font-size: 1rem;">Component</th><th style="font-weight: bold; font-size: 1rem;">Cloud Composer</th><th style="font-weight: bold; font-size: 1rem;">Vertex AI Pipelines</th></tr><tr><td style="font-weight: bold; font-size: 1rem;">Environment Fee</td><td>$396.00</td><td>$1.8</td></tr><tr><td style="font-weight: bold; font-size: 1rem;">CPU Resources</td><td>N/A</td><td>$13.11<br />(n1-standard-4: $0.21849/hr * 2 * 30 hours)<br />* Note higher per hour compared to standard cost due to Vertex premium</td></tr><tr><td style="font-weight: bold; font-size: 1rem;">GPU Resources</td><td>$42<br />(NVIDIA_TESLA_T4: $0.35/hr * 4hr * 30 days)</td><td>$50.62<br />((n1-standard-4: $0.21849/hr + NVIDIA_TESLA_T4: $0.42/hr) * 4hr * 30 days)<br />* Note higher per hour compared to standard cost due to Vertex premium</td></tr><tr><td style="font-weight: bold; font-size: 1rem;">Total Monthly Cost</td><td style="font-weight: bold; font-size: 1rem;">$438</td><td style="font-weight: bold; font-size: 1rem;">$65.53</td></tr></tbody></table>

<ul><li>Assumptions:<ul><li>3 daily pipeline runs = 30 runs/month</li><li>Cloud Composer environment runs 24/7 and NVIDIA_TESLA_T4 is optimally loaded into the environment only when required.</li><li>Prices based on us-central1 region</li></ul></li></ul>

From the offset, this example demonstrates how Vertex AI Pipelines can offer significant cost savings for ML-focused workflows, especially those involving GPU-intensive tasks and intermittent usage patterns. However, if your team is already using Airflow / Cloud Composer, then the base cost is often neglected, and then Cloud Composer is only $42 vs $65.53 for the same workload. Therefore, the answer to which is better really depends on the circumstances.

## Using ZenML to bridge the gap between Airflow and Kubeflow

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/de243447/66b0f47d42b5b042b4604494_66b0f41bd9f86bf7ca4e3b93_mlops-gcp02.png" alt="A diagram showing how ZenML, the opensource MLOps framework, integrates to various Google Cloud Platform services like Vertex AI  and Cloud Composer." />
</figure>

ZenML is an open-source MLOps framework designed to simplify the development, deployment, and management of machine learning workflows. It provides data scientists and ML engineers with a standardized approach to building production-ready machine learning pipelines.

One of ZenML's most powerful aspects is its ability to bridge different MLOps tools and platforms, particularly in the realm of workflow orchestration. A prime example of this is how ZenML facilitates the use of both Apache Airflow and Google Cloud's Vertex AI for machine learning purposes.

> 💡 Read how ZenML compares directly with Airflow and Kubeflow

ZenML plays a crucial role in bridging the gap between Airflow and Google Cloud's Vertex AI, allowing data scientists and ML engineers to leverage the strengths of both platforms for machine learning purposes. Here's how ZenML facilitates this integration:

<ol><li><strong>Unified Interface: </strong>ZenML provides a <a href="https://docs.zenml.io/user-guide/starter-guide/create-an-ml-pipeline">consistent interface</a> for defining ML workflows using Python decorators like <code>@step</code> and <code>@pipeline</code>. This allows users to create pipelines that can be executed on either Airflow or Vertex AI without changing the core pipeline code.</li><li><strong>Orchestration Flexibility:</strong> ZenML offers users the flexibility to seamlessly switch between <a href="https://docs.zenml.io/stack-components/orchestrators/airflow">Airflow</a> and <a href="https://docs.zenml.io/stack-components/orchestrators/vertex">Vertex AI</a> by simply adjusting their stack configuration. This versatility allows teams to deploy entire pipelines on either service, or adopt a hybrid approach. For instance, they can initiate a pipeline on Cloud Composer and offload GPU-intensive, ML-specific tasks to Vertex AI. This article will explore in depth how ZenML enables this "best of both worlds" strategy, combining the strengths of both platforms to optimize ML workflows.<strong></strong></li><li><strong>Infrastructure as Code: </strong>ZenML offers <a href="https://docs.zenml.io/how-to/stack-deployment/deploy-a-cloud-stack-with-terraform">Terraform modules</a> and a <a href="https://docs.zenml.io/how-to/stack-deployment/deploy-a-cloud-stack">stack deployment wizard</a> to quickly set up the necessary infrastructure on GCP, including Vertex AI components and Cloud Composer. This simplifies the process of getting started with both services.<strong></strong></li><li><strong>Artifact Management: </strong>ZenML's <a href="https://docs.zenml.io/stack-components/artifact-stores">artifact store abstraction</a> works seamlessly with <a href="https://docs.zenml.io/stack-components/artifact-stores">Google Cloud Storage (GCS)</a>, allowing users to store and version ML artifacts regardless of whether they're using Airflow or Vertex AI for orchestration.<strong></strong></li><li><strong>Container Management: </strong>The framework integrates with <a href="https://docs.zenml.io/stack-components/container-registries/gcp">Artifact Registry,</a> ensuring that Docker images for pipeline steps are properly built and stored, which is crucial for both Airflow and Vertex AI execution.<strong></strong></li><li><strong>Authentication and Permissions: </strong>ZenML provides <a href="https://docs.zenml.io/how-to/auth-management/gcp-service-connector">service connectors</a> that simplify authentication and permission management for GCP resources, making it easier to set up and use both Airflow and Vertex AI securely.<strong></strong></li><li><strong>Local to Cloud Transition: </strong>Users can develop and test their pipelines locally with ZenML, then <a href="https://docs.zenml.io/user-guide/production-guide/understand-stacks">seamlessly transition to running them</a> on Cloud Composer or Vertex AI in the cloud when ready for production, all without changing a line of code.<strong></strong></li><li><strong>Best Practices Implementation: </strong>ZenML enforces MLOps <a href="https://docs.zenml.io/how-to/setting-up-a-project-repository/best-practices">best practices</a> like reproducibility and modularity, which benefits pipelines running on both Airflow and Vertex AI.<strong></strong></li><li><strong>Specialized ML Features: </strong>ZenML enhances Airflow's general-purpose orchestration by layering <a href="https://docs.zenml.io/how-to/training-with-gpus">ML-specific features</a> on top, bridging the gap between Airflow and Vertex AI's specialized machine learning capabilities. ZenML also simplifies the adoption of Vertex AI's ML-specific features for data scientists.<strong></strong></li><li><strong>Experimentation Support: </strong>ZenML allows users to experiment with both Airflow and Vertex AI, enabling them to <a href="https://docs.zenml.io/user-guide/production-guide/cloud-orchestration">compare performance, features, and costs</a> before committing to one platform for production use.</li></ol>

By providing this bridge, ZenML enables teams to leverage the mature ecosystem and flexibility of Airflow alongside the ML-optimized features of Vertex AI, all while maintaining a consistent development experience and adhering to MLOps best practices.

## Example ML Workflow: Optimized Cloud Spend with Cloud Composer and Vertex AI

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/61f6b140/66b23731b8a56f8388458666_66b2337d33dc71c2cfd98158_zenml_airflow_vertex_gcp_mlops-min.png" alt="A flow diagram showing the components and data flow of an AI/ML pipeline. It includes steps for data extraction, transformation, augmentation, model training, and deployment. The pipeline runs on Airflow and Vertex platforms." />
</figure>

To illustrate how ZenML can leverage both Cloud Composer and Vertex AI, let's consider a practical example: the [ECB interest rate prediction pipeline](https://github.com/zenml-io/zenml-projects/tree/main/airflow-cloud-composer-etl-feature-train). This real-world scenario demonstrates how ZenML seamlessly integrates these platforms for effective ML workflow orchestration. The example showcases the seamless integration between Airflow and Vertex AI, leveraging the strengths of both platforms within the ZenML framework.

The workflow consists of three main pipelines:

<ol><li>ETL Pipeline (Runs on Airflow)</li><li>Feature Engineering Pipeline (Runs on Airflow)</li><li>Model Training Pipeline (Runs on Airflow but runs a <a href="https://docs.zenml.io/stack-components/step-operators/vertex">custom GPU-intense training job on Vertex AI</a>)</li></ol>

> 💡 Note that all the above pipelines can be run completely on Vertex AI Pipelines as well

### Best of Both Worlds: ZenML Pipeline on Airflow Orchestrator and Vertex AI Step Operator

As discussed earlier, organizations with existing data engineering teams or in-house Airflow expertise may prefer to leverage Cloud Composer for their daily tasks. In such cases, introducing a separate orchestration mechanism solely for machine learning might not be the most efficient approach.

With ZenML, you can run all steps within a pipeline on Airflow, while selectively outsourcing GPU-intensive workloads to Vertex AI using the ZenML step operator. This approach allows you to:

<ol><li>Utilize Airflow for its robust pipeline orchestration capabilities without needing to implement ML-specific features.</li><li>Leverage Vertex AI for GPU-intensive tasks, taking advantage of its ML-optimized infrastructure.</li><li>Manage the entire workflow seamlessly through a single interface provided by ZenML.</li></ol>

This hybrid strategy enables teams to maintain their existing Airflow-based workflows while easily incorporating Vertex AI's powerful ML capabilities when needed. ZenML acts as the unifying layer, providing a cohesive experience that bridges the gap between general-purpose orchestration and specialized ML tasks.

All you have to do is to decorate the step you would like with a simple with some options that specify the infrastructure you need for:

```
from zenml import step
from zenml.integrations.gcp.flavors.vertex_step_operator_flavor import VertexStepOperatorSettings

@step(step_operator="vertex", settings={"step_operator.vertex": VertexStepOperatorSettings(
    accelerator_type  = "NVIDIA_TESLA_V100",
    accelerator_count = 1,
    machine_type = "n1-highmem-8",  
)})
def trainer(...) -> ...:
    """Train a model."""
    # This step will be executed in Vertex.
```

Let's walk through how to set up and run these pipelines:

### Setting Up Your Environment

1. Create and activate a Python virtual environment:

```
python3 -m venv .venv
source .venv/bin/activate
```

2. Install the required dependencies and ZenML integrations:

```
pip install -r requirements.txt
zenml integration install gcp
```

### Configuring Your Stack

To run this pipeline on GCP, you'll need to set up a remote stack with the following components:

<ul><li>A <a href="https://docs.zenml.io/stack-components/orchestrators/airflow">Cloud Composer orchestrator</a></li><li>A <a href="https://docs.zenml.io/stack-components/step-operators/vertex">Vertex AI</a> step operator</li><li>A <a href="https://docs.zenml.io/stack-components/artifact-stores/gcp">GCS artifact store</a></li><li>A <a href="https://docs.zenml.io/stack-components/container-registries/gcp">GCP container registry</a></li></ul>

This is very simple using the ZenML [GCP Stack Terraform module](https://registry.terraform.io/modules/zenml-io/zenml-stack/gcp/latest):

```
# After connecting to a deployed ZenML, get your API key with a service account
zenml service-account create <service-account-name>
```

```
module "zenml_stack" {
  source  = "zenml-io/zenml-stack/gcp"
  project_id = "your-gcp-project-id"
  region = "europe-west1"
  orchestrator = "airflow"
  zenml_server_url = "https://your-zenml-server-url.com"
  zenml_api_key = "ZENKEY_1234567890..."
}
output "zenml_stack_id" {
  value = module.zenml_stack.zenml_stack_id
}
output "zenml_stack_name" {
  value = module.zenml_stack.zenml_stack_name
}
```

To learn more about the terraform script, read the [ZenML documentation.](https://docs.zenml.io/how-to/stack-deployment/deploy-a-cloud-stack-with-terraform) or see the [Terraform registry](https://registry.terraform.io/modules/zenml-io/zenml-stack).

<aside>

💡 Looking for a different way to register or provision a stack? Check out the [in-browser stack deployment wizard](https://docs.zenml.io/how-to/stack-deployment/deploy-a-cloud-stack), or the [stack registration wizard](https://docs.zenml.io/how-to/stack-deployment/register-a-cloud-stack), for a shortcut on how to deploy & register a cloud stack.

</aside>

### Running the Pipelines

**Step 1: ETL Pipeline**

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/0d716166/66b23731b8a56f8388458653_66b23522f9d58e717e8b3049_pipes01-min.png" alt="A diagram showing the data extraction and transformation steps of an AI/ML pipeline. It includes components for extracting data, transforming it, and generating a transformed dataset." />
</figure>

This pipeline extracts raw ECB interest rate data, transforms it, and loads the cleaned data into a BigQuery dataset.

```
# Make sure you run on the stack with airflow orchestrator 
zenml stack set NAMEOFSTACK 

# Run in develop mode
python run.py --etl

# Run in production mode
python run.py --etl --mode production
```

**Step 2: Feature Engineering Pipeline**

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/a8b222aa/66b23731b8a56f838845864b_66b23575e30f52fbf88bfd93_pipes02-min.png" alt="A diagram depicting the data augmentation and model training phases of an AI/ML pipeline. It includes components for creating an augmented dataset, training an XGBoost model, and generating model metrics." />
</figure>

This pipeline takes the transformed dataset and augments it with additional features. Again the result is stored in a BigQuery dataset.

```
# Make sure you run on the stack with airflow orchestrator 
zenml stack set NAMEOFSTACK 

# Run with the latest transformed dataset
python run.py --feature --mode production

# Run with a specific transformed dataset version
python run.py --feature --transformed_dataset_version "200"
```

**Step 3: Model Training Pipeline**

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/9b650e09/66b23731b8a56f8388458647_66b235b48ac4f8603cee12bb_pipes03-min.png" alt="A diagram illustrating the model promotion and deployment steps of an AI/ML pipeline. It includes a component for the promoted model and shows that the pipeline runs on the Vertex platform." />
</figure>

This pipeline uses the augmented dataset to train an XGBoost regression model and potentially promote it with the [ZenML Model Control Plane. ](https://docs.zenml.io/how-to/use-the-model-control-plane)

```
# Make sure you run on the stack with airflow orchestrator and vertex step operator
zenml stack set NAMEOFSTACK 

# Run with the latest augmented dataset
python run.py --training --mode production

# Run with a specific augmented dataset version
python run.py --training --augmented_dataset_version "120"
```

By following these steps, you can see how ZenML orchestrates the entire workflow, seamlessly transitioning between Airflow for data processing (ETL and Feature Engineering) and Vertex AI for model training. This demonstrates ZenML's ability to bridge different tools and platforms, allowing you to leverage the strengths of both Airflow and Vertex AI in a single, cohesive ML pipeline.

After running the pipelines, you can explore the results in the ZenML UI, which provides a unified view of your entire workflow, regardless of whether steps were executed on Airflow or Vertex AI.

This example showcases how ZenML simplifies the process of building complex, multi-platform ML workflows, enabling data scientists and ML engineers to focus on their models and data rather than infrastructure management.

## Using Gradio to Demo the Model

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/9209b6e8/66b0f47d42b5b042b4604497_66b0f46d69066b833519d6ed_gradio.png" alt="ECB Main Refinancing Rate Prediction Tool - Users can input Deposit Facility and Marginal Lending Facility Rates to forecast the ECB&#039;s Main Refinancing Rate. Includes sliders to adjust input values and a output field to display the predicted rate." />
</figure>

After training and deploying our model using ZenML, we can create an interactive demo using Gradio. This allows stakeholders to easily interact with the model and understand its predictions without needing to dive into the code.

Here's how we set up the Gradio demo:

First, we import the necessary libraries and initialize the ZenML client:

```
import gradio as gr
import pandas as pd
import xgboost as xgb
from zenml.client import Client

client = Client()
```

We fetch the latest production model from ZenML:

```
zenml_model = client.get_model_version("ecb_interest_rate_model", "production")
model: xgb.Booster = zenml_model.get_artifact("xgb_model").load()
```

We define a prediction function that takes user inputs and returns the model's prediction:

```
def predict(deposit_rate, marginal_rate):
    augmented_rate = deposit_rate * 2
    rate_diff = marginal_rate - deposit_rate

    input_data = pd.DataFrame(
        {"augmented_rate": [augmented_rate], "rate_diff": [rate_diff]}
    )

    dmatrix = xgb.DMatrix(input_data)
    prediction = model.predict(dmatrix)[0]

    return f"Predicted Main Refinancing Rate: {prediction:.4f}"
```

Finally, we create and launch the Gradio interface:

```
iface = gr.Interface(
    fn=predict,
    inputs=[
        gr.Slider(minimum=0, maximum=10, step=0.01, label="Deposit Facility Rate"),
        gr.Slider(minimum=0, maximum=10, step=0.01, label="Marginal Lending Facility Rate"),
    ],
    outputs="text",
    title="ECB Main Refinancing Rate Predictor",
    description="Enter the Deposit Facility Rate and Marginal Lending Facility Rate to predict the Main Refinancing Rate.",
)

iface.launch()
```

This code creates a simple web interface where users can input the Deposit Facility Rate and Marginal Lending Facility Rate using sliders. When they submit their inputs, the model predicts the Main Refinancing Rate and displays the result.

By using Gradio in combination with ZenML, we've created a seamless pipeline from model training to interactive demo. This approach allows for rapid iteration and easy sharing of model results with non-technical stakeholders, showcasing the power of integrating MLOps practices with user-friendly visualization tools.

### Conclusion: Bridging Cloud Composer and Vertex AI with ZenML

This ECB interest rate prediction project serves as an excellent case study in comparing and leveraging both Google Cloud Composer (Airflow) and Vertex AI for machine learning workflows. Through ZenML, we've seamlessly integrated these powerful platforms, allowing us to explore their strengths in different stages of our ML pipeline:

<ol><li>Cloud Composer (Airflow) for ETL and Feature Engineering</li><li>Vertex AI for Model Training and Deployment</li></ol>

Key insights from our exploration:

<ol><li><strong>Flexibility in Orchestration:</strong> ZenML allowed us to easily switch between Airflow and Vertex AI, demonstrating how teams can choose the best tool for each part of their ML workflow.</li><li><strong>Airflow's Strengths:</strong> For teams already familiar with Airflow or those with complex data processing needs, Cloud Composer provides a robust, general-purpose orchestration solution that extends beyond ML workflows.</li><li><strong>Vertex AI's ML Focus:</strong> Vertex AI shines in ML-specific tasks, offering features like automated model training, easy deployment, and built-in MLOps practices, making it an excellent choice for teams focused primarily on machine learning.</li><li><strong>Seamless Integration:</strong> ZenML's abstraction layer allowed us to use both platforms within a single project, showcasing its ability to create cohesive, multi-platform ML pipelines.</li><li><strong>Ease of Comparison:</strong> By using ZenML, we could easily compare the performance and features of both platforms without significant code changes, enabling data scientists to make informed decisions about their infrastructure.</li></ol>

In summary, this essay demonstrates that the choice between Cloud Composer and Vertex AI isn't necessarily an either-or decision. ZenML empowers teams to use both, leveraging the strengths of each platform where they fit best:

<ul><li>If your team is already using Airflow and values its flexibility for diverse data workflows, Cloud Composer can be an excellent choice.</li><li>For ML teams looking for specialized features like streamlined model deployments and ML-specific optimizations, Vertex AI offers a more tailored solution.</li></ul>

The beauty of using ZenML is that it accommodates both scenarios, allowing teams to start with one platform and easily transition to or incorporate the other as needs evolve. This flexibility ensures that your ML infrastructure can adapt to changing requirements without necessitating a complete overhaul of your workflows.

Ultimately, whether you choose Cloud Composer, Vertex AI, or a combination of both, ZenML provides the glue that binds these powerful tools into a cohesive, efficient, and scalable ML pipeline. It empowers data scientists and ML engineers to focus on building great models while leveraging the best of what Google Cloud has to offer for machine learning operations.

## ❓FAQ

<ol><li><strong>What are the main differences between using Cloud Composer (Airflow) and Vertex AI in this ZenML project?</strong><ul><li><strong>Cloud Composer (Airflow):</strong> Used for ETL and feature engineering pipelines, leveraging its strength in data processing and workflow orchestration.</li><li><strong>Vertex AI:</strong> Utilized for model training and deployment, taking advantage of its ML-specific features and scalable infrastructure.</li></ul></li><li><strong>Can I use ZenML with both Cloud Composer and Vertex AI in the same project?</strong><ul><li><strong>Yes:</strong> This project demonstrates how ZenML can seamlessly integrate both platforms, allowing you to use Cloud Composer for data processing and Vertex AI for ML tasks within a single workflow.</li></ul></li><li><strong>Which platform should I choose for my ML project: Cloud Composer or Vertex AI?</strong><ul><li>If you're already familiar with Airflow or have complex data processing needs, Cloud Composer might be a better fit.</li><li>For teams focused primarily on ML tasks and looking for specialized features like automated model training and easy deployment, Vertex AI is recommended.</li><li>ZenML allows you to use both, so you can choose based on your specific requirements for each part of your pipeline.</li></ul></li><li><strong>How does ZenML simplify the use of Cloud Composer and Vertex AI?</strong><ul><li>ZenML provides a unified interface for defining pipelines that can run on either platform.</li><li>It handles the complexities of infrastructure setup and configuration, allowing you to focus on your ML workflow.</li><li>ZenML's abstraction layer enables easy switching between platforms without significant code changes.</li></ul></li><li><strong>Is it possible to start with one platform and switch to the other later using ZenML?</strong><ul><li><strong>Yes:</strong> ZenML's modular design allows you to start with one platform and easily transition to or incorporate the other as your needs evolve, without overhauling your entire workflow.</li></ul></li><li><strong>How does the Gradio demo fit into the ZenML workflow with Cloud Composer and Vertex AI?</strong><ul><li>The Gradio demo showcases how ZenML can integrate the entire ML lifecycle, from data processing (Cloud Composer) and model training (Vertex AI) to creating an interactive demo for stakeholders.</li></ul></li><li><strong>What are the key benefits of using ZenML in this ECB interest rate prediction project?</strong><ul><li>Unified workflow across different GCP services</li><li>Flexibility to use both Cloud Composer and Vertex AI</li><li>Easy transition between development and production environments</li><li>Streamlined MLOps practices like versioning and reproducibility</li></ul></li><li><strong>Can this project setup be adapted for other financial modeling tasks?</strong><ul><li><strong>Yes:</strong> The pipeline structure and integration of Cloud Composer and Vertex AI through ZenML can be adapted for various financial modeling and prediction tasks, showcasing the versatility of this setup.</li></ul></li></ol>