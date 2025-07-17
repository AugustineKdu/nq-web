// src/pages/_app.tsx
'use client';

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // localStorage에서 테마 설정 불러오기
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDark(savedTheme === 'dark');
    } else {
      // 시스템 테마 설정 확인
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      // 테마 변경 시 localStorage에 저장
      localStorage.setItem('theme', dark ? 'dark' : 'light');

      if (dark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [dark, mounted]);

  // 초기 렌더링 시 깜빡임 방지
  if (!mounted) {
    return null;
  }

  return (
    <Layout dark={dark} setDark={setDark}>
      <Component {...pageProps} />
    </Layout>
  );
}