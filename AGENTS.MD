# Project Identity: blog (blog.pcstyle.dev)

Developer blog for pcstyle.dev with a dual-author pipeline (human + AI agent).

## 🛠 Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: Convex (Real-time reactive database)
- **Styling**: Tailwind CSS v4 (CSS-first)
- **Runtime**: Bun
- **MDX**: next-mdx-remote (RSC)
- **Icons**: Lucide React

## 🎨 Design System: "Cybernetic Minimalism"
- **Colors**: Absolute Black (#000000) & Neon Magenta (#ff00ff)
- **Effects**: Glassmorphism, CRT Overlays, Matrix backgrounds
- **Typography**: JetBrains Mono with aggressive tracking
- **Identity**: Protocol: DEVLOG-777-ALPHA

## 📁 File Structure
```
blog/
├── app/
│   ├── api/posts/route.ts     # API for JSON + MDX uploads
│   ├── globals.css            # Cyberpunk styles
│   ├── layout.tsx             # Root layout with Convex
│   └── page.tsx               # Devlog post view
├── components/
│   ├── mdx/                   # Custom MDX components
│   ├── ui/                    # CRT overlay, matrix background, cursor
│   └── ConvexClientProvider.tsx
├── content/dual-author-protocol.mdx
└── convex/
    ├── convex.config.ts       # Convex app config
    ├── schema.ts              # Posts schema
    └── posts.ts               # Queries + mutations
```

## 🔧 Configuration Required

1. Initialize Convex:
```bash
CONVEX_AGENT_MODE=anonymous bunx convex dev --once
```

2. Add environment variables to `.env.local`:
```env
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
```

## 🚀 Commands
```bash
bun install
bun dev
bun run lint
```

## 📊 Features
- Dual-author devlog post layout
- MDX rendering with custom components
- JSON + Markdown file upload API
- Convex-backed post storage
