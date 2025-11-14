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

      // 부드러운 전환을 위한 transition 추가
      const root = document.documentElement;
      root.style.setProperty('transition', 'background-color 0.3s ease-in-out, color 0.3s ease-in-out');

      if (dark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [dark, mounted]);

  return (
    <Layout dark={dark} setDark={setDark}>
      <Component {...pageProps} />
    </Layout>
  );
}