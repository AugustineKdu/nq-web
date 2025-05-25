module.exports = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                /* CSS 변수 기반 다크/라이트 배경 및 텍스트 */
                primaryBg: 'var(--color-bg)',
                primaryText: 'var(--color-text)',
                // 기존 light/dark palettes...
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
