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

interface SiteSettings {
    email: string;
    phone: string;
    location: string;
    showPhone?: boolean;
    showEmail?: boolean;
    showLocation?: boolean;
}

interface ExternalLink {
    id: number;
    name: string;
    url: string;
    isVisible: boolean;
}

const DEFAULT_SETTINGS: SiteSettings = {
    email: "hello@nqsolution.com",
    phone: "+82 10-1234-5678",
    location: "Seoul, South Korea",
    showPhone: true,
    showEmail: true,
    showLocation: false
};

const Footer = ({ dark }: { dark: boolean }) => {
    const currentYear = new Date().getFullYear();
    const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
    const [externalLinks, setExternalLinks] = useState<ExternalLink[]>([]);
    const router = useRouter();
    const isEnglish = router.pathname.startsWith("/en");

    useEffect(() => {
        // Fetch settings
        fetch("/api/settings")
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setSettings({
                        email: data.email || DEFAULT_SETTINGS.email,
                        phone: data.phone || DEFAULT_SETTINGS.phone,
                        location: data.location || DEFAULT_SETTINGS.location,
                        showPhone: data.showPhone ?? true,
                        showEmail: data.showEmail ?? true,
                        showLocation: data.showLocation ?? false
                    });
                }
            })
            .catch(() => {});

        // Fetch external links
        fetch("/api/external-links")
            .then(res => res.ok ? res.json() : [])
            .then(data => setExternalLinks(data.filter((link: ExternalLink) => link.isVisible)))
            .catch(() => {});
    }, []);

    return (
        <footer className="border-t border-[var(--color-border)]">
            <div className="container-custom py-16 md:py-20">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
                    {/* Brand & Tagline */}
                    <div className="max-w-sm">
                        <Image
                            src={dark ? "/logo-dark.png" : "/logo-light.png"}
                            alt="NQ Solution"
                            width={120}
                            height={48}
                            className={`h-9 w-auto mb-4 ${dark ? "brightness-0 invert" : ""}`}
                        />
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            {isEnglish
                                ? "Turning new ideas into reality, fast."
                                : "새로운 아이디어를 빠르게 현실로."
                            }
                        </p>
                    </div>

                    {/* Contact & Links */}
                    <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
                        {/* Contact */}
                        <div>
                            <h4 className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] mb-4">
                                Contact
                            </h4>
                            <div className="space-y-2 text-sm">
                                {settings.showEmail !== false && (
                                    <a
                                        href={`mailto:${settings.email}`}
                                        className="block text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                                    >
                                        {settings.email}
                                    </a>
                                )}
                                {settings.showPhone !== false && (
                                    <a
                                        href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}
                                        className="block text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                                    >
                                        {settings.phone}
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* External Links */}
                        {externalLinks.length > 0 && (
                            <div>
                                <h4 className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] mb-4">
                                    Links
                                </h4>
                                <div className="space-y-2 text-sm">
                                    {externalLinks.map(link => (
                                        <a
                                            key={link.id}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-[var(--color-border)]">
                    <p className="text-xs text-[var(--color-text-tertiary)]">
                        © {currentYear} NQ Solution. All rights reserved.
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
