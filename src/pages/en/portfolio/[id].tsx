import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Building, CheckCircle, Globe } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

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
    const { dark } = useTheme();
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
            <div className={`min-h-screen flex items-center justify-center ${dark ? "bg-[#0a0a0a]" : "bg-[#fafafa]"}`}>
                <p className={`text-lg ${dark ? "text-neutral-400" : "text-neutral-600"}`}>
                    Loading...
                </p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${dark ? "bg-[#0a0a0a]" : "bg-[#fafafa]"}`}>
                <div className="text-center">
                    <p className={`text-lg ${dark ? "text-neutral-400" : "text-neutral-600"}`}>
                        Project not found.
                    </p>
                    <Link href="/en/portfolio" className="mt-4 inline-block text-teal-500 hover:underline">
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
                <meta property="og:url" content={`https://www.nqsolution.com/en/portfolio/${project.id}`} />
                <link rel="canonical" href={`https://www.nqsolution.com/en/portfolio/${project.id}`} />
            </Head>
            <div className={`min-h-screen ${dark ? "bg-[#0a0a0a]" : "bg-[#fafafa]"}`}>
            {/* Hero Section */}
            <section className="pt-32 pb-16">
                <div className="container-custom">
                    <Link
                        href="/en/portfolio"
                        className={`inline-flex items-center gap-2 text-sm mb-8 ${dark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-neutral-900"} transition-colors`}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        View All Projects
                    </Link>

                    <div className="grid grid-cols-12 gap-8 items-start">
                        <div className="col-span-12 lg:col-span-8">
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    dark ? "bg-teal-500/10 text-teal-500" : "bg-teal-50 text-teal-600"
                                }`}>
                                    {project.category}
                                </span>
                                {project.isActive !== undefined && (
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        project.isActive
                                            ? dark ? "bg-green-500/10 text-green-500" : "bg-green-50 text-green-600"
                                            : dark ? "bg-neutral-500/10 text-neutral-500" : "bg-neutral-100 text-neutral-500"
                                    }`}>
                                        {project.isActive ? "Live" : "Ended"}
                                    </span>
                                )}
                            </div>
                            <h1 className={`text-4xl md:text-5xl font-normal tracking-tight mb-6 ${dark ? "text-white" : "text-neutral-900"}`}>
                                {project.title}
                            </h1>
                            <p className={`text-xl leading-relaxed ${dark ? "text-neutral-300" : "text-neutral-600"}`}>
                                {project.description}
                            </p>
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                            <div className={`p-6 rounded-2xl space-y-4 ${
                                dark ? "bg-neutral-900 border border-neutral-800" : "bg-white border border-neutral-200"
                            }`}>
                                <div className="flex items-center gap-3">
                                    <Building className="w-5 h-5 text-teal-500" />
                                    <div>
                                        <p className={`text-xs ${dark ? "text-neutral-500" : "text-neutral-400"}`}>Client</p>
                                        <p className={`font-medium ${dark ? "text-white" : "text-neutral-900"}`}>{project.client}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-teal-500" />
                                    <div>
                                        <p className={`text-xs ${dark ? "text-neutral-500" : "text-neutral-400"}`}>Year</p>
                                        <p className={`font-medium ${dark ? "text-white" : "text-neutral-900"}`}>{project.year}</p>
                                    </div>
                                </div>
                                {project.url && (
                                    <a
                                        href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 group"
                                    >
                                        <Globe className="w-5 h-5 text-teal-500" />
                                        <div className="flex-1">
                                            <p className={`text-xs ${dark ? "text-neutral-500" : "text-neutral-400"}`}>Website</p>
                                            <p className="font-medium text-teal-500 group-hover:underline flex items-center gap-1">
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
                                    className={`aspect-video rounded-2xl overflow-hidden ${
                                        dark ? "bg-neutral-800" : "bg-neutral-200"
                                    }`}
                                >
                                    <div className="w-full h-full flex items-center justify-center text-neutral-500">
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
                <section className={`py-16 ${dark ? "bg-neutral-900/50" : "bg-white"}`}>
                    <div className="container-custom">
                        <div className="max-w-3xl">
                            <h2 className={`text-2xl font-medium mb-8 ${dark ? "text-white" : "text-neutral-900"}`}>
                                About the Project
                            </h2>
                            <div className={`text-lg leading-relaxed whitespace-pre-line ${dark ? "text-neutral-300" : "text-neutral-600"}`}>
                                {project.longDescription}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Challenges & Solutions */}
            {(project.challenges || project.solutions || project.results) && (
                <section className={`py-16 ${dark ? "bg-neutral-900/50" : "bg-white"}`}>
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {project.challenges && project.challenges.length > 0 && (
                                <div>
                                    <h3 className={`text-lg font-medium mb-6 ${dark ? "text-white" : "text-neutral-900"}`}>
                                        Challenges
                                    </h3>
                                    <ul className="space-y-3">
                                        {project.challenges.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="text-teal-500 mt-1">-</span>
                                                <span className={`text-sm ${dark ? "text-neutral-300" : "text-neutral-600"}`}>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {project.solutions && project.solutions.length > 0 && (
                                <div>
                                    <h3 className={`text-lg font-medium mb-6 ${dark ? "text-white" : "text-neutral-900"}`}>
                                        Solutions
                                    </h3>
                                    <ul className="space-y-3">
                                        {project.solutions.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                                                <span className={`text-sm ${dark ? "text-neutral-300" : "text-neutral-600"}`}>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {project.results && project.results.length > 0 && (
                                <div>
                                    <h3 className={`text-lg font-medium mb-6 ${dark ? "text-white" : "text-neutral-900"}`}>
                                        Results
                                    </h3>
                                    <ul className="space-y-3">
                                        {project.results.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="text-teal-500 font-bold mt-0.5">+</span>
                                                <span className={`text-sm ${dark ? "text-neutral-300" : "text-neutral-600"}`}>{item}</span>
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
                    <div className={`p-12 rounded-3xl text-center ${dark ? "bg-teal-500/10 border border-teal-500/20" : "bg-teal-50 border border-teal-100"}`}>
                        <h2 className={`text-3xl font-normal mb-4 ${dark ? "text-white" : "text-neutral-900"}`}>
                            Planning a similar project?
                        </h2>
                        <p className={`mb-8 ${dark ? "text-neutral-300" : "text-neutral-600"}`}>
                            Let&apos;s discuss your project today.
                        </p>
                        <Link
                            href="/en/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 text-white rounded-full font-medium hover:bg-teal-600 transition-colors"
                        >
                            Start a Project
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <section className={`py-12 border-t ${dark ? "border-neutral-800" : "border-neutral-200"}`}>
                <div className="container-custom">
                    <div className="flex justify-between items-center">
                        {prevProject ? (
                            <Link
                                href={`/en/portfolio/${prevProject.id}`}
                                className={`flex items-center gap-3 group ${dark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-neutral-900"} transition-colors`}
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
                                className={`flex items-center gap-3 text-right group ${dark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-neutral-900"} transition-colors`}
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
