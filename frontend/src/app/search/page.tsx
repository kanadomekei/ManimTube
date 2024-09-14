'use client'
import { useRouter } from 'next/navigation'
import { VideoItem } from '@/components/SearchVideos'
import { useEffect, useState } from 'react'
import { getVideoData } from '@/app/search/actions'
import { SearchData } from '@/types/type'

export default function SearchResults() {
  const router = useRouter()
  // useState<VideoData[]>を使用して、正しい型を指定
  const [videoData, setVideoData] = useState<SearchData[]>([])

  useEffect(() => {
    async function fetchData() {
      const data = await getVideoData()
      setVideoData(data)
    }
    fetchData()
  }, [])

  return (
    <div className='min-h-screen bg-gray-900 text-gray-200'>
      <main className='container mx-auto px-4 py-8'>
        <section className='space-y-6'>
          {videoData.map((video) => (
            <VideoItem key={video.id} video={video} router={router} />
          ))}
        </section>
      </main>
    </div>
  )
}
