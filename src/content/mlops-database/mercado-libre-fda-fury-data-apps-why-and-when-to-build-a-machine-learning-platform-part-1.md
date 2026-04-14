---
title: "Why and when to build a Machine Learning Platform (part 1)"
slug: "mercado-libre-fda-fury-data-apps-why-and-when-to-build-a-machine-learning-platform-part-1"
draft: false
mlopsTags:
  - "compute-management"
  - "model-serving"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "deployment"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "Mercado Libre"
companySlug: "mercado-libre"
platformName: "FDA (Fury Data Apps)"
contentType: "blog"
summary: "MercadoLibre faced growing complexity in managing machine learning solutions across multiple business units, with organizational silos emerging as different data science teams used their own tools and practices. Rather than adopting an off-the-shelf solution, they built FDA (Fury Data Apps), an in-house ML platform designed to lower entry barriers in their complex data ecosystem, provide common tools, support the full model development lifecycle, handle deployment to production, and provide computing infrastructure in a multi-cloud environment. The platform is developed collaboratively by three teams (Infrastructure, Machine Learning Technology, and Data) working from a unified backlog, serving diverse use cases including item recommendation, fraud detection, fake item moderation, stock forecasting, and shipping predictions at a scale of 12 sales per second."
link: "https://medium.com/mercadolibre-tech/why-and-when-to-build-a-machine-learning-platform-part-1-58b5c88a5c14"
year: 2020
seo:
  title: "Mercado Libre: Why and when to build a Machine Learning Platform (part 1) - ZenML MLOps Database"
  description: "MercadoLibre faced growing complexity in managing machine learning solutions across multiple business units, with organizational silos emerging as different data science teams used their own tools and practices. Rather than adopting an off-the-shelf solution, they built FDA (Fury Data Apps), an in-house ML platform designed to lower entry barriers in their complex data ecosystem, provide common tools, support the full model development lifecycle, handle deployment to production, and provide computing infrastructure in a multi-cloud environment. The platform is developed collaboratively by three teams (Infrastructure, Machine Learning Technology, and Data) working from a unified backlog, serving diverse use cases including item recommendation, fraud detection, fake item moderation, stock forecasting, and shipping predictions at a scale of 12 sales per second."
  canonical: "https://www.zenml.io/mlops-database/mercado-libre-fda-fury-data-apps-why-and-when-to-build-a-machine-learning-platform-part-1"
  ogTitle: "Mercado Libre: Why and when to build a Machine Learning Platform (part 1) - ZenML MLOps Database"
  ogDescription: "MercadoLibre faced growing complexity in managing machine learning solutions across multiple business units, with organizational silos emerging as different data science teams used their own tools and practices. Rather than adopting an off-the-shelf solution, they built FDA (Fury Data Apps), an in-house ML platform designed to lower entry barriers in their complex data ecosystem, provide common tools, support the full model development lifecycle, handle deployment to production, and provide computing infrastructure in a multi-cloud environment. The platform is developed collaboratively by three teams (Infrastructure, Machine Learning Technology, and Data) working from a unified backlog, serving diverse use cases including item recommendation, fraud detection, fake item moderation, stock forecasting, and shipping predictions at a scale of 12 sales per second."
mlops:
  source: "sqlite"
  entryId: 91
  sourceUrl: "https://medium.com/mercadolibre-tech/why-and-when-to-build-a-machine-learning-platform-part-1-58b5c88a5c14"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061301"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

MercadoLibre (MELI), a large-scale Latin American e-commerce and fintech company operating at 12 sales per second, confronted the classic mid-sized to enterprise challenge of ML platform fragmentation. As the organization evolved from a C2C retail company to encompass B2C commerce, fulfillment centers, shipping services, cross-border trade, and financial services through MercadoPago, the complexity of machine learning use cases expanded dramatically. Each new data scientist joining the company brought their preferred tools and methodologies, which initially accelerated delivery and broadened data culture. However, this organic growth inadvertently created organizational silos where information and best practices were not shared across business units, leading to what the company described as "entropy" that threatened to become ungovernable.

The company needed to support an expanding portfolio of production ML use cases including item recommendation, fraud detection, fake items moderation, item stock forecasting, shipping cost and time promises, and predicting package dimensions. With more use cases being created monthly alongside new experiments, projects, and data scientist hires, the complexity demanded a systematic solution. The pain points were clear: high entry barriers in a super complex data ecosystem, lack of agility due to inconsistent tooling, absence of standardized support for the model development lifecycle, challenges in deploying trained models to production, fragmented computing infrastructure, and the need to operate efficiently in a cloud environment.

