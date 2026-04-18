---
title: "Twitter Notebook on Cortex: managed Jupyter environment with unified data access and multi-cluster lifecycle management"
slug: "twitter-cortex-twitter-notebook-on-cortex-managed-jupyter-environment-with-unified-data-access-and-multi-cluster-lifecyc"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "notebooks"
  - "databricks"
  - "kubeflow"
  - "kubernetes"
  - "mlflow"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "feature-engineering"
  - "training"
industryTags: "media-entertainment"
company: "Twitter"
companySlug: "twitter"
platformName: "Cortex"
contentType: "blog"
summary: "Twitter's Cortex Platform built Twitter Notebook, a managed Jupyter Notebook environment integrated with the company's data and development ecosystem, to address the pain points of data scientists and ML engineers who previously had to manually manage infrastructure, data access, and dependencies in disconnected notebook environments. Starting as a grassroots effort in 2016, the platform evolved to become a top-level company initiative with 25x+ user growth, providing seamless lifecycle management across heterogeneous on-premise and cloud compute clusters, remote workspace capabilities with monorepo integration, flexible dependency management through custom kernels (PyCX, pex, pip, and Scala), streamlined authentication for Kerberos and Google Cloud services, unified SQL data access across multiple storage systems, and enhanced interactive data visualization through custom JupyterLab extensions. The solution enabled DS and ML teams to experiment faster by providing one-command notebook creation with zero installation steps, complete development environment parity with laptop setups, and datacenter-locality benefits that significantly improved productivity especially during remote work."
link: "https://blog.x.com/engineering/en_us/topics/infrastructure/2021/advancing-jupyter-notebooks-at-twitter---part-1--a-first-class-d"
year: 2021
seo:
  title: "Twitter: Twitter Notebook on Cortex: managed Jupyter environment with unified data access and multi-cluster lifecycle management - ZenML MLOps Database"
  description: "Twitter's Cortex Platform built Twitter Notebook, a managed Jupyter Notebook environment integrated with the company's data and development ecosystem, to address the pain points of data scientists and ML engineers who previously had to manually manage infrastructure, data access, and dependencies in disconnected notebook environments. Starting as a grassroots effort in 2016, the platform evolved to become a top-level company initiative with 25x+ user growth, providing seamless lifecycle management across heterogeneous on-premise and cloud compute clusters, remote workspace capabilities with monorepo integration, flexible dependency management through custom kernels (PyCX, pex, pip, and Scala), streamlined authentication for Kerberos and Google Cloud services, unified SQL data access across multiple storage systems, and enhanced interactive data visualization through custom JupyterLab extensions. The solution enabled DS and ML teams to experiment faster by providing one-command notebook creation with zero installation steps, complete development environment parity with laptop setups, and datacenter-locality benefits that significantly improved productivity especially during remote work."
  canonical: "https://www.zenml.io/mlops-database/twitter-cortex-twitter-notebook-on-cortex-managed-jupyter-environment-with-unified-data-access-and-multi-cluster-lifecyc"
  ogTitle: "Twitter: Twitter Notebook on Cortex: managed Jupyter environment with unified data access and multi-cluster lifecycle management - ZenML MLOps Database"
  ogDescription: "Twitter's Cortex Platform built Twitter Notebook, a managed Jupyter Notebook environment integrated with the company's data and development ecosystem, to address the pain points of data scientists and ML engineers who previously had to manually manage infrastructure, data access, and dependencies in disconnected notebook environments. Starting as a grassroots effort in 2016, the platform evolved to become a top-level company initiative with 25x+ user growth, providing seamless lifecycle management across heterogeneous on-premise and cloud compute clusters, remote workspace capabilities with monorepo integration, flexible dependency management through custom kernels (PyCX, pex, pip, and Scala), streamlined authentication for Kerberos and Google Cloud services, unified SQL data access across multiple storage systems, and enhanced interactive data visualization through custom JupyterLab extensions. The solution enabled DS and ML teams to experiment faster by providing one-command notebook creation with zero installation steps, complete development environment parity with laptop setups, and datacenter-locality benefits that significantly improved productivity especially during remote work."
mlops:
  source: "sqlite"
  entryId: 55
  sourceUrl: "https://blog.x.com/engineering/en_us/topics/infrastructure/2021/advancing-jupyter-notebooks-at-twitter---part-1--a-first-class-d"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.060904"
  lastUpdated: "2026-04-14T19:54:48.135044"
---

## Problem Context

Twitter's data scientists, ML researchers, and ML engineers faced significant friction in their development workflows prior to Twitter Notebook. The core challenge was that while Jupyter Notebook offered excellent out-of-the-box features, the notebook development environment existed in complete isolation from Twitter's broader engineering ecosystem. This disconnection manifested in several painful ways that directly impacted productivity and iteration speed.

