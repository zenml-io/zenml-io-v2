# ServiceLogo component keys (Hashi library, file IZhfgAOIPjDObsCtpFKhRY)

Recorded 2026-08-27 (build plan) and 2026-09-07 (read live off instance 232:3744). Keys are stable across republishes.

| slug | key |
|---|---|
| argo-workflows | d719d5be59d2300eff176fc1f91d015a1467af48 |
| arize | 0d991893fa9fbcff47ad85280572121ab803c285 |
| cadence | 113bd1dc0f38d480fbe798480490221f23a24948 |
| camunda | 3e1eeedd1aea95b0e6bd045a50d90223c3b85aa0 |
| cloudflare-workflows | 87b22226b372fa5b0fd3537167bc8ff1e09537e3 |
| confident-ai | aa957237fe3e1ef6e0ec2071a2467a8b2dfb8481 |
| dagster | 4c3ffc650146724023863c0c1c4cdedbaaf14a6e |
| dataiku | 51c7d3d5fd79e2624994ebd7a78ec43869923dde |
| dbos | a625a7b3d362412225ac0cb7e74bd465ee6e157d |
| flyte | 7999b98d1d571661f92c4ca86e0c2b8dde1f4fd3 |
| google-adk | b2a8f773e20b8df82c004f0cee542b57d0c5b2c0 |
| hatchet | 1cb7fd4dab26c53363aa840f4c194bec98eede48 |
| inngest | 83be363bf939528b5da394879187b455b855b82d |
| kai-scheduler | 7e021ad94a0cc9cfdf1dd5df33348c2fe8110847 |
| kestra | 2272dd728cc71e25136655aff3bfffc6b10d6a5a |
| langfuse | 92d503ecaefd42cf49fee1a2871cc4be5a627430 |
| langgraph | d159b86dabd9a4547c785586507b6e23f2a95b4b |
| langsmith | 1b6f73dd8237e0c13b0cf1a52f394757aac9ad58 |
| mage-ai | d8833f0c33856426fc08f25432a9188b0a4c1b0d |
| metaflow | b5d08505b082207d566c89e8491be69441d95fe9 |
| microsoft-agent-framework | 5546bdf0e6f2fc92ab3936466edcca52058c0f92 |
| mlflow | 21124d1faea494c6da660c7233e02a80c4cb0947 |
| opik | 704b8c737c515f62213636f73981e0f4c48556b7 |
| prefect | 7e06c7480df1f80ea7072710acba7f16a005d475 |
| restate | c7fcc9cad0bf0f5c5b08625845427065a6d227c5 |
| semantic-kernel | 4027ec18cf1946f5406c87b9299da08f045dc71a |
| temporal | 94b33dbc558a539bcb3d9863260b3bacf3159d93 |
| tracely | 9aa7e70d2512d3001ff4ab6992fd1852eeb3b1d5 |
| trigger-dev | 38d2caa093037f450ae5f54a2def2e189663691d |
| wandb | 9926be6bb376c92dea2a7c268b767dd2fbadd79b |

OpenAI Agents SDK uses `ServiceLogo/openai` (the SDK has no mark of its own). Google ADK is `google-adk`. Arize Phoenix is `arize`; W&B Weave is `wandb`; Confident AI / DeepEval has both `confident-ai` and `deepeval`.

Key discovery for a slug not in this table: `search_design_system({fileKey, queries:[{entity:'component', query:'ServiceLogo/<slug>'}]})` — one query per call (the server clamps batches to 1); accept ONLY the hit whose `name === 'ServiceLogo/<slug>'` AND `libraryName === 'Hashi Design System'`; every other hit is fuzzy noise, including marks from the legacy 'ZenML Design System' library. Verified 2026-09-07 on all seven Braintrust-alternatives marks. Hashi inventory (names only): get_metadata(IZhfgAOIPjDObsCtpFKhRY, 731:2).

## Aliases

A `--comparison` slug is sometimes a product/package name that doesn't have (and shouldn't get)
its own `ServiceLogo/*` mark, because the mark belongs to the parent brand. `find-slot.ts` resolves
an alias to its canonical slug **before** looking up a key in the table above — add a row here
instead of minting a new mark or a duplicate row whenever a competitor slug is really the same
brand as an existing one.

| alias | canonical slug | why |
|---|---|---|
| pydantic-ai | pydantic | Pydantic AI ships under the Pydantic brand mark |
| smolagents | huggingface | Hugging Face Smolagents — no mark of its own |
| arize-phoenix | arize | Phoenix is Arize's OSS project, same mark |
| weave | wandb | W&B Weave — same mark as Weights & Biases |
| opik | opik | Comet Opik — canonical slug is already `opik`, do not re-map to `comet` or `comet-opik` |
| openai-agents-sdk | openai | the SDK has no mark of its own (see prose above) |
| deepeval | confident-ai | Confident AI / DeepEval — same mark as `confident-ai` |
| google-adk | google-adk | canonical slug is already `google-adk`, do not re-map to `google` |

**Ruling: `semantic-kernel` is deliberately NOT aliased to `microsoft`.** It has its own official
mark (`ServiceLogo/semantic-kernel`, added 2026-09-07 via this skill's add-mark sub-flow) —
Microsoft ownership is not itself a reason to alias a product to the parent brand's mark; check for
a product-specific mark first (as with `google-adk` and `opik` above) and only fall back to the
parent brand when the product genuinely has none of its own (as with `weave`/`wandb` and
`smolagents`/`huggingface`).
