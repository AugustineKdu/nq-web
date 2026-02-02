import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

export default function PortfolioEN() {
    const [activeFilter, setActiveFilter] = useState("All");
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

    const filters = ["All", "Digital Product", "Mobile App", "Design", "Web"];

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
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
                                Works
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
                                <motion.span variants={fadeIn} className="block italic">
                                    projects
                                </motion.span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-xl leading-relaxed text-[var(--color-text-secondary)] max-w-2xl"
                            >
                                Each project embodies our client&apos;s vision
                                and our craftsmanship.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter */}
            <section className="py-8 border-y border-[var(--color-border)]">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-8 overflow-x-auto pb-4"
                    >
                        <span className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] shrink-0">
                            Filter
                        </span>
                        <div className="flex gap-4">
                            {filters.map((filter) => (
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
                            <p className="text-[var(--color-text-tertiary)]">Loading...</p>
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="py-20 text-center">
                            <p className="text-[var(--color-text-secondary)] mb-2">No projects found.</p>
                            <p className="text-sm text-[var(--color-text-tertiary)]">Please add projects in the admin page.</p>
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
                                        href={`/en/portfolio/${project.id}`}
                                        className="group block py-10 border-t border-[var(--color-border)] hover:pl-4 transition-all duration-500"
                                    >
                                        <div className="grid grid-cols-12 gap-6 items-center">
                                            {/* Number */}
                                            <div className="col-span-2 md:col-span-1">
                                                <motion.span
                                                    className="text-4xl md:text-5xl font-serif text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors"
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    {String(index + 1).padStart(2, '0')}
                                                </motion.span>
                                            </div>

                                            {/* Title & Category */}
                                            <div className="col-span-10 md:col-span-4">
                                                <span className="text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] block mb-2">
                                                    {project.category}
                                                </span>
                                                <h3 className="text-xl md:text-2xl font-serif group-hover:text-[var(--color-accent)] transition-colors">
                                                    {project.title}
                                                </h3>
                                            </div>

                                            {/* Description */}
                                            <div className="col-span-12 md:col-span-4">
                                                <p className="text-sm text-[var(--color-text-secondary)]">
                                                    {project.description}
                                                </p>
                                            </div>

                                            {/* Client & Year */}
                                            <div className="col-span-10 md:col-span-2">
                                                <p className="text-sm text-[var(--color-text-tertiary)]">
                                                    {project.client}
                                                </p>
                                                <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                                                    {project.year}
                                                </p>
                                            </div>

                                            {/* Arrow */}
                                            <div className="col-span-2 md:col-span-1 flex justify-end">
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
                className="py-20 text-center"
            >
                <div className="container-custom">
                    <p className="text-[var(--color-text-tertiary)] mb-4">
                        More projects coming soon
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
            <section className="section-padding bg-[var(--color-accent)] overflow-hidden">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-display-md font-serif text-white mb-8">
                            Ready to build<br />
                            your next project?
                        </h2>
                        <p className="text-white/60 text-lg mb-12 max-w-md mx-auto">
                            Let us bring your vision to reality.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href="/en/contact"
                                className="inline-flex items-center gap-4 px-8 py-4 bg-white text-[var(--color-accent)] text-sm tracking-widest uppercase font-medium hover:bg-stone-100 transition-colors"
                            >
                                Start a Project
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
