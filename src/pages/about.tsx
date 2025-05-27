

// src/pages/about.tsx
import React from 'react'
import Layout from '@/components/Layout'

export default function About() {
    return (

        <main className="bg-primaryBg text-primaryText transition-colors">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
                {/* 1. Hero Section */}
                <section className="min-h-screen flex flex-col md:flex-row items-center justify-center py-16 px-8 bg-light-surface dark:bg-dark-surface">
                    <div className="md:w-1/2 space-y-6">
                        <h1 className="text-5xl font-bold">NQ Solution이 걸어온 길</h1>
                        <h2 className="text-2xl">작은 아이디어에서 시작된 큰 꿈</h2>
                        <p className="text-lg whitespace-pre-line">
                            모든 위대한 혁신은 '다음엔 뭘 해볼까?'라는{'\n'}
                            작은 질문에서 시작됩니다.{'\n\n'}
                            NQ Solution도 그런 작은 호기심에서 출발해{'\n'}
                            오늘날 여러분과 함께 꿈을 현실로 만드는 개발 파트너가 되었습니다.
                        </p>
                        <p className="text-lg font-semibold">
                            우리는 단순히 코드를 짜는 회사가 아닙니다.{'\n'}
                            고객의 비즈니스 성공을 함께 만들어가는 파트너입니다.
                        </p>
                        <button className="mt-4 px-6 py-3 border border-light-primary dark:border-dark-primary rounded">
                            더 알아보기
                        </button>
                    </div>
                    <pre className="mt-8 md:mt-0 md:w-1/2 bg-gray-100 dark:bg-gray-800 p-6 rounded font-mono text-primaryText">
                        {`> git init
> git add .
> git commit -m "시작"
> git push
> 🚀 Success!`}
                    </pre>
                </section>

                {/* 2. 회사 철학 섹션 */}
                <section className="py-16 px-8">
                    <h2 className="text-3xl font-bold text-center">Next, Query our Solution의 진짜 의미</h2>
                    <div className="mt-12 space-y-12">
                        <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg italic">
                            "2024년, 한 개발자의 작은 다짐에서 시작되었습니다.
                            '고객의 문제를 진짜로 해결하는 개발자가 되자'
                            '기술이 아니라 솔루션을 제공하자'
                            '완벽한 코드보다 완벽한 결과를 만들자'
                            이런 생각들이 모여 NQ Solution이 탄생했습니다."
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <div className="flex-1 bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg text-center">
                                <div className="text-4xl mb-2">💡 N</div>
                                <h3 className="font-semibold mb-1">Next</h3>
                                <p>현재에 안주하지 않고 항상 다음 단계를 생각합니다.</p>
                            </div>
                            <div className="flex-1 bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg text-center">
                                <div className="text-4xl mb-2">⚡ Q</div>
                                <h3 className="font-semibold mb-1">Query</h3>
                                <p>좋은 아이디어는 실행되어야 가치가 있습니다.</p>
                            </div>
                            <div className="flex-1 bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg text-center">
                                <div className="text-4xl mb-2">🎯 S</div>
                                <h3 className="font-semibold mb-1">Solution</h3>
                                <p>문제를 푸는 것이 아니라 해결하는 것이 우리의 존재 이유입니다.</p>
                            </div>
                        </div>
                        <div className="mt-12 flex flex-col md:flex-row justify-center gap-8">
                            <div className="flex-1 bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg text-center">
                                <h4 className="font-semibold mb-2">미션</h4>
                                <p>기술을 통해 고객의 꿈을 현실로 만든다</p>
                            </div>
                            <div className="flex-1 bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg text-center">
                                <h4 className="font-semibold mb-2">비전</h4>
                                <p>모든 비즈니스가 디지털 혁신을 통해 성공할 수 있는 세상을 만든다</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. 소통의 중요성 섹션 */}
                <section className="py-16 px-8 bg-light-surface dark:bg-dark-surface">
                    <h2 className="text-3xl font-bold text-center">소통이 모든 것의 시작입니다</h2>
                    <p className="mt-4 text-center text-lg">서로를 이해하는 것부터가 진짜 개발의 시작</p>
                    <div className="mt-12 max-w-3xl mx-auto space-y-8">
                        <div className="border-l-4 border-blue-600 pl-4">
                            <h4 className="font-semibold">1️⃣ 경청 (Listen)</h4>
                            <p>먼저 고객의 이야기를 충분히 들어봅니다.</p>
                        </div>
                        <div className="border-l-4 border-blue-600 pl-4">
                            <h4 className="font-semibold">2️⃣ 번역 (Translate)</h4>
                            <p>고객의 언어를 개발 언어로, 기술을 비즈니스 언어로 변환합니다.</p>
                        </div>
                        <div className="border-l-4 border-blue-600 pl-4">
                            <h4 className="font-semibold">3️⃣ 확인 (Confirm)</h4>
                            <p>각 단계마다 중간 점검과 피드백을 진행합니다.</p>
                        </div>
                        <div className="border-l-4 border-blue-600 pl-4">
                            <h4 className="font-semibold">4️⃣ 성장 (Growth)</h4>
                            <p>프로젝트 완료 후에도 지속적인 지원과 함께 성장합니다.</p>
                        </div>
                        <p className="mt-6 italic text-center">
                            "기술적 완성도도 중요하지만, 고객과의 완벽한 소통이 더 중요합니다."
                        </p>
                    </div>
                </section>

                {/* 4. 핵심 가치 섹션 */}
                <section className="py-16 px-8">
                    <h2 className="text-3xl font-bold text-center">NQ Solution의 4가지 핵심 가치</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-2">🚀 혁신성</h4>
                            <p>트렌드를 따라가는 것이 아니라 만들어갑니다.</p>
                            <ul className="mt-2 list-disc list-inside space-y-1">
                                <li>최신 기술 스택 빠른 도입</li>
                                <li>창의적 사고와 논리적 접근의 조화</li>
                            </ul>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-2">🤝 신뢰성</h4>
                            <p>약속한 것은 반드시 지킵니다.</p>
                            <ul className="mt-2 list-disc list-inside space-y-1">
                                <li>정해진 일정과 예산 내 프로젝트 완수</li>
                                <li>투명한 진행상황 공유</li>
                            </ul>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-2">📈 성장</h4>
                            <p>고객과 함께 성장하는 파트너십.</p>
                            <ul className="mt-2 list-disc list-inside space-y-1">
                                <li>장기적 파트너십 추구</li>
                                <li>고객의 성공이 곧 우리의 성공</li>
                            </ul>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-2">💪 도전</h4>
                            <p>불가능해 보이는 일도 가능하게 만드는 열정.</p>
                            <ul className="mt-2 list-disc list-inside space-y-1">
                                <li>기술적 난이도 높은 프로젝트 수용</li>
                                <li>"어떻게 하면 될까?" 먼저 생각</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 5. 미래 계획 & 파트너십 섹션 */}
                <section className="py-16 px-8 bg-light-surface dark:bg-dark-surface">
                    <h2 className="text-3xl font-bold text-center">함께 만들어갈 미래</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg text-center">
                            <div className="text-4xl mb-2">📁</div>
                            <h4 className="font-semibold">포트폴리오</h4>
                            <p>2025년 4월 공개 예정</p>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg text-center">
                            <div className="text-4xl mb-2">🏆</div>
                            <h4 className="font-semibold">고객 후기</h4>
                            <p>2025년 5월 공개 예정</p>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg text-center">
                            <div className="text-4xl mb-2">📝</div>
                            <h4 className="font-semibold">기술 블로그</h4>
                            <p>2025년 3월 공개 예정</p>
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-2">🤝 장기 파트너십</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li>프로젝트 단가 할인 (10-20%)</li>
                                <li>우선적 일정 배정</li>
                                <li>전담 매니저 배정</li>
                            </ul>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-2">🚀 스타트업 지원</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li>MVP 개발 50% 할인</li>
                                <li>3개월 무료 기술 컨설팅</li>
                                <li>투자 유치용 데모 제작 지원</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 text-center space-y-4">
                        <p>📧 partnership@nqsolution.com | 📱 010-XXXX-XXXX | 💬 @nqsolution</p>
                        <blockquote className="italic">
                            "NQ Solution은 고객의 꿈을 함께 키워가는 파트너입니다.
                            다음 단계로 나아갈 준비가 되셨다면, 망설이지 마시고 연락하세요."
                        </blockquote>
                    </div>
                </section>
            </div>
        </main>

    )
}