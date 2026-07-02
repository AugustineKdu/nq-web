import React from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Building, CheckCircle, Globe } from "lucide-react";
import Seo from "../../../components/Seo";
import prisma from "@/lib/prisma";

interface PortfolioProject {
    id: number;
    title: string;
    titleKo?: string | null;
    client: string;
    category: string;
    year: string;
    description: string;
    descriptionKo?: string | null;
    longDescription?: string | null;
    tags: string[];
    featured: boolean;
    images?: string[];
    url?: string | null;
    isActive?: boolean;
    challenges?: string[];
    solutions?: string[];
    results?: string[];
}

interface PortfolioDetailProps {
    project: PortfolioProject;
    prevProject: { id: number; title: string } | null;
    nextProject: { id: number; title: string } | null;
}

// SSG(+ISR) — CSR 전용 <Head>는 첫 페인트에서 크롤러에 보이지 않던 문제 해소
export default function PortfolioDetailEN({ project, prevProject, nextProject }: PortfolioDetailProps) {
    const pageTitle = `${project.title} | NQ Solution Portfolio`;
    const pageDescription = project.description.slice(0, 160);
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://nqsolution.kr/en" },
            { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://nqsolution.kr/en/portfolio" },
            { "@type": "ListItem", position: 3, name: project.title, item: `https://nqsolution.kr/en/portfolio/${project.id}` },
        ],
    };

    return (
        <>
            <Seo
                title={pageTitle}
                description={pageDescription}
                path={`/en/portfolio/${project.id}`}
                jsonLd={breadcrumbJsonLd}
            />
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

const projectSelect = {
    id: true,
    title: true,
    titleKo: true,
    client: true,
    category: true,
    year: true,
    description: true,
    descriptionKo: true,
    longDescription: true,
    tags: true,
    featured: true,
    images: true,
    url: true,
    isActive: true,
    challenges: true,
    solutions: true,
    results: true,
} as const;

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const projects = await prisma.project.findMany({ select: { id: true } });
        return {
            paths: projects.map((p) => ({ params: { id: String(p.id) } })),
            fallback: "blocking",
        };
    } catch {
        // 빌드 시 DB 미가용이어도 빌드가 깨지지 않게 — 요청 시 blocking 생성
        return { paths: [], fallback: "blocking" };
    }
};

export const getStaticProps: GetStaticProps<PortfolioDetailProps> = async ({ params }) => {
    const id = Number(params?.id);
    if (!Number.isInteger(id)) return { notFound: true };

    try {
        // 목록 순서는 /api/projects GET과 동일(order asc, id desc) — 이전/다음 내비 일치
        const projects = await prisma.project.findMany({
            select: projectSelect,
            orderBy: [{ order: "asc" }, { id: "desc" }],
        });
        const index = projects.findIndex((p) => p.id === id);
        if (index === -1) return { notFound: true, revalidate: 60 };

        const pick = (p?: { id: number; title: string }) => (p ? { id: p.id, title: p.title } : null);

        return {
            props: {
                project: projects[index],
                prevProject: pick(projects[index - 1]),
                nextProject: pick(projects[index + 1]),
            },
            revalidate: 300,
        };
    } catch {
        return { notFound: true, revalidate: 60 };
    }
};
