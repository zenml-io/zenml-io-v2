// Legacy Ray Summit MLOps slugs that briefly existed during migration.
// Keep this map in sync with the flat Cloudflare rules in public/_redirects.
// Cloudflare cannot import this TypeScript file, but Astro routes and sitemap
// filtering should derive from this single source of truth.
export const STALE_RAY_SUMMIT_REDIRECTS = {
  "ray-summit-talks-that-are-explicitly-internal-ml-platform-oriented-2025-an-overview-of-cloudkitchenss-ray-powered-ml-pla":
    "cloudkitchens-ray-powered-ml-platform-ray-based-ml-platform-modernization-with-unified-compute-layer-and-ray-control-pla",
  "ray-summit-talks-that-are-explicitly-internal-ml-platform-oriented-2025-apples-approach-to-building-scalable-ml-infrastr":
    "apple-approach-to-building-scalable-ml-infrastructure-on-ray-essa-unified-ml-framework-on-ray-for-infrastructure-agnosti",
  "ray-summit-talks-that-are-explicitly-internal-ml-platform-oriented-2025-coinbases-ml-training-evolution-from-sagemaker-t":
    "coinbase-ml-training-evolution-from-sagemaker-to-ray-migrating-ml-training-from-sagemaker-to-ray-on-kubernetes-for-faste",
  "ray-summit-talks-that-are-explicitly-internal-ml-platform-oriented-2025-distributed-ml-training-with-kuberay-at-robinhoo":
    "robinhood-distributed-ml-training-with-kuberay-ray-and-kuberay-distributed-ml-training-on-ephemeral-kubernetes-clusters",
  "ray-summit-talks-that-are-explicitly-internal-ml-platform-oriented-2025-distributed-model-training-with-ray-at-capital-o":
    "capital-one-distributed-model-training-with-ray-ray-on-kubernetes-distributed-multi-node-multi-gpu-xgboost-training-for",
  "ray-summit-talks-that-are-explicitly-internal-ml-platform-oriented-2025-exploring-hinges-ml-platform-evolution-with-ray":
    "hinge-ml-platform-evolution-with-ray-ray-on-kubernetes-ml-platform-migration-with-argo-cd-automated-builds-and-prometheu",
  "ray-summit-talks-that-are-explicitly-internal-ml-platform-oriented-2025-netflixs-ray-platform-from-deep-learning-to-gena":
    "netflix-ray-platform-from-deep-learning-to-genai-ray-based-ml-training-and-genai-pipelines-for-large-scale-personalizati",
  "ray-summit-talks-that-are-explicitly-internal-ml-platform-oriented-2025-panel-ml-platform-on-ray-ray-summit-2024":
    "ray-summit-ml-platform-on-ray-panel-on-adopting-ray-for-ml-platforms-replacing-spark-scaling-deep-learning-and-integrati",
  "ray-summit-talks-that-are-explicitly-internal-ml-platform-oriented-2025-raylab-autodesks-internal-platform-for-scalable":
    "autodesk-raylab-raylab-internal-ml-platform-abstracting-ray-on-kubernetes-for-scalable-distributed-training-data-process",
  "ray-summit-talks-that-are-explicitly-internal-ml-platform-oriented-2025-reddits-ml-evolution-scaling-with-ray-and-kubera":
    "reddit-ml-evolution-scaling-with-ray-and-kuberay-migrating-ml-platform-orchestration-from-kubeflow-to-ray-and-kuberay-fo",
  "ray-summit-talks-that-are-explicitly-internal-ml-platform-oriented-2025-spotify-harnesses-ray-for-next-gen-ai-infrastruc":
    "spotify-next-gen-ai-infrastructure-multi-cluster-ray-scaling-for-generative-ai-on-kubernetes-queue-based-gang-gpu-schedu",
} as const;

export const STALE_RAY_SUMMIT_REDIRECT_PATHS = Object.keys(
  STALE_RAY_SUMMIT_REDIRECTS,
).map((slug) => `/mlops-database/${slug}`);
