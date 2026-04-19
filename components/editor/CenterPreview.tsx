'use client'

import { useRef } from 'react'
import { Player, PlayerRef } from '@remotion/player'
import { useVideoStore } from '@/store/useVideoStore'
import { VideoComposition } from '@/components/remotion/Composition'
import { CaptionEditor } from './CaptionEditor'
import {
  calcDurationFrames,
  COMPOSITION_WIDTH,
  COMPOSITION_HEIGHT,
  FPS,
} from '@/components/remotion/utils/scaling'

export function CenterPreview() {
  const playerRef = useRef<PlayerRef>(null)

  const project = useVideoStore((s) => s.project)
  const editingWordIndex = useVideoStore((s) => s.editingWordIndex)
  const setEditingWord = useVideoStore((s) => s.setEditingWord)

  const durationInFrames = calcDurationFrames(project.words)

  function handleWordClick(index: number) {
    playerRef.current?.pause()
    setEditingWord(index)
  }

  function handleEditorClose() {
    setEditingWord(null)
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '390px',
        height: '693px',
        margin: '0 auto',
      }}
    >
      {project.words.length === 0 ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            border: '2px dashed #2a2a2a',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            background: '#0d0d0d',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#1e1a3a',
              border: '2px solid #534AB7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#534AB7">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p style={{ fontSize: '15px', fontWeight: 600, color: '#ccc', margin: 0 }}>
            Generate your first video
          </p>
          <p style={{ fontSize: '12px', color: '#444', margin: 0, textAlign: 'center', lineHeight: 1.5 }}>
            Fill in a script on the left<br />and click Generate Video
          </p>
        </div>
      ) : (
        <Player
          ref={playerRef}
          component={VideoComposition}
          compositionWidth={COMPOSITION_WIDTH}
          compositionHeight={COMPOSITION_HEIGHT}
          durationInFrames={durationInFrames}
          fps={FPS}
          style={{
            width: '390px',
            height: '693px',
            borderRadius: '12px',
          }}
          inputProps={{
            words: project.words,
            audioUrl: project.audioUrl,
            backgroundUrl: project.backgroundUrl,
            captionStyle: project.captionStyle,
            onWordClick: handleWordClick,
          }}
          controls
          loop
        />
      )}

      {editingWordIndex !== null && (
        <CaptionEditor
          wordIndex={editingWordIndex}
          onClose={handleEditorClose}
        />
      )}
    </div>
  )
}
