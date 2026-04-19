import { NextResponse } from 'next/server'

interface CobaltResponse {
  status: string
  url?: string
  text?: string
}

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

  try {
    const res = await fetch('https://api.cobalt.tools/api/json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, vCodec: 'h264', vQuality: '720', isAudioMuted: false }),
    })

    const data = await res.json() as CobaltResponse

    if (!res.ok) {
      return NextResponse.json(
        { error: data.text ?? `Cobalt API error (${res.status})` },
        { status: res.status }
      )
    }

    if ((data.status === 'stream' || data.status === 'redirect') && data.url) {
      return NextResponse.json({ videoUrl: data.url })
    }

    return NextResponse.json(
      { error: data.text ?? `Unexpected response status: ${data.status}` },
      { status: 422 }
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to contact Cobalt API'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
