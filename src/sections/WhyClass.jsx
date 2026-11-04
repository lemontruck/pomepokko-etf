import { BookOpen, CircleHelp, Filter, ListChecks, Search, Target } from 'lucide-react';
import Reveal from '../components/Reveal';
import thinkingFace from '../assets/06_thinking_face.webp';
import { COURSE } from '../config/site';

/**
 * 무료 정보 탐색 vs 강의 — 정보의 질이 아니라 '학습 순서·범위를 직접 정해야 하는 부담'과
 * '단계별 구성'의 차이를 보여주는 비교 카드입니다. 무료 콘텐츠를 비하하는 표현은 쓰지 않습니다.
 */
const FREE = [
  { icon: Search, text: '검색할 때마다 달라지는 주제' },
  { icon: Filter, text: '무엇부터 배울지 직접 결정' },
  { icon: CircleHelp, text: '어디까지 공부할지 막막함' },
];

const CLASS = [
  { icon: BookOpen, text: 'ETF 기초부터 단계별 학습' },
  { icon: ListChecks, text: `${COURSE.lessons.replace('총 ', '')}으로 구성된 학습 순서` },
  { icon: Target, text: '포트폴리오·인출 전략까지' },
];

function CompareCard({ title, items, dark }) {
  return (
    <div
      className={`flex h-full flex-col rounded-[20px] px-6 pb-2 pt-6 sm:px-7 sm:pt-7 ${
        dark
          ? 'why-card-dark bg-navy-mid text-white' /* 오른쪽·아래쪽에만 민트 그림자 (index.css) */
          : 'bg-white text-ink ring-1 ring-ink/[0.07]'
      }`}
    >
      <h3 className={`${dark ? 'text-[1.0625rem] font-bold text-[var(--why-mint)]' : 'text-[0.9375rem] font-semibold text-ink-muted'}`}>{title}</h3>
      <ul className="mt-2 flex flex-1 flex-col">
        {items.map(({ icon: Icon, text }) => (
          <li
            key={text}
            className={`flex flex-1 flex-col justify-center gap-2.5 border-b py-5 last:border-b-0 sm:py-6 ${
              dark ? 'border-white/15' : 'border-ink/10'
            }`}
          >
            <Icon
              aria-hidden="true"
              className={`h-5 w-5 ${dark ? 'text-[var(--why-mint)]' : 'text-[var(--why-slate)]'}`}
              strokeWidth={1.9}
            />
            <span className="text-[1.0625rem] font-bold leading-snug tracking-tight sm:text-lg">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WhyClass() {
  return (
    <section id="why-class" aria-labelledby="w-title" className="overflow-x-clip bg-ivory pb-20 sm:pb-28">
      <div className="container-page border-t border-ink/10 pt-20 sm:pt-28">
        <div className="relative isolate text-center">
          {/* 🤔 배경 장식 — 전달받은 이미지(체크무늬 배경만 제거한 투명 WebP) */}
          <img
            src={thinkingFace}
            alt=""
            aria-hidden="true"
            width="420"
            height="470"
            loading="lazy"
            decoding="async"
            draggable="false"
            className="why-emoji pointer-events-none absolute -z-10 h-auto select-none"
          />
          <Reveal as="p" className="num text-[0.8125rem] font-semibold tracking-[0.04em] text-brand-cta">
            WHY THIS CLASS?
          </Reveal>
          <Reveal as="h2" id="w-title" delay={60} className="mx-auto mt-3 text-[clamp(1.75rem,4.2vw,2.5rem)] font-bold leading-[1.3] tracking-tighter2 text-ink">
            <span className="block lg:inline">무료 정보는 많은데,</span>{' '}
            <span className="block text-brand-cta lg:inline">무엇부터 공부해야 할까요?</span>
          </Reveal>
          <Reveal as="p" delay={120} className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">
            <span className="block sm:inline">정보를 찾아봐도 막막했다면,</span>{' '}
            <span className="block sm:inline">
              <span className="mint-mark text-ink">이제는 체계적으로 배워보세요.</span>
            </span>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1000px] gap-4 sm:mt-12 md:grid-cols-2 md:gap-5">
          <Reveal className="h-full">
            <CompareCard title="무료 정보 탐색" items={FREE} />
          </Reveal>
          <Reveal delay={120} className="h-full">
            <CompareCard title="포메뽀꼬 ETF 강의" items={CLASS} dark />
          </Reveal>
        </div>

        <div className="mt-10 text-center sm:mt-12">
          <Reveal as="p" className="text-[clamp(1.375rem,3.2vw,1.875rem)] font-bold leading-[1.35] tracking-tighter2 text-ink">
            <span className="block sm:inline">ETF 기초부터 포트폴리오 구성까지,</span>{' '}
            <span className="block sm:inline">
              <span className="mint-mark">하나의 학습 흐름으로 이어보세요.</span>
            </span>
          </Reveal>
          <Reveal as="p" delay={80} className="mt-2.5 text-[0.9375rem] text-ink-muted sm:text-base">
            ETF 기초부터 활용까지 이어지는 4단계 학습 로드맵
          </Reveal>
        </div>
      </div>
    </section>
  );
}
