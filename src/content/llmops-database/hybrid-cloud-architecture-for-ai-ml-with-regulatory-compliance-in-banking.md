---
title: "Hybrid Cloud Architecture for AI/ML with Regulatory Compliance in Banking"
slug: "hybrid-cloud-architecture-for-ai-ml-with-regulatory-compliance-in-banking"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69306679610bae22fedd22f7"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:32:05.444Z"
  createdOn: "2025-12-03T16:34:01.832Z"
llmopsTags:
  - "chatbot"
  - "speech-recognition"
  - "customer-support"
  - "regulatory-compliance"
  - "fine-tuning"
  - "embeddings"
  - "rag"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "cost-optimization"
  - "chunking"
  - "kubernetes"
  - "postgresql"
  - "docker"
  - "microservices"
  - "databases"
  - "monitoring"
  - "load-balancing"
  - "orchestration"
  - "security"
  - "compliance"
  - "guardrails"
  - "scalability"
  - "amazon-aws"
  - "anthropic"
industryTags: "finance"
company: "Bank CenterCredit (BCC)"
summary: "Bank CenterCredit (BCC), a leading Kazakhstan bank with over 3 million clients, implemented a hybrid multi-cloud architecture using AWS Outpost to deploy generative AI and machine learning services while maintaining strict regulatory compliance. The bank faced requirements that all data must be encrypted with locally stored keys and customer data must be anonymized during processing. They developed two primary use cases: fine-tuning an automatic speech recognition (ASR) model for Kazakh-Russian mixed language processing that achieved 23% accuracy improvement and $4M monthly savings, and deploying an internal HR chatbot using a hybrid RAG architecture with Amazon Bedrock that now handles 70% of HR requests. Both solutions leveraged their hybrid architecture where sensitive data processing occurs on-premise on AWS Outpost while compute-intensive model training utilizes cloud GPU resources."
link: "https://www.youtube.com/watch?v=dqHjRlZSVNM"
year: 2025
seo:
  title: "Bank CenterCredit (BCC): Hybrid Cloud Architecture for AI/ML with Regulatory Compliance in Banking - ZenML LLMOps Database"
  description: "Bank CenterCredit (BCC), a leading Kazakhstan bank with over 3 million clients, implemented a hybrid multi-cloud architecture using AWS Outpost to deploy generative AI and machine learning services while maintaining strict regulatory compliance. The bank faced requirements that all data must be encrypted with locally stored keys and customer data must be anonymized during processing. They developed two primary use cases: fine-tuning an automatic speech recognition (ASR) model for Kazakh-Russian mixed language processing that achieved 23% accuracy improvement and $4M monthly savings, and deploying an internal HR chatbot using a hybrid RAG architecture with Amazon Bedrock that now handles 70% of HR requests. Both solutions leveraged their hybrid architecture where sensitive data processing occurs on-premise on AWS Outpost while compute-intensive model training utilizes cloud GPU resources."
  canonical: "https://www.zenml.io/llmops-database/hybrid-cloud-architecture-for-ai-ml-with-regulatory-compliance-in-banking"
  ogTitle: "Bank CenterCredit (BCC): Hybrid Cloud Architecture for AI/ML with Regulatory Compliance in Banking - ZenML LLMOps Database"
  ogDescription: "Bank CenterCredit (BCC), a leading Kazakhstan bank with over 3 million clients, implemented a hybrid multi-cloud architecture using AWS Outpost to deploy generative AI and machine learning services while maintaining strict regulatory compliance. The bank faced requirements that all data must be encrypted with locally stored keys and customer data must be anonymized during processing. They developed two primary use cases: fine-tuning an automatic speech recognition (ASR) model for Kazakh-Russian mixed language processing that achieved 23% accuracy improvement and $4M monthly savings, and deploying an internal HR chatbot using a hybrid RAG architecture with Amazon Bedrock that now handles 70% of HR requests. Both solutions leveraged their hybrid architecture where sensitive data processing occurs on-premise on AWS Outpost while compute-intensive model training utilizes cloud GPU resources."
---

## Overview

Bank CenterCredit (BCC) is one of Kazakhstan's leading banks, operating 20 branches and over 150 offices serving more than 3 million clients with services for both retail and business customers. The bank embarked on a cloud transformation journey to address growing business needs and limitations of purely local infrastructure solutions. As presented by Maxim Yen (Head of R&D for DevOps Technologies and Cloud Solutions) and Alex Bernasky (AWS Solution Architect), this case study demonstrates how a highly regulated financial institution successfully deployed generative AI and machine learning workloads using a sophisticated hybrid cloud architecture that satisfies strict regulatory requirements while leveraging cloud scalability.

