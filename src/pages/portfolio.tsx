import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { koContent, categories } from "../config";

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
};

interface Project {
    id: number;
    title: string;
    titleKo?: string;
    client: string;
    category: string;
    year: string;
    description: string;
    descriptionKo?: string;
}

export default function Portfolio() {
    const content = koContent.portfolio;
    const [activeFilter, setActiveFilter] = useState<typeof categories[number]>("All");
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch projects from database API
        fetch("/api/projects")
            .then(res => res.ok ? res.json() : [])
            .then(data => {
                setProjects(data || []);
            })
            .catch(() => {
                setProjects([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <>
            <Head>
                <title>포트폴리오 | NQ Solution - 프로젝트 사례</title>
                <meta name="description" content="NQ Solution이 제작한 웹사이트, 모바일 앱, AI 솔루션 프로젝트 포트폴리오입니다. 다양한 업종의 성공적인 프로젝트 사례를 확인하세요." />
                <meta name="keywords" content="웹개발 포트폴리오, 앱개발 사례, IT 프로젝트, 홈페이지 제작 사례, 개발 레퍼런스" />
                <meta property="og:title" content="포트폴리오 | NQ Solution" />
                <meta property="og:description" content="NQ Solution이 제작한 웹사이트, 모바일 앱, AI 솔루션 프로젝트 포트폴리오입니다." />
                <meta property="og:url" content="https://www.nqsolution.com/portfolio" />
                <link rel="canonical" href="https://www.nqsolution.com/portfolio" />
            </Head>
            <div className="min-h-screen">
            {/* Hero Section */}
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
                                Portfolio
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
                                    Selected
                                </motion.span>
                                <motion.span variants={fadeIn} className="block italic text-[var(--color-accent)]">
                                    Works
                                </motion.span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-xl leading-relaxed text-[var(--color-text-secondary)] max-w-2xl"
                            >
                                {content.hero.description}
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter */}
            <section className="py-6 border-y border-[var(--color-border)]">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-8 overflow-x-auto"
                    >
                        <span className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] shrink-0">
                            Filter
                        </span>
                        <div className="flex gap-6">
                            {categories.map((filter) => (
                                <motion.button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`text-sm tracking-wider whitespace-nowrap transition-colors ${
                                        activeFilter === filter
                                            ? "text-[var(--color-accent)]"
                                            : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                                    }`}
                                >
                                    {filter}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Projects List */}
            <section className="pb-20">
                <div className="container-custom">
                    {loading ? (
                        <div className="py-20 text-center">
                            <p className="text-[var(--color-text-tertiary)]">로딩 중...</p>
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="py-20 text-center">
                            <p className="text-[var(--color-text-secondary)] mb-2">등록된 프로젝트가 없습니다.</p>
                            <p className="text-sm text-[var(--color-text-tertiary)]">관리자 페이지에서 프로젝트를 추가해주세요.</p>
                        </div>
                    ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={`/portfolio/${project.id}`}
                                        className="group block py-6 md:py-8 border-t border-[var(--color-border)] hover:pl-4 transition-all duration-500"
                                    >
                                        {/* Mobile Layout */}
                                        <div className="md:hidden">
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-2xl font-serif text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span>
                                                    <div>
                                                        <span className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] block mb-1">
                                                            {project.category}
                                                        </span>
                                                        <h3 className="text-lg font-serif group-hover:text-[var(--color-accent)] transition-colors">
                                                            {project.titleKo || project.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] shrink-0" />
                                            </div>
                                            <p className="text-sm text-[var(--color-text-secondary)] mb-2 pl-14">
                                                {project.descriptionKo || project.description}
                                            </p>
                                            <p className="text-xs text-[var(--color-text-tertiary)] pl-14">
                                                {project.client} · {project.year}
                                            </p>
                                        </div>

                                        {/* Desktop Layout */}
                                        <div className="hidden md:grid grid-cols-12 gap-6 items-center">
                                            {/* Number */}
                                            <div className="col-span-1">
                                                <motion.span
                                                    className="text-4xl font-serif text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors"
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    {String(index + 1).padStart(2, '0')}
                                                </motion.span>
                                            </div>

                                            {/* Title & Category */}
                                            <div className="col-span-4">
                                                <span className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] block mb-2">
                                                    {project.category}
                                                </span>
                                                <h3 className="text-xl font-serif group-hover:text-[var(--color-accent)] transition-colors">
                                                    {project.titleKo || project.title}
                                                </h3>
                                            </div>

                                            {/* Description */}
                                            <div className="col-span-4">
                                                <p className="text-sm text-[var(--color-text-secondary)]">
                                                    {project.descriptionKo || project.description}
                                                </p>
                                            </div>

                                            {/* Client & Year */}
                                            <div className="col-span-2">
                                                <p className="text-sm text-[var(--color-text-tertiary)]">
                                                    {project.client}
                                                </p>
                                                <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                                                    {project.year}
                                                </p>
                                            </div>

                                            {/* Arrow */}
                                            <div className="col-span-1 flex justify-end">
                                                <ArrowRight className="w-5 h-5 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                    )}
                    {filteredProjects.length > 0 && <div className="border-t border-[var(--color-border)]" />}
                </div>
            </section>

            {/* More Coming */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-16 text-center"
            >
                <div className="container-custom">
                    <p className="text-[var(--color-text-tertiary)] mb-4">
                        {content.comingSoon}
                    </p>
                    <motion.div
                        className="w-16 h-px bg-[var(--color-accent)] opacity-30 mx-auto"
                        initial={{ width: 0 }}
                        whileInView={{ width: 64 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    />
                </div>
            </motion.section>

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
                                Have a Project in Mind?
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
