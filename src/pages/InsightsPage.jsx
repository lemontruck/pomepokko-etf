import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import PostCard from '../components/PostCard';
import PageCtaBand from '../components/PageCtaBand';
import { sortedPosts } from '../data/posts';
import { BLOG_URL } from '../config/site';
import { hrefFor, navigate } from '../lib/router';
import { initScrollDepth } from '../lib/analytics';

const ALL = '전체';

export default function InsightsPage() {
  const posts = useMemo(sortedPosts, []);
  const categories = useMemo(() => [ALL, ...new Set(posts.map((p) => p.category).filter(Boolean))], [posts]);
  const [active, setActive] = useState(ALL);
  const visible = active === ALL ? posts : posts.filter((p) => p.category === active);
  const home = hrefFor('landing');

  useEffect(() => initScrollDepth('insights'), []);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy pb-16 pt-12 text-white sm:pb-20 sm:pt-16">
        <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
        <div className="container-page">
          <a href={home} onClick={(e) => navigate(e, home)} className="text-link text-sm text-white/75 no-underline hover:underline">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> 랜딩페이지로 돌아가기
          </a>
          <h1 className="mt-8 text-[clamp(2rem,5.2vw,3.25rem)] font-bold leading-[1.2] tracking-tightest">ETF 투자 인사이트</h1>
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.75] text-white/70">
            ETF 투자에 필요한 정보를 정리한 글을 모았습니다.
          </p>
        </div>
      </section>

      <section aria-label="게시글 목록" className="bg-ivory py-14 sm:py-20">
        <div className="container-page">
          {posts.length > 0 && (
            <div role="group" aria-label="주제별 보기" className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  aria-pressed={active === c}
                  className={`min-h-[40px] rounded-full px-4 text-sm font-semibold transition ${
                    active === c ? 'bg-navy text-white' : 'bg-white text-ink ring-1 ring-ink/10 hover:ring-ink/30'
                  }`}
                >
                  {c}
                  {c !== ALL && <span className="num ml-1.5 opacity-60">{posts.filter((p) => p.category === c).length}</span>}
                </button>
              ))}
            </div>
          )}

          {visible.length > 0 ? (
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => (
                <li key={p.id} className="relative"><PostCard post={p} /></li>
              ))}
            </ul>
          ) : (
            <div className="rounded-[24px] bg-white p-8 ring-1 ring-ink/[0.07] sm:p-12">
              <h2 className="text-xl font-bold text-ink">아직 이 페이지에 정리된 글이 없습니다</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">
                출처를 확인한 글부터 순서대로 소개합니다. 지금은 네이버 블로그에서 최근 글을 바로 읽어볼 수 있어요.
              </p>
              <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className="text-link mt-6 text-teal">
                네이버 블로그에서 최근 글 읽기 <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">(새 창)</span>
              </a>
            </div>
          )}
        </div>
      </section>

      <PageCtaBand position="insights_list" />
    </>
  );
}
