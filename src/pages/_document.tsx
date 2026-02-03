import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* Naver Site Verification */}
          <meta
            name="naver-site-verification"
            content="0bc84c0f9d9abb31a5402ca8779585c0586dbb65"
          />

          {/* Primary Meta Tags - 브랜드명 강조 */}
          <meta name="title" content="NQ Solution (엔큐솔루션) | 웹개발, 앱개발, AI솔루션 전문" />
          <meta name="description" content="NQ Solution(엔큐솔루션)은 웹 개발, 앱 개발, AI 솔루션을 전문으로 하는 평택 기반 전국 서비스 IT 개발 회사입니다. nqsolution, 엔큐솔루션으로 검색하세요." />
          <meta name="keywords" content="NQ Solution, nqsolution, 엔큐솔루션, NQ솔루션, 웹개발, 앱개발, AI솔루션, 홈페이지제작, 웹사이트제작, 모바일앱개발, IT개발, 평택개발사, 전국IT개발, 웹에이전시, 디지털에이전시" />

          {/* Favicon */}
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" />

          {/* SEO Meta Tags - Naver & Google */}
          <meta name="author" content="NQ Solution (엔큐솔루션)" />
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="naverbot" content="index, follow" />
          <meta name="yeti" content="index, follow" />
          <meta name="subject" content="웹개발, 앱개발, AI솔루션 - NQ Solution 엔큐솔루션" />
          <meta name="coverage" content="Worldwide" />
          <meta name="rating" content="General" />
          <meta name="revisit-after" content="3 days" />

          {/* Open Graph Tags - 네이버/카카오/페이스북 */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="NQ Solution (엔큐솔루션)" />
          <meta property="og:title" content="NQ Solution (엔큐솔루션) | 웹개발, 앱개발, AI솔루션" />
          <meta property="og:description" content="NQ Solution(엔큐솔루션)은 웹 개발, 앱 개발, AI 솔루션을 전문으로 하는 IT 개발 회사입니다." />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:locale:alternate" content="en_US" />
          <meta property="og:image" content="http://nqsolution.kr/logo.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="NQ Solution 엔큐솔루션 로고" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="NQ Solution (엔큐솔루션) | 웹개발, 앱개발, AI솔루션" />
          <meta name="twitter:description" content="웹 개발, 앱 개발, AI 솔루션 전문 IT 개발 회사" />
          <meta name="twitter:image" content="http://nqsolution.kr/logo.png" />

          {/* Canonical */}
          <link rel="canonical" href="http://nqsolution.kr" />

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
                "alternateName": ["엔큐솔루션", "NQ솔루션", "nqsolution"],
                "url": "http://nqsolution.kr",
                "logo": "http://nqsolution.kr/logo.png",
                "description": "NQ Solution(엔큐솔루션)은 웹 개발, 앱 개발, AI 솔루션을 전문으로 하는 평택 기반 전국 서비스 디지털 에이전시입니다.",
                "email": "hello@nqsolution.com",
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
                  "email": "hello@nqsolution.com",
                  "availableLanguage": ["Korean", "English"]
                },
                "sameAs": []
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
                "alternateName": ["엔큐솔루션", "NQ솔루션", "nqsolution"],
                "url": "http://nqsolution.kr",
                "inLanguage": ["ko-KR", "en-US"],
                "description": "웹개발, 앱개발, AI솔루션 전문 IT 개발 회사 NQ Solution(엔큐솔루션)",
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
                "alternateName": ["엔큐솔루션", "NQ솔루션", "nqsolution"],
                "image": "http://nqsolution.kr/logo.png",
                "url": "http://nqsolution.kr",
                "email": "hello@nqsolution.com",
                "description": "NQ Solution(엔큐솔루션) - 웹 개발, 앱 개발, AI 솔루션 전문 IT 개발 회사",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "평택",
                  "addressRegion": "경기도",
                  "addressCountry": "KR"
                },
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
                    "url": "http://nqsolution.kr/about"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 2,
                    "name": "서비스",
                    "description": "웹 개발, 앱 개발, AI 솔루션 서비스",
                    "url": "http://nqsolution.kr/services"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 3,
                    "name": "포트폴리오",
                    "description": "NQ Solution 프로젝트 사례",
                    "url": "http://nqsolution.kr/portfolio"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 4,
                    "name": "문의하기",
                    "description": "프로젝트 상담 및 문의",
                    "url": "http://nqsolution.kr/contact"
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
                "alternateName": ["엔큐솔루션", "NQ솔루션", "nqsolution"],
                "url": "http://nqsolution.kr",
                "logo": "http://nqsolution.kr/logo.png",
                "image": "http://nqsolution.kr/logo.png",
                "description": "NQ Solution(엔큐솔루션)은 웹 개발, 앱 개발, AI 솔루션을 전문으로 하는 IT 개발 회사입니다.",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Pyeongtaek",
                  "addressRegion": "Gyeonggi-do",
                  "addressCountry": "KR"
                },
                "priceRange": "$$",
                "serviceType": ["웹 개발", "웹사이트 제작", "홈페이지 제작", "앱 개발", "모바일 앱 개발", "AI 솔루션", "UI/UX 디자인"],
                "areaServed": {
                  "@type": "Country",
                  "name": "South Korea"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "IT 개발 서비스",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "웹 개발"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "앱 개발"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "AI 솔루션"
                      }
                    }
                  ]
                }
              })
            }}
          />
        </Head>
        <body className="bg-light-background dark:bg-dark-background antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
