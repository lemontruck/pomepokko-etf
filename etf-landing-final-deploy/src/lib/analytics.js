/**
 * 측정 레이어 — 페이지 코드는 track()만 호출하고, 전송 방식은 이 파일에서만 관리합니다.
 *
 *  · GTM:   window.dataLayer 로 push (권장. GTM에서 GA4 이벤트 태그·Meta 픽셀 태그로 연결)
 *  · GA4:   VITE_GA4_ID 를 넣었고 GTM을 쓰지 않을 때만 gtag 로 직접 전송 (중복 집계 방지)
 *  · Meta:  VITE_META_PIXEL_ID 가 있으면 fbq('trackCustom') 로 직접 전송
 *
 * 외부 페이지 이동 시 누락 방지: GA4 는 transport_type 'beacon', 그 외에는 동기 dataLayer push 후
 * 브라우저 기본 링크 이동을 그대로 사용합니다(이동을 지연시키지 않음).
 */
import { ss } from './storage';
import { captureAttribution, getAttribution } from './attribution';
import { CTA_EVENT_NAME } from '../config/site';

const env = import.meta.env;
const GTM_ID = env.VITE_GTM_ID;
const GA4_ID = env.VITE_GA4_ID;
const PIXEL_ID = env.VITE_META_PIXEL_ID;

function loadScript(src) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export function initAnalytics() {
  captureAttribution();
  window.dataLayer = window.dataLayer || [];

  if (GTM_ID) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
  } else if (GA4_ID) {
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`);
  }

  if (PIXEL_ID && !window.fbq) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }
}

/** 세션 단위 식별자 — 반복 클릭과 '클릭 발생 세션'을 구분하기 위해 사용 */
function sessionId() {
  let id = ss.get('etf_lp_sid');
  if (!id) {
    id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    ss.set('etf_lp_sid', id);
  }
  return id;
}

export function track(name, params = {}) {
  const payload = { ...params, ...getAttribution(), lp_session_id: sessionId() };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });
  if (!GTM_ID && GA4_ID && typeof window.gtag === 'function') {
    window.gtag('event', name, { ...payload, transport_type: 'beacon' });
  }
  if (PIXEL_ID && typeof window.fbq === 'function') {
    window.fbq('trackCustom', name, payload);
  }
  if (import.meta.env.DEV) console.info('[track]', name, payload);
}

/**
 * 전환 CTA 클릭.
 *  cta_position / cta_text / destination_url  — 기획안 권장 파라미터
 *  button_location                             — 기존 보고서 호환용 (cta_position 과 같은 값)
 *  is_first_session_click = true 인 이벤트 수 = 'CTA 클릭이 발생한 세션 수'
 *  session_click_index    = 같은 세션 안에서 몇 번째 클릭인지 (반복 클릭 분석)
 *
 * 중복 발화 방지: 같은 위치에서 700ms 안에 다시 들어온 클릭(더블 탭·더블 클릭)은 한 번만 보냅니다.
 */
let lastClick = { key: '', at: 0 };
export function trackCtaClick({ pageType, position, text, destination }) {
  const now = Date.now();
  const key = `${pageType}:${position}`;
  if (lastClick.key === key && now - lastClick.at < 700) return;
  lastClick = { key, at: now };

  const prev = parseInt(ss.get('etf_lp_cta_clicks') || '0', 10) || 0;
  const index = prev + 1;
  ss.set('etf_lp_cta_clicks', String(index));
  track(CTA_EVENT_NAME, {
    cta_position: position,
    cta_text: text,
    destination_url: destination,
    page_type: pageType,
    button_location: position,
    cta_type: 'primary_course_detail',
    session_click_index: index,
    is_first_session_click: index === 1,
  });
}

/** 보조 지표: 스크롤 깊이 (25/50/75/90%) — 페이지당 1회씩 */
export function initScrollDepth(pageType) {
  const marks = [25, 50, 75, 90];
  const sent = new Set();
  let ticking = false;
  const check = () => {
    ticking = false;
    const h = document.documentElement;
    const max = h.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    const pct = (window.scrollY / max) * 100;
    marks.forEach((m) => {
      if (pct >= m && !sent.has(m)) {
        sent.add(m);
        track('scroll_depth', { page_type: pageType, percent_scrolled: m });
      }
    });
  };
  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(check); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}
