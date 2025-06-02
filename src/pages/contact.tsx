import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout';

const ContactPage: NextPage = () => {
    const [activeMethod, setActiveMethod] = useState('email');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
    });
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const contactMethods = [
        {
            id: 'email',
            icon: '📧',
            title: '이메일 상담',
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
            action: '010-XXXX-XXXX',
            best: '급한 문의나 즉시 답변이 필요할 때'
        },
        {
            id: 'chat',
            icon: '💬',
            title: '카카오톡 채팅',
            subtitle: '간편하고 친근한 대화',
            features: ['실시간 응답 (평균 5분)', '이미지/파일 공유 가능', '편안한 대화 형식'],
            action: '@nqsolution',
            best: '간단한 문의나 빠른 확인이 필요할 때'
        },
        {
            id: 'meeting',
            icon: '🏢',
            title: '오프라인 미팅',
            subtitle: '직접 만나는 진솔한 대화',
            features: ['강남 사무실 또는 방문 상담', '상세한 프레젠테이션', '즉석 아이디어 스케치'],
            action: '미팅 예약하기',
            best: '중요한 프로젝트나 장기 협업 논의'
        }
    ];

    const faqs = [
        {
            question: '견적은 어떻게 받을 수 있나요?',
            answer: '무료 상담 후 1-2일 내에 상세한 맞춤 견적서를 제공합니다.'
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <Layout title="문의하기 - NQ Solution">
            {/* Hero Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="badge bg-blue-100 text-blue-800">Next, Query our Solution</span>
                        <h1 className="mt-4 mb-6">
                            당신의 아이디어를<br />
                            <span className="gradient-text">현실로 만들 준비가 되었습니다</span>
                        </h1>
                        <p className="text-2xl text-gray-600 mb-8">새로운 가능성의 시작, 지금 바로 연락하세요</p>

                        <div className="flex flex-wrap gap-4 justify-center mb-12">
                            <a href="mailto:contact@nqsolution.com" className="btn btn-primary">
                                <span>📧</span> 이메일 문의하기
                            </a>
                            <a href="tel:010-XXXX-XXXX" className="btn btn-secondary">
                                <span>📞</span> 전화 문의하기
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="card p-6 text-center">
                                <span className="text-3xl mb-3 block">💬</span>
                                <h3 className="text-lg mb-2">24시간 이내 답변</h3>
                                <p className="text-sm text-gray-600">빠른 응답으로 프로젝트 진행</p>
                            </div>
                            <div className="card p-6 text-center">
                                <span className="text-3xl mb-3 block">☕</span>
                                <h3 className="text-lg mb-2">무료 상담 제공</h3>
                                <p className="text-sm text-gray-600">첫 상담은 부담 없이</p>
                            </div>
                            <div className="card p-6 text-center">
                                <span className="text-3xl mb-3 block">🚀</span>
                                <h3 className="text-lg mb-2">빠른 프로토타입</h3>
                                <p className="text-sm text-gray-600">아이디어를 신속하게 구현</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="section-padding bg-gray-50">
                <div className="container">
                    <div className="text-center mb-12">
                        <span className="badge bg-blue-100 text-blue-800">연락 방법</span>
                        <h2 className="mt-4 mb-4">가장 편한 방법으로 연락하세요</h2>
                        <p className="text-xl text-gray-600">4가지 소통 채널로 언제든 접근 가능합니다</p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-2 bg-gray-200 p-1 rounded-xl mb-8">
                            {contactMethods.map(method => (
                                <button
                                    key={method.id}
                                    className={`flex-1 min-w-fit px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeMethod === method.id
                                        ? 'bg-white text-gray-900 shadow'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    onClick={() => setActiveMethod(method.id)}
                                >
                                    <span className="mr-2">{method.icon}</span>
                                    <span className="hidden sm:inline">{method.title}</span>
                                </button>
                            ))}
                        </div>

                        {contactMethods.map(method => {
                            if (activeMethod !== method.id) return null;

                            return (
                                <div key={method.id} className="card animate-fade-in">
                                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-2xl mb-2 flex items-center gap-2">
                                                    <span>{method.icon}</span>
                                                    {method.title}
                                                </h3>
                                                <p className="text-gray-600">{method.subtitle}</p>
                                            </div>
                                            <span className="badge bg-white text-gray-600">추천 용도</span>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        <div>
                                            <h4 className="font-semibold mb-3">주요 특징</h4>
                                            <ul className="space-y-2">
                                                {method.features.map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        <span className="text-green-500">✓</span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-3">이럴 때 좋아요</h4>
                                            <p className="p-4 bg-gray-100 rounded-lg">{method.best}</p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-3">연락처</h4>
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 p-3 bg-gray-100 rounded-lg font-mono">
                                                    {method.action}
                                                </div>
                                                <button className="btn btn-primary">
                                                    {method.id === 'call' ? '전화걸기' : method.id === 'meeting' ? '예약하기' : '복사'}
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

            {/* Inquiry Form */}
            <section className="section-padding">
                <div className="container">
                    <div className="text-center mb-12">
                        <span className="badge bg-purple-100 text-purple-800">프로젝트 문의</span>
                        <h2 className="mt-4 mb-4">당신의 프로젝트를 소개해 주세요</h2>
                        <p className="text-xl text-gray-600">간단한 정보만 입력하시면 맞춤형 상담을 제공해 드립니다</p>
                    </div>

                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto card p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">이름</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="홍길동"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">이메일</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="example@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">연락처 (선택)</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="010-0000-0000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">프로젝트 유형</label>
                                <select
                                    value={formData.projectType}
                                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">선택하세요</option>
                                    <option value="web">웹 개발</option>
                                    <option value="app">앱 개발</option>
                                    <option value="design">UI/UX 디자인</option>
                                    <option value="consulting">기술 컨설팅</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">프로젝트 설명</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="프로젝트에 대한 간략한 설명을 적어주세요..."
                                rows={5}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">제출 후 24시간 이내 답변을 드립니다</p>
                            <button type="submit" className="btn btn-primary">제출하기</button>
                        </div>
                    </form>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-padding bg-gray-50">
                <div className="container">
                    <div className="text-center mb-12">
                        <span className="badge bg-gray-200 text-gray-800">FAQ</span>
                        <h2 className="mt-4">자주 묻는 질문</h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="card">
                                <button
                                    className="w-full p-6 text-left flex items-center justify-between"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span className="font-medium">{faq.question}</span>
                                    <span className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-6 text-gray-600 animate-slide-down">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Floating Action Button */}
            <button className="fixed bottom-6 right-6 w-16 h-16 gradient-bg text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center">
                💬
            </button>
        </Layout>
    );
};

export default ContactPage;