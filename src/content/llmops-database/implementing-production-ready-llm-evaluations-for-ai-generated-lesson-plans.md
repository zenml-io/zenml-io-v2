---
title: "Implementing Production-Ready LLM Evaluations for AI-Generated Lesson Plans"
slug: "implementing-production-ready-llm-evaluations-for-ai-generated-lesson-plans"
draft: false
llmopsTags:
  - "chatbot"
  - "document-processing"
  - "high-stakes-application"
  - "data-analysis"
  - "prompt-engineering"
  - "rag"
  - "agent-based"
  - "evals"
  - "human-in-the-loop"
  - "error-handling"
  - "mcp"
  - "langchain"
  - "monitoring"
  - "cicd"
  - "open-source"
  - "documentation"
  - "postgresql"
  - "argilla"
  - "anthropic"
  - "openai"
industryTags: "education"
company: "Nova Escola"
summary: "Nova Escola, a well-known educational brand in Brazil, implemented a comprehensive LLM evaluation system to ensure the quality of AI-generated lesson plans produced by their chatbot. The team faced significant challenges with manual evaluation processes, disagreement between human annotators, and lack of systematic methodology. They overcame these barriers by implementing LangFuse for observability, integrating Claude with their evaluation workflows through MCP connections, and developing custom evaluation judges calibrated against human-labeled data using true positive and true negative rates. The solution enabled the pedagogical team to independently run evaluations, resulted in four production-ready judges serving as CI/CD gates and daily production monitoring, and fundamentally improved product quality by addressing critical failure modes such as curriculum alignment issues."
link: "https://www.youtube.com/watch?v=mF4CaijvJos"
year: 2026
seo:
  title: "Nova Escola: Implementing Production-Ready LLM Evaluations for AI-Generated Lesson Plans - ZenML LLMOps Database"
  description: "Nova Escola, a well-known educational brand in Brazil, implemented a comprehensive LLM evaluation system to ensure the quality of AI-generated lesson plans produced by their chatbot. The team faced significant challenges with manual evaluation processes, disagreement between human annotators, and lack of systematic methodology. They overcame these barriers by implementing LangFuse for observability, integrating Claude with their evaluation workflows through MCP connections, and developing custom evaluation judges calibrated against human-labeled data using true positive and true negative rates. The solution enabled the pedagogical team to independently run evaluations, resulted in four production-ready judges serving as CI/CD gates and daily production monitoring, and fundamentally improved product quality by addressing critical failure modes such as curriculum alignment issues."
  canonical: "https://www.zenml.io/llmops-database/implementing-production-ready-llm-evaluations-for-ai-generated-lesson-plans"
  ogTitle: "Nova Escola: Implementing Production-Ready LLM Evaluations for AI-Generated Lesson Plans - ZenML LLMOps Database"
  ogDescription: "Nova Escola, a well-known educational brand in Brazil, implemented a comprehensive LLM evaluation system to ensure the quality of AI-generated lesson plans produced by their chatbot. The team faced significant challenges with manual evaluation processes, disagreement between human annotators, and lack of systematic methodology. They overcame these barriers by implementing LangFuse for observability, integrating Claude with their evaluation workflows through MCP connections, and developing custom evaluation judges calibrated against human-labeled data using true positive and true negative rates. The solution enabled the pedagogical team to independently run evaluations, resulted in four production-ready judges serving as CI/CD gates and daily production monitoring, and fundamentally improved product quality by addressing critical failure modes such as curriculum alignment issues."
notion:
  pageId: "3bbf8dff-2538-80cb-9103-f0c0073625c4"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-13T09:07:00.000Z"
  lastEditedTime: "2026-08-13T09:07:00.000Z"
  publishedAt: "2026-08-14T07:00:14Z"
---

## Overview and Context