Users had to manually manage infrastructure provisioning and configuration for their notebook environments, which was time-consuming and error-prone. They needed to explicitly handle data access across multiple disparate storage systems including BigQuery, HDFS, and Vertica, often copying and pasting custom utility functions between notebooks to perform basic data operations. This approach made code less maintainable and introduced errors. Authentication to backend systems required manual intervention and repeated credential entry. Perhaps most critically, there was no integration with Twitter's monolithic git repository (the "source" monorepo), which is over 30GB in size and houses essentially all development at the company. This meant developers couldn't easily access, modify, commit, or deploy code from notebooks, forcing context-switching between local machines and notebook environments.

The situation became even more acute during the pandemic when staff worked remotely on home internet connections, making the network instability and lack of datacenter-locality particularly problematic for workflows involving heavy-weight data and application payloads. The Experimentation Tools team within Cortex Platform recognized that providing a managed, integrated Jupyter Notebook environment could dramatically accelerate experimentation and development cycles by seamlessly connecting code, data, and tools.

## Architecture & Design

Twitter Notebook is architecturally conceived as a suite of integrations layered on top of the standard Jupyter Notebook runtime rather than a fork. This design philosophy allowed the team to build within public API boundaries using JupyterLab plugins, IPython Magics, and ContentsManagers while maintaining compatibility with the broader Jupyter ecosystem and contributing improvements upstream.

The platform provides lifecycle management across Twitter's heterogeneous compute infrastructure, which includes both on-premise Mesos/Aurora clusters and cloud-based Kubernetes environments, including Google Kubernetes Engine. A streamlined command-line interface called "nb" serves as the primary control plane, abstracting away the complexity of managing workloads across these disparate infrastructure layers. The nb CLI interacts with Kubernetes and Mesos/Aurora on behalf of users and is pre-installed on all Twitter engineer laptops as part of the Managed Development Environment, enabling any employee to spin up a fully functional notebook in approximately 60 seconds with a single command (nb create).

The remote workspace architecture brings the complete Twitter development environment into the notebook runtime. This includes the ability to bootstrap shallow copies of the 30GB+ monorepo in about two minutes, complete with all the development tooling developers expect on their laptops: custom git implementations optimized for large-scale repositories, arcanist for Phabricator-based code review, kubectl and aurora CLI for deployments, and other Engineering Effectiveness tools. Environment personalization extends to details like consistent user mapping ($USER environment variables and effective UIDs) in remote workloads to ensure seamless integration.

The kernel architecture provides multiple execution environments tailored to different use cases. Each kernel type offers different dependency management approaches and comes pre-configured with appropriate magic commands. The data access layer unifies multiple SQL storage systems through a common interface that handles authentication, configuration, and query execution automatically. JupyterLab extensions provide both backend functionality (like the TwitterVIS Data Explorer ipywidget) and frontend enhancements (like the Kerberos authentication manager) through a combination of Python and JavaScript/React components.

## Technical Implementation

Twitter Notebook's implementation spans multiple technology domains, with careful integration work to bridge the Jupyter ecosystem with Twitter's internal infrastructure and tooling.

The infrastructure foundation leverages Kubernetes for cloud deployments and Mesos/Aurora for on-premise workloads. On Google Kubernetes Engine specifically, the platform integrates with Workload Identity for automatic authentication to Google Cloud services, eliminating manual credential management. The system also connects to Twitter's internal secret distribution system for handling credentials like GCP service account keys.

For dependency management, the platform implements four distinct kernel types. The PyCX (Python-Cortex) kernel uses a "batteries included" approach, bundling commonly used third-party and internal DS and ML libraries including TensorFlow, TFX, PyTorch, and XGBoost into a large monolithic environment with continuous releases tracking the monorepo. The pex kernel enables hermetic Python executables built using pants (a build system similar to Bazel and Gradle) to be live-loaded into notebook environments. Custom IPython magic commands (%load_pex_env, %%pex_run, %pants_load) allow developers to interactively work with pex environments and pants targets without rebuilding images or kernels. These magics were recently open-sourced in collaboration with Toolchain Labs through the pants-jupyter-plugin project, with plans to extend support to Bazel as part of Twitter's multi-year migration. The pip kernel provides traditional venv-based isolation with multi-environment support within the same notebook, allowing installation from internally accessible Python package indexes. The Scala kernel, built on Ammonite, offers similar live-loading capabilities for Scala dependencies from the monorepo, particularly supporting Scalding, Twitter's widely-used Scala-based data processing framework.

Authentication implementation addresses multiple backend systems. For Kerberos, which is required for git operations, code reviews, Spark jobs, HDFS access, and other internal systems, the team built a custom JupyterLab frontend extension. This extension prompts for credentials on notebook creation, displays ticket validation time in the status bar, and automatically re-prompts when tickets expire, replacing the manual kinit workflow. The solution handles the constraint that human users cannot use keytabs (which are only issued for service accounts) and must authenticate with passwords that cannot be stored as shared secrets.

The unified data access layer was implemented by the Data Science Effectiveness team as a library that abstracts authentication, configuration, and query execution across BigQuery, HDFS, and Vertica accessed through Presto, Spark, or Hive. Magic commands like %%sql allow customers to execute queries directly in cells and receive DataFrames without additional code or imports, available by default in the PyCX kernel.

