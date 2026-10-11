---
title: "Operating a Secure, High-Scale MCP Proxy for Anthropic Products"
slug: "operating-a-secure-high-scale-mcp-proxy-for-anthropic-products"
draft: false
llmopsTags:
  - "mcp"
  - "error-handling"
  - "fallback-strategies"
  - "latency-optimization"
  - "redis"
  - "cache"
  - "monitoring"
  - "reliability"
  - "scalability"
  - "security"
  - "anthropic"
industryTags: "tech"
company: "Anthropic"
summary: "Anthropic operates a forward MCP proxy that connects its products to remote Model Context Protocol servers while injecting credentials, enforcing access control, and providing a controlled production boundary. At scale, the proxy addressed OAuth interoperability and refresh-token race conditions with Redis-based distributed locking, reduced redundant MCP traffic through session and server-level caching, and improved diagnosis through contextual error classification and structured per-request logging. The reported results include preventing concurrency-driven token invalidation, reducing avoidable upstream initialization and tool-list requests, and revealing that 92% of observed servers returned an unchanged tool list, although caching must be carefully invalidated when permissions or server state change."
link: "https://www.youtube.com/watch?v=e8DMLtP5ibk"
year: 2026
seo:
  title: "Anthropic: Operating a Secure, High-Scale MCP Proxy for Anthropic Products - ZenML LLMOps Database"
  description: "Anthropic operates a forward MCP proxy that connects its products to remote Model Context Protocol servers while injecting credentials, enforcing access control, and providing a controlled production boundary. At scale, the proxy addressed OAuth interoperability and refresh-token race conditions with Redis-based distributed locking, reduced redundant MCP traffic through session and server-level caching, and improved diagnosis through contextual error classification and structured per-request logging. The reported results include preventing concurrency-driven token invalidation, reducing avoidable upstream initialization and tool-list requests, and revealing that 92% of observed servers returned an unchanged tool list, although caching must be carefully invalidated when permissions or server state change."
  canonical: "https://www.zenml.io/llmops-database/operating-a-secure-high-scale-mcp-proxy-for-anthropic-products"
  ogTitle: "Anthropic: Operating a Secure, High-Scale MCP Proxy for Anthropic Products - ZenML LLMOps Database"
  ogDescription: "Anthropic operates a forward MCP proxy that connects its products to remote Model Context Protocol servers while injecting credentials, enforcing access control, and providing a controlled production boundary. At scale, the proxy addressed OAuth interoperability and refresh-token race conditions with Redis-based distributed locking, reduced redundant MCP traffic through session and server-level caching, and improved diagnosis through contextual error classification and structured per-request logging. The reported results include preventing concurrency-driven token invalidation, reducing avoidable upstream initialization and tool-list requests, and revealing that 92% of observed servers returned an unchanged tool list, although caching must be carefully invalidated when permissions or server state change."
notion:
  pageId: "3f4f8dff-2538-8093-a363-e2fa57222c6d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:48:00.000Z"
  lastEditedTime: "2026-10-09T08:48:00.000Z"
  publishedAt: "2026-10-11T09:46:03Z"
---

## Overview

Anthropic operates a forward Model Context Protocol (MCP) proxy used by Anthropic products to connect to remote MCP servers. The proxy is a production control plane between LLM-powered clients and external tools: it injects tokens, applies security and access-control behavior, manages authentication across many users and servers, and mediates the MCP protocol at scale. The central operational challenge is not model training or prompt design, but making tool connectivity reliable when authorization servers, MCP implementations, clients, and network conditions behave inconsistently.

The proxy’s main improvements were focused on three areas: keeping users connected through robust OAuth refresh handling, reducing wasteful upstream MCP requests with layered caching, and making server health diagnosable through contextual errors and structured logs. The implementation reportedly uses Redis for distributed refresh locking, refreshes tokens slightly before expiration, distinguishes recoverable from terminal failures, reuses MCP sessions and tool-list results, and records both upstream and proxy outcomes. These practices are directly relevant to LLMOps because tool calls are part of the runtime path of LLM applications: an authentication race, stale permission cache, or ambiguous protocol error can make an otherwise capable model appear unreliable.

## Production Problem and Proxy Role

