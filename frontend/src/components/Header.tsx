'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Search, Menu, X } from 'lucide-react'
import { useSidebarStore } from '@/store/sidebarStore'
import UserMenu from './UserMenu'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()
  const toggleSidebar = useSidebarStore((state) => state.toggle)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setTimeout(() => document.getElementById('search-input')?.focus(), 100)
    }
  }

  return (
    <header className='flex items-center justify-between p-4 bg-gray-800'>
      <div className='flex items-center'>
        <Button variant='ghost' className='mr-2 text-white' onClick={toggleSidebar}>
          <Menu size={24} />
        </Button>
        <Link href='/' className='text-white text-2xl font-bold hover:text-gray-300'>
          ManimTube
        </Link>
      </div>
      <div className='flex items-center space-x-4 flex-grow justify-end'>
        <div
          className={`relative flex-grow max-w-md mx-4 ${isSearchOpen ? 'block' : 'hidden md:block'}`}
        >
          <form onSubmit={handleSearch} className='w-full'>
            <Input
              id='search-input'
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
        </div>
        <div className='flex items-center space-x-2'>
          <div className='md:hidden'>
            <Button variant='ghost' onClick={toggleSearch} className='text-white'>
              {isSearchOpen ? <X size={24} /> : <Search size={24} />}
            </Button>
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
