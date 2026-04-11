import { useCurrentFrame, useVideoConfig, AbsoluteFill, spring, interpolate } from 'remotion'
import { WordWithTimestamp, CaptionStyle } from '../../../types/video'
import { getPositionY, COMPOSITION_HEIGHT } from '../utils/scaling'

interface CaptionsProps {
  words: WordWithTimestamp[]
  style: CaptionStyle
  onWordClick?: (index: number) => void
}

export function Captions({ words, style, onWordClick }: CaptionsProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const currentSecond = frame / fps

  const activeWord = words.find((w) => currentSecond >= w.start && currentSecond <= w.end)
  if (!activeWord) return null

  const activeIdx = activeWord.index
  const half = Math.floor(style.wordsPerGroup / 2)
  const groupStart = Math.max(0, activeIdx - half)
  const groupEnd = Math.min(words.length, groupStart + style.wordsPerGroup)
  const wordsToShow = words.slice(groupStart, groupEnd)

  const wordStartFrame = Math.floor(activeWord.start * fps)
  const animationFrame = Math.max(0, frame - wordStartFrame)

  function getAnimationStyle(): React.CSSProperties {
    const anim = style.animation ?? 'pop'
    if (anim === 'none') return {}

    if (anim === 'pop') {
      const scale = spring({ frame: animationFrame, fps, config: { damping: 10, stiffness: 180, mass: 0.5 } })
      return { transform: `scale(${scale})` }
    }

    if (anim === 'zoom') {
      const scale = spring({ frame: animationFrame, fps, config: { damping: 8, stiffness: 120, mass: 0.8 } })
      return { transform: `scale(${scale})` }
    }

    if (anim === 'bounce') {
      const progress = interpolate(animationFrame, [0, fps * 0.15, fps * 0.3], [0, -12, 0], { extrapolateRight: 'clamp' })
      return { transform: `translateY(${progress}px)` }
    }

    if (anim === 'shake') {
      const progress = interpolate(animationFrame % 8, [0, 2, 4, 6, 8], [-4, 4, -4, 4, 0], { extrapolateRight: 'clamp' })
      return { transform: `translateX(${progress}px)` }
    }

    return {}
  }

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
                fontSize: isActive ? style.fontSize : style.fontSize * 0.85,
                fontWeight: style.fontWeight,
                color: isActive ? style.highlightColor : style.color,
                WebkitTextStroke: style.strokeColor ? `${style.strokeWidth}px ${style.strokeColor}` : 'none',
                opacity: isActive ? 1 : 0.6,
                cursor: onWordClick ? 'pointer' : 'default',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                lineHeight: 1.2,
                display: 'inline-block',
                ...(isActive ? getAnimationStyle() : {}),
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
