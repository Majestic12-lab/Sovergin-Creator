import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import crypto from 'crypto'
import { generateScript } from '@/lib/openai'
import { generateVoice } from '@/lib/elevenlabs'
import { transcribeAudio } from '@/lib/whisper'
import { fetchBackgroundClip } from '@/lib/pexels'
import { WordWithTimestamp, VideoScript } from '@/types/video'

export async function POST(request: NextRequest) {
  console.log('ELEVEN KEY START:', process.env.ELEVENLABS_API_KEY?.substring(0, 10))
  console.log('TEST KEY START:', process.env.TEST_ELEVEN?.substring(0, 10))
  try {
    const body = await request.json() as { prompt?: string; voiceId?: string; theme?: string }
    const { prompt, voiceId = 'nova', theme = 'default' } = body

    // 1. Validate
    if (!prompt || prompt.trim() === '') {
      return NextResponse.json({ error: 'prompt is required' }, { status: 400 })
    }

    // 2. Generate jobId
    const jobId = crypto.randomUUID()

    // 3. Generate script
    const script: VideoScript = await generateScript(prompt)
    console.log('[1/4] Script generated:', script.tone)

    // 4. Generate voice
    const audioBuffer: Buffer = await generateVoice(script.fullScript, voiceId)
    console.log('[2/4] Voice generated, bytes:', audioBuffer.length)

    // 5. Write audio to temp file
    const audioPath = `/tmp/audio-${jobId}.mp3`
    fs.writeFileSync(audioPath, audioBuffer)

    // 6. Transcribe audio
    const words: WordWithTimestamp[] = await transcribeAudio(audioBuffer)
    console.log('[3/4] Transcribed words:', words.length)

    // 7. Fetch background clip
    const backgroundUrl: string = await fetchBackgroundClip(script.keywords)
    console.log('[4/4] Background clip found')

    // 8. Calculate duration
    const durationSeconds = words.length > 0 ? words[words.length - 1].end : 0

    // 9. Return result
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
