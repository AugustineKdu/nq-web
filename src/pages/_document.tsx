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

          {/* Favicon */}
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" />

          {/* SEO Meta Tags for Naver */}
          <meta name="author" content="NQ Solution" />
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
          <meta name="naverbot" content="index, follow" />

          {/* Open Graph Tags */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="NQ Solution" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:locale:alternate" content="en_US" />
          <meta property="og:image" content="https://www.nqsolution.com/logo.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://www.nqsolution.com/logo.png" />

          {/* Canonical and Language */}
          <link rel="canonical" href="https://www.nqsolution.com" />

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
                "alternateName": "엔큐솔루션",
                "url": "https://www.nqsolution.com",
                "logo": "https://www.nqsolution.com/logo.png",
                "description": "웹 개발, 앱 개발, AI 솔루션을 전문으로 하는 디지털 에이전시",
                "email": "hello@nqsolution.com",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Seoul",
                  "addressCountry": "KR"
                },
                "sameAs": []
              })
            }}
          />

          {/* Structured Data - WebSite with Sitelinks */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "NQ Solution",
                "alternateName": "엔큐솔루션",
                "url": "https://www.nqsolution.com",
                "inLanguage": ["ko-KR", "en-US"],
                "publisher": {
                  "@type": "Organization",
                  "name": "NQ Solution"
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
                    "description": "NQ Solution 소개",
                    "url": "https://www.nqsolution.com/about"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 2,
                    "name": "서비스",
                    "description": "웹 개발, 앱 개발, AI 솔루션",
                    "url": "https://www.nqsolution.com/services"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 3,
                    "name": "포트폴리오",
                    "description": "프로젝트 사례",
                    "url": "https://www.nqsolution.com/portfolio"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 4,
                    "name": "문의하기",
                    "description": "프로젝트 상담 및 문의",
                    "url": "https://www.nqsolution.com/contact"
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
                "alternateName": "엔큐솔루션",
                "url": "https://www.nqsolution.com",
                "logo": "https://www.nqsolution.com/logo.png",
                "image": "https://www.nqsolution.com/logo.png",
                "description": "웹 개발, 앱 개발, AI 솔루션을 전문으로 하는 디지털 에이전시입니다.",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Seoul",
                  "addressRegion": "Seoul",
                  "addressCountry": "KR"
                },
                "priceRange": "$$",
                "serviceType": ["웹 개발", "앱 개발", "AI 솔루션", "UI/UX 디자인"],
                "areaServed": {
                  "@type": "Country",
                  "name": "South Korea"
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
