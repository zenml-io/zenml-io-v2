---
title: "🤗 Embedding HuggingFace datasets visualizations with ZenML"
slug: "embedding-huggingface-datasets-visualizations-with-zenml"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66962f5118b9005852a24f11"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-07-16T08:39:15.115Z"
  lastUpdated: "2024-07-16T08:39:15.115Z"
  createdOn: "2024-07-16T08:29:05.270Z"
author: "hamza-tahir"
category: "zenml"
tags:
  - "zenml"
  - "huggingface"
  - "bitesize"
date: "2024-07-16T00:00:00.000Z"
readingTime: 3 mins
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/f1cc8836/66962f27b0cc58597264ea77_hf-zenml.png"
seo:
  title: "🤗 Embedding HuggingFace datasets visualizations with ZenML - ZenML Blog"
  description: "Shipping 🤗 datasets visualization embedded in the ZenML dashboard in a few hours"
  canonical: "https://www.zenml.io/blog/embedding-huggingface-datasets-visualizations-with-zenml"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/f1d102aa/66962f27b0cc58597264ea77_hf-zenml.png"
  ogTitle: "🤗 Embedding HuggingFace datasets visualizations with ZenML - ZenML Blog"
  ogDescription: "Shipping 🤗 datasets visualization embedded in the ZenML dashboard in a few hours"
---

Yesterday, Alex pointed me to [this tweet](https://x.com/julien_c/status/1812099420726456457) from Julien Chaumond, CTO of [Huggingface](https://huggingface.co/):

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/3dcc5b8d/66962a7f334003e6a67433fa_post-hf.jpg" alt="Screenshot of a tweet by Julien Chaumond showing off how you can embed the hugging face datasets viewer in any webpage" />
</figure>

We instantly thought it would be a good idea to embed the visualization in the [ZenML dashboard](https://github.com/zenml-io/zenml-dashboard). As the 🤗 Huggingface team already exposed this embedding functionality as a simple iframe, we could easily do this:

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/8019a867/66962ad918b90058529e7699_hf-01.png" alt="Screenshot showing the HTML code you can use to embed an iframe for a hugging face dataset" />
</figure>

See an example on any [🤗 Huggingface dataset](https://huggingface.co/datasets/proj-persona/PersonaHub?viewer_embed=true)

Within a few  hours, we had it [reviewed and merged](https://github.com/zenml-io/zenml/pull/2851):

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/0e3b787f/66962b0f6e2a7bcf0c7aca2c_hf-02.png" alt="Image of the ZenML dashboard with a Hugging Face artifact visualization embedded" />
</figure>

## 🏃 Custom visualizations in ZenML

In ZenML, there is a concept known as a [materializer,](https://docs.zenml.io/how-to/handle-data-artifacts/artifact-versioning) that takes care of persisting objects to and from artifact storage. The interface is quite simple, and optionally includes a function where users can attach custom visualizations:

```
class BaseMaterializer(metaclass=BaseMaterializerMeta):
    """Extend this class and associate your object type."""

        # Tuple of types that trigger this materializer
    ASSOCIATED_TYPES = ()

    def load(self, data_type: Type[Any]) -> Any:
        """Write logic here to load the data of an artifact."""
        ...

    def save(self, data: Any) -> None:
        """Write logic here to save the data of an artifact.""" 

    def save_visualizations(self, data: Any) -> Dict[str, VisualizationType]:
        """Save visualizations of the given data."""
        """
```

The materializer interface is [extensible](https://docs.zenml.io/how-to/handle-data-artifacts/handle-custom-data-types), and it’s easy to make custom ones by adding a class to your codebase. For 🤗 Huggingface datasets, there is already a [standard materializer](https://github.com/zenml-io/zenml/blob/main/src/zenml/integrations/huggingface/materializers/huggingface_datasets_materializer.py) that takes care of reading and writing a dataset to and from storage. All that needed to be done was to implement the `save_visualizations` function.

> 📢 Note, there are other ways to create custom visualizations in ZenML, but this was the simplest in this case

The `save_visualizations` function expects us to return a dictionary of key-value pairs, where the key is where the visualization file is stored, and the value is the type of file that we persist. ZenML already supports HTML file types, so the logic was fairly simple. Here is the implementation:

```
def save_visualizations(
    self, ds: Union[Dataset, DatasetDict]
) -> Dict[str, VisualizationType]:
    """Save visualizations for a Huggingface dataset."""
    visualizations = {}

    if isinstance(ds, Dataset):
        datasets = {"default": ds}
    elif isinstance(ds, DatasetDict):
        datasets = ds
    else:
        raise ValueError(f"Unsupported type {type(ds)}")

    for name, dataset in datasets.items():
        # Generate a unique identifier for the dataset
        if dataset.info.download_checksums:
            dataset_id = extract_repo_name(
                [x for x in dataset.info.download_checksums.keys()][0]
            )
            if dataset_id:
                # Create the iframe HTML
                html = f"""
                <iframe
                src="https://huggingface.co/datasets/{dataset_id}/embed/viewer"
                frameBorder="0"
                width="100%"
                height="560px"
                ></iframe>
                """

                # Save the HTML to a file
                visualization_path = os.path.join(
                    self.uri, f"{name}_viewer.html"
                )
                with fileio.open(visualization_path, "w") as f:
                    f.write(html)

                visualizations[visualization_path] = VisualizationType.HTML

    return visualizations
```

You can see the full implementation materializer implementation [here](https://github.com/zenml-io/zenml/blob/develop/src/zenml/integrations/huggingface/materializers/huggingface_datasets_materializer.py#L141).

And that’s that! Now by returning any 🤗 Huggingface dataset from a ZenML step in a pipeline, the materializer would also embed the viewer within the ZenML dashboard viewer.

## How to embed a 🤗 dataset view in ZenML

Here is a simple example in action that embeds the [glue dataset](https://huggingface.co/datasets/nyu-mll/glue/):

```
from zenml import pipeline, step
from datasets import load_dataset
from datasets import Dataset
from zenml.integrations.huggingface.materializers.huggingface_datasets_materializer import HFDatasetMaterializer

@step(enable_cache=False, output_materializers=HFDatasetMaterializer)
def load_huggingface_dataset() -> Dataset:
    # Load a sample dataset from Hugging Face
    dataset = load_dataset("nyu-mll/glue", split="train")
    return dataset

@pipeline
def huggingface_dataset_pipeline():
    dataset = load_huggingface_dataset()

if __name__ == "__main__":
    # Run the pipeline
    huggingface_dataset_pipeline()
```

Run the above from version 0.62.0 onwards, and you’ll see the following in the ZenML dashboard:

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/511a3e2e/66962d257701e080d2fbbb06_dash-hf.gif" alt="GIF showing the ZenML dashboard UI, navigating to an embedded hugging face dataset" />
</figure>

This was a fun two hours to spend on this relatively simple but hopefully popular enhancement to the [ZenML Huggingface integration](https://zenml.io/integrations/huggingface). Give us a [star if you like it](https://github.com/zenml-io/zenml), or say hi on [Slack](https://zenml.io/slack)! Till next time.

