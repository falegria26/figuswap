'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogIn, Trophy, Flame, Download, Star } from 'lucide-react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const ACHIEVEMENT_DEFS = [
  { id: 'first_sticker',  title: '¡Primera figurita!',  icon: '⭐' },
  { id: 'first_repeated', title: 'Primer repetido',     icon: '💎' },
  { id: 'team_complete',  title: 'País completo',       icon: '🏆' },
  { id: 'group_complete', title: 'Grupo completo',      icon: '🎯' },
  { id: 'quarter_album',  title: '25% completado',      icon: '📖' },
  { id: 'half_album',     title: '¡A mitad!',           icon: '🌟' },
  { id: 'three_quarters', title: '75% completado',      icon: '🔥' },
  { id: 'full_album',     title: '¡Álbum completo!',    icon: '🏅' },
  { id: 'streak_3',       title: 'En racha x3',         icon: '🔥' },
  { id: 'streak_7',       title: 'Racha semanal',       icon: '💪' },
]

const LEVELS = [
  { min: 0,   name: 'Principiante', color: 'text-brand-faint',  bg: 'bg-brand-surface-2' },
  { min: 10,  name: 'Coleccionista',color: 'text-blue-600',     bg: 'bg-blue-50'         },
  { min: 25,  name: 'Fanático',     color: 'text-purple-600',   bg: 'bg-purple-50'       },
  { min: 50,  name: 'Experto',      color: 'text-amber-600',    bg: 'bg-amber-50'        },
  { min: 75,  name: 'Maestro',      color: 'text-brand-red',    bg: 'bg-brand-red-light' },
  { min: 100, name: '¡Campeón! 🏅', color: 'text-brand-gold',   bg: 'bg-brand-gold-light'},
]

export default function PerfilPage() {
  const user          = useStore(s => s.user)
  const achievements  = useStore(s => s.achievements)
  const streak        = useStore(s => s.streak)
  const getStats      = useStore(s => s.getStats)
  const stickerStates = useStore(s => s.stickerStates)

  const [tab, setTab] = useState<'logros' | 'datos'>('logros')

  const stats       = getStats()
  const unlockedIds = new Set(achievements.map(a => a.id))

  const level = [...LEVELS].reverse().find(l => stats.percentComplete >= l.min) ?? LEVELS[0]

  const exportData = () => {
    const data = { exportedAt: new Date().toISOString(), stats, stickerStates }
    const blob  = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url   = URL.createObjectURL(blob)
    const a     = document.createElement('a')
    a.href = url; a.download = 'figuswap-backup.json'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen px-4 pt-6 bg-brand-bg">

      {/* Hero card */}
      <div className="bg-brand-surface border border-brand-border rounded-3xl p-5 mb-4 shadow-card-md overflow-hidden relative">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 fwc-pattern opacity-60 pointer-events-none" />

        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-red to-brand-gold flex items-center justify-center text-2xl shadow-red flex-shrink-0">
            ⚽
          </div>
          <div className="flex-1 min-w-0">
            <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-1', level.bg, level.color)}>
              <Star size={10} />
              {level.name}
            </div>
            <p className="text-brand-text font-bold leading-tight truncate">
              {user?.displayName ?? 'Coleccionista anónimo'}
            </p>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex items-center gap-1">
                <Flame size={13} className="text-brand-red" />
                <span className="text-xs font-bold text-brand-red">{streak} día{streak !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy size={13} className="text-brand-gold" />
                <span className="text-xs font-bold text-brand-gold">{achievements.length} logros</span>
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-3xl font-black text-brand-red leading-none">{stats.percentComplete}%</p>
            <p className="text-[10px] text-brand-muted">{stats.owned}/986</p>
          </div>
        </div>

        {/* Progress */}
        <div className="relative mt-4">
          <div className="h-2.5 bg-brand-surface-2 rounded-full overflow-hidden border border-brand-border">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-red to-brand-gold rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${stats.percentComplete}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>

      {/* Login banner */}
      {!user && (
        <div className="bg-brand-red-light border border-red-200 rounded-2xl p-4 mb-4 flex items-center gap-3 shadow-card">
          <div className="flex-1">
            <p className="text-brand-text text-sm font-bold">Sincronizá tu álbum</p>
            <p className="text-brand-muted text-xs mt-0.5">Creá cuenta para no perder tu progreso</p>
          </div>
          <button className="flex items-center gap-1.5 bg-brand-red text-white rounded-xl px-4 py-2.5 text-xs font-bold flex-shrink-0 shadow-red">
            <LogIn size={13} />
            Entrar
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex bg-brand-surface border border-brand-border rounded-2xl p-1 mb-4 shadow-card">
        {[
          { id: 'logros', label: '🏆 Mis logros'  },
          { id: 'datos',  label: '⚙️ Mis datos'   },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as 'logros' | 'datos')}
            className={cn(
              'flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all',
              tab === t.id ? 'bg-brand-red text-white shadow-red' : 'text-brand-muted'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Logros */}
      {tab === 'logros' && (
        <div className="grid grid-cols-2 gap-3">
          {ACHIEVEMENT_DEFS.map((def, i) => {
            const unlocked = unlockedIds.has(def.id)
            const data     = achievements.find(a => a.id === def.id)
            return (
              <motion.div
                key={def.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  'rounded-2xl p-4 border flex flex-col items-center gap-2 text-center transition-all shadow-card',
                  unlocked
                    ? 'bg-brand-gold-light border-amber-200'
                    : 'bg-brand-surface border-brand-border opacity-50 grayscale'
                )}
              >
                <span className="text-3xl">{def.icon}</span>
                <p className={cn('text-xs font-bold leading-tight', unlocked ? 'text-brand-text' : 'text-brand-muted')}>
                  {def.title}
                </p>
                {unlocked && data?.unlockedAt && (
                  <p className="text-[9px] text-brand-faint">
                    {new Date(data.unlockedAt).toLocaleDateString('es-AR')}
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Datos */}
      {tab === 'datos' && (
        <div className="space-y-3 pb-4">
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-4 shadow-card">
            <h3 className="text-sm font-bold text-brand-text mb-3">Resumen</h3>
            <div className="space-y-2.5">
              {[
                ['Figuritas obtenidas',  stats.owned,               'text-emerald-600'],
                ['Figuritas faltantes',  stats.missing,             'text-brand-red'  ],
                ['Repetidas',            stats.repeated,            'text-amber-600'  ],
                ['% completado',         `${stats.percentComplete}%`,'text-brand-text' ],
              ].map(([label, value, color]) => (
                <div key={String(label)} className="flex justify-between items-center">
                  <span className="text-sm text-brand-muted">{label}</span>
                  <span className={cn('text-sm font-bold', color)}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={exportData}
            className="w-full flex items-center justify-center gap-2 bg-brand-surface border border-brand-border rounded-2xl py-4 text-sm font-semibold text-brand-text shadow-card"
          >
            <Download size={16} className="text-brand-muted" />
            Exportar backup (JSON)
          </button>

          <div className="bg-brand-surface-2 border border-brand-border rounded-2xl p-4 text-center">
            <p className="text-xs text-brand-faint leading-relaxed">
              Tu progreso se guarda automáticamente en este dispositivo.<br />
              Creá una cuenta para sincronizar entre celulares.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
