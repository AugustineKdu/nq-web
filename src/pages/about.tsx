import React from "react";

export default function About() {
    return (
        <div className="max-w-3xl mx-auto py-20 px-4">
            {/* Hero Section */}
            <section className="mb-16">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight border-b-4 border-matte-dark inline-block pb-2">About Us</h1>
                <p className="mt-6 text-xl text-neutral-500 dark:text-neutral-400 font-light">
                    We build <span className="font-bold text-blue-500">impactful</span> digital experiences.<br />
                    <span className="text-base text-blue-600 font-semibold">최소한의 디자인, 최대의 임팩트</span>
                </p>
            </section>
            {/* Sub Section */}
            <section className="space-y-10">
                <div className="border-l-4 border-matte-dark pl-6">
                    <h2 className="text-2xl font-bold mb-2">Who we are</h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300">A team of creators, designers, and engineers passionate about simplicity and clarity.</p>
                </div>
                <div className="border-l-4 border-matte-dark pl-6">
                    <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300">Delivering minimal yet powerful web solutions for modern businesses.</p>
                </div>
            </section>
        </div>
    );
}