The organization had grown to approximately 8,000 employees at the time of writing (with over 12,000 at publication), with IT staff representing more than 30% of total headcount. This scale, combined with the rapid pace at which machine learning was merging into business operations, created a call for action that could not wait for third-party solutions to mature at their own pace.

## Architecture & Design

FDA (Fury Data Apps) represents MercadoLibre's answer to integrated ML platform challenges. While this first part of their series does not dive deeply into specific architectural components (promised for Part 2), the document establishes the design philosophy and organizational structure that guides the platform's development.

The platform is architected around several core principles that emerged from extensive discovery work. The team conducted many meetings with every data science cell that had been solving problems across the organization, aiming to understand user needs and scale ML solutions by leveraging existing skills while addressing major pain points. The architecture brings together two previously disparate areas of expertise: data science and DevOps, creating a bridge that allows data scientists to focus on model development while the platform manages infrastructure, and developers to add value by engaging more directly with data science workflows.

FDA is designed to support adaptable pipelines that can be assembled with other projects, indicating a modular, composable architecture rather than a monolithic approach. The platform must integrate seamlessly with MercadoLibre's existing ecosystem, which spans multiple cloud providers in what they describe as a "multi-cloud environment." This integration requirement shaped fundamental architectural decisions, as the platform needed to work within the constraints and opportunities of MercadoLibre's existing technology landscape.

The platform's design explicitly rejects the notion that machine learning solutions should be developed "at all costs." Instead, productive code must comply with certain quality standards, and the platform architecture enforces best practices that the organization had acquired through years of ML work. This philosophy manifests in the platform providing essential feature sets while maintaining flexibility, suggesting a framework approach that guides users toward good practices without overly constraining their work.

## Technical Implementation

MercadoLibre made a deliberate build-versus-buy decision after analyzing options available on the market, prioritizing open source platforms during their evaluation. They concluded that while third-party solutions serve traditional core businesses well, MercadoLibre's situation was different because innovation and delivery to support data-driven solutions were core to their DNA. Their valued risk-taking strategy and need for rapid innovation made waiting for external vendors untenable.

The implementation emerged from an interdisciplinary council composed of developers, cloud architects, and data scientists who worked together to sketch the solution and develop a common vision. This cross-functional approach ensured that the platform addressed real needs across different skill sets rather than optimizing for any single constituency.

The development process operates through a collaborative model involving three distinct teams working together: Infrastructure (Cloud & Platform), Machine Learning Technology, and Data Team (formerly Business Intelligence). These teams contribute developers fully allocated to the FDA project, working from a unified backlog that is groomed and prioritized by the council, which takes collective product ownership. This governance model ensures that no tasks are drawn from outside the agreed-upon priorities, maintaining focus and preventing fragmentation.

The team employs standard agile rituals and tools including sprint planning, prioritized backlog management, daily meetings, retrospectives, pre and post-mortems, and kanban boards. They provide support for their products and actively prompt users to request new features, inviting collaboration to produce unbiased results. The platform accepts external innovation: if agreed upon by the council, external requirements enter the backlog and undergo the same prioritization process as internally generated work. The team also hosts mandatory kick-off and mid-term results meetings with sponsors to maintain alignment.

The platform is cloud-based and designed to scale limitlessly in their multi-cloud environment. It must support what they describe as "impossible SLAs," reflecting the demanding performance requirements of a high-velocity e-commerce platform processing 12 sales per second. The infrastructure must be cost-effective and optimized yet agile, balancing efficiency with the flexibility needed for rapid experimentation and deployment.

## Scale & Performance

MercadoLibre operates at significant scale, providing concrete context for the platform's requirements. The company processes 12 sales per second across its e-commerce operations, creating downstream demands for real-time and near-real-time ML predictions. One specific use case mentioned is ranking special offers every hour, demonstrating the need for regular batch prediction capabilities alongside real-time inference.

At the time of the article's writing in late 2020, the company employed approximately 8,000 people, with IT staff representing more than 30% of that workforce. By publication time, this had grown to over 12,000 employees, indicating rapid organizational scaling that the ML platform needed to support. The platform serves an expanding population of data scientists, developers, and other technical users across multiple business units spanning e-commerce, logistics, shipping, and financial services.

