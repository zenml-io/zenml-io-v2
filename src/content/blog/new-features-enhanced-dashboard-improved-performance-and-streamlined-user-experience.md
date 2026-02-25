---
title: "New Features: Enhanced Dashboard, Improved Performance, and Streamlined User Experience"
slug: "new-features-enhanced-dashboard-improved-performance-and-streamlined-user-experience"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "671f633372eb865b85ba22af"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-12-06T15:58:47.192Z"
  lastUpdated: "2024-12-06T15:58:03.796Z"
  createdOn: "2024-10-28T10:10:59.444Z"
author: "zenml-team"
category: "zenml-updates"
tags:
  - "release"
  - "release-notes"
  - "cloud"
  - "dashboard"
  - "stacks"
  - "bentoml"
date: "2024-10-28T00:00:00.000Z"
readingTime: 3 min
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/8105f52d/671f62a23250bf01acac4d27_zenml-release-3.png"
seo:
  title: "New Features: Enhanced Dashboard, Improved Performance, and Streamlined User Experience - ZenML Blog"
  description: "ZenML 0.68.0 introduces several major enhancements including the return of stack components visualization on the dashboard, powerful client-side caching for improved performance, and a streamlined onboarding process that unifies starter and production setups. The release also brings improved artifact management with the new `register_artifact` function, enhanced BentoML integration (v1.3.5), and comprehensive documentation updates, while deprecating legacy features including Python 3.8 support."
  canonical: "https://www.zenml.io/blog/new-features-enhanced-dashboard-improved-performance-and-streamlined-user-experience"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/8105f52d/671f62a23250bf01acac4d27_zenml-release-3.png"
  ogTitle: "New Features: Enhanced Dashboard, Improved Performance, and Streamlined User Experience - ZenML Blog"
  ogDescription: "ZenML 0.68.0 introduces several major enhancements including the return of stack components visualization on the dashboard, powerful client-side caching for improved performance, and a streamlined onboarding process that unifies starter and production setups. The release also brings improved artifact management with the new `register_artifact` function, enhanced BentoML integration (v1.3.5), and comprehensive documentation updates, while deprecating legacy features including Python 3.8 support."
---

We are thrilled to announce the release of ZenML 0.68.0, packed with exciting new features and significant improvements to enhance your ML workflow experience. Let's dive into the key highlights of this release:

## Stack Components on the Dashboard

We're excited to bring back a highly requested feature - stack components visualization on the ZenML dashboard. Users can now access and manage their stack components directly from the dashboard interface. This is just the beginning, as we have more functionality planned for upcoming releases to make stack management even more intuitive.

## Supercharged Performance with Client-Side Caching

In our continuous effort to optimize performance, we've implemented client-side computation for cached steps. This significant enhancement reduces both time and costs associated with remote orchestrator spin-up, making your workflows more efficient than ever.

## Unified Onboarding Experience

We've completely reimagined our onboarding process by combining the starter and production setup into a single, seamless flow. This streamlined approach provides a more intuitive experience for both new and existing users, making it easier to get started with ZenML.

## Enhanced Artifact Management

The new `register_artifact` function introduces a powerful way to directly link existing data in the artifact store. This feature is particularly valuable for frameworks like PyTorch-Lightning that manage their own checkpoints, offering greater flexibility in handling artifacts.

## Improved BentoML Integration

Our BentoML integration has been updated to version 1.3.5, bringing enhanced containerization support and improving the overall deployment experience.

## Breaking Changes and Deprecations

As we continue to evolve and improve ZenML, we've made some important changes to streamline the platform:

- Discontinued support for Python 3.8- Removed several legacy features including the legacy pipeline and step interface- Deprecated various CLI commands including `zenml stack up/down`

## Expanded Documentation

We've significantly expanded our documentation to help you make the most of ZenML:

- New guides for Kubernetes per-pod configuration- Best practices for common stacks- Azure 1-click dashboard deployment- Comprehensive ZenML Pro documentation- Detailed guides for custom Dataset classes and Materializers- Enhanced documentation for image building optimization and BentoML integration

## Conclusion

ZenML 0.68.0 represents a significant step forward in our mission to provide a more powerful, efficient, and user-friendly MLOps platform. From the reintroduction of stack components visualization to performance improvements through client-side caching, these updates are designed to enhance your ML development experience.

We encourage you to upgrade to ZenML 0.68.0 and explore these new features. As always, we value your feedback and look forward to seeing how these improvements accelerate your ML projects.

For a complete list of changes and improvements, please check out [our full release notes on GitHub](https://github.com/zenml-io/zenml/releases/tag/0.68.0).

Happy building with ZenML! 🚀