module.exports = {
    darkMode: 'class',  // class 기반 다크모드 토글
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                light: {
                    primary: '#2563EB',
                    secondary: '#10B981',
                    accent: '#F59E0B',
                    background: '#FFFFFF',
                    surface: '#F8FAFC',
                    textPrimary: '#1E293B',
                    textSecondary: '#64748B',
                },
                dark: {
                    primary: '#3B82F6',
                    secondary: '#34D399',
                    accent: '#FBBF24',
                    background: '#0F172A',
                    surface: '#1E293B',
                    textPrimary: '#F1F5F9',
                    textSecondary: '#94A3B8',
                    gradientStart: '#1E40AF',
                    gradientEnd: '#7C3AED',
                },
            },
            fontFamily: {
                sans: ['Pretendard', 'Apple SD Gothic Neo', 'sans-serif'],
                display: ['Inter', 'SF Pro Display', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
        },
    },
    plugins: [],
}
