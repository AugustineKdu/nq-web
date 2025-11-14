
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
                <meta name="title" content="NQ Solution | IT 외주개발 전문" />
                <meta name="description" content="NQ Solution - IT 외주개발 전문. 웹/앱 개발, 맞춤형 솔루션 제공." />
                <meta name="keywords" content="외주개발, IT솔루션, 웹개발, 앱개발, 시스템개발" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://nqsolution.kr" />
                
                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="NQ Solution | IT 외주개발 전문" />
                <meta property="og:description" content="맞춤형 IT 솔루션과 외주개발 서비스" />
                <meta property="og:url" content="https://nqsolution.kr" />
                <meta property="og:image" content="https://nqsolution.kr/nq_textlogo.png" />
                
                {/* 구조화 데이터 - 최소 버전 */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "NQ Solution",
                            "url": "https://nqsolution.kr",
                            "logo": "https://nqsolution.kr/nq_textlogo.png",
                            "description": "IT 외주개발 및 맞춤형 솔루션 전문 기업"
                        })
                    }}
                />
            </Head>
            <body className="bg-white dark:bg-neutral-900 antialiased transition-colors duration-300">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}