import { Check } from 'lucide-react';
import Reveal from '../components/Reveal';
import CtaButton from '../components/CtaButton';
import LongView from '../components/LongView';
import { COURSE, RISK_NOTICE_LINES } from '../config/site';

/** 페이지 전체 설득 포인트 요약 — 앞 섹션에서 이미 보여준 사실만 다시 정리 */
const RECAP = [
  `${COURSE.lessons}, ${COURSE.duration.replace('총 ', '')}`,
  'ETF 기초부터 인출 전략까지 4단계',
  '『단 3개의 미국 ETF로 은퇴하라』 저자 직강',
];

export default function FinalCta() {
  return (
    <section id="final-cta-section" aria-labelledby="f-title" className="relative isolate overflow-hidden bg-gradient-to-b from-navy to-navy-deep pb-24 pt-10 text-white sm:pb-32">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-70" />
      <div aria-hidden="true" className="absolute right-0 top-0 -z-10 h-[480px] w-[480px] rounded-full bg-brand-orange/10 blur-[140px]" />
      <LongView showLabels={false} className="pointer-events-none mb-10 h-24 sm:h-32" />
      <div className="container-page text-center">
        <Reveal as="h2" id="f-title" className="mx-auto max-w-3xl font-display text-[clamp(2.25rem,10vw,2.75rem)] sm:text-[clamp(2.25rem,5.6vw,3.75rem)] font-extrabold leading-[1.2] tracking-tightest">
          <span className="sr-only">미래를 위한 ETF 투자 공부, 무료 강의부터 확인해 보세요</span>
          <span aria-hidden="true" className="sm:hidden">
            <span className="block">미래를 위한</span>
            <span className="block">ETF 투자 공부,</span>
            <span className="block">무료 강의부터</span>
            <span className="block">확인해 보세요</span>
          </span>
          <span aria-hidden="true" className="hidden sm:block">
            <span className="block">미래를 위한 ETF 투자 공부,</span>
            <span className="block">무료 강의부터 확인해 보세요</span>
          </span>
        </Reveal>
        <Reveal as="ul" delay={160} aria-label="강의 요약" className="mx-auto mt-7 flex max-w-3xl flex-col items-center gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6">
          {RECAP.map((r) => (
            <li key={r} className="inline-flex items-center gap-2 text-[0.9375rem] text-white/80">
              <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-orange" strokeWidth={3} />
              {r}
            </li>
          ))}
        </Reveal>
        <div className="mt-10 flex justify-center">
          <CtaButton id="final-cta" position="final" size="lg" className="w-full max-w-[340px] sm:w-auto" />
        </div>
        <p className="mx-auto mt-10 max-w-lg text-[0.8125rem] leading-relaxed text-white/55">
          {RISK_NOTICE_LINES.map((line) => <span key={line} className="block">{line}</span>)}
        </p>
      </div>
    </section>
  );
}
