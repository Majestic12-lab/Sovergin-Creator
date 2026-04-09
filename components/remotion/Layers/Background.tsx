import { AbsoluteFill, Video } from 'remotion'

interface BackgroundProps {
  backgroundUrl: string | null
}

export function Background({ backgroundUrl }: BackgroundProps) {
  if (!backgroundUrl) {
    return <AbsoluteFill style={{ backgroundColor: '#0a0a0a' }} />
  }

  return (
    <AbsoluteFill>
      <Video
        src={backgroundUrl}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        muted
        loop
      />
    </AbsoluteFill>
  )
}
