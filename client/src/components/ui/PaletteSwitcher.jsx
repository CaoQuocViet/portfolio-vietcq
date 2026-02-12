'use client'

import { useCallback, useState, useEffect } from 'react'
import { Palette } from 'lucide-react'

const PALETTES = [
  { id: '', label: 'Ocean', color: '#4F76B0' },
  { id: 'coffee', label: 'Coffee', color: '#9c6363' },
  { id: 'forest', label: 'Forest', color: '#758f70' },
  { id: 'slate', label: 'Slate', color: '#6e8791' },
  { id: 'imperial-violet', label: 'Purple', color: '#7333cc' },
  { id: 'peach-glow', label: 'Peach', color: '#df7920' },
  { id: 'azure-mist', label: 'Azure', color: '#49adb6' },
  { id: 'graphite', label: 'Graphite', color: '#837c83' },
]

const STORAGE_KEY = 'portfolio-palette'

function getCurrentPalette() {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(STORAGE_KEY) || ''
}

function setPalette(id) {
  if (id) {
    localStorage.setItem(STORAGE_KEY, id)
    document.documentElement.setAttribute('data-palette', id)
  } else {
    localStorage.removeItem(STORAGE_KEY)
    document.documentElement.removeAttribute('data-palette')
  }
}

const PaletteSwitcher = ({ className = '' }) => {
  const [mounted, setMounted] = useState(false)
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    setMounted(true)
    setCurrentId(getCurrentPalette())
    const handler = () => setCurrentId(getCurrentPalette())
    window.addEventListener('palette-change', handler)
    return () => window.removeEventListener('palette-change', handler)
  }, [])

  const cyclePalette = useCallback(() => {
    const idx = PALETTES.findIndex(p => p.id === getCurrentPalette())
    const next = PALETTES[(idx + 1) % PALETTES.length]
    setPalette(next.id)
    setCurrentId(next.id)
    window.dispatchEvent(new Event('palette-change'))
  }, [])

  if (!mounted) return null

  const current = PALETTES.find(p => p.id === currentId) || PALETTES[0]

  return (
    <button
      onClick={cyclePalette}
      className={`flex items-center gap-2 p-2 rounded-lg transition-colors cursor-pointer hover:bg-[var(--bg-hover)] ${className}`}
      aria-label={`Color: ${current.label}`}
      title={`Color: ${current.label}`}
    >
      <Palette className="w-5 h-5" style={{ color: current.color }} />
    </button>
  )
}

/** Inline script for <head> to prevent palette flash */
export const paletteInitScript = `
(function(){
  try {
    var p = localStorage.getItem('${STORAGE_KEY}');
    if (p) document.documentElement.setAttribute('data-palette', p);
  } catch(e) {}
})();
`

export default PaletteSwitcher
