import React, { useState } from "react";
import Head from "next/head";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Contact() {
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const heroAnim = useScrollAnimation(0.1);
    const inquiryAnim = useScrollAnimation(0.15);
    const faqAnim = useScrollAnimation(0.15);

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
            {/* Hero Section - Desktop */}
            <section className="hidden md:block pt-32 pb-20 px-8">
                <div
                    ref={heroAnim.ref}
                    className={`max-w-6xl mx-auto transition-all duration-1000 ${
                        heroAnim.isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                    }`}
                >
                    <div className="mb-20">
                        <p className="text-sm tracking-[0.3em] text-neutral-900 dark:text-white uppercase mb-8">
                            Contact Us
                        </p>
                        <h1 className="text-[clamp(3rem,8vw,6rem)] font-light leading-[0.9] tracking-tighter mb-8">
                            Let&apos;s talk
                        </h1>
                        <div className="w-full h-px bg-neutral-900 dark:bg-neutral-100" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <p className="text-2xl leading-relaxed mb-8 text-neutral-900 dark:text-white font-medium">
                                프로젝트에 대해 이야기해보세요.
                                작은 아이디어부터 큰 비전까지,
                                함께 현실로 만들어갑니다.
                            </p>
                            <p className="text-lg text-neutral-900 dark:text-white font-medium">
                                24시간 내에 답변드립니다.
                            </p>
                        </div>
                        <div>
                            <div className="space-y-8">
                                 <div>
                                    <p className="text-xs uppercase tracking-wider text-neutral-900 dark:text-white mb-2 font-medium">Representative</p>
                                    <button
                                        onClick={() => copyToClipboard('김덕웅', 'name')}
                                        className="group flex items-center gap-2 text-lg text-neutral-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        <span>대표 김덕웅</span>
                                        {copiedField === 'name' ? (
                                            <CheckIcon className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <ClipboardDocumentIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </button>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-neutral-900 dark:text-white mb-2 font-medium">Email</p>
                                    <button
                                        onClick={() => copyToClipboard('duk98823@gmail.com', 'email')}
                                        className="group flex items-center gap-2 text-lg text-neutral-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        <span>duk98823@gmail.com</span>
                                        {copiedField === 'email' ? (
                                            <CheckIcon className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <ClipboardDocumentIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </button>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-neutral-900 dark:text-white mb-2 font-medium">Phone</p>
                                    <button
                                        onClick={() => copyToClipboard('01071681594', 'phone')}
                                        className="group flex items-center gap-2 text-lg text-neutral-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        <span>010-7168-1594</span>
                                        {copiedField === 'phone' ? (
                                            <CheckIcon className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <ClipboardDocumentIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </button>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-neutral-900 dark:text-white mb-2 font-medium">Company Phone</p>
                                    <button
                                        onClick={() => copyToClipboard('01033681594', 'companyPhone')}
                                        className="group flex items-center gap-2 text-lg text-neutral-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        <span>010-3368-1594</span>
                                        {copiedField === 'companyPhone' ? (
                                            <CheckIcon className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <ClipboardDocumentIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </button>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-neutral-900 dark:text-white mb-2 font-medium">Office</p>
                                    <button
                                        onClick={() => copyToClipboard('평택, South Korea', 'office')}
                                        className="group flex items-center gap-2 text-lg text-neutral-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        <span>평택, South Korea</span>
                                        {copiedField === 'office' ? (
                                            <CheckIcon className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <ClipboardDocumentIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Business Card Style */}
            <section className="md:hidden pt-20 pb-8 px-6 min-h-[calc(100vh-80px)] flex items-center justify-center">
                <div
                    ref={heroAnim.ref}
                    className={`w-full max-w-md transition-all duration-1000 ${
                        heroAnim.isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                    }`}
                >
                    {/* Business Card with Flip Animation */}
                    <div className="relative perspective-1000">
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
                            {/* Front of Card - Portrait */}
                            <div
                                className="portrait:block landscape:hidden backface-hidden"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <div className="relative bg-white dark:bg-neutral-900 rounded-3xl shadow-xl overflow-hidden border-2 border-neutral-200 dark:border-neutral-800">
                                    {/* Card Body */}
                                    <div className="p-8">
                                        {/* Company Info */}
                                        <div className="mb-8 text-center">
                                            <h2 className="text-4xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-2">
                                                NQ
                                            </h2>
                                            <p className="text-xs text-neutral-600 dark:text-neutral-400 tracking-[0.3em] uppercase">
                                                Solution
                                            </p>
                                        </div>

                                        {/* Representative Name - No Copy */}
                                        <div className="mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
                                            <p className="text-center text-lg font-semibold text-neutral-900 dark:text-white">
                                                대표 김덕웅
                                            </p>
                                            <p className="text-center text-xs text-neutral-500 dark:text-neutral-500 mt-1 italic">
                                                Digital Innovation Partner
                                            </p>
                                        </div>

                                        {/* Contact Grid */}
                                        <div className="space-y-5">
                                            {/* Email */}
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                                    <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">E</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-500 mb-1">Email</p>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copyToClipboard('duk98823@gmail.com', 'email');
                                                        }}
                                                        className="w-full text-left group"
                                                    >
                                                        <p className="text-sm font-medium text-neutral-900 dark:text-white group-active:text-blue-600 dark:group-active:text-blue-400 transition-colors break-all">
                                                            duk98823@gmail.com
                                                            {copiedField === 'email' && (
                                                                <span className="ml-2 text-xs text-green-500">✓ Copied</span>
                                                            )}
                                                        </p>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Mobile */}
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                                    <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">M</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-500 mb-1">Mobile</p>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copyToClipboard('01071681594', 'phone');
                                                        }}
                                                        className="w-full text-left group"
                                                    >
                                                        <p className="text-base font-semibold text-neutral-900 dark:text-white group-active:text-blue-600 dark:group-active:text-blue-400 transition-colors">
                                                            010-7168-1594
                                                            {copiedField === 'phone' && (
                                                                <span className="ml-2 text-xs text-green-500">✓ Copied</span>
                                                            )}
                                                        </p>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Company Phone */}
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                                    <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">T</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-500 mb-1">Tel</p>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copyToClipboard('01033681594', 'companyPhone');
                                                        }}
                                                        className="w-full text-left group"
                                                    >
                                                        <p className="text-base font-semibold text-neutral-900 dark:text-white group-active:text-blue-600 dark:group-active:text-blue-400 transition-colors">
                                                            010-3368-1594
                                                            {copiedField === 'companyPhone' && (
                                                                <span className="ml-2 text-xs text-green-500">✓ Copied</span>
                                                            )}
                                                        </p>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Office - No Copy */}
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                                    <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">L</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-500 mb-1">Location</p>
                                                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                                                        평택, South Korea
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Flip Hint */}
                                        <button
                                            onClick={() => setIsFlipped(true)}
                                            className="mt-8 pt-6 w-full border-t border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-400 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
                                        >
                                            Tap to see more →
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Back of Card - Portrait */}
                            <div
                                className="portrait:block landscape:hidden absolute inset-0 backface-hidden"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                }}
                            >
                                <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl overflow-hidden h-full flex items-center justify-center p-8">
                                    <div className="text-center">
                                        <div className="mb-8">
                                            <div className="w-16 h-1 bg-white/30 mx-auto mb-8 rounded-full"></div>
                                            <h3 className="text-4xl font-light text-white mb-6 leading-relaxed">
                                                New ideas를<br />더하고
                                            </h3>
                                            <h3 className="text-4xl font-light text-white mb-8 leading-relaxed">
                                                Quick action으로<br />실행하는
                                            </h3>
                                            <div className="text-6xl font-bold text-white tracking-tight mb-4">
                                                NQ
                                            </div>
                                            <p className="text-white/80 text-sm tracking-widest">
                                                SOLUTION
                                            </p>
                                        </div>

                                        {/* Back Flip Hint */}
                                        <button
                                            onClick={() => setIsFlipped(false)}
                                            className="mt-8 pt-6 border-t border-white/20 text-white/60 hover:text-white transition-colors text-xs"
                                        >
                                            ← Tap to flip back
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Landscape Card Layout */}
                            <div className="portrait:hidden landscape:block">
                                <div className="relative bg-white dark:bg-neutral-900 rounded-3xl shadow-xl overflow-hidden border-2 border-neutral-200 dark:border-neutral-800">
                                    <div className="flex h-[280px]">
                                        {/* Left Side - Company Info */}
                                        <div className="w-2/5 bg-neutral-900 dark:bg-neutral-800 flex flex-col items-center justify-center p-6 text-white">
                                            <div className="text-center">
                                                <h2 className="text-3xl font-bold tracking-tighter mb-2">
                                                    NQ
                                                </h2>
                                                <p className="text-xs tracking-[0.3em] uppercase opacity-80 mb-6">
                                                    Solution
                                                </p>
                                                <div className="w-12 h-px bg-white/30 mx-auto mb-4"></div>
                                                <p className="text-sm font-semibold mb-2">
                                                    대표 김덕웅
                                                </p>
                                                <p className="text-[10px] opacity-70 italic">
                                                    Digital Innovation Partner
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right Side - Contact Info */}
                                        <div className="w-3/5 p-6 overflow-y-auto">
                                            <div className="space-y-4">
                                                {/* Email */}
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                                        <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">E</span>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copyToClipboard('duk98823@gmail.com', 'email');
                                                        }}
                                                        className="flex-1 text-left group"
                                                    >
                                                        <p className="text-xs font-medium text-neutral-900 dark:text-white group-active:text-blue-600 transition-colors break-all">
                                                            duk98823@gmail.com
                                                            {copiedField === 'email' && (
                                                                <span className="ml-1 text-[10px] text-green-500">✓</span>
                                                            )}
                                                        </p>
                                                    </button>
                                                </div>

                                                {/* Mobile */}
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                                        <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">M</span>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copyToClipboard('01071681594', 'phone');
                                                        }}
                                                        className="flex-1 text-left group"
                                                    >
                                                        <p className="text-sm font-semibold text-neutral-900 dark:text-white group-active:text-blue-600 transition-colors">
                                                            010-7168-1594
                                                            {copiedField === 'phone' && (
                                                                <span className="ml-1 text-xs text-green-500">✓</span>
                                                            )}
                                                        </p>
                                                    </button>
                                                </div>

                                                {/* Tel */}
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                                        <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">T</span>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copyToClipboard('01033681594', 'companyPhone');
                                                        }}
                                                        className="flex-1 text-left group"
                                                    >
                                                        <p className="text-sm font-semibold text-neutral-900 dark:text-white group-active:text-blue-600 transition-colors">
                                                            010-3368-1594
                                                            {copiedField === 'companyPhone' && (
                                                                <span className="ml-1 text-xs text-green-500">✓</span>
                                                            )}
                                                        </p>
                                                    </button>
                                                </div>

                                                {/* Location */}
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                                        <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">L</span>
                                                    </div>
                                                    <p className="text-xs font-medium text-neutral-900 dark:text-white">
                                                        평택, South Korea
                                                    </p>
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