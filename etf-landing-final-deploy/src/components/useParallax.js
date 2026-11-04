import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/useInView';

/** 미세 패럴랙스. 모바일(<768px)·움직임 줄이기 설정에서는 동작하지 않습니다. */
export function useParallax(strength = 0.06) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || window.innerWidth < 768) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.parentElement.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -strength;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [strength]);
  return ref;
}
