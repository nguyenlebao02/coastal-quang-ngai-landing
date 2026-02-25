import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B3D5C',
        'navy-light': '#0F4F75',
        'navy-dark': '#082D44',
        gold: '#D4AF37',
        'gold-light': '#E0C465',
        'gold-dark': '#C9A961',
        cream: '#F0E6DC',
        'cream-light': '#F8F7F3',
        charcoal: '#333333',
        terracotta: '#B7401D',
        'terracotta-dark': '#5B2519',
      },
      fontFamily: {
        heading: ['var(--font-alumni)', 'Alumni Sans', 'sans-serif'],
        sans: ['var(--font-pathway)', 'Pathway Extreme', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
    },
  },
  plugins: [],
};

export default config;
