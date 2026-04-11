import Link from 'next/link'

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
      <p>Landing page coming soon</p>
      <Link href="/studio">Go to Studio</Link>
    </main>
  )
}
