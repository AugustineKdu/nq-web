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

export default function ServicesEN() {
    const services = [
        {
            number: "01",
            title: "Planning & Consulting",
            subtitle: "Service Planning, Business Strategy",
            description: "We help you figure out what to build from the start. We organize your ideas, define a feasible scope, and create detailed specifications.",
            details: [
                "Service concept and planning",
                "Screen composition and user flow design",
                "Functional specification documents",
                "Project scope and timeline estimation"
            ]
        },
        {
            number: "02",
            title: "Web Development",
            subtitle: "Websites, Web Applications",
            description: "From corporate websites to complex web applications. We build with responsive design, fast loading, and ease of management in mind.",
            details: [
                "Responsive website development",
                "Website renewal",
                "Landing pages / promotional pages",
                "Admin pages / dashboards"
            ]
        },
        {
            number: "03",
            title: "UI/UX Design",
            subtitle: "Design Systems, Renewal",
            description: "Beyond looking good, we create designs that work well. We design so users can achieve what they want without getting lost.",
            details: [
                "UI/UX design",
                "Design system development",
                "Existing service design improvement",
                "Prototype creation"
            ]
        },
        {
            number: "04",
            title: "AI Solutions",
            subtitle: "AI Service Development & Integration",
            description: "We help you leverage AI in real business operations. From custom AI development to integrating external services like ChatGPT and Claude.",
            details: [
                "AI chatbot development",
                "Workflow automation (documents, data analysis)",
                "AI feature integration with existing systems",
                "AI adoption consulting and setup"
            ]
        },
        {
            number: "05",
            title: "App Development",
            subtitle: "Mobile Applications (In Progress)",
            description: "We're also working on mobile app development. We're currently conducting technical research for better quality service, so availability is determined after consultation.",
            details: [
                "iOS / Android app development",
                "Cross-platform (Flutter)",
                "Web service to app conversion",
                "* Separate consultation required"
            ]
        }
    ];

    const process = [
        { num: "01", title: "Consultation", desc: "Understand requirements" },
        { num: "02", title: "Planning", desc: "Define scope" },
        { num: "03", title: "Design", desc: "Create mockups" },
        { num: "04", title: "Development", desc: "Build" },
        { num: "05", title: "Launch", desc: "Deploy & handover" },
    ];

    return (
        <>
            <Head>
                <title>Services | NQ Solution</title>
                <meta name="description" content="NQ Solution services: Web development, app development, UI/UX design, AI solutions. End-to-end digital services." />
                <meta property="og:title" content="Services | NQ Solution" />
                <meta property="og:description" content="NQ Solution - Web development, app development, UI/UX design, and AI solutions." />
                <meta property="og:url" content="https://nqsolution.kr/en/services" />
                <link rel="canonical" href="https://nqsolution.kr/en/services" />
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
                                    Our Services
                                </motion.span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-xl leading-relaxed text-[var(--color-text-secondary)] max-w-2xl"
                            >
                                Just what you need, precisely delivered.
                                <br />
                                We recommend services that fit your situation.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services List */}
            <section className="pb-20">
                <div className="container-custom">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className={`py-16 md:py-20 border-t border-[var(--color-border)] ${
                                index === services.length - 1 ? "border-b" : ""
                            }`}
                        >
                            <div className="grid grid-cols-12 gap-8">
                                {/* Number */}
                                <div className="col-span-12 lg:col-span-2">
                                    <motion.span
                                        className="text-6xl md:text-7xl font-serif text-[var(--color-border)]"
                                        whileHover={{ color: "var(--color-accent)", scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {service.number}
                                    </motion.span>
                                </div>

                                {/* Content */}
                                <div className="col-span-12 lg:col-span-10">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        {/* Left */}
                                        <div>
                                            <span className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] mb-4 block">
                                                {service.subtitle}
                                            </span>
                                            <h2 className="text-display-sm font-serif mb-8">
                                                {service.title}
                                            </h2>
                                            <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Right - Details */}
                                        <div>
                                            <ul className="space-y-4">
                                                {service.details.map((detail, i) => (
                                                    <motion.li
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className={`flex items-start gap-4 text-sm ${
                                                            detail.startsWith("*")
                                                                ? "text-[var(--color-accent)]"
                                                                : "text-[var(--color-text-secondary)]"
                                                        }`}
                                                    >
                                                        <span className="text-[var(--color-accent)] mt-0.5">-</span>
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
                                Our Process
                            </h2>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                        className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[var(--color-border)]"
                    >
                        {process.map((step, i) => (
                            <motion.div
                                key={i}
                                variants={fadeIn}
                                whileHover={{ backgroundColor: "var(--color-accent-subtle)" }}
                                className="bg-[var(--color-bg-primary)] p-8 md:p-10 text-center group cursor-default transition-colors duration-500"
                            >
                                <motion.span
                                    className="text-4xl font-serif text-[var(--color-accent)]"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {step.num}
                                </motion.span>
                                <h3 className="text-lg font-serif mt-6 mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-[var(--color-text-tertiary)]">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
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
                                Pricing Info
                            </h2>
                            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-6">
                                Since every project differs in scope and complexity,
                                we provide custom quotes after consultation.
                            </p>
                            <ul className="space-y-3 text-[var(--color-text-secondary)]">
                                {[
                                    "Initial consultation is free",
                                    "We provide quotes after scope is defined",
                                    "Payment in stages: deposit, progress, final"
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="text-[var(--color-accent)]">-</span>
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-[var(--color-accent)] overflow-hidden">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-display-md font-serif text-white mb-8">
                            What service
                            <br />
                            do you need?
                        </h2>
                        <p className="text-white/70 text-lg mb-12 max-w-md mx-auto">
                            Let us know and we&apos;ll guide you to the right solution.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href="/en/contact"
                                className="inline-flex items-center gap-4 px-8 py-4 bg-white text-[var(--color-accent)] text-sm tracking-widest uppercase font-medium hover:bg-stone-100 transition-colors"
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
