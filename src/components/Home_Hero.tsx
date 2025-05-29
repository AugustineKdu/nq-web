import React, { useState, useEffect } from 'react';

export default function EnhancedHero() {
    const [currentLine, setCurrentLine] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const terminalLines = [
        '$ whoami',
        'NQ Solution - Your Tech Partner',
        '',
        '$ cat mission.txt',
        '다음 단계로 나아갈 준비가 되셨나요?',
        'NQ Solution과 함께 망설임 없이 시작하세요',
        '',
        '$ ls services/',
        'web-development/    mobile-app/    consulting/',
        '',
        '$ ./start-project.sh',
        'Initializing your dream project...',
        '✅ Ready to build something amazing!',
        '',
        '$ # 지금 바로 시작하세요! 🚀'
    ];

    useEffect(() => {
        setIsVisible(true);
        const timer = setInterval(() => {
            setCurrentLine(prev => {
                if (prev < terminalLines.length - 1) {
                    return prev + 1;
                }
                return prev;
            });
        }, 600);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-primaryBg text-primaryText transition-colors duration-300">
            <div className="min-h-screen flex items-center">
                <div className="w-full max-w-none mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

                        {/* Left Side - Terminal (더 넓게) */}
                        <div className={`lg:col-span-2 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                            <div className="bg-gray-900 dark:bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-800 dark:border-gray-700">
                                {/* Terminal Header */}
                                <div className="flex items-center justify-between px-6 py-3 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="text-gray-400 text-sm font-mono">
                                        nq-solution-terminal
                                    </div>
                                    <div className="w-16"></div>
                                </div>

                                {/* Terminal Content */}
                                <div className="p-6 font-mono text-base text-green-400 min-h-[400px]">
                                    <div className="space-y-2">
                                        {terminalLines.slice(0, currentLine + 1).map((line, index) => (
                                            <div key={index} className="flex">
                                                {line.startsWith('$') ? (
                                                    <>
                                                        <span className="text-blue-400 mr-3 font-bold">$</span>
                                                        <span className="text-white font-medium">{line.substring(2)}</span>
                                                    </>
                                                ) : line.startsWith('✅') ? (
                                                    <span className="text-green-300 font-medium">{line}</span>
                                                ) : line.includes('/') && line.includes(' ') ? (
                                                    <span className="text-cyan-400 font-medium">{line}</span>
                                                ) : line === '' ? (
                                                    <span>&nbsp;</span>
                                                ) : line.includes('🚀') ? (
                                                    <span className="text-yellow-300 font-medium">{line}</span>
                                                ) : (
                                                    <span className="text-gray-300 font-medium">{line}</span>
                                                )}
                                                {index === currentLine && currentLine < terminalLines.length - 1 && (
                                                    <span className="animate-pulse text-green-400 ml-2 font-bold">█</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className={`lg:col-span-1 space-y-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        다음 단계로
                                    </span>
                                    <br />
                                    <span className="text-gray-900 dark:text-white">나아갈</span>
                                    <br />
                                    <span className="text-gray-900 dark:text-white">준비가 되셨나요?</span>
                                </h1>

                                <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mb-4"></div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl lg:text-2xl font-semibold text-gray-700 dark:text-gray-300">
                                    NQ Solution과 함께
                                    <span className="text-blue-600 dark:text-blue-400"> 망설임 없이</span>
                                    시작하세요
                                </h2>

                                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                    혁신적인 웹&앱 개발 솔루션으로 당신의 비즈니스를
                                    <span className="font-semibold text-blue-600 dark:text-blue-400"> 다음 레벨로</span> 끌어올리세요
                                </p>
                            </div>

                            <div className="space-y-4">
                                {/* Services */}
                                <div className="space-y-2">
                                    <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                        <div className="text-lg mr-3">🌐</div>
                                        <div className="text-sm font-semibold text-blue-900 dark:text-blue-100">웹 개발</div>
                                    </div>
                                    <div className="flex items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                        <div className="text-lg mr-3">📱</div>
                                        <div className="text-sm font-semibold text-green-900 dark:text-green-100">모바일 앱</div>
                                    </div>
                                    <div className="flex items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                                        <div className="text-lg mr-3">💡</div>
                                        <div className="text-sm font-semibold text-purple-900 dark:text-purple-100">컨설팅</div>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="pt-2">
                                    <button className="group w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                        <span className="flex items-center justify-center gap-2">
                                            프로젝트 시작하기
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}