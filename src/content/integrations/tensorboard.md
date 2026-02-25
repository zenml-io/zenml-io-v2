---
title: "TensorBoard"
slug: "tensorboard"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8a8c14a039c9c7485b1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-11-06T08:57:00.751Z"
  lastUpdated: "2024-11-06T08:57:00.751Z"
  createdOn: "2023-10-12T09:13:12.477Z"
integrationType: "experiment-tracker"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/b3b611ec/672b2f55134b0393a0529d82_tensorboard_logo.png"
shortDescription: "Effortlessly Track and Visualize ML Experiments with TensorBoard and ZenML"
docsUrl: "https://docs.zenml.io/integrations/visualizers/tensorboard"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/tensorboard_integration"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/6837081e/6527e6b01b3197dd334bb82a_tensorboard_visualization_23fe9fe5a9.webp"
seo:
  title: "Integrate TensorBoard with ZenML - Experiment Tracker Integrations"
  description: "Effortlessly Track and Visualize ML Experiments with TensorBoard and ZenML"
  canonical: "https://www.zenml.io/integrations/tensorboard"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/6837081e/6527e6b01b3197dd334bb82a_tensorboard_visualization_23fe9fe5a9.webp"
  ogTitle: "Integrate TensorBoard with ZenML - Experiment Tracker Integrations"
  ogDescription: "Effortlessly Track and Visualize ML Experiments with TensorBoard and ZenML"
overviewTitle: "Effortlessly Track and Visualize ML Experiments with TensorBoard and ZenML"
overviewDescription: "Integrate TensorBoard, the powerful visualization toolkit, with ZenML to streamline the tracking and analysis of your machine learning experiments. This seamless integration enables you to monitor training progress, compare model performances, and gain valuable insights, all within the organized structure of ZenML pipelines."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Seamless Experiment Tracking</strong>: Automatically log and track experiment metrics, hyperparameters, and artifacts within ZenML pipelines.</li><li id=\"\"><strong id=\"\">Interactive Visualizations</strong>: Explore and analyze experiment results using TensorBoard's intuitive UI, directly integrated with ZenML.</li><li id=\"\"><strong id=\"\">Unified Experiment Management</strong>: Centralize experiment data and metadata in ZenML, enabling easy comparison and reproducibility.</li><li id=\"\"><strong id=\"\">Scalable and Customizable</strong>: Leverage ZenML's scalability features and customize TensorBoard logging to suit your project's needs.</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Real-time Metrics Visualization</strong>: Monitor training progress and key metrics in real-time using interactive dashboards.</li><li id=\"\"><strong id=\"\">Hyperparameter Comparison</strong>: Compare and analyze the impact of different hyperparameter configurations on model performance.</li><li id=\"\"><strong id=\"\">Embedding Projections</strong>: Visualize high-dimensional embeddings to gain insights into model representations.</li><li id=\"\"><strong id=\"\">Image and Audio Summaries</strong>: Explore and interpret model outputs for image and audio data.</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">from zenml import pipeline, step\nfrom zenml.integrations.tensorboard.visualizers.tensorboard_visualizer import TensorboardVisualizer\n\n# Step 1: Install the TensorBoard integration\n# Run this command in your terminal:\n# zenml integration install tensorboard\n\n# Step 2: Register the TensorBoard visualizer\n# Run this command in your terminal:\n# zenml visualizer register tensorboard_visualizer --flavor=tensorboard\n\n@step\ndef train_model():\n    # Your model training code here\n    # Log metrics, hyperparameters, and artifacts using TensorFlow or PyTorch APIs\n    pass\n\n@pipeline(visualizers=[TensorboardVisualizer()])\ndef training_pipeline():\n    train_model()\n\n# Run the pipeline\ntraining_pipeline()</code></pre></div>"
documentationLinkText: "ZenML TensorBoard Integration Documentation"
githubLinkText: "GitHub: ZenML TensorBoard Integration Example"
additionalResources:
  - label: "TensorBoard: TensorFlow's Visualization Toolkit"
    href: "https://www.tensorflow.org/tensorboard"
isUpdatedToNewFormat: false
---

<ul><li><strong>Seamless Experiment Tracking</strong>: Automatically log and track experiment metrics, hyperparameters, and artifacts within ZenML pipelines.</li><li><strong>Interactive Visualizations</strong>: Explore and analyze experiment results using TensorBoard's intuitive UI, directly integrated with ZenML.</li><li><strong>Unified Experiment Management</strong>: Centralize experiment data and metadata in ZenML, enabling easy comparison and reproducibility.</li><li><strong>Scalable and Customizable</strong>: Leverage ZenML's scalability features and customize TensorBoard logging to suit your project's needs.</li></ul>

<ul><li><strong>Real-time Metrics Visualization</strong>: Monitor training progress and key metrics in real-time using interactive dashboards.</li><li><strong>Hyperparameter Comparison</strong>: Compare and analyze the impact of different hyperparameter configurations on model performance.</li><li><strong>Embedding Projections</strong>: Visualize high-dimensional embeddings to gain insights into model representations.</li><li><strong>Image and Audio Summaries</strong>: Explore and interpret model outputs for image and audio data.</li></ul>

```python
from zenml import pipeline, step
from zenml.integrations.tensorboard.visualizers.tensorboard_visualizer import TensorboardVisualizer

# Step 1: Install the TensorBoard integration
# Run this command in your terminal:
# zenml integration install tensorboard

# Step 2: Register the TensorBoard visualizer
# Run this command in your terminal:
# zenml visualizer register tensorboard_visualizer --flavor=tensorboard

@step
def train_model():
    # Your model training code here
    # Log metrics, hyperparameters, and artifacts using TensorFlow or PyTorch APIs
    pass

@pipeline(visualizers=[TensorboardVisualizer()])
def training_pipeline():
    train_model()

# Run the pipeline
training_pipeline()
```
The code example demonstrates how to integrate TensorBoard with a ZenML pipeline. It starts by installing the TensorBoard integration and registering the TensorBoard visualizer. The train_model step represents the model training code, where metrics, hyperparameters, and artifacts are logged using TensorFlow or PyTorch APIs. The training_pipeline is defined with the TensorBoard visualizer specified, enabling automatic logging and visualization of experiment data. Finally, the pipeline is run, and the results can be viewed in the TensorBoard UI.