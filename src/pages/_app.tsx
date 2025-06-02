// src/pages/_app.tsx
'use client';

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider, useTheme } from 'next-themes';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config.js';
import Layout from '@/components/Layout';
import { useEffect } from 'react';

function InnerApp({ Component, pageProps }: AppProps) {
  const { setTheme } = useTheme();

  // 마운트 후 저장된 테마가 없으면 라이트 모드 초기화
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (!stored) setTheme('light');
  }, [setTheme]);

  // 페이지별 title prop 전달 (없으면 Layout의 기본값 사용)
  const title = (Component as any).pageTitle ?? 'NQ Solution';

  return (
    <Layout title={title}>
      <Component {...pageProps} />
    </Layout>
  );
}

function App(props: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <InnerApp {...props} />
    </ThemeProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);