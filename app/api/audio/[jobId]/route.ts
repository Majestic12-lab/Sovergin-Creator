import { NextRequest, NextResponse } from "next/server"
import { getAudioSignedUrl } from "@/lib/r2"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params
    const signedUrl = await getAudioSignedUrl(jobId)
    return NextResponse.redirect(signedUrl)
  } catch (err) {
    console.error("R2 audio fetch error:", err)
    return NextResponse.json({ error: "Audio not found" }, { status: 404 })
  }
}
