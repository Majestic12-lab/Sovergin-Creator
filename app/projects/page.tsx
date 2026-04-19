'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

interface VideoProject {
  id: string
  script: string
  voiceId: string
  backgroundTheme: string
  durationSeconds: number
  createdAt: string
}

export default function ProjectsPage() {
  const { isLoaded } = useUser()
  const [projects, setProjects] = useState<VideoProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoaded) return
    fetch('/api/projects')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load projects')
        return r.json()
      })
      .then((data: VideoProject[]) => {
        setProjects(data)
        setLoading(false)
      })
      .catch((e: Error) => {
        setError(e.message)
        setLoading(false)
      })
  }, [isLoaded])

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#080808',
        color: '#fff',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <header
        style={{
          height: '48px',
          borderBottom: '1px solid #2a2a2a',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: '12px',
        }}
      >
        <span style={{ color: '#7F77DD', fontWeight: 700 }}>Sovereign Creator</span>
        <span style={{ color: '#555', fontSize: '12px' }}>Projects</span>
        <Link
          href="/studio"
          style={{
            marginLeft: 'auto',
            background: '#534AB7',
            color: '#fff',
            borderRadius: '6px',
            padding: '0 14px',
            height: '30px',
            fontSize: '12px',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          Back to Studio
        </Link>
      </header>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '32px' }}>
          Your Videos
        </h1>

        {loading && (
          <p style={{ color: '#888', fontSize: '14px' }}>Loading projects…</p>
        )}

        {error && (
          <p style={{ color: '#f87171', fontSize: '14px' }}>{error}</p>
        )}

        {!loading && !error && projects.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 0',
              color: '#555',
              fontSize: '16px',
            }}
          >
            No videos yet — go generate one!
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {projects.map((p) => (
              <div
                key={p.id}
                style={{
                  background: '#111',
                  border: '1px solid #2a2a2a',
                  borderRadius: '10px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    color: '#ccc',
                    lineHeight: '1.5',
                    margin: 0,
                    wordBreak: 'break-word',
                  }}
                >
                  {p.script.slice(0, 100)}
                  {p.script.length > 100 ? '…' : ''}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <Row label="Voice" value={p.voiceId} />
                  <Row label="Theme" value={p.backgroundTheme} />
                  <Row
                    label="Duration"
                    value={`${Math.round(p.durationSeconds)}s`}
                  />
                  <Row
                    label="Created"
                    value={new Date(p.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
      <span style={{ color: '#534AB7', fontWeight: 600, minWidth: '60px' }}>
        {label}
      </span>
      <span style={{ color: '#888' }}>{value}</span>
    </div>
  )
}
