import { Composition } from 'remotion'
import { VideoComposition } from './Composition'
import type { ComponentType } from 'react'
import { DEFAULT_PROJECT } from '../../types/video'
import {
  COMPOSITION_ID,
  COMPOSITION_WIDTH,
  COMPOSITION_HEIGHT,
  FPS,
  calcDurationFrames,
} from './utils/scaling'

export function RemotionRoot() {
  return (
    <Composition
      id={COMPOSITION_ID}
      component={VideoComposition as unknown as ComponentType<Record<string, unknown>>}
      width={COMPOSITION_WIDTH}
      height={COMPOSITION_HEIGHT}
      fps={FPS}
      durationInFrames={calcDurationFrames(DEFAULT_PROJECT.words)}
      defaultProps={{
        words: DEFAULT_PROJECT.words,
        audioUrl: DEFAULT_PROJECT.audioUrl,
        backgroundUrl: DEFAULT_PROJECT.backgroundUrl,
        captionStyle: DEFAULT_PROJECT.captionStyle,
      }}
    />
  )
}
