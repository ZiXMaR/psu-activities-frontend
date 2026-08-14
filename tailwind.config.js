/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#173B5C',
        ink2: '#0F2B44',
        paper: '#F6F4EE',
        card: '#FFFFFF',
        gold: '#F0A93C',
        gold2: '#D98E22',
        line: '#E4E0D4',
        ink3: '#5B6B7A',
    },

    fontFamily: {
      display: ['Kanit', 'Noto sans thai' , 'sans-serif'],
      body: ['Noto sans thai', 'sans-serif'],
    },

    boxShadow: {
      board: '0 1px 2px rgba(23,59,92,0.06), 0 6px 20px -8px rgba(23,59,92,0.18)',
  },
  
  },

  },
  plugins: [],
}

