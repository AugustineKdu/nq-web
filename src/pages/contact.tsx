import React, { useState } from "react";
import Head from "next/head";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function Contact() {
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
            </Head>

        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-8">
                <div className="max-w-6xl mx-auto">
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
                                        <span>김덕웅</span>
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
                                        onClick={() => copyToClipboard('010-3368-1594', 'phone')}
                                        className="group flex items-center gap-2 text-lg text-neutral-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        <span>010-3368-1594</span>
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
                                        onClick={() => copyToClipboard('010-33681594', 'companyPhone')}
                                        className="group flex items-center gap-2 text-lg text-neutral-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        <span>010-33681594</span>
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

            {/* Inquiry Button Section */}
            <section className="py-24 px-8">
                <div className="max-w-6xl mx-auto text-center">
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
                <div className="max-w-4xl mx-auto">
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