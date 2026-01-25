import React, { useEffect } from 'react';
import { ArrowRightIcon, ArrowTopRightOnSquareIcon as ExternalLink } from "@heroicons/react/24/outline";

interface Project {
    id: number;
    number: string;
    title: string;
    client: string;
    year: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
}

export default function Portfolio() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);



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


            {/* Stats Section */}
            <section className="py-20 px-8 bg-white dark:bg-neutral-900">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
                        {[
                            { number: "50+", label: "Projects" },
                            { number: "30+", label: "Clients" },
                            { number: "100%", label: "Satisfaction" },
                            { number: "2M+", label: "Users" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <p className="text-5xl font-light mb-2">{stat.number}</p>
                                <p className="text-sm uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-8 bg-neutral-900 dark:bg-black text-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-light mb-8">
                        다음 프로젝트를 함께 만들어볼까요?
                    </h2>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-4 text-lg group"
                    >
                        <span className="relative">
                            Start a Project
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500" />
                        </span>
                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </a>
                </div>
            </section>

            {/* Project Modal */}

        </div>
    );
}