---
title: "Building an AI Interview Coach for Product Discovery Training"
slug: "building-an-ai-interview-coach-for-product-discovery-training"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6908942b6c1a51664a8c3e3f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:24:41.878Z"
  createdOn: "2025-11-03T11:38:19.334Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "classification"
  - "poc"
  - "prompt-engineering"
  - "chunking"
  - "error-handling"
  - "human-in-the-loop"
  - "cost-optimization"
  - "token-optimization"
  - "evals"
  - "system-prompts"
  - "fastapi"
  - "postgresql"
  - "sqlite"
  - "monitoring"
  - "serverless"
  - "cicd"
  - "documentation"
  - "anthropic"
  - "openai"
  - "amazon-aws"
industryTags: "education"
company: "Product Talk"
summary: "Teresa Torres, a product discovery coach, built an AI-powered interview coach to provide automated feedback to students in her continuous interviewing course. Starting with simple ChatGPT and Claude prototypes, she progressively developed a production system using Replit, Zapier, and eventually AWS Lambda and Step Functions. The system analyzes student interview transcripts against a rubric for story-based interviewing, providing detailed feedback on multiple dimensions including opening questions, scene-setting, timeline building, and redirecting generalizations. Through rigorous evaluation methodology including error analysis, code-based evals, and LLM-as-judge evals, she achieved sufficient quality to deploy the tool to course students. The tool now processes interviews automatically, with continuous monitoring and iteration based on comprehensive evaluation frameworks, and is being scaled through a partnership with Vistily for handling real customer interview data with appropriate SOC 2 compliance."
link: "https://www.youtube.com/watch?v=oQQsm_z-hYo"
year: 2025
seo:
  title: "Product Talk: Building an AI Interview Coach for Product Discovery Training - ZenML LLMOps Database"
  description: "Teresa Torres, a product discovery coach, built an AI-powered interview coach to provide automated feedback to students in her continuous interviewing course. Starting with simple ChatGPT and Claude prototypes, she progressively developed a production system using Replit, Zapier, and eventually AWS Lambda and Step Functions. The system analyzes student interview transcripts against a rubric for story-based interviewing, providing detailed feedback on multiple dimensions including opening questions, scene-setting, timeline building, and redirecting generalizations. Through rigorous evaluation methodology including error analysis, code-based evals, and LLM-as-judge evals, she achieved sufficient quality to deploy the tool to course students. The tool now processes interviews automatically, with continuous monitoring and iteration based on comprehensive evaluation frameworks, and is being scaled through a partnership with Vistily for handling real customer interview data with appropriate SOC 2 compliance."
  canonical: "https://www.zenml.io/llmops-database/building-an-ai-interview-coach-for-product-discovery-training"
  ogTitle: "Product Talk: Building an AI Interview Coach for Product Discovery Training - ZenML LLMOps Database"
  ogDescription: "Teresa Torres, a product discovery coach, built an AI-powered interview coach to provide automated feedback to students in her continuous interviewing course. Starting with simple ChatGPT and Claude prototypes, she progressively developed a production system using Replit, Zapier, and eventually AWS Lambda and Step Functions. The system analyzes student interview transcripts against a rubric for story-based interviewing, providing detailed feedback on multiple dimensions including opening questions, scene-setting, timeline building, and redirecting generalizations. Through rigorous evaluation methodology including error analysis, code-based evals, and LLM-as-judge evals, she achieved sufficient quality to deploy the tool to course students. The tool now processes interviews automatically, with continuous monitoring and iteration based on comprehensive evaluation frameworks, and is being scaled through a partnership with Vistily for handling real customer interview data with appropriate SOC 2 compliance."
---

## Overview and Context

Teresa Torres, founder of Product Talk and author of "Continuous Discovery Habits," developed an AI-powered interview coach over a three-month period starting in March 2024. The project emerged from a unique opportunity when Torres broke her ankle and had recovery time to explore what generative AI makes "just now possible" in the context of teaching and skill building. Rather than focusing on automating discovery work itself (like interviewing synthetic users or automatically synthesizing interviews), Torres was interested in using AI to help humans build skills to connect with other humans.

The specific use case centered on her Continuous Interviewing course, which teaches students story-based interviewing techniques and includes substantial hands-on practice. A core challenge in the course is providing quality feedback on practice interviews. The course philosophy emphasizes deliberate practice with feedback, and students practice by interviewing each other and providing peer feedback. Torres wanted to explore whether AI could model what good feedback looks like and help students give each other better feedback.

## Initial Prototyping and MVP Development

Torres began with the simplest possible approach, using $20 subscriptions to both ChatGPT and Claude. She created custom GPTs and Claude projects, providing them with a simple prompt positioning them as experts in her story-based interview methodology. She uploaded public blog posts and a rubric that outlined four key skills for week one of the course: opening with a story-based question, setting the scene, building a timeline, and redirecting generalizations back to specific stories.

This first prototype took only one to two hours and yielded surprisingly impressive results. When Torres ran one of her own interview transcripts through the system (intentionally choosing a non-story-based interview to test detection capabilities), the AI correctly identified that she hadn't asked proper story-based questions and hadn't adequately set the scene. This early success demonstrated that the teaching materials she had developed for humans—rubrics, lesson plans, clarity of concepts—translated effectively to teaching an LLM.

Torres discovered that both OpenAI and Claude performed fairly equivalently at this early stage, though she would later identify significant differences that influenced her final technology choices.

## Deployment Challenges and Architecture Evolution

After the promising prototype phase, Torres immediately confronted practical deployment challenges. Custom GPTs and Claude projects, while useful for experimentation, had significant limitations for production use. Custom GPTs either had to be completely public or required users to be on her team plan (at $20/month per student, an unsustainable cost model). Claude projects had no API access at all, making them impossible to share programmatically.

Torres needed to embed the tool in her Learning Management System (LMS), implement rate limiting to control costs, and establish access controls so only her students could use it. She also recognized the potential to build multiple similar tools across her course portfolio, including tools for interview snapshots, opportunity solution trees, and interactive simulations.

This led her to Replit, where she used the AI agent to build a custom chat interface builder in just two days—despite never having used Replit before. This tool allowed her to create named chat interfaces with customizable access controls, system prompts, file uploads for proprietary course content, model selection, temperature settings, and rate limiting. Critically, it generated embed codes that could be inserted directly into her LMS, passing student IDs for individual rate limiting while keeping course content secure.

Torres initially saw this as a breakthrough platform that would enable her to rapidly deploy numerous teaching tools. However, as she attempted to iterate and extend the functionality—specifically trying to split her single long prompt into multiple sequential LLM calls—she spent a full week failing to reliably modify the Replit application. The agent became confused about its own development context, mixing up whether it was using Drizzle or Prisma for database schemas and getting confused about React components.

## Architecture Shift and Production Implementation

After the Replit frustrations, Torres made a critical realization: she didn't actually need a chat interface. The chat format was causing problems because students naturally wanted to have multi-turn conversations with the LLM about their feedback, but the tool wasn't designed for that purpose. It was meant to be a one-shot analysis: upload transcript, receive comprehensive feedback.

This insight led to a new architecture combining her LMS's native assignment submission feature with Zapier automation. Students submit their transcripts through a standard homework interface in the LMS (Learn Worlds), which triggers a Zap workflow. The workflow includes several important steps:

First, there's explicit consent handling. Before students even see the submission form, they're informed that the system is not SOC 2 compliant and they must remove sensitive information from transcripts. They must actively consent to having their transcript and the AI-generated feedback stored for 90 days. The Zap includes a filter that checks this consent question—if students don't consent, the workflow terminates and they receive no feedback.

For consenting students, the transcript is stored in Airtable, then sent to four separate Anthropic API calls—one for each dimension of the rubric being evaluated. This represented a significant architectural decision: splitting the single comprehensive prompt into four specialized prompts, each focused on one dimension of interview quality. Each sub-Zap returns JSON-formatted responses, which are then formatted together into a comprehensive feedback email sent to the student.

Critically, Torres also emails herself a copy of every response. This human-in-the-loop monitoring was her earliest quality control mechanism. She could review every piece of feedback generated, and when she spotted errors, she would proactively follow up with students to provide corrections. This demonstrates a pragmatic approach to deploying AI systems where perfect accuracy isn't immediately achievable but human oversight can catch and mitigate errors.

