---
title: "Continuous Integration and Deployment for Machine Learning Online Serving and Models"
slug: "uber-michelangelo-continuous-integration-and-deployment-for-machine-learning-online-serving-and-models"
draft: false
mlopsTags:
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "docker"
  - "ab-testing"
  - "deployment"
  - "model-validation"
  - "serving"
  - "shadow-deployment"
industryTags: "automotive"
company: "Uber"
companySlug: "uber"
platformName: "Michelangelo"
contentType: "blog"
summary: "Uber developed a comprehensive CI/CD system for their Real-time Prediction Service to address the challenges of managing a rapidly growing number of machine learning models in production. The platform introduced dynamic model loading to decouple model and service deployment cycles, model auto-retirement to reduce memory footprint and resource costs, auto-shadow capabilities for automated traffic distribution during model rollout, and a three-stage validation strategy (staging integration test, canary integration test, production rollout) to ensure compatibility and behavior consistency across service releases. This infrastructure enabled Uber to support a large volume of daily model deployments while maintaining high availability and reducing the engineering overhead associated with common rollout patterns like gradual deployment and model shadowing."
link: "https://www.uber.com/blog/continuous-integration-deployment-ml/"
year: 2021
seo:
  title: "Uber: Continuous Integration and Deployment for Machine Learning Online Serving and Models - ZenML MLOps Database"
  description: "Uber developed a comprehensive CI/CD system for their Real-time Prediction Service to address the challenges of managing a rapidly growing number of machine learning models in production. The platform introduced dynamic model loading to decouple model and service deployment cycles, model auto-retirement to reduce memory footprint and resource costs, auto-shadow capabilities for automated traffic distribution during model rollout, and a three-stage validation strategy (staging integration test, canary integration test, production rollout) to ensure compatibility and behavior consistency across service releases. This infrastructure enabled Uber to support a large volume of daily model deployments while maintaining high availability and reducing the engineering overhead associated with common rollout patterns like gradual deployment and model shadowing."
  canonical: "https://www.zenml.io/mlops-database/uber-michelangelo-continuous-integration-and-deployment-for-machine-learning-online-serving-and-models"
  ogTitle: "Uber: Continuous Integration and Deployment for Machine Learning Online Serving and Models - ZenML MLOps Database"
  ogDescription: "Uber developed a comprehensive CI/CD system for their Real-time Prediction Service to address the challenges of managing a rapidly growing number of machine learning models in production. The platform introduced dynamic model loading to decouple model and service deployment cycles, model auto-retirement to reduce memory footprint and resource costs, auto-shadow capabilities for automated traffic distribution during model rollout, and a three-stage validation strategy (staging integration test, canary integration test, production rollout) to ensure compatibility and behavior consistency across service releases. This infrastructure enabled Uber to support a large volume of daily model deployments while maintaining high availability and reducing the engineering overhead associated with common rollout patterns like gradual deployment and model shadowing."
mlops:
  source: "sqlite"
  entryId: 15
  sourceUrl: "https://www.uber.com/blog/continuous-integration-deployment-ml/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060480"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Uber experienced significant growth in machine learning adoption across their organization, with models being deployed to power customer experience improvements, safety incident prevention, and market efficiency in real time. This rapid expansion created several critical MLOps challenges that their infrastructure needed to address.

The first major challenge was supporting a large volume of model deployments on a daily basis while maintaining high availability of the Real-time Prediction Service. The traditional approach of sealing model artifacts into Docker images and deploying models together with the service created a heavy, slow process that became a bottleneck for model iteration and caused friction between model developers and service developers.

The second challenge centered on memory management. As newly retrained models were continuously deployed, the memory footprint of Real-time Prediction Service instances grew substantially. Large numbers of models increased the time required for model downloading and loading during instance restarts. Uber observed that a significant portion of older models received no traffic after newer models were deployed, yet they remained loaded in memory, creating unnecessary resource consumption. This large memory footprint led to Java garbage collection pauses and potential out-of-memory errors, both of which negatively impacted quality of service.

The third challenge involved model rollout strategies. Machine learning engineers needed flexibility to roll out models through different stages such as shadow deployments, testing environments, or experimentation phases. Teams were repeatedly implementing common patterns like gradual rollouts and model shadowing, which represented significant duplicated engineering effort across the organization.

The fourth challenge was ensuring that service software deployments maintained compatibility with existing production models. While the Model Deployment Service performed validation by making prediction calls with sampled data during model deployment, it did not verify compatibility against existing models already running in Real-time Prediction Services. This created risk that models might fail to load, exhibit different behavior, or break entirely when deployed to production instances running newer service versions due to dependency changes, build script modifications, or interface changes between releases. This was particularly critical because identifying behavioral changes in model predictions is difficult but essential for correctness.

## Architecture & Design

