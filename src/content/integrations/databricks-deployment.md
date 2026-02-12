---
title: "Databricks Deployment"
slug: "databricks-deployment"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66963ce16bb2afe770079bcb"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-07-09T10:09:30.603Z"
  lastUpdated: "2025-07-09T10:08:41.247Z"
  createdOn: "2024-07-16T09:26:57.975Z"
integrationType: "deployer"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/5439fa99/6696392a47017a8a18c7fb7e_Databricks_logo.png"
shortDescription: "Deploy Scalable, Production-Ready ML Models with Databricks and ZenML"
docsUrl: "https://docs.zenml.io/stack-components/model-deployers/databricks"
githubUrl: "https://github.com/zenml-io/zenml-projects/tree/main/databricks-demo"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/d9e77d21/66ed57bf279f14e4aaeb39b2_image__28_.png"
relatedBlogPosts:
  - "using-zenml-databricks-to-supercharge-llm-development"
seo:
  title: "Integrate Databricks Deployment with ZenML - Deployer Integrations"
  description: "Deploy Scalable, Production-Ready ML Models with Databricks and ZenML"
  canonical: "https://www.zenml.io/integrations/databricks-deployment"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/d9e77d21/66ed57bf279f14e4aaeb39b2_image__28_.png"
  ogTitle: "Integrate Databricks Deployment with ZenML - Deployer Integrations"
  ogDescription: "Deploy Scalable, Production-Ready ML Models with Databricks and ZenML"
---

<ul><li>Seamless model deployment to Databricks Inference Endpoints directly from ZenML pipelines</li><li>Switch between MLflow and Databricks Model Deployers without changing pipeline code</li><li>Secure model deployment into VPC-accessible endpoints for enterprise security</li><li>Scale model serving with dedicated, autoscaling infrastructure managed by Databricks</li><li>Turn models into production-ready APIs with minimal infrastructure or MLOps overhead</li></ul>

<ul><li>Unified interface to deploy, govern, and query models</li><li>Dedicated and autoscaling infrastructure for model serving</li><li>Secure model deployment into VPC-accessible endpoints</li><li>Support for a variety of workload sizes and types (CPU, GPU)</li><li>Integration with Databricks Model Registry for model versioning and management</li></ul>

```python
from zenml.integrations.databricks.steps.databricks_deployer import databricks_model_deployer_step

@step(enable_cache=False)
def deployment_deploy() -> (
    Annotated[
        Optional[DatabricksDeploymentService],
        ArtifactConfig(
            name="databricks_deployment", is_deployment_artifact=True
        ),
    ]
):
    # deploy predictor service
    zenml_client = Client()
    model_deployer = zenml_client.active_stack.model_deployer
    databricks_deployment_config = DatabricksDeploymentConfig(
        model_name=model.name,
        model_version=model.run_metadata["model_registry_version"].value,
        workload_size="Small",
        workload_type="CPU",
        scale_to_zero_enabled=True,
        endpoint_secret_name="databricks_token",
    )
    deployment_service = model_deployer.deploy_model(
        config=databricks_deployment_config,
        service_type=DatabricksDeploymentService.SERVICE_TYPE,
        timeout=1200,
    )
    logger.info(
        f"The deployed service info: {model_deployer.get_model_server_info(deployment_service)}"
    )
    return deployment_service

@pipeline(on_failure=notify_on_failure)
def databricks_deploy_pipeline():
    deployment_deploy()
    notify_on_success(after=["deployment_deploy"])

databricks_deploy_pipeline().run()
```
This code example demonstrates deploying a trained model to Databricks Inference Endpoints using ZenML. The train_model step trains and saves the model. The databricks_model_deployer_step is used within the pipeline to deploy the saved model, specifying the model name, version, and workload size. Finally, the pipeline is run with the desired model name and version.