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
        'cream-light': '#F6F6F3',
        charcoal: '#212121',
        terracotta: '#B7401D',
        'terracotta-dark': '#5B2519',
        'rose-beige': '#C39F93',
        'rose-pink': '#F9E4E8',
        'ocean-blue': '#1B76A8',
        'cta-orange': '#FF5722',
        'cta-amber': '#FFAB00',
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
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
