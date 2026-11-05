/**
 * 아티클 상세 렌더러 — body 블록 배열을 그대로 그립니다.
 * (pomepokko-etf-article-source 의 ArticleRenderer.js 를 React 컴포넌트로 이관)
 * 블록: ['p'] ['lead'] ['note'] ['h2'] ['h3'] ['pt'] ['ul'] ['check'] ['ol'] ['table'] ['img'] ['cta'] ['hr'] ['toc']
 */
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import CtaButton from './CtaButton';
import { ARTICLE_IMAGES } from '../data/articles/images';
import { navigate } from '../lib/router';
import { prefersReducedMotion } from '../lib/useInView';
import '../styles/article.css';

const sid = (i) => `sec-${i}`;

// 원문 내 **강조** 표현을 실제 굵은 글씨로 표시
function richText(value) {
  if (typeof value !== 'string') return value;
  return value.split(/(\*\*[^*]+\*\*|==[^=]+==)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('==') && part.endsWith('==')) return <mark key={i} className="ea-highlight">{part.slice(2, -2)}</mark>;
    return part;
  });
}

function Table({ t }) {
  return (
    <figure className="ea-fig">
      <div className="ea-tw">
        <table className="ea-table">
          <thead>
            <tr>{t.head.map((x, i) => <th key={i} scope="col">{x}</th>)}</tr>
          </thead>
          <tbody>
            {t.rows.map((r, ri) => (
              <tr key={ri}>
                {r.map((c, ci) => {
                  const cl = typeof c === 'object' ? c : { text: c };
                  return ci === 0 ? (
                    <th key={ci} scope="row">{richText(cl.text)}</th>
                  ) : (
                    <td key={ci} colSpan={cl.span || 1} className={cl.span ? 'ea-span' : undefined}>{richText(cl.text)}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {t.note && <figcaption className="ea-note">※ {t.note}</figcaption>}
    </figure>
  );
}

export default function ArticleView({ post, back }) {
  // 글 상세에서만 meta description 을 글 설명으로 바꾸고, 나가면 되돌림
  useEffect(() => {
    const m = document.querySelector('meta[name="description"]');
    const prev = m && m.getAttribute('content');
    if (m && post.seoDescription) m.setAttribute('content', post.seoDescription);
    document.title = `${post.title} | 포메뽀꼬`;
    return () => { if (m && prev != null) m.setAttribute('content', prev); };
  }, [post]);

  const h2s = post.body.map((x, i) => [x, i]).filter(([x]) => x[0] === 'h2');

  const blocks = post.body.map((x, i) => {
    const [t, a, c, d] = x;
    switch (t) {
      case 'p': return <p key={i}>{richText(a)}</p>;
      case 'link': return <p key={i}><a href={c} className="text-inherit underline underline-offset-4 decoration-ink/50 hover:decoration-ink">{richText(a)}</a></p>;
      case 'lead': return <p key={i} className="ea-lead">{richText(a)}</p>;
      case 'note': return <p key={i} className="ea-note ea-note-p">※ {a}</p>;
      case 'h2': return <h2 key={i} id={sid(i)}>{a}</h2>;
      case 'h3': return <h3 key={i}>{a}</h3>;
      case 'pt': return <div key={i} className="ea-pt"><p className="ea-pt-t">{a}</p><p>{c}</p></div>;
      case 'ul': return <ul key={i} className="ea-ul">{a.map((y, j) => <li key={j}>{richText(y)}</li>)}</ul>;
      case 'check':
        return (
          <ul key={i} className="ea-check">
            {a.map((y, j) => <li key={j}><span aria-hidden="true" /><span>{y}</span></li>)}
          </ul>
        );
      case 'ol':
        return (
          <ol key={i} className="ea-ol">
            {a.map(([ti, de], j) => (
              <li key={j}><span className="ea-num num">{j + 1}</span><div><strong>{ti}</strong><span>{de}</span></div></li>
            ))}
          </ol>
        );
      case 'table': return <Table key={i} t={a} />;
      case 'img':
        return ARTICLE_IMAGES[a] ? (
          <figure key={i} className="ea-img">
            <img src={ARTICLE_IMAGES[a]} alt={c} width="1024" height="1024" loading="lazy" decoding="async" />
          </figure>
        ) : null;
      case 'cta':
        // 아티클 CTA: 글 맥락에 맞춘 문구 + 공식 강의 상세페이지 (새 창) — cta_detail_click 동일 측정
        return (
          <aside key={i} className="ea-cta">
            <p>{a}</p>
            <CtaButton position={d} pageType="insight_detail" label={c} newTab />
          </aside>
        );
      case 'hr': return <hr key={i} className="ea-hr" />;
      case 'toc':
        return (
          <nav key={i} aria-label="목차" className="ea-toc">
            <p className="ea-toc-t">목차</p>
            <ol>
              {h2s.map(([hh, hi], n) => (
                <li key={hi}>
                  <span className="num">{n + 1}.</span>
                  <a
                    href={`#${sid(hi)}`}
                    onClick={(ev) => {
                      ev.preventDefault();
                      document.getElementById(sid(hi))?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
                    }}
                  >
                    {hh[1]}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        );
      default: return null;
    }
  });

  return (
    <article className="bg-ivory pb-20 pt-12 sm:pt-16">
      <div className="container-page max-w-3xl">
        <a href={back} onClick={(e) => navigate(e, back)} className="text-link text-sm text-ink-muted no-underline hover:underline">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> 블로그 인사이트 목록으로
        </a>
        <p className="mt-8 text-sm text-ink-muted">
          <span className="font-semibold text-teal">{post.category}</span>
          <time className="num ml-2" dateTime={post.date}>{post.date.replaceAll('-', '.')}</time>
        </p>
        <h1 className="mt-3 text-[clamp(1.875rem,4.4vw,2.75rem)] font-bold leading-[1.28] tracking-tighter2 text-ink">{post.title}</h1>
        <div className={`etf-article${post.id === 'etf-selection-criteria' ? ' etf-article--criteria' : ''}`}>{blocks}</div>
        <div className="ea-disc">
          <p>{post.disclaimer}</p>
          {post.checkedAt && <p className="ea-disc-d">정보 확인 기준일: {post.checkedAt}</p>}
        </div>
      </div>
    </article>
  );
}
