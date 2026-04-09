import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params
  const audioPath = path.join('/tmp', `audio-${jobId}.mp3`)

  try {
    const file = fs.readFileSync(audioPath)
    return new NextResponse(file, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(file.length),
      },
    })
  } catch {
    return NextResponse.json({ error: 'Audio file not found' }, { status: 404 })
  }
}
