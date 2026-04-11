import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'Sovereign Creator',
  description: 'AI-powered short-form video generator',
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
