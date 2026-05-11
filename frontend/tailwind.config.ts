import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Your specific AasPaas palette
        'ap-dark': '#020617',     // slate-950
        'ap-surface': '#0f172a',  // slate-900
        'ap-indigo': '#6366f1',   // indigo-500
        'ap-violet': '#8b5cf6',   // violet-500
      },
      backgroundImage: {
        // Centralized gradient for buttons and icons
        'ap-gradient': 'linear-gradient(to bottom right, #6366f1, #8b5cf6)',
      },
      borderRadius: {
        'ap-xl': '1rem',
        'ap-2xl': '1.5rem',
        'ap-3xl': '2rem',
      }
    }
  },
  plugins: [],
};

export default config;