Nova Escola is a prominent educational brand in Brazil operating with a small team of 29 people, only six of whom work in technology. The organization developed an AI chatbot that generates lesson plans for teachers, but faced significant challenges ensuring the quality and trustworthiness of the generated content. The case study documents their journey from manual, spreadsheet-based evaluation processes to a sophisticated, production-ready evaluation system that enables their pedagogical team to independently assess and improve LLM outputs.

The implementation is particularly noteworthy because it demonstrates how a resource-constrained team successfully operationalized LLM evaluations by systematically removing technical barriers and establishing clear methodologies. The presenter, Lucas, had taken a course on evaluations and then implemented the learnings within his organization, providing valuable insights into the practical challenges of translating evaluation theory into production systems.

## The Problem Space

Nova Escola's chatbot generates lesson plans tailored to teacher requests, incorporating curriculum alignment, learning objectives, activities, and pedagogical goals. The initial product suffered from several critical failure modes that undermined teacher trust. Most seriously, the system would sometimes generate curriculum skill codes that didn't actually exist, misleading teachers who trusted the Nova Escola brand and weren't cross-checking against official curriculum documents. Teachers would receive lesson plans with fabricated curriculum references and had no easy way to verify their authenticity.

Beyond curriculum hallucinations, the team identified numerous other quality issues through their evaluation work, including lesson plans with multiple learning objectives when only one was appropriate, misalignment between lesson titles and actual content, activities that lacked depth or focus by trying to cover too many topics, and general disconnects between what teachers requested and what the system generated.

## Initial Evaluation Approach and Challenges

The team's first evaluation attempt involved extracting data from their Postgres database into massive, unwieldy spreadsheets. An engineer would export CSV files containing all lesson plans, and evaluators would manually code them against a pedagogical rubric. This process was completely manual, taking one to two months per evaluation cycle depending on complexity.

The team made several early mistakes that created significant friction. They chose to have two expert annotators rather than following the recommended "benevolent dictator" approach of having a single authoritative evaluator. This decision proved costly as the annotators frequently disagreed, sometimes more than random chance would predict, essentially showing negative correlation on certain criteria. When measuring inter-annotator agreement, many criteria showed that a coin flip would have produced more consistent results than the human experts.

This disagreement revealed that their pedagogical rubric lacked sufficient specificity and clarity. Different experts interpreting the same criteria were essentially evaluating different things. This forced the team to repeatedly return to their pedagogical team to refine the rubric, label new datasets, and recalibrate, creating a lengthy iterative cycle. The team also spent considerable effort labeling data for criteria that turned out not to be actual problems in production, wasting resources on non-issues like lesson plan titles that could be fixed with simple rule-based approaches rather than requiring sophisticated evaluation.

## The Three Barriers Framework

Lucas identified three distinct barriers preventing effective evaluation work. The first barrier was technical access to data. Extracting traces of LLM conversations, understanding the back-and-forth message flow, identifying which messages called tools versus generated content, examining RAG retrieval results, and accessing the full context being passed to models required technical expertise that the pedagogical team lacked.

The second barrier was methodological knowledge. Running effective evaluations requires understanding error analysis, open coding and axial coding techniques, judge construction, data selection and splitting strategies, calibration approaches, and avoiding numerous methodological traps. For example, teams can easily contaminate their evaluation by including training data in development sets, use unbalanced datasets that produce misleading calibration metrics, or fail to properly measure true positive and true negative rates when assessing judge quality.

The third barrier, and the one Lucas wanted his team focused on, was the actual pedagogical judgment that represents Nova Escola's unique value. Questions like whether a lesson plan engages students, mobilizes appropriate prior knowledge, or follows sound pedagogical principles require deep domain expertise that no tool can provide. The team's goal was to remove the first two barriers so domain experts could concentrate on the third.

## Solution Architecture: Three Layers

Nova Escola implemented a three-layer solution to systematically address their barriers. The foundational layer was comprehensive observability through LangFuse, an open-source LLM observability platform. They instrumented their entire system to log traces showing which agents were called, which tools were invoked, execution timing, retrieved context from RAG systems, and complete inputs and outputs at each step. This created a searchable, organized repository of production behavior that became the foundation for all evaluation work.

