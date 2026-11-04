/**
 * 강사 이력 — 화면에는 verified: true 인 항목만 노출됩니다.
 * 문장 끝에는 마침표를 쓰지 않습니다 (기획안 규칙).
 * 투자 수익률·자산 규모·누적 강연 횟수·조회수는 넣지 않습니다.
 *
 * source: 노출 근거. sourceUrl 이 있으면 카드에 출처 링크가 표시됩니다.
 *   - 'capture' : 1강 수업 화면 자막에서 확인
 *   - 'brief'   : 광고주 통합 기획안(2026-11)에서 제공 — 배포 전 증빙 URL 확보 권장
 */
export const INSTRUCTOR = {
  name: '김지훈',
  nickname: '포메뽀꼬',
  bio: '직장인 출신 조기 은퇴자이자 『단 3개의 미국 ETF로 은퇴하라』의 저자',
  bioLines: ['직장인 출신 조기 은퇴자이자', '『단 3개의 미국 ETF로 은퇴하라』의 저자'], // 모바일 줄바꿈 단위
};

export const ACTIVITIES = [
  {
    id: 'book',
    kind: '저서',
    title: '『단 3개의 미국 ETF로 은퇴하라』 저자',
    sourceUrl: '', // TODO: 출판사 또는 서점 도서 페이지 URL
    sourceLabel: '도서 정보',
    source: 'capture',
    verified: true,
  },
  {
    id: 'talk',
    kind: '강연',
    title: '코엑스 머니쇼 및 현대·신세계백화점 문화센터 재테크 강연',
    sourceUrl: '', // TODO: 행사·강좌 안내 페이지 URL
    sourceLabel: '강연 정보',
    source: 'brief',
    verified: true,
  },
  {
    id: 'influencer',
    kind: '인플루언서',
    title: '네이버 경제 인플루언서 활동',
    sourceUrl: 'https://blog.naver.com/winter9377',
    sourceLabel: '블로그 방문하기',
    source: 'brief',
    verified: true,
  },
];
