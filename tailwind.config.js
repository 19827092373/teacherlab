/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 暗黑背景色系
        bg: {
          primary: '#050510',
          secondary: '#0a0e27',
          tertiary: '#0f0f23',
          elevated: '#1a1a2e',
        },

        // 霓虹色系
        neon: {
          green: '#00ff41',
          greenDim: '#008f11',
          blue: '#00ffff',
          blueDim: '#0080ff',
          purple: '#7b61ff',
          purpleDim: '#5d34d0',
          pink: '#ff00ff',
          pinkDim: '#ff006e',
        },

        // 毛玻璃颜色
        glass: {
          bg: 'rgba(15, 23, 42, 0.6)',
          bgLight: 'rgba(26, 26, 46, 0.4)',
          border: 'rgba(255,255,255, 0.1)',
          highlight: 'rgba(255,255,255, 0.05)',
          reflection: 'rgba(255,255,255, 0.1)',
        },

        // 文字颜色
        text: {
          primary: '#ffffff',
          secondary: '#e0e0ff',
          muted: '#94a3b8',
          dim: '#64748b',
        },
      },

      fontFamily: {
        sans: ['DM Sans', 'Space Grotesk', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'DM Sans', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
        display: ['Orbitron', 'Space Grotesk', 'sans-serif'],
      },

      animation: {
        'neon-pulse-subtle': 'neonPulseSubtle 3s ease-in-out infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        grid: 'gridScroll 20s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        neonPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(0, 255, 65, 0.6), 0 0 60px rgba(0, 255, 255, 0.3)',
          },
        },
        neonPulseSubtle: {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(0, 255, 65, 0.3), inset 0 0 3px rgba(0, 255, 65, 0.1)',
          },
          '50%': {
            boxShadow: '0 0 8px rgba(0, 255, 65, 0.5), inset 0 0 5px rgba(0, 255, 65, 0.2)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gridScroll: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '50px 50px' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },

      backgroundImage: {
        'neon-green-blue': 'linear-gradient(135deg, #00ff41 0%, #00ffff 100%)',
        'neon-blue-purple': 'linear-gradient(135deg, #00ffff 0%, #7b61ff 100%)',
        'neon-purple-pink': 'linear-gradient(135deg, #7b61ff 0%, #ff00ff 100%)',
        'neon-pink-red': 'linear-gradient(135deg, #ff00ff 0%, #ff006e 100%)',
      },
    },
  },
  plugins: [],
}
