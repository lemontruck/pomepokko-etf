import { ArrowUpRight, Award, BookMarked, Mic2, PenLine } from 'lucide-react';
import Reveal from '../components/Reveal';
import { useParallax } from '../components/useParallax';
import { ACTIVITIES, INSTRUCTOR } from '../data/instructor';
import profile from '../assets/01_instructor_profile.jpg';

const ICONS = { book: BookMarked, talk: Mic2, influencer: Award };

export default function Instructor() {
  const photoRef = useParallax(0.04);
  const items = ACTIVITIES.filter((a) => a.verified);

  return (
    <section id="instructor" aria-labelledby="i-title" className="relative isolate overflow-hidden bg-navy py-24 text-white sm:py-32">
      <div aria-hidden="true" className="absolute -right-24 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-navy-mid blur-[130px]" />
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-[400px] lg:sticky lg:top-28 lg:mx-0">
            <div ref={photoRef} className="will-change-transform">
              <Reveal zoom>
                <img
                  src={profile}
                  alt="태블릿 펜으로 메모하며 정면을 바라보는 포메뽀꼬 강사"
                  width="960"
                  height="1440"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full rounded-[28px] bg-[#e7e8ea] object-cover object-[50%_25%] shadow-[0_40px_80px_-35px_rgba(0,0,0,.55)] lg:aspect-[2/3]"
                />
              </Reveal>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <Reveal as="p" className="text-[0.9375rem] font-semibold text-brand-orange">강사 소개</Reveal>
          <Reveal as="h2" id="i-title" delay={80} className="mt-2.5 text-[1.75rem] font-bold leading-[1.3] tracking-tighter2 sm:mt-3 sm:text-[clamp(1.875rem,4.4vw,2.75rem)] sm:leading-[1.28]">
            <span className="block">
              월급 받던 평범한 <br className="sm:hidden" />
              직장인에서
            </span>{' '}
            <span className="block">
              순자산 <span className="text-brand-orange">38억 원</span> 자산가로
            </span>
          </Reveal>
          <Reveal delay={140} className="mt-8 border-t border-white/20 pt-5 sm:mt-10 sm:pt-8">
            <p className="text-[1.5rem] font-bold tracking-tight sm:text-[clamp(1.75rem,3.6vw,2.25rem)]">
              {INSTRUCTOR.nickname}
            </p>
            <p className="mt-1.5 max-w-xl text-base leading-[1.65] text-white/85 sm:mt-4 sm:text-[1.0625rem] sm:leading-[1.8]">
              {INSTRUCTOR.bioLines[0]} <br className="sm:hidden" />
              {INSTRUCTOR.bioLines[1]}
            </p>
          </Reveal>

          <ul aria-label="주요 이력" className="mt-8 grid gap-3 sm:mt-10 lg:grid-cols-3">
            {items.map((a, i) => {
              const Icon = ICONS[a.id] || PenLine;
              return (
                <Reveal as="li" key={a.id} delay={i * 70} className="flex items-start gap-4 rounded-[18px] bg-white/[0.08] p-5 ring-1 ring-white/15 lg:flex-col lg:gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-brand-orange">
                    <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.8125rem] font-semibold text-brand-orange">{a.kind}</p>
                    <p className="mt-0.5 font-bold leading-snug">{a.title}</p>
                    {a.sourceUrl && (
                      <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-link mt-2 text-sm text-white/90">
                        {a.sourceLabel}
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                        <span className="sr-only">(새 창)</span>
                      </a>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
