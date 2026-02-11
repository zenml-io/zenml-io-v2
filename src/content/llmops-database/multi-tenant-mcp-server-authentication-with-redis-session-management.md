---
title: "Multi-Tenant MCP Server Authentication with Redis Session Management"
slug: "multi-tenant-mcp-server-authentication-with-redis-session-management"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69089f300406c1114372a014"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:23:50.497Z"
  createdOn: "2025-11-03T12:25:20.924Z"
llmopsTags:
  - "chatbot"
  - "multi-modality"
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "agent-based"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "mcp"
  - "evals"
  - "redis"
  - "cache"
  - "serverless"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "fastapi"
  - "postgresql"
  - "security"
  - "guardrails"
  - "cicd"
  - "scaling"
  - "microservices"
  - "api-gateway"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "documentation"
  - "microsoft-azure"
  - "google-gcp"
  - "cloudflare"
industryTags: "tech"
company: "BrainGrid"
summary: "BrainGrid faced the challenge of transforming their Model Context Protocol (MCP) server from a local development tool into a production-ready, multi-tenant service that could be deployed to customers. The core problem was that serverless platforms like Cloud Run and Vercel don't maintain session state, causing users to re-authenticate repeatedly as instances scaled to zero or requests hit different instances. BrainGrid solved this by implementing a Redis-based session store with AES-256-GCM encryption, OAuth integration via WorkOS, and a fast-path/slow-path authentication pattern that caches validated JWT sessions. The solution reduced authentication overhead from 50-100ms per request to near-instantaneous for cached sessions, eliminated re-authentication fatigue, and enabled the MCP server to scale from single-user to multi-tenant deployment while maintaining security and performance."
link: "https://www.braingrid.ai/blog/how-we-solved-mcp-authentication"
year: 2025
seo:
  title: "BrainGrid: Multi-Tenant MCP Server Authentication with Redis Session Management - ZenML LLMOps Database"
  description: "BrainGrid faced the challenge of transforming their Model Context Protocol (MCP) server from a local development tool into a production-ready, multi-tenant service that could be deployed to customers. The core problem was that serverless platforms like Cloud Run and Vercel don't maintain session state, causing users to re-authenticate repeatedly as instances scaled to zero or requests hit different instances. BrainGrid solved this by implementing a Redis-based session store with AES-256-GCM encryption, OAuth integration via WorkOS, and a fast-path/slow-path authentication pattern that caches validated JWT sessions. The solution reduced authentication overhead from 50-100ms per request to near-instantaneous for cached sessions, eliminated re-authentication fatigue, and enabled the MCP server to scale from single-user to multi-tenant deployment while maintaining security and performance."
  canonical: "https://www.zenml.io/llmops-database/multi-tenant-mcp-server-authentication-with-redis-session-management"
  ogTitle: "BrainGrid: Multi-Tenant MCP Server Authentication with Redis Session Management - ZenML LLMOps Database"
  ogDescription: "BrainGrid faced the challenge of transforming their Model Context Protocol (MCP) server from a local development tool into a production-ready, multi-tenant service that could be deployed to customers. The core problem was that serverless platforms like Cloud Run and Vercel don't maintain session state, causing users to re-authenticate repeatedly as instances scaled to zero or requests hit different instances. BrainGrid solved this by implementing a Redis-based session store with AES-256-GCM encryption, OAuth integration via WorkOS, and a fast-path/slow-path authentication pattern that caches validated JWT sessions. The solution reduced authentication overhead from 50-100ms per request to near-instantaneous for cached sessions, eliminated re-authentication fatigue, and enabled the MCP server to scale from single-user to multi-tenant deployment while maintaining security and performance."
---

## Overview

BrainGrid, a company building AI-assisted software development tools, documented their journey of deploying a Model Context Protocol (MCP) server into production as a multi-tenant service. The MCP is an emerging protocol that allows AI assistants (like Claude or other LLM-based agents) to interact with external tools and services. In this case study, BrainGrid's MCP server enables AI assistants to create Jira tickets, query databases, and perform other developer workflow actions. While the server worked perfectly in local development using stdio transport, deploying it to serverless platforms for customer access revealed fundamental challenges around authentication, session management, and stateless architecture.

