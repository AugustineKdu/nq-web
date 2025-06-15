import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

interface ContactMethod {
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    features: string[];
    action: string;
    best: string;
}

interface FAQ {
    question: string;
    answer: string;
}

const ContactPage: NextPage = () => {
    const [activeMethod, setActiveMethod] = useState<string>('email');
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [copyMessage, setCopyMessage] = useState<string>('');

    const contactMethods: ContactMethod[] = [
        {
            id: 'email',
            icon: '📧',
            title: '이메일 문의',
            subtitle: '자세하고 체계적인 상담',
            features: ['24시간 이내 상세 답변', '포트폴리오 및 견적서 제공', '모든 내용 기록 보존'],
            action: 'contact@nqsolution.com',
            best: '상세한 프로젝트 설명이 필요할 때'
        },
        {
            id: 'call',
            icon: '📞',
            title: '전화 상담',
            subtitle: '즉시 해결, 빠른 소통',
            features: ['평일 09:00-18:00', '주말/공휴일 긴급 상담', '실시간 문제 해결'],
            action: '02-1234-5678',
            best: '급한 문의나 즉시 답변이 필요할 때'
        },
        {
            id: 'chat',
            icon: '💬',
            title: '카카오톡 문의',
            subtitle: '간편하고 친근한 대화',
            features: ['실시간 응답 (평균 5분)', '이미지/파일 공유 가능', '편안한 대화 형식'],
            action: 'https://open.kakao.com/o/example',
            best: '간단한 문의나 빠른 확인이 필요할 때'
        }
    ];

    const faqs: FAQ[] = [
        {
            question: '견적은 어떻게 받을 수 있나요?',
            answer: '무료 상담 후 1-2일 내에 상세한 맞춤 견적서를 제공합니다. 프로젝트 규모와 요구사항에 따라 정확한 비용을 산정해드립니다.'
        },
        {
            question: '개발 기간은 얼마나 걸리나요?',
            answer: '프로젝트 규모에 따라 2주~3개월이며, 일반적인 웹사이트는 4-6주, 복잡한 플랫폼은 8-12주 정도 소요됩니다.'
        },
        {
            question: '개발 중 수정이 가능한가요?',
            answer: '물론입니다! 기획 단계에서는 무제한 수정, 디자인 단계 3회, 개발 단계 2회 무료 수정을 제공합니다.'
        },
        {
            question: '유지보수는 어떻게 되나요?',
            answer: '런칭 후 1개월간 무료 유지보수를 제공하며, 이후 월 단위 또는 건별 유지보수 계약이 가능합니다.'
        }
    ];

    const copyToClipboard = async (text: string, type: string): Promise<void> => {
        try {
            await navigator.clipboard.writeText(text);
            setCopyMessage(`${type}이(가) 복사되었습니다!`);
            setTimeout(() => setCopyMessage(''), 3000);
        } catch (err) {
            console.error('복사 실패:', err);
        }
    };

    const handleContactAction = (method: ContactMethod): void => {
        if (method.id === 'email') {
            copyToClipboard(method.action, '이메일');
        } else if (method.id === 'call') {
            copyToClipboard(method.action, '전화번호');
        } else if (method.id === 'chat') {
            window.open(method.action, '_blank');
        }
    };

    return (
        <>
            <Head>
                <title>문의하기 - NQ Solution</title>
                <meta name="description" content="NQ Solution에 프로젝트를 문의하세요. 이메일, 전화, 카카오톡으로 상담 가능합니다." />
            </Head>

            {/* Copy Message Toast */}
            {copyMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
                    {copyMessage}
                </div>
            )}

            {/* Hero Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="badge">Next, Query our Solution</span>
                        <h1 className="mt-4 mb-6">
                            당신의 아이디어를<br />
                            <span className="gradient-text">현실로 만들 준비가 되었습니다</span>
                        </h1>
                        <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
                            새로운 가능성의 시작, 지금 바로 연락하세요
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center mb-12">
                            <a href="mailto:contact@nqsolution.com" className="btn btn-primary">
                                <span>📧</span> 이메일 문의하기
                            </a>
                            <a href="tel:02-1234-5678" className="btn btn-secondary">
                                <span>📞</span> 전화 문의하기
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="card p-6 text-center">
                                <span className="text-3xl mb-3 block">💬</span>
                                <h3 className="text-lg mb-2">24시간 이내 답변</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    빠른 응답으로 프로젝트 진행
                                </p>
                            </div>
                            <div className="card p-6 text-center">
                                <span className="text-3xl mb-3 block">☕</span>
                                <h3 className="text-lg mb-2">무료 상담 제공</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    첫 상담은 부담 없이
                                </p>
                            </div>
                            <div className="card p-6 text-center">
                                <span className="text-3xl mb-3 block">🚀</span>
                                <h3 className="text-lg mb-2">빠른 프로토타입</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    아이디어를 신속하게 구현
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Methods Section */}
            <section className="section-padding bg-gray-50 dark:bg-gray-950">
                <div className="container">
                    <div className="text-center mb-12">
                        <span className="badge">연락 방법</span>
                        <h2 className="mt-4 mb-4">가장 편한 방법으로 연락하세요</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            3가지 소통 채널로 개발 상담을 받아보세요
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Tab Navigation */}
                        <div className="flex flex-wrap justify-center gap-2 bg-gray-200 dark:bg-gray-900 p-1 rounded-xl mb-8">
                            {contactMethods.map(method => (
                                <button
                                    key={method.id}
                                    className={`flex-1 min-w-fit px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeMethod === method.id
                                            ? 'bg-white dark:bg-[#2563eb] text-gray-900 dark:text-white shadow'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                    onClick={() => setActiveMethod(method.id)}
                                >
                                    <span className="mr-2">{method.icon}</span>
                                    <span className="hidden sm:inline">{method.title}</span>
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        {contactMethods.map(method => {
                            if (activeMethod !== method.id) return null;

                            return (
                                <div key={method.id} className="card animate-fade-in">
                                    <div className="p-6 bg-gradient-to-r from-blue-50 dark:from-gray-800/50 to-purple-50 dark:to-gray-700/50">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-2xl mb-2 flex items-center gap-2">
                                                    <span>{method.icon}</span>
                                                    {method.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    {method.subtitle}
                                                </p>
                                            </div>
                                            <span className="badge bg-white dark:bg-gray-900 text-gray-600 dark:text-[#2dd4bf]">
                                                추천 용도
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        <div>
                                            <h4 className="font-semibold mb-3">주요 특징</h4>
                                            <ul className="space-y-2">
                                                {method.features.map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        <span className="text-[#22c55e]">✓</span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-3">이럴 때 좋아요</h4>
                                            <p className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                                {method.best}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-3">연락처</h4>
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono">
                                                    {method.action}
                                                </div>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleContactAction(method)}
                                                >
                                                    {method.id === 'call' ? '복사' :
                                                        method.id === 'chat' ? '톡방 바로가기' : '복사'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Inquiry Guide Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="text-center mb-12">
                        <span className="badge">문의 안내</span>
                        <h2 className="mt-4 mb-4">효과적인 문의 방법</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            구체적인 정보를 제공해주실수록 더 정확하고 빠른 상담이 가능합니다
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="card p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                        <span>💻</span> 웹 개발 문의 시
                                    </h4>
                                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#22c55e] mt-1">•</span>
                                            <span>프로젝트 목적 및 목표</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#22c55e] mt-1">•</span>
                                            <span>필요한 기능 목록</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#22c55e] mt-1">•</span>
                                            <span>예상 예산 범위</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#22c55e] mt-1">•</span>
                                            <span>완료 희망 일정</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#22c55e] mt-1">•</span>
                                            <span>참고 사이트나 디자인</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                        <span>📱</span> 앱 개발 문의 시
                                    </h4>
                                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#22c55e] mt-1">•</span>
                                            <span>플랫폼 (iOS/Android/크로스)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#22c55e] mt-1">•</span>
                                            <span>앱의 주요 기능</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#22c55e] mt-1">•</span>
                                            <span>타겟 사용자층</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#22c55e] mt-1">•</span>
                                            <span>수익 모델 (유료/무료/광고)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#22c55e] mt-1">•</span>
                                            <span>기존 유사 앱 레퍼런스</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h4 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-300 flex items-center gap-2">
                                    <span>💡</span> 문의 팁
                                </h4>
                                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                                    구체적인 정보를 제공해주실수록 더 정확하고 빠른 상담이 가능합니다.
                                    기획서나 와이어프레임이 있다면 함께 공유해주세요.
                                    전문 개발팀이 고객님의 아이디어를 최적의 솔루션으로 구현해드립니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding bg-gray-50 dark:bg-gray-950">
                <div className="container">
                    <div className="text-center mb-12">
                        <span className="badge">FAQ</span>
                        <h2 className="mt-4">자주 묻는 질문</h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="card">
                                <button
                                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span className="font-medium">{faq.question}</span>
                                    <span className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 animate-slide-down">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Floating Action Button */}
            <button
                className="fixed bottom-6 right-6 w-16 h-16 gradient-bg text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
                aria-label="채팅 상담"
            >
                💬
            </button>
        </>
    );
};

export default ContactPage;