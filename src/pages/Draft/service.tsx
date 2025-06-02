import React, { useState, useEffect } from 'react'

// Type definitions
type ServiceKey = 'outsourcing' | 'internal' | 'consulting'
type VisibilityState = Record<string, boolean>
type ExpandedState = Record<string, boolean>

export default function Service() {
    const [activeTab, setActiveTab] = useState<ServiceKey>('outsourcing')
    const [isVisible, setIsVisible] = useState<VisibilityState>({})
    const [expandedDetails, setExpandedDetails] = useState<ExpandedState>({})

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
                    }
                })
            },
            { threshold: 0.1 }
        )

        const elements = document.querySelectorAll('[data-animate]')
        elements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    const services = {
        outsourcing: {
            title: "맞춤형 외주 개발",
            subtitle: "당신의 비즈니스에 완벽히 맞춘 솔루션",
            description: "구체적인 계획을 완벽한 현실로 만들어드립니다",
            icon: "🔧",
            details: [
                {
                    title: "🌐 웹 개발",
                    items: [
                        "반응형 웹사이트 - 모든 디바이스에서 완벽한 경험",
                        "E-commerce 플랫폼 - 결제부터 배송까지 올인원",
                        "웹 애플리케이션 - 복잡한 비즈니스 로직도 간단하게",
                        "PWA 개발 - 앱처럼 작동하는 웹",
                        "SEO 최적화 - 검색 상위노출 보장"
                    ],
                    highlight: "✨ 무료 로고 디자인 + 6개월 유지보수 포함"
                },
                {
                    title: "📱 모바일 앱 개발",
                    items: [
                        "iOS/Android 네이티브 앱 - 최고의 성능과 사용자 경험",
                        "React Native 크로스플랫폼 - 한 번에 두 플랫폼 개발",
                        "Flutter 앱 개발 - 아름다운 UI와 빠른 개발",
                        "앱스토어/플레이스토어 등록 대행",
                        "푸시알림, 결제, SNS 연동 등 모든 기능 구현"
                    ],
                    highlight: "🎁 첫 달 서버 비용 무료 + ASO 최적화 서비스"
                },
                {
                    title: "⚙️ 백엔드 & 시스템",
                    items: [
                        "API 서버 개발 - RESTful, GraphQL 모두 가능",
                        "데이터베이스 설계 - 확장 가능한 구조 설계",
                        "클라우드 인프라 구축 - AWS, GCP 전문가",
                        "마이크로서비스 아키텍처 - 대규모 서비스도 안정적으로",
                        "실시간 서비스 - 채팅, 스트리밍, 협업 도구"
                    ],
                    highlight: "🔒 보안 점검 서비스 + 성능 최적화 포함"
                }
            ]
        },
        internal: {
            title: "자체 서비스 개발",
            subtitle: "아이디어에서 유니콘까지, 스타트업의 여정을 함께",
            description: "시장을 선도하는 혁신적인 서비스를 만들어갑니다",
            icon: "🚀",
            details: [
                {
                    title: "💡 아이디어 검증",
                    items: [
                        "시장 조사 및 경쟁사 분석",
                        "MVP 개발로 빠른 시장 검증",
                        "사용자 인터뷰 및 피드백 수집",
                        "비즈니스 모델 수립",
                        "투자 유치를 위한 IR 자료 제작"
                    ],
                    highlight: "💰 정부 지원사업 연계 컨설팅 무료"
                },
                {
                    title: "🏗️ 서비스 구축",
                    items: [
                        "확장 가능한 아키텍처 설계",
                        "사용자 중심의 UX/UI 디자인",
                        "애자일 방법론으로 빠른 개발",
                        "A/B 테스트로 지속적 개선",
                        "데이터 분석 시스템 구축"
                    ],
                    highlight: "📊 Google Analytics 설정 + 대시보드 구축"
                },
                {
                    title: "📈 성장 지원",
                    items: [
                        "그로스 해킹 전략 수립",
                        "마케팅 자동화 시스템 구축",
                        "사용자 리텐션 향상 전략",
                        "스케일업을 위한 인프라 확장",
                        "글로벌 진출 지원"
                    ],
                    highlight: "🌍 다국어 지원 + 해외 결제 시스템 연동"
                }
            ]
        },
        consulting: {
            title: "기술 컨설팅",
            subtitle: "디지털 전환의 나침반이 되어드립니다",
            description: "현재를 진단하고 미래를 설계합니다",
            icon: "💡",
            details: [
                {
                    title: "🔍 현황 진단",
                    items: [
                        "기존 시스템 아키텍처 분석",
                        "보안 취약점 점검",
                        "성능 병목 지점 파악",
                        "기술 부채 측정",
                        "개발 프로세스 평가"
                    ],
                    highlight: "📋 100페이지 분량의 상세 진단 보고서 제공"
                },
                {
                    title: "🗺️ 로드맵 수립",
                    items: [
                        "단기/중기/장기 기술 전략",
                        "기술 스택 현대화 계획",
                        "팀 역량 강화 방안",
                        "예산 최적화 전략",
                        "리스크 관리 방안"
                    ],
                    highlight: "🎯 분기별 마일스톤 + KPI 설정"
                },
                {
                    title: "🚀 실행 지원",
                    items: [
                        "파일럿 프로젝트 진행",
                        "내부 개발팀 교육",
                        "애자일 전환 지원",
                        "DevOps 문화 정착",
                        "지속적인 모니터링 체계 구축"
                    ],
                    highlight: "👨‍🏫 월 1회 기술 세미나 + 24/7 긴급 지원"
                }
            ]
        }
    }

    const techStack = {
        frontend: {
            title: "Frontend",
            icon: "🎨",
            items: ["React 18", "Next.js 14", "TypeScript", "Tailwind CSS", "React Native", "Flutter"]
        },
        backend: {
            title: "Backend",
            icon: "⚙️",
            items: ["Node.js", "Python", "Java", "PostgreSQL", "MongoDB", "Redis"]
        },
        devops: {
            title: "DevOps & Cloud",
            icon: "☁️",
            items: ["AWS", "Google Cloud", "Docker", "Kubernetes", "GitHub Actions", "Monitoring"]
        }
    }

    const testimonials = [
        {
            company: "온라인 쇼핑몰 A사",
            text: "작은 홈페이지에서 시작해 월 매출 3억원의 온라인 쇼핑몰로 성장했습니다.",
            result: "매출 500% 증가"
        },
        {
            company: "스타트업 B사",
            text: "MVP부터 시리즈A까지 함께했습니다. 진정한 기술 파트너를 만났습니다.",
            result: "30억 투자 유치"
        },
        {
            company: "제조기업 C사",
            text: "오프라인 중심에서 온라인이 매출의 70%를 차지하는 기업으로 변화했습니다.",
            result: "신규 고객 300% 증가"
        }
    ]

    return (
        <div className="bg-primaryBg text-primaryText transition-colors duration-300">
            {/* Hero Section */}
            <section
                id="hero"
                data-animate
                className={`min-h-screen flex flex-col items-center justify-center py-20 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            당신의 아이디어를 현실로
                        </span>
                        <br />
                        완벽한 기술 파트너
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                        아이디어부터 런칭까지, 성공적인 여정을 함께하세요
                    </p>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            <div className="text-3xl mb-2">💡</div>
                            <p className="font-semibold text-blue-900 dark:text-blue-100">아이디어만 있으면 됩니다</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            <div className="text-3xl mb-2">🚀</div>
                            <p className="font-semibold text-green-900 dark:text-green-100">나머지는 NQ가 책임집니다</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            <div className="text-3xl mb-2">✨</div>
                            <p className="font-semibold text-purple-900 dark:text-purple-100">성공까지 함께합니다</p>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">98%</div>
                            <div className="text-gray-600 dark:text-gray-400">고객 만족도</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 dark:text-green-400">40%</div>
                            <div className="text-gray-600 dark:text-gray-400">개발 기간 단축</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">95%</div>
                            <div className="text-gray-600 dark:text-gray-400">프로젝트 성공률</div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                            <span className="mr-2">📋</span> 서비스 자세히 보기
                        </button>
                        <button className="px-8 py-4 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all">
                            <span className="mr-2">💬</span> 무료 상담 신청
                        </button>
                    </div>
                </div>
            </section>

            {/* Service Overview */}
            <section
                id="overview"
                data-animate
                className={`py-20 transition-all duration-1000 ${isVisible.overview ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            3가지 핵심 서비스로 모든 니즈를 충족합니다
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            어떤 단계에 있든, NQ Solution이 최적의 솔루션을 제공합니다
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(Object.entries(services) as [ServiceKey, typeof services[ServiceKey]][]).map(([key, service], index) => (
                            <div
                                key={key}
                                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="p-8">
                                    <div className="text-5xl mb-4">{service.icon}</div>
                                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {service.subtitle}
                                    </p>
                                    <ul className="space-y-2 mb-6">
                                        {service.details[0].items.slice(0, 3).map((item, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <span className="text-green-500 mr-2">✓</span>
                                                <span className="text-sm text-gray-700 dark:text-gray-300">{item.split(' - ')[0]}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => setActiveTab(key)}
                                        className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                                    >
                                        자세히 보기 →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl text-center">
                        <p className="text-lg">
                            <span className="text-2xl mr-2">🤔</span>
                            어떤 서비스가 적합한지 모르겠다면?
                            <span className="font-bold text-blue-600 dark:text-blue-400"> 무료 상담</span>을 통해 최적의 방향을 찾아드립니다!
                        </p>
                    </div>
                </div>
            </section>

            {/* Detailed Service Tabs */}
            <section
                id="details"
                data-animate
                className={`py-20 bg-gray-50 dark:bg-gray-800/30 transition-all duration-1000 ${isVisible.details ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        상세 서비스 안내
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {(Object.entries(services) as [ServiceKey, typeof services[ServiceKey]][]).map(([key, service]) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`px-6 py-3 rounded-full transition-all duration-300 ${activeTab === key
                                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                        : 'bg-white dark:bg-gray-800 hover:shadow-md border border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                <span className="mr-2">{service.icon}</span>
                                {service.title}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-5xl mx-auto">
                        {activeTab && (
                            <div className="space-y-6">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                        {services[activeTab].subtitle}
                                    </h3>
                                    <p className="text-lg text-gray-600 dark:text-gray-400">
                                        {services[activeTab].description}
                                    </p>
                                </div>

                                {services[activeTab].details.map((detail: any, index: number) => (
                                    <div
                                        key={index}
                                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
                                    >
                                        <button
                                            onClick={() => setExpandedDetails({
                                                ...expandedDetails,
                                                [`${activeTab}-${index}`]: !expandedDetails[`${activeTab}-${index}`]
                                            })}
                                            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                        >
                                            <h4 className="text-xl font-semibold flex items-center text-gray-900 dark:text-white">
                                                {detail.title}
                                            </h4>
                                            <span className={`transform transition-transform text-gray-600 dark:text-gray-400 ${expandedDetails[`${activeTab}-${index}`] ? 'rotate-180' : ''
                                                }`}>
                                                ▼
                                            </span>
                                        </button>

                                        <div className={`overflow-hidden transition-all duration-500 ${expandedDetails[`${activeTab}-${index}`] ? 'max-h-96' : 'max-h-0'
                                            }`}>
                                            <div className="p-6 pt-0">
                                                <ul className="space-y-3">
                                                    {detail.items.map((item: string, i: number) => (
                                                        <li key={i} className="flex items-start">
                                                            <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">→</span>
                                                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                {detail.highlight && (
                                                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                                        <p className="font-semibold text-blue-600 dark:text-blue-400">
                                                            {detail.highlight}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section
                id="tech-stack"
                data-animate
                className={`py-20 transition-all duration-1000 ${isVisible['tech-stack'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        최신 기술로 미래를 준비합니다
                    </h2>
                    <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12">
                        검증된 기술과 혁신적인 도구로 최고의 결과를 만듭니다
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {Object.entries(techStack).map(([key, stack]) => (
                            <div key={key} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700">
                                <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                                    <span className="mr-3 text-3xl">{stack.icon}</span>
                                    {stack.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {stack.items.map((item: string) => (
                                        <span
                                            key={item}
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section
                id="testimonials"
                data-animate
                className={`py-20 bg-gray-50 dark:bg-gray-800/30 transition-all duration-1000 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        고객들의 성공 스토리
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                            >
                                <div className="mb-4">
                                    <div className="text-5xl text-blue-600 dark:text-blue-400 mb-4">"</div>
                                    <p className="text-gray-700 dark:text-gray-300 italic">
                                        {testimonial.text}
                                    </p>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.company}</p>
                                    <p className="text-sm text-blue-600 dark:text-blue-400 font-bold">
                                        {testimonial.result}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section
                id="final-cta"
                data-animate
                className={`py-20 mb-20 transition-all duration-1000 ${isVisible['final-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-blue-600 dark:bg-blue-700 rounded-3xl text-white text-center p-12">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                완벽한 서비스가 여기서 시작됩니다
                            </h2>
                            <p className="text-xl md:text-2xl mb-8 opacity-90">
                                더 이상 미루지 마세요. 지금 바로 첫 걸음을 시작하세요
                            </p>

                            <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
                                <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:shadow-xl transition-all transform hover:scale-105 font-semibold">
                                    <span className="mr-2">🚀</span> 지금 바로 시작하기
                                </button>
                                <button className="px-8 py-4 bg-transparent border-2 border-white rounded-lg hover:bg-white/10 transition-all font-semibold">
                                    <span className="mr-2">💬</span> 카카오톡 상담
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="text-2xl mb-2">📞</div>
                                    <p className="font-semibold">전화 상담</p>
                                    <p className="text-sm opacity-80">평일 09:00-18:00</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="text-2xl mb-2">💬</div>
                                    <p className="font-semibold">실시간 채팅</p>
                                    <p className="text-sm opacity-80">24시간 응답</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="text-2xl mb-2">📧</div>
                                    <p className="font-semibold">이메일 문의</p>
                                    <p className="text-sm opacity-80">24시간 내 답변</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating Action Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <button className="group relative bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110">
                    <span className="absolute -top-12 right-0 bg-gray-800 dark:bg-gray-700 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        무료 상담 신청
                    </span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}