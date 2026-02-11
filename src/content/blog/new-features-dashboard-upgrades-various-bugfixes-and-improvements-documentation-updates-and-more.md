---
title: "New Features: Dashboard Upgrades, Various Bugfixes and Improvements, Documentation Updates and More!"
slug: "new-features-dashboard-upgrades-various-bugfixes-and-improvements-documentation-updates-and-more"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67c0613e296183669d73c044"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-03-02T13:01:09.318Z"
  lastUpdated: "2025-02-27T13:16:38.910Z"
  createdOn: "2025-02-27T12:57:34.703Z"
author: "zenml-team"
category: "zenml-updates"
tags:
  - "sagemaker"
  - "aws"
  - "release"
  - "release-notes"
  - "zenml"
  - "dashboard"
  - "stacks"
date: "2025-02-27T00:00:00.000Z"
readingTime: 3 mins
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/f9387c9d/67c06200c71cb71e5d245e37_zenml-release-7.png"
seo:
  title: "New Features: Dashboard Upgrades, Various Bugfixes and Improvements, Documentation Updates and More! - ZenML Blog"
  description: "ZenML 0.75.0 introduces dashboard enhancements that allow users to create and update stack components directly from the dashboard, along with improvements to service connectors, model artifact handling, and documentation. This release streamlines ML workflows with better component management capabilities, enhanced SageMaker integration, and critical fixes for custom flavor components and sorting logic."
  canonical: "https://www.zenml.io/blog/new-features-dashboard-upgrades-various-bugfixes-and-improvements-documentation-updates-and-more"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/f9387c9d/67c06200c71cb71e5d245e37_zenml-release-7.png"
  ogTitle: "New Features: Dashboard Upgrades, Various Bugfixes and Improvements, Documentation Updates and More! - ZenML Blog"
  ogDescription: "ZenML 0.75.0 introduces dashboard enhancements that allow users to create and update stack components directly from the dashboard, along with improvements to service connectors, model artifact handling, and documentation. This release streamlines ML workflows with better component management capabilities, enhanced SageMaker integration, and critical fixes for custom flavor components and sorting logic."
---

We are thrilled to announce the release of **ZenML 0.75.0**, bringing significant improvements to our dashboard capabilities along with various enhancements and fixes to make your ML workflows more efficient.

##### Dashboard Stack Component Management

The highlight of this release is the enhanced dashboard functionality that now allows you to **create and update stack components directly from the dashboard**. This powerful addition streamlines your workflow by reducing the need to switch between the CLI and the dashboard when managing your ML infrastructure components.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/1cdba83a/67c0652ebc6a88f864605a66_ScreenRecording2025-02-27at14.07.03-ezgif.com-crop.gif" alt="__wf_reserved_inherit" />
</figure>

##### Service Connector Improvements

We've improved our service connector capabilities by allowing authentication methods to be customized during auto-configuration. Additionally, we've enhanced the SageMaker integration with new environment settings and fixed several issues with the GCP service connector documentation.

##### Model Artifact Handling

This release introduces a significant improvement to model management - the ability to retrieve the latest artifact of a model by creation date instead of version name. This enhancement provides more intuitive and reliable access to your most recent model artifacts.

##### Documentation and Compatibility Updates

We've expanded our documentation with new LLM messaging resources and video content. The release also includes improved compatibility through expanded FastAPI dependency ranges and better pipeline source root documentation and logging.

##### Important Fixes

Several critical fixes have been implemented, including:

<ul><li>Resolved issues with component registration when using custom flavors</li><li>Fixed sorting logic when using custom fetching criteria</li><li>Prevented inner fsspec logs from being flushed to the artifact store</li></ul>

##### Looking Forward

ZenML 0.75.0 represents our continued commitment to improving the platform's usability and reliability. The new dashboard capabilities for stack component management mark an important step toward a more integrated and user-friendly experience.

We encourage you to update to this latest version and explore these new features. For a complete list of changes and improvements, please refer to our [full release notes](https://github.com/zenml-io/zenml/releases/tag/0.75.0).

Happy building with ZenML! 🚀

