import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react'
import { springSmooth } from '@/lib/motion-tokens'

interface ProjectCard {
  id: string
  title: string
  category: string
  description: string
  details: string
  highlights: string[]
  gradient: string
}

const PROJECTS: ProjectCard[] = [
  {
    id: 'design-system',
    title: 'Core Design System',
    category: 'Design Engineering',
    description: 'Component architecture with fluid spring physics and unified tokens.',
    details:
      'Engineered an enterprise component library focused on layout continuity, responsive micro-interactions, and accessible motion controls across desktop and mobile.',
    highlights: ['Adaptive layout transitions', 'Unified physics tokens', 'Accessible motion fallback'],
    gradient: 'from-indigo-500/20 via-indigo-900/10 to-transparent',
  },
  {
    id: 'analytics-platform',
    title: 'Real-time Metrics Deck',
    category: 'Product Experience',
    description: 'Data-rich dashboard modules with animated transitions and live filtering.',
    details:
      'Delivered interactive dashboards featuring smooth panel expansion, drilldown analytics, and natural gesture response for high-density monitoring.',
    highlights: ['Fluid drawer expansion', 'State preservation on resize', 'Hardware-accelerated rendering'],
    gradient: 'from-emerald-500/20 via-teal-900/10 to-transparent',
  },
]

export const ExpandableCards: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCardId(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const activeCard = PROJECTS.find((p) => p.id === activeCardId)

  return (
    <div className="w-full flex flex-col items-center">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => setActiveCardId(project.id)}
            transition={springSmooth}
            whileHover={{ y: -3 }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 hover:border-zinc-700 transition-colors shadow-sm"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`} />

            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div>
                <motion.span
                  layoutId={`category-${project.id}`}
                  className="text-[11px] font-medium tracking-wide uppercase text-zinc-400"
                >
                  {project.category}
                </motion.span>
                <motion.h3
                  layoutId={`title-${project.id}`}
                  className="mt-1 text-base font-semibold text-zinc-100 group-hover:text-white"
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  layoutId={`desc-${project.id}`}
                  className="mt-2 text-xs text-zinc-400 leading-relaxed"
                >
                  {project.description}
                </motion.p>
              </div>

              <div className="flex items-center justify-between text-xs font-medium text-zinc-400 group-hover:text-zinc-200">
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {activeCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCardId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              layoutId={`card-${activeCard.id}`}
              transition={springSmooth}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl z-10"
            >
              <div className={`p-6 bg-gradient-to-br ${activeCard.gradient}`}>
                <div className="flex items-start justify-between">
                  <motion.span
                    layoutId={`category-${activeCard.id}`}
                    className="text-xs font-medium tracking-wide uppercase text-zinc-400"
                  >
                    {activeCard.category}
                  </motion.span>

                  <button
                    onClick={() => setActiveCardId(null)}
                    className="p-1 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <motion.h3
                  layoutId={`title-${activeCard.id}`}
                  className="mt-2 text-xl font-bold text-white"
                >
                  {activeCard.title}
                </motion.h3>

                <motion.p
                  layoutId={`desc-${activeCard.id}`}
                  className="mt-2 text-sm text-zinc-300 leading-relaxed"
                >
                  {activeCard.description}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18 }}
                className="p-6 space-y-5 bg-zinc-900"
              >
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {activeCard.details}
                </p>

                <div className="space-y-2">
                  <div className="text-xs font-medium text-zinc-300">Key Deliverables</div>
                  <div className="space-y-1.5">
                    {activeCard.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveCardId(null)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
