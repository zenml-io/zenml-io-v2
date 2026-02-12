/**
 * ROI Calculator — interactive Preact island with three sliders and a results panel.
 * Ported from the Webflow site's embedded calculator widget.
 */
import { useState, useCallback } from "preact/hooks";
import { calculateRoi, type RoiOutputs } from "../../lib/roiCalculator";

// ── Slider config ──────────────────────────────────────────────────

interface SliderConfig {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  format: (v: number) => string;
  minLabel: string;
  maxLabel: string;
}

const SLIDERS: SliderConfig[] = [
  {
    id: "models",
    label: "Number of ML models in production",
    min: 0,
    max: 500,
    step: 10,
    defaultValue: 60,
    format: (v) => String(v),
    minLabel: "1",
    maxLabel: "500",
  },
  {
    id: "team",
    label: "ML team size (engineers + scientists)",
    min: 1,
    max: 100,
    step: 1,
    defaultValue: 8,
    format: (v) => String(v),
    minLabel: "1",
    maxLabel: "100",
  },
  {
    id: "spend",
    label: "Current cloud spend /month",
    min: 200,
    max: 100000,
    step: 100,
    defaultValue: 25000,
    format: (v) => `$${v.toLocaleString()}`,
    minLabel: "$200",
    maxLabel: "$100,000",
  },
];

// ── Component ──────────────────────────────────────────────────────

export default function RoiCalculator() {
  const [values, setValues] = useState({
    models: 60,
    team: 8,
    spend: 25000,
  });

  const results: RoiOutputs = calculateRoi({
    models: values.models,
    teamSize: values.team,
    cloudSpendMonthly: values.spend,
  });

  const handleChange = useCallback(
    (id: string, val: number) => {
      setValues((prev) => ({ ...prev, [id]: val }));
    },
    [],
  );

  return (
    <div style={styles.container}>
      {/* Left: Inputs */}
      <div style={styles.inputs}>
        {SLIDERS.map((s) => (
          <SliderInput
            key={s.id}
            config={s}
            value={values[s.id as keyof typeof values]}
            onChange={(val) => handleChange(s.id, val)}
          />
        ))}
      </div>

      {/* Right: Results */}
      <div style={styles.results}>
        <h2 style={styles.resultsTitle}>Your results</h2>

        <div>
          <ResultRow
            label="Infrastructure Optimization"
            value={`$${results.infraOptimizationMonthly.toLocaleString()}`}
          />
          <ResultRow
            label="Team Productivity"
            value={`${results.productivityHoursMonthly} hours`}
          />
          <ResultRow
            label="Model Performance Impact"
            value={`$${results.performanceImpactMonthly.toLocaleString()}`}
          />
          <ResultRow
            label="Monthly ZenML Cost"
            value={`$${results.zenmlCostMonthly.toLocaleString()}`}
            isLast
          />
        </div>

        <div style={styles.roiBox}>
          <div style={styles.roiRow}>
            <span>Return on Investment (ROI)</span>
            <span style={styles.roiValue}>{results.roiPercent}%</span>
          </div>
        </div>

        <p style={styles.disclaimer}>
          Disclaimer: This is a rough estimate based on industry averages and is
          not an actual quote. Please contact our sales team for accurate
          pricing.
        </p>
      </div>
    </div>
  );
}

// ── SliderInput ────────────────────────────────────────────────────

interface SliderInputProps {
  config: SliderConfig;
  value: number;
  onChange: (val: number) => void;
}

function SliderInput({ config, value, onChange }: SliderInputProps) {
  const pct =
    ((value - config.min) / (config.max - config.min)) * 100;

  return (
    <div style={styles.inputGroup}>
      <div style={styles.inputLabel}>{config.label}</div>
      <div style={styles.sliderContainer}>
        <div style={{ ...styles.tooltip, left: `${pct}%` }}>
          {config.format(value)}
        </div>
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onInput={(e) =>
            onChange(parseInt((e.target as HTMLInputElement).value))
          }
          style={{
            ...styles.slider,
            background: `linear-gradient(to right, #7A3EF4 ${pct}%, #E5E7EB ${pct}%)`,
          }}
        />
        <div style={styles.sliderLabels}>
          <span>{config.minLabel}</span>
          <span>{config.maxLabel}</span>
        </div>
      </div>
    </div>
  );
}

// ── ResultRow ──────────────────────────────────────────────────────

interface ResultRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

function ResultRow({ label, value, isLast }: ResultRowProps) {
  return (
    <div
      style={{
        ...styles.breakdownRow,
        ...(isLast ? { borderBottom: "none" } : {}),
      }}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────

const styles: Record<string, preact.JSX.CSSProperties> = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    display: "flex",
    flexDirection: "row",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    flexWrap: "wrap",
  },
  inputs: {
    width: "50%",
    minWidth: "300px",
    padding: "2rem",
    display: "flex",
    gap: "24px",
    flexDirection: "column",
    justifyContent: "space-evenly",
    flex: "1 1 300px",
  },
  results: {
    borderLeft: "1px solid #E5E7EB",
    backgroundColor: "#F9FAFB",
    padding: "2rem",
    borderRadius: "0 8px 8px 0",
    width: "50%",
    minWidth: "300px",
    flex: "1 1 300px",
  },
  resultsTitle: {
    marginBottom: "24px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  inputGroup: {},
  inputLabel: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  sliderContainer: {
    position: "relative",
    paddingTop: "32px",
    marginTop: "8px",
  },
  tooltip: {
    position: "absolute",
    top: "0",
    transform: "translateX(-50%)",
    background: "#F3F4F6",
    color: "#111827",
    padding: "4px 12px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    pointerEvents: "none",
    whiteSpace: "nowrap",
  },
  slider: {
    width: "100%",
    height: "4px",
    borderRadius: "2px",
    outline: "none",
    WebkitAppearance: "none",
    appearance: "none",
    cursor: "pointer",
  },
  sliderLabels: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
    color: "#6B7280",
    fontSize: "12px",
  },
  breakdownRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #E5E7EB",
  },
  roiBox: {
    borderRadius: "8px",
    border: "1px solid #22c55e",
    padding: "1.5rem",
    marginTop: "1.5rem",
    background: "#fff",
  },
  roiRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roiValue: {
    fontWeight: "600",
    fontSize: "20px",
    color: "#22c55e",
  },
  disclaimer: {
    marginTop: "16px",
    fontSize: "12px",
    color: "#6B7280",
    textAlign: "center",
  },
};
