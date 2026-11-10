import { ArrowRight } from 'lucide-react';
import { COURSE_DETAIL_URL, CTA_LABELS, MOBILE_CTA_LABELS, CTA_POSITIONS, CTA_NEW_TAB, FORWARD_UTM } from '../config/site';
import { trackCtaClick } from '../lib/analytics';
import { utmOnly } from '../lib/attribution';

function buildUrl() {
  if (!FORWARD_UTM) return COURSE_DETAIL_URL;
  try {
    const url = new URL(COURSE_DETAIL_URL);
    Object.entries(utmOnly()).forEach(([k, v]) => url.searchParams.set(k, v));
    return url.toString();
  } catch {
    return COURSE_DETAIL_URL;
  }
}

/**
 * 전환 CTA. 모든 CTA는 COURSE_DETAIL_URL 로 이동합니다.
 * position: config/site.js 의 CTA_POSITIONS 키 (hero, curriculum, preview, final, sticky …)
 *           → 문구(CTA_LABELS)와 GA4 cta_position 이 여기서 결정됩니다.
 * 기본 링크 동작을 막지 않으므로 이동이 지연되지 않고, 클릭 이벤트는 이동 직전에 동기 전송됩니다.
 */
export default function CtaButton({ position, pageType = 'landing', size = 'md', className = '', id, label: labelOverride, newTab = CTA_NEW_TAB }) {
  const conf = CTA_POSITIONS[position] || { position, labelKey: 'default' };
  const label = labelOverride || CTA_LABELS[conf.labelKey] || CTA_LABELS.default; // 아티클 CTA는 글 맥락 문구 사용
  const mobileLabel = pageType === 'landing' ? MOBILE_CTA_LABELS[position] : null;
  const sizeClass = size === 'lg' ? 'cta-lg' : size === 'sm' ? 'cta-sm' : '';
  return (
    <a
      id={id}
      href={COURSE_DETAIL_URL}
      onClick={(e) => {
        const href = buildUrl();
        if (FORWARD_UTM) e.currentTarget.href = href;
        const text = mobileLabel && window.matchMedia('(max-width: 767px)').matches ? mobileLabel : label;
        trackCtaClick({ pageType, position: conf.position, text, destination: href });
      }}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener' : undefined}
      className={`cta ${sizeClass} ${className}`}
      data-cta="course-detail"
      data-cta-position={conf.position}
    >
      <span className="relative">{mobileLabel ? <><span className="md:hidden">{mobileLabel}</span><span className="hidden md:inline">{label}</span></> : label}</span>
      <ArrowRight aria-hidden="true" className="cta-arrow relative h-[1.1em] w-[1.1em]" strokeWidth={2.4} />
      {newTab && <span className="sr-only">(새 창에서 공식 강의 상세페이지 열림)</span>}
    </a>
  );
}
