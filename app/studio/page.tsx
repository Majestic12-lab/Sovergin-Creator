'use client'

import { useEffect, useCallback, useState } from 'react'
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

  const jobStatus = useVideoStore((s) => s.jobStatus)
  const jobId = useVideoStore((s) => s.jobId)
  const audioUrl = useVideoStore((s) => s.project.audioUrl)
  const r2AudioUrl = useVideoStore((s) => s.project.r2AudioUrl)
  const backgroundUrl = useVideoStore((s) => s.project.backgroundUrl)
  const captionStyle = useVideoStore((s) => s.project.captionStyle)
  const durationSeconds = useVideoStore((s) => s.project.durationSeconds)

  const [renderState, setRenderState] = useState<
    | { phase: 'idle' }
    | { phase: 'rendering'; progress: number }
    | { phase: 'error'; message: string }
  >({ phase: 'idle' })

  const handleDownload = useCallback(async () => {
    if (!jobId) return
    setRenderState({ phase: 'rendering', progress: 0 })
    console.log('RENDER REQUEST:', { jobId, r2AudioUrl, backgroundUrl, durationSeconds })
    try {
      const res = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, words, audioUrl: r2AudioUrl, backgroundUrl, captionStyle, durationSeconds }),
      })
      if (!res.ok) {
        const errorText = await res.text()
        console.error('RENDER FAILED:', errorText)
        setRenderState({ phase: 'error', message: errorText || 'Render request failed' })
        return
      }
      const { renderId, bucketName } = await res.json() as { renderId: string; bucketName: string }

      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
        const poll = setInterval(async () => {
          try {
            const pr = await fetch(`/api/render/${renderId}?bucketName=${encodeURIComponent(bucketName)}`)
            if (!pr.ok) {
              clearInterval(poll)
              const errText = await pr.text()
              reject(new Error(errText || 'Progress check failed'))
              return
            }
            const data = await pr.json() as {
              status: 'rendering' | 'done' | 'error'
              progress: number
              outputUrl: string | null
              error?: string
            }
            if (data.status === 'error') {
              clearInterval(poll)
              reject(new Error(data.error ?? 'Render failed'))
              return
            }
            setRenderState({ phase: 'rendering', progress: data.progress })
            if (data.status === 'done' && data.outputUrl) {
              clearInterval(poll)
              window.open(data.outputUrl, '_blank')
              resolve()
            }
          } catch (pollErr) {
            const msg = pollErr instanceof Error ? pollErr.message : String(pollErr)
            console.error('POLL ERROR:', msg)
            setRenderState({ phase: 'error', message: msg })
            clearInterval(poll)
            reject(pollErr)
          }
        }, 5000)
        }, 5000)
      })

      setRenderState({ phase: 'idle' })
    } catch (e) {
      setRenderState({ phase: 'error', message: e instanceof Error ? e.message : 'Unknown error' })
    }
  }, [jobId, words, r2AudioUrl, backgroundUrl, captionStyle, durationSeconds])

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

      // Space — only intercept if not typing in a text input
      if (e.key === ' ') {
        const tag = (e.target as HTMLElement).tagName
        if (tag === 'TEXTAREA' || tag === 'INPUT') return
        e.preventDefault()
        const iframe = document.querySelector<HTMLIFrameElement>('iframe')
        if (iframe?.contentWindow) {
          iframe.contentWindow.dispatchEvent(
            new KeyboardEvent('keydown', { key: ' ', bubbles: true })
          )
        }
        return
      }

      // Arrow scrubbing — only when not in a text input
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'TEXTAREA' || tag === 'INPUT') return
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

        {jobStatus === 'complete' && (
          <button
            onClick={renderState.phase === 'idle' ? handleDownload : undefined}
            disabled={renderState.phase === 'rendering'}
            style={{
              marginLeft: 'auto',
              background: renderState.phase === 'error' ? '#7f1d1d' : '#534AB7',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '0 14px',
              height: '30px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: renderState.phase === 'rendering' ? 'not-allowed' : 'pointer',
              opacity: renderState.phase === 'rendering' ? 0.7 : 1,
              whiteSpace: 'nowrap',
              transition: 'opacity 0.2s ease',
            }}
          >
            {renderState.phase === 'idle' && 'Download Video'}
            {renderState.phase === 'rendering' &&
              (renderState.progress > 0
                ? `Rendering ${Math.round(renderState.progress * 100)}%...`
                : 'Rendering...')}
            {renderState.phase === 'error' && `Error: ${renderState.message}`}
          </button>
        )}
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