## Data Practices and Ethical Considerations

Throughout the project, data handling emerged as a recurring concern. Torres initially built the tool for practice interviews conducted in class among students, not for real customer interview data. However, once deployed, students immediately began uploading their actual customer interviews. This created an unexpected problem: Torres, as a company of one, was not prepared to handle real customer data with appropriate security measures like SOC 2 compliance.

This led to several important product decisions. She became much more explicit in the user interface about data handling limitations, requiring students to remove sensitive information before upload and obtain explicit consent. She also recognized this as a fundamental scaling limitation—she didn't want to invest tens of thousands of dollars and ongoing operational overhead to achieve SOC 2 compliance herself.

This constraint ultimately led to a partnership with Vistily, a product discovery tool that already has SOC 2 compliance and is designed to store customer interview transcripts. Through this partnership, Torres can offer the interview coach on real customer data while Vistily handles the security and compliance requirements. This represents a pragmatic approach to scaling: partnering with infrastructure providers that have already solved difficult problems rather than rebuilding everything from scratch.

## The Prompt Architecture Evolution

One of the most significant technical evolutions involved how prompts were structured. Torres initially used a single comprehensive prompt that covered all evaluation dimensions. As she uncovered errors and added guardrails, this prompt grew to multiple pages in length, becoming unwieldy and causing the LLM to occasionally confuse guidelines from one dimension with another (for example, using timeline-building guidelines when evaluating scene-setting).

Splitting into four separate LLM calls, each with a focused prompt for one dimension, dramatically improved performance. Each dimension could now include relevant excerpts from the transcript with specific coaching tips on those excerpts. This shift from "tell them what they did" to "show them what they did with specific examples" represented a significant quality improvement.

However, this architectural change introduced a new problem: inconsistent feedback across dimensions. When evaluating as a single comprehensive prompt, the LLM maintained consistency across all dimensions. With separate calls, each dimension operated independently. For example, the "setting the scene" evaluator might flag an opening question as good because it didn't have context about what constitutes a proper story-based opening question—that evaluation was now happening in a different LLM call.

This illustrates a fundamental trade-off in LLM application architecture: comprehensive context enables consistency but can lead to confusion and degraded performance with very long prompts, while modular prompts enable focus and clarity but can lose cross-cutting concerns.

## Evaluation Methodology and the Path to Confidence

The question "how do I know if my interview coach is any good?" became central to the project. Torres initially iterated by examining individual traces (user input and LLM response pairs) and making prompt adjustments, but this felt unsystematic and made it difficult to know whether changes were actually improvements.

She encountered multiple definitions of "evaluation" in the AI community. OpenAI's definition essentially described what she was already doing: describe the task, run with test inputs, analyze results, change the prompt—an informal iterative process. Pantic Evals introduced the concept of creating datasets with expected outputs and checking if actual outputs matched, which felt more rigorous but raised questions about how to ensure the dataset truly represented production scenarios.

The breakthrough came from a Maven course called "AI Evals for Engineers and PMs" taught by Hamel Husain and Shreya Shankar. This course introduced a methodology that resonated with Torres's background in continuous discovery: analyze traces to identify error categories through systematic error analysis, build code-based and LLM-as-judge evals for those specific error categories, then use these evals to test prompt improvements.

This methodology provided the fast feedback loop that Torres recognized as essential. Rather than just comparing against a fixed dataset, she could analyze actual production traces, identify the failure modes that were actually occurring, and build targeted evaluations for those specific problems.

## Error Analysis Process

Torres implemented a comprehensive error analysis process using Airtable. She created an interface showing all traces (student transcripts plus AI-generated feedback) on one side with annotation capabilities. For each trace, she manually reviewed the AI-generated feedback and typed notes about what was wrong, then marked it as reviewed.

This human grading process revealed concerning patterns. The AI was sometimes suggesting leading questions—questions that telegraph the desired answer. It was suggesting general questions like "what do you typically do?" rather than story-specific questions. These represented teaching errors, where the coach was actively telling students to use techniques that the course explicitly teaches against.

After annotating dozens of traces, Torres identified her most common error categories. These became the basis for building specific evaluations. Critically, this wasn't about defining a gold-standard output for each input, but rather about defining specific ways the output could fail and building tests for those failure modes.

