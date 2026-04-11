'use client'

import { useState } from 'react'
import { Loader2, Check } from 'lucide-react'
import { useVideoStore } from '@/store/useVideoStore'
import { JobStatus } from '@/types/video'

const VOICES = [
  { id: 'nova',    label: 'Nova',    desc: 'Energetic, Female' },
  { id: 'onyx',    label: 'Onyx',    desc: 'Deep, Male'        },
  { id: 'echo',    label: 'Echo',    desc: 'Calm, Male'        },
  { id: 'shimmer', label: 'Shimmer', desc: 'Warm, Female'      },
] as const

const THEMES = ['Minecraft', 'Subway Surfers', 'Reddit Dark', 'Abstract', 'Nature']
const MAX_CHARS = 500

const STEPS: { status: JobStatus; label: string }[] = [
  { status: 'generating-script', label: 'Writing script...'     },
  { status: 'generating-voice',  label: 'Generating voice...'   },
  { status: 'fetching-clips',    label: 'Finding background...' },
  { status: 'transcribing',      label: 'Building captions...'  },
]
const STEP_ORDER = STEPS.map((s) => s.status)

function stepIsDone(current: JobStatus, stepStatus: JobStatus): boolean {
  return STEP_ORDER.indexOf(current) > STEP_ORDER.indexOf(stepStatus)
}
function stepIsActive(current: JobStatus, stepStatus: JobStatus): boolean {
  return current === stepStatus
}

