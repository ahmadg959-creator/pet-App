/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beige': '#F5F5DC',
        'sky-blue': '#87CEEB',
        'teal-accent': '#008080',
        'slate': {
          50: '#f8fafc',
          500: '#64748b',
          600: '#475569',
          800: '#1e293b'
        },
        'blue': {
          500: '#3b82f6',
          600: '#2563eb'
        }
      }
    }
  },
  plugins: [],
}