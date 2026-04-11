import { Audio } from "remotion"

interface AudioLayerProps {
  audioUrl: string | null
}

export function AudioLayer({ audioUrl }: AudioLayerProps) {
  return <Audio src={audioUrl as string} />
}
