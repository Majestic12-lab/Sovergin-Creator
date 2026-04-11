'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Tokens ──────────────────────────────────────────────────────
const BG         = '#080808'
const CARD_BG    = '#111111'
const CARD_BDR   = '#1e1e1e'
const PURPLE     = '#534AB7'
const PURPLE_LT  = '#7F77DD'
const TEXT_PRI   = '#ffffff'
const TEXT_SEC   = '#666666'
const TEXT_MUT   = '#444444'

// ─── Shared style helpers ─────────────────────────────────────────
const syne = 'Syne, sans-serif'
const inter = 'Inter, sans-serif'

const gradientText: React.CSSProperties = {
  background: 'linear-gradient(135deg, #7F77DD 0%, #C084FC 50%, #F472B6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const sectionDivider: React.CSSProperties = {
  height: '1px',
  background: 'linear-gradient(90deg, transparent, #2a2a2a, transparent)',
  border: 'none',
  margin: 0,
}

// ─── Data ─────────────────────────────────────────────────────────
const FEATURES = [
  { icon: '🧠', title: 'AI Script Generation',    desc: 'GPT-4 writes your hook, body, and CTA optimised for short-form engagement.' },
  { icon: '🎙️', title: 'Natural Voiceovers',      desc: '4 AI voices (Nova, Onyx, Echo, Shimmer) with realistic tone and pacing.' },
  { icon: '✏️', title: 'Click-to-Edit Captions',  desc: 'Click any word in the preview to edit it. Full caption style control.' },
  { icon: '🎨', title: 'Caption Styles',           desc: 'Classic, Fire, Neon, Minimal, Bold Drop, Typewriter — with animations.' },
  { icon: '🎬', title: 'Background Video',         desc: 'Paste your own footage URL or pick a theme. Your content, your style.' },
  { icon: '⚡', title: 'Instant Preview',          desc: 'Live Remotion preview updates in real time as you make changes.' },
]

const STEPS = [
  { n: '01', title: 'Describe your video',  desc: 'Type a topic, idea, or paste your own script into the prompt box.' },
  { n: '02', title: 'AI does the work',     desc: 'Script, voice, captions, and background are generated automatically.' },
  { n: '03', title: 'Customise & export',   desc: 'Tweak captions, swap backgrounds, adjust style — then download.' },
]

// ─── Sub-components ────────────────────────────────────────────────
function PurpleButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '13px 26px',
        background: PURPLE,
        color: TEXT_PRI,
        borderRadius: '10px',
        fontSize: '15px',
        fontWeight: 500,
        fontFamily: inter,
        textDecoration: 'none',
        transition: 'box-shadow 0.2s, transform 0.2s',
        boxShadow: hovered ? '0 8px 32px rgba(83,74,183,0.4)' : '0 0 0 transparent',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {children}
    </Link>
  )
}

function GhostButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '13px 26px',
        background: 'transparent',
        color: hovered ? TEXT_PRI : '#888',
        border: `1px solid ${hovered ? '#444' : '#2a2a2a'}`,
        borderRadius: '10px',
        fontSize: '15px',
        fontWeight: 400,
        fontFamily: inter,
        textDecoration: 'none',
        transition: 'color 0.2s, border-color 0.2s',
      }}
    >
      {children}
    </Link>
  )
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: CARD_BG,
        border: `1px solid ${hovered ? PURPLE : CARD_BDR}`,
        borderRadius: '16px',
        padding: '28px',
        transition: 'border-color 0.2s, transform 0.2s',
        transform: hovered ? 'translateY(-2px)' : 'none',
        cursor: 'default',
      }}
    >
      <div style={{
        width: '44px',
        height: '44px',
        background: 'rgba(83,74,183,0.15)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        marginBottom: '16px',
      }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: syne, fontWeight: 800, fontSize: '17px', color: TEXT_PRI, marginBottom: '8px' }}>
        {title}
      </h3>
      <p style={{ fontFamily: inter, fontWeight: 300, fontSize: '14px', color: TEXT_SEC, lineHeight: 1.65 }}>
        {desc}
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────
export default function HomePage() {
  const [ctaHovered, setCtaHovered] = useState(false)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${BG}; color: ${TEXT_PRI}; font-family: ${inter}; -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(83,74,183,0.4); }
      `}</style>

      <div style={{ background: BG, minHeight: '100vh' }}>

        {/* ─── 1. STICKY NAV ───────────────────────────────────── */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(8,8,8,0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid #111',
          padding: '20px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: syne, fontWeight: 800, fontSize: '18px', color: PURPLE_LT }}>
            Sovereign Creator
          </span>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <GhostButton href="/studio">Sign In</GhostButton>
            <PurpleButton href="/studio">Get Started Free</PurpleButton>
          </div>
        </nav>

        {/* ─── 2. HERO ─────────────────────────────────────────── */}
        <section style={{ position: 'relative', textAlign: 'center', padding: '120px 20px 80px', overflow: 'hidden' }}>
          {/* Radial glow */}
          <div style={{
            position: 'absolute',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(83,74,183,0.35), transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: 'rgba(83,74,183,0.15)',
              border: '1px solid rgba(83,74,183,0.4)',
              borderRadius: '999px',
              color: '#9D97E8',
              fontSize: '12px',
              fontFamily: inter,
              fontWeight: 400,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '32px',
            }}>
              ✦ AI-Powered Short Form Video
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: syne,
              fontWeight: 800,
              fontSize: 'clamp(48px, 8vw, 96px)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: '28px',
              color: TEXT_PRI,
            }}>
              Create viral videos<br />
              <span style={gradientText}>in seconds</span>
            </h1>

            {/* Subtext */}
            <p style={{
              fontFamily: inter,
              fontWeight: 300,
              fontSize: '18px',
              color: TEXT_SEC,
              lineHeight: 1.65,
              maxWidth: '520px',
              margin: '0 auto 44px',
            }}>
              Turn any idea into a short-form video with AI-generated scripts,
              voiceovers, captions, and backgrounds. No editing skills required.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <PurpleButton href="/studio">Start Creating Free →</PurpleButton>
              <GhostButton href="#features">See how it works</GhostButton>
            </div>

            <p style={{ marginTop: '20px', fontSize: '12px', color: TEXT_MUT, fontFamily: inter }}>
              No credit card required
            </p>
          </div>
        </section>

        <hr style={sectionDivider} />

        {/* ─── 3. FLOW MOCKUP ──────────────────────────────────── */}
        <section style={{ padding: '64px 20px' }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: CARD_BG,
            border: `1px solid ${CARD_BDR}`,
            borderRadius: '20px',
            padding: '20px',
          }}>
            {/* Browser bar */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', paddingLeft: '4px' }}>
              {['#ff5f57','#febc2e','#28c840'].map((c) => (
                <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
              ))}
            </div>
            {/* Steps */}
            <div style={{
              background: '#0d0d0d',
              borderRadius: '12px',
              padding: '36px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
              {[
                { emoji: '✍️', label: 'Write prompt' },
                { emoji: '🤖', label: 'AI generates' },
                { emoji: '🎬', label: 'Video ready' },
              ].map((step, i) => (
                <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ textAlign: 'center', padding: '0 20px' }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>{step.emoji}</div>
                    <div style={{ fontSize: '13px', fontFamily: inter, color: TEXT_SEC }}>{step.label}</div>
                  </div>
                  {i < 2 && (
                    <div style={{ color: '#333', fontSize: '20px', lineHeight: 1, padding: '0 4px' }}>→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr style={sectionDivider} />

        {/* ─── 4. FEATURES ─────────────────────────────────────── */}
        <section id="features" style={{ padding: '96px 40px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <h2 style={{
                fontFamily: syne,
                fontWeight: 800,
                fontSize: 'clamp(32px, 5vw, 52px)',
                letterSpacing: '-0.02em',
                color: TEXT_PRI,
                marginBottom: '16px',
              }}>
                Everything you need
              </h2>
              <p style={{ fontFamily: inter, fontSize: '17px', fontWeight: 300, color: TEXT_SEC }}>
                From idea to published video in under 2 minutes
              </p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
            }}>
              {FEATURES.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>
        </section>

        <hr style={sectionDivider} />

        {/* ─── 5. HOW IT WORKS ─────────────────────────────────── */}
        <section style={{ padding: '96px 40px', background: '#0b0b0b' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: syne,
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 52px)',
              letterSpacing: '-0.02em',
              color: TEXT_PRI,
              textAlign: 'center',
              marginBottom: '72px',
            }}>
              How it works
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '48px',
            }}>
              {STEPS.map((step) => (
                <div key={step.n}>
                  <div style={{
                    fontFamily: syne,
                    fontWeight: 800,
                    fontSize: '64px',
                    lineHeight: 1,
                    color: 'rgba(83,74,183,0.2)',
                    marginBottom: '16px',
                    userSelect: 'none',
                  }}>
                    {step.n}
                  </div>
                  <h3 style={{
                    fontFamily: syne,
                    fontWeight: 800,
                    fontSize: '20px',
                    color: TEXT_PRI,
                    marginBottom: '10px',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontFamily: inter,
                    fontWeight: 300,
                    fontSize: '15px',
                    color: TEXT_SEC,
                    lineHeight: 1.65,
                  }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr style={sectionDivider} />

        {/* ─── 6. CTA BANNER ───────────────────────────────────── */}
        <section style={{ padding: '80px 40px' }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #1a1a2e, #16162a)',
            border: '1px solid #2a2a4a',
            borderRadius: '24px',
            padding: '80px 40px',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontFamily: syne,
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 52px)',
              letterSpacing: '-0.02em',
              color: TEXT_PRI,
              marginBottom: '16px',
            }}>
              Ready to go viral?
            </h2>
            <p style={{
              fontFamily: inter,
              fontWeight: 300,
              fontSize: '17px',
              color: TEXT_SEC,
              marginBottom: '40px',
            }}>
              Start creating for free. No credit card needed.
            </p>
            <Link
              href="/studio"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 40px',
                background: PURPLE,
                color: TEXT_PRI,
                borderRadius: '10px',
                fontSize: '17px',
                fontWeight: 500,
                fontFamily: inter,
                textDecoration: 'none',
                transition: 'box-shadow 0.2s, transform 0.2s',
                boxShadow: ctaHovered ? '0 8px 32px rgba(83,74,183,0.4)' : 'none',
                transform: ctaHovered ? 'translateY(-2px)' : 'none',
              }}
            >
              Open Studio →
            </Link>
          </div>
        </section>

        {/* ─── 7. FOOTER ───────────────────────────────────────── */}
        <footer style={{
          borderTop: '1px solid #111',
          padding: '32px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <span style={{ fontFamily: syne, fontWeight: 800, fontSize: '15px', color: PURPLE_LT }}>
            Sovereign Creator
          </span>
          <span style={{ fontFamily: inter, fontSize: '13px', color: TEXT_MUT }}>
            Built with AI. Made for creators.
          </span>
        </footer>

      </div>
    </>
  )
}
