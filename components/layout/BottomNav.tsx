'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, BarChart2, TrendingUp, ArrowLeftRight, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const TABS = [
  { href: '/album',          label: 'Álbum',    icon: BookOpen        },
  { href: '/stats',          label: 'Stats',    icon: BarChart2       },
  { href: '/stats-avanzadas',label: 'Análisis', icon: TrendingUp      },
  { href: '/intercambios',   label: 'Cambios',  icon: ArrowLeftRight  },
  { href: '/perfil',         label: 'Perfil',   icon: User            },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-brand-border shadow-[0_-1px_12px_rgba(13,15,26,0.08)]">
      <div className="flex items-stretch h-16 max-w-lg mx-auto">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 gap-0.5 transition-all duration-150',
                active ? 'text-brand-red' : 'text-brand-faint'
              )}
            >
              <div className={cn(
                'relative p-1.5 rounded-xl transition-all',
                active && 'bg-brand-red-light'
              )}>
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                {active && (
                  <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-red" />
                )}
              </div>
              <span className={cn(
                'text-[10px] font-semibold leading-none',
                active ? 'text-brand-red' : 'text-brand-faint'
              )}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
