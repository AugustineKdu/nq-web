import React from 'react';
import { ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function Portfolio() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20">
                        <p className="text-sm tracking-[0.3em] text-neutral-500 dark:text-neutral-400 uppercase mb-8">
                            Portfolio
                        </p>
                        <h1 className="text-[clamp(3rem,8vw,6rem)] font-light leading-[0.9] tracking-tighter mb-8">
                            Selected<br />works
                        </h1>
                        <div className="w-full h-px bg-neutral-900 dark:bg-neutral-100" />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="pt-32 pb-20 px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-light mb-8">
                        다음 프로젝트를 함께 만들어볼까요?
                    </h2>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-4 text-lg group"
                    >
                        <span className="relative">
                            Start a Project
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500" />
                        </span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>

        </div>
    );
}