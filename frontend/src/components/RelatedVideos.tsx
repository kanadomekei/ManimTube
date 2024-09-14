import Image from 'next/image'
import Link from 'next/link'

type RelatedVideo = {
  id: number
  title: string
  creator: string
  views: string
  age: string
  thumbnail: string
}

type RelatedVideosProps = {
  videos: RelatedVideo[]
}

export default function RelatedVideos({ videos }: RelatedVideosProps) {
  return (
    <div>
      <h3 className='text-lg font-bold mb-4'>関連動画</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {videos.map((video) => (
          <Link href={`/video/${video.id}`} key={video.id}>
            <div className='flex flex-col cursor-pointer'>
              <div className='w-full aspect-video relative mb-2'>
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  layout='fill'
                  objectFit='cover'
                  className='rounded scale-85'
                />
              </div>
              <div>
                <h4 className='text-sm font-semibold line-clamp-2'>{video.title}</h4>
                <p className='text-xs text-gray-400'>{video.creator}</p>
                <p className='text-xs text-gray-400'>
                  {video.views} 視聴 • {video.age}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
