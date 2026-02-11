---
title: "Automating Private Credit Deal Analysis with LLMs and RAG"
slug: "automating-private-credit-deal-analysis-with-llms-and-rag"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "693063639d2d5cf160e22009"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:31:54.568Z"
  createdOn: "2025-12-03T16:20:51.968Z"
llmopsTags:
  - "document-processing"
  - "code-generation"
  - "structured-output"
  - "high-stakes-application"
  - "data-analysis"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "chunking"
  - "error-handling"
  - "fastapi"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "security"
  - "compliance"
  - "anthropic"
  - "amazon-aws"
industryTags: "finance"
company: "Riskspan"
summary: "Riskspan, a technology company providing analysis for complex investment asset classes, tackled the challenge of analyzing private credit deals that traditionally required 3-4 weeks of manual document review and Excel modeling. The company built a production GenAI system on AWS using Claude LLM, embeddings, RAG (Retrieval Augmented Generation), and automated code generation to extract information from unstructured documents (PDFs, emails, amendments) and dynamically generate investment waterfall models. The solution reduced deal processing time from 3-4 weeks to 3-5 days, achieved 87% faster customer onboarding, delivered 10x scalability improvement, and reduced per-deal processing costs by 90x to under $50, while enabling the company to address a $9 trillion untapped market opportunity in private credit."
link: "https://www.youtube.com/watch?v=tgnyLTV5h1s"
year: 2025
seo:
  title: "Riskspan: Automating Private Credit Deal Analysis with LLMs and RAG - ZenML LLMOps Database"
  description: "Riskspan, a technology company providing analysis for complex investment asset classes, tackled the challenge of analyzing private credit deals that traditionally required 3-4 weeks of manual document review and Excel modeling. The company built a production GenAI system on AWS using Claude LLM, embeddings, RAG (Retrieval Augmented Generation), and automated code generation to extract information from unstructured documents (PDFs, emails, amendments) and dynamically generate investment waterfall models. The solution reduced deal processing time from 3-4 weeks to 3-5 days, achieved 87% faster customer onboarding, delivered 10x scalability improvement, and reduced per-deal processing costs by 90x to under $50, while enabling the company to address a $9 trillion untapped market opportunity in private credit."
  canonical: "https://www.zenml.io/llmops-database/automating-private-credit-deal-analysis-with-llms-and-rag"
  ogTitle: "Riskspan: Automating Private Credit Deal Analysis with LLMs and RAG - ZenML LLMOps Database"
  ogDescription: "Riskspan, a technology company providing analysis for complex investment asset classes, tackled the challenge of analyzing private credit deals that traditionally required 3-4 weeks of manual document review and Excel modeling. The company built a production GenAI system on AWS using Claude LLM, embeddings, RAG (Retrieval Augmented Generation), and automated code generation to extract information from unstructured documents (PDFs, emails, amendments) and dynamically generate investment waterfall models. The solution reduced deal processing time from 3-4 weeks to 3-5 days, achieved 87% faster customer onboarding, delivered 10x scalability improvement, and reduced per-deal processing costs by 90x to under $50, while enabling the company to address a $9 trillion untapped market opportunity in private credit."
---

## Overview and Business Context

Riskspan is a technology company specializing in providing analysis for some of the most complex investment asset classes, with a particular focus on private credit markets. The company has been a long-standing AWS customer (15 years at the time of the presentation) and is 100% cloud-native, running their entire platform on AWS infrastructure. They process trillions of dollars of assets daily and perform granular loan-level analysis on approximately 45 million loans across more than 70 asset classes.

The private credit market represents a massive opportunity, with $14 trillion in total assets and $9 trillion in untapped market potential. Private credit differs from traditional bank lending in that non-bank entities provide loans to individuals or companies. The fundamental challenge is that these investments are inherently custom and non-standard, with critical information buried in documents, emails, and other unstructured data sources. The problem is compounded by the fact that deal documentation typically consists of not just a single comprehensive document, but rather 17-20 amendments over time, making information extraction and analysis particularly complex.

Before implementing their GenAI solution, the industry standard process required analysts to spend 3-4 weeks manually reading through documents, extracting data, and building Excel spreadsheets to model and price investments. This manual approach doesn't scale, creates an opaque market with limited real-time information, and makes it difficult for portfolio managers to react quickly to changing market conditions and investment opportunities. The urgency is real: investors often have less than 10 minutes to half an hour to decide whether to pursue an investment opportunity, or else commit to the 3-4 week manual process while risking being non-competitive. The stakes are high—there have been multiple major incidents in the private credit space resulting in billions of dollars in losses because investors lacked access to data and couldn't monitor investments on a regular basis.

## Strategic Approach and Planning

