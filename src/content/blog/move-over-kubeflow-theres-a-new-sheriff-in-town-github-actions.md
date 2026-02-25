---
title: "Move over Kubeflow, there's a new sheriff in town: Github Actions 🤠"
slug: "move-over-kubeflow-theres-a-new-sheriff-in-town-github-actions"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6530b370205caab50f2ee8a2"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-01-26T14:53:47.357Z"
  createdOn: "2023-10-19T04:41:20.249Z"
author: "michael-schuster"
category: "zenml"
tags:
  - "cicd"
  - "cloud"
  - "evergreen"
  - "integrations"
  - "mlops"
  - "zenml"
date: "2022-06-20T00:00:00.000Z"
readingTime: 15 Mins Read
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/b05fafb4/6530b07c193a7bf8d265b8a1_roman-synkevych-wX2L8L-fGeA-unsplash.jpg"
---

**Last updated:** April 3, 2023.

*Note: This example does not work for any ZenML versions > 0.36.1.*

We’re really proud of our Kubeflow integration. It gives you a ton of power and flexibility and is a production-ready tool. But we also know that for many of you it’s one step too many. Setting up a Kubernetes cluster is probably nobody’s ideal way to spend their time, and it certainly requires some time investment to maintain.

We thought this was a concern worth addressing so I worked to build an alternative during the ZenHack Day we recently ran. [GitHub Actions](https://docs.github.com/en/actions) is a platform that allows you to execute arbitrary software development workflows right in your GitHub repository. It is most commonly used for CI/CD pipelines, but using the GitHub Actions orchestrator ZenML now enables you to easily run and schedule your machine learning pipelines as GitHub Actions workflows.

## GitHub Actions: best in class for what?

Most technical decisions come with various kinds of tradeoffs, and it’s worth taking a moment to assess why you might want to use the GitHub Actions orchestrator in the first place.

Let’s start with the downsides:

<ul><li>You don’t have as much flexibility as with a tool like Kubeflow in terms of specifying exactly what kinds of hardware are used to run your steps.</li><li>The orchestrator itself runs on the hardware that GitHub Actions provides (generously and <a href="https://github.blog/2019-08-08-github-actions-now-supports-ci-cd/">for free</a>). This isn’t the fastest or most performant infrastructure setup, and it generally is much slower than even your local CPU machine. There are also memory and storage constraints to <a href="https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources">the machines they provide</a> as GitHub Actions runners.</li><li>GitHub offers no guarantees about when your actions will be executed; at peak times you might be waiting a while before the hardware is allocated and provisioned to run. If you are planning on running ZenML pipelines on a schedule (every ten minutes, for example) then this might not work as expected.</li></ul>

So what’s the point, then? These are indeed some serious downsides. Firstly and foremostly, there’s the cost: running your pipelines on GitHub Actions is **free**. If you’re interested in running your pipelines in the cloud on serverless infrastructure, there’s probably no easier way to get started than to try out this orchestrator.

You are also spared the pain of maintaining a Kubernetes cluster. Once you’ve configured it (see below for instructions) there’s basically nothing you have to do on an ongoing basis. I hope you’re sold on trying it out and want to get started, so let’s not hold off any more.

(Note that some of the commands in this tutorial rely on environment variables or a specific working directory from previous commands, so be sure to run them in the same shell. In this tutorial we’re going to use [Microsoft’s Azure platform](https://azure.microsoft.com/) for cloud storage and our MySQL database, but it works just as well on AWS or GCP.

## Prerequisites

This tutorial assumes that you have:

<ul><li><a href="https://www.python.org/">Python</a> installed (version 3.7-3.9)</li><li><a href="https://git-scm.com/">Git</a> installed</li><li>a <a href="https://github.com/">GitHub</a> account</li><li><a href="https://www.docker.com/">Docker</a> installed and running</li><li><a href="https://docs.zenml.io/user-guide/starter-guide/switch-to-production">Remote ZenML Server</a> A Remote Deployment of the ZenML HTTP server and Database</li></ul>

## Azure Setup

### Create an account

If you don’t have an Azure account yet, go to [https://azure.microsoft.com/en-gb/free/](https://azure.microsoft.com/en-gb/free/) and create one.

### Create a resource group

[Resource groups](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups) are a concept in Azure that allows us to bundle different resources that share a similar lifecycle. We’ll create a new resource group for this tutorial so we’ll be able to differentiate them from other resources in our account and easily delete them at the end.

Go to [the Azure portal](https://portal.azure.com/#home), click the hamburger button in the top left to open up the portal menu. Then, hover over the Resource groups section until a popup appears and click on the + Create button: 

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/d47dadc7/6530b0d853b5f11c6c23e586_resource_group_0.png" alt="Resource group step 1" />
</figure>

 Select a region and enter a name for your resource group before clicking on Review + create: 

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/70380ca9/6530b0d7cc2eac3120cff3c7_resource_group_1.png" alt="Resource group step 2" />
</figure>

 Verify that all the information is correct and click on Create: 

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/e15dae43/6530b0d899f1a30ae6129daa_resource_group_2.png" alt="Resource group step 3" />
</figure>

### Create a storage account

An [Azure storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal) is a grouping of Azure data storage objects which also provides a namespace and authentication options to access them. We’ll need a storage account to hold the blob storage container we’ll create in the next step.

Open up the portal menu again, but this time hover over the Storage accounts section and click on the + Create button in the popup once it appears: 

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/e4b3b7d2/6530b0d7217561890c954a6a_storage_account_0.png" alt="Storage account step 1" />
</figure>

Select your previously created **resource group**, a **region** and a **globally unique name** and then click on Review + create:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/99a40a67/6530b0d878f445d48d7da99c_storage_account_1.png" alt="Storage account step 2" />
</figure>

Make sure that all the values are correct and click on Create:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/a42ae9d3/6530b0d89019b6bdfa9adef0_storage_account_2.png" alt="Storage account step 3" />
</figure>

Wait until the deployment is finished and click on Go to resource to open up your newly created storage account:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/3b7064d5/6530b0d7bb19b34fd084d17e_storage_account_3.png" alt="Storage account step 4" />
</figure>

In the left menu, select Access keys:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/101e731e/6530b0d8b8c4c30438c3d877_storage_account_4.png" alt="Storage account step 5" />
</figure>

Click on Show keys, and once the keys are visible, note down the **storage account name** and the value of the **Key** field of either key1 or key2. We’re going to use them for the <STORAGE_ACCOUNT_NAME> and <STORAGE_ACCOUNT_KEY> placeholders later.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/5ac0377e/6530b0d7b231ab77890877aa_storage_account_5.png" alt="Storage account step 6" />
</figure>

### Create an Azure Blob Storage Container

Next, we’re going to create an [Azure Blob Storage Container](https://docs.microsoft.com/en-us/azure/storage/blobs/). It will be used by ZenML to store the output artifacts of all our pipeline steps. To do so, select Containers in the Data storage section of the storage account:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/605e7624/6530b0d7217561890c95485f_container_0.png" alt="Blob storage container step 1" />
</figure>

Then click the + Container button on the top to create a new container:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/5ee40a8d/6530b0d7bd10d318f48f397a_container_1.png" alt="Blob storage container step 2" />
</figure>

Choose a name for the container and note it down. We’re going to use it later for the <BLOB_STORAGE_CONTAINER_NAME> placeholder. Then create the container by clicking the Create button.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/17a34075/6530b0d7941b603091730807_container_2.png" alt="Blob storage container step 3" />
</figure>

## GitHub Setup

### Create a GitHub Personal Access Token

Next up, we’ll need to create a [GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) that ZenML will use to authenticate with the GitHub API in order to store secrets and upload Docker images.

<ol><li>Go to <a href="https://github.com/">https://github.com</a>, click on your profile image in the top right corner and select Settings:</li></ol>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/7d5757ca/6530b0d78d403fea6860f70e_pat_0.png" alt="PAT step 1" />
</figure>

<ol><li>Scroll to the bottom and click on Developer Settings on the left side:</li></ol>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/67496335/6530b0d79d34fc77b5d8d804_pat_1.png" alt="PAT step 2" />
</figure>

<ol><li>Select Personal access tokens and click on Generate new token:</li></ol>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/86cd38c5/6530b0d7ee7cadf2b002b1a5_pat_2.png" alt="PAT step 3" />
</figure>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/2320c994/6530b0d7dd17f8cd1a1d56cf_pat_3.png" alt="PAT step 4" />
</figure>

<ol><li>Give your token a descriptive name for future reference and select the repo and write:packages scopes:</li></ol>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/0cb0714e/6530b0d70933193dd67cb1cc_pat_4.png" alt="PAT step 5" />
</figure>

<ol><li>Scroll to the bottom and click on Generate token. This will bring you to a page that allows you to copy your newly generated token:</li></ol>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/634d3d84/6530b0d76d1f4d39667e83d0_pat_5.png" alt="PAT step 6" />
</figure>

Now that we’ve got our token, let’s store it in an environment variable for future steps. We’ll also store our GitHub username that this token was created for. Replace the <PLACEHOLDERS> in the following command and run it:

```bash
export GITHUB_USERNAME=<github_username>
export GITHUB_AUTHENTICATION_TOKEN=<personal_access_token>
</personal_access_token></github_username>
```

### Login to the Container registry

When we’ll run our pipeline later, ZenML will build a Docker image for us which will be used to execute the steps of the pipeline. In order to access this image inside GitHub Actions workflow, we’ll push it to the GitHub container registry. Running the following command will use the personal access token created in the previous step to authenticate our local Docker client with this container registry:

```bash
echo "$GITHUB_AUTHENTICATION_TOKEN" | docker login ghcr.io -u "$GITHUB_USERNAME" --password-stdin
```

**Note**: If you run into issues during this step, make sure you’ve set the environment variables in the previous step and Docker is running on your machine.

### Fork and clone the tutorial repository

Time to fork and clone an [example repository](https://github.com/zenml-io/github-actions-orchestrator-tutorial) which contains a very simple ZenML pipeline that trains a SKLearn SVC classifier on the [digits dataset](https://scikit-learn.org/stable/auto_examples/datasets/plot_digits_last_image.html).

If you’re new to ZenML, let’s quickly go over some [basic concepts](https://docs.zenml.io/user-guide/starter-guide) that help you understand what the code in this repository is doing:

<ul><li>A <strong>pipeline</strong> in ZenML allows you to group a series of steps in whatever order makes sense for your particular use case. The <a href="https://github.com/zenml-io/github-actions-orchestrator-tutorial/blob/main/pipelines/training_pipeline/training_pipeline.py">example pipeline</a> consists of three steps which import data, train a model and evaluate the model.</li><li>A <strong>step</strong> is very similar to a Python function and contains arbitrary business logic. The three steps in our example do the following:</li><li>The <a href="https://github.com/zenml-io/github-actions-orchestrator-tutorial/blob/main/steps/data_loader_step/data_loader_step.py">data loader step</a> loads the digits dataset and splits it into train and test set.</li><li>The <a href="https://github.com/zenml-io/github-actions-orchestrator-tutorial/blob/main/steps/trainer_step/trainer_step.py">trainer step</a> trains a SKLearn SVC classifier on the training set returned by the data loader step.</li><li>The <a href="https://github.com/zenml-io/github-actions-orchestrator-tutorial/blob/main/steps/evaluator_step/evaluator_step.py">evaluator step</a> evaluates the model returned by the trainer step on the test set.</li></ul>

Let’s get going:

<ol><li>Go to <a href="https://github.com/zenml-io/github-actions-orchestrator-tutorial">https://github.com/zenml-io/github-actions-orchestrator-tutorial</a></li><li>Click on Fork in the top right:</li></ol>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/2d887bc8/6530b0d737a36ef83026d3a9_fork_0.png" alt="Fork step 1" />
</figure>

<ol><li>Click on Create fork:</li></ol>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/16d24283/6530b0d7d5cc716731a74157_fork_1.png" alt="Fork step 2" />
</figure>

<ol><li>Clone the repository to your local machine:</li></ol>

```bash
git clone git@github.com:"$GITHUB_USERNAME"/github-actions-orchestrator-tutorial.git
# or `git clone https://github.com/"$GITHUB_USERNAME"/github-actions-orchestrator-tutorial.git` if you want to authenticate with HTTPS instead of SSL
cd github-actions-orchestrator-tutorial
```

## ZenML Setup

Now that we’re done setting up and configuring all our infrastructure and external dependencies, it’s time to install ZenML and configure a ZenML stack that connects all these elements together.

## Remote ZenML Server

For Advanced use cases where we have a remote orchestrator such as Vertex AI or to share stacks and pipeline information with team we need to have a separated non-local remote ZenML Server that it can be accessible from your machine as well as all stack components that may need access to the server. [Read more information about the use case here](https://docs.zenml.io/user-guide/starter-guide/switch-to-production)

In order to achieve this there are two different ways to get access to a remote ZenML Server.

<ol><li>Deploy and manage the server manually on <a href="https://docs.zenml.io/user-guide/starter-guide/switch-to-production">your own cloud</a>/</li><li>Sign up for <a href="https://zenml.io/pricing">ZenML Enterprise</a> and get access to a hosted version of the ZenML Server with no setup required.</li></ol>

### Installation

Let’s install ZenML and all the additional packages that we’re going to need to run our pipeline:

```bash
pip install zenml
zenml integration install -y github azure sklearn
```

We’re also going to initialize a ZenML repository to indicate which directories and files ZenML should include when building Docker images:

```bash
zenml init
```

### Connect to ZenML Server

Once the deployment is finished, let’s connect to it by running the following command and logging in with the username and password you set during the deployment phase:

```bash
zenml connect --url=<deployment_url>
</deployment_url>
```

### Registering the stack

A [ZenML stack](https://docs.zenml.io/user-guide/starter-guide/understand-stacks) consists of many components which all play a role in making your ML pipeline run in a smooth and reproducible manner. Let’s register all the components that we’re going to need for this tutorial!

<ul><li>The <strong>orchestrator</strong> is responsible for running all the steps in your machine learning pipeline. In this tutorial we’ll use the new GitHub Actions orchestrator which, as the name already indicates, uses GitHub Actions workflows to orchestrate your ZenML pipeline. Registering the orchestrator is as simple as running the following command:</li></ul>

```bash
zenml orchestrator register github_orchestrator --flavor=github  
```

<ul><li>We’ll also need to configure a <strong>container registry</strong> which will point ZenML to a Docker registry to store the images that ZenML builds in order to run your pipeline. Luckily, your GitHub account already comes with a free container registry! To register it simply run:</li></ul>

```bash
zenml container-registry register github_container_registry \
    --flavor=github \
    --automatic_token_authentication=true \
    --uri=ghcr.io/"$GITHUB_USERNAME"
```

<ul><li>The <strong>secrets manager</strong> is used to securely store all your credentials so ZenML can use them to authenticate with other components like your artifact store. We’re going to use a secrets manager implementation that stores these credentials as <a href="https://docs.github.com/en/actions/security-guides/encrypted-secrets">encrypted GitHub secrets</a>:</li></ul>

```bash
zenml secrets-manager register github_secrets_manager \
    --flavor=github \
    --owner="$GITHUB_USERNAME" \
    --repository=github-actions-orchestrator-tutorial
```

<ul><li>The <strong>artifact store</strong> stores all the artifacts that get passed as inputs and outputs of your pipeline steps. To register our blob storage container, replace the &lt;BLOB_STORAGE_CONTAINER_PATH&gt; placeholder in the following command with the path we saved when <a href="https://blog.zenml.io/github-actions-orchestrator/#create-an-azure-blob-storage-container">creating the blob storage container</a> and run it:</li></ul>

```bash
# The `az://` in front of the container name tells ZenML that this is an Azure container that it needs to read from/write to
zenml artifact-store register azure_artifact_store \
    --flavor=azure \
    --authentication_secret=azure_store_auth \
    --path=az://<blob_storage_container_name>
</blob_storage_container_name>
```

These are all the components that we’re going to use for this tutorial, but ZenML offers additional components like:

<ul><li><strong>Step operators</strong> to run individual steps of your pipeline in specialized environments.</li><li><strong>Model deployers</strong> to deploy your trained machine learning model in production.</li><li>And many more. Check out <a href="https://docs.zenml.io/stacks-and-components/component-guide">our docs</a> for a full list of available components.</li></ul>

With all components registered, we can now create and activate our ZenML stack. This makes sure ZenML knows which components to use when we’re going to run our pipeline later.

```bash
zenml stack register github_actions_stack \
    -o github_orchestrator \
    -x github_secrets_manager \
    -c github_container_registry \
    -a azure_artifact_store \
    --set
```

****

### Registering the secrets

Once the stack is active, we can register the secret that ZenML needs to authenticate with our artifact store. We’re going to need the **storage account name** and **key** that we saved when we [created our storage account earlier](https://blog.zenml.io/github-actions-orchestrator/#create-a-storage-account): Replace the <PLACEHOLDERS> in the following command with those concrete values and run it:

```bash
zenml secrets-manager secret register azure_store_auth \
    --schema=azure \
    --account_name=<storage_account_name> \
    --account_key=<storage_account_key>
</storage_account_key></storage_account_name>
```

## Run the pipeline

That was quite a lot of setup, but luckily we’re (almost) done now. Let’s execute the python script that “runs” our pipeline and quickly discuss what it is doing:

```bash
python run.py
```

This script runs a ZenML pipeline using our active GitHub stack. The orchestrator will now build a Docker image with our pipeline code and all the requirements installed and push it to the GitHub container registry. Once the image is pushed, the orchestrator will write a [GitHub Actions workflow file](https://docs.github.com/en/actions/using-workflows/about-workflows) to the directory .github/workflows. Pushing this workflow file will trigger the actual execution of our ZenML pipeline. We’ll explain later at how to automate this step, but for our first pipeline run there is one last configuration step we need to do: We need to make sure our GitHub Actions are allowed to pull the Docker image that ZenML just pushed.

<ol><li>Wait until the python script has finished running so the Docker image is pushed to GitHub.</li><li>Head to https://github.com/users/&lt;GITHUB_USERNAME&gt;/packages/container/package/zenml-github-actions (replace &lt;GITHUB_USERNAME&gt; with your GitHub username) and select Package settings on the right side:</li></ol>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/0d373db0/6530b0d87abd01ad80dc6763_package_permissions_0.png" alt="Package permissions step 1" />
</figure>

<ol><li>In the Manage Actions access section, click on Add Repository:</li></ol>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/b2a32aca/6530b0d855a960dc3aef8c0b_package_permissions_1.png" alt="Package permissions step 2" />
</figure>

<ol><li>Search for your forked repository github-actions-orchestrator-tutorial and give it read permissions. Your package settings should then look like this:</li></ol>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/02ee239d/6530b0d7e63eefb2a1632a03_package_permissions_2.png" alt="Package permissions step 3" />
</figure>

Done! Now all that’s left to do is commit and push the workflow file:

```bash
git add .github/workflows
git commit -m "Add ZenML pipeline workflow"
git push
```

If we now check out the GitHub Actions for our repository here https://github.com/<GITHUB_USERNAME>/github-actions-orchestrator-tutorial/actions we should see our pipeline running! 🎉

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/05de00d0/6530b0d7bd10d318f48f398d_success_0.png" alt="Running pipeline" />
</figure>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/a71833af/6530b0d8e6cefa01869cf37d_success_1.png" alt="Finished pipeline" />
</figure>

## Automate the committing and pushing

If we want the orchestrator to automatically commit and push the workflow file for us, we can enable it with the following command:

```bash
zenml orchestrator update github_orchestrator --push=true
```

After this update, calling python run.py should automatically build and push a Docker image, commit and push the workflow file which will in turn run our pipeline on GitHub Actions.

## Delete Azure Resources

Once we’re done experimenting, let’s delete all the resources we created on Azure so we don’t waste any compute/money. As we’ve bundled it all in one resource group, this step is very easy. Go [the Azure portal](https://portal.azure.com/#home) and select your resource group in the list of resources:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/a1f0a974/6530b0d8d0bce1093e00fb47_cleanup_0.png" alt="Cleanup step 1" />
</figure>

Next click on Delete resource group on the top:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/227f1786/6530b0d725ce7aaf73dd1836_cleanup_1.png" alt="Cleanup step 2" />
</figure>

In the popup on the right side, type the resource group name and click Delete:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/26a68143/6530b0d7412750662dbb305b_cleanup_2.png" alt="Cleanup step 3" />
</figure>

This will take a few minutes, but after it’s finished all the resources we created should be gone.

## Where to go from here?

If you have any question or feedback regarding this tutorial, let us know [here](https://zenml.hellonext.co/p/github-actions-orchestrator-tutorial-feedback) or join our [weekly community hour](https://www.eventbrite.com/e/zenml-meet-the-community-tickets-354426688767). If you want to know more about ZenML or see more examples, check out our [docs](https://docs.zenml.io/), [examples](https://github.com/zenml-io/zenml/tree/main/examples) or join our [Slack](https://zenml.io/slack-invite/).

[*Image Credit: Photo by *[Roman Synkevych](https://unsplash.com/@synkevych)* on *[Unsplash](https://unsplash.com/s/photos/github)]

