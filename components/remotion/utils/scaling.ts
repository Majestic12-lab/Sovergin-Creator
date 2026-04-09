import { WordWithTimestamp } from '@/types/video'

export const COMPOSITION_WIDTH = 1080
export const COMPOSITION_HEIGHT = 1920
export const FPS = 30
export const COMPOSITION_ID = 'SovereignCreator'

export function secondsToFrames(seconds: number): number {
  return Math.floor(seconds * FPS)
}

export function framesToSeconds(frames: number): number {
  return frames / FPS
}

export function calcDurationFrames(words: WordWithTimestamp[]): number {
  if (words.length === 0) return 300
  return secondsToFrames(words[words.length - 1].end) + FPS
}

export function getPositionY(
  position: 'top' | 'middle' | 'bottom',
  compositionHeight: number
): number {
  if (position === 'top') return compositionHeight * 0.15
  if (position === 'middle') return compositionHeight * 0.5
  return compositionHeight * 0.80
}
