---
title: "New Features: Modal Step Operator, Improved API Token Management, Dashboard Enhancements and More!"
slug: "new-features-modal-step-operator-improved-api-token-management-dashboard-enhancements-and-more"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6753058a2f12986170de9a66"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-12-06T15:58:47.192Z"
  lastUpdated: "2024-12-06T15:54:02.829Z"
  createdOn: "2024-12-06T14:09:14.733Z"
author: "zenml-team"
category: "zenml-updates"
tags:
  - "release"
  - "release-notes"
  - "cloud"
  - "dashboard"
  - "modal"
date: "2024-12-06T00:00:00.000Z"
readingTime: 3 min
mainImage:
  url: "https://assets.zenml.io/content/blog/new-features-modal-step-operator-improved-api-token-management-dashboard-enhancements-and-more/551ef70b/new-features-modal-step-operator-improved-api-token-management-dashboard-enhancements-and-more-cover.avif"
seo:
  title: "New Features: Modal Step Operator, Improved API Token Management, Dashboard Enhancements and More! - ZenML Blog"
  description: "ZenML 0.71.0 features the Modal Step Operator for fast, configurable cloud execution, dynamic artifact naming, and enhanced visualizations. It improves API token management, dashboard usability, and infrastructure stability while fixing key bugs. Expanded documentation supports advanced workflows and big data management."
  canonical: "https://www.zenml.io/blog/new-features-modal-step-operator-improved-api-token-management-dashboard-enhancements-and-more"
  ogImage: "https://assets.zenml.io/content/blog/new-features-modal-step-operator-improved-api-token-management-dashboard-enhancements-and-more/06370df1/new-features-modal-step-operator-improved-api-token-management-dashboard-enhancements-and-more-cover.jpg"
  ogTitle: "New Features: Modal Step Operator, Improved API Token Management, Dashboard Enhancements and More! - ZenML Blog"
  ogDescription: "ZenML 0.71.0 features the Modal Step Operator for fast, configurable cloud execution, dynamic artifact naming, and enhanced visualizations. It improves API token management, dashboard usability, and infrastructure stability while fixing key bugs. Expanded documentation supports advanced workflows and big data management."
---

We are thrilled to announce the release of **ZenML 0.71.0**, packed with exciting new features, improvements, and fixes to make your ML workflows more efficient and user-friendly. Here's a detailed look at what’s new in this release.  

## Modal Step Operator Integration

The highlight of this release is the new integration with [Modal](https://modal.com), enabling fast and efficient cloud execution for individual pipeline steps. With this step operator, you can run pipeline steps on Modal’s high-performance compute instances. Modal’s platform allows you to configure resources like GPU type, CPU count, and memory, providing precise control over hardware usage for resource-intensive workloads. Additionally, the integration speeds up tasks like Docker image building and resource provisioning, ensuring faster execution of pipelines.  

## Improved Workload API Token Management

We’ve overhauled token management to improve security and ease of use. The introduction of a generic API token dispenser simplifies token handling, making it easier to manage credentials without compromising security. This improvement ensures a smoother experience for users working with authentication across various workflows.  

## Dashboard Enhancements

The ZenML dashboard now includes two new features to enhance usability. First, service account management has been added, allowing you to create and manage service accounts directly from the UI. Second, API key creation and integration are now supported, making it easier to authenticate and interact with ZenML workflows via the dashboard.  

## Dynamic Artifact Naming and Visualization Improvements

This release introduces dynamic artifact naming, a feature that allows users to organize pipeline outputs more effectively. With this flexibility, you can assign meaningful names to artifacts as they are generated. Additionally, we’ve expanded the visualization capabilities within ZenML to support dictionaries, lists, and JSON data, making it easier to analyze and interpret pipeline outputs directly in the platform.  

## Infrastructure Updates and Improvements

Several infrastructure-level improvements are included in this release. Error handling for Docker daemon connectivity has been improved, ensuring a more reliable experience when working with containerized environments. Kubernetes pod and label length management has also been enhanced to simplify deployment processes. Furthermore, we’ve added support for pipeline template testing, enabling robust development workflows. For even more flexibility, step inputs now support optional type annotations, reducing setup requirements in many scenarios.  

## Bug Fixes

This release resolves a number of issues to improve platform stability and performance. We’ve fixed problems related to inaccessible active stacks and addressed race conditions in service connectors. Additionally, artifact store handling has been refined to resolve URI-related bugs, and various other fixes enhance overall scalability and compatibility.  

## Documentation Updates

Our documentation has been expanded. We’ve included new guidance for managing big data within ZenML, as well as tips for optimizing local development processes. The documentation for PyTorch and service connectors has been updated to reflect the latest features and best practices.  

## Conclusion

ZenML 0.71.0 brings a wealth of new capabilities, from** the Modal step operator integration** and enhanced **artifact handling** to improved **infrastructure stability** and expanded **documentation resources**. These updates aim to provide a smoother, more powerful experience for all users.  

We encourage you to upgrade and explore these new features. For a complete list of changes and improvements, visit [our full release notes](https://github.com/zenml-io/zenml/releases/tag/0.71.0).  

Happy coding with ZenML! 🚀