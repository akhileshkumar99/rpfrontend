import React, { useState } from 'react'
import LogoSlider from '../components/LogoSlider'
import HeroSlider from '../components/HeroSlider'
import Counter from '../components/Counter'
import ScrollToTop from '../components/ScrollToTop'

export default function Home({ setCurrentPage }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [showPopup, setShowPopup] = useState(true)
  const [selectedFeature, setSelectedFeature] = useState(null)

  const features = [
    { icon: '👨🏫', title: 'Expert Faculty', desc: 'Highly qualified and experienced teachers', image: '/5.png' },
    { icon: '🏆', title: 'Excellence', desc: '95% student success rate', image: '/11.png' },
    { icon: '💻', title: 'Smart Classes', desc: 'Modern digital learning environment', image: '/labs.png' },
    { icon: '🌍', title: 'Global Curriculum', desc: 'International standard education', image: '/GLOBLE.png' }
  ]

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Parent', text: 'Best decision we made for our child\'s education. The teachers are amazing!', rating: 5 },
    { name: 'Michael Chen', role: 'Student', text: 'The learning environment here is incredible. I love coming to school every day!', rating: 5 },
    { name: 'Emily Davis', role: 'Alumni', text: 'SmartSchool prepared me perfectly for university. Forever grateful!', rating: 5 },
    { name: 'Rajesh Kumar', role: 'Parent', text: 'Outstanding faculty and excellent infrastructure. My daughter has shown remarkable improvement in academics and confidence!', rating: 5 },
    { name: 'Priya Sharma', role: 'Student', text: 'The extracurricular activities and sports facilities are world-class. I have grown so much as a person here!', rating: 5 },
    { name: 'David Williams', role: 'Alumni', text: 'The career guidance and counseling helped me get into my dream university. Thank you for everything!', rating: 5 },
    { name: 'Anita Patel', role: 'Parent', text: 'Safe environment, caring teachers, and modern teaching methods. Highly recommend this school to all parents!', rating: 5 },
    { name: 'Arjun Singh', role: 'Student', text: 'Smart classes and digital learning make studying so much fun. Best school ever!', rating: 5 }
  ]

  const stats = [
    { value: 2500, suffix: '+', label: 'Students' },
    { value: 15, suffix: '+', label: 'Teachers' },
    { value: 14, suffix: '+', label: 'Courses' },
    { value: 13, suffix: '+', label: 'Years' }
  ]

  return (
    <>
    <div>
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full">
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 text-white rounded-full font-bold text-xl hover:bg-red-600 transition shadow-lg z-10"
            >
              ✕
            </button>
            <img 
              src="/banner.jpg" 
              alt="Welcome Banner" 
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      <HeroSlider setCurrentPage={setCurrentPage} />

      <section className="pt-20 pb-10 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Why Choose Us?</h2>
          <p className="text-gray-600 text-center mb-12">Discover what makes SmartSchool the best choice for your education</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 bg-white border border-gray-100 overflow-hidden">
                <div 
                  className="w-full h-48 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedFeature(feature)}
                >
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedFeature && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedFeature(null)}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedFeature(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 text-white rounded-full font-bold text-xl hover:bg-red-600 transition shadow-lg z-10"
            >
              ✕
            </button>
            <img src={selectedFeature.image} alt={selectedFeature.title} className="w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl" />
          </div>
        </div>
      )}

      <section className="py-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0xMiAzNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHpNMjQgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-bold mb-2 drop-shadow-lg">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xl text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Academic Excellence</h2>
            <p className="text-gray-600 text-lg">Comprehensive curriculum designed for success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border-2 border-indigo-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">🎓 Primary Education (Class 1-5)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Foundation building with interactive learning</li>
                <li>✓ Focus on reading, writing, and arithmetic</li>
                <li>✓ Creative activities and personality development</li>
                <li>✓ Regular parent-teacher meetings</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">📖 Middle School (Class 6-8)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Subject specialization begins</li>
                <li>✓ Science and mathematics focus</li>
                <li>✓ Language development programs</li>
                <li>✓ Co-curricular activities</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">🏆 High School (Class 9-10)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Board exam preparation</li>
                <li>✓ Career counseling sessions</li>
                <li>✓ Advanced lab practicals</li>
                <li>✓ Competitive exam coaching</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-red-50 p-8 rounded-2xl border-2 border-pink-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">🎯 Senior Secondary (Class 11-12)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Stream selection: Science, Commerce, Arts</li>
                <li>✓ University entrance preparation</li>
                <li>✓ Research projects and internships</li>
                <li>✓ Scholarship opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-16">What People Say</h2>
          
          <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 border border-gray-100 relative">
            <img src="/rp logo (2).png" alt="School Logo" className="absolute top-8 right-8 w-16 h-16 object-contain opacity-45 rounded-full" />
            <div className="text-8xl text-indigo-600 mb-6">"</div>
            <p className="text-3xl text-gray-700 mb-8 leading-relaxed">{testimonials[activeTestimonial].text}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-2xl">{testimonials[activeTestimonial].name}</p>
                <p className="text-gray-600 text-xl">{testimonials[activeTestimonial].role}</p>
              </div>
              <div className="flex space-x-1">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-3xl drop-shadow">⭐</span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === idx ? 'bg-gradient-to-r from-indigo-600 to-purple-600 w-8 shadow-lg' : 'bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LogoSlider />
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-indigo-400">
              <img src="/rp logo (2).png" alt="Sandeep Kumar" className="w-24 h-24 mx-auto mb-3 rounded-full object-cover border-4 border-indigo-600" />
              <h3 className="text-xl font-bold mb-1">Sandeep Kumar</h3>
              <p className="text-indigo-600 font-semibold mb-1">Principal</p>
              <p className="text-gray-600 text-sm mb-1">M.A., M.Ed.</p>
              <p className="text-gray-700 text-sm">📱 9648942194</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-400">
              <img src="/rp logo (2).png" alt="Shiv Karan" className="w-24 h-24 mx-auto mb-3 rounded-full object-cover border-4 border-blue-600" />
              <h3 className="text-xl font-bold mb-1">Shiv Karan</h3>
              <p className="text-blue-600 font-semibold mb-1">Manager</p>
              <p className="text-gray-600 text-sm mb-1">&nbsp;</p>
              <p className="text-gray-700 text-sm">📱 9628025608</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-purple-400">
              <img src="/rp logo (2).png" alt="Sunil Kumar" className="w-24 h-24 mx-auto mb-3 rounded-full object-cover border-4 border-purple-600" />
              <h3 className="text-xl font-bold mb-1">Sunil Kumar</h3>
              <p className="text-purple-600 font-semibold mb-1">Director</p>
              <p className="text-gray-600 text-sm mb-1">B.Sc.</p>
              <p className="text-gray-700 text-sm">📱 9044526032</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <ScrollToTop />
    </>
  )
}
