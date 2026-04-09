import { AbsoluteFill } from 'remotion'
import { WordWithTimestamp, CaptionStyle } from '@/types/video'
import { Background } from '@/components/remotion/Layers/Background'
import { AudioLayer } from '@/components/remotion/Layers/Audio'
import { Captions } from '@/components/remotion/Layers/Captions'

export interface VideoCompositionProps {
  words: WordWithTimestamp[]
  audioUrl: string | null
  backgroundUrl: string | null
  captionStyle: CaptionStyle
  onWordClick?: (index: number) => void
}

export function VideoComposition({
  words,
  audioUrl,
  backgroundUrl,
  captionStyle,
  onWordClick,
}: VideoCompositionProps) {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Background backgroundUrl={backgroundUrl} />
      </div>

      <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
        <AudioLayer audioUrl={audioUrl} />
      </div>

      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        <Captions
          words={words}
          style={captionStyle}
          onWordClick={onWordClick}
        />
      </div>
    </AbsoluteFill>
  )
}
