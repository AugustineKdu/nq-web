import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';

const PortfolioPage: NextPage = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // git log 부분을 제거하여 더 간결해진 터미널 라인
    const terminalLines = [
        '$ ls -l portfolio/',
        'total 0',
        'drwxr-xr-x  -  user  staff  -  in_progress...',
        '',
        '$ ./deploy.sh --env=production',
        'Compiling assets...',
        '[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%',
        'Running final checks...',
        '⚠️ Deployment paused. Awaiting final assets.',
        '// Coming Soon... 🚀 최고의 결과물을 위해 준비 중입니다.',
    ];

    useEffect(() => {
        setIsVisible(true);
        const timer = setInterval(() => {
            setCurrentLine(prev => (prev < terminalLines.length - 1 ? prev + 1 : prev));
        }, 500);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <Head>
                <title>Portfolio | NQ Solution</title>
                <meta name="description" content="NQ Solution의 혁신적인 프로젝트 포트폴리오를 준비 중입니다." />
            </Head>

            <main className="min-h-[calc(100vh-8rem)] bg-primaryBg text-primaryText transition-colors duration-300 flex items-center justify-center p-4">
                <div className={`w-full max-w-3xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="bg-gray-900 dark:bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-800 dark:border-gray-700">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-6 py-3 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-gray-400 text-sm font-mono">
                                nq-portfolio-status
                            </div>
                            <div className="w-16"></div>
                        </div>

                        {/* Terminal Content */}
                        <div className="p-6 font-mono text-base text-green-400 min-h-[400px]">
                            <div className="space-y-2">
                                {terminalLines.slice(0, currentLine + 1).map((line, index) => (
                                    <div key={index} className="flex items-center">
                                        {line.startsWith('$') ? (
                                            <>
                                                <span className="text-blue-400 mr-3 font-bold">$</span>
                                                <span className="text-white font-medium">{line.substring(2)}</span>
                                            </>
                                        ) : line.startsWith('//') ? (
                                            <span className="text-yellow-300 font-medium">{line}</span>
                                        ) : line.startsWith('⚠️') ? (
                                            <span className="text-red-400 font-medium">{line}</span>
                                        ) : line.startsWith('[') ? (
                                            <span className="text-green-300 font-medium">{line}</span>
                                        ) : line === '' ? (
                                            <span>&nbsp;</span>
                                        ) : (
                                            <span className="text-gray-300 font-medium">{line}</span>
                                        )}
                                        {index === currentLine && currentLine < terminalLines.length - 1 && (
                                            <span className="animate-pulse text-green-400 ml-2 font-bold">█</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default PortfolioPage;