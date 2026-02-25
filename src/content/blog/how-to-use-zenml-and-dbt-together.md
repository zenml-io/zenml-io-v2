---
title: "How to use ZenML and DBT together"
slug: "how-to-use-zenml-and-dbt-together"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66759ba3e1dc632bddc84095"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-06-26T12:05:20.074Z"
  lastUpdated: "2024-06-26T12:05:16.796Z"
  createdOn: "2024-06-21T15:26:27.634Z"
author: "hamza-tahir"
category: "zenml"
tags:
  - "bitesize"
  - "integrations"
  - "tooling"
date: "2024-06-21T00:00:00.000Z"
readingTime: 1 min
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/d806f8e9/66759c0d006ae90eeb3286df_CleanShot_2024-06-21_at_17.27.44.png"
seo:
  title: "How to use ZenML and DBT together - ZenML Blog"
  description: "How to use ZenML and dbt together, all powered by ZenML's built-in success hooks that run whenever your pipeline successfully completes."
  canonical: "https://www.zenml.io/blog/how-to-use-zenml-and-dbt-together"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/007aead9/66759c0d006ae90eeb3286df_CleanShot_2024-06-21_at_17.27.44.png"
  ogTitle: "How to use ZenML and DBT together - ZenML Blog"
  ogDescription: "How to use ZenML and dbt together, all powered by ZenML's built-in success hooks that run whenever your pipeline successfully completes."
---

Today, [Javier](https://www.linkedin.com/in/jlopezpena/?originalSubdomain=uk) from Wayflyer asked about using [ZenML And DBT together on Slack](https://zenml.slack.com/archives/C01FWQ5D0TT/p1718968760591359). Got me thinking: That seems like quite something that might be useful to many people.

## Why use DBT and ZenML together?

ZenML is used for ML workflows, while [DBT](https://www.getdbt.com/) is used for data transformations. This goes hand in hand when you have use cases like:

<ul><li>Running a data transformation after training a model</li><li>Doing post-batch-inference data transformations (That’s Javier’s use case)</li><li>Triggering a training/inference/deployment ML workflow after a data transformation is complete</li></ul>

## How I’d do it

My suggestion to Javier was to do the transformation as a [ZenML success hook](https://docs.zenml.io/how-to/build-pipelines/use-failure-success-hooks):

```
import requests
from zenml import step

@step(on_success=trigger_dbt)
def run_batch_inference(data: pd.DataFrame): 
  # run batch inference
  return results
  

def trigger_dbt():
  data = {}
  headers = {
    'Authorization': f'token {GITHUB_TOKEN}',
    'Accept': 'application/vnd.github.everest-preview+json'
  }
  url = f'https://api.github.com/repos/{GITHUB_REPO}/dispatches'
  payload = {
      'event_type': 'trigger-action',
      'client_payload': data
  }
  response = requests.post(url, json=payload, headers=headers)
  if response.status_code == 204:
      return jsonify({'message': 'GitHub Action triggered successfully'}), 200
  else:
      return jsonify({'message': 'Failed to trigger GitHub Action'}), response.status_code
```

The above code simply triggers a GitHub action in a repo where you have the DBT code. As DBT supports function invocation now (as Javier notes) , you could then have a github action that triggers the dbt transformation:

```
from dbt.cli.main import dbtRunner, dbtRunnerResult

# initialize
dbt = dbtRunner()

# create CLI args as a list of strings
cli_args = ["run", "--select", "tag:my_tag"]

# run the command
res: dbtRunnerResult = dbt.invoke(cli_args)

# inspect the results
for r in res.result:
    print(f"{r.node.name}: {r.status}")
```

That’s it - You’ve hooked up your ML pipelines with your dbt transformations.

## So what?

Establishing a link between the modern data stack and the MLOps world is a challenge. Data and ML people often think differently and want to use their own tools for their daily work. Having more well defined interfaces between the worlds might lead to better outcomes overall.

The above is just an example and is an interesting place to start. Let me know if you do try it - and share your thoughts on the use-case in general over [on Slack](https://zenml.io/slack).