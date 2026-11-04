/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#102D43', deep: '#0D293C', mid: '#13354D', line: '#1E4560' }, // 블루네이비 팔레트
        teal: { DEFAULT: '#176F66', deep: '#0F5650', soft: '#D7E8E4' },
        gold: { DEFAULT: '#D4A85B', soft: '#E8CC95', ink: '#7A5A1E' }, // 이전 포인트 컬러 (HERO 코인 외 미사용)
        // FIRECLUB 브랜드 — 포인트 오렌지 #FE6806 로 확정
        mint: { DEFAULT: '#86FBD4', deep: '#22A88A' }, // 서브 포인트 (HERO 그라데이션 민트)
        brand: {
          orange: '#FE6806', // 포인트 컬러 (텍스트·아이콘·장식)
          cta: '#FE6806', // CTA 배경 (흰 글자 대비 2.92:1 — 보고서 참고)
          'cta-hover': '#E85D04', // 같은 계열의 조금 어두운 오렌지 (흰 글자 3.50:1)
          navy: '#0F1435', // 로고 네이비
          blue: '#17204F', // 넓은 면적용 블루네이비 (강사 소개 배경)
        },
        ivory: { DEFAULT: '#F5F2E9', deep: '#ECE7D9' },
        ink: { DEFAULT: '#0C2732', muted: '#4B5F66' },
      },
      fontFamily: {
        // 폰트는 src/index.css 의 --font-body / --font-display 변수만 바꾸면 전체에 반영됩니다.
        sans: ['var(--font-body)'],
        display: ['var(--font-display)'],
        num: ['Inter', 'Pretendard Variable', 'Pretendard', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '1200px' },
      letterSpacing: { tightest: '-0.045em', tighter2: '-0.03em' },
    },
  },
  plugins: [],
};
