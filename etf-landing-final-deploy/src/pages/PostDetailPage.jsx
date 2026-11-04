import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import CardGraphic from '../components/CardGraphic';
import ArticleView from '../components/ArticleView';
import PageCtaBand from '../components/PageCtaBand';
import { POSTS } from '../data/posts';
import { hrefFor, navigate } from '../lib/router';
import { initScrollDepth, track } from '../lib/analytics';

export default function PostDetailPage({ id }) {
  const post = POSTS.find((p) => p.id === id);
  const list = hrefFor('insights');
  useEffect(() => initScrollDepth('insight_detail'), []);

  if (!post) {
    return (
      <section className="bg-ivory py-24">
        <div className="container-page">
          <h1 className="text-2xl font-bold text-ink">요청한 글을 찾을 수 없습니다</h1>
          <p className="mt-3 text-ink-muted">주소가 바뀌었거나 목록에서 내려간 글입니다. 블로그 인사이트 목록에서 다른 글을 확인해 주세요.</p>
          <a href={list} onClick={(e) => navigate(e, list)} className="text-link mt-6 text-teal">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> 블로그 인사이트 목록으로
          </a>
        </div>
      </section>
    );
  }

  if (post.body) {
    return (
      <>
        <ArticleView post={post} back={list} />
        <PageCtaBand position="insight_detail" />
      </>
    );
  }

  return (
    <>
      <article className="bg-ivory pb-20 pt-12 sm:pt-16">
        <div className="container-page max-w-3xl">
          <a href={list} onClick={(e) => navigate(e, list)} className="text-link text-sm text-ink-muted no-underline hover:underline">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> 블로그 인사이트 목록으로
          </a>
          <p className="mt-8 text-sm text-ink-muted">
            <span className="font-semibold text-teal">{post.category}</span>
            <time className="num ml-2" dateTime={post.date}>{post.date.replaceAll('-', '.')}</time>
          </p>
          <h1 className="mt-3 text-[clamp(1.875rem,4.4vw,2.75rem)] font-bold leading-[1.28] tracking-tighter2 text-ink">{post.title}</h1>
          <div className="mt-8 aspect-[16/9] overflow-hidden rounded-[20px] bg-ivory-deep">
            {post.thumbnail ? <img src={post.thumbnail} alt="" className="h-full w-full object-cover" /> : <div className="h-full p-10"><CardGraphic kind="horizon" /></div>}
          </div>
          <p className="mt-8 text-lg leading-[1.85] text-ink">{post.summary}</p>
          <div className="mt-10 rounded-[20px] bg-white p-6 ring-1 ring-ink/[0.07]">
            <p className="text-sm leading-relaxed text-ink-muted">글 전문은 작성자의 네이버 블로그 원문에서 읽을 수 있습니다.</p>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('blog_outbound_click', { page_type: 'insight_detail', post_id: post.id })}
              className="text-link mt-3 text-teal"
            >
              네이버 블로그에서 원문 읽기 <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only">(새 창)</span>
            </a>
          </div>
        </div>
      </article>
      <PageCtaBand position="insight_detail" />
    </>
  );
}
