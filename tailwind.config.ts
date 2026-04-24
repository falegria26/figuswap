import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red:       '#E61D25',   // FIFA Torch Red (oficial)
          'red-dark':'#C5181F',
          'red-light':'#FFF0F0',
          gold:      '#C9A84C',   // Trophy Gold
          'gold-light':'#FFF8E7',
          bg:        '#F6F5F0',   // Off-white cálido (fondo general)
          surface:   '#FFFFFF',   // Tarjetas
          'surface-2':'#F0F1F5', // Superficies secundarias
          border:    '#E2E4EB',
          'border-2':'#CDD0DB',
          text:      '#0D0F1A',   // Negro principal
          muted:     '#5A6070',   // Gris medio
          faint:     '#9AA0B0',   // Gris claro
        },
      },
      fontFamily: {
        sans: ['var(--font-noto)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:    '0 1px 3px rgba(13,15,26,0.07), 0 1px 2px rgba(13,15,26,0.05)',
        'card-md':'0 4px 12px rgba(13,15,26,0.08), 0 2px 4px rgba(13,15,26,0.05)',
        'red':   '0 4px 14px rgba(230,29,37,0.25)',
      },
      animation: {
        'bounce-in': 'bounceIn 0.25s ease-out',
        'fade-up':   'fadeUp 0.3s ease-out',
        'shimmer':   'shimmer 2s linear infinite',
      },
      keyframes: {
        bounceIn: {
          '0%':   { transform: 'scale(0.75)', opacity: '0' },
          '60%':  { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)',    opacity: '1' },
        },
        fadeUp: {
          '0%':   { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
      },
    },
  },
  plugins: [],
}

export default config
