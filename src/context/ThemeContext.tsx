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
        if (mounted) {
            localStorage.setItem('theme', dark ? 'dark' : 'light');
            if (dark) {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            } else {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
            }
        }
    }, [dark, mounted]);

    const toggleDark = () => setDark(!dark);

    if (!mounted) {
        return null;
    }

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
