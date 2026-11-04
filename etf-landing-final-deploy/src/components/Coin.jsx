import { useId } from 'react';
/** 골드 코인 그래픽 — 모바일 HERO 이미지의 코인 색(#FDD541 · #ECA230)을 기준으로 한 기울어진 원판 */
export default function Coin({ className = '', style, tilt = 0, squash = 0.42 }) {
  const id = `coin${useId().replace(/:/g, '')}`;
  const ry = 50 * squash;
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE57A" />
          <stop offset=".45" stopColor="#FDD541" />
          <stop offset="1" stopColor="#F4B630" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2AE33" />
          <stop offset="1" stopColor="#D88A1F" />
        </linearGradient>
      </defs>
      <g transform={`rotate(${tilt} 60 60)`}>
        <ellipse cx="60" cy={60 + ry * 0.32} rx="50" ry={ry} fill={`url(#${id}-rim)`} />
        <ellipse cx="60" cy="60" rx="50" ry={ry} fill={`url(#${id}-face)`} />
        <ellipse cx="60" cy="60" rx="38" ry={ry * 0.74} fill="none" stroke="#ECA230" strokeOpacity=".55" strokeWidth="2.5" />
        <ellipse cx="46" cy={60 - ry * 0.35} rx="16" ry={ry * 0.18} fill="#FFF6C9" opacity=".55" />
      </g>
    </svg>
  );
}