Uber's solution involved building separate but coordinated CI/CD pipelines for both models and service binaries, creating a comprehensive system architecture with several key components.

The **Model Artifact & Config Store** serves as the source of truth for which models should be served in production. This centralized store holds the target state that Real-time Prediction Service instances periodically poll to determine what models to load or retire. This design enables dynamic model loading without requiring service restarts.

The **Model Deployment Service** orchestrates the deployment workflow and provides APIs for machine learning engineers to deploy new models and retire unused ones. It handles artifact validation, model compilation into self-contained packages, and serving validation before models enter production. The service maintains a centralized metadata storage system that tracks deployment progress and model health information.

The **Real-time Prediction Service** instances form a fleet of containers that perform actual model inference. Each instance periodically checks the Model Artifact & Config Store, compares the target state with its local state, and triggers loading of new models or removal of retired models accordingly. This dynamic loading mechanism decouples the model development cycle from the service development cycle.

The **Auto-Retirement Workflow** monitors model usage patterns and automatically retires models that have not been used beyond a configured expiration period. Before retirement, the system sends warning notifications to model owners, providing an opportunity to intervene if the model should remain active.

The **Auto-Shadow System** is integrated directly into the Real-time Prediction Service and manages traffic distribution for model shadowing scenarios. It checks auto-shadow configurations and routes traffic accordingly, supporting relationships where primary models can be shadowed by multiple shadow models and vice versa. The system intelligently fetches only the incremental features needed for shadow models from the online feature store when they share common features with primary models.

The **Online Feature Store** integration allows the Real-time Prediction Service to fetch features dynamically. The auto-shadow system optimizes this by only retrieving features required for shadow models that are not already being used by primary models, reducing redundant feature fetching.

Data flows through the system in several key paths. For model deployment, machine learning engineers submit models through the API, which triggers artifact validation, compilation into JAR packages, and serving validation with example data. Once validated, the model package is stored in the Model Artifact & Config Store. Real-time Prediction Service instances poll this store, detect new models, download the packages, and load them into memory. The instances then begin serving predictions for the new models.

For health monitoring, the system continuously tracks deployment progress by posting updates to centralized metadata storage. After deployment completes, models enter a health check process that runs periodically to verify model health and collect usage statistics. This information feeds back into the auto-retirement system.

Traffic distribution for shadowing works by the Real-time Prediction Service evaluating auto-shadow configurations when prediction requests arrive. For models configured with shadow relationships, the service duplicates or samples traffic to shadow models while serving the primary model's predictions to production. Results from shadow models are logged for analysis but not used in production responses.

## Technical Implementation

The Real-time Prediction Service uses **Docker containers** to package and deploy service instances. Models are compiled into **JAR packages** that can be dynamically loaded into running Java-based service instances, indicating the platform is built on the JVM ecosystem.

The dynamic model loading mechanism works through a **polling-based reconciliation loop**. Service instances periodically check the Model Artifact & Config Store, perform a diff between the desired state and local state, and reconcile differences by loading new models or unloading retired ones. This approach avoids the need for complex distributed coordination or push-based mechanisms.

The model compilation step packages all model artifacts and metadata into self-contained, loadable packages. These packages must include all necessary artifacts for both serving and monitoring. The compilation process ensures models are portable and can be loaded consistently across different Real-time Prediction Service instances.

**Serving validation** occurs locally during the model deployment workflow. The system loads the compiled model JAR in an isolated environment and performs prediction calls using example data from the training dataset. This validation ensures the model can execute successfully and is compatible with the Real-time Prediction Service runtime before the model becomes available to production instances.

The **three-stage validation strategy** for service releases includes:

- **Staging integration tests** run against non-production environments to verify basic functionality of the new service binary. This stage catches obvious breakages like build failures, dependency conflicts, or major API incompatibilities.

- **Canary integration tests** execute against the full set of production models but in a non-production environment. This critical stage ensures that the new service release maintains consistent serving performance and behavior across all production models, catching subtle compatibility issues or behavioral regressions.

- **Production rollout** deploys the validated release to all Real-time Prediction Service production instances using a rolling deployment strategy, which allows gradual rollout with the ability to halt and rollback if issues emerge.

The auto-shadow feature leverages several optimization strategies. By combining **built-in prediction logging logic with shadow sampling logic**, the Real-time Prediction Service reduces shadow traffic to only those predictions that will actually be logged, avoiding unnecessary computation. The system treats shadow models as **second-class citizens** under load pressure, allowing them to be paused or resumed to relieve resource constraints without impacting primary model serving.

The **metadata storage system** is centralized and receives updates from both the deployment workflow (for progress tracking) and the health check process (for usage and health metrics). This provides a unified view of model status across the entire fleet.

## Scale & Performance

