import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

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

const DEFAULT_SETTINGS = {
    contactFormUrl: "https://forms.google.com/your-form-url",
    email: "hello@nqsolution.com",
    phone: "+82 10-1234-5678",
    location: "Seoul, South Korea"
};

export default function ContactEN() {
    const { dark } = useTheme();
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) setSettings({ ...DEFAULT_SETTINGS, ...data });
            })
            .catch(() => {
                console.log("Using default settings");
            });
    }, []);

    const faqs = [
        {
            q: "How long does a project take?",
            a: "It depends on the scope. Simple landing pages take 1-2 weeks, standard websites 4-6 weeks, and complex web apps 8+ weeks. We'll provide an estimated timeline during consultation."
        },
        {
            q: "How is pricing determined?",
            a: "Pricing varies based on scope and features. After consultation, we organize your requirements and provide a detailed quote. Payment is typically split into deposit, progress, and final payments."
        },
        {
            q: "Do you offer maintenance?",
            a: "Yes, we provide maintenance services after project completion. From simple updates to regular management, we can accommodate your needs."
        },
        {
            q: "Can you renew an existing site?",
            a: "Yes, we analyze your existing site and proceed with design improvements, feature additions, and performance optimization. Both full renewals and partial modifications are possible."
        },
        {
            q: "How does AI integration work?",
            a: "Through consultation, we identify which tasks you want to use AI for, then recommend suitable approaches. The scope ranges from simple setup to custom development."
        }
    ];

    return (
        <>
            <Head>
                <title>Contact | NQ Solution</title>
                <meta name="description" content="Contact NQ Solution for your project. Free consultation for web development, app development, and AI solutions." />
                <meta property="og:title" content="Contact | NQ Solution" />
                <meta property="og:description" content="Contact NQ Solution for project consultation." />
                <meta property="og:url" content="https://nqsolution.kr/en/contact" />
                <link rel="canonical" href="https://nqsolution.kr/en/contact" />
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
                                    Feel free to reach out
                                    <br />
                                    about your project.
                                </p>
                                <p className="text-base leading-relaxed text-[var(--color-text-tertiary)]">
                                    Let us know what service you need and
                                    we&apos;ll guide you to the right solution.
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
                                            alt="NQ Solution"
                                            width={100}
                                            height={40}
                                            className={`h-8 w-auto ${dark ? "brightness-0 invert" : ""}`}
                                        />
                                    </div>

                                    <div className="space-y-6 mb-12">
                                        {[
                                            { label: "Email", value: settings.email, href: `mailto:${settings.email}` },
                                            { label: "Phone", value: settings.phone, href: `tel:${settings.phone.replace(/[^+\d]/g, '')}` },
                                            { label: "Location", value: settings.location, href: null },
                                        ].map((item, i) => (
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
                                        Project Inquiry
                                    </h2>
                                    <p className="text-[var(--color-text-secondary)] mb-6">
                                        Click the button below to fill in your project details.
                                    </p>
                                    <ul className="space-y-2 text-sm text-[var(--color-text-tertiary)] mb-10">
                                        {[
                                            "Type of service you need",
                                            "Approximate budget and timeline",
                                            "Reference sites or materials (if any)"
                                        ].map((item, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-center gap-2"
                                            >
                                                <span className="text-[var(--color-accent)]">-</span>
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
                                        Fill Out Inquiry Form
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
                                Frequently Asked Questions
                            </h2>
                        </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-2" />
                        <div className="col-span-12 lg:col-span-8">
                            {faqs.map((faq, i) => (
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
            <section className="section-padding bg-[var(--color-accent)] overflow-hidden">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12"
                    >
                        <div>
                            <h2 className="text-display-sm font-serif text-white mb-4">
                                Contact via Email
                            </h2>
                            <p className="text-white/60 text-lg">
                                For simple inquiries, email works too.
                            </p>
                        </div>
                        <motion.a
                            href={`mailto:${settings.email}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-4 px-8 py-4 bg-white text-[var(--color-accent)] text-sm tracking-widest uppercase font-medium hover:bg-stone-100 transition-colors shrink-0"
                        >
                            {settings.email}
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </div>
        </>
    );
}
