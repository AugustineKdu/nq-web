// src/components/Layout.tsx
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'NQ Solution' }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const navigation = [
        { name: '홈', path: '/', icon: '🏠' },
        { name: '포트폴리오', path: '/portfolio', icon: '🎨' },
        { name: '서비스', path: '/services', icon: '⚙️' },
        { name: '문의하기', path: '/contact', icon: '📞' },
    ];

    const isActive = (path: string) => router.pathname === path;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-white">
                {/* Header */}
                <header className="sticky top-0 z-40 w-full border-b bg-white/95 dark:bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60 border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            {/* Logo */}
                            <Link href="/" className="flex items-center">
                                <span className="text-2xl font-bold bg-gradient-to-r from-[#2563eb] to-[#9333ea] bg-clip-text text-transparent">
                                    NQ Solution
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center space-x-8">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`text-sm font-medium transition-colors hover:text-[#2563eb] dark:hover:text-[#2dd4bf] ${isActive(item.path)
                                            ? 'text-[#2563eb] dark:text-[#2dd4bf]'
                                            : 'text-gray-600 dark:text-gray-400'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}

                                {/* Dark Mode Toggle */}
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                                    aria-label="Toggle dark mode"
                                >
                                    {theme === 'dark' ? (
                                        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                        </svg>
                                    )}
                                </button>
                            </nav>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 text-gray-600 dark:text-gray-300"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {mobileMenuOpen ? (
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden border-t dark:border-gray-800">
                            <div className="space-y-1 px-4 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(item.path)
                                            ? 'bg-blue-50 dark:bg-[#2563eb]/20 text-[#2563eb] dark:text-[#2dd4bf]'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white'
                                            }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className="mr-2">{item.icon}</span>
                                        {item.name}
                                    </Link>
                                ))}

                                {/* Mobile Dark Mode Toggle */}
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white flex items-center"
                                >
                                    <span className="mr-2">{theme === 'dark' ? '☀️' : '🌙'}</span>
                                    {theme === 'dark' ? '라이트 모드' : '다크 모드'}
                                </button>
                            </div>
                        </div>
                    )}
                </header>

                {/* Main Content */}
                <main className="flex-1">
                    {children}
                </main>

                {/* Footer */}
                <footer className="border-t bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="mb-4 md:mb-0">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    © 2025 NQ Solution. All rights reserved.
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#2563eb] dark:hover:text-[#2dd4bf]">
                                    contact@nqsolution.com
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Layout;