import { createClient } from '@/utils/supabase/server'

export async function uploadToSupabaseStorage(file: File, storageName: string, filePath: string) {
  const supabase = createClient()

  try {
    const buffer = Buffer.from(await file.arrayBuffer())

    const { error: uploadError } = await supabase.storage.from(storageName).upload(filePath, buffer)

    if (uploadError) {
      console.error('Supabaseアップロードエラー:', uploadError)
      throw new Error('ファイルのアップロードに失敗しました')
    }

    const { data: urlData } = supabase.storage.from(storageName).getPublicUrl(filePath)

    if (!urlData || !urlData.publicUrl) {
      console.error('公開URLの取得に失敗しました')
      throw new Error('公開URLの取得に失敗しました')
    }

    return urlData.publicUrl
  } catch (error) {
    console.error('ファイルのアップロード中にエラーが発生しました:', error)
    throw error
  }
}
