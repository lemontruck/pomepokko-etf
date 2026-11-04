import { useEffect, useState } from 'react';
import { ROUTER_MODE } from '../config/site';
import { POSTS } from '../data/posts';

/**
 * 아주 작은 라우터.
 *  path 모드(Vercel):  /  ·  /insights  ·  /insights/:id
 *  hash 모드(단일 HTML): #insights  ·  #post-:id
 * 두 모드 모두 해석하므로 어느 주소로 들어와도 같은 화면이 열립니다.
 */
export function parseRoute() {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash === 'insights') return { name: 'insights' };
  if (POSTS.some((p) => p.id === hash)) return { name: 'post', id: hash }; // #etf-investment-guide
  if (hash.startsWith('post-')) return { name: 'post', id: hash.slice(5) }; // 이전 주소 호환
  const path = window.location.pathname.replace(/\/+$/, '');
  const last = path.split('/').pop();
  if (last && POSTS.some((p) => p.id === last)) return { name: 'post', id: last }; // /etf-investment-guide
  const m = path.match(/\/insights(?:\/([\w-]+))?$/);
  if (m) return m[1] ? { name: 'post', id: m[1] } : { name: 'insights' };
  return { name: 'landing' };
}

export function hrefFor(name, id) {
  if (ROUTER_MODE === 'hash') {
    if (name === 'insights') return '#insights';
    if (name === 'post') return `#${id}`;
    return '#top';
  }
  if (name === 'insights') return '/insights';
  if (name === 'post') return `/insights/${id}`;
  return '/';
}

export function navigate(e, href) {
  if (ROUTER_MODE === 'hash') return; // 기본 동작(hashchange)에 맡김
  if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;
  e?.preventDefault();
  window.history.pushState({}, '', href);
  window.dispatchEvent(new Event('app:navigate'));
}

export function useRoute() {
  const [route, setRoute] = useState(parseRoute);
  useEffect(() => {
    const update = () => {
      const next = parseRoute();
      setRoute((prev) => {
        if (prev.name !== next.name || prev.id !== next.id) {
          if (next.name !== 'landing' || prev.name !== 'landing') window.scrollTo(0, 0);
        }
        return next;
      });
    };
    window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);
    window.addEventListener('app:navigate', update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('hashchange', update);
      window.removeEventListener('app:navigate', update);
    };
  }, []);
  return route;
}
