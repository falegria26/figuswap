'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StickerStatus, StickerState, UserProfile, Achievement, DailyProgress } from '@/types'
import { ALL_STICKERS, TEAMS } from '@/data/stickers'

const STATUS_CYCLE: StickerStatus[] = ['none', 'have', 'repeated']

const ACHIEVEMENT_DEFS: Achievement[] = [
  { id: 'first_sticker', title: '¡Primera figurita!', description: 'Marcaste tu primera figurita', icon: '⭐' },
  { id: 'first_repeated', title: 'Primer repetido', description: 'Tu primera figurita repetida', icon: '💎' },
  { id: 'team_complete', title: 'País completo', description: 'Completaste los 20 stickers de un país', icon: '🏆' },
  { id: 'group_complete', title: 'Grupo completo', description: 'Completaste todos los países de un grupo', icon: '🎯' },
  { id: 'quarter_album', title: '25% completado', description: 'Completaste un cuarto del álbum', icon: '📖' },
  { id: 'half_album', title: '¡A mitad!', description: 'Completaste el 50% del álbum', icon: '🌟' },
  { id: 'three_quarters', title: '75% completado', description: 'Ya casi terminás', icon: '🔥' },
  { id: 'full_album', title: '¡ÁLBUM COMPLETO!', description: 'Completaste el álbum entero', icon: '🏅' },
  { id: 'streak_3', title: 'En racha x3', description: '3 días seguidos en FiguSwap', icon: '🔥' },
  { id: 'streak_7', title: 'Racha semanal', description: '7 días seguidos en FiguSwap', icon: '💪' },
]

interface FiguSwapStore {
  stickerStates: Record<string, StickerState>
  setStickerStatus: (id: string, status: StickerStatus) => void
  cycleStickerStatus: (id: string) => void

  user: UserProfile | null
  setUser: (user: UserProfile | null) => void

  achievements: Achievement[]
  newAchievement: Achievement | null
  clearNewAchievement: () => void

  streak: number
  lastActivity: string | null
  updateStreak: () => void

  dailyProgress: DailyProgress[]

  getStats: () => { owned: number; missing: number; repeated: number; percentComplete: number }
  getTeamStats: (teamCode: string) => { owned: number; total: number; percent: number }
  getRepeatedStickers: () => string[]
  getMissingStickers: () => string[]
  getOwnedCount: () => number
}

function checkAndUnlock(
  id: string,
  newStates: Record<string, StickerState>,
  prevUnlocked: Set<string>,
  nextStatus: StickerStatus
): Achievement[] {
  const toUnlock: Achievement[] = []

  const unlock = (achievementId: string) => {
    if (prevUnlocked.has(achievementId)) return
    const def = ACHIEVEMENT_DEFS.find(a => a.id === achievementId)
    if (def) toUnlock.push({ ...def, unlockedAt: new Date().toISOString() })
  }

  const ownedCount = Object.values(newStates).filter(
    s => s.status === 'have' || s.status === 'repeated'
  ).length

  if (ownedCount === 1) unlock('first_sticker')
  if (nextStatus === 'repeated') unlock('first_repeated')

  const sticker = ALL_STICKERS.find(s => s.id === id)
  if (sticker?.teamCode) {
    const teamStickers = ALL_STICKERS.filter(s => s.teamCode === sticker.teamCode)
    const teamOwned = teamStickers.filter(s => {
      const st = newStates[s.id]
      return st?.status === 'have' || st?.status === 'repeated'
    }).length
    if (teamOwned === 20) unlock('team_complete')

    const group = sticker.group
    if (group) {
      const groupTeams = TEAMS.filter(t => t.group === group)
      const allGroupDone = groupTeams.every(t => {
        return ALL_STICKERS.filter(s => s.teamCode === t.code).every(s => {
          const st = newStates[s.id]
          return st?.status === 'have' || st?.status === 'repeated'
        })
      })
      if (allGroupDone) unlock('group_complete')
    }
  }

  const total = ALL_STICKERS.length
  const pct = (ownedCount / total) * 100
  if (pct >= 25) unlock('quarter_album')
  if (pct >= 50) unlock('half_album')
  if (pct >= 75) unlock('three_quarters')
  if (pct >= 100) unlock('full_album')

  return toUnlock
}

