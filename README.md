# Micro-Frontend Architecture Demo

This project demonstrates a **micro-frontend (MFE) architecture** using Module Federation, with Next.js 15 serving as the shell application that orchestrates multiple independent micro-frontends.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────┐
│           Shell Application             │
│          (Next.js 15 + React 19)       │
│              Port: 3000                 │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
┌───────▼────────┐ ┌────────▼────────┐
│ Angular MFE    │ │  Svelte MFE     │
│   Port: 4201   │ │   Port: 4173    │
│ (Module Fed)   │ │ (Module Fed)    │
└────────────────┘ └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### 1. Start All Applications

**Terminal 1 - Shell Application:**
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

**Terminal 2 - Angular MFE:**
```bash
cd angular-mfe
npm install
npm run dev
```
Runs on [http://localhost:4201](http://localhost:4201)

**Terminal 3 - Svelte MFE:**
```bash
cd svelte-mfe
npm install
npm run dev
```
Runs on [http://localhost:4173](http://localhost:4173)

### 2. View the Integration
Once all three applications are running, visit the shell application at [http://localhost:3000](http://localhost:3000) to see the micro-frontends integrated together.

## 📁 Project Structure

```
md-mfe/                    # Shell application (this repo)
├── app/                   # Next.js App Router
├── components/ui/         # shadcn/ui components
├── lib/                   # Utility functions
├── next.config.mjs        # Module Federation config
└── package.json

angular-mfe/               # Independent Angular MFE repo
├── src/
├── webpack.config.js      # Module Federation config
└── package.json

svelte-mfe/                # Independent Svelte MFE repo
├── src/
├── vite.config.js         # Module Federation config
└── package.json
```

## 🛠️ Technologies

### Shell Application
- **Next.js 15** with App Router
- **React 19**
- **Tailwind CSS 4** 
- **shadcn/ui** components
- **Module Federation** for MFE orchestration

### Angular MFE
- **Angular 18+** with standalone components
- **TypeScript**
- **Custom Webpack** builder
- **Module Federation** integration

### Svelte MFE
- **Svelte 4** + **Vite**
- **TypeScript** support
- **Module Federation** via Vite plugin

## 🔧 Development

### Independent Development
Each micro-frontend can be developed independently:

```bash
# Work on shell only
npm run dev

# Work on Angular MFE only  
cd angular-mfe && npm run dev

# Work on Svelte MFE only
cd svelte-mfe && npm run dev
```

### Git Repositories
Each MFE maintains its own git repository for:
- Independent deployment pipelines
- Team ownership boundaries  
- Separate versioning and releases

## 📚 Documentation

For detailed documentation including:
- Module Federation configuration
- Component integration patterns
- Development guidelines
- Architecture decisions

See [CLAUDE.md](./CLAUDE.md)

## 🚢 Deployment

Each micro-frontend can be deployed independently:
- **Shell**: Deploy to Vercel, Netlify, or any static hosting
- **Angular MFE**: Deploy as static assets with `ng build`
- **Svelte MFE**: Deploy with `npm run build`

The shell application will load remote MFEs from their deployed URLs.

## 🤝 Contributing

1. Clone the repository
2. Install dependencies for each MFE
3. Start all development servers
4. Make changes to individual MFEs
5. Test integration in the shell application

## 📝 License

This project is a demonstration of micro-frontend architecture patterns.