The proxy is a forward proxy rather than merely a pass-through endpoint. Before Anthropic products contact a remote MCP server, the proxy can inject authorization tokens and apply security and role-based access control. It must support many clients using many remote servers, often with the same user and server connection shared across requests. This creates a multi-tenant systems problem: credentials, sessions, cached capabilities, and failures must be associated with the correct user, client, server, and permission context.

The MCP proxy also sits across several protocol layers. A request can fail at the network layer, through an HTTP status code, as a JSON-RPC error carried inside an HTTP 200 response, or as an MCP tool-result error indicated by an `isError` property. The same HTTP status can have different meanings depending on the protocol state. For example, a 401 may mean that a previously supplied access token is invalid, or that no token was supplied and the remote server is requesting authorization. A 404 can represent an MCP session termination in one context but an endpoint-not-found condition in another. Treating these outcomes as generic HTTP errors would make retry decisions and operational diagnosis unreliable.

## OAuth Interoperability and User Continuity

A major requirement is that users should not have to repeatedly authorize the same remote server. The proxy therefore relies on refresh tokens to obtain new access tokens after the original access token expires. In principle, refresh is straightforward; in production, OAuth providers differ in how they advertise and issue refresh credentials.

The proxy examines authorization-server metadata, including supported grant types, to determine whether refresh is available. Obtaining a refresh token during the initial authorization exchange may require provider-specific behavior. Some authorization servers require parameters in the authorization URL, OpenID Connect providers may require the `offline_access` scope, and providers such as Dropbox may use additional parameters outside the relevant standard. Client identity also varies. The MCP ecosystem can use pre-registered clients, dynamic client registration (DCR), or a client ID metadata document (referred to as a client metadata document or CIMD/SIMD approach in the presentation). The operational recommendation is to treat client metadata documents as the preferred modern approach for MCP authorization and retain DCR primarily for backward compatibility, because unbounded registrations create cleanup and staleness problems.

The broader lesson is that an LLM-oriented client cannot assume that “OAuth-compliant” means every provider behaves identically. A universal MCP client needs explicit handling for authorization-server metadata, provider quirks, client-registration modes, and endpoint overrides. The proxy acts as a compatibility layer that absorbs this variation rather than exposing every provider-specific detail to each Anthropic product.

## Concurrent Token Refresh

A particularly important failure mode occurs when multiple requests use an expired access token at the same time. If each request independently calls the token endpoint, the authorization server may issue multiple results, reject one request, or interpret the concurrent refreshes as suspicious token use and invalidate the credential altogether. The behavior is provider-dependent, so application-level serialization is needed even when the OAuth specification does not guarantee a consistent outcome.

The proxy addresses this with a Redis-backed distributed lock. The first request to detect expiration acquires an atomic lock, rereads the credential in case another process has already updated it, and performs the refresh. It then stores the new token. Other requests wait rather than independently refreshing. This prevents proxy-generated concurrency from invalidating a token and is especially important when the proxy is horizontally scaled across processes or machines.

The waiting behavior has several safeguards. The proxy refreshes slightly before expiry, described as approximately 5% of the token lifetime, while using sensible defaults because token lifetimes vary from hours to months. It uses separate timeout behavior for the refresh operation and for waiting requests. If a token is still valid, a short wait should not allow a slow refresh-related operation to block otherwise safe requests indefinitely. Waiters must also observe refresh failures, not merely check whether a new token exists. Otherwise, a failed refresh could cause every waiter to retry independently and recreate the original thundering-herd problem.

## Failure Classification and Retry Policy

Correct recovery depends on interpreting the authorization server’s response. Standard OAuth token errors, such as `invalid_grant` or `invalid_client`, can indicate different operational actions depending on the client-registration method. An invalid grant generally means that the token or authorization grant is no longer usable. An invalid client may indicate that a dynamically registered client has disappeared permanently, while a client metadata document or pre-registered client may be recoverable by correcting metadata or changing a client secret.

The implementation distinguishes these cases where possible. For compliant errors, the proxy can make a confident decision about whether to retry, repair metadata, or invalidate credentials. For HTTP 500 responses and nonstandard provider errors, it retries with backoff for a period of time and eventually considers the token invalid if recovery does not occur. This is necessarily conservative: retrying an unknown error may succeed, but it can also prolong an outage or repeat a request that the provider considers unsafe.

