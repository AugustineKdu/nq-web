// src/components/ThemeToggle.tsx
import React from "react";

const ThemeToggle = ({ dark, setDark }: { dark: boolean; setDark: (d: boolean) => void }) => {
    return (
        <button
            aria-label="Toggle Dark Mode"
            onClick={() => setDark(!dark)}
            className="relative w-8 h-8 flex items-center justify-center text-sm"
        >
            <span className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                {dark ? 'LIGHT' : 'DARK'}
            </span>
        </button>
    );
};

export default ThemeToggle;