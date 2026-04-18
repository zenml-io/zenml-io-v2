---
title: "Merlin: Jupyter-First ML Model Deployment Platform on Kubernetes with KFServing, MLflow, Canary and Monitoring"
slug: "gojek-gojeks-ml-platform-merlin-jupyter-first-ml-model-deployment-platform-on-kubernetes-with-kfserving-mlflow-canary-an"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "mlflow"
  - "deployment"
  - "serving"
industryTags: "automotive"
company: "Gojek"
companySlug: "gojek"
platformName: "Gojek's ML platform"
contentType: "blog"
summary: "Gojek developed Merlin, a model deployment and serving platform, to address the challenge that data scientists faced when trying to move models from training to production. Data scientists typically struggled with unfamiliar infrastructure technologies like Docker, Kubernetes, and monitoring tools, requiring lengthy partnerships with engineering teams to deploy models. Merlin provides a self-service, Jupyter notebook-first experience that enables data scientists to deploy models in under 10 minutes, supporting popular frameworks like xgboost, sklearn, TensorFlow, and PyTorch. Built on Kubernetes with KFServing, Knative, Istio, and MLflow, Merlin offers features including traffic management for canary and blue-green deployments, automatic scaling for cost efficiency, and out-of-the-box monitoring, significantly reducing time-to-market for ML models at Gojek."
link: "https://www.gojek.io/blog/merlin-making-ml-model-deployments-magical"
year: 2019
seo:
  title: "Gojek: Merlin: Jupyter-First ML Model Deployment Platform on Kubernetes with KFServing, MLflow, Canary and Monitoring - ZenML MLOps Database"
  description: "Gojek developed Merlin, a model deployment and serving platform, to address the challenge that data scientists faced when trying to move models from training to production. Data scientists typically struggled with unfamiliar infrastructure technologies like Docker, Kubernetes, and monitoring tools, requiring lengthy partnerships with engineering teams to deploy models. Merlin provides a self-service, Jupyter notebook-first experience that enables data scientists to deploy models in under 10 minutes, supporting popular frameworks like xgboost, sklearn, TensorFlow, and PyTorch. Built on Kubernetes with KFServing, Knative, Istio, and MLflow, Merlin offers features including traffic management for canary and blue-green deployments, automatic scaling for cost efficiency, and out-of-the-box monitoring, significantly reducing time-to-market for ML models at Gojek."
  canonical: "https://www.zenml.io/mlops-database/gojek-gojeks-ml-platform-merlin-jupyter-first-ml-model-deployment-platform-on-kubernetes-with-kfserving-mlflow-canary-an"
  ogTitle: "Gojek: Merlin: Jupyter-First ML Model Deployment Platform on Kubernetes with KFServing, MLflow, Canary and Monitoring - ZenML MLOps Database"
  ogDescription: "Gojek developed Merlin, a model deployment and serving platform, to address the challenge that data scientists faced when trying to move models from training to production. Data scientists typically struggled with unfamiliar infrastructure technologies like Docker, Kubernetes, and monitoring tools, requiring lengthy partnerships with engineering teams to deploy models. Merlin provides a self-service, Jupyter notebook-first experience that enables data scientists to deploy models in under 10 minutes, supporting popular frameworks like xgboost, sklearn, TensorFlow, and PyTorch. Built on Kubernetes with KFServing, Knative, Istio, and MLflow, Merlin offers features including traffic management for canary and blue-green deployments, automatic scaling for cost efficiency, and out-of-the-box monitoring, significantly reducing time-to-market for ML models at Gojek."
mlops:
  source: "sqlite"
  entryId: 65
  sourceUrl: "https://www.gojek.io/blog/merlin-making-ml-model-deployments-magical"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061015"
  lastUpdated: "2026-04-14T19:54:51.311318"
---

## Problem Context

Gojek's data scientists faced a significant productivity bottleneck at the deployment stage of the ML lifecycle. While data scientists were proficient in Python or R, familiar with numerous ML libraries including TensorFlow, xgboost, gbm, and H2O, and comfortable working in Jupyter notebooks, the journey from trained model to production service required navigating an entirely different technology ecosystem. This new world included Docker, Kubernetes, Jenkins, nginx, REST APIs, protobuf, ELK stack, and Grafana—tools that typically fell outside a data scientist's core expertise.

