---
title: "Using SageMaker for Machine Learning Model Deployment with Zillow Floor Plans"
slug: "zillow-zillows-ml-platform-using-sagemaker-for-machine-learning-model-deployment-with-zillow-floor-plans"
draft: false
mlopsTags:
  - "metadata-store"
  - "model-serving"
  - "pipeline-orchestration"
  - "docker"
  - "kubeflow"
  - "mlflow"
  - "sagemaker"
  - "terraform"
  - "deployment"
  - "monitoring"
  - "serving"
industryTags: "other"
company: "Zillow"
companySlug: "zillow"
platformName: "Zillow's ML platform"
contentType: "blog"
summary: "Zillow built a scalable ML model deployment infrastructure using AWS SageMaker to serve computer vision models that detect windows, doors, and openings in panoramic images for automated floor plan generation. After evaluating dedicated servers, EC2 instances, and SageMaker, they chose SageMaker's batch transform feature despite a 40% cost premium, prioritizing ease of use, reliability, and AWS ecosystem integration. The team designed a serverless orchestration pipeline using Step Functions and Lambda to coordinate multi-model inference jobs, storing predictions in S3 and DynamoDB for downstream consumption. This infrastructure enabled scalable processing of 3D Home tour imagery while minimizing operational overhead through offline batch inference rather than maintaining always-on endpoints."
link: "https://www.zillow.com/tech/sagemaker-ml-model-deployment-floor-plans/"
year: 2020
seo:
  title: "Zillow: Using SageMaker for Machine Learning Model Deployment with Zillow Floor Plans - ZenML MLOps Database"
  description: "Zillow built a scalable ML model deployment infrastructure using AWS SageMaker to serve computer vision models that detect windows, doors, and openings in panoramic images for automated floor plan generation. After evaluating dedicated servers, EC2 instances, and SageMaker, they chose SageMaker's batch transform feature despite a 40% cost premium, prioritizing ease of use, reliability, and AWS ecosystem integration. The team designed a serverless orchestration pipeline using Step Functions and Lambda to coordinate multi-model inference jobs, storing predictions in S3 and DynamoDB for downstream consumption. This infrastructure enabled scalable processing of 3D Home tour imagery while minimizing operational overhead through offline batch inference rather than maintaining always-on endpoints."
  canonical: "https://www.zenml.io/mlops-database/zillow-zillows-ml-platform-using-sagemaker-for-machine-learning-model-deployment-with-zillow-floor-plans"
  ogTitle: "Zillow: Using SageMaker for Machine Learning Model Deployment with Zillow Floor Plans - ZenML MLOps Database"
  ogDescription: "Zillow built a scalable ML model deployment infrastructure using AWS SageMaker to serve computer vision models that detect windows, doors, and openings in panoramic images for automated floor plan generation. After evaluating dedicated servers, EC2 instances, and SageMaker, they chose SageMaker's batch transform feature despite a 40% cost premium, prioritizing ease of use, reliability, and AWS ecosystem integration. The team designed a serverless orchestration pipeline using Step Functions and Lambda to coordinate multi-model inference jobs, storing predictions in S3 and DynamoDB for downstream consumption. This infrastructure enabled scalable processing of 3D Home tour imagery while minimizing operational overhead through offline batch inference rather than maintaining always-on endpoints."
mlops:
  source: "sqlite"
  entryId: 141
  sourceUrl: "https://www.zillow.com/tech/sagemaker-ml-model-deployment-floor-plans/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061831"
  lastUpdated: "2026-04-14 10:02:24"
---

## Problem Context

Zillow's Floor Plan product required an automated system to detect windows, doors, and openings (WDO) from panoramic images captured during 3D Home tours. The business challenge was to reduce the time and cost of manual floor plan generation while improving data quality for downstream use cases like sunlight simulation and automatic room merging. The ML team had already trained computer vision models locally using TensorFlow but needed production infrastructure to deploy and serve these models at scale.

The key MLOps challenges centered on finding the right deployment architecture that balanced multiple concerns. The infrastructure needed to integrate seamlessly with existing Zillow services and data pipelines, which were already built within the AWS ecosystem. It had to be scalable and reliable enough to handle growing demand for Zillow 3D Home tours and virtual offerings. The system needed to support easy addition of new ML models without requiring significant rework. Finally, the solution should be reusable across other parts of Zillow's infrastructure rather than being purpose-built for a single application.

The team evaluated several deployment options including dedicated on-premises servers within Zillow's infrastructure and custom inference servers running on AWS EC2 instances. Each approach presented different trade-offs around cost, operational complexity, and integration effort. The fundamental question was whether to build custom infrastructure with lower direct costs but higher engineering overhead, or to adopt a managed service that simplified operations at a premium price point.

## Architecture & Design

