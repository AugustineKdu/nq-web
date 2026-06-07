import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
    dark: boolean;
    setDark: (dark: boolean) => void;
    toggleDark: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [dark, setDark] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setDark(savedTheme === 'dark');
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', dark);
        document.documentElement.classList.toggle('light', !dark);
    }, [dark, mounted]);

    const toggleDark = () => setDark((d) => !d);

    // 항상 children을 렌더한다 — 서버에서 본문을 출력해야 크롤러(특히 네이버 Yeti)가 콘텐츠를 본다.
    // mount 전 `return null` 은 사이트 전체를 클라이언트 전용 렌더로 만들어 SSR 본문을 비우므로 금지.
    return (
        <ThemeContext.Provider value={{ dark, setDark, toggleDark }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
