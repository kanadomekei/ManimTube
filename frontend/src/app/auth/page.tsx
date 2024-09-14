'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Component() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='p-6 sm:p-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>Sign In</h2>
          <form className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-sm font-medium text-gray-700'>
                Email
              </Label>
              <Input
                id='email'
                placeholder='Enter your email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password' className='text-sm font-medium text-gray-700'>
                Password
              </Label>
              <Input
                id='password'
                placeholder='Enter your password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400'
              />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 text-gray-600 focus:ring-gray-400 border-gray-300 rounded'
                />
                <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700'>
                  Remember me
                </label>
              </div>
              <div className='text-sm'>
                <a href='#' className='font-medium text-gray-600 hover:text-gray-800'>
                  Forgot your password?
                </a>
              </div>
            </div>
            <Button className='w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out'>
              Sign In
            </Button>
          </form>
        </div>
        <div className='px-6 py-4 bg-gray-50 border-t border-gray-100 text-center'>
          <p className='text-sm text-gray-600'>
            Don&apos;t have an account?{' '}
            <a href='#' className='font-medium text-gray-800 hover:underline'>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
