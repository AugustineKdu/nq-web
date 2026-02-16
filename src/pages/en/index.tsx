import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";

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

export default function HomeEN() {
    const services = [
        { title: "Planning", desc: "From concept to detailed specifications" },
        { title: "Design", desc: "UI/UX and design systems" },
        { title: "Development", desc: "Websites and web applications" },
        { title: "AI", desc: "AI services and integration" },
    ];

    return (
        <>
            <Head>
                <title>NQ Solution | Web Development, App Development, AI Solutions</title>
                <meta name="description" content="NQ Solution - Professional web development, app development, and AI solutions. From planning to design and development." />
                <meta property="og:title" content="NQ Solution | Web & App Development" />
                <meta property="og:description" content="NQ Solution - Professional web development, app development, and AI solutions." />
                <meta property="og:url" content="https://nqsolution.kr/en" />
                <link rel="canonical" href="https://nqsolution.kr/en" />
            </Head>
            <div className="min-h-screen">
            {/* Hero Section */}
            <section className="min-h-screen relative flex items-center overflow-hidden">
                <div className="container-custom w-full pt-32 pb-20">
                    <div className="max-w-4xl">
                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">
                                Digital Solution Partner
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            className="text-display-lg font-serif mb-12"
                            initial="hidden"
                            animate="visible"
                            variants={stagger}
                        >
                            <motion.span variants={fadeIn} className="block">
                                Ideas into
                            </motion.span>
                            <motion.span variants={fadeIn} className="block italic">
                                Reality
                            </motion.span>
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-[var(--color-text-secondary)] text-xl leading-relaxed max-w-lg mb-12"
                        >
                            From planning to design and development.
                            <br />
                            We deliver digital solutions for your business.
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Link
                                href="/en/contact"
                                className="group inline-flex items-center gap-4"
                            >
                                <span className="btn-primary">
                                    Start a Project
                                </span>
                                <motion.span
                                    className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] transition-all duration-500"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ArrowRight className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-white transition-colors" />
                                </motion.span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-12 left-1/2 -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <ArrowDownRight className="w-5 h-5 text-[var(--color-text-tertiary)]" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className="section-padding border-t border-[var(--color-border)]">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="grid grid-cols-12 gap-8 mb-20"
                    >
                        <motion.div variants={slideIn} className="col-span-12 lg:col-span-4">
                            <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">
                                Services
                            </span>
                        </motion.div>
                        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-8">
                            <h2 className="text-display-sm font-serif">
                                What do you need?
                            </h2>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)]"
                    >
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                variants={fadeIn}
                                whileHover={{ backgroundColor: "var(--color-accent-subtle)" }}
                                className="bg-[var(--color-bg-primary)] p-8 lg:p-12 group cursor-pointer transition-colors duration-500"
                            >
                                <motion.span
                                    className="text-5xl lg:text-6xl font-serif text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors duration-500 block mb-6"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    0{i + 1}
                                </motion.span>
                                <h3 className="text-xl font-serif mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-[var(--color-text-secondary)]">
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
                        className="mt-12 text-right"
                    >
                        <Link
                            href="/en/services"
                            className="group inline-flex items-center gap-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                        >
                            <span className="link-underline">View All Services</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Process Section */}
            <section className="section-padding bg-[var(--color-bg-secondary)]">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="grid grid-cols-12 gap-8 mb-20"
                    >
                        <motion.div variants={slideIn} className="col-span-12 lg:col-span-4">
                            <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">
                                Process
                            </span>
                        </motion.div>
                        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-8">
                            <h2 className="text-display-sm font-serif">
                                How We Work
                            </h2>
                        </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-4" />
                        <div className="col-span-12 lg:col-span-8">
                            {[
                                { title: "Consultation", desc: "We understand your requirements and set the direction" },
                                { title: "Planning", desc: "We design the structure and define the scope" },
                                { title: "Production", desc: "We proceed with design and development" },
                                { title: "Launch", desc: "We test, deploy, and hand over" },
                            ].map((step, i) => (
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
                                        0{i + 1}
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

            {/* AI Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="grid grid-cols-12 gap-8"
                    >
                        <motion.div variants={slideIn} className="col-span-12 lg:col-span-4">
                            <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">
                                AI Solutions
                            </span>
                        </motion.div>
                        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-8">
                            <h2 className="text-display-sm font-serif mb-8">
                                Practical AI
                                <br />
                                for Your Business
                            </h2>
                            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-2xl mb-10">
                                From custom AI development to integrating external AI like
                                ChatGPT and Claude into your workflows.
                            </p>

                            <motion.div
                                variants={stagger}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            >
                                {[
                                    "AI Chatbots & Customer Service",
                                    "Document Automation",
                                    "AI System Integration"
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        variants={fadeIn}
                                        whileHover={{ y: -5 }}
                                        className="p-6 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors cursor-default"
                                    >
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
            <section className="section-padding bg-[var(--color-accent)] overflow-hidden">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h2 className="text-display-md font-serif text-white mb-8">
                            Ready to start
                            <br />
                            your project?
                        </h2>
                        <p className="text-white/60 text-lg mb-12 max-w-md mx-auto">
                            Feel free to reach out about your project needs.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href="/en/contact"
                                className="inline-flex items-center gap-4 px-10 py-5 bg-white text-[var(--color-accent)] text-sm tracking-widest uppercase font-medium hover:bg-stone-100 transition-colors"
                            >
                                Contact Us
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
        </>
    );
}
