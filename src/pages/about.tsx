import React from "react";
import Head from "next/head";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';

export default function About() {
    return (
        <>
            <Head>
                <title>About | NQ Solution - 혁신과 빠른 실행</title>
                <meta name="description" content="NQ Solution은 혁신적인 아이디어와 빠른 실행력을 바탕으로 클라이언트의 비즈니스 성장을 돕는 디지털 솔루션 파트너입니다." />
                <meta name="keywords" content="NQ Solution, 회사소개, 디지털솔루션, 웹개발회사, 앱개발회사" />

                {/* Open Graph */}
                <meta property="og:title" content="About | NQ Solution - 혁신과 빠른 실행" />
                <meta property="og:description" content="New ideas, Quick execution. 복잡함을 단순하게, 평범함을 특별하게 만듭니다." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nqsolution.kr/about" />
                <meta property="og:image" content="https://nqsolution.kr/nq_textlogo.png" />
            </Head>

        (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20">
                        <p className="text-sm tracking-[0.3em] text-neutral-900 dark:text-white uppercase mb-8">
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
                            <p className="text-2xl leading-relaxed mb-8 text-neutral-900 dark:text-white font-medium">
                                우리는 복잡함을 단순하게, 평범함을 특별하게 만듭니다.
                                최소한의 요소로 최대한의 가치를 창출하는 것이 우리의 철학입니다.
                            </p>
                            <p className="text-lg text-neutral-900 dark:text-white leading-relaxed font-medium">
                                NQ Solution은 혁신적인 아이디어와 빠른 실행력을 바탕으로
                                클라이언트의 비즈니스 성장을 돕는 디지털 솔루션 파트너입니다.
                                우리는 단순히 서비스를 제공하는 것이 아니라,
                                클라이언트와 함께 성장하는 파트너가 되고자 합니다.
                            </p>
                        </div>
                        <div>
                            <div className="space-y-12">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-neutral-900 dark:text-white mb-2 font-medium">Founded</p>
                                    <p className="text-2xl text-neutral-900 dark:text-white font-semibold">2024</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-neutral-900 dark:text-white mb-2 font-medium">Location</p>
                                    <p className="text-2xl text-neutral-900 dark:text-white font-semibold">KOREA</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-8 bg-slate-50 dark:bg-slate-900">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-5xl font-light tracking-tight text-neutral-900 dark:text-white">Our Values</h2>
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
                            <div key={i} className="p-12 bg-slate-50 dark:bg-slate-900">
                                <p className="text-sm text-neutral-900 dark:text-white mb-4">{value.number}</p>
                                <h3 className="text-2xl font-light mb-4 text-neutral-900 dark:text-white">{value.title}</h3>
                                <p className="text-neutral-900 dark:text-white">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>




        {/* 대안 2: 보더와 카드 스타일 (Pinterest 감성) */}
        <section className="py-20 px-8">
            <div className="max-w-6xl mx-auto">
                <div className="border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-12 bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-xl transition-shadow duration-500">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div>
                            <h2 className="text-4xl font-light mb-4 text-neutral-900 dark:text-white">
                                프로젝트를 시작할 준비가 되셨나요?
                            </h2>
                            <p className="text-lg text-neutral-900 dark:text-white">
                                당신의 아이디어에 NQ의 실행력을 더해보세요.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-4 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full hover:scale-105 transition-all duration-300"
                        >
                            <span className="font-medium">Contact Us</span>
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>


        </div>
        </>
    );
}