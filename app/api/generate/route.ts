import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { generateScript } from '@/lib/openai'
import { generateVoice } from '@/lib/elevenlabs'
import { transcribeAudio } from '@/lib/whisper'
import { fetchBackgroundClip } from '@/lib/pexels'
import { uploadAudioToR2 } from '@/lib/r2'
import { prisma } from '@/lib/db'
import { auth, currentUser } from '@clerk/nextjs/server'
import { WordWithTimestamp, VideoScript } from '@/types/video'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    const body = await request.json() as { prompt?: string; voiceId?: string; theme?: string; customBackgroundUrl?: string }
    const { prompt, voiceId = 'nova', theme = 'default', customBackgroundUrl = '' } = body
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
    const backgroundUrl: string = customBackgroundUrl.trim()
      ? customBackgroundUrl.trim()
      : await fetchBackgroundClip(script.keywords, theme)
    console.log('[4/4] Background ready')
    const durationSeconds = words.length > 0 ? words[words.length - 1].end : 0
    if (userId) {
      try {
        const clerkUser = await currentUser()
        const email = clerkUser?.emailAddresses[0]?.emailAddress ?? ''
        const dbUser = await prisma.user.upsert({
          where: { clerkId: userId },
          update: {},
          create: { clerkId: userId, email },
        })
        await prisma.videoProject.create({
          data: {
            userId: dbUser.id,
            script: prompt,
            voiceId,
            backgroundTheme: theme,
            backgroundUrl,
            audioUrl: `/api/audio/${jobId}`,
            words: words as any,
            durationSeconds,
            captionStyle: {},
          },
        })
      } catch (dbErr) {
        console.error('DB save failed (non-fatal):', dbErr)
      }
    }
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
