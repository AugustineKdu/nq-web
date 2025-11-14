import React from "react";
import Head from "next/head";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';

export default function Services() {
    const services = [
        {
            number: "01",
            title: "웹 개발",
            subtitle: "Web Development",
            description: "사용자 경험을 최우선으로 하는 반응형 웹사이트를 구축합니다. 최신 기술 스택을 활용하여 빠르고 안정적인 서비스를 제공합니다.",
            details: [
                "Frontend Development",
                "Backend Development",
                "Full-stack Solutions",
                "Performance Optimization"
            ],

        },
        {
            number: "02",
            title: "앱 개발",
            subtitle: "App Development",
            description: "iOS와 Android를 위한 네이티브 품질의 크로스플랫폼 앱을 개발합니다. 효율적인 개발과 유지보수가 가능합니다.",
            details: [
                "Cross-platform Apps",
                "Native Performance",
                "App Store Deployment",
                "Continuous Updates"
            ],

        },
        {
            number: "03",
            title: "UI/UX 디자인",
            subtitle: "UI/UX Design",
            description: "사용자 중심의 디자인으로 직관적이고 아름다운 인터페이스를 만듭니다. 브랜드 아이덴티티를 강화하는 디자인을 추구합니다.",
            details: [
                "User Research",
                "Interface Design",
                "Design System",
                "Prototyping"
            ],

        },
        {
            number: "04",
            title: "컨설팅",
            subtitle: "Consulting",
            description: "비즈니스 목표에 맞는 디지털 전략을 수립합니다. 데이터 기반의 의사결정을 통해 성장을 가속화합니다.",
            details: [
                "Digital Strategy",
                "Growth Planning",
                "Market Analysis",
                "Technical Advisory"
            ],

        }
    ];

    return (
        <>
            <Head>
                <title>Services | NQ Solution - 웹/앱 개발, UI/UX 디자인</title>
                <meta name="description" content="웹 개발, 앱 개발, UI/UX 디자인, 컨설팅 서비스를 제공합니다. 전략부터 실행까지 최고의 품질을 보장합니다." />
                <meta name="keywords" content="웹개발, 앱개발, UI/UX디자인, 컨설팅, Next.js, React, Flutter, 크로스플랫폼" />

                {/* Open Graph */}
                <meta property="og:title" content="Services | NQ Solution - 웹/앱 개발, UI/UX 디자인" />
                <meta property="og:description" content="디지털 제품과 서비스를 통해 비즈니스 문제를 해결합니다. 전략부터 실행까지, 모든 단계에서 최고의 품질을 보장합니다." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nqsolution.kr/services" />
                <meta property="og:image" content="https://nqsolution.kr/nq_textlogo.png" />
            </Head>

        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20">
                        <p className="text-sm tracking-[0.3em] text-neutral-500 dark:text-neutral-400 uppercase mb-8">
                            Our Services
                        </p>
                        <h1 className="text-[clamp(3rem,8vw,6rem)] font-light leading-[0.9] tracking-tighter mb-8">
                            What we do
                        </h1>
                        <div className="w-full h-px bg-neutral-900 dark:bg-neutral-100" />
                    </div>

                    <div className="max-w-3xl">
                        <p className="text-2xl font-light leading-relaxed">
                            우리는 디지털 제품과 서비스를 통해 비즈니스 문제를 해결합니다.
                            전략부터 실행까지, 모든 단계에서 최고의 품질을 보장합니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services List */}
            <section className="pb-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="py-16 group cursor-pointer"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                    <div className="md:col-span-1">
                                        <p className="text-sm text-neutral-400 dark:text-neutral-100">{service.number}</p>
                                    </div>

                                    <div className="md:col-span-4">
                                        <h3 className="text-3xl font-light mb-2  text-neutral-700 dark:text-neutral-200">{service.title}</h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{service.subtitle}</p>
                                    </div>

                                    <div className="md:col-span-5">
                                        <p className="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
                                            {service.description}
                                        </p>
                                        <div className="flex flex-wrap gap-4">
                                            {service.details.map((detail, i) => (
                                                <span key={i} className="text-sm text-neutral-600 dark:text-neutral-400">
                                                    {detail}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 px-8 bg-white dark:bg-neutral-900">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-5xl font-light tracking-tight">Our Process</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {[
                            { step: "01", title: "Planning", duration: "2 weeks" },
                            { step: "02", title: "Design", duration: "2 weeks" },
                            { step: "03", title: "Development", duration: "4-8 weeks" },
                            { step: "04", title: "Testing", duration: "1 week" },
                            { step: "05", title: "Launch", duration: "1 week" }
                        ].map((process, i) => (
                            <div key={i} className="text-center">
                                <p className="text-4xl font-light mb-4">{process.step}</p>
                                <h3 className="text-lg mb-2">{process.title}</h3>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">{process.duration}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-8 bg-neutral-900 dark:bg-black text-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-light text-neutral-200 mb-8">
                        어떤 서비스가 필요하신가요?
                    </h2>
                    <p className="text-lg text-neutral-200 mb-12">
                        프로젝트의 규모와 상관없이, 최선의 솔루션을 제공합니다.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-4 text-lg group"
                    >
                        <span className="relative">
                            무료 상담 신청
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500" />
                        </span>
                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
        </>
    );
}