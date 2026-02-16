import React from 'react'

export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl'
  }

  return (
    <div className={`${sizes[size]} bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-xl`}>
      <span>S</span>
    </div>
  )
}
