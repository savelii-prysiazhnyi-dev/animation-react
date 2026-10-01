import React, { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronRight,
  Command,
  FileCode,
  Layers,
  Search,
  Settings,
  User,
  X,
} from 'lucide-react'
import { springSmooth, springSnappy } from '@/lib/motion-tokens'

interface MenuItem {
  id: string
  title: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  shortcut?: string
  subItems?: { id: string; title: string; subtitle?: string }[]
}

const ITEMS: MenuItem[] = [
  {
    id: 'assign',
    title: 'Assign to team member',
    category: 'Actions',
    icon: User,
    shortcut: 'A',
    subItems: [
      { id: '1', title: 'Alex Vance', subtitle: 'Design Systems' },
      { id: '2', title: 'Sarah Connor', subtitle: 'Architecture' },
      { id: '3', title: 'Marcus Brody', subtitle: 'Frontend Lead' },
    ],
  },
  {
    id: 'status',
    title: 'Update issue status',
    category: 'Actions',
    icon: Layers,
    shortcut: 'S',
    subItems: [
      { id: 'backlog', title: 'Backlog', subtitle: 'Future sprint' },
      { id: 'in_progress', title: 'In Progress', subtitle: 'Active work' },
      { id: 'in_review', title: 'In Review', subtitle: 'Pending approval' },
      { id: 'done', title: 'Completed', subtitle: 'Shipped to main' },
    ],
  },
  {
    id: 'due',
    title: 'Set target due date',
    category: 'Actions',
    icon: Calendar,
    shortcut: 'D',
  },
  {
    id: 'export',
    title: 'Export asset package',
    category: 'Developer',
    icon: FileCode,
    shortcut: '⌘E',
  },
  {
    id: 'settings',
    title: 'Workspace settings',
    category: 'Preferences',
    icon: Settings,
    shortcut: '⌘,',
  },
]

export const CommandMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeSubMenu, setActiveSubMenu] = useState<MenuItem | null>(null)
  const [notification, setNotification] = useState<string | null>(null)
  const searchInputId = useId()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape' && isOpen) {
        if (activeSubMenu) {
          setActiveSubMenu(null)
        } else {
          setIsOpen(false)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, activeSubMenu])

  const filteredItems = ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()),
  )

  const handleAction = (text: string) => {
    setNotification(text)
    setActiveSubMenu(null)
    setIsOpen(false)
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Trigger Bar */}
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center justify-between w-full max-w-sm px-4 py-3 text-sm rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors text-zinc-400 hover:text-zinc-200 shadow-sm"
      >
        <div className="flex items-center gap-2.5">
          <Search className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
          <span>Search actions or navigate...</span>
        </div>
        <kbd className="flex items-center gap-0.5 text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60">
          <Command className="w-3 h-3" />
          <span>K</span>
        </kbd>
      </button>

      {/* Confirmation feedback */}
      <div className="h-6 flex items-center justify-center">
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dialog Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={springSmooth}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl z-10"
            >
              {/* Search Header */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800 bg-zinc-900/90">
                {activeSubMenu ? (
                  <button
                    onClick={() => setActiveSubMenu(null)}
                    className="p-1 text-zinc-400 hover:text-zinc-200 rounded-md hover:bg-zinc-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <Search className="w-4 h-4 text-zinc-400" />
                )}

                <input
                  id={searchInputId}
                  name="command-query"
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={activeSubMenu ? `Select ${activeSubMenu.title}...` : 'Type a command...'}
                  className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 outline-none"
                />

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-zinc-500 hover:text-zinc-300 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic Drilldown Items */}
              <motion.div layout="size" transition={springSnappy} className="p-2 max-h-[300px] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeSubMenu ? (
                    <motion.div
                      key={`sub-${activeSubMenu.id}`}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-1"
                    >
                      <div className="px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                        {activeSubMenu.title}
                      </div>
                      {activeSubMenu.subItems?.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleAction(`${activeSubMenu.title}: ${sub.title}`)}
                          className="flex items-center justify-between w-full px-3 py-2 text-left rounded-lg text-sm text-zinc-200 hover:bg-zinc-800 transition-colors"
                        >
                          <div>
                            <div className="font-medium">{sub.title}</div>
                            {sub.subtitle && <div className="text-xs text-zinc-500">{sub.subtitle}</div>}
                          </div>
                          <Check className="w-4 h-4 text-transparent group-hover:text-zinc-400" />
                        </button>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="main-menu"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-1"
                    >
                      {filteredItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              if (item.subItems) {
                                setActiveSubMenu(item)
                              } else {
                                handleAction(item.title)
                              }
                            }}
                            className="flex items-center justify-between w-full px-3 py-2 text-left rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="font-medium">{item.title}</span>
                            </div>

                            {item.subItems ? (
                              <ChevronRight className="w-4 h-4 text-zinc-500" />
                            ) : item.shortcut ? (
                              <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                                {item.shortcut}
                              </kbd>
                            ) : null}
                          </button>
                        )
                      })}

                      {filteredItems.length === 0 && (
                        <div className="py-6 text-center text-xs text-zinc-500">
                          No matching actions
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