The case study is particularly valuable for understanding LLMOps because it addresses a critical gap in the emerging ecosystem of LLM-integrated tools: how to move from prototype to production when your AI tooling needs to serve multiple users with proper authentication and authorization. This represents a real-world production deployment challenge that many teams building LLM-powered applications will face as they scale beyond single-user scenarios.

## The Production Deployment Challenge

The core problem BrainGrid identified stems from the stateless nature of serverless computing platforms. When running locally, an MCP server maintains in-memory state including authenticated sessions. However, serverless platforms like Google Cloud Run and Vercel have unpredictable instance lifecycles characterized by cold starts, scale-to-zero behavior, horizontal scaling across multiple instances, and no sticky session support. This means that any in-memory session storage is ephemeral and isolated to individual instances, leading to several critical issues.

First, without persistent session storage, the MCP server must perform full JWT validation on every single request. This involves fetching JWKS (JSON Web Key Sets) from the authentication provider (approximately 50ms network latency), verifying cryptographic signatures (approximately 10ms CPU time), and validating claims (approximately 5ms). This 50-100ms overhead on every request significantly degrades user experience and increases cloud costs due to longer function execution times.

Second, and more problematically from a user experience perspective, users face constant re-authentication prompts. The documented user flow shows a developer connecting to the MCP server, authenticating successfully, executing a command, then being forced to re-authenticate just minutes later when Cloud Run scales the instance to zero or when load balancing directs their request to a different instance. This creates what the team calls "authentication whack-a-mole" that makes the tool essentially unusable in practice.

Third, the naive approach of deploying with "just install it locally" instructions creates an untenable support burden where each user must clone repositories, manage dependencies, configure API keys, handle key rotation, pull updates, and resolve environment conflicts. This works for a handful of technical users but doesn't scale to broader customer deployment.

## Technical Architecture and Solution

BrainGrid's solution centers on implementing a Redis-based session store with military-grade encryption to maintain authentication state across serverless instances. The architecture follows a multi-tier caching strategy where incoming requests first check an in-memory cache on the instance, then check Redis for cached sessions, and only fall back to full JWT validation if neither cache contains valid session data.

The session store implementation uses AES-256-GCM (Galois/Counter Mode) encryption to protect sensitive session data at rest in Redis. When storing a session, the system generates a unique 16-byte initialization vector (IV) for each encryption operation, encrypts the JSON-serialized session data, obtains the authentication tag from GCM mode, and combines all components (IV + auth tag + encrypted data) into a base64-encoded string that's stored in Redis with an automatic TTL (time-to-live) of 7 days by default. The encryption key is stored as a Kubernetes secret or environment variable and must be exactly 32 bytes (64 hex characters).

The retrieval process reverses this by decoding the base64 string, extracting the IV, authentication tag, and encrypted data components, creating a decipher with the original key and IV, verifying the authentication tag to detect any tampering, and decrypting to recover the original session object. If decryption fails or the authentication tag doesn't match, the system logs a potential tampering attempt and forces re-authentication.

The Redis configuration itself is production-hardened with several important characteristics. It implements exponential backoff retry strategy with delays capped at 2 seconds, automatic reconnection on readOnly errors (which occur during Redis failover scenarios), connection timeout of 10 seconds, maximum 3 retries per request, and critically, enableOfflineQueue set to false to fail fast rather than queueing commands when Redis is unavailable. The system monitors Redis connection health through event handlers that log connection state changes.

## Authentication Flow and OAuth Integration

The authentication middleware implements what BrainGrid calls a "fast-path/slow-path" pattern. On each request, the system attempts to extract the bearer token from the Authorization header. It then performs a lightweight JWT decode (not full validation) to extract the user ID and expiration timestamp. If the token appears valid and not expired, the system queries Redis for a cached session matching that user ID. If found and the cached token matches the request token, authentication succeeds immediately without any cryptographic operations or network calls to the OAuth provider.

Only when the cache misses does the system fall back to the slow path of full JWT validation. This involves fetching the JWKS from WorkOS (their chosen OAuth provider), verifying the JWT signature using the jose library, validating claims including issuer, audience (if configured), and required fields like subject, email, and organization ID, and creating an MCPSession object containing userId, email, organizationId, scopes array, and the original token. This validated session is then stored in Redis for future requests.

