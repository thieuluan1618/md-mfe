# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **micro-frontend (MFE) architecture** project with:

### Shell Application (Host)
- **Next.js 15** with App Router serving as the shell/host application
- **React 19** as the UI framework
- **Tailwind CSS 4** for styling with PostCSS
- **shadcn/ui** component library with Radix UI primitives
- **Turbopack** for faster development builds

### Remote Applications
- **Angular 20** micro-frontend (`angular-mfe/`) - Port 4201
- **Svelte 4** micro-frontend (`svelte-mfe/`) - Port 4173

The shell application orchestrates and loads the remote micro-frontends, providing a unified user experience while maintaining independent deployment capabilities for each MFE.

## Development Commands

### Shell Application (Root)
```bash
# Start development server with Turbopack on port 3001
npm run dev

# Build for production
npm run build

# Start production server on port 3001
npm start

# Run ESLint
npm run lint

# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

### Angular MFE
```bash
# Navigate to Angular MFE
cd angular-mfe

# Install dependencies
npm install

# Start development server on port 4201
npm run dev
# or
ng serve

# Build for production
npm run build
# or
ng build

# Run tests with Karma/Jasmine
npm test
# or
ng test

# Build and watch for changes
npm run watch
```

### Svelte MFE
```bash
# Navigate to Svelte MFE
cd svelte-mfe

# Install dependencies
npm install

# Start development server on port 4173
npm run dev
# or
npm start

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run check
```

## Project Structure

```
# Shell Application (Next.js)
app/
├── layout.js          # Root layout with font configuration
├── page.js            # Main page with MFE integration
└── globals.css        # Global Tailwind styles

components/
└── ui/                # shadcn/ui components
    ├── alert-dialog.jsx
    └── button.jsx

lib/
└── utils.js           # Utility functions (cn for className merging)

.storybook/            # Storybook configuration
├── main.js            # Main configuration
└── preview.js         # Global decorators and parameters

# Remote Applications
angular-mfe/           # Angular micro-frontend
├── src/
│   ├── app/
│   │   ├── app.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── main.ts
│   └── index.html
├── angular.json
├── package.json
└── tsconfig.json

svelte-mfe/            # Svelte micro-frontend
├── src/
│   ├── App.svelte
│   ├── main.js
│   └── lib/
│       ├── Counter.svelte
│       └── Welcome.svelte
├── vite.config.js
├── package.json
└── tsconfig.json
```

## Architecture Notes

### Micro-Frontend Architecture
- **Shell/Host Pattern**: Next.js application serves as the orchestrator
- **Module Federation**: Used for runtime integration of remote applications
- **Independent Deployment**: Each MFE can be developed, tested, and deployed separately
- **Technology Agnostic**: Supports multiple frameworks (React, Angular, Svelte)
- **Shared Dependencies**: Common libraries and styling systems shared across MFEs

### Component System (Shell)
- Uses **shadcn/ui** design system with the "new-york" style variant
- Components are built on top of **Radix UI** primitives for accessibility
- **Class Variance Authority (CVA)** for component variant management
- All UI components use the `cn()` utility for className merging with `clsx` and `tailwind-merge`

### Styling Strategy
- **Tailwind CSS 4** with PostCSS configuration in shell
- Uses CSS variables for theming (`cssVariables: true` in components.json)
- Custom font setup with Geist Sans and Geist Mono fonts
- Consistent design tokens shared across all MFEs

### Path Aliases
The project uses path aliases configured in jsconfig.json:
- `@/` maps to the root directory
- `@/components` for components
- `@/lib` for utilities
- `@/components/ui` for UI components

### Code Conventions
- Uses `.js` and `.jsx` extensions (not TypeScript)
- "use client" directive for client components
- React Server Components by default
- Consistent component export patterns

## Key Dependencies

- **@radix-ui**: Accessibility-focused UI primitives
- **class-variance-authority**: Type-safe component variants
- **clsx & tailwind-merge**: Conditional className utilities
- **lucide-react**: Icon library

## Development Notes

### Shell Application
- The project is configured for both RSC (React Server Components) and client components
- Turbopack is enabled for faster development builds
- ESLint is configured with Next.js core web vitals rules
- Module Federation configured for loading remote MFEs
- **Storybook 8.6.14** for component development and documentation

### Angular MFE
- Built with Angular 20 and standalone components
- Uses TypeScript for type safety
- Configured to expose components via Module Federation (webpack.config.js)
- Independent routing and state management
- Testing with Karma, Jasmine, and Chrome launcher
- Custom webpack builder with @angular-builders/custom-webpack

### Svelte MFE
- Built with Svelte 4 and Vite
- Uses @originjs/vite-plugin-federation for Module Federation
- TypeScript support with svelte-check
- Independent routing with svelte-routing
- Development server runs on port 4173

## Module Federation Configuration

### Shell Application (next.config.mjs)
- Configured as host named 'host'
- Loads remotes from:
  - `angular_mfe@http://localhost:4201/remoteEntry.js`
  - `svelte_mfe@http://localhost:4173/remoteEntry.js`
- Shares React/React-DOM as singletons
- Only enabled in development or when `ENABLE_MODULE_FEDERATION=true`

### Angular Remote (webpack.config.js)
- Exposes `./Component` from `./src/bootstrap.ts`
- Shares Angular core modules as singletons
- Generates remoteEntry.js

### Svelte Remote (vite.config.js)
- Uses @originjs/vite-plugin-federation
- Exposes Svelte components for federation

## Development Workflows

### Full Stack Development
To run all micro-frontends together:

1. **Terminal 1 - Shell**: `npm run dev` (port 3001)
2. **Terminal 2 - Angular**: `cd angular-mfe && npm run dev` (port 4201)  
3. **Terminal 3 - Svelte**: `cd svelte-mfe && npm run dev` (port 4173)

Visit http://localhost:3001 to see integrated MFEs.

### Component Development with Storybook
For isolated component development and documentation:

```bash
# Start Storybook (runs on port 6006)
npm run storybook
```

Visit http://localhost:6006 to view component stories.

**Available Stories:**
- **UI Components**: Button, AlertDialog with all variants and states
- **MFE Components**: AngularMFELoader, SvelteMFELoader with loading/error states

### Production Considerations
- Set `ENABLE_MODULE_FEDERATION=true` for production builds
- Each MFE can be deployed independently
- Shell application loads remotes from deployed URLs

### Integration Guidelines
- Each MFE should be runnable independently for development
- Use shared design tokens and styling conventions
- Coordinate on shared dependencies to avoid version conflicts
- Test integration points between shell and remotes

## Live Demo
- **Production Demo**: https://thieuluan.blog
- Experience the micro-frontend architecture with live demonstrations of integrated Angular and Svelte components

## Quick Start Verification
To quickly verify the setup is working:
1. Start all three applications as described above
2. Visit http://localhost:3001 to see the shell application
3. Check that both Angular (port 4201) and Svelte (port 4173) MFEs are accessible independently
4. Verify Module Federation integration in the shell application