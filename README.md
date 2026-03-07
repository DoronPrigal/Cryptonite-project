# Cryptonite 🪙

A real-time cryptocurrency tracking dashboard built with React, TypeScript, and Redux Toolkit.

## 🔗 Links

- **GitHub Repository:** https://github.com/DoronPrigal/Cryptonite-project
- **Live Demo:** https://doronprigal.github.io/Cryptonite-project/

## ✨ Features

- 📊 Top 100 cryptocurrencies from CoinGecko API
- 🔍 Real-time client-side search
- ⭐ Track up to 5 coins simultaneously (persisted in localStorage)
- 💱 Price info in USD / EUR / ILS
- 📈 Live price chart updating every second (CryptoCompare API)
- 🤖 AI investment recommendations via ChatGPT
- 🎨 Parallax hero header
- 📱 Fully responsive

## 🛠 Tech Stack

- React 18 + TypeScript
- Vite
- Redux Toolkit
- React Router v6
- Recharts
- CoinGecko API
- CryptoCompare API
- OpenAI ChatGPT API

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Create .env file from template
cp .env.example .env
# Add your API keys to .env

# Run development server
npm run dev
```

## 🔑 Environment Variables

```
VITE_COINGECKO_API_KEY=your_coingecko_demo_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

Get a free CoinGecko Demo API key at: https://www.coingecko.com/en/api

## 👨‍💻 Developer

**Doron Prigal** – Full Stack Web Developer, John Bryce Bootcamp 2026


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
