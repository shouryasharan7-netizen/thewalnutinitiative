import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: '#F3EEE2',
          deep: '#E7DFC9',
          paper: '#FAF7EF',
        },
        green: {
          DEFAULT: '#3E513C',
          soft: '#6B8064',
          dark: '#28352A',
        },
        walnut: {
          DEFAULT: '#8A6A45',
          light: '#B79A72',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'ui-serif', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 8px rgba(62, 81, 60, 0.06), 0 8px 24px rgba(62, 81, 60, 0.08)',
        'soft-lg': '0 4px 16px rgba(62, 81, 60, 0.08), 0 16px 40px rgba(62, 81, 60, 0.10)',
        'soft-inset': 'inset 0 1px 2px rgba(62, 81, 60, 0.05)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'crack-draw': {
          '0%': { strokeDashoffset: '400' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'crack-draw': 'crack-draw 1.1s var(--tw-ease, ease-out) forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
