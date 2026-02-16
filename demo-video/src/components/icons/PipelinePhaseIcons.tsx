import React from 'react';

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const defaults = { size: 40, color: '#a78bfa', strokeWidth: 2 };

/** Phase 1: Export — download/API arrow */
const ExportIcon: React.FC<IconProps> = ({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

/** Phase 2: Transform — arrows converting */
const TransformIcon: React.FC<IconProps> = ({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </svg>
);

/** Phase 3: Schema — shield/check validation */
const SchemaIcon: React.FC<IconProps> = ({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

/** Phase 4: Build — hammer/wrench construction */
const BuildIcon: React.FC<IconProps> = ({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M12 12h.01" />
    <path d="M17 12h.01" />
    <path d="M7 12h.01" />
    <path d="M2 10h20" />
  </svg>
);

/** Phase 5: Verify — magnifying glass with check */
const VerifyIcon: React.FC<IconProps> = ({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <polyline points="8 11 10 13 14 9" />
  </svg>
);

/** Phase 6: Go Beyond — rocket launch */
const BeyondIcon: React.FC<IconProps> = ({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

export const PIPELINE_PHASE_ICONS: Record<number, React.FC<IconProps>> = {
  1: ExportIcon,
  2: TransformIcon,
  3: SchemaIcon,
  4: BuildIcon,
  5: VerifyIcon,
  6: BeyondIcon,
};
