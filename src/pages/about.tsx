import React, { useState, useEffect } from 'react'

export default function About() {
    const [typedText, setTypedText] = useState('')
    const [currentStep, setCurrentStep] = useState(0)
    const [visibleSections, setVisibleSections] = useState(new Set())

    const codeLines = [
        '> git init',
        '> git add .',
        '> git commit -m "시작"',
        '> git push origin main',
        '> 🚀 Success! Ready to build something amazing!'
    ]

    // 타이핑 애니메이션
    useEffect(() => {
        if (currentStep < codeLines.length) {
            const timer = setTimeout(() => {
                setTypedText(prev => prev + (prev ? '\n' : '') + codeLines[currentStep])
                setCurrentStep(prev => prev + 1)
            }, 800)
            return () => clearTimeout(timer)
        }
    }, [currentStep])

    // 스크롤 애니메이션을 위한 Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections(prev => new Set([...prev, entry.target.id]))
                    }
                })
            },
            { threshold: 0.1 }
        )

        const sections = document.querySelectorAll('[data-animate]')
        sections.forEach(section => observer.observe(section))

        return () => observer.disconnect()
    }, [])

    return (
        <div className="bg-primaryBg text-primaryText transition-colors duration-300">
            {/* Hero Section with Gradient Background */}
            <section
                id="hero"
                data-animate
                className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between overflow-hidden"
            >
                {/* Beautiful Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>

                {/* Floating Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 dark:bg-purple-400/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className={`transform transition-all duration-1000 ${visibleSections.has('hero') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                                    <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                                        NQ Solution이
                                    </span>
                                    <br />
                                    <span className="text-gray-900 dark:text-white">걸어온 길</span>
                                </h1>
                                <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-emerald-500 mt-4"></div>
                            </div>

                            <h2 className={`text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-light transform transition-all duration-1000 delay-300 ${visibleSections.has('hero') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                작은 아이디어에서 시작된 큰 꿈
                            </h2>

                            <div className={`space-y-4 transform transition-all duration-1000 delay-500 ${visibleSections.has('hero') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    모든 위대한 혁신은 <span className="font-semibold text-blue-600 dark:text-blue-400">'다음엔 뭘 해볼까?'</span>라는
                                    작은 질문에서 시작됩니다.
                                </p>
                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    NQ Solution도 그런 작은 호기심에서 출발해 오늘날 여러분과 함께 꿈을 현실로 만드는
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-400"> 개발 파트너</span>가 되었습니다.
                                </p>
                            </div>

                            <div className={`p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-700/50 transform transition-all duration-1000 delay-700 ${visibleSections.has('hero') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                    우리는 단순히 코드를 짜는 회사가 아닙니다.<br />
                                    <span className="text-blue-600 dark:text-blue-400">고객의 비즈니스 성공을 함께 만들어가는 파트너</span>입니다.
                                </p>
                            </div>

                            <button className={`group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${visibleSections.has('hero') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} delay-900`}>
                                더 알아보기
                                <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>

                        {/* Right Content - Terminal */}
                        <div className="lg:mt-0 mt-12">
                            <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 dark:border-gray-600 overflow-hidden">
                                {/* Terminal Header */}
                                <div className="flex items-center justify-between px-6 py-4 bg-gray-800 dark:bg-gray-700 border-b border-gray-700 dark:border-gray-600">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <span className="text-gray-400 text-sm font-mono">terminal</span>
                                </div>
                                {/* Terminal Content */}
                                <div className="p-6 font-mono text-green-400 min-h-[200px]">
                                    <pre className="whitespace-pre text-sm leading-relaxed">
                                        {typedText}
                                        {currentStep < codeLines.length && (
                                            <span className="animate-pulse bg-green-400 text-green-400">|</span>
                                        )}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand Story Section */}
            <section
                id="story"
                data-animate
                className="py-24"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`max-w-4xl mx-auto mb-16 transform transition-all duration-1000 ${visibleSections.has('story') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="relative p-8 bg-blue-50 dark:bg-blue-900/20 rounded-3xl shadow-xl border border-blue-200 dark:border-blue-800">
                            <div className="absolute -top-4 -left-4 text-6xl text-blue-500/30 dark:text-blue-400/30">"</div>
                            <div className="text-center mb-6">
                                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">우리의 시작</h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto"></div>
                            </div>
                            <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-light italic text-center">
                                2024년, 한 개발자의 작은 다짐에서 시작되었습니다.<br /><br />
                                <span className="font-medium">'고객의 문제를 진짜로 해결하는 개발자가 되자'</span><br />
                                <span className="font-medium">'기술이 아니라 솔루션을 제공하자'</span><br />
                                <span className="font-medium">'완벽한 코드보다 완벽한 결과를 만들자'</span><br /><br />
                                이런 생각들이 모여 NQ Solution이 탄생했습니다.
                            </p>
                            <div className="absolute -bottom-4 -right-4 text-6xl text-emerald-500/30 dark:text-emerald-400/30 rotate-180">"</div>
                        </div>
                    </div>

                    {/* New NQS Design */}
                    <div className={`text-center mb-16 transform transition-all duration-1000 delay-300 ${visibleSections.has('story') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                            Next, Query our Solution의 진짜 의미
                        </h3>

                        {/* Large NQS Display */}
                        <div className="flex justify-center items-center space-x-8 mb-12">
                            <div className="text-8xl md:text-9xl font-black">
                                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">N</span>
                                <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">Q</span>
                                <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">S</span>
                            </div>
                        </div>

                        {/* Definitions */}
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    letter: 'N',
                                    word: 'Next',
                                    desc: '현재에 안주하지 않고 항상 다음 단계를 생각합니다.',
                                    color: 'text-blue-600 dark:text-blue-400',
                                    bgColor: 'bg-blue-500'
                                },
                                {
                                    letter: 'Q',
                                    word: 'Query',
                                    desc: '좋은 아이디어는 실행되어야 가치가 있습니다.',
                                    color: 'text-purple-600 dark:text-purple-400',
                                    bgColor: 'bg-purple-500'
                                },
                                {
                                    letter: 'S',
                                    word: 'Solution',
                                    desc: '문제를 푸는 것이 아니라 해결하는 것이 우리의 존재 이유입니다.',
                                    color: 'text-emerald-600 dark:text-emerald-400',
                                    bgColor: 'bg-emerald-500'
                                }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`transform transition-all duration-1000 hover:-translate-y-2 ${visibleSections.has('story') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                    style={{ transitionDelay: `${600 + index * 200}ms` }}
                                >
                                    <div className="text-center">
                                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${item.bgColor} text-white text-4xl font-bold mb-4 shadow-lg`}>
                                            {item.letter}
                                        </div>
                                        <h4 className={`text-3xl font-bold mb-3 ${item.color}`}>{item.word}</h4>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Communication Process Section */}
            <section
                id="communication"
                data-animate
                className="py-24"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transform transition-all duration-1000 ${visibleSections.has('communication') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                            소통이 모든 것의 시작입니다
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">서로를 이해하는 것부터가 진짜 개발의 시작</p>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto mt-6"></div>
                    </div>

                    <div className={`max-w-4xl mx-auto mb-12 transform transition-all duration-1000 delay-300 ${visibleSections.has('communication') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-200 dark:border-blue-800">
                            <p className="text-xl text-center leading-relaxed text-gray-700 dark:text-gray-300">
                                <span className="font-semibold text-blue-600 dark:text-blue-400">개발은 기술이 아니라 소통으로 시작됩니다.</span><br /><br />
                                고객은 자신이 원하는 것을 완벽하게 설명하기 어렵고,<br />
                                개발자는 고객의 비즈니스를 완전히 이해하지 못합니다.<br /><br />
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">그래서 NQ Solution은 소통을 가장 중요하게 생각합니다.</span>
                            </p>
                        </div>
                    </div>

                    {/* 4-Step Communication Process */}
                    <div className="relative max-w-4xl mx-auto">
                        {/* Connection Line */}
                        <div className="absolute left-8 top-16 bottom-16 w-1 bg-gradient-to-b from-blue-500 to-emerald-500 hidden md:block"></div>

                        <div className="space-y-8">
                            {[
                                {
                                    step: '1️⃣',
                                    icon: '👂',
                                    title: '경청 (Listen)',
                                    desc: '먼저 고객의 이야기를 충분히 들어봅니다',
                                    details: ['표면적인 요구사항 뒤에 숨은 진짜 니즈 파악', '비즈니스 목표와 현실적 제약사항 구분'],
                                    color: 'from-blue-500 to-blue-600'
                                },
                                {
                                    step: '2️⃣',
                                    icon: '🔄',
                                    title: '번역 (Translate)',
                                    desc: '고객의 언어를 개발 언어로, 기술을 비즈니스 언어로',
                                    details: ['복잡한 기술 용어를 쉬운 말로 설명', '고객의 아이디어를 구체적인 기능으로 변환'],
                                    color: 'from-purple-500 to-purple-600'
                                },
                                {
                                    step: '3️⃣',
                                    icon: '✅',
                                    title: '확인 (Confirm)',
                                    desc: '한 걸음씩 확인하며 함께 나아갑니다',
                                    details: ['각 단계마다 중간 점검과 피드백', '실시간 개발 진행상황 공유'],
                                    color: 'from-emerald-500 to-emerald-600'
                                },
                                {
                                    step: '4️⃣',
                                    icon: '📈',
                                    title: '성장 (Growth)',
                                    desc: '프로젝트 완료 후에도 계속되는 소통',
                                    details: ['운영 중 발생하는 이슈 지속 지원', '장기적 파트너십을 통한 함께 성장'],
                                    color: 'from-orange-500 to-orange-600'
                                }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`relative flex items-start space-x-6 transform transition-all duration-1000 ${visibleSections.has('communication') ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                                    style={{ transitionDelay: `${600 + index * 200}ms` }}
                                >
                                    {/* Step Icon */}
                                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg relative z-10`}>
                                        {item.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center mb-3">
                                            <span className="text-xl mr-2">{item.step}</span>
                                            <h4 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h4>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">{item.desc}</p>
                                        <ul className="space-y-2">
                                            {item.details.map((detail, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                                                    <span className="text-gray-600 dark:text-gray-400">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section
                id="values"
                data-animate
                className="py-24"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transform transition-all duration-1000 ${visibleSections.has('values') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                            NQ Solution의 4가지 핵심 가치
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: '🚀',
                                title: '혁신성',
                                desc: '트렌드를 따라가는 것이 아니라 만들어갑니다',
                                points: ['최신 기술 스택 빠른 도입', '창의적 사고와 논리적 접근의 조화'],
                                bgColor: 'bg-blue-50 dark:bg-blue-900/20',
                                borderColor: 'border-blue-200 dark:border-blue-800'
                            },
                            {
                                icon: '🤝',
                                title: '신뢰성',
                                desc: '약속한 것은 반드시 지킵니다',
                                points: ['정해진 일정과 예산 내 프로젝트 완수', '투명한 진행상황 공유'],
                                bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
                                borderColor: 'border-emerald-200 dark:border-emerald-800'
                            },
                            {
                                icon: '📈',
                                title: '성장',
                                desc: '고객과 함께 성장하는 파트너십',
                                points: ['장기적 파트너십 추구', '고객의 성공이 곧 우리의 성공'],
                                bgColor: 'bg-purple-50 dark:bg-purple-900/20',
                                borderColor: 'border-purple-200 dark:border-purple-808'
                            },
                            {
                                icon: '💪',
                                title: '도전',
                                desc: '불가능해 보이는 일도 가능하게 만드는 열정',
                                points: ['기술적 난이도 높은 프로젝트 수용', '"어떻게 하면 될까?" 먼저 생각'],
                                bgColor: 'bg-orange-50 dark:bg-orange-900/20',
                                borderColor: 'border-orange-200 dark:border-orange-800'
                            }
                        ].map((value, index) => (
                            <div
                                key={index}
                                className={`group p-8 ${value.bgColor} rounded-3xl border ${value.borderColor} hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 ${visibleSections.has('values') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ transitionDelay: `${300 + index * 150}ms` }}
                            >
                                <div className="text-5xl mb-4">{value.icon}</div>
                                <h4 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{value.title}</h4>
                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{value.desc}</p>
                                <ul className="space-y-3">
                                    {value.points.map((point, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                                            <span className="text-gray-600 dark:text-gray-400">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section
                id="mission-vision"
                data-animate
                className="py-24"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transform transition-all duration-1000 ${visibleSections.has('mission-vision') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                            우리의 미션과 비전
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: '미션',
                                content: '기술을 통해 고객의 꿈을 현실로 만든다',
                                icon: '🎯',
                                color: 'from-blue-500 to-blue-600'
                            },
                            {
                                title: '비전',
                                content: '모든 비즈니스가 디지털 혁신을 통해 성공할 수 있는 세상을 만든다',
                                icon: '🚀',
                                color: 'from-emerald-500 to-emerald-600'
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className={`p-8 bg-gradient-to-br ${item.color} rounded-3xl shadow-xl text-white transform transition-all duration-1000 hover:scale-105 ${visibleSections.has('mission-vision') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ transitionDelay: `${300 + index * 200}ms` }}
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                                <p className="text-xl leading-relaxed opacity-90">{item.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Future Plans Section */}
            <section
                id="future"
                data-animate
                className="py-24"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transform transition-all duration-1000 ${visibleSections.has('future') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                            함께 만들어갈 미래
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto"></div>
                    </div>

                    {/* Coming Soon Updates */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                icon: '📁',
                                title: '포트폴리오',
                                date: '2025년 4월',
                                desc: '지금까지 완성한 프로젝트들의 생생한 기록',
                                color: 'from-blue-500 to-blue-600'
                            },
                            {
                                icon: '🏆',
                                title: '고객 후기',
                                date: '2025년 5월',
                                desc: '함께 성공을 만들어낸 고객들의 생생한 목소리',
                                color: 'from-emerald-500 to-emerald-600'
                            },
                            {
                                icon: '📝',
                                title: '기술 블로그',
                                date: '2025년 3월',
                                desc: '개발 노하우와 기술 인사이트를 정기적으로 공유',
                                color: 'from-purple-500 to-purple-600'
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className={`group relative overflow-hidden bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 ${visibleSections.has('future') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ transitionDelay: `${300 + index * 150}ms` }}
                            >
                                {/* Coming Soon Ribbon */}
                                <div className={`absolute -top-1 -right-8 bg-gradient-to-r ${item.color} text-white text-xs font-bold px-8 py-1 transform rotate-12 shadow-lg`}>
                                    Coming Soon
                                </div>

                                <div className="p-8 text-center">
                                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                    <h4 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h4>
                                    <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-medium mb-4`}>
                                        {item.date}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Partnership Programs */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {[
                            {
                                icon: '🤝',
                                title: '장기 파트너십',
                                desc: '지속적인 협력으로 함께 성장하세요',
                                benefits: [
                                    '프로젝트 단가 할인 (10-20%)',
                                    '우선적 일정 배정',
                                    '전담 매니저 배정'
                                ],
                                color: 'from-blue-500 to-blue-600',
                                bgColor: 'bg-blue-50 dark:bg-blue-900/20',
                                borderColor: 'border-blue-200 dark:border-blue-800'
                            },
                            {
                                icon: '🚀',
                                title: '스타트업 지원',
                                desc: '혁신적인 아이디어를 현실로 만들어드립니다',
                                benefits: [
                                    'MVP 개발 50% 할인',
                                    '3개월 무료 기술 컨설팅',
                                    '투자 유치용 데모 제작 지원'
                                ],
                                color: 'from-emerald-500 to-emerald-600',
                                bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
                                borderColor: 'border-emerald-200 dark:border-emerald-800'
                            }
                        ].map((program, index) => (
                            <div
                                key={index}
                                className={`group p-8 ${program.bgColor} rounded-3xl border ${program.borderColor} hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 ${visibleSections.has('future') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ transitionDelay: `${750 + index * 200}ms` }}
                            >
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${program.color} text-white text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {program.icon}
                                </div>
                                <h4 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{program.title}</h4>
                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{program.desc}</p>
                                <ul className="space-y-3">
                                    {program.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${program.color} mt-2 mr-3 flex-shrink-0`}></div>
                                            <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Final CTA Section */}
                    <div className={`text-center space-y-8 transform transition-all duration-1000 delay-1000 ${visibleSections.has('future') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        {/* Contact Info */}
                        <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
                            {[
                                { icon: '📧', text: 'partnership@nqsolution.com', href: 'mailto:partnership@nqsolution.com' },
                                { icon: '📱', text: '010-XXXX-XXXX', href: 'tel:010-XXXX-XXXX' },
                                { icon: '💬', text: '@nqsolution', href: '#' }
                            ].map((contact, index) => (
                                <a
                                    key={index}
                                    href={contact.href}
                                    className="group flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
                                >
                                    <span className="text-xl">{contact.icon}</span>
                                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {contact.text}
                                    </span>
                                </a>
                            ))}
                        </div>

                        {/* Final Message */}
                        <div className="max-w-4xl mx-auto">
                            <div className="p-8 bg-gray-900 dark:bg-gray-800 rounded-3xl text-white shadow-2xl">
                                <blockquote className="text-2xl font-light leading-relaxed mb-6">
                                    "NQ Solution은 고객의 꿈을 함께 키워가는 파트너입니다.<br />
                                    다음 단계로 나아갈 준비가 되셨다면, 망설이지 마시고 연락하세요."
                                </blockquote>
                                <div className="text-center">
                                    <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full text-xl font-bold">
                                        Next, Query our Solution!
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                            <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                파트너십 문의하기
                                <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                            <button className="group bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                무료 상담 신청
                                <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.098-4.126A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}