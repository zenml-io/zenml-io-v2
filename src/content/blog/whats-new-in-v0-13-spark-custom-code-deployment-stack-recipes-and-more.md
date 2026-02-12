---
title: "What's New in v0.13: Spark, Custom Code Deployment, Stack Recipes, and More"
slug: "whats-new-in-v0-13-spark-custom-code-deployment-stack-recipes-and-more"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6531e285596909d5d0905ebb"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-01-26T10:00:04.192Z"
  createdOn: "2023-10-20T02:14:29.043Z"
author: "dickson-neoh-tze-how"
category: "zenml"
tags:
  - "release-notes"
  - "zenml"
date: "2022-09-21T00:00:00.000Z"
readingTime: 7 Mins Read
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/37a5b4aa/6531e22d154860d79271cd5c_6531e0c4c11bd41473fcd108_combined_zero_thirteen.jpeg"
---

**Last updated:** November 3, 2022.

This release blog describes the changes for three releases v0.13.0 (major release), v0.13.1 and v0.13.2 (minor releases). v0.13.0 brings the first iteration of our Apache Spark integration. This integration opens up the possibility of running large-scale workloads on single-node machines or clusters. Additionally, this release also allows you to run custom code along with your models using KServe or Seldon. Lastly, we introduce the Stack Recipe as a convenient way to spin up perfectly configured infrastructure with ease. v0.13.1 and v0.13.2 includes several bugfixes and quality of life improvements for ZenML users.

Version 0.13.0 is chock-full of exciting features:

<ul><li><a href="https://blog.zenml.io/zero-thirteen-release/#-spark-integration">Spark Integration</a> - You can now run Spark jobs within ZenML with the long-awaited Spark integration.</li><li><a href="https://blog.zenml.io/zero-thirteen-release/#-custom-code-deployment">Custom Code Deployment</a> - It’s now possible to run custom code alongside your model with KServe and Seldon.</li><li><a href="https://blog.zenml.io/zero-thirteen-release/#-spin-up-infrastructure-with-stack-recipes">Stack Recipes</a> - We introduce a convenient way to spin up infrastructures using Stack Recipes and how you can extend them to your needs.</li></ul>

