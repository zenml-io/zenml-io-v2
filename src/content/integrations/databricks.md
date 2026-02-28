---
title: "Databricks"
slug: "databricks"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6696381da0239dc526233175"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-09-23T10:17:28.536Z"
  lastUpdated: "2024-09-23T10:17:28.536Z"
  createdOn: "2024-07-16T09:06:37.633Z"
integrationType: "orchestrator"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/5439fa99/6696392a47017a8a18c7fb7e_Databricks_logo.png"
shortDescription: "Harness the Power of Databricks for Scalable ML Pipelines with ZenML"
docsUrl: "https://docs.zenml.io/stack-components/orchestrators/databricks"
githubUrl: "https://github.com/zenml-io/zenml-projects/tree/main/databricks-demo"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/5fc719b5/66ed5712f4a21172a9e148d4_image__27_.png"
relatedBlogPosts:
  - "using-zenml-databricks-to-supercharge-llm-development"
seo:
  title: "Integrate Databricks with ZenML - Orchestrator Integrations"
  description: "Harness the Power of Databricks for Scalable ML Pipelines with ZenML"
  canonical: "https://www.zenml.io/integrations/databricks"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/5fc719b5/66ed5712f4a21172a9e148d4_image__27_.png"
  ogTitle: "Integrate Databricks with ZenML - Orchestrator Integrations"
  ogDescription: "Harness the Power of Databricks for Scalable ML Pipelines with ZenML"
overviewTitle: "Harness the Power of Databricks for Scalable ML Pipelines with ZenML"
overviewDescription: "Seamlessly integrate ZenML with Databricks to leverage its distributed computing capabilities for efficient and scalable machine learning workflows. This integration enables data scientists and engineers to run their ZenML pipelines on Databricks, taking advantage of its optimized environment for big data processing and ML workloads."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\">Effortlessly orchestrate ZenML pipelines on Databricks infrastructure</li><li id=\"\">Leverage Databricks' distributed computing power for large-scale ML tasks</li><li id=\"\">Seamlessly integrate with other Databricks services and tools</li><li id=\"\">Monitor and manage pipeline runs through the Databricks UI</li><li id=\"\">Schedule pipelines using Databricks' native scheduling capabilities</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Optimized for big data processing and machine learning workloads</li><li id=\"\">Collaborative environment for data scientists, engineers, and analysts</li><li id=\"\">Scalable and high-performance distributed computing</li><li id=\"\">Integrated with popular data and ML frameworks (e.g., Spark, TensorFlow, PyTorch)</li><li id=\"\">Comprehensive security and governance features</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\nfrom zenml.integrations.databricks.flavors.databricks_orchestrator_flavor import DatabricksOrchestratorSettings\n\ndatabricks_settings = DatabricksOrchestratorSettings(\n    spark_version=\"15.3.x-scala2.12\",\n    num_workers=\"3\",\n    node_type_id=\"Standard_D4s_v5\",\n    policy_id=POLICY_ID,\n    autoscale=(2, 3),\n)\n\n@pipeline(\n    settings={\n        \"orchestrator.databricks\": databricks_settings,\n    }\n)\ndef my_pipeline():\n    load_data()\n    preprocess_data()\n    train_model()\n    evaluate_model()\n\nmy_pipeline().run()\n</code></pre></div>"
documentationLinkText: "ZenML Databricks Orchestrator Documentation"
githubLinkText: "GitHub: ZenML Databricks Integration Example"
compareSlug: "zenml-vs-databricks"
isUpdatedToNewFormat: true
---

<ul><li>Effortlessly orchestrate ZenML pipelines on Databricks infrastructure</li><li>Leverage Databricks' distributed computing power for large-scale ML tasks</li><li>Seamlessly integrate with other Databricks services and tools</li><li>Monitor and manage pipeline runs through the Databricks UI</li><li>Schedule pipelines using Databricks' native scheduling capabilities</li></ul>

<ul><li>Optimized for big data processing and machine learning workloads</li><li>Collaborative environment for data scientists, engineers, and analysts</li><li>Scalable and high-performance distributed computing</li><li>Integrated with popular data and ML frameworks (e.g., Spark, TensorFlow, PyTorch)</li><li>Comprehensive security and governance features</li></ul>

```python
from zenml.integrations.databricks.flavors.databricks_orchestrator_flavor import DatabricksOrchestratorSettings

databricks_settings = DatabricksOrchestratorSettings(
    spark_version="15.3.x-scala2.12",
    num_workers="3",
    node_type_id="Standard_D4s_v5",
    policy_id=POLICY_ID,
    autoscale=(2, 3),
)

@pipeline(
    settings={
        "orchestrator.databricks": databricks_settings,
    }
)
def my_pipeline():
    load_data()
    preprocess_data()
    train_model()
    evaluate_model()

my_pipeline().run()
```
This code example demonstrates how to configure the Databricks orchestrator settings in ZenML. The DatabricksOrchestratorSettings object is used to specify the Spark version, number of workers, node type, autoscaling settings, and other configuration options. These settings are then passed to the @pipeline decorator using the settings parameter. Finally, the pipeline is defined with its steps and executed using my_pipeline().run().