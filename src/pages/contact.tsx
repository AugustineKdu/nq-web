import React, { useState, useEffect } from 'react'

export default function Contact() {
    const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
    const [terminalInput, setTerminalInput] = useState('')
    const [terminalHistory, setTerminalHistory] = useState<string[]>(['user@nqsolution:~$ start_new_project'])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        message: '',
        timeline: ''
    })

    // Intersection Observer for animations
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

    // Terminal typing effect
    const handleTerminalCommand = (command: string) => {
        setTerminalHistory([...terminalHistory, `> ${command}`])
        // Process commands
        if (command.toLowerCase().includes('help')) {
            setTerminalHistory(prev => [...prev, 'Available commands: name, email, phone, project, submit'])
        }
    }

    const contactChannels = [
        {
            icon: '📧',
            title: '이메일 상담',
            subtitle: '자세하고 체계적인 상담',
            features: ['24시간 이내 상세 답변', '포트폴리오 및 견적서 제공', '모든 내용 기록 보존'],
            action: 'contact@nqsolution.com',
            best: '상세한 프로젝트 설명이 필요할 때'
        },
        {
            icon: '📞',
            title: '전화 상담',
            subtitle: '즉시 해결, 빠른 소통',
            features: ['평일 09:00-18:00', '주말/공휴일 긴급 상담', '실시간 문제 해결'],
            action: '010-XXXX-XXXX',
            best: '급한 문의나 즉시 답변이 필요할 때'
        },
        {
            icon: '💬',
            title: '카카오톡 채팅',
            subtitle: '간편하고 친근한 대화',
            features: ['실시간 응답 (평균 5분)', '이미지/파일 공유 가능', '편안한 대화 형식'],
            action: '@nqsolution',
            best: '간단한 문의나 빠른 확인이 필요할 때'
        },
        {
            icon: '🏢',
            title: '오프라인 미팅',
            subtitle: '직접 만나는 진솔한 대화',
            features: ['강남 사무실 또는 방문 상담', '상세한 프레젠테이션', '즉석 아이디어 스케치'],
            action: '미팅 예약하기',
            best: '중요한 프로젝트나 장기 협업 논의'
        }
    ]

    const checklistItems = [
        {
            icon: '🎯',
            title: '프로젝트 목적 파악',
            question: '왜 이 프로젝트가 필요한가요?',
            tips: ['해결하려는 핵심 문제', '기대하는 비즈니스 성과', '성공의 측정 기준']
        },
        {
            icon: '👥',
            title: '타겟 사용자 정의',
            question: '누가 사용할 서비스인가요?',
            tips: ['주 사용자 연령대와 특성', '기술 친숙도 수준', '주요 사용 디바이스']
        },
        {
            icon: '🔍',
            title: '참고 레퍼런스',
            question: '어떤 스타일을 원하시나요?',
            tips: ['좋아하는 사이트/앱 3-5개', '선호하는 색상과 분위기', '피하고 싶은 스타일']
        },
        {
            icon: '⚙️',
            title: '핵심 기능 정리',
            question: '꼭 필요한 기능은 무엇인가요?',
            tips: ['MVP 필수 기능', '2차 개발 기능', '차별화 포인트']
        },
        {
            icon: '💰',
            title: '예산과 일정',
            question: '언제까지, 얼마의 예산으로?',
            tips: ['전체 예산 범위', '희망 런칭 날짜', '단계별 개발 여부']
        }
    ]

    const faqs = [
        {
            q: '견적은 어떻게 받을 수 있나요?',
            a: '무료 상담 후 1-2일 내에 상세한 맞춤 견적서를 제공합니다. 정확한 견적을 위해 위의 체크리스트를 미리 준비해주시면 더욱 빠른 진행이 가능합니다.'
        },
        {
            q: '개발 기간은 얼마나 걸리나요?',
            a: '프로젝트 규모에 따라 2주~3개월이며, 일반적인 웹사이트는 4-6주, 복잡한 플랫폼은 8-12주 정도 소요됩니다. 애자일 방식으로 2주마다 결과물을 확인하실 수 있습니다.'
        },
        {
            q: '개발 중 수정이 가능한가요?',
            a: '물론입니다! 기획 단계에서는 무제한 수정, 디자인 단계 3회, 개발 단계 2회 무료 수정을 제공합니다. 추가 수정도 합리적인 비용으로 가능합니다.'
        },
        {
            q: '유지보수는 어떻게 되나요?',
            a: '런칭 후 1개월간 무료 유지보수를 제공하며, 이후 월 단위 또는 건별 유지보수 계약이 가능합니다. 긴급 이슈는 24시간 내 대응합니다.'
        },
        {
            q: '소스코드는 제공되나요?',
            a: '네, 프로젝트 완료 후 전체 소스코드와 문서를 제공합니다. 향후 다른 개발자가 유지보수할 수 있도록 깔끔한 코드와 상세한 문서를 작성합니다.'
        }
    ]

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <section
                    id="hero"
                    data-animate
                    className={`min-h-screen flex flex-col items-center justify-center py-20 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                당신의 아이디어를 현실로
                            </span>
                            <br />
                            만들 준비가 되었습니다
                        </h1>
                        <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                            새로운 가능성의 시작, 지금 바로 연락하세요
                        </p>

                        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                <div className="text-3xl mb-2">💬</div>
                                <p className="font-semibold">24시간 이내 답변</p>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                <div className="text-3xl mb-2">☕</div>
                                <p className="font-semibold">무료 상담 제공</p>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                <div className="text-3xl mb-2">🚀</div>
                                <p className="font-semibold">빠른 프로토타입</p>
                            </div>
                        </div>

                        <p className="mt-10 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            작은 아이디어든 큰 프로젝트든,<br />
                            모든 것은 첫 번째 대화에서 시작됩니다.<br />
                            <span className="font-semibold text-blue-600 dark:text-blue-400">지금 바로 연락하세요!</span>
                        </p>

                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <a
                                href="tel:010-XXXX-XXXX"
                                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl transition-all transform hover:scale-105"
                            >
                                <span className="mr-2">📞</span>
                                지금 전화하기
                                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </a>
                            <button className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
                                <span className="mr-2">💬</span>
                                채팅 상담 시작
                            </button>
                        </div>
                    </div>
                </section>

                {/* Digital Business Card */}
                <section
                    id="business-card"
                    data-animate
                    className={`py-20 transition-all duration-1000 ${isVisible['business-card'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div className="max-w-md mx-auto">
                        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-2xl overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
                            </div>

                            <div className="relative z-10 text-white text-center space-y-4">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        NQ Solution
                                    </h3>
                                    <p className="text-sm opacity-80 mt-1">Digital Business Card</p>
                                </div>

                                <div className="space-y-3">
                                    <p className="flex items-center justify-center">
                                        <span className="mr-3 text-xl">💡</span>
                                        "Next, Query our Solution"
                                    </p>
                                    <p className="flex items-center justify-center">
                                        <span className="mr-3 text-xl">👨‍💻</span>
                                        대표: Augustine Kim
                                    </p>
                                    <p className="flex items-center justify-center">
                                        <span className="mr-3 text-xl">📧</span>
                                        contact@nqsolution.com
                                    </p>
                                    <p className="flex items-center justify-center">
                                        <span className="mr-3 text-xl">📱</span>
                                        010-XXXX-XXXX
                                    </p>
                                    <p className="flex items-center justify-center">
                                        <span className="mr-3 text-xl">🌐</span>
                                        www.nqsolution.com
                                    </p>
                                    <p className="flex items-center justify-center">
                                        <span className="mr-3 text-xl">📍</span>
                                        서울특별시 강남구
                                    </p>
                                </div>

                                <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                                    <div className="w-32 h-32 mx-auto bg-white rounded-lg flex items-center justify-center">
                                        <span className="text-gray-900 text-sm">QR Code</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-center gap-3">
                                    <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all">
                                        💾 저장
                                    </button>
                                    <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all">
                                        📤 공유
                                    </button>
                                    <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all">
                                        📄 vCard
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Terminal Style Contact Form */}
                <section
                    id="terminal-form"
                    data-animate
                    className={`py-20 transition-all duration-1000 ${isVisible['terminal-form'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-gray-900 dark:bg-black rounded-2xl shadow-2xl overflow-hidden">
                            {/* Terminal Header */}
                            <div className="bg-gray-800 dark:bg-gray-900 px-4 py-2 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <span className="text-gray-400 text-sm font-mono">contact@nqsolution</span>
                            </div>

                            {/* Terminal Body */}
                            <div className="p-6 font-mono text-green-400">
                                <div className="mb-4 space-y-1">
                                    {terminalHistory.map((line, idx) => (
                                        <p key={idx}>{line}</p>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <p className="text-gray-400">> Enter your name:</p>
                                        <div className="flex items-center">
                                            <span className="mr-2">$</span>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="flex-1 bg-transparent border-b border-green-400 outline-none text-white"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-gray-400">> Enter your email:</p>
                                        <div className="flex items-center">
                                            <span className="mr-2">$</span>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="flex-1 bg-transparent border-b border-green-400 outline-none text-white"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-gray-400">> Select project type:</p>
                                        <div className="space-y-1 ml-4">
                                            {['Web Development', 'Mobile App', 'Full Platform', 'Technical Consulting'].map((type) => (
                                                <div key={type} className="flex items-center cursor-pointer hover:text-green-300">
                                                    <input
                                                        type="radio"
                                                        name="projectType"
                                                        value={type}
                                                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                                        className="mr-2"
                                                    />
                                                    <span>{type}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-gray-400">> Project description:</p>
                                        <div className="flex items-start">
                                            <span className="mr-2 mt-1">$</span>
                                            <textarea
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="flex-1 bg-transparent border border-green-400 rounded p-2 outline-none text-white min-h-[100px]"
                                                placeholder="Tell us about your project..."
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 mt-6">
                                        <button
                                            onClick={() => console.log('Submit:', formData)}
                                            className="px-6 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-colors"
                                        >
                                            [Submit]
                                        </button>
                                        <button
                                            onClick={() => setFormData({ name: '', email: '', phone: '', projectType: '', budget: '', message: '', timeline: '' })}
                                            className="px-6 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-black transition-all"
                                        >
                                            [Clear]
                                        </button>
                                    </div>
                                </div>

                                <p className="mt-4 text-gray-400 text-sm">Type 'help' for available commands_</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Channels */}
                <section
                    id="channels"
                    data-animate
                    className={`py-20 transition-all duration-1000 ${isVisible.channels ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            가장 편한 방법으로 연락하세요
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            4가지 소통 채널로 언제든 접근 가능합니다
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {contactChannels.map((channel, index) => (
                            <div
                                key={channel.title}
                                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="p-8">
                                    <div className="text-5xl mb-4">{channel.icon}</div>
                                    <h3 className="text-2xl font-bold mb-2">{channel.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 italic mb-4">{channel.subtitle}</p>

                                    <ul className="space-y-2 mb-6">
                                        {channel.features.map((feature) => (
                                            <li key={feature} className="flex items-start">
                                                <span className="text-green-500 mr-2 mt-1">✓</span>
                                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                            💡 Best for: {channel.best}
                                        </p>
                                    </div>

                                    <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105">
                                        {channel.action}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl text-center max-w-4xl mx-auto">
                        <p className="text-lg">
                            <span className="font-semibold">상황별 추천 채널</span><br />
                            🤔 아이디어 단계 → 💬 채팅상담 |
                            📋 구체적 계획 → 📧 이메일상담 |
                            ⚡ 급한 문의 → 📞 전화상담 |
                            🎯 중요 프로젝트 → 🏢 오프라인 미팅
                        </p>
                    </div>
                </section>

                {/* Inquiry Guide */}
                <section
                    id="inquiry-guide"
                    data-animate
                    className={`py-20 bg-gray-100/50 dark:bg-gray-800/30 rounded-3xl transition-all duration-1000 ${isVisible['inquiry-guide'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            더 나은 상담을 위한 가이드
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            미리 준비하시면 더 정확하고 빠른 상담이 가능합니다
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Checklist */}
                        <div className="space-y-4 mb-12">
                            {checklistItems.map((item, index) => (
                                <details
                                    key={item.title}
                                    className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all"
                                >
                                    <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-xl">
                                        <div className="flex items-center">
                                            <span className="text-3xl mr-4">{item.icon}</span>
                                            <div>
                                                <h4 className="text-xl font-semibold">{item.title}</h4>
                                                <p className="text-gray-600 dark:text-gray-400">{item.question}</p>
                                            </div>
                                        </div>
                                        <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-6 pb-6 space-y-2">
                                        {item.tips.map((tip) => (
                                            <p key={tip} className="flex items-start ml-12">
                                                <span className="text-blue-600 mr-2">→</span>
                                                <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                                            </p>
                                        ))}
                                    </div>
                                </details>
                            ))}
                        </div>

                        {/* FAQ */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-center">자주 묻는 질문</h3>
                            <div className="space-y-3">
                                {faqs.map((faq) => (
                                    <details
                                        key={faq.q}
                                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all"
                                    >
                                        <summary className="p-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-xl font-semibold">
                                            {faq.q}
                                        </summary>
                                        <div className="px-5 pb-5 text-gray-700 dark:text-gray-300">
                                            {faq.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
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
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            지금이 바로 시작할 때입니다
                        </h2>

                        <div className="max-w-3xl mx-auto space-y-6">
                            <p className="text-xl">
                                세상을 바꿀 아이디어가 있으시다면,<br />
                                NQ Solution이 그 아이디어를 현실로 만들어드리겠습니다.
                            </p>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                                <p className="text-2xl mb-4">
                                    💭 '언젠가는 해야지'라고 생각하고 계신가요?
                                </p>
                                <p className="text-3xl font-bold">
                                    ⏰ 그 '언젠가'가 바로 지금입니다!
                                </p>
                            </div>

                            <p className="text-lg">
                                망설이는 시간도 비용입니다.<br />
                                다음 단계로 나아갈 준비가 되셨다면, 지금 바로 연락하세요!
                            </p>

                            <div className="bg-yellow-400/20 backdrop-blur-sm rounded-xl p-6 text-left">
                                <p className="font-bold text-xl mb-2">⚡ 이번 달 특별 혜택</p>
                                <ul className="space-y-1">
                                    <li>• 프로젝트 기획서 무료 제작</li>
                                    <li>• 경쟁사 분석 리포트 제공</li>
                                    <li>• 기술 컨설팅 1회 무료</li>
                                </ul>
                                <p className="text-sm mt-2 opacity-80">* 월 10팀 한정</p>
                            </div>

                            <button className="px-10 py-5 bg-white text-blue-600 rounded-xl text-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105">
                                Next, Query our Solution! →
                            </button>
                        </div>
                    </div>
                </section>

                {/* Floating Contact Button */}
                <div className="fixed bottom-8 right-8 z-50">
                    <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110">
                        <span className="absolute -top-12 right-0 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            빠른 상담
                        </span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </button>
                </div>
            </div>
        </main>
    )
}