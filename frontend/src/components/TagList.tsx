'use client'
import React, { useState } from 'react'
import Link from 'next/link'

type TagListProps = {
  tags: string[]
}

const TagList = ({ tags }: TagListProps) => {
  const [expanded, setExpanded] = useState(false)

  const handleTagClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
  }

  const toggleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setExpanded(!expanded)
  }

  const displayTags = expanded ? tags : tags.slice(0, 3)

  return (
    <div className='flex flex-wrap items-center gap-1'>
      {displayTags.map((tag, index) => (
        <Link
          key={index}
          href={`/search?tag=${encodeURIComponent(tag)}`}
          onClick={handleTagClick}
          className='text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded hover:bg-gray-600 transition-colors inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap'
          title={tag}
        >
          {tag}
        </Link>
      ))}
      {tags.length > 3 && (
        <button
          onClick={toggleExpand}
          className='text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded hover:bg-gray-600 transition-colors ml-1'
        >
          {expanded ? '折りたたむ' : `+${tags.length - 3}`}
        </button>
      )}
    </div>
  )
}

export default TagList
