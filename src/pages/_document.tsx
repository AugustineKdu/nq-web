import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* Search Engine Verification */}
          <meta
            name="naver-site-verification"
            content="0bc84c0f9d9abb31a5402ca8779585c0586dbb65"
          />
          <meta
            name="google-site-verification"
            content="YOUR_GOOGLE_VERIFICATION_CODE"
          />

          {/* Primary Meta Tags - 브랜드명 + 서비스 키워드 강조 */}
          <meta name="title" content="NQ Solution (엔큐솔루션) | 웹개발, 앱개발, 프로그램개발, 시스템개발 전문" />
          <meta name="description" content="NQ Solution(엔큐솔루션) - 웹개발, 앱개발, 프로그램개발, 시스템개발 전문 IT 개발 회사. 홈페이지 제작, 쇼핑몰 구축, 업무 자동화 시스템까지. 평택 기반 전국 서비스." />
          <meta name="keywords" content="NQ Solution, nqsolution, 엔큐솔루션, NQ솔루션, 웹개발, 앱개발, 홈페이지제작, 웹사이트제작, 모바일앱개발, IT개발, 프로그램개발, 시스템개발, 소프트웨어개발, 쇼핑몰제작, 웹에이전시, 디지털에이전시, 평택웹개발, 평택홈페이지, 외주개발, IT외주, 업무자동화, 웹디자인" />

          {/* Favicon */}
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" />

          {/* Canonical & Hreflang */}
          <link rel="alternate" hrefLang="ko" href="https://nqsolution.kr/" />
          <link rel="alternate" hrefLang="en" href="https://nqsolution.kr/en" />
          <link rel="alternate" hrefLang="x-default" href="https://nqsolution.kr/" />

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

          {/* Open Graph Tags - 네이버/카카오/페이스북 */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="NQ Solution (엔큐솔루션)" />
          <meta property="og:title" content="NQ Solution (엔큐솔루션) | 웹개발, 앱개발, 프로그램개발 전문" />
          <meta property="og:description" content="NQ Solution(엔큐솔루션) - 웹개발, 앱개발, 프로그램개발, 시스템개발 전문 IT 개발 회사. 홈페이지 제작부터 업무 자동화까지." />
          <meta property="og:url" content="https://nqsolution.kr" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:locale:alternate" content="en_US" />
          <meta property="og:image" content="https://nqsolution.kr/logo.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="NQ Solution 엔큐솔루션 로고" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="NQ Solution (엔큐솔루션) | 웹개발, 앱개발, 프로그램개발 전문" />
          <meta name="twitter:description" content="웹개발, 앱개발, 프로그램개발, 시스템개발 전문 IT 개발 회사 - 평택 기반 전국 서비스" />
          <meta name="twitter:image" content="https://nqsolution.kr/logo.png" />

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
                "alternateName": ["엔큐솔루션", "NQ솔루션", "nqsolution"],
                "url": "https://nqsolution.kr",
                "logo": "https://nqsolution.kr/logo.png",
                "description": "NQ Solution(엔큐솔루션) - 웹개발, 앱개발, 프로그램개발, 시스템개발 전문 IT 개발 회사. 평택 기반 전국 서비스.",
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
                "alternateName": ["엔큐솔루션", "NQ솔루션", "nqsolution"],
                "image": "https://nqsolution.kr/logo.png",
                "url": "https://nqsolution.kr",
                "email": "hello@nqsolution.com",
                "description": "NQ Solution(엔큐솔루션) - 웹개발, 앱개발 전문 IT 개발 회사",
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
                "alternateName": ["엔큐솔루션", "NQ솔루션", "nqsolution"],
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
                "serviceType": ["웹 개발", "웹사이트 제작", "홈페이지 제작", "앱 개발", "모바일 앱 개발", "프로그램 개발", "시스템 개발", "소프트웨어 개발", "UI/UX 디자인", "쇼핑몰 제작", "업무 자동화"],
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
