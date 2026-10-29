import type { ModelMark } from "../labs-home";

/** A model's mark from its name and weights: a brand icon where one exists, else the open-weights glyph. */
export function modelMark(
  name: string,
  weights: string,
): ModelMark | undefined {
  if (/^claude/i.test(name)) return "anthropic";
  if (/^gpt/i.test(name)) return "openai";
  if (/^deepseek/i.test(name)) return "deepseek";
  if (/^qwen/i.test(name)) return "qwen";
  if (/^glm/i.test(name)) return "zai";
  return weights === "open" ? "open" : undefined;
}
