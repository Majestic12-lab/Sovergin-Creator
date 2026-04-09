import fs from 'fs'
import OpenAI from 'openai'
import { WordWithTimestamp } from '@/types/video'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const TEMP_PATH = '/tmp/audio-whisper.mp3'

function sanitiseWord(word: string): string {
  return word
    .trim()
    .replace(/'/g, "\\'")
    .replace(/:/g, '\\:')
}

export async function transcribeAudio(audioBuffer: Buffer): Promise<WordWithTimestamp[]> {
  try {
    fs.writeFileSync(TEMP_PATH, audioBuffer)

    const transcription = await client.audio.transcriptions.create({
      file: fs.createReadStream(TEMP_PATH),
      model: 'whisper-1',
      response_format: 'verbose_json',
      timestamp_granularities: ['word'],
    })

    const raw = transcription.words ?? []

    const words: WordWithTimestamp[] = raw.map((w, i) => ({
      word: sanitiseWord(w.word),
      start: w.start,
      end: w.end,
      index: i,
    }))

    return words
  } catch (err) {
    if (err instanceof Error) throw new Error(`transcribeAudio failed: ${err.message}`)
    throw new Error('transcribeAudio failed: unknown error')
  } finally {
    try { fs.unlinkSync(TEMP_PATH) } catch { /* already gone */ }
  }
}
