import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encodeRepeated(stickerIds: string[]): string {
  return btoa(stickerIds.join(','))
}

export function decodeRepeated(encoded: string): string[] {
  try {
    return atob(encoded).split(',').filter(Boolean)
  } catch {
    return []
  }
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`
}
