// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="ko">
            <Head />
            <body className="bg-light-background dark:bg-dark-background antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}