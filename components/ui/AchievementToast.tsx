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
          initial={{ y: -80, opacity: 0, scale: 0.92 }}
          animate={{ y: 0,   opacity: 1, scale: 1    }}
          exit={{    y: -80, opacity: 0, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm"
        >
          <div className="bg-white border border-brand-border rounded-2xl p-4 shadow-card-md flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-gold-light flex items-center justify-center text-2xl flex-shrink-0">
              {achievement.icon}
            </div>
            <div>
              <p className="font-bold text-brand-text text-sm leading-tight">{achievement.title}</p>
              <p className="text-brand-muted text-xs mt-0.5">{achievement.description}</p>
            </div>
            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
