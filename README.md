# Motion Features

A collection of fluid micro-interactions and interactive components built with React and Framer Motion.

## Features

- **Segmented Tabs**: Sliding pill navigation with spring transitions and hover previews.
- **Command Palette**: Expandable search modal with drilldown submenus and dynamic height morphing.
- **Dynamic Island**: Adaptive status pill transitioning across idle, upload, audio, and call states.
- **Expandable Cards**: Project cards that expand into focused modals with shared element transitions.
- **Task Reorder**: Interactive drag-and-drop task prioritization with elevation feedback.
- **3D Interactive Card**: Perspective card with real-time cursor tracking and dynamic surface reflection.

## Tech Stack

- React 19 + TypeScript
- Framer Motion
- Tailwind CSS v4
- Lucide React
- Vite

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Structure

```text
src/
├── components/
│   └── motion-features/           # Interactive components
│       ├── command-menu/
│       ├── dynamic-island/
│       ├── expandable-card/
│       ├── reorder-list/
│       ├── segmented-tabs/
│       ├── tilt-card/
│       └── index.ts
├── lib/
│   ├── motion-tokens.ts           # Spring physics presets
│   └── utils.ts
├── App.tsx                        # Showcase layout
└── main.tsx
```
