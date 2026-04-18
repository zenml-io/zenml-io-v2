---
title: "Sandcastle internal platform for rapidly prototyping and deploying interactive data and AI web apps with automated Kubernetes scaling"
slug: "airbnb-chronon-internal-dataai-app-platform-conversational-ai-platform-sandcastle-internal-platform-for-rapidly-prototyp"
draft: false
mlopsTags:
  - "model-serving"
  - "docker"
  - "kubernetes"
  - "deployment"
  - "serving"
industryTags: "other"
company: "Airbnb"
companySlug: "airbnb"
platformName: "Chronon / Internal Data+AI App Platform / Conversational AI Platform"
contentType: "blog"
summary: "Airbnb built Sandcastle, an internal prototyping platform that enables data scientists, engineers, and product managers to rapidly develop and deploy data and AI-powered web applications without requiring frontend engineering expertise or complex infrastructure configuration. The platform addresses the challenge of bringing ML ideas to life in interactive, shareable formats by combining Onebrain (Airbnb's packaging framework), kube-gen (generated Kubernetes configuration), and OneTouch (dynamic Kubernetes cluster scaling) with open source frameworks like Streamlit and FastAPI. In its first year, Sandcastle powered over 175 live prototypes across the organization, generating 69,000+ active usage days from 3,500+ unique internal visitors, enabling data scientists to iterate directly on their ideas and shifting organizational culture from static presentations to interactive prototypes."
link: "https://medium.com/airbnb-engineering/sandcastle-data-ai-apps-for-everyone-439f3b78b223"
year: 2024
seo:
  title: "Airbnb: Sandcastle internal platform for rapidly prototyping and deploying interactive data and AI web apps with automated Kubernetes scaling - ZenML MLOps Database"
  description: "Airbnb built Sandcastle, an internal prototyping platform that enables data scientists, engineers, and product managers to rapidly develop and deploy data and AI-powered web applications without requiring frontend engineering expertise or complex infrastructure configuration. The platform addresses the challenge of bringing ML ideas to life in interactive, shareable formats by combining Onebrain (Airbnb's packaging framework), kube-gen (generated Kubernetes configuration), and OneTouch (dynamic Kubernetes cluster scaling) with open source frameworks like Streamlit and FastAPI. In its first year, Sandcastle powered over 175 live prototypes across the organization, generating 69,000+ active usage days from 3,500+ unique internal visitors, enabling data scientists to iterate directly on their ideas and shifting organizational culture from static presentations to interactive prototypes."
  canonical: "https://www.zenml.io/mlops-database/airbnb-chronon-internal-dataai-app-platform-conversational-ai-platform-sandcastle-internal-platform-for-rapidly-prototyp"
  ogTitle: "Airbnb: Sandcastle internal platform for rapidly prototyping and deploying interactive data and AI web apps with automated Kubernetes scaling - ZenML MLOps Database"
  ogDescription: "Airbnb built Sandcastle, an internal prototyping platform that enables data scientists, engineers, and product managers to rapidly develop and deploy data and AI-powered web applications without requiring frontend engineering expertise or complex infrastructure configuration. The platform addresses the challenge of bringing ML ideas to life in interactive, shareable formats by combining Onebrain (Airbnb's packaging framework), kube-gen (generated Kubernetes configuration), and OneTouch (dynamic Kubernetes cluster scaling) with open source frameworks like Streamlit and FastAPI. In its first year, Sandcastle powered over 175 live prototypes across the organization, generating 69,000+ active usage days from 3,500+ unique internal visitors, enabling data scientists to iterate directly on their ideas and shifting organizational culture from static presentations to interactive prototypes."
mlops:
  source: "sqlite"
  entryId: 212
  sourceUrl: "https://medium.com/airbnb-engineering/sandcastle-data-ai-apps-for-everyone-439f3b78b223"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.618187"
  lastUpdated: "2026-04-14T19:56:01.798092"
---

## Problem Context

Airbnb faced a critical gap between data science innovation and stakeholder engagement. While the company has strong technical capabilities in trustworthy data and ML, data scientists and ML practitioners struggled to communicate AI-powered product ideas to design-focused leadership in compelling ways. Traditional communication methods like slide decks with screenshots, design documents with plots, and even Figma mockups proved insufficient for capturing ideas that needed to be experienced interactively to be understood. This challenge became particularly acute with the rise of large language models, which typically require chat interfaces to demonstrate their capabilities effectively.

