'use client'

import { useState } from 'react'
import { uploadFile } from './action'
import { FormMessage, Message } from '@/components/form/form-message'
import { Input } from '@/components/form/input'
import { Label } from '@/components/form/label'
import { SubmitButton } from '@/components/form/submit-button'

export default function Page({ searchParams }: { searchParams: Message }) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'image/jpeg') {
      setFile(selectedFile)
    } else {
      alert('Please select a JPEG image.')
      e.target.value = ''
    }
  }

  return (
    <div className='flex-1 flex flex-col items-center justify-center w-full'>
      <form action={uploadFile} className='flex flex-col w-full max-w-md p-4 gap-2'>
        <h1 className='text-2xl font-medium'>File Upload</h1>
        <Label htmlFor='file'>Select JPEG file</Label>
        <Input
          type='file'
          name='file'
          accept='.jpeg,image/jpeg'
          onChange={handleFileChange}
          required
        />
        <SubmitButton>Upload</SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </div>
  )
}
