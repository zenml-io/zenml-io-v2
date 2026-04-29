---
title: "Streamlining MCP Authentication with Cross-App Access (XAA)"
slug: "streamlining-mcp-authentication-with-cross-app-access-xaa"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "regulatory-compliance"
  - "agent-based"
  - "mcp"
  - "security"
  - "documentation"
  - "compliance"
  - "anthropic"
  - "openai"
  - "microsoft-azure"
  - "cloudflare"
industryTags: "tech"
company: "WorkOS"
summary: "WorkOS addresses the authentication friction in Model Context Protocol (MCP) deployments where users face repetitive OAuth consent screens for every MCP server connection and IT teams lack visibility into AI agent access. The solution implements Cross-App Access (XAA) using the ID JAG (Identity JWT Authorization Grant) standard, enabling MCP clients like Claude and Cursor to automatically authenticate with MCP servers through a single sign-on flow via identity providers like Okta. This eliminates manual consent screens, provides IT teams with centralized access control, enables rapid credential revocation, and maintains a stronger security posture with short-lived access tokens that expire and refresh automatically without user intervention."
link: "https://www.youtube.com/watch?v=EmhRyw6xeT0"
year: 2026
seo:
  title: "WorkOS: Streamlining MCP Authentication with Cross-App Access (XAA) - ZenML LLMOps Database"
  description: "WorkOS addresses the authentication friction in Model Context Protocol (MCP) deployments where users face repetitive OAuth consent screens for every MCP server connection and IT teams lack visibility into AI agent access. The solution implements Cross-App Access (XAA) using the ID JAG (Identity JWT Authorization Grant) standard, enabling MCP clients like Claude and Cursor to automatically authenticate with MCP servers through a single sign-on flow via identity providers like Okta. This eliminates manual consent screens, provides IT teams with centralized access control, enables rapid credential revocation, and maintains a stronger security posture with short-lived access tokens that expire and refresh automatically without user intervention."
  canonical: "https://www.zenml.io/llmops-database/streamlining-mcp-authentication-with-cross-app-access-xaa"
  ogTitle: "WorkOS: Streamlining MCP Authentication with Cross-App Access (XAA) - ZenML LLMOps Database"
  ogDescription: "WorkOS addresses the authentication friction in Model Context Protocol (MCP) deployments where users face repetitive OAuth consent screens for every MCP server connection and IT teams lack visibility into AI agent access. The solution implements Cross-App Access (XAA) using the ID JAG (Identity JWT Authorization Grant) standard, enabling MCP clients like Claude and Cursor to automatically authenticate with MCP servers through a single sign-on flow via identity providers like Okta. This eliminates manual consent screens, provides IT teams with centralized access control, enables rapid credential revocation, and maintains a stronger security posture with short-lived access tokens that expire and refresh automatically without user intervention."
notion:
  pageId: "351f8dff-2538-80f2-aae2-ff9cddde77fe"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-29T07:00:00.000Z"
  lastEditedTime: "2026-04-29T07:00:00.000Z"
  publishedAt: "2026-04-29T14:05:30Z"
---

## Overview

WorkOS presented a solution to a critical LLMOps challenge in enterprise deployments of AI agents using the Model Context Protocol (MCP). The company, which provides authentication infrastructure for enterprise applications including Anthropic, Cursor, and OpenAI, identified significant operational and security pain points in how MCP handles authentication at scale. The presenter, Garrett Galo who runs product at WorkOS, outlined how traditional OAuth-based authentication in MCP creates both user friction and enterprise security gaps that become especially problematic when deploying LLM-powered agents across development teams.

The core problem stems from MCP's reliance on OAuth as its authentication layer, which was originally designed for scenarios where applications don't inherently trust each other. In the MCP context, this means every connection between an MCP client (like Claude Desktop or Cursor) and an MCP server (like Figma, Notion, or other integrated services) requires users to go through a separate consent screen. For individual developers using half a dozen to a dozen MCP servers, and when multiplied across entire engineering teams, this creates substantial friction with dozens of people repeatedly managing consent screens without understanding why the repeated authentication is necessary.

