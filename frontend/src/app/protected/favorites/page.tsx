'use client'
import { Heart } from 'lucide-react'
import VideoCard from '@/components/VideoCard'
import { getVideoData } from './actions'
import { useEffect, useState } from 'react'
import { FavoriteVideo } from '@/types/type'

export default function Component() {
  const [featuredVideos, setFeaturedVideos] = useState<FavoriteVideo[]>([])

  useEffect(() => {
    async function fetchData() {
      const data = await getVideoData()
      setFeaturedVideos(data)
    }
    fetchData()
  }, [])

  return (
    <div className='min-h-screen bg-gray-900 text-gray-200 flex'>
      {/* Main content */}
      <div className='flex-1 flex flex-col'>
        {/* Main content */}
        <main className='flex-1 overflow-y-auto p-6'>
          <h2 className='text-3xl font-bold mb-6 flex items-center'>
            <Heart className='mr-2 text-red-500' /> お気に入り動画
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {featuredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
