'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function Component() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center p-4'>
      <div className='max-w-md w-full bg-gray-800 rounded-lg shadow-md overflow-hidden'>
        <div className='p-6 sm:p-8'>
          <h2 className='text-2xl font-semibold text-gray-100 mb-6 text-center'>サインイン</h2>
          <form className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-sm font-medium text-gray-300'>
                メールアドレス
              </Label>
              <Input
                id='email'
                placeholder='メールアドレスを入力'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password' className='text-sm font-medium text-gray-300'>
                パスワード
              </Label>
              <Input
                id='password'
                placeholder='パスワードを入力'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
              />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 text-gray-300 focus:ring-gray-500 border-gray-600 rounded'
                />
                <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-300'>
                  ログイン状態を保持
                </label>
              </div>
              <div className='text-sm'>
                <a href='#' className='font-medium text-gray-300 hover:text-gray-100'>
                  パスワードをお忘れですか？
                </a>
              </div>
            </div>
            <Button className='w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out'>
              サインイン
            </Button>
          </form>
        </div>
        <div className='px-6 py-4 bg-gray-700 border-t border-gray-600 text-center'>
          <p className='text-sm text-gray-300'>
            アカウントをお持ちでないですか？{' '}
            <Link href='/auth/register' className='font-medium text-gray-100 hover:underline'>
              新規登録
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
