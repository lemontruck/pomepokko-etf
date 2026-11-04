import { Clock3, Compass, Layers } from 'lucide-react';
import Reveal from '../components/Reveal';

/** 타깃 고민 (캠페인 가설) — 단정·불안 조성 없이 질문형으로 */
const WORRIES = [
  // body: 의미 단위 줄 배열 (좁은 화면에서는 줄 안에서 추가 줄바꿈 허용)
  { icon: Compass, title: 'ETF 고를 기준이 없어요', body: ['비슷해 보이는 미국 ETF 중', '무엇을 봐야 할지 모르겠어요'] },
  { icon: Clock3, title: '분석할 시간이 부족해요', body: ['개별 기업 재무제표까지 챙기기엔', '퇴근 후 시간이 빠듯해요'] },
  { icon: Layers, title: '구성과 관리가 막막해요', body: ['몇 개를 어떤 비중으로 담고,', '어떻게 관리할지 궁금해요'] },
];

export default function Questions() {
  return (
    <section id="questions" aria-labelledby="q-title" className="relative bg-ivory py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy/[0.06] to-transparent" />
      <div className="container-page">
        <div className="max-w-3xl">
          <Reveal as="h2" id="q-title" className="text-[clamp(1.875rem,4.6vw,2.9rem)] font-bold leading-[1.25] tracking-tighter2 text-ink [text-wrap:balance]">
            <span className="block">퇴근하면 쉬기도 바쁜데,</span> <span className="block">종목 분석은 언제 하죠?</span>
          </Reveal>
          <Reveal as="p" delay={100} className="mt-5 text-[1.0625rem] leading-relaxed text-ink-muted sm:text-lg">
            기업 분석부터 ETF 선택까지, <br className="sm:hidden" />
            시작하려니 막막하다면?
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5 [&>li]:h-full">
          {WORRIES.map(({ icon: Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 110}>
              {/* PC(호버 가능한 기기)에서만 살짝 확대 — 레이아웃에 영향 없는 transform 사용 */}
              <div className="flex h-full gap-4 rounded-[20px] bg-white p-6 ring-1 ring-ink/[0.07] transition-[transform,box-shadow] duration-[230ms] ease-out motion-reduce:transition-none md:flex-col md:p-7 [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:shadow-[0_14px_32px_-16px_rgba(16,45,67,.28)] motion-reduce:[@media(hover:hover)]:hover:scale-100">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-orange/15 text-brand-cta">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold leading-snug text-ink sm:text-xl">{title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {body.map((line) => <span key={line} className="block">{line}</span>)}
                </p>
              </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