export function LeftPanel() {
  const script = useVideoStore((s) => s.project.script)
  const voiceId = useVideoStore((s) => s.project.voiceId)
  const backgroundTheme = useVideoStore((s) => s.project.backgroundTheme)
  const customBackgroundUrl = useVideoStore((s) => s.project.customBackgroundUrl ?? '')
  const jobStatus = useVideoStore((s) => s.jobStatus)
  const setScript = useVideoStore((s) => s.setScript)
  const setVoiceId = useVideoStore((s) => s.setVoiceId)
  const setBackgroundTheme = useVideoStore((s) => s.setBackgroundTheme)
  const setCustomBackgroundUrl = useVideoStore((s) => s.setCustomBackgroundUrl)
  const setJobStatus = useVideoStore((s) => s.setJobStatus)
  const setGenerationResult = useVideoStore((s) => s.setGenerationResult)

  const [error, setError] = useState<string | null>(null)

  const isGenerating = STEP_ORDER.includes(jobStatus as JobStatus)
  const canGenerate = script.trim().length > 0 && !isGenerating

  async function handleGenerate() {
    if (!canGenerate) return
    setError(null)
    setJobStatus('generating-script')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: script,
          voiceId,
          theme: backgroundTheme,
          customBackgroundUrl: customBackgroundUrl.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Generation failed')
      setGenerationResult({
        jobId: data.jobId,
        words: data.words,
        audioUrl: data.audioUrl,
        backgroundUrl: data.backgroundUrl,
        durationSeconds: data.durationSeconds,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setJobStatus('error')
    }
  }

  return (
    <div style={{
      width: '320px', minWidth: '320px', height: '100%',
      background: '#1a1a1a', borderRight: '1px solid #2a2a2a',
      display: 'flex', flexDirection: 'column', gap: '24px',
      padding: '24px 16px', overflowY: 'auto',
    }}>
      <section>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#888', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Your script
        </label>
        <textarea
          rows={8}
          value={script}
          onChange={(e) => setScript(e.target.value.slice(0, MAX_CHARS))}
          placeholder="Paste your script or describe your video idea..."
          style={{
            marginTop: '8px', width: '100%', background: '#0f0f0f',
            border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff',
            fontSize: '14px', padding: '10px 12px', resize: 'none',
            outline: 'none', lineHeight: 1.5, boxSizing: 'border-box',
          }}
        />
        <p style={{ fontSize: '11px', color: '#555', textAlign: 'right', marginTop: '4px' }}>
          {script.length} / {MAX_CHARS}
        </p>
      </section>

      <section>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#888', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Voice
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
          {VOICES.map((v) => {
            const selected = voiceId === v.id
            return (
              <button key={v.id} onClick={() => setVoiceId(v.id)} style={{
                background: selected ? '#1e1a3a' : '#0f0f0f',
                border: `1px solid ${selected ? '#534AB7' : '#2a2a2a'}`,
                borderRadius: '8px', padding: '10px 12px', cursor: 'pointer', textAlign: 'left',
              }}>
                <p style={{ color: selected ? '#7F77DD' : '#fff', fontSize: '13px', fontWeight: 600, margin: 0 }}>{v.label}</p>
                <p style={{ color: '#666', fontSize: '11px', margin: '2px 0 0' }}>{v.desc}</p>
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#888', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Background
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
          {THEMES.map((theme) => {
            const themeId = theme.toLowerCase().split(' ').join('-')
            const selected = backgroundTheme === themeId && !customBackgroundUrl.trim()
            return (
              <button key={theme} onClick={() => { setBackgroundTheme(themeId); setCustomBackgroundUrl('') }} style={{
                background: selected ? '#534AB7' : '#0f0f0f',
                border: `1px solid ${selected ? '#534AB7' : '#2a2a2a'}`,
                borderRadius: '20px', padding: '5px 12px',
                color: selected ? '#fff' : '#888', fontSize: '12px',
                cursor: 'pointer', fontWeight: selected ? 600 : 400,
              }}>
                {theme}
              </button>
            )
          })}
        </div>
        <div style={{ marginTop: '12px' }}>
          <p style={{ fontSize: '11px', color: '#555', marginBottom: '6px', margin: '0 0 6px 0' }}>
            Or paste your own video URL (.mp4)
          </p>
          <input
            type="text"
            value={customBackgroundUrl}
            onChange={(e) => setCustomBackgroundUrl(e.target.value)}
            placeholder="https://your-video.mp4"
            style={{
              width: '100%',
              background: customBackgroundUrl.trim() ? '#1a1a3a' : '#0f0f0f',
              border: `1px solid ${customBackgroundUrl.trim() ? '#534AB7' : '#2a2a2a'}`,
              borderRadius: '8px', color: '#fff', fontSize: '13px',
              padding: '8px 12px', outline: 'none', boxSizing: 'border-box',
            }}
          />
          {customBackgroundUrl.trim() && (
            <button onClick={() => setCustomBackgroundUrl('')} style={{
              marginTop: '4px', fontSize: '11px', color: '#ff6b6b',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}>
              Clear and use theme instead
            </button>
          )}
        </div>
      </section>

      <div style={{ marginTop: 'auto' }}>
        {isGenerating && (
          <div style={{ marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {STEPS.map((step) => {
              const done = stepIsDone(jobStatus, step.status)
              const active = stepIsActive(jobStatus, step.status)
              return (
                <div key={step.status} style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: done || active ? 1 : 0.3 }}>
                  {done ? <Check size={14} color="#1D9E75" /> : (
                    <Loader2 size={14} color={active ? '#7F77DD' : '#555'}
                      style={{ animation: active ? 'spin 1s linear infinite' : 'none' }} />
                  )}
                  <span style={{ fontSize: '12px', color: done ? '#1D9E75' : active ? '#fff' : '#555' }}>
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        )}
        {error && <p style={{ fontSize: '12px', color: '#ff6b6b', marginBottom: '8px' }}>{error}</p>}
        <button onClick={handleGenerate} disabled={!canGenerate} style={{
          width: '100%', padding: '12px',
          background: canGenerate ? '#534AB7' : '#2a2a2a',
          color: canGenerate ? '#fff' : '#555',
          border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
          cursor: canGenerate ? 'pointer' : 'not-allowed',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          {isGenerating && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
          {isGenerating ? 'Generating...' : 'Generate Video'}
        </button>
      </div>
    </div>
  )
}
