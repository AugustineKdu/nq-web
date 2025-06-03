import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

const PortfolioPage: NextPage = () => {
    const [activeTab, setActiveTab] = useState('all');

    const projects = [
        {
            title: '개인사업자 웹사이트 제작',
            description: '스타트업 사장님을 위한 맞춤형 비즈니스 웹사이트',
            category: '웹 개발',
            tags: ['React', 'Next.js', 'Tailwind CSS'],
            image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800',
            status: 'development'
        },
        {
            title: '개인사업자 웹사이트 제작',
            description: '세무사 사장님을 위한 맞춤형 비즈니스 웹사이트',
            category: '웹 개발',
            tags: ['React', 'Next.js', 'Responsive'],
            image: 'https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&q=80&w=800',
            status: 'development'
        }
    ];

    const filteredProjects = activeTab === 'all'
        ? projects
        : projects.filter(p => {
            if (activeTab === 'web') return p.category === '웹 개발';
            if (activeTab === 'app') return p.category === '앱 개발';
            if (activeTab === 'design') return p.category === 'UI/UX 디자인';
            return true;
        });

    const getStatusBadge = (status: string) => {
        if (status === 'available') {
            return <span className="badge bg-green-100 text-green-800 mb-3">✅ 서비스 중</span>;
        } else if (status === 'development') {
            return <span className="badge bg-orange-100 text-orange-800 mb-3">🚧 개발 중</span>;
        } else if (status === 'private') {
            return <span className="badge bg-gray-100 text-gray-800 mb-3">🔒 비공개</span>;
        }
        return null;
    };

    const getStatusMessage = (status: string) => {
        if (status === 'available') {
            return '현재 제작 서비스를 제공하고 있습니다';
        } else if (status === 'development') {
            return '현재 개발 진행 중인 프로젝트입니다';
        } else if (status === 'private') {
            return '클라이언트 요청으로 비공개 프로젝트입니다';
        }
        return '';
    };

    return (
        <>
            <Head>
                <title>포트폴리오 - NQ Solution</title>
            </Head>

            {/* Hero Section */}
            <section className="py-20">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="badge bg-purple-100 text-purple-800">포트폴리오</span>
                        <h1 className="mt-4 mb-4">현재 진행 중인 프로젝트</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            개인사업자를 위한 웹사이트를 제작 중입니다
                        </p>

                        {/* 서비스 안내 */}
                        <div className="max-w-2xl mx-auto p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🚧</span>
                                <div className="text-left">
                                    <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">프로젝트 진행 상황</h3>
                                    <div className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                                        <p>• 현재 2개의 개인사업자 웹사이트를 제작 중입니다</p>
                                        <p>• 제작 완료 후 포트폴리오에 공개될 예정입니다</p>
                                        <p>• 새로운 프로젝트 문의는 언제든 환영합니다</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <section className="pb-12">
                <div className="container">
                    <div className="flex justify-center">
                        <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                            <button
                                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'all'
                                    ? 'bg-white dark:bg-[#2563eb] text-gray-900 dark:text-white shadow'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                onClick={() => setActiveTab('all')}
                            >
                                전체
                            </button>
                            <button
                                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'web'
                                    ? 'bg-white dark:bg-[#2563eb] text-gray-900 dark:text-white shadow'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                onClick={() => setActiveTab('web')}
                            >
                                웹 개발
                            </button>
                            <button
                                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'app'
                                    ? 'bg-white dark:bg-[#2563eb] text-gray-900 dark:text-white shadow'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                onClick={() => setActiveTab('app')}
                            >
                                앱 개발
                            </button>
                            <button
                                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'design'
                                    ? 'bg-white dark:bg-[#2563eb] text-gray-900 dark:text-white shadow'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                onClick={() => setActiveTab('design')}
                            >
                                UI/UX 디자인
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="pb-20">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {filteredProjects.map((project, index) => (
                            <div key={index} className="card hover:-translate-y-1 relative overflow-hidden">
                                <div className="aspect-video overflow-hidden relative">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 filter blur-sm"
                                    />
                                    {/* 오버레이 */}
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="text-white text-lg font-semibold">제작 중</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {getStatusBadge(project.status)}
                                    <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 mb-3 ml-2">{project.category}</span>
                                    <h3 className="text-xl mb-2 dark:text-white">{project.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>

                                    <p className="text-sm text-gray-500 dark:text-gray-500 italic mb-4">
                                        {getStatusMessage(project.status)}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="px-6 pb-6">
                                    <button
                                        className="w-full btn btn-secondary opacity-50 cursor-not-allowed"
                                        disabled
                                    >
                                        제작 중
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-950">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6 dark:text-white">다음 프로젝트는 여러분의 웹사이트입니다</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            개인사업자를 위한 전문적인 웹사이트를 제작해드립니다
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href="/contact" className="btn btn-primary">
                                <span>💻</span> 제작 문의하기
                            </a>
                            <a href="mailto:contact@nqsolution.com" className="btn btn-secondary">
                                <span>📧</span> 이메일 문의
                            </a>
                        </div>

                        <div className="mt-12 p-6 bg-white dark:bg-gray-900 rounded-xl border">
                            <h3 className="font-semibold mb-4 dark:text-white">💼 제작 서비스 포함 사항</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <span className="block font-medium mb-1 dark:text-white">반응형 디자인</span>
                                    <span className="text-gray-600 dark:text-gray-400">PC, 태블릿, 모바일 최적화</span>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <span className="block font-medium mb-1 dark:text-white">맞춤 디자인</span>
                                    <span className="text-gray-600 dark:text-gray-400">업종별 특화 디자인</span>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <span className="block font-medium mb-1 dark:text-white">빠른 제작</span>
                                    <span className="text-gray-600 dark:text-gray-400">7-14일 내 완성</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PortfolioPage;