The core problem had multiple dimensions. First, leadership and non-technical stakeholders would not run Jupyter notebooks but needed interactive UIs where they could experiment with different input assumptions, choose techniques, and explore outputs. Second, data scientists primarily work in Python and lack familiarity with modern web development technologies like TypeScript and React, creating a significant skill gap. Third, collaborating with frontend engineering teams introduced lengthy planning and prioritization cycles that killed the rapid iteration essential for prototyping. Even when engineering bandwidth was available, data scientists lost the ability to iterate on the science behind their ideas since every change required reprioritization and reimplementation.

Beyond the development challenges, infrastructure presented additional barriers. Data science organizations needed solutions for packaging and sharing applications reproducibly, handling complex networking with Airbnb's tech stack, implementing authentication to prevent sensitive data leaks, providing storage for temporary data, and creating easily shareable URLs that could "go viral" internally. The traditional approach of building production-grade applications for every idea was too slow and resource-intensive for the exploratory nature of prototyping.

## Architecture & Design

Sandcastle integrates three core Airbnb infrastructure components into a cohesive prototyping platform. The architecture follows a clear separation of concerns: application code packaging, infrastructure generation, and runtime orchestration.

**Onebrain** serves as the foundation for code packaging and reproducibility. It assumes developers organize code into "projects" containing arbitrary source code alongside a onebrain.yml configuration file. This YAML file specifies metadata including name, version, description, and authors, along with entry points that define executable commands and environment specifications for Python and R package dependencies. The framework supports interactive development through a "brain run" command that executes locally, while also integrating with Airbnb's continuous integration system. Every commit publishes an immutable snapshot to Airbnb's snapshot service, a lightweight mechanism for storing and distributing source code. Services can invoke "brain run youridea --port 9877" to resolve the latest snapshot, bootstrap dependencies, and execute parameterized commands. This decoupling between rapid application logic iteration and slower CI/CD cycles for service configuration is fundamental to Sandcastle's developer experience.

**kube-gen** provides the infrastructure generation layer. Airbnb built this code-generation framework on top of Kubernetes to handle authentication, tracing, and cross-service communication automatically. Traditional kube-gen configurations include environment-specific service parameters, Kubernetes application and container configuration, Spinnaker pipeline definitions for continuous delivery, and configuration for Airbnb's network proxy layer. Sandcastle extends kube-gen with custom hooks that generate all but one service configuration file automatically during build time, dramatically simplifying the developer experience. App developers only need to write a minimal container configuration file specifying which Onebrain project to run, which port it exposes, and optional customization for Docker images and CPU/RAM resources.

**OneTouch** provides the runtime layer through dynamically scaled Kubernetes clusters. This infrastructure handles the actual deployment and scaling of Sandcastle applications, ensuring they can handle varying traffic patterns without manual intervention.

The data flow follows a straightforward path. Developers write application code using frameworks like Streamlit or FastAPI and package it with an onebrain.yml file. They commit this code, which triggers CI/CD to create an immutable snapshot. They then check in a minimal container configuration file, which kube-gen expands into complete Kubernetes configuration. Within 10-15 minutes, the application is live at a URL following the pattern https://appname.airbnb.proxy/, accessible to anyone at the company with corporate login credentials.

Identity propagation flows from visiting users through the network proxy to the underlying application and ultimately to data warehouse infrastructure. This ensures applications respect user permissions when accessing sensitive metrics and tables, maintaining Airbnb's data governance standards even in prototype environments.

## Technical Implementation

The implementation leverages a carefully selected mix of open source frameworks and proprietary Airbnb infrastructure. For application development, Sandcastle primarily uses **Streamlit** for data science prototyping, chosen for its ease of use for non-frontend developers. The platform also supports **FastAPI** for more customized API-based applications and **React** for developers who need fully bespoke prototypes. The framework selection prioritizes ease of development with hot reload capabilities, rich ecosystems of open source components, and performant UIs through caching mechanisms.

The onebrain.yml configuration demonstrates the packaging approach. A typical file includes minimal metadata and a simple entry point definition:

```
name: youridea
version: 1.2.3
description: Example Sandcastle app
authors: ['Jane Doe <jane.doe@airbnb.email>']
build_enabled: true
entry_points:
  main:
    type: shell
    command: streamlit run app.py --server.port {{port}}
    parameters:
      port: {type: int, default: 8880}
env:
  python:
    pip: {streamlit: ==1.34.0}
```

This declarative specification allows Onebrain to handle all environment bootstrapping, including Python package installation through pip and conda integration.

The container configuration that developers write is equally minimal:

```
name: sandcastle-youridea
image: {{ .Env.Params.pythonImage }}
command:
  - brain
  - download-and-run
  - youridea
  - --port
  - {{ .Env.Params.port }}
resources: {{ ToInlineYaml .Env.Params.containerResources }}
```

