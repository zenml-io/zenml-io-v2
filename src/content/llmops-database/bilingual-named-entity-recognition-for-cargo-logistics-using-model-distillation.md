---
title: "Bilingual Named Entity Recognition for Cargo Logistics Using Model Distillation"
slug: "bilingual-named-entity-recognition-for-cargo-logistics-using-model-distillation"
draft: false
llmopsTags:
  - "document-processing"
  - "classification"
  - "knowledge-distillation"
  - "few-shot"
  - "model-optimization"
  - "serverless"
  - "databases"
  - "monitoring"
  - "amazon-aws"
industryTags: "other"
company: "IBS Software"
summary: "IBS Software's Cargo system needed to extract 23 different entity types from thousands of daily bilingual cargo logistics emails in English and Japanese. The challenge involved managing manual intervention bottlenecks, achieving high accuracy across both languages, and maintaining cost-effectiveness at scale. IBS Software leveraged Amazon Bedrock's managed model distillation capabilities to distill knowledge from Amazon Nova Pro (teacher model) into the more efficient Amazon Nova Lite (student model). The resulting solution achieved 95.085% F1-Score accuracy while reducing operational costs by 14x compared to using the larger teacher model. The distilled model retained 98% of the teacher's performance and now processes cargo emails in real-time with sub-2-second latency."
link: "https://aws.amazon.com/blogs/machine-learning/building-bilingual-ner-for-cargo-logistics-with-amazon-bedrock/"
year: 2026
seo:
  title: "IBS Software: Bilingual Named Entity Recognition for Cargo Logistics Using Model Distillation - ZenML LLMOps Database"
  description: "IBS Software's Cargo system needed to extract 23 different entity types from thousands of daily bilingual cargo logistics emails in English and Japanese. The challenge involved managing manual intervention bottlenecks, achieving high accuracy across both languages, and maintaining cost-effectiveness at scale. IBS Software leveraged Amazon Bedrock's managed model distillation capabilities to distill knowledge from Amazon Nova Pro (teacher model) into the more efficient Amazon Nova Lite (student model). The resulting solution achieved 95.085% F1-Score accuracy while reducing operational costs by 14x compared to using the larger teacher model. The distilled model retained 98% of the teacher's performance and now processes cargo emails in real-time with sub-2-second latency."
  canonical: "https://www.zenml.io/llmops-database/bilingual-named-entity-recognition-for-cargo-logistics-using-model-distillation"
  ogTitle: "IBS Software: Bilingual Named Entity Recognition for Cargo Logistics Using Model Distillation - ZenML LLMOps Database"
  ogDescription: "IBS Software's Cargo system needed to extract 23 different entity types from thousands of daily bilingual cargo logistics emails in English and Japanese. The challenge involved managing manual intervention bottlenecks, achieving high accuracy across both languages, and maintaining cost-effectiveness at scale. IBS Software leveraged Amazon Bedrock's managed model distillation capabilities to distill knowledge from Amazon Nova Pro (teacher model) into the more efficient Amazon Nova Lite (student model). The resulting solution achieved 95.085% F1-Score accuracy while reducing operational costs by 14x compared to using the larger teacher model. The distilled model retained 98% of the teacher's performance and now processes cargo emails in real-time with sub-2-second latency."
notion:
  pageId: "390f8dff-2538-80e6-b997-f7b95f07662f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-01T19:37:00.000Z"
  lastEditedTime: "2026-07-01T19:37:00.000Z"
  publishedAt: "2026-07-01T19:40:51Z"
---

## Overview

IBS Software operates a cargo logistics system that processes thousands of bilingual email messages daily, extracting critical information from both English and Japanese correspondence. The company needed to build a production-grade Named Entity Recognition (NER) system capable of identifying 23 distinct entity types including air waybill numbers, flight details, weights, dimensions, commodity descriptions, shipper and consignee information, special handling codes, and delivery instructions. The bilingual nature of the problem significantly increased complexity, as the system needed to maintain consistent accuracy across both languages while remaining cost-effective at scale.

The case study demonstrates a complete LLMOps journey from initial exploration through production deployment. The team faced the classic challenge of balancing accuracy with operational costs, while also dealing with the technical complexity of building a bilingual NER system. This represents a typical production use case where domain-specific entity extraction is critical to business operations, and where downtime or low accuracy would directly impact logistics operations.

## Initial Challenges and Open-Source Exploration

The IBS Software team initially attempted to solve the problem using open-source frameworks including PyTorch-based implementations and the TextBrewer library for knowledge distillation. This approach proved unsuccessful for several reasons that are common in real-world LLMOps scenarios. The team encountered significant complexity in configuring distillation pipelines specifically optimized for bilingual data, which requires careful handling of character encodings, tokenization strategies, and language-specific patterns. They also found themselves lacking managed infrastructure for both training and deployment, which meant the team had to handle provisioning, scaling, monitoring, and maintenance of custom infrastructure.

