---
title: "Apache Airflow"
slug: "airflow"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8a933e758809377b317"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-15T11:20:00.670Z"
  createdOn: "2023-10-12T09:13:13.882Z"
integrationType: "orchestrator"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/f107978e/66d868dfc7c1543ce4559c9d_airflow.png"
shortDescription: "Streamline ML Workflows with Apache Airflow Orchestration in ZenML"
docsUrl: "https://docs.zenml.io/stack-components/orchestrators/airflow"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/e2fd248b/66c45405628f556f8d92e7aa_Image_from_Notion__2_.png"
seo:
  title: "Integrate Apache Airflow with ZenML - Orchestrator Integrations"
  description: "Streamline ML Workflows with Apache Airflow Orchestration in ZenML"
  canonical: "https://www.zenml.io/integrations/airflow"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/e2fd248b/66c45405628f556f8d92e7aa_Image_from_Notion__2_.png"
  ogTitle: "Integrate Apache Airflow with ZenML - Orchestrator Integrations"
  ogDescription: "Streamline ML Workflows with Apache Airflow Orchestration in ZenML"
---

<ul><li>Native execution of ZenML pipelines as Airflow DAGs</li><li>Simplified management of complex ML workflows</li><li>Enhanced efficiency and scalability for MLOps pipelines</li><li>Compatibility with both local and remote Airflow deployments</li></ul>

<ul><li>Robust workflow orchestration for data pipelines</li><li>Extensive library of pre-built operators and sensors</li><li>Intuitive web-based user interface for monitoring and managing workflows</li><li>Scalable architecture for running workflows on distributed systems</li><li>Strong focus on extensibility, allowing custom plugins and operators</li></ul>

```python
from zenml import step, pipeline
from zenml.integrations.airflow.flavors.airflow_orchestrator_flavor import AirflowOrchestratorSettings

@step
def my_step():
    print("Running in Airflow!")

airflow_settings = AirflowOrchestratorSettings(
    operator="airflow.providers.docker.operators.docker.DockerOperator",
    operator_args={}
)

@pipeline(settings={"orchestrator.airflow": airflow_settings})
def my_airflow_pipeline():
    my_step()

if __name__ == "__main__":
    my_airflow_pipeline()]
```
This code snippet demonstrates how to configure a ZenML pipeline to run on Apache Airflow. The AirflowOrchestratorSettings allow specifying the Airflow operator (in this case, the DockerOperator) and any additional arguments. Each step of the pipeline will run in a separate Docker container orchestrated by Airflow