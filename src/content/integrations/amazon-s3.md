---
title: "Amazon S3"
slug: "amazon-s3"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66d821e851f4e338a0c2ab69"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-04T09:51:27.516Z"
  lastUpdated: "2024-10-04T09:51:27.516Z"
  createdOn: "2024-09-04T09:01:28.361Z"
integrationType: "artifact-store"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/b0286146/66d8216682bc260f3dcaa1b5_s3.png"
shortDescription: "Unleash Scalable Cloud Storage with Amazon S3 and ZenML"
docsUrl: "https://docs.zenml.io/stack-components/artifact-stores/s3"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/7f866e74/66d8559e03e69633d4b08b83_s3_integration__1_.png"
relatedBlogPosts:
  - "easy-mlops-pipelines-2-stack-wizard"
  - "easy-mlops-pipelines"
  - "aws-mlops-made-easy"
  - "how-to-train-and-deploy-a-machine-learning-model-on-aws-sagemaker-with-zenml-and-bentoml"
seo:
  title: "Integrate Amazon S3 with ZenML - Artifact Store Integrations"
  description: "Unleash Scalable Cloud Storage with Amazon S3 and ZenML"
  canonical: "https://www.zenml.io/integrations/amazon-s3"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/7f866e74/66d8559e03e69633d4b08b83_s3_integration__1_.png"
  ogTitle: "Integrate Amazon S3 with ZenML - Artifact Store Integrations"
  ogDescription: "Unleash Scalable Cloud Storage with Amazon S3 and ZenML"
overviewTitle: "Unleash Scalable Cloud Storage with Amazon S3 and ZenML"
overviewDescription: "Elevate your MLOps game by integrating Amazon S3 with ZenML for efficient and reliable artifact storage. This powerful combination allows you to store and manage your pipeline artifacts in the cloud, ensuring scalability, high availability, and seamless collaboration for your machine learning projects."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Scalable and Reliable Artifact Storage<br>‍</strong>Store your pipeline artifacts in the cloud with Amazon S3, ensuring scalability and high availability for your ML workflows.</li><li id=\"\"><strong id=\"\">Seamless Integration<br>‍</strong>Easily register and use an S3 Artifact Store in your ZenML stacks with just a few commands.</li><li id=\"\"><strong id=\"\">Secure Access Control<br>‍</strong>Leverage S3's built-in security features and ZenML's authentication methods to control access to your artifacts.</li><li id=\"\"><strong id=\"\">Collaboration Made Easy<br>‍</strong>Share pipeline artifacts with team members and stakeholders by using an S3 cloud-based storage solution.</li></ul>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Secure and durable object storage</li><li id=\"\">Scalable storage capacity</li><li id=\"\">High availability and data redundancy</li><li id=\"\">Flexible access control and authentication</li><li id=\"\">Integration with various AWS services</li></ul>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-bash\">\n# Step 1: Install the AWS integration\n>>> zenml integration install s3\n\n# Step 2: Register the S3 artifact store\n>>> zenml artifact-store register s3_store -f s3 --path=\"s3://your-bucket-name\"\n\n# Step 3: [Optional] Connect the S3 artifact store to a Service Connector\n>>> zenml artifact-store connect s3_store -i\n\n# Step 4: Update your stack to use the S3 artifact store\n>>> zenml stack update -a s3_store\n\n# Step 5: Run the pipeline using the S3 artifact store\n>>> python3 my_pipeline.py\n\nInitiating a new run for the pipeline: my_pipeline.\nExecuting a new run.\nUsing user: user1\nUsing stack: remote_stack\n  orchestrator: default\n  artifact_store: s3_store\nYou can visualize your pipeline runs in the ZenML Dashboard. In order to try it locally, please run zenml up.\nStep my_step has started.\nStep my_step has finished in 0.078s.\nStep my_step completed successfully.\nPipeline run has finished in 0.112s.\n\nThe artifact value you saved in the `my_pipeline` run is:\n{'key': 'value', 'message': 'Hello from S3!'}\n</code></pre></div><div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\nfrom typing_extensions import Annotated\n\nfrom zenml import pipeline, step\nfrom zenml.client import Client\n\n\n@step\ndef my_step(input_dict: dict) -> Annotated[dict, \"dict_from_s3\"]:\n    output_dict = input_dict.copy()\n    output_dict[\"message\"] = \"Hello from S3!\"\n    return output_dict\n\n\n@pipeline\ndef my_pipeline(input_dict: dict):\n    my_step(input_dict)\n\n\nif __name__ == \"__main__\":\n    input_data = {\"key\": \"value\"}\n    my_pipeline(input_data)\n\n    print(\n        \"The artifact value you saved in the `my_pipeline` run is:\\n\"\n        + str(Client().get_artifact_version(name_id_or_prefix=\"dict_from_s3\").load())\n    )</code></pre></div><p>my_pipeline.py</p>"
documentationLinkText: "Full ZenML integration documentation"
isUpdatedToNewFormat: true
---

