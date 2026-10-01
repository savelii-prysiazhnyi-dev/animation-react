import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CircleDot,
  CloudUpload,
  Mic,
  Music,
  PhoneCall,
  PhoneOff,
  Wifi,
} from 'lucide-react'
import { springSmooth, springSnappy } from '@/lib/motion-tokens'

type IslandState = 'idle' | 'upload' | 'call' | 'music'

export const DynamicIsland: React.FC = () => {
  const [islandState, setIslandState] = useState<IslandState>('idle')

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* State Switcher Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
        {(['idle', 'upload', 'call', 'music'] as IslandState[]).map((state) => (
          <button
            key={state}
            onClick={() => setIslandState(state)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              islandState === state
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {state}
          </button>
        ))}
      </div>

      {/* Morphing Island Container */}
      <div className="h-28 w-full flex items-center justify-center">
        <motion.div
          layout
          transition={springSmooth}
          className="relative flex items-center justify-between overflow-hidden bg-black border border-zinc-800 text-white shadow-2xl"
          style={{
            borderRadius: islandState === 'idle' ? 9999 : 22,
            padding: islandState === 'idle' ? '8px 16px' : '14px 18px',
            minWidth: islandState === 'idle' ? 170 : islandState === 'upload' ? 300 : 320,
          }}
        >
          <AnimatePresence mode="wait">
            {islandState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={springSnappy}
                className="flex items-center justify-between w-full gap-4 text-xs font-mono"
              >
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <CircleDot className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>09:41</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Wifi className="w-3.5 h-3.5" />
                  <span>5G</span>
                </div>
              </motion.div>
            )}

            {islandState === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={springSnappy}
                className="flex flex-col gap-2 w-full"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CloudUpload className="w-4 h-4 text-indigo-400" />
                    <span className="font-medium text-zinc-200">assets.zip</span>
                  </div>
                  <span className="font-mono text-zinc-400">84%</span>
                </div>

                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '15%' }}
                    animate={{ width: '84%' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  />
                </div>
              </motion.div>
            )}

            {islandState === 'call' && (
              <motion.div
                key="call"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={springSnappy}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <PhoneCall className="w-3.5 h-3.5" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border border-black rounded-full" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-zinc-100">Client Call</div>
                    <div className="text-[11px] font-mono text-emerald-400">04:12</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors">
                    <Mic className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setIslandState('idle')}
                    className="p-1.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30 transition-colors"
                  >
                    <PhoneOff className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}

            {islandState === 'music' && (
              <motion.div
                key="music"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={springSnappy}
                className="flex items-center justify-between w-full gap-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Music className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-zinc-100">Midnight City</div>
                    <div className="text-[10px] text-zinc-400">M83</div>
                  </div>
                </div>

                <div className="flex items-end gap-0.5 h-4">
                  {[0.4, 0.9, 0.6, 1, 0.5, 0.7].map((height, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scaleY: [height, 0.25, 1, height],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8 + i * 0.1,
                        ease: 'easeInOut',
                      }}
                      className="w-0.5 bg-indigo-400 rounded-full origin-bottom"
                      style={{ height: '100%' }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