While the article does not provide specific quantitative metrics like requests per second or exact model counts, several indicators point to substantial scale. Uber mentions experiencing "a significant increase in machine learning adoption" with a "large volume of model deployments on a daily basis." The organization deploys models that serve "millions of predictions" for individual primary models, and prediction logs are sampled due to the volume.

The fleet-based architecture manages multiple Real-time Prediction Service instances, indicating horizontal scaling to handle load. The emphasis on memory footprint management and garbage collection concerns suggests services handle substantial concurrent model counts within individual containers.

The auto-retirement feature delivered "a non-trivial reduction in resource footprint," demonstrating measurable impact on infrastructure costs and performance. By removing unused models from memory, Uber reduced the occurrence of Java garbage collection pauses and out-of-memory errors.

The auto-shadow optimization that fetches only incremental features for shadow models provides performance benefits at scale. When primary and shadow models share most features (which is common in workflows that regularly retrain models), avoiding redundant feature fetching reduces load on the online feature store and decreases prediction latency.

The shadowing time windows typically span "days or weeks," indicating that shadow deployments run for extended periods while collecting sufficient data for analysis. Shadow traffic can be configured at 100% or sampled based on criteria, providing flexibility for different validation requirements.

## Trade-offs & Lessons

The shift from sealed Docker images to **dynamic model loading** represents a fundamental architectural trade-off. While the previous approach of building models into container images provided strong guarantees about reproducibility and dependency compatibility, it created an unacceptable bottleneck for model iteration. Dynamic loading introduced new complexity around state management, failure modes, and ensuring loaded models remain compatible with service versions, but it successfully decoupled development cycles and enabled much faster model iteration.

The **multi-stage model deployment workflow** with artifact validation, compilation, and serving validation adds latency to the deployment process but proved essential for maintaining Real-time Prediction Service stability. Since multiple models share the same container, a single bad model could cause prediction failures or disrupt other models. The validation investment prevents these cascading failures and maintains overall platform reliability.

The **auto-retirement feature** solved a human factors problem through automation. Rather than relying on engineers to manually clean up unused models (which they frequently forgot to do), the system automatically handles retirement based on usage patterns and configured expiration periods. The warning notification mechanism provides a safety net, allowing owners to prevent retirement if needed while defaulting to cleanup.

Building **auto-shadow directly into the platform** rather than leaving it as a client-side concern demonstrates Uber's recognition of common patterns across teams. This platform-level implementation provides several advantages: reduced engineering hours on repetitive implementations, optimized feature fetching, intelligent sampling of shadow traffic, and the ability to deprioritize shadow models under load. However, it also means the platform team must support a wider range of configuration options and shadow strategies.

The **three-stage validation strategy** for service releases addresses a critical gap in model-only validation. Even if individual models pass deployment validation, service version changes can introduce incompatibilities or behavioral changes that only manifest when models run in production service instances. The canary integration tests against all production models catch these issues before they impact production. This represents a significant investment in testing infrastructure but is essential for maintaining correctness at scale.

The article highlights an important challenge around **behavioral changes versus hard failures**. While it's relatively straightforward to detect when a model fails to load or crashes during prediction, identifying subtle behavioral changes in predictions is "difficult to identify and fix" but "critical to a model's correctness." The canary integration testing helps address this by comparing behavior between service versions.

Uber's approach of **treating shadow models as second-class models** during load pressure demonstrates pragmatic priority management. Since shadow predictions are not used in production, degrading or pausing shadow serving to protect primary model serving makes sense. This requires careful system design to isolate shadow execution and monitor system pressure.

The platform team explicitly acknowledges that new challenges continue to emerge as they support new use cases. They mention ongoing work on near real-time monitoring for inference accuracy, feature quality, and business metrics; deploying multi-task learning and hybrid models; feature validation; improved model fallback mechanisms; and enhanced model traceability and debuggability. This demonstrates the iterative nature of MLOps infrastructure development and the need for continuous platform evolution.

A key insight for practitioners is the value of **separating but coordinating model and service CI/CD pipelines**. This separation allows independent iteration while the coordination through comprehensive testing ensures compatibility. The approach scales better than monolithic deployment strategies while maintaining reliability.

The emphasis on **built-in platform features for common patterns** (like auto-shadow and auto-retirement) reflects a mature platform strategy. Rather than documenting patterns and expecting teams to implement them repeatedly, embedding these patterns in the platform reduces engineering toil and enables optimizations that would be difficult to achieve in client implementations.

The challenges Uber describes—managing deployment volume, controlling memory footprint, supporting diverse rollout strategies, and ensuring compatibility across versions—represent common MLOps concerns that most organizations face as they scale machine learning. Their solutions provide a blueprint for addressing these challenges through architectural patterns like dynamic loading, automated lifecycle management, platform-level rollout support, and comprehensive integration testing.