The final architecture leverages AWS SageMaker for model serving orchestrated through a serverless pipeline built with Step Functions, Lambda, S3, DynamoDB, and CloudWatch. The design centers on batch inference rather than real-time endpoints, reflecting the application's timing requirements and cost optimization goals.

The data flow begins when a Zillow 3D Home tour completes successfully. All panoramic images from the tour are automatically uploaded to S3 storage. When a tour requires floor plan generation, a CloudWatch alarm triggers a Step Functions workflow that coordinates the entire inference pipeline. This serverless orchestration approach minimizes idle compute costs while maintaining flexibility.

The Step Functions workflow orchestrates several atomic operations in sequence. Initial preprocessing steps clean input images and calculate metadata useful for downstream processing. The workflow then spawns multiple Lambda functions in parallel, with each Lambda responsible for a different ML model's inference pipeline. This parallel execution pattern ensures that adding new models doesn't increase the critical path time for the overall process.

Each Lambda function follows a consistent state machine pattern: prepare data, trigger batch transform job, monitor job status, wait for completion, then clean and map results. This start-monitor-wait-monitor-end design is crucial because it avoids paying for Lambda compute time during the actual inference process, which can take up to an hour for large image sets. The Lambda functions are written to be model-agnostic, meaning adding a new model simply requires deploying another Lambda with appropriate configuration rather than rewriting orchestration logic.

SageMaker batch transform jobs execute on ephemeral EC2 instances. Each job follows a lifecycle: create an EC2 instance using a Docker image from ECR, load ML model artifacts and start the framework-specific model server, run inference on the input dataset from S3, save output predictions to S3, then terminate the instance. This serverless compute model means the team only pays for actual inference time rather than maintaining always-on capacity.

The model serving layer uses TensorFlow Model Server as the inference runtime since the WDO models were trained in TensorFlow. The model server acts as an abstraction layer between the raw model and RESTful API requests, handling preprocessing, inference execution, and postprocessing through specialized handler functions. Model artifacts include the frozen TensorFlow model along with inference code packaged in the format expected by SageMaker's TensorFlow containers.

After inference completes, predictions are stored as JSON objects in S3. Metadata and pointers to these JSON files are also written to DynamoDB, enabling quick lookup for downstream services that need access to predictions without scanning S3. This dual storage strategy balances cost-effective bulk storage with low-latency indexed access.

## Technical Implementation

The infrastructure builds on several AWS services working together. SageMaker provides the managed model serving capability. Lambda functions, written as serverless FaaS components, handle orchestration logic. Step Functions coordinate the workflow state machine. S3 serves as the data lake for input images, model artifacts, and prediction outputs. DynamoDB provides indexed metadata storage. CloudWatch triggers workflows and monitors system health. ECR stores Docker container images with custom inference code. EC2 instances power the actual compute, managed automatically by SageMaker.

For model deployment, the team creates SageMaker model configurations that specify EC2 instance properties and model artifact locations. The instance configuration includes the number of instances, Docker image URI from ECR, and CPU/GPU specifications. Model artifacts consist of the frozen TensorFlow model files and custom inference code following SageMaker's expected directory structure and interface conventions. The TensorFlow Model Server handles the actual model loading and prediction serving.

The Docker images used are based on AWS's pre-built deep learning containers for TensorFlow, customized with additional preprocessing and postprocessing logic specific to the WDO detection task. Using AWS's pre-built images provides a cost benefit by eliminating ECR storage charges that would apply to fully custom images.

The team implemented batch transform jobs specifically on CPU instances rather than GPU. This decision came after extensive experimentation comparing instance types, batch sizes, and cost profiles. The ml.m5.large instance type emerged as the cost-effective choice for their workload characteristics. While GPU instances offered faster per-image inference, the cost premium didn't justify the speedup for batch workloads with flexible timing requirements.

Lambda functions are written to be stateless and reusable. Each function accepts configuration parameters identifying which model to run, input data locations, and output destinations. This parameterization enables the same Lambda code to serve multiple models by varying the configuration. The functions use boto3, AWS's Python SDK, to interact with SageMaker APIs for job submission and status monitoring.

The CI/CD pipeline uses GitLab to manage model artifacts in a version-controlled repository. The pipeline automates several quality gates: building custom Docker images per ML framework, formatting and linting inference code, running training and inference tests, and validating model performance against predefined metrics on a test image set. This automation ensures that model updates meet quality standards before deployment.

## Scale & Performance

The team provided specific cost analysis comparing online versus offline inference options. For online inference using an ml.m5.large endpoint serving 1000 images daily, costs depend heavily on instance utilization and whether the endpoint runs continuously. The rough calculation showed that batch transform (offline inference) was significantly more economical for their use case.

Batch transform on ml.m5.large instances costs $0.134 per hour compared to $0.096 per hour for a standard m5.large EC2 instance, representing roughly 40% markup over raw EC2 pricing. However, this premium includes fully managed provisioning, monitoring, and teardown of infrastructure. Additional costs include ECR storage at $0.10 per GB per month and data transfer at $0.016 per GB, though these are negligible compared to instance costs. Using AWS's pre-built Docker images and storing data in S3 within the same region eliminates both ECR and data transfer costs entirely.