LangFuse provided trace-level visibility into the complete execution flow, showing exactly what happened behind the scenes when generating each lesson plan. The team could drill into individual traces to understand failures, examine the curriculum skills being retrieved, see the prompts being used, and analyze the reasoning chains. This granular observability proved essential for understanding failure modes and debugging issues.

The second layer made this data accessible to non-engineers through natural language interfaces. Initially, the team wrapped the LangFuse API to create custom skills for Claude, but later transitioned to using the official LangFuse MCP connector when it became available. This allowed pedagogical team members to query their observability data conversationally, asking questions like "what should be our next evaluation step?" and having the AI assistant analyze evaluation history, identify challenging failure modes, suggest next candidates for evaluation, and propose hypothesis-driven improvements to judge prompts.

The integration with Claude transformed evaluation from a highly technical task to one accessible to domain experts. Team members could ask the system to analyze false positives and false negatives, generate hypotheses about why judges were failing, propose improved prompts following best practices, automatically run validation checks, and produce comprehensive reports on judge performance, all through natural conversation rather than writing code or SQL queries.

The third layer packaged evaluation methodology into reusable skills and workflows. The team adopted skills for writing judge prompts following best practices, validating evaluator performance against human labels, building custom annotation interfaces, and measuring calibration metrics. These skills embedded methodological knowledge like appropriate data split ratios, calibration techniques, and evaluation design patterns, allowing team members to bootstrap evaluation work without remembering every detail of the methodology.

## Evaluation Workflow and Tooling

The team established a sophisticated evaluation infrastructure centered on LangFuse as the primary database for test datasets, annotations, and experimental runs. All test datasets for their various failure modes are stored in LangFuse with expected outputs and rich metadata. The platform tracks how many evaluation passes or experiments have been run against each dataset, creating an audit trail of evaluation efforts.

For annotation work, the team initially built custom review interfaces but later transitioned to using skills that generate annotation interfaces following best practices from their evaluation training. These interfaces support binary judgments, reasoning capture, borderline case identification, and metadata tagging. Critically, annotations flow back into LangFuse as structured data that can be analyzed by AI assistants during hill-climbing and prompt improvement work.

The team also built a custom annotation interface directly into their lesson plan generation platform. When testing the system, users can provide thumbs up or thumbs down feedback and add detailed annotations explaining their reasoning. This feedback automatically flows into LangFuse as notes attached to the relevant traces, creating a seamless connection between production testing and evaluation data collection.

Team members primarily work through Claude interfaces, with different preferences between the web-based Claude interface and the CLI version. The CLI offers more flexibility for power users, while the web interface proves more accessible to pedagogical team members. Both connect to the same underlying evaluation infrastructure through MCP connectors and custom skills.

Nova Escola created an internal skills marketplace to distribute evaluation capabilities across the organization. New team members receive access to a curated collection of plugins organized by function: marketing has plugins for voice and WhatsApp notifications, product teams have specialized tooling, and a governance plugin provides cross-company capabilities. The evaluation plugin includes access to all evaluation skills, well-documented usage instructions, and pointers to the original course materials explaining evaluation methodology.

## Judge Development and Calibration

The team developed LLM-as-judge evaluators for various failure modes they identified in their lesson plan generation. Rather than evaluating against their entire pedagogical rubric, they focused specifically on persistent problems that couldn't be easily fixed through simple rules or prompt adjustments. This targeted approach avoided wasting resources on criteria that either weren't problems in practice or could be addressed without sophisticated evaluation.

Each judge is calibrated against human-labeled data using true positive rate and true negative rate as the primary metrics. The team explicitly rejected simpler approaches that just produce aggregate scores, insisting on proper calibration before deploying judges. They found it difficult to perform this calibration work within LangFuse itself, instead using Claude-based workflows to iterate on judge prompts while measuring TPR and TNR against their labeled datasets.

