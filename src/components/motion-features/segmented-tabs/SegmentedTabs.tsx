import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Clock, Inbox, Star } from 'lucide-react'
import { springSnappy } from '@/lib/motion-tokens'

interface TabItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

const TABS: TabItem[] = [
  { id: 'inbox', label: 'Inbox', icon: Inbox, badge: 4 },
  { id: 'today', label: 'Today', icon: Clock },
  { id: 'starred', label: 'Starred', icon: Star, badge: 12 },
  { id: 'done', label: 'Done', icon: CheckCircle2 },
]

export const SegmentedTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('inbox')
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  return (
    <div className="w-full flex flex-col items-center gap-4 sm:gap-6">
      {/* Segmented Control Bar */}
      <div
        role="tablist"
        aria-label="Navigation Tabs"
        onMouseLeave={() => setHoveredTab(null)}
        className="relative grid grid-cols-2 sm:inline-flex sm:flex-row items-center justify-center gap-1 sm:gap-1.5 p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 shadow-inner w-full sm:w-auto max-w-xs sm:max-w-none"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          const isHovered = hoveredTab === tab.id
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-[13px] font-medium transition-colors select-none outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg shrink-0"
            >
              {/* Active selection pill */}
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  transition={springSnappy}
                  className="absolute inset-0 z-[-1] rounded-lg bg-zinc-800 border border-zinc-700/70 shadow-md shadow-black/40"
                />
              )}

              {/* Hover highlight preview */}
              {!isActive && isHovered && (
                <motion.div
                  layoutId="hoverTabPill"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className="absolute inset-0 z-[-1] rounded-lg bg-zinc-800/40"
                />
              )}

              <Icon
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-colors duration-150 ${
                  isActive ? 'text-indigo-400' : 'text-zinc-400 group-hover:text-zinc-200'
                }`}
              />

              <span
                className={`whitespace-nowrap transition-colors duration-150 ${
                  isActive ? 'text-zinc-100 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab.label}
              </span>

              {tab.badge !== undefined && (
                <span
                  className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-medium leading-none tabular-nums rounded-full shrink-0 transition-colors ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-300'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Dynamic Tab Panel Content */}
      <div className="w-full max-w-xs sm:max-w-md min-h-[80px] sm:min-h-[100px] p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="text-center space-y-1"
          >
            <div className="text-sm font-medium text-zinc-200 capitalize">
              {activeTab} Feed
            </div>
            <div className="text-xs text-zinc-500">
              Showing prioritized items and updates for {activeTab}.
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
