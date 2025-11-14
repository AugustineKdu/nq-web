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
            ? "bg-neutral-50/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800"
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
            <div className={`md:hidden absolute top-full left-0 right-0 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 transition-all duration-300 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
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

    const contactInfo = [
        { label: 'Email', value: 'duk98823@gmail.com', field: 'footer-email' },
        { label: 'Phone', value: '010-3368-1594', field: 'footer-phone' },
        { label: 'Company', value: '031-8027-3368', field: 'footer-company' },
        { label: 'Location', value: '평택, South Korea', field: 'footer-location' }
    ];

    return (
        <footer className="relative bg-neutral-900 dark:bg-black text-white border-t border-neutral-800">
            <div className="max-w-6xl mx-auto px-8 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="md:col-span-5">
                        <div className="mb-6 relative w-[160px] h-[50px]">
                            <Image
                                src="/logo-dark.png"
                                alt="NQ Solution Logo"
                                width={160}
                                height={50}
                                className="brightness-0 invert"
                            />
                        </div>
                        <p className="text-sm text-white/80 max-w-sm leading-relaxed font-medium mb-6">
                            혁신적인 아이디어를 빠르게 실행하여<br />
                            비즈니스의 성장을 함께 만들어갑니다.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/about" className="text-xs text-white/60 hover:text-white transition-colors font-medium">About</Link>
                            <Link href="/services" className="text-xs text-white/60 hover:text-white transition-colors font-medium">Services</Link>
                            <Link href="/portfolio" className="text-xs text-white/60 hover:text-white transition-colors font-medium">Portfolio</Link>
                            <Link href="/contact" className="text-xs text-white/60 hover:text-white transition-colors font-medium">Contact</Link>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="md:col-span-7">
                        <h4 className="text-xs uppercase tracking-wider text-white/60 mb-6 font-semibold">Get in Touch</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {contactInfo.map((item) => (
                                <div key={item.field} className="group">
                                    <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2 font-medium">{item.label}</p>
                                    <button
                                        onClick={() => copyToClipboard(item.value, item.field)}
                                        className="flex items-center gap-2 text-sm text-white hover:text-blue-400 transition-colors font-semibold"
                                    >
                                        <span>{item.value}</span>
                                        {copiedField === item.field ? (
                                            <CheckIcon className="w-3.5 h-3.5 text-green-400" />
                                        ) : (
                                            <ClipboardDocumentIcon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/60 font-medium">
                        © 2025 NQ Solution. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <p className="text-xs text-white/60 font-medium">
                            Made with ❤️ in 평택
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const Layout = ({ children, dark, setDark }: { children: React.ReactNode, dark: boolean, setDark: (d: boolean) => void }) => {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 relative">
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