The platform must support diverse use cases with varying performance profiles. Item recommendation likely requires low-latency real-time predictions to support user-facing experiences. Fraud detection demands near-real-time operation with high reliability to protect the business and customers. Fake items moderation needs to process large volumes of listings. Item stock forecasting operates on batch schedules but must handle inventory across the entire marketplace. Shipping cost and time promises require accurate predictions with acceptable latency to provide users with reliable delivery information. Package dimension prediction, detailed in a separate article, represents a specialized computer vision or similarity modeling challenge.

The platform's growth trajectory is characterized by expanding teams, expanding platform capabilities, and expanding user bases, all creating larger complexity to manage, maintain, and innovate within. The article emphasizes that this growth happens continuously and that the platform must evolve even as they speak, highlighting the dynamic nature of their scaling challenge.

## Trade-offs & Lessons

MercadoLibre's experience building FDA reveals several important lessons for organizations considering whether to build or buy ML platform solutions. The fundamental trade-off they confronted was between the simplicity of adopting an existing solution and the flexibility and control of building their own. They consciously chose to build, accepting the development burden in exchange for the ability to innovate at their own pace and integrate deeply with their existing ecosystem.

The build decision was predicated on specific organizational characteristics that may not apply universally. Innovation and data-driven delivery are core to MercadoLibre's DNA, they have a risk-taking culture that values proactivity, and they possess substantial engineering resources (over 30% of headcount). For companies without these characteristics, the trade-offs might favor adoption of existing solutions. The article implicitly acknowledges this by noting that third-party platforms "serve excellently for companies with a traditional core business," suggesting that MercadoLibre's non-traditional nature justified their approach.

A key lesson is the importance of user research and stakeholder engagement before building. The team conducted extensive meetings with every data science cell in the organization to understand skills, pain points, and requirements. This discovery phase informed fundamental design decisions, such as managing infrastructure for data scientists while bringing developers closer to data science work. This cross-pollination strategy demonstrates understanding that different user personas have different needs and that a successful platform must serve multiple constituencies.

The organizational structure they adopted—three teams working from a unified backlog under council governance—represents an interesting approach to managing complexity in platform development. This structure provides diverse perspectives that "add higher value and deliver better results" while maintaining coherence through shared ownership and prioritization. The trade-off is coordination overhead; maintaining council consensus and unified backlogs requires ongoing investment in alignment activities.

The emphasis on enforcing quality standards and best practices reveals a philosophical stance on platform design. FDA does not simply provide infrastructure; it encodes organizational knowledge about how ML should be done at MercadoLibre. This opinionated approach can accelerate good practices and improve consistency but may constrain users who want to work differently. The platform attempts to balance this by being "adaptable" and emphasizing user choice ("A user who wants to develop a data-science project shall choose FDA"), suggesting they work to make compliance attractive rather than mandatory.

The requirement for "impossible SLAs" and limitless scaling while remaining cost-effective represents a classic optimization challenge. Achieving all three simultaneously—high performance, unlimited scale, and cost efficiency—typically requires accepting trade-offs, though the article does not detail how they navigate this tension. The emphasis on agility alongside optimization suggests they may accept higher costs than fully optimized systems to maintain development velocity.

A critical lesson is the importance of mandatory engagement with sponsors through kick-off and mid-term results meetings. This governance mechanism ensures that platform development maintains alignment with business needs and that sponsors understand capabilities and constraints. This structured communication prevents the platform team from drifting into disconnection from business priorities.

The platform's success is framed around achieving their vision: improving agility, making best practices pervasive across the company, and governing ML software development across MercadoLibre. The team's satisfaction with successfully "wrapping up" these goals in their in-house solution suggests that the build decision achieved its intended outcomes, at least from the platform team's perspective. However, the article acknowledges that growth creates "larger complexity to manage, maintain and innovate," indicating that building a platform is not a one-time decision but an ongoing commitment to evolution and maintenance.

The article hints at an important cultural lesson: the platform must be something users "choose" rather than something imposed. The shared vision emphasizes that users "shall choose FDA" for development and deployment, suggesting that adoption depends on delivering value that makes the platform attractive rather than mandating its use. This approach requires continuous attention to user needs, feature requests, and support quality to maintain competitive advantage over alternatives users might otherwise prefer.

Finally, the acceptance of external innovation—allowing external requirements to enter the backlog through council prioritization—demonstrates pragmatic recognition that good ideas come from throughout the organization, not just the platform team. This openness prevents the "not invented here" syndrome while maintaining governance through the prioritization process. The trade-off is potentially slower response to urgent requests, as external requirements must go through the same prioritization as internal work rather than jumping the queue.
