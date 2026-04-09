import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './types/**/*.{ts}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#7F77DD',
        brandDark: '#534AB7',
        surface: '#0f0f0f',
        panel: '#1a1a1a',
        panelBorder: '#2a2a2a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'word-pop': 'wordPop 0.15s ease-out',
        'word-bounce': 'wordBounce 0.2s cubic-bezier(0.36,0.07,0.19,0.97)',
      },
      keyframes: {
        wordPop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wordBounce: {
          '0%,100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.25)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