The bank's strategic objectives for cloud adoption included flexibility and scalability, innovation and competitiveness, reliability and fault tolerance, and economic efficiency. However, as a regulated financial institution, BCC faced mandatory compliance requirements: all data transmission and storage must be encrypted with encryption keys stored within the bank's infrastructure, and customer data must be anonymized during collection and processing. These requirements fundamentally shaped their technical architecture and LLMOps approach.

## Hybrid Architecture Foundation

The bank's solution centered on AWS Outpost, described as a local private AWS cloud stored in the customer's data center. BCC was one of the first organizations in Kazakhstan to deploy this solution, subscribing to two Outpost racks in Q1 2024. The Outpost deployment allowed them to run AWS managed services locally while maintaining compliance with data sovereignty and encryption requirements.

Initially, the bank explored basic managed AWS services on Outpost including managed virtual machines, managed databases, and S3 storage. Given that their application architecture core layer consists of Kubernetes-based microservices spanning more than 20 clusters, they subsequently deployed managed Kubernetes (Amazon EKS) on Outpost and integrated it with internal bank services. This approach was later replicated across AWS cloud regions and other cloud providers, resulting in a multi-cloud Kubernetes architecture with clusters located in their data centers, on Outpost, in AWS cloud regions, and in other clouds, all unified with centralized tools for deployment, management, logging, and load balancing.

## Encryption Architecture and External Key Store (XKS)

A critical component enabling their LLMOps capabilities was the implementation of AWS Key Management Service (KMS) with the External Key Store (XKS) feature. This architecture allows AWS cloud services to use encryption keys that remain physically stored on-premise within the bank's infrastructure. The XKS proxy, located on the AWS Outpost in the bank's data center, facilitates the transfer of local keys to cloud encryption servers.

The XKS implementation follows a principle of double encryption. AWS KMS uses a data key to encrypt data in AWS services, while an additional root key—the external key stored on-premise—provides an extra layer of security. This architecture was essential for meeting regulatory requirements while enabling the bank to leverage cloud-based AI/ML services. All data synchronization between S3 on Outpost and S3 in the cloud region, all model training activities, and all data storage utilize these local keys for encryption, ensuring that the bank maintains cryptographic control over their data even when processed in the cloud.

## Use Case 1: ASR Model Fine-Tuning Pipeline

The first major generative AI use case involved fine-tuning an automatic speech recognition (ASR) model specifically designed for the Kazakh banking context. The business drivers for this project were compelling and specific to the bank's operational environment. Kazakhstan's population primarily speaks Kazakh and Russian, but significantly, there's a "mixed language" phenomenon where speakers intermix Kazakh and Russian words within single conversations. While commercial ASR models existed for Russian and some for Kazakh, no market solution could handle this mixed language effectively.

Additionally, BCC stores call center recordings at 8 kHz frequency for storage efficiency, while most commercial and open-source ASR models are trained on 16 kHz data, resulting in poor performance on the bank's actual recordings. Furthermore, Kazakh is classified as a "low-resource language" with only two publicly available training datasets, both at 16 kHz and limited in vocabulary and features. These constraints motivated the bank to create a custom model using their own call center data.

The fine-tuning pipeline architecture demonstrates sophisticated LLMOps practices balancing on-premise regulatory requirements with cloud compute capabilities. The process begins with call center recordings stored in a Hadoop cluster in the bank's on-premise data center. Each recording is split into two channels (agent and customer), processed through voice activity detection to remove noise and silence, and then segmented into variable-duration chunks ranging from 2 to 20 seconds based on phrase length.

Each audio chunk is then processed by the previous generation speech-to-text model that the bank already had operational. This generates text representations of the audio, creating paired audio-text training data. Notably, this initial processing occurs on-premise using the bank's existing GPU resources. The bank's Outpost configuration doesn't include GPUs—though AWS can provide GPU-equipped Outposts, BCC's deployment doesn't have them. Their on-premise GPU capacity is sufficient for medium-sized model inference but insufficient for large-scale fine-tuning, necessitating the hybrid approach.

Once audio and text pairs are generated, they're transferred to S3 on the Outpost. Here, a critical compliance step occurs: text files are processed with a Named Entity Recognition (NER) model to identify all personally identifiable information, sensitive data, and confidential information. This was a hard requirement from the bank's internal security team—no such data could leave the bank's security perimeter. All chunks where such data was identified were removed entirely from the training dataset, both text and corresponding audio files.

