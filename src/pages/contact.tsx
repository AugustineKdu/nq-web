import React, { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { siteConfig, koContent } from "../config";

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
        }).catch(() => {
            console.log("Using default settings from config");
        });
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

    return (
        <>
            <Head>
                <title>문의하기 | NQ Solution (엔큐솔루션) - 프로젝트 상담</title>
                <meta name="description" content="NQ Solution(엔큐솔루션)에 프로젝트를 문의하세요. 웹 개발, 앱 개발, AI 솔루션 무료 상담. nqsolution 엔큐솔루션 연락처" />
                <meta name="keywords" content="NQ Solution, nqsolution, 엔큐솔루션, 프로젝트문의, 개발상담, 웹개발견적, 앱개발비용, IT컨설팅, 연락처" />
                <meta property="og:title" content="문의하기 | NQ Solution (엔큐솔루션)" />
                <meta property="og:description" content="NQ Solution(엔큐솔루션)에 프로젝트를 문의하세요. 무료 상담 제공." />
                <meta property="og:url" content="https://www.nqsolution.com/contact" />
                <link rel="canonical" href="https://www.nqsolution.com/contact" />
            </Head>
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
                                            settings.showEmail !== false ? { label: "Email", value: settings.email, href: `mailto:${settings.email}` } : null,
                                            settings.showPhone !== false ? { label: "Phone", value: settings.phone, href: `tel:${settings.phone.replace(/[^+\d]/g, '')}` } : null,
                                            settings.showLocation !== false ? { label: "Location", value: settings.locationKo || settings.location, href: null as string | null } : null,
                                        ].filter((item): item is { label: string; value: string; href: string | null } => item !== null)).map((item, i) => (
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
                                                {item.href ? (
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
            </div>
        </>
    );
}
