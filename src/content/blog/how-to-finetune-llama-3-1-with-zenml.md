---
title: "How to Finetune Llama 3.1 with ZenML"
slug: "how-to-finetune-llama-3-1-with-zenml"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66a204bf1af9acf2f722c555"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-03T15:19:04.226Z"
  lastUpdated: "2026-02-03T10:53:46.146Z"
  createdOn: "2024-07-25T07:54:39.363Z"
author: "alex-strick-van-linschoten"
category: "llms"
tags:
  - "applied-zenml"
  - "foundationmodels"
  - "llm"
  - "model-control-plane"
  - "nlp"
  - "open-source"
  - "zenml"
  - "gcp"
date: "2024-07-24T00:00:00.000Z"
readingTime: 8 mins
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/8c7c40c4/6981d352ce4b26d085d7040b_6981d2b442a9002981dd6ace_cover-blog.avif"
seo:
  title: "How to Finetune Llama 3.1 with ZenML - ZenML Blog"
  description: "Master cloud-based LLM finetuning: Set up infrastructure, run pipelines, and manage experiments with ZenML's Model Control Plane for Meta's latest Llama model."
  canonical: "https://www.zenml.io/blog/how-to-finetune-llama-3-1-with-zenml"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/8c7c40c4/6981d352ce4b26d085d7040b_6981d2b442a9002981dd6ace_cover-blog.avif"
  ogTitle: "How to Finetune Llama 3.1 with ZenML - ZenML Blog"
  ogDescription: "Master cloud-based LLM finetuning: Set up infrastructure, run pipelines, and manage experiments with ZenML's Model Control Plane for Meta's latest Llama model."
---

