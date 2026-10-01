import React, { useState } from 'react'
import { motion, MotionConfig } from 'framer-motion'
import {
  CommandMenu,
  DynamicIsland,
  ExpandableCards,
  ReorderList,
  SegmentedTabs,
  TiltCard,
} from '@/components/motion-features'

interface FeatureCard {
  id: string
  title: string
  description: string
  component: React.ReactNode
}

export default function App() {
  const [slowMotion, setSlowMotion] = useState(false)

  const features: FeatureCard[] = [
    {
      id: 'segmented-tabs',
      title: 'Segmented Tabs',
      description: 'Sliding pill navigation with spring transitions and hover previews.',
      component: <SegmentedTabs />,
    },
    {
      id: 'command-menu',
      title: 'Command Palette',
      description: 'Expandable search modal with drilldown submenus and dynamic height adjustment.',
      component: <CommandMenu />,
    },
    {
      id: 'dynamic-island',
      title: 'Dynamic Island',
      description: 'Adaptive status pill transitioning between compact and expanded states.',
      component: <DynamicIsland />,
    },
    {
      id: 'expandable-cards',
      title: 'Expandable Cards',
      description: 'Project cards that expand into focused modals with shared element transitions.',
      component: <ExpandableCards />,
    },
    {
      id: 'reorder-list',
      title: 'Task Reorder',
      description: 'Interactive drag-and-drop task prioritization with elevation feedback.',
      component: <ReorderList />,
    },
    {
      id: 'tilt-card',
      title: '3D Interactive Card',
      description: 'Perspective card with real-time cursor tracking and dynamic surface reflection.',
      component: <TiltCard />,
    },
  ]

  return (
    <MotionConfig transition={{ duration: slowMotion ? 1.2 : undefined }}>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-700 selection:text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
          {/* Hero Section */}
          <header className="flex flex-col items-center text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Motion Features
            </h1>
            <p className="text-sm text-zinc-400 max-w-lg">
              A collection of fluid micro-interactions and interactive components built with React and Framer Motion.
            </p>

            <div className="pt-2">
              <label
                htmlFor="slow-mo-switch"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 cursor-pointer select-none transition-colors"
              >
                <span>Slow-motion preview</span>
                <input
                  id="slow-mo-switch"
                  type="checkbox"
                  checked={slowMotion}
                  onChange={(e) => setSlowMotion(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-7 h-4 rounded-full transition-colors relative p-0.5 ${
                    slowMotion ? 'bg-indigo-600' : 'bg-zinc-800'
                  }`}
                >
                  <motion.div
                    animate={{ x: slowMotion ? 12 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="w-3 h-3 rounded-full bg-white shadow-sm"
                  />
                </div>
              </label>
            </div>
          </header>

          {/* Clean Components Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <section
                key={feature.id}
                className="flex flex-col justify-between rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-base font-semibold text-zinc-100">
                    {feature.title}
                  </h2>
                  <p className="text-xs text-zinc-400">
                    {feature.description}
                  </p>
                </div>

                <div className="w-full flex items-center justify-center min-h-[160px]">
                  {feature.component}
                </div>
              </section>
            ))}
          </div>

          <footer className="pt-8 border-t border-zinc-900 text-center text-xs text-zinc-600">
            Interactive Animation Showcase • React & Framer Motion
          </footer>
        </div>
      </div>
    </MotionConfig>
  )
}
