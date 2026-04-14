---
title: "Building a Production RAG System for Technical Document Search with Local LLMs"
slug: "building-a-production-rag-system-for-technical-document-search-with-local-llms"
draft: false
llmopsTags:
  - "document-processing"
  - "question-answering"
  - "chatbot"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "chunking"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "chromadb"
  - "llama-index"
  - "docker"
  - "sqlite"
  - "fastapi"
  - "monitoring"
  - "databases"
  - "open-source"
  - "pytorch"
  - "microsoft-azure"
  - "meta"
  - "nvidia"
industryTags: "energy"
company: "Core Marine"
summary: "An engineer at Core Marine, an offshore engineering company, was tasked with building an internal chat tool that could answer questions about nearly a decade of company projects using natural language queries. The challenge involved indexing 1TB of highly technical, unstructured documents including OrcaFlex simulation files, reports, and regulations, while maintaining fast response times and data confidentiality through local LLM deployment. The solution employed a RAG architecture using Ollama for local LLM inference (llama3.2:3b), LlamaIndex as the orchestration framework, ChromaDB as a vector database, and nomic-embed-text for embeddings. After overcoming significant challenges with memory management, file filtering, GPU constraints, and storage limitations, the system successfully indexed 451GB of documents (738,470 vectors) and deployed a Flask API with Streamlit frontend, serving documents directly from Azure Blob Storage while keeping the vector index local."
link: "https://en.andros.dev/blog/aa31d744/from-zero-to-a-rag-system-successes-and-failures/"
year: 2026
seo:
  title: "Core Marine: Building a Production RAG System for Technical Document Search with Local LLMs - ZenML LLMOps Database"
  description: "An engineer at Core Marine, an offshore engineering company, was tasked with building an internal chat tool that could answer questions about nearly a decade of company projects using natural language queries. The challenge involved indexing 1TB of highly technical, unstructured documents including OrcaFlex simulation files, reports, and regulations, while maintaining fast response times and data confidentiality through local LLM deployment. The solution employed a RAG architecture using Ollama for local LLM inference (llama3.2:3b), LlamaIndex as the orchestration framework, ChromaDB as a vector database, and nomic-embed-text for embeddings. After overcoming significant challenges with memory management, file filtering, GPU constraints, and storage limitations, the system successfully indexed 451GB of documents (738,470 vectors) and deployed a Flask API with Streamlit frontend, serving documents directly from Azure Blob Storage while keeping the vector index local."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-rag-system-for-technical-document-search-with-local-llms"
  ogTitle: "Core Marine: Building a Production RAG System for Technical Document Search with Local LLMs - ZenML LLMOps Database"
  ogDescription: "An engineer at Core Marine, an offshore engineering company, was tasked with building an internal chat tool that could answer questions about nearly a decade of company projects using natural language queries. The challenge involved indexing 1TB of highly technical, unstructured documents including OrcaFlex simulation files, reports, and regulations, while maintaining fast response times and data confidentiality through local LLM deployment. The solution employed a RAG architecture using Ollama for local LLM inference (llama3.2:3b), LlamaIndex as the orchestration framework, ChromaDB as a vector database, and nomic-embed-text for embeddings. After overcoming significant challenges with memory management, file filtering, GPU constraints, and storage limitations, the system successfully indexed 451GB of documents (738,470 vectors) and deployed a Flask API with Streamlit frontend, serving documents directly from Azure Blob Storage while keeping the vector index local."
notion:
  pageId: "341f8dff-2538-8076-81be-de5223de0ae7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-13T07:05:00.000Z"
  lastEditedTime: "2026-04-13T07:05:00.000Z"
  publishedAt: "2026-04-14T08:50:00Z"
---

## Overview

This case study documents the journey of building a production RAG (Retrieval-Augmented Generation) system at Core Marine, a company operating in the offshore engineering industry. The engineer, Andros Fenollosa, was given the task of creating an internal tool that would allow company engineers to ask questions in natural language about nearly a decade of company projects and receive answers with references to source documents. The emphasis was on fast response times and the ability to extract information from highly technical documents, particularly OrcaFlex files used for simulating floating body dynamics, cables, and other offshore infrastructure. The author explicitly states this was their first RAG implementation and they had no prior knowledge of how such systems worked, making this a particularly valuable real-world learning case study.

The initial data source consisted of 1TB of mixed technical documents stored in Azure, including project files, technical documentation, reports, analyses, regulations, CSVs, and various other formats with minimal organization. A critical constraint was that all LLM processing had to be local without relying on external APIs due to confidentiality requirements. The project took significantly longer than initially expected and involved numerous technical challenges that required iterative problem-solving.

## Technology Stack Selection

The author approached technology selection pragmatically, choosing tools based on maturity, ease of use, and confidentiality requirements. For the local language model, **Ollama** emerged as the most mature option for running LLaMA models locally without external API dependencies. The final deployment used **llama3.2:3b** as the inference model. For embeddings, after testing several options, **nomic-embed-text** was selected for its good performance and quality with technical documents.

