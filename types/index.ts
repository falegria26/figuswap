export type StickerStatus = 'none' | 'have' | 'repeated'

export interface Sticker {
  id: string
  section: string
  sectionLabel: string
  teamCode?: string
  teamName?: string
  teamFlag?: string
  group?: string
  number: string
  type: 'normal' | 'foil' | 'special'
  label: string
}

export interface Team {
  code: string
  name: string
  group: string
  flag: string
}

export interface StickerState {
  status: StickerStatus
  repeatedCount: number
  updatedAt: string
}

export interface UserProfile {
  id: string
  username: string
  displayName: string
  avatarUrl?: string
  isPublic: boolean
  createdAt: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
}

export interface AlbumStats {
  total: number
  owned: number
  missing: number
  repeated: number
  percentComplete: number
}

export interface DailyProgress {
  date: string
  owned: number
}
