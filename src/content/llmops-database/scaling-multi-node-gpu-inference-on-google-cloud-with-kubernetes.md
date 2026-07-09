---
title: "Scaling Multi-Node GPU Inference on Google Cloud with Kubernetes"
slug: "scaling-multi-node-gpu-inference-on-google-cloud-with-kubernetes"
draft: false
llmopsTags:
  - "chatbot"
  - "question-answering"
  - "multi-agent-systems"
  - "latency-optimization"
  - "cost-optimization"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "microservices"
  - "scaling"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "reliability"
  - "scalability"
  - "pytorch"
  - "fastapi"
  - "openai"
  - "google-gcp"
  - "nvidia"
industryTags: "tech"
company: "OpenAI"
summary: "OpenAI faced the challenge of rapidly scaling GPU infrastructure to handle massive inference demand spikes, particularly following the launch of ImageGen V1 which caused unprecedented load on their systems. To address this, OpenAI onboarded third-party GPU infrastructure from Google Cloud Platform at massive scale while maintaining their existing operational model with Kubernetes control planes running in their primary cloud provider. The solution involved connecting remote GPU nodes via Cloud Interconnect, implementing RoCE networking in place of their traditional InfiniBand setup, leveraging Multus CNI for pod-level RDMA interfaces, and using Google's Managed Instance Groups (MIGs) to orchestrate rack-scale GPU systems including the complex NVL72 topology of GB200 GPUs. This infrastructure now successfully serves ChatGPT and API workloads with proper isolation, security, and performance at scale."
link: "https://youtu.be/ZqO-LoZeQTs"
year: 2026
seo:
  title: "OpenAI: Scaling Multi-Node GPU Inference on Google Cloud with Kubernetes - ZenML LLMOps Database"
  description: "OpenAI faced the challenge of rapidly scaling GPU infrastructure to handle massive inference demand spikes, particularly following the launch of ImageGen V1 which caused unprecedented load on their systems. To address this, OpenAI onboarded third-party GPU infrastructure from Google Cloud Platform at massive scale while maintaining their existing operational model with Kubernetes control planes running in their primary cloud provider. The solution involved connecting remote GPU nodes via Cloud Interconnect, implementing RoCE networking in place of their traditional InfiniBand setup, leveraging Multus CNI for pod-level RDMA interfaces, and using Google's Managed Instance Groups (MIGs) to orchestrate rack-scale GPU systems including the complex NVL72 topology of GB200 GPUs. This infrastructure now successfully serves ChatGPT and API workloads with proper isolation, security, and performance at scale."
  canonical: "https://www.zenml.io/llmops-database/scaling-multi-node-gpu-inference-on-google-cloud-with-kubernetes"
  ogTitle: "OpenAI: Scaling Multi-Node GPU Inference on Google Cloud with Kubernetes - ZenML LLMOps Database"
  ogDescription: "OpenAI faced the challenge of rapidly scaling GPU infrastructure to handle massive inference demand spikes, particularly following the launch of ImageGen V1 which caused unprecedented load on their systems. To address this, OpenAI onboarded third-party GPU infrastructure from Google Cloud Platform at massive scale while maintaining their existing operational model with Kubernetes control planes running in their primary cloud provider. The solution involved connecting remote GPU nodes via Cloud Interconnect, implementing RoCE networking in place of their traditional InfiniBand setup, leveraging Multus CNI for pod-level RDMA interfaces, and using Google's Managed Instance Groups (MIGs) to orchestrate rack-scale GPU systems including the complex NVL72 topology of GB200 GPUs. This infrastructure now successfully serves ChatGPT and API workloads with proper isolation, security, and performance at scale."
notion:
  pageId: "398f8dff-2538-800c-adce-deb0d4cd5164"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-09T11:45:00.000Z"
  lastEditedTime: "2026-07-09T15:20:00.000Z"
  publishedAt: "2026-07-09T15:23:17Z"
---

## Overview

OpenAI presented a comprehensive case study on how they scale large language model inference workloads using Google Cloud Platform's GPU infrastructure orchestrated through Kubernetes. The presentation was delivered at Google Cloud Next 2026 by two engineers from OpenAI's fleet team, Fangyuan Li and John Fishbein, who manage the Kubernetes clusters powering both ChatGPT API inference and training workloads for next-generation models.

The core business driver for this infrastructure work stems from the launch of ImageGen V1 in March 2025, which created unprecedented demand that literally caused GPUs to melt under the load. With ImageGen V2 launching around the same time in 2026, OpenAI needed to dramatically scale their GPU capacity while maintaining operational consistency and speed of execution. This led to an initiative to onboard third-party GPU providers at massive scale, with Google Cloud being a primary partner.

