import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import PostCard from '../components/PostCard';
import { sortedPosts } from '../data/posts';
import { BLOG_URL } from '../config/site';
import { hrefFor, navigate } from '../lib/router';

export default function InsightsPreview() {
  const posts = sortedPosts().slice(0, 3);
  const insights = hrefFor('insights');
  return (
    <section id="insights-preview" aria-labelledby="b-title" className="bg-white py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal as="h2" id="b-title" className="text-[clamp(1.875rem,4.6vw,2.9rem)] font-bold leading-[1.28] tracking-tighter2 text-ink">
              <span className="block">투자가 어렵다면?</span> <span className="block">이 글부터 읽어보세요</span>
            </Reveal>
            <Reveal as="p" delay={80} className="mt-4 text-[1.0625rem] leading-relaxed text-ink-muted sm:text-lg">
              미국 ETF 투자에 필요한 기초 정보를 <br className="sm:hidden" />
              한눈에 살펴볼 수 있도록 정리했어요.
            </Reveal>
          </div>
          <Reveal delay={100} className="flex flex-wrap gap-x-6 gap-y-2 text-ink lg:col-span-4 lg:justify-end">
            {posts.length > 0 && (
              <a href={insights} onClick={(e) => navigate(e, insights)} className="text-link">
                블로그 글 더 보기 <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            )}
          </Reveal>
        </div>

        {posts.length > 0 ? (
          <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 100} className="relative">
                <PostCard post={p} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="mt-10 grid gap-6 rounded-[24px] bg-ivory p-6 sm:mt-12 sm:gap-8 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold text-teal">blog.naver.com/winter9377</p>
              <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-ink sm:text-lg">
                포메뽀꼬는 네이버 블로그에 미국 ETF와 장기 투자에 관한 생각을 기록하고 있습니다. 최근 글은 블로그에서 바로 읽어볼 수 있어요.
              </p>
            </div>
            <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className="text-link min-h-[44px] justify-self-start text-[1.0625rem] text-ink sm:text-lg">
              블로그에서 최근 글 읽기 <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
              <span className="sr-only">(새 창)</span>
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
