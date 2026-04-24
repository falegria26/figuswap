'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { Share2, Copy, Check, ArrowLeftRight, ChevronLeft } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getStickerById } from '@/data/stickers'
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

function ComparisonView({ friendRepeated, friendName, onBack }: {
  friendRepeated: string[]
  friendName: string
  onBack: () => void
}) {
  const getRepeatedStickers = useStore(s => s.getRepeatedStickers)
  const getMissingStickers  = useStore(s => s.getMissingStickers)
  const [copied, setCopied] = useState(false)

  const myRepeated = getRepeatedStickers()
  const myMissing  = getMissingStickers()

  const canGetFromFriend = useMemo(
    () => friendRepeated.filter(id => myMissing.includes(id)),
    [friendRepeated, myMissing]
  )

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return `${window.location.origin}/intercambios?r=${encodeRepeated(myRepeated)}&n=Yo`
  }, [myRepeated])

  const copyAndShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'Mis repetidas — FiguSwap', url: shareUrl })
    } else {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <button onClick={onBack} className="flex items-center gap-1.5 text-brand-muted text-sm mb-5">
        <ChevronLeft size={16} />
        Volver
      </button>

      <div className="bg-brand-surface border border-brand-border rounded-2xl p-4 mb-4 shadow-card text-center">
        <p className="text-2xl mb-1">🤝</p>
        <p className="text-brand-text font-bold text-sm">
          Match con <span className="text-brand-red">{friendName || 'tu amigo'}</span>
        </p>
        <p className="text-brand-muted text-xs mt-1">
          Tiene {friendRepeated.length} repetidas · {canGetFromFriend.length} te sirven a vos
        </p>
      </div>

      {/* Lo que el amigo me puede dar */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-3 shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <ArrowLeftRight size={15} className="text-emerald-600" />
          <p className="text-sm font-bold text-emerald-700">
            {friendName || 'Tu amigo'} te puede dar
          </p>
          <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
            {canGetFromFriend.length}
          </span>
        </div>
        {canGetFromFriend.length === 0
          ? <p className="text-brand-faint text-xs">No tiene repetidas que te falten</p>
          : <div className="flex flex-wrap gap-1.5">{canGetFromFriend.map(id => <StickerPill key={id} id={id} />)}</div>
        }
      </div>

      {/* Lo que yo le puedo dar */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4 shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <ArrowLeftRight size={15} className="text-amber-600" />
          <p className="text-sm font-bold text-amber-700">Vos le podés dar</p>
          <span className="ml-auto text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
            {myRepeated.length}
          </span>
        </div>
        {myRepeated.length === 0
          ? <p className="text-brand-faint text-xs">No tenés repetidas aún</p>
          : <div className="flex flex-wrap gap-1.5">{myRepeated.map(id => <StickerPill key={id} id={id} />)}</div>
        }
      </div>

      {/* CTA: compartir mis repetidas para match completo */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-4 shadow-card">
        <p className="text-sm font-bold text-brand-text mb-1">¿Querés que vea tu lista también?</p>
        <p className="text-xs text-brand-muted mb-3">
          Compartile tu link para que pueda ver exactamente qué repetidas tuyas le sirven.
        </p>
        <button
          onClick={copyAndShare}
          className="w-full flex items-center justify-center gap-2 bg-brand-red text-white rounded-xl py-3 text-sm font-semibold shadow-red"
        >
          {copied ? <Check size={15} /> : <Share2 size={15} />}
          {copied ? 'Link copiado' : 'Compartir mis repetidas'}
        </button>
      </div>
    </motion.div>
  )
}

function ShareView() {
  const getRepeatedStickers = useStore(s => s.getRepeatedStickers)
  const [name, setName] = useState('')
  const [copied, setCopied] = useState(false)

  const myRepeated = getRepeatedStickers()

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    const n = name.trim() ? `&n=${encodeURIComponent(name.trim())}` : ''
    return `${window.location.origin}/intercambios?r=${encodeRepeated(myRepeated)}${n}`
  }, [myRepeated, name])

  const copy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: `${name || 'Mis'} repetidas — FiguSwap`, url: shareUrl })
    } else {
      copy()
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

      {/* Nombre opcional */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-4 mb-4 shadow-card">
        <p className="text-xs font-semibold text-brand-muted mb-2">Tu nombre (opcional)</p>
        <input
          type="text"
          placeholder="ej: Felipe"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={20}
          className="w-full bg-brand-surface-2 border border-brand-border rounded-xl px-3 py-2.5 text-sm text-brand-text placeholder-brand-faint focus:outline-none focus:border-brand-red/50"
        />
        <p className="text-[10px] text-brand-faint mt-1.5">
          Cuando tu amigo abra el link va a ver tu nombre en el match
        </p>
      </div>

      {/* QR */}
      <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 mb-4 shadow-card-md flex flex-col items-center gap-4">
        <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-card">
          <QRCodeSVG value={shareUrl || 'https://figuswap.vercel.app'} size={160} level="M" fgColor="#0D0F1A" />
        </div>
        <div className="text-center">
          <p className="text-brand-text font-bold text-sm">Tu QR personal</p>
          <p className="text-brand-muted text-xs mt-1">
            Cuando tu amigo lo escanée, ve el match directo ✨
          </p>
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

      {/* Mis repetidas */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-brand-text">Mis repetidas</p>
          <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
            {myRepeated.length}
          </span>
        </div>
        {myRepeated.length === 0
          ? <p className="text-brand-faint text-xs text-center py-3">Marcá figuritas como repetidas en el álbum</p>
          : <div className="flex flex-wrap gap-1.5">{myRepeated.map(id => <StickerPill key={id} id={id} />)}</div>
        }
      </div>
    </motion.div>
  )
}

function IntercambiosContent() {
  const searchParams   = useSearchParams()
  const urlR           = searchParams.get('r')
  const urlN           = searchParams.get('n')
  const [showShare, setShowShare] = useState(false)

  const friendRepeated = useMemo(() => urlR ? decodeRepeated(urlR) : [], [urlR])
  const isComparison   = !!urlR && !showShare

  return (
    <div className="min-h-screen px-4 pt-6 bg-brand-bg">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-black text-brand-text">Intercambios</h1>
          <p className="text-xs text-brand-muted mt-0.5">
            {isComparison ? 'Match automático' : 'Compartí tus repetidas'}
          </p>
        </div>
        <span className="text-2xl">{isComparison ? '🤝' : '🔄'}</span>
      </div>

      {isComparison ? (
        <ComparisonView
          friendRepeated={friendRepeated}
          friendName={urlN ?? ''}
          onBack={() => setShowShare(true)}
        />
      ) : (
        <ShareView />
      )}
    </div>
  )
}

export default function IntercambiosPage() {
  return (
    <Suspense>
      <IntercambiosContent />
    </Suspense>
  )
}
