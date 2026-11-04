import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build`        → Vercel 배포용 일반 빌드 (dist/)
// `npm run build:single` → 이미지·CSS·JS가 모두 포함된 단일 HTML (dist-single/index.html, 과제 제출·미리보기용)
export default defineConfig(({ mode }) => {
  const single = mode === 'single';
  return {
    plugins: [react(), ...(single ? [viteSingleFile()] : [])],
    build: {
      outDir: single ? 'dist-single' : 'dist',
      assetsInlineLimit: single ? 100000000 : 4096,
    },
  };
});
