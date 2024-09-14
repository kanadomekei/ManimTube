'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ThumbsUp, ChevronDown, ChevronUp } from 'lucide-react'
import RelatedVideos from '@/components/RelatedVideos'
import Article from '@/components/Article'
import { useState, useEffect } from 'react'
import Comments from '@/components/Comments'
import Link from 'next/link'
import { getVideoData, incrementLikes } from './actions'
import { useParams } from 'next/navigation'
import { VideoData } from '@/types/type'

function VideoTags({ tags }: { tags: string[] }) {
  return (
    <div className='flex flex-wrap gap-1 mb-4'>
      {tags.map((tag, index) => (
        <Link
          key={index}
          href={`/search?tag=${encodeURIComponent(tag)}`}
          className='text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded hover:bg-gray-600 transition-colors'
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}

export default function WatchPage() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [algorithmData, setAlgorithmData] = useState<string | null>(null)
  const [videoData, setVideoData] = useState<VideoData | null>(null)
  const { id } = useParams()

  useEffect(() => {
    async function fetchData() {
      const data = await getVideoData()
      setVideoData(data)
    }
    fetchData()

    async function fetchAlgorithmData() {
      try {
        const response = await fetch('/samplearticle.md')
        const text = await response.text()
        setAlgorithmData(text)
      } catch (error) {
        console.error('Error fetching algorithm data:', error)
      }
    }
    fetchAlgorithmData()
  }, [id])

  const toggleDescription = () => {
    setIsExpanded(!isExpanded)
  }

  const handleLikeClick = async () => {
    const result = await incrementLikes(id as string)
    console.log(result.message)
    // ここで likes の状態を更新するロジックを追加できます
  }

  if (!videoData) {
    return <div>読み込み中...</div>
  }

  return (
    <div className='min-h-screen bg-gray-900 text-gray-100'>
      <main className='container mx-auto p-4'>
        <div className='flex flex-col lg:flex-row gap-8 mb-5'>
          <div className='w-full lg:w-2/3 xl:w-3/4'>
            <div className='aspect-video mb-4'>
              <video className='w-full h-full' controls src={videoData.videoData.src}>
                お使いのブラウザは動画タグをサポートしていません。
              </video>
            </div>
            <h2 className='text-xl sm:text-2xl font-bold mb-2'>{videoData.videoData.title}</h2>
            <VideoTags tags={videoData.videoData.tags} />
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4'>
              <div className='flex items-center gap-2'>
                <Avatar>
                  <AvatarImage
                    src={videoData.videoData.creator.avatar}
                    alt={videoData.videoData.creator.name}
                  />
                  <AvatarFallback>{videoData.videoData.creator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className='font-semibold'>{videoData.videoData.creator.name}</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='text-sm text-gray-400'>
                  {videoData.videoData.stats.uploadDate} {videoData.videoData.stats.uploadTime}
                </span>
                <Button
                  variant='outline'
                  className='flex items-center gap-2 bg-gray-800 text-gray-300 hover:bg-gray-700'
                  onClick={handleLikeClick}
                >
                  <ThumbsUp className='h-4 w-4' />
                  {videoData.videoData.stats.likes}
                </Button>
              </div>
            </div>
            <div className='mb-4 bg-gray-800 p-4 rounded-lg'>
              <p className={`${isExpanded ? '' : 'line-clamp-2'}`}>
                {videoData.videoData.description}
              </p>
              <Button
                variant='ghost'
                className='mt-2 text-blue-400 hover:text-blue-300'
                onClick={toggleDescription}
              >
                {isExpanded ? (
                  <>
                    折りたたむ <ChevronUp className='ml-1 h-4 w-4' />
                  </>
                ) : (
                  <>
                    もっと見る <ChevronDown className='ml-1 h-4 w-4' />
                  </>
                )}
              </Button>
            </div>
            <Comments comments={videoData.sampleComments} />
          </div>
          <div className='w-full lg:w-1/3 xl:w-1/4'>
            {algorithmData && <Article algorithmData={algorithmData} />}
            <References references={videoData.references} />
          </div>
        </div>
        <RelatedVideos videos={videoData.relatedVideos} />
      </main>
    </div>
  )
}

function References({ references }: { references: string[] }) {
  return (
    <div className='mt-8 bg-gray-800 p-4 rounded-lg'>
      <h3 className='text-lg sm:text-xl font-semibold mb-4'>参考文献</h3>
      <ul className='space-y-2'>
        {references.map((ref, index) => (
          <li key={index}>
            <a
              href={ref}
              className='text-blue-400 hover:text-blue-300 break-all text-sm sm:text-base'
            >
              {ref}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