## Enterprise Security and IT Visibility Challenges

Beyond user experience issues, the presentation emphasized more serious enterprise concerns around visibility and security. IT teams face several fundamental challenges with standard MCP authentication approaches. They cannot easily determine which MCP servers employees are using since connections don't necessarily flow through the corporate identity provider. They lack control over which AI agents employees can access, as users can theoretically connect arbitrary MCP clients (including potentially unapproved tools like DeepSeek) to sensitive corporate systems. When security incidents occur, IT teams cannot effectively revoke access to MCP-connected services.

The presenter shared a real-world security incident involving the compromised NPM Axios package that occurred approximately a week before the talk. When his machine was compromised, the IT team could detect the compromise, cut network access, and invalidate Okta sessions across all applications. However, locally configured MCP servers with API keys remained a security risk that required manual investigation and remediation. The presenter had to manually audit which services he had connected to and determine which credentials might have been leaked and needed revocation. This highlighted a critical gap in enterprise security posture when using standard MCP authentication patterns.

The OAuth-based approach also creates persistent access problems. When employees leave companies or have their access revoked, they may retain active access tokens and refresh tokens to MCP-connected services for days, weeks, or even months. Many companies don't implement SCIM (System for Cross-domain Identity Management) which would enable proper access revocation, leaving a security gap where former employees maintain access to corporate resources through MCP connections.

## The Cross-App Access (XAA) Solution

WorkOS developed a solution called Cross-App Access (XAA) that leverages the ID JAG (Identity JWT Authorization Grant) standard to solve these problems. The fundamental insight is that in enterprise environments, both the MCP client (like Cursor) and MCP server (like Figma) already have trust relationships with the corporate identity provider (like Okta). Both applications know about the organization and know about the user who has authenticated to them. XAA bridges the gap between the client and server applications by providing a mechanism for them to leverage their shared trust in the IDP without requiring repeated user consent.

The technical implementation involves a four-step flow. First, the user performs a standard SSO login to the identity provider (Okta in the demonstration), which issues an ID token and refresh token to the client. This is a one-time action that might occur daily or weekly depending on corporate policies. Second, the MCP client automatically requests an ID JAG token from the IDP using the refresh token, specifying which resource (MCP server) it wants to access. The IDP validates that the client is authorized to request access to the specified server and that the user has access to both applications, then issues the ID JAG token. Third, the client sends the ID JAG token to the MCP server's authorization endpoint, which validates the token with the IDP and issues a standard OAuth access token back to the client. Fourth, the client uses this access token in standard MCP OAuth flows to communicate with the MCP server.

The critical operational advantage is that steps two and three occur automatically without any user interaction. Once the user has authenticated to the IDP, all subsequent MCP server connections happen behind the scenes. The live demonstration showed this clearly: logging into Claude Desktop via Okta once, and then immediately seeing the Figma MCP server automatically connected without any consent screens or additional authentication prompts.

## Security and Operational Benefits

The XAA approach provides several security improvements over standard OAuth flows. Access tokens can be very short-lived, typically around five minutes in most implementations. When these tokens expire, the client can automatically obtain new ID JAG tokens and exchange them for fresh access tokens, provided the user's SSO session remains active. This means if IT revokes a user's access or locks their session in the IDP, within five minutes the user will lose access to all MCP servers automatically. This is a substantial improvement over persistent refresh tokens that might remain valid for extended periods.

From an IT administration perspective, XAA simplifies access management through the existing IDP infrastructure. In systems like Okta, administrators use a managed connections portal to define which applications can request access to which other applications. For example, administrators can configure that Cursor is allowed to request access to Figma. When Cursor makes an ID JAG token request specifying Figma as the audience, Okta validates this policy and issues the token accordingly. This gives IT teams centralized visibility and control over which AI agents and tools can access which corporate resources, all through the same IDP interface they already use for other access management.

## Implementation Requirements

