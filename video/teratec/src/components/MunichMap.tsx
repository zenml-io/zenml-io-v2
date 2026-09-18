import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { mapTiles } from '../mapTiles';
import { fonts, palette } from '../brand';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const ease = (frame: number, start: number, length: number) => {
  const t = interpolate(frame, [start, start + length], [0, 1], clamp);
  return t * t * (3 - 2 * t);
};
// Munich is south-east of the template's Paris (859.5,569) and Amsterdam
// (873,545.6) anchors. At this map's hex resolution its city highlight occupies
// the nearest southern Germany tile. This is a stylized map, not a boundary map.
const munich = mapTiles.find(tile => tile.x === 913.5 && tile.y === 583.497)!;
export function MunichMap() {
  const f = useCurrentFrame();
  const zoom = ease(f, 90, 65);
  const scale = 1 + zoom * 1.25;
  const tx = zoom * (580 - munich.x * 2.25);
  const ty = zoom * (600 - munich.y * 2.25);
  const locate = ease(f, 165, 25);
  const label = ease(f, 190, 25);
  const ring = interpolate(f, [175, 240], [0, 1], clamp);
  return <svg viewBox="0 240 1080 780" style={{ position: 'absolute', left: 785, top: 165, width: 1050, height: 760, overflow: 'hidden' }} aria-label="Hexagonal map highlighting Munich, Germany">
    <g transform={`translate(${tx} ${ty}) scale(${scale})`}>
    {mapTiles.map((tile, i) => {
      const enter = ease(f, 12 + tile.x / 1080 * 52 + Math.abs(tile.y - 560) / 45, 30);
      return <path key={i} d={tile.d} fill={palette.sage} opacity={enter * .48} transform={`translate(${tile.x} ${tile.y}) scale(${.65 + enter * .35}) translate(${-tile.x} ${-tile.y})`}/>;
    })}
    <circle cx={munich.x} cy={munich.y} r={18 + ring * 48} stroke={palette.sageDark} strokeWidth={1.8} fill="none" opacity={f < 175 ? 0 : (1-ring)*.65}/>
    <path d={munich.d} fill={palette.ink} opacity={locate} transform={`translate(${munich.x} ${munich.y}) scale(${1 + locate * .85}) translate(${-munich.x} ${-munich.y})`}/>
    </g>
    <path d="M600 595 L675 520 H1000" stroke={palette.sageDark} strokeWidth={2} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1-label}/>
    <g opacity={label} transform={`translate(660 ${443 + (1-label)*12})`}>
      <rect x={-22} y={-15} width={358} height={92} rx={12} fill={palette.mist}/>
      <text x={0} y={22} fontFamily={fonts.display} fontSize={39} fill={palette.ink}>Munich, Germany</text>
      <text x={0} y={57} fontFamily={fonts.label} fontSize={17} fill={palette.sageDark}>ZENML LABS</text>
    </g>
  </svg>;
}
