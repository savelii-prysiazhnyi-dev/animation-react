import React, { useState } from 'react'
import { Reorder } from 'framer-motion'
import { GripVertical, RotateCcw } from 'lucide-react'

interface TaskItem {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low'
  assignee: string
}

const INITIAL_TASKS: TaskItem[] = [
  { id: '1', title: 'Refine modal spring damping and exit curve', priority: 'high', assignee: 'AV' },
  { id: '2', title: 'Unify color tokens with dark mode palette', priority: 'medium', assignee: 'SC' },
  { id: '3', title: 'Add keyboard navigation to navigation menu', priority: 'high', assignee: 'MB' },
  { id: '4', title: 'Benchmark animation frame performance', priority: 'low', assignee: 'AV' },
]

export const ReorderList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS)
  const [draggedId, setDraggedId] = useState<string | null>(null)

  const priorityBadge = {
    high: 'text-amber-400 bg-amber-500/10',
    medium: 'text-blue-400 bg-blue-500/10',
    low: 'text-zinc-400 bg-zinc-800',
  }

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="w-full max-w-md flex items-center justify-between px-1">
        <span className="text-xs text-zinc-400">Sprint Backlog</span>
        <button
          onClick={() => setTasks(INITIAL_TASKS)}
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Order</span>
        </button>
      </div>

      <div className="w-full max-w-md">
        <Reorder.Group
          axis="y"
          values={tasks}
          onReorder={setTasks}
          className="space-y-2 list-none m-0 p-0"
        >
          {tasks.map((task) => {
            const isDragging = draggedId === task.id
            return (
              <Reorder.Item
                key={task.id}
                value={task}
                id={task.id}
                onDragStart={() => setDraggedId(task.id)}
                onDragEnd={() => setDraggedId(null)}
                whileDrag={{
                  scale: 1.02,
                  boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.6)',
                  cursor: 'grabbing',
                }}
                className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border transition-colors select-none ${
                  isDragging
                    ? 'bg-zinc-800 border-zinc-600 z-20'
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <span className="cursor-grab active:cursor-grabbing text-zinc-500 hover:text-zinc-300 shrink-0 touch-none">
                    <GripVertical className="w-4 h-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-zinc-200 truncate">{task.title}</div>
                    <div className="mt-1">
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded capitalize ${
                          priorityBadge[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-mono font-medium text-zinc-300 shrink-0 ml-2">
                  {task.assignee}
                </div>
              </Reorder.Item>
            )
          })}
        </Reorder.Group>
      </div>
    </div>
  )
}
