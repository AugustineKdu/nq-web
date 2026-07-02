import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { siteConfig, koContent } from "../config";
import Seo from "../components/Seo";

interface ContactContent {
    heroIntro: string;
    heroDescription: string;
    formDescription: string;
    formButton: string;
    ctaSubtext: string;
}

interface FaqItem {
    question: string;
    answer: string;
}

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
};

const slideIn = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
};

// Default settings from config
const DEFAULT_SETTINGS = {
    contactFormUrl: siteConfig.contactFormUrl,
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    location: siteConfig.contact.location,
    locationKo: siteConfig.contact.locationKo,
    showEmail: true,
    showPhone: true,
    showLocation: true,
};

export default function Contact() {
    const { dark } = useTheme();
    const staticContent = koContent.contact;
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [contactContent, setContactContent] = useState<ContactContent | null>(null);
    const [faqItems, setFaqItems] = useState<FaqItem[]>([]);

    // Fetch settings and content from database API
    useEffect(() => {
        Promise.all([
            fetch("/api/settings").then(r => r.ok ? r.json() : null),
            fetch("/api/contact-content?lang=ko").then(r => r.ok ? r.json() : null),
            fetch("/api/faq").then(r => r.ok ? r.json() : [])
        ]).then(([settingsData, contentData, faqData]) => {
            if (settingsData) setSettings({ ...DEFAULT_SETTINGS, ...settingsData });
            if (contentData) setContactContent(contentData);
            if (faqData?.length) setFaqItems(faqData.filter((f: FaqItem & { lang: string }) => f.lang === "ko"));
        }).catch(() => {});
    }, []);

    // Use DB content or fallback to static
    const content = {
        hero: {
            intro: contactContent?.heroIntro || staticContent.hero.intro,
            description: contactContent?.heroDescription || staticContent.hero.description
        },
        form: {
            description: contactContent?.formDescription || staticContent.form.description,
            items: staticContent.form.items,
            button: contactContent?.formButton || staticContent.form.button
        },
        faq: {
            items: faqItems.length > 0
                ? faqItems.map(f => ({ q: f.question, a: f.answer }))
                : staticContent.faq.items
        },
        cta: {
            subtext: contactContent?.ctaSubtext || staticContent.cta.subtext
        }
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: staticContent.faq.items.map((f: { q: string; a: string }) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };

    return (
        <>
            <Seo
                title="문의하기 | NQ Solution (엔큐솔루션) - 웹개발, 앱개발, 프로그램개발 상담"
                description="NQ Solution(엔큐솔루션)에 프로젝트를 문의하세요. 웹개발, 앱개발, 프로그램개발, 시스템개발 무료 상담. 홈페이지 제작 견적부터 업무 자동화까지. nqsolution 엔큐솔루션 연락처"
                path="/contact"
                enPath="/en/contact"
                jsonLd={faqJsonLd}
                keywords="NQ Solution, nqsolution, 엔큐솔루션, 프로젝트문의, 개발상담, 웹개발견적, 앱개발비용, 프로그램개발견적, 시스템개발비용, 홈페이지제작비용, IT외주, 연락처"
            />
            <div className="min-h-screen">
            {/* Hero */}
            <section className="pt-32 md:pt-40 pb-20">
                <div className="container-custom">
                    <div className="grid grid-cols-12 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="col-span-12 lg:col-span-2"
                        >
                            <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">
                                Contact
                            </span>
                        </motion.div>
                        <div className="col-span-12 lg:col-span-10">
                            <motion.h1
                                className="text-display-lg font-serif mb-12"
                                initial="hidden"
                                animate="visible"
                                variants={stagger}
                            >
                                <motion.span variants={fadeIn} className="block">
                                    Get in Touch
                                </motion.span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl"
                            >
                                <p className="text-xl leading-relaxed text-[var(--color-text-secondary)]">
                                    {content.hero.intro.split('\n').map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            {i < content.hero.intro.split('\n').length - 1 && <br />}
                                        </span>
                                    ))}
                                </p>
                                <p className="text-base leading-relaxed text-[var(--color-text-tertiary)]">
                                    {content.hero.description}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info & CTA */}
            <section className="pb-20">
                <div className="container-custom">
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-2" />
                        <div className="col-span-12 lg:col-span-10">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={stagger}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                            >
                                {/* Contact Card */}
                                <motion.div
                                    variants={fadeIn}
                                    whileHover={{ y: -5 }}
                                    className="card p-10 md:p-12 transition-transform"
                                >
                                    <div className="flex items-start justify-between mb-12">
                                        <Image
                                            src={dark ? "/logo-dark.png" : "/logo-light.png"}
                                            alt={siteConfig.company.name}
                                            width={100}
                                            height={40}
                                            className={`h-8 w-auto ${dark ? "brightness-0 invert" : ""}`}
                                        />
                                    </div>

                                    <div className="space-y-6 mb-12">
                                        {([
                                            settings.showEmail !== false ? { label: "Email", value: settings.email, href: `mailto:${settings.email}`, kakao: false } : null,
                                            settings.showPhone !== false ? { label: "Phone", value: settings.phone, href: `tel:${settings.phone.replace(/[^+\d]/g, '')}`, kakao: false } : null,
                                            { label: "KakaoTalk", value: "카카오톡 채널 상담", href: null as string | null, kakao: true },
                                            settings.showLocation !== false ? { label: "Location", value: settings.locationKo || settings.location, href: null as string | null, kakao: false } : null,
                                        ].filter((item): item is { label: string; value: string; href: string | null; kakao: boolean } => item !== null)).map((item, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <span className="text-xs tracking-widest uppercase text-[var(--color-accent)] block mb-2">
                                                    {item.label}
                                                </span>
                                                {item.kakao ? (
                                                    <button
                                                        onClick={() => {
                                                            if (window.Kakao?.Channel) {
                                                                window.Kakao.Channel.chat({ channelPublicId: "_iTLzX" });
                                                            } else {
                                                                window.open("https://pf.kakao.com/_iTLzX/chat", "_blank");
                                                            }
                                                        }}
                                                        className="text-lg hover:text-[var(--color-accent)] transition-colors text-left"
                                                    >
                                                        {item.value}
                                                    </button>
                                                ) : item.href ? (
                                                    <a
                                                        href={item.href}
                                                        className="text-lg hover:text-[var(--color-accent)] transition-colors"
                                                    >
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-lg text-[var(--color-text-secondary)]">
                                                        {item.value}
                                                    </p>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* CTA */}
                                <motion.div
                                    variants={fadeIn}
                                    className="flex flex-col justify-center"
                                >
                                    <h2 className="text-display-sm font-serif mb-6">
                                        Start a Project
                                    </h2>
                                    <p className="text-[var(--color-text-secondary)] mb-6">
                                        {content.form.description}
                                    </p>
                                    <ul className="space-y-2 text-sm text-[var(--color-text-tertiary)] mb-10">
                                        {content.form.items.map((item, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-center gap-3"
                                            >
                                                <span className="text-[var(--color-accent)]">—</span>
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                    <motion.a
                                        href={settings.contactFormUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="btn-primary inline-flex self-start"
                                    >
                                        {content.form.button}
                                        <ArrowUpRight className="w-4 h-4" />
                                    </motion.a>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 견적 안내 */}
            <section className="section-padding border-t border-[var(--color-border)]">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="grid grid-cols-12 gap-8 mb-16"
                    >
                        <motion.div variants={slideIn} className="col-span-12 lg:col-span-2">
                            <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">
                                Estimate
                            </span>
                        </motion.div>
                        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-10">
                            <h2 className="text-display-sm font-serif mb-4">
                                견적이 궁금하세요?
                            </h2>
                            <p className="text-[var(--color-text-secondary)] max-w-lg">
                                원하는 기능만 고르면 예상 견적이 바로 나옵니다. 더 자세한 요구사항이나 파일 첨부가 필요하면 의뢰서를 남겨주세요.
                            </p>
                        </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-12 gap-8">
                        <div className="hidden lg:block lg:col-span-2" />
                        <div className="col-span-12 lg:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Link href="/estimate" className="card-interactive p-10 group block">
                                    <div className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-4">
                                        1분 견적 계산기
                                    </div>
                                    <h3 className="text-xl font-serif mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                                        예상 견적 바로 확인
                                    </h3>
                                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                        프로젝트 유형과 기능을 선택하면 예상 비용과 기간을 즉시 알려드립니다. 그대로 상담 신청까지 한 번에.
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-sm text-[var(--color-accent)]">
                                        견적 계산하기 <ArrowUpRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            <a
                                href={settings.contactFormUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card-interactive p-10 group block"
                            >
                                <div className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-4">
                                    정식 의뢰서
                                </div>
                                <h3 className="text-xl font-serif mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                                    상세 의뢰 · 파일 첨부
                                </h3>
                                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                    요구사항을 자세히 적고 참고 자료(최대 30MB)를 첨부해 보내실 수 있습니다. 작성해주시면 2~3일 내 제안서를 드립니다.
                                </p>
                                <span className="inline-flex items-center gap-2 text-sm text-[var(--color-accent)]">
                                    의뢰서 작성하기 <ArrowUpRight className="w-4 h-4" />
                                </span>
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8 mt-8">
                        <div className="hidden lg:block lg:col-span-2" />
                        <div className="col-span-12 lg:col-span-10">
                            <p className="text-sm text-[var(--color-text-tertiary)]">
                                간단히 물어보고 싶을 땐{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (window.Kakao?.Channel) {
                                            window.Kakao.Channel.chat({ channelPublicId: "_iTLzX" });
                                        } else {
                                            window.open("https://pf.kakao.com/_iTLzX/chat", "_blank");
                                        }
                                    }}
                                    className="text-[var(--color-accent)] hover:underline"
                                >
                                    카카오톡 상담
                                </button>
                                {settings.showPhone !== false && (
                                    <>
                                        {" · "}
                                        <a href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`} className="text-[var(--color-accent)] hover:underline">
                                            {settings.phone}
                                        </a>
                                    </>
                                )}
                                {settings.showEmail !== false && (
                                    <>
                                        {" · "}
                                        <a href={`mailto:${settings.email}`} className="text-[var(--color-accent)] hover:underline">
                                            {settings.email}
                                        </a>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-padding bg-[var(--color-bg-secondary)]">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="grid grid-cols-12 gap-8 mb-16"
                    >
                        <motion.div variants={slideIn} className="col-span-12 lg:col-span-2">
                            <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">
                                FAQ
                            </span>
                        </motion.div>
                        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-10">
                            <h2 className="text-display-sm font-serif">
                                Common Questions
                            </h2>
                        </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-2" />
                        <div className="col-span-12 lg:col-span-8">
                            {content.faq.items.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="border-t border-[var(--color-border)] py-6"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex items-start justify-between text-left group"
                                        aria-expanded={openFaq === i}
                                    >
                                        <h3 className="text-lg font-serif pr-8 group-hover:text-[var(--color-accent)] transition-colors">
                                            {faq.q}
                                        </h3>
                                        <motion.div
                                            animate={{ rotate: openFaq === i ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ChevronDown
                                                className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-1"
                                            />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-6">
                                                    {faq.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                            <div className="border-t border-[var(--color-border)]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-[var(--color-accent)] overflow-hidden relative">
                {/* Animated background circles */}
                <motion.div
                    className="absolute -left-20 -top-20 w-60 h-60 rounded-full border border-white/10"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full border border-white/10"
                    animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute right-1/4 top-10 w-20 h-20 rounded-full bg-white/5"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="container-custom relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.15 } }
                        }}
                        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12"
                    >
                        <div>
                            <motion.h2
                                variants={{
                                    hidden: { opacity: 0, x: -30 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                                className="text-display-sm font-serif text-white mb-4"
                            >
                                Let&apos;s Talk
                            </motion.h2>
                            <motion.p
                                variants={{
                                    hidden: { opacity: 0, x: -30 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                                className="text-white/60 text-lg"
                            >
                                {content.cta.subtext}
                            </motion.p>
                        </div>
                        <motion.a
                            href={`mailto:${settings.email}`}
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 1, scale: 1 }
                            }}
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative inline-flex items-center gap-3 md:gap-4 px-5 py-3 md:px-8 md:py-4 bg-white text-[var(--color-accent)] text-xs md:text-sm tracking-wider md:tracking-widest uppercase font-medium transition-all shrink-0 overflow-hidden"
                        >
                            <motion.span
                                className="absolute inset-0 bg-stone-100"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                            <span className="relative z-10">{settings.email}</span>
                        </motion.a>
                    </motion.div>
                </div>
            </section>
            {/* Floating Kakao Chat Button */}
            <motion.button
                onClick={() => {
                    if (window.Kakao?.Channel) {
                        window.Kakao.Channel.chat({ channelPublicId: "_iTLzX" });
                    } else {
                        window.open("https://pf.kakao.com/_iTLzX/chat", "_blank");
                    }
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#FEE500] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                aria-label="카카오톡 상담"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.53-.96 3.39-.99 3.6 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.7-2.44 4.28-2.85.56.08 1.14.13 1.72.13 5.52 0 10-3.58 10-7.94S17.52 3 12 3z" fill="#3C1E1E"/>
                </svg>
            </motion.button>
            </div>
        </>
    );
}
