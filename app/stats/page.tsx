'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/lib/store'
import { TEAMS, ALL_STICKERS } from '@/data/stickers'
import { cn } from '@/lib/utils'

function CircleProgress({ percent }: { percent: number }) {
  const r    = 54
  const circ = 2 * Math.PI * r
  const offset = circ - (percent / 100) * circ

  return (
    <div className="relative w-44 h-44 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#E2E4EB" strokeWidth="10" />
        <motion.circle
          cx="60" cy="60" r={r} fill="none"
          stroke="url(#pg)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#E61D25" />
            <stop offset="100%" stopColor="#C9A84C" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black text-brand-text">{percent}%</span>
        <span className="text-xs text-brand-muted mt-1 font-semibold">completado</span>
      </div>
    </div>
  )
}

export default function StatsPage() {
  const getStats     = useStore(s => s.getStats)
  const getTeamStats = useStore(s => s.getTeamStats)
  const stickerStates = useStore(s => s.stickerStates)
  const stats        = getStats()

  const teamStats = useMemo(() =>
    TEAMS.map(t => ({ ...t, ...getTeamStats(t.code) }))
      .sort((a, b) => b.percent - a.percent),
    [getTeamStats]
  )

  const teamsComplete = teamStats.filter(t => t.owned === 20).length

  const groupsComplete = ['A','B','C','D','E','F','G','H','I','J','K','L'].filter(g =>
    TEAMS.filter(t => t.group === g).every(t =>
      ALL_STICKERS.filter(s => s.teamCode === t.code).every(s => {
        const st = stickerStates[s.id]
        return st?.status === 'have' || st?.status === 'repeated'
      })
    )
  ).length

  const stickersPerDay = stats.owned > 0
    ? Math.ceil((986 - stats.owned) / 7)
    : null

  const cards = [
    { label: 'Obtenidas',         value: stats.owned,    bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: '✅' },
    { label: 'Faltantes',         value: stats.missing,  bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-brand-red',   icon: '🎯' },
    { label: 'Repetidas',         value: stats.repeated, bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   icon: '⭐' },
    { label: 'Países completos',  value: teamsComplete,  bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-700',    icon: '🏆' },
    { label: 'Grupos completos',  value: groupsComplete, bg: 'bg-purple-50',  border: 'border-purple-200',  text: 'text-purple-700',  icon: '🎖️' },
    { label: 'Total álbum',       value: 986,            bg: 'bg-brand-surface-2', border: 'border-brand-border', text: 'text-brand-muted', icon: '📖' },
  ]

  return (
    <div className="min-h-screen px-4 pt-6 bg-brand-bg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-brand-text">Estadísticas</h1>
          <p className="text-xs text-brand-muted mt-0.5">Tu progreso actual</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center">
          <span className="text-xl">📊</span>
        </div>
      </div>

      {/* Círculo */}
      <div className="bg-brand-surface rounded-3xl p-6 border border-brand-border shadow-card mb-4">
        <CircleProgress percent={stats.percentComplete} />
      </div>

      {/* Grid de stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {cards.map(({ label, value, bg, border, text, icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1,  y:  0 }}
            transition={{ delay: i * 0.06 }}
            className={cn('rounded-2xl p-4 border shadow-card', bg, border)}
          >
            <span className="text-2xl">{icon}</span>
            <p className={cn('text-3xl font-extrabold mt-1 leading-none', text)}>{value}</p>
            <p className="text-xs text-brand-muted mt-1 font-medium">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Estimación */}
      {stickersPerDay && stats.percentComplete < 100 && (
        <div className="bg-brand-gold-light border border-amber-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <span className="text-2xl">⏱️</span>
          <div>
            <p className="text-xs text-brand-muted">Para completar a este ritmo</p>
            <p className="text-brand-text mt-0.5">
              <span className="text-xl font-extrabold text-brand-gold">{stickersPerDay}</span>
              <span className="text-sm ml-1 text-brand-muted">figuritas por día (7 días)</span>
            </p>
          </div>
        </div>
      )}

      {/* Progreso por país */}
      <h2 className="text-sm font-bold text-brand-text mb-3">Ranking por país</h2>
      <div className="space-y-2 pb-4">
        {teamStats.map((t, i) => (
          <motion.div
            key={t.code}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.018 }}
            className="flex items-center gap-3 bg-brand-surface rounded-xl px-3 py-2.5 border border-brand-border shadow-card"
          >
            <span className="text-xs font-bold text-brand-faint w-5 text-right flex-shrink-0">
              {i + 1}
            </span>
            <span className="text-lg w-7 text-center">{t.flag}</span>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-brand-text truncate">{t.name}</span>
                <span className="text-xs text-brand-muted font-mono ml-2 flex-shrink-0">{t.owned}/20</span>
              </div>
              <div className="h-1.5 bg-brand-surface-2 rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all', t.owned === 20 ? 'bg-emerald-500' : 'bg-gradient-to-r from-brand-red to-brand-gold')}
                  style={{ width: `${t.percent}%` }}
                />
              </div>
            </div>
            {t.owned === 20 && <span className="text-emerald-500 text-sm flex-shrink-0 font-bold">✓</span>}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