This templated configuration uses kube-gen's variable substitution to inject environment-specific parameters. The "brain download-and-run" command resolves the latest snapshot from the snapshot service, downloads it, sets up the environment, and executes the entry point. Template variables allow customization of the base Docker image and resource allocation without requiring developers to understand Kubernetes resource specifications.

Airbnb's network proxy infrastructure handles authentication by intercepting requests to *.airbnb.proxy domains, validating corporate credentials, and forwarding authenticated requests to the backend services. The proxy also implements identity propagation, passing user credentials to backend applications so they can enforce data access controls when querying the data warehouse.

The platform supports multiple programming languages including Python, TypeScript, and R, providing flexibility for different use cases and developer preferences. Python dominates for data science workloads, while TypeScript serves developers building more traditional web applications.

## Scale & Performance

Sandcastle achieved significant adoption in its first year of operation. The platform powered **over 175 live prototypes** developed by Airbnb's data science, engineering, and product management community. These applications generated **over 69,000 distinct active usage days** from **more than 3,500 unique internal visitors**. The platform serves **hundreds of internal users per week** who visit the various prototypes to interact with data and AI ideas.

Of the 175 prototypes, **6 were used for high-impact use cases**, demonstrating that the platform successfully bridges the gap between rapid prototyping and meaningful business impact. This conversion rate suggests that while many ideas are explored, Sandcastle effectively filters and validates concepts that warrant further investment.

The deployment speed represents a dramatic improvement over traditional approaches. Applications go from code check-in to live production in **10-15 minutes**, enabling true rapid iteration. Some team members have gone from initial idea to live internal application in **less than one hour**, demonstrating the platform's accessibility and low barrier to entry.

The platform's design emphasizes developer experience metrics beyond traditional performance measures. The configuration is deliberately simple enough that multiple developers have raised support requests thinking they made mistakes because the setup seemed too easy. This simplicity is intentional and core to the platform's value proposition.

## Trade-offs & Lessons

Sandcastle's success demonstrates several important architectural and organizational insights. The platform deliberately chose **not to be open sourced** because the solutions for service-to-service communication, authentication, and networking are inherently specific to each company's infrastructure. Instead, Airbnb offers it as a **recipe** that other organizations can adapt: combining open source web application frameworks with a hosting platform that handles authentication, networking, and shareable links.

The recipe approach requires organizations to think through three pillars of cloud computing tailored for prototyping. For **compute**, they need infrastructure that spins up remote hosting environments with minimal configuration. For **storage**, prototypes need ephemeral caching plus access to the data warehouse for querying offline data. For **networking**, an authentication proxy must allow internal access via memorable domains while passing user credentials through to data warehouses and other services.

The integration of existing infrastructure proved crucial to Sandcastle's rapid development and adoption. Rather than building authentication, container orchestration, and service discovery from scratch, the platform leveraged mature Airbnb systems like kube-gen and OneTouch. This allowed the Sandcastle team to focus on the developer experience layer while standing on proven infrastructure foundations.

The platform's flexibility emerged as both a strength and a consideration. By supporting multiple frameworks (Streamlit, FastAPI, React) and languages (Python, TypeScript, R), Sandcastle accommodates diverse use cases and developer preferences. This flexibility contributed to broader adoption but requires maintaining compatibility across a wider technology surface area.

The cultural impact exceeded the technical metrics. Sandcastle drove an **ongoing cultural shift from using decks and documents to using live prototypes** for communicating data and AI ideas. This shift fundamentally changed how data scientists engage with stakeholders, replacing static presentations with interactive experiences. The ability for data scientists and product managers to iterate directly without engineering intermediaries proved transformative.

The platform reveals an important lesson about prototyping infrastructure: **build with a view towards going viral**. The easily memorable URLs (appname.airbnb.proxy) and zero-friction access for authenticated users enabled prototypes to spread organically through the organization. This viral quality amplified the platform's impact beyond what top-down adoption would achieve.

The identity propagation architecture demonstrates thoughtful security design. By flowing user credentials from the proxy through applications to the data warehouse, Sandcastle ensures prototypes respect the same data access controls as production systems. This allows rapid prototyping without compromising data governance, a critical balance for organizations handling sensitive information.

The snapshot-based deployment model decouples application code iteration from infrastructure changes, allowing data scientists to commit code changes that deploy automatically while infrastructure configuration changes remain separate and controlled. This separation of concerns reduces the cognitive load on prototype developers while maintaining infrastructure standards.

For organizations considering similar platforms, Sandcastle's architecture suggests prioritizing developer experience over feature completeness. The platform succeeds not because it offers every possible capability, but because it makes the most common workflows trivially easy. The minimal configuration files and generated infrastructure demonstrate that reducing complexity often delivers more value than adding features.
