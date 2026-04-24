import type { Metadata, Viewport } from 'next'
import './globals.css'
import BottomNav from '@/components/layout/BottomNav'
import AchievementToast from '@/components/ui/AchievementToast'

export const metadata: Metadata = {
  title: 'FiguSwap — Álbum Mundial 2026',
  description: 'Completá tu álbum del Mundial 2026 e intercambiá figuritas fácilmente.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'FiguSwap — Mundial 2026',
    description: 'El mejor tracker de figuritas del Mundial 2026',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#F6F5F0',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-brand-bg min-h-screen">
        <main className="min-h-screen pb-20 max-w-lg mx-auto">
          {children}
        </main>
        <BottomNav />
        <AchievementToast />
      </body>
    </html>
  )
}
