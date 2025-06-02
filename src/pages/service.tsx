import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout';

const ServicesPage: NextPage = () => {
    const [expandedServices, setExpandedServices] = useState<{ [key: number]: boolean }>({});
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const services = [
        {
            icon: '🖥️',
            title: '웹 개발',
            description: '효과적인 온라인 존재감을 위한 맞춤형 웹 솔루션',
            features: [
                '반응형 웹사이트 개발',
                '웹 애플리케이션 개발',
                'CMS & 콘텐츠 관리',
                'e-커머스 솔루션',
            ],
            technologies: ['React', 'Next.js', 'Vue', 'Node.js', 'PHP', 'MySQL', 'MongoDB']
        },
        {
            icon: '📱',
            title: '앱 개발',
            description: '사용자 친화적인 모바일 앱으로 고객과 연결하세요',
            features: [
                'iOS 앱 개발',
                'Android 앱 개발',
                '크로스 플랫폼 앱',
                '하이브리드 앱'
            ],
            technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase']
        },
        {
            icon: '🎨',
            title: 'UI/UX 디자인',
            description: '매력적이면서도 사용하기 쉬운 디지털 경험 제공',
            features: [
                '사용자 경험(UX) 디자인',
                '사용자 인터페이스(UI) 디자인',
                '반응형 디자인',
                '프로토타이핑 및 와이어프레이밍'
            ],
            technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle']
        },
        {
            icon: '⚙️',
            title: '기술 컨설팅',
            description: '전략적 기술 방향을 통한 비즈니스 성장 지원',
            features: [
                '기술 전략 개발',
                '디지털 트랜스포메이션',
                '기술 스택 평가 및 추천',
                '시스템 아키텍처 설계'
            ],
            technologies: ['클라우드', '마이크로서비스', 'DevOps', '데이터 분석', '시스템 통합']
        }
    ];

    const processSteps = [
        {
            number: '01',
            title: '상담 및 기획',
            description: '비즈니스 목표와 요구사항을 분석하여 최적의 솔루션을 계획합니다.'
        },
        {
            number: '02',
            title: '디자인 및 프로토타입',
            description: '시각적 아이덴티티를 구축하고 사용자 경험을 설계합니다.'
        },
        {
            number: '03',
            title: '개발 및 구현',
            description: '최신 기술을 활용하여 안정적이고 확장 가능한 솔루션을 구축합니다.'
        },
        {
            number: '04',
            title: '테스트 및 최적화',
            description: '철저한 테스트를 통해 품질을 보장하고 성능을 최적화합니다.'
        },
        {
            number: '05',
            title: '런칭 및 지원',
            description: '성공적인 출시 후 지속적인 지원과 유지보수를 제공합니다.'
        }
    ];

    const faqs = [
        {
            question: '프로젝트 기간은 얼마나 걸리나요?',
            answer: '프로젝트 규모와 복잡성에 따라 다르지만, 일반적인 웹사이트는 4-8주, 모바일 앱은 8-12주, 복잡한 웹 애플리케이션은 12-16주 정도 소요됩니다.'
        },
        {
            question: '예산 범위는 어떻게 되나요?',
            answer: '각 프로젝트는 요구사항과 기능에 따라 비용이 달라집니다. 소규모 웹사이트부터 대규모 엔터프라이즈 솔루션까지 다양한 예산에 맞춘 서비스를 제공합니다.'
        },
        {
            question: '개발 후 지원은 어떻게 이루어지나요?',
            answer: '모든 프로젝트는 1개월간의 무료 유지보수 기간이 포함되어 있으며, 이후에는 월별 또는 연간 유지보수 계약을 통해 지원해 드립니다.'
        },
        {
            question: '사용하는 기술 스택은 무엇인가요?',
            answer: '최신 기술 트렌드를 반영한 다양한 기술 스택을 활용합니다. 프론트엔드는 React, Vue, Angular, 백엔드는 Node.js, Python, PHP 등을 프로젝트에 맞게 사용합니다.'
        },
        {
            question: '개발 과정에 고객이 참여할 수 있나요?',
            answer: '네, 저희는 애자일 방법론을 따르며 고객과의 지속적인 소통을 중요시합니다. 2주 단위의 스프린트로 개발이 진행되며, 각 단계마다 진행 상황을 공유하고 피드백을 반영합니다.'
        }
    ];

    const toggleServiceExpand = (index: number) => {
        setExpandedServices(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <Layout title="서비스 - NQ Solution">
            {/* Hero Section */}
            <section className="py-20">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="badge bg-blue-100 text-blue-800">서비스</span>
                        <h1 className="mt-4 mb-4">맞춤형 솔루션</h1>
                        <p className="text-xl text-gray-600">
                            비즈니스 성장을 위한 디지털 서비스
                        </p>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="section-padding">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {services.map((service, index) => (
                            <div key={index} className="card">
                                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                                    <div className="flex items-start gap-4">
                                        <span className="text-5xl">{service.icon}</span>
                                        <div>
                                            <h3 className="text-2xl mb-2">{service.title}</h3>
                                            <p className="text-gray-600">{service.description}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <ul className="space-y-2 mb-4">
                                        {service.features.slice(0, 2).map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <span className="text-green-500">✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {expandedServices[index] && (
                                        <div className="space-y-4 mt-4 animate-slide-down">
                                            <ul className="space-y-2">
                                                {service.features.slice(2).map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        <span className="text-green-500">✓</span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>

                                            <div>
                                                <h4 className="font-semibold mb-2">사용 기술</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {service.technologies.map((tech, i) => (
                                                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="px-6 pb-6">
                                    <button
                                        className="w-full py-2 text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                                        onClick={() => toggleServiceExpand(index)}
                                    >
                                        {expandedServices[index] ? '접기' : '더보기'}
                                        <span className={`transform transition-transform ${expandedServices[index] ? 'rotate-180' : ''}`}>
                                            ▼
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="section-padding bg-gray-50">
                <div className="container">
                    <div className="text-center mb-12">
                        <span className="badge bg-gray-200 text-gray-800">개발 프로세스</span>
                        <h2 className="mt-4 mb-4">협업 프로세스</h2>
                        <p className="text-xl text-gray-600">
                            투명하고 효율적인 프로세스로 아이디어를 현실로 만들어 드립니다
                        </p>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        <div className="hidden md:flex justify-between items-center">
                            {processSteps.map((step, index) => (
                                <div key={index} className="relative flex-1 text-center">
                                    <div className="w-12 h-12 gradient-bg text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                                        {step.number}
                                    </div>
                                    <h4 className="font-semibold mb-2">{step.title}</h4>
                                    <p className="text-sm text-gray-600 max-w-[150px] mx-auto">{step.description}</p>
                                    {index < processSteps.length - 1 && (
                                        <div className="absolute top-6 left-[60%] w-full h-0.5 bg-gray-300">
                                            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400">→</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="md:hidden space-y-6">
                            {processSteps.map((step, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="w-10 h-10 gradient-bg text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {step.number}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">{step.title}</h4>
                                        <p className="text-sm text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-padding">
                <div className="container">
                    <div className="text-center mb-12">
                        <span className="badge bg-gray-200 text-gray-800">FAQ</span>
                        <h2 className="mt-4">자주 묻는 질문</h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="card">
                                <button
                                    className="w-full p-6 text-left flex items-center justify-between"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span className="font-medium">{faq.question}</span>
                                    <span className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-6 text-gray-600 animate-slide-down">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
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
                        <a href="/contact" className="btn bg-white text-blue-600 hover:bg-gray-100">
                            무료 상담 예약하기
                        </a>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ServicesPage;