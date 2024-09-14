import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import Link from 'next/link'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

// ビデオの型定義
type Video = {
  id: number
  title: string
  views: string
  postedAgo: string
  channelName: string
  description: string
  thumbnail: string
  channelAvatar: string
  tags: string[]
}

// Video型定義をインポートまたは再定義
export const VideoItem = ({ video, router }: { video: Video; router: AppRouterInstance }) => {
  const handleTagClick = (e: React.MouseEvent<HTMLSpanElement>, tag: string) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/search?tag=${encodeURIComponent(tag)}`)
  }

  return (
    <Link
      href={`/video/${video.id}`}
      className='block bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-750 transition-colors duration-200'
    >
      <div className='flex'>
        <div className='flex-shrink-0 mr-6'>
          <Image
            src={video.thumbnail}
            alt={`${video.title}のサムネイル`}
            width={320}
            height={180}
            className='w-48 h-28 object-cover rounded-md'
          />
        </div>
        <div className='flex-1'>
          <h3 className='text-xl font-semibold mb-2 text-gray-100'>{video.title}</h3>
          <p className='text-sm text-gray-400 mb-3'>
            {video.views}回視聴 • {video.postedAgo}
          </p>
          <div className='flex items-center mb-3'>
            <Avatar className='h-8 w-8 mr-3'>
              <AvatarImage src={video.channelAvatar} alt={video.channelName} />
              <AvatarFallback>{video.channelName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className='text-sm text-gray-300'>{video.channelName}</span>
          </div>
          <p className='text-sm text-gray-400 line-clamp-2 mb-3'>{video.description}</p>
          <div className='flex flex-wrap gap-2'>
            {video.tags.map((tag, index) => (
              <span
                key={index}
                className='text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded cursor-pointer hover:bg-gray-600'
                onClick={(e) => handleTagClick(e, tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
