import OpenAI from 'openai'
import { VideoScript } from '@/types/video'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT = `You are a viral short-form video scriptwriter.
Return ONLY valid JSON matching this exact schema:
{
  hook: string,       // opening line, max 15 words, grabs attention instantly
  body: string,       // main content, under 200 words
  cta: string,        // call to action, max 10 words
  fullScript: string, // hook + ' ' + body + ' ' + cta joined
  keywords: string[], // 3-5 single words for stock footage search
  tone: 'scary' | 'funny' | 'educational' | 'motivational' | 'dramatic'
}
Scripts must be readable in under 60 seconds.`

const REQUIRED_FIELDS: (keyof VideoScript)[] = [
  'hook',
  'body',
  'cta',
  'fullScript',
  'keywords',
  'tone',
]

export async function generateScript(prompt: string): Promise<VideoScript> {
  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
    })

    const raw = completion.choices[0]?.message?.content
    if (!raw) throw new Error('OpenAI returned an empty response')

    const parsed = JSON.parse(raw) as Partial<VideoScript>

    for (const field of REQUIRED_FIELDS) {
      if (parsed[field] === undefined || parsed[field] === null) {
        throw new Error(`generateScript: missing required field "${field}" in OpenAI response`)
      }
    }

    return parsed as VideoScript
  } catch (err) {
    if (err instanceof Error) throw new Error(`generateScript failed: ${err.message}`)
    throw new Error('generateScript failed: unknown error')
  }
}
