import { BookOpen, CalendarDays, Check, Clock3, PieChart, TrendingUp, Wallet } from 'lucide-react';
import Reveal from '../components/Reveal';
import CtaButton from '../components/CtaButton';
import { COURSE } from '../config/site';

/** 4단계 학습 로드맵 — 기획안 기준 문구 그대로. 강의에 없는 내용을 덧붙이지 않습니다. */
const ROADMAP = [
  { kind: 'basics', icon: BookOpen, title: '자산관리의 필요성과 ETF 기초' }, // 기초 학습
  { kind: 'index', icon: TrendingUp, title: '미국 대표 지수 ETF 및 배당 ETF' }, // 미국 지수 흐름
  { kind: 'portfolio', icon: PieChart, title: '포트폴리오 구성과 장기 투자' }, // 자산 배분
  { kind: 'withdraw', icon: Wallet, title: '절세계좌 활용 및 인출 전략' }, // 계좌·인출
];

const USP = [
  { title: 'ETF 기초에서 활용까지', body: ['기초 개념부터 실제 활용까지', '단계적으로 배우는 구성'] },
  { title: '직장인 맞춤 압축 구성', body: ['퇴근 후에도 나누어 들을 수 있는', '부담 적은 학습 분량'] },
  { title: '미국 ETF 중심', body: ['개별 종목 분석보다', '미국 ETF 학습에 집중'] },
];

const META = [
  { icon: BookOpen, label: COURSE.lessons },
  { icon: Clock3, label: COURSE.duration },
  { icon: CalendarDays, label: COURSE.period },
];

export default function Curriculum() {
  return (
    <section id="curriculum" aria-labelledby="c-title" className="bg-ivory pb-24 sm:pb-32">
      <div className="container-page border-t border-ink/10 pt-20 sm:pt-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal as="h2" id="c-title" className="text-[clamp(1.875rem,4.6vw,2.9rem)] font-bold leading-[1.32] tracking-tighter2 text-ink">
              {/* 모바일 3줄 · PC 2줄 */}
              {/* 모바일 3줄 · 태블릿 2줄 · PC(1024px 이상) 3줄 */}
              <span className="block sm:inline lg:block">시간이 없다면,</span>{' '}
              <span className="block sm:inline lg:block">개별 종목보다</span>{' '}
              <span className="block">미국 ETF 투자 공부부터</span>
            </Reveal>
            <Reveal as="p" delay={80} className="mt-4 text-[1.0625rem] leading-relaxed text-ink-muted sm:text-lg">
              ETF 기초부터 포트폴리오·인출 전략까지, <br className="sm:hidden" />
              순서대로 배워보세요.
            </Reveal>
          </div>
          <Reveal as="ul" delay={160} aria-label="강의 정보" className="flex flex-wrap gap-2 lg:col-span-4 lg:justify-end">
            {META.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-ink ring-1 ring-ink/10">
                <Icon aria-hidden="true" className="h-4 w-4 text-brand-cta" />
                {label}
              </li>
            ))}
          </Reveal>
        </div>

        {/* 4단계 로드맵 — 데스크톱 가로 / 모바일 세로 */}
        <ol aria-label="4단계 학습 로드맵" className="relative mt-14 grid gap-0 md:mt-16 md:grid-cols-4 md:gap-5">
          {/* 연결선 */}
          <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-mint-deep/50 md:hidden" />
          <span aria-hidden="true" className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-[19px] hidden h-px bg-mint-deep/50 md:block" />
          {ROADMAP.map((step, i) => (
            <Reveal as="li" key={step.kind} delay={i * 120} className="relative flex gap-5 pb-8 last:pb-0 md:flex-col md:items-center md:gap-0 md:pb-0 md:text-center">
              <span className="num relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-mint ring-[6px] ring-ivory">
                {i + 1}
              </span>
              <div className="relative flex-1 rounded-[20px] bg-white p-5 ring-1 ring-ink/[0.07] transition-[transform,box-shadow] duration-[230ms] ease-out motion-reduce:transition-none md:mt-6 md:w-full md:p-6 lg:px-5 [@media(hover:hover)]:hover:z-10 [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:shadow-[0_14px_32px_-16px_rgba(16,45,67,.28)] motion-reduce:[@media(hover:hover)]:hover:scale-100">
                <div className="grid h-20 place-items-center rounded-[14px] bg-ivory-deep/70 px-2 md:h-24">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-orange/15 text-brand-cta md:h-16 md:w-16">
                    <step.icon aria-hidden="true" className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.75} />
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold text-brand-cta">{i + 1}단계</p>
                <h3 className="mt-1 text-[1.0625rem] font-bold leading-snug tracking-tight text-ink sm:text-lg [text-wrap:balance]">{step.title}</h3>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* 강의 USP */}
        <Reveal className="mt-14 rounded-[24px] bg-navy p-6 text-white sm:p-8 md:mt-16">
          <h3 className="sr-only">이 강의의 특징</h3>
          <ul className="grid gap-5 md:grid-cols-3 md:gap-8">
            {USP.map((u) => (
              <li key={u.title} className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-orange text-navy">
                  <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <div>
                  <p className="font-bold leading-snug">{u.title}</p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-white/75">
                    {u.body.map((line) => <span key={line} className="block">{line}</span>)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <CtaButton position="curriculum" size="lg" />
        </div>
      </div>
    </section>
  );
}
