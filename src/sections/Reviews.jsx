import { useEffect, useRef, useState } from 'react';
import Reveal from '../components/Reveal';
import { EXAMPLE_SCENARIOS, REVIEW_DISPLAY } from '../data/reviews';

const isExample = REVIEW_DISPLAY.mode !== 'verified';

/** 후기 카드 — 본문 전문 표시, 높이는 내용에 맞춰 자동 */
function ScenarioCard({ item }) {
  return (
    <article
      className="flex h-full flex-col rounded-[20px] bg-white p-6 ring-1 ring-ink/[0.07] transition-transform duration-300 ease-out motion-reduce:transition-none sm:p-7 [@media(hover:hover)]:hover:z-10 [@media(hover:hover)]:hover:scale-[1.02] motion-reduce:[@media(hover:hover)]:hover:scale-100"
      aria-labelledby={`review-title-${item.id}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-bold text-ink">{item.displayName}</span>
          <span className="text-[0.875rem] text-ink-muted">{item.displayAge}세 · {item.persona}</span>
        </div>
        {isExample && <span className="rounded-full bg-ivory px-2.5 py-1 text-[0.75rem] font-semibold text-ink-muted">가상 후기 예시</span>}
      </div>
      <p className="mt-2 text-[1.1rem] tracking-[0.12em] text-brand-orange" aria-label="예시 별점 5점">★★★★★ <span className="text-[0.75rem] tracking-normal text-ink-muted">(예시)</span></p>
      <h3 id={`review-title-${item.id}`} className="mt-3 text-[1.125rem] font-bold leading-[1.45] tracking-tight text-ink [text-wrap:pretty] sm:text-[1.1875rem]">
        {item.title}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-[1.8] text-ink-muted">{item.body}</p>
    </article>
  );
}

/** 모바일 수동 스와이프 (자동 슬라이드 없음) + 위치 인디케이터 */
function MobileCarousel({ items }) {
  const scroller = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scroller.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.index))),
      { root, threshold: 0.6 },
    );
    [...root.children].forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const goTo = (i) => {
    const root = scroller.current;
    const card = root?.children[i];
    if (card) root.scrollTo({ left: card.offsetLeft - root.offsetLeft - 20, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden">
      <div
        ref={scroller}
        role="region"
        aria-roledescription="carousel"
        aria-label="수강 이야기 카드, 좌우로 넘겨 보세요"
        tabIndex={0}
        className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            data-index={i}
            className="w-[86%] shrink-0 snap-start"
            role="group"
            aria-roledescription="slide"
            aria-label={`${items.length}개 중 ${i + 1}번째`}
          >
            <ScenarioCard item={item} />
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-1" aria-label="카드 위치">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${i + 1}번째 카드 보기`}
            aria-current={active === i ? 'true' : undefined}
            className="grid h-8 w-8 place-items-center"
          >
            <span className={`block h-2 rounded-full transition-all duration-300 ${active === i ? 'w-6 bg-brand-orange' : 'w-2 bg-ink/20'}`} />
          </button>
        ))}
        <span className="num ml-2 text-[0.8125rem] text-ink-muted" aria-live="polite">
          {active + 1} / {items.length}
        </span>
      </div>
    </div>
  );
}

export default function Reviews() {
  const items = EXAMPLE_SCENARIOS;
  if (!items.length) return null;
  return (
    <section id="reviews" aria-labelledby="r-title" className="bg-ivory py-24 sm:py-32">
      <div className="container-page">
        <Reveal as="h2" id="r-title" className="max-w-2xl text-[clamp(1.875rem,4.6vw,2.9rem)] font-bold leading-[1.25] tracking-tighter2 text-ink [text-wrap:balance]">
          수강생들의 생생한 ETF 강의 후기
        </Reveal>

        {isExample && (
          <p className="mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-ink-muted">
            아래 카드는 학습자 유형을 바탕으로 구성한 <strong>가상 후기 예시</strong>입니다. 이름·나이·별점은 실제 수강생 정보나 검증된 평가가 아닙니다.
          </p>
        )}

        {/* PC·태블릿 그리드 — 같은 줄 카드 높이를 맞추고, 전문 길이에 따라 줄 높이가 늘어남 */}
        <ul className="mt-10 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={(i % 3) * 90} className="h-full">
              <ScenarioCard item={item} />
            </Reveal>
          ))}
        </ul>

        {/* 모바일 스와이프 */}
        <div className="mt-8">
          <MobileCarousel items={items} />
        </div>

        {/* 예시 문구 고지 — 실제 후기 승인 확보 전까지 유지 (data/reviews.js REVIEW_DISPLAY.mode) */}
        {isExample && (
          <p className="mt-6 text-[0.8125rem] leading-relaxed text-ink-muted md:mt-8">
            ※ 실제 수강 후기 및 검증된 별점이 아닌 팀 프로젝트용 가상 사례입니다.
          </p>
        )}
      </div>
    </section>
  );
}
