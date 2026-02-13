---
title: "Sagemaker Pipelines"
slug: "sagemaker-pipelines"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66e14007d67f99ae597b5383"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-11-06T08:43:36.513Z"
  lastUpdated: "2024-11-06T08:43:36.513Z"
  createdOn: "2024-09-11T07:00:23.495Z"
integrationType: "orchestrator"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/3ed92cba/672b2b8734919e10dda03f5f_sagemaker_pipelines.png"
shortDescription: "Orchestrate production ZenML pipelines with Amazon SageMaker"
docsUrl: "https://docs.zenml.io/stack-components/orchestrators/sagemaker"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/9dfdb43d/66e13e0735069705b5b930d6_image__5_.png"
seo:
  title: "Integrate Sagemaker Pipelines with ZenML - Orchestrator Integrations"
  description: "Orchestrate production ZenML pipelines with Amazon SageMaker"
  canonical: "https://www.zenml.io/integrations/sagemaker-pipelines"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/9dfdb43d/66e13e0735069705b5b930d6_image__5_.png"
  ogTitle: "Integrate Sagemaker Pipelines with ZenML - Orchestrator Integrations"
  ogDescription: "Orchestrate production ZenML pipelines with Amazon SageMaker"
overviewTitle: "Orchestrate production ZenML pipelines with Amazon SageMaker"
overviewDescription: "Streamline your machine learning workflows by running ZenML pipelines as Amazon SageMaker Pipelines, a serverless ML orchestrator from AWS. This integration enables you to leverage SageMaker's scalability, robustness, and built-in features to manage your ML pipelines efficiently in production environments."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\">Seamlessly execute ZenML pipelines as SageMaker Pipelines</li><li id=\"\">Effortlessly scale pipeline execution with SageMaker's serverless infrastructure</li><li id=\"\">Monitor and track pipeline runs using SageMaker's UI</li><li id=\"\">Customize instance types and resources for the entire pipeline</li><li id=\"\">Seamlessly leverage other Stack Components (S3, ECR, etc.)</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Serverless and scalable orchestration of ML workflows</li><li id=\"\">Built-in data processing and model training capabilities</li><li id=\"\">Visual interface for monitoring and observing the pipelines</li><li id=\"\">Integration with other AWS services for end-to-end ML solutions</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-bash\">\n# Step 1: Register a new Sagemaker orchestrator\n>>> zenml orchestrator register &lt;ORCHESTRATOR_NAME> \\\n    --flavor=sagemaker \\\n    --execution_role=&lt;YOUR_IAM_ROLE_ARN>\n    \n# Step 2: Authernticate Sagemaker orchestrator\n# Option 1 (recomended): Service Connector\n>>> zenml orchestrator connect &lt;ORCHESTRATOR_NAME> --connector &lt;CONNECTOR_NAME>\n\n# Option 2 (not recommended): Explicit authentication\n>>> zenml orchestrator register &lt;ORCHESTRATOR_NAME> \\\n    --flavor=sagemaker \\\n    --execution_role=&lt;YOUR_IAM_ROLE_ARN> \\ \n    --aws_access_key_id=...\n    --aws_secret_access_key=...\n    --region=...\n\n# Option 3 (strictly not recommended): Implicit authentication\n# Nothing needed, auth settings will be used from the running\n# environment implicitely\n\n# Step 3: Update your stack to use the Sagemaker orchestrator\n>>> zenml stack update -o &lt;ORCHESTRATOR_NAME>\n</code></pre></div><div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\nfrom zenml import step, pipeline\nfrom zenml.integrations.aws.flavors.sagemaker_orchestrator_flavor import (\n    SagemakerOrchestratorSettings,\n)\n\n\n@step\ndef preprocess_data() -> int:\n    return 1\n\n\n@step\ndef train_model(data: int) -> str:\n    return str(data)\n\n\n@pipeline(\n    settings={\n        \"orchestrator.sagemaker\": SagemakerOrchestratorSettings(\n            instance_type=\"ml.m5.large\",\n            volume_size_in_gb=30,\n        ),\n    }\n)\ndef ml_pipeline():\n    input_data = preprocess_data()\n    train_model(input_data)\n\n\nif __name__ == \"__main__\":\n    ml_pipeline()\n    </code></pre></div>"
documentationLinkText: "Read the full SageMaker Pipelines integration documentation"
additionalResources:
  - label: "Learn more about Amazon SageMaker Pipelines"
    href: "https://aws.amazon.com/sagemaker/pipelines/"
isUpdatedToNewFormat: true
---

<ul><li>Seamlessly execute ZenML pipelines as SageMaker Pipelines</li><li>Effortlessly scale pipeline execution with SageMaker's serverless infrastructure</li><li>Monitor and track pipeline runs using SageMaker's UI</li><li>Customize instance types and resources for the entire pipeline</li><li>Seamlessly leverage other Stack Components (S3, ECR, etc.)</li></ul>

<ul><li>Serverless and scalable orchestration of ML workflows</li><li>Built-in data processing and model training capabilities</li><li>Visual interface for monitoring and observing the pipelines</li><li>Integration with other AWS services for end-to-end ML solutions</li></ul>

```bash
# Step 1: Register a new Sagemaker orchestrator
>>> zenml orchestrator register <ORCHESTRATOR_NAME> \
    --flavor=sagemaker \
    --execution_role=<YOUR_IAM_ROLE_ARN>
    
# Step 2: Authernticate Sagemaker orchestrator
# Option 1 (recomended): Service Connector
>>> zenml orchestrator connect <ORCHESTRATOR_NAME> --connector <CONNECTOR_NAME>

# Option 2 (not recommended): Explicit authentication
>>> zenml orchestrator register <ORCHESTRATOR_NAME> \
    --flavor=sagemaker \
    --execution_role=<YOUR_IAM_ROLE_ARN> \ 
    --aws_access_key_id=...
    --aws_secret_access_key=...
    --region=...

# Option 3 (strictly not recommended): Implicit authentication
# Nothing needed, auth settings will be used from the running
# environment implicitely

# Step 3: Update your stack to use the Sagemaker orchestrator
>>> zenml stack update -o <ORCHESTRATOR_NAME>
```

```python
from zenml import step, pipeline
from zenml.integrations.aws.flavors.sagemaker_orchestrator_flavor import (
    SagemakerOrchestratorSettings,
)

@step
def preprocess_data() -> int:
    return 1

@step
def train_model(data: int) -> str:
    return str(data)

@pipeline(
    settings={
        "orchestrator.sagemaker": SagemakerOrchestratorSettings(
            instance_type="ml.m5.large",
            volume_size_in_gb=30,
        ),
    }
)
def ml_pipeline():
    input_data = preprocess_data()
    train_model(input_data)

if __name__ == "__main__":
    ml_pipeline()
    
```
This code snippet demonstrates how to configure ZenML steps to run on SageMaker Pipelines orchestrator. It showcases customizing instance types and resources for individual steps, as well as utilizing data stored in Amazon S3 for input and output. The preprocess_data step runs on a CPU-based instance, while the train_model step uses a GPU-enabled instance and accesses data from S3.