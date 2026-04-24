'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useStore } from '@/lib/store'
import { TEAMS, ALL_STICKERS, GROUPS, getStickersByTeam, getTeamsByGroup } from '@/data/stickers'
import { cn } from '@/lib/utils'
import type { StickerStatus, Team } from '@/types'

function StickerSquare({ id, number, type, status, onTap }: {
  id: string; number: string; type: 'normal' | 'foil' | 'special'
  status: StickerStatus; onTap: () => void
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.80 }}
      onClick={onTap}
      className={cn(
        'relative flex items-center justify-center rounded-lg aspect-square text-[11px] font-bold transition-all select-none border',
        status === 'none'     && 'bg-brand-surface border-brand-border text-brand-faint',
        status === 'have'     && 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm',
        status === 'repeated' && 'bg-amber-50 border-amber-300 text-amber-700 shadow-sm',
        type === 'foil' && status === 'none' && 'border-brand-gold/40',
      )}
    >
      {type === 'foil' && status === 'none' && (
        <span className="absolute inset-0 rounded-lg opacity-20 foil-card pointer-events-none" />
      )}
      <span className="relative z-10">{number}</span>
      {status === 'have' && (
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-[7px] text-white font-bold">✓</span>
      )}
      {status === 'repeated' && (
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full flex items-center justify-center text-[7px] text-white font-bold">★</span>
      )}
    </motion.button>
  )
}

