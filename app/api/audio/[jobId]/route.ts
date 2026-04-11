import { NextRequest, NextResponse } from 'next/server'
import { getAudioSignedUrl } from '@/lib/r2'

export async function GET(
  _req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const signedUrl = await getAudioSignedUrl(params.jobId)
    return NextResponse.redirect(signedUrl)
  } catch (err) {
    console.error('R2 audio fetch error:', err)
    return NextResponse.json({ error: 'Audio not found' }, { status: 404 })
  }
}
