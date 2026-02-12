/**
 * ROI Calculator formulas — ported 1:1 from the Webflow site's inlined JS.
 *
 * Pure functions with no DOM dependencies, so they can be shared between
 * the Preact island and any future server-side usage.
 */

export interface RoiInputs {
  /** Number of ML models in production (0–500) */
  models: number;
  /** ML team size: engineers + scientists (1–100) */
  teamSize: number;
  /** Current monthly cloud spend in USD (200–100,000) */
  cloudSpendMonthly: number;
}

export interface RoiOutputs {
  /** Monthly ZenML platform cost (snapped to pricing tiers) */
  zenmlCostMonthly: number;
  /** Monthly infrastructure savings via optimization */
  infraOptimizationMonthly: number;
  /** Monthly engineering hours saved */
  productivityHoursMonthly: number;
  /** Monthly model performance impact in USD */
  performanceImpactMonthly: number;
  /** Return on investment as a percentage */
  roiPercent: number;
}

/** Assumed hourly rate for ML engineer productivity savings */
const AVG_HOURLY_RATE = 150;

/**
 * Calculate monthly ZenML platform cost based on team size and model count.
 * Uses power-function scaling with tier snapping.
 */
export function calculateZenMLCost(teamSize: number, numModels: number): number {
  // Smallest teams get the starter tier
  if (teamSize <= 2 && numModels <= 3) return 99;

  const baseTeamCost = Math.pow(teamSize, 1.2) * 50;
  const baseModelCost = Math.pow(numModels, 1.1) * 30;
  const totalCost = baseTeamCost + baseModelCost;

  // Snap to pricing tiers
  if (totalCost < 99) return 99;
  if (totalCost < 499) return 499;
  if (totalCost < 999) return 999;
  if (totalCost < 2499) return 2499;

  // Round to nearest 500, cap at 100k
  return Math.min(100_000, Math.round(totalCost / 500) * 500);
}

/**
 * Calculate full ROI outputs from slider inputs.
 * Formulas match the Webflow production calculator exactly.
 */
export function calculateRoi(inputs: RoiInputs): RoiOutputs {
  const { models, teamSize, cloudSpendMonthly } = inputs;

  const zenmlCostMonthly = calculateZenMLCost(teamSize, models);

  // Infrastructure optimization: 15% base + up to 10% scale bonus
  const baseOptimization = 0.15;
  const scaleBonus = Math.min(0.1, (cloudSpendMonthly / 100_000) * 0.05);
  const infraOptimizationMonthly = Math.round(
    cloudSpendMonthly * (baseOptimization + scaleBonus),
  );

  // Team productivity: hours saved per engineer scales with team size
  const hoursPerEngineerBase = 12;
  const hoursPerEngineerMax = 20;
  const efficiencyFactor = Math.min(1, teamSize / 20);
  const productivityHoursMonthly = Math.round(
    teamSize *
      (hoursPerEngineerBase +
        (hoursPerEngineerMax - hoursPerEngineerBase) * efficiencyFactor),
  );

  // Model performance impact: value per model with diminishing returns
  const baseValuePerModel = 1500;
  const scaleFactor = Math.max(
    0.5,
    1 - Math.log10(models || 1) / Math.log10(1000),
  );
  const performanceImpactMonthly = Math.round(
    models *
      baseValuePerModel *
      scaleFactor *
      Math.min(1.5, 1 + teamSize / 50),
  );

  // ROI: annual benefits vs annual cost
  const monthlyBenefits =
    infraOptimizationMonthly +
    productivityHoursMonthly * AVG_HOURLY_RATE +
    performanceImpactMonthly;

  const annualBenefits = monthlyBenefits * 12;
  const annualCost = zenmlCostMonthly * 12;
  const roiPercent = Math.round(
    ((annualBenefits - annualCost) / annualCost) * 100,
  );

  return {
    zenmlCostMonthly,
    infraOptimizationMonthly,
    productivityHoursMonthly,
    performanceImpactMonthly,
    roiPercent,
  };
}
