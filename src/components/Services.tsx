// src/components/Services.tsx
export default function Services() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 text-center">
            <h2 className="text-3xl font-bold">우리의 솔루션</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="p-6 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg hover:scale-105 transition-transform">
                    <div className="text-4xl mb-4">💼</div>
                    <h3 className="font-semibold mb-2">맞춤형 외주 개발</h3>
                    <p>고객의 요구사항에 완벽히 맞춘 개발 서비스</p>
                </div>
                <div className="p-6 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg hover:scale-105 transition-transform">
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="font-semibold mb-2">자체 서비스 개발</h3>
                    <p>혁신적인 웹&앱 서비스 기획부터 런칭까지</p>
                </div>
                <div className="p-6 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg hover:scale-105 transition-transform">
                    <div className="text-4xl mb-4">💡</div>
                    <h3 className="font-semibold mb-2">기술 컨설팅</h3>
                    <p>최신 기술 트렌드와 최적의 솔루션 제안</p>
                </div>
            </div>
        </div>
    )
}