A critical architectural decision was selecting **LlamaIndex** as the RAG orchestration framework. LlamaIndex handles the complex pipeline of document indexing, embedding generation, vector database storage, and query execution. The author notes this was essential because without proper orchestration, even a fast language model cannot effectively retrieve relevant information from large document collections. The analogy used is apt: a RAG engine functions like a book's index, allowing direct navigation to relevant content rather than reading everything sequentially.

Python was chosen as the development language primarily due to developer productivity and comfort, though the author notes both Ollama and LlamaIndex have excellent Python SDKs. The initial prototype involved simple scripts to test vectorization and queries, which worked well with minimal code, leading to an overly optimistic timeline estimate that proved incorrect once real-world data was introduced.

## Data Ingestion and File Filtering Challenges

The first major production challenge emerged when processing the actual document corpus. The initial attempt to index documents resulted in RAM overflow and system freezes within minutes. Debugging revealed that LlamaIndex was attempting to process massive files that contributed no value to the RAG system: videos, simulations, backup files, and other binary formats. The system tried to load multi-gigabyte files entirely into memory as if they were text, causing catastrophic resource exhaustion.

The solution was implementing a comprehensive filtering pipeline that excluded files by extension and naming patterns. The filtering system categorized exclusions into multiple groups: video formats (mp4, avi, mov, etc.), images (jpg, png, gif, etc.), executables (exe, dll, jar, etc.), compressed archives (zip, rar, 7z, etc.), simulation files (sim, dat), temporary files (tmp, cache, log, etc.), backups (bak, old, bkp, etc.), and email formats (msg, pst, eml). Additionally, files that were expensive to process without adding value—such as CSVs and JSONs—were excluded. Documents in formats like PDF, DOCX, XLSX, and PPTX were converted to plain text for efficient processing.

This filtering resulted in a 54% reduction in files requiring indexing, which not only prevented memory exhaustion but also improved overall system efficiency. The author emphasizes this was a critical lesson: understanding your data and preprocessing it appropriately is essential for production RAG systems.

## Vector Database and Indexing Architecture

The initial indexing approach used LlamaIndex's default JSON-based storage format, which works well for small document sets but proved completely unmanageable at scale. Every service restart required reprocessing all documents from scratch, potentially taking days. The author attempted to add checkpoint systems to save progress, but data corruption, errors, and slow performance created an insurmountable bottleneck.

The breakthrough came from migrating to **ChromaDB**, an open-source vector database (Apache-2.0 license) specifically designed for storing and querying vector embeddings. ChromaDB provides an abstraction layer over traditional databases—the author configured it with SQLite as the backing store—and offers specialized functionality for similarity searches and clustering. This architectural change was described as "radical and instant" in its impact.

The new architecture transformed indexing from a monolithic memory-bound process into a batch pipeline that processed 150 files at a time, generated embeddings, and stored them directly in ChromaDB. This enabled indexing the 451GB corpus across multiple sessions with checkpoints and no data loss on interruptions. The SQLite-backed storage also made backup and restore operations trivial—simply copying the database file. The final indexed database contained 738,470 vectors and occupied 54GB of storage.

However, a new bottleneck emerged: processing speed. Initial benchmarks revealed that the author's laptop with an integrated graphics card would require several months to complete indexing, processing approximately 500MB of documents in 4-5 hours on CPU alone.

## GPU Infrastructure and Cost Management

To address the computational bottleneck, the company rented a virtual machine equipped with an **NVIDIA RTX 4000 SFF Ada** GPU with 20GB of VRAM. The author notes these rentals "are not exactly cheap" and that working under this constraint added pressure to the project. The system was containerized and optimized to leverage GPU acceleration through the NVIDIA Container Toolkit.

The indexing process ran for 2-3 weeks on the GPU-equipped VM before completing successfully. Once indexing finished, the 54GB ChromaDB SQLite file was copied to the local production environment and the expensive VM was shut down. The total cost for the Hetzner GPU rental was €184, which the author describes as "not cheap" but necessary to make the project feasible. This represents a practical example of the infrastructure cost considerations in LLMOps: sometimes expensive resources are required temporarily during the indexing/training phase but can be shut down once the artifacts are created.

## API and User Interface Design

For production deployment, the author built a **Flask** API to provide HTTP access to the RAG system, which orchestrates queries between LlamaIndex, ChromaDB, and Ollama. The API was deployed using **Gunicorn** for production-grade serving. For the frontend, **Streamlit** was selected due to the author's familiarity with it for internal tools and its native Q&A chat widget that mimics modern AI chat interfaces. The entire visual interface was implemented in a couple of hours, with subsequent time spent on polish: company branding, loading spinners, session persistence, and other UX details.

A critical requirement was that responses must include source references—citations to the original documents used to generate each answer. The system was configured with response templates that ensure every answer includes document references with download links. This citation capability is essential for trustworthiness in enterprise RAG systems, allowing users to verify information against source documents.

## Storage Architecture and Document Serving

A significant constraint emerged during deployment: the production virtual machine had limited resources, particularly only 100GB of disk space, making it impossible to store the original 451GB of documents locally. However, the vector database alone doesn't eliminate the need for original documents—users must be able to access source materials referenced in responses.

