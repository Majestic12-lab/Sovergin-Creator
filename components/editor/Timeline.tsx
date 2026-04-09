'use client'

import { useMemo } from 'react'
import { useVideoStore } from '@/store/useVideoStore'
import { framesToSeconds, secondsToFrames } from '@/components/remotion/utils/scaling'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function Timeline() {
  const words = useVideoStore((s) => s.project.words)
  const durationSeconds = useVideoStore((s) => s.project.durationSeconds)
  const currentFrame = useVideoStore((s) => s.currentFrame)
  const setCurrentFrame = useVideoStore((s) => s.setCurrentFrame)

  const currentSecond = framesToSeconds(currentFrame)

  const isEmpty = durationSeconds === 0

  const ticks = useMemo(() =>
    words.map((w) => ({
      index: w.index,
      pct: durationSeconds > 0 ? (w.start / durationSeconds) * 100 : 0,
    })),
    [words, durationSeconds]
  )

  function handleTrackClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const fraction = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    const frames = secondsToFrames(fraction * durationSeconds)
    setCurrentFrame(frames)
  }

  const playheadPct = durationSeconds > 0
    ? Math.min(100, (currentSecond / durationSeconds) * 100)
    : 0

  return (
    <div
      style={{
        height: '64px',
        background: '#111',
        borderTop: '1px solid #2a2a2a',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '12px',
        flexShrink: 0,
      }}
    >
      {/* Time display */}
      <span
        style={{
          fontSize: '12px',
          color: '#888',
          fontFamily: 'monospace',
          whiteSpace: 'nowrap',
          minWidth: '80px',
        }}
      >
        {formatTime(currentSecond)} / {formatTime(durationSeconds)}
      </span>

      {/* Track */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {isEmpty ? (
          <p style={{ fontSize: '12px', color: '#444', textAlign: 'center', margin: 0 }}>
            Timeline will appear after generation
          </p>
        ) : (
          <>
            {/* Segments + ticks + playhead */}
            <div
              onClick={handleTrackClick}
              style={{
                position: 'relative',
                height: '20px',
                borderRadius: '4px',
                overflow: 'visible',
                cursor: 'pointer',
                display: 'flex',
              }}
            >
              {/* Hook (15%) */}
              <div style={{ width: '15%', height: '100%', background: '#534AB7', borderRadius: '4px 0 0 4px' }} />
              {/* Body (70%) */}
              <div style={{ width: '70%', height: '100%', background: '#1D9E75' }} />
              {/* CTA (15%) */}
              <div style={{ width: '15%', height: '100%', background: '#BA7517', borderRadius: '0 4px 4px 0' }} />

              {/* Word ticks */}
              {ticks.map((tick) => (
                <div
                  key={tick.index}
                  style={{
                    position: 'absolute',
                    left: `${tick.pct}%`,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '2px',
                    height: '8px',
                    background: 'rgba(255,255,255,0.5)',
                    pointerEvents: 'none',
                  }}
                />
              ))}

              {/* Playhead */}
              <div
                style={{
                  position: 'absolute',
                  left: `${playheadPct}%`,
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  background: '#FFFFFF',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Segment labels */}
            <div style={{ display: 'flex', fontSize: '10px', color: '#555' }}>
              <span style={{ width: '15%', textAlign: 'center' }}>Hook</span>
              <span style={{ width: '70%', textAlign: 'center' }}>Body</span>
              <span style={{ width: '15%', textAlign: 'center' }}>CTA</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
