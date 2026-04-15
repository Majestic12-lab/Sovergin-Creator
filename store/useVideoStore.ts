import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  VideoProject,
  CaptionStyle,
  WordWithTimestamp,
  JobStatus,
  DEFAULT_PROJECT,
} from '@/types/video'

interface VideoStore {
  project: VideoProject
  jobId: string | null
  jobStatus: JobStatus
  currentFrame: number
  editingWordIndex: number | null
  editHistory: WordWithTimestamp[][]
  setScript(script: string): void
  setVoiceId(voiceId: string): void
  setBackgroundTheme(theme: string): void
  setCustomBackgroundUrl(url: string): void
  setCaptionStyle(partial: Partial<CaptionStyle>): void
  setCurrentFrame(frame: number): void
  setEditingWord(index: number | null): void
  updateWord(index: number, newText: string): void
  undoLastEdit(): void
  setGenerationResult(result: {
    jobId: string
    words: WordWithTimestamp[]
    audioUrl: string
    r2AudioUrl: string
    backgroundUrl: string
    durationSeconds: number
  }): void
  setJobStatus(status: JobStatus): void
  resetProject(): void
}

export const useVideoStore = create<VideoStore>()(
  persist(
    (set, get) => ({
      project: DEFAULT_PROJECT,
      jobId: null,
      jobStatus: 'idle',
      currentFrame: 0,
      editingWordIndex: null,
      editHistory: [],
      setScript(script) {
        set((state) => ({ project: { ...state.project, script } }))
      },
      setVoiceId(voiceId) {
        set((state) => ({ project: { ...state.project, voiceId } }))
      },
      setBackgroundTheme(theme) {
        set((state) => ({ project: { ...state.project, backgroundTheme: theme } }))
      },
      setCustomBackgroundUrl(url) {
        set((state) => ({ project: { ...state.project, customBackgroundUrl: url } }))
      },
      setCaptionStyle(partial) {
        set((state) => ({
          project: {
            ...state.project,
            captionStyle: { ...state.project.captionStyle, ...partial },
          },
        }))
      },
      setCurrentFrame(frame) {
        set({ currentFrame: frame })
      },
      setEditingWord(index) {
        set({ editingWordIndex: index })
      },
      updateWord(index, newText) {
        const { project, editHistory } = get()
        const snapshot = [...project.words]
        const trimmedHistory = editHistory.length >= 50
          ? editHistory.slice(editHistory.length - 49)
          : editHistory
        const updatedWords = project.words.map((w, i) =>
          i === index ? { ...w, word: newText } : w
        )
        set({
          editHistory: [...trimmedHistory, snapshot],
          project: { ...project, words: updatedWords },
        })
      },
      undoLastEdit() {
        const { editHistory, project } = get()
        if (editHistory.length === 0) return
        const previous = editHistory[editHistory.length - 1]
        set({
          editHistory: editHistory.slice(0, -1),
          project: { ...project, words: previous },
        })
      },
      setGenerationResult({ jobId, words, audioUrl, r2AudioUrl, backgroundUrl, durationSeconds }) {
        set((state) => ({
          jobId,
          jobStatus: 'complete',
          project: {
            ...state.project,
            words,
            audioUrl,
            r2AudioUrl,
            backgroundUrl,
            durationSeconds,
          },
        }))
      },
      setJobStatus(status) {
        set({ jobStatus: status })
      },
      resetProject() {
        set({
          project: DEFAULT_PROJECT,
          editHistory: [],
          jobStatus: 'idle',
          currentFrame: 0,
        })
      },
    }),
    {
      name: 'sovereign-creator-project',
      version: 2,
      migrate(state: any) {
        if (!state.project.customBackgroundUrl) {
          state.project.customBackgroundUrl = ''
        }
        return state
      },
      partialize: (state) => ({ project: state.project }),
    }
  )
)
