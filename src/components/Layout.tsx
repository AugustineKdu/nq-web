import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'NQ Solution' }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

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

            <div className="min-h-screen flex flex-col">
                {/* Header */}
                <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            {/* Logo */}
                            <Link href="/" className="flex items-center">
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    NQ Solution
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center space-x-8">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive(item.path)
                                                ? 'text-blue-600'
                                                : 'text-gray-600'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2"
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
                        <div className="md:hidden border-t">
                            <div className="space-y-1 px-4 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(item.path)
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className="mr-2">{item.icon}</span>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </header>

                {/* Main Content */}
                <main className="flex-1">
                    {children}
                </main>

                {/* Footer */}
                <footer className="border-t bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="mb-4 md:mb-0">
                                <p className="text-sm text-gray-600">
                                    © 2025 NQ Solution. All rights reserved.
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600">
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