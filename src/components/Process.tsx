// src/components/Process.tsx
import { useState } from 'react'

export default function Process() {
    const steps = [
        { title: '요구사항 분석 (1주)', items: ['비즈니스 목표 분석', '타겟 사용자 정의', '기능 요구사항 정리'] },
        { title: '기획 및 설계 (1–2주)', items: ['와이어프레임 제작', 'UI/UX 디자인', '시스템 아키텍처 설계'] },
        { title: '개발 (2–6주)', items: ['프론트엔드 개발', '백엔드 개발', '데이터베이스 구축'] },
        { title: '테스팅 (1주)', items: ['기능 테스트', '성능 테스트', '보안 테스트'] },
        { title: '배포 및 런칭 (3–5일)', items: ['서버 배포', '도메인 연결', '사후 지원'] },
    ]
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-center">
                NQ Solution의 개발 과정
            </h2>
            <div className="space-y-4">
                {steps.map((step, i) => (
                    <div key={step.title}>
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full text-left p-4 bg-light-surface dark:bg-dark-surface rounded shadow-sm flex justify-between items-center"
                        >
                            <span>{`${i + 1}. ${step.title}`}</span>
                            <span>{openIndex === i ? '−' : '+'}</span>
                        </button>
                        {openIndex === i && (
                            <ul className="pl-6 mt-2 space-y-1">
                                {step.items.map(item => (
                                    <li key={item}>• {item}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}