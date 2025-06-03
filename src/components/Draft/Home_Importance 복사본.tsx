// src/components/Importance.tsx
import React from 'react';

export default function Importance() {
    const importanceItems = [
        {
            icon: '🎯',
            title: '정확한 목표 설정',
            description: '비즈니스 목표를 명확히 정의하고, 이를 달성하기 위한 최적의 전략을 수립합니다.'
        },
        {
            icon: '⚡',
            title: '빠른 개발 속도',
            description: '최신 기술과 효율적인 프로세스로 빠른 개발과 배포를 보장합니다.'
        },
        {
            icon: '🛡️',
            title: '안정적인 서비스',
            description: '보안과 성능을 최우선으로 하여 안정적인 서비스를 제공합니다.'
        },
        {
            icon: '📈',
            title: '지속적인 성장',
            description: '데이터 기반의 의사결정으로 서비스의 지속적인 성장을 지원합니다.'
        }
    ];

    return (
        <div className="w-full py-24">
            <div className="max-w-8xl mx-auto px-8">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        왜 NQ Solution인가요?
                    </h2>
                    <p className="text-2xl text-gray-600 dark:text-gray-300">
                        우리는 단순한 개발이 아닌, 비즈니스 성공을 위한 완벽한 파트너십을 제공합니다
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {importanceItems.map((item, index) => (
                        <div
                            key={index}
                            className="group bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                        >
                            <div className="text-5xl mb-6">{item.icon}</div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                {item.title}
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-10 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl border border-blue-100 dark:border-blue-800">
                    <div className="text-center">
                        <p className="text-2xl font-medium text-gray-800 dark:text-gray-100">
                            "기술은 도구일 뿐, 진짜 가치는 <span className="text-blue-600 dark:text-blue-400">비즈니스 성공</span>입니다"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}