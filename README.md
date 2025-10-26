# Dev Dashboard

A comprehensive developer productivity dashboard built with React, Vite, and TailwindCSS.

## Features

- **Code Snippets Manager** - Store and organize your code snippets with syntax highlighting
- **Quick Links** - Access your frequently used websites and tools
- **Daily Tasks** - Track your daily to-dos
- **Pomodoro Timer** - Stay focused with time management
- **Quick Notes** - Jot down quick thoughts and ideas
- **AI Assistant Integration** - Quick access to AI chat
- **Prompt Library** - Manage and reuse your AI prompts

## Tech Stack

- React 19
- Vite 7
- TailwindCSS 4
- Lucide Icons
- PrismJS (code highlighting)
- React Simple Code Editor

## Development

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Visit http://localhost:5173

## Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Deployment

This project is optimized for deployment on Netlify. See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

### Quick Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

## Project Structure

```
dev-dashboard/
├── src/
│   ├── components/
│   │   ├── CodeSnippets/
│   │   ├── Common/
│   │   ├── Dashboard/
│   │   ├── PromptLibrary/
│   │   └── QuickLinks/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── netlify.toml
```

## License

ISC
