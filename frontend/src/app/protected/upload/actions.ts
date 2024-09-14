'use server'

import { uploadToSupabaseStorage } from '../../../utils/supabaseStorage'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function uploadVideo(formData: FormData) {
  const file = formData.get('file') as File

  if (!file) {
    return { error: 'ファイルが見つかりません', status: 400 }
  }

  const maxSize = 100 * 1024 * 1024 // 100MB
  if (file.size > maxSize) {
    return { error: 'ファイルサイズが大きすぎます', status: 400 }
  }

  const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo']
  if (!allowedTypes.includes(file.type)) {
    return { error: '不適切なファイル形式です', status: 400 }
  }

  try {
    const fileName = `${Date.now()}_${file.name}`
    const videoUrl = await uploadToSupabaseStorage(file, 'videos', fileName)
    return { videoUrl, status: 200 }
  } catch (error) {
    console.error('動画のアップロード中にエラーが発生しました:', error)
    return { error: '動画のアップロード中にエラーが発生しました', status: 500 }
  }
}

export async function uploadThumbnail(formData: FormData) {
  const file = formData.get('file') as File

  if (!file) {
    return { error: 'サムネイルファイルが見つかりません', status: 400 }
  }

  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return { error: 'サムネイルファイルサイズが大きすぎます', status: 400 }
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return { error: '不適切なサムネイルファイル形式です', status: 400 }
  }

  try {
    const fileName = `${Date.now()}_${file.name}`
    console.log('アップロード開始:', fileName)
    const thumbnailUrl = await uploadToSupabaseStorage(file, 'thumbnails', fileName)
    console.log('アップロード成功:', thumbnailUrl)
    return { thumbnailUrl, status: 200 }
  } catch (error) {
    console.error('サムネイルのアップロード中にエラーが発生しました:', error)
    return { error: 'サムネイルのアップロード中にエラーが発生しました', status: 500 }
  }
}

export async function createVideoRecord(data: {
  userId: bigint
  title: string
  description?: string
  videoUrl: string
  manimUrl?: string
  thumbnailUrl?: string
  articleUrl?: string
}) {
  try {
    const video = await prisma.video.create({
      data: {
        userId: data.userId,
        title: data.title,
        description: data.description,
        videoUrl: data.videoUrl,
        manimUrl: data.manimUrl,
        thumbnailUrl: data.thumbnailUrl,
        articleUrl: data.articleUrl,
        // 必要に応じて他のフィールドも追加
      },
    })
    return { video, status: 201 }
  } catch (error) {
    console.error('動画レコードの作成中にエラーが発生しました:', error)
    return { error: '動画の保存中にエラーが発生しました', status: 500 }
  }
}
