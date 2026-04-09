import { useCurrentFrame, useVideoConfig, AbsoluteFill, spring } from 'remotion'
import { WordWithTimestamp, CaptionStyle } from '@/types/video'
import { getPositionY, COMPOSITION_HEIGHT } from '@/components/remotion/utils/scaling'

interface CaptionsProps {
  words: WordWithTimestamp[]
  style: CaptionStyle
  onWordClick?: (index: number) => void
}

export function Captions({ words, style, onWordClick }: CaptionsProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const currentSecond = frame / fps

  // Find the active word at the current playhead position
  const activeWord = words.find(
    (w) => currentSecond >= w.start && currentSecond <= w.end
  )

  if (!activeWord) return null

  // Build the group of words to display around the active word
  const activeIdx = activeWord.index
  const half = Math.floor(style.wordsPerGroup / 2)
  const groupStart = Math.max(0, activeIdx - half)
  const groupEnd = Math.min(words.length, groupStart + style.wordsPerGroup)
  const wordsToShow = words.slice(groupStart, groupEnd)

  // Spring scale animation for the active word
  const wordStartFrame = Math.floor(activeWord.start * fps)
  const animationFrame = Math.max(0, frame - wordStartFrame)
  const scale = spring({
    frame: animationFrame,
    fps,
    config: { damping: 10, stiffness: 180, mass: 0.5 },
  })

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: getPositionY(style.position, COMPOSITION_HEIGHT),
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '0 60px',
          gap: '8px',
        }}
      >
        {wordsToShow.map((word) => {
          const isActive = word.index === activeWord.index
          return (
            <span
              key={word.index}
              onClick={() => onWordClick?.(word.index)}
              style={{
                fontFamily: style.fontFamily,
                fontSize: isActive
                  ? style.fontSize * scale
                  : style.fontSize * 0.85,
                fontWeight: style.fontWeight,
                color: isActive ? style.highlightColor : style.color,
                WebkitTextStroke: style.strokeColor
                  ? `${style.strokeWidth}px ${style.strokeColor}`
                  : 'none',
                opacity: isActive ? 1 : 0.6,
                cursor: onWordClick ? 'pointer' : 'default',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                lineHeight: 1.2,
                transition: 'opacity 0.1s',
                display: 'inline-block',
              }}
            >
              {word.word}
            </span>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}
