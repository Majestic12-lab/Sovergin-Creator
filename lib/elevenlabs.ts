import OpenAI from 'openai'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const VOICE_IDS = {
  nova:    'nova',
  onyx:    'onyx',
  echo:    'echo',
  shimmer: 'shimmer',
} as const

export type VoiceName = keyof typeof VOICE_IDS

export async function generateVoice(text: string, voiceId: string): Promise<Buffer> {
  try {
    const voice = VOICE_IDS[voiceId as VoiceName] ?? 'nova'
    const response = await client.audio.speech.create({
      model: 'tts-1',
      voice,
      input: text,
    })

    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
  } catch (err) {
    if (err instanceof Error) throw new Error(`generateVoice failed: ${err.message}`)
    throw new Error('generateVoice failed: unknown error')
  }
}
