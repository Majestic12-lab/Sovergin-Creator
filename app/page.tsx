import Link from 'next/link'

// ─── Design tokens ───────────────────────────────────────────────
const C = {
  bg:           '#080808',
  accent:       '#534AB7',
  accentLight:  '#7F77DD',
  textPrimary:  '#ffffff',
  textSecondary:'#666666',
  textMuted:    '#444444',
  cardBg:       '#111111',
  cardBorder:   '#1e1e1e',
}

const gradientText: React.CSSProperties = {
  background: 'linear-gradient(135deg, #7F77DD, #C084FC, #F472B6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const syneFont = 'Syne, sans-serif'
const interFont = 'Inter, sans-serif'

// ─── Reusable button styles ───────────────────────────────────────
const btnPrimary: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '12px 24px',
  background: C.accent,
  color: C.textPrimary,
  border: 'none',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: 500,
  fontFamily: interFont,
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background 0.2s, transform 0.15s',
}

const btnGhost: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '12px 24px',
  background: 'transparent',
  color: C.textPrimary,
  border: `1px solid ${C.cardBorder}`,
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: 400,
  fontFamily: interFont,
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'border-color 0.2s, color 0.2s',
}

// ─── Feature card data ────────────────────────────────────────────
const features = [
  {
    icon: '🧠',
    title: 'AI Script Generation',
    desc: 'GPT-4 writes your hook, body, and CTA optimised for short-form engagement.',
  },
  {
    icon: '🎙️',
    title: 'Natural Voiceovers',
    desc: '4 AI voices — Nova, Onyx, Echo, Shimmer — with realistic tone and pacing.',
  },
  {
    icon: '✏️',
    title: 'Click-to-Edit Captions',
    desc: 'Click any word in the preview to edit it. Full caption style control.',
  },
  {
    icon: '🎨',
    title: 'Caption Styles',
    desc: 'Classic, Fire, Neon, Minimal, Bold Drop, Typewriter with animations.',
  },
  {
    icon: '🎬',
    title: 'Background Video',
    desc: 'Paste your own footage URL or pick a theme. Your content, your style.',
  },
  {
    icon: '⚡',
    title: 'Instant Preview',
    desc: 'Live Remotion preview updates in real time as you make changes.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Describe your video',
    desc: 'Type a topic, idea, or paste your own script.',
  },
  {
    num: '02',
    title: 'AI does the work',
    desc: 'Script, voice, captions, and background generated automatically.',
  },
  {
    num: '03',
    title: 'Customise & export',
    desc: 'Tweak captions, swap backgrounds, adjust style then download.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: ${C.bg};
          color: ${C.textPrimary};
          font-family: ${interFont};
        }

        .btn-primary:hover {
          background: #6358d4 !important;
          transform: translateY(-1px);
        }

        .btn-ghost:hover {
          border-color: ${C.accentLight} !important;
          color: ${C.accentLight} !important;
        }

        .feature-card:hover {
          border-color: ${C.accent} !important;
          transform: translateY(-2px);
        }

        .nav-btn-primary:hover {
          background: #6358d4 !important;
        }

        .nav-btn-ghost:hover {
          border-color: ${C.accentLight} !important;
          color: ${C.accentLight} !important;
        }
      `}</style>

      <div style={{ background: C.bg, minHeight: '100vh' }}>

        {/* ── 1. STICKY NAV ─────────────────────────────────────── */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(8,8,8,0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${C.cardBorder}`,
          padding: '0 24px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: syneFont, fontWeight: 700, fontSize: '18px', color: C.accentLight }}>
            Sovereign Creator
          </span>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link
              href="/studio"
              className="nav-btn-ghost"
              style={{
                ...btnGhost,
                padding: '8px 18px',
                fontSize: '14px',
              }}
            >
              Sign In
            </Link>
            <Link
              href="/studio"
              className="nav-btn-primary"
              style={{
                ...btnPrimary,
                padding: '8px 18px',
                fontSize: '14px',
              }}
            >
              Get Started Free
            </Link>
          </div>
        </nav>

        {/* ── 2. HERO ───────────────────────────────────────────── */}
        <section style={{
          position: 'relative',
          textAlign: 'center',
          padding: '100px 24px 80px',
          overflow: 'hidden',
        }}>
          {/* Radial glow */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            height: '500px',
            background: 'radial-gradient(ellipse at center, rgba(83,74,183,0.35) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              border: `1px solid ${C.accent}`,
              borderRadius: '999px',
              fontSize: '13px',
              color: C.accentLight,
              marginBottom: '28px',
              fontFamily: interFont,
              fontWeight: 400,
            }}>
              ✦ AI-Powered Short Form Video
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: syneFont,
              fontWeight: 800,
              fontSize: 'clamp(44px, 7vw, 76px)',
              lineHeight: 1.1,
              marginBottom: '24px',
              ...gradientText,
            }}>
              Create viral videos<br />in seconds
            </h1>

            {/* Subtext */}
            <p style={{
              fontSize: '18px',
              fontWeight: 300,
              color: C.textSecondary,
              lineHeight: 1.65,
              maxWidth: '540px',
              margin: '0 auto 40px',
              fontFamily: interFont,
            }}>
              Turn any idea into a short-form video with AI-generated scripts,
              voiceovers, captions, and backgrounds. No editing skills required.
            </p>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/studio" className="btn-primary" style={{ ...btnPrimary, fontSize: '16px', padding: '14px 28px' }}>
                Start Creating Free →
              </Link>
              <a href="#features" className="btn-ghost" style={{ ...btnGhost, fontSize: '16px', padding: '14px 28px' }}>
                See how it works
              </a>
            </div>

            <p style={{ marginTop: '16px', fontSize: '13px', color: C.textMuted, fontFamily: interFont }}>
              No credit card required
            </p>
          </div>
        </section>

        {/* ── 3. FLOW MOCKUP ────────────────────────────────────── */}
        <section style={{ padding: '20px 24px 80px' }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: C.cardBg,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: '16px',
            padding: '36px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0',
            flexWrap: 'wrap',
          }}>
            {[
              { emoji: '✍️', label: 'Write prompt' },
              { emoji: '🤖', label: 'AI generates' },
              { emoji: '🎬', label: 'Video ready' },
            ].map((step, i) => (
              <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', padding: '0 28px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>{step.emoji}</div>
                  <div style={{ fontSize: '14px', color: C.textSecondary, fontFamily: interFont }}>{step.label}</div>
                </div>
                {i < 2 && (
                  <div style={{ color: C.textMuted, fontSize: '22px', lineHeight: 1 }}>→</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. FEATURES GRID ──────────────────────────────────── */}
        <section id="features" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: syneFont,
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 42px)',
              textAlign: 'center',
              marginBottom: '56px',
              color: C.textPrimary,
            }}>
              Everything you need
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}>
              {features.map((f) => (
                <div
                  key={f.title}
                  className="feature-card"
                  style={{
                    background: C.cardBg,
                    border: `1px solid ${C.cardBorder}`,
                    borderRadius: '12px',
                    padding: '28px',
                    transition: 'border-color 0.2s, transform 0.2s',
                    cursor: 'default',
                  }}
                >
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    background: 'rgba(83,74,183,0.15)',
                    borderRadius: '10px',
                    fontSize: '22px',
                    marginBottom: '16px',
                  }}>
                    {f.icon}
                  </div>
                  <h3 style={{
                    fontFamily: syneFont,
                    fontWeight: 700,
                    fontSize: '17px',
                    color: C.textPrimary,
                    marginBottom: '8px',
                  }}>
                    {f.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 300,
                    color: C.textSecondary,
                    lineHeight: 1.6,
                    fontFamily: interFont,
                  }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. HOW IT WORKS ───────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: '#0c0c0c' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: syneFont,
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 42px)',
              textAlign: 'center',
              marginBottom: '64px',
              color: C.textPrimary,
            }}>
              How it works
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '32px',
            }}>
              {steps.map((step) => (
                <div key={step.num} style={{ position: 'relative', padding: '8px 0' }}>
                  {/* Large faded number */}
                  <div style={{
                    fontFamily: syneFont,
                    fontWeight: 800,
                    fontSize: '96px',
                    lineHeight: 1,
                    color: 'rgba(83,74,183,0.15)',
                    marginBottom: '-24px',
                    userSelect: 'none',
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{
                    fontFamily: syneFont,
                    fontWeight: 700,
                    fontSize: '20px',
                    color: C.textPrimary,
                    marginBottom: '10px',
                    position: 'relative',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    fontWeight: 300,
                    color: C.textSecondary,
                    lineHeight: 1.6,
                    fontFamily: interFont,
                  }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. CTA BANNER ─────────────────────────────────────── */}
        <section style={{ padding: '80px 24px' }}>
          <div style={{
            maxWidth: '720px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #1a1a2e, #16162a)',
            border: '1px solid #2a2a4a',
            borderRadius: '20px',
            padding: '64px 40px',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontFamily: syneFont,
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 44px)',
              color: C.textPrimary,
              marginBottom: '16px',
            }}>
              Ready to go viral?
            </h2>
            <p style={{
              fontSize: '17px',
              fontWeight: 300,
              color: C.textSecondary,
              marginBottom: '36px',
              fontFamily: interFont,
            }}>
              Start creating for free. No credit card needed.
            </p>
            <Link
              href="/studio"
              className="btn-primary"
              style={{ ...btnPrimary, fontSize: '17px', padding: '16px 36px' }}
            >
              Open Studio →
            </Link>
          </div>
        </section>

        {/* ── 7. FOOTER ─────────────────────────────────────────── */}
        <footer style={{
          borderTop: `1px solid #111`,
          padding: '28px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          <span style={{ fontFamily: syneFont, fontWeight: 700, fontSize: '15px', color: C.accentLight }}>
            Sovereign Creator
          </span>
          <span style={{ fontSize: '13px', color: C.textMuted, fontFamily: interFont }}>
            Built with AI. Made for creators.
          </span>
        </footer>

      </div>
    </>
  )
}
