import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{
      height: '100%',
      overflowY: 'auto',
      background: '#080808',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <div style={{ position: 'relative', textAlign: 'center', padding: '40px 24px' }}>
        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(83,74,183,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* 404 */}
        <p style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(120px, 22vw, 200px)',
          lineHeight: 1,
          color: 'rgba(83,74,183,0.3)',
          letterSpacing: '-0.04em',
          userSelect: 'none',
          position: 'relative',
        }}>
          404
        </p>

        {/* Heading */}
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(24px, 4vw, 36px)',
          letterSpacing: '-0.02em',
          color: '#ccc',
          marginTop: '8px',
          position: 'relative',
        }}>
          Page not found
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: '16px',
          color: '#555',
          marginTop: '12px',
          position: 'relative',
        }}>
          Looks like this page doesn&apos;t exist.
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '36px',
          position: 'relative',
        }}>
          <Link href="/" style={{
            background: 'transparent',
            border: '1px solid #2a2a2a',
            color: '#888',
            borderRadius: '10px',
            padding: '12px 24px',
            fontSize: '15px',
            fontWeight: 500,
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
          }}>
            Go Home
          </Link>
          <Link href="/studio" style={{
            background: '#534AB7',
            border: 'none',
            color: '#fff',
            borderRadius: '10px',
            padding: '12px 24px',
            fontSize: '15px',
            fontWeight: 600,
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
          }}>
            Open Studio
          </Link>
        </div>
      </div>
    </main>
  )
}
