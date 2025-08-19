
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="ko">
            <Head>
                {/* SVG 파비콘 */}
                {/* 파비콘 설정 - 3가지 사이즈 */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            </Head>
            <body className="bg-light-background dark:bg-dark-background antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}