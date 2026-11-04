import { OPERATOR, COURSE, RISK_NOTICE, BLOG_URL } from '../config/site';

export default function Footer() {
  return (
    <footer className="bg-navy-deep pb-28 pt-14 text-white/70 md:pb-14">
      <div className="container-page grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-base font-bold text-white">{OPERATOR.name}</p>
          <p className="mt-1 text-sm">{OPERATOR.type}</p>
        </div>
        <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-[auto_1fr] md:col-span-7">
          <dt className="text-white/50">운영 계정</dt>
          <dd className="text-white/85">{OPERATOR.name}</dd>
          <dt className="text-white/50">계정 소개</dt>
          <dd className="text-white/85">{OPERATOR.intro}</dd>
          <dt className="text-white/50">운영 주체</dt>
          <dd className="text-white/85">{OPERATOR.entity}</dd>
          <dt className="text-white/50">광고 목적</dt>
          <dd className="text-white/85">{OPERATOR.purpose}</dd>
          <dt className="text-white/50">소개 강의</dt>
          <dd className="text-white/85">{COURSE.title}</dd>
          <dt className="text-white/50">강사</dt>
          <dd className="text-white/85">{COURSE.instructor}</dd>
          <dt className="text-white/50">강의 판매·제공처</dt>
          <dd className="text-white/85">{COURSE.provider}</dd>
        </dl>
      </div>
      <div className="container-page mt-10 space-y-2 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/55">
        <p>
          이 페이지는 {OPERATOR.entity}가 강의 소개를 위해 별도로 제작한 프로모션 페이지이며, 강사 또는 강의 제공처의
          공식 사이트가 아닙니다. 강의 구매·환불·수강 문의는 공식 강의 상세페이지에서 확인해 주세요.
        </p>
        <p>{RISK_NOTICE} 강의 내용은 투자 교육 정보이며 특정 금융상품의 매수·매도 권유나 투자 자문이 아닙니다.</p>
        <p>
          강사 블로그:{' '}
          <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className="text-link text-white/75">
            blog.naver.com/winter9377<span className="sr-only">(새 창)</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
