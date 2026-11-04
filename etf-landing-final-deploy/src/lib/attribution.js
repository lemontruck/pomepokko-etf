import { ss } from './storage';

const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
const STORE = 'etf_lp_attribution';

/** 세션 첫 유입 시점의 UTM·클릭 ID를 저장 (이후 페이지 이동에도 유지) */
export function captureAttribution() {
  if (ss.get(STORE)) return;
  const params = new URLSearchParams(window.location.search);
  const data = {};
  KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) data[k] = v.slice(0, 150);
  });
  data.landing_referrer = document.referrer ? new URL(document.referrer).hostname : '';
  ss.set(STORE, JSON.stringify(data));
}

export function getAttribution() {
  let data = {};
  try { data = JSON.parse(ss.get(STORE) || '{}'); } catch { data = {}; }
  return { ...data, traffic_channel: classifyChannel(data) };
}

/** Meta / Google 광고 유입 구분 */
export function classifyChannel(d) {
  const src = (d.utm_source || '').toLowerCase();
  if (d.fbclid || ['facebook', 'fb', 'instagram', 'ig', 'meta'].includes(src)) return 'meta';
  if (d.gclid || ['google', 'youtube', 'gdn'].includes(src)) return 'google';
  if (src) return 'other_utm';
  if (d.landing_referrer) return 'referral';
  return 'direct';
}

/** UTM 파라미터만 추려서 반환 (FORWARD_UTM 옵션용) */
export function utmOnly() {
  const a = getAttribution();
  const out = {};
  KEYS.slice(0, 5).forEach((k) => { if (a[k]) out[k] = a[k]; });
  return out;
}
