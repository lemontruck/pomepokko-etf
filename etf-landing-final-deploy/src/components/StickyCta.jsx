import { useEffect, useState } from 'react';
import CtaButton from './CtaButton';
import { COURSE } from '../config/site';

/** 모바일 하단 고정 CTA — HERO CTA가 화면 밖으로 나간 뒤 나타나고, 최종 CTA가 보이면 숨습니다. */
export default function StickyCta() {
  const [heroOut, setHeroOut] = useState(false);
  const [finalIn, setFinalIn] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const hero = document.getElementById('hero-cta');
    const fin = document.getElementById('final-cta-section');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) setHeroOut(!e.isIntersecting && e.boundingClientRect.top < 0);
        if (e.target === fin) setFinalIn(e.isIntersecting);
      });
    });
    hero && io.observe(hero);
    fin && io.observe(fin);
    return () => io.disconnect();
  }, []);

  const show = heroOut && !finalIn;
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy/95 px-4 pt-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        show ? 'visible translate-y-0' : 'invisible pointer-events-none translate-y-full'
      }`}
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)', transitionProperty: 'transform, visibility' }}
      aria-hidden={!show}
    >
      <div className="flex items-center gap-3">
        <p className="min-w-0 flex-1 text-[0.8125rem] leading-snug text-white/80">
          미국 ETF 투자법<br />
          <span className="text-white/55">{COURSE.lessons} 강의 내용 확인</span>
        </p>
        <CtaButton position="sticky" className="shrink-0 !min-h-[48px] !px-6 !text-base" />
      </div>
    </div>
  );
}
