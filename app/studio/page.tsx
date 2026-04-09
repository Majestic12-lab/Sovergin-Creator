'use client'

import { useEffect, useCallback } from 'react'
import { useVideoStore } from '@/store/useVideoStore'
import { LeftPanel } from '@/components/editor/LeftPanel'
import { CenterPreview } from '@/components/editor/CenterPreview'
import { RightPanel } from '@/components/editor/RightPanel'
import { Timeline } from '@/components/editor/Timeline'
import { calcDurationFrames } from '@/components/remotion/utils/scaling'

export default function StudioPage() {
  const currentFrame = useVideoStore((s) => s.currentFrame)
  const words = useVideoStore((s) => s.project.words)
  const setCurrentFrame = useVideoStore((s) => s.setCurrentFrame)
  const setEditingWord = useVideoStore((s) => s.setEditingWord)
  const undoLastEdit = useVideoStore((s) => s.undoLastEdit)

  const durationFrames = calcDurationFrames(words)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Undo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault()
        undoLastEdit()
        return
      }

      // Escape — close word editor
      if (e.key === 'Escape') {
        setEditingWord(null)
        return
      }

      // Space — pass through to Remotion player iframe
      if (e.key === ' ') {
        e.preventDefault()
        const iframe = document.querySelector<HTMLIFrameElement>('iframe')
        if (iframe?.contentWindow) {
          iframe.contentWindow.dispatchEvent(
            new KeyboardEvent('keydown', { key: ' ', bubbles: true })
          )
        }
        return
      }

      // Arrow scrubbing
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCurrentFrame(Math.max(0, currentFrame - 30))
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setCurrentFrame(Math.min(durationFrames, currentFrame + 30))
      }
    },
    [currentFrame, durationFrames, setCurrentFrame, setEditingWord, undoLastEdit]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, { capture: true })
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true })
  }, [handleKeyDown])

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: '#0f0f0f',
        overflow: 'hidden',
      }}
    >
      {/* Top bar */}
      <header
        style={{
          height: '48px',
          borderBottom: '1px solid #2a2a2a',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: '12px',
          flexShrink: 0,
        }}
      >
        <span style={{ color: '#7F77DD', fontWeight: 700 }}>Sovereign Creator</span>
        <span style={{ color: '#555', fontSize: '12px' }}>Studio</span>
      </header>

      {/* Main workspace */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <LeftPanel />

        {/* Center — preview */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0f0f0f',
          }}
        >
          <CenterPreview />
        </div>

        <RightPanel />
      </div>

      {/* Bottom timeline */}
      <Timeline />
    </main>
  )
}
