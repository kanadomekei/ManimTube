import Sidebar from '@/components/Sidebar'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-1 p-6 bg-gray-900'>{children}</main>
    </div>
  )
}
