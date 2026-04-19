'use client'

import Link from 'next/link'
import { useState } from 'react'

const features = [
  { icon: '🧠', title: 'AI Script Generation', desc: 'Drop a topic or URL and get a punchy, viral-ready script in seconds.' },
  { icon: '🎙️', title: 'Natural Voiceovers', desc: 'Realistic AI voices that sound human — choose tone, pace, and style.' },
  { icon: '✏️', title: 'Click-to-Edit Captions', desc: 'Auto-generated captions you can tweak word-by-word, right in the editor.' },
  { icon: '🎨', title: 'Caption Styles', desc: 'Bold, minimal, gradient — pick a look that fits your brand instantly.' },
  { icon: '🎬', title: 'Background Video', desc: 'Auto-matched B-roll and stock footage pulled in to keep viewers hooked.' },
  { icon: '⚡', title: 'Instant Preview', desc: 'See your video render in real-time before you ever hit export.' },
]

const steps = [
  { num: '01', title: 'Write your prompt', desc: 'Type a topic, paste a link, or describe your idea. The AI handles the rest.' },
  { num: '02', title: 'AI builds the video', desc: 'Script, voice, captions, and visuals are assembled automatically in seconds.' },
  { num: '03', title: 'Export & go viral', desc: 'Download a ready-to-post vertical video optimized for TikTok, Reels, and Shorts.' },
]

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [signInHovered, setSignInHovered] = useState(false)
  const [getStartedHovered, setGetStartedHovered] = useState(false)
  const [heroPrimaryHovered, setHeroPrimaryHovered] = useState(false)
  const [heroGhostHovered, setHeroGhostHovered] = useState(false)
  const [ctaHovered, setCtaHovered] = useState(false)

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080808; }
        ::selection { background: #534AB7; color: #fff; }
        a { text-decoration: none; color: inherit; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(8,8,8,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1e1e1e',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: '#7F77DD', letterSpacing: '-0.02em' }}>
            Sovereign Creator
          </span>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link href="/pricing" style={{ fontSize: 14, color: '#888', padding: '8px 4px' }}>
              Pricing
            </Link>
            <Link href="/studio">
              <button
                onMouseEnter={() => setSignInHovered(true)}
                onMouseLeave={() => setSignInHovered(false)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${signInHovered ? '#534AB7' : '#333'}`,
                  color: signInHovered ? '#7F77DD' : '#888',
                  borderRadius: 8, padding: '8px 18px',
                  fontSize: 14, fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Sign In
              </button>
            </Link>
            <Link href="/studio">
              <button
                onMouseEnter={() => setGetStartedHovered(true)}
                onMouseLeave={() => setGetStartedHovered(false)}
                style={{
                  background: getStartedHovered ? '#6560D0' : '#534AB7',
                  border: 'none',
                  color: '#fff',
                  borderRadius: 8, padding: '8px 18px',
                  fontSize: 14, fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  fontWeight: 500,
                }}
              >
                Get Started Free
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '96px 24px 80px', textAlign: 'center' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -60%)',
          width: 700, height: 500,
          background: 'radial-gradient(ellipse, rgba(83,74,183,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 780, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(83,74,183,0.15)',
            border: '1px solid rgba(83,74,183,0.35)',
            borderRadius: 999, padding: '6px 16px',
            fontSize: 13, color: '#7F77DD',
            marginBottom: 32, fontWeight: 500,
          }}>
            ✦ AI-Powered Short Form Video
          </div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(42px, 7vw, 76px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 24,
            color: '#fff',
          }}>
            Create viral videos{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7F77DD, #C084FC, #F472B6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              in seconds
            </span>
          </h1>

          <p style={{
            fontSize: 18, lineHeight: 1.7,
            color: '#888', maxWidth: 520, margin: '0 auto 40px',
            fontWeight: 400,
          }}>
            Turn any idea into a scroll-stopping short-form video with AI-generated scripts, voices, captions, and b-roll — no editing skills needed.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
            <Link href="/studio">
              <button
                onMouseEnter={() => setHeroPrimaryHovered(true)}
                onMouseLeave={() => setHeroPrimaryHovered(false)}
                style={{
                  background: heroPrimaryHovered ? '#6560D0' : '#534AB7',
                  border: 'none',
                  color: '#fff',
                  borderRadius: 10, padding: '14px 28px',
                  fontSize: 16, fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                Start Creating Free →
              </button>
            </Link>
            <a href="#features">
              <button
                onMouseEnter={() => setHeroGhostHovered(true)}
                onMouseLeave={() => setHeroGhostHovered(false)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${heroGhostHovered ? '#534AB7' : '#2a2a2a'}`,
                  color: heroGhostHovered ? '#7F77DD' : '#aaa',
                  borderRadius: 10, padding: '14px 28px',
                  fontSize: 16, fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontWeight: 500,
                }}
              >
                See how it works
              </button>
            </a>
          </div>
          <p style={{ fontSize: 13, color: '#444' }}>No credit card required</p>
        </div>
      </section>

      {/* ── FLOW MOCKUP ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{
          maxWidth: 680, margin: '0 auto',
          background: '#111',
          border: '1px solid #1e1e1e',
          borderRadius: 16,
          padding: '40px 32px',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, flexWrap: 'wrap',
          }}>
            {([
              { icon: '✍️', label: 'Write prompt' },
              null,
              { icon: '🤖', label: 'AI generates' },
              null,
              { icon: '🎬', label: 'Video ready' },
            ] as ({ icon: string; label: string } | null)[]).map((item, i) =>
              item === null ? (
                <div key={i} style={{ color: '#333', fontSize: 24, fontWeight: 300 }}>→</div>
              ) : (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                  background: '#181818', border: '1px solid #2a2a2a',
                  borderRadius: 12, padding: '20px 28px',
                  minWidth: 140,
                }}>
                  <span style={{ fontSize: 32 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>{item.label}</span>
                </div>
              )
            )}
          </div>
          <p style={{ textAlign: 'center', color: '#555', fontSize: 13, marginTop: 24 }}>
            From idea to export in under 60 seconds
          </p>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.03em',
              marginBottom: 14,
            }}>
              Everything you need to go viral
            </h2>
            <p style={{ color: '#666', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>
              A full creative toolkit powered by AI — built for speed, not complexity.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {features.map((f, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: '#111',
                  border: `1px solid ${hoveredCard === i ? '#534AB7' : '#1e1e1e'}`,
                  borderRadius: 14,
                  padding: '28px 24px',
                  cursor: 'default',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 10,
                  background: 'rgba(83,74,183,0.15)',
                  border: '1px solid rgba(83,74,183,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, marginBottom: 16,
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 700,
                  fontSize: 17, marginBottom: 8, color: '#eee',
                }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.65 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '80px 24px', background: '#0b0b0b' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.03em',
              marginBottom: 14,
            }}>
              How it works
            </h2>
            <p style={{ color: '#666', fontSize: 17 }}>Three steps. Zero learning curve.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
                <div style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 800,
                  fontSize: 'clamp(64px, 10vw, 96px)',
                  color: 'rgba(83,74,183,0.2)',
                  lineHeight: 1,
                  minWidth: 120,
                  userSelect: 'none',
                }}>
                  {s.num}
                </div>
                <div style={{ paddingTop: 12 }}>
                  <h3 style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 700,
                    fontSize: 22, marginBottom: 10, color: '#eee',
                  }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 15, color: '#666', lineHeight: 1.7, maxWidth: 480 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{
          maxWidth: 760, margin: '0 auto',
          background: 'linear-gradient(135deg, #1a1a2e, #16162a)',
          border: '1px solid rgba(83,74,183,0.3)',
          borderRadius: 20,
          padding: '64px 48px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.03em',
            marginBottom: 16,
          }}>
            Ready to go viral?
          </h2>
          <p style={{ color: '#888', fontSize: 17, maxWidth: 400, margin: '0 auto 36px' }}>
            Join creators who are already making scroll-stopping content with AI.
          </p>
          <Link href="/studio">
            <button
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{
                background: ctaHovered ? '#6560D0' : '#534AB7',
                border: 'none',
                color: '#fff',
                borderRadius: 10, padding: '14px 32px',
                fontSize: 16, fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                fontWeight: 600,
              }}
            >
              Open Studio →
            </button>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #1e1e1e', padding: '28px 24px' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, color: '#7F77DD' }}>
            Sovereign Creator
          </span>
          <span style={{ fontSize: 13, color: '#444' }}>
            Built with AI. Made for creators.
          </span>
        </div>
      </footer>
    </main>
  )
}
