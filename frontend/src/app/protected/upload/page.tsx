'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { uploadVideo, uploadThumbnail } from './actions'
import React from 'react'

const UploadForm = dynamic(() => import('@/components/UploadForm'), { ssr: false })
const Preview = dynamic(() => import('@/components/Preview'), { ssr: false })
const Article = dynamic(() => import('@/components/Article'), { ssr: false })

const Component: React.FC = () => {
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
      let videoUrl = null
      let thumbnailUrl = null

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

        const result = await uploadVideo(videoFormData)

        if (result.status !== 200) {
          throw new Error(result.error || '動画のアップロードに失敗しました')
        }

        console.log('アップロードされた動画のURL:', result.videoUrl)
      }

      if (formData.thumbnailFile) {
        const thumbnailFormData = new FormData()
        thumbnailFormData.append('file', formData.thumbnailFile)
        const thumbnailResult = await uploadThumbnail(thumbnailFormData)

        if (thumbnailResult.status !== 200) {
          throw new Error(thumbnailResult.error || 'サムネイルのアップロードに失敗しました')
        }

        thumbnailUrl = thumbnailResult.thumbnailUrl
        console.log('アップロードされたサムネイルのURL:', thumbnailUrl)
      }

      // ここで videoUrl と thumbnailUrl を使用して、データベースに保存するなどの処理を行う

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

export default Component
