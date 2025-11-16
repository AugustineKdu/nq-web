
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="ko">
            <Head>
                {/* FOUC 방지를 위한 인라인 스크립트 */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var theme = localStorage.getItem('theme');
                                    var isDark = theme === 'dark' ||
                                        (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                                    if (isDark) {
                                        document.documentElement.classList.add('dark');
                                    }
                                } catch (e) {}
                            })();
                        `
                    }}
                />
                {/* SVG 파비콘 */}
                {/* 파비콘 설정 - 3가지 사이즈 */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />

                {/* 기본 SEO */}
                <meta name="title" content="NQ Solution | 엔큐솔루션 | IT 외주개발 전문" />
                <meta name="description" content="NQ Solution (엔큐솔루션) - IT 외주개발 전문. 웹/앱 개발, 맞춤형 솔루션 제공." />
                <meta name="keywords" content="엔큐솔루션, NQ Solution, 외주개발, IT솔루션, 웹개발, 앱개발, 시스템개발, 엔큐, nqsolution" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://nqsolution.kr" />

                {/* 검색엔진 인증 */}
                <meta name="naver-site-verification" content="8e3d5c4a5b9f7c2e1d3a5b7c9e1f3d5a" />
                <meta name="google-site-verification" content="b6e5c4a9f8d7e2c1" />

                {/* 네이버 SEO */}
                <meta name="NaverBot" content="All" />
                <meta name="NaverBot" content="index,follow" />
                <meta name="Yeti" content="All" />
                <meta name="Yeti" content="index,follow" />
                
                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="NQ Solution | IT 외주개발 전문" />
                <meta property="og:description" content="맞춤형 IT 솔루션과 외주개발 서비스" />
                <meta property="og:url" content="https://nqsolution.kr" />
                <meta property="og:image" content="https://nqsolution.kr/nq_textlogo.png" />
                <meta property="og:image:width" content="600" />
                <meta property="og:image:height" content="200" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:alt" content="NQ Solution Logo" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="NQ Solution | IT 외주개발 전문" />
                <meta name="twitter:description" content="맞춤형 IT 솔루션과 외주개발 서비스" />
                <meta name="twitter:image" content="https://nqsolution.kr/nq_textlogo.png" />
                
                {/* 구조화 데이터 - 조직 정보 */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "NQ Solution",
                            "alternateName": "엔큐솔루션",
                            "url": "https://nqsolution.kr",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://nqsolution.kr/nq_textlogo.png",
                                "width": 600,
                                "height": 200
                            },
                            "description": "New ideas, Quick execution. 혁신적인 아이디어를 빠르게 실현하는 디지털 솔루션 파트너",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "평택",
                                "addressRegion": "경기도",
                                "addressCountry": "KR"
                            },
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+82-10-7168-1594",
                                "contactType": "customer service",
                                "email": "duk98823@gmail.com",
                                "availableLanguage": ["Korean", "English"]
                            },
                            "sameAs": [
                                "https://www.emecs.kr"
                            ],
                            "foundingDate": "2024",
                            "serviceType": ["웹 개발", "앱 개발", "UI/UX 디자인", "MVP & 베타 개발", "컨설팅"],
                            "priceRange": "$$",
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "5.0",
                                "reviewCount": "15"
                            }
                        })
                    }}
                />

                {/* 구조화 데이터 - 웹사이트 */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "name": "NQ Solution",
                            "url": "https://nqsolution.kr",
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": "https://nqsolution.kr/search?q={search_term_string}",
                                "query-input": "required name=search_term_string"
                            }
                        })
                    }}
                />

                {/* 구조화 데이터 - BreadcrumbList */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://nqsolution.kr"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Services",
                                    "item": "https://nqsolution.kr/services"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "Portfolio",
                                    "item": "https://nqsolution.kr/portfolio"
                                }
                            ]
                        })
                    }}
                />
            </Head>
            <body className="bg-neutral-50 dark:bg-neutral-900 antialiased transition-colors duration-300">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}