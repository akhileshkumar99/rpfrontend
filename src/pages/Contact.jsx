import React, { useState } from 'react'
import { API_BASE_URL } from '../config/api'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [reviewData, setReviewData] = useState({ name: '', rating: 5, review: '' })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.subject,
          message: formData.message
        })
      });
      if (res.ok) {
        alert('✅ Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      alert('❌ Failed to send message');
    }
  }

  const contactInfo = [
    { icon: '📍', title: 'Address', info: 'R P Public School Newada, Parshurampur, Basti, UP - 272130', link: 'https://maps.app.goo.gl/HVxNhkam6kiuShLg8' },
    { icon: '📞', title: 'Phone', info: '+91 (123) 456-7890', link: 'tel:+911234567890' },
    { icon: '✉️', title: 'Email', info: 'info@rpschool.edu', link: 'mailto:info@rpschool.edu' },
    { icon: '🕒', title: 'Hours', info: 'Mon-Fri: 8:00 AM - 5:00 PM', link: null }
  ]

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTEyIDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0yNCAzNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-6xl font-extrabold mb-6 drop-shadow-2xl">💬 Contact Us</h1>
          <p className="text-2xl max-w-3xl mx-auto opacity-95">Get in touch with us. We're here to help and answer any questions</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, idx) => (
              <a
                key={idx}
                href={item.link || '#'}
                target={item.link?.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="group text-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 border-2 border-transparent hover:border-indigo-300 cursor-pointer"
              >
                <div className="text-6xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{item.icon}</div>
                <h3 className="font-extrabold text-xl mb-3 text-gray-800 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                <p className="text-gray-600 font-semibold group-hover:text-gray-800 transition-colors">{item.info}</p>
              </a>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl shadow-2xl p-10 border-2 border-indigo-100">
              <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">✉️ Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-800 font-bold mb-3 text-lg">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600 transition-all text-lg"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-3 text-lg">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600 transition-all text-lg"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-3 text-lg">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600 transition-all text-lg"
                    placeholder="Message subject"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-3 text-lg">Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="5"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600 transition-all text-lg"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-extrabold text-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  🚀 Send Message
                </button>
              </form>
            </div>

            <div>
              <div className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-gray-800 mb-6">
                <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">🗺️ Visit Our Campus</h2>
                <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <iframe
                    src="https://maps.google.com/maps?q=RP+School+Newada+Basti&hl=en&z=15&output=embed&t=h"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="RP School - Newada, Basti, Uttar Pradesh"
                    className="rounded-2xl"
                  ></iframe>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-indigo-100">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">⭐ Leave a Review</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!reviewData.name || !reviewData.review) {
                    alert('⚠️ Please fill all fields');
                    return;
                  }
                  try {
                    const res = await fetch(`${API_BASE_URL}/api/reviews`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(reviewData)
                    });
                    if (!res.ok) {
                      alert('❌ Server error: ' + res.status);
                      return;
                    }
                    const data = await res.json();
                    if (data.success) {
                      alert('✅ Review submitted! Waiting for approval.');
                      setReviewData({ name: '', rating: 5, review: '' });
                    } else {
                      alert('❌ Failed: ' + (data.error || 'Unknown error'));
                    }
                  } catch (err) {
                    alert('❌ Cannot connect to server. Make sure backend is running on port 5000');
                  }
                }} className="space-y-4">
                  <input
                    type="text"
                    required
                    value={reviewData.name}
                    onChange={(e) => setReviewData({...reviewData, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                    placeholder="Your name"
                  />
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewData({...reviewData, rating: star})}
                        className="text-3xl transition-transform hover:scale-125"
                      >
                        {star <= reviewData.rating ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                  <textarea
                    required
                    value={reviewData.review}
                    onChange={(e) => setReviewData({...reviewData, review: e.target.value})}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                    placeholder="Your review..."
                  ></textarea>
                  <button type="submit" className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
