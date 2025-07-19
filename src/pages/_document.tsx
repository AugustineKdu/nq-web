// src/pages/_document.tsx
// import { Html, Head, Main, NextScript } from 'next/document'

// export default function Document() {
//     return (
//         <Html lang="ko">
//             <Head />
//             <link rel="icon" type="image/png" href="/logo-icon.png" />
//             <body className="bg-light-background dark:bg-dark-background antialiased">
//                 <Main />
//                 <NextScript />
//             </body>
//         </Html>
//     )
// }
// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="ko">
            <Head>
                {/* SVG 파비콘 */}
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                {/* PNG 대체 아이콘 (SVG 미지원 브라우저용) */}
                <link rel="alternate icon" type="image/png" href="/logo-icon.png" />
            </Head>
            <body className="bg-light-background dark:bg-dark-background antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}