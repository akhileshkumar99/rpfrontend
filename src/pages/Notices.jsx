import React, { useState, useEffect } from 'react'

export default function Notices() {
  const [notices, setNotices] = useState([])

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      const res = await fetch('https://rp-school-backend.onrender.com/api/notices')
      const data = await res.json()
      console.log('🔍 Notices API Response:', data);
      console.log('🖼️ Notice Images:', data.map(n => ({ title: n.title, imageUrl: n.imageUrl })));
      setNotices(data)
    } catch (err) {
      console.error(err)
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default: return 'bg-blue-100 text-blue-800 border-blue-300'
    }
  }

  const handleShare = (notice) => {
    const shareText = `${notice.title}\n\n${notice.content}`
    if (navigator.share) {
      navigator.share({ title: notice.title, text: shareText })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('Notice copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-pink-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Notice Board
          </h1>
          <p className="text-gray-600 text-lg">Stay updated with latest announcements</p>
        </div>

        <div className="space-y-6">
          {notices.map((notice, idx) => (
            <div key={notice._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border-l-4 border-blue-600 overflow-hidden">
              <div className={`grid ${notice.imageUrl ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                {notice.imageUrl && (
                  <div className={`${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <img 
                      src={notice.imageUrl} 
                      alt={notice.title} 
                      className="w-full h-full min-h-[300px] object-contain"
                      onError={(e) => {
                        console.error('❌ Notice Image Load Error:', notice.imageUrl);
                        e.target.style.display = 'none';
                      }}
                      onLoad={() => console.log('✅ Notice Image Loaded:', notice.imageUrl)}
                    />
                  </div>
                )}
                <div className={`p-6 flex flex-col justify-center ${notice.imageUrl && idx % 2 === 0 ? 'md:order-2' : 'md:order-1'}`} style={{fontFamily: 'Arial Black, sans-serif'}}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">{notice.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(notice.priority)}`}>
                      {notice.priority}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{notice.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(notice.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <button 
                      onClick={() => handleShare(notice)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {notices.length === 0 && (
            <div className="text-center py-20">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-xl">No notices available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
