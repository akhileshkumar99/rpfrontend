import React, { useState, useEffect } from 'react'

export default function Faculty() {
  const [selectedDept, setSelectedDept] = useState('all')
  const [faculty, setFaculty] = useState([])

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const res = await fetch('https://rp-school-backend.onrender.com/api/faculty');
      const data = await res.json();
      console.log('🔍 Faculty API Response:', data);
      console.log('🖼️ Faculty Images:', data.map(f => ({ name: f.name, imageUrl: f.imageUrl })));
      setFaculty(data);
    } catch (err) {
      console.error(err);
    }
  };

  const departments = [
    { id: 'all', label: 'All Faculty', icon: '👥' },
    { id: 'Science', label: 'Science', icon: '🔬' },
    { id: 'Arts', label: 'Arts', icon: '🎨' },
    { id: 'Commerce', label: 'Commerce', icon: '💼' },
    { id: 'Sports', label: 'Sports', icon: '⚽' }
  ]

  const filteredFaculty = selectedDept === 'all' ? faculty : faculty.filter(f => f.department === selectedDept)

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-50">
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTEyIDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0yNCAzNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20 animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in drop-shadow-2xl">Our Expert Faculty</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">Meet our dedicated team of experienced educators committed to excellence</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredFaculty.map((member, idx) => (
              <div 
                key={member._id} 
                className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border-2 border-transparent hover:border-indigo-300"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-72 overflow-hidden">
                  {member.imageUrl ? (
                    <img 
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-125 group-hover:rotate-3 transition-transform duration-700"
                      onError={(e) => {
                        console.error('❌ Faculty Image Load Error:', member.imageUrl);
                        e.target.style.display = 'none';
                      }}
                      onLoad={() => console.log('✅ Faculty Image Loaded:', member.imageUrl)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-6xl">
                      👤
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-600 transition-colors duration-300">{member.name}</h3>
                  <p className="text-indigo-600 font-bold mb-1 text-lg">📚 {member.department}</p>
                  <p className="text-gray-600 text-sm mb-2">{member.position}</p>
                  {member.email && <p className="text-gray-500 text-sm">✉️ {member.email}</p>}
                  {member.phone && <p className="text-gray-500 text-sm">📞 {member.phone}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
