// src/components/ThemeToggle.tsx
import React from "react";

interface ThemeToggleProps {
    dark: boolean;
    setDark: (dark: boolean) => void;
}

const ThemeToggle = ({ dark, setDark }: ThemeToggleProps) => {
    return (
        <button
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDark(!dark)}
            className="relative w-11 h-11 flex items-center justify-center rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)] transition-all duration-400 group"
        >
            {/* Sun icon */}
            <svg
                className={`w-5 h-5 absolute transition-all duration-500 ${
                    dark
                        ? "opacity-100 rotate-0 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]"
                        : "opacity-0 rotate-90 text-[var(--color-text-primary)]"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>

            {/* Moon icon */}
            <svg
                className={`w-5 h-5 absolute transition-all duration-500 ${
                    dark
                        ? "opacity-0 -rotate-90 text-[var(--color-text-primary)]"
                        : "opacity-100 rotate-0 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
        </button>
    );
};

export default ThemeToggle;