The OAuth configuration itself follows MCP-specific requirements. The server exposes OAuth discovery metadata including issuer, authorization endpoint, token endpoint, JWKS URI, supported response types (authorization code), grant types (authorization_code and refresh_token), code challenge methods (S256 for PKCE), token endpoint authentication methods (none for public clients), and supported scopes. Notably, the JWKS URI points directly to the provider's JWKS endpoint rather than the standard .well-known/jwks.json path, which appears to be an MCP-specific requirement or WorkOS-specific configuration.

The WWW-Authenticate header formatting is crucial for MCP client compatibility. When authentication fails, the server returns a 401 status with a WWW-Authenticate header containing the error type, error description, and critically, a resource_metadata URL pointing to the OAuth protected resource discovery endpoint. This allows MCP clients to discover authentication requirements and initiate the OAuth flow automatically.

## Dual Transport Mode Architecture

An interesting aspect of BrainGrid's implementation is supporting both local development (stdio transport) and production deployment (httpStream transport) from the same codebase. The transport type is determined by an environment variable, and the authentication strategy adapts accordingly.

In local stdio mode, the server uses a local AuthHandler that manages credentials stored on the developer's machine, similar to how CLI tools like AWS CLI or gcloud handle authentication. The API client checks for a session object and uses it if present (indicating httpStream/production mode), otherwise falls back to the local AuthHandler to retrieve stored credentials. This allows developers to test MCP tools locally without needing to run the full OAuth flow.

In production httpStream mode, the server starts an HTTP server listening on a configurable port (default 8080) and endpoint (default /mcp), implements the OAuth flow with WorkOS, and passes authenticated session objects to tool execution contexts. Each tool implementation receives the session through its context parameter and can extract user identity, organization membership, and authorization scopes.

This dual-mode architecture is important for LLMOps because it maintains developer velocity during the development cycle while ensuring production deployments have proper multi-tenant isolation and security. Developers can iterate quickly on tool logic without authentication overhead, then deploy the same code to production where authentication is enforced.

## Graceful Degradation and Failure Handling

BrainGrid's implementation makes deliberate choices about failure handling that reflect production operational experience. When the session store is unavailable (Redis connection failed, encryption key not configured, or transport is stdio), the system degrades gracefully by skipping session storage and falling back to per-request JWT validation. Critically, there is no attempt to maintain in-memory session state as a fallback.

This design choice is intentional and reflects understanding of serverless architecture. In a serverless environment with multiple instances, maintaining per-instance in-memory caches creates inconsistent state where some instances have cached sessions and others don't, leading to unpredictable authentication behavior. Better to have consistent behavior (always validate) when Redis is unavailable than to have some requests succeed quickly and others fail or require re-authentication based on which instance they hit.

The session store methods (storeSession, getSession, removeSession) all wrap their Redis operations in try-catch blocks and log errors without throwing exceptions. This prevents Redis failures from cascading into application failures. If storing a session fails, the authentication still succeeded and the user can proceed, they just won't benefit from caching on the next request. If retrieving a session fails, the system falls back to full validation.

The authentication middleware distinguishes between different failure types. Decryption failures that indicate possible tampering are logged with high severity. Generic Redis errors are logged but don't expose details to the client. JWT validation failures return appropriate OAuth error responses with proper WWW-Authenticate headers. This layered error handling ensures security-sensitive failures are logged for investigation while maintaining appropriate client-facing error messages.

## Production Deployment Configurations

The case study documents specific deployment configurations for both Google Cloud Run and Vercel. For Cloud Run, BrainGrid uses a multi-stage Docker build that separates the build stage (including TypeScript compilation) from the production stage (which only includes production dependencies and compiled artifacts). The production image is based on node:22-alpine for minimal size, installs only production dependencies using pnpm, includes a health check endpoint that Cloud Run monitors, and exposes port 8080.

The Cloud Run service configuration specifies CPU and memory limits (1 CPU, 512Mi memory), concurrency settings (80 concurrent requests per instance), scaling parameters (minimum 1 instance to avoid cold starts for the first request, maximum 100 instances), timeout of 300 seconds for long-running operations, and environment variables including MCP_TRANSPORT=httpStream and REDIS_URL. Secrets like the encryption key are injected from Google Secret Manager rather than environment variables for security.

