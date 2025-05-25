// src/components/Hero.tsx
export default function Hero() {
    return (
        <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold">
                다음 단계로 나아갈 준비가 되셨나요?
            </h1>
            <h2 className="text-2xl">
                NQ Solution과 함께 망설임 없이 시작하세요
            </h2>
            <p className="text-lg">
                혁신적인 웹&앱 개발 솔루션으로 당신의 비즈니스를 다음 레벨로
            </p>
            <div className="flex justify-center space-x-4">
                <button className="px-6 py-3 bg-light-primary dark:bg-dark-primary text-white rounded">
                    시작하기
                </button>
                <button className="px-6 py-3 border border-light-primary dark:border-dark-primary rounded">
                    상담 문의
                </button>
            </div>
            <pre className="mt-8 text-left bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono">
                {'> npx create-next-project\n> git commit -m "Next step with NQ"\n> 🚀 Ready!'}
            </pre>
        </div>
    )
}