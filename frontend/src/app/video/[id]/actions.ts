import videoData from './data.json'

export async function getVideoData() {
  return videoData
}

export async function incrementLikes(id: string) {
  // 実際のアプリケーションでは、ここでバックエンドAPIにリクエストを送信します
  // 例: const response = await fetch(`https://api.example.com/videos/${id}/like`, { method: 'POST' })
  // const result = await response.json()

  // この例では、単にサーバーアクションが呼び出されたことを示すメッセージを返します
  return { message: `Likes incremented for video ${id}` }
}