A critical consideration for batch inference is the fixed overhead of booting Docker containers and installing packages, which takes one to two minutes regardless of job size. This fixed cost needs to be amortized across sufficiently large batches to maintain efficiency. For small inference jobs, this overhead could dominate total runtime, but for Zillow's typical workloads processing entire 3D tour image sets, the startup time is proportionally small.

The infrastructure processes panoramic images from completed 3D Home tours. While specific throughput numbers aren't provided, the system is designed to handle hour-long batch inference jobs for large image sets. The parallel Lambda execution pattern means adding additional ML models doesn't increase end-to-end processing time, allowing the system to scale horizontally across model types rather than requiring sequential processing.

The timing requirements were sufficiently relaxed that real-time inference wasn't necessary. There exists adequate time between panorama creation and when predictions are needed for floor plan generation or annotation workflows. This timing flexibility enabled the cost optimization of batch processing rather than maintaining expensive always-on endpoints.

## Trade-offs & Lessons

The central architectural trade-off was accepting a 40% cost premium for SageMaker versus raw EC2 instances in exchange for reduced operational complexity and tighter AWS ecosystem integration. This decision prioritized engineering velocity and system reliability over minimizing infrastructure spend. For a team focused on ML model development rather than infrastructure operations, the managed service approach made sense despite higher per-hour costs.

Choosing batch transform over real-time endpoints represented another key trade-off. Online inference via SageMaker endpoints enables sub-second response times but requires maintaining compute capacity 24/7, paying for idle time during periods of low demand. Endpoints take approximately 10 minutes to provision, making dynamic scaling less practical. Batch transform eliminates idle costs but introduces latency measured in minutes to hours. The team determined their application could tolerate batch processing delays, making this the clear cost winner.

The decision to use CPU instances rather than GPU reflects workload-specific optimization. GPU instances accelerate individual inference operations but cost significantly more per hour. For batch workloads where timing is flexible and images can be processed in parallel across multiple CPU instances, the cost per inference can be lower on CPU despite slower per-image performance. The team ran extensive experiments varying instance types, instance counts, and batch sizes to identify the optimal configuration for their specific models and data volumes.

The model-agnostic Lambda design proved valuable for extensibility. By abstracting the orchestration logic from model-specific details, the team created reusable infrastructure that supports adding new models by deploying additional Lambda functions with appropriate parameters. This design avoids the anti-pattern of hardcoding model-specific logic throughout the pipeline, which would make each new model a significant integration effort.

The dual storage strategy using both S3 and DynamoDB addresses different access patterns. S3 provides cost-effective storage for large JSON prediction files that may be accessed infrequently. DynamoDB offers low-latency indexed lookups for services that need to quickly find predictions for a given tour or image without scanning S3. This pattern is common in data lake architectures where S3 serves as the system of record while purpose-built databases provide optimized query capabilities.

The start-monitor-wait-monitor-end pattern in Lambda functions demonstrates cost-conscious serverless design. Rather than having a Lambda function run continuously during batch inference, which would incur charges for the entire duration, the function submits the job, exits, and relies on subsequent invocations to check status. This approach minimizes Lambda execution time and associated costs, though it increases implementation complexity compared to synchronous waiting.

The team identified gaps in their infrastructure around model retraining and continuous improvement. While the inference pipeline is production-ready and scalable, automated model retraining remains in the planning stage. They're investigating frameworks like Kubeflow and MLflow to close this loop. The existing GitLab CI/CD pipeline provides quality gates for model updates but doesn't yet automate the full retrain-validate-deploy cycle. This represents a common MLOps maturity pattern where inference infrastructure is built first, with training automation following as a subsequent phase.

The integration with CloudWatch for triggering workflows demonstrates event-driven architecture. Rather than polling for new tours requiring floor plans, the system responds to CloudWatch alarms, enabling reactive processing with minimal latency between tour completion and inference initiation. This pattern is more efficient than scheduled batch jobs that might process work too early or too late relative to actual demand.

One implicit lesson is the value of cost modeling during architecture selection. The team didn't simply choose SageMaker based on features; they performed detailed cost analysis comparing instance types, inference patterns, and operational models. They considered factors like fixed startup overhead for batch jobs, utilization patterns for online endpoints, and amortization of costs across workload sizes. This quantitative approach to infrastructure decision-making is a best practice often overlooked in favor of qualitative technology preferences.

The future roadmap toward automated retraining indicates an understanding that ML infrastructure is never truly "done." As data accumulates from production usage, model performance can degrade or opportunities for improvement emerge. Building the inference pipeline first provides immediate business value while laying groundwork for more sophisticated training automation later. This phased approach manages risk and complexity while delivering incremental value.
