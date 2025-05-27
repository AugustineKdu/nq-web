// src/components/Home_Hero.tsx
export default function Hero() {
    return (
        <div className="max-w-5xl mx-auto py-16 px-4 md:flex md:items-center md:justify-between md:gap-8">
            {/* 텍스트 영역 (왼쪽) */}
            <div className="md:w-1/2 space-y-6 text-left">
                <h1 className="text-5xl font-bold">
                    다음 단계로 나아갈 준비가 되셨나요?
                </h1>
                <h2 className="text-2xl">
                    NQ Solution과 함께 망설임 없이 시작하세요
                </h2>
                <p className="text-lg">
                    혁신적인 웹&앱 개발 솔루션으로 당신의 비즈니스를 다음 레벨로
                </p>
                <div>
                    <button className="px-6 py-3 border border-light-primary dark:border-dark-primary rounded">
                        상담 문의
                    </button>
                </div>
            </div>
            {/* 코드 스니펫 영역 (오른쪽) */}
            <pre className="mt-8 md:mt-0 md:w-1/2 text-left bg-gray-100 dark:bg-gray-800 p-6 rounded font-mono text-white">
                {' \n> 🚀 Ready!\n> 🚀 Ready!\n> npx create-next-project\n> git commit -m "Next step with NQ"\n> 🚀 Ready!'}
            </pre>
        </div>
    )
}