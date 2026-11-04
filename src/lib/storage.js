// 사파리 사생활 보호 모드 등에서 저장소 접근이 실패해도 페이지가 멈추지 않도록 감쌉니다.
export const ss = {
  get(key) {
    try { return window.sessionStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { window.sessionStorage.setItem(key, value); } catch { /* noop */ }
  },
};
