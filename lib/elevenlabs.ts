export const VOICE_IDS = {
  nova:    '21m00Tcm4TlvDq8ikWAM',
  onyx:    'AZnzlk1XvdvUeBnXmlld',
  echo:    'MF3mGyEYCl7XYWbV9V6O',
  shimmer: 'EXAVITQu4vr4xnSDxMaL',
} as const

export type VoiceName = keyof typeof VOICE_IDS

export async function generateVoice(text: string, voiceId: string): Promise<Buffer> {
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY ?? '',
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`ElevenLabs API returned status ${response.status}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
  } catch (err) {
    if (err instanceof Error) throw new Error(`generateVoice failed: ${err.message}`)
    throw new Error('generateVoice failed: unknown error')
  }
}
