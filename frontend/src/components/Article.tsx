import React, { useState, useRef, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { MdDragHandle } from 'react-icons/md'
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter'

interface ArticleProps {
  algorithmData: string
}

const Article: React.FC<ArticleProps> = ({ algorithmData }) => {
  const [height, setHeight] = useState(500)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const resizeRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && containerRef.current && contentRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const contentHeight = contentRef.current.scrollHeight
        const newHeight = e.clientY - containerRect.top
        setHeight(Math.max(200, Math.min(contentHeight, newHeight)))
      }
    },
    [isDragging, setHeight]
  )

  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      handleMouseMove(e)
    }

    const handleMouseUpGlobal = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMoveGlobal)
      document.addEventListener('mouseup', handleMouseUpGlobal)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGlobal)
      document.removeEventListener('mouseup', handleMouseUpGlobal)
    }
  }, [isDragging, handleMouseMove])

  return (
    <div ref={containerRef} className='bg-gray-800 p-6 rounded-lg'>
      <div style={{ height: `${height}px` }} className='overflow-hidden'>
        <div
          ref={contentRef}
          className='prose prose-invert prose-lg h-full overflow-y-auto pr-4 pb-8'
        >
          <ReactMarkdown
            components={{
              code: ({
                inline,
                className,
                children,
                ...props
              }: {
                inline?: boolean
                className?: string
                children?: React.ReactNode
              } & React.ComponentPropsWithoutRef<'code'>): React.ReactElement => {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag='div'
                    {...(props as SyntaxHighlighterProps)}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
              h1: ({ children }) => (
                <h1 className='text-3xl font-bold mb-4 text-blue-300'>{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className='text-2xl font-semibold mb-3 text-blue-200'>{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className='text-xl font-medium mb-2 text-blue-100'>{children}</h3>
              ),
              p: ({ children }) => <p className='mb-4 leading-relaxed'>{children}</p>,
              ul: ({ children }) => <ul className='list-disc list-inside mb-4 pl-4'>{children}</ul>,
              ol: ({ children }) => (
                <ol className='list-decimal list-inside mb-4 pl-4'>{children}</ol>
              ),
              li: ({ children }) => <li className='mb-2'>{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className='border-l-4 border-blue-500 pl-4 italic my-4'>
                  {children}
                </blockquote>
              ),
            }}
          >
            {algorithmData}
          </ReactMarkdown>
        </div>
      </div>
      <div
        ref={resizeRef}
        onMouseDown={handleMouseDown}
        className='flex justify-center mt-2 cursor-ns-resize select-none'
      >
        <div className='bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white p-2 rounded-md transition-colors duration-200 flex items-center gap-2 w-32 justify-center'>
          <MdDragHandle size={20} />
        </div>
      </div>
    </div>
  )
}

export default Article
