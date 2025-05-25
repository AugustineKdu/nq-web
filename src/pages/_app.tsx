// src/pages/_app.tsx
'use client'

import '@/styles/globals.css'
import { AppProps } from 'next/app'
import { ThemeProvider, useTheme } from 'next-themes'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config.js'
import Layout from '@/components/Layout'
import { useEffect } from 'react'

function InnerApp({ Component, pageProps }: AppProps) {
  const { theme, setTheme, systemTheme } = useTheme()

  // 마운트 직후 저장된 테마가 없으면 라이트 모드로 초기화
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (!stored) setTheme('light')
  }, [setTheme])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

function App(props: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="light"
    >
      <InnerApp {...props} />
    </ThemeProvider>
  )
}

export default appWithTranslation(App, nextI18NextConfig)