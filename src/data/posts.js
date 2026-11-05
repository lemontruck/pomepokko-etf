/**
 * 블로그 게시글 (https://blog.naver.com/winter9377)
 *
 * 실제로 확인한 게시글만 추가하세요. 본문 게시 권한이 없으므로 전문을 복사하지 않고
 * 제목 · 작성일 · 썸네일 · 간략한 소개(직접 요약) · 원문 URL · 카테고리만 저장합니다.
 *
 * 형식 예시 (아래는 형식 설명용이며 실제 게시글이 아닙니다):
 * {
 *   id: 'post-slug',               // 영문·숫자·하이픈 (주소에 사용: /insights/post-slug)
 *   title: '게시글 제목 원문 그대로',
 *   date: '2026-10-21',            // YYYY-MM-DD
 *   thumbnail: '',                 // 사용 권한이 확인된 이미지 경로 (없으면 추상 그래픽 표시)
 *   summary: '직접 작성한 2~3문장 요약',
 *   url: 'https://blog.naver.com/winter9377/게시글번호',
 *   category: 'ETF 기초',          // 예: ETF 기초 · 미국지수 · 배당 ETF · 장기 투자
 * }
 *
 * 메인 페이지에는 date 기준 최신 3개가 노출됩니다.
 */
import { etfInvestmentGuide } from './articles/etf-investment-guide';
import { usEtfInvestmentGuide } from './articles/us-etf-investment-guide';

/** body 가 있는 글은 자체 아티클 페이지, 없는 글은 원문 링크형 상세 페이지로 표시됩니다. */
export const POSTS = [usEtfInvestmentGuide, etfInvestmentGuide];

export const sortedPosts = () => [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
