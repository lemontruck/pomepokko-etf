import { useEffect } from 'react';
import { useRoute } from './lib/router';
import { POSTS } from './data/posts';
import LandingPage from './pages/LandingPage';
import InsightsPage from './pages/InsightsPage';
import PostDetailPage from './pages/PostDetailPage';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  const route = useRoute();

  useEffect(() => {
    const base = '포메뽀꼬 미국 ETF 강의 소개';
    document.title =
      route.name === 'landing'
        ? `미국 ETF 투자, 무엇부터 공부해야 할까요? | ${base}`
        : route.name === 'post' && POSTS.find((p) => p.id === route.id)
          ? `${POSTS.find((p) => p.id === route.id).title} | 포메뽀꼬`
          : `블로그 인사이트 | ${base}`;
  }, [route.name, route.id]);

  return (
    <>
      <a
        href="#main"
        onClick={(e) => { e.preventDefault(); const m = document.getElementById('main'); m?.focus(); m?.scrollIntoView(); }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy">
        본문으로 건너뛰기
      </a>
      <Header route={route} />
      <main id="main" tabIndex={-1} className="outline-none">
        {route.name === 'landing' && <LandingPage />}
        {route.name === 'insights' && <InsightsPage />}
        {route.name === 'post' && <PostDetailPage id={route.id} />}
      </main>
      <Footer />
    </>
  );
}
