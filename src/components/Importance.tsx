// src/components/Importance.tsx
export default function Importance() {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-center">
                왜 지금 웹사이트가 필요할까요?
            </h2>
            <p className="text-center text-xl">
                디지털 시대, 온라인이 곧 비즈니스입니다
            </p>
            <ul className="space-y-4">
                {[
                    '✓ 현대 소비자의 90% 이상이 구매 전 온라인에서 정보를 검색',
                    '✓ 24시간 일하는 영업사원 – 당신이 잠든 사이에도 고객을 맞이',
                    '✓ 신뢰도 향상 – 전문적인 웹사이트로 브랜드 가치 상승',
                    '✓ 비용 효율적인 마케팅 – 전단지보다 적은 비용으로 더 많은 고객 도달',
                ].map(point => (
                    <li key={point} className="flex items-start space-x-2">
                        <span className="text-2xl leading-none">✔️</span>
                        <span>{point.replace(/^✓ /, '')}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}