View the full release notes [here](https://github.com/zenml-io/zenml/releases/tag/0.13.0).

Version 0.13.1 comes with several quality of life improvements:

<ul><li>Specify the exact order in which your pipelines steps should be executed, e.g., via step_b.after(step_a)</li><li>It’s now possible to use TensorBoard with PyTorch and other modeling frameworks.</li><li>You can now configure the <a href="https://docs.zenml.io/v/0.13.0/mlops-stacks/data-validators/evidently">Evidently integration</a> to ignore specific columns in your datasets.</li></ul>

View the full release notes [here](https://github.com/zenml-io/zenml/releases/tag/0.13.1).

Version 0.13.2 comes with a new local Docker orchestrator and many other improvements and fixes:

<ul><li>You can now run your pipelines locally in isolated Docker containers per step. This is useful to test whether the dockerization process will work in remote orchestrators like Kubeflow.</li><li><a href="https://github.com/gabrielmbmb">@gabrielmbmb</a> updated our MLflow experiment tracker to work with Databricks deployments.</li><li>Documentation updates for cloud deployments and multi-tenancy Kubeflow support.</li></ul>

View the full release notes [here](https://github.com/zenml-io/zenml/releases/tag/0.13.2).

As always, we’ve also included various bug fixes and lots of improvements to the documentation and our examples.

## ⚡ Spark Integration

To date, [Spark](https://spark.apache.org/) has been the most requested feature on our [Roadmap](https://zenml.io/roadmap).

We heard you! And in this release, we present to you the long-awaited Spark integration!

With Spark, this release brings distributed processing into the ZenML toolkit. You can now run heavy data-processing workloads across machines/clusters as part of your MLOps pipeline and leverage all the distributed processing goodies that come with Spark.

We showcased how to use it in our community meetup on 17th August 2022 👇

<figure class="w-richtext-figure-type-video w-richtext-align-fullwidth" style="padding-bottom:56.25%" data-rt-type="video" data-rt-align="fullwidth" data-rt-max-width="" data-rt-max-height="56.25%" data-rt-dimensions="0:0" data-page-url=""><iframe src="https://www.youtube.com/embed/ai366Y3UoXY" frameBorder="0" allowfullscreen=""></iframe></figure>

Run the Spark integration example [here](https://docs.zenml.io/stacks-and-components/component-guide/step-operators/spark-kubernetes).

## 🎯 Custom Code Deployment

We continue our streak in supporting [model deployment](https://blog.zenml.io/zero-thirteen-release/2022-03-02-continuous-deployment.md) in ZenML by introducing a feature that allows you to deploy custom code alongside your models on KServe or Seldon.

With this, you can now ship the model with the pre-processing and post-processing code to run within the deployment environment.

We showcased how to deploy custom code with a model during our community meetup on 24th August 2022

<figure class="w-richtext-figure-type-video w-richtext-align-fullwidth" style="padding-bottom:56.25%" data-rt-type="video" data-rt-align="fullwidth" data-rt-max-width="" data-rt-max-height="56.25%" data-rt-dimensions="0:0" data-page-url=""><iframe src="https://www.youtube.com/embed/yrvO_fmE520" frameBorder="0" allowfullscreen=""></iframe></figure>

Run the example [here](https://github.com/zenml-io/zenml/tree/main/examples/custom_code_deployment).

## 🥘 Spin Up Infrastructure with Stack Recipes

Spinning up and configuring infrastructure is a difficult part of the MLOps journey and can easily become a barrier to entry.

Worry not! Now you don’t need to get lost in the infrastructure configuration details.

Using our [mlops-stacks](https://github.com/zenml-io/mlops-stacks) repository, it is now possible to spin up perfectly-configured infrastructure with the corresponding ZenML stack using the ZenML CLI.

View the demo recorded during our community meetup on 31st August 2022 👇

<figure class="w-richtext-figure-type-video w-richtext-align-fullwidth" style="padding-bottom:56.25%" data-rt-type="video" data-rt-align="fullwidth" data-rt-max-width="" data-rt-max-height="56.25%" data-rt-dimensions="0:0" data-page-url=""><iframe src="https://www.youtube.com/embed/9U-jPkufmnE" frameBorder="0" allowfullscreen=""></iframe></figure>

Check out all the Stack Recipes [here](https://github.com/zenml-io/mlops-stacks).

## 💔 Breaking Changes

This release introduces a breaking change to the CLI by adjusting the access to the stack component-specific resources for secrets managers and model deployers to be more explicitly linked to the component.

Here is how:

```bash
# `zenml secret register ...` becomes 
zenml secrets-manager secret register ...

# `zenml served_models list` becomes 
zenml model-deployer models list
```

## ➕ Other Updates, Additions, and Fixes

### 0.13.0

Model Deployment -

<ul><li>Update kserve installation to 0.9 on kserve deployment example by <a href="https://github.com/safoinme">@safoinme</a> in <a href="https://github.com/zenml-io/zenml/pull/823">#823</a>.</li><li>Custom deployment with KServe and Seldon Core by <a href="https://github.com/safoinme">@safoinme</a> in <a href="https://github.com/zenml-io/zenml/pull/841">#841</a>.</li><li>Fix served models logs formatting error by <a href="https://github.com/safoinme">@safoinme</a> in <a href="https://github.com/zenml-io/zenml/pull/836">#836</a>.</li></ul>

Spark Integration -

<ul><li>Spark Integration by <a href="https://github.com/bcdurak">@bcdurak</a> in <a href="https://github.com/zenml-io/zenml/pull/837">#837</a>.</li></ul>

Tekton Orchestrator -

<ul><li>Add Tekton orchestrator by <a href="https://github.com/schustmi">@schustmi</a> in <a href="https://github.com/zenml-io/zenml/pull/844">#844</a>.</li></ul>

Materializer -

<ul><li>Pillow Image materializer by <a href="https://github.com/strickvl">@strickvl</a> in <a href="https://github.com/zenml-io/zenml/pull/820">#820</a>.</li><li>Implement Recursive Built-In Container Materializer by <a href="https://github.com/fa9r">@fa9r</a> in <a href="https://github.com/zenml-io/zenml/pull/812">#812</a>.</li></ul>

CLI Improvement -

<ul><li>Unify CLI concepts (removing secret, feature and served-models) by <a href="https://github.com/strickvl">@strickvl</a> in <a href="https://github.com/zenml-io/zenml/pull/833">#833</a>.</li><li>Add zenml stack recipe CLI commands by <a href="https://github.com/wjayesh">@wjayesh</a> in <a href="https://github.com/zenml-io/zenml/pull/807">#807</a>.</li></ul>

Secrets -

<ul><li>Add secret scoping to the Azure Key Vault by <a href="https://github.com/stefannica">@stefannica</a> in <a href="https://github.com/zenml-io/zenml/pull/830">#830</a>.</li><li>Secrets references on stack component attributes by <a href="https://github.com/schustmi">@schustmi</a> in <a href="https://github.com/zenml-io/zenml/pull/817">#817</a>.</li></ul>

README page improvements -

<ul><li>Update Readme with latest info from docs page by <a href="https://github.com/dnth">@dnth</a> in <a href="https://github.com/zenml-io/zenml/pull/810">#810</a>.</li><li>Typo on Readme by <a href="https://github.com/dnth">@dnth</a> in <a href="https://github.com/zenml-io/zenml/pull/821">#821</a>.</li><li>Put Slack call to action at the top of README page. by <a href="https://github.com/dnth">@dnth</a> in <a href="https://github.com/zenml-io/zenml/pull/846">#846</a>.</li></ul>

Link checker and broken links -

<ul><li>Add automated link check github actions by <a href="https://github.com/dnth">@dnth</a> in <a href="https://github.com/zenml-io/zenml/pull/828">#828</a>.</li><li>Link checker by <a href="https://github.com/dnth">@dnth</a> in <a href="https://github.com/zenml-io/zenml/pull/818">#818</a>.</li><li>Put link checker as part of CI by <a href="https://github.com/dnth">@dnth</a> in <a href="https://github.com/zenml-io/zenml/pull/838">#838</a>.</li><li>Fix broken links from link checker results by <a href="https://github.com/dnth">@dnth</a> in <a href="https://github.com/zenml-io/zenml/pull/835">#835</a>.</li></ul>

Misc -

<ul><li>Misc bugfixes by <a href="https://github.com/schustmi">@schustmi</a> in <a href="https://github.com/zenml-io/zenml/pull/842">#842</a>.</li><li>Add missing requirement for step operators by <a href="https://github.com/schustmi">@schustmi</a> in <a href="https://github.com/zenml-io/zenml/pull/834">#834</a>.</li><li>Change Quickstart to Use Tabular Data by <a href="https://github.com/fa9r">@fa9r</a> in <a href="https://github.com/zenml-io/zenml/pull/843">#843</a>.</li><li>Add sleep before docker builds in release GH action by <a href="https://github.com/schustmi">@schustmi</a> in <a href="https://github.com/zenml-io/zenml/pull/849">#849</a>.</li><li>New Docker build configuration by <a href="https://github.com/schustmi">@schustmi</a> in <a href="https://github.com/zenml-io/zenml/pull/811">#811</a>.</li><li>Improve label studio error messages if secrets are missing or of wrong schema by <a href="https://github.com/schustmi">@schustmi</a> in <a href="https://github.com/zenml-io/zenml/pull/832">#811</a>.</li><li>Fix the SQL zenstore to work with MySQL by <a href="https://github.com/stefannica">@stefannica</a> in <a href="https://github.com/zenml-io/zenml/pull/829">#829</a>.</li><li>Allow setting caching via the config.yaml by <a href="https://github.com/strickvl">@strickvl</a> in <a href="https://github.com/zenml-io/zenml/pull/827">#827</a>.</li><li>Handle file-io with context manager by <a href="https://github.com/aliabbasjaffri">@aliabbasjaffri</a> in <a href="https://github.com/zenml-io/zenml/pull/825">#825</a>.</li></ul>

### 0.13.1

<ul><li>Fix flag info on recipes in docs by <a href="https://github.com/wjayesh">@wjayesh</a> in <a href="https://github.com/zenml-io/zenml/pull/854">#854</a>.</li><li>Fix some materializer issues by <a href="https://github.com/schustmi">@schustmi</a> in <a href="https://github.com/zenml-io/zenml/pull/852">#852</a>.</li><li>Add ignore columns for evidently drift detection by <a href="https://github.com/SangamSwadiK">@SangamSwadiK</a> in <a href="https://github.com/zenml-io/zenml/pull/851">#851</a>.</li><li>TensorBoard Integration by <a href="https://github.com/fa9r">@fa9r</a> in <a href="https://github.com/zenml-io/zenml/pull/850">#850</a>.</li><li>Add option to specify task dependencies by <a href="https://github.com/schustmi">@schustmi</a> in <a href="https://github.com/zenml-io/zenml/pull/858">#858</a>.</li><li>Custom code readme and docs by <a href="https://github.com/safoinme">@safoinme</a> in <a href="https://github.com/zenml-io/zenml/pull/853">#853</a>.</li></ul>

### 0.13.2

<ul><li>Update GitHub Actions by <a href="https://github.com/fa9r">@fa9r</a> in <a href="https://github.com/zenml-io/zenml/pull/864">#864</a>.</li><li>Raise zenml exception when cyclic graph is detected by <a href="https://github.com/schustmi">@schustmi</a> in <a href="https://github.com/zenml-io/zenml/pull/866">#866</a>.</li><li>Add source to segment identify call by <a href="https://github.com/htahir1">@htahir1</a> in <a href="https://github.com/zenml-io/zenml/pull/868">#868</a>.</li><li>Use default local paths/URIs for the local artifact and metadata stores by <a href="https://github.com/stefannica">@stefannica</a> in <a href="https://github.com/zenml-io/zenml/pull/873">#873</a>.</li><li>Implement local docker orchestrator by <a href="https://github.com/schustmi">@schustmi</a> in <a href="https://github.com/zenml-io/zenml/pull/862">#862</a>.</li><li>Update cheat sheet with latest CLI commands from 0.13.0 by <a href="https://github.com/dnth">@dnth</a> in <a href="https://github.com/zenml-io/zenml/pull/867">#867</a>.</li><li>Add a note about importing proper DockerConfiguration module by <a href="https://github.com/jsuchome">@jsuchome</a> in <a href="https://github.com/zenml-io/zenml/pull/877">#877</a>.</li><li>Bugfix/misc by <a href="https://github.com/schustmi">@schustmi</a> in <a href="https://github.com/zenml-io/zenml/pull/878">#878</a>.</li><li>Fixed bug in tfx by <a href="https://github.com/htahir1">@htahir1</a> in <a href="https://github.com/zenml-io/zenml/pull/883">#883</a>.</li><li>Mlflow Databricks connection by <a href="https://github.com/gabrielmbmb">@gabrielmbmb</a> in <a href="https://github.com/zenml-io/zenml/pull/882">#882</a>.</li><li>Refactor cloud guide to stack deployment guide by <a href="https://github.com/wjayesh">@wjayesh</a> in <a href="https://github.com/zenml-io/zenml/pull/861">#861</a>.</li><li>Add cookie consent by <a href="https://github.com/strickvl">@strickvl</a> in <a href="https://github.com/zenml-io/zenml/pull/871">#871</a>.</li><li>Stack recipe CLI improvements by <a href="https://github.com/wjayesh">@wjayesh</a> in <a href="https://github.com/zenml-io/zenml/pull/872">872</a>.</li><li>Kubeflow workaround added by <a href="https://github.com/htahir1">@htahir1</a> in <a href="https://github.com/zenml-io/zenml/pull/886">#886</a>.</li></ul>

## 🙌 Community Contributions

<ul><li><a href="https://github.com/aliabbasjaffri">@aliabbasjaffri</a> made their first contribution in <a href="https://github.com/zenml-io/zenml/pull/825">#825</a>.</li><li><a href="https://github.com/SangamSwadiK">@SangamSwadiK</a> made their first contribution in <a href="https://github.com/zenml-io/zenml/pull/851">#851</a>.</li></ul>

## 👩💻 Contribute to ZenML!

Join our [Slack](https://zenml.io/slack-invite/) to let us know if you have an idea for a feature or something you’d like to contribute to the framework.

We have a [new home for our roadmap](https://zenml.io/roadmap) where you can vote on your favorite upcoming feature or propose new ideas for what the core team should work on. You can vote without needing to log in, so please do let us know what you want us to build!