For MCP clients implementing XAA support, several technical requirements must be met. The client needs an SSO connection that is XAA-compatible, which is relatively standard for applications supporting SSO but requires the IDP to support XAA specifically. The client must implement the ability to request ID JAG tokens from the identity provider, then exchange those tokens with MCP servers for access tokens. WorkOS provides these capabilities as a service for their customers, which is how Cursor and Anthropic have implemented XAA support in their products.

For MCP server implementations, support requires announcing support for the JWT bearer grant type, accepting ID JAG tokens from clients, validating these tokens by verifying the signed JWT with the issuing identity provider (similar to standard JWT validation flows), and issuing standard OAuth access tokens upon successful validation. The presenter emphasized that the access tokens issued are standard OAuth tokens, so the rest of the MCP flow remains unchanged.

## Current Ecosystem Adoption and Limitations

The presentation acknowledged several important limitations and ecosystem maturity issues. At the time of the talk, Okta supports XAA for OIDC-based connections, with planned support for SAML-based connections. Microsoft Entra (formerly Azure Active Directory) does not yet support XAA, though WorkOS is working with Microsoft to add this capability. The presenter encouraged attendees with Microsoft connections to advocate for XAA support. This represents a significant limitation since many enterprises use Microsoft Entra as their identity provider.

During the Q&A session, several implementation challenges emerged. One attendee raised concerns about protocol fragmentation with Microsoft integrations, specifically around how different clients (Claude Desktop, VS Code, Wake Lock Desktop) handle the resource parameter differently when communicating with Entra during SSO flows. The RFC 9728 discovery process requires that resource and scope parameters match, but different clients implement this inconsistently, requiring proxy servers to detect which client is connecting and adjust headers accordingly before forwarding requests.

Another limitation discussed is that XAA primarily addresses authentication rather than authorization. By default, users get the same permissions in the MCP server that they would have when logging in directly. The system doesn't currently provide mechanisms for defining scoped access or more granular permissions beyond the binary question of whether cross-app access should be granted. The presenter noted that extending XAA to support scope restrictions is being considered but is not currently part of the specification.

The ecosystem also faces broader standards adoption challenges. While most MCP clients and servers support Dynamic Client Registration (DCR), not all implementations do, and servers without DCR support require pre-registration of clients. A newer standard called Client Metadata (superseding DCR) has even less ecosystem support, having only emerged about three months prior to the talk. These standards gaps create interoperability challenges that the ecosystem is still working through.

## LLMOps Production Implications

From an LLMOps perspective, this case study illustrates several critical considerations for production AI deployments in enterprise environments. The authentication and access control challenges described are not merely inconveniences but represent fundamental operational and security concerns that must be addressed for enterprise LLM adoption. The friction of repeated consent screens can significantly slow developer productivity when multiplied across teams, while the lack of IT visibility and control creates unacceptable security risks for organizations with compliance requirements.

The solution demonstrates the importance of enterprise-grade identity and access management integration for LLM-powered tools. Simply bolting OAuth onto MCP servers creates a poor user experience and leaves security gaps, while properly integrating with enterprise identity providers through standards like XAA provides both better UX and stronger security posture. The ability to rapidly revoke access through IDP session invalidation and short-lived tokens is particularly important for incident response scenarios, which the presenter's personal experience with the Axios compromise illustrated concretely.

However, the case study also reveals the challenges of emerging standards adoption in the rapidly evolving LLMOps space. XAA is based on relatively new specifications, and major identity providers like Microsoft Entra have not yet implemented support. Protocol fragmentation between different clients and servers remains a practical challenge. Organizations implementing production LLM systems must weigh the benefits of cutting-edge authentication approaches against the maturity and broad support of existing standards.

The presentation emphasizes that successful LLMOps requires considering the full lifecycle of AI agent deployment, including not just the technical capabilities of LLMs but also the operational infrastructure around authentication, authorization, access management, security monitoring, and incident response. Tools like Claude Desktop and Cursor are powerful AI development environments, but their enterprise viability depends on solving these operational challenges in ways that integrate with existing enterprise IT infrastructure and security practices. WorkOS's approach represents one path forward, though it requires coordination between identity providers, MCP clients, MCP servers, and enterprise IT teams to achieve broad adoption.
