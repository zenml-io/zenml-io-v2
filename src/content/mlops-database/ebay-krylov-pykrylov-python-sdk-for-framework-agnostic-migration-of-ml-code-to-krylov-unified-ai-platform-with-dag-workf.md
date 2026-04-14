---
title: "PyKrylov Python SDK for framework-agnostic migration of ML code to Krylov unified AI platform with DAG workflows and distributed training"
slug: "ebay-krylov-pykrylov-python-sdk-for-framework-agnostic-migration-of-ml-code-to-krylov-unified-ai-platform-with-dag-workf"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "metadata-store"
  - "model-registry"
  - "pipeline-orchestration"
  - "docker"
  - "horovod"
  - "kubernetes"
  - "spark"
  - "deployment"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "training"
industryTags: "e-commerce"
company: "eBay"
companySlug: "ebay"
platformName: "Krylov"
contentType: "blog"
summary: "eBay developed PyKrylov, a Python SDK that provides researchers and engineers with a simplified interface to their Krylov unified AI platform. The primary challenge addressed was reducing the friction of migrating machine learning code from local environments to the production platform, eliminating infrastructure configuration overhead while maintaining framework agnosticism. PyKrylov abstracts infrastructure complexity behind a pythonic API that enables users to submit tasks, create complex DAG-based workflows for hyperparameter tuning, manage distributed training across multiple GPUs, and integrate with experiment and model management systems. The platform supports PyTorch, TensorFlow, Keras, and Horovod while also enabling execution on Hadoop and Spark, significantly increasing researcher productivity across eBay by allowing code onboarding with just a few additional lines without refactoring existing ML implementations."
link: "https://innovation.ebayinc.com/stories/pykrylov-accelerating-machine-learning-research-at-ebay/"
year: 2020
seo:
  title: "eBay: PyKrylov Python SDK for framework-agnostic migration of ML code to Krylov unified AI platform with DAG workflows and distributed training - ZenML MLOps Database"
  description: "eBay developed PyKrylov, a Python SDK that provides researchers and engineers with a simplified interface to their Krylov unified AI platform. The primary challenge addressed was reducing the friction of migrating machine learning code from local environments to the production platform, eliminating infrastructure configuration overhead while maintaining framework agnosticism. PyKrylov abstracts infrastructure complexity behind a pythonic API that enables users to submit tasks, create complex DAG-based workflows for hyperparameter tuning, manage distributed training across multiple GPUs, and integrate with experiment and model management systems. The platform supports PyTorch, TensorFlow, Keras, and Horovod while also enabling execution on Hadoop and Spark, significantly increasing researcher productivity across eBay by allowing code onboarding with just a few additional lines without refactoring existing ML implementations."
  canonical: "https://www.zenml.io/mlops-database/ebay-krylov-pykrylov-python-sdk-for-framework-agnostic-migration-of-ml-code-to-krylov-unified-ai-platform-with-dag-workf"
  ogTitle: "eBay: PyKrylov Python SDK for framework-agnostic migration of ML code to Krylov unified AI platform with DAG workflows and distributed training - ZenML MLOps Database"
  ogDescription: "eBay developed PyKrylov, a Python SDK that provides researchers and engineers with a simplified interface to their Krylov unified AI platform. The primary challenge addressed was reducing the friction of migrating machine learning code from local environments to the production platform, eliminating infrastructure configuration overhead while maintaining framework agnosticism. PyKrylov abstracts infrastructure complexity behind a pythonic API that enables users to submit tasks, create complex DAG-based workflows for hyperparameter tuning, manage distributed training across multiple GPUs, and integrate with experiment and model management systems. The platform supports PyTorch, TensorFlow, Keras, and Horovod while also enabling execution on Hadoop and Spark, significantly increasing researcher productivity across eBay by allowing code onboarding with just a few additional lines without refactoring existing ML implementations."
mlops:
  source: "sqlite"
  entryId: 38
  sourceUrl: "https://innovation.ebayinc.com/stories/pykrylov-accelerating-machine-learning-research-at-ebay/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.060721"
  lastUpdated: "2026-04-14T19:54:43.038229"
---

## Problem Context

eBay faced a common challenge in scaling machine learning operations across a large organization: the friction between local development environments and production ML platforms. Researchers and engineers were struggling with infrastructure configuration overhead when attempting to leverage powerful compute resources available on the Krylov AI platform. The migration path from local experimentation to platform execution typically required significant code refactoring, which slowed down research velocity and created barriers to platform adoption.

The core pain points included the need for researchers to understand and manage infrastructure details rather than focusing on ML logic, the complexity of creating multi-step ML workflows represented as directed acyclic graphs (DAGs), and the manual bookkeeping required for experiment tracking, hyperparameter tuning, and model management. Without a simplified interface, data scientists had to deal with JSON or YAML configuration files and complex infrastructure specifications, which added cognitive overhead and reduced productivity.