One of the most notable aspects of Riskspan's GenAI journey was their disciplined approach to defining the problem and solution before writing any code. Working with AWS, they employed the Amazon PR/FAQ (Press Release and Frequently Asked Questions) methodology. This process involved writing a press release and detailed FAQ document with cross-functional teams including sales, marketing, executive leadership, technology, and even external clients before any development began. The PR/FAQ focused on clearly identifying the customer, the pain point, and how the solution would address that pain point.

The PR/FAQ process served as a critical tool for driving clarity and establishing a consistent vision across multiple functions and teams within the organization. Importantly, they didn't write a single line of code until they had their vision defined and had centered their strategy around a customer-centric solution. This upfront investment in strategic alignment proved valuable in ensuring they focused on addressing the $9 trillion untapped opportunity rather than building yet another system that didn't solve the core problem.

## Technical Architecture and Implementation

The architecture Riskspan built follows a relatively standard pattern for analytics applications—data ingestion, model processing, and results delivery to end users—but with significant complexity introduced by the variety of data formats and the custom nature of each deal requiring intelligent handling at scale.

The data ingestion layer uses secure storage (a critical requirement given the confidential nature of client information) and employs tools to extract data from scanned PDFs, images, unstructured emails, handwritten notes, and other varied sources. Given the volume of data involved, it became clear early that an LLM alone couldn't process all the information directly. This led to the implementation of an embeddings-based approach with RAG (Retrieval Augmented Generation) architecture, leveraging AWS Bedrock as the foundation platform.