For visualization, the Twitter Visualizations, Insights and Science (VIS) team developed TwitterVIS, a JupyterLab extension featuring Data Explorer. This is implemented as a custom ipywidget that provides UI-based chart configuration and interactive views. The implementation leverages Twitter's internal React components and extends open-source libraries like Plotly, using the ipywidget and extension framework to deliver interactivity that bridges the gap between notebook flexibility and BI tool user experience.

The team also contributed multiple improvements back to the Jupyter open source community, including building the asynchronous contents API for jupyter_server and adding UNIX socket support to Notebook Server.

## Scale & Performance

The platform achieved remarkable adoption growth, scaling from a small grassroots effort to 25x+ user growth, becoming an integral part of Twitter's Data and ML Platform with company-wide reach. The architecture supports deployment to any Twitter computing environment, providing flexibility across on-premise and cloud infrastructure zones.

Performance improvements were particularly notable in common workflows. Monorepo bootstrapping completes in approximately two minutes for a shallow copy, compared to what would be prohibitively slow over home internet connections. The one-command notebook creation (nb create) delivers a fully functional environment in about 60 seconds with zero installation steps required, dramatically lowering the barrier to entry.

The datacenter-locality and network stability properties proved especially valuable during the pandemic when employees worked remotely on residential internet connections. For workflows involving heavy-weight data and application payloads typical in DS and ML experimentation, the remote execution environment eliminated the need to transfer large datasets and models to local machines, resulting in measurable productivity improvements though specific throughput numbers are not disclosed in the source material.

The monorepo itself represents significant scale at over 30GB in size, shared across the entire company, requiring specialized tooling from the Engineering Effectiveness organization to manage effectively. The fact that notebooks can now seamlessly integrate with this repository enables developers to modify code, commit changes, iterate through code review, land changes in the monorepo, and deploy—all from the notebook environment, matching laptop-based developer experience with the benefit of server-grade hardware.

## Trade-offs & Lessons

The Twitter Notebook journey offers several valuable insights for organizations building similar ML platform capabilities. The decision to build on top of open source rather than forking proved strategically sound, allowing the team to operate in harmony with the Jupyter community and contribute improvements upstream. This approach maintained compatibility with the ecosystem while enabling deep customization through public API boundaries. The team's contributions like the asynchronous contents API and UNIX socket support demonstrate how internal needs can drive broadly useful open source enhancements.

The "Remote Workspace" mindset emerged as a critical design principle that went beyond simply providing remote compute. Achieving true parity with the laptop-based developer experience required attention to intricate details like workload environment personalization, consistent user identity mapping, and partnerships with tool-owning teams to expose Linux-compatible versions of MacOS development tools. This thoroughness was essential—partial integration would have forced developers to context-switch between environments, defeating much of the value proposition.

The kernel strategy illustrates thoughtful segmentation of different user needs rather than forcing everyone into a single approach. The PyCX "batteries included" kernel optimizes for getting started quickly without dependency management overhead, ideal for ad-hoc analysis. The pex kernel serves developers doing active library development who need tight integration with the monorepo's build system. The pip kernel accommodates those working with traditional Python distributions. The Scala kernel addresses a significant constituency working with Scalding and other Scala frameworks. This diversity reflects the reality that different phases of ML work and different team cultures require different tooling approaches.

The authentication UX improvements highlight how seemingly small friction points can significantly impact adoption and productivity. Moving from manual kinit commands to automatic prompting with password manager integration, visible status indicators, and automatic re-authentication removed repetitive interruptions from workflows. Similarly, Workload Identity integration for GCP eliminated an entire category of credential management tasks.

The unified data access layer addresses a common anti-pattern in notebook environments: proliferation of copied utility functions that become maintenance nightmares. By centralizing authentication, configuration, and query execution logic in a well-maintained library with simple magic command interfaces, the platform reduced error rates and made code more maintainable while lowering the cognitive load on users.

The TwitterVIS Data Explorer represents an interesting trade-off between notebook flexibility and BI tool interactivity. Rather than accepting static visualizations as the price of notebook-based analysis, the team invested in custom ipywidgets that provide UI-based configuration and interaction. This required cross-stack expertise (Python and JavaScript/React) and integration with both internal component libraries and open-source tools like Plotly, but delivered substantially better user experience for a common workflow.

The grassroots origin story is notable—what started as a small working group of engineers from different teams and backgrounds grew into a top-level company initiative with 25x+ growth. This suggests that the pain points were widely felt and the solution genuinely addressed real needs. The broad acknowledgment list including partners across Engineering Effectiveness, various contributing teams, and leadership support indicates that success required extensive cross-functional collaboration beyond the core Experimentation Tools team.

Looking forward, the team indicates plans for additional features including notebook storage improvements, parameterized notebook jobs, performance and reliability enhancements, notebook sharing capabilities, and Kubeflow support, suggesting continued investment and evolution of the platform. The mention of extending pants-jupyter-plugin to support Bazel as part of a multi-year migration indicates long-term architectural transitions that the platform must accommodate while maintaining user experience continuity.
