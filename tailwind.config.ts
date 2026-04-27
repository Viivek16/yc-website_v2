import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:         '#0a0a0a',
        'ink-2':     '#141413',
        'ink-3':     '#1c1b19',
        surface:     '#f4f3ef',
        'surface-2': '#e8e6df',
        accent:      '#fdda16',
        cta:         '#ffb100',
        'on-dark':   '#e9e6df',
        'on-dark-2': '#a8a49a',
        'on-dark-3': '#6e6a61',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        ui:      ['var(--font-ui)', '-apple-system', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1360px',
      },
    },
  },
  plugins: [],
};

export default config;
