import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Check, MessageCircle } from "lucide-react";

const CANONICAL = "https://nqsolution.kr/pyeongtaek-web-development";

const AREAS = ["평택시 전역", "송탄", "고덕신도시", "평택항", "오산", "안성", "천안", "수원·화성"];

const SERVICES = [
  { title: "홈페이지 · 웹사이트 제작", desc: "회사소개·브랜드 사이트부터 랜딩페이지까지. 반응형·SEO 기본 적용." },
  { title: "쇼핑몰 · 커머스 구축", desc: "상품·주문·결제 연동까지 갖춘 자체 쇼핑몰 및 예약형 커머스." },
  { title: "예약 · 회원 플랫폼", desc: "회원가입, 예약/스케줄, 마이페이지 등 서비스형 웹 플랫폼." },
  { title: "모바일 앱 개발", desc: "iOS·Android 앱, 또는 웹앱(PWA)으로 빠르게 시작." },
  { title: "업무 시스템 · 자동화", desc: "내부 관리도구, 재고/주문 관리, 반복업무 자동화." },
  { title: "유지보수 · 운영", desc: "오픈 이후 수정·기능 추가·서버 운영까지 지속 지원." },
];

const STEPS = [
  { n: "01", title: "상담", desc: "원하는 것과 목표를 듣고 방향을 잡습니다. 평택 지역은 대면 미팅도 가능합니다." },
  { n: "02", title: "견적 · 기획", desc: "기능과 범위를 정리해 명확한 견적과 일정을 드립니다." },
  { n: "03", title: "디자인 · 개발", desc: "브랜드에 맞춘 디자인과 안정적인 개발을 진행합니다." },
  { n: "04", title: "검수 · 배포", desc: "함께 확인하고 수정한 뒤 실제 서비스로 배포합니다." },
  { n: "05", title: "유지보수", desc: "오픈 후에도 수정·개선·운영을 이어서 지원합니다." },
];

