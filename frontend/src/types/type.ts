export interface VideoData {
  videoData: {
    src: string
    title: string
    description: string
    creator: {
      name: string
      avatar: string
    }
    stats: {
      likes: string
      views: string
      uploadDate: string
      uploadTime: string
    }
    tags: string[]
  }
  sampleComments: {
    id: number
    user: {
      name: string
      avatar: string
    }
    content: string
    likes: number
    timestamp: string
  }[]
  references: string[]
  relatedVideos: {
    id: number
    title: string
    creator: string
    views: string
    age: string
    thumbnail: string
  }[]
}

export type SearchData = {
  id: number
  title: string
  views: string
  postedAgo: string
  channelName: string
  description: string
  thumbnail: string
  channelAvatar: string
  tags: string[]
}