The cleaned and encrypted data is then converted to Mel spectrograms, which the presentation helpfully explains as image representations of audio created through Fourier transformation and Mel scale application. These spectrograms provide a bi-directional representation with time on the X-axis, frequency on the Y-axis, and amplitude represented by color. This format is a data science best practice for audio model training and represents a form of feature engineering that makes the data suitable for transfer to the cloud while being neither raw audio nor text—adding an additional layer of abstraction from the original sensitive recordings.

These Mel spectrograms, fully encrypted with the external keys and cleansed of sensitive data, are synchronized from S3 on Outpost to S3 in the AWS region. There, they serve as the training dataset for a fine-tuning job executed in Amazon SageMaker with access to cloud GPU resources. The resulting model artifacts are then transferred back on-premise where the model is hosted for inference using the bank's local GPU infrastructure.

This architecture represents a sophisticated approach to LLMOps in a regulated environment: leveraging cloud resources for the compute-intensive training phase while keeping all sensitive data processing, data cleaning, and production inference on-premise. The results were substantial: the fine-tuned model achieved 9% accuracy improvement for Russian, 15% for Kazakh, and most significantly, 23% improvement for the mixed language—the primary objective. Additionally, the custom model proved more cost-efficient than the previous commercial solution, generating savings of 4 million Kazakhstani tenge monthly. The model now operates as part of the bank's broader analytics pipeline, with plans to scale further.

## Use Case 2: HR Chatbot with Hybrid RAG

The second use case demonstrates production deployment of a generative AI chatbot using Retrieval-Augmented Generation (RAG) in a hybrid architecture. The bank implemented an internal HR bot to improve the quality and velocity of HR responses, stimulate self-service culture among employees, and allow HR staff to focus on strategic initiatives rather than routine inquiries. As with all bank systems, the solution required full compliance with regulations prohibiting confidential data from leaving the security perimeter.

The architecture implements what the presenters call "hybrid RAG," distinguished by the distribution of components across on-premise and cloud environments. The bank's HR knowledge base—containing internal HR policies and procedures—is processed by an embedding model running on local GPU resources. The resulting vector embeddings are stored in a PostgreSQL database on the AWS Outpost, leveraging PostgreSQL's vector database capabilities through extensions like pgvector.

When an employee interacts with the chatbot UI and submits a prompt, that prompt is processed through the same embedding model on-premise, converting it to a vector representation. This vector is used to query the PostgreSQL vector database on Outpost, which performs semantic search to retrieve relevant context from the HR knowledge base. The original user prompt is then augmented with this retrieved contextual information.

The critical architectural decision is what happens next: the augmented prompt (original question plus relevant HR policy context) is sent from the Outpost to Amazon Bedrock in the AWS region. The bank uses Claude 3.5 Sonnet (or possibly Claude 2.5, the transcript is slightly unclear) as the foundation model. Bedrock processes the augmented prompt and generates a response, which is sent back to the chatbot interface on-premise.

This hybrid RAG architecture represents a pragmatic LLMOps approach balancing multiple concerns. The knowledge base, which contains confidential internal HR policies, never leaves the bank's infrastructure. The embedding process, which requires understanding the semantic content of sensitive documents, occurs on-premise. The vector database, which stores representations of this sensitive information, remains on Outpost within the bank's data center. Only the augmented prompts—which contain general HR policy information retrieved as context but not the entire knowledge base—are sent to the cloud for LLM processing.

This architecture makes a reasonable security trade-off: while individual employee queries and the specific HR policy excerpts retrieved as context do reach the cloud LLM service, the entirety of the HR knowledge base and the employee identity information remain on-premise. The encryption via XKS provides additional protection for data in transit and at rest in cloud services. According to the bank's assessment, approximately 70% of HR requests now go through this chatbot, significantly reducing HR team workload. Employee feedback has been predominantly positive, indicating both functionality and user acceptance.

## LLMOps Considerations and Trade-offs

This case study reveals several noteworthy LLMOps practices and trade-offs in a highly regulated environment. The hybrid architecture represents a sophisticated middle ground between fully on-premise deployments (which lack scalability and access to cutting-edge cloud services) and fully cloud-native deployments (which may violate regulatory requirements or organizational risk tolerance).

The fine-tuning pipeline demonstrates clear separation of concerns: data preparation, cleaning, and anonymization occur where sensitive data resides (on-premise), while compute-intensive model training leverages cloud GPU resources. The use of Mel spectrograms as an intermediate representation is particularly interesting—it transforms sensitive audio data into a format suitable for model training while adding abstraction layers that reduce direct exposure of call recordings.

