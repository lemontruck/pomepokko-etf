import CtaButton from './CtaButton';
import { COURSE, RISK_NOTICE } from '../config/site';

export default function PageCtaBand({ position }) {
  return (
    <section aria-labelledby="band-title" className="bg-navy py-16 text-white sm:py-20">
      <div className="container-page flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="band-title" className="text-2xl font-bold tracking-tight sm:text-3xl">미국 ETF 투자 공부, 지금 시작해 보세요.</h2>
          <p className="mt-3 text-white/70">
            {COURSE.title}
            <span className="ml-2 text-white/50">{COURSE.lessons}, {COURSE.duration}, {COURSE.period}</span>
          </p>
          <p className="mt-4 max-w-lg text-xs leading-relaxed text-white/50">{RISK_NOTICE}</p>
        </div>
        <CtaButton position={position} pageType="insights" size="lg" className="shrink-0 self-start md:self-auto" />
      </div>
    </section>
  );
}
