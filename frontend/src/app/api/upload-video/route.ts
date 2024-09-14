import { NextRequest, NextResponse } from 'next/server'
import { uploadToSupabaseStorage } from '../../../utils/supabaseStorage'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'ファイルが見つかりません' }, { status: 400 })
  }

  const maxSize = 100 * 1024 * 1024 // 100MB
  if (file.size > maxSize) {
    return NextResponse.json({ error: 'ファイルサイズが大きすぎます' }, { status: 400 })
  }

  const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: '不適切なファイル形式です' }, { status: 400 })
  }

  try {
    const fileName = `${Date.now()}_${file.name}`
    const videoUrl = await uploadToSupabaseStorage(file, 'videos', fileName)
    return NextResponse.json({ videoUrl })
  } catch (error) {
    console.error('動画のアップロード中にエラーが発生しました:', error)
    return NextResponse.json(
      { error: '動画のアップロード中にエラーが発生しました' },
      { status: 500 }
    )
  }
}
