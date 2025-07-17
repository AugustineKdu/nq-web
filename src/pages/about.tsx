import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';

export default function About() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20">
                        <p className="text-sm tracking-[0.3em] text-neutral-500 dark:text-neutral-400 uppercase mb-8">
                            About NQ Solution
                        </p>
                        <h1 className="text-[clamp(3rem,8vw,6rem)] font-light leading-[0.9] tracking-tighter mb-8">
                            New ideas,<br />
                            Quick execution
                        </h1>
                        <div className="w-full h-px bg-neutral-900 dark:bg-neutral-100" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div className="md:col-span-2">
                            <p className="text-2xl font-light leading-relaxed mb-8">
                                우리는 복잡함을 단순하게, 평범함을 특별하게 만듭니다.
                                최소한의 요소로 최대한의 가치를 창출하는 것이 우리의 철학입니다.
                            </p>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                NQ Solution은 혁신적인 아이디어와 빠른 실행력을 바탕으로
                                클라이언트의 비즈니스 성장을 돕는 디지털 솔루션 파트너입니다.
                                우리는 단순히 서비스를 제공하는 것이 아니라,
                                클라이언트와 함께 성장하는 파트너가 되고자 합니다.
                            </p>
                        </div>
                        <div>
                            <div className="space-y-12">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">Founded</p>
                                    <p className="text-2xl font-light">2023</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">Location</p>
                                    <p className="text-2xl font-light">KOREA</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-8 bg-white dark:bg-neutral-900">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-5xl font-light tracking-tight">Our Values</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800">
                        {[
                            {
                                number: "01",
                                title: "Simplicity",
                                desc: "복잡함 속에서 본질을 찾아 간결하게 표현합니다."
                            },
                            {
                                number: "02",
                                title: "Speed",
                                desc: "빠른 실행과 반복을 통해 최적의 결과를 만듭니다."
                            },
                            {
                                number: "03",
                                title: "Quality",
                                desc: "디테일에 집착하며 완성도 높은 결과물을 추구합니다."
                            }
                        ].map((value, i) => (
                            <div key={i} className="p-12 bg-white dark:bg-neutral-900">
                                <p className="text-sm text-neutral-400 dark:text-neutral-600 mb-4">{value.number}</p>
                                <h3 className="text-2xl font-light mb-4">{value.title}</h3>
                                <p className="text-neutral-600 dark:text-neutral-400">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            {/* <section className="py-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-5xl font-light tracking-tight">Our Expertise</h2>
                    </div>

                    <div className="space-y-px">
                        {[
                            {
                                area: "Development",
                                skills: "React, Next.js, TypeScript, Node.js, Flutter",
                                percentage: "90"
                            },
                            {
                                area: "Design",
                                skills: "UI/UX, Branding, Motion, 3D Design",
                                percentage: "85"
                            },
                            {
                                area: "Strategy",
                                skills: "Research, Planning, Analytics, Growth",
                                percentage: "80"
                            }
                        ].map((expertise, i) => (
                            <div key={i} className="group">
                                <div className="flex items-center gap-8 py-8 border-b border-neutral-200 dark:border-neutral-800">
                                    <h3 className="text-2xl font-light w-48">{expertise.area}</h3>
                                    <p className="flex-1 text-neutral-600 dark:text-neutral-400">{expertise.skills}</p>
                                    <p className="text-sm text-neutral-400 dark:text-neutral-600">{expertise.percentage}%</p>
                                </div>
                                <div className="h-px bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
                                    <div
                                        className="absolute left-0 top-0 h-full bg-neutral-900 dark:bg-neutral-100 transition-all duration-1000 ease-out"
                                        style={{ width: `${expertise.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* CTA Section */}
            <section className="py-20 px-8 bg-neutral-900 dark:bg-black text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-4xl font-light mb-4">
                                프로젝트를 시작할 준비가 되셨나요?
                            </h2>
                            <p className="text-lg text-neutral-400">
                                당신의 아이디어에 NQ의 실행력을 더해보세요.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-4 text-lg"
                        >
                            <span className="relative">
                                Contact Us
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500" />
                            </span>
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}