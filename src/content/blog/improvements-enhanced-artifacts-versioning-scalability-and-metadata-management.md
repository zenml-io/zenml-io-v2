---
title: "Improvements: Enhanced Artifacts Versioning, Scalability and Metadata Management"
slug: "improvements-enhanced-artifacts-versioning-scalability-and-metadata-management"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67347d3c18083acda93c449d"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-11-13T10:35:28.884Z"
  lastUpdated: "2024-11-13T10:35:28.884Z"
  createdOn: "2024-11-13T10:19:40.380Z"
author: "zenml-team"
category: "zenml"
tags:
  - "release"
  - "release-notes"
  - "zenml"
  - "mlops"
date: "2024-11-13T00:00:00.000Z"
readingTime: 3 mins
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/ef8d14cc/67347efc66013134954b7b8e_zenml-release__1__2.png"
seo:
  title: "Improvements: Enhanced Artifacts Versioning, Scalability and Metadata Management - ZenML Blog"
  description: "ZenML 0.70.0 has launched with major improvements but requires careful handling during upgrade due to significant database schema changes. Key highlights include enhanced artifact versioning with batch processing capabilities, improved scalability through reduced server requests, unified metadata management via the new log_metadata method, and flexible filtering with the new oneof operator. The release also features expanded documentation covering finetuning and LLM/ML engineering resources. Due to the database changes, users must back up their data and test the upgrade in a non-production environment before deploying to production systems."
  canonical: "https://www.zenml.io/blog/improvements-enhanced-artifacts-versioning-scalability-and-metadata-management"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/ef8d14cc/67347efc66013134954b7b8e_zenml-release__1__2.png"
  ogTitle: "Improvements: Enhanced Artifacts Versioning, Scalability and Metadata Management - ZenML Blog"
  ogDescription: "ZenML 0.70.0 has launched with major improvements but requires careful handling during upgrade due to significant database schema changes. Key highlights include enhanced artifact versioning with batch processing capabilities, improved scalability through reduced server requests, unified metadata management via the new log_metadata method, and flexible filtering with the new oneof operator. The release also features expanded documentation covering finetuning and LLM/ML engineering resources. Due to the database changes, users must back up their data and test the upgrade in a non-production environment before deploying to production systems."
---

# ZenML 0.70.0: Major Updates & Important Migration Notes

We're excited to announce the release of ZenML 0.70.0, which brings significant improvements to artifact versioning, scalability, and metadata management. However, due to substantial database schema changes, this upgrade requires careful attention and preparation.

## ⚠️ Important Upgrade Notice

This release includes major database schema changes and migrations. Before proceeding with the upgrade:

<ol><li>Create a complete backup of your production database</li><li>Test the upgrade process in a non-production environment first</li><li>Plan for potential downtime during the migration</li></ol>

## 🚀 Key Improvements

### Enhanced Artifact Versioning

We've substantially improved how ZenML handles artifact versions:

<ul><li>New batch processing capabilities for artifact version requests, resulting in faster execution times</li><li>Support for multiple versions of the same artifact (e.g., model checkpoints)</li><li>Improved user experience in both the ZenML UI and API interactions</li></ul>

### Scalability Boost

Performance and scalability have been major focus areas in this release:

<ul><li>Reduced server request frequency</li><li>Server-side artifact version incrementing</li><li>Optimized processing for improved speed at scale</li></ul>

### Unified Metadata Management

We've simplified metadata handling with a new unified approach:

<ul><li>Introduced the consolidated <code>log_metadata</code> method</li><li>Support for logging run metadata across:<ul><li>Artifact versions</li><li>Model versions</li><li>Steps</li><li>Runs</li></ul></li></ul>

### New Filtering Capabilities

The new `oneof` operator brings more flexible filtering options:

``*# Filter by IDs (UUID type)*`PipelineRunFilter(id='oneof:["uuid1", "uuid2"]')`*# Filter by tags or string attributes*`PipelineRunFilter(tag='oneof:["cats", "dogs"]')`

### Documentation Enhancements

Our documentation has received a significant update:

<ul><li>Restructured for better navigation</li><li>New sections covering finetuning</li><li>Additional LLM/ML engineering resources</li><li>Improved getting started guides</li></ul>

### Bug Fixes

This release addresses several issues:

<ul><li>Resolved in-process main module source loading problems</li><li>Various other stability improvements</li></ul>

## 📋 Upgrade Checklist

Before upgrading to version 0.70.0:

<ul><li> Create a full backup of your ZenML database</li><li> Test the upgrade in a staging environment</li><li> Review your current workflows for any potential compatibility issues</li><li> Plan for maintenance window if upgrading production systems</li><li> Ensure all team members are aware of the upcoming changes</li></ul>

## Looking Forward

These improvements lay the groundwork for even better ML pipeline management and scalability. We're committed to making ZenML more robust and user-friendly with each release.

Stay tuned for more updates, and don't hesitate to reach out to our community channels if you need any assistance with the upgrade process.

Happy MLOps!