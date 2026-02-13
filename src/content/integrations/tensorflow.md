---
title: "TensorFlow"
slug: "tensorflow"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8a8f9346497a5ed4f37"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-14T08:02:40.141Z"
  createdOn: "2023-10-12T09:13:12.540Z"
integrationType: "modeling"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/38c14d54/66d86940d75a1237ceb976ac_tensorflow.png"
shortDescription: "Accelerate TensorFlow Model Development with ZenML"
docsUrl: "https://www.fuzzylabs.ai/blog-post/the-road-to-zen-part-1-getting-started-pipelines"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/5ff4a2fa/66e745170314d43f577134ff_tensorflow_integration.png"
seo:
  title: "Integrate TensorFlow with ZenML - Modeling Integrations"
  description: "Accelerate TensorFlow Model Development with ZenML"
  canonical: "https://www.zenml.io/integrations/tensorflow"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/5ff4a2fa/66e745170314d43f577134ff_tensorflow_integration.png"
  ogTitle: "Integrate TensorFlow with ZenML - Modeling Integrations"
  ogDescription: "Accelerate TensorFlow Model Development with ZenML"
overviewTitle: "Accelerate TensorFlow Model Development with ZenML"
overviewDescription: "Seamlessly integrate TensorFlow into your ZenML pipelines for efficient and scalable model development. Leverage TensorFlow's powerful machine learning capabilities within ZenML's structured MLOps framework to streamline your end-to-end ML workflow."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Streamlined TensorFlow Model Training<br>‍</strong>Effortlessly incorporate TensorFlow training steps into your ZenML pipelines for a seamless model development experience.</li><li id=\"\"><strong id=\"\">Scalable Machine Learning Workflows<br>‍</strong>Leverage ZenML's distributed computing capabilities to scale your TensorFlow training pipelines across multiple nodes and GPUs.</li><li id=\"\"><strong id=\"\">Reproducible and Versioned Models<br>‍</strong>Ensure reproducibility and traceability of your TensorFlow models with ZenML's built-in versioning and artifact tracking features.</li><li id=\"\"><strong id=\"\">Simplified Model Deployment<br>‍</strong>Seamlessly deploy your trained TensorFlow models using ZenML's deployment integrations, enabling rapid model serving and inference.</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Comprehensive machine learning framework</li><li id=\"\">Supports wide range of model architectures and algorithms</li><li id=\"\">Efficient training on CPUs, GPUs, and TPUs</li><li id=\"\">Extensive ecosystem of tools and libraries</li><li id=\"\">Strong community support and resources</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\nimport tensorflow as tf\nfrom zenml import step, pipeline\n\n@step\ndef load_dataset() -> tf.data.Dataset:\n    \"\"\"Step that loads and returns a tf.data.Dataset.\"\"\"\n    # For this example, we'll create a simple dataset\n    x = tf.random.normal((100, 5))\n    y = tf.random.uniform((100,), maxval=2, dtype=tf.int32)\n    dataset = tf.data.Dataset.from_tensor_slices((x, y))\n    return dataset.batch(32)\n\n@step\ndef train_tiny_model(dataset: tf.data.Dataset) -> tf.keras.Model:\n    \"\"\"Step that trains a tiny model using the input dataset.\"\"\"\n    model = tf.keras.Sequential([\n        tf.keras.layers.Dense(10, activation='relu', input_shape=(5,)),\n        tf.keras.layers.Dense(1, activation='sigmoid')\n    ])\n\n    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])\n\n    # Train for just one epoch\n    model.fit(dataset, epochs=1)\n\n    return model\n\n@pipeline(enable_cache=False)\ndef tiny_model_pipeline():\n    dataset = load_dataset()\n    model = train_tiny_model(dataset)\n\ntiny_model_pipeline()\n</code></pre></div><p>‍</p>"
documentationLinkText: "Blog: \"The Road to Zen: getting started with pipelines” (from FuzzyLabs) — includes an example of using TensorFlow with ZenML"
additionalResources:
  - label: "TensorFlow Official Website"
    href: "https://www.tensorflow.org/"
  - label: "TensorFlow Python SDK documentation"
    href: "https://www.tensorflow.org/api_docs/python/tf"
isUpdatedToNewFormat: true
---

<ul><li><strong>Streamlined TensorFlow Model Training<br /></strong>Effortlessly incorporate TensorFlow training steps into your ZenML pipelines for a seamless model development experience.</li><li><strong>Scalable Machine Learning Workflows<br /></strong>Leverage ZenML's distributed computing capabilities to scale your TensorFlow training pipelines across multiple nodes and GPUs.</li><li><strong>Reproducible and Versioned Models<br /></strong>Ensure reproducibility and traceability of your TensorFlow models with ZenML's built-in versioning and artifact tracking features.</li><li><strong>Simplified Model Deployment<br /></strong>Seamlessly deploy your trained TensorFlow models using ZenML's deployment integrations, enabling rapid model serving and inference.</li></ul>

<ul><li>Comprehensive machine learning framework</li><li>Supports wide range of model architectures and algorithms</li><li>Efficient training on CPUs, GPUs, and TPUs</li><li>Extensive ecosystem of tools and libraries</li><li>Strong community support and resources</li></ul>

```python
import tensorflow as tf
from zenml import step, pipeline

@step
def load_dataset() -> tf.data.Dataset:
    """Step that loads and returns a tf.data.Dataset."""
    # For this example, we'll create a simple dataset
    x = tf.random.normal((100, 5))
    y = tf.random.uniform((100,), maxval=2, dtype=tf.int32)
    dataset = tf.data.Dataset.from_tensor_slices((x, y))
    return dataset.batch(32)

@step
def train_tiny_model(dataset: tf.data.Dataset) -> tf.keras.Model:
    """Step that trains a tiny model using the input dataset."""
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(10, activation='relu', input_shape=(5,)),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])

    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

    # Train for just one epoch
    model.fit(dataset, epochs=1)

    return model

@pipeline(enable_cache=False)
def tiny_model_pipeline():
    dataset = load_dataset()
    model = train_tiny_model(dataset)

tiny_model_pipeline()
```

This code defines a simple ZenML pipeline that creates a small dataset using TensorFlow, trains a tiny neural network model on that dataset for one epoch, and returns the trained model. The pipeline consists of two steps: load_dataset() which generates a random dataset, and train_tiny_model() which defines and trains a small sequential model using the dataset. Finally, the tiny_model_pipeline() function orchestrates the pipeline by executing the steps in order and returning the trained model.