import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Cpu, ShieldCheck } from 'lucide-react'

export const TiltCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12])

  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%'])
  const glareBackground = useMotionTemplate`radial-gradient(circle 260px at ${glareX} ${glareY}, rgba(255,255,255,0.12), transparent 80%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div className="w-full flex flex-col items-center py-2 [perspective:1000px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-72 sm:w-80 h-44 rounded-2xl border border-zinc-750 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black p-5 shadow-xl cursor-pointer overflow-hidden select-none"
      >
        {/* Dynamic Specular Glare */}
        <motion.div
          style={{ background: glareBackground }}
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
        />

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

        {/* Card Content with 3D Depth */}
        <div className="relative z-10 flex flex-col justify-between h-full [transform:translateZ(25px)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-medium tracking-wider text-zinc-400 uppercase">
              Developer Access
            </span>
            <Cpu className="w-5 h-5 text-zinc-500" />
          </div>

          <div>
            <div className="font-mono text-sm tracking-widest text-zinc-200">
              •••• •••• •••• 4092
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">Verified Member</div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[11px] text-zinc-400">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Active</span>
            </div>
            <span className="font-mono text-zinc-500">Exp 12/28</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
