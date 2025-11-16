import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Contact() {
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [dark, setDark] = useState(false);
    const heroAnim = useScrollAnimation(0.1);
    const inquiryAnim = useScrollAnimation(0.15);
    const faqAnim = useScrollAnimation(0.15);

    useEffect(() => {
        // Check for dark mode
        const checkDarkMode = () => {
            setDark(document.documentElement.classList.contains('dark'));
        };

        checkDarkMode();

        // Watch for theme changes
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    const copyToClipboard = async (text: string, field: string) => {
        try {
            // Try modern clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers or non-secure contexts
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
            }
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <>
            <Head>
                <title>Contact | NQ Solution - 프로젝트 문의</title>
                <meta name="description" content="프로젝트에 대해 이야기해보세요. 작은 아이디어부터 큰 비전까지, 함께 현실로 만들어갑니다. 24시간 내 답변 드립니다." />
                <meta name="keywords" content="프로젝트문의, 상담신청, 견적문의, NQ Solution 연락처" />
                <link rel="canonical" href="https://nqsolution.kr/contact" />

                {/* Open Graph */}
                <meta property="og:title" content="Contact | NQ Solution - 프로젝트 문의" />
                <meta property="og:description" content="새로운 프로젝트를 시작해보세요. 아이디어를 현실로 만들어드립니다." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nqsolution.kr/contact" />
                <meta property="og:image" content="https://nqsolution.kr/nq_textlogo.png" />
                <meta property="og:image:width" content="600" />
                <meta property="og:image:height" content="200" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:alt" content="NQ Solution Logo" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact | NQ Solution - 프로젝트 문의" />
                <meta name="twitter:description" content="새로운 프로젝트를 시작해보세요. 아이디어를 현실로 만들어드립니다." />
                <meta name="twitter:image" content="https://nqsolution.kr/nq_textlogo.png" />
            </Head>

        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            {/* Hero Section - Desktop Business Card */}
            <section className="hidden md:block pt-32 pb-20 px-8">
                <div
                    ref={heroAnim.ref}
                    className={`max-w-6xl mx-auto transition-all duration-1000`}
                >
                    {/* Title Section */}
                    <div className="mb-16 text-center">
                        <p className="text-sm tracking-[0.3em] text-neutral-900 dark:text-white uppercase mb-4">
                            Contact Us
                        </p>
                        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-light leading-[0.9] tracking-tighter mb-6 text-neutral-900 dark:text-white">
                            Let&apos;s work together
                        </h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            프로젝트에 대해 이야기해보세요. 작은 아이디어부터 큰 비전까지, 함께 현실로 만들어갑니다.
                        </p>
                    </div>

                    {/* Desktop Business Card - Enlarged */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Business Card Container */}
                            <div
                                className={`relative transition-all duration-1000 hover:scale-[1.02]`}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                                }}
                            >
                                {/* Front of Card - All Info Visible */}
                                <div
                                    className="relative"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        minHeight: '450px'
                                    }}
                                >
                                    <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 h-[450px]">
                                        {/* Minimalist Pattern */}
                                        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
                                             style={{
                                                 backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120,120,120,0.1) 0%, transparent 50%)`,
                                             }}
                                        />

                                        <div className="relative p-16 h-[450px]">
                                            {/* Logo Top Right (Much Bigger) */}
                                            <div className="absolute top-12 right-12">
                                                <div className="relative w-[200px] h-[54px]">
                                                    <Image
                                                        src="/logo-light.png"
                                                        alt="NQ Solution Logo"
                                                        width={200}
                                                        height={54}
                                                        priority
                                                        className={`absolute inset-0 transition-opacity duration-500 ${dark ? 'opacity-0' : 'opacity-100'}`}
                                                    />
                                                    <Image
                                                        src="/logo-dark.png"
                                                        alt="NQ Solution Logo"
                                                        width={200}
                                                        height={54}
                                                        priority
                                                        className={`absolute inset-0 transition-opacity duration-500 ${dark ? 'opacity-100' : 'opacity-0'}`}
                                                    />
                                                </div>
                                            </div>

                                            {/* Name and Title - Center Left */}
                                            <div className="absolute top-1/2 left-16 -translate-y-1/2">
                                                <div className="mb-8">
                                                    <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                                                        김덕웅
                                                    </h2>
                                                    <p className="text-lg text-neutral-600 dark:text-neutral-400">
                                                        대표
                                                    </p>
                                                    <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">
                                                        Digital Innovation Partner
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Contact Info - Bottom */}
                                            <div className="absolute bottom-12 left-16 right-16">
                                                <div className="grid grid-cols-4 gap-6 pt-8 border-t border-neutral-200/50 dark:border-neutral-800/50">
                                                    {/* Phone */}
                                                    <button
                                                        onClick={() => copyToClipboard('01071681594', 'phone')}
                                                        className="group text-left hover:scale-105 transition-transform duration-200"
                                                    >
                                                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">Mobile</p>
                                                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                                                            010-7168-1594
                                                            {copiedField === 'phone' && (
                                                                <span className="ml-2 text-xs text-green-500">✓</span>
                                                            )}
                                                        </p>
                                                    </button>

                                                    {/* Tel */}
                                                    <button
                                                        onClick={() => copyToClipboard('01033681594', 'companyPhone')}
                                                        className="group text-left hover:scale-105 transition-transform duration-200"
                                                    >
                                                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">Tel</p>
                                                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                                                            010-3368-1594
                                                            {copiedField === 'companyPhone' && (
                                                                <span className="ml-2 text-xs text-green-500">✓</span>
                                                            )}
                                                        </p>
                                                    </button>

                                                    {/* Email */}
                                                    <button
                                                        onClick={() => copyToClipboard('duk98823@gmail.com', 'email')}
                                                        className="group text-left hover:scale-105 transition-transform duration-200"
                                                    >
                                                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">Email</p>
                                                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors break-all">
                                                            duk98823@gmail.com
                                                            {copiedField === 'email' && (
                                                                <span className="ml-2 text-xs text-green-500">✓</span>
                                                            )}
                                                        </p>
                                                    </button>

                                                    {/* Website */}
                                                    <button
                                                        onClick={() => copyToClipboard('https://nqsolution.kr', 'website')}
                                                        className="group text-left hover:scale-105 transition-transform duration-200"
                                                    >
                                                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">Website</p>
                                                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                                                            nqsolution.kr
                                                            {copiedField === 'website' && (
                                                                <span className="ml-2 text-xs text-green-500">✓</span>
                                                            )}
                                                        </p>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Flip Button - Small and Subtle */}
                                            <button
                                                onClick={() => setIsFlipped(true)}
                                                className="absolute top-12 left-12 text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                                            >
                                                About →
                                            </button>

                                        </div>
                                    </div>
                                </div>

                                {/* Back of Card - Simplified */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)',
                                        minHeight: '450px'
                                    }}
                                >
                                    <div className="bg-neutral-900 dark:bg-black rounded-2xl shadow-2xl overflow-hidden h-[450px] flex items-center justify-center p-16">
                                        <div className="text-center text-white">
                                            <div className="mb-12">
                                                <div className="text-5xl font-bold mb-2">
                                                    엔큐솔루션
                                                </div>
                                                <p className="text-lg tracking-[0.2em] text-white/60 mb-8">
                                                    NQ SOLUTION
                                                </p>
                                                <h3 className="text-2xl font-light leading-relaxed text-white/90">
                                                    혁신적인 아이디어를<br />
                                                    빠르게 실행하여<br />
                                                    비즈니스 성장을 함께 만들어갑니다
                                                </h3>
                                            </div>

                                            {/* Services */}
                                            <div className="mb-12">
                                                <div className="grid grid-cols-4 gap-4 text-sm text-white/70">
                                                    <div>웹 개발</div>
                                                    <div>앱 개발</div>
                                                    <div>UI/UX</div>
                                                    <div>컨설팅</div>
                                                </div>
                                            </div>

                                            {/* Back Button */}
                                            <button
                                                onClick={() => setIsFlipped(false)}
                                                className="text-sm text-white/50 hover:text-white transition-colors"
                                            >
                                                ← Back
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hint Text */}
                            <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-6">
                                Click contact info to copy • Click card to flip
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Business Card Style - Simplified */}
            <section className="md:hidden pt-24 pb-8 px-6 min-h-[calc(100vh-80px)] flex items-center justify-center">
                <div
                    ref={heroAnim.ref}
                    className={`w-full max-w-md transition-all duration-1000 ${
                        heroAnim.isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                    }`}
                >
                    {/* Business Card with Flip Animation */}
                    <div className="relative">
                        {/* Flip Container */}
                        <div
                            className={`relative w-full transition-transform duration-700 transform-style-3d ${
                                isFlipped ? 'rotate-y-180' : ''
                            }`}
                            style={{
                                transformStyle: 'preserve-3d',
                                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                            }}
                        >
                            {/* Front of Card - Simplified Design */}
                            <div
                                className="backface-hidden"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <div className="relative bg-white dark:bg-neutral-900 rounded-xl shadow-xl overflow-hidden border border-neutral-200/20 dark:border-neutral-800/20">
                                    {/* Card Body - Business Card Style */}
                                    <div className="relative p-8 h-[460px]">
                                        {/* Logo - Top Right (Much Bigger) */}
                                        <div className="absolute top-8 right-8">
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
                                        </div>

                                        {/* Name - Center */}
                                        <div className="absolute top-1/2 left-8 -translate-y-1/2">
                                            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                                                김덕웅
                                            </h2>
                                            <p className="text-base text-neutral-600 dark:text-neutral-400">
                                                대표
                                            </p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                                                Digital Innovation Partner
                                            </p>
                                        </div>

                                        {/* Contact Info - Bottom */}
                                        <div className="absolute bottom-8 left-8 right-8">
                                            <div className="space-y-3 pt-6 border-t border-neutral-200/50 dark:border-neutral-800/50">
                                                <div className="grid grid-cols-2 gap-4">
                                                    {/* Phone */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copyToClipboard('01071681594', 'phone');
                                                        }}
                                                        className="text-left group"
                                                    >
                                                        <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-1">Mobile</p>
                                                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-active:text-blue-600 transition-colors">
                                                            010-7168-1594
                                                            {copiedField === 'phone' && (
                                                                <span className="ml-1 text-[10px] text-green-500">✓</span>
                                                            )}
                                                        </p>
                                                    </button>

                                                    {/* Tel */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copyToClipboard('01033681594', 'companyPhone');
                                                        }}
                                                        className="text-left group"
                                                    >
                                                        <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-1">Tel</p>
                                                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-active:text-blue-600 transition-colors">
                                                            010-3368-1594
                                                            {copiedField === 'companyPhone' && (
                                                                <span className="ml-1 text-[10px] text-green-500">✓</span>
                                                            )}
                                                        </p>
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    {/* Email */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copyToClipboard('duk98823@gmail.com', 'email');
                                                        }}
                                                        className="text-left group"
                                                    >
                                                        <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-1">Email</p>
                                                        <p className="text-[13px] font-medium text-neutral-800 dark:text-neutral-200 group-active:text-blue-600 transition-colors">
                                                            duk98823@gmail.com
                                                            {copiedField === 'email' && (
                                                                <span className="ml-1 text-[10px] text-green-500">✓</span>
                                                            )}
                                                        </p>
                                                    </button>

                                                    {/* Website */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copyToClipboard('https://nqsolution.kr', 'website');
                                                        }}
                                                        className="text-left group"
                                                    >
                                                        <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-1">Website</p>
                                                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-active:text-blue-600 transition-colors">
                                                            nqsolution.kr
                                                            {copiedField === 'website' && (
                                                                <span className="ml-1 text-[10px] text-green-500">✓</span>
                                                            )}
                                                        </p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Flip Button - Subtle */}
                                        <button
                                            onClick={() => setIsFlipped(true)}
                                            className="absolute top-8 left-8 text-[10px] text-neutral-400 hover:text-neutral-600 transition-colors"
                                        >
                                            About →
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Back of Card - Simplified */}
                            <div
                                className="absolute inset-0 backface-hidden"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                }}
                            >
                                <div className="relative bg-neutral-900 dark:bg-black rounded-2xl shadow-2xl overflow-hidden h-full flex items-center justify-center p-10">
                                    <div className="text-center">
                                        <div>
                                            <div className="text-5xl font-bold text-white mb-2">
                                                엔큐솔루션
                                            </div>
                                            <p className="text-white/60 text-sm tracking-[0.2em] mb-12">
                                                NQ SOLUTION
                                            </p>
                                            <p className="text-xl font-light text-white/90 leading-relaxed mb-12">
                                                혁신적인 아이디어를<br />
                                                빠르게 실행하여<br />
                                                비즈니스 성장을 함께
                                            </p>
                                            <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                                                <div>웹 개발</div>
                                                <div>앱 개발</div>
                                                <div>UI/UX</div>
                                                <div>컨설팅</div>
                                            </div>
                                        </div>

                                        {/* Back Button */}
                                        <button
                                            onClick={() => setIsFlipped(false)}
                                            className="mt-12 w-full py-4 bg-white/10 rounded-xl text-sm text-white/60 hover:bg-white/20 transition-colors"
                                        >
                                            ← Contact Info
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Landscape Card Layout - Removed, using same as portrait */}
                            <div className="hidden">
                                <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden">
                                    <div className="flex h-[320px]">
                                        {/* Left Side - Company Info */}
                                        <div className="w-2/5 bg-neutral-900 dark:bg-black flex flex-col items-center justify-center p-8 text-white">
                                            <div className="text-center">
                                                <h2 className="text-4xl font-bold tracking-tight mb-2">
                                                    NQ
                                                </h2>
                                                <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-8">
                                                    Solution
                                                </p>
                                                <div className="w-12 h-px bg-white/20 mx-auto mb-6"></div>
                                                <p className="text-lg font-semibold mb-1">
                                                    김덕웅
                                                </p>
                                                <p className="text-xs text-white/60 uppercase tracking-wider">
                                                    CEO
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right Side - Contact Info */}
                                        <div className="w-3/5 p-8 flex flex-col justify-center">
                                            <div className="space-y-6">
                                                {/* Phone Group */}
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-3">Contact</p>
                                                    <div className="space-y-2">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                copyToClipboard('01071681594', 'phone');
                                                            }}
                                                            className="w-full text-left group flex items-center gap-2"
                                                        >
                                                            <span className="text-[10px] text-neutral-400 w-4">M</span>
                                                            <p className="text-sm font-medium text-neutral-900 dark:text-white group-active:text-blue-600 transition-colors">
                                                                010-7168-1594
                                                                {copiedField === 'phone' && (
                                                                    <span className="ml-1 text-xs text-green-500">✓</span>
                                                                )}
                                                            </p>
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                copyToClipboard('01033681594', 'companyPhone');
                                                            }}
                                                            className="w-full text-left group flex items-center gap-2"
                                                        >
                                                            <span className="text-[10px] text-neutral-400 w-4">T</span>
                                                            <p className="text-sm font-medium text-neutral-900 dark:text-white group-active:text-blue-600 transition-colors">
                                                                010-3368-1594
                                                                {copiedField === 'companyPhone' && (
                                                                    <span className="ml-1 text-xs text-green-500">✓</span>
                                                                )}
                                                            </p>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Email & Location */}
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-3">Digital</p>
                                                    <div className="space-y-2">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                copyToClipboard('duk98823@gmail.com', 'email');
                                                            }}
                                                            className="w-full text-left group"
                                                        >
                                                            <p className="text-xs font-medium text-neutral-900 dark:text-white group-active:text-blue-600 transition-colors break-all">
                                                                duk98823@gmail.com
                                                                {copiedField === 'email' && (
                                                                    <span className="ml-1 text-xs text-green-500">✓</span>
                                                                )}
                                                            </p>
                                                        </button>
                                                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                                            평택, South Korea
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tap to Copy Hint */}
                        <p className="text-center text-xs text-neutral-500 dark:text-neutral-500 mt-4">
                            Tap phone or email to copy
                        </p>
                    </div>
                </div>
            </section>

            {/* Inquiry Button Section */}
            <section className="py-24 px-8">
                <div
                    ref={inquiryAnim.ref}
                    className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${
                        inquiryAnim.isVisible
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-95'
                    }`}
                >
                    <div className="mb-8">
                        <h3 className="text-2xl font-light text-neutral-900 dark:text-transparent dark:bg-gradient-to-r dark:from-blue-600 dark:via-purple-600 dark:to-teal-600 dark:bg-clip-text mb-4">
                            새로운 프로젝트를 시작해보세요
                        </h3>
                        <p className="text-lg text-neutral-900 dark:text-white">
                            아이디어를 현실로 만들어드립니다
                        </p>
                    </div>
                    <div className="relative group">
                        <a 
                            href="https://www.pluuug.com/form/TFBfcQZvgB"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-flex items-center justify-center px-16 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 text-xl font-medium tracking-wide rounded-2xl border-2 border-transparent hover:border-white/20 backdrop-blur-sm hover:scale-105 transform"
                        >
                            <span className="mr-3">프로젝트 문의하기</span>
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl -z-10 group-hover:blur-2xl transition-all duration-300"></div>
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-8">
                <div
                    ref={faqAnim.ref}
                    className={`max-w-4xl mx-auto transition-all duration-1000 ${
                        faqAnim.isVisible
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 -translate-x-10'
                    }`}
                >
                    <h2 className="text-4xl font-light mb-16 text-neutral-900 dark:text-white">자주 묻는 질문</h2>

                    <div className="space-y-12">
                        {[
                            {
                                q: "프로젝트는 얼마나 걸리나요?",
                                a: "프로젝트의 규모와 복잡도에 따라 다르지만, 일반적으로 웹사이트는 1-2달, 앱은 4-8달 정도 소요됩니다. 기간은 초기 상담 후 구체적으로 안내해드립니다. 또한 프로젝트 크기에 따라 달라질수 있습니다"
                            },
                            {
                                q: "비용은 어떻게 책정되나요?",
                                a: "프로젝트의 범위, 기능, 디자인 복잡도 등을 고려하여 견적을 산출합니다. 무료 상담을 통해 정확한 견적을 받아보세요."
                            },
                            {
                                q: "유지보수도 가능한가요?",
                                a: "네, 프로젝트 완료 후에도 지속적인 유지보수와 업데이트 서비스를 제공합니다."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="border-b border-neutral-200 dark:border-neutral-800 pb-8">
                                <h3 className="text-xl font-light mb-4 text-neutral-900 dark:text-white">{faq.q}</h3>
                                <p className="text-neutral-900 dark:text-white">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
        </>
    );
}