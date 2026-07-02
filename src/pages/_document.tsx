import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* 테마 FOUC 방지 — 페인트 전 localStorage 기반으로 dark/light 클래스 적용 (기본 dark) */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':true;var c=document.documentElement.classList;c.add(d?'dark':'light');c.remove(d?'light':'dark');}catch(e){document.documentElement.classList.add('dark');}})();`,
            }}
          />

          {/* Search Engine Verification */}
          <meta
            name="naver-site-verification"
            content="0bc84c0f9d9abb31a5402ca8779585c0586dbb65"
          />
          <meta
            name="google-site-verification"
            content="YOUR_GOOGLE_VERIFICATION_CODE"
          />

          {/* Favicon */}
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" />

          {/* SEO Meta Tags - Naver & Google */}
          <meta name="author" content="NQ Solution (엔큐솔루션)" />
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="naverbot" content="index, follow" />
          <meta name="yeti" content="index, follow" />
          <meta name="subject" content="웹개발, 앱개발, 프로그램개발, 시스템개발 전문 - NQ Solution 엔큐솔루션" />
          <meta name="coverage" content="Worldwide" />
          <meta name="rating" content="General" />
          <meta name="revisit-after" content="3 days" />

          {/* Open Graph - Locale (페이지별 og:locale은 Seo 컴포넌트가 담당, alternate만 전역 유지) */}
          <meta property="og:locale:alternate" content="en_US" />

          {/* RSS Feed */}
          <link rel="alternate" type="application/rss+xml" title="NQ Solution RSS" href="https://nqsolution.kr/rss.xml" />

          {/* Preconnect for performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          {/* Structured Data - Organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "NQ Solution",
                "alternateName": ["엔큐솔루션", "엔큐 솔루션", "NQ솔루션", "NQ 솔루션", "NQ Solution", "nqsolution"],
                "url": "https://nqsolution.kr",
                "logo": "https://nqsolution.kr/logo.png",
                "description": "NQ Solution(엔큐솔루션) - 웹개발, 앱개발, 프로그램개발, 시스템개발 전문 IT 개발 회사. 평택 기반 전국 서비스.",
                "email": "dwkim@nqsolution.kr",
                "telephone": "+82-10-3368-1594",
                "foundingDate": "2024",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Pyeongtaek",
                  "addressRegion": "Gyeonggi-do",
                  "addressCountry": "KR"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "telephone": "+82-10-3368-1594",
                  "email": "dwkim@nqsolution.kr",
                  "availableLanguage": ["Korean", "English"]
                },
                "sameAs": ["https://pf.kakao.com/_iTLzX"]
              })
            }}
          />

          {/* Structured Data - WebSite with SearchAction */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "NQ Solution",
                "alternateName": ["엔큐솔루션", "엔큐 솔루션", "NQ솔루션", "NQ 솔루션", "NQ Solution", "nqsolution"],
                "url": "https://nqsolution.kr",
                "inLanguage": ["ko-KR", "en-US"],
                "description": "웹개발, 앱개발 전문 IT 개발 회사 NQ Solution(엔큐솔루션)",
                "publisher": {
                  "@type": "Organization",
                  "name": "NQ Solution",
                  "alternateName": "엔큐솔루션"
                }
              })
            }}
          />

          {/* Structured Data - LocalBusiness for Naver */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "NQ Solution (엔큐솔루션)",
                "alternateName": ["엔큐솔루션", "엔큐 솔루션", "NQ솔루션", "NQ 솔루션", "NQ Solution", "nqsolution"],
                "image": "https://nqsolution.kr/logo.png",
                "url": "https://nqsolution.kr",
                "email": "dwkim@nqsolution.kr",
                "telephone": "+82-10-3368-1594",
                "sameAs": ["https://pf.kakao.com/_iTLzX"],
                "description": "NQ Solution(엔큐솔루션) - 웹개발, 앱개발 전문 IT 개발 회사",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "평택",
                  "addressRegion": "경기도",
                  "addressCountry": "KR"
                },
                "areaServed": [
                  { "@type": "City", "name": "평택" },
                  { "@type": "City", "name": "오산" },
                  { "@type": "City", "name": "안성" },
                  { "@type": "AdministrativeArea", "name": "경기도" }
                ],
                "priceRange": "$$",
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              })
            }}
          />

          {/* Structured Data - SiteNavigationElement */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                "itemListElement": [
                  {
                    "@type": "SiteNavigationElement",
                    "position": 1,
                    "name": "회사 소개",
                    "description": "NQ Solution(엔큐솔루션) 소개",
                    "url": "https://nqsolution.kr/about"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 2,
                    "name": "서비스",
                    "description": "웹개발, 앱개발 서비스",
                    "url": "https://nqsolution.kr/services"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 3,
                    "name": "포트폴리오",
                    "description": "NQ Solution 프로젝트 사례",
                    "url": "https://nqsolution.kr/portfolio"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 4,
                    "name": "문의하기",
                    "description": "프로젝트 상담 및 문의",
                    "url": "https://nqsolution.kr/contact"
                  }
                ]
              })
            }}
          />

          {/* Structured Data - ProfessionalService */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": "NQ Solution",
                "alternateName": ["엔큐솔루션", "엔큐 솔루션", "NQ솔루션", "NQ 솔루션", "NQ Solution", "nqsolution"],
                "url": "https://nqsolution.kr",
                "logo": "https://nqsolution.kr/logo.png",
                "image": "https://nqsolution.kr/logo.png",
                "description": "NQ Solution(엔큐솔루션) - 웹개발, 앱개발, 프로그램개발, 시스템개발 전문 IT 개발 회사. 평택 기반 전국 서비스.",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Pyeongtaek",
                  "addressRegion": "Gyeonggi-do",
                  "addressCountry": "KR"
                },
                "priceRange": "$$",
                "telephone": "+82-10-3368-1594",
                "email": "dwkim@nqsolution.kr",
                "sameAs": ["https://pf.kakao.com/_iTLzX"],
                "serviceType": ["웹 개발", "웹사이트 제작", "홈페이지 제작", "앱 개발", "모바일 앱 개발", "프로그램 개발", "시스템 개발", "소프트웨어 개발", "UI/UX 디자인", "쇼핑몰 제작", "업무 자동화"],
                "areaServed": [
                  { "@type": "City", "name": "평택" },
                  { "@type": "City", "name": "오산" },
                  { "@type": "City", "name": "안성" },
                  { "@type": "City", "name": "수원" },
                  { "@type": "City", "name": "천안" },
                  { "@type": "AdministrativeArea", "name": "경기도" },
                  { "@type": "Country", "name": "South Korea" }
                ],
                "knowsAbout": ["평택 웹개발", "홈페이지 제작", "웹사이트 개발", "앱 개발", "쇼핑몰 제작", "업무 자동화", "시스템 개발"],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "IT 개발 서비스",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "웹 개발 · 홈페이지 제작"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "앱 개발 · 모바일 앱"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "프로그램 개발 · 소프트웨어"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "시스템 개발 · 업무 자동화"
                      }
                    }
                  ]
                }
              })
            }}
          />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
