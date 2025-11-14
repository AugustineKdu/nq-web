import React, { useState } from 'react';
import Head from 'next/head';
import { ArrowRight, Lock } from "lucide-react";
import Link from 'next/link';

type ProjectStatus = 'live' | 'confidential';

interface Project {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    link?: string;
    status: ProjectStatus;
    year: string;
    gradient: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "NQ Solution",
        subtitle: "Company Portfolio",
        description: "모던하고 미니멀한 감성의 포트폴리오 웹사이트. Next.js와 Tailwind CSS를 활용한 깔끔한 디자인과 다크모드 지원.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        link: "https://nqsolution.kr",
        status: 'live',
        year: "2025",
        gradient: "from-neutral-100 to-neutral-200"
    },
    {
        id: 2,
        title: "EMECS",
        subtitle: "Corporate Website",
        description: "고효율 전동기 기업 EMECS의 제품 소개 웹사이트. 반응형 디자인과 다국어 지원 기능.",
        tags: ["Next.js", "TypeScript", "i18n"],
        link: "https://www.emecs.kr",
        status: 'live',
        year: "2025",
        gradient: "from-neutral-100 to-neutral-200"
    },
    {
        id: 3,
        title: "Community Management System",
        subtitle: "Confidential Project",
        description: "대학 연구를 위한 로컬 커뮤니티 관리 시스템. 초기 설계 및 개발 전체를 담당.",
        tags: ["JavaScript", "PHP", "Laravel", "MySQL"],
        status: 'confidential',
        year: "2024",
        gradient: "from-neutral-100 to-neutral-200"
    }
];

export default function Portfolio() {
    const [filter, setFilter] = useState<'all' | 'live' | 'confidential'>('all');

    const filteredProjects = projects.filter(project => {
        if (filter === 'all') return true;
        return project.status === filter;
    });

    return (
        <>
            <Head>
                <title>Portfolio | NQ Solution - 프로젝트 사례</title>
                <meta name="description" content="NQ Solution의 프로젝트 포트폴리오. 웹사이트, 앱, 시스템 개발 사례를 확인하세요." />
                <meta name="keywords" content="포트폴리오, 프로젝트사례, 웹개발사례, 앱개발사례, NQ Solution" />

                {/* Open Graph */}
                <meta property="og:title" content="Portfolio | NQ Solution - 프로젝트 사례" />
                <meta property="og:description" content="혁신적인 아이디어를 현실로 만든 프로젝트들을 만나보세요." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nqsolution.kr/portfolio" />
                <meta property="og:image" content="https://nqsolution.kr/nq_textlogo.png" />
            </Head>

        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <p className="text-sm tracking-[0.3em] text-neutral-500 dark:text-neutral-400 uppercase mb-8">
                            Portfolio
                        </p>
                        <h1 className="text-[clamp(3rem,8vw,6rem)] font-light leading-[0.9] tracking-tighter mb-8">
                            Selected<br />Works
                        </h1>
                        <div className="w-24 h-px bg-neutral-900 dark:bg-neutral-100" />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-6 border-b border-neutral-200 dark:border-neutral-800">
                        {[
                            { value: 'all', label: 'All', count: projects.length },
                            { value: 'live', label: 'Live', count: projects.filter(p => p.status === 'live').length },
                            { value: 'confidential', label: 'Confidential', count: projects.filter(p => p.status === 'confidential').length }
                        ].map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setFilter(tab.value as 'all' | 'live' | 'confidential')}
                                className={`relative pb-4 transition-colors text-sm tracking-wide ${
                                    filter === tab.value
                                        ? 'text-neutral-900 dark:text-white'
                                        : 'text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-400'
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span className="ml-2 text-xs">({tab.count})</span>
                                {filter === tab.value && (
                                    <span className="absolute bottom-0 left-0 w-full h-px bg-neutral-900 dark:bg-neutral-100" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects List */}
            <section className="pb-32 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="space-y-px">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="group relative border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 transition-colors"
                            >
                                <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                                    {/* Number */}
                                    <div className="md:col-span-1">
                                        <span className="text-sm text-neutral-400 dark:text-neutral-600">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    {/* Project Preview */}
                                    <div className="md:col-span-3">
                                        <div className={`aspect-[4/3] rounded-lg bg-gradient-to-br ${project.gradient} dark:from-neutral-700 dark:to-neutral-900 relative overflow-hidden group-hover:scale-[1.02] transition-transform border border-neutral-200 dark:border-neutral-800`}>
                                            {project.status === 'confidential' && (
                                                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                                                    <Lock className="w-8 h-8 text-neutral-400 dark:text-white/80" />
                                                </div>
                                            )}
                                            {/* Status Badge */}
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                    project.status === 'live'
                                                        ? 'bg-green-500/90 text-white'
                                                        : 'bg-neutral-500/90 text-white'
                                                }`}>
                                                    {project.status === 'live' ? 'LIVE' : 'CONFIDENTIAL'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="md:col-span-6">
                                        <h3 className="text-2xl font-light mb-2 text-neutral-800 dark:text-white">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                                            {project.subtitle} • {project.year}
                                        </p>
                                        <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs px-2 py-1 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="md:col-span-2 text-right">
                                        {project.status === 'live' && project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group/link"
                                            >
                                                <span>Visit</span>
                                                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* More Coming Soon */}
                    <div className="mt-24 text-center py-16 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg">
                        <div className="max-w-md mx-auto">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                                <span className="text-neutral-700 dark:text-neutral-400">+</span>
                            </div>
                            <h3 className="text-xl font-light mb-2 text-neutral-800 dark:text-neutral-300">
                                More Projects Coming Soon
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                새로운 프로젝트를 준비중입니다
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-8 bg-neutral-900 dark:bg-black">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-3xl font-light mb-2 text-white">
                                다음 프로젝트를 함께 시작해볼까요?
                            </h2>
                            <p className="text-neutral-400">
                                작은 아이디어부터 큰 비전까지
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-neutral-900 rounded-full hover:scale-105 transition-transform group"
                        >
                            <span className="font-medium">Start a Project</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
}
