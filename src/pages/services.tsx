import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { koContent } from "../config";

interface ServicesContent {
    heroDescription: string;
    pricingDescription: string;
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

export default function Services() {
    const staticContent = koContent.services;
    const [servicesContent, setServicesContent] = useState<ServicesContent | null>(null);

    useEffect(() => {
        fetch("/api/services-content?lang=ko")
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (data) setServicesContent(data);
            })
            .catch(() => {});
    }, []);

    // Use DB content or fallback to static
    const content = {
        hero: {
            ...staticContent.hero,
            description: servicesContent?.heroDescription || staticContent.hero.description
        },
        items: staticContent.items,
        process: staticContent.process,
        pricing: {
            ...staticContent.pricing,
            description: servicesContent?.pricingDescription || staticContent.pricing.description
        },
        cta: {
            ...staticContent.cta,
            subtext: servicesContent?.ctaSubtext || staticContent.cta.subtext
        }
    };

    return (
        <>
            <Head>
                <title>서비스 | NQ Solution (엔큐솔루션) - 웹개발, 앱개발, AI솔루션</title>
                <meta name="description" content="NQ Solution(엔큐솔루션) 서비스: 웹사이트 개발, 모바일 앱 개발, UI/UX 디자인, AI 솔루션. 기획부터 개발, 운영까지 원스톱 서비스. nqsolution 엔큐솔루션" />
                <meta name="keywords" content="NQ Solution, nqsolution, 엔큐솔루션, NQ솔루션, 웹개발서비스, 앱개발서비스, UI/UX디자인, AI솔루션, 홈페이지제작, 모바일앱개발, IT컨설팅, 전국개발" />
                <meta property="og:title" content="서비스 | NQ Solution (엔큐솔루션)" />
                <meta property="og:description" content="NQ Solution(엔큐솔루션) - 웹 개발, 앱 개발, AI 솔루션 서비스. 기획부터 운영까지 원스톱." />
                <meta property="og:url" content="https://nqsolution.kr/services" />
                <link rel="canonical" href="https://nqsolution.kr/services" />
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
                                Services
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
                                    What We Offer
                                </motion.span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-xl leading-relaxed text-[var(--color-text-secondary)] max-w-2xl"
                            >
                                {content.hero.description.split('\n').map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        {i < content.hero.description.split('\n').length - 1 && <br />}
                                    </span>
                                ))}
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services List */}
            <section className="pb-20">
                <div className="container-custom">
                    {content.items.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className={`py-12 md:py-16 border-t border-[var(--color-border)] ${
                                index === content.items.length - 1 ? "border-b" : ""
                            }`}
                        >
                            <div className="grid grid-cols-12 gap-8">
                                {/* Number */}
                                <div className="col-span-12 lg:col-span-2">
                                    <motion.span
                                        className="text-5xl font-serif text-[var(--color-border)]"
                                        whileHover={{ scale: 1.05, color: "var(--color-accent)" }}
                                    >
                                        {service.number}
                                    </motion.span>
                                </div>

                                {/* Content */}
                                <div className="col-span-12 lg:col-span-10">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Left */}
                                        <div>
                                            <span className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] mb-3 block">
                                                {service.subtitle}
                                            </span>
                                            <h2 className="text-2xl font-serif mb-4">
                                                {service.title}
                                            </h2>
                                            <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Right - Details */}
                                        <div>
                                            <ul className="space-y-3">
                                                {service.details.map((detail, i) => (
                                                    <motion.li
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: i * 0.05 }}
                                                        className="text-sm text-[var(--color-text-secondary)] flex items-start gap-3"
                                                    >
                                                        <span className="text-[var(--color-accent)] mt-0.5">—</span>
                                                        {detail}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Process */}
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
                                Process
                            </span>
                        </motion.div>
                        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-10">
                            <h2 className="text-display-sm font-serif">
                                How We Work
                            </h2>
                        </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-2" />
                        <div className="col-span-12 lg:col-span-8">
                            {content.process.steps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-8 py-8 border-t border-[var(--color-border)] group"
                                >
                                    <motion.span
                                        className="text-4xl font-serif text-[var(--color-accent)] w-16 shrink-0"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {step.num}
                                    </motion.span>
                                    <div>
                                        <h3 className="text-xl font-serif mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-[var(--color-text-secondary)]">
                                            {step.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                            <div className="border-t border-[var(--color-border)]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Note */}
            <section className="section-padding">
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
                                Pricing
                            </span>
                        </motion.div>
                        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-8">
                            <h2 className="text-display-sm font-serif mb-8">
                                Flexible Pricing
                            </h2>
                            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-6">
                                {content.pricing.description}
                            </p>
                            <ul className="space-y-3 text-[var(--color-text-secondary)]">
                                {content.pricing.items.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-3 text-sm"
                                    >
                                        <span className="text-[var(--color-accent)]">—</span>
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
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
