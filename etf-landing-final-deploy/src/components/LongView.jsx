/**
 * The Long View — 페이지 전체를 관통하는 '공부의 지평선'.
 * 수익률 그래프가 아니라 학습 순서(기초 → 미국지수 → 배당 → 장기 전략)를 잇는 선입니다.
 * 축·숫자·기간을 표시하지 않습니다.
 *
 * 선은 가로로 늘어나는 SVG, 점과 라벨은 비율 위치의 HTML 이라 화면 폭이 바뀌어도 찌그러지지 않습니다.
 */
export const MILESTONES = [
  { x: 10, y: 73.3, label: '투자·ETF 기초' },
  { x: 35.8, y: 62.2, label: '지수·배당 ETF' },
  { x: 63.3, y: 46.7, label: '포트폴리오' },
  { x: 90, y: 26.7, label: '절세·인출 전략' },
];

export default function LongView({ className = '', showLabels = true, tone = 'dark' }) {
  const line = tone === 'dark' ? '#FE6806' : '#17204F';
  return (
    <div className={`${/\b(absolute|fixed)\b/.test(className) ? '' : 'relative'} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 180" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" focusable="false">
        <defs>
          <linearGradient id={`lvfade-${tone}`} x1="0" x2="1">
            <stop offset="0" stopColor={line} stopOpacity="0" />
            <stop offset=".18" stopColor={line} stopOpacity=".55" />
            <stop offset="1" stopColor={line} stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d="M0 150 L1200 150" stroke={tone === 'dark' ? 'rgba(255,255,255,.08)' : 'rgba(12,39,50,.1)'} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path
          className="lv-path"
          pathLength="1"
          d="M0 146 C 60 142, 90 136, 120 132 S 330 118, 430 112 S 650 96, 760 84 S 960 64, 1080 48 S 1170 38, 1200 34"
          fill="none"
          stroke={`url(#lvfade-${tone})`}
          strokeWidth="1.6"
        />
      </svg>
      {MILESTONES.map((m, i) => (
        <div
          key={m.label}
          className="lv-node absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: `${m.x}%`, top: `${m.y}%`, '--d': `${900 + i * 350}ms` }}
        >
          <span className="relative block h-[10px] w-[10px]">
            {i === MILESTONES.length - 1 && (
              <span className="lv-pulse absolute -inset-[6px] rounded-full" style={{ background: line }} />
            )}
            <span
              className="absolute inset-0 rounded-full border-[1.6px]"
              style={{ borderColor: line, background: tone === 'dark' ? '#102D43' : '#F5F2E9' }}
            />
          </span>
          {showLabels && (
            <span className={`absolute top-[18px] whitespace-nowrap text-[13px] ${tone === 'dark' ? 'text-white/60' : 'text-ink-muted'}`}>
              {m.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