function TeamSection({ team }: { team: Team }) {
  const cycle        = useStore(s => s.cycleStickerStatus)
  const stickerStates = useStore(s => s.stickerStates)
  const teamStickers  = useMemo(() => getStickersByTeam(team.code), [team.code])

  const owned = teamStickers.filter(s => {
    const st = stickerStates[s.id]
    return st?.status === 'have' || st?.status === 'repeated'
  }).length

  const isComplete = owned === 20

  return (
    <div className={cn(
      'bg-brand-surface rounded-2xl p-3.5 border shadow-card transition-all',
      isComplete ? 'border-emerald-200 bg-emerald-50/40' : 'border-brand-border'
    )}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none">{team.flag}</span>
          <span className="text-sm font-bold text-brand-text">{team.name}</span>
          {isComplete && (
            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
              ✓ Completo
            </span>
          )}
        </div>
        <span className="text-xs text-brand-muted font-mono">{owned}/20</span>
      </div>

      <div className="w-full h-1.5 bg-brand-surface-2 rounded-full mb-3 overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-brand-red to-brand-gold'
          )}
          style={{ width: `${(owned / 20) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {teamStickers.map(s => (
          <StickerSquare
            key={s.id}
            id={s.id}
            number={s.number}
            type={s.type}
            status={stickerStates[s.id]?.status ?? 'none'}
            onTap={() => cycle(s.id)}
          />
        ))}
      </div>
    </div>
  )
}

function SpecialSection({ section, label, accent }: { section: string; label: string; accent: string }) {
  const cycle        = useStore(s => s.cycleStickerStatus)
  const stickerStates = useStore(s => s.stickerStates)
  const stickers      = useMemo(() => ALL_STICKERS.filter(s => s.section === section), [section])
  const owned         = stickers.filter(s => {
    const st = stickerStates[s.id]
    return st?.status === 'have' || st?.status === 'repeated'
  }).length

  return (
    <div className="bg-brand-surface rounded-2xl p-3.5 border border-brand-border shadow-card">
      <div className="flex items-center justify-between mb-3">
        <span className={cn('text-sm font-bold', accent)}>{label}</span>
        <span className="text-xs text-brand-muted font-mono">{owned}/{stickers.length}</span>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {stickers.map(s => (
          <StickerSquare
            key={s.id}
            id={s.id}
            number={s.number}
            type={s.type}
            status={stickerStates[s.id]?.status ?? 'none'}
            onTap={() => cycle(s.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default function AlbumPage() {
  const [filter, setFilter] = useState('todos')
  const [search, setSearch] = useState('')
  const getStats     = useStore(s => s.getStats)
  const updateStreak = useStore(s => s.updateStreak)

  useEffect(() => { updateStreak() }, [updateStreak])

  const stats = getStats()

  const filters = [
    { id: 'todos', label: 'Todos' },
    ...GROUPS.map(g => ({ id: `group-${g}`, label: `Gr. ${g}` })),
    { id: 'fwc',   label: '⚽ FWC'        },
    { id: 'coca',  label: '🥤 Coca-Cola'   },
  ]

  const filteredTeams = useMemo(() => {
    if (search) {
      const q = search.toLowerCase()
      return TEAMS.filter(t => t.name.toLowerCase().includes(q))
    }
    if (filter.startsWith('group-')) return TEAMS.filter(t => t.group === filter.replace('group-', ''))
    return []
  }, [filter, search])

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">

      {/* Header sticky */}
      <div className="sticky top-0 z-20 bg-brand-bg/95 backdrop-blur-xl border-b border-brand-border">
        <div className="px-4 pt-4 pb-3">

          {/* Título */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-red flex items-center justify-center shadow-red">
                <span className="text-white text-sm font-black">F</span>
              </div>
              <div>
                <h1 className="text-base font-black text-brand-text leading-none tracking-tight">FiguSwap</h1>
                <p className="text-[10px] text-brand-muted leading-none mt-0.5">Mundial 2026 · 986 figuritas</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-brand-red leading-none">{stats.percentComplete}%</p>
              <p className="text-[10px] text-brand-muted">completado</p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: 'Tengo',   value: stats.owned,    bg: 'bg-emerald-50',  border: 'border-emerald-200', text: 'text-emerald-700' },
              { label: 'Faltan',  value: stats.missing,  bg: 'bg-brand-red-light', border: 'border-red-200',  text: 'text-brand-red'   },
              { label: 'Repet.',  value: stats.repeated, bg: 'bg-amber-50',    border: 'border-amber-200',   text: 'text-amber-700'   },
            ].map(({ label, value, bg, border, text }) => (
              <div key={label} className={cn('rounded-xl py-2 px-1 text-center border', bg, border)}>
                <p className={cn('text-lg font-extrabold leading-none', text)}>{value}</p>
                <p className="text-[9px] text-brand-muted mt-0.5 font-semibold uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>

          {/* Barra de progreso */}
          <div className="mb-3">
            <div className="h-2.5 bg-brand-surface-2 rounded-full overflow-hidden border border-brand-border">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-red via-red-400 to-brand-gold"
                initial={{ width: 0 }}
                animate={{ width: `${stats.percentComplete}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Búsqueda */}
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-faint" />
            <input
              type="text"
              placeholder="Buscar país..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-brand-surface border border-brand-border rounded-xl pl-8 pr-8 py-2.5 text-sm text-brand-text placeholder-brand-faint focus:outline-none focus:border-brand-red/50 focus:ring-2 focus:ring-brand-red/10"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X size={14} className="text-brand-faint" />
              </button>
            )}
          </div>

          {/* Filtros */}
          {!search && (
            <div className="flex gap-1.5 overflow-x-auto scroll-pills pb-0.5">
              {filters.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border',
                    filter === f.id
                      ? 'bg-brand-red text-white border-brand-red shadow-red'
                      : 'bg-brand-surface text-brand-muted border-brand-border'
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 px-4 py-3 space-y-3">

        {/* Leyenda */}
        <div className="flex items-center gap-4 text-xs text-brand-faint">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-brand-surface border border-brand-border inline-block" />
            Sin marcar
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-400 inline-block" />
            Tengo
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-400 inline-block" />
            Repetida
          </span>
        </div>

        {/* Resultados de búsqueda */}
        {search && (
          <div className="space-y-3">
            {filteredTeams.length === 0
              ? <p className="text-center text-brand-muted py-8 text-sm">No se encontró "{search}"</p>
              : filteredTeams.map(t => <TeamSection key={t.code} team={t} />)
            }
          </div>
        )}

        {/* Filtro por grupo */}
        {!search && filter.startsWith('group-') && (
          <div className="space-y-3">
            {filteredTeams.map(t => <TeamSection key={t.code} team={t} />)}
          </div>
        )}

        {/* Solo FWC */}
        {!search && filter === 'fwc' && (
          <>
            <SpecialSection section="FWC"     label="⚽ Introducción FWC" accent="text-brand-gold" />
            <SpecialSection section="FWC_END" label="⚽ Cierre FWC"       accent="text-brand-gold" />
          </>
        )}

        {/* Solo Coca-Cola */}
        {!search && filter === 'coca' && (
          <SpecialSection section="COCA_COLA" label="🥤 Coca-Cola" accent="text-brand-red" />
        )}

        {/* Todos los grupos */}
        {!search && filter === 'todos' && (
          <>
            <SpecialSection section="FWC" label="⚽ Introducción FWC" accent="text-brand-gold" />

            {GROUPS.map(g => (
              <div key={g} className="space-y-3">
                {/* Separador de grupo */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="h-px flex-1 bg-brand-border" />
                  <div className="flex items-center gap-1.5 bg-brand-red px-3 py-1 rounded-full">
                    <span className="text-[11px] font-black text-white tracking-widest">GRUPO {g}</span>
                  </div>
                  <div className="h-px flex-1 bg-brand-border" />
                </div>
                {getTeamsByGroup(g).map(t => <TeamSection key={t.code} team={t} />)}
                {g === 'F' && (
                  <SpecialSection section="COCA_COLA" label="🥤 Coca-Cola" accent="text-brand-red" />
                )}
              </div>
            ))}

            <SpecialSection section="FWC_END" label="⚽ Cierre FWC" accent="text-brand-gold" />
          </>
        )}
      </div>
    </div>
  )
}
