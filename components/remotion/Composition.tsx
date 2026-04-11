import { AbsoluteFill } from 'remotion'
import { WordWithTimestamp, CaptionStyle } from '../../types/video'
import { Background } from './Layers/Background'
import { AudioLayer } from './Layers/Audio'
import { Captions } from './Layers/Captions'

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