The core model processing uses Claude (Anthropic's LLM available through AWS Bedrock) to dynamically generate code that models the investment waterfall and investment logic specific to each deal structure. The LLM doesn't just extract information; it actually generates executable code that performs the financial calculations required to forecast cash flows and value investments. This generated code is then run through surveillance technology to ensure quality and accuracy before execution.

The output layer connects to Riskspan's existing legacy APIs, allowing clients to have a seamless experience across all their investments regardless of whether they're using the new GenAI-powered system or traditional approaches. This integration strategy was crucial for production deployment, as it didn't require clients to change their workflows or interfaces.

Human-in-the-loop processes are incorporated into the workflow, contributing to the overall cost structure while ensuring accuracy and reliability. Remarkably, despite including human review, the per-deal processing cost came in at under $50, representing a 90x reduction compared to the previous manual approach.

The architecture leverages AWS services that proved cost-effective at scale, enabling the company to achieve 10x scalability improvements while dramatically reducing costs through automation. This challenges the common perception that GenAI applications necessarily drive up costs; in this case, the efficiency gains from automation more than offset the computational costs of running LLMs.

## Key Technical Lessons and LLMOps Practices

Riskspan's journey to production revealed several critical lessons that shaped their LLMOps practices. The company acknowledges they made numerous mistakes early on, initially believing they had a "magic bullet" with LLMs where they could simply feed all the data and receive working code as output. This assumption, based on experiences with ChatGPT or Claude's web UI, proved incorrect in production scenarios.

**Domain Context and Training Data Limitations**: A fundamental learning was that while LLMs are trained on vast amounts of data, they are not specifically trained on any particular domain at the granular level required for specialized applications. Riskspan had to invest significant effort in providing appropriate context and domain knowledge for the various deal structures they were modeling. This involved training the LLM by providing specific context relevant to private credit transactions, helping avoid hallucinations and creating more deterministic output.

**Semantic Chunking and Problem Decomposition**: Rather than expecting the LLM to solve large, complex problems in a single pass, the team learned to break down problems by creating semantic chunks from documents. They decomposed the overall transaction modeling problem into specific aspects: calculating fees, calculating interest income, handling delinquencies, handling defaults, and so on. Each of these became a focused problem that the LLM could address with better accuracy and reliability. This approach mirrors microservices architecture principles applied to LLM-based problem solving.

**Structured Data and Output Formats**: Perhaps the most impactful learning was the importance of structure. The team found that LLMs perform significantly better when provided data in preset structured formats. For the code generation aspect specifically, they created well-defined JSON structures that the LLM would consume as input. Equally important, they required the output to be provided in a very structured format as well. This structured approach to both input and output proved to be the single biggest contributor to improved accuracy, reliability, and robustness of the solution.

These learnings represent core LLMOps best practices: understanding model limitations, investing in proper context and prompt engineering, decomposing complex tasks, and enforcing structure in both inputs and outputs to improve determinism and reliability.

## Evolution to Agentic Architecture

At the time of the presentation, Riskspan was actively evolving their architecture from the initial implementation toward a more sophisticated agentic approach. They acknowledged that they had not completely solved the problem, as the private credit space constantly evolves with new custom structures appearing regularly and increasing demand for real-time risk analysis.

The company had developed a vision for making their model creation process more robust, more deterministic, and helping clients solve more forecasting-related issues. They wanted to enable clients to create deal structures more dynamically based on market conditions—essentially reversing the workflow from "take a legal document and model the deal" to "based on current market conditions, what type of structure should we create?"

AWS Agent Core (presumably Amazon Bedrock Agents or a similar agentic orchestration platform) emerged as a solution that addressed nearly all of the capabilities they had planned to build. The agentic approach involves creating multiple specialized agents that each solve a very specific problem. While they had been achieving similar outcomes through carefully crafted prompts, the formal agent framework with proper orchestration capabilities provided significant benefits.

The agent-based architecture allows for better separation of concerns, with subject matter experts (SMEs) able to help provide prompts for specific agents and even create agents more dynamically. The orchestration layer handles coordination between agents, maintaining security and compliance as agents work together to solve the larger problem.

Riskspan has also evolved their RAG approach to manage documents in more semantic and reliable ways. The continuous learning aspect, enabled through dynamic prompting and agent orchestration, allows the system to improve over time as it encounters new deal structures and market conditions.

## Production Deployment and Operational Considerations

Successfully moving from pilot to production is where most GenAI projects fail—Gartner research cited in the presentation indicates that over 90% of generative AI projects die in the pilot phase. Riskspan's success in reaching production and monetization offers valuable insights into what it takes to deploy LLM applications at scale in customer-facing contexts.

The reliability and accuracy requirements for a system handling investment decisions involving potentially billions of dollars are extremely high. The combination of semantic chunking, structured inputs and outputs, domain-specific context, and human-in-the-loop oversight creates multiple layers of quality assurance. The surveillance technology applied to generated code adds another layer of validation before execution.

The integration with existing APIs and systems was crucial for adoption. Rather than requiring clients to learn new interfaces or change workflows, the GenAI-powered analysis appears seamlessly alongside traditional analyses. This design decision reduced adoption friction and allowed for gradual rollout and validation.

Cost management proved to be a success story rather than a concern. While the computational costs of running LLMs and embeddings could be substantial, the dramatic reduction in human labor time (from 3-4 weeks to 3-5 days) and the ability to process deals at under $50 per transaction represented a 90x cost reduction. The AWS services they selected proved cost-effective at the scale they needed to operate.

## Business Impact and Results

The business impact of Riskspan's GenAI implementation has been substantial and measurable across multiple dimensions. Deal processing time dropped from 3-4 weeks to 3-5 days, representing roughly an 85% reduction in cycle time. Customer onboarding became 87% faster, directly impacting the company's ability to grow and serve clients.

The solution achieved 10x scalability improvements, enabling Riskspan to handle significantly more deals without proportional increases in headcount or infrastructure. The 90x reduction in per-deal processing costs fundamentally changed the economics of their business model.

Perhaps most importantly, these improvements position Riskspan to address the $9 trillion untapped market in private credit. The traditional manual approach created a bottleneck that made it economically unfeasible to analyze certain types of deals or serve certain market segments. By automating the most time-consuming aspects of deal analysis while maintaining accuracy and reliability, they can now pursue opportunities that would have been impossible under the previous model.

The company demonstrated actual production screenshots during the presentation, providing tangible evidence that this is a real, deployed system generating business value rather than just a proof of concept or marketing story.

## Critical Assessment and Considerations

While the results presented are impressive, several considerations warrant attention when evaluating this case study. The presentation is from an AWS event featuring one of AWS's customers, which naturally creates some promotional bias. The specific performance metrics (87% faster onboarding, 90x cost reduction) are reported without detailed methodology or independent verification.

The complexity of the problem domain—private credit deal analysis—means that validating accuracy and reliability remains challenging. While the human-in-the-loop approach and code surveillance provide quality controls, the ultimate test is whether the generated models accurately represent the investment waterfall logic encoded in complex legal documents. The presentation doesn't provide detailed information about error rates, false positives, or cases where the system failed to correctly interpret deal structures.

The evolution to an agentic architecture was described as still in progress at the time of the presentation, suggesting that even the successful production system continues to require refinement and enhancement. The acknowledgment that "there is a lot of work to be done" and that they have "by no means solved the problem completely" provides helpful context about the maturity level of the solution.

The reliance on AWS Bedrock and Claude creates vendor lock-in considerations, though this is mitigated by Riskspan's 15-year relationship with AWS and their cloud-native architecture. The ability to adapt to new models and capabilities (like Agent Core) as AWS releases them can be seen as either a benefit of the platform approach or a dependency on the platform provider's roadmap.

Despite these considerations, the case study represents a genuine example of LLMs deployed in production for a high-stakes business application, with measurable business impact and clear architectural patterns that others can learn from. The disciplined approach using PR/FAQ, the focus on structured inputs and outputs, the semantic chunking strategy, and the evolution toward agentic workflows all represent valuable LLMOps practices applicable to other domains and use cases.