Hyperparameter tuning for token-level distillation proved particularly challenging in the open-source environment, as the team needed to find the right balance between learning rate, temperature parameters, loss function weights, and other distillation-specific configurations. Finally, the open-source solutions showed poor integration patterns with their existing email processing workflow, which required additional engineering effort to bridge the gaps. This experience highlights a common LLMOps challenge where the initial choice of tooling can significantly impact time-to-production and ongoing operational burden.

## Solution Architecture and Amazon Bedrock Distillation

After experiencing these challenges, IBS Software pivoted to using Amazon Bedrock's managed model distillation capabilities. They selected Amazon Nova Pro as their teacher model and Amazon Nova Lite as the student model, implementing a token-based distillation approach. This represents a key LLMOps pattern where knowledge from a large, expensive foundation model is transferred to a smaller, more efficient model that retains most of the performance characteristics while being significantly cheaper to operate at scale.

The team configured their distillation with specific hyperparameters that proved effective for their bilingual use case. They set a maximum sequence length of 2048 tokens, which was carefully chosen to accommodate typical cargo email lengths while avoiding unnecessary computational overhead. The training ran for 4 epochs over 70 training steps, using token-level KL divergence as the loss function, which measures how closely the student model's probability distributions match those of the teacher model at each token position.

The training process showed strong evidence of successful knowledge transfer, with the loss decreasing from 0.05 to 0.008 over the 70 steps. This dramatic reduction in loss indicates that the Nova Lite model was effectively learning to mimic the predictions of the Nova Pro teacher model. The managed nature of Amazon Bedrock's distillation provided several advantages that are critical for production LLMOps including automatic hyperparameter optimization, native support for token-level distillation, seamless integration with AWS services, and built-in monitoring and evaluation metrics.

## Dataset Preparation and Annotation

The team invested significant effort in creating a high-quality training dataset, which is often the most critical yet time-consuming aspect of any production NLP system. They annotated 500 real-world cargo logistics emails, with 350 in English and 150 in Japanese. Each email required manual annotation by domain experts who were familiar with cargo logistics terminology, ensuring that all 23 entity types were correctly labeled with proper boundaries. This annotation process took approximately 3 weeks, representing a substantial investment in data quality that proved essential to achieving strong model performance.

The dataset composition reveals an imbalance between English and Japanese examples, with more than twice as many English emails as Japanese ones. This imbalance later manifested in performance differences between the two languages, illustrating a common LLMOps challenge where training data distribution directly impacts model behavior in production. The team had to implement mitigation strategies to address this imbalance and improve Japanese language performance.

## Model Evaluation and Performance Analysis

The evaluation methodology centered on F1-Score, which provides a balanced measure of precision and recall by computing their harmonic mean. This is a standard choice for NER tasks where both false positives and false negatives carry significant operational costs. The results showed that the base Nova Lite model achieved approximately 84% overall F1-Score before customization, demonstrating the limitations of using foundation models without task-specific training.

After distillation, the teacher model (Amazon Nova Pro) achieved 97.0% overall F1-Score, with 97.8% on English text and 96.2% on Japanese text. The distilled student model (Amazon Nova Lite) achieved 95.085% overall F1-Score, with 96.535% on English text and 93.635% on Japanese text. These results demonstrate that the customized Nova Lite model gained approximately 10 percentage points in accuracy compared to the base model, while retaining 98% of the teacher model's performance. Critically, this performance came with a 14x reduction in operational costs, highlighting the practical value of model distillation for production deployments.

The performance gap between English and Japanese (approximately 2.9 percentage points) reveals language-specific challenges that are common in multilingual LLMOps scenarios. The Japanese language presents unique difficulties including complex kanji character combinations in commodity descriptions, ambiguous entity boundaries due to the lack of spaces between words, and the smaller volume of training data. Multi-line delivery instructions with embedded entities also occasionally caused boundary detection errors, particularly when entities spanned multiple lines or were formatted inconsistently.

## Error Analysis and Mitigation Strategies

The team implemented several strategies to address the identified challenges, demonstrating mature LLMOps practices around error analysis and continuous improvement. They augmented the Japanese training data with synthetic examples to help balance the dataset and improve coverage of Japanese-specific patterns. They also applied post-processing rules for known entity patterns such as AWB number formats and flight number regular expressions, which provided deterministic fallbacks when the model's predictions were uncertain.

Confidence thresholding was implemented to flag low-confidence predictions for human review, creating a human-in-the-loop workflow that ensures critical business operations don't proceed with potentially incorrect information. This hybrid approach, combining model predictions with human oversight for edge cases, represents a practical LLMOps pattern for high-stakes applications where accuracy is paramount.

## Production Deployment Architecture

The production deployment demonstrates a well-architected serverless approach to LLMOps that leverages multiple AWS services in an integrated pipeline. The workflow begins with email ingestion, where cargo emails arrive as .eml files stored in Amazon S3, providing durable and scalable storage for incoming messages. AWS Lambda functions handle preprocessing by extracting email bodies and metadata, providing a serverless compute layer that scales automatically with demand.

