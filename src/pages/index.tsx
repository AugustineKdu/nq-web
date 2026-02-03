import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import { koContent } from "../config";
import { useTheme } from "../context/ThemeContext";

interface HomeContent {
    heroEyebrow: string;
    heroHeadline: string[];
    heroSubtext: string;
    heroCta: string;
    servicesEyebrow: string;
    servicesHeadline: string;
    servicesViewAll: string;
    processEyebrow: string;
    processHeadline: string;
    aiEyebrow: string;
    aiHeadline: string;
    aiDescription: string;
    ctaSubtext: string;
    ctaButton: string;
}

interface ServiceItem {
    number: string;
    title: string;
    subtitle: string;
    description: string;
}

interface ProcessStep {
    num: string;
    title: string;
    desc: string;
}

interface AiItem {
    content: string;
}

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
};

const slideIn = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
};

export default function Home() {
    const { dark } = useTheme();
    const staticContent = koContent.home;

    // State for DB content
    const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
    const [aiItems, setAiItems] = useState<AiItem[]>([]);

    // Fetch content from DB
    useEffect(() => {
        Promise.all([
            fetch("/api/home-content?lang=ko").then(r => r.ok ? r.json() : null),
            fetch("/api/services").then(r => r.ok ? r.json() : []),
            fetch("/api/process").then(r => r.ok ? r.json() : []),
            fetch("/api/ai-items").then(r => r.ok ? r.json() : [])
        ]).then(([content, servicesData, processData, aiData]) => {
            if (content) setHomeContent(content);
            if (servicesData?.length) setServices(servicesData.filter((s: ServiceItem & { lang: string; pageType: string }) => s.lang === "ko" && s.pageType === "home"));
            if (processData?.length) setProcessSteps(processData.filter((p: ProcessStep & { lang: string; pageType: string }) => p.lang === "ko" && p.pageType === "home"));
            if (aiData?.length) setAiItems(aiData.filter((a: AiItem & { lang: string }) => a.lang === "ko"));
        }).catch(() => {});
    }, []);

    // Use DB content or fallback to static
    const content = {
        hero: {
            eyebrow: homeContent?.heroEyebrow || staticContent.hero.eyebrow,
            subtext: homeContent?.heroSubtext || staticContent.hero.subtext,
            cta: homeContent?.heroCta || staticContent.hero.cta
        },
        services: {
            eyebrow: homeContent?.servicesEyebrow || staticContent.services.eyebrow,
            headline: homeContent?.servicesHeadline || staticContent.services.headline,
            viewAll: homeContent?.servicesViewAll || staticContent.services.viewAll,
            items: services.length > 0
                ? services.map(s => ({ title: s.title, desc: s.description }))
                : staticContent.services.items
        },
        process: {
            eyebrow: homeContent?.processEyebrow || staticContent.process.eyebrow,
            headline: homeContent?.processHeadline || staticContent.process.headline,
            steps: processSteps.length > 0
                ? processSteps.map(p => ({ title: p.title, desc: p.desc }))
                : staticContent.process.steps
        },
        ai: {
            eyebrow: homeContent?.aiEyebrow || staticContent.ai.eyebrow,
            headline: homeContent?.aiHeadline || staticContent.ai.headline,
            description: homeContent?.aiDescription || staticContent.ai.description,
            items: aiItems.length > 0
                ? aiItems.map(a => a.content)
                : staticContent.ai.items
        },
        cta: {
            subtext: homeContent?.ctaSubtext || staticContent.cta.subtext,
            button: homeContent?.ctaButton || staticContent.cta.button
        }
    };

    // Use DB headline or default
    const heroHeadline = homeContent?.heroHeadline || ["Ideas into", "Reality"];

    return (
        <>
            <Head>
                <title>NQ Solution (엔큐솔루션) | 웹개발, 앱개발, AI솔루션 전문 IT개발 회사</title>
                <meta name="description" content="NQ Solution(엔큐솔루션)은 웹 개발, 앱 개발, AI 솔루션을 전문으로 하는 IT 개발 회사입니다. 평택 기반 전국 서비스. 홈페이지 제작, 모바일 앱 개발, UI/UX 디자인. nqsolution 엔큐솔루션" />
                <meta name="keywords" content="NQ Solution, nqsolution, 엔큐솔루션, NQ솔루션, 웹개발, 앱개발, AI솔루션, 홈페이지제작, 웹사이트제작, 모바일앱개발, IT개발, 평택개발사, 전국IT개발, 웹에이전시, 디지털에이전시" />
                <meta property="og:title" content="NQ Solution (엔큐솔루션) | 웹개발, 앱개발, AI솔루션 전문" />
                <meta property="og:description" content="NQ Solution(엔큐솔루션) - 웹 개발, 앱 개발, AI 솔루션 전문. 평택 기반 전국 서비스." />
                <meta property="og:url" content="http://nqsolution.kr/" />
                <link rel="canonical" href="http://nqsolution.kr/" />
            </Head>
            <div className="min-h-screen">
            {/* Hero Section - 더 독특한 레이아웃 */}
            <section className="min-h-screen relative flex items-center overflow-hidden">
                {/* Large decorative logo - hidden on mobile */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none w-[50vw] max-w-[700px] hidden md:block"
                >
                    <Image
                        src={dark ? "/logo-dark.png" : "/logo-light.png"}
                        alt=""
                        width={700}
                        height={280}
                        className={`w-full h-auto ${dark ? "brightness-0 invert opacity-[0.08]" : "opacity-[0.06]"}`}
                        priority
                    />
                </motion.div>

                <div className="container-custom w-full pt-32 pb-20 relative z-10">
                    <div className="grid grid-cols-12 gap-8">
                        {/* Left column - eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="col-span-12 lg:col-span-2 lg:pt-4"
                        >
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-px bg-[var(--color-accent)]" />
                                <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)] font-mono">
                                    {content.hero.eyebrow}
                                </span>
                            </div>
                        </motion.div>

                        {/* Right column - main content */}
                        <div className="col-span-12 lg:col-span-10">
                            {/* Main Headline - 스플릿 디자인 */}
                            <motion.h1
                                className="text-display-xl font-serif mb-16"
                                initial="hidden"
                                animate="visible"
                                variants={stagger}
                            >
                                {heroHeadline.map((line, i) => (
                                    <motion.span
                                        key={i}
                                        variants={fadeIn}
                                        className={`block ${i === 1 ? 'italic text-[var(--color-accent)] ml-4 md:ml-8 lg:ml-24' : ''}`}
                                    >
                                        {line}
                                    </motion.span>
                                ))}
                            </motion.h1>

                            {/* Subtext with decorative line */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="flex items-start gap-8 mb-16 max-w-2xl"
                            >
                                <div className="w-px h-24 bg-[var(--color-border)] shrink-0 hidden md:block" />
                                <p className="text-[var(--color-text-secondary)] text-xl leading-relaxed">
                                    {content.hero.subtext.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            {i < content.hero.subtext.split('\n').length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </motion.div>

                            {/* CTA with corner decoration */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center gap-6"
                                >
                                    <span className="btn-primary corner-accent">
                                        {content.hero.cta}
                                    </span>
                                    <motion.span
                                        className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] transition-all duration-500"
                                        whileHover={{ scale: 1.1, rotate: 45 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-[var(--color-text-secondary)] group-hover:text-white transition-colors" />
                                    </motion.span>
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* Scroll indicator - repositioned */}
                    <motion.div
                        className="absolute bottom-12 right-12 hidden lg:flex items-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <span className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] font-mono">
                            Scroll
                        </span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <ArrowDownRight className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section - 비대칭 그리드 */}
            <section className="section-padding border-t border-[var(--color-border)] relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--color-bg-secondary)] -z-10 hidden lg:block" />

                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="grid grid-cols-12 gap-8 mb-20"
                    >
                        <motion.div variants={slideIn} className="col-span-12 lg:col-span-3">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="font-mono text-xs text-[var(--color-text-tertiary)]">01</span>
                                <span className="w-8 h-px bg-[var(--color-border)]" />
                            </div>
                            <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">
                                {content.services.eyebrow}
                            </span>
                        </motion.div>
                        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-9">
                            <h2 className="text-display-md font-serif">
                                {content.services.headline}
                            </h2>
                        </motion.div>
                    </motion.div>

                    {/* Services grid - 독특한 배치 */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-[var(--color-border)]"
                    >
                        {content.services.items.map((service, i) => (
                            <motion.div
                                key={i}
                                variants={scaleIn}
                                whileHover={{ backgroundColor: "var(--color-accent-subtle)" }}
                                className={`p-8 lg:p-10 group cursor-pointer transition-colors duration-500 ${
                                    i < content.services.items.length - 1 ? 'border-b md:border-b-0 md:border-r border-[var(--color-border)]' : ''
                                } ${i === 1 || i === 3 ? 'lg:border-r-0' : ''} ${i < 2 ? 'lg:border-b border-[var(--color-border)]' : ''}`}
                            >
                                <span className="font-mono text-6xl lg:text-7xl text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors duration-500 block mb-8">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="text-2xl font-serif mb-4 group-hover:text-[var(--color-accent)] transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                    {service.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mt-12 flex justify-end"
                    >
                        <Link
                            href="/services"
                            className="btn-text"
                        >
                            {content.services.viewAll}
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Process Section - 수평 스크롤 스타일 */}
            <section className="section-padding bg-[var(--color-bg-secondary)]">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="grid grid-cols-12 gap-8 mb-20"
                    >
                        <motion.div variants={slideIn} className="col-span-12 lg:col-span-3">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="font-mono text-xs text-[var(--color-text-tertiary)]">02</span>
                                <span className="w-8 h-px bg-[var(--color-border)]" />
                            </div>
                            <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">
                                {content.process.eyebrow}
                            </span>
                        </motion.div>
                        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-9">
                            <h2 className="text-display-md font-serif">
                                {content.process.headline}
                            </h2>
                        </motion.div>
                    </motion.div>

                    {/* Process steps - 독특한 타임라인 */}
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-3" />
                        <div className="col-span-12 lg:col-span-9">
                            <div className="relative">
                                {/* Connecting line */}
                                <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--color-border)] hidden lg:block" />

                                {content.process.steps.map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.15 }}
                                        className="flex items-start gap-8 py-10 border-t border-[var(--color-border)] group relative"
                                    >
                                        {/* Step number with dot */}
                                        <div className="relative">
                                            <motion.span
                                                className="font-mono text-4xl lg:text-5xl text-[var(--color-accent)] block"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {String(i + 1).padStart(2, '0')}
                                            </motion.span>
                                            {/* Dot on the line */}
                                            <div className="absolute -left-[1.5px] top-1/2 w-3 h-3 rounded-full bg-[var(--color-accent)] hidden lg:block" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-serif mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                                                {step.title}
                                            </h3>
                                            <p className="text-[var(--color-text-secondary)]">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                                <div className="border-t border-[var(--color-border)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Section - 풀 위드 배경 */}
            <section className="section-padding relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-40 h-40 border border-[var(--color-border)] rounded-full opacity-30" />
                <div className="absolute bottom-20 right-20 w-60 h-60 border border-[var(--color-accent)] rounded-full opacity-20" />

                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="grid grid-cols-12 gap-8"
                    >
                        <motion.div variants={slideIn} className="col-span-12 lg:col-span-3">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="font-mono text-xs text-[var(--color-text-tertiary)]">03</span>
                                <span className="w-8 h-px bg-[var(--color-border)]" />
                            </div>
                            <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">
                                {content.ai.eyebrow}
                            </span>
                        </motion.div>
                        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-9">
                            <h2 className="text-display-md font-serif mb-10">
                                {content.ai.headline.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i < content.ai.headline.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </h2>
                            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-2xl mb-12">
                                {content.ai.description}
                            </p>

                            {/* AI items - 카드 스타일 */}
                            <motion.div
                                variants={stagger}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            >
                                {content.ai.items.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        variants={fadeIn}
                                        className="card-interactive p-8"
                                    >
                                        <span className="font-mono text-4xl text-[var(--color-border)] block mb-6">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className="text-sm text-[var(--color-text-secondary)]">
                                            {item}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>
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
                                Ready to Start?
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
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 1, scale: 1 }
                            }}
                        >
                            <Link
                                href="/contact"
                                className="group relative inline-flex items-center gap-3 md:gap-4 px-6 py-4 md:px-10 md:py-5 bg-white text-[var(--color-accent)] text-xs md:text-sm tracking-widest uppercase font-medium transition-all overflow-hidden"
                            >
                                <motion.span
                                    className="absolute inset-0 bg-stone-100"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <span className="relative z-10">{content.cta.button}</span>
                                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            </div>
        </>
    );
}