However, the presentation is clearly promotional for AWS services and doesn't fully address certain practical challenges. For instance, the model development workflow likely involves considerable iteration—data scientists typically need to experiment with different hyperparameters, architectures, and training approaches. The case study doesn't detail how the data science team handles this iterative process across the hybrid boundary. Each training run appears to require data synchronization from Outpost to cloud, which could introduce latency and complexity in the development cycle.

The encryption architecture using XKS is presented as providing strong security guarantees, and while it does ensure that encryption keys remain on-premise, the practical security implications depend on implementation details not fully covered in the presentation. For example, the XKS proxy on Outpost must make keys available to cloud services during encryption/decryption operations, creating a trust boundary that requires careful operational security.

Regarding the HR chatbot, the hybrid RAG architecture makes reasonable trade-offs but isn't without privacy considerations that aren't deeply explored. While the full knowledge base stays on-premise, each user query and the retrieved context do reach the cloud LLM service (Amazon Bedrock). Depending on the sensitivity of HR policies and the specificity of employee questions, this could potentially expose confidential information. The case study doesn't discuss what data governance policies were established around what types of queries are appropriate or how query logs are retained and monitored.

The choice to use managed cloud services (SageMaker, Bedrock) rather than self-hosted open-source alternatives represents a classic build-versus-buy decision. The bank gains access to state-of-the-art models like Claude 3.5 Sonnet and the operational convenience of managed services, but accepts vendor lock-in to AWS and ongoing operational costs. The presentation mentions cost savings from the ASR model but doesn't provide a comprehensive cost analysis comparing the hybrid approach to alternatives.

## Operational Aspects and Scalability

The case study touches on several operational LLMOps considerations. The multi-cloud Kubernetes architecture with centralized tooling for deployment, management, and logging suggests the bank has invested in platform engineering to create a consistent operational experience across environments. This is crucial for LLMOps, where models may be developed in one environment, trained in another, and deployed in yet another.

The ASR model deployment pattern—training in cloud, inference on-premise—implies an operational burden of managing model lifecycle across environments. Model updates, versioning, and rollback procedures would need to account for the hybrid architecture. The presentation states the bank plans to reuse this approach for other AI tasks, suggesting they've developed reusable patterns and tooling, though specifics aren't provided.

For the HR chatbot, the hybrid RAG architecture requires operational coordination between on-premise embedding services, the vector database on Outpost, and Bedrock in the cloud region. Latency, reliability, and monitoring across these components would be important operational concerns. The presentation mentions the solution is successful with 70% of HR requests now using the bot, but doesn't discuss monitoring practices, evaluation metrics, or how the bank measures chatbot quality beyond user feedback.

The bank's plans to replicate the chatbot approach for IT support and procurement indicates they're taking a platform approach—building reusable infrastructure and patterns that can be applied to multiple use cases. This is a mature LLMOps practice that amortizes the complexity of the hybrid architecture across multiple applications.

## Compliance and Governance

The entire architecture is fundamentally shaped by regulatory requirements around data encryption, key management, and data residency. The XKS implementation with external key store appears to satisfy auditor requirements that encryption keys remain under the bank's physical control. The NER-based anonymization in the fine-tuning pipeline demonstrates proactive data governance, ensuring training data is cleansed before leaving the security perimeter.

However, the case study doesn't detail how the bank governs what happens with data once it reaches cloud services. For example, when using Amazon Bedrock, does the bank have contractual guarantees about data retention, model training on their data, or geographic processing locations? These are standard concerns in regulated industries that the presentation doesn't address.

The emphasis on compliance throughout the presentation suggests that regulatory considerations were primary drivers of architectural decisions, not afterthoughts. This is appropriate for financial services but does introduce complexity and potentially limits the bank's ability to leverage certain cloud-native AI capabilities that might require data to be processed entirely in the cloud.

## Conclusion

Bank CenterCredit's case study represents a sophisticated example of LLMOps in a highly regulated environment. The hybrid architecture using AWS Outpost, combined with external key store encryption and careful data anonymization, enables the bank to leverage cloud AI/ML services while maintaining regulatory compliance. The two use cases—ASR fine-tuning and HR chatbot—demonstrate practical applications with measurable business value: significant accuracy improvements and cost savings for ASR, and successful automation of 70% of HR requests.

The architectural patterns are reusable and the bank plans to expand both use cases, suggesting the foundation is solid. However, the presentation is promotional and doesn't deeply explore challenges, trade-offs, or operational complexities that inevitably arise in hybrid environments. The success claims around cost savings and accuracy improvements, while likely directionally correct, aren't supported with detailed methodologies or independent validation. Organizations considering similar approaches should carefully evaluate the operational complexity, cost implications, and security trade-offs of hybrid architectures against their specific regulatory requirements and business needs.