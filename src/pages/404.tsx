import React from "react";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Custom404() {
    const { dark } = useTheme();

    return (
        <>
            <Head>
                <title>404 - Page Not Found | NQ Solution</title>
                <meta name="description" content="The page you are looking for does not exist." />
            </Head>
            <div className={`min-h-screen flex items-center justify-center ${dark ? "bg-[#0a0a0a]" : "bg-[#fafafa]"}`}>
                <div className="container-custom">
                    <div className="max-w-2xl mx-auto text-center">
                        {/* Large 404 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <span className={`text-[150px] md:text-[200px] font-serif font-bold leading-none ${
                                dark ? "text-neutral-800" : "text-neutral-200"
                            }`}>
                                404
                            </span>
                        </motion.div>

                        {/* Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <h1 className={`text-3xl md:text-4xl font-medium mb-4 ${dark ? "text-white" : "text-neutral-900"}`}>
                                페이지를 찾을 수 없습니다
                            </h1>
                            <p className={`text-lg mb-8 ${dark ? "text-neutral-400" : "text-neutral-600"}`}>
                                요청하신 페이지가 존재하지 않거나 이동되었습니다.
                            </p>
                        </motion.div>

                        {/* Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <button
                                onClick={() => window.history.back()}
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
                                    dark
                                        ? "bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700"
                                        : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-200"
                                }`}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                이전 페이지로
                            </button>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-full font-medium hover:bg-teal-600 transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                홈으로 이동
                            </Link>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className={`mt-16 pt-8 border-t ${dark ? "border-neutral-800" : "border-neutral-200"}`}
                        >
                            <p className={`text-sm mb-4 ${dark ? "text-neutral-500" : "text-neutral-500"}`}>
                                찾고 계신 페이지가 있으신가요?
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {[
                                    { href: "/about", label: "회사소개" },
                                    { href: "/services", label: "서비스" },
                                    { href: "/portfolio", label: "포트폴리오" },
                                    { href: "/contact", label: "문의하기" },
                                ].map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`text-sm px-4 py-2 rounded-lg transition-colors ${
                                            dark
                                                ? "text-neutral-400 hover:text-teal-500 hover:bg-neutral-800"
                                                : "text-neutral-600 hover:text-teal-500 hover:bg-neutral-100"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
