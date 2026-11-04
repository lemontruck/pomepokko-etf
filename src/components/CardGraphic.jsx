/** 학습 카드별 추상 그래픽 — 데이터·수익을 표현하지 않는 개념 도형입니다. */
const T = '#176F66';
const G = '#D4A85B';

function Basket() {
  // 여러 종목을 하나로 묶는 ETF의 구조
  const dots = [];
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 6; c++) {
      const x = 70 + c * 18 + (r % 2 ? 9 : 0);
      const y = 34 + r * 16;
      if ((x - 115) ** 2 + (y - 66) ** 2 < 46 ** 2) dots.push([x, y]);
    }
  return (
    <>
      <circle cx="115" cy="66" r="52" fill="none" stroke={T} strokeWidth="1.5" />
      <circle cx="115" cy="66" r="60" fill="none" stroke={T} strokeOpacity=".25" strokeDasharray="2 5" />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={i === 7 ? G : T} fillOpacity={i === 7 ? 1 : 0.75} />
      ))}
    </>
  );
}

function TwoIndexes() {
  // 서로 겹치면서도 다른 두 지수
  const grid = (cx, cy, r, step, fill) => {
    const out = [];
    for (let x = cx - r; x <= cx + r; x += step)
      for (let y = cy - r; y <= cy + r; y += step)
        if ((x - cx) ** 2 + (y - cy) ** 2 < (r - 4) ** 2) out.push(<circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill={fill} />);
    return out;
  };
  return (
    <>
      <circle cx="92" cy="66" r="50" fill={T} fillOpacity=".08" stroke={T} strokeWidth="1.5" />
      <circle cx="146" cy="66" r="40" fill={G} fillOpacity=".12" stroke={G} strokeWidth="1.5" />
      {grid(92, 66, 50, 9, T)}
      {grid(146, 66, 40, 13, '#9C7A35')}
    </>
  );
}

function Rhythm() {
  // 일정한 간격으로 반복되는 배당의 리듬 (높이는 모두 같음)
  return (
    <>
      <line x1="30" y1="104" x2="210" y2="104" stroke={T} strokeWidth="1.5" />
      {Array.from({ length: 8 }).map((_, i) => {
        const x = 42 + i * 22;
        return (
          <g key={i}>
            <line x1={x} y1="104" x2={x} y2="62" stroke={T} strokeOpacity=".35" strokeWidth="1.5" />
            <circle cx={x} cy="54" r="5" fill={i % 3 === 2 ? G : 'none'} stroke={i % 3 === 2 ? G : T} strokeWidth="1.5" />
          </g>
        );
      })}
    </>
  );
}

function Horizon() {
  // 여러 겹의 계좌·소득이 쌓여 만드는 장기 지평
  return (
    <>
      <path d="M78 100 A42 42 0 0 1 162 100" fill={G} fillOpacity=".9" />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${60 - i * 14} 100 A${60 + i * 14} ${60 + i * 14} 0 0 1 ${180 + i * 14} 100`}
          fill="none"
          stroke={T}
          strokeOpacity={0.75 - i * 0.16}
          strokeWidth="1.5"
        />
      ))}
      <line x1="16" y1="100" x2="224" y2="100" stroke={T} strokeWidth="1.5" />
      <line x1="40" y1="112" x2="200" y2="112" stroke={T} strokeOpacity=".3" strokeWidth="1.5" />
      <line x1="70" y1="122" x2="170" y2="122" stroke={T} strokeOpacity=".18" strokeWidth="1.5" />
    </>
  );
}

function Portfolio() {
  // 여러 자산을 나누어 담는 포트폴리오 (비중 수치는 표시하지 않음)
  const seg = (r, a0, a1) => {
    const p = (a) => [120 + r * Math.cos(a), 66 + r * Math.sin(a)];
    const [x0, y0] = p(a0); const [x1, y1] = p(a1);
    return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  };
  const arcs = [[-1.57, 1.2, T], [1.32, 3.3, G], [3.42, 4.6, T]];
  return (
    <>
      <circle cx="120" cy="66" r="46" fill="none" stroke={T} strokeOpacity=".12" strokeWidth="14" />
      {arcs.map(([a0, a1, c], i) => (
        <path key={i} d={seg(46, a0, a1)} fill="none" stroke={c} strokeOpacity={i === 2 ? 0.45 : 0.9} strokeWidth="14" strokeLinecap="butt" />
      ))}
      <circle cx="120" cy="66" r="22" fill="none" stroke={T} strokeOpacity=".35" strokeDasharray="2 4" />
    </>
  );
}

const MAP = { basket: Basket, indexes: TwoIndexes, rhythm: Rhythm, horizon: Horizon, portfolio: Portfolio };

export default function CardGraphic({ kind }) {
  const C = MAP[kind];
  return (
    <svg viewBox="0 0 240 132" className="h-full w-full" aria-hidden="true" focusable="false">
      <C />
    </svg>
  );
}
