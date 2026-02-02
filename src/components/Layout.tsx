import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";

interface LayoutProps {
    children: React.ReactNode;
    dark: boolean;
    setDark: (dark: boolean) => void;
}

const Navbar = ({ dark, setDark }: { dark: boolean; setDark: (dark: boolean) => void }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    // Detect if current page is English
    const isEnglish = router.pathname.startsWith("/en");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = isEnglish
        ? [
            { href: "/en/about", label: "About" },
            { href: "/en/services", label: "Services" },
            { href: "/en/portfolio", label: "Works" },
            { href: "/en/contact", label: "Contact" },
        ]
        : [
            { href: "/about", label: "About Us" },
            { href: "/services", label: "Services" },
            { href: "/portfolio", label: "Works" },
            { href: "/contact", label: "Contact" },
        ];

    // Get the corresponding page in other language
    const getLanguageSwitchPath = () => {
        if (isEnglish) {
            // Remove /en prefix
            const koreanPath = router.pathname.replace(/^\/en/, "") || "/";
            return koreanPath;
        } else {
            // Add /en prefix
            return `/en${router.pathname === "/" ? "" : router.pathname}`;
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
                ? "bg-[var(--color-bg-primary)]/90 backdrop-blur-xl"
                : "bg-transparent"
        }`}>
            {/* Top border accent line */}
            <div className="h-[1px] bg-[var(--color-accent)] opacity-30" />

            <div className="container-custom">
                <div className="flex justify-between items-center h-20 md:h-24">
                    {/* Logo */}
                    <Link href={isEnglish ? "/en" : "/"} className="flex items-center group">
                        <Image
                            src={dark ? "/logo-dark.png" : "/logo-light.png"}
                            alt="NQ Solution"
                            width={140}
                            height={56}
                            className={`h-10 md:h-12 w-auto transition-all duration-500 ${dark ? "brightness-0 invert" : ""}`}
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation - Minimal */}
                    <div className="hidden md:flex items-center gap-12">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative text-xs tracking-widest uppercase transition-all duration-400 link-underline ${
                                    router.pathname === item.href
                                        ? "text-[var(--color-accent)]"
                                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Language Switcher */}
                        <Link
                            href={getLanguageSwitchPath()}
                            className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors"
                        >
                            {isEnglish ? "KR" : "EN"}
                        </Link>

                        <ThemeToggle dark={dark} setDark={setDark} />

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden flex flex-col gap-1.5 p-2"
                            aria-label="Toggle menu"
                        >
                            <span className={`w-5 h-[1px] bg-[var(--color-text-primary)] transition-all duration-300 ${
                                mobileMenuOpen ? "rotate-45 translate-y-[4px]" : ""
                            }`} />
                            <span className={`w-5 h-[1px] bg-[var(--color-text-primary)] transition-all duration-300 ${
                                mobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""
                            }`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Full Screen Overlay */}
            <div className={`md:hidden fixed inset-0 top-[85px] bg-[var(--color-bg-primary)] transition-all duration-500 ${
                mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}>
                <div className="container-custom py-16 flex flex-col gap-8">
                    {navItems.map((item, index) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-3xl font-serif tracking-tight transition-all duration-500 ${
                                mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            } ${
                                router.pathname === item.href
                                    ? "text-[var(--color-accent)]"
                                    : "text-[var(--color-text-primary)]"
                            }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="mt-8 pt-8 border-t border-[var(--color-border)] flex items-center justify-between">
                        <Link
                            href={isEnglish ? "/en/contact" : "/contact"}
                            onClick={() => setMobileMenuOpen(false)}
                            className="btn-primary inline-flex"
                        >
                            {isEnglish ? "Start a Project" : "프로젝트 문의"}
                        </Link>

                        <Link
                            href={getLanguageSwitchPath()}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm tracking-widest uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                        >
                            {isEnglish ? "한국어" : "English"}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const DEFAULT_SETTINGS = {
    email: "hello@nqsolution.com",
    phone: "+82 10-1234-5678",
    location: "Seoul, South Korea"
};

const Footer = ({ dark }: { dark: boolean }) => {
    const currentYear = new Date().getFullYear();
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const router = useRouter();

    const isEnglish = router.pathname.startsWith("/en");

    useEffect(() => {
        const savedSettings = localStorage.getItem("nq-site-settings");
        if (savedSettings) {
            setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
        }
    }, []);

    const navItems = isEnglish
        ? [
            { href: "/en/about", label: "About" },
            { href: "/en/services", label: "Services" },
            { href: "/en/portfolio", label: "Works" },
            { href: "/en/contact", label: "Contact" },
        ]
        : [
            { href: "/about", label: "About Us" },
            { href: "/services", label: "Services" },
            { href: "/portfolio", label: "Works" },
            { href: "/contact", label: "Contact" },
        ];

    return (
        <footer className="border-t border-[var(--color-border)]">
            {/* Main Footer */}
            <div className="container-custom py-20 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                    {/* Brand */}
                    <div className="md:col-span-5">
                        <Image
                            src={dark ? "/logo-dark.png" : "/logo-light.png"}
                            alt="NQ Solution"
                            width={120}
                            height={48}
                            className={`h-10 w-auto mb-8 ${dark ? "brightness-0 invert" : ""}`}
                        />
                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-sm mb-10">
                            {isEnglish ? (
                                <>
                                    Digital Craftsmanship.<br />
                                    Where innovation meets elegance.
                                </>
                            ) : (
                                <>
                                    디지털 크래프트맨십.<br />
                                    혁신과 우아함이 만나는 곳.
                                </>
                            )}
                        </p>

                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-3">
                        <h4 className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] mb-6">
                            Navigation
                        </h4>
                        <ul className="space-y-4">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-4">
                        <h4 className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] mb-6">
                            Contact
                        </h4>
                        <ul className="space-y-4 text-sm text-[var(--color-text-secondary)]">
                            <li>
                                <a
                                    href={`mailto:${settings.email}`}
                                    className="hover:text-[var(--color-accent)] transition-colors"
                                >
                                    {settings.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}
                                    className="hover:text-[var(--color-accent)] transition-colors"
                                >
                                    {settings.phone}
                                </a>
                            </li>
                            <li className="text-[var(--color-text-tertiary)]">
                                {settings.location}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[var(--color-border)]">
                <div className="container-custom py-6 flex justify-center items-center">
                    <p className="text-xs text-[var(--color-text-tertiary)]">
                        © {currentYear} NQ Solution
                    </p>
                </div>
            </div>
        </footer>
    );
};

const Layout = ({ children, dark, setDark }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] transition-colors duration-500">
            <Navbar dark={dark} setDark={setDark} />
            <main>
                {children}
            </main>
            <Footer dark={dark} />
        </div>
    );
};

export default Layout;
