import OpenAI from 'openai'

export const VOICE_IDS = {
  nova:    'nova',
  onyx:    'onyx',
  echo:    'echo',
  shimmer: 'shimmer',
} as const

export type VoiceName = keyof typeof VOICE_IDS

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function generateVoice(text: string, voiceId: string): Promise<Buffer> {
  try {
    const response = await openai.audio.speech.create({
      model: 'tts-1',
      voice: (VOICE_IDS[voiceId as VoiceName] ?? 'nova') as 'nova' | 'onyx' | 'echo' | 'shimmer',
      input: text,
    })
    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
  } catch (err) {
    if (err instanceof Error) throw new Error(`generateVoice failed: ${err.message}`)
    throw new Error('generateVoice failed: unknown error')
  }
}