For Vercel deployment, the configuration uses the @vercel/node runtime, defines routes for health checks, the MCP endpoint, and OAuth discovery endpoints, and sets environment variables for production mode. The Vercel configuration is simpler because Vercel handles much of the infrastructure automatically, but the same session management and authentication logic applies.

Both deployment strategies set minimum instances greater than zero to avoid cold start latency on the first request. While this increases baseline costs, it's a deliberate tradeoff for better user experience. The team notes that efficient session caching means each instance handles many requests with minimal overhead, making the cost reasonable.

## Observability and Monitoring

BrainGrid implements structured logging using the pino library, which is a high-performance JSON logger for Node.js. In development, logs are formatted with pino-pretty for human readability, while in production, logs are emitted as JSON for ingestion by logging platforms. The logger configuration includes request/response serializers that automatically redact sensitive headers like Authorization, error serializers that capture stack traces and error context, and custom formatters for consistent log structure.

The logging strategy includes request tracking middleware that assigns unique request IDs to each incoming request, logs request details at the start, logs response details including status code and elapsed time when the response finishes, and attaches the request ID to all log entries for that request, enabling distributed tracing through the application.

Tool execution is instrumented to record timing metrics and success/failure status. The case study shows an example integration with DataDog's StatsD client that records timing metrics for each tool call (how long it took to execute), counter metrics for tool call frequency, and tags each metric with tool name and success/failure status. This enables production monitoring of which tools are used most frequently, which tools are slowest, which tools have high failure rates, and how performance changes over time.

The authentication middleware specifically logs authentication latency, cache hit/miss rates, JWT validation failures, and Redis connection errors. These metrics are crucial for understanding whether the session caching strategy is effective and identifying authentication-related issues before they impact users.

## Performance Optimizations

Beyond the core session caching strategy, BrainGrid implements several performance optimizations. Redis connection pooling uses a singleton pattern to reuse connections across requests within the same instance, implements lazy connection to avoid connecting during module initialization, uses keepAlive and noDelay TCP options for better network performance, and implements aggressive timeouts (5 seconds for both connection and commands) to fail fast in serverless environments.

The JWT validation includes JWKS caching where the JWKS (JSON Web Key Set) fetched from WorkOS is cached in memory using a Map. This avoids repeated network calls to fetch the same public keys since they rarely change. The jose library's createRemoteJWKSet provides built-in caching and automatic refresh when keys rotate.

An interesting optimization is request batching for JWT validation. If multiple requests arrive simultaneously with the same bearer token (common in frontend applications that make multiple parallel API calls), the system ensures only one JWT validation occurs by maintaining a Map of pending validations. Subsequent requests with the same token reuse the existing validation promise rather than initiating duplicate validations. The pending validation is removed from the map after completion (success or failure) to avoid memory leaks.

The fast-path optimization in authentication is particularly impactful. By decoding (not validating) the JWT to extract the user ID before checking Redis, the system avoids even the Redis roundtrip for obviously expired tokens. The decode operation is purely computational (base64 decode and JSON parse) and takes less than 1ms. If the token is expired, the system skips the Redis lookup entirely and proceeds directly to full validation, which will fail anyway. This optimization prevents unnecessary Redis queries for expired tokens.

## Security Considerations

The case study demonstrates several security best practices for production LLMOps deployments. The session encryption using AES-256-GCM provides both confidentiality and authenticity. GCM mode includes an authentication tag that detects any tampering with the ciphertext, making it impossible for an attacker to modify cached sessions even if they gain access to Redis. Each session is encrypted with a unique IV, preventing patterns from emerging if the same session data is stored multiple times.

The encryption key management stores keys in secret management services (Google Secret Manager for Cloud Run, Vercel Secrets for Vercel) rather than environment variables or configuration files, validates key length on startup to ensure proper encryption strength (32 bytes = 256 bits), and the case study explicitly notes that key rotation would require invalidating all cached sessions, which is an acceptable tradeoff for security.

