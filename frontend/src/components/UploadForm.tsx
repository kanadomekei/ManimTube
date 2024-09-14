import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Upload, File, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface UploadFormProps {
  onSubmit: (formData: {
    title: string
    tags: string[]
    manimFile: File | null
    thumbnailFile: File | null
    description: string
    algorithmExplanation: string
    references: string[]
  }) => void
  onChange: (
    formData: Partial<{
      title: string
      manimCode: string
      thumbnailFile: File | null
      tags: string[]
      manimFile: File | null
      description: string
      algorithmExplanation: string
      references: string[]
    }>
  ) => void
}

export default function UploadForm({ onSubmit, onChange }: UploadFormProps) {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [manimFile, setManimFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const [algorithmExplanation, setAlgorithmExplanation] = useState('')
  const [references, setReferences] = useState<string[]>([])
  const [newReference, setNewReference] = useState('')

  const handleChange = (field: string, value: string | File | string[] | null) => {
    if (field === 'tags') {
      // tagsの場は、現在の列を更新する
      onChange({ tags: [...tags, value as string] })
    } else {
      onChange({ [field]: value })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      tags,
      manimFile,
      thumbnailFile,
      description,
      algorithmExplanation,
      references,
    })
  }
  const handleManimFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setManimFile(file)
    }
  }

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      handleChange('thumbnailFile', file) // サムネイルファイルの変更を通知
    }
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault()
      const newTags = [...tags, currentTag.trim()]
      setTags(newTags)
      setCurrentTag('')
      onChange({ tags: newTags }) // 親コンポーネントに新しいタグ配列を通知
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(newTags)
    onChange({ tags: newTags }) // 親コンポーネントに更新されたタグ配列を通知
  }

  const handleAddReference = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newReference.trim() !== '') {
      e.preventDefault()
      const updatedReferences = [...references, newReference.trim()]
      setReferences(updatedReferences)
      setNewReference('')
      handleChange('references', updatedReferences)
    }
  }

  const handleRemoveReference = (index: number) => {
    const updatedReferences = references.filter((_, i) => i !== index)
    setReferences(updatedReferences)
    handleChange('references', updatedReferences)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Manimファイル</h3>
        <Input
          id='manim-file'
          type='file'
          accept='.py'
          onChange={handleManimFileChange}
          className='w-full bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 hover:file:bg-gray-600'
        />
      </div>
      <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white'>
        <Upload className='mr-2 h-4 w-4' /> 動画に変換する
      </Button>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>サムネイルファイル</h3>
        <Input
          id='thumbnail-file'
          type='file'
          accept='.png, .jpg, .jpeg'
          onChange={handleThumbnailFileChange}
          className='w-full bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 hover:file:bg-gray-600'
        />
      </div>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>タイトル</h3>
        <Input
          id='title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            handleChange('title', e.target.value)
          }}
          className='w-full bg-gray-800 border-gray-700 text-white'
          placeholder='タイトルを入力しください'
        />
      </div>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>タグ</h3>
        <div className='flex flex-wrap gap-2 mb-2 bg-gray-800 p-2 rounded min-h-[40px]'>
          {tags.map((tag) => (
            <Badge key={tag} variant='secondary' className='bg-gray-700 text-white'>
              {tag}
              <button
                type='button' // フォームの送信を防ぐ
                onClick={() => handleRemoveTag(tag)}
                className='ml-1 text-gray-400 hover:text-white'
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
        <Input
          id='tags'
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleAddTag}
          className='w-full bg-gray-800 border-gray-700 text-white'
          placeholder='タグを入力してEnterを押す'
        />
      </div>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>動画説明</h3>
        <Textarea
          id='description'
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
            handleChange('description', e.target.value)
          }}
          className='w-full bg-gray-800 border-gray-700 text-white'
          placeholder='動画の説明を入力してください'
          rows={10}
        />
      </div>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>参考文献</h3>
        <Input
          type='text'
          value={newReference}
          onChange={(e) => setNewReference(e.target.value)}
          onKeyDown={handleAddReference}
          placeholder='新しい参考文献を入力してEnterを押す'
          className='w-full bg-gray-800 border-gray-700 text-white'
        />
        <div className='flex flex-wrap gap-2'>
          {references.map((ref, index) => (
            <Badge key={index} variant='secondary' className='bg-gray-700 text-white'>
              {ref}
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='ml-2 p-0 h-auto'
                onClick={() => handleRemoveReference(index)}
              >
                <X className='h-4 w-4' />
              </Button>
            </Badge>
          ))}
        </div>
      </div>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>アルゴリズム解説</h3>
        <Textarea
          id='algorithm-explanation'
          value={algorithmExplanation}
          onChange={(e) => {
            setAlgorithmExplanation(e.target.value)
            handleChange('algorithmExplanation', e.target.value)
          }}
          className='w-full h-96 bg-gray-800 border-gray-700 text-white'
          placeholder='アルゴリズムの解説をマークダウン形式で入力してください'
          rows={10}
        />
      </div>
      <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white'>
        投稿する
      </Button>
    </form>
  )
}
