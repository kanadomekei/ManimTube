'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Edit2, MapPin, Globe, Github, X } from 'lucide-react'

// ... 残りのコードは変更なし ...
export default function Component() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('山田 太郎')
  const [username, setUsername] = useState('@yamada_taro')
  const [bio, setBio] = useState('Manimを使って数学の動画を作成しています。')
  const [location, setLocation] = useState('東京, 日本')
  const [website, setWebsite] = useState('https://example.com')
  const [twitterHandle, setTwitterHandle] = useState('@yamada_taro')
  const [githubHandle, setGithubHandle] = useState('yamada-taro')

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log('Saving profile:', {
      name,
      username,
      bio,
      location,
      website,
      twitterHandle,
      githubHandle,
    })
    setIsEditing(false)
  }

  return (
    <div className='min-h-screen bg-gray-900 text-gray-200 p-4 md:p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
          <div className='relative h-48 bg-gradient-to-r from-blue-500 to-purple-600'>
            <Avatar className='absolute bottom-0 left-4 transform translate-y-1/2 w-32 h-32 border-4 border-gray-800'>
              <AvatarImage src='/placeholder-avatar.jpg' alt={name} />
              <AvatarFallback>YT</AvatarFallback>
            </Avatar>
          </div>
          <div className='pt-20 px-4 pb-4'>
            <div className='flex justify-between items-start mb-4'>
              <div>
                {isEditing ? (
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='text-2xl font-bold bg-gray-700 border-gray-600'
                  />
                ) : (
                  <h1 className='text-2xl font-bold'>{name}</h1>
                )}
                {isEditing ? (
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='text-gray-400 bg-gray-700 border-gray-600 mt-1'
                  />
                ) : (
                  <p className='text-gray-400'>{username}</p>
                )}
              </div>
              {isEditing ? (
                <Button onClick={handleSave} className='bg-blue-600 hover:bg-blue-700'>
                  保存
                </Button>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className='bg-gray-700 hover:bg-gray-600'
                >
                  <Edit2 className='mr-2 h-4 w-4' /> 編集
                </Button>
              )}
            </div>
            <div className='space-y-4'>
              {isEditing ? (
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className='w-full bg-gray-700 border-gray-600'
                  placeholder='自己紹介を入力'
                />
              ) : (
                <p>{bio}</p>
              )}
              <div className='flex flex-wrap gap-4'>
                {isEditing ? (
                  <div className='flex items-center'>
                    <MapPin className='mr-2 h-4 w-4 text-gray-400' />
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className='bg-gray-700 border-gray-600'
                      placeholder='所在地'
                    />
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <MapPin className='mr-2 h-4 w-4 text-gray-400' />
                    <span>{location}</span>
                  </div>
                )}
                {isEditing ? (
                  <div className='flex items-center'>
                    <Globe className='mr-2 h-4 w-4 text-gray-400' />
                    <Input
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className='bg-gray-700 border-gray-600'
                      placeholder='ウェブサイト'
                    />
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <Globe className='mr-2 h-4 w-4 text-gray-400' />
                    <a
                      href={website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:underline'
                    >
                      {website}
                    </a>
                  </div>
                )}
                {isEditing ? (
                  <div className='flex items-center'>
                    <X className='mr-2 h-4 w-4 text-gray-400' />
                    <Input
                      value={twitterHandle}
                      onChange={(e) => setTwitterHandle(e.target.value)}
                      className='bg-gray-700 border-gray-600'
                      placeholder='Twitterハンドル'
                    />
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <X className='mr-2 h-4 w-4 text-gray-400' />
                    <a
                      href={`https://twitter.com/${twitterHandle.replace('@', '')}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:underline'
                    >
                      {twitterHandle}
                    </a>
                  </div>
                )}
                {isEditing ? (
                  <div className='flex items-center'>
                    <Github className='mr-2 h-4 w-4 text-gray-400' />
                    <Input
                      value={githubHandle}
                      onChange={(e) => setGithubHandle(e.target.value)}
                      className='bg-gray-700 border-gray-600'
                      placeholder='GitHubハンドル'
                    />
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <Github className='mr-2 h-4 w-4 text-gray-400' />
                    <a
                      href={`https://github.com/${githubHandle}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:underline'
                    >
                      {githubHandle}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='bg-gray-700 px-4 py-3 flex justify-center'>
            <div className='text-center'>
              <p className='text-2xl font-bold'>152</p>
              <p className='text-sm text-gray-400'>投稿</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
