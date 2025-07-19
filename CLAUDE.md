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
- **Angular** micro-frontend (`angular-mfe/`)
- **Svelte** micro-frontend (to be added)

The shell application orchestrates and loads the remote micro-frontends, providing a unified user experience while maintaining independent deployment capabilities for each MFE.

## Development Commands

### Shell Application (Root)
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Angular MFE
```bash
# Navigate to Angular MFE
cd angular-mfe

# Install dependencies
npm install

# Start development server
npm start
# or
ng serve

# Build for production
npm run build
# or
ng build

# Run tests
npm test
# or
ng test
```

### Svelte MFE (when added)
```bash
# Navigate to Svelte MFE
cd svelte-mfe

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
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

svelte-mfe/            # Svelte micro-frontend (to be added)
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

### Angular MFE
- Built with Angular 18+ and standalone components
- Uses TypeScript for type safety
- Configured to expose components via Module Federation
- Independent routing and state management

### Integration Guidelines
- Each MFE should be runnable independently for development
- Use shared design tokens and styling conventions
- Coordinate on shared dependencies to avoid version conflicts
- Test integration points between shell and remotes