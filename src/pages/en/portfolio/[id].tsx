import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Building, CheckCircle, Globe } from "lucide-react";

interface PortfolioProject {
    id: number;
    title: string;
    titleKo?: string;
    client: string;
    category: string;
    year: string;
    description: string;
    descriptionKo?: string;
    longDescription?: string;
    tags: string[];
    featured: boolean;
    images?: string[];
    url?: string;
    isActive?: boolean;
    challenges?: string[];
    solutions?: string[];
    results?: string[];
}

export default function PortfolioDetailEN() {
    const router = useRouter();
    const { id } = router.query;
    const [projects, setProjects] = useState<PortfolioProject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

    const project = projects.find(p => p.id === Number(id));
    const currentIndex = projects.findIndex(p => p.id === Number(id));
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-[var(--color-text-secondary)]">
                    Loading...
                </p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-[var(--color-text-secondary)]">
                        Project not found.
                    </p>
                    <Link href="/en/portfolio" className="mt-4 inline-block text-[var(--color-accent)] hover:underline">
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{project.title} | NQ Solution Portfolio</title>
                <meta name="description" content={project.description} />
                <meta property="og:title" content={`${project.title} | NQ Solution`} />
                <meta property="og:description" content={project.description} />
                <meta property="og:url" content={`https://nqsolution.kr/en/portfolio/${project.id}`} />
                <link rel="canonical" href={`https://nqsolution.kr/en/portfolio/${project.id}`} />
            </Head>
            <div className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-16">
                <div className="container-custom">
                    <Link
                        href="/en/portfolio"
                        className="inline-flex items-center gap-2 text-sm mb-8 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        View All Projects
                    </Link>

                    <div className="grid grid-cols-12 gap-8 items-start">
                        <div className="col-span-12 lg:col-span-8">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-accent-subtle)] text-[var(--color-accent)]">
                                    {project.category}
                                </span>
                                {project.isActive !== undefined && (
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        project.isActive
                                            ? "bg-green-500/10 text-green-500"
                                            : "bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)]"
                                    }`}>
                                        {project.isActive ? "Live" : "Ended"}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-6 text-[var(--color-text-primary)]">
                                {project.title}
                            </h1>
                            <p className="text-xl leading-relaxed text-[var(--color-text-secondary)]">
                                {project.description}
                            </p>
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                            <div className="card p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Building className="w-5 h-5 text-[var(--color-accent)]" />
                                    <div>
                                        <p className="text-xs text-[var(--color-text-tertiary)]">Client</p>
                                        <p className="font-medium text-[var(--color-text-primary)]">{project.client}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-[var(--color-accent)]" />
                                    <div>
                                        <p className="text-xs text-[var(--color-text-tertiary)]">Year</p>
                                        <p className="font-medium text-[var(--color-text-primary)]">{project.year}</p>
                                    </div>
                                </div>
                                {project.url && (
                                    <a
                                        href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 group"
                                    >
                                        <Globe className="w-5 h-5 text-[var(--color-accent)]" />
                                        <div className="flex-1">
                                            <p className="text-xs text-[var(--color-text-tertiary)]">Website</p>
                                            <p className="font-medium text-[var(--color-accent)] group-hover:underline flex items-center gap-1">
                                                Visit Site <ExternalLink className="w-3 h-3" />
                                            </p>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Images */}
            {project.images && project.images.length > 0 && (
                <section className="pb-16">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {project.images.map((img, i) => (
                                <div
                                    key={i}
                                    className="aspect-video overflow-hidden bg-[var(--color-bg-secondary)]"
                                >
                                    <div className="w-full h-full flex items-center justify-center text-[var(--color-text-tertiary)]">
                                        <span className="text-sm">Image {i + 1}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Long Description */}
            {project.longDescription && (
                <section className="py-16 bg-[var(--color-bg-secondary)]">
                    <div className="container-custom">
                        <div className="max-w-3xl">
                            <h2 className="text-2xl font-medium mb-8 text-[var(--color-text-primary)]">
                                About the Project
                            </h2>
                            <div className="text-lg leading-relaxed whitespace-pre-line text-[var(--color-text-secondary)]">
                                {project.longDescription}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Challenges & Solutions */}
            {(project.challenges || project.solutions || project.results) && (
                <section className="py-16 bg-[var(--color-bg-secondary)]">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {project.challenges && project.challenges.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-medium mb-6 text-[var(--color-text-primary)]">
                                        Challenges
                                    </h3>
                                    <ul className="space-y-3">
                                        {project.challenges.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="text-[var(--color-accent)] mt-1">-</span>
                                                <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {project.solutions && project.solutions.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-medium mb-6 text-[var(--color-text-primary)]">
                                        Solutions
                                    </h3>
                                    <ul className="space-y-3">
                                        {project.solutions.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle className="w-4 h-4 text-[var(--color-accent)] mt-0.5 shrink-0" />
                                                <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {project.results && project.results.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-medium mb-6 text-[var(--color-text-primary)]">
                                        Results
                                    </h3>
                                    <ul className="space-y-3">
                                        {project.results.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="text-[var(--color-accent)] font-bold mt-0.5">+</span>
                                                <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="p-12 bg-[var(--color-accent-subtle)] border border-[var(--color-border)] text-center">
                        <h2 className="text-3xl font-normal mb-4 text-[var(--color-text-primary)]">
                            Planning a similar project?
                        </h2>
                        <p className="mb-8 text-[var(--color-text-secondary)]">
                            Let&apos;s discuss your project today.
                        </p>
                        <Link
                            href="/en/contact"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            Start a Project
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <section className="py-12 border-t border-[var(--color-border)]">
                <div className="container-custom">
                    <div className="flex justify-between items-center">
                        {prevProject ? (
                            <Link
                                href={`/en/portfolio/${prevProject.id}`}
                                className="flex items-center gap-3 group text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <div>
                                    <p className="text-xs uppercase tracking-wider mb-1">Previous</p>
                                    <p className="font-medium">{prevProject.title}</p>
                                </div>
                            </Link>
                        ) : <div />}
                        {nextProject ? (
                            <Link
                                href={`/en/portfolio/${nextProject.id}`}
                                className="flex items-center gap-3 text-right group text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                            >
                                <div>
                                    <p className="text-xs uppercase tracking-wider mb-1">Next</p>
                                    <p className="font-medium">{nextProject.title}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </section>
            </div>
        </>
    );
}
