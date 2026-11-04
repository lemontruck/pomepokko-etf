import CardGraphic from './CardGraphic';
import { hrefFor, navigate } from '../lib/router';

const GRAPHIC_BY_CATEGORY = { 'ETF 기초': 'basket', 미국지수: 'indexes', '배당 ETF': 'rhythm', '장기 투자': 'horizon' };

export default function PostCard({ post }) {
  const href = hrefFor('post', post.id);
  return (
    <article className="group flex h-full overflow-hidden rounded-[18px] bg-white ring-1 ring-ink/[0.08] transition hover:ring-teal/40 sm:flex-col sm:rounded-[20px]">
      <div className="w-[108px] shrink-0 self-stretch overflow-hidden bg-ivory-deep/70 sm:aspect-[16/10] sm:w-auto sm:self-auto">
        {post.thumbnail ? (
          <img src={post.thumbnail} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        ) : (
          <div className="h-full p-3 sm:p-6"><CardGraphic kind={GRAPHIC_BY_CATEGORY[post.category] || 'horizon'} /></div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
        <p className="text-[0.8125rem] text-ink-muted">
          <span className="font-semibold text-teal">{post.category}</span>
          <time className="num ml-2" dateTime={post.date}>{post.date.replaceAll('-', '.')}</time>
        </p>
        <h3 className="mt-1.5 text-base font-bold leading-snug text-ink sm:mt-2 sm:text-lg">
          <a href={href} onClick={(e) => navigate(e, href)} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </a>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted sm:mt-2 sm:line-clamp-3 sm:text-[0.9375rem]">{post.summary}</p>
      </div>
    </article>
  );
}
