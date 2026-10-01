import type { Transition } from 'framer-motion'

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 35,
  mass: 0.8,
}

export const springSmooth: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 28,
  mass: 1,
}

export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 18,
}

export const fadeInVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.15, ease: 'easeOut' },
  },
}
