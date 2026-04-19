import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'Sovereign Creator — AI Short-Form Video Generator',
  description: 'Turn any idea into a viral short-form video in seconds. AI-generated scripts, voiceovers, captions and backgrounds.',
  keywords: 'AI video generator, short form video, TikTok video maker, AI captions, viral video',
  alternates: {
    canonical: 'https://sovergin-creator.vercel.app',
  },
  openGraph: {
    title: 'Sovereign Creator',
    description: 'Create viral short-form videos with AI in seconds',
    url: 'https://sovergin-creator.vercel.app',
    siteName: 'Sovereign Creator',
    type: 'website',
    images: [
      {
        url: 'https://sovergin-creator.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sovereign Creator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sovereign Creator — AI Short-Form Video Generator',
    description: 'Create viral short-form videos with AI in seconds',
    images: ['https://sovergin-creator.vercel.app/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorBackground: '#0f0f0f',
          colorPrimary: '#534AB7',
          colorText: '#ffffff',
        }
      }}
    >
      <html lang="en" style={{ background: '#0f0f0f', height: '100%' }}>
        <body style={{ background: '#0f0f0f', margin: 0, padding: 0, height: '100%' }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