The calibration process involves splitting data into training, development, and test sets following recommended ratios. The training data helps develop and refine the judge prompt, the development set allows iterative calibration and prompt improvement, and the test set provides final validation. The team learned through painful experience to keep these splits strictly separated, having encountered situations where training data contaminated development sets and produced misleadingly good results.

All judges use GPT-4 as the evaluation model, chosen for its strong reasoning capabilities. While the production system generates lesson plans using GPT-3.5 Mini for cost efficiency, evaluation judges use the more powerful model to ensure high-quality assessments. Since calibration was performed using GPT-4, the team maintains consistency by using the same model for all subsequent evaluation runs, ensuring that their measured TPR and TNR remain valid.

The team emphasizes that judges must have access to human reasoning captured during annotation to effectively improve through hill-climbing. When annotators mark something as a false positive or false negative, they must provide explanatory reasoning about why the judgment is incorrect. This reasoning allows AI assistants to understand the nature of the error and propose targeted prompt improvements. Borderline cases and clear pass/fail distinctions are also valuable signals that help calibrate judge behavior.

## Production Judges and Results

After extensive development and calibration work spanning approximately one year, the team successfully deployed four judges to production. These judges evaluate whether the curriculum skills referenced in the lesson plan actually align with teacher requests, whether learning objectives are appropriate in number and quality, whether activities have sufficient depth and focus rather than being superficial, and whether the lesson plan title accurately reflects the content. Each judge has been validated with acceptable TPR and TNR metrics, though not perfect, that meet the team's quality bar for production use.

Several other failure modes remain under development where the team has not yet achieved acceptable judge performance. These represent more challenging evaluation problems where either the rubric needs further refinement, more labeled data is required, the criteria itself needs reconceptualization, or the failure mode is inherently difficult to judge reliably. The team continues working on these using their AI-assisted hill-climbing workflows.

The production judges serve two critical functions. First, they act as CI/CD gates in the development process. Every pull request triggers the evaluation suite, running all judges against representative test data. The team examines whether the proposed changes improve or regress performance on each criteria, providing objective data to inform merge decisions. This prevents the team from inadvertently degrading quality on one dimension while improving another.

Second, the judges run continuously on production data to monitor quality trends and detect drift. Initially the team sampled just 2% of production traffic for daily evaluation, but found this produced too few examples across the diverse space of grade levels and subjects to yield stable metrics. Through experimentation, they increased sampling to approximately 80% of production data, which provided sufficient coverage across the curriculum space to produce meaningful daily quality metrics.

Production evaluation runs in batch mode to minimize costs, using the OpenAI batch API to process evaluations overnight when timing doesn't matter. This allows thorough evaluation without expensive real-time inference costs. The resulting metrics are displayed in dashboards showing daily quality trends for each judge over time.

## Production Insights and Impact

The production monitoring revealed actionable insights about product quality. The judge evaluating curriculum alignment between teacher requests and generated lesson plans showed the most concerning performance, with significantly lower pass rates than other criteria. This is particularly problematic because curriculum alignment is foundational: if the wrong curriculum elements are incorporated, everything else in the lesson plan becomes misaligned. This judge became the team's top candidate for AI-assisted improvement work.

The learning objectives judge showed acceptable but variable performance, oscillating between good and marginal results over time. This variability suggested either inconsistency in the generation system or sensitivity in the evaluation criteria that warranted investigation. The other two judges showed relatively stable, acceptable performance.

While the production dashboards haven't yet caught major regressions since the judges were developed after the system was already debugged of major issues, they provide valuable safety nets and early warning systems for quality drift. Their primary value has been in the development process where evaluation gates have prevented regressions and helped the team systematically improve quality across measured dimensions.

