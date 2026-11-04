/**
 * ─────────────────────────────────────────────────────────────
 *  사이트 설정 — 운영 전 이 파일의 TODO 항목을 반드시 확인하세요.
 * ─────────────────────────────────────────────────────────────
 */

/** 유일한 전환 CTA의 목적지. 모든 '강의 보러가기' 버튼이 이 값을 사용합니다. */
export const COURSE_DETAIL_URL = 'https://fireclub.liveklass.com/classes/266958';

/**
 * CTA 문구 — 모든 CTA는 COURSE_DETAIL_URL 로 이동합니다.
 * ClassPreview(1화 미리보기) 섹션만 preview 문구를 사용하고, 나머지는 모두 default 입니다.
 */
export const CTA_LABELS = {
  default: '강의 보러가기',
  preview: '1화 무료 보러가기',
};
/** 하위 호환용 — 기본 CTA 문구 */
export const CTA_LABEL = CTA_LABELS.default;

/**
 * CTA 위치(cta_position) — GA4 보고서에서 쓰는 위치 이름.
 * 각 위치의 문구 종류(labelKey)도 여기서 관리합니다.
 */
export const CTA_POSITIONS = {
  header: { position: 'header', labelKey: 'default' },
  hero: { position: 'hero', labelKey: 'default' },
  curriculum: { position: 'curriculum', labelKey: 'default' },
  preview: { position: 'preview', labelKey: 'preview' },
  final: { position: 'final', labelKey: 'default' },
  sticky: { position: 'sticky', labelKey: 'default' },
  insights_list: { position: 'insights_list', labelKey: 'default' },
  insight_detail: { position: 'insight_detail', labelKey: 'default' },
};

/**
 * HERO 카피 — PC(768px 이상)는 HTML 텍스트, 모바일은 이미지(05_hero_mobile.webp)로 표시합니다.
 * gradientLine: 그라데이션을 적용할 줄 번호(0부터)
 */
export const HERO_COPY = {
  tag: '미국 ETF 투자 클래스',
  titleDesktop: ['종목 분석할 시간은 없고,', '미래 준비는 해야겠다면?'],
  gradientLine: 1,
  mobileImageAlt: '팔짱을 낀 포메뽀꼬 강사 사진과 민트색 원형 배경, 골드 코인 그래픽',
  sub: '미국 ETF 투자, 무엇부터 배워야 할까요?',
};

/** 전환 이벤트명 (GA4 / GTM / Meta Pixel 공통) */
export const CTA_EVENT_NAME = 'cta_detail_click';

export const CTA_NEW_TAB = import.meta.env.VITE_CTA_NEW_TAB === 'true';
export const FORWARD_UTM = import.meta.env.VITE_FORWARD_UTM === 'true';
export const ROUTER_MODE = import.meta.env.VITE_ROUTER_MODE === 'hash' ? 'hash' : 'path';

/**
 * 페이지 운영 정보 — 역할 구분
 *  · 운영 계정·운영 주체: 직장인 ETF 노트 (이 소개 페이지를 만든 계정)
 *  · 강사: 포메뽀꼬 (COURSE.instructor)
 *  · 강의 판매·제공: 파이어클럽 / 라이브클래스 (COURSE.provider)
 */
export const OPERATOR = {
  name: '직장인 ETF 노트', // 운영 계정명 겸 팀명
  entity: '직장인 ETF 노트', // 운영 주체
  type: '금융·투자 교육 콘텐츠 큐레이션 계정',
  tagline: '직장인 ETF 노트', // 헤더 오른쪽 표기
  intro: '바쁜 직장인을 위한 미국 ETF 기초 정보와 투자 교육 콘텐츠 소개',
  purpose: '미국 ETF 입문 강의 소개 · 교육 과정 광고 실습',
  contact: '', // TODO: 문의 이메일 등 (선택)
};

/** 헤더 브랜드 표기 — [파이어클럽 로고] 포메뽀꼬 X 파이어클럽 */
export const HEADER_BRAND = {
  left: '포메뽀꼬',
  mark: 'X',
  right: '파이어클럽',
  logoAlt: '파이어클럽 로고',
};

/** 소개 강의 정보 — TODO: 배포 직전 공식 상세페이지와 다시 대조 */
export const COURSE = {
  title: '누구나 성공할 수 있는 미국 ETF 투자법',
  instructor: '김지훈(포메뽀꼬)',
  provider: '파이어클럽 / 라이브클래스',
  lessons: '총 16강',
  duration: '총 3시간 53분',
  period: '180일 수강',
  format: '온라인 녹화 강의',
};

/** 1강 미리보기 정보 (첨부 이미지 2) */
export const PREVIEW_LESSON = {
  number: '1강',
  title: '우리는 왜 투자해야 할까?',
  runtime: '13분',
};

export const BLOG_URL = 'https://blog.naver.com/winter9377';

/** 투자 유의 문구 — 화면 표시용 의미 단위 줄 */
export const RISK_NOTICE_LINES = ['본 콘텐츠는 투자 교육을 목적으로 하며', '투자 성과를 보장하지 않습니다.', '금융상품 투자에는 원금 손실 위험이 있습니다.'];

export const RISK_NOTICE =
  '본 콘텐츠는 투자 교육을 목적으로 하며 투자 성과를 보장하지 않습니다. 금융상품 투자에는 원금 손실 위험이 있습니다.';

export const PROMO_NOTICE =
  '포메뽀꼬의 미국 ETF 투자 교육 강의를 소개하는 프로모션 페이지입니다.';
