// src/pages/contact.tsx
import React from 'react'

export default function Contact() {
    return (
        <main className="bg-primaryBg text-primaryText transition-colors">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
                {/* 1. Hero Section */}
                <section
                    id="hero"
                    className="min-h-screen flex flex-col items-center justify-center p-8 bg-light-surface dark:bg-dark-surface"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-center">
                        당신의 아이디어를 현실로 만들 준비가 되었습니다
                    </h1>
                    <h2 className="text-xl md:text-2xl mt-4 text-center">
                        새로운 가능성의 시작, 지금 바로 연락하세요
                    </h2>
                    <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg text-center space-y-2">
                        <p>💬 24시간 이내 답변 보장</p>
                        <p>☕ 무료 상담으로 시작</p>
                        <p>🚀 빠른 프로토타입 제작</p>
                    </div>
                    <p className="mt-6 max-w-xl text-center">
                        작은 아이디어든 큰 프로젝트든,<br />
                        모든 것은 첫 번째 대화에서 시작됩니다.<br />
                        지금 바로 연락하세요!
                    </p>
                    <div className="mt-8 flex space-x-4">
                        <a
                            href="tel:010-XXXX-XXXX"
                            className="px-6 py-3 bg-blue-600 text-white rounded hover:shadow-lg transition-shadow"
                        >
                            📞 지금 연락하기
                        </a>
                        <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded hover:shadow-lg transition-shadow">
                            💬 채팅상담
                        </button>
                    </div>
                </section>

                {/* 2. 온라인 명함 섹션 */}
                <section id="business-card" className="py-16 px-8">
                    <div className="max-w-md mx-auto bg-white/50 dark:bg-gray-700/50 p-8 rounded-lg shadow-lg text-center space-y-4">
                        <h3 className="text-2xl font-bold">NQ Solution Digital Business Card</h3>
                        <p>🏢 NQ Solution</p>
                        <p>💡 "Next, Query our Solution"</p>
                        <p>👨‍💻 대표: [이름]</p>
                        <p>📧 contact@nqsolution.com</p>
                        <p>📱 010-XXXX-XXXX</p>
                        <p>🌐 www.nqsolution.com</p>
                        <p>📍 서울특별시 강남구</p>
                        <div className="mt-4 bg-white p-4 rounded-lg">
                            {/* QR 코드 이미지 또는 컴포넌트 */}
                            <p>QR코드 - 연락처 저장</p>
                        </div>
                        <div className="mt-4 flex justify-center space-x-4">
                            <button className="px-4 py-2 border rounded">💾 연락처 저장</button>
                            <button className="px-4 py-2 border rounded">📤 카카오톡 공유</button>
                            <button className="px-4 py-2 border rounded">📄 vCard 다운로드</button>
                        </div>
                    </div>
                </section>

                {/* 3. 터미널 문의 폼 섹션 */}
                <section id="terminal-form" className="py-16 px-8 bg-light-surface dark:bg-dark-surface">
                    <div className="max-w-lg mx-auto">
                        <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg font-mono">
                            <p>user@nqsolution:~$ start_new_project</p>
                            <form className="mt-4 space-y-4">
                                <div>
                                    <label className="block">성함을 입력하세요:</label>
                                    <input className="w-full border p-2 rounded" type="text" placeholder="홍길동" />
                                </div>
                                <div>
                                    <label className="block">이메일 주소:</label>
                                    <input className="w-full border p-2 rounded" type="email" placeholder="hong@example.com" />
                                </div>
                                <div>
                                    <label className="block">연락처 (선택):</label>
                                    <input className="w-full border p-2 rounded" type="text" placeholder="010-1234-5678" />
                                </div>
                                {/* 추가 입력 필드 생략 */}
                                <button type="submit" className="mt-4 px-6 py-3 bg-blue-600 text-white rounded">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* 4. 다양한 연락 방법 섹션 */}
                <section id="channels" className="py-16 px-8">
                    <h2 className="text-3xl font-bold text-center">가장 편한 방법으로 연락하세요</h2>
                    <p className="mt-2 text-center">4가지 소통 채널로 언제든 접근 가능</p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className="p-6 bg-white/50 dark:bg-gray-700/50 rounded-lg shadow">
                            <h3 className="text-xl font-semibold">📧 이메일 상담</h3>
                            <p className="mt-2 italic">자세하고 체계적인 상담</p>
                            <ul className="mt-2 list-disc list-inside space-y-1">
                                <li>24시간 이내 상세 답변 보장</li>
                                <li>포트폴리오 및 견적서 함께 제공</li>
                                <li>모든 내용이 기록으로 남음</li>
                            </ul>
                            <button className="mt-4 px-4 py-2 border rounded">이메일하기</button>
                        </div>
                        {/* Phone */}
                        <div className="p-6 bg-white/50 dark:bg-gray-700/50 rounded-lg shadow">
                            <h3 className="text-xl font-semibold">📞 전화 상담</h3>
                            <p className="mt-2 italic">즉시 해결, 빠른 소통</p>
                            <ul className="mt-2 list-disc list-inside space-y-1">
                                <li>평일 09:00-18:00 실시간 상담</li>
                                <li>주말/공휴일 응급 상담 가능</li>
                                <li>복잡한 내용도 대화로 쉽게 해결</li>
                            </ul>
                            <button className="mt-4 px-4 py-2 border rounded">전화걸기</button>
                        </div>
                        {/* Chat */}
                        <div className="p-6 bg-white/50 dark:bg-gray-700/50 rounded-lg shadow">
                            <h3 className="text-xl font-semibold">💬 실시간 채팅</h3>
                            <p className="mt-2 italic">간단한 궁금증 즉시 해결</p>
                            <ul className="mt-2 list-disc list-inside space-y-1">
                                <li>@nqsolution</li>
                                <li>평일 실시간 응답 (평균 5분 이내)</li>
                                <li>빠른 확인에 최적화</li>
                            </ul>
                            <button className="mt-4 px-4 py-2 border rounded">채팅시작</button>
                        </div>
                        {/* Offline */}
                        <div className="p-6 bg-white/50 dark:bg-gray-700/50 rounded-lg shadow">
                            <h3 className="text-xl font-semibold">🏢 오프라인 미팅</h3>
                            <p className="mt-2 italic">직접 만나는 진솔한 대화</p>
                            <ul className="mt-2 list-disc list-inside space-y-1">
                                <li>서울 강남구 NQ Solution 사무실</li>
                                <li>고객사 직접 방문 상담 가능</li>
                                <li>사전 예약 필수 (2일 전)</li>
                            </ul>
                            <button className="mt-4 px-4 py-2 border rounded">미팅예약</button>
                        </div>
                    </div>
                    <p className="mt-6 text-center">
                        🤔 아이디어 단계 → 💬 채팅상담&nbsp;|&nbsp;
                        📋 구체적 계획 → 📧 이메일상담&nbsp;|&nbsp;
                        ⚡ 급한 문의 → 📞 전화상담&nbsp;|&nbsp;
                        🎯 중요한 프로젝트 → 🏢 오프라인미팅
                    </p>
                </section>

                {/* 5. 문의 가이드 섹션 */}
                <section id="inquiry-guide" className="py-16 px-8 bg-light-surface dark:bg-dark-surface">
                    <h2 className="text-3xl font-bold text-center">더 나은 상담을 위한 가이드</h2>
                    <p className="mt-2 text-center text-lg">미리 준비하시면 더 정확하고 빠른 상담이 가능합니다</p>
                    <div className="mt-8 max-w-3xl mx-auto space-y-6">
                        {/* 체크리스트 */}
                        {[
                            {
                                title: '🎯 프로젝트 목적 파악',
                                question: 'Q: 왜 이 프로젝트가 필요한가요?',
                                tips: [
                                    '해결하려는 문제가 무엇인지',
                                    '어떤 결과를 기대하는지',
                                    '성공의 기준은 무엇인지',
                                ],
                            },
                            {
                                title: '👥 타겟 사용자 정의',
                                question: 'Q: 누가 사용할 서비스인가요?',
                                tips: [
                                    '주 사용자의 연령대, 성별, 직업',
                                    '사용자의 기술 수준',
                                    '모바일 vs 데스크톱 선호도',
                                ],
                            },
                            {
                                title: '🔍 참고 자료 준비',
                                question: 'Q: 어떤 스타일을 원하시나요?',
                                tips: [
                                    '마음에 드는 사이트/앱 3-5개',
                                    '원하는 색상이나 느낌',
                                    '피하고 싶은 디자인 스타일',
                                ],
                            },
                            {
                                title: '⚙️ 필수 기능 정리',
                                question: 'Q: 꼭 필요한 기능은 무엇인가요?',
                                tips: [
                                    '핵심 기능 vs 부가 기능 구분',
                                    '1단계, 2단계 기능 우선순위',
                                    '유사 서비스 대비 차별점',
                                ],
                            },
                            {
                                title: '💰 예산과 일정 계획',
                                question: 'Q: 언제까지 얼마의 예산으로?',
                                tips: [
                                    '현실적인 예산 범위 설정',
                                    '런칭 희망 일정',
                                    '단계별 개발 가능 여부',
                                ],
                            },
                            {
                                title: '🔗 연동 시스템 확인',
                                question: 'Q: 기존 시스템과 연동이 필요한가요?',
                                tips: [
                                    '현재 사용 중인 프로그램들',
                                    '데이터 이전 필요 여부',
                                    '제3자 서비스 연동 필요성',
                                ],
                            },
                        ].map((item) => (
                            <details key={item.title} className="bg-white/50 dark:bg-gray-700/50 p-4 rounded-lg">
                                <summary className="font-semibold cursor-pointer">{item.title}</summary>
                                <p className="mt-2">{item.question}</p>
                                <ul className="mt-2 list-disc list-inside space-y-1">
                                    {item.tips.map((tip) => <li key={tip}>{tip}</li>)}
                                </ul>
                            </details>
                        ))}
                    </div>

                    {/* FAQ */}
                    <div className="mt-12 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4">자주 묻는 질문</h3>
                        {[
                            { q: '견적은 어떻게 받을 수 있나요?', a: '무료 상담 후 1-2일 내 맞춤 견적서를 제공합니다. 정확한 견적을 위해 체크리스트를 참고해 주세요.' },
                            { q: '개발 기간은 얼마나 걸리나요?', a: '프로젝트 규모에 따라 2주~3개월이며, 평균 6-8주입니다. 복잡도와 기능 수에 따라 달라집니다.' },
                            { q: '중간에 수정이 가능한가요?', a: '각 단계별 피드백을 받아 수정합니다. 기획 단계: 무제한 수정 / 개발 단계: 3회 무료 수정' },
                            { q: '유지보수는 어떻게 되나요?', a: '런칭 후 1개월 무료 지원 제공, 이후 월/연 단위 유지보수 계약 가능합니다.' },
                            { q: '디자인도 함께 해주시나요?', a: 'UI/UX 디자인부터 개발까지 원스톱 서비스 제공합니다. 디자인 시안은 3안까지 제시해드립니다.' },
                            { q: '모바일 최적화는 기본인가요?', a: '모든 프로젝트에서 반응형 웹을 기본으로 제공합니다. 모바일 우선 설계로 최적의 사용자 경험을 보장합니다.' },
                        ].map((item) => (
                            <details key={item.q} className="mt-2 bg-white/50 dark:bg-gray-700/50 p-4 rounded-lg">
                                <summary className="font-semibold cursor-pointer">{item.q}</summary>
                                <p className="mt-2">{item.a}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* 6. 선택 이유 섹션 */}
                <section id="reasons" className="py-16 px-8">
                    <h2 className="text-3xl font-bold text-center">왜 NQ Solution을 선택해야 할까요?</h2>
                    <p className="mt-2 text-center text-lg">5가지 명확한 이유가 있습니다</p>
                    <div className="mt-8 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: '🚀 압도적인 속도',
                                desc: '24시간 답변, 48시간 프로토타입 (애자일 방식으로 빠른 개발 진행)',
                                example: 'A사 홈페이지, 상담 후 3일 만에 초안 완성',
                            },
                            {
                                title: '🎯 완전 맞춤형 솔루션',
                                desc: '템플릿 사용 없이 100% 맞춤 개발 (비즈니스 모델 완벽 반영)',
                                example: '업종별 차별화된 설계 제공',
                            },
                            {
                                title: '💰 투명하고 합리적 가격',
                                desc: '숨겨진 비용 Zero, 단계별 상세 견적 제공',
                                example: '초기 견적=최종 견적, 추가 비용 없음',
                            },
                            {
                                title: '🤝 평생 파트너십',
                                desc: '런칭 후 1개월 무료 지원 및 장기적 호환 유지',
                                example: '5년 후에도 함께하는 고객들',
                            },
                            {
                                title: '📊 검증된 기술력',
                                desc: 'React, Next.js, Python 등 최신 스택 사용',
                                example: '안정적이고 확장 가능한 시스템 제공',
                            },
                        ].map((item) => (
                            <div key={item.title} className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg">
                                <h3 className="font-semibold mb-1">{item.title}</h3>
                                <p>{item.desc}</p>
                                <p className="mt-2 italic">{item.example}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. 최종 CTA 섹션 */}
                <section id="final-cta" className="py-16 px-8 bg-light-surface dark:bg-dark-surface text-center">
                    <h2 className="text-3xl font-bold">지금이 바로 시작할 때입니다</h2>
                    <div className="mt-6 max-w-3xl mx-auto p-6 bg-white/50 dark:bg-gray-700/50 rounded-lg space-y-4">
                        <p>
                            세상을 바꿀 아이디어가 있으시다면,<br />
                            NQ Solution이 그 아이디어를 현실로 만들어드리겠습니다.
                        </p>
                        <p>
                            💭 '언젠가는 해야지'라고 생각하고 계신가요?<br />
                            ⏰ 그 '언젠가'가 바로 지금입니다.
                        </p>
                        <p>망설이는 시간도 비용입니다. 다음 단계로 나아갈 준비가 되셨다면, 지금 바로 연락하세요!</p>
                        <p className="font-semibold">⚡ 이번 달 상담 신청 시 특별 혜택: 프로젝트 기획서 무료 제작 · 경쟁사 분석 리포트 제공 · 기술 컨설팅 1회 무료 (월 10팀 한정)</p>
                        <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:shadow-lg transition-shadow">
                            Next, Query our Solution!
                        </button>
                    </div>
                </section>
            </div>
        </main>
    )
}