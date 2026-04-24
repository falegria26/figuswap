'use client'

import { useMemo } from 'react'
import { useStore } from '@/lib/store'
import { TEAMS, ALL_STICKERS, GROUPS } from '@/data/stickers'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import { cn } from '@/lib/utils'

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-brand-border rounded-xl px-3 py-2 text-xs shadow-card-md">
      <p className="text-brand-muted">{label}</p>
      <p className="text-brand-text font-bold">{payload[0].value} figuritas</p>
    </div>
  )
}

export default function StatsAvanzadasPage() {
  const stickerStates  = useStore(s => s.stickerStates)
  const dailyProgress  = useStore(s => s.dailyProgress)
  const getStats       = useStore(s => s.getStats)
  const stats          = getStats()

  const teamStats = useMemo(() =>
    TEAMS.map(t => {
      const ts    = ALL_STICKERS.filter(s => s.teamCode === t.code)
      const owned = ts.filter(s => {
        const st = stickerStates[s.id]
        return st?.status === 'have' || st?.status === 'repeated'
      }).length
      return { ...t, owned, percent: Math.round((owned / 20) * 100) }
    }),
    [stickerStates]
  )

  const groupStats = useMemo(() =>
    GROUPS.map(g => {
      const gt    = teamStats.filter(t => t.group === g)
      const owned = gt.reduce((a, t) => a + t.owned, 0)
      const total = gt.length * 20
      return { group: `G${g}`, owned, total, percent: Math.round((owned / total) * 100) }
    }),
    [teamStats]
  )

  const top10 = useMemo(() =>
    [...teamStats].sort((a, b) => b.percent - a.percent).slice(0, 10),
    [teamStats]
  )

  const progressData = useMemo(() =>
    dailyProgress.length === 0
      ? [{ date: 'Hoy', owned: stats.owned }]
      : dailyProgress.slice(-14).map(d => ({ date: d.date.slice(5), owned: d.owned })),
    [dailyProgress, stats.owned]
  )

  const velocity = useMemo(() => {
    if (dailyProgress.length < 2) return null
    const sorted = [...dailyProgress].sort((a, b) => a.date.localeCompare(b.date))
    return sorted[sorted.length - 1].owned - sorted[sorted.length - 2].owned
  }, [dailyProgress])

  const daysLeft = velocity && velocity > 0
    ? Math.ceil((986 - stats.owned) / velocity)
    : null

  const bestGroup  = [...groupStats].sort((a, b) => b.percent - a.percent)[0]
  const leadTeam   = top10[0]

  const kpis = [
    { label: 'Ritmo actual',       value: velocity !== null ? `+${velocity}` : '—', sub: 'figuritas/día',  color: 'text-brand-gold' },
    { label: 'Días para completar',value: daysLeft ? `~${daysLeft}` : '—',          sub: 'a ritmo actual', color: 'text-brand-red'  },
    { label: 'Mejor grupo',        value: bestGroup.group,                           sub: `${bestGroup.percent}% completo`, color: 'text-emerald-600' },
    { label: 'País líder',         value: leadTeam ? `${leadTeam.flag} ${leadTeam.name}` : '—', sub: `${leadTeam?.owned ?? 0}/20`, color: 'text-blue-600' },
  ]

  return (
    <div className="min-h-screen px-4 pt-6 pb-8 bg-brand-bg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-brand-text">Análisis avanzado</h1>
          <p className="text-xs text-brand-muted mt-0.5">Dashboards detallados</p>
        </div>
        <span className="text-2xl">📈</span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {kpis.map(({ label, value, sub, color }) => (
          <div key={label} className="bg-brand-surface border border-brand-border rounded-2xl p-4 shadow-card">
            <p className="text-xs text-brand-muted">{label}</p>
            <p className={cn('text-xl font-extrabold mt-1 leading-none', color)}>{value}</p>
            <p className="text-[10px] text-brand-faint mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-4 mb-4 shadow-card">
        <h2 className="text-sm font-bold text-brand-text mb-4">Progreso por fecha</h2>
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={progressData}>
            <defs>
              <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#E61D25" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#E61D25" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fill: '#9AA0B0', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis hide domain={[0, 986]} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="owned" stroke="#E61D25" strokeWidth={2.5} fill="url(#aGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Heatmap de grupos */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-4 mb-4 shadow-card">
        <h2 className="text-sm font-bold text-brand-text mb-4">Completado por grupo</h2>
        <div className="grid grid-cols-6 gap-2">
          {groupStats.map(g => (
            <div key={g.group} className="flex flex-col items-center gap-1.5">
              <div
                className="w-full aspect-square rounded-xl flex items-center justify-center text-[10px] font-bold border"
                style={{
                  backgroundColor: `rgba(230,29,37,${Math.max(0.04, g.percent / 100 * 0.25)})`,
                  borderColor:      `rgba(230,29,37,${Math.max(0.1,  g.percent / 100 * 0.5)})`,
                  color: g.percent > 60 ? '#C5181F' : '#9AA0B0',
                }}
              >
                {g.percent > 0 ? `${g.percent}%` : '0'}
              </div>
              <span className="text-[9px] text-brand-faint font-semibold">{g.group}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top 10 países */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-4 mb-4 shadow-card">
        <h2 className="text-sm font-bold text-brand-text mb-4">Top 10 países</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={top10} layout="vertical" margin={{ left: 64, right: 8 }}>
            <XAxis type="number" domain={[0, 20]} hide />
            <YAxis
              type="category" dataKey="name"
              tick={{ fill: '#5A6070', fontSize: 10 }}
              axisLine={false} tickLine={false} width={62}
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="owned" radius={[0, 6, 6, 0]}>
              {top10.map((entry, i) => (
                <Cell key={i} fill={entry.owned === 20 ? '#22C55E' : `rgba(230,29,37,${1 - i * 0.06})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Faltantes por grupo */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-4 shadow-card">
        <h2 className="text-sm font-bold text-brand-text mb-4">Faltantes por grupo</h2>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={groupStats.map(g => ({ group: g.group, faltantes: g.total - g.owned }))}>
            <XAxis dataKey="group" tick={{ fill: '#9AA0B0', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="faltantes" radius={[5, 5, 0, 0]} fill="#C9A84C" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
