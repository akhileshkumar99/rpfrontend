import React, { useState, useEffect } from 'react'

export default function Courses() {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Class 1st', category: 'primary', level: 'Primary', students: 45, duration: '1 Year', teacher: 'Mrs. Sarah Johnson', icon: '📖', color: 'from-blue-400 to-blue-600' },
    { id: 2, title: 'Class 2nd', category: 'primary', level: 'Primary', students: 48, duration: '1 Year', teacher: 'Mr. David Smith', icon: '📖', color: 'from-green-400 to-green-600' },
    { id: 3, title: 'Class 3rd', category: 'primary', level: 'Primary', students: 50, duration: '1 Year', teacher: 'Ms. Emily Brown', icon: '📖', color: 'from-yellow-400 to-yellow-600' },
    { id: 4, title: 'Class 4th', category: 'primary', level: 'Primary', students: 52, duration: '1 Year', teacher: 'Mrs. Lisa Anderson', icon: '📖', color: 'from-red-400 to-red-600' },
    { id: 5, title: 'Class 5th', category: 'primary', level: 'Primary', students: 55, duration: '1 Year', teacher: 'Mr. Robert Wilson', icon: '📖', color: 'from-purple-400 to-purple-600' },
    { id: 6, title: 'Class 6th', category: 'middle', level: 'Middle School', students: 58, duration: '1 Year', teacher: 'Ms. Jennifer Taylor', icon: '📖', color: 'from-pink-400 to-blue-600' },
    { id: 7, title: 'Class 7th', category: 'middle', level: 'Middle School', students: 60, duration: '1 Year', teacher: 'Mr. Michael Davis', icon: '📖', color: 'from-indigo-400 to-indigo-600' },
    { id: 8, title: 'Class 8th', category: 'middle', level: 'Middle School', students: 62, duration: '1 Year', teacher: 'Mrs. Patricia Martinez', icon: '📖', color: 'from-teal-400 to-teal-600' },
    { id: 9, title: 'Class 9th', category: 'secondary', level: 'Secondary', students: 65, duration: '1 Year', teacher: 'Dr. James Thompson', icon: '📖', color: 'from-orange-400 to-orange-600' },
    { id: 10, title: 'Class 10th', category: 'secondary', level: 'Secondary', students: 68, duration: '1 Year', teacher: 'Dr. Mary Garcia', icon: '📖', color: 'from-cyan-400 to-cyan-600' },
    { id: 11, title: 'Class 11th', category: 'senior', level: 'Senior Secondary', students: 70, duration: '1 Year', teacher: 'Prof. William Lee', icon: '📖', color: 'from-rose-400 to-rose-600' },
    { id: 12, title: 'Class 12th', category: 'senior', level: 'Senior Secondary', students: 72, duration: '1 Year', teacher: 'Prof. Elizabeth White', icon: '📖', color: 'from-violet-400 to-violet-600' }
  ])

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/courses')
      const data = await res.json()
      if (data.length > 0) {
        const formattedData = data.map((course, idx) => ({
          ...course,
          title: course.className,
          teacher: course.teacherName,
          students: course.studentCount,
          icon: '📖',
          duration: '1 Year',
          level: course.className.includes('1') || course.className.includes('2') || course.className.includes('3') || course.className.includes('4') || course.className.includes('5') ? 'Primary' :
                 course.className.includes('6') || course.className.includes('7') || course.className.includes('8') ? 'Middle School' :
                 course.className.includes('9') || course.className.includes('10') ? 'Secondary' : 'Senior Secondary',
          color: ['from-blue-400 to-blue-600', 'from-green-400 to-green-600', 'from-yellow-400 to-yellow-600', 'from-red-400 to-red-600', 'from-purple-400 to-purple-600', 'from-pink-400 to-blue-600', 'from-indigo-400 to-indigo-600', 'from-teal-400 to-teal-600', 'from-orange-400 to-orange-600', 'from-cyan-400 to-cyan-600', 'from-rose-400 to-rose-600', 'from-violet-400 to-violet-600'][idx % 12]
        }))
        setCourses(formattedData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0xMiAzNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHpNMjQgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6">Our Classes</h1>
          <p className="text-xl max-w-3xl mx-auto">Comprehensive education from Class 1st to Class 12th with experienced faculty</p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
              <div key={course.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100">
                <div className={`bg-gradient-to-br ${course.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-3xl font-extrabold">{course.title}</h3>
                    <span className="text-5xl">{course.icon}</span>
                  </div>
                  <p className="text-white/90 font-semibold text-lg">{course.level}</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-semibold">Total Students</p>
                      <p className="text-xl font-bold text-gray-800">{course.students}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-semibold">Class Teacher</p>
                      <p className="text-base font-bold text-gray-800">{course.teacher}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-semibold">Duration</p>
                      <p className="text-xl font-bold text-gray-800">{course.duration}</p>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0xMiAzNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHpNMjQgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Enroll?</h2>
          <p className="text-xl mb-8">Join our community of learners and start your educational journey today</p>
          <button className="px-10 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition transform hover:scale-105 shadow-2xl">
            Apply for Admission →
          </button>
        </div>
      </section>
    </div>
  )
}
