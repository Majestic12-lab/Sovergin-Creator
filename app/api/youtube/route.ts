import { NextResponse } from 'next/server'
import ytdl from 'ytdl-core'

export async function POST(request: Request) {
  let url: string
  try {
    const body = await request.json() as { url?: string }
    url = (body.url ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  if (!ytdl.validateURL(url)) {
    return NextResponse.json({ error: 'Not a valid YouTube URL' }, { status: 400 })
  }

  try {
    const info = await ytdl.getInfo(url)

    // Prefer an mp4 format with both video and audio, highest quality ≤ 720p
    const format =
      ytdl.chooseFormat(info.formats, { quality: 'highestvideo', filter: (f) => f.container === 'mp4' && !!f.url }) ??
      ytdl.chooseFormat(info.formats, { quality: 'highest', filter: 'videoandaudio' })

    if (!format?.url) {
      return NextResponse.json({ error: 'No streamable mp4 format found for this video' }, { status: 422 })
    }

    return NextResponse.json({ videoUrl: format.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch video info'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
