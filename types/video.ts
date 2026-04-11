export interface WordWithTimestamp {
  word: string
  start: number
  end: number
  index: number
}
export interface CaptionStyle {
  preset: 'classic' | 'fire' | 'neon' | 'minimal' | 'bold-drop' | 'typewriter'
  fontFamily: string
  fontSize: number
  fontWeight: 400 | 700 | 900
  color: string
  strokeColor: string | null
  strokeWidth: number
  animation: 'none' | 'pop' | 'bounce' | 'shake' | 'zoom'
  highlightColor: string
  position: 'top' | 'middle' | 'bottom'
  wordsPerGroup: 1 | 2 | 3
}
export interface VideoScript {
  hook: string
  body: string
  cta: string
  fullScript: string
  keywords: string[]
  tone: 'scary' | 'funny' | 'educational' | 'motivational' | 'dramatic'
}
export interface VideoProject {
  id: string
  script: string
  voiceId: string
  backgroundTheme: string
  customBackgroundUrl: string
  words: WordWithTimestamp[]
  audioUrl: string | null
  backgroundUrl: string | null
  durationSeconds: number
  captionStyle: CaptionStyle
}
export type JobStatus =
  | 'idle'
  | 'generating-script'
  | 'generating-voice'
  | 'fetching-clips'
  | 'transcribing'
  | 'complete'
  | 'error'
export const DEFAULT_CAPTION_STYLE: CaptionStyle = {
  preset: 'classic',
  fontFamily: 'Inter',
  fontSize: 48,
  fontWeight: 700,
  color: '#FFFFFF',
  strokeColor: '#000000',
  strokeWidth: 3,
  animation: 'bounce',
  highlightColor: '#FFDD00',
  position: 'bottom',
  wordsPerGroup: 1,
}
export const DEFAULT_PROJECT: VideoProject = {
  id: '',
  script: '',
  voiceId: 'nova',
  backgroundTheme: 'minecraft',
  customBackgroundUrl: '',
  words: [],
  audioUrl: null,
  backgroundUrl: null,
  durationSeconds: 0,
  captionStyle: DEFAULT_CAPTION_STYLE,
}
