import { Badge } from '@/components/ui/badge'
import { Play, Loader } from 'lucide-react'
import Image from 'next/image'

interface PreviewProps {
  title: string
  tags: string[]
  description: string
  previewUrl: string | null
  manimFile: File | null
  videoFile: File | null
  references?: string[]
  isLoading: boolean // ロード状態を追加
  thumbnailUrl: string | null // サムネイルURLを追加
}

export default function Preview({
  title,
  tags,
  description,
  previewUrl,
  manimFile,
  videoFile,
  references = [],
  isLoading, // ロード状態を追加
  thumbnailUrl, // サムネイルURLを追加
}: PreviewProps) {
  return (
    <div className='space-y-8'>
      <h2 className='text-2xl font-semibold mb-4'>プレビュー</h2>
      <div className='aspect-video bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden'>
        {isLoading ? (
          <Loader className='animate-spin h-16 w-16 text-gray-600' />
        ) : previewUrl ? (
          <video src={previewUrl} controls className='w-full h-full'>
            お使いのブラウザは動画タグをサポートしていません。
          </video>
        ) : (
          <div className='text-center'>
            <Play className='mx-auto h-16 w-16 text-gray-600' />
            <p className='mt-4 text-gray-400'>プレビューはここに表示されます</p>
          </div>
        )}
      </div>
      <div>
        <h3 className='text-lg font-semibold mb-2'>サムネイル画像</h3>
      </div>
      {thumbnailUrl && (
        <div className='mt-4'>
          <Image
            src={thumbnailUrl}
            alt='サムネイル'
            layout='responsive'
            width={700}
            height={475}
            className='rounded-lg'
          />
        </div>
      )}
      {manimFile && <p className='text-sm text-gray-400'>Manimファイル: {manimFile.name}</p>}
      {videoFile && <p className='text-sm text-gray-400'>動画ファイル: {videoFile.name}</p>}
      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>タイトル</h3>
          <p className='text-gray-300 bg-gray-800 p-2 rounded'>{title || '（未入力）'}</p>
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-2'>タグ</h3>
          <div className='flex flex-wrap gap-2 bg-gray-800 p-2 rounded min-h-[40px]'>
            {tags.length > 0 ? (
              tags.map((tag) => (
                <Badge key={tag} variant='secondary' className='bg-gray-700 text-white'>
                  {tag}
                </Badge>
              ))
            ) : (
              <p className='text-sm text-gray-400'>タグ: なし</p>
            )}
          </div>
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-2'>動画説明</h3>
          <div className='bg-gray-800 p-2 rounded'>
            {description ? (
              <p className='text-gray-300 whitespace-pre-wrap'>{description}</p>
            ) : (
              <p className='text-sm text-gray-400'>（未入力）</p>
            )}
          </div>
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-2'>参考文献</h3>
          <div className='flex flex-wrap gap-2 bg-gray-800 p-2 rounded min-h-[40px]'>
            {references.length > 0 ? (
              references.map((ref, index) => (
                <Badge key={index} variant='secondary' className='bg-gray-700 text-white'>
                  {ref}
                </Badge>
              ))
            ) : (
              <p className='text-sm text-gray-400'>参考文献: なし</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