The reported production data indicated that only 74% of OAuth servers returned errors in the expected compliant form. The remaining responses included varied status codes, missing bodies, and error values that were valid in another OAuth context but not for the token endpoint. This limits the reliability of purely standards-based automation. Frequently used providers therefore require compatibility knowledge and targeted adaptations, while unknown providers need bounded retries and eventual failure. The case illustrates an important LLMOps tradeoff: a universal integration layer lowers client complexity, but its reliability depends on maintaining a growing set of interoperability rules and carefully bounded fallback behavior.

## Reducing Wasteful MCP Traffic

The initial transparent-proxy design caused unnecessary upstream traffic. Whenever a client needed to discover available tools, the proxy could repeat MCP initialization and notification exchanges, and it could create a new upstream session. With many clients and frequent tool discovery, this multiplied requests that did not provide new information and placed avoidable load on remote servers.

The proxy introduced caching at several levels. At the MCP-session level, an established session is associated with an internal identifier and reused, avoiding repeated initialization exchanges. Tool-list results are also cached, and special handling is applied for known broken servers so that they are not repeatedly spammed with requests. These changes reduce protocol overhead and can improve latency for model-driven tool use, where a single user interaction may trigger multiple capability or tool calls.

Initially, caching was scoped at the user level. That avoided some requests for one user but still duplicated identical results across many users. Analysis of logs found that 92% of observed servers always returned the same tool list. This supported broader server-level caching for results that are genuinely public and invariant. Newer MCP specification behavior allows a list response to identify its cache scope, such as private or public, which gives the proxy a protocol-level basis for choosing between session/user caching and server-wide caching.

The 92% figure is an observation rather than a guarantee that every server is safe to cache globally. Tool availability can depend on identity, role, tenant, session state, or dynamic server configuration. The proxy must honor declared cache scope and connect caching to authorization state. If RBAC changes and a user loses access, an old public or user-level result must not continue to expose or route to a tool that is no longer permitted. Cache invalidation is therefore part of the security model, not only a performance optimization. Discovery metadata and authorization endpoint lookups should also be cached because discovery itself can require multiple upstream requests.

## Contextual Observability and Server Health

Generic error logs do not provide enough information to operate a proxy spanning MCP, HTTP, JSON-RPC, OAuth, and external server implementations. Anthropic’s approach uses custom error classes and contextual error codes or fault domains instead of treating every failure as a generic HTTP exception. Each request produces a structured log associated with the relevant server URL, with fields describing the outcome, error classification, fault domain, upstream result, and result returned by the proxy.

Recording both sides of the boundary is valuable. It distinguishes a failure produced by the remote server from one introduced by the proxy, and it allows operators to see whether the proxy translated or masked the original error. Context also makes status codes actionable: a 401 after a token was sent can be classified as token invalidation, while a 401 before credentials were supplied can be classified as an authorization challenge. Similar distinctions apply to session termination, endpoint discovery, tool execution, and JSON-RPC errors.

The design treats server health as a first-class operational concern. A useful health view should expose the different failure domains rather than reduce a server to a single up/down value. The same structured data could support provider troubleshooting and, if safely exposed, give remote MCP server developers visibility into how their services behave through the proxy. This is operationally significant for LLM applications because tool failures are part of the user-visible quality of an agent system, even when the underlying language model is functioning normally.

## Architecture Considerations and Tradeoffs

A proxy built today would need to account for OAuth refresh behavior, distributed locking, provider-specific authorization quirks, layered caching, contextual structured logging, and server-health reporting from the beginning. It should also support authorization metadata and endpoint overrides rather than assuming that every server follows the MCP discovery recommendation. Some servers use their own metadata or endpoint conventions, and discovery can itself generate a burst of requests unless its results are cached.

The architecture improves reliability and efficiency, but it adds state and policy complexity. Redis locks introduce an external dependency and require carefully defined lock expiration and failure behavior. Aggressive caching reduces upstream load but creates correctness and authorization risks when tools or permissions change. Retrying malformed or ambiguous OAuth errors can improve recovery for some providers while increasing latency or repeating requests for others. Server-level cache reuse is efficient only when the protocol’s cache scope and access-control semantics justify it.

Overall, this is a production-hardening case for LLM tool connectivity rather than a model-quality benchmark. The reported percentages and observed improvements demonstrate why MCP proxies need standard-aware compatibility logic, concurrency control, cache governance, and detailed observability. They do not establish universal behavior for all MCP or OAuth servers, but they provide practical evidence that these controls are necessary when LLM products depend on remote tools at scale.
