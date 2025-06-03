import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

const ServicesPage: NextPage = () => {
    const [selectedService, setSelectedService] = useState(0);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const services = [
        {
            icon: '💻',
            title: '웹 개발',
            subtitle: '반응형 웹사이트 & 웹 애플리케이션',
            description: '비즈니스 목표에 맞는 맞춤형 웹 솔루션을 제공합니다. 최신 기술과 SEO 최적화로 온라인 성장을 도와드립니다.',
            basePrice: '200만원~',
            duration: '4-8주',
            includes: [
                '반응형 디자인',
                'SEO 기초 최적화',
                '기본 보안 설정',
                '1개월 무료 유지보수'
            ],
            addons: [
                { name: '다크모드', price: 50, time: 3 },
                { name: '다국어 지원', price: 100, time: 7 },
                { name: '애니메이션', price: 80, time: 5 },
                { name: 'CMS 연동', price: 150, time: 10 }
            ]
        },
        {
            icon: '📱',
            title: '앱 개발',
            subtitle: 'iOS & Android 네이티브/크로스 플랫폼',
            description: '사용자 경험을 최우선으로 하는 모바일 앱을 개발합니다. 네이티브부터 크로스 플랫폼까지 다양한 옵션을 제공합니다.',
            basePrice: '500만원~',
            duration: '8-12주',
            includes: [
                'UI/UX 디자인',
                '앱스토어 등록 지원',
                '푸시 알림 기능',
                '1개월 무료 유지보수'
            ],
            addons: [
                { name: '결제 시스템', price: 200, time: 14 },
                { name: '소셜 로그인', price: 100, time: 7 },
                { name: '오프라인 모드', price: 150, time: 10 },
                { name: '실시간 채팅', price: 180, time: 12 }
            ]
        },
        {
            icon: '🎨',
            title: 'UI/UX 디자인',
            subtitle: '사용자 중심 디자인 & 브랜딩',
            description: '직관적이고 아름다운 디자인으로 사용자 경험을 극대화합니다. 브랜드 아이덴티티부터 인터페이스까지 토탈 솔루션을 제공합니다.',
            basePrice: '150만원~',
            duration: '2-4주',
            includes: [
                '사용자 리서치',
                '와이어프레임',
                '고해상도 디자인',
                '디자인 가이드'
            ],
            addons: [
                { name: '프로토타입', price: 100, time: 7 },
                { name: '브랜드 가이드', price: 150, time: 10 },
                { name: '모션 디자인', price: 120, time: 7 },
                { name: '사용성 테스트', price: 80, time: 5 }
            ]
        },
        {
            icon: '⚡',
            title: '기술 컨설팅',
            subtitle: '기술 전략 & 시스템 최적화',
            description: '비즈니스 성장을 위한 기술 전략을 수립하고 시스템을 최적화합니다. 디지털 트랜스포메이션을 성공적으로 이끌어드립니다.',
            basePrice: '100만원~',
            duration: '1-2주',
            includes: [
                '현황 분석',
                '기술 스택 추천',
                '로드맵 수립',
                '실행 계획서'
            ],
            addons: [
                { name: '성능 최적화', price: 150, time: 10 },
                { name: '보안 감사', price: 200, time: 14 },
                { name: '클라우드 마이그레이션', price: 300, time: 21 },
                { name: 'DevOps 구축', price: 250, time: 14 }
            ]
        }
    ];

    const packages = [
        {
            type: 'basic',
            name: '베이직',
            description: '핵심 기능만 포함된 기본 패키지',
            features: ['기본 기획', '심플 디자인', '핵심 기능 개발', '기본 테스트']
        },
        {
            type: 'standard',
            name: '스탠다드',
            description: '카피라이팅과 디자인 컨셉 포함',
            features: ['상세 기획 + 카피라이팅', '맞춤 디자인 컨셉', '확장 기능 개발', '통합 테스트', '인터랙티브 프로토타입']
        },
        {
            type: 'premium',
            name: '프리미엄',
            description: '풀 서비스 패키지',
            features: ['전략 컨설팅', '브랜드 아이덴티티', 'A/B 테스트', '성능 최적화', '3D 프로토타입', '마케팅 지원']
        }
    ];

    const prototypeTypes = [
        { name: '와이어프레임', description: '기본 구조와 레이아웃' },
        { name: '인터랙티브', description: '클릭 가능한 프로토타입' },
        { name: '애니메이션', description: '모션이 포함된 프로토타입' },
        { name: '3D/AR', description: '입체적 경험 프로토타입' }
    ];

    const calculatePrice = () => {
        const base = services[selectedService];
        let additionalPrice = 0;
        let additionalTime = 0;

        selectedFeatures.forEach(feature => {
            const addon = base.addons.find(a => a.name === feature);
            if (addon) {
                additionalPrice += addon.price;
                additionalTime += addon.time;
            }
        });

        return { price: additionalPrice, time: additionalTime };
    };

    return (
        <>
            <Head>
                <title>서비스 - NQ Solution</title>
            </Head>

            {/* Hero Section */}
            <section className="py-20">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="badge">Services</span>
                        <h1 className="mt-4 mb-4">맞춤형 디지털 솔루션</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            아이디어부터 런칭까지, 모든 단계에서 함께합니다
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`card p-6 cursor-pointer transition-all ${selectedService === index
                                        ? 'ring-2 ring-[#2563eb] dark:ring-[#2dd4bf]'
                                        : 'hover:-translate-y-1'
                                    }`}
                                onClick={() => setSelectedService(index)}
                            >
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{service.subtitle}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-[#2563eb] dark:text-[#2dd4bf]">{service.basePrice}</span>
                                    <span className="text-xs text-gray-500">{service.duration}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Selected Service Details */}
                    <div className="mt-12 card p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">{services[selectedService].title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    {services[selectedService].description}
                                </p>
                                <div className="space-y-4">
                                    <h4 className="font-semibold">기본 포함 사항:</h4>
                                    <ul className="space-y-2">
                                        {services[selectedService].includes.map((item, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <span className="text-[#22c55e]">✓</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">추가 옵션 선택:</h4>
                                <div className="space-y-3">
                                    {services[selectedService].addons.map((addon, i) => (
                                        <label key={i} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-[#2563eb]"
                                                    checked={selectedFeatures.includes(addon.name)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedFeatures([...selectedFeatures, addon.name]);
                                                        } else {
                                                            setSelectedFeatures(selectedFeatures.filter(f => f !== addon.name));
                                                        }
                                                    }}
                                                />
                                                <span>{addon.name}</span>
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                +{addon.price}만원 / +{addon.time}일
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">예상 추가 비용:</span>
                                        <span className="text-xl font-bold text-[#2563eb] dark:text-[#2dd4bf]">
                                            +{calculatePrice().price}만원
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="font-semibold">예상 추가 기간:</span>
                                        <span className="text-xl font-bold text-[#2563eb] dark:text-[#2dd4bf]">
                                            +{calculatePrice().time}일
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Packages */}
            <section className="section-padding bg-gray-50 dark:bg-gray-950">
                <div className="container">
                    <div className="text-center mb-12">
                        <span className="badge">Packages</span>
                        <h2 className="mt-4 mb-4">서비스 패키지</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            프로젝트 규모와 요구사항에 맞는 패키지를 선택하세요
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {packages.map((pkg, index) => (
                            <div key={index} className={`card p-8 ${pkg.type === 'standard' ? 'ring-2 ring-[#2563eb] dark:ring-[#2dd4bf]' : ''}`}>
                                {pkg.type === 'standard' && (
                                    <div className="badge mb-4 bg-[#2563eb] text-white dark:bg-[#2dd4bf] dark:text-black">추천</div>
                                )}
                                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">{pkg.description}</p>
                                <ul className="space-y-3">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-[#22c55e] mt-0.5">✓</span>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Prototype Types */}
                    <div className="mt-16 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-center mb-8">프로토타입 종류</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {prototypeTypes.map((type, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                                    <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center text-white font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{type.name}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Maintenance Info */}
                    <div className="mt-16 text-center card p-8 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4">유지보수 서비스</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            고객님의 비즈니스 상황에 맞춰 유연한 유지보수 계약을 제공합니다
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <h4 className="font-semibold mb-2">월 단위 계약</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">정기적인 업데이트와 지원</p>
                            </div>
                            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <h4 className="font-semibold mb-2">시간제 계약</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">필요할 때만 사용하는 방식</p>
                            </div>
                            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <h4 className="font-semibold mb-2">프로젝트 단위</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">특정 업데이트나 기능 추가</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cost Visualization */}
            <section className="section-padding">
                <div className="container">
                    <div className="text-center mb-12">
                        <span className="badge">Pricing Guide</span>
                        <h2 className="mt-4 mb-4">프로젝트 비용 가이드</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            프로젝트 규모와 기능에 따른 예상 비용을 확인하세요
                        </p>
                    </div>

                    {/* Web Project Cost Graph */}
                    <div className="max-w-4xl mx-auto">
                        <div className="card p-8">
                            <h3 className="text-xl font-bold mb-6">웹사이트 개발 비용</h3>
                            <div className="space-y-6">
                                {[
                                    { pages: '1-5 페이지', base: 200, features: { dark: 50, i18n: 100, dynamic: 150 } },
                                    { pages: '6-10 페이지', base: 350, features: { dark: 70, i18n: 150, dynamic: 200 } },
                                    { pages: '11-20 페이지', base: 500, features: { dark: 100, i18n: 200, dynamic: 300 } },
                                    { pages: '20+ 페이지', base: 800, features: { dark: 150, i18n: 300, dynamic: 500 } }
                                ].map((item, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium">{item.pages}</span>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{item.base}만원~</span>
                                        </div>
                                        <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="absolute left-0 top-0 h-full bg-[#2563eb] dark:bg-[#2dd4bf]"
                                                style={{ width: `${(item.base / 800) * 100}%` }}
                                            />
                                        </div>
                                        <div className="mt-2 flex gap-4 text-xs">
                                            <span>+다크모드: {item.features.dark}만원</span>
                                            <span>+다국어: {item.features.i18n}만원</span>
                                            <span>+동적기능: {item.features.dynamic}만원</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="section-padding bg-gray-50 dark:bg-gray-950">
                <div className="container">
                    <div className="text-center mb-12">
                        <span className="badge">Timeline</span>
                        <h2 className="mt-4 mb-4">평균 개발 기간</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            프로젝트 유형별 예상 개발 기간입니다
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="card p-6">
                            <h3 className="text-xl font-bold mb-4">일반 프로젝트</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span>랜딩 페이지</span>
                                    <span className="font-semibold">2-3주</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>기업 웹사이트</span>
                                    <span className="font-semibold">4-6주</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>이커머스 플랫폼</span>
                                    <span className="font-semibold">8-12주</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>모바일 앱</span>
                                    <span className="font-semibold">8-16주</span>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6 border-2 border-[#2563eb] dark:border-[#2dd4bf]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold">급행 프로젝트</h3>
                                <span className="badge bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                                    +50% 추가 비용
                                </span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span>랜딩 페이지</span>
                                    <span className="font-semibold text-red-600 dark:text-red-400">1주</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>기업 웹사이트</span>
                                    <span className="font-semibold text-red-600 dark:text-red-400">2-3주</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>이커머스 플랫폼</span>
                                    <span className="font-semibold text-red-600 dark:text-red-400">4-6주</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>모바일 앱</span>
                                    <span className="font-semibold text-red-600 dark:text-red-400">6-8주</span>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                * 급행 프로젝트는 전담 팀을 배치하여 빠르게 진행합니다
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600 dark:text-gray-300">
                            정확한 견적과 일정은 상담을 통해 확인하실 수 있습니다
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding">
                <div className="container">
                    <div className="gradient-bg rounded-3xl p-12 md:p-16 text-center text-white">
                        <h2 className="text-white mb-6">프로젝트를 시작할 준비가 되셨나요?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            무료 상담을 통해 귀하의 비즈니스에 맞는 맞춤형 솔루션을 알아보세요
                        </p>
                        <a href="/contact" className="btn bg-white text-[#2563eb] hover:bg-gray-100">
                            무료 상담 예약하기
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServicesPage;