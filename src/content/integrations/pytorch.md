---
title: "PyTorch"
slug: "pytorch"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8a702d77560c9f7f1ca"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-15T10:32:30.260Z"
  createdOn: "2023-10-12T09:13:11.985Z"
integrationType: "modeling"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/91adb6a0/66d8697044edeccaa59362aa_pytorch.png"
shortDescription: "Accelerate your PyTorch model development with ZenML"
docsUrl: "https://sdkdocs.zenml.io/0.41.0/integration_code_docs/integrations-pytorch/"
githubUrl: "https://github.com/zenml-io/zenml-projects/tree/main/llm-litgpt-finetuning"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/bee3469d/66ed566047b3b214b8102483_image__26_.png"
seo:
  title: "Integrate PyTorch with ZenML - Modeling Integrations"
  description: "Accelerate your PyTorch model development with ZenML"
  canonical: "https://www.zenml.io/integrations/pytorch"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/bee3469d/66ed566047b3b214b8102483_image__26_.png"
  ogTitle: "Integrate PyTorch with ZenML - Modeling Integrations"
  ogDescription: "Accelerate your PyTorch model development with ZenML"
---

<ul><li><strong>Seamless PyTorch Integration</strong>: <br />Effortlessly incorporate PyTorch models and training logic into ZenML pipelines for a unified workflow.</li><li><strong>Reproducible Experiments</strong>: <br />Track and version PyTorch data objects and models using ZenML, ensuring reproducibility and facilitating collaboration.</li><li><strong>Effortless Handling of PyTorch Data Artifacts and Models:</strong> <br />ZenML knows how to serialize PyTorch artifacts like DataLoader and Module and allows you to use them across steps in different environments.</li><li><strong>Streamlined Deployment</strong>: <br />Seamlessly transition PyTorch models from experimentation to production using ZenML's deployment integrations.</li></ul>

<ul><li>Flexible and expressive deep learning framework.</li><li>Extensive ecosystem of pre-trained models and extensions.</li><li>Optimizers, loss functions and other pre-defined helper classes to use out of the box.</li><li>Strong community support and comprehensive documentation.</li><li>Interoperability with popular data science tools and libraries.</li></ul>

```python
from zenml import pipeline
from zenml.integrations.constants import PYTORCH
from torch import nn
from torch.utils.data import DataLoader

@step(enable_cache=False)
def trainer(train_dataloader: DataLoader) -> nn.Module:
    """Trains on the train dataloader."""
    model = NeuralNetwork().to(DEVICE)  # NeuralNetwork extends nn.Module
    loss_fn = nn.CrossEntropyLoss()
    optimizer = torch.optim.SGD(model.parameters(), lr=1e-3)
    size = len(train_dataloader.dataset)
    model.train()
    for batch, (X, y) in enumerate(train_dataloader):
        X, y = X.to(DEVICE), y.to(DEVICE)

        # Compute prediction error
        pred = model(X)
        loss = loss_fn(pred, y)

        # Backpropagation
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        if batch % 100 == 0:
            loss, current = loss.item(), batch * len(X)
            print(f"loss: {loss:>7f}  [{current:>5d}/{size:>5d}]")
    return model

@pipeline()
def fashion_mnist_pipeline():
    """Link all the steps and artifacts together."""
    train_dataloader, test_dataloader = importer_mnist()
    model = trainer(train_dataloader)
    evaluator(test_dataloader=test_dataloader, model=model)
```
This code example demonstrates a simple ZenML pipeline that incorporates a PyTorch model training step.

The data loader step (`importer_mnist`) returns a PyTorch `DataLoader` object that is serialized by ZenML and made available to the `trainer` step.

ZenML automatically tracks and versions your `DataLoader` and `Module` objects on every pipeline run. This helps you establish a lineage and makes reproducing runs easier.

The `train_model` step uses a PyTorch neural network module and trains it using random input data. The loss function definition and the optimizer are also used from PyTorch directly. The PyTorch ZenML Integration knows how to serialize the `Module` class and can load it in future steps from your ZenML artifact store.

