# 🛠️ System Workflow & Implementation Architecture

## 1. Project Anatomy & Technology Stack
- **Client (`/client`)**: React 18+ (Vite/TypeScript) + Tailwind CSS + Framer Motion (for dynamic Dock physics) + GSAP & ScrollTrigger (for text reveals, 3D card tilt, tech stack animations, and smooth scrolling).
- **Backend (`/server`)**: Lightweight Express.js API handling contact routing, rate limiting, and status checks.
- **Component Primitives**: shadcn/ui folder conventions (`src/components/ui/`).
- **Typography**: San Francisco Pro Display local font subsets (`SF Pro Display`, `-apple-system`).
## 2. Directory Structure

```text
├── server/
│   ├── index.ts
│   ├── routes/contact.ts
│   └── package.json
└── client/
    ├── public/fonts/ (SF Pro Display font files)
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── ui/
    │   │   │   ├── mac-os-dock.tsx (from dock1.md / dock2.md)
    │   │   │   ├── RectangleButtons.tsx (from Button2.md)
    │   │   │   └── PredictiveArcCanvas.tsx (from background.md)
    │   │   ├── TechStack.tsx
    │   │   ├── CustomCursor.tsx
    │   │   └── Projects.tsx
    │   ├── hooks/
    │   ├── App.tsx
    │   └── main.tsx
    ├── tailwind.config.js
    └── tsconfig.json