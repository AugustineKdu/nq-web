import React, { useState } from 'react';
import { ArrowRight, Lock, ExternalLink, Github, Globe } from "lucide-react";
import Link from 'next/link';

type ProjectStatus = 'live' | 'development' | 'confidential';

interface Project {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    image?: string;
    link?: string;
    github?: string;
    status: ProjectStatus;
    year: string;
    client?: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "NQ Solution 웹사이트",
        subtitle: "Company Portfolio",
        description: "모던 심플한 감성의 트렌디한 포트폴리오 웹사이트. Next.js와 Tailwind CSS를 활용한 모던한 디자인과 다크모드 지원.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
        link: "https://nqsolution.kr",
        status: 'live',
        year: "2025",
        image: "linear-gradient(135deg, #8f9093ff 0%, #111112ff 100%)"
    },
    {
        id: 2,
        title: "EMECS - 고효율 전동기 기업 웹사이트",
        subtitle: "회사 소개 및 ",
        description: "기업 EMECS의 고효율 전동기 제품을 소개하는 웹사이트. Next.js와 Tailwind CSS로 제작된 반응형 디자인과 언어변환 기능 .",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
        link: "https://www.emecs.kr",
        status: 'live',
        year: "2025",
        image: "linear-gradient(135deg, #6355e0ff 0%, #0000f8ff 100%)"
    },
    {
        id: 3,
        title: "로컬 커뮤니티 관리 시스템 및 웹사이트 ",
        subtitle: "Confidential Project",
        description: "해외 대학 비지니스 교수와 박사 논문을 위해 개발된 로컬 커뮤니티 지원자 시스템 및 웹사이트, 초기 개발 전체 프로젝트 설계 및 초기 개발을 담당하였습니다.",
        tags: ["Js", "PHP", "laravel", "MySQL"],
        status: 'confidential',
        year: "2024",
        client: "University Dr Provider",
        image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    }
];

export default function Portfolio() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [filter, setFilter] = useState<'all' | 'live' | 'confidential'>('all');

    const filteredProjects = projects.filter(project => {
        if (filter === 'all') return true;
        if (filter === 'live') return project.status === 'live';
        if (filter === 'confidential') return project.status === 'confidential';
        return true;
    });

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20">
                        <p className="text-sm tracking-[0.3em] text-neutral-500 dark:text-neutral-400 uppercase mb-8">
                            Portfolio
                        </p>
                        <h1 className="text-[clamp(3rem,8vw,6rem)] font-light leading-[0.9] tracking-tighter mb-8">
                            Our<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                                Works
                            </span>
                        </h1>
                        <div className="w-full h-px bg-neutral-900 dark:bg-neutral-100" />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-8 mb-16">
                        {[
                            { value: 'all', label: 'All Projects', count: projects.length },
                            { value: 'live', label: 'Live', count: projects.filter(p => p.status === 'live').length },
                            { value: 'confidential', label: 'Confidential', count: projects.filter(p => p.status === 'confidential').length }
                        ].map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setFilter(tab.value as any)}
                                className={`relative pb-2 transition-all ${
                                    filter === tab.value 
                                        ? 'text-neutral-900 dark:text-white' 
                                        : 'text-neutral-400 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-400'
                                }`}
                            >
                                <span className="text-lg">{tab.label}</span>
                                <span className="ml-2 text-sm">({tab.count})</span>
                                {filter === tab.value && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="pb-32 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="group relative"
                                onMouseEnter={() => setHoveredId(project.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                                    {/* Project Image/Gradient */}
                                    <div 
                                        className="h-64 relative overflow-hidden"
                                        style={{ background: project.image }}
                                    >
                                        {project.status === 'confidential' && (
                                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                                                <Lock className="w-12 h-12 text-white/60" />
                                            </div>
                                        )}
                                        
                                        {/* Status Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
                                                project.status === 'live' 
                                                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                                    : project.status === 'development'
                                                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                                                    : 'bg-neutral-500/20 text-neutral-300 border border-neutral-500/30'
                                            }`}>
                                                {project.status === 'live' ? '🟢 Live' : 
                                                 project.status === 'development' ? '🟡 Development' : 
                                                 '🔒 Confidential'}
                                            </span>
                                        </div>

                                        {/* Quick Actions */}
                                        {project.status === 'live' && (
                                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {project.link && (
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4 text-white" />
                                                    </a>
                                                )}
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-colors"
                                                    >
                                                        <Github className="w-4 h-4 text-white" />
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-8">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-2xl font-semibold mb-1 text-neutral-900 dark:text-white">
                                                    {project.title}
                                                </h3>
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                                    {project.subtitle} • {project.year}
                                                </p>
                                                {project.client && (
                                                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                                                        Client: {project.client}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-neutral-600 dark:text-neutral-300 mb-6 line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* View Project Link */}
                                        {project.status === 'live' && project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors group/link"
                                            >
                                                <span className="relative">
                                                    View Project
                                                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-current group-hover/link:w-full transition-all duration-300" />
                                                </span>
                                                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* More Coming Soon Card */}
                    <div className="mt-8 relative">
                        <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 p-16 text-center">
                            <div className="max-w-md mx-auto">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <span className="text-2xl text-white">+</span>
                                </div>
                                <h3 className="text-2xl font-light mb-4 text-neutral-700 dark:text-neutral-300">
                                    More Projects Coming Soon
                                </h3>
                                <p className="text-neutral-500 dark:text-neutral-400 mb-8">
                                    새로운 프로젝트들을 준비중입니다.<br />
                                    곧 더 많은 작업물을 선보일 예정입니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-neutral-900 dark:to-neutral-800">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-light mb-8 text-neutral-900 dark:text-white">
                        다음 프로젝트를 함께 만들어볼까요?
                    </h2>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                    >
                        <span className="font-medium">Start a Project</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
}