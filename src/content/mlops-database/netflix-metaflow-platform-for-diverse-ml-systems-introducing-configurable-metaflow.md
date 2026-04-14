---
title: "Introducing Configurable Metaflow"
slug: "netflix-metaflow-platform-for-diverse-ml-systems-introducing-configurable-metaflow"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "metadata-store"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "argo"
  - "metaflow"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "training"
industryTags: "media-entertainment"
company: "Netflix"
companySlug: "netflix"
platformName: "Metaflow + “platform for diverse ML systems”"
contentType: "blog"
summary: "Netflix introduced Configurable Metaflow to address a long-standing gap in their ML platform: the need to deploy and manage sets of closely related flows with different configurations without modifying code. The solution introduces a Config object that allows practitioners to configure all aspects of flows—including decorators for resource requirements, scheduling, and dependencies—before deployment using human-readable configuration files. This feature enables teams at Netflix to manage thousands of unique Metaflow flows more efficiently, supporting use cases from experimentation with model variants to large-scale parameter sweeps, while maintaining Metaflow's versioning, reproducibility, and collaboration features. The Config system complements existing Parameters and artifacts by resolving at deployment time rather than runtime, and integrates seamlessly with Netflix's internal tooling like Metaboost, which orchestrates cross-platform ML projects spanning ETL workflows, ML pipelines, and data warehouse tables."
link: "https://netflixtechblog.com/introducing-configurable-metaflow-d2fb8e9ba1c6"
year: 2024
seo:
  title: "Netflix: Introducing Configurable Metaflow - ZenML MLOps Database"
  description: "Netflix introduced Configurable Metaflow to address a long-standing gap in their ML platform: the need to deploy and manage sets of closely related flows with different configurations without modifying code. The solution introduces a Config object that allows practitioners to configure all aspects of flows—including decorators for resource requirements, scheduling, and dependencies—before deployment using human-readable configuration files. This feature enables teams at Netflix to manage thousands of unique Metaflow flows more efficiently, supporting use cases from experimentation with model variants to large-scale parameter sweeps, while maintaining Metaflow's versioning, reproducibility, and collaboration features. The Config system complements existing Parameters and artifacts by resolving at deployment time rather than runtime, and integrates seamlessly with Netflix's internal tooling like Metaboost, which orchestrates cross-platform ML projects spanning ETL workflows, ML pipelines, and data warehouse tables."
  canonical: "https://www.zenml.io/mlops-database/netflix-metaflow-platform-for-diverse-ml-systems-introducing-configurable-metaflow"
  ogTitle: "Netflix: Introducing Configurable Metaflow - ZenML MLOps Database"
  ogDescription: "Netflix introduced Configurable Metaflow to address a long-standing gap in their ML platform: the need to deploy and manage sets of closely related flows with different configurations without modifying code. The solution introduces a Config object that allows practitioners to configure all aspects of flows—including decorators for resource requirements, scheduling, and dependencies—before deployment using human-readable configuration files. This feature enables teams at Netflix to manage thousands of unique Metaflow flows more efficiently, supporting use cases from experimentation with model variants to large-scale parameter sweeps, while maintaining Metaflow's versioning, reproducibility, and collaboration features. The Config system complements existing Parameters and artifacts by resolving at deployment time rather than runtime, and integrates seamlessly with Netflix's internal tooling like Metaboost, which orchestrates cross-platform ML projects spanning ETL workflows, ML pipelines, and data warehouse tables."
mlops:
  source: "sqlite"
  entryId: 171
  sourceUrl: "https://netflixtechblog.com/introducing-configurable-metaflow-d2fb8e9ba1c6"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.616625"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Netflix operates at significant scale in the ML/MLOps space, managing thousands of unique Metaflow flows across diverse use cases ranging from content decision support systems to subtitle ranking algorithms. These projects are under constant development by dedicated teams with their own business goals and development practices. A recurring pattern emerged across Netflix teams: the need to deploy sets of closely related flows, often as part of larger pipelines involving table creation, ETLs, and deployment jobs, while experimenting with variants that test new data, parameterizations, or algorithms without changing the underlying code structure.

Prior to this feature, teams built bespoke solutions leveraging Metaflow's JSON-typed Parameters, IncludeFile, and deploy-time Parameters, or developed home-grown configuration systems with significant pain points. However, none of these solutions made it easy to configure all aspects of flow behavior, particularly decorators like resource requirements, scheduling cadences, or dependency specifications. The Metaflow community beyond Netflix echoed similar needs, frequently asking how to adjust resource requirements without hardcoding values or how to modify triggering schedules programmatically for different deployment environments like production versus staging.

