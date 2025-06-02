// src/components/ThemeToggle.tsx
'use client'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-10 h-10" />
    }

    return (
        <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-300"
            aria-label="Toggle theme"
        >
            {/* Sun Icon - 검은색 계열로 색상 변경 */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute h-6 w-6 text-gray-900 transition-all duration-300 ease-in-out
                    ${theme === 'light' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
            </svg>

            {/* Moon Icon - 기존 파란색 유지 */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute h-6 w-6 text-blue-400 transition-all duration-300 ease-in-out
                    ${theme === 'dark' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
            </svg>
        </button>
    )
}