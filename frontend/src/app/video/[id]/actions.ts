'use server'

import fs from 'fs/promises'

export async function getVideoData() {
  const jsonData = await fs.readFile('src/app/video/[id]/data.json', 'utf8')
  const data = JSON.parse(jsonData)

  return data
}

export async function incrementLikes(id: string) {
  // 実際のアプリケーションでは、ここでバックエンドAPIにリクエストを送信します
  // 例: const response = await fetch(`https://api.example.com/videos/${id}/like`, { method: 'POST' })
  // const result = await response.json()

  // この例では、単にサーバーアクションが呼び出されたことを示すメッセージを返します
  return { message: `Likes incremented for video ${id}` }
}
