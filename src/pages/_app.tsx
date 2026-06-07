// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import Layout from "../components/Layout";
import Head from "next/head";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { usePageView } from "../hooks/usePageView";

// Custom page type that supports getLayout
type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function AppContent({ Component, pageProps }: AppPropsWithLayout) {
    const { dark, setDark } = useTheme();
    const router = useRouter();

    // Track page views
    usePageView();

    // Set html lang attribute based on route
    useEffect(() => {
        const lang = router.pathname.startsWith("/en") ? "en" : "ko";
        document.documentElement.lang = lang;
    }, [router.pathname]);

    // Check if page has custom layout
    const getLayout = Component.getLayout;

    // If page has custom getLayout, use it (for admin page)
    if (getLayout) {
        return (
            <>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content={dark ? "#0a0a0a" : "#ffffff"} />
                </Head>
                {getLayout(<Component {...pageProps} dark={dark} />)}
            </>
        );
    }

    // Default layout with header/footer
    return (
        <>
            <Head>
                <title>NQ Solution (엔큐솔루션) | 평택 웹개발·앱개발·프로그램개발 전문</title>
                <meta name="description" content="NQ Solution(엔큐솔루션) - 평택 기반 전국 웹개발, 앱개발, 프로그램개발, 시스템개발 전문 IT 회사. 홈페이지 제작부터 업무 자동화까지." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content={dark ? "#0a0a0a" : "#ffffff"} />
            </Head>
            <Layout dark={dark} setDark={setDark}>
                <Component {...pageProps} dark={dark} />
            </Layout>
        </>
    );
}

export default function MyApp(props: AppPropsWithLayout) {
    return (
        <ThemeProvider>
            <Script
                src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
                strategy="afterInteractive"
                onLoad={() => {
                    if (window.Kakao && !window.Kakao.isInitialized()) {
                        window.Kakao.init("213024e44cf9462918c343077ad80a8f");
                    }
                }}
            />
            <AppContent {...props} />
        </ThemeProvider>
    );
}
