import type { Config } from "tailwindcss"
import Forms from '@tailwindcss/forms'
import c from 'tailwindcss/colors'

/* import TextShadow from 'tailwindcss-textshadow' */

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
/*         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))", */
        "tartan":"url('/tartan_500.png')"
      },
      colors: {
        'backing-light':'rgba(255,255,255,0.5)',
        'backing-dark':'rgba(0,0,0,0.5)',
        'section-light':c.slate[200],
        'section-dark': c.slate[700],
        'todo-light':c.slate[200],
        'todo-dark':c.slate[600],
        'input-light':c.slate[100],
        'input-dark':c.slate[500],
        'text-light':c.gray[900],
        'text-dark':c.gray[100],
        'icons-light': c.gray[500],
        'icons-dark': c.gray[200]
      },
      screens: {'sm':'500px'}
    },
  },
  plugins: [Forms, /* TextShadow */],
  darkMode:'class'
}
export default config;
