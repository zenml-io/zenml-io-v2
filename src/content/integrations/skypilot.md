---
title: "Skypilot VM"
slug: "skypilot"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8aca0fa0662d14749eb"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-15T10:56:49.957Z"
  createdOn: "2023-10-12T09:13:16.620Z"
integrationType: "orchestrator"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/3b75b2be/66d867dd11cc5bf2b439aa93_skypilot.png"
shortDescription: "Streamline ML Workloads on any cloud with SkyPilot VM Orchestration in ZenML"
docsUrl: "https://docs.zenml.io/stack-components/orchestrators/skypilot-vm"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/951e5aa7/66e72e9ccfe54a76d81185e3_image__7_.png"
relatedBlogPosts:
  - "supercharge-open-source-ml-workflows-with-zenml-and-skypilot"
  - "new-features-improved-sagemaker-orchestration-new-dag-visualizer-skypilot-with-kubernetes-and-more"
seo:
  title: "Integrate Skypilot VM with ZenML - Orchestrator Integrations"
  description: "Streamline ML Workloads on any cloud with SkyPilot VM Orchestration in ZenML"
  canonical: "https://www.zenml.io/integrations/skypilot"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/951e5aa7/66e72e9ccfe54a76d81185e3_image__7_.png"
  ogTitle: "Integrate Skypilot VM with ZenML - Orchestrator Integrations"
  ogDescription: "Streamline ML Workloads on any cloud with SkyPilot VM Orchestration in ZenML"
overviewTitle: "Streamline ML Workloads on any cloud with SkyPilot VM Orchestration in ZenML"
overviewDescription: "Simplify the process of running machine learning pipelines on the cloud by integrating SkyPilot VM orchestration with ZenML. This integration empowers you to provision and manage virtual machines (VMs) on AWS, GCP, Azure, or Lambda Labs, offering cost savings, high GPU availability, and managed execution for your ML workloads."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\">Seamless provisioning and scaling of VMs for ZenML pipelines</li><li id=\"\">Automatic selection of cost-optimized VM/zone/region/cloud configurations</li><li id=\"\">Fine-grained resource allocation for each pipeline step</li><li id=\"\">Autostop feature to clean up idle clusters and prevent unnecessary costs</li><li id=\"\">Compatibility with ZenML's Dashboard for pipeline and artifact monitoring</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Support for AWS, GCP, Azure, and Lambda Labs cloud platforms</li><li id=\"\">Automatic provisioning of spot and on-demand VMs</li><li id=\"\">Built-in cost optimization for selecting VM/zone/region/cloud</li><li id=\"\">Configurable VM types and resources for each workload</li><li id=\"\">Autostop functionality to terminate idle clusters</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-bash\">\n # Install the necessary requirements locally\n # For AWS\n  pip install \"zenml[connectors-aws]\"\n  zenml integration install aws skypilot_aws \n\n  # for GCP\n  pip install \"zenml[connectors-gcp]\"\n  zenml integration install gcp skypilot_gcp # for GCP\n\n  # for Azure\n  pip install \"zenml[connectors-azure]\"\n  zenml integration install azure skypilot_azure # for Azure\n  \n  # for Azure\n  pip install \"zenml[connectors-azure]\"\n  zenml integration install skypilot_lambda # for Lambda Labs\n  </code></pre></div><div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\n# easily configure your runtime\nskypilot_settings = {\n    cpus=\"2\",\n    memory=\"16\",\n    accelerators=\"V100:2\",\n    ...\n}\n\n\n@pipeline(\n    settings={\n        \"orchestrator.vm_aws\": skypilot_settings,\n        # \"orchestrator.vm_gcp\": skypilot_settings,\n        # \"orchestrator.vm_azure\": skypilot_settings,\n        # \"orchestrator.vm_lambda\": skypilot_settings\n    }\n)\n</code></pre></div>"
documentationLinkText: "SkyPilot VM Orchestrator Documentation"
additionalResources:
  - label: "SkyPilot blog"
    href: "https://www.zenml.io/blog/supercharge-open-source-ml-workflows-with-zenml-and-skypilot"
isUpdatedToNewFormat: true
---

<ul><li>Seamless provisioning and scaling of VMs for ZenML pipelines</li><li>Automatic selection of cost-optimized VM/zone/region/cloud configurations</li><li>Fine-grained resource allocation for each pipeline step</li><li>Autostop feature to clean up idle clusters and prevent unnecessary costs</li><li>Compatibility with ZenML's Dashboard for pipeline and artifact monitoring</li></ul>

<ul><li>Support for AWS, GCP, Azure, and Lambda Labs cloud platforms</li><li>Automatic provisioning of spot and on-demand VMs</li><li>Built-in cost optimization for selecting VM/zone/region/cloud</li><li>Configurable VM types and resources for each workload</li><li>Autostop functionality to terminate idle clusters</li></ul>

```bash
# Install the necessary requirements locally
 # For AWS
  pip install "zenml[connectors-aws]"
  zenml integration install aws skypilot_aws 

  # for GCP
  pip install "zenml[connectors-gcp]"
  zenml integration install gcp skypilot_gcp # for GCP

  # for Azure
  pip install "zenml[connectors-azure]"
  zenml integration install azure skypilot_azure # for Azure
  
  # for Azure
  pip install "zenml[connectors-azure]"
  zenml integration install skypilot_lambda # for Lambda Labs
  
```

```python
# easily configure your runtime
skypilot_settings = {
    cpus="2",
    memory="16",
    accelerators="V100:2",
    ...
}

@pipeline(
    settings={
        "orchestrator.vm_aws": skypilot_settings,
        # "orchestrator.vm_gcp": skypilot_settings,
        # "orchestrator.vm_azure": skypilot_settings,
        # "orchestrator.vm_lambda": skypilot_settings
    }
)
```
This code snippet demonstrates how to configure the SkyPilot VM orchestrator for a ZenML pipeline. The Skypilot settings allows you to specify the desired resources (CPUs, memory, accelerators) and other parameters like spot instances, region, disk size, and auto-stop behavior. These settings can be applied at the pipeline level or individual step level for fine-grained resource allocation.