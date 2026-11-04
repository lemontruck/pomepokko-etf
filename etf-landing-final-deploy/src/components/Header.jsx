import { useEffect, useState } from 'react';
import CtaButton from './CtaButton';
import { HEADER_BRAND, OPERATOR, ROUTER_MODE } from '../config/site';
import fireclubLogo from '../assets/03_fireclub_logo.png';
import { hrefFor, navigate } from '../lib/router';

const NAV = [
  { id: 'curriculum', label: '강의 내용' },
  { id: 'preview', label: '1강 미리보기' },
  { id: 'instructor', label: '강사 소개' },
];

export default function Header({ route }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const home = hrefFor('landing');
  const sectionHref = (id) => (route.name === 'landing' || ROUTER_MODE === 'hash' ? `#${id}` : `/#${id}`);
  const insights = hrefFor('insights');

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 bg-navy/90 backdrop-blur-md"
        style={{ height: 'env(safe-area-inset-top, 0px)' }}
      />
      <header
        className={`sticky z-50 border-b transition-colors duration-300 ${
          scrolled ? 'border-white/10 bg-navy/90 backdrop-blur-md' : 'border-transparent bg-navy'
        }`}
        style={{ top: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <a
            href={home}
            onClick={(e) => navigate(e, home)}
            className="flex min-w-0 items-center gap-2.5 text-white sm:gap-3"
            aria-label={`${HEADER_BRAND.left} ${HEADER_BRAND.mark} ${HEADER_BRAND.right} — ${OPERATOR.tagline} 홈`}
          >
            {/* 첨부 원본 PNG 그대로 사용 — 네이비 헤더에서 원형 배지 테두리가 묻히지 않도록 흰 원 위에 배치 */}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white p-[1.5px] shadow-[0_0_0_1px_rgba(255,255,255,.18)] sm:h-10 sm:w-10 sm:p-[2px]">
              <img src={fireclubLogo} alt={HEADER_BRAND.logoAlt} width="160" height="160" className="h-full w-full object-contain" />
            </span>
            <span className="truncate whitespace-nowrap text-[0.9375rem] font-bold tracking-tight sm:text-base">
              {HEADER_BRAND.left}
              <span aria-hidden="true" className="mx-1.5 font-semibold text-brand-orange">{HEADER_BRAND.mark}</span>
              {HEADER_BRAND.right}
            </span>
            <span className="hidden shrink-0 border-l border-white/20 pl-3 text-xs text-white/60 md:inline">{OPERATOR.tagline}</span>
          </a>
          <nav aria-label="페이지 안내" className="flex items-center gap-1">
            <ul className="mr-3 hidden items-center gap-6 lg:flex">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={sectionHref(n.id)} onClick={(e) => route.name !== 'landing' && navigate(e, sectionHref(n.id))} className="text-sm text-white/75 transition hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={insights}
                  onClick={(e) => navigate(e, insights)}
                  aria-current={route.name !== 'landing' ? 'page' : undefined}
                  className="text-sm text-white/75 transition hover:text-white aria-[current=page]:text-brand-orange"
                >
                  블로그 인사이트
                </a>
              </li>
            </ul>
            <CtaButton position="header" pageType={route.name === 'landing' ? 'landing' : 'insights'} size="sm" className="hidden sm:inline-flex" />
          </nav>
        </div>
      </header>
    </>
  );
}
