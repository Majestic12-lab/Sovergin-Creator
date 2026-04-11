import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { generateScript } from '@/lib/openai'
import { generateVoice } from '@/lib/elevenlabs'
import { transcribeAudio } from '@/lib/whisper'
import { fetchBackgroundClip } from '@/lib/pexels'
import { uploadAudioToR2 } from '@/lib/r2'
import { WordWithTimestamp, VideoScript } from '@/types/video'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { prompt?: string; voiceId?: string; theme?: string }
    const { prompt, voiceId = 'nova', theme = 'default' } = body

    if (!prompt || prompt.trim() === '') {
      return NextResponse.json({ error: 'prompt is required' }, { status: 400 })
    }

    const jobId = crypto.randomUUID()
    const script: VideoScript = await generateScript(prompt)
    console.log('[1/4] Script generated:', script.tone)

    const audioBuffer: Buffer = await generateVoice(script.fullScript, voiceId)
    console.log('[2/4] Voice generated, bytes:', audioBuffer.length)

    await uploadAudioToR2(jobId, audioBuffer)
    console.log('[2.5/4] Audio uploaded to R2')

    const words: WordWithTimestamp[] = await transcribeAudio(audioBuffer)
    console.log('[3/4] Transcribed words:', words.length)

    const backgroundUrl: string = await fetchBackgroundClip(script.keywords)
    console.log('[4/4] Background clip found')

    const durationSeconds = words.length > 0 ? words[words.length - 1].end : 0

    return NextResponse.json({
      jobId,
      words,
      audioUrl: `/api/audio/${jobId}`,
      backgroundUrl,
      durationSeconds,
      script,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
