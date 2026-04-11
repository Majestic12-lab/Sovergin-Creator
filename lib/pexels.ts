const THEME_QUERIES: Record<string, string> = {
  'minecraft': 'minecraft parkour gameplay',
  'subway-surfers': 'subway surfers mobile gameplay',
  'reddit-dark': 'satisfying oddly satisfying video',
  'abstract': 'abstract colorful background motion',
  'nature': 'nature landscape cinematic',
  'default': 'satisfying background loop',
}

interface PexelsVideoFile {
  id: number
  quality: string
  link: string
  width: number
  height: number
}
interface PexelsVideo {
  id: number
  duration: number
  video_files: PexelsVideoFile[]
}
interface PexelsSearchResponse {
  videos: PexelsVideo[]
  total_results: number
}

async function searchPexels(query: string): Promise<PexelsVideo[]> {
  const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=5&orientation=portrait`
  const response = await fetch(url, {
    headers: { Authorization: process.env.PEXELS_API_KEY ?? '' },
  })
  if (!response.ok) throw new Error(`Pexels API returned status ${response.status}`)
  const data = (await response.json()) as PexelsSearchResponse
  return data.videos ?? []
}

function findSuitableClip(videos: PexelsVideo[]): string | null {
  for (const video of videos) {
    if (video.duration < 8 || video.duration > 60) continue
    const hdFile = video.video_files.find((f) => f.quality === 'hd' || f.quality === 'fhd')
    if (hdFile) return hdFile.link
  }
  return null
}

export async function fetchBackgroundClip(keywords: string[], theme = 'default'): Promise<string> {
  try {
    const themeQuery = THEME_QUERIES[theme] ?? THEME_QUERIES['default']
    let videos = await searchPexels(themeQuery)
    let clip = findSuitableClip(videos)
    if (!clip) {
      const fallback = keywords.slice(0, 3).join(' ')
      videos = await searchPexels(fallback)
      clip = findSuitableClip(videos)
    }
    if (!clip) throw new Error(`No suitable background clip found`)
    return clip
  } catch (err) {
    if (err instanceof Error) throw new Error(`fetchBackgroundClip failed: ${err.message}`)
    throw new Error('fetchBackgroundClip failed: unknown error')
  }
}
