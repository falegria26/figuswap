'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { Share2, Copy, Search, ArrowLeftRight, Check } from 'lucide-react'
import { useStore } from '@/lib/store'
import { ALL_STICKERS, getStickerById } from '@/data/stickers'
import { encodeRepeated, decodeRepeated } from '@/lib/utils'
import { cn } from '@/lib/utils'

function StickerPill({ id }: { id: string }) {
  const s = getStickerById(id)
  if (!s) return null
  return (
    <span className="inline-flex items-center gap-1 bg-brand-surface-2 border border-brand-border rounded-full px-2 py-0.5 text-xs text-brand-text font-medium">
      {s.teamFlag && <span>{s.teamFlag}</span>}
      <span className="font-mono text-[10px] text-brand-muted">{s.teamCode ?? s.section}-{s.number}</span>
    </span>
  )
}

export default function IntercambiosPage() {
  const getRepeatedStickers = useStore(s => s.getRepeatedStickers)
  const getMissingStickers  = useStore(s => s.getMissingStickers)

  const [activeTab, setActiveTab]   = useState<'share' | 'compare'>('share')
  const [inputValue, setInputValue] = useState('')
  const [friendData, setFriendData] = useState('')
  const [copied, setCopied]         = useState(false)

  const myRepeated = getRepeatedStickers()
  const myMissing  = getMissingStickers()

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return `${window.location.origin}/intercambios?r=${encodeRepeated(myRepeated)}`
  }, [myRepeated])

  const friendRepeated = useMemo(() => {
    if (!friendData) return []
    try {
      const r = new URL(friendData).searchParams.get('r')
      if (r) return decodeRepeated(r)
    } catch {
      try { return decodeRepeated(friendData) } catch { /* noop */ }
    }
    return []
  }, [friendData])

  const canGetFromFriend = useMemo(
    () => friendRepeated.filter(id => myMissing.includes(id)),
    [friendRepeated, myMissing]
  )

  const copy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'Mis repetidas — FiguSwap', url: shareUrl })
    } else {
      copy()
    }
  }

  return (
    <div className="min-h-screen px-4 pt-6 bg-brand-bg">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-black text-brand-text">Intercambios</h1>
          <p className="text-xs text-brand-muted mt-0.5">Compartí y encontrá matches perfectos</p>
        </div>
        <span className="text-2xl">🔄</span>
      </div>

      {/* Tabs */}
      <div className="flex bg-brand-surface border border-brand-border rounded-2xl p-1 mb-5 shadow-card">
        {[
          { id: 'share',   label: '📤 Compartir repetidas' },
          { id: 'compare', label: '🔍 Comparar con amigo'  },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as 'share' | 'compare')}
            className={cn(
              'flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all',
              activeTab === t.id ? 'bg-brand-red text-white shadow-red' : 'text-brand-muted'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {activeTab === 'share' && (
          <motion.div key="share" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

            {/* QR card */}
            <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 mb-4 shadow-card-md flex flex-col items-center gap-4">
              <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-card">
                <QRCodeSVG
                  value={shareUrl || 'https://figuswap.app'}
                  size={160}
                  level="M"
                  fgColor="#0D0F1A"
                />
              </div>
              <div className="text-center">
                <p className="text-brand-text font-bold text-sm">Tu QR de intercambio</p>
                <p className="text-brand-muted text-xs mt-1">Mostráselo a tu amigo para ver tus repetidas</p>
              </div>
              <div className="flex gap-2 w-full">
                <button
                  onClick={copy}
                  className="flex-1 flex items-center justify-center gap-2 bg-brand-surface-2 border border-brand-border rounded-xl py-3 text-sm font-semibold text-brand-text"
                >
                  {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
                  {copied ? 'Copiado' : 'Copiar link'}
                </button>
                <button
                  onClick={share}
                  className="flex-1 flex items-center justify-center gap-2 bg-brand-red text-white rounded-xl py-3 text-sm font-semibold shadow-red"
                >
                  <Share2 size={15} />
                  Compartir
                </button>
              </div>
            </div>

            {/* Lista de repetidas */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-4 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-brand-text">Mis repetidas</p>
                <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
                  {myRepeated.length} figuritas
                </span>
              </div>
              {myRepeated.length === 0 ? (
                <p className="text-brand-faint text-sm text-center py-4">No tenés figuritas repetidas aún</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {myRepeated.map(id => <StickerPill key={id} id={id} />)}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'compare' && (
          <motion.div key="compare" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

            {/* Input */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-4 mb-4 shadow-card">
              <p className="text-sm font-bold text-brand-text mb-3">Pegá el link de tu amigo</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://figuswap.app/intercambios?r=..."
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  className="flex-1 bg-brand-surface-2 border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-text placeholder-brand-faint focus:outline-none focus:border-brand-red/50 focus:ring-2 focus:ring-brand-red/10"
                />
                <button
                  onClick={() => setFriendData(inputValue)}
                  className="bg-brand-red text-white rounded-xl px-4 flex items-center shadow-red"
                >
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* Resultados */}
            {friendRepeated.length > 0 && (
              <div className="space-y-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-card">
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowLeftRight size={15} className="text-emerald-600" />
                    <p className="text-sm font-bold text-emerald-700">Tu amigo te puede dar</p>
                    <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                      {canGetFromFriend.length}
                    </span>
                  </div>
                  {canGetFromFriend.length === 0
                    ? <p className="text-brand-faint text-xs">No tiene repetidas que te falten</p>
                    : <div className="flex flex-wrap gap-1.5">{canGetFromFriend.map(id => <StickerPill key={id} id={id} />)}</div>
                  }
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-card">
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowLeftRight size={15} className="text-amber-600" />
                    <p className="text-sm font-bold text-amber-700">Vos le podés dar</p>
                    <span className="ml-auto text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
                      {myRepeated.length}
                    </span>
                  </div>
                  {myRepeated.length === 0
                    ? <p className="text-brand-faint text-xs">No tenés repetidas para darle</p>
                    : <div className="flex flex-wrap gap-1.5">{myRepeated.map(id => <StickerPill key={id} id={id} />)}</div>
                  }
                </div>
              </div>
            )}

            {!friendData && (
              <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 text-center shadow-card">
                <p className="text-3xl mb-3">🤝</p>
                <p className="text-brand-text font-bold text-sm">¿Cómo funciona?</p>
                <ol className="text-brand-muted text-xs mt-3 text-left space-y-2 max-w-xs mx-auto">
                  <li className="flex gap-2"><span className="text-brand-red font-bold">1.</span> Copiás tu link desde "Compartir repetidas"</li>
                  <li className="flex gap-2"><span className="text-brand-red font-bold">2.</span> Se lo mandás por WhatsApp a tu amigo</li>
                  <li className="flex gap-2"><span className="text-brand-red font-bold">3.</span> Él pega su link acá</li>
                  <li className="flex gap-2"><span className="text-brand-red font-bold">4.</span> FiguSwap calcula el match ideal al instante</li>
                </ol>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
