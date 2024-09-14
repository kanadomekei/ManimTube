'use server'

import { createClient } from '@/utils/supabase/server'
import { encodedRedirect } from '@/utils/utils'

export async function uploadFile(formData: FormData) {
  const supabase = createClient()

  const file = formData.get('file') as File
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!file || !user) {
    return encodedRedirect(
      'error',
      '/protected/test',
      'ファイルが選択されていないか、ログインしていません。'
    )
  }

  if (file.type !== 'image/jpeg') {
    return encodedRedirect('error', '/protected/test', 'JPEGファイルを選択してください。')
  }

  const fileExt = '.jpeg'
  const filePath = `${user.id}/${user.id}${fileExt}`

  const { error } = await supabase.storage.from('icons').upload(filePath, file, { upsert: true })

  if (error) {
    console.error('Error uploading file:', error)
    return encodedRedirect('error', '/protected/test', 'ファイルのアップロードに失敗しました。')
  }

  return encodedRedirect('success', '/protected/test', 'ファイルが正常にアップロードされました。')
}