## Architecture and Multi-Cloud Connectivity

OpenAI's infrastructure architecture is notable for its hybrid approach to cloud resources. Rather than running entirely within a single cloud provider, they maintain their Kubernetes control planes in their existing primary provider while connecting GPU compute nodes from Google Cloud as remote workers. This design choice allows them to preserve their existing operational interfaces and ingress endpoints that other teams at OpenAI depend on, minimizing disruption during the rapid scaling effort.

The connectivity layer uses standard Cloud Interconnect solutions to bridge between providers. Physical switch ports are opened on both ends with BGP sessions established between them. Depending on the data path topology, traffic may or may not traverse the provider's backbone. This setup enables them to run Google Cloud VMs and bare metal nodes as Kubernetes workers, with bare metal nodes also supporting IPVLAN configurations. The key requirement was maintaining a consistent interface for workload consumers - specifically, a set of ingress endpoints accessible within the existing provider, so that application teams wouldn't need to change how they interact with GPU resources based on where those resources physically run.

## RoCE Networking Implementation

A significant technical challenge was migrating from their historical InfiniBand-based networking stack to RoCE (RDMA over Converged Ethernet) on Google Cloud. OpenAI's internal libraries were built directly on top of libverbs, assuming InfiniBand throughout. While RoCE provides RDMA capabilities, it introduces Ethernet and IP networking into the picture, fundamentally changing the protocol stack.

The technical differences are substantial: RoCE v2 essentially replaces InfiniBand headers with Ethernet, IP, and UDP headers. This means that in addition to having a device under /dev that libraries can program against for operations like opening queue pairs and sending data, there's also a standard networking device similar to eth0. Metadata for the RoCE interface is exposed through sysfs at /sys/class/infiniband, and the GID table for RoCE contains addresses that map one-to-one to IP addresses assigned to the interfaces.

OpenAI's workload requirements added complexity to this networking challenge. Their inference workloads run in pod network namespaces for better isolation and easier policy enforcement, a practice they wanted to continue. They also aimed to minimize new runtime dependencies to simplify operations and reduce risk during their aggressive timeline. Additionally, they wanted to enable a shared RoCE interface model where daemonsets running alongside workloads could potentially leverage RDMA for their own operations.

## Multus CNI and Pod Networking

The solution to pod-level RoCE networking came through Multus, a Container Network Interface plugin that manages additional network interfaces beyond the primary networking interface handled by the existing CNI. In OpenAI's case, Multus manages the four or eight additional RoCE interfaces depending on the GPU SKU.

Their Multus configuration uses a host-device type, which moves the host RoCE interfaces into the pod's networking namespace. The interfaces are identified using PCI bus IDs that uniquely identify host interfaces and remain constant for a given SKU. For IP address management, they leverage IPAM of type DHCP, allowing them to use Google's existing infrastructure to manage IP lifecycles for workloads. This approach is notably cleaner than configurations they use with other providers, which require manual IP address management with patched versions of Multus and various sysctl settings.

By moving RoCE interfaces from the host into specific pod network namespaces, the interfaces become exclusive to those pods. For the shared RoCE interface model they desired, OpenAI is exploring IPVLAN plus IP aliasing for RDMA subnet support, a feature still in beta during active collaboration with Google's engineering team. Demonstrations showed pods successfully performing RDMA operations with bandwidth approaching 400 gigabits per second across pods using their assigned RoCE interfaces, with the GID table properly reflecting the pod's assigned IPs.

## Managed Instance Groups for GPU Orchestration

A critical component of OpenAI's infrastructure management on Google Cloud is their extensive use of Managed Instance Groups. Every GCP GPU node in OpenAI's fleet is a member of a MIG, enabling them to scale from one GPU node to thousands or more with consistency. MIGs allow them to define an instance template once that captures their opinionated requirements for host OS images, specific GPU driver versions, and hardware pinning preferences, then scale uniform fleets of instances from that template.

MIGs also provide lifecycle management capabilities essential for GPU infrastructure. Unlike traditional cloud computing where users are typically indifferent to which physical host runs their workload, GPU infrastructure requires topology awareness. Google Cloud's terminology of subblocks (individual racks of GPUs) and ML block rail groups allows fine-grained control over physical infrastructure placement. OpenAI uses MIG targeting to specify which specific subblock or rack their instances should run on, ensuring proper topology alignment for their workloads.

