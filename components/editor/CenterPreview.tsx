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
            gap: '12px',
            color: '#888',
          }}
        >
          <p style={{ fontSize: '14px' }}>Your preview will appear here</p>
          <p style={{ fontSize: '12px', color: '#555' }}>
            Fill in the script and click Generate Video
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
