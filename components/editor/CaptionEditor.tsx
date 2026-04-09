'use client'

import { useEffect, useRef, useState } from 'react'
import { useVideoStore } from '@/store/useVideoStore'

interface CaptionEditorProps {
  wordIndex: number
  onClose: () => void
}

export function CaptionEditor({ wordIndex, onClose }: CaptionEditorProps) {
  const word = useVideoStore((s) => s.project.words[wordIndex])
  const updateWord = useVideoStore((s) => s.updateWord)
  const [inputValue, setInputValue] = useState(word?.word ?? '')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleConfirm() {
    if (inputValue.trim() && word && inputValue.trim() !== word.word) {
      updateWord(wordIndex, inputValue.trim())
    }
    onClose()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleConfirm()
    if (e.key === 'Escape') onClose()
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '120px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        background: '#1a1a1a',
        border: '1px solid #534AB7',
        borderRadius: '8px',
        padding: '12px 16px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        minWidth: '200px',
      }}
    >
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: '#FFFFFF',
          fontSize: '16px',
          flex: 1,
        }}
      />
      <button
        onClick={handleConfirm}
        style={{
          color: '#7F77DD',
          fontSize: '12px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        save
      </button>
      <button
        onClick={onClose}
        style={{
          color: '#888',
          fontSize: '12px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        cancel
      </button>
    </div>
  )
}