eBay's philosophy was clear: infrastructure configuration should be minimal, and ML logic should be completely abstracted from infrastructure and platform components. The team recognized that the platform would only achieve widespread adoption if the user experience was smooth and easy, with minimal overhead for onboarding existing code.

## Architecture & Design

PyKrylov is architected as a layered system sitting atop the Krylov core platform components. The design philosophy follows a clear separation of concerns with three distinct layers: the ML logic layer where researchers write their training code, the PyKrylov interface layer that abstracts infrastructure complexity, and the underlying Krylov core components that handle actual execution and resource management.

The fundamental building blocks of PyKrylov's architecture include the Session object, which serves as the primary interface for interacting with the platform, and the Task abstraction, which encapsulates user functions and their execution requirements. Tasks can be configured with various execution parameters including Docker images, compute resources (CPU or GPU models like V100, M40, or P100), and custom runtime settings. The Task class supports both Python functions through the standard Task interface and arbitrary shell commands through the ShellTask class, enabling polyglot execution.

Workflows in PyKrylov are represented as DAGs using Python's OrderedDict data structure, which provides a natural and intuitive way to express task dependencies. This design choice aligns with Python developers' existing mental models rather than introducing new DSLs or configuration formats. The workflow engine supports both sequential and parallel execution patterns, with built-in utilities for workflow transformation and hyperparameter search strategies.

For distributed training scenarios, PyKrylov provides specialized abstractions through the pykrylov.distributed package. The DistributedTask and DistShellTask classes handle the complexity of multi-node training by automatically generating framework-specific configuration files and setting up stable networking between pods. Krylov's infrastructure provides stable IP addresses for pods participating in distributed training, with automatic recovery and IP preservation if a pod fails during training, ensuring training runs can resume without manual intervention.

The platform integrates two critical management systems that extend beyond basic task execution. The Experiment Management System (EMS) provides centralized tracking of training runs, hyperparameters, metrics, logs, and artifacts through the pykrylov.ems module. The Model Management System (MMS) offers versioned storage for trained models with associated metadata, accessible through the pykrylov.mms module, creating a seamless bridge between training and inference workflows.

## Technical Implementation

PyKrylov is implemented as a pure Python SDK, designed to work with any ML framework available in the ecosystem. The implementation demonstrates framework agnosticism by supporting PyTorch, TensorFlow, Keras, and Horovod for deep learning workloads, while also enabling execution on Hadoop and Spark for data processing tasks. This flexibility is achieved through containerization, where users can specify custom Docker images for their tasks using the add_execution_parameter method.

The simplest usage pattern demonstrates the minimal overhead approach. Users wrap their existing Python functions in a Task object and submit them through a Session. The hello_world example in the source shows that adding platform execution requires only four additional lines: importing pykrylov, creating a Session, wrapping the function in a Task, and calling session.submit(). The actual function code remains unchanged, executing remotely on Krylov infrastructure despite being initiated from a local environment.

Resource specification is handled programmatically through method calls on Task objects. The run_on_gpu method allows users to request specific GPU models (V100, M40, P100) and quantities, while execution parameters like Docker images are added through the add_execution_parameter method. This programmatic configuration eliminates the need for separate configuration files and keeps all specification within the Python codebase.

Workflow construction leverages Python's OrderedDict to define task dependencies. Each key in the OrderedDict represents a task, and its corresponding value is a list of dependent tasks that should execute after completion. Sequential workflows are expressed by chaining single dependencies, while parallel workflows branch by having multiple tasks depend on a single predecessor.

PyKrylov provides functional utilities for workflow transformation that operate on existing workflow definitions. The parallelize function takes a sequential workflow and automatically generates parallel branches for hyperparameter tuning by cloning task subgraphs and parameterizing them with different values. The grid_search and random_search functions provide higher-level abstractions similar to scikit-learn's hyperparameter search utilities, accepting parameter grids and automatically generating exhaustive or randomized search workflows. The parameter_grid utility function creates Cartesian products of parameter lists, enabling comprehensive hyperparameter exploration.

Distributed training implementation handles the intricate coordination required for multi-node training. The DistributedTask class accepts a parallelism parameter specifying the number of worker nodes and automatically configures the necessary networking through service definitions. Services are defined with names and ports, and Krylov's infrastructure ensures stable IP addresses are assigned and maintained even through pod failures. The DistShellTask variant enables the same distributed capabilities for non-Python code, supporting arbitrary training implementations that can be launched via shell scripts.

The Experiment Management System integration is achieved through the pykrylov.ems module, which provides functions for experiment lifecycle management. The create_experiment function initializes a new experiment with a project name, experiment name, and configuration dictionary containing hyperparameters. During training, the write_metric function allows logging of scalar metrics with optional dimensions (such as training step or epoch), enabling time-series visualization of training curves. The system automatically associates experiments with the workflow run_id, creating a linkage between platform execution and experiment tracking.