The traditional deployment workflow required data scientists to partner with software or infrastructure engineers, who would guide them through setting up build and deployment pipelines, configuring monitoring and alerting systems, creating microservice wrappers, and establishing other critical automation and infrastructure components. This collaboration, while necessary, created several pain points. Development cycles stretched longer than desired, extending time-to-market for new models. Data scientists experienced frustration at being unable to independently deploy their work and see tangible results. Business and product managers questioned the delays between model completion and production deployment. Engineers found themselves repeatedly interrupted to walk data scientists through the same tedious processes and technology stack.

Beyond the tooling complexity, production systems demanded attention to engineering concerns that differed from model development priorities. Teams needed to ensure low latency, high availability, and cost efficiency as part of service level objectives, enforced through robust monitoring and alerting infrastructure. Production systems also required support for safe iterative deployment practices like canary releases and blue-green deployments, recognizing that any initial model deployment would be followed by many refinements and updates over time.

## Architecture & Design

Merlin positions itself as the deployment and serving component within Gojek's broader Machine Learning Platform, specifically addressing the end stages of the ML lifecycle after model training and validation. The platform is designed around several core architectural principles that directly address the identified pain points.

The system architecture emphasizes a self-service model with first-class Python support, recognizing that Python represents the lingua franca of data science. The platform provides a Jupyter notebook-first experience, allowing data scientists to remain in their familiar development environment throughout the deployment process. Rather than forcing context switches to unfamiliar tools, Merlin brings deployment capabilities directly into the notebook through its SDK.

Merlin's design incorporates a model registry powered by MLflow for artifact management, ensuring that trained models are versioned and tracked appropriately. The deployment pipeline is highly automated—when a data scientist initiates deployment through the SDK, Merlin orchestrates the containerization process, builds Docker images using Kaniko (a container image builder that doesn't require Docker daemon privileges), and manages the deployment to Kubernetes infrastructure.

The serving architecture leverages KFServing, a Kubernetes-native model serving solution that provides standardized inference protocols. This is combined with Knative for serverless capabilities, enabling automatic scaling based on traffic patterns, and Istio for service mesh functionality that enables sophisticated traffic management. This architectural stack allows Merlin to provide advanced deployment patterns like canary releases (gradually routing traffic to new model versions), blue-green deployments (maintaining two production environments for zero-downtime switches), and shadow deployments (routing traffic to new models for testing without affecting production responses).

The platform includes a web-based ML Platform console that provides visibility into the deployment process and model serving status. This console complements the SDK experience, giving data scientists a visual interface for monitoring deployments and managing traffic routing between different model versions.

## Technical Implementation

Merlin's technical implementation brings together a carefully selected stack of modern open-source technologies, each chosen to address specific aspects of the model serving challenge.

At the infrastructure layer, Merlin runs on Kubernetes for orchestrating production services. This provides the foundational platform for container management, resource allocation, and service availability. The choice of Kubernetes aligns with industry best practices and ensures Merlin can leverage the extensive ecosystem of cloud-native tools.

For the serving layer, Merlin integrates KFServing, a component from the Kubeflow project that provides standardized, production-ready ML model serving with support for common frameworks. KFServing handles the protocol-level details of serving predictions and provides features like request/response logging, batching, and explainability.

Knative sits alongside KFServing to provide serverless capabilities. This enables Merlin's cost-efficiency goal by automatically scaling services down to zero when idle, eliminating resource consumption for unused models. When requests arrive, Knative handles the scale-up, balancing the trade-off between cold-start latency and cost efficiency.

Istio provides the service mesh layer, enabling sophisticated traffic management capabilities. Through Istio, Merlin can precisely control how requests are routed between different model versions, implementing canary deployments where a small percentage of traffic goes to a new version, or blue-green deployments where traffic switches atomically between versions.

MLflow serves as the model registry and artifact store, managing model versions and metadata. When a data scientist trains a model, they can log it to MLflow, and Merlin can then deploy directly from the MLflow registry, ensuring clear lineage from training to serving.

For containerization, Merlin uses Kaniko rather than traditional Docker builds. Kaniko builds container images inside Kubernetes without requiring privileged access to a Docker daemon, improving security and simplifying the build infrastructure. This architectural choice demonstrates attention to operational security considerations.

The Merlin SDK, which data scientists interact with directly from Jupyter notebooks, abstracts all this complexity. The SDK supports multiple model types out of the box, including xgboost, scikit-learn, TensorFlow, and PyTorch. For these standard frameworks, deployment is extremely straightforward—data scientists simply pass their trained model object to the Merlin API. For custom models or specialized preprocessing logic, Merlin also supports user-defined models where data scientists can provide arbitrary Python code that implements a standard interface.

