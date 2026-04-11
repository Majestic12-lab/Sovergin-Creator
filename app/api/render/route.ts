import { NextRequest, NextResponse } from 'next/server'
import { renderMediaOnLambda } from '@remotion/lambda/client'
import { COMPOSITION_ID, FPS, secondsToFrames } from '@/components/remotion/utils/scaling'
import { WordWithTimestamp } from '@/types/video'

interface RenderRequestBody {
  jobId: string
  words: WordWithTimestamp[]
  audioUrl: string
  backgroundUrl: string
  captionStyle: Record<string, unknown>
  durationSeconds: number
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as RenderRequestBody
    const { words, audioUrl, backgroundUrl, captionStyle, durationSeconds } = body

    const serveUrl = process.env.REMOTION_SERVE_URL
    const functionName = process.env.REMOTION_FUNCTION_NAME
    const region = process.env.AWS_REGION

    if (!serveUrl || !functionName || !region) {
      return NextResponse.json(
        { error: 'Missing required env vars: REMOTION_SERVE_URL, REMOTION_FUNCTION_NAME, AWS_REGION' },
        { status: 500 }
      )
    }

    const durationInFrames = secondsToFrames(durationSeconds) + FPS

    const { renderId, bucketName } = await renderMediaOnLambda({
      region: region as Parameters<typeof renderMediaOnLambda>[0]['region'],
      functionName,
      serveUrl,
      composition: COMPOSITION_ID,
      inputProps: { words, audioUrl, backgroundUrl, captionStyle },
      codec: 'h264',
      imageFormat: 'jpeg',
      forceDurationInFrames: durationInFrames,
      outName: `${Date.now()}.mp4`,
      privacy: 'public',
    })

    return NextResponse.json({ renderId, bucketName })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Render failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
