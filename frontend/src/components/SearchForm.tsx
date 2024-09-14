'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export default async function SearchForm() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className='relative flex-grow max-w-md mx-4'>
      <Input
        type='search'
        placeholder='Search videos...'
        className='w-full pl-10 pr-4 py-2 bg-gray-700 border-gray-700 text-white placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button type='submit' className='absolute right-0 top-0 h-full bg-transparent'>
        <Search className='text-gray-400' size={20} />
      </Button>
    </form>
  )
}