<ul><li><strong>Scalable and Reliable Artifact Storage<br /></strong>Store your pipeline artifacts in the cloud with Amazon S3, ensuring scalability and high availability for your ML workflows.</li><li><strong>Seamless Integration<br /></strong>Easily register and use an S3 Artifact Store in your ZenML stacks with just a few commands.</li><li><strong>Secure Access Control<br /></strong>Leverage S3's built-in security features and ZenML's authentication methods to control access to your artifacts.</li><li><strong>Collaboration Made Easy<br /></strong>Share pipeline artifacts with team members and stakeholders by using an S3 cloud-based storage solution.</li></ul><ul><li>Secure and durable object storage</li><li>Scalable storage capacity</li><li>High availability and data redundancy</li><li>Flexible access control and authentication</li><li>Integration with various AWS services</li></ul>
```bash
# Step 1: Install the AWS integration
>>> zenml integration install s3

# Step 2: Register the S3 artifact store
>>> zenml artifact-store register s3_store -f s3 --path="s3://your-bucket-name"

# Step 3: [Optional] Connect the S3 artifact store to a Service Connector
>>> zenml artifact-store connect s3_store -i

# Step 4: Update your stack to use the S3 artifact store
>>> zenml stack update -a s3_store

# Step 5: Run the pipeline using the S3 artifact store
>>> python3 my_pipeline.py

Initiating a new run for the pipeline: my_pipeline.
Executing a new run.
Using user: user1
Using stack: remote_stack
  orchestrator: default
  artifact_store: s3_store
You can visualize your pipeline runs in the ZenML Dashboard. In order to try it locally, please run zenml up.
Step my_step has started.
Step my_step has finished in 0.078s.
Step my_step completed successfully.
Pipeline run has finished in 0.112s.

The artifact value you saved in the `my_pipeline` run is:
{'key': 'value', 'message': 'Hello from S3!'}
```

```python
from typing_extensions import Annotated

from zenml import pipeline, step
from zenml.client import Client

@step
def my_step(input_dict: dict) -> Annotated[dict, "dict_from_s3"]:
    output_dict = input_dict.copy()
    output_dict["message"] = "Hello from S3!"
    return output_dict

@pipeline
def my_pipeline(input_dict: dict):
    my_step(input_dict)

if __name__ == "__main__":
    input_data = {"key": "value"}
    my_pipeline(input_data)

    print(
        "The artifact value you saved in the `my_pipeline` run is:\n"
        + str(Client().get_artifact_version(name_id_or_prefix="dict_from_s3").load())
    )
```

my_pipeline.pyThis code example demonstrates how to set up and use an S3 Artifact Store (optionally connected with a Service Connector) in a ZenML pipeline. After installing the S3 integration and registering the S3 store, you can update your stack to use it. The my_step function showcases how data is processed and stored in the artifact store, while the my_pipeline function orchestrates the pipeline execution.