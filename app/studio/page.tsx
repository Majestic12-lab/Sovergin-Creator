'use client'

import { useEffect, useCallback, useState } from 'react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { useVideoStore } from '@/store/useVideoStore'
import { LeftPanel } from '@/components/editor/LeftPanel'
import { CenterPreview } from '@/components/editor/CenterPreview'
import { RightPanel } from '@/components/editor/RightPanel'
import { calcDurationFrames } from '@/components/remotion/utils/scaling'

type Drawer = 'none' | 'settings' | 'style'

export default function StudioPage() {
  const currentFrame = useVideoStore((s) => s.currentFrame)
  const words = useVideoStore((s) => s.project.words)
  const setCurrentFrame = useVideoStore((s) => s.setCurrentFrame)
  const setEditingWord = useVideoStore((s) => s.setEditingWord)
  const undoLastEdit = useVideoStore((s) => s.undoLastEdit)

  const jobStatus = useVideoStore((s) => s.jobStatus)
  const jobId = useVideoStore((s) => s.jobId)
  const r2AudioUrl = useVideoStore((s) => s.project.r2AudioUrl)
  const backgroundUrl = useVideoStore((s) => s.project.backgroundUrl)
  const captionStyle = useVideoStore((s) => s.project.captionStyle)
  const durationSeconds = useVideoStore((s) => s.project.durationSeconds)

  const [renderState, setRenderState] = useState<
    | { phase: 'idle' }
    | { phase: 'rendering'; progress: number }
    | { phase: 'error'; message: string }
  >({ phase: 'idle' })

  const [isMobile, setIsMobile] = useState(false)
  const [drawer, setDrawer] = useState<Drawer>('none')

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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
                reject(new Error('STATUS:' + pr.status + ' BODY:' + (errText || 'empty')))
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
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault()
        undoLastEdit()
        return
      }
      if (e.key === 'Escape') {
        setEditingWord(null)
        setDrawer('none')
        return
      }
      if (e.key === ' ') {
        const tag = (e.target as HTMLElement).tagName
        if (tag === 'TEXTAREA' || tag === 'INPUT') return
        e.preventDefault()
        const iframe = document.querySelector<HTMLIFrameElement>('iframe')
        if (iframe?.contentWindow) {
          iframe.contentWindow.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))
        }
        return
      }
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

  const downloadLabel =
    renderState.phase === 'rendering'
      ? renderState.progress > 0
        ? `${Math.round(renderState.progress * 100)}%`
        : '...'
      : renderState.phase === 'error'
        ? 'Err'
        : '↓'

  return (
    <main style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0f0f0f', overflow: 'hidden' }}>

      {/* ── HEADER ── */}
      <header style={{
        height: '56px',
        borderBottom: '1px solid #1e1e1e',
        boxShadow: '0 1px 0 #2a2a2a',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: '16px',
        flexShrink: 0,
      }}>
        <span style={{ color: '#7F77DD', fontWeight: 700, fontSize: '15px' }}>Sovereign Creator</span>

        {/* Desktop-only nav items */}
        {!isMobile && (
          <>
            <span style={{ color: '#444', fontSize: '13px' }}>Studio</span>
            <Link href="/projects" style={{
              color: '#888', fontSize: '13px', textDecoration: 'none',
              padding: '4px 10px', borderRadius: '6px', border: '1px solid #2a2a2a',
            }}>
              Projects
            </Link>
          </>
        )}

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Desktop download button */}
          {!isMobile && jobStatus === 'complete' && (
            <button
              onClick={renderState.phase === 'idle' ? handleDownload : undefined}
              disabled={renderState.phase === 'rendering'}
              title={renderState.phase === 'error' ? renderState.message : ''}
              style={{
                background: renderState.phase === 'error' ? '#7f1d1d' : '#534AB7',
                color: '#fff', border: 'none', borderRadius: '6px',
                padding: '0 14px', height: '32px', fontSize: '13px', fontWeight: 600,
                cursor: renderState.phase === 'rendering' ? 'not-allowed' : 'pointer',
                opacity: renderState.phase === 'rendering' ? 0.7 : 1,
                whiteSpace: 'nowrap', transition: 'opacity 0.2s ease',
              }}
            >
              {renderState.phase === 'idle' && 'Download Video'}
              {renderState.phase === 'rendering' && (renderState.progress > 0 ? `Rendering ${Math.round(renderState.progress * 100)}%...` : 'Rendering...')}
              {renderState.phase === 'error' && 'Error - hover for details'}
            </button>
          )}
          <UserButton />
        </div>
      </header>

      {/* ── DESKTOP WORKSPACE ── */}
      {!isMobile && (
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <LeftPanel />
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0f0f' }}>
            <CenterPreview />
          </div>
          <RightPanel />
        </div>
      )}

      {/* ── MOBILE WORKSPACE ── */}
      {isMobile && (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0f0f', paddingBottom: '72px' }}>
          <CenterPreview />

          {/* Backdrop */}
          <div
            onClick={() => setDrawer('none')}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: 'rgba(0,0,0,0.65)',
              opacity: drawer !== 'none' ? 1 : 0,
              pointerEvents: drawer !== 'none' ? 'auto' : 'none',
              transition: 'opacity 0.25s ease',
            }}
          />

          {/* Bottom drawer */}
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            height: '72vh',
            zIndex: 50,
            borderRadius: '16px 16px 0 0',
            overflow: 'hidden',
            transform: drawer !== 'none' ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            {/* Drag handle */}
            <div style={{
              position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
              width: 40, height: 4, borderRadius: 2,
              background: '#444', zIndex: 1,
            }} />
            {drawer === 'settings' && <LeftPanel />}
            {drawer === 'style' && <RightPanel />}
          </div>

          {/* Floating toolbar */}
          <div style={{
            position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
            zIndex: 60,
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '999px',
            padding: '8px 16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
          }}>
            {/* Settings */}
            <ToolbarButton
              active={drawer === 'settings'}
              onClick={() => setDrawer((d) => d === 'settings' ? 'none' : 'settings')}
              label="Script"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </ToolbarButton>

            <div style={{ width: 1, height: 28, background: '#2a2a2a' }} />

            {/* Style */}
            <ToolbarButton
              active={drawer === 'style'}
              onClick={() => setDrawer((d) => d === 'style' ? 'none' : 'style')}
              label="Style"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
              </svg>
            </ToolbarButton>

            <div style={{ width: 1, height: 28, background: '#2a2a2a' }} />

            {/* Download */}
            <ToolbarButton
              active={false}
              onClick={jobStatus === 'complete' && renderState.phase === 'idle' ? handleDownload : undefined}
              label={downloadLabel}
              disabled={jobStatus !== 'complete' || renderState.phase === 'rendering'}
              accent={jobStatus === 'complete'}
              error={renderState.phase === 'error'}
              title={renderState.phase === 'error' ? renderState.message : ''}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </ToolbarButton>
          </div>
        </div>
      )}
    </main>
  )
}

function ToolbarButton({
  children,
  label,
  active,
  disabled,
  accent,
  error,
  title,
  onClick,
}: {
  children: React.ReactNode
  label: string
  active: boolean
  disabled?: boolean
  accent?: boolean
  error?: boolean
  title?: string
  onClick?: () => void
}) {
  const color = error ? '#f87171' : active || accent ? '#7F77DD' : '#888'
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
        background: 'none', border: 'none',
        color,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        padding: '4px 8px',
        borderRadius: '8px',
      }}
    >
      {children}
      <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.03em' }}>{label}</span>
    </button>
  )
}
