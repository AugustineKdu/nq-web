import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";
import AnimatedBackground from "./AnimatedBackground";
import { Bars3Icon as Menu, XMarkIcon as X, ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const Navbar = ({ dark, setDark }: { dark: boolean; setDark: (d: boolean) => void }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { href: "/about", label: "About" },
        { href: "/services", label: "Services" },
        { href: "/portfolio", label: "Portfolio" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700"
            : "bg-transparent"
            }`}>
            <div className="max-w-6xl mx-auto px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center relative">
                        {/* 테마에 따라 다른 PNG 사용 - Cross-fade 효과 */}
                        <div className="relative w-[150px] h-[40px]">
                            <Image
                                src="/logo-light.png"
                                alt="NQ Solution Logo"
                                width={150}
                                height={40}
                                priority
                                className={`absolute inset-0 transition-opacity duration-300 ${dark ? 'opacity-0' : 'opacity-100'}`}
                            />
                            <Image
                                src="/logo-dark.png"
                                alt="NQ Solution Logo"
                                width={150}
                                height={40}
                                priority
                                className={`absolute inset-0 transition-opacity duration-300 ${dark ? 'opacity-100' : 'opacity-0'}`}
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-12">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative text-sm tracking-wide uppercase transition-colors ${router.pathname === item.href
                                    ? "text-neutral-900 dark:text-neutral-100"
                                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                                    }`}
                            >
                                {item.label}
                                {router.pathname === item.href && (
                                    <span className="absolute -bottom-2 left-0 right-0 h-px bg-neutral-900 dark:bg-neutral-100" />
                                )}
                            </Link>
                        ))}

                        <div className="flex items-center gap-6 ml-8">
                            <ThemeToggle dark={dark} setDark={setDark} />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle dark={dark} setDark={setDark} />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 right-0 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 transition-all duration-300 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                }`}>
                <div className="px-8 py-6 space-y-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block text-sm tracking-wide uppercase ${router.pathname === item.href
                                ? "text-neutral-900 dark:text-neutral-100"
                                : "text-neutral-500 dark:text-neutral-400"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

const Footer = ({ dark }: { dark: boolean }) => {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const copyToClipboard = async (text: string, field: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
            <div className="max-w-6xl mx-auto px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="mb-6 relative w-[150px] h-[50px]">
                            <Image
                                src="/logo-light.png"
                                alt="NQ Solution Logo"
                                width={150}
                                height={50}
                                className={`absolute inset-0 transition-opacity duration-300 ${dark ? 'opacity-0' : 'opacity-100'}`}
                            />
                            <Image
                                src="/logo-dark.png"
                                alt="NQ Solution Logo"
                                width={150}
                                height={50}
                                className={`absolute inset-0 transition-opacity duration-300 ${dark ? 'opacity-100' : 'opacity-0'}`}
                            />
                        </div>
                        <p className="text-sm text-neutral-900 dark:text-white max-w-md font-medium">
                            New idea를 더하고 Quick action으로 실행하여<br />
                            솔루션을 제공합니다.
                        </p>
                    </div>


                    {/* Contact */}
                    <div>
                        <h4 className="text-xs uppercase tracking-wider text-neutral-900 dark:text-white mb-4 font-medium">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <button
                                    onClick={() => copyToClipboard('duk98823@gmail.com', 'footer-email')}
                                    className="group flex items-center gap-2 text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold"
                                >
                                    <span>duk98823@gmail.com</span>
                                    {copiedField === 'footer-email' ? (
                                        <CheckIcon className="w-3 h-3 text-green-600" />
                                    ) : (
                                        <ClipboardDocumentIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => copyToClipboard('010-3368-1594', 'footer-phone')}
                                    className="group flex items-center gap-2 text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold"
                                >
                                    <span>+82 10-3368-1594</span>
                                    {copiedField === 'footer-phone' ? (
                                        <CheckIcon className="w-3 h-3 text-green-600" />
                                    ) : (
                                        <ClipboardDocumentIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => copyToClipboard('평택, South Korea', 'footer-location')}
                                    className="group flex items-center gap-2 text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold"
                                >
                                    <span>평택, South Korea</span>
                                    {copiedField === 'footer-location' ? (
                                        <CheckIcon className="w-3 h-3 text-green-600" />
                                    ) : (
                                        <ClipboardDocumentIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-neutral-900 dark:text-white font-medium">
                        © 2025 NQ Solution. All rights reserved.
                    </p>
                    <p className="text-xs text-neutral-900 dark:text-white font-medium">
                        Design & Development by NQ
                    </p>
                </div>
            </div>
        </footer>
    );
};

const Layout = ({ children, dark, setDark }: { children: React.ReactNode, dark: boolean, setDark: (d: boolean) => void }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 relative">
            {/* Animated Background */}
            <AnimatedBackground dark={dark} />

            <Navbar dark={dark} setDark={setDark} />
            <main className="pt-20 relative z-10">
                {children}
            </main>
            <Footer dark={dark} />
        </div>
    );
};

export default Layout;