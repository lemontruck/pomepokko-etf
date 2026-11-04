import { Clock3 } from 'lucide-react';
import Reveal from '../components/Reveal';
import CtaButton from '../components/CtaButton';
import { PREVIEW_LESSON } from '../config/site';
import capture from '../assets/02_episode01_capture.jpg';

export default function ClassPreview() {
  return (
    <section id="preview" aria-labelledby="p-title" className="relative isolate overflow-hidden bg-gradient-to-b from-navy-deep to-navy py-24 text-white sm:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-ivory/[0.07] to-transparent" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/3 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-navy-mid/90 blur-[140px]" />

      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal as="h2" id="p-title" className="text-[clamp(1.875rem,4.6vw,2.9rem)] font-bold leading-[1.25] tracking-tighter2 [text-wrap:balance]">
            <span className="text-mint">투자 공부법</span> 무료로 만나보세요
          </Reveal>
          <Reveal as="p" delay={100} className="mt-5 text-[1.0625rem] leading-relaxed text-white/70 sm:text-lg">
            <span className="block">‘우리는 왜 투자해야 할까?’</span>
            <span className="block">포메뽀꼬가 전하는 첫 번째 수업</span>
          </Reveal>
        </div>

        <Reveal zoom className="mx-auto mt-12 max-w-[1040px] sm:mt-16">
          <figure className="rounded-[24px] bg-gradient-to-b from-white/[0.12] to-white/[0.03] p-2 ring-1 ring-brand-orange/30 sm:p-3">
            <div className="flex items-center justify-between gap-3 px-2 pb-2.5 pt-1 sm:px-3 sm:pb-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/15 px-3 py-1 text-[0.8125rem] font-semibold text-brand-orange">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                실제 1강 화면 미리보기
              </span>
              <span className="num text-xs text-white/45">Lesson 01</span>
            </div>
            <img
              src={capture}
              alt="1강 수업 화면 캡처. 강의 슬라이드 ‘누구나 성공할 수 있는 미국 ETF 투자법’ 앞에 포메뽀꼬 강사가 서 있고, 하단 자막에 저서 『단 3개의 미국 ETF로 은퇴하라』가 소개되어 있습니다."
              width="1600"
              height="900"
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full rounded-[16px] bg-navy object-cover"
            />
            <figcaption className="flex flex-col gap-2 px-2 pb-2 pt-4 sm:flex-row sm:items-center sm:justify-between sm:px-3 sm:pb-3 sm:pt-5">
              <span className="text-lg font-bold leading-snug sm:text-xl">
                {PREVIEW_LESSON.number}. {PREVIEW_LESSON.title}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-white/65">
                <Clock3 aria-hidden="true" className="h-4 w-4" />
                러닝타임 <span className="num">{PREVIEW_LESSON.runtime}</span>
              </span>
            </figcaption>
          </figure>
          <p className="mt-4 text-center text-xs leading-relaxed text-white/45">
            <span className="block">※ 실제 1강 영상의 한 장면을 캡처한 이미지입니다.</span>
            <span className="block">1화는 공식 강의 상세페이지에서 볼 수 있어요.</span>
          </p>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <CtaButton position="preview" size="lg" />
        </div>
      </div>
    </section>
  );
}