The challenge was to provide a configuration mechanism that remained un-opinionated at the appropriate abstraction level—true to Metaflow's design philosophy of adapting to team-specific needs rather than forcing teams to adapt to the framework. The solution needed to enable configuration of flows without sacrificing Metaflow's built-in best practices for collaboration, versioning, dependency management, and observability that had already enabled millions of experiments at Netflix.

## Architecture & Design

The Configurable Metaflow feature introduces a Config object as a new first-class construct that complements the existing data artifacts and Parameters in Metaflow's architecture. The key architectural insight lies in understanding when different types of data are resolved and persisted in the flow lifecycle:

Artifacts are resolved and persisted to the datastore at the end of each task execution. Parameters are resolved and persisted at the start of a run, allowing modification up to that point through mechanisms like event triggers. The new Config object is resolved and persisted when the flow is deployed—when creating a flow with schedulers like Argo Workflows, or just prior to execution for local runs. This deployment-time resolution is what enables Configs to be used more widely throughout flow code, particularly in step or flow-level decorators and to set defaults for parameters.

The Config architecture supports user-definable parsers, allowing teams to use any configuration format they prefer. The design cleverly allows parsers to be specified as strings, meaning the parser doesn't even need to be present in remote execution environments—Metaflow handles the mechanics of parsing during deployment and distributing the parsed configuration as artifacts. This enables seamless integration with configuration managers like OmegaConf, Hydra, or domain-specific tools like Netflix's internal Metaboost.

From a data flow perspective, Configs behave like dictionary-like artifacts once loaded. They support both dot-syntax notation for accessing nested keys (when possible) and standard dictionary subscript notation, plus Python's dictionary unpacking syntax. This flexibility makes them ergonomic to use while maintaining consistency with Metaflow's artifact model. Since Configs become versioned artifacts automatically, they get stored alongside data, models, code, Parameters, and execution environments as a consistent, reproducible bundle organized in Metaflow namespaces.

The architecture also introduces config_expr, a mechanism that allows referencing Config values in decorators before the Config has been defined in the flow code. This solves the forward-reference problem inherent in Python-based flow definitions where decorators are evaluated before class body execution.

## Technical Implementation

The feature was released in Metaflow 2.13 and requires only a pip upgrade to access. The implementation leverages Python's flexibility while maintaining strong integration with Metaflow's existing infrastructure stack, which sits atop Netflix's extensive cloud infrastructure and provides access to data, compute, production-grade workflow orchestration via Maestro, and observability features.

Configuration files can be formatted in any human-readable format, with TOML shown as a primary example. A typical configuration might specify scheduling parameters, resource requirements, and application-specific settings in a structured format. The Config object is instantiated in the FlowSpec with a name, default file path, and parser specification. For example: `config = Config("config", default="myconfig.toml", parser="tomllib.loads")`.

The parser system is particularly elegant in its implementation. Because parsers are specified as strings, they can reference standard library modules like tomllib without requiring those modules to be present in remote execution environments. Users can also define custom parsers for advanced use cases like validation with Pydantic, managing hierarchical configurations with OmegaConf or Hydra, or even generating configurations dynamically by fetching from external services or inspecting the execution environment (like the current git branch).

The implementation works seamlessly with Metaflow's existing features including remote task execution, production deployment to schedulers, the Runner API, and the Deployer API. Configs are automatically packaged and kept consistent across tasks without manual intervention. The Client API allows easy access to Configs from any past run, supporting reproducibility and debugging workflows.

Integration with Netflix's internal Metaboost tool demonstrates the flexibility of the implementation. Metaboost serves as a single interface to three different internal platforms managing ETL/Workflows (Maestro), Machine Learning Pipelines (Metaflow), and Data Warehouse Tables (Kragle). The integration requires only adding a mixin class to the FlowSpec definition, after which configuration values become accessible via dot notation throughout the flow.

The Metaboost implementation showcases advanced configuration management with a concept called "bindings" where flows can be bound to arbitrary labels with corresponding bespoke configurations. These binding-specific configurations are merged into global configurations containing repository information, branch details, and other metadata. Metaboost instantiates the Metaflow flow once per binding into the orchestration cluster, enabling a single flow definition to be deployed multiple times with different configurations for parallel experimentation.

## Scale & Performance

Netflix operates Metaflow at considerable scale, managing thousands of unique Metaflow flows across the organization. These flows have executed millions of experiments over the past few years, with the platform facilitating work ranging from content decision support to ranking systems for subtitle value prediction. The introduction of Configs doesn't add performance overhead since configuration resolution happens once at deployment time rather than repeatedly during execution.

