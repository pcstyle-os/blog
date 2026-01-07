# Project Identity: short (s.pcstyle.dev)

This project follows the **pcstyle** high-performance stack and aesthetic.

## 🛠 Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: Convex (Real-time reactive database)
- **Styling**: Tailwind CSS v4 (CSS-first)
- **Runtime**: Bun
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 🎨 Design System: "Cybernetic Minimalism"
- **Colors**: Absolute Black (#000000) & Neon Magenta (#ff00ff)
- **Effects**: Glassmorphism, CRT Overlays, Matrix backgrounds
- **Typography**: JetBrains Mono with aggressive tracking
- **Identity**: Protocol: SHORT-777-ALPHA

## 📁 File Structure
```
short/
├── app/
│   ├── [shortCode]/
│   │   ├── page.tsx         # Redirect handler
│   │   └── not-found.tsx    # 404 for invalid links
│   ├── globals.css          # Cyberpunk styles
│   ├── layout.tsx           # Root layout with Convex
│   └── page.tsx             # Main shortener page
├── components/
│   ├── ui/
│   │   ├── CRTOverlay.tsx
│   │   ├── MatrixBackground.tsx
│   │   └── NeuralCursor.tsx
│   ├── ConvexClientProvider.tsx
│   └── LinkShortener.tsx    # Main component
└── convex/
    ├── schema.ts            # Database schema
    └── links.ts             # Mutations & queries
```

## 🔧 Configuration Required

1. Initialize Convex:
```bash
bunx convex dev
```

2. Add environment variables to `.env.local`:
```env
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
```

## 🌐 Domain Setup
Configure `s.pcstyle.dev` to point to your Vercel deployment.

## 🚀 Commands
```bash
bun install          # Install dependencies
bunx convex dev      # Start Convex in dev mode
bun dev              # Start Next.js development server
bun build            # Build for production
```

## 📊 Features
- URL shortening with auto-generated codes
- Custom alias support
- Real-time click tracking
- Recent links display
- Copy-to-clipboard functionality