Model Management System integration through pykrylov.mms enables programmatic model storage and retrieval. The create_model function uploads model files to the centralized repository with project namespace, model name, and tag identifiers. The system supports versioning through revisions, allowing multiple versions of the same model to coexist. The show_model function provides model discoverability, while download_revision enables retrieval of specific model versions or the latest revision for inference deployment.

## Scale & Performance

While the source material does not provide extensive quantitative metrics about scale and performance, several indicators suggest the platform operates at significant scale given eBay's size and the platform's company-wide adoption. The article mentions that PyKrylov is "used by researchers and engineers company wide," indicating broad organizational deployment across eBay's ML teams.

The distributed training capabilities support multiple GPU types including M40, P100, and V100 accelerators, suggesting the underlying infrastructure has diverse GPU resources available. The examples show parallelism parameters of 2 and 3 for distributed training tasks, though production workloads likely scale to much higher degrees of parallelism.

The hyperparameter tuning examples demonstrate workflows that can generate significant parallelism through Cartesian products. The grid_search example with learning rates of three values and dimensions of three values would create nine parallel training branches, and chaining multiple parallelize operations enables even larger parallel workflows for comprehensive hyperparameter exploration.

The platform's support for stable pod IPs and automatic recovery during distributed training suggests it handles long-running training jobs where failures are expected at scale. This infrastructure resilience is critical for multi-hour or multi-day training runs on expensive GPU resources.

The integration with experiment and model management systems implies the platform tracks substantial numbers of experiments and model versions across many projects and users. The design for centralized storage and versioning would be necessary to manage the artifacts generated by an organization of eBay's scale conducting extensive ML research.

## Trade-offs & Lessons

PyKrylov demonstrates several notable architectural decisions and their implications for ML platform design. The choice to build a pure Python SDK rather than a CLI tool or web interface reflects a deep understanding of the target user base—ML researchers and data scientists who live primarily in Python notebooks and scripts. This decision minimizes context switching and keeps all configuration and execution logic in the same codebase as the ML implementation.

The framework-agnostic design is a significant strength that avoids vendor lock-in to specific ML frameworks. By supporting PyTorch, TensorFlow, and other frameworks equally through containerization, the platform remains flexible as the ML ecosystem evolves and as different teams make different framework choices. This approach acknowledges that standardizing on a single framework across a large organization is often impractical and counterproductive.

The use of OrderedDict for workflow definition is an elegant design choice that leverages existing Python standard library components rather than inventing new DSLs. This reduces the learning curve for new users who already understand Python data structures. However, this approach may become unwieldy for very complex workflows with hundreds of tasks, where visual or declarative specifications might be more maintainable.

The emphasis on workflow transformation functions like parallelize and grid_search demonstrates sophisticated understanding of common ML research patterns. Rather than requiring users to manually construct large parallel DAGs for hyperparameter tuning, these utilities generate the structures programmatically. This reduces boilerplate and errors while encoding best practices into the platform itself.

The distributed training implementation's handling of stable IPs and automatic pod recovery addresses a critical pain point in distributed deep learning. Training runs that span hours or days on expensive GPU clusters cannot afford to fail completely when a single node experiences issues. The automatic recovery with IP preservation enables training frameworks to reconnect and resume, significantly improving resource utilization and researcher productivity.

The tight integration of experiment management and model management directly into the training SDK represents a key architectural decision. By making these capabilities first-class features of the platform rather than separate systems, PyKrylov ensures metadata tracking happens naturally as part of the training workflow. This is far more effective than expecting users to manually record experiment details in separate systems, which often leads to incomplete or missing metadata.

The "built by researchers for researchers" philosophy mentioned in the article appears to have been critical to the platform's success. This suggests the development team included actual ML practitioners who understood the pain points firsthand, rather than infrastructure engineers building in isolation. This user-centered design approach is evident in the minimal overhead for code migration and the pythonic API design.

One potential trade-off not explicitly discussed is the coupling between user code and the PyKrylov SDK. While the overhead is minimal, code that uses PyKrylov becomes platform-specific and may not run easily on other ML platforms without modification. Organizations should consider whether this coupling is acceptable given the productivity benefits, or whether an even thinner abstraction layer mapping to standards like Kubeflow would be preferable.

The article positions PyKrylov as "only half of the story" in democratizing ML at eBay, with future work planned for domain-specific tools for NLP and computer vision. This suggests a recognition that general-purpose infrastructure, while necessary, is insufficient for maximizing researcher productivity. Domain-specific abstractions that encode best practices for specific problem types can further reduce the time from idea to working model.

The platform's success in "accelerating machine learning research" and "increasing the productivity of researchers" indicates that the design goals were largely achieved. The minimal refactoring requirement and few-line code additions apparently provided enough friction reduction to drive substantial adoption across eBay's ML organization. This validates the architectural principle that ML platforms should meet users where they are rather than requiring them to conform to new paradigms.
