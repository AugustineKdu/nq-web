// src/components/Home_Hero.tsx
import React, { useState, useEffect } from 'react';

export default function EnhancedHero() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentLine, setCurrentLine] = useState(0);

    const codeLines = [
        '> 🚀 Ready!',
        '> npx create-next-project',
        '> git commit -m "Next step with NQ"',
        '> 🚀 Deploy successful!',
        '> 🚀 Ready for next challenge!'
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentLine(prev => (prev + 1) % codeLines.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center">
            <div className="max-w-6xl mx-auto py-16 px-6 md:flex md:items-center md:justify-between md:gap-12">

                {/* 텍스트 영역 (왼쪽) */}
                <div className={`md:w-1/2 space-y-8 text-left transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                    }`}>
                    <div className="space-y-4">
                        <div className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                            🚀 혁신적인 개발 솔루션
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                            다음 단계로 나아갈 준비가 되셨나요?
                        </h1>

                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
                            NQ Solution과 함께 <span className="text-blue-600 dark:text-blue-400">망설임 없이</span> 시작하세요
                        </h2>
                    </div>

                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        혁신적인 웹&앱 개발 솔루션으로 당신의 비즈니스를<br />
                        <span className="font-semibold text-blue-600 dark:text-blue-400">다음 레벨로</span> 끌어올리세요
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            <span className="flex items-center gap-2">
                                상담 문의
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </button>

                        <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl font-semibold transition-all duration-300">
                            포트폴리오 보기
                        </button>
                    </div>

                    {/* 통계 정보 */}
                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">100+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">완성된 프로젝트</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">만족한 고객</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">5년+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">개발 경험</div>
                        </div>
                    </div>
                </div>

                {/* 코드 스니펫 영역 (오른쪽) */}
                <div className={`mt-12 md:mt-0 md:w-1/2 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                    }`}>
                    <div className="relative">
                        {/* 코드 에디터 헤더 */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-t-xl">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <div className="flex-1 text-center text-sm text-gray-600 dark:text-gray-400 font-mono">
                                terminal
                            </div>
                        </div>

                        {/* 코드 컨텐츠 */}
                        <div className="bg-gray-900 dark:bg-gray-800 p-6 rounded-b-xl font-mono text-sm overflow-hidden">
                            <div className="space-y-2">
                                {codeLines.map((line, index) => (
                                    <div
                                        key={index}
                                        className={`transition-all duration-500 ${index <= currentLine
                                            ? 'opacity-100 text-green-400'
                                            : 'opacity-40 text-gray-500'
                                            }`}
                                    >
                                        {line}
                                        {index === currentLine && (
                                            <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* 추가 정보 */}
                            <div className="mt-6 pt-4 border-t border-gray-700">
                                <div className="text-gray-400 text-xs space-y-1">
                                    <div>✅ Next.js 14 Ready</div>
                                    <div>✅ TypeScript Support</div>
                                    <div>✅ Tailwind CSS</div>
                                    <div>✅ Performance Optimized</div>
                                </div>
                            </div>
                        </div>

                        {/* 플로팅 아이콘들 */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}