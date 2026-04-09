import { AbsoluteFill } from 'remotion'
import { VideoProject } from '@/types/video'
import { Background } from '@/components/remotion/Layers/Background'
import { AudioLayer } from '@/components/remotion/Layers/Audio'
import { Captions } from '@/components/remotion/Layers/Captions'

interface VideoCompositionProps {
  project: VideoProject
  onWordClick?: (index: number) => void
}

export function VideoComposition({ project, onWordClick }: VideoCompositionProps) {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a' }}>
      {/* z=0 — background video */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Background backgroundUrl={project.backgroundUrl} />
      </div>

      {/* z=5 — audio track */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
        <AudioLayer audioUrl={project.audioUrl} />
      </div>

      {/* z=10 — caption overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        <Captions
          words={project.words}
          style={project.captionStyle}
          onWordClick={onWordClick}
        />
      </div>
    </AbsoluteFill>
  )
}
