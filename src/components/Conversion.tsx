// src/components/Conversion.tsx
export default function Conversion() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-center">
                오프라인에서 온라인으로, 왜 전환해야 할까요?
            </h2>
            <p className="text-center text-xl mb-6">
                코로나19 이후 바뀐 소비 패턴
            </p>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-1/2 p-4">
                    <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg">
                        <h3 className="font-semibold mb-2">오프라인</h3>
                        <ul className="space-y-2">
                            <li>🏪 지역적 한계</li>
                            <li>⏰ 운영시간 제약</li>
                            <li>🔧 수동 업무</li>
                            <li>❔ 추측 기반</li>
                        </ul>
                    </div>
                </div>
                <div className="text-4xl font-bold my-4">→</div>
                <div className="w-full md:w-1/2 p-4">
                    <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg">
                        <h3 className="font-semibold mb-2">온라인</h3>
                        <ul className="space-y-2">
                            <li>🌐 전국/전세계 고객 접근</li>
                            <li>🕒 365일 24시간 운영</li>
                            <li>⚙️ 자동화를 통한 효율성</li>
                            <li>📊 데이터 기반 의사결정</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}