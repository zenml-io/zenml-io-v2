import React from 'react';
import { Img, staticFile, interpolate, useCurrentFrame } from 'remotion';
import { fonts, palette } from '../brand';
import { Glyph, type GlyphName } from './Glyph';
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const enter = (f: number, at: number) => {
  const t = interpolate(f, [at, at + 25], [0, 1], clamp);
  return 1 - Math.pow(1 - t, 3);
};
const steps: { text: string; icon: GlyphName; x: number; at: number }[] = [
  { text: 'Your code', icon: 'code', x: 112, at: 130 },
  { text: 'ZenML', icon: 'pipeline', x: 730, at: 165 },
  { text: 'Your infrastructure', icon: 'server', x: 1340, at: 200 },
];
export function HookWorkflow() {
  const f = useCurrentFrame();
  const run = interpolate(f, [225, 280], [0, 1], clamp);
  return <>
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
      {[{ from: 560, to: 730, at: 157 }, { from: 1178, to: 1340, at: 192 }].map(link => <path key={link.from} d={`M${link.from} 773 H${link.to}`} fill="none" stroke={palette.sage} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1-enter(f,link.at)}/>)}
      <circle cx={560 + run * 780} cy={773} r={7} fill={palette.cream} opacity={f >= 225 && f < 280 ? 1 : 0}/>
    </svg>
    {steps.map((step, i) => {
      const p = enter(f, step.at);
      const arrived = i === 2 ? enter(f, 280) : 0;
      return <div key={step.text} style={{ position: 'absolute', left: step.x, top: 680, width: 448, height: 186, borderRadius: 24, border: `2px solid ${i === 1 ? palette.sage : palette.sageDark}`, background: i === 1 ? palette.sage : palette.ink, color: i === 1 ? palette.ink : palette.mist, opacity: p, transform: `translateY(${(1-p)*35}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
        {i === 1 ? <Img src={staticFile('assets/brand/zenml-product.svg')} alt="ZenML" style={{ width: 280, height: 61, objectFit: 'contain' }}/> : <>
          <Glyph name={arrived > .5 ? 'check' : step.icon} size={46}/>
          <span style={{ fontFamily: fonts.display, fontSize: i === 2 ? 34 : 41 }}>{step.text}</span>
        </>}
      </div>;
    })}
  </>;
}
