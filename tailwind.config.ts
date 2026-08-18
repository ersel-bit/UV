import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {
    colors: { bg:'#050f1a','bg-mid':'#091828','bg-light':'#0d2236',cyan:'#00ccee','off-white':'#eaf4ff',gray:'#6a8aaa',green:'#22c55e',amber:'#f59e0b' },
    fontFamily: { rajdhani:['Rajdhani','sans-serif'], inter:['Inter','sans-serif'] }
  }},
  plugins: [],
}
export default config
