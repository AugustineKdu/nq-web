import React from 'react';

interface CTAProps {
    title?: string;
    description?: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
    className?: string;
}

export const CTA: React.FC<CTAProps> = ({
    title = "Ready to get started?",
    description = "Join us today and experience the difference.",
    primaryButtonText = "Get Started",
    secondaryButtonText = "Learn More",
    onPrimaryClick,
    onSecondaryClick,
    className = "",
}) => {
    return (
        <div className={`w-full px-4 py-12 bg-gradient-to-br from-nq.blue600 to-nq.purple600 dark:from-dark.background dark:to-dark.surface ${className}`}>
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
                    {title}
                </h2>
                <p className="text-lg md:text-xl text-gray-100 mb-8 animate-slide-up">
                    {description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
                    <button
                        onClick={onPrimaryClick}
                        className="px-8 py-3 bg-white text-nq.blue600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        {primaryButtonText}
                    </button>
                    <button
                        onClick={onSecondaryClick}
                        className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200"
                    >
                        {secondaryButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CTA;