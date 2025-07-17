import React, { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        project: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('문의가 접수되었습니다. 24시간 내에 연락드리겠습니다.');
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20">
                        <p className="text-sm tracking-[0.3em] text-neutral-500 dark:text-neutral-400 uppercase mb-8">
                            Contact Us
                        </p>
                        <h1 className="text-[clamp(3rem,8vw,6rem)] font-light leading-[0.9] tracking-tighter mb-8">
                            Let's talk
                        </h1>
                        <div className="w-full h-px bg-neutral-900 dark:bg-neutral-100" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <p className="text-2xl font-light leading-relaxed mb-8">
                                프로젝트에 대해 이야기해보세요.
                                작은 아이디어부터 큰 비전까지,
                                함께 현실로 만들어갑니다.
                            </p>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400">
                                24시간 내에 답변드립니다.
                            </p>
                        </div>
                        <div>
                            <div className="space-y-8">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">Email</p>
                                    <p className="text-lg">hello@nqsolution.com</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">Phone</p>
                                    <p className="text-lg">+82 10-1234-5678</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">Office</p>
                                    <p className="text-lg">Seoul, South Korea</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* FAQ Section */}
            <section className="py-20 px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-light mb-16">자주 묻는 질문</h2>

                    <div className="space-y-12">
                        {[
                            {
                                q: "프로젝트는 얼마나 걸리나요?",
                                a: "프로젝트의 규모와 복잡도에 따라 다르지만, 일반적으로 웹사이트는 2-4주, 앱은 4-8주 정도 소요됩니다."
                            },
                            {
                                q: "비용은 어떻게 책정되나요?",
                                a: "프로젝트의 범위, 기능, 디자인 복잡도 등을 고려하여 견적을 산출합니다. 무료 상담을 통해 정확한 견적을 받아보세요."
                            },
                            {
                                q: "유지보수도 가능한가요?",
                                a: "네, 프로젝트 완료 후에도 지속적인 유지보수와 업데이트 서비스를 제공합니다."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="border-b border-neutral-200 dark:border-neutral-800 pb-8">
                                <h3 className="text-xl font-light mb-4">{faq.q}</h3>
                                <p className="text-neutral-600 dark:text-neutral-400">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}