The Metaboost use case provides concrete examples of scale enabled by the Config system. A typical ML project on the Content ML team might source features from hundreds of columns in Netflix's data warehouse and create multiple models against a growing suite of metrics. With bindings and Configs, practitioners can scale experiments as fast as they can create configuration files, with each binding resulting in an independent deployment of the underlying flow.

The documentation examples include demonstrations of deploying and executing hundreds of flow variants in large-scale experiments, with Hydra orchestrating tens of Metaflow flows that benchmark PyTorch using varying numbers of CPU cores and tensor sizes, updating visualizations of results in real-time as experiments progress. This pattern of inverting control—where the configuration manager decides what gets run based on configuration files, using Metaflow's Runner and Deployer APIs programmatically—enables orders of magnitude more experimentation throughput than manual deployment approaches.

The versioning and artifact storage system ensures that despite this scale, every run's data, models, code, Parameters, Configs, and execution environments remain organized and accessible through the Client API. This comprehensive versioning supports both reproducibility and the ability to analyze results across large experimental sweeps.

## Trade-offs & Lessons

The design of Configurable Metaflow reflects careful consideration of several key trade-offs that illuminate broader lessons for ML platform development.

The first major design decision was determining the appropriate level of abstraction and opinionation. Netflix's platform team explicitly avoids implementing solutions that are too team-specific or too opinionated at high levels of the stack. Instead, they focus on extracting more general lower-level concepts that can be leveraged by multiple teams in different ways. The Config feature exemplifies this philosophy—it provides primitives for configuration management without prescribing specific configuration hierarchies, validation schemes, or deployment patterns. This allows teams like the Metaboost developers to build their opinionated tooling on top while keeping the core feature broadly applicable.

The timing of when Configs resolve (deployment time) versus Parameters (run start time) creates an important trade-off between flexibility and consistency. Configs cannot be changed after deployment, which ensures consistency across a scheduled flow's executions but reduces runtime flexibility. The documentation explicitly addresses this by showing how to mix Configs and Parameters, using Configs to define default values that Parameters can override at runtime. This hybrid approach provides both deployment-time consistency and runtime flexibility where needed, such as when real-time events trigger runs with custom parameter values.

The decision to support user-definable parsers as strings rather than requiring importable Python modules demonstrates thoughtful consideration of deployment mechanics. By parsing configurations at deployment time using string-specified parsers, the implementation avoids the complexity of ensuring parser code is available in all remote execution environments. This significantly reduces packaging overhead and potential version conflicts while maintaining flexibility for advanced configuration needs.

The integration story reveals an important lesson about platform evolution. Rather than forcing teams to migrate away from existing solutions like Metaboost, the Config feature was designed to integrate cleanly with them. The Metaboost integration requires only a mixin class addition, preserving existing workflows while providing better underlying infrastructure. This backwards-compatible, incremental improvement approach reduces adoption friction and respects the investment teams have made in their existing tooling.

The inversion of control pattern enabled by Config integration with Hydra and accessible through Runner/Deployer APIs represents a sophisticated architectural insight. Rather than limiting users to triggering flows that consume configurations, the platform enables configuration managers to orchestrate Metaflow programmatically. This pattern transforms Metaflow from a tool that must be invoked to a programmable substrate that can be composed into higher-level workflows. The documentation's emphasis on this pattern suggests Netflix sees significant value in enabling multiple layers of orchestration.

The feature demonstrates the value of comprehensive versioning and artifact management. By treating Configs as first-class artifacts that get versioned and stored alongside code, data, models, and execution environments, the platform ensures reproducibility without requiring additional tooling or manual tracking. This design choice reflects a lesson learned over years of operating ML systems at scale: reproducibility must be automatic and comprehensive rather than requiring explicit user action.

The community-driven development process also surfaces an important lesson. The feature directly addresses frequently asked questions from both internal Netflix teams and the external Metaflow community Slack. By tracking these recurring patterns and implementing solutions that address the underlying needs rather than specific requests, the platform team demonstrates effective product development for developer tools. The acknowledgment of Outerbounds for collaboration on testing and example development shows the value of community partnerships in validating new features.

Finally, the feature illustrates the importance of documentation and examples in platform adoption. The release includes comprehensive documentation with multiple examples covering basic configuration, validation with Pydantic, hierarchical configuration with OmegaConf, programmatic generation, and config-driven experimentation patterns. A dedicated GitHub repository provides executable examples, lowering the barrier to experimentation and learning. This investment in enabling materials reflects an understanding that powerful features require educational support to achieve adoption.
