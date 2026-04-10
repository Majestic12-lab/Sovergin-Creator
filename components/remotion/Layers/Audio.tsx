import { Audio } from 'remotion'

interface AudioLayerProps {
  audioUrl: string | null
}

export function AudioLayer({ audioUrl }: AudioLayerProps) {
  if (!audioUrl) return null
  return <Audio src={audioUrl} />
}

