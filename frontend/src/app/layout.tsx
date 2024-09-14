import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <Header />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