Torres notes that at this point in the project—with a functional product being used by real students, comprehensive error analysis completed, and a framework for systematic evaluation—she still had not written a single line of code. She'd used Airtable for data storage and annotation, Zapier for workflow orchestration, and various AI tools and platforms for the LLM calls themselves.

## Building Code-Based and LLM-as-Judge Evals

This is the point where Torres began writing code, specifically in Python using Jupyter notebooks—two technologies she had never used before. In a remarkable demonstration of how AI assistance is changing software development, she went from zero Python experience to running comprehensive evaluation pipelines in three days.

She implemented two types of evaluations:

**Code-based evals** look for specific patterns in the LLM's responses using deterministic logic. For example, one eval checks if the coaching feedback includes certain red-flag words indicating a general question (like "typically," "usually," "generally"). If the feedback suggests asking "what do you typically do?", the eval fails. These are fast, cheap, and completely deterministic—the same input always produces the same evaluation result.

**LLM-as-judge evals** use a separate LLM call (typically GPT-4o-mini for cost efficiency) to evaluate whether the coaching feedback exhibits certain problematic patterns. For example, one judge eval checks whether the feedback suggests any leading questions. The judge prompt includes a clear definition of what constitutes a leading question and asks for a pass/fail determination. These are more expensive and non-deterministic but can catch nuanced problems that are difficult to encode as deterministic rules.

Torres's actual implementation shows both approaches. For detecting general questions in coaching tips, she found that a code-based eval using keyword matching was actually more reliable than an LLM judge—after analyzing over 100 traces, she determined that nearly every general question contained one of a specific set of keywords. For detecting leading questions, she needed the nuanced understanding of an LLM judge.

## Scoring Judges and Building Confidence

A critical insight: LLM-as-judge evals are themselves AI systems that can fail. How do you know if your judge is accurately evaluating your coach? Torres implemented judge scoring by comparing LLM judge outputs against human grader outputs (her own manual annotations). This generates metrics like true positives, false positives, true negatives, and false negatives, allowing her to calculate an error rate for each judge.

This creates a hierarchy of confidence: human graders establish ground truth through manual annotation, judges are scored against human graders, and the coach is scored using the judges. When a judge's scores strongly align with human grading, it can be trusted to evaluate the coach at scale, providing a fast feedback loop for iteration without requiring human review of every output.

Torres runs her evaluations in Jupyter notebooks, where she can execute Python code blocks and see results immediately inline. A typical eval run produces a grid showing each transcript (rows) against each error category (columns), with cells marked pass (green) or fail (red). This visual representation makes it immediately obvious which error categories are most problematic and whether a change to the prompt improved overall performance.

Interestingly, the eval process sometimes revealed issues with her human grading rubric rather than the AI coach. One eval consistently flagged a pattern that human graders were missing, leading Torres to update the rubric she gives to human instructors.

## Experimentation and Iteration Workflow

With comprehensive evals in place, Torres established a rapid experimentation workflow. She can make a change—adjusting the prompt, changing the temperature setting, switching models, modifying chunking strategies—then immediately run all evals to see if performance improved or degraded. She described running potentially 20 experiments in an hour.

This fast feedback loop is maintained by keeping all experimentation local in her Jupyter notebook environment. She's not touching production, can't break anything, and can execute evals instantly. Only when an experiment shows clear improvement does she push those changes to production.

To maintain experimental history, Torres versions her Jupyter notebooks using Git (another tool she learned specifically for this project through ChatGPT assistance). After each eval run, she saves the notebook with all its output and commits it to version control. This creates a comprehensive record of every experiment and its results, allowing her to compare prompt A versus prompt B or see how a specific change impacted different error categories over time.

She also maintains a release log in Airtable, tracking every change made to the production system, the experimental results that motivated that change, and whether it was released or rolled back.

## Production Architecture: Moving to AWS

For production deployment, Torres eventually moved from Zapier to AWS Lambda functions orchestrated by Step Functions. This transition was motivated by several factors: greater reliability for a production environment, ability to mix Node.js (which most of her existing business logic uses) with Python (which her evals use), and more sophisticated orchestration capabilities.