const FAQ = [
  {
    q: "평택에서 홈페이지 제작 비용은 얼마인가요?",
    a: "만들 결과물에 따라 다릅니다. 간단한 랜딩페이지는 80만원대부터, 회사 홈페이지는 250만원대부터, 쇼핑몰·플랫폼은 500만원 이상입니다. 정확한 금액은 필요한 기능을 확인한 뒤 견적으로 안내드립니다.",
  },
  {
    q: "평택에서 대면 미팅이 가능한가요?",
    a: "네. NQ Solution(엔큐솔루션)은 평택에 기반을 두고 있어 평택·오산·안성 등 인근 지역은 대면 미팅으로 진행할 수 있습니다. 비대면(화상·전화)도 동일하게 가능합니다.",
  },
  {
    q: "평택 외 다른 지역도 의뢰할 수 있나요?",
    a: "가능합니다. 평택을 기반으로 하지만 전국 어디든 비대면으로 동일한 품질로 진행합니다.",
  },
  {
    q: "제작 기간은 얼마나 걸리나요?",
    a: "랜딩페이지는 1~3주, 일반 홈페이지는 3~6주, 쇼핑몰·플랫폼은 6주 이상이 걸립니다. 일정이 급하면 인력을 집중해 단축할 수 있습니다.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function PyeongtaekWebDevelopment() {
  const title = "평택 웹개발·홈페이지 제작 | NQ Solution (엔큐솔루션)";
  const description =
    "평택 웹개발·홈페이지 제작은 NQ Solution(엔큐솔루션). 평택 기반 IT 개발 회사로 웹사이트·쇼핑몰·앱·업무시스템을 제작합니다. 평택·오산·안성 대면 미팅 가능, 전국 서비스. 무료 상담.";

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "웹개발, 홈페이지 제작",
    name: "평택 웹개발 · 홈페이지 제작",
    description,
    url: CANONICAL,
    provider: {
      "@type": "LocalBusiness",
      name: "NQ Solution (엔큐솔루션)",
      alternateName: ["엔큐솔루션", "NQ솔루션", "nqsolution"],
      url: "https://nqsolution.kr",
      image: "https://nqsolution.kr/og-image.png",
      address: {
        "@type": "PostalAddress",
        addressLocality: "평택",
        addressRegion: "경기도",
        addressCountry: "KR",
      },
    },
    areaServed: [
      { "@type": "City", name: "평택" },
      { "@type": "City", name: "오산" },
      { "@type": "City", name: "안성" },
      { "@type": "City", name: "송탄" },
      { "@type": "City", name: "천안" },
      { "@type": "AdministrativeArea", name: "경기도" },
      { "@type": "Country", name: "대한민국" },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: "https://nqsolution.kr" },
      { "@type": "ListItem", position: 2, name: "평택 웹개발", item: CANONICAL },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content="https://nqsolution.kr/og-image.png" />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="ko" href={CANONICAL} />
        <link rel="alternate" hrefLang="x-default" href={CANONICAL} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Head>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 md:pt-44 pb-20">
          <div className="container-custom">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-2">
                <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)] inline-flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> 평택 웹개발
                </span>
              </div>
              <div className="col-span-12 lg:col-span-10">
                <h1 className="text-display-sm md:text-display-lg font-serif mb-8 leading-[1.05]">
                  평택 웹개발 · 홈페이지 제작
                </h1>
                <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl leading-relaxed mb-6">
                  <strong className="text-[var(--color-text-primary)] font-medium">NQ Solution(엔큐솔루션)</strong>은
                  평택에 기반을 둔 IT 개발 회사입니다. 평택·오산·안성 지역 사업자부터 전국 고객까지,
                  웹사이트·쇼핑몰·앱·업무시스템을 직접 기획하고 개발합니다.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary inline-flex">
                    무료 상담 <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <Link href="/portfolio" className="btn-outline inline-flex">
                    포트폴리오 보기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Area coverage */}
        <section className="section-padding-sm border-t border-[var(--color-border)]">
          <div className="container-custom">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-2">
                <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">지역</span>
              </div>
              <div className="col-span-12 lg:col-span-10">
                <h2 className="text-display-sm font-serif mb-6">평택 전역 + 인근 지역</h2>
                <p className="text-[var(--color-text-secondary)] max-w-2xl mb-8">
                  평택시 전역은 물론, 인근 지역까지 대면으로도 진행합니다. 거리가 멀어도 전국 어디든 비대면으로 동일하게 작업합니다.
                </p>
                <div className="flex flex-wrap gap-3">
                  {AREAS.map((a) => (
                    <span
                      key={a}
                      className="px-4 py-2 border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)]"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section-padding bg-[var(--color-bg-secondary)]">
          <div className="container-custom">
            <div className="grid grid-cols-12 gap-8 mb-12">
              <div className="col-span-12 lg:col-span-2">
                <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">서비스</span>
              </div>
              <div className="col-span-12 lg:col-span-10">
                <h2 className="text-display-sm font-serif">평택에서 만들 수 있는 것</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.05 }}
                  className="card p-8"
                >
                  <h3 className="text-lg font-serif mb-3">{s.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-12 gap-8 mb-12">
              <div className="col-span-12 lg:col-span-2">
                <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">진행</span>
              </div>
              <div className="col-span-12 lg:col-span-10">
                <h2 className="text-display-sm font-serif">진행 절차</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {STEPS.map((s) => (
                <div key={s.n} className="border-t border-[var(--color-accent)] pt-5">
                  <div className="text-xs font-mono text-[var(--color-accent)] mb-2">{s.n}</div>
                  <h3 className="text-base font-medium mb-2">{s.title}</h3>
                  <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-[var(--color-bg-secondary)]">
          <div className="container-custom">
            <div className="grid grid-cols-12 gap-8 mb-12">
              <div className="col-span-12 lg:col-span-2">
                <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">FAQ</span>
              </div>
              <div className="col-span-12 lg:col-span-10">
                <h2 className="text-display-sm font-serif">평택 웹개발, 자주 묻는 질문</h2>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-8">
              <div className="hidden lg:block lg:col-span-2" />
              <div className="col-span-12 lg:col-span-8 space-y-8">
                {FAQ.map((f) => (
                  <div key={f.q} className="border-t border-[var(--color-border)] pt-6">
                    <h3 className="text-lg font-serif mb-3 flex items-start gap-3">
                      <Check className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-1" />
                      {f.q}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed pl-8">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="card p-12 md:p-16 text-center">
              <h2 className="text-display-sm font-serif mb-4">평택에서 시작하는 프로젝트</h2>
              <p className="text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto">
                홈페이지든 앱이든, 무엇을 만들지 아직 정리되지 않았어도 괜찮습니다. 편하게 문의 주세요.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="btn-primary inline-flex">
                  문의하기 <ArrowUpRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.Kakao?.Channel) {
                      window.Kakao.Channel.chat({ channelPublicId: "_iTLzX" });
                    } else {
                      window.open("https://pf.kakao.com/_iTLzX/chat", "_blank");
                    }
                  }}
                  className="btn-outline inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> 카카오톡 상담
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
