// src/components/AnimatedBackground.tsx
import React from 'react';

interface AnimatedBackgroundProps {
    dark: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ dark }) => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Gradient Orbs */}
            <div className="absolute w-96 h-96 -top-48 -left-48 animate-float-slow">
                <div className={`w-full h-full rounded-full blur-3xl transition-colors duration-500 ${
                    dark
                        ? 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20'
                        : 'bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20'
                }`} />
            </div>

            <div className="absolute w-[500px] h-[500px] top-1/3 -right-48 animate-float-medium">
                <div className={`w-full h-full rounded-full blur-3xl transition-colors duration-500 ${
                    dark
                        ? 'bg-gradient-to-br from-cyan-900/20 via-teal-900/20 to-emerald-900/20'
                        : 'bg-gradient-to-br from-cyan-400/20 via-teal-400/20 to-emerald-400/20'
                }`} />
            </div>

            <div className="absolute w-80 h-80 bottom-1/4 left-1/4 animate-float-fast">
                <div className={`w-full h-full rounded-full blur-3xl transition-colors duration-500 ${
                    dark
                        ? 'bg-gradient-to-br from-violet-900/20 via-indigo-900/20 to-blue-900/20'
                        : 'bg-gradient-to-br from-violet-400/20 via-indigo-400/20 to-blue-400/20'
                }`} />
            </div>

            <div className="absolute w-96 h-96 bottom-0 right-1/3 animate-float-slower">
                <div className={`w-full h-full rounded-full blur-3xl transition-colors duration-500 ${
                    dark
                        ? 'bg-gradient-to-br from-fuchsia-900/20 via-purple-900/20 to-indigo-900/20'
                        : 'bg-gradient-to-br from-fuchsia-400/20 via-purple-400/20 to-indigo-400/20'
                }`} />
            </div>

            {/* Subtle grid overlay for depth */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
                            linear-gradient(${dark ? '#fff' : '#000'} 1px, transparent 1px),
                            linear-gradient(90deg, ${dark ? '#fff' : '#000'} 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>
        </div>
    );
};

export default AnimatedBackground;
