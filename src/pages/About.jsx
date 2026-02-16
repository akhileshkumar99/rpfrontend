import React from 'react'

export default function About() {
  const values = [
    { icon: '🎯', title: 'Excellence', desc: 'Striving for the highest standards in education' },
    { icon: '🤝', title: 'Integrity', desc: 'Building character and ethical values' },
    { icon: '💡', title: 'Innovation', desc: 'Embracing modern teaching methods' },
    { icon: '🌟', title: 'Diversity', desc: 'Celebrating different cultures and perspectives' }
  ]

  const team = [
    { name: 'Sandeep Kumar', role: 'Principal', qualification: 'M.A., M.Ed.', mobile: '9648942194', image: '/rp logo (2).png' },
    { name: 'Shiv Karan', role: 'Manager', qualification: '', mobile: '9628025608', image: '/rp logo (2).png' },
    { name: 'Sunil Kumar', role: 'Director', qualification: 'B.Sc.', mobile: '9044526032', image: '/rp logo (2).png' }
  ]

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About SmartSchool</h1>
          <p className="text-xl max-w-3xl mx-auto">Established in 1999, we've been nurturing young minds and building future leaders for over 25 years</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">🎯</div>
              <h2 className="text-3xl font-bold mb-4 text-blue-900">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">To provide world-class education that empowers students to become confident, creative, and compassionate individuals who contribute positively to society.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-100 p-8 rounded-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
              <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">🔭</div>
              <h2 className="text-3xl font-bold mb-4 text-purple-900">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">To be recognized as a leading educational institution that sets the standard for academic excellence, innovation, and holistic development of students.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 group cursor-pointer">
                <div className="text-5xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="text-center group cursor-pointer bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition-all duration-500">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-indigo-600 transition-colors duration-300">{member.name}</h3>
                <p className="text-gray-600 font-semibold">{member.role}</p>
                {member.qualification && <p className="text-sm text-gray-500 mt-1">{member.qualification}</p>}
                <p className="text-sm text-indigo-600 font-semibold mt-2">📱 {member.mobile}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Achievements</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl transform hover:scale-105 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
              <div className="text-4xl mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">🏆</div>
              <h3 className="text-2xl font-bold mb-2">Best School Award</h3>
              <p className="text-blue-100">Recognized as the top educational institution in the region for 5 consecutive years</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl transform hover:scale-105 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
              <div className="text-4xl mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">🎓</div>
              <h3 className="text-2xl font-bold mb-2">100% Pass Rate</h3>
              <p className="text-blue-100">Outstanding academic performance with students excelling in board examinations</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl transform hover:scale-105 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
              <div className="text-4xl mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">🌟</div>
              <h3 className="text-2xl font-bold mb-2">Excellence in Sports</h3>
              <p className="text-blue-100">Multiple state and national level championships in various sports</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
