// src/components/Conversion.tsx
import React from 'react';

export default function Conversion() {
    const conversionStats = [
        {
            number: '98%',
            label: '고객 만족도',
            description: '프로젝트 완료 후 고객 만족도 조사 결과'
        },
        {
            number: '40%',
            label: '개발 기간 단축',
            description: '효율적인 프로세스로 인한 평균 개발 기간 단축'
        },
        {
            number: '95%',
            label: '프로젝트 성공률',
            description: '계획된 일정과 예산 내 완료율'
        },
        {
            number: '50+',
            label: '완료 프로젝트',
            description: '지금까지 성공적으로 완료한 프로젝트 수'
        }
    ];

    return (
        <div className="w-full py-24 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-8xl mx-auto px-8">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        검증된 성과
                    </h2>
                    <p className="text-2xl text-gray-600 dark:text-gray-300">
                        수치로 증명하는 NQ Solution의 전문성
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {conversionStats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700"
                        >
                            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                                {stat.number}
                            </div>
                            <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                {stat.label}
                            </div>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-10 rounded-3xl text-white shadow-lg">
                        <h3 className="text-3xl font-bold mb-6">왜 우리를 선택해야 할까요?</h3>
                        <ul className="space-y-6 text-lg">
                            <li className="flex items-start">
                                <span className="mr-3 text-xl">✓</span>
                                <span>10년 이상의 개발 경험</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-xl">✓</span>
                                <span>최신 기술 스택 활용</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-xl">✓</span>
                                <span>투명한 커뮤니케이션</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-xl">✓</span>
                                <span>지속적인 유지보수 지원</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">시작하기</h3>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            지금 바로 무료 상담을 신청하고, 프로젝트의 첫 걸음을 시작하세요.
                        </p>
                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1">
                            무료 상담 신청하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}