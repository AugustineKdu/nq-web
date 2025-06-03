import React from 'react';

export default function Process() {
    const processSteps = [
        {
            number: 1,
            title: '상담 및 기획',
            description: '프로젝트의 목표와 요구사항을 파악하고, 최적의 솔루션을 기획합니다.',
            icon: '💡',
            duration: '1-2주'
        },
        {
            number: 2,
            title: '디자인',
            description: '사용자 경험을 고려한 직관적이고 아름다운 디자인을 제작합니다.',
            icon: '🎨',
            duration: '1-2주'
        },
        {
            number: 3,
            title: '개발',
            description: '최신 기술을 활용하여 안정적이고 확장 가능한 시스템을 구축합니다.',
            icon: '⚡',
            duration: '4-8주'
        },
        {
            number: 4,
            title: '테스트',
            description: '철저한 테스트를 통해 완벽한 품질을 보장합니다.',
            icon: '🔍',
            duration: '1주'
        },
        {
            number: 5,
            title: '런칭',
            description: '시스템 안정화와 배포를 진행하고, 지속적인 모니터링을 제공합니다.',
            icon: '🚀',
            duration: '3-5일'
        }
    ];

    return (
        <div className="w-full py-24 bg-white dark:bg-gray-900">
            <div className="max-w-8xl mx-auto px-8">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        프로젝트 진행 과정
                    </h2>
                    <p className="text-2xl text-gray-600 dark:text-gray-300">
                        체계적인 프로세스로 완벽한 결과물을 제공합니다
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block"></div>

                    <div className="space-y-20">
                        {processSteps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="flex flex-col md:flex-row items-center">
                                    <div className="md:w-1/2 md:pr-20 mb-10 md:mb-0 md:text-right">
                                        <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 inline-block">
                                            <div className="text-4xl mb-4">{step.icon}</div>
                                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                                {step.title}
                                            </h3>
                                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                                                {step.description}
                                            </p>
                                            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                                예상 기간: {step.duration}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:w-1/2 md:pl-20">
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                                                {step.number}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-10 rounded-3xl text-white shadow-lg inline-block">
                        <h3 className="text-3xl font-bold mb-6">지금 바로 시작하세요</h3>
                        <p className="text-xl mb-8">
                            무료 상담을 통해 프로젝트의 첫 걸음을 시작하세요
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1">
                            무료 상담 신청하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}