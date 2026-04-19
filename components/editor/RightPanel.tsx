'use client'

import { useVideoStore } from '@/store/useVideoStore'
import { CaptionStyle } from '@/types/video'

type Preset = CaptionStyle['preset']

const PRESETS: {
  id: Preset
  label: string
  sample: React.CSSProperties
  values: Partial<CaptionStyle>
}[] = [
  {
    id: 'classic',
    label: 'Classic',
    sample: { color: '#FFFFFF', WebkitTextStroke: '1px #000', fontFamily: 'Inter' },
    values: {
      color: '#FFFFFF', strokeColor: '#000000', strokeWidth: 3,
      fontFamily: 'Inter', highlightColor: '#FFDD00',
    },
  },
  {
    id: 'fire',
    label: 'Fire',
    sample: { color: '#FFFFFF', WebkitTextStroke: '1px #000', fontFamily: 'Montserrat' },
    values: {
      color: '#FFFFFF', strokeColor: '#000000', strokeWidth: 2,
      fontFamily: 'Montserrat', highlightColor: '#FF6B00',
    },
  },
  {
    id: 'neon',
    label: 'Neon',
    sample: { color: '#00FFFF', fontFamily: 'Inter', background: '#111', borderRadius: '4px', padding: '0 4px' },
    values: {
      color: '#00FFFF', strokeColor: null, strokeWidth: 0,
      fontFamily: 'Inter', highlightColor: '#FF00FF',
    },
  },
  {
    id: 'minimal',
    label: 'Minimal',
    sample: { color: '#FFFFFF', opacity: 0.7, fontFamily: 'Inter' },
    values: {
      color: '#FFFFFF', strokeColor: null, strokeWidth: 0,
      fontFamily: 'Inter', highlightColor: '#FFFFFF',
    },
  },
  {
    id: 'bold-drop',
    label: 'Bold Drop',
    sample: { color: '#FFFFFF', WebkitTextStroke: '1.5px #000', fontFamily: 'Montserrat', fontWeight: 900, textShadow: '3px 3px 6px rgba(0,0,0,0.9)' },
    values: {
      color: '#FFFFFF', strokeColor: '#000000', strokeWidth: 4,
      fontFamily: 'Montserrat', highlightColor: '#FFD700',
    },
  },
  {
    id: 'typewriter',
    label: 'Typewriter',
    sample: { color: '#00FF00', fontFamily: 'monospace' },
    values: {
      color: '#00FF00', strokeColor: null, strokeWidth: 0,
      fontFamily: 'monospace', highlightColor: '#FFFFFF',
    },
  },
]

const POSITION_OPTIONS: CaptionStyle['position'][] = ['top', 'middle', 'bottom']
const ANIMATION_OPTIONS: CaptionStyle['animation'][] = ['none', 'pop', 'bounce', 'shake', 'zoom']
const WORDS_PER_GROUP: CaptionStyle['wordsPerGroup'][] = [1, 2, 3]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ fontSize: '11px', fontWeight: 600, color: '#666', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
      {children}
    </label>
  )
}

function Divider() {
  return <div style={{ borderTop: '1px solid #222', margin: '0 -16px' }} />
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '6px 8px',
        background: active ? '#534AB7' : '#0f0f0f',
        border: `1px solid ${active ? '#534AB7' : '#2a2a2a'}`,
        borderRadius: '6px',
        color: active ? '#fff' : '#888',
        fontSize: '12px',
        cursor: 'pointer',
        fontWeight: active ? 600 : 400,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  )
}

export function RightPanel() {
  const captionStyle = useVideoStore((s) => s.project.captionStyle)
  const setCaptionStyle = useVideoStore((s) => s.setCaptionStyle)

  return (
    <div
      style={{
        width: '288px',
        minWidth: '288px',
        height: '100%',
        background: '#1a1a1a',
        borderLeft: '1px solid #2a2a2a',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        padding: '0',
        overflowY: 'auto',
      }}
    >
      {/* SECTION A — Presets */}
      <section style={{ padding: '20px 16px' }}>
        <SectionLabel>Caption style</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
          {PRESETS.map((preset) => {
            const selected = captionStyle.preset === preset.id
            return (
              <button
                key={preset.id}
                onClick={() => setCaptionStyle({ preset: preset.id, ...preset.values })}
                style={{
                  background: selected ? '#1e1a3a' : '#0f0f0f',
                  border: `1px solid ${selected ? '#534AB7' : '#2a2a2a'}`,
                  borderRadius: '8px',
                  padding: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '32px',
                    background: '#000',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 700,
                    ...preset.sample,
                  }}
                >
                  Hello
                </div>
                <span style={{ fontSize: '11px', color: selected ? '#7F77DD' : '#888' }}>
                  {preset.label}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <Divider />

      {/* SECTION B — Font size */}
      <section style={{ padding: '20px 16px' }}>
        <SectionLabel>Size: {captionStyle.fontSize}px</SectionLabel>
        <input
          type="range"
          min={24}
          max={72}
          step={2}
          value={captionStyle.fontSize}
          onChange={(e) => setCaptionStyle({ fontSize: Number(e.target.value) })}
          style={{ width: '100%', marginTop: '8px', accentColor: '#534AB7' }}
        />
      </section>

      <Divider />

      {/* SECTION C — Words per group */}
      <section style={{ padding: '20px 16px' }}>
        <SectionLabel>Words per group</SectionLabel>
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
          {WORDS_PER_GROUP.map((n) => (
            <ToggleButton
              key={n}
              active={captionStyle.wordsPerGroup === n}
              onClick={() => setCaptionStyle({ wordsPerGroup: n })}
            >
              {n} {n === 1 ? 'word' : 'words'}
            </ToggleButton>
          ))}
        </div>
      </section>

      <Divider />

      {/* SECTION D — Position */}
      <section style={{ padding: '20px 16px' }}>
        <SectionLabel>Position</SectionLabel>
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
          {POSITION_OPTIONS.map((pos) => (
            <ToggleButton
              key={pos}
              active={captionStyle.position === pos}
              onClick={() => setCaptionStyle({ position: pos })}
            >
              {pos.charAt(0).toUpperCase() + pos.slice(1)}
            </ToggleButton>
          ))}
        </div>
      </section>

      <Divider />

      {/* SECTION E — Animation */}
      <section style={{ padding: '20px 16px' }}>
        <SectionLabel>Animation</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
          {ANIMATION_OPTIONS.map((anim) => (
            <ToggleButton
              key={anim}
              active={captionStyle.animation === anim}
              onClick={() => setCaptionStyle({ animation: anim })}
            >
              {anim.charAt(0).toUpperCase() + anim.slice(1)}
            </ToggleButton>
          ))}
        </div>
      </section>
    </div>
  )
}