For inference, the system calls the Amazon Bedrock endpoint with the distilled Nova Lite model, which processes the text and returns all 23 entity types along with confidence scores for each prediction. Post-processing logic then applies validation rules and confidence filtering to ensure output quality before storing structured JSON results in Amazon DynamoDB. This architecture achieves end-to-end processing latency of under 2 seconds, meeting real-time requirements while maintaining 95.085% accuracy.

The code example provided in the case study shows a straightforward integration pattern where a Python Lambda function uses the boto3 SDK to invoke the Amazon Bedrock model. The function specifies the custom model ARN (from the distilled model), sends the email text as input, specifies NER as the task type, and provides the list of 23 entity types to extract. The simplicity of this integration demonstrates how managed services like Amazon Bedrock reduce the operational burden of running custom ML models in production compared to self-hosted alternatives.

## Project Timeline and Team Structure

The complete project took approximately 4 months with a team of nine researchers and engineers, providing useful benchmarking data for organizations considering similar initiatives. The first month focused on dataset preparation and the manual annotation of 500 bilingual emails. The second month involved exploring and ultimately struggling with open-source frameworks including PyTorch and TextBrewer. The third month achieved the breakthrough by successfully implementing distillation using Amazon Bedrock with the Nova Pro to Nova Lite knowledge transfer. The fourth month handled production deployment and optimization, including integration with existing systems and performance tuning.

This timeline illustrates that even with managed services, building a production-quality bilingual NER system requires substantial investment in data preparation, experimentation, and deployment engineering. The failed attempt with open-source frameworks consumed an entire month but provided valuable learning that informed the eventual success with Amazon Bedrock.

## Critical Assessment and Limitations

While the case study presents an impressive outcome, several limitations and considerations warrant attention. The reliance on Amazon Bedrock's managed distillation creates vendor lock-in, as the distilled model is tied to AWS infrastructure and cannot easily be exported to other platforms. The case study does not discuss costs in absolute terms, only mentioning a 14x reduction, leaving readers without clarity on actual operational expenses at scale.

The training dataset of 500 emails, while producing good results, is relatively small for production NER systems, which often benefit from thousands or tens of thousands of examples. The 2.9 percentage point performance gap between English and Japanese suggests the system may not be equally reliable for both languages in production, potentially requiring additional human oversight for Japanese text. The case study also does not address how the model handles edge cases such as mixed-language emails, unusual formatting, or entity types that differ between English and Japanese contexts.

The evaluation methodology based solely on F1-Score provides limited insight into real-world performance characteristics. The case study does not report precision and recall separately, which would help understand whether the system tends toward false positives or false negatives. There is no discussion of how entity-level performance varies across the 23 different types, which likely show significant variation in difficulty and accuracy. The lack of information about production monitoring, model drift detection, retraining strategies, or incident response procedures leaves gaps in understanding the complete LLMOps lifecycle.

## LLMOps Best Practices Demonstrated

Despite these limitations, the case study demonstrates several LLMOps best practices. The team's willingness to abandon open-source approaches in favor of managed services shows pragmatic decision-making focused on time-to-value rather than technological purity. The careful attention to evaluation metrics including overall accuracy, per-language performance, and the relationship between teacher and student models demonstrates rigorous validation practices. The implementation of post-processing rules and confidence thresholding shows mature thinking about hybrid AI systems that combine model predictions with deterministic logic and human oversight.

The serverless architecture using AWS Lambda, S3, and DynamoDB provides automatic scaling, reduced operational overhead, and pay-per-use economics that are well-suited to variable workloads. The sub-2-second processing latency indicates the team successfully optimized the entire pipeline for real-time performance, which is critical for production systems that need to keep pace with incoming emails.

## Broader Implications for LLMOps

This case study illustrates several important trends in production LLM deployments. Model distillation is emerging as a critical technique for making foundation models economically viable at scale, particularly for high-volume applications where inference costs dominate the total cost of ownership. Managed services like Amazon Bedrock are lowering the barrier to entry for organizations that want to deploy custom LLM-based solutions without building extensive ML infrastructure. Bilingual and multilingual applications present unique challenges that require careful attention to data balance, evaluation methodology, and language-specific error patterns.

The 14x cost reduction achieved through distillation while maintaining 98% of teacher model performance suggests that many organizations may be over-provisioning compute resources by using large foundation models directly in production when smaller distilled models would suffice. This has important implications for the economics of LLM deployment and the environmental impact of running large models at scale.

For organizations facing similar bilingual NER challenges or considering knowledge distillation for their own use cases, this case study provides valuable guidance on dataset requirements, expected timelines, team structure, and the practical tradeoffs between open-source and managed approaches. The success with Amazon Bedrock distillation after failing with open-source frameworks highlights how the maturity of managed ML services is shifting the cost-benefit analysis away from self-hosted solutions for many use cases.