The elegant solution was architectural separation: the vector index (54GB ChromaDB database) and LLM (~10GB) are stored locally on the production VM, while original documents remain in **Azure Blob Storage**. For each document cited in a response, the system generates a download link with a **SAS (Shared Access Signature) token** that allows users to download directly from Azure without requiring documents to be stored on the application server. This demonstrates a practical pattern in LLMOps: separating hot data (frequently accessed embeddings and models) from cold data (original documents accessed on-demand).

## Production Architecture and Service Orchestration

The final production architecture consists of multiple integrated layers orchestrated through **Docker Compose**:

- **LLM Layer**: Ollama running llama3.2:3b for local response generation
- **Embeddings**: nomic-embed-text for document vectorization
- **Vector Database**: ChromaDB with HNSW (Hierarchical Navigable Small World) indexing backed by SQLite
- **RAG Framework**: LlamaIndex orchestrating the retrieval-augmented generation pipeline
- **API Layer**: Flask with Gunicorn providing HTTP REST service
- **Frontend**: Streamlit providing the conversational chat interface
- **Container Orchestration**: Docker Compose managing all services
- **GPU Acceleration**: NVIDIA Container Toolkit enabling hardware acceleration
- **Document Storage**: Azure Blob Storage for cloud-based document persistence

The data flow works as follows: users interact with the Streamlit web interface, which sends HTTP requests to the Flask API. The backend calls LlamaIndex, which queries ChromaDB for relevant document vectors based on the user's question embedded with nomic-embed-text. Retrieved context is passed to Ollama for response generation. The response includes citations with Azure Blob Storage SAS token links for document downloads.

## Operational Lessons and Production Best Practices

The author shares several hard-won lessons from production deployment that represent valuable LLMOps practices:

**Memory Management**: Loading all documents into memory for batch processing is dangerous and leads to system crashes. The solution is explicit batch processing (150 files per iteration in this case) with explicit garbage collector calls between batches. Each batch is processed, embedded, stored in ChromaDB, and then memory is freed before continuing to the next batch.

**Error Handling and Tolerance**: Even after comprehensive filtering, some problematic files passed through—corrupt PDFs, Word documents with broken macros, spreadsheets with unexpected formats. The strategy adopted was error tolerance: if a file fails during parsing, it's logged and the system moves to the next file. A single problematic file never stops an entire batch. Failed files can be manually reviewed and potentially assigned to different batches or excluded.

**Checkpoint Systems**: When individual batches can take hours to process, system reliability requires robust checkpointing. The implementation saves the last completed batch, total processed nodes, and timestamps. On restart after power outages or other interruptions, indexing resumes exactly where it left off rather than starting from zero.

**Monitoring and Observability**: For long-running RAG indexing processes, comprehensive monitoring is essential. The author implemented multiple monitoring scripts for different operational states: `index-progress`, `index-watch`, `index-speed`, `index-checkpoint`, and `index-failed`. When RAG systems are processing for hours or days, operators need real-time visibility into what's happening and the ability to diagnose issues.

## Critical Assessment and Limitations

The author provides a refreshingly honest assessment of the system's limitations. The original aspiration was to integrate an OrcaFlex simulation instance that would allow the LLM to actually run projects or perform simulations on demand, but this proved beyond the available time and resources. This represents a common pattern in production LLM systems: the initial deployment focuses on achievable core functionality (document retrieval and Q&A) rather than more ambitious but higher-risk features (simulation integration).

The author emphasizes that "it's not a perfect system, but it's sufficient" and reports being "very happy with the final result" because the system is "fast, reliable, and above all useful" to colleagues. This pragmatic framing is important for LLMOps practitioners: production systems are judged on utility and reliability, not perfection.

The most important advice offered is about data quality: "spend time building the best possible data. If the source is not relevant enough, the LLM won't be able to generate good answers." This echoes a fundamental principle in LLMOps—garbage in, garbage out applies even more critically to RAG systems where retrieval quality directly determines generation quality.

## Production Deployment Considerations

Two community comments on the blog post raise important questions about production quality that the original post doesn't fully address. One commenter asks about accuracy given the variety of text formats in the base dataset and how the system handles chunking where paragraphs or lists get broken across document boundaries, noting this could result in "half baked bread" during similarity search. Another asks for more detail on the checkpoint system implementation and the Flask + Streamlit integration pattern.

These questions highlight that while the case study documents the successful deployment of a working RAG system, there are remaining questions about retrieval quality metrics, chunking strategies, and detailed implementation patterns that would be valuable for practitioners. The absence of quantitative evaluation metrics (retrieval precision/recall, answer accuracy, user satisfaction scores) represents a gap common in many real-world case studies where teams focus on getting systems working rather than comprehensive evaluation.

The emphasis on local deployment for confidentiality, the use of open-source components (LlamaIndex, ChromaDB, Ollama), and the pragmatic architecture that separates storage concerns represents a thoughtful approach to enterprise LLMOps constraints. The total infrastructure cost (€184 for GPU rental) provides a useful data point for budgeting similar projects, though ongoing operational costs aren't discussed.
