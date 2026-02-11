---
title: "Feast"
slug: "feast"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8a9dedce731d073cec1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-09-24T10:04:33.693Z"
  lastUpdated: "2024-09-24T10:04:33.693Z"
  createdOn: "2023-10-12T09:13:13.459Z"
integrationType: "feature-store"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/3a941d62/66d86908b9571c825b71a1fc_feast.png"
shortDescription: "Seamlessly Integrate Feature Stores into ML Pipelines with Feast and ZenML"
docsUrl: "https://docs.zenml.io/stack-components/feature-stores/feast"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/6a95c3bc/66e74ad7b746f3d2cf477755_feast_integration.png"
seo:
  title: "Integrate Feast with ZenML - Feature Store Integrations"
  description: "Seamlessly Integrate Feature Stores into ML Pipelines with Feast and ZenML"
  canonical: "https://www.zenml.io/integrations/feast"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/6a95c3bc/66e74ad7b746f3d2cf477755_feast_integration.png"
  ogTitle: "Integrate Feast with ZenML - Feature Store Integrations"
  ogDescription: "Seamlessly Integrate Feature Stores into ML Pipelines with Feast and ZenML"
---

<ul><li>Seamless integration of Feast feature stores into ZenML pipelines</li><li>Access to historical feature data for model training</li><li>Simplified feature retrieval and management within ML workflows</li><li>Improved collaboration and reproducibility across teams</li></ul>

<ul><li>Unified serving of features to models for training and inference</li><li>Scalable offline store for batch scoring and model training</li><li>Integration with various data sources and platforms</li><li>Centralized feature registry and versioning</li></ul>

```python
# First register the feature store and a stack
# zenml feature-store register feast_store --flavor=feast --feast_repo="<PATH/TO/FEAST/REPO>"
# zenml stack register ... -f feast_store

from zenml import step, pipeline
from zenml.client import Client

@step
def get_historical_features(
    entity_dict, features, full_feature_names=False
):
    feature_store = Client().active_stack.feature_store
    entity_df = pd.DataFrame.from_dict(entity_dict)

    return feature_store.get_historical_features(
        entity_df=entity_df,
        features=features,
        full_feature_names=full_feature_names,
    )

@pipeline
def my_pipeline():
    my_features = get_historical_features(
        entity_dict={"driver_id": [1001, 1002, 1003]},
        features=["driver_hourly_stats:conv_rate", "driver_hourly_stats:acc_rate"]
    )
    # use features in downstream steps

# also use the CLI for Feast metadata etc
# zenml feature-store feature get-entities
# zenml feature-store feature get-data-sources
# ...
```
The code example demonstrates how to retrieve historical features from a Feast feature store within a ZenML pipeline step. It uses the get_historical_features method to fetch features based on the provided entity dictionary and feature list, enabling seamless integration of feature store data into the ML workflow.