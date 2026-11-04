# 포메뽀꼬 미국 ETF 강의 소개 랜딩페이지

「누구나 성공할 수 있는 미국 ETF 투자법」 강의를 소개하고, CTA(**강의 보러가기**, 1화 미리보기 섹션만 **1화 무료 보러가기**)로 공식 강의 상세페이지
(https://fireclub.liveklass.com/classes/266958)에 방문하도록 설계한 프로모션 페이지입니다.

- React 18 + Vite 5 + Tailwind CSS 3 + Lucide Icons
- 애니메이션: 의존성 없는 IntersectionObserver + CSS (로딩 속도 우선, `prefers-reduced-motion` 대응)
- 페이지: `/` 랜딩 · `/insights` 블로그 목록 · `/insights/:id` (또는 `/etf-investment-guide`) 게시글 상세

## 0. 인계 메모 (Vercel 배포용)

- 운영 계정·운영 주체: **직장인 ETF 노트** / 강사: 포메뽀꼬 / 강의 판매·제공: 파이어클럽 / 라이브클래스
- 모든 전환 CTA → `https://fireclub.liveklass.com/classes/266958` (`src/config/site.js` 의 `COURSE_DETAIL_URL`)
- GA4 이벤트: `cta_detail_click` (`src/lib/analytics.js`, 파라미터 `cta_position` · `cta_text` · `destination_url` 등)
- 페이지 주소: `/` 랜딩 · `/insights` 글 목록 · `/insights/etf-investment-guide` 또는 `/etf-investment-guide` 아티클 (`vercel.json` rewrites 로 새로고침 대응)
- 아티클: 본문 `src/data/articles/etf-investment-guide.js`, 이미지 `src/assets/articles/*.webp`, 렌더러 `src/components/ArticleView.jsx`, 스타일 `src/styles/article.css`
- 배포 전 확인 목록: `CHECKLIST.md`

## 1. 실행

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # Vercel 배포용 → dist/
npm run build:single # 과제 제출용 단일 HTML → dist-single/index.html (이미지·CSS·JS 모두 포함, 해시 라우팅)
```

## 2. Vercel 배포

1. 이 폴더를 GitHub 저장소에 올립니다.
2. Vercel → Add New Project → 저장소 선택. Framework 는 Vite 로 자동 인식됩니다(`vercel.json` 포함).
3. Settings → Environment Variables 에 `.env.example` 의 값을 필요한 만큼 입력합니다.
4. Deploy. `/insights` 새로고침도 `vercel.json` 의 rewrite 로 정상 동작합니다.

CLI: `npm i -g vercel && vercel --prod`

## 3. 수정할 곳

| 무엇을 | 파일 |
|---|---|
| CTA URL·문구·위치별 문구, HERO 카피(기기별 줄바꿈), 운영 주체, 강의 정보, 고지 문구 | `src/config/site.js` (`COURSE_DETAIL_URL`, `CTA_LABELS`, `CTA_POSITIONS`, `HERO_COPY`) |
| 폰트 (미확정) | `src/index.css` 의 `--font-display`(HERO·최종 CTA 제목) / `--font-body`(본문) |
| 강사 소개·이력 | `src/data/instructor.js` — `verified: true` 인 항목만 노출, 문장 끝 마침표 없음 |
| 수강 후기 | `src/data/reviews.js` |
| 블로그 게시글 | `src/data/posts.js` — 실제 확인한 글만, 전문 복사 금지 |
| 강사 사진 / 1강 캡처 | `src/assets/01_instructor_profile.jpg`, `src/assets/02_episode01_capture.jpg` (같은 이름으로 교체) |
| 색·폰트 토큰 | `tailwind.config.js` |

## 4. 측정 (GA4 · GTM · Meta 픽셀)

모든 전환 버튼은 `src/components/CtaButton.jsx` 하나를 사용하며, 클릭 시 `cta_detail_click` 이벤트를 보냅니다.
전송 로직은 `src/lib/analytics.js` 에만 있습니다.

**이벤트 파라미터**

| 파라미터 | 의미 |
|---|---|
| `cta_position` | `header` · `hero` · `curriculum` · `preview` · `final` · `sticky` · `insights_list` · `insight_detail` |
| `cta_text` | 실제 버튼 문구 (`강의 보러가기` / `1화 무료 보러가기`) |
| `destination_url` | 이동 주소 (공식 강의 상세페이지) |
| `button_location` | 이전 버전 호환용 — `cta_position` 과 같은 값 |
| `page_type` | `landing` / `insights` |
| `cta_type` | `primary_course_detail` |
| `session_click_index` | 같은 세션에서 몇 번째 CTA 클릭인지 |
| `is_first_session_click` | 세션의 첫 클릭이면 `true` → **CTA 클릭 발생 세션 수** |
| `utm_source` … `utm_term`, `gclid`, `fbclid` | 세션 첫 유입 시점 값 |
| `traffic_channel` | `meta` · `google` · `other_utm` · `referral` · `direct` |
| `lp_session_id` | 페이지 자체 세션 ID (반복 클릭 분석용) |

중복 발화 방지: 같은 위치에서 700ms 안에 반복된 클릭(더블 탭)은 한 번만 전송합니다.
GTM과 GA4 ID를 함께 넣어도 gtag 직접 전송은 꺼지며, GTM에서 Meta 픽셀 태그를 쓰는 경우 `VITE_META_PIXEL_ID` 는 비워 두세요(픽셀 중복 방지).

보조 이벤트: `scroll_depth` (`percent_scrolled` 25/50/75/90), `blog_outbound_click`.

**GTM 권장 설정** (`VITE_GTM_ID` 입력)
1. 트리거: 맞춤 이벤트 `cta_detail_click`
2. 태그: GA4 이벤트 `cta_detail_click` — `cta_position`, `cta_text`, `destination_url` 등을 데이터 영역 변수로 연결
3. 태그: Meta 픽셀 `trackCustom` 또는 `Lead` 표준 이벤트 (선택)
4. GA4 관리 → 맞춤 정의에 `cta_position`, `cta_text`, `traffic_channel`, `is_first_session_click` 등록
5. GA4 관리 → 이벤트에서 `cta_detail_click` 을 주요 이벤트(전환)로 표시

GTM 없이 GA4만 쓸 경우 `VITE_GA4_ID` 만 입력하세요(전송 시 `transport_type: 'beacon'` 사용).
GTM과 GA4 ID를 둘 다 넣으면 GTM이 우선하며 gtag 직접 전송은 하지 않습니다(중복 집계 방지).

**KPI — 강의 상세페이지 이동 CTA 클릭률**

```
CTA 클릭 발생 세션 수 ÷ 전체 랜딩페이지 세션 수 × 100
```
- GA4 탐색 분석: 측정항목 `세션수`, 세그먼트 "이벤트 `cta_detail_click` 이 있는 세션" ÷ 전체 세션
- 또는 `is_first_session_click = true` 인 `cta_detail_click` 수 ÷ 세션수
- 채널별: 측정기준 `세션 소스/매체` 또는 `traffic_channel`

**외부 이동 시 이벤트 누락 방지**: CTA는 일반 `<a>` 링크로 이동을 지연시키지 않고, 클릭 순간 dataLayer 에 동기 push 합니다.
GTM의 GA4 태그는 기본적으로 beacon 전송을 사용합니다. 그래도 누락이 보이면 `.env` 에 `VITE_CTA_NEW_TAB=true` 로 새 탭 열기를 쓸 수 있습니다.

**UTM 규칙(권장)**

| 채널 | 예시 |
|---|---|
| Meta | `?utm_source=meta&utm_medium=paid_social&utm_campaign=etf_course_2026q4&utm_content=hero_video_a` |
| Google | `?utm_source=google&utm_medium=cpc&utm_campaign=etf_course_2026q4&utm_term={keyword}` |

`VITE_FORWARD_UTM=true` 로 설정하면 이 UTM을 강의 상세페이지 URL에 그대로 붙여 보냅니다(기본값 꺼짐 — 모든 CTA가 정확히 같은 URL).

## 5. 단일 HTML 빌드의 차이

- 주소: `#insights`, `#post-:id` (해시 라우팅)
- CTA는 새 탭으로 열립니다 (미리보기 환경에서 외부 이동이 막히지 않도록)
- Pretendard 웹폰트를 불러올 수 없는 환경에서는 시스템 한글 폰트로 표시됩니다

## 5-1. 미리보기 폰트

미리보기 호스팅은 jsDelivr 폰트를 막으므로, 검수용 단일 HTML에만 Pretendard 서브셋을 넣습니다: `npm run build:single && python scripts/preview_embed_font.py <PretendardVariable.woff2>`. Vercel 배포본은 기존 CDN 방식 그대로입니다.

## 6. 폰트 라이선스

- Pretendard — SIL Open Font License 1.1 (jsDelivr CDN)
- Inter — SIL Open Font License 1.1 (Google Fonts)