## GB200 NVL72 and Rack-Scale Systems

The newest generation of NVIDIA GPUs represents a paradigm shift from previous architectures. The H200, the previous state-of-the-art, was a single large machine with compute, memory, and power densely packed into one box. As applications continued growing beyond what a single machine could handle, NVIDIA took a horizontal scaling approach with the GB200, which is sold as a rack of machines rather than a single unit.

Each GB200 rack contains 18 physical hosts, each with four GPUs, forming 72 GPUs total connected via NVLink. This creates an NVL72 domain where any GPU in the rack can communicate with any other at extremely fast speeds and high bandwidth. This multi-node NVLink capability is now required for state-of-the-art models that have grown too large for single machines.

Making this rack-scale architecture work on Google Cloud required rack-aware software systems. A key component is IMEX, which functions as the control plane for NVLink across nodes. IMEX must run as a service on each physical host to make every other host aware of the NVLink fabric topology. Configuring IMEX presented challenges that OpenAI worked closely with Google to solve. Their approach involves scheduling logic that targets Kubernetes pods onto specific racks of GPUs, with all nodes in a given engine deployment residing within the same subblock to ensure NVLink connectivity.

## IMEX Configuration and NVLink Management

OpenAI fully controls IMEX configuration once nodes are booted. Since they operate single-tenant GPU infrastructure where OpenAI uses all GPUs without redistribution, they statically configure the IMEX domain to span the entire NVLink domain. Each node's IMEX configuration identifies its peers in the rack with resolvable hostnames, creating the fully connected NVLink domain that engine pods scheduled on those nodes use to share weights and serve ChatGPT efficiently.

This static configuration approach makes sense for their use case where workloads self-isolate rather than sharing NVLink domains. In the future, they could potentially use Dynamic Resource Allocation mechanisms to dynamically configure IMEX domains, but their current needs don't require shrinking the NVLink domain since all 72 GPUs in a rack form a single IMEX domain. The Cloud-based nature of these resources, where instances come up and down frequently, drives their preference for configurations that minimize forced IMEX reconfiguration when individual nodes restart.

## Live Production Demonstration

The presentation included live demonstrations of their production infrastructure serving ChatGPT. They showed actual ChatGPT engines, which represent the smallest unit of compute for serving ChatGPT, as sets of Kubernetes pods scheduled onto specific racks of GPUs. Their scheduling logic targets pods to nodes within the same subblock, ensuring all nodes in an engine deployment share NVLink connectivity.

Demonstrations covered pods both with and without RoCE interfaces, showing the eight RDMA devices visible within pods, the networking devices with assigned IPs from RDMA subnets managed by Google Cloud, and the GID tables properly reflecting pod-assigned IPs. They performed RDMA bandwidth tests achieving close to 400 gigabits per second. For NVLink, they showed IMEX configurations on actual nodes listing all peer nodes in the rack with resolvable hostnames, creating the fully connected fabric used by production ChatGPT engines.

## Operational Considerations and Maintenance

The shift from single-node to rack-aware systems has impacted multiple layers of OpenAI's stack, including scheduling, provisioning, and maintenance workflows. They are actively building rack-aware maintenance systems, with MIGs providing APIs to trigger maintenance at both individual node and rack levels depending on the use case. Google Cloud's approach increasingly thinks of maintenance at rack scale to avoid disruptions within racks, applying this philosophy to firmware updates, compute maintenance, and Kubernetes operations at the node pool or subblock level.

At the workload level, OpenAI has built abstractions that provide tolerance to individual node failures within a rack, adding resiliency to their serving infrastructure. This layered approach to fault tolerance allows them to handle hardware issues without taking down entire serving engines.

## Deployment Scale and Integration

The infrastructure demonstrated handles production ChatGPT traffic across numerous MIGs, each representing a rack of GPUs. The seamless integration with their existing Kubernetes-based operational model allows OpenAI to present a unified interface to application teams regardless of where GPUs physically run. This abstraction is critical for their velocity, enabling rapid onboarding of new GPU capacity without requiring changes to consuming applications or internal tooling.

The solutions developed for Google Cloud are being considered for generalization to other providers. OpenAI actively tracks upstream Kubernetes developments, particularly around Dynamic Resource Allocation and other scheduling primitives that could replace some of their provider-specific implementations with more standardized approaches. This reflects their broader strategy of maintaining operational consistency while leveraging diverse infrastructure sources to meet their substantial and growing compute demands for training and serving large language models at scale.
