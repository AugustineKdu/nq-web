import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

export default function AboutEN() {
    const values = [
        {
            num: "01",
            title: "Practicality",
            desc: "We build solutions that are actually used, not just technically impressive. Our work must provide real value to your business."
        },
        {
            num: "02",
            title: "Clarity",
            desc: "We simplify complexity. Progress, costs, and timelines are all shared transparently throughout the project."
        },
        {
            num: "03",
            title: "Sustainability",
            desc: "We don't just build and walk away. Our designs consider long-term maintenance and future improvements."
        },
    ];

    return (
        <>
            <Head>
                <title>About Us | NQ Solution</title>
                <meta name="description" content="Learn about NQ Solution - A digital solutions company specializing in web development, design, and AI integration." />
                <meta property="og:title" content="About Us | NQ Solution" />
                <meta property="og:description" content="NQ Solution - Digital solutions from planning to development." />
                <meta property="og:url" content="https://nqsolution.kr/en/about" />
                <link rel="canonical" href="https://nqsolution.kr/en/about" />
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
                                    NQ Solution
                                </motion.span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl"
                            >
                                <p className="text-xl leading-relaxed text-[var(--color-text-secondary)]">
                                    We provide digital solutions
                                    <br />
                                    with planning, web development, and design.
                                </p>
                                <p className="text-base leading-relaxed text-[var(--color-text-tertiary)]">
                                    From website renewals to new service builds and AI adoption.
                                    We identify what you need and find the right approach to deliver it.
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
                            {[
                                { title: "Core Services", desc: "Website planning, design, and development. Service renewals, landing pages, and everything web-related." },
                                { title: "AI Solutions", desc: "We develop custom AI services and help integrate external AI like ChatGPT and Claude into your business workflows." },
                                { title: "App Development (In Progress)", desc: "We're also working on mobile app development while conducting technical research for better quality service." },
                            ].map((item, i) => (
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
                        {values.map((value, i) => (
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
                                We&apos;re currently preparing for incorporation,
                                aiming for steady growth through our own app and service development.
                            </p>
                            <p className="text-[var(--color-text-tertiary)] leading-relaxed">
                                Building on the experience gained from client projects,
                                we want to deliver value to more people through our own services.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
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
                                Let&apos;s Work Together
                            </h2>
                            <p className="text-white/60 text-lg">
                                Feel free to reach out about your project.
                            </p>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href="/en/contact"
                                className="group inline-flex items-center gap-4 px-8 py-4 bg-white text-[var(--color-accent)] text-sm tracking-widest uppercase font-medium hover:bg-stone-100 transition-colors shrink-0"
                            >
                                Contact Us
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
        </>
    );
}
