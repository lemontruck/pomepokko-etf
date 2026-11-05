import { useEffect, useRef, useState } from 'react';
import Reveal from '../components/Reveal';
import { EXAMPLE_SCENARIOS } from '../data/reviews';

/** 후기 카드 — 본문 전문 표시, 높이는 내용에 맞춰 자동 */
function ScenarioCard({ item }) {
  return (
    <article
      className="flex h-full flex-col rounded-[20px] bg-white p-6 ring-1 ring-ink/[0.07] transition-transform duration-300 ease-out motion-reduce:transition-none sm:p-7 [@media(hover:hover)]:hover:z-10 [@media(hover:hover)]:hover:scale-[1.02] motion-reduce:[@media(hover:hover)]:hover:scale-100"
      aria-labelledby={`review-title-${item.id}`}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="font-bold text-ink">{item.displayName}</span>
        <span className="text-[0.875rem] text-ink-muted">{item.displayAge}세 · {item.persona}</span>
      </div>
      <p className="mt-2 text-[1.1rem] tracking-[0.12em] text-brand-orange" aria-label="별점 표시">★★★★★</p>
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

        <p className="mt-4 text-[0.8125rem] text-ink-muted">※ 이름·나이·별점은 실제 작성자의 확인된 정보가 아닌 표시용 정보입니다.</p>

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

      </div>
    </section>
  );
}