The production workflow still begins with a trigger—either a student submitting a transcript through the course LMS or uploading a transcript to Vistily. This triggers a Step Function that orchestrates multiple Lambda functions: some run the interview coach analysis (sending transcripts to the Anthropic API), others format responses, some send emails to students, and critically, some run the evaluation suite automatically after every production use.

This means every single production transcript gets evaluated, providing ongoing monitoring of coach quality. Torres doesn't need to wait to accumulate traces and run periodic evaluations—she gets immediate visibility into whether the production system is encountering new failure modes or if quality is degrading.

## Token Management and Cost Optimization

Cost optimization emerged as an important concern, particularly as Torres began handling longer transcripts from real customer interviews (30-40 minutes, potentially 30,000+ tokens) rather than just short practice interviews from class (8 minutes, much smaller token counts).

She implemented several strategies:

**Eval cascades**: Rather than running every eval on every transcript, she runs cheaper preliminary checks first. If those indicate potential problems, they trigger more expensive comprehensive evals. This keeps costs down on the majority of transcripts that don't have issues.

**Chunking strategies**: Longer transcripts must be divided into smaller pieces. Different evals require different chunking approaches—some need the full transcript, some can work with just relevant sections. Torres is actively experimenting with optimal chunking strategies for different evaluation types.

**Model selection**: She uses the smallest, cheapest model that can reliably perform each task. GPT-4o-mini is often sufficient for eval judges. The coach itself uses Claude (via the Anthropic API), which Torres found performed better for the coaching feedback task, though she noted that at early stages both OpenAI and Claude performed similarly.

**Rate limiting**: From the beginning, Torres implemented rate limiting to prevent runaway costs. Initially set at two transcripts per week per student (one practice interview from class, one from their own work), though she discovered students were hitting limits by asking follow-up questions, leading to the architectural shift away from chat interfaces.

For short practice interview transcripts, processing costs range from 2 cents to 20 cents per interview depending on how many evals run. For longer real customer interviews, costs are higher but still reasonable, particularly with optimization strategies in place.

## Quality Control and Human Oversight

Despite comprehensive automated evaluation, Torres maintains several layers of human oversight. She receives a copy of every AI-generated feedback email, allowing her to spot-check quality. When she identifies errors that slipped through automated evals, she proactively contacts students to provide corrections.

This human-in-the-loop approach reflects a pragmatic understanding that AI systems deployed in educational contexts have high stakes—poor feedback can derail learning rather than support it. Torres prioritizes identifying failure modes that would be most catastrophic from a learning standpoint, particularly those where the coach suggests behaviors that contradict course teachings (leading questions, general questions).

For the partnership with Vistily and expansion to real customer interview data, Torres is implementing a controlled iterative release. A small beta group in July 2024 will consist of customers who explicitly opt in and consent to having their full traces reviewed. Only after establishing confidence with this group will the tool be released more broadly in September, and even then, only to users who have access to the course curriculum so they understand the rubric being applied.

## Tooling Choices and Accessibility

Torres is transparent about the tools used, emphasizing that she built everything using tools she already owned rather than getting distracted by specialized off-the-shelf solutions:

- **Airtable**: Data storage, trace management, human annotation interface
- **Zapier**: Workflow orchestration (initially), triggering from LMS
- **Learn Worlds**: Learning management system, assignment submission
- **Anthropic API (Claude)**: Primary LLM for coaching feedback
- **OpenAI API (GPT-4o-mini)**: LLM-as-judge for evaluations  
- **AWS Lambda & Step Functions**: Production code execution and orchestration
- **Jupyter Notebooks**: Experimentation environment, eval execution
- **Python**: Eval code (learned from scratch for this project)
- **Node.js**: Production business logic
- **Git**: Version control for experiments and code
- **ChatGPT**: Learning assistant for all new technical skills

This pragmatic tooling approach avoided the overhead of enterprise LLMOps platforms while still achieving production quality. Torres notes she specifically avoided specialized eval platforms initially because she wanted to deeply understand the eval process before being influenced by a tool's particular perspective.

## Lessons on Roles and Collaboration

A recurring theme throughout Torres's presentation is the question of who should do what in LLM application development. She accomplished remarkable breadth as an individual—from initial concept through production deployment with comprehensive evaluation—despite having no prior experience with Python, Jupyter notebooks, or Git.

