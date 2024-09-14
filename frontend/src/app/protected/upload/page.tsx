'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const UploadForm = dynamic(() => import('@/components/UploadForm'), { ssr: false })
const Preview = dynamic(() => import('@/components/Preview'), { ssr: false })
const Article = dynamic(() => import('@/components/Article'), { ssr: false })

export default function Component() {
  const [formData, setFormData] = useState({
    title: '',
    manimCode: '',
    tags: [] as string[],
    videoFile: null as File | null,
    manimFile: null as File | null,
    thumbnailFile: null as File | null, // サムネイルファイルを追加
    description: '',
    algorithmExplanation: '',
    activeTab: 'code',
    references: [] as string[],
  })

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false) // ロード状態を追加
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null) // サムネイルURLの状態を追加

  const handleFormChange = (data: Partial<typeof formData>) => {
    setFormData((prevData) => {
      const newData = { ...prevData, ...data }
      if (newData.videoFile && newData.videoFile !== prevData.videoFile) {
        setPreviewUrl(URL.createObjectURL(newData.videoFile))
      }
      if (newData.thumbnailFile && newData.thumbnailFile !== prevData.thumbnailFile) {
        setThumbnailUrl(URL.createObjectURL(newData.thumbnailFile))
      }
      return newData
    })
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl)
      }
    }
  }, [previewUrl, thumbnailUrl])

  const handleFormSubmit = async (formData: {
    title: string
    tags: string[]
    manimFile: File | null
    thumbnailFile: File | null
    description: string
    algorithmExplanation: string
    references: string[]
  }) => {
    setFormData((prevData) => ({ ...prevData, ...formData }))
    setIsLoading(true)
    console.log('Form submitted:', formData)

    try {
      if (formData.manimFile) {
        const formDataToSend = new FormData()
        formDataToSend.append('file', formData.manimFile)
        const response = await fetch('http://localhost:10000/uploadcode/', {
          method: 'POST',
          body: formDataToSend,
        })
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setPreviewUrl(url)

        // 変換された動画ファイルをアップロード
        const videoFile = new File([blob], 'converted_video.mp4', { type: 'video/mp4' })
        const videoFormData = new FormData()
        videoFormData.append('file', videoFile)

        const uploadResponse = await fetch('/api/upload-video', {
          method: 'POST',
          body: videoFormData,
        })

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json()
          throw new Error(errorData.error || '動画のアップロードに失敗しました')
        }

        const { videoUrl } = await uploadResponse.json()
        console.log('アップロードされた動画のURL:', videoUrl)
      }
    } catch (error) {
      console.error('エラーが発生しました:', error)
      // エラーメッセージをユーザーに表示するなどの処理を追加
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-900 text-gray-200 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
        <UploadForm onSubmit={handleFormSubmit} onChange={handleFormChange} />
        <div className='space-y-4'>
          <Preview
            title={formData.title}
            tags={formData.tags}
            description={formData.description}
            previewUrl={previewUrl}
            manimFile={formData.manimFile}
            videoFile={formData.videoFile}
            references={formData.references} // 参考文献を追加
            isLoading={isLoading} // ロード状態を渡す
            thumbnailUrl={thumbnailUrl} // サムネイルURLを渡す
          />
          <h3 className='text-lg font-semibold mb-2'>アルゴリズム解説</h3>
          <div className='bg-gray-800 p-4 rounded-lg'>
            <Article algorithmData={formData.algorithmExplanation} />
          </div>
        </div>
      </div>
    </div>
  )
}
