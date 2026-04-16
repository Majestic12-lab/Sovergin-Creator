import { NextRequest, NextResponse } from 'next/server'
import { getRenderProgress } from '@remotion/lambda/client'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ renderId: string }> }
) {
  try {
    const { renderId } = await params
    const bucketName = _request.nextUrl.searchParams.get('bucketName')
    const region = process.env.AWS_REGION
    const functionName = process.env.REMOTION_FUNCTION_NAME

    console.log('PROGRESS CHECK:', { renderId, bucketName, region, functionName: functionName?.slice(0, 20) })

    if (!bucketName) {
      return NextResponse.json({ error: 'bucketName query param is required' }, { status: 400 })
    }
    if (!region || !functionName) {
      return NextResponse.json(
        { error: 'Missing required env vars: AWS_REGION, REMOTION_FUNCTION_NAME' },
        { status: 500 }
      )
    }

    let progress: Awaited<ReturnType<typeof getRenderProgress>>
    try {
      progress = await getRenderProgress({
        renderId,
        bucketName,
        functionName,
        region: region as Parameters<typeof getRenderProgress>[0]['region'],
      })
    } catch (err) {
      console.error(JSON.stringify(err))
      const message = err instanceof Error ? err.message : 'getRenderProgress failed'
      return NextResponse.json({ error: message }, { status: 500 })
    }

    console.log('PROGRESS RESULT:', { done: progress.done, overallProgress: progress.overallProgress, fatalError: progress.fatalErrorEncountered })

    if (progress.fatalErrorEncountered) {
      const errMsg = progress.errors?.[0]?.message ?? 'Render failed'
      console.error('FATAL RENDER ERROR:', errMsg)
      return NextResponse.json(
        { status: 'error', progress: 0, outputUrl: null, error: errMsg },
        { status: 500 }
      )
    }

    const status = progress.done ? 'done' : 'rendering'
    const outputUrl = progress.outputFile ?? null

    return NextResponse.json({
      status,
      progress: progress.overallProgress,
      outputUrl,
    })
  } catch (err) {
    console.error('RENDER PROGRESS ERROR:', JSON.stringify(err, Object.getOwnPropertyNames(err)))
    const message = err instanceof Error ? err.message : 'Failed to get render progress'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
