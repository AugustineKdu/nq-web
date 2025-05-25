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
        return null
    }

    return (
        <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded transition-transform duration-300 transition-colors"
            style={{ transform: theme === 'light' ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    )
}