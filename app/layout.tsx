import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
