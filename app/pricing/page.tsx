'use client'

import Link from 'next/link'
import { useState } from 'react'

const FREE_FEATURES = [
  { label: '5 videos per month',       included: true  },
  { label: 'Watermark on exports',      included: false },
  { label: 'Standard voices',           included: true  },
  { label: 'Pexels backgrounds only',   included: true  },
  { label: 'Custom background URL',     included: false },
  { label: 'Priority rendering',        included: false },
  { label: 'Project history',           included: false },
]

const PRO_FEATURES = [
  { label: 'Unlimited videos',          included: true },
  { label: 'No watermark',              included: true },
  { label: 'All voices',                included: true },
  { label: 'Pexels backgrounds',        included: true },
  { label: 'Custom background URL',     included: true },
  { label: 'Priority rendering',        included: true },
  { label: 'Project history',           included: true },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  const monthlyPrice = 19
  const annualPrice = Math.round(monthlyPrice * 0.8)

  return (
    <main style={{ height: '100%', overflowY: 'auto', background: '#080808', color: '#fff', fontFamily: 'Inter, sans-serif', paddingBottom: '60px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
      `}</style>

      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(8,8,8,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1e1e1e',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          padding: '0 24px', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link href="/" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: '#7F77DD', letterSpacing: '-0.02em' }}>
            Sovereign Creator
          </Link>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Link href="/" style={{ fontSize: 14, color: '#888' }}>Home</Link>
            <Link href="/studio" style={{
              background: '#534AB7', color: '#fff',
              borderRadius: 8, padding: '8px 18px',
              fontSize: 14, fontWeight: 500,
            }}>
              Open Studio
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '80px 24px 48px', textAlign: 'center' }}>
        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -70%)',
            width: 600, height: 300,
            background: 'radial-gradient(ellipse, rgba(83,74,183,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 60px)',
            letterSpacing: '-0.03em', lineHeight: 1.05,
            marginBottom: 16, position: 'relative',
          }}>
            Simple, transparent pricing
          </h1>
          <p style={{ fontSize: 17, color: '#888', lineHeight: 1.7, position: 'relative' }}>
            Start for free. Upgrade when you're ready to go unlimited.
          </p>
        </div>
      </section>

      {/* Annual/Monthly toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 56 }}>
        <span style={{ fontSize: 14, color: annual ? '#555' : '#ccc', fontWeight: annual ? 400 : 600 }}>Monthly</span>
        <button
          onClick={() => setAnnual((a) => !a)}
          style={{
            width: 48, height: 26,
            background: annual ? '#534AB7' : '#2a2a2a',
            border: 'none', borderRadius: 999,
            cursor: 'pointer', position: 'relative',
            transition: 'background 0.2s ease',
          }}
        >
          <span style={{
            position: 'absolute',
            top: 3, left: annual ? 25 : 3,
            width: 20, height: 20,
            background: '#fff', borderRadius: '50%',
            transition: 'left 0.2s ease',
            display: 'block',
          }} />
        </button>
        <span style={{ fontSize: 14, color: annual ? '#ccc' : '#555', fontWeight: annual ? 600 : 400 }}>
          Annual
          <span style={{
            marginLeft: 8,
            background: 'rgba(83,74,183,0.2)',
            border: '1px solid rgba(83,74,183,0.4)',
            color: '#7F77DD',
            fontSize: 11, fontWeight: 600,
            borderRadius: 999, padding: '2px 8px',
          }}>
            Save 20%
          </span>
        </span>
      </div>

      {/* Cards */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{
          maxWidth: 820, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}>
          {/* Free card */}
          <div style={{
            background: '#111',
            border: '1px solid #1e1e1e',
            borderRadius: 16,
            padding: '32px 28px',
          }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>Free</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 48, fontWeight: 800, color: '#fff' }}>$0</span>
              <span style={{ fontSize: 14, color: '#555' }}>/month</span>
            </div>
            <p style={{ fontSize: 14, color: '#555', marginBottom: 28 }}>Perfect for trying it out.</p>

            <Link href="/studio">
              <button style={{
                width: '100%', padding: '12px',
                background: 'transparent',
                border: '1px solid #2a2a2a',
                color: '#ccc', borderRadius: 10,
                fontSize: 14, fontWeight: 600,
                cursor: 'pointer', marginBottom: 28,
              }}>
                Get Started Free
              </button>
            </Link>

            <FeatureList features={FREE_FEATURES} />
          </div>

          {/* Pro card */}
          <div style={{
            background: '#111',
            border: '1px solid #534AB7',
            borderRadius: 16,
            padding: '32px 28px',
            position: 'relative',
          }}>
            {/* Most Popular badge */}
            <div style={{
              position: 'absolute', top: -13, left: '50%',
              transform: 'translateX(-50%)',
              background: '#534AB7',
              color: '#fff', fontSize: 11, fontWeight: 700,
              borderRadius: 999, padding: '4px 14px',
              letterSpacing: '0.05em', whiteSpace: 'nowrap',
            }}>
              MOST POPULAR
            </div>

            <p style={{ fontSize: 13, fontWeight: 600, color: '#7F77DD', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>Pro</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 48, fontWeight: 800, color: '#fff' }}>
                ${annual ? annualPrice : monthlyPrice}
              </span>
              <span style={{ fontSize: 14, color: '#555' }}>/month</span>
            </div>
            {annual && (
              <p style={{ fontSize: 12, color: '#7F77DD', marginBottom: 4 }}>
                Billed ${annualPrice * 12}/year
              </p>
            )}
            <p style={{ fontSize: 14, color: '#555', marginBottom: 28 }}>For serious creators.</p>

            <button
              disabled
              style={{
                width: '100%', padding: '12px',
                background: '#2a2a2a',
                border: '1px solid #333',
                color: '#555', borderRadius: 10,
                fontSize: 14, fontWeight: 600,
                cursor: 'not-allowed', marginBottom: 28,
              }}
            >
              Coming Soon
            </button>

            <FeatureList features={PRO_FEATURES} />
          </div>
        </div>
      </section>

      {/* FAQ / bottom note */}
      <section style={{ padding: '0 24px 80px', textAlign: 'center' }}>
        <p style={{ fontSize: 14, color: '#444', maxWidth: 480, margin: '0 auto' }}>
          No credit card required for the free plan. Pro billing coming soon —{' '}
          <Link href="/studio" style={{ color: '#7F77DD', textDecoration: 'underline' }}>start free today</Link>.
        </p>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e1e1e', padding: '28px 24px' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, color: '#7F77DD' }}>
            Sovereign Creator
          </span>
          <span style={{ fontSize: 13, color: '#444' }}>Built with AI. Made for creators.</span>
        </div>
      </footer>
    </main>
  )
}

function FeatureList({ features }: { features: { label: string; included: boolean }[] }) {
  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {features.map((f) => (
        <li key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
          <span style={{
            flexShrink: 0,
            width: 18, height: 18,
            borderRadius: '50%',
            background: f.included ? 'rgba(83,74,183,0.15)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${f.included ? '#534AB7' : '#2a2a2a'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700,
            color: f.included ? '#7F77DD' : '#444',
          }}>
            {f.included ? '✓' : '✗'}
          </span>
          <span style={{ color: f.included ? '#ccc' : '#444' }}>{f.label}</span>
        </li>
      ))}
    </ul>
  )
}