JWT validation follows OAuth best practices by verifying the JWT signature using public keys from the OAuth provider, validating the issuer claim matches the expected OAuth provider, checking the audience claim if configured (to ensure tokens intended for other services aren't accepted), verifying expiration timestamps, and requiring specific claims (sub, email, org_id) necessary for session creation.

The logging implementation carefully redacts sensitive data by replacing Authorization headers with "[REDACTED]" in request logs, avoiding logging full tokens or encryption keys, and logging decryption failures that might indicate tampering attempts separately from normal errors for security monitoring.

Authorization is implemented at the session level where each session includes an organizationId that tools use to scope API calls to the appropriate tenant. The case study shows API client implementations that include X-Organization-Id headers in requests to the backend API, ensuring multi-tenant isolation even when multiple organizations' users connect to the same MCP server instance.

## Critical Analysis and Tradeoffs

While the case study is authored by BrainGrid to document their solution, it's important to critically examine the tradeoffs and limitations of their approach. The Redis dependency creates a single point of failure and ongoing operational cost. If Redis becomes unavailable, users must re-authenticate frequently, degrading the experience. Redis also requires operational expertise for proper configuration, monitoring, and maintenance. For smaller deployments, this added complexity might outweigh the benefits.

The session caching strategy stores the original bearer token in Redis, even though it's encrypted. This means if Redis is compromised and the encryption key is also compromised, attackers gain access to valid bearer tokens. An alternative approach would be to store only the validated claims and issue short-lived server-side session tokens, though this adds complexity to the OAuth flow.

The minimum instance configuration (min-instances: 1) to avoid cold starts has cost implications. For services with unpredictable usage patterns, paying for idle instances might be wasteful. However, for customer-facing production services, the user experience benefit likely justifies the cost. The case study doesn't provide specific cost analysis or utilization metrics to validate this tradeoff.

The MCP protocol itself is relatively new and evolving, which the case study touches on but doesn't fully address. The OAuth configuration requirements are somewhat non-standard (JWKS URI path, specific WWW-Authenticate header format), suggesting the protocol may not be fully stabilized. Teams adopting this approach should be prepared for potential breaking changes as the MCP protocol matures.

The dual transport mode (stdio for local, httpStream for production) creates testing challenges. Local development with stdio doesn't exercise the full authentication path, so authentication issues might only surface in production. A more robust approach might include local testing modes that simulate the full OAuth flow against a development OAuth provider.

## Broader LLMOps Implications

This case study illuminates several important themes for LLMOps practitioners. First, authentication and authorization for LLM-integrated tools is fundamentally different from traditional web applications. MCP servers sit between AI assistants and backend services, requiring careful session management across stateless infrastructure while maintaining security boundaries.

Second, the serverless deployment model common in LLMOps has inherent tensions with stateful requirements. While serverless platforms offer excellent scalability and cost efficiency for bursty workloads (common with AI assistant usage), they complicate session management, increase authentication overhead, and require careful architectural choices to maintain good user experience.

Third, production LLM deployments require the same operational rigor as traditional systems: comprehensive logging and monitoring, graceful degradation when dependencies fail, security best practices including encryption at rest and in transit, and performance optimization through caching and batching. The fact that LLMs are involved doesn't change these fundamental requirements.

Fourth, multi-tenancy in LLM tools requires careful session and authorization design. Each AI assistant interaction must be scoped to the appropriate user and organization, with backend APIs enforcing authorization boundaries. The session object pattern (containing userId, organizationId, scopes) provides a clean abstraction for passing authorization context through the system.

Finally, the emerging ecosystem of LLM protocols and tools (like MCP) is still maturing, which creates both opportunities and risks. Early adopters like BrainGrid can shape the direction of these protocols, but must also be prepared to adapt as standards evolve. The case study's documentation of specific implementation details (OAuth configuration, header formats, discovery endpoints) provides valuable guidance for other teams navigating the same challenges.

## Conclusion

BrainGrid's case study provides a detailed technical blueprint for deploying MCP servers into production serverless environments with proper authentication and session management. While the document is promotional in nature (the team is building BrainGrid as a product), the technical content demonstrates genuine production experience and addresses real operational challenges. The Redis session store with encryption, fast-path/slow-path authentication pattern, graceful degradation strategy, and comprehensive monitoring provide a solid foundation for teams building similar LLM-integrated tools. The tradeoffs around Redis dependency, cost, and protocol maturity should be carefully considered based on each team's specific requirements and constraints.