'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'

export default function AchievementToast() {
  const achievement = useStore(s => s.newAchievement)
  const clear       = useStore(s => s.clearNewAchievement)

  useEffect(() => {
    if (!achievement) return
    const t = setTimeout(clear, 3500)
    return () => clearTimeout(t)
  }, [achievement, clear])

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          key={achievement.id}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0,    opacity: 1 }}
          exit={{    y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          className="fixed top-0 left-0 right-0 z-[100] px-4 pt-12 pb-2 pointer-events-none"
        >
          <div className="bg-white border border-brand-border rounded-2xl p-4 shadow-card-md flex items-center gap-3 pointer-events-auto mx-auto max-w-sm">
            <div className="w-11 h-11 rounded-xl bg-brand-gold-light flex items-center justify-center text-xl flex-shrink-0">
              {achievement.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-brand-text text-sm leading-tight">{achievement.title}</p>
              <p className="text-brand-muted text-xs mt-0.5 truncate">{achievement.description}</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-brand-gold flex-shrink-0" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
