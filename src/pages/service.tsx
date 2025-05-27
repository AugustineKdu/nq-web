
import React, { useState } from 'react'
import Layout from '@/components/Layout'

export default function Service() {
    const [activeTab, setActiveTab] = useState<'outsourcing' | 'internal' | 'consulting'>('outsourcing')

    return (

        <main className="bg-primaryBg text-primaryText transition-colors">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
                {/* 1. Hero Section */}
                <section id="hero" className="min-h-screen flex flex-col items-center justify-center p-8 bg-light-surface dark:bg-dark-surface">
                    <h1 className="text-4xl md:text-5xl font-bold text-center">
                        당신의 아이디어를 현실로 만드는 완벽한 파트너
                    </h1>
                    <h2 className="text-xl md:text-2xl mt-4 text-center">
                        아이디어부터 런칭까지, 성공적인 여정을 함께하세요
                    </h2>
                    <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg text-center space-y-2">
                        <p>💡 아이디어만 있으면 됩니다</p>
                        <p>🚀 나머지는 NQ Solution이 책임집니다</p>
                        <p>✨ 성공까지의 모든 과정을 함께합니다</p>
                    </div>
                    <p className="mt-6 max-w-xl text-center">
                        단순한 개발 외주가 아닙니다.<br />
                        비즈니스 성공을 위한 전략적 파트너입니다.<br /><br />
                        기획부터 런칭, 그리고 성장까지<br />
                        모든 단계에서 최고의 솔루션을 제공합니다.
                    </p>
                    <div className="mt-6 flex space-x-6">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold">🎯 98%</span>
                            <span>고객만족</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold">⏱️ 40%</span>
                            <span>개발단축</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold">📈 95%</span>
                            <span>성과달성</span>
                        </div>
                    </div>
                    <div className="mt-8 flex space-x-4">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded hover:shadow-lg transition-shadow">
                            📋 서비스 보기
                        </button>
                        <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded hover:shadow-lg transition-shadow">
                            💬 상담 신청
                        </button>
                    </div>
                </section>

                {/* 2. Service Overview Section */}
                <section id="overview" className="py-16 px-8">
                    <h2 className="text-3xl font-bold text-center">
                        3가지 핵심 서비스로 모든 니즈를 충족합니다
                    </h2>
                    <p className="mt-2 text-center">
                        어떤 단계에 있든, NQ Solution이 최적의 솔루션을 제공합니다
                    </p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Outsourcing */}
                        <div className="p-6 bg-white/50 dark:bg-gray-700/50 rounded-lg shadow hover:scale-105 transition-transform">
                            <div className="text-4xl mb-2">🔧</div>
                            <h3 className="font-semibold mb-1">맞춤형 외주 개발</h3>
                            <p>"이미 명확한 계획이 있으신가요?"</p>
                            <ul className="mt-2 list-disc list-inside space-y-1">
                                <li>완벽한 맞춤 개발로 정확히 구현</li>
                                <li>웹, 앱, 시스템까지 올인원 서비스</li>
                                <li>기획부터 런칭까지 원스톱 진행</li>
                            </ul>
                            <p className="mt-2 italic">
                                대상: 구체적인 개발 계획이 있는 기업/개인
                            </p>
                            <button className="mt-4 px-4 py-2 border rounded">
                                자세히
                            </button>
                        </div>
                        {/* Internal Dev */}
                        <div className="p-6 bg-white/50 dark:bg-gray-700/50 rounded-lg shadow hover:scale-105 transition-transform">
                            <div className="text-4xl mb-2">🚀</div>
                            <h3 className="font-semibold mb-1">자체 서비스 개발</h3>
                            <p>"혁신적인 아이디어를 서비스로 만들고 싶으신가요?"</p>
                            <ul className="mt-2 list-disc list-inside space-y-1">
                                <li>아이디어 검증부터 시장 진입까지</li>
                                <li>스타트업 관점의 전략적 접근</li>
                                <li>투자 유치부터 스케일링까지 지원</li>
                            </ul>
                            <p className="mt-2 italic">
                                대상: 새로운 서비스를 시작하려는 창업자/기업
                            </p>
                            <button className="mt-4 px-4 py-2 border rounded">
                                자세히
                            </button>
                        </div>
                        {/* Consulting */}
                        <div className="p-6 bg-white/50 dark:bg-gray-700/50 rounded-lg shadow hover:scale-105 transition-transform">
                            <div className="text-4xl mb-2">💡</div>
                            <h3 className="font-semibold mb-1">기술 컨설팅</h3>
                            <p>"기존 시스템을 개선하고 싶으신가요?"</p>
                            <ul className="mt-2 list-disc list-inside space-y-1">
                                <li>현재 상황 진단 및 개선 방향 제시</li>
                                <li>단기/중기/장기 로드맵 수립</li>
                                <li>기술 트렌드 기반 전략 컨설팅</li>
                            </ul>
                            <p className="mt-2 italic">
                                대상: 기술 혁신이 필요한 기존 기업
                            </p>
                            <button className="mt-4 px-4 py-2 border rounded">
                                자세히
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                        <p>
                            "어떤 서비스가 적합한지 모르겠다면? 무료 상담을 통해 최적의 방향을 찾아드립니다!"
                        </p>
                    </div>
                </section>

                {/* 3. Detailed Service Tabs Section */}
                <section id="details" className="py-16 px-8 bg-light-surface dark:bg-dark-surface">
                    <h2 className="text-3xl font-bold text-center">
                        상세 서비스 안내
                    </h2>
                    <div className="mt-8 flex justify-center space-x-4">
                        <button
                            onClick={() => setActiveTab('outsourcing')}
                            className={`px-4 py-2 rounded ${activeTab === 'outsourcing' ? 'bg-blue-600 text-white' : 'bg-white/50 dark:bg-gray-700/50'}`}
                        >
                            🔧 외주 개발
                        </button>
                        <button
                            onClick={() => setActiveTab('internal')}
                            className={`px-4 py-2 rounded ${activeTab === 'internal' ? 'bg-blue-600 text-white' : 'bg-white/50 dark:bg-gray-700/50'}`}
                        >
                            🚀 자체 개발
                        </button>
                        <button
                            onClick={() => setActiveTab('consulting')}
                            className={`px-4 py-2 rounded ${activeTab === 'consulting' ? 'bg-blue-600 text-white' : 'bg-white/50 dark:bg-gray-700/50'}`}
                        >
                            💡 컨설팅
                        </button>
                    </div>
                    <div className="mt-8 max-w-4xl mx-auto space-y-4">
                        {activeTab === 'outsourcing' && (
                            <div>
                                <h3 className="text-2xl font-semibold">
                                    당신의 비즈니스에 완벽히 맞춘 솔루션
                                </h3>
                                <p className="mt-2">
                                    구체적인 계획을 완벽한 현실로 만들어드립니다
                                </p>
                                <details className="mt-4 bg-white/50 dark:bg-gray-700/50 p-4 rounded">
                                    <summary className="font-semibold cursor-pointer">
                                        🌐 웹 개발 영역
                                    </summary>
                                    <ul className="mt-2 list-disc list-inside space-y-1">
                                        <li>
                                            기업 홈페이지: 브랜드 가치를 담은 전문 웹사이트
                                        </li>
                                        <li>SEO 최적화 및 관리자 페이지 제공</li>
                                        <li>
                                            ✨ 추가 혜택: 로고 디자인, 브랜딩 가이드 제공
                                        </li>
                                    </ul>
                                </details>
                                {/* Additional areas omitted for brevity */}
                            </div>
                        )}
                        {/* internal and consulting details similarly */}
                    </div>
                </section>

                {/* 5. Tech Stack Section */}
                <section id="tech-stack" className="py-16 px-8">
                    <h2 className="text-3xl font-bold text-center">
                        최신 기술로 미래를 준비합니다
                    </h2>
                    <p className="mt-2 text-center">
                        검증된 기술과 혁신적인 도구로 최고의 결과를 만듭니다
                    </p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Frontend */}
                        <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">
                                🖥️ Frontend Technologies
                            </h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li>React 18 | Next.js 14 | TypeScript | Tailwind CSS</li>
                                <li>Zustand | React Query | React Hook Form</li>
                                <li>React Native | Flutter | PWA</li>
                            </ul>
                        </div>
                        {/* Backend */}
                        <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">
                                ⚙️ Backend Technologies
                            </h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li>
                                    Node.js + Express | Python + FastAPI | Django |
                                    Spring Boot
                                </li>
                                <li>PostgreSQL | MongoDB | Redis | Elasticsearch</li>
                                <li>AWS | GCP | Docker | Kubernetes</li>
                            </ul>
                        </div>
                        {/* DevOps */}
                        <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">
                                🔧 DevOps & Monitoring
                            </h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li>GitHub Actions | Docker | Nginx</li>
                                <li>Google Analytics | Sentry | Prometheus</li>
                                <li>Jest | Cypress | ESLint + Prettier</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 6. Project Start CTA Section */}
                <section id="start-cta" className="py-16 px-8 bg-light-surface dark:bg-dark-surface text-center">
                    <h2 className="text-3xl font-bold">
                        완벽한 서비스가 여기서 시작됩니다
                    </h2>
                    <p className="mt-2">
                        더 이상 미루지 마세요. 지금 바로 첫 걸음을 시작하세요
                    </p>
                    <div className="mt-8 text-center space-y-4">
                        <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg">
                            <p>
                                💭 '나중에 해야지'라고 생각하고 계신가요? ⏰ 경쟁사들은
                                이미 앞서가고 있습니다.
                            </p>
                        </div>
                        <div className="mt-4 flex flex-col md:flex-row justify-center gap-4">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded hover:shadow-lg transition-shadow">
                                🚀 무료 상담 신청
                            </button>
                            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded hover:shadow-lg transition-shadow">
                                💬 카톡 상담
                            </button>
                        </div>
                        <p className="mt-4 italic max-w-xl mx-auto">
                            "처음엔 작은 홈페이지였는데, 지금은 월 매출 3억원의 온라인 쇼핑몰이
                            되었습니다." - A기업 대표 김○○
                        </p>
                    </div>
                    <p className="mt-8">
                        📧 project@nqsolution.com | 📱 010-XXXX-XXXX | 💬 @nqsolution
                    </p>
                </section>
            </div>
        </main>

    )
}