This was enabled by AI assistance (primarily ChatGPT) that could explain concepts, generate code, and walk through setup procedures. However, Torres acknowledges this worked partially because she does have a software development background, even if not in these specific technologies. She can read code, understand what it's doing, and identify when AI-generated code doesn't match her intent.

Torres sees potential for product managers to be deeply involved in eval processes because they often have the most domain expertise. They understand what constitutes good and bad outputs in context. In an educational setting specifically, the instructor or curriculum designer understands what feedback helps versus hinders learning.

She's particularly enthusiastic about Jupyter notebooks as a potential collaboration environment where product managers and engineers can work together. Engineers might write the code blocks, but product managers can execute them, run experiments, review outputs, and iterate rapidly without requiring engineer intervention for every experimental run. This enables the fast feedback loops essential for prompt engineering and quality improvement while maintaining clear handoffs to engineers for production deployment.

## Limitations and Honest Assessment

Throughout the presentation, Torres maintains a balanced perspective on what was achieved and what challenges remain. She's honest that the interview coach has given incorrect feedback, suggesting behaviors that contradict course teachings. She's transparent about not being SOC 2 compliant and the constraints this creates. She acknowledges that evaluation is itself a product that requires significant iteration—judges must be tuned and scored against human grading to ensure reliability.

She's also clear that these tools will never be perfect. LLMs are non-deterministic, and perfect accuracy isn't achievable. The key is identifying which failures are most catastrophic in context (in education, suggesting wrong techniques is worse than missing an opportunity to praise good technique) and prioritizing elimination of those failure modes.

Torres emphasizes this is ongoing work. Three months in, she's still identifying new error categories, writing new evals, and iterating on prompts. The tool is deployed and providing value, but it's not "finished"—it exists in a state of continuous improvement informed by continuous evaluation.

## Future Directions

Beyond the interview coach, Torres is developing additional LLM-powered teaching tools including an interview snapshot coach and interactive interview simulations where students practice by conducting interviews with AI participants who can be programmed to exhibit specific behaviors.

She's particularly interested in how customers can participate in evaluation processes. Rather than just having instructors or domain experts grade traces, can end users (in this case, students) provide feedback on trace quality? How can customer input be incorporated into error analysis and eval development?

Torres is also exploring questions about how eval practices should evolve. Why aren't more teams doing comprehensive error analysis? Why do so many teams rely solely on fixed datasets rather than code-based and LLM-as-judge evals built from actual failure modes observed in production? She sees opportunity for better practices to spread from the ML engineering community to the broader community building LLM applications.

The partnership with Vistily represents a recognition that scaling requires infrastructure partnerships. Rather than building every capability in-house (particularly security compliance and data handling), finding partners who have already solved difficult problems enables faster scaling with appropriate safeguards.

## Broader Implications for LLMOps

This case study demonstrates several important patterns for production LLM applications:

The value of starting simple—Torres's first prototype was a ChatGPT custom GPT with a basic prompt and some uploaded files, built in hours. This provided fast validation of feasibility before any significant investment.

The importance of architecture evolution—the path from prototype to production went through multiple distinct architectures (custom GPTs, Replit app, Zapier workflows, AWS Lambda/Step Functions), each addressing limitations discovered in the previous approach.

The centrality of evaluation—quality confidence required moving beyond informal vibing of outputs to systematic error analysis, categorization of failure modes, and purpose-built evals for each category. This evaluation infrastructure became as important as the application itself.

The power of trace collection—storing user inputs and LLM outputs enabled retrospective analysis that continuously improved the system. Getting user consent for trace storage was crucial for this.

The accessibility of technical implementation—with AI assistance, someone without Python experience could build evaluation pipelines in days. However, this still required coding literacy (ability to read and understand code) and strong domain expertise.

The ongoing nature of LLM ops—three months after starting, this is still active development with continuous monitoring, eval development, and iteration. Production deployment doesn't mean development ends, it means establishing systems for continuous improvement.

The presentation provides a rare detailed look at the actual messy process of building, deploying, and operating an LLM application, complete with false starts, architectural pivots, and the ongoing challenge of achieving and maintaining quality in non-deterministic systems.