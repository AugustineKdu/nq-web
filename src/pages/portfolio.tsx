import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout';

const PortfolioPage: NextPage = () => {
    const [activeTab, setActiveTab] = useState('all');

    const projects = [
        {
            title: '이커머스 플랫폼',
            description: '패션 브랜드를 위한 맞춤형 온라인 쇼핑몰',
            category: '웹 개발',
            tags: ['React', 'Node.js', 'MongoDB'],
            image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800',
        },
        {
            title: '건강 관리 앱',
            description: '개인 맞춤형 건강 관리 및 운동 추적 앱',
            category: '앱 개발',
            tags: ['Flutter', 'Firebase', 'HealthKit'],
            image: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?auto=format&fit=crop&q=80&w=800',
        },
        {
            title: '금융 대시보드',
            description: '실시간 데이터 시각화를 통한 금융 자산 관리',
            category: 'UI/UX 디자인',
            tags: ['Figma', 'Adobe XD', 'Dashboard'],
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        },
        {
            title: '여행 예약 시스템',
            description: '종합 여행 예약 및 관리 플랫폼',
            category: '웹 개발',
            tags: ['Vue.js', 'Express', 'PostgreSQL'],
            image: 'https://images.unsplash.com/photo-1476900543704-4312b78632f8?auto=format&fit=crop&q=80&w=800',
        },
        {
            title: '부동산 중개 앱',
            description: 'AR 기술을 활용한 부동산 중개 모바일 앱',
            category: '앱 개발',
            tags: ['React Native', 'AR Kit', 'GraphQL'],
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
        },
        {
            title: '교육 플랫폼 UI',
            description: '온라인 교육 플랫폼 사용자 인터페이스 디자인',
            category: 'UI/UX 디자인',
            tags: ['Wireframing', 'Prototyping', 'User Testing'],
            image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
        },
    ];

    const filteredProjects = activeTab === 'all'
        ? projects
        : projects.filter(p => {
            if (activeTab === 'web') return p.category === '웹 개발';
            if (activeTab === 'app') return p.category === '앱 개발';
            if (activeTab === 'design') return p.category === 'UI/UX 디자인';
            return true;
        });

    return (
        <Layout title="포트폴리오 - NQ Solution">
            {/* Hero Section */}
            <section className="py-20">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="badge bg-purple-100 text-purple-800">포트폴리오</span>
                        <h1 className="mt-4 mb-4">우리의 프로젝트</h1>
                        <p className="text-xl text-gray-600">
                            아이디어를 현실로 만든 다양한 프로젝트들을 확인해보세요
                        </p>
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <section className="pb-12">
                <div className="container">
                    <div className="flex justify-center">
                        <div className="inline-flex bg-gray-100 p-1 rounded-lg">
                            <button
                                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'all'
                                        ? 'bg-white text-gray-900 shadow'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                onClick={() => setActiveTab('all')}
                            >
                                전체
                            </button>
                            <button
                                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'web'
                                        ? 'bg-white text-gray-900 shadow'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                onClick={() => setActiveTab('web')}
                            >
                                웹 개발
                            </button>
                            <button
                                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'app'
                                        ? 'bg-white text-gray-900 shadow'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                onClick={() => setActiveTab('app')}
                            >
                                앱 개발
                            </button>
                            <button
                                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'design'
                                        ? 'bg-white text-gray-900 shadow'
                                        : 'text-gray-600 hover:text-gray-900'
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <div key={index} className="card hover:-translate-y-1">
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6">
                                    <span className="badge bg-blue-100 text-blue-800 mb-3">{project.category}</span>
                                    <h3 className="text-xl mb-2">{project.title}</h3>
                                    <p className="text-gray-600 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="px-6 pb-6">
                                    <button className="w-full btn btn-secondary">상세보기</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gray-50">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center card p-12">
                        <h2 className="mb-4">프로젝트가 필요하신가요?</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            귀하의 비즈니스에 맞는 맞춤형 솔루션을 함께 만들어보세요
                        </p>
                        <a href="/contact" className="btn btn-primary">문의하기</a>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default PortfolioPage;