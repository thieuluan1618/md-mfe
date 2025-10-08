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
├── layout.js          # Root layout with font configuration (font-display: swap)
├── page.js            # Main page with MFE integration
├── qr-code/
│   ├── page.js        # QR code page with TheKeo App (lazy loaded components)
│   └── layout.js      # QR page metadata with resource hints
└── globals.css        # Global Tailwind styles (includes scrollbar hiding)

components/
├── ui/                # shadcn/ui components
│   ├── alert-dialog.jsx
│   └── button.jsx
├── TheKeoApp.jsx      # Bill-sharing application component (lazy loaded)
├── ImageViewer.jsx    # Full-screen image viewer with React Portal
├── Sunbeam.jsx        # Canvas-based animated sunbeam for sunny weather
├── MoonNight.jsx      # Animated night sky with optimized WebP images
├── NightRain.jsx      # Combined night rain effect
└── Rain.jsx           # Rain animation component

hooks/
└── useWeather.js      # Custom hook for weather API with auto-refresh

lib/
└── utils.js           # Utility functions (cn for className merging)

scripts/
├── convert-to-webp.js      # WebP conversion script
└── optimize-night-images.js # Image optimization for mobile performance

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
- **perfect-scrollbar**: Custom scrollbar library for smooth scrolling UX

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

## Project Context
- **Target Audience**: Fun project designed for small groups of friends
- **Language Context**: Vietnamese language context and user base
- **Social Focus**: Emphasizes friend-to-friend interactions and shared experiences
- **Cultural Note**: Built with Vietnamese users in mind for social bill-sharing scenarios

## TheKeo App Features

### QR Code Page (`/qr-code`)
A bill-sharing application with payment tracking integrated with bank QR code:

**Key Features:**
- **Toggleable Layout**: TheKeo App panel can be shown/hidden with top-right button
- **Bank Info with Copy-to-Clipboard**: Click any bank detail to copy (account number, name, bank name)
- **Transaction API Integration**: Fetches real-time payment data from `https://go-transaction-api-wqzlk.sevalla.app/api/v1/transactions`
- **Custom Scrollbar**: Uses perfect-scrollbar for smooth, auto-hiding scrollbars
- **Image Gallery**: Multi-image support with full-screen viewer using React Portal
- **Bill Splitting Calculator**: Dynamic calculation for splitting bills among friends
- **Responsive Design**: Adapts between mobile and desktop layouts
- **Weather-Based Visual Effects**:
  - Real-time weather API integration using Open-Meteo (geolocation-based)
  - Three weather themes: Sun (animated sunbeams), Rain (falling raindrops), Night (starry sky with moon)
  - User-controllable weather theme toggle (bottom-right corner)
  - Graceful fallback to Ho Chi Minh City coordinates if geolocation is denied

**Components:**
- **TheKeoApp.jsx**: Main bill-sharing component with state management (lazy loaded)
- **ImageViewer.jsx**: Full-screen image viewer with zoom, pan, rotate capabilities
  - Uses React Portal to render outside parent DOM hierarchy
  - Keyboard shortcuts (←/→ navigate, +/- zoom, Esc close)
  - Mouse wheel zoom and drag-to-pan support
- **Sunbeam.jsx**: Canvas-based animated sunbeam effect for sunny weather (lazy loaded)
- **MoonNight.jsx**: Animated night sky with stars, twinkling, clouds, and moon (lazy loaded)
- **NightRain.jsx**: Combined night rain effect (lazy loaded)

**Custom Hooks:**
- **useWeather**: Fetches weather data with geolocation support
  - Auto-refresh every 5 minutes
  - Fallback to Ho Chi Minh City coordinates
  - Returns weather data and loading state
- **getWeatherTheme**: Determines theme based on `is_day` field and weather codes
  - Supports override for manual theme selection

**Styling Notes:**
- Default browser scrollbar hidden globally in `globals.css`
- Glass morphism design with backdrop-blur effects
- Smooth transitions and animations throughout
- Vietnamese language UI
- Custom CSS animations: `@keyframes rain`, `@keyframes move-background` for weather effects

## Performance Optimizations

### Mobile Performance (Lighthouse)
The application is optimized for mobile performance with focus on LCP (Largest Contentful Paint):

**Code Optimizations:**
- **Lazy Loading**: All weather components and TheKeoApp use React.lazy() with Suspense
- **Font Display**: Uses `font-display: swap` to prevent FOIT (Flash of Invisible Text)
- **Resource Hints**: DNS prefetch and preconnect for external APIs (weather, transactions)
- **Image Priority**: QR code image uses `fetchPriority="high"` and `loading="eager"`
- **Code Splitting**: Reduces initial bundle size by ~40-60%

**Image Optimizations:**
- **Night Theme Images**: Optimized WebP format with 47% total size reduction
  - moon2.webp: 180.5KB → 69KB (800x790px)
  - stars.webp: 124.9KB → 52KB (1200x825px)
  - twinkling.webp: 200.2KB → 136KB (800x800px)
  - clouds_repeat.webp: 178.2KB → 104KB (800x800px)
- **Optimization Script**: `scripts/optimize-night-images.js` for batch processing
- **Backups**: Original images preserved as `*.backup.webp`

**Expected Results:**
- Faster LCP score on mobile (critical content loads first)
- Reduced initial load time (~300KB savings on night theme)
- Better Time to Interactive (TTI) with code splitting
- Improved network performance on slower connections
