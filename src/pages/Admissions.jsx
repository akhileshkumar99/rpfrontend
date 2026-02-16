import React, { useState } from 'react'

export default function Admissions() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', grade: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: formData.name,
          email: formData.email,
          phone: formData.phone,
          class: formData.grade,
          parentName: formData.message
        })
      });
      if (res.ok) {
        alert('Application submitted successfully!');
        setFormData({ name: '', email: '', phone: '', grade: '', message: '' });
      }
    } catch (err) {
      alert('Failed to submit application');
    }
  }



  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Admissions</h1>
          <p className="text-xl max-w-3xl mx-auto">Start your journey with us. Apply now for the upcoming academic year</p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">Apply Now</h2>
            <p className="text-gray-600 text-lg">Fill out the form below to start your admission process</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-10 border-2 border-indigo-100">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-800 font-bold mb-3 text-lg">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600 transition-all text-lg"
                  placeholder="Enter your name"
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
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-800 font-bold mb-3 text-lg">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600 transition-all text-lg"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-bold mb-3 text-lg">Grade Applying For *</label>
                <select
                  required
                  value={formData.grade}
                  onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600 transition-all text-lg"
                >
                  <option value="">Select Grade</option>
                  <option value="1">Class 1st</option>
                  <option value="2">Class 2nd</option>
                  <option value="3">Class 3rd</option>
                  <option value="4">Class 4th</option>
                  <option value="5">Class 5th</option>
                  <option value="6">Class 6th</option>
                  <option value="7">Class 7th</option>
                  <option value="8">Class 8th</option>
                  <option value="9">Class 9th</option>
                  <option value="10">Class 10th</option>
                  <option value="11">Class 11th</option>
                  <option value="12">Class 12th</option>
                </select>
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-gray-800 font-bold mb-3 text-lg">Additional Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="5"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600 transition-all text-lg"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
            <button type="submit" className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-extrabold text-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:from-indigo-700 hover:to-purple-700">
              ✨ Submit Application ✨
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
