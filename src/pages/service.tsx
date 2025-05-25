// src/pages/service.tsx
export default function Service() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <ul className="list-disc list-inside space-y-2 text-lg">
                <li>맞춤형 외주 개발</li>
                <li>자체 서비스 기획·개발</li>
                <li>기술 컨설팅</li>
            </ul>
        </div>
    )
}