Meta released their [Llama 3.1 series of models](https://huggingface.co/collections/meta-llama/llama-31-669fc079a0c406a149a5738f) yesterday. This included some mammoth versions (including the GPT-4-beating [450B-parameter monster](https://huggingface.co/meta-llama/Meta-Llama-3.1-405B)) as well as the more [user-friendly 8B parameter version](https://huggingface.co/meta-llama/Meta-Llama-3.1-8B) that we’ll be working with. The 8B base model is an ideal size for a business use case where you need a capable but not too unwieldy model. If we look at the evaluations from [the technical materials for the 8B model](https://ai.meta.com/blog/meta-llama-3-1/) we can see that the new model are at least performing in the same arena, if not beating some of the capable competitors outright:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/136e4ae2/66c48ff68be405c41881449d_66a207658c70dc07dd8d8d6d_Llama_203.1_20Finetune.png" alt="Chart from the Llama 3.1 launch showing its performance alongside Gemma 9B and Mistral 7B." />
</figure>

There are lots of places where it might make sense to finetune your own open-source or open-weights model:

<ul><li>you might have a need for structured data extraction</li><li>you might want to include custom tool use as part of your LLM implementation and just using an instruct-tuned model isn’t giving the results you’re hoping for</li><li>you want to break the dependency on OpenAI’s closed-source proprietary models</li><li>you have sensitive customer data that you are legally or ethically bound to protect</li></ul>

For all these reasons and more, you might want to give finetuning the new Llama 3.1 model a go. This tutorial will guide you through the process of getting set up with both ZenML and running a finetuning pipeline on cloud infrastructure. Specifically we will:

<ul><li>🚜 load and preprocess a dataset for finetuning</li><li>👁️ evaluate the model using … as a base model to get a baseline</li><li>🚀 finetune the model</li><li>👀 evaluate it after finetuning to see how it improved</li><li>✅ if it meets our criteria it’ll be promoted to <code>Staging</code> in the <a href="https://docs.zenml.io/how-to/use-the-model-control-plane">Model Control Plane</a>…</li></ul>

Let’s dive into the details!

## Setup

> 📢 Note that this feature is only available in a deployed version of ZenML (not in a local scenario via `zenml up`). Learn how to deploy ZenML here.

We offer [a free two-week trial of ZenML Pro](https://www.zenml.io/pro) and you’ll find that’s the easiest way to get started. Get an account if you don’t already have one.

As I currently write, [the Llama 3.1 model family](https://huggingface.co/meta-llama/Meta-Llama-3.1-8B) is gated on the Hugging Face official repository so you’ll need to request access to the model. If you have an account this is easy to do and it seems that they’re granting access fairly quickly (within 24 hours). While you’re on the Hugging Face site you’ll also want to get a Hugging Face `read` token. (See the [Hugging Face user access token docs](https://huggingface.co/docs/hub/en/security-tokens#what-are-user-access-tokens) for more on this).

To follow along and finetune your model on GCP, you’ll need a GCP stack, but of course you can also just run this using the `default` stack by using the `llama3-1_finetune_local.yaml` file instead of the `...remote.yaml` file.

Your GCP stack will be made up of:

<ul><li><a href="https://docs.zenml.io/stack-components/container-registries/gcp">a container registry on GCP</a></li><li><a href="https://docs.zenml.io/stack-components/artifact-stores/gcp">an artifact store on GCP</a></li><li><a href="https://docs.zenml.io/stack-components/step-operators/vertex">a step operator that uses VertexAI</a>, setup to run on GPU-accelerated hardware</li><li><a href="https://docs.zenml.io/stack-components/orchestrators/local">a local / default orchestrator</a> (you could also <a href="https://docs.zenml.io/stack-components/orchestrators/vertex">use VertexAI as your orchestrator</a>)</li></ul>

Before we're able to run any pipeline, we need to set up our environment as follows:

```
# clone the repository
git clone https://github.com/zenml-io/zenml-projects.git
cd zenml-projects/llm-lora-finetuning/

# Set up a Python virtual environment, if you haven't already
python3 -m venv .venv
source .venv/bin/activate

# Install requirements
pip install -r requirements.txt
```

You'll want to follow the instructions on your ZenML dashboard to connect to your server through the terminal. The command will look something like this and you’ll find it on the main overview screen:

```
zenml connect --url https://...some_url_goes_here...
```

Setting all the infrastructure and permissions up for these components is a bit of a pain, so ZenML has an almost-one-click way to handle this for you. Simply type:

```
zenml stack deploy -n llama-starter -p gcp --set
```

This will guide you through a process in which you deploy the infrastructure within GCP.

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/fc157092/66c48ff68be405c4188144b5_66a2079e063e15d1458f0af1_Finetune_20Llama_203.1.png" alt="Screenshot of the terminal when setting up a stack with one-click deployment. We use GCP to set up a basic MLOps stack." />
</figure>

> 💡 PRO TIP: When selecting the region in which you want this to be deployed, consider choosing `us-central1` since this has (or at least seems to have!) a greater availability of A100 machines and so the step is unlikely to fail on account of unavailable resources

The basic GCP stack that gets deployed in the previous step needs a bit of work before we can use it for finetuning. We’ll swap out the VertexAI orchestrator for a step operator, since we only want certain steps to run on the more-costly GPU-backed hardware. To make the necessary changes, run the following commands (assuming you set the name of the stack as `llama-starter`):

```
# we'll build our images locally
zenml stack remove-component -i

# registers a step operator that uses an A100
zenml step-operator register gcp_a100 -f gcp -c llama-starter --accelerator_count=1 --machine_type="a2-highgpu-1g" --boot_disk_size_gb=200 --boot_disk_type="pd-ssd" --region=europe-west4 --accelerator_type="NVIDIA_TESLA_A100"

# updates the stack with the new component
zenml stack update -o default -s llama-starter
```

Once you’re done setting up the stack, you should register the Hugging Face `read` token (that you obtained above) as a secret so that the cloud machines can get access to the Llama 3.1 model via the Hugging Face Hub. Registering a secret is easy:

```
zenml secret create hf-token --token="YOUR_READ_TOKEN_GOES_HERE"
```

Everything's ready to go. Let’s get finetuning!

## Running the Finetuning Pipeline

To run the pipeline, simply execute the following:

```
python run.py --config llama3-1_finetune_remote.yaml
```

``This will start the pipeline and run:

<ul><li><code>prepare_data</code> - a local data preparation step which downloads the dataset and carries out some preprocessing</li><li><code>evaluate_base</code> - (runs on A100) - a baseline evaluation of the raw model using <a href="https://huggingface.co/spaces/evaluate-metric/rouge">Rouge metrics</a></li><li><code>finetune</code> - (runs on A100) - finetuning the model using the dataset</li><li><code>evaluate_finetuned</code> - (runs on A100) - evaluating the new finetuned model we just created using the same Rouge metrics</li><li><code>promote</code> - checks which of the two models performed best. If the finetuned model performed better, then we <a href="https://docs.zenml.io/how-to/use-the-model-control-plane/promote-a-model">promote the model to **Staging</a>.**</li></ul>

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/0d4287f3/66c48ff58be405c4188142c3_66a207c98c70dc07dd8dc57d_Llama_203.1_20Finetune_20_1_.png" alt="Screenshot of the DAG (produced by the ZenML dashboard) which finetunes the Llama 3.1 model." />
</figure>

If you’re running using the A100 hardware that we set up above, this pipeline should take somewhere between 45 minutes to an hour to run through. Some regions will have a smaller supply of GPU-powered machines so your steps might fail and retry.

Our finetuned model lives in the artifact store now and we can now inspect some of the artifacts and outputs of the pipeline over on the dashboard.

## Inspecting our finetuning pipeline in the Dashboard

You can inspect the pipeline run and its artifacts first in the pipeline overview:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/7f877baf/66c48ff58be405c4188142e6_66a207f9aa92e7f94a7a1970_Llama_203.1_20Finetune_20_2_.png" alt="__wf_reserved_inherit" />
</figure>

Useful metadata about the run is displayed on the right panel and by clicking the ‘Configuration’ tab you’ll see all the parameters used when you ran the pipeline. (These are values set by the YAML config file as well as in the pipeline code itself.

Clicking on an individual step (like here for the `finetune` step) will allow you to inspect the runtime parameters for that particular piece of the pipeline:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/f370c0b9/66c48ff58be405c4188142e9_66a20a499886bc977618650e_Finetune_20Llama_203.1_20_1_.png" alt="A partial screenshot of the ZenML Dashboard showing parameters passed in for a particular finetuning step." />
</figure>

Once you’ve done a few experiments, the place to go for a global overview of your experiments and artifacts is the Model Control Plane. Click the ‘Models’ tab on the left side of the Dashboard and you’ll see something like this (though yours will likely have just one model in here!):

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/9d112c2a/66c48ff48be405c4188142bc_66a20aa33b827e07b11af74f_Finetune_20Llama_203.1_20_2_.png" alt="Screenshot of the Model Control Plane on the ZenML Dashboard. This gives you a global overview of the experiments and iterations of work you’ve carried out on your models." />
</figure>

Note that some of these model versions have been promoted to `Production` and `Staging` stages, which is a way of isolating and highlighting particular statuses of your work product. If you were paying attention above, you’ll notice that the model you finetuned actually was promoted to `Staging` already for you (though you can do it manually in the Dashboard, too). The final step of the pipeline checks whether the finetuned version performs better than the base model (according to the metrics we evaluate) and then if so, we promote it to the next stage. This is a very common pattern in production machine learning and works out of the box with ZenML.

From this point you can click through to a specific version (`300_steps` for example) and then inspect the artifacts, models, deployments or even metadata surrounding that particular iteration. You can also see all the pipeline runs associated with that particular experiment that you were working on and it’s a way to make sense of all the complexity of your modelling work.

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/553be03d/66c48ff48be405c4188142b9_66a20ac537bee3ab907dc3ba_Finetune_20Llama_203.1_20_3_.png" alt="A screenshot of the Model Control Plane overview of a single model version on the ZenML Dashboard. Specifically this shows the metadata tab for a particular model version where you can inspect metrics like the eval scores or even the LLM system prompt." />
</figure>

And of course, your model artifacts are all available to any downstream use that you might have via the API or Python SDK.

## What can I do now?

Congratulations! You’ve now finetuned an LLM with ZenML! For organisations and businesses with a need for repeated finetuning of models, ZenML gives you an interface and workflow that will simplify these processes. If you want to play around with the code, you might consider:

<ul><li>switching out the base model to something bigger (or smaller!)</li><li>switching out the dataset to something closer to your use case</li><li>add a deployment step at the end</li><li>perform multiple experiments by tweaking the hyperparameters in the config file and use the Model Control Plane to compare it all</li></ul>

I hope this tutorial has shown you that finetuning LLMs in a production setup built for reproducibility doesn’t have to be hard. If you’re interested in learning more about how ZenML can support your team in your production use cases, please [get in touch with us on Slack](https://www.zenml.io/slack) or [sign up for a call](https://www.zenml.io/book-your-demo) where we can discuss how we can help you!