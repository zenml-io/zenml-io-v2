/**
 * The case studies behind the homepage hero's eval plan, picked at build
 * time from the LLMOps and MLOps databases (heroJobProof.ts). The HeroJob
 * island fetches this once a visitor starts, so the homepage never carries
 * the databases.
 */
import type { APIRoute } from "astro";
import { loadHeroJobCasePool } from "../lib/heroJobEntries";

export const prerender = true;

export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await loadHeroJobCasePool()), {
    headers: { "Content-Type": "application/json" },
  });