The evaluation system provided critical direction for resource allocation. With only six people in technology at Nova Escola, choosing where to focus effort is crucial. The evaluations identified which problems were most prevalent and impactful, allowing the team to prioritize work that would improve the user experience most effectively. Some problems identified in early spreadsheet evaluations, like inappropriate numbers of learning objectives, were easily fixed with simple rules and didn't require ongoing evaluation infrastructure.

The team reports that product quality has fundamentally transformed over the year-long evaluation journey. Early versions made serious errors like hallucinating curriculum codes that damaged user trust. Through systematic evaluation and improvement, the system has matured to a qualitatively different level of reliability. While the specific failure modes being tracked have evolved as problems were fixed and new challenges emerged, the evaluation infrastructure enables continuous quality improvement.

## Challenges and Lessons Learned

The inter-annotator agreement problems taught the team important lessons about rubric design. When domain experts disagree frequently on evaluation criteria, it signals that the criteria are insufficiently specified or that evaluators are interpreting them differently. This requires returning to first principles, clarifying the rubric, and often reconceptualizing what is being measured. The team found that educational content is inherently nuanced and subjective, making the benevolent dictator approach attractive despite their continued use of multiple annotators.

The team learned to focus evaluation effort on actual failure modes rather than comprehensive rubric coverage. Their early attempts evaluated lesson plans against their complete pedagogical rubric, including many criteria that weren't actually problems in production. This wasted significant annotation effort on non-issues. After their evaluation training, they adopted a failure-mode-driven approach where evaluation effort focuses on persistent, impactful problems that resist simple fixes.

Methodological traps proved easy to fall into without systematic processes. The team encountered issues with training data contaminating evaluation sets, unbalanced datasets producing misleading metrics, inappropriate model choices for different tasks, and insufficient sampling of production data for meaningful monitoring. Establishing clear methodologies and checklists helped avoid these problems, but they required conscious effort and discipline to implement correctly.

The team found that different stakeholders have different tooling preferences that should be accommodated. Engineers gravitated toward CLI-based workflows offering maximum flexibility and scriptability, while pedagogical team members preferred conversational web interfaces that abstracted technical details. Supporting both through a common underlying infrastructure proved valuable for team-wide adoption.

One particularly valuable insight was that the process of building evaluations is often more valuable than the evaluations themselves. Through error analysis, data labeling, judge calibration, and iterative refinement, the team developed deep understanding of their product's failure modes and quality dimensions. This understanding informed development decisions even beyond what the evaluation metrics directly measured. Teams that try to skip directly to automated evaluation without this deep engagement miss critical learning.

## Workflow Integration and Team Enablement

The evaluation system fundamentally changed how the pedagogical team works. Previously, evaluation required engineering support to extract data, technical expertise to analyze traces, and manual spreadsheet work that was error-prone and tedious. Now, team members independently initiate evaluation work through conversational interfaces, query observability data without SQL knowledge, generate hypotheses about failure modes, iterate on judge prompts, run calibration experiments, and produce evaluation reports, all without waiting for engineering resources.

This democratization of evaluation capabilities allows the team to move much faster and iterate more freely. When a team member identifies a potential quality issue, they can immediately pull relevant production traces, annotate examples, develop a candidate judge, and assess its calibration against labeled data. The cycle time for evaluation development has compressed from months to days or weeks.

The team onboards new members through structured evaluation training, essentially re-delivering the original evaluation course content using the same slides and materials. This ensures that new team members understand evaluation methodology, know how to use the available skills effectively, understand the rationale behind evaluation design choices, and can leverage the infrastructure independently. Without this methodological foundation, the skills and tools would be difficult to use effectively.

For refactoring and development work, the evaluation infrastructure provides rapid feedback loops. When Lucas worked on refactoring their agent to potentially use Anthropic's managed agent framework instead of their custom LangGraph implementation, having established evaluations let him quickly assess whether changes improved or degraded quality across different dimensions. The AI assistant could test changes against the evaluation suite automatically, providing immediate feedback on whether the refactored approach was promising.

