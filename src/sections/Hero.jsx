import { Info } from 'lucide-react';
import CtaButton from '../components/CtaButton';
import Coin from '../components/Coin';
import { useParallax } from '../components/useParallax';
import { HERO_COPY, PROMO_NOTICE } from '../config/site';
import cutout from '../assets/04_instructor_cutout.webp';
import mobileVisual from '../assets/05_hero_mobile.webp';

/** 다른 화면 크기용 이미지를 내려받지 않도록 쓰는 1px 투명 이미지 */
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/** PC 제목 — 줄마다 마스크 등장, gradientLine 줄에 화이트→민트 그라데이션 */
function TitleLines({ lines, gradientLine, className }) {
  return (
    <span aria-hidden="true" className={className}>
      {lines.map((line, i) => (
        <span key={line} className={`hero-line ${i === gradientLine ? 'hero-l2' : 'hero-l1'}`}>
          <span className={i === gradientLine ? 'hero-gradient' : undefined} style={{ '--d': `${80 + i * 110}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

/** PC 오른쪽 비주얼 — 민트 원형 배경 + 실제 강사 사진(배경 제거본) + 골드 코인 */
function HeroVisual() {
  const personRef = useParallax(0.035);
  return (
    <div aria-hidden="true" className="relative h-[430px] w-full lg:h-[560px]">
      <div className="hero-circle absolute left-1/2 top-[24%] aspect-square w-[118%] -translate-x-1/2 rounded-full" />
      <Coin className="absolute left-[2%] top-[22%] w-[13%]" tilt={-6} squash={0.36} />
      <Coin className="absolute right-[2%] top-[4%] w-[17%]" tilt={32} squash={0.55} />
      <Coin className="absolute right-[-2%] top-[40%] w-[11%]" tilt={4} squash={0.34} />
      <div ref={personRef} className="absolute inset-x-0 bottom-0 flex justify-center will-change-transform">
        <picture>
          <source media="(max-width: 767px)" srcSet={BLANK} />
          <img
            src={cutout}
            alt=""
            width="900"
            height="1382"
            fetchpriority="high"
            decoding="async"
            className="fade-in h-[400px] w-auto max-w-none drop-shadow-[0_30px_40px_rgba(0,0,0,.35)] lg:h-[535px]"
            style={{ '--d': '150ms' }}
          />
        </picture>
      </div>
      <Coin className="absolute bottom-[26%] left-[-9%] w-[19%]" tilt={58} squash={0.5} />
      <Coin className="absolute bottom-[4%] right-[-4%] w-[27%]" tilt={-14} squash={0.46} />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="hero-bg relative isolate overflow-hidden text-white">
      {/* 모바일(767px 이하): 확정 HERO 이미지를 원본 비율 그대로 표시 */}
      <div className="md:hidden">
        <picture>
          <source media="(min-width: 768px)" srcSet={BLANK} />
          <img
            src={mobileVisual}
            alt={HERO_COPY.mobileImageAlt}
            width="1254"
            height="1254"
            fetchpriority="high"
            className="mx-auto block h-auto w-full max-w-[560px]"
          />
        </picture>
      </div>

      <div className="container-page relative grid grid-cols-1 md:min-h-[430px] md:grid-cols-12 md:items-center md:gap-4 lg:min-h-[560px] lg:gap-8">
        <div className="relative z-10 flex flex-col items-center pb-10 pt-6 text-center md:col-span-7 md:items-start md:py-14 md:text-left lg:py-16">
          <p className="fade-in hidden items-center rounded-full bg-[#6EDCBC] px-4 py-1.5 text-[0.8125rem] font-bold text-navy-deep md:inline-flex">
            {HERO_COPY.tag}
          </p>

          {/* 모바일은 이미지에 제목이 있으므로 화면에서는 숨기고 스크린리더에만 제공 */}
          <h1 id="hero-title" className="hero-title-box sr-only font-display font-extrabold md:not-sr-only md:mt-6 md:w-full md:self-stretch">
            <span className="sr-only">{HERO_COPY.titleDesktop.join(' ')}</span>
            <TitleLines
              lines={HERO_COPY.titleDesktop}
              gradientLine={HERO_COPY.gradientLine}
              className="block tracking-[-0.03em]"
            />
          </h1>

          <p className="fade-in sr-only text-lg font-semibold lg:text-[1.375rem] leading-snug text-white [text-wrap:balance] md:not-sr-only md:mt-4" style={{ '--d': '420ms' }}>
            {HERO_COPY.sub}
          </p>

          {/* CTA는 애니메이션 없이 즉시 노출 */}
          <div className="flex w-full flex-col items-center gap-3 md:mt-8 md:items-start md:gap-4">
            <p className="text-center text-[1.125rem] font-bold leading-snug text-white md:hidden">월 300만원 금융소득, 무엇부터?</p>
            <CtaButton id="hero-cta" position="hero" size="lg" className="w-full max-w-[340px] md:w-auto" />
            <p className="flex max-w-[30rem] items-start gap-1.5 text-left text-[0.75rem] leading-relaxed text-white/50 md:gap-2 md:text-[0.8125rem] md:text-white/55">
              <Info aria-hidden="true" className="mt-[3px] h-3 w-3 shrink-0 md:h-3.5 md:w-3.5" />
              {PROMO_NOTICE}
            </p>
          </div>
        </div>

        <div className="relative hidden self-end md:col-span-5 md:block">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
