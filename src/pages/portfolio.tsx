import React, { useState } from 'react';
import { ArrowRight } from "lucide-react";
import Link from 'next/link';

interface Project {
    id: number;
    number: string;
    title: string;
    client: string;
    year: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
}

export default function Portfolio() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const projects: Project[] = [
        {
            id: 1,
            number: "01",
            title: "E-commerce Platform",
            client: "StyleHub",
            year: "2024",
            category: "web",
            description: "패션 이커머스 플랫폼 구축. AI 기반 추천 시스템과 간편 결제 시스템을 통해 사용자 경험을 혁신했습니다.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
            tags: ["React", "Node.js", "AI/ML"]
        },
        {
            id: 2,
            number: "02",
            title: "Fitness Tracker App",
            client: "FitLife",
            year: "2024",
            category: "app",
            description: "운동 기록과 건강 관리를 위한 모바일 앱. 직관적인 UI와 실시간 데이터 동기화로 100만 다운로드를 달성했습니다.",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200",
            tags: ["Flutter", "Firebase", "HealthKit"]
        },
        {
            id: 3,
            number: "03",
            title: "Brand Identity Design",
            client: "TechFlow",
            year: "2024",
            category: "design",
            description: "AI 스타트업의 브랜드 아이덴티티 리뉴얼. 미니멀한 디자인 언어로 기술의 본질을 표현했습니다.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
            tags: ["Branding", "UI/UX", "Design System"]
        },
        {
            id: 4,
            number: "04",
            title: "Financial Dashboard",
            client: "MoneyFlow",
            year: "2023",
            category: "web",
            description: "실시간 금융 데이터 시각화 대시보드. 복잡한 데이터를 직관적으로 표현하여 의사결정을 돕습니다.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
            tags: ["Vue.js", "D3.js", "WebSocket"]
        },
        {
            id: 5,
            number: "05",
            title: "Healthcare IoT System",
            client: "HealthTech",
            year: "2023",
            category: "app",
            description: "웨어러블 기기와 연동되는 헬스케어 모니터링 시스템. 의료기관과 환자를 연결하는 플랫폼입니다.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
            tags: ["React Native", "IoT", "AWS"]
        }
    ];

    const filters = [
        { value: 'all', label: 'All' },
        { value: 'web', label: 'Web' },
        { value: 'app', label: 'App' },
        { value: 'design', label: 'Design' }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category === activeFilter);

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
                            Selected<br />works
                        </h1>
                        <div className="w-full h-px bg-neutral-900 dark:bg-neutral-100" />
                    </div>
                </div>
            </section>

            {/* Filter */}
            <section className="pb-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex gap-8">
                        {filters.map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setActiveFilter(filter.value)}
                                className={`text-sm uppercase tracking-wider transition-colors ${activeFilter === filter.value
                                    ? 'text-neutral-900 dark:text-neutral-100'
                                    : 'text-neutral-400 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-400'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="pb-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="space-y-px">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="group"
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className="grid grid-cols-12 gap-8 py-12 border-b border-neutral-200 dark:border-neutral-800 cursor-pointer hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 transition-colors px-4 -mx-4">
                                    <div className="col-span-1">
                                        <p className="text-sm text-neutral-400 dark:text-neutral-600">{project.number}</p>
                                    </div>

                                    <div className="col-span-5 md:col-span-3">
                                        <h3 className="text-xl font-light">{project.title}</h3>
                                    </div>

                                    <div className="col-span-4 md:col-span-2">
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{project.client}</p>
                                    </div>

                                    <div className="hidden md:block md:col-span-4">
                                        <div className="flex gap-4">
                                            {project.tags.map((tag, i) => (
                                                <span key={i} className="text-sm text-neutral-500 dark:text-neutral-400">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="col-span-2 text-right">
                                        <p className="text-sm text-neutral-400 dark:text-neutral-600">{project.year}</p>
                                    </div>

                                    <div className="col-span-12 md:col-span-12 overflow-hidden h-0 group-hover:h-64 transition-all duration-500">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-64 object-cover mt-8"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-8 bg-white dark:bg-neutral-900">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
                        {[
                            { number: "50+", label: "Projects" },
                            { number: "30+", label: "Clients" },
                            { number: "100%", label: "Satisfaction" },
                            { number: "2M+", label: "Users" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <p className="text-5xl font-light mb-2">{stat.number}</p>
                                <p className="text-sm uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-8 bg-neutral-900 dark:bg-black text-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-light mb-8">
                        다음 프로젝트를 함께 만들어볼까요?
                    </h2>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-4 text-lg group"
                    >
                        <span className="relative">
                            Start a Project
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500" />
                        </span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Project Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-8"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="bg-white dark:bg-neutral-900 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-12">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <p className="text-sm text-neutral-400 dark:text-neutral-600 mb-2">
                                        {selectedProject.number}
                                    </p>
                                    <h2 className="text-4xl font-light mb-2">{selectedProject.title}</h2>
                                    <p className="text-neutral-500 dark:text-neutral-400">
                                        {selectedProject.client} · {selectedProject.year}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="text-2xl font-light hover:rotate-90 transition-transform"
                                >
                                    ×
                                </button>
                            </div>

                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="w-full h-96 object-cover mb-8"
                            />

                            <p className="text-lg mb-8 leading-relaxed">
                                {selectedProject.description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {selectedProject.tags.map((tag, i) => (
                                    <span key={i} className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}