import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = createClient()
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
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${Date.now()}_${file.name}`

    const { error: uploadError } = await supabase.storage.from('videos').upload(fileName, buffer)
    if (uploadError) {
      console.error('Supabaseアップロードエラー:', uploadError)
      return NextResponse.json({ error: 'ファイルのアップロードに失敗しました' }, { status: 500 })
    }

    const { data: urlData } = supabase.storage.from('videos').getPublicUrl(fileName)
    if (!urlData || !urlData.publicUrl) {
      console.error('公開URLの取得に失敗しました')
      return NextResponse.json({ error: '公開URLの取得に失敗しました' }, { status: 500 })
    }

    return NextResponse.json({ videoUrl: urlData.publicUrl })
  } catch (error) {
    console.error('動画のアップロード中にエラーが発生しました:', error)
    return NextResponse.json(
      { error: '動画のアップロード中にエラーが発生しました' },
      { status: 500 }
    )
  }
}
