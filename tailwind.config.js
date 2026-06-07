/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(120%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        popIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '60%': { transform: 'scale(1.04)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%,100%': { boxShadow: '0 0 18px 0 rgba(251,191,36,0.55)' },
          '50%': { boxShadow: '0 0 34px 6px rgba(251,191,36,0.85)' },
        },
        walk: {
          '0%': { left: '8%' },
          '100%': { left: '72%' },
        },
        zoomBg: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.18)' },
        },
        bob: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        bounceX: {
          '0%,100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' },
        },
        bgZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        crossFadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        crossFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        walkForward: {
          '0%': { left: '12%', bottom: '14%', transform: 'translateX(-50%) scale(0.8)' },
          '100%': { left: '60%', bottom: '20%', transform: 'translateX(-50%) scale(1.15)' },
        },
        softPulse: {
          '0%,100%': { opacity: '0.85', filter: 'blur(0px)' },
          '50%': { opacity: '1', filter: 'blur(0.4px)' },
        },
      },
      animation: {
        slideUp: 'slideUp 0.7s cubic-bezier(0.22,1,0.36,1) both',
        popIn: 'popIn 0.45s cubic-bezier(0.22,1,0.36,1) both',
        fadeIn: 'fadeIn 0.4s ease-out both',
        glow: 'glow 2s ease-in-out infinite',
        walk: 'walk 2.5s ease-in-out forwards',
        zoomBg: 'zoomBg 2.5s ease-in forwards',
        bob: 'bob 2s ease-in-out infinite',
        bounceX: 'bounceX 1s ease-in-out infinite',
        bgZoom: 'bgZoom 6s ease-out forwards',
        bgZoomFast: 'bgZoom 2.5s ease-in forwards',
        crossFadeOut: 'crossFadeOut 2.5s ease-in-out forwards',
        crossFadeIn: 'crossFadeIn 2.5s ease-in-out forwards',
        walkForward: 'walkForward 2.5s ease-in-out forwards',
        softPulse: 'softPulse 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
