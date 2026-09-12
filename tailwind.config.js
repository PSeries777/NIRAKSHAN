/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        shramik: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#BAE0FF',
          300: '#7CC4FA',
          400: '#38A3F8',
          500: '#0F87EC',
          600: '#0268CA',
          700: '#0352A3',
          800: '#074685',
          900: '#0A3B6F',
          950: '#072448',
        },
        navy: {
          800: '#0F1E36',
          900: '#0A1526',
          950: '#060D1A',
        },
        teal: {
          warm: '#0D9488',
          vibrant: '#14B8A6',
          light: '#CCFBF1',
        },
        saffron: {
          DEFAULT: '#F59E0B',
          deep: '#D97706',
          light: '#FEF3C7',
          warm: '#EA580C',
        },
        status: {
          available: '#16A34A',
          confirmed: '#0D9488',
          pending: '#F59E0B',
          critical: '#DC2626',
        }
      },
      borderRadius: {
        'button': '18px',
        'input': '16px',
        'card': '28px',
        'card-lg': '36px',
        'modal': '32px',
        'container': '40px',
      },
      boxShadow: {
        'tactile': '0 4px 0 0 rgba(15, 23, 42, 0.08), 0 10px 25px -5px rgba(15, 23, 42, 0.06)',
        'tactile-pressed': '0 1px 0 0 rgba(15, 23, 42, 0.1), 0 4px 10px -2px rgba(15, 23, 42, 0.05)',
        'tactile-hover': '0 8px 0 0 rgba(15, 23, 42, 0.06), 0 20px 30px -8px rgba(15, 23, 42, 0.1)',
        'soft-glow': '0 0 35px -5px rgba(37, 99, 235, 0.25)',
        'saffron-glow': '0 0 30px -5px rgba(245, 158, 11, 0.3)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'float-gentle': 'floatGentle 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.25s ease-out',
      },
      keyframes: {
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