export const useStore = create<FiguSwapStore>()(
  persist(
    (set, get) => ({
      stickerStates: {},

      setStickerStatus: (id, status) => {
        const today = new Date().toISOString().split('T')[0]
        const prevStates = get().stickerStates
        const newStates: Record<string, StickerState> = {
          ...prevStates,
          [id]: {
            status,
            repeatedCount: status === 'repeated' ? (prevStates[id]?.repeatedCount ?? 0) + 1 : 0,
            updatedAt: new Date().toISOString(),
          },
        }

        const prevUnlocked = new Set(get().achievements.map(a => a.id))
        const newAchievements = checkAndUnlock(id, newStates, prevUnlocked, status)

        const owned = Object.values(newStates).filter(
          s => s.status === 'have' || s.status === 'repeated'
        ).length

        set(state => {
          const existing = state.dailyProgress.findIndex(d => d.date === today)
          const newDaily = [...state.dailyProgress]
          if (existing >= 0) {
            newDaily[existing] = { date: today, owned }
          } else {
            newDaily.push({ date: today, owned })
          }
          return {
            stickerStates: newStates,
            dailyProgress: newDaily,
            achievements: newAchievements.length > 0
              ? [...state.achievements, ...newAchievements]
              : state.achievements,
            newAchievement: newAchievements.length > 0 ? newAchievements[0] : state.newAchievement,
          }
        })
      },

      cycleStickerStatus: (id) => {
        const current = get().stickerStates[id]?.status ?? 'none'
        const nextIndex = (STATUS_CYCLE.indexOf(current) + 1) % STATUS_CYCLE.length
        get().setStickerStatus(id, STATUS_CYCLE[nextIndex])
      },

      user: null,
      setUser: (user) => set({ user }),

      achievements: [],
      newAchievement: null,
      clearNewAchievement: () => set({ newAchievement: null }),

      streak: 0,
      lastActivity: null,
      updateStreak: () => {
        const today = new Date().toDateString()
        const last = get().lastActivity
        if (last === today) return
        const yesterday = new Date(Date.now() - 86400000).toDateString()
        const newStreak = last === yesterday ? get().streak + 1 : 1

        const prevUnlocked = new Set(get().achievements.map(a => a.id))
        const toUnlock: Achievement[] = []
        if (newStreak >= 3 && !prevUnlocked.has('streak_3')) {
          const def = ACHIEVEMENT_DEFS.find(a => a.id === 'streak_3')
          if (def) toUnlock.push({ ...def, unlockedAt: new Date().toISOString() })
        }
        if (newStreak >= 7 && !prevUnlocked.has('streak_7')) {
          const def = ACHIEVEMENT_DEFS.find(a => a.id === 'streak_7')
          if (def) toUnlock.push({ ...def, unlockedAt: new Date().toISOString() })
        }

        set(state => ({
          streak: newStreak,
          lastActivity: today,
          achievements: toUnlock.length > 0 ? [...state.achievements, ...toUnlock] : state.achievements,
          newAchievement: toUnlock.length > 0 ? toUnlock[0] : state.newAchievement,
        }))
      },

      dailyProgress: [],

      getOwnedCount: () =>
        Object.values(get().stickerStates).filter(
          s => s.status === 'have' || s.status === 'repeated'
        ).length,

      getStats: () => {
        const states = get().stickerStates
        const total = ALL_STICKERS.length
        let owned = 0
        let repeated = 0
        for (const s of ALL_STICKERS) {
          const st = states[s.id]
          if (st?.status === 'have') owned++
          if (st?.status === 'repeated') { owned++; repeated++ }
        }
        return { owned, missing: total - owned, repeated, percentComplete: Math.round((owned / total) * 100) }
      },

      getTeamStats: (teamCode) => {
        const states = get().stickerStates
        const team = ALL_STICKERS.filter(s => s.teamCode === teamCode)
        const owned = team.filter(s => {
          const st = states[s.id]
          return st?.status === 'have' || st?.status === 'repeated'
        }).length
        return { owned, total: 20, percent: Math.round((owned / 20) * 100) }
      },

      getRepeatedStickers: () =>
        ALL_STICKERS.filter(s => get().stickerStates[s.id]?.status === 'repeated').map(s => s.id),

      getMissingStickers: () =>
        ALL_STICKERS.filter(s => {
          const st = get().stickerStates[s.id]
          return !st || st.status === 'none'
        }).map(s => s.id),
    }),
    { name: 'figuswap-v1' }
  )
)
