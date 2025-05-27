// src/components/Process.tsx
// src/components/Process.tsx
'use client'
import React, { useState } from 'react'

export default function Process() {
    // 단계 데이터 정의
    const steps = [
        {
            key: '요구사항_분석',
            short: '요구사항 분석',
            duration: '1주',
            title: '완벽한 이해가 성공의 시작',
            points: [
                '비즈니스 목표 및 타겟 사용자 정의',
                '경쟁사 분석 및 차별화 포인트 발굴',
                '기능 명세서 작성 및 우선순위 설정',
                '예산 및 일정 최종 확정',
            ],
            deliverable: '프로젝트 기획서, 기능 명세서',
        },
        {
            key: '기획_및_설계',
            short: '기획 및 설계',
            duration: '1–2주',
            title: '사용자가 사랑할 경험 설계',
            points: [
                'UX 설계 및 고객 여정 매핑',
                '와이어프레임 및 프로토타입 제작',
                'UI 디자인 시안 제작 (3안 제시)',
                '시스템 아키텍처 설계',
            ],
            deliverable: '디자인 시안, 프로토타입, 기술 설계서',
        },
        {
            key: '개발',
            short: '개발',
            duration: '2–6주',
            title: '아이디어가 현실이 되는 시간',
            points: [
                '프론트엔드 개발 (UI 구현)',
                '백엔드 개발 (서버 및 DB)',
                '반응형 웹 구현 (모바일 최적화)',
                '주간 진행 리포트 및 미팅',
            ],
            deliverable: '개발 완료된 웹사이트/앱',
        },
        {
            key: '테스팅',
            short: '테스팅',
            duration: '1주',
            title: '완벽을 위한 마지막 점검',
            points: [
                '기능 테스트 (정상 작동 확인)',
                '성능 테스트 (속도/안정성 검증)',
                '디바이스 호환성 테스트',
                '보안 및 개인정보 보호 검증',
            ],
            deliverable: '테스트 리포트, 버그 수정 완료',
        },
        {
            key: '배포_및_런칭',
            short: '배포 및 런칭',
            duration: '3–5일',
            title: '세상에 선보이는 순간',
            points: [
                '서버 환경 구축 및 도메인 연결',
                'SSL 보안 인증서 적용',
                'SEO 기본 설정',
                '런칭 후 1개월 무료 지원',
            ],
            deliverable: '정식 서비스 오픈, 운영 가이드',
        },
        {
            key: '완료_및_관리',
            short: '완료 및 관리',
            duration: '1달',
            title: '완료 후 안정적 관리 제공',
            points: [
                '1달간 유지 관리',
                '최대 2회 작은 수정 지원',
            ],
            deliverable: '유지 관리 완료 보고서',
        },
    ]

    const [activeKey, setActiveKey] = useState<string | null>(steps[0].key)

    return (
        <div className="max-w-5xl mx-auto py-16 px-4 space-y-8">
            {/* 제목 및 소개 */}
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">투명하고 체계적인 NQ Solution 개발 프로세스</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    처음부터 끝까지, 모든 과정을 함께 확인하세요
                </p>
                <p className="max-w-2xl mx-auto text-center">
                    복잡해 보이는 개발 과정을 5단계로 단순화했습니다.
                    각 단계마다 명확한 결과물과 함께 진행상황을 실시간으로 확인할 수 있습니다.
                </p>
                <p className="max-w-2xl mx-auto text-center">
                    프로젝트 규모와 원하는 시간에 따라 일정 조정이 가능합니다.
                </p>
            </div>

            {/* 타임라인: 가로 스크롤 가능 */}
            <div className="overflow-x-auto">
                <div className="flex items-center space-x-4 pb-4">
                    {steps.map((step, idx) => (
                        <React.Fragment key={step.key}>
                            <button
                                className={`w-28 flex-shrink-0 flex flex-col items-center px-4 py-2 rounded-lg border ${activeKey === step.key
                                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900'
                                    : 'border-gray-200 dark:border-gray-700'
                                    }`}
                                onClick={() => setActiveKey(step.key)}
                            >
                                <div className="text-xl font-bold mb-1">{idx + 1}</div>
                                <div className="text-sm">{step.short}</div>
                                <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">{step.duration}</div>
                            </button>
                            {idx < steps.length - 1 && (
                                <div className="w-8 h-px bg-gray-300 dark:bg-gray-600"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* 선택된 단계 상세 아코디언 */}
            <div className="space-y-4">
                {steps.map((step) =>
                    activeKey === step.key ? (
                        <div key={step.key} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-2">🎯 {step.title}</h3>
                            <ul className="list-disc list-inside space-y-1 mb-2 text-gray-700 dark:text-gray-300">
                                {step.points.map((pt) => (
                                    <li key={pt}>{pt}</li>
                                ))}
                            </ul>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                📋 결과물: {step.deliverable}
                            </p>
                        </div>
                    ) : null
                )}
            </div>

            {/* 진행률 표시바 */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded overflow-hidden">
                <div
                    className="h-full bg-blue-600"
                    style={{
                        width: `${((steps.findIndex((s) => s.key === activeKey) + 1) / steps.length) * 100}%`,
                    }}
                />
            </div>

            {/* 추가 서비스 아이콘 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                    '실시간 진행상황 공유',
                    '무제한 소통',
                    '중간 점검 및 피드백 반영',
                    '사후 지원 및 유지보수',
                ].map((item) => (
                    <div key={item} className="flex flex-col items-center space-y-1">
                        <span className="text-2xl">✅</span>
                        <span className="text-sm">{item}</span>
                    </div>
                ))}
            </div>

            {/* 신뢰 메시지 및 CTA */}
            <div className="text-center space-y-4">
                <p className="text-lg font-medium">
                    지금까지 <span className="font-bold text-blue-600">X개의 프로젝트</span>를 성공적으로 완료했습니다.
                    다음은 당신의 차례입니다.
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-full">
                    지금 시작하기
                </button>
            </div>
        </div>
    )
}