## Technical Architecture Considerations

The team made deliberate choices about their technical stack. LangFuse was selected as the observability layer because it provides comprehensive trace capture, dataset management capabilities, prompt versioning, and an accessible interface for non-engineers. While the team uses LangFuse extensively for observation and data storage, they found its native experimentation capabilities insufficient for their calibration workflow, preferring to orchestrate experiments through Claude-based workflows that give them more control over TPR/TNR measurement.

The integration between Claude and LangFuse through MCP connectors proved crucial for accessibility. MCPs provide standardized interfaces for AI assistants to interact with external systems, allowing Claude to query traces, retrieve datasets, analyze evaluation runs, and create annotations through natural language commands. This abstraction layer meant pedagogical team members could work with production data without understanding APIs, authentication, or data schemas.

The skills-based approach to packaging methodology has both strengths and limitations. Skills encapsulate best practices and provide good starting points, but they can also lead teams astray if used without understanding. The creator of the evaluation skills Lucas uses has expressed concerns that teams may blindly apply prompts without customization or understanding, leading to suboptimal results. Lucas agrees that the skills work well for his team specifically because they first developed deep methodological understanding through formal training, allowing them to use skills as memory aids and accelerators rather than black boxes.

The marketplace model for distributing skills and capabilities across the organization provides discoverability and consistency. Rather than each team developing their own evaluation approaches, Nova Escola can maintain centralized, well-documented capabilities that embody organizational best practices. This reduces duplication of effort and helps maintain consistent evaluation standards across products.

## Cost and Efficiency Considerations

The team carefully manages evaluation costs through several strategies. Using batch processing for production evaluations eliminates real-time inference costs and takes advantage of lower batch pricing. Sampling production data at 80% rather than 100% coverage provides sufficient statistical power while reducing costs by 20%. Using a more cost-effective model for generation while reserving expensive models for evaluation balances product costs against quality assurance needs.

The team's decision to focus evaluation on actual failure modes rather than comprehensive coverage also has cost implications. By concentrating labeling effort and judge development on problems that actually matter, they avoid spending resources evaluating aspects of the product that are already working well. This targeted approach maximizes the return on evaluation investment.

The infrastructure investment in observability, tooling, and methodology pays ongoing dividends by reducing the marginal cost of each new evaluation. Once the foundational infrastructure was in place, developing new judges became progressively easier. The team can leverage existing skills, datasets, annotation interfaces, and workflows rather than rebuilding evaluation capabilities from scratch for each new criteria.

## Future Directions and Ongoing Challenges

The team continues working on AI-assisted hill-climbing to improve judges that haven't yet reached acceptable performance. This involves using AI assistants to analyze failure patterns, propose prompt modifications, test hypotheses, and iteratively refine judge behavior. The approach shows promise for accelerating the traditionally slow process of prompt engineering for evaluation.

Several failure modes remain stubbornly difficult to evaluate reliably. These represent cases where either human experts continue to disagree on the criteria, the underlying pedagogical concept is inherently subjective or context-dependent, the failure mode is rare enough that gathering sufficient labeled examples is difficult, or the reasoning required to make the judgment exceeds current LLM capabilities. These challenging cases will require continued refinement of both rubrics and evaluation approaches.

The team plans to expand coverage to ensure evaluations work across the full diversity of their curriculum. Brazilian curriculum includes subjects like computational thinking that weren't well-represented in early evaluation datasets. As they expand to new subject areas, grade levels, or lesson types, they need to validate that existing judges continue to perform well and develop new judges for domain-specific quality dimensions.

Integration of evaluation into agent development represents an ongoing focus. As they experiment with different agent architectures, retrieval strategies, or generation approaches, having robust evaluation infrastructure lets them objectively assess whether changes improve overall quality. The ability to rapidly test architectural changes against established quality criteria accelerates experimentation and reduces risk.