Monitoring integration is built into the platform, with model serving metrics automatically exposed and available through Gojek's internal monitoring platform. This provides out-of-the-box visibility into key metrics without requiring data scientists to manually configure dashboards or alerts.

## Scale & Performance

While the article doesn't provide exhaustive quantitative metrics, several performance characteristics are highlighted that speak to Merlin's efficiency goals.

The deployment speed represents a major improvement over previous workflows. Merlin enables deployment from a pre-trained model to a functioning web service endpoint in under 10 minutes. This dramatic reduction in deployment time—from what would typically be hours or days involving multiple teams—enables rapid iteration and experimentation in production environments.

The platform is described as providing low overhead and high throughput capabilities, able to handle "huge traffic loads," though specific requests-per-second figures aren't provided. The architectural choices—using Kubernetes for orchestration, KFServing for optimized serving, and Istio for efficient traffic routing—suggest the platform is designed for production-scale workloads typical of a company like Gojek operating ride-hailing and delivery services across Southeast Asia.

Cost efficiency is addressed through automatic scaling, particularly the ability to scale idle services down to zero. This is especially important in environments with many models, where some may receive intermittent traffic. The Knative-based approach allows Merlin to achieve density improvements by not consuming resources for unused services, while still maintaining the ability to serve requests when they arrive.

The article mentions that Merlin was being gradually rolled out to more production systems as of the writing, suggesting validation of the platform's reliability and performance characteristics. The "very favourable responses" from data scientists indicate that the platform successfully met its latency and usability goals in practice.

## Trade-offs & Lessons

Merlin's design reflects several important trade-offs and architectural decisions that offer lessons for organizations building similar platforms.

The choice to build on Kubernetes and the cloud-native ecosystem (KFServing, Knative, Istio) represents a significant commitment to modern infrastructure patterns. This approach provides access to powerful capabilities like automatic scaling, traffic splitting, and standardized APIs, but requires substantial platform engineering expertise to operate reliably. Organizations considering this path must be prepared to invest in Kubernetes expertise and accept the operational complexity that comes with a sophisticated service mesh architecture. The benefit, as Gojek demonstrates, is a highly capable platform that can support diverse deployment patterns and scale efficiently.

The emphasis on self-service and Jupyter notebook integration shows a strong product philosophy focused on data scientist productivity. By meeting data scientists in their native environment rather than forcing them to learn new tools, Merlin reduces friction and accelerates adoption. This approach requires careful API design and strong abstractions that hide complexity without sacrificing necessary functionality. The support for both standard framework models and user-defined models strikes a balance between simplicity for common cases and flexibility for specialized needs.

The integration of MLflow for model registry demonstrates the value of leveraging existing, well-adopted tools rather than building everything from scratch. MLflow had already established itself as a standard for experiment tracking and model management, so building on it provided immediate familiarity and reduced the scope of custom development.

The platform's architecture around traffic management capabilities—supporting canary, blue-green, and shadow deployments—reflects mature thinking about production model operations. These features acknowledge that model deployment isn't a one-time event but an ongoing process of iteration and improvement. Safe deployment patterns reduce the risk of model updates and enable data scientists to deploy more confidently without extensive engineering oversight.

One notable aspect is the roadmap mentioned for future development: stream-to-stream inference, gRPC support, and improved log management. The stream-to-stream inference capability suggests recognition that not all models fit the request-response paradigm, and that real-time streaming use cases require different architectural patterns. The gRPC support would enable more efficient binary protocols beyond REST, important for high-throughput scenarios. These planned features indicate that the initial Merlin release focused on the most common deployment patterns, with plans to expand to more specialized use cases.

The project's stated goal of doing "for ML models what Heroku did for Web applications" encapsulates an important lesson about platform design: the value of radical simplification for the common case. Heroku succeeded by making web application deployment trivially simple, even though it abstracted away control that some users eventually needed. Merlin follows a similar philosophy, prioritizing ease of use and fast iteration while still providing escape hatches for advanced users through custom model code and traffic management controls.

The gradual rollout approach mentioned in the article reflects operational maturity. Rather than attempting a big-bang migration, the team validated Merlin with early users and incrementally expanded to more production systems. This de-risks platform adoption and allows the team to refine the system based on real-world feedback before it becomes mission-critical infrastructure.

The article also hints at the organizational impact of such platforms. By eliminating the need for data scientists to repeatedly partner with engineers for deployment tasks, Merlin likely improved velocity for both roles—data scientists gained independence, while engineers were freed from repetitive deployment support to focus on higher-leverage platform improvements. This organizational efficiency gain may ultimately be as important as the technical capabilities themselves.
