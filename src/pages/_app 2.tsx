// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Head from "next/head";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

function AppContent({ Component, pageProps }: AppProps) {
    const { dark, setDark } = useTheme();

    return (
        <>
            <Head>
                <title>NQ Solution | Digital Solution Partner</title>
                <meta name="description" content="혁신적인 아이디어를 빠르게 실현하는 디지털 솔루션 파트너. 웹 개발, 앱 개발, UI/UX 디자인, 컨설팅 서비스를 제공합니다." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content={dark ? "#0a0a0a" : "#ffffff"} />
            </Head>
            <Layout dark={dark} setDark={setDark}>
                <Component {...pageProps} dark={dark} />
            </Layout>
        </>
    );
}

export default function MyApp(props: AppProps) {
    return (
        <ThemeProvider>
            <AppContent {...props} />
        </ThemeProvider>
    );
}
