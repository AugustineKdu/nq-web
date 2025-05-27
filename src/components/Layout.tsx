// src/components/Layout.tsx
'use client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ThemeToggle from '@/components/ThemeToggle'
import { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    const { locale, push, asPath } = useRouter()
    const [mobileOpen, setMobileOpen] = useState(false)
    return (
        <div className="min-h-screen bg-primaryBg text-primaryText transition-colors">
            <nav className="flex items-center justify-between px-8 py-4 shadow-sm relative">
                {/* 로고 */}
                <Link href="/" className="flex items-center">
                    <img src="/NQlogo.png" alt="NQ Logo" className="h-8" />
                </Link>

                {/* Desktop 메뉴 */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
                    <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About</Link>
                    <Link href="/service" className="hover:text-blue-600 dark:hover:text-blue-400">Service</Link>
                    <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
                </div>

                {/* Mobile 햄버거 */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? '✕' : '☰'}
                </button>

                {/* Desktop 우측 토글들 */}
                <div className="hidden md:flex items-center space-x-4">
                    <ThemeToggle />
                    <button
                        onClick={() => push(asPath, undefined, { locale: locale === 'ko' ? 'en' : 'ko' })}
                        className="px-2 py-1 rounded hover:text-blue-600 dark:hover:text-blue-400"
                    >
                        {locale === 'ko' ? 'EN' : 'KO'}
                    </button>
                </div>
            </nav>
            {mobileOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-light-background/75 dark:bg-dark-background/75 backdrop-blur-sm z-20 p-4">
                    <nav className="flex flex-col space-y-4">
                        <Link href="/" onClick={() => setMobileOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
                        <Link href="/about" onClick={() => setMobileOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400">About</Link>
                        <Link href="/service" onClick={() => setMobileOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400">Service</Link>
                        <Link href="/contact" onClick={() => setMobileOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
                        <div className="mt-6 flex items-center space-x-4">
                            <ThemeToggle />
                            <button
                                onClick={() => {
                                    setMobileOpen(false);
                                    push(asPath, undefined, { locale: locale === 'ko' ? 'en' : 'ko' })
                                }}
                            >
                                {locale === 'ko' ? 'EN' : 'KO'}
                            </button>
                        </div>
                    </nav>
                </div>
            )}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    )
}