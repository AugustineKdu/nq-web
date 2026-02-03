import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { koContent } from "../config";

interface AboutContent {
    headline: string;
    intro: string;
    description: string;
    futureDescription: string;
    futureSubtext: string;
    ctaSubtext: string;
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

export default function About() {
    const staticContent = koContent.about;
    const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);

    useEffect(() => {
        fetch("/api/about-content?lang=ko")
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (data) setAboutContent(data);
            })
            .catch(() => {});
    }, []);

    // Use DB content or fallback to static
    const content = {
        hero: {
            headline: aboutContent?.headline || staticContent.hero.headline,
            intro: aboutContent?.intro || staticContent.hero.intro,
            description: aboutContent?.description || staticContent.hero.description
        },
        whatWeDo: staticContent.whatWeDo,
        values: staticContent.values,
        future: {
            ...staticContent.future,
            description: aboutContent?.futureDescription || staticContent.future.description,
            subtext: aboutContent?.futureSubtext || staticContent.future.subtext
        },
        cta: {
            subtext: aboutContent?.ctaSubtext || staticContent.cta.subtext
        }
    };

    return (
        <>
            <Head>
                <title>회사소개 | NQ Solution (엔큐솔루션) - IT개발 전문</title>
                <meta name="description" content="NQ Solution(엔큐솔루션) 회사소개. 웹 개발, 앱 개발, AI 솔루션 전문 IT 개발 회사. nqsolution 엔큐솔루션" />
                <meta name="keywords" content="NQ Solution, nqsolution, 엔큐솔루션, NQ솔루션, 회사소개, IT개발회사, 웹개발회사, 앱개발회사, 디지털에이전시" />
                <meta property="og:title" content="회사소개 | NQ Solution (엔큐솔루션)" />
                <meta property="og:description" content="NQ Solution(엔큐솔루션) - 웹 개발, 앱 개발, AI 솔루션 전문" />
                <meta property="og:url" content="http://nqsolution.kr/about" />
                <link rel="canonical" href="http://nqsolution.kr/about" />
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
                                About
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
                                    {content.hero.headline}
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

            {/* What We Do */}
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
                                What We Do
                            </span>
                        </motion.div>
                        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-10">
                            <h2 className="text-display-sm font-serif">
                                Our Work
                            </h2>
                        </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-2" />
                        <div className="col-span-12 lg:col-span-8">
                            {content.whatWeDo.items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="pb-8 border-b border-[var(--color-border)] mb-8 last:mb-0 group"
                                >
                                    <h3 className="text-lg font-serif mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-[var(--color-bg-secondary)]">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="grid grid-cols-12 gap-8 mb-20"
                    >
                        <motion.div variants={slideIn} className="col-span-12 lg:col-span-2">
                            <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">
                                Values
                            </span>
                        </motion.div>
                        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-10">
                            <h2 className="text-display-sm font-serif">
                                How We Work
                            </h2>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)]"
                    >
                        {content.values.items.map((value, i) => (
                            <motion.div
                                key={i}
                                variants={fadeIn}
                                whileHover={{ backgroundColor: "var(--color-accent-subtle)" }}
                                className="bg-[var(--color-bg-primary)] p-10 md:p-14 group cursor-default transition-colors duration-500"
                            >
                                <motion.span
                                    className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] mb-8 block group-hover:text-[var(--color-accent)] transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {value.num}
                                </motion.span>
                                <h3 className="text-2xl font-serif mb-6 group-hover:text-[var(--color-accent)] transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Future */}
            <section className="section-padding bg-[var(--color-bg-secondary)]">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="grid grid-cols-12 gap-8"
                    >
                        <motion.div variants={slideIn} className="col-span-12 lg:col-span-2">
                            <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">
                                Future
                            </span>
                        </motion.div>
                        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-8">
                            <h2 className="text-display-sm font-serif mb-8">
                                Looking Ahead
                            </h2>
                            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-6">
                                {content.future.description}
                            </p>
                            <p className="text-[var(--color-text-tertiary)] leading-relaxed">
                                {content.future.subtext}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
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
                                Let&apos;s Work Together
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
                                className="group relative inline-flex items-center gap-3 md:gap-4 px-6 py-4 md:px-8 bg-white text-[var(--color-accent)] text-xs md:text-sm tracking-widest uppercase font-medium transition-all shrink-0 overflow-hidden"
                            >
                                <motion.span
                                    className="absolute inset-0 bg-stone-100"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <span className="relative z-10">Contact Us</span>
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
