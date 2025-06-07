tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#4a6fa5',
                secondary: '#2c3e50',
                accent: '#3498db',
                dark: {
                    primary: '#1e293b',
                    secondary: '#0f172a',
                    accent: '#3b82f6',
                }
            },
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.5s ease-out',
                'bounce-slow': 'bounce 3s infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            boxShadow: {
                'custom': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
                'skill': '0 4px 15px -3px rgba(74, 111, 165, 0.1)',
            },
            maxWidth: {
                'xxs': '18rem',
            }
        }
    },
    plugins: [],
    safelist: [
        'bg-primary',
        'bg-secondary',
        'bg-accent',
        'text-primary',
        'text-secondary',
        'text-accent',
        'dark:bg-dark-primary',
        'dark:bg-dark-secondary',
        'dark:bg-dark-accent',
        'dark:text-white',
    ]
};
